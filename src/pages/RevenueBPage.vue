<template>
  <div class="h-screen w-screen overflow-hidden bg-slate-50 p-4 flex flex-col">
    <!-- Unified Dashboard Container -->
    <div class="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      
      <!-- 1. Metrics & Controls Row -->
      <div class="flex border-b border-slate-200 bg-white shrink-0">
        <!-- Key Metrics Group (Unified) -->
        <div class="flex-1 p-4 flex items-center justify-around">
          <!-- Metric 1: Profit -->
          <div class="text-center">
            <div class="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">总盈亏</div>
            <div class="text-3xl font-bold tracking-tight" :class="currentModel.profitAmount >= 0 ? 'text-emerald-600' : 'text-red-600'">
              {{ currentModel.profitAmount > 0 ? '+' : '' }}${{ Math.abs(currentModel.profitAmount).toLocaleString() }}
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-10 bg-slate-100"></div>

          <!-- Metric 2: Return -->
          <div class="text-center">
            <div class="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">收益率</div>
            <div class="text-3xl font-bold tracking-tight" :class="currentModel.return >= 0 ? 'text-emerald-600' : 'text-red-600'">
              {{ currentModel.return > 0 ? '+' : '' }}{{ currentModel.return.toFixed(1) }}%
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-10 bg-slate-100"></div>

          <!-- Metric 3: Max Drawdown -->
          <div class="text-center">
            <div class="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wider">最大回撤</div>
            <div class="text-3xl font-bold tracking-tight text-slate-700">
              {{ currentModel.maxDrawdown.toFixed(1) }}%
            </div>
          </div>
        </div>

        <!-- Model Selector (Fixed Width) -->
        <div class="w-[280px] p-3 flex items-center justify-center bg-slate-50/50 border-l border-slate-200">
          <div class="w-full h-full bg-white border border-slate-200 rounded-lg p-1 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors">
            <button
              @click="prevModel"
              class="w-8 h-full flex items-center justify-center hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div class="flex-1 text-center px-2 overflow-hidden">
              <div class="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Current Model</div>
              <div class="font-bold text-slate-800 truncate">{{ currentModel.name }}</div>
            </div>
            <button
              @click="nextModel"
              class="w-8 h-full flex items-center justify-center hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Main Content Grid (Split View) -->
      <div class="flex-1 grid grid-cols-12 divide-x divide-slate-200 overflow-hidden">
        
        <!-- Left Column: Chart & Strategy (75%) -->
        <div class="col-span-9 flex flex-col divide-y divide-slate-200 overflow-hidden">
          
          <!-- Chart Area (Flex 3) -->
          <div class="flex-[3] p-4 relative flex flex-col min-h-0">
            <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
              <h2 class="text-sm font-bold text-slate-800 flex items-center bg-white/80 backdrop-blur px-2 py-1 rounded border border-slate-200 shadow-sm">
                <span class="mr-2">📈</span>
                净值曲线
              </h2>
            </div>
            <div ref="chartRef" class="w-full flex-1"></div>
          </div>

          <!-- Strategy Table Area (Flex 2) -->
          <div class="flex-[2] flex flex-col bg-slate-50/30 relative min-h-0">
            <!-- Table Header Controls -->
            <div class="px-4 py-2 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <h3 class="font-bold text-slate-800 flex items-center text-sm">
                <span class="mr-2">📋</span>
                策略详情
                <span class="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  {{ processedStrategies.length }}
                </span>
              </h3>
              <div class="flex items-center gap-2">
                <select v-model="sortType" class="pl-2 pr-6 py-1 text-xs text-slate-600 border border-slate-200 rounded hover:border-blue-400 focus:outline-none bg-white cursor-pointer">
                  <option value="time_desc">最新策略</option>
                  <option value="profit_desc">盈亏最高</option>
                  <option value="position_desc">仓位最重</option>
                </select>
              </div>
            </div>

            <!-- Table Content -->
            <div class="flex-1 overflow-hidden relative">
              <div class="h-full overflow-y-auto custom-scrollbar pb-12">
                <table class="w-full text-sm text-left">
                  <thead class="bg-slate-50 text-slate-500 font-medium text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th class="py-2 px-4 bg-slate-50 border-b border-slate-200">股票名称</th>
                      <th class="py-2 px-4 w-1/2 bg-slate-50 border-b border-slate-200">策略逻辑</th>
                      <th class="py-2 px-4 bg-slate-50 border-b border-slate-200">时间</th>
                      <th class="py-2 px-4 text-right bg-slate-50 border-b border-slate-200">盈亏</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100 bg-white">
                    <tr
                      v-for="(strategy, index) in paginatedStrategies.slice(0, 6)"
                      :key="index"
                      class="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                    >
                      <td class="py-2.5 px-4">
                        <div class="font-medium text-slate-800">{{ strategy.stock }}</div>
                        <div class="text-xs text-slate-400">{{ strategy.code }}</div>
                      </td>
                      <td class="py-2.5 px-4">
                        <div class="text-xs text-slate-600 line-clamp-2 group-hover:text-slate-900" :title="strategy.strategyDesc">
                          {{ strategy.strategyDesc }}
                        </div>
                      </td>
                      <td class="py-2.5 px-4 text-xs text-slate-400 font-mono">
                        {{ strategy.createTime.split(' ')[0] }}
                      </td>
                      <td class="py-2.5 px-4 text-right">
                        <span class="font-bold text-sm" :class="strategy.profit >= 0 ? 'text-emerald-600' : 'text-red-600'">
                          {{ strategy.profit > 0 ? '+' : '' }}{{ strategy.profit.toFixed(2) }}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Login Lock Overlay -->
              <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-center pb-6 z-20 pointer-events-none">
                <button 
                  @click="handleStrategyClick"
                  class="pointer-events-auto flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 hover:scale-105 transition-all transform"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  <span class="text-sm font-medium">登录后查看更多</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Portfolio & Trades (25%) -->
        <div class="col-span-3 flex flex-col divide-y divide-slate-200 bg-slate-50/30 overflow-hidden">
          
          <!-- Portfolio Section (Flex 1) -->
          <div class="flex-1 flex flex-col min-h-0 bg-white">
            <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <h3 class="text-sm font-bold text-slate-800 flex items-center">
                <span class="mr-2">🔲</span>
                持仓分布
              </h3>
              <div class="flex bg-slate-100 rounded p-0.5 border border-slate-200">
                <button @click="holdingsViewMode = 'list'" class="px-2 py-0.5 text-[10px] rounded transition-all" :class="holdingsViewMode === 'list' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-400'">列表</button>
                <button @click="holdingsViewMode = 'chart'" class="px-2 py-0.5 text-[10px] rounded transition-all" :class="holdingsViewMode === 'chart' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-400'">图表</button>
              </div>
            </div>
            
            <div class="flex-1 overflow-hidden relative">
              <!-- Chart View -->
              <div v-show="holdingsViewMode === 'chart'" class="w-full h-full">
                <div ref="treemapRef" class="w-full h-full"></div>
              </div>
              <!-- List View -->
              <div v-if="holdingsViewMode === 'list'" class="w-full h-full overflow-y-auto custom-scrollbar p-2 space-y-1">
                <div v-for="(stock, idx) in flatHoldingsList" :key="idx" class="flex items-center justify-between p-2 rounded border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-colors bg-white">
                  <div class="flex items-center gap-2 overflow-hidden">
                    <div class="w-1 h-6 rounded-full flex-shrink-0" :style="{ backgroundColor: stock.color || '#cbd5e1' }"></div>
                    <div class="min-w-0">
                      <div class="text-xs font-bold text-slate-700 truncate">{{ stock.name }}</div>
                      <div class="text-[10px] text-slate-400 truncate">{{ stock.code }}</div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="text-xs font-bold text-slate-700">{{ stock.value }}%</div>
                    <div class="text-[10px]" :class="stock.profit >= 0 ? 'text-emerald-500' : 'text-red-500'">
                      {{ stock.profit > 0 ? '+' : '' }}{{ stock.profit.toFixed(1) }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Trades Section (Flex 1) -->
          <div class="flex-1 flex flex-col min-h-0 bg-white">
            <div class="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <h3 class="text-sm font-bold text-slate-800 flex items-center">
                <span class="mr-2">⚡</span>
                最近交易
              </h3>
              <!-- Stock Filter for Trades -->
              <select 
                v-model="selectedStockCode" 
                class="pl-2 pr-6 py-1 text-[10px] text-slate-600 border border-slate-200 rounded hover:border-blue-400 focus:outline-none bg-white cursor-pointer max-w-[100px]"
              >
                <option :value="null">全部股票</option>
                <option v-for="stock in uniqueTradeStocks" :key="stock.code" :value="stock.code">
                  {{ stock.name }}
                </option>
              </select>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar p-0">
              <div v-for="(trade, index) in filteredTrades" :key="index" class="px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    :class="trade.type === '买入' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'">
                    {{ trade.type === '买入' ? '买' : '卖' }}
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-700">{{ trade.stock }}</div>
                    <div class="text-[10px] text-slate-400">{{ trade.date }} {{ trade.time }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-medium text-slate-600">¥{{ trade.price }}</div>
                  <div class="text-[10px]" :class="trade.profitLoss >= 0 ? 'text-emerald-500' : 'text-red-500'">
                    {{ trade.profitLoss > 0 ? '+' : '' }}{{ trade.profitLoss }}%
                  </div>
                </div>
              </div>
              <div v-if="filteredTrades.length === 0" class="text-center py-8 text-slate-400 text-xs">暂无记录</div>
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

// Holdings View Mode
const holdingsViewMode = ref('list')

// Filter & Sort State
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

// Flat Holdings List for List View
const flatHoldingsList = computed(() => {
  const list = []
  if (currentModel.value && currentModel.value.holdings) {
    currentModel.value.holdings.forEach(sector => {
      if (sector.children) {
        sector.children.forEach(stock => {
          list.push({
            ...stock,
            sector: sector.name,
            color: sector.color
          })
        })
      }
    })
  }
  // Sort by value desc
  return list.sort((a, b) => b.value - a.value)
})

// Watch view mode to resize chart
watch(holdingsViewMode, (newVal) => {
  if (newVal === 'chart') {
    setTimeout(() => {
      treemapChart?.resize()
    }, 50)
  }
})

// Processed Strategies (Filter -> Sort)
const processedStrategies = computed(() => {
  let result = [...currentModel.value.strategies]

  // Sort
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

const uniqueTradeStocks = computed(() => {
  const trades = currentModel.value.recentTrades
  const stockMap = new Map()
  trades.forEach(t => {
    if (!stockMap.has(t.code)) {
      stockMap.set(t.code, { code: t.code, name: t.stock })
    }
  })
  return Array.from(stockMap.values())
})

const filteredTrades = computed(() => {
  const allTrades = currentModel.value.recentTrades
  if (!selectedStockCode.value) {
    return allTrades
  }
  return allTrades.filter(t => t.code === selectedStockCode.value)
})

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