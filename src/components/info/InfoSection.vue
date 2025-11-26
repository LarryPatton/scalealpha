<template>
  <section class="py-8 border-b border-[#2a2a2a] last:border-0">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-1 h-6 bg-blue-500 rounded-full"></div>
        <h2 class="text-xl font-bold text-white">{{ title }}</h2>
        <span class="px-2 py-0.5 bg-[#2a2a2a] rounded text-xs text-gray-500 border border-[#404040]">
          {{ items.length }}
        </span>
      </div>
    </div>

    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <component 
        :is="getComponentByType(type)"
        v-for="item in displayedItems"
        :key="item.id"
        v-bind="item"
        @click="$emit('card-click', item.id)"
      />
    </div>

    <!-- Show More Button -->
    <div v-if="items.length > initialCount" class="mt-8 text-center">
      <button 
        @click="isExpanded = !isExpanded"
        class="inline-flex items-center gap-2 px-6 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 hover:text-white rounded-full text-sm font-medium transition border border-[#404040] hover:border-gray-500"
      >
        <span>{{ isExpanded ? '收起内容' : `显示更多${title}` }}</span>
        <svg 
          class="w-4 h-4 transition-transform duration-300" 
          :class="{ 'rotate-180': isExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import MarketCard from './MarketCard.vue'
import ETFCard from './ETFCard.vue'
import StockCard from './StockCard.vue'
import CommunityCard from './CommunityCard.vue'
import OfficialCard from './OfficialCard.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  initialCount: {
    type: Number,
    default: 4
  }
})

defineEmits(['card-click'])

const isExpanded = ref(false)

const displayedItems = computed(() => {
  if (isExpanded.value) {
    return props.items
  }
  return props.items.slice(0, props.initialCount)
})

const getComponentByType = (type) => {
  switch (type) {
    case 'market': return MarketCard
    case 'etf': return ETFCard
    case 'stock': return StockCard
    case 'community': return CommunityCard
    case 'official': return OfficialCard
    default: return null
  }
}
</script>
