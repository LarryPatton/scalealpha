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
          <router-link to="/info/kanban" class="text-white font-bold border-b-2 border-blue-500 pb-0.5">横向看板 (Kanban)</router-link>
        </div>
      </div>
      <!-- Search & Profile (Simplified) -->
      <div class="flex items-center gap-4">
        <div class="w-8 h-8 rounded-full bg-gray-700"></div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col overflow-hidden">
      <div class="px-8 py-6 flex-shrink-0">
        <h1 class="text-2xl font-bold text-white mb-2">Market Themes <span class="text-blue-500">(Kanban Layout)</span></h1>
        <p class="text-gray-400 text-sm">横向看板布局，提供沉浸式阅读体验，类似报纸版面。</p>
      </div>

      <!-- Kanban Container -->
      <div class="flex-grow overflow-x-auto overflow-y-hidden px-8 pb-8 custom-scrollbar">
        <div class="flex gap-6 h-full">
          
          <!-- Theme Column -->
          <div v-for="theme in themes" :key="theme.id" class="w-[360px] flex-shrink-0 flex flex-col bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden hover:border-gray-500 transition-colors group h-full">
            
            <!-- Header (图2风格) -->
            <div class="p-5 border-b border-[#333] bg-[#222] flex-shrink-0">
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold px-2 py-0.5 rounded border" 
                    :class="theme.sentiment === 'Bullish' ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-red-900/30 text-red-400 border-red-900/50'">
                    {{ theme.sentiment }}
                  </span>
                  <span class="text-xs font-bold text-white">{{ theme.heat }}% Heat</span>
                </div>
                <button class="text-xs bg-[#333] hover:bg-[#444] text-white px-3 py-1 rounded border border-[#444] transition-colors">
                  + Follow
                </button>
              </div>
              
              <!-- Heat Bar -->
              <div class="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mb-4">
                <div class="h-full" 
                  :class="theme.sentiment === 'Bullish' ? 'bg-green-500' : 'bg-red-500'"
                  :style="{ width: theme.heat + '%' }"></div>
              </div>

              <h3 class="text-xl font-bold text-white leading-tight mb-2">{{ theme.title }}</h3>
              <p class="text-sm text-gray-400 line-clamp-3 leading-relaxed">{{ theme.desc }}</p>
            </div>

            <!-- List Items (图1风格) - Scrollable Area -->
            <div class="flex-grow overflow-y-auto custom-scrollbar-y divide-y divide-[#333]">
              <div v-for="item in theme.items" :key="item.id" class="p-4 flex gap-4 hover:bg-[#2a2a2a] transition-colors cursor-pointer group/item">
                <!-- Left Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-bold text-base text-gray-200 truncate">{{ item.title }}</span>
                    <span v-if="item.change" class="text-xs font-mono ml-2" :class="item.change > 0 ? 'text-green-400' : 'text-red-400'">
                      {{ item.change > 0 ? '+' : ''}}{{ item.change }}%
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 line-clamp-3 leading-relaxed group-hover/item:text-gray-400">
                    {{ item.desc }}
                  </p>
                </div>
                
                <!-- Right Image/Chart -->
                <div class="w-20 h-16 flex-shrink-0 bg-[#333] rounded overflow-hidden relative mt-1">
                  <img v-if="item.image" :src="item.image" class="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity" />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">
                    Chart
                  </div>
                </div>
              </div>
              
              <!-- Load More Placeholder -->
              <div class="p-4 text-center">
                <button class="text-xs text-gray-500 hover:text-white transition-colors w-full py-2 border border-dashed border-[#333] rounded hover:border-gray-500">
                  Load More Items...
                </button>
              </div>
            </div>

          </div>

          <!-- Add New Column Placeholder / Load More -->
          <div 
            @click="loadMoreColumns"
            class="w-[100px] flex-shrink-0 flex flex-col items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer border-l border-[#333] ml-2"
          >
            <div v-if="isLoading" class="flex flex-col items-center gap-2">
              <div class="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-xs text-gray-500">Loading...</span>
            </div>
            <div v-else class="flex flex-col items-center gap-2">
              <div class="w-12 h-12 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                <span class="text-2xl">+</span>
              </div>
              <span class="text-xs text-gray-500">Load More</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Mock Data Templates (Same as Waterfall for consistency)
const templates = [
  {
    title: 'AI Infrastructure Boom',
    sentiment: 'Bullish',
    desc: 'Enterprise AI adoption drives massive infrastructure investment across cloud and semiconductor sectors.',
    items: [
      { title: 'NVDA', change: 3.45, desc: 'Dominant market share in AI training GPUs.', image: 'https://placehold.co/100x80/1a4d2e/white?text=NVDA' },
      { title: 'AMD', change: 1.20, desc: 'Emerging as a strong second player with MI300 series.', image: 'https://placehold.co/100x80/1a4d2e/white?text=AMD' },
      { title: 'SMCI', change: -0.50, desc: 'Leading liquid cooling solutions for high-density racks.', image: 'https://placehold.co/100x80/4d1a1a/white?text=SMCI' }
    ]
  },
  {
    title: 'EV Market Price War',
    sentiment: 'Bearish',
    desc: 'Competition intensifies in the EV sector as traditional automakers ramp up production.',
    items: [
      { title: 'TSLA', change: -3.50, desc: 'Margin compression fears due to price cuts.', image: 'https://placehold.co/100x80/4d1a1a/white?text=TSLA' },
      { title: 'RIVN', change: -4.20, desc: 'Cash burn concerns; production ramp challenges.', image: 'https://placehold.co/100x80/4d1a1a/white?text=RIVN' },
      { title: 'Ford Cuts Production', change: null, desc: 'Ford reduces F-150 Lightning production targets.', image: 'https://placehold.co/100x80/222/white?text=News' }
    ]
  },
  {
    title: 'Cybersecurity Renaissance',
    sentiment: 'Bullish',
    desc: 'Rising threats fuel enterprise security spending surge.',
    items: [
      { title: 'CRWD', change: 1.85, desc: 'Platform consolidation thesis playing out.', image: 'https://placehold.co/100x80/1a4d2e/white?text=CRWD' },
      { title: 'PANW', change: 0.95, desc: 'Next-gen firewall demand remains robust.', image: 'https://placehold.co/100x80/1a4d2e/white?text=PANW' }
    ]
  },
  {
    title: 'Biotech Innovation',
    sentiment: 'Bullish',
    desc: 'New gene therapies and weight-loss drugs drive renewed interest.',
    items: [
      { title: 'LLY', change: 2.75, desc: 'Mounjaro sales beating expectations.', image: 'https://placehold.co/100x80/1a4d2e/white?text=LLY' },
      { title: 'NVO', change: 1.90, desc: 'Wegovy supply constraints easing.', image: 'https://placehold.co/100x80/1a4d2e/white?text=NVO' }
    ]
  },
  {
    title: 'Crypto Resurgence',
    sentiment: 'Bullish',
    desc: 'Bitcoin ETF approval expectations drive market sentiment.',
    items: [
      { title: 'COIN', change: 5.20, desc: 'Trading volume surge ahead of ETF decision.', image: 'https://placehold.co/100x80/1a4d2e/white?text=COIN' },
      { title: 'MSTR', change: 4.80, desc: 'Bitcoin holdings valuation increases.', image: 'https://placehold.co/100x80/1a4d2e/white?text=MSTR' }
    ]
  },
  {
    title: 'Semiconductor Cycle',
    sentiment: 'Neutral',
    desc: 'Memory chip market showing signs of bottoming out.',
    items: [
      { title: 'MU', change: 0.50, desc: 'Inventory levels normalizing.', image: 'https://placehold.co/100x80/333/white?text=MU' },
      { title: 'WDC', change: 1.10, desc: 'Merger talks with Kioxia progressing.', image: 'https://placehold.co/100x80/1a4d2e/white?text=WDC' }
    ]
  },
  {
    title: 'Renewable Energy Reset',
    sentiment: 'Bearish',
    desc: 'High interest rates weighing on project finance.',
    items: [
      { title: 'ENPH', change: -2.30, desc: 'Demand in Europe softening.', image: 'https://placehold.co/100x80/4d1a1a/white?text=ENPH' },
      { title: 'SEDG', change: -3.10, desc: 'Guidance cut due to inventory buildup.', image: 'https://placehold.co/100x80/4d1a1a/white?text=SEDG' }
    ]
  },
  {
    title: 'China Tech Rebound',
    sentiment: 'Bullish',
    desc: 'Valuations attractive as regulatory headwinds ease.',
    items: [
      { title: 'BABA', change: 2.50, desc: 'Cloud unit spin-off plans revisited.', image: 'https://placehold.co/100x80/1a4d2e/white?text=BABA' },
      { title: 'PDD', change: 4.20, desc: 'Temu international expansion exceeding targets.', image: 'https://placehold.co/100x80/1a4d2e/white?text=PDD' }
    ]
  }
]

const themes = ref([])
const isLoading = ref(false)

// Generate random themes based on templates
const generateMoreThemes = (count, startIndex) => {
  return Array.from({ length: count }).map((_, i) => {
    const template = templates[(startIndex + i) % templates.length]
    const id = startIndex + i + 1
    // Add some randomness to heat
    const heat = Math.floor(Math.random() * 40) + 50 // 50-90
    
    return {
      id,
      title: `${template.title} ${Math.floor(id / templates.length) > 0 ? '#' + (Math.floor(id / templates.length) + 1) : ''}`,
      sentiment: template.sentiment,
      heat,
      desc: template.desc,
      totalItems: template.items.length + Math.floor(Math.random() * 5),
      items: template.items.map((item, idx) => ({
        id: id * 100 + idx,
        ...item,
        // Randomize change slightly
        change: item.change ? parseFloat((item.change + (Math.random() - 0.5)).toFixed(2)) : null
      }))
    }
  })
}

// Load more columns (Horizontal)
const loadMoreColumns = async () => {
  if (isLoading.value) return
  isLoading.value = true
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600))
  
  const newThemes = generateMoreThemes(5, themes.value.length)
  themes.value.push(...newThemes)
  
  isLoading.value = false
}

onMounted(() => {
  // Load initial batch (Enough to scroll horizontally)
  themes.value = generateMoreThemes(15, 0)
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