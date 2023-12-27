# visual shell

built on node and react

# TODO
- `ls` is too dang slow
- error handling
    - cd enter
    - bookmarks
- back button (separate from `..`)
- FS events for config files
- create new file button
- h5, csv handler
- right click context menu
- 'workflows' kind of like aliases but more temporary
    - eg., checking ls -la | grep thing of directory
    - keep this in sidebar
- expandable cli zones
- make micro python 'shell' scripts (have all os and path modules pre imported) in the terminal, runs as child_process
    - could just create a directory specifically for these scripts, and open it directly with vs code!
- other figma stuff
- clicking on a file should have different behavior depending on what it is
    - remove the 'opacity' between what you see in `ls` and underlying data
        - certain file formats (csv, pickle, h5py) automatically open a jupyter notebook with prewritten code to load it upon click?
- graphical `mv`: select to and from
- combine with brian_utils (like git thing)
- console/command line should have console controller, which then delegates to different functions based on string input (e.g., mkdir, cd, grep)
- show connection status with ssh so user doesn't have to type to find out

## UI
- should be able to have a view with full history (like a regular shell)
# Issues
- how to ensure security if it grows as an ecosytem?