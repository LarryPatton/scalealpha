<template>
  <div class="w-full h-full flex flex-col gap-4">
    <!-- Main Card -->
    <div class="bg-[#0a0a0a] border border-[#222] rounded-lg p-6 shadow-2xl relative overflow-hidden group hover:border-cyan-500 transition-all duration-500 transform hover:-translate-y-1">
      <!-- Glow Effect -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
      
      <!-- Shimmer Effect -->
      <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-0 pointer-events-none"></div>

      <!-- Header -->
      <div class="flex justify-between items-start mb-6 relative z-10">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded bg-[#111] border border-[#333] flex items-center justify-center text-xl font-bold text-white shadow-inner group-hover:border-cyan-500/50 transition-colors">
            NVDA
          </div>
          <div>
            <h3 class="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">NVIDIA Corp</h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded uppercase tracking-wider group-hover:bg-emerald-500/20 transition-colors">Strong Buy</span>
              <span class="text-xs text-gray-500">AI Infrastructure</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-emerald-400 group-hover:scale-110 transition-transform origin-right duration-300">94<span class="text-sm text-gray-600 font-normal">/100</span></div>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest mt-1">AI Confidence</div>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-3 gap-4 mb-6 relative z-10">
        <div class="bg-[#111] border border-[#333] rounded p-3 text-center group/metric hover:border-gray-600 transition-colors hover:bg-[#161616]">
          <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Risk/Reward</div>
          <div class="text-lg font-bold text-white">1 : 3.5</div>
        </div>
        <div class="bg-[#111] border border-[#333] rounded p-3 text-center group/metric hover:border-gray-600 transition-colors hover:bg-[#161616]">
          <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Timeframe</div>
          <div class="text-lg font-bold text-white">2-4 Wks</div>
        </div>
        <div class="bg-[#111] border border-[#333] rounded p-3 text-center group/metric hover:border-gray-600 transition-colors hover:bg-[#161616]">
          <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Win Rate</div>
          <div class="text-lg font-bold text-emerald-400">78%</div>
        </div>
      </div>

      <!-- Price Targets -->
      <div class="mb-6 relative z-10">
        <div class="flex justify-between text-xs mb-2 font-mono">
          <span class="text-gray-400">Entry: <span class="text-white">$124.50</span></span>
          <span class="text-emerald-400">Target: $145.00 (+16.5%)</span>
        </div>
        <div class="h-2 bg-[#222] rounded-full overflow-hidden relative">
          <!-- Progress Bar -->
          <div class="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gray-600 to-emerald-500 opacity-50 w-0 animate-[growWidth_1.5s_ease-out_forwards]"></div>
          <!-- Current Price Marker -->
          <div class="absolute top-0 bottom-0 w-1 bg-white left-0 z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[slideMarker_1.5s_ease-out_forwards]"></div>
        </div>
      </div>

      <!-- Analysis Tags -->
      <div class="flex flex-wrap gap-2 relative z-10">
        <span class="px-2 py-1 bg-[#111] border border-[#333] rounded text-[10px] text-gray-400 flex items-center gap-1 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors cursor-default">
          <span class="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></span> Technical Breakout
        </span>
        <span class="px-2 py-1 bg-[#111] border border-[#333] rounded text-[10px] text-gray-400 flex items-center gap-1 hover:border-purple-500/30 hover:text-purple-400 transition-colors cursor-default">
          <span class="w-1 h-1 rounded-full bg-purple-500 animate-pulse delay-75"></span> Earnings Beat
        </span>
        <span class="px-2 py-1 bg-[#111] border border-[#333] rounded text-[10px] text-gray-400 flex items-center gap-1 hover:border-orange-500/30 hover:text-orange-400 transition-colors cursor-default">
          <span class="w-1 h-1 rounded-full bg-orange-500 animate-pulse delay-150"></span> Inst. Buying
        </span>
      </div>
    </div>

    <!-- Secondary Cards (Stacked behind/below) -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 flex items-center gap-3 opacity-60 hover:opacity-100 hover:border-gray-600 transition-all cursor-pointer hover:scale-[1.02]">
        <div class="w-10 h-10 rounded bg-[#111] flex items-center justify-center text-xs font-bold text-white border border-[#333]">AMD</div>
        <div>
          <div class="text-sm font-bold text-white">AMD</div>
          <div class="text-xs text-emerald-400 font-mono">Buy (Score 88)</div>
        </div>
      </div>
      <div class="bg-[#0a0a0a] border border-[#222] rounded-lg p-4 flex items-center gap-3 opacity-60 hover:opacity-100 hover:border-gray-600 transition-all cursor-pointer hover:scale-[1.02]">
        <div class="w-10 h-10 rounded bg-[#111] flex items-center justify-center text-xs font-bold text-white border border-[#333]">TSLA</div>
        <div>
          <div class="text-sm font-bold text-white">Tesla</div>
          <div class="text-xs text-amber-400 font-mono">Hold (Score 65)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes growWidth {
  to { width: 30%; }
}
@keyframes slideMarker {
  to { left: 30%; }
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
</style>

<script setup>
// Static preview component
</script>