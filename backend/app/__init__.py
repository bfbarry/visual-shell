from flask import Flask, Blueprint
from flask_cors import CORS
from logging.config import dictConfig

# for logging, enables use of app.logger.info etc
dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

app = Flask(__name__)
app.config["DEBUG"] = True
# app.config['PWD'] = '/Users/brianbarry'
app.config['PWD'] = '/Users/brianbarry'
CORS(app, origins='http://localhost:3000')
api = Blueprint('api', __name__)

from app import routes
app.register_blueprint(api, url_prefix='/api/cli')