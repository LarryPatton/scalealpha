<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Page-level Progress Navigation -->
    <div class="bg-[#2a2a2a] border-b border-[#404040] py-4">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-center gap-4">
          <!-- Step 1: 选股 -->
          <div class="flex items-center">
            <button
              @click="currentStep = 1"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                currentStep === 1 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                  : currentStep > 1 
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                    : 'bg-[#3a3a3a] text-gray-400'
              ]"
            >
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                currentStep === 1 ? 'bg-white text-blue-600' : currentStep > 1 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-white'
              ]">
                1
              </div>
              <span class="font-medium">选股</span>
            </button>
          </div>

          <!-- Connector -->
          <div :class="[
            'w-12 h-0.5 transition-all duration-300',
            currentStep > 1 ? 'bg-blue-500' : 'bg-gray-700'
          ]"></div>

          <!-- Step 2: 选择策略 -->
          <div class="flex items-center">
            <button
              @click="currentStep >= 2 && (currentStep = 2)"
              :disabled="currentStep < 2"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                currentStep === 2 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                  : currentStep > 2 
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30' 
                    : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
              ]"
            >
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                currentStep === 2 ? 'bg-white text-blue-600' : currentStep > 2 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'
              ]">
                2
              </div>
              <span class="font-medium">选择策略</span>
            </button>
          </div>

          <!-- Connector -->
          <div :class="[
            'w-12 h-0.5 transition-all duration-300',
            currentStep > 2 ? 'bg-blue-500' : 'bg-gray-700'
          ]"></div>

          <!-- Step 3: 查看机会 -->
          <div class="flex items-center">
            <button
              @click="currentStep >= 3 && (currentStep = 3)"
              :disabled="currentStep < 3"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                currentStep === 3 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                  : currentStep > 3
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                    : 'bg-[#3a3a3a] text-gray-500 cursor-not-allowed'
              ]"
            >
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                currentStep === 3 ? 'bg-white text-blue-600' : currentStep > 3 ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'
              ]">
                3
              </div>
              <span class="font-medium">查看机会</span>
            </button>
          </div>

          <!-- Connector -->
          <div :class="[
            'w-12 h-0.5 transition-all duration-300',
            currentStep > 3 ? 'bg-blue-500' : 'bg-gray-700'
          ]"></div>

          <!-- Step 4: 查看已保存报告 -->
          <div class="flex items-center">
            <button
              @click="goToStep4"
              :disabled="!hasAnySavedReports"
              :class="[
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                currentStep === 4 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                  : !hasAnySavedReports
                    ? 'bg-[#3a3a3a] text-gray-600 cursor-not-allowed'
                    : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#404040]'
              ]"
            >
              <div :class="[
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                currentStep === 4 ? 'bg-white text-blue-600' : !hasAnySavedReports ? 'bg-gray-700 text-gray-600' : 'bg-gray-600 text-gray-300'
              ]">
                4
              </div>
              <span class="font-medium">查看已保存报告</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex h-[calc(100vh-180px)]">
      <!-- Step 1: 选股 -->
      <template v-if="currentStep === 1">
        <!-- Sidebar -->
        <div class="w-80 bg-[#2a2a2a] border-r border-[#404040] overflow-y-auto">
          <div class="p-4">
            <h2 class="text-lg font-semibold text-white mb-4">股票分类</h2>
            
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

        <!-- Main Area: Selected Stocks -->
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-5xl mx-auto">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-2xl font-bold text-white mb-2">已选股票</h1>
                <p class="text-gray-400">已选择 {{ selectedStocks.length }} 只股票</p>
              </div>
              <div class="flex gap-2">
                <button
                  @click="selectAllStocks"
                  class="px-4 py-2 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
                >
                  全选
                </button>
                <button
                  @click="clearAllStocks"
                  class="px-4 py-2 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
                >
                  清空
                </button>
              </div>
            </div>

            <!-- Selected Stocks Grid -->
            <div v-if="selectedStocks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div
                v-for="symbol in selectedStocks"
                :key="symbol"
                class="bg-[#2a2a2a] border border-[#404040] rounded-lg p-4 relative group"
              >
                <button
                  @click="toggleStock(symbol)"
                  class="absolute top-2 right-2 w-6 h-6 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                >
                  ×
                </button>
                <div class="font-mono font-bold text-white text-lg">{{ symbol }}</div>
                <div class="text-sm text-gray-400 mt-1">点击移除</div>
              </div>
            </div>

            <div v-else class="text-center py-12">
              <svg class="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <p class="text-gray-400">请从左侧选择股票</p>
            </div>

            <!-- Next Button -->
            <div class="flex justify-end pt-6 border-t border-[#404040]">
              <button
                @click="goToStep2"
                :disabled="selectedStocks.length === 0"
                :class="[
                  'px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all',
                  selectedStocks.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                ]"
              >
                <span>下一步：选择策略</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Step 2: 选择策略 -->
      <template v-else-if="currentStep === 2">
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">选择分析策略</h1>
            <p class="text-gray-400 mb-8">点击选择您想要的分析框架、投资周期和风险偏好</p>

            <!-- Strategy Selection Grid -->
            <div class="space-y-8">
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

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-8 border-t border-[#404040] mt-8">
              <button
                @click="currentStep = 1"
                class="px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                </svg>
                <span>上一步</span>
              </button>
              
              <button
                @click="goToStep3"
                :disabled="!isStrategyComplete"
                :class="[
                  'px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all',
                  isStrategyComplete
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                ]"
              >
                <span>下一步：查看机会</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Step 3: 查看机会 -->
      <template v-else-if="currentStep === 3">
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold text-white mb-6">投资机会报告</h1>

            <!-- Loading State -->
            <div v-if="isGeneratingReports" class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 mb-6">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
                  <svg class="w-8 h-8 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h2 class="text-xl font-semibold text-white mb-2">正在生成报告...</h2>
                <p class="text-gray-300 mb-6">
                  已完成 {{ generatedReports.length }} / {{ selectedStocks.length }} 份报告
                </p>
                
                <!-- Progress Bar -->
                <div class="w-full bg-[#1f1f1f] rounded-full h-3 mb-2">
                  <div 
                    class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                    :style="{ width: `${(generatedReports.length / selectedStocks.length) * 100}%` }"
                  ></div>
                </div>
                <div class="text-sm text-gray-400">
                  {{ Math.round((generatedReports.length / selectedStocks.length) * 100) }}%
                </div>
              </div>
            </div>

            <!-- Report Summary (After Loading) -->
            <div v-else class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-6">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-white mb-2">分析完成</h2>
                  <p class="text-gray-300">基于 {{ selectedStocks.length }} 只股票和您选择的策略生成报告</p>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-bold text-white">{{ generatedReports.length }}</div>
                  <div class="text-sm text-gray-400">份报告</div>
                </div>
              </div>
            </div>

            <!-- Strategy Info -->
            <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-6">
              <h3 class="text-lg font-semibold text-white mb-4">策略配置</h3>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <div class="text-sm text-gray-400 mb-1">分析框架</div>
                  <div class="text-white font-medium">{{ getFrameworksLabel() }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-400 mb-1">投资周期</div>
                  <div class="text-white font-medium">{{ selectedStrategy.period }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-400 mb-1">风险偏好</div>
                  <div class="text-white font-medium">{{ getRiskLabel(selectedStrategy.risk) }}</div>
                </div>
              </div>
            </div>

            <!-- Reports Grid -->
            <div v-if="!isGeneratingReports" class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">投资机会报告</h3>
                <div class="flex items-center gap-4">
                  <button
                    v-if="generatedReports.length > 0"
                    @click="selectAllReports"
                    class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {{ selectedReportIds.length === generatedReports.length ? '取消全选' : '全选' }}
                  </button>
                  <div class="text-sm text-gray-400">
                    {{ selectedReportIds.length > 0 ? `已选择 ${selectedReportIds.length} 份报告` : '点击报告卡片查看详细分析' }}
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <OpportunityReportCard
                  v-for="report in generatedReports"
                  :key="report.id"
                  :report="report"
                  :is-selected="selectedReportIds.includes(report.id)"
                  @click="viewReportDetail(report)"
                  @view-detail="navigateToReportDetail(report)"
                  @toggle-select="toggleReportSelection(report.id)"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="!isGeneratingReports" class="flex justify-between pt-6 border-t border-[#404040]">
              <button
                @click="currentStep = 2"
                class="px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                </svg>
                <span>上一步</span>
              </button>
              
              <div class="flex gap-3">
                <button
                  v-if="selectedReportIds.length > 0"
                  @click="showSaveDialog = true"
                  class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                  </svg>
                  <span>保存选中报告 ({{ selectedReportIds.length }})</span>
                </button>
                <button
                  @click="goToStep4"
                  :disabled="!hasAnySavedReports"
                  :class="[
                    'px-8 py-3 rounded-lg font-medium transition-all flex items-center gap-2',
                    hasAnySavedReports
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  <span>下一步：查看已保存报告</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Step 4: 查看已保存报告 -->
      <template v-else-if="currentStep === 4">
        <div class="flex-1 overflow-y-auto p-6">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-2xl font-bold text-white mb-2">已保存的报告</h1>
                <p class="text-gray-400">管理您保存的投资机会报告</p>
              </div>
              <button
                @click="loadSavedReports"
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                </svg>
                <span>刷新</span>
              </button>
            </div>

            <!-- Empty State -->
            <div v-if="savedReportCategories.length === 0" class="text-center py-16">
              <div class="inline-flex items-center justify-center w-24 h-24 bg-gray-800 rounded-full mb-6">
                <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h2 class="text-xl font-semibold text-white mb-2">暂无已保存的报告</h2>
              <p class="text-gray-400 mb-6">开始生成并保存您的第一份投资机会报告</p>
              <button
                @click="currentStep = 1"
                class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                返回选股
              </button>
            </div>

            <!-- Saved Categories List -->
            <div v-else class="space-y-6">
              <div
                v-for="category in savedReportCategories"
                :key="category.id"
                class="bg-[#2a2a2a] border border-[#404040] rounded-xl overflow-hidden"
              >
                <!-- Category Header -->
                <div class="bg-gradient-to-r from-[#2a2a2a] to-[#1f1f1f] border-b border-[#404040] p-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <div 
                        class="w-12 h-12 rounded-lg flex items-center justify-center"
                        :style="{ backgroundColor: category.color + '20', border: `2px solid ${category.color}40` }"
                      >
                        <svg class="w-6 h-6" :style="{ color: category.color }" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-white mb-1">{{ category.name }}</h3>
                        <div class="flex items-center gap-3 text-sm text-gray-400">
                          <span>{{ category.reports?.length || 0 }} 份报告</span>
                          <span>•</span>
                          <span>创建于 {{ formatDate(category.createdAt) }}</span>
                        </div>
                        <p v-if="category.description" class="text-sm text-gray-500 mt-1">{{ category.description }}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <!-- Select All for Category -->
                      <button
                        v-if="expandedSavedCategories.includes(category.id) && category.reports?.length > 0"
                        @click="toggleSelectAllInCategory(category.id)"
                        class="px-3 py-1.5 text-sm bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
                      >
                        {{ isAllReportsSelectedInCategory(category.id) ? '取消全选' : '全选' }}
                      </button>
                      <button
                        @click="toggleSavedCategory(category.id)"
                        :class="[
                          'w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] flex items-center justify-center transition-all',
                          expandedSavedCategories.includes(category.id) && 'bg-blue-600/20 hover:bg-blue-600/30'
                        ]"
                      >
                        <svg 
                          :class="['w-5 h-5 text-gray-400 transition-transform', expandedSavedCategories.includes(category.id) && 'rotate-180']"
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Category Reports (Expandable) -->
                <div v-show="expandedSavedCategories.includes(category.id)" class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <OpportunityReportCard
                      v-for="report in category.reports"
                      :key="report.id"
                      :report="report"
                      :show-delete="false"
                      :is-selected="selectedSavedReportIds.includes(report.id)"
                      @click="viewReportDetail(report)"
                      @view-detail="navigateToReportDetail(report)"
                      @toggle-select="toggleSavedReportSelection(report.id)"
                    />
                  </div>
                  
                  <!-- Batch Update Button -->
                  <div v-if="getSelectedReportsInCategory(category.id).length > 0" class="flex items-center justify-center pt-4 border-t border-[#404040]">
                    <button
                      @click="batchRefreshReports(category.id)"
                      class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/50 transition-all flex items-center gap-2"
                    >
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
                      </svg>
                      <span>批量更新 ({{ getSelectedReportsInCategory(category.id).length }})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between pt-8 border-t border-[#404040] mt-8">
              <button
                @click="currentStep = 3"
                class="px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                </svg>
                <span>上一步</span>
              </button>
              
              <button
                @click="handleEnterPlanning"
                :disabled="selectedSavedReportIds.length === 0"
                :class="[
                  'px-8 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2',
                  selectedSavedReportIds.length > 0
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/50'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed shadow-none'
                ]"
              >
                <span>{{ selectedSavedReportIds.length > 0 ? `进入计划制定 (${selectedSavedReportIds.length})` : '请先选择报告' }}</span>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </template>

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
                    v-for="report in completedReports"
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
import { useRouter } from 'vue-router'
import OpportunityReportCard from '../components/opportunity/OpportunityReportCard.vue'
import SaveReportsDialog from '../components/opportunity/SaveReportsDialog.vue'
import PositionConfirmDialog from '../components/opportunity/PositionConfirmDialog.vue'
import HoldingsClassificationDialog from '../components/opportunity/HoldingsClassificationDialog.vue'
import { useSavedReports } from '../composables/useSavedReports'

const router = useRouter()
const { 
  savedReports, 
  checkSavedReports, 
  refreshStatus 
} = useSavedReports()

// Current Step
const currentStep = ref(1)

// Step 1: Stock Selection
const selectedStocks = ref([])
const expandedCategories = ref([]) // Default to collapsed state
const myHoldings = ref([])

// Step 3: Report Generation
const isGeneratingReports = ref(false)
const generatedReportsData = ref([])
const selectedReportIds = ref([])
const showSaveDialog = ref(false)

// Step 4: Saved Reports Multi-Selection
const selectedSavedReportIds = ref([])

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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: true
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
    completed: false
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
    completed: false
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
    completed: false
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
    completed: false
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
    completed: false
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
    completed: false
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
    completed: false
  }
])
const savedReportCategories = ref([]) // Saved report categories from localStorage

// Check if there are any saved reports
const hasAnySavedReports = computed(() => {
  return savedReportCategories.value.length > 0
})
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
  return generatedReports.value.filter(r => selectedReportIds.value.includes(r.id))
})

// Computed: Sidebar reports separated by status
const completedReports = computed(() => {
  return generatingReports.value.filter(r => r.completed === true)
})

const inProgressReports = computed(() => {
  return generatingReports.value.filter(r => r.completed === false)
})

const completedReportsCount = computed(() => {
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

const goToStep2 = () => {
  if (selectedStocks.value.length > 0) {
    currentStep.value = 2
  }
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

const goToStep3 = async () => {
  if (isStrategyComplete.value) {
    currentStep.value = 3
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
  
  // Set the generated reports data
  generatedReportsData.value = [formattedReport]
  selectedReportIds.value = []
  
  // Jump to step 3
  currentStep.value = 3
  isGeneratingReports.value = false
  
  // Save state
  savePageState()
}

const goToStep4 = () => {
  // Check if there are any saved reports
  if (!hasAnySavedReports.value) {
    return
  }
  currentStep.value = 4
  // Ensure saved reports are loaded
  loadSavedReports()
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
  
  // Show success message (you can add a toast notification here)
  if (result.isNew) {
    alert(`✅ 成功创建分类"${result.categoryName}"并保存了 ${selectedReportIds.value.length} 份报告！`)
  } else {
    const count = result.addedCount || selectedReportIds.value.length
    alert(`✅ 成功将 ${count} 份报告添加到"${result.categoryName}"！`)
  }
  
  // Clear selection after save
  selectedReportIds.value = []
}

// Get stock name (mock data)
const getStockName = (symbol) => {
  const names = {
    'AAPL': 'Apple Inc.',
    'MSFT': 'Microsoft Corporation',
    'GOOGL': 'Alphabet Inc.',
    'META': 'Meta Platforms Inc.',
    'AMZN': 'Amazon.com Inc.',
    'NVDA': 'NVIDIA Corporation',
    'AMD': 'Advanced Micro Devices',
    'TSLA': 'Tesla Inc.',
    'INTC': 'Intel Corporation',
    'JPM': 'JPMorgan Chase & Co.',
    'BAC': 'Bank of America Corp',
    'WFC': 'Wells Fargo & Company',
    'GS': 'Goldman Sachs Group',
    'MS': 'Morgan Stanley',
    'V': 'Visa Inc.',
    'MA': 'Mastercard Inc.'
  }
  return names[symbol] || `${symbol} Corporation`
}

// Navigate to report detail
const viewReportDetail = (report) => {
  // In Step 4, clicking card does nothing (use multi-select instead)
  if (currentStep.value === 4) {
    // Do nothing - multi-select is handled by toggle-select event
    return
  }
  
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
  generatingReports.value = [
    {
      symbol: 'GOOGL',
      progress: 35,
      status: '分析基本面...'
    },
    {
      symbol: 'META',
      progress: 68,
      status: '计算指标...'
    },
    {
      symbol: 'AMZN',
      progress: 92,
      status: '生成报告...'
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

// Initialize
onMounted(() => {
  loadMyHoldings()
  restorePageState()
  loadSavedReports()
  // Initialize demo generating reports
  initializeDemoGeneratingReports()
})
</script>
