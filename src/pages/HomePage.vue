<template>
  <div class="min-h-screen pb-20" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center">
      <!-- Background Decorations -->
      <div class="absolute top-20 left-10 w-72 h-72 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '14' }"></div>
      
      <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10 w-full">
        <!-- Text Area - Left -->
        <div class="lg:col-span-5 flex flex-col justify-center text-left">
          <div class="inline-block mb-6">
            <div class="w-16 h-16 rounded-sm flex items-center justify-center shadow-2xl" :style="{ backgroundColor: tokens.colors.accent.primary, boxShadow: `0 25px 50px -12px ${tokens.colors.accent.primary}4D` }">
              <span class="text-3xl font-bold" style="color: #000;">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold mb-4" :style="{ color: tokens.colors.accent.primary }">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg mb-8 leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">
            为每个DIY投资者打造专属量化交易平台。<br>
            实时监控、智能归因、策略生成，一站式解决您的投资难题。
          </p>
          
          <!-- CTA Button -->
          <div class="flex gap-4">
            <router-link 
              to="/revenueB" 
              class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all shadow-lg transform hover:-translate-y-1 hover:scale-[1.02]"
              :style="{ 
                backgroundColor: tokens.colors.accent.primary, 
                color: '#000',
                boxShadow: `0 10px 40px ${tokens.colors.accent.primary}4D`
              }"
            >
              查看更多信息 →
            </router-link>
            <router-link 
              to="/infoB" 
              class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all border hover:bg-white/5"
              :style="{ 
                borderColor: tokens.colors.border.strong,
                color: tokens.colors.text.primary
              }"
            >
              浏览功能
            </router-link>
          </div>
        </div>

        <!-- Performance Chart (Hero Feature) - Right -->
        <div class="lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition duration-500">
          <HomeRevenuePreview />
        </div>
      </div>
    </section>

    <!-- Product Introduction Sections (Full Width Blocks) -->
    <div class="w-full">
      
      <!-- Section 1: Theme Discovery (左文右图) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
              🎯 市场洞察
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">主题发现</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">追踪热点主题，把握投资周期</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">实时监控市场热门主题的生命周期演变，从萌芽期到成熟期，帮助您在最佳时机入场或离场。每个主题都配有30天/1年涨跌幅数据和相关标的列表。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 8阶段生命周期追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 30D/1Y涨跌幅可视化
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 相关标的一键跳转
              </li>
            </ul>
            <router-link to="/infoB?tab=themes" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              探索主题 →
            </router-link>
          </div>
          <!-- Preview Area - Theme Cards Grid - Right -->
          <div class="lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500">
            <HomeThemePreview />
          </div>
        </div>
      </section>

      <!-- Section 2: Opportunity Browse (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Opportunity Cards - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500">
            <HomeOpportunityPreview />
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
              💡 AI精选
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">机会浏览</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">AI每日精选高置信度交易机会</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">基于多维度分析的智能评级系统，每个机会都经过风险收益比计算、时间框架预估和风险等级评定。支持推荐和关注双模式，让您高效筛选目标。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> A/B/C/D 智能评级
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 风险收益比量化分析
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 持仓周期时间框架
              </li>
            </ul>
            <router-link to="/infoB?tab=opportunities" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              发现机会 →
            </router-link>
          </div>
        </div>
      </section>

      <!-- Section 3: Event Attribution (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">
              🔍 深度分析
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">事件归因</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">理解股价波动背后的真正原因</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">通过时间线可视化展示影响股价的重大事件，每个事件都标注好评/利空/中性情绪标签。支持按股票代码筛选，关联分析多标的受影响程度。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 时间线可视化展示
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 利好/利空情绪标签
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 多标的关联影响分析
              </li>
            </ul>
            <router-link to="/infoB?tab=attribution" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              查看归因 →
            </router-link>
          </div>
          <!-- Preview Area - Timeline - Right -->
          <div class="lg:col-span-7 h-[400px] transform hover:scale-[1.01] transition-all duration-500">
            <HomeAttributionPreview />
          </div>
        </div>
      </section>

      <!-- Section 4: Strategy Generation (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Config Panel - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500">
            <HomeStrategyPreview />
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
              ⚡ 个性定制
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">策略生成</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">定制专属于您的AI交易策略</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">选择标的、配置分析框架、设定投资周期和风险偏好，还可输入您的个人市场洞察。AI将综合所有参数，生成专属于您的交易策略报告。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 技术/基本面/量化多框架
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 短/中/长期周期可配置
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 融入个人洞察与观点
              </li>
            </ul>
            <router-link to="/opportunityB?tab=generate" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              生成策略 →
            </router-link>
          </div>
        </div>
      </section>

      <!-- Section 5: Strategy Management (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
              📋 效率管理
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">策略管理</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">高效管理您的策略资产库</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">实时追踪策略生成进度，智能筛选高评级或待更新策略。支持自定义分组收藏、批量操作，让您的策略库井然有序，随时调取最优方案。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 实时生成进度追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 智能筛选与分组收藏
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 批量操作与一键导出
              </li>
            </ul>
            <router-link to="/opportunityB?tab=mystrategy" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              管理策略 →
            </router-link>
          </div>
          <!-- Preview Area - Management Dashboard - Right -->
          <div class="lg:col-span-7 h-[400px] transform hover:scale-[1.01] transition-all duration-500">
            <HomeStrategyManagementPreview />
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
import HomeRevenuePreview from '../components/home/HomeRevenuePreview.vue'
import HomeThemePreview from '../components/home/HomeThemePreview.vue'
import HomeOpportunityPreview from '../components/home/HomeOpportunityPreview.vue'
import HomeAttributionPreview from '../components/home/HomeAttributionPreview.vue'
import HomeStrategyPreview from '../components/home/HomeStrategyPreview.vue'
import HomeStrategyManagementPreview from '../components/home/HomeStrategyManagementPreview.vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()
</script>