<template>
  <div class="p-6">
    <div class="mb-6">
      <router-link to="/info" class="text-blue-400 hover:text-blue-300 flex items-center gap-1">
        ← 返回信息中心
      </router-link>
    </div>
    <h1 class="text-3xl font-bold mb-4">ETF详情: {{ $route.params.id }}</h1>
    <div class="bg-[#2a2a2a] h-64 rounded-xl border border-[#404040] flex items-center justify-center">
      <p class="text-gray-500">此处展示ETF深度数据</p>
    </div>
  </div>
</template>
