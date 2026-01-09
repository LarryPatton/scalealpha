<template>
  <div class="min-h-screen text-white flex flex-col" :class="{ 'bg-[#1a1a1a]': route.name !== 'Home' }">
    <TechBackground v-if="route.name === 'Home'" />
    <!-- Global Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#404040] py-8 text-center text-gray-500 text-sm mt-auto">
      <p>&copy; 2025 ScaleAlpha.ai. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import TechBackground from '../components/TechBackground.vue'

const route = useRoute()
</script>