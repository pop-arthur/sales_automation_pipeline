from datetime import datetime
from http import HTTPStatus
import json
import io
from flask import (Flask, abort, flash, render_template, redirect, make_response, jsonify, request, url_for, send_file,
                   session)
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api
import os
from pdf import find_item, load_json, form_files_from_list, parsing_file
import zipfile
from utils.db_api import User
from utils.db_api import db_session
from flask_restful import Api
from werkzeug.utils import secure_filename

from utils.db_api.models import Product
from utils.forms import LoginForm
from flask_session import Session
import json

app = Flask(__name__)
api = Api(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = 'SOME SECRET KEY'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/get_cart', methods=['GET'])
@login_required
def get_tasks():
    cart = load_user(current_user.id).get_cart().replace("\'", "\"")
    cart = json.loads(cart)
    return cart if cart else {"products": []}


@app.route('/post_cart', methods=['POST'])
@login_required
def post_cart():
    if not request.json:
        abort(400)

    cart = request.json['products']
    session = db_session.create_session()
    user = session.query(User).filter(User.id == current_user.id).first()
    user.set_cart(str(cart))
    session.commit()
    session.close()
    return jsonify({'cart': cart}), 201


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    response = db_sess.query(User).filter(User.id == user_id).first()
    db_sess.close()
    return response


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@app.route('/index/')
def index():
    return redirect(url_for('login'))


@app.route('/products', methods=['GET', 'POST'])
@login_required
def products():
    db_sess = db_session.create_session()
    products = [json.loads(item.data) for item in db_sess.query(Product).all()]
    return render_template("products.html", all_items=products)


@app.route('/cart')
@login_required
def cart():
    return render_template("cart.html")


# TODO remove useless functions from app.py
@app.route('/downloadFiles', methods=['POST'])
def download_files():
    cart = get_tasks()
    products = cart['products']

    data = request.form
    form_files_from_list(products, data['FIO'], data['phone'], data['email'], float(data['coeff-button']))

    filename = f"КП{data['FIO']+str(datetime.now().date())}".replace(" ","").replace(".","")
    pdf_filename = f"{filename}.pdf"
    csv_filename = f"{filename}.csv"

    zip_filename = f"КП{data['FIO']+str(datetime.now().date())}.zip"
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
        zip_file.write(pdf_filename)
        zip_file.write(csv_filename)

    # Clean up the individual files after zipping
    os.remove(pdf_filename)
    os.remove(csv_filename)

    zip_buffer.seek(0)
    return send_file(zip_buffer, mimetype='application/zip', as_attachment=True, download_name=zip_filename)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        db_sess = db_session.create_session()
        user = db_sess.query(User).filter(User.username == form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            return redirect("/products")
        return render_template('login.html', message="Неправильный логин или пароль", form=form)

    return render_template('login.html', title='Авторизация', form=form)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect("/")


@app.route('/search', methods=['GET', 'POST'])
@login_required
def search():
    search_query = request.form.get('search')
    db_sess = db_session.create_session()
    products = [json.loads(item.data) for item in db_sess.query(Product).all()]
    data = find_item(search_query, products)
    return render_template("products.html", all_items=data)


@app.route('/upload', methods=['GET','POST'])
@login_required
def upload():
    if request.method == 'GET':
        return render_template('upload.html')
    if ('fileUpload' not in request.files) or  (request.files['fileUpload'].filename == '') or (not allowed_file(request.files['fileUpload'].filename)):
        return render_template('upload.html', message="Wrong file or no file")
    file = request.files['fileUpload']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    parsing_file(filename)
    return render_template('upload.html', message="Success")


@app.errorhandler(404)
def page_not_found(e):
    print(e)
    return render_template('404.html'), 404


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'csv', 'pdf'}


def main():
    db_file = "db/database.db"
    db_session.global_init(db_file)

    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)


if __name__ == '__main__':
    main()
