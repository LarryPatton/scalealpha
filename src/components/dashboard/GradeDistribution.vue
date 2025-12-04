<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">🎯 策略评级分布</h3>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-label">总数</span>
          <span class="stat-value">{{ totalStrategies }}</span>
        </div>
        <div class="stat-divider">/</div>
        <div class="stat-item">
          <span class="stat-label">平均</span>
          <span class="stat-value primary">{{ avgGrade }}</span>
        </div>
        <div class="stat-divider">·</div>
        <div class="stat-item">
          <span class="stat-label">优质</span>
          <span class="stat-value">{{ highQualityCount }}</span>
        </div>
      </div>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

// Mock Data - 策略评级分布数据（蓝色渐变）
const gradeData = [
  { grade: 'A+', count: 18, color: '#3b82f6' },
  { grade: 'A', count: 12, color: '#60a5fa' },
  { grade: 'A-', count: 7, color: '#2563eb' },
  { grade: 'B+', count: 4, color: '#93c5fd' },
  { grade: 'B', count: 2, color: '#1d4ed8' }
]

const totalStrategies = computed(() => {
  return gradeData.reduce((sum, item) => sum + item.count, 0)
})

const highQualityCount = computed(() => {
  // A+ 和 A 级别的策略
  return gradeData.slice(0, 2).reduce((sum, item) => sum + item.count, 0)
})

const avgGrade = ref('A')

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const grades = gradeData.map(d => d.grade)
  const counts = gradeData.map(d => d.count)
  const colors = gradeData.map(d => d.color)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '8%',
      right: '5%',
      bottom: '8%',
      top: '10%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(26, 26, 26, 0.98)',
      borderColor: '#3b82f6',
      borderWidth: 1,
      borderRadius: 6,
      padding: 8,
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(59, 130, 246, 0.1)'
        }
      },
      formatter: (params) => {
        const data = params[0]
        const count = data.value
        const percent = ((count / totalStrategies.value) * 100).toFixed(0)
        
        return `
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">${data.name} 级</div>
            <div style="color: #3b82f6;">${count} 个 (${percent}%)</div>
          </div>
        `
      }
    },
    xAxis: {
      type: 'category',
      data: grades,
      axisLine: {
        lineStyle: {
          color: '#333',
          width: 1
        }
      },
      axisLabel: {
        color: '#999',
        fontSize: 12,
        fontWeight: 600
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 10
      },
      splitLine: {
        lineStyle: {
          color: '#2a2a2a',
          type: 'solid',
          width: 1
        }
      }
    },
    series: [
      {
        name: '策略数量',
        type: 'bar',
        barWidth: '45%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: (params) => {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colors[params.dataIndex] },
              { offset: 1, color: colors[params.dataIndex] + '60' }
            ])
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(59, 130, 246, 0.5)'
          }
        },
        label: {
          show: true,
          position: 'top',
          color: '#999',
          fontSize: 11,
          fontWeight: 600
        },
        data: counts
      }
    ]
  }

  chartInstance.setOption(option)

  // 添加点击事件
  chartInstance.on('click', (params) => {
    console.log('点击了评级:', params.name, '数量:', params.value)
    // 这里可以跳转到对应评级的策略列表页
  })
}

const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

onMounted(() => {
  initChart()
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
  margin-bottom: 0.5rem;
}

.stats-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.75rem;
}

.stat-item {
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-weight: 600;
  color: #999;
}

.stat-value.primary {
  color: #3b82f6;
}

.stat-divider {
  color: #444;
}

.chart {
  flex: 1;
  width: 100%;
  min-height: 0;
}
</style>
