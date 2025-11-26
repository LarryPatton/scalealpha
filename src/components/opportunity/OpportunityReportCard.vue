<template>
  <div 
    @click="$emit('click', report)"
    :class="[
      'group relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden shadow-lg',
      isSelected 
        ? 'border-blue-500 shadow-blue-500/30' 
        : 'border-[#404040] hover:border-blue-500 hover:shadow-blue-500/20'
    ]"
  >
    <!-- Selection Checkbox (only if not showDelete) -->
    <div 
      v-if="!showDelete"
      @click.stop="$emit('toggle-select')"
      class="absolute top-4 right-4 z-10"
    >
      <div 
        :class="[
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
          isSelected 
            ? 'bg-blue-500 border-blue-500' 
            : 'bg-transparent border-gray-500 hover:border-blue-400'
        ]"
      >
        <svg 
          v-if="isSelected"
          class="w-3 h-3 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>

    <!-- Delete Button (only if showDelete) -->
    <button
      v-if="showDelete"
      @click.stop="$emit('delete')"
      class="absolute top-4 right-4 z-10 w-8 h-8 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      title="删除报告"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
    </button>
  
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="relative p-6">
      <!-- Header: Stock Symbol + Generated Time -->
      <div class="flex items-start justify-between mb-5 pr-6">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span class="text-blue-400 font-bold text-lg font-mono">{{ report.symbol }}</span>
            </div>
            <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
              推荐买入
            </span>
          </div>
          <div class="text-sm text-gray-400">{{ report.stockName }}</div>
        </div>
        
        <!-- Score Badge -->
        <div class="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span class="text-green-400 font-semibold text-sm">{{ report.score }}</span>
        </div>
      </div>

      <!-- Key Metrics Grid (2x2) -->
      <div class="grid grid-cols-2 gap-4 mb-5">
        <!-- Analysis Framework -->
        <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
          <div class="text-xs text-gray-500 mb-2">主要分析框架</div>
          <div class="text-white font-semibold">{{ getFrameworkLabel(report.framework) }}</div>
        </div>

        <!-- Time Period -->
        <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
          <div class="text-xs text-gray-500 mb-2">时间区间</div>
          <div class="text-white font-semibold">{{ getPeriodLabel(report.period) }}</div>
        </div>

        <!-- Risk Level -->
        <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
          <div class="text-xs text-gray-500 mb-2">风险等级</div>
          <div 
            :class="[
              'font-semibold',
              report.risk === 'extreme' ? 'text-red-400' : 
              report.risk === 'high' ? 'text-orange-400' : 
              report.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
            ]"
          >
            {{ getRiskLabel(report.risk) }}
          </div>
        </div>

        <!-- Risk-Reward Ratio -->
        <div class="bg-[#1a1a1a] border border-[#404040] rounded-lg p-4">
          <div class="text-xs text-gray-500 mb-2">收益风险比</div>
          <div class="text-green-400 font-semibold text-lg">{{ report.riskRewardRatio }}</div>
        </div>
      </div>

      <!-- Expected Return Highlight -->
      <div class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 mb-5">
        <div class="flex items-center justify-between">
          <span class="text-gray-300 text-sm">预期收益</span>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-bold text-green-400">+{{ report.expectedReturn }}%</span>
          </div>
        </div>
      </div>

      <!-- Price Information -->
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div class="bg-[#1a1a1a] rounded-lg p-3">
          <div class="text-xs text-gray-500 mb-1">入场价格</div>
          <div class="text-white font-semibold">${{ report.entryPrice }}</div>
        </div>
        <div class="bg-[#1a1a1a] rounded-lg p-3">
          <div class="text-xs text-gray-500 mb-1">目标价格</div>
          <div class="text-green-400 font-semibold">${{ report.targetPrice }}</div>
        </div>
      </div>

      <!-- Footer: Generated Time + Action -->
      <div class="flex items-center justify-between pt-4 border-t border-[#404040]">
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ formatTime(report.generatedAt) }}</span>
        </div>
        
        <button class="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors flex items-center gap-1">
          <span>查看详情</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Hover Glow Effect -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  report: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  showDelete: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click', 'toggle-select', 'delete'])

const getFrameworkLabel = (value) => {
  const labels = {
    'all': '全部框架',
    'technical': '技术分析',
    'fundamental': '基本面分析',
    'quantitative': '量化分析',
    'event': '事件驱动',
    'market': '商业分析',
    'momentum': '趋势分析',
    'alternative': '另类数据'
  }
  return labels[value] || value
}

const getPeriodLabel = (value) => {
  const labels = {
    '1d-5d': '短期 (1-5天)',
    '1d-1m': '短中期 (1天-1个月)',
    '1m-6m': '中长期 (1-6个月)',
    '6m+': '长期 (6个月+)'
  }
  return labels[value] || value
}

const getRiskLabel = (value) => {
  const labels = {
    'extreme': '极高',
    'high': '高',
    'medium': '中等',
    'low': '低'
  }
  return labels[value] || value
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚生成'
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}
</script>
