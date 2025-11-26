<template>
  <Teleport to="body">
    <div 
      v-if="isOpen"
      @click.self="closeDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div class="bg-[#2a2a2a] rounded-2xl border border-[#404040] shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-[#404040] flex items-center justify-between">
          <h2 class="text-xl font-bold text-white">保存报告</h2>
          <button 
            @click="closeDialog"
            class="w-8 h-8 rounded-lg bg-[#3a3a3a] hover:bg-[#404040] text-gray-400 hover:text-white transition-colors flex items-center justify-center"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          <!-- Selected Reports Info -->
          <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div class="flex items-center gap-2 text-blue-400 mb-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
              <span class="font-semibold">已选择 {{ selectedReportCount }} 份报告</span>
            </div>
            <div class="text-sm text-gray-300">
              {{ selectedReportSymbols }}
            </div>
          </div>

          <!-- Tab: Create New or Select Existing -->
          <div class="flex gap-2 bg-[#1f1f1f] rounded-lg p-1">
            <button
              @click="activeTab = 'existing'"
              :class="[
                'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                activeTab === 'existing' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              ]"
            >
              选择现有分类
            </button>
            <button
              @click="activeTab = 'new'"
              :class="[
                'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                activeTab === 'new' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              ]"
            >
              创建新分类
            </button>
          </div>

          <!-- Existing Categories -->
          <div v-if="activeTab === 'existing'" class="space-y-3">
            <div v-if="categories.length === 0" class="text-center py-8">
              <svg class="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <p class="text-gray-400 mb-2">暂无分类</p>
              <p class="text-sm text-gray-500">点击"创建新分类"开始使用</p>
            </div>

            <div 
              v-for="category in categories" 
              :key="category.id"
              @click="selectedCategoryId = category.id"
              :class="[
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                selectedCategoryId === category.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-[#404040] bg-[#1f1f1f] hover:border-gray-500'
              ]"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                  </svg>
                  <span class="font-semibold text-white">{{ category.name }}</span>
                </div>
                <span class="text-xs text-gray-400">{{ category.reports.length }} 份报告</span>
              </div>
              <div class="text-xs text-gray-500">
                创建于 {{ formatDate(category.createdAt) }}
              </div>
            </div>
          </div>

          <!-- Create New Category -->
          <div v-if="activeTab === 'new'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">分类名称</label>
              <input
                v-model="newCategoryName"
                type="text"
                placeholder="例如：科技股机会、短线交易、价值投资..."
                class="w-full px-4 py-3 bg-[#1f1f1f] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                @keyup.enter="createAndSave"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">备注（可选）</label>
              <textarea
                v-model="newCategoryDescription"
                placeholder="添加一些描述..."
                rows="3"
                class="w-full px-4 py-3 bg-[#1f1f1f] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-[#404040] flex justify-end gap-3">
          <button
            @click="closeDialog"
            class="px-6 py-2.5 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            @click="saveReports"
            :disabled="!canSave"
            :class="[
              'px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2',
              canSave
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
            </svg>
            <span>保存</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  selectedReports: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])

// State
const activeTab = ref('existing')
const categories = ref([])
const selectedCategoryId = ref(null)
const newCategoryName = ref('')
const newCategoryDescription = ref('')

// Computed
const selectedReportCount = computed(() => props.selectedReports.length)

const selectedReportSymbols = computed(() => {
  return props.selectedReports.map(r => r.symbol).join(', ')
})

const canSave = computed(() => {
  if (activeTab.value === 'existing') {
    return selectedCategoryId.value !== null
  } else {
    return newCategoryName.value.trim().length > 0
  }
})

// Methods
const closeDialog = () => {
  emit('close')
  resetForm()
}

const resetForm = () => {
  activeTab.value = 'existing'
  selectedCategoryId.value = null
  newCategoryName.value = ''
  newCategoryDescription.value = ''
}

const loadCategories = () => {
  const saved = localStorage.getItem('opportunity_report_categories')
  if (saved) {
    try {
      categories.value = JSON.parse(saved)
    } catch (e) {
      console.error('Failed to load categories:', e)
      categories.value = []
    }
  }
}

const saveCategories = () => {
  localStorage.setItem('opportunity_report_categories', JSON.stringify(categories.value))
}

const createAndSave = () => {
  if (!newCategoryName.value.trim()) return
  
  const newCategory = {
    id: `category-${Date.now()}`,
    name: newCategoryName.value.trim(),
    description: newCategoryDescription.value.trim(),
    createdAt: new Date().toISOString(),
    reports: [...props.selectedReports]
  }
  
  categories.value.unshift(newCategory)
  saveCategories()
  
  emit('save', {
    categoryId: newCategory.id,
    categoryName: newCategory.name,
    isNew: true
  })
  
  closeDialog()
}

const saveReports = () => {
  if (activeTab.value === 'new') {
    createAndSave()
  } else {
    const category = categories.value.find(c => c.id === selectedCategoryId.value)
    if (!category) return
    
    // Add reports to existing category (avoid duplicates)
    const existingIds = new Set(category.reports.map(r => r.id))
    const newReports = props.selectedReports.filter(r => !existingIds.has(r.id))
    category.reports.push(...newReports)
    
    saveCategories()
    
    emit('save', {
      categoryId: category.id,
      categoryName: category.name,
      isNew: false,
      addedCount: newReports.length
    })
    
    closeDialog()
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

// Lifecycle
onMounted(() => {
  loadCategories()
})
</script>
