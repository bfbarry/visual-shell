import pandas as pd

def main(fpath):
    df = pd.read_csv(fpath)
    return df.to_json()