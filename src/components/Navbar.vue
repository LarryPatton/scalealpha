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
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="(e) => handleNavClick(e, item)"
            active-class="text-blue-400 font-semibold"
            :class="[
              'text-sm transition whitespace-nowrap relative group',
              isLocked(item) 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'text-gray-300 hover:text-white'
            ]"
          >
            <span class="flex items-center gap-2">
              {{ item.name }}
              <!-- 锁定图标 -->
              <svg 
                v-if="isLocked(item)"
                class="w-3.5 h-3.5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            
            <!-- 悬停提示 -->
            <div 
              v-if="isLocked(item)"
              class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-xs text-gray-300 whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-xl"
            >
              <div class="relative">
                {{ getLockTooltip(item) }}
                <!-- 小箭头 -->
                <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-[#404040]"></div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4">
          <!-- User Avatar -->
          <div class="relative">
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
              <button @click="handleResetProgress" class="w-full text-left px-4 py-2 text-sm text-orange-400 hover:text-orange-300 hover:bg-[#3a3a3a]">
                查看进度
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'

const router = useRouter()
const route = useRoute()
const userEmail = ref('')
const emit = defineEmits(['logout'])

// 导入状态管理
const { isUserInfoCompleted, resetUserProfile } = useUserProfile()
const { hasSavedReports, clearSavedReports } = useSavedReports()

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

onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    userEmail.value = savedEmail
  }
  
  // 添加全局点击监听
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  // 移除全局点击监听
  document.removeEventListener('click', handleClickOutside)
})

const handleLogout = () => {
  closeAccountMenu()
  emit('logout')
}

// 定义导航项配置
const navItems = [
  {
    name: 'Info 信息中心',
    path: '/info',
    requiresUserInfo: false
  },
  {
    name: '交易分析',
    path: '/trading',
    requiresUserInfo: true
  },
  {
    name: '计划制定',
    path: '/planning',
    requiresUserInfo: true,
    requiresSavedReports: true
  },
  {
    name: '盯盘提醒',
    path: '/alerts',
    requiresUserInfo: true
  },
  {
    name: '投资组合',
    path: '/portfolio',
    requiresUserInfo: true
  },
  {
    name: '事件分析',
    path: '/event',
    requiresUserInfo: true
  },
  {
    name: '历史模式',
    path: '/history',
    requiresUserInfo: true
  },
  {
    name: '实盘测试',
    path: '/backtest',
    requiresUserInfo: true
  },
  {
    name: '官方博客',
    path: '/blog',
    requiresUserInfo: false
  }
]

// 判断导航项是否被锁定
const isLocked = (item) => {
  if (item.requiresSavedReports && !hasSavedReports.value) {
    return true
  }
  if (item.requiresUserInfo && !isUserInfoCompleted.value) {
    return true
  }
  return false
}

// 获取锁定提示信息
const getLockTooltip = (item) => {
  if (item.requiresSavedReports && !hasSavedReports.value) {
    return '请先在"机会发现"中保存至少一份报告'
  }
  if (item.requiresUserInfo && !isUserInfoCompleted.value) {
    return '请先在"我的投资信息"中完成基本信息填写'
  }
  return ''
}

// 处理导航点击
const handleNavClick = (event, item) => {
  if (isLocked(item)) {
    event.preventDefault()
    
    // 重定向到对应的前置页面
    if (!isUserInfoCompleted.value) {
      router.push('/portfolio-input')
    } else if (item.requiresSavedReports && !hasSavedReports.value) {
      router.push('/opportunity')
    }
  }
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