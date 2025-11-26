<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <!-- Icon -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border border-blue-500/30">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        一键交易
      </h1>
      
      <!-- Description -->
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        智能化交易执行平台，让您的交易策略快速落地
      </p>

      <!-- Feature Preview -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-8 mb-8">
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">快速执行</h3>
            <p class="text-sm text-gray-400">一键下单，毫秒级执行</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">智能提醒</h3>
            <p class="text-sm text-gray-400">实时监控，精准提醒</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">风险控制</h3>
            <p class="text-sm text-gray-400">自动止损，保护资产</p>
          </div>
        </div>
      </div>

      <!-- Coming Soon Badge -->
      <div class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-full">
        <svg class="w-5 h-5 text-blue-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <span class="text-blue-300 font-medium">功能开发中，即将上线</span>
      </div>

      <!-- Back Button -->
      <div class="mt-8">
        <router-link 
          to="/home" 
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
