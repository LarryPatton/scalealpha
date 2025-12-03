<template>
  <div class="bg-[#0f0f0f] min-h-screen">
    <!-- Tab Switcher (Top Level) -->
    <div class="w-full bg-[#0f0f0f] border-b border-[#333]">
      <div class="flex gap-12 px-8 justify-center">
        <button 
          @click="switchTab('themes')"
          class="relative pb-4 pt-5 transition-all group"
        >
          <div class="flex flex-col items-start">
            <span class="text-base font-medium transition-colors" 
              :class="mainTab === 'themes' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
              市场主题
            </span>
            <span class="text-xs mt-0.5 transition-colors" 
              :class="mainTab === 'themes' ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-500'">
              Related Themes
            </span>
          </div>
          <div 
            class="absolute bottom-0 left-0 right-0 h-0.5 transition-all"
            :class="mainTab === 'themes' ? 'bg-blue-500' : 'bg-transparent group-hover:bg-gray-700'"
          ></div>
        </button>
        
        <button 
          @click="switchTab('events')"
          class="relative pb-4 pt-5 transition-all group"
        >
          <div class="flex flex-col items-start">
            <span class="text-base font-medium transition-colors" 
              :class="mainTab === 'events' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
              事件分析
            </span>
            <span class="text-xs mt-0.5 transition-colors" 
              :class="mainTab === 'events' ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-500'">
              Event Analysis
            </span>
          </div>
          <div 
            class="absolute bottom-0 left-0 right-0 h-0.5 transition-all"
            :class="mainTab === 'events' ? 'bg-blue-500' : 'bg-transparent group-hover:bg-gray-700'"
          ></div>
        </button>
        
        <button 
          @click="switchTab('opportunities')"
          class="relative pb-4 pt-5 transition-all group"
        >
          <div class="flex flex-col items-start">
            <span class="text-base font-medium transition-colors" 
              :class="mainTab === 'opportunities' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'">
              个股机会
            </span>
            <span class="text-xs mt-0.5 transition-colors" 
              :class="mainTab === 'opportunities' ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-500'">
              Strategies
            </span>
          </div>
          <div 
            class="absolute bottom-0 left-0 right-0 h-0.5 transition-all"
            :class="mainTab === 'opportunities' ? 'bg-blue-500' : 'bg-transparent group-hover:bg-gray-700'"
          ></div>
        </button>
      </div>
    </div>

    <!-- Main Content: Sidebar + Content Area -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <div class="w-64 bg-[#1a1a1a] border-r border-[#333] flex flex-col fixed h-[calc(100vh-120px)] overflow-y-auto">
      <div class="p-6">
        <h2 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">My Groups</h2>
        <nav class="space-y-1">
          <button 
            v-for="group in groups" 
            :key="group.id"
            @click="activeGroup = group.id"
            class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="activeGroup === group.id ? 'bg-blue-900/20 text-blue-400' : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'"
          >
            <span class="mr-3 text-lg">{{ group.icon }}</span>
            {{ group.name }}
          </button>
        </nav>
        
        <button @click="showNewGroupModal = true" class="mt-4 w-full flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-white transition-colors">
          <span class="mr-3 text-lg">+</span> 更多分组
        </button>
      </div>
    </div>

      <!-- Main Content Area -->
      <div class="flex-1 ml-64 p-8">
        <!-- Themes Content -->
        <div v-if="mainTab === 'themes'">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span class="text-2xl">{{ currentGroup.icon }}</span>
              {{ currentGroup.name }}
              <span class="text-sm font-normal text-gray-500 ml-2">({{ filteredThemes.length }})</span>
            </h1>

            <!-- Filters & Sort -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#333] pb-4">
              <!-- Filters -->
              <div class="flex items-center gap-2">
                <button 
                  v-for="filter in themesFilters" 
                  :key="filter.value"
                  @click="activeThemesFilter = filter.value"
                  class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
                  :class="activeThemesFilter === filter.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white'"
                >
                  {{ filter.label }}
                </button>
              </div>

              <!-- Sort -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Sort by:</span>
                <select v-model="themesSortBy" class="bg-[#1a1a1a] border border-[#333] text-gray-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500">
                  <option value="heat">Heat 🔥</option>
                  <option value="time">Time 🕒</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Themes List -->
          <div class="space-y-4">
            <div v-for="theme in sortedThemes" :key="theme.id" @click="toggleExpandTheme(theme)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer">
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

                <!-- Right: Meta -->
                <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                  <div class="text-xs text-gray-500">{{ theme.timeAgo }}</div>
                  <div class="flex items-center gap-1 text-xs font-medium" 
                    :class="{
                      'text-red-400': theme.heat === 'High',
                      'text-orange-400': theme.heat === 'Med',
                      'text-blue-400': theme.heat === 'Low'
                    }">
                    <span>🔥</span> {{ theme.heat }} Heat
                  </div>
                </div>
              </div>

              <!-- Follow Button -->
              <button 
                @click.stop="toggleFollowTheme(theme)"
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
        </div>

        <!-- Events Content -->
        <div v-if="mainTab === 'events'">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-white flex items-center gap-3 mb-6">
              <span class="text-2xl">{{ currentGroup.icon }}</span>
              {{ currentGroup.name }}
              <span class="text-sm font-normal text-gray-500 ml-2">({{ filteredEvents.length }})</span>
            </h1>

            <!-- Filters & Sort -->
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#333] pb-4">
              <!-- Filters -->
              <div class="flex items-center gap-2">
                <button 
                  v-for="filter in eventsFilters" 
                  :key="filter.value"
                  @click="activeEventsFilter = filter.value"
                  class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
                  :class="activeEventsFilter === filter.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white'"
                >
                  {{ filter.label }}
                </button>
              </div>

              <!-- Sort -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500">Sort by:</span>
                <select v-model="eventsSortBy" class="bg-[#1a1a1a] border border-[#333] text-gray-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500">
                  <option value="heat">Heat 🔥</option>
                  <option value="time">Time 🕒</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Events List -->
          <div class="space-y-4">
            <div 
              v-for="event in sortedEvents" 
              :key="event.id" 
              @click="goToEventDetail(event)"
              class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-gray-500 transition-colors group relative cursor-pointer"
            >
              <div class="flex flex-col md:flex-row gap-6">
                <!-- Left: Symbol & Price -->
                <div class="md:w-40 flex-shrink-0 flex flex-col justify-center">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 rounded bg-[#2a2a2a] flex items-center justify-center text-sm font-bold text-white border border-[#333]">{{ event.symbol[0] }}</div>
                    <div>
                      <div class="font-bold text-white text-lg leading-none">{{ event.symbol }}</div>
                      <div class="text-xs text-gray-500 mt-0.5">{{ event.name }}</div>
                    </div>
                  </div>
                  <div class="flex items-baseline gap-2">
                    <div class="text-lg font-bold text-white">${{ event.price }}</div>
                    <div class="text-sm font-medium" :class="event.change >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ event.change >= 0 ? '+' : '' }}{{ event.change }}%
                    </div>
                  </div>
                </div>

                <!-- Middle: Content -->
                <div class="flex-1 min-w-0 border-l border-[#333] pl-6 md:border-l-0 md:pl-0">
                  <p class="text-sm text-gray-300 leading-relaxed mb-3 pr-20">{{ event.reason }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="tag in event.tags" :key="tag" class="text-xs bg-[#2a2a2a] text-gray-500 px-2 py-0.5 rounded border border-[#333]">{{ tag }}</span>
                  </div>
                </div>

                <!-- Right: Meta -->
                <div class="flex flex-row md:flex-col justify-between items-end md:w-32 flex-shrink-0 text-right">
                  <div class="text-xs text-gray-500">{{ event.timeAgo }}</div>
                  <div class="flex items-center gap-1 text-xs font-medium" 
                    :class="{
                      'text-red-400': event.heat === 'High',
                      'text-orange-400': event.heat === 'Med',
                      'text-blue-400': event.heat === 'Low'
                    }">
                    <span>🔥</span> {{ event.heat }} Heat
                  </div>
                </div>
              </div>

              <!-- Follow Button -->
              <button 
                @click.stop="toggleFollowEvent(event)"
                class="absolute top-5 right-5 text-xs px-2 py-1 rounded border transition-colors z-10"
                :class="event.isFollowed ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-[#2a2a2a] text-gray-400 border-[#333] hover:text-white hover:border-gray-500'"
              >
                {{ event.isFollowed ? '✓ 已关注' : '+ 关注' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Opportunities Content -->
        <div v-if="mainTab === 'opportunities'">
          <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white flex items-center gap-3 mb-6">
          <span class="text-2xl">{{ currentGroup.icon }}</span>
          {{ currentGroup.name }}
          <span class="text-sm font-normal text-gray-500 ml-2">({{ filteredOpportunities.length }})</span>
        </h1>

        <!-- Filters & Sort -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#333] pb-4">
          <!-- Filters -->
          <div class="flex items-center gap-2">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
              :class="activeFilter === filter.value ? 'bg-blue-600 border-blue-600 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500 hover:text-white'"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500">Sort by:</span>
            <select v-model="sortBy" class="bg-[#1a1a1a] border border-[#333] text-gray-300 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-blue-500">
              <option value="time">生成时间</option>
              <option value="name">名称</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Opportunities List -->
      <div class="space-y-4">
        <div v-for="opp in sortedOpportunities" :key="opp.id" @click="navigateToStrategy(opp)" class="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-blue-500 transition-colors group cursor-pointer">
          <div class="flex items-start gap-4">
            <!-- Left: Symbol & Grade -->
            <div class="flex flex-col items-center gap-2 min-w-[80px]">
              <div class="text-lg font-bold text-white">{{ opp.symbol }}</div>
              <div class="px-2 py-0.5 rounded text-xs font-bold" 
                :class="{
                  'bg-green-900/30 text-green-400 border border-green-900/50': opp.grade === 'A' || opp.grade === 'A+',
                  'bg-blue-900/30 text-blue-400 border border-blue-900/50': opp.grade === 'B',
                  'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50': opp.grade === 'C'
                }">
                {{ opp.grade }}
              </div>
            </div>

            <!-- Middle: Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span v-if="opp.isNew" class="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase">NEW</span>
                <h3 class="text-base font-bold text-white truncate group-hover:text-blue-400 transition-colors">{{ opp.title }}</h3>
              </div>
              <div class="text-sm text-gray-400 space-y-1 mb-2">
                <p class="line-clamp-2">{{ opp.description }}</p>
              </div>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>{{ opp.timeAgo }}</span>
                <span>•</span>
                <span class="flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-500"></span> {{ opp.strategy }}
                </span>
              </div>
            </div>

            <!-- Right: Direction & Duration -->
            <div class="flex flex-col items-end gap-2 min-w-[120px] text-right">
              <div class="flex items-center gap-1 font-bold text-sm"
                :class="{
                  'text-green-500': opp.direction === 'LONG',
                  'text-red-500': opp.direction === 'SHORT',
                  'text-gray-400': opp.direction === 'WAIT'
                }">
                <span v-if="opp.direction === 'LONG'">↑</span>
                <span v-if="opp.direction === 'SHORT'">↓</span>
                {{ opp.direction }}
              </div>
              <div class="text-xs text-gray-500 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ opp.duration }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- New Group Modal -->
    <div v-if="showNewGroupModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div class="bg-[#1a1a1a] rounded-xl border border-[#333] w-full max-w-md p-6 shadow-2xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-white">新建分组</h3>
          <button @click="closeNewGroupModal" class="text-gray-500 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div class="space-y-4 mb-6">
          <!-- Group Name Input -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">分组名称</label>
            <input 
              v-model="newGroupName" 
              type="text" 
              placeholder="例如：科技股观察"
              class="w-full px-3 py-2 bg-[#0f0f0f] border border-[#333] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <!-- Icon Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">选择图标</label>
            <div class="grid grid-cols-6 gap-2">
              <button 
                v-for="icon in availableIcons" 
                :key="icon"
                @click="newGroupIcon = icon"
                class="w-10 h-10 flex items-center justify-center text-xl rounded-lg border transition-all"
                :class="newGroupIcon === icon ? 'bg-blue-600 border-blue-600' : 'bg-[#0f0f0f] border-[#333] hover:border-gray-500'"
              >
                {{ icon }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3">
          <button @click="closeNewGroupModal" class="flex-1 px-4 py-2 rounded-lg border border-[#333] text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors">
            取消
          </button>
          <button @click="createNewGroup" :disabled="!newGroupName.trim()" class="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            创建分组
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// --- Main Tab State ---
const mainTab = ref('opportunities')

// --- State ---
const activeGroup = ref('official')
const activeFilter = ref('all')
const sortBy = ref('time')

// Themes Tab State
const activeThemesFilter = ref('all')
const themesSortBy = ref('heat')

// Events Tab State
const activeEventsFilter = ref('all')
const eventsSortBy = ref('heat')

// New Group Modal State
const showNewGroupModal = ref(false)
const newGroupName = ref('')
const newGroupIcon = ref('📁')

const availableIcons = ['📁', '⭐', '🔥', '💎', '🚀', '📊', '💰', '🎯', '⚡', '🌟', '💼', '🔔']

// --- Data ---
const groups = ref([
  { id: 'official', name: '官方推荐', icon: '📂' },
  { id: 'following', name: '我的关注', icon: '👤' }
])

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Long', value: 'long' },
  { label: 'Short', value: 'short' },
  { label: 'Grade A+', value: 'grade_a' }
]

const themesFilters = [
  { label: 'All', value: 'all' },
  { label: 'Bullish', value: 'bullish' },
  { label: 'Bearish', value: 'bearish' },
  { label: 'High Heat', value: 'high_heat' }
]

const eventsFilters = [
  { label: 'All', value: 'all' },
  { label: 'Positive', value: 'positive' },
  { label: 'Negative', value: 'negative' },
  { label: 'High Heat', value: 'high_heat' }
]

// --- Themes Data (from AllMarketThemesPage) ---
const allThemes = [
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
    groupIds: ['official'],
    content: 'The surge in Generative AI applications is creating an unprecedented demand for high-performance computing infrastructure. Hyperscalers are aggressively increasing their capex to secure GPU supplies, directly benefiting the semiconductor supply chain.',
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
    groupIds: ['official'],
    content: 'With the increasing sophistication of cyber attacks, including AI-driven threats, enterprises are prioritizing cybersecurity in their IT budgets.',
    stockDetails: [
      { symbol: 'CRWD', change: 1.85, reason: 'Platform consolidation thesis playing out; strong module adoption.' },
      { symbol: 'PANW', change: 0.95, reason: 'Next-gen firewall demand remains robust; expanding into cloud security.' }
    ]
  },
  { 
    id: 3, 
    title: 'Biotech Innovation', 
    desc: 'New gene therapies and weight-loss drugs drive renewed interest in the biotech sector.', 
    sentiment: 'BULLISH', 
    confidence: 72, 
    stocks: ['LLY', 'NVO', 'VRTX'], 
    timeAgo: '3 hours ago', 
    timestamp: Date.now() - 3 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 85, 
    isFollowed: false,
    isExpanded: false,
    groupIds: ['official'],
    content: 'The GLP-1 agonist revolution for obesity and diabetes is just the beginning. We are also seeing breakthroughs in gene editing (CRISPR) and Alzheimer\'s treatments.',
    stockDetails: [
      { symbol: 'LLY', change: 2.75, reason: 'Mounjaro/Zepbound sales beating expectations; pipeline expansion.' },
      { symbol: 'NVO', change: 1.90, reason: 'Wegovy supply constraints easing; cardiovascular benefits confirmed.' }
    ]
  }
]

// --- Events Data (from AllStockAttributionPage) ---
const allEvents = [
  { 
    id: 1, 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp', 
    price: '485.09', 
    change: -3.45, 
    reason: '芯片发布推迟消息引发市场担忧，多家投行下调目标价，数据中心业务营收预计将略微不及预期。', 
    tags: ['Stock', '芯片', '财报前瞻'], 
    timeAgo: '10 mins ago', 
    timestamp: Date.now() - 10 * 60 * 1000, 
    heat: 'High', 
    heatScore: 95, 
    isFollowed: false,
    groupIds: ['official']
  },
  { 
    id: 2, 
    symbol: 'TSLA', 
    name: 'Tesla Inc', 
    price: '235.45', 
    change: 1.80, 
    reason: '特斯拉自动驾驶软件问题宣布召回部分车辆，股价承压，分析师对Q4交付量持谨慎态度。', 
    tags: ['Stock', '新能源', '监管'], 
    timeAgo: '1 hour ago', 
    timestamp: Date.now() - 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 88, 
    isFollowed: false,
    groupIds: ['official']
  },
  { 
    id: 3, 
    symbol: 'MSFT', 
    name: 'Microsoft', 
    price: '378.25', 
    change: -2.15, 
    reason: 'Azure云服务营收增速超预期，AI产品Copilot商业化进展顺利，微软成为AI时代最大受益者之一。', 
    tags: ['Stock', '云计算', 'AI应用'], 
    timeAgo: '3 hours ago', 
    timestamp: Date.now() - 3 * 60 * 60 * 1000, 
    heat: 'Med', 
    heatScore: 75, 
    isFollowed: false,
    groupIds: ['official']
  },
  { 
    id: 4, 
    symbol: 'AMD', 
    name: 'Advanced Micro Devices', 
    price: '115.40', 
    change: 2.85, 
    reason: 'New MI300 chip launch receives positive initial reviews, challenging Nvidia\'s dominance.', 
    tags: ['Stock', 'Semiconductor', 'AI'], 
    timeAgo: '2 days ago', 
    timestamp: Date.now() - 50 * 60 * 60 * 1000, 
    heat: 'High', 
    heatScore: 82, 
    isFollowed: false,
    groupIds: ['official']
  }
]

// Mock Opportunities Data
const allOpportunities = [
  { 
    id: 1, 
    symbol: 'GOOGL', 
    grade: 'A', 
    title: 'Google AI Infrastructure & Gemini Super-Cycle', 
    description: 'ACT 1: 市场短期流动性波动将GOOGL推回$317水平，部分投资者仍担忧OpenAI Shopping的竞争威胁。ACT 2: 然而，我们看到$315支撑位的强劲买盘验证了机构的吸筹行为。Meta洽购...', 
    direction: 'LONG', 
    duration: 'Short to Medium-term (2-8 weeks)', 
    strategy: 'AI Infrastructure',
    timeAgo: '2 hours ago',
    timestamp: 1701420000000,
    isNew: true,
    groupIds: ['official']
  },
  { 
    id: 2, 
    symbol: 'JNJ', 
    grade: 'B', 
    title: '强生防御性轮动与超买回调布局', 
    description: '第一幕: 市场目前因宏观避险情绪升温及Q3财报强劲 (营收$24B, EPS $2.80) [cite_index=74]，将JNJ推升至历史高位$207附近。分析师纷纷上调目标价至$215-$230，散户情绪高涨。第二幕: 然而...', 
    direction: 'WAIT', 
    duration: 'Medium-term (1-3 months)', 
    strategy: 'Defensive Rotation',
    timeAgo: '5 hours ago',
    timestamp: 1701410000000,
    isNew: true,
    groupIds: ['official']
  },
  { 
    id: 3, 
    symbol: 'BKNG', 
    grade: 'A', 
    title: 'BKNG 假日AI反弹策略 (执行阶段)', 
    description: '第一幕: 市场此前的担忧已被价格行动否定。股价已成功突破$4,862的关键阻力位，当前交易于$4,909附近，确认了技术面反转。第二幕: 基本面催化剂正在加速发酵。感恩节8200万人的创纪录出行预测...', 
    direction: 'LONG', 
    duration: 'Short-term (1-3 weeks)', 
    strategy: 'Seasonal Rebound',
    timeAgo: '1 day ago',
    timestamp: 1701350000000,
    isNew: false,
    groupIds: ['official', 'short_term']
  },
  { 
    id: 4, 
    symbol: 'TEL', 
    grade: 'A', 
    title: 'TE Connectivity AI 错杀反转策略', 
    description: '第一幕: 市场此前的担忧（内幕减持、投资者日后的获利回吐）已被价格行为证伪。尽管Truist维持持有评级，但股价并未受阻，反而稳步攀升至$225上方，证明市场已消化利空。第二幕: 多头逻辑正在兑现。...', 
    direction: 'WAIT', 
    duration: 'Short-term (1-2 weeks)', 
    strategy: 'Reversal',
    timeAgo: '2 days ago',
    timestamp: 1701250000000,
    isNew: false,
    groupIds: ['official']
  },
  { 
    id: 5, 
    symbol: 'TSLA', 
    grade: 'C', 
    title: '特斯拉短期回调压力测试', 
    description: '技术指标显示超买，且面临交付数据不及预期的风险，短期存在回调需求。建议关注$230附近的支撑力度。', 
    direction: 'SHORT', 
    duration: 'Short-term (1-2 weeks)', 
    strategy: 'Technical Pullback',
    timeAgo: '1 hour ago',
    timestamp: 1701425000000,
    isNew: true,
    groupIds: ['following']
  }
]

// --- Computed ---

const currentGroup = computed(() => {
  return groups.value.find(g => g.id === activeGroup.value) || groups.value[0]
})

const filteredOpportunities = computed(() => {
  // 1. Filter by Group
  let list = allOpportunities.filter(opp => opp.groupIds.includes(activeGroup.value))
  
  // 2. Filter by Type/Grade
  if (activeFilter.value === 'long') {
    list = list.filter(opp => opp.direction === 'LONG' || opp.direction === 'WAIT') // Assuming WAIT is often bullish bias or neutral
  } else if (activeFilter.value === 'short') {
    list = list.filter(opp => opp.direction === 'SHORT')
  } else if (activeFilter.value === 'grade_a') {
    list = list.filter(opp => opp.grade === 'A' || opp.grade === 'A+')
  }
  
  return list
})

const sortedOpportunities = computed(() => {
  const list = [...filteredOpportunities.value]
  
  if (sortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  } else if (sortBy.value === 'name') {
    return list.sort((a, b) => a.symbol.localeCompare(b.symbol))
  }
  
  return list
})

// --- Themes Computed ---
const filteredThemes = computed(() => {
  let list = allThemes.filter(theme => theme.groupIds.includes(activeGroup.value))
  
  if (activeThemesFilter.value === 'bullish') {
    list = list.filter(t => t.sentiment === 'BULLISH')
  } else if (activeThemesFilter.value === 'bearish') {
    list = list.filter(t => t.sentiment === 'BEARISH')
  } else if (activeThemesFilter.value === 'high_heat') {
    list = list.filter(t => t.heat === 'High')
  }
  
  return list
})

const sortedThemes = computed(() => {
  const list = [...filteredThemes.value]
  
  if (themesSortBy.value === 'heat') {
    return list.sort((a, b) => b.heatScore - a.heatScore)
  } else if (themesSortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  }
  
  return list
})

// --- Events Computed ---
const filteredEvents = computed(() => {
  let list = allEvents.filter(event => event.groupIds.includes(activeGroup.value))
  
  if (activeEventsFilter.value === 'positive') {
    list = list.filter(e => e.change >= 0)
  } else if (activeEventsFilter.value === 'negative') {
    list = list.filter(e => e.change < 0)
  } else if (activeEventsFilter.value === 'high_heat') {
    list = list.filter(e => e.heat === 'High')
  }
  
  return list
})

const sortedEvents = computed(() => {
  const list = [...filteredEvents.value]
  
  if (eventsSortBy.value === 'heat') {
    return list.sort((a, b) => b.heatScore - a.heatScore)
  } else if (eventsSortBy.value === 'time') {
    return list.sort((a, b) => b.timestamp - a.timestamp)
  }
  
  return list
})

// --- URL Parameter Handling ---
onMounted(() => {
  const tabParam = route.query.tab
  if (tabParam && ['themes', 'events', 'opportunities'].includes(tabParam)) {
    mainTab.value = tabParam
  }
})

const switchTab = (tab) => {
  mainTab.value = tab
  router.push({ 
    path: '/opportunities', 
    query: { tab } 
  })
}

// --- Methods ---
const toggleExpandTheme = (theme) => {
  theme.isExpanded = !theme.isExpanded
}

const toggleFollowTheme = (theme) => {
  theme.isFollowed = !theme.isFollowed
  
  if (theme.isFollowed && !theme.groupIds.includes('following')) {
    theme.groupIds.push('following')
  } else if (!theme.isFollowed && theme.groupIds.includes('following')) {
    const index = theme.groupIds.indexOf('following')
    if (index > -1) theme.groupIds.splice(index, 1)
  }
}

const toggleFollowEvent = (event) => {
  event.isFollowed = !event.isFollowed
  
  if (event.isFollowed && !event.groupIds.includes('following')) {
    event.groupIds.push('following')
  } else if (!event.isFollowed && event.groupIds.includes('following')) {
    const index = event.groupIds.indexOf('following')
    if (index > -1) event.groupIds.splice(index, 1)
  }
}

const goToStockDetail = (symbol) => {
  router.push({ 
    name: 'StockAttributionDetail', 
    params: { id: symbol },
    query: { tab: 'price' }
  })
}

const goToEventDetail = (event) => {
  router.push({ name: 'StockAttributionDetail', params: { id: event.symbol } })
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

const closeNewGroupModal = () => {
  showNewGroupModal.value = false
  newGroupName.value = ''
  newGroupIcon.value = '📁'
}

const createNewGroup = () => {
  if (!newGroupName.value.trim()) return
  
  // Generate unique ID
  const newId = 'group_' + Date.now()
  
  // Add new group
  groups.value.push({
    id: newId,
    name: newGroupName.value.trim(),
    icon: newGroupIcon.value
  })
  
  // Switch to new group
  activeGroup.value = newId
  
  // Close modal
  closeNewGroupModal()
}
</script>
