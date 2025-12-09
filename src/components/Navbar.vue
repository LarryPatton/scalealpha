<template>
  <nav class="bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#333] sticky top-0 z-50">
    <div class="w-full px-4 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left: Logo & Links -->
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2 cursor-pointer">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span class="text-white font-bold">Ⓐ</span>
            </div>
          </router-link>
          
          <!-- Links (Only if logged in) -->
          <div v-if="userEmail" class="hidden md:flex items-center gap-6">
            <router-link to="/infoB" active-class="text-white font-bold border-b-2 border-blue-500 pb-0.5" class="text-gray-400 hover:text-white font-medium transition-colors">Info</router-link>
            <router-link to="/opportunity" active-class="text-white font-bold border-b-2 border-blue-500 pb-0.5" class="text-gray-400 hover:text-white font-medium transition-colors">机会发现</router-link>
          </div>
        </div>

        <!-- Center: Search Bar (Only if logged in) -->
        <div v-if="userEmail" class="flex-1 max-w-2xl mx-4 lg:mx-12 hidden md:block">
          <div class="relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              class="block w-full pl-10 pr-3 py-2 border border-[#333] rounded-full leading-5 bg-[#0f0f0f] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#1a1a1a] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-300" 
              placeholder="搜索股票 / 策略 / 主题..." 
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span class="text-gray-600 text-xs border border-gray-700 rounded px-1.5 py-0.5">Ctrl K</span>
            </div>
          </div>
        </div>
        <!-- Spacer if not logged in to keep right alignment -->
        <div v-else class="flex-1"></div>

        <!-- Right: User Profile or Login/Register -->
        <div class="flex items-center gap-4">
          <!-- Price Button (Always Visible) -->
          <router-link to="/pricing" class="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
            Price
          </router-link>

          <!-- User Avatar & Menu (If Logged In) -->
          <div v-if="userEmail" class="relative">
            <button 
              @click="toggleAccountMenu"
              class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm border border-[#444] cursor-pointer hover:border-white transition-colors"
            >
              U
            </button>
            <div 
              v-if="showAccountMenu"
              class="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#404040] z-50"
            >
              <div class="px-4 py-2 border-b border-[#404040] text-sm text-gray-400">
                <p class="font-semibold">{{ userEmail }}</p>
              </div>
              <button @click="handleMyInfo" class="w-full text-left px-4 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-[#3a3a3a]">
                我的信息
              </button>
              <button @click="handleMyWatchlist" class="w-full text-left px-4 py-2 text-sm text-green-400 hover:text-green-300 hover:bg-[#3a3a3a]">
                我的关注
              </button>
              <button @click="handleResetProgress" class="w-full text-left px-4 py-2 text-sm text-orange-400 hover:text-orange-300 hover:bg-[#3a3a3a]">
                查看进度
              </button>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#3a3a3a] border-t border-[#404040] rounded-b-lg">
                登出
              </button>
            </div>
          </div>

          <!-- Login/Register Button (If Not Logged In) -->
          <div v-else>
            <router-link to="/login" class="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20">
              登录 / 注册
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'

const router = useRouter()
const userEmail = ref('')
const emit = defineEmits(['logout'])

// 导入状态管理
const { resetUserProfile } = useUserProfile()
const { clearSavedReports } = useSavedReports()

// 账户菜单状态
const showAccountMenu = ref(false)

// 切换账户菜单
const toggleAccountMenu = () => {
  showAccountMenu.value = !showAccountMenu.value
}

// 关闭账户菜单
const closeAccountMenu = () => {
  showAccountMenu.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  const accountMenu = event.target.closest('.relative')
  if (!accountMenu && showAccountMenu.value) {
    closeAccountMenu()
  }
}

// 跳转到我的信息页面
const handleMyInfo = () => {
  closeAccountMenu()
  router.push('/portfolio-input')
}

// 跳转到我的关注页面
const handleMyWatchlist = () => {
  closeAccountMenu()
  router.push('/opportunities?tab=events')
}

// 重置进度
const handleResetProgress = () => {
  if (confirm('确定要重置所有进度吗？这将清除所有学习进度、自选组和设置数据，且无法恢复。')) {
    const keysToRemove = [
      'scaleAlpha_userProfile',
      'scaleAlpha_savedReports',
      'scaleAlpha_watchlists',
      'scaleAlpha_selectedGroup',
      'scaleAlpha_watchlists_version',
      'scaleAlpha_settings',
      'scaleAlpha_workflowProgress',
      'user_holdings',
      'riskAssessmentResult',
      'opportunity_report_categories',
      'userEmail',
      'portfolio_info_submitted',
      'portfolio_input_data',
      'portfolio_last_saved'
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    setTimeout(() => {
      resetUserProfile()
      clearSavedReports()
      closeAccountMenu()
      router.push('/info')
      alert('进度已重置！请重新开始。')
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }, 50)
  }
}

onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    userEmail.value = savedEmail
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const handleLogout = () => {
  closeAccountMenu()
  
  // Clear user data
  localStorage.removeItem('userEmail')
  userEmail.value = '' // Clear reactive state
  resetUserProfile()
  clearSavedReports()
  
  // Redirect to home
  router.push('/')
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