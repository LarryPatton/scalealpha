
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 class="text-lg font-bold text-gray-900">🎨 主题颜色并排对比</h1>
          <p class="text-xs text-gray-500">Side-by-Side Theme Preview｜悬停元素查看 HEX 值</p>
        </div>
        <div class="flex items-center gap-3">
          <select v-model="activeSection" class="text-xs border border-gray-300 rounded px-2 py-1.5 bg-white text-gray-700">
            <option value="navigation">🧭 Navigation</option>
            <option value="buttons">🔘 Buttons</option>
            <option value="cards">🃏 Cards</option>
            <option value="forms">📝 Forms</option>
            <option value="tags">🏷️ Tags</option>
            <option value="text">📄 Text</option>
          </select>
          <router-link to="/dev/theme-colors" class="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50">
            ← 返回颜色表
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex min-h-[calc(100vh-65px)]">
      
      <!-- LEFT: Dark Mode -->
      <div class="flex-1 p-6 overflow-y-auto" :style="{ backgroundColor: dark.colors.background.base }">
        <div class="max-w-lg mx-auto">
          <div class="flex items-center gap-2 mb-6 pb-4 border-b" :style="{ borderColor: dark.colors.border.default }">
            <span class="text-2xl">🌙</span>
            <div>
              <h2 class="text-sm font-bold" :style="{ color: dark.colors.text.primary }">Dark Mode</h2>
              <p class="text-[10px]" :style="{ color: dark.colors.text.muted }">夜间模式</p>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Navigation Section -->
            <div v-show="activeSection === 'navigation'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Navigation 导航</h3>
              
              <!-- Navbar -->
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Navbar 导航栏</p>
                <ColorTip :color="dark.colors.background.overlay" label="background.overlay" @copy="copy">
                  <div class="rounded-lg border p-4" :style="{ backgroundColor: 'rgba(26,26,26,0.9)', borderColor: dark.colors.border.default }">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">Ⓐ</div>
                        <span class="text-sm font-medium border-b-2 border-blue-500" :style="{ color: dark.colors.text.primary }">资讯</span>
                        <span class="text-sm" :style="{ color: dark.colors.text.tertiary }">机会</span>
                      </div>
                      <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">U</div>
                    </div>
                  </div>
                </ColorTip>
              </div>

              <!-- Tabs -->
              <div>
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Tabs 标签页</p>
                <ColorTip :color="dark.colors.background.elevated" label="background.elevated" @copy="copy">
                  <div class="inline-flex rounded-lg p-1" :style="{ backgroundColor: dark.colors.background.elevated }">
                    <button class="px-4 py-2 rounded-md text-sm font-medium" :style="{ backgroundColor: dark.colors.background.surface, color: dark.colors.text.primary }">推荐</button>
                    <button class="px-4 py-2 rounded-md text-sm" :style="{ color: dark.colors.text.muted }">关注</button>
                  </div>
                </ColorTip>
              </div>
            </div>

            <!-- Buttons Section -->
            <div v-show="activeSection === 'buttons'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Buttons 按钮</h3>
              
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Primary</p>
                <div class="flex flex-wrap gap-2">
                  <ColorTip :color="dark.colors.accent.primary" label="accent.primary" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: dark.colors.accent.primary, color: '#000' }">主要按钮</button>
                  </ColorTip>
                  <ColorTip :color="dark.colors.accent.success" label="accent.success" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: dark.colors.accent.success, color: '#fff' }">成功</button>
                  </ColorTip>
                  <ColorTip :color="dark.colors.accent.danger" label="accent.danger" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: dark.colors.accent.danger, color: '#fff' }">删除</button>
                  </ColorTip>
                </div>
              </div>

              <div>
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Secondary</p>
                <div class="flex flex-wrap gap-2">
                  <ColorTip :color="dark.colors.border.strong" label="border.strong" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg border" :style="{ borderColor: dark.colors.border.strong, color: dark.colors.text.secondary }">取消</button>
                  </ColorTip>
                  <ColorTip :color="dark.colors.accent.primaryBorder" label="accent.primaryBorder" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg border" :style="{ borderColor: dark.colors.accent.primaryBorder, color: dark.colors.accent.primary, backgroundColor: dark.colors.accent.primaryBg }">查看详情</button>
                  </ColorTip>
                </div>
              </div>
            </div>

            <!-- Cards Section -->
            <div v-show="activeSection === 'cards'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Cards 卡片</h3>
              
              <ColorTip :color="dark.colors.background.surface" label="background.surface" @copy="copy">
                <div class="rounded-xl border p-5" :style="{ backgroundColor: dark.colors.background.surface, borderColor: dark.colors.border.default }">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-1 rounded text-sm font-mono font-bold" :style="{ backgroundColor: dark.colors.accent.infoBg, color: dark.colors.accent.info }">NVDA</span>
                        <span class="px-2 py-0.5 rounded text-xs" :style="{ backgroundColor: dark.colors.accent.successBg, color: dark.colors.accent.success }">LONG</span>
                      </div>
                      <p class="text-sm" :style="{ color: dark.colors.text.muted }">NVIDIA Corporation</p>
                    </div>
                    <div class="px-3 py-1 rounded-lg" :style="{ backgroundColor: dark.colors.grade.A + '20', color: dark.colors.grade.A }">
                      <span class="text-lg font-bold">A+</span>
                    </div>
                  </div>
                  <div class="rounded-lg p-3 mb-4" :style="{ backgroundColor: dark.colors.accent.successBg, border: `1px solid ${dark.colors.accent.successBorder}` }">
                    <div class="flex justify-between">
                      <span class="text-sm" :style="{ color: dark.colors.text.secondary }">预期收益</span>
                      <span class="text-xl font-bold" :style="{ color: dark.colors.accent.success }">+24.5%</span>
                    </div>
                  </div>
                  <div class="flex justify-between pt-3" :style="{ borderTop: `1px solid ${dark.colors.border.subtle}` }">
                    <span class="text-xs" :style="{ color: dark.colors.text.disabled }">2024-01-15</span>
                    <span class="text-sm font-medium" :style="{ color: dark.colors.accent.info }">查看详情 →</span>
                  </div>
                </div>
              </ColorTip>
            </div>

            <!-- Forms Section -->
            <div v-show="activeSection === 'forms'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Forms 表单</h3>
              
              <div class="space-y-3">
                <ColorTip :color="dark.colors.background.elevated" label="background.elevated" @copy="copy">
                  <input type="text" placeholder="搜索股票代码..." class="w-full px-4 py-2.5 text-sm rounded-lg border outline-none" :style="{ backgroundColor: dark.colors.background.elevated, borderColor: dark.colors.border.default, color: dark.colors.text.primary }" />
                </ColorTip>
                <ColorTip :color="dark.colors.accent.primary" label="accent.primary (focus)" @copy="copy">
                  <input type="text" value="AAPL" class="w-full px-4 py-2.5 text-sm rounded-lg border outline-none" :style="{ backgroundColor: dark.colors.background.elevated, borderColor: dark.colors.accent.primary, color: dark.colors.text.primary, boxShadow: `0 0 0 3px ${dark.colors.accent.primaryBg}` }" />
                </ColorTip>
              </div>

              <div class="mt-4 space-y-2">
                <label class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded border-2 flex items-center justify-center" :style="{ backgroundColor: dark.colors.accent.primary, borderColor: dark.colors.accent.primary }">
                    <span class="text-black text-xs">✓</span>
                  </div>
                  <span class="text-sm" :style="{ color: dark.colors.text.primary }">已选中</span>
                </label>
                <label class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded border-2" :style="{ borderColor: dark.colors.border.strong }"></div>
                  <span class="text-sm" :style="{ color: dark.colors.text.secondary }">未选中</span>
                </label>
              </div>
            </div>

            <!-- Tags Section -->
            <div v-show="activeSection === 'tags'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Tags 标签</h3>
              
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Direction 方向</p>
                <div class="flex gap-2">
                  <ColorTip :color="dark.colors.accent.success" label="accent.success" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-xs font-medium" :style="{ backgroundColor: dark.colors.accent.successBg, color: dark.colors.accent.success, border: `1px solid ${dark.colors.accent.successBorder}` }">↑ LONG</span>
                  </ColorTip>
                  <ColorTip :color="dark.colors.accent.danger" label="accent.danger" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-xs font-medium" :style="{ backgroundColor: dark.colors.accent.dangerBg, color: dark.colors.accent.danger, border: `1px solid ${dark.colors.accent.dangerBorder}` }">↓ SHORT</span>
                  </ColorTip>
                </div>
              </div>

              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Status 状态</p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: dark.colors.accent.successBg, color: dark.colors.accent.success }">✓ 完成</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: dark.colors.accent.warningBg, color: dark.colors.accent.warning }">⏳ 进行中</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: dark.colors.accent.dangerBg, color: dark.colors.accent.danger }">✕ 取消</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: dark.colors.accent.infoBg, color: dark.colors.accent.info }">ℹ 信息</span>
                </div>
              </div>

              <div>
                <p class="text-[10px] mb-2" :style="{ color: dark.colors.text.muted }">Grade 评级</p>
                <div class="flex gap-2">
                  <ColorTip :color="dark.colors.grade.A" label="grade.A" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: dark.colors.grade.A + '20', color: dark.colors.grade.A }">A</span>
                  </ColorTip>
                  <ColorTip :color="dark.colors.grade.B" label="grade.B" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: dark.colors.grade.B + '20', color: dark.colors.grade.B }">B</span>
                  </ColorTip>
                  <ColorTip :color="dark.colors.grade.C" label="grade.C" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: dark.colors.grade.C + '20', color: dark.colors.grade.C }">C</span>
                  </ColorTip>
                </div>
              </div>
            </div>

            <!-- Text Section -->
            <div v-show="activeSection === 'text'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: dark.colors.text.primary, borderColor: dark.colors.border.subtle }">Text 文字层级</h3>
              
              <div class="space-y-3 p-4 rounded-lg" :style="{ backgroundColor: dark.colors.background.surface }">
                <ColorTip :color="dark.colors.text.primary" label="text.primary" @copy="copy">
                  <h1 class="text-xl font-bold" :style="{ color: dark.colors.text.primary }">Primary 主标题</h1>
                </ColorTip>
                <ColorTip :color="dark.colors.text.secondary" label="text.secondary" @copy="copy">
                  <p class="text-base" :style="{ color: dark.colors.text.secondary }">Secondary 正文</p>
                </ColorTip>
                <ColorTip :color="dark.colors.text.tertiary" label="text.tertiary" @copy="copy">
                  <p class="text-sm" :style="{ color: dark.colors.text.tertiary }">Tertiary 辅助</p>
                </ColorTip>
                <ColorTip :color="dark.colors.text.muted" label="text.muted" @copy="copy">
                  <p class="text-xs" :style="{ color: dark.colors.text.muted }">Muted 弱化</p>
                </ColorTip>
                <ColorTip :color="dark.colors.text.disabled" label="text.disabled" @copy="copy">
                  <p class="text-xs" :style="{ color: dark.colors.text.disabled }">Disabled 禁用</p>
                </ColorTip>
                <div class="pt-3 mt-3" :style="{ borderTop: `1px solid ${dark.colors.border.subtle}` }">
                  <ColorTip :color="dark.colors.accent.primary" label="accent.primary (link)" @copy="copy">
                    <a href="#" class="text-sm font-medium underline" :style="{ color: dark.colors.accent.primary }">链接文字</a>
                  </ColorTip>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- CENTER: Divider -->
      <div class="w-px bg-gray-300 relative flex-shrink-0">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow text-xs font-bold text-gray-400">VS</div>
      </div>

      <!-- RIGHT: Light Mode -->
      <div class="flex-1 p-6 overflow-y-auto" :style="{ backgroundColor: light.colors.background.base }">
        <div class="max-w-lg mx-auto">
          <div class="flex items-center gap-2 mb-6 pb-4 border-b" :style="{ borderColor: light.colors.border.default }">
            <span class="text-2xl">☀️</span>
            <div>
              <h2 class="text-sm font-bold" :style="{ color: light.colors.text.primary }">Light Mode</h2>
              <p class="text-[10px]" :style="{ color: light.colors.text.muted }">日间模式</p>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Navigation Section -->
            <div v-show="activeSection === 'navigation'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Navigation 导航</h3>
              
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Navbar 导航栏</p>
                <ColorTip :color="light.colors.background.surface" label="background.surface" @copy="copy">
                  <div class="rounded-lg border p-4 shadow-sm" :style="{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: light.colors.border.default }">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">Ⓐ</div>
                        <span class="text-sm font-medium border-b-2 border-blue-500" :style="{ color: light.colors.text.primary }">资讯</span>
                        <span class="text-sm" :style="{ color: light.colors.text.tertiary }">机会</span>
                      </div>
                      <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">U</div>
                    </div>
                  </div>
                </ColorTip>
              </div>

              <div>
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Tabs 标签页</p>
                <ColorTip :color="light.colors.background.elevated" label="background.elevated" @copy="copy">
                  <div class="inline-flex rounded-lg p-1" :style="{ backgroundColor: light.colors.background.elevated }">
                    <button class="px-4 py-2 rounded-md text-sm font-medium shadow-sm" :style="{ backgroundColor: light.colors.background.surface, color: light.colors.text.primary }">推荐</button>
                    <button class="px-4 py-2 rounded-md text-sm" :style="{ color: light.colors.text.muted }">关注</button>
                  </div>
                </ColorTip>
              </div>
            </div>

            <!-- Buttons Section -->
            <div v-show="activeSection === 'buttons'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Buttons 按钮</h3>
              
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Primary</p>
                <div class="flex flex-wrap gap-2">
                  <ColorTip :color="light.colors.accent.primary" label="accent.primary" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: light.colors.accent.primary, color: '#fff' }">主要按钮</button>
                  </ColorTip>
                  <ColorTip :color="light.colors.accent.success" label="accent.success" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: light.colors.accent.success, color: '#fff' }">成功</button>
                  </ColorTip>
                  <ColorTip :color="light.colors.accent.danger" label="accent.danger" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg" :style="{ backgroundColor: light.colors.accent.danger, color: '#fff' }">删除</button>
                  </ColorTip>
                </div>
              </div>

              <div>
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Secondary</p>
                <div class="flex flex-wrap gap-2">
                  <ColorTip :color="light.colors.border.strong" label="border.strong" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg border" :style="{ borderColor: light.colors.border.strong, color: light.colors.text.secondary }">取消</button>
                  </ColorTip>
                  <ColorTip :color="light.colors.accent.primaryBorder" label="accent.primaryBorder" @copy="copy">
                    <button class="px-4 py-2 text-sm font-medium rounded-lg border" :style="{ borderColor: light.colors.accent.primaryBorder, color: light.colors.accent.primary, backgroundColor: light.colors.accent.primaryBg }">查看详情</button>
                  </ColorTip>
                </div>
              </div>
            </div>

            <!-- Cards Section -->
            <div v-show="activeSection === 'cards'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Cards 卡片</h3>
              
              <ColorTip :color="light.colors.background.surface" label="background.surface" @copy="copy">
                <div class="rounded-xl border p-5 shadow-sm" :style="{ backgroundColor: light.colors.background.surface, borderColor: light.colors.border.default }">
                  <div class="flex items-start justify-between mb-4">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <span class="px-2 py-1 rounded text-sm font-mono font-bold" :style="{ backgroundColor: light.colors.accent.infoBg, color: light.colors.accent.info }">NVDA</span>
                        <span class="px-2 py-0.5 rounded text-xs" :style="{ backgroundColor: light.colors.accent.successBg, color: light.colors.accent.success }">LONG</span>
                      </div>
                      <p class="text-sm" :style="{ color: light.colors.text.muted }">NVIDIA Corporation</p>
                    </div>
                    <div class="px-3 py-1 rounded-lg" :style="{ backgroundColor: light.colors.grade.A + '20', color: light.colors.grade.A }">
                      <span class="text-lg font-bold">A+</span>
                    </div>
                  </div>
                  <div class="rounded-lg p-3 mb-4" :style="{ backgroundColor: light.colors.accent.successBg, border: `1px solid ${light.colors.accent.successBorder}` }">
                    <div class="flex justify-between">
                      <span class="text-sm" :style="{ color: light.colors.text.secondary }">预期收益</span>
                      <span class="text-xl font-bold" :style="{ color: light.colors.accent.success }">+24.5%</span>
                    </div>
                  </div>
                  <div class="flex justify-between pt-3" :style="{ borderTop: `1px solid ${light.colors.border.subtle}` }">
                    <span class="text-xs" :style="{ color: light.colors.text.disabled }">2024-01-15</span>
                    <span class="text-sm font-medium" :style="{ color: light.colors.accent.info }">查看详情 →</span>
                  </div>
                </div>
              </ColorTip>
            </div>

            <!-- Forms Section -->
            <div v-show="activeSection === 'forms'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Forms 表单</h3>
              
              <div class="space-y-3">
                <ColorTip :color="light.colors.background.elevated" label="background.elevated" @copy="copy">
                  <input type="text" placeholder="搜索股票代码..." class="w-full px-4 py-2.5 text-sm rounded-lg border outline-none" :style="{ backgroundColor: light.colors.background.elevated, borderColor: light.colors.border.default, color: light.colors.text.primary }" />
                </ColorTip>
                <ColorTip :color="light.colors.accent.primary" label="accent.primary (focus)" @copy="copy">
                  <input type="text" value="AAPL" class="w-full px-4 py-2.5 text-sm rounded-lg border outline-none" :style="{ backgroundColor: light.colors.background.elevated, borderColor: light.colors.accent.primary, color: light.colors.text.primary, boxShadow: `0 0 0 3px ${light.colors.accent.primaryBg}` }" />
                </ColorTip>
              </div>

              <div class="mt-4 space-y-2">
                <label class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded border-2 flex items-center justify-center" :style="{ backgroundColor: light.colors.accent.primary, borderColor: light.colors.accent.primary }">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <span class="text-sm" :style="{ color: light.colors.text.primary }">已选中</span>
                </label>
                <label class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded border-2" :style="{ borderColor: light.colors.border.strong }"></div>
                  <span class="text-sm" :style="{ color: light.colors.text.secondary }">未选中</span>
                </label>
              </div>
            </div>

            <!-- Tags Section -->
            <div v-show="activeSection === 'tags'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Tags 标签</h3>
              
              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Direction 方向</p>
                <div class="flex gap-2">
                  <ColorTip :color="light.colors.accent.success" label="accent.success" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-xs font-medium" :style="{ backgroundColor: light.colors.accent.successBg, color: light.colors.accent.success, border: `1px solid ${light.colors.accent.successBorder}` }">↑ LONG</span>
                  </ColorTip>
                  <ColorTip :color="light.colors.accent.danger" label="accent.danger" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-xs font-medium" :style="{ backgroundColor: light.colors.accent.dangerBg, color: light.colors.accent.danger, border: `1px solid ${light.colors.accent.dangerBorder}` }">↓ SHORT</span>
                  </ColorTip>
                </div>
              </div>

              <div class="mb-4">
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Status 状态</p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: light.colors.accent.successBg, color: light.colors.accent.success }">✓ 完成</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: light.colors.accent.warningBg, color: light.colors.accent.warning }">⏳ 进行中</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: light.colors.accent.dangerBg, color: light.colors.accent.danger }">✕ 取消</span>
                  <span class="px-2 py-1 rounded text-xs" :style="{ backgroundColor: light.colors.accent.infoBg, color: light.colors.accent.info }">ℹ 信息</span>
                </div>
              </div>

              <div>
                <p class="text-[10px] mb-2" :style="{ color: light.colors.text.muted }">Grade 评级</p>
                <div class="flex gap-2">
                  <ColorTip :color="light.colors.grade.A" label="grade.A" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: light.colors.grade.A + '20', color: light.colors.grade.A }">A</span>
                  </ColorTip>
                  <ColorTip :color="light.colors.grade.B" label="grade.B" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: light.colors.grade.B + '20', color: light.colors.grade.B }">B</span>
                  </ColorTip>
                  <ColorTip :color="light.colors.grade.C" label="grade.C" @copy="copy">
                    <span class="px-3 py-1 rounded-lg text-sm font-bold" :style="{ backgroundColor: light.colors.grade.C + '20', color: light.colors.grade.C }">C</span>
                  </ColorTip>
                </div>
              </div>
            </div>

            <!-- Text Section -->
            <div v-show="activeSection === 'text'">
              <h3 class="text-sm font-bold mb-4 pb-2 border-b" :style="{ color: light.colors.text.primary, borderColor: light.colors.border.subtle }">Text 文字层级</h3>
              
              <div class="space-y-3 p-4 rounded-lg" :style="{ backgroundColor: light.colors.background.surface }">
                <ColorTip :color="light.colors.text.primary" label="text.primary" @copy="copy">
                  <h1 class="text-xl font-bold" :style="{ color: light.colors.text.primary }">Primary 主标题</h1>
                </ColorTip>
                <ColorTip :color="light.colors.text.secondary" label="text.secondary" @copy="copy">
                  <p class="text-base" :style="{ color: light.colors.text.secondary }">Secondary 正文</p>
                </ColorTip>
                <ColorTip :color="light.colors.text.tertiary" label="text.tertiary" @copy="copy">
                  <p class="text-sm" :style="{ color: light.colors.text.tertiary }">Tertiary 辅助</p>
                </ColorTip>
                <ColorTip :color="light.colors.text.muted" label="text.muted" @copy="copy">
                  <p class="text-xs" :style="{ color: light.colors.text.muted }">Muted 弱化</p>
                </ColorTip>
                <ColorTip :color="light.colors.text.disabled" label="text.disabled" @copy="copy">
                  <p class="text-xs" :style="{ color: light.colors.text.disabled }">Disabled 禁用</p>
                </ColorTip>
                <div class="pt-3 mt-3" :style="{ borderTop: `1px solid ${light.colors.border.subtle}` }">
                  <ColorTip :color="light.colors.accent.primary" label="accent.primary (link)" @copy="copy">
                    <a href="#" class="text-sm font-medium underline" :style="{ color: light.colors.accent.primary }">链接文字</a>
                  </ColorTip>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>

    <!-- Toast -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="showToast" class="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium z-[9999] bg-gray-900 text-white shadow-lg">
          ✓ 已复制 {{ copiedValue }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, defineComponent, h } from 'vue'
import { darkTheme, lightTheme } from '../design/themes'

const dark = darkTheme
const light = lightTheme
const activeSection = ref('navigation')
const showToast = ref(false)
const copiedValue = ref('')

function copy(value) {
  navigator.clipboard.writeText(value)
  copiedValue.value = value
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}

// ColorTip 组件
const ColorTip = defineComponent({
  name: 'ColorTip',
  props: { color: String, label: String },
  emits: ['copy'],
  setup(props, { slots, emit }) {
    const hovered = ref(false)
    return () => h('div', {
      class: 'relative',
      onMouseenter: () => { hovered.value = true },
      onMouseleave: () => { hovered.value = false },
    }, [
      slots.default?.(),
      hovered.value ? h('div', {
        class: 'absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1.5 rounded shadow-lg text-[10px] font-mono whitespace-nowrap cursor-pointer',
        style: { backgroundColor: '#1f2937', color: '#fff', border: '1px solid #374151' },
        onClick: (e) => { e.stopPropagation(); emit('copy', props.color) }
      }, [
        h('div', { class: 'flex items-center gap-2' }, [
          h('div', { class: 'w-3 h-3 rounded-sm border border-white/30', style: { backgroundColor: props.color } }),
          h('span', { class: 'text-gray-400' }, props.label + ':'),
          h('span', { class: 'text-cyan-400 font-bold' }, props.color),
        ]),
        h('div', { class: 'text-[8px] text-gray-500 mt-0.5 text-center' }, '点击复制'),
        h('div', { class: 'absolute left-1/2 -translate-x-1/2 top-full w-0 h-0', style: { borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1f2937' } })
      ]) : null
    ])
  }
})
</script>

<style scoped>
input::placeholder { opacity: 0.5; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 10px); }
</style>
