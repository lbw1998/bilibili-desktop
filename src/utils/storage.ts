const BiliCSRF = 'bili_jct'

export function getBiliCSRF() {
  return localStorage.get(BiliCSRF)
}

export function setBiliCSRF(csrf:string) {
  return localStorage.set(BiliCSRF, csrf)
}

export function clearBiliCSRF() {
  return localStorage.set(BiliCSRF,'')
}