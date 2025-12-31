<template>
  <button
    @click="toggleTheme"
    class="flex items-center justify-center transition-colors px-1"
    :style="{ color: tokens.colors.text.secondary }"
    :class="isDark ? 'hover:text-white' : 'hover:text-gray-900'"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <!-- 太阳图标 (浅色模式显示) -->
    <svg
      v-if="!isDark"
      class="w-4 h-4"
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
      class="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { tokens, isDark, toggleTheme } = useTheme()
</script>