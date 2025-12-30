<template>
  <div class="w-full h-full flex flex-col gap-4">
    <!-- Top: Configuration Panel Mock -->
    <div class="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 shadow-2xl relative overflow-hidden">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-sm font-bold text-white uppercase tracking-wider">Strategy Configuration</h3>
        <div class="flex gap-2">
          <div class="w-2 h-2 rounded-full bg-cyan-500"></div>
          <div class="w-2 h-2 rounded-full bg-[#333]"></div>
          <div class="w-2 h-2 rounded-full bg-[#333]"></div>
        </div>
      </div>
      
      <!-- Frameworks -->
      <div class="mb-4">
        <div class="text-[10px] text-gray-500 uppercase mb-2">Analysis Frameworks</div>
        <div class="grid grid-cols-4 gap-2">
          <div class="bg-cyan-900/20 border border-cyan-500/50 rounded p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cyan-900/40 transition-colors">
            <span class="text-lg">📊</span>
            <span class="text-[10px] text-cyan-400 font-bold">Technical</span>
          </div>
          <div class="bg-[#111] border border-[#333] rounded p-2 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer hover:opacity-100 hover:border-gray-500 transition-all">
            <span class="text-lg">📈</span>
            <span class="text-[10px] text-gray-400">Fundamental</span>
          </div>
          <div class="bg-cyan-900/20 border border-cyan-500/50 rounded p-2 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-cyan-900/40 transition-colors">
            <span class="text-lg">🤖</span>
            <span class="text-[10px] text-cyan-400 font-bold">Quant</span>
          </div>
          <div class="bg-[#111] border border-[#333] rounded p-2 flex flex-col items-center justify-center gap-1 opacity-50 cursor-pointer hover:opacity-100 hover:border-gray-500 transition-all">
            <span class="text-lg">📰</span>
            <span class="text-[10px] text-gray-400">Sentiment</span>
          </div>
        </div>
      </div>
      
      <!-- Parameters -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div class="text-[10px] text-gray-500 uppercase mb-2">Time Horizon</div>
          <div class="flex gap-1">
            <div class="flex-1 bg-cyan-900/20 border border-cyan-500/50 rounded p-1.5 text-center text-[10px] text-cyan-400 font-bold cursor-pointer hover:bg-cyan-900/40 transition-colors">Short</div>
            <div class="flex-1 bg-[#111] border border-[#333] rounded p-1.5 text-center text-[10px] text-gray-500 cursor-pointer hover:bg-[#222] transition-colors">Med</div>
            <div class="flex-1 bg-[#111] border border-[#333] rounded p-1.5 text-center text-[10px] text-gray-500 cursor-pointer hover:bg-[#222] transition-colors">Long</div>
          </div>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 uppercase mb-2">Risk Profile</div>
          <div class="flex gap-1">
            <div class="flex-1 bg-[#111] border border-[#333] rounded p-1.5 text-center text-[10px] text-gray-500 cursor-pointer hover:bg-[#222] transition-colors">Low</div>
            <div class="flex-1 bg-amber-900/20 border border-amber-500/50 rounded p-1.5 text-center text-[10px] text-amber-400 font-bold cursor-pointer hover:bg-amber-900/40 transition-colors">Med</div>
            <div class="flex-1 bg-[#111] border border-[#333] rounded p-1.5 text-center text-[10px] text-gray-500 cursor-pointer hover:bg-[#222] transition-colors">High</div>
          </div>
        </div>
      </div>
      
      <!-- Generate Button -->
      <div class="w-full py-3 bg-cyan-600 rounded text-center text-xs font-bold text-white uppercase tracking-widest shadow-[0_0_15px_rgba(8,145,178,0.5)] cursor-pointer hover:bg-cyan-500 hover:shadow-[0_0_25px_rgba(8,145,178,0.7)] hover:scale-[1.02] transition-all active:scale-95">
        Generate Strategy
      </div>
    </div>

    <!-- Bottom: Active Tasks Mock -->
    <div class="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 shadow-xl flex-1 flex flex-col">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Generation</h3>
        <span class="text-[10px] text-cyan-500 animate-pulse">Processing...</span>
      </div>
      
      <div class="space-y-3">
        <!-- Task 1 -->
        <div class="bg-[#111] border border-cyan-500/30 rounded p-3 relative overflow-hidden">
          <div class="flex justify-between items-center mb-2 relative z-10">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white">NVDA</span>
              <span class="text-[8px] px-1.5 py-0.5 bg-cyan-900/30 text-cyan-400 rounded border border-cyan-500/30">Quant Analysis</span>
            </div>
            <span class="text-[10px] text-gray-400">~45s</span>
          </div>
          <div class="h-1.5 bg-[#222] rounded-full overflow-hidden relative z-10">
            <div class="h-full bg-cyan-500 w-[75%] relative overflow-hidden">
               <div class="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
            </div>
          </div>
        </div>
        
        <!-- Task 2 -->
        <div class="bg-[#111] border border-[#333] rounded p-3 opacity-60">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white">TSLA</span>
              <span class="text-[8px] px-1.5 py-0.5 bg-[#222] text-gray-400 rounded border border-[#333]">Pending</span>
            </div>
            <span class="text-[10px] text-gray-500">Queued</span>
          </div>
          <div class="h-1.5 bg-[#222] rounded-full overflow-hidden">
            <div class="h-full bg-gray-600 w-0"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>

<script setup>
// Static preview component
</script>