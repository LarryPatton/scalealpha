<template>
  <div class="bg-[#1a1a1a] min-h-screen">
    <!-- Hero Section -->
    <section class="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Decorations - Blue Only -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/8 rounded-full filter blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-3xl"></div>
      
      <!-- Content Container -->
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <!-- Logo - No Animation -->
        <div class="inline-block mb-8">
          <div class="w-20 h-20 md:w-24 md:h-24 bg-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <span class="text-4xl md:text-5xl font-bold text-white">Ⓐ</span>
          </div>
        </div>
        
        <!-- Main Title -->
        <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-white">
          ScaleAlpha.ai
        </h1>
        
        <!-- Subtitle -->
        <div class="mb-16">
          <p class="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-400 mb-2">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg sm:text-xl text-gray-400">
            为每个DIY投资者打造专属量化交易平台
          </p>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="mt-16 animate-bounce">
          <svg class="w-6 h-6 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    <!-- Opportunities Section -->
    <section id="opportunities" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">机会发现</h2>
            <p class="text-xl text-gray-400 mb-8">每个交易日完成的实时盘前机会报告</p>
            <button @click="navigateTo('opportunities')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有机会 →
            </button>
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
              <div class="mb-4 h-16 relative bg-[#1a1a1a] rounded-lg p-2 overflow-hidden">
                <!-- Background Grid -->
                <svg class="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
                  <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#404040" stroke-width="0.5" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#404040" stroke-width="0.5" />
                  <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#404040" stroke-width="0.5" />
                </svg>
                
                <!-- Chart SVG -->
                <svg :viewBox="`0 0 ${stock.chartData.length * 2} 40`" class="w-full h-full relative z-10" preserveAspectRatio="none">
                  <!-- Define gradient for fill area -->
                  <defs>
                    <linearGradient :id="`gradient-${stock.id}`" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" :style="`stop-color: ${stock.changePercent >= 0 ? '#ef4444' : '#10b981'}; stop-opacity: 0.3`" />
                      <stop offset="100%" :style="`stop-color: ${stock.changePercent >= 0 ? '#ef4444' : '#10b981'}; stop-opacity: 0`" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Fill area under the line -->
                  <polygon
                    :points="`0,40 ${stock.chartData.map((v, i) => `${i * 2},${40 - v * 18}`).join(' ')} ${stock.chartData.length * 2},40`"
                    :fill="`url(#gradient-${stock.id})`"
                  />
                  
                  <!-- Line -->
                  <polyline
                    :points="stock.chartData.map((v, i) => `${i * 2},${40 - v * 18}`).join(' ')"
                    fill="none"
                    :stroke="stock.changePercent >= 0 ? '#ef4444' : '#10b981'"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  
                  <!-- Dot markers on key points -->
                  <circle
                    v-for="(v, i) in stock.chartData.filter((_, idx) => idx % 10 === 0)"
                    :key="i"
                    :cx="stock.chartData.findIndex((val, idx) => idx % 10 === 0 && val === v) * 2"
                    :cy="40 - v * 18"
                    r="1.5"
                    :fill="stock.changePercent >= 0 ? '#ef4444' : '#10b981'"
                    opacity="0.6"
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
    <section id="trading" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
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
            <button @click="navigateTo('trading')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有分析 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan Making Section -->
    <section id="plan" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">计划制定</h2>
            <p class="text-xl text-gray-400 mb-8">制定您的投资计划，让AI为您的交易保驾护航</p>
            <button @click="navigateTo('plan')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有计划 →
            </button>
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
    <section id="pingping" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
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
            <button @click="navigateTo('pingping')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有提醒 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">投资组合</h2>
            <p class="text-xl text-gray-400 mb-8">管理您的投资组合，跟踪资产表现</p>
            <button @click="navigateTo('portfolio')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看完整清单 →
            </button>
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
    <section id="event" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Event Cards Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Event Card 1 -->
            <div class="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#404040] hover:border-blue-500 transition group cursor-pointer">
              <!-- Event Image -->
              <div class="h-32 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
                <!-- Tag in top-left corner -->
                <span class="absolute top-2 left-2 px-2 py-0.5 bg-red-500/90 text-white rounded text-[10px] font-semibold shadow-lg">利空</span>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-10 h-10 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Event Content -->
              <div class="p-3">
                <h3 class="text-xs font-semibold group-hover:text-blue-400 transition line-clamp-2 leading-relaxed">
                  MARA: 量子计算威胁引发加密货币生存危机
                </h3>
              </div>
            </div>

            <!-- Event Card 2 -->
            <div class="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#404040] hover:border-blue-500 transition group cursor-pointer">
              <!-- Event Image -->
              <div class="h-32 bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 relative overflow-hidden">
                <!-- Tag in top-left corner -->
                <span class="absolute top-2 left-2 px-2 py-0.5 bg-red-500/90 text-white rounded text-[10px] font-semibold shadow-lg">利空</span>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-10 h-10 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Event Content -->
              <div class="p-3">
                <h3 class="text-xs font-semibold group-hover:text-blue-400 transition line-clamp-2 leading-relaxed">
                  MSTR: 量子计算威胁引发加密货币生存危机
                </h3>
              </div>
            </div>

            <!-- Event Card 3 -->
            <div class="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#404040] hover:border-blue-500 transition group cursor-pointer">
              <!-- Event Image -->
              <div class="h-32 bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-200 relative overflow-hidden">
                <!-- Tag in top-left corner -->
                <span class="absolute top-2 left-2 px-2 py-0.5 bg-red-500/90 text-white rounded text-[10px] font-semibold shadow-lg">利空</span>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <p class="text-gray-700/70 text-[10px] font-bold px-2">ACHIEVE YOUR GOALS</p>
                  </div>
                </div>
              </div>
              
              <!-- Event Content -->
              <div class="p-3">
                <h3 class="text-xs font-semibold group-hover:text-blue-400 transition line-clamp-2 leading-relaxed">
                  SPY: 总统对美联储的施压加剧市场对政策不确定性的担忧
                </h3>
              </div>
            </div>

            <!-- Event Card 4 -->
            <div class="bg-[#2a2a2a] rounded-xl overflow-hidden border border-[#404040] hover:border-blue-500 transition group cursor-pointer">
              <!-- Event Image -->
              <div class="h-32 bg-gradient-to-br from-purple-600 via-blue-500 to-purple-700 relative overflow-hidden">
                <!-- Tag in top-left corner -->
                <span class="absolute top-2 left-2 px-2 py-0.5 bg-green-500/90 text-white rounded text-[10px] font-semibold shadow-lg">利好</span>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <p class="text-white/60 text-[10px] font-semibold px-2">ACCELERATED RETURNS</p>
                  </div>
                </div>
              </div>
              
              <!-- Event Content -->
              <div class="p-3">
                <h3 class="text-xs font-semibold group-hover:text-blue-400 transition line-clamp-2 leading-relaxed">
                  JPM: 特朗普施压美联储降息，利好银行盈利前景
                </h3>
              </div>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">事件分析</h2>
            <p class="text-xl text-gray-400 mb-8">关注重要市场事件，把握投资机会</p>
            <button @click="navigateTo('event')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有事件 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Historical Patterns Section -->
    <section id="history" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">历史模式</h2>
            <p class="text-xl text-gray-400 mb-8">分析历史价格模式，寻找规律</p>
            <button @click="navigateTo('history')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有模式 →
            </button>
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
    <section id="backtest" class="py-16 px-4 sm:px-6 lg:px-8 bg-[#222222]">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Performance Chart -->
          <div class="bg-[#2a2a2a] rounded-2xl p-6 border border-[#404040]">
            <!-- Chart Legend -->
            <div class="flex justify-center gap-6 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <span class="text-xs text-gray-300">官方实盘策略</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span class="text-xs text-gray-300">QQQ</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <span class="text-xs text-gray-300">SPY</span>
              </div>
            </div>

            <!-- SVG Chart Container -->
            <div class="relative h-64 bg-[#1a1a1a] rounded-xl p-4">
              <!-- Y-axis Labels -->
              <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-500 py-4">
                <span>25%</span>
                <span>20%</span>
                <span>15%</span>
                <span>10%</span>
                <span>5%</span>
                <span>0%</span>
              </div>

              <!-- Chart Area -->
              <svg class="w-full h-full pl-8" viewBox="0 0 1200 300" preserveAspectRatio="none">
                <!-- Grid Lines -->
                <line v-for="i in 6" :key="`grid-${i}`" x1="0" :y1="i * 60" x2="1200" :y2="i * 60" stroke="#404040" stroke-width="0.5" opacity="0.3" />
                
                <!-- Strategy Line (Blue) -->
                <polyline
                  :points="strategyData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                
                <!-- QQQ Line (Green) -->
                <polyline
                  :points="qqqData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                
                <!-- SPY Line (Yellow) -->
                <polyline
                  :points="spyData.map((v, i) => `${i * 10},${300 - v * 10}`).join(' ')"
                  fill="none"
                  stroke="#eab308"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- X-axis Time Labels -->
              <div class="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-gray-500">
                <span>2024/1</span>
                <span>2024/7</span>
                <span>2025/1</span>
                <span>2025/7</span>
              </div>
            </div>

            <!-- Performance Stats -->
            <div class="grid grid-cols-3 gap-3 mt-4">
              <div class="text-center p-3 bg-[#1a1a1a] rounded-lg">
                <div class="text-lg font-bold text-blue-400">+18.5%</div>
                <div class="text-[10px] text-gray-400">官方策略</div>
              </div>
              <div class="text-center p-3 bg-[#1a1a1a] rounded-lg">
                <div class="text-lg font-bold text-green-400">+12.3%</div>
                <div class="text-[10px] text-gray-400">QQQ</div>
              </div>
              <div class="text-center p-3 bg-[#1a1a1a] rounded-lg">
                <div class="text-lg font-bold text-yellow-400">+9.7%</div>
                <div class="text-[10px] text-gray-400">SPY</div>
              </div>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="text-right">
            <h2 class="text-4xl md:text-5xl font-bold mb-4">实盘测试</h2>
            <p class="text-xl text-gray-400 mb-8">追踪官方实盘投资策略的历史表现</p>
            <button @click="navigateTo('backtest')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看官方实盘数据 →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section id="blog" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-4">官方博客</h2>
            <p class="text-xl text-gray-400 mb-8">最新的投资分析和市场洞察</p>
            <button @click="navigateTo('blog')" class="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition cursor-pointer">
              查看所有文章 →
            </button>
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

const navigateTo = (page) => {
  window.dispatchEvent(new CustomEvent('navigate', { detail: { page } }))
}

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
    chartData: [0.8, 0.85, 0.9, 0.88, 0.92, 1.0, 1.05, 1.08, 1.12, 1.15, 1.18, 1.22, 1.28, 1.35, 1.32, 1.38, 1.42, 1.48, 1.52, 1.55, 1.58, 1.62, 1.68, 1.65, 1.7, 1.75, 1.8, 1.78, 1.72, 1.68, 1.65, 1.7, 1.68, 1.62, 1.58, 1.55, 1.52, 1.48, 1.45, 1.42]
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
    chartData: [1.2, 1.18, 1.15, 1.12, 1.08, 1.05, 1.02, 0.98, 0.95, 0.92, 0.88, 0.85, 0.82, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.55, 0.52, 0.58, 0.62, 0.65, 0.68, 0.72, 0.75, 0.78, 0.75, 0.72, 0.68, 0.65, 0.62, 0.58, 0.62, 0.65, 0.68, 0.72, 0.7]
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
    chartData: [0.5, 0.52, 0.55, 0.58, 0.62, 0.65, 0.68, 0.72, 0.75, 0.78, 0.82, 0.85, 0.88, 0.92, 0.95, 0.98, 1.02, 1.05, 1.08, 1.12, 1.15, 1.18, 1.22, 1.25, 1.28, 1.32, 1.35, 1.38, 1.42, 1.45, 1.48, 1.52, 1.55, 1.58, 1.62, 1.65, 1.68, 1.72, 1.75, 1.78]
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
    chartData: [0.9, 0.92, 0.95, 0.98, 1.0, 1.02, 1.05, 1.08, 1.1, 1.12, 1.15, 1.18, 1.2, 1.22, 1.25, 1.28, 1.3, 1.32, 1.35, 1.38, 1.4, 1.38, 1.35, 1.32, 1.3, 1.28, 1.25, 1.22, 1.25, 1.28, 1.3, 1.32, 1.35, 1.38, 1.4, 1.42, 1.45, 1.48, 1.5, 1.52]
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

// Performance chart data (simulated multi-line chart)
const strategyData = ref([
  5, 7, 6, 8, 10, 13, 12, 8, 5, 9, 10, 12, 15, 14, 13, 15, 17, 20, 22, 23, 
  21, 19, 17, 15, 18, 20, 22, 21, 19, 20, 22, 21, 19, 17, 20, 22, 21, 19, 18, 20,
  22, 23, 21, 20, 22, 21, 19, 17, 16, 14, 15, 18, 20, 19, 17, 20, 22, 21, 19, 17,
  15, 14, 16, 18, 20, 19, 17, 15, 18, 20, 22, 21, 20, 22, 23, 21, 20, 22, 21, 20,
  19, 17, 16, 15, 17, 19, 20, 19, 17, 16, 18, 20, 22, 21, 20, 19, 18, 20, 19, 18,
  17, 16, 18, 20, 19, 18, 17, 19, 20, 19, 18, 17, 16, 15, 17, 18, 19, 18, 17, 16
])

const qqqData = ref([
  5, 6, 7, 6, 5, 7, 8, 6, 5, 7, 8, 9, 8, 7, 9, 10, 9, 8, 10, 9, 
  8, 7, 9, 8, 9, 10, 11, 10, 9, 8, 10, 11, 10, 9, 8, 10, 11, 10, 9, 10,
  11, 12, 11, 10, 11, 12, 11, 10, 9, 8, 10, 11, 12, 13, 14, 13, 12, 11, 10, 11,
  12, 11, 10, 11, 12, 13, 12, 11, 10, 11, 12, 11, 10, 11, 12, 11, 10, 11, 12, 11,
  10, 9, 10, 11, 12, 11, 10, 11, 10, 9, 10, 11, 12, 11, 10, 11, 10, 9, 10, 9,
  8, 9, 10, 11, 10, 9, 8, 9, 10, 9, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7
])

const spyData = ref([
  5, 5, 6, 5, 6, 7, 6, 5, 4, 6, 7, 6, 5, 6, 7, 8, 7, 6, 8, 7, 
  6, 5, 7, 6, 7, 8, 9, 8, 7, 6, 8, 9, 8, 7, 6, 8, 9, 8, 7, 8,
  9, 10, 9, 8, 9, 10, 9, 8, 7, 6, 8, 9, 10, 11, 10, 9, 8, 7, 8, 9,
  10, 9, 8, 9, 10, 11, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9, 8, 9, 10, 9,
  8, 7, 8, 9, 10, 9, 8, 9, 8, 7, 8, 9, 10, 9, 8, 9, 8, 7, 8, 7,
  6, 7, 8, 9, 8, 7, 6, 7, 8, 7, 6, 7, 6, 5, 6, 7, 8, 7, 6, 5
])
</script>
