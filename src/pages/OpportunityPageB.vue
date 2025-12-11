<template>
  <div class="h-screen bg-[#050505] text-gray-300 font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col">
    <Navbar />
    
    <main class="flex-1 pt-20 px-4 lg:px-8 max-w-[1920px] mx-auto w-full flex flex-col overflow-hidden relative">
      <!-- Header (Optional, keep it minimal) -->
      
      <!-- Main Split Layout: Generate Tab -->
      <div v-if="activeTab === 'generate'" class="flex-1 flex gap-6 min-h-0 mt-4 pb-24 animate-fade-in">
        
        <!-- Left Column: Asset Selection -->
        <div class="w-[400px] flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
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
            <div class="p-3 text-xs text-gray-500 flex justify-between items-center font-mono">
              <span>SELECTED: <span class="text-cyan-400">{{ selectedStocks.length }}</span></span>
              <button @click="selectedStocks = []" class="hover:text-white transition-colors">CLEAR ALL</button>
            </div>
          </div>
        </div>

        <!-- Right Column: Strategy Configuration -->
        <div class="flex-1 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50 relative">
          
          <!-- Scrollable Content -->
          <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
            
            <!-- Header -->
            <div class="flex justify-between items-end mb-8 border-b border-[#222] pb-4">
              <div>
                <h2 class="text-xl font-bold text-white uppercase tracking-widest mb-1">Strategy Config</h2>
                <p class="text-xs text-gray-500 font-mono">CONFIGURE YOUR ANALYSIS PARAMETERS</p>
              </div>
            </div>

            <!-- Recommendation Hint -->
            <div class="bg-cyan-900/10 border border-cyan-500/20 rounded-sm p-3 mb-6 flex items-start gap-3">
              <div class="mt-0.5 text-cyan-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p class="text-xs text-cyan-200/80 leading-relaxed">
                <span class="font-bold text-cyan-400">使用推荐卡片</span> = 如果你回答之前的问题，那么推荐来自你的回答；如果你没回答，则交给模型随机判断。
              </p>
            </div>

            <!-- Advanced Mode Settings -->
            <div class="space-y-10 animate-fade-in">
              
              <!-- 1. Analysis Framework -->
              <div>
                <h3 class="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> 推荐配置：主分析框架
                </h3>
                <div class="grid grid-cols-4 gap-4">
                  <button 
                    v-for="framework in frameworks" 
                    :key="framework.id"
                    @click="toggleFramework(framework.id)"
                    class="p-4 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group h-28 flex flex-col justify-between"
                    :class="selectedFrameworks.includes(framework.id) ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'hover:border-[#444]'"
                  >
                    <div class="flex justify-between items-start">
                      <component :is="framework.icon" class="w-6 h-6 text-gray-600 group-hover:text-cyan-400 transition-colors" :class="selectedFrameworks.includes(framework.id) ? 'text-cyan-400' : ''" />
                      <div class="w-3 h-3 border border-[#333] rounded-[1px] flex items-center justify-center" :class="selectedFrameworks.includes(framework.id) ? 'bg-cyan-500 border-cyan-500' : ''">
                        <svg v-if="selectedFrameworks.includes(framework.id)" class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm font-bold text-white mb-1">{{ framework.title }}</div>
                      <div class="text-[10px] text-gray-500 leading-tight">{{ framework.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- 2. Investment Period -->
              <div>
                <h3 class="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 投资周期
                </h3>
                <div class="grid grid-cols-5 gap-4">
                  <button 
                    v-for="period in periods" 
                    :key="period.id"
                    @click="selectedPeriod = period.id"
                    class="p-4 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group h-24 flex flex-col justify-between"
                    :class="selectedPeriod === period.id ? 'border-blue-500 bg-blue-900/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50' : 'hover:border-[#444]'"
                  >
                    <component :is="period.icon" class="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors" :class="selectedPeriod === period.id ? 'text-blue-400' : ''" />
                    <div>
                      <div class="text-sm font-bold text-white mb-0.5">{{ period.title }}</div>
                      <div class="text-[10px] text-gray-500 font-mono" :class="selectedPeriod === period.id ? 'text-blue-200/70' : ''">{{ period.desc }}</div>
                    </div>
                    
                    <!-- Active Indicator Corner -->
                    <div v-if="selectedPeriod === period.id" class="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-blue-500"></div>
                  </button>
                </div>
              </div>

              <!-- 3. Risk Appetite -->
              <div>
                <h3 class="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> 风险偏好
                </h3>
                <div class="grid grid-cols-5 gap-4">
                  <button 
                    v-for="risk in risks" 
                    :key="risk.id"
                    @click="selectedRisk = risk.id"
                    class="p-4 bg-[#111] border border-[#222] rounded-sm hover:bg-[#161616] transition-all text-left relative group h-24 flex flex-col justify-between"
                    :class="selectedRisk === risk.id ? 'border-orange-500 bg-orange-900/20 shadow-[0_0_20px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50' : 'hover:border-[#444]'"
                  >
                    <component :is="risk.icon" class="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-colors" :class="selectedRisk === risk.id ? 'text-orange-400' : ''" />
                    <div>
                      <div class="text-sm font-bold text-white mb-0.5">{{ risk.title }}</div>
                      <div class="text-[10px] text-gray-500" :class="selectedRisk === risk.id ? 'text-orange-200/70' : ''">{{ risk.desc }}</div>
                    </div>
                    
                    <!-- Active Indicator Corner -->
                    <div v-if="selectedRisk === risk.id" class="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-transparent border-r-orange-500"></div>

                    <!-- Progress Bar Visual -->
                    <div v-if="risk.id !== 'auto'" class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 opacity-20 w-full"></div>
                    <div v-if="risk.id !== 'auto'" class="absolute bottom-0 left-0 h-0.5 bg-orange-500" :style="{ width: risk.intensity + '%', opacity: selectedRisk === risk.id ? 1 : 0 }"></div>
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
      <div v-else-if="activeTab === 'mystrategy'" class="flex-1 flex gap-6 min-h-0 mt-4 pb-24 animate-fade-in">
        <!-- Left Sidebar: Collections -->
        <div class="w-64 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
          <div class="p-4 border-b border-[#222]">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Collections</h3>
          </div>
          <div class="flex-1 overflow-y-auto custom-scrollbar py-2">
            <button 
              v-for="col in strategyCollections" 
              :key="col.id"
              @click="selectedCollection = col.id"
              class="w-full flex items-center justify-between px-4 py-3 border-l-2 transition-all group relative"
              :class="selectedCollection === col.id ? 'bg-[#111] border-cyan-500 text-cyan-400' : 'border-transparent text-gray-400 hover:bg-[#111] hover:text-gray-200'"
            >
              <div class="flex items-center gap-3">
                <component :is="col.icon" class="w-4 h-4" :class="selectedCollection === col.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'" />
                <span class="text-sm font-medium">{{ col.label }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono" :class="selectedCollection === col.id ? 'text-cyan-500' : 'text-gray-600'">{{ col.count }}</span>
                <!-- Delete Button for Custom Groups -->
                <div 
                  v-if="!['all', 'official', 'my', 'plans'].includes(col.id)" 
                  @click.stop="promptDeleteGroup(col)" 
                  class="w-4 h-4 flex items-center justify-center rounded hover:bg-red-900/30 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                   <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              </div>
            </button>

            <!-- New Group Input -->
            <div v-if="isCreatingGroup" class="px-4 py-2">
              <div class="flex items-center gap-3 px-4 py-3 border border-cyan-500/50 bg-[#111] rounded">
                <component :is="IconBriefcase" class="w-4 h-4 text-cyan-400" />
                <input 
                  ref="newGroupInputRef"
                  v-model="newGroupName"
                  @keyup.enter="confirmCreateGroup"
                  @keyup.esc="cancelCreateGroup"
                  @blur="cancelCreateGroup" 
                  type="text" 
                  class="bg-transparent border-none text-sm text-white focus:outline-none w-full font-medium placeholder-gray-600"
                  placeholder="Enter name..."
                />
              </div>
            </div>
          </div>
          
          <!-- Add Group Button -->
          <div v-if="!isCreatingGroup" class="p-4 border-t border-[#222]">
            <button 
              @click="startCreateGroup" 
              class="w-full py-2 border border-[#333] rounded text-xs font-bold text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              New Group
            </button>
          </div>
        </div>

        <!-- Right Content: Strategy List -->
        <div class="flex-1 flex flex-col bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
          <!-- Header -->
          <div class="p-4 border-b border-[#222] flex justify-between items-center bg-[#0f0f0f] h-[73px]">
            
            <!-- Normal Header Content -->
            <div v-if="selectedStrategies.length === 0" class="flex justify-between items-center w-full animate-fade-in">
              <div>
                <h2 class="text-lg font-bold text-white">{{ currentCollectionName }}</h2>
                <p class="text-xs text-gray-500 font-mono">{{ displayedStrategies.length }} strategies found</p>
              </div>
              <div class="flex items-center gap-3">
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

            <!-- Bulk Action Header -->
            <div v-else class="flex justify-between items-center w-full bg-[#1a1a1a] -m-4 p-4 animate-fade-in h-[73px] relative z-20">
              <div class="flex items-center gap-4">
                <span class="text-sm font-bold text-white">{{ selectedStrategies.length }} Selected</span>
                <button @click="selectedStrategies = []" class="text-xs text-gray-500 hover:text-white">Cancel</button>
              </div>
              
              <div class="flex items-center gap-3">
                <!-- Regenerate Button -->
                <button 
                  @click="handleRegenerateSelected"
                  class="flex items-center gap-2 px-4 py-2 bg-emerald-900/20 border border-emerald-500/50 text-emerald-400 rounded text-xs font-bold uppercase tracking-wider hover:bg-emerald-900/40 transition-all"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  Regenerate
                </button>

                <div class="relative">
                  <button 
                    @click="showMoveMenu = !showMoveMenu"
                    class="flex items-center gap-2 px-4 py-2 bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 rounded text-xs font-bold uppercase tracking-wider hover:bg-cyan-900/40 transition-all"
                  >
                    <component :is="IconBriefcase" class="w-4 h-4" />
                    Move to Group
                    <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                <div v-if="showMoveMenu" class="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded shadow-xl z-50 overflow-hidden">
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
                <div v-if="showMoveMenu" class="fixed inset-0 z-40" @click="showMoveMenu = false"></div>
              </div>
              </div>
            </div>
          </div>

          <!-- Table -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <table class="w-full text-left border-collapse">
              <thead class="bg-[#0a0a0a] sticky top-0 z-10">
                <tr>
                  <th class="px-6 py-3 border-b border-[#222] w-10">
                    <div 
                      @click="toggleSelectAllStrategies" 
                      class="w-4 h-4 border border-[#444] rounded-[2px] flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors" 
                      :class="isAllStrategiesSelected ? 'bg-cyan-500 border-cyan-500' : ''"
                    >
                      <svg v-if="isAllStrategiesSelected" class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </th>
                  <th @click="handleSort('symbol')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Ticker
                      <span v-if="strategySortField === 'symbol'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('stockName')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Strategy
                      <span v-if="strategySortField === 'stockName'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('direction')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Direction
                      <span v-if="strategySortField === 'direction'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('grade')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Grade
                      <span v-if="strategySortField === 'grade'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('horizon')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Horizon
                      <span v-if="strategySortField === 'horizon'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('model')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Model
                      <span v-if="strategySortField === 'model'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('source')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Source
                      <span v-if="strategySortField === 'source'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('generatedAt')" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-[#222] cursor-pointer hover:text-white transition-colors select-none">
                    <div class="flex items-center gap-1">
                      Created
                      <span v-if="strategySortField === 'generatedAt'" class="text-cyan-500">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#111]">
                <tr 
                  v-for="strategy in displayedStrategies" 
                  :key="strategy.id" 
                  @click="openViewModal(strategy)"
                  class="hover:bg-[#161616] transition-colors group relative cursor-pointer"
                >
                  <td class="px-6 py-4 whitespace-nowrap relative z-10">
                    <div 
                      @click.stop="toggleStrategySelection(strategy.id)" 
                      class="w-4 h-4 border border-[#444] rounded-[2px] flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors" 
                      :class="selectedStrategies.includes(strategy.id) ? 'bg-cyan-500 border-cyan-500' : ''"
                    >
                      <svg v-if="selectedStrategies.includes(strategy.id)" class="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                      <span class="font-mono font-bold text-white">{{ strategy.symbol }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center justify-between gap-4">
                      <div class="text-sm text-gray-300">{{ strategy.stockName }}</div>
                      <!-- Hover Hint -->
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <span class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border border-cyan-500/30 px-2 py-1 rounded bg-[#0a0a0a]/90 whitespace-nowrap shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-sm">
                          Click to View
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider border"
                      :class="strategy.direction === 'LONG' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-900/10' : 'text-rose-400 border-rose-500/30 bg-rose-900/10'"
                    >
                      {{ strategy.direction }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div 
                      class="w-6 h-6 flex items-center justify-center rounded-sm font-bold text-xs border"
                      :class="{
                        'border-emerald-500/30 bg-emerald-900/10 text-emerald-400': strategy.grade === 'A',
                        'border-blue-500/30 bg-blue-900/10 text-blue-400': strategy.grade === 'B',
                        'border-yellow-500/30 bg-yellow-900/10 text-yellow-400': strategy.grade === 'C'
                      }"
                    >
                      {{ strategy.grade }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xs text-gray-500 font-mono">{{ strategy.horizon }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-xs font-mono text-cyan-400/80 border border-cyan-900/30 bg-cyan-900/10 px-1.5 py-0.5 rounded">{{ strategy.model || 'Gemini 1.5 Pro' }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-xs text-gray-400">{{ strategy.source }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-xs text-gray-500 font-mono">{{ new Date(strategy.generatedAt).toLocaleDateString() }}</div>
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
            <TransitionGroup 
              :name="listTransitionName" 
              tag="div" 
              class="flex-1 overflow-y-auto custom-scrollbar p-3 relative"
              :class="completedViewMode === 'card' ? 'grid grid-cols-3 gap-3 content-start' : 'space-y-3'"
            >
              <div 
                v-for="task in completedTasks" 
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
                    <button @click.stop="openViewModal(task)" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded shadow-lg transform scale-90 group-hover:scale-100 transition-all">
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
                      <button @click.stop="openViewModal(task)" class="p-1 bg-[#222] hover:bg-[#333] text-gray-400 hover:text-white rounded-sm border border-[#333] opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                      </button>
                   </div>
                </div>
              </div>
            </TransitionGroup>
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

      <!-- View Modal -->
      <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeViewModal">
        <div class="bg-[#1a1a1a] rounded-2xl border border-[#333] w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
          
          <!-- Modal Header -->
          <div class="px-8 py-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]/95 backdrop-blur-xl z-10 shrink-0">
            <div class="flex items-center gap-4">
              <h2 class="text-xl font-bold text-white">{{ selectedEvent.title }}</h2>
              <span class="text-xs font-bold px-2.5 py-1 rounded border uppercase tracking-wider bg-green-900/30 text-green-400 border-green-800">
                AI Generated
              </span>
              <span class="text-xs text-gray-500 font-mono">{{ selectedEvent.time }}</span>
            </div>
            <button @click="closeViewModal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-all">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="flex flex-1 overflow-hidden">
            <!-- Left: AI Chat Placeholder -->
            <div class="w-[320px] flex flex-col border-r border-[#2a2a2a] bg-[#111] shrink-0 hidden lg:flex">
               <div class="flex-1 flex items-center justify-center text-gray-500 text-sm">AI Assistant Placeholder</div>
            </div>

            <!-- Middle: Content -->
            <div class="flex-1 overflow-y-auto p-10 scrollbar-thin bg-[#0f0f0f] border-r border-[#2a2a2a]">
               <h3 class="text-2xl font-bold text-white mb-6">Analysis Report</h3>
               <p class="text-gray-300 leading-relaxed">This is a preview of the generated report content...</p>
            </div>

            <!-- Right: Meta -->
            <div class="w-[350px] overflow-y-auto p-8 scrollbar-thin bg-[#0f0f0f] shrink-0 hidden xl:block">
               <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Details</h4>
               <p class="text-gray-300 text-sm">Additional metadata...</p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, h, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'


// Icons components (Simple SVG wrappers)
const IconTarget = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z' }), h('path', { d: 'M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z' })])
const IconChart = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M3 3v18h18' }), h('path', { d: 'M18 9l-5 5-4-4-3 3' })])
const IconDocument = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('path', { d: 'M14 2v6h6' }), h('path', { d: 'M16 13H8' }), h('path', { d: 'M16 17H8' }), h('path', { d: 'M10 9H8' })])
const IconMath = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('rect', { x: '4', y: '4', width: '16', height: '16', rx: '2' }), h('path', { d: 'M8 8h.01' }), h('path', { d: 'M12 8h.01' }), h('path', { d: 'M16 8h.01' }), h('path', { d: 'M8 12h.01' }), h('path', { d: 'M12 12h.01' }), h('path', { d: 'M16 12h.01' }), h('path', { d: 'M8 16h.01' }), h('path', { d: 'M12 16h.01' }), h('path', { d: 'M16 16h.01' })])
const IconLightning = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })])
const IconBriefcase = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('rect', { x: '2', y: '7', width: '20', height: '14', rx: '2', ry: '2' }), h('path', { d: 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' })])
const IconTrending = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M23 6l-9.5 9.5-5-5L1 18' }), h('path', { d: 'M17 6h6v6' })])
const IconDatabase = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }), h('path', { d: 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3' }), h('path', { d: 'M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5' })])
const IconClock = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('circle', { cx: '12', cy: '12', r: '10' }), h('path', { d: 'M12 6v6l4 2' })])
const IconCalendar = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('rect', { x: '3', y: '4', width: '18', height: '18', rx: '2', ry: '2' }), h('path', { d: 'M16 2v4' }), h('path', { d: 'M8 2v4' }), h('path', { d: 'M3 10h18' })])
const IconShield = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })])
const IconScale = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 3v19' }), h('path', { d: 'M5 8h14' }), h('path', { d: 'M2 14h6' }), h('path', { d: 'M16 14h6' })])
const IconFire = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3a7 7 0 0 0 3 3.8z' })])
const IconSkull = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2c-4.4 0-8 3.6-8 8 0 2.8 1.5 5.3 3.8 6.7l.2 3.3h8l.2-3.3c2.3-1.4 3.8-3.9 3.8-6.7 0-4.4-3.6-8-8-8z' }), h('path', { d: 'M9 10h.01' }), h('path', { d: 'M15 10h.01' }), h('path', { d: 'M10 14h4' })])
const IconAuto = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' })])


const router = useRouter()
const route = useRoute()

const activeTab = ref('generate')
const tabs = [
  { id: 'generate', label: '生成策略' },
  { id: 'queue', label: '生成队列' },
  { id: 'mystrategy', label: '查看我的' }
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
    selectedStocks.value.push(stock.symbol)
  } else {
    selectedStocks.value.splice(index, 1)
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

  // Switch to queue tab
  switchTab('queue')

  // Clear highlight after 3 seconds
  setTimeout(() => {
    newTasks.forEach(t => {
      t.isNew = false
    })
  }, 3000)
}

// Initialize from URL query
onMounted(() => {
  if (route.query.tab && tabs.some(t => t.id === route.query.tab)) {
    activeTab.value = route.query.tab
  }
})

watch(() => route.query.tab, (newTab) => {
  if (newTab && tabs.some(t => t.id === newTab)) {
    activeTab.value = newTab
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
  { id: 104, type: 'plan', title: 'Retirement Safe Haven', symbol: 'TLT', stockName: 'iShares 20+ Year Treasury Bond', status: 'completed', completedAt: '10:23 AM' },
  { id: 105, type: 'strategy', title: 'High Yield Divs', symbol: 'VYM', stockName: 'Vanguard High Dividend Yield', status: 'completed', completedAt: '09:15 AM' },
  { id: 106, type: 'strategy', title: 'Penny Stock Scanner', symbol: 'IWM', stockName: 'iShares Russell 2000', status: 'completed', completedAt: 'Yesterday' },
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
const totalTasks = computed(() => filteredTasks.value.length)

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

// View Modal Logic
const showViewModal = ref(false)
const selectedEvent = ref({
  title: '',
  time: '',
  desc: '',
  image: '',
  tags: [],
  stocks: []
})

const openViewModal = (task) => {
  const type = task.type || (task.hasExecutionPlan ? 'plan' : 'strategy')
  selectedEvent.value = {
    title: task.title || task.stockName,
    time: task.completedAt || task.generatedAt || 'Just now',
    desc: 'This is a preview of the generated strategy/plan.',
    image: 'https://placehold.co/600x400/1a1a1a/ffffff?text=Strategy+Preview',
    tags: [type.toUpperCase(), 'AI GENERATED'],
    stocks: [{ symbol: task.symbol || 'MOCK', change: 2.5 }]
  }
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
}

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
  
  // Setup Demo Data for Flow Visualization if on queue tab
  if (activeTab.value === 'queue') {
     // Reset/Add some tasks to demonstrate flow
     const demoTasks = [
        { id: 901, type: 'strategy', title: 'AI Momentum Scan', symbol: 'NVDA', stockName: 'NVIDIA', status: 'processing', progress: 70, timeLeft: '10s', statusText: 'Analyzing patterns...', estTime: '1m' },
        { id: 902, type: 'plan', title: 'Portfolio Rebalance', symbol: 'SPY', stockName: 'SPDR S&P 500', status: 'pending', estTime: '2m', isNew: true },
        { id: 903, type: 'strategy', title: 'Crypto Volatility', symbol: 'BTC', stockName: 'Bitcoin', status: 'pending', estTime: '3m' },
     ]
     // Keep existing completed tasks but replace pending/processing with demo ones
     const existingCompleted = tasks.value.filter(t => t.status === 'completed')
     tasks.value = [...demoTasks, ...existingCompleted]
     
     // Clear highlight for demo tasks after a delay
     setTimeout(() => {
       tasks.value.forEach(t => { if(t.id === 902) t.isNew = false })
     }, 3000)
  }
  
  progressInterval = setInterval(() => {
    tasks.value.forEach(task => {
      if (task.status === 'processing') {
        if (task.progress < 100) {
          // Speed up for demo
          task.progress += Math.random() * 2 + 1
          
          if (task.progress >= 100) {
            task.progress = 100
            task.status = 'completed'
            task.completedAt = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
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
const selectedCollection = ref('all')
const strategySearchQuery = ref('')
const strategyFilterOption = ref('all') // 'all', 'long', 'short'
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

// Strategy Selection & Management
const selectedStrategies = ref([])
const showMoveMenu = ref(false)

const isAllStrategiesSelected = computed(() => {
  return displayedStrategies.value.length > 0 && selectedStrategies.value.length === displayedStrategies.value.length
})

const toggleSelectAllStrategies = () => {
  if (isAllStrategiesSelected.value) {
    selectedStrategies.value = []
  } else {
    selectedStrategies.value = displayedStrategies.value.map(s => s.id)
  }
}

const toggleStrategySelection = (id) => {
  const index = selectedStrategies.value.indexOf(id)
  if (index === -1) {
    selectedStrategies.value.push(id)
  } else {
    selectedStrategies.value.splice(index, 1)
  }
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
  
  selectedStrategies.value = []
  showMoveMenu.value = false
}

const handleRegenerateSelected = () => {
  if (selectedStrategies.value.length === 0) return

  const newTasks = []
  
  // Find strategy objects
  const strategiesToRegen = allSavedStrategies.value.filter(s => selectedStrategies.value.includes(s.id))
  
  // Handle found strategies
  strategiesToRegen.forEach(strat => {
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

  selectedStrategies.value = []
  
  // Force tab switch
  activeTab.value = 'queue'
  // Use router if available, but activeTab change should be enough for v-if
  if (typeof router !== 'undefined') {
    router.push({ query: { ...route.query, tab: 'queue' } })
  }
  
  // Clear highlight
  setTimeout(() => {
    newTasks.forEach(t => {
      t.isNew = false
    })
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
    alert('Group already exists')
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

  const preset = [
    { id: 'all', label: 'All Strategies', count: allCount, icon: IconBriefcase },
    { id: 'official', label: 'Official Reports', count: officialCount, icon: IconDocument },
    { id: 'my', label: 'My Strategies', count: myCount, icon: IconTarget },
    { id: 'plans', label: 'With Execution Plans', count: planCount, icon: IconLightning },
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
  } else {
    // Custom Collection
    strategies = strategies.filter(s => s.categoryId === selectedCollection.value)
  }

  // 2. Search
  if (strategySearchQuery.value) {
    const q = strategySearchQuery.value.toLowerCase()
    strategies = strategies.filter(s => 
      s.symbol.toLowerCase().includes(q) || 
      s.stockName.toLowerCase().includes(q)
    )
  }

  // 3. Filter Option
  if (strategyFilterOption.value !== 'all') {
    strategies = strategies.filter(s => s.direction.toLowerCase() === strategyFilterOption.value)
  }

  // 4. Sort
  strategies.sort((a, b) => {
    let valA = a[strategySortField.value]
    let valB = b[strategySortField.value]
    
    // Handle special fields
    if (strategySortField.value === 'generatedAt') {
      valA = new Date(valA).getTime()
      valB = new Date(valB).getTime()
    } else if (typeof valA === 'string') {
      valA = valA.toLowerCase()
      valB = valB.toLowerCase()
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
      hasExecutionPlan: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech'
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
      isArchived: false,
      generatedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech'
    },
    {
      id: 'demo-6',
      symbol: 'META',
      stockName: 'Meta Platforms, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Short-term (1-3 months)',
      source: 'My Strategy',
      hasExecutionPlan: false,
      isWatchlist: false,
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
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'E-commerce',
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
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Semiconductors',
      categoryId: 'semi'
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
      generatedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Streaming',
      categoryId: 'streaming'
    },
    {
      id: 'demo-10',
      symbol: 'BA',
      stockName: 'Boeing Company',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Long-term (6+ months)',
      source: 'My Strategy',
      hasExecutionPlan: false,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Industrial',
      categoryId: 'industrial'
    }
  ]
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
</style>
