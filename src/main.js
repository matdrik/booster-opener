import Vue from 'vue'
import App from './App.vue'
import store from '../src/vuex/store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
