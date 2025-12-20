<template>
  <div class="bg-[#0f0f0f] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">

      <!-- Top Search Bar -->
      <div class="flex flex-col items-center justify-center mb-4 animate-fade-in-down">
        <div class="relative group w-full max-w-md">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            v-model="searchSymbol"
            @keyup.enter="handleSearch"
            type="text" 
            placeholder="Search to jump to another stock (e.g. NVDA)..." 
            class="w-full bg-[#1a1a1a]/80 backdrop-blur border border-[#333] text-white text-sm pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-lg placeholder-gray-500 hover:border-gray-600"
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span class="text-[10px] text-gray-600 border border-[#333] rounded px-1.5 py-0.5 bg-[#111]">Enter</span>
          </div>
        </div>
      </div>

      <!-- Stock Basic Info Card -->
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] p-6 mb-8 relative">
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
      </div>

      <!-- Related Themes Tab -->
      <div v-if="activeTab === 'themes'" class="animate-fade-in">
        <!-- Sort Controls -->
        <div class="mb-4 flex justify-end gap-2">
          <!-- Sort by Change -->
          <button 
            @click="handleSort('change')"
            class="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-xs font-bold transition-all"
            :class="sortField === 'change' ? 'border-blue-500 text-white' : 'border-[#333] text-gray-400 hover:text-white hover:border-gray-500'"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
            <span>Change</span>
            <span v-if="sortField === 'change'" class="text-blue-400 ml-1">
              {{ sortDirection === 'desc' ? '↓' : '↑' }}
            </span>
          </button>

          <!-- Sort by Time -->
          <button 
            @click="handleSort('time')"
            class="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border rounded-lg text-xs font-bold transition-all"
            :class="sortField === 'time' ? 'border-blue-500 text-white' : 'border-[#333] text-gray-400 hover:text-white hover:border-gray-500'"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Time</span>
            <span v-if="sortField === 'time'" class="text-blue-400 ml-1">
              {{ sortDirection === 'desc' ? '↓' : '↑' }}
            </span>
          </button>
        </div>

        <!-- Themes List -->
        <div v-if="relatedThemes.length > 0" class="space-y-4">
          <div 
            v-for="theme in sortedThemes" 
            :key="theme.id" 
            :id="`theme-${theme.id}`"
            @click="toggleThemeExpand(theme)"
            class="bg-[#1a1a1a] rounded-xl border p-5 transition-all group relative cursor-pointer"
            :class="[
              theme.id === highlightedThemeId ? 'border-blue-500 glow-info-md' : 'border-[#333] hover:border-gray-500'
            ]"
          >
            <div class="flex flex-col md:flex-row gap-6">
                  <!-- Left: Theme Change -->
                  <div class="md:w-32 flex-shrink-0 flex items-center justify-center border-r border-[#333] mr-6 pr-6">
                    <div class="text-center">
                      <div class="text-2xl font-bold font-mono" :class="getThemeChange(theme) >= 0 ? 'text-green-400' : 'text-red-400'">
                        {{ getThemeChange(theme) >= 0 ? '+' : '' }}{{ getThemeChange(theme) }}%
                      </div>
                      <div class="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Today</div>
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

              <!-- Right: Meta & Expand -->
              <div class="flex flex-row md:flex-col justify-between items-end md:w-auto flex-shrink-0 text-right">
                <div class="text-xs text-gray-500 mb-2">{{ theme.timeAgo }}</div>
                
                <!-- Expand Indicator -->
                <div class="text-gray-500 group-hover:text-white transition-colors mt-auto flex items-center gap-1">
                  <span class="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">View Details</span>
                  <svg 
                    class="w-5 h-5 transition-transform duration-300" 
                    :class="theme.isExpanded ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

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
            <span class="text-sm text-gray-500">({{ filteredStrategies.length }})</span>
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

        <!-- Strategy Filters -->
        <div class="mb-4 space-y-3">
          <!-- 策略生成来源筛选器 -->
          <div class="bg-[#1a1a1a] rounded-lg border border-[#333] p-3">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-semibold text-gray-300">策略生成来源</span>
              <span class="text-[10px] text-gray-500">(多选)</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="model in aiModels"
                :key="model.id"
                @click="toggleModelFilter(model.id)"
                class="px-2 py-1 rounded-md text-[11px] font-medium transition-all border flex items-center gap-1"
                :class="selectedModels.includes(model.id)
                  ? `${model.bgColor} ${model.borderColor} ${model.textColor}`
                  : 'bg-[#0f0f0f] border-[#333] text-gray-500 hover:border-gray-600'"
              >
                <span class="text-sm">{{ model.icon }}</span>
                <span>{{ model.name }}</span>
              </button>
            </div>
          </div>

          <!-- 其他筛选器 (方向、持续时间、评级) -->
          <div class="grid grid-cols-3 gap-3">
            <!-- 策略方向 -->
            <div class="bg-[#1a1a1a] rounded-lg border border-[#333] p-3">
              <div class="text-xs font-semibold text-gray-300 mb-2">策略方向</div>
              <div class="flex gap-1.5">
                <button
                  v-for="direction in ['LONG', 'SHORT', 'WAIT']"
                  :key="direction"
                  @click="toggleDirectionFilter(direction)"
                  class="flex-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all border"
                  :class="selectedDirections.includes(direction)
                    ? direction === 'LONG' ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : direction === 'SHORT' ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-gray-500/10 border-gray-500/30 text-gray-400'
                    : 'bg-[#0f0f0f] border-[#333] text-gray-500 hover:border-gray-600'"
                >
                  {{ direction }}
                </button>
              </div>
            </div>

            <!-- 持续时间 -->
            <div class="bg-[#1a1a1a] rounded-lg border border-[#333] p-3">
              <div class="text-xs font-semibold text-gray-300 mb-2">持续时间</div>
              <div class="flex gap-1.5">
                <button
                  v-for="duration in ['Short-term', 'Medium-term', 'Long-term']"
                  :key="duration"
                  @click="toggleDurationFilter(duration)"
                  class="flex-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all border"
                  :class="selectedDurations.includes(duration)
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    : 'bg-[#0f0f0f] border-[#333] text-gray-500 hover:border-gray-600'"
                >
                  {{ duration.replace('-term', '') }}
                </button>
              </div>
            </div>

            <!-- 策略评级 -->
            <div class="bg-[#1a1a1a] rounded-lg border border-[#333] p-3">
              <div class="text-xs font-semibold text-gray-300 mb-2">策略评级</div>
              <div class="flex flex-wrap gap-1.5">
                <button
                  v-for="grade in ['A+', 'A', 'A-', 'B+', 'B', 'C']"
                  :key="grade"
                  @click="toggleGradeFilter(grade)"
                  class="px-2 py-1 rounded-md text-[11px] font-medium transition-all border min-w-[36px]"
                  :class="selectedGrades.includes(grade)
                    ? grade.startsWith('A') ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : grade.startsWith('B') ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                      : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : 'bg-[#0f0f0f] border-[#333] text-gray-500 hover:border-gray-600'"
                >
                  {{ grade }}
                </button>
              </div>
            </div>
          </div>

          <!-- 清除筛选器按钮 -->
          <div v-if="hasActiveFilters" class="flex justify-end">
            <button
              @click="clearAllFilters"
              class="px-3 py-1.5 bg-[#0f0f0f] border border-[#333] hover:border-gray-600 text-gray-400 text-[11px] font-medium rounded-md transition-all flex items-center gap-1.5"
            >
              <span>✕</span>
              <span>清除所有筛选</span>
            </button>
          </div>
        </div>

        <!-- Strategies List -->
        <div v-if="filteredStrategies.length > 0" class="space-y-4">
          <div 
            v-for="strategy in filteredStrategies"
            :key="strategy.id"
            :ref="el => { if (strategy.id === highlightedStrategyId) highlightedStrategyRef = el }"
            @click="openStrategyDetail(strategy)"
            class="bg-[#1a1a1a] rounded-xl border p-5 hover:border-blue-500 transition-all group cursor-pointer"
            :class="strategy.id === highlightedStrategyId 
              ? 'border-blue-500 glow-info-lg bg-[#1a2740]' 
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
                  <!-- AI Model Badge -->
                  <span 
                    v-if="strategy.model"
                    class="px-2 py-0.5 rounded-md text-[10px] font-semibold border flex items-center gap-1"
                    :class="getModelConfig(strategy.model)?.bgColor + ' ' + getModelConfig(strategy.model)?.borderColor + ' ' + getModelConfig(strategy.model)?.textColor"
                  >
                    <span class="text-xs">{{ getModelConfig(strategy.model)?.icon }}</span>
                    <span>{{ getModelConfig(strategy.model)?.name }}</span>
                  </span>
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
        
        <!-- Event Sentiment Chart -->
        <div class="flex items-end gap-1 h-12 flex-1 max-w-md mx-auto relative px-2">
          <!-- Background Grid -->
          <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 z-0">
            <div class="w-full h-px bg-gray-500 border-t border-dashed"></div>
            <div class="w-full h-px bg-gray-500 border-t border-dashed"></div>
            <div class="w-full h-px bg-gray-500 border-t border-dashed"></div>
          </div>

          <div 
            v-for="bar in eventChartData" 
            :key="bar.id" 
            @click="scrollToEventGroup(bar.id)"
            class="w-full relative group flex flex-col justify-end cursor-pointer hover:opacity-90 transition-opacity z-10"
            :style="{ height: Math.max(15, bar.height) + '%' }"
          >
            <!-- Stacked Bars -->
            <div class="w-full bg-red-500/80" :style="{ height: bar.bearishH + '%' }"></div>
            <div class="w-full bg-gray-500/80" :style="{ height: bar.neutralH + '%' }"></div>
            <div class="w-full bg-green-500/80 rounded-t-[1px]" :style="{ height: bar.bullishH + '%' }"></div>
            
            <!-- Label -->
            <div v-if="bar.label" class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 whitespace-nowrap font-mono">
              {{ bar.label }}
            </div>

            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
              <div class="bg-[#1a1a1a] border border-[#444] rounded p-2 text-[10px] shadow-xl whitespace-nowrap backdrop-blur-md">
                <div class="font-bold text-white mb-1 border-b border-[#333] pb-1">Total: {{ bar.total }}</div>
                <div class="grid grid-cols-2 gap-x-3 gap-y-0.5">
                  <span class="text-green-400">Bullish</span> <span class="text-right font-mono">{{ bar.bullish }}</span>
                  <span class="text-red-400">Bearish</span> <span class="text-right font-mono">{{ bar.bearish }}</span>
                  <span class="text-gray-400">Neutral</span> <span class="text-right font-mono">{{ bar.neutral }}</span>
                </div>
              </div>
              <!-- Arrow -->
              <div class="w-2 h-2 bg-[#1a1a1a] border-r border-b border-[#444] transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
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
        <div 
          v-for="bar in [...eventChartData].reverse()" 
          :key="bar.id" 
          :id="`event-group-${bar.id}`"
          v-show="bar.total > 0"
        >
          <div class="flex items-center gap-4 mb-4 border-b border-[#333] pb-2">
            <h2 class="text-lg font-bold text-white">{{ bar.label || `${24 - bar.id}h ago` }}</h2>
            <span class="text-sm text-gray-500">{{ bar.total }} events</span>
          </div>
          
          <div class="space-y-2">
            <div 
              v-for="event in chartLinkedEvents[bar.id]" 
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

    <!-- Strategy Detail Modal (Apple-inspired Minimalist Design) -->
    <div v-if="showStrategyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeStrategyModal">
      <div class="bg-[#1a1a1a] rounded-2xl border border-[#333] w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
        
        <!-- Modal Header (Sticky) -->
        <div class="px-8 py-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]/95 backdrop-blur-xl z-10 shrink-0">
          <div class="flex items-center gap-3">
            <!-- Grade Badge -->
            <div class="px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide" 
              :class="{
                'bg-green-500/10 text-green-400': selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+',
                'bg-blue-500/10 text-blue-400': selectedStrategy.grade === 'B',
                'bg-yellow-500/10 text-yellow-400': selectedStrategy.grade === 'C'
              }">
              GRADE {{ selectedStrategy.grade }}
            </div>
            <!-- Direction Badge -->
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold"
              :class="{
                'bg-green-500/10 text-green-400': selectedStrategy.direction === 'LONG',
                'bg-red-500/10 text-red-400': selectedStrategy.direction === 'SHORT',
                'bg-gray-500/10 text-gray-400': selectedStrategy.direction === 'WAIT'
              }">
              <span v-if="selectedStrategy.direction === 'LONG'">↑</span>
              <span v-if="selectedStrategy.direction === 'SHORT'">↓</span>
              {{ selectedStrategy.direction }}
            </div>
            <div class="h-4 w-px bg-[#333] mx-1"></div>
            <span class="text-xs text-gray-500">{{ selectedStrategy.timeAgo }}</span>
          </div>
          <!-- Close Button -->
          <button 
            @click="closeStrategyModal" 
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-all duration-200"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body (Split Layout) -->
        <div class="flex flex-1 overflow-hidden">
          
        <!-- Left Area (Chat + Content) -->
        <div class="flex-1 flex border-r border-[#2a2a2a] relative bg-[#0f0f0f]">
          
          <!-- Chat Sidebar (Left, 320px) -->
          <div class="w-[320px] flex flex-col border-r border-[#2a2a2a] bg-[#111] shrink-0">
            <!-- Chat Header -->
            <div class="px-4 py-3 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]">
               <h3 class="text-sm font-medium text-gray-300 flex items-center gap-2">
                 <i class="fas fa-robot text-green-500"></i> AI 策略助手
               </h3>
            </div>

            <!-- Chat Messages Area -->
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
               <!-- Welcome State -->
               <div v-if="chatHistory.length === 0" class="flex flex-col h-full">
                  <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                      <i class="fas fa-robot text-green-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-white font-medium mb-1">ScaleAlpha AI 助手</h4>
                      <p class="text-xs text-gray-500">基于当前策略报告为您解答</p>
                    </div>
                  </div>
                  
                  <!-- Quick Prompts -->
                  <div class="space-y-2 pb-4">
                    <p class="text-xs text-gray-500 px-1 mb-2">您可以问我：</p>
                    <button 
                      v-for="(prompt, idx) in quickPrompts" 
                      :key="idx"
                      @click="useQuickPrompt(prompt)"
                      class="w-full text-left px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] hover:border-blue-500/30 border border-[#2a2a2a] rounded-lg text-xs text-gray-300 transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-blue-900/10"
                    >
                      <span class="group-hover:text-blue-400 transition-colors">{{ prompt }}</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-500 transition-all duration-300"></i>
                    </button>
                  </div>
               </div>
               
               <!-- Chat History -->
               <div v-else class="space-y-4">
                 <div v-for="(msg, index) in chatHistory" :key="index" class="flex gap-3">
                    <!-- Avatar -->
                    <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
                      :class="msg.role === 'user' ? 'bg-blue-600' : 'bg-green-600'">
                      <i class="fas" :class="msg.role === 'user' ? 'fa-user' : 'fa-robot'"></i>
                    </div>
                    <!-- Message Bubble -->
                    <div class="flex-1">
                      <div class="text-xs font-medium text-gray-400 mb-1">
                        {{ msg.role === 'user' ? 'You' : 'ScaleAlpha AI' }}
                      </div>
                      <div class="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap bg-[#222] p-3 rounded-lg border border-[#333]">{{ msg.content }}</div>
                    </div>
                 </div>

                 <!-- Loading Indicator -->
                 <div v-if="isChatLoading" class="flex gap-3">
                    <div class="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0 text-xs">
                      <i class="fas fa-robot"></i>
                    </div>
                    <div class="flex-1">
                       <div class="text-xs font-medium text-gray-400 mb-1">ScaleAlpha AI</div>
                       <div class="bg-[#222] p-3 rounded-lg border border-[#333] w-16">
                          <div class="flex gap-1 items-center h-4 justify-center">
                            <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                            <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                            <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            <!-- Input Area -->
            <div class="p-3 bg-[#1a1a1a] border-t border-[#2a2a2a]">
              <div class="relative">
                <input 
                  v-model="chatInput"
                  type="text" 
                  placeholder="输入问题..." 
                  class="w-full bg-[#0f0f0f] text-white rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-[#333]"
                  @keyup.enter="sendChatMessage"
                >
                <button 
                  @click="sendChatMessage"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-blue-500 hover:text-blue-400 transition-colors"
                  :disabled="!chatInput.trim() || isChatLoading"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Strategy Content (Right, Flex-1) -->
          <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Scrollable Content Area -->
            <div class="flex-1 overflow-y-auto p-6 scrollbar-thin">
              <!-- Strategy Title & Meta -->
              <div class="mb-8">
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                    GRADE {{ selectedStrategy.grade }}
                  </span>
                  <span class="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {{ selectedStrategy.term }}
                  </span>
                  <span class="text-gray-500 text-sm">{{ selectedStrategy.time }}</span>
                </div>
                
                <h2 class="text-2xl font-bold text-white mb-2">{{ selectedStrategy.title }}</h2>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                  <span class="flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-purple-500"></span>
                    {{ selectedStrategy.category }}
                  </span>
                  <span class="flex items-center gap-1">
                    <i class="fas fa-clock"></i>
                    {{ selectedStrategy.duration }}
                  </span>
                </div>
              </div>

              <!-- Strategy Summary Box -->
              <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-5 mb-8">
                <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i class="fas fa-file-alt"></i>
                  Strategy Summary
                </h3>
                <p class="text-gray-300 leading-relaxed text-sm">
                  {{ selectedStrategy.summary }}
                </p>
              </div>

              <!-- Main Content -->
              <div class="markdown-content space-y-6 text-gray-300" v-html="renderedStrategyContent"></div>

              <!-- Action Buttons -->
              <div class="flex gap-4 mt-12 pt-8 border-t border-[#2a2a2a]">
                <button 
                  @click="generatePlanForStrategy(selectedStrategy)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <i class="fas fa-magic"></i>
                  生成交易计划
                </button>
                <button class="px-4 py-3 bg-[#2a2a2a] hover:bg-[#333] text-white rounded-lg transition-colors">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

          <!-- Right: Related Plans (Fixed Width) -->
          <div class="w-[350px] border-l border-[#2a2a2a] bg-[#0f0f0f] overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent shrink-0">
            
            <!-- Plans Header -->
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <h3 class="text-sm font-semibold text-white">基于此策略的计划</h3>
                <span class="text-xs text-gray-500">({{ relatedPlans.length }})</span>
              </div>
              <p class="text-xs text-gray-500">已有 {{ relatedPlans.length }} 个计划使用此策略</p>
            </div>

            <!-- Plans List -->
            <div v-if="relatedPlans.length > 0" class="space-y-3">
              <div 
                v-for="plan in relatedPlans" 
                :key="plan.id"
                class="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-gray-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 transition-all duration-300 group"
                :class="{ 'ring-1 ring-blue-500/30 border-blue-500/30': plan.isExpanded }"
              >
                <!-- Plan Header (Collapsible) -->
                <button 
                  @click="togglePlanExpand(plan)"
                  class="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[#222] transition-colors"
                >
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <svg 
                        class="w-3.5 h-3.5 text-gray-500 transition-transform duration-200 group-hover:text-blue-400" 
                        :class="{ 'rotate-90': plan.isExpanded }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      <h4 class="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">{{ plan.title }}</h4>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-medium flex-shrink-0">
                        <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        官方生成
                      </span>
                    </div>
                    <div class="flex items-center gap-3 text-xs text-gray-500 ml-5">
                      <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${{ (plan.capital / 1000).toFixed(0) }}K
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {{ plan.createdAt }}
                      </span>
                    </div>
                  </div>
                </button>

                <!-- Plan Details (Expanded) -->
                <transition name="expand">
                  <div v-if="plan.isExpanded" class="px-4 pb-4 border-t border-[#2a2a2a] pt-3 space-y-3">
                    <!-- Plan Metrics -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="bg-[#0f0f0f] rounded-lg p-2.5">
                        <div class="text-xs text-gray-500 mb-0.5">目标收益</div>
                        <div class="text-sm font-semibold text-green-400">{{ plan.targetReturn }}</div>
                      </div>
                      <div class="bg-[#0f0f0f] rounded-lg p-2.5">
                        <div class="text-xs text-gray-500 mb-0.5">风险等级</div>
                        <div class="text-sm font-semibold" :class="{
                          'text-green-400': plan.riskLevel === 'low',
                          'text-yellow-400': plan.riskLevel === 'medium',
                          'text-red-400': plan.riskLevel === 'high'
                        }">{{ plan.riskLevel === 'low' ? '低' : plan.riskLevel === 'medium' ? '中' : '高' }}</div>
                      </div>
                    </div>

                    <!-- Positions -->
                    <div v-if="plan.positions && plan.positions.length > 0">
                      <div class="text-xs text-gray-500 mb-2">操作记录</div>
                      <div class="space-y-2">
                        <div 
                          v-for="(position, idx) in plan.positions" 
                          :key="idx"
                          class="text-xs"
                        >
                          <div class="flex items-start gap-2 text-gray-300">
                            <span class="w-1 h-1 rounded-full bg-blue-500/60 mt-1.5 flex-shrink-0"></span>
                            <div class="flex-1">
                              <span class="font-medium">{{ position.action }}</span>
                              <span class="text-blue-400 ml-1.5">{{ position.amount }}</span>
                              <span v-if="position.price !== '-'" class="text-gray-500 ml-1.5">@ {{ position.price }}</span>
                              <div v-if="position.note" class="text-gray-500 mt-0.5 text-[11px]">{{ position.note }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-2 pt-2">
                      <button 
                        @click="viewPlanDetail(plan)"
                        class="flex-1 py-2 px-3 bg-[#2a2a2a] hover:bg-[#333] text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        查看详情
                      </button>
                      <button 
                        @click="editPlan(plan)"
                        class="flex-1 py-2 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium rounded-lg transition-colors"
                      >
                        编辑计划
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="mt-8 text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h4 class="text-sm font-medium text-white mb-2">暂无相关计划</h4>
              <p class="text-xs text-gray-500 mb-4">基于此策略创建您的第一个计划</p>
              <button 
                @click="generatePlanForStrategy(selectedStrategy)"
                class="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                立即生成计划
              </button>
            </div>

            <!-- View All Plans Button -->
            <div v-if="relatedPlans.length > 0" class="mt-4 pt-4 border-t border-[#2a2a2a]">
              <button 
                @click="viewAllPlans"
                class="w-full py-2.5 text-xs font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>查看全部计划</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
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
import { marked } from 'marked'

// 配置 marked 选项
marked.setOptions({
  breaks: true,  // 支持 GitHub 风格的换行
  gfm: true,     // 启用 GitHub Flavored Markdown
})

const route = useRoute()
const router = useRouter()
const symbol = ref(route.params.id || 'NVDA')

// --- Search Logic ---
const searchSymbol = ref('')

const handleSearch = () => {
  if (!searchSymbol.value) return
  const symbol = searchSymbol.value.toUpperCase()
  router.push({ 
    name: 'StockAttributionDetail', 
    params: { id: symbol },
    query: { tab: activeTab.value }
  })
  searchSymbol.value = ''
}

// Helper to calculate theme change
const getThemeChange = (theme) => {
  if (theme.change !== undefined) return theme.change
  if (theme.stockDetails && theme.stockDetails.length > 0) {
    const total = theme.stockDetails.reduce((sum, stock) => sum + stock.change, 0)
    return (total / theme.stockDetails.length).toFixed(2)
  }
  return 0.00
}

// Theme Sorting Logic
const sortField = ref('default') // 'default', 'change', 'time'
const sortDirection = ref('desc')

const handleSort = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortField.value = field
    sortDirection.value = 'desc'
  }
}

const sortedThemes = computed(() => {
  if (sortField.value === 'default') return relatedThemes.value
  
  return [...relatedThemes.value].sort((a, b) => {
    let valA, valB
    
    if (sortField.value === 'change') {
      valA = parseFloat(getThemeChange(a))
      valB = parseFloat(getThemeChange(b))
    } else if (sortField.value === 'time') {
      valA = a.timestamp || 0
      valB = b.timestamp || 0
    }
    
    return sortDirection.value === 'desc' ? valB - valA : valA - valB
  })
})

// Mock Chart Data
const eventChartData = computed(() => {
  return Array.from({ length: 24 }, (_, i) => {
    const bullish = Math.floor(Math.random() * 8)
    const bearish = Math.floor(Math.random() * 4)
    const neutral = Math.floor(Math.random() * 3)
    const total = bullish + bearish + neutral
    return {
      id: i,
      label: i === 23 ? 'Today' : (i === 0 ? '24h ago' : ''),
      bullish,
      bearish,
      neutral,
      total,
      bullishH: total ? (bullish / total) * 100 : 0,
      bearishH: total ? (bearish / total) * 100 : 0,
      neutralH: total ? (neutral / total) * 100 : 0,
      height: Math.min(100, Math.max(10, total * 8)) // Scale height
    }
  })
})

// Mock Events for Chart Linking
const chartLinkedEvents = computed(() => {
  const events = {}
  eventChartData.value.forEach(bar => {
    if (bar.total > 0) {
      // Generate mock events for this bar
      events[bar.id] = Array.from({ length: bar.total }, (_, i) => ({
        id: `${bar.id}-${i}`,
        time: `${String(bar.id).padStart(2, '0')}:${String(Math.floor(Math.random()*60)).padStart(2, '0')}`,
        title: `Event ${i + 1} related to market movement`,
        sentiment: i < bar.bullish ? 'Bullish' : (i < bar.bullish + bar.bearish ? 'Bearish' : 'Neutral'),
        desc: 'This is a detailed description of the event...'
      }))
    }
  })
  return events
})

const scrollToEventGroup = (id) => {
  const element = document.getElementById(`event-group-${id}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // Optional: Add highlight class temporarily
    element.classList.add('bg-[#222]')
    setTimeout(() => element.classList.remove('bg-[#222]'), 1000)
  }
}

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
const relatedPlans = ref([])

// --- AI Models Configuration ---
const aiModels = [
  {
    id: 'openai',
    name: 'OpenAI',
    icon: '●', // 圆圈图标
    color: '#FF6B6B', // 红色
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400'
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '✦', // 星形图标
    color: '#FF9E5C', // 橙色
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400'
  },
  {
    id: 'grok',
    name: 'Grok',
    icon: '✓', // 对勾图标
    color: '#E5E7EB', // 灰白色
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    textColor: 'text-gray-400'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    icon: '◆', // 菱形图标
    color: '#60A5FA', // 蓝色
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    icon: '◉', // 圆点图标
    color: '#A78BFA', // 紫色
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400'
  },
  {
    id: 'kimi',
    name: 'Kimi',
    icon: '▪', // 方块图标
    color: '#1F2937', // 黑色
    bgColor: 'bg-gray-700/10',
    borderColor: 'border-gray-700/30',
    textColor: 'text-gray-300'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '✧', // 星形图标
    color: '#34D399', // 青绿色
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400'
  }
]

// Strategy Filters State
const selectedModels = ref([]) // 选中的模型来源
const selectedDirections = ref([]) // 选中的方向
const selectedDurations = ref([]) // 选中的持续时间
const selectedGrades = ref([]) // 选中的评级

// Computed property to render markdown content
const renderedStrategyContent = computed(() => {
  if (!selectedStrategy.value || !selectedStrategy.value.fullContent) {
    return ''
  }
  return marked.parse(selectedStrategy.value.fullContent)
})

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
    model: 'openai',
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
    model: 'claude',
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
    model: 'qwen',
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
    model: 'grok',
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
    id: 12, 
    symbol: 'GOOGL', 
    grade: 'B+', 
    title: 'YouTube Shorts货币化加速 - 对标TikTok的增量市场', 
    description: 'YouTube Shorts日活用户突破20亿，广告收入环比增长35%。创作者分成计划吸引大量网红入驻，内容质量显著提升。随着AI推荐算法优化，用户时长增长至平均28分钟/日。当前估值尚未充分反映Shorts的长期价值，建议在$170-180区间逢低布局。', 
    direction: 'LONG', 
    duration: '波段操作 (2-4周)', 
    strategy: '增长驱动 + 估值修复',
    model: 'kimi',
    timeAgo: '6小时前',
    timestamp: 1701399600000,
    isNew: false,
    fullContent: `
## 投资主题：短视频赛道的"迟到者"逆袭

YouTube Shorts推出仅3年，已成为TikTok最强劲的竞争对手。随着货币化机制成熟，Shorts有望贡献YouTube总收入的15-20%。

## 业务进展

### 用户增长
- **日活用户**：20亿+（TikTok为15亿）
- **用户时长**：月均使用时长从18分钟增至28分钟
- **创作者数量**：500万+活跃创作者（YoY +120%）

### 货币化突破
- **广告收入**：Q3达$8.5亿，环比增长35%
- **RPM提升**：每千次播放收入从$0.8升至$1.2
- **分成计划**：创作者可获得45%广告收入，高于TikTok的30%

### 技术优势
- **AI推荐**：基于YouTube 18年积累的用户数据，推荐精准度高
- **生态整合**：Shorts可无缝导流至长视频，转化率达12%
- **创作工具**：YouTube Studio提供专业剪辑、配音、字幕工具

## 财务预测

### 收入预测（2024-2026）
- **2024E**：$35亿（占YouTube总收入的10%）
- **2025E**：$65亿（占比15%）
- **2026E**：$100亿（占比18%）

### 利润率
- **当前毛利率**：45%（低于YouTube整体的55%）
- **目标毛利率**：2025年达50%，2027年追平主站

## 投资逻辑

### 催化剂
1. **年底购物季**：Shorts电商广告需求激增
2. **NFL合作**：2024年独家播放权，带来体育内容增量
3. **创作者大会**：1月举办，预计公布重磅激励政策

### 估值修复空间
- **当前隐含估值**：市场给Shorts $800-1000亿估值
- **公允价值**：对标TikTok $2000亿，Shorts合理估值$1200-1500亿
- **对应股价提升**：$15-25/股（+8-14%）

## 操作建议

**建仓区间**: $170-180
**目标价位**: $195-205
**止损位**: $165
**持仓周期**: 2-4周（波段操作）

**仓位配置**: 
- 激进型：20-30%仓位
- 稳健型：10-15%仓位

## 风险提示

- TikTok禁令若解除，竞争加剧
- 创作者分成比例压缩利润率
- 监管部门对短视频内容审查趋严
    `
  },
  { 
    id: 13, 
    symbol: 'GOOGL', 
    grade: 'A', 
    title: 'Google Cloud季度盈利超预期 - AWS份额争夺战', 
    description: 'GCP（Google Cloud Platform）Q3营收$86亿，同比增长29%，首次实现季度营业利润$2.66亿。AI服务（Vertex AI）收入占比升至35%，大客户留存率达97%。随着企业AI应用落地加速，GCP有望在2025年挑战Azure的市场第二地位。技术面看，$175支撑强劲，突破$185可追。', 
    direction: 'LONG', 
    duration: '短线交易 (3-7天)', 
    strategy: '业绩驱动 + 动量突破',
    model: 'deepseek',
    timeAgo: '3小时前',
    timestamp: 1701414600000,
    isNew: true,
    fullContent: `
## 投资主题：云计算三国杀的"后来者"突围

Google Cloud终于实现盈利，标志着其从"烧钱抢市场"转向"质量增长"的战略拐点。AI时代的云服务重新洗牌，GCP凭借技术优势有望弯道超车。

## 业务亮点

### 财务表现
- **营收**：Q3 $86亿，YoY +29%（AWS +12%, Azure +27%）
- **营业利润**：$2.66亿（首次为正！）
- **利润率**：3.1%（2025年目标10%）

### AI服务爆发
- **Vertex AI**：Q3收入$30亿，占GCP总收入的35%
- **企业客户**：财富500强中48%使用GCP AI服务
- **典型案例**：
  - Spotify用GCP训练推荐模型，成本降低40%
  - Target用Vertex AI优化库存，准确率提升25%

### 市场份额
- **当前份额**：全球云市场10%（AWS 32%, Azure 23%）
- **增速对比**：GCP增速29% > Azure 27% > AWS 12%
- **2025年目标**：份额提升至13-15%

## 竞争优势

### 1. AI原生架构
- TPU（Tensor Processing Unit）性价比是NVIDIA GPU的2倍
- Gemini模型直接集成，开发者无需额外部署

### 2. 数据分析
- BigQuery处理速度领先Snowflake 30%
- 与YouTube/Maps数据打通，洞察能力强

### 3. 价格策略
- 存储成本比AWS低15-20%
- 按秒计费（AWS按小时），对小企业友好

## 估值分析

### 分部估值
- **Google Cloud公允价值**：$2500-3000亿
  - 对标AWS $5000亿（份额32%），GCP合理估值 = $5000B × (10%/32%) × 1.3倍增速溢价 = $2600B
- **当前隐含估值**：$2000亿（被低估20-30%）

### 股价影响
- GCP估值修复可推动股价上涨$25-35/股

## 交易策略

**技术面分析**：
- **支撑位**：$175（50日均线）
- **阻力位**：$185（前高）
- **突破信号**：放量突破$185，目标$195

**短线操作**：
- **入场**：$175-180
- **加仓**：突破$185后加仓30%
- **止盈**：$195（分批减仓）
- **止损**：$172（跌破立即离场）

**持仓周期**：3-7天（快进快出）

## 催化剂

- **12月Google Cloud Next大会**：预计公布重磅AI产品
- **AWS re:Invent对比**：若GCP发布更激进的AI价格策略，股价有望大涨
- **分析师上调**：摩根士丹利、高盛可能因盈利超预期上调目标价

## 风险提示

- 微软Azure与OpenAI绑定，AI市场份额难以撼动
- 企业客户迁移成本高，换云意愿低
- 价格战压缩利润率
    `
  },
  { 
    id: 14, 
    symbol: 'GOOGL', 
    grade: 'C', 
    title: '反垄断判决阴影下的防御性减仓 - 等待靴子落地', 
    description: '美国司法部要求Google剥离Chrome浏览器，欧盟DMA法案限制搜索引擎预装，印度反垄断机构罚款$1.6亿。多重监管压力下，搜索业务面临结构性拆分风险。虽然法律程序可能拖延2-3年，但不确定性已经反映在股价波动率上。建议降低仓位至10-15%，等待政策明朗后再行动。', 
    direction: 'SHORT', 
    duration: '中期对冲 (1-2个月)', 
    strategy: '风险对冲 + 波动率套利',
    model: 'claude',
    timeAgo: '1天前',
    timestamp: 1701336000000,
    isNew: false,
    fullContent: `
## 投资主题：监管"达摩克利斯之剑"下的防御性策略

反垄断诉讼已从"狼来了"变成"狼真的来了"。虽然Google最终可能不会被拆分，但诉讼过程将持续压制估值。

## 监管风险梳理

### 美国司法部
- **判决结果**（2024年8月）：认定Google在搜索领域构成垄断
- **补救措施**（预计2025年Q1公布）：
  - 方案A：禁止与苹果、三星签订默认搜索协议（年损失$200亿）
  - 方案B：强制剥离Chrome浏览器（市值损失$500-800亿）
  - 方案C：开放搜索索引给竞争对手（搜索市占率-5-8%）

### 欧盟DMA法案
- **生效时间**：2024年3月
- **核心要求**：
  - Android手机必须提供搜索引擎选择界面
  - 禁止预装Google Search为默认选项
  - 违规罚款：全球营收的10%（约$300亿）
- **影响预测**：欧洲搜索市占率可能从92%降至75-80%

### 印度反垄断
- **罚款金额**：$1.6亿
- **整改要求**：Play Store开放第三方支付，分成比例从30%降至15%

## 财务影响测算

### 最坏情景（Chrome剥离 + 默认协议禁止）
- **收入损失**：$250-300亿/年（约占总收入的8-10%）
- **估值影响**：市值缩水$2000-3000亿（股价-$80-120）

### 基准情景（仅禁止默认协议）
- **收入损失**：$150-200亿/年
- **估值影响**：市值缩水$1000-1500亿（股价-$40-60）

### 乐观情景（罚款了事）
- **一次性罚款**：$50-100亿
- **估值影响**：短期波动，长期影响有限

## 对冲策略

### 策略1：买入Put期权（适合激进投资者）
- **标的**：GOOGL 2025年3月到期
- **行权价**：$160（当前价-10%）
- **权利金**：约$8/股
- **最大亏损**：权利金$8
- **保险收益**：若股价跌破$152，开始盈利

### 策略2：Collar策略（适合长期持有者）
- **卖出Call**：$195行权价（上涨空间+10%）
- **买入Put**：$165行权价（下跌保护-8%）
- **净成本**：接近零（Call收入覆盖Put成本）
- **效果**：锁定收益区间在[-8%, +10%]

### 策略3：减仓等待（适合稳健投资者）
- **当前仓位**：假设30%
- **减至**：10-15%
- **腾出资金**：配置防御性资产（国债、黄金）
- **重新入场时机**：判决明朗后

## 时间线预判

- **2024年12月**：司法部提交补救方案建议
- **2025年3月**：法院听证会
- **2025年6-8月**：初步判决（大概率会上诉）
- **2026-2027年**：上诉审理
- **2028年**：最终判决（最快也要3-4年）

## 交易建议

**防御性操作**：
- **立即行动**：减持20-30%仓位
- **止损位**：$165（跌破则清仓）
- **观察信号**：
  - 若司法部方案温和（仅罚款）→ 股价反弹至$190+，可回补
  - 若要求剥离Chrome → 股价暴跌至$150-160，继续离场

**仓位建议**：
- **多头仓位**：降至10-15%
- **对冲仓位**：配置5-8% Put期权
- **现金比例**：提升至30-40%

## 风险提示

- 政策风险无法精确预测，可能出现黑天鹅事件
- 拆分传闻可能反而推高股价（参考AT&T拆分后各部分涨幅超100%）
- 过度对冲可能错失反弹行情
    `
  },
  { 
    id: 15, 
    symbol: 'GOOGL', 
    grade: 'A-', 
    title: '搜索广告ROAS提升40% - AI驱动的利润率扩张', 
    description: 'Google搜索广告接入Gemini后，广告相关性得分提升32%，点击率(CTR)提高28%，广告主ROAS（广告支出回报率）从1:4.2增至1:5.9。电商、旅游类广告主纷纷加大投放预算，Q3搜索广告收入$485亿，超预期$12亿。考虑到AI增强广告的渗透率仅18%，未来2年仍有50-60%增长空间。', 
    direction: 'LONG', 
    duration: '中长线持有 (6-12个月)', 
    strategy: '盈利质量改善 + 护城河加深',
    model: 'gemini',
    timeAgo: '8小时前',
    timestamp: 1701396000000,
    isNew: false,
    fullContent: `
## 投资主题：AI重塑搜索广告的"印钞机"模式

市场担心ChatGPT会蚕食Google搜索份额，但数据显示：AI不仅没有削弱搜索，反而让广告变现效率大幅提升。

## 核心数据

### 广告效果提升
- **点击率（CTR）**：从3.8%升至4.9%（+28%）
- **转化率（CVR）**：从2.1%升至2.7%（+29%）
- **ROAS**：从1:4.2升至1:5.9（+40%）
  - 即：广告主每投入$1，可获得$5.9收入（之前只有$4.2）

### 收入增长
- **Q3搜索广告收入**：$485亿（YoY +12%，超预期$12亿）
- **AI增强广告占比**：18%（Q2仅8%）
- **预测**：2024 Q4可达25%，2025全年达50%+

### 利润率扩张
- **搜索业务毛利率**：从56%升至61%（AI降低人工审核成本）
- **营业利润率**：从32%升至36%

## AI驱动的广告革命

### 1. 更精准的用户意图理解
- **传统搜索**："iPhone 15 价格" → 展示比价网站广告
- **AI搜索**："适合拍照的手机" → Gemini分析用户场景，推荐iPhone 15 Pro + 电商链接

### 2. 动态广告生成
- **传统模式**：广告主预设10-20个广告文案
- **AI模式**：根据用户搜索词实时生成定制化广告
  - 例：搜索"减肥"，30岁女性看到"产后瘦身"，50岁男性看到"降低三高"

### 3. 跨场景归因
- **整合数据源**：YouTube观看记录 + Gmail购物邮件 + Maps位置数据
- **效果**：广告归因准确率从65%升至82%

## 竞争护城河加深

### vs. Meta（Facebook/Instagram）
- **搜索广告转化率**：2.7% > Meta信息流广告1.8%
- **广告主留存率**：Google 94% > Meta 87%

### vs. Amazon（电商广告）
- **品类优势**：Amazon强在产品搜索，Google强在服务类（教育、旅游、医疗）
- **市场规模**：Google搜索TAM $2000亿 > Amazon广告 $600亿

### vs. ChatGPT（生成式AI）
- **商业化进度**：ChatGPT仍在探索广告模式，Google已成熟
- **用户习惯**：搜索引擎+广告的心智已建立18年

## 财务预测

### 收入预测（2024-2026）
- **2024E**：搜索广告$1980亿（+10%）
- **2025E**：搜索广告$2200亿（+11%）
- **2026E**：搜索广告$2450亿（+11%）

### AI广告贡献
- **2025年**：AI增强广告贡献$350亿增量收入
- **2026年**：贡献$550亿增量收入

## 投资逻辑

### 估值修复逻辑
- **当前PE**：22倍（低于5年均值26倍）
- **合理PE**：考虑AI提升利润率，应给28-30倍
- **目标价**：$220-240（+25-35%）

### 长期持有理由
1. **现金流稳定**：搜索业务年现金流$800亿+
2. **股息潜力**：当前股息率0.5%，未来可提升至1.5-2%
3. **回购力度**：年回购$700亿，相当于每年注销3-4%股本

## 配置建议

**仓位配置**：
- **核心持仓**：30-40%（长期配置，不做波段）
- **成本控制**：$170-185分批建仓
- **止损纪律**：仅在基本面恶化时止损（如AI广告增长停滞）

**适合人群**：
- 追求稳健收益的价值投资者
- 看好AI长期趋势的成长投资者
- 退休账户、养老金等长期资金

## 催化剂

- **2024年12月财报**：预计AI广告占比将达25%
- **Google I/O 2025**（5月）：发布新一代AI广告产品
- **竞品失误**：若Meta、TikTok广告业务遇阻，Google将受益

## 风险提示

- 监管限制AI使用用户数据训练广告模型
- 用户隐私保护趋严，cookie淘汰影响广告精准度
- ChatGPT等新搜索方式分流用户注意力
    `
  },
  { 
    id: 16, 
    symbol: 'GOOGL', 
    grade: 'B', 
    title: '财报前的波动率交易 - Straddle策略获利机会', 
    description: 'GOOGL将于1月30日盘后公布Q4财报。历史数据显示，财报日股价平均波动±6.5%，而当前隐含波动率（IV）仅28%，处于过去12个月的35分位。市场预期过于温和，无论财报好坏都可能引发大幅波动。建议采用Long Straddle（买入跨式期权）策略，同时买入Call和Put，赌波动率而非方向。', 
    direction: 'WAIT', 
    duration: '短期事件驱动 (3-5天)', 
    strategy: '波动率套利 + 事件交易',
    model: 'grok',
    timeAgo: '12小时前',
    timestamp: 1701381600000,
    isNew: false,
    fullContent: `
## 投资主题：财报博弈的"稳赚"策略

不赌涨跌，只赌波动。当市场预期过于平静，反而是期权交易的黄金机会。

## 历史财报波动分析

### 过去8个季度财报日表现
| 财报日期 | 盘前价格 | 盘后价格 | 波动幅度 | 方向 |
|---------|---------|---------|---------|------|
| 2024-10-24 | $168 | $175 | +4.2% | 上涨 |
| 2024-07-23 | $182 | $172 | -5.5% | 下跌 |
| 2024-04-25 | $156 | $166 | +6.4% | 上涨 |
| 2024-01-30 | $148 | $141 | -4.7% | 下跌 |
| 2023-10-24 | $138 | $146 | +5.8% | 上涨 |
| 2023-07-25 | $126 | $132 | +4.8% | 上涨 |
| 2023-04-25 | $112 | $105 | -6.3% | 下跌 |
| 2023-01-31 | $102 | $110 | +7.8% | 上涨 |

**关键发现**：
- **平均波动**：±6.5%
- **超过5%的次数**：8次中6次（75%概率）
- **方向不确定**：上涨5次，下跌3次

## 当前市场定价

### 隐含波动率（IV）
- **当前IV**：28%
- **过去12个月均值**：35%
- **分位数**：35%（意味着65%的时间IV比现在高）
- **结论**：市场低估了财报波动风险

### 期权价格
- **2025年2月7日到期Call（$185行权）**：$6.50
- **2025年2月7日到期Put（$165行权）**：$5.80
- **合计成本**：$12.30

## Straddle策略详解

### 策略构建
1. **买入1份Call期权**：行权价$175（当前价），成本$8.50
2. **买入1份Put期权**：行权价$175（当前价），成本$7.80
3. **总成本**：$16.30/股

### 盈亏分析
- **盈亏平衡点**：
  - 上行：$175 + $16.30 = $191.30（+9.3%）
  - 下行：$175 - $16.30 = $158.70（-9.3%）
- **最大亏损**：$16.30（股价不动）
- **理论最大收益**：无限（股价大涨）或$158.70（股价跌至零）

### 实际场景模拟
| 财报后股价 | Call收益 | Put收益 | 总盈亏 | 回报率 |
|-----------|---------|---------|--------|--------|
| $195 (+11%) | $20 | $0 | +$3.70 | +23% |
| $190 (+9%) | $15 | $0 | -$1.30 | -8% |
| $185 (+6%) | $10 | $0 | -$6.30 | -39% |
| $175 (不变) | $0 | $0 | -$16.30 | -100% |
| $165 (-6%) | $0 | $10 | -$6.30 | -39% |
| $160 (-9%) | $0 | $15 | -$1.30 | -8% |
| $155 (-11%) | $0 | $20 | +$3.70 | +23% |

**关键洞察**：
- 只要波动超过±9.3%，策略盈利
- 历史上75%的财报日波动>5%，但我们需要>9.3%才盈利
- 考虑到IV被低估，实际盈利概率约50-60%

## 优化策略：Iron Condor（降低成本）

### 策略构建（适合保守投资者）
1. **买入Call**：$175行权价，成本$8.50
2. **卖出Call**：$195行权价，收入$2.50
3. **买入Put**：$175行权价，成本$7.80
4. **卖出Put**：$155行权价，收入$2.20
5. **净成本**：$11.60（比Straddle便宜$4.70）

### 盈亏分析
- **最大收益**：$8.40（股价涨至$195或跌至$155）
- **最大亏损**：$11.60（股价不动）
- **盈亏平衡点**：$186.60 或 $163.40

## 财报预期分析

### 市场共识预期
- **EPS**：$1.85（同比+12%）
- **营收**：$880亿（同比+11%）
- **Cloud盈利**：$30亿（首次超预期可能性高）

### 超预期因素
- YouTube广告受益于假日购物季
- Gemini订阅用户突破500万
- Waymo公布详细财务数据

### 不及预期风险
- 搜索广告增速放缓
- AI投入拖累利润率
- 反垄断罚款计提

## 执行建议

### 时间表
- **1月27日**：建立Straddle仓位（财报前3天）
- **1月30日盘后**：财报发布
- **1月31日开盘**：根据波动幅度决策
  - 若股价波动>8%，立即平仓获利
  - 若波动<5%，持有至2月3日等待进一步波动

### 仓位控制
- **建议投入**：总资产的3-5%
- **最大亏损承受**：假设$16.30全部亏损，占总资产<2%

### 风险管理
- **止损**：若财报后股价几乎不动，次日开盘立即止损
- **止盈**：盈利超过50%，减仓50%锁定利润

## 风险提示

- 财报后波动可能不及预期，导致策略亏损
- IV Crush（波动率坍缩）会快速侵蚀期权价值
- 黑天鹅事件（如CEO辞职）可能导致单边暴涨/暴跌，Straddle反而吃亏
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

// --- Computed: Filtered Strategies (应用所有筛选器) ---
const filteredStrategies = computed(() => {
  let strategies = relatedStrategies.value

  // 按模型来源筛选
  if (selectedModels.value.length > 0) {
    strategies = strategies.filter(s => 
      s.model && selectedModels.value.includes(s.model)
    )
  }

  // 按方向筛选
  if (selectedDirections.value.length > 0) {
    strategies = strategies.filter(s => 
      selectedDirections.value.includes(s.direction)
    )
  }

  // 按持续时间筛选
  if (selectedDurations.value.length > 0) {
    strategies = strategies.filter(s => {
      // 匹配包含关键词的duration
      return selectedDurations.value.some(d => 
        s.duration && s.duration.toLowerCase().includes(d.toLowerCase())
      )
    })
  }

  // 按评级筛选
  if (selectedGrades.value.length > 0) {
    strategies = strategies.filter(s => 
      selectedGrades.value.includes(s.grade)
    )
  }

  return strategies
})

// --- Computed: Has Active Filters ---
const hasActiveFilters = computed(() => {
  return selectedModels.value.length > 0 || 
         selectedDirections.value.length > 0 || 
         selectedDurations.value.length > 0 || 
         selectedGrades.value.length > 0
})

// --- Methods: Filter Toggle Functions ---
const toggleModelFilter = (modelId) => {
  const index = selectedModels.value.indexOf(modelId)
  if (index === -1) {
    selectedModels.value.push(modelId)
  } else {
    selectedModels.value.splice(index, 1)
  }
}

const toggleDirectionFilter = (direction) => {
  const index = selectedDirections.value.indexOf(direction)
  if (index === -1) {
    selectedDirections.value.push(direction)
  } else {
    selectedDirections.value.splice(index, 1)
  }
}

const toggleDurationFilter = (duration) => {
  const index = selectedDurations.value.indexOf(duration)
  if (index === -1) {
    selectedDurations.value.push(duration)
  } else {
    selectedDurations.value.splice(index, 1)
  }
}

const toggleGradeFilter = (grade) => {
  const index = selectedGrades.value.indexOf(grade)
  if (index === -1) {
    selectedGrades.value.push(grade)
  } else {
    selectedGrades.value.splice(index, 1)
  }
}

const clearAllFilters = () => {
  selectedModels.value = []
  selectedDirections.value = []
  selectedDurations.value = []
  selectedGrades.value = []
}

// --- Helper: Get Model Config ---
const getModelConfig = (modelId) => {
  return aiModels.find(m => m.id === modelId)
}

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
  relatedPlans.value = generateMockPlans(strategy.id)
  showStrategyModal.value = true
}

const closeStrategyModal = () => {
  showStrategyModal.value = false
}

// --- Methods: Plan Management ---
const generateMockPlans = (strategyId) => {
  // 根据不同策略生成对应的交易计划
  const strategyPlansMap = {
    // AI基础设施策略的计划
    '1': [
      {
        id: `plan-1-001`,
        title: `${symbol.value} AI转型长线持仓计划`,
        strategyId: '1',
        capital: 50000,
        createdAt: '01/10',
        targetReturn: '+35%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '首次建仓', amount: '30%', price: '$172.50', note: '2024年1月' },
          { action: '加仓', amount: '20%', price: '$178.20', note: 'Gemini发布后' },
          { action: '待加仓', amount: '50%', price: '$182+', note: '等待回调' }
        ]
      },
      {
        id: `plan-1-002`,
        title: `${symbol.value} AI主题轮动配置`,
        strategyId: '1',
        capital: 120000,
        createdAt: '12/28',
        targetReturn: '+28%',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '核心持仓', amount: '60%', price: '$168-175', note: '长期不动' },
          { action: '波段仓', amount: '40%', price: '$180', note: '已止盈' }
        ]
      }
    ],
    
    // YouTube广告策略的计划
    '8': [
      {
        id: `plan-8-001`,
        title: `${symbol.value} YouTube增长押注计划`,
        strategyId: '8',
        capital: 30000,
        createdAt: '01/12',
        targetReturn: '+18%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '已建仓', amount: '70%', price: '$174.80', note: '主力仓位' },
          { action: '待加仓', amount: '30%', price: '-', note: '财报后决定' }
        ]
      }
    ],
    
    // Waymo自动驾驶策略的计划
    '11': [
      {
        id: `plan-11-001`,
        title: `${symbol.value} Waymo长期期权计划`,
        strategyId: '11',
        capital: 15000,
        createdAt: '01/05',
        targetReturn: '+50%',
        riskLevel: 'high',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '买入Call期权', amount: '100%', price: '$180行权/2025年12月', note: '赌分拆上市' },
          { action: '持有观察', amount: '-', price: '-', note: '等待催化剂' }
        ]
      }
    ],
    
    // YouTube Shorts策略的计划
    '12': [
      {
        id: `plan-12-001`,
        title: `${symbol.value} Shorts货币化波段计划`,
        strategyId: '12',
        capital: 25000,
        createdAt: '01/14',
        targetReturn: '+12%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '建仓', amount: '50%', price: '$176.20', note: '首次进场' },
          { action: '待加仓', amount: '30%', price: '$173以下', note: '逢低吸纳' },
          { action: '预留', amount: '20%', price: '-', note: '机动资金' }
        ]
      },
      {
        id: `plan-12-002`,
        title: `${symbol.value} Shorts创作者大会事件套利`,
        strategyId: '12',
        capital: 10000,
        createdAt: '01/16',
        targetReturn: '+8%',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '短线仓位', amount: '100%', price: '$178.50', note: '1月20日建仓' },
          { action: '止盈目标', amount: '-', price: '$185+', note: '大会利好兑现' }
        ]
      }
    ],
    
    // GCP云计算策略的计划
    '13': [
      {
        id: `plan-13-001`,
        title: `${symbol.value} GCP盈利拐点突破计划`,
        strategyId: '13',
        capital: 35000,
        createdAt: '01/13',
        targetReturn: '+15%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '首次建仓', amount: '60%', price: '$177.30', note: '财报后进场' },
          { action: '加仓', amount: '20%', price: '$180.50', note: '突破$185前' },
          { action: '待执行', amount: '20%', price: '$185+', note: '突破追涨' }
        ]
      }
    ],
    
    // 反垄断风险对冲策略的计划
    '14': [
      {
        id: `plan-14-001`,
        title: `${symbol.value} 反垄断风险对冲组合`,
        strategyId: '14',
        capital: 20000,
        createdAt: '01/08',
        targetReturn: '保本为主',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '持有正股', amount: '50%', price: '$175均价', note: '长期底仓' },
          { action: '买入Put保护', amount: '10%权利金', price: '$165行权', note: '下跌保险' },
          { action: '卖出Call', amount: '-', price: '$195行权', note: '补贴成本' }
        ]
      }
    ],
    
    // 搜索广告AI策略的计划
    '15': [
      {
        id: `plan-15-001`,
        title: `${symbol.value} AI广告核心持仓计划`,
        strategyId: '15',
        capital: 80000,
        createdAt: '12/20',
        targetReturn: '+30%',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '核心仓位', amount: '80%', price: '$168-176', note: '分批建仓完成' },
          { action: '机动仓位', amount: '20%', price: '-', note: '等待回调' }
        ]
      },
      {
        id: `plan-15-002`,
        title: `${symbol.value} ROAS提升长期投资`,
        strategyId: '15',
        capital: 150000,
        createdAt: '11/15',
        targetReturn: '+40%',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '持有中', amount: '100%', price: '$165均价', note: '退休账户配置' },
          { action: '计划持有', amount: '-', price: '-', note: '至2025年底' }
        ]
      }
    ],
    
    // 财报波动率套利策略的计划
    '16': [
      {
        id: `plan-16-001`,
        title: `${symbol.value} Q4财报Straddle期权策略`,
        strategyId: '16',
        capital: 12000,
        createdAt: '01/15',
        targetReturn: '+25%',
        riskLevel: 'high',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '买入Call期权', amount: '50%', price: '$175行权/$8.5权利金', note: '2月7日到期' },
          { action: '买入Put期权', amount: '50%', price: '$175行权/$7.8权利金', note: '同日到期' }
        ]
      }
    ],
    
    // 默认通用计划（适用于其他策略）
    'default': [
      {
        id: `plan-${strategyId}-001`,
        title: `${symbol.value} 基础跟随计划`,
        strategyId: strategyId,
        capital: 20000,
        createdAt: '01/10',
        targetReturn: '+10%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '已建仓', amount: '50%', price: '$176.50', note: '初始仓位' },
          { action: '待加仓', amount: '50%', price: '-', note: '等待信号' }
        ]
      },
      {
        id: `plan-${strategyId}-002`,
        title: `${symbol.value} 激进突破计划`,
        strategyId: strategyId,
        capital: 15000,
        createdAt: '01/12',
        targetReturn: '+25%',
        riskLevel: 'high',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '突破买入', amount: '100%', price: '$185.00', note: '关键阻力位' }
        ]
      },
      {
        id: `plan-${strategyId}-003`,
        title: `${symbol.value} 长期定投计划`,
        strategyId: strategyId,
        capital: 50000,
        createdAt: '01/01',
        targetReturn: '+15%/年',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '定投', amount: '10%', price: '每月1日', note: '长期持有' }
        ]
      },
      {
        id: `plan-${strategyId}-004`,
        title: `${symbol.value} 财报对冲计划`,
        strategyId: strategyId,
        capital: 10000,
        createdAt: '01/20',
        targetReturn: '保本',
        riskLevel: 'low',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '买入Put', amount: '5%', price: '$160', note: '防守' }
        ]
      },
      {
        id: `plan-${strategyId}-005`,
        title: `${symbol.value} 技术面回调计划`,
        strategyId: strategyId,
        capital: 25000,
        createdAt: '01/15',
        targetReturn: '+12%',
        riskLevel: 'medium',
        isExpanded: false,
        status: 'active',
        positions: [
          { action: '挂单买入', amount: '50%', price: '$170.00', note: '支撑位' }
        ]
      }
    ]
  }
  
  // 获取对应策略的计划，如果没有则返回默认计划
  const plans = strategyPlansMap[strategyId] || strategyPlansMap['default']
  
  // 总是返回所有计划以展示滚动效果
  return plans
}

const togglePlanExpand = (plan) => {
  plan.isExpanded = !plan.isExpanded
}

const generatePlanForStrategy = (strategy) => {
  // 跳转到计划生成页面，预填充策略信息
  console.log('Generate plan for strategy:', strategy)
  // TODO: 实现跳转到计划生成页面
  // router.push({ path: '/planning', query: { strategyId: strategy.id } })
}

const viewPlanDetail = (plan) => {
  console.log('View plan detail:', plan)
  // TODO: 实现跳转到计划详情页面
  // router.push({ path: '/plans', query: { id: plan.id } })
}

const editPlan = (plan) => {
  console.log('Edit plan:', plan)
  // TODO: 实现编辑计划功能
}

const viewAllPlans = () => {
  console.log('View all plans')
  // TODO: 跳转到计划列表页面
  // router.push({ path: '/plans', query: { strategyId: selectedStrategy.value.id } })
}

const navigateToGenerateStrategy = (stockSymbol) => {
  // 跳转到策略生成页面，并携带股票代码参数
  router.push({
    path: '/opportunity',
    query: { symbol: stockSymbol }
  })
}

// --- Chat Logic ---
const chatInput = ref('')
const chatHistory = ref([])
const isChatLoading = ref(false)

const quickPrompts = [
  '这个策略的主要风险是什么？',
  '关键的买入信号有哪些？',
  '如何设置止损位？',
  '生成详细的交易计划'
]

const useQuickPrompt = (prompt) => {
  chatInput.value = prompt
  sendChatMessage()
}

const sendChatMessage = async () => {
  if (!chatInput.value.trim()) return

  const userMessage = chatInput.value
  chatHistory.value.push({
    role: 'user',
    content: userMessage
  })
  chatInput.value = ''
  isChatLoading.value = true

  // Simulate AI response
  setTimeout(() => {
    chatHistory.value.push({
      role: 'assistant',
      content: `针对您的提问 "${userMessage}"，基于当前策略报告，我的分析如下：\n\n该策略的核心逻辑在于利用市场对短期波动和长期基本面之间的认知偏差。您提到的点确实是关键风险因素之一，建议密切关注后续财报数据验证。`
    })
    isChatLoading.value = false
    // Scroll to bottom
    nextTick(() => {
      const chatContainer = document.getElementById('chat-messages')
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight
      }
    })
  }, 1500)
}

const highlightedThemeId = ref(null)

onMounted(() => {
  // Handle Tab switching
  if (route.query.tab) {
    activeTab.value = route.query.tab
  } else {
    activeTab.value = 'attribution'
  }

  // Handle Strategies Tab
  if (route.query.tab === 'strategies') {
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
  }

  // Handle Themes Tab
  if (route.query.tab === 'themes' && route.query.highlightThemeId) {
    highlightedThemeId.value = parseInt(route.query.highlightThemeId)
    const theme = relatedThemes.value.find(t => t.id === highlightedThemeId.value)
    if (theme) {
      theme.isExpanded = true
      nextTick(() => {
        const el = document.getElementById(`theme-${theme.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
  }

  // In a real app, fetch data based on route.params.id
  console.log('Fetching data for', symbol.value)
})
</script>

<style scoped>
/* Modal Animation */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal-in {
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Expand/Collapse Animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* Custom Scrollbar for Webkit browsers */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #444;
}

/* Markdown Content Styling */
.markdown-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #2a2a2a;
}

.markdown-content :deep(h3) {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e5e5e5;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.markdown-content :deep(h4) {
  font-size: 1rem;
  font-weight: 600;
  color: #d4d4d4;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
  color: #d1d5db;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  color: #d1d5db;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: #fff;
}

.markdown-content :deep(em) {
  font-style: italic;
  color: #9ca3af;
}

.markdown-content :deep(code) {
  background: #1a1a1a;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.9em;
  color: #60a5fa;
  font-family: 'Courier New', monospace;
}

.markdown-content :deep(pre) {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.markdown-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #d1d5db;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.markdown-content :deep(thead) {
  background: #1a1a1a;
  border-bottom: 2px solid #2a2a2a;
}

.markdown-content :deep(th) {
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #fff;
  border: 1px solid #2a2a2a;
}

.markdown-content :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid #2a2a2a;
  color: #d1d5db;
}

.markdown-content :deep(tbody tr:hover) {
  background: #1a1a1a;
}

.markdown-content :deep(blockquote) {
  border-left: 3px solid #3b82f6;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  color: #9ca3af;
  font-style: italic;
}

.markdown-content :deep(hr) {
  border: none;
  border-top: 1px solid #2a2a2a;
  margin: 2rem 0;
}

.markdown-content :deep(a) {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s;
}

.markdown-content :deep(a:hover) {
  color: #93c5fd;
  text-decoration: underline;
}
</style>
