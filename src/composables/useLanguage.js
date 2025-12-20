import { computed, watch } from 'vue'
import i18n from '../locales'

/**
 * 语言管理 Composable
 * 提供语言切换功能，支持持久化存储
 */

// 支持的语言列表
const SUPPORTED_LOCALES = ['zh-CN', 'en-US']
const STORAGE_KEY = 'scaleAlpha_language'
const DEFAULT_LOCALE = 'zh-CN'

/**
 * useLanguage Composable
 */
export function useLanguage() {
  // 直接使用 i18n.global.locale (这是一个 ref)
  const locale = i18n.global.locale

  // 计算属性：是否为中文
  const isZhCN = computed(() => locale.value === 'zh-CN')

  // 计算属性：是否为英文
  const isEnUS = computed(() => locale.value === 'en-US')

  // 计算属性：当前语言显示名称
  const localeName = computed(() => {
    return locale.value === 'zh-CN' ? '中文' : 'English'
  })

  // 计算属性：当前语言简短名称（用于按钮显示）
  const localeShort = computed(() => {
    return locale.value === 'zh-CN' ? '中' : 'EN'
  })

  /**
   * 初始化语言（从 localStorage 读取）
   */
  function initLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && SUPPORTED_LOCALES.includes(saved)) {
        locale.value = saved
      } else {
        // 可选：检测浏览器语言
        const browserLang = navigator.language
        if (browserLang.startsWith('zh')) {
          locale.value = 'zh-CN'
        } else if (browserLang.startsWith('en')) {
          locale.value = 'en-US'
        } else {
          locale.value = DEFAULT_LOCALE
        }
      }
    } catch (e) {
      console.warn('Failed to read language from localStorage:', e)
      locale.value = DEFAULT_LOCALE
    }
  }

  /**
   * 切换语言（中英文之间切换）
   */
  function toggleLanguage() {
    console.log('[useLanguage] toggleLanguage called')
    console.log('[useLanguage] current locale:', locale.value)
    const newLocale = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
    console.log('[useLanguage] switching to:', newLocale)
    locale.value = newLocale
    console.log('[useLanguage] after switch, locale.value:', locale.value)
    // 保存到 localStorage
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch (e) {
      console.warn('Failed to save language to localStorage:', e)
    }
    // 更新 HTML lang 属性
    document.documentElement.setAttribute('lang', newLocale)
  }

  /**
   * 设置指定语言
   */
  function setLanguage(newLocale) {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      locale.value = newLocale
      // 保存到 localStorage
      try {
        localStorage.setItem(STORAGE_KEY, newLocale)
      } catch (e) {
        console.warn('Failed to save language to localStorage:', e)
      }
      // 更新 HTML lang 属性
      document.documentElement.setAttribute('lang', newLocale)
    } else {
      console.warn(`Language "${newLocale}" not supported`)
    }
  }

  return {
    // 状态
    locale: computed(() => locale.value),
    localeName,
    localeShort,
    isZhCN,
    isEnUS,
    supportedLocales: SUPPORTED_LOCALES,
    
    // 方法
    toggleLanguage,
    setLanguage,
    initLanguage,
  }
}

export default useLanguage