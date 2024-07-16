import {post,get} from "./service"

export const loginApi=data=>{
    return post({
        url:"/login",
        data
    })
}

// 获取用户列表
export const userListApi=data=>{
    return get({
        url:"/users",
        data
    })
}