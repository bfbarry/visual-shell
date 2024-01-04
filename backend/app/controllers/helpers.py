import os
import subprocess as sp
from .. import app


def run_shell_no_stdout(cmd):
    sp.run(cmd, shell=True)


def run_shell_stdout(cmd):
    """make sure targets have spaces handled"""
    try:
        out = sp.run(cmd, capture_output=True, text=True, shell=True, timeout=3).stdout.strip("\n")
    except sp.TimeoutExpired as e:
        app.logger.error('timeout expired in run_shell_stdout')
        return 'run_shell_stdout sp.TimeoutExpired'

    return out


def sub_tilde(s):
    """TODO: redundant with expanduser"""
    if s[0] == '~':
        s = s.replace('~', os.path.expanduser('~'))
        return s
    return s


def is_text(path):
    # TODO does not flag empty text files as text (since file type is inode/x-empty)
    path = path.replace(' ', '\\')
    file_stdout = run_shell_stdout(f'file --mime-type {path}')
    return ': text' in file_stdout