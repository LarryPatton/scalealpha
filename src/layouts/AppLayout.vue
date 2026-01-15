<template>
  <div class="h-screen text-white flex flex-col overflow-hidden" :class="{ 'bg-[#1a1a1a]': route.name !== 'Home' }">
    <TechBackground v-if="route.name === 'Home'" />
    <!-- Global Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-1 overflow-hidden">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import TechBackground from '../components/TechBackground.vue'

const route = useRoute()
</script>