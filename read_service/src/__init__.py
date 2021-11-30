from flask import Flask

from .models import db
import config


def create_app():
    flask_app = Flask(__name__)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_CONNECTION_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.config['CACHE_TYPE'] = config.CACHE_TYPE
    flask_app.config['CACHE_DEFAULT_TIMEOUT'] = config.CACHE_DEFAULT_TIMEOUT
    flask_app.config['CACHE_REDIS_URL'] = config.REDIS_URL
    flask_app.app_context().push()
    db.init_app(flask_app)
    db.create_all()

    from .views import controller
    flask_app.register_blueprint(controller)
    flask_app.shell_context_processor({"app": flask_app, "db": db})

    return flask_app
