import h5py
import numpy as np
import pandas as pd
from datetime import datetime 
from  pathlib import Path
import os, sys
import json

here_dir = Path(__file__).parent.absolute()
sys.path.append(here_dir)
from handlers.default_handler_h5 import main as h5_handler_main

CSV_FILE_PATH = os.path.join(here_dir, 'test_data.csv')
H5_FILE_PATH = os.path.join(here_dir, 'test_data.h5')


def create_file_h5():
    data = {'metadata': {'version': '2.4', 'date': str(datetime.now())}, 
            'data1': {'values': np.random.rand(5,5), 
                    'stats': np.random.rand(5),
                    'nested_data_group': {
                        'values2': np.random.rand(10)
                        }
                    },
            'data2': {'values': np.random.rand(5,5)},
            'data3': {'values': np.random.rand(5,5)},
            'data4': {'values': np.random.rand(5,5)},
            'data5': {'values': np.random.rand(5,5)},
            'data6': {'values': np.random.rand(5,5)},
            }
    
    with h5py.File(H5_FILE_PATH, 'w') as f:
        grp = f.create_group("data1")
        grp.attrs['notes'] = 'here are some notes on this group.'
        for i in range(1,7):
            f.create_dataset(f'data{i}/values', data=data[f'data{i}']['values'])
        dset_with_attrs = f.create_dataset('data1/stats', data=data['data1']['stats'])
        dset_with_attrs.attrs['method'] = 'pearson r^2'
        f.create_dataset('data1/nested_data_group/values2', data=data['data1']['nested_data_group']['values2'])
        for k,v in data['metadata'].items():
            f.attrs[k] = v

        with open(f"{Path(H5_FILE_PATH).parent.absolute()}/dummy_output_h5.json", 'w') as f2:
            h5_handled = h5_handler_main(H5_FILE_PATH)
            json.dump(h5_handled, f2, indent=4)


def create_file_csv():
    np.random.seed(0)
    df = pd.DataFrame({
        'height': np.random.normal(170, 10, 10),
        'age': np.random.normal(30, 10, 10),
        'weight': np.random.normal(70, 15, 10)
    })
    df = df.round(4)
    df.to_csv(CSV_FILE_PATH, index=False)


if __name__ == '__main__':
    create_file_h5()
    create_file_csv()