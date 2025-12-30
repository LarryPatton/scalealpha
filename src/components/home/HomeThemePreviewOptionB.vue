<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Simulated Header / Filter Bar -->
    <div class="px-4 py-3 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <!-- Left: Content Switcher -->
      <div class="flex items-center gap-3">
        <div class="border p-0.5 flex items-center rounded-sm" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.strong }">
          <button 
            class="px-2 py-1 rounded-sm text-[10px] font-bold transition-all"
            :style="{ backgroundColor: tokens.colors.text.primary, color: tokens.colors.background.base }"
          >
            Recommended
          </button>
          <button 
            class="px-2 py-1 rounded-sm text-[10px] font-bold transition-all"
            :style="{ color: tokens.colors.text.muted }"
          >
            Following
          </button>
        </div>
      </div>

      <!-- Right: Stage Filter (Simulated) -->
      <div class="relative">
        <button 
          class="flex items-center gap-1.5 px-2.5 py-1.5 border rounded-sm text-[10px] font-bold uppercase tracking-wide transition-colors"
          :style="{ backgroundColor: isFilterOpen ? tokens.colors.background.elevated : tokens.colors.background.base, color: activeFilter !== 'all' ? tokens.colors.text.primary : tokens.colors.text.muted, borderColor: tokens.colors.border.subtle }"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          <span>阶段{{ activeFilter !== 'all' ? ' (1)' : '' }}</span>
          <svg class="w-2.5 h-2.5 transition-transform duration-200" :class="isFilterOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        
        <!-- Dropdown Panel -->
        <div 
          v-if="isFilterOpen" 
          class="absolute top-full right-0 mt-1 w-32 border rounded-sm shadow-xl z-50 py-1 animate-fade-in-up"
          :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
        >
          <div 
            v-for="stage in ['Growth', 'Mature', 'Emerging']" 
            :key="stage"
            class="flex items-center gap-2 px-3 py-1.5 cursor-pointer transition-colors hover:bg-white/5"
            :class="activeFilter === stage.toLowerCase() ? 'bg-white/10' : ''"
          >
            <div class="w-3 h-3 border rounded-sm flex items-center justify-center" :style="{ borderColor: activeFilter === stage.toLowerCase() ? tokens.colors.accent.primary : tokens.colors.border.default, backgroundColor: activeFilter === stage.toLowerCase() ? tokens.colors.accent.primary : 'transparent' }">
              <svg v-if="activeFilter === stage.toLowerCase()" class="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <span class="text-[10px] font-medium" :style="{ color: tokens.colors.text.secondary }">{{ stage }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="flex-1 p-4 relative overflow-hidden">
      <transition-group name="list" tag="div" class="grid grid-cols-2 gap-3">
        <div 
          v-for="card in filteredCards" 
          :key="card.id"
          class="p-4 border transition-all cursor-pointer group flex flex-col relative overflow-hidden"
          :class="hoveredCard === card.id ? 'scale-[1.02] shadow-xl z-10' : ''"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: hoveredCard === card.id ? tokens.colors.border.strong : tokens.colors.border.subtle 
          }"
        >
          <!-- Subtle top accent on hover -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>

          <!-- Header: Badge + Progress -->
          <div class="flex items-center gap-2 mb-3">
            <span 
              class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm shrink-0" 
              :style="{ backgroundColor: card.color + '1A', color: card.color }"
            >
              {{ card.stage }}
            </span>
            <div class="flex-1 flex items-center gap-0.5">
              <template v-for="i in 8" :key="i">
                <div 
                  class="h-1 flex-1 rounded-full transition-all duration-500" 
                  :style="{ 
                    backgroundColor: i <= card.stageIndex ? card.color : tokens.colors.border.subtle,
                    opacity: i <= card.stageIndex ? 1 : 0.3
                  }"
                ></div>
              </template>
            </div>
          </div>
          
          <!-- Body: Title & Desc -->
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg">{{ card.icon }}</span>
            <h3 class="text-sm font-bold truncate" :style="{ color: tokens.colors.text.primary }">{{ card.title }}</h3>
          </div>
          <p class="text-[10px] mb-3 line-clamp-2 leading-relaxed" :style="{ color: tokens.colors.text.muted }">{{ card.desc }}</p>
          
          <!-- Tickers -->
          <div class="flex flex-wrap gap-1 mb-3">
            <span v-for="stock in card.stocks" :key="stock" class="px-1.5 py-0.5 text-[9px] font-mono font-bold border transition-colors" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">{{ stock }}</span>
          </div>

          <!-- Footer: Metrics -->
          <div class="flex items-center justify-between pt-2 border-t mt-auto" :style="{ borderColor: tokens.colors.border.subtle }">
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-1">
                <span class="text-[8px] font-bold uppercase" :style="{ color: tokens.colors.text.disabled }">30D</span>
                <span class="text-[10px] font-bold tabular-nums" :style="{ color: card.change > 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }">{{ card.change > 0 ? '+' : '' }}{{ card.change }}%</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-[8px] font-bold uppercase" :style="{ color: tokens.colors.text.disabled }">1Y</span>
                <span class="text-[10px] font-bold tabular-nums" :style="{ color: card.change1y > 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }">{{ card.change1y > 0 ? '+' : '' }}{{ card.change1y }}%</span>
              </div>
            </div>
          </div>

          <!-- Hover Detail Popover (Simulated) -->
          <div 
            v-if="hoveredCard === card.id"
            class="absolute inset-0 bg-black/5 backdrop-blur-[1px] z-20 flex items-center justify-center pointer-events-none animate-fade-in"
          >
            <div class="bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg border border-white/10">
              Click to View Details
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Simulated Cursor -->
      <div 
        class="absolute w-4 h-4 pointer-events-none z-50 transition-all duration-500 ease-in-out"
        :style="{ 
          top: cursorPosition.y + 'px', 
          left: cursorPosition.x + 'px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
        }"
      >
        <svg class="w-full h-full text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" stroke="black" stroke-width="2"/>
        </svg>
        <!-- Click Ripple -->
        <div v-if="isClicking" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-cyan-400 animate-ping"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()

const activeFilter = ref('all')
const isFilterOpen = ref(false)
const hoveredCard = ref(null)
const cursorPosition = ref({ x: 50, y: 50 })
const isClicking = ref(false)

const cards = [
  { id: 1, title: 'AI Chips', desc: 'High demand for training hardware.', icon: '🔥', change: 45.2, change1y: 120.5, stageIndex: 5, color: '#10b981', stage: 'Growth', stocks: ['NVDA', 'AMD'] },
  { id: 2, title: 'EV Battery', desc: 'Solid state tech breakthrough.', icon: '⚡', change: 28.7, change1y: 45.2, stageIndex: 6, color: '#06b6d4', stage: 'Mature', stocks: ['TSLA', 'BYD'] },
  { id: 3, title: 'Quantum', desc: 'Early stage commercialization.', icon: '🌱', change: 12.3, change1y: -5.4, stageIndex: 2, color: '#f59e0b', stage: 'Emerging', stocks: ['IBM', 'GOOG'] },
  { id: 4, title: 'GLP-1', desc: 'Weight loss drug market expansion.', icon: '💊', change: 67.8, change1y: 89.3, stageIndex: 4, color: '#10b981', stage: 'Growth', stocks: ['LLY', 'NVO'] },
  { id: 5, title: 'CyberSec', desc: 'Zero-trust adoption rising.', icon: '🛡️', change: 18.5, change1y: 32.1, stageIndex: 7, color: '#06b6d4', stage: 'Mature', stocks: ['PANW', 'CRWD'] },
  { id: 6, title: 'Space', desc: 'Commercial space flight sector.', icon: '🚀', change: -5.2, change1y: 12.8, stageIndex: 3, color: '#f59e0b', stage: 'Emerging', stocks: ['SPCE', 'RKLB'] },
]

const filteredCards = computed(() => {
  if (activeFilter.value === 'all') return cards
  if (activeFilter.value === 'growth') return cards.filter(c => c.stage === 'Growth')
  if (activeFilter.value === 'mature') return cards.filter(c => c.stage === 'Mature')
  return cards
})

// Animation Loop
let animationInterval
const runAnimation = () => {
  const sequence = [
    // Move to Filter Button
    { action: 'move', x: 350, y: 25, duration: 1000 },
    { action: 'click', target: 'filter-btn', duration: 300 },
    { action: 'wait', duration: 500 },
    // Move to Growth Option
    { action: 'move', x: 350, y: 60, duration: 500 },
    { action: 'click', target: 'filter-growth', duration: 300 },
    { action: 'wait', duration: 800 },
    // Move to Card 1
    { action: 'move', x: 100, y: 150, duration: 800 },
    { action: 'hover', cardId: 1, duration: 1500 },
    // Move to Filter Button (Reset)
    { action: 'move', x: 350, y: 25, duration: 800 },
    { action: 'click', target: 'filter-btn', duration: 300 },
    { action: 'wait', duration: 300 },
    // Move to Clear Filter (Simulated by clicking 'All' logic or just toggling off)
    // For simplicity, we just toggle filter menu and reset state in logic
    { action: 'reset', duration: 100 }, 
    { action: 'wait', duration: 500 },
    // Move to Card 3
    { action: 'move', x: 100, y: 250, duration: 800 },
    { action: 'hover', cardId: 3, duration: 1500 },
  ]

  let step = 0
  
  const executeStep = () => {
    if (step >= sequence.length) {
      step = 0 // Loop
    }
    
    const currentStep = sequence[step]
    
    if (currentStep.action === 'move') {
      cursorPosition.value = { x: currentStep.x, y: currentStep.y }
      hoveredCard.value = null
    } else if (currentStep.action === 'click') {
      isClicking.value = true
      setTimeout(() => {
        isClicking.value = false
        if (currentStep.target === 'filter-btn') {
          isFilterOpen.value = !isFilterOpen.value
        } else if (currentStep.target === 'filter-growth') {
          activeFilter.value = 'growth'
          isFilterOpen.value = false
        }
      }, 150)
    } else if (currentStep.action === 'hover') {
      hoveredCard.value = currentStep.cardId
    } else if (currentStep.action === 'reset') {
      activeFilter.value = 'all'
      isFilterOpen.value = false
    }

    step++
    setTimeout(executeStep, currentStep.duration)
  }

  executeStep()
}

onMounted(() => {
  runAnimation()
})

onUnmounted(() => {
  // Cleanup timeouts if needed (simplified here)
})
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>