import os, subprocess as sp
from flask import jsonify
from app import app
from .helpers import is_code, sub_tilde

def ls(path=None):
    """
    path (str): full path
    """
    if path == None:
        path = app.config['PWD']
    print(sub_tilde(path))
    contents = [{
                'name'  : '..', 
                'isdir' : True,
                'iscode': False,
                'path'  : '/'.join(path.split('/')[:-1])
                }]
    for e in os.scandir(sub_tilde(path)):
        contents.append({
                'name'  : e.name, 
                'isdir' : e.is_dir(),
                'iscode': is_code(e.name),
                'path'  : os.path.join(path, e.name)
                })
    return jsonify(contents)


def cwd():
    return app.config['PWD']


def cd(target):
    target = sub_tilde(target)
    if target[0] == '/':
        dir_text = target
    else:
        dir_text = os.path.join(app.config['PWD'], target)

    if not os.path.exists(dir_text):
        return jsonify({'err': f'cd: no such file or directory: {target}'})
    app.config['PWD'] = dir_text
    return ls()


def code(target):
    pwd = '/'.join(target.split('/')[:-1])
    try:
        sp.run(f'code {pwd} && code {target}', shell=True)
        return jsonify('ok')
    except Exception as e:
        return f'500: {e}'