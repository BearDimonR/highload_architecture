import flask
from flask import Blueprint, jsonify
from flask_caching import Cache

from src.models import Book
from src.services import get_instance, get_all_instances

controller = Blueprint("views", __name__,)
cache = Cache(flask.current_app)


@controller.route('/get', methods=['GET'])
@cache.cached(timeout=5)
def get_all():
    result = list(map(lambda val: val.as_dict(), get_all_instances(Book)))
    return jsonify(result), 200

@controller.route('/get/<book_id>', methods=['GET'])
@cache.cached(timeout=10, query_string=True)
def get(book_id):
    print('---- id ----')
    result = get_instance(Book, book_id)
    if result is None:
        return '', 404
    return jsonify(result.as_dict()), 200
