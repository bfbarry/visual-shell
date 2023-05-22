import os


def sub_tilde(s):
    """TODO: redundant with expanduser"""
    if s[0] == '~':
        s = s.replace('~', os.path.expanduser('~'))
        return s
    return s


def is_code(path):
    code_exts = '.py.sh.csh.m.php.pl.c.cpp.js.zshrc.bashrc'
    local_path = path.split('/')[-1]
    if '.' in local_path and local_path.split('.')[-1] in code_exts:
        return True
    return False