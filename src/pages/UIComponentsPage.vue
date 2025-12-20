<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base, color: tokens.colors.text.primary }">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b backdrop-blur-xl" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface + 'F2' }">
      <div class="px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
              <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-bold tracking-tight leading-none">UI Components</h1>
              <p class="text-[10px] mt-0.5" :style="{ color: tokens.colors.text.muted }">Design System Library</p>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
            :style="{ color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D', backgroundColor: tokens.colors.accent.primary + '1A' }">
            v1.0
          </span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" :style="{ backgroundColor: tokens.colors.background.overlay }">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ componentCount }} Components</span>
          </div>
          <!-- Theme Toggle Button -->
          <button @click="toggleTheme" 
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:border-cyan-500/50"
            :style="{ borderColor: tokens.colors.border.strong, color: tokens.colors.text.secondary, backgroundColor: tokens.colors.background.overlay }">
            <svg v-if="isDark" class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
            {{ isDark ? 'Dark' : 'Light' }}
          </button>
        </div>
      </div>
    </header>

    <!-- Sidebar + Content -->
    <div class="flex">
      <!-- Sidebar Navigation -->
      <aside class="w-60 border-r sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto shrink-0" 
        :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
        <nav class="p-4 space-y-5">
          <div v-for="section in sections" :key="section.id">
            <h3 class="text-[10px] font-bold uppercase tracking-wider mb-2 px-3 flex items-center gap-2" :style="{ color: tokens.colors.text.muted }">
              <span class="w-1 h-1 rounded-full" :style="{ backgroundColor: tokens.colors.accent.primary }"></span>
              {{ section.title }}
            </h3>
            <ul class="space-y-0.5">
              <li v-for="item in section.items" :key="item.id">
                <a 
                  :href="'#' + item.id" 
                  class="block px-3 py-1.5 text-xs rounded transition-all"
                  :class="activeSection === item.id ? 'text-cyan-400 font-medium' : 'hover:bg-white/5'"
                  :style="activeSection === item.id 
                    ? { backgroundColor: tokens.colors.accent.primary + '1A', borderLeft: '2px solid ' + tokens.colors.accent.primary } 
                    : { color: tokens.colors.text.tertiary, borderLeft: '2px solid transparent' }"
                  @click="activeSection = item.id"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8 space-y-12 min-w-0">
        
        <!-- Section 1: Design Tokens -->
        <section id="tokens" class="scroll-mt-20">
          <SectionHeader title="Design Tokens" subtitle="Color system comparison - Dark vs Light theme" />
          
          <!-- Background Colors -->
          <div class="mt-6">
            <h4 class="text-sm font-bold mb-3">Background Colors</h4>
            <div class="grid grid-cols-4 gap-3">
              <DualColorSwatch v-for="(_, name) in darkTokens.background" :key="name" :name="name" :darkColor="darkTokens.background[name]" :lightColor="lightTokens.background[name]" />
            </div>
          </div>

          <!-- Text Colors -->
          <div class="mt-6">
            <h4 class="text-sm font-bold mb-3">Text Colors</h4>
            <div class="grid grid-cols-5 gap-3">
              <DualColorSwatch v-for="(_, name) in darkTokens.text" :key="name" :name="name" :darkColor="darkTokens.text[name]" :lightColor="lightTokens.text[name]" />
            </div>
          </div>

          <!-- Border Colors -->
          <div class="mt-6">
            <h4 class="text-sm font-bold mb-3">Border Colors</h4>
            <div class="grid grid-cols-4 gap-3">
              <DualColorSwatch v-for="(_, name) in darkTokens.border" :key="name" :name="name" :darkColor="darkTokens.border[name]" :lightColor="lightTokens.border[name]" />
            </div>
          </div>

          <!-- Accent & Semantic Colors -->
          <div class="mt-6">
            <h4 class="text-sm font-bold mb-3">Accent Colors</h4>
            <div class="grid grid-cols-3 gap-3">
              <DualColorSwatch v-for="(_, name) in darkTokens.accent" :key="name" :name="name" :darkColor="darkTokens.accent[name]" :lightColor="lightTokens.accent[name]" />
            </div>
          </div>

          <div class="mt-6">
            <h4 class="text-sm font-bold mb-3">Semantic Colors</h4>
            <div class="grid grid-cols-4 gap-3">
              <DualColorSwatch v-for="(_, name) in darkTokens.semantic" :key="name" :name="name" :darkColor="darkTokens.semantic[name]" :lightColor="lightTokens.semantic[name]" />
            </div>
          </div>
        </section>

        <!-- Section 2: Direction Badges -->
        <section id="direction-badge" class="scroll-mt-20">
          <SectionHeader title="Direction Badge" subtitle="LONG / SHORT status indicators" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: darkTokens.semantic.success, borderColor: darkTokens.semantic.success + '4D', backgroundColor: darkTokens.semantic.success + '1A' }">
                  LONG
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: darkTokens.semantic.error, borderColor: darkTokens.semantic.error + '4D', backgroundColor: darkTokens.semantic.error + '1A' }">
                  SHORT
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: darkTokens.text.muted, borderColor: darkTokens.border.strong, backgroundColor: darkTokens.background.elevated }">
                  N/A
                </span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: lightTokens.semantic.success, borderColor: lightTokens.semantic.success + '4D', backgroundColor: lightTokens.semantic.success + '1A' }">
                  LONG
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: lightTokens.semantic.error, borderColor: lightTokens.semantic.error + '4D', backgroundColor: lightTokens.semantic.error + '1A' }">
                  SHORT
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                  :style="{ color: lightTokens.text.muted, borderColor: lightTokens.border.strong, backgroundColor: lightTokens.background.elevated }">
                  N/A
                </span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 3: Grade Badges -->
        <section id="grade-badge" class="scroll-mt-20">
          <SectionHeader title="Grade Badge" subtitle="Strategy rating indicators (A+, A, B, C)" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: darkTokens.semantic.success, borderColor: darkTokens.semantic.success + '4D', backgroundColor: darkTokens.semantic.success + '1A' }">
                  A+
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: darkTokens.semantic.success, borderColor: darkTokens.semantic.success + '4D', backgroundColor: darkTokens.semantic.success + '1A' }">
                  A
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: darkTokens.accent.primary, borderColor: darkTokens.accent.primary + '4D', backgroundColor: darkTokens.accent.primary + '1A' }">
                  B
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: darkTokens.semantic.warning, borderColor: darkTokens.semantic.warning + '4D', backgroundColor: darkTokens.semantic.warning + '1A' }">
                  C
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: darkTokens.text.muted, borderColor: darkTokens.border.strong, backgroundColor: darkTokens.background.elevated }">
                  N/A
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: lightTokens.semantic.success, borderColor: lightTokens.semantic.success + '4D', backgroundColor: lightTokens.semantic.success + '1A' }">
                  A+
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: lightTokens.semantic.success, borderColor: lightTokens.semantic.success + '4D', backgroundColor: lightTokens.semantic.success + '1A' }">
                  A
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: lightTokens.accent.primary, borderColor: lightTokens.accent.primary + '4D', backgroundColor: lightTokens.accent.primary + '1A' }">
                  B
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: lightTokens.semantic.warning, borderColor: lightTokens.semantic.warning + '4D', backgroundColor: lightTokens.semantic.warning + '1A' }">
                  C
                </div>
                <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                  :style="{ color: lightTokens.text.muted, borderColor: lightTokens.border.strong, backgroundColor: lightTokens.background.elevated }">
                  N/A
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 4: Source Badges -->
        <section id="source-badge" class="scroll-mt-20">
          <SectionHeader title="Source Badge" subtitle="Strategy source indicators (AI, Manual, Import, Official)" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-cyan-400 border-cyan-500/30 bg-cyan-900/10">AI</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-orange-400 border-orange-500/30 bg-orange-900/10">Manual</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-violet-400 border-violet-500/30 bg-violet-900/10">Import</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-blue-400 border-blue-500/30 bg-blue-900/10">Official</span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-cyan-600 border-cyan-500/40 bg-cyan-100">AI</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-orange-600 border-orange-500/40 bg-orange-100">Manual</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-violet-600 border-violet-500/40 bg-violet-100">Import</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border text-blue-600 border-blue-500/40 bg-blue-100">Official</span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 5: Horizon Badges -->
        <section id="horizon-badge" class="scroll-mt-20">
          <SectionHeader title="Horizon Badge" subtitle="Investment time horizon indicators" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.accent.secondary, borderColor: darkTokens.accent.secondary + '4D', backgroundColor: darkTokens.accent.secondary + '1A' }">
                  Long
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.accent.primary, borderColor: darkTokens.accent.primary + '4D', backgroundColor: darkTokens.accent.primary + '1A' }">
                  Medium
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.semantic.warning, borderColor: darkTokens.semantic.warning + '4D', backgroundColor: darkTokens.semantic.warning + '1A' }">
                  Short
                </span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.accent.secondary, borderColor: lightTokens.accent.secondary + '4D', backgroundColor: lightTokens.accent.secondary + '1A' }">
                  Long
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.accent.primary, borderColor: lightTokens.accent.primary + '4D', backgroundColor: lightTokens.accent.primary + '1A' }">
                  Medium
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.semantic.warning, borderColor: lightTokens.semantic.warning + '4D', backgroundColor: lightTokens.semantic.warning + '1A' }">
                  Short
                </span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 6: Status Badges -->
        <section id="status-badge" class="scroll-mt-20">
          <SectionHeader title="Status Badge" subtitle="Processing and update status indicators" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="text-[10px] px-1.5 py-0.5 rounded border"
                  :style="{ backgroundColor: darkTokens.accent.primary + '33', color: darkTokens.accent.primary, borderColor: darkTokens.accent.primary + '4D' }">
                  PROCESSING
                </span>
                <button class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
                  :style="{ backgroundColor: darkTokens.semantic.warning + '4D', borderColor: darkTokens.semantic.warning + '99', color: darkTokens.semantic.warning }">
                  Update
                </button>
                <span class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
                  :style="{ backgroundColor: darkTokens.semantic.success + '4D', borderColor: darkTokens.semantic.success + '99', color: darkTokens.semantic.success }">
                  Updated
                </span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="text-[10px] px-1.5 py-0.5 rounded border"
                  :style="{ backgroundColor: lightTokens.accent.primary + '33', color: lightTokens.accent.primary, borderColor: lightTokens.accent.primary + '4D' }">
                  PROCESSING
                </span>
                <button class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
                  :style="{ backgroundColor: lightTokens.semantic.warning + '4D', borderColor: lightTokens.semantic.warning + '99', color: lightTokens.semantic.warning }">
                  Update
                </button>
                <span class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
                  :style="{ backgroundColor: lightTokens.semantic.success + '4D', borderColor: lightTokens.semantic.success + '99', color: lightTokens.semantic.success }">
                  Updated
                </span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 7: Plan Status Badges -->
        <section id="plan-badge" class="scroll-mt-20">
          <SectionHeader title="Plan Status Badge" subtitle="Execution plan status indicators" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.semantic.success, borderColor: darkTokens.semantic.success + '4D', backgroundColor: darkTokens.semantic.success + '1A' }">
                  With Plan
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.accent.secondary, borderColor: darkTokens.accent.secondary + '4D', backgroundColor: darkTokens.accent.secondary + '1A' }">
                  Only Plan
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: darkTokens.text.muted, borderColor: darkTokens.border.strong, backgroundColor: darkTokens.background.elevated }">
                  No Plan
                </span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.semantic.success, borderColor: lightTokens.semantic.success + '4D', backgroundColor: lightTokens.semantic.success + '1A' }">
                  With Plan
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.accent.secondary, borderColor: lightTokens.accent.secondary + '4D', backgroundColor: lightTokens.accent.secondary + '1A' }">
                  Only Plan
                </span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border"
                  :style="{ color: lightTokens.text.muted, borderColor: lightTokens.border.strong, backgroundColor: lightTokens.background.elevated }">
                  No Plan
                </span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 8: Unread Count Badge -->
        <section id="unread-badge" class="scroll-mt-20">
          <SectionHeader title="Unread Count Badge" subtitle="Notification count indicators" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: darkTokens.accent.primary, color: darkTokens.background.base }">
                  3
                </span>
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: darkTokens.semantic.error, color: '#fff' }">
                  12
                </span>
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: darkTokens.semantic.warning, color: darkTokens.background.base }">
                  99+
                </span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: lightTokens.accent.primary, color: '#fff' }">
                  3
                </span>
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: lightTokens.semantic.error, color: '#fff' }">
                  12
                </span>
                <span class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
                  :style="{ backgroundColor: lightTokens.semantic.warning, color: lightTokens.background.base }">
                  99+
                </span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 9: Primary Buttons -->
        <section id="primary-button" class="scroll-mt-20">
          <SectionHeader title="Primary Action Button" subtitle="Main call-to-action buttons" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 flex-wrap pt-4">
                <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white glow-primary-lg">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Initialize
                </button>
                <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 cursor-not-allowed" 
                  :style="{ backgroundColor: darkTokens.background.elevated, color: darkTokens.text.disabled }">
                  Disabled
                </button>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 flex-wrap pt-4">
                <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white glow-primary-lg">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Initialize
                </button>
                <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 cursor-not-allowed" 
                  :style="{ backgroundColor: lightTokens.background.elevated, color: lightTokens.text.disabled }">
                  Disabled
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 10: Icon Action Buttons -->
        <section id="icon-button" class="scroll-mt-20">
          <SectionHeader title="Icon Action Button" subtitle="Table row action buttons" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-3 pt-4">
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: darkTokens.semantic.success + '33', borderColor: darkTokens.semantic.success + '66', color: darkTokens.semantic.success }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: darkTokens.accent.primary + '33', borderColor: darkTokens.accent.primary + '66', color: darkTokens.accent.primary }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: darkTokens.semantic.error + '33', borderColor: darkTokens.semantic.error + '66', color: darkTokens.semantic.error }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: darkTokens.semantic.warning + '33', borderColor: darkTokens.semantic.warning + '66', color: darkTokens.semantic.warning }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-3 pt-4">
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: lightTokens.semantic.success + '1A', borderColor: lightTokens.semantic.success + '4D', color: lightTokens.semantic.success }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: lightTokens.accent.primary + '1A', borderColor: lightTokens.accent.primary + '4D', color: lightTokens.accent.primary }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: lightTokens.semantic.error + '1A', borderColor: lightTokens.semantic.error + '4D', color: lightTokens.semantic.error }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
                <button class="p-1.5 border rounded transition-colors"
                  :style="{ backgroundColor: lightTokens.semantic.warning + '1A', borderColor: lightTokens.semantic.warning + '4D', color: lightTokens.semantic.warning }">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 11: Tab Buttons -->
        <section id="tab-button" class="scroll-mt-20">
          <SectionHeader title="Tab Button" subtitle="Segmented control style tabs" />
          <ComponentShowcase>
            <div class="flex gap-1 p-1 rounded" :style="{ backgroundColor: tokens.colors.background.elevated }">
              <button class="flex-1 py-1.5 px-4 text-xs font-medium rounded-sm transition-all uppercase tracking-wider text-cyan-400 shadow-sm"
                :style="{ backgroundColor: tokens.colors.background.overlay }">
                Active
              </button>
              <button class="flex-1 py-1.5 px-4 text-xs font-medium rounded-sm transition-all uppercase tracking-wider"
                :style="{ color: tokens.colors.text.muted }">
                Inactive
              </button>
              <button class="flex-1 py-1.5 px-4 text-xs font-medium rounded-sm transition-all uppercase tracking-wider"
                :style="{ color: tokens.colors.text.muted }">
                Another
              </button>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 12: Toggle Switch -->
        <section id="toggle-switch" class="scroll-mt-20">
          <SectionHeader title="Toggle Switch" subtitle="On/off toggle controls" />
          <ComponentShowcase>
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <button @click="toggleA = !toggleA" class="relative w-7 h-4 rounded-full transition-colors duration-200"
                  :class="toggleA ? 'bg-cyan-600' : ''"
                  :style="!toggleA ? { backgroundColor: tokens.colors.border.strong } : {}">
                  <span class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200"
                    :class="toggleA ? 'translate-x-3' : 'translate-x-0'" />
                </button>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">{{ toggleA ? 'On' : 'Off' }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button @click="toggleB = !toggleB" class="relative w-7 h-4 rounded-full transition-colors duration-200"
                  :class="toggleB ? 'bg-cyan-600' : ''"
                  :style="!toggleB ? { backgroundColor: tokens.colors.border.strong } : {}">
                  <span class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200"
                    :class="toggleB ? 'translate-x-3' : 'translate-x-0'" />
                </button>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">{{ toggleB ? 'On' : 'Off' }}</span>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 13: Search Input -->
        <section id="search-input" class="scroll-mt-20">
          <SectionHeader title="Search Input" subtitle="Search box with icon" />
          <ComponentShowcase>
            <div class="relative">
              <input type="text" placeholder="Search strategies..." 
                class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none w-48 font-mono"
                :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
              <div class="absolute right-2 top-1.5" :style="{ color: tokens.colors.text.muted }">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 14: Text Input -->
        <section id="text-input" class="scroll-mt-20">
          <SectionHeader title="Text Input" subtitle="Standard text input with focus ring" />
          <ComponentShowcase>
            <div class="space-y-3 w-80">
              <input type="text" placeholder="Enter symbol..." 
                class="w-full border text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
              <input type="text" value="AAPL" 
                class="w-full border text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
                :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 15: Select Dropdown -->
        <section id="select-input" class="scroll-mt-20">
          <SectionHeader title="Select Dropdown" subtitle="Native select element styled" />
          <ComponentShowcase>
            <div class="flex items-center gap-4">
              <select class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none font-mono"
                :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
                <option value="all">All Directions</option>
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
              <select class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none font-mono"
                :style="{ backgroundColor: tokens.colors.background.elevated, borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }">
                <option value="all">All Sources</option>
                <option value="ai">AI</option>
                <option value="manual">Manual</option>
                <option value="import">Import</option>
              </select>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 16: Checkbox -->
        <section id="checkbox" class="scroll-mt-20">
          <SectionHeader title="Checkbox" subtitle="Custom styled checkboxes" />
          <ComponentShowcase>
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <div @click="checkA = !checkA" 
                  class="w-5 h-5 border rounded-[2px] flex items-center justify-center cursor-pointer transition-colors"
                  :style="checkA ? { backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary } : { borderColor: tokens.colors.border.strong }">
                  <svg v-if="checkA" class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">Checked</span>
              </div>
              <div class="flex items-center gap-2">
                <div @click="checkB = !checkB"
                  class="w-5 h-5 border rounded-[2px] flex items-center justify-center cursor-pointer transition-colors"
                  :style="checkB ? { backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary } : { borderColor: tokens.colors.border.strong }">
                  <svg v-if="checkB" class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">Unchecked</span>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 17: Radio Button -->
        <section id="radio" class="scroll-mt-20">
          <SectionHeader title="Radio Button" subtitle="Custom styled radio buttons" />
          <ComponentShowcase>
            <div class="flex items-center gap-6">
              <div v-for="opt in ['Option A', 'Option B', 'Option C']" :key="opt" class="flex items-center gap-2">
                <div @click="radioValue = opt"
                  class="w-5 h-5 border-2 rounded-full flex items-center justify-center cursor-pointer transition-colors"
                  :style="radioValue === opt ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary } : { borderColor: tokens.colors.border.strong }">
                  <div v-if="radioValue === opt" class="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">{{ opt }}</span>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 18: Progress Bar -->
        <section id="progress-bar" class="scroll-mt-20">
          <SectionHeader title="Progress Bar" subtitle="Linear progress indicators" />
          <ComponentShowcase>
            <div class="space-y-4 w-80">
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span :style="{ color: tokens.colors.text.secondary }">Standard</span>
                  <span :style="{ color: tokens.colors.text.muted }">45%</span>
                </div>
                <div class="h-1 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full w-[45%] transition-all duration-300" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span :style="{ color: tokens.colors.text.secondary }">Gradient</span>
                  <span :style="{ color: tokens.colors.text.muted }">72%</span>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full w-[72%] bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs mb-1">
                  <span :style="{ color: tokens.colors.text.secondary }">Success</span>
                  <span :style="{ color: tokens.colors.text.muted }">100%</span>
                </div>
                <div class="h-1 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full w-full transition-all duration-300" :style="{ backgroundColor: tokens.colors.semantic.success }"></div>
                </div>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 19: Toast Notification -->
        <section id="toast" class="scroll-mt-20">
          <SectionHeader title="Toast Notification" subtitle="Feedback messages" />
          <ComponentShowcase>
            <div class="space-y-3">
              <div v-for="t in toastTypes" :key="t.type"
                class="min-w-[300px] max-w-md border rounded shadow-2xl p-4 flex items-start gap-3 border-l-4"
                :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }"
                :class="t.borderClass">
                <div class="shrink-0 mt-0.5" :style="{ color: t.iconColor }">
                  <component :is="t.icon" class="w-5 h-5" />
                </div>
                <p class="text-sm font-medium flex-1" :style="{ color: tokens.colors.text.secondary }">{{ t.message }}</p>
                <button :style="{ color: tokens.colors.text.muted }" class="text-lg leading-none hover:opacity-70">×</button>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 20: Task Card -->
        <section id="task-card" class="scroll-mt-20">
          <SectionHeader title="Task Card" subtitle="Processing and pending task cards" />
          <ComponentShowcase>
            <div class="flex items-stretch gap-4 flex-wrap">
              <!-- Processing -->
              <div class="min-w-[280px] max-w-[280px] border rounded-sm p-3 relative overflow-hidden cursor-pointer transition-all shrink-0 border-cyan-500 glow-primary-md ring-2 ring-cyan-500/30"
                :style="{ backgroundColor: tokens.colors.background.base }">
                <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">NVDA</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded border"
                      :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D' }">
                      PROCESSING
                    </span>
                  </div>
                  <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">~30s</div>
                </div>
                <div class="h-1 rounded-full overflow-hidden mb-2" :style="{ backgroundColor: tokens.colors.border.default }">
                  <div class="h-full w-[65%] transition-all duration-300" :style="{ backgroundColor: tokens.colors.accent.primary }"></div>
                </div>
                <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">Analyzing market data...</div>
              </div>

              <!-- Pending -->
              <div class="min-w-[200px] max-w-[200px] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all shrink-0 opacity-70 hover:opacity-100"
                :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-bold" :style="{ color: tokens.colors.text.tertiary }">AAPL</span>
                  <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">PENDING</span>
                </div>
                <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">Est: 2m</div>
              </div>

              <!-- Completed -->
              <div class="min-w-[200px] max-w-[200px] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all shrink-0"
                :style="{ backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.semantic.success + '4D' }">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">TSLA</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded"
                    :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">
                    DONE
                  </span>
                </div>
                <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">10:23 AM</div>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 21: Selection Card -->
        <section id="selection-card" class="scroll-mt-20">
          <SectionHeader title="Selection Card" subtitle="Configuration selection cards" />
          <ComponentShowcase>
            <div class="grid grid-cols-4 gap-3 w-full max-w-lg">
              <button v-for="(item, idx) in selectionItems" :key="item.id"
                @click="selectedCard = item.id"
                class="p-2 border rounded-sm transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
                :class="selectedCard === item.id 
                  ? 'border-cyan-500 bg-cyan-900/20 glow-primary-lg ring-1 ring-cyan-500/50' 
                  : 'hover:border-gray-600'"
                :style="selectedCard !== item.id ? { backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default } : {}">
                <div class="flex justify-between items-start">
                  <component :is="item.icon" class="w-4 h-4 transition-colors" :class="selectedCard === item.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'" />
                  <div class="w-3 h-3 border rounded-[1px] flex items-center justify-center"
                    :class="selectedCard === item.id ? 'bg-cyan-500 border-cyan-500' : ''"
                    :style="selectedCard !== item.id ? { borderColor: tokens.colors.border.strong } : {}">
                    <svg v-if="selectedCard === item.id" class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <div class="text-xs font-bold text-white mb-0.5">{{ item.title }}</div>
                  <div class="text-[9px] text-gray-500 leading-tight line-clamp-1">{{ item.desc }}</div>
                </div>
              </button>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 22: Collection Sidebar Item -->
        <section id="sidebar-item" class="scroll-mt-20">
          <SectionHeader title="Collection Sidebar Item" subtitle="Navigation sidebar items" />
          <ComponentShowcase>
            <div class="w-56 border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
              <button v-for="col in collections" :key="col.id"
                @click="selectedCollection = col.id"
                class="w-full flex items-center justify-between px-3 py-2 border-l-2 transition-all group"
                :class="selectedCollection === col.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'"
                :style="selectedCollection === col.id ? { backgroundColor: tokens.colors.background.base } : {}">
                <div class="flex items-center gap-2">
                  <component :is="col.icon" class="w-3.5 h-3.5" :class="selectedCollection === col.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'" />
                  <span class="text-xs font-medium">{{ col.label }}</span>
                </div>
                <span class="text-[10px] font-mono" :class="selectedCollection === col.id ? 'text-cyan-500' : 'text-gray-600'">{{ col.count }}</span>
              </button>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 23: Floating Tab Bar -->
        <section id="floating-tabs" class="scroll-mt-20">
          <SectionHeader title="Floating Tab Bar" subtitle="Bottom navigation tabs" />
          <ComponentShowcase>
            <div class="relative h-24">
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1"
                  :style="{ backgroundColor: tokens.colors.background.elevated + 'E6', borderColor: tokens.colors.border.strong }">
                  <button v-for="tab in floatingTabs" :key="tab.id"
                    @click="activeFloatingTab = tab.id"
                    class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
                    :class="activeFloatingTab === tab.id ? 'shadow-lg scale-105' : ''"
                    :style="activeFloatingTab === tab.id 
                      ? { backgroundColor: '#ffffff', color: '#000000' } 
                      : { color: tokens.colors.text.muted }">
                    {{ tab.label }}
                  </button>
                </div>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 24: Table Header -->
        <section id="table-header" class="scroll-mt-20">
          <SectionHeader title="Table Header" subtitle="Sortable table column headers" />
          <ComponentShowcase>
            <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
              <table class="w-full">
                <thead>
                  <tr>
                    <th v-for="col in tableColumns" :key="col.field"
                      @click="sortBy(col.field)"
                      class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none text-left"
                      :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
                      <div class="flex items-center gap-1">
                        {{ col.label }}
                        <span v-if="sortField === col.field" :style="{ color: tokens.colors.accent.primary }">
                          {{ sortDirection === 'asc' ? '▲' : '▼' }}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in tableRows" :key="row.symbol" class="border-b" :style="{ borderColor: tokens.colors.border.subtle }">
                    <td class="px-3 py-2 text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ row.symbol }}</td>
                    <td class="px-3 py-2 text-xs" :style="{ color: tokens.colors.text.secondary }">{{ row.name }}</td>
                    <td class="px-3 py-2">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
                        :style="row.direction === 'LONG' 
                          ? { color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D', backgroundColor: tokens.colors.semantic.success + '1A' }
                          : { color: tokens.colors.semantic.error, borderColor: tokens.colors.semantic.error + '4D', backgroundColor: tokens.colors.semantic.error + '1A' }">
                        {{ row.direction }}
                      </span>
                    </td>
                    <td class="px-3 py-2">
                      <div class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border"
                        :style="{ color: tokens.colors.semantic.success, borderColor: tokens.colors.semantic.success + '4D', backgroundColor: tokens.colors.semantic.success + '1A' }">
                        {{ row.grade }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 25: Modal -->
        <section id="modal" class="scroll-mt-20">
          <SectionHeader title="Modal" subtitle="Dialog overlay component" />
          <ComponentShowcase>
            <button @click="showModal = true"
              class="px-4 py-2 text-sm font-bold rounded-sm border transition-all"
              :style="{ borderColor: tokens.colors.accent.primary, color: tokens.colors.accent.primary }">
              Open Modal
            </button>
          </ComponentShowcase>
        </section>

        <!-- Section 26: MiniMap Dot -->
        <section id="minimap" class="scroll-mt-20">
          <SectionHeader title="MiniMap Dot" subtitle="Process navigation indicator" />
          <ComponentShowcase>
            <div class="flex items-center gap-8">
              <div class="relative">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/40 backdrop-blur-xl border border-cyan-500/30 glow-primary-lg flex items-center justify-center">
                  <svg class="w-10 h-10 absolute" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" :stroke="tokens.colors.border.strong" stroke-width="2"/>
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#progressGradient)" stroke-width="2" stroke-dasharray="40 100" stroke-linecap="round" transform="rotate(-90 18 18)"/>
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#06b6d4"/>
                        <stop offset="100%" stop-color="#10b981"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <svg class="w-5 h-5 text-cyan-400 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center"
                  :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.accent.primary }">
                  <span class="text-[10px] font-bold text-cyan-400">2</span>
                </div>
              </div>

              <div class="text-xs" :style="{ color: tokens.colors.text.muted }">
                Step 2 of 5 • 40% Complete
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- ===================== GENERATION PAGE COMPONENTS ===================== -->
        
        <!-- Section 27: Stock Selection Item -->
        <section id="stock-item" class="scroll-mt-20">
          <SectionHeader title="Stock Selection Item" subtitle="Stock list item with checkbox from Generation page" />
          <DualShowcase>
            <template #dark>
              <div class="space-y-2 pt-4 w-72">
                <!-- Selected Stock -->
                <div class="p-3 border rounded-sm cursor-pointer transition-all"
                  :style="{ backgroundColor: darkTokens.accent.primary + '1A', borderColor: darkTokens.accent.primary }">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 border rounded-sm flex items-center justify-center"
                        :style="{ backgroundColor: darkTokens.accent.primary + '33', borderColor: darkTokens.accent.primary }">
                        <div class="w-2 h-2 rounded-[1px]" :style="{ backgroundColor: darkTokens.accent.primary }"></div>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono font-bold" :style="{ color: darkTokens.text.primary }">NVDA</span>
                          <span class="text-xs px-1.5 py-0.5 rounded border" :style="{ color: darkTokens.text.muted, backgroundColor: darkTokens.background.overlay, borderColor: darkTokens.border.strong }">US</span>
                        </div>
                        <div class="text-xs mt-0.5" :style="{ color: darkTokens.text.muted }">NVIDIA Corporation</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-mono text-sm" :style="{ color: darkTokens.text.primary }">$142.50</div>
                      <div class="font-mono text-xs" :style="{ color: darkTokens.semantic.success }">+2.35%</div>
                    </div>
                  </div>
                </div>
                <!-- Unselected Stock -->
                <div class="p-3 border rounded-sm cursor-pointer transition-all hover:border-gray-600"
                  :style="{ backgroundColor: darkTokens.background.base, borderColor: darkTokens.border.default }">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 border rounded-sm flex items-center justify-center"
                        :style="{ borderColor: darkTokens.border.strong }">
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono font-bold" :style="{ color: darkTokens.text.primary }">AAPL</span>
                          <span class="text-xs px-1.5 py-0.5 rounded border" :style="{ color: darkTokens.text.muted, backgroundColor: darkTokens.background.overlay, borderColor: darkTokens.border.strong }">US</span>
                        </div>
                        <div class="text-xs mt-0.5" :style="{ color: darkTokens.text.muted }">Apple Inc</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-mono text-sm" :style="{ color: darkTokens.text.primary }">$178.20</div>
                      <div class="font-mono text-xs" :style="{ color: darkTokens.semantic.error }">-0.85%</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="space-y-2 pt-4 w-72">
                <!-- Selected Stock -->
                <div class="p-3 border rounded-sm cursor-pointer transition-all"
                  :style="{ backgroundColor: lightTokens.accent.primary + '1A', borderColor: lightTokens.accent.primary }">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 border rounded-sm flex items-center justify-center"
                        :style="{ backgroundColor: lightTokens.accent.primary + '33', borderColor: lightTokens.accent.primary }">
                        <div class="w-2 h-2 rounded-[1px]" :style="{ backgroundColor: lightTokens.accent.primary }"></div>
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono font-bold" :style="{ color: lightTokens.text.primary }">NVDA</span>
                          <span class="text-xs px-1.5 py-0.5 rounded border" :style="{ color: lightTokens.text.muted, backgroundColor: lightTokens.background.overlay, borderColor: lightTokens.border.strong }">US</span>
                        </div>
                        <div class="text-xs mt-0.5" :style="{ color: lightTokens.text.muted }">NVIDIA Corporation</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-mono text-sm" :style="{ color: lightTokens.text.primary }">$142.50</div>
                      <div class="font-mono text-xs" :style="{ color: lightTokens.semantic.success }">+2.35%</div>
                    </div>
                  </div>
                </div>
                <!-- Unselected Stock -->
                <div class="p-3 border rounded-sm cursor-pointer transition-all hover:border-gray-400"
                  :style="{ backgroundColor: lightTokens.background.base, borderColor: lightTokens.border.default }">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 border rounded-sm flex items-center justify-center"
                        :style="{ borderColor: lightTokens.border.strong }">
                      </div>
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-mono font-bold" :style="{ color: lightTokens.text.primary }">AAPL</span>
                          <span class="text-xs px-1.5 py-0.5 rounded border" :style="{ color: lightTokens.text.muted, backgroundColor: lightTokens.background.overlay, borderColor: lightTokens.border.strong }">US</span>
                        </div>
                        <div class="text-xs mt-0.5" :style="{ color: lightTokens.text.muted }">Apple Inc</div>
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-mono text-sm" :style="{ color: lightTokens.text.primary }">$178.20</div>
                      <div class="font-mono text-xs" :style="{ color: lightTokens.semantic.error }">-0.85%</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 28: Stock Tag Chip -->
        <section id="stock-tag" class="scroll-mt-20">
          <SectionHeader title="Stock Tag Chip" subtitle="Selected stock tags with remove button" />
          <DualShowcase>
            <template #dark>
              <div class="flex flex-wrap gap-2 pt-4">
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: darkTokens.background.overlay, borderColor: darkTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: darkTokens.accent.primary }">NVDA</span>
                  <button class="transition-colors hover:text-white" :style="{ color: darkTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: darkTokens.background.overlay, borderColor: darkTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: darkTokens.accent.primary }">AAPL</span>
                  <button class="transition-colors hover:text-white" :style="{ color: darkTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: darkTokens.background.overlay, borderColor: darkTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: darkTokens.accent.primary }">TSLA</span>
                  <button class="transition-colors hover:text-white" :style="{ color: darkTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex flex-wrap gap-2 pt-4">
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: lightTokens.background.overlay, borderColor: lightTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: lightTokens.accent.primary }">NVDA</span>
                  <button class="transition-colors" :style="{ color: lightTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: lightTokens.background.overlay, borderColor: lightTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: lightTokens.accent.primary }">AAPL</span>
                  <button class="transition-colors" :style="{ color: lightTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div class="border rounded-sm px-2 py-1 flex items-center gap-2 group transition-colors" 
                  :style="{ backgroundColor: lightTokens.background.overlay, borderColor: lightTokens.border.strong }">
                  <span class="text-xs font-mono" :style="{ color: lightTokens.accent.primary }">TSLA</span>
                  <button class="transition-colors" :style="{ color: lightTokens.text.muted }">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 29: Strategy Config Card (Multi-Color) -->
        <section id="config-card" class="scroll-mt-20">
          <SectionHeader title="Strategy Config Card" subtitle="Multi-color configuration cards with different accent colors" />
          <ComponentShowcase>
            <div class="space-y-4">
              <!-- Cyan Accent (Framework) -->
              <div>
                <h4 class="text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                  <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span> Analysis Framework
                </h4>
                <div class="grid grid-cols-4 gap-2">
                  <button v-for="(item, idx) in frameworkItems" :key="item.id"
                    @click="selectedFramework = item.id"
                    class="p-2 border rounded-sm transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
                    :class="selectedFramework === item.id ? 'border-cyan-500 bg-cyan-900/20 glow-primary-lg ring-1 ring-cyan-500/50' : 'hover:border-gray-600'"
                    :style="selectedFramework !== item.id ? { backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default } : {}">
                    <div class="flex justify-between items-start">
                      <component :is="item.icon" class="w-4 h-4 transition-colors" :class="selectedFramework === item.id ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'" />
                      <div class="w-3 h-3 border rounded-[1px] flex items-center justify-center"
                        :class="selectedFramework === item.id ? 'bg-cyan-500 border-cyan-500' : ''"
                        :style="selectedFramework !== item.id ? { borderColor: tokens.colors.border.strong } : {}">
                        <svg v-if="selectedFramework === item.id" class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    </div>
                    <div>
                      <div class="text-xs font-bold text-white mb-0.5">{{ item.title }}</div>
                      <div class="text-[9px] text-gray-500 leading-tight line-clamp-1">{{ item.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <!-- Blue Accent (Period) -->
              <div>
                <h4 class="text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> Investment Period
                </h4>
                <div class="grid grid-cols-5 gap-2">
                  <button v-for="(item, idx) in periodItems" :key="item.id"
                    @click="selectedPeriod = item.id"
                    class="p-2 border rounded-sm transition-all text-left relative group min-h-[50px] flex flex-col justify-between"
                    :class="selectedPeriod === item.id ? 'border-blue-500 bg-blue-900/20 glow-info-lg ring-1 ring-blue-500/50' : 'hover:border-gray-600'"
                    :style="selectedPeriod !== item.id ? { backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default } : {}">
                    <component :is="item.icon" class="w-4 h-4 transition-colors" :class="selectedPeriod === item.id ? 'text-blue-400' : 'text-gray-600 group-hover:text-blue-400'" />
                    <div>
                      <div class="text-xs font-bold text-white">{{ item.title }}</div>
                      <div class="text-[9px]" :class="selectedPeriod === item.id ? 'text-blue-200/70' : 'text-gray-500'">{{ item.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <!-- Orange Accent (Risk) -->
              <div>
                <h4 class="text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> Risk Appetite
                </h4>
                <div class="grid grid-cols-5 gap-2">
                  <button v-for="(item, idx) in riskItems" :key="item.id"
                    @click="selectedRisk = item.id"
                    class="p-2 border rounded-sm transition-all text-left relative group min-h-[50px] flex flex-col justify-between"
                    :class="selectedRisk === item.id ? 'border-orange-500 bg-orange-900/20 glow-orange-lg ring-1 ring-orange-500/50' : 'hover:border-gray-600'"
                    :style="selectedRisk !== item.id ? { backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default } : {}">
                    <component :is="item.icon" class="w-4 h-4 transition-colors" :class="selectedRisk === item.id ? 'text-orange-400' : 'text-gray-600 group-hover:text-orange-400'" />
                    <div>
                      <div class="text-xs font-bold text-white">{{ item.title }}</div>
                      <div class="text-[9px]" :class="selectedRisk === item.id ? 'text-orange-200/70' : 'text-gray-500'">{{ item.desc }}</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        <!-- Section 30: Info Hint Box -->
        <section id="info-hint" class="scroll-mt-20">
          <SectionHeader title="Info Hint Box" subtitle="Contextual information hints and recommendations" />
          <DualShowcase>
            <template #dark>
              <div class="space-y-3 pt-4">
                <!-- Info Hint -->
                <div class="bg-cyan-900/10 border border-cyan-500/20 rounded-sm p-3 flex items-start gap-3">
                  <div class="mt-0.5 text-cyan-400 shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p class="text-xs text-cyan-200/80 leading-relaxed">
                    <span class="font-bold text-cyan-400">使用推荐卡片</span> = 如果你回答之前的问题，那么推荐来自你的回答；如果你没回答，则交给模型随机判断。
                  </p>
                </div>
                <!-- Warning Hint -->
                <div class="bg-orange-900/10 border border-orange-500/20 rounded-sm p-3 flex items-start gap-3">
                  <div class="mt-0.5 text-orange-400 shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <p class="text-xs text-orange-200/80 leading-relaxed">
                    <span class="font-bold text-orange-400">注意：</span> 高风险策略可能导致较大波动，请根据您的风险承受能力选择。
                  </p>
                </div>
              </div>
            </template>
            <template #light>
              <div class="space-y-3 pt-4">
                <!-- Info Hint -->
                <div class="bg-cyan-50 border border-cyan-200 rounded-sm p-3 flex items-start gap-3">
                  <div class="mt-0.5 text-cyan-600 shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <p class="text-xs text-cyan-800 leading-relaxed">
                    <span class="font-bold text-cyan-700">使用推荐卡片</span> = 如果你回答之前的问题，那么推荐来自你的回答；如果你没回答，则交给模型随机判断。
                  </p>
                </div>
                <!-- Warning Hint -->
                <div class="bg-orange-50 border border-orange-200 rounded-sm p-3 flex items-start gap-3">
                  <div class="mt-0.5 text-orange-600 shrink-0">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <p class="text-xs text-orange-800 leading-relaxed">
                    <span class="font-bold text-orange-700">注意：</span> 高风险策略可能导致较大波动，请根据您的风险承受能力选择。
                  </p>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 31: Smart Filter Item -->
        <section id="smart-filter" class="scroll-mt-20">
          <SectionHeader title="Smart Filter Item" subtitle="Sidebar smart filter items with toggle and badge" />
          <DualShowcase>
            <template #dark>
              <div class="w-56 pt-4">
                <div class="px-3 py-2">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: darkTokens.text.muted }">Smart Filters</h3>
                    <button class="relative w-7 h-4 rounded-full bg-cyan-600">
                      <span class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full translate-x-3"></span>
                    </button>
                  </div>
                  <div class="space-y-0.5">
                    <!-- Active Filter -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center text-white"
                      :style="{ backgroundColor: darkTokens.background.overlay }">
                      <span class="flex items-center gap-1.5">High Grade (A/B)</span>
                      <span class="text-[10px] font-mono text-cyan-500">12</span>
                    </button>
                    <!-- Inactive Filter with New Badge -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center text-gray-400 hover:text-gray-200">
                      <span class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                        Recommended Update
                      </span>
                      <span class="text-[10px] font-mono text-gray-600">5</span>
                    </button>
                    <!-- Normal Inactive Filter -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center text-gray-400 hover:text-gray-200">
                      <span class="flex items-center gap-1.5">No Signal Logs</span>
                      <span class="text-[10px] font-mono text-gray-600">3</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="w-56 pt-4">
                <div class="px-3 py-2">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-[10px] font-bold uppercase tracking-wider" :style="{ color: lightTokens.text.muted }">Smart Filters</h3>
                    <button class="relative w-7 h-4 rounded-full bg-cyan-600">
                      <span class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full translate-x-3"></span>
                    </button>
                  </div>
                  <div class="space-y-0.5">
                    <!-- Active Filter -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center"
                      :style="{ backgroundColor: lightTokens.accent.primary + '1A', color: lightTokens.accent.primary }">
                      <span class="flex items-center gap-1.5">High Grade (A/B)</span>
                      <span class="text-[10px] font-mono" :style="{ color: lightTokens.accent.primary }">12</span>
                    </button>
                    <!-- Inactive Filter with New Badge -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center"
                      :style="{ color: lightTokens.text.secondary }">
                      <span class="flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                        Recommended Update
                      </span>
                      <span class="text-[10px] font-mono" :style="{ color: lightTokens.text.muted }">5</span>
                    </button>
                    <!-- Normal Inactive Filter -->
                    <button class="w-full text-left px-3 py-1.5 rounded text-xs font-medium transition-colors flex justify-between items-center"
                      :style="{ color: lightTokens.text.secondary }">
                      <span class="flex items-center gap-1.5">No Signal Logs</span>
                      <span class="text-[10px] font-mono" :style="{ color: lightTokens.text.muted }">3</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 32: Action Footer Bar -->
        <section id="action-footer" class="scroll-mt-20">
          <SectionHeader title="Action Footer Bar" subtitle="Bottom action bar with cost info and CTA button" />
          <DualShowcase>
            <template #dark>
              <div class="pt-4">
                <div class="p-4 border-t flex justify-between items-center" :style="{ borderColor: darkTokens.border.default, backgroundColor: darkTokens.background.surface }">
                  <div class="text-xs font-mono" :style="{ color: darkTokens.text.muted }">
                    <div>EST. TIME: <span :style="{ color: darkTokens.text.primary }">~3 MINS</span></div>
                    <div>COST: <span :style="{ color: darkTokens.text.primary }">20 CREDITS</span></div>
                  </div>
                  <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white glow-primary-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Initialize Generation
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div class="pt-4">
                <div class="p-4 border-t flex justify-between items-center" :style="{ borderColor: lightTokens.border.default, backgroundColor: lightTokens.background.surface }">
                  <div class="text-xs font-mono" :style="{ color: lightTokens.text.muted }">
                    <div>EST. TIME: <span :style="{ color: lightTokens.text.primary }">~3 MINS</span></div>
                    <div>COST: <span :style="{ color: lightTokens.text.primary }">20 CREDITS</span></div>
                  </div>
                  <button class="px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded-sm transition-all flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white glow-primary-md">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Initialize Generation
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 33: Expand/Collapse Button -->
        <section id="expand-button" class="scroll-mt-20">
          <SectionHeader title="Expand/Collapse Button" subtitle="Toggle button for expandable sections" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <!-- Expanded State -->
                <button class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all text-cyan-400 border-cyan-500/50 bg-cyan-900/20">
                  <svg class="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  Collapse
                </button>
                <!-- Collapsed State -->
                <button class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all text-gray-400 hover:border-gray-500 hover:text-gray-200"
                  :style="{ borderColor: darkTokens.border.strong }">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  Expand
                </button>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <!-- Expanded State -->
                <button class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all text-cyan-600 border-cyan-500/50 bg-cyan-100">
                  <svg class="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  Collapse
                </button>
                <!-- Collapsed State -->
                <button class="flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded border transition-all hover:border-gray-400"
                  :style="{ borderColor: lightTokens.border.strong, color: lightTokens.text.secondary }">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  Expand
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Section 34: +N More Card -->
        <section id="more-card" class="scroll-mt-20">
          <SectionHeader title="+N More Card" subtitle="Indicator showing hidden items count" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4 pt-4">
                <div class="min-w-[100px] max-w-[100px] border border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-all"
                  :style="{ background: `linear-gradient(to bottom right, ${darkTokens.background.overlay}, ${darkTokens.background.base})`, borderColor: darkTokens.accent.primary + '4D' }">
                  <span class="text-xl font-bold" :style="{ color: darkTokens.accent.primary }">+5</span>
                  <span class="text-[10px] mt-1" :style="{ color: darkTokens.text.tertiary }">more</span>
                </div>
                <div class="min-w-[100px] max-w-[100px] border border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-all"
                  :style="{ background: `linear-gradient(to bottom right, ${darkTokens.background.overlay}, ${darkTokens.background.base})`, borderColor: darkTokens.accent.primary + '4D' }">
                  <span class="text-xl font-bold" :style="{ color: darkTokens.accent.primary }">+12</span>
                  <span class="text-[10px] mt-1" :style="{ color: darkTokens.text.tertiary }">more</span>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4 pt-4">
                <div class="min-w-[100px] max-w-[100px] border border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-all"
                  :style="{ background: `linear-gradient(to bottom right, ${lightTokens.background.overlay}, ${lightTokens.background.base})`, borderColor: lightTokens.accent.primary + '4D' }">
                  <span class="text-xl font-bold" :style="{ color: lightTokens.accent.primary }">+5</span>
                  <span class="text-[10px] mt-1" :style="{ color: lightTokens.text.tertiary }">more</span>
                </div>
                <div class="min-w-[100px] max-w-[100px] border border-dashed rounded p-3 flex flex-col items-center justify-center cursor-pointer transition-all"
                  :style="{ background: `linear-gradient(to bottom right, ${lightTokens.background.overlay}, ${lightTokens.background.base})`, borderColor: lightTokens.accent.primary + '4D' }">
                  <span class="text-xl font-bold" :style="{ color: lightTokens.accent.primary }">+12</span>
                  <span class="text-[10px] mt-1" :style="{ color: lightTokens.text.tertiary }">more</span>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- ============================================= -->
        <!-- INFO PAGE COMPONENTS -->
        <!-- ============================================= -->

        <!-- Hero Section -->
        <section id="hero-section">
          <SectionHeader title="Hero Section" subtitle="主页头部区域，包含标题和描述" />
          <DualShowcase>
            <template #dark>
              <div class="text-center py-6" :style="{ backgroundColor: darkTokens.background.base }">
                <h1 class="text-2xl font-bold mb-2 tracking-tight" :style="{ color: darkTokens.text.primary }">
                  Discover Your Next <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">Winning Trade</span>
                </h1>
                <p class="text-sm" :style="{ color: darkTokens.text.tertiary }">
                  AI-powered insights to help you find opportunities.
                </p>
              </div>
            </template>
            <template #light>
              <div class="text-center py-6" :style="{ backgroundColor: lightTokens.background.base }">
                <h1 class="text-2xl font-bold mb-2 tracking-tight" :style="{ color: lightTokens.text.primary }">
                  Discover Your Next <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-700">Winning Trade</span>
                </h1>
                <p class="text-sm" :style="{ color: lightTokens.text.tertiary }">
                  AI-powered insights to help you find opportunities.
                </p>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Content Switcher -->
        <section id="content-switcher">
          <SectionHeader title="Content Switcher" subtitle="内容切换按钮组" />
          <DualShowcase>
            <template #dark>
              <div class="border p-1 inline-flex items-center" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.default }">
                <button class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                  :style="{ backgroundColor: darkTokens.border.strong, color: darkTokens.text.primary }">
                  Recommended
                </button>
                <button class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                  :style="{ color: darkTokens.text.muted }">
                  Following
                </button>
              </div>
            </template>
            <template #light>
              <div class="border p-1 inline-flex items-center" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.default }">
                <button class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                  :style="{ backgroundColor: lightTokens.background.elevated, color: lightTokens.text.primary }">
                  Recommended
                </button>
                <button class="px-3 py-1.5 rounded text-xs font-bold transition-all"
                  :style="{ color: lightTokens.text.muted }">
                  Following
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Filter Bar -->
        <section id="filter-bar">
          <SectionHeader title="Filter Bar" subtitle="筛选栏组件，包含筛选按钮和视图切换" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-3">
                <!-- Filter Button -->
                <button class="h-8 w-8 border rounded flex items-center justify-center transition-colors"
                  :style="{ backgroundColor: darkTokens.background.base, borderColor: darkTokens.border.subtle, color: darkTokens.text.muted }">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                </button>
                <!-- View Switcher -->
                <div class="border rounded p-0.5 flex items-center" :style="{ backgroundColor: darkTokens.background.base, borderColor: darkTokens.border.subtle }">
                  <button class="p-1.5 rounded transition-all" :style="{ backgroundColor: darkTokens.border.default, color: darkTokens.text.primary }">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </button>
                  <button class="p-1.5 rounded transition-all" :style="{ color: darkTokens.text.disabled }">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-3">
                <button class="h-8 w-8 border rounded flex items-center justify-center transition-colors"
                  :style="{ backgroundColor: lightTokens.background.base, borderColor: lightTokens.border.subtle, color: lightTokens.text.muted }">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                </button>
                <div class="border rounded p-0.5 flex items-center" :style="{ backgroundColor: lightTokens.background.base, borderColor: lightTokens.border.subtle }">
                  <button class="p-1.5 rounded transition-all" :style="{ backgroundColor: lightTokens.border.default, color: lightTokens.text.primary }">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </button>
                  <button class="p-1.5 rounded transition-all" :style="{ color: lightTokens.text.disabled }">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Opportunity Card -->
        <section id="opportunity-card">
          <SectionHeader title="Opportunity Card" subtitle="机会卡片组件" />
          <DualShowcase>
            <template #dark>
              <div class="p-5 text-center border transition-all relative overflow-hidden w-64"
                :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div class="flex justify-center mb-3">
                  <span class="text-[9px] font-bold text-cyan-500 border border-cyan-500/30 px-1.5 py-0.5 rounded uppercase tracking-wider">Momentum</span>
                </div>
                <h3 class="text-2xl font-bold mb-1" :style="{ color: darkTokens.text.primary }">NVDA</h3>
                <p class="text-[10px] mb-4 font-mono" :style="{ color: darkTokens.text.muted }">NVIDIA Corp</p>
                <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: darkTokens.border.subtle }">
                  <div class="text-center border-r" :style="{ borderColor: darkTokens.border.subtle }">
                    <div class="text-xl font-bold" :style="{ color: darkTokens.text.primary }">A+</div>
                    <div class="text-[9px] uppercase" :style="{ color: darkTokens.text.disabled }">评级</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-bold" :style="{ color: darkTokens.accent.success }">做多</div>
                    <div class="text-[9px] uppercase" :style="{ color: darkTokens.text.disabled }">方向</div>
                  </div>
                </div>
                <div class="flex justify-between text-[9px] font-mono uppercase" :style="{ color: darkTokens.text.disabled }">
                  <span>1-10 天</span>
                  <span>GEMINI</span>
                  <span :style="{ color: darkTokens.accent.warning }">中风险</span>
                </div>
              </div>
            </template>
            <template #light>
              <div class="p-5 text-center border transition-all relative overflow-hidden w-64"
                :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                <div class="flex justify-center mb-3">
                  <span class="text-[9px] font-bold text-cyan-600 border border-cyan-600/30 px-1.5 py-0.5 rounded uppercase tracking-wider">Momentum</span>
                </div>
                <h3 class="text-2xl font-bold mb-1" :style="{ color: lightTokens.text.primary }">NVDA</h3>
                <p class="text-[10px] mb-4 font-mono" :style="{ color: lightTokens.text.muted }">NVIDIA Corp</p>
                <div class="grid grid-cols-2 gap-3 mb-4 border-y py-3" :style="{ borderColor: lightTokens.border.subtle }">
                  <div class="text-center border-r" :style="{ borderColor: lightTokens.border.subtle }">
                    <div class="text-xl font-bold" :style="{ color: lightTokens.text.primary }">A+</div>
                    <div class="text-[9px] uppercase" :style="{ color: lightTokens.text.disabled }">评级</div>
                  </div>
                  <div class="text-center">
                    <div class="text-xl font-bold" :style="{ color: lightTokens.accent.success }">做多</div>
                    <div class="text-[9px] uppercase" :style="{ color: lightTokens.text.disabled }">方向</div>
                  </div>
                </div>
                <div class="flex justify-between text-[9px] font-mono uppercase" :style="{ color: lightTokens.text.disabled }">
                  <span>1-10 天</span>
                  <span>GEMINI</span>
                  <span :style="{ color: lightTokens.accent.warning }">中风险</span>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Opportunity List Item -->
        <section id="opportunity-list">
          <SectionHeader title="Opportunity List Item" subtitle="机会列表项组件" />
          <DualShowcase>
            <template #dark>
              <div class="border p-4 flex items-center gap-4" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                <div class="w-0.5 h-8" :style="{ backgroundColor: darkTokens.accent.success }"></div>
                <div class="w-16 flex-shrink-0">
                  <div class="font-bold text-sm" :style="{ color: darkTokens.text.primary }">NVDA</div>
                  <div class="text-[10px]" :style="{ color: darkTokens.text.muted }">US Stock</div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm" :style="{ color: darkTokens.text.secondary }">NVIDIA Corporation</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] px-1.5 rounded" :style="{ backgroundColor: darkTokens.border.strong, color: darkTokens.text.tertiary }">Momentum</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-[10px] uppercase" :style="{ color: darkTokens.text.muted }">Rating</div>
                  <div class="font-bold" :style="{ color: darkTokens.text.secondary }">A+</div>
                </div>
                <div class="w-7 h-7 rounded-full flex items-center justify-center" :style="{ backgroundColor: darkTokens.background.elevated, color: darkTokens.text.disabled }">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </template>
            <template #light>
              <div class="border p-4 flex items-center gap-4" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                <div class="w-0.5 h-8" :style="{ backgroundColor: lightTokens.accent.success }"></div>
                <div class="w-16 flex-shrink-0">
                  <div class="font-bold text-sm" :style="{ color: lightTokens.text.primary }">NVDA</div>
                  <div class="text-[10px]" :style="{ color: lightTokens.text.muted }">US Stock</div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-sm" :style="{ color: lightTokens.text.secondary }">NVIDIA Corporation</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] px-1.5 rounded" :style="{ backgroundColor: lightTokens.border.strong, color: lightTokens.text.tertiary }">Momentum</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-[10px] uppercase" :style="{ color: lightTokens.text.muted }">Rating</div>
                  <div class="font-bold" :style="{ color: lightTokens.text.secondary }">A+</div>
                </div>
                <div class="w-7 h-7 rounded-full flex items-center justify-center" :style="{ backgroundColor: lightTokens.background.elevated, color: lightTokens.text.disabled }">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Theme Event Card -->
        <section id="theme-event-card">
          <SectionHeader title="Theme Event Card" subtitle="主题事件卡片" />
          <DualShowcase>
            <template #dark>
              <div class="border p-5 flex items-center gap-5" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <h3 class="text-lg font-bold truncate" :style="{ color: darkTokens.text.primary }">AI Chip Demand Surge</h3>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-mono" :style="{ backgroundColor: darkTokens.background.elevated, color: darkTokens.text.muted }">12/18</span>
                  </div>
                  <p class="text-xs line-clamp-1" :style="{ color: darkTokens.text.muted }">Hyperscaler capex continues to grow...</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-2 px-2.5 py-1.5 rounded border" :style="{ backgroundColor: darkTokens.background.base, borderColor: darkTokens.border.subtle }">
                    <div class="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold border" :style="{ backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.muted }">NV</div>
                    <div>
                      <div class="font-bold text-[11px]" :style="{ color: darkTokens.text.secondary }">NVDA</div>
                      <div class="text-[10px]" :style="{ color: darkTokens.accent.success }">+3.45%</div>
                    </div>
                  </div>
                </div>
                <div class="text-right min-w-[80px] pl-4 border-l" :style="{ borderColor: darkTokens.border.subtle }">
                  <div class="text-xl font-bold font-mono" :style="{ color: darkTokens.accent.success }">+5.2%</div>
                  <div class="text-[9px] uppercase" :style="{ color: darkTokens.text.disabled }">涨跌幅</div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="border p-5 flex items-center gap-5" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 mb-1.5">
                    <h3 class="text-lg font-bold truncate" :style="{ color: lightTokens.text.primary }">AI Chip Demand Surge</h3>
                    <span class="text-[10px] px-1.5 py-0.5 rounded font-mono" :style="{ backgroundColor: lightTokens.background.elevated, color: lightTokens.text.muted }">12/18</span>
                  </div>
                  <p class="text-xs line-clamp-1" :style="{ color: lightTokens.text.muted }">Hyperscaler capex continues to grow...</p>
                </div>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-2 px-2.5 py-1.5 rounded border" :style="{ backgroundColor: lightTokens.background.base, borderColor: lightTokens.border.subtle }">
                    <div class="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold border" :style="{ backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.muted }">NV</div>
                    <div>
                      <div class="font-bold text-[11px]" :style="{ color: lightTokens.text.secondary }">NVDA</div>
                      <div class="text-[10px]" :style="{ color: lightTokens.accent.success }">+3.45%</div>
                    </div>
                  </div>
                </div>
                <div class="text-right min-w-[80px] pl-4 border-l" :style="{ borderColor: lightTokens.border.subtle }">
                  <div class="text-xl font-bold font-mono" :style="{ color: lightTokens.accent.success }">+5.2%</div>
                  <div class="text-[9px] uppercase" :style="{ color: lightTokens.text.disabled }">涨跌幅</div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Attribution Card -->
        <section id="attribution-card">
          <SectionHeader title="Attribution Timeline Card" subtitle="归因时间线卡片" />
          <DualShowcase>
            <template #dark>
              <div class="flex gap-4 items-stretch">
                <div class="w-16 text-right pt-4 shrink-0">
                  <div class="text-base font-bold font-mono" :style="{ color: darkTokens.text.primary }">09:30</div>
                  <div class="text-xs font-mono uppercase" :style="{ color: darkTokens.text.disabled }">AM</div>
                </div>
                <div class="w-px relative" :style="{ backgroundColor: darkTokens.border.subtle }">
                  <div class="absolute top-5 -left-1 w-2 h-2 rounded-full" :style="{ backgroundColor: darkTokens.background.base, border: '1px solid ' + darkTokens.border.strong }"></div>
                </div>
                <div class="flex-1 border p-4" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                  <h3 class="text-base font-bold mb-1" :style="{ color: darkTokens.text.primary }">AI Infrastructure Theme</h3>
                  <p class="text-xs" :style="{ color: darkTokens.text.muted }">Hyperscalers increasing capex...</p>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex gap-4 items-stretch">
                <div class="w-16 text-right pt-4 shrink-0">
                  <div class="text-base font-bold font-mono" :style="{ color: lightTokens.text.primary }">09:30</div>
                  <div class="text-xs font-mono uppercase" :style="{ color: lightTokens.text.disabled }">AM</div>
                </div>
                <div class="w-px relative" :style="{ backgroundColor: lightTokens.border.subtle }">
                  <div class="absolute top-5 -left-1 w-2 h-2 rounded-full" :style="{ backgroundColor: lightTokens.background.base, border: '1px solid ' + lightTokens.border.strong }"></div>
                </div>
                <div class="flex-1 border p-4" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                  <h3 class="text-base font-bold mb-1" :style="{ color: lightTokens.text.primary }">AI Infrastructure Theme</h3>
                  <p class="text-xs" :style="{ color: lightTokens.text.muted }">Hyperscalers increasing capex...</p>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Grid Control -->
        <section id="grid-control">
          <SectionHeader title="Grid Control" subtitle="网格布局控制器" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-4">
                <!-- Expanded State -->
                <div class="rounded-full h-12 px-1 flex items-center shadow-xl" style="background-color: #ffffff; color: #000000;">
                  <button class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold pb-1">−</button>
                  <div class="w-10 h-10 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </div>
                  <button class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold pb-1">+</button>
                </div>
                <!-- Collapsed State -->
                <button class="w-12 h-12 rounded-full flex items-center justify-center shadow-xl" style="background-color: #ffffff; color: #000000;">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                </button>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-4">
                <div class="rounded-full h-12 px-1 flex items-center shadow-xl" :style="{ backgroundColor: lightTokens.background.overlay, color: lightTokens.text.primary }">
                  <button class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold pb-1">−</button>
                  <div class="w-10 h-10 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </div>
                  <button class="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold pb-1">+</button>
                </div>
                <button class="w-12 h-12 rounded-full flex items-center justify-center shadow-xl" :style="{ backgroundColor: lightTokens.background.overlay, color: lightTokens.text.primary }">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Attribution Event Card (Full) -->
        <section id="attribution-event-card-full">
          <SectionHeader title="Attribution Event Card (Full)" subtitle="归因事件完整卡片（带图片和股票列表）" />
          <DualShowcase>
            <template #dark>
              <div class="flex gap-5 items-stretch w-full max-w-4xl">
                <!-- Time Column -->
                <div class="w-20 text-right pt-5 shrink-0">
                  <div class="text-lg font-bold font-mono tracking-tight" :style="{ color: darkTokens.text.primary }">09:30</div>
                  <div class="text-xs font-mono uppercase" :style="{ color: darkTokens.text.disabled }">AM</div>
                </div>
                <!-- Decoration Line -->
                <div class="w-px relative" :style="{ backgroundColor: darkTokens.border.subtle }">
                  <div class="absolute top-6 -left-1 w-2 h-2 rounded-full" :style="{ backgroundColor: darkTokens.background.base, border: '1px solid ' + darkTokens.border.strong }"></div>
                </div>
                <!-- Card -->
                <div class="flex-1 border relative overflow-hidden" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                  <div class="flex h-full">
                    <!-- Image (Left) -->
                    <div class="w-40 relative overflow-hidden border-r shrink-0" :style="{ borderColor: darkTokens.border.subtle, backgroundColor: darkTokens.background.elevated }">
                      <div class="absolute bottom-0 left-0 right-0 p-3" :style="{ background: `linear-gradient(to top, ${darkTokens.background.surface}, transparent)` }">
                        <div class="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider">主题</div>
                      </div>
                    </div>
                    <!-- Content (Middle) -->
                    <div class="flex-1 p-4 flex flex-col justify-center">
                      <h3 class="text-base font-bold leading-tight mb-1" :style="{ color: darkTokens.text.primary }">AI Infrastructure Demand</h3>
                      <p class="text-xs leading-relaxed line-clamp-2" :style="{ color: darkTokens.text.muted }">Hyperscalers continue to increase capex for AI infrastructure...</p>
                    </div>
                    <!-- Stocks List (Right) -->
                    <div class="w-48 border-l flex flex-col shrink-0" :style="{ backgroundColor: darkTokens.background.base, borderColor: darkTokens.border.subtle }">
                      <div class="px-2 py-1.5 border-b flex items-center justify-between" :style="{ borderColor: darkTokens.border.subtle }">
                        <span class="text-[9px] font-bold uppercase tracking-wider" :style="{ color: darkTokens.text.disabled }">相关标的</span>
                        <span class="text-[9px]" :style="{ color: darkTokens.text.disabled }">3 只</span>
                      </div>
                      <div class="flex-1 p-1.5 space-y-1">
                        <div class="border rounded px-2 py-1.5 flex items-center gap-2" :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold border" :style="{ backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.muted }">NV</div>
                          <div class="flex-1 min-w-0">
                            <div class="text-[10px] font-bold" :style="{ color: darkTokens.text.secondary }">NVDA</div>
                          </div>
                          <span class="text-[8px] font-bold px-1 py-0.5 rounded" :style="{ backgroundColor: darkTokens.accent.successBg, color: darkTokens.accent.success }">利好</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex gap-5 items-stretch w-full max-w-4xl">
                <div class="w-20 text-right pt-5 shrink-0">
                  <div class="text-lg font-bold font-mono tracking-tight" :style="{ color: lightTokens.text.primary }">09:30</div>
                  <div class="text-xs font-mono uppercase" :style="{ color: lightTokens.text.disabled }">AM</div>
                </div>
                <div class="w-px relative" :style="{ backgroundColor: lightTokens.border.subtle }">
                  <div class="absolute top-6 -left-1 w-2 h-2 rounded-full" :style="{ backgroundColor: lightTokens.background.base, border: '1px solid ' + lightTokens.border.strong }"></div>
                </div>
                <div class="flex-1 border relative overflow-hidden" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                  <div class="flex h-full">
                    <div class="w-40 relative overflow-hidden border-r shrink-0" :style="{ borderColor: lightTokens.border.subtle, backgroundColor: lightTokens.background.elevated }">
                      <div class="absolute bottom-0 left-0 right-0 p-3" :style="{ background: `linear-gradient(to top, ${lightTokens.background.surface}, transparent)` }">
                        <div class="text-[10px] text-cyan-600 font-bold uppercase tracking-wider">主题</div>
                      </div>
                    </div>
                    <div class="flex-1 p-4 flex flex-col justify-center">
                      <h3 class="text-base font-bold leading-tight mb-1" :style="{ color: lightTokens.text.primary }">AI Infrastructure Demand</h3>
                      <p class="text-xs leading-relaxed line-clamp-2" :style="{ color: lightTokens.text.muted }">Hyperscalers continue to increase capex for AI infrastructure...</p>
                    </div>
                    <div class="w-48 border-l flex flex-col shrink-0" :style="{ backgroundColor: lightTokens.background.base, borderColor: lightTokens.border.subtle }">
                      <div class="px-2 py-1.5 border-b flex items-center justify-between" :style="{ borderColor: lightTokens.border.subtle }">
                        <span class="text-[9px] font-bold uppercase tracking-wider" :style="{ color: lightTokens.text.disabled }">相关标的</span>
                        <span class="text-[9px]" :style="{ color: lightTokens.text.disabled }">3 只</span>
                      </div>
                      <div class="flex-1 p-1.5 space-y-1">
                        <div class="border rounded px-2 py-1.5 flex items-center gap-2" :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold border" :style="{ backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.muted }">NV</div>
                          <div class="flex-1 min-w-0">
                            <div class="text-[10px] font-bold" :style="{ color: lightTokens.text.secondary }">NVDA</div>
                          </div>
                          <span class="text-[8px] font-bold px-1 py-0.5 rounded" :style="{ backgroundColor: lightTokens.accent.successBg, color: lightTokens.accent.success }">利好</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Stock Tag Input -->
        <section id="stock-tag-input">
          <SectionHeader title="Stock Tag Input" subtitle="股票标签输入组件" />
          <DualShowcase>
            <template #dark>
              <div class="w-72">
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: darkTokens.text.muted }">输入股票 (多选)</h4>
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <span class="px-2 py-1 rounded border text-[10px] flex items-center gap-1.5"
                    :style="{ backgroundColor: darkTokens.accent.primaryBg, borderColor: darkTokens.accent.primary + '80', color: darkTokens.accent.primary }">
                    NVDA
                    <button class="opacity-60 hover:opacity-100">×</button>
                  </span>
                  <span class="px-2 py-1 rounded border text-[10px] flex items-center gap-1.5"
                    :style="{ backgroundColor: darkTokens.accent.primaryBg, borderColor: darkTokens.accent.primary + '80', color: darkTokens.accent.primary }">
                    AAPL
                    <button class="opacity-60 hover:opacity-100">×</button>
                  </span>
                </div>
                <div class="relative">
                  <input type="text" placeholder="输入代码并回车 (e.g. NVDA)" 
                    class="w-full rounded px-3 py-2 text-xs focus:outline-none border"
                    :style="{ backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.primary }" />
                  <button class="absolute right-2 top-1/2 -translate-y-1/2" :style="{ color: darkTokens.text.muted }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div class="w-72">
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: lightTokens.text.muted }">输入股票 (多选)</h4>
                <div class="flex flex-wrap gap-1.5 mb-2">
                  <span class="px-2 py-1 rounded border text-[10px] flex items-center gap-1.5"
                    :style="{ backgroundColor: lightTokens.accent.primaryBg, borderColor: lightTokens.accent.primary + '80', color: lightTokens.accent.primary }">
                    NVDA
                    <button class="opacity-60 hover:opacity-100">×</button>
                  </span>
                  <span class="px-2 py-1 rounded border text-[10px] flex items-center gap-1.5"
                    :style="{ backgroundColor: lightTokens.accent.primaryBg, borderColor: lightTokens.accent.primary + '80', color: lightTokens.accent.primary }">
                    AAPL
                    <button class="opacity-60 hover:opacity-100">×</button>
                  </span>
                </div>
                <div class="relative">
                  <input type="text" placeholder="输入代码并回车 (e.g. NVDA)" 
                    class="w-full rounded px-3 py-2 text-xs focus:outline-none border"
                    :style="{ backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.primary }" />
                  <button class="absolute right-2 top-1/2 -translate-y-1/2" :style="{ color: lightTokens.text.muted }">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Time Range Selector -->
        <section id="time-range-selector">
          <SectionHeader title="Time Range Selector" subtitle="时间范围选择器" />
          <DualShowcase>
            <template #dark>
              <div>
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: darkTokens.text.muted }">事件时间范围</h4>
                <div class="grid grid-cols-2 gap-2 w-64">
                  <button v-for="range in ['Last 24h', 'Last 3 Days', 'Last Week', 'Last Month']" :key="range"
                    class="py-2 rounded text-[10px] font-medium border transition-all text-center"
                    :style="range === 'Last Week' 
                      ? { backgroundColor: darkTokens.accent.primaryDark, borderColor: darkTokens.accent.primary, color: darkTokens.text.primary }
                      : { backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.tertiary }">
                    {{ range }}
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div>
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: lightTokens.text.muted }">事件时间范围</h4>
                <div class="grid grid-cols-2 gap-2 w-64">
                  <button v-for="range in ['Last 24h', 'Last 3 Days', 'Last Week', 'Last Month']" :key="range"
                    class="py-2 rounded text-[10px] font-medium border transition-all text-center"
                    :style="range === 'Last Week' 
                      ? { backgroundColor: lightTokens.accent.primaryDark, borderColor: lightTokens.accent.primary, color: lightTokens.text.primary }
                      : { backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.tertiary }">
                    {{ range }}
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Sentiment Filter -->
        <section id="sentiment-filter">
          <SectionHeader title="Sentiment Filter" subtitle="情绪筛选按钮组" />
          <DualShowcase>
            <template #dark>
              <div>
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: darkTokens.text.muted }">事件情绪 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: darkTokens.accent.successBg, borderColor: darkTokens.accent.success, color: darkTokens.accent.success }">
                    Bullish
                  </button>
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.tertiary }">
                    Bearish
                  </button>
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: darkTokens.border.strong, borderColor: darkTokens.text.muted, color: darkTokens.text.secondary }">
                    Neutral
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div>
                <h4 class="text-[10px] font-bold uppercase tracking-wider mb-2" :style="{ color: lightTokens.text.muted }">事件情绪 (多选)</h4>
                <div class="flex flex-wrap gap-2">
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: lightTokens.accent.successBg, borderColor: lightTokens.accent.success, color: lightTokens.accent.success }">
                    Bullish
                  </button>
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.tertiary }">
                    Bearish
                  </button>
                  <button class="px-3 py-2 rounded text-[10px] font-medium border transition-all"
                    :style="{ backgroundColor: lightTokens.border.strong, borderColor: lightTokens.text.muted, color: lightTokens.text.secondary }">
                    Neutral
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Sentiment Badge -->
        <section id="sentiment-badge">
          <SectionHeader title="Sentiment Badge" subtitle="情绪标签" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-3">
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: darkTokens.accent.successBg, color: darkTokens.accent.success }">利好</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: darkTokens.accent.dangerBg, color: darkTokens.accent.danger }">利空</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: darkTokens.text.muted }">中性</span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-3">
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: lightTokens.accent.successBg, color: lightTokens.accent.success }">利好</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: lightTokens.accent.dangerBg, color: lightTokens.accent.danger }">利空</span>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
                  :style="{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: lightTokens.text.muted }">中性</span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Floating Tab Bar -->
        <section id="floating-tab-bar">
          <SectionHeader title="Floating Tab Bar" subtitle="浮动标签栏（底部导航）" />
          <DualShowcase>
            <template #dark>
              <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1" :style="{ backgroundColor: darkTokens.background.elevated + 'E6', borderColor: darkTokens.border.strong }">
                <button class="px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                  :style="{ backgroundColor: '#ffffff', color: '#000000' }">
                  <span class="mr-1">✨</span> 机会
                </button>
                <button class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                  :style="{ color: darkTokens.text.muted }">
                  <span class="mr-1">📊</span> 事件分析
                </button>
              </div>
            </template>
            <template #light>
              <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1" :style="{ backgroundColor: lightTokens.background.elevated + 'E6', borderColor: lightTokens.border.strong }">
                <button class="px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                  :style="{ backgroundColor: lightTokens.text.primary, color: '#ffffff' }">
                  <span class="mr-1">✨</span> 机会
                </button>
                <button class="px-4 py-2 rounded-full text-xs font-bold transition-all"
                  :style="{ color: lightTokens.text.muted }">
                  <span class="mr-1">📊</span> 事件分析
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Related Stock Item -->
        <section id="related-stock-item">
          <SectionHeader title="Related Stock Item" subtitle="相关股票项（带情绪标签）" />
          <DualShowcase>
            <template #dark>
              <div class="border rounded px-2.5 py-2 flex items-center gap-2.5 w-56"
                :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.subtle }">
                <div class="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold border shrink-0" 
                  :style="{ backgroundColor: darkTokens.background.elevated, borderColor: darkTokens.border.default, color: darkTokens.text.muted }">NV</div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-bold leading-none mb-0.5 truncate" :style="{ color: darkTokens.text.secondary }">NVDA</div>
                  <div class="text-[10px] truncate" :style="{ color: darkTokens.text.disabled }">NVIDIA Corp</div>
                </div>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0"
                  :style="{ backgroundColor: darkTokens.accent.successBg, color: darkTokens.accent.success }">利好</span>
              </div>
            </template>
            <template #light>
              <div class="border rounded px-2.5 py-2 flex items-center gap-2.5 w-56"
                :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.subtle }">
                <div class="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold border shrink-0" 
                  :style="{ backgroundColor: lightTokens.background.elevated, borderColor: lightTokens.border.default, color: lightTokens.text.muted }">NV</div>
                <div class="flex-1 min-w-0">
                  <div class="text-xs font-bold leading-none mb-0.5 truncate" :style="{ color: lightTokens.text.secondary }">NVDA</div>
                  <div class="text-[10px] truncate" :style="{ color: lightTokens.text.disabled }">NVIDIA Corp</div>
                </div>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0"
                  :style="{ backgroundColor: lightTokens.accent.successBg, color: lightTokens.accent.success }">利好</span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Loading Indicator -->
        <section id="loading-indicator">
          <SectionHeader title="Loading Indicator" subtitle="加载指示器" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center gap-1.5" :style="{ color: darkTokens.text.muted }">
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 75ms"></div>
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" style="animation-delay: 150ms"></div>
                <span class="text-xs ml-2">加载中...</span>
              </div>
            </template>
            <template #light>
              <div class="flex items-center gap-1.5" :style="{ color: lightTokens.text.muted }">
                <div class="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-pulse"></div>
                <div class="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-pulse" style="animation-delay: 75ms"></div>
                <div class="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-pulse" style="animation-delay: 150ms"></div>
                <span class="text-xs ml-2">加载中...</span>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- ============================================= -->
        <!-- REVENUE PAGE COMPONENTS -->
        <!-- ============================================= -->

        <!-- Metric Card -->
        <section id="metric-card">
          <SectionHeader title="Metric Card" subtitle="关键指标卡片" />
          <DualShowcase>
            <template #dark>
              <div class="flex gap-6">
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: darkTokens.text.muted }">总盈亏</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: darkTokens.accent.success }">+$4,285</div>
                </div>
                <div class="w-px" :style="{ backgroundColor: darkTokens.border.subtle }"></div>
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: darkTokens.text.muted }">收益率</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: darkTokens.accent.success }">+42.8%</div>
                </div>
                <div class="w-px" :style="{ backgroundColor: darkTokens.border.subtle }"></div>
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: darkTokens.text.muted }">最大回撤</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: darkTokens.text.secondary }">-15.2%</div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex gap-6">
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: lightTokens.text.muted }">总盈亏</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: lightTokens.accent.success }">+$4,285</div>
                </div>
                <div class="w-px" :style="{ backgroundColor: lightTokens.border.subtle }"></div>
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: lightTokens.text.muted }">收益率</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: lightTokens.accent.success }">+42.8%</div>
                </div>
                <div class="w-px" :style="{ backgroundColor: lightTokens.border.subtle }"></div>
                <div class="flex flex-col items-center justify-center">
                  <div class="text-xs mb-1 font-medium uppercase tracking-wider" :style="{ color: lightTokens.text.muted }">最大回撤</div>
                  <div class="text-2xl font-bold tracking-tight" :style="{ color: lightTokens.text.secondary }">-15.2%</div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- View Mode Switcher -->
        <section id="view-mode-switcher">
          <SectionHeader title="View Mode Switcher" subtitle="视图模式切换器" />
          <DualShowcase>
            <template #dark>
              <div class="flex gap-3 items-center">
                <!-- Global View Button (Active) -->
                <button class="rounded-sm border px-4 py-2 flex items-center gap-2"
                  :style="{ backgroundColor: darkTokens.accent.primary, borderColor: darkTokens.accent.primary, color: '#ffffff' }">
                  <div class="p-1 rounded bg-white/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </div>
                  <span class="text-sm font-bold">全局概览</span>
                </button>
                <!-- Single Model Button -->
                <button class="w-10 h-10 rounded-sm border flex items-center justify-center"
                  :style="{ backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.default, color: darkTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                </button>
              </div>
            </template>
            <template #light>
              <div class="flex gap-3 items-center">
                <button class="rounded-sm border px-4 py-2 flex items-center gap-2"
                  :style="{ backgroundColor: lightTokens.accent.primary, borderColor: lightTokens.accent.primary, color: '#ffffff' }">
                  <div class="p-1 rounded bg-white/20">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                  </div>
                  <span class="text-sm font-bold">全局概览</span>
                </button>
                <button class="w-10 h-10 rounded-sm border flex items-center justify-center"
                  :style="{ backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.default, color: lightTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Model Selector -->
        <section id="model-selector">
          <SectionHeader title="Model Selector" subtitle="模型选择器" />
          <DualShowcase>
            <template #dark>
              <div class="border rounded-sm flex items-center justify-between h-12 w-64"
                :style="{ borderColor: darkTokens.accent.primary, backgroundColor: darkTokens.background.surface }">
                <button class="h-full flex items-center justify-center w-8" :style="{ borderRight: '1px solid ' + darkTokens.border.subtle, color: darkTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div class="flex-1 text-center px-2">
                  <div class="text-[10px] uppercase" :style="{ color: darkTokens.text.muted }">当前模型</div>
                  <div class="font-bold flex items-center justify-center gap-2" :style="{ color: darkTokens.text.primary }">
                    <span class="w-2 h-2 rounded-full" style="background-color: #8B5CF6"></span>
                    gemini-3-pro
                  </div>
                </div>
                <button class="h-full flex items-center justify-center w-8" :style="{ borderLeft: '1px solid ' + darkTokens.border.subtle, color: darkTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
                <div class="absolute -right-1 -top-1 w-3 h-3 rounded-full border-2" :style="{ backgroundColor: darkTokens.accent.primary, borderColor: darkTokens.background.surface }"></div>
              </div>
            </template>
            <template #light>
              <div class="border rounded-sm flex items-center justify-between h-12 w-64"
                :style="{ borderColor: lightTokens.accent.primary, backgroundColor: lightTokens.background.surface }">
                <button class="h-full flex items-center justify-center w-8" :style="{ borderRight: '1px solid ' + lightTokens.border.subtle, color: lightTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div class="flex-1 text-center px-2">
                  <div class="text-[10px] uppercase" :style="{ color: lightTokens.text.muted }">当前模型</div>
                  <div class="font-bold flex items-center justify-center gap-2" :style="{ color: lightTokens.text.primary }">
                    <span class="w-2 h-2 rounded-full" style="background-color: #8B5CF6"></span>
                    gemini-3-pro
                  </div>
                </div>
                <button class="h-full flex items-center justify-center w-8" :style="{ borderLeft: '1px solid ' + lightTokens.border.subtle, color: lightTokens.text.muted }">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Holdings Item -->
        <section id="holdings-item">
          <SectionHeader title="Holdings Item" subtitle="持仓列表项" />
          <DualShowcase>
            <template #dark>
              <div class="flex items-center justify-between p-3 rounded border w-64"
                :style="{ borderColor: darkTokens.border.subtle, backgroundColor: darkTokens.background.surface }">
                <div class="flex items-center gap-2">
                  <div class="w-1 h-6 rounded-full" style="background-color: #8B5CF6"></div>
                  <div>
                    <div class="text-xs font-bold" :style="{ color: darkTokens.text.secondary }">贵州茅台</div>
                    <div class="text-[10px]" :style="{ color: darkTokens.text.muted }">600519</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-bold" :style="{ color: darkTokens.text.secondary }">20%</div>
                  <div class="text-[10px]" :style="{ color: darkTokens.accent.success }">+8.2%</div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="flex items-center justify-between p-3 rounded border w-64"
                :style="{ borderColor: lightTokens.border.subtle, backgroundColor: lightTokens.background.surface }">
                <div class="flex items-center gap-2">
                  <div class="w-1 h-6 rounded-full" style="background-color: #8B5CF6"></div>
                  <div>
                    <div class="text-xs font-bold" :style="{ color: lightTokens.text.secondary }">贵州茅台</div>
                    <div class="text-[10px]" :style="{ color: lightTokens.text.muted }">600519</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-bold" :style="{ color: lightTokens.text.secondary }">20%</div>
                  <div class="text-[10px]" :style="{ color: lightTokens.accent.success }">+8.2%</div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Strategy Table -->
        <section id="strategy-table">
          <SectionHeader title="Strategy Table" subtitle="策略详情表格" />
          <DualShowcase>
            <template #dark>
              <table class="w-full text-xs text-left">
                <thead :style="{ backgroundColor: darkTokens.background.elevated, color: darkTokens.text.muted }">
                  <tr>
                    <th class="py-2 px-2 font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + darkTokens.border.default }">股票</th>
                    <th class="py-2 px-2 font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + darkTokens.border.default }">策略</th>
                    <th class="py-2 px-2 text-right font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + darkTokens.border.default }">盈亏</th>
                  </tr>
                </thead>
                <tbody :style="{ backgroundColor: darkTokens.background.surface }">
                  <tr :style="{ borderBottom: '1px solid ' + darkTokens.border.subtle }">
                    <td class="py-2 px-2">
                      <div class="font-medium" :style="{ color: darkTokens.text.primary }">贵州茅台</div>
                      <div class="text-[10px]" :style="{ color: darkTokens.text.muted }">600519</div>
                    </td>
                    <td class="py-2 px-2" :style="{ color: darkTokens.text.secondary }">
                      <div class="line-clamp-2">监测到MACD底背离信号，建议布局</div>
                    </td>
                    <td class="py-2 px-2 text-right">
                      <span class="font-bold" :style="{ color: darkTokens.accent.success }">+8.2%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
            <template #light>
              <table class="w-full text-xs text-left">
                <thead :style="{ backgroundColor: lightTokens.background.elevated, color: lightTokens.text.muted }">
                  <tr>
                    <th class="py-2 px-2 font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + lightTokens.border.default }">股票</th>
                    <th class="py-2 px-2 font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + lightTokens.border.default }">策略</th>
                    <th class="py-2 px-2 text-right font-medium uppercase tracking-wider" :style="{ borderBottom: '1px solid ' + lightTokens.border.default }">盈亏</th>
                  </tr>
                </thead>
                <tbody :style="{ backgroundColor: lightTokens.background.surface }">
                  <tr :style="{ borderBottom: '1px solid ' + lightTokens.border.subtle }">
                    <td class="py-2 px-2">
                      <div class="font-medium" :style="{ color: lightTokens.text.primary }">贵州茅台</div>
                      <div class="text-[10px]" :style="{ color: lightTokens.text.muted }">600519</div>
                    </td>
                    <td class="py-2 px-2" :style="{ color: lightTokens.text.secondary }">
                      <div class="line-clamp-2">监测到MACD底背离信号，建议布局</div>
                    </td>
                    <td class="py-2 px-2 text-right">
                      <span class="font-bold" :style="{ color: lightTokens.accent.success }">+8.2%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </DualShowcase>
        </section>

        <!-- Trade Item -->
        <section id="trade-item">
          <SectionHeader title="Trade Item" subtitle="交易记录项" />
          <DualShowcase>
            <template #dark>
              <div class="px-4 py-3 flex items-center justify-between border-b w-64" :style="{ borderColor: darkTokens.border.subtle }">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    style="background-color: rgba(16, 185, 129, 0.2); color: #10b981;">买</div>
                  <div>
                    <div class="text-xs font-bold" :style="{ color: darkTokens.text.secondary }">贵州茅台</div>
                    <div class="text-[10px]" :style="{ color: darkTokens.text.muted }">12/08 09:30</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-medium" :style="{ color: darkTokens.text.secondary }">¥1,680</div>
                  <div class="text-[10px]" :style="{ color: darkTokens.accent.success }">+2.5%</div>
                </div>
              </div>
            </template>
            <template #light>
              <div class="px-4 py-3 flex items-center justify-between border-b w-64" :style="{ borderColor: lightTokens.border.subtle }">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                    style="background-color: rgb(209, 250, 229); color: #10b981;">买</div>
                  <div>
                    <div class="text-xs font-bold" :style="{ color: lightTokens.text.secondary }">贵州茅台</div>
                    <div class="text-[10px]" :style="{ color: lightTokens.text.muted }">12/08 09:30</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-medium" :style="{ color: lightTokens.text.secondary }">¥1,680</div>
                  <div class="text-[10px]" :style="{ color: lightTokens.accent.success }">+2.5%</div>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Login Overlay -->
        <section id="login-overlay">
          <SectionHeader title="Login Overlay" subtitle="登录锁定遮罩" />
          <DualShowcase>
            <template #dark>
              <div class="relative h-24 overflow-hidden rounded" :style="{ backgroundColor: darkTokens.background.surface }">
                <div class="p-4 text-xs" :style="{ color: darkTokens.text.muted }">
                  <p>策略内容预览...</p>
                  <p>更多内容需要登录查看</p>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center pb-3"
                  :style="{ background: `linear-gradient(to top, ${darkTokens.background.surface}, ${darkTokens.background.surface}90, transparent)` }">
                  <button class="flex items-center gap-2 px-4 py-1.5 text-white rounded-full shadow-lg text-xs font-medium"
                    :style="{ backgroundColor: darkTokens.accent.primary }">
                    登录查看更多
                  </button>
                </div>
              </div>
            </template>
            <template #light>
              <div class="relative h-24 overflow-hidden rounded" :style="{ backgroundColor: lightTokens.background.surface }">
                <div class="p-4 text-xs" :style="{ color: lightTokens.text.muted }">
                  <p>策略内容预览...</p>
                  <p>更多内容需要登录查看</p>
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center pb-3"
                  style="background: linear-gradient(to top, white, rgba(255,255,255,0.9), transparent);">
                  <button class="flex items-center gap-2 px-4 py-1.5 text-white rounded-full shadow-lg text-xs font-medium"
                    :style="{ backgroundColor: lightTokens.accent.primary }">
                    登录查看更多
                  </button>
                </div>
              </div>
            </template>
          </DualShowcase>
        </section>

        <!-- Footer Spacing -->
        <div class="h-20"></div>

      </main>
    </div>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.self="showModal = false">
        <div class="border w-[500px] max-w-[95vw] overflow-hidden flex flex-col animate-modal-in"
          :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
          <div class="px-6 py-4 border-b flex justify-between items-center"
            :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div class="flex items-center gap-3">
              <div class="px-2.5 py-1 rounded text-xs font-semibold tracking-wide uppercase"
                :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
                Modal Title
              </div>
            </div>
            <button @click="showModal = false" class="w-7 h-7 flex items-center justify-center rounded-sm hover:bg-white/10">
              <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-6" :style="{ backgroundColor: tokens.colors.background.surface }">
            <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">
              This is a modal dialog component. It supports header, body, and footer sections.
              Click outside or the X button to close.
            </p>
          </div>
          <div class="px-6 py-4 border-t flex justify-end gap-3" :style="{ borderColor: tokens.colors.border.default }">
            <button @click="showModal = false" class="px-4 py-2 text-sm rounded-sm border transition-all"
              :style="{ borderColor: tokens.colors.border.strong, color: tokens.colors.text.secondary }">
              Cancel
            </button>
            <button @click="showModal = false" class="px-4 py-2 text-sm font-bold rounded-sm bg-cyan-600 text-white transition-all hover:bg-cyan-500">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, h, computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { darkTheme, lightTheme } from '../design/themes'

const { tokens, isDark, toggleTheme } = useTheme()

// Static theme tokens for dual preview
const darkTokens = darkTheme.colors
const lightTokens = lightTheme.colors

// Navigation
const activeSection = ref('tokens')
const sections = [
  {
    id: 'foundation',
    title: 'Foundation',
    items: [
      { id: 'tokens', label: 'Design Tokens' },
    ]
  },
  {
    id: 'badges',
    title: 'Badges',
    items: [
      { id: 'direction-badge', label: 'Direction Badge' },
      { id: 'grade-badge', label: 'Grade Badge' },
      { id: 'source-badge', label: 'Source Badge' },
      { id: 'horizon-badge', label: 'Horizon Badge' },
      { id: 'status-badge', label: 'Status Badge' },
      { id: 'plan-badge', label: 'Plan Badge' },
      { id: 'unread-badge', label: 'Unread Badge' },
    ]
  },
  {
    id: 'buttons',
    title: 'Buttons',
    items: [
      { id: 'primary-button', label: 'Primary Button' },
      { id: 'icon-button', label: 'Icon Button' },
      { id: 'tab-button', label: 'Tab Button' },
      { id: 'toggle-switch', label: 'Toggle Switch' },
    ]
  },
  {
    id: 'inputs',
    title: 'Form Inputs',
    items: [
      { id: 'search-input', label: 'Search Input' },
      { id: 'text-input', label: 'Text Input' },
      { id: 'select-input', label: 'Select Dropdown' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio Button' },
    ]
  },
  {
    id: 'feedback',
    title: 'Feedback',
    items: [
      { id: 'progress-bar', label: 'Progress Bar' },
      { id: 'toast', label: 'Toast' },
    ]
  },
  {
    id: 'cards',
    title: 'Cards',
    items: [
      { id: 'task-card', label: 'Task Card' },
      { id: 'selection-card', label: 'Selection Card' },
    ]
  },
  {
    id: 'navigation',
    title: 'Navigation',
    items: [
      { id: 'sidebar-item', label: 'Sidebar Item' },
      { id: 'floating-tabs', label: 'Floating Tabs' },
      { id: 'table-header', label: 'Table Header' },
    ]
  },
  {
    id: 'overlay',
    title: 'Overlays',
    items: [
      { id: 'modal', label: 'Modal' },
      { id: 'minimap', label: 'MiniMap Dot' },
    ]
  },
  {
    id: 'generation',
    title: 'Generation',
    items: [
      { id: 'stock-item', label: 'Stock Item' },
      { id: 'stock-tag', label: 'Stock Tag' },
      { id: 'config-card', label: 'Config Card' },
      { id: 'info-hint', label: 'Info Hint' },
      { id: 'smart-filter', label: 'Smart Filter' },
      { id: 'action-footer', label: 'Action Footer' },
      { id: 'expand-button', label: 'Expand Button' },
      { id: 'more-card', label: '+N More Card' },
    ]
  },
  {
    id: 'info-page',
    title: 'Info Page',
    items: [
      { id: 'hero-section', label: 'Hero Section' },
      { id: 'content-switcher', label: 'Content Switcher' },
      { id: 'filter-bar', label: 'Filter Bar' },
      { id: 'opportunity-card', label: 'Opportunity Card' },
      { id: 'opportunity-list', label: 'Opportunity List' },
      { id: 'theme-event-card', label: 'Theme Event Card' },
      { id: 'attribution-card', label: 'Attribution Card' },
      { id: 'grid-control', label: 'Grid Control' },
      { id: 'loading-indicator', label: 'Loading Indicator' },
    ]
  },
  {
    id: 'revenue-page',
    title: 'Revenue Page',
    items: [
      { id: 'metric-card', label: 'Metric Card' },
      { id: 'view-mode-switcher', label: 'View Mode Switcher' },
      { id: 'model-selector', label: 'Model Selector' },
      { id: 'holdings-item', label: 'Holdings Item' },
      { id: 'strategy-table', label: 'Strategy Table' },
      { id: 'trade-item', label: 'Trade Item' },
      { id: 'login-overlay', label: 'Login Overlay' },
    ]
  }
]

// Component count
const componentCount = computed(() => sections.reduce((acc, s) => acc + s.items.length, 0))

// Interactive States
const toggleA = ref(true)
const toggleB = ref(false)
const checkA = ref(true)
const checkB = ref(false)
const radioValue = ref('Option A')
const showModal = ref(false)
const selectedCard = ref('momentum')
const selectedCollection = ref('all')
const activeFloatingTab = ref('strategy')

// Generation page selections
const selectedFramework = ref('momentum')
const selectedPeriod = ref('medium')
const selectedRisk = ref('moderate')

// Table
const sortField = ref('symbol')
const sortDirection = ref('asc')
const tableColumns = [
  { field: 'symbol', label: 'Symbol' },
  { field: 'name', label: 'Name' },
  { field: 'direction', label: 'Direction' },
  { field: 'grade', label: 'Grade' },
]
const tableRows = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', direction: 'LONG', grade: 'A+' },
  { symbol: 'AAPL', name: 'Apple Inc', direction: 'LONG', grade: 'A' },
  { symbol: 'TSLA', name: 'Tesla Inc', direction: 'SHORT', grade: 'B' },
]
const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

// Icons
const IconChart = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('path', { d: 'M3 3v18h18' }),
  h('path', { d: 'm19 9-5 5-4-4-3 3' })
])
const IconTarget = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('circle', { cx: '12', cy: '12', r: '6' }),
  h('circle', { cx: '12', cy: '12', r: '2' })
])
const IconLightning = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('path', { d: 'M13 10V3L4 14h7v7l9-11h-7z' })
])
const IconTrending = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('polyline', { points: '23 6 13.5 15.5 8.5 10.5 1 18' }),
  h('polyline', { points: '17 6 23 6 23 12' })
])
const IconFolder = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' })
])
const IconStar = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
])
const IconClock = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('polyline', { points: '12 6 12 12 16 14' })
])

// Toast types
const toastTypes = computed(() => [
  {
    type: 'success',
    borderClass: 'border-l-emerald-500',
    iconColor: tokens.value.colors.semantic.success,
    message: 'Strategy generated successfully!',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
      h('path', { d: 'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
      h('polyline', { points: '22 4 12 14.01 9 11.01' })
    ])
  },
  {
    type: 'error',
    borderClass: 'border-l-red-500',
    iconColor: tokens.value.colors.semantic.error,
    message: 'Failed to process request. Please try again.',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('line', { x1: '15', y1: '9', x2: '9', y2: '15' }),
      h('line', { x1: '9', y1: '9', x2: '15', y2: '15' })
    ])
  },
  {
    type: 'warning',
    borderClass: 'border-l-yellow-500',
    iconColor: tokens.value.colors.semantic.warning,
    message: 'Your session will expire in 5 minutes.',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
      h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
      h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
    ])
  },
  {
    type: 'info',
    borderClass: 'border-l-blue-500',
    iconColor: tokens.value.colors.accent.primary,
    message: 'New market data available for analysis.',
    icon: h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('line', { x1: '12', y1: '16', x2: '12', y2: '12' }),
      h('line', { x1: '12', y1: '8', x2: '12.01', y2: '8' })
    ])
  }
])

// Selection items
const selectionItems = [
  { id: 'momentum', title: 'Momentum', desc: 'Trend following', icon: IconTrending },
  { id: 'value', title: 'Value', desc: 'Undervalued assets', icon: IconTarget },
  { id: 'growth', title: 'Growth', desc: 'High growth potential', icon: IconChart },
  { id: 'event', title: 'Event', desc: 'Catalyst driven', icon: IconLightning }
]

// Collections
const collections = [
  { id: 'all', label: 'All Strategies', count: 24, icon: IconFolder },
  { id: 'favorites', label: 'Favorites', count: 5, icon: IconStar },
  { id: 'recent', label: 'Recent', count: 8, icon: IconClock },
]

// Floating tabs
const floatingTabs = [
  { id: 'strategy', label: 'My Strategy' },
  { id: 'official', label: 'Official' },
  { id: 'generation', label: 'Generation' }
]

// Framework selection items
const frameworkItems = [
  { id: 'momentum', title: 'Momentum', desc: 'Trend-following strategy', icon: IconTrending },
  { id: 'value', title: 'Value', desc: 'Fundamental analysis', icon: IconTarget },
  { id: 'growth', title: 'Growth', desc: 'High growth potential', icon: IconChart },
  { id: 'quantitative', title: 'Quant', desc: 'Data-driven signals', icon: IconLightning },
]

// Period selection items
const periodItems = [
  { id: 'short', title: 'Short', desc: '< 1 month', icon: IconClock },
  { id: 'medium', title: 'Medium', desc: '1-6 months', icon: IconClock },
  { id: 'long', title: 'Long', desc: '6-12 months', icon: IconClock },
  { id: 'extended', title: 'Extended', desc: '1-3 years', icon: IconClock },
  { id: 'horizon', title: 'Horizon', desc: '3+ years', icon: IconClock },
]

// Risk selection items
const riskItems = [
  { id: 'conservative', title: 'Conservative', desc: 'Low risk', icon: IconTarget },
  { id: 'moderate', title: 'Moderate', desc: 'Balanced', icon: IconTarget },
  { id: 'growth', title: 'Growth', desc: 'Medium risk', icon: IconTarget },
  { id: 'aggressive', title: 'Aggressive', desc: 'High risk', icon: IconTarget },
  { id: 'speculative', title: 'Speculative', desc: 'Very high', icon: IconTarget },
]

// Sub-components
const SectionHeader = {
  props: ['title', 'subtitle'],
  setup(props) {
    const { tokens } = useTheme()
    return () => h('div', { class: 'mb-5 pb-3 border-b', style: { borderColor: tokens.value.colors.border.default + '80' } }, [
      h('div', { class: 'flex items-center gap-3' }, [
        h('div', { 
          class: 'w-1 h-6 rounded-full',
          style: { backgroundColor: tokens.value.colors.accent.primary }
        }),
        h('div', {}, [
          h('h2', { class: 'text-base font-bold tracking-tight' }, props.title),
          h('p', { class: 'text-[11px] mt-0.5', style: { color: tokens.value.colors.text.muted } }, props.subtitle)
        ])
      ])
    ])
  }
}

// Dual Theme Showcase - Shows components in both dark and light modes side by side
const DualShowcase = {
  setup(_, { slots }) {
    return () => h('div', { class: 'grid grid-cols-2 gap-4' }, [
      // Dark Mode Panel
      h('div', { 
        class: 'p-5 rounded-lg border relative overflow-hidden',
        style: { backgroundColor: darkTokens.background.surface, borderColor: darkTokens.border.default }
      }, [
        h('div', { 
          class: 'absolute top-0 left-0 right-0 h-0.5',
          style: { background: 'linear-gradient(to right, #374151, #1f2937)' }
        }),
        h('div', { 
          class: 'absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5',
          style: { backgroundColor: darkTokens.background.elevated, color: darkTokens.text.muted }
        }, [
          h('span', { class: 'w-1.5 h-1.5 rounded-full bg-gray-500' }),
          'Dark'
        ]),
        slots.dark?.()
      ]),
      // Light Mode Panel
      h('div', { 
        class: 'p-5 rounded-lg border relative overflow-hidden',
        style: { backgroundColor: lightTokens.background.surface, borderColor: lightTokens.border.default }
      }, [
        h('div', { 
          class: 'absolute top-0 left-0 right-0 h-0.5',
          style: { background: 'linear-gradient(to right, #e5e7eb, #d1d5db)' }
        }),
        h('div', { 
          class: 'absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5',
          style: { backgroundColor: lightTokens.background.elevated, color: lightTokens.text.muted }
        }, [
          h('span', { class: 'w-1.5 h-1.5 rounded-full bg-amber-400' }),
          'Light'
        ]),
        slots.light?.()
      ])
    ])
  }
}

const ComponentShowcase = {
  setup(_, { slots }) {
    const { tokens } = useTheme()
    return () => h('div', { 
      class: 'p-6 rounded-lg border relative overflow-hidden',
      style: { backgroundColor: tokens.value.colors.background.surface, borderColor: tokens.value.colors.border.default }
    }, [
      h('div', { 
        class: 'absolute top-0 left-0 right-0 h-0.5',
        style: { background: `linear-gradient(to right, ${tokens.value.colors.accent.primary}40, transparent)` }
      }),
      slots.default?.()
    ])
  }
}

const ColorSwatch = {
  props: ['name', 'color'],
  setup(props) {
    const { tokens } = useTheme()
    return () => h('div', { class: 'flex flex-col items-center gap-2' }, [
      h('div', { 
        class: 'w-12 h-12 rounded border',
        style: { backgroundColor: props.color, borderColor: tokens.value.colors.border.default }
      }),
      h('span', { class: 'text-[10px] font-mono', style: { color: tokens.value.colors.text.muted } }, props.name),
      h('span', { class: 'text-[9px] font-mono', style: { color: tokens.value.colors.text.disabled } }, props.color)
    ])
  }
}

// Dual Color Swatch for comparing themes
const DualColorSwatch = {
  props: ['name', 'darkColor', 'lightColor'],
  setup(props) {
    return () => h('div', { class: 'flex flex-col items-center gap-1' }, [
      h('div', { class: 'flex gap-1' }, [
        h('div', { 
          class: 'w-8 h-8 rounded-l border',
          style: { backgroundColor: props.darkColor, borderColor: darkTokens.border.default },
          title: 'Dark: ' + props.darkColor
        }),
        h('div', { 
          class: 'w-8 h-8 rounded-r border',
          style: { backgroundColor: props.lightColor, borderColor: lightTokens.border.default },
          title: 'Light: ' + props.lightColor
        })
      ]),
      h('span', { class: 'text-[9px] font-mono', style: { color: darkTokens.text.muted } }, props.name)
    ])
  }
}
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  animation: gradient-x 2s linear infinite;
  background-size: 200% 100%;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-modal-in {
  animation: modal-in 0.2s ease-out;
}
</style>
