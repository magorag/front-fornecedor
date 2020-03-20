import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueSession from 'vue-session'
import store from "./store";
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

var options = {
  persist: false
}

Vue.use(Vuelidate)
Vue.use(VueSession, options)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

