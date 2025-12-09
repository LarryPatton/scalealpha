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
            @click="showFilterModal = true"
            class="h-9 w-9 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
        </div>

        <!-- Right: View Controls -->
        <div class="flex items-center gap-3">
          <!-- Pagination (Attribution Only) -->
          <div v-if="activeTab === 'attribution'" class="flex items-center bg-[#1a1a1a] rounded-lg border border-[#333] overflow-hidden mr-4">
            <button 
              @click="changeAttributionPage(-1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-r border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentAttributionPage === 0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span class="px-3 text-xs text-gray-500 font-mono bg-[#222] h-full flex items-center">{{ currentAttributionPage + 1 }} / {{ totalAttributionPages }}</span>
            <button 
              @click="changeAttributionPage(1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-l border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentAttributionPage >= totalAttributionPages - 1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          <!-- View Switcher (Opportunities, Attribution & Themes) -->
          <div v-if="['opportunities', 'attribution', 'themes'].includes(activeTab)" class="bg-[#1a1a1a] border border-[#333] rounded-lg p-1 flex items-center">
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
          <!-- Cards (Dark Tech Style) -->
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
                  <div class="text-2xl font-bold text-emerald-400">{{ opp.score }}%</div>
                  <div class="text-[10px] text-slate-500 uppercase tracking-wider">Confidence</div>
                </div>
              </div>

              <div class="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1-10 DAYS</span>
                <span>GEMINI</span>
                <span :class="opp.risk === 'High' ? 'text-red-400' : (opp.risk === 'Med' ? 'text-yellow-400' : 'text-green-400')">{{ opp.risk.toUpperCase() }} RISK</span>
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
            <span class="text-sm ml-2">Loading more opportunities...</span>
          </div>
        </div>
      </div>
      
      <!-- Tab: Themes (Waterfall) -->
      <div v-else-if="activeTab === 'themes'" class="max-w-[1920px] mx-auto">
        <div 
          :class="viewMode === 'card' ? 'grid gap-6' : 'flex flex-col space-y-4'"
          :style="viewMode === 'card' ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}"
        >
          
          <!-- Theme Card -->
          <div v-for="theme in themes" :key="theme.id" class="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden hover:border-gray-500 transition-colors group">
            
            <!-- Header -->
            <div class="p-4 border-b border-[#333] bg-[#222]">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold px-1.5 py-0.5 rounded border" 
                    :class="theme.sentiment === 'Bullish' ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-red-900/30 text-red-400 border-red-900/50'">
                    {{ theme.sentiment }}
                  </span>
                  <span class="text-xs font-bold text-white">{{ theme.heat }}% Heat</span>
                </div>
                <button class="text-xs bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded border border-[#444] transition-colors">
                  + Follow
                </button>
              </div>
              
              <!-- Macro Viz: Sentiment Bar & Heatmap Grid -->
              <div class="mb-4 space-y-2">
                <!-- Sentiment Bar -->
                <div class="flex items-center gap-2 text-[10px] font-mono text-gray-500">
                  <div class="flex-1 h-1.5 bg-[#333] rounded-full overflow-hidden flex">
                    <div class="h-full bg-green-500" :style="{ width: theme.stats.upRatio + '%' }"></div>
                    <div class="h-full bg-red-500" :style="{ width: theme.stats.downRatio + '%' }"></div>
                  </div>
                  <div class="flex gap-2 whitespace-nowrap">
                    <span class="text-green-400">{{ theme.stats.upCount }}↑</span>
                    <span class="text-red-400">{{ theme.stats.downCount }}↓</span>
                  </div>
                </div>

                <!-- Heatmap Grid -->
                <div class="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] gap-0.5 w-full rounded overflow-hidden bg-[#111] p-0.5">
                  <div 
                    v-for="(stock, i) in theme.relatedStocks" 
                    :key="i"
                    @click.stop="goToStockDetail(stock.symbol, theme.id)"
                    class="h-6 flex items-center justify-center text-[9px] font-bold text-white/90 opacity-90 hover:opacity-100 transition-all cursor-pointer rounded-[1px]"
                    :class="getHeatmapColor(stock.change)"
                    :title="`${stock.symbol}: ${stock.change > 0 ? '+' : ''}${stock.change}%`"
                  >
                    {{ stock.symbol }}
                  </div>
                </div>
              </div>

              <!-- Theme Image -->
              <div class="w-full h-32 bg-[#111] rounded-lg overflow-hidden mb-4 relative group/image">
                <img :src="theme.image" class="w-full h-full object-cover opacity-80 group-hover/image:opacity-100 transition-opacity" alt="Theme Image" />
              </div>

              <h3 class="text-lg font-bold text-white leading-tight mb-1">{{ theme.title }}</h3>
              <p class="text-xs text-gray-400 line-clamp-2">{{ theme.desc }}</p>
            </div>

            <!-- List Items -->
            <div class="divide-y divide-[#333]">
              <div v-for="item in theme.items" :key="item.id" class="p-3 flex gap-3 hover:bg-[#2a2a2a] transition-colors cursor-pointer group/item">
                <!-- Left Content -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-bold text-sm text-gray-200 truncate">{{ item.title }}</span>
                    <span v-if="item.change" class="text-xs font-mono ml-2" :class="item.change > 0 ? 'text-green-400' : 'text-red-400'">
                      {{ item.change > 0 ? '+' : ''}}{{ item.change }}%
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed group-hover/item:text-gray-400">
                    {{ item.desc }}
                  </p>
                </div>
                
                <!-- Right Image/Chart -->
                <div class="w-16 h-12 flex-shrink-0 bg-[#333] rounded overflow-hidden relative">
                  <img v-if="item.image" :src="item.image" class="w-full h-full object-cover opacity-80 group-hover/item:opacity-100 transition-opacity" />
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">
                    Chart
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-2 text-center border-t border-[#333] bg-[#1a1a1a]">
              <button class="text-xs text-gray-500 hover:text-white transition-colors w-full py-1">
                View All {{ theme.totalItems }} Items
              </button>
            </div>

          </div>

        </div>

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

      <!-- Tab: Attribution (Kanban) -->
      <div v-else-if="activeTab === 'attribution'" class="px-4 pb-8">
        <div 
          class="gap-6 items-start"
          :class="viewMode === 'card' ? 'grid' : 'flex flex-col space-y-6'"
          :style="viewMode === 'card' ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}"
        >
          
          <!-- Sector Column -->
          <div v-for="sector in visibleSectors" :key="sector.id" class="flex flex-col bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden w-full">
            
            <!-- Column Header -->
            <div class="p-4 border-b border-[#333] bg-[#222] flex justify-between items-center">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-white">{{ sector.name }}</h3>
              </div>
            </div>

            <!-- Events List (Natural Height) -->
            <div class="p-4 space-y-4">
              <div v-for="event in sector.events" :key="event.id" class="relative pl-4 border-l-2 border-[#333] hover:border-blue-500/50 transition-colors group">
                <!-- Timeline Dot -->
                <div class="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#333] group-hover:bg-blue-500 transition-colors border border-[#1a1a1a]"></div>
                
                <!-- Time Label -->
                <div class="text-xs text-gray-500 mb-1 font-mono">{{ event.time }}</div>

                <!-- Event Card -->
                <div class="bg-[#222] rounded-lg border border-[#333] overflow-hidden hover:border-gray-500 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col">
                  
                  <!-- Image Area -->
                  <div class="h-32 w-full bg-[#111] relative overflow-hidden">
                    <img :src="event.image" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Event Image" />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent opacity-60"></div>
                  </div>

                  <div class="p-3">
                    <h4 class="text-sm font-bold text-white mb-1 leading-snug">{{ event.title }}</h4>
                    <p class="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">{{ event.desc }}</p>
                    
                    <!-- Stock Data List -->
                    <div class="space-y-2">
                      <div v-for="(stock, sIndex) in event.stocks" :key="sIndex" class="bg-[#111] rounded p-2 flex items-center gap-3 border border-[#333/50] hover:border-gray-600 transition-colors">
                        <!-- Logo Placeholder -->
                        <div class="w-8 h-8 rounded bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333]">
                          {{ stock.symbol[0] }}
                        </div>
                        
                        <!-- Info -->
                        <div class="flex-1 min-w-0">
                          <div class="flex justify-between items-baseline">
                            <span class="text-sm font-bold text-white">{{ stock.symbol }}</span>
                            <span class="text-xs font-mono font-medium" :class="stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                              {{ stock.change >= 0 ? '+' : '' }}{{ stock.change }}%
                            </span>
                          </div>
                          <div class="flex justify-between items-center mt-0.5">
                            <span class="text-[10px] text-gray-500 truncate max-w-[120px]">{{ stock.name }}</span>
                            <span class="text-xs font-bold text-gray-300">{{ stock.price }}</span>
                          </div>
                          <!-- Reason (Optional) -->
                          <div v-if="stock.reason" class="mt-1 pt-1 border-t border-[#333] text-[10px] text-gray-400 italic">
                            {{ stock.reason }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Tags -->
                    <div class="mt-2 flex flex-wrap gap-1.5">
                      <span v-for="tag in event.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-[#2a2a2a] text-gray-500 rounded border border-[#333]">{{ tag }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Loading Indicator per column -->
              <div v-if="sector.isLoading" class="py-4 flex flex-col items-center gap-2">
                <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-gray-500">Loading history...</span>
              </div>
              
              <!-- End of History -->
              <div v-if="!sector.isLoading && sector.events.length > 50" class="py-4 text-center">
                <span class="text-xs text-gray-600">No more events</span>
              </div>
              
              <!-- Sentinel for Intersection Observer -->
              <div :ref="el => setAttributionSentinel(el, sector.id)" class="h-4 w-full"></div>
            </div>

          </div>

        </div>
      </div>
    </main>

    <!-- 3. Floating Tabs (Bottom Center) -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="bg-[#1a1a1a]/90 backdrop-blur-xl border border-[#333] rounded-full p-1.5 shadow-2xl flex items-center gap-1">
        <button 
          v-for="tab in tabs" 
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
    <div v-if="['opportunities', 'themes', 'attribution'].includes(activeTab)" class="fixed bottom-8 left-8 z-50 flex items-center transition-all duration-300">
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
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  { id: 'opportunities', label: '机会推荐' },
  { id: 'attribution', label: '事件分析' }
]

const activeTab = ref(route.query.tab || 'opportunities')
const isLoading = ref(false)
const loadSentinel = ref(null)
let observer = null

// --- Attribution Logic ---
const sectors = ref([
  { id: 'tech', name: 'Technology', events: [], isLoading: false },
  { id: 'energy', name: 'Energy', events: [], isLoading: false },
  { id: 'finance', name: 'Financials', events: [], isLoading: false },
  { id: 'healthcare', name: 'Healthcare', events: [], isLoading: false },
  { id: 'consumer', name: 'Consumer Discretionary', events: [], isLoading: false },
  { id: 'industrial', name: 'Industrials', events: [], isLoading: false },
  { id: 'materials', name: 'Materials', events: [], isLoading: false },
  { id: 'utilities', name: 'Utilities', events: [], isLoading: false },
  { id: 'realestate', name: 'Real Estate', events: [], isLoading: false },
  { id: 'comm', name: 'Communication Services', events: [], isLoading: false }
])

const currentAttributionPage = ref(0)
const itemsPerAttributionPage = computed(() => gridCols.value)
const totalAttributionPages = computed(() => Math.ceil(sectors.value.length / itemsPerAttributionPage.value))

const visibleSectors = computed(() => {
  const start = currentAttributionPage.value * itemsPerAttributionPage.value
  return sectors.value.slice(start, start + itemsPerAttributionPage.value)
})

const changeAttributionPage = (delta) => {
  const newPage = currentAttributionPage.value + delta
  if (newPage >= 0 && newPage < totalAttributionPages.value) {
    currentAttributionPage.value = newPage
  }
}

// Watch gridCols to reset page if needed
watch(gridCols, () => {
  if (currentAttributionPage.value >= totalAttributionPages.value) {
    currentAttributionPage.value = Math.max(0, totalAttributionPages.value - 1)
  }
})

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
          { symbol: 'TSM', name: 'Taiwan Semi', price: '$102.50', change: -0.80, reason: 'Supply chain concerns.' }
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
          { symbol: 'TLT', name: '20+ Year Treasury', price: '$98.50', change: 1.50, reason: 'Yields falling.' }
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
      }))
    }
  })
}

// Initialize Attribution Data
sectors.value.forEach(sector => {
  sector.events = generateEvents(sector.id, 20, 0)
})

// Attribution Infinite Scroll
const attributionSentinels = ref({})
let attributionObservers = {}

const setAttributionSentinel = (el, sectorId) => {
  if (el) {
    attributionSentinels.value[sectorId] = el
    setupAttributionObserver(sectorId, el)
  }
}

const setupAttributionObserver = (sectorId, el) => {
  if (attributionObservers[sectorId]) attributionObservers[sectorId].disconnect()

  attributionObservers[sectorId] = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreAttributionEvents(sectorId)
    }
  }, { rootMargin: '200px' })

  attributionObservers[sectorId].observe(el)
}

const loadMoreAttributionEvents = async (sectorId) => {
  const sector = sectors.value.find(s => s.id === sectorId)
  if (!sector || sector.isLoading || sector.events.length > 50) return

  sector.isLoading = true
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const newEvents = generateEvents(sector.id, 5, sector.events.length)
  sector.events.push(...newEvents)
  
  sector.isLoading = false
}

const handleAttributionScroll = (event, marketId) => {
  // Fallback scroll handler
  const { scrollTop, clientHeight, scrollHeight } = event.target
  const market = markets.value.find(m => m.id === marketId)
  if (scrollHeight - scrollTop - clientHeight < 50) {
    loadMoreAttributionEvents(marketId)
  }
}

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
  }
  
  isLoading.value = false
}

// Lifecycle
onMounted(() => {
  setupObserver()
  window.addEventListener('scroll', handleWindowScroll)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  Object.values(attributionObservers).forEach(obs => obs.disconnect())
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

const goToStockDetail = (symbol, themeId) => {
  router.push(`/stock-attribution/${symbol}?tab=themes&highlightThemeId=${themeId}`)
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
