<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Header -->
    <header class="border-b px-6 py-4" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
            <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">股票归因页空状态设计</h1>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">Stock Attribution Page - Empty States Design</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <router-link 
            to="/stock-attribution/GOOGL"
            class="px-4 py-2 text-sm rounded-sm border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
          >
            返回归因页面
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-6">
      <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- Tab 1: 价格走势 (Price Trend) 空状态 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">TAB 1</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">价格走势 (Price Trend) - 空状态</h2>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Chart Icon -->
              <div class="relative w-32 h-24 mb-6">
                <svg class="w-full h-full" viewBox="0 0 128 96" fill="none">
                  <!-- Axes -->
                  <line x1="20" y1="80" x2="108" y2="80" :stroke="tokens.colors.border.default" stroke-width="2" />
                  <line x1="20" y1="80" x2="20" y2="16" :stroke="tokens.colors.border.default" stroke-width="2" />
                  <!-- Dashed lines -->
                  <line x1="20" y1="56" x2="108" y2="56" :stroke="tokens.colors.border.subtle" stroke-width="1" stroke-dasharray="4 4" />
                  <line x1="20" y1="32" x2="108" y2="32" :stroke="tokens.colors.border.subtle" stroke-width="1" stroke-dasharray="4 4" />
                  <!-- Question mark placeholder -->
                  <text x="64" y="52" text-anchor="middle" font-size="24" :fill="tokens.colors.text.muted">?</text>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">暂无价格数据</h3>
              <p class="text-sm text-center max-w-md mb-6" :style="{ color: tokens.colors.text.muted }">
                该股票暂无历史价格数据，可能是新上市股票或数据源暂时不可用
              </p>
              <button 
                class="px-4 py-2 text-sm font-medium rounded-sm border transition-colors"
                :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
              >
                刷新数据
              </button>
            </div>
          </div>
        </section>

        <!-- Tab 2: 相关主题 (Related Themes) 空状态 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.secondary + '1A', color: tokens.colors.accent.secondary }">TAB 2</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">相关主题 (Related Themes) - 空状态</h2>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Theme Icon -->
              <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6" :style="{ backgroundColor: tokens.colors.accent.secondary + '0D' }">
                <svg class="w-10 h-10" :style="{ color: tokens.colors.accent.secondary + '66' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">尚未关联任何主题</h3>
              <p class="text-sm text-center max-w-md mb-6" :style="{ color: tokens.colors.text.muted }">
                AI 尚未识别到与该股票相关的投资主题。随着市场动态变化，我们会持续分析并更新关联主题。
              </p>
              <div class="flex items-center gap-3">
                <button 
                  class="px-4 py-2 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.accent.secondary, color: tokens.colors.background.base }"
                >
                  浏览热门主题
                </button>
                <button 
                  class="px-4 py-2 text-sm font-medium rounded-sm border transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                >
                  请求分析
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab 3: 事件分析 (Event Analysis / Attribution) 空状态 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">TAB 3</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">事件分析 (Event Analysis) - 空状态</h2>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Timeline Icon -->
              <div class="relative w-48 h-24 mb-6">
                <svg class="w-full h-full" viewBox="0 0 192 96" fill="none">
                  <!-- Timeline -->
                  <line x1="16" y1="48" x2="176" y2="48" :stroke="tokens.colors.border.default" stroke-width="2" />
                  <!-- Empty nodes -->
                  <circle cx="48" cy="48" r="8" :stroke="tokens.colors.border.default" stroke-width="2" fill="none" stroke-dasharray="4 4" />
                  <circle cx="96" cy="48" r="8" :stroke="tokens.colors.border.default" stroke-width="2" fill="none" stroke-dasharray="4 4" />
                  <circle cx="144" cy="48" r="8" :stroke="tokens.colors.border.default" stroke-width="2" fill="none" stroke-dasharray="4 4" />
                  <!-- Labels -->
                  <text x="48" y="72" text-anchor="middle" font-size="10" :fill="tokens.colors.text.muted">?</text>
                  <text x="96" y="72" text-anchor="middle" font-size="10" :fill="tokens.colors.text.muted">?</text>
                  <text x="144" y="72" text-anchor="middle" font-size="10" :fill="tokens.colors.text.muted">?</text>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">暂无事件归因数据</h3>
              <p class="text-sm text-center max-w-md mb-2" :style="{ color: tokens.colors.text.secondary }">
                我们正在分析影响该股票价格变动的关键事件
              </p>
              <p class="text-xs text-center max-w-sm mb-6" :style="{ color: tokens.colors.text.muted }">
                事件归因分析需要一定时间，包括财报发布、市场新闻、分析师评级等多维度信息
              </p>
              <div class="flex items-center gap-2 px-4 py-2 rounded-sm" :style="{ backgroundColor: tokens.colors.semantic.warning + '0D', borderColor: tokens.colors.semantic.warning + '33' }">
                <svg class="w-4 h-4 animate-spin" :style="{ color: tokens.colors.semantic.warning }" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-xs font-medium" :style="{ color: tokens.colors.semantic.warning }">AI 分析进行中...</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab 4: 个股相关策略 (Strategies) 空状态 - 方案A -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">TAB 4-A</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">个股相关策略 (Strategies) - 空状态 A：暂无策略</h2>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Strategy Icon -->
              <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6" :style="{ backgroundColor: tokens.colors.semantic.success + '0D' }">
                <svg class="w-10 h-10" :style="{ color: tokens.colors.semantic.success + '66' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">暂无相关策略</h3>
              <p class="text-sm text-center max-w-md mb-6" :style="{ color: tokens.colors.text.muted }">
                AI 尚未为该股票生成投资策略。您可以请求生成新策略或浏览其他投资机会。
              </p>
              <div class="flex items-center gap-3">
                <button 
                  class="px-5 py-2.5 text-sm font-bold rounded-sm transition-colors hover:brightness-110 flex items-center gap-2"
                  :style="{ backgroundColor: tokens.colors.semantic.success, color: '#fff' }"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  生成策略
                </button>
                <button 
                  class="px-5 py-2.5 text-sm font-medium rounded-sm border transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                >
                  浏览机会
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Tab 4: 个股相关策略 (Strategies) 空状态 - 方案B -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">TAB 4-B</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">个股相关策略 (Strategies) - 空状态 B：生成中</h2>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Generating Animation -->
              <div class="relative w-24 h-24 mb-6">
                <div class="absolute inset-0 rounded-full border-2 border-dashed animate-spin-slow" :style="{ borderColor: tokens.colors.accent.primary + '4D' }"></div>
                <div class="absolute inset-2 rounded-full flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                  <svg class="w-8 h-8" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">策略生成中</h3>
              <p class="text-sm text-center max-w-md mb-4" :style="{ color: tokens.colors.text.muted }">
                AI 正在分析市场数据并生成投资策略，请稍候...
              </p>
              <!-- Progress -->
              <div class="w-64 mb-4">
                <div class="h-1 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full rounded-full animate-progress" :style="{ backgroundColor: tokens.colors.accent.primary, width: '60%' }"></div>
                </div>
              </div>
              <div class="flex items-center gap-4 text-xs" :style="{ color: tokens.colors.text.muted }">
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                  <span>数据采集</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                  <span>技术分析</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full animate-pulse" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                  <span>策略生成</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.border.default }"></div>
                  <span>风险评估</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 完整页面模拟 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center gap-3" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <span class="px-2 py-0.5 rounded-sm text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">FULL PAGE</span>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">完整页面模拟 - 带 Tab 切换</h2>
          </div>
          <div :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Mock Header -->
            <div class="px-6 py-4 border-b" :style="{ borderColor: tokens.colors.border.default }">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-sm flex items-center justify-center text-lg font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                  G
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">GOOGL</h2>
                    <span class="text-sm" :style="{ color: tokens.colors.text.muted }">Alphabet Inc.</span>
                  </div>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-lg font-mono font-bold" :style="{ color: tokens.colors.semantic.success }">$176.45</span>
                    <span class="text-sm" :style="{ color: tokens.colors.semantic.success }">+2.34%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Mock Tabs -->
            <div class="grid grid-cols-4 border-b" :style="{ borderColor: tokens.colors.border.default }">
              <button 
                v-for="(tab, index) in mockTabs" 
                :key="tab.id"
                @click="mockActiveTab = tab.id"
                class="px-4 py-3 text-xs font-bold border-b-2 transition-colors text-center"
                :style="mockActiveTab === tab.id ? { borderColor: tokens.colors.accent.primary, color: tokens.colors.accent.primary } : { borderColor: 'transparent', color: tokens.colors.text.muted }"
              >
                {{ tab.label }}
              </button>
            </div>
            
            <!-- Tab Content -->
            <div class="p-6">
              <!-- Price Tab Empty -->
              <div v-if="mockActiveTab === 'price'" class="py-12 flex flex-col items-center">
                <svg class="w-16 h-16 mb-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                </svg>
                <p class="text-sm font-medium mb-1" :style="{ color: tokens.colors.text.secondary }">暂无价格数据</p>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">数据源暂时不可用</p>
              </div>
              
              <!-- Themes Tab Empty -->
              <div v-if="mockActiveTab === 'themes'" class="py-12 flex flex-col items-center">
                <svg class="w-16 h-16 mb-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <p class="text-sm font-medium mb-1" :style="{ color: tokens.colors.text.secondary }">尚未关联任何主题</p>
                <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">AI 正在持续分析相关投资主题</p>
                <button class="px-4 py-2 text-xs font-bold rounded-sm" :style="{ backgroundColor: tokens.colors.accent.secondary, color: tokens.colors.background.base }">
                  浏览热门主题
                </button>
              </div>
              
              <!-- Attribution Tab Empty -->
              <div v-if="mockActiveTab === 'attribution'" class="py-12 flex flex-col items-center">
                <svg class="w-16 h-16 mb-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                </svg>
                <p class="text-sm font-medium mb-1" :style="{ color: tokens.colors.text.secondary }">暂无事件归因数据</p>
                <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">正在分析关键事件对价格的影响</p>
                <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.semantic.warning }">
                  <svg class="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  分析中...
                </div>
              </div>
              
              <!-- Strategies Tab Empty -->
              <div v-if="mockActiveTab === 'strategies'" class="py-12 flex flex-col items-center">
                <svg class="w-16 h-16 mb-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <p class="text-sm font-medium mb-1" :style="{ color: tokens.colors.text.secondary }">暂无相关策略</p>
                <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">您可以请求 AI 生成投资策略</p>
                <button class="px-4 py-2 text-xs font-bold rounded-sm flex items-center gap-1.5" :style="{ backgroundColor: tokens.colors.semantic.success, color: '#fff' }">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  生成策略
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import ThemeToggle from '../components/ThemeToggle.vue'

const { tokens, isDark } = useTheme()

const mockActiveTab = ref('strategies')
const mockTabs = [
  { id: 'price', label: '价格走势' },
  { id: 'themes', label: '相关主题' },
  { id: 'attribution', label: '事件分析' },
  { id: 'strategies', label: '个股策略' }
]
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

@keyframes progress {
  0% {
    width: 0%;
  }
  50% {
    width: 60%;
  }
  100% {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 3s ease-in-out infinite;
}
</style>
