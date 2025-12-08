<template>
  <div class="min-h-screen bg-[#0f0f0f] py-12 px-4 sm:px-6 lg:px-8 text-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold mb-4">主题宏观可视化方案 (Theme Macro Viz)</h1>
        <p class="text-gray-400">用于在 Theme Card 中展示该主题下相关个股的整体涨跌分布。</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        <!-- 1. Heatmap Grid (热力网格) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 1: 热力网格 (Heatmap Grid)</h3>
          <div class="mb-2 text-xs text-gray-500">紧凑展示所有成分股的涨跌状态</div>
          
          <!-- Viz Container -->
          <div class="flex flex-wrap gap-1 w-full">
            <div 
              v-for="(stock, i) in mockStocks" 
              :key="i"
              class="h-6 flex-grow rounded-sm min-w-[1.5rem] transition-all hover:opacity-80 cursor-pointer relative group"
              :class="getColorClass(stock.change)"
              :style="{ flexBasis: (Math.abs(stock.change) * 10) + '%' }"
            >
              <!-- Tooltip -->
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-xs px-2 py-1 rounded whitespace-nowrap z-10 border border-[#333]">
                {{ stock.symbol }}: {{ stock.change }}%
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Sentiment Bar (情绪条) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 2: 情绪条 (Sentiment Bar)</h3>
          <div class="mb-2 text-xs text-gray-500">上涨 vs 下跌 比例条</div>
          
          <div class="h-4 w-full flex rounded-full overflow-hidden bg-[#222]">
            <div class="h-full bg-green-500" :style="{ width: upRatio + '%' }"></div>
            <div class="h-full bg-red-500" :style="{ width: downRatio + '%' }"></div>
          </div>
          <div class="flex justify-between text-xs mt-2 font-mono">
            <span class="text-green-400">{{ upCount }} Up</span>
            <span class="text-red-400">{{ downCount }} Down</span>
          </div>
        </div>

        <!-- 3. Mini Spark-Bars (迷你柱状图) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 3: 迷你柱状图 (Spark-Bars)</h3>
          <div class="mb-2 text-xs text-gray-500">每个个股的涨跌幅柱状排列</div>
          
          <div class="h-16 flex items-center gap-[2px] items-end border-b border-[#333] pb-px">
            <div 
              v-for="(stock, i) in mockStocks" 
              :key="i"
              class="flex-1 rounded-t-sm hover:bg-white transition-colors relative group"
              :class="stock.change >= 0 ? 'bg-green-500/80' : 'bg-red-500/80'"
              :style="{ height: Math.min(Math.abs(stock.change) * 10 + 10, 100) + '%' }"
            >
               <!-- Tooltip -->
               <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-xs px-2 py-1 rounded whitespace-nowrap z-10 border border-[#333]">
                {{ stock.symbol }}
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Bubble Row (气泡行) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 4: 气泡行 (Bubble Row)</h3>
          <div class="mb-2 text-xs text-gray-500">大小代表涨跌幅绝对值</div>
          
          <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <div 
              v-for="(stock, i) in sortedStocks" 
              :key="i"
              class="rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-black/70 border border-white/10"
              :class="stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'"
              :style="{ 
                width: (20 + Math.abs(stock.change) * 5) + 'px', 
                height: (20 + Math.abs(stock.change) * 5) + 'px',
                opacity: 0.7 + Math.min(Math.abs(stock.change)/10, 0.3)
              }"
            >
              {{ stock.symbol[0] }}
            </div>
          </div>
        </div>

        <!-- 5. Distribution Curve (分布曲线) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 5: 分布曲线 (Distribution)</h3>
          <div class="mb-2 text-xs text-gray-500">涨跌幅分布密度图 (SVG模拟)</div>
          
          <div class="relative h-16 w-full bg-[#222] rounded-lg overflow-hidden">
            <!-- Center Line -->
            <div class="absolute left-1/2 top-0 bottom-0 w-px bg-[#444] border-l border-dashed border-gray-600"></div>
            
            <!-- Mock Curve (Simplified) -->
            <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,100 C20,100 30,80 40,60 S50,20 60,40 S80,80 100,100 Z" fill="url(#grad1)" opacity="0.6" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#222;stop-opacity:0" />
                  <stop offset="100%" style="stop-color:#22c55e;stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
            
            <div class="absolute bottom-1 left-2 text-[10px] text-red-400">-5%</div>
            <div class="absolute bottom-1 right-2 text-[10px] text-green-400">+5%</div>
          </div>
        </div>

        <!-- 6. Win/Loss Pills (胜负胶囊) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 6: 胜负胶囊 (Win/Loss Pills)</h3>
          <div class="mb-2 text-xs text-gray-500">极简的胜负比例展示</div>
          
          <div class="flex gap-2">
            <div class="flex-1 bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span class="text-2xl font-bold text-green-400">{{ upCount }}</span>
              <span class="text-[10px] uppercase text-green-500/70 tracking-wider">Gainers</span>
            </div>
            <div class="flex-1 bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex flex-col items-center justify-center">
              <span class="text-2xl font-bold text-red-400">{{ downCount }}</span>
              <span class="text-[10px] uppercase text-red-500/70 tracking-wider">Losers</span>
            </div>
          </div>
        </div>

        <!-- 7. Honeycomb (蜂巢图) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 7: 蜂巢图 (Honeycomb)</h3>
          <div class="mb-2 text-xs text-gray-500">六边形紧凑排列</div>
          
          <div class="flex flex-wrap gap-1 justify-center">
            <div 
              v-for="(stock, i) in mockStocks" 
              :key="i"
              class="w-6 h-7 bg-gray-700 relative flex items-center justify-center text-[8px] font-bold text-black/80"
              :class="stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'"
              style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); margin-bottom: -4px;"
            >
              {{ stock.symbol[0] }}
            </div>
          </div>
        </div>

        <!-- 8. Scatter Strip (散点带) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 8: 散点带 (Scatter Strip)</h3>
          <div class="mb-2 text-xs text-gray-500">一维散点图，位置代表涨跌幅</div>
          
          <div class="relative h-12 w-full flex items-center">
            <!-- Axis -->
            <div class="absolute left-0 right-0 h-px bg-[#444] top-1/2"></div>
            <div class="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-[#444]"></div>
            
            <!-- Dots -->
            <div 
              v-for="(stock, i) in mockStocks" 
              :key="i"
              class="absolute w-3 h-3 rounded-full border border-black/50 shadow-sm top-1/2 -translate-y-1/2 transition-all hover:scale-150 hover:z-10"
              :class="stock.change >= 0 ? 'bg-green-500' : 'bg-red-500'"
              :style="{ left: (50 + Math.max(-45, Math.min(45, stock.change * 10))) + '%' }"
              :title="`${stock.symbol}: ${stock.change}%`"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>Bearish</span>
            <span>Neutral</span>
            <span>Bullish</span>
          </div>
        </div>

        <!-- 9. Mini Treemap (迷你树图) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 9: 迷你树图 (Mini Treemap)</h3>
          <div class="mb-2 text-xs text-gray-500">CSS Grid 模拟树图布局</div>
          
          <div class="grid grid-cols-4 grid-rows-3 gap-px h-24 rounded-lg overflow-hidden bg-[#333]">
            <div 
              v-for="(stock, i) in sortedByAbsChange.slice(0, 7)" 
              :key="i"
              class="flex items-center justify-center text-[10px] font-bold text-black/60 relative group"
              :class="[
                stock.change >= 0 ? 'bg-green-500' : 'bg-red-500',
                i === 0 ? 'col-span-2 row-span-2' : '',
                i === 1 ? 'col-span-2 row-span-1' : '',
                i > 1 ? 'col-span-1 row-span-1' : ''
              ]"
            >
              {{ stock.symbol }}
              <span class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></span>
            </div>
            <!-- Remaining count -->
            <div class="bg-[#333] text-gray-400 text-[10px] flex items-center justify-center col-span-1 row-span-1">
              +{{ mockStocks.length - 7 }}
            </div>
          </div>
        </div>

        <!-- 10. Gauge Meter (仪表盘) -->
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-sm font-bold text-gray-400 uppercase mb-4">方案 10: 仪表盘 (Gauge)</h3>
          <div class="mb-2 text-xs text-gray-500">整体情绪指数</div>
          
          <div class="relative h-24 overflow-hidden flex justify-center">
             <!-- Semi Circle -->
             <div class="w-40 h-20 bg-[#222] rounded-t-full border-t-8 border-l-8 border-r-8 border-[#333] relative overflow-hidden">
                <!-- Color Segments -->
                <div class="absolute bottom-0 left-0 w-full h-full flex">
                   <div class="flex-1 bg-red-500/20 border-b-4 border-red-500"></div>
                   <div class="flex-1 bg-yellow-500/20 border-b-4 border-yellow-500"></div>
                   <div class="flex-1 bg-green-500/20 border-b-4 border-green-500"></div>
                </div>
                <!-- Needle -->
                <div 
                  class="absolute bottom-0 left-1/2 w-1 h-16 bg-white origin-bottom transition-transform duration-1000"
                  :style="{ transform: `translateX(-50%) rotate(${avgChange * 10}deg)` }"
                ></div>
                <div class="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
             </div>
          </div>
          <div class="text-center mt-2">
            <div class="text-xl font-bold" :class="avgChange >= 0 ? 'text-green-400' : 'text-red-400'">
              {{ avgChange > 0 ? 'Bullish' : 'Bearish' }}
            </div>
            <div class="text-xs text-gray-500">Avg Change: {{ avgChange }}%</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Mock Data
const mockStocks = ref([
  { symbol: 'NVDA', change: 3.45 },
  { symbol: 'AMD', change: 1.20 },
  { symbol: 'INTC', change: -0.50 },
  { symbol: 'TSM', change: 0.80 },
  { symbol: 'AVGO', change: 2.10 },
  { symbol: 'QCOM', change: -1.20 },
  { symbol: 'TXN', change: -0.30 },
  { symbol: 'MU', change: 1.50 },
  { symbol: 'AMAT', change: 0.90 },
  { symbol: 'LRCX', change: -2.10 },
  { symbol: 'KLAC', change: 0.40 },
  { symbol: 'ADI', change: -0.80 },
  { symbol: 'MRVL', change: 1.80 },
  { symbol: 'STM', change: -0.20 },
  { symbol: 'NXPI', change: 0.60 }
])

// Computed Stats
const upCount = computed(() => mockStocks.value.filter(s => s.change > 0).length)
const downCount = computed(() => mockStocks.value.filter(s => s.change < 0).length)
const totalCount = computed(() => mockStocks.value.length)
const upRatio = computed(() => (upCount.value / totalCount.value) * 100)
const downRatio = computed(() => (downCount.value / totalCount.value) * 100)

const sortedStocks = computed(() => [...mockStocks.value].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)))
const sortedByAbsChange = computed(() => [...mockStocks.value].sort((a, b) => Math.abs(b.change) - Math.abs(a.change)))

const avgChange = computed(() => {
  const sum = mockStocks.value.reduce((acc, curr) => acc + curr.change, 0)
  return (sum / totalCount.value).toFixed(2)
})

// Helpers
const getColorClass = (change) => {
  if (change >= 3) return 'bg-green-500'
  if (change >= 1) return 'bg-green-600'
  if (change > 0) return 'bg-green-700'
  if (change <= -3) return 'bg-red-500'
  if (change <= -1) return 'bg-red-600'
  return 'bg-red-700'
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
