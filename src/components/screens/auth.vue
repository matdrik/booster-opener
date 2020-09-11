<template>
  <div class="auth">
    <div class="auth_container">
      <img src="../../assets/images/icons/logo.svg" draggable="false">
      <div class="long_btns">
        <div
          class="long_btn"
          @click="isLogin = !isLogin"
          :class="{ long_btn_active: isLogin }"
        >Авторизация</div>
        <div
          class="long_btn"
          @click="isLogin = !isLogin"
          :class="{ long_btn_active: !isLogin }"
        >Регистрация</div>
      </div>
      <transition name="fade" mode="out-in">
        <login v-if="isLogin" />
        <register v-if="!isLogin" />
      </transition>
      <div @click="$store.commit('SET_CURRENT_SCREEN', 'home')">Войти как гость</div>
      <transition name="fade">
        <div class="err">{{error}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import login from '../auth/login'
import register from '../auth/register'
import { mapGetters, mapMutations } from "vuex"

export default {
  name: 'auth',
  components: {
    login,
    register
  },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    ...mapMutations([
      'SET_CURRENT_SCREEN'
    ])
  },
  computed: {
    ...mapGetters([
      'error'
    ])
  }
};
</script>

<style>
.err {
  color: #f75b5b;
  font-weight: 300;
}
.auth {
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
	background-size: cover;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
	background-position: center;
	background-repeat: no-repeat;
  background-image: url(../../assets/images/bg2.png);
}
.auth_container {
  display: flex;
  height: 100%;
  padding: 0 15px;
  background: #1f2023;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
input[type=text],
input[type=password] {
  width: 100%;
  border: none;
  padding: 8px;
  color: white;
  font-size: 18px;
  text-align: center;
  background: #141416;
  max-width: 300px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-family: roboto;
  border-bottom: 2px solid transparent;
}
input[type=text]:focus,
input[type=password]:focus {
  outline: none;
  border-bottom: 2px solid white;
}
.submit {
  border: none;
  font-size: 18px;
  padding: 5px 40px;
  background: white;
}
::placeholder {
  color: rgba(255, 255, 255, .5);
}
form {
  width: 100%;
  display: flex;
  margin: 40px 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
a {
  margin: 0 10px;
  color: rgb(255 174 174);
}
</style>