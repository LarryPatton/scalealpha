import { ref, computed, watch, readonly } from 'vue'
import { darkTheme, lightTheme, themes } from '../design/themes'

/**
 * 主题管理 Composable
 * 提供主题切换功能，支持持久化存储
 */

// 全局主题状态（单例模式）
const currentThemeName = ref('dark')
const isInitialized = ref(false)

// 计算属性：当前主题对象
const currentTheme = computed(() => {
  return themes[currentThemeName.value] || darkTheme
})

// 计算属性：当前 tokens（包含 colors, shadows 等）
const tokens = computed(() => {
  const theme = currentTheme.value
  return {
    colors: theme.colors,
    shadows: theme.shadows,
    // 保留其他通用 tokens（不随主题变化）
    typography: {
      fontFamily: {
        sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
      },
      fontSize: {
        display: ['20px', { lineHeight: '28px', fontWeight: '700' }],
        title: ['16px', { lineHeight: '24px', fontWeight: '700' }],
        body: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
        micro: ['10px', { lineHeight: '14px', fontWeight: '700' }],
      },
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
    },
    borderRadius: {
      sharp: '2px',
      rounded: '8px',
      full: '9999px',
    },
  }
})

// 计算属性：是否为深色模式
const isDark = computed(() => currentThemeName.value === 'dark')

// 计算属性：是否为浅色模式
const isLight = computed(() => currentThemeName.value === 'light')

// 计算属性：直接获取 colors（简化写法）
const colors = computed(() => currentTheme.value.colors)

/**
 * 初始化主题（从 localStorage 读取）
 */
function initTheme() {
  if (isInitialized.value) return
  
  try {
    const saved = localStorage.getItem('scalealpha-theme')
    if (saved && themes[saved]) {
      currentThemeName.value = saved
    } else {
      // 可选：检测系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      currentThemeName.value = prefersDark ? 'dark' : 'dark' // 默认使用深色
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage:', e)
  }
  
  isInitialized.value = true
  applyThemeToDocument()
}

/**
 * 切换主题
 */
function toggleTheme() {
  currentThemeName.value = currentThemeName.value === 'dark' ? 'light' : 'dark'
}

/**
 * 设置指定主题
 */
function setTheme(themeName) {
  if (themes[themeName]) {
    currentThemeName.value = themeName
  } else {
    console.warn(`Theme "${themeName}" not found`)
  }
}

/**
 * 将主题应用到 document（用于 CSS 变量和类名）
 */
function applyThemeToDocument() {
  const theme = currentTheme.value
  const root = document.documentElement
  
  // 设置 data-theme 属性（用于 CSS 选择器）
  root.setAttribute('data-theme', theme.name)
  
  // 设置 CSS 变量
  root.style.setProperty('--color-bg-base', theme.colors.background.base)
  root.style.setProperty('--color-bg-surface', theme.colors.background.surface)
  root.style.setProperty('--color-bg-elevated', theme.colors.background.elevated)
  root.style.setProperty('--color-bg-overlay', theme.colors.background.overlay)
  
  root.style.setProperty('--color-border-subtle', theme.colors.border.subtle)
  root.style.setProperty('--color-border-default', theme.colors.border.default)
  root.style.setProperty('--color-border-strong', theme.colors.border.strong)
  root.style.setProperty('--color-border-hover', theme.colors.border.hover)
  
  root.style.setProperty('--color-text-primary', theme.colors.text.primary)
  root.style.setProperty('--color-text-secondary', theme.colors.text.secondary)
  root.style.setProperty('--color-text-tertiary', theme.colors.text.tertiary)
  root.style.setProperty('--color-text-muted', theme.colors.text.muted)
  root.style.setProperty('--color-text-disabled', theme.colors.text.disabled)
  
  root.style.setProperty('--color-accent-primary', theme.colors.accent.primary)
  root.style.setProperty('--color-accent-secondary', theme.colors.accent.primaryDark)
}

// 监听主题变化，自动保存和应用
watch(currentThemeName, (newTheme) => {
  try {
    localStorage.setItem('scalealpha-theme', newTheme)
  } catch (e) {
    console.warn('Failed to save theme to localStorage:', e)
  }
  applyThemeToDocument()
})

/**
 * useTheme Composable
 */
export function useTheme() {
  // 确保初始化
  if (!isInitialized.value && typeof window !== 'undefined') {
    initTheme()
  }
  
  return {
    // 状态
    themeName: readonly(currentThemeName),
    theme: currentTheme,
    tokens,
    colors,  // 简化写法：直接获取 colors
    isDark,
    isLight,
    
    // 方法
    toggleTheme,
    setTheme,
    initTheme,
  }
}

export default useTheme
