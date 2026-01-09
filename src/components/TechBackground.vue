<template>
  <div ref="container" class="tech-background" :class="isDark ? 'dark-bg' : 'light-bg'"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTheme } from '../composables/useTheme';
import * as THREE from 'three';

const { isDark } = useTheme();
const container = ref(null);
let currentEffect = null;    // 当前激活的效果
let p5Lib = null;
let libsLoaded = false;

// 清理所有 canvas
const cleanupAllCanvas = () => {
  if (!container.value) return;
  const canvases = container.value.querySelectorAll('canvas');
  canvases.forEach(c => c.remove());
};

// 销毁当前效果
const destroyCurrentEffect = () => {
  if (currentEffect) {
    try {
      currentEffect.destroy();
    } catch (e) {
      console.warn('Error destroying effect:', e);
    }
    currentEffect = null;
  }
  cleanupAllCanvas();
};

// 初始化 Vanta Topology 效果（黑暗模式）
const initTopology = async () => {
  if (!container.value) return;
  
  destroyCurrentEffect();

  try {
    // 动态加载 Topology
    await import('../utils/vanta.topology.js');
    
    if (!p5Lib) {
      const p5Module = await import('p5');
      p5Lib = p5Module.default;
    }
    
    // 使用 window.VANTA.TOPOLOGY
    if (window.VANTA && window.VANTA.TOPOLOGY) {
      currentEffect = window.VANTA.TOPOLOGY({
        el: container.value,
        p5: p5Lib,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0099ff,
        backgroundColor: 0x000510,
        speed: 0.8,
        complexity: 0.004
      });
    }
  } catch (error) {
    console.error("Failed to initialize Vanta Topology effect:", error);
  }
};

// 初始化 Vanta Cells 效果（浅色模式）
const initCells = async () => {
  if (!container.value) return;

  destroyCurrentEffect();

  try {
    // 动态加载 Cells
    await import('../utils/vanta.cells.js');
    
    // 使用 window.VANTA.CELLS
    if (window.VANTA && window.VANTA.CELLS) {
      currentEffect = window.VANTA.CELLS({
        el: container.value,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 2.00,
        // 浅色模式配色：浅蓝色细胞效果
        color1: 0x7dd3fc,       // 浅蓝色
        color2: 0x0ea5e9,       // 天蓝色
        backgroundColor: 0xffffff, // 白色背景
        size: 1.5,
        speed: 0.8
      });
    }
  } catch (error) {
    console.error("Failed to initialize Vanta Cells effect:", error);
  }
};

onMounted(async () => {
  if (container.value) {
    // 根据当前主题初始化
    if (isDark.value) {
      await initTopology();
    } else {
      await initCells();
    }
    libsLoaded = true;
  }
});

// 监听主题变化，切换效果
watch(isDark, async (newVal) => {
  if (!libsLoaded) return;
  
  if (newVal) {
    await initTopology();
  } else {
    await initCells();
  }
});

onUnmounted(() => {
  destroyCurrentEffect();
});
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
}

/* 深色模式背景与遮罩 */
.tech-background.dark-bg {
  background-color: #000510;
}
.tech-background.dark-bg::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 40%, #000510 100%);
  z-index: 1;
}

/* 浅色模式背景 */
.tech-background.light-bg {
  background-color: #ffffff;
}
/* 浅色模式无遮罩 */
</style>