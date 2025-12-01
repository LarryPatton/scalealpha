<template>
  <div class="bg-[#1a1a1a] min-h-screen pb-20 pt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">ScaleAlpha 大模型收益数据</h1>
        <p class="text-gray-400">基于 AI 深度学习的量化策略表现分析</p>
      </div>

      <!-- Key Metrics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <div class="text-sm text-gray-400 mb-1">总收益率</div>
          <div class="text-3xl font-bold text-blue-500">+42.8%</div>
          <div class="text-xs text-green-500 mt-2">↑ 2.4% 本周</div>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <div class="text-sm text-gray-400 mb-1">年化收益 (CAGR)</div>
          <div class="text-3xl font-bold text-white">18.5%</div>
          <div class="text-xs text-gray-500 mt-2">vs SPY 10.2%</div>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <div class="text-sm text-gray-400 mb-1">夏普比率 (Sharpe)</div>
          <div class="text-3xl font-bold text-white">2.14</div>
          <div class="text-xs text-gray-500 mt-2">风险调整后收益优秀</div>
        </div>
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <div class="text-sm text-gray-400 mb-1">最大回撤 (Max Drawdown)</div>
          <div class="text-3xl font-bold text-red-400">-8.4%</div>
          <div class="text-xs text-gray-500 mt-2">近12个月</div>
        </div>
      </div>

      <!-- Main Chart Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Chart -->
        <div class="lg:col-span-2 bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <h2 class="text-xl font-bold text-white mb-6">累计收益走势</h2>
          <SimplePerformanceChart />
        </div>

        <!-- Monthly Returns Heatmap (Simplified as Table for now) -->
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <h2 class="text-xl font-bold text-white mb-6">月度收益表现</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-400">
              <thead class="text-xs text-gray-500 uppercase bg-[#1a1a1a]">
                <tr>
                  <th scope="col" class="px-3 py-2">月份</th>
                  <th scope="col" class="px-3 py-2">2024</th>
                  <th scope="col" class="px-3 py-2">2023</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-[#404040]">
                  <td class="px-3 py-2 font-medium text-white">Jan</td>
                  <td class="px-3 py-2 text-green-500">+4.2%</td>
                  <td class="px-3 py-2 text-green-500">+2.1%</td>
                </tr>
                <tr class="border-b border-[#404040]">
                  <td class="px-3 py-2 font-medium text-white">Feb</td>
                  <td class="px-3 py-2 text-red-500">-1.5%</td>
                  <td class="px-3 py-2 text-green-500">+3.4%</td>
                </tr>
                <tr class="border-b border-[#404040]">
                  <td class="px-3 py-2 font-medium text-white">Mar</td>
                  <td class="px-3 py-2 text-green-500">+5.8%</td>
                  <td class="px-3 py-2 text-red-500">-0.8%</td>
                </tr>
                <tr class="border-b border-[#404040]">
                  <td class="px-3 py-2 font-medium text-white">Apr</td>
                  <td class="px-3 py-2 text-green-500">+2.3%</td>
                  <td class="px-3 py-2 text-green-500">+1.2%</td>
                </tr>
                <tr class="border-b border-[#404040]">
                  <td class="px-3 py-2 font-medium text-white">May</td>
                  <td class="px-3 py-2 text-green-500">+1.9%</td>
                  <td class="px-3 py-2 text-red-500">-2.1%</td>
                </tr>
                <tr>
                  <td class="px-3 py-2 font-medium text-white">Jun</td>
                  <td class="px-3 py-2 text-green-500">+3.5%</td>
                  <td class="px-3 py-2 text-green-500">+4.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Strategy Allocation & Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <h2 class="text-xl font-bold text-white mb-4">策略资产配置</h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-300">美股大盘科技 (Tech Large Cap)</span>
                <span class="text-white font-bold">45%</span>
              </div>
              <div class="w-full bg-[#1a1a1a] rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" style="width: 45%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-300">量化对冲 (Quant Hedge)</span>
                <span class="text-white font-bold">25%</span>
              </div>
              <div class="w-full bg-[#1a1a1a] rounded-full h-2.5">
                <div class="bg-purple-500 h-2.5 rounded-full" style="width: 25%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-300">现金管理 (Cash Mgmt)</span>
                <span class="text-white font-bold">20%</span>
              </div>
              <div class="w-full bg-[#1a1a1a] rounded-full h-2.5">
                <div class="bg-green-500 h-2.5 rounded-full" style="width: 20%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-300">期权策略 (Options)</span>
                <span class="text-white font-bold">10%</span>
              </div>
              <div class="w-full bg-[#1a1a1a] rounded-full h-2.5">
                <div class="bg-yellow-500 h-2.5 rounded-full" style="width: 10%"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#2a2a2a] p-6 rounded-xl border border-[#404040]">
          <h2 class="text-xl font-bold text-white mb-4">最新交易动态</h2>
          <ul class="space-y-4">
            <li class="flex items-center justify-between border-b border-[#404040] pb-2">
              <div>
                <div class="text-white font-medium">买入 NVDA</div>
                <div class="text-xs text-gray-500">AI 动量策略触发</div>
              </div>
              <div class="text-right">
                <div class="text-green-500 font-bold">Buy</div>
                <div class="text-xs text-gray-400">Today, 10:30 AM</div>
              </div>
            </li>
            <li class="flex items-center justify-between border-b border-[#404040] pb-2">
              <div>
                <div class="text-white font-medium">卖出 TSLA</div>
                <div class="text-xs text-gray-500">止盈离场</div>
              </div>
              <div class="text-right">
                <div class="text-red-500 font-bold">Sell</div>
                <div class="text-xs text-gray-400">Yesterday, 14:15 PM</div>
              </div>
            </li>
            <li class="flex items-center justify-between">
              <div>
                <div class="text-white font-medium">买入 AAPL Call</div>
                <div class="text-xs text-gray-500">波动率套利</div>
              </div>
              <div class="text-right">
                <div class="text-green-500 font-bold">Buy</div>
                <div class="text-xs text-gray-400">2 days ago</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
</script>