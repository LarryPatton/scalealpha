<template>
  <nav class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-50">
    <div class="w-full px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer" @click="navigateTo('home')">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ScaleAlpha.ai
          </span>
        </div>

        <!-- Menu Items - Full Width -->
        <div class="flex-1 flex items-center justify-center gap-10 mx-12">
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('opportunities')">机会发现</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('trading')">交易分析</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('plan')">计划制定</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('pingping')">盯盘提醒</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('portfolio')">投资组合</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('event')">事件分析</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('history')">历史模式</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('backtest')">实盘测试</a>
          <a href="#" class="text-sm text-gray-300 hover:text-white transition whitespace-nowrap" @click.prevent="navigateTo('blog')">官方博客</a>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4">
          <!-- Help Icon -->
          <button class="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center hover:bg-[#505050] transition" title="帮助">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <!-- Download/Export Icon -->
          <button class="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center hover:bg-[#505050] transition" title="导出">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          <!-- Screenshot Icon -->
          <button class="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center hover:bg-[#505050] transition" title="截图">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          <!-- Dark/Light Mode Toggle -->
          <button class="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center hover:bg-[#505050] transition relative overflow-hidden" title="主题切换">
            <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 015.646 5.646 9.003 9.003 0 0015.354 15.354z" />
            </svg>
            <div class="absolute w-4 h-4 bg-white rounded-full right-1 top-1/2 transform -translate-y-1/2"></div>
          </button>

          <!-- Feedback Button -->
          <button class="px-4 py-2 border border-[#404040] text-sm text-gray-300 hover:text-white hover:border-blue-400 rounded-lg transition">
            反馈
          </button>

          <!-- User Avatar -->
          <div class="relative group">
            <button class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition border border-yellow-300">
              U
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#404040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
              <div class="px-4 py-2 border-b border-[#404040] text-sm text-gray-400">
                <p class="font-semibold">{{ userEmail }}</p>
              </div>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">账户设置</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">我的投资组合</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">帮助</a>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#3a3a3a] border-t border-[#404040] rounded-b-lg">
                登出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userEmail = ref('')

const emit = defineEmits(['logout'])

onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    userEmail.value = savedEmail
  }
})

const navigateTo = (page) => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }))
}

const handleLogout = () => {
  emit('logout')
}
</script>
