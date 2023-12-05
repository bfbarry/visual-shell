import os
import subprocess as sp
from .. import app


def run_shell_no_stdout(cmd):
    sp.run(cmd, shell=True)


def run_shell_stdout(cmd):
    out = sp.run(cmd,  capture_output=True, text=True, shell=True).stdout.strip("\n")
    return out


def sub_tilde(s):
    """TODO: redundant with expanduser"""
    if s[0] == '~':
        s = s.replace('~', os.path.expanduser('~'))
        return s
    return s


def is_text(path):
    file_stdout = run_shell_stdout(f'file --mime-type {os.path.join(app.config["PWD"], path)}')
    return ': text' in file_stdout