from app import api, app
from app.controllers import cli, cli_custom
from flask import request


@api.route('/ls', methods=['GET'])
def ls():
    try: # no try/catch results in 415 from get_json() on non json request
        data = request.get_json()
    except:
        data = {}
    if not data:
        data = {}
    return cli.ls(data.get('target'))


@api.route('/pwd', methods=['GET'])
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

## tty
@api.route('/tty', methods=['POST'])
def tty():
    data = request.get_json() or {}
    return cli.tty(data.get('target'))

## custom cli
@api.route('/handle', methods=['POST'])
def handle():
    data = request.get_json() or {}
    return cli_custom.handle(data.get('handler_path'), data.get('file_path'))


