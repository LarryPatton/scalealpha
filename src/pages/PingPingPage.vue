<template>
  <div class="bg-[#1a1a1a] min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">盘盘提醒</h1>
      <p class="text-gray-400 mb-8">实时市场盘前盘后提醒和通知</p>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-[#505050] transition">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg">今日重要提醒</h3>
            <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">3</span>
          </div>
          <div class="space-y-3">
            <div class="p-3 bg-[#1a1a1a] rounded border border-[#404040]">
              <p class="text-sm text-gray-300">美联储利率决议发布</p>
              <p class="text-xs text-gray-500 mt-1">14:30 UTC</p>
            </div>
            <div class="p-3 bg-[#1a1a1a] rounded border border-[#404040]">
              <p class="text-sm text-gray-300">NVIDIA财报发布</p>
              <p class="text-xs text-gray-500 mt-1">16:00 UTC</p>
            </div>
            <div class="p-3 bg-[#1a1a1a] rounded border border-[#404040]">
              <p class="text-sm text-gray-300">原油库存数据</p>
              <p class="text-xs text-gray-500 mt-1">15:30 UTC</p>
            </div>
          </div>
        </div>

        <div class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-[#505050] transition">
          <h3 class="font-bold text-lg mb-4">价格预警</h3>
          <div class="space-y-3">
            <div class="p-3 bg-[#1a1a1a] rounded border border-[#404040]">
              <div class="flex justify-between items-center">
                <span class="text-sm">AAPL</span>
                <span class="text-green-400 text-sm">+2.5%</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">已触发 $180 目标价</p>
            </div>
            <div class="p-3 bg-[#1a1a1a] rounded border border-[#404040]">
              <div class="flex justify-between items-center">
                <span class="text-sm">TSLA</span>
                <span class="text-red-400 text-sm">-1.8%</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">跌破支撑位 $240</p>
            </div>
          </div>
        </div>

        <div class="bg-[#2a2a2a] rounded-xl p-6 border border-[#404040] hover:border-[#505050] transition">
          <h3 class="font-bold text-lg mb-4">自定义提醒</h3>
          <button class="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition mb-4">
            + 添加新提醒
          </button>
          <div class="space-y-2 text-sm text-gray-400">
            <p>• 价格变动提醒</p>
            <p>• 技术面提醒</p>
            <p>• 新闻事件提醒</p>
            <p>• 财报发布提醒</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
