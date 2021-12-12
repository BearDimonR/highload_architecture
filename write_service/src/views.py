import redis
from flask import request, Blueprint, jsonify
from rq import Connection, Queue
from rq.exceptions import NoSuchJobError
from rq.job import Job

from src import config
from src.tasks import create_task, edit_task

controller = Blueprint("views", __name__,)


@controller.route('/add', methods=['POST'])
def add():
    with Connection(redis.from_url(config.REDIS_URL)):
        q = Queue()
        task = q.enqueue(create_task, request.get_json(force=True))
    response_object = {
        "status": "success",
        "data": {
            "taskId": task.get_id()
        }
    }
    return jsonify(response_object), 202


@controller.route('/edit/<book_id>', methods=['PATCH'])
def edit(book_id):
    data = request.get_json(force=True)
    data['obj_id'] = book_id
    with Connection(redis.from_url(config.REDIS_URL)):
        q = Queue()
        task = q.enqueue(edit_task, data)
    response_object = {
        "status": "success",
        "data": {
            "taskId": task.get_id()
        }
    }
    return jsonify(response_object), 202


@controller.route("/check_status/<job_id>", methods=['GET'])
def check_status(job_id):
    with Connection(redis.from_url(config.REDIS_URL)):
        try:
            job = Job.fetch(job_id)
        except NoSuchJobError:
            job = None
    if not job:
        return 'No such job', 204
    return jsonify({"job_id": job.id, "job_status": job.get_status()})
