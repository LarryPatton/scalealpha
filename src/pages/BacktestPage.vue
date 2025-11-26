<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <!-- Icon -->
      <div class="mb-8">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border border-purple-500/30">
          <svg class="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        交易复盘
      </h1>
      
      <!-- Description -->
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        全面分析您的交易历史，总结经验教训，持续优化策略
      </p>

      <!-- Feature Preview -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-8 mb-8">
        <div class="grid md:grid-cols-3 gap-6 text-left">
          <div class="space-y-2">
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">交易记录</h3>
            <p class="text-sm text-gray-400">完整的交易历史追踪</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">绩效分析</h3>
            <p class="text-sm text-gray-400">多维度绩效指标评估</p>
          </div>

          <div class="space-y-2">
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-white">AI洞察</h3>
            <p class="text-sm text-gray-400">智能总结优化建议</p>
          </div>
        </div>
      </div>

      <!-- Coming Soon Badge -->
      <div class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full">
        <svg class="w-5 h-5 text-purple-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
        <span class="text-purple-300 font-medium">功能开发中，即将上线</span>
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
