<template>
  <div class="min-h-screen p-8" :style="{ backgroundColor: isDark ? '#0a0f1a' : '#f8fafc' }">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2" :style="{ color: isDark ? '#fff' : '#1e293b' }">配色方案对比</h1>
          <p class="text-sm" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">针对"智能推荐"卡片和按钮的 5 种高级配色方案</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="isDark = !isDark"
            class="px-4 py-2 rounded-lg border text-sm font-medium transition-all"
            :style="{ 
              backgroundColor: isDark ? '#1e293b' : '#fff', 
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#e2e8f0' : '#475569'
            }"
          >
            {{ isDark ? '🌙 暗色模式' : '☀️ 日间模式' }}
          </button>
          <!-- Back Link -->
          <a href="/scalealpha/dev" class="text-sm underline" :style="{ color: isDark ? '#60a5fa' : '#3b82f6' }">
            返回开发工具
          </a>
        </div>
      </div>
    </div>

    <!-- Schemes Grid -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 gap-8">
      
      <!-- Scheme 1: Low Saturation Elegant -->
      <div class="rounded-xl p-6 border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-3 h-3 rounded-full bg-gradient-to-r from-slate-400 to-slate-500"></span>
          <h2 class="text-lg font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">方案一：低饱和度优雅风格</h2>
          <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b' }">推荐金融场景</span>
        </div>
        <p class="text-sm mb-6" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">使用低饱和度色调，营造沉稳、专业的金融感。蓝色区域采用淡灰蓝，橙色区域采用奶油白配古铜金文字。</p>
        
        <div class="grid grid-cols-4 gap-4">
          <!-- Card: 分析框架 (Blue) -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#1a2332' : '#E8EDF5', 
              borderColor: isDark ? '#3d5a80' : '#c7d2e0'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#8ba4c4' : '#4a6b8a' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#6b7c93' : '#6B7C93' }">根据市况自动选择</p>
          </div>
          
          <!-- Card: 投资周期 (Blue) -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#1a2332' : '#E8EDF5', 
              borderColor: isDark ? '#3d5a80' : '#c7d2e0'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#8ba4c4' : '#4a6b8a' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#6b7c93' : '#6B7C93' }">根据标的自动选择</p>
          </div>
          
          <!-- Card: 风险偏好 (Warm) -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#2a2520' : '#FBF5EE', 
              borderColor: isDark ? '#8b7355' : '#e8dcc8'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#c4a882' : '#B8956B' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#9a8b78' : '#9a8b78' }">根据市况自动调整</p>
          </div>
          
          <!-- Button -->
          <div class="flex items-center justify-center">
            <button 
              class="px-6 py-3 rounded-lg font-medium transition-all border-2"
              :style="{ 
                backgroundColor: 'transparent',
                borderColor: isDark ? '#6b7c93' : '#6B7C93',
                color: isDark ? '#8ba4c4' : '#4a6b8a'
              }"
            >
              ✨ 初始化生成
            </button>
          </div>
        </div>
      </div>

      <!-- Scheme 2: Glass Morphism -->
      <div class="rounded-xl p-6 border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
          <h2 class="text-lg font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">方案二：渐变玻璃拟态</h2>
          <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b' }">现代科技感</span>
        </div>
        <p class="text-sm mb-6" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">使用微妙的线性渐变代替纯色背景，添加轻微毛玻璃效果，边框使用半透明色，营造层次感。</p>
        
        <div class="grid grid-cols-4 gap-4">
          <!-- Card: 分析框架 (Blue Gradient) -->
          <div 
            class="p-4 rounded-xl border transition-all cursor-pointer backdrop-blur-sm"
            :style="{ 
              background: isDark 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)' 
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.2) 100%)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.25)',
              boxShadow: isDark ? '0 4px 24px rgba(59, 130, 246, 0.1)' : '0 4px 24px rgba(59, 130, 246, 0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">✨</span>
              <span class="font-bold" :style="{ color: isDark ? '#93c5fd' : '#2563eb' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#7dd3fc' : '#3b82f6' }">根据市况自动选择</p>
          </div>
          
          <!-- Card: 投资周期 (Blue Gradient) -->
          <div 
            class="p-4 rounded-xl border transition-all cursor-pointer backdrop-blur-sm"
            :style="{ 
              background: isDark 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)' 
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(147, 197, 253, 0.2) 100%)',
              borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.25)',
              boxShadow: isDark ? '0 4px 24px rgba(59, 130, 246, 0.1)' : '0 4px 24px rgba(59, 130, 246, 0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">✨</span>
              <span class="font-bold" :style="{ color: isDark ? '#93c5fd' : '#2563eb' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#7dd3fc' : '#3b82f6' }">根据标的自动选择</p>
          </div>
          
          <!-- Card: 风险偏好 (Orange Gradient) -->
          <div 
            class="p-4 rounded-xl border transition-all cursor-pointer backdrop-blur-sm"
            :style="{ 
              background: isDark 
                ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(234, 88, 12, 0.08) 100%)' 
                : 'linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(254, 215, 170, 0.25) 100%)',
              borderColor: isDark ? 'rgba(251, 146, 60, 0.3)' : 'rgba(251, 146, 60, 0.25)',
              boxShadow: isDark ? '0 4px 24px rgba(251, 146, 60, 0.1)' : '0 4px 24px rgba(251, 146, 60, 0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">✨</span>
              <span class="font-bold" :style="{ color: isDark ? '#fdba74' : '#ea580c' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#fed7aa' : '#f97316' }">根据市况自动调整</p>
          </div>
          
          <!-- Button -->
          <div class="flex items-center justify-center">
            <button 
              class="px-6 py-3 rounded-xl font-medium transition-all"
              :style="{ 
                background: isDark 
                  ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(34, 211, 238, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                border: isDark ? '1px solid rgba(34, 211, 238, 0.4)' : '1px solid rgba(34, 211, 238, 0.35)',
                color: isDark ? '#67e8f9' : '#0891b2',
                boxShadow: '0 4px 20px rgba(34, 211, 238, 0.15)'
              }"
            >
              ✨ 初始化生成
            </button>
          </div>
        </div>
      </div>

      <!-- Scheme 3: Single Brand Color -->
      <div class="rounded-xl p-6 border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-800"></span>
          <h2 class="text-lg font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">方案三：单一品牌色系</h2>
          <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b' }">品牌统一感</span>
        </div>
        <p class="text-sm mb-6" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">统一使用同一主色（深靛蓝 #1E3A5F）的不同明度变体，通过明度差异而非色相差异来区分不同类型。</p>
        
        <div class="grid grid-cols-4 gap-4">
          <!-- Card: 分析框架 -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? 'rgba(30, 58, 95, 0.3)' : '#EEF2F7', 
              borderColor: isDark ? '#1E3A5F' : '#1E3A5F'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#a5c4e8' : '#1E3A5F' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#7a9ec4' : '#3d5a80' }">根据市况自动选择</p>
          </div>
          
          <!-- Card: 投资周期 -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? 'rgba(30, 58, 95, 0.2)' : '#F4F7FA', 
              borderColor: isDark ? '#2d4a6f' : '#3d5a80'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#8bb4dc' : '#2d4a6f' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#6a9ac8' : '#4a6b8a' }">根据标的自动选择</p>
          </div>
          
          <!-- Card: 风险偏好 -->
          <div 
            class="p-4 rounded-lg border-2 transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? 'rgba(30, 58, 95, 0.15)' : '#F8FAFB', 
              borderColor: isDark ? '#3d5a80' : '#5a7a9a'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg">⭐</span>
              <span class="font-bold" :style="{ color: isDark ? '#7aa4d0' : '#3d5a80' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#5a8ac0' : '#5a7a9a' }">根据市况自动调整</p>
          </div>
          
          <!-- Button -->
          <div class="flex items-center justify-center">
            <button 
              class="px-6 py-3 rounded-lg font-medium transition-all border-2"
              :style="{ 
                backgroundColor: 'transparent',
                borderColor: isDark ? '#1E3A5F' : '#1E3A5F',
                color: isDark ? '#a5c4e8' : '#1E3A5F'
              }"
            >
              ✨ 初始化生成
            </button>
          </div>
        </div>
      </div>

      <!-- Scheme 4: Neutral Gray + Accent -->
      <div class="rounded-xl p-6 border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-emerald-500"></span>
          <h2 class="text-lg font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">方案四：中性灰 + 强调色点缀</h2>
          <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b' }">极简高端</span>
        </div>
        <p class="text-sm mb-6" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">卡片背景改为纯中性灰色，仅用小面积强调色（左侧色条、图标）标识状态，去除大面积彩色背景。</p>
        
        <div class="grid grid-cols-4 gap-4">
          <!-- Card: 分析框架 -->
          <div 
            class="p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden"
            :style="{ 
              backgroundColor: isDark ? '#1f2937' : '#F7F8FA', 
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }"
          >
            <!-- Left accent bar -->
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div class="pl-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-blue-500">★</span>
                <span class="font-bold" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">智能推荐</span>
              </div>
              <p class="text-xs" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">根据市况自动选择</p>
            </div>
          </div>
          
          <!-- Card: 投资周期 -->
          <div 
            class="p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden"
            :style="{ 
              backgroundColor: isDark ? '#1f2937' : '#F7F8FA', 
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <div class="pl-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-blue-500">★</span>
                <span class="font-bold" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">智能推荐</span>
              </div>
              <p class="text-xs" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">根据标的自动选择</p>
            </div>
          </div>
          
          <!-- Card: 风险偏好 -->
          <div 
            class="p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden"
            :style="{ 
              backgroundColor: isDark ? '#1f2937' : '#F7F8FA', 
              borderColor: isDark ? '#374151' : '#e5e7eb'
            }"
          >
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
            <div class="pl-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-amber-500">★</span>
                <span class="font-bold" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">智能推荐</span>
              </div>
              <p class="text-xs" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">根据市况自动调整</p>
            </div>
          </div>
          
          <!-- Button -->
          <div class="flex items-center justify-center">
            <button 
              class="px-6 py-3 rounded-lg font-medium transition-all"
              :style="{ 
                backgroundColor: isDark ? '#374151' : '#F7F8FA',
                border: isDark ? '1px solid #4b5563' : '1px solid #d1d5db',
                color: isDark ? '#10b981' : '#059669'
              }"
            >
              <span class="text-emerald-500 mr-2">✨</span> 初始化生成
            </button>
          </div>
        </div>
      </div>

      <!-- Scheme 5: Dark Border Outline -->
      <div class="rounded-xl p-6 border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
        <div class="flex items-center gap-3 mb-4">
          <span class="w-3 h-3 rounded-full border-2" :style="{ borderColor: isDark ? '#6b7280' : '#374151' }"></span>
          <h2 class="text-lg font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">方案五：深色边框描边风格</h2>
          <span class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: isDark ? '#334155' : '#f1f5f9', color: isDark ? '#94a3b8' : '#64748b' }">Apple风格</span>
        </div>
        <p class="text-sm mb-6" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">去除彩色背景填充，使用精致的深色边框（1-2px）勾勒选中状态，配合微妙阴影提升层次，轻盈、精致。</p>
        
        <div class="grid grid-cols-4 gap-4">
          <!-- Card: 分析框架 -->
          <div 
            class="p-4 rounded-xl transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff', 
              border: isDark ? '2px solid #334155' : '2px solid #1e293b',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span :style="{ color: isDark ? '#60a5fa' : '#3b82f6' }">★</span>
              <span class="font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">根据市况自动选择</p>
          </div>
          
          <!-- Card: 投资周期 -->
          <div 
            class="p-4 rounded-xl transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff', 
              border: isDark ? '2px solid #334155' : '2px solid #1e293b',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span :style="{ color: isDark ? '#60a5fa' : '#3b82f6' }">★</span>
              <span class="font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">根据标的自动选择</p>
          </div>
          
          <!-- Card: 风险偏好 -->
          <div 
            class="p-4 rounded-xl transition-all cursor-pointer"
            :style="{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff', 
              border: isDark ? '2px solid #78350f' : '2px solid #92400e',
              boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
            }"
          >
            <div class="flex items-center gap-2 mb-2">
              <span :style="{ color: isDark ? '#fbbf24' : '#f59e0b' }">★</span>
              <span class="font-bold" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">智能推荐</span>
            </div>
            <p class="text-xs" :style="{ color: isDark ? '#94a3b8' : '#64748b' }">根据市况自动调整</p>
          </div>
          
          <!-- Button -->
          <div class="flex items-center justify-center">
            <button 
              class="px-6 py-3 rounded-xl font-medium transition-all"
              :style="{ 
                backgroundColor: 'transparent',
                border: isDark ? '2px solid #334155' : '2px solid #1e293b',
                color: isDark ? '#f1f5f9' : '#1e293b',
                boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)'
              }"
            >
              ✨ 初始化生成
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- Color Palette Reference -->
    <div class="max-w-7xl mx-auto mt-12 p-6 rounded-xl border" :style="{ backgroundColor: isDark ? '#111827' : '#fff', borderColor: isDark ? '#1f2937' : '#e5e7eb' }">
      <h3 class="text-lg font-bold mb-4" :style="{ color: isDark ? '#f1f5f9' : '#1e293b' }">色值参考</h3>
      <div class="grid grid-cols-5 gap-4 text-xs">
        <div>
          <p class="font-medium mb-2" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">方案一</p>
          <div class="space-y-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
            <p>蓝色背景: #E8EDF5</p>
            <p>蓝色文字: #6B7C93</p>
            <p>暖色背景: #FBF5EE</p>
            <p>暖色文字: #B8956B</p>
          </div>
        </div>
        <div>
          <p class="font-medium mb-2" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">方案二</p>
          <div class="space-y-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
            <p>蓝色渐变: #3B82F6 → #93C5FD</p>
            <p>橙色渐变: #FB923C → #FED7AA</p>
            <p>按钮渐变: #22D3EE → #3B82F6</p>
          </div>
        </div>
        <div>
          <p class="font-medium mb-2" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">方案三</p>
          <div class="space-y-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
            <p>主色深: #1E3A5F</p>
            <p>主色中: #3D5A80</p>
            <p>主色浅: #5A7A9A</p>
            <p>背景: #EEF2F7</p>
          </div>
        </div>
        <div>
          <p class="font-medium mb-2" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">方案四</p>
          <div class="space-y-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
            <p>中性背景: #F7F8FA</p>
            <p>蓝色条: #3B82F6</p>
            <p>橙色条: #F59E0B</p>
            <p>按钮色: #10B981</p>
          </div>
        </div>
        <div>
          <p class="font-medium mb-2" :style="{ color: isDark ? '#e5e7eb' : '#374151' }">方案五</p>
          <div class="space-y-1" :style="{ color: isDark ? '#9ca3af' : '#6b7280' }">
            <p>边框深: #1E293B</p>
            <p>边框中: #334155</p>
            <p>背景: #FFFFFF</p>
            <p>阴影: rgba(0,0,0,0.08)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="max-w-7xl mx-auto mt-8 mb-12 text-center">
      <p class="text-sm" :style="{ color: isDark ? '#64748b' : '#94a3b8' }">
        选择您喜欢的方案，我将在原页面中实现对应的配色样式
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isDark = ref(false)
</script>

<style scoped>
/* Custom backdrop blur for glass morphism */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
