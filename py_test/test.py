from _pytest import pathlib


def test_database_availability():
    db_path = "db/database.db"
    file = pathlib.Path(db_path)
    assert file.exists()
