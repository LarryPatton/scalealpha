<template>
  <div class="min-h-screen flex flex-col pb-24" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <div class="px-8 py-12 text-center border-b" :style="{ borderColor: tokens.colors.border.subtle }">
      <h1 class="text-4xl font-bold mb-3" :style="{ color: tokens.colors.text.primary }">
        卡片设计方案评选
      </h1>
      <p class="text-lg mb-6" :style="{ color: tokens.colors.text.muted }">
        10种优化方案供您对比选择，点击 ❤️ 标记您喜欢的设计
      </p>
      
      <!-- Stats Bar -->
      <div class="flex justify-center gap-8 text-sm">
        <div class="flex items-center gap-2">
          <span :style="{ color: tokens.colors.text.disabled }">总投票数:</span>
          <span class="font-bold text-cyan-400">{{ totalVotes }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span :style="{ color: tokens.colors.text.disabled }">最受欢迎:</span>
          <span class="font-bold text-amber-400">{{ mostPopularVariant }}</span>
        </div>
      </div>
    </div>

    <!-- Variants Grid -->
    <div class="px-8 py-12">
      <div class="grid grid-cols-2 gap-12 max-w-[1600px] mx-auto">
        <!-- Variant 1: 强化操作建议版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案1: 强化操作建议版
            </h2>
            <button 
              @click="toggleVote(1)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[1] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[1] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[1] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            操作建议改为醒目按钮，带图标和渐变背景，视觉权重最高
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">CRCL</h3>
              <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: tokens.colors.text.muted }">Circle监管平稳号令一月效应反转</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <!-- 强化版操作建议 -->
                  <button class="px-4 py-2 rounded-md font-bold text-sm bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-1.5 mx-auto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    观望买入
                  </button>
                  <div class="text-[9px] mt-1" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                <span>1-4 weeks</span>
                <span class="font-bold" :style="{ color: tokens.colors.text.secondary }">5.8:1</span>
                <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 2: 风险标签增强版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案2: 风险标签增强版
            </h2>
            <button 
              @click="toggleVote(2)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[2] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[2] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[2] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            风险标签加强边框和饱和度，添加图标辅助识别（⚡盈 / ⚖️中）
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">MA</h3>
              <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: tokens.colors.text.muted }">万事达卡报日清盘结构性超短期超额</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">观望买入</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                <span>1-4 weeks</span>
                <span class="font-bold" :style="{ color: tokens.colors.text.secondary }">2.8:1</span>
                <!-- 增强版风险标签 -->
                <span class="px-2.5 py-1 rounded-sm font-bold border flex items-center gap-1" 
                      style="background-color: rgba(59, 130, 246, 0.25); color: #3b82f6; border-color: rgba(59, 130, 246, 0.5);">
                  <span>⚖️</span>
                  <span>中</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 3: 数据可视化版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案3: 数据可视化版
            </h2>
            <button 
              @click="toggleVote(3)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[3] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[3] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[3] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            比率用进度条可视化，时间周期用迷你时间轴展示进度
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">AVGO</h3>
              <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: tokens.colors.text.muted }">博通AI代工计算与一月效应套利</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">观望买入</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <!-- 可视化底部 -->
              <div class="space-y-2">
                <!-- 时间轴 -->
                <div class="flex items-center justify-between text-[9px]" :style="{ color: tokens.colors.text.disabled }">
                  <span>1-4 weeks</span>
                  <div class="flex-1 mx-3 flex items-center gap-0.5">
                    <div class="h-1 flex-1 bg-cyan-500 rounded-full"></div>
                    <div class="h-1 flex-1 bg-cyan-500 rounded-full"></div>
                    <div class="h-1 flex-1 bg-gray-700 rounded-full"></div>
                    <div class="h-1 flex-1 bg-gray-700 rounded-full"></div>
                  </div>
                  <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }">中</span>
                </div>
                <!-- 比率进度条 -->
                <div class="flex items-center gap-2">
                  <span class="text-[9px] font-mono" :style="{ color: tokens.colors.text.disabled }">风险比</span>
                  <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full" style="width: 64%;"></div>
                  </div>
                  <span class="text-[10px] font-bold" :style="{ color: tokens.colors.text.secondary }">3.2:1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 4: 策略徽章版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案4: 策略徽章版
            </h2>
            <button 
              @click="toggleVote(4)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[4] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[4] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[4] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            左上角添加策略类型徽章，用颜色和图标快速区分策略类型
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <!-- 策略徽章 -->
            <div class="absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1"
                 style="background-color: rgba(168, 85, 247, 0.2); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.4);">
              <span>🔄</span>
              <span>套利</span>
            </div>
            
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">WDC</h3>
              <p class="text-[10px] mb-1 line-clamp-1" :style="{ color: tokens.colors.text.muted }">WDC AI存储超级周期套利</p>
              <p class="text-[8px] mb-3 italic opacity-40">WDC AI Storage Supercycle Arbitrage</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">观望买入</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                <span>1-30 days</span>
                <span class="font-bold" :style="{ color: tokens.colors.text.secondary }">5.3:1</span>
                <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }">中</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 5: 紧凑信息版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案5: 紧凑信息版
            </h2>
            <button 
              @click="toggleVote(5)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[5] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[5] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[5] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            减少内边距和装饰元素，提升信息密度，适合显示更多卡片
          </p>
          <div class="p-4 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <h3 class="text-xl font-bold mb-0.5" :style="{ color: tokens.colors.text.primary }">MSFT</h3>
            <p class="text-[9px] mb-3 line-clamp-1" :style="{ color: tokens.colors.text.muted }">微软企业级AI护城河与一月效应</p>
            
            <div class="flex items-center justify-between mb-3 py-2 border-y" :style="{ borderColor: tokens.colors.border.subtle }">
              <div class="text-center flex-1">
                <div class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
              </div>
              <div class="w-px h-6" :style="{ backgroundColor: tokens.colors.border.subtle }"></div>
              <div class="text-center flex-1">
                <div class="text-lg font-bold text-cyan-400">观望</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[8px] font-mono" :style="{ color: tokens.colors.text.disabled }">
              <span>1-4w</span>
              <span class="font-bold text-[9px]" :style="{ color: tokens.colors.text.secondary }">2.5:1</span>
              <span class="px-1.5 py-0.5 rounded-sm font-bold text-[8px]" :style="{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }">中</span>
            </div>
          </div>
        </div>

        <!-- Variant 6: 图形化比率版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案6: 图形化比率版
            </h2>
            <button 
              @click="toggleVote(6)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[6] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[6] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[6] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            比率转换为柱状图可视化，直观展示收益风险比的高低
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">UUUU</h3>
              <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: tokens.colors.text.muted }">铀土高息化验与机构抗衰策略</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">观望买入</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px]">
                <span :style="{ color: tokens.colors.text.disabled }">1-10 days</span>
                <!-- 柱状图比率 -->
                <div class="flex items-end gap-0.5 h-6">
                  <div class="w-1 bg-cyan-500 rounded-t" style="height: 52%;"></div>
                  <div class="w-1 bg-cyan-400 rounded-t" style="height: 52%;"></div>
                  <div class="w-1 bg-cyan-300 rounded-t" style="height: 52%;"></div>
                  <div class="w-0.5 bg-gray-700 rounded-t" style="height: 20%;"></div>
                  <span class="text-[10px] font-bold ml-1" :style="{ color: tokens.colors.text.secondary }">2.6:1</span>
                </div>
                <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }">中</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 7: 色彩分级版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案7: 色彩分级版
            </h2>
            <button 
              @click="toggleVote(7)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[7] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[7] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[7] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            根据比率高低用渐变色区分卡片边框（高比率=金色，中等=青色）
          </p>
          <div class="p-6 text-center border-2 transition-all duration-200 cursor-pointer group relative overflow-hidden"
               style="background-color: #0a0a0a; border-color: rgba(251, 191, 36, 0.5);">
            <!-- 金色顶部光晕 -->
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent group-hover:via-amber-400/80 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">CRCL</h3>
              <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: tokens.colors.text.muted }">Circle监管平稳号令一月效应反转</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" style="border-color: rgba(251, 191, 36, 0.2);">
                <div class="text-center border-r" style="border-color: rgba(251, 191, 36, 0.2);">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">策略评级</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-amber-400">观望买入</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">方向</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                <span>1-4 weeks</span>
                <span class="font-bold text-amber-400 text-lg">5.8:1</span>
                <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">⚡盈</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 8: 极简文字版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案8: 极简文字版
            </h2>
            <button 
              @click="toggleVote(8)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[8] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[8] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[8] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            去除所有装饰，纯文字排版，强调排版节奏和留白的极简美学
          </p>
          <div class="p-8 border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <div class="space-y-4">
              <div>
                <h3 class="text-3xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">MU</h3>
                <p class="text-xs leading-relaxed" :style="{ color: tokens.colors.text.muted }">美光科技：CES前夕AI存储级跟踪套利</p>
              </div>
              
              <div class="flex items-baseline gap-8 pt-4 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                <div>
                  <span class="text-[10px] uppercase tracking-wider" :style="{ color: tokens.colors.text.disabled }">评级</span>
                  <span class="text-2xl font-bold ml-2" :style="{ color: tokens.colors.text.primary }">A</span>
                </div>
                <div>
                  <span class="text-[10px] uppercase tracking-wider" :style="{ color: tokens.colors.text.disabled }">操作</span>
                  <span class="text-lg font-medium ml-2 text-cyan-400">观望买入</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 text-[10px]" :style="{ color: tokens.colors.text.disabled }">
                <span>1-14 DAYS</span>
                <span class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">2.7:1</span>
                <span>MODERATE</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Variant 9: 卡片式按钮版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案9: 卡片式按钮版
            </h2>
            <button 
              @click="toggleVote(9)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[9] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[9] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[9] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            整个卡片设计成可点击的CTA按钮，强调行动导向，带明显点击提示
          </p>
          <button class="w-full p-6 text-center border-2 transition-all duration-200 cursor-pointer group relative overflow-hidden hover:scale-105 active:scale-100"
                  style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border-color: rgba(6, 182, 212, 0.5);">
            <!-- 闪光效果 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">TJX</h3>
                <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
              
              <p class="text-[10px] mb-4 line-clamp-1 text-left" :style="{ color: tokens.colors.text.muted }">TJX 宿日系消费弹跳套利</p>
              
              <div class="grid grid-cols-3 gap-3 mb-4 border-y py-3" style="border-color: rgba(6, 182, 212, 0.2);">
                <div class="text-center">
                  <div class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[8px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">评级</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-cyan-400">观望</div>
                  <div class="text-[8px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">操作</div>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-cyan-400">3.4:1</div>
                  <div class="text-[8px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">比率</div>
                </div>
              </div>

              <div class="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cyan-500/10 border border-cyan-500/30">
                <span class="text-xs font-bold text-cyan-400">立即查看详情</span>
                <svg class="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </div>
            </div>
          </button>
        </div>

        <!-- Variant 10: 双语优化版 -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
              方案10: 双语优化版
            </h2>
            <button 
              @click="toggleVote(10)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all"
              :style="votes[10] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }"
            >
              <span>{{ votes[10] ? '❤️' : '🤍' }}</span>
              <span class="text-sm font-mono">{{ voteCounts[10] || 0 }}</span>
            </button>
          </div>
          <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">
            优化英文副标题展示，增加语言切换按钮，适配国际化需求
          </p>
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative overflow-hidden"
               :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.subtle }">
            <!-- 语言切换 -->
            <div class="absolute top-3 right-3 flex gap-1">
              <button class="w-6 h-6 rounded text-[9px] font-bold bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">中</button>
              <button class="w-6 h-6 rounded text-[9px] font-bold bg-gray-800 text-gray-500 hover:bg-gray-700">EN</button>
            </div>
            
            <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/50 transition-all duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-1.5" :style="{ color: tokens.colors.text.primary }">WDC</h3>
              <p class="text-[11px] mb-1 line-clamp-1 font-medium" :style="{ color: tokens.colors.text.secondary }">WDC AI存储超级周期套利</p>
              <p class="text-[9px] mb-4 italic" :style="{ color: tokens.colors.text.disabled }">AI Storage Supercycle Arbitrage</p>
              
              <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: tokens.colors.border.subtle }">
                <div class="text-center border-r" :style="{ borderColor: tokens.colors.border.subtle }">
                  <div class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">A</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">Rating</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-cyan-400">Watch & Buy</div>
                  <div class="text-[9px] mt-0.5" :style="{ color: tokens.colors.text.disabled }">Action</div>
                </div>
              </div>

              <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: tokens.colors.text.disabled }">
                <span>1-30 Days</span>
                <span class="font-bold" :style="{ color: tokens.colors.text.secondary }">5.3:1</span>
                <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }">MED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="mt-16 max-w-3xl mx-auto p-6 border rounded-lg" :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }">
        <h3 class="text-lg font-bold mb-4 text-center" :style="{ color: tokens.colors.text.primary }">
          投票统计
        </h3>
        <div class="space-y-2">
          <div v-for="i in 10" :key="i" class="flex items-center gap-3">
            <span class="text-sm w-24" :style="{ color: tokens.colors.text.secondary }">方案{{ i }}</span>
            <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full transition-all duration-500" :style="{ width: `${getVotePercentage(i)}%` }"></div>
            </div>
            <span class="text-sm font-mono w-12 text-right" :style="{ color: tokens.colors.text.muted }">{{ voteCounts[i] || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { colors } from '../design/tokens'

// Create tokens object with colors for template usage
const tokens = { colors }

// Voting state
const votes = ref({})
const voteCounts = ref({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
  6: 0, 7: 0, 8: 0, 9: 0, 10: 0
})

const toggleVote = (id) => {
  if (votes.value[id]) {
    votes.value[id] = false
    voteCounts.value[id]--
  } else {
    votes.value[id] = true
    voteCounts.value[id]++
  }
}

const totalVotes = computed(() => {
  return Object.values(voteCounts.value).reduce((sum, count) => sum + count, 0)
})

const mostPopularVariant = computed(() => {
  let maxVotes = 0
  let mostPopular = '暂无'
  for (let i = 1; i <= 10; i++) {
    if (voteCounts.value[i] > maxVotes) {
      maxVotes = voteCounts.value[i]
      mostPopular = `方案${i}`
    }
  }
  return maxVotes > 0 ? mostPopular : '暂无'
})

const getVotePercentage = (id) => {
  if (totalVotes.value === 0) return 0
  return Math.round((voteCounts.value[id] / totalVotes.value) * 100)
}
</script>
