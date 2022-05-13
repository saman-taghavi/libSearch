import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import instance from "./services/api";
import JsonExcel from "vue-json-excel";
 
Vue.component("downloadExcel", JsonExcel);
// Add it to Vue prototype (use any variable you like, preferrably prefixed with a $).
Vue.prototype.$http = instance;
new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
