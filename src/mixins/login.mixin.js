export default {
  methods: {
    // 登录存储信息
    setLoginCookie(res) {
      let arr = ['token', 'uid', 'uname', 'typeUser']
      arr.forEach(key => {
        this.$cookie.set(key, res[key], {
          path: '/',
          expires: 90
        })
      })
    }
  }
}
