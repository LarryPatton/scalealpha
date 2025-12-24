<template>
  <div class="flex flex-col h-full">
    <!-- Chat Header -->
    <div 
      class="px-4 py-3 border-b flex justify-between items-center shrink-0" 
      :style="{ borderColor: tokens.colors.border.subtle, backgroundColor: tokens.colors.background.surface }"
    >
      <h3 class="text-sm font-medium flex items-center gap-2" :style="{ color: tokens.colors.text.secondary }">
        <i class="fas fa-robot text-green-500"></i> AI 策略助手
      </h3>
    </div>

    <!-- Chat Messages Area -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      <!-- Welcome State -->
      <div v-if="chatHistory.length === 0" class="flex flex-col h-full">
        <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-4">
          <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
            <i class="fas fa-robot text-green-400 text-xl"></i>
          </div>
          <div>
            <h4 class="font-medium mb-1" :style="{ color: tokens.colors.text.primary }">ScaleAlpha AI 助手</h4>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">基于当前执行计划为您解答</p>
          </div>
        </div>
        
        <!-- Quick Prompts -->
        <div class="space-y-2 pb-4">
          <p class="text-xs px-1 mb-2" :style="{ color: tokens.colors.text.muted }">您可以问我：</p>
          <button 
            v-for="(prompt, idx) in quickPrompts" 
            :key="idx"
            @click="useQuickPrompt(prompt)"
            class="w-full text-left px-3 py-2.5 hover:border-cyan-500/30 border rounded-sm text-xs transition-all duration-200 flex items-center justify-between group hover:shadow-lg hover:shadow-cyan-900/10"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle, color: tokens.colors.text.secondary }"
          >
            <span class="group-hover:text-cyan-400 transition-colors">{{ prompt }}</span>
            <i class="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-500 transition-all duration-300"></i>
          </button>
        </div>
      </div>
      
      <!-- Chat History -->
      <div v-else class="space-y-4">
        <div v-for="(msg, index) in chatHistory" :key="index" class="flex gap-3">
          <!-- Avatar -->
          <div 
            class="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs"
            :class="msg.role === 'user' ? 'bg-cyan-600' : 'bg-green-600'"
          >
            <i class="fas" :class="msg.role === 'user' ? 'fa-user' : 'fa-robot'"></i>
          </div>
          <!-- Message Bubble -->
          <div class="flex-1">
            <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">
              {{ msg.role === 'user' ? 'You' : 'ScaleAlpha AI' }}
            </div>
            <div 
              class="text-sm leading-relaxed whitespace-pre-wrap p-3 border rounded-sm" 
              :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
            >{{ msg.content }}</div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="isChatLoading" class="flex gap-3">
          <div class="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shrink-0 text-xs">
            <i class="fas fa-robot"></i>
          </div>
          <div class="flex-1">
            <div class="text-xs font-medium mb-1" :style="{ color: tokens.colors.text.tertiary }">ScaleAlpha AI</div>
            <div class="p-3 border w-16 rounded-sm" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
              <div class="flex gap-1 items-center h-4 justify-center">
                <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 0ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 150ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                <div class="w-1.5 h-1.5 rounded-full animate-bounce" style="animation-delay: 300ms" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="p-3 border-t shrink-0" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
      <div class="relative">
        <input 
          v-model="chatInput"
          type="text" 
          placeholder="输入您的问题..."
          class="w-full px-3 py-2.5 pr-10 text-sm border rounded-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
          :style="{ 
            backgroundColor: tokens.colors.background.base, 
            borderColor: tokens.colors.border.default, 
            color: tokens.colors.text.primary 
          }"
          @keyup.enter="sendMessage"
        />
        <button 
          @click="sendMessage"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-sm transition-colors"
          :class="chatInput.trim() ? 'text-cyan-500 hover:bg-cyan-500/10' : ''"
          :style="{ color: chatInput.trim() ? tokens.colors.accent.primary : tokens.colors.text.muted }"
          :disabled="!chatInput.trim()"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  planData: {
    type: Object,
    default: () => ({})
  },
  tokens: {
    type: Object,
    required: true
  }
})

const chatHistory = ref([])
const chatInput = ref('')
const isChatLoading = ref(false)

const quickPrompts = [
  '这个计划的主要风险是什么？',
  '为什么建议等待买入？',
  '入场价位是如何确定的？',
  '如何调整止损策略？'
]

const useQuickPrompt = (prompt) => {
  chatInput.value = prompt
  sendMessage()
}

const sendMessage = () => {
  if (!chatInput.value.trim()) return
  
  // Add user message
  chatHistory.value.push({
    role: 'user',
    content: chatInput.value
  })
  
  const userMessage = chatInput.value
  chatInput.value = ''
  isChatLoading.value = true
  
  // Simulate AI response (in real implementation, call API)
  setTimeout(() => {
    chatHistory.value.push({
      role: 'assistant',
      content: generateMockResponse(userMessage)
    })
    isChatLoading.value = false
  }, 1000)
}

const generateMockResponse = (question) => {
  const analysis = props.planData?.memorandum?.Plan_Analysis || {}
  
  if (question.includes('风险')) {
    return analysis.Primary_Risks_To_Monitor || '当前计划的主要风险包括市场波动和宏观经济不确定性。建议密切关注关键支撑位。'
  }
  if (question.includes('等待') || question.includes('买入')) {
    return analysis.Manager_s_Note_On_Strategy_And_Discipline || '当前建议等待更优入场点，耐心是此交易的关键。'
  }
  if (question.includes('入场') || question.includes('价位')) {
    return analysis.Analytical_Approach || '入场价位基于技术分析和AI模型共识确定。'
  }
  if (question.includes('止损')) {
    const tradingPlan = props.planData?.memorandum?.Trading_Plan || {}
    return tradingPlan.stop_loss_plan?.instruction || '止损策略基于ATR波动率和关键支撑位设定。'
  }
  
  return '感谢您的提问。基于当前计划分析，我建议您关注入场时机和风险管理。如有更多问题，请随时询问。'
}
</script>
