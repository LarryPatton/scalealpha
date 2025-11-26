<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" @click.self="closeModal">
        <div class="bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-[#404040]">
            <h2 class="text-xl font-bold text-white">用户交易偏好设置</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Progress Steps -->
          <div class="flex items-center justify-center gap-2 px-6 py-6 border-b border-[#404040]">
            <div 
              v-for="step in 5" 
              :key="step"
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300',
                currentStep === step 
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600/30' 
                  : currentStep > step 
                    ? 'bg-green-600 text-white'
                    : 'bg-[#404040] text-gray-500'
              ]"
            >
              <svg v-if="currentStep > step" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span v-else>{{ step }}</span>
            </div>
          </div>

          <!-- Question Content -->
          <div class="px-8 py-8 overflow-y-auto" style="max-height: 60vh;">
            <div v-if="currentStep === 1">
              <h3 class="text-lg font-semibold text-white mb-6">您的主要"投资者画像"是哪一类？</h3>
              <div class="space-y-3">
                <label
                  v-for="option in questions[0].options"
                  :key="option.value"
                  :class="[
                    'block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    answers[0] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f]'
                  ]"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[0]"
                    class="sr-only"
                  />
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                      answers[0] === option.value ? 'border-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="answers[0] === option.value" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-white mb-1">{{ option.label }}</div>
                      <div class="text-sm text-gray-400">{{ option.desc }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div v-else-if="currentStep === 2">
              <h3 class="text-lg font-semibold text-white mb-6">您的投资经验如何？</h3>
              <div class="space-y-3">
                <label
                  v-for="option in questions[1].options"
                  :key="option.value"
                  :class="[
                    'block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    answers[1] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f]'
                  ]"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[1]"
                    class="sr-only"
                  />
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                      answers[1] === option.value ? 'border-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="answers[1] === option.value" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-white">{{ option.label }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div v-else-if="currentStep === 3">
              <h3 class="text-lg font-semibold text-white mb-6">您能承受多大的短期波动？</h3>
              <div class="space-y-3">
                <label
                  v-for="option in questions[2].options"
                  :key="option.value"
                  :class="[
                    'block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    answers[2] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f]'
                  ]"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[2]"
                    class="sr-only"
                  />
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                      answers[2] === option.value ? 'border-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="answers[2] === option.value" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-white">{{ option.label }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div v-else-if="currentStep === 4">
              <h3 class="text-lg font-semibold text-white mb-6">如果投资组合出现10%的账面亏损，您会？</h3>
              <div class="space-y-3">
                <label
                  v-for="option in questions[3].options"
                  :key="option.value"
                  :class="[
                    'block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    answers[3] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f]'
                  ]"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[3]"
                    class="sr-only"
                  />
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                      answers[3] === option.value ? 'border-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="answers[3] === option.value" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-white">{{ option.label }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div v-else-if="currentStep === 5">
              <h3 class="text-lg font-semibold text-white mb-6">您的主要投资目标是？</h3>
              <div class="space-y-3">
                <label
                  v-for="option in questions[4].options"
                  :key="option.value"
                  :class="[
                    'block p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    answers[4] === option.value
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#404040] hover:border-gray-500 bg-[#1f1f1f]'
                  ]"
                >
                  <input
                    type="radio"
                    :value="option.value"
                    v-model="answers[4]"
                    class="sr-only"
                  />
                  <div class="flex items-start gap-3">
                    <div :class="[
                      'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
                      answers[4] === option.value ? 'border-blue-500' : 'border-gray-500'
                    ]">
                      <div v-if="answers[4] === option.value" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium text-white">{{ option.label }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between px-8 py-4 border-t border-[#404040]">
            <button
              v-if="currentStep > 1"
              @click="prevStep"
              class="px-5 py-2 text-gray-400 hover:text-white transition"
            >
              上一题
            </button>
            <div v-else></div>
            
            <button
              v-if="currentStep < 5"
              @click="nextStep"
              :disabled="!answers[currentStep - 1]"
              :class="[
                'px-6 py-2.5 rounded-lg font-medium transition-all',
                answers[currentStep - 1]
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              下一题
            </button>
            <button
              v-else
              @click="submitAssessment"
              :disabled="!answers[4]"
              :class="[
                'px-6 py-2.5 rounded-lg font-medium transition-all',
                answers[4]
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              ]"
            >
              完成评估
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

const currentStep = ref(1)
const answers = ref([null, null, null, null, null])

const questions = [
  {
    id: 1,
    title: '您的主要"投资者画像"是哪一类？',
    options: [
      {
        value: 'conservative',
        label: 'A) 追稳求稳型：',
        desc: '我的首要目标是保全资本，我能接受风险机会和稳定性的小幅波动。我的典型仓位配比为1-3%。'
      },
      {
        value: 'balanced',
        label: 'B) 稳健兼顾型：',
        desc: '我的目标是实现稳健的，经风险调整后的增长。我愿意承担适度经过计算的风险，但不追求"一夜暴富"。我的典型仓位配比 (4-7%)。'
      },
      {
        value: 'aggressive',
        label: 'C) 专注进取型：',
        desc: '我的目标是通过在高度合适的机会上进行重仓投资，来实现增长最大化。我能担当面对市场波动。我的典型仓位较大 (8-15%以上)。'
      },
      {
        value: 'custom',
        label: 'D) 我仍在探索我的风格：',
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

const nextStep = () => {
  if (currentStep.value < 5 && answers.value[currentStep.value - 1]) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitAssessment = () => {
  if (!answers.value[4]) return

  // 计算风险等级
  const riskLevel = calculateRiskLevel()
  
  emit('submit', {
    answers: answers.value,
    riskLevel
  })
  
  closeModal()
}

const calculateRiskLevel = () => {
  // 简单的风险评分逻辑
  const scores = {
    conservative: 1,
    balanced: 2,
    aggressive: 3,
    custom: 2,
    beginner: 1,
    intermediate: 2,
    experienced: 3,
    expert: 3,
    low: 1,
    medium: 2,
    high: 3,
    'very-high': 4,
    sell: 1,
    hold: 2,
    buy: 3,
    review: 2,
    preservation: 1,
    income: 2,
    growth: 3,
    'aggressive-growth': 4
  }

  const totalScore = answers.value.reduce((sum, answer) => sum + (scores[answer] || 0), 0)
  const avgScore = totalScore / 5

  if (avgScore <= 1.5) return 'conservative'
  if (avgScore <= 2.5) return 'moderate'
  return 'aggressive'
}

const closeModal = () => {
  emit('close')
  // Reset after animation
  setTimeout(() => {
    currentStep.value = 1
    answers.value = [null, null, null, null, null]
  }, 300)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-\[#2a2a2a\],
.modal-leave-active .bg-\[#2a2a2a\] {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-\[#2a2a2a\] {
  transform: scale(0.95);
}

.modal-leave-to .bg-\[#2a2a2a\] {
  transform: scale(0.95);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
