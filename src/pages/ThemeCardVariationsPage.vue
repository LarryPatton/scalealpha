<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white p-8 font-sans">
    <div class="max-w-[1600px] mx-auto">
      <header class="mb-12">
        <h1 class="text-3xl font-bold mb-2">Theme Card Design Variations</h1>
        <p class="text-gray-400">12 minimalist approaches to displaying market themes.</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        <!-- 1. Minimalist List (极简列表) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">01. Minimalist List</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer">
            <div class="flex justify-between items-start mb-3">
              <h4 class="font-bold text-white text-lg">AI Infrastructure</h4>
              <span class="text-xs font-bold text-green-400 bg-green-900/20 px-2 py-0.5 rounded">+4.2%</span>
            </div>
            <div class="space-y-2">
              <div v-for="stock in mockStocks.slice(0, 3)" :key="stock.symbol" class="flex justify-between text-sm">
                <span class="text-gray-400">{{ stock.symbol }}</span>
                <span :class="stock.change >= 0 ? 'text-green-500' : 'text-red-500'">{{ stock.change }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Micro-Chart (微图表) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">02. Micro-Chart</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer flex flex-col justify-between h-[140px]">
            <div>
              <div class="text-xs text-gray-500 mb-1">Market Theme</div>
              <h4 class="font-bold text-white text-lg">Semiconductors</h4>
            </div>
            <div class="flex items-end gap-1 h-12 mt-2">
              <div v-for="n in 12" :key="n" class="flex-1 bg-blue-500/20 rounded-sm hover:bg-blue-500 transition-colors" :style="{ height: Math.random() * 100 + '%' }"></div>
            </div>
            <div class="flex justify-between items-center mt-2 text-xs">
              <span class="text-gray-400">High Conviction</span>
              <span class="text-blue-400 font-bold">Bullish</span>
            </div>
          </div>
        </div>

        <!-- 3. Tag Cloud (标签云) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">03. Tag Cloud</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-2 h-2 rounded-full bg-purple-500"></div>
              <h4 class="font-bold text-white">Crypto Resurgence</h4>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-[#222] text-gray-300 text-xs rounded border border-[#333]">Bitcoin</span>
              <span class="px-2 py-1 bg-[#222] text-gray-300 text-xs rounded border border-[#333]">ETF</span>
              <span class="px-2 py-1 bg-[#222] text-gray-300 text-xs rounded border border-[#333]">Mining</span>
              <span class="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded border border-green-900/30">+8.5%</span>
            </div>
          </div>
        </div>

        <!-- 4. Glassmorphism (毛玻璃/渐变) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">04. Gradient Accent</h3>
          <div class="relative bg-[#151515] border border-[#333] rounded-lg p-4 overflow-hidden hover:border-gray-500 transition-colors cursor-pointer group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl -mr-10 -mt-10 rounded-full group-hover:bg-blue-600/30 transition-all"></div>
            <h4 class="font-bold text-white text-lg relative z-10 mb-1">EV Price War</h4>
            <p class="text-xs text-gray-400 relative z-10 mb-4">Margin compression fears intensifying.</p>
            <div class="flex -space-x-2 relative z-10">
              <div v-for="stock in mockStocks.slice(0, 3)" :key="stock.symbol" class="w-6 h-6 rounded-full bg-[#222] border border-[#151515] flex items-center justify-center text-[8px] text-gray-300">
                {{ stock.symbol[0] }}
              </div>
              <div class="w-6 h-6 rounded-full bg-[#222] border border-[#151515] flex items-center justify-center text-[8px] text-gray-500">+2</div>
            </div>
          </div>
        </div>

        <!-- 5. Solid Color (纯色块/高亮) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">05. Status Bar</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg overflow-hidden hover:border-gray-500 transition-colors cursor-pointer">
            <div class="h-1 w-full bg-red-500"></div>
            <div class="p-4">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-bold text-white">Renewable Energy</h4>
                <span class="text-red-400 text-xs font-bold">Bearish</span>
              </div>
              <div class="text-xs text-gray-500">High interest rates weighing on project finance.</div>
            </div>
          </div>
        </div>

        <!-- 6. Image Focus (图片主导 - 极简版) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">06. Image Overlay</h3>
          <div class="relative h-[120px] rounded-lg overflow-hidden border border-[#333] group cursor-pointer">
            <img src="https://placehold.co/400x200/111/333?text=Biotech" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-4">
              <h4 class="font-bold text-white text-lg leading-none mb-1">Biotech</h4>
              <span class="text-xs text-gray-400">Gene therapy breakthrough</span>
            </div>
          </div>
        </div>

        <!-- 7. Ticker Tape (横向滚动) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">07. Ticker Row</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer">
            <div class="flex justify-between items-center mb-3">
              <h4 class="font-bold text-white">China Tech</h4>
              <span class="text-xs text-gray-500">Rebound</span>
            </div>
            <div class="flex gap-2 overflow-hidden opacity-70">
              <span class="text-xs font-mono text-green-400">BABA +2.5%</span>
              <span class="text-xs font-mono text-green-400">PDD +4.2%</span>
              <span class="text-xs font-mono text-green-400">JD +1.8%</span>
            </div>
          </div>
        </div>

        <!-- 8. Heatmap Tile (热力图块) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">08. Heatmap Tile</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-1 hover:border-gray-500 transition-colors cursor-pointer h-[140px] flex flex-col">
            <div class="px-3 py-2 flex justify-between items-center">
              <span class="font-bold text-sm text-white">SaaS</span>
              <span class="text-[10px] text-gray-500">Mixed</span>
            </div>
            <div class="flex-1 grid grid-cols-2 gap-0.5">
              <div class="bg-green-900/40 flex items-center justify-center text-xs text-green-400 font-bold">CRM</div>
              <div class="bg-red-900/40 flex items-center justify-center text-xs text-red-400 font-bold">SNOW</div>
              <div class="bg-green-900/30 flex items-center justify-center text-xs text-green-500/70">ADBE</div>
              <div class="bg-gray-800/40 flex items-center justify-center text-xs text-gray-500">WDAY</div>
            </div>
          </div>
        </div>

        <!-- 9. News Headline (新闻头条) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">09. News Headline</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer flex gap-3 items-center">
            <div class="w-10 h-10 bg-[#222] rounded flex items-center justify-center text-xl">🤖</div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-white text-sm truncate">Generative AI</h4>
              <p class="text-xs text-gray-500 truncate">OpenAI releases new model</p>
            </div>
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        <!-- 10. Stat Focus (数据聚焦) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">10. Stat Focus</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer text-center">
            <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Cybersecurity</div>
            <div class="text-3xl font-bold text-white mb-1">85<span class="text-sm text-gray-500">%</span></div>
            <div class="text-[10px] text-blue-400 bg-blue-900/20 rounded-full px-2 py-0.5 inline-block">Bullish Sentiment</div>
          </div>
        </div>

        <!-- 11. Iconic (图标化) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">11. Iconic</h3>
          <div class="bg-[#151515] border border-[#333] rounded-lg p-4 hover:border-gray-500 transition-colors cursor-pointer flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center bg-[#1a1a1a]">
                <span class="text-lg">💊</span>
              </div>
              <div>
                <h4 class="font-bold text-white text-sm">Weight Loss</h4>
                <div class="text-[10px] text-gray-500">LLY, NVO</div>
              </div>
            </div>
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </div>
        </div>

        <!-- 12. Compact Row (紧凑行) -->
        <div class="space-y-2">
          <h3 class="text-xs font-mono text-gray-500 uppercase">12. Compact Row</h3>
          <div class="bg-[#151515] border-b border-[#333] p-3 hover:bg-[#1a1a1a] transition-colors cursor-pointer flex items-center gap-4">
            <span class="text-xs font-mono text-gray-500">#1</span>
            <h4 class="font-bold text-white text-sm flex-1">Quantum Computing</h4>
            <div class="flex gap-2">
              <span class="w-1.5 h-4 bg-green-500 rounded-sm"></span>
              <span class="w-1.5 h-4 bg-green-500/50 rounded-sm"></span>
              <span class="w-1.5 h-4 bg-red-500/50 rounded-sm"></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mockStocks = [
  { symbol: 'NVDA', change: 3.45 },
  { symbol: 'AMD', change: 1.20 },
  { symbol: 'INTC', change: -0.50 },
  { symbol: 'TSM', change: -0.80 }
]
</script>
