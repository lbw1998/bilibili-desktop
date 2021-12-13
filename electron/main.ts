// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const {session} = require('electron');
app.commandLine.appendSwitch('disable-web-security');
function createWindow() {
  Menu.setApplicationMenu(null)
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 840,
    minWidth: 1200,
    minHeight: 840,
    frame: false,
    webPreferences: {
      webSecurity: false,
      // preload: path.join(__dirname, "preload.ts"),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  const filter = {
    urls: ["*://*/*"]
  }
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback)=> {
    details.requestHeaders['origin'] = "https://www.bilibili.com"
    details.requestHeaders['referer'] = "https://www.bilibili.com"
    callback({ requestHeaders: details.requestHeaders });
  })
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  ipcMain.on('handleWindow', (e,type) => {
    if (type === 'minWindow' ) {
      mainWindow.minimize();
    } else if (type === 'maxWindow') {
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
    } else {
      mainWindow.destroy()
    }
  })
  mainWindow.webContents.openDevTools();
}
app.on("ready", () => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});