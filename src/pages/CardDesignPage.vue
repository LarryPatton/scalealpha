<template>
  <div class="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900">“重点突出”风格 - 10种变式</h1>
        <p class="mt-4 text-lg text-slate-600">基于方案8的核心理念（居中、大字号、强调数据），探索不同的视觉表现。</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        <!-- Variant 1: 原始增强版 (Enhanced Original) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 1: 原始增强版</h3>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center hover:shadow-md transition-shadow relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div class="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 bg-blue-50 inline-block px-2 py-0.5 rounded-full">Event-Driven</div>
            <h3 class="text-3xl font-black text-slate-900 mb-1 tracking-tight">ALAB</h3>
            <p class="text-sm text-slate-500 mb-6 line-clamp-1">“连接周”事件驱动套利</p>
            
            <div class="flex justify-center items-center gap-8 mb-6 bg-slate-50 rounded-xl p-4">
              <div>
                <div class="text-3xl font-black text-slate-800">A+</div>
                <div class="text-[10px] text-slate-400 uppercase font-bold mt-1">Rating</div>
              </div>
              <div class="w-px h-10 bg-slate-200"></div>
              <div>
                <div class="text-3xl font-black text-blue-600">90<span class="text-sm align-top">%</span></div>
                <div class="text-[10px] text-slate-400 uppercase font-bold mt-1">Conf</div>
              </div>
            </div>

            <div class="flex flex-wrap justify-center gap-2">
              <span class="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 font-medium shadow-sm">WAIT_LONG</span>
              <span class="px-2 py-1 bg-red-50 border border-red-100 rounded text-xs text-red-600 font-medium">High Risk</span>
            </div>
          </div>
        </div>

        <!-- Variant 2: 深色极客 (Dark Tech) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 2: 深色极客</h3>
          <div class="bg-slate-900 rounded-xl shadow-lg p-6 text-center text-white border border-slate-800">
            <div class="flex justify-center mb-4">
              <span class="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">EVENT-DRIVEN</span>
            </div>
            <h3 class="text-3xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">ALAB</h3>
            <p class="text-xs text-slate-400 mb-6 font-mono">“连接周”事件驱动套利</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6 border-y border-slate-800 py-4">
              <div class="text-center border-r border-slate-800">
                <div class="text-2xl font-bold text-white">A+</div>
                <div class="text-[10px] text-slate-500 uppercase">Rating</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-emerald-400">90%</div>
                <div class="text-[10px] text-slate-500 uppercase">Confidence</div>
              </div>
            </div>

            <div class="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1-10 DAYS</span>
              <span>GEMINI</span>
              <span class="text-red-400">HIGH RISK</span>
            </div>
          </div>
        </div>

        <!-- Variant 3: 环形图表 (Radial Chart) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 3: 环形图表</h3>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center gap-5">
            <div class="relative w-24 h-24 flex-shrink-0">
              <svg class="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#f1f5f9" stroke-width="8" fill="none" />
                <circle cx="48" cy="48" r="40" stroke="#3b82f6" stroke-width="8" fill="none" stroke-dasharray="251.2" stroke-dashoffset="25.12" stroke-linecap="round" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-xl font-bold text-slate-800">90%</span>
                <span class="text-[10px] text-slate-400">置信度</span>
              </div>
            </div>
            
            <div class="flex-1 text-left">
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-2xl font-bold text-slate-900">ALAB</h3>
                <span class="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">A+</span>
              </div>
              <p class="text-xs text-slate-500 mb-3 line-clamp-1">“连接周”事件驱动套利</p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">Event-Driven</span>
                <span class="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600">Short-term</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 4: 玻璃卡片 (Glass Card) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 4: 玻璃卡片</h3>
          <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-center text-white relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[1px]"></div>
            <div class="relative z-10">
              <div class="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold mb-3 backdrop-blur-md border border-white/20">
                EVENT-DRIVEN
              </div>
              <h3 class="text-3xl font-bold mb-1 text-white drop-shadow-sm">ALAB</h3>
              <p class="text-xs text-blue-100 mb-6">“连接周”事件驱动套利</p>
              
              <div class="grid grid-cols-3 gap-2 bg-black/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <div>
                  <div class="text-lg font-bold">A+</div>
                  <div class="text-[9px] text-blue-200 uppercase">Rating</div>
                </div>
                <div>
                  <div class="text-lg font-bold">90</div>
                  <div class="text-[9px] text-blue-200 uppercase">Conf</div>
                </div>
                <div>
                  <div class="text-lg font-bold text-red-200">High</div>
                  <div class="text-[9px] text-blue-200 uppercase">Risk</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 5: 上下分割 (Split Vertical) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 5: 上下分割</h3>
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden text-center">
            <div class="bg-slate-50 p-5 border-b border-slate-100">
              <h3 class="text-3xl font-bold text-slate-800 mb-1">ALAB</h3>
              <div class="flex justify-center items-center gap-2 text-sm text-slate-500">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                Event-Driven
              </div>
            </div>
            <div class="p-4 grid grid-cols-2 gap-px bg-slate-100">
              <div class="bg-white p-2">
                <div class="text-xs text-slate-400 mb-1">评级</div>
                <div class="text-xl font-bold text-slate-800">A+</div>
              </div>
              <div class="bg-white p-2">
                <div class="text-xs text-slate-400 mb-1">置信度</div>
                <div class="text-xl font-bold text-blue-600">90%</div>
              </div>
              <div class="bg-white p-2">
                <div class="text-xs text-slate-400 mb-1">周期</div>
                <div class="text-sm font-medium text-slate-700">WAIT_LONG</div>
              </div>
              <div class="bg-white p-2">
                <div class="text-xs text-slate-400 mb-1">风险</div>
                <div class="text-sm font-medium text-red-600">High</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 6: 极简大字 (Typography Big) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 6: 极简大字</h3>
          <div class="bg-white rounded-xl border border-slate-200 p-6 relative overflow-hidden group hover:border-blue-400 transition-colors">
            <div class="absolute -right-4 -top-4 text-9xl font-black text-slate-50 opacity-50 select-none pointer-events-none group-hover:text-blue-50 transition-colors">
              A+
            </div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-end mb-6">
                <div>
                  <div class="text-xs font-bold text-slate-400 uppercase mb-1">Stock</div>
                  <h3 class="text-4xl font-black text-slate-900 tracking-tighter">ALAB</h3>
                </div>
                <div class="text-right">
                  <div class="text-xs font-bold text-slate-400 uppercase mb-1">Conf</div>
                  <div class="text-3xl font-bold text-blue-600">90%</div>
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span class="text-slate-500">Strategy</span>
                  <span class="font-medium text-slate-800">Event-Driven</span>
                </div>
                <div class="flex justify-between items-center text-sm pt-1">
                  <span class="text-slate-500">Risk Level</span>
                  <span class="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 7: 胶囊风格 (Capsule Style) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 7: 胶囊风格</h3>
          <div class="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 text-center">
            <div class="inline-flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span class="text-[10px] font-bold text-slate-600 uppercase">Event-Driven</span>
            </div>
            
            <h3 class="text-2xl font-bold text-slate-900 mb-6">ALAB</h3>
            
            <div class="flex justify-center gap-3 mb-6">
              <div class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-2xl min-w-[80px]">
                <div class="text-xs opacity-70 mb-0.5">Rating</div>
                <div class="text-xl font-bold">A+</div>
              </div>
              <div class="bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl min-w-[80px]">
                <div class="text-xs opacity-70 mb-0.5">Conf</div>
                <div class="text-xl font-bold">90</div>
              </div>
            </div>

            <div class="text-xs text-slate-400">
              Short-term • High Risk • gemini
            </div>
          </div>
        </div>

        <!-- Variant 8: 侧边状态条 (Side Status) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 8: 侧边状态条</h3>
          <div class="bg-white rounded-lg shadow-sm border border-slate-200 flex overflow-hidden h-full">
            <div class="w-2 bg-emerald-500"></div> <!-- Rating Color -->
            <div class="p-5 flex-1 flex flex-col justify-center text-center">
              <h3 class="text-2xl font-bold text-slate-900 mb-1">ALAB</h3>
              <p class="text-xs text-slate-500 mb-4">Event-Driven</p>
              
              <div class="flex justify-center items-center gap-6 border-t border-slate-100 pt-4">
                <div class="flex flex-col items-center">
                  <span class="text-xs text-slate-400 mb-1">Rating</span>
                  <span class="font-bold text-emerald-600 text-lg">A+</span>
                </div>
                <div class="w-px h-8 bg-slate-100"></div>
                <div class="flex flex-col items-center">
                  <span class="text-xs text-slate-400 mb-1">Conf</span>
                  <span class="font-bold text-blue-600 text-lg">90%</span>
                </div>
                <div class="w-px h-8 bg-slate-100"></div>
                <div class="flex flex-col items-center">
                  <span class="text-xs text-slate-400 mb-1">Risk</span>
                  <span class="font-bold text-red-600 text-lg">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 9: 虚线边框 (Dashed Technical) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 9: 虚线边框</h3>
          <div class="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-5 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all">
            <div class="flex justify-between items-center mb-4">
              <span class="text-[10px] font-mono text-slate-400">ID: 8492</span>
              <span class="text-[10px] font-mono text-slate-400">MODEL: GEMINI</span>
            </div>
            
            <h3 class="text-3xl font-bold text-slate-800 mb-2">ALAB</h3>
            <div class="inline-block bg-white border border-slate-200 px-3 py-1 rounded text-xs font-medium text-slate-600 mb-6 shadow-sm">
              Event-Driven
            </div>
            
            <div class="flex justify-between items-end">
              <div class="text-left">
                <div class="text-xs text-slate-400">RATING</div>
                <div class="text-xl font-bold text-slate-800">A+</div>
              </div>
              <div class="text-center">
                <div class="text-xs text-slate-400">RISK</div>
                <div class="text-xl font-bold text-red-600">High</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-slate-400">CONF</div>
                <div class="text-xl font-bold text-blue-600">90%</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 10: 悬浮卡片 (Floating Action) -->
        <div class="space-y-2">
          <h3 class="text-sm font-medium text-slate-500 uppercase tracking-wider">变式 10: 悬浮卡片</h3>
          <div class="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] p-6 text-center relative group cursor-pointer">
            <div class="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500"></div>
            
            <h3 class="text-2xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">ALAB</h3>
            <p class="text-xs text-slate-400 mb-5">Event-Driven</p>
            
            <div class="flex justify-center items-baseline gap-1 mb-6">
              <span class="text-4xl font-bold text-slate-800">90</span>
              <span class="text-sm font-medium text-slate-500">%</span>
            </div>

            <div class="flex justify-center gap-2 opacity-100 transition-opacity">
              <span class="px-2 py-1 bg-slate-100 rounded text-[10px] text-slate-600 font-bold">A+</span>
              <span class="px-2 py-1 bg-slate-100 rounded text-[10px] text-slate-600">WAIT_LONG</span>
              <span class="px-2 py-1 bg-slate-100 rounded text-[10px] text-slate-600">1-10d</span>
            </div>
            
            <!-- Hover Overlay Button -->
            <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
              <button class="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg shadow-lg shadow-blue-200">
                查看详情
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for static display
</script>