<template>
  <div class="min-h-screen pb-20" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-20 left-10 w-72 h-72 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '14' }"></div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <!-- Logo & Title -->
        <div class="mb-12">
          <div class="inline-block mb-6">
            <div class="w-20 h-20 rounded-sm flex items-center justify-center shadow-2xl mx-auto" :style="{ backgroundColor: tokens.colors.accent.primary, boxShadow: `0 25px 50px -12px ${tokens.colors.accent.primary}4D` }">
              <span class="text-4xl font-bold" style="color: #000;">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold mb-2" :style="{ color: tokens.colors.accent.primary }">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg mb-8" :style="{ color: tokens.colors.text.tertiary }">
            为每个DIY投资者打造专属量化交易平台
          </p>
          
          <!-- CTA Button -->
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
        </div>

        <!-- Performance Chart (Hero Feature) -->
        <div class="max-w-4xl mx-auto mb-16 transform hover:scale-[1.02] transition duration-500">
          <SimplePerformanceChart />
        </div>
      </div>
    </section>

    <!-- Product Introduction Sections (Static Content) -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      
      <!-- Opportunities -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">机会发现</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">每个交易日完成的实时盘前机会报告，捕捉市场瞬息万变的机遇。</p>
        </div>
        <div class="p-5 rounded-sm border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <!-- Mock Strategy Cards -->
          <div class="space-y-3">
            <!-- Strategy Card 1 -->
            <div class="p-3 rounded-sm border flex items-center gap-3 transition-all hover:border-opacity-80" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
              <div class="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 text-sm font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
                AAPL
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium truncate" :style="{ color: tokens.colors.text.primary }">Apple Inc. 技术突破策略</span>
                  <span class="px-1.5 py-0.5 rounded-sm text-[10px] font-bold shrink-0" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">A</span>
                </div>
                <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.muted }">
                  <span class="flex items-center gap-1" :style="{ color: tokens.colors.semantic.success }">↑ LONG</span>
                  <span>·</span>
                  <span>短期</span>
                </div>
              </div>
            </div>
            <!-- Strategy Card 2 -->
            <div class="p-3 rounded-sm border flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
              <div class="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 text-sm font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                NVDA
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium truncate" :style="{ color: tokens.colors.text.primary }">NVIDIA AI芯片需求分析</span>
                  <span class="px-1.5 py-0.5 rounded-sm text-[10px] font-bold shrink-0" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">B</span>
                </div>
                <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.muted }">
                  <span class="flex items-center gap-1" :style="{ color: tokens.colors.semantic.success }">↑ LONG</span>
                  <span>·</span>
                  <span>中期</span>
                </div>
              </div>
            </div>
            <!-- Strategy Card 3 -->
            <div class="p-3 rounded-sm border flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
              <div class="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 text-sm font-bold" :style="{ backgroundColor: tokens.colors.semantic.error + '1A', color: tokens.colors.semantic.error }">
                TSLA
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium truncate" :style="{ color: tokens.colors.text.primary }">Tesla 产能调整预警</span>
                  <span class="px-1.5 py-0.5 rounded-sm text-[10px] font-bold shrink-0" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">C</span>
                </div>
                <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.muted }">
                  <span class="flex items-center gap-1" :style="{ color: tokens.colors.semantic.error }">↓ SHORT</span>
                  <span>·</span>
                  <span>短期</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Footer -->
          <div class="mt-4 pt-3 border-t flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">今日已生成 12 个策略</span>
            <span class="text-xs font-medium" :style="{ color: tokens.colors.accent.primary }">查看全部 →</span>
          </div>
        </div>
      </section>

      <!-- Trading Analysis -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">交易分析</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">深度分析市场机会，提供专业的数据支持，辅助您的每一次交易决策。</p>
        </div>
        <div class="md:order-1 p-6 rounded-sm border opacity-90" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="grid grid-cols-2 gap-4">
            <div class="h-24 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }"></div>
            <div class="h-24 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }"></div>
            <div class="h-24 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }"></div>
            <div class="h-24 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }"></div>
          </div>
        </div>
      </section>

      <!-- Plan Making -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">计划制定</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">制定个性化的投资计划，让AI算法为您的交易保驾护航，严格执行交易纪律。</p>
        </div>
        <div class="p-6 rounded-sm border opacity-90" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="space-y-4">
            <div class="h-12 rounded-sm w-full flex items-center px-4" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="w-4 h-4 rounded-sm mr-3" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
              <div class="h-2 w-1/2 rounded-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            </div>
            <div class="h-12 rounded-sm w-full flex items-center px-4" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="w-4 h-4 rounded-sm mr-3" :style="{ backgroundColor: tokens.colors.accent.secondary }"></div>
              <div class="h-2 w-2/3 rounded-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            </div>
            <div class="h-12 rounded-sm w-full flex items-center px-4" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="w-4 h-4 rounded-sm mr-3" :style="{ backgroundColor: tokens.colors.semantic.warning }"></div>
              <div class="h-2 w-1/3 rounded-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Monitoring Alerts -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">盯盘提醒</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">7x24小时实时监控您关注的股票，不错过任何重要市场异动。</p>
        </div>
        <div class="md:order-1 p-6 rounded-sm border opacity-90 flex items-center justify-center" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="relative">
            <div class="w-24 h-24 rounded-full border-4 flex items-center justify-center animate-pulse" :style="{ borderColor: tokens.colors.accent.primary + '4D' }">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.accent.primary }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div class="absolute top-0 right-0 w-3 h-3 rounded-full border-2" :style="{ backgroundColor: tokens.colors.semantic.error, borderColor: tokens.colors.background.elevated }"></div>
          </div>
        </div>
      </section>

      <!-- Portfolio -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">投资组合</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">一站式管理您的投资组合，实时跟踪资产表现，优化资产配置。</p>
        </div>
        <div class="p-6 rounded-sm border opacity-90" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">Total Value</div>
              <div class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">$124,500</div>
            </div>
            <div class="p-3 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
              <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">Daily P&L</div>
              <div class="text-lg font-bold" :style="{ color: tokens.colors.semantic.success }">+$1,240</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">事件分析</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">深度解读财报、政策等重大事件，量化分析其对股价的潜在影响。</p>
        </div>
        <div class="md:order-1 p-6 rounded-sm border opacity-90" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="space-y-3">
            <div class="h-16 rounded-sm border-l-4" :style="{ backgroundColor: tokens.colors.background.base, borderLeftColor: tokens.colors.semantic.error }"></div>
            <div class="h-16 rounded-sm border-l-4" :style="{ backgroundColor: tokens.colors.background.base, borderLeftColor: tokens.colors.semantic.success }"></div>
          </div>
        </div>
      </section>

      <!-- Historical Patterns -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">历史模式</h2>
          <p class="text-lg" :style="{ color: tokens.colors.text.tertiary }">基于海量历史数据，识别相似的价格走势模式，以史为鉴，预测未来。</p>
        </div>
        <div class="p-6 rounded-sm border opacity-90" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
          <div class="h-32 rounded-sm flex items-end justify-around px-2 pb-2" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="w-2 h-10 rounded-t-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            <div class="w-2 h-16 rounded-t-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            <div class="w-2 h-12 rounded-t-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            <div class="w-2 h-20 rounded-t-sm" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
            <div class="w-2 h-14 rounded-t-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            <div class="w-2 h-[72px] rounded-t-sm" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()
</script>