/** @format */

import axios, { Method, AxiosRequestHeaders, AxiosRequestConfig  } from "axios";
import qs from "qs"

import { handleResponseErrors } from "./tools";
// import router from "../router";
// import { Message } from "element-ui";
axios.defaults.withCredentials = true

const service = axios.create({
  timeout: 5000,
  // baseURL: "/api"
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);


// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      if (res.data.code === 403) {
        // router.push({ path: "/login" });
      }
      // if (res.data.code !== 0) {
      //   Message.error(res.data.msg);
      // }
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在200的范围
      handleResponseErrors(response.status, response.data.msg);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
);

type axiosOptions = {
  method: Method , 
  url:string, 
  headers: AxiosRequestHeaders,
  params?:object,
  data?:object
}

// function $http(method:Method , url:string, type: number, params?: object) {
//   let contentType = [
//     "application/x-www-form-urlencoded",
//     "application/json",
//     "multipart/form-data;charset=UTF-8"
//   ];
//   let headers = { "content-type": contentType[type], Referer: 'https://www.bilibili.com/' };

//   // if (token === true)
//   //   headers["Authorization"] = "Bearer " + localStorage.getItem("token");

//   if (type === 0) params = qs.stringify(params);
//   let axiosOptions:axiosOptions = { method, url, headers };
//   if (method.toUpperCase() === "GET") {
//     axiosOptions["params"] = params;
//   } else {
//     axiosOptions["data"] = params;
//   }
//   return service(axiosOptions);
// }

export interface BaseData<T = any> {
  code: number;
  message: string;
  data: T;
}

const request = async <T = any>(config: AxiosRequestConfig): Promise<BaseData<T>> => {
  if (config.method && config.method.toUpperCase() === "POST") {
    config.data = qs.stringify(config.data)
  }
  const data:BaseData<T> = await service.request(config)
  return data
}

export { request };
