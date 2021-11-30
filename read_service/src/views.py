import flask
from flask import Blueprint, jsonify
from flask_caching import Cache

from src.models import Book
from src.services import get_instance, get_all_instances

controller = Blueprint("views", __name__,)
cache = Cache(flask.current_app)


@controller.route('/get/<book_id>', methods=['GET'])
@cache.cached(timeout=30, query_string=True)
def get(book_id):
    result = get_instance(Book, book_id)
    if result is None:
        return '', 404
    return jsonify(result.as_dict()), 200


@controller.route('/get', methods=['GET'])
def get_all():
    result = map(get_all_instances(Book), lambda val: val.as_dict())
    return result, 200
