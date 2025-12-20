<template>
  <div class="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" @click.self="$emit('close')">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"></div>

    <!-- Modal Content -->
    <div class="relative w-full max-w-lg bg-[#121212] border border-[#333] rounded-xl glow-info-xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
      
      <!-- Header -->
      <div class="px-6 py-4 border-b border-[#222] flex justify-between items-center bg-[#1a1a1a] shrink-0">
        <h3 class="text-lg font-bold text-white flex items-center gap-2">
          <span class="w-1 h-5 bg-blue-500 rounded-full glow-info-sm"></span>
          我的关注
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="p-6 pb-2 shrink-0">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            v-model="searchQuery"
            type="text" 
            class="block w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
            placeholder="搜索股票代码添加关注..." 
            autofocus
          />
        </div>
      </div>

      <!-- List Section Title -->
      <div class="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 flex justify-between items-center">
        <span>{{ searchQuery ? '搜索结果' : '已关注列表' }}</span>
        <span v-if="!searchQuery" class="text-[10px] bg-[#222] px-2 py-0.5 rounded text-gray-400">{{ watchlist.length }}</span>
      </div>

      <!-- List Content -->
      <div class="px-2 pb-2 overflow-y-auto custom-scrollbar flex-1 min-h-0">
        <TransitionGroup 
          name="list" 
          tag="div" 
          class="space-y-1"
        >
          <div 
            v-for="stock in displayList" 
            :key="stock.symbol"
            class="flex items-center justify-between p-3 rounded-lg hover:bg-[#1e1e1e] transition-colors group cursor-pointer border border-transparent hover:border-[#333]"
            @click="toggleWatch(stock)"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333] group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                {{ stock.symbol[0] }}
              </div>
              <div>
                <div class="font-bold text-gray-200 group-hover:text-white">{{ stock.symbol }}</div>
                <div class="text-xs text-gray-500">{{ stock.name }}</div>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <div class="text-sm font-medium text-gray-300">${{ stock.price }}</div>
                <div class="text-xs font-medium" :class="stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'">
                  {{ stock.change }}
                </div>
              </div>
              
              <button 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border"
                :class="stock.added 
                  ? 'bg-blue-500/10 border-blue-500 text-blue-500 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500' 
                  : 'bg-transparent border-[#333] text-gray-500 hover:border-blue-500 hover:text-blue-500'"
                @click.stop="toggleWatch(stock)"
                :title="stock.added ? '取消关注' : '添加关注'"
              >
                <svg v-if="!stock.added" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
        </TransitionGroup>
        
        <!-- Empty State -->
        <div v-if="displayList.length === 0" class="py-12 text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] text-gray-600 mb-3">
            <svg v-if="searchQuery" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <p class="text-gray-500 text-sm">{{ searchQuery ? '未找到相关股票' : '暂无关注股票' }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-3 bg-[#1a1a1a] border-t border-[#222] flex justify-between items-center text-xs text-gray-500 shrink-0">
        <span>支持美股、港股、A股</span>
        <button @click="$emit('close')" class="hover:text-white transition-colors">ESC 关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const searchQuery = ref('')

// Mock Data (All available stocks)
const allStocks = ref([
  { symbol: 'AAPL', name: 'Apple Inc.', price: '182.50', change: '+1.2%', added: false },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '240.30', change: '-0.5%', added: true },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '460.10', change: '+2.8%', added: false },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '370.20', change: '+0.9%', added: false },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: '110.40', change: '+1.5%', added: false },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '138.20', change: '-0.2%', added: false },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: '145.80', change: '+1.1%', added: true },
  { symbol: 'META', name: 'Meta Platforms', price: '320.50', change: '+0.8%', added: false },
  { symbol: 'BABA', name: 'Alibaba Group', price: '75.40', change: '-1.5%', added: false },
  { symbol: 'COIN', name: 'Coinbase Global', price: '150.20', change: '+5.2%', added: true },
])

// Computed: Watchlist (Only added stocks)
const watchlist = computed(() => allStocks.value.filter(s => s.added))

// Computed: Search Results
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  const query = searchQuery.value.toLowerCase()
  return allStocks.value.filter(s => 
    s.symbol.toLowerCase().includes(query) || 
    s.name.toLowerCase().includes(query)
  )
})

// Computed: Display List (Either Search Results OR Watchlist)
const displayList = computed(() => {
  if (searchQuery.value) {
    return searchResults.value
  }
  return watchlist.value
})

const toggleWatch = (stock) => {
  stock.added = !stock.added
  // Here you would typically emit an event or call an API to update the user's watchlist
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* List Transitions */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  width: 100%; /* Ensure width is maintained during leave */
}
</style>