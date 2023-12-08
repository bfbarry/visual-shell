import sys
from os.path import join, dirname, realpath, basename
import subprocess as sp
from flask import jsonify
import json


handler_path = join(dirname(dirname(dirname(realpath(__file__)))), 'config', 'handlers.json') # TODO: this could bload
with open(handler_path, 'r') as f:
    handlers = json.load(f)

def handle(fpath) -> json:
    """
    fpath (str): path of file to consume by custom handler
    interface consideration: might rename this differently than the custom shell command?
    """
    
    handler = handlers.get(fpath)
    if not handler:
        return jsonify({})

    # TODO for now, assumes it's handled by a python script
    path, module = dirname(handler), basename(handler).split('.py')[0]
    sys.path.append(path)
    module = __import__(module, fromlist=['main'])
    main = getattr(module, 'main') # main always takes in a file path
    return jsonify(main(fpath))


def list_handlers() -> list:
    # should be filterable by file extension
    handlers = handlers.values()


if __name__ == '__main__':
    print(handle('/Users/brianbarry/Desktop/computing/visual-shell/backend/cli/dummy_data.csv'))
