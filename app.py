from flask import Flask, render_template, redirect, make_response, jsonify, request, url_for
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Api
import requests
import os

users = {
    "Aitkun" : "qwe"
}

app = Flask(__name__)
api = Api(app)
app.config['SECRET_KEY'] = 'SOME SECRET KEY'


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/')
@app.route('/index/<message>')
def index(message=""):
    return render_template('authorization.html', message=message)


@app.route('/cart')
def cart():
    return render_template("cart.html")


@app.route('/login', methods=['POST'])
def login():
    data = request.form
    if data["username"] in users:
        if data["password"] == users[data["username"]]:
            return redirect("/cart")

    return redirect(url_for(".index", message="Wrong username or password"))


def main():
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)


if __name__ == '__main__':
    main()