import { createApp } from 'vue'
import './style.css'
import './design/theme.css'  // 主题系统样式
import App from './App.vue'
import router from './router'
import i18n from './locales'  // 国际化配置

// 初始化主题（在 app 挂载前）
import { useTheme } from './composables/useTheme'
const { initTheme } = useTheme()
initTheme()

createApp(App).use(router).use(i18n).mount('#app')