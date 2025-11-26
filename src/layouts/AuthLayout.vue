<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Decorations -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full filter blur-[100px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full filter blur-[100px]"></div>

    <!-- Logo -->
    <router-link to="/" class="mb-8 flex items-center gap-2 relative z-10">
      <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
        <span class="text-white font-bold text-xl">Ⓐ</span>
      </div>
      <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        ScaleAlpha.ai
      </span>
    </router-link>

    <!-- Content Card -->
    <div class="w-full max-w-md bg-[#2a2a2a] border border-[#404040] rounded-2xl shadow-2xl relative z-10 overflow-hidden">
      <slot></slot>
    </div>
    
    <div class="mt-8 text-center text-sm text-gray-500 relative z-10">
      <router-link to="/" class="hover:text-gray-300 transition">← 返回首页</router-link>
    </div>
  </div>
</template>
