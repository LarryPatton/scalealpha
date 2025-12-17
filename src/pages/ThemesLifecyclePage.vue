<template>
  <div class="bg-[#0f0f0f] min-h-screen flex flex-col pb-24">
    <Navbar />

    <main class="flex-grow flex flex-col p-4 lg:p-6 relative">
      <!-- Hero Section -->
      <div class="mb-8 text-center py-10">
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Themes <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Lifecycle</span> Discovery
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto text-lg">AI 驱动的市场主题聚类与生命周期追踪</p>
      </div>

      <!-- Info Bar -->
      <div class="sticky top-16 z-40 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#333] px-4 lg:px-8 py-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500">📅</span>
            <span class="text-white font-mono">{{ themesData.discovery_date }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500">🎯</span>
            <span class="text-white">{{ themesData.universe_size }} Stocks</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-500">🏷️</span>
            <span class="text-white">{{ themesData.themes.length }} Themes</span>
          </div>
          <!-- Data Source Toggle -->
          <button @click="toggleDataSource" :disabled="loading" class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors" :class="dataSource === 'real' ? 'bg-green-900/50 text-green-400 border border-green-700' : 'bg-[#1a1a1a] text-gray-400 border border-[#333] hover:text-white'">
            <span v-if="loading" class="animate-spin">⏳</span>
            <span v-else>{{ dataSource === 'real' ? '🔴 真实数据' : '🔵 Demo 数据' }}</span>
          </button>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <!-- Stage Filter Dropdown -->
            <div class="relative">
              <button @click="showStageFilter = !showStageFilter" class="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors" :class="selectedStages.length > 0 && selectedStages.length < lifecycleStages.length ? 'bg-blue-900/50 text-blue-400 border-blue-700' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'">
                <span>阶段筛选</span>
                <span v-if="selectedStages.length > 0 && selectedStages.length < lifecycleStages.length" class="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{{ selectedStages.length }}</span>
                <svg class="w-3 h-3 transition-transform" :class="showStageFilter ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </button>
              <!-- Dropdown Menu -->
              <div v-if="showStageFilter" class="absolute top-full left-0 mt-2 w-56 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl z-50 overflow-hidden">
                <div class="p-2 border-b border-[#333] flex items-center justify-between">
                  <span class="text-xs text-gray-500">选择阶段</span>
                  <button @click="toggleAllStages" class="text-xs text-blue-400 hover:text-blue-300">{{ selectedStages.length === lifecycleStages.length ? '取消全选' : '全选' }}</button>
                </div>
                <div class="max-h-64 overflow-y-auto p-1">
                  <label v-for="stage in lifecycleStages" :key="stage.key" class="flex items-center gap-3 px-3 py-2 hover:bg-[#222] rounded-lg cursor-pointer transition-colors">
                    <input type="checkbox" :value="stage.key" v-model="selectedStages" class="w-4 h-4 rounded border-[#444] bg-[#0f0f0f] text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full" :class="stageConfigs[stage.key].bgClass"></span>
                      <span class="text-sm" :class="stageConfigs[stage.key].textClass">{{ stage.label }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <button @click="setSort('time')" class="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors" :class="sortBy === 'time' ? 'bg-[#333] text-white border-gray-500' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'">
              <span>时间</span>
              <svg v-if="sortBy === 'time'" class="w-3 h-3 transition-transform" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <button @click="setSort('stocks')" class="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium transition-colors" :class="sortBy === 'stocks' ? 'bg-[#333] text-white border-gray-500' : 'bg-[#1a1a1a] text-gray-400 border-[#333] hover:text-white'">
              <span>股票数</span>
              <svg v-if="sortBy === 'stocks'" class="w-3 h-3 transition-transform" :class="sortOrder === 'asc' ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>
          <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-1 flex items-center">
            <button @click="viewMode = 'card'" class="p-1.5 rounded-md transition-all" :class="viewMode === 'card' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'" title="Card View">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            </button>
            <button @click="viewMode = 'list'" class="p-1.5 rounded-md transition-all" :class="viewMode === 'list' ? 'bg-[#333] text-white' : 'text-gray-500 hover:text-gray-300'" title="List View">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Lifecycle Stage Legend -->
      <div class="w-full max-w-7xl mx-auto px-4 mb-8">
        <div class="bg-[#1a1a1a] border border-[#333] rounded-xl p-5">
          <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Lifecycle Stages</h3>
          <div class="flex items-center justify-between">
            <div v-for="(stage, index) in lifecycleStages" :key="stage.key" class="flex flex-col items-center flex-1 relative">
              <div v-if="index < lifecycleStages.length - 1" class="absolute top-3 left-1/2 w-full h-0.5 bg-[#333]"></div>
              <div class="relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-2" :class="stage.dotClass">{{ index + 1 }}</div>
              <span class="text-[10px] font-medium" :class="stage.textClass">{{ stage.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Themes Content -->
      <div class="w-full max-w-7xl mx-auto px-4">
        <!-- Card View -->
        <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="theme in sortedThemes" :key="theme.theme_id" @click="openThemeDetail(theme)" class="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg transition-all cursor-pointer group flex flex-col">
            <!-- Header: Badge + Progress + Stage Number -->
            <div class="p-4 border-b border-[#333] bg-[#151515]">
              <div class="flex items-center gap-3">
                <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0" :class="getStageConfig(theme.state).badgeClass">{{ getStageConfig(theme.state).label }}</span>
                <div class="flex-1 flex items-center gap-1">
                  <template v-for="(stage, index) in lifecycleStages" :key="stage.key">
                    <div class="h-1.5 flex-1 rounded-full" :class="getSegmentClass(theme.state, index)"></div>
                  </template>
                </div>
                <span class="text-xs text-gray-500 font-mono shrink-0">{{ getStageIndex(theme.state) + 1 }}/8</span>
              </div>
            </div>
            
            <!-- Body: Title + Description + Tickers -->
            <div class="p-4 flex-1 flex flex-col">
              <h3 class="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">{{ theme.name }}</h3>
              <p class="text-xs text-gray-500 mb-4 line-clamp-2 flex-1">{{ theme.description_cn || theme.description }}</p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="ticker in theme.primary_tickers.slice(0, 5)" :key="ticker" class="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#0f0f0f] border border-[#333] rounded text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors">{{ ticker }}</span>
                <span v-if="theme.primary_tickers.length > 5" class="px-2 py-0.5 text-[10px] font-mono bg-[#0f0f0f] border border-[#333] rounded text-gray-500">+{{ theme.primary_tickers.length - 5 }}</span>
              </div>
            </div>

            <!-- Footer: Date + Arrow -->
            <div class="px-4 py-3 border-t border-[#333] bg-[#151515] flex items-center justify-between">
              <span class="text-[11px] text-gray-500">📅 {{ theme.first_detected }}</span>
              <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-3">
          <div v-for="theme in sortedThemes" :key="theme.theme_id" @click="openThemeDetail(theme)" class="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer group">
            <div class="flex items-stretch">
              <!-- Left: Lifecycle Progress (80px) -->
              <div class="w-20 shrink-0 bg-[#151515] border-r border-[#333] p-3 flex flex-col items-center justify-center">
                <div class="flex items-center gap-0.5 mb-2 w-full">
                  <template v-for="(stage, index) in lifecycleStages.slice(0, 4)" :key="stage.key">
                    <div class="h-1 flex-1 rounded-full" :class="getSegmentClass(theme.state, index)"></div>
                  </template>
                </div>
                <div class="flex items-center gap-0.5 mb-2 w-full">
                  <template v-for="(stage, index) in lifecycleStages.slice(4, 8)" :key="stage.key">
                    <div class="h-1 flex-1 rounded-full" :class="getSegmentClass(theme.state, index + 4)"></div>
                  </template>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider" :class="getStageConfig(theme.state).textClass">{{ getStageConfig(theme.state).label }}</span>
                <span class="text-[9px] text-gray-600">{{ getStageIndex(theme.state) + 1 }}/8</span>
              </div>

              <!-- Middle: Content (flex-1) -->
              <div class="flex-1 min-w-0 p-4 flex flex-col justify-center">
                <h3 class="text-base font-bold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">{{ theme.name }}</h3>
                <p class="text-xs text-gray-500 mb-2 truncate">{{ theme.description_cn || theme.description }}</p>
                <div class="flex items-center gap-4 text-[11px] text-gray-500">
                  <span>📅 {{ theme.first_detected }}</span>
                  <span>📊 {{ theme.stock_count }} 只</span>
                </div>
              </div>

              <!-- Right: Tickers (2x3 Grid, fixed width) -->
              <div class="w-64 shrink-0 border-l border-[#333] p-4 flex items-center gap-3 bg-[#151515]">
                <div class="flex-1 flex flex-col gap-1.5 justify-center">
                  <!-- Row 1: up to 3 tickers -->
                  <div class="flex items-center gap-1.5 justify-end h-6">
                    <span v-for="ticker in theme.primary_tickers.slice(0, 3)" :key="ticker" class="w-12 text-center px-1 py-1 text-[10px] font-mono font-bold bg-[#0f0f0f] border border-[#333] rounded text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors truncate">{{ ticker }}</span>
                  </div>
                  <!-- Row 2: always present for consistent height -->
                  <div class="flex items-center gap-1.5 justify-end h-6">
                    <template v-if="theme.primary_tickers.length > 3">
                      <span v-for="ticker in theme.primary_tickers.slice(3, 5)" :key="ticker" class="w-12 text-center px-1 py-1 text-[10px] font-mono font-bold bg-[#0f0f0f] border border-[#333] rounded text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-colors truncate">{{ ticker }}</span>
                      <span v-if="theme.primary_tickers.length > 5" class="w-12 text-center px-1 py-1 text-[10px] font-mono bg-[#0f0f0f] border border-[#333] rounded text-gray-500">+{{ theme.primary_tickers.length - 5 }}</span>
                    </template>
                    <template v-else>
                      <span class="w-12 h-6"></span>
                    </template>
                  </div>
                </div>
                <svg class="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Back to Top -->
    <button v-if="showBackToTop" @click="scrollToTop" class="fixed bottom-24 right-8 z-40 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:text-black transition-all">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
    </button>

    <!-- Theme Detail Modal -->
    <div v-if="showDetailModal && selectedTheme" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.self="showDetailModal = false">
      <div class="relative w-full max-w-[90vw] h-[90vh] bg-[#1a1a1a] rounded-xl border border-[#333] shadow-2xl overflow-hidden flex flex-col">
        <button @click="showDetailModal = false" class="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black/50 rounded-full p-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <!-- Top: Lifecycle Progress Bar -->
        <div class="shrink-0 bg-[#151515] border-b border-[#333] px-8 py-6">
          <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">Lifecycle Stages</h4>
          <div class="flex items-center justify-between relative">
            <!-- Connection Line -->
            <div class="absolute top-4 left-8 right-8 h-0.5 bg-[#333]"></div>
            <!-- Stage Dots -->
            <template v-for="(stage, index) in lifecycleStages" :key="stage.key">
              <div class="flex flex-col items-center relative z-10 flex-1">
                <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold mb-2 transition-all" :class="getModalStageClass(selectedTheme.state, stage.key, index)">
                  {{ index + 1 }}
                </div>
                <span class="text-[11px] font-medium" :class="selectedTheme.state === stage.key ? getStageConfig(stage.key).textClass : 'text-gray-500'">{{ stage.label }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto p-8">
          <!-- Header -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-3">{{ selectedTheme.name }}</h2>
            <p class="text-sm text-gray-400 leading-relaxed max-w-4xl">{{ selectedTheme.description }}</p>
          </div>

          <!-- AI Analysis -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-[#0f0f0f] border border-[#333] rounded-lg p-5">
              <h4 class="text-sm font-bold text-white mb-3">🤖 AI 投资论点</h4>
              <p class="text-sm text-gray-300 leading-relaxed">{{ selectedTheme.llm_validation?.thesis || '暂无' }}</p>
            </div>
            <div class="bg-[#0f0f0f] border border-[#333] rounded-lg p-5">
              <h4 class="text-sm font-bold text-white mb-3">💡 催化剂</h4>
              <p class="text-sm text-gray-300 leading-relaxed">{{ selectedTheme.llm_validation?.catalyst || '暂无' }}</p>
            </div>
          </div>

          <!-- Risks -->
          <div class="bg-[#0f0f0f] border border-[#333] rounded-lg p-5 mb-6">
            <h4 class="text-sm font-bold text-white mb-3">⚠️ 风险因素</h4>
            <ul class="space-y-2">
              <li v-for="(risk, i) in selectedTheme.llm_validation?.risks || []" :key="i" class="text-sm text-gray-300 flex items-start gap-2">
                <span class="text-red-500 mt-0.5">•</span><span>{{ risk }}</span>
              </li>
              <li v-if="!selectedTheme.llm_validation?.risks?.length" class="text-sm text-gray-500">暂无风险分析</li>
            </ul>
          </div>

          <!-- Stocks - Grouped Tags -->
          <div class="bg-[#0f0f0f] border border-[#333] rounded-lg p-5">
            <h4 class="text-sm font-bold text-white mb-5">📋 成分股 ({{ (selectedTheme.primary_tickers?.length || 0) + (selectedTheme.secondary_tickers?.length || 0) }})</h4>
            
            <!-- Primary Tickers -->
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Primary ({{ selectedTheme.primary_tickers?.length || 0 }})</span>
                <div class="flex-1 h-px bg-[#333]"></div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="ticker in selectedTheme.primary_tickers" :key="ticker" @click.stop="goToStockDetail(ticker)" class="px-3 py-1.5 text-sm font-mono font-bold bg-blue-900/20 border border-blue-700/50 rounded-lg text-blue-400 hover:bg-blue-900/40 hover:border-blue-500 cursor-pointer transition-all">{{ ticker }}</span>
                <span v-if="!selectedTheme.primary_tickers?.length" class="text-sm text-gray-500">暂无</span>
              </div>
            </div>

            <!-- Secondary Tickers -->
            <div>
              <div class="flex items-center gap-2 mb-3">
                <div class="w-2 h-2 rounded-full bg-gray-500"></div>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Secondary ({{ selectedTheme.secondary_tickers?.length || 0 }})</span>
                <div class="flex-1 h-px bg-[#333]"></div>
              </div>
              <div class="flex flex-wrap gap-2">
                <span v-for="ticker in selectedTheme.secondary_tickers" :key="ticker" @click.stop="goToStockDetail(ticker)" class="px-3 py-1.5 text-sm font-mono bg-[#1a1a1a] border border-[#444] rounded-lg text-gray-400 hover:bg-[#222] hover:border-gray-500 hover:text-white cursor-pointer transition-all">{{ ticker }}</span>
                <span v-if="!selectedTheme.secondary_tickers?.length" class="text-sm text-gray-500">暂无</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

const lifecycleStages = [
  { key: 'watch', label: 'Watch', dotClass: 'bg-slate-600 border-slate-500 text-white', textClass: 'text-slate-400' },
  { key: 'emerging', label: 'Emerging', dotClass: 'bg-emerald-600 border-emerald-500 text-white', textClass: 'text-emerald-400' },
  { key: 'growing', label: 'Growing', dotClass: 'bg-green-600 border-green-500 text-white', textClass: 'text-green-400' },
  { key: 'mature', label: 'Mature', dotClass: 'bg-blue-600 border-blue-500 text-white', textClass: 'text-blue-400' },
  { key: 'fading', label: 'Fading', dotClass: 'bg-yellow-600 border-yellow-500 text-white', textClass: 'text-yellow-400' },
  { key: 'declining', label: 'Declining', dotClass: 'bg-orange-600 border-orange-500 text-white', textClass: 'text-orange-400' },
  { key: 'defunct', label: 'Defunct', dotClass: 'bg-red-600 border-red-500 text-white', textClass: 'text-red-400' },
  { key: 'dormant', label: 'Dormant', dotClass: 'bg-gray-600 border-gray-500 text-white', textClass: 'text-gray-400' }
]

const stageConfigs = {
  watch: { label: 'Watch', bgClass: 'bg-slate-500', textClass: 'text-slate-400', badgeClass: 'bg-slate-900/50 text-slate-400 border border-slate-700' },
  emerging: { label: 'Emerging', bgClass: 'bg-emerald-500', textClass: 'text-emerald-400', badgeClass: 'bg-emerald-900/50 text-emerald-400 border border-emerald-700' },
  growing: { label: 'Growing', bgClass: 'bg-green-500', textClass: 'text-green-400', badgeClass: 'bg-green-900/50 text-green-400 border border-green-700' },
  mature: { label: 'Mature', bgClass: 'bg-blue-500', textClass: 'text-blue-400', badgeClass: 'bg-blue-900/50 text-blue-400 border border-blue-700' },
  fading: { label: 'Fading', bgClass: 'bg-yellow-500', textClass: 'text-yellow-400', badgeClass: 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' },
  declining: { label: 'Declining', bgClass: 'bg-orange-500', textClass: 'text-orange-400', badgeClass: 'bg-orange-900/50 text-orange-400 border border-orange-700' },
  defunct: { label: 'Defunct', bgClass: 'bg-red-500', textClass: 'text-red-400', badgeClass: 'bg-red-900/50 text-red-400 border border-red-700' },
  dormant: { label: 'Dormant', bgClass: 'bg-gray-500', textClass: 'text-gray-400', badgeClass: 'bg-gray-800/50 text-gray-400 border border-gray-600' }
}

const viewMode = ref('card')
const sortBy = ref('time') // 默认按时间排序，因为阶段改为筛选器了
const sortOrder = ref('asc')
const showBackToTop = ref(false)
const showDetailModal = ref(false)
const selectedTheme = ref(null)
const dataSource = ref('demo') // 'demo' or 'real'
const loading = ref(false)
const showStageFilter = ref(false)
const selectedStages = ref([...['watch', 'emerging', 'growing', 'mature', 'fading', 'declining', 'defunct', 'dormant']]) // 默认全选

const demoData = {
  discovery_date: "2025-12-11",
  universe_size: 50,
  themes: [
    { theme_id: "watch001", name: "Quantum Computing Early Stage", description: "Early-stage quantum computing companies", description_cn: "量子计算早期阶段", state: "watch", primary_tickers: ["IONQ", "RGTI", "QBTS"], stocks: [{ ticker: "IONQ", weight: 1, role: "core" }, { ticker: "RGTI", weight: 1, role: "core" }], stock_count: 3, first_detected: "2025-12-10", last_detected: "2025-12-11", price_signals: { apc_30d: 0.15 }, volume_signals: { volume_surge: 1.2 }, options_signals: { options_sentiment: "neutral" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Quantum computing showing early correlation.", catalyst: "Enterprise interest.", risks: ["Nascent tech"] } },
    { theme_id: "5f667c0488e0", name: "Diverse US equities A-ABT", description: "Cross-sector collection of US-listed companies", description_cn: "跨行业美股集合", state: "emerging", primary_tickers: ["A", "AA", "AAL", "AAPL", "ABBV", "ABT"], stocks: [{ ticker: "A", weight: 1, role: "core" }, { ticker: "AAPL", weight: 1, role: "core" }], stock_count: 13, first_detected: "2025-12-11", last_detected: "2025-12-11", price_signals: { apc_30d: 0.246 }, volume_signals: { volume_surge: 1.0 }, options_signals: { options_sentiment: "neutral" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Co-movement from Fed rate cut.", catalyst: "Fed 25bp cut Dec 10.", risks: ["Divergent sectors"] } },
    { theme_id: "growing001", name: "Clean Energy Infrastructure", description: "Solar, wind, and grid storage", description_cn: "清洁能源基础设施", state: "growing", primary_tickers: ["ENPH", "SEDG", "FSLR", "NEE", "RUN"], stocks: [{ ticker: "ENPH", weight: 1.5, role: "core" }], stock_count: 5, first_detected: "2025-10-20", last_detected: "2025-12-11", price_signals: { apc_30d: 0.45 }, volume_signals: { volume_surge: 1.8 }, options_signals: { options_sentiment: "bullish" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "IRA subsidies driving growth.", catalyst: "Policy support.", risks: ["Rate sensitivity"] } },
    { theme_id: "mature001", name: "AI & Semiconductor Leaders", description: "AI and chip manufacturing leaders", description_cn: "AI与半导体龙头", state: "mature", primary_tickers: ["NVDA", "AMD", "INTC", "AVGO", "TSM", "ASML"], stocks: [{ ticker: "NVDA", weight: 2, role: "core" }], stock_count: 8, first_detected: "2025-11-15", last_detected: "2025-12-11", price_signals: { apc_30d: 0.582 }, volume_signals: { volume_surge: 2.3 }, options_signals: { options_sentiment: "bullish" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Exceptional AI chip demand.", catalyst: "Tech AI spending.", risks: ["Supply constraints"] } },
    { theme_id: "fading001", name: "Work From Home Tech", description: "Remote work beneficiaries normalizing", description_cn: "远程办公科技回归常态", state: "fading", primary_tickers: ["ZM", "DOCU", "PTON"], stocks: [{ ticker: "ZM", weight: 1, role: "core" }], stock_count: 3, first_detected: "2025-06-01", last_detected: "2025-12-05", price_signals: { apc_30d: 0.18 }, volume_signals: { volume_surge: 0.7 }, options_signals: { options_sentiment: "bearish" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "WFH correlation weakening.", catalyst: "Return to office.", risks: ["Resurgence possible"] } },
    { theme_id: "declining001", name: "Traditional Retail Decline", description: "Legacy retail facing e-commerce pressure", description_cn: "传统零售业结构性衰退", state: "declining", primary_tickers: ["M", "KSS", "JWN", "DDS"], stocks: [{ ticker: "M", weight: 1, role: "core" }], stock_count: 4, first_detected: "2025-09-20", last_detected: "2025-12-05", price_signals: { apc_30d: 0.12 }, volume_signals: { volume_surge: 0.6 }, options_signals: { options_sentiment: "bearish" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Structural decline continues.", catalyst: "Weak holiday season.", risks: ["Short squeeze"] } },
    { theme_id: "defunct001", name: "SPAC Bubble Remnants", description: "Former SPAC darlings lost coherence", description_cn: "SPAC泡沫残余", state: "defunct", primary_tickers: ["LCID", "RIVN", "NKLA"], stocks: [{ ticker: "LCID", weight: 1, role: "core" }], stock_count: 3, first_detected: "2025-03-01", last_detected: "2025-10-15", price_signals: { apc_30d: 0.05 }, volume_signals: { volume_surge: 0.4 }, options_signals: { options_sentiment: "bearish" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Theme lost coherence.", catalyst: "None.", risks: ["Volatility"] } },
    { theme_id: "dormant001", name: "Cannabis Stocks", description: "Awaiting regulatory catalyst", description_cn: "大麻股等待政策催化", state: "dormant", primary_tickers: ["TLRY", "CGC", "ACB"], stocks: [{ ticker: "TLRY", weight: 1, role: "core" }], stock_count: 3, first_detected: "2025-01-15", last_detected: "2025-08-20", price_signals: { apc_30d: 0.08 }, volume_signals: { volume_surge: 0.5 }, options_signals: { options_sentiment: "neutral" }, llm_validation: { provider: "gemini-2.5-flash", thesis: "Dormant, awaiting legalization.", catalyst: "Schedule III.", risks: ["Regulatory delays"] } }
  ],
  quality_report: { avg_quality_score: 62.5, avg_trading_score: 58.0, tradeable_pct: 50.0, recommendation: "REVIEW_REQUIRED" }
}

const themesData = ref({ ...demoData })

// Load real data
const loadRealData = async () => {
  loading.value = true
  try {
    const basePath = import.meta.env.BASE_URL || '/'
    const response = await fetch(`${basePath}data/themes_lifecycle_20251211.json`)
    console.log('Fetch response:', response.status, response.statusText)
    if (response.ok) {
      const data = await response.json()
      console.log('Loaded data:', data)
      themesData.value = data
      dataSource.value = 'real'
    } else {
      console.error('Failed to fetch:', response.status)
      alert('加载失败: ' + response.status)
    }
  } catch (error) {
    console.error('Failed to load real data:', error)
    alert('加载失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const toggleDataSource = async () => {
  console.log('Toggle clicked, current source:', dataSource.value)
  if (dataSource.value === 'demo') {
    await loadRealData()
  } else {
    themesData.value = { ...demoData }
    dataSource.value = 'demo'
  }
  console.log('After toggle, source:', dataSource.value)
}

const getStageConfig = (state) => stageConfigs[state] || stageConfigs.watch
const getStageIndex = (state) => lifecycleStages.findIndex(s => s.key === state)

const getSegmentClass = (themeState, segmentIndex) => {
  const themeIndex = getStageIndex(themeState)
  const config = getStageConfig(themeState)
  if (segmentIndex < themeIndex) return `${config.bgClass} opacity-60`
  if (segmentIndex === themeIndex) return `${config.bgClass} shadow-lg`
  return 'bg-[#333]'
}

const getModalDotClass = (themeState, stageKey, index) => {
  const themeIndex = getStageIndex(themeState)
  if (themeState === stageKey) return getStageConfig(stageKey).bgClass + ' border-white text-white'
  if (themeIndex > index) return 'bg-[#333] border-[#444] text-gray-500'
  return 'bg-[#1a1a1a] border-[#333] text-gray-600'
}

const getModalStageClass = (themeState, stageKey, index) => {
  const themeIndex = getStageIndex(themeState)
  const stage = lifecycleStages.find(s => s.key === stageKey)
  if (themeState === stageKey) {
    // Current stage - use stage's color with filled background
    return stage.dotClass
  }
  if (themeIndex > index) {
    // Passed stages - dimmed version of their color
    return 'bg-[#333] border-[#444] text-gray-500'
  }
  // Future stages - dark/empty
  return 'bg-[#1a1a1a] border-[#333] text-gray-600'
}

const getSentimentColor = (sentiment) => ({ bullish: 'text-green-400', bearish: 'text-red-400', neutral: 'text-gray-400' }[sentiment] || 'text-gray-400')
const getRecommendationLabel = (rec) => ({ 'APPROVED': '✅ 通过', 'REVIEW_REQUIRED': '⚠️ 需审核', 'REJECTED': '❌ 拒绝' }[rec] || rec)
const getRecommendationClass = (rec) => ({ 'APPROVED': 'bg-green-900/30 text-green-400 border border-green-800', 'REVIEW_REQUIRED': 'bg-yellow-900/30 text-yellow-400 border border-yellow-800', 'REJECTED': 'bg-red-900/30 text-red-400 border border-red-800' }[rec] || '')

// Toggle all stages selection
const toggleAllStages = () => {
  if (selectedStages.value.length === lifecycleStages.length) {
    selectedStages.value = []
  } else {
    selectedStages.value = lifecycleStages.map(s => s.key)
  }
}

// Close stage filter when clicking outside
const closeStageFilter = (event) => {
  const filterEl = document.querySelector('.stage-filter-dropdown')
  if (filterEl && !filterEl.contains(event.target)) {
    showStageFilter.value = false
  }
}

const sortedThemes = computed(() => {
  // 先按阶段筛选
  let themes = themesData.value.themes.filter(theme => 
    selectedStages.value.includes(theme.state)
  )
  
  // 再排序
  themes.sort((a, b) => {
    let aVal, bVal
    if (sortBy.value === 'time') { 
      aVal = new Date(a.first_detected).getTime()
      bVal = new Date(b.first_detected).getTime() 
    } else { 
      aVal = a.stock_count
      bVal = b.stock_count 
    }
    return sortOrder.value === 'desc' ? bVal - aVal : aVal - bVal
  })
  return themes
})

const setSort = (field) => { if (sortBy.value === field) sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'; else { sortBy.value = field; sortOrder.value = 'asc' } }
const openThemeDetail = (theme) => { selectedTheme.value = theme; showDetailModal.value = true }
const goToStockDetail = (ticker) => { router.push(`/info/stock/${ticker}`) }
const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }
const handleScroll = () => { showBackToTop.value = window.scrollY > 300 }

onMounted(() => { window.addEventListener('scroll', handleScroll) })
onUnmounted(() => { window.removeEventListener('scroll', handleScroll) })
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar { width: 6px; }
.overflow-y-auto::-webkit-scrollbar-track { background: #1a1a1a; }
.overflow-y-auto::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
</style>
