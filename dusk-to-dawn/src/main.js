import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import store from './store/index';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

Vue.config.productionTip = false

axios.get('./config.json').then(response => {

  // commit config to the store
  store.commit('setConfig', response.data);

  new Vue({
    render: h => h(App),

    // register vuex store
    store,

  }).$mount('#app')
})
