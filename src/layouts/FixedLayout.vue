<template>
  <div class="h-screen bg-[#1a1a1a] text-white flex flex-col overflow-hidden">
    <!-- Global Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main class="flex-grow overflow-hidden flex flex-col relative">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="border-t border-[#404040] py-4 text-center text-gray-500 text-sm shrink-0 mt-auto">
      <p>&copy; 2025 ScaleAlpha.ai. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>