<template>
  <button
    @click="handleClick"
    class="relative h-10 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 group"
    :style="{ 
      backgroundColor: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.strong 
    }"
    :class="[
      'border hover:scale-105 hover:border-cyan-500/50'
    ]"
    :title="isZhCN ? 'Switch to English' : '切换到中文'"
  >
    <!-- 语言图标 -->
    <svg
      class="w-4 h-4 text-cyan-400 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
    
    <!-- 当前语言显示 -->
    <span 
      class="text-xs font-bold tracking-wide transition-colors duration-300"
      :style="{ color: tokens.colors.text.primary }"
    >
      {{ localeShort }}
    </span>
    
    <!-- 悬停光晕效果 -->
    <div 
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/5"
    ></div>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

const { tokens } = useTheme()
const { isZhCN, localeShort, toggleLanguage } = useLanguage()

// 调试：包装 toggleLanguage
function handleClick() {
  console.log('[LanguageToggle] button clicked!')
  console.log('[LanguageToggle] isZhCN:', isZhCN.value)
  console.log('[LanguageToggle] localeShort:', localeShort.value)
  toggleLanguage()
  console.log('[LanguageToggle] after toggle, isZhCN:', isZhCN.value)
  console.log('[LanguageToggle] after toggle, localeShort:', localeShort.value)
}
</script>
