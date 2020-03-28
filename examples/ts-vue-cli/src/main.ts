import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render: h => h(App),
}).$mount('#app');
