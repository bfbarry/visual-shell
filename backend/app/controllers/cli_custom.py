import sys
from app import app
from os.path import join, dirname, realpath, basename
import subprocess as sp
from flask import jsonify
import json
import re

config_path = join(dirname(dirname(dirname(realpath(__file__)))), 'config')
bookmark_config_path = join(config_path, 'bookmarks.json')
handler_config_path = join(config_path, 'handlers.json') # TODO: this could bloat
handlers_root = join(dirname(dirname(dirname(realpath(__file__)))), 'cli', 'handlers')
_BASE_EXT = ['h5', 'csv', 'json']
with open(handler_config_path, 'r') as f:
    handlers = json.load(f)

# TODO these should be in function get_handlers
# insert base handlers
base_keys = {f'*{e}' for e in _BASE_EXT}
default_handlers_missing = not base_keys.issubset(set(handlers.keys()))
if default_handlers_missing:
    for ext in _BASE_EXT:
        k = f'*.{ext}'
        handler_path = join(handlers_root, f'default_handler_{ext}.py')
        handlers[k] = handler_path
        with open(handler_config_path, 'w') as f:
            json.dump(handlers, f, indent=4)


def get_handler(fpath):
    # TODO: default handler not wokring
    handler_path = handlers.get(fpath)
    if not handler_path:
        # find default handler
        fname = basename(fpath)
        period_ixs = [i for i, s in enumerate(fname) if s == '.']
        try:
            last_period_ix = period_ixs[-1]
            file_ext = fname[last_period_ix+1:]
            if file_ext in _BASE_EXT:
                handler_path = handlers[f'*.{file_ext}']
                return handler_path
        except IndexError:
            pass
        return ''

    return handler_path


def handle(handler_path, file_path) -> json:
    """
    fpath (str): path of file to consume by custom handler
    interface consideration: might rename this differently than the custom shell command?
    """
    # TODO for now, assumes it's handled by a python script
    path, module = dirname(handler_path), basename(handler_path).split('.py')[0]
    sys.path.append(path)
    module = __import__(module, fromlist=['main'])
    main = getattr(module, 'main') # main always takes in a file path
    return jsonify(main(file_path))


def attach_handler(fpath):
    ...


def get_bookmarks():
    with open(bookmark_config_path, 'r') as f:
        bookmarks = json.load(f)
    
    return bookmarks


def get_bookmark_objects():
    bookmarks = get_bookmarks()
    bookmark_objects = [{'alias': k, 'path': v} for k,v in bookmarks.items()]
    return jsonify(bookmark_objects)

# TODO error handling with these functions
def save_dir_bookmark(alias, path) -> None:
    bookmarks = get_bookmarks()
    if alias in bookmarks.keys():
        return jsonify({'error': 'alias already in use'}), 406
    if path in bookmarks.values():
        return jsonify({'error': 'bookmark to this path already in use'}), 406
    new_bookmark = {
        alias: path
    }
    bookmarks = {**bookmarks, **new_bookmark}
    with open(bookmark_config_path, 'w') as f:
        json.dump(bookmarks, f, indent=4)
    return jsonify({}), 201


def delete_bookmark(alias):
    # Read the existing data from the file
    bookmarks = get_bookmarks()

    if alias in bookmarks:
        del bookmarks[alias]
    else:
        return {'error': f'could not find bookmark {alias}'}
    
    with open(bookmark_config_path, 'w') as f:
        json.dump(bookmarks, f, indent=4)
    return jsonify({}), 200


def list_handlers() -> list:
    # should be filterable by file extension
    handler_modules = [basename(v) for v in handlers.values()]
    return handler_modules


if __name__ == '__main__':
    print(get_handler('/Users/brianbarry/Desktop/computing/visual-shell/backend/cli/test_data.csv'))
    ...
