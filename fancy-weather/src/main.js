import '@/main.scss'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Notifications from 'vue-notification'
import i18n from './i18n'

Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
