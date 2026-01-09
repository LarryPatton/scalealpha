<template>
  <div class="min-h-screen pb-20 bg-transparent">
    <!-- Navigation Dots -->
    <div class="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      <button 
        v-for="section in sections" 
        :key="section.id"
        @click="scrollToSection(section.id)"
        class="group relative flex items-center justify-end"
      >
        <span 
          class="absolute right-6 px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
          :class="isDark ? 'bg-gray-800 text-white' : 'bg-white/90 text-gray-800 shadow-lg'"
        >
          {{ section.label }}
        </span>
        <div 
          class="w-3 h-3 rounded-full border-2 transition-all duration-300"
          :class="activeSection === section.id 
            ? (isDark ? 'bg-sky-600 border-sky-600 scale-125' : 'bg-white border-white scale-125 shadow-lg') 
            : (isDark ? 'bg-transparent border-gray-600 hover:border-gray-400' : 'bg-transparent border-white/60 hover:border-white')"
        ></div>
      </button>
    </div>

    <!-- Hero Section -->
    <section 
      id="hero" 
      class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center transition-colors duration-500 bg-transparent"
    >
      <!-- Background Decorations (Parallax) - Removed for Vanta Background -->
      <!-- 
      <div 
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full filter blur-[120px] pointer-events-none transition-transform duration-100 ease-out" 
        :style="{ 
          backgroundColor: isDark ? 'rgba(6, 182, 212, 0.05)' : 'rgba(6, 182, 212, 0.03)',
          transform: `translate(-50%, ${scrollY * 0.2}px)`
        }"
      ></div>
      <div 
        class="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full filter blur-[100px] pointer-events-none transition-transform duration-100 ease-out" 
        :style="{ 
          backgroundColor: isDark ? 'rgba(37, 99, 235, 0.05)' : 'rgba(37, 99, 235, 0.03)',
          transform: `translate(0, ${scrollY * 0.1}px)`
        }"
      ></div>
      -->
      
      <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10 w-full">
        <!-- Text Area - Left -->
        <div class="lg:col-span-5 flex flex-col justify-center text-left reveal-on-scroll reveal-left">
          <div class="inline-block mb-8">
            <div class="w-16 h-16 rounded-sm flex items-center justify-center shadow-2xl ring-1 backdrop-blur-sm" :style="{ backgroundColor: tokens.colors.accent.primary + 'E6', boxShadow: `0 0 40px ${tokens.colors.accent.primary}66`, ringColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }">
              <span class="text-3xl font-bold" style="color: #000;">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold mb-6" :style="{ color: isDark ? tokens.colors.accent.primary : '#ffffff' }">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg mb-10 leading-relaxed max-w-lg" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.85)' }">
            为每个DIY投资者打造专属量化交易平台。<br>
            实时监控、智能归因、策略生成，一站式解决您的投资难题。
          </p>
          
          <!-- CTA Button -->
          <div class="flex gap-4">
            <router-link 
              to="/revenueB" 
              class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all shadow-lg transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-sky-500/25"
              :style="{ 
                backgroundColor: tokens.colors.accent.primary, 
                color: '#ffffff',
                boxShadow: `0 10px 40px ${tokens.colors.accent.primary}4D`
              }"
            >
              查看更多信息 →
            </router-link>
            <router-link 
              to="/login" 
              class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all border hover:bg-opacity-10"
              :style="{ 
                borderColor: tokens.colors.border.strong,
                color: tokens.colors.text.primary,
                ':hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }
              }"
            >
              浏览功能
            </router-link>
          </div>
        </div>

        <!-- Performance Chart (Hero Feature) - Right -->
        <div class="lg:col-span-7 h-[550px] transform hover:scale-[1.01] transition duration-700 reveal-on-scroll reveal-right delay-200">
          <HomeRevenuePreview />
        </div>
      </div>

      <!-- Scroll Down Indicator -->
      <div 
        @click="scrollToSection('themes')"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span class="text-[10px] uppercase tracking-widest text-gray-500">Scroll Down</span>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>

    <!-- Product Introduction Sections (Full Width Blocks) -->
    <div class="w-full">
      
      <!-- Section 1: Theme Discovery (左图右文) -->
      <section id="themes" class="w-full py-24 lg:py-32 flex items-center min-h-[80vh] bg-transparent">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Theme Cards Grid - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500 reveal-on-scroll reveal-left">
            <HomeThemePreviewOptionB />
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center reveal-on-scroll reveal-right delay-200">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">主题发现</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.9)' }">追踪热点主题，把握投资周期</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: isDark ? tokens.colors.text.muted : 'rgba(255,255,255,0.75)' }">实时监控市场热门主题的生命周期演变，从萌芽期到成熟期，帮助您在最佳时机入场或离场。每个主题都配有30天/1年涨跌幅数据和相关标的列表。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 8阶段生命周期追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 30D/1Y涨跌幅可视化
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 相关标的一键跳转
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 2: Opportunity Browse (左文右图) -->
      <section id="opportunities" class="w-full py-24 lg:py-32 flex items-center min-h-[80vh] bg-transparent">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center reveal-on-scroll reveal-left">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">机会浏览</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.9)' }">AI每日精选高置信度交易机会</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: isDark ? tokens.colors.text.muted : 'rgba(255,255,255,0.75)' }">基于多维度分析的智能评级系统，每个机会都经过风险收益比计算、时间框架预估和风险等级评定。支持推荐和关注双模式，让您高效筛选目标。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> A/B/C/D 智能评级
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 风险收益比量化分析
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 持仓周期时间框架
              </li>
            </ul>
          </div>
          <!-- Preview Area - Opportunity Cards - Right -->
          <div class="lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500 reveal-on-scroll reveal-right delay-200">
            <HomeOpportunityPreview />
          </div>
        </div>
      </section>

      <!-- Section 3: Event Attribution (左图右文) -->
      <section id="attribution" class="w-full py-24 lg:py-32 flex items-center min-h-[80vh] bg-transparent">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Timeline - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 h-[400px] transform hover:scale-[1.01] transition-all duration-500 reveal-on-scroll reveal-left">
            <HomeAttributionPreview />
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center reveal-on-scroll reveal-right delay-200">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">事件归因</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.9)' }">理解股价波动背后的真正原因</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: isDark ? tokens.colors.text.muted : 'rgba(255,255,255,0.75)' }">通过时间线可视化展示影响股价的重大事件，每个事件都标注好评/利空/中性情绪标签。支持按股票代码筛选，关联分析多标的受影响程度。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 时间线可视化展示
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 利好/利空情绪标签
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 多标的关联影响分析
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 4: Strategy Generation (左文右图) -->
      <section id="strategy" class="w-full py-24 lg:py-32 flex items-center min-h-[80vh] bg-transparent">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Text Area - Left -->
          <div class="lg:col-span-5 flex flex-col justify-center reveal-on-scroll reveal-left">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">策略生成</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.9)' }">定制专属于您的AI交易策略</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: isDark ? tokens.colors.text.muted : 'rgba(255,255,255,0.75)' }">选择标的、配置分析框架、设定投资周期和风险偏好，还可输入您的个人市场洞察。AI将综合所有参数，生成专属于您的交易策略报告。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 技术/基本面/量化多框架
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 短/中/长期周期可配置
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 融入个人洞察与观点
              </li>
            </ul>
          </div>
          <!-- Preview Area - Config Panel - Right -->
          <div class="lg:col-span-7 h-[500px] transform hover:scale-[1.01] transition-all duration-500 reveal-on-scroll reveal-right delay-200">
            <HomeStrategyPreview />
          </div>
        </div>
      </section>

      <!-- Section 5: Strategy Management (左图右文) -->
      <section id="management" class="w-full py-24 lg:py-32 flex items-center min-h-[80vh] bg-transparent">
        <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          <!-- Preview Area - Management Dashboard - Left -->
          <div class="order-2 lg:order-1 lg:col-span-7 h-[400px] transform hover:scale-[1.01] transition-all duration-500 reveal-on-scroll reveal-left">
            <HomeStrategyManagementPreview />
          </div>
          <!-- Text Area - Right -->
          <div class="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-center reveal-on-scroll reveal-right delay-200">
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" :style="{ color: isDark ? tokens.colors.text.primary : '#ffffff' }">策略管理</h2>
            <p class="text-lg md:text-xl mb-6" :style="{ color: isDark ? tokens.colors.text.tertiary : 'rgba(255,255,255,0.9)' }">高效管理您的策略资产库</p>
            <p class="text-base leading-relaxed mb-8" :style="{ color: isDark ? tokens.colors.text.muted : 'rgba(255,255,255,0.75)' }">实时追踪策略生成进度，智能筛选高评级或待更新策略。支持自定义分组收藏、批量操作，让您的策略库井然有序，随时调取最优方案。</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 实时生成进度追踪
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 智能筛选与分组收藏
              </li>
              <li class="flex items-center gap-3 text-base" :style="{ color: isDark ? tokens.colors.text.secondary : 'rgba(255,255,255,0.85)' }">
                <span :style="{ color: tokens.colors.semantic.success }">✓</span> 批量操作与一键导出
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SimplePerformanceChart from '../components/SimplePerformanceChart.vue'
import HomeRevenuePreview from '../components/home/HomeRevenuePreview.vue'
import HomeThemePreviewOptionB from '../components/home/HomeThemePreviewOptionB.vue'
import HomeOpportunityPreview from '../components/home/HomeOpportunityPreview.vue'
import HomeAttributionPreview from '../components/home/HomeAttributionPreview.vue'
import HomeStrategyPreview from '../components/home/HomeStrategyPreview.vue'
import HomeStrategyManagementPreview from '../components/home/HomeStrategyManagementPreview.vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()

// Navigation Logic
const activeSection = ref('hero')
const sections = [
  { id: 'hero', label: '首页' },
  { id: 'themes', label: '主题发现' },
  { id: 'opportunities', label: '机会浏览' },
  { id: 'attribution', label: '事件归因' },
  { id: 'strategy', label: '策略生成' },
  { id: 'management', label: '策略管理' }
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Scroll Reveal & Parallax Logic
const scrollY = ref(0)
let observer = null

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Intersection Observer for Active Section Dot
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, {
    threshold: 0.5
  })

  sections.forEach(section => {
    const element = document.getElementById(section.id)
    if (element) observer.observe(element)
  })

  // Intersection Observer for Scroll Reveal Animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible')
        revealObserver.unobserve(entry.target) // Only animate once
      }
    })
  }, {
    threshold: 0.2, // Trigger when 20% visible
    rootMargin: '0px 0px -50px 0px'
  })

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* Scroll Reveal Base Styles */
.reveal-on-scroll {
  opacity: 0;
  transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-visible {
  opacity: 1;
  transform: translate(0, 0) !important;
}

/* Reveal Variants - use will-change for better performance */
.reveal-left {
  transform: translateX(-30px);
  will-change: opacity, transform;
}

.reveal-right {
  transform: translateX(30px);
  will-change: opacity, transform;
}

.reveal-up {
  transform: translateY(30px);
  will-change: opacity, transform;
}

/* Delays */
.delay-100 { transition-delay: 100ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
</style>
