<template>
  <div class="bg-[#0f0f0f] min-h-screen flex">
    <!-- Sidebar Navigation -->
    <div class="w-64 bg-[#1a1a1a] border-r border-[#333] flex flex-col fixed h-full overflow-y-auto">
      <div class="p-6">
        <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">My Groups</h2>
        <nav class="space-y-1">
          <button 
            v-for="group in groups" 
            :key="group.id"
            @click="activeGroup = group.id"
            class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="activeGroup === group.id ? 'bg-blue-900/20 text-blue-400' : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'"
          >
            <span class="mr-3 text-lg">{{ group.icon }}</span>
            {{ group.name }}
          </button>
        </nav>
        
        <button @click="showNewGroupModal = true" class="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-white transition-colors">
          <span class="mr-3 text-lg">+</span> 更多分组
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 ml-64 p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white flex items-center gap-3 mb-6">
          <span class="text-2xl">{{ currentGroup.icon }}</span>
          {{ currentGroup.name }}
          <span class="text-sm font-normal text-gray-500 ml-2">({{ filteredOpportunities.length }})</span>
        </h1>

        <!-- Filters & Sort -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#333] pb-4">
          <!-- Filters -->
          <div class="flex items-center gap-2">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
              :class="activeFilter === filter.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white'"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">Sort by:</span>
            <select v-model="sortBy" class="bg-[#1a1a1a] border border-[#333] text-gray-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500">
              <option value="time">生成时间</option>
              <option value="name">名称</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Opportunities List -->
      <div class="space-y-4">
        <div v-for="opp in sortedOpportunities" :key="opp.id" @click="navigateToStrategy(opp)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-blue-500 transition-colors group cursor-pointer">
          <div class="flex items-start gap-4">
            <!-- Left: Symbol & Grade -->
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="text-lg font-bold text-white">{{ opp.symbol }}</div>
              <div class="px-2 py-0.5 rounded text-xs font-bold" 
                :class="{
                  'bg-green-900/30 text-green-400 border border-green-900/50': opp.grade === 'A' || opp.grade === 'A+',
                  'bg-blue-900/30 text-blue-400 border border-blue-900/50': opp.grade === 'B',
                  'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50': opp.grade === 'C'
                }">
                {{ opp.grade }}
              </div>
            </div>

            <!-- Middle: Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span v-if="opp.isNew" class="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">NEW</span>
                <h3 class="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors">{{ opp.title }}</h3>
              </div>
              <div class="text-sm text-gray-400 space-y-1 mb-2">
                <p class="line-clamp-2">{{ opp.description }}</p>
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>{{ opp.timeAgo }}</span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span> {{ opp.strategy }}
                </span>
              </div>
            </div>

            <!-- Right: Direction & Duration -->
            <div class="flex flex-col items-end gap-2 min-w-[120px] text-right">
              <div class="flex items-center gap-1 font-bold text-sm"
                :class="{
                  'text-green-500': opp.direction === 'LONG',
                  'text-red-500': opp.direction === 'SHORT',
                  'text-gray-400': opp.direction === 'WAIT'
                }">
                <span v-if="opp.direction === 'LONG'">↑</span>
                <span v-if="opp.direction === 'SHORT'">↓</span>
                {{ opp.direction }}
              </div>
              <div class="text-xs text-gray-500 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ opp.duration }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Group Modal -->
    <div v-if="showNewGroupModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-full max-w-md p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-white">新建分组</h3>
          <button @click="closeNewGroupModal" class="text-gray-500 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="space-y-4 mb-6">
          <!-- Group Name Input -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">分组名称</label>
            <input 
              v-model="newGroupName" 
              type="text" 
              placeholder="例如：科技股观察"
              class="w-full px-3 py-2 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <!-- Icon Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">选择图标</label>
            <div class="grid grid-cols-6 gap-2">
              <button 
                v-for="icon in availableIcons" 
                :key="icon"
                @click="newGroupIcon = icon"
                class="w-10 h-10 flex items-center justify-center text-xl rounded-lg border transition-all"
                :class="newGroupIcon === icon ? 'bg-blue-600 border-blue-600' : 'bg-[#0f0f0f] border-[#333] hover:border-gray-500'"
              >
                {{ icon }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button @click="closeNewGroupModal" class="flex-1 px-4 py-2 rounded-lg border border-[#333] text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
            取消
          </button>
          <button @click="createNewGroup" :disabled="!newGroupName.trim()" class="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            创建分组
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- State ---
const activeGroup = ref('official')
const activeFilter = ref('all')
const sortBy = ref('time')

// New Group Modal State
const showNewGroupModal = ref(false)
const newGroupName = ref('')
const newGroupIcon = ref('📁')

const availableIcons = ['📁', '⭐', '🔥', '💎', '🚀', '📊', '💰', '🎯', '⚡', '🌟', '💼', '🔔']

// --- Data ---
const groups = ref([
  { id: 'official', name: '官方推荐', icon: '📂' },
  { id: 'generated', name: '我的生成', icon: '👤' }
])

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Long', value: 'long' },
  { label: 'Short', value: 'short' },
  { label: 'Grade A+', value: 'grade_a' }
]

// Mock Opportunities Data
const allOpportunities = [
  { 
    id: 1, 
    symbol: 'GOOGL', 
    grade: 'A', 
    title: 'Google AI Infrastructure & Gemini Super-Cycle', 
    description: 'ACT 1: 市场短期流动性波动将GOOGL推回$317水平，部分投资者仍担忧OpenAI Shopping的竞争威胁。ACT 2: 然而，我们看到$315支撑位的强劲买盘验证了机构的吸筹行为。Meta洽购...', 
    direction: 'LONG', 
    duration: 'Short to Medium-term (2-8 weeks)', 
    strategy: 'AI Infrastructure',
    timeAgo: '2 hours ago',
    timestamp: 1701420000000,
    isNew: true,
    groupIds: ['official', 'watchlist']
  },
  { 
    id: 2, 
    symbol: 'JNJ', 
    grade: 'B', 
    title: '强生防御性轮动与超买回调布局', 
    description: '第一幕: 市场目前因宏观避险情绪升温及Q3财报强劲 (营收$24B, EPS $2.80) [cite_index=74]，将JNJ推升至历史高位$207附近。分析师纷纷上调目标价至$215-$230，散户情绪高涨。第二幕: 然而...', 
    direction: 'WAIT', 
    duration: 'Medium-term (1-3 months)', 
    strategy: 'Defensive Rotation',
    timeAgo: '5 hours ago',
    timestamp: 1701410000000,
    isNew: true,
    groupIds: ['official']
  },
  { 
    id: 3, 
    symbol: 'BKNG', 
    grade: 'A', 
    title: 'BKNG 假日AI反弹策略 (执行阶段)', 
    description: '第一幕: 市场此前的担忧已被价格行动否定。股价已成功突破$4,862的关键阻力位，当前交易于$4,909附近，确认了技术面反转。第二幕: 基本面催化剂正在加速发酵。感恩节8200万人的创纪录出行预测...', 
    direction: 'LONG', 
    duration: 'Short-term (1-3 weeks)', 
    strategy: 'Seasonal Rebound',
    timeAgo: '1 day ago',
    timestamp: 1701350000000,
    isNew: false,
    groupIds: ['official', 'short_term']
  },
  { 
    id: 4, 
    symbol: 'TEL', 
    grade: 'A', 
    title: 'TE Connectivity AI 错杀反转策略', 
    description: '第一幕: 市场此前的担忧（内幕减持、投资者日后的获利回吐）已被价格行为证伪。尽管Truist维持持有评级，但股价并未受阻，反而稳步攀升至$225上方，证明市场已消化利空。第二幕: 多头逻辑正在兑现。...', 
    direction: 'WAIT', 
    duration: 'Short-term (1-2 weeks)', 
    strategy: 'Reversal',
    timeAgo: '2 days ago',
    timestamp: 1701250000000,
    isNew: false,
    groupIds: ['official']
  },
  { 
    id: 5, 
    symbol: 'TSLA', 
    grade: 'C', 
    title: '特斯拉短期回调压力测试', 
    description: '技术指标显示超买，且面临交付数据不及预期的风险，短期存在回调需求。建议关注$230附近的支撑力度。', 
    direction: 'SHORT', 
    duration: 'Short-term (1-2 weeks)', 
    strategy: 'Technical Pullback',
    timeAgo: '1 hour ago',
    timestamp: 1701425000000,
    isNew: true,
    groupIds: ['generated', 'short_term']
  }
]

// --- Computed ---

const currentGroup = computed(() => {
  return groups.value.find(g => g.id === activeGroup.value) || groups.value[0]
})

const filteredOpportunities = computed(() => {
  // 1. Filter by Group
  let list = allOpportunities.filter(opp => opp.groupIds.includes(activeGroup.value))
  
  // 2. Filter by Type/Grade
  if (activeFilter.value === 'long') {
    list = list.filter(opp => opp.direction === 'LONG' || opp.direction === 'WAIT') // Assuming WAIT is often bullish bias or neutral
  } else if (activeFilter.value === 'short') {
    list = list.filter(opp => opp.direction === 'SHORT')
  } else if (activeFilter.value === 'grade_a') {
    list = list.filter(opp => opp.grade === 'A' || opp.grade === 'A+')
  }
  
  return list
})

const sortedOpportunities = computed(() => {
  const list = [...filteredOpportunities.value]
  
  if (sortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  } else if (sortBy.value === 'name') {
    return list.sort((a, b) => a.symbol.localeCompare(b.symbol))
  }
  
  return list
})

// --- Methods ---
const navigateToStrategy = (opportunity) => {
  // 跳转到个股详情页，自动打开策略Tab并显示该策略详情
  router.push({
    path: `/stock-attribution/${opportunity.symbol}`,
    query: {
      tab: 'strategies',
      strategyId: opportunity.id
    }
  })
}

const closeNewGroupModal = () => {
  showNewGroupModal.value = false
  newGroupName.value = ''
  newGroupIcon.value = '📁'
}

const createNewGroup = () => {
  if (!newGroupName.value.trim()) return
  
  // Generate unique ID
  const newId = 'group_' + Date.now()
  
  // Add new group
  groups.value.push({
    id: newId,
    name: newGroupName.value.trim(),
    icon: newGroupIcon.value
  })
  
  // Switch to new group
  activeGroup.value = newId
  
  // Close modal
  closeNewGroupModal()
}

</script>
