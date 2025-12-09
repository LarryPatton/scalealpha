<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
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
import Navbar from '../components/Navbar.vue'
</script>