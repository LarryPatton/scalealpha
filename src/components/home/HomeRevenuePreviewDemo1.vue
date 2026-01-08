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
      <div class="flex-1 p-3 flex flex-col items-center justify-center border-r transition-colors duration-300" :style="{ borderColor: tokens.colors.border.default }">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">总盈亏</div>
        <div 
          class="text-xl font-bold tracking-tight transition-all duration-300"
          :style="{ color: animationComplete && winnerModel ? (winnerModel.profitAmount >= 0 ? tokens.colors.accent.success : tokens.colors.accent.danger) : tokens.colors.text.muted }"
        >
          {{ animationComplete && winnerModel ? (winnerModel.profitAmount >= 0 ? '+' : '') + '$' + Math.abs(winnerModel.profitAmount).toLocaleString() : '--' }}
        </div>
      </div>
      <!-- Metric 2: Return -->
      <div class="flex-1 p-3 flex flex-col items-center justify-center border-r transition-colors duration-300" :style="{ borderColor: tokens.colors.border.default }">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">收益率</div>
        <div 
          class="text-xl font-bold tracking-tight transition-all duration-300"
          :style="{ color: animationComplete && winnerModel ? (winnerModel.return >= 0 ? tokens.colors.accent.success : tokens.colors.accent.danger) : tokens.colors.text.muted }"
        >
          {{ animationComplete && winnerModel ? (winnerModel.return >= 0 ? '+' : '') + winnerModel.return.toFixed(1) + '%' : '--' }}
        </div>
      </div>
      <!-- Metric 3: Best Model -->
      <div class="flex-1 p-3 flex flex-col items-center justify-center">
        <div class="text-[10px] mb-1 font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">最佳模型</div>
        <div 
          class="text-sm font-bold tracking-tight flex items-center gap-2 transition-all duration-300"
          :style="{ color: animationComplete && winnerModel ? winnerModel.color : tokens.colors.text.muted }"
        >
          <span 
            v-if="animationComplete && winnerModel" 
            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
            :style="{ backgroundColor: winnerModel.color }"
          ></span>
          <span class="truncate">{{ animationComplete && winnerModel ? winnerModel.name : '--' }}</span>
        </div>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="flex-1 relative transition-colors duration-300 flex flex-col" :style="{ backgroundColor: tokens.colors.background.base }">
      <!-- Chart Header -->
      <div class="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div 
          class="text-xs font-bold flex items-center backdrop-blur px-2 py-1 rounded border transition-colors duration-300"
          :style="{ 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)', 
            borderColor: tokens.colors.border.default,
            color: tokens.colors.text.secondary
          }"
        >
          <span class="mr-1.5">📈</span>
          AI模型收益对比
        </div>
      </div>

      <!-- Replay Button -->
      <button 
        v-if="animationComplete"
        @click="replayAnimation"
        class="absolute top-3 right-3 z-10 text-[10px] font-medium px-2 py-1 rounded border transition-all hover:scale-105"
        :style="{ 
          backgroundColor: tokens.colors.background.elevated, 
          borderColor: tokens.colors.border.default,
          color: tokens.colors.text.secondary
        }"
      >
        🔄 重播
      </button>

      <!-- SVG Chart - Main Area -->
      <div class="flex-1 px-3 pt-10 pb-2">
        <svg 
          ref="chartSvg"
          class="w-full h-full overflow-visible" 
          preserveAspectRatio="xMidYMid meet" 
          :viewBox="`0 0 ${chartWidth} ${chartHeight}`"
        >
          <defs>
            <!-- Gradients for each model -->
            <linearGradient 
              v-for="model in models" 
              :key="'grad-' + model.name"
              :id="'grad-' + model.name.replace(/[^a-zA-Z0-9]/g, '')"
              x1="0%" y1="0%" x2="0%" y2="100%"
            >
              <stop offset="0%" :style="{ stopColor: model.color, stopOpacity: 0.25 }" />
              <stop offset="100%" :style="{ stopColor: model.color, stopOpacity: 0 }" />
            </linearGradient>

            <!-- Glow filter for winner -->
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Grid Lines -->
          <g :stroke="tokens.colors.border.subtle" stroke-width="1" opacity="0.4">
            <line :x1="leftPadding" :y1="chartHeight * 0.15" :x2="chartWidth - rightPadding" :y2="chartHeight * 0.15" />
            <line :x1="leftPadding" :y1="chartHeight * 0.35" :x2="chartWidth - rightPadding" :y2="chartHeight * 0.35" />
            <line :x1="leftPadding" :y1="chartHeight * 0.55" :x2="chartWidth - rightPadding" :y2="chartHeight * 0.55" />
            <line :x1="leftPadding" :y1="chartHeight * 0.75" :x2="chartWidth - rightPadding" :y2="chartHeight * 0.75" />
            <line :x1="leftPadding" :y1="chartHeight * 0.95" :x2="chartWidth - rightPadding" :y2="chartHeight * 0.95" />
          </g>

          <!-- Y-Axis Labels (Left Side) -->
          <g :fill="tokens.colors.text.muted" font-size="9" font-family="monospace">
            <text :x="leftPadding - 4" :y="chartHeight * 0.15 + 3" text-anchor="end">+40%</text>
            <text :x="leftPadding - 4" :y="chartHeight * 0.35 + 3" text-anchor="end">+20%</text>
            <text :x="leftPadding - 4" :y="chartHeight * 0.55 + 3" text-anchor="end">0%</text>
            <text :x="leftPadding - 4" :y="chartHeight * 0.75 + 3" text-anchor="end">-20%</text>
            <text :x="leftPadding - 4" :y="chartHeight * 0.95 + 3" text-anchor="end">-40%</text>
          </g>

          <!-- Baseline (0% return) - More prominent -->
          <line 
            :x1="leftPadding" :y1="chartHeight * 0.55" 
            :x2="chartWidth - rightPadding" :y2="chartHeight * 0.55" 
            :stroke="tokens.colors.text.muted" 
            stroke-width="1" 
            opacity="0.6"
          />

          <!-- Model Lines (sorted so winner is on top) -->
          <g v-for="(model, index) in modelsSortedByReturn" :key="model.name">
            <!-- Line -->
            <path 
              v-if="model.animationProgress > 0"
              :d="getLinePath(model)"
              fill="none"
              :stroke="model.color"
              :stroke-width="model === winnerModel && animationComplete ? 3 : 1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              :opacity="model === winnerModel || !animationComplete ? 1 : 0.7"
              :filter="model === winnerModel && animationComplete ? 'url(#glow)' : ''"
            />

            <!-- Moving Dot -->
            <g v-if="model.animationProgress > 0 && model.animationProgress < 1">
              <circle 
                :cx="getCurrentDotPosition(model).x"
                :cy="getCurrentDotPosition(model).y"
                r="6"
                :fill="model.color"
                opacity="0.3"
              />
              <circle 
                :cx="getCurrentDotPosition(model).x"
                :cy="getCurrentDotPosition(model).y"
                r="3"
                :fill="model.color"
              />
            </g>

            <!-- End Point for completed lines -->
            <g v-if="model.animationProgress >= 1">
              <circle 
                :cx="getEndX()"
                :cy="getYPosition(model.return)"
                :r="model === winnerModel ? 5 : 3"
                :fill="model.color"
              />
              <circle 
                v-if="model === winnerModel"
                :cx="getEndX()"
                :cy="getYPosition(model.return)"
                r="2"
                fill="white"
              />
            </g>
          </g>

          <!-- Winner Label (Small, non-intrusive) -->
          <g v-if="animationComplete && winnerModel">
            <rect 
              :x="getEndX() + 6"
              :y="getYPosition(winnerModel.return) - 8"
              width="50"
              height="16"
              rx="3"
              :fill="winnerModel.color"
            />
            <text 
              :x="getEndX() + 31"
              :y="getYPosition(winnerModel.return) + 4"
              text-anchor="middle"
              fill="white"
              font-size="9"
              font-weight="bold"
            >
              🏆 {{ winnerModel.return > 0 ? '+' : '' }}{{ winnerModel.return.toFixed(1) }}%
            </text>
          </g>
        </svg>
      </div>

      <!-- Legend (Below Chart) -->
      <div class="px-3 pb-3 flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
        <div 
          v-for="model in models" 
          :key="model.name"
          class="flex items-center gap-1.5 text-[10px] font-medium transition-all duration-300"
          :style="{ 
            color: tokens.colors.text.muted,
            opacity: model.animationProgress > 0 ? 1 : 0.4
          }"
        >
          <span 
            class="w-2 h-2 rounded-full flex-shrink-0" 
            :style="{ backgroundColor: model.color }"
          ></span>
          <span class="whitespace-nowrap">{{ model.name }}</span>
          <span 
            v-if="model.animationProgress >= 1" 
            class="font-mono"
            :style="{ color: model.return >= 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }"
          >
            {{ model.return >= 0 ? '+' : '' }}{{ model.return.toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens, isDark } = useTheme()

// Chart dimensions
const chartWidth = 400
const chartHeight = 180
const leftPadding = 35
const rightPadding = 60
const chartSvg = ref(null)

// Animation state
const animationComplete = ref(false)
let animationFrameId = null

// Models data with animation progress
const models = ref([
  { name: 'gemini-3-pro', color: '#8B5CF6', return: -27.1, profitAmount: -2715, animationProgress: 0 },
  { name: 'qwen5-max', color: '#EC4899', return: -33.2, profitAmount: -3316, animationProgress: 0 },
  { name: 'gpt-5.1', color: '#10B981', return: -4.8, profitAmount: -482, animationProgress: 0 },
  { name: 'grok-4.20', color: '#F472B6', return: 22.7, profitAmount: 2273, animationProgress: 0 },
  { name: 'deepseek-v3.1', color: '#3B82F6', return: -23.3, profitAmount: -2330, animationProgress: 0 },
  { name: 'claude-4.5', color: '#14B8A6', return: -35.6, profitAmount: -3557, animationProgress: 0 },
  { name: 'kimi-k2', color: '#F59E0B', return: -33.1, profitAmount: -3311, animationProgress: 0 }
])

// Sort models by return (best performer last for visual layering)
const modelsSortedByReturn = computed(() => {
  return [...models.value].sort((a, b) => a.return - b.return)
})

// Winner is the model with highest return
const winnerModel = computed(() => {
  return models.value.reduce((best, current) => 
    current.return > best.return ? current : best
  , models.value[0])
})

// Get chart end X position
const getEndX = () => chartWidth - rightPadding

// Generate curve data points for each model using realistic financial simulation
const generateCurveData = (model) => {
  const points = 100
  const data = []
  const finalReturn = model.return
  
  // Seed random based on model name for consistency
  const seed = model.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const seededRandom = (i) => {
    const x = Math.sin(seed * 9999 + i * 7919) * 10000
    return x - Math.floor(x)
  }
  
  // Model-specific volatility characteristics
  const volatilityMap = {
    'gemini-3-pro': { daily: 0.015, trend: 0.6 },
    'qwen5-max': { daily: 0.02, trend: 0.5 },
    'gpt-5.1': { daily: 0.01, trend: 0.8 },
    'grok-4.20': { daily: 0.018, trend: 0.7 },
    'deepseek-v3.1': { daily: 0.016, trend: 0.55 },
    'claude-4.5': { daily: 0.022, trend: 0.45 },
    'kimi-k2': { daily: 0.018, trend: 0.5 }
  }
  
  const modelVol = volatilityMap[model.name] || { daily: 0.015, trend: 0.6 }
  
  // Calculate required drift to reach final return
  const totalDrift = Math.log(1 + finalReturn / 100)
  const driftPerStep = totalDrift / points
  
  // Generate path using geometric Brownian motion style
  let cumulativeReturn = 0
  const returns = [0]
  
  for (let i = 1; i <= points; i++) {
    const progress = i / points
    
    // Random component (Wiener process approximation using Box-Muller)
    const u1 = seededRandom(i * 2) || 0.0001
    const u2 = seededRandom(i * 2 + 1) || 0.0001
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.5
    
    // Volatility that varies over time (volatility clustering)
    const volMultiplier = 1 + 0.3 * Math.sin(progress * Math.PI * 4 + seed * 0.1)
    const currentVol = modelVol.daily * volMultiplier
    
    // Drift component (trends toward final value)
    const remainingDrift = totalDrift - cumulativeReturn
    const remainingSteps = points - i + 1
    const adaptiveDrift = driftPerStep * modelVol.trend + remainingDrift * (1 - modelVol.trend) / remainingSteps
    
    // Combined return for this step
    const stepReturn = adaptiveDrift + currentVol * z
    cumulativeReturn += stepReturn
    
    returns.push(cumulativeReturn)
  }
  
  // Multi-pass smoothing for professional look
  let smoothedReturns = [...returns]
  for (let pass = 0; pass < 3; pass++) {
    const temp = [smoothedReturns[0]]
    for (let i = 1; i < smoothedReturns.length - 1; i++) {
      temp.push((smoothedReturns[i-1] + smoothedReturns[i] * 2 + smoothedReturns[i+1]) / 4)
    }
    temp.push(smoothedReturns[smoothedReturns.length - 1])
    smoothedReturns = temp
  }
  
  // Adjust to ensure we hit the exact final return
  const actualFinal = smoothedReturns[smoothedReturns.length - 1]
  const adjustment = (totalDrift - actualFinal)
  
  // Convert to data points
  for (let i = 0; i <= points; i++) {
    const progress = i / points
    const x = leftPadding + (chartWidth - leftPadding - rightPadding) * progress
    
    // Gradually apply adjustment toward the end
    const adjustedReturn = smoothedReturns[i] + adjustment * Math.pow(progress, 2)
    
    // Convert log return to percentage
    const percentReturn = (Math.exp(adjustedReturn) - 1) * 100
    
    // Convert return to Y position
    const y = getYPosition(percentReturn)
    
    data.push({ x, y, return: percentReturn })
  }
  
  return data
}

// Cache curve data
const curveDataCache = new Map()
const getCurveData = (model) => {
  if (!curveDataCache.has(model.name)) {
    curveDataCache.set(model.name, generateCurveData(model))
  }
  return curveDataCache.get(model.name)
}

// Get Y position for a return value (range: -40% to +40%)
const getYPosition = (returnValue) => {
  // Map return from [-40, +40] to [0.95, 0.15] of chart height
  const normalizedReturn = Math.max(-40, Math.min(40, returnValue))
  const ratio = (normalizedReturn + 40) / 80 // 0 to 1
  return chartHeight * (0.95 - ratio * 0.8)
}

// Get line path for SVG using smooth Catmull-Rom spline
const getLinePath = (model) => {
  const data = getCurveData(model)
  const visiblePoints = Math.ceil(data.length * model.animationProgress)
  
  if (visiblePoints < 2) return ''
  
  const points = data.slice(0, visiblePoints)
  
  if (points.length < 3) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
  }
  
  let path = `M ${points[0].x} ${points[0].y}`
  
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    
    // Catmull-Rom to Cubic Bezier conversion
    const tension = 0.4
    const cp1x = p1.x + (p2.x - p0.x) * tension / 3
    const cp1y = p1.y + (p2.y - p0.y) * tension / 3
    const cp2x = p2.x - (p3.x - p1.x) * tension / 3
    const cp2y = p2.y - (p3.y - p1.y) * tension / 3
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  
  return path
}

// Get current dot position during animation
const getCurrentDotPosition = (model) => {
  const data = getCurveData(model)
  const index = Math.min(Math.floor(data.length * model.animationProgress), data.length - 1)
  return data[index]
}

// Animation logic
const startAnimation = () => {
  animationComplete.value = false
  
  // Reset all models
  models.value.forEach(m => {
    m.animationProgress = 0
  })
  curveDataCache.clear()
  
  const startTime = Date.now()
  const totalDuration = 3500 // 3.5 seconds total
  const staggerDelay = 200 // 200ms delay between each model start
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    let allComplete = true
    
    models.value.forEach((model, index) => {
      const modelStartTime = index * staggerDelay
      const modelElapsed = elapsed - modelStartTime
      
      if (modelElapsed > 0) {
        const modelDuration = totalDuration - modelStartTime
        const progress = Math.min(modelElapsed / modelDuration, 1)
        
        // Easing function for smooth animation
        model.animationProgress = easeOutQuart(progress)
        
        if (model.animationProgress < 1) {
          allComplete = false
        }
      } else {
        allComplete = false
      }
    })
    
    if (!allComplete) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      animationComplete.value = true
    }
  }
  
  animationFrameId = requestAnimationFrame(animate)
}

// Easing function
const easeOutQuart = (t) => {
  return 1 - Math.pow(1 - t, 4)
}

// Replay animation
const replayAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  startAnimation()
}

onMounted(() => {
  // Start animation after a brief delay
  setTimeout(startAnimation, 500)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
</style>