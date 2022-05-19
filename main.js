// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const path = require('path');
const { JdkService } = require('./node/jdk');

const jdkService = new JdkService();


let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    center: true,
    darkTheme: true,
    hasShadow: true,
    fullscreenable: false,
    autoHideMenuBar: false,
    resizable: true,
    maximizable: false,
    transparent: true,
    backgroundColor: '#0000',
    webPreferences: {
      preload: path.join('preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile("./src/views/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  jdkService.getCurrentVersion().then(out => {

    mainWindow.webContents.send('version', out);
  });


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('getversion', (event, arg) => {
  jdkService.getCurrentVersion().then(out => {
    mainWindow.webContents.send('version', out);
  });
});


ipcMain.on('getlist', (event, arg) => {

  jdkService.getVersionsList().then(out => {
    mainWindow.webContents.send('list', out);
  });
});



