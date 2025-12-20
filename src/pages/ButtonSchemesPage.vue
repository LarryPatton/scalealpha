<template>
  <div class="min-h-screen p-8" :style="{ backgroundColor: '#f1f5f9' }">
    <!-- Header -->
    <div class="max-w-6xl mx-auto mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2" style="color: #1e293b;">按钮配色方案对比</h1>
          <p class="text-sm" style="color: #64748b;">"初始化生成"按钮和圆形图标按钮 - 日间/暗色模式 + 三种状态</p>
        </div>
        <a href="/scalealpha/dev" class="text-sm underline" style="color: #3b82f6;">
          返回开发工具
        </a>
      </div>
    </div>

    <!-- Schemes -->
    <div class="max-w-6xl mx-auto space-y-8">
      
      <!-- Scheme 1: 深蓝色 -->
      <div class="rounded-xl p-6 border bg-white" style="border-color: #e5e7eb;">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-3 h-3 rounded-full" style="background-color: #1e40af;"></span>
          <h2 class="text-lg font-bold" style="color: #1e293b;">方案一：深蓝色</h2>
          <span class="text-xs px-2 py-1 rounded" style="background-color: #f1f5f9; color: #64748b;">经典稳重</span>
        </div>
        <p class="text-sm mb-6" style="color: #64748b;">主色 #1e40af，暗色模式保持相同色相</p>
        
        <div class="grid grid-cols-2 gap-6">
          <!-- 日间模式 -->
          <div class="p-4 rounded-lg" style="background-color: #f8fafc;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #64748b;">☀️ 日间模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #1e40af;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #2563eb;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #cbd5e1; color: #94a3b8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <!-- 圆形按钮 -->
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Icon Btn</div>
                <div class="flex gap-2">
                  <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                    style="background-color: #ffffff; border-color: #1e40af;">
                    <svg class="w-4 h-4" style="color: #1e40af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #1e40af;">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 暗色模式 -->
          <div class="p-4 rounded-lg" style="background-color: #0f172a;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #94a3b8;">🌙 暗色模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #1e40af;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #2563eb;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #334155; color: #64748b;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <!-- 圆形按钮 -->
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Icon Btn</div>
                <div class="flex gap-2">
                  <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                    style="background-color: #1e293b; border-color: #3b82f6;">
                    <svg class="w-4 h-4" style="color: #60a5fa;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #3b82f6;">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scheme 2: 青色 (Cyan) -->
      <div class="rounded-xl p-6 border bg-white" style="border-color: #e5e7eb;">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-3 h-3 rounded-full" style="background-color: #0891b2;"></span>
          <h2 class="text-lg font-bold" style="color: #1e293b;">方案二：青色</h2>
          <span class="text-xs px-2 py-1 rounded" style="background-color: #f1f5f9; color: #64748b;">科技感</span>
        </div>
        <p class="text-sm mb-6" style="color: #64748b;">主色 #0891b2，与当前暗色模式主题一致</p>
        
        <div class="grid grid-cols-2 gap-6">
          <!-- 日间模式 -->
          <div class="p-4 rounded-lg" style="background-color: #f8fafc;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #64748b;">☀️ 日间模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #0891b2;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #06b6d4;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #cbd5e1; color: #94a3b8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #ffffff; border-color: #0891b2;">
                  <svg class="w-4 h-4" style="color: #0891b2;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #0891b2;">2</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 暗色模式 -->
          <div class="p-4 rounded-lg" style="background-color: #0f172a;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #94a3b8;">🌙 暗色模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #0891b2;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #22d3ee;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #334155; color: #64748b;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #1e293b; border-color: #22d3ee;">
                  <svg class="w-4 h-4" style="color: #22d3ee;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-black" style="background-color: #22d3ee;">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scheme 3: 翠绿色 -->
      <div class="rounded-xl p-6 border bg-white" style="border-color: #e5e7eb;">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-3 h-3 rounded-full" style="background-color: #059669;"></span>
          <h2 class="text-lg font-bold" style="color: #1e293b;">方案三：翠绿色</h2>
          <span class="text-xs px-2 py-1 rounded" style="background-color: #f1f5f9; color: #64748b;">积极行动</span>
        </div>
        <p class="text-sm mb-6" style="color: #64748b;">主色 #059669，适合"开始/生成"类操作</p>
        
        <div class="grid grid-cols-2 gap-6">
          <!-- 日间模式 -->
          <div class="p-4 rounded-lg" style="background-color: #f8fafc;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #64748b;">☀️ 日间模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #059669;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #10b981;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #cbd5e1; color: #94a3b8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #ffffff; border-color: #059669;">
                  <svg class="w-4 h-4" style="color: #059669;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #059669;">2</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 暗色模式 -->
          <div class="p-4 rounded-lg" style="background-color: #0f172a;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #94a3b8;">🌙 暗色模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #059669;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #34d399;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #334155; color: #64748b;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #1e293b; border-color: #34d399;">
                  <svg class="w-4 h-4" style="color: #34d399;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-black" style="background-color: #34d399;">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scheme 4: 低饱和深蓝 -->
      <div class="rounded-xl p-6 border bg-white" style="border-color: #e5e7eb;">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-3 h-3 rounded-full" style="background-color: #1e3a5f;"></span>
          <h2 class="text-lg font-bold" style="color: #1e293b;">方案四：低饱和深蓝</h2>
          <span class="text-xs px-2 py-1 rounded" style="background-color: #f1f5f9; color: #64748b;">金融专业</span>
        </div>
        <p class="text-sm mb-6" style="color: #64748b;">主色 #1e3a5f，低饱和度，沉稳专业</p>
        
        <div class="grid grid-cols-2 gap-6">
          <!-- 日间模式 -->
          <div class="p-4 rounded-lg" style="background-color: #f8fafc;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #64748b;">☀️ 日间模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #1e3a5f;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #2d4a6f;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #cbd5e1; color: #94a3b8;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #ffffff; border-color: #1e3a5f;">
                  <svg class="w-4 h-4" style="color: #1e3a5f;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #1e3a5f;">2</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 暗色模式 -->
          <div class="p-4 rounded-lg" style="background-color: #0f172a;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #94a3b8;">🌙 暗色模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #1e3a5f;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #3d5a80;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #334155; color: #64748b;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border-2 flex items-center justify-center relative"
                  style="background-color: #1e293b; border-color: #5a7a9a;">
                  <svg class="w-4 h-4" style="color: #8ba4c4;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #5a7a9a;">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scheme 5: 中性灰 + 强调色图标 -->
      <div class="rounded-xl p-6 border bg-white" style="border-color: #e5e7eb;">
        <div class="flex items-center gap-3 mb-2">
          <span class="w-3 h-3 rounded-full" style="background-color: #374151;"></span>
          <h2 class="text-lg font-bold" style="color: #1e293b;">方案五：中性灰</h2>
          <span class="text-xs px-2 py-1 rounded" style="background-color: #f1f5f9; color: #64748b;">低调内敛</span>
        </div>
        <p class="text-sm mb-6" style="color: #64748b;">按钮使用中性灰色 #374151，图标使用强调色</p>
        
        <div class="grid grid-cols-2 gap-6">
          <!-- 日间模式 -->
          <div class="p-4 rounded-lg" style="background-color: #f8fafc;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #64748b;">☀️ 日间模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #374151;">
                  <svg class="w-4 h-4" style="color: #67e8f9;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #4b5563;">
                  <svg class="w-4 h-4" style="color: #67e8f9;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #e5e7eb; color: #9ca3af;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #94a3b8;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border flex items-center justify-center relative"
                  style="background-color: #f3f4f6; border-color: #d1d5db;">
                  <svg class="w-4 h-4" style="color: #0891b2;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white" style="background-color: #0891b2;">2</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 暗色模式 -->
          <div class="p-4 rounded-lg" style="background-color: #0f172a;">
            <div class="text-xs font-bold mb-3 uppercase tracking-wider" style="color: #94a3b8;">🌙 暗色模式</div>
            <div class="flex items-center gap-4">
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Normal</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #374151;">
                  <svg class="w-4 h-4" style="color: #22d3ee;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Hover</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 text-white"
                  style="background-color: #4b5563;">
                  <svg class="w-4 h-4" style="color: #22d3ee;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Disabled</div>
                <button class="px-6 py-2.5 font-bold text-sm tracking-wider uppercase rounded-lg flex items-center gap-2 cursor-not-allowed"
                  style="background-color: #1f2937; color: #4b5563;">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  初始化生成
                </button>
              </div>
              <div class="space-y-2 ml-4">
                <div class="text-[10px] uppercase tracking-wider" style="color: #64748b;">Icon Btn</div>
                <div class="w-10 h-10 rounded-full border flex items-center justify-center relative"
                  style="background-color: #1e293b; border-color: #374151;">
                  <svg class="w-4 h-4" style="color: #22d3ee;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-black" style="background-color: #22d3ee;">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Color Reference -->
    <div class="max-w-6xl mx-auto mt-12 p-6 rounded-xl border bg-white" style="border-color: #e5e7eb;">
      <h3 class="text-lg font-bold mb-4" style="color: #1e293b;">色值参考</h3>
      <div class="grid grid-cols-5 gap-6 text-xs" style="color: #6b7280;">
        <div>
          <p class="font-medium mb-2" style="color: #374151;">方案一：深蓝色</p>
          <p>Normal: #1e40af</p>
          <p>Hover: #1d4ed8 / #2563eb</p>
          <p>Disabled: #cbd5e1 / #334155</p>
        </div>
        <div>
          <p class="font-medium mb-2" style="color: #374151;">方案二：青色</p>
          <p>Normal: #0891b2</p>
          <p>Hover: #06b6d4 / #22d3ee</p>
          <p>Disabled: #cbd5e1 / #334155</p>
        </div>
        <div>
          <p class="font-medium mb-2" style="color: #374151;">方案三：翠绿色</p>
          <p>Normal: #059669</p>
          <p>Hover: #10b981 / #34d399</p>
          <p>Disabled: #cbd5e1 / #334155</p>
        </div>
        <div>
          <p class="font-medium mb-2" style="color: #374151;">方案四：低饱和深蓝</p>
          <p>Normal: #1e3a5f</p>
          <p>Hover: #2d4a6f / #3d5a80</p>
          <p>Disabled: #cbd5e1 / #334155</p>
        </div>
        <div>
          <p class="font-medium mb-2" style="color: #374151;">方案五：中性灰</p>
          <p>Normal: #374151</p>
          <p>Hover: #4b5563</p>
          <p>Icon: #0891b2 / #22d3ee</p>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="max-w-6xl mx-auto mt-8 mb-12 text-center">
      <p class="text-sm" style="color: #94a3b8;">
        选择您喜欢的方案编号，我将在原页面中实现对应的按钮样式
      </p>
    </div>
  </div>
</template>

<script setup>
</script>
