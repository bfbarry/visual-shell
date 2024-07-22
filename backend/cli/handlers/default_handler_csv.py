import pandas as pd
import json


def main(fpath) -> dict:
    df = pd.read_csv(fpath)
    # to_json -> json.loads to convert nans to None
    summarized = json.loads(df.describe(include='all').to_json())
    return summarized