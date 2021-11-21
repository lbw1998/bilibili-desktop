import { ElMessage } from "element-plus";
// import router from "@/router";


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

export {   handleResponseErrors };
