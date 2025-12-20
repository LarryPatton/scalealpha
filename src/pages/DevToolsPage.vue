<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Header -->
    <header class="border-b sticky top-0 z-50 backdrop-blur-xl" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface + 'f0' }">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <router-link to="/home" class="flex items-center gap-2 text-sm transition-colors" :style="{ color: tokens.colors.text.muted }">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            返回首页
          </router-link>
          <div class="w-px h-5" :style="{ backgroundColor: tokens.colors.border.default }"></div>
          <h1 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">🛠️ Dev Tools</h1>
          <span class="text-xs px-2 py-1 rounded-full font-medium" :style="{ backgroundColor: tokens.colors.accent.warningBg, color: tokens.colors.accent.warning }">Internal Only</span>
        </div>
        <button @click="toggleTheme" class="p-2 rounded-lg border transition-colors" :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">
          {{ isDark ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Quick Stats -->
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ devPages.length }}</div>
          <div class="text-xs" :style="{ color: tokens.colors.text.muted }">开发页面</div>
        </div>
        <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">53+</div>
          <div class="text-xs" :style="{ color: tokens.colors.text.muted }">UI 组件</div>
        </div>
        <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">2</div>
          <div class="text-xs" :style="{ color: tokens.colors.text.muted }">主题模式</div>
        </div>
        <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="text-2xl font-bold" :style="{ color: tokens.colors.accent.success }">✓</div>
          <div class="text-xs" :style="{ color: tokens.colors.text.muted }">设计系统</div>
        </div>
      </div>

      <!-- Categories -->
      <div v-for="category in categories" :key="category.name" class="mb-10">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <span>{{ category.icon }}</span>
          {{ category.name }}
          <span class="text-xs font-normal px-2 py-0.5 rounded-full" :style="{ backgroundColor: tokens.colors.border.subtle, color: tokens.colors.text.muted }">{{ category.pages.length }}</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link
            v-for="page in category.pages"
            :key="page.path"
            :to="page.path"
            class="group p-5 rounded-xl border transition-all hover:shadow-lg"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div class="flex items-start justify-between mb-3">
              <span class="text-2xl">{{ page.icon }}</span>
              <span class="text-xs px-2 py-1 rounded-full transition-colors" 
                :style="{ backgroundColor: tokens.colors.border.subtle, color: tokens.colors.text.muted }"
                :class="{ 'group-hover:bg-cyan-500/20 group-hover:text-cyan-400': true }">
                {{ page.tag }}
              </span>
            </div>
            <h3 class="font-bold mb-1 transition-colors" :style="{ color: tokens.colors.text.primary }" :class="{ 'group-hover:text-cyan-400': isDark, 'group-hover:text-cyan-600': !isDark }">
              {{ page.name }}
            </h3>
            <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.muted }">{{ page.description }}</p>
            <div class="mt-3 flex items-center gap-1 text-xs transition-colors" :style="{ color: tokens.colors.text.disabled }">
              <span class="font-mono">{{ page.path }}</span>
              <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Core Pages Reference -->
      <div class="mt-12 p-6 rounded-xl border" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
        <h2 class="text-lg font-bold mb-4 flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <span>🎯</span> 核心业务页面参考
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <router-link
            v-for="page in corePages"
            :key="page.path"
            :to="page.path"
            class="p-3 rounded-lg border text-center transition-all hover:border-cyan-500/50"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }"
          >
            <div class="text-xl mb-1">{{ page.icon }}</div>
            <div class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ page.name }}</div>
          </router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t mt-12 py-6" :style="{ borderColor: tokens.colors.border.default }">
      <div class="max-w-7xl mx-auto px-6 text-center text-xs" :style="{ color: tokens.colors.text.disabled }">
        ScaleAlpha Dev Tools · Internal Use Only · {{ new Date().getFullYear() }}
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, tokens, toggleTheme } = useTheme()

const devPages = [
  { path: '/dev/components', name: 'UI Components', icon: '🧩', tag: 'Core', description: '完整的 UI 组件库，包含 53+ 组件，支持深色/浅色双主题预览' },
  { path: '/dev/design-system', name: 'Design System', icon: '🎨', tag: 'Core', description: '设计系统文档，包含颜色、字体、间距等设计规范' },
  { path: '/dev/card-design', name: 'Card Design', icon: '🃏', tag: 'Design', description: '卡片组件设计稿，各种卡片样式探索' },
  { path: '/dev/theme-viz', name: 'Theme Visualization', icon: '📊', tag: 'Design', description: '主题可视化设计，图表和数据展示' },
  { path: '/dev/timeline', name: 'Timeline Design', icon: '📅', tag: 'Design', description: '时间线组件设计，事件流展示' },
  { path: '/dev/analysis', name: 'Analysis Design', icon: '🔬', tag: 'Design', description: '分析页面设计，数据分析界面' },
  { path: '/dev/theme-cards', name: 'Theme Card Variations', icon: '🎴', tag: 'Design', description: '主题卡片变体，多种卡片风格' },
  { path: '/dev/opportunity-cards', name: 'Opportunity Card Design', icon: '💡', tag: 'Design', description: '机会卡片设计，投资机会展示' },
  { path: '/dev/flow', name: 'Flow Design', icon: '🌊', tag: 'Design', description: '流程设计，用户操作流程' },
  { path: '/dev/lifecycle', name: 'Themes Lifecycle', icon: '🔄', tag: 'Design', description: '主题生命周期，状态变化展示' },
  { path: '/dev/plan-status', name: 'Plan Status Demo', icon: '📋', tag: 'Demo', description: '计划状态演示，状态组件展示' },
]

const categories = computed(() => [
  {
    name: '核心工具',
    icon: '⚡',
    pages: devPages.filter(p => p.tag === 'Core')
  },
  {
    name: '设计探索',
    icon: '✏️',
    pages: devPages.filter(p => p.tag === 'Design')
  },
  {
    name: '演示页面',
    icon: '🎬',
    pages: devPages.filter(p => p.tag === 'Demo')
  }
])

const corePages = [
  { path: '/opportunityB?tab=mystrategy', name: '我的策略', icon: '📁' },
  { path: '/opportunityB?tab=generate', name: '生成策略', icon: '✨' },
  { path: '/infoB?tab=opportunities', name: '机会发现', icon: '🎯' },
  { path: '/infoB?tab=themes', name: '主题追踪', icon: '📈' },
  { path: '/infoB?tab=attribution', name: '事件归因', icon: '🔗' },
  { path: '/revenueB', name: '收益概览', icon: '💰' },
]
</script>
