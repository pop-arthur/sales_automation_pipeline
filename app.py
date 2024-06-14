import json
import io
from flask import Flask, render_template, redirect, make_response, jsonify, request, url_for, send_file
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api
import os
from pdf import load_json, form_files_from_list
import zipfile
from utils.db_api import User
from utils.db_api import db_session
from flask_restful import Api

from utils.forms import LoginForm

app = Flask(__name__)
api = Api(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET_KEY'] = 'SOME SECRET KEY'


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).filter(User.id == user_id).first()


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@app.route('/index/')
def index(message=""):
    return redirect(url_for('login'))


@login_required
@app.route('/products', methods=['GET', 'POST'])
def products():
    products = json.loads(load_json())['products']
    return render_template("products.html", all_items=products)


@login_required
@app.route('/cart')
def cart():
    # with open('apiresp.json', 'r') as f:
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
def downloadFiles():
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
            return redirect("/cart")
        return render_template('login.html', message="Неправильный логин или пароль", form=form)

    return render_template('login.html', title='Авторизация', form=form)


@login_required
@app.route('/logout')
def logout():
    logout_user()
    return redirect("/")


def main():
    db_file = "db/database.db"
    db_session.global_init(db_file)

    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)


if __name__ == '__main__':
    main()
