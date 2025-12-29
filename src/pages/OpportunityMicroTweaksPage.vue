<template>
  <div class="min-h-screen flex flex-col pb-24" :style="{ backgroundColor: colors.background.base }">
    <!-- Navbar -->
    <Navbar />

    <!-- Header -->
    <div class="px-8 py-12 text-center border-b" :style="{ borderColor: colors.border.subtle }">
      <h1 class="text-4xl font-bold mb-3" :style="{ color: colors.text.primary }">
        机会卡片微调方案
      </h1>
      <p class="text-lg mb-6" :style="{ color: colors.text.muted }">
        12种布局/大小/颜色的细微调整方案，点击 ❤️ 标记您喜欢的设计
      </p>
      
      <!-- Stats -->
      <div class="flex justify-center gap-8 text-sm">
        <div class="flex items-center gap-2">
          <span :style="{ color: colors.text.disabled }">总投票数:</span>
          <span class="font-bold text-cyan-400">{{ totalVotes }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span :style="{ color: colors.text.disabled }">最受欢迎:</span>
          <span class="font-bold text-amber-400">{{ mostPopularVariant }}</span>
        </div>
      </div>
    </div>

    <!-- Variants Grid -->
    <div class="px-8 py-12">
      <div class="grid grid-cols-3 gap-8 max-w-[1600px] mx-auto">

        <!-- 方案1: 原始基准版 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案1: 原始基准版</h3>
            <button @click="toggleVote(1)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[1] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[1] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[1] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">当前默认布局，作为对比基准</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案2: 标题左对齐 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案2: 标题左对齐</h3>
            <button @click="toggleVote(2)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[2] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[2] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[2] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">标题和描述改为左对齐</p>
          
          <div class="p-6 border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1 text-left" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1 text-left" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案3: 加大标题字号 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案3: 加大标题字号</h3>
            <button @click="toggleVote(3)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[3] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[3] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[3] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">代码加大到3xl，描述略大</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-3xl font-bold mb-2" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-xs mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案4: 紧凑间距 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案4: 紧凑间距</h3>
            <button @click="toggleVote(4)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[4] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[4] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[4] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">减少内边距，提高信息密度</p>
          
          <div class="p-4 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-0.5" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-3 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-2 mb-3 border-y py-2" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案5: 宽松间距 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案5: 宽松间距</h3>
            <button @click="toggleVote(5)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[5] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[5] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[5] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">增加间距，更有呼吸感</p>
          
          <div class="p-8 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-2" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-6 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6 border-y py-4" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-1" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-1" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案6: 评级操作横向排列 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案6: 评级操作横排</h3>
            <button @click="toggleVote(6)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[6] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[6] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[6] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">中间区域改为横向布局</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="flex items-center justify-between mb-4 border-y py-3 px-4" :style="{ borderColor: colors.border.subtle }">
              <div class="flex items-center gap-2">
                <span class="text-xl font-bold" :style="{ color: colors.text.primary }">A</span>
                <span class="text-[9px]" :style="{ color: colors.text.disabled }">策略评级</span>
              </div>
              <div class="w-px h-6" :style="{ backgroundColor: colors.border.subtle }"></div>
              <div class="flex items-center gap-2">
                <span class="text-xl font-bold text-cyan-400">观望买入</span>
                <span class="text-[9px]" :style="{ color: colors.text.disabled }">方向</span>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案7: 强化操作建议颜色 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案7: 强化操作颜色</h3>
            <button @click="toggleVote(7)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[7] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[7] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[7] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">操作建议使用更鲜艳的颜色</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold" style="color: #22d3ee;">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案8: 弱化评级标签 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案8: 弱化评级标签</h3>
            <button @click="toggleVote(8)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[8] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[8] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[8] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">标签文字缩小，降低视觉权重</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[8px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[8px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[8px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案9: 底部信息加大 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案9: 底部信息加大</h3>
            <button @click="toggleVote(9)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[9] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[9] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[9] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">时间/比率/标签字号增大</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-xs font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold text-sm" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-1 rounded-sm font-bold text-xs" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案10: 风险标签右上角 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案10: 标签右上角</h3>
            <button @click="toggleVote(10)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[10] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[10] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[10] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">风险标签移至右上角徽章</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group relative"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <div class="absolute top-3 right-3 px-2 py-1 rounded-sm text-xs font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</div>
            
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
            </div>
          </div>
        </div>

        <!-- 方案11: 单行底部信息 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案11: 单行底部</h3>
            <button @click="toggleVote(11)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[11] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[11] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[11] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">底部三元素用分隔符连接</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center border-r" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex items-center justify-center gap-2 text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span>•</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span>•</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

        <!-- 方案12: 垂直分栏布局 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold" :style="{ color: colors.text.primary }">方案12: 垂直分栏</h3>
            <button @click="toggleVote(12)" class="flex items-center gap-1 px-2 py-1 rounded transition-all text-xs"
              :style="votes[12] ? { backgroundColor: '#ef4444', color: '#fff' } : { backgroundColor: colors.background.elevated, color: colors.text.muted }">
              <span>{{ votes[12] ? '❤️' : '🤍' }}</span>
              <span class="font-mono">{{ voteCounts[12] || 0 }}</span>
            </button>
          </div>
          <p class="text-xs" :style="{ color: colors.text.muted }">评级和操作改为垂直排列</p>
          
          <div class="p-6 text-center border transition-all duration-200 cursor-pointer group"
               :style="{ backgroundColor: colors.background.surface, borderColor: colors.border.subtle }">
            <h4 class="text-2xl font-bold mb-1" :style="{ color: colors.text.primary }">CRCL</h4>
            <p class="text-[10px] mb-4 line-clamp-1" :style="{ color: colors.text.muted }">Circle监管平稳号令一月效应反转</p>
            
            <div class="space-y-2 mb-4 border-y py-3" :style="{ borderColor: colors.border.subtle }">
              <div class="text-center pb-2 border-b" :style="{ borderColor: colors.border.subtle }">
                <div class="text-xl font-bold" :style="{ color: colors.text.primary }">A</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">策略评级</div>
              </div>
              <div class="text-center pt-2">
                <div class="text-xl font-bold text-cyan-400">观望买入</div>
                <div class="text-[9px] mt-0.5" :style="{ color: colors.text.disabled }">方向</div>
              </div>
            </div>

            <div class="flex justify-between items-center text-[9px] font-mono uppercase" :style="{ color: colors.text.disabled }">
              <span>1-4 weeks</span>
              <span class="font-bold" :style="{ color: colors.text.secondary }">5.8:1</span>
              <span class="px-2 py-0.5 rounded-sm font-bold" :style="{ backgroundColor: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }">盈</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Voting Summary -->
      <div class="mt-16 max-w-3xl mx-auto p-6 border rounded-lg" :style="{ backgroundColor: colors.background.elevated, borderColor: colors.border.default }">
        <h3 class="text-lg font-bold mb-4 text-center" :style="{ color: colors.text.primary }">
          投票统计
        </h3>
        <div class="space-y-2">
          <div v-for="i in 12" :key="i" class="flex items-center gap-3">
            <span class="text-sm w-20" :style="{ color: colors.text.secondary }">方案{{ i }}</span>
            <div class="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-cyan-500 rounded-full transition-all duration-500" :style="{ width: `${getVotePercentage(i)}%` }"></div>
            </div>
            <span class="text-sm font-mono w-12 text-right" :style="{ color: colors.text.muted }">{{ voteCounts[i] || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '../components/Navbar.vue'
import { colors } from '../design/tokens'

// Voting state
const votes = ref({})
const voteCounts = ref({
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
  7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0
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
  for (let i = 1; i <= 12; i++) {
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
