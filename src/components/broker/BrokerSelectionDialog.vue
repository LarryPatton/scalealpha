<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>
    
    <!-- Dialog -->
    <div class="relative bg-[#2a2a2a] border border-[#404040] rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#404040]">
        <h3 class="text-xl font-bold text-white">选择券商</h3>
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] flex items-center justify-center transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
        <!-- Tip -->
        <div class="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p class="text-sm text-blue-300">
            我们使用安全的 OAuth 认证，不会存储您的密码
          </p>
        </div>
        
        <!-- Broker Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            v-for="broker in SUPPORTED_BROKERS"
            :key="broker.id"
            @click="selectBroker(broker)"
            class="p-4 bg-[#1a1a1a] border-2 border-[#404040] rounded-xl hover:border-blue-500 hover:bg-[#252525] transition-all group"
          >
            <!-- Broker Color Indicator -->
            <div 
              class="w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
              :style="{ backgroundColor: broker.color }"
            >
              {{ broker.name.substring(0, 2) }}
            </div>
            
            <!-- Broker Name -->
            <div class="text-white font-medium text-center group-hover:text-blue-400 transition-colors">
              {{ broker.name }}
            </div>
          </button>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-[#404040] bg-[#1a1a1a]">
        <span class="text-sm text-gray-400">支持 {{ SUPPORTED_BROKERS.length }} 家主流券商</span>
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-[#3a3a3a] hover:bg-[#404040] text-white rounded-lg transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SUPPORTED_BROKERS } from '../../composables/useBrokerAccount'

defineProps({
  show: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'select'])

const selectBroker = (broker) => {
  emit('select', broker)
}
</script>
