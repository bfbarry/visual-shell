from flask import Flask, Blueprint
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
# app.config['PWD'] = '/Users/brianbarry'
app.config['PWD'] = '/home/bbarry'
CORS(app, origins='http://localhost:3000')
api = Blueprint('api', __name__)

from app import routes
app.register_blueprint(api, url_prefix='/api/cli')