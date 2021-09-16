import { createApp } from 'vue';
import App from './App.vue'
import './global.css'
let app = createApp(App)
console.log(app);
app.mount('#app')