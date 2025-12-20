<template>
  <div class="h-screen bg-[#1a1a1a] text-white flex flex-col overflow-hidden">
    <!-- Global Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 min-h-0 overflow-hidden flex flex-col relative">
      <slot></slot>
    </main>

    <!-- Footer (可通过路由 meta.hideFooter 隐藏) -->
    <footer 
      v-if="!hideFooter" 
      class="border-t border-[#404040] py-4 text-center text-gray-500 text-sm shrink-0 mt-auto"
    >
      <p>&copy; 2025 ScaleAlpha.ai. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const route = useRoute()

// 根据路由 meta.hideFooter 控制页尾显示
const hideFooter = computed(() => route.meta?.hideFooter === true)
</script>
