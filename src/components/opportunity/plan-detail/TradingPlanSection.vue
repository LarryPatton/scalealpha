<template>
  <div class="space-y-6">
    <!-- Entry Plan -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          💰 入场计划
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <!-- Price Grid -->
        <div class="grid grid-cols-3 gap-3 mb-4">
          <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">入场价</div>
            <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.text.primary }">
              ${{ formatPrice(entryPrice) }}
            </div>
          </div>
          <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">目标价</div>
            <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.semantic.success }">
              ${{ formatPrice(targetPrice) }}
            </div>
          </div>
          <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">止损价</div>
            <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.semantic.error }">
              ${{ formatPrice(stopLossPrice) }}
            </div>
          </div>
        </div>
        
        <!-- Entry Details -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <span :style="{ color: tokens.colors.text.muted }">建议仓位</span>
            <span class="font-bold" :style="{ color: tokens.colors.text.primary }">{{ positionSize }}%</span>
          </div>
          <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">
            {{ actionPlan?.instruction || '等待最佳入场时机' }}
          </p>
          <p v-if="entryRationale" class="text-xs leading-relaxed p-2 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.secondary }">
            {{ entryRationale }}
          </p>
        </div>
      </div>
    </section>

    <!-- Profit Taking Plan -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.semantic.success + '33' }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.semantic.success + '0D', borderColor: tokens.colors.semantic.success + '33' }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.semantic.success }">
          📈 止盈计划
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">
          {{ profitTakingPlan?.instruction || '分批止盈策略' }}
        </p>
        <div class="space-y-2">
          <div 
            v-for="(trigger, idx) in profitTriggers" 
            :key="idx"
            class="flex items-center justify-between p-3 border rounded-sm"
            :style="{ borderColor: tokens.colors.semantic.success + '33', backgroundColor: tokens.colors.background.base }"
          >
            <div>
              <span class="font-bold font-mono" :style="{ color: tokens.colors.semantic.success }">${{ formatPrice(trigger.trigger_price) }}</span>
              <span class="text-xs ml-2" :style="{ color: tokens.colors.text.muted }">卖出 {{ trigger.position_to_sell_pct }}%</span>
            </div>
            <span class="text-[10px] max-w-[120px] text-right" :style="{ color: tokens.colors.text.tertiary }">{{ trigger.rationale }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stop Loss Plan -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.semantic.error + '33' }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.semantic.error + '0D', borderColor: tokens.colors.semantic.error + '33' }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.semantic.error }">
          🛑 止损计划
        </h3>
      </div>
      <div class="p-4" :style="{ backgroundColor: tokens.colors.background.surface }">
        <p class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">
          {{ stopLossPlan?.instruction || '严格执行止损策略' }}
        </p>
        <div 
          v-if="stopLossTrigger"
          class="p-3 border rounded-sm"
          :style="{ borderColor: tokens.colors.semantic.error + '33', backgroundColor: tokens.colors.background.base }"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold font-mono" :style="{ color: tokens.colors.semantic.error }">${{ formatPrice(stopLossTrigger.trigger_price) }}</span>
            <span class="text-xs px-2 py-0.5 rounded-sm" :style="{ backgroundColor: tokens.colors.semantic.error + '1A', color: tokens.colors.semantic.error }">
              全部卖出
            </span>
          </div>
          <p class="text-xs" :style="{ color: tokens.colors.text.tertiary }">{{ stopLossTrigger.rationale }}</p>
        </div>
      </div>
    </section>

    <!-- AI Model Consensus -->
    <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
      <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
        <h3 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          🤖 AI 模型共识
        </h3>
        <p class="text-[10px] mt-1" :style="{ color: tokens.colors.text.muted }">
          {{ consensusCount }}/{{ Object.keys(llmConsensus).length }} 模型一致
        </p>
      </div>
      <div class="p-4 space-y-2" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div 
          v-for="(model, name) in llmConsensus" 
          :key="name"
          class="flex items-start gap-3 p-2 rounded-sm transition-colors hover:bg-white/5"
        >
          <div class="shrink-0 mt-0.5">
            <span 
              class="text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
              :style="getRecommendationStyle(model.recommendation)"
            >
              {{ model.recommendation }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatModelName(name) }}</span>
            </div>
            <p class="text-[11px] leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">{{ model.instruction }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tradingPlan: {
    type: Object,
    default: () => ({})
  },
  tokens: {
    type: Object,
    required: true
  }
})

// Computed properties
const actionPlan = computed(() => props.tradingPlan?.action_plan || {})
const profitTakingPlan = computed(() => props.tradingPlan?.profit_taking_plan || {})
const stopLossPlan = computed(() => props.tradingPlan?.stop_loss_plan || {})
const llmConsensus = computed(() => props.tradingPlan?.llm_consensus || {})

const entryPrice = computed(() => actionPlan.value?.triggers?.[0]?.trigger_price || 0)
const targetPrice = computed(() => profitTakingPlan.value?.triggers?.[0]?.trigger_price || 0)
const stopLossPrice = computed(() => stopLossPlan.value?.trigger?.trigger_price || 0)
const positionSize = computed(() => actionPlan.value?.triggers?.[0]?.position_size_pct || 0)
const entryRationale = computed(() => actionPlan.value?.triggers?.[0]?.rationale || '')

const profitTriggers = computed(() => profitTakingPlan.value?.triggers || [])
const stopLossTrigger = computed(() => stopLossPlan.value?.trigger || null)

const consensusCount = computed(() => {
  const recommendations = Object.values(llmConsensus.value).map(m => m.recommendation)
  const counts = {}
  recommendations.forEach(r => { counts[r] = (counts[r] || 0) + 1 })
  return Math.max(...Object.values(counts), 0)
})

// Methods
const formatPrice = (price) => {
  if (!price) return '---'
  return Number(price).toFixed(2)
}

const formatModelName = (name) => {
  const names = {
    openai: 'OpenAI',
    claude: 'Claude',
    grok: 'Grok',
    deepseek: 'DeepSeek',
    qwen: 'Qwen',
    kimi: 'Kimi'
  }
  return names[name] || name.charAt(0).toUpperCase() + name.slice(1)
}

const getRecommendationStyle = (recommendation) => {
  const styles = {
    'WAIT_BUY': { backgroundColor: props.tokens.colors.accent.primary + '1A', color: props.tokens.colors.accent.primary },
    'BUY': { backgroundColor: props.tokens.colors.semantic.success + '1A', color: props.tokens.colors.semantic.success },
    'SELL': { backgroundColor: props.tokens.colors.semantic.error + '1A', color: props.tokens.colors.semantic.error },
    'HOLD': { backgroundColor: props.tokens.colors.semantic.warning + '1A', color: props.tokens.colors.semantic.warning }
  }
  return styles[recommendation] || { backgroundColor: props.tokens.colors.border.default, color: props.tokens.colors.text.muted }
}
</script>
