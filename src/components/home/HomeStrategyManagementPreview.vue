<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Header -->
    <div class="px-4 py-3 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full animate-pulse" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
        <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Mission Control</span>
      </div>
      <div class="flex gap-3">
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Active: {{ activeStrategies.length }}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Building: {{ generationQueue.length }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content: Split View -->
    <div class="flex-1 flex overflow-hidden">
      
      <!-- Left: Fabrication Bay (Generation Queue) -->
      <div class="w-1/3 border-r flex flex-col p-3 gap-3" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
        <div class="text-[10px] font-bold uppercase tracking-wider mb-1 flex justify-between" :style="{ color: tokens.colors.text.muted }">
          <span>Fabrication Bay</span>
          <span class="text-cyan-500">{{ generationQueue.length > 0 ? 'BUSY' : 'IDLE' }}</span>
        </div>
        
        <transition-group name="list" tag="div" class="flex flex-col gap-2 relative h-full">
          <div 
            v-for="task in generationQueue" 
            :key="task.id"
            class="border rounded p-3 relative overflow-hidden group"
            :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.accent.primary + '4D' }"
          >
            <div class="flex justify-between items-center mb-2 relative z-10">
              <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ task.symbol }}</span>
              <span class="text-[8px] font-mono" :style="{ color: tokens.colors.accent.primary }">{{ task.progress }}%</span>
            </div>
            <!-- Progress Bar -->
            <div class="h-1.5 rounded-full overflow-hidden relative z-10" :style="{ backgroundColor: tokens.colors.border.default }">
              <div 
                class="h-full transition-all duration-100 ease-linear" 
                :style="{ width: task.progress + '%', backgroundColor: tokens.colors.accent.primary }"
              ></div>
            </div>
            <!-- Status Text -->
            <div class="text-[8px] mt-1 font-mono relative z-10" :style="{ color: tokens.colors.text.muted }">
              {{ task.status }}
            </div>
            
            <!-- Background Pulse -->
            <div class="absolute inset-0 bg-cyan-500/5 animate-pulse z-0"></div>
          </div>
          
          <!-- Empty State Placeholder -->
          <div v-if="generationQueue.length === 0" class="absolute inset-0 flex items-center justify-center border-2 border-dashed rounded opacity-20" :style="{ borderColor: tokens.colors.border.strong }">
            <span class="text-[10px]">Queue Empty</span>
          </div>
        </transition-group>
      </div>

      <!-- Right: Active Fleet (Strategy List) -->
      <div class="flex-1 flex flex-col p-3 gap-3 relative overflow-hidden" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div class="text-[10px] font-bold uppercase tracking-wider mb-1 flex justify-between" :style="{ color: tokens.colors.text.muted }">
          <span>Active Fleet</span>
          <span>Signal Strength: 98%</span>
        </div>

        <transition-group name="fleet" tag="div" class="flex flex-col gap-2">
          <div 
            v-for="strategy in activeStrategies" 
            :key="strategy.id"
            class="border rounded p-3 flex items-center justify-between relative overflow-hidden transition-all duration-500"
            :class="[
              strategy.isNew ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : '',
              strategy.needsUpdate ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-gray-800'
            ]"
            :style="{ backgroundColor: tokens.colors.background.elevated }"
          >
            <!-- Scanner Effect for New Items -->
            <div v-if="strategy.isNew" class="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-scan pointer-events-none"></div>

            <div class="flex items-center gap-3 relative z-10">
               <div 
                 class="w-8 h-8 rounded flex items-center justify-center text-xs font-bold border transition-colors"
                 :class="strategy.needsUpdate ? 'animate-bounce' : ''"
                 :style="{ 
                   backgroundColor: tokens.colors.background.base, 
                   borderColor: strategy.needsUpdate ? tokens.colors.semantic.warning : tokens.colors.border.default, 
                   color: strategy.needsUpdate ? tokens.colors.semantic.warning : tokens.colors.text.primary
                 }"
               >{{ strategy.symbol }}</div>
               <div>
                  <div class="text-xs font-bold transition-colors" :style="{ color: tokens.colors.text.primary }">{{ strategy.name }}</div>
                  <div class="text-[10px] flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                    <span>{{ strategy.type }}</span>
                    <span v-if="strategy.isNew" class="text-emerald-400 font-bold animate-pulse">NEW ENTRY</span>
                    <span v-if="strategy.needsUpdate" class="text-amber-400 font-bold cursor-pointer hover:underline" @click="refreshStrategy(strategy)">UPDATE NEEDED</span>
                  </div>
               </div>
            </div>
            <div class="text-right relative z-10">
               <div class="font-bold text-xs transition-transform" :class="strategy.isNew ? 'scale-110 text-emerald-400' : 'text-emerald-500'">{{ strategy.pnl }}%</div>
               <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">P&L</div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()

// Data Models
const generationQueue = ref([])
const activeStrategies = ref([
  { id: 's1', symbol: 'AAPL', name: 'Apple Long', type: 'Tech • 2W', pnl: '+12.4', isNew: false, needsUpdate: false },
  { id: 's2', symbol: 'MSFT', name: 'MSFT Breakout', type: 'Tech • 1M', pnl: '+8.2', isNew: false, needsUpdate: false },
  { id: 's3', symbol: 'AMZN', name: 'AMZN Mean Rev', type: 'Cons • 3D', pnl: '-1.5', isNew: false, needsUpdate: false },
])

// Animation State
let intervalId
const taskPool = [
  { symbol: 'NVDA', name: 'NVDA Quant', type: 'AI • Short' },
  { symbol: 'TSLA', name: 'TSLA Reversal', type: 'Auto • Med' },
  { symbol: 'GOOG', name: 'Alpha Search', type: 'Tech • Long' },
  { symbol: 'META', name: 'Meta Verse', type: 'Social • Long' }
]
let poolIndex = 0

// Simulation Logic
const startSimulation = () => {
  // 1. Add a task to queue
  const addTask = () => {
    if (generationQueue.value.length < 2) {
      const template = taskPool[poolIndex % taskPool.length]
      poolIndex++
      generationQueue.value.push({
        id: Date.now(),
        ...template,
        progress: 0,
        status: 'Initializing...'
      })
    }
  }

  // 2. Process Queue
  const processQueue = () => {
    generationQueue.value.forEach((task, index) => {
      if (task.progress < 100) {
        task.progress += 2 // Speed of progress
        if (task.progress < 30) task.status = 'Optimizing...'
        else if (task.progress < 60) task.status = 'Backtesting...'
        else if (task.progress < 90) task.status = 'Finalizing...'
        else task.status = 'Deploying...'
      } else {
        // Task Complete: Move to Fleet
        generationQueue.value.splice(index, 1)
        deployStrategy(task)
      }
    })
  }

  // 3. Deploy Strategy (Fly-in effect)
  const deployStrategy = (task) => {
    const newStrategy = {
      id: task.id,
      symbol: task.symbol,
      name: task.name,
      type: task.type,
      pnl: '0.0',
      isNew: true,
      needsUpdate: false
    }
    activeStrategies.value.unshift(newStrategy)
    if (activeStrategies.value.length > 4) activeStrategies.value.pop() // Keep list short

    // Remove "New" status after a while
    setTimeout(() => {
      newStrategy.isNew = false
    }, 3000)
  }

  // 4. Trigger Random Update Needed
  const triggerUpdate = () => {
    const target = activeStrategies.value.find(s => !s.isNew && !s.needsUpdate)
    if (target) {
      target.needsUpdate = true
    }
  }

  // Main Loop
  let tick = 0
  intervalId = setInterval(() => {
    tick++
    processQueue()
    
    if (tick % 100 === 0) addTask() // Add task every ~3s
    if (tick % 250 === 0) triggerUpdate() // Trigger update every ~8s
    
  }, 30) // 30ms tick

  // Initial Task
  addTask()
}

const refreshStrategy = (strategy) => {
  // Move back to queue
  activeStrategies.value = activeStrategies.value.filter(s => s.id !== strategy.id)
  generationQueue.value.push({
    id: strategy.id,
    symbol: strategy.symbol,
    name: strategy.name,
    type: strategy.type,
    progress: 0,
    status: 'Re-calibrating...'
  })
}

onMounted(() => {
  startSimulation()
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fleet-enter-active,
.fleet-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy */
}
.fleet-enter-from {
  opacity: 0;
  transform: translateX(-50px) scale(0.8);
}
.fleet-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.fleet-move {
  transition: transform 0.5s ease;
}

/* Scanner Animation */
@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-scan {
  animation: scan 1.5s linear infinite;
}
</style>