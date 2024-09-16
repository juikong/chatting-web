import { createApp } from "vue";
import "./css/style.css";
import router from "./router";
import App from "./App.vue";
import VueCookies from "vue-cookies";

const app = createApp(App);
app.use(VueCookies);
app.config.globalProperties.$cookies = VueCookies;
app.use(router);
app.mount("#app");
