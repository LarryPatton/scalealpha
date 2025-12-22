
<template>
  <div 
    class="min-h-screen flex flex-col items-center justify-center"
    :class="themeClasses.pageBg"
  >
    <!-- Logo -->
    <div class="mb-6">
      <div 
        class="w-12 h-12 flex items-center justify-center rounded-sm"
        :class="themeClasses.logoBg"
      >
        <span class="text-2xl font-bold bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ⓐ
        </span>
      </div>
    </div>

    <!-- Brand Name -->
    <h1 
      class="text-xl font-bold mb-8 tracking-tight"
      :class="themeClasses.textPrimary"
    >
      ScaleAlpha.ai
    </h1>

    <!-- Loading Animation -->
    <div class="mb-6">
      <!-- Progress Bar -->
      <div 
        class="w-48 h-1 rounded-sm overflow-hidden"
        :class="themeClasses.progressBg"
      >
        <div 
          class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-sm loading-bar"
        ></div>
      </div>
    </div>

    <!-- Status Text -->
    <p 
      class="text-sm"
      :class="themeClasses.textMuted"
    >
      <span class="inline-flex items-center gap-1">
        {{ currentStatus }}
        <span class="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

// 主题样式类
const themeClasses = computed(() => {
  if (isDark.value) {
    return {
      pageBg: 'bg-[#050505]',
      textPrimary: 'text-white',
      textMuted: 'text-gray-500',
      logoBg: 'bg-[#0a0a0a] border border-[#222222]',
      progressBg: 'bg-[#1a1a1a]'
    }
  } else {
    return {
      pageBg: 'bg-slate-50',
      textPrimary: 'text-slate-800',
      textMuted: 'text-slate-400',
      logoBg: 'bg-white border border-slate-200 shadow-sm',
      progressBg: 'bg-slate-200'
    }
  }
})

// 状态文字轮换
const statusMessages = [
  '正在初始化',
  '正在连接服务器',
  '正在加载您的数据',
  '正在分析投资组合',
  '即将完成'
]

const currentStatusIndex = ref(0)
const currentStatus = computed(() => statusMessages[currentStatusIndex.value])

let statusInterval = null

onMounted(() => {
  // 每2秒切换一次状态文字
  statusInterval = setInterval(() => {
    currentStatusIndex.value = (currentStatusIndex.value + 1) % statusMessages.length
  }, 2000)
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
})
</script>

<style scoped>
/* 进度条动画 - 无限循环 */
.loading-bar {
  width: 30%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(400%);
  }
}

/* 加载点动画 */
.loading-dots span {
  animation: dot-blink 1.4s infinite;
  opacity: 0;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-blink {
  0%, 20% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60%, 100% {
    opacity: 0;
  }
}
</style>
