<template>
  <div class="min-h-screen bg-[#1a1a1a] text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold">投资组合</h1>
        <button
          @click="generatePortfolio"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/50"
        >
          生成推荐组合
        </button>
      </div>

      <!-- Portfolio Content Placeholder -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-8 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-white mb-2">投资组合即将就绪</h2>
        <p class="text-gray-400 mb-6">点击上方按钮生成个性化的投资组合推荐</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useWorkflowProgress } from '../composables/useWorkflowProgress'

const router = useRouter()
const { updateProgress } = useWorkflowProgress()

const generatePortfolio = () => {
  // 标记组合已生成
  updateProgress('hasGeneratedPortfolio', true)
  
  alert('组合生成成功！即将跳转到洞察报告页面...')
  
  // 跳转到洞察页面
  router.push('/insight')
}
</script>
