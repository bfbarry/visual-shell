import os
import subprocess as sp
from .. import app
import mimetypes

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


def is_text(filepath, max_bytes=512) -> bool:
    # Define the range of valid ASCII text characters
    text_characters = bytearray({7, 8, 9, 10, 12, 13, 27} | set(range(0x20, 0x100)))
    
    try:
        with open(filepath, 'rb') as file:
            header = file.read(5)
            if header == b'%PDF-': # 
                return False
            # Read up to max_bytes from the file
            chunk = file.read(max_bytes)
            
            if not chunk:
                # If the file is empty, consider it a text file
                return True

            # Check for the presence of non-text characters
            if any(byte not in text_characters for byte in chunk):
                return False

            return True
        
    except Exception as e:
        return False