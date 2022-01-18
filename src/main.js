import Vue from 'vue';
import App from './App.vue';

import networkService from './helpers/networkService';

networkService.init();
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
