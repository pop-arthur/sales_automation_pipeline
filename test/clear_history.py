from utils.db_api.data import db_session
from utils.db_api.models import History


def clear_history():
    db_file = "../db/database.db"
    db_session.global_init(db_file)

    session = db_session.create_session()

    session.query(History).delete(synchronize_session='fetch')

    session.commit()
    session.close()


if __name__ == "__main__":
    clear_history()