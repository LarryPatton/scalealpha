<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Header with Back Button -->
    <div class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors"
            >
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-white">投资机会报告</h1>
              <p class="text-sm text-gray-400">{{ report.symbol }} - {{ report.stockName }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button
              @click="toggleSaveReport"
              :class="[
                'px-6 py-2.5 rounded-lg transition-all text-sm font-medium shadow-lg flex items-center gap-2',
                isSaved 
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/50' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/50'
              ]"
            >
              <svg 
                v-if="!isSaved"
                class="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
              <svg 
                v-else
                class="w-4 h-4" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
              </svg>
              <span>{{ isSaved ? '已保存' : '保存报告' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-6 py-8">
      <!-- Report Header Card -->
      <div class="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] border border-[#404040] rounded-xl p-8 mb-6">
        <div class="flex items-start justify-between mb-6">
          <div>
            <div class="flex items-center gap-4 mb-3">
              <div class="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <span class="text-blue-400 font-bold text-2xl font-mono">{{ report.symbol }}</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white mb-1">{{ report.stockName }}</h2>
                <p class="text-gray-400">{{ getFrameworkLabel(report.framework) }} · {{ getPeriodLabel(report.period) }}</p>
              </div>
            </div>
          </div>
          
          <!-- Score Badge Large -->
          <div class="flex flex-col items-end gap-2">
            <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
              <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="text-green-400 font-bold text-xl">{{ report.score }}</span>
            </div>
            <span class="text-xs text-gray-500">机会评分</span>
          </div>
        </div>

        <!-- Key Metrics Grid -->
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
            <div class="text-sm text-gray-400 mb-2">风险等级</div>
            <div 
              :class="[
                'text-xl font-bold',
                report.risk === 'extreme' ? 'text-red-400' : 
                report.risk === 'high' ? 'text-orange-400' : 
                report.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
              ]"
            >
              {{ getRiskLabel(report.risk) }}
            </div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
            <div class="text-sm text-gray-400 mb-2">收益风险比</div>
            <div class="text-xl font-bold text-green-400">{{ report.riskRewardRatio }}</div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
            <div class="text-sm text-gray-400 mb-2">预期收益</div>
            <div class="text-xl font-bold text-green-400">+{{ report.expectedReturn }}%</div>
          </div>

          <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
            <div class="text-sm text-gray-400 mb-2">生成时间</div>
            <div class="text-sm font-medium text-white">{{ formatDate(report.generatedAt) }}</div>
          </div>
        </div>
      </div>

      <!-- Content Sections (Placeholder) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content Column (2/3) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Section 1: 执行摘要 -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-blue-500 rounded-full"></div>
              执行摘要
            </h3>
            <div class="space-y-3 text-gray-300">
              <p class="leading-relaxed">
                📊 <strong class="text-white">核心观点：</strong>基于{{ getFrameworkLabel(report.framework) }}，{{ report.symbol }}展现出强劲的{{ getPeriodLabel(report.period) }}投资价值。
              </p>
              <p class="leading-relaxed">
                💡 <strong class="text-white">关键因素：</strong>该标的在当前市场环境下具备显著的上涨潜力，预期收益率为 <span class="text-green-400 font-semibold">+{{ report.expectedReturn }}%</span>。
              </p>
              <p class="leading-relaxed">
                ⚠️ <strong class="text-white">风险提示：</strong>本报告风险等级为<span :class="[
                  'font-semibold',
                  report.risk === 'extreme' ? 'text-red-400' : 
                  report.risk === 'high' ? 'text-orange-400' : 
                  report.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                ]">{{ getRiskLabel(report.risk) }}</span>，建议投资者根据自身风险承受能力进行配置。
              </p>
            </div>
          </section>

          <!-- Section 2: 风险管理 -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-red-500 rounded-full"></div>
              风险管理
            </h3>
            
            <!-- 投资失效条件 -->
            <div class="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <div class="flex-1">
                  <h4 class="text-red-400 font-semibold mb-2">投资失效条件</h4>
                  <p class="text-gray-300 text-sm leading-relaxed">
                    股价跌破<span class="text-red-400 font-semibold">${{ (report.entryPrice * 0.9).toFixed(2) }}</span>美元关口，或《疯狂动物城2》首周末票房数据低于<span class="text-red-400 font-semibold">$1.25亿</span>的预期。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Section 3: 分析维度 -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-blue-500 rounded-full"></div>
              分析维度
            </h3>
            
            <div class="space-y-3">
              <!-- 基本面分析 -->
              <AnalysisDimension
                icon="📊"
                title="基本面分析"
                color="blue"
                :expanded="expandedDimensions.includes('fundamental')"
                @toggle="toggleDimension('fundamental')"
              >
                <div class="space-y-3 text-sm text-gray-300">
                  <p>• <strong class="text-white">Q4营收卓越：</strong>Q4营收率微跌0.5%至<span class="text-blue-400 font-semibold">$22.46B</span>，但EPS <span class="text-green-400 font-semibold">$1.11</span>超预期15.8%。</p>
                  <p>• <strong class="text-white">盈利能力：</strong>归属于母公司P/E低于历史平均水平，显示估值吸引力。</p>
                  <p>• <strong class="text-white">财务健康：</strong>现金流稳定，债务比率合理，财务状况良好。</p>
                </div>
              </AnalysisDimension>

              <!-- 技术分析 -->
              <AnalysisDimension
                icon="📈"
                title="技术分析"
                color="purple"
                :expanded="expandedDimensions.includes('technical')"
                @toggle="toggleDimension('technical')"
              >
                <div class="space-y-3 text-sm text-gray-300">
                  <p>• <strong class="text-white">价格区间：</strong>股价处于<span class="text-purple-400 font-semibold">$102-104B</span>的强支撑区域。</p>
                  <p>• <strong class="text-white">技术指标：</strong>RSI(14)达到<span class="text-green-400 font-semibold">68</span>，显示强势但未过热。</p>
                  <p>• <strong class="text-white">趋势判断：</strong>MA20和MA50形成金叉，短期趋势向好。</p>
                  <p>• <strong class="text-white">成交量：</strong>近期成交量放大，资金流入明显。</p>
                </div>
              </AnalysisDimension>

              <!-- 量化分析 -->
              <AnalysisDimension
                icon="🔢"
                title="量化分析"
                color="green"
                :expanded="expandedDimensions.includes('quantitative')"
                @toggle="toggleDimension('quantitative')"
              >
                <div class="space-y-3 text-sm text-gray-300">
                  <p>• <strong class="text-white">短期流量因子极强：</strong>但值信号识别。</p>
                  <p>• <strong class="text-white">动量因子：</strong>3个月动量评分<span class="text-green-400 font-semibold">8.5/10</span>，显示强劲上涨动能。</p>
                  <p>• <strong class="text-white">质量因子：</strong>ROE和利润率指标优异，质量评分高。</p>
                  <p>• <strong class="text-white">估值因子：</strong>相对估值处于合理区间。</p>
                </div>
              </AnalysisDimension>

              <!-- 事件驱动分析 -->
              <AnalysisDimension
                icon="📰"
                title="事件驱动分析"
                color="orange"
                :expanded="expandedDimensions.includes('event')"
                @toggle="toggleDimension('event')"
              >
                <div class="space-y-3 text-sm text-gray-300">
                  <p>• <strong class="text-white">催化剂事件：</strong>11月26日上映的《疯狂动物城2》是核心催化剂。</p>
                  <p>• <strong class="text-white">市场预期：</strong>首周末票房预期<span class="text-green-400 font-semibold">$1.5-2亿</span>，将显著提振股价。</p>
                  <p>• <strong class="text-white">后续影响：</strong>成功的票房表现将带动流媒体订阅增长和周边产品销售。</p>
                </div>
              </AnalysisDimension>

              <!-- 宏观经济分析 -->
              <AnalysisDimension
                icon="🌐"
                title="宏观经济分析"
                color="cyan"
                :expanded="expandedDimensions.includes('macro')"
                @toggle="toggleDimension('macro')"
              >
                <div class="space-y-3 text-sm text-gray-300">
                  <p>• <strong class="text-white">市场环境：</strong>宏观环境整体支持，SPY/QQQ维持多头趋势。</p>
                  <p>• <strong class="text-white">行业趋势：</strong>娱乐传媒板块受益于消费复苏，整体向好。</p>
                  <p>• <strong class="text-white">利率环境：</strong>当前利率水平对成长股估值较为友好。</p>
                  <p>• <strong class="text-white">消费者信心：</strong>假期消费预期强劲，利好娱乐消费。</p>
                </div>
              </AnalysisDimension>
            </div>
          </section>

          <!-- Section 4: 关键假设 -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-yellow-500 rounded-full"></div>
              关键假设
            </h3>
            <div class="space-y-2">
              <AssumptionItem 
                text="《疯狂动物城2》首映周末现实票房达到合同要求$1.25亿的预期" 
                badge="1"
              />
              <AssumptionItem 
                text="$100-102美元的关键支撑位不会被有效跌破，技术面保持健康" 
                badge="2"
              />
              <AssumptionItem 
                text="YouTube TV订阅稳定且持续增长，每日损失不超过大额订阅的$430万" 
                badge="3"
              />
              <AssumptionItem 
                text="宏观市场（SPY/QQQ）维持当前多头趋势，不出现系统性回调" 
                badge="4"
              />
            </div>
          </section>

          <!-- Section 5: 主要风险 -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-red-500 rounded-full"></div>
              主要风险
            </h3>
            <div class="space-y-2">
              <RiskItem 
                text="《疯狂动物城2》票房低于（低于$1亿），打击市场信心" 
                severity="high"
              />
              <RiskItem 
                text="宏观市场（SPY/QQQ）出现系统性回调，带动板块下跌" 
                severity="medium"
              />
              <RiskItem 
                text="YouTube TV订阅继续流失且扩大规模，每日损失扩大超预估跌幅$430万" 
                severity="medium"
              />
              <RiskItem 
                text="技术面跌破$100-102关键支撑位，可能引发技术性抛售" 
                severity="high"
              />
            </div>
          </section>
        </div>

        <!-- Sidebar Column (1/3) -->
        <div class="space-y-6">
          <!-- Price Targets -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4">价格目标</h3>
            <div class="space-y-4">
              <div>
                <div class="text-sm text-gray-400 mb-2">入场价格</div>
                <div class="text-2xl font-bold text-white">${{ report.entryPrice }}</div>
              </div>
              <div class="border-t border-[#404040] pt-4">
                <div class="text-sm text-gray-400 mb-2">目标价格</div>
                <div class="text-2xl font-bold text-green-400">${{ report.targetPrice }}</div>
              </div>
              <div class="border-t border-[#404040] pt-4">
                <div class="text-sm text-gray-400 mb-2">止损价格</div>
                <div class="text-2xl font-bold text-red-400">${{ (report.entryPrice * 0.95).toFixed(2) }}</div>
              </div>
            </div>
          </section>

          <!-- Key Stats (Placeholder) -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4">关键指标</h3>
            <div class="space-y-3">
              <PlaceholderStat label="成交量" value="125.6M" />
              <PlaceholderStat label="市值" value="$456.8B" />
              <PlaceholderStat label="PE比率" value="28.5" />
              <PlaceholderStat label="52周高点" value="$595.30" />
              <PlaceholderStat label="52周低点" value="$385.20" />
            </div>
          </section>

          <!-- Related Opportunities (Placeholder) -->
          <section class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
            <h3 class="text-lg font-bold text-white mb-4">相关机会</h3>
            <div class="text-center py-8 text-gray-500 text-sm">
              暂无相关机会
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSavedReports } from '../composables/useSavedReports'

const route = useRoute()
const router = useRouter()

// 使用保存报告的 composable
const { isReportSaved, saveReportToCategory, removeReportFromAll } = useSavedReports()

// Report data - from sessionStorage or default
const report = ref({
  id: '',
  symbol: 'AAPL',
  stockName: 'Apple Inc.',
  framework: 'technical',
  period: '1m-6m',
  risk: 'medium',
  riskRewardRatio: '3.7:1',
  expectedReturn: 18.5,
  entryPrice: 185.23,
  targetPrice: 219.50,
  score: 88,
  generatedAt: new Date().toISOString()
})

// State
const expandedDimensions = ref(['fundamental']) // 默认展开基本面分析

// Methods
const goBack = () => {
  // 使用浏览器返回功能，智能返回到上一页
  // 这样从 /info 进来就返回 /info，从 /opportunity 进来就返回 /opportunity
  router.back()
}

const toggleDimension = (dimension) => {
  const index = expandedDimensions.value.indexOf(dimension)
  if (index > -1) {
    expandedDimensions.value.splice(index, 1)
  } else {
    expandedDimensions.value.push(dimension)
  }
}

const getFrameworkLabel = (value) => {
  const labels = {
    'all': '全部框架',
    'technical': '技术分析',
    'fundamental': '基本面分析',
    'quantitative': '量化分析',
    'event': '事件驱动',
    'market': '商业分析',
    'momentum': '趋势分析',
    'alternative': '另类数据'
  }
  return labels[value] || value
}

const getPeriodLabel = (value) => {
  const labels = {
    '1d-5d': '短期 (1-5天)',
    '1d-1m': '短中期 (1天-1个月)',
    '1m-6m': '中长期 (1-6个月)',
    '6m+': '长期 (6个月+)'
  }
  return labels[value] || value
}

const getRiskLabel = (value) => {
  const labels = {
    'extreme': '极高',
    'high': '高',
    'medium': '中等',
    'low': '低'
  }
  return labels[value] || value
}

const formatDate = (timestamp) => {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// 检查报告是否已保存
const isSaved = computed(() => isReportSaved(report.value.id))

// 切换保存状态
const toggleSaveReport = () => {
  if (isSaved.value) {
    // 取消保存
    const result = removeReportFromAll(report.value.id)
    if (result.success) {
      console.log('报告已取消保存')
    }
  } else {
    // 保存报告
    const result = saveReportToCategory(report.value, 'default-category')
    if (result.success) {
      console.log('报告已保存')
    }
  }
}

// Load report data from sessionStorage
onMounted(() => {
  const savedReport = sessionStorage.getItem('current_report')
  if (savedReport) {
    try {
      const data = JSON.parse(savedReport)
      report.value = { ...report.value, ...data }
    } catch (e) {
      console.error('Failed to load report:', e)
    }
  } else if (route.params.reportId) {
    report.value.id = route.params.reportId
  }
})
</script>

<script>
// Analysis Dimension Component
const AnalysisDimension = {
  props: ['icon', 'title', 'color', 'expanded'],
  emits: ['toggle'],
  template: `
    <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg overflow-hidden">
      <button
        @click="$emit('toggle')"
        class="w-full px-4 py-3 flex items-center justify-between hover:bg-[#252525] transition-colors"
      >
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ icon }}</span>
          <span :class="[
            'font-semibold',
            color === 'blue' ? 'text-blue-400' : 
            color === 'purple' ? 'text-purple-400' : 
            color === 'green' ? 'text-green-400' : 
            color === 'orange' ? 'text-orange-400' : 
            color === 'cyan' ? 'text-cyan-400' : 'text-white'
          ]">{{ title }}</span>
        </div>
        <svg 
          :class="['w-5 h-5 text-gray-400 transition-transform', expanded && 'rotate-180']"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
      <div v-show="expanded" class="px-4 pb-4">
        <slot></slot>
      </div>
    </div>
  `
}

// Assumption Item Component
const AssumptionItem = {
  props: ['text', 'badge'],
  template: `
    <div class="flex items-start gap-3 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 hover:border-yellow-500/30 transition-colors">
      <div class="flex-shrink-0 w-6 h-6 bg-yellow-500/20 border border-yellow-500/40 rounded-full flex items-center justify-center">
        <span class="text-yellow-400 text-xs font-bold">{{ badge }}</span>
      </div>
      <p class="text-sm text-gray-300 leading-relaxed pt-0.5">{{ text }}</p>
    </div>
  `
}

// Risk Item Component
const RiskItem = {
  props: ['text', 'severity'],
  template: `
    <div class="flex items-start gap-3 bg-[#1a1a1a] border border-[#404040] rounded-lg p-3 hover:border-red-500/30 transition-colors">
      <div class="flex-shrink-0">
        <span 
          :class="[
            'inline-block px-2 py-1 rounded text-xs font-semibold',
            severity === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 
            severity === 'medium' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 
            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
          ]"
        >
          {{ severity === 'high' ? '高' : severity === 'medium' ? '中' : '低' }}
        </span>
      </div>
      <p class="text-sm text-gray-300 leading-relaxed pt-0.5">{{ text }}</p>
    </div>
  `
}

const PlaceholderStat = {
  props: ['label', 'value'],
  template: `
    <div class="flex items-center justify-between py-2 border-b border-[#404040] last:border-0">
      <span class="text-sm text-gray-400">{{ label }}</span>
      <span class="text-sm font-semibold text-white">{{ value }}</span>
    </div>
  `
}

export default {
  components: {
    AnalysisDimension,
    AssumptionItem,
    RiskItem,
    PlaceholderStat
  }
}
</script>
