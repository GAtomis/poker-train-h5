import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import {setVant} from './utils/init-vant';
import '@/styles/reset.scss'; // 引入 reset 样式
// 2. 引入组件样式
import 'vant/lib/index.css';



const app = createApp(App);
app.use(setVant)
app.use(pinia);
app.use(router);

app.mount('#app');
