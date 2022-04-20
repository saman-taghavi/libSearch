import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "@mdi/font/css/materialdesignicons.css";
import Ripple from "vuetify/lib/directives/ripple";
Vue.use(Vuetify, {
  directives: {
    Ripple,
  },
});

export default new Vuetify({rtl:true});
