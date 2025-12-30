<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Central Planet (Theme) -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div 
        class="relative w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center z-10 transition-all duration-1000"
        :style="{ 
          backgroundColor: tokens.colors.background.base, 
          borderColor: currentTheme.color,
          boxShadow: `0 0 50px ${currentTheme.color}4D`
        }"
      >
        <div class="text-4xl mb-2 animate-bounce">{{ currentTheme.icon }}</div>
        <div class="text-xl font-bold text-center px-2" :style="{ color: tokens.colors.text.primary }">{{ currentTheme.title }}</div>
        <div class="text-lg font-mono font-bold mt-1" :style="{ color: currentTheme.color }">{{ currentTheme.change }}%</div>
        
        <!-- Pulse Effect -->
        <div class="absolute inset-0 rounded-full border-2 animate-ping opacity-20" :style="{ borderColor: currentTheme.color }"></div>
      </div>
    </div>

    <!-- Orbiting Satellites (Stocks) -->
    <div class="absolute inset-0 pointer-events-none">
      <div 
        v-for="(stock, index) in currentTheme.stocks" 
        :key="stock + index"
        class="absolute w-12 h-12 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-lg transition-all duration-1000"
        :style="{ 
          backgroundColor: tokens.colors.background.elevated, 
          borderColor: tokens.colors.border.default,
          color: tokens.colors.text.secondary,
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) rotate(${index * (360 / currentTheme.stocks.length) + rotation}deg) translate(140px) rotate(-${index * (360 / currentTheme.stocks.length) + rotation}deg)`
        }"
      >
        {{ stock }}
        <!-- Energy Line -->
        <div 
          class="absolute top-1/2 left-1/2 w-[140px] h-[1px] origin-left opacity-30"
          :style="{ 
            backgroundColor: currentTheme.color,
            transform: `rotate(${index * (360 / currentTheme.stocks.length) + rotation + 180}deg)`
          }"
        >
          <div class="absolute top-0 left-0 w-full h-full animate-flow bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Info Overlay -->
    <div class="absolute bottom-4 left-4 right-4 p-3 rounded border backdrop-blur-sm" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.subtle }">
      <div class="flex justify-between items-center">
        <span class="text-xs font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Composition Analysis</span>
        <span class="text-xs font-mono" :style="{ color: currentTheme.color }">Stage: {{ currentTheme.stage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()

const themes = [
  { title: 'AI Chips', icon: '🔥', change: '+45.2', color: '#10b981', stage: 'Growth', stocks: ['NVDA', 'AMD', 'AVGO', 'TSM', 'MU'] },
  { title: 'EV Battery', icon: '⚡', change: '+28.7', color: '#06b6d4', stage: 'Mature', stocks: ['TSLA', 'BYD', 'CATL', 'LG', 'PANW'] },
  { title: 'Quantum', icon: '🌱', change: '+12.3', color: '#f59e0b', stage: 'Emerging', stocks: ['IBM', 'GOOG', 'IONQ', 'RGTI', 'QBIT'] },
]

const currentIndex = ref(0)
const currentTheme = ref(themes[0])
const rotation = ref(0)

let interval
let rotationFrame

const startAnimation = () => {
  // Rotate satellites
  const animate = () => {
    rotation.value += 0.2
    rotationFrame = requestAnimationFrame(animate)
  }
  animate()

  // Switch theme every 4 seconds
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % themes.length
    currentTheme.value = themes[currentIndex.value]
  }, 4000)
}

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  clearInterval(interval)
  cancelAnimationFrame(rotationFrame)
})
</script>

<style scoped>
@keyframes flow {
  0% { transform: translateX(100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(-100%); opacity: 0; }
}
.animate-flow {
  animation: flow 2s linear infinite;
}
</style>