<template>
  <div class="bg-[#2a2a2a] rounded-2xl p-6 border border-[#404040] shadow-2xl">
    <!-- Chart Legend -->
    <div class="flex justify-center gap-6 mb-4">
      <div class="flex items-center gap-2">
        <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
        <span class="text-xs text-gray-300">官方实盘策略</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        <span class="text-xs text-gray-300">QQQ</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
        <span class="text-xs text-gray-300">SPY</span>
      </div>
    </div>

    <!-- SVG Chart Container -->
    <div class="relative h-64 bg-[#1a1a1a] rounded-xl p-4 overflow-hidden">
      <!-- Y-axis Labels -->
      <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-4 pl-2 z-10">
        <span>25%</span>
        <span>20%</span>
        <span>15%</span>
        <span>10%</span>
        <span>5%</span>
        <span>0%</span>
      </div>

      <!-- Chart Area -->
      <svg class="w-full h-full pl-8" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <!-- Grid Lines -->
        <line v-for="i in 6" :key="`grid-${i}`" x1="0" :y1="i * 60" x2="1200" :y2="i * 60" stroke="#404040" stroke-width="0.5" opacity="0.3" />
        
        <!-- Strategy Line (Blue) -->
        <polyline
          class="chart-line"
          :points="strategyData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
          fill="none"
          stroke="#3b82f6"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        
        <!-- QQQ Line (Green) -->
        <polyline
          class="chart-line delay-1"
          :points="qqqData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
          fill="none"
          stroke="#10b981"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.7"
        />
        
        <!-- SPY Line (Yellow) -->
        <polyline
          class="chart-line delay-2"
          :points="spyData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
          fill="none"
          stroke="#eab308"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.7"
        />
      </svg>

      <!-- X-axis Time Labels -->
      <div class="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-gray-500 px-2">
        <span>2024/1</span>
        <span>2024/7</span>
        <span>2025/1</span>
        <span>2025/7</span>
      </div>
    </div>

    <!-- Performance Stats -->
    <div class="grid grid-cols-3 gap-3 mt-4">
      <div class="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#404040]">
        <div class="text-lg font-bold text-blue-400">+18.5%</div>
        <div class="text-[10px] text-gray-400">官方策略</div>
      </div>
      <div class="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#404040]">
        <div class="text-lg font-bold text-green-400">+12.3%</div>
        <div class="text-[10px] text-gray-400">QQQ</div>
      </div>
      <div class="text-center p-3 bg-[#1a1a1a] rounded-lg border border-[#404040]">
        <div class="text-lg font-bold text-yellow-400">+9.7%</div>
        <div class="text-[10px] text-gray-400">SPY</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Performance chart data (simulated multi-line chart)
const strategyData = ref([
  5, 7, 6, 8, 10, 13, 12, 8, 5, 9, 10, 12, 15, 14, 13, 15, 17, 20, 22, 23, 
  21, 19, 17, 15, 18, 20, 22, 21, 19, 20, 22, 21, 19, 17, 20, 22, 21, 19, 18, 20,
  22, 23, 21, 20, 22, 21, 19, 17, 16, 14, 15, 18, 20, 19, 17, 20, 22, 21, 19, 17,
  15, 14, 16, 18, 20, 19, 17, 15, 18, 20, 22, 21, 20, 22, 23, 21, 20, 22, 21, 20,
  19, 17, 16, 15, 17, 19, 20, 19, 17, 16, 18, 20, 22, 21, 20, 19, 18, 20, 19, 18,
  17, 16, 18, 20, 19, 18, 17, 19, 20, 19, 18, 17, 16, 15, 17, 18, 19, 18, 17, 16
])

const qqqData = ref([
  5, 6, 7, 6, 5, 7, 8, 6, 5, 7, 8, 9, 8, 7, 9, 10, 9, 8, 10, 9, 
  8, 7, 9, 8, 9, 10, 11, 10, 9, 8, 10, 11, 10, 9, 8, 10, 11, 10, 9, 10,
  11, 12, 11, 10, 11, 12, 11, 10, 9, 8, 10, 11, 12, 13, 14, 13, 12, 11, 10, 11,
  12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 11, 10, 11, 12, 11, 10, 11, 12, 11,
  10, 9, 10, 11, 12, 11, 10, 11, 10, 9, 10, 11, 12, 11, 10, 11, 10, 9, 10, 9,
  8, 9, 10, 11, 10, 9, 8, 9, 10, 9, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7
])

const spyData = ref([
  5, 5, 6, 5, 6, 7, 6, 5, 4, 6, 7, 6, 5, 6, 7, 8, 7, 6, 8, 7, 
  6, 5, 7, 6, 7, 8, 9, 8, 7, 6, 8, 9, 8, 7, 6, 8, 9, 8, 7, 8,
  9, 10, 9, 8, 9, 10, 9, 8, 7, 6, 8, 9, 10, 11, 10, 9, 8, 7, 8, 9,
  10, 9, 8, 9, 10, 11, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9,
  8, 7, 8, 9, 10, 9, 8, 9, 8, 7, 8, 9, 10, 9, 8, 9, 8, 7, 8, 7,
  6, 7, 8, 9, 8, 7, 6, 7, 8, 7, 6, 7, 6, 5, 6, 7, 8, 7, 6, 5
])
</script>

<style scoped>
.chart-line {
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  animation: drawLine 2.5s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}

.delay-2 {
  animation-delay: 0.4s;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}
</style>