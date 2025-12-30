<template>
  <div class="w-full h-full bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden flex flex-col shadow-2xl">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-[#222] flex justify-between items-center bg-[#111]">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
        <span class="text-sm font-bold text-white">Market Themes Map</span>
      </div>
      <div class="flex gap-3">
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm bg-emerald-500"></span>
          <span class="text-[10px] text-gray-400">Growth</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm bg-cyan-500"></span>
          <span class="text-[10px] text-gray-400">Mature</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm bg-amber-500"></span>
          <span class="text-[10px] text-gray-400">Emerging</span>
        </div>
      </div>
    </div>
    
    <!-- Content: CSS Grid Layout -->
    <div class="flex-1 p-4 grid grid-cols-12 grid-rows-6 gap-3 min-h-[400px]">
       
       <!-- Item 1: AI Chips (Large, Growth) -->
       <div class="col-span-6 row-span-4 bg-[#111] border border-[#333] rounded p-5 relative group hover:border-emerald-500 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
          <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-2">
               <div class="flex items-center gap-2">
                 <span class="text-2xl group-hover:scale-110 transition-transform duration-300">🔥</span>
                 <h3 class="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">AI Chips</h3>
               </div>
               <span class="text-emerald-400 font-mono font-bold text-lg">+45.2%</span>
            </div>
            <p class="text-xs text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">Global demand for AI training hardware continues to surge, driving sector-wide re-rating.</p>
            
            <!-- Mini Chart -->
            <div class="flex-1 w-full relative mb-3">
               <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.2" />
                     <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                   </linearGradient>
                 </defs>
                 <path class="chart-area" d="M0 35 C 20 35, 30 20, 50 15 S 80 5, 100 2 L 100 40 L 0 40 Z" fill="url(#grad1)" stroke="none" />
                 <path class="chart-line" d="M0 35 C 20 35, 30 20, 50 15 S 80 5, 100 2" fill="none" stroke="#10b981" stroke-width="2" />
               </svg>
            </div>
            
            <div class="flex gap-2 mt-auto">
               <span class="px-2 py-1 bg-[#222] border border-[#333] rounded text-xs text-gray-300 font-mono group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">NVDA</span>
               <span class="px-2 py-1 bg-[#222] border border-[#333] rounded text-xs text-gray-300 font-mono group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">AMD</span>
               <span class="px-2 py-1 bg-[#222] border border-[#333] rounded text-xs text-gray-300 font-mono group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">AVGO</span>
            </div>
          </div>
       </div>

       <!-- Item 2: EV Battery (Medium, Mature) -->
       <div class="col-span-6 row-span-3 bg-[#111] border border-[#333] rounded p-4 relative group hover:border-cyan-500 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="absolute top-0 left-0 w-full h-1 bg-cyan-500"></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-1">
               <div class="flex items-center gap-2">
                 <span class="text-xl group-hover:scale-110 transition-transform duration-300">⚡</span>
                 <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">EV Battery</h3>
               </div>
               <span class="text-cyan-400 font-mono font-bold">+28.7%</span>
            </div>
            <p class="text-xs text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Solid state tech breakthrough.</p>
            <!-- Simple Bar Chart -->
            <div class="flex items-end gap-1 h-12 mb-2 mt-auto">
              <div class="w-1/6 bg-cyan-900/50 h-[40%] rounded-t-sm group-hover:h-[50%] transition-all duration-500 delay-75"></div>
              <div class="w-1/6 bg-cyan-900/50 h-[60%] rounded-t-sm group-hover:h-[70%] transition-all duration-500 delay-100"></div>
              <div class="w-1/6 bg-cyan-900/50 h-[50%] rounded-t-sm group-hover:h-[40%] transition-all duration-500 delay-150"></div>
              <div class="w-1/6 bg-cyan-900/50 h-[80%] rounded-t-sm group-hover:h-[90%] transition-all duration-500 delay-200"></div>
              <div class="w-1/6 bg-cyan-500 h-[100%] rounded-t-sm group-hover:bg-cyan-400 transition-colors duration-300"></div>
            </div>
          </div>
       </div>

       <!-- Item 3: Quantum (Small, Emerging) -->
       <div class="col-span-3 row-span-3 bg-[#111] border border-[#333] rounded p-3 relative group hover:border-amber-500 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/10">
          <div class="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
          <div class="flex flex-col h-full justify-between">
            <div>
              <div class="flex items-center gap-1 mb-1">
                <span class="text-lg group-hover:scale-110 transition-transform duration-300">🌱</span>
                <h3 class="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Quantum</h3>
              </div>
              <div class="text-amber-400 font-mono font-bold text-xs">+12.3%</div>
            </div>
            <div class="w-full bg-[#222] h-1 rounded-full overflow-hidden mt-2">
              <div class="bg-amber-500 h-full w-[30%] group-hover:w-[45%] transition-all duration-700 ease-out"></div>
            </div>
          </div>
       </div>

       <!-- Item 4: GLP-1 (Small, Growth) -->
       <div class="col-span-3 row-span-3 bg-[#111] border border-[#333] rounded p-3 relative group hover:border-emerald-500 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/10">
          <div class="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
          <div class="flex flex-col h-full justify-between">
            <div>
              <div class="flex items-center gap-1 mb-1">
                <span class="text-lg group-hover:scale-110 transition-transform duration-300">💊</span>
                <h3 class="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">GLP-1</h3>
              </div>
              <div class="text-emerald-400 font-mono font-bold text-xs">+67.8%</div>
            </div>
            <div class="flex -space-x-2 mt-2">
              <div class="w-6 h-6 rounded-full bg-[#333] border border-[#111] flex items-center justify-center text-[8px] text-gray-300 group-hover:border-emerald-500 group-hover:text-emerald-400 transition-all duration-300 z-10">LLY</div>
              <div class="w-6 h-6 rounded-full bg-[#333] border border-[#111] flex items-center justify-center text-[8px] text-gray-300 group-hover:border-emerald-500 group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1">NVO</div>
            </div>
          </div>
       </div>

       <!-- Item 5: CyberSec (Wide, Mature) -->
       <div class="col-span-6 row-span-2 bg-[#111] border border-[#333] rounded p-3 relative group hover:border-cyan-500 transition-all duration-300 cursor-pointer flex items-center justify-between hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>
          <div class="pl-2">
             <div class="flex items-center gap-2">
               <span class="text-lg group-hover:scale-110 transition-transform duration-300">🛡️</span>
               <h3 class="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">Cyber Security</h3>
             </div>
             <p class="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors">Zero-trust adoption rising.</p>
          </div>
          <div class="text-right">
             <div class="text-cyan-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform origin-right duration-300">+18.5%</div>
             <div class="text-[10px] text-gray-500">30D Change</div>
          </div>
       </div>

    </div>
  </div>
</template>

<style scoped>
.chart-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: drawLine 2s ease-out forwards;
}

.group:hover .chart-line {
  animation: drawLine 1s ease-out forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}
</style>

<script setup>
// No logic needed for this static preview
</script>