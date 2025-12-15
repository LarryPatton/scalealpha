<template>
  <div class="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-cyan-500/30 flex flex-col">
    <!-- Header -->
    <header class="h-16 border-b border-[#222] bg-[#0a0a0a] flex items-center justify-between px-8 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <h1 class="text-xl font-bold text-white tracking-wider">FLOW DESIGN</h1>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-900/20 text-cyan-400 border border-cyan-900/50">PROTOTYPE</span>
      </div>
      
      <!-- View Switcher -->
      <div class="flex bg-[#111] p-1 rounded-lg border border-[#333]">
        <button 
          v-for="view in views" 
          :key="view.id"
          @click="currentView = view.id"
          class="px-4 py-1.5 text-xs font-bold rounded-md transition-all"
          :class="currentView === view.id ? 'bg-[#222] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'"
        >
          {{ view.label }}
        </button>
      </div>
    </header>

    <main class="flex-1 p-8 overflow-y-auto">
      
      <!-- Control Panel (Simulation) -->
      <div class="mb-8 p-4 bg-[#111] border border-[#222] rounded-lg flex items-center gap-6">
        <span class="text-xs font-bold text-gray-500 uppercase">Simulate State:</span>
        <div class="flex gap-2 flex-wrap">
          <button 
            v-for="state in states" 
            :key="state.id"
            @click="currentState = state.id"
            class="px-3 py-1.5 text-xs border rounded transition-all"
            :class="currentState === state.id ? 'bg-cyan-600 border-cyan-500 text-white' : 'border-[#333] text-gray-400 hover:border-gray-500'"
          >
            {{ state.label }}
          </button>
        </div>
        
        <!-- Extra Controls for View D -->
        <div v-if="currentView === 'stepper'" class="flex items-center gap-4 border-l border-[#333] pl-6">
           <label class="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
             <input type="checkbox" v-model="isBlocked" class="rounded bg-[#222] border-[#444] text-cyan-500 focus:ring-0">
             模拟阻塞 (Blocked)
           </label>
           <label class="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
             <input type="checkbox" v-model="isIterating" class="rounded bg-[#222] border-[#444] text-cyan-500 focus:ring-0">
             模拟迭代 (Loop)
           </label>
        </div>
      </div>

      <!-- View E: Game MiniMap -->
      <div v-if="currentView === 'minimap'" class="animate-fade-in">
        <div class="max-w-5xl mx-auto mt-10">
          <h2 class="text-2xl font-bold text-white mb-2">方案 E: 游戏小地图 Stepper</h2>
          <p class="text-gray-500 mb-8">实验性设计：支持复杂状态（自动/手动循环、阻塞、分支结果）的紧凑型导航。</p>

          <!-- Scenario Controls -->
          <div class="flex flex-col gap-4 mb-8">
            <!-- Group 1: Init & Strategy -->
            <div class="flex gap-2 flex-wrap items-center">
              <span class="text-xs font-bold text-gray-500 w-20">准备阶段:</span>
              <button @click="currentScenario = 'S0'" :class="getBtnClass('S0')">S0: 首次进入</button>
              <button @click="currentScenario = 'S1'" :class="getBtnClass('S1')">S1: 生成中</button>
            </div>

            <!-- Group 2: Opportunity -->
            <div class="flex gap-2 flex-wrap items-center">
              <span class="text-xs font-bold text-gray-500 w-20">机会判定:</span>
              <button @click="currentScenario = 'S4A'" :class="getBtnClass('S4A')">S4A: B级以上</button>
              <button @click="currentScenario = 'S4B'" :class="getBtnClass('S4B')">S4B: 无机会(阻塞)</button>
              <button @click="currentScenario = 'S4C'" :class="getBtnClass('S4C')">S4C: B级以下</button>
              <button @click="currentScenario = 'S_OPT'" :class="getBtnClass('S_OPT')">S_OPT: 手动更新</button>
            </div>

            <!-- Group 3: Planning -->
            <div class="flex gap-2 flex-wrap items-center">
              <span class="text-xs font-bold text-gray-500 w-20">计划阶段:</span>
              <button @click="currentScenario = 'S5A'" :class="getBtnClass('S5A')">S5A: 简单计划</button>
              <button @click="currentScenario = 'S5B'" :class="getBtnClass('S5B')">S5B: 深度计划</button>
              <button @click="currentScenario = 'S5C'" :class="getBtnClass('S5C')">S5C: 手动更新</button>
            </div>

            <!-- Group 4: Execution & Done -->
            <div class="flex gap-2 flex-wrap items-center">
              <span class="text-xs font-bold text-gray-500 w-20">执行/完成:</span>
              <button @click="currentScenario = 'S6A'" :class="getBtnClass('S6A')">S6A: 执行中</button>
              <button @click="currentScenario = 'S6B'" :class="getBtnClass('S6B')">S6B: 需改参数</button>
              <button @click="currentScenario = 'S6C'" :class="getBtnClass('S6C')">S6C: 回退评估</button>
              <button @click="currentScenario = 'S7'" :class="getBtnClass('S7')">S7: 完成</button>
            </div>
          </div>

          <!-- Component Demo -->
          <div class="bg-[#0a0a0a] border border-[#222] rounded-xl p-12 shadow-xl overflow-hidden relative">
            <!-- Grid Background -->
            <div class="absolute inset-0 opacity-20 pointer-events-none" 
                 style="background-image: radial-gradient(#333 1px, transparent 1px); background-size: 20px 20px;">
            </div>

            <div class="relative z-10">
              <MiniMapStepper 
                :steps="currentScenarioData.steps" 
                :orientation="'horizontal'"
                :showSubStatus="true"
                @step-click="handleMiniMapClick"
              />
            </div>
          </div>

          <!-- JSON Preview -->
          <div class="mt-8 p-4 bg-[#111] rounded-lg border border-[#222] font-mono text-xs text-gray-400 overflow-x-auto">
            <pre>{{ JSON.stringify(currentScenarioData, null, 2) }}</pre>
          </div>

        </div>
      </div>

      <!-- View D: Production Stepper -->
      <div v-else-if="currentView === 'stepper'" class="animate-fade-in">
        <div class="max-w-5xl mx-auto mt-10">
          <h2 class="text-2xl font-bold text-white mb-2">方案 D: 落地版 Stepper</h2>
          <p class="text-gray-500 mb-12">标准化 6 步主线，通过子状态提示处理循环与阻塞，适合生产环境。</p>

          <div class="bg-[#0a0a0a] border border-[#222] rounded-xl p-8 shadow-xl">
            <div class="flex items-start justify-between relative">
              
              <div v-for="(step, index) in productionSteps" :key="step.key" class="flex-1 flex flex-col items-center relative z-10 group">
                
                <!-- Connector Line (Left) -->
                <div v-if="index > 0" 
                     class="absolute top-4 right-1/2 w-full h-[2px] -translate-y-1/2 -z-10"
                     :class="getStepStatus(index).isCompleted ? 'bg-cyan-900' : 'bg-[#222]'">
                </div>

                <!-- Node -->
                <div class="relative mb-3">
                  <div 
                    class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                    :class="[
                      getStepStatus(index).status === 'active' ? 'border-cyan-500 bg-cyan-900/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110' : 
                      getStepStatus(index).status === 'done' ? 'border-cyan-900 bg-cyan-900 text-cyan-200' : 
                      getStepStatus(index).status === 'blocked' ? 'border-amber-500/50 bg-amber-900/20 text-amber-500' :
                      'border-[#333] bg-[#111] text-gray-600'
                    ]"
                  >
                    <!-- Icons based on status -->
                    <svg v-if="getStepStatus(index).status === 'done'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
                    <svg v-else-if="getStepStatus(index).status === 'blocked'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span v-else class="text-xs font-bold font-mono">{{ index + 1 }}</span>
                    
                    <!-- Active Pulse Ring -->
                    <div v-if="getStepStatus(index).status === 'active'" class="absolute inset-0 rounded-full border border-cyan-500 animate-ping opacity-50"></div>
                  </div>
                </div>

                <!-- Labels -->
                <div class="text-center flex flex-col items-center gap-1">
                  <span class="text-xs font-bold transition-colors" 
                    :class="getStepStatus(index).status === 'active' ? 'text-white' : 'text-gray-500'">
                    {{ step.label }}
                  </span>
                  
                  <!-- Sub-hint (Loop/Blocked Info) -->
                  <div v-if="getStepHint(step.key)" class="px-2 py-0.5 rounded text-[10px] font-medium animate-fade-in whitespace-nowrap"
                    :class="isBlocked && getStepStatus(index).status === 'active' ? 'bg-amber-900/20 text-amber-500 border border-amber-900/30' : 'bg-cyan-900/20 text-cyan-400 border border-cyan-900/30'">
                    {{ getStepHint(step.key) }}
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          <!-- Legend -->
          <div class="mt-8 flex justify-center gap-8 text-xs text-gray-500">
             <div class="flex items-center gap-2">
               <div class="w-3 h-3 rounded-full border-2 border-cyan-900 bg-cyan-900"></div>
               <span>已完成</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="w-3 h-3 rounded-full border-2 border-cyan-500 bg-cyan-900/20"></div>
               <span>进行中</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="w-3 h-3 rounded-full border-2 border-[#333] bg-[#111]"></div>
               <span>未开始</span>
             </div>
             <div class="flex items-center gap-2">
               <div class="w-3 h-3 rounded-full border-2 border-amber-500/50 bg-amber-900/20"></div>
               <span>阻塞/等待</span>
             </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import MiniMapStepper from '../components/MiniMapStepper.vue'

// Icons
const IconUser = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }), h('circle', { cx: '12', cy: '7', r: '4' })])
const IconStrategy = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M2 20h.01' }), h('path', { d: 'M7 20v-4' }), h('path', { d: 'M12 20v-8' }), h('path', { d: 'M17 20V8' }), h('path', { d: 'M22 4v16' })])
const IconPlan = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('path', { d: 'M14 2v6h6' }), h('path', { d: 'M16 13H8' }), h('path', { d: 'M16 17H8' }), h('path', { d: 'M10 9H8' })])

const currentView = ref('minimap') // Default to new view
const views = [
  { id: 'stepper', label: '方案 D: 落地版' },
  { id: 'minimap', label: '方案 E: 游戏小地图' }
]

const currentState = ref('strategy')
const states = [
  { id: 'start', label: '初始状态' },
  { id: 'strategy', label: '策略生成中' },
  { id: 'plan_simple', label: '生成简单计划' },
  { id: 'plan_complex', label: '升级复杂计划' }
]

// --- View D: Production Stepper Logic ---
const isBlocked = ref(false)
const isIterating = ref(false)

const productionSteps = [
  { key: "opp_scan", label: "机会识别" },
  { key: "opp_confirm", label: "确认机会" },
  { key: "strategy", label: "生成策略" },
  { key: "plan", label: "生成计划" },
  { key: "exec_review", label: "执行与评估" },
  { key: "done", label: "完成" },
]

// Map simulation states to stepper keys
const currentStepKey = computed(() => {
  const map = {
    'start': 'opp_scan',
    'strategy': 'strategy',
    'plan_simple': 'plan',
    'plan_complex': 'exec_review'
  }
  return map[currentState.value] || 'opp_scan'
})

const getStepStatus = (index) => {
  const currentIndex = productionSteps.findIndex(s => s.key === currentStepKey.value)
  
  if (index < currentIndex) return { status: 'done', isCompleted: true }
  if (index === currentIndex) {
    return { status: isBlocked.value ? 'blocked' : 'active', isCompleted: false }
  }
  return { status: 'pending', isCompleted: false }
}

const getStepHint = (key) => {
  if (key !== currentStepKey.value) return null
  
  if (isBlocked.value) {
    const blockHints = {
      'opp_scan': '等待数据接入...',
      'opp_confirm': '等待用户确认',
      'strategy': '系统计算中...',
      'plan': '等待审批',
      'exec_review': '等待执行反馈'
    }
    return blockHints[key] || '等待处理'
  }
  
  if (isIterating.value) {
    const loopHints = {
      'strategy': '正在优化参数...',
      'plan': '正在重新生成...',
      'exec_review': '正在调整计划...'
    }
    return loopHints[key]
  }
  
  return null
}

// --- View E: MiniMap Logic ---
const currentScenario = ref('S0')

const getBtnClass = (id) => {
  const base = "px-3 py-1.5 rounded border text-xs font-bold transition-colors "
  if (currentScenario.value === id) {
    return base + "bg-cyan-900/30 border-cyan-500 text-cyan-400"
  }
  return base + "bg-[#111] border-[#333] text-gray-500 hover:border-gray-500"
}

// --- Scenarios Data ---

const scenarios = {
  // 场景 0：首次进入
  S0: {
    scenario: "首次进入",
    currentStepKey: "strategy_setup",
    steps: [
      { 
        key: "strategy_setup", 
        title: "策略准备", 
        status: "active", 
        subStatusLabel: "等待生成策略",
        showNextFlow: true
      },
      { key: "opportunity_gate", title: "机会判定", status: "pending" },
      { key: "planning", title: "计划生成", status: "pending" },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 1：策略准备中
  S1: {
    scenario: "策略批量生成中",
    currentStepKey: "strategy_setup",
    steps: [
      { 
        key: "strategy_setup", 
        title: "策略准备", 
        status: "active", 
        subStatusLabel: "批量生成策略中…",
        showNextFlow: true
      },
      { key: "opportunity_gate", title: "机会判定", status: "pending" },
      { key: "planning", title: "计划生成", status: "pending" },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 4A：评估结果 = B级以上机会
  S4A: {
    scenario: "评估完成-B级以上机会",
    currentStepKey: "opportunity_gate",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { 
        key: "opportunity_gate", 
        title: "机会判定", 
        status: "active", 
        subStatusLabel: "B级以上机会",
        hint: "请点击下一步生成计划 →",
        showNextFlow: true
      },
      { key: "planning", title: "计划生成", status: "pending" },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 4B：评估结果 = 暂无机会
  S4B: {
    scenario: "评估完成-暂无机会-阻塞",
    currentStepKey: "opportunity_gate",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      {
        key: "opportunity_gate",
        title: "机会判定",
        status: "active",
        subStatus: "no_opportunity",
        subStatusLabel: "暂无机会",
        hint: "建议更改参数或更新策略后重试"
      },
      {
        key: "planning",
        title: "计划生成",
        status: "blocked",
        blockedReason: "需有策略机会"
      },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 4C：评估结果 = B级以下机会
  S4C: {
    scenario: "评估完成-B级以下-建议调整",
    currentStepKey: "opportunity_gate",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      {
        key: "opportunity_gate",
        title: "机会判定",
        status: "active",
        subStatusLabel: "B级以下机会",
        hint: "建议调整参数后再生成计划"
      },
      { 
        key: "planning", 
        title: "计划生成", 
        status: "blocked",
        blockedReason: "机会等级不足"
      },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 5A：生成简单计划
  S5A: {
    scenario: "生成简单计划",
    currentStepKey: "planning",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done", subStatusLabel: "选择：简单计划" },
      {
        key: "planning",
        title: "计划生成",
        status: "active",
        subStatus: "simple_plan",
        subStatusLabel: "简单计划生成中…"
      },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 5B：生成深度计划
  S5B: {
    scenario: "生成深度计划",
    currentStepKey: "planning",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done", subStatusLabel: "选择：深度计划" },
      {
        key: "planning",
        title: "计划生成",
        status: "active",
        subStatus: "deep_plan",
        subStatusLabel: "深度计划生成中…"
      },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 5C：计划手动更新中
  S5C: {
    scenario: "计划手动更新中",
    currentStepKey: "planning",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done", subStatusLabel: "可生成计划" },
      {
        key: "planning",
        title: "计划生成",
        status: "active",
        loopState: "manual_updating",
        subStatusLabel: "正在手动调整计划…"
      },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 6A：进入执行
  S6A: {
    scenario: "执行中",
    currentStepKey: "execution_loop",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done", subStatusLabel: "机会确认" },
      { key: "planning", title: "计划生成", status: "done", subStatusLabel: "计划已生成" },
      {
        key: "execution_loop",
        title: "执行/调整",
        status: "active",
        subStatus: "running",
        subStatusLabel: "执行中…"
      },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 6B：执行中需要改参数
  S6B: {
    scenario: "执行中-需要更改参数",
    currentStepKey: "execution_loop",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done" },
      { key: "planning", title: "计划生成", status: "done" },
      {
        key: "execution_loop",
        title: "执行/调整",
        status: "active",
        loopState: "manual_updating",
        subStatus: "needs_param_change",
        subStatusLabel: "需要更改参数",
        hint: "确认后会回到「机会判定」"
      },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 6C：回退到机会判定
  S6C: {
    scenario: "更改参数后-回到机会判定",
    currentStepKey: "opportunity_gate",
    steps: [
      {
        key: "strategy_setup",
        title: "策略准备",
        status: "done",
        subStatusLabel: "参数已更新"
      },
      {
        key: "opportunity_gate",
        title: "机会判定",
        status: "active",
        subStatusLabel: "重新判定中…"
      },
      { key: "planning", title: "计划生成", status: "pending" },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  },
  // 场景 7：完成
  S7: {
    scenario: "完成",
    currentStepKey: "completed",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      { key: "opportunity_gate", title: "机会判定", status: "done" },
      { key: "planning", title: "计划生成", status: "done" },
      { key: "execution_loop", title: "执行/调整", status: "done" },
      { key: "completed", title: "完成", status: "active", subStatusLabel: "流程已结束" }
    ]
  },
  // 场景 OPT：机会手动更新中
  S_OPT: {
    scenario: "机会手动更新中",
    currentStepKey: "opportunity_gate",
    steps: [
      { key: "strategy_setup", title: "策略准备", status: "done" },
      {
        key: "opportunity_gate",
        title: "机会判定",
        status: "active",
        loopState: "manual_updating",
        subStatusLabel: "手动更新机会中…"
      },
      { key: "planning", title: "计划生成", status: "pending" },
      { key: "execution_loop", title: "执行/调整", status: "pending" },
      { key: "completed", title: "完成", status: "pending" }
    ]
  }
}

const currentScenarioData = computed(() => {
  return scenarios[currentScenario.value] || scenarios['S0']
})

const handleMiniMapClick = (key) => {
  console.log('MiniMap clicked:', key)
  alert(`Clicked step: ${key}`)
}

</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 2s linear forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}

.animate-flow {
  stroke-dasharray: 8, 4;
  animation: flow 1s linear infinite;
}

@keyframes flow {
  to { stroke-dashoffset: -12; }
}
</style>