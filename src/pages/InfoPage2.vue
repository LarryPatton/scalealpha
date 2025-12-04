<template>
  <div class="bg-[#0f0f0f] min-h-screen pb-20">
    <!-- Hero Section -->
    <section class="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
          Discover Your Next <br/>
          <span class="text-blue-500">Winning Trade</span>
        </h1>
        <p class="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          AI analyzes thousands of data points to uncover high-conviction trading opportunities. 
          Get actionable strategies with clear entry, exit, and risk parameters.
        </p>

        <!-- Workflow Animation (Signal Flow) -->
        <div class="bg-[#1a1a1a]/50 p-8 rounded-2xl border border-[#333] backdrop-blur-sm max-w-4xl mx-auto">
          <div class="flex items-center justify-between relative max-w-3xl mx-auto py-4">
             <!-- Connecting Line Background -->
             <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0 overflow-hidden">
               <!-- Moving Signal -->
               <div class="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-signal-flow"></div>
             </div>
             
             <!-- Steps -->
             <div v-for="step in steps" :key="step.id" class="relative z-10 flex flex-col items-center group">
               <!-- Step Circle/Box -->
               <div class="w-32 h-10 rounded-lg flex items-center justify-center bg-[#0f0f0f] border border-gray-600 text-gray-400 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors duration-300 z-10 relative shadow-lg">
                 <div class="w-2 h-2 rounded-full mr-2 bg-gray-600 group-hover:bg-purple-400 transition-colors"></div>
                 <span class="font-medium text-sm">{{ step.label }}</span>
               </div>
               <!-- Pulse Effect behind the box -->
               <div class="absolute inset-0 bg-purple-500/20 rounded-lg blur-md opacity-0 animate-pulse-step"></div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Button Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
      <div class="flex justify-center">
        <button @click="navigateToOpportunity" class="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <span class="relative z-10">生成我的策略</span>
          <div class="absolute inset-0 rounded-xl bg-blue-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
        </button>
      </div>
    </div>

    <!-- Visual Divider -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="relative flex items-center">
        <div class="flex-grow border-t border-gray-700"></div>
        <span class="flex-shrink mx-4 text-gray-500 text-sm">●</span>
        <div class="flex-grow border-t border-gray-700"></div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <!-- Stats Section -->
      <div class="grid grid-cols-3 gap-4 bg-[#1a1a1a] rounded-xl border border-[#333] p-6 mb-12 shadow-xl">
        <div class="text-center border-r border-[#333] last:border-0">
          <div class="text-3xl font-bold text-white mb-1">8</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">Strategies Today</div>
        </div>
        <div class="text-center border-r border-[#333] last:border-0">
          <div class="text-3xl font-bold text-white mb-1">3</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">Active Themes</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-yellow-500 mb-1">0</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">New Events</div>
        </div>
      </div>

      <!-- Module 3: Opportunities (机会推荐) -->
      <div class="mb-12">
        <div class="flex flex-col gap-4 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <h2 class="text-xl font-bold text-white flex items-center gap-2">
                🎯 机会推荐 <span class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{{ opportunitiesData.recommend.length }}</span>
              </h2>
              <!-- Tabs -->
              <div class="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
                <button 
                  @click="activeTabOpportunities = 'recommend'"
                  class="px-4 py-1 text-sm rounded-md transition-all"
                  :class="activeTabOpportunities === 'recommend' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
                >
                  推荐
                </button>
                <button 
                  @click="activeTabOpportunities = 'following'"
                  class="px-4 py-1 text-sm rounded-md transition-all"
                  :class="activeTabOpportunities === 'following' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
                >
                  关注
                </button>
              </div>
            </div>
            <router-link to="/opportunities" class="text-sm text-gray-500 hover:text-white transition-colors">查看所有机会 ></router-link>
          </div>

          <!-- Filters (Only for Opportunities) -->
          <div class="flex items-center gap-6 border-b border-[#333] pb-2">
            <button 
              v-for="filter in oppFilters" 
              :key="filter.value"
              @click="activeOppFilter = filter.value"
              class="text-sm font-medium pb-2 relative transition-colors"
              :class="activeOppFilter === filter.value ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'"
            >
              {{ filter.label }}
              <div v-if="activeOppFilter === filter.value" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full"></div>
            </button>
          </div>
        </div>

        <!-- Content Area -->
        <div v-if="activeTabOpportunities === 'recommend' || (activeTabOpportunities === 'following' && opportunitiesData.following && opportunitiesData.following.length > 0)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Opportunity Cards -->
          <div v-for="opp in currentOpportunities" :key="opp.id" @click="navigateToStrategy(opp)" class="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden hover:border-blue-500/50 transition-all group relative cursor-pointer">
            <div class="p-5">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center gap-3">
                  <div class="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded border border-blue-900/50">{{ opp.symbol }}</div>
                  <div class="flex items-center gap-1 text-xs text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded">
                    <span>★</span> {{ opp.score }}分
                  </div>
                </div>
                <div class="text-xs font-bold px-2 py-1 rounded" :class="opp.type === 'Long' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'">
                  {{ opp.type }}
                </div>
              </div>
              
              <h3 class="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{{ opp.title }}</h3>
              <div class="flex items-center gap-2 text-[10px] text-gray-500 mb-4">
                <span>{{ opp.strategy }}</span>
                <span>•</span>
                <span>{{ opp.period }}</span>
              </div>

              <div class="flex items-end justify-between mb-4">
                <div>
                  <div class="text-[10px] text-gray-500 mb-0.5">预期收益</div>
                  <div class="text-xl font-bold text-green-500">+{{ opp.return }}%</div>
                </div>
                <div class="text-right">
                   <div class="text-[10px] text-gray-500 mb-0.5">风险等级</div>
                   <div class="text-xs font-medium text-yellow-500">{{ opp.risk }}</div>
                </div>
              </div>

              <p class="text-xs text-gray-400 line-clamp-2 mb-4 h-8">
                {{ opp.reason }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tag in opp.tags" :key="tag" class="text-[10px] bg-[#2a2a2a] text-gray-500 px-1.5 py-0.5 rounded border border-[#333]">{{ tag }}</span>
              </div>
            </div>
            
            <div class="bg-[#222] px-5 py-3 border-t border-[#333] flex justify-between items-center group-hover:bg-[#2a2a2a] transition-colors cursor-pointer">
              <span class="text-xs text-gray-400 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AI 推荐
              </span>
              <div class="flex items-center gap-3">
                <span class="text-xs text-blue-400 font-medium flex items-center">
                  查看详情 <span class="ml-1">→</span>
                </span>
                <!-- Save Button -->
                <button 
                  @click.stop="openSaveModal(opp)"
                  class="text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1"
                  :class="opp.isSaved ? 'bg-blue-900/30 text-blue-400 border-blue-900/50' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
                >
                  <span v-if="opp.isSaved">✓ 已保存</span>
                  <span v-else>💾 保存</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State for Following (Opportunities) -->
        <div v-else class="bg-[#1a1a1a] rounded-xl border border-[#333] p-8 text-center">
          <div class="mb-8">
            <div class="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <h3 class="text-lg font-medium text-white mb-2">您还没有保存任何策略机会</h3>
            <p class="text-gray-500 text-sm">保存感兴趣的策略，随时查看和跟踪</p>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-[#333]"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-[#1a1a1a] text-sm text-gray-500">👇 AI 为您推荐 (Recommended by AI) 👇</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 text-left">
            <div v-for="opp in opportunitiesData.recommend.slice(0, 4)" :key="opp.id" @click="navigateToStrategy(opp)" class="bg-[#2a2a2a] rounded-xl border border-[#333] overflow-hidden hover:border-blue-500/50 transition-all group relative cursor-pointer">
              <div class="p-5">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex items-center gap-3">
                    <div class="px-2 py-1 bg-blue-900/30 text-blue-400 text-xs font-bold rounded border border-blue-900/50">{{ opp.symbol }}</div>
                    <div class="flex items-center gap-1 text-xs text-green-400 bg-green-900/20 px-1.5 py-0.5 rounded">
                      <span>★</span> {{ opp.score }}分
                    </div>
                  </div>
                  <div class="text-xs font-bold px-2 py-1 rounded" :class="opp.type === 'Long' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'">
                    {{ opp.type }}
                  </div>
                </div>
                
                <h3 class="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{{ opp.title }}</h3>
                <div class="flex items-center gap-2 text-[10px] text-gray-500 mb-4">
                  <span>{{ opp.strategy }}</span>
                  <span>•</span>
                  <span>{{ opp.period }}</span>
                </div>

                <div class="flex items-end justify-between mb-4">
                  <div>
                    <div class="text-[10px] text-gray-500 mb-0.5">预期收益</div>
                    <div class="text-xl font-bold text-green-500">+{{ opp.return }}%</div>
                  </div>
                  <div class="text-right">
                     <div class="text-[10px] text-gray-500 mb-0.5">风险等级</div>
                     <div class="text-xs font-medium text-yellow-500">{{ opp.risk }}</div>
                  </div>
                </div>

                <p class="text-xs text-gray-400 line-clamp-2 mb-4 h-8">
                  {{ opp.reason }}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in opp.tags" :key="tag" class="text-[10px] bg-[#1a1a1a] text-gray-500 px-1.5 py-0.5 rounded border border-[#333]">{{ tag }}</span>
                </div>
              </div>
              
              <div class="bg-[#111] px-5 py-3 border-t border-[#333] flex justify-between items-center group-hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                <span class="text-xs text-gray-400 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AI 推荐
                </span>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-blue-400 font-medium flex items-center">
                    查看详情 <span class="ml-1">→</span>
                  </span>
                  <button 
                    @click.stop="openSaveModal(opp)"
                    class="text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1 bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500"
                  >
                    💾 保存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Module 1: Market Themes -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              🔥 Hot Market Themes <span class="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{{ themesData.recommend.length }}</span>
            </h2>
            <!-- Tabs -->
            <div class="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
              <button 
                @click="activeTabThemes = 'recommend'"
                class="px-4 py-1 text-sm rounded-md transition-all"
                :class="activeTabThemes === 'recommend' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
              >
                推荐
              </button>
              <button 
                @click="activeTabThemes = 'following'"
                class="px-4 py-1 text-sm rounded-md transition-all"
                :class="activeTabThemes === 'following' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
              >
                关注
              </button>
            </div>
          </div>
          <router-link to="/opportunities?tab=themes" class="text-sm text-gray-500 hover:text-white transition-colors">View All ></router-link>
        </div>

        <!-- Content Area -->
        <div v-if="activeTabThemes === 'recommend' || (activeTabThemes === 'following' && currentThemes.length > 0)" class="space-y-4">
          <!-- Theme Cards -->
          <div v-for="theme in currentThemes" :key="theme.id" @click="toggleExpandTheme(theme)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer">
            <div class="flex flex-col md:flex-row gap-6">
              <!-- Left: Sentiment & Confidence -->
              <div class="md:w-48 flex-shrink-0">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-bold px-2 py-1 rounded border" 
                    :class="{
                      'bg-green-900/30 text-green-400 border-green-900/50': theme.sentiment === 'BULLISH',
                      'bg-gray-700/30 text-gray-400 border-gray-700/50': theme.sentiment === 'NEUTRAL',
                      'bg-red-900/30 text-red-400 border-red-900/50': theme.sentiment === 'BEARISH'
                    }">
                    {{ theme.sentiment }}
                  </span>
                  <span class="text-sm font-bold text-white">{{ theme.confidence }}%</span>
                </div>
                <div class="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full" 
                    :class="{
                      'bg-green-500': theme.sentiment === 'BULLISH',
                      'bg-gray-500': theme.sentiment === 'NEUTRAL',
                      'bg-red-500': theme.sentiment === 'BEARISH'
                    }"
                    :style="{ width: theme.confidence + '%' }"></div>
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

              <!-- Right: Meta (placeholder for consistency) -->
              <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                <div class="text-xs text-gray-500">今天</div>
              </div>
            </div>
            
            <!-- Follow Button -->
            <button 
              @click.stop="toggleFollow('themes', theme)"
              class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
              :class="theme.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
            >
              {{ theme.isFollowed ? '✓ 已关注' : '+ 关注' }}
            </button>

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
                <button @click.stop="toggleExpandTheme(theme)" class="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                  收起 (Collapse) 🔼
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State for Following -->
        <div v-else class="bg-[#1a1a1a] rounded-xl border border-[#333] p-8 text-center">
          <div class="mb-8">
            <div class="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
            </div>
            <h3 class="text-lg font-medium text-white mb-2">您还没有关注任何市场热点</h3>
            <p class="text-gray-500 text-sm">关注感兴趣的主题，获取实时动态推送</p>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-[#333]"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-[#1a1a1a] text-sm text-gray-500">👇 猜你感兴趣 (Recommended for You) 👇</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            <div v-for="theme in themesData.suggested" :key="theme.id" class="bg-[#2a2a2a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative">
              <div class="flex justify-between items-start mb-3">
                <span class="text-xs font-bold px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-900/50">{{ theme.sentiment }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-green-500" :style="{ width: theme.confidence + '%' }"></div>
                  </div>
                  <span class="text-xs text-gray-400">{{ theme.confidence }}%</span>
                </div>
              </div>
              
              <!-- Follow Button -->
              <button 
                @click.stop="toggleFollow('themes', theme)"
                class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                :class="theme.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
              >
                {{ theme.isFollowed ? '✓ 已关注' : '+ 关注' }}
              </button>

              <h3 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors pr-16">{{ theme.title }}</h3>
              <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ theme.desc }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="stock in theme.stocks" :key="stock" class="text-xs bg-[#1a1a1a] text-gray-300 px-2 py-1 rounded border border-[#333]">{{ stock }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Module 2: Stock Attribution -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              📊 事件分析 <span class="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full">{{ attributionData.recommend.length }}</span>
            </h2>
            <!-- Tabs -->
            <div class="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333]">
              <button 
                @click="activeTabAttribution = 'recommend'"
                class="px-4 py-1 text-sm rounded-md transition-all"
                :class="activeTabAttribution === 'recommend' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
              >
                推荐
              </button>
              <button 
                @click="activeTabAttribution = 'following'"
                class="px-4 py-1 text-sm rounded-md transition-all"
                :class="activeTabAttribution === 'following' ? 'bg-[#333] text-white shadow' : 'text-gray-500 hover:text-gray-300'"
              >
                关注
              </button>
            </div>
          </div>
          <router-link to="/opportunities?tab=events" class="text-sm text-gray-500 hover:text-white transition-colors">View All ></router-link>
        </div>

        <!-- Content Area -->
        <div v-if="activeTabAttribution === 'recommend' || (activeTabAttribution === 'following' && currentAttributions.length > 0)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Attribution Cards -->
          <div v-for="item in currentAttributions" :key="item.id" @click="goToStockDetail(item.symbol)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-4 hover:border-gray-500 transition-colors relative group cursor-pointer">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-[#2a2a2a] flex items-center justify-center text-xs font-bold text-white border border-[#333]">{{ item.symbol[0] }}</div>
                <div>
                  <div class="font-bold text-white leading-none">{{ item.symbol }}</div>
                  <div class="text-[10px] text-gray-500 mt-0.5">{{ item.name }}</div>
                </div>
              </div>
              <div class="text-right flex items-center gap-2">
                <div>
                  <div class="text-sm font-bold text-white">${{ item.price }}</div>
                  <div class="text-xs font-medium" :class="item.change >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
                  </div>
                </div>
                <!-- Follow Button (Small) -->
                <button 
                  @click.stop="toggleFollow('attribution', item)"
                  class="w-6 h-6 flex items-center justify-center rounded border transition-colors"
                  :class="item.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
                >
                  {{ item.isFollowed ? '✓' : '+' }}
                </button>
              </div>
            </div>
            <p class="text-xs text-gray-400 leading-relaxed border-t border-[#333] pt-3">
              {{ item.reason }}
            </p>
            <div class="mt-3 flex gap-2">
              <span v-for="tag in item.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-[#2a2a2a] text-gray-500 rounded border border-[#333]">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- Empty State for Following -->
        <div v-else class="bg-[#1a1a1a] rounded-xl border border-[#333] p-8 text-center">
          <div class="mb-8">
            <div class="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 class="text-lg font-medium text-white mb-2">暂无关注个股的异动分析</h3>
            <p class="text-gray-500 text-sm">关注感兴趣的股票，获取实时归因分析</p>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-[#333]"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="px-3 bg-[#1a1a1a] text-sm text-gray-500">👇 猜你感兴趣 (Recommended for You) 👇</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 text-left">
            <div v-for="item in attributionData.suggested" :key="item.id" @click="goToStockDetail(item.symbol)" class="bg-[#2a2a2a] rounded-xl border border-[#333] p-4 hover:border-gray-500 transition-colors relative group cursor-pointer">
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-white border border-[#333]">{{ item.symbol[0] }}</div>
                  <div>
                    <div class="font-bold text-white leading-none">{{ item.symbol }}</div>
                    <div class="text-[10px] text-gray-500 mt-0.5">{{ item.name }}</div>
                  </div>
                </div>
                <div class="text-right flex items-center gap-2">
                  <div>
                    <div class="text-sm font-bold text-white">${{ item.price }}</div>
                    <div class="text-xs font-medium" :class="item.change >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ item.change >= 0 ? '+' : '' }}{{ item.change }}%
                    </div>
                  </div>
                  <!-- Follow Button (Small) -->
                  <button 
                    @click.stop="toggleFollow('attribution', item)"
                    class="w-6 h-6 flex items-center justify-center rounded border transition-colors"
                    :class="item.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
                  >
                    {{ item.isFollowed ? '✓' : '+' }}
                  </button>
                </div>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed border-t border-[#333] pt-3">
                {{ item.reason }}
              </p>
              <div class="mt-3 flex gap-2">
                <span v-for="tag in item.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 bg-[#1a1a1a] text-gray-500 rounded border border-[#333]">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Group Modal -->
      <div v-if="showSaveModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-full max-w-md p-6 shadow-2xl transform transition-all">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-white">保存到分组</h3>
            <button @click="showSaveModal = false" class="text-gray-500 hover:text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div class="space-y-3 mb-6">
            <label v-for="group in availableGroups" :key="group.id" class="flex items-center p-3 rounded-lg border border-[#333] hover:bg-[#2a2a2a] cursor-pointer transition-colors">
              <input type="checkbox" :value="group.id" v-model="selectedGroups" class="w-4 h-4 text-blue-500 rounded border-gray-600 bg-[#1a1a1a] focus:ring-blue-500 focus:ring-offset-[#1a1a1a]">
              <span class="ml-3 text-sm text-gray-300">{{ group.name }}</span>
            </label>
            
            <button class="flex items-center text-sm text-blue-400 hover:text-blue-300 mt-2 px-1">
              <span class="text-lg mr-1">+</span> 新建分组
            </button>
          </div>
          
          <div class="flex gap-3">
            <button @click="showSaveModal = false" class="flex-1 px-4 py-2 rounded-lg border border-[#333] text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
              取消
            </button>
            <button @click="confirmSave" class="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium">
              确认保存
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Workflow Steps
const steps = [
  { id: 1, label: 'Info', icon: 'info' },
  { id: 2, label: '我的信息', icon: 'user' },
  { id: 3, label: '机会发现', icon: 'search' },
  { id: 4, label: '计划制定', icon: 'plan' }
]

// --- State Management ---
const activeTabThemes = ref('recommend')
const activeTabAttribution = ref('recommend')
const activeTabOpportunities = ref('recommend')
const activeOppFilter = ref('all')

const showSaveModal = ref(false)
const currentSavingItem = ref(null)
const selectedGroups = ref([])
const availableGroups = ref([
  { id: 'official', name: '官方推荐' },
  { id: 'watchlist', name: '重点观察' },
  { id: 'short_term', name: '短线机会' }
])

const oppFilters = [
  { label: 'All', value: 'all' },
  { label: 'Long', value: 'long' },
  { label: 'Short', value: 'short' },
  { label: 'Grade A+', value: 'grade_a' }
]

// --- Mock Data ---

// 1. Market Themes
const themesData = ref({
  recommend: [
    { 
      id: 1, 
      title: 'AI Infrastructure Boom', 
      desc: 'Enterprise AI adoption drives massive infrastructure investment across cloud and semiconductor sectors.', 
      sentiment: 'BULLISH', 
      confidence: 92, 
      stocks: ['NVDA', 'AMD', 'SMCI', 'AVGO'], 
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
      id: 3, 
      title: 'Rate Cut Expectations', 
      desc: 'Fed pivot hopes lift rate-sensitive sectors including banks and real estate.', 
      sentiment: 'NEUTRAL', 
      confidence: 65, 
      stocks: ['XLF', 'JPM', 'SCHW', 'BLK'], 
      isFollowed: false,
      isExpanded: false,
      content: 'Market participants are pricing in potential rate cuts later this year. This sentiment is providing a floor for financials and real estate, although sticky inflation data could delay the Fed\'s pivot.',
      stockDetails: [
        { symbol: 'XLF', change: 0.45, reason: 'Sector ETF benefiting from yield curve steepening expectations.' },
        { symbol: 'JPM', change: 0.80, reason: 'Best-in-class balance sheet; net interest income remains resilient.' },
        { symbol: 'SCHW', change: -1.50, reason: 'Cash sorting headwinds persist, though slowing down.' },
        { symbol: 'BLK', change: 1.20, reason: 'Asset management flows improving with market rally.' }
      ]
    }
  ],
  following: [], // Empty by default
  suggested: [
    { 
      id: 4, 
      title: 'EV Market Shift', 
      desc: 'Competition intensifies in the EV sector as traditional automakers ramp up production.', 
      sentiment: 'BEARISH', 
      confidence: 60, 
      stocks: ['TSLA', 'RIVN', 'F', 'GM'], 
      isFollowed: false,
      isExpanded: false,
      content: 'The EV market is transitioning from early adopters to mass market, leading to price wars. High interest rates are also dampening demand for big-ticket items.',
      stockDetails: [
        { symbol: 'TSLA', change: -3.50, reason: 'Margin compression fears due to price cuts; delivery guidance missed.' },
        { symbol: 'RIVN', change: -4.20, reason: 'Cash burn concerns; production ramp challenges.' },
        { symbol: 'F', change: 0.20, reason: 'Hybrid strategy paying off; pulling back on pure EV spend.' },
        { symbol: 'GM', change: 0.50, reason: 'Share buybacks supporting price; battery production improving.' }
      ]
    },
    { 
      id: 5, 
      title: 'Biotech Innovation', 
      desc: 'New gene therapies and weight-loss drugs drive renewed interest in the biotech sector.', 
      sentiment: 'BULLISH', 
      confidence: 72, 
      stocks: ['LLY', 'NVO', 'VRTX'], 
      isFollowed: false,
      isExpanded: false,
      content: 'The GLP-1 agonist revolution for obesity and diabetes is just the beginning. We are also seeing breakthroughs in gene editing (CRISPR) and Alzheimer\'s treatments, attracting capital back to the sector.',
      stockDetails: [
        { symbol: 'LLY', change: 2.75, reason: 'Mounjaro/Zepbound sales beating expectations; pipeline expansion.' },
        { symbol: 'NVO', change: 1.90, reason: 'Wegovy supply constraints easing; cardiovascular benefits confirmed.' },
        { symbol: 'VRTX', change: 0.60, reason: 'Dominance in cystic fibrosis; pain management drug shows promise.' }
      ]
    }
  ]
})

// 2. Stock Attribution
const attributionData = ref({
  recommend: [
    { id: 1, symbol: 'NVDA', name: 'NVIDIA Corp', price: '485.09', change: -3.45, reason: '芯片发布推迟消息引发市场担忧，多家投行下调目标价，数据中心业务营收预计将略微...', tags: ['Stock', '芯片', '财报前瞻'], isFollowed: false },
    { id: 2, symbol: 'TSLA', name: 'Tesla Inc', price: '235.45', change: 1.80, reason: '特斯拉自动驾驶软件问题宣布召回部分车辆，股价承压，分析师对Q4交付量持谨慎态度。', tags: ['Stock', '新能源', '监管'], isFollowed: false },
    { id: 3, symbol: 'MSFT', name: 'Microsoft', price: '378.25', change: -2.15, reason: 'Azure云服务营收增速超预期，AI产品Copilot商业化进展顺利，微软成为AI时代最大受益者之一。', tags: ['Stock', '云计算', 'AI应用'], isFollowed: false },
    { id: 4, symbol: 'AAPL', name: 'Apple Inc', price: '188.50', change: -0.95, reason: 'iPhone 15系列销量稳健，中国市场表现强劲，服务业务持续高增长，毛利率提升明显。', tags: ['Stock', '消费电子', '财报'], isFollowed: false }
  ],
  following: [], // Empty by default
  suggested: [
    { id: 5, symbol: 'GOOGL', name: 'Alphabet', price: '142.30', change: -1.75, reason: 'Google搜索广告收入恢复增长，Bard AI进展超预期，云业务盈利能力持续改善。', tags: ['Stock', '互联网', 'AI'], isFollowed: false },
    { id: 6, symbol: 'META', name: 'Meta Platforms', price: '325.80', change: 4.25, reason: 'Meta发布财报超预期，广告业务全面复苏，元宇宙亏损缩减，市场看好效率年战略。', tags: ['Stock', '社交媒体', '广告'], isFollowed: false }
  ]
})

// 3. Opportunities
const opportunitiesData = ref({
  recommend: [
    { id: 2, symbol: 'MSFT', score: 85, type: 'Long', title: '微软云计算+AI双轮驱动', strategy: '基本面分析 + 估值', period: '3-6个月', return: 12.3, risk: '低', reason: 'Azure云业务保持强劲增长，AI产品Copilot已在企业端大规模部署，作为AI时代的...', tags: ['云计算', 'AI应用', '蓝筹股'], isSaved: false, savedGroups: [] },
    { id: 3, symbol: 'META', score: 82, type: 'Long', title: 'Meta广告业务全面复苏', strategy: '事件驱动 + 财报', period: '1个月-6个月', return: 18.5, risk: '中等', reason: 'Meta第三季度财报大超预期，广告业务全面复苏，管理层推行的效率年策略见效，成本控制...', tags: ['社交媒体', '广告复苏', '扭亏为盈'], isSaved: false, savedGroups: [] },
    { id: 4, symbol: 'AMD', score: 79, type: 'Long', title: 'AMD AI芯片挑战者地位', strategy: '技术分析 + 竞品', period: '1-3个月', return: 22.6, risk: '高', reason: 'AMD推出MI300系列AI加速器，凭借性价比优势抢占市场，尽管面临英伟达的强势竞争，但在...', tags: ['AI芯片', '竞争', '高风险高回报'], isSaved: false, savedGroups: [] },
    { id: 5, symbol: 'TSLA', score: 65, type: 'Short', title: '特斯拉短期回调压力', strategy: '技术分析 + 趋势', period: '1-2周', return: 8.5, risk: '高', reason: '技术指标显示超买，且面临交付数据不及预期的风险，短期存在回调需求。', tags: ['新能源', '做空', '波段'], isSaved: false, savedGroups: [] }
  ],
  following: []
})

// --- Actions ---

const toggleExpandTheme = (theme) => {
  theme.isExpanded = !theme.isExpanded
}

const goToStockDetail = (symbol) => {
  router.push({ 
    name: 'StockAttributionDetail', 
    params: { id: symbol },
    query: { tab: 'price' }
  })
}

const navigateToStrategy = (opportunity) => {
  // 跳转到个股详情页，自动打开策略Tab并显示该策略详情
  router.push({
    path: `/stock-attribution/${opportunity.symbol}`,
    query: {
      tab: 'strategies',
      strategyId: opportunity.id
    }
  })
}

const navigateToOpportunity = () => {
  // 跳转到机会发现页面
  router.push('/opportunity')
}

const toggleFollow = (category, item) => {
  let dataRef
  if (category === 'themes') dataRef = themesData
  else if (category === 'attribution') dataRef = attributionData
  // Opportunities logic moved to save modal
  
  if (!dataRef) return

  // Check if item is already in following list
  const index = dataRef.value.following.findIndex(i => i.id === item.id)
  
  if (index > -1) {
    // Remove from following
    dataRef.value.following.splice(index, 1)
    item.isFollowed = false
    
    // Also update status in recommend/suggested lists if present
    const recItem = dataRef.value.recommend.find(i => i.id === item.id)
    if (recItem) recItem.isFollowed = false
    
    const sugItem = dataRef.value.suggested?.find(i => i.id === item.id)
    if (sugItem) sugItem.isFollowed = false
    
  } else {
    // Add to following
    // Create a copy to avoid reference issues if we want to separate them later, 
    // but for simple state sync, we can keep reference or just copy properties.
    // Here we set isFollowed = true on the item itself.
    item.isFollowed = true
    dataRef.value.following.push(item)
  }
}

// --- Computed Properties ---

const currentThemes = computed(() => {
  return themesData.value[activeTabThemes.value] || []
})

const currentAttributions = computed(() => {
  return attributionData.value[activeTabAttribution.value] || []
})

const currentOpportunities = computed(() => {
  const baseList = opportunitiesData.value[activeTabOpportunities.value] || []
  
  // Apply filters based on activeOppFilter
  if (activeOppFilter.value === 'all') return baseList
  if (activeOppFilter.value === 'long') return baseList.filter(item => item.type === 'Long')
  if (activeOppFilter.value === 'short') return baseList.filter(item => item.type === 'Short')
  if (activeOppFilter.value === 'grade_a') return baseList.filter(item => item.score >= 80)
  
  return baseList
})

const filteredOpportunities = computed(() => {
  let list = opportunitiesData.value.recommend || []
  
  if (activeOppFilter.value === 'all') return list
  if (activeOppFilter.value === 'long') return list.filter(item => item.type === 'Long')
  if (activeOppFilter.value === 'short') return list.filter(item => item.type === 'Short')
  if (activeOppFilter.value === 'grade_a') return list.filter(item => item.score >= 80)
  
  return list
})

const openSaveModal = (item) => {
  currentSavingItem.value = item
  // If already saved, load existing groups. If not, default to 'official'
  if (item.isSaved && item.savedGroups.length > 0) {
    selectedGroups.value = [...item.savedGroups]
  } else {
    selectedGroups.value = ['official']
  }
  showSaveModal.value = true
}

const confirmSave = () => {
  if (currentSavingItem.value) {
    currentSavingItem.value.isSaved = true
    currentSavingItem.value.savedGroups = [...selectedGroups.value]
  }
  showSaveModal.value = false
  currentSavingItem.value = null
}

</script>

<style scoped>
/* Signal Flow Animation */
@keyframes signal-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

.animate-signal-flow {
  animation: signal-flow 3s linear infinite;
}

@keyframes pulse-step {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* Staggered animation for steps to match the signal flow */
.animate-pulse-step {
  animation: pulse-step 3s linear infinite;
}

.group:nth-child(2) .animate-pulse-step { animation-delay: 0s; } /* Step 1 */
.group:nth-child(3) .animate-pulse-step { animation-delay: 0.75s; } /* Step 2 */
.group:nth-child(4) .animate-pulse-step { animation-delay: 1.5s; } /* Step 3 */
.group:nth-child(5) .animate-pulse-step { animation-delay: 2.25s; } /* Step 4 */
</style>