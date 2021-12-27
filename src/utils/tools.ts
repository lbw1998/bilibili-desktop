import { ElMessage } from "element-plus";
import store from "./store";
// import router from "@/router";

// 处理时间戳
export const parseTimestamp = (timestamp :number) => {
  function zeroize( num:number ) {
    return (String(num).length == 1 ? '0' : '') + num;
  }

  var curTimestamp = ~~(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数

  var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
  var tmDate = new Date( timestamp * 1000 );  // 参数时间戳转换成的日期对象

  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if ( timestampDiff < 60 ) { // 一分钟以内
    return "刚刚";
  } else if( timestampDiff < 3600 ) { // 一小时前之内
    return Math.floor( timestampDiff / 60 ) + "分钟前";
  } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
    return '今天' + zeroize(H) + ':' + zeroize(i);
  } else {
    var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
    if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
      return '昨天' + zeroize(H) + ':' + zeroize(i);
    } else if ( curDate.getFullYear() == Y ) {
      return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    } else {
      return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
    }
}
}

// 处理数量
export const formatNumber = (num:number) => {
  if (num > 100000000) {
    return (num/100000000).toFixed(1) + '亿'
  }  else if(num > 10000) {
    return (num/10000).toFixed(1) + '万'
  } else {
    return num
  }
}
// 处理时长
export const formatTime = (time:number | string) => {
  if (typeof time == 'string') {
    let arr = time.split(':')
    time = Number(Number(arr[0])*60 + Number(arr[1]))
  }
  let h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600)
  let m = Math.floor((time / 60 % 60)) < 10 ? '0' + Math.floor((time / 60 % 60)) : Math.floor((time / 60 % 60))
  let s = Math.floor((time % 60)) < 10 ? '0' + Math.floor((time % 60)) : Math.floor((time % 60))
  return `${time > 3600 ? (h + ':'): ''}${m}:${s}`
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
// const toLogin = () => {
//   router.replace({
//     path: "/",
//     query: {
//       redirect: router.currentRoute.fullPath
//     }
//   });
// };

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} msg 请求失败的返回信息
 */
const handleResponseErrors = (status: number, msg:string) => {
  switch (status) {
    case 401:
      // showMsg('登录过期，请重新登录', 'error');
      // 清除token
      // localStorage.clear();
      // // toLogin();
      // this.$router.push({ path: "/login" });
      break;
    case 404:
      ElMessage.error("网络请求不存在");
      break;
    case 500:
      ElMessage.error("系统错误,请联系管理员");
      break;
    default:
      ElMessage.error(msg);
  }
};

export { handleResponseErrors };
