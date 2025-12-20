<template>
  <div class="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-cyan-500/30">
    <Navbar />
    
    <main class="pt-20 px-4 lg:px-8 max-w-[1400px] mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white uppercase tracking-widest mb-2">Plan Status UI 方案展示</h1>
        <p class="text-sm text-gray-500 font-mono">三种可视化方案对比 - 请选择你偏好的方案</p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex gap-2 mb-6 bg-[#111] p-1 rounded-lg border border-[#222] w-fit">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-2 text-sm font-medium rounded-md transition-all"
          :class="activeTab === tab.id ? 'bg-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- ==================== 方案 A: 紧凑徽章式 ==================== -->
      <div v-if="activeTab === 'A'" class="animate-fade-in">
        <div class="mb-4 p-4 bg-cyan-900/20 border border-cyan-500/30 rounded-lg">
          <h2 class="text-lg font-bold text-cyan-400 mb-2">方案 A：紧凑徽章式</h2>
          <p class="text-sm text-gray-400">将多个信息压缩到表格单元格中，用图标 + 徽章 + 小数字表示，信息密度高。</p>
        </div>

        <!-- Table -->
        <div class="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-[#111] border-b border-[#222] text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div class="col-span-2">Symbol</div>
            <div class="col-span-1">Grade</div>
            <div class="col-span-1">Direction</div>
            <div class="col-span-2">Strategy</div>
            <div class="col-span-3">Plan Status</div>
            <div class="col-span-1">Source</div>
            <div class="col-span-2">Actions</div>
          </div>

          <!-- Table Body -->
          <div class="divide-y divide-[#1a1a1a]">
            <div v-for="item in demoDataA" :key="item.id" 
                 class="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-[#111] transition-colors items-center">
              <!-- Symbol -->
              <div class="col-span-2 flex items-center gap-2">
                <span class="font-mono font-bold text-white">{{ item.symbol }}</span>
                <span v-if="item.strategyUnread" class="w-2 h-2 bg-blue-500 rounded-full" title="策略未读"></span>
              </div>
              
              <!-- Grade -->
              <div class="col-span-1">
                <span class="px-2 py-1 text-xs font-bold rounded"
                      :class="getGradeClass(item.grade)">
                  {{ item.grade }}
                </span>
              </div>
              
              <!-- Direction -->
              <div class="col-span-1">
                <span class="flex items-center gap-1 text-sm"
                      :class="item.direction === 'LONG' ? 'text-emerald-400' : item.direction === 'SHORT' ? 'text-rose-400' : 'text-gray-400'">
                  <span v-if="item.direction === 'LONG'">▲</span>
                  <span v-else-if="item.direction === 'SHORT'">▼</span>
                  <span v-else>●</span>
                  {{ item.direction }}
                </span>
              </div>

              <!-- Strategy Status -->
              <div class="col-span-2 flex items-center gap-2">
                <span class="text-gray-400">📄</span>
                <span v-if="item.hasStrategy" class="text-sm text-gray-300">策略报告</span>
                <span v-else class="text-sm text-gray-600">无策略</span>
                <span v-if="item.strategyUnread" class="text-xs text-blue-400">●</span>
              </div>
              
              <!-- Plan Status (Compact Badges) -->
              <div class="col-span-3 flex items-center gap-2 flex-wrap">
                <!-- No Plan -->
                <template v-if="item.planCount === 0 && !item.planGeneratingCount">
                  <span class="text-gray-500 text-sm">⚪ 无 Plan</span>
                </template>
                
                <!-- Only Plan -->
                <template v-else-if="item.isOnlyPlan">
                  <span class="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                    🔵 Only Plan
                  </span>
                </template>
                
                <!-- With Plan -->
                <template v-else>
                  <span class="text-cyan-400 text-sm font-mono">📋{{ item.planCount }}</span>
                  <span v-if="item.planUnreadCount > 0" 
                        class="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full font-bold">
                    {{ item.planUnreadCount }}
                  </span>
                </template>
                
                <!-- Generating -->
                <span v-if="item.planGeneratingCount > 0" 
                      class="flex items-center gap-1 text-xs text-amber-400">
                  <svg class="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ item.planGeneratingCount }}
                </span>
                
                <!-- Needs Update -->
                <span v-if="item.planNeedsUpdate" 
                      class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" title="待更新"></span>
              </div>
              
              <!-- Source -->
              <div class="col-span-1">
                <span class="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333]"
                      :class="item.source === 'Official' ? 'text-cyan-400' : 'text-purple-400'">
                  {{ item.source === 'Official' ? 'Official' : 'My' }}
                </span>
              </div>
              
              <!-- Actions -->
              <div class="col-span-2">
                <button v-if="!item.isOnlyPlan && item.planGeneratingCount === 0"
                        class="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                  + 生成计划
                </button>
                <span v-else-if="item.planGeneratingCount > 0" class="text-xs text-gray-500">生成中...</span>
                <span v-else class="text-xs text-gray-600">—</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-4 p-3 bg-[#111] border border-[#222] rounded-lg flex flex-wrap gap-4 text-xs text-gray-400">
          <span class="flex items-center gap-1"><span class="w-2 h-2 bg-blue-500 rounded-full"></span> 策略未读</span>
          <span class="flex items-center gap-1">📋3 = 3个Plan</span>
          <span class="flex items-center gap-1"><span class="px-1 bg-red-500/20 text-red-400 rounded">2</span> 未读Plan数</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 bg-yellow-400 rounded-full"></span> 待更新</span>
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成中
          </span>
        </div>
      </div>

      <!-- ==================== 方案 B: 双行卡片式 ==================== -->
      <div v-if="activeTab === 'B'" class="animate-fade-in">
        <div class="mb-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h2 class="text-lg font-bold text-blue-400 mb-2">方案 B：双行卡片式</h2>
          <p class="text-sm text-gray-400">每个策略占用更大空间，左右分区展示策略与计划信息，视觉层次清晰。</p>
        </div>

        <!-- Card List -->
        <div class="space-y-3">
          <div v-for="item in demoDataB" :key="item.id" 
               class="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden hover:border-[#333] transition-all">
            
            <!-- Card Header -->
            <div class="px-4 py-2 bg-[#111] border-b border-[#1a1a1a] flex justify-between items-center">
              <div class="flex items-center gap-3">
                <span class="font-mono font-bold text-white text-lg">{{ item.symbol }}</span>
                <span class="text-sm text-gray-500">{{ item.stockName }}</span>
                <span v-if="item.strategyUnread" class="w-2 h-2 bg-blue-500 rounded-full" title="策略未读"></span>
              </div>
              <span class="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333]"
                    :class="item.source === 'Official' ? 'text-cyan-400' : 'text-purple-400'">
                {{ item.source }}
              </span>
            </div>
            
            <!-- Card Body -->
            <div class="p-4 flex gap-4">
              <!-- Left: Strategy Info Block -->
              <div class="w-48 bg-[#111] border border-[#1a1a1a] rounded-lg p-3 shrink-0">
                <div class="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  📄 策略报告
                  <span v-if="item.strategyUnread" class="text-blue-400 ml-1">● 未读</span>
                </div>
                
                <template v-if="item.hasStrategy">
                  <div class="flex items-center gap-3 mb-2">
                    <!-- Grade Badge -->
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                         :class="getGradeBgClass(item.grade)">
                      {{ item.grade }}
                    </div>
                    <!-- Direction -->
                    <div>
                      <div class="flex items-center gap-1 text-lg font-bold"
                           :class="item.direction === 'LONG' ? 'text-emerald-400' : item.direction === 'SHORT' ? 'text-rose-400' : 'text-gray-400'">
                        <span v-if="item.direction === 'LONG'">▲</span>
                        <span v-else-if="item.direction === 'SHORT'">▼</span>
                        <span v-else>●</span>
                        {{ item.direction }}
                      </div>
                      <div class="text-xs text-gray-500">方向</div>
                    </div>
                  </div>
                  <div class="text-xs text-gray-500">更新于 {{ item.updatedAgo }}</div>
                </template>
                
                <template v-else>
                  <div class="flex items-center justify-center h-16 text-gray-600 text-sm">
                    ⚪ 无策略报告
                  </div>
                </template>
              </div>
              
              <!-- Right: Plan Info Block -->
              <div class="flex-1 bg-[#111] border border-[#1a1a1a] rounded-lg p-3 relative">
                <div class="flex justify-between items-start mb-2">
                  <div class="text-xs text-gray-500 flex items-center gap-1">
                    📋 执行计划
                  </div>
                  <span v-if="item.planNeedsUpdate" 
                        class="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                    🟡 待更新
                  </span>
                </div>
                
                <!-- No Plan State -->
                <template v-if="item.planCount === 0 && !item.planGeneratingCount">
                  <div class="flex items-center justify-center h-20 text-gray-600">
                    <div class="text-center">
                      <div class="text-2xl mb-1">⚪</div>
                      <div class="text-sm">暂无执行计划</div>
                    </div>
                  </div>
                </template>
                
                <!-- Only Plan State -->
                <template v-else-if="item.isOnlyPlan">
                  <div class="mb-2">
                    <span class="text-2xl font-bold text-white">{{ item.planCount }}</span>
                    <span class="text-gray-400 ml-1">个计划</span>
                  </div>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="flex-1 h-2 bg-[#222] rounded-full overflow-hidden">
                      <div class="h-full bg-red-500 rounded-full" 
                           :style="{ width: (item.planUnreadCount / item.planCount * 100) + '%' }"></div>
                    </div>
                    <span class="text-xs text-red-400">{{ item.planUnreadCount }} 未读</span>
                  </div>
                  <div class="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30">
                    🔵 Only Plan 模式
                  </div>
                </template>
                
                <!-- With Plan State -->
                <template v-else-if="item.planCount > 0">
                  <div class="mb-2">
                    <span class="text-2xl font-bold text-white">{{ item.planCount }}</span>
                    <span class="text-gray-400 ml-1">个计划</span>
                  </div>
                  
                  <!-- Read/Unread Bar -->
                  <div class="flex items-center gap-2 mb-3">
                    <div class="flex-1 h-2 bg-[#222] rounded-full overflow-hidden flex">
                      <div class="h-full bg-red-500" 
                           :style="{ width: (item.planUnreadCount / item.planCount * 100) + '%' }"></div>
                      <div class="h-full bg-gray-600" 
                           :style="{ width: ((item.planCount - item.planUnreadCount) / item.planCount * 100) + '%' }"></div>
                    </div>
                    <span class="text-xs">
                      <span class="text-red-400">{{ item.planUnreadCount }} 未读</span>
                      <span class="text-gray-600 mx-1">|</span>
                      <span class="text-gray-400">{{ item.planCount - item.planUnreadCount }} 已读</span>
                    </span>
                  </div>
                  
                  <!-- Generating Progress -->
                  <div v-if="item.planGeneratingCount > 0" class="mt-2">
                    <div class="flex items-center gap-2 mb-1">
                      <svg class="w-4 h-4 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span class="text-sm text-amber-400">{{ item.planGeneratingCount }} 个生成中</span>
                    </div>
                    <div class="h-1.5 bg-[#222] rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all animate-pulse" 
                           :style="{ width: item.generatingProgress + '%' }"></div>
                    </div>
                    <div class="text-right text-xs text-gray-500 mt-1">{{ item.generatingProgress }}%</div>
                  </div>
                </template>
                
                <!-- Generating Only (No existing plans) -->
                <template v-else-if="item.planGeneratingCount > 0">
                  <div class="flex flex-col items-center justify-center h-20">
                    <div class="flex items-center gap-2 mb-2">
                      <svg class="w-6 h-6 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span class="text-lg text-amber-400">正在生成 {{ item.planGeneratingCount }} 个计划...</span>
                    </div>
                    <div class="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full animate-pulse" 
                           :style="{ width: item.generatingProgress + '%' }"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">{{ item.generatingProgress }}%</div>
                  </div>
                </template>
              </div>
              
              <!-- Action Button -->
              <div class="w-32 flex items-center justify-center shrink-0">
                <button v-if="!item.isOnlyPlan && item.planGeneratingCount === 0"
                        class="px-4 py-2 text-sm font-medium bg-[#1a1a1a] border border-[#333] rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all w-full">
                  + 生成计划
                </button>
                <div v-else-if="item.planGeneratingCount > 0" 
                     class="px-4 py-2 text-sm text-gray-500 bg-[#111] border border-[#222] rounded-lg w-full text-center">
                  ⏳ 生成中...
                </div>
                <span v-else class="text-gray-600">—</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ==================== 方案 C: 悬浮详情式 ==================== -->
      <div v-if="activeTab === 'C'" class="animate-fade-in">
        <div class="mb-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h2 class="text-lg font-bold text-purple-400 mb-2">方案 C：悬浮详情式</h2>
          <p class="text-sm text-gray-400">表格只显示核心状态，详细信息通过鼠标悬浮 Tooltip 展示，保持界面简洁。</p>
        </div>

        <!-- Table -->
        <div class="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden">
          <!-- Table Header -->
          <div class="grid grid-cols-12 gap-4 px-4 py-3 bg-[#111] border-b border-[#222] text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div class="col-span-2">Symbol</div>
            <div class="col-span-1">Grade</div>
            <div class="col-span-2">Direction</div>
            <div class="col-span-3">Plan (悬浮查看详情)</div>
            <div class="col-span-2">Source</div>
            <div class="col-span-2">Actions</div>
          </div>

          <!-- Table Body -->
          <div class="divide-y divide-[#1a1a1a]">
            <div v-for="item in demoDataC" :key="item.id" 
                 class="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-[#111] transition-colors items-center">
              <!-- Symbol -->
              <div class="col-span-2 flex items-center gap-2">
                <span class="font-mono font-bold text-white">{{ item.symbol }}</span>
                <span v-if="item.strategyUnread" class="w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
              
              <!-- Grade -->
              <div class="col-span-1">
                <span class="px-2 py-1 text-xs font-bold rounded"
                      :class="getGradeClass(item.grade)">
                  {{ item.grade }}
                </span>
              </div>
              
              <!-- Direction -->
              <div class="col-span-2">
                <span class="flex items-center gap-1 text-sm"
                      :class="item.direction === 'LONG' ? 'text-emerald-400' : item.direction === 'SHORT' ? 'text-rose-400' : 'text-gray-400'">
                  <span v-if="item.direction === 'LONG'">▲</span>
                  <span v-else-if="item.direction === 'SHORT'">▼</span>
                  <span v-else>●</span>
                  {{ item.direction }}
                </span>
              </div>
              
              <!-- Plan Status (Minimal with Tooltip) -->
              <div class="col-span-3 relative group">
                <div class="flex items-center gap-2 cursor-pointer">
                  <!-- Status Icon -->
                  <template v-if="item.planCount === 0 && !item.planGeneratingCount">
                    <span class="text-gray-500">⚪ —</span>
                  </template>
                  <template v-else-if="item.isOnlyPlan">
                    <span class="text-blue-400">🔵 Only</span>
                  </template>
                  <template v-else>
                    <span class="text-cyan-400 font-mono">📋 {{ item.planCount }}</span>
                    <span v-if="item.planUnreadCount > 0" class="w-2 h-2 bg-red-500 rounded-full"></span>
                  </template>
                  
                  <span v-if="item.planGeneratingCount > 0">
                    <svg class="w-3 h-3 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  <span v-if="item.planNeedsUpdate" class="w-2 h-2 bg-yellow-400 rounded-full"></span>
                </div>
                
                <!-- Tooltip -->
                <div class="absolute left-0 top-full mt-2 w-64 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-2xl p-4 z-50 
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                  <div class="text-sm font-bold text-white mb-3 border-b border-[#333] pb-2">📋 Plan Details</div>
                  
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-400">Total Plans:</span>
                      <span class="text-white font-mono">{{ item.planCount }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Unread:</span>
                      <span class="text-red-400 font-mono">{{ item.planUnreadCount }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Generating:</span>
                      <span class="text-amber-400 font-mono">{{ item.planGeneratingCount }}</span>
                    </div>
                    <div v-if="item.planGeneratingCount > 0">
                      <div class="h-1.5 bg-[#222] rounded-full overflow-hidden mt-1">
                        <div class="h-full bg-amber-500 rounded-full" :style="{ width: item.generatingProgress + '%' }"></div>
                      </div>
                      <div class="text-right text-xs text-gray-500 mt-0.5">{{ item.generatingProgress }}%</div>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">Needs Update:</span>
                      <span :class="item.planNeedsUpdate ? 'text-yellow-400' : 'text-gray-600'">
                        {{ item.planNeedsUpdate ? 'Yes 🟡' : 'No' }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="mt-3 pt-2 border-t border-[#333] flex gap-2">
                    <button class="flex-1 px-2 py-1.5 text-xs bg-cyan-600 text-white rounded hover:bg-cyan-500 transition-colors">
                      + 生成新计划
                    </button>
                    <button class="flex-1 px-2 py-1.5 text-xs bg-[#222] text-gray-300 rounded hover:bg-[#333] transition-colors">
                      查看全部
                    </button>
                  </div>
                  
                  <!-- Arrow -->
                  <div class="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#333]"></div>
                </div>
              </div>
              
              <!-- Source -->
              <div class="col-span-2">
                <span class="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333]"
                      :class="item.source === 'Official' ? 'text-cyan-400' : 'text-purple-400'">
                  {{ item.source }}
                </span>
              </div>
              
              <!-- Actions -->
              <div class="col-span-2">
                <button v-if="!item.isOnlyPlan && item.planGeneratingCount === 0"
                        class="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                  + 生成计划
                </button>
                <span v-else-if="item.planGeneratingCount > 0" class="text-xs text-gray-500">生成中...</span>
                <span v-else class="text-xs text-gray-600">—</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hint -->
        <div class="mt-4 p-3 bg-[#111] border border-[#222] rounded-lg text-xs text-gray-400">
          💡 提示：将鼠标悬浮在 Plan 列上可查看详细信息
        </div>
      </div>

      <!-- ==================== 方案 D: 独立列式 ==================== -->
      <div v-if="activeTab === 'D'" class="animate-fade-in">
        <div class="mb-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
          <h2 class="text-lg font-bold text-orange-400 mb-2">方案 D：独立列式</h2>
          <p class="text-sm text-gray-400">每个信息用独立的一列表示，信息最清晰，但列数较多。适合大屏幕或信息展示需求高的场景。</p>
        </div>

        <!-- Table with horizontal scroll -->
        <div class="bg-[#0a0a0a] border border-[#222] rounded-lg overflow-x-auto">
          <table class="w-full min-w-[1400px] border-collapse">
            <!-- Column Group - 统一定义列宽，表头和表体自动对齐 -->
            <colgroup>
              <col class="w-[70px]" />      <!-- Ticker -->
              <col class="w-[50px]" />      <!-- Grade -->
              <col class="w-[85px]" />      <!-- Direction -->
              <col class="w-[75px]" />      <!-- Horizon -->
              <col class="w-auto" />        <!-- Strategy (flex) -->
              <col class="w-[70px]" />      <!-- Source -->
              <col class="w-[90px]" />      <!-- Created -->
              <col class="w-[80px]" />      <!-- 策略更新 -->
              <col class="w-[85px]" />      <!-- 状态 -->
              <col class="w-[55px]" />      <!-- Plan -->
              <col class="w-[55px]" />      <!-- 未读 -->
              <col class="w-[100px]" />     <!-- 生成中 -->
              <col class="w-[80px]" />      <!-- 计划更新 -->
              <col class="w-[80px]" />      <!-- Actions -->
            </colgroup>
            
            <!-- First Layer: Category Headers -->
            <thead>
              <tr class="bg-[#0a0a0a] border-b border-[#333]">
                <th rowspan="2" class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-r border-[#333] bg-[#0a0a0a] align-middle cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('symbol')">
                  <div class="flex items-center gap-1">
                    Ticker
                    <span class="text-[10px] opacity-60">{{ getSortIcon('symbol') }}</span>
                  </div>
                </th>
                <th colspan="7" class="px-4 py-3 text-center border-r border-[#333]">
                  <span class="text-sm font-bold text-amber-500 tracking-wider">策略</span>
                </th>
                <th colspan="6" class="px-4 py-3 text-center">
                  <span class="text-sm font-bold text-cyan-500 tracking-wider">计划</span>
                </th>
              </tr>
              
              <!-- Second Layer: Column Headers -->
              <tr class="bg-[#111] border-b border-[#222] text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('grade')">
                  <div class="flex items-center justify-center gap-1">
                    Grade
                    <span class="text-[10px] opacity-60">{{ getSortIcon('grade') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-left border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('direction')">
                  <div class="flex items-center gap-1">
                    Direction
                    <span class="text-[10px] opacity-60">{{ getSortIcon('direction') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('horizon')">
                  <div class="flex items-center justify-center gap-1">
                    Horizon
                    <span class="text-[10px] opacity-60">{{ getSortIcon('horizon') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-left border-r border-[#1a1a1a]">Strategy</th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('source')">
                  <div class="flex items-center justify-center gap-1">
                    Source
                    <span class="text-[10px] opacity-60">{{ getSortIcon('source') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('created')">
                  <div class="flex items-center justify-center gap-1">
                    Created
                    <span class="text-[10px] opacity-60">{{ getSortIcon('created') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-center border-r border-[#333]">更新</th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a]">状态</th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('planCount')">
                  <div class="flex items-center justify-center gap-1">
                    Plan
                    <span class="text-[10px] opacity-60">{{ getSortIcon('planCount') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a] cursor-pointer hover:text-gray-300 transition-colors select-none"
                    @click="toggleSortD('planUnreadCount')">
                  <div class="flex items-center justify-center gap-1">
                    未读
                    <span class="text-[10px] opacity-60">{{ getSortIcon('planUnreadCount') }}</span>
                  </div>
                </th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a]">生成中</th>
                <th class="px-3 py-3 text-center border-r border-[#1a1a1a]">更新</th>
                <th class="px-3 py-3 text-left">Actions</th>
              </tr>
            </thead>
            
            <!-- Table Body -->
            <tbody class="divide-y divide-[#1a1a1a]">
              <tr v-for="item in sortedDataD" :key="item.id" 
                  class="hover:bg-[#111] transition-colors group">
                <!-- Ticker -->
                <td class="px-4 py-3">
                  <span class="font-mono font-bold text-white">{{ item.symbol }}</span>
                </td>
                
                <!-- Grade - Only Plan 时为空 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="!item.isOnlyPlan && item.hasStrategy">
                    <span class="px-2 py-1 text-xs font-bold rounded"
                          :class="getGradeClass(item.grade)">
                      {{ item.grade }}
                    </span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Direction - Only Plan 时为空 -->
                <td class="px-3 py-3">
                  <template v-if="!item.isOnlyPlan && item.hasStrategy">
                    <span class="flex items-center gap-1.5 text-sm"
                          :class="item.direction === 'LONG' ? 'text-emerald-400' : item.direction === 'SHORT' ? 'text-rose-400' : 'text-gray-400'">
                      <span v-if="item.direction === 'LONG'">▲</span>
                      <span v-else-if="item.direction === 'SHORT'">▼</span>
                      <span v-else>●</span>
                      {{ item.direction }}
                    </span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Horizon - Only Plan 时为空 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="!item.isOnlyPlan && item.hasStrategy">
                    <span class="text-xs px-2 py-1 rounded"
                          :class="{
                            'bg-purple-500/20 text-purple-400 border border-purple-500/30': item.horizon === 'LT',
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30': item.horizon === 'MT',
                            'bg-green-500/20 text-green-400 border border-green-500/30': item.horizon === 'ST'
                          }">
                      {{ item.horizon }}
                    </span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>

                <!-- 策略状态 - Only Plan 时为空 -->
                <td class="px-3 py-3">
                  <template v-if="!item.isOnlyPlan">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2 min-w-0 flex-1">
                        <template v-if="item.hasStrategy">
                          <span v-if="item.strategyUnread" 
                                class="w-2 h-2 bg-blue-500 rounded-full glow-info-sm shrink-0"></span>
                          <span v-else 
                                class="w-2 h-2 bg-gray-600 rounded-full shrink-0"></span>
                          <span class="text-sm truncate"
                                :class="item.strategyUnread ? 'text-white font-medium' : 'text-gray-500'">
                            {{ item.stockName }}
                          </span>
                        </template>
                        <template v-else>
                          <span class="w-2 h-2 bg-gray-700 rounded-full shrink-0"></span>
                          <span class="text-gray-600 text-sm truncate">{{ item.stockName }}</span>
                        </template>
                      </div>
                      <button v-if="item.hasStrategy"
                              class="text-[10px] text-cyan-400 font-bold uppercase tracking-wider border border-cyan-500/30 px-2 py-1 rounded bg-[#0a0a0a]/90 whitespace-nowrap glow-primary-sm hover:bg-cyan-900/30 hover:border-cyan-500/50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100 shrink-0">
                        <svg class="w-3 h-3 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        View
                      </button>
                    </div>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Source - Only Plan 时为空 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="!item.isOnlyPlan">
                    <span class="text-xs px-2 py-1 rounded bg-[#1a1a1a] border border-[#333]"
                          :class="item.source === 'Official' ? 'text-cyan-400' : 'text-purple-400'">
                      {{ item.source === 'Official' ? 'Official' : 'My' }}
                    </span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Created - Only Plan 时为空 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="!item.isOnlyPlan && item.hasStrategy && item.created">
                    <span class="text-xs text-gray-400 font-mono">{{ item.created }}</span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- 策略待更新 - Only Plan 时为空 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="!item.isOnlyPlan">
                    <div v-if="item.strategyNeedsUpdate" class="group/update relative">
                      <!-- 默认显示：建议更新 -->
                      <span class="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded border border-orange-500/30 group-hover/update:opacity-0 transition-opacity whitespace-nowrap">
                        <span class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                        建议更新
                      </span>
                      <!-- Hover 显示：Update 按钮 -->
                      <button class="absolute inset-0 w-full h-full flex items-center justify-center px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded opacity-0 group-hover/update:opacity-100 transition-opacity hover:bg-orange-400 cursor-pointer whitespace-nowrap">
                        Update
                      </button>
                    </div>
                    <span v-else class="text-gray-600">—</span>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Plan 状态 -->
                <td class="px-3 py-3 text-center">
                  <span v-if="item.planCount === 0 && !item.planGeneratingCount && !item.isOnlyPlan" 
                        class="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded whitespace-nowrap">
                    无 Plan
                  </span>
                  <span v-else-if="item.isOnlyPlan" 
                        class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30 whitespace-nowrap">
                    Only Plan
                  </span>
                  <span v-else 
                        class="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded border border-cyan-500/30 whitespace-nowrap">
                    With Plan
                  </span>
                </td>
                
                <!-- Plan 数量 -->
                <td class="px-3 py-3 text-center">
                  <span v-if="item.planCount > 0" class="text-white font-mono font-bold text-sm">
                    {{ item.planCount }}
                  </span>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- 未读数 -->
                <td class="px-3 py-3 text-center">
                  <span v-if="item.planUnreadCount > 0" 
                        class="inline-flex items-center justify-center w-6 h-6 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                    {{ item.planUnreadCount }}
                  </span>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- 生成中 -->
                <td class="px-3 py-3 text-center">
                  <template v-if="item.planGeneratingCount > 0">
                    <div class="flex items-center justify-center gap-1.5">
                      <svg class="w-4 h-4 text-amber-400 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span class="text-amber-400 font-mono text-sm font-bold">{{ item.generatingCurrent || 1 }}/{{ item.planGeneratingCount }}</span>
                    </div>
                    <div class="w-full h-1 bg-[#222] rounded-full mt-1 overflow-hidden">
                      <div class="h-full bg-amber-500 rounded-full transition-all" 
                           :style="{ width: item.generatingProgress + '%' }"></div>
                    </div>
                  </template>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- 计划待更新 -->
                <td class="px-3 py-3 text-center">
                  <div v-if="item.planNeedsUpdate" class="group/planupdate relative">
                    <!-- 默认显示：建议更新 -->
                    <span class="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30 group-hover/planupdate:opacity-0 transition-opacity whitespace-nowrap">
                      <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
                      建议更新
                    </span>
                    <!-- Hover 显示：Update 按钮 -->
                    <button class="absolute inset-0 w-full h-full flex items-center justify-center px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded opacity-0 group-hover/planupdate:opacity-100 transition-opacity hover:bg-yellow-400 cursor-pointer whitespace-nowrap">
                      Update
                    </button>
                  </div>
                  <span v-else class="text-gray-600">—</span>
                </td>
                
                <!-- Actions - 只有生成按钮 -->
                <td class="px-3 py-3">
                  <button class="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#333] rounded hover:border-cyan-500/50 hover:text-cyan-400 transition-all whitespace-nowrap">
                    生成
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Column Legend -->
        <div class="mt-4 p-4 bg-[#111] border border-[#222] rounded-lg">
          <div class="text-sm font-bold text-gray-400 mb-3">📋 列说明</div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Symbol</span>
              <span class="text-gray-300">股票代码</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Grade</span>
              <span class="text-gray-300">策略评级</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Direction</span>
              <span class="text-gray-300">交易方向</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">策略</span>
              <span class="text-gray-300">策略报告已读/未读</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Plan 状态</span>
              <span class="text-gray-300">无Plan / Only / With</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Plan 数</span>
              <span class="text-gray-300">执行计划总数</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">未读数</span>
              <span class="text-gray-300">未读 Plan 数量</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">生成中</span>
              <span class="text-gray-300">正在生成的 Plan 数 + 进度</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">待更新</span>
              <span class="text-gray-300">Plan 是否需要更新</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-16 text-gray-500">Source</span>
              <span class="text-gray-300">策略来源</span>
            </div>
          </div>
        </div>

        <!-- Pros & Cons -->
        <div class="mt-4 grid grid-cols-2 gap-4">
          <div class="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
            <div class="text-sm font-bold text-emerald-400 mb-2">✅ 优点</div>
            <ul class="text-xs text-gray-400 space-y-1">
              <li>• 每列信息明确，无歧义</li>
              <li>• 易于排序和筛选</li>
              <li>• 适合数据分析场景</li>
              <li>• 信息展示最完整</li>
            </ul>
          </div>
          <div class="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
            <div class="text-sm font-bold text-red-400 mb-2">❌ 缺点</div>
            <ul class="text-xs text-gray-400 space-y-1">
              <li>• 列数过多，需要水平滚动</li>
              <li>• 小屏幕体验不佳</li>
              <li>• 视觉密度高，可能疲劳</li>
              <li>• 占用更多水平空间</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 pb-8 text-center text-sm text-gray-600">
        请选择你偏好的方案，或提出修改意见
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'

const tabs = [
  { id: 'A', label: '方案 A：紧凑徽章式' },
  { id: 'B', label: '方案 B：双行卡片式' },
  { id: 'C', label: '方案 C：悬浮详情式' },
  { id: 'D', label: '方案 D：独立列式' },
]

const activeTab = ref('A')

// Helper functions
const getGradeClass = (grade) => {
  const classes = {
    'A': 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    'B': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'C': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'D': 'bg-red-500/20 text-red-400 border border-red-500/30',
    'N/A': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  }
  return classes[grade] || classes['N/A']
}

const getGradeBgClass = (grade) => {
  const classes = {
    'A': 'bg-emerald-500/30 text-emerald-400',
    'B': 'bg-blue-500/30 text-blue-400',
    'C': 'bg-yellow-500/30 text-yellow-400',
    'D': 'bg-red-500/30 text-red-400',
    'N/A': 'bg-gray-500/30 text-gray-400',
  }
  return classes[grade] || classes['N/A']
}

// 方案 D 排序功能
const sortKeyD = ref('')
const sortOrderD = ref('asc') // 'asc' | 'desc'

const toggleSortD = (key) => {
  if (sortKeyD.value === key) {
    sortOrderD.value = sortOrderD.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKeyD.value = key
    sortOrderD.value = 'asc'
  }
}

const getSortIcon = (key) => {
  if (sortKeyD.value !== key) return '↕'
  return sortOrderD.value === 'asc' ? '↑' : '↓'
}

const sortedDataD = computed(() => {
  if (!sortKeyD.value) return demoDataD.value
  
  return [...demoDataD.value].sort((a, b) => {
    let aVal = a[sortKeyD.value]
    let bVal = b[sortKeyD.value]
    
    // 处理特殊类型
    if (typeof aVal === 'boolean') {
      aVal = aVal ? 1 : 0
      bVal = bVal ? 1 : 0
    }
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = bVal.toLowerCase()
    }
    
    let result = 0
    if (aVal < bVal) result = -1
    if (aVal > bVal) result = 1
    
    return sortOrderD.value === 'asc' ? result : -result
  })
})

// Demo data for all schemes
const demoDataA = ref([
  { 
    id: 1, symbol: 'AAPL', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true,
    planCount: 3, planUnreadCount: 2, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: false
  },
  { 
    id: 2, symbol: 'TSLA', grade: 'B', direction: 'SHORT', source: 'Official',
    hasStrategy: true, strategyUnread: false,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: false
  },
  { 
    id: 3, symbol: 'COIN', grade: 'B', direction: 'LONG', source: 'My Strategy',
    hasStrategy: false, strategyUnread: false,
    planCount: 1, planUnreadCount: 1, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: true
  },
  { 
    id: 4, symbol: 'MSFT', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: false,
    planCount: 5, planUnreadCount: 2, planGeneratingCount: 1, planNeedsUpdate: true, isOnlyPlan: false, generatingProgress: 45
  },
  { 
    id: 5, symbol: 'NVDA', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 3, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 60
  },
])

const demoDataB = ref([
  { 
    id: 1, symbol: 'AAPL', stockName: 'Apple Inc.', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true, updatedAgo: '2小时前',
    planCount: 5, planUnreadCount: 2, planGeneratingCount: 1, planNeedsUpdate: true, isOnlyPlan: false, generatingProgress: 45
  },
  { 
    id: 2, symbol: 'TSLA', stockName: 'Tesla, Inc.', grade: 'B', direction: 'SHORT', source: 'Official',
    hasStrategy: true, strategyUnread: false, updatedAgo: '5小时前',
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: false
  },
  { 
    id: 3, symbol: 'COIN', stockName: 'Coinbase Global Inc.', grade: 'B', direction: 'LONG', source: 'My Strategy',
    hasStrategy: false, strategyUnread: false, updatedAgo: '',
    planCount: 1, planUnreadCount: 1, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: true
  },
  { 
    id: 4, symbol: 'NVDA', stockName: 'NVIDIA Corporation', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true, updatedAgo: '1天前',
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 3, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 60
  },
])

const demoDataC = ref([
  { 
    id: 1, symbol: 'AAPL', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true,
    planCount: 3, planUnreadCount: 2, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 2, symbol: 'TSLA', grade: 'B', direction: 'SHORT', source: 'Official',
    hasStrategy: true, strategyUnread: false,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 3, symbol: 'COIN', grade: 'B', direction: 'LONG', source: 'My Strategy',
    hasStrategy: false, strategyUnread: false,
    planCount: 1, planUnreadCount: 1, planGeneratingCount: 0, planNeedsUpdate: false, isOnlyPlan: true, generatingProgress: 0
  },
  { 
    id: 4, symbol: 'MSFT', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: false,
    planCount: 5, planUnreadCount: 2, planGeneratingCount: 1, planNeedsUpdate: true, isOnlyPlan: false, generatingProgress: 45
  },
  { 
    id: 5, symbol: 'NVDA', grade: 'A', direction: 'LONG', source: 'Official',
    hasStrategy: true, strategyUnread: true,
    planCount: 2, planUnreadCount: 0, planGeneratingCount: 3, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 60
  },
])

// Demo data for Scheme D - Independent Columns
// strategyNeedsUpdate: 策略是否需要更新
// generatingCurrent: 当前正在生成第几个（用于显示 1/3 格式）
const demoDataD = ref([
  { 
    id: 1, symbol: 'AAPL', stockName: 'Apple Inc.', grade: 'A', direction: 'LONG', horizon: 'LT', source: 'Official', created: '2024-01-15',
    hasStrategy: true, strategyUnread: true, strategyNeedsUpdate: false,
    planCount: 3, planUnreadCount: 2, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 2, symbol: 'TSLA', stockName: 'Tesla, Inc.', grade: 'B', direction: 'SHORT', horizon: 'ST', source: 'Official', created: '2024-01-10',
    hasStrategy: true, strategyUnread: false, strategyNeedsUpdate: false,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 3, symbol: 'COIN', stockName: 'Coinbase Global Inc.', grade: 'B', direction: 'LONG', horizon: '', source: 'My Strategy', created: '',
    hasStrategy: false, strategyUnread: false, strategyNeedsUpdate: false,
    planCount: 1, planUnreadCount: 1, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: false, isOnlyPlan: true, generatingProgress: 0
  },
  { 
    id: 4, symbol: 'MSFT', stockName: 'Microsoft Corporation', grade: 'A', direction: 'LONG', horizon: 'MT', source: 'Official', created: '2024-01-08',
    hasStrategy: true, strategyUnread: false, strategyNeedsUpdate: true,
    planCount: 5, planUnreadCount: 2, planGeneratingCount: 1, generatingCurrent: 1, planNeedsUpdate: true, isOnlyPlan: false, generatingProgress: 45
  },
  { 
    id: 5, symbol: 'NVDA', stockName: 'NVIDIA Corporation', grade: 'A', direction: 'LONG', horizon: 'LT', source: 'Official', created: '2024-01-12',
    hasStrategy: true, strategyUnread: true, strategyNeedsUpdate: false,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 3, generatingCurrent: 1, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 60
  },
  { 
    id: 6, symbol: 'GOOGL', stockName: 'Alphabet Inc.', grade: 'A', direction: 'LONG', horizon: 'MT', source: 'Official', created: '2024-01-05',
    hasStrategy: true, strategyUnread: false, strategyNeedsUpdate: false,
    planCount: 4, planUnreadCount: 0, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: true, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 7, symbol: 'META', stockName: 'Meta Platforms Inc.', grade: 'C', direction: 'NEUTRAL', horizon: 'ST', source: 'My Strategy', created: '2024-01-14',
    hasStrategy: true, strategyUnread: true, strategyNeedsUpdate: true,
    planCount: 2, planUnreadCount: 1, planGeneratingCount: 2, generatingCurrent: 2, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 30
  },
  { 
    id: 8, symbol: 'INTC', stockName: 'Intel Corporation', grade: 'D', direction: 'SHORT', horizon: 'MT', source: 'Official', created: '2024-01-03',
    hasStrategy: true, strategyUnread: false, strategyNeedsUpdate: false,
    planCount: 1, planUnreadCount: 0, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
  { 
    id: 9, symbol: 'IBM', stockName: 'International Business Ma...', grade: 'C', direction: 'NEUTRAL', horizon: '', source: 'Official', created: '',
    hasStrategy: false, strategyUnread: false, strategyNeedsUpdate: false,
    planCount: 0, planUnreadCount: 0, planGeneratingCount: 0, generatingCurrent: 0, planNeedsUpdate: false, isOnlyPlan: false, generatingProgress: 0
  },
])
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
