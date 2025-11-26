<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Header -->
    <div class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
            <div>
              <h1 class="text-2xl font-bold text-white">一键交易</h1>
              <p class="text-sm text-gray-400">批量执行交易计划，快速完成订单提交</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- Account Info -->
            <div class="flex items-center gap-4 px-4 py-2 bg-[#1a1a1a] rounded-lg border border-[#404040]">
              <div class="text-right">
                <div class="text-xs text-gray-400">可用资金</div>
                <div class="text-lg font-bold text-green-400">{{ formatMoney(brokerAccount.balance) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- No Plans State -->
      <div v-if="tradingPlans.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full mb-6">
          <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-white mb-2">暂无可交易计划</h3>
        <p class="text-gray-400 mb-6">请先创建交易计划</p>
        <button
          @click="goToPlanning"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          前往交易计划
        </button>
      </div>

      <!-- Trading Plans List -->
      <div v-else class="space-y-6">
        <!-- Action Bar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-white">待执行计划</h2>
            <span class="text-sm text-gray-400">({{ selectedPlanIds.length }}/{{ tradingPlans.length }})</span>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="selectAll"
              class="px-4 py-2 bg-[#2a2a2a] border border-[#404040] hover:border-blue-500 text-white rounded-lg text-sm transition-colors"
            >
              {{ selectedPlanIds.length === tradingPlans.length ? '取消全选' : '全选' }}
            </button>
            <button
              v-if="selectedPlanIds.length > 0"
              @click="executeOrders"
              class="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-500/20"
            >
              执行交易 ({{ selectedPlanIds.length }})
            </button>
          </div>
        </div>

        <!-- Plans Grid -->
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="plan in tradingPlans"
            :key="plan.id"
            :class="[
              'bg-[#2a2a2a] border rounded-xl p-6 transition-all cursor-pointer',
              selectedPlanIds.includes(plan.id) 
                ? 'border-blue-500 bg-blue-500/5' 
                : 'border-[#404040] hover:border-blue-500'
            ]"
            @click="togglePlanSelection(plan.id)"
          >
            <div class="flex items-start gap-6">
              <!-- Checkbox -->
              <div 
                class="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1"
                :class="selectedPlanIds.includes(plan.id) 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-[#1a1a1a] border-gray-600 hover:border-blue-500'"
              >
                <svg 
                  v-if="selectedPlanIds.includes(plan.id)"
                  class="w-4 h-4 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>

              <!-- Plan Content -->
              <div class="flex-1">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center gap-4">
                    <div :class="[
                      'w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-lg',
                      getActionTypeStyle(plan.actionType)
                    ]">
                      {{ plan.symbol.slice(0, 2) }}
                    </div>
                    <div>
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-mono text-lg font-bold text-white">{{ plan.symbol }}</span>
                        <span class="text-gray-300">{{ plan.stockName }}</span>
                        <span :class="[
                          'px-3 py-1 rounded-full text-xs font-medium',
                          getActionTypeBadgeStyle(plan.actionType)
                        ]">
                          {{ getActionTypeLabel(plan.actionType) }}
                        </span>
                      </div>
                      <div class="text-sm text-gray-400">{{ plan.entryPlan.description }}</div>
                    </div>
                  </div>
                </div>

                <!-- Entry Points -->
                <div v-if="plan.actionType === 'BUY' && plan.entryPlan.triggers.length > 0" class="space-y-3">
                  <div class="text-sm font-medium text-gray-300">入场点位</div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      v-for="(trigger, idx) in plan.entryPlan.triggers"
                      :key="idx"
                      class="p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]"
                    >
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-gray-400">点位 {{ idx + 1 }}</span>
                        <span class="text-xs font-medium text-blue-400">{{ trigger.allocation }}%</span>
                      </div>
                      <div class="text-lg font-bold text-white mb-1">${{ trigger.price }}</div>
                      <div class="text-xs text-gray-500">{{ trigger.reason }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-[#2a2a2a] rounded-xl border border-[#404040] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="p-6 border-b border-[#404040]">
          <h3 class="text-xl font-bold text-white">确认交易</h3>
          <p class="text-sm text-gray-400 mt-1">请仔细核对以下订单信息</p>
        </div>

        <div class="p-6 space-y-4">
          <!-- Orders Summary -->
          <div class="space-y-3">
            <div
              v-for="plan in selectedPlans"
              :key="plan.id"
              class="p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                  <span class="font-mono font-bold text-white">{{ plan.symbol }}</span>
                  <span :class="[
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    getActionTypeBadgeStyle(plan.actionType)
                  ]">
                    {{ getActionTypeLabel(plan.actionType) }}
                  </span>
                </div>
                <span class="text-sm text-gray-400">{{ plan.entryPlan.triggers.length }} 个入场点</span>
              </div>
            </div>
          </div>

          <!-- Risk Warning -->
          <div class="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="text-sm font-medium text-yellow-400 mb-1">风险提示</div>
                <div class="text-xs text-gray-300">
                  请确保您已充分理解交易风险。本次交易将批量提交订单，请谨慎操作。
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-[#404040] flex items-center justify-end gap-3">
          <button
            @click="showConfirmDialog = false"
            class="px-6 py-2 bg-[#3a3a3a] hover:bg-[#404040] text-white rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            @click="confirmExecute"
            class="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all"
          >
            确认提交
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBrokerAccount } from '../composables/useBrokerAccount'

const router = useRouter()
const { brokerAccount, formatMoney } = useBrokerAccount()

const tradingPlans = ref([])
const selectedPlanIds = ref([])
const showConfirmDialog = ref(false)

// Computed
const selectedPlans = computed(() => {
  return tradingPlans.value.filter(plan => selectedPlanIds.value.includes(plan.id))
})

// Methods
const goBack = () => {
  router.push('/planning')
}

const goToPlanning = () => {
  router.push('/planning')
}

const togglePlanSelection = (planId) => {
  const index = selectedPlanIds.value.indexOf(planId)
  if (index === -1) {
    selectedPlanIds.value.push(planId)
  } else {
    selectedPlanIds.value.splice(index, 1)
  }
}

const selectAll = () => {
  if (selectedPlanIds.value.length === tradingPlans.value.length) {
    selectedPlanIds.value = []
  } else {
    selectedPlanIds.value = tradingPlans.value.map(plan => plan.id)
  }
}

const executeOrders = () => {
  showConfirmDialog.value = true
}

const confirmExecute = () => {
  // Simulate order execution
  alert(`已提交 ${selectedPlanIds.value.length} 个交易订单！`)
  showConfirmDialog.value = false
  selectedPlanIds.value = []
}

const getActionTypeLabel = (type) => {
  const labels = {
    'BUY': '买入',
    'SELL': '卖出',
    'HOLD': '持有',
    'WAIT_SHORT': '观望做空'
  }
  return labels[type] || type
}

const getActionTypeStyle = (type) => {
  const styles = {
    'BUY': 'bg-green-500/20 border-2 border-green-500 text-green-400',
    'SELL': 'bg-red-500/20 border-2 border-red-500 text-red-400',
    'HOLD': 'bg-blue-500/20 border-2 border-blue-500 text-blue-400',
    'WAIT_SHORT': 'bg-orange-500/20 border-2 border-orange-500 text-orange-400'
  }
  return styles[type] || 'bg-gray-500/20 border-2 border-gray-500 text-gray-400'
}

const getActionTypeBadgeStyle = (type) => {
  const styles = {
    'BUY': 'bg-green-500/10 text-green-400 border border-green-500/30',
    'SELL': 'bg-red-500/10 text-red-400 border border-red-500/30',
    'HOLD': 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    'WAIT_SHORT': 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
  }
  return styles[type] || 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
}

const loadTradingPlans = () => {
  try {
    const storedPlans = localStorage.getItem('trading_plans')
    if (storedPlans) {
      const allPlans = JSON.parse(storedPlans)
      // Only show BUY plans for now
      tradingPlans.value = allPlans.filter(plan => plan.actionType === 'BUY')
    }
  } catch (error) {
    console.error('Failed to load trading plans:', error)
  }
}

onMounted(() => {
  loadTradingPlans()
})
</script>
