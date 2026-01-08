<template>
  <div class="space-y-6">
    <!-- List View -->
    <div v-if="!selectedPortfolio">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.simulation.listTitle') }}
        </h2>
        <button 
          @click="showCreateModal = true"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ $t('portfolio.simulation.createBtn') }}
        </button>
      </div>

      <!-- Empty State -->
      <div 
        v-if="portfolios.length === 0"
        class="max-w-lg mx-auto border rounded-lg p-12 text-center"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div 
          class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)' }"
        >
          <svg class="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.simulation.emptyTitle') }}
        </h3>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">
          {{ $t('portfolio.simulation.emptyDesc') }}
        </p>
        <button 
          @click="showCreateModal = true"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {{ $t('portfolio.simulation.createFirst') }}
        </button>
      </div>

      <!-- Portfolio Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="portfolio in portfolios" 
          :key="portfolio.id"
          class="border rounded-lg p-5 transition-all cursor-pointer group"
          :class="isDark ? 'hover:border-white/20' : 'hover:border-black/20'"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: tokens.colors.border.default 
          }"
          @click="selectPortfolio(portfolio)"
        >
          <!-- Card Header -->
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="font-bold text-lg mb-1" :style="{ color: tokens.colors.text.primary }">
                {{ portfolio.name }}
              </h3>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.simulation.cardCreatedAt') }} {{ formatDate(portfolio.createdAt) }}
              </p>
            </div>
            <div class="flex items-center gap-1">
              <button 
                @click.stop="editPortfolio(portfolio)"
                class="p-1.5 rounded-md transition-colors"
                :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
              >
                <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click.stop="confirmDeletePortfolio(portfolio)"
                class="p-1.5 rounded-md transition-colors hover:bg-red-500/10"
              >
                <svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div 
              class="p-3 rounded-md"
              :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
            >
              <p class="text-xs mb-0.5" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.initialCapital') }}</p>
              <p class="font-bold" :style="{ color: tokens.colors.text.primary }">
                {{ formatMoney(portfolio.initialCapital) }}
              </p>
            </div>
            <div 
              class="p-3 rounded-md"
              :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
            >
              <p class="text-xs mb-0.5" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.currentValue') }}</p>
              <p class="font-bold" :style="{ color: tokens.colors.text.primary }">
                {{ formatMoney(portfolio.currentValue) }}
              </p>
            </div>
          </div>

          <!-- Return -->
          <div class="flex items-center justify-between pt-3 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
            <span class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.totalReturn') }}</span>
            <span 
              class="font-bold"
              :class="portfolio.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'"
            >
              {{ portfolio.totalReturn >= 0 ? '+' : '' }}{{ portfolio.totalReturn.toFixed(2) }}%
            </span>
          </div>

          <!-- Quick Stats -->
          <div class="flex items-center gap-4 mt-3 text-xs" :style="{ color: tokens.colors.text.muted }">
            <span>{{ $t('portfolio.simulation.cardHoldings') }}: {{ portfolio.holdings?.length || 0 }}</span>
            <span>{{ $t('portfolio.simulation.cardTrades') }}: {{ portfolio.trades?.length || 0 }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail View -->
    <SimulationDetail 
      v-else 
      :portfolio="selectedPortfolio"
      @back="selectedPortfolio = null"
      @update="handlePortfolioUpdate"
      @delete="handlePortfolioDelete"
    />

    <!-- Create Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="showCreateModal" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            class="absolute inset-0 backdrop-blur-sm"
            :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }"
            @click="showCreateModal = false"
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
                {{ $t('portfolio.simulation.createModal.title') }}
              </h3>
              <button 
                @click="showCreateModal = false"
                class="p-1 rounded-md transition-colors"
                :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
              >
                <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="createPortfolio" class="p-6 space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.nameLabel') }}
                </label>
                <input 
                  v-model="newPortfolio.name"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="$t('portfolio.simulation.createModal.namePlaceholder')"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                />
              </div>

              <!-- Initial Capital -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.capitalLabel') }}
                </label>
                <input 
                  v-model.number="newPortfolio.initialCapital"
                  type="number"
                  min="1000"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                />
                <div class="flex gap-2 mt-2">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.createModal.quickSelect') }}:</span>
                  <button 
                    v-for="amount in [10000, 50000, 100000, 500000]" 
                    :key="amount"
                    type="button"
                    @click="newPortfolio.initialCapital = amount"
                    class="px-2 py-0.5 text-xs rounded border transition-colors"
                    :class="newPortfolio.initialCapital === amount ? 'border-blue-500 text-blue-500' : ''"
                    :style="{ borderColor: newPortfolio.initialCapital === amount ? '' : tokens.colors.border.subtle, color: newPortfolio.initialCapital === amount ? '' : tokens.colors.text.muted }"
                  >
                    ${{ (amount / 1000).toFixed(0) }}K
                  </button>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.descLabel') }} 
                  <span class="font-normal" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.createModal.optional') }}</span>
                </label>
                <textarea 
                  v-model="newPortfolio.description"
                  rows="3"
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  :placeholder="$t('portfolio.simulation.createModal.descPlaceholder')"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                ></textarea>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-2">
                <button 
                  type="button"
                  @click="showCreateModal = false"
                  class="flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                >
                  {{ $t('portfolio.simulation.createModal.cancelBtn') }}
                </button>
                <button 
                  type="submit"
                  class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {{ $t('portfolio.simulation.createModal.createBtn') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import SimulationDetail from './SimulationDetail.vue'

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// State
const portfolios = ref([])
const selectedPortfolio = ref(null)
const showCreateModal = ref(false)
const newPortfolio = ref({
  name: '',
  initialCapital: 100000,
  description: ''
})

// Load portfolios from localStorage
onMounted(() => {
  loadPortfolios()
})

const loadPortfolios = () => {
  try {
    const stored = localStorage.getItem('paper_portfolios')
    if (stored) {
      portfolios.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load portfolios:', error)
  }
}

const savePortfolios = () => {
  localStorage.setItem('paper_portfolios', JSON.stringify(portfolios.value))
}

// Format money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Create portfolio
const createPortfolio = () => {
  const portfolio = {
    id: `sim_${Date.now()}`,
    name: newPortfolio.value.name,
    description: newPortfolio.value.description,
    initialCapital: newPortfolio.value.initialCapital,
    currentValue: newPortfolio.value.initialCapital,
    availableCash: newPortfolio.value.initialCapital,
    totalReturn: 0,
    dailyReturn: 0,
    holdings: [],
    trades: [],
    equityCurve: [{ date: new Date().toISOString(), value: newPortfolio.value.initialCapital }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  portfolios.value.push(portfolio)
  savePortfolios()
  
  // Reset form
  newPortfolio.value = { name: '', initialCapital: 100000, description: '' }
  showCreateModal.value = false
}

// Select portfolio
const selectPortfolio = (portfolio) => {
  selectedPortfolio.value = portfolio
}

// Edit portfolio
const editPortfolio = (portfolio) => {
  // TODO: Implement edit modal
  console.log('Edit:', portfolio)
}

// Delete portfolio
const confirmDeletePortfolio = (portfolio) => {
  if (confirm(t('portfolio.simulation.detail.deleteConfirm'))) {
    portfolios.value = portfolios.value.filter(p => p.id !== portfolio.id)
    savePortfolios()
  }
}

// Handle portfolio update from detail view
const handlePortfolioUpdate = (updatedPortfolio) => {
  const index = portfolios.value.findIndex(p => p.id === updatedPortfolio.id)
  if (index !== -1) {
    portfolios.value[index] = updatedPortfolio
    savePortfolios()
    selectedPortfolio.value = updatedPortfolio
  }
}

// Handle portfolio delete from detail view
const handlePortfolioDelete = (portfolioId) => {
  portfolios.value = portfolios.value.filter(p => p.id !== portfolioId)
  savePortfolios()
  selectedPortfolio.value = null
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
