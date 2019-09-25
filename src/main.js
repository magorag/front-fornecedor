import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router'
// import store from './store'


Vue.config.productionTip = false

var options = {
  persist: false
}

Vue.use(Vuelidate)
Vue.use(VueSession, options)

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
