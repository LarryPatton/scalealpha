<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-6 px-4">
    <div class="max-w-[1920px] mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-800 mb-1">
            Nofa1 大模型实盘表现
          </h1>
          <div class="flex items-center text-xs text-slate-500">
            <span>🔔 更新时间: {{ updateTime }}</span>
          </div>
        </div>
        
        <!-- Model Selector -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-1.5 text-white min-w-[280px]">
          <div class="flex items-center justify-between">
            <button
              @click="prevModel"
              class="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div class="text-center px-4">
              <div class="text-[10px] opacity-80 mb-0.5">当前模型</div>
              <div class="text-base font-bold truncate max-w-[160px]">{{ currentModel.name }}</div>
            </div>
            <button
              @click="nextModel"
              class="p-1.5 hover:bg-white/20 rounded-md transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Key Metrics Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <!-- Metric 1: Profit -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 mb-0.5">总盈亏</div>
            <div class="text-xl font-bold" :class="currentModel.profitAmount >= 0 ? 'text-emerald-600' : 'text-red-600'">
              {{ currentModel.profitAmount > 0 ? '+' : '' }}${{ Math.abs(currentModel.profitAmount).toLocaleString() }}
            </div>
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-lg">
            💰
          </div>
        </div>

        <!-- Metric 2: Return -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 mb-0.5">收益率</div>
            <div class="text-xl font-bold" :class="currentModel.return >= 0 ? 'text-emerald-600' : 'text-red-600'">
              {{ currentModel.return > 0 ? '+' : '' }}{{ currentModel.return.toFixed(1) }}%
            </div>
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-lg">
            {{ currentModel.return >= 0 ? '📈' : '📉' }}
          </div>
        </div>

        <!-- Metric 3: Max Drawdown -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 mb-0.5">最大回撤</div>
            <div class="text-xl font-bold text-red-600">
              {{ currentModel.maxDrawdown.toFixed(1) }}%
            </div>
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-lg">
            🌊
          </div>
        </div>

        <!-- Metric 4: Sharpe -->
        <div class="bg-white rounded-lg shadow-sm border border-slate-200 p-3 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 mb-0.5">夏普比率</div>
            <div class="text-xl font-bold text-slate-700">
              {{ currentModel.sharpe.toFixed(2) }}
            </div>
          </div>
          <div class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-lg">
            📊
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="space-y-4">
        <!-- Top Row: Chart & Treemap -->
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <!-- Left Panel - Chart (3/4 width) -->
          <div class="xl:col-span-3">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full">
              <h2 class="text-lg font-bold text-slate-800 mb-3 flex items-center">
                <span class="mr-2">📈</span>
                多模型净值曲线对比
              </h2>
              <div ref="chartRef" class="w-full" style="height: 420px;"></div>
            </div>
          </div>

          <!-- Right Panel - Treemap (1/4 width) -->
          <div class="xl:col-span-1">
            <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full flex flex-col">
              <h3 class="text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
                <div class="flex items-center">
                  <span class="mr-1.5">🔲</span>
                  当前持仓分布
                </div>
                <span class="text-xs text-slate-400 font-normal">点击方块查看详情</span>
              </h3>
              <div ref="treemapRef" class="w-full flex-1" style="min-height: 250px;"></div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Strategy & Trades (Split View) -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Left: Strategy List (2/3 width) -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col h-[600px]">
            <!-- Header & Filters -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 flex-shrink-0">
              <h3 class="font-bold text-slate-800 flex items-center">
                <span class="mr-2">📋</span>
                策略详情
                <span class="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {{ processedStrategies.length }}
                </span>
              </h3>
              
              <div class="flex items-center gap-2">
                <!-- Sort Selector (Replaces Search) -->
                <div class="flex items-center text-xs text-slate-500">
                  <span class="mr-2">排序:</span>
                  <select 
                    v-model="sortType"
                    class="pl-2 pr-6 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white cursor-pointer min-w-[120px]"
                  >
                    <option value="time_desc">策略时间 (最新)</option>
                    <option value="time_asc">策略时间 (最早)</option>
                    <option value="position_desc">仓位权重 (高→低)</option>
                    <option value="position_asc">仓位权重 (低→高)</option>
                    <option value="profit_desc">当前盈亏 (高→低)</option>
                    <option value="profit_asc">当前盈亏 (低→高)</option>
                  </select>
                </div>
                
                <!-- Filter Status -->
                <select 
                  v-model="filterStatus"
                  class="pl-2 pr-6 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
                >
                  <option value="all">全部状态</option>
                  <option value="持仓中">持仓中</option>
                  <option value="已平仓">已平仓</option>
                </select>
              </div>
            </div>

            <!-- Strategy Table -->
            <div class="overflow-x-auto flex-1 custom-scrollbar">
              <table class="w-full text-sm text-left">
                <thead class="bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider sticky top-0 z-10">
                  <tr>
                    <th class="py-2.5 px-4 rounded-l-lg bg-slate-50">股票名称</th>
                    <th class="py-2.5 px-4 w-1/3 bg-slate-50">策略内容</th>
                    <th class="py-2.5 px-4 bg-slate-50">执行计划</th>
                    <th class="py-2.5 px-4 bg-slate-50">状态</th>
                    <th class="py-2.5 px-4 bg-slate-50">策略时间</th>
                    <th class="py-2.5 px-4 text-right rounded-r-lg bg-slate-50">当前盈亏</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="(strategy, index) in paginatedStrategies"
                    :key="index"
                    class="hover:bg-blue-50/50 transition-colors cursor-pointer group relative"
                    :class="selectedStockCode === strategy.code ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'"
                    @click="selectStock(strategy)"
                  >
                    <td class="py-3 px-4">
                      <div class="font-medium text-slate-800 group-hover:text-blue-700 transition-colors">{{ strategy.stock }}</div>
                      <div class="flex items-center mt-0.5">
                        <span class="text-xs text-slate-500">{{ strategy.code }}</span>
                        <span class="ml-2 opacity-0 group-hover:opacity-100 text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                          查看交易 ⚡
                        </span>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <div 
                        @click.stop="handleStrategyClick"
                        class="relative p-2 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group/lock"
                      >
                        <div class="flex items-start gap-2">
                          <span class="text-xs leading-relaxed text-slate-600 group-hover/lock:text-slate-800 line-clamp-2">
                            {{ strategy.strategyDesc }}
                          </span>
                          <div class="flex-shrink-0 text-slate-400 group-hover/lock:text-blue-500 transition-colors pt-0.5">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                          </div>
                        </div>
                        <!-- Tooltip badge -->
                        <div class="absolute -top-2 -right-2 opacity-0 group-hover/lock:opacity-100 transition-all transform scale-90 group-hover/lock:scale-100 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm z-10">
                          点击解锁
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <div class="text-xs text-slate-600 space-y-0.5">
                        <div v-for="(plan, key) in strategy.plan" :key="key" class="flex items-center">
                          <span class="w-1 h-1 rounded-full bg-slate-300 mr-1.5"></span>
                          {{ plan }}
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4">
                      <span 
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        :class="strategy.status === '持仓中' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'"
                      >
                        {{ strategy.status || '运行中' }}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-slate-500 text-xs">
                      {{ strategy.createTime }}
                    </td>
                    <td class="py-3 px-4 text-right">
                      <div
                        class="font-bold text-sm"
                        :class="strategy.profit >= 0 ? 'text-emerald-600' : 'text-red-600'"
                      >
                        {{ strategy.profit > 0 ? '+' : '' }}{{ strategy.profit.toFixed(2) }}%
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedStrategies.length === 0">
                    <td colspan="6" class="py-8 text-center text-slate-400 text-sm">
                      没有找到匹配的策略
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between border-t border-slate-100 pt-3 mt-3 flex-shrink-0">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                上一页
              </button>
              <span class="text-xs text-slate-500">
                第 {{ currentPage }} / {{ totalPages || 1 }} 页
              </span>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages || totalPages === 0"
                class="px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50 transition-colors"
              >
                下一页
              </button>
            </div>
          </div>

          <!-- Right: Trades List (1/3 width) -->
          <div class="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col h-[600px]">
            <div class="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 class="font-bold text-slate-800 flex items-center text-sm">
                <span class="mr-2">⚡</span>
                {{ selectedStockName ? `${selectedStockName} 交易记录` : '最近交易记录' }}
              </h3>
              <button 
                v-if="selectedStockName" 
                @click="clearSelection"
                class="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                显示全部
              </button>
            </div>

            <div class="overflow-y-auto flex-1 custom-scrollbar pr-1 space-y-2">
              <div
                v-for="(trade, index) in filteredTrades"
                :key="index"
                class="bg-slate-50 rounded-lg p-2.5 border border-slate-100 hover:shadow-sm transition-all"
              >
                <div class="flex justify-between items-start mb-1.5">
                  <div class="flex items-center">
                    <span
                      class="text-[10px] font-bold px-1.5 py-0.5 rounded mr-2"
                      :class="trade.type === '买入' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'"
                    >
                      {{ trade.type }}
                    </span>
                    <div>
                      <div class="font-medium text-slate-800 text-xs">{{ trade.stock }}</div>
                      <div class="text-[10px] text-slate-400">{{ trade.code }}</div>
                    </div>
                  </div>
                  <div class="text-right text-[10px] text-slate-400">
                    <div>{{ trade.date }}</div>
                    <div>{{ trade.time }}</div>
                  </div>
                </div>
                
                <div class="flex justify-between items-center text-xs border-t border-slate-200 pt-1.5 mt-1.5">
                  <span class="text-slate-500 text-[10px]">
                    ¥{{ trade.price }} × {{ trade.quantity }}
                  </span>
                  <span
                    class="font-bold"
                    :class="trade.profitLoss >= 0 ? 'text-emerald-600' : 'text-red-600'"
                  >
                    {{ trade.profitLoss > 0 ? '+' : '' }}{{ trade.profitLoss }}%
                  </span>
                </div>
              </div>
              
              <div v-if="filteredTrades.length === 0" class="text-center py-10 text-slate-400 text-xs">
                该股票暂无近期交易记录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()

// Filter & Sort State
const filterStatus = ref('all')
const sortType = ref('time_desc') // Default sort by time desc

// Models Data
const models = ref([
  {
    name: 'gemini-3-pro',
    color: '#8B5CF6',
    currentValue: 7285,
    return: -27.1,
    maxDrawdown: -35.2,
    sharpe: 0.68,
    profitAmount: -2715,
    strategies: [
      {
        stock: '贵州茅台',
        code: '600519',
        strategyDesc: '监测到贵州茅台出现MACD底背离信号，结合成交量放大，建议在1680附近布局，目标涨幅15%。',
        plan: ['持仓: 5-10天', '止损: 5%', '仓位: 20%'],
        profit: 8.2,
        status: '持仓中',
        daysHeld: 4,
        createTime: '12/08 09:30',
        position: 20
      },
      {
        stock: '宁德时代',
        code: '300750',
        strategyDesc: '宁德时代突破60日均线压制，形成上升三角形形态，动量指标强势，建议跟随趋势操作。',
        plan: ['止盈: 15%', '仓位: 30%'],
        profit: 12.5,
        status: '持仓中',
        daysHeld: 2,
        createTime: '12/06 14:00',
        position: 30
      },
      {
        stock: '招商银行',
        code: '600036',
        strategyDesc: '基于多因子模型分析，招商银行估值处于历史低位，且主力资金持续流入，触发中线买入信号。',
        plan: ['持仓: 3天', '止损: 3%'],
        profit: -2.3,
        status: '已平仓',
        daysHeld: 3,
        createTime: '12/05 10:15',
        position: 0
      }
    ],
    recentTrades: [
      {
        date: '12/08',
        time: '10:30',
        type: '买入',
        stock: '贵州茅台',
        code: '600519',
        price: '1,685',
        quantity: 100,
        profitLoss: 8.2
      },
      {
        date: '12/07',
        time: '14:22',
        type: '卖出',
        stock: '招商银行',
        code: '600036',
        price: '38.50',
        quantity: 500,
        profitLoss: -2.3
      },
      {
        date: '12/06',
        time: '09:45',
        type: '买入',
        stock: '宁德时代',
        code: '300750',
        price: '198.30',
        quantity: 200,
        profitLoss: 12.5
      }
    ],
    holdings: [
      { name: '科技股', value: 40, color: '#3B82F6' },
      { name: '金融股', value: 30, color: '#10B981' },
      { name: '消费股', value: 20, color: '#F59E0B' },
      { name: '现金', value: 10, color: '#94A3B8' }
    ]
  },
  {
    name: 'qwen5-max',
    color: '#EC4899',
    currentValue: 6684,
    return: -33.2,
    maxDrawdown: -38.1,
    sharpe: 0.52,
    profitAmount: -3316,
    strategies: [], // Will be filled by generator
    recentTrades: [], // Will be filled by generator
    holdings: [
      { name: '新能源', value: 50, color: '#10B981' },
      { name: '科技股', value: 30, color: '#3B82F6' },
      { name: '现金', value: 20, color: '#94A3B8' }
    ]
  },
  {
    name: 'gpt-5.1',
    color: '#10B981',
    currentValue: 9518,
    return: -4.8,
    maxDrawdown: -15.3,
    sharpe: 1.42,
    profitAmount: -482,
    strategies: [],
    recentTrades: [],
    holdings: [
      { name: '科技股', value: 45, color: '#3B82F6' },
      { name: '金融股', value: 35, color: '#10B981' },
      { name: '现金', value: 20, color: '#94A3B8' }
    ]
  },
  {
    name: 'grok-4.20',
    color: '#F472B6',
    currentValue: 12273,
    return: 22.7,
    maxDrawdown: -8.5,
    sharpe: 2.14,
    profitAmount: 2273,
    strategies: [],
    recentTrades: [],
    holdings: [
      { name: '科技股', value: 40, color: '#3B82F6' },
      { name: '金融股', value: 30, color: '#10B981' },
      { name: '消费股', value: 20, color: '#F59E0B' },
      { name: '现金', value: 10, color: '#94A3B8' }
    ]
  },
  {
    name: 'deepseek-chat-v3.1',
    color: '#3B82F6',
    currentValue: 7670,
    return: -23.3,
    maxDrawdown: -28.9,
    sharpe: 0.78,
    profitAmount: -2330,
    strategies: [],
    recentTrades: [],
    holdings: [
      { name: '科技股', value: 60, color: '#3B82F6' },
      { name: '现金', value: 40, color: '#94A3B8' }
    ]
  },
  {
    name: 'claude-sonnet-4-5',
    color: '#14B8A6',
    currentValue: 6443,
    return: -35.6,
    maxDrawdown: -42.1,
    sharpe: 0.45,
    profitAmount: -3557,
    strategies: [],
    recentTrades: [],
    holdings: [
      { name: '金融股', value: 50, color: '#10B981' },
      { name: '消费股', value: 30, color: '#F59E0B' },
      { name: '现金', value: 20, color: '#94A3B8' }
    ]
  },
  {
    name: 'kimi-k2-thinking',
    color: '#F59E0B',
    currentValue: 6689,
    return: -33.1,
    maxDrawdown: -39.5,
    sharpe: 0.56,
    profitAmount: -3311,
    strategies: [],
    recentTrades: [],
    holdings: [
      { name: '科技股', value: 35, color: '#3B82F6' },
      { name: '金融股', value: 35, color: '#10B981' },
      { name: '现金', value: 30, color: '#94A3B8' }
    ]
  }
])

// --- Mock Data Generator ---
const stockPool = [
  { name: '贵州茅台', code: '600519' }, { name: '宁德时代', code: '300750' }, { name: '招商银行', code: '600036' },
  { name: '比亚迪', code: '002594' }, { name: '五粮液', code: '000858' }, { name: '中国平安', code: '601318' },
  { name: '美的集团', code: '000333' }, { name: '恒瑞医药', code: '600276' }, { name: '东方财富', code: '300059' },
  { name: '中信证券', code: '600030' }, { name: '迈瑞医疗', code: '300760' }, { name: '立讯精密', code: '002475' },
  { name: '万华化学', code: '600309' }, { name: '海康威视', code: '002415' }, { name: '顺丰控股', code: '002352' },
  { name: '隆基绿能', code: '601012' }, { name: '紫金矿业', code: '601899' }, { name: '伊利股份', code: '600887' },
  { name: '药明康德', code: '603259' }, { name: '长江电力', code: '600900' },
  { name: 'NVIDIA', code: 'NVDA' }, { name: 'Tesla', code: 'TSLA' }, { name: 'Apple', code: 'AAPL' },
  { name: 'Microsoft', code: 'MSFT' }, { name: 'Amazon', code: 'AMZN' }, { name: 'Google', code: 'GOOGL' },
  { name: 'Meta', code: 'META' }, { name: 'AMD', code: 'AMD' }, { name: 'Netflix', code: 'NFLX' }
]

const strategyTemplates = [
  '监测到{stock}出现MACD底背离信号，结合成交量放大，建议在{price}附近布局，目标涨幅15%。',
  '基于多因子模型分析，{stock}估值处于历史低位，且主力资金持续流入，触发中线买入信号。',
  '{stock}突破60日均线压制，形成上升三角形形态，动量指标 strong，建议跟随趋势操作。',
  'AI算法识别到{stock}在盘中出现异常大单买入，预测短期有爆发可能，建议轻仓试错。',
  '{stock}回踩20日支撑位不破，RSI指标超卖反弹，量化系统发出短线反弹信号。'
]

const plans = [
  ['持仓: 3-5天', '止损: 5%'], ['持仓: 10-20天', '止盈: 15%'], ['目标: +10%', '仓位: 20%'],
  ['持仓: 长期', '动态止损'], ['止盈: 20%', '分批止盈'], ['持仓: 1-2天', '超短线']
]

const generateMockData = () => {
  models.value.forEach(model => {
    // 1. Generate Strategies
    const strategyCount = 30 + Math.floor(Math.random() * 20)
    const strategies = []
    for (let i = 0; i < strategyCount; i++) {
      const stock = stockPool[Math.floor(Math.random() * stockPool.length)]
      const template = strategyTemplates[Math.floor(Math.random() * strategyTemplates.length)]
      const desc = template.replace(/{stock}/g, stock.name).replace('{price}', (Math.random() * 100).toFixed(0))
      
      // Generate Position
      const position = 10 + Math.floor(Math.random() * 40) // 10-50%
      const plan = plans[Math.floor(Math.random() * plans.length)].slice()
      // Ensure position is in plan for display
      if (!plan.some(p => p.includes('仓位'))) {
        plan.push(`仓位: ${position}%`)
      }

      // Generate Time
      const date = new Date()
      date.setDate(date.getDate() - Math.floor(Math.random() * 10))
      const timeStr = `${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')} ${String(9 + Math.floor(Math.random() * 6)).padStart(2,'0')}:${String(Math.floor(Math.random() * 60)).padStart(2,'0')}`

      strategies.push({
        stock: stock.name,
        code: stock.code,
        strategyDesc: desc,
        plan: plan,
        profit: (Math.random() - 0.4) * 20, // -8% to +12%
        status: Math.random() > 0.3 ? '持仓中' : '已平仓',
        daysHeld: 1 + Math.floor(Math.random() * 30),
        createTime: timeStr,
        position: position
      })
    }
    if (model.strategies.length < 10) {
       model.strategies = [...model.strategies, ...strategies]
    }

    // 2. Generate Trades
    const tradeCount = 40 + Math.floor(Math.random() * 20)
    const trades = []
    for (let i = 0; i < tradeCount; i++) {
      const stock = stockPool[Math.floor(Math.random() * stockPool.length)]
      const isBuy = Math.random() > 0.5
      trades.push({
        date: `12/${String(Math.floor(Math.random() * 8) + 1).padStart(2, '0')}`,
        time: `${String(9 + Math.floor(Math.random() * 6)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        type: isBuy ? '买入' : '卖出',
        stock: stock.name,
        code: stock.code,
        price: (10 + Math.random() * 200).toFixed(2),
        quantity: (1 + Math.floor(Math.random() * 20)) * 100,
        profitLoss: isBuy ? 0 : Number(((Math.random() - 0.4) * 15).toFixed(2))
      })
    }
    if (model.recentTrades.length < 10) {
      model.recentTrades = [...model.recentTrades, ...trades]
    }

    // 3. Generate Detailed Holdings for Treemap
    // Ensure holdings have children
    model.holdings = model.holdings.map(holding => {
      // Generate 3-8 stocks per sector
      const stockCount = 3 + Math.floor(Math.random() * 6)
      const children = []
      let remainingValue = holding.value
      
      for (let i = 0; i < stockCount; i++) {
        const stock = stockPool[Math.floor(Math.random() * stockPool.length)]
        // Distribute value roughly
        const val = i === stockCount - 1 ? remainingValue : Math.floor(remainingValue * (0.2 + Math.random() * 0.4))
        remainingValue -= val
        
        children.push({
          name: stock.name,
          value: Math.max(1, val), // Ensure at least 1
          profit: (Math.random() - 0.45) * 10, // -4.5% to +5.5%
          code: stock.code
        })
      }
      
      return {
        ...holding,
        children: children
      }
    })
  })
}

// --- Pagination & Selection Logic ---
const currentPage = ref(1)
const pageSize = 8
const selectedStockCode = ref(null)
const selectedStockName = ref(null)

// Processed Strategies (Filter -> Sort)
const processedStrategies = computed(() => {
  let result = [...currentModel.value.strategies]

  // 1. Filter by Status
  if (filterStatus.value !== 'all') {
    result = result.filter(s => s.status === filterStatus.value)
  }

  // 2. Sort
  result.sort((a, b) => {
    switch (sortType.value) {
      case 'time_desc':
        return a.createTime < b.createTime ? 1 : -1
      case 'time_asc':
        return a.createTime > b.createTime ? 1 : -1
      case 'position_desc':
        return (b.position || 0) - (a.position || 0)
      case 'position_asc':
        return (a.position || 0) - (b.position || 0)
      case 'profit_desc':
        return b.profit - a.profit
      case 'profit_asc':
        return a.profit - b.profit
      default:
        return 0
    }
  })

  return result
})

const totalPages = computed(() => {
  return Math.ceil(processedStrategies.value.length / pageSize)
})

const paginatedStrategies = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return processedStrategies.value.slice(start, start + pageSize)
})

const filteredTrades = computed(() => {
  const allTrades = currentModel.value.recentTrades
  if (!selectedStockCode.value) {
    return allTrades
  }
  return allTrades.filter(t => t.code === selectedStockCode.value)
})

const selectStock = (strategy) => {
  if (selectedStockCode.value === strategy.code) {
    // Toggle off if clicking same stock
    clearSelection()
  } else {
    selectedStockCode.value = strategy.code
    selectedStockName.value = strategy.stock
  }
}

const clearSelection = () => {
  selectedStockCode.value = null
  selectedStockName.value = null
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const handleStrategyClick = () => {
  if (confirm('查看完整策略详情需要登录账户。是否立即前往登录？')) {
    router.push('/login')
  }
}

// Current Model Index
const currentModelIndex = ref(0)
const currentModel = computed(() => models.value[currentModelIndex.value])

// Update Time
const updateTime = ref('')

// Chart Refs
const chartRef = ref(null)
const treemapRef = ref(null)
let mainChart = null
let treemapChart = null

// Methods
const prevModel = () => {
  currentModelIndex.value = (currentModelIndex.value - 1 + models.value.length) % models.value.length
}

const nextModel = () => {
  currentModelIndex.value = (currentModelIndex.value + 1) % models.value.length
}

// Generate mock time series data with HIGH volatility
const generateTimeSeriesData = (model) => {
  const dates = []
  const values = []
  const baseValue = 10000
  const finalValue = model.currentValue
  const points = 200 
  
  const startDate = new Date('2024-11-20')
  
  const volatilityMap = {
    'gemini-3-pro': 0.035,
    'qwen5-max': 0.045,
    'gpt-5.1': 0.025,
    'grok-4.20': 0.028,
    'deepseek-chat-v3.1': 0.038,
    'claude-sonnet-4-5': 0.055,
    'kimi-k2-thinking': 0.042
  }
  
  const dailyVolatility = volatilityMap[model.name] || 0.035
  
  let currentValue = baseValue
  values.push(currentValue)
  
  for (let i = 1; i < points; i++) {
    const remainingPoints = points - i
    const remainingReturn = (finalValue - currentValue) / currentValue
    const trendReturn = remainingReturn / remainingPoints * 0.3
    
    const wave1 = Math.sin(i * 0.3) * dailyVolatility * 0.8
    const wave2 = Math.sin(i * 0.15) * dailyVolatility * 1.2
    const randomReturn = (Math.random() - 0.5) * 3 * dailyVolatility + wave1 + wave2
    
    let totalChange = trendReturn + randomReturn
    
    if (Math.random() < 0.08) {
      totalChange += (Math.random() - 0.5) * 0.06
    }
    
    currentValue = currentValue * (1 + totalChange)
    
    if (model.maxDrawdown < -30) {
      if (i >= points * 0.15 && i <= points * 0.35) currentValue *= 0.992
      if (i >= points * 0.5 && i <= points * 0.6) currentValue *= 0.994
    } else if (model.maxDrawdown < -20) {
      if (i >= points * 0.25 && i <= points * 0.45) currentValue *= 0.9965
    } else if (model.maxDrawdown < -10) {
      if (i >= points * 0.35 && i <= points * 0.5) currentValue *= 0.9985
    }
    
    if (model.return > 15) {
      if (i <= points * 0.3) currentValue *= 1.001
      if (i >= points * 0.7) currentValue *= 1.0035
    }
    
    if (model.return < -30) {
      if (i >= points * 0.2) currentValue *= 0.998
    }
    
    values.push(Math.round(currentValue))
    
    const date = new Date(startDate)
    const daysOffset = Math.floor(i / 40)
    const hoursOffset = (i % 40) * 0.2
    date.setDate(date.getDate() + daysOffset)
    date.setHours(9 + Math.floor(hoursOffset))
    date.setMinutes((hoursOffset % 1) * 60)
    
    dates.push(date.toISOString().slice(5, 16).replace('T', ' '))
  }
  
  values[values.length - 1] = finalValue
  
  return { dates, values }
}

// Initialize main chart
const initMainChart = () => {
  if (!chartRef.value) return
  
  mainChart = echarts.init(chartRef.value)
  
  const series = models.value.map(model => {
    const { dates, values } = generateTimeSeriesData(model)
    const isCurrent = model.name === currentModel.value.name
    return {
      name: model.name,
      type: 'line',
      data: values,
      smooth: true,
      symbol: 'none',
      lineStyle: {
        width: isCurrent ? 4 : 1.5,
        color: model.color,
        opacity: isCurrent ? 1 : 0.3
      },
      itemStyle: {
        color: model.color
      },
      z: isCurrent ? 10 : 1, // Ensure current model is on top
      emphasis: {
        focus: 'series',
        lineStyle: {
          width: 4,
          opacity: 1
        }
      }
    }
  })
  
  const { dates } = generateTimeSeriesData(models.value[0])
  
  const option = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '5%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: {
        color: '#334155'
      },
      formatter: (params) => {
        let result = `<div style="font-weight: 600; margin-bottom: 8px;">${params[0].axisValue}</div>`
        // Sort params so current model is first
        const sortedParams = [...params].sort((a, b) => {
          if (a.seriesName === currentModel.value.name) return -1
          if (b.seriesName === currentModel.value.name) return 1
          return 0
        })
        
        sortedParams.forEach(param => {
          const returnRate = ((param.value - 10000) / 10000 * 100).toFixed(2)
          const isCurrent = param.seriesName === currentModel.value.name
          const weightStyle = isCurrent ? 'font-weight: bold; background: #f1f5f9; padding: 2px 4px; border-radius: 4px;' : ''
          
          result += `
            <div style="display: flex; align-items: center; margin: 4px 0; ${weightStyle}">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${param.color}; margin-right: 8px;"></span>
              <span style="flex: 1;">${param.seriesName}</span>
              <span style="font-weight: 600; margin-left: 12px;">$${param.value.toLocaleString()}</span>
              <span style="margin-left: 8px; color: ${returnRate >= 0 ? '#10b981' : '#ef4444'};">${returnRate >= 0 ? '+' : ''}${returnRate}%</span>
            </div>
          `
        })
        return result
      }
    },
    legend: {
      data: models.value.map(m => m.name),
      bottom: 0,
      textStyle: {
        fontSize: 12,
        color: '#64748b'
      },
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10
    },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#e2e8f0'
        }
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#94a3b8',
        fontSize: 11,
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`
      },
      splitLine: {
        lineStyle: {
          color: '#f1f5f9'
        }
      }
    },
    series: series
  }
  
  mainChart.setOption(option)
}

// Update chart highlight
const updateChartHighlight = () => {
  if (!mainChart) return
  
  const option = mainChart.getOption()
  const newSeries = option.series.map(s => {
    const isCurrent = s.name === currentModel.value.name
    return {
      ...s,
      lineStyle: {
        width: isCurrent ? 4 : 1.5,
        color: s.itemStyle.color, // Keep original color
        opacity: isCurrent ? 1 : 0.2 // Fade others
      },
      z: isCurrent ? 10 : 1
    }
  })
  
  mainChart.setOption({ series: newSeries })
}

// Initialize Treemap
const initTreemap = () => {
  if (!treemapRef.value) return
  
  treemapChart = echarts.init(treemapRef.value)
  updateTreemap()
}

// Update Treemap based on current model
const updateTreemap = () => {
  if (!treemapChart) return
  
  const data = currentModel.value.holdings.map(h => ({
    name: h.name,
    value: h.value,
    itemStyle: {
      color: h.color
    },
    children: h.children
  }))

  const option = {
    tooltip: {
      formatter: (info) => {
        const value = info.value;
        const treePathInfo = info.treePathInfo;
        const treePath = [];
        for (let i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }
        
        let content = `<div class="font-bold mb-1">${echarts.format.encodeHTML(treePath.join(' > '))}</div>`;
        
        if (info.data.code) {
           // It's a stock
           const profit = info.data.profit;
           const profitColor = profit >= 0 ? '#10b981' : '#ef4444';
           content += `
             <div class="text-xs text-slate-500 mb-1">代码: ${info.data.code}</div>
             <div class="flex justify-between gap-4">
               <span>权重:</span>
               <span class="font-bold">${value}%</span>
             </div>
             <div class="flex justify-between gap-4">
               <span>今日涨跌:</span>
               <span style="color: ${profitColor}; font-weight: bold;">
                 ${profit > 0 ? '+' : ''}${profit.toFixed(2)}%
               </span>
             </div>
           `;
        } else {
          // It's a sector
          content += `
            <div class="flex justify-between gap-4">
               <span>总权重:</span>
               <span class="font-bold">${value}%</span>
             </div>
             <div class="text-xs text-slate-400 mt-1">点击查看详情</div>
          `;
        }
        
        return content;
      },
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#334155' }
    },
    series: [
      {
        type: 'treemap',
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
          gapWidth: 1
        },
        breadcrumb: {
          show: true,
          height: 24,
          bottom: 0,
          itemStyle: {
            color: '#f1f5f9',
            borderColor: '#cbd5e1',
            borderWidth: 1,
            textStyle: {
              color: '#64748b'
            }
          }
        },
        roam: false, // Disable zoom/pan
        nodeClick: 'zoomToNode', // Click to zoom
        leafDepth: 1, // Show children on click
        levels: [
          {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 2,
              gapWidth: 2
            },
            upperLabel: {
              show: false
            }
          },
          {
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#ccc'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              borderWidth: 1,
              gapWidth: 1,
              borderColorSaturation: 0.6
            },
            // Use profit to determine color for leaf nodes (stocks)
            visualMin: -10,
            visualMax: 10,
            visualDimension: 2 // Use profit (index 2 if mapped, but here we use custom logic in render or just simple color mapping)
          }
        ],
        data: data.map(sector => ({
          ...sector,
          // Map children to have color based on profit
          children: sector.children?.map(stock => ({
            ...stock,
            itemStyle: {
              // Green for profit, Red for loss (Chinese market style)
              // Or Emerald/Red as per design system
              color: stock.profit >= 0 
                ? `rgba(16, 185, 129, ${0.4 + Math.min(Math.abs(stock.profit)/10, 0.6)})` // Emerald
                : `rgba(239, 68, 68, ${0.4 + Math.min(Math.abs(stock.profit)/10, 0.6)})`   // Red
            }
          }))
        }))
      }
    ]
  }
  
  treemapChart.setOption(option)
}

// Watch for model changes
watch(currentModelIndex, () => {
  updateTreemap()
  updateChartHighlight()
  currentPage.value = 1 // Reset pagination
  clearSelection() // Reset selection
  // Reset filters
  filterStatus.value = 'all'
})

// Update current time
const updateCurrentTime = () => {
  const now = new Date()
  updateTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(() => {
  generateMockData() // Generate more data
  updateCurrentTime()
  initMainChart()
  initTreemap()
  
  // Handle window resize
  window.addEventListener('resize', () => {
    mainChart?.resize()
    treemapChart?.resize()
  })
})
</script>

<style scoped>
/* Smooth transitions */
.transition-colors {
  transition: all 0.3s ease;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Custom Scrollbar Class */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>