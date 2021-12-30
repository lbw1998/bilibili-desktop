const { ipcRenderer  } = require('electron')

const BiliCSRF = 'bili_jct'
const domain = '.bilibili.com' 

export function getBiliCSRF() {
  return ipcRenderer.sendSync('getCookie', {name: BiliCSRF, domain})[0].value
}

export function clearCookie() {
  return ipcRenderer.send('clearCookie', {url: '/', name: BiliCSRF})
}