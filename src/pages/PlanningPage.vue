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
              <h1 class="text-2xl font-bold text-white">交易计划管理</h1>
              <p class="text-sm text-gray-400">为您的投资机会生成专业的交易计划</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <!-- Stats -->
            <div class="flex items-center gap-4 px-4 py-2 bg-[#1a1a1a] rounded-lg border border-[#404040]">
              <div class="text-center">
                <div class="text-xs text-gray-400">正在生成</div>
                <div class="text-lg font-bold text-blue-400">{{ generatingPlans.length }}</div>
              </div>
              <div class="w-px h-8 bg-[#404040]"></div>
              <div class="text-center">
                <div class="text-xs text-gray-400">已完成</div>
                <div class="text-lg font-bold text-green-400">{{ completedPlans.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Generating Plans Section -->
      <div v-if="generatingPlans.length > 0" class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <h2 class="text-xl font-bold text-white">正在生成的计划</h2>
          <span class="text-sm text-gray-400">({{ generatingPlans.length }})</span>
        </div>

        <div class="space-y-4">
          <div
            v-for="plan in generatingPlans"
            :key="plan.id"
            class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 hover:border-blue-500/50 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <svg class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-mono text-lg font-bold text-blue-400">{{ plan.symbol }}</span>
                    <span class="text-gray-300">{{ plan.stockName }}</span>
                  </div>
                  <div class="text-sm text-gray-400">{{ plan.status }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-blue-400">{{ plan.progress }}%</div>
                <div class="text-xs text-gray-500">预计 {{ plan.estimatedTime }}s</div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
              <div 
                class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
                :style="{ width: `${plan.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Completed Plans Section -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <h2 class="text-xl font-bold text-white">已生成的计划</h2>
            <span class="text-sm text-gray-400">({{ completedPlans.length }})</span>
          </div>

        <!-- Filter & Sort -->
        <div class="flex items-center gap-3">
            <!-- Batch Update Button -->
            <button
              v-if="selectedPlanIds.length > 0"
              @click="batchUpdatePlans"
              class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>一键更新 ({{ selectedPlanIds.length }})</span>
            </button>

            <select
              v-model="filterType"
              class="px-4 py-2 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="all">全部类型</option>
              <option value="BUY">买入</option>
              <option value="WAIT_SHORT">观望做空</option>
              <option value="HOLD">持有</option>
              <option value="SELL">卖出</option>
            </select>

            <select
              v-model="sortBy"
              class="px-4 py-2 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="newest">最新创建</option>
              <option value="oldest">最早创建</option>
              <option value="symbol">股票代码</option>
            </select>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPlans.length === 0" class="text-center py-16">
          <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full mb-6">
            <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">暂无交易计划</h3>
          <p class="text-gray-400 mb-6">从投资机会报告生成您的第一个交易计划</p>
          <button
            @click="goToOpportunity"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            返回投资机会
          </button>
        </div>

        <!-- Plans Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="plan in filteredPlans"
            :key="plan.id"
            :class="[
              'bg-[#2a2a2a] border rounded-xl p-5 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer group relative',
              selectedPlanIds.includes(plan.id) 
                ? 'border-blue-500 bg-blue-500/5' 
                : 'border-[#404040] hover:border-blue-500'
            ]"
          >
            <!-- Selection Checkbox -->
            <div 
              @click.stop="togglePlanSelection(plan.id)"
              class="absolute top-4 left-4 z-10 w-6 h-6 rounded border-2 flex items-center justify-center cursor-pointer transition-all"
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

            <!-- Plan Card Content (with left padding to accommodate checkbox) -->
            <div @click="viewPlanDetail(plan)" class="pl-8">
              <!-- Plan Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm',
                    getActionTypeStyle(plan.actionType)
                  ]">
                    {{ plan.symbol.slice(0, 2) }}
                  </div>
                  <div>
                    <div class="font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                      {{ plan.symbol }}
                    </div>
                    <div class="text-xs text-gray-400">{{ plan.stockName }}</div>
                  </div>
                </div>
                <button
                  @click.stop="deletePlan(plan.id)"
                  class="w-8 h-8 rounded-lg bg-[#3a3a3a] hover:bg-red-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg class="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>

            <!-- Action Type Badge -->
            <div class="mb-4">
              <span :class="[
                'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium',
                getActionTypeBadgeStyle(plan.actionType)
              ]">
                {{ getActionTypeLabel(plan.actionType) }}
              </span>
            </div>

            <!-- Plan Info -->
            <div class="space-y-2 mb-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">信心水平</span>
                <div class="flex items-center gap-1">
                  <div v-for="i in 5" :key="i" :class="[
                    'w-2 h-2 rounded-full',
                    i <= plan.confidenceLevel ? 'bg-green-500' : 'bg-gray-700'
                  ]"></div>
                </div>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">入场点数量</span>
                <span class="text-white font-medium">{{ plan.entryPointsCount || 0 }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-400">生成时间</span>
                <span class="text-gray-300">{{ formatDate(plan.createdAt) }}</span>
              </div>
            </div>

              <!-- Footer -->
              <div class="pt-4 border-t border-[#404040]">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">点击查看完整计划</span>
                  <svg class="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Broker Account Section -->
      <div class="mt-12">
        <BrokerAccountCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import BrokerAccountCard from '../components/broker/BrokerAccountCard.vue'

const router = useRouter()

// State
const generatingPlans = ref([])
const completedPlans = ref([])
const filterType = ref('all')
const sortBy = ref('newest')
const selectedPlanIds = ref([]) // Track selected plans for batch update

// Computed
const filteredPlans = computed(() => {
  let plans = [...completedPlans.value]
  
  // Filter by type
  if (filterType.value !== 'all') {
    plans = plans.filter(plan => plan.actionType === filterType.value)
  }
  
  // Sort
  if (sortBy.value === 'newest') {
    plans.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } else if (sortBy.value === 'oldest') {
    plans.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  } else if (sortBy.value === 'symbol') {
    plans.sort((a, b) => a.symbol.localeCompare(b.symbol))
  }
  
  return plans
})

// Methods
const goBack = () => {
  router.push('/opportunity')
}

const goToOpportunity = () => {
  router.push('/opportunity')
}

const viewPlanDetail = (plan) => {
  sessionStorage.setItem('current_plan', JSON.stringify(plan))
  router.push(`/planning/${plan.id}`)
}

const deletePlan = (planId) => {
  if (confirm('确定要删除这个交易计划吗？')) {
    completedPlans.value = completedPlans.value.filter(p => p.id !== planId)
    savePlansToStorage()
  }
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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`
  if (diffHours < 24) return `${diffHours}小时前`
  if (diffDays < 7) return `${diffDays}天前`
  
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const loadPlansFromStorage = () => {
  try {
    const storedPlans = localStorage.getItem('trading_plans')
    if (storedPlans) {
      completedPlans.value = JSON.parse(storedPlans)
    }
  } catch (error) {
    console.error('Failed to load plans:', error)
  }
}

const savePlansToStorage = () => {
  try {
    localStorage.setItem('trading_plans', JSON.stringify(completedPlans.value))
  } catch (error) {
    console.error('Failed to save plans:', error)
  }
}

const generatePlanFromSessionData = () => {
  try {
    const planningData = sessionStorage.getItem('planning_data')
    if (!planningData) return
    
    const data = JSON.parse(planningData)
    
    // Support both old single report format and new multiple reports format
    const reports = data.reports || [{ report: data.report, position: data.position }]
    
    // Generate plans for each report
    reports.forEach((item, index) => {
      const { report, position } = item
      
      // Create a generating plan with slight delay for visual effect
      setTimeout(() => {
        const generatingPlan = {
          id: `gen_${Date.now()}_${index}`,
          symbol: report.symbol,
          stockName: report.stockName,
          status: '正在分析报告数据...',
          progress: 0,
          estimatedTime: 15
        }
        
        generatingPlans.value.push(generatingPlan)
        
        // Simulate plan generation
        simulatePlanGeneration(generatingPlan, report, position)
      }, index * 500) // Stagger the start of each plan generation
    })
    
    // Clear session data
    sessionStorage.removeItem('planning_data')
  } catch (error) {
    console.error('Failed to generate plan:', error)
  }
}

const simulatePlanGeneration = (generatingPlan, report, position) => {
  const steps = [
    { progress: 20, status: '分析市场数据...', time: 2000 },
    { progress: 40, status: '生成入场计划...', time: 3000 },
    { progress: 60, status: '计算止盈点位...', time: 3000 },
    { progress: 80, status: '设置止损策略...', time: 2000 },
    { progress: 100, status: '完成计划生成', time: 2000 }
  ]
  
  let currentStep = 0
  
  const updateProgress = () => {
    if (currentStep >= steps.length) {
      // Plan generation complete
      const completedPlan = createCompletedPlan(report, position)
      completedPlans.value.unshift(completedPlan)
      generatingPlans.value = generatingPlans.value.filter(p => p.id !== generatingPlan.id)
      savePlansToStorage()
      return
    }
    
    const step = steps[currentStep]
    generatingPlan.progress = step.progress
    generatingPlan.status = step.status
    generatingPlan.estimatedTime = Math.ceil((steps.length - currentStep) * 2.5)
    
    currentStep++
    setTimeout(updateProgress, step.time)
  }
  
  setTimeout(updateProgress, 1000)
}

const createCompletedPlan = (report, position) => {
  // Determine action type based on report data
  const actionType = determineActionType(report, position)
  
  return {
    id: `plan_${Date.now()}`,
    symbol: report.symbol,
    stockName: report.stockName,
    actionType: actionType,
    confidenceLevel: report.confidenceLevel || 4,
    entryPointsCount: Math.floor(Math.random() * 3) + 2, // 2-4 entry points
    createdAt: new Date().toISOString(),
    report: report,
    position: position,
    // Entry plan
    entryPlan: {
      description: generateEntryDescription(actionType, report),
      triggers: generateEntryTriggers(actionType, report)
    },
    // Take profit plan
    takeProfitPlan: {
      description: generateTakeProfitDescription(actionType, report),
      triggers: generateTakeProfitTriggers(actionType, report)
    },
    // Stop loss plan
    stopLossPlan: {
      description: generateStopLossDescription(actionType, report),
      trigger: generateStopLossTrigger(actionType, report)
    },
    // Analysis
    analysis: {
      methodology: report.framework || '技术分析',
      marketAnalysis: report.marketContext || '市场处于整体上升趋势',
      bullishPoints: report.reasons?.slice(0, 3) || [],
      bearishPoints: report.risks?.slice(0, 2) || [],
      keyMistakes: '过早止损、仓位过重',
      mainRisks: report.primaryRisk || '市场波动加剧',
      strategyPoints: '分批建仓、严格止损'
    }
  }
}

const determineActionType = (report, position) => {
  if (!position.hasPosition) {
    return report.recommendation === 'BUY' ? 'BUY' : 'WAIT_SHORT'
  }
  
  const currentPrice = report.entryPrice
  const costBasis = position.costBasis
  const profitPercent = ((currentPrice - costBasis) / costBasis) * 100
  
  if (profitPercent > 20) return 'SELL'
  if (profitPercent < -10) return 'SELL'
  return 'HOLD'
}

const generateEntryDescription = (actionType, report) => {
  if (actionType === 'BUY') {
    return '建议分批建仓，在关键支撑位附近分3次买入，每次建仓1/3仓位。'
  } else if (actionType === 'WAIT_SHORT') {
    return '当前不建议立即入场，等待价格回调至关键支撑位或突破压力位后再考虑。'
  } else if (actionType === 'HOLD') {
    return '维持当前持仓，不建议加仓或减仓。'
  }
  return '根据市场情况灵活调整入场策略。'
}

const generateEntryTriggers = (actionType, report) => {
  const basePrice = report.entryPrice
  
  if (actionType === 'BUY') {
    return [
      {
        price: (basePrice * 0.98).toFixed(2),
        reason: '价格回调至近期支撑位',
        allocation: 33
      },
      {
        price: (basePrice * 0.95).toFixed(2),
        reason: '价格进一步回调，风险回报比更优',
        allocation: 33
      },
      {
        price: (basePrice * 1.02).toFixed(2),
        reason: '价格突破阻力位，趋势确认',
        allocation: 34
      }
    ]
  }
  
  return []
}

const generateTakeProfitDescription = (actionType, report) => {
  return '建议分批止盈，在不同目标位分次卖出，锁定利润同时保留上涨空间。'
}

const generateTakeProfitTriggers = (actionType, report) => {
  const basePrice = report.entryPrice
  
  return [
    {
      price: (basePrice * 1.10).toFixed(2),
      reason: '达到第一目标位，锁定部分利润',
      allocation: 30
    },
    {
      price: (basePrice * 1.20).toFixed(2),
      reason: '达到第二目标位，进一步获利了结',
      allocation: 40
    },
    {
      price: (basePrice * 1.30).toFixed(2),
      reason: '达到第三目标位，全部清仓',
      allocation: 30
    }
  ]
}

const generateStopLossDescription = (actionType, report) => {
  return '设置止损保护本金，如价格跌破关键支撑位应果断止损。'
}

const generateStopLossTrigger = (actionType, report) => {
  const basePrice = report.entryPrice
  
  return {
    price: (basePrice * 0.92).toFixed(2),
    reason: '跌破关键支撑位，趋势可能反转',
    allocation: 100
  }
}

// Multi-select functionality
const togglePlanSelection = (planId) => {
  const index = selectedPlanIds.value.indexOf(planId)
  if (index === -1) {
    selectedPlanIds.value.push(planId)
  } else {
    selectedPlanIds.value.splice(index, 1)
  }
}

// Batch update functionality
const batchUpdatePlans = async () => {
  if (selectedPlanIds.value.length === 0) return
  
  // Get selected plans
  const selectedPlans = completedPlans.value.filter(plan => 
    selectedPlanIds.value.includes(plan.id)
  )
  
  // Confirm with user
  const confirmed = confirm(`确定要更新选中的 ${selectedPlans.length} 个计划吗？`)
  if (!confirmed) return
  
  // Clear selection
  selectedPlanIds.value = []
  
  // Start regenerating each plan
  selectedPlans.forEach((plan, index) => {
    setTimeout(() => {
      const generatingPlan = {
        id: `gen_${Date.now()}_${index}`,
        symbol: plan.symbol,
        stockName: plan.stockName,
        status: '正在更新计划数据...',
        progress: 0,
        estimatedTime: 15,
        originalPlanId: plan.id // Track which plan is being updated
      }
      
      generatingPlans.value.push(generatingPlan)
      
      // Simulate plan regeneration
      simulatePlanRegeneration(generatingPlan, plan)
    }, index * 500) // Stagger the start of each plan update
  })
}

const simulatePlanRegeneration = (generatingPlan, originalPlan) => {
  const steps = [
    { progress: 20, status: '重新分析市场数据...', time: 2000 },
    { progress: 40, status: '更新入场计划...', time: 3000 },
    { progress: 60, status: '重新计算止盈点位...', time: 3000 },
    { progress: 80, status: '更新止损策略...', time: 2000 },
    { progress: 100, status: '完成计划更新', time: 2000 }
  ]
  
  let currentStep = 0
  
  const updateProgress = () => {
    if (currentStep >= steps.length) {
      // Plan update complete - replace the old plan with updated one
      const updatedPlan = {
        ...originalPlan,
        id: `plan_${Date.now()}`, // New ID for updated plan
        createdAt: new Date().toISOString(), // Update timestamp
        // Simulate some changes to show it's been updated
        confidenceLevel: Math.min(5, Math.max(3, originalPlan.confidenceLevel + (Math.random() > 0.5 ? 1 : -1))),
        entryPointsCount: Math.max(2, originalPlan.entryPointsCount + (Math.random() > 0.5 ? 1 : 0))
      }
      
      // Remove the old plan and add the updated one
      completedPlans.value = completedPlans.value.filter(p => p.id !== originalPlan.id)
      completedPlans.value.unshift(updatedPlan)
      
      // Remove from generating queue
      generatingPlans.value = generatingPlans.value.filter(p => p.id !== generatingPlan.id)
      
      savePlansToStorage()
      return
    }
    
    const step = steps[currentStep]
    generatingPlan.progress = step.progress
    generatingPlan.status = step.status
    generatingPlan.estimatedTime = Math.ceil((steps.length - currentStep) * 2.5)
    
    currentStep++
    setTimeout(updateProgress, step.time)
  }
  
  setTimeout(updateProgress, 1000)
}

// Lifecycle
onMounted(() => {
  loadPlansFromStorage()
  generatePlanFromSessionData()
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
