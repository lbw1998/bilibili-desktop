// main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const {session} = require('electron');
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.commandLine.appendSwitch('disable-web-security');
const referer = require("./referer.ts")

const ipc = require("./ipc.ts")

function createWindow() {
  Menu.setApplicationMenu(null)
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 840,
    minWidth: 1200,
    minHeight: 840,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      webSecurity: false,
      // preload: path.join(__dirname, "preload.ts"),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000/");
    mainWindow.webContents.openDevTools();
} else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  ipc.handleWindow(mainWindow)
}

app.on("ready", () => {
  createWindow();
  referer.setReferer(session)
  ipc.cookie(session)
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});