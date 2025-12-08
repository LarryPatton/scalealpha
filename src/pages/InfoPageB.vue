<template>
  <div class="bg-[#0f0f0f] min-h-screen flex flex-col pb-24">
    <!-- 1. Custom Navbar -->
    <nav class="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-[#333] px-4 lg:px-8 h-16 flex items-center justify-between">
      <!-- Left: Logo & Links -->
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
        </router-link>
        
        <div class="hidden md:flex items-center gap-6">
          <router-link to="/info" class="text-white font-bold border-b-2 border-blue-500 pb-0.5">Info</router-link>
          <router-link to="/infoB" class="text-gray-400 hover:text-white font-medium transition-colors">机会发现</router-link>
        </div>
      </div>

      <!-- Center: Search Bar -->
      <div class="flex-1 max-w-2xl mx-4 lg:mx-12">
        <div class="relative group">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            class="block w-full pl-10 pr-3 py-2 border border-[#333] rounded-full leading-5 bg-[#0f0f0f] text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-[#1a1a1a] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-300" 
            placeholder="搜索股票 / 策略 / 主题..." 
          />
          <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span class="text-gray-600 text-xs border border-gray-700 rounded px-1.5 py-0.5">Ctrl K</span>
          </div>
        </div>
      </div>

      <!-- Right: User Profile -->
      <div class="flex items-center gap-4">
        <button class="p-2 text-gray-400 hover:text-white transition-colors relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#1a1a1a]"></span>
        </button>
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm border border-[#444] cursor-pointer hover:border-white transition-colors">
          U
        </div>
      </div>
    </nav>

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

      <!-- Attribution Header (Inside Main) -->
      <div v-if="activeTab === 'attribution'" class="px-4 pb-6 flex-shrink-0 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">Global Market Attribution</h1>
          <p class="text-gray-400 text-sm">Real-time event analysis across global markets.</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Pagination Controls -->
          <div class="flex items-center bg-[#2a2a2a] rounded border border-[#333]">
            <button 
              @click="changeAttributionPage(-1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-r border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentAttributionPage === 0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <span class="px-3 text-xs text-gray-500 font-mono">{{ currentAttributionPage + 1 }} / {{ totalAttributionPages }}</span>
            <button 
              @click="changeAttributionPage(1)" 
              class="p-2 text-gray-400 hover:text-white hover:bg-[#333] border-l border-[#333] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              :disabled="currentAttributionPage >= totalAttributionPages - 1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
          
          <div class="h-6 w-px bg-[#333]"></div>

          <div class="flex gap-2">
            <button class="px-3 py-1 text-xs bg-[#2a2a2a] text-white rounded border border-[#333] hover:border-gray-500">All Sectors</button>
            <button class="px-3 py-1 text-xs bg-[#2a2a2a] text-white rounded border border-[#333] hover:border-gray-500">Newest First</button>
          </div>
        </div>
      </div>

      <!-- Tab: Opportunities (Waterfall) -->
      <div v-if="activeTab === 'opportunities'" class="w-full px-4 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          <!-- Cards -->
          <div 
            v-for="(opp, index) in filteredOpportunities" 
            :key="opp.id + '-' + index" 
            class="group relative bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#333] hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 cursor-pointer flex flex-col h-[320px]"
          >
            <!-- Image/Cover Area -->
            <div class="h-40 bg-[#222] relative overflow-hidden">
              <!-- Placeholder Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br opacity-80 group-hover:scale-110 transition-transform duration-700" :class="getGradientClass(index)"></div>
              
              <!-- Symbol Badge -->
              <div class="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                {{ opp.symbol }}
              </div>
              
              <!-- Score Badge -->
              <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-green-400 border border-white/10 flex items-center gap-1">
                <span>★</span> {{ opp.score }}
              </div>

              <!-- Type Badge (Bottom Left of Image) -->
              <div class="absolute bottom-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :class="opp.type === 'Long' ? 'bg-green-500/90 text-black' : 'bg-red-500/90 text-white'">
                {{ opp.type }}
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-4 flex flex-col flex-grow justify-between relative z-10 bg-[#1a1a1a]">
              <div>
                <h3 class="text-white font-bold text-lg leading-tight mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">{{ opp.title }}</h3>
                <div class="text-xs text-gray-500 mb-3">{{ opp.strategy }}</div>
              </div>
              
              <div class="flex items-end justify-between mt-auto">
                <div>
                  <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Return</div>
                  <div class="text-xl font-bold text-green-400">+{{ opp.return }}%</div>
                </div>
                <div class="text-right">
                  <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Risk</div>
                  <div class="text-xs font-medium text-yellow-500">{{ opp.risk }}</div>
                </div>
              </div>
            </div>

            <!-- Hover Overlay (Details) -->
            <div class="absolute inset-0 bg-[#1a1a1a]/95 backdrop-blur-sm p-5 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none group-hover:pointer-events-auto">
              <div class="flex justify-between items-start mb-4">
                <span class="text-blue-400 text-xs font-bold uppercase tracking-wider">AI Analysis</span>
                <button class="text-gray-400 hover:text-white">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                </button>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-6">
                {{ opp.reason }}
              </p>
              <div class="mt-auto">
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in opp.tags" :key="tag" class="text-[10px] bg-[#333] text-gray-400 px-2 py-1 rounded border border-[#444]">{{ tag }}</span>
                </div>
                <button class="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20">
                  View Strategy
                </button>
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
        <div class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          
          <!-- Theme Card -->
          <div v-for="theme in themes" :key="theme.id" class="break-inside-avoid bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden hover:border-gray-500 transition-colors group">
            
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
              
              <!-- Heat Bar -->
              <div class="w-full h-1 bg-gray-700 rounded-full overflow-hidden mb-3">
                <div class="h-full" 
                  :class="theme.sentiment === 'Bullish' ? 'bg-green-500' : 'bg-red-500'"
                  :style="{ width: theme.heat + '%' }"></div>
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
        <div class="grid grid-cols-4 gap-6 items-start">
          
          <!-- Market Column -->
          <div v-for="market in visibleMarkets" :key="market.id" class="flex flex-col bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
            
            <!-- Column Header -->
            <div class="p-4 border-b border-[#333] bg-[#222] flex justify-between items-center">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ market.flag }}</span>
                <h3 class="font-bold text-white">{{ market.name }}</h3>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full" :class="market.isOpen ? 'bg-green-500 animate-pulse' : 'bg-gray-500'"></span>
                <span class="text-xs text-gray-400 uppercase">{{ market.isOpen ? 'Open' : 'Closed' }}</span>
              </div>
            </div>

            <!-- Events List (Natural Height) -->
            <div class="p-4 space-y-4">
              <div v-for="event in market.events" :key="event.id" class="relative pl-4 border-l-2 border-[#333] hover:border-blue-500/50 transition-colors group">
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
                    
                    <!-- Stock Data Block -->
                    <div class="bg-[#111] rounded p-2 flex items-center gap-3 border border-[#333/50]">
                      <!-- Logo Placeholder -->
                      <div class="w-8 h-8 rounded bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333]">
                        {{ event.stock.symbol[0] }}
                      </div>
                      
                      <!-- Info -->
                      <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-baseline">
                          <span class="text-sm font-bold text-white">{{ event.stock.symbol }}</span>
                          <span class="text-xs font-mono font-medium" :class="event.stock.change >= 0 ? 'text-green-400' : 'text-red-400'">
                            {{ event.stock.change >= 0 ? '+' : '' }}{{ event.stock.change }}%
                          </span>
                        </div>
                        <div class="flex justify-between items-center mt-0.5">
                          <span class="text-[10px] text-gray-500 truncate">{{ event.stock.name }}</span>
                          <span class="text-xs font-bold text-gray-300">{{ event.stock.price }}</span>
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
              <div v-if="market.isLoading" class="py-4 flex flex-col items-center gap-2">
                <div class="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span class="text-xs text-gray-500">Loading history...</span>
              </div>
              
              <!-- End of History -->
              <div v-if="!market.isLoading && market.events.length > 50" class="py-4 text-center">
                <span class="text-xs text-gray-600">No more events</span>
              </div>
              
              <!-- Sentinel for Intersection Observer -->
              <div :ref="el => setAttributionSentinel(el, market.id)" class="h-4 w-full"></div>
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

    <!-- 4. Filter Button & Content Switcher (Bottom Right) -->
    <div class="fixed bottom-8 right-8 z-40 flex items-center gap-3">
      <!-- Content Switcher (Following/Recommended) -->
      <div class="bg-[#1a1a1a] border border-[#333] rounded-full p-1 flex items-center shadow-xl">
        <button 
          @click="contentFilter = 'recommended'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="contentFilter === 'recommended' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'"
        >
          Recommended
        </button>
        <button 
          @click="contentFilter = 'following'"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="contentFilter === 'following' ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-300'"
        >
          Following
        </button>
      </div>

      <!-- Filter Button -->
      <button 
        @click="showFilterModal = true"
        class="w-12 h-12 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] rounded-full flex items-center justify-center text-white shadow-xl transition-all hover:scale-110 group"
      >
        <svg class="w-5 h-5 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
      </button>
    </div>

    <!-- 5. Back to Top (Bottom Left) -->
    <button 
      @click="scrollToTop"
      class="fixed bottom-8 left-8 z-40 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
    </button>

    <!-- 6. Filter Modal Overlay -->
    <transition name="fade">
      <div v-if="showFilterModal" class="fixed inset-0 z-50 flex justify-end">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showFilterModal = false"></div>
        
        <!-- Sidebar Panel -->
        <div class="relative w-80 h-full bg-[#1a1a1a] border-l border-[#333] shadow-2xl transform transition-transform duration-300 flex flex-col">
          <!-- Header -->
          <div class="p-6 border-b border-[#333] flex justify-between items-center">
            <h3 class="text-lg font-bold text-white">Filters</h3>
            <button @click="showFilterModal = false" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <!-- Content (Empty Container) -->
          <div class="flex-grow p-6 overflow-y-auto">
            <!-- Placeholder for filter options -->
            <div class="space-y-6">
              <div class="h-4 bg-[#333] rounded w-1/3"></div>
              <div class="space-y-3">
                <div class="h-8 bg-[#2a2a2a] rounded border border-[#333]"></div>
                <div class="h-8 bg-[#2a2a2a] rounded border border-[#333]"></div>
                <div class="h-8 bg-[#2a2a2a] rounded border border-[#333]"></div>
              </div>
              
              <div class="h-px bg-[#333] my-4"></div>
              
              <div class="h-4 bg-[#333] rounded w-1/2"></div>
              <div class="space-y-3">
                <div class="h-8 bg-[#2a2a2a] rounded border border-[#333]"></div>
                <div class="h-8 bg-[#2a2a2a] rounded border border-[#333]"></div>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// UI State
const showBackToTop = ref(false)
const showFilterModal = ref(false)
const contentFilter = ref('recommended') // 'recommended' or 'following'

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

// Scroll Handler for Back to Top
const handleWindowScroll = () => {
  // Check both window scroll and document element scroll
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  showBackToTop.value = scrollTop > 300
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

const activeTab = ref('opportunities')
const isLoading = ref(false)
const loadSentinel = ref(null)
let observer = null

// --- Attribution Logic ---
const currentAttributionPage = ref(0)
const itemsPerAttributionPage = 4

const markets = ref([
  { id: 'us', name: 'US Market', flag: '🇺🇸', isOpen: true, events: [], isLoading: false },
  { id: 'hk', name: 'HK Market', flag: '🇭🇰', isOpen: false, events: [], isLoading: false },
  { id: 'cn', name: 'CN Market', flag: '🇨🇳', isOpen: false, events: [], isLoading: false },
  { id: 'jp', name: 'JP Market', flag: '🇯🇵', isOpen: true, events: [], isLoading: false },
  { id: 'eu', name: 'EU Market', flag: '🇪🇺', isOpen: true, events: [], isLoading: false },
  { id: 'uk', name: 'UK Market', flag: '🇬🇧', isOpen: true, events: [], isLoading: false },
  { id: 'in', name: 'IN Market', flag: '🇮🇳', isOpen: true, events: [], isLoading: false },
  { id: 'au', name: 'AU Market', flag: '🇦🇺', isOpen: false, events: [], isLoading: false }
])

const totalAttributionPages = computed(() => Math.ceil(markets.value.length / itemsPerAttributionPage))

const visibleMarkets = computed(() => {
  const start = currentAttributionPage.value * itemsPerAttributionPage
  return markets.value.slice(start, start + itemsPerAttributionPage)
})

const changeAttributionPage = (delta) => {
  const newPage = currentAttributionPage.value + delta
  if (newPage >= 0 && newPage < totalAttributionPages.value) {
    currentAttributionPage.value = newPage
  }
}

// Mock Data Generator for Events
const generateEvents = (marketId, count, startIndex) => {
  const templates = {
    'us': [
      { title: 'NVDA Chip Delay', desc: '芯片发布推迟消息引发市场担忧，多家投行下调目标价。', stock: { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$485.09', change: -3.45 }, tags: ['Chips', 'AI'], image: 'https://placehold.co/400x200/1a4d2e/white?text=NVDA+Chip' },
      { title: 'Tesla Recall', desc: '自动驾驶软件问题宣布召回部分车辆，股价承压。', stock: { symbol: 'TSLA', name: 'Tesla Inc', price: '$235.45', change: 1.80 }, tags: ['EV', 'Auto'], image: 'https://placehold.co/400x200/4d1a1a/white?text=Tesla+Recall' },
      { title: 'Apple Vision Pro', desc: '预售火爆超出预期，供应链传出增产消息。', stock: { symbol: 'AAPL', name: 'Apple Inc', price: '$192.50', change: 1.20 }, tags: ['Tech', 'VR'], image: 'https://placehold.co/400x200/222/white?text=Vision+Pro' },
      { title: 'Fed Rate Decision', desc: '美联储暗示维持利率不变，市场解读为鸽派信号。', stock: { symbol: 'SPY', name: 'S&P 500 ETF', price: '$475.00', change: 0.85 }, tags: ['Macro', 'Fed'], image: 'https://placehold.co/400x200/333/white?text=Fed+Rate' }
    ],
    'hk': [
      { title: 'Tencent Gaming', desc: '新批号发放，游戏板块集体反弹，腾讯领涨。', stock: { symbol: '0700.HK', name: 'Tencent', price: 'HK$320.00', change: 2.50 }, tags: ['Gaming', 'Tech'], image: 'https://placehold.co/400x200/1a4d2e/white?text=Tencent' },
      { title: 'Alibaba Cloud', desc: '阿里云分拆计划重启传闻，管理层未予置评。', stock: { symbol: '9988.HK', name: 'Alibaba', price: 'HK$76.50', change: 1.10 }, tags: ['Cloud', 'E-com'], image: 'https://placehold.co/400x200/333/white?text=Alibaba' },
      { title: 'EV Price War', desc: '比亚迪宣布新一轮降价，引发汽车股普跌。', stock: { symbol: '1211.HK', name: 'BYD Co', price: 'HK$205.00', change: -2.30 }, tags: ['EV', 'Auto'], image: 'https://placehold.co/400x200/4d1a1a/white?text=BYD' }
    ],
    'cn': [
      { title: 'Moutai Dividend', desc: '茅台董事会批准实施特别分红方案，股息率提升。', stock: { symbol: '600519', name: 'Kweichow Moutai', price: '¥1750.00', change: 1.50 }, tags: ['Consumer', 'Liquor'], image: 'https://placehold.co/400x200/1a4d2e/white?text=Moutai' },
      { title: 'Solar Policy', desc: '光伏行业新规出台，限制低端产能扩张。', stock: { symbol: '601012', name: 'Longi Green', price: '¥22.50', change: -1.20 }, tags: ['Solar', 'Energy'], image: 'https://placehold.co/400x200/4d1a1a/white?text=Solar' },
      { title: 'Bank Support', desc: '央行降准落地，银行板块流动性改善。', stock: { symbol: '600036', name: 'CM Bank', price: '¥30.20', change: 0.90 }, tags: ['Bank', 'Finance'], image: 'https://placehold.co/400x200/333/white?text=Bank' }
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
      stock: {
        ...template.stock,
        change: parseFloat((template.stock.change + (Math.random() - 0.5)).toFixed(2))
      }
    }
  })
}

// Initialize Attribution Data
markets.value.forEach(market => {
  const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
  market.events = generateEvents(templateId, 20, 0)
})

// Attribution Infinite Scroll
const attributionSentinels = ref({})
let attributionObservers = {}

const setAttributionSentinel = (el, marketId) => {
  if (el) {
    attributionSentinels.value[marketId] = el
    setupAttributionObserver(marketId, el)
  }
}

const setupAttributionObserver = (marketId, el) => {
  if (attributionObservers[marketId]) attributionObservers[marketId].disconnect()

  attributionObservers[marketId] = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreAttributionEvents(marketId)
    }
  }, { rootMargin: '200px' })

  attributionObservers[marketId].observe(el)
}

const loadMoreAttributionEvents = async (marketId) => {
  const market = markets.value.find(m => m.id === marketId)
  if (!market || market.isLoading || market.events.length > 50) return

  market.isLoading = true
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const templateId = ['us', 'hk', 'cn'].includes(market.id) ? market.id : 'us'
  const newEvents = generateEvents(templateId, 5, market.events.length)
  market.events.push(...newEvents)
  
  market.isLoading = false
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
    
    return {
      id,
      title: `${template.title} ${Math.floor(id / themeTemplates.length) > 0 ? '#' + (Math.floor(id / themeTemplates.length) + 1) : ''}`,
      sentiment: template.sentiment,
      heat,
      desc: template.desc,
      totalItems: template.items.length + Math.floor(Math.random() * 5),
      items: template.items.map((item, idx) => ({
        id: id * 100 + idx,
        ...item,
        // Randomize change slightly
        change: item.change ? parseFloat((item.change + (Math.random() - 0.5)).toFixed(2)) : null
      }))
    }
  })
}

// Initialize themes
themes.value = generateMoreThemes(20, 0)

// Gradient Helper
const gradients = [
  'from-blue-600 to-purple-600',
  'from-emerald-600 to-teal-600',
  'from-orange-600 to-red-600',
  'from-pink-600 to-rose-600',
  'from-indigo-600 to-blue-600',
  'from-cyan-600 to-blue-600',
  'from-fuchsia-600 to-purple-600',
  'from-amber-600 to-orange-600'
]

const getGradientClass = (index) => {
  return gradients[index % gradients.length]
}

// Tab Switching Logic
const switchTab = (tabId) => {
  activeTab.value = tabId
  // Update URL without reloading
  router.replace({ query: { ...route.query, tab: tabId } })
}

// Infinite Scroll Logic
const loadMore = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  
  if (activeTab.value === 'opportunities') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newItems = generateMockOpportunities(10, opportunities.value.length)
    opportunities.value.push(...newItems)
  } else if (activeTab.value === 'themes') {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600))
    
    const newThemes = generateMoreThemes(12, themes.value.length)
    themes.value.push(...newThemes)
  }
  
  isLoading.value = false
}

// Lifecycle Hooks
onMounted(() => {
  // Initialize tab from URL
  if (route.query.tab && tabs.some(t => t.id === route.query.tab)) {
    activeTab.value = route.query.tab
  } else {
    // Default to opportunities and set URL
    switchTab('opportunities')
  }

  // Setup Intersection Observer for Infinite Scroll
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  }, { rootMargin: '400px' })

  if (loadSentinel.value) {
    observer.observe(loadSentinel.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  Object.values(attributionObservers).forEach(obs => obs.disconnect())
})

// Watch for tab changes to re-attach observer if needed
watch(activeTab, (newTab) => {
  if (newTab === 'opportunities' || newTab === 'themes') {
    // Wait for DOM update
    setTimeout(() => {
      if (loadSentinel.value && observer) {
        observer.disconnect()
        observer.observe(loadSentinel.value)
      }
    }, 100)
  } else if (newTab === 'attribution') {
    // Re-setup attribution observers if needed
    nextTick(() => {
      visibleMarkets.value.forEach(market => {
        const el = attributionSentinels.value[market.id]
        if (el) setupAttributionObserver(market.id, el)
      })
    })
  }
})
</script>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f0f0f; 
}
::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
/* Vertical Scrollbar for Columns */
.custom-scrollbar-y::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar-y::-webkit-scrollbar-track {
  background: transparent; 
}
.custom-scrollbar-y::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 3px;
}
.custom-scrollbar-y::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>