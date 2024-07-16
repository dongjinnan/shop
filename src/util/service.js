import axios from "axios"
import qs from "qs"
import store from "../store/index.js"
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

//const loadingObj = null
//使用create创建axios实例
const Service = axios.create({
    timeout:8000,
    baseURL:"http://127.0.0.1:3007/api/",
    headers:{
        //"Content-type":"application/json;charset=utf-8"
        'Content-Type': 'application/x-www-form-urlencoded',
        "Authorization": store.state.uInfo.token
    },
    transformRequest: [function (data) {
        return qs.stringify(data);
    }]
})

// 请求拦截-增加loading,对请求做统一处理
Service.interceptors.request.use(config=>{
    const loadingObj=ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    config.loadingObj = loadingObj
    return config
})
// 响应拦截-对返回值做统一处理
Service.interceptors.response.use(response=>{
    const loadingObj = response.config.loadingObj
    if (loadingObj) {
        loadingObj.close()
    }
    const data = response.data
    if (data.status !== 0) {
        ElMessage.error(data.message || "服务器错误")
        return data
    }
    return data
},error=>{
    const loadingObj = error.config.loadingObj
    if (loadingObj) {
        loadingObj.close()
    }
    ElMessage({
        message:"服务器错误",
        type:"error",
        duration:2000
    })
})

// post请求
export const post=config=>{
    return Service({
        ...config,
        method: "post",
        data:config.data
    })
}
// get请求
export const get=config=>{
    return Service({
        ...config,
        method: "get",
        params:config.data
    })
}