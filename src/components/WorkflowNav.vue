<template>
  <nav class="bg-[#2a2a2a] border-b border-[#404040] sticky top-0 z-50">
    <div class="w-full px-6 lg:px-12">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ScaleAlpha.ai
          </span>
        </router-link>

        <!-- Workflow Steps -->
        <div class="flex-1 flex items-center justify-center mx-8">
          <div class="flex items-center gap-1">
            <div 
              v-for="(step, index) in steps" 
              :key="step.id"
              class="flex items-center"
            >
              <!-- Step Item -->
              <button
                @click="handleStepClick(step)"
                :disabled="step.status === 'locked'"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300',
                  'relative group',
                  getStepClasses(step.status)
                ]"
              >
                <!-- Small Dot Indicator -->
                <div 
                  :class="[
                    'w-2 h-2 rounded-full transition-all duration-300',
                    getDotClasses(step.status)
                  ]"
                ></div>

                <!-- Step Label -->
                <span 
                  :class="[
                    'font-medium text-sm whitespace-nowrap transition-all duration-300',
                    getLabelClasses(step.status)
                  ]"
                >
                  {{ step.label }}
                </span>

                <!-- Tooltip for locked steps -->
                <div 
                  v-if="step.status === 'locked'" 
                  class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10"
                >
                  完成前置步骤后解锁
                </div>
              </button>

              <!-- Connector Line -->
              <div 
                v-if="index < steps.length - 1"
                :class="[
                  'w-8 h-0.5 transition-all duration-300',
                  getConnectorClasses(step.status, steps[index + 1].status)
                ]"
              ></div>
            </div>
          </div>
        </div>

        <!-- Right Icons -->
        <div class="flex items-center gap-4 flex-shrink-0">
          <!-- User Avatar -->
          <div class="relative group">
            <button class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition border border-yellow-300">
              U
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#404040] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
              <div class="px-4 py-2 border-b border-[#404040] text-sm text-gray-400">
                <p class="font-semibold">{{ userEmail }}</p>
              </div>
              <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">账户设置</router-link>
              <router-link to="/portfolio" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">我的投资组合</router-link>
              <button @click="handleResetProgress" class="w-full text-left px-4 py-2 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-[#3a3a3a]">
                重置进度
              </button>
              <a href="#" class="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#3a3a3a]">帮助</a>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#3a3a3a] border-t border-[#404040] rounded-b-lg">
                登出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkflowProgress } from '../composables/useWorkflowProgress'

const emit = defineEmits(['logout'])
const route = useRoute()

const userEmail = ref('')

// 使用工作流进度管理
const { 
  stepsWithStatus: steps, 
  navigateToStep, 
  loadProgress,
  markCurrentPageVisited,
  resetProgress
} = useWorkflowProgress()

// 初始化
onMounted(() => {
  const savedEmail = localStorage.getItem('userEmail')
  if (savedEmail) {
    userEmail.value = savedEmail
  }
  
  // 加载工作流进度
  loadProgress()
  
  // 标记当前页面为已访问
  markCurrentPageVisited()
})

// 监听路由变化，自动标记页面为已访问
watch(() => route.path, () => {
  markCurrentPageVisited()
})

// 处理步骤点击
const handleStepClick = (step) => {
  if (step.status === 'locked') {
    return
  }
  navigateToStep(step.id)
}

// 获取步骤按钮的样式类
const getStepClasses = (status) => {
  switch (status) {
    case 'current':
      return 'bg-blue-600/20 hover:bg-blue-600/30 cursor-pointer border border-blue-500/50'
    case 'completed':
      return 'bg-blue-600/10 hover:bg-blue-600/20 cursor-pointer border border-transparent'
    case 'available':
      return 'bg-transparent hover:bg-[#3a3a3a] cursor-pointer border border-transparent'
    case 'locked':
      return 'bg-transparent cursor-not-allowed border border-transparent'
    default:
      return 'bg-transparent border border-transparent'
  }
}

// 获取小圆点的样式类
const getDotClasses = (status) => {
  switch (status) {
    case 'current':
      return 'bg-blue-500 shadow-lg shadow-blue-500/50'
    case 'completed':
      return 'bg-blue-500'
    case 'available':
      return 'bg-gray-600'
    case 'locked':
      return 'bg-gray-700'
    default:
      return 'bg-gray-700'
  }
}

// 获取标签的样式类
const getLabelClasses = (status) => {
  switch (status) {
    case 'current':
      return 'text-white'
    case 'completed':
      return 'text-gray-300'
    case 'available':
      return 'text-gray-400'
    case 'locked':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
}

// 获取连接线的样式类
const getConnectorClasses = (currentStatus, nextStatus) => {
  // 如果当前步骤已完成，连接线为蓝色
  if (currentStatus === 'completed') {
    return 'bg-blue-500'
  }
  // 如果当前步骤是当前页面，连接线为蓝色渐变
  if (currentStatus === 'current') {
    return 'bg-gradient-to-r from-blue-500 to-gray-700'
  }
  // 其他情况为灰色
  return 'bg-gray-700'
}

// 重置进度
const handleResetProgress = () => {
  if (confirm('确定要重置工作流进度吗？这将清除所有已完成的步骤标记。')) {
    resetProgress()
  }
}

// 登出
const handleLogout = () => {
  emit('logout')
}
</script>
