import { ref, computed } from 'vue'

// 全局共享的模拟盘状态
const portfolios = ref([])

export function usePaperPortfolios() {
  // 从 localStorage 加载模拟盘
  const loadPortfolios = () => {
    try {
      const stored = localStorage.getItem('paper_portfolios')
      if (stored) {
        portfolios.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load portfolios:', error)
    }
  }
  
  // 保存到 localStorage
  const savePortfolios = () => {
    localStorage.setItem('paper_portfolios', JSON.stringify(portfolios.value))
  }
  
  // 获取所有模拟盘
  const allPortfolios = computed(() => portfolios.value)
  
  // 检查是否有模拟盘
  const hasPortfolios = computed(() => portfolios.value.length > 0)
  
  // 根据 ID 获取模拟盘
  const getPortfolioById = (id) => {
    return portfolios.value.find(p => p.id === id)
  }
  
  // 添加订单到模拟盘
  const addOrderToPortfolio = (portfolioId, order) => {
    const index = portfolios.value.findIndex(p => p.id === portfolioId)
    if (index === -1) return { success: false, error: 'Portfolio not found' }
    
    const portfolio = portfolios.value[index]
    
    // 初始化 orders 数组（如果不存在）
    if (!portfolio.orders) {
      portfolio.orders = []
    }
    
    // 添加订单
    const newOrder = {
      id: `order_${Date.now()}`,
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    portfolio.orders.push(newOrder)
    portfolio.updatedAt = new Date().toISOString()
    
    // 保存
    savePortfolios()
    
    return { success: true, order: newOrder }
  }
  
  // 执行订单（模拟成交）
  const executeOrder = (portfolioId, orderId) => {
    const portfolio = portfolios.value.find(p => p.id === portfolioId)
    if (!portfolio) return { success: false, error: 'Portfolio not found' }
    
    const order = portfolio.orders?.find(o => o.id === orderId)
    if (!order) return { success: false, error: 'Order not found' }
    
    // 检查资金是否充足
    const totalAmount = order.quantity * order.price
    if (order.side === 'buy' && portfolio.availableCash < totalAmount) {
      return { success: false, error: 'Insufficient cash' }
    }
    
    // 更新订单状态
    order.status = 'filled'
    order.filledAt = new Date().toISOString()
    order.updatedAt = new Date().toISOString()
    
    // 更新持仓
    if (order.side === 'buy') {
      // 买入
      portfolio.availableCash -= totalAmount
      
      const existingHolding = portfolio.holdings.find(h => h.symbol === order.symbol)
      if (existingHolding) {
        // 加仓
        const totalQty = existingHolding.quantity + order.quantity
        const totalCost = existingHolding.costBasis + totalAmount
        existingHolding.quantity = totalQty
        existingHolding.costBasis = totalCost
        existingHolding.costPrice = totalCost / totalQty
        existingHolding.currentPrice = order.price
        existingHolding.marketValue = totalQty * order.price
      } else {
        // 新建持仓
        portfolio.holdings.push({
          symbol: order.symbol,
          name: order.stockName || order.symbol,
          quantity: order.quantity,
          costPrice: order.price,
          currentPrice: order.price,
          costBasis: totalAmount,
          marketValue: totalAmount,
          pnl: 0,
          pnlPercent: 0
        })
      }
    } else {
      // 卖出
      portfolio.availableCash += totalAmount
      
      const existingHolding = portfolio.holdings.find(h => h.symbol === order.symbol)
      if (existingHolding) {
        existingHolding.quantity -= order.quantity
        if (existingHolding.quantity <= 0) {
          portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== order.symbol)
        } else {
          existingHolding.marketValue = existingHolding.quantity * order.price
        }
      }
    }
    
    // 添加交易记录
    if (!portfolio.trades) portfolio.trades = []
    portfolio.trades.push({
      id: `trade_${Date.now()}`,
      orderId: order.id,
      symbol: order.symbol,
      stockName: order.stockName,
      side: order.side,
      quantity: order.quantity,
      price: order.price,
      amount: totalAmount,
      executedAt: new Date().toISOString()
    })
    
    // 更新总资产
    const holdingsValue = portfolio.holdings.reduce((sum, h) => sum + h.marketValue, 0)
    portfolio.currentValue = portfolio.availableCash + holdingsValue
    portfolio.totalReturn = ((portfolio.currentValue - portfolio.initialCapital) / portfolio.initialCapital) * 100
    portfolio.updatedAt = new Date().toISOString()
    
    savePortfolios()
    
    return { success: true }
  }
  
  return {
    portfolios,
    allPortfolios,
    hasPortfolios,
    loadPortfolios,
    savePortfolios,
    getPortfolioById,
    addOrderToPortfolio,
    executeOrder
  }
}
