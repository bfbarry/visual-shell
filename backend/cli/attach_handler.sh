#!/bin/zsh

# TODO export these to shell
# usage: handle /path/to/file /path/to/handler
thisdir=${0:a:h}
handle () {
    python $thisdir/attach_handler.py --file $1 --handler $2    
}