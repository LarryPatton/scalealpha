<template>
  <div class="bg-[#0f0f0f] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-6">
          <router-link to="/info" class="text-gray-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </router-link>
          <h1 class="text-2xl font-bold text-white">📊 所有事件分析 (All Event Analysis)</h1>
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
          <div v-for="(group, groupName) in groupedAttributions" :key="groupName">
            <div class="flex items-center gap-4 mb-4 border-b border-[#333] pb-2">
              <h2 class="text-lg font-bold text-white">{{ groupName }}</h2>
              <span class="text-sm text-gray-500">{{ group.length }} events</span>
            </div>
            <div class="space-y-4">
              <div 
                v-for="item in group" 
                :key="item.id" 
                @click="goToDetail(item)"
                class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer"
              >
                <div class="flex flex-col md:flex-row gap-6">
                  <!-- Left: Symbol & Price -->
                  <div class="md:w-40 flex-shrink-0 flex flex-col justify-center">
                    <div class="flex items-center gap-3 mb-2">
                      <div class="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center text-sm font-bold text-white border border-[#333]">{{ item.symbol[0] }}</div>
                      <div>
                        <div class="font-bold text-white text-lg leading-none">{{ item.symbol }}</div>
                        <div class="text-xs text-gray-500 mt-0.5">{{ item.name }}</div>
                      </div>
                    </div>
                    <div class="flex items-baseline gap-2">
                      <div class="text-lg font-bold text-white">${{ item.price }}</div>
                      <div class="text-sm font-medium" :class="item.change >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
                      </div>
                    </div>
                  </div>

                  <!-- Middle: Content -->
                  <div class="flex-1 min-w-0 border-l border-[#333] pl-6 md:border-l-0 md:pl-0">
                    <p class="text-sm text-gray-300 leading-relaxed mb-3 pr-20">{{ item.reason }}</p>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tag in item.tags" :key="tag" class="text-xs bg-[#2a2a2a] text-gray-500 px-2 py-0.5 rounded border border-[#333]">{{ tag }}</span>
                    </div>
                  </div>

                  <!-- Right: Meta -->
                  <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                    <div class="text-xs text-gray-500">{{ item.timeAgo }}</div>
                    <div class="flex items-center gap-1 text-xs font-medium" 
                      :class="{
                        'text-red-400': item.heat === 'High',
                        'text-orange-400': item.heat === 'Med',
                        'text-blue-400': item.heat === 'Low'
                      }">
                      <span>🔥</span> {{ item.heat }} Heat
                    </div>
                  </div>
                </div>

                <!-- Follow Button -->
                <button 
                  @click.stop="toggleFollow(item)"
                  class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                  :class="item.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
                >
                  {{ item.isFollowed ? '✓ 已关注' : '+ 关注' }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="space-y-4">
            <div 
              v-for="item in sortedAttributions" 
              :key="item.id" 
              @click="goToDetail(item)"
              class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <!-- Left: Symbol & Price -->
                <div class="md:w-40 flex-shrink-0 flex flex-col justify-center">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center text-sm font-bold text-white border border-[#333]">{{ item.symbol[0] }}</div>
                    <div>
                      <div class="font-bold text-white text-lg leading-none">{{ item.symbol }}</div>
                      <div class="text-xs text-gray-500 mt-0.5">{{ item.name }}</div>
                    </div>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <div class="text-lg font-bold text-white">${{ item.price }}</div>
                    <div class="text-sm font-medium" :class="item.change >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
                    </div>
                  </div>
                </div>

                <!-- Middle: Content -->
                <div class="flex-1 min-w-0 border-l border-[#333] pl-6 md:border-l-0 md:pl-0">
                  <p class="text-sm text-gray-300 leading-relaxed mb-3 pr-20">{{ item.reason }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in item.tags" :key="tag" class="text-xs bg-[#2a2a2a] text-gray-500 px-2 py-0.5 rounded border border-[#333]">{{ tag }}</span>
                  </div>
                </div>

                <!-- Right: Meta -->
                <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                  <div class="text-xs text-gray-500">{{ item.timeAgo }}</div>
                  <div class="flex items-center gap-1 text-xs font-medium" 
                    :class="{
                      'text-red-400': item.heat === 'High',
                      'text-orange-400': item.heat === 'Med',
                      'text-blue-400': item.heat === 'Low'
                    }">
                    <span>🔥</span> {{ item.heat }} Heat
                  </div>
                </div>
              </div>

              <!-- Follow Button -->
              <button 
                @click.stop="toggleFollow(item)"
                class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                :class="item.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
              >
                {{ item.isFollowed ? '✓ 已关注' : '+ 关注' }}
              </button>
            </div>
          </div>
        </template>
        
        <!-- Empty State -->
        <div v-if="sortedAttributions.length === 0 && Object.keys(groupedAttributions).length === 0" class="text-center py-12 text-gray-500">
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
const attributionData = ref({
  official: [
    { id: 1, symbol: 'NVDA', name: 'NVIDIA Corp', price: '485.09', change: -3.45, reason: '芯片发布推迟消息引发市场担忧，多家投行下调目标价，数据中心业务营收预计将略微不及预期。', tags: ['Stock', '芯片', '财报前瞻'], timeAgo: '10 mins ago', timestamp: Date.now() - 10 * 60 * 1000, heat: 'High', heatScore: 95, isFollowed: false },
    { id: 2, symbol: 'TSLA', name: 'Tesla Inc', price: '235.45', change: 1.80, reason: '特斯拉自动驾驶软件问题宣布召回部分车辆，股价承压，分析师对Q4交付量持谨慎态度。', tags: ['Stock', '新能源', '监管'], timeAgo: '1 hour ago', timestamp: Date.now() - 60 * 60 * 1000, heat: 'High', heatScore: 88, isFollowed: false },
    { id: 3, symbol: 'MSFT', name: 'Microsoft', price: '378.25', change: -2.15, reason: 'Azure云服务营收增速超预期，AI产品Copilot商业化进展顺利，微软成为AI时代最大受益者之一。', tags: ['Stock', '云计算', 'AI应用'], timeAgo: '3 hours ago', timestamp: Date.now() - 3 * 60 * 60 * 1000, heat: 'Med', heatScore: 75, isFollowed: false },
    { id: 4, symbol: 'AAPL', name: 'Apple Inc', price: '188.50', change: -0.95, reason: 'iPhone 15系列销量稳健，中国市场表现强劲，服务业务持续高增长，毛利率提升明显。', tags: ['Stock', '消费电子', '财报'], timeAgo: '6 hours ago', timestamp: Date.now() - 6 * 60 * 60 * 1000, heat: 'Low', heatScore: 50, isFollowed: false },
    { id: 6, symbol: 'AMZN', name: 'Amazon.com', price: '152.90', change: 1.35, reason: 'AWS cloud growth accelerates, driven by new AI features and enterprise adoption.', tags: ['Stock', 'Cloud', 'E-commerce'], timeAgo: 'Yesterday', timestamp: Date.now() - 26 * 60 * 60 * 1000, heat: 'Med', heatScore: 68, isFollowed: false },
    { id: 7, symbol: 'AMD', name: 'Advanced Micro Devices', price: '115.40', change: 2.85, reason: 'New MI300 chip launch receives positive initial reviews, challenging Nvidia\'s dominance.', tags: ['Stock', 'Semiconductor', 'AI'], timeAgo: '2 days ago', timestamp: Date.now() - 50 * 60 * 60 * 1000, heat: 'High', heatScore: 82, isFollowed: false },
    { id: 8, symbol: 'NFLX', name: 'Netflix', price: '475.00', change: -0.50, reason: 'Subscriber growth slows in Q4, but ad-supported tier shows promise for future revenue.', tags: ['Stock', 'Streaming', 'Media'], timeAgo: '3 days ago', timestamp: Date.now() - 75 * 60 * 60 * 1000, heat: 'Low', heatScore: 45, isFollowed: false }
  ],
  following: [
    { id: 5, symbol: 'GOOGL', name: 'Alphabet', price: '142.30', change: -1.75, reason: 'Google搜索广告收入恢复增长，Bard AI进展超预期，云业务盈利能力持续改善。', tags: ['Stock', '互联网', 'AI'], timeAgo: '2 hours ago', timestamp: Date.now() - 2 * 60 * 60 * 1000, heat: 'Med', heatScore: 65, isFollowed: true }
  ]
})

const toggleFollow = (item) => {
  item.isFollowed = !item.isFollowed
  
  if (activeTab.value === 'following' && !item.isFollowed) {
    const index = attributionData.value.following.findIndex(i => i.id === item.id)
    if (index > -1) attributionData.value.following.splice(index, 1)
    
    const officialItem = attributionData.value.official.find(i => i.id === item.id)
    if (officialItem) officialItem.isFollowed = false
  } else if (activeTab.value === 'official' && item.isFollowed) {
    if (!attributionData.value.following.find(i => i.id === item.id)) {
      attributionData.value.following.push({ ...item, isFollowed: true })
    }
  } else if (activeTab.value === 'official' && !item.isFollowed) {
     const index = attributionData.value.following.findIndex(i => i.id === item.id)
     if (index > -1) attributionData.value.following.splice(index, 1)
  }
}

const sortedAttributions = computed(() => {
  const list = [...(attributionData.value[activeTab.value] || [])]
  
  if (sortBy.value === 'heat') {
    return list.sort((a, b) => b.heatScore - a.heatScore)
  } else if (sortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  }
  
  return list
})

const groupedAttributions = computed(() => {
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
  
  sortedAttributions.value.forEach(item => {
    if (item.timestamp >= today) {
      groups['Today'].push(item)
    } else if (item.timestamp >= yesterday) {
      groups['Yesterday'].push(item)
    } else if (item.timestamp >= weekStart) {
      groups['Earlier this week'].push(item)
    } else {
      groups['Older'].push(item)
    }
  })
  
  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) delete groups[key]
  })
  
  return groups
})

const goToDetail = (item) => {
  router.push({ name: 'StockAttributionDetail', params: { id: item.symbol } })
}
</script>