<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
    <!-- Simple Header -->
    <header class="border-b border-[#404040] bg-[#1a1a1a]/80 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold">Ⓐ</span>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ScaleAlpha.ai
          </span>
        </router-link>

        <!-- Right Actions -->
        <div class="flex items-center gap-4">
          <!-- Pricing Link -->
          <router-link to="/pricing" class="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition">
            Pricing
          </router-link>
          
          <!-- Login Button -->
          <router-link to="/login" class="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#404040] rounded-lg text-sm font-medium transition">
            登录 / 注册
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Simple Footer -->
    <footer class="border-t border-[#404040] py-8 text-center text-gray-500 text-sm">
      <p>&copy; 2025 ScaleAlpha.ai. All rights reserved.</p>
    </footer>
  </div>
</template>
