<template>
  <div 
    class="flex items-center relative p-4 select-none"
    :class="[
      orientation === 'vertical' ? 'flex-col h-full' : 'flex-row w-full pb-20',
      compact ? 'gap-2' : 'gap-0'
    ]"
  >
    <div 
      v-for="(step, index) in steps" 
      :key="step.key"
      class="relative group flex items-center justify-center"
      :class="[
        orientation === 'vertical' ? 'w-full' : 'h-full flex-1 min-w-[120px]'
      ]"
      @click="handleStepClick(step)"
    >
      <!-- Connector Line Background (Previous to Current) -->
      <div 
        v-if="index > 0"
        class="absolute bg-[#222] -z-20"
        :class="[
          orientation === 'vertical'
            ? 'w-0.5 left-1/2 -translate-x-1/2 -top-1/2 h-full'
            : 'h-0.5 top-1/2 -translate-y-1/2 -left-1/2 w-full'
        ]"
      ></div>

      <!-- Connector Line Highlight (Previous to Current) -->
      <div 
        v-if="index > 0"
        class="absolute bg-cyan-500 transition-all duration-500 -z-10"
        :class="[
          orientation === 'vertical'
            ? 'w-0.5 left-1/2 -translate-x-1/2 -top-1/2 h-full'
            : 'h-0.5 top-1/2 -translate-y-1/2 -left-1/2 w-full',
          isStepConnected(index) ? 'opacity-100' : 'opacity-0'
        ]"
      ></div>

      <!-- Next Step Flow Hint (Active to Next) -->
      <div 
        v-if="step.showNextFlow && index < steps.length - 1"
        class="absolute bg-gradient-to-r from-cyan-500/50 to-transparent -z-10 animate-pulse-flow"
        :class="[
          orientation === 'vertical'
            ? 'w-0.5 left-1/2 -translate-x-1/2 top-1/2 h-full'
            : 'h-0.5 top-1/2 -translate-y-1/2 left-1/2 w-full'
        ]"
      >
        <!-- Dashed overlay for flow effect -->
        <div class="absolute inset-0 w-full h-full bg-[length:8px_100%] bg-repeat-x animate-dash-flow"
             style="background-image: linear-gradient(90deg, transparent 50%, #000 50%);">
        </div>
      </div>

      <!-- Node Container -->
      <div class="relative flex flex-col items-center justify-center">
        
        <!-- Loop Animation Ring -->
        <div 
          v-if="step.loopState && step.loopState !== 'none'"
          class="absolute inset-0 -m-2 rounded-full border border-dashed border-cyan-500/50 animate-spin-slow pointer-events-none"
          :class="step.loopState === 'manual_updating' ? 'border-amber-500/50' : ''"
        ></div>

        <!-- Node Circle -->
        <div 
          class="rounded-full flex items-center justify-center transition-all duration-300 border-2 relative z-10"
          :class="[
            getNodeSizeClass(step),
            getNodeColorClass(step),
            step.status === 'active' ? 'glow-primary-md' : '',
            isClickable(step) ? 'cursor-pointer hover:scale-110' : 'cursor-default'
          ]"
        >
          <!-- Icon / Content -->
          <span v-if="step.status === 'done'" class="text-cyan-400">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </span>
          <span v-else-if="step.status === 'blocked'" class="text-amber-500">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </span>
          <span v-else class="text-[10px] font-bold font-mono" :class="step.status === 'active' ? 'text-white' : 'text-gray-600'">
            {{ index + 1 }}
          </span>

          <!-- Loop Badge (Auto/Manual) -->
          <div 
            v-if="step.loopState && step.loopState !== 'none'"
            class="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold border border-[#0a0a0a]"
            :class="step.loopState === 'manual_updating' ? 'bg-amber-500 text-black' : 'bg-cyan-500 text-black'"
            :title="step.loopState === 'manual_updating' ? '手动更新中' : '自动更新中'"
          >
            <span v-if="step.loopState === 'manual_updating'">M</span>
            <span v-else>A</span>
          </div>
        </div>

        <!-- Labels (Title & SubStatus) -->
        <div 
          v-if="!compact || step.status === 'active'"
          class="absolute transition-all duration-300 z-20 pointer-events-none flex flex-col items-center"
          :class="[
            orientation === 'vertical' ? 'left-10 top-1/2 -translate-y-1/2 text-left items-start whitespace-nowrap' : 'top-10 left-1/2 -translate-x-1/2 text-center w-[140px]',
            step.status === 'active' ? 'opacity-100 transform translate-y-0' : 'opacity-60'
          ]"
        >
          <div class="text-xs font-bold leading-tight" :class="step.status === 'active' ? 'text-white' : 'text-gray-500'">
            {{ step.title }}
          </div>
          
          <!-- Sub Status / Hint -->
          <div v-if="showSubStatus && (step.subStatusLabel || step.hint || step.blockedReason)" class="mt-1 flex flex-col items-center w-full">
             <span 
               v-if="step.subStatusLabel" 
               class="text-[9px] px-1.5 py-0.5 rounded border leading-tight break-words max-w-full"
               :class="getSubStatusColorClass(step)"
             >
               {{ step.subStatusLabel }}
             </span>
             <span v-if="step.blockedReason" class="text-[9px] text-amber-500 mt-0.5 bg-amber-900/20 px-1 rounded leading-tight break-words max-w-full">
               {{ step.blockedReason }}
             </span>
             <span v-if="step.hint" class="text-[9px] text-gray-500 mt-0.5 leading-tight">
               {{ step.hint }}
             </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  steps: {
    type: Array,
    required: true,
    // Expected shape: Step[] from spec
  },
  orientation: {
    type: String,
    default: 'horizontal', // 'horizontal' | 'vertical'
  },
  showSubStatus: {
    type: Boolean,
    default: true,
  },
  compact: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['step-click'])

// Helper to determine if the line connecting to this step should be highlighted
const isStepConnected = (index) => {
  const step = props.steps[index]
  // Highlight if this step is done, active, or blocked (meaning we reached it)
  // AND the previous step is done
  const prevStep = props.steps[index - 1]
  if (!prevStep) return false
  
  return prevStep.status === 'done' && (step.status === 'done' || step.status === 'active' || step.status === 'blocked')
}

const getNodeSizeClass = (step) => {
  if (step.status === 'active') return 'w-8 h-8 border-2'
  return 'w-6 h-6 border-2'
}

const getNodeColorClass = (step) => {
  switch (step.status) {
    case 'done':
      return 'border-cyan-900 bg-cyan-900/20'
    case 'active':
      return 'border-cyan-500 bg-[#111]'
    case 'blocked':
      return 'border-amber-500/50 bg-amber-900/10'
    case 'pending':
    default:
      return 'border-[#333] bg-[#0a0a0a]'
  }
}

const getSubStatusColorClass = (step) => {
  if (step.status === 'blocked') return 'border-amber-500/30 text-amber-500 bg-amber-900/20'
  if (step.status === 'active') return 'border-cyan-500/30 text-cyan-400 bg-cyan-900/20'
  if (step.status === 'done') return 'border-gray-700 text-gray-400 bg-gray-800/30'
  return 'border-gray-800 text-gray-600'
}

const isClickable = (step) => {
  return step.status === 'done' || step.status === 'blocked'
}

const handleStepClick = (step) => {
  if (isClickable(step)) {
    emit('step-click', step.key)
  }
}
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-pulse-flow {
  animation: pulseFlow 2s infinite;
}

@keyframes pulseFlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

.animate-dash-flow {
  animation: dashFlow 1s linear infinite;
}

@keyframes dashFlow {
  from { background-position: 0 0; }
  to { background-position: -16px 0; }
}
</style>