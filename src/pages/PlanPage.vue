<template>
  <div class="bg-[#1a1a1a] min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">交易计划</h1>
      <div class="bg-[#2a2a2a] rounded-2xl p-8 border border-[#404040] mb-8">
        <h2 class="text-2xl font-bold mb-6">创建您的交易计划</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold mb-2">计划名称</label>
            <input type="text" placeholder="输入计划名称" class="w-full px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:border-blue-500 focus:outline-none">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">目标收益率 (%)</label>
            <input type="number" placeholder="输入目标收益率" class="w-full px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:border-blue-500 focus:outline-none">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">投资金额</label>
            <input type="number" placeholder="输入投资金额" class="w-full px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:border-blue-500 focus:outline-none">
          </div>
          <div>
            <label class="block text-sm font-semibold mb-2">持仓周期</label>
            <select class="w-full px-4 py-2 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white focus:border-blue-500 focus:outline-none">
              <option>短期 (1-7天)</option>
              <option>中期 (1-3个月)</option>
              <option>长期 (3个月+)</option>
            </select>
          </div>
        </div>
        <button class="mt-6 w-full md:w-48 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition">
          创建计划
        </button>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-6">我的交易计划</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="i in 6" :key="i" class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-[#505050] transition">
            <h3 class="font-bold text-lg mb-2">计划 {{ i }}</h3>
            <div class="space-y-2 text-sm text-gray-400 mb-4">
              <p>投资金额: ${{ (Math.random() * 10000).toFixed(2) }}</p>
              <p>目标收益: {{ (Math.random() * 20).toFixed(1) }}%</p>
              <p>当前收益: {{ (Math.random() * 15 - 5).toFixed(1) }}%</p>
              <p>状态: <span class="text-green-400">进行中</span></p>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 py-2 bg-blue-500 rounded hover:bg-blue-600 transition text-sm">查看详情</button>
              <button class="flex-1 py-2 bg-red-500 rounded hover:bg-red-600 transition text-sm">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
