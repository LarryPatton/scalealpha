<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Header -->
    <header class="border-b px-6 py-4" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
            <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">策略空状态设计展示</h1>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">Strategy Empty State Design Showcase</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <router-link 
            to="/opportunityB?tab=mystrategy"
            class="px-4 py-2 text-sm rounded-sm border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
          >
            返回策略列表
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-6">
      <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- 方案一：极简引导式 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案一：极简引导式</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">聚焦单一行动召唤，适合新用户快速上手</p>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Empty State Design 1 -->
            <div class="flex flex-col items-center justify-center py-20">
              <!-- Icon -->
              <div class="w-24 h-24 rounded-full flex items-center justify-center mb-6" :style="{ backgroundColor: tokens.colors.accent.primary + '0D' }">
                <svg class="w-12 h-12" :style="{ color: tokens.colors.accent.primary + '66' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7v4m0 0v4m0-4h4m-4 0H9"></path>
                </svg>
              </div>
              <!-- Title -->
              <h3 class="text-xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">开始构建您的策略库</h3>
              <!-- Description -->
              <p class="text-sm text-center max-w-md mb-8" :style="{ color: tokens.colors.text.muted }">
                您还没有保存任何策略。浏览市场机会，收藏感兴趣的策略，或让 AI 为您生成定制化投资计划。
              </p>
              <!-- CTA Button -->
              <button 
                class="px-6 py-3 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
              >
                浏览投资机会
              </button>
            </div>
          </div>
        </section>

        <!-- 方案二：功能引导式 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案二：功能引导式</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">展示多种入口，引导用户了解产品功能</p>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Empty State Design 2 -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Animated Icon -->
              <div class="relative w-20 h-20 mb-6">
                <div class="absolute inset-0 rounded-full animate-ping opacity-20" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                <div class="relative w-20 h-20 rounded-full flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                  <svg class="w-10 h-10" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
              </div>
              <!-- Title -->
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">您的策略库为空</h3>
              <p class="text-sm text-center max-w-lg mb-8" :style="{ color: tokens.colors.text.muted }">
                通过以下方式开始建立您的个人策略库
              </p>
              
              <!-- Action Cards -->
              <div class="grid grid-cols-3 gap-4 w-full max-w-2xl">
                <!-- Card 1 -->
                <div 
                  class="p-4 border rounded-sm cursor-pointer transition-all hover:border-opacity-60 group"
                  :style="{ borderColor: tokens.colors.accent.primary + '33', backgroundColor: tokens.colors.background.surface }"
                >
                  <div class="w-10 h-10 rounded-sm flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                    <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <h4 class="text-sm font-bold mb-1" :style="{ color: tokens.colors.text.primary }">发现机会</h4>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">浏览 AI 筛选的投资机会</p>
                </div>
                
                <!-- Card 2 -->
                <div 
                  class="p-4 border rounded-sm cursor-pointer transition-all hover:border-opacity-60 group"
                  :style="{ borderColor: tokens.colors.semantic.success + '33', backgroundColor: tokens.colors.background.surface }"
                >
                  <div class="w-10 h-10 rounded-sm flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.semantic.success + '1A' }">
                    <svg class="w-5 h-5" :style="{ color: tokens.colors.semantic.success }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </div>
                  <h4 class="text-sm font-bold mb-1" :style="{ color: tokens.colors.text.primary }">手动添加</h4>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">搜索并添加感兴趣的股票</p>
                </div>
                
                <!-- Card 3 -->
                <div 
                  class="p-4 border rounded-sm cursor-pointer transition-all hover:border-opacity-60 group"
                  :style="{ borderColor: tokens.colors.accent.warning + '33', backgroundColor: tokens.colors.background.surface }"
                >
                  <div class="w-10 h-10 rounded-sm flex items-center justify-center mb-3" :style="{ backgroundColor: tokens.colors.accent.warning + '1A' }">
                    <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.warning }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                  </div>
                  <h4 class="text-sm font-bold mb-1" :style="{ color: tokens.colors.text.primary }">导入持仓</h4>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">从券商导入现有持仓</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 方案三：情感化设计 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案三：情感化设计</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">使用插图和动画增强情感连接</p>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Empty State Design 3 -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Illustration -->
              <div class="relative w-48 h-36 mb-8">
                <!-- Background glow -->
                <div class="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-500/10 rounded-full blur-3xl"></div>
                <!-- Chart illustration -->
                <svg class="w-full h-full" viewBox="0 0 200 150" fill="none">
                  <!-- Grid lines -->
                  <line x1="20" y1="130" x2="180" y2="130" :stroke="tokens.colors.border.default" stroke-width="1" />
                  <line x1="20" y1="100" x2="180" y2="100" :stroke="tokens.colors.border.subtle" stroke-width="0.5" stroke-dasharray="4 4" />
                  <line x1="20" y1="70" x2="180" y2="70" :stroke="tokens.colors.border.subtle" stroke-width="0.5" stroke-dasharray="4 4" />
                  <line x1="20" y1="40" x2="180" y2="40" :stroke="tokens.colors.border.subtle" stroke-width="0.5" stroke-dasharray="4 4" />
                  <!-- Upward trend line -->
                  <path d="M30 110 Q60 100, 80 80 T130 50 T180 30" :stroke="tokens.colors.accent.primary" stroke-width="2" fill="none" stroke-linecap="round">
                    <animate attributeName="stroke-dasharray" from="0 500" to="500 0" dur="2s" fill="freeze" />
                  </path>
                  <!-- Data points -->
                  <circle cx="30" cy="110" r="4" :fill="tokens.colors.accent.primary">
                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.5s" fill="freeze" />
                  </circle>
                  <circle cx="80" cy="80" r="4" :fill="tokens.colors.accent.primary">
                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze" />
                  </circle>
                  <circle cx="130" cy="50" r="4" :fill="tokens.colors.accent.primary">
                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.5s" fill="freeze" />
                  </circle>
                  <circle cx="180" cy="30" r="5" :fill="tokens.colors.semantic.success">
                    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2s" fill="freeze" />
                  </circle>
                  <!-- Plus icon at end -->
                  <g transform="translate(170, 20)">
                    <circle cx="10" cy="10" r="12" :fill="tokens.colors.background.surface" :stroke="tokens.colors.accent.primary" stroke-width="2">
                      <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.2s" fill="freeze" />
                    </circle>
                    <path d="M6 10h8M10 6v8" :stroke="tokens.colors.accent.primary" stroke-width="2" stroke-linecap="round">
                      <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.4s" fill="freeze" />
                    </path>
                  </g>
                </svg>
              </div>
              
              <!-- Content -->
              <h3 class="text-xl font-bold mb-3" :style="{ color: tokens.colors.text.primary }">让投资更智能</h3>
              <p class="text-sm text-center max-w-md mb-2" :style="{ color: tokens.colors.text.secondary }">
                添加您的第一个策略，开启 AI 驱动的投资之旅
              </p>
              <p class="text-xs text-center max-w-sm mb-8" :style="{ color: tokens.colors.text.muted }">
                我们将持续追踪市场动态，为您提供实时的策略更新和执行建议
              </p>
              
              <!-- Buttons -->
              <div class="flex items-center gap-3">
                <button 
                  class="px-6 py-2.5 text-sm font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                >
                  探索投资机会
                </button>
                <button 
                  class="px-6 py-2.5 text-sm font-medium rounded-sm border transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                >
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 方案四：表格内嵌式 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案四：表格内嵌式</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">保留表格结构，在表格区域内显示空状态</p>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Mock Table Structure -->
            <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
              <!-- Table Header -->
              <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
                <div class="flex items-center gap-4">
                  <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">我的策略</span>
                  <span class="text-xs px-2 py-0.5 rounded-full" :style="{ backgroundColor: tokens.colors.border.default, color: tokens.colors.text.muted }">0</span>
                </div>
                <div class="flex items-center gap-2">
                  <button class="p-1.5 rounded-sm" :style="{ color: tokens.colors.text.muted }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                  </button>
                  <button class="p-1.5 rounded-sm" :style="{ color: tokens.colors.text.muted }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </div>
              </div>
              
              <!-- Table Columns Header -->
              <div class="border-b grid grid-cols-7 text-[10px] font-bold uppercase tracking-wider" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                <div class="px-4 py-2" :style="{ color: tokens.colors.text.muted }">代码</div>
                <div class="px-4 py-2" :style="{ color: tokens.colors.text.muted }">名称</div>
                <div class="px-4 py-2 text-center" :style="{ color: tokens.colors.text.muted }">方向</div>
                <div class="px-4 py-2 text-center" :style="{ color: tokens.colors.text.muted }">评级</div>
                <div class="px-4 py-2 text-center" :style="{ color: tokens.colors.text.muted }">周期</div>
                <div class="px-4 py-2 text-center" :style="{ color: tokens.colors.text.muted }">计划</div>
                <div class="px-4 py-2 text-center" :style="{ color: tokens.colors.text.muted }">操作</div>
              </div>
              
              <!-- Empty State in Table Body -->
              <div class="py-20 flex flex-col items-center justify-center" :style="{ backgroundColor: tokens.colors.background.base }">
                <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :style="{ backgroundColor: tokens.colors.border.subtle }">
                  <svg class="w-8 h-8" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                  </svg>
                </div>
                <p class="text-sm font-medium mb-1" :style="{ color: tokens.colors.text.secondary }">暂无策略</p>
                <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">浏览市场机会或手动添加策略</p>
                <button 
                  class="px-4 py-2 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                >
                  + 添加策略
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 方案五：快速操作式 -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案五：快速操作式</h2>
            <p class="text-xs mt-0.5" :style="{ color: tokens.colors.text.muted }">内嵌搜索框，让用户可以直接开始操作</p>
          </div>
          <div class="p-8" :style="{ backgroundColor: tokens.colors.background.base }">
            <!-- Empty State Design 5 -->
            <div class="flex flex-col items-center justify-center py-16">
              <!-- Icon -->
              <div class="w-16 h-16 rounded-full flex items-center justify-center mb-6" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                <svg class="w-8 h-8" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              
              <h3 class="text-lg font-bold mb-2" :style="{ color: tokens.colors.text.primary }">添加您的第一个策略</h3>
              <p class="text-sm mb-6" :style="{ color: tokens.colors.text.muted }">搜索股票代码或名称开始</p>
              
              <!-- Search Box -->
              <div class="w-full max-w-md mb-6">
                <div 
                  class="flex items-center gap-3 px-4 py-3 border rounded-sm transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }"
                >
                  <svg class="w-5 h-5 shrink-0" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <input 
                    type="text" 
                    placeholder="搜索股票代码或名称，如 AAPL、苹果..."
                    class="flex-1 bg-transparent outline-none text-sm"
                    :style="{ color: tokens.colors.text.primary }"
                  />
                  <kbd 
                    class="px-2 py-0.5 text-[10px] rounded border"
                    :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                  >⌘K</kbd>
                </div>
              </div>
              
              <!-- Quick actions -->
              <div class="flex items-center gap-2 text-xs" :style="{ color: tokens.colors.text.muted }">
                <span>热门：</span>
                <button class="px-2 py-1 rounded-sm transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'" :style="{ color: tokens.colors.accent.primary }">NVDA</button>
                <button class="px-2 py-1 rounded-sm transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'" :style="{ color: tokens.colors.accent.primary }">AAPL</button>
                <button class="px-2 py-1 rounded-sm transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'" :style="{ color: tokens.colors.accent.primary }">TSLA</button>
                <button class="px-2 py-1 rounded-sm transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'" :style="{ color: tokens.colors.accent.primary }">MSFT</button>
              </div>
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
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

input::placeholder {
  color: v-bind('tokens.colors.text.muted');
}
</style>
