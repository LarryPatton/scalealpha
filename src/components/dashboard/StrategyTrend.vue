<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">📈 策略方向趋势</h3>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-label">看多</span>
          <span class="stat-value">{{ todayLong }}</span>
        </div>
        <div class="stat-divider">/</div>
        <div class="stat-item">
          <span class="stat-label">看空</span>
          <span class="stat-value">{{ todayShort }}</span>
        </div>
        <div class="stat-divider">·</div>
        <div class="stat-item">
          <span class="stat-label">占比</span>
          <span class="stat-value primary">{{ longRatio }}%</span>
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

// Mock Data - 策略趋势数据（最近7天）
const trendData = [
  { date: '12/18', long: 15, short: 25 },
  { date: '12/19', long: 18, short: 22 },
  { date: '12/20', long: 20, short: 20 },
  { date: '12/21', long: 22, short: 18 },
  { date: '12/22', long: 24, short: 16 },
  { date: '12/23', long: 26, short: 14 },
  { date: '今天', long: 28, short: 12 }
]

const todayLong = computed(() => trendData[trendData.length - 1].long)
const todayShort = computed(() => trendData[trendData.length - 1].short)
const longRatio = computed(() => {
  const total = todayLong.value + todayShort.value
  return ((todayLong.value / total) * 100).toFixed(0)
})

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)

  const dates = trendData.map(d => d.date)
  const longData = trendData.map(d => d.long)
  const shortData = trendData.map(d => d.short)

  const option = {
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '5%',
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
        type: 'line',
        lineStyle: {
          color: '#3b82f6',
          width: 1,
          type: 'solid'
        }
      },
      formatter: (params) => {
        const date = params[0].name
        const long = params[0].value
        const short = params[1].value
        const total = long + short
        const longPercent = ((long / total) * 100).toFixed(0)
        
        return `
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">${date}</div>
            <div style="color: #3b82f6;">看多: ${long} (${longPercent}%) / 看空: ${short}</div>
          </div>
        `
      }
    },
    legend: {
      show: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#333',
          width: 1
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 10
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
        name: '看多',
        type: 'line',
        stack: 'total',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ])
        },
        lineStyle: {
          color: '#3b82f6',
          width: 1.5
        },
        itemStyle: {
          color: '#3b82f6'
        },
        symbol: 'circle',
        symbolSize: 4,
        data: longData
      },
      {
        name: '看空',
        type: 'line',
        stack: 'total',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(96, 165, 250, 0.2)' },
            { offset: 1, color: 'rgba(96, 165, 250, 0.02)' }
          ])
        },
        lineStyle: {
          color: '#60a5fa',
          width: 1.5
        },
        itemStyle: {
          color: '#60a5fa'
        },
        symbol: 'circle',
        symbolSize: 4,
        data: shortData
      }
    ]
  }

  chartInstance.setOption(option)
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
