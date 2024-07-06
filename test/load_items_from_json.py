import json

from utils.db_api.data import db_session
from utils.db_api.models import Product


def load_items_from_json():
    db_file = "../db/database.db"
    db_session.global_init(db_file)

    session = db_session.create_session()

    data = json.load(open("../apiresp.json"))
    for item in data['products']:
        id = item['id']
        new_product = Product(
            id=id,
            data=json.dumps(item)
        )
        session.add(new_product)

    session.commit()
    session.close()


def get_items_from_database_to_json():
    db_file = "../db/database.db"
    db_session.global_init(db_file)

    session = db_session.create_session()

    data = session.query(Product)
    response = {"products": [json.loads(item.data) for item in data]}
    return response


if __name__ == '__main__':
    load_items_from_json()