<template>
  <h1>hello world!</h1>
</template>

<script>
import {reactive} from "vue"
 export default{
  name: "home",
  setup() {
    // beforeCreate和created 两个生命周期
    const data = reactive({
      name: "小红",
      age: 20
    })
  }
 }
</script>
