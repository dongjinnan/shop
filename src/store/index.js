import { createStore } from 'vuex'
import number from "./state/num.state.js"
import uInfo from "./state/userInfo.state.js"
export default createStore({
  
  // 数据比较多，分模块
  modules: {
    number, // 相当于number:number，es6简写
    uInfo
  }
})
