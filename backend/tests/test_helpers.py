import unittest
from pathlib import Path
import os

here_dir = Path(__file__).parent.absolute()
data_dir = os.path.join(here_dir, 'data')

import sys
sys.path.append(os.path.dirname(here_dir))
from app.controllers.helpers import is_text

class HelpersTest(unittest.TestCase):
    def testIsText(self):
        fs_true = ['test.py', 'testempty', 'testnoext',]
        fs_false = ['bin.out', 'test.pdf']
        for f in fs_true:
            self.assertTrue(is_text(os.path.join(data_dir, f)))
        for f in fs_false:
            self.assertFalse(is_text(os.path.join(data_dir, f)))  
