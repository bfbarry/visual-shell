import h5py
import numpy as np
import pandas as pd
from datetime import datetime 
from  pathlib import Path
import os


here_dir = Path(__file__).parent.absolute()
CSV_FILE_PATH = os.path.join(here_dir, 'dummy_data.csv')
H5_FILE_PATH = os.path.join(here_dir, 'dummy_data.h5')


def create_file_h5():
    data = {'metadata': {'version': '2.4', 'date': str(datetime.now())}, 
            'data': {'values': np.random.rand(5,5), 
                    'stats': np.random.rand(5),
                    'nested_data_group': {
                        'values2': np.random.rand(10)
                        }
                    }
            }
    
    with h5py.File(H5_FILE_PATH, 'w') as f:
        grp = f.create_group("data")
        grp.attrs['notes'] = 'here are some notes on this group.'
        f.create_dataset('data/values', data=data['data']['values'])
        dset_with_attrs = f.create_dataset('data/stats', data=data['data']['stats'])
        dset_with_attrs.attrs['method'] = 'pearson r^2'
        f.create_dataset('data/nested_data_group/values2', data=data['data']['nested_data_group']['values2'])
        for k,v in data['metadata'].items():
            f.attrs[k] = v


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