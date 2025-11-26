<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    @click.self="handleClose"
  >
    <div class="bg-[#2a2a2a] rounded-xl max-w-5xl w-full max-h-[80vh] flex flex-col border border-[#404040]">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-[#404040] flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-white">持仓信息确认</h2>
          <p class="text-sm text-gray-400 mt-1">已选择 {{ selectedReports.length }} 个报告</p>
        </div>
        <button
          @click="handleClose"
          class="w-8 h-8 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] flex items-center justify-center transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-hidden p-6">
        <div class="grid grid-cols-2 gap-6 h-full">
          <!-- Left: With Holdings -->
          <div class="flex flex-col border border-green-500/30 rounded-lg bg-[#1a1a1a] overflow-hidden">
            <div class="px-4 py-3 bg-green-500/10 border-b border-green-500/30">
              <h3 class="font-semibold text-green-400 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                已有持仓信息 ({{ stocksWithHoldings.length }})
              </h3>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              <div
                v-for="stock in stocksWithHoldings"
                :key="stock.report.id"
                class="bg-[#2a2a2a] rounded-lg p-4 border border-[#404040] hover:border-green-500/50 transition-colors"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-mono text-lg font-bold text-green-400">{{ stock.report.symbol }}</span>
                      <span class="text-gray-300">{{ stock.report.stockName }}</span>
                    </div>
                    <div class="text-xs text-gray-500">{{ stock.report.category?.name || '未分类' }}</div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div class="bg-[#1a1a1a] rounded p-2">
                    <div class="text-gray-500 text-xs mb-1">持仓成本</div>
                    <div class="text-white font-semibold">${{ stock.holding.cost.toFixed(2) }}</div>
                  </div>
                  <div class="bg-[#1a1a1a] rounded p-2">
                    <div class="text-gray-500 text-xs mb-1">仓位比例</div>
                    <div class="text-white font-semibold">{{ stock.holding.position }}%</div>
                  </div>
                </div>
              </div>
              <div v-if="stocksWithHoldings.length === 0" class="text-center text-gray-500 py-8">
                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293z" clip-rule="evenodd"/>
                </svg>
                <p>暂无已有持仓的股票</p>
              </div>
            </div>
          </div>

          <!-- Right: Without Holdings -->
          <div class="flex flex-col border border-orange-500/30 rounded-lg bg-[#1a1a1a] overflow-hidden">
            <div class="px-4 py-3 bg-orange-500/10 border-b border-orange-500/30">
              <h3 class="font-semibold text-orange-400 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                未有持仓信息 ({{ stocksWithoutHoldings.length }})
              </h3>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-3">
              <div
                v-for="stock in stocksWithoutHoldings"
                :key="stock.id"
                class="bg-[#2a2a2a] rounded-lg p-4 border border-[#404040] hover:border-orange-500/50 transition-colors"
              >
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-mono text-lg font-bold text-orange-400">{{ stock.symbol }}</span>
                  <span class="text-gray-300">{{ stock.stockName }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ stock.category?.name || '未分类' }}</div>
                <div class="text-xs text-orange-400/80 mt-2">
                  ⚠️ 需要在"我的投资信息"中补充持仓数据
                </div>
              </div>
              <div v-if="stocksWithoutHoldings.length === 0" class="text-center text-gray-500 py-8">
                <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p>所有股票都已有持仓信息！</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-[#404040] flex items-center justify-between">
        <div class="text-sm text-gray-400">
          提示：右侧未有持仓信息的股票也会进入计划制定，您可以稍后补充
        </div>
        <div class="flex gap-3">
          <button
            @click="handleClose"
            class="px-6 py-2 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 font-medium transition-colors"
          >
            取消
          </button>
          <button
            @click="handleConfirm"
            class="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/50 text-white font-medium transition-all"
          >
            确认并进入计划制定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  selectedReports: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'confirm'])

// Load holdings from localStorage
const getHoldingsData = () => {
  try {
    const data = localStorage.getItem('portfolio_input_data')
    if (!data) return []
    const parsed = JSON.parse(data)
    return parsed.holdings || []
  } catch (error) {
    console.error('Failed to load holdings:', error)
    return []
  }
}

// Classify stocks based on holdings
const stocksWithHoldings = computed(() => {
  const holdings = getHoldingsData()
  return props.selectedReports
    .map(report => {
      const holding = holdings.find(h => h.symbol === report.symbol)
      return holding ? { report, holding } : null
    })
    .filter(Boolean)
})

const stocksWithoutHoldings = computed(() => {
  const holdings = getHoldingsData()
  return props.selectedReports.filter(report => {
    return !holdings.some(h => h.symbol === report.symbol)
  })
})

const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm', {
    withHoldings: stocksWithHoldings.value,
    withoutHoldings: stocksWithoutHoldings.value
  })
}
</script>
