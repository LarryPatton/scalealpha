<template>
  <div class="h-screen font-sans selection:bg-cyan-500/30 overflow-hidden flex flex-col" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.secondary }">
    <Navbar />
    
    <main class="flex-1 pt-5 px-4 lg:px-8 max-w-[2200px] mx-auto w-full flex flex-col overflow-hidden relative">
      <!-- Toast Notifications -->
      <div class="fixed top-20 right-8 z-50 flex flex-col gap-2 pointer-events-none">
        <TransitionGroup name="toast">
          <div 
            v-for="toast in toasts" 
            :key="toast.id"
            class="pointer-events-auto min-w-[300px] max-w-md border rounded shadow-2xl p-4 flex items-start gap-3 transform transition-all duration-300"
            :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }"
            :class="{
              'border-l-4 border-l-emerald-500': toast.type === 'success',
              'border-l-4 border-l-red-500': toast.type === 'error',
              'border-l-4 border-l-blue-500': toast.type === 'info',
              'border-l-4 border-l-yellow-500': toast.type === 'warning'
            }"
          >
            <!-- Icons based on type -->
            <div class="shrink-0 mt-0.5">
              <svg v-if="toast.type === 'success'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.success }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <svg v-else-if="toast.type === 'error'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.error }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              <svg v-else-if="toast.type === 'warning'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.warning }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              <svg v-else class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.secondary }">{{ toast.message }}</p>
            </div>
            <button @click="removeToast(toast.id)" class="transition-colors" :style="{ color: tokens.colors.text.muted }">
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
          class="absolute top-2 right-2 z-30 w-8 h-8 flex items-center justify-center rounded-full border hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
          :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.muted }"
          :title="$t('opportunity.help.viewGuide')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="absolute right-full mr-2 px-2 py-1 text-xs border rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
            {{ $t('opportunity.help.guide') }}
          </span>
        </button>
        
        <!-- Left Column: Asset Selection -->
        <div id="asset-selection-panel" class="w-[240px] flex flex-col border overflow-hidden shrink-0" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <!-- Search & Filter Header -->
          <div class="p-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div class="flex gap-1 p-1 rounded-sm border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
              <button 
                v-for="tab in assetTabs" 
                :key="tab.id"
                @click="currentAssetTab = tab.id"
                class="flex-1 py-1.5 text-xs font-medium rounded-sm transition-all uppercase tracking-wider"
                :class="currentAssetTab === tab.id ? 'text-cyan-400 shadow-sm' : ''"
                :style="currentAssetTab === tab.id ? { backgroundColor: tokens.colors.background.overlay } : { color: tokens.colors.text.muted }"
              >
                {{ tab.label }}
              </button>
            </div>

            <div v-if="currentAssetTab === 'search'" class="relative mt-4">
              <input 
                v-model="searchQuery"
                type="text" 
                :placeholder="$t('opportunity.search.assetPlaceholder')"
                class="w-full border text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
              />
              <div class="absolute right-3 top-2.5" :style="{ color: tokens.colors.text.disabled }">
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
              class="group flex items-center p-2 rounded-sm cursor-pointer border border-transparent transition-all"
              :style="selectedStocks.includes(stock.symbol) 
                ? { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, boxShadow: `0 0 0 1px ${tokens.colors.accent.primary}4D` }
                : {}"
            >
              <div class="flex items-center gap-2">
                <div 
                  class="w-4 h-4 border rounded-sm flex items-center justify-center transition-colors shrink-0"
                  :style="selectedStocks.includes(stock.symbol) 
                    ? { backgroundColor: tokens.colors.accent.primary + '33', borderColor: tokens.colors.accent.primary }
                    : { borderColor: tokens.colors.border.strong }"
                >
                  <div v-if="selectedStocks.includes(stock.symbol)" class="w-2 h-2 rounded-[1px]" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="font-mono font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ stock.symbol }}</span>
                  </div>
                  <div class="text-xs mt-0.5 truncate" :style="{ color: tokens.colors.text.muted }">{{ stock.name }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Selection Summary -->
          <div class="border-t" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <!-- Selected Tags Area -->
            <div v-if="selectedStocks.length > 0" class="p-2 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              <div class="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar">
                <div v-for="symbol in selectedStocks" :key="symbol" class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.primary }">{{ symbol }}</span>
                  <button @click.stop="removeStock(symbol)" class="transition-colors" :style="{ color: tokens.colors.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Summary Footer -->
            <div class="p-3 text-xs font-mono" :style="{ color: tokens.colors.text.muted }">
              <span>{{ $t('opportunity.selected') }}: <span :style="{ color: tokens.colors.accent.primary }">{{ selectedStocks.length > 0 ? selectedStocks[0] : $t('opportunity.none') }}</span></span>
            </div>
          </div>
        </div>

        <!-- Right Column: Strategy Configuration -->
        <div class="flex-1 flex flex-col border overflow-hidden relative" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          
          <!-- Scrollable Content - 使用 flex 布局充分利用纵向空间 -->
          <div class="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-4">
            
            <!-- Header - 固定高度区域 -->
            <div class="flex justify-between items-center mb-3 border-b pb-2 shrink-0" :style="{ borderColor: tokens.colors.border.default }">
              <div>
                <h2 class="text-xl font-bold uppercase tracking-widest mb-1" :style="{ color: tokens.colors.text.primary }">{{ $t('opportunity.strategyConfig.title') }}</h2>
                <p class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.strategyConfig.subtitle') }}</p>
              </div>
            </div>

            <!-- Recommendation Hint - 固定高度区域 -->
            <div class="bg-cyan-900/10 border border-cyan-500/20 rounded-sm p-3 mb-3 flex items-start gap-3 shrink-0">
              <div class="mt-0.5 text-cyan-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p class="text-xs text-cyan-200/80 leading-relaxed">
                <span class="font-bold text-cyan-400">{{ $t('opportunity.config.recommendHintTitle') }}</span> = {{ $t('opportunity.config.recommendHintDesc') }}
              </p>
            </div>

            <!-- Advanced Mode Settings - 弹性区域，均分剩余空间 -->
            <div class="flex-1 flex flex-col gap-3 animate-fade-in min-h-0">
              
              <!-- 1. Analysis Framework - flex-[2] 因为有2行卡片 -->
              <div id="analysis-frameworks" class="flex-[2] flex flex-col min-h-0">
                <h3 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> {{ $t('opportunity.config.frameworkTitle') }}
                </h3>
                <div class="flex gap-3 flex-1 min-h-0">
                  <!-- 左侧：卡片网格 -->
                  <div class="flex-[7] grid grid-cols-4 gap-2 auto-rows-fr">
                    <button 
                      v-for="framework in frameworks" 
                      :key="framework.id"
                      @click="toggleFramework(framework.id)"
                      class="py-1.5 px-2.5 border rounded-lg transition-all text-left relative group flex items-center gap-3 overflow-hidden"
                      :class="selectedFrameworks.includes(framework.id) 
                        ? (isDark ? 'border-cyan-500 bg-cyan-900/20 glow-primary-lg ring-1 ring-cyan-500/50' : 'shadow-sm') 
                        : (isDark ? 'hover:border-gray-600' : 'hover:border-slate-300')"
                      :style="selectedFrameworks.includes(framework.id) 
                        ? (isDark ? {} : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }) 
                        : { backgroundColor: isDark ? tokens.colors.background.surface : '#F7F8FA', borderColor: isDark ? tokens.colors.border.default : '#e5e7eb' }"
                    >
                      <!-- 左侧色条 (日间模式) -->
                      <div v-if="!isDark && selectedFrameworks.includes(framework.id)" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                      <!-- 左侧：图标 -->
                      <div class="shrink-0" :class="!isDark && selectedFrameworks.includes(framework.id) ? 'pl-2' : ''">
                        <component v-if="framework.id === 'auto' && selectedFrameworks.includes('auto')" :is="IconAutoFilled" class="w-7 h-7 transition-colors" :class="isDark ? 'text-cyan-400' : 'text-blue-500'" />
                        <component v-else :is="framework.icon" class="w-7 h-7 transition-colors" :class="selectedFrameworks.includes(framework.id) ? (isDark ? 'text-cyan-400' : 'text-blue-500') : (isDark ? 'text-gray-600 group-hover:text-cyan-400' : 'text-gray-400 group-hover:text-blue-500')" />
                      </div>
                      <!-- 中间：文字 -->
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-bold leading-tight" :style="{ color: isDark ? '#ffffff' : '#1e293b' }">{{ framework.title }}</div>
                        <div class="text-xs leading-snug truncate" :style="{ color: isDark ? '#6b7280' : '#64748b' }">{{ framework.desc }}</div>
                      </div>
                      <!-- 右侧：选中框 -->
                      <div class="w-4 h-4 border rounded-[2px] flex items-center justify-center shrink-0" :class="selectedFrameworks.includes(framework.id) ? (isDark ? 'bg-cyan-500 border-cyan-500' : 'bg-blue-500 border-blue-500') : ''" :style="selectedFrameworks.includes(framework.id) ? {} : { borderColor: isDark ? tokens.colors.border.strong : '#cbd5e1' }">
                        <svg v-if="selectedFrameworks.includes(framework.id)" class="w-2.5 h-2.5" :class="isDark ? 'text-black' : 'text-white'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </button>
                  </div>
                  <!-- 右侧：补充说明 -->
                  <div class="flex-[3] flex flex-col border rounded p-3 transition-all min-h-0"
                       :style="{ backgroundColor: tokens.colors.background.surface, borderColor: configNotes.framework ? tokens.colors.border.strong : tokens.colors.border.default }">
                    <div class="flex items-center justify-between mb-1.5 shrink-0">
                      <span class="text-xs font-bold text-gray-400">{{ $t('opportunity.config.notePlaceholder') }}</span>
                      <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ configNotes.framework.length }}/100</span>
                    </div>
                    <textarea 
                      v-model="configNotes.framework"
                      :placeholder="$t('opportunity.config.frameworkNotePlaceholder')"
                      maxlength="100"
                      class="flex-1 w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none leading-relaxed min-h-0"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- 2. Investment Period - flex-1 均分空间 -->
              <div id="investment-period" class="flex-1 flex flex-col min-h-0">
                <h3 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {{ $t('opportunity.config.periodTitle') }}
                </h3>
                <div class="flex gap-3 flex-1 min-h-0">
                  <!-- 左侧：卡片网格 -->
                  <div class="flex-[7] grid grid-cols-5 gap-2">
                    <button 
                      v-for="period in periods" 
                      :key="period.id"
                      @click="selectedPeriod = period.id"
                      class="py-1.5 px-2.5 border rounded-lg transition-all text-left relative group flex items-center gap-2.5 overflow-hidden"
                      :class="selectedPeriod === period.id 
                        ? (isDark ? 'border-blue-500 bg-blue-900/20 glow-info-lg ring-1 ring-blue-500/50' : 'shadow-sm') 
                        : (isDark ? 'hover:border-gray-600' : 'hover:border-slate-300')"
                      :style="selectedPeriod === period.id 
                        ? (isDark ? {} : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }) 
                        : { backgroundColor: isDark ? tokens.colors.background.surface : '#F7F8FA', borderColor: isDark ? tokens.colors.border.default : '#e5e7eb' }"
                    >
                      <!-- 左侧色条 (日间模式) -->
                      <div v-if="!isDark && selectedPeriod === period.id" class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                      <!-- 左侧：图标 -->
                      <div class="shrink-0" :class="!isDark && selectedPeriod === period.id ? 'pl-2' : ''">
                        <component v-if="period.id === 'auto' && selectedPeriod === 'auto'" :is="IconAutoFilled" class="w-6 h-6 transition-colors" :class="isDark ? 'text-blue-400' : 'text-blue-500'" />
                        <component v-else :is="period.icon" class="w-6 h-6 transition-colors" :class="selectedPeriod === period.id ? (isDark ? 'text-blue-400' : 'text-blue-500') : (isDark ? 'text-gray-600 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-500')" />
                      </div>
                      <!-- 右侧：文字 -->
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-bold leading-tight" :style="{ color: isDark ? '#ffffff' : '#1e293b' }">{{ period.title }}</div>
                        <div class="text-xs font-mono leading-snug truncate" :style="{ color: selectedPeriod === period.id ? (isDark ? 'rgba(191, 219, 254, 0.7)' : '#3b82f6') : (isDark ? '#6b7280' : '#64748b') }">{{ period.desc }}</div>
                      </div>
                    </button>
                  </div>
                  <!-- 右侧：补充说明 -->
                  <div class="flex-[3] flex flex-col border rounded p-3 transition-all min-h-0"
                       :style="{ backgroundColor: tokens.colors.background.surface, borderColor: configNotes.period ? tokens.colors.border.strong : tokens.colors.border.default }">
                    <div class="flex items-center justify-between mb-1.5 shrink-0">
                      <span class="text-xs font-bold text-gray-400">{{ $t('opportunity.config.notePlaceholder') }}</span>
                      <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ configNotes.period.length }}/100</span>
                    </div>
                    <textarea 
                      v-model="configNotes.period"
                      :placeholder="$t('opportunity.config.periodNotePlaceholder')"
                      maxlength="100"
                      class="flex-1 w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none leading-relaxed min-h-0"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- 3. Risk Appetite - flex-1 均分空间 -->
              <div id="risk-appetite" class="flex-1 flex flex-col min-h-0">
                <h3 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> {{ $t('opportunity.config.riskTitle') }}
                </h3>
                <div class="flex gap-3 flex-1 min-h-0">
                  <!-- 左侧：卡片网格 -->
                  <div class="flex-[7] grid grid-cols-5 gap-2">
                    <button 
                      v-for="risk in risks" 
                      :key="risk.id"
                      @click="selectedRisk = risk.id"
                      class="py-1.5 px-2.5 border rounded-lg transition-all text-left relative group flex items-center gap-2.5 overflow-hidden"
                      :class="selectedRisk === risk.id 
                        ? (isDark ? 'border-orange-500 bg-orange-900/20 glow-orange-lg ring-1 ring-orange-500/50' : 'shadow-sm') 
                        : (isDark ? 'hover:border-gray-600' : 'hover:border-slate-300')"
                      :style="selectedRisk === risk.id 
                        ? (isDark ? {} : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }) 
                        : { backgroundColor: isDark ? tokens.colors.background.surface : '#F7F8FA', borderColor: isDark ? tokens.colors.border.default : '#e5e7eb' }"
                    >
                      <!-- 左侧色条 (日间模式) -->
                      <div v-if="!isDark && selectedRisk === risk.id" class="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                      <!-- 左侧：图标 -->
                      <div class="shrink-0" :class="!isDark && selectedRisk === risk.id ? 'pl-2' : ''">
                        <component v-if="risk.id === 'auto' && selectedRisk === 'auto'" :is="IconAutoFilled" class="w-6 h-6 transition-colors" :class="isDark ? 'text-orange-400' : 'text-amber-500'" />
                        <component v-else :is="risk.icon" class="w-6 h-6 transition-colors" :class="selectedRisk === risk.id ? (isDark ? 'text-orange-400' : 'text-amber-500') : (isDark ? 'text-gray-600 group-hover:text-orange-400' : 'text-gray-400 group-hover:text-amber-500')" />
                      </div>
                      <!-- 右侧：文字 -->
                      <div class="flex-1 min-w-0">
                        <div class="text-sm font-bold leading-tight" :style="{ color: isDark ? '#ffffff' : '#1e293b' }">{{ risk.title }}</div>
                        <div class="text-xs leading-snug truncate" :style="{ color: selectedRisk === risk.id ? (isDark ? 'rgba(254, 215, 170, 0.7)' : '#f59e0b') : (isDark ? '#6b7280' : '#64748b') }">{{ risk.desc }}</div>
                      </div>
                    </button>
                  </div>
                  <!-- 右侧：补充说明 -->
                  <div class="flex-[3] flex flex-col border rounded p-3 transition-all min-h-0"
                       :style="{ backgroundColor: tokens.colors.background.surface, borderColor: configNotes.risk ? tokens.colors.border.strong : tokens.colors.border.default }">
                    <div class="flex items-center justify-between mb-1.5 shrink-0">
                      <span class="text-xs font-bold text-gray-400">{{ $t('opportunity.config.notePlaceholder') }}</span>
                      <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ configNotes.risk.length }}/100</span>
                    </div>
                    <textarea 
                      v-model="configNotes.risk"
                      :placeholder="$t('opportunity.config.riskNotePlaceholder')"
                      maxlength="100"
                      class="flex-1 w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none leading-relaxed min-h-0"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- 4. Personal Insights - 个人洞察输入区 -->
              <div class="flex-1 flex flex-col min-h-0">
                <h3 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider shrink-0">
                  <span class="w-1.5 h-1.5 bg-purple-500 rounded-full"></span> {{ $t('opportunity.config.insightsTitle') }}
                  <span class="text-[9px] font-normal text-gray-600">{{ $t('opportunity.config.optional') }}</span>
                </h3>
                <div class="grid grid-cols-2 gap-2 flex-1 min-h-0">
                  <!-- 宏观市场观点 -->
                  <div class="flex flex-col border rounded-sm p-2 transition-all min-h-0"
                       :style="{ backgroundColor: tokens.colors.background.surface, borderColor: userInsights.macro ? tokens.colors.border.strong : tokens.colors.border.default }">
                    <div class="flex items-center justify-between mb-1 shrink-0">
                      <span class="text-xs font-bold text-gray-400">{{ $t('opportunity.config.macroInsight') }}</span>
                      <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ userInsights.macro.length }}/200</span>
                    </div>
                    <textarea 
                      v-model="userInsights.macro"
                      :placeholder="$t('opportunity.config.macroPlaceholder')"
                      maxlength="200"
                      class="flex-1 w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none leading-relaxed min-h-0"
                    ></textarea>
                  </div>
                  <!-- 标的深度洞察 -->
                  <div class="flex flex-col border rounded-sm p-2 transition-all min-h-0"
                       :style="{ backgroundColor: tokens.colors.background.surface, borderColor: userInsights.ticker ? tokens.colors.border.strong : tokens.colors.border.default }">
                    <div class="flex items-center justify-between mb-1 shrink-0">
                      <span class="text-xs font-bold text-gray-400">{{ $t('opportunity.config.tickerInsight') }}</span>
                      <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ userInsights.ticker.length }}/200</span>
                    </div>
                    <textarea 
                      v-model="userInsights.ticker"
                      :placeholder="$t('opportunity.config.tickerPlaceholder')"
                      maxlength="200"
                      class="flex-1 w-full bg-transparent text-xs text-gray-300 placeholder-gray-600 resize-none focus:outline-none leading-relaxed min-h-0"
                    ></textarea>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Footer Action Bar -->
          <div class="p-6 border-t flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div class="text-xs text-gray-500 font-mono">
              <div>{{ $t('opportunity.footer.estTime') }}: <span class="text-white">~3 {{ $t('opportunity.footer.mins') }}</span></div>
              <div>{{ $t('opportunity.footer.cost') }}: <span class="text-white">20 {{ $t('opportunity.footer.credits') }}</span></div>
            </div>
            <button 
              id="generate-btn"
              @click="handleInitializeGeneration"
              :disabled="isGenerationDisabled"
              class="px-8 py-3 font-bold text-sm tracking-widest uppercase rounded-sm transition-all flex items-center gap-2"
              :class="isGenerationDisabled 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'bg-cyan-600 hover:bg-cyan-500 text-white glow-primary-lg hover:glow-primary-lg'"
              :style="isGenerationDisabled ? { backgroundColor: tokens.colors.background.overlay } : {}"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              {{ $t('opportunity.footer.initGeneration') }}
            </button>
          </div>

        </div>
      </div>

        <!-- My Strategy Tab Content -->
        <div v-else-if="activeTab === 'mystrategy'" class="flex-1 flex flex-col min-h-0 mt-0 pb-24 animate-fade-in relative">
          
          <!-- Active Tasks Section (Zone A) -->
          <div id="active-generation-panel" class="w-full mb-3 border p-4 shrink-0" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
             <div class="flex justify-between items-center mb-3">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                 <span class="w-2 h-2 rounded-full" :class="(pendingTasks.length + processingTasks.length) > 0 ? 'bg-cyan-500 animate-pulse' : 'bg-gray-600'"></span>
                 {{ $t('opportunity.activeGeneration.title') }}
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono text-gray-600">{{ pendingTasks.length + processingTasks.length }} {{ $t('opportunity.activeGeneration.tasks') }}</span>
                <!-- Expand/Collapse Button -->
                <button 
                  v-if="pendingTasks.length + processingTasks.length > maxVisibleTasks"
                  @click="isActiveGenExpanded = !isActiveGenExpanded"
                  class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all"
                  :class="isActiveGenExpanded 
                    ? 'text-cyan-400 border-cyan-500/50 bg-cyan-900/20 hover:bg-cyan-900/30' 
                    : 'text-gray-400 hover:border-gray-500 hover:text-gray-200'"
                :style="isActiveGenExpanded ? {} : { borderColor: tokens.colors.border.strong }"
                >
                  <svg 
                    class="w-3 h-3 transition-transform duration-200" 
                    :class="isActiveGenExpanded ? 'rotate-180' : ''"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  {{ isActiveGenExpanded ? $t('opportunity.activeGeneration.collapse') : $t('opportunity.activeGeneration.expand') }}
                </button>
                <!-- Help Button for Strategy Tour -->
                <button 
                  @click="startStrategyTour"
                  class="w-6 h-6 flex items-center justify-center rounded-full border text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all group"
                  :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }"
                  :title="$t('opportunity.actions.viewGuide')"
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
                <div v-if="pendingTasks.length === 0 && processingTasks.length === 0" class="w-full flex items-center justify-center text-gray-600 text-xs font-mono border border-dashed rounded-sm" :style="{ borderColor: tokens.colors.border.strong }">
                  {{ $t('opportunity.activeGeneration.noActiveTasks') }}
                </div>

                <!-- Processing Tasks (显示在前面) -->
                <div 
                  v-for="task in visibleProcessingTasks" 
                  :key="task.id" 
                  class="min-w-[280px] max-w-[280px] border rounded-sm p-3 relative overflow-hidden group cursor-pointer transition-all shrink-0"
                  :style="{ backgroundColor: tokens.colors.background.base }"
                  :class="[
                    selectedStrategyId === `temp-${task.id}` 
                      ? 'border-cyan-500 glow-primary-md ring-2 ring-cyan-500/30 selected-task-glow' 
                      : 'border-cyan-900/30 hover:border-cyan-500/50'
                  ]"
                  @click="selectTaskStrategy(task)"
                >
                   <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                   <div class="flex justify-between items-start mb-2">
                      <div class="flex items-center gap-2">
                         <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ task.symbol }}</span>
                         <span class="text-[10px] px-1.5 py-0.5 rounded border" :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D' }">{{ $t('opportunity.activeGeneration.processing') }}</span>
                         <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 rounded border animate-pulse" :style="{ backgroundColor: tokens.colors.semantic.success + '4D', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' }">{{ $t('opportunity.activeGeneration.selected') }}</span>
                      </div>
                      <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ task.timeLeft }}</div>
                   </div>
                   <div class="h-1 rounded-full overflow-hidden mb-2" :style="{ backgroundColor: tokens.colors.border.default }">
                      <div class="h-full transition-all duration-300 relative" :style="{ width: task.progress + '%', backgroundColor: tokens.colors.accent.primary }"></div>
                   </div>
                   <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ task.statusText }}</div>
                </div>

                <!-- Pending Tasks (只显示折叠数量) -->
                <div 
                  v-for="task in visiblePendingTasks" 
                  :key="task.id" 
                  class="min-w-[200px] max-w-[200px] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all relative overflow-hidden shrink-0"
                  :class="[
                    selectedStrategyId === `temp-${task.id}` 
                      ? 'border-cyan-500 glow-primary-md ring-2 ring-cyan-500/30 opacity-100 selected-task-glow' 
                      : 'hover:border-gray-500 opacity-70 hover:opacity-100'
                  ]"
                  :style="{ backgroundColor: tokens.colors.background.base, borderColor: selectedStrategyId === `temp-${task.id}` ? undefined : tokens.colors.border.default }"
                  @click="selectTaskStrategy(task)"
                >
                   <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 animate-gradient-x" :style="{ background: `linear-gradient(to right, ${tokens.colors.accent.primary}, ${tokens.colors.semantic.success}, ${tokens.colors.accent.primary})` }"></div>
                   <div class="flex justify-between items-center mb-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold" :style="{ color: selectedStrategyId === `temp-${task.id}` ? tokens.colors.text.primary : tokens.colors.text.tertiary }">{{ task.symbol }}</span>
                        <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 rounded border animate-pulse" :style="{ backgroundColor: tokens.colors.semantic.success + '4D', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' }">{{ $t('opportunity.activeGeneration.selected') }}</span>
                      </div>
                      <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.activeGeneration.pending') }}</span>
                   </div>
                   <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.activeGeneration.est') }}: {{ task.estTime }}</div>
                </div>

                <!-- +N More 提示卡片 -->
                <div 
                  v-if="hiddenTasksCount > 0"
                  @click="isActiveGenExpanded = true"
                  class="min-w-[100px] max-w-[100px] border border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-all shrink-0"
                  :style="{ background: `linear-gradient(to bottom right, ${tokens.colors.background.overlay}, ${tokens.colors.background.base})`, borderColor: tokens.colors.accent.primary + '4D' }"
                >
                  <span class="text-xl font-bold" :style="{ color: tokens.colors.accent.primary }">+{{ hiddenTasksCount }}</span>
                  <span class="text-[10px] mt-1" :style="{ color: tokens.colors.text.tertiary }">{{ $t('opportunity.activeGeneration.more') }}</span>
                </div>
           </div>

           <!-- Expanded View (网格布局) -->
           <div v-else class="grid grid-cols-4 gap-3 min-h-[70px]">
              <!-- Empty State -->
              <div v-if="pendingTasks.length === 0 && processingTasks.length === 0" class="col-span-4 flex items-center justify-center text-gray-600 text-xs font-mono border border-dashed rounded-sm py-6" :style="{ borderColor: tokens.colors.border.strong }">
                {{ $t('opportunity.activeGeneration.noActiveTasks') }}
              </div>

              <!-- Processing Tasks -->
              <div 
                v-for="task in processingTasks" 
                :key="task.id" 
                class="border rounded-sm p-3 relative overflow-hidden group cursor-pointer transition-all"
                :class="[
                  selectedStrategyId === `temp-${task.id}` 
                    ? 'border-cyan-500 glow-primary-md ring-2 ring-cyan-500/30 selected-task-glow' 
                    : 'border-cyan-900/30 hover:border-cyan-500/50'
                ]"
                :style="{ backgroundColor: tokens.colors.background.base }"
                @click="selectTaskStrategy(task)"
              >
                 <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                 <div class="flex justify-between items-start mb-2">
                    <div class="flex items-center gap-2">
                       <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ task.symbol }}</span>
                       <span class="text-[10px] px-1.5 py-0.5 rounded border" :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D' }">{{ $t('opportunity.activeGeneration.processing') }}</span>
                       <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 rounded border animate-pulse" :style="{ backgroundColor: tokens.colors.semantic.success + '4D', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' }">{{ $t('opportunity.activeGeneration.selected') }}</span>
                    </div>
                    <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ task.timeLeft }}</div>
                 </div>
                 <div class="h-1 rounded-full overflow-hidden mb-2" :style="{ backgroundColor: tokens.colors.border.default }">
                    <div class="h-full transition-all duration-300 relative" :style="{ width: task.progress + '%', backgroundColor: tokens.colors.accent.primary }"></div>
                 </div>
                 <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ task.statusText }}</div>
              </div>

              <!-- Pending Tasks -->
              <div 
                v-for="task in pendingTasks" 
                :key="task.id" 
                class="border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all relative overflow-hidden"
                :style="selectedStrategyId === `temp-${task.id}` 
                    ? { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.accent.primary, boxShadow: `0 0 15px ${tokens.colors.accent.primary}4D`, opacity: 1 }
                    : { backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, opacity: 0.7 }"
                @click="selectTaskStrategy(task)"
              >
                 <div v-if="selectedStrategyId === `temp-${task.id}`" class="absolute top-0 left-0 w-full h-0.5 animate-gradient-x" :style="{ background: `linear-gradient(to right, ${tokens.colors.accent.primary}, ${tokens.colors.semantic.success}, ${tokens.colors.accent.primary})` }"></div>
                 <div class="flex justify-between items-center mb-1">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-bold" :style="{ color: selectedStrategyId === `temp-${task.id}` ? tokens.colors.text.primary : tokens.colors.text.tertiary }">{{ task.symbol }}</span>
                      <span v-if="selectedStrategyId === `temp-${task.id}`" class="text-[10px] px-1.5 py-0.5 rounded border animate-pulse" :style="{ backgroundColor: tokens.colors.semantic.success + '4D', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' }">{{ $t('opportunity.activeGeneration.selected') }}</span>
                    </div>
                    <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.activeGeneration.pending') }}</span>
                 </div>
                 <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.activeGeneration.est') }}: {{ task.estTime }}</div>
              </div>
           </div>
        </div>

          <div class="flex-1 flex gap-4 overflow-hidden">
            <!-- Left Sidebar: Collections -->
            <div id="strategy-sidebar" class="w-56 flex flex-col border overflow-hidden" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
              <div class="flex-1 overflow-y-auto custom-scrollbar py-1">
                <!-- Smart Filters Section -->
              <div class="px-3 py-2">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{{ $t('opportunity.smartFilters.title') }}</h3>
                  <!-- Toggle Switch -->
                  <button 
                    @click="smartFiltersEnabled = !smartFiltersEnabled; if(!smartFiltersEnabled) libraryFilter = 'all'"
                    class="relative w-7 h-4 rounded-full transition-colors duration-200"
                    :class="smartFiltersEnabled ? 'bg-cyan-600' : ''"
                    :style="smartFiltersEnabled ? {} : { backgroundColor: tokens.colors.border.strong }"
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
                    :class="libraryFilter === 'high-grade' ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
                    :style="libraryFilter === 'high-grade' ? { backgroundColor: tokens.colors.background.overlay } : {}"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('high-grade') && libraryFilter !== 'high-grade'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      {{ $t('opportunity.smartFilters.highGrade') }}
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'high-grade' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['high-grade'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('recommend-update')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'recommend-update' ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
                    :style="libraryFilter === 'recommend-update' ? { backgroundColor: tokens.colors.background.overlay } : {}"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('recommend-update') && libraryFilter !== 'recommend-update'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      {{ $t('opportunity.smartFilters.recommendedUpdate') }}
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'recommend-update' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['recommend-update'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('no-signal')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'no-signal' ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
                    :style="libraryFilter === 'no-signal' ? { backgroundColor: tokens.colors.background.overlay } : {}"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('no-signal') && libraryFilter !== 'no-signal'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      {{ $t('opportunity.smartFilters.noSignalLogs') }}
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'no-signal' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['no-signal'] }}</span>
                  </button>
                  <button 
                    @click="selectSmartFilter('no-opportunity')"
                    class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center group"
                    :class="libraryFilter === 'no-opportunity' ? 'text-white' : 'text-gray-400 hover:text-gray-200'"
                    :style="libraryFilter === 'no-opportunity' ? { backgroundColor: tokens.colors.background.overlay } : {}"
                  >
                    <span class="flex items-center gap-1.5">
                      <span v-if="hasNewData('no-opportunity') && libraryFilter !== 'no-opportunity'" class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      {{ $t('opportunity.smartFilters.noOpportunityFound') }}
                    </span>
                    <span class="text-[10px] font-mono" :class="libraryFilter === 'no-opportunity' ? 'text-cyan-500' : 'text-gray-600'">{{ smartFilterCounts['no-opportunity'] }}</span>
                  </button>
                </div>
                <div v-else class="text-[10px] text-gray-600 px-3 py-1">
                  Filters disabled
                </div>
              </div>

              <!-- Divider -->
              <div class="h-px mx-3 my-1" :style="{ backgroundColor: tokens.colors.border.default }"></div>

              <!-- Collections Section -->
              <div class="px-3 py-2">
                 <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{{ $t('opportunity.collections.title') }}</h3>
              </div>
            <button 
              v-for="col in strategyCollections" 
              :key="col.id"
              @click="selectedCollection = col.id"
              class="w-full flex items-center justify-between px-3 py-2 border-l-2 transition-all group relative"
              :class="selectedCollection === col.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'"
              :style="selectedCollection === col.id ? { backgroundColor: tokens.colors.background.base } : {}"
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
                  class="w-3.5 h-3.5 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-all"
                  :style="{ color: tokens.colors.text.muted }"
                >
                   <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
              </div>
            </button>

            <!-- New Group Input -->
            <div v-if="isCreatingGroup" class="px-3 py-1">
              <div class="flex items-center gap-2 px-3 py-2 border border-cyan-500/50 rounded" :style="{ backgroundColor: tokens.colors.background.base }">
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
          <div v-if="!isCreatingGroup" class="p-3 border-t" :style="{ borderColor: tokens.colors.border.default }">
            <button 
              @click="startCreateGroup" 
              class="w-full py-1.5 border rounded text-[10px] font-bold text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
              :style="{ borderColor: tokens.colors.border.strong }"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
              {{ $t('opportunity.collections.newGroup') }}
            </button>
          </div>
        </div>

          <!-- Right Content: Strategy List -->
          <div id="strategy-list-container" class="flex-1 flex flex-col border overflow-hidden" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <!-- Header -->
            <div id="strategy-toolbar" class="px-4 py-3 border-b flex justify-between items-center h-[60px] relative z-20" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              
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
                <p class="text-xs text-gray-500 font-mono">{{ displayedStrategies.length }} {{ $t('opportunity.strategyTable.strategiesFound') }}</p>
              </div>
              <div class="flex items-center gap-3">
                <!-- 一键清理 No Opportunity Found 按钮 -->
                <button 
                  v-if="libraryFilter === 'no-opportunity' && displayedStrategies.length > 0"
                  @click="clearNoOpportunityStrategies"
                  class="flex items-center gap-1.5 px-2.5 py-1.5 border rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                  :style="{ backgroundColor: tokens.colors.semantic.error + '33', borderColor: tokens.colors.semantic.error + '80', color: tokens.colors.semantic.error }"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  {{ $t('opportunity.strategyTable.clearAll') }}
                </button>
                <!-- Move to Group (Moved from Bulk Action) -->
                <div class="relative mr-2" v-if="selectedStrategyId">
                  <button 
                    @click="showMoveMenu = !showMoveMenu"
                    class="flex items-center gap-2 px-3 py-1.5 border rounded-sm text-xs font-bold uppercase tracking-wider transition-all"
                    :style="{ backgroundColor: tokens.colors.accent.primary + '33', borderColor: tokens.colors.accent.primary + '80', color: tokens.colors.accent.primary }"
                  >
                    <component :is="IconBriefcase" class="w-3 h-3" />
                    {{ $t('opportunity.strategyTable.moveToGroup') }}
                    <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  
                  <!-- Dropdown Menu -->
                  <div v-if="showMoveMenu" class="absolute left-0 top-full mt-2 w-48 border rounded shadow-xl z-[100] overflow-hidden" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
                    <div class="py-1">
                      <button 
                        v-for="col in customCollections" 
                        :key="col.id"
                        @click="moveStrategiesToGroup(col.id)"
                        class="w-full text-left px-4 py-2 text-xs text-gray-300 hover:text-white flex items-center gap-2"
                        :style="{ ':hover': { backgroundColor: tokens.colors.background.elevated } }"
                        @mouseenter="$event.target.style.backgroundColor = tokens.colors.background.elevated"
                        @mouseleave="$event.target.style.backgroundColor = 'transparent'"
                      >
                        <component :is="col.icon" class="w-3 h-3 text-gray-500" />
                        {{ col.label }}
                      </button>
                      <div v-if="customCollections.length === 0" class="px-4 py-2 text-xs text-gray-500 italic">
                        {{ $t('opportunity.strategyTable.noCustomGroups') }}
                      </div>
                    </div>
                    <div class="border-t p-1" :style="{ borderColor: tokens.colors.border.strong }">
                       <button @click="startCreateGroup(); showMoveMenu = false" class="w-full text-left px-3 py-2 text-xs text-cyan-400 font-bold flex items-center gap-2" :style="{ ':hover': { backgroundColor: tokens.colors.background.overlay } }" @mouseenter="$event.target.style.backgroundColor = tokens.colors.background.overlay" @mouseleave="$event.target.style.backgroundColor = 'transparent'">
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                         {{ $t('opportunity.strategyTable.createNewGroup') }}
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
                    :placeholder="$t('opportunity.strategyTable.searchPlaceholder')" 
                    class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none w-48 font-mono"
                    :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
                  />
                  <div class="absolute right-2 top-1.5" :style="{ color: tokens.colors.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                </div>
                
                <!-- Filter -->
                <select v-model="strategyFilterOption" class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none font-mono" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
                  <option value="all">{{ $t('opportunity.strategyTable.allDirections') }}</option>
                  <option value="long">{{ $t('opportunity.strategyTable.long') }}</option>
                  <option value="short">{{ $t('opportunity.strategyTable.short') }}</option>
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
                <col :style="{ width: isExecutionPlanExpanded ? '170px' : '400px' }" /> <!-- Name - 折叠时变宽 -->
                <col style="width: 80px;" />  <!-- Source -->
                <col style="width: 80px;" />  <!-- Direction -->
                <col style="width: 55px;" />  <!-- Grade -->
                <col style="width: 75px;" />  <!-- Horizon -->
                <col style="width: 90px;" />  <!-- Created -->
                <col style="width: 80px;" />  <!-- Strategy Update -->
                <col style="width: 85px;" />  <!-- Plan Status - 始终显示 -->
                <col v-if="isExecutionPlanExpanded" style="width: 60px;" />  <!-- Plan Count -->
                <col v-if="isExecutionPlanExpanded" style="width: 60px;" />  <!-- Unread -->
                <col v-if="isExecutionPlanExpanded" style="width: 100px;" /> <!-- Generating -->
                <col v-if="isExecutionPlanExpanded" style="width: 85px;" />  <!-- Plan Update -->
                <col style="width: 90px;" />  <!-- Actions - 独立列 -->
              </colgroup>
              <thead class="sticky top-0 z-20">
                <!-- 分组表头行 -->
                <tr class="border-b" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.surface }">
                  <th rowspan="2" class="px-2 py-2 border-b align-middle" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div 
                      @click="toggleSelectAllStrategies" 
                      class="w-5 h-5 border rounded-[2px] flex items-center justify-center cursor-pointer transition-colors mx-auto" 
                      :style="isAllStrategiesSelected 
                        ? { backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary }
                        : { borderColor: tokens.colors.border.strong }"
                    >
                      <svg v-if="isAllStrategiesSelected" class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </th>
                  <!-- Ticker 独立列 -->
                  <th rowspan="2" @click="handleSort('symbol')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-r cursor-pointer hover:text-white transition-colors select-none align-middle" :style="{ color: tokens.colors.text.tertiary, borderBottomColor: tokens.colors.border.default, borderRightColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center gap-1">
                      {{ $t('opportunity.strategyTable.ticker') }}
                      <span v-if="strategySortField === 'symbol'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <!-- 策略分组 -->
                  <th colspan="7" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-r text-center" :style="{ color: tokens.colors.accent.primary, borderBottomColor: tokens.colors.border.strong, borderRightColor: tokens.colors.border.strong, background: `linear-gradient(to right, ${tokens.colors.accent.primary}26, ${tokens.colors.accent.primary}1A), ${tokens.colors.background.surface}` }">
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      {{ $t('opportunity.strategyTable.strategy') }}
                    </div>
                  </th>
                  <!-- 计划分组 -->
                  <th :colspan="isExecutionPlanExpanded ? 5 : 1" @click="toggleExecutionPlanExpand" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-r text-center cursor-pointer select-none transition-all hover:brightness-110" :style="{ color: tokens.colors.accent.warning, borderBottomColor: tokens.colors.border.strong, borderRightColor: tokens.colors.border.strong, background: `linear-gradient(to right, ${tokens.colors.accent.warning}26, ${tokens.colors.accent.warning}1A), ${tokens.colors.background.surface}` }">
                    <div class="flex items-center justify-center gap-2">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      {{ $t('opportunity.strategyTable.executionPlan') }}
                      <svg class="w-3 h-3 transition-transform duration-200" :class="isExecutionPlanExpanded ? 'rotate-0' : '-rotate-90'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </th>
                  <!-- 操作列（独立） -->
                  <th rowspan="2" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b text-center align-middle" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    {{ $t('opportunity.strategyTable.actions') }}
                  </th>
                </tr>
                <!-- 子表头行 -->
                <tr :style="{ backgroundColor: tokens.colors.background.surface }">
                  <!-- 策略子列 -->
                  <th @click="handleSort('stockName')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center gap-1">
                      {{ $t('opportunity.strategyTable.name') }}
                      <span v-if="strategySortField === 'stockName'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('source')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-center" :style="{ color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.source') }}
                      <span v-if="strategySortField === 'source'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('direction')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-center" :style="{ color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.direction') }}
                      <span v-if="strategySortField === 'direction'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('grade')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-center" :style="{ color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.grade') }}
                      <span v-if="strategySortField === 'grade'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('horizon')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-center" :style="{ color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.horizon') }}
                      <span v-if="strategySortField === 'horizon'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th @click="handleSort('generatedAt')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-center" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.created') }}
                      <span v-if="strategySortField === 'generatedAt'" :style="{ color: tokens.colors.accent.primary }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-r text-center" :style="{ color: tokens.colors.text.muted, borderBottomColor: tokens.colors.border.default, borderRightColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.surface }">
                    {{ $t('opportunity.strategyTable.update') }}
                  </th>
                  <!-- 计划子列 - 状态列始终显示 -->
                  <th @click="handleSort('hasExecutionPlan')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b text-center cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.status') }}
                      <span v-if="strategySortField === 'hasExecutionPlan'" :style="{ color: tokens.colors.semantic.warning }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th v-if="isExecutionPlanExpanded" @click="handleSort('planCount')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b text-center cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.count') }}
                      <span v-if="strategySortField === 'planCount'" :style="{ color: tokens.colors.semantic.warning }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th v-if="isExecutionPlanExpanded" @click="handleSort('planUnreadCount')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b text-center cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.unread') }}
                      <span v-if="strategySortField === 'planUnreadCount'" :style="{ color: tokens.colors.semantic.warning }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th v-if="isExecutionPlanExpanded" @click="handleSort('planGeneratingCount')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b text-center cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.generating') }}
                      <span v-if="strategySortField === 'planGeneratingCount'" :style="{ color: tokens.colors.semantic.warning }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                  <th v-if="isExecutionPlanExpanded" @click="handleSort('planNeedsUpdate')" class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b border-r text-center cursor-pointer hover:text-white transition-colors select-none" :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, borderRightColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.surface }">
                    <div class="flex items-center justify-center gap-1">
                      {{ $t('opportunity.strategyTable.update') }}
                      <span v-if="strategySortField === 'planNeedsUpdate'" :style="{ color: tokens.colors.semantic.warning }">{{ strategySortDirection === 'asc' ? '▲' : '▼' }}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(strategy, index) in displayedStrategies" :key="strategy.id">
                <tr 
                  :id="index === 0 ? 'first-strategy-row' : undefined"
                  class="border-b transition-colors group cursor-pointer relative"
                  :class="[
                    selectedStrategyId === strategy.id ? 'border-l-2' : '',
                    strategy.grade === 'N/A' ? 'opacity-50 grayscale' : '',
                    strategy.hasError || strategy.grade === 'ERROR' ? 'opacity-70' : '',
                    strategy.isExpired ? 'opacity-60' : '',
                    regeneratingStrategies[strategy.id] ? 'pointer-events-none' : '',
                    isStrategyExpanded(strategy.id) ? 'border-b-0' : ''
                  ]"
                  :style="{ 
                    borderBottomColor: tokens.colors.border.subtle,
                    backgroundColor: selectedStrategyId === strategy.id ? tokens.colors.accent.primary + '33' : 'transparent',
                    borderLeftColor: selectedStrategyId === strategy.id ? tokens.colors.accent.primary : 'transparent'
                  }"
                  @mouseenter="$event.currentTarget.style.backgroundColor = selectedStrategyId === strategy.id ? tokens.colors.accent.primary + '33' : tokens.colors.background.elevated"
                  @mouseleave="$event.currentTarget.style.backgroundColor = selectedStrategyId === strategy.id ? tokens.colors.accent.primary + '33' : 'transparent'"
                  @click="(strategy.grade !== 'N/A' || strategy.hasError || strategy.isExpired) && !regeneratingStrategies[strategy.id] ? toggleStrategySelection(strategy.id) : null"
                >
                  <!-- Regenerating Overlay -->
                  <td v-if="regeneratingStrategies[strategy.id]" colspan="15" class="absolute inset-0 z-20">
                    <div class="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center" :style="{ backgroundColor: tokens.colors.background.surface + 'E6' }">
                      <div class="flex items-center gap-3 mb-2">
                        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" :style="{ color: tokens.colors.accent.primary }">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-sm font-bold uppercase tracking-wider" :style="{ color: tokens.colors.accent.primary }">Updating...</span>
                      </div>
                      <div class="w-48 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
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
                      :style="selectedStrategyId === strategy.id 
                        ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary }
                        : { borderColor: tokens.colors.border.strong }"
                    >
                      <div v-if="selectedStrategyId === strategy.id" class="w-2 h-2 bg-black rounded-full"></div>
                    </div>
                  </td>
                  <!-- Ticker (独立列) -->
                  <td class="px-3 py-3 whitespace-nowrap border-r" :style="{ borderColor: tokens.colors.border.default }">
                    <span class="font-mono font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ strategy.symbol }}</span>
                  </td>
                  <!-- Name + View Button -->
                  <td class="px-3 py-3 whitespace-nowrap" :class="isExecutionPlanExpanded ? '' : 'w-auto'">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <!-- 未读策略标记 -->
                        <span v-if="strategy.strategyUnread" class="w-2 h-2 rounded-full animate-pulse flex-shrink-0" :style="{ backgroundColor: tokens.colors.accent.primary }" title="Unread Strategy"></span>
                        <span class="text-xs truncate transition-all duration-200" :class="isExecutionPlanExpanded ? 'max-w-[90px]' : 'max-w-[300px]'" :style="{ color: tokens.colors.text.secondary }" :title="strategy.stockName">{{ strategy.stockName }}</span>
                      </div>
                      <!-- View Button (hover) -->
                      <button 
                        v-if="strategy.grade !== 'N/A'" 
                        @click.stop="viewStrategyDetail(strategy)"
                        class="text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded whitespace-nowrap hover:border-opacity-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                        :style="{ color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D', backgroundColor: tokens.colors.background.surface + 'E6' }"
                      >
                        {{ $t('opportunity.strategyTable.view') }}
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
                      {{ strategy.source === 'Official' ? $t('opportunity.strategyTable.official') : strategy.source === 'My Strategy' ? $t('opportunity.strategyTable.myStrategy') : strategy.source }}
                    </span>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Direction (完整显示) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.direction === 'LONG' || strategy.direction === 'SHORT'"
                      class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                      :style="strategy.direction === 'LONG' 
                        ? { color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D', backgroundColor: tokens.colors.semantic.success + '1A' }
                        : { color: tokens.colors.semantic.error, borderColor: tokens.colors.semantic.error + '4D', backgroundColor: tokens.colors.semantic.error + '1A' }"
                    >
                      {{ strategy.direction === 'LONG' ? $t('opportunity.strategyTable.long') : $t('opportunity.strategyTable.short') }}
                    </span>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Grade -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <!-- ERROR 状态：生成失败 -->
                    <div 
                      v-if="strategy.hasError || strategy.grade === 'ERROR'"
                      class="flex items-center justify-center gap-1.5 px-2 py-0.5 rounded border mx-auto"
                      :style="{ borderColor: tokens.colors.semantic.error + '4D', backgroundColor: tokens.colors.semantic.error + '1A' }"
                      :title="strategy.errorMessage || '生成失败'"
                    >
                      <svg class="w-3 h-3" :style="{ color: tokens.colors.semantic.error }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.semantic.error }">失败</span>
                    </div>
                    <!-- 已失效状态 -->
                    <div 
                      v-else-if="strategy.isExpired"
                      class="flex items-center justify-center gap-1.5 px-2 py-0.5 rounded border mx-auto"
                      :style="{ borderColor: tokens.colors.text.muted + '4D', backgroundColor: tokens.colors.text.muted + '1A' }"
                      :title="strategy.expiredReason || '策略已失效'"
                    >
                      <svg class="w-3 h-3" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">已失效</span>
                    </div>
                    <!-- 正常 Grade -->
                    <div 
                      v-else-if="strategy.grade && strategy.grade !== 'N/A'"
                      class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border mx-auto"
                      :style="strategy.grade === 'A' 
                        ? { borderColor: tokens.colors.semantic.success + '4D', backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }
                        : strategy.grade === 'B' 
                        ? { borderColor: tokens.colors.accent.primary + '4D', backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }
                        : { borderColor: tokens.colors.semantic.warning + '4D', backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }"
                    >
                      {{ strategy.grade }}
                    </div>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Horizon (完整显示) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.horizon && strategy.horizon !== 'N/A'"
                      class="px-2 py-0.5 rounded text-[10px] font-bold border"
                      :style="strategy.horizon.includes('Long') 
                        ? { color: tokens.colors.accent.secondary, borderColor: tokens.colors.accent.secondary + '4D', backgroundColor: tokens.colors.accent.secondary + '1A' }
                        : strategy.horizon.includes('Medium') 
                        ? { color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D', backgroundColor: tokens.colors.accent.primary + '1A' }
                        : { color: tokens.colors.semantic.warning, borderColor: tokens.colors.semantic.warning + '4D', backgroundColor: tokens.colors.semantic.warning + '1A' }"
                      :title="strategy.horizon"
                    >
                      {{ strategy.horizon.includes('Long') ? $t('opportunity.strategyTable.horizonLong') : strategy.horizon.includes('Medium') ? $t('opportunity.strategyTable.horizonMedium') : $t('opportunity.strategyTable.horizonShort') }}
                    </span>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Created (策略下) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center">
                    <div class="text-xs font-mono" :style="{ color: tokens.colors.text.tertiary }">{{ new Date(strategy.generatedAt).toLocaleDateString() }}</div>
                  </td>
                  <!-- Strategy Update (建议更新) -->
                  <td class="px-3 py-3 whitespace-nowrap text-center border-r" :style="{ borderColor: tokens.colors.border.default }">
                    <!-- Official 来源：显示官方更新状态 -->
                    <template v-if="strategy.source === 'Official'">
                      <span 
                        v-if="strategy.officialUpdating"
                        class="px-2.5 py-1 bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                        title="Official is updating"
                      >
                        {{ $t('opportunity.strategyTable.updating') }}
                      </span>
                      <span 
                        v-else-if="strategy.officialUpdated"
                        class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                        :style="{ backgroundColor: tokens.colors.semantic.success + '4D', borderColor: tokens.colors.semantic.success + '99', color: tokens.colors.semantic.success }"
                        title="Official has updated"
                      >
                        {{ $t('opportunity.strategyTable.updated') }}
                      </span>
                      <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                    </template>
                    <!-- Only Plan 类型：没有策略，显示空 -->
                    <template v-else-if="strategy.hasStrategy === false">
                      <span class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                    </template>
                    <!-- No Opportunity Found (N/A grade)：显示 Retry 按钮 -->
                    <template v-else-if="strategy.grade === 'N/A'">
                      <button 
                        @click.stop="handleRegenerateSingle(strategy)"
                        class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider transition-colors mx-auto"
                        :style="{ backgroundColor: tokens.colors.accent.secondary + '4D', borderColor: tokens.colors.accent.secondary + '99', color: tokens.colors.accent.secondary }"
                        title="Change parameters and retry"
                      >
                        {{ $t('opportunity.strategyTable.retry') }}
                      </button>
                    </template>
                    <!-- 非 Official 来源：可点击更新 -->
                    <template v-else>
                      <button 
                        v-if="strategy.strategyNeedsUpdate"
                        @click.stop="handleRegenerateSingle(strategy)"
                        class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider transition-colors mx-auto"
                        :style="{ backgroundColor: tokens.colors.semantic.warning + '4D', borderColor: tokens.colors.semantic.warning + '99', color: tokens.colors.semantic.warning }"
                        title="Click to update"
                      >
                        {{ $t('opportunity.strategyTable.update') }}
                      </button>
                      <span 
                        v-else 
                        class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider mx-auto"
                        :style="{ backgroundColor: tokens.colors.semantic.success + '4D', borderColor: tokens.colors.semantic.success + '99', color: tokens.colors.semantic.success }"
                      >
                        {{ $t('opportunity.strategyTable.updated') }}
                      </span>
                    </template>
                  </td>
                  <!-- Plan Status - 始终显示 -->
                  <td class="px-3 py-3 whitespace-nowrap text-center" :class="{ 'border-r': !isExecutionPlanExpanded }" :style="!isExecutionPlanExpanded ? { borderRightColor: tokens.colors.border.strong } : {}">
                    <span 
                      v-if="strategy.hasStrategy === false && strategy.hasExecutionPlan"
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold border"
                      :style="{ color: tokens.colors.accent.secondary, borderColor: tokens.colors.accent.secondary + '4D', backgroundColor: tokens.colors.accent.secondary + '1A' }"
                      title="Only Plan - No Strategy Report"
                    >
                      {{ $t('opportunity.collections.onlyPlan') }}
                    </span>
                    <span 
                      v-else-if="strategy.hasExecutionPlan"
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold border"
                      :style="{ color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D', backgroundColor: tokens.colors.semantic.success + '1A' }"
                      title="Has Execution Plan"
                    >
                      {{ $t('opportunity.strategyTable.withPlan') }}
                    </span>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Plan Count -->
                  <td v-if="isExecutionPlanExpanded" class="px-3 py-3 whitespace-nowrap text-center">
                    <span v-if="strategy.planCount > 0" class="text-sm font-mono" :style="{ color: tokens.colors.text.secondary }">{{ strategy.planCount }}</span>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Unread Count -->
                  <td v-if="isExecutionPlanExpanded" class="px-3 py-3 whitespace-nowrap text-center">
                    <span 
                      v-if="strategy.planUnreadCount > 0" 
                      class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                      :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                    >
                      {{ strategy.planUnreadCount }}
                    </span>
                    <span v-else class="text-xs tracking-wider" :style="{ color: tokens.colors.text.muted }">— — —</span>
                  </td>
                  <!-- Generating (带进度条) -->
                  <td v-if="isExecutionPlanExpanded" class="px-3 py-3 whitespace-nowrap text-center">
                    <div v-if="strategy.planGeneratingCount > 0" class="flex flex-col items-center gap-1">
                      <div class="flex items-center gap-1.5">
                        <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" :style="{ color: tokens.colors.accent.primary }">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.primary }">{{ strategy.generatingCurrent }}/{{ strategy.planGeneratingCount }}</span>
                      </div>
                      <div class="w-16 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                        <div 
                          class="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all"
                          :style="{ width: `${strategy.generatingProgress || 0}%` }"
                        ></div>
                      </div>
                    </div>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Plan Update -->
                  <td v-if="isExecutionPlanExpanded" class="px-3 py-3 whitespace-nowrap text-center border-r" :style="{ borderRightColor: tokens.colors.border.strong }">
                    <button 
                      v-if="strategy.planNeedsUpdate"
                      @click.stop
                      class="flex items-center gap-1.5 px-2 py-1 border rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors mx-auto"
                      :style="{ backgroundColor: tokens.colors.semantic.warning + '33', borderColor: tokens.colors.semantic.warning + '66', color: tokens.colors.semantic.warning }"
                      title="Plan needs update"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      {{ $t('opportunity.strategyTable.update') }}
                    </button>
                    <span v-else class="text-xs text-gray-500 tracking-wider">— — —</span>
                  </td>
                  <!-- Actions - 独立列 -->
                  <td class="px-3 py-3 whitespace-nowrap text-center" :class="{ 'border-l': !isExecutionPlanExpanded }" :style="!isExecutionPlanExpanded ? { borderLeftColor: tokens.colors.border.strong } : {}">
                    <div class="flex items-center justify-center gap-1">
                      <!-- 重试按钮 (hasError 状态) - 圆环样式，黄色主题 -->
                      <button 
                        v-if="strategy.hasError || strategy.grade === 'ERROR'"
                        @click.stop="handleRegenerateSingle(strategy)"
                        class="p-1.5 border rounded-full transition-colors hover:brightness-110"
                        :style="{ backgroundColor: tokens.colors.semantic.warning + '33', borderColor: tokens.colors.semantic.warning + '66', color: tokens.colors.semantic.warning }"
                        :title="'重试生成: ' + (strategy.errorMessage || '点击重新生成策略')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      </button>
                      <!-- 已失效状态 - 禁用的生成计划按钮 -->
                      <button 
                        v-else-if="strategy.isExpired"
                        disabled
                        class="p-1.5 border rounded-sm cursor-not-allowed opacity-50"
                        :style="{ backgroundColor: tokens.colors.text.muted + '1A', borderColor: tokens.colors.text.muted + '33', color: tokens.colors.text.muted }"
                        :title="strategy.expiredReason || '策略已失效，无法生成计划'"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </button>
                      <!-- Generate Plan (正常状态) -->
                      <button 
                        v-else-if="strategy.grade !== 'N/A'"
                        @click.stop="generatePlanForStrategy(strategy)"
                        class="p-1.5 border rounded-sm transition-colors hover:brightness-110"
                        :style="{ backgroundColor: tokens.colors.semantic.success + '33', borderColor: tokens.colors.semantic.success + '66', color: tokens.colors.semantic.success }"
                        :title="$t('opportunity.strategyTable.generatePlan')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </button>
                      <!-- View Plans -->
                      <button 
                        v-if="strategy.hasExecutionPlan"
                        @click.stop="toggleStrategyExpand(strategy.id)"
                        class="p-1.5 border rounded-sm transition-colors hover:brightness-110"
                        :style="isStrategyExpanded(strategy.id) 
                          ? { backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary, color: tokens.colors.background.base }
                          : { backgroundColor: tokens.colors.accent.primary + '33', borderColor: tokens.colors.accent.primary + '66', color: tokens.colors.accent.primary }"
                        :title="isStrategyExpanded(strategy.id) ? '收起计划' : $t('opportunity.strategyTable.viewPlans')"
                      >
                        <svg v-if="!isStrategyExpanded(strategy.id)" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                      </button>
                      <!-- Delete -->
                      <button 
                        @click.stop="showDeleteConfirm(strategy)"
                        class="p-1.5 border rounded-sm transition-colors hover:brightness-110"
                        :style="{ backgroundColor: tokens.colors.semantic.error + '33', borderColor: tokens.colors.semantic.error + '66', color: tokens.colors.semantic.error }"
                        :title="$t('opportunity.strategyTable.delete')"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <!-- 展开的执行计划子表格 -->
                <tr v-if="isStrategyExpanded(strategy.id) && strategy.hasExecutionPlan" class="bg-opacity-50">
                  <td :colspan="isExecutionPlanExpanded ? 15 : 11" class="p-0">
                    <div 
                      class="mx-4 my-3 border rounded-sm overflow-hidden"
                      :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.accent.primary + '4D' }"
                    >
                      <!-- 子表格头部 -->
                      <div 
                        class="px-4 py-2.5 flex items-center justify-between border-b"
                        :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary + '33' }"
                      >
                        <div class="flex items-center gap-2">
                          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                          <span class="text-sm font-bold" :style="{ color: tokens.colors.accent.primary }">执行计划</span>
                          <span class="text-xs px-1.5 py-0.5 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }">{{ strategy.planCount }}</span>
                        </div>
                        <button 
                          @click.stop="toggleStrategyExpand(strategy.id)"
                          class="text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors hover:bg-white/10"
                          :style="{ color: tokens.colors.text.muted }"
                        >
                          收起
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg>
                        </button>
                      </div>
                      <!-- 子表格内容 -->
                      <table class="w-full text-left">
                        <thead>
                          <tr :style="{ backgroundColor: tokens.colors.background.surface }">
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">计划名称</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">操作建议</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">置信度</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">入场价</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">目标价</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">止损价</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">持仓</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">创建时间</th>
                            <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr 
                            v-for="plan in getStrategyPlans(strategy)" 
                            :key="plan.id"
                            class="border-t transition-colors hover:bg-white/5"
                            :style="{ borderColor: tokens.colors.border.subtle }"
                          >
                            <!-- 计划名称 - 双击可编辑 -->
                            <td class="px-4 py-2.5">
                              <div class="flex items-center gap-2">
                                <input 
                                  v-if="plan.isEditing"
                                  v-model="plan.name"
                                  @blur="plan.isEditing = false"
                                  @keyup.enter="plan.isEditing = false"
                                  class="text-sm font-medium bg-transparent border-b outline-none w-full max-w-[120px]"
                                  :style="{ color: tokens.colors.text.primary, borderColor: tokens.colors.accent.primary }"
                                />
                                <span 
                                  v-else
                                  @dblclick="plan.isEditing = true"
                                  class="text-sm font-medium cursor-pointer hover:opacity-80"
                                  :style="{ color: tokens.colors.text.primary }"
                                  title="双击编辑"
                                >{{ plan.name }}</span>
                                <svg class="w-3 h-3 opacity-30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                              </div>
                            </td>
                            <!-- 操作建议 -->
                            <td class="px-4 py-2.5 text-center">
                              <span 
                                class="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                                :style="{ 
                                  backgroundColor: plan.recommendation === 'BUY' ? tokens.colors.semantic.success + '1A' : plan.recommendation === 'SELL' ? tokens.colors.semantic.error + '1A' : tokens.colors.accent.primary + '1A',
                                  color: plan.recommendation === 'BUY' ? tokens.colors.semantic.success : plan.recommendation === 'SELL' ? tokens.colors.semantic.error : tokens.colors.accent.primary
                                }"
                              >{{ plan.recommendation }}</span>
                            </td>
                            <!-- 置信度 -->
                            <td class="px-4 py-2.5 text-center">
                              <span 
                                class="px-2 py-0.5 rounded-sm text-[10px] font-medium border"
                                :style="{ 
                                  borderColor: plan.confidence_level === 'High' ? tokens.colors.semantic.success + '4D' : plan.confidence_level === 'Medium' ? tokens.colors.semantic.warning + '4D' : tokens.colors.border.strong,
                                  color: plan.confidence_level === 'High' ? tokens.colors.semantic.success : plan.confidence_level === 'Medium' ? tokens.colors.semantic.warning : tokens.colors.text.muted
                                }"
                              >{{ plan.confidence_level }}</span>
                            </td>
                            <!-- 入场价 -->
                            <td class="px-4 py-2.5 text-center">
                              <span class="text-sm font-mono" :style="{ color: tokens.colors.text.secondary }">${{ plan.entry_price.toFixed(2) }}</span>
                            </td>
                            <!-- 目标价 -->
                            <td class="px-4 py-2.5 text-center">
                              <span class="text-sm font-mono" :style="{ color: tokens.colors.semantic.success }">${{ plan.target_price.toFixed(2) }}</span>
                            </td>
                            <!-- 止损价 -->
                            <td class="px-4 py-2.5 text-center">
                              <span class="text-sm font-mono" :style="{ color: tokens.colors.semantic.error }">${{ plan.stop_loss_price.toFixed(2) }}</span>
                            </td>
                            <!-- 持仓 -->
                            <td class="px-4 py-2.5 text-center">
                              <span 
                                class="text-xs px-1.5 py-0.5 rounded-sm"
                                :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                              >{{ plan.position_pct ? plan.position_pct + '%' : '--' }}</span>
                            </td>
                            <!-- 创建时间 -->
                            <td class="px-4 py-2.5 text-center">
                              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ plan.createdAt }}</span>
                            </td>
                            <!-- 操作 -->
                            <td class="px-4 py-2.5 text-center">
                              <div class="flex items-center justify-center gap-1">
                                <button 
                                  @click.stop="openPlanDetail(plan, strategy)"
                                  class="p-1 border rounded-sm transition-colors hover:bg-white/10 hover:border-cyan-500/50"
                                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                                  title="查看详情"
                                >
                                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                </button>
                                <button 
                                  class="p-1 border rounded-sm transition-colors hover:bg-white/10"
                                  :style="{ borderColor: tokens.colors.semantic.error + '4D', color: tokens.colors.semantic.error }"
                                  title="删除"
                                >
                                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
                </template>
              </tbody>
            </table>
            
            <!-- Empty State -->
            <div v-if="displayedStrategies.length === 0" class="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg class="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p class="text-sm font-mono">{{ $t('opportunity.strategyTable.noStrategiesFound') }}</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Execution Plan Detail Modal -->
      <ExecutionPlanDetailModal 
        :visible="showPlanDetailModal"
        :plan-data="selectedPlanForDetail"
        @close="closePlanDetailModal"
      />

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeDeleteModal">
        <div class="border w-[480px] max-w-[95vw] overflow-hidden flex flex-col rounded-sm transform transition-all duration-200 scale-100" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.semantic.error + '1A' }">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center" :style="{ backgroundColor: tokens.colors.semantic.error + '33' }">
                <svg class="w-5 h-5" :style="{ color: tokens.colors.semantic.error }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">确认删除</h3>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">此操作不可撤销</p>
              </div>
            </div>
            <button @click="closeDeleteModal" class="p-2 rounded-sm transition-colors hover:bg-white/10" :style="{ color: tokens.colors.text.muted }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="px-6 py-5">
            <div class="p-4 rounded-sm border" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
              <div class="flex items-center gap-4">
                <!-- 股票代码 -->
                <div class="text-center">
                  <div class="text-lg font-bold font-mono" :style="{ color: tokens.colors.text.primary }">{{ deleteTarget?.symbol }}</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ deleteTarget?.stockName }}</div>
                </div>
                <div class="flex-1 h-px" :style="{ backgroundColor: tokens.colors.border.default }"></div>
                <!-- 策略信息 -->
                <div class="text-right">
                  <div class="flex items-center justify-end gap-2 mb-1">
                    <span 
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                      :style="{ 
                        backgroundColor: deleteTarget?.direction === 'long' ? tokens.colors.semantic.success + '1A' : tokens.colors.semantic.error + '1A',
                        color: deleteTarget?.direction === 'long' ? tokens.colors.semantic.success : tokens.colors.semantic.error 
                      }"
                    >{{ deleteTarget?.direction === 'long' ? '做多' : '做空' }}</span>
                    <span 
                      class="px-2 py-0.5 rounded-sm text-[10px] font-bold border"
                      :style="{ color: tokens.colors.text.secondary, borderColor: tokens.colors.border.default }"
                    >{{ deleteTarget?.grade }}</span>
                  </div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">
                    {{ deleteTarget?.hasExecutionPlan ? `包含 ${deleteTarget?.planCount || 0} 个执行计划` : '无执行计划' }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-4 p-3 rounded-sm border" :style="{ backgroundColor: tokens.colors.semantic.warning + '0D', borderColor: tokens.colors.semantic.warning + '33' }">
              <div class="flex items-start gap-2">
                <svg class="w-4 h-4 mt-0.5 shrink-0" :style="{ color: tokens.colors.semantic.warning }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-xs" :style="{ color: tokens.colors.semantic.warning }">
                  删除后将移除该策略及其所有关联的执行计划，数据无法恢复。
                </div>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t flex justify-end gap-3" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
            <button 
              @click="closeDeleteModal"
              class="px-4 py-2 text-sm font-medium rounded-sm border transition-colors hover:bg-white/5"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            >
              取消
            </button>
            <button 
              @click="confirmDelete"
              class="px-4 py-2 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
              :style="{ backgroundColor: tokens.colors.semantic.error, color: '#ffffff' }"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>

      <!-- Generate Plan Modal (方案B: 单页折叠式) -->
      <div v-if="showGeneratePlanModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeGeneratePlanModal">
        <div class="border w-[820px] max-w-[95vw] overflow-hidden flex flex-col transform transition-all duration-200 scale-100 animate-modal-in" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div class="flex items-center gap-3">
              <div class="px-2.5 py-1 rounded text-xs font-semibold tracking-wide uppercase" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                {{ $t('opportunity.strategyTable.executionPlan') }}
              </div>
              <div class="h-4 w-px" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
              <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.strategyTable.configureParameters') }}</span>
            </div>
            <button 
              @click="closeGeneratePlanModal" 
              class="w-7 h-7 flex items-center justify-center rounded-sm transition-colors"
              :style="{ backgroundColor: 'transparent' }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.muted }">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Target Strategy Info Bar -->
          <div v-if="generatePlanTarget" class="px-6 py-3 border-b flex items-center gap-4" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
            <div class="flex items-center gap-3">
              <span class="font-mono font-bold text-lg" :style="{ color: tokens.colors.text.primary }">{{ generatePlanTarget.symbol }}</span>
              <span class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ generatePlanTarget.stockName }}</span>
            </div>
            <div class="flex-1"></div>
            <span 
              v-if="generatePlanTarget.direction"
              class="px-2 py-0.5 rounded text-xs font-bold"
              :style="{ 
                backgroundColor: generatePlanTarget.direction === 'LONG' ? tokens.colors.semantic.success + '4D' : tokens.colors.semantic.error + '4D',
                color: generatePlanTarget.direction === 'LONG' ? tokens.colors.semantic.success : tokens.colors.semantic.error
              }"
            >
              {{ generatePlanTarget.direction }}
            </span>
            <span 
              v-if="generatePlanTarget.grade"
              class="px-2 py-0.5 rounded text-xs font-bold"
              :style="{ 
                backgroundColor: (generatePlanTarget.grade === 'A' || generatePlanTarget.grade === 'A+') ? tokens.colors.semantic.success + '4D' : generatePlanTarget.grade === 'B' ? tokens.colors.accent.primary + '4D' : tokens.colors.semantic.warning + '4D',
                color: (generatePlanTarget.grade === 'A' || generatePlanTarget.grade === 'A+') ? tokens.colors.semantic.success : generatePlanTarget.grade === 'B' ? tokens.colors.accent.primary : tokens.colors.semantic.warning
              }"
            >
              Grade {{ generatePlanTarget.grade }}
            </span>
            <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">
              ${{ currentStockPrice.toFixed(2) }}
            </span>
          </div>

          <!-- Modal Body - Two Column Layout -->
          <div class="p-6" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div class="flex gap-6">
              
              <!-- Left Column: Position Status -->
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-2 mb-3">
                  <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
                  <h4 class="text-sm font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.tertiary }">Position Status</h4>
                </div>
                
                <!-- Position Toggle -->
                <div class="grid grid-cols-2 gap-3">
                  <button 
                    @click="generatePlanSettings.hasPosition = false"
                    class="p-3 rounded-sm border transition-all text-left group"
                    :style="!generatePlanSettings.hasPosition 
                      ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary + '33', boxShadow: `0 0 20px ${tokens.colors.accent.primary}33` }
                      : { borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-sm flex items-center justify-center transition-colors"
                        :style="!generatePlanSettings.hasPosition ? { backgroundColor: tokens.colors.accent.primary + '33' } : { backgroundColor: tokens.colors.background.overlay }"
                      >
                        <svg class="w-4 h-4" :style="{ color: !generatePlanSettings.hasPosition ? tokens.colors.accent.primary : tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">No Position</div>
                        <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Open new</div>
                      </div>
                    </div>
                  </button>
                  <button 
                    @click="generatePlanSettings.hasPosition = true"
                    class="p-3 rounded-sm border transition-all text-left group"
                    :style="generatePlanSettings.hasPosition 
                      ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary + '33', boxShadow: `0 0 20px ${tokens.colors.accent.primary}33` }
                      : { borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
                  >
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-sm flex items-center justify-center transition-colors"
                        :style="generatePlanSettings.hasPosition ? { backgroundColor: tokens.colors.accent.primary + '33' } : { backgroundColor: tokens.colors.background.overlay }"
                      >
                        <svg class="w-4 h-4" :style="{ color: generatePlanSettings.hasPosition ? tokens.colors.accent.primary : tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">Have Position</div>
                        <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">Existing</div>
                      </div>
                    </div>
                  </button>
                </div>

                <!-- Position Details (Expandable) -->
                <transition name="slide-fade">
                  <div v-if="generatePlanSettings.hasPosition" class="p-4 rounded-sm border space-y-4" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <label class="block text-[10px] font-medium mb-1.5 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Avg Cost</label>
                        <div class="relative">
                          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs" :style="{ color: tokens.colors.text.muted }">$</span>
                          <input 
                            type="number" 
                            v-model.number="generatePlanSettings.averageCost"
                            class="w-full border rounded-sm pl-6 pr-3 py-2 text-sm font-mono focus:outline-none transition-colors"
                            :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
                            placeholder="178.50"
                            step="0.01"
                          >
                        </div>
                      </div>
                      <div>
                        <label class="block text-[10px] font-medium mb-1.5 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Size</label>
                        <div class="relative">
                          <input 
                            type="number" 
                            v-model.number="generatePlanSettings.positionSize"
                            class="w-full border rounded-sm px-3 pr-7 py-2 text-sm font-mono focus:outline-none transition-colors"
                            :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
                            placeholder="15"
                            min="1"
                            max="100"
                          >
                          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs" :style="{ color: tokens.colors.text.muted }">%</span>
                        </div>
                      </div>
                    </div>
                    <!-- P&L Display -->
                    <div v-if="generatePlanSettings.averageCost && generatePlanSettings.averageCost > 0" 
                      class="flex items-center justify-between p-2.5 rounded-sm border"
                      :style="positionPnL.isProfit ? { backgroundColor: tokens.colors.semantic.success + '33', borderColor: tokens.colors.semantic.success + '4D' } : { backgroundColor: tokens.colors.semantic.error + '33', borderColor: tokens.colors.semantic.error + '4D' }"
                    >
                      <span class="text-[10px] uppercase" :style="{ color: tokens.colors.text.tertiary }">P&L</span>
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold font-mono" :style="{ color: positionPnL.isProfit ? tokens.colors.semantic.success : tokens.colors.semantic.error }">
                          {{ positionPnL.isProfit ? '+' : '' }}${{ positionPnL.value }}
                        </span>
                        <span class="text-[10px] px-1.5 py-0.5 rounded" :style="{ backgroundColor: (positionPnL.isProfit ? tokens.colors.semantic.success : tokens.colors.semantic.error) + '33', color: positionPnL.isProfit ? tokens.colors.semantic.success : tokens.colors.semantic.error }">
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
                  <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
                  <h4 class="text-sm font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.tertiary }">Preferences</h4>
                </div>

                <!-- Investment Horizon -->
                <div>
                  <label class="block text-[10px] font-medium mb-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Horizon</label>
                  <div class="grid grid-cols-3 gap-2">
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'short'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :style="generatePlanSettings.investmentHorizon === 'short' 
                        ? { borderColor: tokens.colors.semantic.warning, backgroundColor: tokens.colors.semantic.warning + '33', boxShadow: `0 0 15px ${tokens.colors.semantic.warning}33` }
                        : { borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :style="{ color: generatePlanSettings.investmentHorizon === 'short' ? tokens.colors.semantic.warning : tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                      <div class="text-[10px] font-bold" :style="{ color: tokens.colors.text.primary }">Short</div>
                      <div class="text-[9px]" :style="{ color: tokens.colors.text.muted }">1-4 wks</div>
                    </button>
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'medium'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :style="generatePlanSettings.investmentHorizon === 'medium' 
                        ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary + '33', boxShadow: `0 0 15px ${tokens.colors.accent.primary}33` }
                        : { borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :style="{ color: generatePlanSettings.investmentHorizon === 'medium' ? tokens.colors.accent.primary : tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <div class="text-[10px] font-bold" :style="{ color: tokens.colors.text.primary }">Medium</div>
                      <div class="text-[9px]" :style="{ color: tokens.colors.text.muted }">1-3 mos</div>
                    </button>
                    <button 
                      @click="generatePlanSettings.investmentHorizon = 'long'"
                      class="p-2.5 rounded-sm border transition-all text-center"
                      :style="generatePlanSettings.investmentHorizon === 'long' 
                        ? { borderColor: tokens.colors.semantic.success, backgroundColor: tokens.colors.semantic.success + '33', boxShadow: `0 0 15px ${tokens.colors.semantic.success}33` }
                        : { borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }"
                    >
                      <svg class="w-4 h-4 mx-auto mb-1" :style="{ color: generatePlanSettings.investmentHorizon === 'long' ? tokens.colors.semantic.success : tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <div class="text-[10px] font-bold" :style="{ color: tokens.colors.text.primary }">Long</div>
                      <div class="text-[9px]" :style="{ color: tokens.colors.text.muted }">3+ mos</div>
                    </button>
                  </div>
                </div>

                <!-- Risk Preference Slider -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-[10px] font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Risk Level</label>
                    <span 
                      class="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      :style="riskLevelStyle"
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
                    class="w-full h-1.5 rounded-sm appearance-none cursor-pointer slider-thumb"
                    :style="{ backgroundColor: tokens.colors.border.default }"
                  >
                  <div class="flex justify-between mt-1.5 text-[9px]" :style="{ color: tokens.colors.text.muted }">
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
                    class="w-3.5 h-3.5 rounded-sm focus:ring-offset-0"
                    :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.elevated, accentColor: tokens.colors.accent.primary }"
                  >
                  <span class="text-xs transition-colors" :style="{ color: tokens.colors.text.muted }">Save as default</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-6 py-4 border-t flex justify-between items-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
            <div class="flex items-center gap-2 text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">
              <span class="px-1.5 py-0.5 border rounded" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">{{ generatePlanSettings.hasPosition ? 'EXISTING' : 'NEW' }}</span>
              <span class="px-1.5 py-0.5 border rounded uppercase" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">{{ generatePlanSettings.investmentHorizon }}</span>
              <span class="px-1.5 py-0.5 rounded border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">{{ riskPreferenceLabel.toUpperCase() }}</span>
            </div>
            <div class="flex gap-3">
              <button 
                @click="closeGeneratePlanModal"
                class="px-4 py-2 rounded-sm text-xs font-medium transition-colors border"
                :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.tertiary }"
              >
                Cancel
              </button>
              <button 
                @click="confirmGeneratePlan"
                class="px-5 py-2 text-white rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
                :style="{ backgroundColor: tokens.colors.accent.secondary, boxShadow: `0 4px 12px ${tokens.colors.accent.primary}4D` }"
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
        <div class="border w-[400px] overflow-hidden flex flex-col transform transition-all duration-200 scale-100 animate-modal-in" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
          <div class="p-6 text-center">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" :style="{ backgroundColor: tokens.colors.semantic.success + '33' }">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.semantic.success }"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Saved Successfully</h3>
            <p class="text-sm mb-6" :style="{ color: tokens.colors.text.tertiary }">
              {{ savedCount }} strategies have been transferred to your collection.
            </p>
            <div class="flex gap-3">
              <button 
                @click="showSaveConfirmModal = false"
                class="flex-1 py-2.5 rounded font-medium transition-colors"
                :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              >
                Stay Here
              </button>
              <button 
                @click="switchTab('mystrategy'); showSaveConfirmModal = false"
                class="flex-1 py-2.5 text-white rounded font-bold transition-colors"
                :style="{ backgroundColor: tokens.colors.semantic.success }"
              >
                View My Strategies
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Group Modal -->
      <div v-if="showDeleteGroupModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="showDeleteGroupModal = false">
        <div class="border w-[350px] overflow-hidden flex flex-col transform transition-all duration-200 scale-100 animate-modal-in" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
          <div class="p-6 text-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" :style="{ backgroundColor: tokens.colors.semantic.error + '33' }">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.semantic.error }"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </div>
            <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Delete Group?</h3>
            <p class="text-xs mb-6" :style="{ color: tokens.colors.text.tertiary }">
              Are you sure you want to delete "{{ groupToDelete?.label }}"? <br>
              Strategies in this group will not be deleted.
            </p>
            <div class="flex gap-3">
              <button 
                @click="showDeleteGroupModal = false"
                class="flex-1 py-2 rounded text-xs font-bold transition-colors"
                :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              >
                Cancel
              </button>
              <button 
                @click="executeDeleteGroup"
                class="flex-1 py-2 border rounded text-xs font-bold transition-colors"
                :style="{ backgroundColor: tokens.colors.semantic.error + '33', color: tokens.colors.semantic.error, borderColor: tokens.colors.semantic.error + '4D' }"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategy Detail Modal (Apple-inspired Minimalist Design) -->
      <div v-if="showStrategyModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300" @click.self="closeStrategyModal">
        <div class="rounded-sm border w-[95vw] h-[85vh] overflow-hidden shadow-2xl flex flex-col transform transition-all duration-300 scale-100 animate-modal-in relative" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
          
          <!-- Close Button (Absolute Positioned) -->
          <button 
            @click="closeStrategyModal" 
            class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 transition-all duration-200"
            :style="{ backgroundColor: tokens.colors.background.elevated }"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" :style="{ color: tokens.colors.text.muted }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Modal Body (Split Layout) -->
          <div class="flex flex-1 overflow-hidden">
            
          <!-- Left Area (Chat + Content) -->
          <div class="flex-1 flex border-r relative" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            
            <!-- Chat Sidebar (Left, 320px) -->
            <div class="w-[320px] flex flex-col border-r shrink-0 hidden lg:flex" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              <!-- Chat Header -->
              <div class="px-6 py-4 border-b flex justify-between items-center" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.elevated }">
                 <h3 class="text-base font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
                   {{ $t('opportunity.chat.aiAssistant') }}
                 </h3>
              </div>

              <!-- Chat Messages Area -->
              <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                 <!-- Welcome State -->
                 <div v-if="chatHistory.length === 0" class="flex flex-col h-full">
                    <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
                      <div class="w-12 h-12 rounded-full flex items-center justify-center mb-2" :style="{ backgroundColor: tokens.colors.semantic.success + '33' }">
                        <i class="fas fa-robot text-xl" :style="{ color: tokens.colors.semantic.success }"></i>
                      </div>
                      <div>
                        <h4 class="font-medium mb-1" :style="{ color: tokens.colors.text.primary }">{{ $t('opportunity.chat.aiName') }}</h4>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.chat.aiDesc') }}</p>
                      </div>
                    </div>
                    
                    <!-- Quick Prompts -->
                    <div class="space-y-2 pb-4">
                      <p class="text-xs px-1 mb-2" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.chat.suggestions') }}</p>
                      <button 
                        v-for="(prompt, idx) in quickPrompts" 
                        :key="idx"
                        @click="useQuickPrompt(prompt)"
                        class="w-full text-left px-3 py-2.5 border rounded text-xs transition-all duration-200 flex items-center justify-between group"
                        :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong, color: tokens.colors.text.secondary }"
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
                        :style="{ backgroundColor: msg.role === 'user' ? tokens.colors.accent.primary : tokens.colors.semantic.success }">
                        <i class="fas" :class="msg.role === 'user' ? 'fa-user' : 'fa-robot'"></i>
                      </div>
                      <!-- Message Bubble -->
                      <div class="flex-1">
                        <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">
                          {{ msg.role === 'user' ? 'You' : 'ScaleAlpha AI' }}
                        </div>
                        <div class="text-sm leading-relaxed whitespace-pre-wrap p-3 rounded border" :style="{ backgroundColor: tokens.colors.border.default, borderColor: tokens.colors.border.strong, color: tokens.colors.text.secondary }">{{ msg.content }}</div>
                      </div>
                   </div>

                   <!-- Loading Indicator -->
                   <div v-if="isChatLoading" class="flex gap-3">
                      <div class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs" :style="{ backgroundColor: tokens.colors.semantic.success }">
                        <i class="fas fa-robot"></i>
                      </div>
                      <div class="flex-1">
                         <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">ScaleAlpha AI</div>
                         <div class="p-3 rounded border w-16" :style="{ backgroundColor: tokens.colors.border.default, borderColor: tokens.colors.border.strong }">
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

              <!-- Input Area - 与中栏底部按钮区域高度对齐 -->
              <div class="px-4 py-4 border-t" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
                <div class="relative">
                  <input 
                    v-model="chatInput"
                    type="text" 
                    :placeholder="$t('opportunity.chat.inputPlaceholder')"
                    class="w-full rounded pl-3 pr-10 py-3.5 text-sm focus:outline-none focus:ring-1 border"
                    :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
                    @keyup.enter="sendChatMessage"
                  >
                  <button 
                    @click="sendChatMessage"
                    class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-colors"
                    :style="{ color: tokens.colors.accent.primary }"
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
              <div class="px-6 py-4 border-b flex justify-between items-center shrink-0" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.elevated }">
                <!-- Left: Title & Meta -->
                <div class="flex items-center gap-3 overflow-hidden">
                  <h2 class="text-base font-bold truncate max-w-[280px]" :title="selectedStrategy.title" :style="{ color: tokens.colors.text.primary }">{{ selectedStrategy.title }}</h2>
                  <div class="flex items-center gap-2 shrink-0">
                    <!-- Direction Badge -->
                    <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wide border flex items-center gap-1"
                      :style="selectedStrategy.direction === 'LONG' 
                        ? { backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' }
                        : selectedStrategy.direction === 'SHORT'
                        ? { backgroundColor: tokens.colors.semantic.error + '1A', color: tokens.colors.semantic.error, borderColor: tokens.colors.semantic.error + '4D' }
                        : { backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.tertiary, borderColor: tokens.colors.border.strong }">
                      <span v-if="selectedStrategy.direction === 'LONG'">↑</span>
                      <span v-if="selectedStrategy.direction === 'SHORT'">↓</span>
                      {{ selectedStrategy.direction }}
                    </span>
                    <!-- Grade Badge -->
                    <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold tracking-wide border" 
                      :style="{
                        backgroundColor: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.semantic.success + '1A' : selectedStrategy.grade === 'B' ? tokens.colors.accent.primary + '1A' : tokens.colors.semantic.warning + '1A',
                        color: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.semantic.success : selectedStrategy.grade === 'B' ? tokens.colors.accent.primary : tokens.colors.semantic.warning,
                        borderColor: (selectedStrategy.grade === 'A' || selectedStrategy.grade === 'A+') ? tokens.colors.semantic.success + '4D' : selectedStrategy.grade === 'B' ? tokens.colors.accent.primary + '4D' : tokens.colors.semantic.warning + '4D'
                      }">
                      GRADE {{ selectedStrategy.grade }}
                    </span>
                    <!-- Term Badge -->
                    <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold border" :style="{ backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }">
                      {{ selectedStrategy.term }}
                    </span>
                    <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ selectedStrategy.time }}</span>
                  </div>
                </div>
                
                <!-- Right: Actions -->
                <div class="flex items-center gap-2 shrink-0">
                  <!-- View Actions -->
                  <button 
                    @click="copyShareLink"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                    :style="isCopied ? { backgroundColor: tokens.colors.semantic.success + '33', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' } : { backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
                    :title="isCopied ? $t('opportunity.actions.copied') : $t('opportunity.actions.copyLink')"
                  >
                    <svg v-if="!isCopied" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ isCopied ? $t('opportunity.actions.copied') : $t('opportunity.actions.share') }}
                  </button>
                  
                  <!-- Divider -->
                  <div class="h-5 w-px mx-1" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
                  
                  <!-- Interaction Actions -->
                  <button 
                    @click="toggleStrategyWatchlist"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                    :style="isStrategyWatchlisted ? { backgroundColor: tokens.colors.accent.secondary, color: tokens.colors.text.primary, borderColor: tokens.colors.accent.primary } : { backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
                  >
                    <svg v-if="!isStrategyWatchlisted" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                    {{ isStrategyWatchlisted ? $t('opportunity.actions.watched') : $t('opportunity.actions.watch', { symbol: selectedStrategy.symbol || 'MSFT' }) }}
                  </button>
                  <button 
                    @click="goToStockDetail(selectedStrategy.symbol || 'MSFT')"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                    :style="{ backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary, color: '#000' }"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    {{ selectedStrategy.symbol || 'MSFT' }} {{ $t('opportunity.actions.details') }}
                  </button>
                  
                  <!-- Divider -->
                  <div class="h-5 w-px mx-1" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
                  
                  <!-- Save Actions -->
                  <button 
                    @click="toggleStrategyReport"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold transition-all border"
                    :style="isStrategyReportSaved ? { backgroundColor: tokens.colors.semantic.success + '33', color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D' } : { backgroundColor: tokens.colors.border.strong, color: tokens.colors.text.secondary, borderColor: tokens.colors.border.strong }"
                  >
                    <svg v-if="!isStrategyReportSaved" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    {{ isStrategyReportSaved ? $t('opportunity.actions.saved') : $t('opportunity.actions.saveReport') }}
                  </button>
                </div>
              </div>

              <!-- Scrollable Content Area -->
              <div class="flex-1 overflow-y-auto p-6 scrollbar-thin">
                <!-- Strategy Summary Box -->
                <div class="p-5 mb-8 border" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
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
              </div>

              <!-- Fixed Bottom Action Button -->
              <div class="shrink-0 px-6 py-4 border-t" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.surface }">
                <button 
                  @click="generatePlanForStrategy(selectedStrategy)"
                  class="w-full py-4 rounded-sm font-bold text-base transition-all flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                  :style="{ 
                    backgroundColor: tokens.colors.accent.primary, 
                    color: '#000',
                    boxShadow: `0 4px 20px ${tokens.colors.accent.primary}4D`
                  }"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  {{ $t('opportunity.actions.generatePlan') }}
                </button>
              </div>
            </div>
          </div>

            <!-- Right: Related Plans (Fixed Width) -->
            <div class="w-[350px] border-l overflow-y-auto custom-scrollbar shrink-0 hidden xl:block" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.base }">
              
              <!-- Plans Header -->
              <div class="px-6 py-4 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.elevated }">
                <div class="flex items-center gap-2">
                  <h3 class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">{{ $t('opportunity.relatedPlans.title') }}</h3>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">({{ relatedPlans.length }})</span>
                </div>
              </div>
              
              <!-- Plans Content -->
              <div class="p-4" v-if="relatedPlans.length > 0">
                <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.relatedPlans.count', { count: relatedPlans.length }) }}</p>
                
                <!-- Plan Cards -->
                <div class="space-y-3">
                  <div 
                    v-for="plan in relatedPlans" 
                    :key="plan.id"
                    class="rounded-sm border transition-all duration-200"
                    :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }"
                  >
                    <!-- Plan Header -->
                    <div class="px-4 py-3 border-b" :style="{ borderColor: tokens.colors.border.default }">
                      <div class="flex items-center justify-between mb-2">
                        <!-- Editable Title -->
                        <div class="flex items-center gap-2 flex-1 min-w-0">
                          <input 
                            v-if="plan.isEditing"
                            v-model="plan.title"
                            @blur="plan.isEditing = false"
                            @keyup.enter="plan.isEditing = false"
                            class="text-sm font-medium bg-transparent border-b outline-none w-full"
                            :style="{ color: tokens.colors.text.primary, borderColor: tokens.colors.accent.primary }"
                          />
                          <h4 
                            v-else
                            @dblclick="plan.isEditing = true"
                            class="text-sm font-medium truncate cursor-pointer hover:opacity-80"
                            :style="{ color: tokens.colors.text.primary }"
                            :title="'双击编辑名称'"
                          >{{ plan.title }}</h4>
                          <svg class="w-3 h-3 opacity-40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </div>
                        <!-- Delete Button -->
                        <button 
                          @click="deletePlan(plan.id)"
                          class="p-1 rounded-sm opacity-40 hover:opacity-100 transition-opacity"
                          :style="{ color: tokens.colors.semantic.error }"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <!-- Action & Confidence Row -->
                      <div class="flex items-center gap-2 flex-wrap">
                        <span 
                          class="px-2 py-0.5 rounded-sm text-[10px] font-bold"
                          :style="{ 
                            backgroundColor: plan.recommendation === 'BUY' ? tokens.colors.semantic.success + '1A' : plan.recommendation === 'SELL' ? tokens.colors.semantic.error + '1A' : tokens.colors.accent.primary + '1A',
                            color: plan.recommendation === 'BUY' ? tokens.colors.semantic.success : plan.recommendation === 'SELL' ? tokens.colors.semantic.error : tokens.colors.accent.primary
                          }"
                        >{{ plan.recommendation }}</span>
                        <span 
                          class="px-2 py-0.5 rounded-sm text-[10px] font-medium border"
                          :style="{ 
                            borderColor: plan.confidence_level === 'High' ? tokens.colors.semantic.success + '4D' : plan.confidence_level === 'Medium' ? tokens.colors.semantic.warning + '4D' : tokens.colors.border.strong,
                            color: plan.confidence_level === 'High' ? tokens.colors.semantic.success : plan.confidence_level === 'Medium' ? tokens.colors.semantic.warning : tokens.colors.text.muted
                          }"
                        >{{ plan.confidence_level }}</span>
                        <span 
                          class="px-2 py-0.5 rounded-sm text-[10px] font-medium"
                          :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                        >{{ plan.position_pct ? plan.position_pct + '% 持仓' : '无持仓' }}</span>
                      </div>
                    </div>
                    
                    <!-- Price Grid -->
                    <div class="px-4 py-3">
                      <div class="grid grid-cols-3 gap-2 text-center">
                        <div class="p-2 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                          <div class="text-[10px] mb-1" :style="{ color: tokens.colors.text.muted }">入场价</div>
                          <div class="text-sm font-mono font-medium" :style="{ color: tokens.colors.text.primary }">${{ plan.entry_price.toFixed(2) }}</div>
                        </div>
                        <div class="p-2 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                          <div class="text-[10px] mb-1" :style="{ color: tokens.colors.text.muted }">目标价</div>
                          <div class="text-sm font-mono font-medium" :style="{ color: tokens.colors.semantic.success }">${{ plan.target_price.toFixed(2) }}</div>
                        </div>
                        <div class="p-2 rounded-sm" :style="{ backgroundColor: tokens.colors.background.base }">
                          <div class="text-[10px] mb-1" :style="{ color: tokens.colors.text.muted }">止损价</div>
                          <div class="text-sm font-mono font-medium" :style="{ color: tokens.colors.semantic.error }">${{ plan.stop_loss_price.toFixed(2) }}</div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Footer -->
                    <div class="px-4 py-2 border-t flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
                      <span class="text-xs" :style="{ color: tokens.colors.text.muted }">
                        <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {{ plan.createdAt }}
                      </span>
                      <button 
                        class="text-xs font-medium"
                        :style="{ color: tokens.colors.accent.primary }"
                      >{{ $t('opportunity.relatedPlans.viewDetails') }}</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="p-6 flex flex-col items-center justify-center py-12" :style="{ color: tokens.colors.text.muted }">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3 border" :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }">
                    <svg class="w-6 h-6 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <p class="text-xs">{{ $t('opportunity.relatedPlans.empty') }}</p>
                  <button 
                    @click="generatePlanForStrategy(selectedStrategy)"
                    class="mt-3 text-xs font-medium"
                    :style="{ color: tokens.colors.accent.primary }"
                  >
                    {{ $t('opportunity.relatedPlans.generateNow') }}
                  </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Tabs (Bottom Center) -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1" :style="{ backgroundColor: tokens.colors.background.elevated + 'E6', borderColor: tokens.colors.border.strong }">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
          :class="activeTab === tab.id ? 'shadow-lg scale-105' : ''"
          :style="activeTab === tab.id ? { backgroundColor: isDark ? '#ffffff' : tokens.colors.text.primary, color: isDark ? '#000000' : '#ffffff' } : { color: tokens.colors.text.muted }"
          @mouseenter="activeTab !== tab.id && ($event.target.style.backgroundColor = tokens.colors.border.strong)"
          @mouseleave="activeTab !== tab.id && ($event.target.style.backgroundColor = 'transparent')"
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
        class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/40 backdrop-blur-xl border border-cyan-500/30 glow-primary-lg flex items-center justify-center transition-all hover:scale-110 hover:glow-primary-lg group"
        @click="handleMiniMapDotClick"
      >
        <!-- 进度环 -->
        <svg class="w-10 h-10 absolute" viewBox="0 0 36 36">
          <circle 
            cx="18" cy="18" r="15.5" 
            fill="none" 
            :stroke="tokens.colors.border.strong" 
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
        <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border border-cyan-500/50 flex items-center justify-center" :style="{ backgroundColor: tokens.colors.background.base }">
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
      <div class="backdrop-blur-xl border overflow-hidden transition-all duration-200 w-44" :style="{ backgroundColor: tokens.colors.background.surface + 'F2', borderColor: tokens.colors.border.strong }">
        <div class="p-3">
          <!-- Header -->
          <div class="flex items-center justify-between mb-3 pb-2 border-b" :style="{ borderColor: tokens.colors.border.default }">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{{ $t('opportunity.minimap.title') }}</span>
            <button 
              @click="isMiniMapExpanded = false"
              class="w-5 h-5 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              :style="{ backgroundColor: tokens.colors.background.overlay }"
              @mouseenter="$event.target.style.backgroundColor = tokens.colors.border.strong"
              @mouseleave="$event.target.style.backgroundColor = tokens.colors.background.overlay"
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
                  :class="step.status === 'done' || step.status === 'active' ? 'bg-cyan-500' : ''"
                  :style="step.status === 'done' || step.status === 'active' ? {} : { backgroundColor: tokens.colors.border.strong }"
                ></div>
                
                <!-- Node Circle -->
                <div 
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all text-[9px] font-bold relative"
                  :class="[
                    step.status === 'active' && !step.blocked ? 'border-cyan-500 bg-cyan-900/30 text-cyan-400 glow-primary-sm scale-110' : 
                    step.status === 'active' && step.blocked ? 'border-amber-500 bg-amber-900/30 text-amber-400 glow-warning-sm scale-110' :
                    step.status === 'done' ? 'border-cyan-700 bg-cyan-900/20 text-cyan-500' : 
                    step.status === 'blocked' ? 'border-amber-500/50 bg-amber-900/20 text-amber-500' :
                    step.status === 'skipped' ? 'text-gray-500' :
                    'text-gray-600'
                  ]"
                  :style="step.status === 'skipped' 
                    ? { borderColor: tokens.colors.border.hover, backgroundColor: tokens.colors.background.elevated }
                    : (step.status !== 'active' && step.status !== 'done' && step.status !== 'blocked')
                    ? { borderColor: tokens.colors.border.strong, backgroundColor: tokens.colors.background.base }
                    : {}"
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
                  :class="miniMapSteps[index + 1].status === 'done' || miniMapSteps[index + 1].status === 'active' ? 'bg-cyan-500' : ''"
                  :style="miniMapSteps[index + 1].status === 'done' || miniMapSteps[index + 1].status === 'active' ? {} : { backgroundColor: tokens.colors.border.strong }"
                ></div>
              </div>

              <!-- Labels -->
              <div class="flex-1 pt-0">
                <div 
                  class="text-[10px] font-medium transition-colors leading-tight"
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
          <div class="mt-4 pt-3 border-t flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-gray-600" :style="{ borderColor: tokens.colors.border.default }">
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-cyan-500"></div>
              <span>{{ $t('opportunity.minimap.legend.active') }}</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.border.hover }"></div>
              <span>{{ $t('opportunity.minimap.legend.skipped') }}</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-cyan-900"></div>
              <span>{{ $t('opportunity.minimap.legend.done') }}</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full bg-amber-500"></div>
              <span>{{ $t('opportunity.minimap.legend.blocked') }}</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
              <span>{{ $t('opportunity.minimap.legend.pending') }}</span>
            </div>
          </div>

          <!-- Selected Strategy Info -->
          <div v-if="selectedStrategy && selectedStrategy.id" class="mt-3 pt-3 border-t" :style="{ borderColor: tokens.colors.border.default }">
            <div class="text-[10px] mb-1" :style="{ color: tokens.colors.text.muted }">{{ $t('opportunity.minimap.currentStrategy') }}</div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ selectedStrategy.symbol }}</span>
              <span 
                class="text-[10px] px-1.5 py-0.5 rounded font-bold"
                :style="selectedStrategy.grade === 'A+' || selectedStrategy.grade === 'A' 
                  ? { backgroundColor: tokens.colors.semantic.success + '80', color: tokens.colors.semantic.success }
                  : selectedStrategy.grade === 'B' 
                  ? { backgroundColor: tokens.colors.accent.primary + '80', color: tokens.colors.accent.primary }
                  : selectedStrategy.grade === 'C'
                  ? { backgroundColor: tokens.colors.semantic.warning + '80', color: tokens.colors.semantic.warning }
                  : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
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
import { useI18n } from 'vue-i18n'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Navbar from '../components/Navbar.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import ExecutionPlanDetailModal from '../components/opportunity/ExecutionPlanDetailModal.vue'
import { useTheme } from '../composables/useTheme'

// 使用主题系统
const { tokens, isDark, toggleTheme } = useTheme()

// 使用国际化
const { t, locale } = useI18n()


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
// 投资周期额外图标
const IconHourglass = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M5 22h14' }), h('path', { d: 'M5 2h14' }), h('path', { d: 'M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22' }), h('path', { d: 'M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2' })])
const IconTimeline = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M3 12h18' }), h('circle', { cx: '6', cy: '12', r: '2' }), h('circle', { cx: '12', cy: '12', r: '2' }), h('circle', { cx: '18', cy: '12', r: '2' })])
const IconSandglass = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M6 2h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V2z' }), h('path', { d: 'M6 22h12v-4a6 6 0 0 0-6-6 6 6 0 0 0-6 6v4z' })])
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
const tabs = computed(() => {
  // 依赖 locale 以确保语言切换时重新计算
  const _ = locale.value
  return [
    { id: 'generate', label: t('opportunity.tabs.generate') },
    { id: 'mystrategy', label: t('opportunity.tabs.mystrategy') }
  ]
})

const switchTab = (tabId) => {
  activeTab.value = tabId
  router.push({ query: { ...route.query, tab: tabId } })
}

// --- Asset Selection Logic ---
const currentAssetTab = ref('watchlist')
const assetTabs = computed(() => {
  // 依赖 locale 以确保语言切换时重新计算
  const _ = locale.value
  return [
    { id: 'watchlist', label: t('opportunity.assetTabs.watchlist') },
    { id: 'search', label: t('opportunity.assetTabs.search') }
  ]
})

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

// 用户个人洞察输入
const userInsights = ref({
  macro: '',  // 宏观市场观点
  ticker: ''  // 标的深度洞察
})

// 配置区行内补充说明
const configNotes = ref({
  framework: '',  // 分析框架补充说明
  period: '',     // 投资周期补充说明
  risk: ''        // 风险偏好补充说明
})

const frameworks = computed(() => {
  // 依赖 locale 以确保语言切换时重新计算
  const _ = locale.value
  return [
    { id: 'auto', title: t('opportunity.frameworks.auto.title'), desc: t('opportunity.frameworks.auto.desc'), icon: IconAuto },
    { id: 'tech', title: t('opportunity.frameworks.tech.title'), desc: t('opportunity.frameworks.tech.desc'), icon: IconChart },
    { id: 'fundamental', title: t('opportunity.frameworks.fundamental.title'), desc: t('opportunity.frameworks.fundamental.desc'), icon: IconDocument },
    { id: 'quant', title: t('opportunity.frameworks.quant.title'), desc: t('opportunity.frameworks.quant.desc'), icon: IconMath },
    { id: 'event', title: t('opportunity.frameworks.event.title'), desc: t('opportunity.frameworks.event.desc'), icon: IconLightning },
    { id: 'business', title: t('opportunity.frameworks.business.title'), desc: t('opportunity.frameworks.business.desc'), icon: IconBriefcase },
    { id: 'trend', title: t('opportunity.frameworks.trend.title'), desc: t('opportunity.frameworks.trend.desc'), icon: IconTrending },
    { id: 'alt', title: t('opportunity.frameworks.alt.title'), desc: t('opportunity.frameworks.alt.desc'), icon: IconDatabase },
  ]
})

const periods = computed(() => {
  // 依赖 locale 以确保语言切换时重新计算
  const _ = locale.value
  return [
    { id: 'auto', title: t('opportunity.periods.auto.title'), desc: t('opportunity.periods.auto.desc'), icon: IconAuto },
    { id: 'short', title: t('opportunity.periods.short.title'), desc: t('opportunity.periods.short.desc'), icon: IconClock },
    { id: 'short-mid', title: t('opportunity.periods.shortMid.title'), desc: t('opportunity.periods.shortMid.desc'), icon: IconHourglass },
    { id: 'mid', title: t('opportunity.periods.mid.title'), desc: t('opportunity.periods.mid.desc'), icon: IconTimeline },
    { id: 'long', title: t('opportunity.periods.long.title'), desc: t('opportunity.periods.long.desc'), icon: IconCalendar },
  ]
})

const risks = computed(() => {
  // 依赖 locale 以确保语言切换时重新计算
  const _ = locale.value
  return [
    { id: 'auto', title: t('opportunity.risks.auto.title'), desc: t('opportunity.risks.auto.desc'), icon: IconAuto, intensity: 50 },
    { id: 'low', title: t('opportunity.risks.low.title'), desc: t('opportunity.risks.low.desc'), icon: IconShield, intensity: 25 },
    { id: 'medium', title: t('opportunity.risks.medium.title'), desc: t('opportunity.risks.medium.desc'), icon: IconScale, intensity: 50 },
    { id: 'high', title: t('opportunity.risks.high.title'), desc: t('opportunity.risks.high.desc'), icon: IconFire, intensity: 75 },
    { id: 'extreme', title: t('opportunity.risks.extreme.title'), desc: t('opportunity.risks.extreme.desc'), icon: IconSkull, intensity: 100 },
  ]
})

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
      addToast(t('opportunity.toasts.selectedWaiting', { symbol: firstTask.symbol }), 'info')
    } else {
      addToast(t('opportunity.toasts.selectedMultipleWaiting', { symbol: firstTask.symbol, count: newTasks.length }), 'info')
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
          title: t('opportunity.tour.step1.title'), 
          description: t('opportunity.tour.step1.desc'),
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#analysis-frameworks', 
        popover: { 
          title: t('opportunity.tour.step2.title'), 
          description: t('opportunity.tour.step2.desc'),
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#investment-period', 
        popover: { 
          title: t('opportunity.tour.step3.title'), 
          description: t('opportunity.tour.step3.desc'),
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#risk-appetite', 
        popover: { 
          title: t('opportunity.tour.step4.title'), 
          description: t('opportunity.tour.step4.desc'),
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#generate-btn', 
        popover: { 
          title: t('opportunity.tour.step5.title'), 
          description: t('opportunity.tour.step5.desc'),
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
          title: t('opportunity.strategyTour.step1.title'), 
          description: t('opportunity.strategyTour.step1.desc'),
          side: "bottom", 
          align: 'start' 
        } 
      },
      { 
        element: '#strategy-list-container', 
        popover: { 
          title: t('opportunity.strategyTour.step2.title'), 
          description: t('opportunity.strategyTour.step2.desc'),
          side: "left", 
          align: 'start' 
        } 
      },
      { 
        element: '#strategy-toolbar', 
        popover: { 
          title: t('opportunity.strategyTour.step3.title'), 
          description: t('opportunity.strategyTour.step3.desc'),
          side: "bottom", 
          align: 'center' 
        } 
      },
      { 
        element: '#strategy-sidebar', 
        popover: { 
          title: t('opportunity.strategyTour.step4.title'), 
          description: t('opportunity.strategyTour.step4.desc'),
          side: "right", 
          align: 'start' 
        } 
      },
      { 
        element: '#first-strategy-row', 
        popover: { 
          title: t('opportunity.strategyTour.step5.title'), 
          description: t('opportunity.strategyTour.step5.desc'),
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
  if (route.query.tab && tabs.value.some(t => t.id === route.query.tab)) {
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
  if (newTab && tabs.value.some(t => t.id === newTab)) {
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
  { id: 'all', label: computed(() => t('opportunity.filters.all')) },
  { id: 'strategy', label: computed(() => t('opportunity.filters.strategy')) },
  { id: 'plan', label: computed(() => t('opportunity.filters.plan')) }
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
  t('opportunity.chat.question1'),
  t('opportunity.chat.question2'),
  t('opportunity.chat.question3')
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
    addToast(t('opportunity.toasts.selected', { symbol: existingStrategy.symbol }), 'info')
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
    addToast(t('opportunity.toasts.selectedWithStatus', { symbol: task.symbol, status: task.status === 'processing' ? t('opportunity.toasts.generating') : t('opportunity.toasts.waiting') }), 'info')
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
  
  // Mock related plans - 基于计划.txt真实数据结构
  relatedPlans.value = [
    {
      id: 1,
      title: `激进增长计划`,
      isEditing: false,
      recommendation: 'WAIT_BUY',
      confidence_level: 'High',
      entry_price: 298.50,
      target_price: 317.50,
      stop_loss_price: 294.30,
      position_pct: 15,  // 有持仓 15%
      instruction: '等待回调至$298.50支撑区。当前超买且动能背离，耐心等待CPI数据后的更优入场点。',
      createdAt: '2025-12-17',
      isExpanded: false
    },
    {
      id: 2,
      title: `保守收益计划`,
      isEditing: false,
      recommendation: 'WAIT_BUY',
      confidence_level: 'High',
      entry_price: 298.50,
      target_price: 325.00,
      stop_loss_price: 294.30,
      position_pct: null,  // 无持仓
      instruction: '在关键技术支撑位和机构Gamma墙附近部署限价买单。',
      createdAt: '2025-12-18',
      isExpanded: false
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
    content: t('opportunity.chat.aiResponse', { symbol: selectedStrategy.value.symbol })
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

const deletePlan = (planId) => {
  relatedPlans.value = relatedPlans.value.filter(p => p.id !== planId)
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

// 风险等级样式
const riskLevelStyle = computed(() => {
  const value = generatePlanSettings.value.riskPreference
  if (value <= 25) {
    return { backgroundColor: tokens.colors.semantic.success + '80', color: tokens.colors.semantic.success }
  } else if (value <= 50) {
    return { backgroundColor: tokens.colors.accent.primary + '80', color: tokens.colors.accent.primary }
  } else if (value <= 75) {
    return { backgroundColor: tokens.colors.semantic.warning + '80', color: tokens.colors.semantic.warning }
  }
  return { backgroundColor: tokens.colors.semantic.error + '80', color: tokens.colors.semantic.error }
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

// --- Execution Plan Detail Modal Logic ---
const showPlanDetailModal = ref(false)
const selectedPlanForDetail = ref(null)

const openPlanDetail = (plan, strategy) => {
  // 构造完整的计划数据，模拟计划.txt中的数据结构
  selectedPlanForDetail.value = {
    id: plan.id,
    name: plan.name,
    symbol: strategy?.symbol || 'N/A',
    stockName: strategy?.stockName || '',
    memorandum: {
      Trading_Plan: {
        current_action: {
          recommendation: plan.recommendation,
          confidence_level: plan.confidence_level,
          instruction: `当前建议${plan.recommendation === 'WAIT_BUY' ? '等待回调买入' : plan.recommendation === 'BUY' ? '立即买入' : plan.recommendation === 'SELL' ? '卖出' : '持有观望'}，置信度${plan.confidence_level}。`
        },
        action_plan: {
          instruction: `计划在$${plan.entry_price}附近建仓，目标价$${plan.target_price}，止损价$${plan.stop_loss_price}。`,
          triggers: [{
            trigger_price: plan.entry_price,
            position_size_pct: plan.position_pct || 15,
            rationale: '基于技术分析和AI模型共识确定的入场价位'
          }]
        },
        profit_taking_plan: {
          instruction: '分批止盈，锁定利润',
          triggers: [
            { trigger_price: plan.target_price, position_to_sell_pct: 50, rationale: '第一目标位' },
            { trigger_price: plan.target_price * 1.05, position_to_sell_pct: 100, rationale: '最终目标位' }
          ]
        },
        stop_loss_plan: {
          instruction: '严格执行止损策略，控制风险',
          trigger: { trigger_price: plan.stop_loss_price, rationale: '跌破关键支撑位' }
        },
        llm_consensus: {
          openai: { recommendation: plan.recommendation, instruction: '基于技术和基本面分析' },
          claude: { recommendation: plan.recommendation, instruction: '综合多维度分析' },
          grok: { recommendation: plan.recommendation, instruction: '实时市场数据分析' },
          deepseek: { recommendation: plan.recommendation, instruction: '深度推理分析' },
          qwen: { recommendation: plan.recommendation, instruction: '量化模型分析' },
          kimi: { recommendation: plan.recommendation, instruction: '情绪面分析' }
        }
      },
      Plan_Analysis: {
        Analytical_Approach: '多维共识分析。技术面：动量指标+均线支撑。基本面：估值合理。事件驱动：近期催化剂。',
        Primary_Thesis_Vs_Counter_Thesis: `牛市论点：技术支撑强劲，基本面稳健，近期有正面催化剂。熊市论点：宏观不确定性，可能的回调风险。综合判断：盈亏比${((plan.target_price - plan.entry_price) / (plan.entry_price - plan.stop_loss_price)).toFixed(1)}:1有利。`,
        Key_Scenarios_And_Likelihoods: '基准情景(65%): 回调至支撑位后企稳反弹。牛市情景(20%): 直接突破阻力位。熊市情景(15%): 跌破支撑位。',
        Primary_Risks_To_Monitor: '宏观经济数据、行业监管政策、公司财报风险、市场情绪变化。',
        Manager_s_Note_On_Strategy_And_Discipline: '严格执行交易纪律，不追高，耐心等待最佳入场时机。风险管理优先，保护本金。',
        Options_Cross_Market_Analysis: '期权市场隐含波动率处于正常水平，无明显异常信号。',
        Broad_Market_Analysis: '大盘整体趋势向好，市场情绪稳定。'
      }
    }
  }
  showPlanDetailModal.value = true
}

const closePlanDetailModal = () => {
  showPlanDetailModal.value = false
  selectedPlanForDetail.value = null
}

// --- Delete Confirmation Modal Logic ---
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const showDeleteConfirm = (strategy) => {
  deleteTarget.value = strategy
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  deleteTarget.value = null
}

const confirmDelete = () => {
  if (!deleteTarget.value) return
  
  // 从列表中移除策略
  const strategyId = deleteTarget.value.id
  const symbol = deleteTarget.value.symbol
  
  // 查找并移除策略（假设 displayedStrategies 来自 filteredStrategies）
  // 这里需要根据实际数据结构调整
  addToast(`策略 ${symbol} 已删除`, 'success')
  
  // 清除选中状态
  if (selectedStrategyId.value === strategyId) {
    selectedStrategyId.value = null
  }
  
  // 清除展开状态
  if (expandedStrategyIds.value.has(strategyId)) {
    expandedStrategyIds.value.delete(strategyId)
    expandedStrategyIds.value = new Set(expandedStrategyIds.value)
  }
  
  // 清除计划缓存
  if (strategyPlansCache.value.has(strategyId)) {
    strategyPlansCache.value.delete(strategyId)
  }
  
  closeDeleteModal()
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
                addToast(t('opportunity.toasts.strategyComplete', { symbol: task.symbol }), 'success')
              } else {
                // 如果没有保存的策略（可能是模拟），更新状态为已完成
                selectedStrategy.value = {
                  ...selectedStrategy.value,
                  status: 'completed',
                  isGenerating: false,
                  isPending: false,
                  grade: task.foundOpportunity ? 'A' : 'N/A'
                }
                addToast(t('opportunity.toasts.strategyComplete', { symbol: task.symbol }), 'success')
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
  let step1Hint = t('opportunity.hints.selectAssets')
  
  if (hasSelectedStocks) {
    step1Status = 'done'
    if (isUsingDefaultParams()) {
      step1Hint = t('opportunity.hints.defaultParams')
    } else {
      step1Hint = t('opportunity.hints.customParams')
    }
  } else if (isGenerateTab) {
    // 只在 generate tab 时激活
    step1Status = 'active'
  }
  
  // --- Step 2: 机会生成 ---
  // 只在 mystrategy tab 中选中策略后才激活
  let step2Status = 'pending'
  let step2Hint = t('opportunity.hints.waitSelectStrategy')
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
    step2Hint = t('opportunity.hints.waitSelectStrategy')
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step2Status = 'pending'
    step2Hint = t('opportunity.hints.pleaseSelectStrategy')
  } else if (isOnlyPlan) {
    // Only Plan 策略，跳过机会生成步骤
    step2Status = 'skipped'
    step2Hint = t('opportunity.hints.onlyPlanMode')
  } else if (isStrategyUpdating) {
    // 选中的策略正在更新中
    step2Status = 'active'
    const progress = Math.round(regeneratingStrategies.value[strategy.id]?.progress || 0)
    step2Hint = t('opportunity.hints.updating', { progress })
  } else if (isStrategyGenerating) {
    // 选中的策略正在生成中
    step2Status = 'active'
    step2Hint = t('opportunity.hints.generating')
  } else if (isStrategyPending) {
    // 选中的策略等待生成
    step2Status = 'active'
    step2Hint = t('opportunity.hints.waitingGenerate')
  } else {
    // 在 mystrategy tab 且选中了已生成的策略
    if (needsUpdate) {
      step2Status = 'active'
      step2Hint = t('opportunity.hints.recommendUpdate')
      step2Blocked = true
    } else {
      step2Status = 'done'
      step2Hint = t('opportunity.hints.strategyGenerated')
    }
  }
  
  // 判断步骤2是否完成（策略已生成且不在生成/等待/更新状态）
  const isStep2Done = step2Status === 'done'
  const isStep2InProgress = isStrategyGenerating || isStrategyPending || isStrategyUpdating
  
  // --- Step 3: 机会判定 ---
  // 只在 mystrategy tab 中选中策略后才激活，且步骤2必须完成
  let step3Status = 'pending'
  let step3Hint = t('opportunity.hints.waitSelectStrategy')
  let step3Blocked = false
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step3Status = 'pending'
    step3Hint = t('opportunity.hints.waitSelectStrategy')
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step3Status = 'pending'
    step3Hint = t('opportunity.hints.pleaseSelectStrategy')
  } else if (isOnlyPlan) {
    // Only Plan 策略，跳过机会判定步骤
    step3Status = 'skipped'
    step3Hint = t('opportunity.hints.onlyPlanMode')
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤3保持灰色
    step3Status = 'pending'
    step3Hint = t('opportunity.hints.waitStrategyComplete')
  } else {
    // 步骤2已完成，根据 grade 判断步骤3状态
    if (noOpportunity) {
      step3Status = 'active'
      step3Hint = t('opportunity.hints.noOpportunityUpdate')
      step3Blocked = true
    } else if (gradeBelowB) {
      step3Status = 'active'
      step3Hint = t('opportunity.hints.gradeAdjustParams', { grade: strategyGrade })
      step3Blocked = true
    } else if (gradeAboveB) {
      if (hasPlan) {
        step3Status = 'done'
        step3Hint = t('opportunity.hints.gradeOpportunity', { grade: strategyGrade })
      } else {
        step3Status = 'active'
        step3Hint = t('opportunity.hints.gradeCanGeneratePlan', { grade: strategyGrade })
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
  let step4Hint = t('opportunity.hints.waitSelectStrategy')
  let step4Blocked = false
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step4Status = 'pending'
    step4Hint = t('opportunity.hints.waitSelectStrategy')
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step4Status = 'pending'
    step4Hint = t('opportunity.hints.pleaseSelectStrategy')
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤4保持灰色
    step4Status = 'pending'
    step4Hint = t('opportunity.hints.waitStrategyComplete')
  } else if (isOnlyPlan) {
    // Only Plan 模式，直接显示计划状态
    if (hasPlan) {
      step4Status = 'done'
      step4Hint = t('opportunity.hints.planGenerated')
    } else {
      step4Status = 'active'
      step4Hint = t('opportunity.hints.waitGeneratePlan')
    }
  } else if (step3Blocked) {
    // 步骤3被阻塞，步骤4也被阻塞
    if (noOpportunity) {
      step4Status = 'blocked'
      step4Hint = t('opportunity.hints.needOpportunity')
      step4Blocked = true
    } else if (gradeBelowB) {
      step4Status = 'blocked'
      step4Hint = t('opportunity.hints.needGradeB')
      step4Blocked = true
    }
  } else if (isStep3Passed) {
    // 步骤3通过，根据计划状态判断
    if (hasPlan) {
      step4Status = 'done'
      step4Hint = t('opportunity.hints.planGenerated')
    } else {
      step4Status = 'active'
      step4Hint = t('opportunity.hints.waitGeneratePlan')
    }
  } else {
    // 步骤3未完成
    step4Status = 'pending'
    step4Hint = t('opportunity.hints.waitOpportunityGate')
  }
  
  // 判断步骤4是否完成
  const isStep4Done = step4Status === 'done'
  
  // --- Step 5: 执行/完成 ---
  // 只在 mystrategy tab 中选中策略后才激活，且步骤4必须完成
  let step5Status = 'pending'
  let step5Hint = t('opportunity.hints.waitSelectStrategy')
  
  if (!isMyStrategyTab) {
    // 不在 mystrategy tab 时，保持 pending 状态
    step5Status = 'pending'
    step5Hint = t('opportunity.hints.waitSelectStrategy')
  } else if (!hasSelectedStrategy) {
    // 在 mystrategy tab 但未选中策略
    step5Status = 'pending'
    step5Hint = t('opportunity.hints.pleaseSelectStrategy')
  } else if (isStep2InProgress) {
    // 步骤2还在进行中，步骤5保持灰色
    step5Status = 'pending'
    step5Hint = t('opportunity.hints.waitStrategyComplete')
  } else if (step4Blocked) {
    // 步骤4被阻塞，步骤5保持灰色
    step5Status = 'pending'
    step5Hint = t('opportunity.hints.waitPlanGenerate')
  } else if (isStep4Done) {
    // 步骤4完成，可以执行
    step5Status = 'active'
    step5Hint = t('opportunity.hints.canExecuteTrade')
  } else {
    // 步骤4未完成
    step5Status = 'pending'
    step5Hint = t('opportunity.hints.waitPlanGenerate')
  }
  
  return [
    {
      key: 'strategy_setup',
      title: t('opportunity.minimap.steps.strategySetup'),
      hint: step1Hint,
      status: step1Status,
      action: () => { switchTab('generate') }
    },
    {
      key: 'opportunity_generate',
      title: t('opportunity.minimap.steps.opportunityGenerate'),
      hint: step2Hint,
      status: step2Status,
      blocked: step2Blocked,
      action: () => { switchTab('generate') }
    },
    {
      key: 'opportunity_gate',
      title: t('opportunity.minimap.steps.opportunityGate'),
      hint: step3Hint,
      status: step3Status,
      blocked: step3Blocked,
      action: hasSelectedStrategy ? () => { switchTab('mystrategy') } : null
    },
    {
      key: 'planning',
      title: t('opportunity.minimap.steps.planning'),
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
      title: t('opportunity.minimap.steps.execution'),
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

// 执行计划列折叠状态
const isExecutionPlanExpanded = ref(true)
const toggleExecutionPlanExpand = () => {
  isExecutionPlanExpanded.value = !isExecutionPlanExpanded.value
}

// 策略行展开状态（用于显示执行计划子表格）
const expandedStrategyIds = ref(new Set())
const toggleStrategyExpand = (strategyId) => {
  if (expandedStrategyIds.value.has(strategyId)) {
    expandedStrategyIds.value.delete(strategyId)
  } else {
    expandedStrategyIds.value.add(strategyId)
  }
  // 触发响应式更新
  expandedStrategyIds.value = new Set(expandedStrategyIds.value)
}
const isStrategyExpanded = (strategyId) => {
  return expandedStrategyIds.value.has(strategyId)
}

// 执行计划缓存（防止每次渲染重新生成随机数据导致闪烁）
const strategyPlansCache = ref(new Map())

// 获取策略的执行计划列表（基于计划.txt真实数据结构）
const getStrategyPlans = (strategy) => {
  if (!strategy.hasExecutionPlan || strategy.planCount === 0) return []
  
  // 检查缓存中是否已有数据
  if (strategyPlansCache.value.has(strategy.id)) {
    return strategyPlansCache.value.get(strategy.id)
  }
  
  // 生成执行计划数据（匹配真实数据结构）
  const plans = []
  const planCount = strategy.planCount || 0
  const planNames = ['建仓计划', '加仓计划', '止盈计划', '观望计划']
  const recommendations = ['WAIT_BUY', 'BUY', 'SELL', 'WAIT_BUY']
  const confidences = ['High', 'High', 'Medium', 'Low']
  
  // 使用固定种子生成伪随机数，确保同一策略始终生成相同数据
  const seed = strategy.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const seededRandom = (offset = 0) => {
    const x = Math.sin(seed + offset) * 10000
    return x - Math.floor(x)
  }
  
  for (let i = 1; i <= planCount; i++) {
    const idx = (i - 1) % 4
    const basePrice = 150 + seededRandom(i) * 50
    plans.push({
      id: `${strategy.id}-plan-${i}`,
      name: planNames[idx],
      isEditing: false,
      recommendation: recommendations[idx],
      confidence_level: confidences[idx],
      entry_price: parseFloat(basePrice.toFixed(2)),
      target_price: parseFloat((basePrice * (1 + 0.05 + seededRandom(i + 100) * 0.1)).toFixed(2)),
      stop_loss_price: parseFloat((basePrice * (1 - 0.03 - seededRandom(i + 200) * 0.05)).toFixed(2)),
      position_pct: seededRandom(i + 300) > 0.5 ? Math.floor(seededRandom(i + 400) * 20 + 5) : null,
      createdAt: new Date(Date.now() - seededRandom(i + 500) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    })
  }
  
  // 存入缓存
  strategyPlansCache.value.set(strategy.id, plans)
  return plans
}

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
    { id: 'all', label: t('opportunity.collections.allStrategies'), count: allCount, icon: IconBriefcase },
    { id: 'official', label: t('opportunity.collections.officialReports'), count: officialCount, icon: IconDocument },
    { id: 'my', label: t('opportunity.collections.myStrategies'), count: myCount, icon: IconTarget },
    { id: 'plans', label: t('opportunity.collections.withExecutionPlans'), count: planCount, icon: IconLightning },
    { id: 'only-plan', label: t('opportunity.collections.onlyPlan'), count: onlyPlanCount, icon: IconCalendar, isFixed: true },
    { id: 'no-plan', label: t('opportunity.collections.noPlan'), count: noPlanCount, icon: IconBan, isFixed: true },
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
    },
    // ========== 新增状态类型示例 ==========
    // 1. 官方策略已失效 - 可查看但无法生成计划
    {
      id: 'demo-expired-1',
      symbol: 'META',
      stockName: 'Meta Platforms, Inc.',
      direction: 'LONG',
      grade: 'B',
      horizon: 'Medium-term (3-6 months)',
      source: 'Official',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: true,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
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
      officialUpdated: false,
      // 新增字段：已失效状态
      isExpired: true,
      expiredReason: '该策略已于 2025-01-15 失效，市场条件已发生重大变化'
    },
    {
      id: 'demo-expired-2',
      symbol: 'NFLX',
      stockName: 'Netflix, Inc.',
      direction: 'SHORT',
      grade: 'C',
      horizon: 'Short-term (1-3 months)',
      source: 'Official',
      model: 'GPT-4o',
      hasExecutionPlan: true,
      hasStrategy: true,
      isWatchlist: true,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      categoryName: 'Tech Stocks',
      categoryId: 'tech',
      planCount: 2,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false,
      officialUpdating: false,
      officialUpdated: false,
      // 新增字段：已失效状态
      isExpired: true,
      expiredReason: '策略已过期，原分析基于过时的财报数据'
    },
    // 2. 我的策略生成错误 - 显示错误状态，可重试
    {
      id: 'demo-error-1',
      symbol: 'AMZN',
      stockName: 'Amazon.com, Inc.',
      direction: null,
      grade: 'ERROR',
      horizon: null,
      source: 'My Strategy',
      model: 'Gemini 1.5 Pro',
      hasExecutionPlan: false,
      hasStrategy: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
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
      // 新增字段：生成错误状态
      hasError: true,
      errorMessage: 'API 调用超时，请重试',
      errorCode: 'TIMEOUT'
    },
    {
      id: 'demo-error-2',
      symbol: 'UBER',
      stockName: 'Uber Technologies',
      direction: null,
      grade: 'ERROR',
      horizon: null,
      source: 'My Strategy',
      model: 'Claude 3.5 Sonnet',
      hasExecutionPlan: false,
      hasStrategy: false,
      isWatchlist: false,
      isArchived: false,
      generatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      savedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      categoryName: null,
      categoryId: null,
      planCount: 0,
      planUnreadCount: 0,
      planGeneratingCount: 0,
      generatingCurrent: 0,
      generatingProgress: 0,
      planNeedsUpdate: false,
      strategyNeedsUpdate: false,
      strategyUnread: false,
      // 新增字段：生成错误状态
      hasError: true,
      errorMessage: '数据源异常，无法获取市场数据',
      errorCode: 'DATA_SOURCE_ERROR'
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
  background: var(--color-bg-base, #0a0a0a);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-border-default, #333);
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--color-border-strong, #555);
}

/* Slider Thumb Styles */
.slider-thumb::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-primary, #06b6d4) 0%, var(--color-accent-secondary, #0891b2) 100%);
  cursor: pointer;
  border: 2px solid var(--color-text-primary, #fff);
  box-shadow: 0 2px 6px var(--color-accent-primary, #06b6d4)66;
  transition: all 0.15s ease;
}
.slider-thumb::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--color-accent-primary, #06b6d4)80;
}
.slider-thumb::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-accent-primary, #06b6d4) 0%, var(--color-accent-secondary, #0891b2) 100%);
  cursor: pointer;
  border: 2px solid var(--color-text-primary, #fff);
  box-shadow: 0 2px 6px var(--color-accent-primary, #06b6d4)66;
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
