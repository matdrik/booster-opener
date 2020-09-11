<template>
  <div id="app" @contextmenu="handler($event)">
    <transition name="fade" mode="out-in">
      <home v-if="CURRENT_SCREEN === 'home'" />
      <profile v-if="CURRENT_SCREEN === 'profile'" />
      <auth v-if="CURRENT_SCREEN === 'auth'" />
    </transition>
    <boNotifs />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import home from './components/screens/home'
import auth from './components/screens/auth'
import profile from './components/screens/profile'
import boNotifs from './components/notifications/bo-notifs'

export default {
  name: 'App',
  components: {
    boNotifs,
    home,
    profile,
    auth
  },
  methods: {
    ...mapActions([
      'update',
      'getProfile'
    ]),
    handler: function(e) {
      e.preventDefault();
    }
  },
  computed: {
    ...mapGetters([
      'CURRENT_SCREEN'
    ])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

/* Анимации VUE */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

::-webkit-scrollbar {
  width: 5px;
} 
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(255,255,255,.2);
}

* {
	box-sizing: border-box;
}
.card_effect {
  top: 0;
  left: 0;
  width: 100%;
  opacity: .2;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
  position: absolute;
}
body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
  color: white;
	display: flex;
  overflow: hidden;
  user-select: none;
  align-items: center;
	flex-direction: column;
	justify-content: center;
  background-color: #1F2023;
	font-family: 'Roboto', sans-serif;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 15px;
  max-width: 1200px;  
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}
.header {
  width: 100%;
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
.money {
  display: flex;
  font-size: 24px;
  align-items: center;
  justify-content: center;
}
.icon {
  width: 30px;
  margin-left: 10px;
}
select {
  padding: 5px;
  border: none;
  color: white;  
  width: 100%;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
  max-width: 400px;
  border-radius: 5px;
  background: #141414;
  font-family: 'Roboto', sans-serif;
}
.line {
  width: 70%;
  opacity: .1;
  height: 3px;
  margin: 20px 0;
  background: #FFFFFF;
}
select:focus {
  outline: none;
}
span.price {
  display: flex;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
}
span.price img {
  width: 25px;
  margin-left: 10px;
}
.big_heading {
  font-size: 55px;
  font-weight: 300;
  text-align: center;
  text-transform: uppercase;
}
.long_btns {
  width: 100%;
  display: flex;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
}
.long_btn {
  width: 50%;
  color: white;
  transition: .3s;
  cursor: pointer;
  font-size: 24px;
  padding: 5px 10px;
  text-align: center;
  background: #141416;
}
.long_btn_active {
  width: 50%;
  color: black;
  background: white;
  text-align: center;
}
</style>