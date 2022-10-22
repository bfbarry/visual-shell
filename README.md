# visual shell

built on node and react

# Dependencies
- path, fs, child_process
# TODO
- LsWindow
    - should have all the ls options?
- clicking on a file should have different behavior depending on what it is
    - files, `cd`
    - code, open vscode 
- combine with brian_utils (like git thing)
- console/command line should have console controller, which then delegates to different functions based on string input (e.g., mkdir, cd, grep)
- set global variables (e.g., pwd)
    - do these have to be all the 'global variables', like for any shell emulator?
- make micro python 'shell' scripts (have all os and path modules pre imported) in the terminal, runs as child_process
    - could just create a directory specifically for these scripts, and open it directly with vs code!

## UI
- should be able to have a view with full history (like a regular shell)
# Issues
- how to ensure security if it grows as an ecosytem?