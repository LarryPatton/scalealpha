<template>
  <div class="space-y-6">
    <!-- Current Action Instruction -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          📋 当前操作建议
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ tradingPlan?.current_action?.instruction || '暂无操作建议' }}
        </p>
      </div>
    </section>

    <!-- Analytical Approach -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          🎯 分析方法
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ analysis.Analytical_Approach || '暂无分析方法' }}
        </p>
      </div>
    </section>

    <!-- Bull vs Bear Thesis -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          ⚖️ 多空论点
        </h3>
      </div>
      <div class="p-4 space-y-3" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ analysis.Primary_Thesis_Vs_Counter_Thesis || '暂无多空分析' }}
        </p>
      </div>
    </section>

    <!-- Key Scenarios -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          📊 情景概率
        </h3>
      </div>
      <div class="p-4 space-y-3" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ analysis.Key_Scenarios_And_Likelihoods || '暂无情景分析' }}
        </p>
        <!-- Scenario Progress Bars -->
        <div class="space-y-2 mt-4">
          <div v-for="scenario in scenarios" :key="scenario.label" class="flex items-center gap-3">
            <span class="text-xs w-16 shrink-0" :style="{ color: tokens.colors.text.muted }">{{ scenario.label }}</span>
            <div class="flex-1 h-2 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
              <div 
                class="h-full transition-all duration-500"
                :style="{ width: scenario.pct + '%', backgroundColor: scenario.color }"
              ></div>
            </div>
            <span class="text-xs font-bold w-10 text-right" :style="{ color: scenario.color }">{{ scenario.pct }}%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Primary Risks -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.semantic.error + '33' }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.semantic.error + '0D', borderColor: tokens.colors.semantic.error + '33' }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.semantic.error }">
          ⚠️ 关键风险
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ analysis.Primary_Risks_To_Monitor || '暂无风险提示' }}
        </p>
      </div>
    </section>

    <!-- Strategy Discipline Note -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.accent.primary + '33' }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.accent.primary + '0D', borderColor: tokens.colors.accent.primary + '33' }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.accent.primary }">
          📝 策略纪律笔记
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          {{ analysis.Manager_s_Note_On_Strategy_And_Discipline || '暂无纪律笔记' }}
        </p>
      </div>
    </section>

    <!-- Collapsible: AI Model Opinions -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <button 
        @click="showAIOpinions = !showAIOpinions"
        class="w-full px-4 py-3 border-b flex justify-between items-center transition-colors"
        :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
      >
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          🤖 各AI模型详细观点
        </h3>
        <svg 
          class="w-4 h-4 transition-transform duration-200" 
          :class="{ 'rotate-180': showAIOpinions }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          :style="{ color: tokens.colors.text.muted }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <transition name="expand">
        <div v-if="showAIOpinions" class="p-4 space-y-3" :style="{ backgroundColor: tokens.colors.background.surface }">
          <div v-for="(opinion, model) in aiOpinions" :key="model" class="p-3 border rounded-sm" :style="{ borderColor: tokens.colors.border.subtle }">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-bold uppercase" :style="{ color: tokens.colors.accent.primary }">{{ model }}</span>
            </div>
            <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.secondary }">{{ opinion }}</p>
          </div>
        </div>
      </transition>
    </section>

    <!-- Collapsible: Market Analysis -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <button 
        @click="showMarketAnalysis = !showMarketAnalysis"
        class="w-full px-4 py-3 border-b flex justify-between items-center transition-colors"
        :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
      >
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          📈 期权与大盘分析
        </h3>
        <svg 
          class="w-4 h-4 transition-transform duration-200" 
          :class="{ 'rotate-180': showMarketAnalysis }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          :style="{ color: tokens.colors.text.muted }"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <transition name="expand">
        <div v-if="showMarketAnalysis" class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.surface }">
          <div>
            <h4 class="text-xs font-bold mb-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">期权跨市场分析</h4>
            <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
              {{ analysis.Options_Cross_Market_Analysis || '暂无期权分析' }}
            </p>
          </div>
          <div class="h-px" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>
          <div>
            <h4 class="text-xs font-bold mb-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">大盘分析</h4>
            <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
              {{ analysis.Broad_Market_Analysis || '暂无大盘分析' }}
            </p>
          </div>
        </div>
      </transition>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  analysis: {
    type: Object,
    default: () => ({})
  },
  tokens: {
    type: Object,
    required: true
  }
})

// Get trading plan from parent (passed via analysis)
const tradingPlan = computed(() => props.analysis?._tradingPlan || {})

const showAIOpinions = ref(false)
const showMarketAnalysis = ref(false)

// Extract scenario probabilities from text
const scenarios = computed(() => {
  const text = props.analysis.Key_Scenarios_And_Likelihoods || ''
  return [
    { label: '基准', pct: 65, color: props.tokens.colors.text.secondary },
    { label: '牛市', pct: 20, color: props.tokens.colors.semantic.success },
    { label: '熊市', pct: 15, color: props.tokens.colors.semantic.error }
  ]
})

// Extract AI opinions from analysis
const aiOpinions = computed(() => {
  const opinions = {}
  const opinionKeys = [
    'Grok4_Opinion', 'GPT5_Opinion', 'Claude_Opinion', 
    'DeepSeek_Reasoner_Opinion', 'Qwen_Opinion', 'Kimi_Opinion'
  ]
  
  opinionKeys.forEach(key => {
    if (props.analysis[key]) {
      const modelName = key.replace('_Opinion', '').replace('_Reasoner', '')
      opinions[modelName] = props.analysis[key]
    }
  })
  
  return opinions
})
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
