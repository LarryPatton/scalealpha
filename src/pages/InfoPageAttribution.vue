<template>
  <div class="bg-[#0f0f0f] min-h-screen flex flex-col pb-24">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#333] px-4 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
        </router-link>
        <div class="flex items-center gap-4 text-sm">
          <span class="text-gray-500">布局对比:</span>
          <router-link to="/info/waterfall" class="text-gray-400 hover:text-white transition-colors">瀑布流 (Waterfall)</router-link>
          <router-link to="/info/kanban" class="text-gray-400 hover:text-white transition-colors">横向看板 (Kanban)</router-link>
          <router-link to="/info/attribution" class="text-white font-bold border-b-2 border-blue-500 pb-0.5">归因看板 (Attribution)</router-link>
        </div>
      </div>
      <!-- Search & Profile (Simplified) -->
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-gray-700"></div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col overflow-hidden">
      <div class="px-8 py-6 flex-shrink-0 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">Global Market Attribution</h1>
          <p class="text-gray-400 text-sm">Real-time event analysis across global markets.</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Pagination Controls -->
          <div class="flex items-center bg-[#2a2a2a] rounded border border-[#333]">
            <button 
              @click="changePage(-1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-r border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentPage === 0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span class="px-3 text-xs text-gray-500 font-mono">{{ currentPage + 1 }} / {{ totalPages }}</span>
            <button 
              @click="changePage(1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-l border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentPage >= totalPages - 1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
          
          <div class="h-6 w-px bg-[#333]"></div>

          <div class="flex gap-2">
            <button class="px-3 py-1 text-xs bg-[#2a2a2a] text-white rounded border border-[#333] hover:border-gray-500">All Sectors</button>
            <button class="px-3 py-1 text-xs bg-[#2a2a2a] text-white rounded border border-[#333] hover:border-gray-500">Newest First</button>
          </div>
        </div>
      </div>

      <!-- Attribution Kanban Container -->
      <div class="flex-grow px-8 pb-8 overflow-hidden">
        <div class="grid grid-cols-4 gap-6 h-full">
          
          <!-- Market Column -->
          <div v-for="market in visibleMarkets" :key="market.id" class="flex flex-col bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden h-full">
            
            <!-- Column Header -->
            <div class="p-4 border-b border-[#333] bg-[#222] flex justify-between items-center flex-shrink-0">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ market.flag }}</span>
                <h3 class="font-bold text-white">{{ market.name }}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :class="market.isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"></span>
                <span class="text-xs text-gray-400 uppercase">{{ market.isOpen ? 'Open' : 'Closed' }}</span>
              </div>
            </div>

            <!-- Events List (Vertical Scroll) -->
            <div 
              class="flex-grow overflow-y-auto custom-scrollbar-y p-4 space-y-4"
              @scroll="handleScroll($event, market.id)"
            >
              <div v-for="event in market.events" :key="event.id" class="relative pl-4 border-l-2 border-[#333] hover:border-blue-500/50 transition-colors group">
                <!-- Timeline Dot -->
                <div class="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#333] group-hover:bg-blue-500 transition-colors border border-[#1a1a1a]"></div>
                
                <!-- Time Label -->
                <div class="text-xs text-gray-500 mb-1 font-mono">{{ event.time }}</div>

                <!-- Event Card -->
                <div class="bg-[#222] rounded-lg border border-[#333] overflow-hidden hover:border-gray-500 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col">
                  
                  <!-- Image Area -->
                  <div class="h-32 w-full bg-[#111] relative overflow-hidden">
                    <img :src="event.image" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Event Image" />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent opacity-60"></div>
                  </div>

                  <div class="p-3">
                    <h4 class="text-sm font-bold text-white mb-1 leading-snug">{{ event.title }}</h4>
                    <p class="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{{ event.desc }}</p>
                    
                    <!-- Stock Data Block (图2 Style) -->
                    <div class="bg-[#111] rounded p-2 flex items-center gap-3 border border-[#333/50]">
                      <!-- Logo Placeholder -->
                      <div class="w-8 h-8 rounded bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333]">
                        {{ event.stock.symbol[0] }}
                      </div>
                      
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-baseline">
                          <span class="text-sm font-bold text-white">{{ event.stock.symbol }}</span>
                          <span class="text-xs font-mono font-medium" :class="event.stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                            {{ event.stock.change >= 0 ? '+' : '' }}{{ event.stock.change }}%
                          </span>
                        </div>
                        <div class="flex justify-between items-center mt-0.5">
                          <span class="text-[10px] text-gray-500 truncate">{{ event.stock.name }}</span>
                          <span class="text-xs font-bold text-gray-300">{{ event.stock.price }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- Tags -->
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      <span v-for="tag in event.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-[#2a2a2a] text-gray-500 rounded border border-[#333]">{{ tag }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loading Indicator per column -->
              <div v-if="market.isLoading" class="py-4 flex flex-col items-center gap-2">
                <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-gray-500">Loading history...</span>
              </div>
              
              <!-- End of History -->
              <div v-if="!market.isLoading && market.events.length > 50" class="py-4 text-center">
                <span class="text-xs text-gray-600">No more events</span>
              </div>
              
              <!-- Sentinel for Intersection Observer -->
              <div :ref="el => setSentinel(el, market.id)" class="h-4 w-full"></div>
            </div>

          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted } from 'vue'

// Pagination Logic
const currentPage = ref(0)
const itemsPerPage = 4

const totalPages = computed(() => Math.ceil(markets.value.length / itemsPerPage))

const visibleMarkets = computed(() => {
  const start = currentPage.value * itemsPerPage
  return markets.value.slice(start, start + itemsPerPage)
})

const changePage = (delta) => {
  const newPage = currentPage.value + delta
  if (newPage >= 0 && newPage < totalPages.value) {
    currentPage.value = newPage
  }
}

// Intersection Observer for Infinite Scroll
const sentinels = ref({})
let observers = {}

const setSentinel = (el, marketId) => {
  if (el) {
    sentinels.value[marketId] = el
    setupObserver(marketId, el)
  }
}

const setupObserver = (marketId, el) => {
  if (observers[marketId]) observers[marketId].disconnect()

  observers[marketId] = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreEvents(marketId)
    }
  }, { rootMargin: '200px' })

  observers[marketId].observe(el)
}

const loadMoreEvents = async (marketId) => {
  const market = markets.value.find(m => m.id === marketId)
  if (!market || market.isLoading || market.events.length > 50) return

  market.isLoading = true
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
  const newEvents = generateEvents(templateId, 5, market.events.length)
  market.events.push(...newEvents)
  
  market.isLoading = false
}

// Mock Data Generators
const generateEvents = (marketId, count, startIndex) => {
  const templates = {
    'us': [
      { title: 'NVDA Chip Delay', desc: '芯片发布推迟消息引发市场担忧，多家投行下调目标价。', stock: { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$485.09', change: -3.45 }, tags: ['Chips', 'AI'], image: 'https://placehold.co/400x200/1a4d2e/white?text=NVDA+Chip' },
      { title: 'Tesla Recall', desc: '自动驾驶软件问题宣布召回部分车辆，股价承压。', stock: { symbol: 'TSLA', name: 'Tesla Inc', price: '$235.45', change: 1.80 }, tags: ['EV', 'Auto'], image: 'https://placehold.co/400x200/4d1a1a/white?text=Tesla+Recall' },
      { title: 'Apple Vision Pro', desc: '预售火爆超出预期，供应链传出增产消息。', stock: { symbol: 'AAPL', name: 'Apple Inc', price: '$192.50', change: 1.20 }, tags: ['Tech', 'VR'], image: 'https://placehold.co/400x200/222/white?text=Vision+Pro' },
      { title: 'Fed Rate Decision', desc: '美联储暗示维持利率不变，市场解读为鸽派信号。', stock: { symbol: 'SPY', name: 'S&P 500 ETF', price: '$475.00', change: 0.85 }, tags: ['Macro', 'Fed'], image: 'https://placehold.co/400x200/333/white?text=Fed+Rate' }
    ],
    'hk': [
      { title: 'Tencent Gaming', desc: '新批号发放，游戏板块集体反弹，腾讯领涨。', stock: { symbol: '0700.HK', name: 'Tencent', price: 'HK$320.00', change: 2.50 }, tags: ['Gaming', 'Tech'], image: 'https://placehold.co/400x200/1a4d2e/white?text=Tencent' },
      { title: 'Alibaba Cloud', desc: '阿里云分拆计划重启传闻，管理层未予置评。', stock: { symbol: '9988.HK', name: 'Alibaba', price: 'HK$76.50', change: 1.10 }, tags: ['Cloud', 'E-com'], image: 'https://placehold.co/400x200/333/white?text=Alibaba' },
      { title: 'EV Price War', desc: '比亚迪宣布新一轮降价，引发汽车股普跌。', stock: { symbol: '1211.HK', name: 'BYD Co', price: 'HK$205.00', change: -2.30 }, tags: ['EV', 'Auto'], image: 'https://placehold.co/400x200/4d1a1a/white?text=BYD' }
    ],
    'cn': [
      { title: 'Moutai Dividend', desc: '茅台董事会批准实施特别分红方案，股息率提升。', stock: { symbol: '600519', name: 'Kweichow Moutai', price: '¥1750.00', change: 1.50 }, tags: ['Consumer', 'Liquor'], image: 'https://placehold.co/400x200/1a4d2e/white?text=Moutai' },
      { title: 'Solar Policy', desc: '光伏行业新规出台，限制低端产能扩张。', stock: { symbol: '601012', name: 'Longi Green', price: '¥22.50', change: -1.20 }, tags: ['Solar', 'Energy'], image: 'https://placehold.co/400x200/4d1a1a/white?text=Solar' },
      { title: 'Bank Support', desc: '央行降准落地，银行板块流动性改善。', stock: { symbol: '600036', name: 'CM Bank', price: '¥30.20', change: 0.90 }, tags: ['Bank', 'Finance'], image: 'https://placehold.co/400x200/333/white?text=Bank' }
    ]
  }

  const marketTemplates = templates[marketId] || templates['us']
  
  return Array.from({ length: count }).map((_, i) => {
    const template = marketTemplates[(startIndex + i) % marketTemplates.length]
    // Generate a realistic looking time
    const date = new Date()
    date.setMinutes(date.getMinutes() - (startIndex + i) * 15)
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    return {
      id: `${marketId}-${startIndex + i}`,
      time: timeStr,
      ...template,
      // Add slight variation to price/change to make it look dynamic
      stock: {
        ...template.stock,
        change: parseFloat((template.stock.change + (Math.random() - 0.5)).toFixed(2))
      }
    }
  })
}

const markets = ref([
  { id: 'us', name: 'US Market', flag: '🇺🇸', isOpen: true, events: [], isLoading: false },
  { id: 'hk', name: 'HK Market', flag: '🇭🇰', isOpen: false, events: [], isLoading: false },
  { id: 'cn', name: 'CN Market', flag: '🇨🇳', isOpen: false, events: [], isLoading: false },
  { id: 'jp', name: 'JP Market', flag: '🇯🇵', isOpen: true, events: [], isLoading: false },
  { id: 'eu', name: 'EU Market', flag: '🇪🇺', isOpen: true, events: [], isLoading: false },
  { id: 'uk', name: 'UK Market', flag: '🇬🇧', isOpen: true, events: [], isLoading: false },
  { id: 'in', name: 'IN Market', flag: '🇮🇳', isOpen: true, events: [], isLoading: false },
  { id: 'au', name: 'AU Market', flag: '🇦🇺', isOpen: false, events: [], isLoading: false }
])

// Initial Load
onMounted(() => {
  markets.value.forEach(market => {
    // Use 'us' templates for others as fallback for demo
    const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
    // Increased initial count to 20 to ensure scrollbar appears and enables scrolling
    market.events = generateEvents(templateId, 20, 0)
  })
})

// Infinite Scroll Handler
const handleScroll = async (event, marketId) => {
  const { scrollTop, clientHeight, scrollHeight } = event.target
  const market = markets.value.find(m => m.id === marketId)
  
  // Trigger load when near bottom (50px threshold)
  // Added check for max length to simulate end of data
  if (scrollHeight - scrollTop - clientHeight < 50 && !market.isLoading && market.events.length <= 50) {
    market.isLoading = true
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
    // Load more events (10 at a time)
    const newEvents = generateEvents(templateId, 10, market.events.length)
    market.events.push(...newEvents)
    
    market.isLoading = false
  }
}

// Cleanup
onUnmounted(() => {
  Object.values(observers).forEach(obs => obs.disconnect())
})
</script>

<style scoped>
/* Horizontal Scrollbar for Container */
.custom-scrollbar::-webkit-scrollbar {
  height: 12px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0f0f0f; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

/* Vertical Scrollbar for Columns */
.custom-scrollbar-y::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar-y::-webkit-scrollbar-track {
  background: transparent; 
}
.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 3px;
}
.custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>