<template>
  <div class="w-full h-full border rounded-lg overflow-hidden flex flex-col shadow-2xl relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
    <!-- Header Bar -->
    <div class="px-4 py-3 border-b flex justify-between items-center shrink-0" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
      <div class="flex items-center gap-3">
        <div class="text-xs font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <span class="text-base">🎯</span>
          主题发现
        </div>
        <div class="text-[10px] px-2 py-0.5 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primaryBg, color: tokens.colors.accent.primary }">
          生命周期追踪
        </div>
      </div>
      <button 
        @click="replayAnimation"
        class="text-[10px] font-medium px-2 py-1 rounded border transition-all hover:scale-105"
        :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
      >
        🔄 重播
      </button>
    </div>

    <!-- Content Grid with 3D Perspective -->
    <div class="flex-1 p-3 overflow-hidden" style="perspective: 1500px;">
      <div class="grid grid-cols-2 gap-3 h-full">
        <div 
          v-for="(card, index) in cards" 
          :key="card.id"
          class="relative"
          style="transform-style: preserve-3d;"
        >
          <!-- Card Container (handles flip) -->
          <div 
            class="w-full h-full transition-transform duration-700 ease-in-out"
            style="transform-style: preserve-3d;"
            :style="{ transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
          >
            <!-- Front Face -->
            <div 
              class="absolute inset-0 backface-hidden border rounded-lg p-3 flex flex-col"
              :style="{ 
                backgroundColor: tokens.colors.background.surface, 
                borderColor: card.isAnimating ? tokens.colors.border.strong : tokens.colors.border.subtle,
                boxShadow: card.isAnimating ? `0 0 20px ${card.color}33` : 'none'
              }"
            >
              <!-- Header: Stage Badge + Progress -->
              <div class="flex items-center gap-2 mb-2">
                <span 
                  class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm shrink-0 transition-all duration-300" 
                  :style="{ 
                    backgroundColor: card.stageLabelVisible ? card.color + '1A' : 'transparent', 
                    color: card.stageLabelVisible ? card.color : 'transparent',
                    transform: card.stageLabelVisible ? 'scale(1)' : 'scale(0.5)'
                  }"
                >
                  {{ card.stage }}
                </span>
                <div class="flex-1 flex items-center gap-0.5">
                  <template v-for="i in 8" :key="i">
                    <div 
                      class="h-1 flex-1 rounded-full transition-all duration-300" 
                      :style="{ 
                        backgroundColor: i <= card.currentProgress ? card.color : tokens.colors.border.subtle,
                        opacity: i <= card.currentProgress ? 1 : 0.3,
                        boxShadow: i === card.currentProgress && card.isAnimating ? `0 0 6px ${card.color}` : 'none'
                      }"
                    ></div>
                  </template>
                </div>
              </div>
              
              <!-- Body: Icon + Title -->
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl">{{ card.icon }}</span>
                <h3 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">{{ card.title }}</h3>
              </div>
              <p class="text-[10px] mb-2 line-clamp-2 leading-relaxed flex-1" :style="{ color: tokens.colors.text.muted }">{{ card.desc }}</p>
              
              <!-- Core Stocks Preview -->
              <div class="flex flex-wrap gap-1 mb-2">
                <span 
                  v-for="stock in card.coreStocks" 
                  :key="stock.symbol" 
                  class="px-1 py-0.5 text-[9px] font-mono font-bold border flex items-center gap-0.5"
                  :style="{ backgroundColor: tokens.colors.background.base, borderColor: '#f59e0b', color: '#f59e0b' }"
                >
                  <span class="text-[7px]">⭐</span>{{ stock.symbol }}
                </span>
                <span 
                  v-if="card.relatedStocks.length > 0"
                  class="px-1 py-0.5 text-[9px] font-mono border"
                  :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.disabled }"
                >
                  +{{ card.relatedStocks.length }}
                </span>
              </div>

              <!-- Footer: Metrics with Animation -->
              <div class="flex items-center justify-between pt-2 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1">
                    <span class="text-[7px] font-bold uppercase" :style="{ color: tokens.colors.text.disabled }">30D</span>
                    <span 
                      class="text-[10px] font-bold tabular-nums transition-all duration-300" 
                      :style="{ color: card.displayChange30d >= 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }"
                    >
                      {{ card.displayChange30d >= 0 ? '+' : '' }}{{ card.displayChange30d.toFixed(1) }}%
                    </span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="text-[7px] font-bold uppercase" :style="{ color: tokens.colors.text.disabled }">1Y</span>
                    <span 
                      class="text-[10px] font-bold tabular-nums transition-all duration-300" 
                      :style="{ color: card.displayChange1y >= 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }"
                    >
                      {{ card.displayChange1y >= 0 ? '+' : '' }}{{ card.displayChange1y.toFixed(1) }}%
                    </span>
                  </div>
                </div>
                <div 
                  class="text-[8px] font-bold uppercase tracking-wide transition-opacity duration-300"
                  :style="{ color: tokens.colors.text.disabled, opacity: card.flipHintVisible ? 1 : 0 }"
                >
                  翻转 →
                </div>
              </div>
            </div>

            <!-- Back Face (Relationship Network) -->
            <div 
              class="absolute inset-0 backface-hidden border rounded-lg p-3 flex flex-col"
              style="transform: rotateY(180deg);"
              :style="{ 
                backgroundColor: tokens.colors.background.base, 
                borderColor: tokens.colors.border.strong
              }"
            >
              <!-- Back Header -->
              <div class="flex items-center justify-between mb-2 shrink-0">
                <div class="flex items-center gap-2">
                  <span class="text-base">{{ card.icon }}</span>
                  <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ card.title }}</span>
                </div>
                <span 
                  class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm" 
                  :style="{ backgroundColor: card.color + '1A', color: card.color }"
                >
                  关联网络
                </span>
              </div>

              <!-- Network Visualization -->
              <div class="flex-1 relative min-h-0">
                <svg class="w-full h-full" :viewBox="`0 0 ${svgWidth} ${svgHeight}`" preserveAspectRatio="xMidYMid meet">
                  <!-- Connection Lines -->
                  <g v-if="card.isFlipped">
                    <!-- Core to Center Lines -->
                    <line 
                      v-for="(stock, i) in card.coreStocks" 
                      :key="'core-line-' + stock.symbol"
                      :x1="centerX" :y1="centerY"
                      :x2="getCorePosition(i, card.coreStocks.length).x"
                      :y2="getCorePosition(i, card.coreStocks.length).y"
                      :stroke="card.color"
                      stroke-width="2"
                      class="transition-opacity duration-500"
                      :opacity="card.linesVisible ? 0.6 : 0"
                    />
                    <!-- Related to Core Lines -->
                    <line 
                      v-for="(stock, i) in card.relatedStocks" 
                      :key="'related-line-' + stock.symbol"
                      :x1="getCorePosition(stock.relatedTo, card.coreStocks.length).x"
                      :y1="getCorePosition(stock.relatedTo, card.coreStocks.length).y"
                      :x2="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).x"
                      :y2="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).y"
                      :stroke="tokens.colors.text.disabled"
                      stroke-width="1"
                      stroke-dasharray="3,2"
                      class="transition-opacity duration-500 delay-200"
                      :opacity="card.linesVisible ? 0.5 : 0"
                    />
                  </g>

                  <!-- Center Node (Theme) -->
                  <g v-if="card.isFlipped" class="transition-opacity duration-300" :opacity="card.nodesVisible ? 1 : 0">
                    <circle :cx="centerX" :cy="centerY" r="22" :fill="card.color" opacity="0.15" />
                    <circle :cx="centerX" :cy="centerY" r="16" :fill="card.color" opacity="0.3" />
                    <circle :cx="centerX" :cy="centerY" r="11" :fill="card.color" />
                    <text :x="centerX" :y="centerY + 4" text-anchor="middle" fill="white" font-size="12">{{ card.icon }}</text>
                  </g>

                  <!-- Core Stock Nodes -->
                  <g 
                    v-for="(stock, i) in card.coreStocks" 
                    :key="'core-' + stock.symbol"
                    v-show="card.isFlipped"
                    class="transition-opacity duration-300"
                    :opacity="card.nodesVisible ? 1 : 0"
                    :style="{ transitionDelay: `${150 + i * 100}ms` }"
                  >
                    <circle 
                      :cx="getCorePosition(i, card.coreStocks.length).x" 
                      :cy="getCorePosition(i, card.coreStocks.length).y" 
                      r="14" fill="#f59e0b" opacity="0.2" 
                    />
                    <circle 
                      :cx="getCorePosition(i, card.coreStocks.length).x" 
                      :cy="getCorePosition(i, card.coreStocks.length).y" 
                      r="10" fill="#f59e0b" 
                    />
                    <text 
                      :x="getCorePosition(i, card.coreStocks.length).x" 
                      :y="getCorePosition(i, card.coreStocks.length).y + 3" 
                      text-anchor="middle" fill="white" font-size="6" font-weight="bold"
                    >{{ stock.symbol }}</text>
                    <!-- Badge -->
                    <rect 
                      :x="getCorePosition(i, card.coreStocks.length).x + 6" 
                      :y="getCorePosition(i, card.coreStocks.length).y - 18" 
                      width="22" height="11" rx="2" 
                      :fill="stock.change >= 0 ? '#10b981' : '#ef4444'" 
                    />
                    <text 
                      :x="getCorePosition(i, card.coreStocks.length).x + 17" 
                      :y="getCorePosition(i, card.coreStocks.length).y - 10" 
                      text-anchor="middle" fill="white" font-size="6" font-weight="bold"
                    >{{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%</text>
                  </g>

                  <!-- Related Stock Nodes -->
                  <g 
                    v-for="(stock, i) in card.relatedStocks" 
                    :key="'related-' + stock.symbol"
                    v-show="card.isFlipped"
                    class="transition-opacity duration-300"
                    :opacity="card.nodesVisible ? 1 : 0"
                    :style="{ transitionDelay: `${300 + i * 80}ms` }"
                  >
                    <circle 
                      :cx="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).x" 
                      :cy="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).y" 
                      r="8" :fill="tokens.colors.border.strong" 
                    />
                    <text 
                      :x="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).x" 
                      :y="getRelatedPosition(i, card.relatedStocks.length, stock.relatedTo, card.coreStocks.length).y + 3" 
                      text-anchor="middle" :fill="tokens.colors.text.secondary" font-size="5" font-weight="bold"
                    >{{ stock.symbol }}</text>
                  </g>
                </svg>
              </div>

              <!-- CTA Button -->
              <div 
                class="text-center pt-2 shrink-0 transition-all duration-500"
                :style="{ opacity: card.ctaVisible ? 1 : 0, transform: card.ctaVisible ? 'translateY(0)' : 'translateY(10px)' }"
              >
                <button 
                  class="px-3 py-1.5 rounded-sm text-[10px] font-bold transition-all hover:scale-105"
                  :style="{ backgroundColor: card.color, color: '#fff' }"
                >
                  查看完整分析 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animation Stage Indicator -->
    <div class="absolute bottom-3 left-3 flex items-center gap-1.5">
      <div 
        v-for="stage in animationStages" 
        :key="stage.id"
        class="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold transition-all duration-300"
        :style="{ 
          backgroundColor: currentStage >= stage.id ? tokens.colors.accent.primaryBg : tokens.colors.background.elevated,
          color: currentStage >= stage.id ? tokens.colors.accent.primary : tokens.colors.text.disabled
        }"
      >
        <span>{{ currentStage > stage.id ? '✓' : currentStage === stage.id ? '●' : '○' }}</span>
        {{ stage.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../../composables/useTheme'

const { tokens } = useTheme()

// SVG dimensions
const svgWidth = 180
const svgHeight = 120
const centerX = svgWidth / 2
const centerY = svgHeight / 2

// Animation stages
const animationStages = [
  { id: 1, label: '生命周期' },
  { id: 2, label: '翻转' },
  { id: 3, label: '关联网络' }
]
const currentStage = ref(0)

// Card data with animation state
const cards = reactive([
  { 
    id: 1, 
    title: 'AI Chips', 
    desc: 'AI芯片需求持续增长，训练和推理硬件市场爆发', 
    icon: '🔥', 
    change30d: 45.2, 
    change1y: 120.5, 
    stageIndex: 5, 
    color: '#10b981', 
    stage: 'Growth',
    coreStocks: [
      { symbol: 'NVDA', change: 32 },
      { symbol: 'AMD', change: 18 }
    ],
    relatedStocks: [
      { symbol: 'INTC', relatedTo: 0 },
      { symbol: 'TSM', relatedTo: 1 }
    ],
    currentProgress: 0,
    displayChange30d: 0,
    displayChange1y: 0,
    stageLabelVisible: false,
    flipHintVisible: false,
    isFlipped: false,
    isAnimating: false,
    nodesVisible: false,
    linesVisible: false,
    ctaVisible: false
  },
  { 
    id: 2, 
    title: 'GLP-1 Drugs', 
    desc: 'GLP-1类减重药物市场快速扩张', 
    icon: '💊', 
    change30d: 67.8, 
    change1y: 89.3, 
    stageIndex: 4, 
    color: '#ec4899', 
    stage: 'Growth',
    coreStocks: [
      { symbol: 'LLY', change: 42 },
      { symbol: 'NVO', change: 28 }
    ],
    relatedStocks: [
      { symbol: 'VKTX', relatedTo: 0 },
      { symbol: 'AMGN', relatedTo: 1 }
    ],
    currentProgress: 0,
    displayChange30d: 0,
    displayChange1y: 0,
    stageLabelVisible: false,
    flipHintVisible: false,
    isFlipped: false,
    isAnimating: false,
    nodesVisible: false,
    linesVisible: false,
    ctaVisible: false
  },
  { 
    id: 3, 
    title: 'Quantum', 
    desc: '量子计算进入早期商业化阶段', 
    icon: '⚛️', 
    change30d: 12.3, 
    change1y: -5.4, 
    stageIndex: 2, 
    color: '#f59e0b', 
    stage: 'Emerging',
    coreStocks: [
      { symbol: 'IBM', change: 8 },
      { symbol: 'GOOG', change: 5 }
    ],
    relatedStocks: [
      { symbol: 'IONQ', relatedTo: 0 },
      { symbol: 'RGTI', relatedTo: 1 }
    ],
    currentProgress: 0,
    displayChange30d: 0,
    displayChange1y: 0,
    stageLabelVisible: false,
    flipHintVisible: false,
    isFlipped: false,
    isAnimating: false,
    nodesVisible: false,
    linesVisible: false,
    ctaVisible: false
  },
  { 
    id: 4, 
    title: 'EV Battery', 
    desc: '固态电池技术突破', 
    icon: '⚡', 
    change30d: 28.7, 
    change1y: 45.2, 
    stageIndex: 6, 
    color: '#06b6d4', 
    stage: 'Mature',
    coreStocks: [
      { symbol: 'TSLA', change: 15 },
      { symbol: 'BYD', change: 12 }
    ],
    relatedStocks: [
      { symbol: 'RIVN', relatedTo: 0 },
      { symbol: 'LCID', relatedTo: 1 }
    ],
    currentProgress: 0,
    displayChange30d: 0,
    displayChange1y: 0,
    stageLabelVisible: false,
    flipHintVisible: false,
    isFlipped: false,
    isAnimating: false,
    nodesVisible: false,
    linesVisible: false,
    ctaVisible: false
  }
])

// Position calculators for network nodes
const getCorePosition = (index, total) => {
  const radius = 38
  // Position cores at top-left and top-right of center
  const positions = [
    { x: centerX - 30, y: centerY - 25 },  // top-left
    { x: centerX + 30, y: centerY - 25 }   // top-right
  ]
  return positions[index] || positions[0]
}

const getRelatedPosition = (index, total, coreIndex, coreTotal) => {
  const corePos = getCorePosition(coreIndex, coreTotal)
  // Position related stocks around their core, slightly outward
  const offsets = [
    { x: 35, y: -5 },   // right of core
    { x: 35, y: 25 }    // bottom-right of core
  ]
  const offset = offsets[index % 2]
  return {
    x: corePos.x + offset.x * (coreIndex === 0 ? -0.5 : 1),
    y: corePos.y + offset.y
  }
}

// Animation controller
let animationTimeouts = []

const clearAnimations = () => {
  animationTimeouts.forEach(t => clearTimeout(t))
  animationTimeouts = []
}

const runAnimation = () => {
  clearAnimations()
  currentStage.value = 0
  
  // Reset all cards
  cards.forEach(card => {
    card.currentProgress = 0
    card.displayChange30d = 0
    card.displayChange1y = 0
    card.stageLabelVisible = false
    card.flipHintVisible = false
    card.isFlipped = false
    card.isAnimating = false
    card.nodesVisible = false
    card.linesVisible = false
    card.ctaVisible = false
  })

  // Stage 1: Lifecycle Progress Animation (0-3s)
  animationTimeouts.push(setTimeout(() => {
    currentStage.value = 1
  }, 100))

  cards.forEach((card, cardIndex) => {
    const cardDelay = cardIndex * 300

    // Progress bar filling
    for (let i = 1; i <= card.stageIndex; i++) {
      animationTimeouts.push(setTimeout(() => {
        card.currentProgress = i
        card.isAnimating = true
      }, cardDelay + i * 150))
    }

    // Stage label popup
    animationTimeouts.push(setTimeout(() => {
      card.stageLabelVisible = true
    }, cardDelay + card.stageIndex * 150 + 100))

    // Number counter animation
    const counterDuration = 600
    const counterSteps = 15
    const counterInterval = counterDuration / counterSteps
    for (let i = 1; i <= counterSteps; i++) {
      animationTimeouts.push(setTimeout(() => {
        card.displayChange30d = (card.change30d / counterSteps) * i
        card.displayChange1y = (card.change1y / counterSteps) * i
      }, cardDelay + card.stageIndex * 150 + 150 + i * counterInterval))
    }

    // Flip hint
    animationTimeouts.push(setTimeout(() => {
      card.flipHintVisible = true
    }, cardDelay + 2000))
  })

  // Stage 2: Card Flip (2.5-3.5s)
  animationTimeouts.push(setTimeout(() => {
    currentStage.value = 2
  }, 2500))

  cards.forEach((card, cardIndex) => {
    animationTimeouts.push(setTimeout(() => {
      card.isFlipped = true
      card.isAnimating = false
    }, 2700 + cardIndex * 200))
  })

  // Stage 3: Network Reveal (3.5-5s)
  animationTimeouts.push(setTimeout(() => {
    currentStage.value = 3
  }, 3800))

  cards.forEach((card, cardIndex) => {
    const networkDelay = 3500 + cardIndex * 200

    // Nodes appear
    animationTimeouts.push(setTimeout(() => {
      card.nodesVisible = true
    }, networkDelay))

    // Lines appear
    animationTimeouts.push(setTimeout(() => {
      card.linesVisible = true
    }, networkDelay + 300))

    // CTA button
    animationTimeouts.push(setTimeout(() => {
      card.ctaVisible = true
    }, networkDelay + 600))
  })

  // Loop animation after completion
  animationTimeouts.push(setTimeout(() => {
    runAnimation()
  }, 10000))
}

const replayAnimation = () => {
  runAnimation()
}

onMounted(() => {
  setTimeout(runAnimation, 500)
})

onUnmounted(() => {
  clearAnimations()
})
</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
</style>