<template>
  <div class="min-h-screen pb-20" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-20 left-10 w-72 h-72 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 rounded-full filter blur-3xl" :style="{ backgroundColor: tokens.colors.accent.primary + '14' }"></div>
      
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <!-- Logo & Title -->
        <div class="mb-12">
          <div class="inline-block mb-6">
            <div class="w-20 h-20 rounded-sm flex items-center justify-center shadow-2xl mx-auto" :style="{ backgroundColor: tokens.colors.accent.primary, boxShadow: `0 25px 50px -12px ${tokens.colors.accent.primary}4D` }">
              <span class="text-4xl font-bold" style="color: #000;">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold mb-2" :style="{ color: tokens.colors.accent.primary }">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg mb-8" :style="{ color: tokens.colors.text.tertiary }">
            为每个DIY投资者打造专属量化交易平台
          </p>
          
          <!-- CTA Button -->
          <router-link 
            to="/revenueB" 
            class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all shadow-lg transform hover:-translate-y-1 hover:scale-[1.02]"
            :style="{ 
              backgroundColor: tokens.colors.accent.primary, 
              color: '#000',
              boxShadow: `0 10px 40px ${tokens.colors.accent.primary}4D`
            }"
          >
            查看更多信息 →
          </router-link>
        </div>

        <!-- Performance Chart (Hero Feature) -->
        <div class="max-w-4xl mx-auto mb-16 transform hover:scale-[1.02] transition duration-500">
          <SimplePerformanceChart />
        </div>
      </div>
    </section>

    <!-- Product Introduction Sections (Full Width Blocks) -->
    <div class="w-full">
      
      <!-- Section 1: Theme Discovery (左文右图) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
              🎯 市场洞察
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">主题发现</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">追踪热点主题，把握投资周期</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">实时监控市场热门主题的生命周期演变，从萌芽期到成熟期，帮助您在最佳时机入场或离场。每个主题都配有30天/1年涨跌幅数据和相关标的列表。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 8阶段生命周期追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 30D/1Y涨跌幅可视化
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 相关标的一键跳转
              </li>
            </ul>
            <router-link to="/infoB?tab=themes" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              探索主题 →
            </router-link>
          </div>
          <!-- Preview Area - Theme Cards Grid - Right -->
          <div class="lg:col-span-7 p-8 lg:p-12 rounded-sm border overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-500" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
            <div class="grid grid-cols-2 gap-4">
              <!-- Theme Card 1 -->
              <div class="p-4 rounded-sm border transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">🔥</span>
                  <span class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">AI Chips</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">Growth</span>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">Stage 5/8</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden mb-3" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full rounded-full" style="width: 62%" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                </div>
                <div class="flex justify-between text-xs">
                  <span :style="{ color: tokens.colors.semantic.success }">+45.2% 30D</span>
                  <span :style="{ color: tokens.colors.text.muted }">NVDA, AMD</span>
                </div>
              </div>
              <!-- Theme Card 2 -->
              <div class="p-4 rounded-sm border transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">⚡</span>
                  <span class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">EV Battery</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">Mature</span>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">Stage 6/8</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden mb-3" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full rounded-full" style="width: 75%" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                </div>
                <div class="flex justify-between text-xs">
                  <span :style="{ color: tokens.colors.semantic.success }">+28.7% 30D</span>
                  <span :style="{ color: tokens.colors.text.muted }">TSLA, BYD</span>
                </div>
              </div>
              <!-- Theme Card 3 -->
              <div class="p-4 rounded-sm border transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">🌱</span>
                  <span class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">Quantum</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">Emerging</span>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">Stage 2/8</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden mb-3" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full rounded-full" style="width: 25%" :style="{ backgroundColor: tokens.colors.semantic.warning }"></div>
                </div>
                <div class="flex justify-between text-xs">
                  <span :style="{ color: tokens.colors.semantic.success }">+12.3% 30D</span>
                  <span :style="{ color: tokens.colors.text.muted }">IBM, GOOG</span>
                </div>
              </div>
              <!-- Theme Card 4 -->
              <div class="p-4 rounded-sm border transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="flex items-center gap-3 mb-3">
                  <span class="text-2xl">💊</span>
                  <span class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">GLP-1</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">Growth</span>
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">Stage 4/8</span>
                </div>
                <div class="h-2 rounded-full overflow-hidden mb-3" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full rounded-full" style="width: 50%" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                </div>
                <div class="flex justify-between text-xs">
                  <span :style="{ color: tokens.colors.semantic.success }">+67.8% 30D</span>
                  <span :style="{ color: tokens.colors.text.muted }">LLY, NVO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Opportunity Browse (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Opportunity Cards - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 p-8 lg:p-12 rounded-sm border shadow-2xl transform hover:scale-[1.01] transition-all duration-500" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
            <div class="space-y-4">
              <!-- Opportunity Card 1 -->
              <div class="p-4 rounded-sm border flex items-center gap-4 transition-all hover:border-opacity-80" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="w-14 h-14 rounded-sm flex items-center justify-center shrink-0 text-base font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
                  AAPL
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <span class="text-base font-medium truncate" :style="{ color: tokens.colors.text.primary }">Apple Inc.</span>
                    <span class="px-2 py-0.5 rounded-sm text-xs font-bold shrink-0" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">A</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm" :style="{ color: tokens.colors.text.muted }">
                    <span class="flex items-center gap-1 font-bold" :style="{ color: tokens.colors.semantic.success }">↑ LONG</span>
                    <span>·</span>
                    <span>R/R 2.5:1</span>
                    <span>·</span>
                    <span>1-5 Days</span>
                  </div>
                </div>
              </div>
              <!-- Opportunity Card 2 -->
              <div class="p-4 rounded-sm border flex items-center gap-4" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="w-14 h-14 rounded-sm flex items-center justify-center shrink-0 text-base font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                  NVDA
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <span class="text-base font-medium truncate" :style="{ color: tokens.colors.text.primary }">NVIDIA Corp</span>
                    <span class="px-2 py-0.5 rounded-sm text-xs font-bold shrink-0" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">B+</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm" :style="{ color: tokens.colors.text.muted }">
                    <span class="flex items-center gap-1 font-bold" :style="{ color: tokens.colors.semantic.success }">↑ LONG</span>
                    <span>·</span>
                    <span>R/R 1.8:1</span>
                    <span>·</span>
                    <span>5-10 Days</span>
                  </div>
                </div>
              </div>
              <!-- Opportunity Card 3 -->
              <div class="p-4 rounded-sm border flex items-center gap-4" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="w-14 h-14 rounded-sm flex items-center justify-center shrink-0 text-base font-bold" :style="{ backgroundColor: tokens.colors.semantic.error + '1A', color: tokens.colors.semantic.error }">
                  TSLA
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <span class="text-base font-medium truncate" :style="{ color: tokens.colors.text.primary }">Tesla Inc</span>
                    <span class="px-2 py-0.5 rounded-sm text-xs font-bold shrink-0" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">C</span>
                  </div>
                  <div class="flex items-center gap-3 text-sm" :style="{ color: tokens.colors.text.muted }">
                    <span class="flex items-center gap-1 font-bold" :style="{ color: tokens.colors.semantic.error }">↓ SHORT</span>
                    <span>·</span>
                    <span>R/R 1.5:1</span>
                    <span>·</span>
                    <span>1-3 Days</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Footer -->
            <div class="mt-6 pt-4 border-t flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
              <span class="text-sm" :style="{ color: tokens.colors.text.muted }">今日已生成 12 个机会</span>
              <span class="text-sm font-medium" :style="{ color: tokens.colors.accent.primary }">查看全部 →</span>
            </div>
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
              💡 AI精选
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">机会浏览</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">AI每日精选高置信度交易机会</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">基于多维度分析的智能评级系统，每个机会都经过风险收益比计算、时间框架预估和风险等级评定。支持推荐和关注双模式，让您高效筛选目标。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> A/B/C/D 智能评级
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 风险收益比量化分析
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 持仓周期时间框架
              </li>
            </ul>
            <router-link to="/infoB?tab=opportunities" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              发现机会 →
            </router-link>
          </div>
        </div>
      </section>

      <!-- Section 3: Event Attribution (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">
              🔍 深度分析
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">事件归因</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">理解股价波动背后的真正原因</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">通过时间线可视化展示影响股价的重大事件，每个事件都标注好评/利空/中性情绪标签。支持按股票代码筛选，关联分析多标的受影响程度。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 时间线可视化展示
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 利好/利空情绪标签
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 多标的关联影响分析
              </li>
            </ul>
            <router-link to="/infoB?tab=attribution" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              查看归因 →
            </router-link>
          </div>
          <!-- Preview Area - Timeline - Right -->
          <div class="lg:col-span-7 p-8 lg:p-12 rounded-sm border shadow-2xl transform hover:scale-[1.01] transition-all duration-500" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
            <div class="space-y-6">
              <!-- Timeline Item 1 -->
              <div class="flex gap-6">
                <div class="flex flex-col items-center">
                  <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                  <div class="w-0.5 flex-1 mt-2" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
                </div>
                <div class="flex-1 pb-6">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-sm font-mono" :style="{ color: tokens.colors.text.muted }">09:32 EST</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">Bullish</span>
                  </div>
                  <p class="text-base font-medium mb-2" :style="{ color: tokens.colors.text.primary }">NVDA beats Q3 expectations</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">NVDA</span>
                    <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">AMD</span>
                  </div>
                </div>
              </div>
              <!-- Timeline Item 2 -->
              <div class="flex gap-6">
                <div class="flex flex-col items-center">
                  <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.error }"></div>
                  <div class="w-0.5 flex-1 mt-2" :style="{ backgroundColor: tokens.colors.border.strong }"></div>
                </div>
                <div class="flex-1 pb-6">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-sm font-mono" :style="{ color: tokens.colors.text.muted }">10:15 EST</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.error + '1A', color: tokens.colors.semantic.error }">Bearish</span>
                  </div>
                  <p class="text-base font-medium mb-2" :style="{ color: tokens.colors.text.primary }">Fed hints at rate hike delay</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">SPY</span>
                    <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">QQQ</span>
                  </div>
                </div>
              </div>
              <!-- Timeline Item 3 -->
              <div class="flex gap-6">
                <div class="flex flex-col items-center">
                  <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-sm font-mono" :style="{ color: tokens.colors.text.muted }">11:45 EST</span>
                    <span class="px-2 py-0.5 rounded text-xs font-bold" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">Neutral</span>
                  </div>
                  <p class="text-base font-medium mb-2" :style="{ color: tokens.colors.text.primary }">AAPL announces product event</p>
                  <div class="flex items-center gap-2">
                    <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.text.muted }">AAPL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Strategy Generation (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.surface }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Config Panel - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 p-8 lg:p-12 rounded-sm border shadow-2xl transform hover:scale-[1.01] transition-all duration-500" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
            <!-- Framework Selection -->
            <div class="mb-6">
              <div class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                <span class="w-1 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
                分析框架
              </div>
              <div class="grid grid-cols-4 gap-3">
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary }">
                  <span class="text-2xl">📊</span>
                  <p class="text-xs mt-2 font-medium" :style="{ color: tokens.colors.accent.primary }">TA</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <span class="text-2xl">📈</span>
                  <p class="text-xs mt-2" :style="{ color: tokens.colors.text.muted }">FA</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary }">
                  <span class="text-2xl">🤖</span>
                  <p class="text-xs mt-2 font-medium" :style="{ color: tokens.colors.accent.primary }">Quant</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <span class="text-2xl">📰</span>
                  <p class="text-xs mt-2" :style="{ color: tokens.colors.text.muted }">News</p>
                </div>
              </div>
            </div>
            <!-- Period Selection -->
            <div class="mb-6">
              <div class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                <span class="w-1 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success }"></span>
                投资周期
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', borderColor: tokens.colors.semantic.success }">
                  <p class="text-sm font-bold" :style="{ color: tokens.colors.semantic.success }">Short</p>
                  <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">1-5 Days</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <p class="text-sm font-bold" :style="{ color: tokens.colors.text.secondary }">Medium</p>
                  <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">1-4 Weeks</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <p class="text-sm font-bold" :style="{ color: tokens.colors.text.secondary }">Long</p>
                  <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">1-3 Months</p>
                </div>
              </div>
            </div>
            <!-- Risk Selection -->
            <div class="mb-6">
              <div class="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
                <span class="w-1 h-4 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.warning }"></span>
                风险偏好
              </div>
              <div class="grid grid-cols-4 gap-3">
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <p class="text-lg" :style="{ color: tokens.colors.text.muted }">🛡️</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', borderColor: tokens.colors.semantic.warning }">
                  <p class="text-lg">⚖️</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <p class="text-lg" :style="{ color: tokens.colors.text.muted }">🎯</p>
                </div>
                <div class="p-3 rounded border text-center cursor-pointer transition-all" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <p class="text-lg" :style="{ color: tokens.colors.text.muted }">🚀</p>
                </div>
              </div>
            </div>
            <!-- Generate Button -->
            <button class="w-full py-4 rounded font-bold text-base tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:opacity-90" :style="{ backgroundColor: tokens.colors.accent.primary, color: '#000' }">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              生成策略
            </button>
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
              ⚡ 个性定制
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">策略生成</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">定制专属于您的AI交易策略</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">选择标的、配置分析框架、设定投资周期和风险偏好，还可输入您的个人市场洞察。AI将综合所有参数，生成专属于您的交易策略报告。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 技术/基本面/量化多框架
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 短/中/长期周期可配置
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 融入个人洞察与观点
              </li>
            </ul>
            <router-link to="/opportunityB?tab=generate" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              生成策略 →
            </router-link>
          </div>
        </div>
      </section>

      <!-- Section 5: Strategy Management (左图右文) -->
      <section class="w-full py-24 lg:py-32 flex items-center min-h-[80vh]" :style="{ backgroundColor: tokens.colors.background.base }">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="inline-block px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 w-fit" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
              📋 效率管理
            </div>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">策略管理</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">高效管理您的策略资产库</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">实时追踪策略生成进度，智能筛选高评级或待更新策略。支持自定义分组收藏、批量操作，让您的策略库井然有序，随时调取最优方案。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 实时生成进度追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 智能筛选与分组收藏
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: tokens.colors.text.secondary }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 批量操作与一键导出
              </li>
            </ul>
            <router-link to="/opportunityB?tab=mystrategy" class="inline-flex items-center gap-2 font-bold text-base transition-all hover:gap-3 w-fit" :style="{ color: tokens.colors.accent.primary }">
              管理策略 →
            </router-link>
          </div>
          <!-- Preview Area - Management Dashboard - Right -->
          <div class="lg:col-span-7 p-8 lg:p-12 rounded-sm border shadow-2xl transform hover:scale-[1.01] transition-all duration-500" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong }">
            <!-- Active Tasks -->
            <div class="mb-6 p-4 rounded border" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.accent.primary + '4D' }">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-3">
                  <span class="w-2.5 h-2.5 rounded-full animate-pulse" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
                  <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">NVDA</span>
                  <span class="text-xs px-2 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary }">Processing</span>
                </div>
                <span class="text-xs" :style="{ color: tokens.colors.text.muted }">~2 min</span>
              </div>
              <div class="h-2 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                <div class="h-full rounded-full transition-all" style="width: 67%" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
              </div>
            </div>
            <!-- Strategy List Preview -->
            <div class="flex gap-4">
              <!-- Sidebar -->
              <div class="w-32 space-y-2">
                <div class="p-3 rounded text-sm font-medium" :style="{ backgroundColor: tokens.colors.background.overlay, color: tokens.colors.accent.primary }">
                  📁 All (24)
                </div>
                <div class="p-3 rounded text-sm" :style="{ color: tokens.colors.text.muted }">
                  ⭐ A+ (8)
                </div>
                <div class="p-3 rounded text-sm" :style="{ color: tokens.colors.text.muted }">
                  🔄 Update (3)
                </div>
              </div>
              <!-- List -->
              <div class="flex-1 space-y-3">
                <div class="p-3 rounded border flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">AAPL</span>
                    <span class="text-xs px-1.5 rounded" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">A</span>
                  </div>
                  <span class="text-xs" :style="{ color: tokens.colors.semantic.success }">↑</span>
                </div>
                <div class="p-3 rounded border flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">MSFT</span>
                    <span class="text-xs px-1.5 rounded" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">B</span>
                  </div>
                  <span class="text-xs" :style="{ color: tokens.colors.semantic.success }">↑</span>
                </div>
                <div class="p-3 rounded border flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                  <div class="flex items-center gap-3">
                    <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">AMZN</span>
                    <span class="text-xs px-1.5 rounded" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">C</span>
                  </div>
                  <span class="text-xs" :style="{ color: tokens.colors.semantic.error }">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()
</script>