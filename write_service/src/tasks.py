from src import services
from src.models import Book


def create_task(request):
    services.add_instance(Book,
                          isbn=request.get('isbn', None),
                          book_title=request.get('book_title', None),
                          category_name=request.get('category_name', None),
                          date_of_publication=request.get('date_of_publication', None),
                          price=request.get('price', None),
                          copies=request.get('copies', None))


def edit_task(request):
    services.edit_instance(Book, **request)
