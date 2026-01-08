<template>
  <div 
    class="min-h-screen pb-24 transition-colors duration-300" 
    :style="{ backgroundColor: tokens.colors.background.base }"
  >
    <!-- Header -->
    <div class="sticky top-0 z-50 backdrop-blur-md border-b px-6 py-4" :style="{ backgroundColor: tokens.colors.background.base + 'e6', borderColor: tokens.colors.border.default }">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">积分不足 Paywall 方案演示</h1>
          <p class="text-sm mt-1" :style="{ color: tokens.colors.text.muted }">5种优雅的内容限制与充值引导设计</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="isDark = !isDark"
            class="px-4 py-2 rounded-lg border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
          >
            {{ isDark ? '🌙 暗色' : '☀️ 亮色' }}
          </button>
          <router-link 
            to="/pricing"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-400 hover:to-cyan-500 transition-all"
          >
            查看定价页
          </router-link>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8 space-y-16">
      
      <!-- ========== 方案 1: 毛玻璃模糊遮罩 ========== -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400">方案 1</span>
          <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">毛玻璃模糊遮罩 + 居中引导卡片</h2>
        </div>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">用户能隐约看到内容轮廓，产生好奇心和 FOMO（错失恐惧）效果最佳</p>
        
        <div class="relative rounded-xl overflow-hidden border" :style="{ borderColor: tokens.colors.border.default }">
          <!-- 模糊的卡片背景 -->
          <div class="grid grid-cols-3 gap-4 p-6 filter blur-sm opacity-60">
            <div v-for="i in 6" :key="i" class="p-5 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
              <div class="text-2xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">{{ ['AAPL', 'NVDA', 'TSLA', 'MSFT', 'GOOGL', 'AMZN'][i-1] }}</div>
              <div class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">AI芯片突破机会</div>
              <div class="flex justify-between text-sm">
                <span class="text-green-400 font-bold">A+</span>
                <span class="text-cyan-400">买入</span>
              </div>
            </div>
          </div>
          
          <!-- 毛玻璃遮罩层 -->
          <div class="absolute inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center">
            <!-- 居中引导卡片 -->
            <div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600/50 rounded-2xl p-8 max-w-sm text-center shadow-2xl">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">积分不足</h3>
              <p class="text-slate-400 text-sm mb-6">升级会员，解锁全部 50+ 专业交易机会洞察</p>
              <router-link 
                to="/pricing"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-400 hover:to-cyan-500 transition-all shadow-lg shadow-cyan-500/25"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                立即充值
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== 方案 2: 渐变淡出 + 悬浮底部 CTA 栏 ========== -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">方案 2</span>
          <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">渐变淡出 + 悬浮底部 CTA 栏</h2>
        </div>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">让用户先体验部分内容，降低抗拒心理，适合"先尝后买"策略</p>
        
        <div class="relative rounded-xl overflow-hidden border" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
          <!-- 卡片网格 -->
          <div class="grid grid-cols-3 gap-4 p-6">
            <!-- 可见的卡片 (前3个) -->
            <div v-for="i in 3" :key="'visible-' + i" class="p-5 rounded-lg border transition-all hover:-translate-y-1" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
              <div class="text-2xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">{{ ['AAPL', 'NVDA', 'TSLA'][i-1] }}</div>
              <div class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">AI芯片突破机会</div>
              <div class="flex justify-between text-sm">
                <span class="text-green-400 font-bold">A+</span>
                <span class="text-cyan-400">买入</span>
              </div>
            </div>
            
            <!-- 渐变淡出的卡片 -->
            <div v-for="i in 3" :key="'fade-' + i" class="p-5 rounded-lg border opacity-40" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
              <div class="text-2xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">{{ ['MSFT', 'GOOGL', 'AMZN'][i-1] }}</div>
              <div class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">主题投资机会</div>
              <div class="flex justify-between text-sm">
                <span class="text-yellow-400 font-bold">B+</span>
                <span class="text-cyan-400">观望</span>
              </div>
            </div>
          </div>
          
          <!-- 渐变遮罩 -->
          <div 
            class="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            :style="{ background: `linear-gradient(to bottom, transparent, ${isDark ? '#0f172a' : '#f8fafc'})` }"
          ></div>
          
          <!-- 悬浮底部 CTA 栏 -->
          <div class="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm" :style="{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)' }">
            <div class="flex items-center justify-between max-w-2xl mx-auto">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium" :style="{ color: tokens.colors.text.primary }">还有 47+ 交易机会等待解锁</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">升级 Premium 获取完整访问权限</div>
                </div>
              </div>
              <router-link 
                to="/pricing"
                class="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:from-purple-400 hover:to-purple-500 transition-all"
              >
                立即升级
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== 方案 3: 骨架屏占位 + 锁定徽章 ========== -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400">方案 3</span>
          <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">骨架屏占位 + 锁定徽章</h2>
        </div>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">页面加载快，视觉干净，强调"这里有内容但被锁定"</p>
        
        <div class="rounded-xl overflow-hidden border p-6" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
          <div class="grid grid-cols-3 gap-4">
            <div 
              v-for="i in 6" 
              :key="i" 
              @click="showSkeletonModal = true"
              class="p-5 rounded-lg border cursor-pointer transition-all hover:border-amber-500/50 group relative"
              :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }"
            >
              <!-- 锁定徽章 -->
              <div class="absolute top-3 right-3 w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              
              <!-- 骨架内容 -->
              <div class="space-y-3 animate-pulse">
                <div class="h-6 w-16 rounded" :style="{ backgroundColor: tokens.colors.border.default }"></div>
                <div class="h-3 w-24 rounded" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>
                <div class="h-3 w-full rounded" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>
                <div class="flex gap-4 pt-2">
                  <div class="h-4 w-8 rounded" :style="{ backgroundColor: tokens.colors.border.default }"></div>
                  <div class="h-4 w-12 rounded" :style="{ backgroundColor: tokens.colors.border.default }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 骨架屏点击弹窗 -->
        <div v-if="showSkeletonModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="showSkeletonModal = false">
          <div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-2xl p-8 max-w-sm text-center shadow-2xl">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Premium 专属内容</h3>
            <p class="text-slate-400 text-sm mb-6">此交易机会仅对 Premium 会员开放，升级后即可查看完整分析</p>
            <div class="flex gap-3 justify-center">
              <button @click="showSkeletonModal = false" class="px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700/50 transition-colors">
                稍后再说
              </button>
              <router-link 
                to="/pricing"
                class="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium hover:from-amber-400 hover:to-amber-500 transition-all"
              >
                立即升级
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== 方案 4: 全屏引导页 + 价值展示 ========== -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400">方案 4</span>
          <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">全屏引导页 + 价值展示</h2>
        </div>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">聚焦转化，适合积分完全为0或首次访问的新用户</p>
        
        <div class="rounded-xl overflow-hidden border" :style="{ borderColor: tokens.colors.border.default }">
          <div 
            class="py-16 px-8 text-center relative overflow-hidden"
            :style="{ backgroundColor: tokens.colors.background.surface }"
          >
            <!-- 背景装饰 -->
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-10 left-10 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl"></div>
              <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
            </div>
            
            <div class="relative z-10 max-w-2xl mx-auto">
              <!-- Icon -->
              <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center border border-green-500/30">
                <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              
              <!-- Title -->
              <h2 class="text-3xl font-bold mb-4" :style="{ color: tokens.colors.text.primary }">
                解锁 <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">AI 交易洞察</span>
              </h2>
              <p class="text-lg mb-8" :style="{ color: tokens.colors.text.muted }">
                专业级量化分析，助您把握每一个盈利机会
              </p>
              
              <!-- 价值点 -->
              <div class="grid grid-cols-3 gap-6 mb-10">
                <div class="p-4 rounded-xl border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
                  <div class="text-2xl font-bold text-green-400 mb-1">50+</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">每日精选交易机会</div>
                </div>
                <div class="p-4 rounded-xl border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
                  <div class="text-2xl font-bold text-cyan-400 mb-1">AI</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">智能评级与分析</div>
                </div>
                <div class="p-4 rounded-xl border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }">
                  <div class="text-2xl font-bold text-purple-400 mb-1">24/7</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">实时市场追踪</div>
                </div>
              </div>
              
              <!-- 功能列表 -->
              <div class="flex flex-wrap justify-center gap-4 mb-10 text-sm">
                <div class="flex items-center gap-2 px-4 py-2 rounded-full border" :style="{ borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  盈亏比分析
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full border" :style="{ borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  风险等级标注
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full border" :style="{ borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  主题趋势追踪
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full border" :style="{ borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  持仓归因分析
                </div>
              </div>
              
              <!-- CTA -->
              <router-link 
                to="/pricing"
                class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white font-bold text-lg hover:from-green-400 hover:to-cyan-400 transition-all shadow-lg shadow-green-500/25"
              >
                查看定价方案
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== 方案 5: 部分可见 + 行内升级提示 ========== -->
      <section>
        <div class="flex items-center gap-3 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400">方案 5</span>
          <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">部分可见 + 行内升级提示</h2>
        </div>
        <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">精细化控制可见内容，用户感知到内容价值，核心数据脱敏处理</p>
        
        <div class="rounded-xl overflow-hidden border p-6" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
          <div class="grid grid-cols-3 gap-4">
            <div 
              v-for="(stock, i) in partialCards" 
              :key="i" 
              class="p-5 rounded-lg border transition-all hover:border-rose-500/30"
              :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.subtle }"
            >
              <!-- 可见部分: 标题和代码 -->
              <div class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">{{ stock.symbol }}</div>
              <div class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">{{ stock.title }}</div>
              
              <!-- 脱敏部分 -->
              <div class="space-y-2 mb-4 py-3 border-y" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="flex justify-between items-center">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">评级</span>
                  <span class="font-mono font-bold text-rose-400/70 blur-[2px] select-none">A+</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">操作建议</span>
                  <span class="font-mono font-bold text-rose-400/70 blur-[2px] select-none">买入</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">盈亏比</span>
                  <span class="font-mono font-bold text-rose-400/70 blur-[2px] select-none">3.2:1</span>
                </div>
              </div>
              
              <!-- 解锁按钮 -->
              <router-link 
                to="/pricing"
                class="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-rose-500/30 text-rose-400 text-xs font-medium hover:bg-rose-500/10 transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                </svg>
                解锁完整内容
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- ========== 方案对比总结 ========== -->
      <section class="pb-8">
        <h2 class="text-xl font-bold mb-6" :style="{ color: tokens.colors.text.primary }">📊 方案对比总结</h2>
        <div class="rounded-xl overflow-hidden border" :style="{ borderColor: tokens.colors.border.default }">
          <table class="w-full text-sm">
            <thead>
              <tr :style="{ backgroundColor: tokens.colors.background.elevated }">
                <th class="px-4 py-3 text-left font-medium" :style="{ color: tokens.colors.text.secondary }">方案</th>
                <th class="px-4 py-3 text-left font-medium" :style="{ color: tokens.colors.text.secondary }">适用场景</th>
                <th class="px-4 py-3 text-left font-medium" :style="{ color: tokens.colors.text.secondary }">转化效果</th>
                <th class="px-4 py-3 text-left font-medium" :style="{ color: tokens.colors.text.secondary }">用户体验</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonData" :key="i" class="border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                <td class="px-4 py-3" :style="{ color: tokens.colors.text.primary }">
                  <span class="px-2 py-0.5 rounded text-xs font-bold" :class="row.colorClass">{{ row.name }}</span>
                </td>
                <td class="px-4 py-3" :style="{ color: tokens.colors.text.muted }">{{ row.scenario }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1">
                    <span v-for="s in row.conversion" :key="s" class="text-yellow-400">★</span>
                    <span v-for="s in (5 - row.conversion)" :key="'e'+s" class="text-slate-600">★</span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1">
                    <span v-for="s in row.ux" :key="s" class="text-green-400">★</span>
                    <span v-for="s in (5 - row.ux)" :key="'e'+s" class="text-slate-600">★</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()

const showSkeletonModal = ref(false)

const partialCards = [
  { symbol: 'AAPL', title: 'AI芯片需求激增机会' },
  { symbol: 'NVDA', title: 'GPU市场主导地位' },
  { symbol: 'TSLA', title: '自动驾驶突破预期' },
  { symbol: 'MSFT', title: 'Azure云增长强劲' },
  { symbol: 'GOOGL', title: 'AI搜索变革机遇' },
  { symbol: 'AMZN', title: 'AWS市场份额扩张' },
]

const comparisonData = [
  { name: '方案1 毛玻璃', colorClass: 'bg-cyan-500/20 text-cyan-400', scenario: 'FOMO效果最强', conversion: 5, ux: 4 },
  { name: '方案2 渐变淡出', colorClass: 'bg-purple-500/20 text-purple-400', scenario: '先尝后买策略', conversion: 4, ux: 5 },
  { name: '方案3 骨架屏', colorClass: 'bg-amber-500/20 text-amber-400', scenario: '快速加载/移动端', conversion: 3, ux: 4 },
  { name: '方案4 全屏引导', colorClass: 'bg-green-500/20 text-green-400', scenario: '新用户/积分为0', conversion: 4, ux: 3 },
  { name: '方案5 部分可见', colorClass: 'bg-rose-500/20 text-rose-400', scenario: '精细内容控制', conversion: 4, ux: 4 },
]
</script>
