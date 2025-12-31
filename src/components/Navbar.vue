<template>
  <nav class="backdrop-blur-md border-b sticky top-0 z-50" :style="{ backgroundColor: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.95)', borderColor: tokens.colors.border.default }">
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
            <router-link 
              to="/infoB" 
              class="text-sm font-medium transition-colors hover-underline-effect nav-link"
              :class="[
                isDark ? 'hover:text-white' : 'hover:text-slate-900',
                $route.path === '/infoB' ? 'nav-link-active' : ''
              ]"
              :style="{ color: $route.path === '/infoB' ? (isDark ? '#fff' : '#1e293b') : (isDark ? tokens.colors.text.tertiary : '#334155') }"
            >{{ $t('nav.info') }}</router-link>
            <router-link 
              to="/opportunityB" 
              class="text-sm font-medium transition-colors hover-underline-effect nav-link"
              :class="[
                isDark ? 'hover:text-white' : 'hover:text-slate-900',
                $route.path === '/opportunityB' ? 'nav-link-active' : ''
              ]"
              :style="{ color: $route.path === '/opportunityB' ? (isDark ? '#fff' : '#1e293b') : (isDark ? tokens.colors.text.tertiary : '#334155') }"
            >{{ $t('nav.opportunity') }}</router-link>
          </div>
        </div>

        <!-- Center: Search Bar (Only if logged in) -->
        <div v-if="userEmail" class="flex-1 mx-4 lg:mx-12 hidden md:block">
          <div 
            class="relative group search-container"
            :class="{ 'search-expanded': isSearchFocused }"
          >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <svg 
                class="h-5 w-5 transition-all duration-300" 
                :class="isSearchFocused ? 'text-blue-500 scale-110' : ''"
                :style="{ color: isSearchFocused ? '#3b82f6' : tokens.colors.text.muted }" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              v-model="searchQuery"
              type="text" 
              class="search-input block w-full pl-10 pr-16 py-2 border rounded-lg leading-5 focus:outline-none text-sm" 
              :class="[
                isSearchFocused ? 'search-input-focused' : 'search-input-idle',
                isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'
              ]"
              :style="{ 
                backgroundColor: isDark ? 'rgba(38, 38, 38, 0.8)' : 'rgba(248, 250, 252, 1)',
                borderColor: isSearchFocused 
                  ? (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)') 
                  : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
                color: tokens.colors.text.primary
              }"
              :placeholder="$t('search.placeholder')" 
              @focus="isSearchFocused = true"
              @blur="handleSearchBlur"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
              <!-- Clear button when has text -->
              <button 
                v-if="searchQuery && isSearchFocused"
                @click="clearSearch"
                class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <!-- Keyboard shortcut hint -->
              <span 
                class="text-xs border rounded px-1.5 py-0.5 transition-opacity duration-300"
                :class="isSearchFocused ? 'opacity-0' : 'opacity-100'"
                :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default }"
              >Ctrl K</span>
            </div>
          </div>
        </div>
        <!-- Spacer if not logged in to keep right alignment -->
        <div v-else class="flex-1"></div>

        <!-- Right: User Profile or Login/Register -->
        <div class="flex items-center h-9" :class="userEmail ? 'gap-4' : 'gap-5'">
          <!-- Language Toggle Button -->
          <div class="flex items-center h-full">
            <LanguageToggle />
          </div>
          
          <!-- Theme Toggle Button -->
          <div class="flex items-center h-full">
            <ThemeToggle />
          </div>
          
          <!-- Price Button (Always Visible) -->
          <router-link 
            to="/pricing" 
            class="text-sm font-medium transition-colors hidden sm:flex items-center hover-underline-effect nav-item-text" 
            :class="[
              isDark ? 'hover:text-white' : 'hover:text-gray-900',
              $route.path === '/pricing' ? 'nav-link-active' : ''
            ]"
            :style="{ color: $route.path === '/pricing' ? (isDark ? '#fff' : '#1e293b') : tokens.colors.text.secondary }" 
          >
            {{ $t('nav.price') }}
          </router-link>

          <!-- Help Menu (If Logged In) -->
          <div v-if="userEmail" class="relative help-menu-container flex items-center">
            <button 
              @click="toggleHelpMenu"
              class="text-sm font-medium transition-colors hover-underline-effect flex items-center"
              :class="[
                isDark ? 'hover:text-white' : 'hover:text-gray-900',
                showHelpMenu ? 'nav-link-active' : ''
              ]"
              :style="{ color: showHelpMenu ? (isDark ? '#fff' : '#1e293b') : tokens.colors.text.secondary }"
            >
              {{ $t('nav.help') }}
            </button>
            
            <!-- Help Dropdown -->
            <div 
              v-if="showHelpMenu"
              class="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border z-50 overflow-hidden"
              :style="{ backgroundColor: isDark ? tokens.colors.background.overlay : '#ffffff', borderColor: tokens.colors.border.strong }"
            >
              <div class="py-1">
                <!-- Page Guide -->
                <button 
                  @click="handleStartTour" 
                  class="w-full text-left flex items-center px-4 py-2 text-sm transition-colors" 
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  {{ $t('nav.guide') }}
                </button>
                
                <!-- Feedback -->
                <button 
                  @click="handleOpenFeedback" 
                  class="w-full text-left flex items-center px-4 py-2 text-sm transition-colors" 
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                  {{ $t('nav.feedback') }}
                </button>
                
                <!-- Contact Us -->
                <button 
                  @click="handleOpenContact" 
                  class="w-full text-left flex items-center px-4 py-2 text-sm transition-colors" 
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {{ $t('nav.contact') }}
                </button>
              </div>
            </div>
          </div>

          <!-- User Avatar with Dropdown (If Logged In) - Now at the end -->
          <div v-if="userEmail" class="relative user-menu-container">
            <button 
              @click="toggleUserMenu"
              class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm border cursor-pointer hover:border-white transition-colors"
              :style="{ borderColor: tokens.colors.border.strong }"
            >
              U
            </button>
            
            <!-- User Dropdown -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border z-50 overflow-hidden"
              :style="{ backgroundColor: isDark ? tokens.colors.background.overlay : '#ffffff', borderColor: tokens.colors.border.strong }"
            >
              <div class="py-1">
                <!-- Watchlist -->
                <button 
                  @click="openWatchlist" 
                  class="w-full text-left flex items-center px-4 py-2 text-sm transition-colors" 
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  {{ $t('nav.watchlist') }}
                </button>
                
                <!-- Account Info -->
                <router-link 
                  to="/portfolio-input2" 
                  @click="closeUserMenu"
                  class="flex items-center px-4 py-2 text-sm transition-colors" 
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ $t('nav.account') }}
                </router-link>
              </div>
              
              <div class="border-t" :style="{ borderColor: tokens.colors.border.default }">
                <!-- Logout -->
                <button 
                  @click="handleLogout" 
                  class="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 transition-colors"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  {{ $t('nav.logout') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Login/Register Button (If Not Logged In) -->
          <div v-if="!userEmail" class="flex items-center h-full">
            <router-link to="/login" class="flex items-center px-5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/20">
              {{ $t('nav.login') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Watchlist Modal -->
  <WatchlistModal v-if="showWatchlistModal" @close="showWatchlistModal = false" />
  
  <!-- Feedback Modal -->
  <FeedbackModal v-if="showFeedbackModal" @close="showFeedbackModal = false" />
  
  <!-- Contact Modal -->
  <ContactModal v-if="showContactModal" @close="showContactModal = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'
import { useTheme } from '../composables/useTheme'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import WatchlistModal from './WatchlistModal.vue'
import FeedbackModal from './FeedbackModal.vue'
import ContactModal from './ContactModal.vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const userEmail = ref('')
const emit = defineEmits(['logout'])

// 使用主题系统
const { tokens, isDark } = useTheme()

// 导入状态管理
const { resetUserProfile } = useUserProfile()
const { clearSavedReports } = useSavedReports()

// 菜单状态
const showHelpMenu = ref(false)
const showUserMenu = ref(false)
const showWatchlistModal = ref(false)
const showFeedbackModal = ref(false)
const showContactModal = ref(false)

// 搜索框状态
const isSearchFocused = ref(false)
const searchQuery = ref('')

// 处理搜索框失焦
const handleSearchBlur = () => {
  // 延迟关闭，允许点击清除按钮
  setTimeout(() => {
    isSearchFocused.value = false
  }, 150)
}

// 清除搜索
const clearSearch = () => {
  searchQuery.value = ''
}

// 切换帮助菜单
const toggleHelpMenu = () => {
  showHelpMenu.value = !showHelpMenu.value
  showUserMenu.value = false // 关闭其他菜单
}

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
  showHelpMenu.value = false // 关闭其他菜单
}

// 关闭帮助菜单
const closeHelpMenu = () => {
  showHelpMenu.value = false
}

// 关闭用户菜单
const closeUserMenu = () => {
  showUserMenu.value = false
}

// 打开 Watchlist
const openWatchlist = () => {
  closeUserMenu()
  showWatchlistModal.value = true
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  const helpMenu = event.target.closest('.help-menu-container')
  const userMenu = event.target.closest('.user-menu-container')
  
  if (!helpMenu && showHelpMenu.value) {
    closeHelpMenu()
  }
  if (!userMenu && showUserMenu.value) {
    closeUserMenu()
  }
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
      closeHelpMenu()
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

// 打开反馈弹窗
const handleOpenFeedback = () => {
  closeHelpMenu()
  showFeedbackModal.value = true
}

// 打开联系我们弹窗
const handleOpenContact = () => {
  closeHelpMenu()
  showContactModal.value = true
}

// 启动页面引导
const handleStartTour = () => {
  closeHelpMenu()
  
  // 根据当前页面选择不同的引导内容
  const currentPath = route.path
  
  if (currentPath === '/infoB' || currentPath === '/info') {
    startInfoTour()
  } else if (currentPath === '/opportunityB' || currentPath === '/opportunity') {
    startOpportunityTour()
  } else {
    // 默认通用引导
    startGenericTour()
  }
}

// Info 页面引导
const startInfoTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        element: '#content-switcher', 
        popover: { 
          title: t('tour.info.contentSwitcher.title') || '内容切换', 
          description: t('tour.info.contentSwitcher.desc') || '在"推荐"和"关注"之间切换，查看系统推荐的机会或您关注的标的相关内容。',
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#filter-button', 
        popover: { 
          title: t('tour.info.filter.title') || '高级筛选', 
          description: t('tour.info.filter.desc') || '点击打开筛选面板，按来源、方向、周期、评级等条件精确过滤内容。',
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#first-opportunity-card', 
        popover: { 
          title: t('tour.info.card.title') || '机会卡片详解', 
          description: `<div style="text-align:left;line-height:1.6">
<b>• Strategy</b>: 策略类型标签<br>
<b>• Symbol</b>: 股票/标的代码<br>
<b>• Rating</b>: AI 综合评级 (A+/A/B/C/D)<br>
<b>• Direction</b>: 建议方向 (Long做多/Short做空)<br>
<b>• 底部信息</b>: 建议周期、分析模型、风险等级<br><br>
<i>点击卡片可查看完整分析报告</i>
</div>`,
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#floating-tabs', 
        popover: { 
          title: t('tour.info.tabs.title') || '内容分类', 
          description: t('tour.info.tabs.desc') || '在不同类型的内容之间切换：Opportunities (机会)、Themes (主题) 和 Attribution (归因分析)。',
          side: "top", 
          align: 'center' 
        } 
      },
      { 
        element: '#grid-control', 
        popover: { 
          title: t('tour.info.layout.title') || '布局控制', 
          description: t('tour.info.layout.desc') || '调整卡片网格的列数，自定义您喜欢的浏览布局。',
          side: "right", 
          align: 'center' 
        } 
      }
    ]
  });
  driverObj.drive();
}

// Opportunity 页面引导
const startOpportunityTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        popover: { 
          title: t('tour.opportunity.welcome.title') || '欢迎使用机会发现', 
          description: t('tour.opportunity.welcome.desc') || '这里您可以生成和管理您的投资策略。让我们一起来了解如何使用。',
        } 
      },
      { 
        element: '.asset-selector', 
        popover: { 
          title: t('tour.opportunity.asset.title') || '选择标的', 
          description: t('tour.opportunity.asset.desc') || '首先选择您想要分析的股票或其他投资标的。',
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '.strategy-config', 
        popover: { 
          title: t('tour.opportunity.config.title') || '策略配置', 
          description: t('tour.opportunity.config.desc') || '配置分析框架、投资周期和风险偏好等参数。',
          side: "left", 
          align: 'start' 
        } 
      }
    ]
  });
  driverObj.drive();
}

// 通用页面引导
const startGenericTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        popover: { 
          title: t('tour.generic.welcome.title') || '欢迎使用 ScaleAlpha', 
          description: t('tour.generic.welcome.desc') || '这是一个智能投资分析平台。让我们带您快速了解主要功能。',
        } 
      },
      { 
        element: 'nav',
        popover: { 
          title: t('tour.generic.nav.title') || '导航栏', 
          description: t('tour.generic.nav.desc') || '通过顶部导航栏可以访问不同的功能模块。',
          side: "bottom", 
          align: 'center' 
        } 
      }
    ]
  });
  driverObj.drive();
}

const handleLogout = () => {
  closeUserMenu()
  closeHelpMenu()
  
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

/* Hover underline effect */
.hover-underline-effect {
  position: relative;
  padding-bottom: 2px;
}

.hover-underline-effect::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.hover-underline-effect:hover::after {
  width: 100%;
}

/* Active nav link - always show underline */
.nav-link-active::after {
  width: 100% !important;
}

.nav-link-active {
  font-weight: 600;
}

/* Search bar styles */
.search-container {
  max-width: 400px;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-container.search-expanded {
  max-width: 600px;
}

.search-input {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-input-idle {
  transform: scale(1);
}

.search-input-idle:hover {
  border-color: rgba(100, 100, 100, 0.3) !important;
}

.search-input-focused {
  transform: scale(1.01);
}

/* Search icon pulse animation on focus */
@keyframes searchPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.search-container.search-expanded svg {
  animation: searchPulse 0.3s ease-out;
}
</style>
