<template>
  <div class="bg-[#2a2a2a] rounded-xl p-5 border border-[#404040] hover:border-blue-500 transition cursor-pointer group h-full flex flex-col relative">
    <!-- Add to Watchlist Button -->
    <button 
      @click.stop="toggleWatchlistMenu"
      class="absolute top-3 right-3 p-1.5 rounded-lg bg-[#1a1a1a] border border-[#404040] hover:border-blue-500 opacity-0 group-hover:opacity-100 transition-all z-10"
      :title="isFollowing ? '管理自选组' : '添加到自选组'"
    >
      <svg 
        :class="[
          'w-4 h-4 transition',
          isFollowing ? 'text-blue-400' : 'text-gray-400'
        ]"
        :fill="isFollowing ? 'currentColor' : 'none'"
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>

    <!-- Watchlist Menu Dropdown -->
    <div 
      v-if="showWatchlistMenu"
      @click.stop
      class="absolute top-12 right-3 z-50 w-48 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
    >
      <div class="max-h-64 overflow-y-auto">
        <div 
          v-for="group in availableGroups"
          :key="group.id"
          @click="toggleAssetInGroup(group.id)"
          class="px-4 py-2.5 hover:bg-[#3a3a3a] cursor-pointer transition flex items-center justify-between"
        >
          <span class="text-sm text-gray-300">{{ group.name }}</span>
          <svg 
            v-if="isInGroup(group.id)"
            class="w-4 h-4 text-blue-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div v-if="availableGroups.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
          暂无自选组
        </div>
      </div>
    </div>

    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
          {{ code.charAt(0) }}
        </div>
        <div>
          <h3 class="font-bold text-white group-hover:text-blue-400 transition">{{ code }}</h3>
          <p class="text-xs text-gray-400">{{ name }}</p>
        </div>
      </div>
      <span :class="change >= 0 ? 'text-red-400' : 'text-green-400'" class="font-mono font-bold mr-8">
        {{ change >= 0 ? '+' : '' }}{{ change }}%
      </span>
    </div>
    
    <div class="flex-grow">
      <p class="text-sm text-gray-300 line-clamp-3 mb-3">{{ summary }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#404040]">
      <span v-for="tag in tags" :key="tag" class="px-2 py-1 bg-[#1a1a1a] rounded text-[10px] text-gray-500 border border-[#404040]">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWatchlists } from '../../composables/useWatchlists'

const props = defineProps({
  code: String,
  name: String,
  change: Number,
  summary: String,
  tags: Array
})

const {
  watchlists,
  isAssetFollowing,
  isAssetInGroup,
  toggleAssetInGroup: toggleAsset
} = useWatchlists()

const showWatchlistMenu = ref(false)

const availableGroups = computed(() => watchlists.value)
const isFollowing = computed(() => isAssetFollowing(props.code))

const toggleWatchlistMenu = () => {
  showWatchlistMenu.value = !showWatchlistMenu.value
}

const isInGroup = (groupId) => {
  return isAssetInGroup(groupId, props.code)
}

const toggleAssetInGroup = (groupId) => {
  toggleAsset(groupId, props.code)
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (showWatchlistMenu.value && !event.target.closest('.bg-\\[\\#2a2a2a\\]')) {
    showWatchlistMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
