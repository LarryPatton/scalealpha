<template>
  <div class="w-full h-full bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden flex flex-col shadow-2xl">
    <!-- Header -->
    <div class="px-4 py-3 border-b border-[#222] flex justify-between items-center bg-[#111]">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
        <span class="text-sm font-bold text-white">Event Impact Analysis</span>
      </div>
      <div class="flex gap-2">
        <span class="px-2 py-0.5 bg-[#222] rounded text-[10px] text-gray-400">NVDA</span>
        <span class="px-2 py-0.5 bg-[#222] rounded text-[10px] text-gray-400">1D</span>
      </div>
    </div>
    
    <!-- Chart Area -->
    <div class="flex-1 relative p-4">
      <!-- Grid Lines -->
      <div class="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
        <div class="w-full h-px bg-[#222]"></div>
        <div class="w-full h-px bg-[#222]"></div>
        <div class="w-full h-px bg-[#222]"></div>
        <div class="w-full h-px bg-[#222]"></div>
        <div class="w-full h-px bg-[#222]"></div>
      </div>
      
      <!-- Chart SVG -->
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
        <!-- Gradient Area -->
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.2" />
            <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0" />
          </linearGradient>
        </defs>
        
        <!-- Line Path -->
        <path class="chart-area" d="M0 150 C 50 140, 80 160, 120 130 S 180 80, 220 90 S 280 110, 320 60 S 380 40, 400 20 L 400 200 L 0 200 Z" 
              fill="url(#chartGrad)" stroke="none" />
        <path class="chart-line" d="M0 150 C 50 140, 80 160, 120 130 S 180 80, 220 90 S 280 110, 320 60 S 380 40, 400 20" 
              fill="none" stroke="#f59e0b" stroke-width="2" />
              
        <!-- Event Markers -->
        <!-- Event 1: Earnings Beat -->
        <g transform="translate(120, 130)" class="group/marker cursor-pointer">
          <circle r="4" fill="#10b981" stroke="#000" stroke-width="2" class="group-hover/marker:scale-150 transition-transform duration-300" />
          <circle r="8" fill="#10b981" opacity="0.3" class="animate-ping" />
          <line x1="0" y1="0" x2="0" y2="-40" stroke="#333" stroke-dasharray="2" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300" />
          <foreignObject x="-60" y="-80" width="120" height="40" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/marker:translate-y-0">
            <div xmlns="http://www.w3.org/1999/xhtml" class="bg-[#111] border border-emerald-500/50 rounded p-1 text-center shadow-lg">
              <div class="text-[8px] text-emerald-400 font-bold">Earnings Beat</div>
              <div class="text-[6px] text-gray-400">+12% Surprise</div>
            </div>
          </foreignObject>
        </g>
        
        <!-- Event 2: Product Launch -->
        <g transform="translate(220, 90)" class="group/marker cursor-pointer">
          <circle r="4" fill="#3b82f6" stroke="#000" stroke-width="2" class="group-hover/marker:scale-150 transition-transform duration-300" />
          <circle r="8" fill="#3b82f6" opacity="0.3" class="animate-ping delay-75" />
          <line x1="0" y1="0" x2="0" y2="40" stroke="#333" stroke-dasharray="2" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300" />
          <foreignObject x="-60" y="45" width="120" height="40" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover/marker:translate-y-0">
            <div xmlns="http://www.w3.org/1999/xhtml" class="bg-[#111] border border-blue-500/50 rounded p-1 text-center shadow-lg">
              <div class="text-[8px] text-blue-400 font-bold">Product Launch</div>
              <div class="text-[6px] text-gray-400">New AI Chip</div>
            </div>
          </foreignObject>
        </g>
        
        <!-- Event 3: Fed Rate Decision -->
        <g transform="translate(320, 60)" class="group/marker cursor-pointer">
          <circle r="4" fill="#ef4444" stroke="#000" stroke-width="2" class="group-hover/marker:scale-150 transition-transform duration-300" />
          <circle r="8" fill="#ef4444" opacity="0.3" class="animate-ping delay-150" />
          <line x1="0" y1="0" x2="0" y2="-30" stroke="#333" stroke-dasharray="2" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300" />
          <foreignObject x="-60" y="-70" width="120" height="40" class="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover/marker:translate-y-0">
            <div xmlns="http://www.w3.org/1999/xhtml" class="bg-[#111] border border-red-500/50 rounded p-1 text-center shadow-lg">
              <div class="text-[8px] text-red-400 font-bold">Fed Rate Hike</div>
              <div class="text-[6px] text-gray-400">Market Volatility</div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
    
    <!-- Footer Legend -->
    <div class="px-4 py-2 bg-[#111] border-t border-[#222] flex justify-between items-center text-[10px] text-gray-500">
      <div class="flex gap-3">
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Bullish</span>
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-red-500"></span> Bearish</span>
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span> Neutral</span>
      </div>
      <span>Last 24h</span>
    </div>
  </div>
</template>

<style scoped>
.chart-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s ease-out forwards;
}

.chart-area {
  opacity: 0;
  animation: fadeIn 1s ease-out 2s forwards;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>

<script setup>
// Static preview component
</script>