import { ref, computed } from 'vue'

// 用户信息完成状态
const isUserInfoCompleted = ref(false)

// 检查localStorage中的用户信息
const checkUserInfoStatus = () => {
  try {
    // 检查PortfolioInputPage中保存的关键数据
    const holdings = localStorage.getItem('user_holdings')
    const riskAssessment = localStorage.getItem('riskAssessmentResult')
    
    // 至少需要完成持仓信息（必填项）
    if (holdings) {
      const holdingsData = JSON.parse(holdings)
      // 检查是否有有效的持仓数据
      if (holdingsData && holdingsData.length > 0) {
        isUserInfoCompleted.value = true
        return true
      }
    }
    
    isUserInfoCompleted.value = false
    return false
  } catch (error) {
    console.error('检查用户信息状态失败:', error)
    isUserInfoCompleted.value = false
    return false
  }
}

// 初始化时检查状态
checkUserInfoStatus()

// 监听localStorage变化（跨标签页同步）
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'user_holdings' || e.key === 'riskAssessmentResult') {
      checkUserInfoStatus()
    }
  })
}

// 重置用户信息
const resetUserProfile = () => {
  try {
    // 清除用户相关的localStorage数据
    const keysToRemove = [
      'user_holdings',
      'riskAssessmentResult',
      'scaleAlpha_userProfile'
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    // 更新状态
    isUserInfoCompleted.value = false
    
    return true
  } catch (error) {
    console.error('重置用户信息失败:', error)
    return false
  }
}

export function useUserProfile() {
  return {
    isUserInfoCompleted: computed(() => isUserInfoCompleted.value),
    checkUserInfoStatus,
    refreshStatus: checkUserInfoStatus,
    resetUserProfile
  }
}
