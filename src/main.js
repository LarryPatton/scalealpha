import { createApp } from 'vue'
import './style.css'
import './design/theme.css'  // 主题系统样式
import App from './App.vue'
import router from './router'

// 初始化主题（在 app 挂载前）
import { useTheme } from './composables/useTheme'
const { initTheme } = useTheme()
initTheme()

createApp(App).use(router).mount('#app')