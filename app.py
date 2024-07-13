from datetime import datetime
import io
from flask import (Flask, Response, abort, flash, render_template, redirect, make_response, jsonify, request, url_for, send_file,
                   session)
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import os
from pdf import find_item, load_json, form_files_from_list, parsing_file
from load_items_from_json import load_items_from_json, add_item
from utils.db_api import User
from utils.db_api import db_session
from flask_restful import Api
from werkzeug.utils import secure_filename
from utils.db_api.models import *
from utils.forms import LoginForm
import json
import requests

app = Flask(__name__)
api = Api(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = 'SOME SECRET KEY'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"


@app.route('/get_cart', methods=['GET'])
@login_required
def get_tasks():
    cart = load_user(current_user.id).get_cart().replace("\'", "\"").replace("None", "0")
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


@app.route('/save_cart_to_history', methods=['POST'])
@login_required
def save_cart_to_history():
    if not request.json:
        abort(400)

    session = db_session.create_session()
    row = History(
        user_id=current_user.id,
        cart=str(request.json['products']),
    )
    session.add(row)
    session.commit()
    session.close()
    return render_template("cart.html", all_items=products)


@app.route('/get_cart_history', methods=['GET'])
@login_required
def get_carts():
    session = db_session.create_session()
    carts = session.query(History).filter(History.user_id == current_user.id).all()
    carts = [cart.cart.replace("\'", "\"").replace("None", "0") for cart in carts] 
    carts = [json.loads(cart) for cart in carts]
    session.close()
    return json.dumps(carts)


@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    response = db_sess.query(User).filter(User.id == user_id).first()
    db_sess.close()
    return response


# @app.errorhandler(404)
# def not_found(error):
#     return make_response(jsonify({'error': 'Not found'}), 404)


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


@app.route('/account')
@login_required
def account():
    session = db_session.create_session()
    carts = session.query(History).filter(History.user_id == current_user.id).all()
    carts_v2 = [(json.dumps(cart.cart)) for cart in carts]
    session.close()
    return render_template("account.html", username = load_user(current_user.id).get_username(), history = carts_v2)


@app.route('/changeUserPassword', methods = ['POST'])
@login_required
def change_user_password():
    password = request.json["password"]
    session = db_session.create_session()
    user = session.query(User).filter(User.id == current_user.id).first()
    user.set_password(password)
    session.commit()
    session.close()
    response = app.response_class(
        status=200,
        response=json.dumps("ok"),
        mimetype='application/json'
    )
    return response


@app.route('/add',  methods=['POST', 'GET'])
@login_required
def add():
    if request.method == 'GET':
        return render_template("add.html")
    name = request.form.get("name")
    id = request.form.get("id")
    quantity = request.form.get("quantity")
    sku = request.form.get("sku")
    price = request.form.get("price")
    if (add_item(id, name, sku, quantity, price)):
        db_sess = db_session.create_session()
        return render_template("products.html", all_items= [json.loads(item.data) for item in db_sess.query(Product).all()])
    else:
        return render_template("add.html")


@app.route('/download_pdf', methods=['POST'])
@login_required
def download_pdf():
    cart = get_tasks()
    products = cart['products']
    data = request.form
    form_files_from_list(products, fio=data['FIO'],phone=data['phone'], email=data['email'], delcond=data['delivery-cond'], co_number=data["conum"], coef=float(data['coeff-button']))

    filename = f"КП{data['FIO']+str(datetime.now().date())}".replace(" ","").replace(".","")
    pdf_filename = f"{filename}.pdf"

    return_data = io.BytesIO()
    with open(pdf_filename, 'rb') as fo:
        return_data.write(fo.read())
    return_data.seek(0)
    os.remove(pdf_filename)

    return send_file(return_data, mimetype='application/pdf', as_attachment=True, download_name=pdf_filename)


@app.route('/download_excel', methods=['POST'])
@login_required
def download_excel():
    cart = get_tasks()
    products = cart['products']

    data = request.form
    print(data)
    form_files_from_list(products, fio=data['FIO'],phone=data['phone'], email=data['email'], delcond=data['delivery-cond'], co_number=data["conum"], coef=float(data['coeff-button']), is_form_pdf=False)

    filename = f"КП{data['FIO']+str(datetime.now().date())}".replace(" ","").replace(".","")
    csv_filename = f"{filename}.xlsx"

    return_data = io.BytesIO()
    with open(csv_filename, 'rb') as fo:
        return_data.write(fo.read())
    return_data.seek(0)
    os.remove(csv_filename)

    return send_file(return_data, mimetype='application/pdf', as_attachment=True, download_name=csv_filename)


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


@app.route('/upload', methods=['GET', 'POST'])
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
    return render_template('404.html'), 404


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'txt', 'csv', 'pdf'}


def main():
    db_file = "db/database.db"
    db_session.global_init(db_file)

    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)


def load_from_api():

    url = 'https://namazlive.herokuapp.com/trade/products/list'
    api_key = 'jiro_dreams_of_sushi'
    headers = {
        'x-api-key': api_key
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print('Success:', len(response.json()['products']))
        # print(response.json())

        resp = response.json()#.replace("null","0")
        with open("apiresp.json", 'w', encoding='utf-8') as f:
            json.dump(resp, f, ensure_ascii=False)
        load_items_from_json()
    else:
        print('Failed:', response.status_code, response.text)


if __name__ == '__main__':
    load_from_api()
    main()
