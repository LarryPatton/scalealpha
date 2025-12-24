<template>
  <div class="min-h-screen p-8" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-8">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">分区标题样式对比</h1>
          <p class="text-sm mt-1" :style="{ color: tokens.colors.text.muted }">策略配置页面 - 标题优化方案预览</p>
        </div>
        <ThemeToggle />
      </div>
      
      <!-- 当前问题说明 -->
      <div class="p-4 border rounded-lg mb-6" :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', borderColor: tokens.colors.semantic.warning + '4D' }">
        <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">
          <span class="font-bold" :style="{ color: tokens.colors.semantic.warning }">当前问题：</span>
          分区标题（分析框架、投资周期、风险偏好、个人洞察）使用 <code class="px-1 py-0.5 rounded text-xs" :style="{ backgroundColor: tokens.colors.background.elevated }">text-xs text-gray-400</code>，字号小、颜色浅，视觉层级不明显。
        </p>
      </div>
    </div>

    <!-- 方案对比区 -->
    <div class="max-w-6xl mx-auto grid grid-cols-2 gap-6">
      
      <!-- ===================== -->
      <!-- 当前样式 (对照组) -->
      <!-- ===================== -->
      <div class="border rounded-lg overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.text.muted + '33', color: tokens.colors.text.muted }">当前</span>
            <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">现有样式</span>
          </div>
          <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">text-xs + text-gray-400 + 6px圆点</p>
        </div>
        <div class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.base }">
          <!-- 模拟卡片区域 -->
          <div v-for="section in sections" :key="'current-' + section.id">
            <!-- 当前标题样式 -->
            <h3 class="text-xs font-bold text-gray-400 mb-1.5 flex items-center gap-2 uppercase tracking-wider">
              <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: section.color }"></span>
              {{ section.title }}
            </h3>
            <!-- 模拟卡片 -->
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="p-3 border rounded-lg" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
                <div class="w-full h-2 rounded mb-2" :style="{ backgroundColor: tokens.colors.text.muted + '33' }"></div>
                <div class="w-2/3 h-2 rounded" :style="{ backgroundColor: tokens.colors.text.muted + '22' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== -->
      <!-- 方案 A: 增强对比度 -->
      <!-- ===================== -->
      <div class="border rounded-lg overflow-hidden" :style="{ borderColor: tokens.colors.accent.primary + '66' }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.accent.primary + '1A', borderColor: tokens.colors.accent.primary + '33' }">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }">推荐</span>
            <span class="text-sm font-bold" :style="{ color: tokens.colors.accent.primary }">方案 A：增强对比度</span>
          </div>
          <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">text-sm + text-gray-300 + 8px圆点 + 更大间距</p>
        </div>
        <div class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.base }">
          <div v-for="section in sections" :key="'a-' + section.id">
            <!-- 方案A标题样式 -->
            <h3 class="text-sm font-bold mb-2 flex items-center gap-2 uppercase tracking-wider" :style="{ color: isDark ? '#d1d5db' : '#374151' }">
              <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: section.color }"></span>
              {{ section.title }}
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="p-3 border rounded-lg" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
                <div class="w-full h-2 rounded mb-2" :style="{ backgroundColor: tokens.colors.text.muted + '33' }"></div>
                <div class="w-2/3 h-2 rounded" :style="{ backgroundColor: tokens.colors.text.muted + '22' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== -->
      <!-- 方案 B: 左边框装饰 -->
      <!-- ===================== -->
      <div class="border rounded-lg overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.accent.info + '33', color: tokens.colors.accent.info }">备选</span>
            <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案 B：左边框装饰</span>
          </div>
          <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">text-sm + 左侧2px竖条 + 无圆点</p>
        </div>
        <div class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.base }">
          <div v-for="section in sections" :key="'b-' + section.id">
            <!-- 方案B标题样式 -->
            <h3 class="text-sm font-bold mb-2 flex items-center gap-2 pl-2.5 border-l-2 uppercase tracking-wider" :style="{ color: isDark ? '#d1d5db' : '#374151', borderColor: section.color }">
              {{ section.title }}
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="p-3 border rounded-lg" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
                <div class="w-full h-2 rounded mb-2" :style="{ backgroundColor: tokens.colors.text.muted + '33' }"></div>
                <div class="w-2/3 h-2 rounded" :style="{ backgroundColor: tokens.colors.text.muted + '22' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== -->
      <!-- 方案 C: 彩色标题文字 -->
      <!-- ===================== -->
      <div class="border rounded-lg overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <div class="px-4 py-3 border-b" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.accent.success + '33', color: tokens.colors.accent.success }">备选</span>
            <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">方案 C：彩色标题文字</span>
          </div>
          <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">text-sm + 标题文字使用主题色 + 8px圆点</p>
        </div>
        <div class="p-4 space-y-4" :style="{ backgroundColor: tokens.colors.background.base }">
          <div v-for="section in sections" :key="'c-' + section.id">
            <!-- 方案C标题样式 -->
            <h3 class="text-sm font-bold mb-2 flex items-center gap-2 uppercase tracking-wider">
              <span class="w-2 h-2 rounded-full" :style="{ backgroundColor: section.color }"></span>
              <span :style="{ color: section.color }">{{ section.title }}</span>
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <div v-for="i in 3" :key="i" class="p-3 border rounded-lg" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
                <div class="w-full h-2 rounded mb-2" :style="{ backgroundColor: tokens.colors.text.muted + '33' }"></div>
                <div class="w-2/3 h-2 rounded" :style="{ backgroundColor: tokens.colors.text.muted + '22' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 详细对比表格 -->
    <div class="max-w-6xl mx-auto mt-8">
      <h2 class="text-lg font-bold mb-4" :style="{ color: tokens.colors.text.primary }">📊 样式参数对比</h2>
      <div class="border rounded-lg overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
        <table class="w-full">
          <thead>
            <tr :style="{ backgroundColor: tokens.colors.background.surface }">
              <th class="px-4 py-3 text-left text-xs font-bold uppercase" :style="{ color: tokens.colors.text.muted }">参数</th>
              <th class="px-4 py-3 text-center text-xs font-bold uppercase" :style="{ color: tokens.colors.text.muted }">当前</th>
              <th class="px-4 py-3 text-center text-xs font-bold uppercase" :style="{ color: tokens.colors.accent.primary }">方案 A</th>
              <th class="px-4 py-3 text-center text-xs font-bold uppercase" :style="{ color: tokens.colors.text.muted }">方案 B</th>
              <th class="px-4 py-3 text-center text-xs font-bold uppercase" :style="{ color: tokens.colors.text.muted }">方案 C</th>
            </tr>
          </thead>
          <tbody class="divide-y" :style="{ divideColor: tokens.colors.border.subtle }">
            <tr v-for="row in comparisonTable" :key="row.param">
              <td class="px-4 py-2 text-sm font-medium" :style="{ color: tokens.colors.text.secondary }">{{ row.param }}</td>
              <td class="px-4 py-2 text-center">
                <code class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }">{{ row.current }}</code>
              </td>
              <td class="px-4 py-2 text-center" :style="{ backgroundColor: tokens.colors.accent.primary + '0D' }">
                <code class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary }">{{ row.optionA }}</code>
              </td>
              <td class="px-4 py-2 text-center">
                <code class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary }">{{ row.optionB }}</code>
              </td>
              <td class="px-4 py-2 text-center">
                <code class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.secondary }">{{ row.optionC }}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 选择提示 -->
    <div class="max-w-6xl mx-auto mt-6 p-4 border rounded-lg" :style="{ backgroundColor: tokens.colors.accent.primary + '0D', borderColor: tokens.colors.accent.primary + '33' }">
      <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">
        <span class="font-bold" :style="{ color: tokens.colors.accent.primary }">💡 建议：</span>
        方案 A 改动最小，效果明显，推荐优先尝试。如需更强烈的视觉区分，可选择方案 B 或 C。
      </p>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import ThemeToggle from '../components/ThemeToggle.vue'

const { tokens, isDark } = useTheme()

// 四个分区标题
const sections = [
  { id: 'framework', title: '分析框架', color: '#06b6d4' },  // cyan
  { id: 'period', title: '投资周期', color: '#3b82f6' },     // blue
  { id: 'risk', title: '风险偏好', color: '#f97316' },       // orange
  { id: 'insight', title: '个人洞察', color: '#a855f7' },    // purple
]

// 对比表格数据
const comparisonTable = [
  { param: '字号', current: 'text-xs (12px)', optionA: 'text-sm (14px)', optionB: 'text-sm (14px)', optionC: 'text-sm (14px)' },
  { param: '文字颜色', current: 'gray-400', optionA: 'gray-300', optionB: 'gray-300', optionC: '主题色' },
  { param: '圆点尺寸', current: '6px', optionA: '8px', optionB: '无', optionC: '8px' },
  { param: '装饰元素', current: '圆点', optionA: '圆点', optionB: '左边框', optionC: '圆点+彩色文字' },
  { param: '底部间距', current: 'mb-1.5', optionA: 'mb-2', optionB: 'mb-2', optionC: 'mb-2' },
  { param: '改动量', current: '-', optionA: '4处', optionB: '4处', optionC: '8处' },
]
</script>
