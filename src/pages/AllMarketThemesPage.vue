<template>
  <div class="bg-[#0f0f0f] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <router-link to="/info2" class="text-gray-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </router-link>
          <h1 class="text-2xl font-bold text-white">🔥 所有市场热点 (All Market Themes)</h1>
        </div>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#333] pb-4">
          <!-- Tabs -->
          <div class="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
            <button 
              @click="activeTab = 'official'"
              class="px-4 py-1.5 text-sm rounded-md transition-all"
              :class="activeTab === 'official' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
            >
              官方推荐 (Official)
            </button>
            <button 
              @click="activeTab = 'following'"
              class="px-4 py-1.5 text-sm rounded-md transition-all"
              :class="activeTab === 'following' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
            >
              我的关注 (Following)
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">Sort by:</span>
            <select v-model="sortBy" class="bg-[#1a1a1a] border border-[#333] text-gray-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500">
              <option value="heat">Heat 🔥</option>
              <option value="time">Time 🕒</option>
            </select>
          </div>
        </div>
      </div>

      <!-- List -->
      <div class="space-y-8">
        <template v-if="sortBy === 'time'">
          <div v-for="(group, groupName) in groupedThemes" :key="groupName">
            <div class="flex items-center gap-4 mb-4 border-b border-[#333] pb-2">
              <h2 class="text-lg font-bold text-white">{{ groupName }}</h2>
              <span class="text-sm text-gray-500">{{ group.length }} events</span>
            </div>
            <div class="space-y-4">
              <div v-for="theme in group" :key="theme.id" @click="toggleExpand(theme)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer">
                <div class="flex flex-col md:flex-row gap-6">
                  <!-- Left: Sentiment & Confidence -->
                  <div class="md:w-48 flex-shrink-0">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-xs font-bold px-2 py-1 rounded border" 
                        :class="{
                          'bg-green-900/30 text-green-400 border-green-900/50': theme.sentiment === 'BULLISH',
                          'bg-gray-700/30 text-gray-400 border-gray-700/50': theme.sentiment === 'NEUTRAL',
                          'bg-red-900/30 text-red-400 border-red-900/50': theme.sentiment === 'BEARISH'
                        }">
                        {{ theme.sentiment }}
                      </span>
                      <span class="text-sm font-bold text-white">{{ theme.confidence }}%</span>
                    </div>
                    <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div class="h-full" 
                        :class="{
                          'bg-green-500': theme.sentiment === 'BULLISH',
                          'bg-gray-500': theme.sentiment === 'NEUTRAL',
                          'bg-red-500': theme.sentiment === 'BEARISH'
                        }"
                        :style="{ width: theme.confidence + '%' }"></div>
                    </div>
                  </div>

                  <!-- Middle: Content -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors pr-20">{{ theme.title }}</h3>
                    <p class="text-sm text-gray-400 mb-3">{{ theme.desc }}</p>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-500">Related:</span>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="stock in theme.stocks" :key="stock" class="text-xs bg-[#2a2a2a] text-gray-300 px-2 py-0.5 rounded border border-[#333]">{{ stock }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Right: Meta -->
                  <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                    <div class="text-xs text-gray-500">{{ theme.timeAgo }}</div>
                    <div class="flex items-center gap-1 text-xs font-medium" 
                      :class="{
                        'text-red-400': theme.heat === 'High',
                        'text-orange-400': theme.heat === 'Med',
                        'text-blue-400': theme.heat === 'Low'
                      }">
                      <span>🔥</span> {{ theme.heat }} Heat
                    </div>
                  </div>
                </div>

                <!-- Follow Button -->
                <button 
                  @click.stop="toggleFollow(theme)"
                  class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                  :class="theme.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
                >
                  {{ theme.isFollowed ? '✓ 已关注' : '+ 关注' }}
                </button>

                <!-- Expanded Content -->
                <div v-if="theme.isExpanded" class="mt-6 pt-6 border-t border-[#333] animate-fade-in cursor-default" @click.stop>
                  <div class="mb-6">
                    <h4 class="text-sm font-bold text-gray-300 mb-2">📖 主题详情 (Theme Content)</h4>
                    <p class="text-sm text-gray-400 leading-relaxed">{{ theme.content }}</p>
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-300 mb-3">🔗 相关个股 (Related Stocks)</h4>
                    <div class="space-y-3">
                      <div 
                        v-for="stock in theme.stockDetails" 
                        :key="stock.symbol" 
                        @click="goToStockDetail(stock.symbol)"
                        class="bg-[#222] rounded p-3 flex flex-col sm:flex-row sm:items-center gap-3 border border-[#333] hover:bg-[#2a2a2a] hover:border-gray-500 cursor-pointer transition-colors"
                      >
                        <div class="flex items-center gap-4 min-w-[120px]">
                          <span class="font-bold text-white">{{ stock.symbol }}</span>
                          <span class="text-xs font-mono" :class="stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                            {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}% {{ stock.change >= 0 ? '↑' : '↓' }}
                          </span>
                        </div>
                        <div class="text-xs text-gray-500 border-l border-[#444] pl-3 sm:pl-4">
                          {{ stock.reason }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex justify-center">
                    <button @click.stop="toggleExpand(theme)" class="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                      收起 (Collapse) 🔼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="space-y-4">
            <div v-for="theme in sortedThemes" :key="theme.id" @click="toggleExpand(theme)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer">
              <div class="flex flex-col md:flex-row gap-6">
                <!-- Left: Sentiment & Confidence -->
                <div class="md:w-48 flex-shrink-0">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold px-2 py-1 rounded border" 
                      :class="{
                        'bg-green-900/30 text-green-400 border-green-900/50': theme.sentiment === 'BULLISH',
                        'bg-gray-700/30 text-gray-400 border-gray-700/50': theme.sentiment === 'NEUTRAL',
                        'bg-red-900/30 text-red-400 border-red-900/50': theme.sentiment === 'BEARISH'
                      }">
                      {{ theme.sentiment }}
                    </span>
                    <span class="text-sm font-bold text-white">{{ theme.confidence }}%</span>
                  </div>
                  <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full" 
                      :class="{
                        'bg-green-500': theme.sentiment === 'BULLISH',
                        'bg-gray-500': theme.sentiment === 'NEUTRAL',
                        'bg-red-500': theme.sentiment === 'BEARISH'
                      }"
                      :style="{ width: theme.confidence + '%' }"></div>
                  </div>
                </div>

                <!-- Middle: Content -->
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors pr-20">{{ theme.title }}</h3>
                  <p class="text-sm text-gray-400 mb-3">{{ theme.desc }}</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500">Related:</span>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="stock in theme.stocks" :key="stock" class="text-xs bg-[#2a2a2a] text-gray-300 px-2 py-0.5 rounded border border-[#333]">{{ stock }}</span>
                    </div>
                  </div>
                </div>

                <!-- Right: Meta -->
                <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                  <div class="text-xs text-gray-500">{{ theme.timeAgo }}</div>
                  <div class="flex items-center gap-1 text-xs font-medium" 
                    :class="{
                      'text-red-400': theme.heat === 'High',
                      'text-orange-400': theme.heat === 'Med',
                      'text-blue-400': theme.heat === 'Low'
                    }">
                    <span>🔥</span> {{ theme.heat }} Heat
                  </div>
                </div>
              </div>

              <!-- Follow Button -->
              <button 
                @click.stop="toggleFollow(theme)"
                class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                :class="theme.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
              >
                {{ theme.isFollowed ? '✓ 已关注' : '+ 关注' }}
              </button>

              <!-- Expanded Content -->
              <div v-if="theme.isExpanded" class="mt-6 pt-6 border-t border-[#333] animate-fade-in cursor-default" @click.stop>
                <div class="mb-6">
                  <h4 class="text-sm font-bold text-gray-300 mb-2">📖 主题详情 (Theme Content)</h4>
                  <p class="text-sm text-gray-400 leading-relaxed">{{ theme.content }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-bold text-gray-300 mb-3">🔗 相关个股 (Related Stocks)</h4>
                  <div class="space-y-3">
                    <div 
                      v-for="stock in theme.stockDetails" 
                      :key="stock.symbol" 
                      @click="goToStockDetail(stock.symbol)"
                      class="bg-[#222] rounded p-3 flex flex-col sm:flex-row sm:items-center gap-3 border border-[#333] hover:bg-[#2a2a2a] hover:border-gray-500 cursor-pointer transition-colors"
                    >
                      <div class="flex items-center gap-4 min-w-[120px]">
                        <span class="font-bold text-white">{{ stock.symbol }}</span>
                        <span class="text-xs font-mono" :class="stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                          {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}% {{ stock.change >= 0 ? '↑' : '↓' }}
                        </span>
                      </div>
                      <div class="text-xs text-gray-500 border-l border-[#444] pl-3 sm:pl-4">
                        {{ stock.reason }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-center">
                  <button @click.stop="toggleExpand(theme)" class="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                    收起 (Collapse) 🔼
                  </button>
                </div>
              </div>
            </div>
          </div>
        </template>
        
        <!-- Empty State -->
        <div v-if="sortedThemes.length === 0 && Object.keys(groupedThemes).length === 0" class="text-center py-12 text-gray-500">
          <div class="text-4xl mb-4">📂</div>
          <p>暂无内容</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('official')
const sortBy = ref('heat')

// Mock Data
const themesData = ref({
  official: [
    { 
      id: 1, 
      title: 'AI Infrastructure Boom', 
      desc: 'Enterprise AI adoption drives massive infrastructure investment across cloud and semiconductor sectors.', 
      sentiment: 'BULLISH', 
      confidence: 92, 
      stocks: ['NVDA', 'AMD', 'SMCI', 'AVGO'], 
      timeAgo: '2 hours ago', 
      timestamp: Date.now() - 2 * 60 * 60 * 1000, 
      heat: 'High', 
      heatScore: 90, 
      isFollowed: false,
      isExpanded: false,
      content: 'The surge in Generative AI applications is creating an unprecedented demand for high-performance computing infrastructure. Hyperscalers are aggressively increasing their capex to secure GPU supplies, directly benefiting the semiconductor supply chain. We are seeing a structural shift where data center revenue is becoming the primary growth engine for chipmakers.',
      stockDetails: [
        { symbol: 'NVDA', change: 3.45, reason: 'Dominant market share in AI training GPUs; data center revenue +400% YoY.' },
        { symbol: 'AMD', change: 1.20, reason: 'Emerging as a strong second player with MI300 series; gaining traction in inference workloads.' },
        { symbol: 'SMCI', change: -0.50, reason: 'Leading liquid cooling solutions for high-density racks, though margin pressure remains.' },
        { symbol: 'AVGO', change: 2.10, reason: 'Strong demand for custom AI accelerators (ASICs) from Google and Meta.' }
      ]
    },
    { 
      id: 2, 
      title: 'Cybersecurity Renaissance', 
      desc: 'Rising threats fuel enterprise security spending surge as companies fortify digital defenses.', 
      sentiment: 'BULLISH', 
      confidence: 78, 
      stocks: ['CRWD', 'PANW', 'ZS', 'FTNT'], 
      timeAgo: '5 hours ago', 
      timestamp: Date.now() - 5 * 60 * 60 * 1000, 
      heat: 'Med', 
      heatScore: 70, 
      isFollowed: false,
      isExpanded: false,
      content: 'With the increasing sophistication of cyber attacks, including AI-driven threats, enterprises are prioritizing cybersecurity in their IT budgets. Zero-trust architecture and platformization are key trends driving consolidation in the industry.',
      stockDetails: [
        { symbol: 'CRWD', change: 1.85, reason: 'Platform consolidation thesis playing out; strong module adoption.' },
        { symbol: 'PANW', change: 0.95, reason: 'Next-gen firewall demand remains robust; expanding into cloud security.' },
        { symbol: 'ZS', change: -0.30, reason: 'High valuation multiples causing short-term volatility despite good growth.' },
        { symbol: 'FTNT', change: 1.10, reason: 'Strong product cycle in secure networking.' }
      ]
    },
    { 
      id: 3, 
      title: 'Rate Cut Expectations', 
      desc: 'Fed pivot hopes lift rate-sensitive sectors including banks and real estate.', 
      sentiment: 'NEUTRAL', 
      confidence: 65, 
      stocks: ['XLF', 'JPM', 'SCHW', 'BLK'], 
      timeAgo: '1 day ago', 
      timestamp: Date.now() - 25 * 60 * 60 * 1000, 
      heat: 'Med', 
      heatScore: 60, 
      isFollowed: false,
      isExpanded: false,
      content: 'Market participants are pricing in potential rate cuts later this year. This sentiment is providing a floor for financials and real estate, although sticky inflation data could delay the Fed\'s pivot.',
      stockDetails: [
        { symbol: 'XLF', change: 0.45, reason: 'Sector ETF benefiting from yield curve steepening expectations.' },
        { symbol: 'JPM', change: 0.80, reason: 'Best-in-class balance sheet; net interest income remains resilient.' },
        { symbol: 'SCHW', change: -1.50, reason: 'Cash sorting headwinds persist, though slowing down.' },
        { symbol: 'BLK', change: 1.20, reason: 'Asset management flows improving with market rally.' }
      ]
    },
    { 
      id: 4, 
      title: 'Biotech Innovation', 
      desc: 'New gene therapies and weight-loss drugs drive renewed interest in the biotech sector.', 
      sentiment: 'BULLISH', 
      confidence: 72, 
      stocks: ['LLY', 'NVO', 'VRTX'], 
      timeAgo: '3 hours ago', 
      timestamp: Date.now() - 3 * 60 * 60 * 1000, 
      heat: 'High', 
      heatScore: 85, 
      isFollowed: false,
      isExpanded: false,
      content: 'The GLP-1 agonist revolution for obesity and diabetes is just the beginning. We are also seeing breakthroughs in gene editing (CRISPR) and Alzheimer\'s treatments, attracting capital back to the sector.',
      stockDetails: [
        { symbol: 'LLY', change: 2.75, reason: 'Mounjaro/Zepbound sales beating expectations; pipeline expansion.' },
        { symbol: 'NVO', change: 1.90, reason: 'Wegovy supply constraints easing; cardiovascular benefits confirmed.' },
        { symbol: 'VRTX', change: 0.60, reason: 'Dominance in cystic fibrosis; pain management drug shows promise.' }
      ]
    },
    { 
      id: 6, 
      title: 'Semiconductor Cycle', 
      desc: 'Memory chip market showing signs of recovery as demand stabilizes.', 
      sentiment: 'BULLISH', 
      confidence: 80, 
      stocks: ['MU', 'WDC'], 
      timeAgo: 'Yesterday', 
      timestamp: Date.now() - 30 * 60 * 60 * 1000, 
      heat: 'Med', 
      heatScore: 65, 
      isFollowed: false,
      isExpanded: false,
      content: 'After a severe inventory correction, the memory market is bottoming out. Production cuts by major players and recovering demand in PCs and smartphones are driving price increases.',
      stockDetails: [
        { symbol: 'MU', change: 4.10, reason: 'HBM3e qualification with NVIDIA; pricing power returning.' },
        { symbol: 'WDC', change: 2.30, reason: 'Flash memory prices rebounding; spin-off plans unlocking value.' }
      ]
    },
    { 
      id: 7, 
      title: 'Retail Earnings', 
      desc: 'Consumer spending data shows resilience despite inflation concerns.', 
      sentiment: 'NEUTRAL', 
      confidence: 55, 
      stocks: ['WMT', 'TGT', 'COST'], 
      timeAgo: '2 days ago', 
      timestamp: Date.now() - 50 * 60 * 60 * 1000, 
      heat: 'Low', 
      heatScore: 45, 
      isFollowed: false,
      isExpanded: false,
      content: 'The consumer is bending but not breaking. While discretionary spending is under pressure, essentials and value-oriented retailers are gaining market share.',
      stockDetails: [
        { symbol: 'WMT', change: 0.50, reason: 'Grocery strength offsets general merchandise weakness.' },
        { symbol: 'TGT', change: -2.10, reason: 'Discretionary categories remain soft; theft issues impacting margins.' },
        { symbol: 'COST', change: 1.10, reason: 'Membership renewal rates at all-time highs; strong value proposition.' }
      ]
    },
    { 
      id: 8, 
      title: 'Energy Sector Volatility', 
      desc: 'Oil prices fluctuate amidst geopolitical tensions in the Middle East.', 
      sentiment: 'BEARISH', 
      confidence: 60, 
      stocks: ['XOM', 'CVX'], 
      timeAgo: '3 days ago', 
      timestamp: Date.now() - 75 * 60 * 60 * 1000, 
      heat: 'High', 
      heatScore: 88, 
      isFollowed: false,
      isExpanded: false,
      content: 'Despite geopolitical risks, global supply remains ample due to non-OPEC production growth. Demand concerns from China are weighing on prices.',
      stockDetails: [
        { symbol: 'XOM', change: -1.20, reason: 'Guyana production growth strong, but refining margins squeezing.' },
        { symbol: 'CVX', change: -0.90, reason: 'Hess acquisition regulatory hurdles; production guidance mixed.' }
      ]
    }
  ],
  following: [
    { 
      id: 5, 
      title: 'EV Market Shift', 
      desc: 'Competition intensifies in the EV sector as traditional automakers ramp up production.', 
      sentiment: 'BEARISH', 
      confidence: 60, 
      stocks: ['TSLA', 'RIVN', 'F', 'GM'], 
      timeAgo: '4 hours ago', 
      timestamp: Date.now() - 4 * 60 * 60 * 1000, 
      heat: 'Low', 
      heatScore: 40, 
      isFollowed: true,
      isExpanded: false,
      content: 'The EV market is transitioning from early adopters to mass market, leading to price wars. High interest rates are also dampening demand for big-ticket items.',
      stockDetails: [
        { symbol: 'TSLA', change: -3.50, reason: 'Margin compression fears due to price cuts; delivery guidance missed.' },
        { symbol: 'RIVN', change: -4.20, reason: 'Cash burn concerns; production ramp challenges.' },
        { symbol: 'F', change: 0.20, reason: 'Hybrid strategy paying off; pulling back on pure EV spend.' },
        { symbol: 'GM', change: 0.50, reason: 'Share buybacks supporting price; battery production improving.' }
      ]
    }
  ]
})

const toggleExpand = (theme) => {
  theme.isExpanded = !theme.isExpanded
}

const goToStockDetail = (symbol) => {
  router.push({ 
    name: 'StockAttributionDetail', 
    params: { id: symbol },
    query: { tab: 'price' }
  })
}

const toggleFollow = (theme) => {
  theme.isFollowed = !theme.isFollowed
  
  // If we are in 'following' tab and unfollow, we might want to remove it from the list visually
  // But for simplicity, we just toggle the state. In a real app, we would sync with backend.
  if (activeTab.value === 'following' && !theme.isFollowed) {
    // Optional: remove from list immediately
    const index = themesData.value.following.findIndex(t => t.id === theme.id)
    if (index > -1) themesData.value.following.splice(index, 1)
    
    // Also update official list if present
    const officialItem = themesData.value.official.find(t => t.id === theme.id)
    if (officialItem) officialItem.isFollowed = false
  } else if (activeTab.value === 'official' && theme.isFollowed) {
    // Add to following list if not present
    if (!themesData.value.following.find(t => t.id === theme.id)) {
      themesData.value.following.push({ ...theme, isFollowed: true })
    }
  } else if (activeTab.value === 'official' && !theme.isFollowed) {
     // Remove from following list if present
     const index = themesData.value.following.findIndex(t => t.id === theme.id)
     if (index > -1) themesData.value.following.splice(index, 1)
  }
}

const sortedThemes = computed(() => {
  const list = [...(themesData.value[activeTab.value] || [])]
  
  if (sortBy.value === 'heat') {
    return list.sort((a, b) => b.heatScore - a.heatScore)
  } else if (sortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  }
  
  return list
})

const groupedThemes = computed(() => {
  if (sortBy.value !== 'time') return {}
  
  const groups = {
    'Today': [],
    'Yesterday': [],
    'Earlier this week': [],
    'Last week': [],
    'Older': []
  }
  
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const yesterday = today - 24 * 60 * 60 * 1000
  const weekStart = today - 7 * 24 * 60 * 60 * 1000
  
  sortedThemes.value.forEach(theme => {
    if (theme.timestamp >= today) {
      groups['Today'].push(theme)
    } else if (theme.timestamp >= yesterday) {
      groups['Yesterday'].push(theme)
    } else if (theme.timestamp >= weekStart) {
      groups['Earlier this week'].push(theme)
    } else {
      groups['Older'].push(theme)
    }
  })
  
  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) delete groups[key]
  })
  
  return groups
})
</script>