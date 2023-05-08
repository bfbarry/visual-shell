from app import api, app
from app.controllers import cli
from flask import request


@api.route('/ls', methods=['GET'])
def ls():
    data = request.get_json() or {}
    return cli.ls(data.get('target'))


@api.route('pwd', methods=['GET'])
def pwd():
    return cli.cwd()


@api.route('/cd', methods=['POST'])
def cd():
    data = request.get_json() or {}
    return cli.cd(data.get('target'))


@api.route('/code', methods=['POST'])
def code():
    data = request.get_json() or {}
    return cli.code(data.get('target'))