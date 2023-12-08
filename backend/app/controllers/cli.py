from app import app
import os
from os.path import join, dirname, realpath
from flask import jsonify
import json
from .helpers import run_shell_no_stdout, run_shell_stdout, is_text, sub_tilde
import logging


def tty(text):
    # TODO use subprocess and get exit code
    os.chdir(app.config['PWD'])
    os.system(text)
    return jsonify({'ok':'yes'})


def ls(path=None):
    """
    path (str): full path
    """
    if path == None:
        path = app.config['PWD']
    contents = [
                {'name'  : '.', 
                'isdir' : True,
                'is_text': False,
                'path'  : path,
                'has_handler': False},
                {
                'name'  : '..', 
                'isdir' : True,
                'is_text': False,
                'path'  : '/'.join(path.split('/')[:-1]),
                'has_handler': False
                },
                ]

    for e in os.scandir(sub_tilde(path)):
        entity_path = join(path, e.name)
        contents.append({
                'name'  : e.name,
                'isdir' : e.is_dir(),
                'is_text': is_text(e.name),
                'path'  : entity_path, 
                'has_handler': False if e.is_dir() or is_text(e.name) else True
                })
    return jsonify(contents)


def cwd():
    return app.config['PWD']


def cd(target):
    target = sub_tilde(target)
    if target[0] == '/':
        dir_text = target
    else:
        dir_text = join(app.config['PWD'], target)

    if not os.path.exists(dir_text):
        return jsonify({'err': f'cd: no such file or directory: {target}'})
    app.config['PWD'] = dir_text
    return ls()


def code(target):
    pwd = '/'.join(target.split('/')[:-1])
    try:
        run_shell_no_stdout(f'code {pwd} && code {target}')
        return jsonify('ok')
    except Exception as e:
        return f'500: {e}'