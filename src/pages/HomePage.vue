<template>
  <div class="bg-[#1a1a1a] min-h-screen">
    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          欢迎来到ScaleAlpha.ai
        </h1>
        <p class="text-xl text-gray-400 mb-16">
          个性化AI对冲基金团队，为每个DIY投资者打造
        </p>
      </div>
    </section>

    <!-- Opportunities Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">机会发现</h2>
            <p class="text-xl text-gray-400 mb-8">每个交易日完成的实时盘前机会报告</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有机会 →
            </a>
          </div>

          <!-- Right Grid Cards -->
          <div class="grid grid-cols-2 gap-6">
            <div v-for="stock in stocks" :key="stock.id" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
              <!-- Header with Logo and Code -->
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" :style="{ backgroundColor: stock.bgColor }">
                  {{ stock.code.charAt(0) }}
                </div>
                <div class="flex-1">
                  <div class="font-bold text-sm">{{ stock.code }}<span class="text-orange-400 ml-1">●</span></div>
                  <p class="text-xs text-gray-500">{{ stock.company }}</p>
                </div>
              </div>

              <!-- Price Info -->
              <div class="mb-4">
                <div class="flex items-baseline gap-2 mb-1">
                  <span class="text-2xl font-bold">{{ stock.price }}<span class="text-xs text-gray-400">¥</span></span>
                  <span :class="stock.changePercent >= 0 ? 'text-red-400' : 'text-green-400'" class="font-semibold">
                    {{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent }}% ({{ stock.change }})
                  </span>
                </div>
              </div>

              <!-- Mini Chart -->
              <div class="mb-4 h-12 flex items-center">
                <svg :viewBox="`0 0 ${stock.chartData.length} 40`" class="w-full h-full" preserveAspectRatio="none">
                  <polyline
                    :points="stock.chartData.map((v, i) => `${i},${40 - v * 20}`).join(' ')"
                    fill="none"
                    :stroke="stock.changePercent >= 0 ? '#ef4444' : '#10b981'"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <!-- Time Labels -->
              <div class="flex justify-between text-xs text-gray-500 mb-4 px-1">
                <span>2025</span>
                <span>May</span>
                <span>Sep</span>
              </div>

              <!-- Description -->
              <p class="text-xs text-gray-400 leading-relaxed">{{ stock.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trading Analysis Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Right Grid Cards (Image Side) - 文右图左 -->
          <div>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="`trade-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
                <div class="text-center py-12">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p class="text-gray-400 text-sm">分析 {{ i }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content - 文右对齐 -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">交易分析</h2>
            <p class="text-xl text-gray-400 mb-8">深度分析市场机会，为您的交易决策提供支持</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有分析 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan Making Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">计划制定</h2>
            <p class="text-xl text-gray-400 mb-8">制定您的投资计划，让AI为您的交易保驾护航</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有计划 →
            </a>
          </div>

          <!-- Right Grid Cards -->
          <div class="grid grid-cols-2 gap-6">
            <div v-for="i in 4" :key="`plan-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
              <div class="text-center py-12">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p class="text-gray-400 text-sm">计划 {{ i }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Monitoring Alerts Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Grid Cards (Image Side) - 文右图左 -->
          <div>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="`alert-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
                <div class="text-center py-12">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p class="text-gray-400 text-sm">提醒 {{ i }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content - 文右对齐 -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">盯盘提醒</h2>
            <p class="text-xl text-gray-400 mb-8">实时监控您关注的股票，及时获得重要提醒</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有提醒 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">投资组合</h2>
            <p class="text-xl text-gray-400 mb-8">管理您的投资组合，跟踪资产表现</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看完整清单 →
            </a>
          </div>

          <!-- Right Grid Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stock in portfolioItems" :key="stock.code" class="bg-[#2a2a2a] rounded-xl p-4 border border-[#404040] hover:border-blue-500 transition">
              <div class="font-bold text-sm mb-1">{{ stock.code }}</div>
              <div class="text-xs text-gray-500 mb-3">{{ stock.name }}</div>
              <div class="flex items-baseline gap-2">
                <span class="text-lg font-bold">${{ stock.price }}</span>
                <span :class="stock.change >= 0 ? 'text-red-400' : 'text-green-400'" class="text-xs font-semibold">
                  {{ stock.change >= 0 ? '+' : '' }}{{ stock.changePercent }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Grid Cards (Image Side) - 文右图左 -->
          <div>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="`event-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
                <div class="text-center py-12">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-gray-400 text-sm">事件 {{ i }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content - 文右对齐 -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">事件分析</h2>
            <p class="text-xl text-gray-400 mb-8">关注重要市场事件，把握投资机会</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有事件 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Historical Patterns Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">历史模式</h2>
            <p class="text-xl text-gray-400 mb-8">分析历史价格模式，寻找规律</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有模式 →
            </a>
          </div>

          <!-- Right Grid Cards -->
          <div class="grid grid-cols-2 gap-6">
            <div v-for="i in 4" :key="`pattern-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
              <div class="text-center py-12">
                <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-400 text-sm">模式 {{ i }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Trading Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Grid Cards (Image Side) - 文右图左 -->
          <div>
            <div class="grid grid-cols-2 gap-6">
              <div v-for="i in 4" :key="`backtest-${i}`" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-blue-500 transition">
                <div class="text-center py-12">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p class="text-gray-400 text-sm">测试 {{ i }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content - 文右对齐 -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">实盘测试</h2>
            <p class="text-xl text-gray-400 mb-8">追踪官方实盘投资策略的历史表现</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看官方实盘数据 →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">官方博客</h2>
            <p class="text-xl text-gray-400 mb-8">最新的投资分析和市场洞察</p>
            <a href="#" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">
              查看所有文章 →
            </a>
          </div>

          <!-- Right Grid Cards -->
          <div class="grid grid-cols-2 gap-6">
            <div v-for="news in newsItems.slice(0, 4)" :key="news.id" class="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#404040] hover:border-blue-500 transition">
              <div class="h-24 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-gray-400">
                [图片]
              </div>
              <div class="p-3">
                <h4 class="font-bold text-xs mb-1 line-clamp-1">{{ news.title }}</h4>
                <p class="text-xs text-gray-500">{{ news.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-[#404040] py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
      <p>免责声明</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stocks = ref([
  {
    id: 1,
    code: 'DUOL',
    company: 'DUOLINGO, INC.',
    price: '175.45',
    changePercent: -1.58,
    change: '(2.82)',
    bgColor: '#10b981',
    description: '多邻国（Duolingo）财经后动置撤',
    chartData: [0.3, 0.5, 0.7, 0.6, 0.8, 0.5, 0.4, 0.6, 0.9, 0.7, 0.5, 0.8, 1.0, 0.6, 0.4, 0.7, 0.9, 0.5, 0.6, 0.8]
  },
  {
    id: 2,
    code: 'LI',
    company: 'LI AUTO, INC. SPONSORED ADR CLASS A',
    price: '18.68',
    changePercent: -0.80,
    change: '(0.15)',
    bgColor: '#ef4444',
    description: '理想汽车：竞争加剧与交付下滑的双重压力',
    chartData: [0.4, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.9, 0.8, 0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.7, 0.9, 0.6, 0.5]
  },
  {
    id: 3,
    code: 'SOUN',
    company: 'SOUNDHOUND AI, INC.',
    price: '11.53',
    changePercent: 0.87,
    change: '(0.10)',
    bgColor: '#ec4899',
    description: '声大人工智能：机构派发与散户希望的博弈',
    chartData: [0.5, 0.7, 0.6, 0.8, 0.5, 0.6, 0.7, 0.8, 0.9, 0.6, 0.5, 0.8, 0.7, 0.6, 0.8, 0.9, 0.7, 0.5, 0.6, 0.8]
  },
  {
    id: 4,
    code: 'ORCL',
    company: 'ORACLE CORPORATION',
    price: '220.49',
    changePercent: 0.29,
    change: '(0.63)',
    bgColor: '#f59e0b',
    description: '甲骨文的他里式合并机',
    chartData: [0.6, 0.5, 0.7, 0.8, 0.6, 0.5, 0.9, 0.7, 0.6, 0.8, 0.5, 0.7, 0.9, 0.6, 0.5, 0.8, 0.7, 0.6, 0.9, 0.8]
  }
])

const newsItems = ref([
  {
    id: 1,
    title: 'MIU-Nvidia芯成AI应用的隐喻',
    time: '2025-11-19 17:10:42',
    tag1: 'MIU',
    tag2: 'FHF'
  },
  {
    id: 2,
    title: 'NVDA: 会AI芯片设计师做华正力了',
    time: '2025-11-19 15:40:36',
    tag1: 'NVDA',
    tag2: 'FHF'
  },
  {
    id: 3,
    title: 'GOOGL:AI能够的玻璃是否造合适市场',
    time: '2025-11-19 10:38:44',
    tag1: 'GOOGL',
    tag2: 'FHF'
  },
  {
    id: 4,
    title: 'XOM: 能源股表现情况与预测推荐',
    time: '2025-11-19 10:38:04',
    tag1: 'XOM',
    tag2: 'FHF'
  }
])

const portfolioItems = ref([
  {
    code: 'LI',
    name: 'Li Auto Inc.',
    exchange: 'NASDAQ',
    price: '18.68',
    change: '-0.15',
    changePercent: -0.80
  },
  {
    code: 'DUOL',
    name: 'Duolingo, Inc.',
    exchange: 'NASDAQ',
    price: '175.45',
    change: '-2.82',
    changePercent: -1.58
  },
  {
    code: 'RBLX',
    name: 'Roblox Corporation',
    exchange: 'NYSE',
    price: '101.73',
    change: '+0.46',
    changePercent: 0.45
  },
  {
    code: '0017',
    name: 'New World Development Company Limited',
    exchange: 'HKEX',
    price: '7.31',
    change: '-0.14',
    changePercent: -1.88
  }
])
</script>
