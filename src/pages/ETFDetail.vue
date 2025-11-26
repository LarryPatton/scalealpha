<template>
  <div class="p-6">
    <div class="mb-6">
      <router-link to="/info" class="text-blue-400 hover:text-blue-300 flex items-center gap-1">
        ← 返回信息中心
      </router-link>
    </div>
    <h1 class="text-3xl font-bold mb-4">ETF详情: {{ $route.params.id }}</h1>
    <div class="bg-[#2a2a2a] h-64 rounded-xl border border-[#404040] flex items-center justify-center mb-6">
      <p class="text-gray-500">此处展示ETF深度数据</p>
    </div>
    
    <!-- Watchlist Management Button -->
    <div class="relative">
      <button 
        @click="handleButtonClick"
        :class="[
          'w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
          isFollowing 
            ? 'bg-purple-500/20 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/30' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        ]"
      >
        <svg 
          class="w-5 h-5" 
          :fill="isFollowing ? 'currentColor' : 'none'"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <span>{{ buttonText }}</span>
      </button>

      <!-- Watchlist Management Menu (shown when already following) -->
      <div 
        v-if="showManagementMenu"
        @click.stop
        class="absolute top-full left-0 right-0 mt-2 z-50 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
      >
        <div class="p-4 border-b border-[#404040]">
          <h3 class="text-sm font-semibold text-gray-300 mb-2">管理自选组</h3>
          <p class="text-xs text-gray-500">已加入 {{ followingGroups.length }} 个自选组</p>
        </div>
        
        <div class="max-h-64 overflow-y-auto">
          <div 
            v-for="group in availableGroups"
            :key="group.id"
            @click="toggleAssetInGroup(group.id)"
            class="px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer transition flex items-center justify-between group"
          >
            <div class="flex items-center gap-3">
              <div 
                :class="[
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition',
                  isInGroup(group.id)
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-600 group-hover:border-purple-500'
                ]"
              >
                <svg 
                  v-if="isInGroup(group.id)"
                  class="w-3 h-3 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <span class="text-sm text-gray-300">{{ group.name }}</span>
            </div>
            <span v-if="isInGroup(group.id)" class="text-xs text-purple-400">已加入</span>
          </div>
          <div v-if="availableGroups.length === 0" class="px-4 py-6 text-sm text-gray-500 text-center">
            <p class="mb-2">暂无自选组</p>
            <p class="text-xs text-gray-600">前往信息中心创建您的第一个自选组</p>
          </div>
        </div>
        
        <div class="p-3 border-t border-[#404040] bg-[#1a1a1a]">
          <button
            @click="removeFromAllGroups"
            class="w-full py-2 px-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm font-medium"
          >
            从所有自选组中移除
          </button>
        </div>
      </div>

      <!-- Add to Watchlist Menu (shown when not following) -->
      <div 
        v-if="showAddMenu"
        @click.stop
        class="absolute top-full left-0 right-0 mt-2 z-50 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
      >
        <div class="p-4 border-b border-[#404040]">
          <h3 class="text-sm font-semibold text-gray-300">选择自选组</h3>
        </div>
        
        <div class="max-h-64 overflow-y-auto">
          <div 
            v-for="group in availableGroups"
            :key="group.id"
            @click="addToGroup(group.id)"
            class="px-4 py-3 hover:bg-[#3a3a3a] cursor-pointer transition flex items-center justify-between"
          >
            <span class="text-sm text-gray-300">{{ group.name }}</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div v-if="availableGroups.length === 0" class="px-4 py-6 text-sm text-gray-500 text-center">
            <p class="mb-2">暂无自选组</p>
            <p class="text-xs text-gray-600">前往信息中心创建您的第一个自选组</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWatchlists } from '../composables/useWatchlists'

const route = useRoute()

const {
  watchlists,
  isAssetFollowing,
  isAssetInGroup,
  toggleAssetInGroup: toggleAsset,
  addAssetToGroup,
  getGroupsForAsset,
  removeAssetFromGroup
} = useWatchlists()

const showManagementMenu = ref(false)
const showAddMenu = ref(false)

// Get the ETF code from route params
const etfCode = computed(() => route.params.id)

// Check if ETF is in any watchlist
const isFollowing = computed(() => isAssetFollowing(etfCode.value))

// Get all groups containing this ETF
const followingGroups = computed(() => getGroupsForAsset(etfCode.value))

// Get available groups
const availableGroups = computed(() => watchlists.value)

// Button text based on following status
const buttonText = computed(() => {
  if (isFollowing.value) {
    return '管理自选组'
  }
  return '加入自选组'
})

// Handle button click
const handleButtonClick = () => {
  if (isFollowing.value) {
    showManagementMenu.value = !showManagementMenu.value
    showAddMenu.value = false
  } else {
    showAddMenu.value = !showAddMenu.value
    showManagementMenu.value = false
  }
}

// Check if ETF is in a specific group
const isInGroup = (groupId) => {
  return isAssetInGroup(groupId, etfCode.value)
}

// Toggle asset in group
const toggleAssetInGroup = (groupId) => {
  toggleAsset(groupId, etfCode.value)
}

// Add to a specific group and close menu
const addToGroup = (groupId) => {
  addAssetToGroup(groupId, etfCode.value)
  showAddMenu.value = false
}

// Remove from all groups
const removeFromAllGroups = () => {
  followingGroups.value.forEach(group => {
    removeAssetFromGroup(group.id, etfCode.value)
  })
  showManagementMenu.value = false
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
  if (!target.closest('button') && !target.closest('.absolute')) {
    showManagementMenu.value = false
    showAddMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
