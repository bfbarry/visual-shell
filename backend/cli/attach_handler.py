import argparse
from os.path import exists, dirname, join, realpath
import json


"""
TODO
Add to visual shell notes: custom file interface, eg for epad reads it using python and shows summary stats, 
generates common code use cases.  Same concept for csv, hdf5, model. Json and logs open with $less option. 
Open other files with other apps (eg jpeg) word cloud or plots on json

Gist when hover on file
"""
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--file', dest='file')
    parser.add_argument('--handler', dest='handler')
    cl_args = parser.parse_args()

    config_path = join(dirname(dirname(realpath(__file__))), 'config', 'handlers.json') # TODO one json could bloat
    new_item = {cl_args.file: cl_args.handler}
    with open(config_path, 'r') as f:
        handler_config = json.load(f)
    with open(config_path, 'w') as f:
        handler_config = {**handler_config, **new_item}
        json.dump(handler_config, f)