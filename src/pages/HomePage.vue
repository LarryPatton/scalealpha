<template>
  <div class="bg-[#1a1a1a] min-h-screen pb-20">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/8 rounded-full filter blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <!-- Logo & Title -->
        <div class="mb-12">
          <div class="inline-block mb-6">
            <div class="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mx-auto">
              <span class="text-4xl font-bold text-white">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold text-blue-400 mb-2">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg text-gray-400 mb-8">
            为每个DIY投资者打造专属量化交易平台
          </p>
          
          <!-- CTA Button -->
          <router-link to="/revenueB" class="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-full transition shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1">
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
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">机会发现</h2>
          <p class="text-lg text-gray-400">每个交易日完成的实时盘前机会报告，捕捉市场瞬息万变的机遇。</p>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <!-- Decorative Content -->
          <div class="flex items-center gap-4 mb-4">
            <div class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <span class="font-bold">D</span>
            </div>
            <div>
              <div class="h-2 w-24 bg-gray-600 rounded mb-1"></div>
              <div class="h-2 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div class="h-32 bg-[#1a1a1a] rounded-lg w-full"></div>
        </div>
      </section>

      <!-- Trading Analysis -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">交易分析</h2>
          <p class="text-lg text-gray-400">深度分析市场机会，提供专业的数据支持，辅助您的每一次交易决策。</p>
        </div>
        <div class="md:order-1 bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <div class="grid grid-cols-2 gap-4">
            <div class="h-24 bg-[#1a1a1a] rounded-lg"></div>
            <div class="h-24 bg-[#1a1a1a] rounded-lg"></div>
            <div class="h-24 bg-[#1a1a1a] rounded-lg"></div>
            <div class="h-24 bg-[#1a1a1a] rounded-lg"></div>
          </div>
        </div>
      </section>

      <!-- Plan Making -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">计划制定</h2>
          <p class="text-lg text-gray-400">制定个性化的投资计划，让AI算法为您的交易保驾护航，严格执行交易纪律。</p>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <div class="space-y-4">
            <div class="h-12 bg-[#1a1a1a] rounded-lg w-full flex items-center px-4">
              <div class="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
              <div class="h-2 w-1/2 bg-gray-600 rounded"></div>
            </div>
            <div class="h-12 bg-[#1a1a1a] rounded-lg w-full flex items-center px-4">
              <div class="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
              <div class="h-2 w-2/3 bg-gray-600 rounded"></div>
            </div>
            <div class="h-12 bg-[#1a1a1a] rounded-lg w-full flex items-center px-4">
              <div class="w-4 h-4 rounded-full bg-yellow-500 mr-3"></div>
              <div class="h-2 w-1/3 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Monitoring Alerts -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">盯盘提醒</h2>
          <p class="text-lg text-gray-400">7x24小时实时监控您关注的股票，不错过任何重要市场异动。</p>
        </div>
        <div class="md:order-1 bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80 flex items-center justify-center">
          <div class="relative">
            <div class="w-24 h-24 rounded-full border-4 border-blue-500/30 flex items-center justify-center animate-pulse">
              <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#2a2a2a]"></div>
          </div>
        </div>
      </section>

      <!-- Portfolio -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">投资组合</h2>
          <p class="text-lg text-gray-400">一站式管理您的投资组合，实时跟踪资产表现，优化资产配置。</p>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-[#1a1a1a] p-3 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">Total Value</div>
              <div class="text-lg font-bold text-white">$124,500</div>
            </div>
            <div class="bg-[#1a1a1a] p-3 rounded-lg">
              <div class="text-xs text-gray-500 mb-1">Daily P&L</div>
              <div class="text-lg font-bold text-green-500">+$1,240</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section class="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
        <div class="md:order-2">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">事件分析</h2>
          <p class="text-lg text-gray-400">深度解读财报、政策等重大事件，量化分析其对股价的潜在影响。</p>
        </div>
        <div class="md:order-1 bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <div class="space-y-3">
            <div class="h-16 bg-[#1a1a1a] rounded-lg border-l-4 border-red-500"></div>
            <div class="h-16 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500"></div>
          </div>
        </div>
      </section>

      <!-- Historical Patterns -->
      <section class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white">历史模式</h2>
          <p class="text-lg text-gray-400">基于海量历史数据，识别相似的价格走势模式，以史为鉴，预测未来。</p>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040] opacity-80">
          <div class="h-32 bg-[#1a1a1a] rounded-lg flex items-end justify-around px-2 pb-2">
            <div class="w-2 h-10 bg-gray-700 rounded-t"></div>
            <div class="w-2 h-16 bg-gray-700 rounded-t"></div>
            <div class="w-2 h-12 bg-gray-700 rounded-t"></div>
            <div class="w-2 h-20 bg-blue-500 rounded-t"></div>
            <div class="w-2 h-14 bg-gray-700 rounded-t"></div>
            <div class="w-2 h-18 bg-gray-700 rounded-t"></div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
</script>