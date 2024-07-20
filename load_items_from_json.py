import json

from utils.db_api.data import db_session
from utils.db_api.models import Product

def add_item(id, name, sku, quantity, price):
    db_file = "db/database.db"
    db_session.global_init(db_file)

    session = db_session.create_session()
    products = get_items_from_database_to_json()['products']
    for product in products:
        if (product['id'] == id):
            print("Такое уже есть!")
            return False
    new_product = Product(
        id=int(id),
        data=json.dumps({"id" : id, "name": name, "sku" : sku, "quantity_in_stock" : quantity, "price" : price, "images" : [{"url" : "https://cs13.pikabu.ru/post_img/big/2023/09/11/5/1694416670162565263.jpg"}]}, ensure_ascii=False)
    )
    # if (new_product):
    #     return False
    session.add(new_product)
    session.commit()
    session.close()
    return True

def load_items_from_json(data_json):
    db_file = "db/database.db"
    db_session.global_init(db_file)

    session = db_session.create_session()

    data = json.loads(data_json)#.replace("null","0")
    ids = []
    already_in_db = 0
    products = get_items_from_database_to_json()['products']
    for product in products:
        ids.append(product['id'])
    for item in data['products']:
        id = item['id']
        if (id in ids):
            already_in_db+=1
            continue
        ids.append(id)
        new_product = Product(
            id=id,
            data=json.dumps(item, ensure_ascii=False)
        )
        session.add(new_product)
    print(str(already_in_db) + " are already in db")
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