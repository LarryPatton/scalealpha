import { ref, computed } from 'vue'

// 全局共享的券商账户状态
const brokerAccount = ref(null)
const isConnecting = ref(false)

// 支持的券商列表
export const SUPPORTED_BROKERS = [
  {
    id: 'huatai',
    name: '华泰证券',
    color: '#FF6B35'
  },
  {
    id: 'citic',
    name: '中信证券',
    color: '#E74C3C'
  },
  {
    id: 'zhaoshan',
    name: '招商证券',
    color: '#3498DB'
  },
  {
    id: 'guotai',
    name: '国泰君安',
    color: '#9B59B6'
  },
  {
    id: 'haitong',
    name: '海通证券',
    color: '#16A085'
  },
  {
    id: 'guangfa',
    name: '广发证券',
    color: '#E67E22'
  }
]

export function useBrokerAccount() {
  // 检查是否已关联
  const isConnected = computed(() => !!brokerAccount.value)
  
  // 从 localStorage 加载账户信息
  const loadAccount = () => {
    try {
      const stored = localStorage.getItem('broker_account')
      if (stored) {
        brokerAccount.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load broker account:', error)
    }
  }
  
  // 模拟 OAuth 认证流程
  const simulateOAuth = (broker) => {
    return new Promise((resolve) => {
      // 模拟认证延迟
      setTimeout(() => {
        resolve({
          accountNumber: `${Math.floor(1000 + Math.random() * 9000)}****${Math.floor(1000 + Math.random() * 9000)}`,
          balance: Math.floor(50000 + Math.random() * 500000),
          marketValue: Math.floor(100000 + Math.random() * 900000)
        })
      }, 2000)
    })
  }
  
  // 连接券商账户
  const connectAccount = async (brokerInfo) => {
    isConnecting.value = true
    
    try {
      // 模拟 OAuth 认证
      const accountData = await simulateOAuth(brokerInfo)
      
      brokerAccount.value = {
        id: `acc_${Date.now()}`,
        broker: brokerInfo,
        accountNumber: accountData.accountNumber,
        balance: accountData.balance,
        marketValue: accountData.marketValue,
        totalAssets: accountData.balance + accountData.marketValue,
        connectedAt: new Date().toISOString(),
        lastSyncAt: new Date().toISOString(),
        status: 'active'
      }
      
      // 保存到 localStorage
      localStorage.setItem('broker_account', JSON.stringify(brokerAccount.value))
      
      return { success: true }
    } catch (error) {
      console.error('Failed to connect broker account:', error)
      return { success: false, error }
    } finally {
      isConnecting.value = false
    }
  }
  
  // 断开券商账户
  const disconnectAccount = () => {
    if (confirm('确定要解除券商账户关联吗？解除后将无法使用一键交易功能。')) {
      brokerAccount.value = null
      localStorage.removeItem('broker_account')
      return true
    }
    return false
  }
  
  // 刷新账户数据
  const refreshAccount = async () => {
    if (!brokerAccount.value) return
    
    try {
      // 模拟刷新数据
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新余额和市值（模拟数据变化）
      brokerAccount.value.balance = Math.floor(50000 + Math.random() * 500000)
      brokerAccount.value.marketValue = Math.floor(100000 + Math.random() * 900000)
      brokerAccount.value.totalAssets = brokerAccount.value.balance + brokerAccount.value.marketValue
      brokerAccount.value.lastSyncAt = new Date().toISOString()
      
      // 保存更新
      localStorage.setItem('broker_account', JSON.stringify(brokerAccount.value))
      
      return { success: true }
    } catch (error) {
      console.error('Failed to refresh account:', error)
      return { success: false, error }
    }
  }
  
  // 格式化金额
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2
    }).format(amount)
  }
  
  // 计算最后同步时间
  const getLastSyncText = () => {
    if (!brokerAccount.value?.lastSyncAt) return '未同步'
    
    const now = new Date()
    const lastSync = new Date(brokerAccount.value.lastSyncAt)
    const diffMs = now - lastSync
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return '刚刚'
    if (diffMins < 60) return `${diffMins}分钟前`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}小时前`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}天前`
  }
  
  return {
    // 状态
    brokerAccount,
    isConnected,
    isConnecting,
    
    // 方法
    loadAccount,
    connectAccount,
    disconnectAccount,
    refreshAccount,
    
    // 工具函数
    formatMoney,
    getLastSyncText
  }
}
