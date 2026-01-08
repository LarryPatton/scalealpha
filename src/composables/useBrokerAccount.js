import { ref, computed } from 'vue'

// 全局共享的券商账户状态 - 支持多账户
const brokerAccounts = ref([])           // 所有已连接的账户
const selectedAccountId = ref(null)      // 当前选中的账户 ID
const isConnecting = ref(false)

// 支持的券商列表 - 包含美股和港股券商
export const SUPPORTED_BROKERS = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers',
    shortName: 'IBKR',
    color: '#D41F1F',
    region: 'US'
  },
  {
    id: 'td',
    name: 'TD Ameritrade',
    shortName: 'TD',
    color: '#2D8C3C',
    region: 'US'
  },
  {
    id: 'schwab',
    name: 'Charles Schwab',
    shortName: 'Schwab',
    color: '#00A0DF',
    region: 'US'
  },
  {
    id: 'fidelity',
    name: 'Fidelity',
    shortName: 'Fidelity',
    color: '#4A8C2A',
    region: 'US'
  },
  {
    id: 'futu',
    name: 'Futu (Moomoo)',
    shortName: 'Futu',
    color: '#FF6600',
    region: 'HK'
  },
  {
    id: 'tiger',
    name: 'Tiger Brokers',
    shortName: 'Tiger',
    color: '#FF9500',
    region: 'HK'
  },
  {
    id: 'longbridge',
    name: 'Longbridge',
    shortName: 'LB',
    color: '#6366F1',
    region: 'HK'
  },
  {
    id: 'webull',
    name: 'Webull',
    shortName: 'Webull',
    color: '#FF5722',
    region: 'US'
  }
]

// 股票列表
const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 185.50 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', price: 495.22 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 141.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer', price: 248.50 },
  { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', price: 358.32 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', price: 153.42 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 378.91 },
  { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', price: 172.65 }
]

// Fake 持仓数据
const generateFakeHoldings = () => {
  // 随机选择 4-6 只股票
  const count = 4 + Math.floor(Math.random() * 3)
  const shuffled = [...STOCKS].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, count)
  
  return selected.map(stock => {
    const quantity = Math.floor(10 + Math.random() * 100) * 5
    const costPrice = stock.price * (0.85 + Math.random() * 0.3)
    const currentPrice = stock.price * (0.95 + Math.random() * 0.1)
    const marketValue = quantity * currentPrice
    const costBasis = quantity * costPrice
    const pnl = marketValue - costBasis
    const pnlPercent = (pnl / costBasis) * 100
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      sector: stock.sector,
      quantity,
      costPrice: parseFloat(costPrice.toFixed(2)),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      marketValue: parseFloat(marketValue.toFixed(2)),
      costBasis: parseFloat(costBasis.toFixed(2)),
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercent: parseFloat(pnlPercent.toFixed(2))
    }
  })
}

// 生成模拟订单数据（来自策略计划）
const generateFakeOrders = () => {
  const now = new Date()
  const orders = []
  
  // 创建多种状态的订单
  const orderTemplates = [
    { symbol: 'MSFT', side: 'buy', status: 'pending', quantity: 100, price: 167.41, targetPrice: 186.86, stopLossPrice: 161.55 },
    { symbol: 'MSFT', side: 'sell', status: 'pending', quantity: 100, price: 152.36, targetPrice: 171.61, stopLossPrice: 145.63 },
    { symbol: 'MSFT', side: 'buy', status: 'pending', quantity: 100, price: 171.50, targetPrice: 189.88, stopLossPrice: 160.98 },
    { symbol: 'MSFT', side: 'buy', status: 'pending', quantity: 100, price: 191.80, targetPrice: 205.95, stopLossPrice: 180.54 },
    { symbol: 'NVDA', side: 'buy', status: 'partial', quantity: 200, filledQuantity: 120, price: 485.50, targetPrice: 550.00, stopLossPrice: 450.00 },
    { symbol: 'AAPL', side: 'sell', status: 'filled', quantity: 50, price: 188.20, filledAt: new Date(now - 3600000 * 2).toISOString() },
    { symbol: 'GOOGL', side: 'buy', status: 'cancelled', quantity: 150, price: 138.50, cancelledAt: new Date(now - 3600000 * 5).toISOString() },
  ]
  
  orderTemplates.forEach((template, index) => {
    orders.push({
      id: `order_${Date.now()}_${index}`,
      symbol: template.symbol,
      stockName: STOCKS.find(s => s.symbol === template.symbol)?.name || template.symbol,
      side: template.side,
      quantity: template.quantity,
      filledQuantity: template.filledQuantity || (template.status === 'filled' ? template.quantity : 0),
      price: template.price,
      targetPrice: template.targetPrice,
      stopLossPrice: template.stopLossPrice,
      status: template.status,
      source: 'strategy',
      strategyName: 'AI 动量策略',
      createdAt: new Date(now - 3600000 * (index + 1)).toISOString(),
      filledAt: template.filledAt,
      cancelledAt: template.cancelledAt,
      updatedAt: new Date(now - 3600000 * index).toISOString()
    })
  })
  
  return orders
}

// 生成模拟交易历史记录
const generateFakeTrades = () => {
  const now = new Date()
  const trades = []
  
  const tradeTemplates = [
    { symbol: 'AAPL', type: 'buy', quantity: 100, price: 178.25, pnl: null },
    { symbol: 'NVDA', type: 'buy', quantity: 50, price: 465.80, pnl: null },
    { symbol: 'TSLA', type: 'sell', quantity: 30, price: 255.60, pnl: 1250.40 },
    { symbol: 'GOOGL', type: 'buy', quantity: 80, price: 135.20, pnl: null },
    { symbol: 'META', type: 'sell', quantity: 40, price: 365.80, pnl: 892.00 },
    { symbol: 'MSFT', type: 'buy', quantity: 60, price: 365.50, pnl: null },
    { symbol: 'AMZN', type: 'sell', quantity: 25, price: 158.90, pnl: -325.00 },
    { symbol: 'JPM', type: 'buy', quantity: 70, price: 168.30, pnl: null },
    { symbol: 'AAPL', type: 'sell', quantity: 50, price: 189.50, pnl: 562.50 },
    { symbol: 'NVDA', type: 'sell', quantity: 20, price: 510.25, pnl: 889.00 },
    { symbol: 'TSLA', type: 'buy', quantity: 45, price: 242.80, pnl: null },
    { symbol: 'META', type: 'buy', quantity: 35, price: 348.60, pnl: null },
  ]
  
  tradeTemplates.forEach((template, index) => {
    const daysAgo = Math.floor(index / 2)
    const hoursAgo = (index % 4) * 3 + Math.floor(Math.random() * 3)
    const tradeTime = new Date(now - 86400000 * daysAgo - 3600000 * hoursAgo)
    
    trades.push({
      id: `trade_${Date.now()}_${index}`,
      symbol: template.symbol,
      name: STOCKS.find(s => s.symbol === template.symbol)?.name || template.symbol,
      type: template.type,
      quantity: template.quantity,
      price: template.price,
      amount: parseFloat((template.quantity * template.price).toFixed(2)),
      pnl: template.pnl,
      timestamp: tradeTime.toISOString(),
      source: index % 3 === 0 ? 'strategy' : 'manual',
      orderId: index % 3 === 0 ? `order_${Date.now()}_${index}` : null
    })
  })
  
  // 按时间倒序排列
  return trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

export function useBrokerAccount() {
  // 检查是否有已连接的账户
  const hasConnectedAccounts = computed(() => brokerAccounts.value.length > 0)
  
  // 当前选中的账户
  const currentAccount = computed(() => {
    if (!selectedAccountId.value || brokerAccounts.value.length === 0) return null
    return brokerAccounts.value.find(acc => acc.id === selectedAccountId.value) || brokerAccounts.value[0]
  })
  
  // 获取已连接的券商 ID 列表（用于检查是否已连接某券商）
  const connectedBrokerIds = computed(() => {
    return brokerAccounts.value.map(acc => acc.broker.id)
  })
  
  // 从 localStorage 加载账户信息
  const loadAccounts = () => {
    try {
      const stored = localStorage.getItem('broker_accounts')
      if (stored) {
        brokerAccounts.value = JSON.parse(stored)
        // 自动选中第一个账户
        if (brokerAccounts.value.length > 0 && !selectedAccountId.value) {
          selectedAccountId.value = brokerAccounts.value[0].id
        }
      }
      
      // 兼容旧版单账户数据
      const oldData = localStorage.getItem('broker_account')
      if (oldData && brokerAccounts.value.length === 0) {
        const oldAccount = JSON.parse(oldData)
        brokerAccounts.value = [oldAccount]
        selectedAccountId.value = oldAccount.id
        saveAccounts()
        localStorage.removeItem('broker_account')
      }
    } catch (error) {
      console.error('Failed to load broker accounts:', error)
    }
  }
  
  // 保存账户到 localStorage
  const saveAccounts = () => {
    localStorage.setItem('broker_accounts', JSON.stringify(brokerAccounts.value))
  }
  
  // 选择账户
  const selectAccount = (accountId) => {
    if (brokerAccounts.value.find(acc => acc.id === accountId)) {
      selectedAccountId.value = accountId
    }
  }
  
  // 模拟 OAuth 认证流程
  const simulateOAuth = (broker) => {
    return new Promise((resolve) => {
      // 模拟认证延迟
      setTimeout(() => {
        const holdings = generateFakeHoldings()
        const orders = generateFakeOrders()
        const trades = generateFakeTrades()
        const marketValue = holdings.reduce((sum, h) => sum + h.marketValue, 0)
        const costBasis = holdings.reduce((sum, h) => sum + h.costBasis, 0)
        const totalPnl = marketValue - costBasis
        const balance = 10000 + Math.random() * 50000
        
        resolve({
          accountNumber: `U${Math.floor(10000000 + Math.random() * 90000000)}`,
          balance: parseFloat(balance.toFixed(2)),
          marketValue: parseFloat(marketValue.toFixed(2)),
          totalPnl: parseFloat(totalPnl.toFixed(2)),
          dailyPnl: parseFloat((Math.random() * 2000 - 500).toFixed(2)),
          holdings,
          orders,
          trades
        })
      }, 2500)
    })
  }
  
  // 连接券商账户（添加新账户）
  const connectAccount = async (brokerInfo) => {
    // 检查是否已经连接过这个券商
    if (connectedBrokerIds.value.includes(brokerInfo.id)) {
      return { success: false, error: 'Already connected' }
    }
    
    isConnecting.value = true
    
    try {
      // 模拟 OAuth 认证
      const accountData = await simulateOAuth(brokerInfo)
      
      const newAccount = {
        id: `acc_${Date.now()}`,
        broker: brokerInfo,
        accountNumber: accountData.accountNumber,
        balance: accountData.balance,
        marketValue: accountData.marketValue,
        totalAssets: parseFloat((accountData.balance + accountData.marketValue).toFixed(2)),
        totalPnl: accountData.totalPnl,
        dailyPnl: accountData.dailyPnl,
        holdings: accountData.holdings,
        orders: accountData.orders,
        trades: accountData.trades,
        connectedAt: new Date().toISOString(),
        lastSyncAt: new Date().toISOString(),
        status: 'active'
      }
      
      // 添加到账户列表
      brokerAccounts.value.push(newAccount)
      
      // 自动选中新添加的账户
      selectedAccountId.value = newAccount.id
      
      // 保存到 localStorage
      saveAccounts()
      
      return { success: true, account: newAccount }
    } catch (error) {
      console.error('Failed to connect broker account:', error)
      return { success: false, error }
    } finally {
      isConnecting.value = false
    }
  }
  
  // 断开券商账户（移除特定账户）
  const disconnectAccount = (accountId = null, skipConfirm = false) => {
    const targetId = accountId || selectedAccountId.value
    if (!targetId) return false
    
    const account = brokerAccounts.value.find(acc => acc.id === targetId)
    if (!account) return false
    
    const confirmMsg = `Are you sure you want to disconnect ${account.broker.name}?`
    if (skipConfirm || confirm(confirmMsg)) {
      brokerAccounts.value = brokerAccounts.value.filter(acc => acc.id !== targetId)
      
      // 如果删除的是当前选中的账户，切换到其他账户
      if (selectedAccountId.value === targetId) {
        selectedAccountId.value = brokerAccounts.value.length > 0 ? brokerAccounts.value[0].id : null
      }
      
      saveAccounts()
      return true
    }
    return false
  }
  
  // 刷新当前选中账户的数据
  const refreshAccount = async (accountId = null) => {
    const targetId = accountId || selectedAccountId.value
    if (!targetId) return { success: false }
    
    const accountIndex = brokerAccounts.value.findIndex(acc => acc.id === targetId)
    if (accountIndex === -1) return { success: false }
    
    try {
      // 模拟刷新数据
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const account = brokerAccounts.value[accountIndex]
      
      // 更新持仓价格（模拟市场波动）
      const holdings = account.holdings.map(h => {
        const priceChange = 1 + (Math.random() * 0.04 - 0.02)
        const newPrice = parseFloat((h.currentPrice * priceChange).toFixed(2))
        const newMarketValue = parseFloat((h.quantity * newPrice).toFixed(2))
        const newPnl = parseFloat((newMarketValue - h.costBasis).toFixed(2))
        const newPnlPercent = parseFloat(((newPnl / h.costBasis) * 100).toFixed(2))
        
        return {
          ...h,
          currentPrice: newPrice,
          marketValue: newMarketValue,
          pnl: newPnl,
          pnlPercent: newPnlPercent
        }
      })
      
      const marketValue = holdings.reduce((sum, h) => sum + h.marketValue, 0)
      const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0)
      
      // 更新账户数据
      brokerAccounts.value[accountIndex] = {
        ...account,
        holdings,
        marketValue: parseFloat(marketValue.toFixed(2)),
        totalAssets: parseFloat((account.balance + marketValue).toFixed(2)),
        totalPnl: parseFloat(totalPnl.toFixed(2)),
        dailyPnl: parseFloat((Math.random() * 2000 - 500).toFixed(2)),
        lastSyncAt: new Date().toISOString()
      }
      
      // 保存更新
      saveAccounts()
      
      return { success: true }
    } catch (error) {
      console.error('Failed to refresh account:', error)
      return { success: false, error }
    }
  }
  
  // 格式化金额 (USD)
  const formatMoney = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount)
  }
  
  // 计算最后同步时间
  const getLastSyncText = (lastSyncAt, locale = 'en') => {
    if (!lastSyncAt) return locale === 'zh' ? '未同步' : 'Not synced'
    
    const now = new Date()
    const lastSync = new Date(lastSyncAt)
    const diffMs = now - lastSync
    const diffMins = Math.floor(diffMs / 60000)
    
    if (locale === 'zh') {
      if (diffMins < 1) return '刚刚'
      if (diffMins < 60) return `${diffMins}分钟前`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours}小时前`
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}天前`
    } else {
      if (diffMins < 1) return 'Just now'
      if (diffMins < 60) return `${diffMins} min ago`
      const diffHours = Math.floor(diffMins / 60)
      if (diffHours < 24) return `${diffHours}h ago`
      const diffDays = Math.floor(diffHours / 24)
      return `${diffDays}d ago`
    }
  }
  
  return {
    // 状态
    brokerAccounts,
    selectedAccountId,
    currentAccount,
    hasConnectedAccounts,
    connectedBrokerIds,
    isConnecting,
    
    // 方法
    loadAccounts,
    selectAccount,
    connectAccount,
    disconnectAccount,
    refreshAccount,
    
    // 工具函数
    formatMoney,
    getLastSyncText
  }
}