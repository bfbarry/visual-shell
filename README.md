# visual shell
![](img/demo.gif)
Visual shell is a file system UI, optimized for developers. (The goal is to more generally make it a UI wrapper for the command line interface.)

Current features
- Navigation
    - ls window
    - directory bookmarks
    - file name filter
    - open text files with VS code directly
- File exploration
    - Visualize data with custom and default file handlers
    - Currently supports: csv and hdf5 files

## Requirements:
- Have VS code installed
    - ensure VS code binaries are added to the path with
    ```shell
    export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
    ```
- Electron app built on flask and react 

## To run
```shell
$ cd electron-app && npm run make
$ python backend/run.py
```
and open the application in `electron-app/out`


## Command tracker (@self)
- npm init electron-app@latest my-new-app -- --template=webpack