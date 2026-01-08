<template>
  <div 
    class="min-h-screen flex flex-col pb-24 transition-colors duration-300" 
    :style="{ 
      backgroundColor: tokens.colors.background.base,
      backgroundImage: !isDark ? 'radial-gradient(circle at 50% 0%, #ffffff 0%, #f1f5f9 100%)' : 'none'
    }"
  >
    <!-- 1. Global Navbar -->
    <Navbar />

    <!-- 2. Main Content Area -->
    <main class="flex-grow flex flex-col p-4 lg:p-6 relative">
      
      <!-- Hero Section -->
      <div class="mb-8 text-center py-10">
        <h1 class="text-3xl md:text-5xl font-bold mb-4 tracking-tight" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.hero.title1') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">{{ $t('portfolio.hero.title2') }}</span>
        </h1>
        <p class="max-w-2xl mx-auto text-lg" :style="{ color: tokens.colors.text.tertiary }">
          {{ $t('portfolio.hero.subtitle') }}
        </p>
      </div>

      <!-- Content Area -->
      <div class="w-full px-4 lg:px-8">
        
        <!-- Tab Content: Real Broker -->
        <div v-if="activeTab === 'broker'">
          <RealBrokerSection />
        </div>

        <!-- Tab Content: Simulation -->
        <div v-else-if="activeTab === 'simulation'">
          <SimulationSection />
        </div>

      </div>
    </main>

    <!-- 3. Floating Tabs (Bottom Center) - Capsule Style -->
    <div id="floating-tabs" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
      <div 
        class="backdrop-blur-xl border rounded-full p-1.5 flex items-center gap-1 transition-all duration-300" 
        :class="isDark ? 'shadow-2xl' : 'shadow-[0_8px_30px_rgba(0,0,0,0.12)]'"
        :style="{ 
          backgroundColor: isDark ? tokens.colors.background.elevated + 'E6' : 'rgba(255,255,255,0.85)', 
          borderColor: isDark ? tokens.colors.border.strong : 'rgba(0,0,0,0.08)' 
        }"
      >
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 relative overflow-hidden"
          :class="activeTab === tab.id ? 'scale-105' : 'hover:scale-105'"
          :style="activeTab === tab.id 
            ? { 
                backgroundColor: isDark ? '#ffffff' : tokens.colors.text.primary, 
                color: isDark ? '#000000' : '#ffffff', 
                boxShadow: isDark ? '0 0 20px rgba(255,255,255,0.2)' : '0 4px 15px rgba(15, 23, 42, 0.3)' 
              } 
            : { 
                color: isDark ? tokens.colors.text.muted : tokens.colors.text.secondary 
              }"
          @mouseenter="activeTab !== tab.id && ($event.target.style.backgroundColor = isDark ? tokens.colors.border.strong : 'rgba(0,0,0,0.04)')"
          @mouseleave="activeTab !== tab.id && ($event.target.style.backgroundColor = 'transparent')"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../composables/useTheme'
import Navbar from '../components/Navbar.vue'
import RealBrokerSection from '../components/portfolio/RealBrokerSection.vue'
import SimulationSection from '../components/portfolio/SimulationSection.vue'

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// Active Tab
const activeTab = ref('broker')

// Tabs Configuration
const tabs = computed(() => [
  { id: 'broker', label: t('portfolio.tabs.broker') },
  { id: 'simulation', label: t('portfolio.tabs.simulation') }
])

// Switch Tab
const switchTab = (tabId) => {
  activeTab.value = tabId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
