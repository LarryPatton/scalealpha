<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Header -->
    <div class="px-4 py-3 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
        <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Strategy Cockpit</span>
      </div>
      <div class="flex gap-2">
        <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">SYSTEM READY</span>
      </div>
    </div>

    <!-- Main Content: Split View -->
    <div class="flex-1 flex overflow-hidden relative">
      
      <!-- Left: Targeting (Asset Selection) -->
      <div class="w-1/3 border-r flex flex-col p-0 relative" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
        <!-- Radar Scan Effect -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <div class="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] animate-scan-vertical"></div>
        </div>

        <div class="p-3 border-b" :style="{ borderColor: tokens.colors.border.subtle }">
          <div class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">Target Acquisition</div>
          <div class="relative">
            <input type="text" placeholder="Search Asset..." class="w-full bg-transparent border rounded px-2 py-1 text-xs focus:outline-none" :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }">
            <div class="absolute right-2 top-1.5 w-2 h-2 border-r border-b border-cyan-500"></div>
          </div>
        </div>

        <div class="flex-1 overflow-hidden p-2 space-y-1">
          <div 
            v-for="asset in assets" 
            :key="asset.symbol"
            class="p-2 rounded border transition-all duration-300 cursor-pointer relative group"
            :class="selectedAsset === asset.symbol ? 'border-cyan-500 bg-cyan-900/20' : 'border-transparent hover:border-gray-700'"
            :id="`asset-${asset.symbol}`"
          >
            <!-- Target Lock Corners -->
            <div v-if="selectedAsset === asset.symbol" class="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-500"></div>
            <div v-if="selectedAsset === asset.symbol" class="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-500"></div>
            <div v-if="selectedAsset === asset.symbol" class="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-500"></div>
            <div v-if="selectedAsset === asset.symbol" class="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-500"></div>

            <div class="flex justify-between items-center relative z-10">
              <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ asset.symbol }}</span>
              <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ asset.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Control Panel (Configuration) -->
      <div class="flex-1 flex flex-col p-6 relative" :style="{ backgroundColor: tokens.colors.background.surface }">
        <!-- Overlay for Disabled State -->
        <div 
          v-if="!selectedAsset" 
          class="absolute inset-0 z-20 backdrop-blur-sm flex items-center justify-center"
          :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.5)' }"
        >
          <div class="text-xs font-mono text-cyan-500 animate-pulse">WAITING FOR TARGET LOCK...</div>
        </div>

        <div class="space-y-6 transition-opacity duration-500" :class="selectedAsset ? 'opacity-100' : 'opacity-30'">
          
          <!-- Frameworks -->
          <div>
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-xs font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Analysis Frameworks</h3>
              <div class="flex gap-1">
                <div class="w-1 h-1 rounded-full bg-cyan-500"></div>
                <div class="w-1 h-1 rounded-full bg-cyan-500"></div>
                <div class="w-1 h-1 rounded-full bg-cyan-500"></div>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-3">
              <div 
                v-for="fw in frameworks" 
                :key="fw.id"
                :id="`fw-${fw.id}`"
                class="border rounded p-3 flex flex-col items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                :class="config.frameworks.includes(fw.id) ? 'border-cyan-500 bg-cyan-900/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'border-gray-700 bg-black/20'"
              >
                <span class="text-xl">{{ fw.icon }}</span>
                <span class="text-[10px] font-bold" :class="config.frameworks.includes(fw.id) ? 'text-cyan-400' : 'text-gray-500'">{{ fw.label }}</span>
                <!-- Active Indicator -->
                <div v-if="config.frameworks.includes(fw.id)" class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]"></div>
              </div>
            </div>
          </div>

          <!-- Parameters Row -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Time Horizon -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">Time Horizon</div>
              <div class="flex border rounded p-1" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
                <div 
                  v-for="t in ['Short', 'Medium', 'Long']" 
                  :key="t"
                  :id="`time-${t}`"
                  class="flex-1 py-1.5 text-center text-[10px] font-bold rounded-sm transition-all duration-300"
                  :class="config.time === t ? 'bg-cyan-600 text-white shadow-md' : 'text-gray-500'"
                >
                  {{ t }}
                </div>
              </div>
            </div>

            <!-- Risk Profile -->
            <div>
              <div class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">Risk Profile</div>
              <div class="relative h-8 flex items-center px-2 border rounded" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
                <div class="absolute left-2 right-2 h-1 bg-gray-700 rounded-full"></div>
                <div 
                  id="risk-slider"
                  class="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300 z-10"
                  :style="{ left: config.risk === 'Low' ? '10%' : (config.risk === 'Med' ? '50%' : '90%') }"
                ></div>
                <div class="absolute left-2 right-2 flex justify-between text-[8px] text-gray-500 font-mono mt-5">
                  <span>LOW</span><span>MED</span><span>HIGH</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Generate Button -->
          <div class="pt-4">
            <div 
              id="generate-btn"
              class="w-full py-4 rounded border relative overflow-hidden transition-all duration-300 group"
              :class="isGenerating ? 'border-cyan-500 bg-cyan-900/30' : 'border-cyan-600 bg-cyan-600 hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]'"
            >
              <!-- Progress Bar -->
              <div 
                v-if="isGenerating" 
                class="absolute top-0 left-0 h-full bg-cyan-500/20 transition-all duration-100 ease-linear"
                :style="{ width: generateProgress + '%' }"
              ></div>
              
              <div class="relative z-10 flex items-center justify-center gap-2">
                <span 
                  class="text-xs font-bold uppercase tracking-[0.2em]" 
                  :class="isGenerating ? 'text-cyan-400' : 'text-white'"
                >
                  {{ isGenerating ? 'INITIALIZING STRATEGY...' : 'INITIATE GENERATION' }}
                </span>
                <svg v-if="!isGenerating" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
            </div>
          </div>

        </div>
      </div>

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
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens, isDark } = useTheme()

// Data
const assets = [
  { symbol: 'NVDA', name: 'NVIDIA Corp' },
  { symbol: 'TSLA', name: 'Tesla Inc' },
  { symbol: 'AAPL', name: 'Apple Inc' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'AMD', name: 'Adv Micro Dev' },
]

const frameworks = [
  { id: 'tech', label: 'Technical', icon: '📊' },
  { id: 'fund', label: 'Fundamental', icon: '📈' },
  { id: 'quant', label: 'Quant', icon: '🤖' },
  { id: 'sent', label: 'Sentiment', icon: '📰' },
]

// State
const selectedAsset = ref(null)
const config = ref({
  frameworks: [],
  time: 'Medium',
  risk: 'Med'
})
const isGenerating = ref(false)
const generateProgress = ref(0)

// Animation State
const cursorPosition = ref({ x: 50, y: 50 })
const isClicking = ref(false)

// Animation Loop
const runAnimation = () => {
  const sequence = [
    // 1. Move to NVDA
    { action: 'move', x: 100, y: 100, duration: 1000 },
    { action: 'click', target: 'asset-NVDA', duration: 300 },
    { action: 'wait', duration: 500 },
    
    // 2. Toggle Frameworks
    { action: 'move', x: 300, y: 120, duration: 800 }, // Tech
    { action: 'click', target: 'fw-tech', duration: 300 },
    { action: 'move', x: 450, y: 120, duration: 500 }, // Quant
    { action: 'click', target: 'fw-quant', duration: 300 },
    
    // 3. Set Time
    { action: 'move', x: 300, y: 250, duration: 800 }, // Short
    { action: 'click', target: 'time-Short', duration: 300 },
    
    // 4. Set Risk
    { action: 'move', x: 500, y: 250, duration: 800 }, // High Risk
    { action: 'click', target: 'risk-High', duration: 300 },
    
    // 5. Generate
    { action: 'move', x: 400, y: 350, duration: 1000 },
    { action: 'click', target: 'generate', duration: 300 },
    { action: 'wait', duration: 2000 }, // Wait for generation simulation
    
    // 6. Reset
    { action: 'reset', duration: 500 }
  ]

  let step = 0
  
  const executeStep = () => {
    if (step >= sequence.length) {
      step = 0 // Loop
    }
    
    const currentStep = sequence[step]
    
    if (currentStep.action === 'move') {
      cursorPosition.value = { x: currentStep.x, y: currentStep.y }
    } else if (currentStep.action === 'click') {
      isClicking.value = true
      setTimeout(() => {
        isClicking.value = false
        // Logic
        if (currentStep.target === 'asset-NVDA') selectedAsset.value = 'NVDA'
        if (currentStep.target === 'fw-tech') toggleFramework('tech')
        if (currentStep.target === 'fw-quant') toggleFramework('quant')
        if (currentStep.target === 'time-Short') config.value.time = 'Short'
        if (currentStep.target === 'risk-High') config.value.risk = 'High'
        if (currentStep.target === 'generate') startGeneration()
      }, 150)
    } else if (currentStep.action === 'reset') {
      resetState()
    }

    step++
    setTimeout(executeStep, currentStep.duration)
  }

  executeStep()
}

const toggleFramework = (id) => {
  const idx = config.value.frameworks.indexOf(id)
  if (idx === -1) config.value.frameworks.push(id)
  else config.value.frameworks.splice(idx, 1)
}

const startGeneration = () => {
  isGenerating.value = true
  generateProgress.value = 0
  const interval = setInterval(() => {
    generateProgress.value += 5
    if (generateProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isGenerating.value = false
      }, 500)
    }
  }, 50)
}

const resetState = () => {
  selectedAsset.value = null
  config.value = { frameworks: [], time: 'Medium', risk: 'Med' }
  isGenerating.value = false
  generateProgress.value = 0
}

onMounted(() => {
  runAnimation()
})
</script>

<style scoped>
@keyframes scan-vertical {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.animate-scan-vertical {
  animation: scan-vertical 3s linear infinite;
}
</style>