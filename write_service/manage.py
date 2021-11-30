import redis
from flask.cli import FlaskGroup
from rq import Connection, Worker

import config
from src import create_app

cli = FlaskGroup(create_app=create_app)


@cli.command("run_worker")
def run_worker():
    redis_url = config.REDIS_URL
    redis_connection = redis.from_url(redis_url)
    with Connection(redis_connection):
        worker = Worker(config.QUEUES)
        worker.work()


if __name__ == "__main__":
    cli()
