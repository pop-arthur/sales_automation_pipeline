from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField, TextAreaField, SubmitField, BooleanField, EmailField, IntegerField
from wtforms.validators import DataRequired


# class RegisterForm(FlaskForm):
#     email = EmailField('Почта', validators=[DataRequired()])
#     password = PasswordField('Пароль', validators=[DataRequired()])
#     password_again = PasswordField('Повторите пароль', validators=[DataRequired()])
#     name = StringField('Имя пользователя', validators=[DataRequired()])
#     age = IntegerField('Возраст', validators=[DataRequired()])
#     about = TextAreaField("Немного о себе")
#     submit = SubmitField('Войти')


class LoginForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    remember_me = BooleanField('Запомнить меня')
    submit = SubmitField('Войти')