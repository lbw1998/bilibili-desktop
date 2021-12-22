import Cookies from "js-cookie"

const BiliCSRF = 'bili_jct'

export function getBiliCSRF() {
  return Cookies.get(BiliCSRF)
}

export function setBiliCSRF(value:string, option:Object) {
  return Cookies.set(BiliCSRF,value, option)
}

export function clearCookie() {
  Cookies.remove(BiliCSRF)
}