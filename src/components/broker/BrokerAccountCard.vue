<template>
  <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
    <!-- 未关联状态 -->
    <div v-if="!isConnected && !isConnecting">
      <div class="text-center">
        <h3 class="text-xl font-bold text-white mb-2">关联券商账户</h3>
        <p class="text-gray-400 mb-6">
          关联您的券商账户，解锁一键交易功能，让投资决策快速落地
        </p>
        
        <!-- Features -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 text-sm">
          <div class="flex items-center gap-2 text-green-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>安全的OAuth认证</span>
          </div>
          <div class="flex items-center gap-2 text-blue-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>支持主流券商</span>
          </div>
          <div class="flex items-center gap-2 text-purple-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>智能风险管理</span>
          </div>
        </div>
        
        <!-- CTA Button -->
        <button
          @click="showBrokerDialog = true"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30"
        >
          立即关联券商账户
        </button>
      </div>
    </div>
    
    <!-- 关联中状态 -->
    <div v-else-if="isConnecting" class="text-center py-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
        <svg class="w-8 h-8 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      </div>
      <h3 class="text-lg font-bold text-white mb-2">正在关联券商账户...</h3>
      <p class="text-gray-400">请稍候，正在验证您的身份</p>
    </div>
    
    <!-- 已关联状态 -->
    <div v-else>
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-4">
          <!-- Broker Badge -->
          <div 
            class="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            :style="{ backgroundColor: brokerAccount.broker.color }"
          >
            {{ brokerAccount.broker.name.substring(0, 2) }}
          </div>
          
          <div>
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-bold text-white">{{ brokerAccount.broker.name }}</h3>
              <span class="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                已关联
              </span>
            </div>
            <p class="text-sm text-gray-400">账户: {{ brokerAccount.accountNumber }}</p>
          </div>
        </div>
      </div>
      
      <!-- Account Info -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div class="p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <div class="text-xs text-gray-400 mb-1">可用资金</div>
          <div class="text-lg font-bold text-green-400">{{ formatMoney(brokerAccount.balance) }}</div>
        </div>
        <div class="p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <div class="text-xs text-gray-400 mb-1">持仓市值</div>
          <div class="text-lg font-bold text-blue-400">{{ formatMoney(brokerAccount.marketValue) }}</div>
        </div>
        <div class="p-4 bg-[#1a1a1a] rounded-lg border border-[#404040]">
          <div class="text-xs text-gray-400 mb-1">总资产</div>
          <div class="text-lg font-bold text-white">{{ formatMoney(brokerAccount.totalAssets) }}</div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-[#404040]">
        <span class="text-xs text-gray-500">最后同步: {{ getLastSyncText() }}</span>
        <div class="flex items-center gap-2">
          <button
            @click="handleDisconnect"
            class="px-4 py-2 bg-[#3a3a3a] hover:bg-red-600 text-gray-300 hover:text-white rounded-lg text-sm transition-colors"
          >
            解绑账户
          </button>
          <button
            @click="handleRefresh"
            :disabled="isRefreshing"
            class="px-4 py-2 bg-[#3a3a3a] hover:bg-[#404040] text-white rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {{ isRefreshing ? '刷新中...' : '刷新数据' }}
          </button>
          <button
            @click="handleOneClickTrading"
            class="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-green-500/20"
          >
            一键交易
          </button>
        </div>
      </div>
    </div>
    
    <!-- Broker Selection Dialog -->
    <BrokerSelectionDialog 
      :show="showBrokerDialog"
      @close="showBrokerDialog = false"
      @select="handleBrokerSelect"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBrokerAccount } from '../../composables/useBrokerAccount'
import BrokerSelectionDialog from './BrokerSelectionDialog.vue'

const router = useRouter()
const showBrokerDialog = ref(false)
const isRefreshing = ref(false)

const {
  brokerAccount,
  isConnected,
  isConnecting,
  loadAccount,
  connectAccount,
  disconnectAccount,
  refreshAccount,
  formatMoney,
  getLastSyncText
} = useBrokerAccount()

// Handle broker selection
const handleBrokerSelect = async (broker) => {
  showBrokerDialog.value = false
  const result = await connectAccount(broker)
  
  if (result.success) {
    // Show success message (could use a toast/notification)
    console.log('账户关联成功！')
  }
}

// Handle disconnect
const handleDisconnect = () => {
  disconnectAccount()
}

// Handle refresh
const handleRefresh = async () => {
  isRefreshing.value = true
  await refreshAccount()
  isRefreshing.value = false
}

// Handle one-click trading
const handleOneClickTrading = () => {
  router.push('/scalealpha/trading')
}

// Load account on mount
onMounted(() => {
  loadAccount()
})
</script>
