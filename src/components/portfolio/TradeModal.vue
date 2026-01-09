<template>
  <Teleport to="body">
    <transition name="fade">
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div 
          class="absolute inset-0 backdrop-blur-sm"
          :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }"
          @click="$emit('close')"
        ></div>
        
        <div 
          class="relative w-full max-w-md rounded-xl border shadow-2xl"
          :style="{ 
            backgroundColor: tokens.colors.background.overlay,
            borderColor: tokens.colors.border.strong
          }"
        >
          <div class="flex items-center justify-between p-6 border-b" :style="{ borderColor: tokens.colors.border.default }">
            <h3 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
              {{ $t('portfolio.trade.modalTitle') }}
            </h3>
            <button 
              @click="$emit('close')"
              class="p-1 rounded-md transition-colors"
              :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
            >
              <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="p-6 space-y-5">
            <!-- Buy/Sell Toggle -->
            <div class="flex rounded-lg p-1" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }">
              <button 
                @click="tradeForm.type = 'buy'"
                class="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                :class="tradeForm.type === 'buy' ? 'bg-green-500 text-white' : ''"
                :style="tradeForm.type !== 'buy' ? { color: tokens.colors.text.muted } : {}"
              >
                {{ $t('portfolio.trade.typeBuy') }}
              </button>
              <button 
                @click="tradeForm.type = 'sell'"
                class="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                :class="tradeForm.type === 'sell' ? 'bg-red-500 text-white' : ''"
                :style="tradeForm.type !== 'sell' ? { color: tokens.colors.text.muted } : {}"
              >
                {{ $t('portfolio.trade.typeSell') }}
              </button>
            </div>

            <!-- Stock Search/Select -->
            <div>
              <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                {{ $t('portfolio.broker.stock') }}
              </label>
              <div class="relative">
                <input 
                  v-model="tradeForm.symbolSearch"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  :placeholder="$t('portfolio.trade.searchPlaceholder')"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                  @focus="showStockDropdown = true"
                />
                <!-- Stock Dropdown -->
                <div 
                  v-if="showStockDropdown && filteredStocks.length > 0"
                  class="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-xl max-h-48 overflow-y-auto z-10"
                  :style="{ 
                    backgroundColor: tokens.colors.background.overlay,
                    borderColor: tokens.colors.border.strong
                  }"
                >
                  <button 
                    v-for="stock in filteredStocks" 
                    :key="stock.symbol"
                    @click="selectStock(stock)"
                    class="w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between"
                    :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                  >
                    <div>
                      <span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ stock.symbol }}</span>
                      <span class="ml-2" :style="{ color: tokens.colors.text.muted }">{{ stock.name }}</span>
                    </div>
                    <span :style="{ color: tokens.colors.text.secondary }">${{ stock.price.toFixed(2) }}</span>
                  </button>
                </div>
              </div>
              <!-- Selected Stock Info -->
              <div v-if="tradeForm.selectedStock" class="mt-2 p-3 rounded-lg" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-bold" :style="{ color: tokens.colors.text.primary }">{{ tradeForm.selectedStock.symbol }}</span>
                    <span class="ml-2 text-sm" :style="{ color: tokens.colors.text.muted }">{{ tradeForm.selectedStock.name }}</span>
                  </div>
                  <span class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">${{ tradeForm.selectedStock.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Quantity -->
            <div>
              <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                {{ $t('portfolio.trade.quantity') }}
              </label>
              <input 
                v-model.number="tradeForm.quantity"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                :style="{ 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  borderColor: tokens.colors.border.default,
                  color: tokens.colors.text.primary
                }"
              />
              <!-- Quick quantity selects -->
              <div class="flex gap-2 mt-2">
                <button 
                  v-for="qty in [10, 50, 100, 500]" 
                  :key="qty"
                  type="button"
                  @click="tradeForm.quantity = qty"
                  class="px-2 py-0.5 text-xs rounded border transition-colors"
                  :class="tradeForm.quantity === qty ? 'border-indigo-500 text-indigo-500' : ''"
                  :style="{ borderColor: tradeForm.quantity === qty ? '' : tokens.colors.border.subtle, color: tradeForm.quantity === qty ? '' : tokens.colors.text.muted }"
                >
                  {{ qty }}
                </button>
                <button 
                  v-if="tradeForm.type === 'sell' && maxSellQuantity > 0"
                  type="button"
                  @click="tradeForm.quantity = maxSellQuantity"
                  class="px-2 py-0.5 text-xs rounded border transition-colors text-red-500 border-red-500/30"
                >
                  全部 ({{ maxSellQuantity }})
                </button>
              </div>
            </div>

            <!-- Estimated Amount -->
            <div class="p-4 rounded-lg" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.trade.estimatedAmount') }}</span>
                <span class="font-bold text-lg" :style="{ color: tokens.colors.text.primary }">
                  {{ formatMoney(estimatedAmount) }}
                </span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.trade.availableCash') }}</span>
                <span :style="{ color: tokens.colors.text.secondary }">{{ formatMoney(portfolio?.availableCash || 0) }}</span>
              </div>
              <div v-if="tradeForm.type === 'buy'" class="flex items-center justify-between text-sm mt-1">
                <span :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.trade.afterTrade') }}</span>
                <span 
                  :class="(portfolio?.availableCash || 0) - estimatedAmount >= 0 ? '' : 'text-red-500'"
                  :style="(portfolio?.availableCash || 0) - estimatedAmount >= 0 ? { color: tokens.colors.text.secondary } : {}"
                >
                  {{ formatMoney((portfolio?.availableCash || 0) - estimatedAmount) }}
                </span>
              </div>
            </div>

            <!-- Error Message -->
            <p v-if="tradeError" class="text-sm text-red-500">{{ tradeError }}</p>

            <!-- Submit Button -->
            <button 
              @click="executeTrade"
              :disabled="!canExecuteTrade"
              class="w-full py-3 rounded-lg font-medium transition-colors"
              :class="[
                canExecuteTrade 
                  ? (tradeForm.type === 'buy' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white')
                  : 'bg-gray-400 cursor-not-allowed text-white'
              ]"
            >
              {{ tradeForm.type === 'buy' ? $t('portfolio.trade.confirmBuy') : $t('portfolio.trade.confirmSell') }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'

const props = defineProps({
  portfolio: { type: Object, required: true },
  tradeType: { type: String, default: 'buy' },
  preSelectedStock: { type: Object, default: null }
})

const emit = defineEmits(['close', 'trade'])

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// Sample stocks for trading
const sampleStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.50 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50 },
  { symbol: 'META', name: 'Meta Platforms', price: 358.32 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.42 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 172.65 },
  { symbol: 'V', name: 'Visa Inc.', price: 262.84 },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 163.18 },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 95.50 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 478.25 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 145.80 },
  { symbol: 'INTC', name: 'Intel Corporation', price: 42.15 },
  { symbol: 'CRM', name: 'Salesforce Inc.', price: 265.40 }
]

// State
const showStockDropdown = ref(false)
const tradeForm = ref({
  type: 'buy',
  symbolSearch: '',
  selectedStock: null,
  quantity: 10
})
const tradeError = ref('')

// Initialize with props
onMounted(() => {
  tradeForm.value.type = props.tradeType
  
  if (props.preSelectedStock) {
    const stock = sampleStocks.find(s => s.symbol === props.preSelectedStock.symbol)
    if (stock) {
      tradeForm.value.selectedStock = stock
      tradeForm.value.symbolSearch = stock.symbol
      tradeForm.value.quantity = props.preSelectedStock.quantity || 10
    }
  }
})

// Computed
const filteredStocks = computed(() => {
  const search = tradeForm.value.symbolSearch.toLowerCase()
  if (!search) return sampleStocks.slice(0, 6)
  return sampleStocks.filter(s => 
    s.symbol.toLowerCase().includes(search) || 
    s.name.toLowerCase().includes(search)
  ).slice(0, 6)
})

const estimatedAmount = computed(() => {
  if (!tradeForm.value.selectedStock || !tradeForm.value.quantity) return 0
  return tradeForm.value.selectedStock.price * tradeForm.value.quantity
})

const maxSellQuantity = computed(() => {
  if (!tradeForm.value.selectedStock || !props.portfolio?.holdings) return 0
  const holding = props.portfolio.holdings.find(h => h.symbol === tradeForm.value.selectedStock.symbol)
  return holding?.quantity || 0
})

const canExecuteTrade = computed(() => {
  if (!tradeForm.value.selectedStock || tradeForm.value.quantity <= 0) return false
  
  if (tradeForm.value.type === 'buy') {
    return estimatedAmount.value <= (props.portfolio?.availableCash || 0)
  } else {
    return maxSellQuantity.value >= tradeForm.value.quantity
  }
})

// Format money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

// Stock selection
const selectStock = (stock) => {
  tradeForm.value.selectedStock = stock
  tradeForm.value.symbolSearch = stock.symbol
  showStockDropdown.value = false
}

// Execute trade
const executeTrade = () => {
  if (!canExecuteTrade.value) {
    tradeError.value = tradeForm.value.type === 'buy' 
      ? t('portfolio.trade.insufficientCash') 
      : t('portfolio.trade.insufficientShares')
    return
  }

  const stock = tradeForm.value.selectedStock
  
  // Emit trade data
  emit('trade', {
    type: tradeForm.value.type,
    symbol: stock.symbol,
    name: stock.name,
    quantity: tradeForm.value.quantity,
    price: stock.price
  })
}

// Close dropdown when clicking outside
watch(showStockDropdown, (val) => {
  if (val) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showStockDropdown.value = false
  }
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
</style>
