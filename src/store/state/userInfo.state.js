export default {
    state:{
        userInfo: (localStorage.getItem("loginData")&&JSON.parse(localStorage.getItem("loginData")))||{},
        token: ""

    },
    mutations:{
        setUserInfo(state,uInfo){
            state.userInfo=uInfo
        },
        setToken(state, token) {
            state.token=token
        }
    }
}