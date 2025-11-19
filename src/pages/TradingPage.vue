<template>
  <div class="bg-[#1a1a1a] min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">交易机会</h1>
      <div class="bg-[#2a2a2a] rounded-2xl p-8 border border-[#404040]">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">实时交易数据</h2>
            <div class="space-y-4">
              <div v-for="i in 5" :key="i" class="bg-[#1a1a1a] p-4 rounded-lg border border-[#404040]">
                <div class="flex justify-between items-center">
                  <span class="font-bold">交易对 {{ i }}</span>
                  <span class="text-green-400">+{{ (Math.random() * 5).toFixed(2) }}%</span>
                </div>
                <p class="text-gray-400 text-sm mt-2">当前价格: ${{ (Math.random() * 1000).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold mb-4">我的交易</h2>
            <button class="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition mb-4">
              创建新交易
            </button>
            <div class="space-y-4">
              <div v-for="i in 3" :key="i" class="bg-[#1a1a1a] p-4 rounded-lg border border-[#404040]">
                <h3 class="font-bold mb-2">交易 {{ i }}</h3>
                <p class="text-gray-400 text-sm">状态: 进行中</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
