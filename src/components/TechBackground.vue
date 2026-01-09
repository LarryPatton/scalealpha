<template>
  <div ref="container" class="tech-background" :class="[isDark ? 'dark-bg' : 'light-bg', `state-${currentSection}`]">
    <div class="orbs-container">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from '../composables/useTheme';
import { useScrollState } from '../composables/useScrollState';

const { isDark } = useTheme();
const { currentSection } = useScrollState();
const container = ref(null);
</script>

<style scoped>
.tech-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  transition: background-color 0.5s ease;
  overflow: hidden;
}

/* 深色模式背景 */
.tech-background.dark-bg {
  background-color: #020617; /* slate-950 */
}

/* 浅色模式背景 */
.tech-background.light-bg {
  background-color: #ffffff;
}

/* Orbs Container */
.orbs-container {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(80px);
  opacity: 0.8;
  transform: translateZ(0); /* 开启硬件加速 */
}

/* Orb Base Styles */
.orb {
  position: absolute;
  border-radius: 50%;
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 
  混合模式处理 
  浅色模式用 multiply (减色)，深色模式用 screen (加色)
*/
.light-bg .orb {
  mix-blend-mode: multiply;
}
.dark-bg .orb {
  mix-blend-mode: screen;
  opacity: 0.25; /* 深色模式下降低透明度，避免过曝 */
}

/* =========================================
   SCROLLING STORYTELLING STATES (LIGHT MODE)
   ========================================= */

/* Hero */
.light-bg.state-hero .orb-1 { top: -10%; right: -5%; width: 50vw; height: 50vw; background: #bae6fd; opacity: 0.6; }
.light-bg.state-hero .orb-2 { bottom: -10%; left: -10%; width: 40vw; height: 40vw; background: #e0f2fe; opacity: 0.8; }
.light-bg.state-hero .orb-3 { top: 40%; left: 40%; width: 20vw; height: 20vw; background: #f0f9ff; opacity: 0.4; }

/* Themes */
.light-bg.state-themes .orb-1 { top: 20%; right: 60%; width: 45vw; height: 45vw; background: #e9d5ff; opacity: 0.5; }
.light-bg.state-themes .orb-2 { bottom: 10%; right: -10%; width: 55vw; height: 55vw; background: #ddd6fe; opacity: 0.6; }
.light-bg.state-themes .orb-3 { top: 10%; right: 10%; width: 15vw; height: 15vw; background: #f5f3ff; opacity: 0.3; }

/* Opportunities */
.light-bg.state-opportunities .orb-1 { top: -15%; right: -15%; width: 60vw; height: 60vw; background: #bbf7d0; opacity: 0.5; }
.light-bg.state-opportunities .orb-2 { bottom: 20%; left: -5%; width: 35vw; height: 35vw; background: #99f6e4; opacity: 0.6; }
.light-bg.state-opportunities .orb-3 { top: 50%; right: 30%; width: 25vw; height: 25vw; background: #ccfbf1; opacity: 0.4; }

/* Attribution */
.light-bg.state-attribution .orb-1 { top: 60%; left: 50%; transform: translateX(-50%); width: 70vw; height: 30vw; background: #fed7aa; opacity: 0.5; border-radius: 40%; }
.light-bg.state-attribution .orb-2 { top: -10%; left: 10%; width: 40vw; height: 40vw; background: #ffedd5; opacity: 0.6; }
.light-bg.state-attribution .orb-3 { bottom: 10%; right: 10%; width: 20vw; height: 20vw; background: #fff7ed; opacity: 0.4; }

/* Strategy */
.light-bg.state-strategy .orb-1 { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30vw; height: 30vw; background: #7dd3fc; opacity: 0.7; }
.light-bg.state-strategy .orb-2 { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60vw; height: 60vw; background: #e0f2fe; opacity: 0.4; }
.light-bg.state-strategy .orb-3 { top: 10%; right: 10%; width: 15vw; height: 15vw; background: #f0f9ff; opacity: 0.3; }

/* Management */
.light-bg.state-management .orb-1 { bottom: -20%; left: -10%; width: 60vw; height: 60vw; background: #cbd5e1; opacity: 0.5; }
.light-bg.state-management .orb-2 { top: -10%; right: -10%; width: 50vw; height: 50vw; background: #e2e8f0; opacity: 0.6; }
.light-bg.state-management .orb-3 { top: 40%; left: 40%; width: 10vw; height: 10vw; background: #f1f5f9; opacity: 0.4; }


/* =========================================
   SCROLLING STORYTELLING STATES (DARK MODE)
   ========================================= */

/* Hero - Deep Blue/Cyan (科技感) */
.dark-bg.state-hero .orb-1 { top: -10%; right: -5%; width: 50vw; height: 50vw; background: #0284c7; /* sky-600 */ }
.dark-bg.state-hero .orb-2 { bottom: -10%; left: -10%; width: 40vw; height: 40vw; background: #0369a1; /* sky-700 */ }
.dark-bg.state-hero .orb-3 { top: 40%; left: 40%; width: 20vw; height: 20vw; background: #0c4a6e; /* sky-900 */ }

/* Themes - Deep Purple (神秘探索) */
.dark-bg.state-themes .orb-1 { top: 20%; right: 60%; width: 45vw; height: 45vw; background: #7c3aed; /* violet-600 */ }
.dark-bg.state-themes .orb-2 { bottom: 10%; right: -10%; width: 55vw; height: 55vw; background: #6d28d9; /* violet-700 */ }
.dark-bg.state-themes .orb-3 { top: 10%; right: 10%; width: 15vw; height: 15vw; background: #4c1d95; /* violet-900 */ }

/* Opportunities - Emerald/Teal (数据信号) */
.dark-bg.state-opportunities .orb-1 { top: -15%; right: -15%; width: 60vw; height: 60vw; background: #059669; /* emerald-600 */ }
.dark-bg.state-opportunities .orb-2 { bottom: 20%; left: -5%; width: 35vw; height: 35vw; background: #0d9488; /* teal-600 */ }
.dark-bg.state-opportunities .orb-3 { top: 50%; right: 30%; width: 25vw; height: 25vw; background: #115e59; /* teal-800 */ }

/* Attribution - Deep Orange/Red (警示热点) */
.dark-bg.state-attribution .orb-1 { top: 60%; left: 50%; transform: translateX(-50%); width: 70vw; height: 30vw; background: #ea580c; /* orange-600 */ border-radius: 40%; }
.dark-bg.state-attribution .orb-2 { top: -10%; left: 10%; width: 40vw; height: 40vw; background: #c2410c; /* orange-700 */ }
.dark-bg.state-attribution .orb-3 { bottom: 10%; right: 10%; width: 20vw; height: 20vw; background: #7c2d12; /* orange-900 */ }

/* Strategy - Indigo/Blue (深度构建) */
.dark-bg.state-strategy .orb-1 { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30vw; height: 30vw; background: #2563eb; /* blue-600 */ }
.dark-bg.state-strategy .orb-2 { top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60vw; height: 60vw; background: #1d4ed8; /* blue-700 */ }
.dark-bg.state-strategy .orb-3 { top: 10%; right: 10%; width: 15vw; height: 15vw; background: #1e3a8a; /* blue-900 */ }

/* Management - Slate/Gray (稳重架构) */
.dark-bg.state-management .orb-1 { bottom: -20%; left: -10%; width: 60vw; height: 60vw; background: #475569; /* slate-600 */ }
.dark-bg.state-management .orb-2 { top: -10%; right: -10%; width: 50vw; height: 50vw; background: #334155; /* slate-700 */ }
.dark-bg.state-management .orb-3 { top: 40%; left: 40%; width: 10vw; height: 10vw; background: #0f172a; /* slate-900 */ }

</style>