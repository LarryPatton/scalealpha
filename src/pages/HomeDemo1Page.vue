
<template>
  <div class="min-h-screen pb-20" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Hero Section -->
    <section 
      id="hero" 
      class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center transition-colors duration-500"
      :style="{ background: isDark ? 'linear-gradient(to bottom, #0f172a, #050505)' : 'linear-gradient(to bottom, #f8fafc, #ffffff)' }"
    >
      <!-- Background Decorations (Parallax) -->
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
      
      <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10 w-full">
        <!-- Text Area - Left -->
        <div class="lg:col-span-5 flex flex-col justify-center text-left">
          <div class="inline-block mb-8">
            <div class="w-16 h-16 rounded-sm flex items-center justify-center shadow-2xl ring-1 backdrop-blur-sm" :style="{ backgroundColor: tokens.colors.accent.primary + 'E6', boxShadow: `0 0 40px ${tokens.colors.accent.primary}66`, ringColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }">
              <span class="text-3xl font-bold" style="color: #000;">Ⓐ</span>
            </div>
          </div>
          <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight" :style="{ color: tokens.colors.text.primary }">
            ScaleAlpha.ai
          </h1>
          <p class="text-xl md:text-2xl font-semibold mb-6" :style="{ color: tokens.colors.accent.primary }">
            个性化AI对冲基金团队
          </p>
          <p class="text-lg mb-10 leading-relaxed max-w-lg" :style="{ color: tokens.colors.text.tertiary }">
            为每个DIY投资者打造专属量化交易平台。<br>
            实时监控、智能归因、策略生成，一站式解决您的投资难题。
          </p>
          
          <!-- Demo Badge -->
          <div 
            class="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
            :style="{ 
              backgroundColor: isDark ? 'rgba(244, 114, 182, 0.1)' : 'rgba(244, 114, 182, 0.1)',
              borderColor: '#F472B6',
              color: '#F472B6'
            }"
          >
            <span>🏁</span>
            <span>方案1演示：多模型净值曲线赛马动画</span>
          </div>
          
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
              查看完整仪表盘 →
            </router-link>
            <router-link 
              to="/home" 
              class="inline-block px-8 py-4 font-bold text-lg rounded-sm transition-all border hover:bg-opacity-10"
              :style="{ 
                borderColor: tokens.colors.border.strong,
                color: tokens.colors.text.primary
              }"
            >
              返回原首页
            </router-link>
          </div>
        </div>

        <!-- Performance Chart (Hero Feature) - Right - Using Demo1 Component -->
        <div class="lg:col-span-7 h-[550px] transform hover:scale-[1.01] transition duration-700">
          <HomeRevenuePreviewDemo1 />
        </div>
      </div>

      <!-- Scroll Down Indicator -->
      <div 
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span class="text-[10px] uppercase tracking-widest text-gray-500">Demo 1: Racing Animation</span>
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HomeRevenuePreviewDemo1 from '../components/home/HomeRevenuePreviewDemo1.vue'
import { useTheme } from '../composables/useTheme'

const { tokens, isDark } = useTheme()

// Scroll Parallax Logic
const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
</style>
