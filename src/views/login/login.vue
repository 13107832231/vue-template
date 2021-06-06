<template>
  <div class="login-page">
    <div class="login-containter">
      <div class="illustration">
        <img src="@/assets/illustration.png" />
      </div>
      <div class="login-form">
        <div class="login-logo">{{ $configs.title }}</div>
        <el-form size="large">
          <el-form-item>
            <el-input
              prefix-icon="el-icon-mobile-phone"
              v-model="username"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              prefix-icon="el-icon-lock"
              show-password
              v-model="password"
              placeholder="密码"
              @keyup.enter.native="userLogin"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="$router.push('/register')"
              >注册账号</el-button
            >｜
            <el-button type="text" @click="$router.push('/password')">
              忘记密码</el-button
            >
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="userLogin"
          class="login-btn"
          size="large"
        >
          登录
        </el-button>
        <div class="tip">
          <el-checkbox label=""></el-checkbox>
          我已阅读并同意长期护理机构版<a>《隐私政策》</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { encryption } from '../../utils/utils'
  export default {
    data() {
      return {
        // username: 'zf',
        // password: '123456'
        username: 'zf',
        password: '123456'
      }
    },
    created() {
      if (this.$store.state.login.token) {
        this.$store.dispatch('logout')
      }
    },
    methods: {
      /**
       * 账号密码登录
       */
      userLogin() {
        if (!this.username)
          return this.$message({
            message: '请输入账号',
            type: 'warning'
          })
        if (!this.password)
          return this.$message({
            message: '请输入密码',
            type: 'warning'
          })
        const user = encryption({
          data: {
            password: this.password
          },
          key: 'keyukeyukeyukeyu',
          param: ['password']
        })

        const params = {
          username: this.username,
          password: user.password,
          grant_type: 'password', //登录类型
          tenant: '1',
          from: 'YXBwbG9naW4='
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        this.$api
          .loginByCount(params)
          .then((data) => {
            loading.close()
            if (data.code !== 0)
              return this.$message({
                message: data.msg,
                type: 'error'
              })
            this.$store.commit('setUser', data.data.user_info)
            this.$store.commit('setToken', data.data.access_token)
            this.$store.commit('setRefreshToken', data.data.refresh_token)
            const url = this.$route.query.redirect
            if (url) {
              this.$router.replace(url)
            } else {
              this.$router.replace('/home')
            }
          })
          .catch((err) => {
            loading.close()
          })
      }
    }
  }
</script>
<style lang="less" scoped>
  .login-page {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('~@/assets/login_bg.jpg');
    .login-containter {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 200px 0px;
      .illustration {
        margin-right: 100px;
      }
    }
    .login-form {
      width: 450px;
      margin-bottom: 24px;
      padding: 60px 48px;
      background-color: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 12px #ebedf0;
      .login-logo {
        color: #37c9bc;
        font-size: 30px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 48px;
      }
    }
    .login-btn {
      width: 100%;
      background-color: #31c3b6;
      border: 0;
      color: #31c3b6;
      color: white;
      height: 42px;
      border-radius: 5px;
    }
  }
  .tip {
    font-size: 13px;
    margin-top: 12px;
  }
</style>
