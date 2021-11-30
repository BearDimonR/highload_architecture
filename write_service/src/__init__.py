from flask import Flask
from sqlalchemy.exc import OperationalError

from .models import db
import config


def create_app():
    flask_app = Flask(__name__)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.DATABASE_CONNECTION_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    flask_app.app_context().push()
    db.init_app(flask_app)
    try:
        db.create_all()
    except OperationalError:
        pass

    from .views import controller
    flask_app.register_blueprint(controller)
    flask_app.shell_context_processor({"app": flask_app, "db": db})
    return flask_app
