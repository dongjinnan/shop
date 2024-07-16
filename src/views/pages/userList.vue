<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
         <div class="page_content">
            <div class="flex">
                <div class="input_box">
                    <el-input
                        v-model="keyword"
                        placeholder="搜索关键字" 
                        class="input-with-select"
                        >
                        <template #append>
                            <el-button @click="searchList"><el-icon><Search/></el-icon></el-button>
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="addUser">新建用户</el-button>
            </div>
         </div>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue';
import {userListApi} from "@/util/request"
export default {
    name: "users",
    setup() {
        const data = reactive({
            keyword: "",
            searchParams: {
                query: "",
                pagesize: 5,
                pagenum: 1
            }
        })
        const searchList = () => {
            // userListApi(data.searchParams).then(res=>{
            //     if(res.data) {
            //         console.log("用户数据", res)
            //     }
            // })
        }
        const addUser = () => {

        }
        searchList()
        return {
            ...toRefs(data),
            searchList,
            addUser
        }
    }
}
</script>
<style scoped>
    .input_box {
        width: 200px;
        margin-right: 15px;
    }
</style>