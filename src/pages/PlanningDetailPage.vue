<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Header -->
    <div class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4">
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
              <h1 class="text-2xl font-bold text-white">交易计划详情</h1>
              <p class="text-sm text-gray-400">基于投资机会报告的专业交易计划</p>
            </div>
          </div>
          
          <button
            @click="deletePlan"
            class="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors border border-red-600/30"
          >
            删除计划
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-if="plan" class="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <!-- Trading Plan Header -->
      <div class="bg-gradient-to-br from-[#2a2a2a] to-[#252525] border border-[#404040] rounded-2xl p-8 shadow-xl">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center gap-4">
            <div :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center font-mono font-bold text-2xl shadow-lg',
              getActionTypeStyle(plan.actionType)
            ]">
              {{ plan.symbol.slice(0, 2) }}
            </div>
            <div>
              <div class="flex items-center gap-3 mb-2">
                <span class="font-mono text-3xl font-bold text-white">{{ plan.symbol }}</span>
                <span class="text-xl text-gray-300">{{ plan.stockName }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium',
                  getActionTypeBadgeStyle(plan.actionType)
                ]">
                  {{ getActionTypeLabel(plan.actionType) }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-400">信心水平</span>
                  <div class="flex items-center gap-1">
                    <div v-for="i in 5" :key="i" :class="[
                      'w-2.5 h-2.5 rounded-full transition-all',
                      i <= plan.confidenceLevel ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700'
                    ]"></div>
                  </div>
                  <span class="text-sm font-medium text-green-400">{{ plan.confidenceLevel }}/5</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-500 mb-1">生成时间</div>
            <div class="text-sm text-gray-300">{{ formatDateTime(plan.createdAt) }}</div>
          </div>
        </div>

        <!-- Action Description -->
        <div class="bg-[#1a1a1a] rounded-xl p-6 border border-[#404040]">
          <h3 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            操作说明
          </h3>
          <p class="text-gray-300 leading-relaxed">{{ getActionDescription(plan.actionType) }}</p>
        </div>
      </div>

      <!-- Entry Plan -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-2xl p-6 shadow-lg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">入场计划</h2>
            <p class="text-sm text-gray-400">Entry Strategy</p>
          </div>
        </div>

        <div class="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <p class="text-gray-300 leading-relaxed">{{ plan.entryPlan.description }}</p>
        </div>

        <div v-if="plan.entryPlan.triggers && plan.entryPlan.triggers.length > 0" class="space-y-3">
          <div
            v-for="(trigger, index) in plan.entryPlan.triggers"
            :key="index"
            class="bg-[#1a1a1a] rounded-xl p-5 border border-[#404040] hover:border-green-500/50 transition-all"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-sm font-bold text-green-400">
                  {{ index + 1 }}
                </div>
                <div>
                  <div class="text-lg font-bold text-green-400 font-mono">${{ trigger.price }}</div>
                  <div class="text-xs text-gray-500">触发价格</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-white">{{ trigger.allocation }}%</div>
                <div class="text-xs text-gray-500">建议仓位</div>
              </div>
            </div>
            <div class="flex items-start gap-2 text-sm text-gray-300">
              <svg class="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <span>{{ trigger.reason }}</span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          根据当前持仓情况，暂无入场建议
        </div>
      </div>

      <!-- Take Profit Plan -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-2xl p-6 shadow-lg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">止盈计划</h2>
            <p class="text-sm text-gray-400">Take Profit Strategy</p>
          </div>
        </div>

        <div class="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <p class="text-gray-300 leading-relaxed">{{ plan.takeProfitPlan.description }}</p>
        </div>

        <div class="space-y-3">
          <div
            v-for="(trigger, index) in plan.takeProfitPlan.triggers"
            :key="index"
            class="bg-[#1a1a1a] rounded-xl p-5 border border-[#404040] hover:border-blue-500/50 transition-all"
          >
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">
                  T{{ index + 1 }}
                </div>
                <div>
                  <div class="text-lg font-bold text-blue-400 font-mono">${{ trigger.price }}</div>
                  <div class="text-xs text-gray-500">目标价格</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-white">{{ trigger.allocation }}%</div>
                <div class="text-xs text-gray-500">卖出仓位</div>
              </div>
            </div>
            <div class="flex items-start gap-2 text-sm text-gray-300">
              <svg class="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <span>{{ trigger.reason }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stop Loss Plan -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-2xl p-6 shadow-lg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">止损计划</h2>
            <p class="text-sm text-gray-400">Stop Loss Strategy</p>
          </div>
        </div>

        <div class="mb-6 p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <p class="text-gray-300 leading-relaxed">{{ plan.stopLossPlan.description }}</p>
        </div>

        <div class="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-5 border-2 border-red-500/30">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-red-500/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="text-lg font-bold text-red-400 font-mono">${{ plan.stopLossPlan.trigger.price }}</div>
                <div class="text-xs text-gray-500">止损价格</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-white">{{ plan.stopLossPlan.trigger.allocation }}%</div>
              <div class="text-xs text-gray-500">清仓比例</div>
            </div>
          </div>
          <div class="flex items-start gap-2 text-sm text-gray-300">
            <svg class="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <span>{{ plan.stopLossPlan.trigger.reason }}</span>
          </div>
        </div>
      </div>

      <!-- Analysis Section -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-2xl p-6 shadow-lg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white">深度分析</h2>
            <p class="text-sm text-gray-400">Comprehensive Analysis</p>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Methodology -->
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">分析方法</h3>
            <div class="bg-[#1a1a1a] rounded-lg p-4 border border-[#404040]">
              <p class="text-gray-300">{{ plan.analysis.methodology }}</p>
            </div>
          </div>

          <!-- Market Analysis -->
          <div>
            <h3 class="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">市场综合分析</h3>
            <div class="bg-[#1a1a1a] rounded-lg p-4 border border-[#404040]">
              <p class="text-gray-300">{{ plan.analysis.marketAnalysis }}</p>
            </div>
          </div>

          <!-- Bullish vs Bearish Points -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                主要论点 (看涨)
              </h3>
              <div class="bg-green-500/5 rounded-lg p-4 border border-green-500/20 space-y-2">
                <div v-for="(point, index) in plan.analysis.bullishPoints" :key="index" class="flex items-start gap-2 text-sm text-gray-300">
                  <span class="text-green-400 mt-1">•</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                反驳论点 (看跌)
              </h3>
              <div class="bg-red-500/5 rounded-lg p-4 border border-red-500/20 space-y-2">
                <div v-for="(point, index) in plan.analysis.bearishPoints" :key="index" class="flex items-start gap-2 text-sm text-gray-300">
                  <span class="text-red-400 mt-1">•</span>
                  <span>{{ point }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Mistakes -->
          <div>
            <h3 class="text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wider">关键错误与可能性</h3>
            <div class="bg-orange-500/5 rounded-lg p-4 border border-orange-500/20">
              <p class="text-gray-300">{{ plan.analysis.keyMistakes }}</p>
            </div>
          </div>

          <!-- Main Risks -->
          <div>
            <h3 class="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wider">避免关注的主要风险</h3>
            <div class="bg-red-500/5 rounded-lg p-4 border border-red-500/20">
              <p class="text-gray-300">{{ plan.analysis.mainRisks }}</p>
            </div>
          </div>

          <!-- Strategy Points -->
          <div>
            <h3 class="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">策略与仓储要点</h3>
            <div class="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
              <p class="text-gray-300">{{ plan.analysis.strategyPoints }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="max-w-6xl mx-auto px-6 py-16 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
        <svg class="w-8 h-8 text-gray-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
      <p class="text-gray-400">加载计划详情...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const plan = ref(null)

// Methods
const goBack = () => {
  router.push('/planning')
}

const deletePlan = () => {
  if (!confirm('确定要删除这个交易计划吗？')) return
  
  try {
    // Remove from localStorage
    const storedPlans = localStorage.getItem('trading_plans')
    if (storedPlans) {
      const plans = JSON.parse(storedPlans)
      const updatedPlans = plans.filter(p => p.id !== plan.value.id)
      localStorage.setItem('trading_plans', JSON.stringify(updatedPlans))
    }
    
    // Navigate back
    router.push('/planning')
  } catch (error) {
    console.error('Failed to delete plan:', error)
    alert('删除失败，请稍后重试')
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
    'BUY': 'bg-green-500/20 text-green-400 border-2 border-green-500/50',
    'SELL': 'bg-red-500/20 text-red-400 border-2 border-red-500/50',
    'HOLD': 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/50',
    'WAIT_SHORT': 'bg-orange-500/20 text-orange-400 border-2 border-orange-500/50'
  }
  return styles[type] || 'bg-gray-500/20 text-gray-400 border-2 border-gray-500/50'
}

const getActionDescription = (type) => {
  const descriptions = {
    'BUY': '基于当前市场分析和技术指标，建议建立多头仓位。请根据下方的入场计划分批建仓，严格执行止盈止损策略。',
    'SELL': '当前持仓已达到预期目标或出现风险信号，建议逐步减仓或清仓。请参考止盈计划和止损计划执行卖出操作。',
    'HOLD': '维持当前持仓不变，密切关注市场动态和关键价格水平。如触发止盈或止损条件，应及时执行相应策略。',
    'WAIT_SHORT': '当前不建议立即入场，建议观望等待更好的入场时机。密切关注关键支撑位和阻力位的突破情况。'
  }
  return descriptions[type] || '请根据市场情况灵活调整交易策略。'
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadPlanData = () => {
  try {
    // Try to get from sessionStorage first
    const sessionPlan = sessionStorage.getItem('current_plan')
    if (sessionPlan) {
      plan.value = JSON.parse(sessionPlan)
      return
    }
    
    // Otherwise, try to find in localStorage by ID
    const planId = route.params.planId
    if (!planId) {
      console.error('No plan ID provided')
      router.push('/planning')
      return
    }
    
    const storedPlans = localStorage.getItem('trading_plans')
    if (storedPlans) {
      const plans = JSON.parse(storedPlans)
      const foundPlan = plans.find(p => p.id === planId)
      if (foundPlan) {
        plan.value = foundPlan
        return
      }
    }
    
    // If not found, redirect back
    console.error('Plan not found')
    router.push('/planning')
  } catch (error) {
    console.error('Failed to load plan:', error)
    router.push('/planning')
  }
}

// Lifecycle
onMounted(() => {
  loadPlanData()
})
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
