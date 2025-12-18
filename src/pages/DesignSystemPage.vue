<template>
  <div class="min-h-screen" :style="{ backgroundColor: currentTokens.colors.background.base }">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b backdrop-blur-md" :style="{ 
      backgroundColor: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.95)', 
      borderColor: currentTokens.colors.border.default 
    }">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold"
               :style="{ background: `linear-gradient(135deg, ${currentTokens.colors.accent.info.DEFAULT}, ${currentTokens.colors.accent.primary.DEFAULT})` }">
            Ⓐ
          </div>
          <div>
            <h1 class="text-xl font-bold" :style="{ color: currentTokens.colors.text.primary }">ScaleAlpha Design System</h1>
            <p class="text-xs" :style="{ color: currentTokens.colors.text.muted }">Design Tokens Preview v2.0 · <span class="font-mono">{{ isDark ? 'Dark' : 'Light' }} Mode</span></p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <ThemeToggle />
          
          <nav class="flex gap-2">
            <button 
              v-for="section in sections" 
              :key="section.id"
              @click="scrollToSection(section.id)"
              class="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-all"
              :style="{ 
                color: activeSection === section.id ? currentTokens.colors.accent.primary.DEFAULT : currentTokens.colors.text.muted,
                backgroundColor: activeSection === section.id ? currentTokens.colors.accent.primary.bg : 'transparent',
                border: `1px solid ${activeSection === section.id ? currentTokens.colors.accent.primary.border : 'transparent'}`
              }"
            >
              {{ section.label }}
            </button>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-6 py-8 space-y-16">
      
      <!-- Section: Colors -->
      <section id="colors" class="scroll-mt-24">
        <SectionHeader title="颜色系统" subtitle="Color System" description="统一的颜色层级，确保视觉一致性" />
        
        <!-- Background Colors -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">背景色层级 (4层)</h3>
          <div class="grid grid-cols-4 gap-4">
            <ColorCard 
              v-for="(color, name) in tokens.colors.background" 
              :key="name"
              :name="name"
              :value="color"
              :level="['base', 'surface', 'elevated', 'overlay'].indexOf(name)"
            />
          </div>
        </div>

        <!-- Border Colors -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">边框色 (3层)</h3>
          <div class="grid grid-cols-3 gap-4">
            <ColorCard 
              v-for="(color, name) in tokens.colors.border" 
              :key="name"
              :name="name"
              :value="color"
              variant="border"
            />
          </div>
        </div>

        <!-- Text Colors -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">文字颜色 (5层)</h3>
          <div class="grid grid-cols-5 gap-4">
            <div 
              v-for="(color, name) in tokens.colors.text" 
              :key="name"
              class="p-4 rounded-lg border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
            >
              <p class="text-lg font-bold mb-2" :style="{ color }">Aa</p>
              <p class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ name }}</p>
              <p class="text-[10px] font-mono mt-1" :style="{ color: tokens.colors.text.disabled }">{{ color }}</p>
            </div>
          </div>
        </div>

        <!-- Accent Colors -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">强调色 (5种核心色)</h3>
          <div class="grid grid-cols-5 gap-4">
            <AccentColorCard 
              v-for="(colorSet, name) in tokens.colors.accent" 
              :key="name"
              :name="name"
              :colorSet="colorSet"
            />
          </div>
        </div>

        <!-- Grade Colors -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">评级专用色</h3>
          <div class="flex gap-4">
            <div 
              v-for="(color, grade) in tokens.colors.grade" 
              :key="grade"
              class="w-16 h-16 rounded-lg flex items-center justify-center text-2xl font-bold border"
              :style="{ 
                backgroundColor: `${color}15`, 
                borderColor: `${color}40`,
                color: color 
              }"
            >
              {{ grade }}
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Themes (Dark/Light Mode) -->
      <section id="themes" class="scroll-mt-24">
        <SectionHeader title="主题系统" subtitle="Theme System" description="深色/浅色主题切换，响应式颜色映射" />
        
        <!-- Theme Overview -->
        <div class="mt-8 grid grid-cols-2 gap-6">
          <!-- Dark Theme Card -->
          <div 
            class="p-6 rounded-xl border-2"
            :style="{ 
              backgroundColor: '#0a0a0a',
              borderColor: isDark ? currentTokens.colors.accent.primary.DEFAULT : '#222222'
            }"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #0ea5e9, #06b6d4)">
                  <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-white">Dark Theme</h4>
                  <p class="text-xs text-gray-500">深色模式（默认）</p>
                </div>
              </div>
              <span 
                v-if="isDark"
                class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded"
                style="background-color: rgba(6, 182, 212, 0.15); color: #06b6d4; border: 1px solid rgba(6, 182, 212, 0.3)"
              >
                ACTIVE
              </span>
            </div>
            
            <!-- Dark Theme Colors -->
            <div class="space-y-4">
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-2">背景色层级</p>
                <div class="flex gap-2">
                  <div class="flex-1 h-8 rounded" style="background-color: #050505"></div>
                  <div class="flex-1 h-8 rounded" style="background-color: #0a0a0a"></div>
                  <div class="flex-1 h-8 rounded" style="background-color: #111111"></div>
                  <div class="flex-1 h-8 rounded" style="background-color: #1a1a1a"></div>
                </div>
                <div class="flex gap-2 mt-1">
                  <span class="flex-1 text-[9px] text-gray-600 text-center">base</span>
                  <span class="flex-1 text-[9px] text-gray-600 text-center">surface</span>
                  <span class="flex-1 text-[9px] text-gray-600 text-center">elevated</span>
                  <span class="flex-1 text-[9px] text-gray-600 text-center">overlay</span>
                </div>
              </div>
              
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-2">文字颜色</p>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #ffffff"></div>
                    <span class="text-xs text-white">primary · #ffffff</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #d1d5db"></div>
                    <span class="text-xs text-gray-300">secondary · #d1d5db</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #6b7280"></div>
                    <span class="text-xs text-gray-500">muted · #6b7280</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-2">边框颜色</p>
                <div class="flex gap-4">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #1a1a1a; background: transparent"></div>
                    <span class="text-[10px] text-gray-500">subtle</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #222222; background: transparent"></div>
                    <span class="text-[10px] text-gray-500">default</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #333333; background: transparent"></div>
                    <span class="text-[10px] text-gray-500">strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Light Theme Card -->
          <div 
            class="p-6 rounded-xl border-2"
            :style="{ 
              backgroundColor: '#f8fafc',
              borderColor: !isDark ? currentTokens.colors.accent.primary.DEFAULT : '#e2e8f0'
            }"
          >
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: linear-gradient(135deg, #f59e0b, #fbbf24)">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900">Light Theme</h4>
                  <p class="text-xs text-slate-500">浅色模式</p>
                </div>
              </div>
              <span 
                v-if="!isDark"
                class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded"
                style="background-color: rgba(8, 145, 178, 0.12); color: #0891b2; border: 1px solid rgba(8, 145, 178, 0.3)"
              >
                ACTIVE
              </span>
            </div>
            
            <!-- Light Theme Colors -->
            <div class="space-y-4">
              <div>
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-2">背景色层级</p>
                <div class="flex gap-2">
                  <div class="flex-1 h-8 rounded border border-slate-200" style="background-color: #f8fafc"></div>
                  <div class="flex-1 h-8 rounded border border-slate-200" style="background-color: #ffffff"></div>
                  <div class="flex-1 h-8 rounded border border-slate-200" style="background-color: #f1f5f9"></div>
                  <div class="flex-1 h-8 rounded border border-slate-200" style="background-color: #e2e8f0"></div>
                </div>
                <div class="flex gap-2 mt-1">
                  <span class="flex-1 text-[9px] text-slate-400 text-center">base</span>
                  <span class="flex-1 text-[9px] text-slate-400 text-center">surface</span>
                  <span class="flex-1 text-[9px] text-slate-400 text-center">elevated</span>
                  <span class="flex-1 text-[9px] text-slate-400 text-center">overlay</span>
                </div>
              </div>
              
              <div>
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-2">文字颜色</p>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #0f172a"></div>
                    <span class="text-xs text-slate-900">primary · #0f172a</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #334155"></div>
                    <span class="text-xs text-slate-700">secondary · #334155</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded-sm" style="background-color: #64748b"></div>
                    <span class="text-xs text-slate-500">muted · #64748b</span>
                  </div>
                </div>
              </div>
              
              <div>
                <p class="text-[10px] text-slate-500 uppercase tracking-wider mb-2">边框颜色</p>
                <div class="flex gap-4">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #f1f5f9; background: white"></div>
                    <span class="text-[10px] text-slate-400">subtle</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #e2e8f0; background: white"></div>
                    <span class="text-[10px] text-slate-400">default</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-4 rounded-sm border-2" style="border-color: #cbd5e1; background: white"></div>
                    <span class="text-[10px] text-slate-400">strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Color Mapping Table -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: currentTokens.colors.text.tertiary }">颜色映射规则</h3>
          <div 
            class="rounded-lg border overflow-hidden"
            :style="{ borderColor: currentTokens.colors.border.default }"
          >
            <table class="w-full text-sm">
              <thead>
                <tr :style="{ backgroundColor: currentTokens.colors.background.elevated }">
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: currentTokens.colors.text.muted }">语义用途</th>
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: currentTokens.colors.text.muted }">深色模式</th>
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: currentTokens.colors.text.muted }">浅色模式</th>
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: currentTokens.colors.text.muted }">CSS 覆盖</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(mapping, index) in colorMappings" 
                  :key="index"
                  class="border-t"
                  :style="{ borderColor: currentTokens.colors.border.default }"
                >
                  <td class="px-4 py-3" :style="{ color: currentTokens.colors.text.primary }">{{ mapping.usage }}</td>
                  <td class="px-4 py-3 font-mono text-xs">
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 rounded-sm border border-gray-700" :style="{ backgroundColor: mapping.dark }"></div>
                      <span :style="{ color: currentTokens.colors.text.secondary }">{{ mapping.dark }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-xs">
                    <div class="flex items-center gap-2">
                      <div class="w-4 h-4 rounded-sm border border-gray-300" :style="{ backgroundColor: mapping.light }"></div>
                      <span :style="{ color: currentTokens.colors.text.secondary }">{{ mapping.light }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-3 font-mono text-[10px]" :style="{ color: currentTokens.colors.text.muted }">{{ mapping.css }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Accent Colors in Light Mode -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: currentTokens.colors.text.tertiary }">强调色调整（浅色模式）</h3>
          <p class="text-sm mb-4" :style="{ color: currentTokens.colors.text.secondary }">
            浅色模式下，强调色需要更深的色值以确保对比度符合 WCAG 标准。
          </p>
          <div class="grid grid-cols-5 gap-4">
            <div 
              v-for="accent in accentComparison" 
              :key="accent.name"
              class="p-4 rounded-lg border"
              :style="{ backgroundColor: currentTokens.colors.background.surface, borderColor: currentTokens.colors.border.default }"
            >
              <p class="text-xs font-bold uppercase tracking-wider mb-3" :style="{ color: currentTokens.colors.text.muted }">{{ accent.name }}</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px]" :style="{ color: currentTokens.colors.text.muted }">深色</span>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded" :style="{ backgroundColor: accent.dark }"></div>
                    <span class="font-mono text-[10px]" :style="{ color: accent.dark }">{{ accent.darkCode }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[10px]" :style="{ color: currentTokens.colors.text.muted }">浅色</span>
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded" :style="{ backgroundColor: accent.light }"></div>
                    <span class="font-mono text-[10px]" :style="{ color: accent.light }">{{ accent.lightCode }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Theme Implementation Notes -->
        <div class="mt-8 p-6 rounded-lg border" :style="{ backgroundColor: currentTokens.colors.background.surface, borderColor: currentTokens.colors.border.default }">
          <h3 class="text-sm font-bold mb-4" :style="{ color: currentTokens.colors.text.primary }">🛠️ 实现说明</h3>
          <div class="grid grid-cols-2 gap-6 text-sm" :style="{ color: currentTokens.colors.text.secondary }">
            <div>
              <p class="font-bold mb-2" :style="{ color: currentTokens.colors.text.primary }">主题切换机制</p>
              <ul class="space-y-1 text-xs list-disc list-inside" :style="{ color: currentTokens.colors.text.muted }">
                <li>使用 <code class="px-1 py-0.5 rounded" :style="{ backgroundColor: currentTokens.colors.background.elevated }">useTheme()</code> composable 管理主题状态</li>
                <li>通过 <code class="px-1 py-0.5 rounded" :style="{ backgroundColor: currentTokens.colors.background.elevated }">data-theme="light/dark"</code> 属性切换</li>
                <li>设置持久化存储在 localStorage</li>
                <li>所有颜色过渡动画 0.2-0.3 秒</li>
              </ul>
            </div>
            <div>
              <p class="font-bold mb-2" :style="{ color: currentTokens.colors.text.primary }">CSS 覆盖策略</p>
              <ul class="space-y-1 text-xs list-disc list-inside" :style="{ color: currentTokens.colors.text.muted }">
                <li>在 <code class="px-1 py-0.5 rounded" :style="{ backgroundColor: currentTokens.colors.background.elevated }">theme.css</code> 中定义浅色覆盖</li>
                <li>使用 <code class="px-1 py-0.5 rounded" :style="{ backgroundColor: currentTokens.colors.background.elevated }">[data-theme="light"]</code> 选择器</li>
                <li>优先使用 tokens 系统的响应式颜色</li>
                <li>Tailwind 类作为后备，通过 CSS 覆盖</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Typography -->
      <section id="typography" class="scroll-mt-24">
        <SectionHeader title="排版系统" subtitle="Typography" description="5级字体大小 + 2种字重，简洁高效" />
        
        <div class="mt-8 space-y-6">
          <div 
            v-for="(config, name) in tokens.typography.fontSize" 
            :key="name"
            class="p-4 rounded-lg border flex items-center justify-between"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div>
              <p 
                :style="{ 
                  fontSize: config[0], 
                  lineHeight: config[1].lineHeight,
                  fontWeight: config[1].fontWeight,
                  color: tokens.colors.text.primary 
                }"
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <p class="text-xs font-mono mt-2" :style="{ color: tokens.colors.text.muted }">
                {{ name }} · {{ config[0] }} / {{ config[1].lineHeight }} · weight {{ config[1].fontWeight }}
              </p>
            </div>
            <span 
              class="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
              :style="{ 
                backgroundColor: tokens.colors.accent.primary.bg,
                color: tokens.colors.accent.primary.DEFAULT,
                border: `1px solid ${tokens.colors.accent.primary.border}`
              }"
            >
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Font Mono Demo -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">等宽字体使用场景</h3>
          <div class="grid grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
              <p class="text-xs mb-2" :style="{ color: tokens.colors.text.muted }">股票代码</p>
              <p class="font-mono text-lg font-bold" :style="{ color: tokens.colors.text.primary }">AAPL</p>
            </div>
            <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
              <p class="text-xs mb-2" :style="{ color: tokens.colors.text.muted }">数值</p>
              <p class="font-mono text-lg font-bold" :style="{ color: tokens.colors.accent.success.DEFAULT }">+12.34%</p>
            </div>
            <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
              <p class="text-xs mb-2" :style="{ color: tokens.colors.text.muted }">ID / 时间戳</p>
              <p class="font-mono text-sm" :style="{ color: tokens.colors.text.tertiary }">#STR-2024-001</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Spacing -->
      <section id="spacing" class="scroll-mt-24">
        <SectionHeader title="间距系统" subtitle="Spacing" description="基于 4px 的间距阶梯，6 个层级" />
        
        <div class="mt-8 flex items-end gap-4">
          <div 
            v-for="(value, name) in tokens.spacing" 
            :key="name"
            class="flex flex-col items-center"
          >
            <div 
              class="rounded"
              :style="{ 
                width: value, 
                height: '100px', 
                backgroundColor: tokens.colors.accent.primary.DEFAULT 
              }"
            ></div>
            <p class="text-xs font-mono mt-2" :style="{ color: tokens.colors.text.primary }">{{ name }}</p>
            <p class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ value }}</p>
          </div>
        </div>

        <!-- Spacing Usage -->
        <div class="mt-8 grid grid-cols-2 gap-6">
          <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <p class="text-sm font-bold mb-3" :style="{ color: tokens.colors.text.primary }">内边距 (Padding)</p>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono w-16" :style="{ color: tokens.colors.text.muted }">md</span>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">卡片内边距、按钮内边距</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono w-16" :style="{ color: tokens.colors.text.muted }">lg</span>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">大型面板内边距</span>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <p class="text-sm font-bold mb-3" :style="{ color: tokens.colors.text.primary }">间隙 (Gap)</p>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono w-16" :style="{ color: tokens.colors.text.muted }">sm</span>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">相关元素之间</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono w-16" :style="{ color: tokens.colors.text.muted }">xl</span>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">区块之间</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Border Radius -->
      <section id="radius" class="scroll-mt-24">
        <SectionHeader title="圆角系统" subtitle="Border Radius" description="仅 3 种规格，简化选择" />
        
        <div class="mt-8 flex gap-8">
          <div 
            v-for="(value, name) in tokens.borderRadius" 
            :key="name"
            class="flex flex-col items-center"
          >
            <div 
              class="w-24 h-24 border-2 flex items-center justify-center"
              :style="{ 
                borderRadius: value,
                borderColor: tokens.colors.accent.primary.DEFAULT,
                backgroundColor: tokens.colors.accent.primary.bg
              }"
            >
              <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.primary.DEFAULT }">{{ value }}</span>
            </div>
            <p class="text-sm font-bold mt-3" :style="{ color: tokens.colors.text.primary }">{{ name }}</p>
            <p class="text-[10px] mt-1 text-center max-w-[120px]" :style="{ color: tokens.colors.text.muted }">
              {{ radiusUsage[name] }}
            </p>
          </div>
        </div>
      </section>

      <!-- Section: Shadows -->
      <section id="shadows" class="scroll-mt-24">
        <SectionHeader title="阴影系统" subtitle="Shadows" description="3 级静态阴影 + 4 种发光效果" />
        
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">静态阴影</h3>
          <div class="flex gap-8">
            <div 
              v-for="(value, name) in { subtle: tokens.shadows.subtle, medium: tokens.shadows.medium, strong: tokens.shadows.strong }" 
              :key="name"
              class="w-32 h-32 rounded-lg flex flex-col items-center justify-center"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                boxShadow: value
              }"
            >
              <p class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">{{ name }}</p>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">发光效果 (限制使用)</h3>
          <div class="flex gap-8">
            <div 
              v-for="(value, name) in tokens.shadows.glow" 
              :key="name"
              class="w-32 h-32 rounded-lg flex flex-col items-center justify-center border"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                boxShadow: value,
                borderColor: tokens.colors.accent[name]?.DEFAULT || tokens.colors.border.default
              }"
            >
              <p class="text-sm font-bold" :style="{ color: tokens.colors.accent[name]?.DEFAULT || tokens.colors.text.primary }">{{ name }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Components -->
      <section id="components" class="scroll-mt-24">
        <SectionHeader title="组件预设" subtitle="Components" description="按钮、输入框、徽章、卡片的统一样式" />
        
        <!-- Buttons -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">按钮 (Buttons)</h3>
          <div class="flex flex-wrap gap-4 items-center">
            <!-- Primary Button -->
            <button 
              class="px-6 py-2.5 font-bold text-sm rounded transition-all"
              :style="{ 
                backgroundColor: tokens.colors.accent.primary.DEFAULT,
                color: '#000',
                boxShadow: tokens.shadows.glow.primary,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              Primary Button
            </button>
            
            <!-- Secondary Button -->
            <button 
              class="px-6 py-2.5 font-bold text-sm rounded border transition-all"
              :style="{ 
                backgroundColor: 'transparent',
                color: tokens.colors.accent.primary.DEFAULT,
                borderColor: tokens.colors.accent.primary.border,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              Secondary Button
            </button>
            
            <!-- Ghost Button -->
            <button 
              class="px-6 py-2.5 font-bold text-sm rounded transition-all"
              :style="{ 
                backgroundColor: 'transparent',
                color: tokens.colors.text.secondary,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              Ghost Button
            </button>
            
            <!-- Danger Button -->
            <button 
              class="px-6 py-2.5 font-bold text-sm rounded border transition-all"
              :style="{ 
                backgroundColor: tokens.colors.accent.danger.bg,
                color: tokens.colors.accent.danger.DEFAULT,
                borderColor: tokens.colors.accent.danger.border,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              Danger Button
            </button>

            <!-- Icon Button -->
            <button 
              class="p-2.5 rounded border transition-all"
              :style="{ 
                backgroundColor: 'transparent',
                color: tokens.colors.text.secondary,
                borderColor: tokens.colors.border.strong,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Inputs -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">输入框 (Inputs)</h3>
          <div class="flex gap-4 max-w-2xl">
            <input 
              type="text" 
              placeholder="Default input..."
              class="flex-1 px-4 py-2.5 text-sm border outline-none transition-all"
              :style="{ 
                backgroundColor: tokens.colors.background.elevated,
                borderColor: tokens.colors.border.strong,
                color: tokens.colors.text.primary,
                borderRadius: tokens.borderRadius.sharp
              }"
            />
            <input 
              type="text" 
              placeholder="Focused input..."
              class="flex-1 px-4 py-2.5 text-sm border outline-none"
              :style="{ 
                backgroundColor: tokens.colors.background.elevated,
                borderColor: tokens.colors.accent.primary.border,
                color: tokens.colors.text.primary,
                borderRadius: tokens.borderRadius.sharp,
                boxShadow: `0 0 0 2px ${tokens.colors.accent.primary.bg}`
              }"
            />
          </div>
        </div>

        <!-- Badges -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">徽章 (Badges)</h3>
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="(config, name) in tokens.components.badge" 
              :key="name"
              class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border"
              :style="{ 
                backgroundColor: config.bg,
                color: config.text,
                borderColor: config.border,
                borderRadius: tokens.borderRadius.sharp
              }"
            >
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Cards -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">卡片 (Cards)</h3>
          <div class="grid grid-cols-3 gap-6">
            <!-- Basic Card -->
            <div 
              class="p-4 border"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                borderColor: tokens.colors.border.default,
                borderRadius: tokens.borderRadius.rounded
              }"
            >
              <h4 class="font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Basic Card</h4>
              <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">This is a basic card with default styling.</p>
            </div>

            <!-- Elevated Card -->
            <div 
              class="p-4 border"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                borderColor: tokens.colors.border.default,
                borderRadius: tokens.borderRadius.rounded,
                boxShadow: tokens.shadows.medium
              }"
            >
              <h4 class="font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Elevated Card</h4>
              <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">This card has shadow for elevation.</p>
            </div>

            <!-- Interactive Card -->
            <div 
              class="p-4 border cursor-pointer transition-all hover:border-cyan-500/30"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                borderColor: tokens.colors.border.default,
                borderRadius: tokens.borderRadius.rounded
              }"
            >
              <h4 class="font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Interactive Card</h4>
              <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">Hover me to see interaction.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: States -->
      <section id="states" class="scroll-mt-24">
        <SectionHeader title="交互状态" subtitle="Interaction States" description="悬停、选中、禁用、焦点状态的统一表现" />
        
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">列表项状态</h3>
          <div 
            class="border rounded-lg overflow-hidden"
            :style="{ borderColor: tokens.colors.border.default }"
          >
            <!-- Default -->
            <div 
              class="px-4 py-3 border-b flex items-center justify-between"
              :style="{ 
                backgroundColor: tokens.colors.background.surface,
                borderColor: tokens.colors.border.default
              }"
            >
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.text.muted }"></div>
                <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">Default State</span>
              </div>
              <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">Normal</span>
            </div>

            <!-- Hover -->
            <div 
              class="px-4 py-3 border-b flex items-center justify-between"
              :style="{ 
                backgroundColor: tokens.colors.background.elevated,
                borderColor: tokens.colors.border.default
              }"
            >
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.text.secondary }"></div>
                <span class="text-sm" :style="{ color: tokens.colors.text.primary }">Hover State</span>
              </div>
              <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">:hover</span>
            </div>

            <!-- Selected -->
            <div 
              class="px-4 py-3 border-b border-l-2 flex items-center justify-between"
              :style="{ 
                backgroundColor: tokens.colors.accent.primary.bg,
                borderColor: tokens.colors.border.default,
                borderLeftColor: tokens.colors.accent.primary.DEFAULT
              }"
            >
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary.DEFAULT }"></div>
                <span class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Selected State</span>
              </div>
              <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.primary.DEFAULT }">selected</span>
            </div>

            <!-- Disabled -->
            <div 
              class="px-4 py-3 flex items-center justify-between opacity-50 cursor-not-allowed"
              :style="{ 
                backgroundColor: tokens.colors.background.surface
              }"
            >
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: tokens.colors.text.disabled }"></div>
                <span class="text-sm" :style="{ color: tokens.colors.text.disabled }">Disabled State</span>
              </div>
              <span class="text-xs font-mono" :style="{ color: tokens.colors.text.disabled }">:disabled</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Animations -->
      <section id="animations" class="scroll-mt-24">
        <SectionHeader title="动画系统" subtitle="Animations" description="4 种核心动画，保持克制" />
        
        <div class="mt-8 grid grid-cols-4 gap-6">
          <!-- Fade -->
          <div 
            class="p-6 rounded-lg border text-center"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div 
              class="w-12 h-12 rounded-lg mx-auto mb-4 animate-fade-in"
              :style="{ backgroundColor: tokens.colors.accent.primary.DEFAULT }"
            ></div>
            <p class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Fade In</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">200ms</p>
          </div>

          <!-- Pulse -->
          <div 
            class="p-6 rounded-lg border text-center"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div 
              class="w-12 h-12 rounded-full mx-auto mb-4 animate-pulse"
              :style="{ backgroundColor: tokens.colors.accent.success.DEFAULT }"
            ></div>
            <p class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Pulse</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">1.5s loop</p>
          </div>

          <!-- Spin -->
          <div 
            class="p-6 rounded-lg border text-center"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <svg class="w-12 h-12 mx-auto mb-4 animate-spin" :style="{ color: tokens.colors.accent.warning.DEFAULT }" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Spin</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">1s loop</p>
          </div>

          <!-- Slide -->
          <div 
            class="p-6 rounded-lg border text-center"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div 
              class="w-12 h-12 rounded-lg mx-auto mb-4 animate-bounce"
              :style="{ backgroundColor: tokens.colors.accent.danger.DEFAULT }"
            ></div>
            <p class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">Slide</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">300ms</p>
          </div>
        </div>
      </section>

      <!-- Section: Page Standards (新增：已统一的页面规范) -->
      <section id="standards" class="scroll-mt-24">
        <SectionHeader title="页面统一规范" subtitle="Page Standards" description="已在核心页面统一应用的视觉语言规范" />
        
        <!-- 应用范围 -->
        <div class="mt-8 p-4 rounded-lg border" :style="{ backgroundColor: tokens.colors.accent.primary.bg, borderColor: tokens.colors.accent.primary.border }">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-lg">📋</span>
            <span class="font-bold" :style="{ color: tokens.colors.text.primary }">已统一的页面</span>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="page in unifiedPages" 
              :key="page.name"
              class="px-3 py-1.5 text-xs font-mono rounded border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.strong, color: tokens.colors.text.secondary }"
            >
              {{ page.name }}
            </span>
          </div>
        </div>

        <!-- 圆角规范 -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">圆角半径规范 (混合策略)</h3>
          <div class="grid grid-cols-3 gap-4">
            <div 
              class="p-4 border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
            >
              <div class="flex items-center gap-3 mb-3">
                <div 
                  class="w-12 h-12 border-2 flex items-center justify-center"
                  :style="{ borderRadius: tokens.borderRadius.sharp, borderColor: tokens.colors.accent.primary.DEFAULT, backgroundColor: tokens.colors.accent.primary.bg }"
                >
                  <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.primary.DEFAULT }">2px</span>
                </div>
                <div>
                  <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">Sharp</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">rounded-sm</p>
                </div>
              </div>
              <p class="text-xs" :style="{ color: tokens.colors.text.secondary }">用于卡片、面板、输入框、下拉框等容器类元素。锐利边角营造专业科技感。</p>
            </div>

            <div 
              class="p-4 border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
            >
              <div class="flex items-center gap-3 mb-3">
                <div 
                  class="w-12 h-12 border-2 flex items-center justify-center"
                  :style="{ borderRadius: tokens.borderRadius.full, borderColor: tokens.colors.accent.success.DEFAULT, backgroundColor: tokens.colors.accent.success.bg }"
                >
                  <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.success.DEFAULT }">full</span>
                </div>
                <div>
                  <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">Full</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">rounded-full</p>
                </div>
              </div>
              <p class="text-xs" :style="{ color: tokens.colors.text.secondary }">用于胶囊型按钮、Tab 切换器、状态徽章、头像、状态指示点等。</p>
            </div>

            <div 
              class="p-4 border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
            >
              <div class="flex items-center gap-3 mb-3">
                <div 
                  class="w-12 h-12 border-2 flex items-center justify-center"
                  :style="{ borderRadius: tokens.borderRadius.rounded, borderColor: tokens.colors.accent.warning.DEFAULT, backgroundColor: tokens.colors.accent.warning.bg }"
                >
                  <span class="text-xs font-mono" :style="{ color: tokens.colors.accent.warning.DEFAULT }">8px</span>
                </div>
                <div>
                  <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">Rounded</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">rounded-lg</p>
                </div>
              </div>
              <p class="text-xs" :style="{ color: tokens.colors.text.secondary }">仅用于特殊场景如模态框外框。日常开发优先使用 sharp。</p>
            </div>
          </div>
        </div>

        <!-- 浮动 Tab 规范 -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">浮动 Tab 导航规范</h3>
          <div 
            class="p-4 border"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
          >
            <!-- 示例 Tab -->
            <div class="flex justify-center mb-4">
              <div 
                class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1"
                :style="{ backgroundColor: tokens.colors.background.elevated + 'E6', borderColor: tokens.colors.border.strong }"
              >
                <button 
                  v-for="(tab, index) in exampleTabs" 
                  :key="tab"
                  class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
                  :class="index === 0 ? 'shadow-lg scale-105' : ''"
                  :style="index === 0 ? { backgroundColor: isDark ? '#ffffff' : tokens.colors.text.primary, color: isDark ? '#000000' : '#ffffff' } : { color: tokens.colors.text.muted }"
                >
                  {{ tab }}
                </button>
              </div>
            </div>
            
            <!-- 规格说明 -->
            <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t" :style="{ borderColor: tokens.colors.border.default }">
              <div>
                <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">容器样式</p>
                <ul class="space-y-1 text-xs" :style="{ color: tokens.colors.text.secondary }">
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">backdrop-blur-xl</code> 毛玻璃效果</li>
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">rounded-full</code> 完全圆角</li>
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">p-1.5</code> 内边距</li>
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">gap-1</code> 按钮间距</li>
                  <li>背景: <code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">background.elevated + 'E6'</code></li>
                  <li>边框: <code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">border.strong</code></li>
                </ul>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">按钮样式</p>
                <ul class="space-y-1 text-xs" :style="{ color: tokens.colors.text.secondary }">
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">px-6 py-2.5</code> 尺寸</li>
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">text-sm font-bold</code> 文字</li>
                  <li><code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">duration-300</code> 过渡时间</li>
                  <li>激活态: 白底黑字 + <code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">shadow-lg scale-105</code></li>
                  <li>默认态: <code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">text.muted</code></li>
                  <li>悬停态: 背景变为 <code class="px-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">border.strong</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 主题切换一致性 -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">主题切换规范</h3>
          <div class="grid grid-cols-2 gap-4">
            <div 
              class="p-4 border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
            >
              <div class="flex items-center gap-2 mb-3">
                <span class="text-lg">🌙</span>
                <span class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">深色模式</span>
              </div>
              <ul class="space-y-1 text-xs" :style="{ color: tokens.colors.text.secondary }">
                <li>激活 Tab 按钮: <span class="font-mono px-1 rounded" :style="{ backgroundColor: '#ffffff', color: '#000000' }">白底黑字</span></li>
                <li>页面背景: <code class="font-mono">#050505</code> (base)</li>
                <li>卡片背景: <code class="font-mono">#0a0a0a</code> (surface)</li>
                <li>强调色保持 cyan-500</li>
              </ul>
            </div>
            <div 
              class="p-4 border"
              :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
            >
              <div class="flex items-center gap-2 mb-3">
                <span class="text-lg">☀️</span>
                <span class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">浅色模式</span>
              </div>
              <ul class="space-y-1 text-xs" :style="{ color: tokens.colors.text.secondary }">
                <li>激活 Tab 按钮: <span class="font-mono px-1 rounded" :style="{ backgroundColor: '#0f172a', color: '#ffffff' }">深底白字</span></li>
                <li>页面背景: <code class="font-mono">#f8fafc</code> (slate-50)</li>
                <li>卡片背景: <code class="font-mono">#ffffff</code> (white)</li>
                <li>强调色调整为 cyan-600</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 已修复的问题 -->
        <div class="mt-8">
          <h3 class="text-sm font-bold uppercase tracking-wider mb-4" :style="{ color: tokens.colors.text.tertiary }">已统一的视觉元素</h3>
          <div 
            class="border overflow-hidden"
            :style="{ borderColor: tokens.colors.border.default, borderRadius: tokens.borderRadius.sharp }"
          >
            <table class="w-full text-sm">
              <thead>
                <tr :style="{ backgroundColor: tokens.colors.background.elevated }">
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">元素</th>
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">统一规范</th>
                  <th class="px-4 py-3 text-left font-bold text-xs uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">应用页面</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(item, index) in unifiedElements" 
                  :key="index"
                  class="border-t"
                  :style="{ borderColor: tokens.colors.border.default }"
                >
                  <td class="px-4 py-3 font-medium" :style="{ color: tokens.colors.text.primary }">{{ item.element }}</td>
                  <td class="px-4 py-3 font-mono text-xs" :style="{ color: tokens.colors.text.secondary }">{{ item.spec }}</td>
                  <td class="px-4 py-3 text-xs" :style="{ color: tokens.colors.text.muted }">{{ item.pages }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Section: Example -->
      <section id="example" class="scroll-mt-24">
        <SectionHeader title="综合示例" subtitle="Example" description="使用 Design Tokens 构建的完整组件" />
        
        <div class="mt-8">
          <!-- Strategy Card Example -->
          <div 
            class="max-w-md border overflow-hidden"
            :style="{ 
              backgroundColor: tokens.colors.background.surface,
              borderColor: tokens.colors.border.default,
              borderRadius: tokens.borderRadius.rounded,
              boxShadow: tokens.shadows.medium
            }"
          >
            <!-- Header -->
            <div 
              class="px-4 py-3 border-b flex items-center justify-between"
              :style="{ borderColor: tokens.colors.border.default }"
            >
              <div class="flex items-center gap-3">
                <span class="font-mono font-bold text-lg" :style="{ color: tokens.colors.text.primary }">AAPL</span>
                <span 
                  class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border"
                  :style="{ 
                    backgroundColor: tokens.colors.accent.success.bg,
                    color: tokens.colors.accent.success.DEFAULT,
                    borderColor: tokens.colors.accent.success.border,
                    borderRadius: tokens.borderRadius.sharp
                  }"
                >
                  LONG
                </span>
              </div>
              <div 
                class="w-8 h-8 rounded flex items-center justify-center font-bold"
                :style="{ 
                  backgroundColor: `${tokens.colors.grade.A}15`,
                  color: tokens.colors.grade.A,
                  border: `1px solid ${tokens.colors.grade.A}40`,
                  borderRadius: tokens.borderRadius.sharp
                }"
              >
                A
              </div>
            </div>

            <!-- Body -->
            <div class="p-4">
              <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">Apple Inc.</p>
              <p class="text-xs mt-2" :style="{ color: tokens.colors.text.muted }">
                Strong buy signal based on technical analysis and fundamental metrics.
              </p>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t" :style="{ borderColor: tokens.colors.border.default }">
                <div>
                  <p class="text-[10px] uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Horizon</p>
                  <p class="text-sm font-bold mt-1" :style="{ color: tokens.colors.text.primary }">Medium</p>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Source</p>
                  <p class="text-sm font-bold mt-1" :style="{ color: tokens.colors.accent.primary.DEFAULT }">AI</p>
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">Plans</p>
                  <p class="text-sm font-bold mt-1" :style="{ color: tokens.colors.text.primary }">3</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div 
              class="px-4 py-3 border-t flex items-center justify-between"
              :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.default }"
            >
              <span class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">2024-12-18</span>
              <div class="flex gap-2">
                <button 
                  class="px-3 py-1.5 text-xs font-bold border transition-all"
                  :style="{ 
                    backgroundColor: 'transparent',
                    color: tokens.colors.text.secondary,
                    borderColor: tokens.colors.border.strong,
                    borderRadius: tokens.borderRadius.sharp
                  }"
                >
                  Details
                </button>
                <button 
                  class="px-3 py-1.5 text-xs font-bold transition-all"
                  :style="{ 
                    backgroundColor: tokens.colors.accent.primary.DEFAULT,
                    color: '#000',
                    borderRadius: tokens.borderRadius.sharp
                  }"
                >
                  View Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer 
      class="border-t py-8 mt-16"
      :style="{ borderColor: tokens.colors.border.default }"
    >
      <div class="max-w-7xl mx-auto px-6 text-center">
        <p class="text-sm" :style="{ color: tokens.colors.text.muted }">
          ScaleAlpha Design System · Built with Design Tokens
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import tokens from '../design/tokens.js'
import { useTheme } from '../composables/useTheme'
import ThemeToggle from '../components/ThemeToggle.vue'

// Theme
const { isDark, tokens: currentTokens } = useTheme()

// Sections for navigation
const sections = [
  { id: 'colors', label: 'Colors' },
  { id: 'themes', label: 'Themes' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'shadows', label: 'Shadows' },
  { id: 'components', label: 'Components' },
  { id: 'states', label: 'States' },
  { id: 'animations', label: 'Animations' },
  { id: 'standards', label: 'Standards' },
  { id: 'example', label: 'Example' },
]

const activeSection = ref('colors')

const radiusUsage = {
  sharp: '按钮、输入框、标签',
  rounded: '卡片、面板、模态框',
  full: '头像、圆点、徽章数字',
}

// Color mappings for theme comparison
const colorMappings = [
  { usage: '主要文字', dark: '#ffffff', light: '#0f172a', css: 'text-white → slate-900' },
  { usage: '次要文字', dark: '#d1d5db', light: '#334155', css: 'text-gray-300 → slate-700' },
  { usage: '辅助文字', dark: '#6b7280', light: '#64748b', css: 'text-gray-500 → slate-500' },
  { usage: '基础背景', dark: '#050505', light: '#f8fafc', css: 'bg-[#050505] → slate-50' },
  { usage: '表面背景', dark: '#0a0a0a', light: '#ffffff', css: 'bg-[#0a0a0a] → white' },
  { usage: '浮层背景', dark: '#1a1a1a', light: '#e2e8f0', css: 'bg-[#1a1a1a] → slate-200' },
  { usage: '默认边框', dark: '#222222', light: '#e2e8f0', css: 'border-[#222] → slate-200' },
  { usage: '强边框', dark: '#333333', light: '#cbd5e1', css: 'border-[#333] → slate-300' },
]

// Accent color comparison
const accentComparison = [
  { name: 'Primary', dark: '#06b6d4', darkCode: 'cyan-500', light: '#0891b2', lightCode: 'cyan-600' },
  { name: 'Success', dark: '#10b981', darkCode: 'emerald-500', light: '#059669', lightCode: 'emerald-600' },
  { name: 'Warning', dark: '#f59e0b', darkCode: 'amber-500', light: '#d97706', lightCode: 'amber-600' },
  { name: 'Danger', dark: '#f43f5e', darkCode: 'rose-500', light: '#e11d48', lightCode: 'rose-600' },
  { name: 'Info', dark: '#3b82f6', darkCode: 'blue-500', light: '#2563eb', lightCode: 'blue-600' },
]

// 已统一的页面列表
const unifiedPages = [
  { name: 'OpportunityPageB.vue', route: '/scalealpha/opportunity' },
  { name: 'InfoPageB.vue', route: '/scalealpha/info' },
  { name: 'RevenueBPage.vue', route: '/scalealpha/revenue' },
]

// 浮动 Tab 示例数据
const exampleTabs = ['机会挖掘', '信息中心', '收益明细']

// 已统一的视觉元素列表
const unifiedElements = [
  { element: '圆角 - 卡片/面板', spec: 'rounded-sm (2px)', pages: '全部页面' },
  { element: '圆角 - Tab/按钮', spec: 'rounded-full', pages: '全部页面' },
  { element: '浮动 Tab 导航', spec: '毛玻璃容器 + 白底激活态', pages: 'OpportunityPageB, InfoPageB' },
  { element: '主题切换支持', spec: 'useTheme() composable', pages: '全部页面' },
  { element: '页面背景 (深色)', spec: '#050505 (background.base)', pages: '全部页面' },
  { element: '页面背景 (浅色)', spec: '#f8fafc (slate-50)', pages: '全部页面' },
  { element: '卡片边框', spec: 'border.default + border.subtle', pages: '全部页面' },
  { element: '滚动条样式', spec: 'CSS Variables 主题适配', pages: 'RevenueBPage' },
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Update active section on scroll
const handleScroll = () => {
  const scrollPosition = window.scrollY + 100
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i].id)
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i].id
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Section Header Component
const SectionHeader = {
  props: ['title', 'subtitle', 'description'],
  template: `
    <div class="border-b pb-4" :style="{ borderColor: borderColor }">
      <div class="flex items-baseline gap-3">
        <h2 class="text-xl font-bold" :style="{ color: textPrimary }">{{ title }}</h2>
        <span class="text-sm font-mono" :style="{ color: textMuted }">{{ subtitle }}</span>
      </div>
      <p class="text-sm mt-2" :style="{ color: textTertiary }">{{ description }}</p>
    </div>
  `,
  computed: {
    borderColor() { return tokens.colors.border.default },
    textPrimary() { return tokens.colors.text.primary },
    textMuted() { return tokens.colors.text.muted },
    textTertiary() { return tokens.colors.text.tertiary }
  }
}

// Color Card Component
const ColorCard = {
  props: ['name', 'value', 'level', 'variant'],
  template: `
    <div class="rounded-lg overflow-hidden border" :style="{ borderColor: borderColor }">
      <div class="h-20" :style="colorPreviewStyle"></div>
      <div class="p-3" :style="{ backgroundColor: surfaceBg }">
        <p class="text-sm font-bold" :style="{ color: textPrimary }">{{ name }}</p>
        <p class="text-xs font-mono mt-1" :style="{ color: textMuted }">{{ value }}</p>
        <p v-if="level !== undefined" class="text-[10px] mt-1" :style="{ color: textDisabled }">Level {{ level }}</p>
      </div>
    </div>
  `,
  computed: {
    borderColor() { return tokens.colors.border.default },
    surfaceBg() { return tokens.colors.background.surface },
    textPrimary() { return tokens.colors.text.primary },
    textMuted() { return tokens.colors.text.muted },
    textDisabled() { return tokens.colors.text.disabled },
    colorPreviewStyle() {
      return {
        backgroundColor: this.variant === 'border' ? tokens.colors.background.surface : this.value,
        borderBottom: this.variant === 'border' ? `4px solid ${this.value}` : 'none'
      }
    }
  }
}

// Accent Color Card Component
const AccentColorCard = {
  props: ['name', 'colorSet'],
  template: `
    <div class="rounded-lg overflow-hidden border" :style="{ borderColor: borderColor }">
      <div class="h-16" :style="{ backgroundColor: colorSet.DEFAULT }"></div>
      <div class="flex h-4">
        <div class="flex-1" :style="{ backgroundColor: colorSet.light }"></div>
        <div class="flex-1" :style="{ backgroundColor: colorSet.DEFAULT }"></div>
        <div class="flex-1" :style="{ backgroundColor: colorSet.dark }"></div>
      </div>
      <div class="p-3" :style="{ backgroundColor: surfaceBg }">
        <p class="text-sm font-bold capitalize" :style="{ color: textPrimary }">{{ name }}</p>
        <p class="text-xs font-mono mt-1" :style="{ color: colorSet.DEFAULT }">{{ colorSet.DEFAULT }}</p>
      </div>
    </div>
  `,
  computed: {
    borderColor() { return tokens.colors.border.default },
    surfaceBg() { return tokens.colors.background.surface },
    textPrimary() { return tokens.colors.text.primary }
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out infinite alternate;
}

.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
