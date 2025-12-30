<template>
  <div class="min-h-screen p-8" :style="{ backgroundColor: tokens.colors.background.base }">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-2" :style="{ color: tokens.colors.text.primary }">Theme Visualization Design Options</h1>
      <p class="mb-8" :style="{ color: tokens.colors.text.tertiary }">Comparing two different approaches for the "Theme Discovery" section preview.</p>

      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Option B -->
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">Option B: UI Simulator</h2>
            <span class="px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400">Focus: Usability</span>
          </div>
          <p class="text-sm h-12" :style="{ color: tokens.colors.text.muted }">
            Simulates a user interacting with the dashboard. Shows filtering, hovering, and data discovery in a familiar grid layout. Best for showing "how it works".
          </p>
          <div class="h-[500px] border rounded-lg overflow-hidden shadow-xl" :style="{ borderColor: tokens.colors.border.strong }">
            <HomeThemePreviewOptionB />
          </div>
        </div>

        <!-- Option C -->
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">Option C: Composition Breakdown</h2>
            <span class="px-2 py-1 rounded text-xs font-bold bg-purple-500/20 text-purple-400">Focus: Data Depth</span>
          </div>
          <p class="text-sm h-12" :style="{ color: tokens.colors.text.muted }">
            Abstract visualization of themes as planets with stock satellites. Emphasizes the relationship between themes and their constituents. Best for "visual impact".
          </p>
          <div class="h-[500px] border rounded-lg overflow-hidden shadow-xl" :style="{ borderColor: tokens.colors.border.strong }">
            <HomeThemePreviewOptionC />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeThemePreviewOptionB from '../components/home/HomeThemePreviewOptionB.vue'
import HomeThemePreviewOptionC from '../components/home/HomeThemePreviewOptionC.vue'
import { useTheme } from '../composables/useTheme'

const { tokens } = useTheme()
</script>