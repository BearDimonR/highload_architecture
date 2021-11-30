from src import services
from src.models import Book


def create_task():
    services.add_instance(Book, name=name, price=price, breed=breed)


def edit_task():
    services.edit_instance(Book, id=book_id, price=new_price)
