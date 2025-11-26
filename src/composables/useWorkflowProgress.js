import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 工作流步骤定义
const WORKFLOW_STEPS = [
  { 
    id: 'info', 
    label: 'Info', 
    route: '/info',
    icon: 'info'
  },
  { 
    id: 'portfolio-input', 
    label: '我的信息', 
    route: '/portfolio-input',
    icon: 'edit'
  },
  { 
    id: 'opportunity', 
    label: '机会发现', 
    route: '/opportunity',
    icon: 'search'
  },
  { 
    id: 'planning', 
    label: '计划制定', 
    route: '/planning',
    icon: 'plan'
  },
  { 
    id: 'trade', 
    label: '一键交易', 
    route: '/trade',
    icon: 'trade'
  },
  { 
    id: 'review', 
    label: '交易复盘', 
    route: '/review',
    icon: 'review'
  }
]

// 全局状态：用户的工作流进度
const userProgress = ref({
  hasViewedInfo: false,          // 是否浏览过Info页面
  hasInputPortfolio: false,      // 是否输入过持仓信息
  hasViewedOpportunity: false,   // 是否查看过机会发现
  hasCreatedPlan: false,         // 是否制定过计划
  hasExecutedTrade: false,       // 是否执行过交易
  hasReviewedTrade: false        // 是否完成过交易复盘
})

export function useWorkflowProgress() {
  const router = useRouter()
  const route = useRoute()

  // 从 localStorage 加载用户进度
  const loadProgress = () => {
    const saved = localStorage.getItem('workflow_progress')
    if (saved) {
      try {
        userProgress.value = { ...userProgress.value, ...JSON.parse(saved) }
      } catch (e) {
        console.error('Failed to load workflow progress:', e)
      }
    }
  }

  // 保存用户进度到 localStorage
  const saveProgress = () => {
    localStorage.setItem('workflow_progress', JSON.stringify(userProgress.value))
  }

  // 更新特定步骤的完成状态
  const updateProgress = (key, value = true) => {
    userProgress.value[key] = value
    saveProgress()
  }

  // 计算每个步骤的状态
  // 状态类型：'completed' | 'current' | 'locked' | 'available'
  const getStepStatus = (stepId) => {
    const currentPath = route.path

    // 判断是否是当前页面
    const step = WORKFLOW_STEPS.find(s => s.id === stepId)
    if (!step) return 'locked'

    const isCurrentPage = currentPath === step.route || currentPath.startsWith(step.route + '/')

    switch (stepId) {
      case 'info':
        // Info 页面始终可访问
        if (isCurrentPage) return 'current'
        return userProgress.value.hasViewedInfo ? 'completed' : 'available'

      case 'portfolio-input':
        // 我的信息：浏览过Info后解锁
        if (!userProgress.value.hasViewedInfo) return 'locked'
        if (isCurrentPage) return 'current'
        return userProgress.value.hasInputPortfolio ? 'completed' : 'available'

      case 'opportunity':
        // 机会发现：输入持仓后解锁
        if (!userProgress.value.hasInputPortfolio) return 'locked'
        if (isCurrentPage) return 'current'
        return userProgress.value.hasViewedOpportunity ? 'completed' : 'available'

      case 'planning':
        // 计划制定：查看机会后解锁
        if (!userProgress.value.hasViewedOpportunity) return 'locked'
        if (isCurrentPage) return 'current'
        return userProgress.value.hasCreatedPlan ? 'completed' : 'available'

      case 'trade':
        // 一键交易：制定计划后解锁
        if (!userProgress.value.hasCreatedPlan) return 'locked'
        if (isCurrentPage) return 'current'
        return userProgress.value.hasExecutedTrade ? 'completed' : 'available'

      case 'review':
        // 交易复盘：执行交易后解锁
        if (!userProgress.value.hasExecutedTrade) return 'locked'
        if (isCurrentPage) return 'current'
        return userProgress.value.hasReviewedTrade ? 'completed' : 'available'

      default:
        return 'locked'
    }
  }

  // 获取所有步骤及其状态
  const stepsWithStatus = computed(() => {
    return WORKFLOW_STEPS.map((step, index) => ({
      ...step,
      number: index + 1,
      status: getStepStatus(step.id)
    }))
  })

  // 获取当前步骤索引
  const currentStepIndex = computed(() => {
    const currentPath = route.path
    return WORKFLOW_STEPS.findIndex(step => 
      currentPath === step.route || currentPath.startsWith(step.route + '/')
    )
  })

  // 跳转到某个步骤（如果已解锁）
  const navigateToStep = (stepId) => {
    const status = getStepStatus(stepId)
    if (status === 'locked') {
      console.warn(`Step ${stepId} is locked`)
      return false
    }

    const step = WORKFLOW_STEPS.find(s => s.id === stepId)
    if (step) {
      router.push(step.route)
      return true
    }
    return false
  }

  // 标记当前页面为已访问
  const markCurrentPageVisited = () => {
    const currentPath = route.path
    
    if (currentPath === '/info' || currentPath.startsWith('/info/')) {
      updateProgress('hasViewedInfo', true)
    } else if (currentPath === '/portfolio-input') {
      updateProgress('hasInputPortfolio', true)
    } else if (currentPath === '/opportunity') {
      updateProgress('hasViewedOpportunity', true)
    } else if (currentPath === '/planning') {
      updateProgress('hasCreatedPlan', true)
    } else if (currentPath === '/trade') {
      updateProgress('hasExecutedTrade', true)
    } else if (currentPath === '/review') {
      updateProgress('hasReviewedTrade', true)
    }
  }

  // 重置工作流进度
  const resetProgress = () => {
    userProgress.value = {
      hasViewedInfo: false,
      hasInputPortfolio: false,
      hasViewedOpportunity: false,
      hasCreatedPlan: false,
      hasExecutedTrade: false,
      hasReviewedTrade: false
    }
    saveProgress()
  }

  return {
    // 状态
    userProgress,
    stepsWithStatus,
    currentStepIndex,
    
    // 方法
    loadProgress,
    updateProgress,
    getStepStatus,
    navigateToStep,
    markCurrentPageVisited,
    resetProgress
  }
}
