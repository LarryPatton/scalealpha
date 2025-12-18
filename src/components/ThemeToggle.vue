<template>
  <button
    @click="toggleTheme"
    class="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group"
    :style="{ 
      backgroundColor: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.strong 
    }"
    :class="[
      'border hover:scale-105',
      isDark ? 'hover:border-amber-500/50' : 'hover:border-cyan-500/50'
    ]"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- 太阳图标 (浅色模式显示) -->
    <svg
      v-if="!isDark"
      class="w-5 h-5 text-amber-500 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="5" stroke-width="2" />
      <path stroke-linecap="round" stroke-width="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
    
    <!-- 月亮图标 (深色模式显示) -->
    <svg
      v-else
      class="w-5 h-5 text-cyan-400 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
    
    <!-- 悬停光晕效果 -->
    <div 
      class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :class="isDark ? 'bg-cyan-500/5' : 'bg-amber-500/10'"
    ></div>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { tokens, isDark, toggleTheme } = useTheme()
</script>
