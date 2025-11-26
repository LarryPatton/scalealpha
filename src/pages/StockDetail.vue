<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- 返回导航 -->
    <div class="border-b border-[#333] bg-[#1f1f1f] px-6 py-3">
      <router-link 
        to="/info" 
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Info 信息中心
      </router-link>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-6 space-y-6">
      <!-- 个股概要区 -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 左侧：股票基本信息 (2/3宽度) -->
          <div class="lg:col-span-2">
            <div class="flex items-baseline gap-3 mb-2">
              <h1 class="text-3xl font-bold text-white">{{ stockData.code }}</h1>
              <span class="text-lg text-gray-400">{{ stockData.name }}</span>
            </div>
            
            <!-- 价格信息 -->
            <div class="flex items-baseline gap-4 mb-3">
              <span class="text-4xl font-bold text-white">${{ stockData.price }}</span>
              <span :class="[
                'text-xl font-semibold',
                stockData.change >= 0 ? 'text-green-500' : 'text-red-500'
              ]">
                {{ stockData.change >= 0 ? '+' : '' }}{{ stockData.change }}%
              </span>
            </div>

            <!-- 基本信息 -->
            <div class="flex gap-6 text-sm">
              <div>
                <span class="text-gray-500">行业：</span>
                <span class="text-gray-300">{{ stockData.industry }}</span>
              </div>
              <div>
                <span class="text-gray-500">市值：</span>
                <span class="text-gray-300">{{ stockData.marketCap }}</span>
              </div>
              <div>
                <span class="text-gray-500">波动率：</span>
                <span class="text-gray-300">{{ stockData.volatility }}</span>
              </div>
              <div>
                <span class="text-gray-500">Beta：</span>
                <span class="text-gray-300">{{ stockData.beta }}</span>
              </div>
            </div>
          </div>

          <!-- 右侧：当前事件 (1/3宽度) -->
          <div class="bg-[#1f1f1f] rounded-lg p-4 border border-[#404040]">
            <h3 class="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              当前事件
            </h3>
            <div v-if="currentEvent">
              <div :class="[
                'inline-block px-2 py-0.5 rounded text-xs font-medium mb-2',
                currentEvent.type === 'earnings' ? 'bg-green-500/20 text-green-400' : 
                currentEvent.type === 'rating' ? 'bg-blue-500/20 text-blue-400' : 
                currentEvent.type === 'news' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'
              ]">
                #{{ currentEvent.tag }}
              </div>
              <div class="text-xs text-gray-500 mb-2">{{ currentEvent.date }}</div>
              <p class="text-sm text-gray-300 leading-relaxed">{{ currentEvent.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 事件时间线 (横向滚动) -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            最近事件
          </h3>
          <div class="text-xs text-gray-500 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            滑动查看更多
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
        
        <!-- 横向滚动时间线 -->
        <div class="relative overflow-x-auto scrollbar-thin scrollbar-thumb-[#404040] scrollbar-track-transparent">
          <!-- 连接线 -->
          <div class="absolute top-6 left-0 h-0.5 bg-[#404040]" style="width: calc(100% + 200px)"></div>
          
          <!-- 事件节点容器 -->
          <div class="flex gap-8 min-w-max pb-2">
            <button 
              v-for="event in timeline"
              :key="event.date"
              @click="selectEvent(event.date)"
              class="group cursor-pointer flex-shrink-0 w-48"
            >
              <!-- 节点圆点 -->
              <div class="flex justify-center mb-3">
                <div :class="[
                  'w-4 h-4 rounded-full border-4 border-[#2a2a2a] transition-all relative z-10',
                  event.type === 'earnings' ? 'bg-green-500 group-hover:bg-green-400' : 
                  event.type === 'rating' ? 'bg-blue-500 group-hover:bg-blue-400' : 
                  event.type === 'news' ? 'bg-yellow-500 group-hover:bg-yellow-400' : 'bg-purple-500 group-hover:bg-purple-400',
                  selectedEvent === event.date ? 'scale-150 ring-4 ring-blue-500/30' : 'group-hover:scale-125'
                ]"></div>
              </div>
              
              <!-- 日期和标签 -->
              <div class="text-center">
                <div :class="[
                  'inline-block px-2 py-0.5 rounded text-xs font-medium mb-1',
                  event.type === 'earnings' ? 'bg-green-500/20 text-green-400' : 
                  event.type === 'rating' ? 'bg-blue-500/20 text-blue-400' : 
                  event.type === 'news' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400',
                  selectedEvent === event.date ? 'ring-2 ring-current' : ''
                ]">
                  #{{ event.tag }}
                </div>
                <div class="text-xs text-gray-500">{{ event.date }}</div>
                <div class="text-xs text-gray-400 mt-1 line-clamp-2">{{ event.content }}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 归因分析 -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <div class="mb-4">
          <h3 class="text-xl font-bold text-white mb-2">归因分析</h3>
          <p class="text-gray-400 text-sm">基于多因子模型，分析 {{ stockData.code }} 近期表现的主要驱动因素：</p>
        </div>

        <!-- 因子贡献 -->
        <div class="space-y-4">
          <div 
            v-for="factor in attributionFactors"
            :key="factor.name"
            class="bg-[#1f1f1f] rounded-lg p-4 border border-[#404040]"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <span class="text-white font-medium">{{ factor.name }}</span>
                <span 
                  :class="[
                    'text-sm font-semibold',
                    factor.contribution >= 0 ? 'text-green-500' : 'text-red-500'
                  ]"
                >
                  {{ factor.contribution >= 0 ? '+' : '' }}{{ factor.contribution }}%
                </span>
              </div>
              <span class="text-xs text-gray-500">{{ factor.weight }}</span>
            </div>
            
            <p class="text-sm text-gray-400">{{ factor.description }}</p>
          </div>
        </div>
      </div>

      <!-- 社区观点 / 讨论区 -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
            </svg>
            社区观点
          </h3>
          <button class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            查看全部讨论 →
          </button>
        </div>

        <div class="space-y-4">
          <div 
            v-for="post in communityPosts"
            :key="post.id"
            class="bg-[#1f1f1f] rounded-lg p-4 border border-[#404040] hover:border-[#505050] transition-colors cursor-pointer"
          >
            <div class="flex items-center gap-3 mb-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {{ post.author[0] }}
              </div>
              <div class="flex-1">
                <div class="font-medium text-white">{{ post.author }}</div>
                <div class="text-xs text-gray-500">{{ post.time }}</div>
              </div>
              <div class="flex items-center gap-1 text-gray-400">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
                <span class="text-sm">{{ post.likes }}</span>
              </div>
            </div>
            <p class="text-gray-300 text-sm">{{ post.content }}</p>
          </div>
        </div>
      </div>

      <!-- 底部CTA区域 - Watchlist Management Button -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <div class="relative">
          <button 
            @click="handleButtonClick"
            :class="[
              'w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
              isFollowing 
                ? 'bg-purple-500/20 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/30' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            ]"
          >
            <svg 
              class="w-5 h-5" 
              :fill="isFollowing ? 'currentColor' : 'none'"
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span>{{ buttonText }}</span>
          </button>

          <!-- Watchlist Management Menu (shown when already following) -->
          <div 
            v-if="showManagementMenu"
            @click.stop
            class="absolute top-full left-0 right-0 mt-2 z-50 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
          >
            <div class="p-4 border-b border-[#404040]">
              <h3 class="text-sm font-semibold text-gray-300 mb-2">管理自选组</h3>
              <p class="text-xs text-gray-500">已加入 {{ followingGroups.length }} 个自选组</p>
            </div>
            
            <div class="max-h-64 overflow-y-auto">
              <div 
                v-for="group in availableGroups"
                :key="group.id"
                @click="toggleAssetInGroup(group.id)"
                class="px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer transition flex items-center justify-between group"
              >
                <div class="flex items-center gap-3">
                  <div 
                    :class="[
                      'w-5 h-5 rounded border-2 flex items-center justify-center transition',
                      isInGroup(group.id)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-600 group-hover:border-purple-500'
                    ]"
                  >
                    <svg 
                      v-if="isInGroup(group.id)"
                      class="w-3 h-3 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="text-sm text-gray-300">{{ group.name }}</span>
                </div>
                <span v-if="isInGroup(group.id)" class="text-xs text-purple-400">已加入</span>
              </div>
              <div v-if="availableGroups.length === 0" class="px-4 py-6 text-sm text-gray-500 text-center">
                <p class="mb-2">暂无自选组</p>
                <p class="text-xs text-gray-600">前往信息中心创建您的第一个自选组</p>
              </div>
            </div>
            
            <div class="p-3 border-t border-[#404040] bg-[#1a1a1a]">
              <button
                @click="removeFromAllGroups"
                class="w-full py-2 px-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-medium"
              >
                从所有自选组中移除
              </button>
            </div>
          </div>

          <!-- Add to Watchlist Menu (shown when not following) -->
          <div 
            v-if="showAddMenu"
            @click.stop
            class="absolute top-full left-0 right-0 mt-2 z-50 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
          >
            <div class="p-4 border-b border-[#404040]">
              <h3 class="text-sm font-semibold text-gray-300">选择自选组</h3>
            </div>
            
            <div class="max-h-64 overflow-y-auto">
              <div 
                v-for="group in availableGroups"
                :key="group.id"
                @click="addToGroup(group.id)"
                class="px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer transition flex items-center justify-between"
              >
                <span class="text-sm text-gray-300">{{ group.name }}</span>
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div v-if="availableGroups.length === 0" class="px-4 py-6 text-sm text-gray-500 text-center">
                <p class="mb-2">暂无自选组</p>
                <p class="text-xs text-gray-600">前往信息中心创建您的第一个自选组</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWatchlists } from '../composables/useWatchlists'

const route = useRoute()

const {
  watchlists,
  isAssetFollowing,
  isAssetInGroup,
  toggleAssetInGroup: toggleAsset,
  addAssetToGroup,
  getGroupsForAsset,
  removeAssetFromGroup
} = useWatchlists()

// 状态
const showManagementMenu = ref(false)
const showAddMenu = ref(false)
const selectedEvent = ref(null)

// Get asset code from route params
const assetCode = computed(() => route.params.id)

// Check if asset is in any watchlist
const isFollowing = computed(() => isAssetFollowing(assetCode.value))

// Get all groups containing this asset
const followingGroups = computed(() => getGroupsForAsset(assetCode.value))

// Get available groups
const availableGroups = computed(() => watchlists.value)

// Button text based on following status
const buttonText = computed(() => {
  if (isFollowing.value) {
    return '管理自选组'
  }
  return '加入自选组'
})

// Handle button click
const handleButtonClick = () => {
  if (isFollowing.value) {
    showManagementMenu.value = !showManagementMenu.value
    showAddMenu.value = false
  } else {
    showAddMenu.value = !showAddMenu.value
    showManagementMenu.value = false
  }
}

// Check if asset is in a specific group
const isInGroup = (groupId) => {
  return isAssetInGroup(groupId, assetCode.value)
}

// Toggle asset in group
const toggleAssetInGroup = (groupId) => {
  toggleAsset(groupId, assetCode.value)
}

// Add to a specific group and close menu
const addToGroup = (groupId) => {
  addAssetToGroup(groupId, assetCode.value)
  showAddMenu.value = false
}

// Remove from all groups
const removeFromAllGroups = () => {
  followingGroups.value.forEach(group => {
    removeAssetFromGroup(group.id, assetCode.value)
  })
  showManagementMenu.value = false
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('button') && !target.closest('.absolute')) {
    showManagementMenu.value = false
    showAddMenu.value = false
  }
}

// 页面加载时默认选中第一个事件
onMounted(() => {
  if (timeline.value.length > 0) {
    selectedEvent.value = timeline.value[0].date
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 检测当前页面类型 (market / etf / stock)
const pageType = computed(() => {
  const path = route.path
  if (path.includes('/info/market')) return 'market'
  if (path.includes('/info/etf')) return 'etf'
  if (path.includes('/info/stock')) return 'stock'
  return 'stock'
})

// 模拟数据 - 大盘信息
const marketDataMap = {
  'm1': { code: 'SPY', name: 'S&P 500 ETF Trust', price: '475.32', change: 1.25, industry: '指数ETF', marketCap: '$420B AUM', volatility: '12%', beta: '1.00' },
  'm2': { code: 'QQQ', name: 'Invesco QQQ Trust', price: '405.18', change: 1.56, industry: '科技ETF', marketCap: '$210B AUM', volatility: '18%', beta: '1.15' },
  'm3': { code: 'DIA', name: 'SPDR Dow Jones Industrial', price: '368.90', change: 0.85, industry: '指数ETF', marketCap: '$28B AUM', volatility: '11%', beta: '0.95' },
  'm4': { code: 'IWM', name: 'Russell 2000 ETF', price: '198.45', change: -0.65, industry: '小盘ETF', marketCap: '$60B AUM', volatility: '22%', beta: '1.25' }
}

// 模拟数据 - ETF/基金信息
const etfDataMap = {
  'e1': { code: 'ARKK', name: 'ARK Innovation ETF', price: '45.82', change: -2.10, industry: '创新科技', marketCap: '$6.5B AUM', volatility: '45%', beta: '1.85' },
  'e2': { code: 'XLE', name: 'Energy Select Sector SPDR', price: '85.34', change: 0.45, industry: '能源', marketCap: '$35B AUM', volatility: '25%', beta: '1.10' },
  'e3': { code: 'VGT', name: 'Vanguard Info Tech ETF', price: '485.67', change: 2.05, industry: '科技', marketCap: '$65B AUM', volatility: '20%', beta: '1.12' },
  'e4': { code: 'TLT', name: 'iShares 20+ Year Treasury', price: '92.15', change: -0.55, industry: '国债', marketCap: '$45B AUM', volatility: '15%', beta: '-0.25' },
  'e5': { code: 'GLD', name: 'SPDR Gold Trust', price: '185.20', change: 0.75, industry: '黄金', marketCap: '$58B AUM', volatility: '16%', beta: '0.05' },
  'e6': { code: 'KWEB', name: 'KraneShares CSI China Internet', price: '32.45', change: 3.25, industry: '中概互联网', marketCap: '$6.8B AUM', volatility: '38%', beta: '1.45' },
  'e7': { code: 'SOXX', name: 'iShares Semiconductor ETF', price: '485.30', change: 2.80, industry: '半导体', marketCap: '$10B AUM', volatility: '28%', beta: '1.35' },
  'e8': { code: 'XLF', name: 'Financial Select Sector SPDR', price: '38.95', change: 0.95, industry: '金融', marketCap: '$42B AUM', volatility: '18%', beta: '1.05' }
}

// 模拟数据 - 个股信息
const stockDataMap = {
  's1': { code: 'NVDA', name: '英伟达', price: '875.28', change: 5.6, industry: 'AI芯片', marketCap: '$2.15T', volatility: '28%', beta: '1.45' },
  's2': { code: 'TSLA', name: '特斯拉', price: '230.15', change: 3.2, industry: '电动车', marketCap: '$730B', volatility: '42%', beta: '2.01' },
  's3': { code: 'MSFT', name: '微软', price: '378.91', change: 1.8, industry: '云计算', marketCap: '$2.81T', volatility: '18%', beta: '0.92' },
  's4': { code: 'AAPL', name: '苹果', price: '189.84', change: 2.1, industry: '消费电子', marketCap: '$2.92T', volatility: '20%', beta: '1.12' },
  's5': { code: 'GOOGL', name: '谷歌', price: '141.80', change: 1.5, industry: '互联网', marketCap: '$1.77T', volatility: '22%', beta: '1.05' },
  's6': { code: 'META', name: 'Meta', price: '484.03', change: 4.3, industry: '社交媒体', marketCap: '$1.23T', volatility: '35%', beta: '1.28' },
  's7': { code: 'AMZN', name: '亚马逊', price: '178.25', change: 2.7, industry: '电商', marketCap: '$1.84T', volatility: '26%', beta: '1.15' },
  's8': { code: 'AMD', name: 'AMD', price: '165.32', change: 6.8, industry: '芯片', marketCap: '$267B', volatility: '38%', beta: '1.75' },
  's9': { code: 'NFLX', name: '奈飞', price: '628.45', change: -1.2, industry: '流媒体', marketCap: '$270B', volatility: '32%', beta: '1.22' },
  's10': { code: 'CRM', name: 'Salesforce', price: '285.60', change: 1.9, industry: 'SaaS', marketCap: '$279B', volatility: '24%', beta: '1.08' }
}

const stockData = computed(() => {
  const id = route.params.id
  const type = pageType.value
  
  if (type === 'market') {
    return marketDataMap[id] || { code: id, name: '未知指数', price: '0.00', change: 0, industry: '-', marketCap: '-', volatility: '-', beta: '-' }
  } else if (type === 'etf') {
    return etfDataMap[id] || { code: id, name: '未知基金', price: '0.00', change: 0, industry: '-', marketCap: '-', volatility: '-', beta: '-' }
  } else {
    return stockDataMap[id] || { code: id, name: '未知公司', price: '0.00', change: 0, industry: '-', marketCap: '-', volatility: '-', beta: '-' }
  }
})

// 事件时间线
const timeline = ref([
  { date: '2024-01-15', type: 'earnings', tag: '财报', content: 'Q4财报超预期，EPS $5.42 vs 预期 $5.20，盘后涨7%' },
  { date: '2024-01-10', type: 'rating', tag: '评级', content: '摩根士丹利上调目标价至$950，维持"增持"评级' },
  { date: '2024-01-05', type: 'news', tag: '新闻', content: '宣布与OpenAI达成战略合作，将提供AI芯片支持' },
  { date: '2023-12-28', type: 'macro', tag: '宏观', content: '美联储暗示2024年可能降息，科技股普遍受益' }
])

// 每个事件对应的归因分析数据
const eventAttributionMap = {
  '2024-01-15': [
    { name: '基本面因子', contribution: 6.5, weight: '权重 40%', description: 'Q4财报大超预期，EPS增长45%，营收同比增长52%，毛利率提升至72%' },
    { name: '情绪因子', contribution: 5.2, weight: '权重 30%', description: '财报发布后市场情绪极度乐观，社交媒体讨论量暴涨380%，机构纷纷上调评级' },
    { name: '动量因子', contribution: 3.8, weight: '权重 20%', description: '盘后涨7%，突破前高，技术面形成向上突破，MACD金叉强化' },
    { name: '价值因子', contribution: -2.1, weight: '权重 10%', description: '财报后估值进一步抬升，P/E达到65倍，相对行业溢价扩大至25%' }
  ],
  '2024-01-10': [
    { name: '情绪因子', contribution: 4.5, weight: '权重 35%', description: '大摩上调目标价至$950，多家投行跟进看多，市场信心大幅提振' },
    { name: '动量因子', contribution: 3.2, weight: '权重 30%', description: '评级上调刺激买盘，价格突破阻力位$880，成交量显著放大' },
    { name: '基本面因子', contribution: 2.5, weight: '权重 25%', description: '机构报告强调AI芯片需求持续增长，上调未来3年营收预测' },
    { name: '价值因子', contribution: -0.8, weight: '权重 10%', description: '目标价上调反映估值预期提升，但当前估值仍处于历史高位' }
  ],
  '2024-01-05': [
    { name: '情绪因子', contribution: 5.8, weight: '权重 35%', description: '与OpenAI合作消息引发热议，AI概念股集体走强，市场FOMO情绪浓厚' },
    { name: '基本面因子', contribution: 4.1, weight: '权重 30%', description: '战略合作确保AI芯片需求长期稳定，强化行业龙头地位和护城河' },
    { name: '动量因子', contribution: 2.9, weight: '权重 25%', description: '消息发布后股价大涨5%，技术指标转强，资金持续流入' },
    { name: '价值因子', contribution: -1.2, weight: '权重 10%', description: '利好消息推动估值上升，短期透支部分未来增长预期' }
  ],
  '2023-12-28': [
    { name: '宏观因子', contribution: 3.5, weight: '权重 40%', description: '美联储鸽派信号明确，2024年降息预期升温，流动性改善利好成长股' },
    { name: '动量因子', contribution: 2.8, weight: '权重 25%', description: '科技股普遍反弹，纳指走强带动板块轮动，技术面改善' },
    { name: '情绪因子', contribution: 2.2, weight: '权重 20%', description: '降息预期提振风险偏好，投资者重新配置成长型资产' },
    { name: '价值因子', contribution: 1.1, weight: '权重 15%', description: '利率下行改善DCF估值，成长股相对价值提升' }
  ]
}

// 每个事件对应的社区观点数据
const eventCommunityMap = {
  '2024-01-15': [
    { id: 1, author: 'AI投资家', time: '1小时前', content: '财报炸裂！EPS大超预期45%，数据中心业务增长爆表。Jensen Huang在电话会议上透露H200芯片供不应求，这波至少看到$950+。', likes: 856 },
    { id: 2, author: 'QuantTrader', time: '2小时前', content: '量化模型显示财报后基本面因子贡献跃升至6.5%，历史上财报超预期后平均有15%的后续涨幅空间。但注意估值拖累加剧。', likes: 542 },
    { id: 3, author: '技术派老王', time: '3小时前', content: '盘后涨7%直接突破$900大关，量价齐升，MACD金叉放大。短期回调就是加仓机会，目标$920。', likes: 423 }
  ],
  '2024-01-10': [
    { id: 1, author: '华尔街观察', time: '6小时前', content: '大摩上调目标价至$950，成为最乐观的投行之一。报告强调AI芯片需求周期才刚开始，给予"强力买入"评级。', likes: 634 },
    { id: 2, author: 'ValueSeeker', time: '8小时前', content: '机构评级上调反映基本面改善，但要注意估值风险。当前P/E 65倍，即便业绩高增长也需要时间消化估值。分批建仓更稳妥。', likes: 387 },
    { id: 3, author: '趋势跟随者', time: '10小时前', content: '评级上调 + 价格突破$880阻力位，技术面和基本面共振。动量因子转强，建议持有。', likes: 295 }
  ],
  '2024-01-05': [
    { id: 1, author: 'AI产业观察', time: '2天前', content: '与OpenAI战略合作是重大利好！确保GPU供应优先级，巩固在AI算力领域的垄断地位。这是长期投资逻辑的重要一环。', likes: 721 },
    { id: 2, author: 'TechAnalyst', time: '2天前', content: '合作消息推动股价涨5%，情绪因子贡献最大达5.8%。但要警惕利好兑现后的回调，建议设置止盈。', likes: 458 },
    { id: 3, author: '长线持有者', time: '2天前', content: 'OpenAI是最大的GPU客户之一，这次合作强化了护城河。长期看涨逻辑不变，短期波动不改基本面。', likes: 382 }
  ],
  '2023-12-28': [
    { id: 1, author: '宏观策略师', time: '3周前', content: '美联储转鸽是成长股的福音！2024年降息预期升温，科技股估值压力减轻。NVDA作为AI龙头，最受益于流动性改善。', likes: 589 },
    { id: 2, author: 'MarketTimer', time: '3周前', content: '降息预期推动纳指反弹，科技股普涨。宏观因子贡献3.5%，这波行情有宏观支撑，不是单纯的情绪炒作。', likes: 412 },
    { id: 3, author: '价值投资者', time: '3周前', content: '利率下行改善DCF估值，成长股相对吸引力提升。但别忘了降息通常伴随经济放缓，需关注需求端风险。', likes: 324 }
  ]
}

// 当前归因因子（基于选中事件）
const attributionFactors = computed(() => {
  const eventDate = selectedEvent.value || timeline.value[0]?.date
  return eventAttributionMap[eventDate] || []
})

// 当前社区帖子（基于选中事件）
const communityPosts = computed(() => {
  const eventDate = selectedEvent.value || timeline.value[0]?.date
  return eventCommunityMap[eventDate] || []
})


// 选择事件
const selectEvent = (eventDate) => {
  selectedEvent.value = eventDate
}

// 当前事件（基于selectedEvent）
const currentEvent = computed(() => {
  if (selectedEvent.value) {
    return timeline.value.find(e => e.date === selectedEvent.value)
  }
  // 默认显示最新事件（第一个）
  return timeline.value[0]
})
</script>
