<template>
  <button
    @click="handleClick"
    class="flex items-center justify-center transition-colors px-1"
    :style="{ color: tokens.colors.text.secondary }"
    :class="isDark ? 'hover:text-white' : 'hover:text-gray-900'"
    :title="isZhCN ? 'Switch to English' : '切换到中文'"
  >
    <!-- 简约语言图标 -->
    <span class="text-sm font-medium">{{ isZhCN ? '中' : 'EN' }}</span>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import { useLanguage } from '../composables/useLanguage'

const { tokens, isDark } = useTheme()
const { isZhCN, toggleLanguage } = useLanguage()

function handleClick() {
  toggleLanguage()
}
</script>