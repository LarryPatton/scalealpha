<template>
  <div class="w-full h-full flex flex-col gap-4">
    <!-- Main Card -->
    <div 
      class="border rounded-lg p-6 shadow-2xl relative overflow-hidden group transition-all duration-500 transform hover:-translate-y-1"
      :style="{ 
        backgroundColor: tokens.colors.background.base, 
        borderColor: tokens.colors.border.default,
        ':hover': { borderColor: tokens.colors.accent.primary }
      }"
    >
      <!-- Glow Effect -->
      <div 
        class="absolute top-0 right-0 w-64 h-64 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-500"
        :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }"
      ></div>
      
      <!-- Shimmer Effect -->
      <div class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0 pointer-events-none" :style="{ background: `linear-gradient(to right, transparent, ${tokens.colors.text.primary}0D, transparent)` }"></div>

      <!-- Header -->
      <div class="flex justify-between items-start mb-6 relative z-10">
        <div class="flex items-center gap-4">
          <div 
            class="w-12 h-12 rounded border flex items-center justify-center text-xl font-bold shadow-inner transition-colors"
            :style="{ 
              backgroundColor: tokens.colors.background.elevated, 
              borderColor: tokens.colors.border.default, 
              color: tokens.colors.text.primary 
            }"
          >
            NVDA
          </div>
          <div>
            <h3 class="text-xl font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">NVIDIA Corp</h3>
            <div class="flex items-center gap-2 mt-1">
              <span 
                class="px-2 py-0.5 border text-xs font-bold rounded uppercase tracking-wider transition-colors"
                :style="{ 
                  backgroundColor: tokens.colors.semantic.success + '1A', 
                  borderColor: tokens.colors.semantic.success + '33', 
                  color: tokens.colors.semantic.success 
                }"
              >Strong Buy</span>
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">AI Infrastructure</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold group-hover:scale-110 transition-transform origin-right duration-300" :style="{ color: tokens.colors.semantic.success }">94<span class="text-sm font-normal" :style="{ color: tokens.colors.text.muted }">/100</span></div>
          <div class="text-[10px] uppercase tracking-widest mt-1" :style="{ color: tokens.colors.text.muted }">AI Confidence</div>
        </div>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-3 gap-4 mb-6 relative z-10">
        <div 
          class="border rounded p-3 text-center group/metric transition-colors"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default,
            ':hover': { borderColor: tokens.colors.border.strong }
          }"
        >
          <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">Risk/Reward</div>
          <div class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">1 : 3.5</div>
        </div>
        <div 
          class="border rounded p-3 text-center group/metric transition-colors"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default,
            ':hover': { borderColor: tokens.colors.border.strong }
          }"
        >
          <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">Timeframe</div>
          <div class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">2-4 Wks</div>
        </div>
        <div 
          class="border rounded p-3 text-center group/metric transition-colors"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default,
            ':hover': { borderColor: tokens.colors.border.strong }
          }"
        >
          <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">Win Rate</div>
          <div class="text-lg font-bold" :style="{ color: tokens.colors.semantic.success }">78%</div>
        </div>
      </div>

      <!-- Price Targets -->
      <div class="mb-6 relative z-10">
        <div class="flex justify-between text-xs mb-2 font-mono">
          <span :style="{ color: tokens.colors.text.muted }">Entry: <span :style="{ color: tokens.colors.text.primary }">$124.50</span></span>
          <span :style="{ color: tokens.colors.semantic.success }">Target: $145.00 (+16.5%)</span>
        </div>
        <div class="h-2 rounded-full overflow-hidden relative" :style="{ backgroundColor: tokens.colors.border.default }">
          <!-- Progress Bar -->
          <div class="absolute top-0 bottom-0 left-0 opacity-50 w-0 animate-[growWidth_1.5s_ease-out_forwards]" :style="{ background: `linear-gradient(to right, ${tokens.colors.text.muted}, ${tokens.colors.semantic.success})` }"></div>
          <!-- Current Price Marker -->
          <div class="absolute top-0 bottom-0 w-1 left-0 z-20 animate-[slideMarker_1.5s_ease-out_forwards]" :style="{ backgroundColor: tokens.colors.text.primary, boxShadow: `0 0 10px ${tokens.colors.text.primary}CC` }"></div>
        </div>
      </div>

      <!-- Analysis Tags -->
      <div class="flex flex-wrap gap-2 relative z-10">
        <span 
          class="px-2 py-1 border rounded text-[10px] flex items-center gap-1 transition-colors cursor-default"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default, 
            color: tokens.colors.text.secondary 
          }"
        >
          <span class="w-1 h-1 rounded-full animate-pulse" :style="{ backgroundColor: tokens.colors.accent.primary }"></span> Technical Breakout
        </span>
        <span 
          class="px-2 py-1 border rounded text-[10px] flex items-center gap-1 transition-colors cursor-default"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default, 
            color: tokens.colors.text.secondary 
          }"
        >
          <span class="w-1 h-1 rounded-full animate-pulse delay-75" :style="{ backgroundColor: '#a855f7' }"></span> Earnings Beat
        </span>
        <span 
          class="px-2 py-1 border rounded text-[10px] flex items-center gap-1 transition-colors cursor-default"
          :style="{ 
            backgroundColor: tokens.colors.background.elevated, 
            borderColor: tokens.colors.border.default, 
            color: tokens.colors.text.secondary 
          }"
        >
          <span class="w-1 h-1 rounded-full animate-pulse delay-150" :style="{ backgroundColor: tokens.colors.semantic.warning }"></span> Inst. Buying
        </span>
      </div>
    </div>

    <!-- Secondary Cards (Stacked behind/below) -->
    <div class="grid grid-cols-2 gap-4">
      <div 
        class="border rounded-lg p-4 flex items-center gap-3 opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-[1.02]"
        :style="{ 
          backgroundColor: tokens.colors.background.base, 
          borderColor: tokens.colors.border.default,
          ':hover': { borderColor: tokens.colors.border.strong }
        }"
      >
        <div class="w-10 h-10 rounded flex items-center justify-center text-xs font-bold border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }">AMD</div>
        <div>
          <div class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">AMD</div>
          <div class="text-xs font-mono" :style="{ color: tokens.colors.semantic.success }">Buy (Score 88)</div>
        </div>
      </div>
      <div 
        class="border rounded-lg p-4 flex items-center gap-3 opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-[1.02]"
        :style="{ 
          backgroundColor: tokens.colors.background.base, 
          borderColor: tokens.colors.border.default,
          ':hover': { borderColor: tokens.colors.border.strong }
        }"
      >
        <div class="w-10 h-10 rounded flex items-center justify-center text-xs font-bold border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }">TSLA</div>
        <div>
          <div class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Tesla</div>
          <div class="text-xs font-mono" :style="{ color: tokens.colors.semantic.warning }">Hold (Score 65)</div>
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
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()
</script>