import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import enUS from './en-US.json'

const messages = {
  'zh-CN': zhCN,
  'en-US': enUS
}

// 从 localStorage 读取用户语言偏好，默认中文
const getDefaultLocale = () => {
  const saved = localStorage.getItem('scaleAlpha_language')
  if (saved && ['zh-CN', 'en-US'].includes(saved)) {
    return saved
  }
  return 'zh-CN'
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getDefaultLocale(),
  fallbackLocale: 'zh-CN',
  messages
})

export default i18n