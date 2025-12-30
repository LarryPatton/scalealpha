<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Header: Playback Controls -->
    <div class="px-4 py-3 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1">
          <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <span class="text-xs font-bold font-mono" :style="{ color: tokens.colors.text.primary }">REC</span>
        </div>
        <div class="h-4 w-px" :style="{ backgroundColor: tokens.colors.border.default }"></div>
        <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ currentTimeStr }}</span>
      </div>
      <div class="flex gap-2">
        <span class="px-2 py-0.5 rounded text-[10px] font-mono" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.muted }">NVDA</span>
        <span class="px-2 py-0.5 rounded text-[10px] font-mono" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.muted }">1D Replay</span>
      </div>
    </div>

    <!-- Main Viewport: Chart Area -->
    <div class="flex-1 relative overflow-hidden" :style="{ backgroundColor: tokens.colors.background.base }">
      <!-- Grid Background -->
      <div class="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none opacity-20">
        <div v-for="i in 5" :key="i" class="w-full h-px" :style="{ backgroundColor: tokens.colors.border.default }"></div>
      </div>

      <!-- Chart SVG -->
      <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="replayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" :style="{ stopColor: tokens.colors.accent.primary, stopOpacity: 0.2 }" />
            <stop offset="100%" :style="{ stopColor: tokens.colors.accent.primary, stopOpacity: 0 }" />
          </linearGradient>
        </defs>
        
        <!-- Dynamic Line -->
        <path 
          :d="currentPath" 
          fill="none" 
          :stroke="tokens.colors.accent.primary" 
          stroke-width="2" 
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- Area under line -->
        <path 
          :d="currentAreaPath" 
          fill="url(#replayGrad)" 
          stroke="none" 
        />
      </svg>

      <!-- Event Popups (Absolute Positioning) -->
      <transition name="pop">
        <div 
          v-if="activeEvent"
          class="absolute z-20 transform -translate-x-1/2 -translate-y-full mb-4"
          :style="{ left: activeEvent.x + '%', top: activeEvent.y + '%' }"
        >
          <!-- Connector Line -->
          <div class="absolute left-1/2 top-full h-4 w-px bg-current" :class="activeEvent.type === 'bearish' ? 'text-red-500' : 'text-emerald-500'"></div>
          <div class="absolute left-1/2 top-full mt-4 w-2 h-2 rounded-full bg-current animate-ping" :class="activeEvent.type === 'bearish' ? 'text-red-500' : 'text-emerald-500'"></div>
          
          <!-- Card -->
          <div 
            class="border rounded p-3 shadow-xl backdrop-blur-md min-w-[180px]"
            :style="{ 
              backgroundColor: tokens.colors.background.surface + 'E6', 
              borderColor: activeEvent.type === 'bearish' ? tokens.colors.semantic.error : tokens.colors.semantic.success 
            }"
          >
            <div class="flex justify-between items-start mb-1">
              <span 
                class="text-[8px] font-bold px-1.5 py-0.5 rounded uppercase"
                :style="{ 
                  backgroundColor: activeEvent.type === 'bearish' ? tokens.colors.semantic.error + '1A' : tokens.colors.semantic.success + '1A',
                  color: activeEvent.type === 'bearish' ? tokens.colors.semantic.error : tokens.colors.semantic.success
                }"
              >
                {{ activeEvent.type }}
              </span>
              <span class="text-[8px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ activeEvent.time }}</span>
            </div>
            <div class="text-xs font-bold mb-1" :style="{ color: tokens.colors.text.primary }">{{ activeEvent.title }}</div>
            <div class="text-[10px]" :style="{ color: tokens.colors.text.secondary }">Impact: <span class="font-mono font-bold">{{ activeEvent.impact }}</span></div>
          </div>
        </div>
      </transition>

      <!-- Summary Markers (Persistent after replay) -->
      <div v-if="isReplayFinished">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="absolute w-3 h-3 rounded-full border-2 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
          :style="{ 
            left: event.x + '%', 
            top: event.y + '%',
            borderColor: event.type === 'bearish' ? tokens.colors.semantic.error : tokens.colors.semantic.success,
            backgroundColor: tokens.colors.background.base
          }"
        >
          <div class="w-1 h-1 rounded-full" :style="{ backgroundColor: event.type === 'bearish' ? tokens.colors.semantic.error : tokens.colors.semantic.success }"></div>
        </div>
      </div>

    </div>

    <!-- Timeline Scrubber -->
    <div class="h-8 border-t relative" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <!-- Progress Bar -->
      <div class="absolute top-0 left-0 bottom-0 bg-cyan-500/10 transition-all duration-75 ease-linear" :style="{ width: progress + '%' }"></div>
      <!-- Scrubber Head -->
      <div 
        class="absolute top-0 bottom-0 w-0.5 bg-cyan-500 transition-all duration-75 ease-linear z-10"
        :style="{ left: progress + '%' }"
      >
        <div class="absolute -top-1 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-cyan-500"></div>
      </div>
      <!-- Time Markers -->
      <div class="absolute inset-0 flex justify-between items-center px-4 text-[8px] font-mono" :style="{ color: tokens.colors.text.disabled }">
        <span>09:30</span>
        <span>12:00</span>
        <span>16:00</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()

// Data Points (0-100 scale for simplicity in SVG viewBox 400x200)
// X: 0-400, Y: 0-200 (inverted, 200 is bottom)
const fullPathPoints = [
  { x: 0, y: 100 }, { x: 20, y: 95 }, { x: 40, y: 98 }, { x: 60, y: 90 }, // Start
  { x: 80, y: 92 }, { x: 100, y: 85 }, { x: 120, y: 140 }, // Drop (Event 1 at x=120)
  { x: 140, y: 145 }, { x: 160, y: 150 }, { x: 180, y: 148 }, { x: 200, y: 155 }, // Bottom
  { x: 220, y: 130 }, { x: 240, y: 110 }, { x: 260, y: 90 }, // Recovery (Event 2 at x=260)
  { x: 280, y: 85 }, { x: 300, y: 80 }, { x: 320, y: 75 }, { x: 340, y: 78 },
  { x: 360, y: 70 }, { x: 380, y: 65 }, { x: 400, y: 60 } // End
]

const events = [
  { id: 1, x: 30, y: 70, time: '10:30', title: 'Fed Rate Hint', type: 'bearish', impact: '-2.4%' }, // x=120 is 30% of 400
  { id: 2, x: 65, y: 45, time: '14:15', title: 'Sector Rotation', type: 'bullish', impact: '+1.8%' }  // x=260 is 65% of 400
]

// State
const progress = ref(0)
const currentPoints = ref([])
const activeEvent = ref(null)
const isReplayFinished = ref(false)
const currentTimeStr = ref('09:30:00')

// Animation
let animationFrame
let startTime
const duration = 8000 // 8 seconds full replay

const updateTimeStr = (p) => {
  const totalMinutes = 390 // 6.5 hours trading day
  const currentMinutes = Math.floor(totalMinutes * (p / 100))
  const hour = 9 + Math.floor((30 + currentMinutes) / 60)
  const minute = (30 + currentMinutes) % 60
  currentTimeStr.value = `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00`
}

const animate = (timestamp) => {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime
  
  // Loop
  if (elapsed > duration + 2000) { // +2s pause at end
    startTime = timestamp
    progress.value = 0
    currentPoints.value = []
    activeEvent.value = null
    isReplayFinished.value = false
    requestAnimationFrame(animate)
    return
  }

  // Calculate Progress (0-100)
  // Pause logic for events
  let rawProgress = Math.min((elapsed / duration) * 100, 100)
  
  // Event 1 Pause (around 30%)
  if (rawProgress > 30 && rawProgress < 35) {
    // Slow down visually or just show popup
    activeEvent.value = events[0]
  } else if (rawProgress > 65 && rawProgress < 70) {
    // Event 2 Pause (around 65%)
    activeEvent.value = events[1]
  } else {
    activeEvent.value = null
  }

  progress.value = rawProgress
  updateTimeStr(rawProgress)

  // Calculate Path
  const maxIndex = Math.floor((rawProgress / 100) * fullPathPoints.length)
  // Interpolate between points for smoothness could be added here, but simple slice is okay for preview
  currentPoints.value = fullPathPoints.slice(0, maxIndex + 1)

  if (rawProgress >= 100) {
    isReplayFinished.value = true
  }

  animationFrame = requestAnimationFrame(animate)
}

// Computed Paths
const currentPath = computed(() => {
  if (currentPoints.value.length < 2) return ''
  // Simple line generator
  let d = `M ${currentPoints.value[0].x} ${currentPoints.value[0].y}`
  for (let i = 1; i < currentPoints.value.length; i++) {
    // Smooth curve (Catmull-Rom or simple Bezier could be better, but L is fast)
    // Let's use simple L for now, or a basic curve if needed. 
    // For "Pilot" style, sharp lines are actually okay, but let's do simple curve
    const p = currentPoints.value[i]
    const prev = currentPoints.value[i-1]
    const cp1x = prev.x + (p.x - prev.x) / 2
    const cp1y = prev.y
    const cp2x = prev.x + (p.x - prev.x) / 2
    const cp2y = p.y
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`
  }
  return d
})

const currentAreaPath = computed(() => {
  if (currentPoints.value.length < 2) return ''
  const lastPoint = currentPoints.value[currentPoints.value.length - 1]
  return `${currentPath.value} L ${lastPoint.x} 200 L 0 200 Z`
})

onMounted(() => {
  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, -80%) scale(0.8);
}
</style>