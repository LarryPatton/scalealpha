<template>
  <nav class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-50">
    <div class="w-full px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 cursor-pointer">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ScaleAlpha.ai
          </span>
        </router-link>

        <!-- Menu Items - Full Width -->
        <div class="flex-1 flex items-center justify-center gap-8 mx-8 overflow-x-auto no-scrollbar">
          <router-link 
            to="/info" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            Info 信息中心
          </router-link>
          <router-link 
            to="/trading" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            交易分析
          </router-link>
          <router-link 
            to="/plan" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            计划制定
          </router-link>
          <router-link 
            to="/alerts" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            盯盘提醒
          </router-link>
          <router-link 
            to="/portfolio" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            投资组合
          </router-link>
          <router-link 
            to="/event" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            事件分析
          </router-link>
          <router-link 
            to="/history" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            历史模式
          </router-link>
          <router-link 
            to="/backtest" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            实盘测试
          </router-link>
          <router-link 
            to="/blog" 
            active-class="text-blue-400 font-semibold"
            class="text-sm transition whitespace-nowrap text-gray-300 hover:text-white"
          >
            官方博客
          </router-link>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4">
          <!-- User Avatar -->
          <div class="relative group">
            <button class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition border border-yellow-300">
              U
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#404040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
              <div class="px-4 py-2 border-b border-[#404040] text-sm text-gray-400">
                <p class="font-semibold">{{ userEmail }}</p>
              </div>
              <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">账户设置</router-link>
              <router-link to="/portfolio" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">我的投资组合</router-link>
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

const handleLogout = () => {
  emit('logout')
}
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>