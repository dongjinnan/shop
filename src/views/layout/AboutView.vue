
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="dom">{{ msg }} --- {{ num }}</div>
    <button v-on:click="handleClick">click me</button>
    <hr>
    <input type="text" placeholder="请输入姓名" v-model="userName">
    <input type="text" placeholder="请输入手机号" v-model="userPhone" 
    @blur="handleBlur" 
    @focus="handleFocus"
    @input="handleInput"
    @change="handleChange">
    <textarea placeholder="请输入您的建议" cols="30" rows="10" v-model="userInput"></textarea>
    <p>{{ userName }} ---- {{ userInput }}</p>
    <button @click="submit">提交</button>
  </div>
</template>
<script>
import {reactive, toRefs, onBeforeMount, onMounted, onBeforeUpdate, onUpdated} from "vue"
export default {
  name: "about",
  setup() {
    const data = reactive({
      msg: "你好!",
      msg2: "hello world",
      num: 0,
      userName:"",
      userInput:"",
      userPhone:""
    })
    onBeforeMount(()=>{
      console.log("onBeforeMount",document.querySelector("#dom"))
    })
    onMounted(()=>{
      console.log("onMounted",document.querySelector("#dom"))
      setTimeout(()=>{
        data.msg="hello"
      },2000)
    })
    onBeforeUpdate(()=>{
      console.log("onBeforeUpdate")
    })
    onUpdated(()=>{
      console.log("onUpdated")
    })

    const handleClick=()=>{
      alert("你好")
    }

    const submit=()=>{
      alert('${data.userName}的建议是${data.userInput}')
    }

    const handleFocus=()=>{
      console.log("获取焦点了")
    }

    const handleBlur=()=>{
      console.log("失去焦点了")
      if(!data.userPhone){
        alert("手机号必填")
      }
    }

    const handleInput=()=>{
      if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(data.userPhone)) {
        console.log("不符合手机号")
      } else {
        console.log("符合手机号")
      }
    }

    const handleChange=()=>{
      
    }

    return{
      ...toRefs(data),
      handleClick,
      submit,
      handleFocus,
      handleBlur,
      handleInput,
      handleChange
    }
  }
}
</script>
