import Cookies from 'js-cookie';

const BiliCSRF = 'bili_jct'

export function getBiliCSRF() {
  return Cookies.get(BiliCSRF)
}