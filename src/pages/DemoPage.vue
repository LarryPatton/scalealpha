<template>
  <div class="bg-[#1a1a1a] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-3xl font-bold text-white mb-2">Workflow 动画效果演示</h1>
      <p class="text-gray-400 mb-12">请选择最适合产品展示的动态效果方案</p>

      <!-- 效果 1: 顺序点亮 -->
      <section class="mb-16">
        <h2 class="text-xl font-semibold text-white mb-6 flex items-center">
          <span class="w-6 h-6 rounded-full bg-blue-500 text-xs flex items-center justify-center mr-3">1</span>
          方案一：顺序点亮 (Sequential Activation)
        </h2>
        <div class="bg-[#2a2a2a] p-10 rounded-xl border border-[#404040] overflow-hidden">
          <div class="flex items-center justify-between relative max-w-3xl mx-auto">
            <!-- 这里的代码将在后续步骤中实现 -->
            <!-- Connecting Line Background -->
            <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>
            
            <!-- Steps -->
            <div v-for="(step, index) in steps" :key="step.id" class="relative z-10 flex flex-col items-center">
              <!-- Step Circle/Box -->
              <div 
                class="w-32 h-10 rounded-lg flex items-center justify-center transition-all duration-500 border"
                :class="[
                  activeStep1 >= index 
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : 'bg-[#1a1a1a] border-gray-600 text-gray-500'
                ]"
              >
                <div 
                  class="w-2 h-2 rounded-full mr-2 transition-colors duration-500"
                  :class="activeStep1 >= index ? 'bg-blue-400' : 'bg-gray-600'"
                ></div>
                <span class="font-medium text-sm">{{ step.label }}</span>
              </div>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-6 text-center">模拟用户逐步完成任务的过程，强调步骤的顺序性。</p>
        </div>
      </section>

      <!-- 效果 2: 信号流动 -->
      <section class="mb-16">
        <h2 class="text-xl font-semibold text-white mb-6 flex items-center">
          <span class="w-6 h-6 rounded-full bg-purple-500 text-xs flex items-center justify-center mr-3">2</span>
          方案二：信号流动 (Signal Flow)
        </h2>
        <div class="bg-[#2a2a2a] p-10 rounded-xl border border-[#404040] overflow-hidden">
          <div class="flex items-center justify-between relative max-w-3xl mx-auto">
             <!-- Connecting Line Background -->
             <div class="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0 overflow-hidden">
               <!-- Moving Signal -->
               <div class="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-signal-flow"></div>
             </div>
             
             <!-- Steps -->
             <div v-for="step in steps" :key="step.id" class="relative z-10 flex flex-col items-center group">
               <!-- Step Circle/Box -->
               <div class="w-32 h-10 rounded-lg flex items-center justify-center bg-[#1a1a1a] border border-gray-600 text-gray-400 group-hover:border-purple-500 group-hover:text-purple-400 transition-colors duration-300 z-10 relative">
                 <div class="w-2 h-2 rounded-full mr-2 bg-gray-600 group-hover:bg-purple-400 transition-colors"></div>
                 <span class="font-medium text-sm">{{ step.label }}</span>
               </div>
               <!-- Pulse Effect behind the box -->
               <div class="absolute inset-0 bg-purple-500/20 rounded-lg blur-md opacity-0 animate-pulse-step"></div>
             </div>
          </div>
          <p class="text-sm text-gray-500 mt-6 text-center">光点在路径上流动，强调数据的连通性和实时性。</p>
        </div>
      </section>

      <!-- 效果 3: 进度填充 -->
      <section class="mb-16">
        <h2 class="text-xl font-semibold text-white mb-6 flex items-center">
          <span class="w-6 h-6 rounded-full bg-green-500 text-xs flex items-center justify-center mr-3">3</span>
          方案三：进度填充 (Progress Fill)
        </h2>
        <div class="bg-[#2a2a2a] p-10 rounded-xl border border-[#404040] overflow-hidden">
          <div class="flex items-center justify-between relative max-w-3xl mx-auto">
             <!-- Background Track -->
             <div class="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 z-0 rounded-full"></div>
             
             <!-- Progress Bar -->
             <div class="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full transition-all duration-100 ease-linear" :style="{ width: progress3 + '%' }"></div>
             
             <!-- Steps -->
             <div v-for="(step, index) in steps" :key="step.id" class="relative z-10 flex flex-col items-center">
               <!-- Step Circle/Box -->
               <div 
                 class="w-32 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border"
                 :class="[
                   progress3 >= (index / (steps.length - 1)) * 100 
                     ? 'bg-[#1a1a1a] border-green-500 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                     : 'bg-[#1a1a1a] border-gray-600 text-gray-500'
                 ]"
               >
                 <div 
                   class="w-2 h-2 rounded-full mr-2 transition-colors duration-300"
                   :class="progress3 >= (index / (steps.length - 1)) * 100 ? 'bg-green-400' : 'bg-gray-600'"
                 ></div>
                 <span class="font-medium text-sm">{{ step.label }}</span>
               </div>
             </div>
          </div>
          <p class="text-sm text-gray-500 mt-6 text-center">平滑的进度条填充效果，给人一种流畅、快速的体验感。</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Shared data for the steps
const steps = [
  { id: 1, label: 'Info', icon: 'info' },
  { id: 2, label: '我的信息', icon: 'user' },
  { id: 3, label: '机会发现', icon: 'search' },
  { id: 4, label: '计划制定', icon: 'plan' }
]

// Effect 1: Sequential Activation
const activeStep1 = ref(-1)
let timer1

const startEffect1 = () => {
  let step = 0
  timer1 = setInterval(() => {
    activeStep1.value = step
    step++
    if (step >= steps.length) {
      setTimeout(() => {
        activeStep1.value = -1
        step = 0
      }, 1000)
    }
  }, 800)
}

onMounted(() => {
  startEffect1()
})

onUnmounted(() => {
  if (timer1) clearInterval(timer1)
})

// Effect 3: Progress Fill
const progress3 = ref(0)
let timer3

const startEffect3 = () => {
  let p = 0
  timer3 = setInterval(() => {
    p += 1
    if (p > 110) { // Go a bit beyond 100 to pause
      p = 0
    }
    progress3.value = Math.min(p, 100)
  }, 30) // Update every 30ms for smooth animation
}

onMounted(() => {
  startEffect1()
  startEffect3()
})

onUnmounted(() => {
  if (timer1) clearInterval(timer1)
  if (timer3) clearInterval(timer3)
})
</script>

<style scoped>
/* 基础样式将在后续添加 */
@keyframes signal-flow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

.animate-signal-flow {
  animation: signal-flow 3s linear infinite;
}

@keyframes pulse-step {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* Staggered animation for steps to match the signal flow */
.animate-pulse-step {
  animation: pulse-step 3s linear infinite;
}

.group:nth-child(2) .animate-pulse-step { animation-delay: 0s; } /* Step 1 */
.group:nth-child(3) .animate-pulse-step { animation-delay: 0.75s; } /* Step 2 */
.group:nth-child(4) .animate-pulse-step { animation-delay: 1.5s; } /* Step 3 */
.group:nth-child(5) .animate-pulse-step { animation-delay: 2.25s; } /* Step 4 */
</style>