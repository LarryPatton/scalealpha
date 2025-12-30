<template>
  <div 
    class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl transition-colors duration-300"
    :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
  >
    <!-- Metrics Row -->
    <div 
      class="flex border-b transition-colors duration-300"
      :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
    >
      <!-- Metric 1: Profit -->
      <div class="flex-1 p-4 flex flex-col items-center justify-center border-r transition-colors duration-300" :style="{ borderColor: tokens.colors.border.default }">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">总盈亏</div>
        <div class="text-2xl font-bold tracking-tight" :style="{ color: tokens.colors.accent.success }">+$12,450</div>
      </div>
      <!-- Metric 2: Return -->
      <div class="flex-1 p-4 flex flex-col items-center justify-center border-r transition-colors duration-300" :style="{ borderColor: tokens.colors.border.default }">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">收益率</div>
        <div class="text-2xl font-bold tracking-tight" :style="{ color: tokens.colors.accent.success }">+24.8%</div>
      </div>
      <!-- Metric 3: Max Drawdown -->
      <div class="flex-1 p-4 flex flex-col items-center justify-center">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">最大回撤</div>
        <div class="text-2xl font-bold tracking-tight" :style="{ color: tokens.colors.text.secondary }">-8.5%</div>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="flex-1 relative p-4 transition-colors duration-300" :style="{ backgroundColor: tokens.colors.background.base }">
      <!-- Chart Header -->
      <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div 
          class="text-xs font-bold flex items-center backdrop-blur px-2 py-1 rounded border transition-colors duration-300"
          :style="{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)', 
            borderColor: tokens.colors.border.default,
            color: tokens.colors.text.secondary
          }"
        >
          <span class="mr-2">📈</span>
          净值曲线
        </div>
      </div>

      <!-- SVG Chart -->
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="revenueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :style="{ stopColor: tokens.colors.accent.success, stopOpacity: 0.2 }" />
            <stop offset="100%" :style="{ stopColor: tokens.colors.accent.success, stopOpacity: 0 }" />
          </linearGradient>
        </defs>
        
        <!-- Grid Lines -->
        <line x1="0" y1="40" x2="400" y2="40" :stroke="tokens.colors.border.subtle" stroke-width="1" />
        <line x1="0" y1="80" x2="400" y2="80" :stroke="tokens.colors.border.subtle" stroke-width="1" />
        <line x1="0" y1="120" x2="400" y2="120" :stroke="tokens.colors.border.subtle" stroke-width="1" />
        <line x1="0" y1="160" x2="400" y2="160" :stroke="tokens.colors.border.subtle" stroke-width="1" />

        <!-- Main Line -->
        <path d="M0 150 C 40 145, 60 155, 100 130 S 160 110, 200 115 S 260 90, 300 70 S 360 40, 400 20" 
              fill="url(#revenueGrad)" stroke="none" />
        <path d="M0 150 C 40 145, 60 155, 100 130 S 160 110, 200 115 S 260 90, 300 70 S 360 40, 400 20" 
              fill="none" :stroke="tokens.colors.accent.success" stroke-width="2" />
              
        <!-- Comparison Line (Benchmark) -->
        <path d="M0 150 C 50 148, 100 145, 150 140 S 250 135, 300 130 S 350 125, 400 120" 
              fill="none" :stroke="tokens.colors.text.disabled" stroke-width="1" stroke-dasharray="4" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '../../composables/useTheme'

const { tokens, isDark } = useTheme()
</script>