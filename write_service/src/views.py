import redis
from flask import request, Blueprint, jsonify
from rq import Connection, Queue

from src import config
from src.tasks import create_task, edit_task

controller = Blueprint("views", __name__,)


@controller.route('/add', methods=['POST'])
def add():
    with Connection(redis.from_url(config.REDIS_URL)):
        q = Queue()
        task = q.enqueue(create_task, request.get_json())
    response_object = {
        "status": "success",
        "data": {
            "task_id": task.get_id()
        }
    }
    return jsonify(response_object), 202


@controller.route('/edit/<book_id>', methods=['PATCH'])
def edit(book_id):
    # TODO CHECK IF BOOK EXISTS
    data = request.get_json()
    data['obj_id'] = book_id
    with Connection(redis.from_url(config.REDIS_URL)):
        q = Queue()
        task = q.enqueue(edit_task, data)
    response_object = {
        "status": "success",
        "data": {
            "task_id": task.get_id()
        }
    }
    return jsonify(response_object), 202
