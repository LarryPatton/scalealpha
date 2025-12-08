<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Tab切换区域 -->
    <div class="bg-[#2a2a2a] border-b border-[#404040] py-3">
      <div class="max-w-7xl mx-auto px-6 flex justify-center">
        <div class="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333] w-fit">
          <button 
            @click="switchTab('generate')"
            class="px-6 py-2 text-sm rounded-md transition-all"
            :class="activeTab === 'generate' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
          >
            生成策略
          </button>
          <button 
            @click="switchTab('queue')"
            class="px-6 py-2 text-sm rounded-md transition-all"
            :class="activeTab === 'queue' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
          >
            生成队列
          </button>
          <button 
            @click="switchTab('mystrategy')"
            class="px-6 py-2 text-sm rounded-md transition-all"
            :class="activeTab === 'mystrategy' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
          >
            查看我的策略
          </button>
          <button 
            @click="switchTab('myplan')"
            class="px-6 py-2 text-sm rounded-md transition-all"
            :class="activeTab === 'myplan' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
          >
            查看我的计划
          </button>
        </div>
      </div>
    </div>


    <!-- Main Content -->
    <div v-if="activeTab === 'generate'" class="flex h-[calc(100vh-180px)]">
      <!-- Step 1 & 2 Merged: Stock Selection + Strategy Configuration -->
      <!-- Left Sidebar: Stock Selection -->
      <div class="w-80 bg-[#2a2a2a] border-r border-[#404040] overflow-y-auto">
          <div class="p-4">
            <h2 class="text-lg font-semibold text-white mb-4">股票分类</h2>
            
            <!-- Search Box -->
            <div class="mb-4">
              <div class="relative">
                <input
                  v-model="stockSearchQuery"
                  type="text"
                  placeholder="搜索股票代码或名称..."
                  class="w-full px-3 py-2 pl-9 bg-[#1f1f1f] border border-[#404040] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  @focus="showSearchResults = true"
                  @blur="handleSearchBlur"
                />
                <svg class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <button
                  v-if="stockSearchQuery"
                  @click="clearSearch"
                  class="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-600 hover:bg-gray-500 flex items-center justify-center transition-colors"
                >
                  <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
              
              <!-- Search Results Dropdown -->
              <div
                v-if="showSearchResults && stockSearchQuery && filteredStocks.length > 0"
                class="absolute z-10 w-[272px] mt-1 bg-[#1f1f1f] border border-[#404040] rounded-lg shadow-xl max-h-64 overflow-y-auto"
              >
                <div
                  v-for="stock in filteredStocks"
                  :key="stock.symbol"
                  @mousedown.prevent="addStockFromSearch(stock.symbol)"
                  class="px-3 py-2 hover:bg-[#3a3a3a] cursor-pointer border-b border-[#2a2a2a] last:border-b-0 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-mono text-sm text-white font-semibold">{{ stock.symbol }}</div>
                      <div class="text-xs text-gray-400">{{ stock.name }}</div>
                    </div>
                    <div
                      v-if="selectedStocks.includes(stock.symbol)"
                      class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div v-else class="text-xs text-gray-500">点击添加</div>
                  </div>
                </div>
              </div>
              
              <!-- No Results Message -->
              <div
                v-if="showSearchResults && stockSearchQuery && filteredStocks.length === 0"
                class="absolute z-10 w-[272px] mt-1 bg-[#1f1f1f] border border-[#404040] rounded-lg shadow-xl p-4 text-center"
              >
                <svg class="w-8 h-8 text-gray-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="text-sm text-gray-400">未找到匹配的股票</p>
              </div>
            </div>
            
            <!-- My Holdings Section (Pinned) -->
            <div class="mb-2">
              <button
                @click="toggleCategory('my-holdings')"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span class="font-medium text-white">我的持仓</span>
                  <span class="text-xs text-gray-400">({{ myHoldings.length }})</span>
                </div>
                <svg 
                  :class="['w-4 h-4 text-gray-400 transition-transform', expandedCategories.includes('my-holdings') && 'rotate-180']"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              
              <!-- My Holdings List -->
              <div v-show="expandedCategories.includes('my-holdings')" class="mt-1 ml-4 space-y-1">
                <div
                  v-for="stock in myHoldings"
                  :key="stock.symbol"
                  class="px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] rounded cursor-pointer flex items-center justify-between"
                  @click="selectStock(stock.symbol)"
                >
                  <span>{{ stock.symbol }}</span>
                  <input 
                    type="checkbox" 
                    :checked="selectedStocks.includes(stock.symbol)"
                    @click.stop="toggleStock(stock.symbol)"
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div class="border-t border-[#404040] my-4"></div>

            <!-- Other Categories -->
            <div 
              v-for="category in stockCategories" 
              :key="category.id"
              class="mb-2"
            >
              <button
                @click="toggleCategory(category.id)"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#3a3a3a] transition-colors"
              >
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: category.color }"></div>
                  <span class="text-sm text-gray-300">{{ category.name }}</span>
                  <span class="text-xs text-gray-500">({{ category.stocks.length }})</span>
                </div>
                <svg 
                  :class="['w-4 h-4 text-gray-400 transition-transform', expandedCategories.includes(category.id) && 'rotate-180']"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              
              <!-- Stock List -->
              <div v-show="expandedCategories.includes(category.id)" class="mt-1 ml-4 space-y-1">
                <div
                  v-for="stock in category.stocks"
                  :key="stock"
                  class="px-3 py-2 text-sm text-gray-300 hover:bg-[#3a3a3a] rounded cursor-pointer flex items-center justify-between"
                  @click="selectStock(stock)"
                >
                  <span>{{ stock }}</span>
                  <input 
                    type="checkbox" 
                    :checked="selectedStocks.includes(stock)"
                    @click.stop="toggleStock(stock)"
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Area: Strategy Configuration and Selected Stocks -->
        <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold text-white mb-2">生成投资策略</h1>
          <p class="text-gray-400 mb-6">选择分析策略并生成投资机会报告</p>

          <!-- Selected Stocks Summary -->
          <div class="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-gray-400">已选股票</div>
                  <div class="text-lg font-bold text-white">{{ selectedStocks.length }} 只</div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div v-if="selectedStocks.length > 0" class="flex flex-wrap gap-1 max-w-md">
                  <span
                    v-for="(symbol, index) in selectedStocks.slice(0, 6)"
                    :key="symbol"
                    class="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-mono rounded"
                  >
                    {{ symbol }}
                  </span>
                  <span
                    v-if="selectedStocks.length > 6"
                    class="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded"
                  >
                    +{{ selectedStocks.length - 6 }}
                  </span>
                </div>
                <button
                  v-if="selectedStocks.length === 0"
                  class="px-4 py-2 bg-blue-600/20 text-blue-400 text-sm rounded-lg border border-blue-500/30"
                >
                  ← 请从左侧选择股票
                </button>
              </div>
            </div>
          </div>

          <!-- Strategy Selection Grid -->
          <div class="space-y-6">
              <!-- 主分析框架 -->
              <div>
                <label class="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span class="text-2xl">🎯</span>
                  主分析框架
                </label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    v-for="framework in frameworks"
                    :key="framework.value"
                    @click="toggleFramework(framework.value)"
                    :class="[
                      'relative bg-[#2a2a2a] border-2 rounded-xl p-5 transition-all duration-300 text-left group hover:scale-105',
                      selectedStrategy.frameworks.includes(framework.value)
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/50'
                        : 'border-[#404040] hover:border-blue-400/50 hover:bg-[#333333]'
                    ]"
                  >
                    <!-- 选中标记 -->
                    <div
                      v-if="selectedStrategy.frameworks.includes(framework.value)"
                      class="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    
                    <div class="text-3xl mb-3">{{ framework.icon }}</div>
                    <div class="font-semibold text-white mb-1">{{ framework.label }}</div>
                    <div class="text-xs text-gray-400 leading-relaxed">{{ framework.description }}</div>
                  </button>
                </div>
              </div>

              <!-- 投资周期 -->
              <div>
                <label class="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span class="text-2xl">⏱️</span>
                  投资周期
                </label>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <button
                    v-for="period in periods"
                    :key="period.value"
                    @click="selectedStrategy.period = period.value"
                    :class="[
                      'relative bg-[#2a2a2a] border-2 rounded-xl p-5 transition-all duration-300 text-left hover:scale-105',
                      selectedStrategy.period === period.value
                        ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/50'
                        : 'border-[#404040] hover:border-purple-400/50 hover:bg-[#333333]'
                    ]"
                  >
                    <!-- 选中标记 -->
                    <div
                      v-if="selectedStrategy.period === period.value"
                      class="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center"
                    >
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    
                    <div class="text-2xl mb-3">{{ period.icon }}</div>
                    <div class="font-semibold text-white mb-1">{{ period.label }}</div>
                    <div class="text-xs text-gray-400">{{ period.duration }}</div>
                  </button>
                </div>
              </div>

              <!-- 风险偏好 -->
              <div>
                <label class="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span class="text-2xl">⚖️</span>
                  风险偏好
                </label>
                <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
                  <!-- 风险等级卡片 -->
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <button
                      v-for="risk in risks"
                      :key="risk.value"
                      @click="selectedStrategy.risk = risk.value"
                      :class="[
                        'relative border-2 rounded-xl p-5 transition-all duration-300 text-center hover:scale-105',
                        selectedStrategy.risk === risk.value
                          ? `border-${risk.color}-500 bg-${risk.color}-500/10 shadow-lg shadow-${risk.color}-500/50`
                          : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f] hover:bg-[#2a2a2a]'
                      ]"
                    >
                      <!-- 选中标记 -->
                      <div
                        v-if="selectedStrategy.risk === risk.value"
                        class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        :class="`bg-${risk.color}-500`"
                      >
                        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      
                      <div class="text-3xl mb-2">{{ risk.icon }}</div>
                      <div class="font-semibold text-white mb-1">{{ risk.label }}</div>
                      <div class="text-xs text-gray-400">{{ risk.description }}</div>
                    </button>
                  </div>
                  
                  <!-- 视觉化风险指示器 -->
                  <div class="relative">
                    <div class="h-3 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500 rounded-full"></div>
                    <div class="flex justify-between mt-2 text-xs text-gray-400">
                      <span>保守</span>
                      <span>激进</span>
                    </div>
                    <!-- 当前选择指示器 -->
                    <div
                      v-if="selectedStrategy.risk"
                      class="absolute -top-1 w-5 h-5 bg-white rounded-full border-4 border-[#1a1a1a] transition-all duration-300"
                      :style="{ left: getRiskPosition(selectedStrategy.risk) }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Generate Button -->
            <div class="flex justify-center pt-8 border-t border-[#404040] mt-8">
              <button
                @click="generateReports"
                :disabled="!canGenerate"
                :class="[
                  'group relative px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform',
                  canGenerate
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/50 hover:scale-105 hover:shadow-purple-500/50'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                ]"
              >
                <div class="flex items-center gap-4">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                  <span>{{ canGenerate ? `生成 ${selectedStocks.length} 只股票的投资报告` : '请选择股票和策略' }}</span>
                  <svg
                    v-if="canGenerate"
                    class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

      <!-- Right Sidebar: Reports Panel (Redesigned) -->
      <div 
        :class="[
          'bg-[#2a2a2a] border-l border-[#404040] transition-all duration-300 flex flex-col',
          isSidebarCollapsed ? 'w-16' : 'w-80'
        ]"
      >
        <!-- Collapsed State: Compact Badge Style -->
        <div v-if="isSidebarCollapsed" class="flex-1 flex flex-col items-center justify-center">
          <!-- Clickable Badge Container -->
          <div 
            @click="isSidebarCollapsed = false"
            class="cursor-pointer space-y-2 group"
          >
            <!-- Badge 1: Generating Count (Blue) -->
            <div class="bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg px-2 py-3 transition-all hover:shadow-lg hover:shadow-blue-500/20">
              <div class="flex flex-col items-center gap-1.5">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span class="text-blue-400 font-bold text-base">{{ inProgressReports.length }}</span>
              </div>
            </div>
            
            <!-- Badge 2: Completed Count (Green) -->
            <div class="bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg px-2 py-3 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <div class="flex flex-col items-center gap-1.5">
                <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-green-400 font-bold text-base">{{ completedReports.length }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Expanded State: Full sidebar content -->
        <div v-else class="flex-1 flex flex-col overflow-hidden">
          <!-- Scrollable content area -->
          <div class="flex-1 overflow-y-auto p-4 relative">
            <!-- Collapse Button (Floating) -->
            <button
              @click="isSidebarCollapsed = true"
              class="absolute top-2 right-2 z-10 w-7 h-7 bg-[#1f1f1f] hover:bg-[#333333] rounded-md transition-all flex items-center justify-center group shadow-lg"
              title="折叠侧边栏"
            >
              <svg class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Module 1: 已生成的内容 (Completed Reports) -->
            <div class="mb-6">
              <!-- Module Header - Collapsible -->
              <button
                @click="toggleSection('completed')"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#333333] transition-colors mb-3 group"
              >
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <h4 class="text-xs font-semibold text-green-400">已生成的内容</h4>
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium bg-green-500/20 text-green-400">
                    {{ completedReports.length }}
                  </span>
                </div>
                <svg 
                  :class="[
                    'w-4 h-4 text-gray-400 group-hover:text-white transition-all',
                    expandedSections.completed ? 'rotate-180' : ''
                  ]"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              
              <!-- Module Content -->
              <div v-show="expandedSections.completed">
                <div v-if="completedReports.length > 0" class="space-y-2">
                  <div
                    v-for="report in filteredIndividualReports"
                    :key="'completed-' + report.symbol"
                    @click="viewGeneratedReport(report)"
                    class="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 rounded-lg p-3 cursor-pointer hover:border-green-500/60 hover:from-green-500/20 transition-all group"
                  >
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <div class="font-mono text-sm font-bold text-green-400">{{ report.symbol }}</div>
                        <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <div class="text-xs font-bold text-green-400">+{{ report.expectedReturn }}%</div>
                    </div>
                    <div class="text-xs text-gray-400 mb-2">{{ report.stockName }}</div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-gray-500">{{ report.status }}</span>
                      <span class="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">点击查看 →</span>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6">
                  <p class="text-xs text-gray-500">暂无已生成的内容</p>
                </div>
              </div>
            </div>

            <!-- Module 2: 正在生成中 (Generating Reports) -->
            <div>
              <!-- Module Header - Collapsible -->
              <button
                @click="toggleSection('generating')"
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#333333] transition-colors mb-3 group"
              >
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <h4 class="text-xs font-semibold text-blue-400">正在生成中</h4>
                  <span class="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500/20 text-blue-400">
                    {{ inProgressReports.length }}
                  </span>
                </div>
                <svg 
                  :class="[
                    'w-4 h-4 text-gray-400 group-hover:text-white transition-all',
                    expandedSections.generating ? 'rotate-180' : ''
                  ]"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
              
              <!-- Module Content -->
              <div v-show="expandedSections.generating">
                <div v-if="inProgressReports.length > 0" class="space-y-2">
                  <div
                    v-for="report in inProgressReports"
                    :key="'generating-' + report.symbol"
                    class="bg-[#1f1f1f] border border-[#404040] rounded-lg p-3"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="font-mono text-sm font-bold text-blue-400">{{ report.symbol }}</div>
                      <div class="text-xs text-gray-400">{{ report.progress }}%</div>
                    </div>
                    <div class="text-xs text-gray-500 mb-2">{{ report.stockName }}</div>
                    <div class="w-full bg-[#333333] rounded-full h-1.5 mb-2">
                      <div 
                        class="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        :style="{ width: `${report.progress}%` }"
                      ></div>
                    </div>
                    <div class="text-xs text-gray-500">{{ report.status }}</div>
                  </div>
                </div>
                <div v-else class="text-center py-6">
                  <p class="text-xs text-gray-500">暂无正在生成的内容</p>
                </div>
              </div>
            </div>

            <!-- Empty State (when both modules are empty) -->
            <div v-if="generatingReports.length === 0" class="text-center py-12">
              <svg class="w-16 h-16 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p class="text-sm text-gray-500">暂无报告</p>
              <p class="text-xs text-gray-600 mt-1">选择股票开始生成</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: 生成队列 -->
    <div v-else-if="activeTab === 'queue'" class="min-h-[calc(100vh-240px)]">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Sub-Tab Navigation -->
        <div class="flex items-center justify-between mb-6">
          <!-- Sub-Tabs -->
          <div class="flex gap-1 bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
            <button
              @click="queueSubTab = 'pending'"
              :class="[
                'px-4 py-2 text-sm rounded-md transition-all font-medium',
                queueSubTab === 'pending'
                  ? 'bg-[#333] text-white shadow'
                  : 'text-gray-400 hover:text-gray-300'
              ]"
            >
              队列中
              <span v-if="executionPlanBatches.filter(b => b.status === 'pending').length > 0" class="ml-2 px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-xs font-bold">
                {{ executionPlanBatches.filter(b => b.status === 'pending').length }}
              </span>
            </button>
            <button
              @click="queueSubTab = 'processing'"
              :class="[
                'px-4 py-2 text-sm rounded-md transition-all font-medium',
                queueSubTab === 'processing'
                  ? 'bg-[#333] text-white shadow'
                  : 'text-gray-400 hover:text-gray-300'
              ]"
            >
              正在生成
              <span v-if="executionPlanBatches.filter(b => b.status === 'processing').length + inProgressReports.length > 0" class="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                {{ executionPlanBatches.filter(b => b.status === 'processing').length + inProgressReports.length }}
              </span>
            </button>
            <button
              @click="queueSubTab = 'completed'"
              :class="[
                'px-4 py-2 text-sm rounded-md transition-all font-medium',
                queueSubTab === 'completed'
                  ? 'bg-[#333] text-white shadow'
                  : 'text-gray-400 hover:text-gray-300'
              ]"
            >
              已生成
              <span v-if="executionPlanBatches.filter(b => b.status === 'completed' || b.status === 'failed').length + completedReports.length > 0" class="ml-2 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                {{ executionPlanBatches.filter(b => b.status === 'completed' || b.status === 'failed').length + completedReports.length }}
              </span>
            </button>
          </div>

          <!-- Type Filter Pills -->
          <div class="flex gap-2">
            <button
              @click="setTypeFilter('all')"
              :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                queueTypeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#404040]'
              ]"
            >
              全部
            </button>
            <button
              @click="setTypeFilter('strategy')"
              :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                queueTypeFilter === 'strategy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#404040]'
              ]"
            >
              策略
            </button>
            <button
              @click="setTypeFilter('plan')"
              :class="[
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
                queueTypeFilter === 'plan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#404040]'
              ]"
            >
              计划
            </button>
          </div>
        </div>

        <!-- 统计信息栏和全局控制 -->
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-8">
          <div class="flex items-center justify-between">
            <!-- 统计信息 -->
            <div class="flex items-center gap-8">
              <div class="text-center">
                <div class="text-sm text-gray-400 mb-2">正在生成</div>
                <div class="text-3xl font-bold text-blue-400">{{ generatingCount }}</div>
              </div>
              <div class="w-px h-12 bg-[#404040]"></div>
              <div class="text-center">
                <div class="text-sm text-gray-400 mb-2">已完成</div>
                <div class="text-3xl font-bold text-green-400">{{ completedCount }}</div>
              </div>
            </div>

            <!-- 全局控制按钮 -->
            <div class="flex items-center gap-3">
              <button 
                @click="resumeAllQueueReports"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                :disabled="generatingCount === 0"
                :class="{ 'opacity-50 cursor-not-allowed': generatingCount === 0 }"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                </svg>
                全部开始
              </button>
              <button 
                @click="pauseAllQueueReports"
                class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2"
                :disabled="generatingCount === 0"
                :class="{ 'opacity-50 cursor-not-allowed': generatingCount === 0 }"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                全部暂停
              </button>
            </div>
          </div>
        </div>

        <!-- Execution Plan Batches Section -->
        <div v-if="filteredBatches.length > 0" class="mb-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h2 class="text-xl font-bold text-white">批量生成任务</h2>
            <span class="text-sm text-gray-400">({{ filteredBatches.length }})</span>
          </div>

          <!-- Batch Cards -->
          <div class="space-y-6">
            <div
              v-for="batch in filteredBatches"
              :key="batch.batchId"
              class="bg-[#0f0f0f] border border-[#404040] rounded-xl overflow-hidden hover:border-[#555] transition-colors"
            >
              <!-- Batch Header -->
              <div class="px-6 py-4 bg-[#1a1a1a] border-b border-[#404040] flex items-center justify-between">
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <h3 class="text-lg font-bold text-white">
                      {{ batch.type === 'execution-plan' ? '执行计划生成' : '策略报告生成' }}
                    </h3>
                    <!-- Type Badge -->
                    <span :class="[
                      'px-2.5 py-0.5 rounded-md text-xs font-bold border',
                      batch.type === 'execution-plan' 
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' 
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                    ]">
                      {{ batch.type === 'execution-plan' ? '📋 计划' : '📊 策略' }}
                    </span>
                    <!-- Status Badge -->
                    <span :class="[
                      'px-2 py-0.5 rounded-full text-xs font-bold',
                      batch.status === 'pending' ? 'bg-gray-500/20 text-gray-400' :
                      batch.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                      batch.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    ]">
                      {{ 
                        batch.status === 'pending' ? '等待中' :
                        batch.status === 'processing' ? '生成中' :
                        batch.status === 'completed' ? '已完成' :
                        '失败'
                      }}
                    </span>
                  </div>
                  <p class="text-sm text-gray-400">
                    共 {{ batch.totalCount }} 个项目 · {{ batch.completedCount }} 已完成
                  </p>
                </div>
                <div v-if="batch.status === 'processing' || batch.status === 'pending'" class="text-right">
                  <div class="text-sm text-gray-500 mb-1">预计剩余</div>
                  <div class="text-xl font-bold text-blue-400">
                    {{ Math.ceil((batch.totalCount - batch.completedCount) * 12) }}秒
                  </div>
                </div>
              </div>

              <!-- Overall Progress Bar -->
              <div v-if="batch.status === 'processing' || batch.status === 'pending'" class="px-6 py-3 bg-[#0f0f0f]">
                <div class="flex items-center justify-between text-sm mb-2">
                  <span class="text-gray-400">整体进度</span>
                  <span class="text-white font-medium">
                    {{ Math.round((batch.completedCount / batch.totalCount) * 100) }}%
                  </span>
                </div>
                <div class="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                    :style="{ width: ((batch.completedCount / batch.totalCount) * 100) + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Items List -->
              <div class="px-6 py-4 space-y-3">
                <div
                  v-for="item in batch.items"
                  :key="item.id"
                  class="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] hover:border-[#404040] transition-colors"
                >
                  <!-- Status Icon -->
                  <div class="flex-shrink-0">
                    <div v-if="item.status === 'completed'" class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div v-else-if="item.status === 'processing'" class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <div v-else-if="item.status === 'failed'" class="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div v-else class="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Item Info -->
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="text-base font-bold text-white">{{ item.symbol }}</h4>
                      <span v-if="item.grade" :class="[
                        'px-2 py-0.5 rounded text-xs font-bold',
                        item.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                        item.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      ]">
                        {{ item.grade }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-400">{{ item.currentStep || item.stockName }}</p>
                  </div>

                  <!-- Progress -->
                  <div class="text-right">
                    <div class="text-lg font-bold" :class="[
                      item.status === 'completed' ? 'text-green-400' :
                      item.status === 'processing' ? 'text-blue-400' :
                      item.status === 'failed' ? 'text-red-400' :
                      'text-gray-400'
                    ]">
                      {{ item.progress || 0 }}%
                    </div>
                    <div class="text-xs text-gray-500">{{ item.duration || 0 }}s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 正在生成的策略 (按配置分组) -->
        <div v-if="queueSubTab === 'processing' && filteredIndividualReports.length > 0" class="mb-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h2 class="text-xl font-bold text-white">正在生成的策略</h2>
            <span class="text-sm text-gray-400">({{ filteredIndividualReports.length }})</span>
          </div>

          <!-- 按配置分组显示 -->
          <div v-if="groupedReports.length > 0" class="space-y-6">
            <div v-for="(group, groupIndex) in groupedReports" :key="groupIndex" class="border border-[#404040] rounded-xl overflow-hidden">
              <!-- 配置标题 -->
              <div class="bg-[#2a2a2a] border-b border-[#404040] px-6 py-4">
                <h3 class="text-lg font-semibold text-white mb-3">策略配置</h3>
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <div class="text-xs text-gray-500 mb-1">分析框架</div>
                    <div class="text-sm text-blue-400 font-medium">{{ group.config.framework }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">投资周期</div>
                    <div class="text-sm text-green-400 font-medium">{{ group.config.period }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">风险偏好</div>
                    <div class="text-sm text-orange-400 font-medium">{{ group.config.riskPreference }}</div>
                  </div>
                </div>
              </div>

              <!-- 该配置下的策略列表 -->
              <div class="bg-[#1f1f1f] divide-y divide-[#404040]">
                <div
                  v-for="report in group.reports"
                  :key="report.symbol"
                  class="p-6 hover:bg-[#252525] transition-all"
                >
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-4 flex-1">
                      <!-- 图标 -->
                      <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                        <svg v-if="!report.isPaused" class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        <svg v-else class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                      </div>

                      <!-- 策略信息 -->
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-1">
                          <span class="font-mono text-lg font-bold text-blue-400">{{ report.symbol }}</span>
                          <span class="text-gray-300">{{ report.stockName }}</span>
                          <span v-if="report.isPaused" class="px-2 py-1 bg-orange-600/20 border border-orange-600 text-orange-400 text-xs rounded">
                            已暂停
                          </span>
                        </div>
                        <div class="text-sm text-gray-400">{{ report.status }}</div>
                        
                        <!-- 预估剩余时间 -->
                        <div v-if="!report.isPaused && report.estimatedTimeRemaining > 0" class="flex items-center gap-2 mt-2">
                          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span class="text-xs text-gray-500">预估剩余: {{ formatTimeRemaining(report.estimatedTimeRemaining) }}</span>
                        </div>
                      </div>

                      <!-- 进度 -->
                      <div class="text-right mr-4">
                        <div class="text-2xl font-bold text-blue-400">{{ report.progress }}%</div>
                        <div class="text-xs text-gray-500">{{ report.isPaused ? '已暂停' : '处理中...' }}</div>
                      </div>

                      <!-- 操作按钮 -->
                      <div class="flex items-center gap-2">
                        <button 
                          v-if="!report.isPaused"
                          @click="pauseQueueReport(report.symbol)"
                          class="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                          title="暂停"
                        >
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                        <button 
                          v-else
                          @click="resumeQueueReport(report.symbol)"
                          class="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                          title="继续"
                        >
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                        <button 
                          @click="deleteQueueReport(report.symbol)"
                          class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="删除"
                        >
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 进度条 -->
                  <div class="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                    <div 
                      class="h-2 rounded-full transition-all duration-500 ease-out"
                      :class="report.isPaused ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'"
                      :style="{ width: `${report.progress}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Fallback: 如果分组为空，显示简单列表 -->
          <div v-else class="space-y-4">
            <div
              v-for="report in inProgressReports"
              :key="report.symbol"
              class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 hover:border-blue-500/50 transition-all"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-4 flex-1">
                  <!-- 图标 -->
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <svg v-if="!report.isPaused" class="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <svg v-else class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </div>

                  <!-- 策略信息 -->
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-1">
                      <span class="font-mono text-lg font-bold text-blue-400">{{ report.symbol }}</span>
                      <span class="text-gray-300">{{ report.stockName }}</span>
                      <span v-if="report.isPaused" class="px-2 py-1 bg-orange-600/20 border border-orange-600 text-orange-400 text-xs rounded">
                        已暂停
                      </span>
                    </div>
                    <div class="text-sm text-gray-400">{{ report.status }}</div>
                    
                    <!-- 配置信息 -->
                    <div v-if="report.config" class="flex items-center gap-3 mt-2 text-xs">
                      <span class="text-blue-400">{{ report.config.framework }}</span>
                      <span class="text-green-400">{{ report.config.period }}</span>
                      <span class="text-orange-400">风险: {{ report.config.riskPreference }}</span>
                    </div>
                    
                    <!-- 预估剩余时间 -->
                    <div v-if="!report.isPaused && report.estimatedTimeRemaining > 0" class="flex items-center gap-2 mt-2">
                      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-xs text-gray-500">预估剩余: {{ formatTimeRemaining(report.estimatedTimeRemaining) }}</span>
                    </div>
                  </div>

                  <!-- 进度 -->
                  <div class="text-right mr-4">
                    <div class="text-2xl font-bold text-blue-400">{{ report.progress }}%</div>
                    <div class="text-xs text-gray-500">{{ report.isPaused ? '已暂停' : '处理中...' }}</div>
                  </div>

                  <!-- 操作按钮 -->
                  <div class="flex items-center gap-2">
                    <button 
                      v-if="!report.isPaused"
                      @click="pauseQueueReport(report.symbol)"
                      class="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                      title="暂停"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button 
                      v-else
                      @click="resumeQueueReport(report.symbol)"
                      class="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      title="继续"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteQueueReport(report.symbol)"
                      class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      title="删除"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- 进度条 -->
              <div class="w-full bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                <div 
                  class="h-2 rounded-full transition-all duration-500 ease-out"
                  :class="report.isPaused ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'"
                  :style="{ width: `${report.progress}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 已完成的策略 -->
        <div v-if="queueSubTab === 'completed' && filteredIndividualReports.length > 0">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <h2 class="text-xl font-bold text-white">已完成的策略</h2>
              <span class="text-sm text-gray-400">({{ filteredIndividualReports.length }})</span>
            </div>

            <!-- Selection Controls -->
            <div v-if="filteredIndividualReports.length > 0" class="flex items-center gap-4">
              <button
                @click="toggleSelectAllCompleted"
                class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                {{ selectedCompletedReportIds.length === filteredIndividualReports.length ? '取消全选' : '全选' }}
              </button>
              <span class="text-sm text-gray-400">
                {{ selectedCompletedReportIds.length > 0 ? `已选择 ${selectedCompletedReportIds.length} 份报告` : '点击报告卡片查看详细分析' }}
              </span>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredIndividualReports.length === 0" class="text-center py-16">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full mb-6">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">暂无已完成的策略</h3>
            <p class="text-gray-400 mb-6">开始生成您的第一个投资策略</p>
            <button
              @click="switchTab('generate')"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              前往生成策略
            </button>
          </div>

          <!-- 策略卡片网格 (使用 OpportunityReportCard) -->
          <div v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <OpportunityReportCard
                v-for="report in filteredIndividualReports"
                :key="report.id"
                :report="report"
                :is-selected="selectedCompletedReportIds.includes(report.id)"
                @click="viewReportDetail(report)"
                @view-detail="navigateToReportDetail(report)"
                @toggle-select="toggleCompletedReportSelection(report.id)"
              />
            </div>

            <!-- Save Button -->
            <div v-if="selectedCompletedReportIds.length > 0" class="mt-8 flex justify-center">
              <button
                @click="showSaveDialog = true"
                class="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all flex items-center gap-3 shadow-lg hover:shadow-green-500/30 hover:scale-105"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                </svg>
                <span class="font-semibold">保存选中报告 ({{ selectedCompletedReportIds.length }})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 3: 查看我的策略 -->
    <div v-else-if="activeTab === 'mystrategy'" class="flex h-[calc(100vh-180px)]">
      <!-- Left Sidebar: Collections -->
      <div class="w-56 bg-[#1a1a1a] border-r border-[#404040] flex flex-col">
        <!-- Collections Header -->
        <div class="p-4 border-b border-[#404040] flex items-center justify-between">
          <h3 class="text-sm font-semibold text-white">Collections</h3>
          <button class="text-gray-400 hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
            </svg>
          </button>
        </div>

        <!-- Collection Items -->
        <div class="flex-1 overflow-y-auto py-2">
          <button
            v-for="collection in strategyCollections"
            :key="collection.id"
            @click="selectedCollection = collection.id"
            :class="[
              'w-full px-4 py-2.5 flex items-center justify-between transition-colors text-left',
              selectedCollection === collection.id
                ? 'bg-[#2a2a2a] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#202020]'
            ]"
          >
            <div class="flex items-center gap-3">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="collection.id === 'all'" d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                <path v-else-if="collection.id === 'official'" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"/>
                <path v-else-if="collection.id === 'my-strategies'" d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                <path v-else-if="collection.id === 'with-plans'" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                <path v-else-if="collection.id === 'watchlist'" d="M10 12a2 2 0 100-4 2 2 0 000 4z M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                <path v-else d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8z M9 11a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"/>
              </svg>
              <span class="text-sm">{{ collection.name }}</span>
            </div>
            <span class="text-xs px-2 py-0.5 rounded bg-[#2a2a2a] text-gray-400">
              {{ collection.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 bg-[#0f0f0f] flex flex-col">
        <!-- Header Bar -->
        <div class="px-6 py-4 border-b border-[#404040] flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">{{ currentCollectionName }}</h2>
            <p class="text-sm text-gray-400">{{ displayedStrategies.length }} strategies</p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Search Box -->
            <div class="relative">
              <input
                v-model="strategySearchQuery"
                type="text"
                placeholder="Search strategies..."
                class="w-64 px-4 py-2 pl-10 bg-[#1a1a1a] border border-[#404040] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <svg class="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
              </svg>
            </div>

            <!-- Filter Dropdown -->
            <select
              v-model="strategyFilterOption"
              class="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="long">Long Only</option>
              <option value="short">Short Only</option>
            </select>

            <!-- Sort Dropdown -->
            <select
              v-model="strategySortOption"
              class="px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="date-desc">Date ↓</option>
              <option value="date-asc">Date ↑</option>
              <option value="ticker">Ticker</option>
            </select>

            <!-- View Toggle Buttons -->
            <div class="flex items-center gap-1 bg-[#1a1a1a] border border-[#404040] rounded-lg p-1">
              <button
                @click="strategyViewMode = 'grid'"
                :class="[
                  'p-1.5 rounded transition-colors',
                  strategyViewMode === 'grid' ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-white'
                ]"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>
                </svg>
              </button>
              <button
                @click="strategyViewMode = 'list'"
                :class="[
                  'p-1.5 rounded transition-colors',
                  strategyViewMode === 'list' ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-white'
                ]"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </button>
              <button
                @click="strategyViewMode = 'table'"
                :class="[
                  'p-1.5 rounded transition-colors',
                  strategyViewMode === 'table' ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-white'
                ]"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>

            <!-- Refresh Button -->
            <button
              @click="loadSavedStrategies"
              class="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Strategies Table/Grid/List -->
        <div class="flex-1 overflow-y-auto">
          <!-- Empty State -->
          <div v-if="displayedStrategies.length === 0" class="flex flex-col items-center justify-center h-full text-center py-16">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-[#1a1a1a] border border-[#404040] rounded-full mb-6">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">暂无策略</h3>
            <p class="text-gray-400 mb-6">您还没有保存任何策略报告</p>
            <button
              @click="activeTab = 'generate'"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              生成新策略
            </button>
          </div>

          <!-- Table View -->
          <div v-else-if="strategyViewMode === 'table'" class="px-6 py-4">
            <table class="w-full">
              <thead>
                <tr class="border-b border-[#404040]">
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <input type="checkbox" class="rounded border-gray-600 bg-[#1a1a1a]" />
                  </th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ticker</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Strategy</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Direction</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Grade</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Horizon</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plans</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                  <th class="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Created</th>
                  <th class="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="strategy in displayedStrategies"
                  :key="strategy.id"
                  class="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors group cursor-pointer"
                  @click="viewStrategyDetail(strategy)"
                >
                  <td class="py-4 px-4">
                    <input type="checkbox" class="rounded border-gray-600 bg-[#1a1a1a]" @click.stop />
                  </td>
                  <td class="py-4 px-4">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-sm font-medium text-white">{{ strategy.symbol }}</span>
                    </div>
                  </td>
                  <td class="py-4 px-4 text-sm text-gray-300">{{ strategy.stockName }}</td>
                  <td class="py-4 px-4">
                    <span :class="[
                      'inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium',
                      strategy.direction === 'LONG' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    ]">
                      <svg v-if="strategy.direction === 'LONG'" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                      </svg>
                      <svg v-else class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                      {{ strategy.direction === 'LONG' ? 'WAIT_LONG' : 'WAIT_SHORT' }}
                    </span>
                  </td>
                  <td class="py-4 px-4">
                    <span :class="[
                      'px-2 py-1 rounded text-xs font-bold',
                      strategy.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                      strategy.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    ]">
                      {{ strategy.grade }}
                    </span>
                  </td>
                  <td class="py-4 px-4 text-sm text-gray-300">{{ strategy.horizon }}</td>
                  <td class="py-4 px-4 text-sm text-gray-400">-</td>
                  <td class="py-4 px-4">
                    <span class="text-xs text-blue-400">{{ strategy.source }}</span>
                  </td>
                  <td class="py-4 px-4 text-sm text-gray-400">{{ formatDate(strategy.savedAt || strategy.generatedAt) }}</td>
                  <td class="py-4 px-4">
                    <button class="text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" @click.stop="showStrategyMenu(strategy)">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Grid View (TODO) -->
          <div v-else-if="strategyViewMode === 'grid'" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="strategy in displayedStrategies"
                :key="strategy.id"
                class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
                @click="viewStrategyDetail(strategy)"
              >
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <div class="text-lg font-bold text-white mb-1">{{ strategy.symbol }}</div>
                    <div class="text-sm text-gray-400">{{ strategy.stockName }}</div>
                  </div>
                  <span :class="[
                    'px-2 py-1 rounded text-xs font-bold',
                    strategy.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                    strategy.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  ]">
                    {{ strategy.grade }}
                  </span>
                </div>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400">Direction:</span>
                    <span :class="strategy.direction === 'LONG' ? 'text-green-400' : 'text-red-400'">
                      {{ strategy.direction === 'LONG' ? 'WAIT_LONG' : 'WAIT_SHORT' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400">Horizon:</span>
                    <span class="text-white">{{ strategy.horizon }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-400">Source:</span>
                    <span class="text-blue-400">{{ strategy.source }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- List View (TODO) -->
          <div v-else class="p-6">
            <div class="space-y-2">
              <div
                v-for="strategy in displayedStrategies"
                :key="strategy.id"
                class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4 hover:border-blue-500/50 transition-colors cursor-pointer"
                @click="viewStrategyDetail(strategy)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                      <span class="text-sm font-bold text-white">{{ strategy.symbol }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-white mb-1">{{ strategy.stockName }}</div>
                      <div class="text-xs text-gray-400">{{ strategy.horizon }} • {{ strategy.source }}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <span :class="[
                      'inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium',
                      strategy.direction === 'LONG' 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    ]">
                      {{ strategy.direction === 'LONG' ? 'WAIT_LONG' : 'WAIT_SHORT' }}
                    </span>
                    <span :class="[
                      'px-3 py-1 rounded text-xs font-bold',
                      strategy.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                      strategy.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    ]">
                      {{ strategy.grade }}
                    </span>
                    <span class="text-xs text-gray-400">{{ formatDate(strategy.savedAt || strategy.generatedAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 4: 查看我的计划 -->
    <div v-else-if="activeTab === 'myplan'" class="min-h-[calc(100vh-240px)]">
      <div class="max-w-4xl mx-auto px-6 py-16">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-32 h-32 bg-[#2a2a2a] border border-[#404040] rounded-full mb-8">
            <svg class="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-4">此功能即将上线</h2>
          <p class="text-gray-400 mb-8">在这里您可以查看和管理您的交易计划</p>
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>敬请期待</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Reports Dialog -->
    <SaveReportsDialog
      :is-open="showSaveDialog"
      :selected-reports="selectedReportsToSave"
      @close="showSaveDialog = false"
      @save="handleSaveReports"
    />

    <PositionConfirmDialog
      :is-visible="showPositionDialog"
      :report="selectedReportForPlanning || {}"
      @close="handlePositionDialogClose"
      @confirm="handlePositionConfirm"
    />

    <HoldingsClassificationDialog
      :is-visible="showHoldingsDialog"
      :selected-reports="selectedReportsForPlanning"
      @close="handleHoldingsDialogClose"
      @confirm="handleHoldingsConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OpportunityReportCard from '../components/opportunity/OpportunityReportCard.vue'
import SaveReportsDialog from '../components/opportunity/SaveReportsDialog.vue'
import PositionConfirmDialog from '../components/opportunity/PositionConfirmDialog.vue'
import HoldingsClassificationDialog from '../components/opportunity/HoldingsClassificationDialog.vue'
import { useSavedReports } from '../composables/useSavedReports'

const router = useRouter()
const route = useRoute()
const { 
  savedReports, 
  checkSavedReports, 
  refreshStatus 
} = useSavedReports()

// Tab State Management
const activeTab = ref('generate') // 'generate' | 'queue' | 'mystrategy'

// Queue Tab: Sub-Tab and Filter States
const queueSubTab = ref('pending') // 'pending' | 'processing' | 'completed'
const queueTypeFilter = ref('all') // 'all' | 'strategy' | 'plan'

// Helper function to set type filter with logging
const setTypeFilter = (filterValue) => {
  console.log('🎯 [User Action] Type filter changed:', {
    from: queueTypeFilter.value,
    to: filterValue
  })
  queueTypeFilter.value = filterValue
}

// Current Step
const currentStep = ref(1)

// Step 1: Stock Selection
const selectedStocks = ref([])
const expandedCategories = ref([]) // Default to collapsed state
const myHoldings = ref([])

// Stock Search
const stockSearchQuery = ref('')
const showSearchResults = ref(false)

// Report Generation (Backend process)
const isGeneratingReports = ref(false)
const generatedReportsData = ref([])
const selectedReportIds = ref([])
const showSaveDialog = ref(false)

// Queue Tab: Completed Reports Selection
const selectedCompletedReportIds = ref([])

// Step 4: Saved Reports Multi-Selection
const selectedSavedReportIds = ref([])

// ===== Queue Tab: Execution Plan Batches Management =====

// Load execution plan batches from localStorage
const executionPlanBatches = ref([])

const loadExecutionPlanBatches = () => {
  try {
    const stored = localStorage.getItem('execution_plan_batches')
    if (stored) {
      executionPlanBatches.value = JSON.parse(stored)
      console.log('📦 [Data Load] Execution plan batches loaded:', {
        totalCount: executionPlanBatches.value.length,
        batches: executionPlanBatches.value.map(b => ({
          id: b.batchId,
          type: b.type,
          status: b.status,
          itemCount: b.totalCount
        }))
      })
    } else {
      console.log('📦 [Data Load] No batches found in localStorage')
    }
  } catch (error) {
    console.error('Failed to load execution plan batches:', error)
    executionPlanBatches.value = []
  }
}

// Filter batches by status
const generatingBatches = computed(() => {
  return executionPlanBatches.value.filter(batch => 
    batch.status === 'pending' || batch.status === 'processing'
  )
})

const completedExecutionBatches = computed(() => {
  return executionPlanBatches.value.filter(batch => 
    batch.status === 'completed' || batch.status === 'failed'
  )
})

// Filter batches by lifecycle status and type
const filteredBatches = computed(() => {
  let batches = []
  
  // Step 1: Filter by lifecycle status (sub-tab)
  if (queueSubTab.value === 'pending') {
    batches = executionPlanBatches.value.filter(b => b.status === 'pending')
  } else if (queueSubTab.value === 'processing') {
    batches = executionPlanBatches.value.filter(b => b.status === 'processing')
  } else if (queueSubTab.value === 'completed') {
    batches = executionPlanBatches.value.filter(b => b.status === 'completed' || b.status === 'failed')
  }
  
  console.log('🔍 [Filter Debug] Step 1 - After status filter:', {
    queueSubTab: queueSubTab.value,
    totalBatches: executionPlanBatches.value.length,
    filteredCount: batches.length,
    batchTypes: batches.map(b => ({ id: b.batchId, type: b.type, status: b.status }))
  })
  
  // Step 2: Apply type filter
  if (queueTypeFilter.value === 'all') {
    console.log('🔍 [Filter Debug] Step 2 - Type filter: ALL, returning all batches:', batches.length)
    return batches
  }
  
  const filtered = batches.filter(batch => {
    if (queueTypeFilter.value === 'strategy') {
      return batch.type === 'strategy-report'
    } else if (queueTypeFilter.value === 'plan') {
      return batch.type === 'execution-plan'
    }
    return true
  })
  
  console.log('🔍 [Filter Debug] Step 2 - After type filter:', {
    queueTypeFilter: queueTypeFilter.value,
    beforeCount: batches.length,
    afterCount: filtered.length,
    filteredTypes: filtered.map(b => ({ id: b.batchId, type: b.type }))
  })
  
  return filtered
})

// Separate computed for individual reports filtering
const filteredIndividualReports = computed(() => {
  if (queueSubTab.value === 'pending') {
    return []
  } else if (queueSubTab.value === 'processing') {
    return inProgressReports.value
  } else if (queueSubTab.value === 'completed') {
    return completedReports.value
  }
  return []
})

// MyStrategy Tab: State Variables
const selectedCollection = ref('all')
const strategySearchQuery = ref('')
const strategyFilterOption = ref('all')
const strategySortOption = ref('date-desc')
const strategyViewMode = ref('table')
const allSavedStrategies = ref([])

// Right Sidebar: My Reports
const isSidebarCollapsed = ref(true) // Default to collapsed state

// Module expand/collapse state
const expandedSections = ref({
  completed: true,    // 已生成的内容默认展开
  generating: true    // 正在生成的内容默认展开
})

const toggleSection = (section) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

// Reports with demo data - mix of generating and completed
const generatingReports = ref([
  // 已完成的报告 (可点击查看) - 8条
  {
    symbol: 'AAPL',
    stockName: 'Apple Inc.',
    progress: 100,
    status: '分析完成',
    expectedReturn: 18.5,
    riskLevel: '中低',
    targetPrice: 195.0,
    currentPrice: 165.2,
    generatedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    completed: true,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'MSFT',
    stockName: 'Microsoft Corporation',
    progress: 100,
    status: '分析完成',
    expectedReturn: 16.2,
    riskLevel: '中等',
    targetPrice: 425.0,
    currentPrice: 365.8,
    generatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    completed: true,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'NVDA',
    stockName: 'NVIDIA Corporation',
    progress: 100,
    status: '分析完成',
    expectedReturn: 24.3,
    riskLevel: '中高',
    targetPrice: 580.0,
    currentPrice: 466.5,
    generatedAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    completed: true,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'TSLA',
    stockName: 'Tesla Inc.',
    progress: 100,
    status: '分析完成',
    expectedReturn: 32.8,
    riskLevel: '高',
    targetPrice: 265.0,
    currentPrice: 199.5,
    generatedAt: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
    completed: true,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'AMD',
    stockName: 'Advanced Micro Devices Inc.',
    progress: 100,
    status: '分析完成',
    expectedReturn: 21.5,
    riskLevel: '中高',
    targetPrice: 185.0,
    currentPrice: 152.3,
    generatedAt: new Date(Date.now() - 9000000).toISOString(), // 2.5 hours ago
    completed: true,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'BABA',
    stockName: 'Alibaba Group Holding Ltd.',
    progress: 100,
    status: '分析完成',
    expectedReturn: 15.3,
    riskLevel: '中等',
    targetPrice: 92.0,
    currentPrice: 79.8,
    generatedAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
    completed: true,
    config: {
      framework: '价值投资 + 宏观',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'TSM',
    stockName: 'Taiwan Semiconductor Manufacturing',
    progress: 100,
    status: '分析完成',
    expectedReturn: 19.7,
    riskLevel: '中低',
    targetPrice: 125.0,
    currentPrice: 104.4,
    generatedAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    completed: true,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  {
    symbol: 'COIN',
    stockName: 'Coinbase Global Inc.',
    progress: 100,
    status: '分析完成',
    expectedReturn: 28.4,
    riskLevel: '高',
    targetPrice: 198.0,
    currentPrice: 154.2,
    generatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    completed: true,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 0
  },
  // 正在生成中的报告 - 7条
  {
    symbol: 'GOOGL',
    stockName: 'Alphabet Inc.',
    progress: 35,
    status: '分析基本面...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 138.2,
    generatedAt: null,
    completed: false,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 195 // seconds
  },
  {
    symbol: 'META',
    stockName: 'Meta Platforms Inc.',
    progress: 68,
    status: '计算指标...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 396.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 96
  },
  {
    symbol: 'AMZN',
    stockName: 'Amazon.com Inc.',
    progress: 92,
    status: '生成报告...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 150.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '基本面分析 + 趋势分析',
      period: '1m-6m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 24
  },
  {
    symbol: 'NFLX',
    stockName: 'Netflix Inc.',
    progress: 12,
    status: '收集数据...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 489.3,
    generatedAt: null,
    completed: false,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 264
  },
  {
    symbol: 'DIS',
    stockName: 'The Walt Disney Company',
    progress: 45,
    status: '分析财务...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 112.8,
    generatedAt: null,
    completed: false,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 165
  },
  {
    symbol: 'BABA',
    stockName: 'Alibaba Group',
    progress: 58,
    status: '评估宏观环境...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 78.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '技术分析 + 量化',
      period: '3m-12m',
      riskPreference: '中'
    },
    isPaused: false,
    estimatedTimeRemaining: 126
  },
  {
    symbol: 'BRK.B',
    stockName: 'Berkshire Hathaway',
    progress: 23,
    status: '分析基本面...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 367.8,
    generatedAt: null,
    completed: false,
    config: {
      framework: '价值投资 + 宏观分析',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: false,
    estimatedTimeRemaining: 231
  },
  {
    symbol: 'JNJ',
    stockName: 'Johnson & Johnson',
    progress: 67,
    status: '计算估值...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 158.2,
    generatedAt: null,
    completed: false,
    config: {
      framework: '价值投资 + 宏观分析',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: true,
    estimatedTimeRemaining: 99
  },
  {
    symbol: 'PG',
    stockName: 'Procter & Gamble',
    progress: 41,
    status: '分析财务数据...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 162.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '价值投资 + 宏观分析',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: false,
    estimatedTimeRemaining: 177
  },
  {
    symbol: 'TSLA',
    stockName: 'Tesla Inc.',
    progress: 85,
    status: '生成投资建议...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 248.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '成长股分析 + 动量策略',
      period: '1m-3m',
      riskPreference: '高'
    },
    isPaused: false,
    estimatedTimeRemaining: 45
  },
  {
    symbol: 'NVDA',
    stockName: 'NVIDIA Corporation',
    progress: 52,
    status: '分析行业趋势...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 875.3,
    generatedAt: null,
    completed: false,
    config: {
      framework: '成长股分析 + 动量策略',
      period: '1m-3m',
      riskPreference: '高'
    },
    isPaused: true,
    estimatedTimeRemaining: 144
  },
  {
    symbol: 'SHOP',
    stockName: 'Shopify Inc.',
    progress: 78,
    status: '计算指标...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 82.5,
    generatedAt: null,
    completed: false,
    config: {
      framework: '价值投资 + 宏观',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: false,
    estimatedTimeRemaining: 66
  },
  {
    symbol: 'SQ',
    stockName: 'Block Inc.',
    progress: 88,
    status: '生成报告...',
    expectedReturn: null,
    riskLevel: null,
    targetPrice: null,
    currentPrice: 68.9,
    generatedAt: null,
    completed: false,
    config: {
      framework: '价值投资 + 宏观',
      period: '6m-24m',
      riskPreference: '低'
    },
    isPaused: false,
    estimatedTimeRemaining: 36
  }
])
const savedReportCategories = ref([]) // Saved report categories from localStorage

// Check if there are any saved reports
const expandedSavedCategories = ref([]) // Expanded category IDs

// Step 4: Position Confirmation
const showPositionDialog = ref(false)
const selectedReportForPlanning = ref(null)
const confirmedPositionData = ref(null)

// Holdings Classification Dialog
const showHoldingsDialog = ref(false)
const selectedReportsForPlanning = computed(() => {
  return savedReportCategories.value
    .flatMap(cat => cat.reports)
    .filter(report => selectedSavedReportIds.value.includes(report.id))
})

// Computed: Selected reports for saving
const selectedReportsToSave = computed(() => {
  // Queue Tab: use completedReports and selectedCompletedReportIds
  if (activeTab.value === 'queue') {
    return completedReports.value.filter(r => selectedCompletedReportIds.value.includes(r.id))
  }
  // Generate Tab: use generatedReports and selectedReportIds
  return generatedReports.value.filter(r => selectedReportIds.value.includes(r.id))
})

// Computed: Sidebar reports separated by status
const completedReports = computed(() => {
  return generatingReports.value.filter(r => r.completed === true)
})

const inProgressReports = computed(() => {
  return generatingReports.value.filter(r => r.completed === false)
})

// Computed: Group IN-PROGRESS reports by config
const groupedReports = computed(() => {
  const groups = {}
  
  // Default config for reports without config
  const defaultConfig = {
    framework: '智能分析',
    period: '灵活配置',
    riskPreference: '中'
  }
  
  // Group filtered individual reports
  const reportsToGroup = queueSubTab.value === 'processing' ? filteredIndividualReports.value : inProgressReports.value
  
  reportsToGroup.forEach(report => {
    // Use report's config or default config
    const config = report.config || defaultConfig
    const key = `${config.framework}|${config.period}|${config.riskPreference}`
    
    if (!groups[key]) {
      groups[key] = {
        config: config,
        reports: []
      }
    }
    
    groups[key].reports.push(report)
  })
  
  return Object.values(groups)
})

const completedReportsCount = computed(() => {
  return completedReports.value.length
})

// Tab-related computed properties
const generatingCount = computed(() => {
  return inProgressReports.value.length
})

const completedCount = computed(() => {
  return completedReports.value.length
})

// Stock Categories (similar to Info page)
const stockCategories = ref([
  {
    id: 'tech',
    name: '科技股',
    color: '#3b82f6',
    stocks: ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA', 'AMD', 'INTC']
  },
  {
    id: 'finance',
    name: '金融股',
    color: '#10b981',
    stocks: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'V', 'MA']
  },
  {
    id: 'healthcare',
    name: '医疗健康',
    color: '#ef4444',
    stocks: ['JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'DHR']
  },
  {
    id: 'consumer',
    name: '消费品',
    color: '#f59e0b',
    stocks: ['KO', 'PEP', 'WMT', 'COST', 'NKE', 'SBUX']
  },
  {
    id: 'energy',
    name: '能源',
    color: '#8b5cf6',
    stocks: ['XOM', 'CVX', 'COP', 'SLB', 'XLE']
  }
])

// Stock names mapping for search
const stockNames = {
  // Tech
  'AAPL': '苹果公司',
  'MSFT': '微软',
  'GOOGL': '谷歌',
  'META': 'Meta（Facebook）',
  'AMZN': '亚马逊',
  'NVDA': '英伟达',
  'AMD': '超威半导体',
  'INTC': '英特尔',
  // Finance
  'JPM': '摩根大通',
  'BAC': '美国银行',
  'WFC': '富国银行',
  'GS': '高盛',
  'MS': '摩根士丹利',
  'V': 'Visa',
  'MA': '万事达',
  // Healthcare
  'JNJ': '强生',
  'UNH': '联合健康',
  'PFE': '辉瑞',
  'ABBV': '艾伯维',
  'TMO': '赛默飞',
  'DHR': '丹纳赫',
  // Consumer
  'KO': '可口可乐',
  'PEP': '百事可乐',
  'WMT': '沃尔玛',
  'COST': '好市多',
  'NKE': '耐克',
  'SBUX': '星巴克',
  // Energy
  'XOM': '埃克森美孚',
  'CVX': '雪佛龙',
  'COP': '康菲石油',
  'SLB': '斯伦贝谢',
  'XLE': '能源ETF'
}

// Step 2: Strategy Selection
const selectedStrategy = ref({
  frameworks: [], // 改为数组支持多选
  period: '',
  risk: ''
})

// Framework options
const frameworks = ref([
  { 
    value: 'all', 
    label: '全部框架', 
    icon: '🎯',
    description: '综合多种分析方法，全面评估投资机会'
  },
  { 
    value: 'technical', 
    label: '技术分析', 
    icon: '📈',
    description: '基于图表、趋势和技术指标进行分析'
  },
  { 
    value: 'fundamental', 
    label: '基本面分析', 
    icon: '📊',
    description: '分析公司财务报表、盈利能力和估值'
  },
  { 
    value: 'quantitative', 
    label: '量化分析', 
    icon: '🔢',
    description: '使用数学模型和统计方法评估机会'
  },
  { 
    value: 'event', 
    label: '事件驱动', 
    icon: '📰',
    description: '基于公司事件、新闻和催化剂分析'
  },
  { 
    value: 'market', 
    label: '商业分析', 
    icon: '💼',
    description: '分析商业模式、竞争优势和市场趋势'
  },
  { 
    value: 'momentum', 
    label: '趋势分析', 
    icon: '🚀',
    description: '捕捉市场动量和价格趋势机会'
  },
  { 
    value: 'alternative', 
    label: '另类数据', 
    icon: '🔍',
    description: '利用非传统数据源进行深度分析'
  }
])

// Period options
const periods = ref([
  { 
    value: '1d-5d', 
    label: '短期', 
    icon: '⚡',
    duration: '1-5天'
  },
  { 
    value: '1d-1m', 
    label: '短中期', 
    icon: '📅',
    duration: '1天-1个月'
  },
  { 
    value: '1m-6m', 
    label: '中长期', 
    icon: '📆',
    duration: '1-6个月'
  },
  { 
    value: '6m+', 
    label: '长期', 
    icon: '🗓️',
    duration: '6个月以上'
  }
])

// Risk options
const risks = ref([
  { 
    value: 'low', 
    label: '低风险', 
    icon: '🛡️',
    color: 'green',
    description: '稳健保守，重视资本保护'
  },
  { 
    value: 'medium', 
    label: '中等风险', 
    icon: '⚖️',
    color: 'yellow',
    description: '平衡收益与风险'
  },
  { 
    value: 'high', 
    label: '高风险', 
    icon: '🔥',
    color: 'orange',
    description: '追求高收益，接受较高波动'
  },
  { 
    value: 'extreme', 
    label: '极高风险', 
    icon: '💥',
    color: 'red',
    description: '激进策略，追求最大收益'
  }
])

// Computed
const isStrategyComplete = computed(() => {
  return selectedStrategy.value.frameworks.length > 0 && 
         selectedStrategy.value.period && 
         selectedStrategy.value.risk
})

// Check if can generate (both stocks and strategy selected)
const canGenerate = computed(() => {
  return selectedStocks.value.length > 0 && isStrategyComplete.value
})

// Filtered stocks for search
const filteredStocks = computed(() => {
  if (!stockSearchQuery.value.trim()) {
    return []
  }
  
  const query = stockSearchQuery.value.toLowerCase()
  const allStocks = []
  
  // Collect all stocks from categories
  stockCategories.value.forEach(category => {
    category.stocks.forEach(symbol => {
      allStocks.push({
        symbol,
        name: stockNames[symbol] || symbol
      })
    })
  })
  
  // Filter by symbol or name
  return allStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(query) || 
    stock.name.toLowerCase().includes(query)
  ).slice(0, 10) // Limit to 10 results
})

// Methods
const toggleCategory = (categoryId) => {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index > -1) {
    expandedCategories.value.splice(index, 1)
  } else {
    expandedCategories.value.push(categoryId)
  }
}

const toggleStock = (symbol) => {
  const index = selectedStocks.value.indexOf(symbol)
  if (index > -1) {
    selectedStocks.value.splice(index, 1)
  } else {
    selectedStocks.value.push(symbol)
  }
}

const selectStock = (symbol) => {
  if (!selectedStocks.value.includes(symbol)) {
    selectedStocks.value.push(symbol)
  }
}

const selectAllStocks = () => {
  // Add all stocks from all categories
  const allStocks = [...myHoldings.value.map(h => h.symbol)]
  stockCategories.value.forEach(cat => {
    allStocks.push(...cat.stocks)
  })
  selectedStocks.value = [...new Set(allStocks)]
}

const clearAllStocks = () => {
  selectedStocks.value = []
}

// Search methods
const clearSearch = () => {
  stockSearchQuery.value = ''
  showSearchResults.value = false
}

const handleSearchBlur = () => {
  // Delay hiding results to allow click events to fire
  setTimeout(() => {
    showSearchResults.value = false
  }, 200)
}

const addStockFromSearch = (symbol) => {
  if (!selectedStocks.value.includes(symbol)) {
    selectedStocks.value.push(symbol)
  }
  // Clear search after adding
  stockSearchQuery.value = ''
  showSearchResults.value = false
}

// Toggle framework selection (支持多选)
const toggleFramework = (frameworkValue) => {
  const index = selectedStrategy.value.frameworks.indexOf(frameworkValue)
  if (index > -1) {
    // 如果已选中，则移除
    selectedStrategy.value.frameworks.splice(index, 1)
  } else {
    // 如果未选中，则添加
    selectedStrategy.value.frameworks.push(frameworkValue)
  }
}

// Generate investment reports (merged from goToStep3)
const generateReports = async () => {
  if (canGenerate.value) {
    // 直接跳转到queue页面
    router.push('/opportunity?tab=queue')
    
    // 后台生成报告（用户在queue页面可以看到进度）
    isGeneratingReports.value = true
    generatedReportsData.value = []
    selectedReportIds.value = []
    
    // Simulate generating reports one by one
    for (let i = 0; i < selectedStocks.value.length; i++) {
      const symbol = selectedStocks.value[i]
      const basePrice = 50 + Math.random() * 500
      const expectedReturn = 5 + Math.random() * 20
      const targetPrice = basePrice * (1 + expectedReturn / 100)
      const score = 75 + Math.floor(Math.random() * 20)
      
      const report = {
        id: `report-${symbol}-${Date.now()}-${i}`,
        symbol: symbol,
        stockName: getStockName(symbol),
        frameworks: selectedStrategy.value.frameworks, // 改为数组
        period: selectedStrategy.value.period,
        risk: selectedStrategy.value.risk,
        riskRewardRatio: `${(2 + Math.random() * 3).toFixed(1)}:1`,
        expectedReturn: expectedReturn.toFixed(1),
        entryPrice: basePrice.toFixed(2),
        targetPrice: targetPrice.toFixed(2),
        score: score,
        generatedAt: new Date().toISOString()
      }
      
      generatedReportsData.value.push(report)
      
      // Simulate delay (2-3 seconds per report)
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))
    }
    
    isGeneratingReports.value = false
    
    // Save state to sessionStorage
    savePageState()
  }
}

// Save page state to sessionStorage
const savePageState = () => {
  const state = {
    currentStep: currentStep.value,
    selectedStocks: selectedStocks.value,
    selectedStrategy: selectedStrategy.value,
    generatedReports: generatedReportsData.value,
    timestamp: Date.now()
  }
  sessionStorage.setItem('opportunity_page_state', JSON.stringify(state))
}

// Restore page state from sessionStorage
const restorePageState = () => {
  const saved = sessionStorage.getItem('opportunity_page_state')
  if (saved) {
    try {
      const state = JSON.parse(saved)
      
      // Only restore if saved within last 30 minutes
      const thirtyMinutes = 30 * 60 * 1000
      if (Date.now() - state.timestamp < thirtyMinutes) {
        currentStep.value = state.currentStep
        selectedStocks.value = state.selectedStocks || []
        selectedStrategy.value = state.selectedStrategy || { framework: '', period: '', risk: '' }
        generatedReportsData.value = state.generatedReports || []
      }
    } catch (e) {
      console.error('Failed to restore page state:', e)
    }
  }
}

// View a generated report from the sidebar
const viewGeneratedReport = (report) => {
  if (!report.completed) return // Only allow viewing completed reports
  
  // Convert the demo report to the expected format
  const formattedReport = {
    id: `report-${report.symbol}-${Date.now()}`,
    symbol: report.symbol,
    stockName: report.stockName,
    frameworks: ['价值投资', '趋势跟踪'], // Default frameworks for demo
    period: '中长期',
    risk: report.riskLevel,
    riskRewardRatio: '3:1',
    expectedReturn: report.expectedReturn.toFixed(1),
    entryPrice: report.currentPrice.toFixed(2),
    targetPrice: report.targetPrice.toFixed(2),
    score: 85,
    generatedAt: report.generatedAt
  }
  
  // 直接导航到报告详情页面
  router.push(`/opportunity/report/${formattedReport.id}`)
}

// Tab switching function
const switchTab = (tab) => {
  activeTab.value = tab
  // Update URL query parameter
  router.push({
    path: route.path,
    query: { ...route.query, tab }
  })
}

// Format time helper
const formatTime = (timestamp) => {
  if (!timestamp) return '-'
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  return date.toLocaleDateString('zh-CN')
}

// Format time remaining (seconds to readable format)
const formatTimeRemaining = (seconds) => {
  if (seconds <= 0) return '即将完成'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  if (minutes > 0) {
    return `约 ${minutes} 分 ${remainingSeconds} 秒`
  }
  return `约 ${remainingSeconds} 秒`
}

// Queue control functions
const deleteQueueReport = (symbol) => {
  const index = generatingReports.value.findIndex(r => r.symbol === symbol)
  if (index !== -1) {
    generatingReports.value.splice(index, 1)
  }
}

const pauseQueueReport = (symbol) => {
  const report = generatingReports.value.find(r => r.symbol === symbol)
  if (report) {
    report.isPaused = true
  }
}

const resumeQueueReport = (symbol) => {
  const report = generatingReports.value.find(r => r.symbol === symbol)
  if (report) {
    report.isPaused = false
  }
}

const pauseAllQueueReports = () => {
  generatingReports.value.forEach(report => {
    if (!report.completed) {
      report.isPaused = true
    }
  })
}

const resumeAllQueueReports = () => {
  generatingReports.value.forEach(report => {
    if (!report.completed) {
      report.isPaused = false
    }
  })
}

// Handle enter planning button click
const handleEnterPlanning = () => {
  if (selectedSavedReportIds.value.length === 0) {
    alert('请先选择至少一份报告')
    return
  }
  
  // Show holdings classification dialog
  showHoldingsDialog.value = true
}

// Handle holdings dialog close
const handleHoldingsDialogClose = () => {
  showHoldingsDialog.value = false
}

// Handle holdings dialog confirm and navigate to planning
const handleHoldingsConfirm = (classifiedData) => {
  // Prepare data for planning page
  const planningData = {
    reports: [
      // Reports with holdings
      ...classifiedData.withHoldings.map(item => ({
        report: item.report,
        position: {
          hasPosition: true,
          costBasis: item.holding.cost,
          shares: item.holding.position // Using position percentage as shares placeholder
        }
      })),
      // Reports without holdings
      ...classifiedData.withoutHoldings.map(report => ({
        report: report,
        position: {
          hasPosition: false,
          costBasis: null,
          shares: null
        }
      }))
    ],
    timestamp: Date.now()
  }
  
  // Save to sessionStorage
  sessionStorage.setItem('planning_data', JSON.stringify(planningData))
  
  // Close dialog
  showHoldingsDialog.value = false
  
  // Navigate to planning page
  router.push('/planning')
}

// Legacy function - kept for compatibility
const goToPlanning = () => {
  if (!confirmedPositionData.value) {
    alert('请先选择一份报告并确认持仓信息')
    return
  }
  
  router.push('/planning')
}

// Generate reports based on selected stocks and strategy
const generatedReports = computed(() => {
  return generatedReportsData.value
})

// Report multi-selection
const toggleReportSelection = (reportId) => {
  const index = selectedReportIds.value.indexOf(reportId)
  if (index > -1) {
    selectedReportIds.value.splice(index, 1)
  } else {
    selectedReportIds.value.push(reportId)
  }
}

const selectAllReports = () => {
  if (selectedReportIds.value.length === generatedReports.value.length) {
    selectedReportIds.value = []
  } else {
    selectedReportIds.value = generatedReports.value.map(r => r.id)
  }
}

// Queue Tab: Completed Reports Selection Methods
const toggleCompletedReportSelection = (reportId) => {
  const index = selectedCompletedReportIds.value.indexOf(reportId)
  if (index > -1) {
    selectedCompletedReportIds.value.splice(index, 1)
  } else {
    selectedCompletedReportIds.value.push(reportId)
  }
}

const toggleSelectAllCompleted = () => {
  if (selectedCompletedReportIds.value.length === completedReports.value.length) {
    selectedCompletedReportIds.value = []
  } else {
    selectedCompletedReportIds.value = completedReports.value.map(r => r.id)
  }
}

const handleSaveReports = (result) => {
  console.log('Reports saved:', result)
  
  // Reload saved reports from localStorage to sync with sidebar
  loadSavedReports()
  
  // Update global saved reports status for navigation bar
  checkSavedReports()
  
  // Auto expand the category that was just saved to
  if (result.categoryId && !expandedSavedCategories.value.includes(result.categoryId)) {
    expandedSavedCategories.value.push(result.categoryId)
  }
  
  // Determine which selection list to use
  const selectedCount = activeTab.value === 'queue' 
    ? selectedCompletedReportIds.value.length 
    : selectedReportIds.value.length
  
  // Show success message (you can add a toast notification here)
  if (result.isNew) {
    alert(`✅ 成功创建分类"${result.categoryName}"并保存了 ${selectedCount} 份报告！`)
  } else {
    const count = result.addedCount || selectedCount
    alert(`✅ 成功将 ${count} 份报告添加到"${result.categoryName}"！`)
  }
  
  // Clear selection after save (based on active tab)
  if (activeTab.value === 'queue') {
    selectedCompletedReportIds.value = []
  } else {
    selectedReportIds.value = []
  }
  
  // Reload strategies for mystrategy tab
  loadSavedStrategies()
  
  // Auto-navigate to mystrategy tab
  activeTab.value = 'mystrategy'
  router.push({ query: { tab: 'mystrategy' } })
}

// Get stock name (mock data)
const getStockName = (symbol) => {
  return stockNames[symbol] || `${symbol} Corporation`
}

// Navigate to report detail
const viewReportDetail = (report) => {
  // Store report data in sessionStorage for detail page
  sessionStorage.setItem('current_report', JSON.stringify(report))
  router.push(`/opportunity/report/${report.id}`)
}

// Navigate to report detail (called by view-detail button)
const navigateToReportDetail = (report) => {
  sessionStorage.setItem('current_report', JSON.stringify(report))
  router.push(`/opportunity/report/${report.id}`)
}

const handlePositionConfirm = (positionData) => {
  confirmedPositionData.value = positionData
  showPositionDialog.value = false
  
  // Navigate to planning page with data
  sessionStorage.setItem('planning_data', JSON.stringify({
    report: positionData.report,
    position: {
      hasPosition: positionData.hasPosition,
      costBasis: positionData.costBasis,
      shares: positionData.shares
    }
  }))
  
  router.push('/planning')  // ✅ 修复：使用正确的路径
}

const handlePositionDialogClose = () => {
  showPositionDialog.value = false
  selectedReportForPlanning.value = null
}

const getFrameworkLabel = (value) => {
  const labels = {
    'all': '全部',
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

// Get multiple frameworks labels
const getFrameworksLabel = () => {
  if (selectedStrategy.value.frameworks.length === 0) {
    return '未选择'
  }
  return selectedStrategy.value.frameworks
    .map(value => getFrameworkLabel(value))
    .join(' + ')
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

// Get risk position for visual indicator
const getRiskPosition = (riskValue) => {
  const positions = {
    'low': 'calc(0% - 10px)',
    'medium': 'calc(33% - 10px)',
    'high': 'calc(66% - 10px)',
    'extreme': 'calc(100% - 10px)'
  }
  return positions[riskValue] || '0%'
}

// Load holdings from portfolio-input
const loadMyHoldings = () => {
  const saved = localStorage.getItem('portfolio_input_data')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      if (data.holdings && Array.isArray(data.holdings)) {
        myHoldings.value = data.holdings
      }
    } catch (e) {
      console.error('Failed to load holdings:', e)
    }
  }
}

// Right Sidebar Functions

// Toggle saved category expansion
const toggleSavedCategory = (categoryId) => {
  const index = expandedSavedCategories.value.indexOf(categoryId)
  if (index > -1) {
    expandedSavedCategories.value.splice(index, 1)
  } else {
    expandedSavedCategories.value.push(categoryId)
  }
}

// Load saved reports from localStorage
const loadSavedReports = () => {
  // 使用 composable 刷新状态
  refreshStatus()
  
  // 从 composable 获取数据
  const categories = savedReports.value
  savedReportCategories.value = categories
  
  if (categories.length > 0) {
    // Auto expand first category
    if (expandedSavedCategories.value.length === 0) {
      expandedSavedCategories.value.push(categories[0].id)
    }
  }
  // 不再自动初始化演示数据，新用户应该看到空白状态
}

// Delete a report from category
const deleteReport = (categoryId, reportId) => {
  if (confirm('确认删除这份报告吗？')) {
    const categoryIndex = savedReportCategories.value.findIndex(c => c.id === categoryId)
    if (categoryIndex > -1) {
      const category = savedReportCategories.value[categoryIndex]
      category.reports = category.reports.filter(r => r.id !== reportId)
      
      // If category is empty, remove it
      if (category.reports.length === 0) {
        savedReportCategories.value.splice(categoryIndex, 1)
        // Remove from expanded list
        const expIndex = expandedSavedCategories.value.indexOf(categoryId)
        if (expIndex > -1) {
          expandedSavedCategories.value.splice(expIndex, 1)
        }
      }
      
      // Save back to localStorage (use same key as SaveReportsDialog)
      localStorage.setItem('opportunity_report_categories', JSON.stringify(savedReportCategories.value))
      
      // Update global saved reports status for navigation bar
      checkSavedReports()
    }
  }
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  // Less than 1 hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000)
    return `${minutes}分钟前`
  }
  
  // Less than 24 hours
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000)
    return `${hours}小时前`
  }
  
  // Less than 7 days
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000)
    return `${days}天前`
  }
  
  // Format as date
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

// Simulate generating progress (for demonstration)
const simulateGeneratingProgress = () => {
  if (isGeneratingReports.value && generatingReports.value.length === 0) {
    // Create generating report entries
    generatingReports.value = selectedStocks.value.map((symbol, index) => ({
      symbol: symbol,
      progress: 0,
      status: '准备中...'
    }))
    
    // Simulate progress updates
    const updateProgress = () => {
      generatingReports.value = generatingReports.value.map(report => {
        if (report.progress < 100) {
          const increment = 10 + Math.random() * 20
          const newProgress = Math.min(100, report.progress + increment)
          return {
            ...report,
            progress: Math.floor(newProgress),
            status: newProgress < 30 ? '分析基本面...' : 
                    newProgress < 60 ? '计算指标...' : 
                    newProgress < 90 ? '生成报告...' : '完成'
          }
        }
        return report
      })
      
      // Continue updating if not all complete
      if (generatingReports.value.some(r => r.progress < 100)) {
        setTimeout(updateProgress, 500)
      } else {
        // Clear generating reports after 2 seconds
        setTimeout(() => {
          generatingReports.value = []
        }, 2000)
      }
    }
    
    setTimeout(updateProgress, 500)
  }
}

// Watch for report generation start
const startGenerating = () => {
  if (isGeneratingReports.value) {
    simulateGeneratingProgress()
  }
}

// Initialize demo data for generating reports
const initializeDemoGeneratingReports = () => {
  const now = Date.now()
  generatingReports.value = [
    // 正在生成的报告 - 分组1: 基本面分析 + 趋势分析（短期高风险）
    {
      id: 'gen-600519',
      symbol: '600519',
      stockName: '贵州茅台',
      progress: 75,
      status: '分析财务数据...',
      completed: false,
      config: {
        framework: '基本面分析 + 趋势分析',
        period: '1m-6m',
        riskPreference: '高'
      },
      isPaused: false,
      estimatedTimeRemaining: 75
    },
    {
      id: 'gen-000858',
      symbol: '000858',
      stockName: '五粮液',
      progress: 15,
      status: '初始化策略引擎...',
      completed: false,
      config: {
        framework: '基本面分析 + 趋势分析',
        period: '1m-6m',
        riskPreference: '高'
      },
      isPaused: false,
      estimatedTimeRemaining: 255
    },
    // 分组2: 技术分析 + 量化（中期中风险）
    {
      id: 'gen-000001',
      symbol: '000001',
      stockName: '平安银行',
      progress: 40,
      status: '获取行业数据...',
      completed: false,
      config: {
        framework: '技术分析 + 量化',
        period: '3m-12m',
        riskPreference: '中'
      },
      isPaused: false,
      estimatedTimeRemaining: 180
    },
    {
      id: 'gen-600036',
      symbol: '600036',
      stockName: '招商银行',
      progress: 88,
      status: '生成投资建议...',
      completed: false,
      config: {
        framework: '技术分析 + 量化',
        period: '3m-12m',
        riskPreference: '中'
      },
      isPaused: false,
      estimatedTimeRemaining: 36
    },
    {
      id: 'gen-002594',
      symbol: '002594',
      stockName: '比亚迪',
      progress: 62,
      status: '评估成长性...',
      completed: false,
      config: {
        framework: '技术分析 + 量化',
        period: '3m-12m',
        riskPreference: '中'
      },
      isPaused: true,
      estimatedTimeRemaining: 114
    },
    // 分组3: 价值投资 + 宏观分析（长期低风险）
    {
      id: 'gen-601318',
      symbol: '601318',
      stockName: '中国平安',
      progress: 58,
      status: '计算技术指标...',
      completed: false,
      config: {
        framework: '价值投资 + 宏观分析',
        period: '6m-24m',
        riskPreference: '低'
      },
      isPaused: false,
      estimatedTimeRemaining: 126
    },
    {
      id: 'gen-600276',
      symbol: '600276',
      stockName: '恒瑞医药',
      progress: 33,
      status: '分析行业地位...',
      completed: false,
      config: {
        framework: '价值投资 + 宏观分析',
        period: '6m-24m',
        riskPreference: '低'
      },
      isPaused: false,
      estimatedTimeRemaining: 201
    },
    {
      id: 'gen-600887',
      symbol: '600887',
      stockName: '伊利股份',
      progress: 71,
      status: '计算内在价值...',
      completed: false,
      config: {
        framework: '价值投资 + 宏观分析',
        period: '6m-24m',
        riskPreference: '低'
      },
      isPaused: false,
      estimatedTimeRemaining: 87
    },
    // 分组4: 成长股分析 + 动量策略（超短期高风险）
    {
      id: 'gen-300750',
      symbol: '300750',
      stockName: '宁德时代',
      progress: 92,
      status: '生成交易信号...',
      completed: false,
      config: {
        framework: '成长股分析 + 动量策略',
        period: '1m-3m',
        riskPreference: '高'
      },
      isPaused: false,
      estimatedTimeRemaining: 24
    },
    {
      id: 'gen-601012',
      symbol: '601012',
      stockName: '隆基绿能',
      progress: 47,
      status: '分析新能源趋势...',
      completed: false,
      config: {
        framework: '成长股分析 + 动量策略',
        period: '1m-3m',
        riskPreference: '高'
      },
      isPaused: true,
      estimatedTimeRemaining: 159
    },
    // 已完成的报告
    {
      id: 'completed-600887',
      symbol: '600887',
      stockName: '伊利股份',
      expectedReturn: '18.5',
      riskLevel: '中等',
      generatedAt: now - 3600000, // 1小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-000333',
      symbol: '000333',
      stockName: '美的集团',
      expectedReturn: '22.3',
      riskLevel: '中等',
      generatedAt: now - 7200000, // 2小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-601888',
      symbol: '601888',
      stockName: '中国中免',
      expectedReturn: '28.7',
      riskLevel: '较高',
      generatedAt: now - 10800000, // 3小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-600276',
      symbol: '600276',
      stockName: '恒瑞医药',
      expectedReturn: '15.2',
      riskLevel: '较低',
      generatedAt: now - 14400000, // 4小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-000568',
      symbol: '000568',
      stockName: '泸州老窖',
      expectedReturn: '20.8',
      riskLevel: '中等',
      generatedAt: now - 21600000, // 6小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-601012',
      symbol: '601012',
      stockName: '隆基绿能',
      expectedReturn: '25.4',
      riskLevel: '较高',
      generatedAt: now - 28800000, // 8小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-002594',
      symbol: '002594',
      stockName: '比亚迪',
      expectedReturn: '32.1',
      riskLevel: '高',
      generatedAt: now - 43200000, // 12小时前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-600309',
      symbol: '600309',
      stockName: '万华化学',
      expectedReturn: '16.9',
      riskLevel: '中等',
      generatedAt: now - 86400000, // 1天前
      progress: 100,
      completed: true
    },
    {
      id: 'completed-300750',
      symbol: '300750',
      stockName: '宁德时代',
      expectedReturn: '35.6',
      riskLevel: '高',
      generatedAt: now - 172800000, // 2天前
      progress: 100,
      completed: true
    }
  ]
}

// Initialize demo data for saved reports
const initializeDemoData = () => {
  const now = Date.now()
  const demoCategories = [
    {
      id: 'demo-tech-stocks',
      name: '科技股机会',
      description: '高成长科技股投资机会',
      color: '#3b82f6',
      createdAt: new Date(now - 86400000 * 2).toISOString(), // 2 days ago
      reports: [
        {
          id: 'demo-report-aapl',
          symbol: 'AAPL',
          stockName: 'Apple Inc.',
          framework: 'fundamental',
          period: '1m-6m',
          risk: 'medium',
          riskRewardRatio: '3.2:1',
          expectedReturn: '15.8',
          entryPrice: '178.50',
          targetPrice: '206.70',
          score: 88,
          generatedAt: new Date(now - 7200000).toISOString() // 2 hours ago
        },
        {
          id: 'demo-report-msft',
          symbol: 'MSFT',
          stockName: 'Microsoft Corporation',
          framework: 'quantitative',
          period: '1m-6m',
          risk: 'medium',
          riskRewardRatio: '2.8:1',
          expectedReturn: '12.3',
          entryPrice: '385.20',
          targetPrice: '432.60',
          score: 85,
          generatedAt: new Date(now - 10800000).toISOString() // 3 hours ago
        },
        {
          id: 'demo-report-nvda',
          symbol: 'NVDA',
          stockName: 'NVIDIA Corporation',
          framework: 'momentum',
          period: '1d-1m',
          risk: 'high',
          riskRewardRatio: '4.1:1',
          expectedReturn: '22.5',
          entryPrice: '485.30',
          targetPrice: '594.50',
          score: 92,
          generatedAt: new Date(now - 14400000).toISOString() // 4 hours ago
        }
      ]
    },
    {
      id: 'demo-value-invest',
      name: '价值投资',
      description: '低估值优质标的',
      color: '#10b981',
      createdAt: new Date(now - 86400000 * 5).toISOString(), // 5 days ago
      reports: [
        {
          id: 'demo-report-jpm',
          symbol: 'JPM',
          stockName: 'JPMorgan Chase & Co.',
          framework: 'fundamental',
          period: '6m+',
          risk: 'low',
          riskRewardRatio: '2.5:1',
          expectedReturn: '18.7',
          entryPrice: '148.20',
          targetPrice: '175.90',
          score: 82,
          generatedAt: new Date(now - 86400000).toISOString() // 1 day ago
        },
        {
          id: 'demo-report-bac',
          symbol: 'BAC',
          stockName: 'Bank of America Corp',
          framework: 'fundamental',
          period: '6m+',
          risk: 'low',
          riskRewardRatio: '2.3:1',
          expectedReturn: '16.4',
          entryPrice: '32.80',
          targetPrice: '38.20',
          score: 79,
          generatedAt: new Date(now - 172800000).toISOString() // 2 days ago
        }
      ]
    },
    {
      id: 'demo-short-term',
      name: '短线交易',
      description: '快速进出的短线机会',
      color: '#f59e0b',
      createdAt: new Date(now - 86400000).toISOString(), // 1 day ago
      reports: [
        {
          id: 'demo-report-tsla',
          symbol: 'TSLA',
          stockName: 'Tesla Inc.',
          framework: 'technical',
          period: '1d-5d',
          risk: 'extreme',
          riskRewardRatio: '5.2:1',
          expectedReturn: '28.9',
          entryPrice: '238.50',
          targetPrice: '307.40',
          score: 75,
          generatedAt: new Date(now - 3600000).toISOString() // 1 hour ago
        },
        {
          id: 'demo-report-amd',
          symbol: 'AMD',
          stockName: 'Advanced Micro Devices',
          framework: 'technical',
          period: '1d-5d',
          risk: 'high',
          riskRewardRatio: '3.8:1',
          expectedReturn: '19.2',
          entryPrice: '142.30',
          targetPrice: '169.60',
          score: 81,
          generatedAt: new Date(now - 5400000).toISOString() // 1.5 hours ago
        }
      ]
    }
  ]
  
  savedReportCategories.value = demoCategories
  localStorage.setItem('opportunity_report_categories', JSON.stringify(demoCategories))
  
  // Auto expand first category
  if (demoCategories.length > 0) {
    expandedSavedCategories.value.push(demoCategories[0].id)
  }
}

// Step 4: Saved Reports Multi-Selection Functions
const toggleSavedReportSelection = (reportId) => {
  const index = selectedSavedReportIds.value.indexOf(reportId)
  if (index > -1) {
    selectedSavedReportIds.value.splice(index, 1)
  } else {
    selectedSavedReportIds.value.push(reportId)
  }
}

const toggleSelectAllInCategory = (categoryId) => {
  const category = savedReportCategories.value.find(c => c.id === categoryId)
  if (!category || !category.reports) return
  
  const categoryReportIds = category.reports.map(r => r.id)
  const allSelected = categoryReportIds.every(id => selectedSavedReportIds.value.includes(id))
  
  if (allSelected) {
    // Deselect all reports in this category
    selectedSavedReportIds.value = selectedSavedReportIds.value.filter(
      id => !categoryReportIds.includes(id)
    )
  } else {
    // Select all reports in this category
    categoryReportIds.forEach(id => {
      if (!selectedSavedReportIds.value.includes(id)) {
        selectedSavedReportIds.value.push(id)
      }
    })
  }
}

const isAllReportsSelectedInCategory = (categoryId) => {
  const category = savedReportCategories.value.find(c => c.id === categoryId)
  if (!category || !category.reports || category.reports.length === 0) return false
  
  const categoryReportIds = category.reports.map(r => r.id)
  return categoryReportIds.every(id => selectedSavedReportIds.value.includes(id))
}

const getSelectedReportsInCategory = (categoryId) => {
  const category = savedReportCategories.value.find(c => c.id === categoryId)
  if (!category || !category.reports) return []
  
  return category.reports.filter(r => selectedSavedReportIds.value.includes(r.id))
}

// Batch Refresh Reports
const batchRefreshReports = async (categoryId) => {
  const selectedReports = getSelectedReportsInCategory(categoryId)
  if (selectedReports.length === 0) return
  
  // Add selected reports to generating queue
  selectedReports.forEach(report => {
    const existingIndex = generatingReports.value.findIndex(
      r => r.originalReportId === report.id && !r.completed
    )
    
    // If report is not already in generating queue, add it
    if (existingIndex === -1) {
      generatingReports.value.push({
        symbol: report.symbol,
        stockName: report.stockName,
        progress: 0,
        status: '准备刷新...',
        expectedReturn: null,
        riskLevel: null,
        targetPrice: null,
        currentPrice: parseFloat(report.entryPrice),
        generatedAt: null,
        completed: false,
        isRefresh: true,
        categoryId: categoryId,
        originalReportId: report.id
      })
    }
  })
  
  // Expand sidebar to show progress
  isSidebarCollapsed.value = false
  
  // Start refresh simulation
  await simulateRefreshProgress(selectedReports, categoryId)
  
  // Clear selection after refresh starts
  selectedSavedReportIds.value = selectedSavedReportIds.value.filter(
    id => !selectedReports.map(r => r.id).includes(id)
  )
}

// Simulate refresh progress for selected reports
const simulateRefreshProgress = async (reports, categoryId) => {
  for (const report of reports) {
    await refreshSingleReport(report, categoryId)
    // Add delay between reports
    await new Promise(resolve => setTimeout(resolve, 500))
  }
}

// Refresh a single report
const refreshSingleReport = async (report, categoryId) => {
  // Find the report in generating queue by its unique ID
  const reportIndex = generatingReports.value.findIndex(
    r => r.originalReportId === report.id && r.isRefresh && !r.completed
  )
  
  if (reportIndex === -1) return
  
  // Simulate progress updates
  const progressSteps = [
    { progress: 0, status: '准备刷新...', delay: 300 },
    { progress: 15, status: '获取最新数据...', delay: 800 },
    { progress: 35, status: '分析基本面...', delay: 1000 },
    { progress: 55, status: '计算技术指标...', delay: 900 },
    { progress: 75, status: '评估风险收益...', delay: 800 },
    { progress: 90, status: '生成报告...', delay: 700 },
    { progress: 100, status: '刷新完成', delay: 500 }
  ]
  
  for (const step of progressSteps) {
    generatingReports.value[reportIndex].progress = step.progress
    generatingReports.value[reportIndex].status = step.status
    await new Promise(resolve => setTimeout(resolve, step.delay))
  }
  
  // Generate updated report data
  const basePrice = parseFloat(report.entryPrice) * (0.95 + Math.random() * 0.1)
  const expectedReturn = 5 + Math.random() * 25
  const targetPrice = basePrice * (1 + expectedReturn / 100)
  const score = 75 + Math.floor(Math.random() * 20)
  
  const updatedReport = {
    ...report,
    expectedReturn: expectedReturn.toFixed(1),
    entryPrice: basePrice.toFixed(2),
    targetPrice: targetPrice.toFixed(2),
    score: score,
    riskRewardRatio: `${(2 + Math.random() * 3).toFixed(1)}:1`,
    generatedAt: new Date().toISOString()
  }
  
  // Update report in localStorage
  const category = savedReportCategories.value.find(c => c.id === categoryId)
  if (category) {
    const reportIndexInCategory = category.reports.findIndex(r => r.id === report.id)
    if (reportIndexInCategory > -1) {
      category.reports[reportIndexInCategory] = updatedReport
      
      // Save to localStorage
      localStorage.setItem('opportunity_report_categories', JSON.stringify(savedReportCategories.value))
    }
  }
  
  // Mark as completed in generating queue
  generatingReports.value[reportIndex].completed = true
  generatingReports.value[reportIndex].expectedReturn = parseFloat(updatedReport.expectedReturn)
  generatingReports.value[reportIndex].riskLevel = updatedReport.risk
  generatingReports.value[reportIndex].targetPrice = parseFloat(updatedReport.targetPrice)
  generatingReports.value[reportIndex].generatedAt = updatedReport.generatedAt
  
  // Remove from generating queue after delay
  setTimeout(() => {
    const idx = generatingReports.value.findIndex(
      r => r.symbol === report.symbol && r.isRefresh && r.originalReportId === report.id
    )
    if (idx > -1) {
      generatingReports.value.splice(idx, 1)
    }
  }, 2000)
}

// Watch for report generation start
watch(isGeneratingReports, (newValue) => {
  if (newValue) {
    simulateGeneratingProgress()
  }
})

// ===== MyStrategy Tab: Collections & Data =====

// Strategy Collections (sidebar items)
const strategyCollections = computed(() => {
  const allCount = allSavedStrategies.value.length
  const officialCount = allSavedStrategies.value.filter(s => s.source === 'Official').length
  const myStrategiesCount = allSavedStrategies.value.filter(s => s.source === 'My Strategy').length
  const withPlansCount = allSavedStrategies.value.filter(s => s.hasExecutionPlan === true).length
  const watchlistCount = allSavedStrategies.value.filter(s => s.isWatchlist === true).length
  const archivedCount = allSavedStrategies.value.filter(s => s.isArchived === true).length
  
  return [
    {
      id: 'all',
      name: 'All Strategies',
      count: allCount,
      icon: 'svg'
    },
    {
      id: 'official',
      name: 'Official Reports',
      count: officialCount,
      icon: 'svg'
    },
    {
      id: 'my-strategies',
      name: 'My Strategies',
      count: myStrategiesCount,
      icon: 'svg'
    },
    {
      id: 'with-plans',
      name: 'With Execution Plans',
      count: withPlansCount,
      icon: 'svg'
    },
    {
      id: 'watchlist',
      name: 'Watchlist',
      count: watchlistCount,
      icon: 'svg'
    },
    {
      id: 'archived',
      name: 'Archived',
      count: archivedCount,
      icon: 'svg'
    }
  ]
})

// Current collection name
const currentCollectionName = computed(() => {
  const collection = strategyCollections.value.find(c => c.id === selectedCollection.value)
  return collection ? collection.name : 'All Strategies'
})

// Filtered and sorted strategies
const displayedStrategies = computed(() => {
  let strategies = [...allSavedStrategies.value]
  
  // Filter by collection
  if (selectedCollection.value === 'official') {
    strategies = strategies.filter(s => s.source === 'Official')
  } else if (selectedCollection.value === 'my-strategies') {
    strategies = strategies.filter(s => s.source === 'My Strategy')
  } else if (selectedCollection.value === 'with-plans') {
    strategies = strategies.filter(s => s.hasExecutionPlan === true)
  } else if (selectedCollection.value === 'watchlist') {
    strategies = strategies.filter(s => s.isWatchlist === true)
  } else if (selectedCollection.value === 'archived') {
    strategies = strategies.filter(s => s.isArchived === true)
  }
  
  // Filter by direction
  if (strategyFilterOption.value === 'long') {
    strategies = strategies.filter(s => s.direction === 'LONG')
  } else if (strategyFilterOption.value === 'short') {
    strategies = strategies.filter(s => s.direction !== 'LONG')
  }
  
  // Search filter
  if (strategySearchQuery.value.trim()) {
    const query = strategySearchQuery.value.toLowerCase()
    strategies = strategies.filter(s => 
      s.symbol.toLowerCase().includes(query) ||
      s.stockName.toLowerCase().includes(query)
    )
  }
  
  // Sort
  if (strategySortOption.value === 'date-desc') {
    strategies.sort((a, b) => new Date(b.savedAt || b.generatedAt) - new Date(a.savedAt || a.generatedAt))
  } else if (strategySortOption.value === 'date-asc') {
    strategies.sort((a, b) => new Date(a.savedAt || a.generatedAt) - new Date(b.savedAt || b.generatedAt))
  } else if (strategySortOption.value === 'ticker') {
    strategies.sort((a, b) => a.symbol.localeCompare(b.symbol))
  }
  
  return strategies
})

// Load saved strategies from localStorage
const loadSavedStrategies = () => {
  try {
    const saved = localStorage.getItem('opportunity_report_categories')
    if (saved) {
      const categories = JSON.parse(saved)
      
      // Flatten all reports from all categories
      const allReports = []
      categories.forEach(category => {
        if (category.reports && Array.isArray(category.reports)) {
          category.reports.forEach(report => {
            allReports.push({
              ...report,
              categoryName: category.name,
              categoryId: category.id,
              // Add default fields for backward compatibility
              hasExecutionPlan: report.hasExecutionPlan ?? false,
              isWatchlist: report.isWatchlist ?? false,
              isArchived: report.isArchived ?? false
            })
          })
        }
      })
      
      // If only old data without new fields, merge with demo data
      if (allReports.length > 0 && allReports.every(r => !r.hasExecutionPlan && !r.isWatchlist && !r.isArchived)) {
        // Merge old data with demo data
        allSavedStrategies.value = [...allReports, ...generateDemoStrategies()]
        console.log('Loaded saved strategies with demo data:', allSavedStrategies.value.length)
      } else {
        allSavedStrategies.value = allReports
        console.log('Loaded saved strategies:', allReports.length)
      }
    } else {
      // Add demo data if no saved strategies exist
      allSavedStrategies.value = generateDemoStrategies()
      console.log('Loaded demo strategies:', allSavedStrategies.value.length)
    }
  } catch (error) {
    console.error('Failed to load saved strategies:', error)
    allSavedStrategies.value = generateDemoStrategies()
  }
}

// Generate demo strategy data for demonstration
const generateDemoStrategies = () => {
  const now = new Date()
  
  return [
    // Official Reports (5 items)
    {
      id: 'demo-1',
      symbol: 'AAPL',
      stockName: 'Apple Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Short-term (1-3 months)',
      source: 'Official',
      hasExecutionPlan: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech'
    },
    {
      id: 'demo-2',
      symbol: 'TSLA',
      stockName: 'Tesla, Inc.',
      direction: 'SHORT',
      grade: 'B',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      hasExecutionPlan: false,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      categoryName: 'High Risk',
      categoryId: 'high-risk'
    },
    {
      id: 'demo-3',
      symbol: 'MSFT',
      stockName: 'Microsoft Corporation',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Long-term (6+ months)',
      source: 'Official',
      hasExecutionPlan: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech'
    },
    {
      id: 'demo-4',
      symbol: 'NVDA',
      stockName: 'NVIDIA Corporation',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      hasExecutionPlan: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'AI & Semiconductors',
      categoryId: 'ai'
    },
    {
      id: 'demo-5',
      symbol: 'GOOGL',
      stockName: 'Alphabet Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'Official',
      hasExecutionPlan: false,
      isWatchlist: false,
      isArchived: true,
      generatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech'
    },
    
    // My Strategies (5 items)
    {
      id: 'demo-6',
      symbol: 'META',
      stockName: 'Meta Platforms, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      hasExecutionPlan: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Social Media',
      categoryId: 'social'
    },
    {
      id: 'demo-7',
      symbol: 'AMZN',
      stockName: 'Amazon.com, Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'My Strategy',
      hasExecutionPlan: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'E-Commerce',
      categoryId: 'ecommerce'
    },
    {
      id: 'demo-8',
      symbol: 'AMD',
      stockName: 'Advanced Micro Devices',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      hasExecutionPlan: false,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'AI & Semiconductors',
      categoryId: 'ai'
    },
    {
      id: 'demo-9',
      symbol: 'NFLX',
      stockName: 'Netflix, Inc.',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      hasExecutionPlan: false,
      isWatchlist: false,
      isArchived: true,
      generatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Entertainment',
      categoryId: 'entertainment'
    },
    {
      id: 'demo-10',
      symbol: 'BA',
      stockName: 'Boeing Company',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'My Strategy',
      hasExecutionPlan: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Aerospace',
      categoryId: 'aerospace'
    },
    
    // Additional strategies for more variety
    {
      id: 'demo-11',
      symbol: 'JPM',
      stockName: 'JPMorgan Chase & Co.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      hasExecutionPlan: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Financials',
      categoryId: 'finance'
    },
    {
      id: 'demo-12',
      symbol: 'V',
      stockName: 'Visa Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Long-term (6+ months)',
      source: 'My Strategy',
      hasExecutionPlan: false,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Payments',
      categoryId: 'payments'
    },
    {
      id: 'demo-13',
      symbol: 'DIS',
      stockName: 'The Walt Disney Company',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'Official',
      hasExecutionPlan: false,
      isWatchlist: false,
      isArchived: true,
      generatedAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Entertainment',
      categoryId: 'entertainment'
    },
    {
      id: 'demo-14',
      symbol: 'COIN',
      stockName: 'Coinbase Global, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Medium-term (3-6 months)',
      source: 'My Strategy',
      hasExecutionPlan: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Crypto',
      categoryId: 'crypto'
    },
    {
      id: 'demo-15',
      symbol: 'PFE',
      stockName: 'Pfizer Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'Official',
      hasExecutionPlan: false,
      isWatchlist: false,
      isArchived: true,
      generatedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Healthcare',
      categoryId: 'healthcare'
    }
  ]
}

// View strategy detail
const viewStrategyDetail = (strategy) => {
  console.log('View strategy detail:', strategy)
  // Navigate to report detail page
  router.push(`/opportunity/report/${strategy.id}`)
}

// Show strategy context menu
const showStrategyMenu = (strategy) => {
  console.log('Show strategy menu:', strategy)
  // TODO: Implement context menu
}

// Initialize
// Watch route query parameter changes
watch(() => route.query.tab, (newTab) => {
  if (newTab && ['generate', 'queue', 'mystrategy'].includes(newTab)) {
    activeTab.value = newTab
    
    // Load strategies when switching to mystrategy tab
    if (newTab === 'mystrategy') {
      loadSavedStrategies()
    }
  }
})

// Initialize demo execution plan batches for testing
const initializeDemoExecutionPlanBatches = () => {
  // TEMPORARY: Force refresh demo data to include strategy-report types
  // TODO: Implement version-based data migration
  // const existing = localStorage.getItem('execution_plan_batches')
  // if (existing) {
  //   return // Don't override existing data
  // }

  // Create demo batches with BOTH execution-plan and strategy-report types
  const demoBatches = [
    // Execution Plan Batch 1 (processing)
    {
      batchId: 'batch-demo-1',
      type: 'execution-plan',
      status: 'processing',
      totalCount: 5,
      completedCount: 2,
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'item-1',
          symbol: 'AAPL',
          stockName: 'Apple Inc.',
          grade: 'A',
          status: 'completed',
          progress: 100,
          duration: 12,
          currentStep: '已完成',
          positionSize: 15,
          costPrice: 175.50
        },
        {
          id: 'item-2',
          symbol: 'MSFT',
          stockName: 'Microsoft Corporation',
          grade: 'A',
          status: 'completed',
          progress: 100,
          duration: 11,
          currentStep: '已完成',
          positionSize: 12,
          costPrice: 380.20
        },
        {
          id: 'item-3',
          symbol: 'GOOGL',
          stockName: 'Alphabet Inc.',
          grade: 'B',
          status: 'processing',
          progress: 65,
          duration: 8,
          currentStep: '分析技术指标...',
          positionSize: 10,
          costPrice: 140.50
        },
        {
          id: 'item-4',
          symbol: 'AMZN',
          stockName: 'Amazon.com Inc.',
          grade: 'A',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...',
          positionSize: 8,
          costPrice: 145.30
        },
        {
          id: 'item-5',
          symbol: 'NVDA',
          stockName: 'NVIDIA Corporation',
          grade: 'B',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...',
          positionSize: 20,
          costPrice: 480.00
        }
      ]
    },
    // Strategy Report Batch (processing) - NEW!
    {
      batchId: 'batch-demo-strategy-1',
      type: 'strategy-report',
      status: 'processing',
      totalCount: 4,
      completedCount: 1,
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'item-s1',
          symbol: '600519',
          stockName: '贵州茅台',
          grade: 'A',
          status: 'completed',
          progress: 100,
          duration: 15,
          currentStep: '已完成'
        },
        {
          id: 'item-s2',
          symbol: '000858',
          stockName: '五粮液',
          grade: 'B',
          status: 'processing',
          progress: 72,
          duration: 11,
          currentStep: '生成投资建议...'
        },
        {
          id: 'item-s3',
          symbol: '600036',
          stockName: '招商银行',
          grade: 'A',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...'
        },
        {
          id: 'item-s4',
          symbol: '601318',
          stockName: '中国平安',
          grade: 'B',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...'
        }
      ]
    },
    // Strategy Report Batch (pending) - NEW!
    {
      batchId: 'batch-demo-strategy-2',
      type: 'strategy-report',
      status: 'pending',
      totalCount: 3,
      completedCount: 0,
      createdAt: new Date().toISOString(),
      items: [
        {
          id: 'item-s5',
          symbol: '002594',
          stockName: '比亚迪',
          grade: 'A',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...'
        },
        {
          id: 'item-s6',
          symbol: '300750',
          stockName: '宁德时代',
          grade: 'A',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...'
        },
        {
          id: 'item-s7',
          symbol: '600276',
          stockName: '恒瑞医药',
          grade: 'B',
          status: 'pending',
          progress: 0,
          duration: 0,
          currentStep: '等待开始...'
        }
      ]
    },
    // Execution Plan Batch 2 (completed)
    {
      batchId: 'batch-demo-2',
      type: 'execution-plan',
      status: 'completed',
      totalCount: 3,
      completedCount: 3,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 1800000).toISOString(),
      items: [
        {
          id: 'item-6',
          symbol: 'TSLA',
          stockName: 'Tesla Inc.',
          grade: 'B',
          status: 'completed',
          progress: 100,
          duration: 13,
          currentStep: '已完成',
          positionSize: 5,
          costPrice: 245.00
        },
        {
          id: 'item-7',
          symbol: 'META',
          stockName: 'Meta Platforms Inc.',
          grade: 'A',
          status: 'completed',
          progress: 100,
          duration: 11,
          currentStep: '已完成',
          positionSize: 10,
          costPrice: 360.80
        },
        {
          id: 'item-8',
          symbol: 'NFLX',
          stockName: 'Netflix Inc.',
          grade: 'C',
          status: 'completed',
          progress: 100,
          duration: 12,
          currentStep: '已完成',
          positionSize: 7,
          costPrice: 420.50
        }
      ]
    },
    // Strategy Report Batch 3 (completed) - NEW!
    {
      batchId: 'batch-demo-strategy-3',
      type: 'strategy-report',
      status: 'completed',
      totalCount: 2,
      completedCount: 2,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      completedAt: new Date(Date.now() - 5400000).toISOString(),
      items: [
        {
          id: 'item-s8',
          symbol: '600887',
          stockName: '伊利股份',
          grade: 'A',
          status: 'completed',
          progress: 100,
          duration: 14,
          currentStep: '已完成'
        },
        {
          id: 'item-s9',
          symbol: '000333',
          stockName: '美的集团',
          grade: 'B',
          status: 'completed',
          progress: 100,
          duration: 13,
          currentStep: '已完成'
        }
      ]
    }
  ]

  localStorage.setItem('execution_plan_batches', JSON.stringify(demoBatches))
}

onMounted(() => {
  loadMyHoldings()
  restorePageState()
  loadSavedReports()
  loadSavedStrategies() // Load strategies for mystrategy tab
  // Initialize demo execution plan batches (only if none exist)
  initializeDemoExecutionPlanBatches()
  loadExecutionPlanBatches() // Load execution plan batches
  // Initialize demo generating reports
  initializeDemoGeneratingReports()
  
  // Initialize activeTab from URL query parameter
  if (route.query.tab && ['generate', 'queue', 'mystrategy'].includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
})
</script>
