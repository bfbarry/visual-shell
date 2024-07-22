import unittest
from ..cli.handlers import default_handler_h5
from pathlib import Path
import os
import h5py


here_dir = Path(__file__).parent.absolute()
test_data_path = ...

class HandlerTest(unittest.TestCase):
    def testH5(self):
        # TODO...
        with h5py.File(test_data_path, 'r') as f:
            default_handler_h5._h5_traverse_and_read()
