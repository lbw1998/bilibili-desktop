// main.ts
import { createApp } from "vue";
import router from "./router/";
import "./styles/element/index.scss";
import ElementPlus from "element-plus";
import svgIcon from '@/components/SvgIcon.vue'
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.component('svg-icon', svgIcon);
app.mount("#app");
