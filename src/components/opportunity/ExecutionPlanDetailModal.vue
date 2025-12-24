<template>
  <div 
    v-if="visible" 
    class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300" 
    :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }" 
    @click.self="close"
  >
    <div 
      class="border w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100" 
      :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
    >
      <!-- Modal Header -->
      <div 
        class="px-6 py-4 border-b flex justify-between items-center shrink-0" 
        :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }"
      >
        <div class="flex items-center gap-3">
          <!-- Plan Name -->
          <h2 class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">
            {{ planData?.name || '执行计划详情' }}
          </h2>
          <!-- Recommendation Badge -->
          <span 
            class="px-2 py-0.5 text-[10px] font-bold rounded-sm"
            :style="getRecommendationStyle(currentAction?.recommendation)"
          >
            {{ currentAction?.recommendation || 'N/A' }}
          </span>
          <!-- Confidence Badge -->
          <span 
            class="px-2 py-0.5 text-[10px] font-bold rounded-sm border"
            :style="getConfidenceStyle(currentAction?.confidence_level)"
          >
            {{ currentAction?.confidence_level || 'N/A' }}
          </span>
          <!-- Position -->
          <span 
            v-if="actionPlan?.triggers?.[0]?.position_size_pct"
            class="text-xs px-2 py-0.5 rounded-sm"
            :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
          >
            {{ actionPlan.triggers[0].position_size_pct }}% 持仓
          </span>
        </div>
        <!-- Close Button -->
        <button 
          @click="close" 
          class="w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-200 hover:bg-white/10"
          :style="{ color: tokens.colors.text.muted }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Modal Body (Three Column Layout) -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Left: AI Assistant (320px) -->
        <div 
          class="w-[320px] flex flex-col border-r shrink-0 hidden lg:flex" 
          :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }"
        >
          <AIAssistantPanel 
            :plan-data="planData"
            :tokens="tokens"
          />
        </div>

        <!-- Center: Plan Analysis -->
        <div 
          class="flex-1 overflow-y-auto p-6 scrollbar-thin" 
          :style="{ backgroundColor: tokens.colors.background.base }"
        >
          <PlanAnalysisSection 
            :analysis="enrichedPlanAnalysis"
            :tokens="tokens"
          />
        </div>

        <!-- Right: Trading Plan (380px) -->
        <div 
          class="w-[380px] border-l overflow-y-auto p-6 scrollbar-thin shrink-0 hidden xl:block" 
          :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }"
        >
          <TradingPlanSection 
            :trading-plan="tradingPlan"
            :tokens="tokens"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import AIAssistantPanel from './plan-detail/AIAssistantPanel.vue'
import PlanAnalysisSection from './plan-detail/PlanAnalysisSection.vue'
import TradingPlanSection from './plan-detail/TradingPlanSection.vue'

const { tokens, isDark } = useTheme()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  planData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

// Computed properties
const tradingPlan = computed(() => props.planData?.memorandum?.Trading_Plan || {})
const planAnalysis = computed(() => props.planData?.memorandum?.Plan_Analysis || {})
const currentAction = computed(() => tradingPlan.value?.current_action || {})
const actionPlan = computed(() => tradingPlan.value?.action_plan || {})

// Enrich plan analysis with trading plan for child component access
const enrichedPlanAnalysis = computed(() => ({
  ...planAnalysis.value,
  _tradingPlan: tradingPlan.value
}))

// Methods
const close = () => {
  emit('close')
}

const getRecommendationStyle = (recommendation) => {
  const styles = {
    'WAIT_BUY': { backgroundColor: tokens.value.colors.accent.primary + '1A', color: tokens.value.colors.accent.primary },
    'BUY': { backgroundColor: tokens.value.colors.semantic.success + '1A', color: tokens.value.colors.semantic.success },
    'SELL': { backgroundColor: tokens.value.colors.semantic.error + '1A', color: tokens.value.colors.semantic.error },
    'HOLD': { backgroundColor: tokens.value.colors.semantic.warning + '1A', color: tokens.value.colors.semantic.warning }
  }
  return styles[recommendation] || { backgroundColor: tokens.value.colors.border.default, color: tokens.value.colors.text.muted }
}

const getConfidenceStyle = (level) => {
  const styles = {
    'High': { borderColor: tokens.value.colors.semantic.success + '4D', color: tokens.value.colors.semantic.success },
    'Medium': { borderColor: tokens.value.colors.semantic.warning + '4D', color: tokens.value.colors.semantic.warning },
    'Low': { borderColor: tokens.value.colors.text.muted + '4D', color: tokens.value.colors.text.muted }
  }
  return styles[level] || { borderColor: tokens.value.colors.border.default, color: tokens.value.colors.text.muted }
}
</script>
