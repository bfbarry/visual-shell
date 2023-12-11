import sys
from app import app
from os.path import join, dirname, realpath, basename
import subprocess as sp
from flask import jsonify
import json
import re


handler_config_path = join(dirname(dirname(dirname(realpath(__file__)))), 'config', 'handlers.json') # TODO: this could bloat
handlers_root = join(dirname(dirname(dirname(realpath(__file__)))), 'cli', 'handlers')
_BASE_EXT = ['h5', 'csv', 'json']
with open(handler_config_path, 'r') as f:
    handlers = json.load(f)

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
    handler_path = handlers.get(fpath)
    if not handler_path:
        # find default handler
        fname = basename(fpath)
        period_ixs = [m.start() for m in re.finditer('.', fname)]
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


def list_handlers() -> list:
    # should be filterable by file extension
    handler_modules = [basename(v) for v in handlers.values()]
    return handler_modules


if __name__ == '__main__':
    # print(handle('/Users/brianbarry/Desktop/computing/visual-shell/backend/cli/dummy_data.csv'))
    ...
