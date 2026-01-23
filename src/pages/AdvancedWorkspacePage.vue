
<template>
  <div class="flex h-[calc(100vh-64px)]" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Left Sidebar -->
    <aside 
      class="w-64 border-r flex flex-col shrink-0"
      :style="{ 
        backgroundColor: isDark ? 'rgba(10, 14, 22, 1)' : tokens.colors.background.card,
        borderColor: tokens.colors.border.default 
      }"
    >
      <!-- Workspace Header -->
      <div class="p-6 border-b" :style="{ borderColor: tokens.colors.border.default }">
        <div class="mb-6">
          <p 
            class="text-[10px] uppercase font-bold tracking-widest mb-4"
            :style="{ color: tokens.colors.text.muted }"
          >
            {{ $t('advanced.workspace.currentWorkspace') }}
          </p>
          <div class="flex items-center gap-3 mb-2">
            <div 
              class="size-10 rounded-full border p-0.5 shrink-0"
              style="border-color: rgba(0, 242, 255, 0.4)"
            >
              <img 
                v-if="currentAgent?.avatar"
                :src="currentAgent.avatar" 
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <div class="overflow-hidden">
              <p class="text-xs font-bold truncate" :style="{ color: tokens.colors.text.primary }">
                {{ getAgentName() }}
              </p>
              <p class="text-[10px] font-mono uppercase truncate" style="color: #00f2ff">
                {{ getAgentDesc() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-2">
          <a 
            v-for="navItem in navItems" 
            :key="navItem.key"
            href="#"
            class="flex items-center gap-3 px-3 py-2 rounded-lg group transition-colors hover:bg-white/5"
            :class="activeNav === navItem.key ? 'text-cyan-400 bg-white/5' : ''"
            :style="{ color: activeNav === navItem.key ? '#00f2ff' : tokens.colors.text.muted }"
            @click.prevent="activeNav = navItem.key"
          >
            <div class="w-6 h-6 flex items-center justify-center shrink-0">
              <svg 
                class="w-5 h-5 transition-transform" 
                :class="activeNav !== navItem.key ? 'group-hover:scale-110' : ''"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path :d="iconPaths[navItem.icon] || ''" />
              </svg>
            </div>
            <span class="text-xs font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis flex-1">{{ navItem.label }}</span>
          </a>
        </nav>
      </div>

      <!-- System Health -->
      <div class="mt-auto p-6 border-t" :style="{ borderColor: tokens.colors.border.default }">
        <div 
          class="rounded-lg p-3 border"
          :style="{ 
            backgroundColor: 'rgba(0, 242, 255, 0.05)',
            borderColor: 'rgba(0, 242, 255, 0.1)'
          }"
        >
          <p 
            class="text-[9px] uppercase font-bold tracking-widest mb-2"
            :style="{ color: tokens.colors.text.muted }"
          >
            {{ $t('advanced.workspace.systemHealth') }}
          </p>
          <div class="flex items-center gap-2">
            <div 
              class="h-1 flex-1 rounded-full overflow-hidden"
              :style="{ backgroundColor: tokens.colors.border.default }"
            >
              <div class="h-full w-[88%] rounded-full" style="background-color: #00f2ff"></div>
            </div>
            <span class="text-[10px] font-mono" style="color: #00f2ff">88%</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
      <!-- Header -->
      <header 
        class="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-20"
        :style="{ 
          backgroundColor: isDark ? 'rgba(6, 9, 15, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="flex items-center gap-4">
          <router-link 
            to="/advanced"
            class="flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-400 group"
            :style="{ color: tokens.colors.text.muted }"
          >
            <div class="w-5 h-5 flex items-center justify-center">
              <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path :d="iconPaths.arrow_back" />
              </svg>
            </div>
            {{ $t('advanced.workspace.back') }}
          </router-link>
          <div class="h-4 w-px" :style="{ backgroundColor: tokens.colors.border.default }"></div>
          <span class="text-[10px] font-bold uppercase tracking-widest" :style="{ color: tokens.colors.text.muted }">
            WORKSPACE / {{ getAgentKey() }}
          </span>
        </div>
        <div class="flex items-center gap-4">
          <button :style="{ color: tokens.colors.text.muted }" class="hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path :d="iconPaths.search" /></svg>
          </button>
          <button :style="{ color: tokens.colors.text.muted }" class="hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path :d="iconPaths.notifications" /></svg>
          </button>
        </div>
      </header>

      <!-- Content -->
      <div class="p-8 max-w-6xl mx-auto w-full">
        <!-- Page Title -->
        <div class="flex justify-between items-end mb-8">
          <div>
            <h2 
              class="text-3xl font-black tracking-tight"
              :style="{ color: tokens.colors.text.primary }"
            >
              {{ getAgentName() }} {{ $t('advanced.workspace.workspace') || 'Workspace' }}
            </h2>
            <p 
              class="mt-1 text-sm"
              :style="{ color: tokens.colors.text.muted }"
            >
              {{ getWorkspaceDescription() }}
            </p>
          </div>
          <button 
            class="px-4 py-2 rounded flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all border hover:bg-cyan-500/20"
            :style="{ 
              backgroundColor: 'rgba(0, 242, 255, 0.1)',
              borderColor: 'rgba(0, 242, 255, 0.2)',
              color: '#00f2ff'
            }"
          >
            <div class="w-4 h-4 flex items-center justify-center">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path :d="iconPaths.export_notes" /></svg>
            </div>
            {{ $t('advanced.workspace.exportPlans') }}
          </button>
        </div>

        <!-- Materials & Plans Section -->
        <section class="mb-10">
          <div class="flex items-center justify-between mb-4">
            <h3 
              class="text-xs font-bold uppercase tracking-[0.2em]"
              :style="{ color: tokens.colors.text.secondary }"
            >
              {{ $t('advanced.workspace.materials') }}
            </h3>
            <span class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">
              4 SOURCES ACTIVE
            </span>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="(material, index) in materials" 
              :key="index"
              class="p-4 rounded-xl border-l-2 transition-all hover:border-cyan-500/30 group"
              :style="{ 
                backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderColor: tokens.colors.border.default,
                borderLeftColor: material.highlight ? 'rgba(0, 242, 255, 0.5)' : tokens.colors.border.default
              }"
            >
              <div class="flex items-center gap-3 mb-3">
                <div class="w-6 h-6 flex items-center justify-center shrink-0">
                  <svg 
                    class="w-6 h-6"
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    :style="{ color: material.iconColor || '#00f2ff' }"
                  >
                    <path :d="iconPaths[material.icon] || ''" />
                  </svg>
                </div>
                <span 
                  class="text-[10px] font-bold uppercase tracking-wider truncate flex-1"
                  :style="{ color: tokens.colors.text.primary }"
                >
                  {{ getMaterialName(material) }}
                </span>
              </div>
              <p 
                class="text-[10px] mb-2 h-8 leading-tight overflow-hidden line-clamp-2"
                :style="{ color: tokens.colors.text.muted }"
              >
                {{ getMaterialDesc(material) }}
              </p>
              <div class="flex items-center justify-between">
                <span class="text-[9px] font-mono" style="color: rgba(0, 242, 255, 0.6)">
                  {{ material.type }}
                </span>
                <div class="w-4 h-4 flex items-center justify-center">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" :style="{ color: tokens.colors.text.muted }">
                    <path :d="iconPaths.check_circle" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Add Reference Card -->
            <div 
              class="p-4 rounded-xl border border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors hover:bg-white/5 group"
              :style="{ borderColor: tokens.colors.border.default }"
            >
              <div class="w-6 h-6 flex items-center justify-center mb-1">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor" :style="{ color: tokens.colors.text.muted }">
                  <path :d="iconPaths.add" />
                </svg>
              </div>
              <span class="text-[9px] font-bold uppercase" :style="{ color: tokens.colors.text.muted }">
                Add Reference
              </span>
            </div>
          </div>
        </section>

        <!-- Active Tasks Section -->
        <section class="mb-10">
          <div class="flex items-center justify-between mb-4">
            <h3 
              class="text-xs font-bold uppercase tracking-[0.2em]"
              :style="{ color: tokens.colors.text.secondary }"
            >
              {{ $t('advanced.workspace.tasks') }}
            </h3>
            <button 
              class="text-[10px] font-bold uppercase hover:underline"
              style="color: #00f2ff"
            >
              {{ $t('advanced.workspace.addTask') }}
            </button>
          </div>
          <div class="space-y-3">
            <div 
              v-for="(task, index) in tasks" 
              :key="index"
              class="p-4 rounded-xl flex items-center justify-between group transition-all border hover:border-cyan-500/30"
              :style="{ 
                backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderColor: tokens.colors.border.default
              }"
            >
              <div class="flex items-center gap-4">
                <div 
                  class="size-8 rounded flex items-center justify-center shrink-0"
                  :style="{ 
                    backgroundColor: task.status === 'processing' ? 'rgba(0, 242, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: task.status === 'processing' ? '#00f2ff' : tokens.colors.text.muted
                  }"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="iconPaths[task.icon] || ''" />
                  </svg>
                </div>
                <div class="min-w-0">
                  <h4 
                    class="text-sm font-bold truncate"
                    :style="{ color: tokens.colors.text.primary }"
                  >
                    {{ getTaskName(task) }}
                  </h4>
                  <p class="text-[10px] truncate" :style="{ color: tokens.colors.text.muted }">
                    {{ getTaskDesc(task) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-6 shrink-0">
                <span 
                  class="px-2 py-1 rounded text-[9px] font-bold uppercase whitespace-nowrap"
                  :style="getTaskStatusStyle(task.status)"
                >
                  {{ getTaskStatusLabel(task) }}
                </span>
                <div class="w-5 h-5 flex items-center justify-center">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" :style="{ color: tokens.colors.text.muted }">
                    <path :d="iconPaths.chevron_right" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Charts Section -->
        <section class="grid grid-cols-2 gap-6">
          <!-- SVG Bar Chart -->
          <div 
            class="p-6 rounded-2xl border relative overflow-hidden group"
            :style="{ 
              backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderColor: tokens.colors.border.default
            }"
          >
            <h3 
              class="text-[11px] font-bold uppercase tracking-widest mb-6 relative z-10"
              :style="{ color: tokens.colors.text.muted }"
            >
              {{ $t('advanced.workspace.assetDistribution') }}
            </h3>
            
            <svg class="w-full h-48 relative z-10" viewBox="0 0 300 150" @mouseleave="hoveredBarIndex = -1">
              <defs>
                <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#00f2ff" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#00f2ff" stop-opacity="0.1"/>
                </linearGradient>
                <filter id="barGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <!-- Grid Lines -->
              <line x1="0" y1="110" x2="300" y2="110" :stroke="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'" stroke-dasharray="2 2" />
              <line x1="0" y1="70" x2="300" y2="70" :stroke="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'" stroke-dasharray="2 2" />
              <line x1="0" y1="30" x2="300" y2="30" :stroke="isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'" stroke-dasharray="2 2" />

              <!-- Bars -->
              <g v-for="(bar, index) in chartBars" :key="index" 
                 class="transition-all duration-300 transform origin-bottom"
                 @mouseenter="hoveredBarIndex = index"
              >
                <rect 
                  :x="index * 60 + 20" 
                  :y="130 - (bar.value * 1.1)" 
                  width="30" 
                  :height="bar.value * 1.1" 
                  rx="4"
                  fill="url(#barGradient)" 
                  class="transition-all duration-300 hover:filter-drop-shadow"
                  :style="{
                    opacity: hoveredBarIndex === -1 || hoveredBarIndex === index ? 1 : 0.4
                  }"
                  :filter="hoveredBarIndex === index ? 'url(#barGlow)' : ''"
                />
                
                <!-- Value Label (On Hover) -->
                <text 
                  v-if="hoveredBarIndex === index"
                  :x="index * 60 + 35" 
                  :y="125 - (bar.value * 1.1)" 
                  text-anchor="middle" 
                  font-size="10" 
                  font-weight="bold"
                  fill="#00f2ff" 
                  class="animate-fade-in"
                >
                  {{ bar.value }}%
                </text>

                <!-- Axis Label -->
                <text 
                  :x="index * 60 + 35" 
                  y="145" 
                  text-anchor="middle" 
                  font-size="9" 
                  font-weight="bold"
                  :fill="tokens.colors.text.muted" 
                  class="uppercase tracking-wider"
                  :style="{ opacity: hoveredBarIndex === index ? 1 : 0.7 }"
                >{{ bar.label }}</text>
              </g>
            </svg>
          </div>

          <!-- SVG Radar Chart -->
          <div 
            class="p-6 rounded-2xl border relative overflow-hidden"
            :style="{ 
              backgroundColor: isDark ? 'rgba(13, 18, 29, 0.7)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderColor: tokens.colors.border.default
            }"
          >
            <h3 
              class="text-[11px] font-bold uppercase tracking-widest mb-6 relative z-10"
              :style="{ color: tokens.colors.text.muted }"
            >
              {{ $t('advanced.workspace.riskExposure') }}
            </h3>

            <!-- HUD Elements -->
            <div class="absolute top-4 right-4 flex gap-1">
               <div class="h-1 w-1 bg-cyan-500/50 rounded-full animate-pulse"></div>
               <div class="h-1 w-1 bg-cyan-500/30 rounded-full"></div>
            </div>
            
            <svg class="w-full h-48 relative z-10" viewBox="0 0 200 200">
              <defs>
                 <radialGradient id="radarGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stop-color="#00f2ff" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#00f2ff" stop-opacity="0"/>
                 </radialGradient>
              </defs>

              <!-- Radar Background Circles -->
              <circle cx="100" cy="100" r="70" fill="none" class="stroke-cyan-500/20" stroke-width="1" stroke-dasharray="4 4" />
              <circle cx="100" cy="100" r="45" fill="none" class="stroke-cyan-500/10" stroke-width="1" />
              <circle cx="100" cy="100" r="20" fill="none" class="stroke-cyan-500/10" stroke-width="1" />
              
              <!-- Axes -->
              <line x1="100" y1="30" x2="100" y2="170" class="stroke-cyan-500/10" />
              <line x1="30" y1="100" x2="170" y2="100" class="stroke-cyan-500/10" />

              <!-- Data Shape -->
              <polygon 
                :points="radarPolygonPoints"
                fill="rgba(0, 242, 255, 0.15)"
                stroke="#00f2ff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                filter="url(#barGlow)"
                class="transition-all duration-1000 ease-in-out"
              >
                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
              </polygon>

              <!-- Data Points -->
              <circle v-for="point in radarData" :key="point.label"
                :cx="getRadarPoint(point.value, point.angle).split(',')[0]"
                :cy="getRadarPoint(point.value, point.angle).split(',')[1]"
                r="3" fill="#00f2ff" class="shadow-lg shadow-cyan-500"
              />

              <!-- Text Labels -->
              <text x="100" y="20" text-anchor="middle" font-size="8" fill="#00f2ff" font-weight="bold" class="opacity-80">INFLATION</text>
              <text x="185" y="103" text-anchor="middle" font-size="8" fill="#00f2ff" font-weight="bold" class="opacity-80">CREDIT</text>
              <text x="100" y="185" text-anchor="middle" font-size="8" fill="#00f2ff" font-weight="bold" class="opacity-80">LIQUIDITY</text>
              <text x="15" y="103" text-anchor="middle" font-size="8" fill="#00f2ff" font-weight="bold" class="opacity-80">GEOPOL</text>
            </svg>
          </div>
        </section>
      </div>
    </main>

    <!-- Right Sidebar - AI Assistant -->
    <aside 
      class="w-96 border-l flex flex-col shrink-0"
      :style="{ 
        backgroundColor: isDark ? 'rgba(10, 14, 22, 1)' : tokens.colors.background.card,
        borderColor: tokens.colors.border.default 
      }"
    >
      <!-- AI Header -->
      <div 
        class="p-6 border-b"
        :style="{ 
          backgroundColor: isDark ? 'rgba(6, 9, 15, 0.5)' : tokens.colors.background.base,
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="flex items-center gap-3">
          <div 
            class="size-10 rounded-lg flex items-center justify-center shrink-0"
            style="background-color: rgba(0, 242, 255, 0.1)"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" style="color: #00f2ff">
              <path :d="iconPaths.smart_toy" />
            </svg>
          </div>
          <div>
            <h2 class="text-sm font-bold truncate" :style="{ color: tokens.colors.text.primary }">
              {{ $t('advanced.workspace.aiAssistant') }}
            </h2>
            <div class="flex items-center gap-2">
              <div class="size-1.5 rounded-full animate-pulse" style="background-color: #00f2ff; box-shadow: 0 0 10px rgba(0, 242, 255, 0.5)"></div>
              <span class="text-[10px] font-mono" style="color: rgba(0, 242, 255, 0.6)">
                {{ $t('advanced.workspace.online') }} & REVIEWING
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div 
          v-for="(message, index) in chatMessages" 
          :key="index"
          class="flex flex-col gap-2"
          :class="message.isUser ? 'items-end' : ''"
        >
          <div 
            class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
            :style="{ color: tokens.colors.text.muted }"
          >
            <span>{{ message.sender }}</span>
            <span>•</span>
            <span>{{ message.time }}</span>
          </div>
          <div 
            class="p-4 rounded-2xl border max-w-[90%]"
            :class="message.isUser ? 'rounded-tr-none' : 'rounded-tl-none'"
            :style="message.isUser ? {
              backgroundColor: '#00f2ff',
              borderColor: 'rgba(0, 242, 255, 0.2)'
            } : {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: tokens.colors.border.default
            }"
          >
            <p 
              class="text-xs leading-relaxed"
              :style="{ color: message.isUser ? (isDark ? '#06090f' : '#1a1a1a') : tokens.colors.text.secondary }"
              v-html="message.content"
            ></p>
            
            <!-- Action buttons for AI messages -->
            <div v-if="message.hasActions" class="mt-4 flex gap-2">
              <button 
                class="flex-1 py-2 rounded text-[9px] font-bold uppercase border transition-all hover:bg-cyan-500/20"
                style="background-color: rgba(0, 242, 255, 0.1); border-color: rgba(0, 242, 255, 0.2); color: #00f2ff"
              >
                Apply Adjustment
              </button>
              <button 
                class="flex-1 py-2 rounded text-[9px] font-bold uppercase border transition-all"
                :style="{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: tokens.colors.border.default,
                  color: tokens.colors.text.muted
                }"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div 
        class="p-6 border-t"
        :style="{ 
          backgroundColor: isDark ? 'rgba(6, 9, 15, 0.5)' : tokens.colors.background.base,
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="relative">
          <input 
            type="text"
            class="w-full rounded-xl py-3 px-4 text-xs outline-none border transition-all focus:border-cyan-500/50"
            :style="{ 
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: tokens.colors.border.default,
              color: tokens.colors.text.primary
            }"
            :placeholder="$t('advanced.workspace.inputPlaceholder')"
          />
          <button 
            class="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-lg flex items-center justify-center transition-colors hover:bg-cyan-400"
            style="background-color: #00f2ff"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" :style="{ color: isDark ? '#06090f' : '#1a1a1a' }">
              <path :d="iconPaths.send" />
            </svg>
          </button>
        </div>
        <div class="flex gap-2 mt-4">
          <button 
            v-for="quickAction in quickActions" 
            :key="quickAction"
            class="text-[9px] font-bold uppercase tracking-widest border px-3 py-1.5 rounded transition-all hover:bg-white/5"
            :style="{ 
              color: tokens.colors.text.muted,
              borderColor: tokens.colors.border.default
            }"
          >
            {{ quickAction }}
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const { t } = useI18n()
const { tokens, isDark } = useTheme()

const iconPaths = {
  arrow_back: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  account_balance_wallet: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  analytics: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-4h2v4zm4 0h-2v-2h2v2z',
  history: 'M13 3c-4.97 0-9 4.97-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.97 9-9s-4.03-9-9-9zm-1 6v5l4.28 2.54.72-1.21-3.5-2.08V9H12z',
  description: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
  map: 'M20.5 3l-6 2.25L8.5 3 3.5 4.88v16.24l6-2.25 6 2.25 5-1.88V3zM14 17.55l-6-2.25V5.17l6 2.25v10.13z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  layers: 'M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z',
  security: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
  rebase_edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  chevron_right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  export_notes: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  search: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  notifications: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z',
  smart_toy: 'M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7.5-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
  send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
  check_circle: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
}

// Agent data
const agents = {
  1: {
    key: 'DATA_SCIENTIST',
    name: 'Data Scientist',
    nameCn: '数据科学家',
    desc: 'Signal Engineering',
    descCn: '信号工程',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3Z_ymOBKQDpvNVCc-vmv02oMfh1DGkWe9LjLpBncLNvEIrILMr4YeaDN2Bga3vGSNMfnQT1G1cCZvpTx4fyHYHSmeGWRonBMgrIF2hEgaZA1j2mC67VhuaFh6peS7wbdgwiZ86UQwyo8jTC2ouC0DT6QoRKak73Y_MYxagjylr1ubIOJksWF5p83rGtKCEN-7mBWen6JME5YQ9pjiM7nLUerP4ZE-GSeeZY5cn9cJvrxLMA9do8PdYbl9sqYJkyWoI7UnCdJklSm',
    workspaceDesc: 'Feature extraction, signal processing, and data pipeline optimization.',
    workspaceDescCn: '特征提取、信号处理与数据管道优化。'
  },
  2: {
    key: 'RESEARCHER',
    name: 'Researcher',
    nameCn: '研究员',
    desc: 'Macro Analysis',
    descCn: '宏观分析',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4raWNT-zuo2ddRMhHM7gm5AgZw2hYSV5Ol5DIElddd0H_FDTgooGBpA5BdbCmrnVWxGgjIHadrwSEqJNwFlTKc5R7pK6_pD_IS8N-ZIKZV-2bb-QmDxujE0vfuVHco8vOzjd4ydW8LJWoBGKUOgrK1gIpOAb1XNtgWQIVkLSgqC2PCAFMO0rDdpoSTrGGOG_wLQzSzehSTDVMRHH0PWFq3KmPX8c1uGplDtTYxFL5OD7eRSRtlNl2aDGu0A3eNPZCFSDTE7F8Vds_',
    workspaceDesc: 'Sentiment analysis, macro trends, and market research synthesis.',
    workspaceDescCn: '情绪分析、宏观趋势与市场研究综合。'
  },
  3: {
    key: 'ANALYST',
    name: 'Analyst',
    nameCn: '分析师',
    desc: 'Risk Evaluation',
    descCn: '风险评估',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_QNTx0BbotH6lg2KwdWld1iavqqAON8bRJ6jOVHNGwNec1YWFW5hMBNNDHJHI7pBIFPWtBlqPQfALpiHd2CNcp8b1hjWcYSnt1almrA8wqiDtNpk_lpwf3zr6XyLGPsD4Yh7fsIStsgJRpNGGh6zYg292_3lFw5NTT1syl4IY9hWqFmxYqqay-rMGb1LGSSqi7kvcrq5Un5VyQ1fA-IWszQC-vOtDC0KK_wcNBD9-y1LUPCKQmAK_IPA9grqNoUzqfFyG_KHkqmuh',
    workspaceDesc: 'Fundamental risk evaluation and due diligence assessment.',
    workspaceDescCn: '基本面风险评估与尽职调查。'
  },
  4: {
    key: 'STRATEGIST',
    name: 'Strategist',
    nameCn: '策略师',
    desc: 'Model Architecture',
    descCn: '模型架构',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9eFJSBUSMXWhNKS1NOffVgsBBKcAYNsAqDyUwmiWSOnaaR-P4bHE9_HU2Z0svNoPfO7DZ2ZF_CoY4RHYMd179KSNxAzQ1QHbaVULWHYJcvlP5-rgcwwhmnlhlFZ6olsqpZD6xxof-YOPCfJGuoRTUfYe6kUpLglTQpVDzFLI6QYI2CkE_dEHs6UTHzyR5SY8iiK4pww0-6wv5YU8wfnWb5nLnmbVXwQtAS4Aj4nBBU3e3nsEE_Dbdr-pBM6CP5AYFoMLTYZhdvXmE',
    workspaceDesc: 'Strategy design, model architecture, and allocation planning.',
    workspaceDescCn: '策略设计、模型架构与配置规划。'
  },
  5: {
    key: 'TRADER',
    name: 'Trader',
    nameCn: '交易员',
    desc: 'Order Management',
    descCn: '订单管理',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCH3Z_ymOBKQDpvNVCc-vmv02oMfh1DGkWe9LjLpBncLNvEIrILMr4YeaDN2Bga3vGSNMfnQT1G1cCZvpTx4fyHYHSmeGWRonBMgrIF2hEgaZA1j2mC67VhuaFh6peS7wbdgwiZ86UQwyo8jTC2ouC0DT6QoRKak73Y_MYxagjylr1ubIOJksWF5p83rGtKCEN-7mBWen6JME5YQ9pjiM7nLUerP4ZE-GSeeZY5cn9cJvrxLMA9do8PdYbl9sqYJkyWoI7UnCdJklSm',
    workspaceDesc: 'Trade execution, order management, and market timing.',
    workspaceDescCn: '交易执行、订单管理与市场时机把握。'
  },
  6: {
    key: 'PORTFOLIO_MGR',
    name: 'Portfolio Manager',
    nameCn: '组合经理',
    desc: 'Global Oversight',
    descCn: '全局监控',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4raWNT-zuo2ddRMhHM7gm5AgZw2hYSV5Ol5DIElddd0H_FDTgooGBpA5BdbCmrnVWxGgjIHadrwSEqJNwFlTKc5R7pK6_pD_IS8N-ZIKZV-2bb-QmDxujE0vfuVHco8vOzjd4ydW8LJWoBGKUOgrK1gIpOAb1XNtgWQIVkLSgqC2PCAFMO0rDdpoSTrGGOG_wLQzSzehSTDVMRHH0PWFq3KmPX8c1uGplDtTYxFL5OD7eRSRtlNl2aDGu0A3eNPZCFSDTE7F8Vds_',
    workspaceDesc: 'Holistic risk monitoring and strategic rebalancing proposal overview.',
    workspaceDescCn: '全局风险监控与战略再平衡提案概览。'
  }
}

const agentId = computed(() => parseInt(route.params.id) || 1)
const currentAgent = computed(() => agents[agentId.value] || agents[1])

const isChinese = computed(() => t('nav.info') === '首页')

const getAgentName = () => isChinese.value ? currentAgent.value.nameCn : currentAgent.value.name
const getAgentDesc = () => isChinese.value ? currentAgent.value.descCn : currentAgent.value.desc
const getAgentKey = () => currentAgent.value.key
const getWorkspaceDescription = () => isChinese.value ? currentAgent.value.workspaceDescCn : currentAgent.value.workspaceDesc

// Navigation
const activeNav = ref('construction')
const navItems = computed(() => [
  { key: 'global', icon: 'dashboard', label: isChinese.value ? '全局视图' : 'Global View' },
  { key: 'construction', icon: 'account_balance_wallet', label: isChinese.value ? '组合构建' : 'Construction' },
  { key: 'exposure', icon: 'analytics', label: isChinese.value ? '敞口分析' : 'Exposure' },
  { key: 'performance', icon: 'history', label: isChinese.value ? '业绩回顾' : 'Performance' }
])

// Materials data
const materials = ref([
  { 
    name: 'Execution_Plan_Q4', nameCn: 'Q4执行计划',
    desc: 'Detailed multi-asset routing strategy', descCn: '详细的多资产路由策略',
    type: 'PDF / 2.4MB', icon: 'description', iconColor: '#00f2ff', highlight: true 
  },
  { 
    name: 'Hist_Perf_Index', nameCn: '历史业绩指数',
    desc: '10-year volatility benchmarks', descCn: '10年波动率基准',
    type: 'CSV / 12.1MB', icon: 'history', iconColor: '#f97316', highlight: false 
  },
  { 
    name: 'Risk_Exposure_Map', nameCn: '风险敞口地图',
    desc: 'Geopolitical stress-test data', descCn: '地缘政治压力测试数据',
    type: 'JSON / 840KB', icon: 'map', iconColor: null, highlight: false 
  }
])

const getMaterialName = (m) => isChinese.value ? m.nameCn : m.name
const getMaterialDesc = (m) => isChinese.value ? m.descCn : m.desc

// Tasks data
const tasks = ref([
  { 
    name: 'Portfolio Construction', nameCn: '投资组合构建',
    desc: 'Aggregating signals for multi-factor allocation', descCn: '聚合多因子配置信号',
    icon: 'layers', status: 'processing', statusLabel: 'Processing', statusLabelCn: '处理中' 
  },
  { 
    name: 'Exposure Control', nameCn: '敞口控制',
    desc: 'Validating hard limits across sector clusters', descCn: '验证行业集群的硬性限制',
    icon: 'security', status: 'todo', statusLabel: 'To-Do', statusLabelCn: '待办' 
  },
  { 
    name: 'Rebalance Proposal', nameCn: '再平衡提案',
    desc: 'Finalize drift correction for 09:30 market open', descCn: '完成开盘前的偏差修正',
    icon: 'rebase_edit', status: 'todo', statusLabel: 'To-Do', statusLabelCn: '待办' 
  }
])

const getTaskName = (t) => isChinese.value ? t.nameCn : t.name
const getTaskDesc = (t) => isChinese.value ? t.descCn : t.desc
const getTaskStatusLabel = (t) => isChinese.value ? t.statusLabelCn : t.statusLabel

// Chart data
const chartBars = ref([
  { label: 'EQTY', value: 70 },
  { label: 'FIXD', value: 45 },
  { label: 'COMM', value: 90 },
  { label: 'CRYP', value: 30 },
  { label: 'CASH', value: 60 }
])
const hoveredBarIndex = ref(-1)

// Radar Chart Data
const radarData = ref([
  { label: 'INFLATION', value: 65, angle: 0 },
  { label: 'CREDIT', value: 55, angle: 90 },
  { label: 'LIQUIDITY', value: 85, angle: 180 },
  { label: 'GEOPOL', value: 70, angle: 270 }
])

const getRadarPoint = (value, angle, radius = 70, cx = 100, cy = 100) => {
  const rad = (angle - 90) * (Math.PI / 180)
  const r = (value / 100) * radius
  const x = cx + r * Math.cos(rad)
  const y = cy + r * Math.sin(rad)
  return `${x},${y}`
}

const radarPolygonPoints = computed(() => {
  return radarData.value.map(d => getRadarPoint(d.value, d.angle)).join(' ')
})

// Chat messages
const chatMessages = ref([
  {
    sender: 'Specialist', senderCn: '专家专员',
    time: '10:42 AM',
    content: 'I have audited the proposed rebalance against the Q4 Execution Plan. I\'ve identified <span style="color: #00f2ff; font-weight: bold;">2 systemic risk outliers</span> in the current exposure control weights.',
    contentCn: '我已根据Q4执行计划审计了建议的再平衡方案。在当前的敞口控制权重中发现了<span style="color: #00f2ff; font-weight: bold;">2个系统性风险异常点</span>。',
    isUser: false,
    hasActions: false
  },
  {
    sender: 'Portfolio Manager', senderCn: '组合经理',
    time: '10:44 AM',
    content: 'Adjust the sector weights to neutralize the volatility spikes. What is the impact on predicted alpha?',
    contentCn: '调整板块权重以中和波动率飙升。这对预测的 Alpha 有什么影响？',
    isUser: true,
    hasActions: false
  },
  {
    sender: 'Specialist', senderCn: '专家专员',
    time: 'Just now',
    content: 'Neutralizing volatility would require a <span style="color: #00f2ff; font-weight: bold;">4.2% shift</span> from Tech to Consumer Staples. Estimated Alpha impact: <span style="color: #f97316;">-0.12 bps</span>, but downside protection increases by <span style="color: #00f2ff; font-weight: bold;">18%</span>.',
    contentCn: '中和波动率需要从科技股向必需消费品转移 <span style="color: #00f2ff; font-weight: bold;">4.2%</span> 的资金。预计 Alpha 影响：<span style="color: #f97316;">-0.12 bps</span>，但下行保护增加 <span style="color: #00f2ff; font-weight: bold;">18%</span>。',
    isUser: false,
    hasActions: true
  }
])

const getMessageSender = (m) => isChinese.value ? m.senderCn : m.sender
const getMessageContent = (m) => isChinese.value ? m.contentCn : m.content

// Quick actions
const quickActions = computed(() => 
  isChinese.value 
    ? ['审计风险', '总结提案'] 
    : ['Audit Risk', 'Summarize Proposal']
)

// Helper function for task status styling
const getTaskStatusStyle = (status) => {
  if (status === 'processing') {
    return {
      backgroundColor: 'rgba(0, 242, 255, 0.1)',
      color: '#00f2ff'
    }
  }
  return {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: tokens.value.colors.text.muted
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 242, 255, 0.2);
  border-radius: 10px;
}
</style>
