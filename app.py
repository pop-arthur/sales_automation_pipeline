from http import HTTPStatus
import json
import io
from flask import Flask, abort, flash, render_template, redirect, make_response, jsonify, request, url_for, send_file
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api
import os
from pdf import load_json, form_files_from_list, find_in_json, parsing_file
import zipfile
from utils.db_api import User
from utils.db_api import db_session
from flask_restful import Api
from werkzeug.utils import secure_filename
from utils.forms import LoginForm

app = Flask(__name__)
api = Api(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = 'SOME SECRET KEY'
app.config['UPLOAD_FOLDER'] = 'uploads'

@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).filter(User.id == user_id).first()


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
    products = json.loads(load_json())['products']
    return render_template("products.html", all_items=products)


@app.route('/cart')
@login_required
def cart():
    cart = json.loads(load_json())
    return render_template("cart.html", cart=cart['products'])


@app.route('/formPDF', methods=['POST', 'GET'])
def formPDF():
    cart = json.loads(load_json())
    ids = [item['id'] for item in cart['products']]

    data = request.form
    form_files_from_list(ids, data['FIO'], data['phone'], data['email'])
    filename = f'{data["FIO"]}.pdf'

    return_data = io.BytesIO()
    with open(filename, 'rb') as fo:
        return_data.write(fo.read())
    return_data.seek(0)
    os.remove(filename)
    return send_file(return_data, mimetype='application/pdf', as_attachment=True, download_name=filename)


@app.route('/formCSV', methods=['POST', 'GET'])
def formCSV():
    cart = json.loads(load_json())
    ids = [item['id'] for item in cart['products']]

    data = request.form
    form_files_from_list(ids, data['FIO'], data['phone'], data['email'])
    filename = f'{data["FIO"]}.csv'

    return_data = io.BytesIO()
    with open(filename, 'rb') as fo:
        return_data.write(fo.read())
    return_data.seek(0)
    os.remove(filename)
    return send_file(return_data, mimetype='application/csv', as_attachment=True, download_name=filename)


@app.route('/downloadFiles', methods=['POST'])
def download_files():
    cart = json.loads(load_json())
    ids = [item['id'] for item in cart['products']]

    data = request.form
    form_files_from_list(ids, data['FIO'], data['phone'], data['email'])

    pdf_filename = f'{data["FIO"]}.pdf'
    csv_filename = f'{data["FIO"]}.csv'

    zip_filename = f'{data["FIO"]}.zip'
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
    data = find_in_json(search_query)
    return render_template("products.html", all_items=data)


@app.route('/upload', methods=['GET','POST'])
@login_required
def upload():
    if request.method == 'GET':
        return render_template('upload.html')
    if 'file' not in request.files or  request.files['file'].filename == '' or not allowed_file(request.files['file'].filename):
        return render_template('upload.html', message="No or wrong file")
    file = request.files['file']
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    parsing_file(filename)
    return render_template('upload.html', message="Success")


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'csv'}


def main():
    db_file = "db/database.db"
    db_session.global_init(db_file)

    app.run()


if __name__ == '__main__':
    main()
