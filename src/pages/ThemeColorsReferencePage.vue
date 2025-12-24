<template>
  <div class="min-h-screen" :style="{ backgroundColor: currentBg }">
    <!-- Header -->
    <header class="border-b px-6 py-4 sticky top-0 z-50 backdrop-blur-sm" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface + 'f2' }">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
            <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">ScaleAlpha 主题颜色参考表</h1>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">Theme Colors Reference - 前端开发交付文档</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <ThemeToggle />
          <button 
            @click="copyAllColors"
            class="px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
          >
            复制全部 JSON
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-6 max-w-7xl mx-auto">
      
      <!-- 快速说明 -->
      <div class="mb-8 p-4 border rounded-sm" :style="{ borderColor: tokens.colors.accent.primary + '4D', backgroundColor: tokens.colors.accent.primary + '0D' }">
        <h2 class="text-sm font-bold mb-2 flex items-center gap-2" :style="{ color: tokens.colors.accent.primary }">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          使用说明
        </h2>
        <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.secondary }">
          本页面展示 ScaleAlpha 设计系统的完整颜色定义。当前显示的是 <strong :style="{ color: tokens.colors.accent.primary }">{{ isDark ? '夜间模式 (Dark)' : '日间模式 (Light)' }}</strong> 的颜色值。
          点击右上角切换按钮可预览另一模式。点击任意颜色值可复制到剪贴板。
        </p>
      </div>

      <!-- 对照表格 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- ===================== -->
        <!-- 背景色 Background -->
        <!-- ===================== -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">🎨 Background 背景色</h2>
            <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">4 层背景系统，从深到浅</p>
          </div>
          <div class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
            <ColorRow 
              v-for="(item, key) in backgroundColors" 
              :key="key"
              :name="key"
              :darkValue="darkTheme.colors.background[key]"
              :lightValue="lightTheme.colors.background[key]"
              :description="item.desc"
              :isDark="isDark"
              @copy="handleCopy"
            />
          </div>
        </section>

        <!-- ===================== -->
        <!-- 边框色 Border -->
        <!-- ===================== -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">📐 Border 边框色</h2>
            <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">4 层边框系统</p>
          </div>
          <div class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
            <ColorRow 
              v-for="(item, key) in borderColors" 
              :key="key"
              :name="key"
              :darkValue="darkTheme.colors.border[key]"
              :lightValue="lightTheme.colors.border[key]"
              :description="item.desc"
              :isDark="isDark"
              @copy="handleCopy"
            />
          </div>
        </section>

        <!-- ===================== -->
        <!-- 文字色 Text -->
        <!-- ===================== -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">📝 Text 文字颜色</h2>
            <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">5 层文字层级系统</p>
          </div>
          <div class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
            <ColorRow 
              v-for="(item, key) in textColors" 
              :key="key"
              :name="key"
              :darkValue="darkTheme.colors.text[key]"
              :lightValue="lightTheme.colors.text[key]"
              :description="item.desc"
              :isDark="isDark"
              @copy="handleCopy"
            />
          </div>
        </section>

        <!-- ===================== -->
        <!-- 语义色 Semantic -->
        <!-- ===================== -->
        <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">🚦 Semantic 语义颜色</h2>
            <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">成功/错误/警告/信息</p>
          </div>
          <div class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
            <ColorRow 
              v-for="(item, key) in semanticColors" 
              :key="key"
              :name="key"
              :darkValue="darkTheme.colors.semantic[key]"
              :lightValue="lightTheme.colors.semantic[key]"
              :description="item.desc"
              :isDark="isDark"
              @copy="handleCopy"
            />
          </div>
        </section>

      </div>

      <!-- ===================== -->
      <!-- 强调色 Accent - 完整表格 -->
      <!-- ===================== -->
      <section class="mt-6 border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">⚡ Accent 强调色</h2>
          <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">主要交互色、状态色完整定义</p>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr :style="{ backgroundColor: tokens.colors.background.elevated }">
                <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Token Name</th>
                <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">Dark Mode</th>
                <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-center" :style="{ color: tokens.colors.text.muted }">Light Mode</th>
                <th class="px-4 py-2 text-[10px] font-bold uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">用途说明</th>
              </tr>
            </thead>
            <tbody class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
              <tr v-for="(item, key) in accentColors" :key="key" class="hover:bg-white/5 transition-colors">
                <td class="px-4 py-2">
                  <code class="text-xs font-mono px-1.5 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.accent.primary }">{{ key }}</code>
                </td>
                <td class="px-4 py-2 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-6 h-6 rounded border" :style="{ backgroundColor: darkTheme.colors.accent[key], borderColor: tokens.colors.border.default }"></div>
                    <code 
                      class="text-[10px] font-mono cursor-pointer hover:underline"
                      :style="{ color: tokens.colors.text.secondary }"
                      @click="handleCopy(darkTheme.colors.accent[key])"
                    >{{ darkTheme.colors.accent[key] }}</code>
                  </div>
                </td>
                <td class="px-4 py-2 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-6 h-6 rounded border" :style="{ backgroundColor: lightTheme.colors.accent[key], borderColor: tokens.colors.border.default }"></div>
                    <code 
                      class="text-[10px] font-mono cursor-pointer hover:underline"
                      :style="{ color: tokens.colors.text.secondary }"
                      @click="handleCopy(lightTheme.colors.accent[key])"
                    >{{ lightTheme.colors.accent[key] }}</code>
                  </div>
                </td>
                <td class="px-4 py-2 text-xs" :style="{ color: tokens.colors.text.muted }">{{ item.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- ===================== -->
      <!-- 评级色 Grade -->
      <!-- ===================== -->
      <section class="mt-6 border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">🏆 Grade 评级专用色</h2>
          <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">策略评级 A/B/C</p>
        </div>
        <div class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
          <ColorRow 
            v-for="(item, key) in gradeColors" 
            :key="key"
            :name="'grade.' + key"
            :darkValue="darkTheme.colors.grade[key]"
            :lightValue="lightTheme.colors.grade[key]"
            :description="item.desc"
            :isDark="isDark"
            @copy="handleCopy"
          />
        </div>
      </section>

      <!-- ===================== -->
      <!-- 阴影 Shadows -->
      <!-- ===================== -->
      <section class="mt-6 border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">🌓 Shadows 阴影</h2>
          <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">3 层阴影系统 + 发光效果</p>
        </div>
        <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="(shadow, key) in { subtle: '微弱阴影', medium: '中等阴影', strong: '强烈阴影' }" :key="key">
            <div 
              class="h-20 rounded-sm flex items-center justify-center"
              :style="{ backgroundColor: tokens.colors.background.surface, boxShadow: tokens.shadows[key] }"
            >
              <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ key }}</span>
            </div>
            <p class="text-[10px] mt-2 text-center" :style="{ color: tokens.colors.text.muted }">{{ shadow }}</p>
            <code 
              class="block text-[9px] font-mono mt-1 text-center cursor-pointer hover:underline break-all"
              :style="{ color: tokens.colors.text.tertiary }"
              @click="handleCopy(isDark ? darkTheme.shadows[key] : lightTheme.shadows[key])"
            >{{ isDark ? darkTheme.shadows[key] : lightTheme.shadows[key] }}</code>
          </div>
        </div>
      </section>

      <!-- ===================== -->
      <!-- JSON 导出区域 -->
      <!-- ===================== -->
      <section class="mt-6 border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.accent.primary + '4D' }">
        <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary + '33' }">
          <div>
            <h2 class="text-sm font-bold" :style="{ color: tokens.colors.accent.primary }">📋 JSON 完整导出</h2>
            <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">可直接用于前端开发</p>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click="jsonView = 'dark'"
              class="px-2 py-1 text-[10px] font-bold uppercase rounded-sm transition-colors"
              :style="jsonView === 'dark' ? { backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base } : { color: tokens.colors.text.muted }"
            >Dark</button>
            <button 
              @click="jsonView = 'light'"
              class="px-2 py-1 text-[10px] font-bold uppercase rounded-sm transition-colors"
              :style="jsonView === 'light' ? { backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base } : { color: tokens.colors.text.muted }"
            >Light</button>
            <button 
              @click="jsonView = 'both'"
              class="px-2 py-1 text-[10px] font-bold uppercase rounded-sm transition-colors"
              :style="jsonView === 'both' ? { backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base } : { color: tokens.colors.text.muted }"
            >Both</button>
          </div>
        </div>
        <div class="p-4 overflow-x-auto" :style="{ backgroundColor: tokens.colors.background.base }">
          <pre 
            class="text-xs font-mono leading-relaxed cursor-pointer"
            :style="{ color: tokens.colors.text.secondary }"
            @click="copyJsonExport"
          ><code>{{ jsonExport }}</code></pre>
        </div>
      </section>

      <!-- 复制成功提示 -->
      <div 
        v-if="showCopyToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-sm text-sm font-medium z-50 transition-all"
        :style="{ backgroundColor: tokens.colors.semantic.success, color: '#fff' }"
      >
        ✓ 已复制到剪贴板
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { darkTheme, lightTheme } from '../design/themes'
import ThemeToggle from '../components/ThemeToggle.vue'

const { tokens, isDark } = useTheme()

const showCopyToast = ref(false)
const jsonView = ref('both')

const currentBg = computed(() => tokens.value.colors.background.base)

// 颜色定义和说明
const backgroundColors = {
  base: { desc: '页面最底层背景' },
  surface: { desc: '卡片、面板背景' },
  elevated: { desc: '悬浮元素、输入框背景' },
  overlay: { desc: '模态框、下拉菜单背景' },
}

const borderColors = {
  subtle: { desc: '最浅边框，分隔线' },
  default: { desc: '默认边框' },
  strong: { desc: '强调边框' },
  hover: { desc: '悬停状态边框' },
}

const textColors = {
  primary: { desc: '主要文字、标题' },
  secondary: { desc: '次要文字、正文' },
  tertiary: { desc: '辅助文字、时间戳' },
  muted: { desc: '弱化文字、占位符' },
  disabled: { desc: '禁用状态文字' },
}

const semanticColors = {
  success: { desc: '成功状态、LONG方向、涨幅' },
  error: { desc: '错误状态、SHORT方向、跌幅' },
  warning: { desc: '警告状态、待更新、重试' },
  info: { desc: '信息提示、B级评级' },
}

const accentColors = {
  primary: { desc: '主交互色（按钮、链接）' },
  primaryLight: { desc: '主色浅色变体' },
  primaryDark: { desc: '主色深色变体' },
  primaryBg: { desc: '主色背景（10%透明度）' },
  primaryBorder: { desc: '主色边框（30%透明度）' },
  success: { desc: '成功色主色' },
  successLight: { desc: '成功色浅色变体' },
  successDark: { desc: '成功色深色变体' },
  successBg: { desc: '成功色背景' },
  successBorder: { desc: '成功色边框' },
  warning: { desc: '警告色主色' },
  warningLight: { desc: '警告色浅色变体' },
  warningDark: { desc: '警告色深色变体' },
  warningBg: { desc: '警告色背景' },
  warningBorder: { desc: '警告色边框' },
  danger: { desc: '危险色主色' },
  dangerLight: { desc: '危险色浅色变体' },
  dangerDark: { desc: '危险色深色变体' },
  dangerBg: { desc: '危险色背景' },
  dangerBorder: { desc: '危险色边框' },
  info: { desc: '信息色主色' },
  infoLight: { desc: '信息色浅色变体' },
  infoDark: { desc: '信息色深色变体' },
  infoBg: { desc: '信息色背景' },
  infoBorder: { desc: '信息色边框' },
}

const gradeColors = {
  A: { desc: 'A级评级（最高）' },
  B: { desc: 'B级评级（良好）' },
  C: { desc: 'C级评级（一般）' },
}

// JSON 导出
const jsonExport = computed(() => {
  if (jsonView.value === 'dark') {
    return JSON.stringify(darkTheme.colors, null, 2)
  } else if (jsonView.value === 'light') {
    return JSON.stringify(lightTheme.colors, null, 2)
  } else {
    return JSON.stringify({ dark: darkTheme.colors, light: lightTheme.colors }, null, 2)
  }
})

// 复制功能
function handleCopy(value) {
  navigator.clipboard.writeText(value)
  showCopyToast.value = true
  setTimeout(() => { showCopyToast.value = false }, 2000)
}

function copyAllColors() {
  const data = JSON.stringify({ dark: darkTheme.colors, light: lightTheme.colors }, null, 2)
  navigator.clipboard.writeText(data)
  showCopyToast.value = true
  setTimeout(() => { showCopyToast.value = false }, 2000)
}

function copyJsonExport() {
  navigator.clipboard.writeText(jsonExport.value)
  showCopyToast.value = true
  setTimeout(() => { showCopyToast.value = false }, 2000)
}
</script>

<!-- ColorRow 子组件 -->
<script>
import { defineComponent, h } from 'vue'
import { useTheme } from '../composables/useTheme'

const ColorRow = defineComponent({
  name: 'ColorRow',
  props: {
    name: String,
    darkValue: String,
    lightValue: String,
    description: String,
    isDark: Boolean,
  },
  emits: ['copy'],
  setup(props, { emit }) {
    const { tokens } = useTheme()
    
    return () => h('div', { 
      class: 'px-4 py-3 flex items-center gap-4 hover:bg-white/5 transition-colors',
    }, [
      // Token 名称
      h('code', {
        class: 'text-xs font-mono px-1.5 py-0.5 rounded w-24 flex-shrink-0',
        style: { backgroundColor: tokens.value.colors.background.elevated, color: tokens.value.colors.accent.primary }
      }, props.name),
      
      // Dark 值
      h('div', { class: 'flex items-center gap-2 w-40 flex-shrink-0' }, [
        h('div', { 
          class: 'w-5 h-5 rounded border flex-shrink-0',
          style: { backgroundColor: props.darkValue, borderColor: tokens.value.colors.border.default }
        }),
        h('code', {
          class: 'text-[10px] font-mono cursor-pointer hover:underline',
          style: { color: props.isDark ? tokens.value.colors.text.primary : tokens.value.colors.text.muted },
          onClick: () => emit('copy', props.darkValue)
        }, props.darkValue)
      ]),
      
      // 箭头
      h('span', { 
        class: 'text-xs',
        style: { color: tokens.value.colors.text.disabled }
      }, '→'),
      
      // Light 值
      h('div', { class: 'flex items-center gap-2 w-40 flex-shrink-0' }, [
        h('div', { 
          class: 'w-5 h-5 rounded border flex-shrink-0',
          style: { backgroundColor: props.lightValue, borderColor: tokens.value.colors.border.default }
        }),
        h('code', {
          class: 'text-[10px] font-mono cursor-pointer hover:underline',
          style: { color: !props.isDark ? tokens.value.colors.text.primary : tokens.value.colors.text.muted },
          onClick: () => emit('copy', props.lightValue)
        }, props.lightValue)
      ]),
      
      // 描述
      h('span', {
        class: 'text-xs flex-grow',
        style: { color: tokens.value.colors.text.muted }
      }, props.description)
    ])
  }
})

export default {
  components: { ColorRow }
}
</script>
