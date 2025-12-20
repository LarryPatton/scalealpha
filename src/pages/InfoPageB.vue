<template>
  <div class="min-h-screen flex flex-col pb-24" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- 1. Global Navbar -->
    <Navbar />

    <!-- 2. Main Content Area -->
    <main class="flex-grow flex flex-col p-4 lg:p-6 relative">
      
      <!-- Help Button for Tour -->
      <button 
        @click="startInfoTour"
        class="fixed top-20 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border hover:text-cyan-400 hover:border-cyan-500/50 transition-all group shadow-lg"
        :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
        title="查看使用引导"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="absolute right-full mr-2 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }">
          使用引导
        </span>
      </button>
      
      <!-- Hero Section (Always visible for all tabs) -->
      <div class="mb-8 text-center py-10">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-tight" :style="{ color: tokens.colors.text.primary }">
          Discover Your Next <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Winning Trade</span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg" :style="{ color: tokens.colors.text.tertiary }">
          AI-powered insights to help you find high-conviction opportunities in seconds.
        </p>
      </div>

      <!-- Universal Filter Bar -->
      <div id="info-filter-bar" class="sticky top-16 z-40 backdrop-blur border-b px-4 lg:px-8 py-3 mb-6 flex flex-wrap items-center justify-between gap-4 transition-all duration-300" :style="{ backgroundColor: tokens.colors.background.base + 'f2', borderColor: tokens.colors.border.default }">
        <!-- Left: Filter & Switcher -->
        <div class="flex items-center gap-3">
          <!-- Content Switcher -->
          <div id="content-switcher" class="border p-1 flex items-center" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <button 
              @click="contentFilter = 'recommended'"
              class="px-3 py-1.5 rounded-sm text-xs font-bold transition-all"
              :style="contentFilter === 'recommended' ? { backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.primary } : { color: tokens.colors.text.muted }"
            >
              Recommended
            </button>
            <button 
              @click="contentFilter = 'following'"
              class="px-3 py-1.5 rounded-sm text-xs font-bold transition-all"
              :style="contentFilter === 'following' ? { backgroundColor: isDark ? '#ffffff' : tokens.colors.background.elevated, color: isDark ? '#000000' : tokens.colors.text.primary } : { color: tokens.colors.text.muted }"
            >
              Following
            </button>
          </div>

          <!-- Filter Button -->
          <button 
            id="filter-button"
            v-if="activeTab !== 'themes'"
            @click="showFilterModal = true"
            class="h-8 w-8 border rounded-sm flex items-center justify-center transition-colors"
            :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.muted }"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
        </div>

        <!-- Right: View Controls -->
        <div class="flex items-center gap-2">
          <!-- Sort Buttons (Themes only) -->
          <div v-if="activeTab === 'themes'" class="flex items-center gap-1">
            <button 
              @click="setSort('change')"
              class="flex items-center gap-1.5 px-2.5 py-1.5 border rounded-sm text-[10px] font-bold uppercase tracking-wide transition-colors"
              :style="sortBy === 'change' ? { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.primary, borderColor: tokens.colors.border.default } : { backgroundColor: tokens.colors.background.base, color: tokens.colors.text.muted, borderColor: tokens.colors.border.subtle }"
            >
              <span>涨跌幅</span>
              <svg v-if="sortBy === 'change'" class="w-2.5 h-2.5 transition-transform duration-200" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <button 
              @click="setSort('time')"
              class="flex items-center gap-1.5 px-2.5 py-1.5 border rounded-sm text-[10px] font-bold uppercase tracking-wide transition-colors"
              :style="sortBy === 'time' ? { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.primary, borderColor: tokens.colors.border.default } : { backgroundColor: tokens.colors.background.base, color: tokens.colors.text.muted, borderColor: tokens.colors.border.subtle }"
            >
              <span>时间</span>
              <svg v-if="sortBy === 'time'" class="w-2.5 h-2.5 transition-transform duration-200" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <!-- View Switcher (Opportunities only) -->
          <div v-if="['opportunities'].includes(activeTab)" class="border rounded-sm p-0.5 flex items-center" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle }">
            <button 
              @click="viewMode = 'card'"
              class="p-1.5 rounded-sm transition-all"
              :style="viewMode === 'card' ? { backgroundColor: tokens.colors.border.default, color: tokens.colors.text.primary } : { color: tokens.colors.text.disabled }"
              title="Card View"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
            <button 
              @click="viewMode = 'list'"
              class="p-1.5 rounded-sm transition-all"
              :style="viewMode === 'list' ? { backgroundColor: tokens.colors.border.default, color: tokens.colors.text.primary } : { color: tokens.colors.text.disabled }"
              title="List View"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Tab: Opportunities -->
      <div id="opportunities-content" v-if="activeTab === 'opportunities'" class="w-full px-4 lg:px-8">
        <div 
          :class="viewMode === 'card' ? 'grid gap-4' : 'flex flex-col space-y-3'"
          :style="viewMode === 'card' ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}"
        >
          <!-- Cards (Minimalist Dark) -->
          <template v-if="viewMode === 'card'">
            <div 
              v-for="(opp, index) in filteredOpportunities" 
              :key="opp.id + '-' + index" 
              :id="index === 0 ? 'first-opportunity-card' : undefined"
              @click="openStrategyModal(opp)"
              class="p-5 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.primary }"
            >
              <!-- Subtle top accent on hover -->
              <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>

              <div class="relative z-10">
                <div class="flex justify-center mb-3">
                  <span class="text-[9px] font-bold text-cyan-500 border border-cyan-500/30 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">{{ opp.strategy }}</span>
                </div>
                
                <h3 class="text-2xl font-bold mb-1 group-hover:text-cyan-50 transition-colors" :style="{ color: tokens.colors.text.primary }">{{ opp.symbol }}</h3>
                <p class="text-[10px] mb-5 font-mono line-clamp-1" :style="{ color: tokens.colors.text.muted }">{{ opp.title }}</p>
                
                <div class="grid grid-cols-2 gap-3 mb-5 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                    <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A+</div>
                    <div class="text-[9px] uppercase tracking-wider" :style="{ color: tokens.colors.text.disabled }">评级</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-bold" :style="{ color: opp.type === 'Long' ? tokens.colors.accent.success : tokens.colors.accent.danger }">{{ opp.type === 'Long' ? '做多' : '做空' }}</div>
                    <div class="text-[9px] uppercase tracking-wider" :style="{ color: tokens.colors.text.disabled }">方向</div>
                  </div>
                </div>

                <div class="flex justify-between text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                  <span>1-10 天</span>
                  <span>GEMINI</span>
                  <span :style="{ color: opp.risk === 'High' ? tokens.colors.accent.danger : (opp.risk === 'Med' ? tokens.colors.accent.warning : tokens.colors.accent.success) }">{{ opp.risk === 'High' ? '高' : (opp.risk === 'Med' ? '中' : '低') }}风险</span>
                </div>
              </div>
            </div>
          </template>

          <!-- List View (Minimalist) -->
          <template v-else>
            <div 
              v-for="(opp, index) in filteredOpportunities" 
              :key="opp.id + '-' + index" 
              @click="openStrategyModal(opp)"
              class="border p-4 flex items-center gap-4 transition-colors cursor-pointer group"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
            >
              <!-- Status Bar -->
              <div class="w-0.5 h-8" :style="{ backgroundColor: opp.type === 'Long' ? tokens.colors.accent.success : tokens.colors.accent.danger }"></div>
              
              <!-- Symbol -->
              <div class="w-16 flex-shrink-0">
                <div class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ opp.symbol }}</div>
                <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">US Stock</div>
              </div>

              <!-- Main Info -->
              <div class="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                <div class="col-span-5">
                  <div class="font-medium truncate text-sm group-hover:text-cyan-400 transition-colors" :style="{ color: tokens.colors.text.secondary }">{{ opp.title }}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] px-1.5 rounded-sm" :style="{ backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.tertiary }">{{ opp.strategy }}</span>
                    <span class="text-[10px] truncate" :style="{ color: tokens.colors.text.muted }">{{ opp.tags.join(', ') }}</span>
                  </div>
                </div>
                
                <div class="col-span-2 text-center">
                  <div class="text-[10px] uppercase" :style="{ color: tokens.colors.text.muted }">Rating</div>
                  <div class="font-bold" :style="{ color: tokens.colors.text.secondary }">A+</div>
                </div>
                
                <!-- Duration (Replaces Return) -->
                <div class="col-span-2 text-center">
                  <div class="text-[10px] uppercase" :style="{ color: tokens.colors.text.muted }">Duration</div>
                  <div class="font-bold" :style="{ color: tokens.colors.text.secondary }">1-10 DAYS</div>
                </div>

                <div class="col-span-3 flex justify-end items-center gap-3">
                   <!-- Model (Replaces Score) -->
                   <div class="text-right">
                      <div class="text-[10px] uppercase tracking-wide" :style="{ color: tokens.colors.text.disabled }">Model</div>
                      <div class="font-bold text-cyan-400 text-sm">GEMINI</div>
                   </div>
                   <div class="w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.disabled }">
                     <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                   </div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Loading Sentinel -->
        <div ref="loadSentinel" class="h-16 flex items-center justify-center mt-6">
          <div v-if="isLoading" class="flex items-center gap-1.5" :style="{ color: tokens.colors.text.muted }">
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-75"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
            <span class="text-xs ml-2">加载中...</span>
          </div>
        </div>
      </div>
      
      <!-- Tab: Themes (List View - Minimalist) -->
      <div v-else-if="activeTab === 'themes'" class="w-full max-w-7xl mx-auto px-4">
        <div class="space-y-3">
          <div 
            v-for="event in allEvents" 
            :key="event.id" 
            @click="openThemeDetailFromEvent(event)"
            class="border p-5 flex items-center gap-5 transition-all cursor-pointer group"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
          >
            <!-- Left: Title & Desc -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1.5">
                <h3 class="text-lg font-bold truncate group-hover:text-cyan-50 transition-colors" :style="{ color: tokens.colors.text.primary }">{{ event.title }}</h3>
                <span class="text-[10px] px-1.5 py-0.5 rounded-sm font-mono" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }">{{ event.time.split(' ')[0] }}</span>
              </div>
              <p class="text-xs line-clamp-1 leading-relaxed transition-colors" :style="{ color: tokens.colors.text.muted }" :class="{ 'group-hover:opacity-80': true }">{{ event.desc }}</p>
            </div>

            <!-- Middle: Affected Stocks -->
            <div class="flex items-center gap-2 shrink-0">
              <div v-for="stock in event.stocks.slice(0, 3)" :key="stock.symbol" class="flex items-center gap-2 px-2.5 py-1.5 rounded-sm border" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle }">
                <div class="w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-bold border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }">
                  {{ stock.symbol.slice(0, 2) }}
                </div>
                <div>
                  <div class="font-bold text-[11px]" :style="{ color: tokens.colors.text.secondary }">{{ stock.symbol }}</div>
                  <div class="text-[10px]" :style="{ color: stock.change > 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }">
                    {{ stock.change > 0 ? '+' : '' }}{{ stock.change }}%
                  </div>
                </div>
              </div>
              <span v-if="event.stocks.length > 3" class="text-[10px] px-2 py-1 rounded-sm border" :style="{ color: tokens.colors.text.disabled, backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle }">+{{ event.stocks.length - 3 }}</span>
            </div>

            <!-- Right: Theme Change -->
            <div class="text-right min-w-[90px] pl-5 border-l" :style="{ borderColor: tokens.colors.border.subtle }">
              <div class="text-xl font-bold font-mono" :style="{ color: parseFloat(event.themeChange) > 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }">
                {{ parseFloat(event.themeChange) > 0 ? '+' : '' }}{{ event.themeChange }}%
              </div>
              <div class="text-[9px] uppercase tracking-wider mt-0.5" :style="{ color: tokens.colors.text.disabled }">涨跌幅</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab: ThemesB (Chart View) -->
      <div v-else-if="activeTab === 'themesB'" class="w-full">
        
        <!-- Theme Performance Chart -->
        <div class="mb-6 border p-4 relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
          <div class="flex justify-between items-center mb-4 px-2">
            <h3 class="text-base font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
              <span class="w-0.5 h-4 bg-cyan-500"></span>
              主题指数走势
            </h3>
            <div class="flex gap-1">
              <button 
                v-for="period in ['1M', '3M', '6M', 'YTD']" 
                :key="period"
                class="px-2.5 py-1 text-[10px] font-bold rounded-sm transition-colors uppercase"
                :style="selectedChartPeriod === period ? { backgroundColor: tokens.colors.accent.primary, color: '#000000' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
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
          <div v-if="isLoading" class="flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-75"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
            <span class="text-sm ml-2">Loading more themes...</span>
          </div>
        </div>
      </div>

      <!-- Tab: Attribution (Minimalist Dark) -->
      <div v-else-if="activeTab === 'attribution'" class="w-full px-8 pb-8">
        <div class="space-y-4">
          <div v-for="event in allAttributionEvents" :key="event.id" class="flex gap-5 items-stretch group">
            <!-- Time Column -->
            <div class="w-20 text-right pt-5 shrink-0">
              <div class="text-lg font-bold font-mono tracking-tight" :style="{ color: tokens.colors.text.primary }">{{ event.time.split(' ')[0] }}</div>
              <div class="text-xs font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">{{ event.time.split(' ')[1] || 'AM' }}</div>
            </div>
            
            <!-- Decoration Line -->
            <div class="w-px relative group-hover:bg-cyan-500/50 transition-colors duration-300" :style="{ backgroundColor: tokens.colors.border.subtle }">
              <div class="absolute top-6 -left-1 w-2 h-2 rounded-full group-hover:border-cyan-500 group-hover:glow-primary-sm transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderWidth: '1px', borderStyle: 'solid', borderColor: tokens.colors.border.strong }"></div>
            </div>
            
            <!-- Card -->
            <div class="flex-1 border transition-all relative overflow-hidden" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
              <!-- Subtle top accent line on hover -->
              <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-500"></div>

              <div class="flex h-full">
                <!-- Image (Left) -->
                <div class="w-56 relative overflow-hidden border-r shrink-0" :style="{ borderColor: tokens.colors.border.subtle }">
                  <img :src="event.image" class="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div class="absolute inset-0" :style="{ background: `linear-gradient(to right, ${tokens.colors.background.surface}cc, transparent)` }"></div>
                  <div class="absolute bottom-0 left-0 right-0 p-4" :style="{ background: `linear-gradient(to top, ${tokens.colors.background.surface}, transparent)` }">
                    <div class="text-xs text-cyan-400/80 font-bold uppercase tracking-wider mb-1">主题</div>
                  </div>
                </div>

                <!-- Content (Middle) -->
                <div class="flex-1 p-5 flex flex-col justify-center">
                  <h3 class="text-xl font-bold leading-tight mb-2 group-hover:text-cyan-50 transition-colors" :style="{ color: tokens.colors.text.primary }">{{ event.title }}</h3>
                  <p class="text-sm leading-relaxed line-clamp-2 max-w-3xl transition-colors" :style="{ color: tokens.colors.text.muted }" :class="{ 'group-hover:opacity-80': true }">{{ event.desc }}</p>
                </div>

                <!-- Stocks List (Right) -->
                <div class="w-72 border-l flex flex-col shrink-0 relative" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle }">
                  <div class="px-3 py-2 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.subtle }">
                    <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.disabled }">相关标的</span>
                    <span class="text-[10px]" :style="{ color: tokens.colors.text.disabled }">{{ event.stocks.length }} 只</span>
                  </div>
                  <div class="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1" style="max-height: 160px;">
                    <div 
                      v-for="stock in event.stocks" 
                      :key="stock.symbol" 
                      @click.stop="openEventModal(event)"
                      class="border rounded-sm px-2.5 py-2 flex items-center gap-2.5 transition-all cursor-pointer group/stock"
                      :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
                    >
                      <!-- Icon -->
                      <div class="w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold border group-hover/stock:text-cyan-400 group-hover/stock:border-cyan-500/50 transition-colors shrink-0" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }">
                        {{ stock.symbol.slice(0, 2) }}
                      </div>
                      
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <div class="text-xs font-bold leading-none mb-0.5 truncate transition-colors" :style="{ color: tokens.colors.text.secondary }" :class="{ 'group-hover/stock:!text-[color:var(--text-primary)]': true }" style="--text-primary: v-bind('tokens.colors.text.primary')">{{ stock.symbol }}</div>
                        <div class="text-[10px] truncate" :style="{ color: tokens.colors.text.disabled }">{{ stock.name }}</div>
                      </div>
                      
                      <!-- Sentiment Label -->
                      <div class="shrink-0">
                        <span 
                          class="text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide"
                          :style="{ backgroundColor: stock.change > 0 ? tokens.colors.accent.successBg : (stock.change < 0 ? tokens.colors.accent.dangerBg : 'rgba(107, 114, 128, 0.1)'), color: stock.change > 0 ? tokens.colors.accent.success : (stock.change < 0 ? tokens.colors.accent.danger : tokens.colors.text.muted) }"
                        >
                          {{ stock.change > 0 ? '利好' : (stock.change < 0 ? '利空' : '中性') }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- Scroll Hint Gradient -->
                  <div class="absolute bottom-0 left-0 right-0 h-4 pointer-events-none" :style="{ background: `linear-gradient(to top, ${tokens.colors.background.base}, transparent)` }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Loading Sentinel -->
        <div ref="loadSentinel" class="h-16 flex items-center justify-center mt-6">
          <div v-if="isLoading" class="flex items-center gap-1.5" :style="{ color: tokens.colors.text.disabled }">
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-75"></div>
            <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
            <span class="text-xs ml-2">加载中...</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 3. Floating Tabs (Bottom Center) -->
    <div id="floating-tabs" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1" :style="{ backgroundColor: tokens.colors.background.elevated + 'E6', borderColor: tokens.colors.border.strong }">
        <button 
          v-for="tab in tabs.filter(t => t.id !== 'themesB')" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
          :class="activeTab === tab.id ? 'shadow-lg scale-105' : ''"
          :style="activeTab === tab.id ? { backgroundColor: isDark ? '#ffffff' : tokens.colors.text.primary, color: isDark ? '#000000' : '#ffffff' } : { color: tokens.colors.text.muted }"
          @mouseenter="activeTab !== tab.id && ($event.target.style.backgroundColor = tokens.colors.border.strong)"
          @mouseleave="activeTab !== tab.id && ($event.target.style.backgroundColor = 'transparent')"
        >
          <span class="text-sm">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- (Removed Bottom Right Floating Buttons) -->

    <!-- 5. Grid Control (Bottom Left) -->
    <div id="grid-control" v-if="activeTab === 'opportunities' && viewMode === 'card'" class="fixed bottom-8 left-8 z-50 flex items-center transition-all duration-300">
      <!-- Expanded State -->
      <div 
        v-if="isGridControlExpanded"
        class="rounded-full h-12 px-1 flex items-center shadow-xl"
        :style="{ backgroundColor: isDark ? '#ffffff' : tokens.colors.background.overlay, color: isDark ? '#000000' : tokens.colors.text.primary }"
      >
        <button @click="adjustGrid(-1)" class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold transition-colors pb-1" :style="{ ':hover': { backgroundColor: tokens.colors.border.subtle } }">−</button>
        <div class="w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-colors" @click="isGridControlExpanded = false">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </div>
        <button @click="adjustGrid(1)" class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold transition-colors pb-1">+</button>
      </div>

      <!-- Collapsed State -->
      <button 
        v-else
        @click="isGridControlExpanded = true"
        class="w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        :style="{ backgroundColor: isDark ? '#ffffff' : tokens.colors.background.overlay, color: isDark ? '#000000' : tokens.colors.text.primary }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
      </button>
    </div>

    <!-- 6. Back to Top (Moved up) -->
    <button 
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-24 left-9 z-40 w-10 h-10 backdrop-blur-md border rounded-full flex items-center justify-center shadow-lg transition-all"
      :style="{ backgroundColor: tokens.colors.background.elevated + '80', borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
    </button>

    <!-- 6. Filter Modal Overlay -->
    <transition name="fade">
      <div v-if="showFilterModal" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 backdrop-blur-sm" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }" @click="showFilterModal = false"></div>
        
        <!-- Sidebar Panel -->
        <div class="relative w-96 h-full border-l shadow-2xl transform transition-transform duration-300 flex flex-col" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <!-- Header -->
          <div class="p-6 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default }">
            <h3 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">Filters</h3>
            <button @click="showFilterModal = false" class="transition-colors" :style="{ color: tokens.colors.text.tertiary }">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="flex-grow p-6 overflow-y-auto space-y-8">
            
            <!-- Default Filters (Opportunities & Themes) -->
            <template v-if="activeTab !== 'attribution'">
              <!-- 1. Sources (Multi-select) -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">策略生成来源 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="opt in filterOptions.sources" 
                    :key="opt.id"
                    @click="toggleFilterSource(opt.id)"
                    class="px-3 py-2 rounded-sm text-xs font-medium border transition-all flex items-center gap-2"
                    :style="filters.sources.includes(opt.id)
                      ? { backgroundColor: tokens.colors.accent.primaryDark, borderColor: tokens.colors.accent.primary, color: tokens.colors.text.primary }
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
                  >
                    <span>{{ opt.icon }}</span>
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <!-- 2. Direction -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">策略方向</h4>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="dir in filterOptions.directions" 
                    :key="dir"
                    @click="filters.direction = filters.direction === dir ? '' : dir"
                    class="py-2 rounded-sm text-xs font-bold border transition-all text-center"
                    :style="filters.direction === dir
                      ? { backgroundColor: tokens.colors.accent.primaryDark, borderColor: tokens.colors.accent.primary, color: tokens.colors.text.primary }
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
                  >
                    {{ dir }}
                  </button>
                </div>
              </div>

              <!-- 3. Duration -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">持续时间</h4>
                <div class="grid grid-cols-3 gap-2">
                  <button 
                    v-for="dur in filterOptions.durations" 
                    :key="dur"
                    @click="filters.duration = filters.duration === dur ? '' : dur"
                    class="py-2 rounded-sm text-xs font-medium border transition-all text-center"
                    :style="filters.duration === dur
                      ? { backgroundColor: tokens.colors.accent.primaryDark, borderColor: tokens.colors.accent.primary, color: tokens.colors.text.primary }
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
                  >
                    {{ dur }}
                  </button>
                </div>
              </div>

              <!-- 4. Grade -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">策略评级</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="grade in filterOptions.grades" 
                    :key="grade"
                    @click="filters.grade = filters.grade === grade ? '' : grade"
                    class="w-10 h-10 rounded-sm text-xs font-bold border transition-all flex items-center justify-center"
                    :style="filters.grade === grade
                      ? { backgroundColor: tokens.colors.accent.primaryDark, borderColor: tokens.colors.accent.primary, color: tokens.colors.text.primary }
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
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
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">输入股票 (多选)</h4>
                <div class="flex flex-wrap gap-2 mb-3" v-if="attributionFilters.stocks.length > 0">
                  <span 
                    v-for="(stock, idx) in attributionFilters.stocks" 
                    :key="idx"
                    class="px-2 py-1 rounded-sm border text-xs flex items-center gap-2"
                    :style="{ backgroundColor: tokens.colors.accent.primaryBg, borderColor: tokens.colors.accent.primary + '80', color: tokens.colors.accent.primary }"
                  >
                    {{ stock }}
                    <button @click="removeAttributionStock(idx)" class="opacity-60 hover:opacity-100 transition-opacity">×</button>
                  </span>
                </div>
                <div class="relative">
                  <input 
                    v-model="attributionStockInput"
                    @keyup.enter="addAttributionStock"
                    type="text" 
                    placeholder="输入代码并回车 (e.g. NVDA)" 
                    class="w-full rounded-sm px-3 py-2 text-sm focus:outline-none transition-colors"
                    :style="{ backgroundColor: tokens.colors.background.elevated, borderWidth: '1px', borderStyle: 'solid', borderColor: tokens.colors.border.default, color: tokens.colors.text.primary }"
                  />
                  <button 
                    @click="addAttributionStock"
                    class="absolute right-2 top-1/2 -translate-y-1/2"
                    :style="{ color: tokens.colors.text.muted }"
                    :disabled="!attributionStockInput"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>

              <!-- 2. Event Time Range -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">事件时间范围</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    v-for="range in ['Last 24h', 'Last 3 Days', 'Last Week', 'Last Month']" 
                    :key="range"
                    @click="attributionFilters.timeRange = range"
                    class="py-2 rounded-sm text-xs font-medium border transition-all text-center"
                    :style="attributionFilters.timeRange === range
                      ? { backgroundColor: tokens.colors.accent.primaryDark, borderColor: tokens.colors.accent.primary, color: tokens.colors.text.primary }
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
                  >
                    {{ range }}
                  </button>
                </div>
              </div>

              <!-- 3. Event Sentiment -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: tokens.colors.text.muted }">事件情绪 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="sentiment in ['Bullish', 'Bearish', 'Neutral']" 
                    :key="sentiment"
                    @click="toggleAttributionSentiment(sentiment)"
                    class="px-3 py-2 rounded-sm text-xs font-medium border transition-all flex items-center gap-2"
                    :style="attributionFilters.sentiments.includes(sentiment)
                      ? (sentiment === 'Bullish' ? { backgroundColor: tokens.colors.accent.successBg, borderColor: tokens.colors.accent.success, color: tokens.colors.accent.success } : (sentiment === 'Bearish' ? { backgroundColor: tokens.colors.accent.dangerBg, borderColor: tokens.colors.accent.danger, color: tokens.colors.accent.danger } : { backgroundColor: tokens.colors.border.strong, borderColor: tokens.colors.text.muted, color: tokens.colors.text.secondary }))
                      : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.tertiary }"
                  >
                    {{ sentiment }}
                  </button>
                </div>
              </div>
            </template>

          </div>
          
          <!-- Footer -->
          <div class="p-6 border-t" :style="{ borderColor: tokens.colors.border.default }">
            <button class="w-full py-3 font-bold rounded-sm transition-colors" :style="{ backgroundColor: tokens.colors.accent.primaryDark, color: tokens.colors.text.primary }">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Event Detail Modal (Attribution) -->
    <div v-if="showEventModal" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }" @click.self="closeEventModal">
      <div class="border w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
        
        <!-- Modal Header -->
        <div class="px-8 py-5 border-b flex justify-between items-center backdrop-blur-xl z-10 shrink-0" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface + 'f2' }">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ selectedEvent.title }}</h2>
            <span 
              class="text-xs font-bold px-2.5 py-1 rounded-sm border uppercase tracking-wider"
              :style="selectedEvent.stocks[0].change >= 0 ? { backgroundColor: tokens.colors.accent.successBg, color: tokens.colors.accent.success, borderColor: tokens.colors.accent.success + '40' } : { backgroundColor: tokens.colors.accent.dangerBg, color: tokens.colors.accent.danger, borderColor: tokens.colors.accent.danger + '40' }"
            >
              {{ selectedEvent.stocks[0].change >= 0 ? 'Bullish' : 'Bearish' }}
            </span>
            <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ selectedEvent.time }}</span>
          </div>
          <button @click="closeEventModal" class="w-8 h-8 flex items-center justify-center rounded-full transition-all" :style="{ ':hover': { backgroundColor: tokens.colors.border.subtle } }">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.muted }"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Left: AI Chat (320px) -->
          <div class="w-[320px] flex flex-col border-r shrink-0 hidden lg:flex" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
            <div class="px-4 py-3 border-b" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
               <h3 class="text-sm font-medium flex items-center gap-2" :style="{ color: tokens.colors.text.secondary }"><i class="fas fa-robot text-cyan-500"></i> 事件分析助手</h3>
            </div>
            <div class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
               <!-- Welcome State -->
               <div class="flex flex-col h-full">
                  <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                    <div class="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mb-2 glow-primary-sm">
                      <i class="fas fa-bolt text-cyan-400 text-lg"></i>
                    </div>
                    <div>
                      <h4 class="font-medium mb-1" :style="{ color: tokens.colors.text.primary }">ScaleAlpha Event AI</h4>
                      <p class="text-xs leading-relaxed px-2" :style="{ color: tokens.colors.text.muted }">
                        我是您的专属事件分析助手。<br>
                        已为您深度解析 <span class="text-cyan-400">{{ selectedEvent.title }}</span> 的市场影响。
                      </p>
                    </div>
                  </div>
                  
                  <!-- Quick Prompts -->
                  <div class="space-y-2 pb-4">
                    <p class="text-xs px-1 mb-2" :style="{ color: tokens.colors.text.muted }">您可以问我：</p>
                    <button class="w-full text-left px-3 py-2.5 hover:border-cyan-500/30 border rounded-sm text-xs transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-cyan-900/10" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                      <span class="group-hover:text-cyan-400 transition-colors">该事件对同板块其他股票有何影响？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-500 transition-all duration-200"></i>
                    </button>
                    <button class="w-full text-left px-3 py-2.5 hover:border-cyan-500/30 border rounded-sm text-xs transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-cyan-900/10" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                      <span class="group-hover:text-cyan-400 transition-colors">历史上有哪些相似事件？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-500 transition-all duration-200"></i>
                    </button>
                    <button class="w-full text-left px-3 py-2.5 hover:border-cyan-500/30 border rounded-sm text-xs transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-cyan-900/10" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                      <span class="group-hover:text-cyan-400 transition-colors">机构对此事件的最新评级变化？</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-500 transition-all duration-200"></i>
                    </button>
                  </div>
               </div>
            </div>
            <div class="p-3 border-t" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
              <div class="relative">
                <input type="text" placeholder="输入问题..." class="w-full rounded-sm pl-3 pr-10 py-2.5 text-sm border focus:outline-none focus:border-cyan-500" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.primary, borderColor: tokens.colors.border.default }">
                <button class="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-500"><i class="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>

          <!-- Middle: Analysis Content (Flex-1) -->
          <div class="flex-1 flex flex-col overflow-hidden border-r" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.subtle }">
            
            <!-- New Top Bar -->
            <div class="px-8 py-4 border-b flex justify-between items-center shrink-0" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
              <div class="text-lg font-bold flex items-center gap-2 truncate" :style="{ color: tokens.colors.text.primary }">
                <span class="text-cyan-400 truncate max-w-[200px]" :title="selectedEvent.title">{{ selectedEvent.title }}</span>
                <span class="text-sm" :style="{ color: tokens.colors.text.muted }">对</span>
                <span class="px-2 py-0.5 rounded-sm text-sm font-mono" :style="{ color: tokens.colors.text.primary, backgroundColor: tokens.colors.border.strong }">{{ selectedEvent.stocks[0].symbol }}</span>
                <span class="text-sm" :style="{ color: tokens.colors.text.muted }">的影响分析</span>
              </div>
              
              <div class="flex items-center gap-3 shrink-0">
                <button 
                  @click="copyShareLink"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                  :style="isCopied ? { backgroundColor: tokens.colors.accent.successBg, color: tokens.colors.accent.success, borderColor: tokens.colors.accent.success + '4d' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.default }"
                  :title="isCopied ? '已复制' : '复制分享链接'"
                >
                  <svg v-if="!isCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {{ isCopied ? '已复制' : '分享' }}
                </button>
                <button 
                  @click="addToWatchlist(selectedEvent.stocks[0])"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                  :style="{ backgroundColor: tokens.colors.accent.primaryDark, color: tokens.colors.text.primary, borderColor: tokens.colors.accent.primary }"
                  title="添加到关注"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                  关注 {{ selectedEvent.stocks[0].symbol }}
                </button>
                <button 
                  @click="goToStockDetail(selectedEvent.stocks[0].symbol)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                  :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.primary, borderColor: tokens.colors.border.strong }"
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
                <h3 class="text-2xl font-bold mb-6" :style="{ color: tokens.colors.text.primary }">对公司的事件影响分析</h3>
                <div class="space-y-6 text-base leading-relaxed font-light" :style="{ color: tokens.colors.text.secondary }">
                  <p>
                    该事件对 <span class="font-medium border-b pb-0.5" :style="{ color: tokens.colors.text.primary, borderColor: tokens.colors.text.primary + '33' }">{{ selectedEvent.stocks[0].symbol }}</span> 构成<span class="font-medium" :style="{ color: tokens.colors.accent.danger }">负面影响</span>。核心在于宏观数据真空导致风险溢价上升。
                  </p>
                  <div class="pl-4 border-l" :style="{ borderColor: tokens.colors.border.default }">
                    <h4 class="font-bold mb-2 text-sm uppercase tracking-wider" :style="{ color: tokens.colors.text.primary }">作用机制</h4>
                    <p>作为高贝塔值的成长型资产，{{ selectedEvent.stocks[0].symbol }} (当前市盈率35.2x) 对利率预期极度敏感。数据的缺失创造了"黑箱效应"，迫使投资者在美联储12月会议前进行防御性定价。</p>
                  </div>
                  <div class="pl-4 border-l" :style="{ borderColor: tokens.colors.border.default }">
                    <h4 class="font-bold mb-2 text-sm uppercase tracking-wider" :style="{ color: tokens.colors.text.primary }">财务路径</h4>
                    <p>虽然不直接影响成分股营收，但信息不确定性增加了隐含的资本成本。期权市场IV期限结构呈现"倒挂"(Backwardation)，表明短期市场压力剧增。</p>
                  </div>
                </div>
              </div>

              <div class="h-px w-full" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>

              <!-- Prediction Analysis -->
              <div>
                <h3 class="text-2xl font-bold mb-6" :style="{ color: tokens.colors.text.primary }">事件影响预期分析</h3>
                <div class="grid grid-cols-3 gap-8">
                  <div>
                    <div class="text-xs font-mono mb-2" :style="{ color: tokens.colors.text.muted }">SHORT TERM</div>
                    <div class="text-lg font-bold mb-2" :style="{ color: tokens.colors.accent.danger }">波动加剧</div>
                    <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">预计波动加剧且偏向防御。技术面显示TD序列出现完美的"卖出9"信号。</p>
                  </div>
                  <div>
                    <div class="text-xs font-mono mb-2" :style="{ color: tokens.colors.text.muted }">MEDIUM TERM</div>
                    <div class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">回归基本面</div>
                    <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">随着2026年1月数据流恢复正常，市场将重新校准利率预期。</p>
                  </div>
                  <div>
                    <div class="text-xs font-mono mb-2" :style="{ color: tokens.colors.text.muted }">LONG TERM</div>
                    <div class="text-lg font-bold mb-2" :style="{ color: tokens.colors.accent.success }">趋势看涨</div>
                    <p class="text-sm leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">历史趋势仍看涨，但需度过当前的政策迷雾期。</p>
                  </div>
                </div>
              </div>

              <div class="h-px w-full" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>

              <!-- Backtest -->
              <div>
                <h3 class="text-2xl font-bold mb-6" :style="{ color: tokens.colors.text.primary }">历史回测与概率</h3>
                <div class="text-base leading-relaxed font-light" :style="{ color: tokens.colors.text.secondary }">
                  <p class="mb-4">
                    尽管短期技术面承压，历史数据展示了 {{ selectedEvent.stocks[0].symbol }} 的韧性。在类似下跌后：
                  </p>
                  <div class="grid grid-cols-2 gap-6">
                    <div class="p-4 border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
                      <div class="text-xs uppercase mb-1" :style="{ color: tokens.colors.text.muted }">5天上涨概率</div>
                      <div class="text-2xl font-bold" :style="{ color: tokens.colors.accent.success }">62%</div>
                      <div class="text-xs mt-1" :style="{ color: tokens.colors.text.tertiary }">平均回报 +0.6%</div>
                    </div>
                    <div class="p-4 border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
                      <div class="text-xs uppercase mb-1" :style="{ color: tokens.colors.text.muted }">21天上涨概率</div>
                      <div class="text-2xl font-bold" :style="{ color: tokens.colors.accent.success }">65%</div>
                      <div class="text-xs mt-1" :style="{ color: tokens.colors.text.tertiary }">平均回报 +1.9%</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>

          <!-- Right: Original Event (350px) -->
          <div class="w-[350px] overflow-y-auto p-8 scrollbar-thin shrink-0 hidden xl:block" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="space-y-8">
              <!-- Image -->
              <div class="overflow-hidden relative group">
                <img :src="selectedEvent.image" class="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>

              <!-- Title & Meta -->
              <div>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in selectedEvent.tags" :key="tag" class="text-[10px] font-bold uppercase tracking-wider border-b pb-0.5" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default }">{{ tag }}</span>
                </div>
                <h3 class="text-2xl font-bold leading-tight mb-3" :style="{ color: tokens.colors.text.primary }">{{ selectedEvent.title }}</h3>
                <div class="text-xs font-mono flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                  {{ selectedEvent.time }}
                </div>
              </div>

              <div class="h-px w-full" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>

              <!-- Original Text -->
              <div>
                <h4 class="text-xs font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.muted }">
                  Original Source
                </h4>
                <p class="text-sm leading-loose font-light" :style="{ color: tokens.colors.text.secondary }">
                  {{ selectedEvent.desc }} 美国劳工统计局 (BLS) 宣布取消2025年10月的PPI报告及进出口价格指数，并将11月数据推迟至2026年1月中旬发布。此前，10月CPI已被取消，11月CPI推迟至12月18日。这一系列因政府停摆导致的数据缺失，在美联储12月政策会议前制造了罕见的"历史性盲区"，严重干扰了市场对通胀路径和利率政策的判断能力。
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Strategy Detail Modal (Apple-inspired Minimalist Design) -->
    <div v-if="showStrategyModal" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }" @click.self="closeStrategyModal">
      <div class="border w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
        
        <!-- Modal Header (Sticky) -->
        <div class="px-8 py-5 border-b flex justify-between items-center backdrop-blur-xl z-10 shrink-0" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface + 'f2' }">
          <div class="flex items-center gap-3">
            <!-- Grade Badge -->
            <div class="px-2.5 py-1 rounded-sm text-xs font-semibold tracking-wide"
              :style="{
                backgroundColor: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.accent.successBg : (selectedStrategy.grade === 'B' ? tokens.colors.accent.primaryBg : 'rgba(234, 179, 8, 0.1)'),
                color: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.accent.success : (selectedStrategy.grade === 'B' ? tokens.colors.accent.primary : '#facc15')
              }">
              GRADE {{ selectedStrategy.grade }}
            </div>
            <!-- Direction Badge -->
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold"
              :style="{
                backgroundColor: selectedStrategy.direction === 'LONG' ? tokens.colors.accent.successBg : (selectedStrategy.direction === 'SHORT' ? tokens.colors.accent.dangerBg : 'rgba(107, 114, 128, 0.1)'),
                color: selectedStrategy.direction === 'LONG' ? tokens.colors.accent.success : (selectedStrategy.direction === 'SHORT' ? tokens.colors.accent.danger : tokens.colors.text.tertiary)
              }">
              <span v-if="selectedStrategy.direction === 'LONG'">↑</span>
              <span v-if="selectedStrategy.direction === 'SHORT'">↓</span>
              {{ selectedStrategy.direction }}
            </div>
            <div class="h-4 w-px mx-1" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ selectedStrategy.timeAgo }}</span>
          </div>
          <!-- Close Button -->
          <button 
            @click="closeStrategyModal" 
            class="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            :style="{ ':hover': { backgroundColor: tokens.colors.border.subtle } }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.muted }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body (Split Layout) -->
        <div class="flex flex-1 overflow-hidden">
          
        <!-- Left Area (Chat + Content) -->
        <div class="flex-1 flex border-r relative" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.base }">
          
          <!-- Chat Sidebar (Left, 320px) -->
          <div class="w-[320px] flex flex-col border-r shrink-0 hidden lg:flex" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
            <!-- Chat Header -->
            <div class="px-4 py-3 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
               <h3 class="text-sm font-medium flex items-center gap-2" :style="{ color: tokens.colors.text.secondary }">
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
                      <h4 class="font-medium mb-1" :style="{ color: tokens.colors.text.primary }">ScaleAlpha AI 助手</h4>
                      <p class="text-xs" :style="{ color: tokens.colors.text.muted }">基于当前策略报告为您解答</p>
                    </div>
                  </div>
                  
                  <!-- Quick Prompts -->
                  <div class="space-y-2 pb-4">
                    <p class="text-xs px-1 mb-2" :style="{ color: tokens.colors.text.muted }">您可以问我：</p>
                    <button 
                      v-for="(prompt, idx) in quickPrompts" 
                      :key="idx"
                      @click="useQuickPrompt(prompt)"
                      class="w-full text-left px-3 py-2.5 hover:border-cyan-500/30 border rounded-sm text-xs transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-cyan-900/10"
                      :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }"
                    >
                      <span class="group-hover:text-cyan-400 transition-colors">{{ prompt }}</span>
                      <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-500 transition-all duration-300"></i>
                    </button>
                  </div>
               </div>
               
               <!-- Chat History -->
               <div v-else class="space-y-4">
                 <div v-for="(msg, index) in chatHistory" :key="index" class="flex gap-3">
                    <!-- Avatar -->
                    <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
                      :class="msg.role === 'user' ? 'bg-cyan-600' : 'bg-green-600'">
                      <i class="fas" :class="msg.role === 'user' ? 'fa-user' : 'fa-robot'"></i>
                    </div>
                    <!-- Message Bubble -->
                    <div class="flex-1">
                      <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">
                        {{ msg.role === 'user' ? 'You' : 'ScaleAlpha AI' }}
                      </div>
                      <div class="text-sm leading-relaxed whitespace-pre-wrap p-3 border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">{{ msg.content }}</div>
                    </div>
                 </div>

                 <!-- Loading Indicator -->
                 <div v-if="isChatLoading" class="flex gap-3">
                    <div class="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0 text-xs">
                      <i class="fas fa-robot"></i>
                    </div>
                    <div class="flex-1">
                       <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">ScaleAlpha AI</div>
                       <div class="p-3 border w-16" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
                          <div class="flex gap-1 items-center h-4 justify-center">
                            <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 0ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                            <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 150ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                            <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 300ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            <!-- Input Area -->
            <div class="p-3 border-t" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
              <div class="relative">
                <input 
                  v-model="chatInput"
                  type="text" 
                  placeholder="输入问题..." 
                  class="w-full rounded-sm pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 border"
                  :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.primary, borderColor: tokens.colors.border.default }"
                  @keyup.enter="sendChatMessage"
                >
                <button 
                  @click="sendChatMessage"
                  class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan-500 hover:text-cyan-400 transition-colors"
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
            <div class="px-6 py-4 border-b flex justify-between items-center shrink-0" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }">
              <!-- Left: Title & Meta -->
              <div class="flex items-center gap-4 overflow-hidden">
                <h2 class="text-lg font-bold truncate max-w-[300px]" :title="selectedStrategy.title" :style="{ color: tokens.colors.text.primary }">{{ selectedStrategy.title }}</h2>
                <div class="flex items-center gap-2 shrink-0">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border" 
                    :style="{
                      backgroundColor: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.accent.successBg : (selectedStrategy.grade === 'B' ? tokens.colors.accent.primaryBg : 'rgba(234, 179, 8, 0.2)'),
                      color: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.accent.success : (selectedStrategy.grade === 'B' ? tokens.colors.accent.primary : '#facc15'),
                      borderColor: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? 'rgba(34, 197, 94, 0.3)' : (selectedStrategy.grade === 'B' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(234, 179, 8, 0.3)')
                    }">
                    GRADE {{ selectedStrategy.grade }}
                  </span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold border" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }">
                    {{ selectedStrategy.term }}
                  </span>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ selectedStrategy.time }}</span>
                </div>
              </div>
              
              <!-- Right: Actions -->
              <div class="flex items-center gap-3 shrink-0">
                <button 
                  @click="copyShareLink"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border"
                  :style="isCopied 
                    ? { backgroundColor: tokens.colors.accent.successBg, color: tokens.colors.accent.success, borderColor: 'rgba(34, 197, 94, 0.3)' } 
                    : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
                  :title="isCopied ? '已复制' : '复制分享链接'"
                >
                  <svg v-if="!isCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {{ isCopied ? '已复制' : '分享' }}
                </button>
                <button 
                  @click="toggleStrategyWatchlist"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border"
                  :style="isStrategyWatchlisted 
                    ? { backgroundColor: tokens.colors.accent.primaryDark, color: tokens.colors.text.primary, borderColor: tokens.colors.accent.primary } 
                    : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
                >
                  <svg v-if="!isStrategyWatchlisted" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                  <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                  {{ isStrategyWatchlisted ? '已关注' : `关注 ${selectedStrategy.symbol || 'MSFT'}` }}
                </button>
                <button 
                  @click="goToStockDetail(selectedStrategy.symbol || 'MSFT')"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border"
                  :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.primary, borderColor: tokens.colors.border.strong }"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  {{ selectedStrategy.symbol || 'MSFT' }} 详情
                </button>
                <button 
                  @click="toggleStrategyReport"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border"
                  :style="isStrategyReportSaved 
                    ? { backgroundColor: tokens.colors.accent.successBg, color: tokens.colors.accent.success, borderColor: 'rgba(34, 197, 94, 0.3)' } 
                    : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
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
              <div class="border p-5 mb-8" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
                <h3 class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                  <i class="fas fa-file-alt"></i>
                  Strategy Summary
                </h3>
                <p class="leading-relaxed text-sm" :style="{ color: tokens.colors.text.secondary }">
                  {{ selectedStrategy.summary }}
                </p>
              </div>

              <!-- Main Content -->
              <div class="markdown-content space-y-6" :style="{ color: tokens.colors.text.secondary }" v-html="renderedStrategyContent"></div>

              <!-- Action Buttons -->
              <div class="flex gap-4 mt-12 pt-8 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                <button 
                  @click="generatePlanForStrategy(selectedStrategy)"
                  class="flex-1 bg-cyan-600 hover:bg-cyan-700 py-3 rounded font-bold transition-colors flex items-center justify-center gap-2"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  <i class="fas fa-magic"></i>
                  生成交易计划
                </button>
                <button class="px-4 py-3 rounded transition-colors" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.primary }">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

          <!-- Right: Related Plans (Fixed Width) -->
          <div class="w-[350px] border-l overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent shrink-0 hidden xl:block" :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.base }">
            
            <!-- Plans Header -->
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.muted }">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <h3 class="text-sm font-semibold" :style="{ color: tokens.colors.text.primary }">基于此策略的计划</h3>
                <span class="text-xs" :style="{ color: tokens.colors.text.muted }">({{ relatedPlans.length }})</span>
              </div>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">已有 {{ relatedPlans.length }} 个计划使用此策略</p>
            </div>

            <!-- Plans List -->
            <div v-if="relatedPlans.length > 0" class="space-y-3">
              <div 
                v-for="plan in relatedPlans" 
                :key="plan.id"
                class="border transition-all duration-200 group"
                :style="{ backgroundColor: tokens.colors.background.surface, borderColor: plan.isExpanded ? 'rgba(6, 182, 212, 0.3)' : tokens.colors.border.subtle }"
                :class="{ 'ring-1 ring-cyan-500/30': plan.isExpanded }"
              >
                <!-- Plan Header (Collapsible) -->
                <button 
                  @click="togglePlanExpand(plan)"
                  class="w-full px-4 py-3 flex items-center justify-between text-left transition-colors"
                >
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <svg 
                        class="w-3.5 h-3.5 transition-transform duration-200 group-hover:text-cyan-400" 
                        :class="{ 'rotate-90': plan.isExpanded }"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        :style="{ color: tokens.colors.text.muted }"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      <h4 class="text-sm font-bold truncate group-hover:text-cyan-400 transition-colors" :style="{ color: tokens.colors.text.primary }">{{ plan.title }}</h4>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold flex-shrink-0">
                        <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        官方生成
                      </span>
                    </div>
                    <div class="flex items-center gap-3 text-xs ml-5" :style="{ color: tokens.colors.text.muted }">
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
                  <div v-if="plan.isExpanded" class="px-4 pb-4 border-t pt-3 space-y-3" :style="{ borderColor: tokens.colors.border.subtle }">
                    <!-- Plan Metrics -->
                    <div class="grid grid-cols-2 gap-3">
                      <div class="rounded p-2.5" :style="{ backgroundColor: tokens.colors.background.base }">
                        <div class="text-xs mb-0.5" :style="{ color: tokens.colors.text.muted }">目标收益</div>
                        <div class="text-sm font-bold" :style="{ color: tokens.colors.accent.success }">{{ plan.targetReturn }}</div>
                      </div>
                      <div class="rounded p-2.5" :style="{ backgroundColor: tokens.colors.background.base }">
                        <div class="text-xs mb-0.5" :style="{ color: tokens.colors.text.muted }">风险等级</div>
                        <div class="text-sm font-semibold" :style="{
                          color: plan.riskLevel === 'low' ? tokens.colors.accent.success : (plan.riskLevel === 'medium' ? '#facc15' : tokens.colors.accent.danger)
                        }">{{ plan.riskLevel === 'low' ? '低' : plan.riskLevel === 'medium' ? '中' : '高' }}</div>
                      </div>
                    </div>

                    <!-- Positions -->
                    <div v-if="plan.positions && plan.positions.length > 0">
                      <div class="text-xs mb-2" :style="{ color: tokens.colors.text.muted }">操作记录</div>
                      <div class="space-y-2">
                        <div 
                          v-for="(position, idx) in plan.positions" 
                          :key="idx"
                          class="text-xs"
                        >
                          <div class="flex items-start gap-2" :style="{ color: tokens.colors.text.secondary }">
                            <span class="text-cyan-400 font-bold whitespace-nowrap">{{ position.type }}</span>
                            <span>{{ position.symbol }} {{ position.strike }} {{ position.expiry }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Button -->
                    <button class="w-full py-2 text-xs rounded border transition-colors mt-2" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.default }">
                      查看详情
                    </button>
                  </div>
                </transition>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-8 text-sm" :style="{ color: tokens.colors.text.muted }">
              暂无相关计划
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Theme Detail Modal (Large Size) -->
  <div v-if="showThemeDetailModal" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 transition-opacity duration-300" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)' }" @click.self="showThemeDetailModal = false">
    <div class="relative w-full max-w-[90vw] h-[85vh] border shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
      <!-- Close Button -->
      <button @click="showThemeDetailModal = false" class="absolute top-4 right-4 z-10 rounded-full p-1 transition-colors" :style="{ backgroundColor: tokens.colors.background.overlay + '80', color: tokens.colors.text.tertiary }">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <!-- Content (Optimized Layout) -->
      <div v-if="selectedThemeDetail" class="flex h-full">
         <!-- Left: Title & Desc (30%) -->
         <div class="w-[30%] border-r flex flex-col p-8 justify-center relative overflow-hidden" :style="{ borderColor: tokens.colors.border.default, background: `linear-gradient(to bottom right, ${tokens.colors.background.elevated}, ${tokens.colors.background.surface})` }">
            <!-- Decorative Elements -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="relative z-10">
               <h2 class="text-2xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">{{ selectedThemeDetail.title }}</h2>
               <div class="w-12 h-0.5 bg-cyan-500 mb-6"></div>
               <p class="text-base leading-relaxed" :style="{ color: tokens.colors.text.tertiary }">{{ selectedThemeDetail.desc }}</p>
            </div>
         </div>

         <!-- Right: Stock List (70%) -->
         <div class="flex-1 flex flex-col min-w-0" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div class="px-8 py-6 border-b flex justify-between items-center backdrop-blur-sm sticky top-0 z-10" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface + '80' }">
              <h3 class="text-lg font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
                <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                Related Assets
              </h3>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
              <div class="grid grid-cols-1 gap-3">
                 <div 
                    v-for="item in selectedThemeDetail.items" 
                    :key="item.id" 
                    @click="goToStockDetail(item.title.split(' ')[0], selectedThemeDetail.id)"
                    class="p-4 flex items-center justify-between transition-all cursor-pointer rounded border hover:border-cyan-500/30 group/item"
                    :style="{ borderColor: tokens.colors.border.default }"
                  >
                    <div class="flex-1 min-w-0 pr-4">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-bold text-base truncate group-hover/item:text-cyan-400 transition-colors" :style="{ color: tokens.colors.text.primary }">{{ item.title }}</span>
                      </div>
                      <p class="text-xs line-clamp-1" :style="{ color: tokens.colors.text.muted }" :class="{ 'group-hover/item:opacity-80': true }">
                        {{ item.desc }}
                      </p>
                    </div>
                    
                    <div class="flex items-center gap-4 shrink-0">
                      <span v-if="item.change" class="text-sm font-mono font-bold" :style="{ color: item.change > 0 ? tokens.colors.accent.success : tokens.colors.accent.danger }">
                        {{ item.change > 0 ? '+' : ''}}{{ item.change }}%
                      </span>
                      <svg class="w-4 h-4 group-hover/item:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.tertiary }"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
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
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import Navbar from '../components/Navbar.vue'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const router = useRouter()
const { tokens, isDark } = useTheme()

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

// Tour function for Info page
const startInfoTour = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      { 
        element: '#content-switcher', 
        popover: { 
          title: '内容切换', 
          description: '在"推荐"和"关注"之间切换，查看系统推荐的机会或您关注的标的相关内容。',
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#filter-button', 
        popover: { 
          title: '高级筛选', 
          description: '点击打开筛选面板，按来源、方向、周期、评级等条件精确过滤内容。',
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#first-opportunity-card', 
        popover: { 
          title: '机会卡片详解', 
          description: `<div style="text-align:left;line-height:1.6">
<b>• Strategy</b>: 策略类型标签<br>
<b>• Symbol</b>: 股票/标的代码<br>
<b>• Rating</b>: AI 综合评级 (A+/A/B/C/D)<br>
<b>• Direction</b>: 建议方向 (Long做多/Short做空)<br>
<b>• 底部信息</b>: 建议周期、分析模型、风险等级<br><br>
<i>点击卡片可查看完整分析报告</i>
</div>`,
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#floating-tabs', 
        popover: { 
          title: '内容分类', 
          description: '在不同类型的内容之间切换：Opportunities (机会)、Themes (主题) 和 Attribution (归因分析)。',
          side: "top", 
          align: 'center' 
        } 
      },
      { 
        element: '#grid-control', 
        popover: { 
          title: '布局控制', 
          description: '调整卡片网格的列数，自定义您喜欢的浏览布局。',
          side: "right", 
          align: 'center' 
        } 
      }
    ]
  });
  driverObj.drive();
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
  
  // Show tour for first time visitors
  if (!localStorage.getItem('hasSeenInfoTour')) {
    setTimeout(() => {
      startInfoTour();
      localStorage.setItem('hasSeenInfoTour', 'true');
    }, 1000);
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
const isStrategyWatchlisted = ref(false)
const isStrategyReportSaved = ref(false)
const chatInput = ref('')
const chatHistory = ref([])
const isChatLoading = ref(false)
const relatedPlans = ref([])

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

const openStrategyModal = (opp) => {
  isStrategyWatchlisted.value = false // Reset state
  isStrategyReportSaved.value = false // Reset state
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
