/**
 * useSubscription - 用户订阅状态管理
 * 管理用户当前套餐、积分余额、订阅历史等
 */

import { ref, computed } from 'vue'

// 套餐配置数据
const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    credits: 0,
    features: [
      '30天试用期，无限制浏览',
      '免费赠送100积分'
    ]
  },
  plus: {
    id: 'plus',
    name: 'Plus',
    price: { monthly: 9, yearly: 90 },
    credits: 0,
    features: [
      '无限制浏览机会报告',
      '无限制浏览事件报告',
      '无限制使用历史回测工具',
      '订制化推送通知',
      '官方实盘跟踪'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: { monthly: 29, yearly: 290 },
    credits: 1000,
    isPopular: true,
    features: [
      'Plus全部功能',
      '1000积分/月',
      '大约90美分找一个可能赚钱的机会',
      '大约30美分得到一份专业交易计划做参考'
    ]
  },
  max: {
    id: 'max',
    name: 'Max',
    price: { monthly: 99, yearly: 990 },
    credits: 5000,
    features: [
      'Plus全部功能',
      '5000积分/月',
      '大约60美分找一个可能赚钱的机会',
      '大约20美分得到一份专业交易计划做参考'
    ]
  }
}

// 功能对比数据
const COMPARISON_DATA = [
  { feature: '浏览', free: '试用期内', plus: '—', pro: '无限制浏览', max: '无限制浏览' },
  { feature: '发现新机会', free: '~3 试用期内', plus: '—', pro: '~33/月', max: '~166/月' },
  { feature: '更新机会', free: '~10 试用期内', plus: '—', pro: '~100/月', max: '~500/月' },
  { feature: '交易计划', free: '~10 试用期内', plus: '—', pro: '~100/月', max: '~500/月' },
  { feature: '深度研究', free: '~1 试用期内', plus: '—', pro: '~16/月', max: '~83/月' },
  { feature: '聊天消息', free: '~20 试用期内', plus: '—', pro: '~200/月', max: '~1000/月' }
]

// 持久化存储 key
const STORAGE_KEY = 'scalealpha_subscription'

// 从 localStorage 读取订阅状态
function loadSubscription() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.warn('Failed to load subscription:', e)
  }
  return null
}

// 保存订阅状态到 localStorage
function saveSubscription(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('Failed to save subscription:', e)
  }
}

// 全局状态
const currentPlanId = ref(loadSubscription()?.planId || 'free')
const billingCycle = ref(loadSubscription()?.billingCycle || 'monthly') // 'monthly' | 'yearly'
const creditsBalance = ref(loadSubscription()?.credits || 100) // 免费赠送100积分
const subscriptionDate = ref(loadSubscription()?.subscriptionDate || null)
const isUpgrading = ref(false)
const upgradeError = ref(null)

export function useSubscription() {
  // 计算属性
  const currentPlan = computed(() => PLANS[currentPlanId.value])
  
  const plans = computed(() => {
    return Object.values(PLANS).map(plan => ({
      ...plan,
      isCurrent: plan.id === currentPlanId.value,
      displayPrice: billingCycle.value === 'yearly' 
        ? plan.price.yearly 
        : plan.price.monthly,
      // 年付节省的金额
      yearlySavings: plan.price.monthly * 12 - plan.price.yearly
    }))
  })

  const comparisonData = computed(() => COMPARISON_DATA)

  // 年付折扣百分比
  const yearlyDiscount = computed(() => {
    return Math.round((1 - 10 / 12) * 100) // 约 17% 折扣
  })

  // 方法
  function setBillingCycle(cycle) {
    billingCycle.value = cycle
    persistState()
  }

  function canUpgrade(targetPlanId) {
    const planOrder = ['free', 'plus', 'pro', 'max']
    const currentIndex = planOrder.indexOf(currentPlanId.value)
    const targetIndex = planOrder.indexOf(targetPlanId)
    return targetIndex > currentIndex
  }

  function canDowngrade(targetPlanId) {
    const planOrder = ['free', 'plus', 'pro', 'max']
    const currentIndex = planOrder.indexOf(currentPlanId.value)
    const targetIndex = planOrder.indexOf(targetPlanId)
    return targetIndex < currentIndex
  }

  // 模拟升级流程
  async function upgradeToPlan(targetPlanId) {
    if (!canUpgrade(targetPlanId) && !canDowngrade(targetPlanId)) {
      throw new Error('无效的套餐变更')
    }

    isUpgrading.value = true
    upgradeError.value = null

    try {
      // 模拟 API 请求延迟
      await new Promise(resolve => setTimeout(resolve, 1500))

      // 模拟成功率 (90% 成功)
      if (Math.random() < 0.1) {
        throw new Error('支付处理失败，请稍后重试')
      }

      // 更新订阅状态
      const targetPlan = PLANS[targetPlanId]
      currentPlanId.value = targetPlanId
      subscriptionDate.value = new Date().toISOString()
      
      // 更新积分余额
      if (targetPlan.credits > 0) {
        creditsBalance.value += targetPlan.credits
      }

      persistState()

      return {
        success: true,
        message: `成功升级到 ${targetPlan.name} 套餐！`,
        plan: targetPlan
      }
    } catch (error) {
      upgradeError.value = error.message
      throw error
    } finally {
      isUpgrading.value = false
    }
  }

  // 重置为免费套餐（用于测试）
  function resetToFree() {
    currentPlanId.value = 'free'
    creditsBalance.value = 100
    subscriptionDate.value = null
    persistState()
  }

  // 持久化状态
  function persistState() {
    saveSubscription({
      planId: currentPlanId.value,
      billingCycle: billingCycle.value,
      credits: creditsBalance.value,
      subscriptionDate: subscriptionDate.value
    })
  }

  // 消费积分
  function consumeCredits(amount) {
    if (creditsBalance.value >= amount) {
      creditsBalance.value -= amount
      persistState()
      return true
    }
    return false
  }

  // 添加积分
  function addCredits(amount) {
    creditsBalance.value += amount
    persistState()
  }

  return {
    // 状态
    currentPlanId,
    currentPlan,
    plans,
    comparisonData,
    billingCycle,
    creditsBalance,
    subscriptionDate,
    isUpgrading,
    upgradeError,
    yearlyDiscount,
    
    // 方法
    setBillingCycle,
    canUpgrade,
    canDowngrade,
    upgradeToPlan,
    resetToFree,
    consumeCredits,
    addCredits
  }
}
