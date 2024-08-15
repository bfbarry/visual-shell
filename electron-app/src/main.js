const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let flaskProcess;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
  // and load the index.html of the app.
  console.log(MAIN_WINDOW_WEBPACK_ENTRY)
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // const src = path.join(path.dirname(path.dirname(__dirname)), 'src')
  // mainWindow.loadFile(`./src/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  // Start the Flask server
  const py_exec = '/Users/brianbarry/Desktop/computing/visual-shell/backend/venv/bin/python'
  const server_entry = '/Users/brianbarry/Desktop/computing/visual-shell/backend/run.py'

  flaskProcess = spawn(py_exec, [server_entry]);

  flaskProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  flaskProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  flaskProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  // Wait a bit for the server to start
  setTimeout(createWindow, 3000);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  if (flaskProcess) {
    flaskProcess.kill();
  }
});
