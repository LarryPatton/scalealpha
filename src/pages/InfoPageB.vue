<template>
  <div class="bg-[#0f0f0f] min-h-screen flex flex-col pb-24">
    <!-- 1. Global Navbar -->
    <Navbar />

    <!-- 2. Main Content Area -->
    <main class="flex-grow flex flex-col p-4 lg:p-6 relative">
      
      <!-- Hero Section (Always visible for all tabs) -->
      <div class="mb-8 text-center py-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Discover Your Next <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Winning Trade</span>
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg">
          AI-powered insights to help you find high-conviction opportunities in seconds.
        </p>
      </div>

      <!-- Universal Filter Bar -->
      <div class="sticky top-16 z-40 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#333] px-4 lg:px-8 py-3 mb-6 flex flex-wrap items-center justify-between gap-4 transition-all duration-300">
        <!-- Left: Filter & Switcher -->
        <div class="flex items-center gap-3">
          <!-- Content Switcher -->
          <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-1 flex items-center">
            <button 
              @click="contentFilter = 'recommended'"
              class="px-3 py-1.5 rounded-md text-xs font-bold transition-all"
              :class="contentFilter === 'recommended' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'"
            >
              Recommended
            </button>
            <button 
              @click="contentFilter = 'following'"
              class="px-3 py-1.5 rounded-md text-xs font-bold transition-all"
              :class="contentFilter === 'following' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-300'"
            >
              Following
            </button>
          </div>

          <!-- Filter Button -->
          <button 
            v-if="activeTab !== 'themes'"
            @click="showFilterModal = true"
            class="h-9 w-9 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
        </div>

        <!-- Right: View Controls -->
        <div class="flex items-center gap-3">
          <!-- Sort Buttons (Themes only) -->
          <div v-if="activeTab === 'themes'" class="flex items-center gap-2">
            <button 
              @click="setSort('change')"
              class="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors"
              :class="sortBy === 'change' ? 'bg-[#333] text-white border-gray-500' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-gray-600'"
            >
              <span>涨跌幅排序</span>
              <svg v-if="sortBy === 'change'" class="w-3 h-3 transition-transform duration-300" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <button 
              @click="setSort('time')"
              class="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors"
              :class="sortBy === 'time' ? 'bg-[#333] text-white border-gray-500' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-gray-600'"
            >
              <span>时间排序</span>
              <svg v-if="sortBy === 'time'" class="w-3 h-3 transition-transform duration-300" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <!-- View Switcher (Opportunities only) -->
          <div v-if="['opportunities'].includes(activeTab)" class="bg-[#1a1a1a] border border-[#333] rounded-lg p-1 flex items-center">
            <button 
              @click="viewMode = 'card'"
              class="p-1.5 rounded-md transition-all"
              :class="viewMode === 'card' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'"
              title="Card View"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
            <button 
              @click="viewMode = 'list'"
              class="p-1.5 rounded-md transition-all"
              :class="viewMode === 'list' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'"
              title="List View"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tab: Opportunities (Waterfall) -->
      <div v-if="activeTab === 'opportunities'" class="w-full px-4 lg:px-8">
        <div 
          :class="viewMode === 'card' ? 'grid gap-6' : 'flex flex-col space-y-4'"
          :style="viewMode === 'card' ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}"
        >
          <!-- Cards (Dark Tech Style) - Only for Card View -->
          <template v-if="viewMode === 'card'">
            <div 
              v-for="(opp, index) in filteredOpportunities" 
              :key="opp.id + '-' + index" 
              @click="openStrategyModal(opp)"
              class="bg-slate-900 rounded-xl shadow-lg p-6 text-center text-white border border-slate-800 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <!-- Background decoration -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

              <div class="relative z-10">
                <div class="flex justify-center mb-4">
                  <span class="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider">{{ opp.strategy }}</span>
                </div>
                
                <h3 class="text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 group-hover:from-blue-400 group-hover:to-blue-200 transition-all">{{ opp.symbol }}</h3>
                <p class="text-xs text-slate-400 mb-6 font-mono line-clamp-1">{{ opp.title }}</p>
                
                <div class="grid grid-cols-2 gap-4 mb-6 border-y border-slate-800 py-4">
                  <div class="text-center border-r border-slate-800">
                    <div class="text-2xl font-bold text-white">A+</div>
                    <div class="text-[10px] text-slate-500 uppercase tracking-wider">Rating</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold" :class="opp.type === 'Long' ? 'text-emerald-400' : 'text-red-400'">{{ opp.type.toUpperCase() }}</div>
                    <div class="text-[10px] text-slate-500 uppercase tracking-wider">Direction</div>
                  </div>
                </div>

                <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1-10 DAYS</span>
                  <span>GEMINI</span>
                  <span :class="opp.risk === 'High' ? 'text-red-400' : (opp.risk === 'Med' ? 'text-yellow-400' : 'text-green-400')">{{ opp.risk.toUpperCase() }} RISK</span>
                </div>
              </div>
            </div>
          </template>

          <!-- List View (Compact Data Row - Dark Mode Adapted) -->
          <template v-else>
            <div 
              v-for="(opp, index) in filteredOpportunities" 
              :key="opp.id + '-' + index" 
              @click="openStrategyModal(opp)"
              class="bg-[#1a1a1a] rounded-lg border border-[#333] p-4 flex items-center gap-4 hover:border-blue-500 transition-colors cursor-pointer group"
            >
              <!-- Status Bar -->
              <div class="w-1 h-10 rounded-full" :class="opp.type === 'Long' ? 'bg-emerald-500' : 'bg-red-500'"></div>
              
              <!-- Symbol -->
              <div class="w-16 flex-shrink-0">
                <div class="font-bold text-white">{{ opp.symbol }}</div>
                <div class="text-[10px] text-gray-500">US Stock</div>
              </div>

              <!-- Main Info -->
              <div class="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                <div class="col-span-5">
                  <div class="font-medium text-gray-200 truncate text-sm group-hover:text-blue-400 transition-colors">{{ opp.title }}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] bg-[#333] text-gray-400 px-1.5 rounded">{{ opp.strategy }}</span>
                    <span class="text-[10px] text-gray-500 truncate">{{ opp.tags.join(', ') }}</span>
                  </div>
                </div>
                
                <div class="col-span-2 text-center">
                  <div class="text-[10px] text-gray-500 uppercase">Rating</div>
                  <div class="font-bold text-gray-300">A+</div>
                </div>
                
                <!-- Duration (Replaces Return) -->
                <div class="col-span-2 text-center">
                  <div class="text-[10px] text-gray-500 uppercase">Duration</div>
                  <div class="font-bold text-gray-300">1-10 DAYS</div>
                </div>

                <div class="col-span-3 flex justify-end items-center gap-3">
                   <!-- Model (Replaces Score) -->
                   <div class="text-right">
                      <div class="text-[10px] text-gray-500 uppercase">Model</div>
                      <div class="font-bold text-blue-400">GEMINI</div>
                   </div>
                   <div class="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center text-gray-500 group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-colors">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                   </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Loading Sentinel -->
        <div ref="loadSentinel" class="h-20 flex items-center justify-center mt-8">
          <div v-if="isLoading" class="flex items-center gap-2 text-gray-500">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <span class="text-sm ml-2">Loading more opportunities...</span>
          </div>
        </div>
      </div>
      
      <!-- Tab: Themes (List View - Simplified Attribution Cards) -->
      <div v-else-if="activeTab === 'themes'" class="w-full max-w-7xl mx-auto px-4">
        <div class="space-y-4">
          <div 
            v-for="event in allEvents" 
            :key="event.id" 
            @click="openThemeDetailFromEvent(event)"
            class="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 flex items-center gap-6 hover:border-blue-500/50 hover:bg-[#222] transition-all cursor-pointer group shadow-lg"
          >
            <!-- Left: Title & Desc -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors">{{ event.title }}</h3>
                <span class="text-xs px-2 py-0.5 rounded bg-[#333] text-gray-400 font-mono border border-[#444]">{{ event.time.split(' ')[0] }}</span>
              </div>
              <p class="text-sm text-gray-400 line-clamp-2 leading-relaxed">{{ event.desc }}</p>
            </div>

            <!-- Middle: Affected Stocks (Attribution Style) -->
            <div class="flex items-center gap-3 shrink-0">
              <div v-for="stock in event.stocks.slice(0, 3)" :key="stock.symbol" class="flex items-center gap-3 bg-[#151515] p-2 rounded border border-[#333] min-w-[120px]">
                <div class="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333]">
                  {{ stock.symbol[0] }}
                </div>
                <div>
                  <div class="font-bold text-gray-200 text-xs">{{ stock.symbol }}</div>
                  <div class="text-[10px]" :class="stock.change > 0 ? 'text-green-500' : 'text-red-500'">
                    {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                  </div>
                </div>
              </div>
              <span v-if="event.stocks.length > 3" class="text-xs text-gray-500 bg-[#151515] px-2 py-1 rounded border border-[#333] h-8 flex items-center">+{{ event.stocks.length - 3 }}</span>
            </div>

            <!-- Right: Theme Change -->
            <div class="text-right min-w-[100px] pl-6 border-l border-[#333]">
              <div class="text-2xl font-bold font-mono" :class="parseFloat(event.themeChange) > 0 ? 'text-green-500' : 'text-red-500'">
                {{ parseFloat(event.themeChange) > 0 ? '+' : '' }}{{ event.themeChange }}%
              </div>
              <div class="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Theme Change</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: ThemesB (Original Chart & Modal) -->
      <div v-else-if="activeTab === 'themesB'" class="w-full">
        
        <!-- Theme Performance Chart -->
        <div class="mb-8 bg-[#1a1a1a] border border-[#333] rounded-xl p-4 relative">
          <div class="flex justify-between items-center mb-4 px-2">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
              <span class="w-1 h-4 bg-blue-500 rounded-full"></span>
              主题指数走势 (每日涨跌幅)
            </h3>
            <div class="flex gap-2">
              <button 
                v-for="period in ['1M', '3M', '6M', 'YTD']" 
                :key="period"
                class="px-3 py-1 text-xs font-bold rounded-full transition-colors"
                :class="selectedChartPeriod === period ? 'bg-blue-600 text-white' : 'bg-[#333] text-gray-400 hover:text-white'"
                @click="selectedChartPeriod = period"
              >
                {{ period }}
              </button>
            </div>
          </div>
          <div ref="themeChartRef" class="w-full h-[70vh]"></div>
        </div>

        <!-- Theme Cards Removed as requested -->
        <!-- <div ... > ... </div> -->

        <!-- Loading Sentinel -->
        <div ref="loadSentinel" class="h-24 flex items-center justify-center mt-8 w-full">
          <div v-if="isLoading" class="flex items-center gap-2 text-gray-500">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <span class="text-sm ml-2">Loading more themes...</span>
          </div>
        </div>
      </div>

      <!-- Tab: Attribution (Cyberpunk HUD) -->
      <div v-else-if="activeTab === 'attribution'" class="w-full px-8 pb-8">
        <div class="space-y-6">
          <div v-for="event in allAttributionEvents" :key="event.id" class="flex gap-6 items-stretch group">
            <!-- Time Column -->
            <div class="w-24 text-right pt-6 shrink-0">
              <div class="text-2xl font-bold text-white font-mono">{{ event.time.split(' ')[0] }}</div>
              <div class="text-sm text-gray-500 font-mono uppercase">{{ event.time.split(' ')[1] || 'AM' }}</div>
            </div>
            
            <!-- Decoration Line -->
            <div class="w-px bg-[#333] relative group-hover:bg-cyan-500 transition-colors duration-300">
              <div class="absolute top-8 -left-[3px] w-1.5 h-1.5 bg-[#111] border border-cyan-500 rounded-full hidden group-hover:block shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            </div>
            
            <!-- Card -->
            <div class="flex-1 bg-[#151515] border border-[#333] p-1 group-hover:border-cyan-500/50 transition-all relative overflow-hidden shadow-lg">
              <!-- Corner Accents -->
              <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-500 group-hover:border-cyan-500"></div>
              <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-gray-500 group-hover:border-cyan-500"></div>
              <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gray-500 group-hover:border-cyan-500"></div>
              <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-500 group-hover:border-cyan-500"></div>

              <div class="flex h-full">
                <!-- Image (Left) -->
                <div class="w-64 relative overflow-hidden border-r border-[#333] shrink-0">
                  <img :src="event.image" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div class="absolute inset-0 bg-cyan-900/10 mix-blend-overlay"></div>
                  <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 class="font-bold text-white text-xl leading-tight">{{ event.title }}</h3>
                  </div>
                </div>

                <!-- Content (Middle) - Static -->
                <div class="flex-1 p-6 flex flex-col justify-center">
                  <div class="flex items-center gap-4 mb-3">
                    <h3 class="text-2xl font-bold text-white leading-tight">{{ event.title }}</h3>
                  </div>
                  
                  <p class="text-base text-gray-400 leading-relaxed line-clamp-3 max-w-4xl">{{ event.desc }}</p>
                </div>

                <!-- Stocks List (Right) -->
                <div class="w-80 bg-[#0a0a0a] border-l border-[#333] flex flex-col shrink-0 relative">
                  <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2" style="max-height: 200px;">
                    <div 
                      v-for="stock in event.stocks" 
                      :key="stock.symbol" 
                      @click.stop="openEventModal(event)"
                      class="bg-[#1a1a1a] border border-[#333] rounded p-2 flex items-center gap-3 hover:border-blue-500/50 hover:bg-[#222] transition-all cursor-pointer group/stock"
                    >
                      <!-- Icon -->
                      <div class="w-8 h-8 rounded bg-[#252525] flex items-center justify-center text-xs font-bold text-gray-400 border border-[#333] group-hover/stock:text-white group-hover/stock:border-blue-500 transition-colors shrink-0">
                        {{ stock.symbol[0] }}
                      </div>
                      
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-bold text-white leading-none mb-1 truncate group-hover/stock:text-blue-400 transition-colors">{{ stock.symbol }}</div>
                        <div class="text-[10px] text-gray-500 truncate">{{ stock.name }}</div>
                      </div>
                      
                      <!-- Sentiment Label -->
                      <div class="text-right shrink-0 flex flex-col items-end gap-1">
                        <span 
                          class="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider"
                          :class="stock.change > 0 ? 'bg-green-900/30 text-green-400 border-green-800' : (stock.change < 0 ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-gray-800 text-gray-400 border-gray-700')"
                        >
                          {{ stock.change > 0 ? '利好' : (stock.change < 0 ? '利空' : '中性') }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Scroll Hint Gradient -->
                  <div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading Sentinel -->
        <div ref="loadSentinel" class="h-20 flex items-center justify-center mt-8">
          <div v-if="isLoading" class="flex items-center gap-2 text-gray-500">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <span class="text-sm ml-2">Loading more events...</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Floating Tabs (Bottom Center) -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#333] rounded-full p-1.5 shadow-2xl flex items-center gap-1">
        <button 
          v-for="tab in tabs.filter(t => t.id !== 'themesB')" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
          :class="activeTab === tab.id ? 'bg-white text-black shadow-lg scale-105' : 'text-gray-400 hover:text-white hover:bg-[#333]'"
        >
          <span>{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- (Removed Bottom Right Floating Buttons) -->

    <!-- 5. Grid Control (Bottom Left) -->
    <div v-if="['opportunities', 'themes'].includes(activeTab)" class="fixed bottom-8 left-8 z-50 flex items-center transition-all duration-300">
      <!-- Expanded State -->
      <div 
        v-if="isGridControlExpanded"
        class="bg-white text-black rounded-full h-12 px-1 flex items-center shadow-xl"
      >
        <button @click="adjustGrid(-1)" class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full text-xl font-bold transition-colors pb-1">−</button>
        <div class="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors" @click="isGridControlExpanded = false">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </div>
        <button @click="adjustGrid(1)" class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full text-xl font-bold transition-colors pb-1">+</button>
      </div>

      <!-- Collapsed State -->
      <button 
        v-else
        @click="isGridControlExpanded = true"
        class="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
      </button>
    </div>

    <!-- 6. Back to Top (Moved up) -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-24 left-9 z-40 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-black transition-all"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
    </button>

    <!-- 6. Filter Modal Overlay -->
    <transition name="fade">
      <div v-if="showFilterModal" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showFilterModal = false"></div>
        
        <!-- Sidebar Panel -->
        <div class="relative w-96 h-full bg-[#1a1a1a] border-l border-[#333] shadow-2xl transform transition-transform duration-300 flex flex-col">
          <!-- Header -->
          <div class="p-6 border-b border-[#333] flex justify-between items-center">
            <h3 class="text-lg font-bold text-white">Filters</h3>
            <button @click="showFilterModal = false" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="flex-grow p-6 overflow-y-auto space-y-8">
            
            <!-- Default Filters (Opportunities & Themes) -->
            <template v-if="activeTab !== 'attribution'">
              <!-- 1. Sources (Multi-select) -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">策略生成来源 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="opt in filterOptions.sources" 
                    :key="opt.id"
                    @click="toggleFilterSource(opt.id)"
                    class="px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center gap-2"
                    :class="filters.sources.includes(opt.id) 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    <span>{{ opt.icon }}</span>
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <!-- 2. Direction -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">策略方向</h4>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="dir in filterOptions.directions" 
                    :key="dir"
                    @click="filters.direction = filters.direction === dir ? '' : dir"
                    class="py-2 rounded-lg text-xs font-bold border transition-all text-center"
                    :class="filters.direction === dir 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    {{ dir }}
                  </button>
                </div>
              </div>

              <!-- 3. Duration -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">持续时间</h4>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="dur in filterOptions.durations" 
                    :key="dur"
                    @click="filters.duration = filters.duration === dur ? '' : dur"
                    class="py-2 rounded-lg text-xs font-medium border transition-all text-center"
                    :class="filters.duration === dur 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    {{ dur }}
                  </button>
                </div>
              </div>

              <!-- 4. Grade -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">策略评级</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="grade in filterOptions.grades" 
                    :key="grade"
                    @click="filters.grade = filters.grade === grade ? '' : grade"
                    class="w-10 h-10 rounded-lg text-xs font-bold border transition-all flex items-center justify-center"
                    :class="filters.grade === grade 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    {{ grade }}
                  </button>
                </div>
              </div>
            </template>

            <!-- Attribution Filters -->
            <template v-else>
              <!-- 1. Stock Input (Multi-select) -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">输入股票 (多选)</h4>
                <div class="flex flex-wrap gap-2 mb-3" v-if="attributionFilters.stocks.length > 0">
                  <span 
                    v-for="(stock, idx) in attributionFilters.stocks" 
                    :key="idx"
                    class="px-2 py-1 rounded bg-blue-900/30 border border-blue-500/50 text-blue-400 text-xs flex items-center gap-2"
                  >
                    {{ stock }}
                    <button @click="removeAttributionStock(idx)" class="hover:text-white">×</button>
                  </span>
                </div>
                <div class="relative">
                  <input 
                    v-model="attributionStockInput"
                    @keyup.enter="addAttributionStock"
                    type="text" 
                    placeholder="输入代码并回车 (e.g. NVDA)" 
                    class="w-full bg-[#222] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button 
                    @click="addAttributionStock"
                    class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    :disabled="!attributionStockInput"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>

              <!-- 2. Event Time Range -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">事件时间范围</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="range in ['Last 24h', 'Last 3 Days', 'Last Week', 'Last Month']" 
                    :key="range"
                    @click="attributionFilters.timeRange = range"
                    class="py-2 rounded-lg text-xs font-medium border transition-all text-center"
                    :class="attributionFilters.timeRange === range 
                      ? 'bg-blue-600 border-blue-500 text-white' 
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    {{ range }}
                  </button>
                </div>
              </div>

              <!-- 3. Event Sentiment -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">事件情绪 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="sentiment in ['Bullish', 'Bearish', 'Neutral']" 
                    :key="sentiment"
                    @click="toggleAttributionSentiment(sentiment)"
                    class="px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center gap-2"
                    :class="attributionFilters.sentiments.includes(sentiment) 
                      ? (sentiment === 'Bullish' ? 'bg-green-900/50 border-green-500 text-green-400' : (sentiment === 'Bearish' ? 'bg-red-900/50 border-red-500 text-red-400' : 'bg-gray-700 border-gray-500 text-gray-300'))
                      : 'bg-[#222] border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                  >
                    {{ sentiment }}
                  </button>
                </div>
              </div>
            </template>

          </div>
          
          <!-- Footer -->
          <div class="p-6 border-t border-[#333]">
            <button class="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Event Detail Modal (Attribution) -->
    <div v-if="showEventModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeEventModal">
      <div class="bg-[#1a1a1a] rounded-2xl border border-[#333] w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in">
        
        <!-- Modal Header -->
        <div class="px-8 py-5 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]/95 backdrop-blur-xl z-10 shrink-0">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-white">{{ selectedEvent.title }}</h2>
            <span 
              class="text-xs font-bold px-2.5 py-1 rounded border uppercase tracking-wider"
              :class="selectedEvent.stocks[0].change >= 0 ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-red-900/30 text-red-400 border-red-800'"
            >
              {{ selectedEvent.stocks[0].change >= 0 ? 'Bullish' : 'Bearish' }}
            </span>
            <span class="text-xs text-gray-500 font-mono">{{ selectedEvent.time }}</span>
          </div>
          <button @click="closeEventModal" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-all">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Left: AI Chat (320px) -->
          <div class="w-[320px] flex flex-col border-r border-[#2a2a2a] bg-[#111] shrink-0 hidden lg:flex">
            <div class="px-4 py-3 border-b border-[#2a2a2a] bg-[#1a1a1a]">
               <h3 class="text-sm font-medium text-gray-300 flex items-center gap-2"><i class="fas fa-robot text-blue-500"></i> 事件分析助手</h3>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
               <!-- Welcome State -->
               <div class="flex flex-col h-full">
                  <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <i class="fas fa-bolt text-blue-400 text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-white font-medium mb-1">ScaleAlpha Event AI</h4>
                      <p class="text-xs text-gray-500 leading-relaxed px-2">
                        我是您的专属事件分析助手。<br>
                        已为您深度解析 <span class="text-blue-400">{{ selectedEvent.title }}</span> 的市场影响。
                      </p>
                    </div>
                  </div>
                  
                  <!-- Quick Prompts -->
                  <div class="space-y-2 pb-4">
                    <p class="text-xs text-gray-500 px-1 mb-2">您可以问我：</p>
                    <button class="w-full text-left px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] hover:border-blue-500/30 border border-[#2a2a2a] rounded-lg text-xs text-gray-300 transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-blue-900/10">
                      <span class="group-hover:text-blue-400 transition-colors">该事件对同板块其他股票有何影响？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-500 transition-all duration-300"></i>
                    </button>
                    <button class="w-full text-left px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] hover:border-blue-500/30 border border-[#2a2a2a] rounded-lg text-xs text-gray-300 transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-blue-900/10">
                      <span class="group-hover:text-blue-400 transition-colors">历史上有哪些相似事件？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-500 transition-all duration-300"></i>
                    </button>
                    <button class="w-full text-left px-3 py-2.5 bg-[#1a1a1a] hover:bg-[#222] hover:border-blue-500/30 border border-[#2a2a2a] rounded-lg text-xs text-gray-300 transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-blue-900/10">
                      <span class="group-hover:text-blue-400 transition-colors">机构对此事件的最新评级变化？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-blue-500 transition-all duration-300"></i>
                    </button>
                  </div>
               </div>
            </div>
            <div class="p-3 bg-[#1a1a1a] border-t border-[#2a2a2a]">
              <div class="relative">
                <input type="text" placeholder="输入问题..." class="w-full bg-[#0f0f0f] text-white rounded-lg pl-3 pr-10 py-2.5 text-sm border border-[#333] focus:outline-none focus:border-blue-500">
                <button class="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500"><i class="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>

          <!-- Middle: Analysis Content (Flex-1) -->
          <div class="flex-1 flex flex-col overflow-hidden bg-[#0f0f0f] border-r border-[#2a2a2a]">
            
            <!-- New Top Bar -->
            <div class="px-8 py-4 border-b border-[#2a2a2a] bg-[#151515] flex justify-between items-center shrink-0">
              <div class="text-lg font-bold text-white flex items-center gap-2 truncate">
                <span class="text-blue-400 truncate max-w-[200px]" :title="selectedEvent.title">{{ selectedEvent.title }}</span>
                <span class="text-gray-500 text-sm">对</span>
                <span class="text-white bg-[#333] px-2 py-0.5 rounded text-sm font-mono">{{ selectedEvent.stocks[0].symbol }}</span>
                <span class="text-gray-500 text-sm">的影响分析</span>
              </div>
              
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
                  @click="addToWatchlist(selectedEvent.stocks[0])"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/30 hover:scale-105 hover:shadow-blue-500/40 border border-blue-500"
                  title="添加到关注"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                  关注 {{ selectedEvent.stocks[0].symbol }}
                </button>
                <button 
                  @click="goToStockDetail(selectedEvent.stocks[0].symbol)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all shadow-lg hover:scale-105 border border-slate-600"
                  title="查看详情"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  {{ selectedEvent.stocks[0].symbol }} 详情
                </button>
              </div>
            </div>

            <div class="flex-1 overflow-y-auto p-10 scrollbar-thin">
              <div class="max-w-5xl mx-auto space-y-12">
              
              <!-- Impact Analysis -->
              <div>
                <h3 class="text-2xl font-bold text-white mb-6">对公司的事件影响分析</h3>
                <div class="text-gray-300 space-y-6 text-base leading-relaxed font-light">
                  <p>
                    该事件对 <span class="text-white font-medium border-b border-white/20 pb-0.5">{{ selectedEvent.stocks[0].symbol }}</span> 构成<span class="text-red-400 font-medium">负面影响</span>。核心在于宏观数据真空导致风险溢价上升。
                  </p>
                  <div class="pl-4 border-l border-[#333]">
                    <h4 class="text-white font-bold mb-2 text-sm uppercase tracking-wider">作用机制</h4>
                    <p>作为高贝塔值的成长型资产，{{ selectedEvent.stocks[0].symbol }} (当前市盈率35.2x) 对利率预期极度敏感。数据的缺失创造了“黑箱效应”，迫使投资者在美联储12月会议前进行防御性定价。</p>
                  </div>
                  <div class="pl-4 border-l border-[#333]">
                    <h4 class="text-white font-bold mb-2 text-sm uppercase tracking-wider">财务路径</h4>
                    <p>虽然不直接影响成分股营收，但信息不确定性增加了隐含的资本成本。期权市场IV期限结构呈现“倒挂”(Backwardation)，表明短期市场压力剧增。</p>
                  </div>
                </div>
              </div>

              <div class="h-px bg-[#222] w-full"></div>

              <!-- Prediction Analysis -->
              <div>
                <h3 class="text-2xl font-bold text-white mb-6">事件影响预期分析</h3>
                <div class="grid grid-cols-3 gap-8">
                  <div>
                    <div class="text-xs text-gray-500 font-mono mb-2">SHORT TERM</div>
                    <div class="text-red-400 text-lg font-bold mb-2">波动加剧</div>
                    <p class="text-sm text-gray-400 leading-relaxed">预计波动加剧且偏向防御。技术面显示TD序列出现完美的“卖出9”信号。</p>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-mono mb-2">MEDIUM TERM</div>
                    <div class="text-white text-lg font-bold mb-2">回归基本面</div>
                    <p class="text-sm text-gray-400 leading-relaxed">随着2026年1月数据流恢复正常，市场将重新校准利率预期。</p>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 font-mono mb-2">LONG TERM</div>
                    <div class="text-green-400 text-lg font-bold mb-2">趋势看涨</div>
                    <p class="text-sm text-gray-400 leading-relaxed">历史趋势仍看涨，但需度过当前的政策迷雾期。</p>
                  </div>
                </div>
              </div>

              <div class="h-px bg-[#222] w-full"></div>

              <!-- Backtest -->
              <div>
                <h3 class="text-2xl font-bold text-white mb-6">历史回测与概率</h3>
                <div class="text-gray-300 text-base leading-relaxed font-light">
                  <p class="mb-4">
                    尽管短期技术面承压，历史数据展示了 {{ selectedEvent.stocks[0].symbol }} 的韧性。在类似下跌后：
                  </p>
                  <div class="grid grid-cols-2 gap-6">
                    <div class="bg-[#151515] p-4 rounded border border-[#222]">
                      <div class="text-xs text-gray-500 uppercase mb-1">5天上涨概率</div>
                      <div class="text-2xl font-bold text-green-400">62%</div>
                      <div class="text-xs text-gray-400 mt-1">平均回报 +0.6%</div>
                    </div>
                    <div class="bg-[#151515] p-4 rounded border border-[#222]">
                      <div class="text-xs text-gray-500 uppercase mb-1">21天上涨概率</div>
                      <div class="text-2xl font-bold text-green-400">65%</div>
                      <div class="text-xs text-gray-400 mt-1">平均回报 +1.9%</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>

          <!-- Right: Original Event (350px) -->
          <div class="w-[350px] overflow-y-auto p-8 scrollbar-thin bg-[#0f0f0f] shrink-0 hidden xl:block">
            <div class="space-y-8">
              <!-- Image -->
              <div class="rounded-lg overflow-hidden relative group shadow-lg">
                <img :src="selectedEvent.image" class="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>

              <!-- Title & Meta -->
              <div>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in selectedEvent.tags" :key="tag" class="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-700 pb-0.5">{{ tag }}</span>
                </div>
                <h3 class="text-2xl font-bold text-white leading-tight mb-3">{{ selectedEvent.title }}</h3>
                <div class="text-xs text-gray-500 font-mono flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  {{ selectedEvent.time }}
                </div>
              </div>

              <div class="h-px bg-[#222] w-full"></div>

              <!-- Original Text -->
              <div>
                <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                  Original Source
                </h4>
                <p class="text-gray-300 text-sm leading-loose font-light">
                  {{ selectedEvent.desc }} 美国劳工统计局 (BLS) 宣布取消2025年10月的PPI报告及进出口价格指数，并将11月数据推迟至2026年1月中旬发布。此前，10月CPI已被取消，11月CPI推迟至12月18日。这一系列因政府停摆导致的数据缺失，在美联储12月政策会议前制造了罕见的“历史性盲区”，严重干扰了市场对通胀路径和利率政策的判断能力。
                </p>
              </div>
            </div>
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
                  @click="addToWatchlist({ symbol: selectedStrategy.symbol || 'MSFT' })"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-900/30 hover:scale-105 hover:shadow-blue-500/40 border border-blue-500"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                  关注
                </button>
                <button 
                  @click="goToStockDetail(selectedStrategy.symbol || 'MSFT')"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all shadow-lg hover:scale-105 border border-slate-600"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  详情
                </button>
                <button 
                  @click="saveReport(selectedStrategy)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white text-xs font-bold transition-all shadow-lg hover:scale-105 border border-[#444]"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                  保存报告
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
                            <span class="text-blue-400 font-medium whitespace-nowrap">{{ position.type }}</span>
                            <span>{{ position.symbol }} {{ position.strike }} {{ position.expiry }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Button -->
                    <button class="w-full py-2 bg-[#222] hover:bg-[#333] text-xs text-gray-300 rounded border border-[#333] transition-colors mt-2">
                      查看详情
                    </button>
                  </div>
                </transition>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-8 text-gray-500 text-sm">
              暂无相关计划
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Theme Detail Modal (Large Size) -->
  <div v-if="showThemeDetailModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="showThemeDetailModal = false">
    <div class="relative w-full max-w-[90vw] h-[85vh] bg-[#1a1a1a] rounded-xl border border-[#333] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
      <!-- Close Button -->
      <button @click="showThemeDetailModal = false" class="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/50 rounded-full p-1 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Content (Optimized Layout) -->
      <div v-if="selectedThemeDetail" class="flex h-full">
         <!-- Left: Title & Desc (30%) -->
         <div class="w-[30%] border-r border-[#333] bg-gradient-to-br from-[#222] to-[#1a1a1a] flex flex-col p-8 justify-center relative overflow-hidden">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10">
               <h2 class="text-3xl font-bold text-white mb-6 leading-tight">{{ selectedThemeDetail.title }}</h2>
               <div class="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
               <p class="text-base text-gray-400 leading-relaxed">{{ selectedThemeDetail.desc }}</p>
            </div>
         </div>

         <!-- Right: Stock List (70%) -->
         <div class="flex-1 bg-[#1a1a1a] flex flex-col min-w-0">
            <div class="px-8 py-6 border-b border-[#333] flex justify-between items-center bg-[#1a1a1a]/50 backdrop-blur-sm sticky top-0 z-10">
              <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Related Assets
              </h3>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
              <div class="grid grid-cols-1 gap-3">
                 <div 
                    v-for="item in selectedThemeDetail.items" 
                    :key="item.id" 
                    @click="goToStockDetail(item.title.split(' ')[0], selectedThemeDetail.id)"
                    class="p-4 flex items-center justify-between hover:bg-[#222] transition-all cursor-pointer rounded-lg border border-[#333] hover:border-blue-500/30 group/item"
                  >
                    <div class="flex-1 min-w-0 pr-4">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-bold text-base text-white truncate group-hover/item:text-blue-400 transition-colors">{{ item.title }}</span>
                      </div>
                      <p class="text-xs text-gray-500 line-clamp-1 group-hover/item:text-gray-400">
                        {{ item.desc }}
                      </p>
                    </div>
                    
                    <div class="flex items-center gap-4 shrink-0">
                      <span v-if="item.change" class="text-sm font-mono font-bold" :class="item.change > 0 ? 'text-green-500' : 'text-red-500'">
                        {{ item.change > 0 ? '+' : ''}}{{ item.change }}%
                      </span>
                      <svg class="w-4 h-4 text-gray-600 group-hover/item:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
              </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as echarts from 'echarts'
import Navbar from '../components/Navbar.vue'

const route = useRoute()
const router = useRouter()

// UI State
const showBackToTop = ref(false)
const showFilterModal = ref(false)
const contentFilter = ref('recommended') // 'recommended' or 'following'
const viewMode = ref('card') // 'card' or 'list'

// Filter State
const filters = ref({
  sources: [],
  direction: '',
  duration: '',
  grade: ''
})

// Attribution Specific Filters
const attributionFilters = ref({
  stocks: [],
  timeRange: 'Last 24h',
  sentiments: []
})
const attributionStockInput = ref('')

const toggleAttributionSentiment = (sentiment) => {
  const index = attributionFilters.value.sentiments.indexOf(sentiment)
  if (index === -1) {
    attributionFilters.value.sentiments.push(sentiment)
  } else {
    attributionFilters.value.sentiments.splice(index, 1)
  }
}

const addAttributionStock = () => {
  const val = attributionStockInput.value.trim().toUpperCase()
  if (val && !attributionFilters.value.stocks.includes(val)) {
    attributionFilters.value.stocks.push(val)
  }
  attributionStockInput.value = ''
}

const removeAttributionStock = (index) => {
  attributionFilters.value.stocks.splice(index, 1)
}

const filterOptions = {
  sources: [
    { id: 'openai', label: 'OpenAI', icon: '●' },
    { id: 'claude', label: 'Claude', icon: '✦' },
    { id: 'grok', label: 'Grok', icon: '✓' },
    { id: 'deepseek', label: 'DeepSeek', icon: '◆' },
    { id: 'qwen', label: 'Qwen', icon: '◎' },
    { id: 'kimi', label: 'Kimi', icon: '▪' },
    { id: 'gemini', label: 'Gemini', icon: '✧' }
  ],
  directions: ['LONG', 'SHORT', 'WAIT'],
  durations: ['Short', 'Medium', 'Long'],
  grades: ['A+', 'A', 'A-', 'B+', 'B', 'C']
}

const toggleFilterSource = (id) => {
  const index = filters.value.sources.indexOf(id)
  if (index === -1) {
    filters.value.sources.push(id)
  } else {
    filters.value.sources.splice(index, 1)
  }
}

// Grid Control State
const gridCols = ref(5)
const isGridControlExpanded = ref(false)
const lastScrollTop = ref(0)

const adjustGrid = (delta) => {
  const newVal = gridCols.value + delta
  if (newVal >= 1 && newVal <= 10) {
    gridCols.value = newVal
  }
}

// Computed property to filter content based on switch
const filteredOpportunities = computed(() => {
  if (contentFilter.value === 'following') {
    // Return a subset or different data for 'following' to show visual change
    return opportunities.value.filter((_, index) => index % 2 === 0)
  }
  return opportunities.value
})

// Watch content filter to refresh other tabs data (mock)
watch(contentFilter, (newVal) => {
  if (activeTab.value === 'themes') {
    // Mock refresh for themes
    themes.value = newVal === 'following' 
      ? generateMoreThemes(5, 100) // Show fewer/different items
      : generateMoreThemes(20, 0)
  } else if (activeTab.value === 'attribution') {
    // Mock refresh for attribution
    markets.value.forEach(market => {
      const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
      market.events = newVal === 'following'
        ? generateEvents(templateId, 5, 50) // Show fewer/different items
        : generateEvents(templateId, 20, 0)
    })
  }
})

// Scroll Handler for Back to Top & Grid Control
const handleWindowScroll = () => {
  // Check both window scroll and document element scroll
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  showBackToTop.value = scrollTop > 300

  // Auto collapse grid control on scroll down
  if (scrollTop > lastScrollTop.value + 10 && isGridControlExpanded.value) {
    isGridControlExpanded.value = false
  }
  lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Tabs Configuration
const tabs = [
  { id: 'themes', label: '市场热点' },
  { id: 'themesB', label: '主题指数' },
  { id: 'opportunities', label: '机会推荐' },
  { id: 'attribution', label: '事件分析' }
]

const activeTab = ref(route.query.tab || 'opportunities')
const isLoading = ref(false)
const loadSentinel = ref(null)
let observer = null

// --- Theme Chart Logic ---
const themeChartRef = ref(null)
const selectedChartPeriod = ref('1M')
let themeChart = null

// Theme Detail Modal Logic
const showThemeDetailModal = ref(false)
const selectedThemeDetail = ref(null)

const handleChartClick = (params) => {
  if (params.componentType === 'series') {
    const themeName = params.seriesName
    console.log('Chart clicked:', themeName)
    
    // Find theme data from themes list
    // Try exact match first
    let theme = themes.value.find(t => t.title === themeName)
    
    // If not found, try partial match (in case of suffixes)
    if (!theme) {
      theme = themes.value.find(t => t.title.startsWith(themeName))
    }
    
    console.log('Found theme:', theme)
    
    if (theme) {
      selectedThemeDetail.value = theme
      showThemeDetailModal.value = true
    }
  }
}

const generateThemeChartData = () => {
  // Use titles from themeTemplates to ensure matching
  const themesList = themeTemplates.slice(0, 5).map(t => t.title)
  const days = 30 // Default 1M
  const dates = []
  const series = []
  
  // Generate dates
  const today = new Date()
  for (let i = 0; i < days; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - (days - 1 - i))
    dates.push(`${d.getMonth() + 1}/${d.getDate()}`)
  }

  // Generate series data (Daily Change %)
  themesList.forEach(theme => {
    const data = []
    for (let i = 0; i < days; i++) {
      // Random daily change between -3% and +3%
      const change = (Math.random() * 6 - 3).toFixed(2)
      data.push(parseFloat(change))
    }
    series.push({
      name: theme,
      type: 'line',
      data: data,
      smooth: true,
      showSymbol: true, // Enable symbols for easier clicking
      symbolSize: 8,    // Increase symbol size
      lineStyle: { width: 2 }
    })
  })

  return { dates, series }
}

const initThemeChart = () => {
  if (!themeChartRef.value) return
  
  if (themeChart) {
    themeChart.dispose()
  }
  
  themeChart = echarts.init(themeChartRef.value)
  const { dates, series } = generateThemeChartData()
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(20, 20, 20, 0.9)',
      borderColor: '#333',
      textStyle: { color: '#fff' },
      formatter: function (params) {
        let result = `<div style="font-weight:bold; margin-bottom:5px;">${params[0].axisValue}</div>`
        params.forEach(item => {
          const color = item.color
          const val = item.value
          const sign = val >= 0 ? '+' : ''
          const valColor = val >= 0 ? '#10B981' : '#EF4444'
          result += `<div style="display:flex; justify-content:space-between; align-items:center; gap:15px; font-size:12px;">
            <span style="display:flex; align-items:center; gap:5px;">
              <span style="width:8px; height:8px; border-radius:50%; background-color:${color}"></span>
              <span style="color:#ccc">${item.seriesName}</span>
            </span>
            <span style="color:${valColor}; font-weight:bold;">${sign}${val}%</span>
          </div>`
        })
        return result
      }
    },
    legend: {
      data: series.map(s => s.name),
      textStyle: { color: '#999' },
      bottom: 0,
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: { lineStyle: { color: '#333' } },
      axisLabel: { color: '#666' },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { 
        color: '#666',
        formatter: '{value}%'
      },
      splitLine: { 
        lineStyle: { color: '#222' } 
      },
      // Add a zero line visual guide
      axisPointer: {
        show: true,
        lineStyle: {
          color: '#333',
          type: 'dashed'
        }
      }
    },
    series: series
  }
  
  themeChart.setOption(option)
  
  // Add zero line markLine to the first series as a reference
  themeChart.setOption({
    series: [{
      markLine: {
        symbol: 'none',
        silent: true,
        lineStyle: { color: '#444', type: 'dashed', width: 1 },
        data: [{ yAxis: 0 }]
      }
    }]
  })

  // Add click event listener
  themeChart.on('click', handleChartClick)
  
  // Handle resize
  window.addEventListener('resize', () => {
    themeChart && themeChart.resize()
  })
}

watch(activeTab, (newVal) => {
  if (newVal === 'themesB') {
    nextTick(() => {
      initThemeChart()
    })
  }
})

watch(selectedChartPeriod, () => {
  // Mock data refresh
  initThemeChart()
})

// --- Attribution Logic ---
const allAttributionEvents = ref([])
const sortBy = ref('change') // 'change' | 'time'
const sortOrder = ref('desc') // 'desc' | 'asc'

const allEvents = computed(() => {
  const events = [...allAttributionEvents.value]
  return events.sort((a, b) => {
    if (sortBy.value === 'change') {
      const changeA = parseFloat(a.themeChange || 0)
      const changeB = parseFloat(b.themeChange || 0)
      return sortOrder.value === 'desc' ? changeB - changeA : changeA - changeB
    } else {
      // Sort by time (Mock time string "HH:MM AM/PM")
      const parseTime = (t) => {
        if (!t) return 0
        const [time, period] = t.split(' ')
        let [hours, minutes] = time.split(':').map(Number)
        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0
        return hours * 60 + minutes
      }
      const timeA = parseTime(a.time)
      const timeB = parseTime(b.time)
      return sortOrder.value === 'desc' ? timeB - timeA : timeA - timeB
    }
  })
})

const setSort = (type) => {
  if (sortBy.value === type) {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = type
    sortOrder.value = 'desc'
  }
}

const openThemeDetailFromEvent = (event) => {
  // Map event to theme detail structure
  selectedThemeDetail.value = {
    id: event.id,
    title: event.title,
    desc: event.desc,
    image: event.image || 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1964&auto=format&fit=crop',
    sentiment: 'Neutral', // Default, or derive from stocks
    heat: Math.floor(Math.random() * 40) + 60,
    stats: {
      upRatio: 60,
      downRatio: 40,
      upCount: event.stocks.filter(s => s.change > 0).length,
      downCount: event.stocks.filter(s => s.change <= 0).length
    },
    relatedStocks: event.stocks.map(s => ({
      symbol: s.symbol,
      change: s.change
    })),
    items: event.stocks.map(s => ({
      id: s.symbol,
      title: `${s.symbol} Analysis`,
      desc: s.reason || `Detailed impact analysis for ${s.symbol}.`,
      change: s.change,
      image: null
    }))
  }
  showThemeDetailModal.value = true
}

// Mock Data Generator for Events
const generateEvents = (marketId, count, startIndex) => {
  const templates = {
    'us': [
      { 
        title: 'NVDA Chip Delay', 
        desc: '芯片发布推迟消息引发市场担忧，多家投行下调目标价。', 
        stocks: [
          { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$485.09', change: -3.45, reason: 'Dominant market share in AI training GPUs.' },
          { symbol: 'AMD', name: 'Advanced Micro Devices', price: '$138.00', change: -1.20, reason: 'Competitor sentiment impact.' },
          { symbol: 'TSM', name: 'Taiwan Semi', price: '$102.50', change: -0.80, reason: 'Supply chain concerns.' },
          { symbol: 'INTC', name: 'Intel Corp', price: '$42.15', change: -0.50, reason: 'Sector sympathy.' },
          { symbol: 'QCOM', name: 'Qualcomm', price: '$128.40', change: -0.30, reason: 'Mobile chip sentiment.' },
          { symbol: 'AVGO', name: 'Broadcom', price: '$980.00', change: -1.10, reason: 'AI infrastructure impact.' }
        ], 
        tags: ['Chips', 'AI'], 
        image: 'https://placehold.co/400x200/1a4d2e/white?text=NVDA+Chip' 
      },
      { 
        title: 'Tesla Recall', 
        desc: '自动驾驶软件问题宣布召回部分车辆，股价承压。', 
        stocks: [
          { symbol: 'TSLA', name: 'Tesla Inc', price: '$235.45', change: 1.80, reason: 'Software update required for 2M vehicles.' },
          { symbol: 'RIVN', name: 'Rivian', price: '$15.60', change: 0.50, reason: 'Sector sympathy move.' }
        ], 
        tags: ['EV', 'Auto'], 
        image: 'https://placehold.co/400x200/4d1a1a/white?text=Tesla+Recall' 
      },
      { 
        title: 'Apple Vision Pro', 
        desc: '预售火爆超出预期，供应链传出增产消息。', 
        stocks: [
          { symbol: 'AAPL', name: 'Apple Inc', price: '$192.50', change: 1.20, reason: 'Strong pre-order numbers.' },
          { symbol: 'SONY', name: 'Sony Group', price: '$95.00', change: 0.90, reason: 'Display supplier benefit.' }
        ], 
        tags: ['Tech', 'VR'], 
        image: 'https://placehold.co/400x200/222/white?text=Vision+Pro' 
      },
      { 
        title: 'Fed Rate Decision', 
        desc: '美联储暗示维持利率不变，市场解读为鸽派信号。', 
        stocks: [
          { symbol: 'SPY', name: 'S&P 500 ETF', price: '$475.00', change: 0.85, reason: 'Broad market rally.' },
          { symbol: 'QQQ', name: 'Nasdaq 100', price: '$408.00', change: 1.10, reason: 'Tech sector outperformance.' },
          { symbol: 'TLT', name: '20+ Year Treasury', price: '$98.50', change: 1.50, reason: 'Yields falling.' },
          { symbol: 'IWM', name: 'Russell 2000', price: '$195.20', change: 2.10, reason: 'Small caps benefit from rate pause.' },
          { symbol: 'GLD', name: 'SPDR Gold Shares', price: '$192.00', change: 0.60, reason: 'Dollar weakness.' },
          { symbol: 'DXY', name: 'US Dollar Index', price: '$102.50', change: -0.40, reason: 'Rate expectations.' }
        ], 
        tags: ['Macro', 'Fed'], 
        image: 'https://placehold.co/400x200/333/white?text=Fed+Rate' 
      }
    ],
    'hk': [
      { 
        title: 'Tencent Gaming', 
        desc: '新批号发放，游戏板块集体反弹，腾讯领涨。', 
        stocks: [
          { symbol: '0700.HK', name: 'Tencent', price: 'HK$320.00', change: 2.50, reason: 'New game approvals.' },
          { symbol: '9999.HK', name: 'NetEase', price: 'HK$145.00', change: 3.10, reason: 'Sector momentum.' }
        ], 
        tags: ['Gaming', 'Tech'], 
        image: 'https://placehold.co/400x200/1a4d2e/white?text=Tencent' 
      },
      { 
        title: 'Alibaba Cloud', 
        desc: '阿里云分拆计划重启传闻，管理层未予置评。', 
        stocks: [
          { symbol: '9988.HK', name: 'Alibaba', price: 'HK$76.50', change: 1.10, reason: 'Restructuring speculation.' }
        ], 
        tags: ['Cloud', 'E-com'], 
        image: 'https://placehold.co/400x200/333/white?text=Alibaba' 
      },
      { 
        title: 'EV Price War', 
        desc: '比亚迪宣布新一轮降价，引发汽车股普跌。', 
        stocks: [
          { symbol: '1211.HK', name: 'BYD Co', price: 'HK$205.00', change: -2.30, reason: 'Margin pressure concerns.' },
          { symbol: '2015.HK', name: 'Li Auto', price: 'HK$110.00', change: -3.50, reason: 'Competition intensifying.' },
          { symbol: '9868.HK', name: 'XPeng', price: 'HK$45.00', change: -4.10, reason: 'Price war impact.' }
        ], 
        tags: ['EV', 'Auto'], 
        image: 'https://placehold.co/400x200/4d1a1a/white?text=BYD' 
      }
    ],
    'cn': [
      { 
        title: 'Moutai Dividend', 
        desc: '茅台董事会批准实施特别分红方案，股息率提升。', 
        stocks: [
          { symbol: '600519', name: 'Kweichow Moutai', price: '¥1750.00', change: 1.50, reason: 'Special dividend announcement.' },
          { symbol: '000858', name: 'Wuliangye', price: '¥135.00', change: 0.80, reason: 'Sector sympathy.' }
        ], 
        tags: ['Consumer', 'Liquor'], 
        image: 'https://placehold.co/400x200/1a4d2e/white?text=Moutai' 
      },
      { 
        title: 'Solar Policy', 
        desc: '光伏行业新规出台，限制低端产能扩张。', 
        stocks: [
          { symbol: '601012', name: 'Longi Green', price: '¥22.50', change: -1.20, reason: 'Capacity restriction impact.' },
          { symbol: '300274', name: 'Sungrow', price: '¥75.00', change: -0.90, reason: 'Regulatory uncertainty.' }
        ], 
        tags: ['Solar', 'Energy'], 
        image: 'https://placehold.co/400x200/4d1a1a/white?text=Solar' 
      },
      { 
        title: 'Bank Support', 
        desc: '央行降准落地，银行板块流动性改善。', 
        stocks: [
          { symbol: '600036', name: 'CM Bank', price: '¥30.20', change: 0.90, reason: 'Liquidity injection.' },
          { symbol: '601398', name: 'ICBC', price: '¥4.80', change: 0.50, reason: 'Policy support.' }
        ], 
        tags: ['Bank', 'Finance'], 
        image: 'https://placehold.co/400x200/333/white?text=Bank' 
      }
    ]
  }

  const marketTemplates = templates[marketId] || templates['us']
  
  return Array.from({ length: count }).map((_, i) => {
    const template = marketTemplates[(startIndex + i) % marketTemplates.length]
    const date = new Date()
    date.setMinutes(date.getMinutes() - (startIndex + i) * 15)
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    return {
      id: `${marketId}-${startIndex + i}`,
      time: timeStr,
      ...template,
      stocks: template.stocks.map(s => ({
        ...s,
        change: parseFloat((s.change + (Math.random() - 0.5)).toFixed(2))
      })),
      themeChange: (Math.random() * 6 - 3).toFixed(2) // Persistent theme change for sorting
    }
  })
}

// Initialize Attribution Data (Flattened)
const initAttributionData = () => {
  const marketIds = ['us', 'hk', 'cn']
  let events = []
  // Generate a mix of events
  for (let i = 0; i < 15; i++) {
    const marketId = marketIds[i % marketIds.length]
    events = events.concat(generateEvents(marketId, 1, i))
  }
  allAttributionEvents.value = events
}

initAttributionData()
// (Removed duplicate generateEvents)

// (Removed old attribution logic)

// Mock Data Generator
const generateMockOpportunities = (count, startIndex) => {
  const templates = [
    { symbol: 'MSFT', title: '微软云计算+AI双轮驱动', type: 'Long', strategy: '基本面分析', risk: 'Low', tags: ['Cloud', 'AI'] },
    { symbol: 'TSLA', title: '特斯拉短期回调压力', type: 'Short', strategy: '技术分析', risk: 'High', tags: ['EV', 'Tech'] },
    { symbol: 'NVDA', title: 'AI芯片需求持续爆发', type: 'Long', strategy: '趋势跟踪', risk: 'Med', tags: ['Semi', 'AI'] },
    { symbol: 'AAPL', title: 'iPhone销量超预期', type: 'Long', strategy: '事件驱动', risk: 'Low', tags: ['Consumer', 'Tech'] },
    { symbol: 'AMD', title: 'MI300发布会前瞻', type: 'Long', strategy: '事件驱动', risk: 'High', tags: ['Semi', 'Event'] },
    { symbol: 'META', title: '广告业务复苏强劲', type: 'Long', strategy: '基本面分析', risk: 'Med', tags: ['Ads', 'Social'] },
    { symbol: 'GOOGL', title: 'Gemini模型发布', type: 'Long', strategy: '产品发布', risk: 'Med', tags: ['AI', 'Search'] },
    { symbol: 'AMZN', title: 'AWS利润率提升', type: 'Long', strategy: '财报分析', risk: 'Low', tags: ['Cloud', 'E-com'] }
  ]

  return Array.from({ length: count }).map((_, i) => {
    const template = templates[(startIndex + i) % templates.length]
    return {
      id: startIndex + i,
      ...template,
      score: Math.floor(Math.random() * 20) + 80,
      return: (Math.random() * 30 + 5).toFixed(1),
      reason: `AI analysis indicates a strong ${template.type === 'Long' ? 'upside' : 'downside'} potential based on recent ${template.strategy} signals. Market sentiment is currently ${template.type === 'Long' ? 'bullish' : 'bearish'} with high institutional interest. Key technical levels are being tested with increasing volume.`,
      themeChange: (Math.random() * 6 - 3).toFixed(2) // Persistent theme change for sorting
    }
  })
}

const opportunities = ref(generateMockOpportunities(15, 0))

// Mock Data Templates for Themes
const themeTemplates = [
  {
    title: 'AI Infrastructure Boom',
    sentiment: 'Bullish',
    desc: 'Enterprise AI adoption drives massive infrastructure investment across cloud and semiconductor sectors.',
    items: [
      { title: 'NVDA', change: 3.45, desc: 'Dominant market share in AI training GPUs.', image: 'https://placehold.co/100x80/1a4d2e/white?text=NVDA' },
      { title: 'AMD', change: 1.20, desc: 'Emerging as a strong second player with MI300 series.', image: 'https://placehold.co/100x80/1a4d2e/white?text=AMD' },
      { title: 'SMCI', change: -0.50, desc: 'Leading liquid cooling solutions for high-density racks.', image: 'https://placehold.co/100x80/4d1a1a/white?text=SMCI' }
    ]
  },
  {
    title: 'EV Market Price War',
    sentiment: 'Bearish',
    desc: 'Competition intensifies in the EV sector as traditional automakers ramp up production.',
    items: [
      { title: 'TSLA', change: -3.50, desc: 'Margin compression fears due to price cuts.', image: 'https://placehold.co/100x80/4d1a1a/white?text=TSLA' },
      { title: 'RIVN', change: -4.20, desc: 'Cash burn concerns; production ramp challenges.', image: 'https://placehold.co/100x80/4d1a1a/white?text=RIVN' },
      { title: 'Ford Cuts Production', change: null, desc: 'Ford reduces F-150 Lightning production targets.', image: 'https://placehold.co/100x80/222/white?text=News' }
    ]
  },
  {
    title: 'Cybersecurity Renaissance',
    sentiment: 'Bullish',
    desc: 'Rising threats fuel enterprise security spending surge.',
    items: [
      { title: 'CRWD', change: 1.85, desc: 'Platform consolidation thesis playing out.', image: 'https://placehold.co/100x80/1a4d2e/white?text=CRWD' },
      { title: 'PANW', change: 0.95, desc: 'Next-gen firewall demand remains robust.', image: 'https://placehold.co/100x80/1a4d2e/white?text=PANW' }
    ]
  },
  {
    title: 'Biotech Innovation',
    sentiment: 'Bullish',
    desc: 'New gene therapies and weight-loss drugs drive renewed interest.',
    items: [
      { title: 'LLY', change: 2.75, desc: 'Mounjaro sales beating expectations.', image: 'https://placehold.co/100x80/1a4d2e/white?text=LLY' },
      { title: 'NVO', change: 1.90, desc: 'Wegovy supply constraints easing.', image: 'https://placehold.co/100x80/1a4d2e/white?text=NVO' }
    ]
  },
  {
    title: 'Crypto Resurgence',
    sentiment: 'Bullish',
    desc: 'Bitcoin ETF approval expectations drive market sentiment.',
    items: [
      { title: 'COIN', change: 5.20, desc: 'Trading volume surge ahead of ETF decision.', image: 'https://placehold.co/100x80/1a4d2e/white?text=COIN' },
      { title: 'MSTR', change: 4.80, desc: 'Bitcoin holdings valuation increases.', image: 'https://placehold.co/100x80/1a4d2e/white?text=MSTR' }
    ]
  },
  {
    title: 'Semiconductor Cycle',
    sentiment: 'Neutral',
    desc: 'Memory chip market showing signs of bottoming out.',
    items: [
      { title: 'MU', change: 0.50, desc: 'Inventory levels normalizing.', image: 'https://placehold.co/100x80/333/white?text=MU' },
      { title: 'WDC', change: 1.10, desc: 'Merger talks with Kioxia progressing.', image: 'https://placehold.co/100x80/1a4d2e/white?text=WDC' }
    ]
  },
  {
    title: 'Renewable Energy Reset',
    sentiment: 'Bearish',
    desc: 'High interest rates weighing on project finance.',
    items: [
      { title: 'ENPH', change: -2.30, desc: 'Demand in Europe softening.', image: 'https://placehold.co/100x80/4d1a1a/white?text=ENPH' },
      { title: 'SEDG', change: -3.10, desc: 'Guidance cut due to inventory buildup.', image: 'https://placehold.co/100x80/4d1a1a/white?text=SEDG' }
    ]
  },
  {
    title: 'China Tech Rebound',
    sentiment: 'Bullish',
    desc: 'Valuations attractive as regulatory headwinds ease.',
    items: [
      { title: 'BABA', change: 2.50, desc: 'Cloud unit spin-off plans revisited.', image: 'https://placehold.co/100x80/1a4d2e/white?text=BABA' },
      { title: 'PDD', change: 4.20, desc: 'Temu international expansion exceeding targets.', image: 'https://placehold.co/100x80/1a4d2e/white?text=PDD' }
    ]
  }
]

const themes = ref([])

// Generate random themes based on templates
const generateMoreThemes = (count, startIndex) => {
  return Array.from({ length: count }).map((_, i) => {
    const template = themeTemplates[(startIndex + i) % themeTemplates.length]
    const id = startIndex + i + 1
    // Add some randomness to heat
    const heat = Math.floor(Math.random() * 40) + 50 // 50-90
    
    // Generate related stocks for visualization
    const relatedStocksCount = 12 + Math.floor(Math.random() * 8) // 12-20 stocks
    const relatedStocks = Array.from({ length: relatedStocksCount }).map(() => ({
      symbol: 'STK',
      change: parseFloat(((Math.random() - 0.45) * 6).toFixed(2)) // -2.7 to +3.3
    })).sort((a, b) => Math.abs(b.change) - Math.abs(a.change))

    // Calculate stats for Sentiment Bar
    const upCount = relatedStocks.filter(s => s.change > 0).length
    const downCount = relatedStocks.filter(s => s.change < 0).length
    const totalCount = relatedStocks.length
    const upRatio = (upCount / totalCount) * 100
    const downRatio = (downCount / totalCount) * 100

    return {
      id,
      title: `${template.title} ${Math.floor(id / themeTemplates.length) > 0 ? '#' + (Math.floor(id / themeTemplates.length) + 1) : ''}`,
      sentiment: template.sentiment,
      heat,
      desc: template.desc,
      // Add Theme Image
      image: `https://placehold.co/600x300/1a1a1a/666?text=${encodeURIComponent(template.title.split(' ')[0])}`,
      totalItems: template.items.length + Math.floor(Math.random() * 5),
      items: template.items.map((item, idx) => ({
        id: id * 100 + idx,
        ...item,
        // Randomize change slightly
        change: item.change ? parseFloat((item.change + (Math.random() - 0.5)).toFixed(2)) : null
      })),
      // New fields for viz
      relatedStocks,
      stats: { upCount, downCount, upRatio, downRatio }
    }
  })
}

// Helper for Heatmap Color
const getHeatmapColor = (change) => {
  if (change >= 3) return 'bg-green-500'
  if (change >= 1) return 'bg-green-600'
  if (change > 0) return 'bg-green-700'
  if (change <= -3) return 'bg-red-500'
  if (change <= -1) return 'bg-red-600'
  return 'bg-red-700'
}

// Initialize themes
themes.value = generateMoreThemes(20, 0)

// Gradient Helper
const gradients = [
  'from-blue-500/20 to-purple-500/20',
  'from-emerald-500/20 to-teal-500/20',
  'from-orange-500/20 to-red-500/20',
  'from-pink-500/20 to-rose-500/20',
  'from-cyan-500/20 to-blue-500/20',
  'from-violet-500/20 to-fuchsia-500/20'
]

const getGradientClass = (index) => {
  return gradients[index % gradients.length]
}

// Infinite Scroll Logic
const setupObserver = () => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { rootMargin: '200px' })

  if (loadSentinel.value) {
    observer.observe(loadSentinel.value)
  }
}

const loadMore = async () => {
  if (isLoading.value) return
  isLoading.value = true
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if (activeTab.value === 'opportunities') {
    const newItems = generateMockOpportunities(10, opportunities.value.length)
    opportunities.value.push(...newItems)
  } else if (activeTab.value === 'themes') {
    const newItems = generateMoreThemes(10, themes.value.length)
    themes.value.push(...newItems)
  } else if (activeTab.value === 'attribution') {
    // Load more attribution events
    const marketIds = ['us', 'hk', 'cn']
    const marketId = marketIds[Math.floor(Math.random() * marketIds.length)]
    const newEvents = generateEvents(marketId, 5, allAttributionEvents.value.length)
    allAttributionEvents.value.push(...newEvents)
  }
  
  isLoading.value = false
}

// Lifecycle
onMounted(() => {
  setupObserver()
  window.addEventListener('scroll', handleWindowScroll)
  
  // Init chart if starting on themesB tab
  if (activeTab.value === 'themesB') {
    nextTick(() => {
      initThemeChart()
    })
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('scroll', handleWindowScroll)
})

// Watch tab change to reset observer and update URL
watch(activeTab, async (newTab) => {
  isLoading.value = false
  
  // Update URL query param
  router.replace({ query: { ...route.query, tab: newTab } })

  await nextTick()
  setupObserver()
})

// Switch Tab Helper
const switchTab = (tabId) => {
  activeTab.value = tabId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Strategy Modal Logic ---
const showStrategyModal = ref(false)
const selectedStrategy = ref({})
const chatInput = ref('')
const chatHistory = ref([])
const isChatLoading = ref(false)
const relatedPlans = ref([])

const quickPrompts = [
  "这个策略的主要风险是什么？",
  "基于此策略生成的计划有哪些？",
  "如何对冲此策略的下行风险？"
]

const openStrategyModal = (opp) => {
  selectedStrategy.value = {
    ...opp,
    grade: 'A+', // Mock data
    direction: opp.type === 'Long' ? 'LONG' : 'SHORT',
    term: 'Short Term',
    timeAgo: '2h ago',
    time: 'Today, 10:30 AM',
    category: opp.strategy,
    duration: '1-2 Weeks',
    summary: opp.reason,
    content: `
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
      title: `${opp.symbol} Aggressive Growth`,
      capital: 50000,
      createdAt: '2023-10-25',
      targetReturn: '+15%',
      riskLevel: 'high',
      isExpanded: false,
      positions: [
        { type: 'Buy Call', symbol: opp.symbol, strike: 'ATM', expiry: '1 Month' }
      ]
    },
    {
      id: 2,
      title: `${opp.symbol} Conservative Income`,
      capital: 100000,
      createdAt: '2023-10-26',
      targetReturn: '+5%',
      riskLevel: 'low',
      isExpanded: false,
      positions: [
        { type: 'Sell Put', symbol: opp.symbol, strike: 'OTM', expiry: '1 Month' }
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

const generatePlanForStrategy = (strategy) => {
  alert(`Generating plan for ${strategy.symbol}...`)
}

const goToStockDetail = (symbol, sourceId) => {
  // Close any open modals
  showEventModal.value = false
  
  console.log('Navigating to stock detail:', symbol, sourceId)
  // Determine if sourceId is a theme ID or event ID
  const isTheme = typeof sourceId === 'number'
  
  router.push({
    path: `/stock-attribution/${symbol}`,
    query: {
      tab: isTheme ? 'themes' : 'strategies',
      [isTheme ? 'highlightThemeId' : 'strategyId']: sourceId || '1' // Default to strategyId=1 for events if no ID
    }
  })
}

// --- Event Detail Modal Logic ---
const showEventModal = ref(false)
const selectedEvent = ref(null)
const isCopied = ref(false)

const openEventModal = (event) => {
  selectedEvent.value = event
  showEventModal.value = true
}

const closeEventModal = () => {
  showEventModal.value = false
}

const addToWatchlist = (stock) => {
  alert(`已将 ${stock.symbol} 添加到关注列表`)
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

const saveReport = (strategy) => {
  alert(`已保存策略报告：${strategy.title}`)
}

const renderedStrategyContent = computed(() => selectedStrategy.value.content || '')
</script>

<style scoped>
/* Custom Scrollbar for horizontal lists */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #1a1a1a; 
}
::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #444; 
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
