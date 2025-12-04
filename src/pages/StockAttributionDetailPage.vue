<template>
  <div class="bg-[#0f0f0f] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- Stock Basic Info Card -->
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-6 mb-8">
        <div class="flex items-start justify-between">
          <!-- Left Section: Company Info & Price -->
          <div class="flex-1">
            <!-- Company Name & Symbol -->
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white font-bold">
                {{ stockInfo.symbol.charAt(0) }}
              </div>
              <div>
                <h1 class="text-xl font-bold text-white flex items-center gap-2">
                  {{ stockInfo.companyName }} ({{ stockInfo.symbol }})
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </h1>
                <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span class="flex items-center gap-1">
                    <img src="https://flagcdn.com/w20/us.png" alt="US" class="w-4 h-3">
                    纳斯达克
                  </span>
                  <span>•</span>
                  <span>按钮</span>
                  <span>USD</span>
                </div>
              </div>
            </div>

            <!-- Current Price & Change -->
            <div class="flex items-end gap-6 mb-4">
              <div>
                <div class="text-4xl font-bold text-white">{{ stockInfo.currentPrice }}</div>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-medium" :class="stockInfo.changePercent >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ stockInfo.changePercent >= 0 ? '+' : '' }}{{ stockInfo.changeAmount }} ({{ stockInfo.changePercent >= 0 ? '+' : '' }}{{ stockInfo.changePercent }}%)
                  </span>
                  <span class="text-sm" :class="stockInfo.changePercent >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ stockInfo.changePercent >= 0 ? '▲' : '▼' }}
                  </span>
                </div>
              </div>

              <!-- Pre-market Data -->
              <div class="border-l border-[#333] pl-6">
                <div class="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  盘前 · {{ stockInfo.preMarket.time }}
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium" :class="stockInfo.preMarket.changePercent >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ stockInfo.preMarket.changePercent >= 0 ? '▲' : '▼' }}
                  </span>
                  <span class="text-lg font-bold text-white">{{ stockInfo.preMarket.price }}</span>
                  <span class="text-sm" :class="stockInfo.preMarket.changePercent >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ stockInfo.preMarket.changePercent >= 0 ? '+' : '' }}{{ stockInfo.preMarket.changeAmount }} ({{ stockInfo.preMarket.changePercent >= 0 ? '+' : '' }}{{ stockInfo.preMarket.changePercent }}%)
                  </span>
                  <span class="text-xs text-gray-500">{{ stockInfo.preMarket.time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section: Fair Value & Ranges -->
          <div class="flex flex-col gap-4 min-w-[320px]">
            <!-- Fair Value -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-gray-500">公允价格</span>
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div class="relative">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{{ stockInfo.fairValue.low }}</span>
                  <span>{{ stockInfo.fairValue.high }}</span>
                </div>
                <div class="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full relative">
                  <div class="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded" :style="{ left: stockInfo.fairValue.position + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- Day Range -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-gray-500">当日幅度</span>
              </div>
              <div class="relative">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-400">{{ stockInfo.dayRange.low }}</span>
                  <span class="text-gray-400">{{ stockInfo.dayRange.high }}</span>
                </div>
                <div class="h-1.5 bg-gray-700 rounded-full relative overflow-hidden">
                  <div class="absolute left-0 h-full bg-gray-500 rounded-full" :style="{ width: stockInfo.dayRange.position + '%' }"></div>
                  <div class="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white" :style="{ left: stockInfo.dayRange.position + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- 52 Week Range -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-gray-500">52周范围</span>
              </div>
              <div class="relative">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-gray-400">{{ stockInfo.week52Range.low }}</span>
                  <span class="text-gray-400">{{ stockInfo.week52Range.high }}</span>
                </div>
                <div class="h-1.5 bg-gray-700 rounded-full relative overflow-hidden">
                  <div class="absolute left-0 h-full bg-gray-500 rounded-full" :style="{ width: stockInfo.week52Range.position + '%' }"></div>
                  <div class="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-white" :style="{ left: stockInfo.week52Range.position + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="grid grid-cols-5 border-b border-[#333] mb-8">
        <button 
          @click="activeTab = 'price'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'price' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          价格走势 (Price Trend)
        </button>
        <button 
          @click="activeTab = 'themes'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'themes' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          相关主题 (Related Themes)
        </button>
        <button 
          @click="activeTab = 'attribution'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'attribution' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          事件分析 (Event Analysis)
        </button>
        <button 
          @click="activeTab = 'strategies'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'strategies' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          个股相关策略 (Strategies)
        </button>
        <button 
          @click="activeTab = 'plan'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'plan' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          计划制定 (Plan Formulation)
        </button>
      </div>

      <!-- Related Themes Tab -->
      <div v-if="activeTab === 'themes'" class="animate-fade-in">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h3 class="text-lg font-bold text-white">相关主题</h3>
            <span class="text-sm text-gray-500">({{ relatedThemes.length }})</span>
          </div>
          <div class="text-xs text-gray-500">
            数据与市场热点同步
          </div>
        </div>

        <!-- Themes List -->
        <div v-if="relatedThemes.length > 0" class="space-y-4">
          <div 
            v-for="theme in relatedThemes" 
            :key="theme.id" 
            @click="toggleThemeExpand(theme)"
            class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer"
          >
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Left: Sentiment & Confidence -->
              <div class="md:w-48 flex-shrink-0">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold px-2 py-1 rounded border" 
                    :class="{
                      'bg-green-900/30 text-green-400 border-green-900/50': theme.sentiment === 'BULLISH',
                      'bg-gray-700/30 text-gray-400 border-gray-700/50': theme.sentiment === 'NEUTRAL',
                      'bg-red-900/30 text-red-400 border-red-900/50': theme.sentiment === 'BEARISH'
                    }">
                    {{ theme.sentiment }}
                  </span>
                  <span class="text-sm font-bold text-white">{{ theme.confidence }}%</span>
                </div>
                <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full" 
                    :class="{
                      'bg-green-500': theme.sentiment === 'BULLISH',
                      'bg-gray-500': theme.sentiment === 'NEUTRAL',
                      'bg-red-500': theme.sentiment === 'BEARISH'
                    }"
                    :style="{ width: theme.confidence + '%' }"></div>
                </div>
              </div>

              <!-- Middle: Content -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors pr-20">{{ theme.title }}</h3>
                <p class="text-sm text-gray-400 mb-3">{{ theme.desc }}</p>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">Related:</span>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="stock in theme.stocks" :key="stock" class="text-xs bg-[#2a2a2a] text-gray-300 px-2 py-0.5 rounded border border-[#333]">{{ stock }}</span>
                  </div>
                </div>
              </div>

              <!-- Right: Meta -->
              <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                <div class="text-xs text-gray-500">{{ theme.timeAgo }}</div>
                <div class="flex items-center gap-1 text-xs font-medium" 
                  :class="{
                    'text-red-400': theme.heat === 'High',
                    'text-orange-400': theme.heat === 'Med',
                    'text-blue-400': theme.heat === 'Low'
                  }">
                  <span>🔥</span> {{ theme.heat }} Heat
                </div>
              </div>
            </div>

            <!-- Follow Button -->
            <button 
              @click.stop="toggleThemeFollow(theme)"
              class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
              :class="theme.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
            >
              {{ theme.isFollowed ? '✓ 已关注' : '+ 关注' }}
            </button>

            <!-- Expanded Content -->
            <div v-if="theme.isExpanded" class="mt-6 pt-6 border-t border-[#333] animate-fade-in cursor-default" @click.stop>
              <div class="mb-6">
                <h4 class="text-sm font-bold text-gray-300 mb-2">📖 主题详情 (Theme Content)</h4>
                <p class="text-sm text-gray-400 leading-relaxed">{{ theme.content }}</p>
              </div>
              <div>
                <h4 class="text-sm font-bold text-gray-300 mb-3">🔗 相关个股 (Related Stocks)</h4>
                <div class="space-y-3">
                  <div 
                    v-for="stock in theme.stockDetails" 
                    :key="stock.symbol" 
                    @click="goToStockDetail(stock.symbol)"
                    class="bg-[#222] rounded p-3 flex flex-col sm:flex-row sm:items-center gap-3 border border-[#333] hover:bg-[#2a2a2a] hover:border-gray-500 cursor-pointer transition-colors"
                  >
                    <div class="flex items-center gap-4 min-w-[120px]">
                      <span class="font-bold text-white">{{ stock.symbol }}</span>
                      <span class="text-xs font-mono" :class="stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                        {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}% {{ stock.change >= 0 ? '↑' : '↓' }}
                      </span>
                    </div>
                    <div class="text-xs text-gray-500 border-l border-[#444] pl-3 sm:pl-4">
                      {{ stock.reason }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex justify-center">
                <button @click.stop="toggleThemeExpand(theme)" class="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                  收起 (Collapse) 🔼
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-[#1a1a1a] rounded-xl border border-[#333] p-12 text-center">
          <div class="text-4xl mb-4">🔍</div>
          <h3 class="text-xl font-bold text-white mb-2">暂无相关主题</h3>
          <p class="text-gray-500">该股票当前不在任何市场主题中</p>
        </div>
      </div>

      <!-- Price Tab -->
      <div v-if="activeTab === 'price'" class="animate-fade-in">
        <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-6 h-96 flex items-center justify-center relative overflow-hidden">
           <!-- Mock Chart -->
           <div class="absolute inset-0 flex items-end px-4 pb-4 opacity-50">
              <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0,80 Q10,70 20,75 T40,60 T60,40 T80,30 T100,10" fill="none" stroke="#3b82f6" stroke-width="2" />
                 <path d="M0,80 L100,80" stroke="#333" stroke-width="0.5" stroke-dasharray="2 2" />
                 <path d="M0,50 L100,50" stroke="#333" stroke-width="0.5" stroke-dasharray="2 2" />
                 <path d="M0,20 L100,20" stroke="#333" stroke-width="0.5" stroke-dasharray="2 2" />
              </svg>
           </div>
           <div class="text-center z-10">
             <h3 class="text-xl font-bold text-white mb-2">{{ symbol }} Price Trend</h3>
             <p class="text-gray-500">Real-time data visualization</p>
             <div class="mt-4 text-3xl font-mono text-green-400">$142.58 <span class="text-sm text-green-600">+2.4%</span></div>
           </div>
        </div>
      </div>

      <!-- Strategies Tab -->
      <div v-if="activeTab === 'strategies'" class="animate-fade-in">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <h3 class="text-lg font-bold text-white">个股相关策略</h3>
            <span class="text-sm text-gray-500">({{ relatedStrategies.length }})</span>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-xs text-gray-500">
              数据与官方推荐同步
            </div>
            <button 
              @click="navigateToGenerateStrategy(symbol)"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center gap-2"
            >
              <span>✨</span>
              <span>生成 {{ symbol }} 策略</span>
            </button>
          </div>
        </div>

        <!-- Strategies List -->
        <div v-if="relatedStrategies.length > 0" class="space-y-4">
          <div 
            v-for="strategy in relatedStrategies" 
            :key="strategy.id"
            :ref="el => { if (strategy.id === highlightedStrategyId) highlightedStrategyRef = el }"
            @click="openStrategyDetail(strategy)"
            class="bg-[#1a1a1a] rounded-xl border p-5 hover:border-blue-500 transition-all group cursor-pointer"
            :class="strategy.id === highlightedStrategyId 
              ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] bg-[#1a2740]' 
              : 'border-[#333]'"
          >
            <div class="flex items-start gap-4">
              <!-- Left: Symbol & Grade -->
              <div class="flex flex-col items-center gap-2 min-w-[80px]">
                <div class="text-lg font-bold text-white">{{ strategy.symbol }}</div>
                <div class="px-2 py-0.5 rounded text-xs font-bold" 
                  :class="{
                    'bg-green-900/30 text-green-400 border border-green-900/50': strategy.grade === 'A' || strategy.grade === 'A+',
                    'bg-blue-900/30 text-blue-400 border border-blue-900/50': strategy.grade === 'B',
                    'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50': strategy.grade === 'C'
                  }">
                  {{ strategy.grade }}
                </div>
              </div>

              <!-- Middle: Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span v-if="strategy.isNew" class="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">NEW</span>
                  <h3 class="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors">{{ strategy.title }}</h3>
                </div>
                <div class="text-sm text-gray-400 space-y-1 mb-2">
                  <p class="line-clamp-2">{{ strategy.description }}</p>
                </div>
                <div class="flex items-center gap-3 text-xs text-gray-500">
                  <span>{{ strategy.timeAgo }}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span> {{ strategy.strategy }}
                  </span>
                </div>
              </div>

              <!-- Right: Direction & Duration -->
              <div class="flex flex-col items-end gap-2 min-w-[120px] text-right">
                <div class="flex items-center gap-1 font-bold text-sm"
                  :class="{
                    'text-green-500': strategy.direction === 'LONG',
                    'text-red-500': strategy.direction === 'SHORT',
                    'text-gray-400': strategy.direction === 'WAIT'
                  }">
                  <span v-if="strategy.direction === 'LONG'">↑</span>
                  <span v-if="strategy.direction === 'SHORT'">↓</span>
                  {{ strategy.direction }}
                </div>
                <div class="text-xs text-gray-500 flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {{ strategy.duration }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-[#1a1a1a] rounded-xl border border-[#333] p-12 text-center">
          <div class="text-6xl mb-6">🎯</div>
          <h3 class="text-2xl font-bold text-white mb-3">暂无 {{ symbol }} 相关策略</h3>
          <p class="text-gray-400 mb-8 max-w-md mx-auto">
            还没有针对此股票的投资策略？基于AI量化分析，为 {{ symbol }} 生成专属策略
          </p>
          
          <!-- Primary CTA -->
          <button 
            @click="navigateToGenerateStrategy(symbol)"
            class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-blue-500/50 mb-4"
          >
            <span class="text-2xl">✨</span>
            <span>生成 {{ symbol }} 专属策略</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <!-- Secondary CTA -->
          <div class="text-sm text-gray-500">
            或者
            <button 
              @click="router.push('/opportunities?tab=opportunities')"
              class="text-blue-400 hover:text-blue-300 underline ml-1"
            >
              浏览所有策略
            </button>
          </div>
        </div>
      </div>

      <!-- Plan Tab -->
      <div v-if="activeTab === 'plan'" class="animate-fade-in">
        <div class="mb-6">
          <h3 class="text-lg font-bold text-white mb-2">📊 {{ symbol }} 交易计划制定</h3>
          <p class="text-sm text-gray-500">基于AI推荐与个人策略的综合交易计划</p>
        </div>
      </div>

      <!-- Attribution Tab -->
      <div v-if="activeTab === 'attribution'" class="animate-fade-in">
        <!-- Stats Bar -->
        <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-gray-400">
            <span class="text-white font-bold">59</span> events
          </div>
          <div class="flex items-center gap-2 text-green-500">
            <span>↑</span> <span class="font-bold">47</span>
          </div>
          <div class="flex items-center gap-2 text-red-500">
            <span>↓</span> <span class="font-bold">9</span>
          </div>
        </div>
        
        <!-- Mock Bar Chart -->
        <div class="flex items-end gap-1 h-8 flex-1 max-w-md mx-auto">
          <div v-for="i in 14" :key="i" class="w-full bg-blue-900/30 rounded-t-sm relative group" :style="{ height: Math.random() * 100 + '%' }">
            <div class="absolute bottom-0 left-0 w-full bg-blue-500 rounded-t-sm transition-all duration-300" :style="{ height: Math.random() * 100 + '%' }"></div>
          </div>
          <div class="w-full bg-blue-500 h-full rounded-t-sm relative">
             <span class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 whitespace-nowrap">Today</span>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex bg-[#0f0f0f] rounded-lg p-1 border border-[#333]">
          <button 
            v-for="filter in filters" 
            :key="filter"
            @click="activeFilter = filter"
            class="px-3 py-1 text-xs font-medium rounded-md transition-all"
            :class="activeFilter === filter ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Event List -->
      <div class="space-y-8">
        <div v-for="(group, groupName) in groupedEvents" :key="groupName">
          <div class="flex items-center gap-4 mb-4 border-b border-[#333] pb-2">
            <h2 class="text-lg font-bold text-white">{{ groupName }}</h2>
            <span class="text-sm text-gray-500">{{ group.length }} events</span>
          </div>
          
          <div class="space-y-2">
            <div 
              v-for="event in group" 
              :key="event.id" 
              @click="openDetail(event)"
              class="bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors group"
            >
              <div class="flex items-center gap-4 overflow-hidden">
                <span class="text-xs text-gray-500 font-mono flex-shrink-0">{{ event.time }}</span>
                <div class="flex items-center gap-3 min-w-0">
                  <span class="w-2 h-2 rounded-full flex-shrink-0" :class="getSentimentColor(event.sentiment)"></span>
                  <h3 class="text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                    <span class="font-bold text-white mr-1">{{ symbol }}:</span> {{ event.title }}
                  </h3>
                </div>
              </div>
              
              <div class="flex-shrink-0 ml-4">
                <span class="text-xs px-2 py-1 rounded border" :class="getSentimentBadgeClass(event.sentiment)">
                  {{ getSentimentIcon(event.sentiment) }} {{ event.sentiment }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div> <!-- End of Attribution Tab -->
    </div>

    <!-- Strategy Detail Modal -->
    <div v-if="showStrategyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.self="closeStrategyModal">
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#333] flex justify-between items-start sticky top-0 bg-[#1a1a1a] z-10">
          <div class="flex items-center gap-3 flex-1">
            <div class="px-2 py-0.5 rounded text-xs font-bold" 
              :class="{
                'bg-green-900/30 text-green-400 border border-green-900/50': selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+',
                'bg-blue-900/30 text-blue-400 border border-blue-900/50': selectedStrategy.grade === 'B',
                'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50': selectedStrategy.grade === 'C'
              }">
              Grade {{ selectedStrategy.grade }}
            </div>
            <div class="flex items-center gap-1 font-bold text-sm"
              :class="{
                'text-green-500': selectedStrategy.direction === 'LONG',
                'text-red-500': selectedStrategy.direction === 'SHORT',
                'text-gray-400': selectedStrategy.direction === 'WAIT'
              }">
              <span v-if="selectedStrategy.direction === 'LONG'">↑</span>
              <span v-if="selectedStrategy.direction === 'SHORT'">↓</span>
              {{ selectedStrategy.direction }}
            </div>
            <span class="text-xs text-gray-500">{{ selectedStrategy.timeAgo }}</span>
          </div>
          <button @click="closeStrategyModal" class="text-gray-500 hover:text-white transition-colors ml-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <div>
            <div class="text-2xl font-bold text-white mb-1">{{ selectedStrategy.symbol }}</div>
            <h2 class="text-lg font-bold text-gray-300 leading-tight mb-4">{{ selectedStrategy.title }}</h2>
            
            <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                {{ selectedStrategy.strategy }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ selectedStrategy.duration }}
              </span>
            </div>
          </div>

          <!-- Summary Box -->
          <div class="bg-[#222] rounded-lg p-4 border border-[#333] text-sm text-gray-300 leading-relaxed">
            {{ selectedStrategy.description }}
          </div>

          <!-- Full Strategy Content (Markdown-style) -->
          <div class="prose prose-invert prose-sm max-w-none">
            <div class="text-gray-300 space-y-4 leading-relaxed" style="white-space: pre-line;">
              {{ selectedStrategy.fullContent }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.self="closeModal">
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <!-- Modal Header -->
        <div class="p-6 border-b border-[#333] flex justify-between items-start sticky top-0 bg-[#1a1a1a] z-10">
          <div class="flex items-center gap-3">
            <span class="text-xs px-2 py-1 rounded border" :class="getSentimentBadgeClass(selectedEvent.sentiment)">
              {{ getSentimentIcon(selectedEvent.sentiment) }} {{ selectedEvent.sentiment }}
            </span>
            <span class="text-xs text-gray-500 flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ selectedEvent.fullTime }}
            </span>
          </div>
          <button @click="closeModal" class="text-gray-500 hover:text-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold text-white leading-tight">
            <span class="text-blue-400 mr-2">{{ symbol }}:</span>
            {{ selectedEvent.title }}
          </h2>

          <!-- Summary Box -->
          <div class="bg-[#222] rounded-lg p-4 border border-[#333] text-sm text-gray-300 leading-relaxed">
            {{ selectedEvent.summary }}
          </div>

          <!-- Analysis Sections -->
          <div class="space-y-6">
            <div>
              <h3 class="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <span class="text-lg">📄</span> 对公司的事件影响分析
              </h3>
              <p class="text-sm text-gray-400 leading-relaxed pl-7">
                {{ selectedEvent.impactAnalysis }}
              </p>
            </div>

            <div>
              <h3 class="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <span class="text-lg">📈</span> 事件影响预期分析
              </h3>
              <p class="text-sm text-gray-400 leading-relaxed pl-7">
                {{ selectedEvent.expectationAnalysis }}
              </p>
            </div>

            <div>
              <h3 class="flex items-center gap-2 text-sm font-bold text-white mb-2">
                <span class="text-lg">⚖️</span> 历史回测与概率
              </h3>
              <p class="text-sm text-gray-400 leading-relaxed pl-7">
                {{ selectedEvent.backtestAnalysis }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const symbol = ref(route.params.id || 'NVDA')

// --- Stock Basic Info Data ---
const stockInfo = ref({
  symbol: 'GOOGL',
  companyName: 'Alphabet Inc.',
  currentPrice: '178.35',
  changeAmount: '3.12',
  changePercent: 1.78,
  preMarket: {
    price: '179.85',
    changeAmount: '1.50',
    changePercent: 0.84,
    time: '08:45:23'
  },
  fairValue: {
    low: '165.00',
    high: '190.00',
    position: 53 // percentage position of current price
  },
  dayRange: {
    low: '175.20',
    high: '179.80',
    position: 70
  },
  week52Range: {
    low: '121.46',
    high: '193.31',
    position: 79
  }
})

// --- State ---
const activeTab = ref('attribution')
const activeFilter = ref('All')
const filters = ['All', 'Bullish', 'Bearish', 'Neutral']
const showModal = ref(false)
const selectedEvent = ref({})
const showStrategyModal = ref(false)
const selectedStrategy = ref({})

// --- Highlight State (for navigation from opportunities page) ---
const highlightedStrategyId = ref(null)
const highlightedStrategyRef = ref(null)

// --- Mock Data: Market Themes (与AllMarketThemesPage同步) ---
const allThemesData = ref([
  { 
    id: 1, 
    title: 'AI Infrastructure Boom', 
    desc: 'Enterprise AI adoption drives massive infrastructure investment across cloud and semiconductor sectors.', 
    sentiment: 'BULLISH', 
    confidence: 92, 
    stocks: ['NVDA', 'AMD', 'SMCI', 'AVGO'], 
    timeAgo: '2 hours ago', 
    timestamp: Date.now() - 2 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 90, 
    isFollowed: false,
    isExpanded: false,
    content: 'The surge in Generative AI applications is creating an unprecedented demand for high-performance computing infrastructure. Hyperscalers are aggressively increasing their capex to secure GPU supplies, directly benefiting the semiconductor supply chain. We are seeing a structural shift where data center revenue is becoming the primary growth engine for chipmakers.',
    stockDetails: [
      { symbol: 'NVDA', change: 3.45, reason: 'Dominant market share in AI training GPUs; data center revenue +400% YoY.' },
      { symbol: 'AMD', change: 1.20, reason: 'Emerging as a strong second player with MI300 series; gaining traction in inference workloads.' },
      { symbol: 'SMCI', change: -0.50, reason: 'Leading liquid cooling solutions for high-density racks, though margin pressure remains.' },
      { symbol: 'AVGO', change: 2.10, reason: 'Strong demand for custom AI accelerators (ASICs) from Google and Meta.' }
    ]
  },
  { 
    id: 2, 
    title: 'Cybersecurity Renaissance', 
    desc: 'Rising threats fuel enterprise security spending surge as companies fortify digital defenses.', 
    sentiment: 'BULLISH', 
    confidence: 78, 
    stocks: ['CRWD', 'PANW', 'ZS', 'FTNT'], 
    timeAgo: '5 hours ago', 
    timestamp: Date.now() - 5 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 70, 
    isFollowed: false,
    isExpanded: false,
    content: 'With the increasing sophistication of cyber attacks, including AI-driven threats, enterprises are prioritizing cybersecurity in their IT budgets. Zero-trust architecture and platformization are key trends driving consolidation in the industry.',
    stockDetails: [
      { symbol: 'CRWD', change: 1.85, reason: 'Platform consolidation thesis playing out; strong module adoption.' },
      { symbol: 'PANW', change: 0.95, reason: 'Next-gen firewall demand remains robust; expanding into cloud security.' },
      { symbol: 'ZS', change: -0.30, reason: 'High valuation multiples causing short-term volatility despite good growth.' },
      { symbol: 'FTNT', change: 1.10, reason: 'Strong product cycle in secure networking.' }
    ]
  },
  { 
    id: 6, 
    title: 'Semiconductor Cycle', 
    desc: 'Memory chip market showing signs of recovery as demand stabilizes.', 
    sentiment: 'BULLISH', 
    confidence: 80, 
    stocks: ['MU', 'WDC', 'NVDA'], 
    timeAgo: 'Yesterday', 
    timestamp: Date.now() - 30 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 65, 
    isFollowed: false,
    isExpanded: false,
    content: 'After a severe inventory correction, the memory market is bottoming out. Production cuts by major players and recovering demand in PCs and smartphones are driving price increases.',
    stockDetails: [
      { symbol: 'MU', change: 4.10, reason: 'HBM3e qualification with NVIDIA; pricing power returning.' },
      { symbol: 'WDC', change: 2.30, reason: 'Flash memory prices rebounding; spin-off plans unlocking value.' },
      { symbol: 'NVDA', change: 3.45, reason: 'GPU demand driving HBM consumption; supply agreements secured.' }
    ]
  },
  { 
    id: 10, 
    title: 'Cloud Computing Growth', 
    desc: 'Major cloud providers report accelerating revenue growth driven by AI workloads.', 
    sentiment: 'BULLISH', 
    confidence: 85, 
    stocks: ['GOOGL', 'MSFT', 'AMZN'], 
    timeAgo: '1 day ago', 
    timestamp: Date.now() - 24 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 88, 
    isFollowed: false,
    isExpanded: false,
    content: 'The three major hyperscalers are seeing unprecedented demand for AI infrastructure. Google Cloud grew 35% YoY, Azure ML revenue doubled, and AWS is expanding GPU capacity. This creates a virtuous cycle for semiconductor suppliers and software platforms.',
    stockDetails: [
      { symbol: 'GOOGL', change: 1.85, reason: 'Cloud revenue +35% YoY; Gemini API gaining enterprise traction.' },
      { symbol: 'MSFT', change: 2.10, reason: 'Azure OpenAI Service driving cloud acceleration; Copilot adoption strong.' },
      { symbol: 'AMZN', change: 1.45, reason: 'AWS remains market leader; Trainium/Inferentia chips reducing costs.' }
    ]
  },
  { 
    id: 11, 
    title: 'Search Engine AI Evolution', 
    desc: 'Search giants integrating generative AI into core products, transforming user experience and monetization.', 
    sentiment: 'BULLISH', 
    confidence: 88, 
    stocks: ['GOOGL', 'MSFT'], 
    timeAgo: '6 hours ago', 
    timestamp: Date.now() - 6 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 92, 
    isFollowed: false,
    isExpanded: false,
    content: 'Google\'s AI Overview and Microsoft\'s Bing Chat are reshaping search dynamics. Despite initial concerns about ad revenue cannibalization, data shows AI-enhanced search actually increases user engagement and monetization potential. Google maintains 91.5% market share while successfully integrating Gemini capabilities.',
    stockDetails: [
      { symbol: 'GOOGL', change: 2.15, reason: 'AI Overview rollout increases session time by 8%; ad relevance improves CPM by 5%.' },
      { symbol: 'MSFT', change: 0.85, reason: 'Bing Chat integration drives Edge browser adoption; search share gains modest.' }
    ]
  },
  { 
    id: 12, 
    title: 'Digital Advertising Recovery', 
    desc: 'Online ad spending rebounds as brands increase budgets for Q4 shopping season and 2024 elections.', 
    sentiment: 'BULLISH', 
    confidence: 82, 
    stocks: ['GOOGL', 'META', 'AMZN', 'TTDD'], 
    timeAgo: '8 hours ago', 
    timestamp: Date.now() - 8 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 85, 
    isFollowed: false,
    isExpanded: false,
    content: 'Digital advertising market showing strong recovery with Q4 spending up 12% YoY. Political advertising for 2024 elections adds $15-20B incremental spending. Brand budgets returning after 2023 slowdown, particularly in retail, automotive, and consumer goods categories.',
    stockDetails: [
      { symbol: 'GOOGL', change: 1.65, reason: 'YouTube ads +12.5%, Search ads +7%; Political ad spend accelerating.' },
      { symbol: 'META', change: 2.30, reason: 'Reels monetization improving; brand advertiser return strong.' },
      { symbol: 'AMZN', change: 1.20, reason: 'Sponsored Products growth remains robust; retail media expanding.' },
      { symbol: 'TTDD', change: -0.40, reason: 'TikTok faces regulatory headwinds; some budget shifts to YouTube/Meta.' }
    ]
  },
  { 
    id: 13, 
    title: 'Video Streaming Wars', 
    desc: 'Competition intensifies as platforms focus on profitability over subscriber growth; ad-supported tiers gaining traction.', 
    sentiment: 'NEUTRAL', 
    confidence: 70, 
    stocks: ['GOOGL', 'NFLX', 'DIS', 'PARA'], 
    timeAgo: '12 hours ago', 
    timestamp: Date.now() - 12 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 68, 
    isFollowed: false,
    isExpanded: false,
    content: 'Streaming landscape shifting from growth-at-all-costs to sustainable profitability. YouTube remains the clear leader with 20B+ hours watched daily. Traditional media struggling with profitability while YouTube\'s ad-supported model thrives. NFL Sunday Ticket deal strengthens YouTube TV\'s premium positioning.',
    stockDetails: [
      { symbol: 'GOOGL', change: 0.95, reason: 'YouTube watch time +15%; NFL Sunday Ticket subscriber additions exceed expectations.' },
      { symbol: 'NFLX', change: -0.50, reason: 'Ad tier slower than expected; password sharing crackdown mixed results.' },
      { symbol: 'DIS', change: -1.10, reason: 'Disney+ losing subscribers; ESPN+ integration challenges remain.' },
      { symbol: 'PARA', change: -2.30, reason: 'Paramount+ cash burn continues; merger speculation mounting.' }
    ]
  },
  { 
    id: 14, 
    title: 'Autonomous Vehicle Commercialization', 
    desc: 'Robotaxi services expanding to new cities as regulatory approvals accelerate; profitability path becoming clearer.', 
    sentiment: 'BULLISH', 
    confidence: 75, 
    stocks: ['GOOGL', 'TSLA', 'UBER'], 
    timeAgo: '1 day ago', 
    timestamp: Date.now() - 25 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 72, 
    isFollowed: false,
    isExpanded: false,
    content: 'Waymo (Google) completing over 1M paid rides quarterly across San Francisco, Los Angeles, and Phoenix. Unit economics improving as fleet scales. California and Texas expanding regulatory approvals. Uber partnership providing distribution while Tesla\'s unsupervised FSD launch delayed to 2025.',
    stockDetails: [
      { symbol: 'GOOGL', change: 1.40, reason: 'Waymo fleet expanding to 1000+ vehicles; Austin launch successful; nearing profitability per ride.' },
      { symbol: 'TSLA', change: -1.50, reason: 'Robotaxi event underwhelms; unsupervised FSD timeline pushed back.' },
      { symbol: 'UBER', change: 0.60, reason: 'Waymo integration provides upside optionality; ride-hailing demand remains strong.' }
    ]
  },
  { 
    id: 15, 
    title: 'AI Hardware Competition Heats Up', 
    desc: 'Tech giants developing custom AI chips to reduce NVIDIA dependency; implications for semiconductor ecosystem.', 
    sentiment: 'NEUTRAL', 
    confidence: 73, 
    stocks: ['GOOGL', 'AMZN', 'MSFT', 'NVDA'], 
    timeAgo: '2 days ago', 
    timestamp: Date.now() - 48 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 65, 
    isFollowed: false,
    isExpanded: false,
    content: 'Google TPU v5, Amazon Trainium/Inferentia, and Microsoft Maia chips gaining traction for AI workloads. While NVIDIA remains dominant for training, custom chips capturing share in inference. Vertical integration trend creates both opportunities and threats across value chain.',
    stockDetails: [
      { symbol: 'GOOGL', change: 0.80, reason: 'TPU v5p deployment accelerating; reduces cloud infrastructure costs by 20-30%.' },
      { symbol: 'AMZN', change: 0.65, reason: 'Trainium2 performance benchmarks competitive; AWS customers adopting.' },
      { symbol: 'MSFT', change: 0.40, reason: 'Maia chip ramping slowly; still heavily reliant on NVIDIA for most workloads.' },
      { symbol: 'NVDA', change: 1.85, reason: 'Training market remains captive; inference competition manageable in near-term.' }
    ]
  },
  { 
    id: 16, 
    title: 'Antitrust Regulatory Pressure', 
    desc: 'DOJ antitrust cases against Google escalating; potential remedies could reshape search and advertising markets.', 
    sentiment: 'BEARISH', 
    confidence: 68, 
    stocks: ['GOOGL', 'AAPL'], 
    timeAgo: '3 days ago', 
    timestamp: Date.now() - 72 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 70, 
    isFollowed: false,
    isExpanded: false,
    content: 'DOJ pushing for structural remedies in search monopoly case, including potential Chrome browser divestiture and default search deal restrictions. Separate ad tech case threatens Google\'s advertising stack integration. Legal battles expected to extend 2-3 years with appeals.',
    stockDetails: [
      { symbol: 'GOOGL', change: -1.85, reason: 'Default search deals at risk ($20B annual payments to Apple); Chrome divestiture proposal overhang.' },
      { symbol: 'AAPL', change: -0.45, reason: 'Google search payments represent ~15-20% of Services gross profit; replacement risk.' }
    ]
  }
])

// --- Mock Data: Strategies (同步自 AllOpportunitiesPage)---
const allStrategies = [
  { 
    id: 1, 
    symbol: 'GOOGL', 
    grade: 'A', 
    title: 'Google AI Infrastructure & Gemini Super-Cycle', 
    description: 'ACT 1: 市场短期流动性波动将GOOGL推回$317水平，部分投资者仍担忧OpenAI Shopping的竞争威胁。ACT 2: 然而，我们看到$315支撑位的强劲买盘验证了机构的吸筹行为。Meta洽购...', 
    direction: 'LONG', 
    duration: 'Short to Medium-term (2-8 weeks)', 
    strategy: 'AI Infrastructure',
    timeAgo: '2 hours ago',
    timestamp: 1701420000000,
    isNew: true,
    fullContent: `
## 第一幕：市场疑虑与技术回调

市场短期流动性波动将GOOGL推回$317水平，部分投资者仍担忧OpenAI Shopping的竞争威胁。技术面显示，股价在$320附近遇阻，短期出现超买信号。

## 第二幕：基本面支撑显现

然而，我们看到$315支撑位的强劲买盘验证了机构的吸筹行为。Gemini AI产品线持续扩张，Google Cloud Q3营收同比增长35%，显示AI基础设施投资回报开始兑现。

## 投资建议

**入场点位**: $315-320
**目标价位**: $360-380
**止损位**: $305
**预期收益**: +18-22%
**风险等级**: 中等

## 关键信号

- Gemini Pro API调用量环比增长50%
- Google Cloud客户数突破1000万
- 搜索广告业务稳健增长
    `
  },
  { 
    id: 9, 
    symbol: 'GOOGL', 
    grade: 'A+', 
    title: 'YouTube广告复苏 + Shorts商业化加速', 
    description: 'YouTube Q3广告营收达$79.5亿（同比+12.5%），扭转了连续两季度的下滑趋势。Shorts日活跃用户突破20亿，商业化进程加速，CPM价格已接近长视频的60%。品牌广告主回流明显...', 
    direction: 'LONG', 
    duration: 'Medium-term (3-6 months)', 
    strategy: 'Digital Advertising Recovery',
    timeAgo: '6 hours ago',
    timestamp: 1701406000000,
    isNew: true,
    fullContent: `
## 策略概述

YouTube作为全球第二大数字广告平台，正经历广告市场复苏周期。Shorts的商业化突破为增长提供了新引擎。

## 核心投资逻辑

### 广告需求端
- 品牌广告主预算回流（CPG、汽车、零售类别显著增长）
- 中小企业广告支出环比增长18%
- 政治广告季（2024 Q4）贡献额外$15-20亿增量

### 产品端创新
- **Shorts商业化**：日均播放量700亿次，CPM从$2提升至$8
- **Connected TV**：CTV观看时长同比+75%，客厅场景广告溢价明显
- **AI生成内容**：Dream Screen等工具降低创作门槛，内容供给增长30%

### 竞争格局
- TikTok面临监管不确定性，部分预算转移至YouTube
- Meta Reels虽强劲，但YouTube在长视频+短视频组合拳更具优势

## 财务预测

**营收预测**：
- FY2024 YouTube广告营收：$325-335亿（同比+10-13%）
- Shorts贡献：$40-45亿（占比12-13%）

**利润率**：
- Shorts商业化提升整体利润率1.5-2个百分点
- 预计YouTube分部营业利润率达35%+

## 投资建议

**入场时机**: 当前$317-320区间（技术面筑底确认）
**目标价位**: 
- 第一目标：$350（重估YouTube价值）
- 第二目标：$380-400（若Q4财报超预期）

**止损位**: $300（破位则广告复苏逻辑受挫）
**预期收益**: +15-25%
**风险等级**: 中等
**持仓周期**: 3-6个月

## 关键风险

- 宏观经济衰退导致广告预算削减
- TikTok禁令未落地，竞争压力持续
- Shorts商业化进度低于预期
    `
  },
  { 
    id: 10, 
    symbol: 'GOOGL', 
    grade: 'B+', 
    title: '搜索业务防御战：AI Overview推动用户粘性', 
    description: 'Google Search集成AI Overview功能后，用户搜索满意度提升12%，平均会话时长增加8%。虽然OpenAI的ChatGPT Search带来竞争压力，但Google的搜索市场份额仍稳定在91.5%...', 
    direction: 'LONG', 
    duration: 'Long-term (6-12 months)', 
    strategy: 'Core Business Defense',
    timeAgo: '1 day ago',
    timestamp: 1701340000000,
    isNew: false,
    fullContent: `
## 市场担忧：生成式AI会颠覆搜索业务吗？

**当前市场预期**：部分投资者担心ChatGPT Search、Perplexity等AI搜索工具会蚕食Google核心搜索市场份额，导致广告营收下滑。

**我们的观点**：短期影响有限，长期Google仍占据主导地位。

## 防御性优势分析

### 1. 用户行为惯性
- Google搜索日均查询量超85亿次，用户习惯难以在短期内改变
- Chrome浏览器 + Android生态锁定效应
- 移动端搜索份额高达95%，竞争对手难以撼动

### 2. AI Overview差异化
- **整合优势**：AI摘要 + 传统搜索结果 + 商业广告三位一体
- **数据护城河**：20年搜索数据积累，理解用户意图的能力无可比拟
- **速度优势**：响应时间<300ms，远快于ChatGPT Search的3-5秒

### 3. 商业化能力
- AI Overview中嵌入Sponsored结果，CPM不降反升
- Shopping搜索整合，电商广告收入增长迅猛
- Local Search + Maps广告，本地商家预算稳定增长

## 竞争对手分析

**ChatGPT Search**：
- 优势：对话式体验，深度问题解答
- 劣势：速度慢、无广告模式（盈利难）、数据新鲜度不足

**Perplexity**：
- 市场份额<0.5%，对Google影响微乎其微

## 财务影响

**搜索广告营收预测**：
- FY2024：$1750-1800亿（同比+7-9%）
- AI Overview渗透率达40%，但不影响广告点击率（CTR维持在1.9%）

**关键指标**：
- 搜索查询量增长：+5%（AI驱动更多探索性搜索）
- 广告加载率：维持稳定（每次搜索平均3.2个广告）
- CPC价格：+3-5%（AI筛选提高广告相关性，提升出价意愿）

## 投资建议

**投资逻辑**: 核心现金牛业务稳健，AI升级强化而非削弱竞争力
**建仓策略**: 
- 长期投资者可在$310-330区间分批建仓
- 配合YouTube、Cloud等成长业务，形成攻守兼备组合

**目标价位**: $370-400（基于25x P/E）
**止损位**: $295（破位则反垄断或AI替代风险加速）
**预期收益**: +18-25%
**风险等级**: 低-中
**持仓周期**: 6-12个月

## 催化剂

- **2024 Q4财报**（2025年1月）：验证AI Overview对搜索营收的正面影响
- **反垄断案进展**：若和解条件温和，将消除最大不确定性
- **Gemini 2.0发布**：进一步拉开与OpenAI的技术差距

## 风险提示

- 美国司法部反垄断判决可能要求拆分搜索业务
- 欧盟DMA法案限制预装搜索引擎，影响移动端份额
- 用户行为加速向AI助手迁移（尾部风险）
    `
  },
  { 
    id: 11, 
    symbol: 'GOOGL', 
    grade: 'A', 
    title: 'Waymo Robotaxi商业化提速，开辟万亿新市场', 
    description: 'Waymo Q3完成超100万次付费乘车，环比增长30%。洛杉矶、奥斯汀等新城市扩张顺利，运营车辆突破700辆。与Uber合作深化，将Waymo接入Uber平台，用户触达能力大幅提升...', 
    direction: 'LONG', 
    duration: 'Long-term (12-24 months)', 
    strategy: 'Emerging Tech Moonshot',
    timeAgo: '2 days ago',
    timestamp: 1701253000000,
    isNew: false,
    fullContent: `
## 投资主题：押注自动驾驶的"iPhone时刻"

Waymo是全球唯一实现大规模商业化运营的L4级自动驾驶公司，正处于从0到1的临界点。

## 商业化进展

### 运营数据
- **日均订单量**：洛杉矶地区1.2万单，旧金山1.8万单
- **用户增长**：注册用户突破50万，月活用户15万+
- **车队规模**：运营车辆700+，2024年底目标1000辆

### 单位经济模型
- **客单价**：$15-25（与Uber X持平）
- **成本结构**：车辆折旧$8 + 运营$5 + 保险$2 = $15/单
- **盈亏平衡**：当前略亏损，预计2025 H2实现单车盈利

### 扩张路径
- **已运营**：旧金山、洛杉矶、凤凰城
- **筹备中**：奥斯汀、亚特兰大、迈阿密
- **国际化**：日本东京试点，2025年启动

## 战略价值

### 1. 新增长曲线
- **TAM预测**：全球出行市场$5万亿，Robotaxi可占20-30%
- **Waymo目标**：2030年营收$500亿+（当前几乎为0）

### 2. 技术溢出
- Waymo技术可授权给车厂，类似ARM模式
- 自动驾驶芯片、传感器、软件栈均可商业化

### 3. 生态协同
- 与Google Maps深度整合，导流能力强
- YouTube、Android Auto等场景嵌入，广告变现想象空间大

## 估值重估逻辑

**当前市值拆分**：
- Google核心（搜索+YouTube）：$1.2万亿
- Google Cloud：$2500亿
- Waymo：$300-450亿（投资者未充分定价）
- 其他（DeepMind等）：$500亿

**Waymo公允价值**：
- 参考Cruise（被GM收购前估值$300亿）、Aurora（$130亿）
- Waymo技术领先2-3年，合理估值$600-800亿
- 对应GOOGL股价提升$30-40/股（+10-12%）

## 投资建议

**投资逻辑**: 长期期权价值，短期Waymo进展可能成为股价催化剂
**配置建议**: 
- 作为长期持仓的"彩蛋"，占组合5-10%
- 不宜单独作为主要买入理由，需结合核心业务

**催化剂**：
- **2024 Q4财报**：首次披露Waymo详细财务数据
- **政策支持**：加州、得州放宽自动驾驶监管
- **分拆上市传闻**：若Waymo独立IPO，估值有望达$1000亿+

**风险等级**: 高（技术、监管、竞争多重不确定性）
**持仓周期**: 2-3年

## 风险提示

- 技术瓶颈：极端天气、复杂路况处理能力仍待提升
- 监管风险：事故责任、隐私保护等法规尚不明确
- 竞争加剧：特斯拉FSD、百度Apollo等追赶
    `
  },
  { 
    id: 2, 
    symbol: 'JNJ', 
    grade: 'B', 
    title: '强生防御性轮动与超买回调布局', 
    description: '第一幕: 市场目前因宏观避险情绪升温及Q3财报强劲 (营收$24B, EPS $2.80)，将JNJ推升至历史高位$207附近。分析师纷纷上调目标价至$215-$230，散户情绪高涨。第二幕: 然而...', 
    direction: 'WAIT', 
    duration: 'Medium-term (1-3 months)', 
    strategy: 'Defensive Rotation',
    timeAgo: '5 hours ago',
    timestamp: 1701410000000,
    isNew: true,
    fullContent: `
## 策略概述

强生作为医疗保健龙头，在市场避险情绪下表现强势，但短期存在超买风险，建议观望等待更好入场时机。

## 关键信号

- RSI指标达到72，进入超买区间
- 机构持仓占比83%，创历史新高
- Q3财报超预期，但Q4指引相对保守

## 投资建议

**观望理由**: 当前估值偏高，等待回调
**目标入场**: $195-200
**长期目标**: $230+
**风险等级**: 低
    `
  },
  { 
    id: 3, 
    symbol: 'NVDA', 
    grade: 'A+', 
    title: 'NVIDIA Blackwell架构引领AI算力革命', 
    description: '第一幕: Blackwell架构GPU正式发布，性能较上一代提升5倍，引发市场强烈关注。第二幕: 超大规模数据中心客户（Meta、Microsoft、Amazon）已确认大额订单，2024 H2出货量预计突破100万片。第三幕: 供应链紧张局势持续，CoWoS先进封装产能成为瓶颈...', 
    direction: 'LONG', 
    duration: 'Medium to Long-term (3-12 months)', 
    strategy: 'AI Revolution',
    timeAgo: '30 minutes ago',
    timestamp: 1701428000000,
    isNew: true,
    fullContent: `
## WDC深度价值修复与会议催化

### 市场叙事：被遗忘的存储龙头即将逆袭

市场当前预期：抗跌保守派低估了HDD在数据中心的不可替代性（NVMe盘按容量仍是WDC的10倍价格）。机构仓位仅65%，远低于美光的82%，WDC被显著低配。

### 第一幕：价格筑底确认，准备启动

**技术信号**：
- 12月2日的日线投资者会议将揭晓公司未来18个月战略，历史上该事件后90天股价平均上涨17%
- $157.30扛本周末摆荡密集区，MACD即将金叉，RSI 45处于健康区间
- PEG 0.17的估值洼地（美光1.2，希捷0.8）显示市场严重低估成长性

### 第二幕：基本面催化剂正在集结

**近期关键信号**：
- 12月2日的投资者会议将揭晓AI数据中心策略，若披露Meta/微软大单将直接点燃行情
- $157.30扛本周末摆荡密集区，一旦站稳可能快速填补至$164区间缺口
- PEG 0.17显示市场严重低估其盈利能力修复潜力（ROE预计从**29.7%**的ROE表明其资本回报已恢复至行业顶尖水平，且远次，技术面发出了强烈的反转信号，且因上的"粽子"在经过12月2日**（UBS）和TD Cowen上调评级**，市场尚未完全定价这些催化剂的叠加效应，这往往形成Nasqdaq的资金轮动窗口。我们预计这些催化剂将触动算法买盘，向**$173.00**的公允价值回归。

## Key Signals

📌 12月2日的日投资者会议将揭晓供货现状引发关注
📌 $157.30扛本周支撑位（维持金融点）能够有效守住
📌 PEG 0.17的估值洼地表明盈利能力被低估金流

### 投资建议

**入场策略**: 
- 主仓建议：$157-164区间分批布局
- 激进型：突破$164后追涨（止损$157）

**目标价位**:
- 第一目标：$173（会议催化）
- 第二目标：$185-190（季度财报验证）

**止损位**: $150（跌破长期支撑）

**预期收益**: 
- 保守估计：+12-15%（至$173）
- 乐观估计：+22-28%（至$185+）

**风险等级**: 中等

**持仓周期**: 1-3个月

### 风险提示

- 宏观衰退担忧可能导致企业IT支出下降
- 中国市场需求疲软风险
- 竞争对手希捷的价格战策略
    `
  },
  { 
    id: 7, 
    symbol: 'NVDA', 
    grade: 'A', 
    title: 'AI算力需求爆发，Blackwell订单饱和', 
    description: '英伟达新一代Blackwell GPU订单已排至2025 Q2，超大规模云厂商争夺产能。数据中心业务Q4营收预计突破180亿美元，同比增长超200%。供应链紧张持续，CoWoS封装产能成为核心瓶颈...', 
    direction: 'LONG', 
    duration: 'Short-term (4-8 weeks)', 
    strategy: 'Supply-Demand Imbalance',
    timeAgo: '45 minutes ago',
    timestamp: 1701427000000,
    isNew: true,
    fullContent: `
## 策略概述

Blackwell架构GPU供不应求，云计算巨头竞相锁定产能，NVDA议价能力强，毛利率有望维持在75%以上的历史高位。

## 投资亮点

### 供给端
- CoWoS产能利用率超95%
- 台积电优先分配3nm/5nm产能给NVDA
- 良率提升至92%，高于预期

### 需求端
- Meta订单超35万片GPU（价值超$100亿）
- Microsoft Azure扩容计划加速
- OpenAI GPT-5训练需求迫切

## 投资建议

**入场点位**: $880-920（当前）
**目标价位**: $1050-1100
**止损位**: $820
**预期收益**: +15-20%
**风险等级**: 中等
**持仓周期**: 1-2月

## 风险提示
- 出口管制政策收紧风险
- AMD MI300竞争压力
- 宏观经济衰退风险
    `
  },
  { 
    id: 8, 
    symbol: 'NVDA', 
    grade: 'B', 
    title: '汽车芯片业务复苏，自动驾驶新增长点', 
    description: '英伟达汽车业务Q3营收达$2.61亿，环比增长15%。DRIVE Thor芯片获得多家车厂定点，预计2025年开始量产。开源自动驾驶模型Alpamayo-R1发布，加速L4级自动驾驶生态建设...', 
    direction: 'LONG', 
    duration: 'Long-term (6-18 months)', 
    strategy: 'Diversification Play',
    timeAgo: '3 hours ago',
    timestamp: 1701415000000,
    isNew: false,
    fullContent: `
## 策略背景

英伟达正在从纯GPU供应商转型为端到端AI平台提供商，汽车业务是重要的战略拓展方向。

## 关键驱动因素

### 产品端
- DRIVE Thor算力达2000 TOPS，领先竞争对手
- 支持多传感器融合（摄像头+激光雷达+毫米波雷达）
- 软件栈完整度高，降低车厂开发成本

### 客户端
- 已获得比亚迪、理想、小鹏等定点
- 奔驰、Jaguar Land Rover长期合作
- Robotaxi公司Cruise、Waymo持续采购

### 生态端
- 开源Alpamayo-R1模型吸引开发者
- NVIDIA DRIVE Sim仿真平台用户超10万
- 与Arm合作优化车规芯片架构

## 投资建议

**投资逻辑**: 长期成长故事，短期弹性有限
**配置建议**: 作为核心仓位的补充（10-15%）
**目标收益**: 2年内汽车业务贡献5-8%营收
**风险等级**: 中低

## 风险提示
- 自动驾驶监管政策不确定性
- 车厂自研芯片替代风险（特斯拉FSD案例）
- 汽车行业周期性波动
    `
  }
]

// --- Mock Data: Events ---
const events = [
  {
    id: 1,
    time: '09:30',
    fullTime: '2025-12-02 09:30:00',
    title: 'Google Cloud Q4营收指引上调，AI工作负载驱动35%增长',
    sentiment: 'Bullish',
    group: 'Today',
    summary: 'Google Cloud在最新投资者会议上将Q4营收指引从$110亿上调至$115亿，主要由AI和机器学习工作负载需求激增驱动。管理层强调Gemini API的企业采用率环比增长50%，Vertex AI平台客户数突破10万家。',
    impactAnalysis: 'Cloud业务是Google增长最快的板块，35% YoY的增长率远超AWS（12%）和Azure（27%）。作用机制：①企业AI应用落地加速，Gemini API成为主要营收贡献点；②GCP在AI基础设施上的技术优势（TPU v5p）降低成本，提升利润率；③大客户（如Spotify、Snapchat）扩大使用规模。财务路径：Cloud业务2024全年预计贡献$420-450亿营收，虽仍处于微亏状态，但营业利润率正从-8%改善至-2%，预计2025年实现盈亏平衡。战略定位：云计算是Google"第二增长引擎"，此次指引上调证明AI浪潮带来的结构性需求增长，而非周期性波动。',
    expectationAnalysis: '影响性质：基本面显著改善，支撑中长期估值重估。短期（1-4周）：市场将重新定价Cloud板块价值，按照AWS同类业务15x P/S估值，GCP合理估值应提升$200-300亿，对应股价+$15-20。中期（3-6月）：关注Q4财报（2025年1月底）是否兑现指引，以及2025年全年Cloud业务盈利能力拐点。若营业利润率转正，将触发板块估值重估。长期（6-12月）：Cloud业务若保持30%+增速且利润率达到5-8%，可支撑GOOGL整体估值提升至28-30x P/E（当前25x）。',
    backtestAnalysis: '历史数据显示，Google Cloud业务指引上调事件对股价影响显著且持久。2023年Q2类似事件后，股价在10天内上涨8.3%，且涨幅在60天内扩大至15.7%。2024年Q1指引上调后，股价在5天内上涨6.5%。概率分析：指引上调后未来30天上涨概率达82%，平均涨幅+9.2%。回撤风险：下行风险有限，最大回撤历史均值-3.1%。'
  },
  {
    id: 2,
    time: '14:20',
    fullTime: '2025-12-02 14:20:00',
    title: 'Gemini 2.0 Flash发布，多模态推理能力超越GPT-4 Turbo',
    sentiment: 'Bullish',
    group: 'Today',
    summary: 'Google DeepMind正式发布Gemini 2.0 Flash模型，在多模态理解、代码生成、数学推理等10项基准测试中全面超越OpenAI GPT-4 Turbo。新模型推理速度提升40%，成本降低60%，支持200万token上下文窗口。',
    impactAnalysis: 'Gemini 2.0的发布是Google在AI军备竞赛中的关键里程碑，直接挑战OpenAI的技术领导地位。作用机制：①多模态能力（图像+文本+代码+视频）满足企业复杂场景需求；②成本优势使其在价格敏感型客户中更具竞争力；③200万token上下文窗口是GPT-4 Turbo（128k）的15倍，适合处理大型文档和代码库。财务路径：Gemini API调用量预计在Q1环比再增80-100%，贡献Cloud业务$8-12亿增量营收。战略定位：技术对等甚至领先OpenAI，消除市场对Google"AI落后者"的担忧，为搜索、YouTube、Cloud等产品AI升级提供统一底座。',
    expectationAnalysis: '影响性质：技术突破+商业化加速，双重利好。短期（1-2周）：科技媒体和分析师报告将密集覆盖，提升市场对Google AI能力的认知。技术面可能突破$320-325压力区。中期（1-3月）：观察企业客户迁移情况，若AWS/Azure客户转向GCP，将触发"云迁移交易"（Cloud Migration Trade）。长期（6-12月）：Gemini生态成熟度是关键，需验证开发者工具链、第三方集成、企业级SLA等配套能力。若成功，Google可夺回AI应用层部分市场份额。',
    backtestAnalysis: '重大产品发布对Google股价的历史影响呈现"先涨后稳"模式。Gemini 1.0发布（2023年12月）后，股价3天内上涨5.2%，但1个月后涨幅收窄至2.1%，主要因产品实际表现不及宣传。Bard发布（2023年2月）甚至引发-7.4%暴跌，因演示出现错误。风险提示：市场将严格审视Gemini 2.0的实际性能，任何基准测试争议或应用案例不及预期都可能引发抛售。'
  },
  {
    id: 3,
    time: '08:15',
    fullTime: '2025-12-02 08:15:00',
    title: 'YouTube Shorts日播放量突破700亿次，CPM价格提升至长视频60%',
    sentiment: 'Bullish',
    group: 'Today',
    summary: 'YouTube CEO Neal Mohan在Code Conference透露，Shorts日均播放量已达700亿次，商业化进度超预期。广告主CPM价格从2023年的$2提升至当前$7-8，接近长视频CPM（$12-15）的60%。',
    impactAnalysis: 'Shorts商业化是YouTube营收增长的新引擎，直接对冲TikTok竞争压力。作用机制：①700亿日播放量转化为广告库存，按$7.5 CPM计算，年化广告收入$190亿（实际分成后约$120亿）；②CPM提升反映广告主认可度提高，验证了短视频广告效果；③Shorts与长视频协同（用户从Shorts导流至长视频），提升整体平台价值。财务路径：Shorts预计2024全年贡献$40-45亿营收（占YouTube总营收12-13%），2025年有望突破$70亿。战略定位：成功复制TikTok模式并实现盈利，证明YouTube平台韧性。',
    expectationAnalysis: '影响性质：业务拐点确认，支撑YouTube估值重估。短期（2-4周）：广告行业会议（如CES 2025）期间，品牌广告主可能增加YouTube预算，形成正反馈。中期（3-6月）：关注Q4财报披露的Shorts详细数据，若DAU（日活用户）和Engagement（互动率）持续增长，将验证长期增长逻辑。长期（1年+）：Shorts若能维持50%+ YoY增长，YouTube整体营收可在2026年突破$400亿，支撑其独立估值$3000-3500亿（当前市场隐含估值$2200亿）。',
    backtestAnalysis: 'YouTube业务相关利好对股价影响中等但持久。2023年Q3 YouTube广告营收意外增长12%后，股价在15天内上涨7.8%。2024年NFL Sunday Ticket订阅数超预期，股价5天内涨4.3%。平均而言，YouTube正面消息后30天上涨概率68%，平均涨幅+5.6%。'
  },
  {
    id: 4,
    time: '11:45',
    fullTime: '2025-12-01 11:45:00',
    title: 'DOJ提交最终补救方案：要求剥离Chrome浏览器并终止与苹果搜索协议',
    sentiment: 'Bearish',
    group: 'Yesterday',
    summary: '美国司法部在反垄断案中正式提交最终补救方案，要求Google剥离Chrome浏览器（全球市场份额65%）、终止与Apple的默认搜索引擎协议（年支付约$200亿）、并开放搜索索引数据给竞争对手。Google法务团队回应称方案"极端且不合理"，将提起上诉。',
    impactAnalysis: '这是Google面临的最大监管风险，潜在影响远超欧盟罚款。作用机制：①Chrome剥离将削弱搜索分发能力，用户可能转向Edge（Bing）或Safari（可能换默认引擎）；②失去Apple默认搜索位将直接损失15-20%搜索查询量，对应$250-300亿年营收（按$18 RPM计算）；③开放索引数据降低搜索护城河，但短期内竞争对手难以复制Google算法优势。财务路径：最坏情况下（Chrome剥离+Apple协议终止+数据开放），搜索营收可能下滑20-25%，对应EPS减少$8-12/股，按25x P/E估值，股价理论下行空间$200-300。战略定位：核心现金牛业务面临结构性威胁，但补救方案执行需2-3年上诉期，期间业务正常运营。',
    expectationAnalysis: '影响性质：长期负面，但短期因执行不确定性被部分消化。短期（1-3月）：市场已部分定价该风险（8月初判决后股价曾跌-8%），若无新进展，负面影响有限。关注12月中旬Google提交抗辩文件的措辞。中期（6-12月）：2025年H1法院将举行补救方案听证会，届时市场波动加剧。若法官采纳DOJ建议，股价可能再跌10-15%；若仅要求改变商业行为（如降低Apple付款），影响可控。长期（2-3年）：上诉到最高法院需2-3年，期间Google可继续运营。最终和解可能性高（参考微软2001年反垄断案），实际惩罚可能远轻于DOJ要求。',
    backtestAnalysis: '监管事件对Google股价的历史影响复杂。2023年8月反垄断判决（搜索垄断成立）后，股价初期跌-4.5%，但30天后因业绩强劲反弹+6.2%。欧盟2018年Android反垄断罚款$50亿后，股价1周跌-2.3%，但3个月后涨+11.5%。关键洞察：市场更关注实际财务影响而非法律判决本身，只要核心业务增长不受阻，监管风险溢价会逐步消化。'
  },
  {
    id: 5,
    time: '16:30',
    fullTime: '2025-12-01 16:30:00',
    title: 'Waymo宣布进军东京，国际化战略提速',
    sentiment: 'Bullish',
    group: 'Yesterday',
    summary: 'Waymo宣布与日本出租车巨头Nihon Kotsu合作，将于2025年Q3在东京启动Robotaxi试运营。这是Waymo首次进军美国以外市场，标志着自动驾驶商业化进入全球扩张阶段。',
    impactAnalysis: 'Waymo国际化是Google"Other Bets"（其他赌注）业务价值重估的催化剂。作用机制：①日本是全球第三大出行市场（TAM $800亿），且监管相对开放；②与本地龙头合作降低准入门槛，复制美国成功经验；③东京高密度城市特征适合Robotaxi运营，单车economics可能优于美国。财务路径：Waymo当前估值$300-450亿（非上市，基于二级市场交易），若东京试点成功，国际化潜力可支撑$600-800亿估值，对应GOOGL股价+$20-30。战略定位：Waymo是Google少有的"moonshot"项目接近盈利，国际化验证其可复制性，降低投资者对"烧钱黑洞"的担忧。',
    expectationAnalysis: '影响性质：长期期权价值，短期影响有限。短期（1-3月）：市场对Waymo关注度有限（营收占比<1%），除非管理层在财报会议上大力强调，否则股价反应平淡。中期（6-12月）：2025年Q3东京试运营数据是关键，若用户接受度高、安全记录良好，将引发"Waymo Re-rating"（重估）交易。长期（2-3年）：若Waymo在5个以上城市实现盈利，可能启动分拆上市（Spin-off IPO），类似通用汽车Cruise（估值曾达$300亿）。届时GOOGL股东将获得Waymo股票，形成价值显性化。',
    backtestAnalysis: 'Waymo相关消息对股价影响微弱但方向正面。2023年10月Waymo与Uber合作公告后，股价3天涨+1.8%。2024年6月洛杉矶扩张消息发布后，股价1周涨+2.1%。总体而言，Waymo进展对股价的边际贡献约+0.5-1.5%，主要因市场尚未充分定价其期权价值。'
  },
  {
    id: 6,
    time: '10:20',
    fullTime: '2025-11-30 10:20:00',
    title: '搜索市场份额小幅下滑至91.2%，AI搜索竞争初现压力',
    sentiment: 'Bearish',
    group: 'This Week',
    summary: 'StatCounter最新数据显示，Google搜索全球市场份额从9月的91.6%降至11月的91.2%，主要流失至Bing（从3.2%升至3.7%）和其他AI搜索工具（如Perplexity）。移动端份额相对稳定（94.8%），但桌面端降至89.5%。',
    impactAnalysis: '搜索市场份额是Google核心护城河的晴雨表，任何下滑都会引发投资者担忧。作用机制：①Bing集成ChatGPT后在"深度搜索"场景吸引部分用户；②Perplexity、You.com等AI原生搜索工具在科技从业者中渗透率提升；③年轻用户（18-24岁）越来越多使用TikTok、Instagram作为"搜索入口"。财务路径：0.4%市场份额流失对应约$7-10亿年营收（搜索总营收$1800亿），短期影响有限，但若趋势持续，2025年可能累计流失1-2%份额，对应$20-40亿营收风险。战略定位：虽然AI Overview已推出，但用户迁移成本低（切换搜索引擎只需1秒），护城河并非不可突破。',
    expectationAnalysis: '影响性质：早期预警信号，尚未构成基本面威胁。短期（1-2月）：市场可能过度反应，做空者会炒作"搜索流失"叙事。但91.2%份额仍是绝对垄断地位，且AI Overview尚未全量推出（当前覆盖率约40%）。中期（3-6月）：Q4财报（2025年1月）的搜索查询量增长率是关键验证指标。若查询量仍保持+5% YoY，则份额下滑不影响营收增长（可能是低价值查询流失）。长期（1-2年）：真正威胁是用户行为范式转变（从"搜索"到"对话助手"），但这需5-10年时间。短期内Google仍有足够时间调整策略。',
    backtestAnalysis: '市场份额数据对股价的影响取决于媒体报道强度。2023年6月StatCounter首次报告市场份额跌破92%时，股价1周跌-3.2%。但当Q3财报显示搜索营收仍增长8%后，股价反弹+5.7%。关键洞察：投资者最终关注绝对营收增长而非相对份额，只要定价权（CPC）提升能抵消查询量下滑，影响有限。'
  },
  {
    id: 7,
    time: '14:55',
    fullTime: '2025-11-29 14:55:00',
    title: 'Google推出AI Overviews全量版，搜索体验重大升级',
    sentiment: 'Bullish',
    group: 'This Week',
    summary: 'Google正式在全球120个国家推出AI Overviews全量版，所有搜索查询都将展示AI生成摘要。新版本增加了"Deep Research"深度研究模式、多步骤推理、实时数据整合等功能。',
    impactAnalysis: 'AI Overviews是Google搜索20年来最大产品升级，旨在抵御ChatGPT Search等竞争。作用机制：①AI摘要提升用户满意度，平均会话时长增加8%；②"Deep Research"模式针对复杂查询（如学术研究、商业分析），创造新的用户场景；③实时数据整合（天气、股价、航班）强化实用性。财务路径：初期可能因用户停留在AI摘要而减少广告点击（CTR可能下降5-10%），但长期通过提升查询量和用户粘性实现增长。Google内部测试显示，AI Overviews用户的搜索频次增加12%。战略定位：防御性升级，确保搜索体验不输给AI原生产品，维护$1800亿搜索营收基本盘。',
    expectationAnalysis: '影响性质：战略防御成功，但短期财务影响不确定。短期（1-3月）：市场将密切关注用户反馈和广告主意见。若CTR显著下滑，股价可能承压；若查询量增长抵消CTR下降，则影响中性偏正。中期（6-12月）：Q1和Q2财报的搜索营收增速是验证指标。管理层指引"AI Overviews对营收影响中性至微正"，但需实际数据确认。长期（1-2年）：成功整合AI能力可延长搜索生命周期5-10年，失败则可能加速用户向纯AI助手迁移。关键在于广告货币化能力（在AI摘要中嵌入Sponsored内容）。',
    backtestAnalysis: '重大产品升级对Google股价的影响历史上呈现"先跌后涨"模式。2023年5月SGE（Search Generative Experience）测试版推出后，股价因广告货币化担忧跌-5.8%，但3个月后因用户数据良好反弹+9.3%。关键在于管理层沟通：若在财报会议上明确"AI Overviews不影响广告收入"，市场信心会迅速恢复。'
  },
  {
    id: 8,
    time: '09:10',
    fullTime: '2025-11-28 09:10:00',
    title: 'Q3财报超预期，营收$883亿同比增长11%，云业务首次季度盈利',
    sentiment: 'Bullish',
    group: 'This Week',
    summary: 'Google Q3财报全面超预期：总营收$883亿（预期$862亿），EPS $2.12（预期$1.85），Google Cloud营收$113亿且实现首次季度盈利（营业利润$2.66亿）。搜索广告、YouTube广告、Cloud三大板块全线增长。',
    impactAnalysis: 'Q3财报是Google"AI商业化元年"的成绩单，验证了AI投资的回报。作用机制：①搜索广告营收$491亿（+12% YoY），证明AI Overview未伤害广告收入；②YouTube广告$79.5亿（+12.5% YoY），扭转连续两季度下滑；③Cloud首次盈利是里程碑，验证规模效应和AI工作负载的高利润率。财务路径：全年营收预计$3420-3450亿（+10-11% YoY），净利润$900-950亿，对应EPS约$7.20-7.60。按25x P/E估值，公允股价$180-190。战略定位：三大业务引擎协同增长，打消市场对"单一依赖搜索"的担忧，估值折扣应收窄。',
    expectationAnalysis: '影响性质：基本面全面验证，支撑股价上行。短期（1-2周）：财报发布后股价通常上涨3-7%（若超预期），期权市场隐含波动率8.5%。技术面可能突破$325阻力位，下一目标$340-350。中期（3-6月）：Cloud业务盈利能力是持续关注焦点，若Q4和2025 Q1继续盈利且利润率提升，可触发"Cloud Re-rating"交易，目标价上调至$200+。长期（1年）：若2025年保持10%+营收增长且AI业务（Cloud+Gemini API）贡献占比提升至30%，估值有望向Microsoft（30x P/E）靠拢，目标价$220-240。',
    backtestAnalysis: 'Google财报超预期后的股价表现历史上非常稳定。过去8个季度中，6次超预期后平均3天涨+4.8%，30天涨+8.3%。2023年Q1财报超预期后股价涨+6.9%，2024年Q2财报超预期后涨+5.2%。概率分析：财报超预期后未来10天上涨概率83%，平均涨幅+4.5%。'
  },
  {
    id: 9,
    time: '15:40',
    fullTime: '2025-11-27 15:40:00',
    title: 'Pixel 9系列销量突破1200万台，硬件业务增长提速',
    sentiment: 'Neutral',
    group: 'This Week',
    summary: 'Google Pixel 9系列智能手机全球销量突破1200万台，同比增长35%。其中Pixel 9 Pro Fold折叠屏手机在美国市场份额达8%，仅次于三星。Tensor G4芯片的AI功能（如实时通话翻译、照片魔法橡皮擦）广受好评。',
    impactAnalysis: 'Pixel硬件业务虽然营收占比小（约3-4%），但战略意义重大。作用机制：①Pixel是Gemini AI的最佳展示窗口，驱动消费者AI应用采用；②硬件数据（用户行为、语音、图像）反哺AI模型训练；③Pixel生态（手机+手表+耳机+平板）增强用户粘性。财务路径：Pixel 2024全年销量预计4000万台（平均售价$600），对应营收$240亿，贡献净利润约$15-20亿（利润率6-8%）。虽然绝对值小，但35%的增速高于智能手机市场平均（-2%）。战略定位：硬件是Google从"软件公司"向"全栈科技公司"转型的重要一环，参考Apple的硬件+软件+服务闭环模式。',
    expectationAnalysis: '影响性质：正面但边际贡献小，短期对股价影响有限。短期（1-2月）：Pixel销量数据通常不会单独影响股价，除非在财报会议上被管理层重点提及。中期（6-12月）：若Pixel市场份额持续提升至10%+（当前7-8%），可能引发"硬件业务重估"，但仍是次要驱动因素。长期（2-3年）：Pixel若能复制AirPods的成功（高利润率配件生态），可贡献$50-80亿年利润，对应股价+$15-25。但执行难度大，需验证。',
    backtestAnalysis: 'Pixel销量数据对股价影响微弱。2023年Pixel 8发布后股价1周涨+1.2%，2024年Pixel 9发布后涨+0.8%。总体而言，硬件消息的股价弹性<2%，远低于Cloud或Search相关消息（5-10%）。'
  },
  {
    id: 10,
    time: '11:30',
    fullTime: '2025-11-26 11:30:00',
    title: 'DeepMind AlphaFold 3商业化启动，蛋白质预测平台向药企开放',
    sentiment: 'Bullish',
    group: 'This Week',
    summary: 'Google DeepMind宣布AlphaFold 3蛋白质结构预测平台正式商业化，已与辉瑞、诺华、罗氏等10家头部药企签订合作协议。平台订阅费$500万/年，同时提供按项目收费模式（$50万/蛋白质）。',
    impactAnalysis: 'AlphaFold商业化是Google"AI变现"的创新路径，展示了基础科研向商业价值的转化能力。作用机制：①蛋白质结构预测加速新药研发，传统方法需3-5年，AlphaFold缩短至数周；②药企愿意为此支付高额费用（ROI极高）；③建立Google在生命科学AI领域的领导地位。财务路径：假设签约50家药企（全球大药企约200家），年订阅费$2.5亿+按项目费用$1-2亿，总计$3.5-4.5亿营收。虽然绝对值小，但毛利率极高（>80%），且展示了AI货币化的多样性。战略定位：Google不再仅依赖广告和云计算，开始探索垂直行业AI SaaS模式（类似Palantir），打开新的增长空间。',
    expectationAnalysis: '影响性质：长期战略价值高，短期财务贡献小。短期（1-3月）：AlphaFold消息属于"好故事"但非"大钱"，市场反应平淡。除非分析师在研报中大力宣传，否则股价弹性<1%。中期（1-2年）：若AlphaFold签约药企超100家且拓展至农业（蛋白质工程）、材料科学等领域，年营收可达$10-15亿，成为"Other Bets"中的明星项目。长期（3-5年）：生命科学AI市场TAM达$500亿+，若Google占据20%份额，可贡献$100亿营收（利润率40%），对应股价+$15-20。',
    backtestAnalysis: 'DeepMind相关消息对股价影响极小。2020年AlphaFold 2发布（《自然》封面）后股价1周涨+0.5%，2023年AlphaFold数据库开放后涨+0.3%。市场对"科研突破"兴趣有限，更关注"商业变现"，AlphaFold商业化可能改变这一局面。'
  }
]

// --- Helpers ---
const getSentimentColor = (sentiment) => {
  if (sentiment === 'Bullish') return 'bg-green-500'
  if (sentiment === 'Bearish') return 'bg-red-500'
  return 'bg-gray-500'
}

const getSentimentBadgeClass = (sentiment) => {
  if (sentiment === 'Bullish') return 'bg-green-900/30 text-green-400 border-green-900/50'
  if (sentiment === 'Bearish') return 'bg-red-900/30 text-red-400 border-red-900/50'
  return 'bg-gray-700/30 text-gray-400 border-gray-700/50'
}

const getSentimentIcon = (sentiment) => {
  if (sentiment === 'Bullish') return '↑'
  if (sentiment === 'Bearish') return '↓'
  return '-'
}

// --- Computed ---
const filteredEvents = computed(() => {
  if (activeFilter.value === 'All') return events
  return events.filter(e => e.sentiment === activeFilter.value)
})

const groupedEvents = computed(() => {
  const groups = {}
  filteredEvents.value.forEach(event => {
    if (!groups[event.group]) {
      groups[event.group] = []
    }
    groups[event.group].push(event)
  })
  return groups
})

// --- Methods ---
const openDetail = (event) => {
  selectedEvent.value = event
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// --- Computed: Related Strategies ---
const relatedStrategies = computed(() => {
  return allStrategies.filter(s => s.symbol === symbol.value)
})

// --- Computed: Related Themes (筛选包含当前股票的主题) ---
const relatedThemes = computed(() => {
  return allThemesData.value.filter(theme => theme.stocks.includes(symbol.value))
})

// --- Methods: Theme Expansion & Navigation ---
const toggleThemeExpand = (theme) => {
  theme.isExpanded = !theme.isExpanded
}

const toggleThemeFollow = (theme) => {
  theme.isFollowed = !theme.isFollowed
}

const goToStockDetail = (stockSymbol) => {
  router.push({ 
    name: 'StockAttributionDetail', 
    params: { id: stockSymbol },
    query: { tab: 'price' }
  })
}

// --- Methods: Strategy Modal ---
const openStrategyDetail = (strategy) => {
  selectedStrategy.value = strategy
  showStrategyModal.value = true
}

const closeStrategyModal = () => {
  showStrategyModal.value = false
}

const navigateToGenerateStrategy = (stockSymbol) => {
  // 跳转到策略生成页面，并携带股票代码参数
  router.push({
    path: '/opportunity',
    query: { symbol: stockSymbol }
  })
}

onMounted(() => {
  // Handle Tab switching
  if (route.query.tab === 'strategies') {
    activeTab.value = 'strategies'
    
    // Highlight strategy if strategyId is provided (NO auto-open modal)
    const strategyId = route.query.strategyId
    if (strategyId) {
      highlightedStrategyId.value = parseInt(strategyId)
      
      // Scroll to highlighted strategy after DOM is ready
      setTimeout(() => {
        if (highlightedStrategyRef.value) {
          highlightedStrategyRef.value.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 500)
    }
  } else if (route.query.tab === 'price') {
    activeTab.value = 'price'
  } else {
    activeTab.value = 'attribution'
  }

  // In a real app, fetch data based on route.params.id
  console.log('Fetching data for', symbol.value)
})
</script>
