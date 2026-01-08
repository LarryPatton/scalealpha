<template>
  <Teleport to="body">
    <transition name="fade">
      <div 
        v-if="visible" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 backdrop-blur-sm"
          :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.6)' }"
          @click="handleClose"
        ></div>
        
        <!-- Modal -->
        <div 
          class="relative w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden"
          :style="{ 
            backgroundColor: tokens.colors.background.overlay,
            borderColor: tokens.colors.border.strong
          }"
        >
          <!-- Header -->
          <div 
            class="flex items-center justify-between px-6 py-4 border-b"
            :style="{ borderColor: tokens.colors.border.default }"
          >
            <div class="flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }"
              >
                <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
                  执行交易计划
                </h3>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                  确认订单参数后提交
                </p>
              </div>
            </div>
            <button 
              @click="handleClose"
              class="p-2 rounded-md transition-colors"
              :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            >
              <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="px-6 py-5 space-y-5">
            <!-- Plan Info -->
            <div 
              class="p-4 rounded-lg border"
              :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                    :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.primary }"
                  >
                    {{ planData?.symbol?.slice(0, 2) || 'ST' }}
                  </div>
                  <div>
                    <p class="font-bold" :style="{ color: tokens.colors.text.primary }">
                      {{ planData?.symbol }}
                    </p>
                    <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                      {{ planData?.stockName || planData?.name }}
                    </p>
                  </div>
                </div>
                <span 
                  class="px-2 py-1 rounded text-xs font-bold"
                  :style="{ 
                    backgroundColor: planData?.recommendation === 'BUY' || planData?.recommendation === 'WAIT_BUY' 
                      ? tokens.colors.semantic.success + '1A' 
                      : tokens.colors.semantic.error + '1A',
                    color: planData?.recommendation === 'BUY' || planData?.recommendation === 'WAIT_BUY' 
                      ? tokens.colors.semantic.success 
                      : tokens.colors.semantic.error
                  }"
                >
                  {{ planData?.recommendation }}
                </span>
              </div>
              
              <div class="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">入场价</p>
                  <p class="font-mono font-medium" :style="{ color: tokens.colors.text.secondary }">
                    ${{ planData?.entry_price?.toFixed(2) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">目标价</p>
                  <p class="font-mono font-medium" :style="{ color: tokens.colors.semantic.success }">
                    ${{ planData?.target_price?.toFixed(2) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">止损价</p>
                  <p class="font-mono font-medium" :style="{ color: tokens.colors.semantic.error }">
                    ${{ planData?.stop_loss_price?.toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Target Account Selection -->
            <div>
              <p class="text-sm font-medium mb-3" :style="{ color: tokens.colors.text.primary }">
                选择目标账户
              </p>
              
              <!-- Account Tabs -->
              <div class="flex gap-2 mb-3">
                <button 
                  @click="accountType = 'broker'"
                  class="flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
                  :class="accountType === 'broker' ? 'ring-2 ring-blue-500' : ''"
                  :style="{ 
                    backgroundColor: accountType === 'broker' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    borderColor: accountType === 'broker' ? 'rgba(59, 130, 246, 0.3)' : tokens.colors.border.default,
                    color: accountType === 'broker' ? tokens.colors.accent.primary : tokens.colors.text.secondary
                  }"
                >
                  🏦 真实券商
                </button>
                <button 
                  @click="accountType = 'paper'"
                  class="flex-1 px-4 py-2 rounded-lg border text-sm font-medium transition-all"
                  :class="accountType === 'paper' ? 'ring-2 ring-blue-500' : ''"
                  :style="{ 
                    backgroundColor: accountType === 'paper' ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    borderColor: accountType === 'paper' ? 'rgba(59, 130, 246, 0.3)' : tokens.colors.border.default,
                    color: accountType === 'paper' ? tokens.colors.accent.primary : tokens.colors.text.secondary
                  }"
                >
                  📊 模拟盘
                </button>
              </div>
              
              <!-- Broker Accounts -->
              <div v-if="accountType === 'broker'" class="space-y-2">
                <div 
                  v-if="brokerAccounts.length === 0"
                  class="p-4 rounded-lg border border-dashed text-center"
                  :style="{ borderColor: tokens.colors.border.default }"
                >
                  <p class="text-sm" :style="{ color: tokens.colors.text.muted }">
                    暂无已连接的券商账户
                  </p>
                  <button 
                    @click="$emit('goToBroker')"
                    class="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    前往连接券商 →
                  </button>
                </div>
                <button 
                  v-for="account in brokerAccounts" 
                  :key="account.id"
                  @click="selectedAccountId = account.id"
                  class="w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left"
                  :class="selectedAccountId === account.id ? 'ring-2 ring-blue-500' : ''"
                  :style="{ 
                    backgroundColor: selectedAccountId === account.id ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                    borderColor: selectedAccountId === account.id ? 'rgba(59, 130, 246, 0.3)' : tokens.colors.border.subtle
                  }"
                >
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                    :style="{ backgroundColor: account.broker?.color || '#3b82f6' }"
                  >
                    {{ account.broker?.shortName?.slice(0, 2) || 'BR' }}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium" :style="{ color: tokens.colors.text.primary }">
                      {{ account.broker?.shortName || account.broker?.name }}
                    </p>
                    <p class="text-xs truncate" :style="{ color: tokens.colors.text.muted }">
                      可用: {{ formatMoney(account.balance) }}
                    </p>
                  </div>
                  <svg 
                    v-if="selectedAccountId === account.id"
                    class="w-5 h-5 text-blue-500 shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <!-- Paper Portfolios -->
              <div v-else class="space-y-2">
                <div 
                  v-if="paperPortfolios.length === 0"
                  class="p-4 rounded-lg border border-dashed text-center"
                  :style="{ borderColor: tokens.colors.border.default }"
                >
                  <p class="text-sm" :style="{ color: tokens.colors.text.muted }">
                    暂无模拟盘
                  </p>
                  <button 
                    @click="$emit('goToPaper')"
                    class="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    前往创建模拟盘 →
                  </button>
                </div>
                <button 
                  v-for="portfolio in paperPortfolios" 
                  :key="portfolio.id"
                  @click="selectedAccountId = portfolio.id"
                  class="w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left"
                  :class="selectedAccountId === portfolio.id ? 'ring-2 ring-blue-500' : ''"
                  :style="{ 
                    backgroundColor: selectedAccountId === portfolio.id ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                    borderColor: selectedAccountId === portfolio.id ? 'rgba(59, 130, 246, 0.3)' : tokens.colors.border.subtle
                  }"
                >
                  <div 
                    class="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                    :style="{ backgroundColor: tokens.colors.border.default }"
                  >
                    📊
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium" :style="{ color: tokens.colors.text.primary }">
                      {{ portfolio.name }}
                    </p>
                    <p class="text-xs truncate" :style="{ color: tokens.colors.text.muted }">
                      可用: {{ formatMoney(portfolio.availableCash) }}
                    </p>
                  </div>
                  <svg 
                    v-if="selectedAccountId === portfolio.id"
                    class="w-5 h-5 text-blue-500 shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Order Parameters -->
            <div 
              class="p-4 rounded-lg border"
              :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }"
            >
              <p class="text-sm font-medium mb-3" :style="{ color: tokens.colors.text.primary }">
                订单参数
              </p>
              
              <div class="space-y-3">
                <!-- Quantity -->
                <div class="flex items-center justify-between">
                  <label class="text-sm" :style="{ color: tokens.colors.text.secondary }">数量</label>
                  <div class="flex items-center gap-2">
                    <button 
                      @click="quantity = Math.max(1, quantity - 10)"
                      class="w-8 h-8 rounded border flex items-center justify-center transition-colors"
                      :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                    >-</button>
                    <input 
                      v-model.number="quantity"
                      type="number"
                      min="1"
                      class="w-20 text-center px-2 py-1.5 rounded border bg-transparent outline-none"
                      :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }"
                    />
                    <button 
                      @click="quantity += 10"
                      class="w-8 h-8 rounded border flex items-center justify-center transition-colors"
                      :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                    >+</button>
                    <span class="text-sm" :style="{ color: tokens.colors.text.muted }">股</span>
                  </div>
                </div>
                
                <!-- Order Type -->
                <div class="flex items-center justify-between">
                  <label class="text-sm" :style="{ color: tokens.colors.text.secondary }">订单类型</label>
                  <div class="flex gap-2">
                    <button 
                      @click="orderType = 'market'"
                      class="px-3 py-1.5 rounded text-sm transition-all"
                      :class="orderType === 'market' ? 'ring-1 ring-blue-500' : ''"
                      :style="{ 
                        backgroundColor: orderType === 'market' ? 'rgba(59, 130, 246, 0.1)' : tokens.colors.border.subtle,
                        color: orderType === 'market' ? tokens.colors.accent.primary : tokens.colors.text.secondary
                      }"
                    >市价单</button>
                    <button 
                      @click="orderType = 'limit'"
                      class="px-3 py-1.5 rounded text-sm transition-all"
                      :class="orderType === 'limit' ? 'ring-1 ring-blue-500' : ''"
                      :style="{ 
                        backgroundColor: orderType === 'limit' ? 'rgba(59, 130, 246, 0.1)' : tokens.colors.border.subtle,
                        color: orderType === 'limit' ? tokens.colors.accent.primary : tokens.colors.text.secondary
                      }"
                    >限价单</button>
                  </div>
                </div>
                
                <!-- Limit Price (only for limit orders) -->
                <div v-if="orderType === 'limit'" class="flex items-center justify-between">
                  <label class="text-sm" :style="{ color: tokens.colors.text.secondary }">限价</label>
                  <div class="flex items-center gap-2">
                    <span class="text-sm" :style="{ color: tokens.colors.text.muted }">$</span>
                    <input 
                      v-model.number="limitPrice"
                      type="number"
                      step="0.01"
                      class="w-24 text-right px-2 py-1.5 rounded border bg-transparent outline-none"
                      :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }"
                    />
                  </div>
                </div>
                
                <!-- Estimated Amount -->
                <div class="pt-3 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="flex items-center justify-between">
                    <span class="text-sm" :style="{ color: tokens.colors.text.muted }">预估金额</span>
                    <span class="font-bold font-mono" :style="{ color: tokens.colors.text.primary }">
                      {{ formatMoney(estimatedAmount) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div 
            class="px-6 py-4 border-t flex items-center justify-between"
            :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }"
          >
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
              {{ accountType === 'broker' ? '⚠️ 此操作将在真实账户下单' : '📊 此订单将在模拟盘执行' }}
            </p>
            <div class="flex gap-3">
              <button 
                @click="handleClose"
                class="px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              >
                取消
              </button>
              <button 
                @click="handleConfirm"
                :disabled="!canSubmit"
                class="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors flex items-center gap-2"
                :class="canSubmit ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-600 cursor-not-allowed'"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                确认执行
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useTheme } from '../../composables/useTheme'
import { useBrokerAccount } from '../../composables/useBrokerAccount'
import { usePaperPortfolios } from '../../composables/usePaperPortfolios'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  planData: {
    type: Object,
    default: null
  },
  strategyData: {
    type: Object,
    default: null
  },
  // 预选的账户类型和ID（用于快捷执行）
  preselectedAccountType: {
    type: String,
    default: null // 'broker' | 'paper'
  },
  preselectedAccountId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close', 'confirm', 'goToBroker', 'goToPaper'])

const { tokens, isDark } = useTheme()
const { brokerAccounts, loadAccounts, formatMoney } = useBrokerAccount()
const { portfolios: paperPortfolios, loadPortfolios } = usePaperPortfolios()

// Form state
const accountType = ref('broker')
const selectedAccountId = ref(null)
const quantity = ref(100)
const orderType = ref('market')
const limitPrice = ref(0)

// Load accounts on mount
onMounted(() => {
  loadAccounts()
  loadPortfolios()
})

// Initialize form when modal opens
watch(() => props.visible, (newVal) => {
  if (newVal) {
    // 重新加载账户数据
    loadAccounts()
    loadPortfolios()
    
    // 如果有预选账户
    if (props.preselectedAccountType) {
      accountType.value = props.preselectedAccountType
    }
    if (props.preselectedAccountId) {
      selectedAccountId.value = props.preselectedAccountId
    } else {
      // 默认选中第一个账户
      if (accountType.value === 'broker' && brokerAccounts.value.length > 0) {
        selectedAccountId.value = brokerAccounts.value[0].id
      } else if (accountType.value === 'paper' && paperPortfolios.value.length > 0) {
        selectedAccountId.value = paperPortfolios.value[0].id
      }
    }
    
    // 初始化价格
    if (props.planData?.entry_price) {
      limitPrice.value = props.planData.entry_price
    }
    
    // 重置数量
    quantity.value = 100
    orderType.value = 'market'
  }
})

// Switch account selection when account type changes
watch(accountType, (newType) => {
  if (newType === 'broker' && brokerAccounts.value.length > 0) {
    selectedAccountId.value = brokerAccounts.value[0].id
  } else if (newType === 'paper' && paperPortfolios.value.length > 0) {
    selectedAccountId.value = paperPortfolios.value[0].id
  } else {
    selectedAccountId.value = null
  }
})

// Computed
const estimatedAmount = computed(() => {
  const price = orderType.value === 'limit' ? limitPrice.value : (props.planData?.entry_price || 0)
  return quantity.value * price
})

const canSubmit = computed(() => {
  return selectedAccountId.value && quantity.value > 0
})

// Methods
const handleClose = () => {
  emit('close')
}

const handleConfirm = () => {
  if (!canSubmit.value) return
  
  const orderData = {
    accountType: accountType.value,
    accountId: selectedAccountId.value,
    symbol: props.planData?.symbol || props.strategyData?.symbol,
    stockName: props.planData?.stockName || props.strategyData?.stockName,
    side: props.planData?.recommendation === 'SELL' ? 'sell' : 'buy',
    quantity: quantity.value,
    orderType: orderType.value,
    price: orderType.value === 'limit' ? limitPrice.value : props.planData?.entry_price,
    targetPrice: props.planData?.target_price,
    stopLossPrice: props.planData?.stop_loss_price,
    planId: props.planData?.id,
    strategyId: props.strategyData?.id
  }
  
  emit('confirm', orderData)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide number input spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
