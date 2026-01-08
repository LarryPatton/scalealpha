
<template>
  <div class="min-h-screen pb-20" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Hero Section -->
    <section 
      id="hero" 
      class="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center transition-colors duration-500"
      :style="{ background: isDark ? 'linear-gradient(to bottom, #0f172a, #050505)' : 'linear-gradient(to bottom, #f8fafc, #ffffff)' }"
    >
      <!-- Background Decorations -->
      <div 
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full filter blur-[120px] pointer-events-none" 
        :style="{ backgroundColor: isDark ? 'rgba(16, 185, 129, 0.05)' : 'rgba(16, 185, 129, 0.03)' }"
      ></div>
      <div 
        class="absolute bottom-0 right-0 w-[800px] h-[600px] rounded-full filter blur-[100px] pointer-events-none" 
        :style="{ backgroundColor: isDark ? 'rgba(236, 72, 153, 0.05)' : 'rgba(236, 72, 153, 0.03)' }"
      ></div>
      
      <div class="max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full">
        <!-- Preview Area - Theme Cards - Left -->
        <div class="lg:col-span-7 h-[600px] transform hover:scale-[1.005] transition-all duration-500">
          <HomeThemePreviewDemo1C />
        </div>

        <!-- Text Area - Right -->
        <div class="lg:col-span-5 flex flex-col justify-center">
          <!-- Demo Badge -->
          <div 
            class="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border w-fit"
            :style="{ 
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderColor: '#10b981',
              color: '#10b981'
            }"
          >
            <span>🎴</span>
            <span>方案1-C：卡片翻转揭示关联网络</span>
          </div>

          <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight" :style="{ color: tokens.colors.text.primary }">
            主题发现
          </h2>
          <p class="text-lg md:text-xl mb-6" :style="{ color: tokens.colors.text.tertiary }">
            追踪热点主题，把握投资周期
          </p>
          <p class="text-base leading-relaxed mb-8" :style="{ color: tokens.colors.text.muted }">
            实时监控市场热门主题的生命周期演变，从萌芽期到成熟期。<br>
            每个主题卡片翻转后揭示完整的股票关联网络，包括核心股票和周边关联股票。
          </p>

          <!-- Animation Features -->
          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm" :style="{ backgroundColor: '#10b98120', color: '#10b981' }">1</div>
              <div>
                <div class="font-bold text-sm mb-1" :style="{ color: tokens.colors.text.primary }">生命周期进度条动画</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.muted }">8阶段进度条依次点亮，展示主题演变历程</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm" :style="{ backgroundColor: '#ec489920', color: '#ec4899' }">2</div>
              <div>
                <div class="font-bold text-sm mb-1" :style="{ color: tokens.colors.text.primary }">3D卡片翻转效果</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.muted }">卡片绕Y轴180°翻转，揭示背面关联网络</div>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm" :style="{ backgroundColor: '#f59e0b20', color: '#f59e0b' }">3</div>
              <div>
                <div class="font-bold text-sm mb-1" :style="{ color: tokens.colors.text.primary }">股票关联力导向图</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.muted }">核心股票(⭐)与周边股票的关联关系可视化</div>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-4">
            <router-link 
              to="/infoB?tab=themes" 
              class="inline-block px-6 py-3 font-bold text-base rounded-sm transition-all shadow-lg hover:-translate-y-1"
              :style="{ backgroundColor: '#10b981', color: '#ffffff' }"
            >
              查看完整主题页 →
            </router-link>
            <router-link 
              to="/home" 
              class="inline-block px-6 py-3 font-bold text-base rounded-sm transition-all border"
              :style="{ borderColor: tokens.colors.border.strong, color: tokens.colors.text.primary }"
            >
              返回原首页
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div class="text-[10px] uppercase tracking-widest mb-2" :style="{ color: tokens.colors.text.disabled }">
          首页第二屏动态展示方案演示
        </div>
        <div class="flex items-center justify-center gap-4">
          <router-link 
            to="/home-demo1" 
            class="text-xs px-3 py-1 rounded border transition-colors"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
          >
            Demo 1: 赛马动画
          </router-link>
          <span 
            class="text-xs px-3 py-1 rounded border"
            :style="{ borderColor: tokens.colors.accent.primary, color: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primaryBg }"
          >
            Demo 2: 卡片翻转 ✓
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'
import HomeThemePreviewDemo1C from '../components/home/HomeThemePreviewDemo1C.vue'

const { tokens, isDark } = useTheme()
</script>

<style scoped>
</style>
