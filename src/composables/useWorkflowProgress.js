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
    id: 'opportunity', 
    label: '机会发现', 
    route: '/opportunity',
    icon: 'search'
  }
]

// 全局状态：用户的工作流进度
const userProgress = ref({
  hasViewedInfo: false,          // 是否浏览过Info页面
  hasInputPortfolio: false,      // 是否输入过持仓信息
  hasViewedOpportunity: false,   // 是否查看过机会发现
  hasCreatedPlan: false          // 是否制定过计划
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
  // 状态类型：'completed' | 'current' | 'available'
  // 注意：已移除 'locked' 状态，所有步骤都可以自由访问
  const getStepStatus = (stepId) => {
    const currentPath = route.path

    // 判断是否是当前页面
    const step = WORKFLOW_STEPS.find(s => s.id === stepId)
    if (!step) return 'available'

    const isCurrentPage = currentPath === step.route || currentPath.startsWith(step.route + '/')

    // 如果是当前页面，返回 'current'
    if (isCurrentPage) return 'current'

    // 根据不同步骤判断是否已完成
    switch (stepId) {
      case 'info':
        return userProgress.value.hasViewedInfo ? 'completed' : 'available'
      case 'opportunity':
        return userProgress.value.hasViewedOpportunity ? 'completed' : 'available'
      default:
        return 'available'
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

  // 跳转到某个步骤（移除锁定检查，允许自由访问）
  const navigateToStep = (stepId) => {
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
    } else if (currentPath === '/opportunity') {
      updateProgress('hasViewedOpportunity', true)
    }
  }

  // 重置工作流进度
  const resetProgress = () => {
    userProgress.value = {
      hasViewedInfo: false,
      hasInputPortfolio: false,
      hasViewedOpportunity: false,
      hasCreatedPlan: false
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
