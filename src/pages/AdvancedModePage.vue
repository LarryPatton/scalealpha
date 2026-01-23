
<template>
  <div class="min-h-screen relative" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Background Grid Pattern -->
    <div 
      class="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
      style="background-image: radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0); background-size: 40px 40px;"
      :style="{ color: tokens.colors.text.primary }"
    ></div>

    <!-- Main Content -->
    <main class="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 lg:p-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h2 
          class="text-xs font-black tracking-[0.5em] uppercase mb-4 opacity-80"
          :style="{ color: tokens.colors.text.primary }"
        >
          {{ $t('advanced.title') }}
        </h2>
        <div class="flex items-center justify-center gap-2">
          <div class="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/40"></div>
          <div class="size-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50"></div>
          <div class="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/40"></div>
        </div>
      </div>

      <!-- Demo Controls (Top Right) -->
      <div class="fixed top-24 right-4 z-50 flex flex-col gap-2 p-3 rounded-lg border shadow-xl backdrop-blur-md transition-opacity hover:opacity-100 opacity-25"
           :style="{ 
             backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)', 
             borderColor: tokens.colors.border.default 
           }">
        <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">State Demo</span>
        <div class="flex flex-col gap-1">
          <button 
            v-for="state in demoStates" 
            :key="state.value"
            @click="currentDemoState = state.value"
            class="text-[10px] px-2 py-1.5 rounded text-left border flex items-center gap-2 transition-colors"
            :class="currentDemoState === state.value ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-500' : 'border-transparent hover:bg-gray-500/10'"
          >
            <div class="size-2 rounded-full" :class="state.dotClass"></div>
            {{ state.label }}
          </button>
        </div>
      </div>

      <!-- Pipeline Container -->
      <div class="relative w-full max-w-[1800px] px-4 lg:px-12">
        <!-- Pipeline Connector Line -->
        <div 
          class="hidden xl:block absolute top-[56px] left-0 right-0 h-[2px] z-0"
          style="background: linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.3), transparent);"
        ></div>

        <!-- Agent Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 justify-items-center">
          <div 
            v-for="(agent, index) in displayAgents" 
            :key="agent.id"
            class="pipeline-node flex flex-col items-center gap-6 relative z-10 w-full"
          >
            <!-- Avatar -->
            <div class="relative">
              <div 
                class="size-28 rounded-full p-1 transition-transform duration-500"
                :class="[getAvatarClass(agent), agent.status !== 'inactive' ? 'hover:scale-110' : 'grayscale opacity-70']"
                :style="getAvatarStyle(agent)"
              >
                <img 
                  v-if="agent.avatar" 
                  :src="agent.avatar" 
                  :alt="agent.name"
                  class="w-full h-full object-cover rounded-full"
                />
                <div 
                  v-else 
                  class="w-full h-full rounded-full flex items-center justify-center"
                  :style="{ backgroundColor: tokens.colors.background.card }"
                >
                  <span class="material-symbols-outlined text-4xl" :style="{ color: tokens.colors.text.muted }">
                    {{ agent.icon }}
                  </span>
                </div>
              </div>
              <!-- Status Indicator -->
              <div 
                v-if="agent.status !== 'inactive'"
                class="absolute top-1 right-1 size-5 rounded-full border-2"
                :class="getStatusClass(agent)"
                :style="{ borderColor: tokens.colors.background.base }"
              ></div>
            </div>

            <!-- Card -->
            <div 
              class="glass-panel w-full max-w-[320px] p-6 rounded-2xl flex flex-col items-center text-center border transition-all duration-300"
              :class="agent.status !== 'inactive' ? 'hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10' : 'grayscale'"
              :style="{ 
                backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderColor: tokens.colors.border.default,
                opacity: agent.status === 'inactive' ? 0.6 : 1
              }"
            >
              <h3 
                class="text-lg font-bold tracking-tight mb-2"
                :style="{ color: tokens.colors.text.primary }"
              >
                {{ getAgentName(agent) }}
              </h3>
              <p 
                class="text-sm mb-6 h-10 leading-snug flex items-center justify-center"
                :style="{ color: tokens.colors.text.muted }"
              >
                {{ getAgentDesc(agent) }}
              </p>

              <!-- Status Bar -->
              <div class="flex flex-col w-full gap-3" v-if="agent.status !== 'inactive'">
                <div 
                  class="flex items-center justify-between px-3 py-2 rounded-lg border"
                  :style="getStatusBarStyle(agent)"
                >
                  <span class="text-[10px] font-bold uppercase tracking-widest" :style="{ color: getStatusColor(agent) }">
                    {{ $t('advanced.status') }}
                  </span>
                  <span 
                    class="text-[10px] font-mono uppercase font-semibold"
                    :style="{ color: tokens.colors.text.primary }"
                  >
                    {{ getStatusText(agent) }}
                  </span>
                </div>

                <!-- Enter Button -->
                <router-link 
                  :to="`/advanced/workspace/${agent.id}`"
                  class="w-full py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-colors text-center block hover:opacity-90 flex items-center justify-center gap-2"
                  :style="getButtonStyle(agent)"
                >
                  <span v-if="agent.status === 'completed'" class="material-symbols-outlined text-sm">check</span>
                  {{ getButtonText(agent) }}
                </router-link>
              </div>

              <!-- Unhired (Inactive) State Actions -->
              <div v-else class="flex flex-col w-full gap-3">
                 <div 
                  class="flex items-center justify-between px-3 py-2 rounded-lg border border-dashed"
                  :style="{ borderColor: tokens.colors.border.default }"
                >
                  <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Status
                  </span>
                  <span 
                    class="text-[10px] font-mono uppercase font-semibold text-gray-400"
                  >
                    Not Installed
                  </span>
                </div>
                <button 
                  class="w-full py-2.5 text-xs font-black uppercase tracking-widest rounded-lg transition-colors text-center block hover:bg-gray-100 dark:hover:bg-gray-800 border"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                >
                  {{ isCn ? '雇佣' : 'HIRE AGENT' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Log Bar -->
      <div class="w-full max-w-5xl mt-12 px-4 lg:px-12">
        <div 
          class="rounded-lg p-3 flex items-center justify-between border-l-2"
          :style="{ 
            backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderColor: tokens.colors.border.default,
            borderLeftColor: '#00f2ff'
          }"
        >
          <div class="flex items-center gap-4 text-[10px] font-mono tracking-tight overflow-hidden whitespace-nowrap">
            <span class="font-bold" style="color: #00f2ff">[{{ currentTime }}] SYS_READY</span>
            <span :style="{ color: tokens.colors.text.muted }">|</span>
            <span :style="{ color: tokens.colors.text.secondary }">
              <span style="color: #00f2ff">{{ $t('advanced.systemLog.agent') }}:</span> 
              {{ $t('advanced.systemLog.message') }}
            </span>
            <span :style="{ color: tokens.colors.text.muted }">|</span>
            <span :style="{ color: tokens.colors.text.muted }">{{ $t('advanced.systemLog.latency') }}: 12ms</span>
          </div>
          <div class="flex items-center gap-3 pl-6 border-l" :style="{ borderColor: tokens.colors.border.default }">
            <div class="size-1.5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse"></div>
            <span class="text-[9px] font-black uppercase tracking-widest" :style="{ color: tokens.colors.text.muted }">
              {{ $t('advanced.systemLog.syncing') }}
            </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// Current time for system log
const currentTime = ref('')
let timeInterval = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  })
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})

// Helper to check locale
const isCn = computed(() => t('nav.info') === '首页')

// Demo States Control
const currentDemoState = ref('default')
const demoStates = [
  { value: 'default', label: 'Default Mix', dotClass: 'bg-white' },
  { value: 'inactive', label: '1. Inactive', dotClass: 'bg-gray-500' },
  { value: 'idle', label: '2. Idle', dotClass: 'bg-cyan-400' },
  { value: 'running', label: '3. Running', dotClass: 'bg-cyan-400 animate-pulse' },
  { value: 'completed', label: '4. Completed', dotClass: 'bg-green-400' },
  { value: 'attention', label: '5. Attention', dotClass: 'bg-orange-500' },
]

// Agent data source
const agentsSource = [
  {
    id: 1,
    key: 'dataScientist',
    name: 'Data Scientist',
    nameCn: '数据科学家',
    desc: 'Signal engineering & data extraction',
    descCn: '信号工程与数据提取',
    status: 'running',
    statusText: 'Processing',
    statusTextCn: '处理中',
    icon: 'psychology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3Z_ymOBKQDpvNVCc-vmv02oMfh1DGkWe9LjLpBncLNvEIrILMr4YeaDN2Bga3vGSNMfnQT1G1cCZvpTx4fyHYHSmeGWRonBMgrIF2hEgaZA1j2mC67VhuaFh6peS7wbdgwiZ86UQwyo8jTC2ouC0DT6QoRKak73Y_MYxagjylr1ubIOJksWF5p83rGtKCEN-7mBWen6JME5YQ9pjiM7nLUerP4ZE-GSeeZY5cn9cJvrxLMA9do8PdYbl9sqYJkyWoI7UnCdJklSm'
  },
  {
    id: 2,
    key: 'researcher',
    name: 'Researcher',
    nameCn: '研究员',
    desc: 'Sentiment analysis & macro trends',
    descCn: '情绪分析与宏观趋势',
    status: 'idle',
    statusText: 'Standby',
    statusTextCn: '待命',
    icon: 'search',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4raWNT-zuo2ddRMhHM7gm5AgZw2hYSV5Ol5DIElddd0H_FDTgooGBpA5BdbCmrnVWxGgjIHadrwSEqJNwFlTKc5R7pK6_pD_IS8N-ZIKZV-2bb-QmDxujE0vfuVHco8vOzjd4ydW8LJWoBGKUOgrK1gIpOAb1XNtgWQIVkLSgqC2PCAFMO0rDdpoSTrGGOG_wLQzSzehSTDVMRHH0PWFq3KmPX8c1uGplDtTYxFL5OD7eRSRtlNl2aDGu0A3eNPZCFSDTE7F8Vds_'
  },
  {
    id: 3,
    key: 'analyst',
    name: 'Analyst',
    nameCn: '分析师',
    desc: 'Fundamental risk evaluation',
    descCn: '基本面风险评估',
    status: 'warning',
    statusText: 'Review Req.',
    statusTextCn: '需要复核',
    icon: 'analytics',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_QNTx0BbotH6lg2KwdWld1iavqqAON8bRJ6jOVHNGwNec1YWFW5hMBNNDHJHI7pBIFPWtBlqPQfALpiHd2CNcp8b1hjWcYSnt1almrA8wqiDtNpk_lpwf3zr6XyLGPsD4Yh7fsIStsgJRpNGGh6zYg292_3lFw5NTT1syl4IY9hWqFmxYqqay-rMGb1LGSSqi7kvcrq5Un5VyQ1fA-IWszQC-vOtDC0KK_wcNBD9-y1LUPCKQmAK_IPA9grqNoUzqfFyG_KHkqmuh'
  },
  {
    id: 4,
    key: 'strategist',
    name: 'Strategist',
    nameCn: '策略师',
    desc: 'Model architecture & allocation',
    descCn: '模型架构与配置',
    status: 'inactive',
    statusText: 'Not Active',
    statusTextCn: '未启用',
    icon: 'psychology',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9eFJSBUSMXWhNKS1NOffVgsBBKcAYNsAqDyUwmiWSOnaaR-P4bHE9_HU2Z0svNoPfO7DZ2ZF_CoY4RHYMd179KSNxAzQ1QHbaVULWHYJcvlP5-rgcwwhmnlhlFZ6olsqpZD6xxof-YOPCfJGuoRTUfYe6kUpLglTQpVDzFLI6QYI2CkE_dEHs6UTHzyR5SY8iiK4pww0-6wv5YU8wfnWb5nLnmbVXwQtAS4Aj4nBBU3e3nsEE_Dbdr-pBM6CP5AYFoMLTYZhdvXmE'
  },
  {
    id: 5,
    key: 'trader',
    name: 'Trader',
    nameCn: '交易员',
    desc: 'Execution & order management',
    descCn: '执行与订单管理',
    status: 'idle',
    statusText: 'Standby',
    statusTextCn: '待命',
    icon: 'bolt',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3Z_ymOBKQDpvNVCc-vmv02oMfh1DGkWe9LjLpBncLNvEIrILMr4YeaDN2Bga3vGSNMfnQT1G1cCZvpTx4fyHYHSmeGWRonBMgrIF2hEgaZA1j2mC67VhuaFh6peS7wbdgwiZ86UQwyo8jTC2ouC0DT6QoRKak73Y_MYxagjylr1ubIOJksWF5p83rGtKCEN-7mBWen6JME5YQ9pjiM7nLUerP4ZE-GSeeZY5cn9cJvrxLMA9do8PdYbl9sqYJkyWoI7UnCdJklSm'
  },
  {
    id: 6,
    key: 'portfolioManager',
    name: 'Portfolio Mgr',
    nameCn: '组合经理',
    desc: 'Global oversight & risk monitoring',
    descCn: '全局监控与风险管理',
    status: 'completed',
    statusText: 'Done',
    statusTextCn: '已完成',
    icon: 'account_balance',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4raWNT-zuo2ddRMhHM7gm5AgZw2hYSV5Ol5DIElddd0H_FDTgooGBpA5BdbCmrnVWxGgjIHadrwSEqJNwFlTKc5R7pK6_pD_IS8N-ZIKZV-2bb-QmDxujE0vfuVHco8vOzjd4ydW8LJWoBGKUOgrK1gIpOAb1XNtgWQIVkLSgqC2PCAFMO0rDdpoSTrGGOG_wLQzSzehSTDVMRHH0PWFq3KmPX8c1uGplDtTYxFL5OD7eRSRtlNl2aDGu0A3eNPZCFSDTE7F8Vds_'
  }
]

// Computed agents with Demo override
const displayAgents = computed(() => {
  if (currentDemoState.value === 'default') {
    return agentsSource
  }

  return agentsSource.map(agent => {
    let override = {}
    switch (currentDemoState.value) {
      case 'inactive':
        override = { status: 'inactive', statusText: 'Not Hired', statusTextCn: '未雇佣' }
        break
      case 'idle':
        override = { status: 'idle', statusText: 'Idle', statusTextCn: '待命' }
        break
      case 'running':
        override = { status: 'running', statusText: 'Processing', statusTextCn: '执行中' }
        break
      case 'completed':
        override = { status: 'completed', statusText: 'Completed', statusTextCn: '已完成' }
        break
      case 'attention':
        override = { status: 'warning', statusText: 'Review Req.', statusTextCn: '需要复核' }
        break
    }
    return { ...agent, ...override }
  })
})

const agents = displayAgents // For compatibility if any

// Helper functions (Updated for 5 states)
const getAgentName = (agent) => isCn.value ? agent.nameCn : agent.name
const getAgentDesc = (agent) => isCn.value ? agent.descCn : agent.desc
const getStatusText = (agent) => isCn.value ? agent.statusTextCn : agent.statusText

const getButtonText = (agent) => {
  if (agent.status === 'inactive') return isCn.value ? '雇佣' : 'HIRE'
  if (agent.status === 'running') return isCn.value ? '查看' : 'VIEW'
  if (agent.status === 'completed') return isCn.value ? '查看成果' : 'RESULTS'
  if (agent.status === 'warning') return isCn.value ? '审核' : 'REVIEW'
  return t('advanced.enter') // Idle
}

const getAvatarClass = (agent) => {
  if (agent.status === 'warning') return 'border-2 border-orange-500/50'
  if (agent.status === 'inactive') return 'border-2 border-gray-600/30'
  if (agent.status === 'running') return 'border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-500/20 ring-offset-2 ring-offset-transparent animate-pulse'
  if (agent.status === 'completed') return 'border-2 border-green-400 shadow-lg shadow-green-500/20'
  return 'border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/15'
}

const getAvatarStyle = (agent) => {
  return {
    backgroundColor: tokens.value.colors.background.card
  }
}

const getStatusClass = (agent) => {
  if (agent.status === 'warning') return 'bg-orange-500 animate-pulse'
  if (agent.status === 'running') return 'bg-cyan-400 animate-ping'
  if (agent.status === 'completed') return 'bg-green-400'
  return 'bg-cyan-400 shadow-lg shadow-cyan-500/50'
}

const getStatusColor = (agent) => {
  if (agent.status === 'warning') return '#f97316'
  if (agent.status === 'completed') return '#4ade80'
  return '#00f2ff'
}

const getStatusBarStyle = (agent) => {
  if (agent.status === 'warning') {
    return {
      backgroundColor: 'rgba(249, 115, 22, 0.05)',
      borderColor: 'rgba(249, 115, 22, 0.2)'
    }
  }
  if (agent.status === 'completed') {
    return {
      backgroundColor: 'rgba(74, 222, 128, 0.05)',
      borderColor: 'rgba(74, 222, 128, 0.2)'
    }
  }
  return {
    backgroundColor: 'rgba(0, 242, 255, 0.05)',
    borderColor: 'rgba(0, 242, 255, 0.1)'
  }
}

const getButtonStyle = (agent) => {
  if (agent.status === 'warning') {
    return {
      backgroundColor: '#f97316',
      color: '#ffffff'
    }
  }
  if (agent.status === 'completed') {
    return {
      backgroundColor: '#4ade80',
      color: '#064e3b'
    }
  }
  return {
    backgroundColor: '#00f2ff',
    color: isDark.value ? '#06090f' : '#1a1a1a'
  }
}
</script>

<style scoped>
.pipeline-node {
  position: relative;
  z-index: 10;
}

.glass-panel {
  backdrop-filter: blur(20px);
}

/* Glow effects */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 242, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 242, 255, 0.8);
  }
}
</style>
