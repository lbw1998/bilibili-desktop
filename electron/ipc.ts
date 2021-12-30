const { ipcMain } = require('electron')


// 控制窗口
function handleWindow(mainWindow) {
  ipcMain.on('handleWindow', (e,type) => {
    if (type === 'minWindow' ) {
      mainWindow.minimize();
    } else if (type === 'maxWindow') {
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
    } else {
      mainWindow.destroy()
    }
  })
}

// 查询cookie
function cookie(session) {
  ipcMain.on('getCookie', (e,options) => {
    // 查询所有 cookies。
    session.defaultSession.cookies.get(options)
    .then((cookies) => {
      e.returnValue = cookies
    }).catch((error) => {
      e.returnValue = error
    })
  })
  ipcMain.on('clearCookie', (e,options) => {
    // 查询所有 cookies。
    session.defaultSession.cookies.remove(options.url, options.name)
  })
}

module.exports = { handleWindow , cookie}