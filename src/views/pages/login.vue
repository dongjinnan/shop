<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form label-width="100px" ref="formRef" :model="loginData" class="demo-dynamic">
                <el-form-item 
                    prop="username"
                    label="用户名"
                    :rules="[{
                        required: true,
                        message: '此项为必填项',
                        trigger: 'blur'
                    }]">
                    <el-input v-model="loginData.username"/>
                </el-form-item>
                <el-form-item 
                    prop="password"
                    label="密码"
                    :rules="[{
                        required: true,
                        message: '此项为必填项',
                        trigger: 'blur'
                    }]">
                    <el-input type="password" v-model="loginData.password"/>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
            <p>{{ num }}</p>
        </div>
    </div>
</template>
<script>
import {reactive, toRefs} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import {loginApi} from "@/util/request"
import axios from 'axios';
import qs from 'qs';
export default {
    name: "login",
    setup(){
        const store= useStore()
        const router = useRouter()
        const count = store.state.count
        const data = reactive({
            loginData: {
                username: "",
                password: ""
            },
            num: count
        })

        const handleLogin = () => {
            // console.log("修改前getters", store.getters["number/countStatus"])
            // //store.commit('number/setCount', 100)
            // store.dispatch('number/setCountPromise',-100).then(res=>{
            //     alert("修改成功")
            // }).catch(err=>{
            //     alert(err)
            // })
            // console.log(store.state.number.count)
            // console.log("修改后getters",store.getters["number/countStatus"])
            loginApi(data.loginData).then(res=>{
                if (res.status === 0) {
                    store.commit('setUserInfo',data.loginData)
                    store.commit('setToken', res.token)
                    localStorage.setItem("loginData",JSON.stringify(data.loginData))
                    router.push({
                        path:"/index"
                    })
                }
            })
        }

        return {
            ...toRefs(data),
            handleLogin

        }
    }
}
</script>
<style scoped>
    .login_wrap {
        width: 100%;
        height: 100vh;
        background: rgb(54, 79, 126);
        position: relative;
    }
    .form_wrap{
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%,50%);
        background: #fff;
        padding: 30px 50px;
        border-radius: 5px;
    }
    .login_btn{
        display: block;
        margin:10px auto;
    }
</style>