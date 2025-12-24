<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Header -->
    <header class="border-b px-6 py-4" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
            <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">InfoB Following 空状态设计</h1>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">Themes / Stocks / Strategies - Following Empty State Design</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <router-link 
            to="/infoB?tab=themes"
            class="px-4 py-2 text-sm rounded-sm border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
          >
            返回 InfoB
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-6">
      <div class="max-w-7xl mx-auto space-y-10">
        
        <!-- ============================================ -->
        <!-- Tab 1: Themes Following 空状态 -->
        <!-- ============================================ -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <div>
              <h2 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
                <span class="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold" :style="{ backgroundColor: tokens.colors.accent.secondary + '1A', color: tokens.colors.accent.secondary }">1</span>
                Themes Following 空状态
              </h2>
              <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">用户切换到 Following 但未关注任何主题时显示</p>
            </div>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :style="{ backgroundColor: tokens.colors.accent.secondary + '1A', color: tokens.colors.accent.secondary }">Themes Tab</span>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Themes Empty State -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Icon with floating elements -->
              <div class="relative w-28 h-28 mb-6">
                <!-- Background circle -->
                <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: tokens.colors.accent.secondary + '0D' }"></div>
                <!-- Main icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-14 h-14" :style="{ color: tokens.colors.accent.secondary + '80' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <!-- Floating badges -->
                <div class="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm animate-bounce" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <div class="absolute -bottom-1 -left-1 w-8 h-8 rounded-full flex items-center justify-center text-sm" style="animation: bounce 1s infinite 0.5s;" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">发现并关注投资主题</h3>
              
              <!-- Description -->
              <p class="text-sm text-center max-w-md mb-8" :style="{ color: tokens.colors.text.muted }">
                您尚未关注任何市场主题。关注感兴趣的主题，及时获取相关的市场动态和投资机会。
              </p>
              
              <!-- Preview Cards (示意) -->
              <div class="flex items-center gap-3 mb-8">
                <div class="w-32 h-20 rounded-sm border-2 border-dashed flex flex-col items-center justify-center" :style="{ borderColor: tokens.colors.border.default }">
                  <span class="text-lg mb-1">🤖</span>
                  <span class="text-[10px] font-medium" :style="{ color: tokens.colors.text.muted }">AI & 机器人</span>
                </div>
                <div class="w-32 h-20 rounded-sm border-2 border-dashed flex flex-col items-center justify-center" :style="{ borderColor: tokens.colors.border.default }">
                  <span class="text-lg mb-1">⚡</span>
                  <span class="text-[10px] font-medium" :style="{ color: tokens.colors.text.muted }">新能源</span>
                </div>
                <div class="w-32 h-20 rounded-sm border-2 border-dashed flex flex-col items-center justify-center" :style="{ borderColor: tokens.colors.border.default }">
                  <span class="text-lg mb-1">🏥</span>
                  <span class="text-[10px] font-medium" :style="{ color: tokens.colors.text.muted }">医疗健康</span>
                </div>
              </div>
              
              <!-- CTA Button -->
              <button 
                class="px-6 py-3 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                :style="{ backgroundColor: tokens.colors.accent.secondary, color: tokens.colors.background.base }"
              >
                浏览热门主题
              </button>
            </div>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- Tab 2: Stocks Following 空状态 -->
        <!-- ============================================ -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <div>
              <h2 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
                <span class="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">2</span>
                Stocks Following 空状态
              </h2>
              <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">用户切换到 Following 但未关注任何股票时显示</p>
            </div>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">Stocks Tab</span>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Stocks Empty State -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Icon -->
              <div class="relative w-28 h-28 mb-6">
                <!-- Pulse animation -->
                <div class="absolute inset-0 rounded-full animate-ping opacity-10" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                <!-- Background circle -->
                <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: tokens.colors.semantic.success + '0D' }"></div>
                <!-- Main icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-14 h-14" :style="{ color: tokens.colors.semantic.success + '80' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <!-- Star icon -->
                <div class="absolute -top-2 right-0 w-7 h-7 rounded-full flex items-center justify-center" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">开始追踪您感兴趣的股票</h3>
              
              <!-- Description -->
              <p class="text-sm text-center max-w-md mb-8" :style="{ color: tokens.colors.text.muted }">
                您尚未关注任何股票。添加股票到您的关注列表，实时追踪价格变动和重要信号。
              </p>
              
              <!-- Stock Pills Preview -->
              <div class="flex flex-wrap items-center justify-center gap-2 mb-8">
                <div class="px-3 py-1.5 rounded-full border flex items-center gap-2" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                  <span class="text-xs font-mono font-bold" :style="{ color: tokens.colors.text.primary }">AAPL</span>
                  <span class="text-[10px]" :style="{ color: tokens.colors.semantic.success }">+2.34%</span>
                </div>
                <div class="px-3 py-1.5 rounded-full border flex items-center gap-2" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                  <span class="text-xs font-mono font-bold" :style="{ color: tokens.colors.text.primary }">NVDA</span>
                  <span class="text-[10px]" :style="{ color: tokens.colors.semantic.success }">+5.67%</span>
                </div>
                <div class="px-3 py-1.5 rounded-full border flex items-center gap-2" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                  <span class="text-xs font-mono font-bold" :style="{ color: tokens.colors.text.primary }">TSLA</span>
                  <span class="text-[10px]" :style="{ color: tokens.colors.semantic.error }">-1.23%</span>
                </div>
                <div class="w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center" :style="{ borderColor: tokens.colors.border.default }">
                  <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
              </div>
              
              <!-- CTA Buttons -->
              <div class="flex items-center gap-3">
                <button 
                  class="px-6 py-3 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.semantic.success, color: tokens.colors.background.base }"
                >
                  搜索股票
                </button>
                <button 
                  class="px-4 py-3 text-sm font-medium rounded-sm border transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                >
                  导入持仓
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- Tab 3: Strategies Following 空状态 -->
        <!-- ============================================ -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <div>
              <h2 class="text-sm font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
                <span class="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">3</span>
                Strategies Following 空状态
              </h2>
              <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">用户切换到 Following 但未关注任何策略时显示</p>
            </div>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">Strategies Tab</span>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Strategies Empty State -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Icon with lightning effect -->
              <div class="relative w-28 h-28 mb-6">
                <!-- Background circle -->
                <div class="absolute inset-0 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary + '0D' }"></div>
                <!-- Main icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-14 h-14" :style="{ color: tokens.colors.accent.primary + '80' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <!-- Badge -->
                <div class="absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }">
                  AI
                </div>
              </div>
              
              <!-- Title -->
              <h3 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">发现并关注 AI 策略</h3>
              
              <!-- Description -->
              <p class="text-sm text-center max-w-md mb-8" :style="{ color: tokens.colors.text.muted }">
                您尚未关注任何投资策略。浏览专业策略，一键关注获取实时交易信号和市场洞察。
              </p>
              
              <!-- Strategy Cards Preview -->
              <div class="flex items-center gap-4 mb-8">
                <!-- Strategy Card 1 -->
                <div class="w-48 p-3 rounded-sm border" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">动量追踪策略</span>
                    <span class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">A</span>
                  </div>
                  <div class="flex items-center gap-2 text-[10px]" :style="{ color: tokens.colors.text.muted }">
                    <span>年化 +32.5%</span>
                    <span>·</span>
                    <span>1.2k 关注</span>
                  </div>
                </div>
                <!-- Strategy Card 2 -->
                <div class="w-48 p-3 rounded-sm border" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">价值投资组合</span>
                    <span class="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">B</span>
                  </div>
                  <div class="flex items-center gap-2 text-[10px]" :style="{ color: tokens.colors.text.muted }">
                    <span>年化 +18.7%</span>
                    <span>·</span>
                    <span>856 关注</span>
                  </div>
                </div>
              </div>
              
              <!-- CTA Button -->
              <button 
                class="px-6 py-3 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
              >
                浏览策略市场
              </button>
            </div>
          </div>
        </section>

        <!-- ============================================ -->
        <!-- 综合预览：三合一展示 -->
        <!-- ============================================ -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.accent.primary + '4D' }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary + '33' }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.accent.primary }">📐 综合预览 - 缩略图</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">三个空状态的并排对比展示</p>
          </div>
          <div class="p-6 grid grid-cols-3 gap-4" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Themes Thumbnail -->
            <div class="border rounded-sm p-4 flex flex-col items-center" :style="{ borderColor: tokens.colors.border.default }">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.accent.secondary + '1A' }">
                <svg class="w-6 h-6" :style="{ color: tokens.colors.accent.secondary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
              </div>
              <span class="text-xs font-bold mb-1" :style="{ color: tokens.colors.text.primary }">Themes</span>
              <span class="text-[10px] text-center" :style="{ color: tokens.colors.text.muted }">发现并关注投资主题</span>
              <div class="mt-3 px-2 py-1 rounded text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.secondary, color: tokens.colors.background.base }">浏览热门主题</div>
            </div>
            <!-- Stocks Thumbnail -->
            <div class="border rounded-sm p-4 flex flex-col items-center" :style="{ borderColor: tokens.colors.border.default }">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.semantic.success + '1A' }">
                <svg class="w-6 h-6" :style="{ color: tokens.colors.semantic.success }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span class="text-xs font-bold mb-1" :style="{ color: tokens.colors.text.primary }">Stocks</span>
              <span class="text-[10px] text-center" :style="{ color: tokens.colors.text.muted }">追踪您感兴趣的股票</span>
              <div class="mt-3 px-2 py-1 rounded text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.semantic.success, color: tokens.colors.background.base }">搜索股票</div>
            </div>
            <!-- Strategies Thumbnail -->
            <div class="border rounded-sm p-4 flex flex-col items-center" :style="{ borderColor: tokens.colors.border.default }">
              <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                <svg class="w-6 h-6" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span class="text-xs font-bold mb-1" :style="{ color: tokens.colors.text.primary }">Strategies</span>
              <span class="text-[10px] text-center" :style="{ color: tokens.colors.text.muted }">发现并关注 AI 策略</span>
              <div class="mt-3 px-2 py-1 rounded text-[10px] font-bold" :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }">浏览策略市场</div>
            </div>
          </div>
        </section>

      </div>
    </main>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import ThemeToggle from '../components/ThemeToggle.vue'

const { tokens, isDark } = useTheme()
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(-10%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>
