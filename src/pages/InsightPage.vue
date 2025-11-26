<template>
  <div class="min-h-screen bg-[#1a1a1a] py-8">
    <div class="max-w-6xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">投资洞察与报告</h1>
        <p class="text-gray-400">基于您的投资组合生成的个性化分析报告</p>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-1">总资产价值</div>
          <div class="text-2xl font-bold text-white">$125,430</div>
          <div class="text-green-400 text-sm mt-1">+12.3%</div>
        </div>
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-1">年化收益率</div>
          <div class="text-2xl font-bold text-white">18.5%</div>
          <div class="text-green-400 text-sm mt-1">超越基准 +5.2%</div>
        </div>
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-1">夏普比率</div>
          <div class="text-2xl font-bold text-white">1.85</div>
          <div class="text-blue-400 text-sm mt-1">优秀</div>
        </div>
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <div class="text-gray-400 text-sm mb-1">最大回撤</div>
          <div class="text-2xl font-bold text-white">-8.2%</div>
          <div class="text-yellow-400 text-sm mt-1">控制良好</div>
        </div>
      </div>

      <!-- Portfolio Analysis -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Asset Allocation -->
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">资产配置</h3>
          <div class="space-y-3">
            <div v-for="asset in assetAllocation" :key="asset.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-300">{{ asset.name }}</span>
                <span class="text-white font-medium">{{ asset.percentage }}%</span>
              </div>
              <div class="w-full bg-[#1f1f1f] rounded-full h-2">
                <div 
                  :class="`h-2 rounded-full ${asset.color}`"
                  :style="{ width: `${asset.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Risk Analysis -->
        <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
          <h3 class="text-lg font-semibold text-white mb-4">风险分析</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">波动率</span>
                <span class="text-white">12.5%</span>
              </div>
              <div class="text-xs text-gray-500">低于市场平均水平</div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">Beta系数</span>
                <span class="text-white">0.85</span>
              </div>
              <div class="text-xs text-gray-500">防御性组合</div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">相关性</span>
                <span class="text-white">0.72</span>
              </div>
              <div class="text-xs text-gray-500">与市场中度相关</div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Insights -->
      <div class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-8">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-white mb-2">AI 投资建议</h3>
            <div class="space-y-2 text-gray-300 text-sm">
              <p>✓ 您的投资组合配置较为均衡，风险控制良好</p>
              <p>✓ 建议适当增加科技股占比，当前仅占15%，可提升至20-25%</p>
              <p>✓ 考虑加入国际市场ETF以提高分散化程度</p>
              <p>⚠️ 部分持仓估值偏高，建议定期审视并适时调整</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Holdings -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold text-white mb-4">前10大持仓</h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b border-[#404040]">
              <tr class="text-left text-sm text-gray-400">
                <th class="pb-3">标的</th>
                <th class="pb-3">持仓</th>
                <th class="pb-3">成本</th>
                <th class="pb-3">现价</th>
                <th class="pb-3">盈亏</th>
                <th class="pb-3">占比</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="holding in topHoldings" :key="holding.symbol" class="border-b border-[#333] hover:bg-[#333] transition-colors">
                <td class="py-3">
                  <div class="font-medium text-white">{{ holding.symbol }}</div>
                  <div class="text-xs text-gray-400">{{ holding.name }}</div>
                </td>
                <td class="py-3 text-gray-300">{{ holding.shares }}</td>
                <td class="py-3 text-gray-300">${{ holding.cost }}</td>
                <td class="py-3 text-white">${{ holding.price }}</td>
                <td class="py-3" :class="holding.profit >= 0 ? 'text-green-400' : 'text-red-400'">
                  {{ holding.profit >= 0 ? '+' : '' }}{{ holding.profit.toFixed(2) }}%
                </td>
                <td class="py-3 text-gray-300">{{ holding.weight }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-between items-center">
        <button
          @click="downloadReport"
          class="flex items-center gap-2 px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-white rounded-lg transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          下载PDF报告
        </button>
        
        <button
          @click="refreshData"
          class="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/50"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
          刷新数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWorkflowProgress } from '../composables/useWorkflowProgress'

const { updateProgress } = useWorkflowProgress()

// 标记用户已查看洞察报告
updateProgress('hasViewedInsight', true)

const assetAllocation = ref([
  { name: '美股ETF', percentage: 40, color: 'bg-blue-500' },
  { name: '科技股', percentage: 25, color: 'bg-purple-500' },
  { name: '债券基金', percentage: 20, color: 'bg-green-500' },
  { name: '现金', percentage: 10, color: 'bg-gray-500' },
  { name: '其他', percentage: 5, color: 'bg-yellow-500' }
])

const topHoldings = ref([
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 100, cost: 150.00, price: 178.50, profit: 19.0, weight: 12.5 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 75, cost: 320.00, price: 385.20, profit: 20.4, weight: 10.8 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 50, cost: 480.00, price: 785.40, profit: 63.6, weight: 9.2 },
  { symbol: 'VOO', name: 'Vanguard S&P 500', shares: 200, cost: 380.00, price: 425.30, profit: 11.9, weight: 8.5 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 60, cost: 125.00, price: 142.80, profit: 14.2, weight: 7.3 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 40, cost: 145.00, price: 168.50, profit: 16.2, weight: 6.8 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 30, cost: 220.00, price: 185.00, profit: -15.9, weight: 5.2 },
  { symbol: 'META', name: 'Meta Platforms', shares: 25, cost: 310.00, price: 458.30, profit: 47.8, weight: 4.9 },
  { symbol: 'BND', name: 'Vanguard Bond ETF', shares: 150, cost: 72.00, price: 71.20, profit: -1.1, weight: 4.5 },
  { symbol: 'VTI', name: 'Vanguard Total Market', shares: 100, cost: 210.00, price: 238.50, profit: 13.6, weight: 4.3 }
])

const downloadReport = () => {
  alert('PDF报告生成功能即将推出！')
}

const refreshData = () => {
  alert('正在刷新数据...')
  // 这里可以添加实际的数据刷新逻辑
}
</script>
