<template>
  <div 
    class="group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl border border-[#404040] hover:border-blue-500 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-blue-500/20"
  >
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="relative p-5">
      <!-- Header: Symbol + Score Badge -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-2">
          <!-- Symbol Badge -->
          <div class="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <span class="text-blue-400 font-bold text-sm">{{ symbol }}</span>
          </div>
          
          <!-- Score Badge -->
          <div class="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
            <svg class="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-green-400 font-semibold text-xs">{{ score }}分</span>
          </div>
        </div>

        <!-- Change Badge -->
        <div 
          :class="[
            'px-2 py-1 rounded text-xs font-medium',
            change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
          ]"
        >
          {{ change >= 0 ? '+' : '' }}{{ change }}%
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-base font-semibold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
        {{ name }}
      </h3>

      <!-- Strategy Info Grid -->
      <div class="grid grid-cols-3 gap-2 mb-4 text-xs">
        <div class="flex flex-col gap-1">
          <span class="text-gray-500">策略</span>
          <span class="text-gray-300 font-medium truncate" :title="strategy">{{ strategy }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-500">周期</span>
          <span class="text-gray-300 font-medium">{{ period }}</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-gray-500">风险</span>
          <span 
            :class="[
              'font-medium',
              risk === '极高' ? 'text-red-400' : 
              risk === '高' ? 'text-orange-400' : 
              risk === '中等' ? 'text-yellow-400' : 'text-green-400'
            ]"
          >
            {{ risk }}
          </span>
        </div>
      </div>

      <!-- Expected Return -->
      <div class="flex items-center justify-between mb-4 p-3 bg-[#1a1a1a] rounded-lg border border-[#404040]">
        <span class="text-gray-400 text-sm">预期收益</span>
        <div class="flex items-baseline gap-1">
          <span class="text-2xl font-bold text-green-400">+{{ expectedReturn }}%</span>
        </div>
      </div>

      <!-- Summary -->
      <p class="text-gray-400 text-sm line-clamp-2 mb-4">
        {{ summary }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="px-2 py-1 bg-[#1a1a1a] border border-[#404040] rounded text-xs text-gray-400"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Action Button -->
      <div class="flex items-center justify-between pt-3 border-t border-[#404040]">
        <span class="text-xs text-gray-500">
          <svg class="w-3.5 h-3.5 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>
          AI 推荐
        </span>
        
        <button class="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
          查看详情 →
        </button>
      </div>
    </div>

    <!-- Hover Glow Effect -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  symbol: String,
  name: String,
  strategy: String,
  period: String,
  risk: String,
  score: Number,
  change: Number,
  expectedReturn: Number,
  reasoning: Array,
  tags: Array,
  summary: String,
  isFollowing: Boolean
})
</script>
