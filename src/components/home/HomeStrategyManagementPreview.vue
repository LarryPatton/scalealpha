<template>
  <div class="w-full h-full bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden flex flex-col shadow-2xl">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-[#222] flex justify-between items-center bg-[#111]">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-cyan-500"></div>
        <span class="text-sm font-bold text-white">Strategy Portfolio</span>
      </div>
      <div class="flex gap-2">
        <span class="px-2 py-0.5 bg-[#222] rounded text-[10px] text-gray-400">Active: 12</span>
      </div>
    </div>
    
    <!-- List -->
    <div class="flex-1 p-4 space-y-3">
       <!-- Item 1 -->
       <div class="bg-[#111] border border-[#333] rounded p-3 flex items-center justify-between group hover:border-cyan-500 transition-all cursor-pointer transform hover:-translate-x-1 hover:bg-[#161616] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-white border border-[#333] group-hover:border-cyan-500/50 transition-colors">AAPL</div>
             <div>
                <div class="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Apple Long</div>
                <div class="text-[10px] text-gray-500">Tech • 2W</div>
             </div>
          </div>
          <div class="text-right">
             <div class="text-emerald-400 font-bold text-xs group-hover:scale-110 transition-transform origin-right">+12.4%</div>
             <div class="text-[10px] text-gray-500">P&L</div>
          </div>
       </div>
       <!-- Item 2 -->
       <div class="bg-[#111] border border-[#333] rounded p-3 flex items-center justify-between group hover:border-cyan-500 transition-all cursor-pointer transform hover:-translate-x-1 hover:bg-[#161616] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-white border border-[#333] group-hover:border-cyan-500/50 transition-colors">MSFT</div>
             <div>
                <div class="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">MSFT Breakout</div>
                <div class="text-[10px] text-gray-500">Tech • 1M</div>
             </div>
          </div>
          <div class="text-right">
             <div class="text-emerald-400 font-bold text-xs group-hover:scale-110 transition-transform origin-right">+8.2%</div>
             <div class="text-[10px] text-gray-500">P&L</div>
          </div>
       </div>
       <!-- Item 3 -->
       <div class="bg-[#111] border border-[#333] rounded p-3 flex items-center justify-between group hover:border-cyan-500 transition-all cursor-pointer transform hover:-translate-x-1 hover:bg-[#161616] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-white border border-[#333] group-hover:border-cyan-500/50 transition-colors">AMZN</div>
             <div>
                <div class="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">AMZN Mean Rev</div>
                <div class="text-[10px] text-gray-500">Cons • 3D</div>
             </div>
          </div>
          <div class="text-right">
             <div class="text-red-400 font-bold text-xs group-hover:scale-110 transition-transform origin-right">-1.5%</div>
             <div class="text-[10px] text-gray-500">P&L</div>
          </div>
       </div>
       <!-- Item 4 -->
       <div class="bg-[#111] border border-[#333] rounded p-3 flex items-center justify-between group hover:border-cyan-500 transition-all cursor-pointer transform hover:-translate-x-1 hover:bg-[#161616] hover:shadow-lg hover:shadow-cyan-500/10">
          <div class="flex items-center gap-3">
             <div class="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-white border border-[#333] group-hover:border-cyan-500/50 transition-colors">GOOG</div>
             <div>
                <div class="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">Alpha Search</div>
                <div class="text-[10px] text-gray-500">Tech • 5D</div>
             </div>
          </div>
          <div class="text-right">
             <div class="text-emerald-400 font-bold text-xs group-hover:scale-110 transition-transform origin-right">+3.1%</div>
             <div class="text-[10px] text-gray-500">P&L</div>
          </div>
       </div>
    </div>
  </div>
</template>

<script setup>
// Static preview component
</script>