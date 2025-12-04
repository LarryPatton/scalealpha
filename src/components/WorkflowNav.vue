<template>
  <nav class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-50">
    <div class="w-full px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ScaleAlpha.ai
          </span>
        </router-link>

        <!-- Tab Navigation (Only shown when logged in) -->
        <div v-if="isLoggedIn" class="flex-1 flex items-center justify-center mx-8">
          <div class="flex items-center gap-16 transform -translate-x-16">
            <button
              v-for="step in steps" 
              :key="step.id"
              @click="handleStepClick(step)"
              :class="[
                'px-6 py-2 rounded-lg text-base font-medium transition-all duration-200',
                getTabClasses(step.status)
              ]"
            >
              {{ step.label }}
            </button>
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <!-- Pricing Link (Always visible) -->
          <router-link 
            to="/pricing" 
            class="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Pricing
          </router-link>

          <!-- Logged Out: Login/Register Button -->
          <router-link 
            v-if="!isLoggedIn" 
            to="/login" 
            class="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#404040] rounded-lg text-sm font-medium transition"
          >
            登录 / 注册
          </router-link>

          <!-- Logged In: User Avatar -->
          <div v-else class="relative">
            <button 
              @click="toggleAccountMenu"
              class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition border border-yellow-300"
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
              <button @click="handleResetProgress" class="w-full text-left px-4 py-2 text-sm text-orange-400 hover:text-orange-300 hover:bg-[#3a3a3a]">
                重置进度
              </button>
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
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkflowProgress } from '../composables/useWorkflowProgress'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'

const emit = defineEmits(['logout'])
const route = useRoute()
const router = useRouter()

const userEmail = ref('')
const isLoggedIn = ref(false)

// 账户菜单状态
const showAccountMenu = ref(false)

// 导入状态管理
const { resetUserProfile } = useUserProfile()
const { clearSavedReports } = useSavedReports()

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

// 检查登录状态
const checkLoginStatus = () => {
  const loginStatus = localStorage.getItem('isLoggedIn')
  isLoggedIn.value = loginStatus === 'true'
}

// 使用工作流进度管理
const { 
  stepsWithStatus: steps, 
  navigateToStep, 
  loadProgress,
  markCurrentPageVisited,
  resetProgress
} = useWorkflowProgress()

// 初始化
onMounted(() => {
  // 检查登录状态
  checkLoginStatus()
  
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    userEmail.value = savedEmail
  }
  
  // 加载工作流进度
  loadProgress()
  
  // 标记当前页面为已访问
  markCurrentPageVisited()
  
  // 添加全局点击监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 移除全局点击监听
  document.removeEventListener('click', handleClickOutside)
})

// 监听路由变化，自动标记页面为已访问
watch(() => route.path, () => {
  markCurrentPageVisited()
})

// 处理步骤点击（移除锁定检查）
const handleStepClick = (step) => {
  navigateToStep(step.id)
}

// 获取 Tab 标签的样式类（简约扁平风格）
const getTabClasses = (status) => {
  if (status === 'current') {
    return 'bg-blue-600 text-white cursor-pointer'
  }
  return 'bg-transparent text-gray-300 hover:bg-[#3a3a3a] hover:text-white cursor-pointer'
}

// 重置进度
const handleResetProgress = () => {
  if (confirm('确定要重置所有进度吗？这将清除所有学习进度、自选组和设置数据，且无法恢复。')) {
    // 清除localStorage中的所有数据
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
      'portfolio_info_submitted',  // PortfolioInput 提交状态
      'portfolio_input_data',       // PortfolioInput 数据
      'portfolio_last_saved'        // PortfolioInput 草稿保存时间
    ]
    
    // 先清除所有 localStorage
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    // 确保 localStorage 同步完成后再更新状态
    setTimeout(() => {
      // 重置状态管理
      resetUserProfile()
      clearSavedReports()
      resetProgress()
      
      // 关闭菜单
      closeAccountMenu()
      
      // 重定向到首页或Info页面
      router.push('/info')
      
      // 显示成功提示
      alert('进度已重置！请重新开始。')
      
      // 延迟刷新，确保状态已完全更新
      setTimeout(() => {
        window.location.reload()
      }, 100)
    }, 50)
  }
}

// 登出
const handleLogout = () => {
  closeAccountMenu()
  emit('logout')
}
</script>
