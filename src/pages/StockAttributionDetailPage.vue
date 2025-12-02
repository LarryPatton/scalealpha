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
      <div class="grid grid-cols-4 border-b border-[#333] mb-8">
        <button 
          @click="activeTab = 'price'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'price' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          价格走势 (Price Trend)
        </button>
        <button 
          @click="activeTab = 'attribution'"
          class="px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap text-center"
          :class="activeTab === 'attribution' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'"
        >
          个股归因 (Attribution)
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
          <div class="text-xs text-gray-500">
            数据与官方推荐同步
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
          <div class="text-4xl mb-4">🧩</div>
          <h3 class="text-xl font-bold text-white mb-2">暂无相关策略</h3>
          <p class="text-gray-500">该股票当前没有推荐策略</p>
        </div>
      </div>

      <!-- Plan Tab -->
      <div v-if="activeTab === 'plan'" class="animate-fade-in">
        <div class="mb-6">
          <h3 class="text-lg font-bold text-white mb-2">📊 {{ symbol }} 交易计划制定</h3>
          <p class="text-sm text-gray-500">基于AI推荐与个人策略的综合交易计划</p>
        </div>

        <!-- Plan Items -->
        <div class="space-y-4">
          <!-- Plan Item 1 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                1
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2 flex items-center gap-2">
                  🎯 建仓策略
                  <span class="text-xs px-2 py-0.5 bg-green-900/30 text-green-400 border border-green-900/50 rounded">推荐</span>
                </h4>
                <p class="text-sm text-gray-400 mb-3">
                  分批建仓策略：在 <span class="text-white font-medium">$172-178</span> 区间分3次建仓，每次买入总仓位的 <span class="text-white font-medium">33%</span>。首次建仓设置在 <span class="text-white font-medium">$176-178</span>，第二次在 <span class="text-white font-medium">$174-176</span>，第三次在 <span class="text-white font-medium">$172-174</span>。
                </p>
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    降低平均成本
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    风险控制
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 2 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                2
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">📈 目标价位设定</h4>
                <p class="text-sm text-gray-400 mb-3">
                  短期目标（1-2月）: <span class="text-green-400 font-medium">$195-200</span> (涨幅 +9-12%)<br>
                  中期目标（3-6月）: <span class="text-green-400 font-medium">$210-220</span> (涨幅 +18-23%)<br>
                  长期目标（6-12月）: <span class="text-green-400 font-medium">$230-240</span> (涨幅 +29-35%)
                </p>
                <div class="grid grid-cols-3 gap-2 text-xs">
                  <div class="bg-[#0f0f0f] border border-[#333] rounded p-2 text-center">
                    <div class="text-gray-500 mb-1">Q1 2025</div>
                    <div class="text-green-400 font-bold">$200</div>
                  </div>
                  <div class="bg-[#0f0f0f] border border-[#333] rounded p-2 text-center">
                    <div class="text-gray-500 mb-1">Q2 2025</div>
                    <div class="text-green-400 font-bold">$215</div>
                  </div>
                  <div class="bg-[#0f0f0f] border border-[#333] rounded p-2 text-center">
                    <div class="text-gray-500 mb-1">Q3-Q4 2025</div>
                    <div class="text-green-400 font-bold">$235</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 3 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                3
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2 flex items-center gap-2">
                  �️ 止损策略
                  <span class="text-xs px-2 py-0.5 bg-red-900/30 text-red-400 border border-red-900/50 rounded">关键</span>
                </h4>
                <p class="text-sm text-gray-400 mb-3">
                  硬止损位：<span class="text-red-400 font-medium">$165</span> (跌幅约 -7.5%)<br>
                  软止损位：<span class="text-yellow-400 font-medium">$170</span> (跌幅约 -4.5%)，观察3日K线确认趋势<br>
                  移动止损：价格每上涨 <span class="text-white font-medium">$10</span>，止损位相应上移 <span class="text-white font-medium">$5</span>，锁定利润
                </p>
                <div class="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-900/20 border border-yellow-900/50 rounded p-2">
                  <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  <span>纪律执行：触及止损位立即平仓，不抱有幻想</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 4 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                4
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">⚖️ 仓位管理</h4>
                <p class="text-sm text-gray-400 mb-3">
                  总仓位占比：不超过投资组合的 <span class="text-white font-medium">25%</span><br>
                  单次加仓：不超过总仓位的 <span class="text-white font-medium">30%</span><br>
                  减仓条件：达到短期目标价后，减仓 <span class="text-white font-medium">30-40%</span>，锁定部分利润，剩余仓位追求更高目标
                </p>
                <div class="bg-[#0f0f0f] border border-[#333] rounded p-3">
                  <div class="flex items-center justify-between text-xs mb-2">
                    <span class="text-gray-500">当前建议仓位</span>
                    <span class="text-white font-medium">20%</span>
                  </div>
                  <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500" style="width: 20%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 5 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                5
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">📅 关键时间节点</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-20 text-gray-500 text-xs">2025-01-30</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Q4 2024 财报发布</div>
                      <div class="text-gray-400 text-xs mt-1">预期 EPS: $1.85-1.92，营收: $89-91B</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-20 text-gray-500 text-xs">2025-02-15</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Gemini 2.0 完整版发布</div>
                      <div class="text-gray-400 text-xs mt-1">市场关注AI竞争力提升</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-20 text-gray-500 text-xs">2025-03-10</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">反垄断案二审判决</div>
                      <div class="text-gray-400 text-xs mt-1">监管风险评估关键节点</div>
                    </div>
                  </div>
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-20 text-gray-500 text-xs">2025-05-14</div>
                    <div class="flex-1">
                      <div class="text-white font-medium">Google I/O 开发者大会</div>
                      <div class="text-gray-400 text-xs mt-1">新产品和技术路线图披露</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 6 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                6
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">🔍 监控指标</h4>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div class="bg-[#0f0f0f] border border-[#333] rounded p-3">
                    <div class="text-gray-500 text-xs mb-1">技术指标</div>
                    <ul class="space-y-1 text-gray-400 text-xs">
                      <li>• RSI 保持在 40-70 区间</li>
                      <li>• MACD 金叉确认上升趋势</li>
                      <li>• 成交量放大配合突破</li>
                      <li>• 50日均线支撑位 $172</li>
                    </ul>
                  </div>
                  <div class="bg-[#0f0f0f] border border-[#333] rounded p-3">
                    <div class="text-gray-500 text-xs mb-1">基本面指标</div>
                    <ul class="space-y-1 text-gray-400 text-xs">
                      <li>• YouTube 广告营收增速</li>
                      <li>• Cloud 业务利润率</li>
                      <li>• AI 产品用户增长</li>
                      <li>• 自由现金流稳定性</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 7 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                7
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">⚠️ 风险提示与应对</h4>
                <div class="space-y-3 text-sm">
                  <div class="flex items-start gap-2">
                    <span class="text-red-400 flex-shrink-0">•</span>
                    <div>
                      <span class="text-white font-medium">反垄断风险：</span>
                      <span class="text-gray-400">若判决要求拆分，立即减仓至 10% 以下，评估影响后再决策</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-yellow-400 flex-shrink-0">•</span>
                    <div>
                      <span class="text-white font-medium">AI 竞争加剧：</span>
                      <span class="text-gray-400">关注 OpenAI、Anthropic 产品发布，若搜索份额下降超 2%，重新评估</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-yellow-400 flex-shrink-0">•</span>
                    <div>
                      <span class="text-white font-medium">广告市场衰退：</span>
                      <span class="text-gray-400">宏观经济恶化时，广告业务首当其冲，考虑对冲或减仓</span>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-blue-400 flex-shrink-0">•</span>
                    <div>
                      <span class="text-white font-medium">Cloud 业务低于预期：</span>
                      <span class="text-gray-400">若营收增速降至 20% 以下，下调目标价至 $190</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Plan Item 8 -->
          <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                8
              </div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">🎓 持仓复盘与优化</h4>
                <p class="text-sm text-gray-400 mb-3">
                  定期复盘频率：每 <span class="text-white font-medium">2周</span> 进行一次持仓回顾，每 <span class="text-white font-medium">季度</span> 完整评估策略有效性
                </p>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center gap-2 text-gray-400">
                    <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    记录每次买卖决策的逻辑和市场环境
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    对比实际表现与预期目标的偏差
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    根据新信息及时调整计划（保持灵活性）
                  </div>
                  <div class="flex items-center gap-2 text-gray-400">
                    <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    总结成功与失败的经验，持续改进
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-500/30 p-6 mt-6">
            <div class="flex items-start gap-4">
              <div class="text-4xl">💡</div>
              <div class="flex-1">
                <h4 class="text-white font-bold mb-2">计划执行要点</h4>
                <p class="text-sm text-gray-300 leading-relaxed">
                  <strong class="text-blue-400">严格遵守纪律</strong>是成功的关键。不要因为短期波动而偏离计划，也不要因为贪婪而忽视止损。
                  市场永远充满不确定性，但有计划的投资者能够在长期中获得稳定回报。
                  <span class="text-yellow-400">记住：保护本金永远是第一位的！</span>
                </p>
              </div>
            </div>
          </div>
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
import { useRoute } from 'vue-router'

const route = useRoute()
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
    time: '02:05',
    fullTime: '2025-12-02 10:05:13',
    title: '供应链联盟加固AI护城河，长期溢价逻辑增强',
    sentiment: 'Bullish',
    group: 'Today',
    summary: '美国将于12月12日与日本、荷兰、韩国等八个盟国举行白宫峰会，旨在巩固AI芯片和关键矿产的供应链。该倡议由经济事务副国务卿Jacob Helberg披露，重点涵盖能源、先进制造半导体及AI基础设施协议，意在减少对中国的依赖并确保“双马竞赛”中的技术主导权。',
    impactAnalysis: '该事件对NVDA正面，因为其核心护城河——高性能GPU的制造——极度依赖复杂的全球供应链。作用机制：盟友名单包括荷兰（ASML光刻机）、韩国（HBM内存）和日本（关键材料），这直接加固了NVDA的生产生态系统。财务路径：虽然短期无直接营收增量，但供应链去风险化保护了其73.4%的毛利率免受地缘政治冲击。战略定位：通过国家级协议锁定“先进制造半导体”资源，进一步提高了中国竞争对手获取关键上游资源的门槛，巩固NVDA在AI基础设施中的垄断地位。',
    expectationAnalysis: '影响性质：长期基本面护航，而非单纯情绪炒作。短期（1-4周）：市场将定价12月12日峰会的具体成果。技术面显示TD序列出现9/9卖出信号，提示短期可能在$180附近震荡整理，等待峰会催化。中期（1-6月）：关注具体协议如何优化HBM和CoWoS产能分配。若出口管制进一步收紧，可能引发短期波动，但长期利好非中系供应链。长期（6月+）：随着供应链“友岸外包”落地，NVDA的供应稳定性溢价将提升，支撑其44倍PE的估值逻辑。',
    backtestAnalysis: '历史数据显示，NVDA在类似日涨幅（+1.6%）后的表现呈现“短平长多”特征。短期概率：未来1天上涨概率仅53%（平均+0.1%），验证了第2节的震荡预期。中期趋势：持有63天上涨概率飙升至73%，平均回报+19.7%。'
  },
  {
    id: 2,
    time: '22:20',
    fullTime: '2025-12-01 22:20:00',
    title: 'Runway Gen-4.5全栈部署验证Blackwell视频AI统治力',
    sentiment: 'Bullish',
    group: 'Yesterday',
    summary: 'Runway发布Gen-4.5视频生成模型，宣布全栈部署于NVIDIA Blackwell集群。',
    impactAnalysis: '直接验证了Blackwell架构在视频生成领域的统治力，预计将带动更多视频AI公司跟进采购。',
    expectationAnalysis: '短期利好，强化Blackwell出货预期。',
    backtestAnalysis: '类似产品发布事件后，股价平均在3天内上涨2.5%。'
  },
  {
    id: 3,
    time: '19:28',
    fullTime: '2025-12-01 19:28:00',
    title: '开源自动驾驶模型Alpamayo-R1深化生态护城河，长期算力需求看涨',
    sentiment: 'Bullish',
    group: 'Yesterday',
    summary: 'NVIDIA发布开源自动驾驶模型Alpamayo-R1，旨在加速L4级自动驾驶落地。',
    impactAnalysis: '通过开源策略绑定自动驾驶开发者生态，长期锁定车端推理算力需求。',
    expectationAnalysis: '长期利好，自动驾驶业务有望成为第二增长曲线。',
    backtestAnalysis: '开源模型发布通常对股价短期影响有限，但长期相关性高。'
  },
  {
    id: 4,
    time: '10:06',
    fullTime: '2025-12-01 10:06:00',
    title: '韩国主权订单确认即期需求，但XPeng自研芯片预示长期垂直整合风险',
    sentiment: 'Neutral',
    group: 'Yesterday',
    summary: '韩国政府确认大额GPU采购订单，同时小鹏汽车宣布加大自研芯片投入。',
    impactAnalysis: '短期需求强劲，但长期面临客户自研芯片的替代风险（垂直整合）。',
    expectationAnalysis: '中性偏多，短期业绩有保障，长期竞争格局需关注。',
    backtestAnalysis: '混合消息发布后，股价通常呈现高波动震荡。'
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

// --- Methods: Strategy Modal ---
const openStrategyDetail = (strategy) => {
  selectedStrategy.value = strategy
  showStrategyModal.value = true
}

const closeStrategyModal = () => {
  showStrategyModal.value = false
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
