
function setReferer(session) {
  const filter = {
    urls: ["*://*/*"]
  }
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback)=> {
    details.requestHeaders['origin'] = "https://www.bilibili.com"
    details.requestHeaders['referer'] = "https://www.bilibili.com"
    callback({ requestHeaders: details.requestHeaders });
  })
}

module.exports = { setReferer }