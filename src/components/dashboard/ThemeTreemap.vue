<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">📦 股票主题分布</h3>
      <p class="chart-subtitle">共追踪 {{ totalStocks }} 只股票，分布于 {{ totalThemes }} 个主题</p>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const totalStocks = ref(109)
const totalThemes = ref(8)

// Mock Data - 股票主题分布数据（蓝色渐变配色）
const themeData = [
  { 
    name: 'AI科技', 
    value: 35, 
    itemStyle: { color: '#3b82f6' }
  },
  { 
    name: '半导体', 
    value: 18, 
    itemStyle: { color: '#60a5fa' }
  },
  { 
    name: '金融科技', 
    value: 15, 
    itemStyle: { color: '#2563eb' }
  },
  { 
    name: '新能源', 
    value: 12, 
    itemStyle: { color: '#1d4ed8' }
  },
  { 
    name: '生物医疗', 
    value: 9, 
    itemStyle: { color: '#93c5fd' }
  },
  { 
    name: '消费品', 
    value: 8, 
    itemStyle: { color: '#1e40af' }
  },
  { 
    name: '云计算', 
    value: 7, 
    itemStyle: { color: '#6366f1' }
  },
  { 
    name: '网络安全', 
    value: 5, 
    itemStyle: { color: '#4f46e5' }
  }
]

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26, 26, 26, 0.98)',
      borderColor: '#3b82f6',
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      formatter: (params) => {
        return `
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
            <div style="color: #3b82f6;">${params.value} 只 (${((params.value / totalStocks.value) * 100).toFixed(1)}%)</div>
          </div>
        `
      }
    },
    series: [
      {
        type: 'treemap',
        roam: false,
        nodeClick: 'link',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        breadcrumb: {
          show: false
        },
        label: {
          show: true,
          formatter: (params) => {
            return `{name|${params.name}}\n{value|${params.value}}`
          },
          rich: {
            name: {
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              lineHeight: 18
            },
            value: {
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 16
            }
          }
        },
        upperLabel: {
          show: false
        },
        itemStyle: {
          borderColor: 'rgba(0, 0, 0, 0.4)',
          borderWidth: 1,
          gapWidth: 2,
          borderRadius: 6
        },
        emphasis: {
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 2,
            shadowBlur: 10,
            shadowColor: 'rgba(59, 130, 246, 0.5)'
          },
          label: {
            fontSize: 14,
            fontWeight: 600
          }
        },
        levels: [
          {
            itemStyle: {
              borderWidth: 3,
              gapWidth: 3
            }
          }
        ],
        data: themeData
      }
    ]
  }

  chartInstance.setOption(option)

  // 添加点击事件
  chartInstance.on('click', (params) => {
    console.log('点击了主题:', params.name, '包含', params.value, '只股票')
    // 这里可以跳转到对应主题详情页
  })
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  initChart()
  // 初始化后立即resize确保正确渲染
  setTimeout(() => {
    resizeChart()
  }, 100)
  window.addEventListener('resize', resizeChart)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})
</script>

<style scoped>
.chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #333;
}

.chart-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #999;
  margin-bottom: 0.25rem;
}

.chart-subtitle {
  font-size: 0.75rem;
  color: #666;
}

.chart {
  flex: 1;
  width: 100%;
  min-height: 0;
}
</style>
