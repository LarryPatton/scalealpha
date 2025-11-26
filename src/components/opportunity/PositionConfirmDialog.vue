<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div 
        v-if="isVisible"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        @click.self="handleClose"
      >
        <div class="bg-[#1a1a1a] border border-[#404040] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl font-bold text-white mb-2">确认持仓信息</h2>
                <p class="text-blue-100">{{ report.symbol }} - {{ report.stockName }}</p>
              </div>
              <button
                @click="handleClose"
                class="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <!-- 持仓状态选择 -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-300 mb-3">是否持有该股票？</label>
              <div class="grid grid-cols-2 gap-4">
                <button
                  @click="hasPosition = true"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    hasPosition
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] bg-[#2a2a2a] hover:border-blue-500/50'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                      hasPosition ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="hasPosition" class="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-white">有持仓</div>
                      <div class="text-xs text-gray-400">我已持有这支股票</div>
                    </div>
                  </div>
                </button>

                <button
                  @click="hasPosition = false"
                  :class="[
                    'p-4 rounded-xl border-2 transition-all duration-200 text-left',
                    !hasPosition
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] bg-[#2a2a2a] hover:border-blue-500/50'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <div :class="[
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                      !hasPosition ? 'border-blue-500 bg-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="!hasPosition" class="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <div class="font-semibold text-white">无持仓</div>
                      <div class="text-xs text-gray-400">我还没有这支股票</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <!-- 持仓信息输入（仅在有持仓时显示） -->
            <Transition name="slide-fade">
              <div v-if="hasPosition" class="space-y-4">
                <!-- 成本价格 -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    持仓成本 <span class="text-red-400">*</span>
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      v-model.number="costBasis"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="输入平均持仓成本"
                      class="w-full pl-8 pr-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      @focus="errors.costBasis = ''"
                    />
                  </div>
                  <p v-if="errors.costBasis" class="mt-1 text-sm text-red-400">{{ errors.costBasis }}</p>
                  <p v-else-if="autoFilled" class="mt-1 text-sm text-green-400 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>已从持仓数据自动填充</span>
                  </p>
                </div>

                <!-- 持仓数量 -->
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    持仓数量 <span class="text-red-400">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model.number="shares"
                      type="number"
                      step="1"
                      min="0"
                      placeholder="输入持有股数"
                      class="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      @focus="errors.shares = ''"
                    />
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">股</span>
                  </div>
                  <p v-if="errors.shares" class="mt-1 text-sm text-red-400">{{ errors.shares }}</p>
                </div>

                <!-- 持仓概览 -->
                <div v-if="costBasis > 0 && shares > 0" class="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="text-xs text-gray-400 mb-1">总持仓市值</div>
                      <div class="text-xl font-bold text-white">${{ (costBasis * shares).toFixed(2) }}</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-400 mb-1">当前价格</div>
                      <div class="text-xl font-bold text-white">${{ report.entryPrice }}</div>
                    </div>
                    <div class="col-span-2">
                      <div class="text-xs text-gray-400 mb-1">盈亏情况</div>
                      <div :class="[
                        'text-lg font-bold',
                        profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
                      ]">
                        {{ profitLoss >= 0 ? '+' : '' }}${{ profitLoss.toFixed(2) }}
                        <span class="text-sm ml-2">({{ profitLossPercent >= 0 ? '+' : '' }}{{ profitLossPercent.toFixed(2) }}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Footer -->
          <div class="border-t border-[#404040] p-6">
            <div class="flex justify-end gap-3">
              <button
                @click="handleClose"
                class="px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                @click="handleConfirm"
                :disabled="!isValid"
                :class="[
                  'px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2',
                  isValid
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                ]"
              >
                <span>确认并进入计划制定</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  },
  report: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])

// State
const hasPosition = ref(false)
const costBasis = ref(0)
const shares = ref(0)
const autoFilled = ref(false)
const errors = ref({
  costBasis: '',
  shares: ''
})

// Computed
const isValid = computed(() => {
  if (!hasPosition.value) {
    return true // 无持仓时，只需要选择即可
  }
  return costBasis.value > 0 && shares.value > 0
})

const profitLoss = computed(() => {
  if (costBasis.value <= 0 || shares.value <= 0) return 0
  const currentValue = props.report.entryPrice * shares.value
  const cost = costBasis.value * shares.value
  return currentValue - cost
})

const profitLossPercent = computed(() => {
  if (costBasis.value <= 0 || shares.value <= 0) return 0
  const cost = costBasis.value * shares.value
  return (profitLoss.value / cost) * 100
})

// Methods
const loadPortfolioData = () => {
  try {
    const portfolioData = localStorage.getItem('portfolio_input_data')
    if (!portfolioData) return

    const portfolio = JSON.parse(portfolioData)
    const symbol = props.report.symbol

    // 查找匹配的股票
    const holding = portfolio.find(item => 
      item.symbol?.toUpperCase() === symbol.toUpperCase()
    )

    if (holding && holding.costBasis && holding.shares) {
      hasPosition.value = true
      costBasis.value = parseFloat(holding.costBasis)
      shares.value = parseFloat(holding.shares)
      autoFilled.value = true
    }
  } catch (error) {
    console.error('Failed to load portfolio data:', error)
  }
}

const validate = () => {
  errors.value = {
    costBasis: '',
    shares: ''
  }

  let isValid = true

  if (hasPosition.value) {
    if (costBasis.value <= 0) {
      errors.value.costBasis = '请输入有效的持仓成本'
      isValid = false
    }

    if (shares.value <= 0 || shares.value % 1 !== 0) {
      errors.value.shares = '请输入有效的持仓数量（正整数）'
      isValid = false
    }
  }

  return isValid
}

const handleConfirm = () => {
  if (!validate()) return

  const positionData = {
    hasPosition: hasPosition.value,
    costBasis: hasPosition.value ? costBasis.value : null,
    shares: hasPosition.value ? shares.value : null,
    report: props.report
  }

  emit('confirm', positionData)
}

const handleClose = () => {
  emit('close')
}

const resetForm = () => {
  hasPosition.value = false
  costBasis.value = 0
  shares.value = 0
  autoFilled.value = false
  errors.value = {
    costBasis: '',
    shares: ''
  }
}

// Watch for dialog visibility
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    resetForm()
    loadPortfolioData()
  }
})

// Load data on mount if dialog is already visible
onMounted(() => {
  if (props.isVisible) {
    loadPortfolioData()
  }
})
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active > div,
.dialog-leave-active > div {
  transition: transform 0.3s ease;
}

.dialog-enter-from > div,
.dialog-leave-to > div {
  transform: scale(0.9);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
