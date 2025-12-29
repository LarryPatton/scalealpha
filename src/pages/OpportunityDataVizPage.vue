<template>
  <div class="min-h-screen flex flex-col pb-24" :style="{ backgroundColor: colors.background.base }">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <div class="px-8 py-12 text-center border-b" :style="{ borderColor: colors.border.subtle }">
      <h1 class="text-4xl font-bold mb-3" :style="{ color: colors.text.primary }">
        交易数据可视化方案库
      </h1>
      <p class="text-lg mb-6" :style="{ color: colors.text.muted }">
        探索风险回报比与时间周期的多种创意可视化方案
      </p>
      
      <!-- Toggle Buttons -->
      <div class="flex justify-center gap-4">
        <button 
          @click="activeSection = 'ratio'"
          class="px-6 py-2 rounded-md font-bold transition-all"
          :style="activeSection === 'ratio' ? 
            { backgroundColor: colors.accent.primary, color: '#000' } : 
            { backgroundColor: colors.background.elevated, color: colors.text.secondary }"
        >
          📊 风险回报比 (8种方案)
        </button>
        <button 
          @click="activeSection = 'time'"
          class="px-6 py-2 rounded-md font-bold transition-all"
          :style="activeSection === 'time' ? 
            { backgroundColor: colors.accent.primary, color: '#000' } : 
            { backgroundColor: colors.background.elevated, color: colors.text.secondary }"
        >
          ⏰ 时间周期 (8种方案)
        </button>
        <button 
          @click="activeSection = 'combined'"
          class="px-6 py-2 rounded-md font-bold transition-all"
          :style="activeSection === 'combined' ? 
            { backgroundColor: colors.accent.primary, color: '#000' } : 
            { backgroundColor: colors.background.elevated, color: colors.text.secondary }"
        >
          🎯 组合方案 (3种)
        </button>
      </div>
    </div>

    <!-- Risk-Reward Ratio Visualizations -->
    <div v-if="activeSection === 'ratio'" class="px-8 py-12">
      <div class="grid grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        
        <!-- Ratio Viz 1: 水平进度条 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">1. 水平进度条（横向对比型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">强调回报优势，适合需要突出收益时</p>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-xs w-12" :style="{ color: colors.text.disabled }">风险</span>
              <div class="flex-1 flex items-center">
                <div class="w-8 h-6 bg-rose-500/20 border border-rose-500/40 rounded-l flex items-center justify-center text-xs font-bold text-rose-400">1</div>
                <div class="flex-1 h-6 bg-gradient-to-r from-emerald-500/40 to-emerald-500/60 border-y border-r border-emerald-500/40 rounded-r flex items-center justify-center text-xs font-bold text-emerald-300">
                  5.8 倍回报
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-xs w-12" :style="{ color: colors.text.disabled }">MA</span>
              <div class="flex-1 flex items-center">
                <div class="w-8 h-6 bg-rose-500/20 border border-rose-500/40 rounded-l flex items-center justify-center text-xs font-bold text-rose-400">1</div>
                <div class="w-[40%] h-6 bg-gradient-to-r from-blue-500/40 to-blue-500/60 border-y border-r border-blue-500/40 rounded-r flex items-center justify-center text-xs font-bold text-blue-300">
                  2.8×
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 2: 双向柱状图 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">2. 双向柱状图（对称型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">视觉对比强烈，并排对比多策略时使用</p>
          
          <div class="flex items-center justify-center gap-8">
            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center gap-2">
                <span class="text-xs" :style="{ color: colors.text.muted }">回报</span>
                <div class="h-6 bg-emerald-500 rounded" style="width: 116px;"></div>
                <span class="text-sm font-bold text-emerald-400">5.8</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs" :style="{ color: colors.text.muted }">风险</span>
                <div class="h-6 bg-rose-500/60 rounded" style="width: 20px;"></div>
                <span class="text-sm font-bold text-rose-400">1</span>
              </div>
            </div>
            
            <div class="w-px h-16" :style="{ backgroundColor: colors.border.strong }"></div>
            
            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center gap-2">
                <span class="text-xs" :style="{ color: colors.text.muted }">回报</span>
                <div class="h-6 bg-blue-500 rounded" style="width: 56px;"></div>
                <span class="text-sm font-bold text-blue-400">2.8</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs" :style="{ color: colors.text.muted }">风险</span>
                <div class="h-6 bg-rose-500/60 rounded" style="width: 20px;"></div>
                <span class="text-sm font-bold text-rose-400">1</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 3: 温度计/仪表盘 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">3. 温度计/仪表盘（评分型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">给出质量评级，符合用户心智模型</p>
          
          <div class="flex items-center justify-center gap-6">
            <div class="text-center">
              <div class="w-24 h-32 border-2 rounded-full relative overflow-hidden" :style="{ borderColor: colors.border.strong }">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-500 to-emerald-400" style="height: 87%;"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-white z-10">5.8</span>
                </div>
              </div>
              <div class="mt-2 text-sm font-bold text-emerald-400">优秀 ★★★★★</div>
            </div>
            
            <div class="text-center">
              <div class="w-24 h-32 border-2 rounded-full relative overflow-hidden" :style="{ borderColor: colors.border.strong }">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400" style="height: 56%;"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-white z-10">2.8</span>
                </div>
              </div>
              <div class="mt-2 text-sm font-bold text-blue-400">良好 ★★★☆☆</div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 4: 圆环图 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">4. 圆环图（占比型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">强调回报在总价值中的占比</p>
          
          <div class="flex items-center justify-center gap-8">
            <div class="relative w-32 h-32">
              <svg viewBox="0 0 100 100" class="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="15" opacity="0.3" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="15" 
                        stroke-dasharray="217 251" opacity="0.9" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-2xl font-bold text-emerald-400">86%</span>
                <span class="text-[10px]" :style="{ color: colors.text.muted }">回报占比</span>
              </div>
            </div>
            
            <div class="text-left space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span class="text-sm" :style="{ color: colors.text.secondary }">回报: 5.8 (86%)</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-rose-500 opacity-50"></div>
                <span class="text-sm" :style="{ color: colors.text.secondary }">风险: 1.0 (14%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 5: 火箭推进器 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">5. 火箭推进器（动态型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">情感化设计，适合高回报比策略（>5:1）</p>
          
          <div class="flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl mb-2">🚀</div>
              <div class="flex flex-col items-center gap-0.5">
                <div class="w-12 h-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded"></div>
                <div class="w-16 h-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded"></div>
                <div class="w-20 h-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded"></div>
                <div class="w-24 h-3 bg-gradient-to-r from-orange-500 to-yellow-400 rounded"></div>
              </div>
              <div class="mt-3 text-sm font-bold text-amber-400">5.8倍推力 🔥</div>
              <div class="text-xs mt-1" :style="{ color: colors.text.muted }">风险基准: 1</div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 6: 天平对比 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">6. 天平对比（平衡型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">符合"权衡"的金融概念</p>
          
          <div class="flex items-end justify-center gap-4">
            <div class="flex flex-col items-center">
              <div class="text-sm font-bold text-emerald-400 mb-1">回报 5.8</div>
              <div class="w-20 h-24 bg-emerald-500/40 rounded-t border-2 border-emerald-500/60 flex items-center justify-center">
                <span class="text-2xl">📈</span>
              </div>
            </div>
            
            <div class="flex flex-col items-center mb-8">
              <div class="text-3xl">⚖️</div>
            </div>
            
            <div class="flex flex-col items-center">
              <div class="text-sm font-bold text-rose-400 mb-1">风险 1.0</div>
              <div class="w-20 h-8 bg-rose-500/40 rounded-t border-2 border-rose-500/60 flex items-center justify-center">
                <span class="text-xl">⚠️</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 7: 堆叠条 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">7. 堆叠条（累积型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">简洁清晰，节省空间</p>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-xs w-16" :style="{ color: colors.text.muted }">CRCL</span>
              <div class="flex-1">
                <div class="flex items-center h-8 rounded overflow-hidden border" :style="{ borderColor: colors.border.strong }">
                  <div class="h-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white px-3" style="width: 85%;">
                    回报 5.8
                  </div>
                  <div class="h-full bg-rose-500/60 flex items-center justify-center text-xs font-bold text-white px-2" style="width: 15%;">
                    1
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-xs w-16" :style="{ color: colors.text.muted }">MA</span>
              <div class="flex-1">
                <div class="flex items-center h-8 rounded overflow-hidden border" :style="{ borderColor: colors.border.strong }">
                  <div class="h-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white px-3" style="width: 74%;">
                    回报 2.8
                  </div>
                  <div class="h-full bg-rose-500/60 flex items-center justify-center text-xs font-bold text-white px-2" style="width: 26%;">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ratio Viz 8: 雷达值 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">8. 雷达图（多维型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">可扩展多维度评估</p>
          
          <div class="flex items-center justify-center">
            <div class="relative w-40 h-40">
              <svg viewBox="0 0 100 100" class="w-full h-full">
                <!-- 背景网格 -->
                <polygon points="50,10 80,35 80,65 50,90 20,65 20,35" fill="none" stroke="#333" stroke-width="0.5" />
                <polygon points="50,25 70,42.5 70,57.5 50,75 30,57.5 30,42.5" fill="none" stroke="#333" stroke-width="0.5" />
                
                <!-- 数据区域 - CRCL -->
                <polygon points="50,12 78,35 75,65 50,70 22,60 25,40" fill="rgba(16, 185, 129, 0.3)" stroke="#10b981" stroke-width="1.5" />
                
                <!-- 轴线 -->
                <line x1="50" y1="50" x2="50" y2="10" stroke="#666" stroke-width="0.5" />
                <line x1="50" y1="50" x2="80" y2="35" stroke="#666" stroke-width="0.5" />
                <line x1="50" y1="50" x2="80" y2="65" stroke="#666" stroke-width="0.5" />
                <line x1="50" y1="50" x2="50" y2="90" stroke="#666" stroke-width="0.5" />
                <line x1="50" y1="50" x2="20" y2="65" stroke="#666" stroke-width="0.5" />
                <line x1="50" y1="50" x2="20" y2="35" stroke="#666" stroke-width="0.5" />
              </svg>
              
              <!-- 标签 -->
              <div class="absolute top-0 left-1/2 transform -translate-x-1/2 text-[10px] text-emerald-400 font-bold">回报5.8</div>
              <div class="absolute top-6 right-2 text-[10px]" :style="{ color: colors.text.muted }">稳定性</div>
              <div class="absolute bottom-6 right-2 text-[10px]" :style="{ color: colors.text.muted }">流动性</div>
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[10px] text-rose-400 font-bold">风险1</div>
              <div class="absolute bottom-6 left-2 text-[10px]" :style="{ color: colors.text.muted }">周期</div>
              <div class="absolute top-6 left-2 text-[10px]" :style="{ color: colors.text.muted }">复杂度</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Time Period Visualizations -->
    <div v-if="activeSection === 'time'" class="px-8 py-12">
      <div class="grid grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        
        <!-- Time Viz 1: 数字徽章式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">1. 数字徽章式（强调型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">大号数字强调天数，适合需要突出时长的场景</p>
          
          <div class="flex items-center justify-center gap-12">
            <div class="text-center">
              <div class="w-32 h-32 rounded-2xl border-2 border-cyan-500 bg-cyan-500/10 flex flex-col items-center justify-center">
                <div class="text-5xl font-bold text-cyan-400">28</div>
                <div class="text-sm mt-1" :style="{ color: colors.text.muted }">天</div>
              </div>
              <div class="mt-3 text-xs" :style="{ color: colors.text.secondary }">1-4 weeks</div>
            </div>
            
            <div class="text-center">
              <div class="w-32 h-32 rounded-2xl border-2 border-amber-500 bg-amber-500/10 flex flex-col items-center justify-center">
                <div class="text-5xl font-bold text-amber-400">10</div>
                <div class="text-sm mt-1" :style="{ color: colors.text.muted }">天</div>
              </div>
              <div class="mt-3 text-xs" :style="{ color: colors.text.secondary }">1-10 days</div>
            </div>
          </div>
        </div>

        <!-- Time Viz 2: 日历块堆叠式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">2. 日历块堆叠式（具象型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">用日历块数量表示天数，直观易懂</p>
          
          <div class="space-y-6">
            <div class="text-center">
              <div class="text-sm font-bold text-cyan-400 mb-3">1-4 weeks (28天)</div>
              <div class="flex items-center justify-center gap-1 flex-wrap max-w-xs mx-auto">
                <div v-for="i in 28" :key="i" class="w-6 h-6 rounded bg-cyan-500/40 border border-cyan-500/60 flex items-center justify-center text-[8px] font-bold text-cyan-300">
                  {{ i }}
                </div>
              </div>
            </div>
            
            <div class="text-center">
              <div class="text-sm font-bold text-amber-400 mb-3">1-10 days (10天)</div>
              <div class="flex items-center justify-center gap-1">
                <div v-for="i in 10" :key="i" class="w-8 h-8 rounded bg-amber-500/40 border border-amber-500/60 flex items-center justify-center text-xs font-bold text-amber-300">
                  {{ i }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Viz 3: 时钟刻度式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">3. 时钟刻度式（隐喻型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">用时钟刻度表示时间长度</p>
          
          <div class="flex items-center justify-center gap-12">
            <div class="text-center">
              <div class="relative w-32 h-32">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#333" stroke-width="1" />
                  <!-- 12个刻度 -->
                  <line v-for="i in 12" :key="i" 
                        :x1="50" :y1="50" 
                        :x2="50 + 40 * Math.sin(i * 30 * Math.PI / 180)" 
                        :y2="50 - 40 * Math.cos(i * 30 * Math.PI / 180)" 
                        :stroke="i <= 4 ? '#06b6d4' : '#333'" 
                        :stroke-width="i <= 4 ? '2' : '0.5'" />
                  <circle cx="50" cy="50" r="4" fill="#06b6d4" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-xl font-bold text-cyan-400">28天</span>
                </div>
              </div>
              <div class="mt-2 text-xs" :style="{ color: colors.text.secondary }">≈ 4周</div>
            </div>
            
            <div class="text-center">
              <div class="relative w-32 h-32">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#333" stroke-width="1" />
                  <!-- 12个刻度 -->
                  <line v-for="i in 12" :key="i" 
                        :x1="50" :y1="50" 
                        :x2="50 + 40 * Math.sin(i * 30 * Math.PI / 180)" 
                        :y2="50 - 40 * Math.cos(i * 30 * Math.PI / 180)" 
                        :stroke="i <= 2 ? '#f59e0b' : '#333'" 
                        :stroke-width="i <= 2 ? '2' : '0.5'" />
                  <circle cx="50" cy="50" r="4" fill="#f59e0b" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-xl font-bold text-amber-400">10天</span>
                </div>
              </div>
              <div class="mt-2 text-xs" :style="{ color: colors.text.secondary }">≈ 1.5周</div>
            </div>
          </div>
        </div>

        <!-- Time Viz 4: 长度条对比式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">4. 长度条对比式（直观型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">条形长度代表天数，便于横向对比</p>
          
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between text-xs mb-2">
                <span :style="{ color: colors.text.secondary }">CRCL</span>
                <span class="font-bold text-cyan-400">28天</span>
              </div>
              <div class="h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded flex items-center px-3" style="width: 100%;">
                <span class="text-sm font-bold text-white">1-4 weeks</span>
              </div>
            </div>
            
            <div>
              <div class="flex items-center justify-between text-xs mb-2">
                <span :style="{ color: colors.text.secondary }">MA</span>
                <span class="font-bold text-blue-400">14天</span>
              </div>
              <div class="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center px-3" style="width: 50%;">
                <span class="text-sm font-bold text-white">1-2 weeks</span>
              </div>
            </div>
            
            <div>
              <div class="flex items-center justify-between text-xs mb-2">
                <span :style="{ color: colors.text.secondary }">AVGO</span>
                <span class="font-bold text-amber-400">10天</span>
              </div>
              <div class="h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded flex items-center px-3" style="width: 36%;">
                <span class="text-sm font-bold text-white">1-10 days</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Viz 5: 点阵网格式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">5. 点阵网格式（量化型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">用点/方块数量可视化天数</p>
          
          <div class="space-y-6">
            <div class="text-center">
              <div class="text-sm font-bold text-cyan-400 mb-3">28天 (1-4 weeks)</div>
              <div class="grid grid-cols-7 gap-1.5 max-w-xs mx-auto">
                <div v-for="i in 28" :key="i" class="w-7 h-7 rounded bg-cyan-500/60 border border-cyan-500"></div>
              </div>
            </div>
            
            <div class="text-center">
              <div class="text-sm font-bold text-amber-400 mb-3">10天 (1-10 days)</div>
              <div class="grid grid-cols-5 gap-1.5 max-w-xs mx-auto">
                <div v-for="i in 10" :key="i" class="w-10 h-10 rounded bg-amber-500/60 border border-amber-500"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Viz 6: 区间范围式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">6. 区间范围式（范围型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">展示最小值-最大值范围</p>
          
          <div class="space-y-6">
            <div>
              <div class="text-sm font-bold text-cyan-400 mb-3 text-center">1-4 weeks</div>
              <div class="relative h-12 bg-gray-800 rounded-lg">
                <div class="absolute left-[25%] right-[0%] top-1/2 transform -translate-y-1/2 h-6 bg-cyan-500/40 border-2 border-cyan-500 rounded flex items-center justify-between px-2">
                  <span class="text-xs font-bold text-cyan-300">7天</span>
                  <span class="text-xs font-bold text-cyan-300">28天</span>
                </div>
              </div>
            </div>
            
            <div>
              <div class="text-sm font-bold text-amber-400 mb-3 text-center">1-10 days</div>
              <div class="relative h-12 bg-gray-800 rounded-lg">
                <div class="absolute left-[0%] right-[66%] top-1/2 transform -translate-y-1/2 h-6 bg-amber-500/40 border-2 border-amber-500 rounded flex items-center justify-between px-2">
                  <span class="text-xs font-bold text-amber-300">1天</span>
                  <span class="text-xs font-bold text-amber-300">10天</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Viz 7: 分类标签式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">7. 分类标签式（分级型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">按短期/中期/长期分类色块</p>
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-xs w-16" :style="{ color: colors.text.secondary }">CRCL</span>
              <div class="flex-1 flex items-center gap-2">
                <div class="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-500/60 text-amber-400 font-bold text-sm">
                  短期 • 28天
                </div>
                <span class="text-xs" :style="{ color: colors.text.muted }">1-4 weeks</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-xs w-16" :style="{ color: colors.text.secondary }">MA</span>
              <div class="flex-1 flex items-center gap-2">
                <div class="px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-500/60 text-cyan-400 font-bold text-sm">
                  中期 • 60天
                </div>
                <span class="text-xs" :style="{ color: colors.text.muted }">1-2 months</span>
              </div>
            </div>
            
            <div class="flex items-center gap-3">
              <span class="text-xs w-16" :style="{ color: colors.text.secondary }">AVGO</span>
              <div class="flex-1 flex items-center gap-2">
                <div class="px-3 py-1.5 rounded bg-purple-500/20 border border-purple-500/60 text-purple-400 font-bold text-sm">
                  长期 • 180天
                </div>
                <span class="text-xs" :style="{ color: colors.text.muted }">6 months</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Viz 8: 时间尺对比式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">8. 时间尺对比式（坐标型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">在时间轴上标注策略位置</p>
          
          <div class="space-y-6">
            <div class="relative pt-8">
              <!-- 时间轴 -->
              <div class="h-2 bg-gray-800 rounded-full relative">
                <!-- 刻度 -->
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 0%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 16.6%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 33.3%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 50%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 66.6%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 83.3%; width: 2px; height: 12px; background: #666;"></div>
                <div class="absolute top-1/2 transform -translate-y-1/2" style="left: 100%; width: 2px; height: 12px; background: #666;"></div>
                
                <!-- CRCL: 28天 -->
                <div class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" style="left: 46.6%;">
                  <div class="w-16 h-16 -mt-10 rounded-lg bg-cyan-500/20 border-2 border-cyan-500 flex flex-col items-center justify-center">
                    <span class="text-lg font-bold text-cyan-400">28</span>
                    <span class="text-[8px] text-cyan-300">CRCL</span>
                  </div>
                </div>
                
                <!-- AVGO: 10天 -->
                <div class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2" style="left: 16.6%;">
                  <div class="w-16 h-16 -mt-10 rounded-lg bg-amber-500/20 border-2 border-amber-500 flex flex-col items-center justify-center">
                    <span class="text-lg font-bold text-amber-400">10</span>
                    <span class="text-[8px] text-amber-300">AVGO</span>
                  </div>
                </div>
              </div>
              
              <!-- 标签 -->
              <div class="flex items-center justify-between text-xs mt-3" :style="{ color: colors.text.muted }">
                <span>0天</span>
                <span>30天</span>
                <span>60天</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Combined Visualizations -->
    <div v-if="activeSection === 'combined'" class="px-8 py-12">
      <div class="grid grid-cols-2 gap-8 max-w-[1400px] mx-auto">
        
        <!-- Combined 1: 双指标仪表盘 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">方案A: 双指标仪表盘（整合型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">在一个区域内展示所有关键数据</p>
          
          <div class="p-6 border-2 rounded-lg text-center" :style="{ borderColor: colors.border.strong }">
            <h4 class="text-2xl font-bold mb-4" :style="{ color: colors.text.primary }">⚡ CRCL</h4>
            
            <div class="space-y-4">
              <div>
                <div class="text-xs mb-2" :style="{ color: colors.text.muted }">风险回报比</div>
                <div class="text-3xl font-bold text-emerald-400 mb-2">5.8:1</div>
                <div class="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" style="width: 87%;"></div>
                </div>
              </div>
              
              <div class="border-t pt-4" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xs mb-2" :style="{ color: colors.text.muted }">策略周期</div>
                <div class="flex items-center justify-center gap-2 mb-2">
                  <span class="text-xl">⏰</span>
                  <span class="text-2xl font-bold text-cyan-400">1-4 weeks</span>
                </div>
                <div class="flex items-center justify-center gap-1">
                  <div class="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
                  <div class="w-3 h-3 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Combined 2: 卡片角标式 -->
        <div class="p-6 border rounded-lg" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">方案B: 卡片角标式（轻量型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">数据作为装饰元素，不干扰主体内容</p>
          
          <div class="p-6 border-2 rounded-lg relative" :style="{ borderColor: colors.border.strong }">
            <!-- 左上角标 -->
            <div class="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded">
              <span class="text-xs">⚡</span>
              <span class="text-sm font-bold text-emerald-400">5.8:1</span>
            </div>
            
            <!-- 右上角标 -->
            <div class="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded">
              <span class="text-xs">⏰</span>
              <span class="text-sm font-bold text-cyan-400">14d</span>
            </div>
            
            <!-- 主体内容 -->
            <div class="mt-8 text-center">
              <h4 class="text-2xl font-bold mb-2" :style="{ color: colors.text.primary }">CRCL</h4>
              <p class="text-sm" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
              
              <div class="mt-6 flex items-center justify-center gap-2">
                <button class="px-4 py-2 bg-cyan-500 text-white rounded-md font-bold text-sm hover:bg-cyan-600 transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Combined 3: 悬浮气泡式 -->
        <div class="p-6 border rounded-lg col-span-2" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.default }">
          <h3 class="text-lg font-bold mb-2" :style="{ color: colors.text.primary }">方案C: 悬浮气泡式（浮动型）</h3>
          <p class="text-sm mb-4" :style="{ color: colors.text.muted }">数据以气泡形式环绕主体，更具动态感</p>
          
          <div class="flex items-center justify-center gap-12 py-8">
            <div class="relative">
              <!-- 中心卡片 -->
              <div class="w-64 p-6 border-2 rounded-lg text-center relative z-10" :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.strong }">
                <h4 class="text-2xl font-bold mb-2" :style="{ color: colors.text.primary }">CRCL</h4>
                <p class="text-sm" :style="{ color: colors.text.muted }">Circle监管平稳号令</p>
                <p class="text-sm mb-4" :style="{ color: colors.text.muted }">一月效应反转</p>
                <button class="w-full px-4 py-2 bg-cyan-500 text-white rounded-md font-bold text-sm">
                  立即查看
                </button>
              </div>
              
              <!-- 左上气泡 - 风险回报比 -->
              <div class="absolute -top-8 -left-16 w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex flex-col items-center justify-center">
                <span class="text-xs text-emerald-400">回报比</span>
                <span class="text-xl font-bold text-emerald-400">5.8:1</span>
                <span class="text-xs">⚡</span>
              </div>
              
              <!-- 右上气泡 - 时间周期 -->
              <div class="absolute -top-8 -right-16 w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-500/60 flex flex-col items-center justify-center">
                <span class="text-xs text-cyan-400">周期</span>
                <span class="text-lg font-bold text-cyan-400">1-4w</span>
                <span class="text-xs">⏰</span>
              </div>
              
              <!-- 左下气泡 - 评级 -->
              <div class="absolute -bottom-6 -left-12 w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-500/60 flex flex-col items-center justify-center">
                <span class="text-xs text-blue-400">评级</span>
                <span class="text-2xl font-bold text-blue-400">A</span>
              </div>
              
              <!-- 右下气泡 - 操作 -->
              <div class="absolute -bottom-6 -right-12 w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-500/60 flex flex-col items-center justify-center">
                <span class="text-[10px] text-amber-400">建议</span>
                <span class="text-xs font-bold text-amber-400">观望</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import { colors } from '../design/tokens'

const activeSection = ref('ratio')
</script>
