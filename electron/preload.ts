// preload.js
console.log(1111111);
const {session} = require('electron');

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
const filter = {
  urls: ["*://*/*"]
}
session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback)=> {
  details.requestHeaders['origin'] = "https://www.bilibili.com"
  details.requestHeaders['referer'] = "https://www.bilibili.com"
  callback({ requestHeaders: details.requestHeaders });
})
// 查询所有 cookies。
session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })