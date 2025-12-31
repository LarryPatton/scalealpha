<template>
  <div class="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4" @click.self="$emit('close')">
    <!-- Backdrop -->
    <div class="absolute inset-0 backdrop-blur-sm transition-opacity" :class="isDark ? 'bg-black/80' : 'bg-black/50'"></div>

    <!-- Modal Content -->
    <div 
      class="relative w-full max-w-lg border rounded-xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
      :style="{ 
        backgroundColor: tokens.colors.background.elevated,
        borderColor: tokens.colors.border.strong
      }"
    >
      
      <!-- Header -->
      <div 
        class="px-6 py-4 border-b flex justify-between items-center shrink-0"
        :style="{ 
          backgroundColor: tokens.colors.background.base,
          borderColor: tokens.colors.border.default
        }"
      >
        <h3 class="text-lg font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <span class="w-1 h-5 bg-blue-500 rounded-full"></span>
          {{ $t('nav.watchlist') }}
        </h3>
        <button 
          @click="$emit('close')" 
          class="transition-colors"
          :style="{ color: tokens.colors.text.muted }"
          :class="isDark ? 'hover:text-white' : 'hover:text-gray-900'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="p-6 pb-2 shrink-0">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              class="h-5 w-5 group-focus-within:text-blue-500 transition-colors" 
              :style="{ color: tokens.colors.text.muted }"
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
            class="block w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
            :style="{
              backgroundColor: tokens.colors.background.base,
              borderColor: tokens.colors.border.strong,
              color: tokens.colors.text.primary
            }"
            :class="isDark ? 'placeholder-gray-500' : 'placeholder-gray-400'"
            placeholder="搜索股票代码添加关注..." 
            autofocus
          />
        </div>
      </div>

      <!-- List Section Title -->
      <div 
        class="px-6 py-2 text-xs font-bold uppercase tracking-wider shrink-0 flex justify-between items-center"
        :style="{ color: tokens.colors.text.muted }"
      >
        <span>{{ searchQuery ? '搜索结果' : '已关注列表' }}</span>
        <span 
          v-if="!searchQuery" 
          class="text-[10px] px-2 py-0.5 rounded"
          :style="{ 
            backgroundColor: isDark ? '#222' : '#f1f5f9',
            color: tokens.colors.text.muted
          }"
        >{{ watchlist.length }}</span>
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
            class="flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer border border-transparent"
            :class="isDark ? 'hover:bg-[#1e1e1e] hover:border-[#333]' : 'hover:bg-gray-50 hover:border-gray-200'"
            @click="toggleWatch(stock)"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded flex items-center justify-center text-xs font-bold border transition-colors"
                :class="isDark ? 'group-hover:border-blue-500/30 group-hover:text-blue-400' : 'group-hover:border-blue-300 group-hover:text-blue-600'"
                :style="{
                  backgroundColor: isDark ? '#222' : '#f8fafc',
                  borderColor: tokens.colors.border.default,
                  color: tokens.colors.text.secondary
                }"
              >
                {{ stock.symbol[0] }}
              </div>
              <div>
                <div 
                  class="font-bold transition-colors"
                  :class="isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'"
                >{{ stock.symbol }}</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ stock.name }}</div>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <div class="text-sm font-medium" :style="{ color: tokens.colors.text.secondary }">${{ stock.price }}</div>
                <div class="text-xs font-medium" :class="stock.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'">
                  {{ stock.change }}
                </div>
              </div>
              
              <button 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border"
                :class="stock.added 
                  ? 'bg-blue-500/10 border-blue-500 text-blue-500 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500' 
                  : isDark 
                    ? 'bg-transparent border-[#333] text-gray-500 hover:border-blue-500 hover:text-blue-500'
                    : 'bg-transparent border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500'"
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
          <div 
            class="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
            :style="{ 
              backgroundColor: isDark ? '#1a1a1a' : '#f1f5f9',
              color: tokens.colors.text.muted
            }"
          >
            <svg v-if="searchQuery" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ searchQuery ? '未找到相关股票' : '暂无关注股票' }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div 
        class="px-6 py-3 border-t flex justify-between items-center text-xs shrink-0"
        :style="{ 
          backgroundColor: tokens.colors.background.base,
          borderColor: tokens.colors.border.default,
          color: tokens.colors.text.muted
        }"
      >
        <span>支持美股、港股、A股</span>
        <button 
          @click="$emit('close')" 
          class="transition-colors"
          :class="isDark ? 'hover:text-white' : 'hover:text-gray-900'"
        >ESC 关闭</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from 'vue-i18n'

const { tokens, isDark } = useTheme()
const { t } = useI18n()

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
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* List Transitions */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>