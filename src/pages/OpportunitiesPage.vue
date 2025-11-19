<template>
  <div class="bg-[#1a1a1a] min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">机会发现</h1>
      <div class="grid md:grid-cols-3 gap-6">
        <div v-for="i in 12" :key="i" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-[#505050] transition">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 mb-4"></div>
          <h3 class="font-bold mb-2">机会 {{ i }}</h3>
          <p class="text-gray-400 text-sm mb-4">这是一个投资机会的描述</p>
          <button class="w-full py-2 bg-blue-500 rounded hover:bg-blue-600 transition">查看详情</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
