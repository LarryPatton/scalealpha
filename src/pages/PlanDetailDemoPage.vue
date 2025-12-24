<template>
  <div class="min-h-screen font-sans" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.secondary }">
    <!-- Header -->
    <div class="border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <router-link to="/" class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
            ScaleAlpha
          </router-link>
          <span class="text-xs px-2 py-1 rounded-sm" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
            执行计划详情演示
          </span>
        </div>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <router-link 
            to="/opportunity" 
            class="text-sm px-4 py-2 rounded-sm border transition-colors hover:bg-white/10"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
          >
            返回机会页面
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 py-8">
      <!-- Demo Info Card -->
      <div class="mb-8 p-6 border rounded-sm" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
            <svg class="w-6 h-6" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="flex-1">
            <h1 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">执行计划详情弹窗演示</h1>
            <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
              本页面展示从 <code class="px-1.5 py-0.5 rounded-sm text-xs" :style="{ backgroundColor: tokens.colors.background.base }">计划.txt</code> 
              文件加载的真实交易计划数据。点击下方按钮打开弹窗查看完整内容。
            </p>
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.tertiary }">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success }"></span>
                数据来源: 计划.txt
              </div>
              <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.tertiary }">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
                股票: GOOGL
              </div>
              <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.tertiary }">
                <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.warning }"></span>
                建议: WAIT_BUY
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex justify-center mb-8">
        <button 
          @click="openModal"
          class="px-8 py-4 rounded-sm font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-3"
          :style="{ 
            backgroundColor: tokens.colors.accent.primary, 
            color: '#000000',
            boxShadow: `0 0 30px ${tokens.colors.accent.primary}40`
          }"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          打开执行计划详情弹窗
        </button>
      </div>

      <!-- Data Preview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Trading Plan Preview -->
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
            <h3 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">📊 Trading Plan 数据预览</h3>
          </div>
          <div class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <!-- Current Action -->
            <div class="p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="text-xs font-bold mb-2" :style="{ color: tokens.colors.text.muted }">当前操作建议</div>
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 rounded-sm text-xs font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                  {{ realPlanData.memorandum.Trading_Plan.current_action.recommendation }}
                </span>
                <span class="px-2 py-0.5 rounded-sm text-xs font-bold border" :style="{ borderColor: tokens.colors.semantic.success + '4D', color: tokens.colors.semantic.success }">
                  {{ realPlanData.memorandum.Trading_Plan.current_action.confidence_level }}
                </span>
              </div>
              <p class="text-xs" :style="{ color: tokens.colors.text.secondary }">{{ realPlanData.memorandum.Trading_Plan.current_action.instruction }}</p>
            </div>

            <!-- Price Levels -->
            <div class="grid grid-cols-3 gap-3">
              <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">入场价</div>
                <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.text.primary }">
                  ${{ realPlanData.memorandum.Trading_Plan.action_plan.triggers[0].trigger_price }}
                </div>
              </div>
              <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">目标价</div>
                <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.semantic.success }">
                  ${{ realPlanData.memorandum.Trading_Plan.profit_taking_plan.triggers[0].trigger_price }}
                </div>
              </div>
              <div class="text-center p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                <div class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">止损价</div>
                <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.semantic.error }">
                  ${{ realPlanData.memorandum.Trading_Plan.stop_loss_plan.trigger.trigger_price }}
                </div>
              </div>
            </div>

            <!-- LLM Consensus -->
            <div class="p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="text-xs font-bold mb-2" :style="{ color: tokens.colors.text.muted }">AI 模型共识 (6/6 一致)</div>
              <div class="flex flex-wrap gap-1">
                <span v-for="(model, name) in realPlanData.memorandum.Trading_Plan.llm_consensus" :key="name" 
                  class="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                  :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                  {{ name.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Plan Analysis Preview -->
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
            <h3 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">📋 Plan Analysis 数据预览</h3>
          </div>
          <div class="p-4 space-y-3" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div v-for="(value, key) in planAnalysisPreview" :key="key" class="p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="text-[10px] font-bold uppercase tracking-wider mb-1" :style="{ color: tokens.colors.accent.primary }">{{ formatKey(key) }}</div>
              <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.secondary }">{{ truncateText(value, 120) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component -->
    <ExecutionPlanDetailModal 
      :visible="showModal"
      :plan-data="realPlanData"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ExecutionPlanDetailModal from '@/components/opportunity/ExecutionPlanDetailModal.vue'

const { tokens } = useTheme()

const showModal = ref(false)

// 真实计划数据 - 来自计划.txt
const realPlanData = ref({
  id: 'googl-plan-001',
  name: 'GOOGL 等待回调买入计划',
  symbol: 'GOOGL',
  stockName: 'Alphabet Inc.',
  memorandum: {
    Trading_Plan: {
      current_action: {
        recommendation: 'WAIT_BUY',
        instruction: '等待回调至$298.50支撑区。当前超买且动能背离，耐心等待CPI数据后的更优入场点。',
        confidence_level: 'High'
      },
      action_plan: {
        instruction: '在关键技术支撑位和机构Gamma墙附近部署限价买单。',
        triggers: [{
          trigger_price: 298.5,
          position_size_pct: 15.0,
          rationale: '基于1.5倍ATR回调($297.37)与20日均线支撑的汇合点。机构$300下方有强支撑。'
        }]
      },
      profit_taking_plan: {
        instruction: '分批止盈以锁定波段利润，保留部分仓位博弈CES催化剂。',
        triggers: [
          { trigger_price: 317.5, position_to_sell_pct: 50.0, rationale: '近期高点阻力位，预期会有抛压。' },
          { trigger_price: 325.0, position_to_sell_pct: 100.0, rationale: '波段交易的最终目标位，接近历史高点区域。' }
        ]
      },
      stop_loss_plan: {
        instruction: '严格执行止损，防止假突破演变为趋势反转。',
        trigger: {
          trigger_price: 294.3,
          position_to_sell_pct: 100.0,
          rationale: '跌破该ATR波动率支撑位意味着短期看涨结构失效。'
        }
      },
      llm_consensus: {
        openai: { recommendation: 'WAIT_BUY', instruction: '等待回调至$298.97-$300区间企稳后买入。目标$317.47，止损$295.89。' },
        claude: { recommendation: 'WAIT_BUY', instruction: '在$298-300区域吸纳，确认成交量放大。止损$294.31。' },
        grok: { recommendation: 'WAIT_BUY', instruction: '等待均值回归至$299。目标$317.47，止损$295.89。' },
        deepseek: { recommendation: 'WAIT_BUY', instruction: 'CPI数据后回调至$299入场。风险回报比4.9:1。' },
        qwen: { recommendation: 'WAIT_BUY', instruction: '在$298.97支撑位买入。关注$295.89作为失效点。' },
        kimi: { recommendation: 'WAIT_BUY', instruction: '等待$298-300区间。可卖出$295 Put收取权利金。' }
      }
    },
    Plan_Analysis: {
      Analytical_Approach: '多维共识(100%)。技术面：RSI超买回调+ATR支撑。基本面：PEG 0.92低估。事件驱动：CPI风险+CES催化剂。权重：技术40%，宏观30%，量化30%。',
      Market_Equation_Synthesis: '看涨结构修正中。宏观(CPI不确定性)+微观(成交量萎缩30.5M vs 41M)=短期避险。心理层面：>90%看涨情绪需清洗。资金流：机构在$260深实值看涨，不追高。',
      Primary_Thesis_Vs_Counter_Thesis: '牛：AI新品周期(Gemini/CES)+估值优势+技术支撑$298。熊：反垄断升级+CPI超预期引发利率反弹。判决：牛市回调买入策略占优，盈亏比4.5:1。',
      Key_Scenarios_And_Likelihoods: '基准(65%)：回调至$297-300企稳，反弹测$317。牛(20%)：无视CPI直接突破$310。熊(15%)：跌破$294测$285。',
      Primary_Risks_To_Monitor: '1) 12/18 CPI数据超预期。2) 跌破$294.3关键支撑。3) 欧盟反垄断新指控。4) 成交量持续低迷无法确认反转。',
      Manager_s_Note_On_Strategy_And_Discipline: '当前无持仓。切勿追高$306。耐心是此交易的关键。利用期权收取权利金等待入场是专业做法。若CPI导致暴跌，在$294处重新评估，不要盲目接刀。',
      Grok4_Opinion: '等待买入。数据：现价$306.57，量缩。RSI 71.6超买需修正。入场$299.5，目标$317.5。险：CPI引发收益率飙升。一致性高。',
      GPT5_Opinion: '等待回调。逻辑：情绪过度拥挤(>90%牛)，需清洗。入场$300附近，止损$295.89。期权：牛市看涨价差。基本面强劲支撑波段操作。',
      Claude_Opinion: '等待买入。技术：动能背离，量能不足。支撑$298-300(Gamma墙)。目标$317。CES 2026为催化剂。止损$294.31严格执行。',
      DeepSeek_Reasoner_Opinion: '等待买入高确信。逻辑：4.9:1盈亏比。CPI后60%概率回调。入场$299，止损$295.89。基本面PEG 0.92护航。险：反垄断。',
      Qwen_Opinion: '等待买入。数据：5日跌1.6% vs 20日涨8.3%背离。入场$298.97。AI新产品限制下行空间。关注$295.89失效点。',
      Kimi_Opinion: '等待买入。策略：卖出$295 Put过渡。入场$298-300。风险回报优。机构深实值持仓暗示长期看好。止损$295.89。',
      Options_Cross_Market_Analysis: '机构流向防御性：深实值$260 Call显示长线持有但短线谨慎。IV温和，适合卖出期权策略。Gamma墙在$300附近提供缓冲。',
      Broad_Market_Analysis: '大盘高位震荡，VIX 16.5偏低。资金从高Beta科技股轮动至防御板块。CPI发布前市场倾向避险，利于低吸策略。'
    }
  }
})

// 预览显示的分析字段
const planAnalysisPreview = computed(() => {
  const analysis = realPlanData.value.memorandum.Plan_Analysis
  return {
    Analytical_Approach: analysis.Analytical_Approach,
    Primary_Thesis_Vs_Counter_Thesis: analysis.Primary_Thesis_Vs_Counter_Thesis,
    Key_Scenarios_And_Likelihoods: analysis.Key_Scenarios_And_Likelihoods,
    Primary_Risks_To_Monitor: analysis.Primary_Risks_To_Monitor
  }
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const formatKey = (key) => {
  return key.replace(/_/g, ' ')
}

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}
</script>
