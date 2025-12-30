<template>
  <div 
    class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl transition-colors duration-300"
    :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
  >
    <!-- Header -->
    <div 
      class="px-4 py-3 border-b flex justify-between items-center transition-colors duration-300"
      :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
    >
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full animate-pulse" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
        <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Market Themes Map</span>
      </div>
      <div class="flex gap-3">
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm" :style="{ backgroundColor: tokens.colors.semantic.success }"></span>
          <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Growth</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
          <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Mature</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-sm" :style="{ backgroundColor: tokens.colors.semantic.warning }"></span>
          <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Emerging</span>
        </div>
      </div>
    </div>
    
    <!-- Content: CSS Grid Layout -->
    <div class="flex-1 p-4 grid grid-cols-12 grid-rows-6 gap-3 min-h-[400px]">
       
       <!-- Item 1: AI Chips (Large, Growth) -->
       <div 
         class="col-span-6 row-span-4 border rounded p-5 relative group transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg"
         :style="{ 
           backgroundColor: tokens.colors.background.base, 
           borderColor: tokens.colors.border.default,
           ':hover': { borderColor: tokens.colors.semantic.success }
         }"
       >
          <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" :style="{ background: `linear-gradient(to bottom right, ${tokens.colors.semantic.success}1A, transparent)` }"></div>
          
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-2">
               <div class="flex items-center gap-2">
                 <span class="text-2xl group-hover:scale-110 transition-transform duration-300">🔥</span>
                 <h3 class="text-xl font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">AI Chips</h3>
               </div>
               <span class="font-mono font-bold text-lg" :style="{ color: tokens.colors.semantic.success }">+45.2%</span>
            </div>
            <p class="text-xs mb-4 line-clamp-2 transition-colors" :style="{ color: tokens.colors.text.muted }">Global demand for AI training hardware continues to surge, driving sector-wide re-rating.</p>
            
            <!-- Mini Chart -->
            <div class="flex-1 w-full relative mb-3">
               <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" :style="{ stopColor: tokens.colors.semantic.success, stopOpacity: 0.2 }" />
                     <stop offset="100%" :style="{ stopColor: tokens.colors.semantic.success, stopOpacity: 0 }" />
                   </linearGradient>
                 </defs>
                 <path class="chart-area" d="M0 35 C 20 35, 30 20, 50 15 S 80 5, 100 2 L 100 40 L 0 40 Z" fill="url(#grad1)" stroke="none" />
                 <path class="chart-line" d="M0 35 C 20 35, 30 20, 50 15 S 80 5, 100 2" fill="none" :stroke="tokens.colors.semantic.success" stroke-width="2" />
               </svg>
            </div>
            
            <div class="flex gap-2 mt-auto">
               <span class="px-2 py-1 border rounded text-xs font-mono transition-colors" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">NVDA</span>
               <span class="px-2 py-1 border rounded text-xs font-mono transition-colors" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">AMD</span>
               <span class="px-2 py-1 border rounded text-xs font-mono transition-colors" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">AVGO</span>
            </div>
          </div>
       </div>

       <!-- Item 2: EV Battery (Medium, Mature) -->
       <div 
         class="col-span-6 row-span-3 border rounded p-4 relative group transition-all duration-300 cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg"
         :style="{ 
           backgroundColor: tokens.colors.background.base, 
           borderColor: tokens.colors.border.default
         }"
       >
          <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-1">
               <div class="flex items-center gap-2">
                 <span class="text-xl group-hover:scale-110 transition-transform duration-300">⚡</span>
                 <h3 class="text-lg font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">EV Battery</h3>
               </div>
               <span class="font-mono font-bold" :style="{ color: tokens.colors.accent.primary }">+28.7%</span>
            </div>
            <p class="text-xs mb-2 transition-colors" :style="{ color: tokens.colors.text.muted }">Solid state tech breakthrough.</p>
            <!-- Simple Bar Chart -->
            <div class="flex items-end gap-1 h-12 mb-2 mt-auto">
              <div class="w-1/6 h-[40%] rounded-t-sm transition-all duration-500 delay-75" :style="{ backgroundColor: tokens.colors.accent.primary + '4D' }"></div>
              <div class="w-1/6 h-[60%] rounded-t-sm transition-all duration-500 delay-100" :style="{ backgroundColor: tokens.colors.accent.primary + '4D' }"></div>
              <div class="w-1/6 h-[50%] rounded-t-sm transition-all duration-500 delay-150" :style="{ backgroundColor: tokens.colors.accent.primary + '4D' }"></div>
              <div class="w-1/6 h-[80%] rounded-t-sm transition-all duration-500 delay-200" :style="{ backgroundColor: tokens.colors.accent.primary + '4D' }"></div>
              <div class="w-1/6 h-[100%] rounded-t-sm transition-colors duration-300" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
            </div>
          </div>
       </div>

       <!-- Item 3: Quantum (Small, Emerging) -->
       <div 
         class="col-span-3 row-span-3 border rounded p-3 relative group transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg"
         :style="{ 
           backgroundColor: tokens.colors.background.base, 
           borderColor: tokens.colors.border.default
         }"
       >
          <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: tokens.colors.semantic.warning }"></div>
          <div class="flex flex-col h-full justify-between">
            <div>
              <div class="flex items-center gap-1 mb-1">
                <span class="text-lg group-hover:scale-110 transition-transform duration-300">🌱</span>
                <h3 class="text-sm font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">Quantum</h3>
              </div>
              <div class="font-mono font-bold text-xs" :style="{ color: tokens.colors.semantic.warning }">+12.3%</div>
            </div>
            <div class="w-full h-1 rounded-full overflow-hidden mt-2" :style="{ backgroundColor: tokens.colors.border.default }">
              <div class="h-full w-[30%] group-hover:w-[45%] transition-all duration-700 ease-out" :style="{ backgroundColor: tokens.colors.semantic.warning }"></div>
            </div>
          </div>
       </div>

       <!-- Item 4: GLP-1 (Small, Growth) -->
       <div 
         class="col-span-3 row-span-3 border rounded p-3 relative group transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg"
         :style="{ 
           backgroundColor: tokens.colors.background.base, 
           borderColor: tokens.colors.border.default
         }"
       >
          <div class="absolute top-0 left-0 w-full h-1" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
          <div class="flex flex-col h-full justify-between">
            <div>
              <div class="flex items-center gap-1 mb-1">
                <span class="text-lg group-hover:scale-110 transition-transform duration-300">💊</span>
                <h3 class="text-sm font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">GLP-1</h3>
              </div>
              <div class="font-mono font-bold text-xs" :style="{ color: tokens.colors.semantic.success }">+67.8%</div>
            </div>
            <div class="flex -space-x-2 mt-2">
              <div class="w-6 h-6 rounded-full border flex items-center justify-center text-[8px] transition-all duration-300 z-10" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">LLY</div>
              <div class="w-6 h-6 rounded-full border flex items-center justify-center text-[8px] transition-all duration-300 group-hover:translate-x-1" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">NVO</div>
            </div>
          </div>
       </div>

       <!-- Item 5: CyberSec (Wide, Mature) -->
       <div 
         class="col-span-6 row-span-2 border rounded p-3 relative group transition-all duration-300 cursor-pointer flex items-center justify-between hover:scale-[1.02] hover:shadow-lg"
         :style="{ 
           backgroundColor: tokens.colors.background.base, 
           borderColor: tokens.colors.border.default
         }"
       >
          <div class="absolute left-0 top-0 bottom-0 w-1" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
          <div class="pl-2">
             <div class="flex items-center gap-2">
               <span class="text-lg group-hover:scale-110 transition-transform duration-300">🛡️</span>
               <h3 class="text-base font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">Cyber Security</h3>
             </div>
             <p class="text-[10px] transition-colors" :style="{ color: tokens.colors.text.muted }">Zero-trust adoption rising.</p>
          </div>
          <div class="text-right">
             <div class="font-mono font-bold text-sm group-hover:scale-110 transition-transform origin-right duration-300" :style="{ color: tokens.colors.accent.primary }">+18.5%</div>
             <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">30D Change</div>
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
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()
</script>