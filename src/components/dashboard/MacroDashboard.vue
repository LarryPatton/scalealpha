<template>
  <div class="macro-dashboard">
    <!-- Compact Header -->
    <div class="dashboard-header">
      <div class="header-left">
        <h2 class="dashboard-title">宏观看板</h2>
        <span class="chart-name">{{ charts[activeIndex].name }}</span>
      </div>
      
      <!-- Compact Navigation -->
      <div class="navigation-controls">
        <button @click="prevSlide" class="nav-btn" :disabled="activeIndex === 0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        
        <div class="pagination-dots">
          <span 
            v-for="(chart, index) in charts" 
            :key="index"
            class="dot"
            :class="{ active: activeIndex === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
        
        <button @click="nextSlide" class="nav-btn" :disabled="activeIndex === charts.length - 1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Swiper Container -->
    <div class="swiper-container">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="0"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="chart-swiper"
      >
        <swiper-slide v-for="(chart, index) in charts" :key="index">
          <div class="chart-wrapper">
            <component :is="chart.component" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import ThemeTreemap from './ThemeTreemap.vue'
import StrategyTrend from './StrategyTrend.vue'
import GradeDistribution from './GradeDistribution.vue'

const charts = ref([
  { name: '主题分布', component: ThemeTreemap },
  { name: '方向趋势', component: StrategyTrend },
  { name: '评级分布', component: GradeDistribution }
])

const activeIndex = ref(0)
let swiperInstance = null

const onSwiper = (swiper) => {
  swiperInstance = swiper
}

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.activeIndex
}

const nextSlide = () => {
  if (swiperInstance) {
    swiperInstance.slideNext()
  }
}

const prevSlide = () => {
  if (swiperInstance) {
    swiperInstance.slidePrev()
  }
}

const goToSlide = (index) => {
  if (swiperInstance) {
    swiperInstance.slideTo(index)
  }
}
</script>

<style scoped>
.macro-dashboard {
  background: #1a1a1a;
  border-radius: 0.75rem;
  border: 1px solid #333;
  padding: 1rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #333;
}

.header-left {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.dashboard-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.chart-name {
  font-size: 0.875rem;
  color: #3b82f6;
  font-weight: 500;
}

.navigation-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-btn {
  background: #2a2a2a;
  border: 1px solid #333;
  color: #999;
  padding: 0.375rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover:not(:disabled) {
  background: #333;
  color: #3b82f6;
  border-color: #3b82f6;
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.pagination-dots {
  display: flex;
  gap: 0.375rem;
  align-items: center;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #333;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #3b82f6;
  width: 20px;
  border-radius: 3px;
}

.dot:hover {
  background: #555;
}

.swiper-container {
  width: 100%;
  height: 320px;
  overflow: hidden;
}

.chart-swiper {
  width: 100%;
  height: 100%;
}

.chart-wrapper {
  height: 100%;
  width: 100%;
  padding: 0;
}
</style>