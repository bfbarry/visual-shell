import json

def main(fpath) -> dict:
    with open(fpath, 'r') as f:
        d = json.load(f)
    return d