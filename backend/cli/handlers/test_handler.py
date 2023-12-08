import sys
from  pathlib import Path
import os
from os.path import dirname, basename
import json


here_dir = Path(__file__).parent.absolute()
H5_FILE_PATH = '/Users/brianbarry/Desktop/computing/visual-shell/backend/cli/dummy_data.h5'
handler = "/Users/brianbarry/Desktop/computing/visual-shell/backend/cli/handlers/base_handler_h5.py"
if __name__== '__main__':
    path, module = dirname(handler), basename(handler).split('.py')[0]
    sys.path.append(path)
    module = __import__(module, fromlist=['main'])
    main = getattr(module, 'main') # main always takes in a file path
    out = main(H5_FILE_PATH)
    print(json.dumps(out, indent=4))
