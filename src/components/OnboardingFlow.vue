<template>
  <Teleport to="body">
    <Transition name="onboarding-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] bg-[#1a1a1a] flex items-center justify-center overflow-hidden"
      >
        <!-- Content Container -->
        <Transition :name="transitionName" mode="out-in">
          <div :key="currentStep" class="w-full h-full flex flex-col items-center justify-center px-8">
            
            <!-- Progress Dots (Only show on question screens) -->
            <div v-if="currentStep >= 1 && currentStep <= 5" class="absolute top-12 flex gap-2">
              <div 
                v-for="dot in 5" 
                :key="dot"
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-300',
                  currentStep === dot ? 'bg-white w-8' : 'bg-gray-600'
                ]"
              />
            </div>

            <!-- Welcome Screen (Step 0) -->
            <div v-if="currentStep === 0" class="text-center max-w-2xl">
              <h1 class="text-5xl font-semibold text-white mb-4 tracking-tight">
                欢迎来到 ScaleAlpha.ai
              </h1>
              <p class="text-xl text-gray-400 mb-12">
                让我们帮您做好偏好设定。
              </p>
              
              <button 
                @click="nextStep"
                class="px-12 py-4 bg-white text-black text-lg font-medium rounded-full hover:scale-105 transition-transform duration-200"
              >
                开始
              </button>
              
              <button 
                @click="skipOnboarding"
                class="block mx-auto mt-8 text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                稍后跳过
              </button>
            </div>

            <!-- Question 1: Investor Profile -->
            <div v-else-if="currentStep === 1" class="w-full max-w-3xl">
              <h2 class="text-4xl font-semibold text-white text-center mb-12">
                您的主要"投资者画像"是哪一类？
              </h2>
              
              <div class="space-y-4">
                <button
                  v-for="option in questions[0].options"
                  :key="option.value"
                  @click="selectAnswer(0, option.value)"
                  :class="[
                    'w-full p-6 rounded-2xl border-2 text-left transition-all duration-200 group',
                    answers[0] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-[#2a2a2a] hover:border-gray-500 hover:scale-[1.02]'
                  ]"
                >
                  <div class="flex items-start gap-4">
                    <div class="text-2xl flex-shrink-0 mt-1">{{ option.icon }}</div>
                    <div class="flex-1">
                      <div class="text-lg font-semibold text-white mb-2">{{ option.label }}</div>
                      <div class="text-sm text-gray-400 leading-relaxed">{{ option.desc }}</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Question 2: Investment Experience -->
            <div v-else-if="currentStep === 2" class="w-full max-w-2xl">
              <h2 class="text-4xl font-semibold text-white text-center mb-12">
                您的投资经验如何？
              </h2>
              
              <div class="space-y-3">
                <button
                  v-for="option in questions[1].options"
                  :key="option.value"
                  @click="selectAnswer(1, option.value)"
                  :class="[
                    'w-full py-5 px-6 rounded-xl border-2 text-center transition-all duration-200',
                    answers[1] === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-500 hover:scale-[1.02]'
                  ]"
                >
                  <div class="text-lg font-medium">{{ option.label }}</div>
                </button>
              </div>
            </div>

            <!-- Question 3: Volatility Tolerance -->
            <div v-else-if="currentStep === 3" class="w-full max-w-2xl">
              <h2 class="text-4xl font-semibold text-white text-center mb-12">
                您能承受多大的短期波动？
              </h2>
              
              <div class="space-y-3">
                <button
                  v-for="option in questions[2].options"
                  :key="option.value"
                  @click="selectAnswer(2, option.value)"
                  :class="[
                    'w-full py-5 px-6 rounded-xl border-2 text-center transition-all duration-200',
                    answers[2] === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-500 hover:scale-[1.02]'
                  ]"
                >
                  <div class="text-lg font-medium">{{ option.label }}</div>
                </button>
              </div>
            </div>

            <!-- Question 4: Loss Reaction -->
            <div v-else-if="currentStep === 4" class="w-full max-w-2xl">
              <h2 class="text-4xl font-semibold text-white text-center mb-12">
                如果投资组合出现10%的账面亏损，您会？
              </h2>
              
              <div class="space-y-3">
                <button
                  v-for="option in questions[3].options"
                  :key="option.value"
                  @click="selectAnswer(3, option.value)"
                  :class="[
                    'w-full py-5 px-6 rounded-xl border-2 text-center transition-all duration-200',
                    answers[3] === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-500 hover:scale-[1.02]'
                  ]"
                >
                  <div class="text-lg font-medium">{{ option.label }}</div>
                </button>
              </div>
            </div>

            <!-- Question 5: Investment Goal -->
            <div v-else-if="currentStep === 5" class="w-full max-w-2xl">
              <h2 class="text-4xl font-semibold text-white text-center mb-12">
                您的主要投资目标是？
              </h2>
              
              <div class="space-y-3">
                <button
                  v-for="option in questions[4].options"
                  :key="option.value"
                  @click="selectAnswer(4, option.value)"
                  :class="[
                    'w-full py-5 px-6 rounded-xl border-2 text-center transition-all duration-200',
                    answers[4] === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-gray-700 bg-[#2a2a2a] text-gray-300 hover:border-gray-500 hover:scale-[1.02]'
                  ]"
                >
                  <div class="text-lg font-medium">{{ option.label }}</div>
                </button>
              </div>
            </div>

            <!-- Completion Screen (Step 6) -->
            <div v-else-if="currentStep === 6" class="text-center max-w-2xl">
              <div class="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg class="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              
              <h1 class="text-5xl font-semibold text-white mb-6">
                设置完成！
              </h1>
              
              <div class="text-2xl text-blue-400 font-semibold mb-4">
                您的风险偏好：{{ riskLevelText }}
              </div>
              
              <p class="text-lg text-gray-400 mb-12">
                我们将为您推荐适合您风格的投资策略。
              </p>
              
              <button 
                @click="completeOnboarding"
                class="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-medium rounded-full hover:scale-105 transition-transform duration-200"
              >
                开始体验
              </button>
            </div>

            <!-- Back Button (Only show on question screens 2-5) -->
            <button
              v-if="currentStep >= 2 && currentStep <= 5"
              @click="prevStep"
              class="absolute bottom-12 left-12 text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              上一步
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'complete'])

const currentStep = ref(0) // 0 = Welcome, 1-5 = Questions, 6 = Completion
const answers = ref([null, null, null, null, null])
const transitionName = ref('slide-up')

// Question data
const questions = [
  {
    id: 1,
    title: '您的主要"投资者画像"是哪一类？',
    options: [
      {
        value: 'conservative',
        icon: '🛡️',
        label: 'A) 追稳求稳型',
        desc: '我的首要目标是保全资本，我能接受风险机会和稳定性的小幅波动。我的典型仓位配比为1-3%。'
      },
      {
        value: 'balanced',
        icon: '⚖️',
        label: 'B) 稳健兼顾型',
        desc: '我的目标是实现稳健的，经风险调整后的增长。我愿意承担适度经过计算的风险，但不追求"一夜暴富"。我的典型仓位配比 (4-7%)。'
      },
      {
        value: 'aggressive',
        icon: '🚀',
        label: 'C) 专注进取型',
        desc: '我的目标是通过在高度合适的机会上进行重仓投资，来实现增长最大化。我能担当面对市场波动。我的典型仓位较大 (8-15%以上)。'
      },
      {
        value: 'custom',
        icon: '🔍',
        label: 'D) 我仍在探索我的风格',
        desc: '我还不确定哪种风格适合我。'
      }
    ]
  },
  {
    id: 2,
    title: '您的投资经验如何？',
    options: [
      { value: 'beginner', label: '新手 - 少于1年经验' },
      { value: 'intermediate', label: '中级 - 1-3年经验' },
      { value: 'experienced', label: '有经验 - 3-5年经验' },
      { value: 'expert', label: '专家 - 5年以上经验' }
    ]
  },
  {
    id: 3,
    title: '您能承受多大的短期波动？',
    options: [
      { value: 'low', label: '低波动 - 5%以内的月度波动' },
      { value: 'medium', label: '中等波动 - 5-10%的月度波动' },
      { value: 'high', label: '高波动 - 10-20%的月度波动' },
      { value: 'very-high', label: '极高波动 - 20%以上的月度波动' }
    ]
  },
  {
    id: 4,
    title: '如果投资组合出现10%的账面亏损，您会？',
    options: [
      { value: 'sell', label: '立即卖出止损' },
      { value: 'hold', label: '继续持有，等待反弹' },
      { value: 'buy', label: '加仓买入，摊低成本' },
      { value: 'review', label: '重新审视投资逻辑后决定' }
    ]
  },
  {
    id: 5,
    title: '您的主要投资目标是？',
    options: [
      { value: 'preservation', label: '资本保值 - 跑赢通胀即可' },
      { value: 'income', label: '稳定收入 - 通过分红获得现金流' },
      { value: 'growth', label: '资本增值 - 追求长期增长' },
      { value: 'aggressive-growth', label: '激进增长 - 追求高回报，接受高风险' }
    ]
  }
]

// Calculate risk level
const calculateRiskLevel = () => {
  const scores = {
    conservative: 1, balanced: 2, aggressive: 3, custom: 2,
    beginner: 1, intermediate: 2, experienced: 3, expert: 3,
    low: 1, medium: 2, high: 3, 'very-high': 4,
    sell: 1, hold: 2, buy: 3, review: 2,
    preservation: 1, income: 2, growth: 3, 'aggressive-growth': 4
  }

  const totalScore = answers.value.reduce((sum, answer) => sum + (scores[answer] || 0), 0)
  const avgScore = totalScore / 5

  if (avgScore <= 1.5) return 'conservative'
  if (avgScore <= 2.5) return 'moderate'
  return 'aggressive'
}

const riskLevelText = computed(() => {
  const level = calculateRiskLevel()
  const textMap = {
    conservative: '保守型',
    moderate: '稳健型',
    aggressive: '进取型'
  }
  return textMap[level] || '稳健型'
})

// Navigation methods
const nextStep = () => {
  transitionName.value = 'slide-up'
  currentStep.value++
}

const prevStep = () => {
  transitionName.value = 'slide-down'
  currentStep.value--
}

const selectAnswer = (questionIndex, value) => {
  answers.value[questionIndex] = value
  
  // Auto advance after 300ms
  setTimeout(() => {
    if (currentStep.value < 5) {
      nextStep()
    } else {
      // Last question, go to completion screen
      nextStep()
    }
  }, 300)
}

const skipOnboarding = () => {
  // Save skip flag
  localStorage.setItem('scaleAlpha_onboarding_skipped', 'true')
  emit('close')
}

const completeOnboarding = () => {
  const riskLevel = calculateRiskLevel()
  
  // Save to localStorage
  localStorage.setItem('scaleAlpha_onboarding_completed', 'true')
  localStorage.setItem('scaleAlpha_riskProfile', JSON.stringify({
    answers: answers.value,
    riskLevel,
    completedAt: new Date().toISOString()
  }))
  
  // Also save in the format used by RiskAssessmentModal
  localStorage.setItem('riskAssessmentResult', JSON.stringify({
    answers: answers.value,
    riskLevel
  }))
  
  emit('complete', { answers: answers.value, riskLevel })
  emit('close')
}
</script>

<style scoped>
/* Fade transition for entire onboarding */
.onboarding-fade-enter-active,
.onboarding-fade-leave-active {
  transition: opacity 0.3s ease;
}

.onboarding-fade-enter-from,
.onboarding-fade-leave-to {
  opacity: 0;
}

/* Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

/* Slide down transition */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
