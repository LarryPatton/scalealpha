<template>
  <div class="h-screen bg-[#050505] text-gray-300 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col">
    <Navbar />
    
    <main class="flex-1 pt-16 px-4 lg:px-8 max-w-[2200px] mx-auto w-full flex flex-col overflow-hidden relative">
      <!-- Toast Notifications -->
      <div class="fixed top-20 right-8 z-50 flex flex-col gap-2 pointer-events-none">
        <TransitionGroup name="toast">
          <div 
            v-for="toast in toasts" 
            :key="toast.id"
            class="pointer-events-auto min-w-[300px] max-w-md bg-[#1a1a1a] border border-[#333] rounded shadow-2xl p-4 flex items-start gap-3 transform transition-all duration-300"
            :class="{
              'border-l-4 border-l-emerald-500': toast.type === 'success',
              'border-l-4 border-l-red-500': toast.type === 'error',
              'border-l-4 border-l-blue-500': toast.type === 'info',
              'border-l-4 border-l-yellow-500': toast.type === 'warning'
            }"
          >
            <!-- Icons based on type -->
            <div class="shrink-0 mt-0.5">
              <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              <svg v-else-if="toast.type === 'warning'" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <svg v-else class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-200 font-medium">{{ toast.message }}</p>
            </div>
            <button @click="removeToast(toast.id)" class="text-gray-500 hover:text-white transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </TransitionGroup>
      </div>

      <!-- Header Removed as per user request -->
      
      <!-- Main Split Layout: Generate Tab -->
      <div v-if="activeTab === 'generate'" class="flex-1 flex gap-6 min-h-0 mt-0 pb-24 animate-fade-in relative">
        
        <!-- Help Button for Generate Tour -->
        <button 
          @click="startGenerateTour"
          class="absolute top-2 right-2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
          title="查看使用引导"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="absolute right-full mr-2 px-2 py-1 text-xs text-white bg-[#222] border border-[#333] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            使用引导
          </span>
        </button>
        
        <!-- Left Column: Asset Selection -->
        <div id="asset-selection-panel" class="w-[400px] flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
          <!-- Search & Filter Header -->
          <div class="p-4 border-b border-[#222] bg-[#0a0a0a]">
            <div class="flex gap-1 bg-[#111] p-1 rounded-sm border border-[#222]">
              <button 
                v-for="tab in assetTabs" 
                :key="tab.id"
                @click="currentAssetTab = tab.id"
                class="flex-1 py-1.5 text-xs font-medium rounded-sm transition-all uppercase tracking-wider"
                :class="currentAssetTab === tab.id ? 'bg-[#222] text-cyan-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'"
              >
                {{ tab.label }}
              </button>
            </div>

            <div v-if="currentAssetTab === 'search'" class="relative mt-4">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="SEARCH_ASSET // 输入代码或名称" 
                class="w-full bg-[#111] border border-[#333] text-white text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono placeholder-gray-600"
              />
              <div class="absolute right-3 top-2.5 text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>
          </div>

          <!-- Asset List -->
          <div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            <div 
              v-for="stock in currentStockList" 
              :key="stock.symbol"
              @click="toggleStock(stock)"
              class="group flex items-center justify-between p-3 rounded-sm cursor-pointer border border-transparent transition-all hover:bg-[#111]"
              :class="selectedStocks.includes(stock.symbol) ? 'bg-[#111] border-[#333] ring-1 ring-cyan-500/30' : ''"
            >
              <div class="flex items-center gap-3">
                <div 
                  class="w-4 h-4 border border-[#444] rounded-sm flex items-center justify-center transition-colors"
                  :class="selectedStocks.includes(stock.symbol) ? 'bg-cyan-500/20 border-cyan-500' : 'group-hover:border-gray-500'"
                >
                  <div v-if="selectedStocks.includes(stock.symbol)" class="w-2 h-2 bg-cyan-400 rounded-[1px]"></div>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-mono font-bold text-white">{{ stock.symbol }}</span>
                    <span class="text-xs text-gray-500 bg-[#1a1a1a] px-1.5 py-0.5 rounded-sm border border-[#333]">{{ stock.market }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-0.5">{{ stock.name }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-mono text-sm text-white">{{ stock.price }}</div>
                <div class="font-mono text-xs" :class="stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'">
                  {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
                </div>
              </div>
            </div>
          </div>
          
          <!-- Selection Summary -->
          <div class="border-t border-[#222] bg-[#0a0a0a]">
            <!-- Selected Tags Area -->
            <div v-if="selectedStocks.length > 0" class="p-2 border-b border-[#222] bg-[#0f0f0f]">
              <div class="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar">
                <div v-for="symbol in selectedStocks" :key="symbol" class="bg-[#1a1a1a] border border-[#333] rounded-sm px-2 py-1 flex items-center gap-2 group hover:border-red-500/50 transition-colors">
                  <span class="text-xs font-mono text-cyan-400">{{ symbol }}</span>
                  <button @click.stop="removeStock(symbol)" class="text-gray-500 hover:text-red-400">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Summary Footer -->
            <div class="p-3 text-xs text-gray-500 font-mono">
              <span>SELECTED: <span class="text-cyan-400">{{ selectedStocks.length > 0 ? selectedStocks[0] : 'NONE' }}</span></span>
            </div>
          </div>
        </div>

        <!-- Right Column: Strategy Configuration -->
        <div class="flex-1 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50 relative">
          
          <!-- Scrollable Content - 使用 flex 布局充分利用纵向空间 -->
          <div class="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-4">
            
            <!-- Header - 固定高度区域 -->
            <div class="flex justify-between items-center mb-3 border-b border-[#222] pb-2 shrink-0">
              <div>
                <h2 class="text-xl font-bold text-white uppercase tracking-widest mb-1">Strategy Config</h2>
                <p class="text-xs text-gray-500 font-mono">CONFIGURE YOUR ANALYSIS PARAMETERS</p>
              </div>
            </div>

            <!-- Recommendation Hint - 固定高度区域 -->
            <div class="bg-cyan-900/10 border border-cyan-500/20 rounded-sm p-3 mb-3 flex items-start gap-3 shrink-0">
              <div class="mt-0.5 text-cyan-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p class="text-xs text-cyan-200/80 leading-relaxed">
                <span class="font-bold text-cyan-400">使用推荐卡片</span> = 如果你回答之前的问题，那么推荐来自你的回答；如果你没回答，则交给模型随机判断。
              </p>
            </div>

            <!-- Advanced Mode Settings - 弹性区域，均分剩余空间 -->
            <div class="flex-1 flex flex-col gap-4 animate-fade-in min-h-0">
              
              <!-- 1. Analysis Framework - flex-[2] 因为有2行卡片 -->
              <div id="analysis-frameworks" class="flex-[2] flex flex-col min-h-0">
                <h3 class="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> 推荐配置：主分析框架
                </h3>
                <div class="grid grid-cols-4 gap-2 flex-1 auto-rows-fr">
                  <button 
                    v-for="framework in frameworks" 
                    :key="framework.id"
                    @click="toggleFramework(framework.id)"
                    class="p-2 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
                    :class="selectedFrameworks.includes(framework.id) ? 'border-cyan-500 bg-cyan-900/20 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/50' : 'hover:border-[#444]'"
                  >
                    <div class="flex justify-between items-start">
                      <component v-if="framework.id === 'auto' && selectedFrameworks.includes('auto')" :is="IconAutoFilled" class="w-4 h-4 text-cyan-400 transition-colors" />
                      <component v-else :is="framework.icon" class="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" :class="selectedFrameworks.includes(framework.id) ? 'text-cyan-400' : ''" />
                      <div class="w-3 h-3 border border-[#333] rounded-[1px] flex items-center justify-center" :class="selectedFrameworks.includes(framework.id) ? 'bg-cyan-500 border-cyan-500' : ''">
                        <svg v-if="selectedFrameworks.includes(framework.id)" class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                    <div>
                      <div class="text-xs font-bold text-white mb-0.5">{{ framework.title }}</div>
                      <div class="text-[9px] text-gray-500 leading-tight line-clamp-1">{{ framework.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- 2. Investment Period - flex-1 均分空间 -->
              <div id="investment-period" class="flex-1 flex flex-col min-h-0">
                <h3 class="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 投资周期
                </h3>
                <div class="grid grid-cols-5 gap-2 flex-1">
                  <button 
                    v-for="period in periods" 
                    :key="period.id"
                    @click="selectedPeriod = period.id"
                    class="p-2 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
                    :class="selectedPeriod === period.id ? 'border-blue-500 bg-blue-900/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50' : 'hover:border-[#444]'"
                  >
                    <component v-if="period.id === 'auto' && selectedPeriod === 'auto'" :is="IconAutoFilled" class="w-4 h-4 text-blue-400 transition-colors" />
                    <component v-else :is="period.icon" class="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" :class="selectedPeriod === period.id ? 'text-blue-400' : ''" />
                    <div>
                      <div class="text-xs font-bold text-white mb-0">{{ period.title }}</div>
                      <div class="text-[9px] text-gray-500 font-mono line-clamp-1" :class="selectedPeriod === period.id ? 'text-blue-200/70' : ''">{{ period.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- 3. Risk Appetite - flex-1 均分空间 -->
              <div id="risk-appetite" class="flex-1 flex flex-col min-h-0">
                <h3 class="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> 风险偏好
                </h3>
                <div class="grid grid-cols-5 gap-2 flex-1">
                  <button 
                    v-for="risk in risks" 
                    :key="risk.id"
                    @click="selectedRisk = risk.id"
                    class="p-2 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
                    :class="selectedRisk === risk.id ? 'border-orange-500 bg-orange-900/20 shadow-[0_0_20px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50' : 'hover:border-[#444]'"
                  >
                    <component v-if="risk.id === 'auto' && selectedRisk === 'auto'" :is="IconAutoFilled" class="w-4 h-4 text-orange-400 transition-colors" />
                    <component v-else :is="risk.icon" class="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors" :class="selectedRisk === risk.id ? 'text-orange-400' : ''" />
                    <div>
                      <div class="text-xs font-bold text-white mb-0">{{ risk.title }}</div>
                      <div class="text-[9px] text-gray-500 line-clamp-1" :class="selectedRisk === risk.id ? 'text-orange-200/70' : ''">{{ risk.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>

            </div>
          </div>

          <!-- Footer Action Bar -->
          <div class="p-6 border-t border-[#222] bg-[#0a0a0a] flex justify-between items-center">
            <div class="text-xs text-gray-500 font-mono">
              <div>EST. TIME: <span class="text-white">~3 MINS</span></div>
              <div>COST: <span class="text-white">20 CREDITS</span></div>
            </div>
            <button 
              id="generate-btn"
              @click="handleInitializeGeneration"
              :disabled="isGenerationDisabled"
              class="px-8 py-3 font-bold text-sm tracking-widest uppercase rounded-sm transition-all flex items-center gap-2"
              :class="isGenerationDisabled 
                ? 'bg-[#222] text-gray-600 cursor-not-allowed' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Initialize Generation
            </button>
          </div>

        </div>
      </div>

        <!-- My Strategy Tab Content -->
        <div v-else-if="activeTab === 'mystrategy'" class="flex-1 flex flex-col min-h-0 mt-0 pb-20 animate-fade-in relative">
          
          <!-- Active Tasks Section (Zone A) -->
          <div id="active-generation-panel" class="w-full mb-2 border border-[#222] bg-[#0a0a0a] rounded-lg p-3 shadow-lg shrink-0">
             <div class="flex justify-between items-center mb-2">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                 <span class="w-2 h-2 rounded-full" :class="(pendingTasks.length + processingTasks.length) > 0 ? 'bg-cyan-500 animate-pulse' : 'bg-gray-600'"></span>
                 Active Generation
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono text-gray-600">{{ pendingTasks.length + processingTasks.length }} TASKS</span>
                <!-- Expand/Collapse Button -->
                <button 
                  v-if="pendingTasks.length + processingTasks.length > maxVisibleTasks"
                  @click="isActiveGenExpanded = !isActiveGenExpanded"
                  class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all"
                  :class="isActiveGenExpanded 
                    ? 'text-cyan-400 border-cyan-500/50 bg-cyan-900/20 hover:bg-cyan-900/30' 
                    : 'text-gray-400 border-[#333] hover:border-gray-500 hover:text-gray-200'"
                >
                  <svg 
                    class="w-3 h-3 transition-transform duration-200" 
                    :class="isActiveGenExpanded ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  {{ isActiveGenExpanded ? 'Collapse' : 'Expand' }}
                </button>
                <!-- Help Button for Strategy Tour -->
                <button 
                  @click="startStrategyTour"
                  class="w-6 h-6 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                  title="查看使用引导"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
              </div>
           </div>
           
           <!-- Collapsed View -->
           <div v-if="!isActiveGenExpanded" class="flex gap-3 overflow-hidden min-h-[70px]">
                <!-- Empty State -->
                <div v-if="pendingTasks.length === 0 && processingTasks.length === 0" class="w-full flex items-center justify-center text-gray-600 text-xs font-mono border border-dashed border-[#333] rounded-sm">
                  NO ACTIVE TASKS
                </div>

                <!-- Processing Tasks (显示在前面) -->
                <div 
                  v-for="task in visibleProcessingTasks" 
                  :key="task.id" 
                  class="min-w-[280px] max-w-[280px] bg-[#111] border rounded-sm p-3 relative overflow-hidden group cursor-pointer transition-all shrink-0"
                  :class="[
                    selectedStrategyId === `temp-${task.id}` 
                      ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30 selected-task-glow' 
                      : 'border-cyan-900/30 hover:border-cyan-500/50'
                  ]"
                  @click="selectTaskStrategy(task)"
                >
                   <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                   <div class="flex justify-between items-start mb-2">
                      <div class="flex items-center gap-2">
                         <span class="text-xs font-bold text-white">{{ task.symbol }}</span>
                         <span class="text-[10px] px-1.5 py-0.5 bg-cyan-900/20 text-cyan-400 rounded border border-cyan-900/30">PROCESSING</span>
                         <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/30 animate-pulse">SELECTED</span>
                      </div>
                      <div class="text-[10px] text-gray-500">{{ task.timeLeft }}</div>
                   </div>
                   <div class="h-1 bg-[#222] rounded-full overflow-hidden mb-2">
                      <div class="h-full bg-cyan-500 transition-all duration-300 relative" :style="{ width: task.progress + '%' }"></div>
                   </div>
                   <div class="text-[10px] text-gray-500 font-mono">{{ task.statusText }}</div>
                </div>

                <!-- Pending Tasks (只显示折叠数量) -->
                <div 
                  v-for="task in visiblePendingTasks" 
                  :key="task.id" 
                  class="min-w-[200px] max-w-[200px] bg-[#111] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all relative overflow-hidden shrink-0"
                  :class="[
                    selectedStrategyId === `temp-${task.id}` 
                      ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30 opacity-100 selected-task-glow' 
                      : 'border-[#222] hover:border-gray-500 opacity-70 hover:opacity-100'
                  ]"
                  @click="selectTaskStrategy(task)"
                >
                   <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                   <div class="flex justify-between items-center mb-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold" :class="selectedStrategyId === `temp-${task.id}` ? 'text-white' : 'text-gray-400'">{{ task.symbol }}</span>
                        <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/30 animate-pulse">SELECTED</span>
                      </div>
                      <span class="text-[10px] text-gray-600">PENDING</span>
                   </div>
                   <div class="text-[10px] text-gray-600 font-mono">Est: {{ task.estTime }}</div>
                </div>

                <!-- +N More 提示卡片 -->
                <div 
                  v-if="hiddenTasksCount > 0"
                  @click="isActiveGenExpanded = true"
                  class="min-w-[100px] max-w-[100px] bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border border-dashed border-cyan-500/30 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] shrink-0"
                >
                  <span class="text-xl font-bold text-cyan-400">+{{ hiddenTasksCount }}</span>
                  <span class="text-[10px] text-gray-400 mt-1">more</span>
                </div>
           </div>

           <!-- Expanded View (网格布局) -->
           <div v-else class="grid grid-cols-4 gap-3 min-h-[70px]">
              <!-- Empty State -->
              <div v-if="pendingTasks.length === 0 && processingTasks.length === 0" class="col-span-4 flex items-center justify-center text-gray-600 text-xs font-mono border border-dashed border-[#333] rounded-sm py-6">
                NO ACTIVE TASKS
              </div>

              <!-- Processing Tasks -->
              <div 
                v-for="task in processingTasks" 
                :key="task.id" 
                class="bg-[#111] border rounded-sm p-3 relative overflow-hidden group cursor-pointer transition-all"
                :class="[
                  selectedStrategyId === `temp-${task.id}` 
                    ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30 selected-task-glow' 
                    : 'border-cyan-900/30 hover:border-cyan-500/50'
                ]"
                @click="selectTaskStrategy(task)"
              >
                 <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                 <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                       <span class="text-xs font-bold text-white">{{ task.symbol }}</span>
                       <span class="text-[10px] px-1.5 py-0.5 bg-cyan-900/20 text-cyan-400 rounded border border-cyan-900/30">PROCESSING</span>
                       <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/30 animate-pulse">SELECTED</span>
                    </div>
                    <div class="text-[10px] text-gray-500">{{ task.timeLeft }}</div>
                 </div>
                 <div class="h-1 bg-[#222] rounded-full overflow-hidden mb-2">
                    <div class="h-full bg-cyan-500 transition-all duration-300 relative" :style="{ width: task.progress + '%' }"></div>
                 </div>
                 <div class="text-[10px] text-gray-500 font-mono">{{ task.statusText }}</div>
              </div>

              <!-- Pending Tasks -->
              <div 
                v-for="task in pendingTasks" 
                :key="task.id" 
                class="bg-[#111] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all relative overflow-hidden"
                :class="[
                  selectedStrategyId === `temp-${task.id}` 
                    ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30 opacity-100 selected-task-glow' 
                    : 'border-[#222] hover:border-gray-500 opacity-70 hover:opacity-100'
                ]"
                @click="selectTaskStrategy(task)"
              >
                 <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                 <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold" :class="selectedStrategyId === `temp-${task.id}` ? 'text-white' : 'text-gray-400'">{{ task.symbol }}</span>
                      <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 bg-emerald-900/30 text-emerald-400 rounded border border-emerald-500/30 animate-pulse">SELECTED</span>
                    </div>
                    <span class="text-[10px] text-gray-600">PENDING</span>
                 </div>
                 <div class="text-[10px] text-gray-600 font-mono">Est: {{ task.estTime }}</div>
              </div>
           </div>
        </div>

          <div class="flex-1 flex gap-4 overflow-hidden">
            <!-- Left Sidebar: Collections -->
            <div id="strategy-sidebar" class="w-56 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
              <div class="flex-1 overflow-y-auto custom-scrollbar py-1">
                <!-- Smart Filters Section -->
              <div class="px-3 py-2">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Smart Filters</h3>
                  <!-- Toggle Switch -->
                  <button 
                    @click="smartFiltersEnabled = !smartFiltersEnabled; if(!smartFiltersEnabled) libraryFilter = 'all'"
                    class="relative w-7 h-4 rounded-full transition-colors duration-200"
                    :class="smartFiltersEnabled ? 'bg-cyan-600' : 'bg-[#333]'"
                  >
                    <span 
                      class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200"
                      :class="smartFiltersEnabled ? 'translate-x-3' : 'translate-x-0'"
                    ></span>
                  </button>
                </div>
                <div v-if="smartFiltersEnabled" class="space-y-0.5">
                  <button 
                    @click="selectSmartFilter('high-grade')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'high-grade' ? 'bg-[#222] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('high-grade') && libraryFilter !== 'high-grade'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      High Grade (A/B)
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'high-grade' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['high-grade'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('recommend-update')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'recommend-update' ? 'bg-[#222] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('recommend-update') && libraryFilter !== 'recommend-update'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      Recommended Update
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'recommend-update' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['recommend-update'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('no-signal')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'no-signal' ? 'bg-[#222] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('no-signal') && libraryFilter !== 'no-signal'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      No Signal Logs
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'no-signal' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['no-signal'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('no-opportunity')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'no-opportunity' ? 'bg-[#222] text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-[#111]'"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('no-opportunity') && libraryFilter !== 'no-opportunity'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      No Opportunity Found
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'no-opportunity' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['no-opportunity'] }}</span>
                  </button>
                </div>
                <div v-else class="text-[10px] text-gray-600 px-3 py-1">
                  Filters disabled
                </div>
              </div>

              <!-- Divider -->
              <div class="h-px bg-[#222] mx-3 my-1"></div>

              <!-- Collections Section -->
              <div class="px-3 py-2">
                 <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Collections</h3>
              </div>
            <button 
              v-for="col in strategyCollections" 
              :key="col.id"
              @click="selectedCollection = col.id"
              class="w-full flex items-center justify-between px-3 py-2 border-l-2 transition-all group relative"
              :class="selectedCollection === col.id ? 'bg-[#111] border-cyan-500 text-cyan-400' : 'border-transparent text-gray-400 hover:bg-[#111] hover:text-gray-200'"
            >
              <div class="flex items-center gap-2">
                <component :is="col.icon" class="w-3.5 h-3.5" :class="selectedCollection === col.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'" />
                <span class="text-xs font-medium">{{ col.label }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono" :class="selectedCollection === col.id ? 'text-cyan-500' : 'text-gray-600'">{{ col.count }}</span>
                <!-- Delete Button for Custom Groups -->
                <div 
                  v-if="!['all', 'official', 'my', 'plans', 'only-plan'].includes(col.id)" 
                  @click.stop="promptDeleteGroup(col)" 
                  class="w-3.5 h-3.5 flex items-center justify-center rounded hover:bg-red-900/30 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                   <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              </div>
            </button>

            <!-- New Group Input -->
            <div v-if="isCreatingGroup" class="px-3 py-1">
              <div class="flex items-center gap-2 px-3 py-2 border border-cyan-500/50 bg-[#111] rounded">
                <component :is="IconBriefcase" class="w-3.5 h-3.5 text-cyan-400" />
                <input 
                  ref="newGroupInputRef"
                  v-model="newGroupName"
                  @keyup.enter="confirmCreateGroup"
                  @keyup.esc="cancelCreateGroup"
                  @blur="cancelCreateGroup" 
                  type="text" 
                  class="bg-transparent border-none text-xs text-white focus:outline-none w-full font-medium placeholder-gray-600"
                  placeholder="Enter name..."
                />
              </div>
            </div>
          </div>
          
          <!-- Add Group Button -->
          <div v-if="!isCreatingGroup" class="p-3 border-t border-[#222]">
            <button 
              @click="startCreateGroup" 
              class="w-full py-1.5 border border-[#333] rounded text-[10px] font-bold text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              New Group
            </button>
          </div>
        </div>

          <!-- Right Content: Strategy List -->
          <div id="strategy-list-container" class="flex-1 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
            <!-- Header -->
            <div id="strategy-toolbar" class="px-4 py-3 border-b border-[#222] flex justify-between items-center bg-[#0f0f0f] h-[60px] relative z-20">
              
              <!-- Normal Header Content -->
            <div class="flex justify-between items-center w-full animate-fade-in">
              <div>
                <div class="flex items-center gap-3">
                  <h2 class="text-lg font-bold text-white">{{ currentCollectionName }}</h2>
                  <div v-if="selectedStrategyId" class="flex items-center gap-2 px-2 py-0.5 bg-cyan-900/30 rounded border border-cyan-500/30 animate-fade-in">
                    <span class="text-xs font-bold text-cyan-400">{{ selectedStrategy?.symbol || 'Selected' }}</span>
                    <button @click="clearStrategySelection()" class="text-xs text-gray-400 hover:text-white flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/10 transition-colors">✕</button>
                  </div>
                </div>
                <p class="text-xs text-gray-500 font-mono">{{ displayedStrategies.length }} strategies found</p>
              </div>
              <div class="flex items-center gap-3">
                <!-- 一键清理 No Opportunity Found 按钮 -->
                <button 
                  v-if="libraryFilter === 'no-opportunity' && displayedStrategies.length > 0"
                  @click="clearNoOpportunityStrategies"
                  class="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-900/20 border border-red-500/50 text-red-400 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-red-900/40 transition-all"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  Clear All
                </button>
                <!-- Move to Group (Moved from Bulk Action) -->
                <div class="relative mr-2" v-if="selectedStrategyId">
                  <button 
                    @click="showMoveMenu = !showMoveMenu"
                    class="flex items-center gap-2 px-3 py-1.5 bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-cyan-900/40 transition-all"
                  >
                    <component :is="IconBriefcase" class="w-3 h-3" />
                    Move to Group
                    <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div v-if="showMoveMenu" class="absolute left-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded shadow-xl z-[100] overflow-hidden">
                    <div class="py-1">
                      <button 
                        v-for="col in customCollections" 
                        :key="col.id"
                        @click="moveStrategiesToGroup(col.id)"
                        class="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-[#222] hover:text-white flex items-center gap-2"
                      >
                        <component :is="col.icon" class="w-3 h-3 text-gray-500" />
                        {{ col.label }}
                      </button>
                      <div v-if="customCollections.length === 0" class="px-4 py-2 text-xs text-gray-500 italic">
                        No custom groups
                      </div>
                    </div>
                    <div class="border-t border-[#333] p-1">
                       <button @click="startCreateGroup(); showMoveMenu = false" class="w-full text-left px-3 py-2 text-xs text-cyan-400 hover:bg-[#222] font-bold flex items-center gap-2">
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                         Create New Group
                       </button>
                    </div>
                  </div>
                  
                  <!-- Backdrop to close menu -->
                  <div v-if="showMoveMenu" class="fixed inset-0 z-[99]" @click="showMoveMenu = false"></div>
                </div>

                <!-- Search -->
                <div class="relative">
                  <input 
                    v-model="strategySearchQuery"
                    type="text" 
                    placeholder="Search strategies..." 
                    class="bg-[#111] border border-[#333] text-white text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-cyan-500/50 w-48 font-mono"
                  />
                  <div class="absolute right-2 top-1.5 text-gray-600">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                </div>
                
                <!-- Filter -->
                <select v-model="strategyFilterOption" class="bg-[#111] border border-[#333] text-white text-xs px-3 py-1.5 rounded-sm focus:outline-none focus:border-cyan-500/50 font-mono">
                  <option value="all">All Directions</option>
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>

              </div>
            </div>

            <!-- Bulk Action Header Removed -->
          </div>

          <!-- Table -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <table class="w-full text-left border-collapse table-fixed">
              <!-- Column Width Definition -->
              <colgroup>
                <col style="width: 40px;" />  <!-- Radio -->
                <col style="width: 75px;" />  <!-- Ticker -->
                <col style="width: 170px;" /> <!-- Name -->
                <col style="width: 80px;" />  <!-- Source -->
                <col style="width: 80px;" />  <!-- Direction -->
                <col style="width: 55px;" />  <!-- Grade -->
                <col style="width: 75px;" />  <!-- Horizon -->
                <col style="width: 90px;" />  <!-- Created -->
                <col style="width: 80px;" />  <!-- Strategy Update -->
                <col style="width: 85px;" />  <!-- Plan Status -->
                <col style="width: 60px;" />  <!-- Plan Count -->
                <col style="width: 60px;" />  <!-- Unread -->
                <col style="width: 100px;" /> <!-- Generating -->
                <col style="width: 85px;" />  <!-- Plan Update -->
                <col style="width: 90px;" />  <!-- Actions -->
              </colgroup>
              <thead class="sticky top-0 z-20">
                <!-- 分组表头行 -->
                <tr class="border-b border-[#333] bg-[#0a0a0a]">
                  <th rowspan="2" class="px-2 py-2 border-b border-[#222] align-middle bg-[#0a0a0a]">
                    <div 
                      @click="toggleSelectAllStrategies" 
                      class="w-5 h-5 border border-[#444] rounded-[2px] flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors mx-auto" 
                      :class="isAllStrategiesSelected ? 'bg-cyan-500 border-cyan-500' : ''"
                    >
                      <svg v-if="isAllStrategiesSelected" class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </th>
                  <!-- Ticker 独立列 -->
                  <th rowspan="2" @click="handleSort('symbol')" class="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-[#222] border-r border-r-[#333] cursor-pointer hover:text-white transition-colors select-none align-middle bg-[#0a0a0a]">
                    <div class="flex items-center gap-1">
                      Ticker
                      <span v-if="strategySortField === 'symbol'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <!-- 策略分组 -->
                  <th colspan="7" class="px-3 py-2 text-[11px] font-bold text-cyan-400 uppercase tracking-wider border-b border-[#333] border-r border-r-[#333] text-center" style="background: linear-gradient(to right, rgba(14, 116, 144, 0.15), rgba(14, 116, 144, 0.1)), #0a0a0a;">
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      Strategy
                    </div>
                  </th>
                  <!-- 计划分组 -->
                  <th colspan="6" class="px-3 py-2 text-[11px] font-bold text-amber-400 uppercase tracking-wider border-b border-[#333] text-center" style="background: linear-gradient(to right, rgba(180, 83, 9, 0.15), rgba(180, 83, 9, 0.1)), #0a0a0a;">
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      Execution Plan
                    </div>
                  </th>
                </tr>
                <!-- 子表头行 -->
                <tr class="bg-[#0a0a0a]">
                  <!-- 策略子列 -->
                  <th @click="handleSort('stockName')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none bg-[#0a0a0a]">
                    <div class="flex items-center gap-1">
                      Name
                      <span v-if="strategySortField === 'stockName'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('source')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none text-center bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Source
                      <span v-if="strategySortField === 'source'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('direction')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none text-center bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Direction
                      <span v-if="strategySortField === 'direction'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('grade')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none text-center bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Grade
                      <span v-if="strategySortField === 'grade'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('horizon')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none text-center bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Horizon
                      <span v-if="strategySortField === 'horizon'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('generatedAt')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none text-center bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Created
                      <span v-if="strategySortField === 'generatedAt'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] border-r border-r-[#333] text-center bg-[#0a0a0a]">
                    Update
                  </th>
                  <!-- 计划子列 -->
                  <th @click="handleSort('hasExecutionPlan')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center cursor-pointer hover:text-white transition-colors select-none bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Status
                      <span v-if="strategySortField === 'hasExecutionPlan'" class="text-amber-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('planCount')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center cursor-pointer hover:text-white transition-colors select-none bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Count
                      <span v-if="strategySortField === 'planCount'" class="text-amber-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('planUnreadCount')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center cursor-pointer hover:text-white transition-colors select-none bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Unread
                      <span v-if="strategySortField === 'planUnreadCount'" class="text-amber-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('planGeneratingCount')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center cursor-pointer hover:text-white transition-colors select-none bg-[#0a0a0a]">
                    <div class="flex items-center justify-center gap-1">
                      Generating
                      <span v-if="strategySortField === 'planGeneratingCount'" class="text-amber-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('planNeedsUpdate')" class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center justify-center gap-1">
                      Update
                      <span v-if="strategySortField === 'planNeedsUpdate'" class="text-amber-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th class="px-3 py-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#111]">
                <tr 
                  v-for="(strategy, index) in displayedStrategies" 
                  :key="strategy.id"
                  :id="index === 0 ? 'first-strategy-row' : undefined"
                  class="border-b border-[#222] transition-colors group cursor-pointer relative"
                  :class="[
                    selectedStrategyId === strategy.id ? 'bg-cyan-900/20 border-l-2 border-l-cyan-500' : 'hover:bg-[#161616]',
                    strategy.grade === 'N/A' ? 'opacity-50 grayscale' : '',
                    regeneratingStrategies[strategy.id] ? 'pointer-events-none' : ''
                  ]"
                  @click="strategy.grade !== 'N/A' && !regeneratingStrategies[strategy.id] ? toggleStrategySelection(strategy.id) : null"
                >
                  <!-- Regenerating Overlay -->
                  <td v-if="regeneratingStrategies[strategy.id]" colspan="15" class="absolute inset-0 z-20">
                    <div class="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm flex flex-col items-center justify-center">
                      <div class="flex items-center gap-3 mb-2">
                        <svg class="w-5 h-5 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-sm font-bold text-cyan-400 uppercase tracking-wider">Updating...</span>
                      </div>
                      <div class="w-48 h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
                          :style="{ width: `${Math.min(regeneratingStrategies[strategy.id]?.progress || 0, 100)}%` }"
                        ></div>
                      </div>
                      <span class="text-xs text-gray-500 mt-1 font-mono">{{ Math.round(regeneratingStrategies[strategy.id]?.progress || 0) }}%</span>
                    </div>
                  </td>
                  <!-- 单选指示器 -->
                  <td class="px-2 py-3 whitespace-nowrap relative z-10">
                    <div 
                      @click.stop="toggleStrategySelection(strategy.id)" 
                      class="w-5 h-5 border-2 rounded-full flex items-center justify-center cursor-pointer transition-colors mx-auto" 
                      :class="selectedStrategyId === strategy.id ? 'border-cyan-500 bg-cyan-500' : 'border-[#444] hover:border-cyan-500'"
                    >
                      <div v-if="selectedStrategyId === strategy.id" class="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  </td>
                  <!-- Ticker (独立列) -->
                  <td class="px-3 py-3 whitespace-nowrap border-r border-r-[#222]">
                    <span class="font-mono font-bold text-white text-sm">{{ strategy.symbol }}</span>
                  </td>
                  <!-- Name + View Button -->
                  <td class="px-3 py-3 whitespace-nowrap">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <!-- 未读策略标记 -->
                        <span v-if="strategy.strategyUnread" class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" title="Unread Strategy"></span>
                        <span class="text-xs text-gray-300 truncate max-w-[90px]" :title="strategy.stockName">{{ strategy.stockName }}</span>
                      </div>
                      <!-- View Button (hover) -->
                      <button 
                        v-if="strategy.grade !== 'N/A'" 
                        @click.stop="viewStrategyDetail(strategy)"
                        class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border border-cyan-500/30 px-2 py-0.5 rounded bg-[#0a0a0a]/90 whitespace-nowrap hover:bg-cyan-900/30 hover:border-cyan-500/50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                      >
                        View
                      </button>
                    </div>
                  </td>
                  <!-- Source -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.source"
                      class="px-2 py-0.5 rounded text-[10px] font-bold border"
                      :class="{
                        'text-cyan-400 border-cyan-500/30 bg-cyan-900/10': strategy.source === 'AI',
                        'text-orange-400 border-orange-500/30 bg-orange-900/10': strategy.source === 'Manual',
                        'text-violet-400 border-violet-500/30 bg-violet-900/10': strategy.source === 'Import'
                      }"
                    >
                      {{ strategy.source }}
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Direction (完整显示) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.direction === 'LONG' || strategy.direction === 'SHORT'"
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border"
                      :class="strategy.direction === 'LONG' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-900/10' : 'text-rose-400 border-rose-500/30 bg-rose-900/10'"
                    >
                      {{ strategy.direction }}
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Grade -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <div 
                      v-if="strategy.grade && strategy.grade !== 'N/A'"
                      class="w-6 h-6 flex items-center justify-center rounded-sm font-bold text-xs border mx-auto"
                      :class="{
                        'border-emerald-500/30 bg-emerald-900/10 text-emerald-400': strategy.grade === 'A',
                        'border-blue-500/30 bg-blue-900/10 text-blue-400': strategy.grade === 'B',
                        'border-yellow-500/30 bg-yellow-900/10 text-yellow-400': strategy.grade === 'C'
                      }"
                    >
                      {{ strategy.grade }}
                    </div>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Horizon (完整显示) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.horizon && strategy.horizon !== 'N/A'"
                      class="px-2 py-0.5 rounded text-[10px] font-bold border"
                      :class="{
                        'text-purple-400 border-purple-500/30 bg-purple-900/10': strategy.horizon.includes('Long'),
                        'text-blue-400 border-blue-500/30 bg-blue-900/10': strategy.horizon.includes('Medium'),
                        'text-amber-400 border-amber-500/30 bg-amber-900/10': strategy.horizon.includes('Short')
                      }"
                      :title="strategy.horizon"
                    >
                      {{ strategy.horizon.includes('Long') ? 'Long' : strategy.horizon.includes('Medium') ? 'Medium' : 'Short' }}
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Created (策略下) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <div class="text-xs text-gray-400 font-mono">{{ new Date(strategy.generatedAt).toLocaleDateString() }}</div>
                  </td>
                  <!-- Strategy Update (建议更新) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center border-r border-r-[#222]">
                    <!-- Official 来源：显示官方更新状态 -->
                    <template v-if="strategy.source === 'Official'">
                      <span 
                        v-if="strategy.officialUpdating"
                        class="px-2.5 py-1 bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                        title="Official is updating"
                      >
                        Updating
                      </span>
                      <span 
                        v-else-if="strategy.officialUpdated"
                        class="px-2.5 py-1 bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                        title="Official has updated"
                      >
                        Updated
                      </span>
                      <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                    </template>
                    <!-- Only Plan 类型：没有策略，显示空 -->
                    <template v-else-if="strategy.hasStrategy === false">
                      <span class="text-xs text-gray-500 tracking-wider">— — —</span>
                    </template>
                    <!-- No Opportunity Found (N/A grade)：显示 Retry 按钮 -->
                    <template v-else-if="strategy.grade === 'N/A'">
                      <button 
                        @click.stop="handleRegenerateSingle(strategy)"
                        class="px-2.5 py-1 bg-purple-500/30 border border-purple-400/60 text-purple-300 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-purple-500/50 hover:text-purple-200 transition-colors mx-auto"
                        title="Change parameters and retry"
                      >
                        Retry
                      </button>
                    </template>
                    <!-- 非 Official 来源：可点击更新 -->
                    <template v-else>
                      <button 
                        v-if="strategy.strategyNeedsUpdate"
                        @click.stop="handleRegenerateSingle(strategy)"
                        class="px-2.5 py-1 bg-amber-500/30 border border-amber-400/60 text-amber-300 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-amber-500/50 hover:text-amber-200 transition-colors mx-auto"
                        title="Click to update"
                      >
                        Update
                      </button>
                      <span 
                        v-else 
                        class="px-2.5 py-1 bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                      >
                        Updated
                      </span>
                    </template>
                  </td>
                  <!-- Plan Status -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.hasStrategy === false && strategy.hasExecutionPlan"
                      class="px-2 py-0.5 rounded text-[10px] font-bold border text-purple-400 border-purple-500/30 bg-purple-900/10"
                      title="Only Plan - No Strategy Report"
                    >
                      Only Plan
                    </span>
                    <span 
                      v-else-if="strategy.hasExecutionPlan"
                      class="px-2 py-0.5 rounded text-[10px] font-bold border text-emerald-400 border-emerald-500/30 bg-emerald-900/10"
                      title="Has Execution Plan"
                    >
                      With Plan
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Plan Count -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span v-if="strategy.planCount > 0" class="text-sm font-mono text-gray-300">{{ strategy.planCount }}</span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Unread Count -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.planUnreadCount > 0" 
                      class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold bg-cyan-500 text-black"
                    >
                      {{ strategy.planUnreadCount }}
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Generating (带进度条) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <div v-if="strategy.planGeneratingCount > 0" class="flex flex-col items-center gap-1">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-xs font-mono text-cyan-400">{{ strategy.generatingCurrent }}/{{ strategy.planGeneratingCount }}</span>
                      </div>
                      <div class="w-16 h-1.5 bg-[#222] rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all"
                          :style="{ width: `${strategy.generatingProgress || 0}%` }"
                        ></div>
                      </div>
                    </div>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Plan Update -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <button 
                      v-if="strategy.planNeedsUpdate"
                      @click.stop
                      class="flex items-center gap-1.5 px-2 py-1 bg-amber-900/20 border border-amber-500/40 text-amber-400 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-amber-900/40 transition-colors mx-auto"
                      title="Plan needs update"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      Update
                    </button>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Actions -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <div class="flex items-center justify-center gap-1">
                      <!-- Generate Plan -->
                      <button 
                        v-if="strategy.hasExecutionPlan === false && strategy.grade !== 'N/A'"
                        @click.stop="generatePlanForStrategy(strategy)"
                        class="p-1.5 bg-emerald-900/20 border border-emerald-500/40 text-emerald-400 rounded hover:bg-emerald-900/40 transition-colors"
                        title="Generate Plan"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </button>
                      <!-- View Plans -->
                      <button 
                        v-if="strategy.hasExecutionPlan"
                        @click.stop="viewPlanDetail(strategy)"
                        class="p-1.5 bg-cyan-900/20 border border-cyan-500/40 text-cyan-400 rounded hover:bg-cyan-900/40 transition-colors"
                        title="View Plans"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                      <!-- Delete -->
                      <button 
                        @click.stop="deleteStrategy(strategy)"
                        class="p-1.5 bg-red-900/20 border border-red-500/40 text-red-400 rounded hover:bg-red-900/40 transition-colors"
                        title="Delete"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <!-- Empty State -->
            <div v-if="displayedStrategies.length === 0" class="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg class="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p class="text-sm font-mono">NO STRATEGIES FOUND</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Queue Tab Content -->
      <div v-else-if="activeTab === 'queue'" class="flex-1 flex flex-col min-h-0 mt-4 pb-24 animate-fade-in">
        <!-- Filter Bar -->
        <div class="flex justify-between items-center mb-6 px-1">
          <div class="flex gap-2">
            <button 
              v-for="filter in queueFilters" 
              :key="filter.id"
              @click="currentQueueFilter = filter.id"
              class="px-4 py-1.5 text-xs font-bold rounded-sm border transition-all uppercase tracking-wider"
              :class="currentQueueFilter === filter.id ? 'bg-cyan-900/20 text-cyan-400 border-cyan-500/50' : 'bg-[#0a0a0a] border-[#333] text-gray-500 hover:text-gray-300'"
            >
              {{ filter.label }}
            </button>
          </div>
          <div class="text-xs text-gray-500 font-mono">
            TOTAL TASKS: <span class="text-white">{{ totalTasks }}</span>
          </div>
        </div>

        <!-- Kanban Board -->
        <div class="flex-1 grid grid-cols-3 gap-6 min-h-0">
          
          <!-- Column 1: Pending -->
          <div class="flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
            <div class="p-3 border-b border-[#222] flex justify-between items-center bg-[#0f0f0f]">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                <span class="text-xs font-bold text-gray-300 uppercase tracking-wider">Pending</span>
              </div>
              <span class="text-xs font-mono text-gray-600">{{ pendingTasks.length }}</span>
            </div>
            <TransitionGroup name="list" tag="div" class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 relative">
              <div 
                v-for="task in pendingTasks" 
                :key="task.id" 
                class="bg-[#111] border p-4 rounded-sm group hover:border-gray-500 transition-all duration-500 relative overflow-hidden"
                :class="task.isNew ? 'animate-flash border-cyan-500' : 'border-[#333]'"
              >
                <div class="flex justify-between items-start mb-2">
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border" :class="task.type === 'strategy' ? 'text-blue-400 border-blue-500/30 bg-blue-900/10' : 'text-purple-400 border-purple-500/30 bg-purple-900/10'">{{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}</span>
                  <span class="text-[10px] text-gray-600 font-mono">#{{ task.id }}</span>
                </div>
                <h4 class="text-sm font-bold text-gray-200 mb-1 truncate">{{ task.title }}</h4>
                <div class="text-xs text-gray-500 font-mono flex items-center gap-2">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  EST: {{ task.estTime }}
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Column 2: Processing -->
          <div class="flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-[0_0_30px_rgba(8,145,178,0.1)]">
            <div class="p-3 border-b border-[#222] flex justify-between items-center bg-[#0f0f0f]">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span class="text-xs font-bold text-cyan-400 uppercase tracking-wider">Processing</span>
              </div>
              
              <!-- Concurrency Control -->
              <div class="flex items-center gap-2 bg-[#1a1a1a] rounded px-2 py-1 border border-[#333]">
                <span class="text-[10px] text-gray-500 font-mono uppercase">Parallel:</span>
                <button 
                  @click="maxConcurrent > 1 ? maxConcurrent-- : null" 
                  class="text-gray-400 hover:text-white px-1.5 hover:bg-[#333] rounded transition-colors"
                  :class="maxConcurrent <= 1 ? 'opacity-30 cursor-not-allowed' : ''"
                >-</button>
                <span class="text-xs font-mono text-cyan-400 w-4 text-center font-bold">{{ maxConcurrent }}</span>
                <button 
                  @click="maxConcurrent < 5 ? maxConcurrent++ : null" 
                  class="text-gray-400 hover:text-white px-1.5 hover:bg-[#333] rounded transition-colors"
                  :class="maxConcurrent >= 5 ? 'opacity-30 cursor-not-allowed' : ''"
                >+</button>
              </div>
            </div>
            <TransitionGroup name="list" tag="div" class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 relative">
              <div v-for="task in processingTasks" :key="task.id" class="bg-[#111] border border-cyan-900/30 p-4 rounded-sm relative overflow-hidden group">
                <!-- Progress Bar Background -->
                <div class="absolute bottom-0 left-0 h-1 bg-[#222] w-full">
                  <div class="h-full bg-cyan-500 transition-all duration-200 ease-linear" :style="{ width: task.progress + '%' }"></div>
                </div>
                
                <div class="flex justify-between items-start mb-2 relative z-10">
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border" :class="task.type === 'strategy' ? 'text-blue-400 border-blue-500/30 bg-blue-900/10' : 'text-purple-400 border-purple-500/30 bg-purple-900/10'">{{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}</span>
                  <span class="text-xs font-mono text-cyan-500">{{ task.progress.toFixed(0) }}%</span>
                </div>
                <h4 class="text-sm font-bold text-white mb-2 relative z-10">{{ task.title }}</h4>
                <div class="flex justify-between items-center text-[10px] text-gray-500 font-mono relative z-10">
                  <span>{{ task.statusText }}</span>
                  <span>{{ task.timeLeft }} LEFT</span>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Column 3: Completed -->
          <div class="flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
            <div class="p-3 border-b border-[#222] flex justify-between items-center bg-[#0f0f0f]">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Completed</span>
              </div>
              <div class="flex gap-3 items-center">
                 <!-- View Toggle -->
                 <div class="flex bg-[#1a1a1a] rounded border border-[#333] p-0.5">
                   <button 
                     @click="completedViewMode = 'card'" 
                     class="p-1 rounded-[1px] transition-colors"
                     :class="completedViewMode === 'card' ? 'bg-[#333] text-white' : 'text-gray-600 hover:text-gray-400'"
                   >
                     <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                   </button>
                   <button 
                     @click="completedViewMode = 'list'" 
                     class="p-1 rounded-[1px] transition-colors"
                     :class="completedViewMode === 'list' ? 'bg-[#333] text-white' : 'text-gray-600 hover:text-gray-400'"
                   >
                     <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                   </button>
                 </div>

                 <div class="h-3 w-px bg-[#333]"></div>

                 <button @click="toggleSelectAll" class="text-[10px] font-bold uppercase transition-colors" :class="isAllSelected ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'">
                   {{ isAllSelected ? 'Deselect' : 'Select All' }}
                 </button>
                 <button 
                   @click="handleSave" 
                   :disabled="selectedCompletedTasks.length === 0"
                   class="text-[10px] font-bold uppercase transition-colors"
                   :class="selectedCompletedTasks.length > 0 ? 'text-emerald-500 hover:text-emerald-400' : 'text-gray-600 cursor-not-allowed'"
                 >
                   Save
                 </button>
                 <button 
                   @click="handleDelete" 
                   :disabled="selectedCompletedTasks.length === 0"
                   class="text-[10px] font-bold uppercase transition-colors"
                   :class="selectedCompletedTasks.length > 0 ? 'text-red-500 hover:text-red-400' : 'text-gray-600 cursor-not-allowed'"
                 >
                   Delete
                 </button>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar p-3 relative flex flex-col gap-6">
              <!-- Found Opportunities -->
              <TransitionGroup 
                :name="listTransitionName" 
                tag="div" 
                class="relative"
                :class="completedViewMode === 'card' ? 'grid grid-cols-3 gap-3 content-start' : 'space-y-3'"
              >
                <div 
                  v-for="task in completedFoundTasks" 
                  :key="task.id" 
                  @click="toggleCompletedTask(task.id)"
                  class="cursor-pointer transition-all group relative overflow-hidden flex"
                  :class="[
                    selectedCompletedTasks.includes(task.id) ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-[#333] hover:border-blue-500/50',
                    completedViewMode === 'card' ? 'bg-[#151515] rounded-xl border p-3 flex-col shadow-lg aspect-square' : 'bg-[#111] border rounded-sm p-3 flex-row items-center gap-3'
                  ]"
                >
                  <!-- Checkbox (Always visible) -->
                  <div 
                    class="w-4 h-4 border border-[#444] rounded-[2px] flex items-center justify-center transition-colors z-30 shrink-0" 
                    :class="[
                      selectedCompletedTasks.includes(task.id) ? 'bg-emerald-500 border-emerald-500' : '',
                      completedViewMode === 'card' ? 'absolute top-3 left-3' : ''
                    ]"
                  >
                     <svg v-if="selectedCompletedTasks.includes(task.id)" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                  </div>

                  <!-- Card View Content -->
                  <div v-if="completedViewMode === 'card'" class="w-full h-full relative z-10 flex flex-col justify-between">
                    <!-- Background decoration -->
                    <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full blur-xl -mr-4 -mt-4 pointer-events-none"></div>

                    <div class="flex justify-center mt-1">
                      <span class="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider border" 
                        :class="task.type === 'strategy' ? 'text-blue-400 border-blue-500/30 bg-blue-900/10' : 'text-purple-400 border-purple-500/30 bg-purple-900/10'">
                        {{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}
                      </span>
                    </div>
                    
                    <div class="text-center my-auto">
                      <h3 class="text-xl font-bold mb-0.5 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 group-hover:from-blue-400 group-hover:to-blue-200 transition-all">
                        {{ task.symbol || 'UNK' }}
                      </h3>
                      <p class="text-[9px] text-slate-400 font-mono line-clamp-1 px-2">{{ task.stockName || task.title }}</p>
                    </div>
                    
                    <!-- Mock Data Grid -->
                    <div class="grid grid-cols-2 gap-1 border-y border-[#333] py-2 mb-1">
                      <div class="text-center border-r border-[#333]">
                        <div class="text-sm font-bold text-white">A</div>
                        <div class="text-[8px] text-slate-500 uppercase tracking-wider">Rating</div>
                      </div>
                      <div class="text-center">
                        <div class="text-sm font-bold text-emerald-400">LONG</div>
                        <div class="text-[8px] text-slate-500 uppercase tracking-wider">Dir</div>
                      </div>
                    </div>

                    <div class="flex justify-between text-[8px] text-slate-500 font-mono">
                      <span>{{ task.estTime || '1-3 M' }}</span>
                      <span>{{ task.completedAt }}</span>
                    </div>
                    
                    <!-- View Button Overlay -->
                    <div class="absolute inset-0 -m-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-[1px] z-20 rounded-xl">
                      <button @click.stop="openStrategyModal(task)" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                        VIEW REPORT
                      </button>
                    </div>
                  </div>

                  <!-- List View Content -->
                  <div v-else class="flex-1 flex items-center justify-between overflow-hidden">
                     <div class="flex items-center gap-3 overflow-hidden">
                        <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0" :class="task.type === 'strategy' ? 'text-blue-400 border-blue-500/30 bg-blue-900/10' : 'text-purple-400 border-purple-500/30 bg-purple-900/10'">{{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}</span>
                        <span class="text-xs font-bold text-gray-300 truncate group-hover:text-white">{{ task.title }}</span>
                     </div>
                     <div class="flex items-center gap-3 shrink-0">
                        <span class="text-[10px] text-gray-600 font-mono">{{ task.completedAt }}</span>
                        <button @click.stop="openStrategyModal(task)" class="p-1 bg-[#222] hover:bg-[#333] text-gray-400 hover:text-white rounded-sm border border-[#333] opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </button>
                     </div>
                  </div>
                </div>
              </TransitionGroup>

              <!-- No Opportunity Found Section -->
              <div v-if="completedNotFoundTasks.length > 0" class="border-t border-[#222] pt-4">
                <div class="flex justify-between items-center mb-3 px-1">
                  <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <span class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">No Opportunity Found</span>
                    <span class="text-[10px] font-mono text-gray-700">{{ completedNotFoundTasks.length }}</span>
                  </div>
                  <button 
                    @click="clearNotFoundTasks"
                    class="text-[10px] font-bold text-gray-600 hover:text-red-400 uppercase transition-colors flex items-center gap-1"
                    title="Clear all not found"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Clear
                  </button>
                </div>

                <!-- Hint Message -->
                <div class="mb-3 px-2 py-2 bg-[#1a1a1a] border border-dashed border-gray-700 rounded text-[10px] text-gray-400 flex gap-2 items-start">
                   <svg class="w-3 h-3 text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   <p>不是每一次生成都会发现机会。如果未发现，请尝试<button @click="activeTab = 'generate'" class="text-cyan-500 hover:underline">重新配置参数</button>再次生成。</p>
                </div>
                
                <TransitionGroup 
                  :name="listTransitionName" 
                  tag="div" 
                  class="relative"
                  :class="completedViewMode === 'card' ? 'grid grid-cols-3 gap-3 content-start' : 'space-y-3'"
                >
                  <div 
                    v-for="task in completedNotFoundTasks" 
                    :key="task.id" 
                    @click="toggleCompletedTask(task.id)"
                    class="cursor-pointer transition-all group relative overflow-hidden flex opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
                    :class="[
                      selectedCompletedTasks.includes(task.id) ? 'border-gray-500/50 bg-gray-900/10' : 'border-[#222] hover:border-gray-500/50',
                      completedViewMode === 'card' ? 'bg-[#0f0f0f] rounded-xl border p-3 flex-col shadow-sm aspect-square' : 'bg-[#0f0f0f] border rounded-sm p-3 flex-row items-center gap-3'
                    ]"
                  >
                    <!-- Checkbox (Always visible) -->
                    <div 
                      class="w-4 h-4 border border-[#333] rounded-[2px] flex items-center justify-center transition-colors z-30 shrink-0" 
                      :class="[
                        selectedCompletedTasks.includes(task.id) ? 'bg-gray-500 border-gray-500' : '',
                        completedViewMode === 'card' ? 'absolute top-3 left-3' : ''
                      ]"
                    >
                       <svg v-if="selectedCompletedTasks.includes(task.id)" class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                    </div>

                    <!-- Card View Content -->
                    <div v-if="completedViewMode === 'card'" class="w-full h-full relative z-10 flex flex-col justify-between">
                      <div class="flex justify-center mt-1">
                        <span class="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider border text-gray-500 border-gray-800 bg-gray-900/30">
                          {{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}
                        </span>
                      </div>
                      
                      <div class="text-center my-auto">
                        <h3 class="text-xl font-bold mb-0.5 text-gray-400 group-hover:text-gray-200 transition-all">
                          {{ task.symbol || 'UNK' }}
                        </h3>
                        <p class="text-[9px] text-gray-600 font-mono line-clamp-1 px-2">{{ task.stockName || task.title }}</p>
                      </div>
                      
                      <div class="text-center py-2 mb-1">
                        <div class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">No Signal</div>
                      </div>

                      <div class="flex justify-between text-[8px] text-gray-700 font-mono">
                        <span>--</span>
                        <span>{{ task.completedAt }}</span>
                      </div>
                      
                      <!-- View Button Overlay -->
                      <div class="absolute inset-0 -m-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 backdrop-blur-[1px] z-20 rounded-xl">
                        <button @click.stop="openStrategyModal(task)" class="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-[10px] font-bold rounded shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                          VIEW LOG
                        </button>
                      </div>
                    </div>

                    <!-- List View Content -->
                    <div v-else class="flex-1 flex items-center justify-between overflow-hidden">
                       <div class="flex items-center gap-3 overflow-hidden">
                          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border shrink-0 text-gray-500 border-gray-800 bg-gray-900/30">{{ task.type === 'strategy' ? 'STRAT' : 'PLAN' }}</span>
                          <span class="text-xs font-bold text-gray-500 truncate group-hover:text-gray-300">{{ task.title }}</span>
                       </div>
                       <div class="flex items-center gap-3 shrink-0">
                          <span class="text-[10px] text-gray-700 font-mono">{{ task.completedAt }}</span>
                          <button @click.stop="openStrategyModal(task)" class="p-1 bg-[#1a1a1a] hover:bg-[#222] text-gray-600 hover:text-gray-400 rounded-sm border border-[#222] opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          </button>
                       </div>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Generate Plan Modal (方案B: 单页折叠式) -->
      <div v-if="showGeneratePlanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeGeneratePlanModal">
        <div class="bg-[#0a0a0a] rounded-lg border border-[#222] w-[820px] max-w-[95vw] overflow-hidden shadow-2xl shadow-black/50 flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]">
            <div class="flex items-center gap-3">
              <div class="px-2.5 py-1 rounded-sm text-xs font-semibold tracking-wide bg-cyan-500/10 text-cyan-400 uppercase">
                <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Execution Plan
              </div>
              <div class="h-4 w-px bg-[#333]"></div>
              <span class="text-xs text-gray-500 font-mono">CONFIGURE PARAMETERS</span>
            </div>
            <button 
              @click="closeGeneratePlanModal" 
              class="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-[#222] transition-colors"
            >
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Target Strategy Info Bar -->
          <div v-if="generatePlanTarget" class="px-6 py-3 bg-[#111] border-b border-[#222] flex items-center gap-4">
            <div class="flex items-center gap-3">
              <span class="font-mono font-bold text-white text-lg">{{ generatePlanTarget.symbol }}</span>
              <span class="text-sm text-gray-500">{{ generatePlanTarget.stockName }}</span>
            </div>
            <div class="flex-1"></div>
            <span 
              v-if="generatePlanTarget.direction"
              class="px-2 py-0.5 rounded-sm text-xs font-bold"
              :class="generatePlanTarget.direction === 'LONG' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'"
            >
              {{ generatePlanTarget.direction }}
            </span>
            <span 
              v-if="generatePlanTarget.grade"
              class="px-2 py-0.5 rounded-sm text-xs font-bold"
              :class="{
                'bg-emerald-900/50 text-emerald-400': generatePlanTarget.grade === 'A' || generatePlanTarget.grade === 'A+',
                'bg-cyan-900/50 text-cyan-400': generatePlanTarget.grade === 'B',
                'bg-amber-900/50 text-amber-400': generatePlanTarget.grade === 'C'
              }"
            >
              Grade {{ generatePlanTarget.grade }}
            </span>
            <span class="text-xs text-gray-500 font-mono">
              ${{ currentStockPrice.toFixed(2) }}
            </span>
          </div>

          <!-- Modal Body - Two Column Layout -->
          <div class="p-6 bg-[#0a0a0a]">
            <div class="flex gap-6">
              
              <!-- Left Column: Position Status -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-2 mb-3">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Position Status</h4>
                </div>
                
                <!-- Position Toggle -->
                <div class="grid grid-cols-2 gap-3">
                  <button 
                    @click="generatePlanSettings.hasPosition = false"
                    class="p-3 rounded-sm border transition-all text-left group"
                    :class="!generatePlanSettings.hasPosition 
                      ? 'border-cyan-500 bg-cyan-900/20 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/50' 
                      : 'border-[#222] bg-[#111] hover:border-[#444]'"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-sm flex items-center justify-center transition-colors"
                        :class="!generatePlanSettings.hasPosition ? 'bg-cyan-500/20' : 'bg-[#1a1a1a]'"
                      >
                        <svg class="w-4 h-4" :class="!generatePlanSettings.hasPosition ? 'text-cyan-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-bold text-white">No Position</div>
                        <div class="text-[10px] text-gray-500">Open new</div>
                      </div>
                    </div>
                  </button>
                  <button 
                    @click="generatePlanSettings.hasPosition = true"
                    class="p-3 rounded-sm border transition-all text-left group"
                    :class="generatePlanSettings.hasPosition 
                      ? 'border-cyan-500 bg-cyan-900/20 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/50' 
                      : 'border-[#222] bg-[#111] hover:border-[#444]'"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-sm flex items-center justify-center transition-colors"
                        :class="generatePlanSettings.hasPosition ? 'bg-cyan-500/20' : 'bg-[#1a1a1a]'"
                      >
                        <svg class="w-4 h-4" :class="generatePlanSettings.hasPosition ? 'text-cyan-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-bold text-white">Have Position</div>
                        <div class="text-[10px] text-gray-500">Existing</div>
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Position Details (Expandable) -->
                <transition name="slide-fade">
                  <div v-if="generatePlanSettings.hasPosition" class="p-4 bg-[#111] rounded-sm border border-[#222] space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-[10px] font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Avg Cost</label>
                        <div class="relative">
                          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">$</span>
                          <input 
                            type="number" 
                            v-model.number="generatePlanSettings.averageCost"
                            class="w-full bg-[#0a0a0a] border border-[#333] rounded-sm pl-6 pr-3 py-2 text-white text-sm font-mono focus:border-cyan-500/50 focus:outline-none transition-colors"
                            placeholder="178.50"
                            step="0.01"
                          >
                        </div>
                      </div>
                      <div>
                        <label class="block text-[10px] font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Size</label>
                        <div class="relative">
                          <input 
                            type="number" 
                            v-model.number="generatePlanSettings.positionSize"
                            class="w-full bg-[#0a0a0a] border border-[#333] rounded-sm px-3 pr-7 py-2 text-white text-sm font-mono focus:border-cyan-500/50 focus:outline-none transition-colors"
                            placeholder="15"
                            min="1"
                            max="100"
                          >
                          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">%</span>
                        </div>
                      </div>
                    </div>
                    <!-- P&L Display -->
                    <div v-if="generatePlanSettings.averageCost && generatePlanSettings.averageCost > 0" 
                      class="flex items-center justify-between p-2.5 rounded-sm"
                      :class="positionPnL.isProfit ? 'bg-emerald-900/20 border border-emerald-500/30' : 'bg-red-900/20 border border-red-500/30'"
                    >
                      <span class="text-[10px] text-gray-400 uppercase">P&L</span>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold font-mono" :class="positionPnL.isProfit ? 'text-emerald-400' : 'text-red-400'">
                          {{ positionPnL.isProfit ? '+' : '' }}${{ positionPnL.value }}
                        </span>
                        <span class="text-[10px] px-1.5 py-0.5 rounded-sm" :class="positionPnL.isProfit ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'">
                          {{ positionPnL.isProfit ? '+' : '' }}{{ positionPnL.percent }}%
                        </span>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Right Column: Investment Preferences -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-2 mb-3">
                  <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Preferences</h4>
                </div>

                <!-- Investment Horizon -->
                <div>
                  <label class="block text-[10px] font-medium text-gray-500 mb-2 uppercase tracking-wider">Horizon</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'short'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :class="generatePlanSettings.investmentHorizon === 'short' 
                        ? 'border-amber-500 bg-amber-900/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                        : 'border-[#222] bg-[#111] hover:border-[#444]'"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :class="generatePlanSettings.investmentHorizon === 'short' ? 'text-amber-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <div class="text-[10px] font-bold text-white">Short</div>
                      <div class="text-[9px] text-gray-500">1-4 wks</div>
                    </button>
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'medium'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :class="generatePlanSettings.investmentHorizon === 'medium' 
                        ? 'border-blue-500 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                        : 'border-[#222] bg-[#111] hover:border-[#444]'"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :class="generatePlanSettings.investmentHorizon === 'medium' ? 'text-blue-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <div class="text-[10px] font-bold text-white">Medium</div>
                      <div class="text-[9px] text-gray-500">1-3 mos</div>
                    </button>
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'long'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :class="generatePlanSettings.investmentHorizon === 'long' 
                        ? 'border-emerald-500 bg-emerald-900/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'border-[#222] bg-[#111] hover:border-[#444]'"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :class="generatePlanSettings.investmentHorizon === 'long' ? 'text-emerald-400' : 'text-gray-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <div class="text-[10px] font-bold text-white">Long</div>
                      <div class="text-[9px] text-gray-500">3+ mos</div>
                    </button>
                  </div>
                </div>

                <!-- Risk Preference Slider -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-[10px] font-medium text-gray-500 uppercase tracking-wider">Risk Level</label>
                    <span 
                      class="text-[10px] font-bold px-1.5 py-0.5 rounded-sm"
                      :class="{
                        'bg-emerald-900/50 text-emerald-400': generatePlanSettings.riskPreference <= 25,
                        'bg-blue-900/50 text-blue-400': generatePlanSettings.riskPreference > 25 && generatePlanSettings.riskPreference <= 50,
                        'bg-amber-900/50 text-amber-400': generatePlanSettings.riskPreference > 50 && generatePlanSettings.riskPreference <= 75,
                        'bg-red-900/50 text-red-400': generatePlanSettings.riskPreference > 75
                      }"
                    >
                      {{ riskPreferenceLabel }}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    v-model.number="generatePlanSettings.riskPreference"
                    min="0" 
                    max="100" 
                    step="1"
                    class="w-full h-1.5 bg-[#222] rounded-sm appearance-none cursor-pointer slider-thumb"
                  >
                  <div class="flex justify-between mt-1.5 text-[9px] text-gray-600">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Growth</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <!-- Save as Default -->
                <label class="flex items-center gap-2 cursor-pointer group mt-2">
                  <input 
                    type="checkbox" 
                    v-model="generatePlanSettings.saveAsDefault"
                    class="w-3.5 h-3.5 rounded-sm border-[#444] bg-[#111] text-cyan-500 focus:ring-cyan-500/50 focus:ring-offset-0"
                  >
                  <span class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Save as default</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t border-[#222] flex justify-between items-center bg-[#0a0a0a]">
            <div class="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
              <span class="px-1.5 py-0.5 bg-[#111] border border-[#222] rounded-sm">{{ generatePlanSettings.hasPosition ? 'EXISTING' : 'NEW' }}</span>
              <span class="px-1.5 py-0.5 bg-[#111] border border-[#222] rounded-sm uppercase">{{ generatePlanSettings.investmentHorizon }}</span>
              <span class="px-1.5 py-0.5 bg-[#111] border border-[#222] rounded-sm">{{ riskPreferenceLabel.toUpperCase() }}</span>
            </div>
            <div class="flex gap-3">
              <button 
                @click="closeGeneratePlanModal"
                class="px-4 py-2 bg-[#111] hover:bg-[#222] text-gray-400 rounded-sm text-xs font-medium transition-colors border border-[#333]"
              >
                Cancel
              </button>
              <button 
                @click="confirmGeneratePlan"
                class="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-900/30"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Confirm Modal -->
      <div v-if="showSaveConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="showSaveConfirmModal = false">
        <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-[400px] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
          <div class="p-6 text-center">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Saved Successfully</h3>
            <p class="text-gray-400 text-sm mb-6">
              {{ savedCount }} strategies have been transferred to your collection.
            </p>
            <div class="flex gap-3">
              <button 
                @click="showSaveConfirmModal = false"
                class="flex-1 py-2.5 bg-[#222] hover:bg-[#333] text-gray-300 rounded-lg font-medium transition-colors"
              >
                Stay Here
              </button>
              <button 
                @click="switchTab('mystrategy'); showSaveConfirmModal = false"
                class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors"
              >
                View My Strategies
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Group Modal -->
      <div v-if="showDeleteGroupModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="showDeleteGroupModal = false">
        <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-[350px] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
          <div class="p-6 text-center">
            <div class="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Delete Group?</h3>
            <p class="text-gray-400 text-xs mb-6">
              Are you sure you want to delete "{{ groupToDelete?.label }}"? <br>
              Strategies in this group will not be deleted.
            </p>
            <div class="flex gap-3">
              <button 
                @click="showDeleteGroupModal = false"
                class="flex-1 py-2 bg-[#222] hover:bg-[#333] text-gray-300 rounded text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                @click="executeDeleteGroup"
                class="flex-1 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-400 border border-red-900 rounded text-xs font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
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
            <div class="w-[320px] flex flex-col border-r border-[#2a2a2a] bg-[#111] shrink-0 hidden lg:flex">
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
              
              <!-- New Top Bar -->
              <div class="px-6 py-4 border-b border-[#2a2a2a] bg-[#151515] flex justify-between items-center shrink-0">
                <!-- Left: Title & Meta -->
                <div class="flex items-center gap-4 overflow-hidden">
                  <h2 class="text-lg font-bold text-white truncate max-w-[300px]" :title="selectedStrategy.title">{{ selectedStrategy.title }}</h2>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide" 
                      :class="{
                        'bg-green-500/20 text-green-400 border border-green-500/30': selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+',
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30': selectedStrategy.grade === 'B',
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30': selectedStrategy.grade === 'C'
                      }">
                      GRADE {{ selectedStrategy.grade }}
                    </span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#333] text-gray-300 border border-[#444]">
                      {{ selectedStrategy.term }}
                    </span>
                    <span class="text-xs text-gray-500">{{ selectedStrategy.time }}</span>
                  </div>
                </div>
                
                <!-- Right: Actions -->
                <div class="flex items-center gap-3 shrink-0">
                  <button 
                    @click="copyShareLink"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg hover:scale-105 border"
                    :class="isCopied ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-[#333] hover:bg-[#444] text-gray-300 hover:text-white border-[#444]'"
                    :title="isCopied ? '已复制' : '复制分享链接'"
                  >
                    <svg v-if="!isCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ isCopied ? '已复制' : '分享' }}
                  </button>
                  <button 
                    @click="toggleStrategyWatchlist"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg hover:scale-105 border"
                    :class="isStrategyWatchlisted ? 'bg-blue-600 text-white border-blue-500 shadow-blue-900/30' : 'bg-[#333] hover:bg-[#444] text-gray-300 hover:text-white border-[#444]'"
                  >
                    <svg v-if="!isStrategyWatchlisted" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                    {{ isStrategyWatchlisted ? '已关注' : `关注 ${selectedStrategy.symbol || 'MSFT'}` }}
                  </button>
                  <button 
                    @click="goToStockDetail(selectedStrategy.symbol || 'MSFT')"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all shadow-lg hover:scale-105 border border-slate-600"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    {{ selectedStrategy.symbol || 'MSFT' }} 详情
                  </button>
                  <button 
                    @click="toggleStrategyReport"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-lg hover:scale-105 border"
                    :class="isStrategyReportSaved ? 'bg-green-600/20 text-green-400 border-green-600/30' : 'bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white border-[#444]'"
                  >
                    <svg v-if="!isStrategyReportSaved" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ isStrategyReportSaved ? '已保存' : '保存报告' }}
                  </button>
                </div>
              </div>

              <!-- Scrollable Content Area -->
              <div class="flex-1 overflow-y-auto p-6 scrollbar-thin">
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
            <div class="w-[350px] border-l border-[#2a2a2a] bg-[#0f0f0f] overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent shrink-0 hidden xl:block">
              
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
                    
                    <!-- Expand Icon -->
                    <div class="ml-2 text-gray-600">
                      <!-- <i class="fas fa-chevron-down transition-transform duration-300" :class="{ 'rotate-180': plan.isExpanded }"></i> -->
                    </div>
                  </button>

                  <!-- Plan Details (Expanded) -->
                  <div 
                    v-if="plan.isExpanded" 
                    class="px-4 pb-4 pt-0 border-t border-[#2a2a2a] mt-2 animate-fade-in"
                  >
                    <div class="grid grid-cols-2 gap-2 mt-3 mb-3">
                      <div class="bg-[#222] p-2 rounded border border-[#333]">
                        <div class="text-[10px] text-gray-500 uppercase">Entry</div>
                        <div class="text-sm font-mono text-white">${{ plan.entry }}</div>
                      </div>
                      <div class="bg-[#222] p-2 rounded border border-[#333]">
                        <div class="text-[10px] text-gray-500 uppercase">Target</div>
                        <div class="text-sm font-mono text-green-400">${{ plan.target }}</div>
                      </div>
                    </div>
                    <button class="w-full py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded text-xs font-bold transition-colors">
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-12 text-gray-600">
                <div class="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-3 border border-[#2a2a2a]">
                  <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p class="text-xs">暂无相关计划</p>
                <button 
                  @click="generatePlanForStrategy(selectedStrategy)"
                  class="mt-3 text-xs text-blue-500 hover:text-blue-400 font-medium"
                >
                  立即生成
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Tabs (Bottom Center) -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="bg-[#111]/90 backdrop-blur-xl border border-[#333] rounded-full p-1.5 shadow-2xl flex items-center gap-1">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
          :class="activeTab === tab.id ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-[#333]'"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Floating MiniMap - Draggable Dot (收起状态) -->
    <div 
      v-if="!isMiniMapExpanded"
      ref="miniMapDot"
      class="fixed z-50 cursor-grab active:cursor-grabbing select-none"
      :style="{ left: miniMapPosition.x + 'px', top: miniMapPosition.y + 'px' }"
      @mousedown="startDragMiniMap"
      @touchstart="startDragMiniMap"
    >
      <div 
        class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] group"
        @click="handleMiniMapDotClick"
      >
        <!-- 进度环 -->
        <svg class="w-10 h-10 absolute" viewBox="0 0 36 36">
          <circle 
            cx="18" cy="18" r="15.5" 
            fill="none" 
            stroke="#333" 
            stroke-width="2"
          />
          <circle 
            cx="18" cy="18" r="15.5" 
            fill="none" 
            stroke="url(#miniMapGradient)" 
            stroke-width="2"
            stroke-linecap="round"
            :stroke-dasharray="`${miniMapProgress} 100`"
            transform="rotate(-90 18 18)"
            class="transition-all duration-300"
          />
          <defs>
            <linearGradient id="miniMapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#06b6d4" />
              <stop offset="100%" stop-color="#10b981" />
            </linearGradient>
          </defs>
        </svg>
        <!-- 中心图标 -->
        <div class="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <!-- 当前步骤指示 -->
        <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0a] border border-cyan-500/50 flex items-center justify-center">
          <span class="text-[10px] font-bold text-cyan-400">{{ currentActiveStepNumber }}</span>
        </div>
        <!-- 脉冲动画 (有活动任务时) -->
        <div v-if="hasActiveTask" class="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-30"></div>
      </div>
    </div>

    <!-- Floating MiniMap Panel (展开状态) -->
    <div 
      v-if="isMiniMapExpanded"
      class="fixed z-50 flex items-center"
      :style="miniMapPanelStyle"
    >
      <!-- Expanded Panel -->
      <div class="bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#333] rounded-xl shadow-2xl overflow-hidden transition-all duration-300 w-44">
        <div class="p-3">
          <!-- Header -->
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-[#222]">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">流程导航</span>
            <button 
              @click="isMiniMapExpanded = false"
              class="w-5 h-5 rounded-full bg-[#222] hover:bg-[#333] flex items-center justify-center text-gray-500 hover:text-white transition-colors"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Steps -->
          <div class="space-y-2">
            <div 
              v-for="(step, index) in miniMapSteps" 
              :key="step.key"
              class="flex items-start gap-2 group cursor-pointer"
              @click="handleMiniMapStepClick(step)"
            >
              <!-- Node & Connector -->
              <div class="flex flex-col items-center">
                <!-- Connector Line (Top) -->
                <div 
                  v-if="index > 0" 
                  class="w-0.5 h-1.5 -mt-2 mb-0.5 transition-colors"
                  :class="step.status === 'done' || step.status === 'active' ? 'bg-cyan-500' : 'bg-[#333]'"
                ></div>
                
                <!-- Node Circle -->
                <div 
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all text-[9px] font-bold relative"
                  :class="[
                    step.status === 'active' && !step.blocked ? 'border-cyan-500 bg-cyan-900/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-110' : 
                    step.status === 'active' && step.blocked ? 'border-amber-500 bg-amber-900/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-110' :
                    step.status === 'done' ? 'border-cyan-700 bg-cyan-900/20 text-cyan-500' : 
                    step.status === 'blocked' ? 'border-amber-500/50 bg-amber-900/20 text-amber-500' :
                    step.status === 'skipped' ? 'border-[#444] bg-[#1a1a1a] text-gray-500' :
                    'border-[#333] bg-[#111] text-gray-600'
                  ]"
                >
                  <svg v-if="step.status === 'done'" class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                  <svg v-else-if="step.status === 'skipped'" class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                  <svg v-else-if="step.status === 'blocked'" class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                  <svg v-else-if="step.blocked" class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  <span v-else>{{ index + 1 }}</span>
                  
                  <!-- Active Pulse -->
                  <div v-if="step.status === 'active' && !step.blocked" class="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-30"></div>
                  <div v-if="step.status === 'active' && step.blocked" class="absolute inset-0 rounded-full border border-amber-500 animate-ping opacity-30"></div>
                </div>

                <!-- Connector Line (Bottom) -->
                <div 
                  v-if="index < miniMapSteps.length - 1" 
                  class="w-0.5 h-1.5 mt-0.5 transition-colors"
                  :class="miniMapSteps[index + 1].status === 'done' || miniMapSteps[index + 1].status === 'active' ? 'bg-cyan-500' : 'bg-[#333]'"
                ></div>
              </div>

              <!-- Labels -->
              <div class="flex-1 pt-0">
                <div 
                  class="text-[11px] font-medium transition-colors leading-tight"
                  :class="[
                    step.status === 'active' && !step.blocked ? 'text-white' : 
                    step.status === 'active' && step.blocked ? 'text-amber-300' :
                    step.status === 'blocked' ? 'text-amber-500/70' :
                    step.status === 'done' ? 'text-gray-400' : 
                    step.status === 'skipped' ? 'text-gray-500 line-through' : 'text-gray-600'
                  ]"
                >
                  {{ step.title }}
                </div>
                <div 
                  v-if="step.hint" 
                  class="text-[9px] mt-0.5 transition-colors leading-tight"
                  :class="[
                    step.status === 'active' && !step.blocked ? 'text-cyan-400' : 
                    step.status === 'active' && step.blocked ? 'text-amber-400' :
                    step.status === 'blocked' ? 'text-amber-500/50' :
                    step.status === 'skipped' ? 'text-gray-500 italic' :
                    'text-gray-600'
                  ]"
                >
                  {{ step.hint }}
                </div>
              </div>

            </div>
          </div>

          <!-- Legend -->
          <div class="mt-4 pt-3 border-t border-[#222] flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-gray-600">
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-cyan-500"></div>
              <span>进行中</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-[#444]"></div>
              <span>已跳过</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-cyan-900"></div>
              <span>已完成</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-amber-500"></div>
              <span>阻塞</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-[#333]"></div>
              <span>待进行</span>
            </div>
          </div>

          <!-- Selected Strategy Info -->
          <div v-if="selectedStrategy && selectedStrategy.id" class="mt-3 pt-3 border-t border-[#222]">
            <div class="text-[10px] text-gray-500 mb-1">当前策略</div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-white">{{ selectedStrategy.symbol }}</span>
              <span 
                class="text-[10px] px-1.5 py-0.5 rounded font-bold"
                :class="[
                  selectedStrategy.grade === 'A+' || selectedStrategy.grade === 'A' ? 'bg-emerald-900/50 text-emerald-400' :
                  selectedStrategy.grade === 'B' ? 'bg-cyan-900/50 text-cyan-400' :
                  selectedStrategy.grade === 'C' ? 'bg-amber-900/50 text-amber-400' :
                  'bg-gray-800 text-gray-500'
                ]"
              >{{ selectedStrategy.grade }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, h, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Navbar from '../components/Navbar.vue'


// Icons components (Simple SVG wrappers)
const IconTarget = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z' }), h('path', { d: 'M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z' })])
const IconChart = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M3 3v18h18' }), h('path', { d: 'M18 9l-5 5-4-4-3 3' })])
const IconDocument = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('path', { d: 'M14 2v6h6' }), h('path', { d: 'M16 13H8' }), h('path', { d: 'M16 17H8' }), h('path', { d: 'M10 9H8' })])
// 量化分析图标 - 使用函数曲线/sigma符号风格
const IconMath = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M4 4h6l-6 8 6 8H4' }), h('path', { d: 'M14 12h7' }), h('path', { d: 'M14 7h7' }), h('circle', { cx: '17.5', cy: '17.5', r: '2.5' })])
const IconLightning = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })])
const IconBriefcase = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }), h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })])
const IconTrending = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M23 6l-9.5 9.5-5-5L1 18' }), h('path', { d: 'M17 6h6v6' })])
const IconDatabase = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }), h('path', { d: 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' }), h('path', { d: 'M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' })])
const IconClock = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 6v6l4 2' })])
const IconCalendar = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }), h('path', { d: 'M16 2v4' }), h('path', { d: 'M8 2v4' }), h('path', { d: 'M3 10h18' })])
const IconBan = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M4.93 4.93l14.14 14.14' })])
const IconShield = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })])
const IconScale = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 3v19' }), h('path', { d: 'M5 8h14' }), h('path', { d: 'M2 14h6' }), h('path', { d: 'M16 14h6' })])
const IconFire = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a7 7 0 0 0 3 3.8z' })])
const IconSkull = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2c-4.4 0-8 3.6-8 8 0 2.8 1.5 5.3 3.8 6.7l.2 3.3h8l.2-3.3c2.3-1.4 3.8-3.9 3.8-6.7 0-4.4-3.6-8-8-8z' }), h('path', { d: 'M9 10h.01' }), h('path', { d: 'M15 10h.01' }), h('path', { d: 'M10 14h4' })])
const IconAuto = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })])
const IconAutoFilled = h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })])


const router = useRouter()
const route = useRoute()

const activeTab = ref('generate')
const tabs = [
  { id: 'generate', label: '生成策略' },
  { id: 'mystrategy', label: '策略库' }
]

const switchTab = (tabId) => {
  activeTab.value = tabId
  router.push({ query: { ...route.query, tab: tabId } })
}

// --- Asset Selection Logic ---
const currentAssetTab = ref('watchlist')
const assetTabs = [
  { id: 'watchlist', label: '我的关注' },
  { id: 'search', label: '搜索' }
]

const searchQuery = ref('')
const selectedStocks = ref([])

// Mock Data
const watchlist = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '189.45', change: 1.2, market: 'US' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '875.20', change: 3.5, market: 'US' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: '175.30', change: -0.8, market: 'US' },
  { symbol: 'MSFT', name: 'Microsoft', price: '415.10', change: 0.5, market: 'US' },
  { symbol: 'AMD', name: 'Adv. Micro Devices', price: '180.20', change: 2.1, market: 'US' },
  { symbol: 'COIN', name: 'Coinbase Global', price: '245.50', change: 5.4, market: 'US' },
  { symbol: 'PLTR', name: 'Palantir Tech', price: '24.30', change: -1.2, market: 'US' },
]

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '189.45', change: 1.2, market: 'US' },
  { symbol: 'MSFT', name: 'Microsoft', price: '415.10', change: 0.5, market: 'US' },
]

const currentStockList = computed(() => {
  if (currentAssetTab.value === 'watchlist') return watchlist
  if (currentAssetTab.value === 'search') {
    if (!searchQuery.value) return []
    // Simple mock search filter
    return [...watchlist, ...holdings].filter(s => 
      s.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return []
})

const toggleStock = (stock) => {
  const index = selectedStocks.value.indexOf(stock.symbol)
  if (index === -1) {
    // Single selection mode: clear others and select this one
    selectedStocks.value = [stock.symbol]
  } else {
    // Deselect if already selected
    selectedStocks.value = []
  }
}

const removeStock = (symbol) => {
  const index = selectedStocks.value.indexOf(symbol)
  if (index !== -1) {
    selectedStocks.value.splice(index, 1)
  }
}

// --- Strategy Configuration Logic ---
const selectedFrameworks = ref(['auto'])
const selectedPeriod = ref('auto')
const selectedRisk = ref('auto')

const frameworks = [
  { id: 'auto', title: '智能推荐', desc: 'AI根据市场环境自动选择最佳分析框架', icon: IconAuto },
  { id: 'tech', title: '技术分析', desc: '基于图表、趋势和技术指标进行分析', icon: IconChart },
  { id: 'fundamental', title: '基本面分析', desc: '分析公司财务报表、盈利能力和估值', icon: IconDocument },
  { id: 'quant', title: '量化分析', desc: '使用数学模型和统计方法评估机会', icon: IconMath },
  { id: 'event', title: '事件驱动', desc: '基于公司事件、新闻和催化剂分析', icon: IconLightning },
  { id: 'business', title: '商业分析', desc: '分析商业模式、竞争优势和市场趋势', icon: IconBriefcase },
  { id: 'trend', title: '趋势分析', desc: '捕捉市场动量和价格趋势机会', icon: IconTrending },
  { id: 'alt', title: '另类数据', desc: '利用非传统数据源进行深度分析', icon: IconDatabase },
]

const periods = [
  { id: 'auto', title: '智能推荐', desc: 'AI自动匹配最佳周期', icon: IconAuto },
  { id: 'short', title: '短期', desc: '1-5天', icon: IconClock },
  { id: 'short-mid', title: '短中期', desc: '1天-1个月', icon: IconCalendar },
  { id: 'mid', title: '中长期', desc: '1-6个月', icon: IconCalendar },
  { id: 'long', title: '长期', desc: '6个月以上', icon: IconCalendar },
]

const risks = [
  { id: 'auto', title: '智能推荐', desc: 'AI自动调整风险偏好', icon: IconAuto, intensity: 50 },
  { id: 'low', title: '低风险', desc: '稳健保守，重视资本保护', icon: IconShield, intensity: 25 },
  { id: 'medium', title: '中等风险', desc: '平衡收益与风险', icon: IconScale, intensity: 50 },
  { id: 'high', title: '高风险', desc: '追求高收益，接受较高波动', icon: IconFire, intensity: 75 },
  { id: 'extreme', title: '极高风险', desc: '激进策略，追求最大收益', icon: IconSkull, intensity: 100 },
]

const toggleFramework = (id) => {
  if (id === 'auto') {
    selectedFrameworks.value = ['auto']
    return
  }
  
  const index = selectedFrameworks.value.indexOf(id)
  if (index === -1) {
    // If selecting specific, remove 'auto'
    const autoIndex = selectedFrameworks.value.indexOf('auto')
    if (autoIndex !== -1) selectedFrameworks.value.splice(autoIndex, 1)
    selectedFrameworks.value.push(id)
  } else {
    selectedFrameworks.value.splice(index, 1)
    // If empty, default back to auto
    if (selectedFrameworks.value.length === 0) selectedFrameworks.value = ['auto']
  }
}

const isGenerationDisabled = computed(() => selectedStocks.value.length === 0)

const handleInitializeGeneration = () => {
  if (isGenerationDisabled.value) return

  // Create tasks for each selected stock
  const newTasks = []
  selectedStocks.value.forEach(symbol => {
    // Find stock name if possible, otherwise use symbol
    // We need to search in both watchlist and holdings as currentStockList might be filtered
    const stockInWatchlist = watchlist.find(s => s.symbol === symbol)
    const stockInHoldings = holdings.find(s => s.symbol === symbol)
    const stockName = stockInWatchlist?.name || stockInHoldings?.name || symbol

    const newTask = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      type: 'strategy',
      title: `${symbol} Strategy - Advanced`,
      symbol: symbol,
      stockName: stockName,
      status: 'pending',
      estTime: '5m',
      progress: 0,
      timeLeft: '5m',
      statusText: 'Queued',
      isNew: true
    }
    tasks.value.push(newTask)
    newTasks.push(newTask)
  })

  // Switch to mystrategy tab
  switchTab('mystrategy')

  // 自动选中第一个生成的任务，MiniMap 状态跟随更新
  if (newTasks.length > 0) {
    const firstTask = newTasks[0]
    selectedStrategyId.value = `temp-${firstTask.id}`
    selectedStrategy.value = {
      id: `temp-${firstTask.id}`,
      symbol: firstTask.symbol,
      stockName: firstTask.stockName,
      title: firstTask.title,
      grade: 'N/A',
      status: firstTask.status,
      isGenerating: false,
      isPending: true,
      generatedAt: null
    }
    
    // 显示选中提示
    if (newTasks.length === 1) {
      addToast(`已选择 ${firstTask.symbol}，策略等待生成...`, 'info')
    } else {
      addToast(`已选择 ${firstTask.symbol}，共 ${newTasks.length} 个策略等待生成...`, 'info')
    }
  }

  // Clear highlight after 3 seconds
  setTimeout(() => {
    newTasks.forEach(t => {
      t.isNew = false
    })
  }, 3000)
}

// Tour functions for reusability
const startGenerateTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        element: '#asset-selection-panel', 
        popover: { 
          title: '1. 选择分析对象', 
          description: '从您的自选股 (Watchlist) 中选择，或通过搜索添加您感兴趣的股票/加密货币。',
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#analysis-frameworks', 
        popover: { 
          title: '2. 定制分析视角', 
          description: '想看基本面还是技术面？选择 AI 分析的侧重点。如果不确定，保持"智能推荐"即可。',
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#investment-period', 
        popover: { 
          title: '3. 设定周期', 
          description: '告诉 AI 您的持仓周期预期，生成的策略将为您量身定制。',
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#risk-appetite', 
        popover: { 
          title: '4. 风险偏好', 
          description: '设置您的风险承受能力，从低风险到极高风险。',
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#generate-btn', 
        popover: { 
          title: '5. 一键生成', 
          description: '准备好后，点击这里。AI 将在后台为您运行复杂的分析模型。',
          side: "top", 
          align: 'center' 
        } 
      }
    ]
  });
  driverObj.drive();
}

const startStrategyTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        element: '#active-generation-panel', 
        popover: { 
          title: '实时任务监控', 
          description: '这里显示正在生成或排队中的策略任务。您可以实时查看生成进度和预计剩余时间。',
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#strategy-list-container', 
        popover: { 
          title: '您的策略知识库', 
          description: '所有保存的策略都在这里。您可以查看 AI 给出的评级 (Grade)、方向 (Long/Short) 和所用模型。',
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#strategy-toolbar', 
        popover: { 
          title: '搜索与筛选', 
          description: '使用搜索框快速查找策略，或通过筛选器按方向、来源等条件过滤显示的策略。',
          side: "bottom", 
          align: 'center' 
        } 
      },
      { 
        element: '#strategy-sidebar', 
        popover: { 
          title: '分类与归档', 
          description: '创建文件夹来整理您的思路，或使用智能过滤器快速查找高分策略。',
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#first-strategy-row', 
        popover: { 
          title: '打开策略详情', 
          description: '点击任意策略行，即可打开详细的策略报告。在报告中您可以查看完整的投资逻辑、历史表现，还可以与 AI 对话来进一步提问。',
          side: "bottom", 
          align: 'center' 
        } 
      }
    ]
  });
  driverObj.drive();
}

// Initialize from URL query
onMounted(() => {
  if (route.query.tab && tabs.some(t => t.id === route.query.tab)) {
    activeTab.value = route.query.tab
  }

  // Start Tour if on Generate Tab (only first time)
  if (activeTab.value === 'generate') {
    if (!localStorage.getItem('hasSeenGenerateTour')) {
      setTimeout(() => {
        startGenerateTour();
        localStorage.setItem('hasSeenGenerateTour', 'true');
      }, 1000);
    }
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab && tabs.some(t => t.id === newTab)) {
    activeTab.value = newTab
  }
})

watch(activeTab, (newTab) => {
  if (newTab === 'mystrategy') {
    // 每次切换到 mystrategy tab 时初始化示例数据
    initDemoTasks()
    
    // Wait for DOM update, then show tour only for first time
    if (!localStorage.getItem('hasSeenStrategyTour')) {
      setTimeout(() => {
        startStrategyTour();
        localStorage.setItem('hasSeenStrategyTour', 'true');
      }, 800);
    }
  }
})

// --- Queue Logic ---
const currentQueueFilter = ref('all')
const queueFilters = [
  { id: 'all', label: '全部' },
  { id: 'strategy', label: '策略' },
  { id: 'plan', label: '计划' }
]

const tasks = ref([
  { id: 101, type: 'strategy', title: 'Tech Momentum Alpha', symbol: 'QQQ', stockName: 'Invesco QQQ', status: 'pending', estTime: '2m' },
  { id: 102, type: 'plan', title: 'Q3 Rebalancing', symbol: 'SPY', stockName: 'SPDR S&P 500', status: 'pending', estTime: '5m' },
  { id: 103, type: 'strategy', title: 'Crypto Volatility', symbol: 'COIN', stockName: 'Coinbase', status: 'processing', progress: 45, timeLeft: '30s', statusText: 'Backtesting...' },
  { id: 104, type: 'plan', title: 'Retirement Safe Haven', symbol: 'TLT', stockName: 'iShares 20+ Year Treasury Bond', status: 'completed', completedAt: '10:23 AM', foundOpportunity: true },
  { id: 105, type: 'strategy', title: 'High Yield Divs', symbol: 'VYM', stockName: 'Vanguard High Dividend Yield', status: 'completed', completedAt: '09:15 AM', foundOpportunity: true },
  { id: 106, type: 'strategy', title: 'Penny Stock Scanner', symbol: 'IWM', stockName: 'iShares Russell 2000', status: 'completed', completedAt: 'Yesterday', foundOpportunity: false },
])

const selectedCompletedTasks = ref([])
const completedViewMode = ref('card') // 'card' | 'list'

const filteredTasks = computed(() => {
  if (currentQueueFilter.value === 'all') return tasks.value
  return tasks.value.filter(t => t.type === currentQueueFilter.value)
})

const pendingTasks = computed(() => filteredTasks.value.filter(t => t.status === 'pending'))
const processingTasks = computed(() => filteredTasks.value.filter(t => t.status === 'processing'))
const completedTasks = computed(() => filteredTasks.value.filter(t => t.status === 'completed'))
const completedFoundTasks = computed(() => completedTasks.value.filter(t => t.foundOpportunity !== false))
const completedNotFoundTasks = computed(() => completedTasks.value.filter(t => t.foundOpportunity === false))
const totalTasks = computed(() => filteredTasks.value.length)

// Active Generation 展开/折叠状态
const isActiveGenExpanded = ref(false)
const maxVisibleTasks = 7 // 折叠时最多显示的任务数（固定值）

// 折叠时可见的 Processing 任务
const visibleProcessingTasks = computed(() => {
  return processingTasks.value.slice(0, maxVisibleTasks)
})

// 折叠时可见的 Pending 任务（扣除已显示的 Processing 任务数量）
const visiblePendingTasks = computed(() => {
  const remainingSlots = maxVisibleTasks - visibleProcessingTasks.value.length
  return remainingSlots > 0 ? pendingTasks.value.slice(0, remainingSlots) : []
})

// 隐藏的任务数量
const hiddenTasksCount = computed(() => {
  const totalVisible = visibleProcessingTasks.value.length + visiblePendingTasks.value.length
  const totalActive = processingTasks.value.length + pendingTasks.value.length
  return Math.max(0, totalActive - totalVisible)
})

// 初始化 Active Generation 示例数据
const initDemoTasks = () => {
  // Reset/Add more tasks to demonstrate the +N more feature
  const demoTasks = [
    { id: 901, type: 'strategy', title: 'AI Momentum Scan', symbol: 'NVDA', stockName: 'NVIDIA', status: 'processing', progress: 15, timeLeft: '45s', statusText: 'Analyzing patterns...', estTime: '1m' },
    { id: 902, type: 'strategy', title: 'Deep Learning Signal', symbol: 'AMD', stockName: 'AMD Inc.', status: 'processing', progress: 62, timeLeft: '20s', statusText: 'Running backtest...', estTime: '1m' },
    { id: 903, type: 'plan', title: 'Portfolio Rebalance', symbol: 'SPY', stockName: 'SPDR S&P 500', status: 'pending', estTime: '2m', isNew: true },
    { id: 904, type: 'strategy', title: 'Crypto Volatility', symbol: 'BTC', stockName: 'Bitcoin', status: 'pending', estTime: '3m' },
    { id: 905, type: 'strategy', title: 'Tech Growth Alpha', symbol: 'AAPL', stockName: 'Apple Inc.', status: 'pending', estTime: '2m' },
    { id: 906, type: 'plan', title: 'Dividend Hunter', symbol: 'JNJ', stockName: 'Johnson & Johnson', status: 'pending', estTime: '4m' },
    { id: 907, type: 'strategy', title: 'EV Sector Play', symbol: 'TSLA', stockName: 'Tesla Inc.', status: 'pending', estTime: '3m' },
    { id: 908, type: 'plan', title: 'Safe Haven Rotation', symbol: 'GLD', stockName: 'SPDR Gold Shares', status: 'pending', estTime: '2m' },
    { id: 909, type: 'strategy', title: 'Biotech Breakout', symbol: 'XBI', stockName: 'SPDR Biotech ETF', status: 'pending', estTime: '3m' },
    { id: 910, type: 'plan', title: 'Income Generator', symbol: 'SCHD', stockName: 'Schwab US Dividend', status: 'pending', estTime: '2m' },
    { id: 911, type: 'strategy', title: 'Semiconductor Cycle', symbol: 'SMH', stockName: 'VanEck Semiconductor', status: 'pending', estTime: '4m' },
    { id: 912, type: 'plan', title: 'Risk Parity Model', symbol: 'VTI', stockName: 'Vanguard Total Stock', status: 'pending', estTime: '3m' },
  ]
  tasks.value = demoTasks
  
  // 重置展开状态
  isActiveGenExpanded.value = false
  
  // 重置 Smart Filter lastCounts 为 0，让所有分类都显示新数据圆点
  smartFilterLastCounts.value = {
    'high-grade': 0,
    'recommend-update': 0,
    'no-signal': 0,
    'no-opportunity': 0
  }
  
  // Clear highlight for demo tasks after a delay
  setTimeout(() => {
    tasks.value.forEach(t => { if(t.id === 903) t.isNew = false })
  }, 3000)
}

const isAllSelected = computed(() => {
  return completedTasks.value.length > 0 && selectedCompletedTasks.value.length === completedTasks.value.length
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedCompletedTasks.value = []
  } else {
    selectedCompletedTasks.value = completedTasks.value.map(t => t.id)
  }
}

const toggleCompletedTask = (id) => {
  const index = selectedCompletedTasks.value.indexOf(id)
  if (index === -1) {
    selectedCompletedTasks.value.push(id)
  } else {
    selectedCompletedTasks.value.splice(index, 1)
  }
}

// --- Strategy Modal Logic ---
const showStrategyModal = ref(false)
const selectedStrategy = ref({})
const isStrategyWatchlisted = ref(false)
const isStrategyReportSaved = ref(false)
const chatInput = ref('')
const chatHistory = ref([])
const isChatLoading = ref(false)
const relatedPlans = ref([])
const isCopied = ref(false)

const toggleStrategyWatchlist = () => {
  isStrategyWatchlisted.value = !isStrategyWatchlisted.value
}

const toggleStrategyReport = () => {
  isStrategyReportSaved.value = !isStrategyReportSaved.value
}

const quickPrompts = [
  "这个策略的主要风险是什么？",
  "基于此策略生成的计划有哪些？",
  "如何对冲此策略的下行风险？"
]

// Select a strategy by task (from Active Generation cards) - 只选中，不弹窗
const selectTaskStrategy = (task) => {
  // Try to find existing strategy with same symbol
  const existingStrategy = allSavedStrategies.value.find(s => s.symbol === task.symbol)
  
  if (existingStrategy) {
    // If strategy exists, select it (不打开弹窗)
    selectedStrategyId.value = existingStrategy.id
    selectedStrategy.value = {
      ...existingStrategy,
      title: existingStrategy.title || existingStrategy.stockName || `${existingStrategy.symbol} Strategy`,
      grade: existingStrategy.grade || 'N/A',
      direction: existingStrategy.direction || 'LONG',
      term: existingStrategy.horizon || 'Short Term',
      timeAgo: existingStrategy.generatedAt ? new Date(existingStrategy.generatedAt).toLocaleDateString() : '2h ago',
    }
    switchTab('mystrategy')
    addToast(`已选择 ${existingStrategy.symbol}`, 'info')
  } else {
    // If no existing strategy, create a temporary placeholder
    selectedStrategyId.value = `temp-${task.id}`
    selectedStrategy.value = {
      id: `temp-${task.id}`,
      symbol: task.symbol,
      stockName: task.stockName || task.symbol,
      title: task.title || `${task.symbol} Strategy`,
      grade: 'N/A', // Not yet generated
      status: task.status,
      isGenerating: task.status === 'processing',
      isPending: task.status === 'pending',
      generatedAt: null
    }
    switchTab('mystrategy')
    addToast(`已选择 ${task.symbol}，策略${task.status === 'processing' ? '正在生成中' : '等待生成'}...`, 'info')
  }
}

const openStrategyModal = (opp) => {
  isStrategyWatchlisted.value = false // Reset state
  isStrategyReportSaved.value = false // Reset state
  
  // Adapt 'opp' (which could be a task or a strategy object) to the modal's expected format
  selectedStrategy.value = {
    ...opp,
    title: opp.title || opp.stockName || `${opp.symbol} Strategy`,
    grade: opp.grade || 'A+', // Mock data if missing
    direction: opp.direction || (opp.type === 'Long' ? 'LONG' : 'SHORT') || 'LONG',
    term: opp.horizon || 'Short Term',
    timeAgo: opp.generatedAt ? new Date(opp.generatedAt).toLocaleDateString() : '2h ago',
    time: new Date().toLocaleTimeString(),
    category: opp.strategy || 'AI Analysis',
    duration: '1-2 Weeks',
    summary: opp.summary || opp.reason || 'This is a generated strategy summary based on the analysis parameters.',
    content: opp.content || `
      <h3 class="text-lg font-bold text-white mb-2">Investment Thesis</h3>
      <p class="mb-4">The company is showing strong momentum in its core business segments, driven by increasing demand for AI-related hardware and software solutions. Recent earnings reports have exceeded analyst expectations, indicating robust operational efficiency.</p>
      
      <h3 class="text-lg font-bold text-white mb-2">Technical Analysis</h3>
      <p class="mb-4">Price action suggests a breakout from the current consolidation pattern. The stock is trading above its 50-day and 200-day moving averages, confirming a bullish trend. RSI indicators are in neutral territory, suggesting room for further upside.</p>
      
      <h3 class="text-lg font-bold text-white mb-2">Risk Factors</h3>
      <ul class="list-disc list-inside mb-4">
        <li>Macroeconomic headwinds affecting consumer spending.</li>
        <li>Supply chain disruptions potentially impacting delivery timelines.</li>
        <li>Regulatory changes in key markets.</li>
      </ul>
    `
  }
  
  // Mock related plans
  relatedPlans.value = [
    {
      id: 1,
      title: `${opp.symbol || 'MOCK'} Aggressive Growth`,
      capital: 50000,
      createdAt: '2023-10-25',
      targetReturn: '+15%',
      riskLevel: 'high',
      isExpanded: false,
      positions: [
        { type: 'Buy Call', symbol: opp.symbol || 'MOCK', strike: 'ATM', expiry: '1 Month' }
      ]
    },
    {
      id: 2,
      title: `${opp.symbol || 'MOCK'} Conservative Income`,
      capital: 100000,
      createdAt: '2023-10-26',
      targetReturn: '+5%',
      riskLevel: 'low',
      isExpanded: false,
      positions: [
        { type: 'Sell Put', symbol: opp.symbol || 'MOCK', strike: 'OTM', expiry: '1 Month' }
      ]
    }
  ]
  
  showStrategyModal.value = true
}

const closeStrategyModal = () => {
  showStrategyModal.value = false
  chatHistory.value = []
}

const sendChatMessage = async () => {
  if (!chatInput.value.trim() || isChatLoading.value) return
  
  const userMsg = chatInput.value
  chatHistory.value.push({ role: 'user', content: userMsg })
  chatInput.value = ''
  isChatLoading.value = true
  
  // Simulate AI response
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  chatHistory.value.push({
    role: 'assistant',
    content: `基于 ${selectedStrategy.value.symbol} 的策略分析，这是一个很好的问题。通常来说，考虑到当前的市场环境和 ${selectedStrategy.value.symbol} 的基本面情况，我们需要关注...`
  })
  isChatLoading.value = false
}

const useQuickPrompt = (prompt) => {
  chatInput.value = prompt
  sendChatMessage()
}

const togglePlanExpand = (plan) => {
  plan.isExpanded = !plan.isExpanded
}

// --- Generate Plan Modal Logic ---
const showGeneratePlanModal = ref(false)
const generatePlanTarget = ref(null)
const generatePlanSettings = ref({
  // 持仓状态
  hasPosition: false,
  // 持仓详情（仅当 hasPosition 为 true 时使用）
  averageCost: null,
  positionSize: null, // 仓位占比 %
  // 通用设置
  investmentHorizon: 'medium', // 'short', 'medium', 'long'
  riskPreference: 50, // 0-100 滑块值
  // 保存选项
  saveAsDefault: false
})

// 当前股价（模拟数据，实际应从策略或API获取）
const currentStockPrice = computed(() => {
  if (!generatePlanTarget.value) return 0
  // 模拟当前价格
  return generatePlanTarget.value.currentPrice || 185.50
})

// 计算盈亏
const positionPnL = computed(() => {
  const settings = generatePlanSettings.value
  if (!settings.hasPosition || !settings.averageCost || settings.averageCost <= 0) {
    return { value: 0, percent: 0, isProfit: true }
  }
  const current = currentStockPrice.value
  const cost = settings.averageCost
  const diff = current - cost
  const percent = ((diff / cost) * 100).toFixed(2)
  return {
    value: diff.toFixed(2),
    percent: percent,
    isProfit: diff >= 0
  }
})

// 风险偏好文本
const riskPreferenceLabel = computed(() => {
  const value = generatePlanSettings.value.riskPreference
  if (value <= 25) return 'Conservative'
  if (value <= 50) return 'Moderate'
  if (value <= 75) return 'Growth'
  return 'Aggressive'
})

const generatePlanForStrategy = (strategy) => {
  generatePlanTarget.value = strategy
  // 重置为默认设置或加载保存的默认设置
  const savedDefaults = localStorage.getItem('plan_default_settings_v2')
  if (savedDefaults) {
    const defaults = JSON.parse(savedDefaults)
    generatePlanSettings.value = { 
      hasPosition: false,
      averageCost: null,
      positionSize: null,
      ...defaults,
      saveAsDefault: false
    }
  } else {
    generatePlanSettings.value = {
      hasPosition: false,
      averageCost: null,
      positionSize: null,
      investmentHorizon: 'medium',
      riskPreference: 50,
      saveAsDefault: false
    }
  }
  showGeneratePlanModal.value = true
}

const closeGeneratePlanModal = () => {
  showGeneratePlanModal.value = false
  generatePlanTarget.value = null
}

const confirmGeneratePlan = () => {
  if (!generatePlanTarget.value) return
  
  const settings = generatePlanSettings.value
  
  // 保存为默认设置
  if (settings.saveAsDefault) {
    const toSave = {
      investmentHorizon: settings.investmentHorizon,
      riskPreference: settings.riskPreference
    }
    localStorage.setItem('plan_default_settings_v2', JSON.stringify(toSave))
  }
  
  // 模拟生成计划 - 包含配置信息
  const positionInfo = settings.hasPosition ? 
    `Existing position (Cost: $${settings.averageCost || 'N/A'}, Size: ${settings.positionSize || 'N/A'}%)` : 
    'New position'
  const horizonMap = { short: 'Short-term', medium: 'Medium-term', long: 'Long-term' }
  addToast(`Generating ${horizonMap[settings.investmentHorizon]} plan for ${generatePlanTarget.value.symbol} (${positionInfo})...`, 'info')
  
  // 更新策略状态
  const strategy = allSavedStrategies.value.find(s => s.id === generatePlanTarget.value.id)
  if (strategy) {
    strategy.hasExecutionPlan = true
    strategy.planCount = 1
    strategy.planGeneratingCount = 1
    strategy.generatingCurrent = 1
    strategy.generatingProgress = 0
    
    // 模拟进度
    const interval = setInterval(() => {
      if (strategy.generatingProgress < 100) {
        strategy.generatingProgress += 10
      } else {
        clearInterval(interval)
        strategy.planGeneratingCount = 0
        strategy.planUnreadCount = 1
        addToast(`Execution plan for ${strategy.symbol} generated!`, 'success')
      }
    }, 500)
  }
  
  closeGeneratePlanModal()
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)
}

const goToStockDetail = (symbol) => {
  // Close any open modals
  showStrategyModal.value = false
  
  console.log('Navigating to stock detail:', symbol)
  
  router.push({
    path: `/stock-attribution/${symbol}`,
    query: {
      tab: 'strategies',
      strategyId: '1' 
    }
  })
}

const copyShareLink = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }).catch(() => {
    console.error('Copy failed')
  })
}

const renderedStrategyContent = computed(() => selectedStrategy.value.content || '')

// Button Actions
const showSaveConfirmModal = ref(false)
const savedCount = ref(0)
const listTransitionName = ref('list')

const saveTasksToStrategies = (tasksToSave) => {
  const models = ['Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'GPT-4o']
  const newStrategies = tasksToSave.map(task => ({
    id: `gen-${task.id}`,
    symbol: task.symbol || 'UNKNOWN',
    stockName: task.stockName || task.title,
    direction: Math.random() > 0.5 ? 'LONG' : 'SHORT', // Mock direction
    grade: Math.random() > 0.7 ? 'A' : 'B', // Mock grade
    horizon: 'Medium-term (3-6 months)',
    source: 'My Strategy',
    model: models[Math.floor(Math.random() * models.length)],
    hasExecutionPlan: task.type === 'plan',
    isWatchlist: false,
    isArchived: false,
    generatedAt: new Date().toISOString(),
    savedAt: new Date().toISOString(),
    categoryName: 'Generated',
    categoryId: 'generated'
  }))

  allSavedStrategies.value = [...newStrategies, ...allSavedStrategies.value]
  
  // Remove from tasks list to trigger animation
  tasksToSave.forEach(t => {
    const index = tasks.value.findIndex(task => task.id === t.id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
  })
  
  savedCount.value = tasksToSave.length
  
  // Wait for animation to finish before showing modal
  setTimeout(() => {
    showSaveConfirmModal.value = true
  }, 600)
}

const handleSave = () => {
  if (selectedCompletedTasks.value.length === 0) return
  listTransitionName.value = 'list-save'
  const tasksToSave = completedTasks.value.filter(t => selectedCompletedTasks.value.includes(t.id))
  saveTasksToStrategies(tasksToSave)
  selectedCompletedTasks.value = []
}

const handleDelete = () => {
  if (selectedCompletedTasks.value.length === 0) return
  if (confirm(`Are you sure you want to delete ${selectedCompletedTasks.value.length} tasks?`)) {
    listTransitionName.value = 'list-delete'
    // Use nextTick to ensure class change applies before removal
    setTimeout(() => {
      tasks.value = tasks.value.filter(t => !selectedCompletedTasks.value.includes(t.id))
      selectedCompletedTasks.value = []
    }, 50)
  }
}

const clearNotFoundTasks = () => {
  if (completedNotFoundTasks.value.length === 0) return
  if (confirm(`Clear all ${completedNotFoundTasks.value.length} items where no opportunity was found?`)) {
    listTransitionName.value = 'list-delete'
    const idsToRemove = completedNotFoundTasks.value.map(t => t.id)
    setTimeout(() => {
      tasks.value = tasks.value.filter(t => !idsToRemove.includes(t.id))
      // Also remove from selection if present
      selectedCompletedTasks.value = selectedCompletedTasks.value.filter(id => !idsToRemove.includes(id))
    }, 50)
  }
}

// Queue Processing Logic
const maxConcurrent = ref(2)

const processQueue = () => {
  const processingCount = tasks.value.filter(t => t.status === 'processing').length
  const pendingList = tasks.value.filter(t => t.status === 'pending')
  
  // Fill up to maxConcurrent
  const slotsAvailable = maxConcurrent.value - processingCount
  
  if (slotsAvailable > 0 && pendingList.length > 0) {
    // Move pending tasks to processing up to available slots
    for (let i = 0; i < Math.min(slotsAvailable, pendingList.length); i++) {
      const nextTask = pendingList[i]
      nextTask.status = 'processing'
      nextTask.progress = 0
      nextTask.statusText = 'Initializing...'
      nextTask.timeLeft = 'Calculating...'
      
      // 如果是当前选中的任务，更新 selectedStrategy 状态
      if (selectedStrategyId.value === `temp-${nextTask.id}`) {
        selectedStrategy.value = {
          ...selectedStrategy.value,
          status: 'processing',
          isGenerating: true,
          isPending: false
        }
      }
    }
  }
}

watch(maxConcurrent, () => {
  processQueue()
})

// Mock Progress Simulation
let progressInterval

onMounted(() => {
  loadSavedStrategies()
  
  // Setup Demo Data for Flow Visualization if on mystrategy tab
  if (activeTab.value === 'mystrategy') {
    initDemoTasks()
  }
  
  progressInterval = setInterval(() => {
    tasks.value.forEach(task => {
      if (task.status === 'processing') {
        if (task.progress < 100) {
          // Slower progress for better demo experience
          task.progress += Math.random() * 0.6 + 0.3
          
          if (task.progress >= 100) {
            task.progress = 100
            task.status = 'completed'
            task.completedAt = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            // Randomly decide if opportunity found (80% chance yes)
            task.foundOpportunity = Math.random() > 0.2
            
            // 如果是当前选中的任务，更新状态并切换到真正的策略
            if (selectedStrategyId.value === `temp-${task.id}`) {
              // 查找是否有对应的已保存策略
              const existingStrategy = allSavedStrategies.value.find(s => s.symbol === task.symbol)
              if (existingStrategy) {
                // 切换到真正的策略
                selectedStrategyId.value = existingStrategy.id
                selectedStrategy.value = {
                  ...existingStrategy,
                  title: existingStrategy.title || existingStrategy.stockName || `${existingStrategy.symbol} Strategy`,
                  grade: existingStrategy.grade || 'N/A',
                  direction: existingStrategy.direction || 'LONG',
                  term: existingStrategy.horizon || 'Short Term',
                  timeAgo: existingStrategy.generatedAt ? new Date(existingStrategy.generatedAt).toLocaleDateString() : 'Just now',
                }
                addToast(`${task.symbol} 策略生成完成！`, 'success')
              } else {
                // 如果没有保存的策略（可能是模拟），更新状态为已完成
                selectedStrategy.value = {
                  ...selectedStrategy.value,
                  status: 'completed',
                  isGenerating: false,
                  isPending: false,
                  grade: task.foundOpportunity ? 'A' : 'N/A'
                }
                addToast(`${task.symbol} 策略生成完成！`, 'success')
              }
            }
            
            // Trigger next task immediately
            processQueue()
          }
        }
      }
    })
    // Check queue periodically
    processQueue()
  }, 200)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
})

// --- My Strategy Logic ---
const allSavedStrategies = ref([])

// --- MiniMap Navigation Logic ---
const isMiniMapExpanded = ref(false)
const miniMapDot = ref(null)

// MiniMap 位置 (初始位置在右侧中间)
const miniMapPosition = ref({ x: window.innerWidth - 60, y: window.innerHeight / 2 })

// 拖动状态
const isDraggingMiniMap = ref(false)
const dragStartPos = ref({ x: 0, y: 0 })
const dragStartMiniMapPos = ref({ x: 0, y: 0 })
const hasDragged = ref(false) // 用于区分点击和拖动

// 开始拖动
const startDragMiniMap = (e) => {
  isDraggingMiniMap.value = true
  hasDragged.value = false
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  
  dragStartPos.value = { x: clientX, y: clientY }
  dragStartMiniMapPos.value = { ...miniMapPosition.value }
  
  document.addEventListener('mousemove', onDragMiniMap)
  document.addEventListener('mouseup', stopDragMiniMap)
  document.addEventListener('touchmove', onDragMiniMap)
  document.addEventListener('touchend', stopDragMiniMap)
}

// 拖动中
const onDragMiniMap = (e) => {
  if (!isDraggingMiniMap.value) return
  
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  
  const deltaX = clientX - dragStartPos.value.x
  const deltaY = clientY - dragStartPos.value.y
  
  // 如果移动超过 5px，认为是拖动
  if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
    hasDragged.value = true
  }
  
  // 计算新位置，限制在屏幕范围内
  const newX = Math.min(Math.max(10, dragStartMiniMapPos.value.x + deltaX), window.innerWidth - 60)
  const newY = Math.min(Math.max(60, dragStartMiniMapPos.value.y + deltaY), window.innerHeight - 60)
  
  miniMapPosition.value = { x: newX, y: newY }
}

// 停止拖动
const stopDragMiniMap = () => {
  isDraggingMiniMap.value = false
  
  document.removeEventListener('mousemove', onDragMiniMap)
  document.removeEventListener('mouseup', stopDragMiniMap)
  document.removeEventListener('touchmove', onDragMiniMap)
  document.removeEventListener('touchend', stopDragMiniMap)
  
  // 自动吸附到边缘
  const screenWidth = window.innerWidth
  if (miniMapPosition.value.x < screenWidth / 2) {
    miniMapPosition.value.x = 10
  } else {
    miniMapPosition.value.x = screenWidth - 60
  }
}

// 点击悬浮球（非拖动时展开）
const handleMiniMapDotClick = (e) => {
  if (!hasDragged.value) {
    e.stopPropagation()
    isMiniMapExpanded.value = true
  }
}

// 计算进度百分比 (用于进度环)
const miniMapProgress = computed(() => {
  const doneSteps = miniMapSteps.value.filter(s => s.status === 'done').length
  const totalSteps = miniMapSteps.value.length
  return (doneSteps / totalSteps) * 100
})

// 当前活动步骤编号
const currentActiveStepNumber = computed(() => {
  const activeIndex = miniMapSteps.value.findIndex(s => s.status === 'active')
  return activeIndex >= 0 ? activeIndex + 1 : miniMapSteps.value.filter(s => s.status === 'done').length + 1
})

// 是否有活动任务
const hasActiveTask = computed(() => {
  return tasks.value.some(t => t.status === 'processing') || 
         (selectedStrategy.value && selectedStrategy.value.isGenerating)
})

// 悬浮球是否在左侧
const isMiniMapOnLeft = computed(() => {
  return miniMapPosition.value.x < window.innerWidth / 2
})

// 展开面板的位置样式
const miniMapPanelStyle = computed(() => {
  const panelWidth = 176 // w-44 = 11rem = 176px
  const dotSize = 48 // 悬浮球大小
  const gap = 8 // 间距
  
  let left, top
  
  if (isMiniMapOnLeft.value) {
    // 在左侧，向右展开
    left = miniMapPosition.value.x + dotSize + gap
  } else {
    // 在右侧，向左展开
    left = miniMapPosition.value.x - panelWidth - gap
  }
  
  // 垂直方向居中于悬浮球，但不超出屏幕
  top = Math.max(50, Math.min(miniMapPosition.value.y - 120, window.innerHeight - 350))
  
  return {
    left: left + 'px',
    top: top + 'px'
  }
})

// Helper: Check if grade is B级以上 (A+, A, B)
const isGradeAboveB = (grade) => {
  if (!grade) return false
  const upperGrade = grade.toUpperCase()
  return ['A+', 'A', 'B'].includes(upperGrade)
}

// Helper: Check if grade indicates no opportunity
const isNoOpportunity = (grade) => {
  if (!grade) return true
  const upperGrade = grade.toUpperCase()
  return upperGrade === 'N/A' || upperGrade === 'NA' || upperGrade === ''
}

// Helper: Check if using default/auto parameters
const isUsingDefaultParams = () => {
  return selectedFrameworks.value.includes('auto') && 
         selectedPeriod.value === 'auto' && 
         selectedRisk.value === 'auto'
}

// Helper: Check if strategy needs update (e.g., older than 24 hours)
const strategyNeedsUpdate = (strategy) => {
  if (!strategy || !strategy.generatedAt) return false
  const generatedTime = new Date(strategy.generatedAt).getTime()
  const now = Date.now()
  const hoursSinceGenerated = (now - generatedTime) / (1000 * 60 * 60)
  return hoursSinceGenerated > 24 // Needs update if older than 24 hours
}

// Compute MiniMap steps based on current state and selected strategy
const miniMapSteps = computed(() => {
  const hasSelectedStocks = selectedStocks.value.length > 0
  const hasGeneratedStrategies = allSavedStrategies.value.length > 0
  const isGenerating = pendingTasks.value.some(t => t.status === 'generating')
  const generatedCount = allSavedStrategies.value.length
  const isGenerateTab = activeTab.value === 'generate'
  const isMyStrategyTab = activeTab.value === 'mystrategy'
  
  // Selected strategy info
  const strategy = selectedStrategy.value
  const hasSelectedStrategy = strategy && strategy.id
  const strategyGrade = hasSelectedStrategy ? strategy.grade : null
  const hasPlan = hasSelectedStrategy ? strategy.hasExecutionPlan : false
  const needsUpdate = hasSelectedStrategy && strategyNeedsUpdate(strategy)
  
  // Grade analysis
  const gradeAboveB = isGradeAboveB(strategyGrade)
  const noOpportunity = isNoOpportunity(strategyGrade)
  const gradeBelowB = hasSelectedStrategy && !gradeAboveB && !noOpportunity // C, D grades
  
  // --- Step 1: 策略准备（选择资产 + 配置参数） ---
  // 只在 generate tab 中可以被激活
  let step1Status = 'pending'
  let step1Hint = '选择要分析的标的'
  
  if (hasSelectedStocks) {
    step1Status = 'done'
    if (isUsingDefaultParams()) {
      step1Hint = '默认推荐参数，等待生成策略'
    } else {
      step1Hint = '自定义参数，等待生成策略'
    }
  } else if (isGenerateTab) {
    // 只在 generate tab 时激活
    step1Status = 'active'
  }
  
  // --- Step 2: 机会生成 ---
  // 只在 mystrategy tab 中选中策略后才激活
  let step2Status = 'pending'
  let step2Hint = '等待选择策略'
  let step2Blocked = false
  
  // Check if selected strategy is generating or pending
  const isStrategyGenerating = hasSelectedStrategy && strategy.isGenerating
  const isStrategyPending = hasSelectedStrategy && strategy.isPending
  // Check if selected strategy is being updated (regenerating)
  const isStrategyUpdating = hasSelectedStrategy && regeneratingStrategies.value[strategy.id]
  // Check if selected strategy is "Only Plan" (has plan but no strategy report)
  const isOnlyPlan = hasSelectedStrategy && strategy.hasExecutionPlan && strategy.hasStrategy === false
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step2Status = 'pending'
    step2Hint = '等待选择策略'
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step2Status = 'pending'
    step2Hint = '请选择一个策略'
  } else if (isOnlyPlan) {
    // Only Plan 策略，跳过机会生成步骤
    step2Status = 'skipped'
    step2Hint = '仅计划模式'
  } else if (isStrategyUpdating) {
    // 选中的策略正在更新中
    step2Status = 'active'
    const progress = Math.round(regeneratingStrategies.value[strategy.id]?.progress || 0)
    step2Hint = `正在更新... ${progress}%`
  } else if (isStrategyGenerating) {
    // 选中的策略正在生成中
    step2Status = 'active'
    step2Hint = '正在生成中...'
  } else if (isStrategyPending) {
    // 选中的策略等待生成
    step2Status = 'active'
    step2Hint = '等待生成...'
  } else {
    // 在 mystrategy tab 且选中了已生成的策略
    if (needsUpdate) {
      step2Status = 'active'
      step2Hint = '建议更新策略'
      step2Blocked = true
    } else {
      step2Status = 'done'
      step2Hint = '策略已生成'
    }
  }
  
  // 判断步骤2是否完成（策略已生成且不在生成/等待/更新状态）
  const isStep2Done = step2Status === 'done'
  const isStep2InProgress = isStrategyGenerating || isStrategyPending || isStrategyUpdating
  
  // --- Step 3: 机会判定 ---
  // 只在 mystrategy tab 中选中策略后才激活，且步骤2必须完成
  let step3Status = 'pending'
  let step3Hint = '等待选择策略'
  let step3Blocked = false
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step3Status = 'pending'
    step3Hint = '等待选择策略'
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step3Status = 'pending'
    step3Hint = '请选择一个策略'
  } else if (isOnlyPlan) {
    // Only Plan 策略，跳过机会判定步骤
    step3Status = 'skipped'
    step3Hint = '仅计划模式'
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤3保持灰色
    step3Status = 'pending'
    step3Hint = '等待策略生成完成'
  } else {
    // 步骤2已完成，根据 grade 判断步骤3状态
    if (noOpportunity) {
      step3Status = 'active'
      step3Hint = '暂无机会，建议更新策略'
      step3Blocked = true
    } else if (gradeBelowB) {
      step3Status = 'active'
      step3Hint = `${strategyGrade}级机会，建议调整参数`
      step3Blocked = true
    } else if (gradeAboveB) {
      if (hasPlan) {
        step3Status = 'done'
        step3Hint = `${strategyGrade}级机会`
      } else {
        step3Status = 'active'
        step3Hint = `${strategyGrade}级机会，可生成计划 →`
      }
    }
  }
  
  // 判断步骤3是否完成或通过
  const isStep3Done = step3Status === 'done'
  const isStep3Active = step3Status === 'active' && !step3Blocked
  const isStep3Skipped = step3Status === 'skipped' // Only Plan 模式跳过
  const isStep3Passed = isStep3Done || isStep3Active || isStep3Skipped // 可以进入步骤4
  
  // --- Step 4: 计划生成 ---
  // 只在 mystrategy tab 中选中策略后才激活，且步骤3必须通过
  let step4Status = 'pending'
  let step4Hint = '等待选择策略'
  let step4Blocked = false
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step4Status = 'pending'
    step4Hint = '等待选择策略'
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step4Status = 'pending'
    step4Hint = '请选择一个策略'
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤4保持灰色
    step4Status = 'pending'
    step4Hint = '等待策略生成完成'
  } else if (isOnlyPlan) {
    // Only Plan 模式，直接显示计划状态
    if (hasPlan) {
      step4Status = 'done'
      step4Hint = '计划已生成'
    } else {
      step4Status = 'active'
      step4Hint = '等待生成计划'
    }
  } else if (step3Blocked) {
    // 步骤3被阻塞，步骤4也被阻塞
    if (noOpportunity) {
      step4Status = 'blocked'
      step4Hint = '需有策略机会'
      step4Blocked = true
    } else if (gradeBelowB) {
      step4Status = 'blocked'
      step4Hint = '需B级以上机会'
      step4Blocked = true
    }
  } else if (isStep3Passed) {
    // 步骤3通过，根据计划状态判断
    if (hasPlan) {
      step4Status = 'done'
      step4Hint = '计划已生成'
    } else {
      step4Status = 'active'
      step4Hint = '等待生成计划'
    }
  } else {
    // 步骤3未完成
    step4Status = 'pending'
    step4Hint = '等待机会判定'
  }
  
  // 判断步骤4是否完成
  const isStep4Done = step4Status === 'done'
  
  // --- Step 5: 执行/完成 ---
  // 只在 mystrategy tab 中选中策略后才激活，且步骤4必须完成
  let step5Status = 'pending'
  let step5Hint = '等待选择策略'
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step5Status = 'pending'
    step5Hint = '等待选择策略'
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step5Status = 'pending'
    step5Hint = '请选择一个策略'
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤5保持灰色
    step5Status = 'pending'
    step5Hint = '等待策略生成完成'
  } else if (step4Blocked) {
    // 步骤4被阻塞，步骤5保持灰色
    step5Status = 'pending'
    step5Hint = '等待计划生成'
  } else if (isStep4Done) {
    // 步骤4完成，可以执行
    step5Status = 'active'
    step5Hint = '可执行交易'
  } else {
    // 步骤4未完成
    step5Status = 'pending'
    step5Hint = '等待计划生成'
  }
  
  return [
    {
      key: 'strategy_setup',
      title: '策略准备',
      hint: step1Hint,
      status: step1Status,
      action: () => { switchTab('generate') }
    },
    {
      key: 'opportunity_generate',
      title: '机会生成',
      hint: step2Hint,
      status: step2Status,
      blocked: step2Blocked,
      action: () => { switchTab('generate') }
    },
    {
      key: 'opportunity_gate',
      title: '机会判定',
      hint: step3Hint,
      status: step3Status,
      blocked: step3Blocked,
      action: hasSelectedStrategy ? () => { switchTab('mystrategy') } : null
    },
    {
      key: 'planning',
      title: '计划生成',
      hint: step4Hint,
      status: step4Status,
      blocked: step4Blocked,
      action: hasSelectedStrategy && gradeAboveB && !hasPlan ? () => { 
        // Navigate to planning page
        router.push({ name: 'PlanningDetail', params: { id: strategy.id } })
      } : null
    },
    {
      key: 'execution',
      title: '执行/完成',
      hint: step5Hint,
      status: step5Status,
      action: hasSelectedStrategy && hasPlan ? () => {
        // Navigate to trading page
        router.push({ name: 'Trading' })
      } : null
    }
  ]
})

const currentStepIndex = computed(() => {
  const activeIndex = miniMapSteps.value.findIndex(s => s.status === 'active')
  return activeIndex >= 0 ? activeIndex : 0
})

const handleMiniMapStepClick = (step) => {
  if (step.action && (step.status === 'done' || step.status === 'active')) {
    step.action()
  }
}

const selectedCollection = ref('all')
const smartFiltersEnabled = ref(true) // Toggle for Smart Filters section (默认打开)
const libraryFilter = ref('all') // 'all', 'high-grade', 'no-signal', 'no-opportunity', 'recommend-update'

// Smart Filter 各分类的计数
// Official 来源只有 High Grade (A/B)，不会有 C/D 或 N/A
const smartFilterCounts = computed(() => {
  const strategies = allSavedStrategies.value.filter(s => !s.isArchived)
  return {
    'high-grade': strategies.filter(s => ['A', 'B'].includes(s.grade)).length,
    'recommend-update': strategies.filter(s => s.needsUpdate && s.source !== 'Official').length, // 排除 Official 来源
    'no-signal': strategies.filter(s => ['C', 'D'].includes(s.grade) && s.source !== 'Official').length, // 排除 Official 来源
    'no-opportunity': strategies.filter(s => s.grade === 'N/A' && s.source !== 'Official').length // 排除 Official 来源
  }
})

// Smart Filter 新数据标记（记录用户已查看的分类）
const smartFilterViewed = ref({
  'high-grade': true,
  'recommend-update': true,
  'no-signal': true,
  'no-opportunity': true
})

// 上次查看时各分类的数量（用于判断是否有新数据）
// 初始值为0，这样首次加载时所有分类都会显示"新数据"圆点
const smartFilterLastCounts = ref({
  'high-grade': 0,
  'recommend-update': 0,
  'no-signal': 0,
  'no-opportunity': 0
})

// 判断某个分类是否有新数据
const hasNewData = (filterKey) => {
  return smartFilterCounts.value[filterKey] > smartFilterLastCounts.value[filterKey]
}

// 点击分类时标记为已查看
const selectSmartFilter = (filterKey) => {
  libraryFilter.value = filterKey
  smartFilterViewed.value[filterKey] = true
  smartFilterLastCounts.value[filterKey] = smartFilterCounts.value[filterKey]
}
const regeneratingStrategies = ref({}) // Track strategies being regenerated: { strategyId: { progress: 0-100 } }
const strategySearchQuery = ref('')
const strategyFilterOption = ref('all') // 'all', 'long', 'short'

// Toast Notification Logic
const toasts = ref([])

const addToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now()
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}
const strategySortField = ref('generatedAt')
const strategySortDirection = ref('desc')
const strategyViewMode = ref('table') // 'table', 'grid'

const handleSort = (field) => {
  if (strategySortField.value === field) {
    strategySortDirection.value = strategySortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    strategySortField.value = field
    strategySortDirection.value = 'desc'
  }
}

// Strategy Selection & Management (单选模式)
const selectedStrategyId = ref(null) // 单选：只保存一个策略ID
const showMoveMenu = ref(false)

// 为了向后兼容，保留 selectedStrategies 作为计算属性
const selectedStrategies = computed(() => {
  return selectedStrategyId.value ? [selectedStrategyId.value] : []
})

const isAllStrategiesSelected = computed(() => {
  // 单选模式下不支持全选
  return false
})

const toggleSelectAllStrategies = () => {
  // 单选模式下不支持全选，清除选择
  selectedStrategyId.value = null
}

const toggleStrategySelection = (id) => {
  // 单选模式：如果点击的是已选中的，取消选择；否则选中新的
  if (selectedStrategyId.value === id) {
    selectedStrategyId.value = null
    selectedStrategy.value = null
  } else {
    selectedStrategyId.value = id
    // 更新 selectedStrategy 用于 MiniMap（但不打开弹窗）
    const strategy = allSavedStrategies.value.find(s => s.id === id)
    if (strategy) {
      selectedStrategy.value = {
        ...strategy,
        title: strategy.title || strategy.stockName || `${strategy.symbol} Strategy`,
        grade: strategy.grade || 'N/A',
        direction: strategy.direction || 'LONG',
        term: strategy.horizon || 'Short Term',
        timeAgo: strategy.generatedAt ? new Date(strategy.generatedAt).toLocaleDateString() : '2h ago',
      }
    }
  }
}

// 查看策略详情（打开弹窗）
const viewStrategyDetail = (strategy) => {
  if (strategy.grade === 'N/A' || regeneratingStrategies.value[strategy.id]) return
  // 先选中该策略
  selectedStrategyId.value = strategy.id
  // 然后打开弹窗
  openStrategyModal(strategy)
}

// 清除选择的辅助函数
const clearStrategySelection = () => {
  selectedStrategyId.value = null
}

const moveStrategiesToGroup = (groupId) => {
  const group = customCollections.value.find(c => c.id === groupId)
  if (!group) return

  allSavedStrategies.value.forEach(s => {
    if (selectedStrategies.value.includes(s.id)) {
      s.categoryId = groupId
      s.categoryName = group.label
    }
  })
  
  clearStrategySelection()
  showMoveMenu.value = false
}

const handleRegenerateSelected = () => {
  if (selectedStrategies.value.length === 0) return

  const newTasks = []
  
  // Find strategy objects
  // Find strategy objects
  const strategiesToRegen = allSavedStrategies.value.filter(s => selectedStrategies.value.includes(s.id))
  
  // Filter out Official strategies
  const validStrategies = strategiesToRegen.filter(s => s.source !== 'Official')
  const skippedCount = strategiesToRegen.length - validStrategies.length

  if (validStrategies.length === 0 && skippedCount > 0) {
    addToast('Official strategies cannot be regenerated.', 'error')
    return
  }

  if (skippedCount > 0) {
    addToast(`Regenerating ${validStrategies.length} strategies. (${skippedCount} Official strategies skipped)`, 'info')
  }
  
  // Handle found strategies
  validStrategies.forEach(strat => {
    const newTask = {
      id: Date.now() + Math.floor(Math.random() * 10000),
      type: 'strategy',
      title: `${strat.symbol} Strategy - Regenerated`,
      symbol: strat.symbol,
      stockName: strat.stockName,
      status: 'pending',
      estTime: '2m',
      progress: 0,
      timeLeft: '2m',
      statusText: 'Queued',
      isNew: true
    }
    tasks.value.push(newTask)
    newTasks.push(newTask)
  })

  // Fallback for any selected IDs that weren't found in allSavedStrategies (e.g. type mismatch)
  // Assuming missing IDs are valid for regeneration (or we can't check source)
  const foundIds = strategiesToRegen.map(s => s.id)
  const missingIds = selectedStrategies.value.filter(id => !foundIds.includes(id))
  
  missingIds.forEach(id => {
    const newTask = {
      id: Date.now() + Math.floor(Math.random() * 10000),
      type: 'strategy',
      title: `Strategy ${id} - Regenerated`,
      symbol: 'UNKNOWN',
      stockName: 'Unknown Stock',
      status: 'pending',
      estTime: '2m',
      progress: 0,
      timeLeft: '2m',
      statusText: 'Queued',
      isNew: true
    }
    tasks.value.push(newTask)
    newTasks.push(newTask)
  })

  clearStrategySelection()
  
  // Force tab switch if not already there
  if (activeTab.value !== 'mystrategy') {
    activeTab.value = 'mystrategy'
    if (typeof router !== 'undefined') {
      router.push({ query: { ...route.query, tab: 'mystrategy' } })
    }
  }
  
  // Scroll to top to see active generation
  nextTick(() => {
    const panel = document.getElementById('active-generation-panel')
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  })
  
  // Clear highlight
  setTimeout(() => {
    newTasks.forEach(t => {
      t.isNew = false
    })
  }, 3000)
}

// Handle regenerate for a single strategy (Update button in row)
const handleRegenerateSingle = (strategy) => {
  if (!strategy) return
  
  // Check if already regenerating
  if (regeneratingStrategies.value[strategy.id]) {
    return
  }
  
  // Check if it's an Official strategy
  if (strategy.source === 'Official') {
    addToast('Official strategies cannot be regenerated.', 'error')
    return
  }
  
  // Mark as regenerating with initial progress
  regeneratingStrategies.value[strategy.id] = { progress: 0 }
  
  const newTask = {
    id: Date.now() + Math.floor(Math.random() * 10000),
    type: 'strategy',
    title: `${strategy.symbol} Strategy - Regenerated`,
    symbol: strategy.symbol,
    stockName: strategy.stockName,
    strategyId: strategy.id, // Link to the strategy for progress tracking
    status: 'pending',
    estTime: '2m',
    progress: 0,
    timeLeft: '2m',
    statusText: 'Queued',
    isNew: true
  }
  tasks.value.push(newTask)
  
  addToast(`Regenerating strategy for ${strategy.symbol}`, 'success')
  
  // Process the task
  processNextTask()
  
  // Simulate progress for the row overlay
  const progressInterval = setInterval(() => {
    if (regeneratingStrategies.value[strategy.id]) {
      const currentProgress = regeneratingStrategies.value[strategy.id].progress
      if (currentProgress < 95) {
        regeneratingStrategies.value[strategy.id].progress = currentProgress + Math.random() * 15
      }
    }
  }, 500)
  
  // Complete after simulation (mock: 5 seconds)
  setTimeout(() => {
    clearInterval(progressInterval)
    if (regeneratingStrategies.value[strategy.id]) {
      regeneratingStrategies.value[strategy.id].progress = 100
      // Remove from regenerating after a brief moment
      setTimeout(() => {
        delete regeneratingStrategies.value[strategy.id]
      }, 500)
    }
  }, 5000)
  
  // Clear highlight after 3 seconds
  setTimeout(() => {
    newTask.isNew = false
  }, 3000)
}

const customCollections = ref([
  { id: 'tech', label: 'Tech Stocks', icon: IconBriefcase },
  { id: 'high-risk', label: 'High Risk', icon: IconBriefcase }
])

// Group Creation Logic
const isCreatingGroup = ref(false)
const newGroupName = ref('')
const newGroupInputRef = ref(null)

const startCreateGroup = () => {
  isCreatingGroup.value = true
  newGroupName.value = ''
  nextTick(() => {
    newGroupInputRef.value?.focus()
  })
}

const confirmCreateGroup = () => {
  const name = newGroupName.value.trim()
  if (!name) {
    isCreatingGroup.value = false
    return
  }
  const id = name.toLowerCase().replace(/\s+/g, '-')
  
  if (customCollections.value.some(c => c.id === id)) {
    addToast('Group already exists', 'warning')
    return
  }
  
  customCollections.value.push({ id, label: name, icon: IconBriefcase })
  isCreatingGroup.value = false
}

const cancelCreateGroup = () => {
  isCreatingGroup.value = false
}

// Group Deletion Logic
const showDeleteGroupModal = ref(false)
const groupToDelete = ref(null)

const promptDeleteGroup = (col) => {
  groupToDelete.value = col
  showDeleteGroupModal.value = true
}

const executeDeleteGroup = () => {
  if (groupToDelete.value) {
    customCollections.value = customCollections.value.filter(c => c.id !== groupToDelete.value.id)
    if (selectedCollection.value === groupToDelete.value.id) {
      selectedCollection.value = 'all'
    }
    showDeleteGroupModal.value = false
    groupToDelete.value = null
  }
}

// Collections Definition
const strategyCollections = computed(() => {
  const allCount = allSavedStrategies.value.length
  const officialCount = allSavedStrategies.value.filter(s => s.source === 'Official').length
  const myCount = allSavedStrategies.value.filter(s => s.source === 'My Strategy').length
  const planCount = allSavedStrategies.value.filter(s => s.hasExecutionPlan).length
  const onlyPlanCount = allSavedStrategies.value.filter(s => s.hasExecutionPlan && !s.hasStrategy).length
  const noPlanCount = allSavedStrategies.value.filter(s => !s.hasExecutionPlan || s.planCount === 0).length

  const preset = [
    { id: 'all', label: 'All Strategies', count: allCount, icon: IconBriefcase },
    { id: 'official', label: 'Official Reports', count: officialCount, icon: IconDocument },
    { id: 'my', label: 'My Strategies', count: myCount, icon: IconTarget },
    { id: 'plans', label: 'With Execution Plans', count: planCount, icon: IconLightning },
    { id: 'only-plan', label: 'Only Plan', count: onlyPlanCount, icon: IconCalendar, isFixed: true },
    { id: 'no-plan', label: 'No Plan', count: noPlanCount, icon: IconBan, isFixed: true },
  ]

  const custom = customCollections.value.map(c => ({
    ...c,
    count: allSavedStrategies.value.filter(s => s.categoryId === c.id).length
  }))

  return [...preset, ...custom]
})

const currentCollectionName = computed(() => {
  const col = strategyCollections.value.find(c => c.id === selectedCollection.value)
  return col ? col.label : 'Strategies'
})

const displayedStrategies = computed(() => {
  let strategies = [...allSavedStrategies.value]

  // 1. Filter by Collection
  if (selectedCollection.value === 'all') {
    // No filter
  } else if (selectedCollection.value === 'official') {
    strategies = strategies.filter(s => s.source === 'Official')
  } else if (selectedCollection.value === 'my') {
    strategies = strategies.filter(s => s.source === 'My Strategy')
  } else if (selectedCollection.value === 'plans') {
    strategies = strategies.filter(s => s.hasExecutionPlan)
  } else if (selectedCollection.value === 'only-plan') {
    strategies = strategies.filter(s => s.hasExecutionPlan && !s.hasStrategy)
  } else if (selectedCollection.value === 'no-plan') {
    strategies = strategies.filter(s => !s.hasExecutionPlan || s.planCount === 0)
  } else {
    // Custom Collection
    strategies = strategies.filter(s => s.categoryId === selectedCollection.value)
  }

  // 1.5 Filter by Smart Filter (libraryFilter)
  // Official 来源只有 High Grade，不会有 C/D、N/A 或 needsUpdate
  if (libraryFilter.value === 'high-grade') {
    strategies = strategies.filter(s => ['A', 'B'].includes(s.grade))
  } else if (libraryFilter.value === 'no-signal') {
    // No Signal Logs: show C and D grade strategies (排除 Official 来源)
    strategies = strategies.filter(s => ['C', 'D'].includes(s.grade) && s.source !== 'Official')
  } else if (libraryFilter.value === 'no-opportunity') {
    // No Opportunity Found: show strategies with N/A grade (排除 Official 来源)
    strategies = strategies.filter(s => s.grade === 'N/A' && s.source !== 'Official')
  } else if (libraryFilter.value === 'recommend-update') {
    strategies = strategies.filter(s => s.needsUpdate && s.source !== 'Official') // 排除 Official 来源
  }

  // 2. Search
  if (strategySearchQuery.value) {
    const q = strategySearchQuery.value.toLowerCase()
    strategies = strategies.filter(s => 
      (s.symbol && s.symbol.toLowerCase().includes(q)) || 
      (s.stockName && s.stockName.toLowerCase().includes(q))
    )
  }

  // 3. Filter Option
  if (strategyFilterOption.value !== 'all') {
    strategies = strategies.filter(s => s.direction && s.direction.toLowerCase() === strategyFilterOption.value)
  }

  // 4. Sort
  strategies.sort((a, b) => {
    let valA = a[strategySortField.value]
    let valB = b[strategySortField.value]
    
    // Handle special fields
    if (strategySortField.value === 'generatedAt') {
      valA = valA ? new Date(valA).getTime() : 0
      valB = valB ? new Date(valB).getTime() : 0
    } else {
      // Safety check for null/undefined
      if (valA === null || valA === undefined) valA = ''
      if (valB === null || valB === undefined) valB = ''

      if (typeof valA === 'string') {
        valA = valA.toLowerCase()
      }
      if (typeof valB === 'string') {
        valB = valB.toLowerCase()
      }
      // Ensure both are strings for comparison if one is string
      if (typeof valA === 'string' && typeof valB !== 'string') valB = String(valB)
      if (typeof valB === 'string' && typeof valA !== 'string') valA = String(valA)
    }
    
    if (valA < valB) return strategySortDirection.value === 'asc' ? -1 : 1
    if (valA > valB) return strategySortDirection.value === 'asc' ? 1 : -1
    return 0
  })

  return strategies
})

// Generate demo strategy data for demonstration
const generateDemoStrategies = () => {
  const now = new Date()
  const models = ['Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'GPT-4o']
  
  return [
    {
      id: 'demo-1',
      symbol: 'AAPL',
      stockName: 'Apple Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Short-term (1-3 months)',
      source: 'Official',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      // Plan 相关字段
      planCount: 3,
      planUnreadCount: 1,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: true  // 官方已更新状态
    },
    {
      id: 'demo-2',
      symbol: 'TSLA',
      stockName: 'Tesla, Inc.',
      direction: 'SHORT',
      grade: 'B',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      categoryName: 'High Risk',
      categoryId: 'high-risk',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: true,
      officialUpdating: true,  // 官方正在更新
      officialUpdated: false
    },
    {
      id: 'demo-3',
      symbol: 'MSFT',
      stockName: 'Microsoft Corporation',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Long-term (6+ months)',
      source: 'Official',
      model: 'GPT-4o',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 5,
      planUnreadCount: 2,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: true,
      strategyNeedsUpdate: false,
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: true  // 官方已更新
    },
    {
      id: 'demo-4',
      symbol: 'NVDA',
      stockName: 'NVIDIA Corporation',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 2,
      planUnreadCount: 0,
      planGeneratingCount: 2,
      generatingCurrent: 1,
      generatingProgress: 45,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,  // Official 来源不需要用户更新
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: true  // 官方已更新状态
    },
    {
      id: 'demo-5',
      symbol: 'GOOGL',
      stockName: 'Alphabet Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'Official',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: true  // 官方已更新状态
    },
    {
      id: 'demo-6',
      symbol: 'META',
      stockName: 'Meta Platforms, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Social Media',
      categoryId: 'social',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-7',
      symbol: 'AMZN',
      stockName: 'Amazon.com, Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'My Strategy',
      model: 'GPT-4o',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'E-commerce',
      categoryId: 'ecommerce',
      planCount: 4,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-8',
      symbol: 'AMD',
      stockName: 'Advanced Micro Devices',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Semiconductors',
      categoryId: 'semi',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-9',
      symbol: 'NFLX',
      stockName: 'Netflix, Inc.',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: true,
      generatedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Streaming',
      categoryId: 'streaming',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,  // C/D grade 都需要显示 Update 按钮
      strategyUnread: false
    },
    {
      id: 'demo-10',
      symbol: 'BA',
      stockName: 'Boeing Company',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'My Strategy',
      model: 'GPT-4o',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Industrial',
      categoryId: 'industrial',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-11',
      symbol: 'INTC',
      stockName: 'Intel Corporation',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',  // N/A grade 不能是 Official 来源
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Semiconductors',
      categoryId: 'semi',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-12',
      symbol: 'CSCO',
      stockName: 'Cisco Systems, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 2,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,  // Official 来源不需要用户更新
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: true  // 官方已更新状态
    },
    {
      id: 'demo-13',
      symbol: 'ORCL',
      stockName: 'Oracle Corporation',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      needsUpdate: true,
      generatedAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,
      strategyUnread: false
    },
    // 更多 needsUpdate 示例数据 (用于展示圆点功能)
    // 注意：needsUpdate 只适用于非 Official 来源
    {
      id: 'demo-update-1',
      symbol: 'PYPL',
      stockName: 'PayPal Holdings',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Medium-term (3-6 months)',
      source: 'My Strategy',  // 改为 My Strategy，才会出现在 Recommended Update 中
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      needsUpdate: true,
      generatedAt: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'FinTech',
      categoryId: 'fintech',
      planCount: 2,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: true,
      strategyNeedsUpdate: true,
      strategyUnread: false
    },
    {
      id: 'demo-update-2',
      symbol: 'SQ',
      stockName: 'Block, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'GPT-4o',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      needsUpdate: true,
      generatedAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'FinTech',
      categoryId: 'fintech',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,
      strategyUnread: false
    },
    {
      id: 'demo-update-3',
      symbol: 'SHOP',
      stockName: 'Shopify Inc.',
      direction: 'LONG',
      grade: 'A',
      horizon: 'Long-term (6+ months)',
      source: 'My Strategy',  // 改为 My Strategy，才会出现在 Recommended Update 中
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      needsUpdate: true,
      generatedAt: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'E-Commerce',
      categoryId: 'ecommerce',
      planCount: 4,
      planUnreadCount: 1,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: true,
      strategyNeedsUpdate: true,
      strategyUnread: false
    },
    // 更多 No Signal (C/D grade) 示例数据
    // 所有 C/D grade 策略都需要显示 Update 按钮
    {
      id: 'demo-nosig-1',
      symbol: 'SNAP',
      stockName: 'Snap Inc.',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Social Media',
      categoryId: 'social',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,  // C/D grade 都需要显示 Update 按钮
      strategyUnread: false
    },
    {
      id: 'demo-nosig-2',
      symbol: 'PINS',
      stockName: 'Pinterest, Inc.',
      direction: 'LONG',
      grade: 'D',
      horizon: 'Medium-term (3-6 months)',
      source: 'My Strategy',  // C/D grade 只能是 My Strategy 来源
      model: 'GPT-4o',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Social Media',
      categoryId: 'social',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,  // C/D grade 都需要显示 Update 按钮
      strategyUnread: false
    },
    {
      id: 'demo-nosig-3',
      symbol: 'UBER',
      stockName: 'Uber Technologies',
      direction: 'SHORT',
      grade: 'D',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Transportation',
      categoryId: 'transport',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: true,  // C/D grade 都需要显示 Update 按钮
      strategyUnread: false
    },
    // No Opportunity Found 示例数据
    {
      id: 'demo-no-opp-1',
      symbol: 'INTC',
      stockName: 'Intel Corporation',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',  // N/A grade 不能是 Official 来源
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-no-opp-2',
      symbol: 'IBM',
      stockName: 'International Business Machines',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',
      model: 'Claude 3.5',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-no-opp-3',
      symbol: 'GE',
      stockName: 'General Electric',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',
      model: 'GPT-4o',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: null,
      categoryId: null,
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-no-opp-4',
      symbol: 'F',
      stockName: 'Ford Motor Company',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'High Risk',
      categoryId: 'high-risk',
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-no-opp-5',
      symbol: 'T',
      stockName: 'AT&T Inc.',
      direction: 'NEUTRAL',
      grade: 'N/A',
      horizon: 'N/A',
      source: 'My Strategy',  // N/A grade 不能是 Official 来源
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: null,
      categoryId: null,
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    // Only Plan 示例数据 - 只有执行计划，没有策略报告
    // 策略相关字段 (direction, grade, horizon, source, generatedAt) 都为空
    {
      id: 'demo-only-plan-1',
      symbol: 'COIN',
      stockName: 'Coinbase Global Inc.',
      direction: null,     // Only Plan 没有策略，无方向
      grade: null,         // Only Plan 没有策略，无评级
      horizon: null,       // Only Plan 没有策略，无时间范围
      source: null,        // Only Plan 没有策略，无来源
      model: null,
      hasExecutionPlan: true,
      hasStrategy: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: null,   // Only Plan 没有策略，无创建日期
      savedAt: null,
      categoryName: 'High Risk',
      categoryId: 'high-risk',
      planCount: 2,
      planUnreadCount: 1,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-only-plan-2',
      symbol: 'RBLX',
      stockName: 'Roblox Corporation',
      direction: null,     // Only Plan 没有策略，无方向
      grade: null,         // Only Plan 没有策略，无评级
      horizon: null,       // Only Plan 没有策略，无时间范围
      source: null,        // Only Plan 没有策略，无来源
      model: null,
      hasExecutionPlan: true,
      hasStrategy: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: null,   // Only Plan 没有策略，无创建日期
      savedAt: null,
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 3,
      planUnreadCount: 0,
      planGeneratingCount: 1,
      generatingCurrent: 1,
      generatingProgress: 60,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false
    },
    {
      id: 'demo-only-plan-3',
      symbol: 'HOOD',
      stockName: 'Robinhood Markets',
      direction: null,     // Only Plan 没有策略，无方向
      grade: null,         // Only Plan 没有策略，无评级
      horizon: null,       // Only Plan 没有策略，无时间范围
      source: null,        // Only Plan 没有策略，无来源
      model: null,
      hasExecutionPlan: true,
      hasStrategy: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: null,   // Only Plan 没有策略，无创建日期
      savedAt: null,
      categoryName: null,
      categoryId: null,
      planCount: 1,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: true,
      strategyNeedsUpdate: false,
      strategyUnread: false
    }
  ]
}

// 一键清理 No Opportunity Found 策略
const clearNoOpportunityStrategies = () => {
  const noOppStrategies = allSavedStrategies.value.filter(s => 
    s.grade === 'N/A' || s.grade === 'NA' || !s.grade
  )
  
  if (noOppStrategies.length === 0) {
    addToast('No strategies to clear', 'info')
    return
  }
  
  const count = noOppStrategies.length
  
  // 移除所有 No Opportunity Found 的策略
  allSavedStrategies.value = allSavedStrategies.value.filter(s => 
    s.grade && s.grade !== 'N/A' && s.grade !== 'NA'
  )
  
  // 如果当前选中的策略被删除了，清除选择
  if (selectedStrategyId.value) {
    const stillExists = allSavedStrategies.value.find(s => s.id === selectedStrategyId.value)
    if (!stillExists) {
      selectedStrategyId.value = null
      selectedStrategy.value = null
    }
  }
  
  // 切换回 All Strategies
  libraryFilter.value = 'all'
  
  addToast(`Cleared ${count} strategies with no opportunity`, 'success')
}

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
      } else {
        allSavedStrategies.value = allReports
      }
    } else {
      // Add demo data if no saved strategies exist
      allSavedStrategies.value = generateDemoStrategies()
    }
  } catch (error) {
    console.error('Failed to load saved strategies:', error)
    allSavedStrategies.value = generateDemoStrategies()
  }
  
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #0a0a0a;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Slider Thumb Styles */
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
  transition: all 0.15s ease;
}
.slider-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
}
.slider-thumb::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  cursor: pointer;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.4);
}

/* Slide Fade Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

/* List Transitions */
.list-move,
.list-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Save Animation (Fly away) */
.list-save-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  z-index: 0;
}
.list-save-leave-to {
  opacity: 0;
  transform: translate(100px, 100px) scale(0.5);
  filter: blur(2px);
}

/* Delete Animation (Dissolve) */
.list-delete-leave-active {
  transition: all 0.5s ease-out;
  position: absolute;
  width: 100%;
  z-index: 0;
}
.list-delete-leave-to {
  opacity: 0;
  transform: scale(0.9);
  filter: blur(8px);
}

@keyframes flash-highlight {
  0%, 100% { border-color: rgba(6,182,212,0.5); background-color: rgba(22,78,99,0.1); box-shadow: 0 0 15px rgba(6,182,212,0.3); }
  50% { border-color: rgba(6,182,212,1); background-color: rgba(22,78,99,0.3); box-shadow: 0 0 25px rgba(6,182,212,0.6); }
}
.animate-flash {
  animation: flash-highlight 1.5s infinite;
}

/* Selected Task Glow Animation */
@keyframes selected-glow {
  0%, 100% { 
    box-shadow: 0 0 15px rgba(6,182,212,0.3), 0 0 30px rgba(6,182,212,0.1);
  }
  50% { 
    box-shadow: 0 0 25px rgba(6,182,212,0.5), 0 0 50px rgba(6,182,212,0.2);
  }
}
.selected-task-glow {
  animation: selected-glow 2s ease-in-out infinite;
}

/* Gradient Animation for Top Border */
@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 2s ease infinite;
}

/* Toast Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
