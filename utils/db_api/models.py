from utils.db_api.config import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Product(db.Model):
    __tablename__ = 'products'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.Text)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String, nullable=False)
    cart = db.Column(db.String)

    def get_cart(self):
        return self.cart

    def set_cart(self, value):
        self.cart = value

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


# class University(db.Model):
#     __tablename__ = 'university'
#     __table_args__ = {'extend_existing': True}
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     city = db.Column(db.String)
#     image = db.Column(db.String)
#     faculties = db.relationship('Faculty', backref='university')
#
#
# class Faculty(db.Model):
#     __tablename__ = "faculty"
#     __table_args__ = {'extend_existing': True}
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     points = db.Column(db.String)
#     description = db.Column(db.String)
#     price = db.Column(db.String)
#     subject1 = db.Column(db.String)
#     subject2 = db.Column(db.String)
#     subject3 = db.Column(db.String)
#     university_id = db.Column(db.Integer, db.ForeignKey('university.id'))


if __name__ == "__main__":
    # Run this file directly to create the database tables.
    print("Creating database tables...")
    db.create_all()
    print("Done!")
