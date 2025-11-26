<template>
  <aside class="w-[260px] bg-[#1f1f1f] border-r border-[#2a2a2a] h-full flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b border-[#2a2a2a]">
      <h2 class="text-lg font-bold text-white mb-4">我的自选</h2>
      <button 
        @click="showCreateModal = true"
        class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        新建自选组
      </button>
    </div>

    <!-- Watchlist Groups -->
    <div class="flex-1 overflow-y-auto py-2">
      <!-- Default Group: All Following -->
      <div 
        @click="selectGroup('all')"
        :class="[
          'group mx-3 mb-1 px-4 py-3 rounded-lg cursor-pointer transition-all relative',
          selectedGroupId === 'all' 
            ? 'bg-blue-500/10 border-l-2 border-blue-500' 
            : 'hover:bg-[#2a2a2a]'
        ]"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3 flex-1">
            <svg 
              :class="[
                'w-5 h-5 transition-colors',
                selectedGroupId === 'all' ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-400'
              ]"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span 
              :class="[
                'text-sm font-medium',
                selectedGroupId === 'all' ? 'text-white' : 'text-gray-300 group-hover:text-white'
              ]"
            >
              全部关注
            </span>
          </div>
          <span 
            :class="[
              'text-xs px-2 py-0.5 rounded-full',
              selectedGroupId === 'all' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-[#2a2a2a] text-gray-500'
            ]"
          >
            {{ totalFollowingCount }}
          </span>
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-6 my-3 border-t border-[#2a2a2a]"></div>

      <!-- Custom Groups -->
      <div class="space-y-1">
        <div 
          v-for="group in customGroups"
          :key="group.id"
          @click="selectGroup(group.id)"
          :class="[
            'group mx-3 px-4 py-3 rounded-lg cursor-pointer transition-all relative',
            selectedGroupId === group.id 
              ? 'bg-blue-500/10 border-l-2 border-blue-500' 
              : 'hover:bg-[#2a2a2a]'
          ]"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <svg 
                :class="[
                  'w-5 h-5 flex-shrink-0 transition-colors',
                  selectedGroupId === group.id ? 'text-blue-500' : 'text-gray-500 group-hover:text-gray-400'
                ]"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span 
                :class="[
                  'text-sm font-medium truncate flex-1',
                  selectedGroupId === group.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                ]"
              >
                {{ group.name }}
              </span>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              <span 
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  selectedGroupId === group.id 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-[#2a2a2a] text-gray-500'
                ]"
              >
                {{ group.assets.length }}
              </span>
              <!-- More Menu Button -->
              <button
                @click.stop="toggleMenu(group.id)"
                class="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#3a3a3a] rounded transition-all"
              >
                <svg class="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Dropdown Menu -->
          <div 
            v-if="activeMenuGroupId === group.id"
            class="absolute right-2 top-12 z-50 w-40 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl overflow-hidden"
          >
            <button
              @click.stop="renameGroup(group)"
              class="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#3a3a3a] hover:text-white transition flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              重命名
            </button>
            <button
              @click.stop="setDefaultGroup(group.id)"
              class="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#3a3a3a] hover:text-white transition flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              设为默认
            </button>
            <div class="border-t border-[#404040]"></div>
            <button
              @click.stop="deleteGroup(group.id)"
              class="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              删除
            </button>
          </div>
        </div>

        <!-- Empty State for Custom Groups -->
        <div v-if="customGroups.length === 0" class="px-6 py-8 text-center">
          <svg class="w-10 h-10 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <p class="text-xs text-gray-500">暂无自定义组</p>
          <p class="text-xs text-gray-600 mt-1">点击上方按钮创建</p>
        </div>
      </div>
    </div>

    <!-- Footer Hint -->
    <div class="p-4 border-t border-[#2a2a2a] bg-[#1a1a1a]">
      <p class="text-xs text-gray-600 text-center leading-relaxed">
        💡 在资产卡片上可快速添加到组
      </p>
    </div>

    <!-- Create Group Modal -->
    <Teleport to="body">
      <div 
        v-if="showCreateModal"
        @click="showCreateModal = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
      >
        <div 
          @click.stop
          class="bg-[#2a2a2a] rounded-xl border border-[#404040] p-6 w-full max-w-md mx-4 shadow-2xl"
        >
          <h3 class="text-lg font-bold text-white mb-4">新建自选组</h3>
          <input
            v-model="newGroupName"
            @keyup.enter="createGroup"
            type="text"
            placeholder="输入自选组名称"
            class="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
            autofocus
          />
          <div class="flex gap-3 mt-6">
            <button
              @click="showCreateModal = false"
              class="flex-1 px-4 py-2.5 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg text-sm font-medium transition"
            >
              取消
            </button>
            <button
              @click="createGroup"
              :disabled="!newGroupName.trim()"
              class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              创建
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Rename Group Modal -->
    <Teleport to="body">
      <div 
        v-if="showRenameModal"
        @click="showRenameModal = false"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
      >
        <div 
          @click.stop
          class="bg-[#2a2a2a] rounded-xl border border-[#404040] p-6 w-full max-w-md mx-4 shadow-2xl"
        >
          <h3 class="text-lg font-bold text-white mb-4">重命名自选组</h3>
          <input
            v-model="renameGroupName"
            @keyup.enter="confirmRename"
            type="text"
            placeholder="输入新名称"
            class="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#404040] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition"
            autofocus
          />
          <div class="flex gap-3 mt-6">
            <button
              @click="showRenameModal = false"
              class="flex-1 px-4 py-2.5 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg text-sm font-medium transition"
            >
              取消
            </button>
            <button
              @click="confirmRename"
              :disabled="!renameGroupName.trim()"
              class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  selectedGroupId: {
    type: String,
    default: 'all'
  },
  customGroups: {
    type: Array,
    default: () => []
  },
  totalFollowingCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits([
  'select-group',
  'create-group',
  'rename-group',
  'delete-group',
  'set-default-group'
])

// Modal states
const showCreateModal = ref(false)
const showRenameModal = ref(false)
const newGroupName = ref('')
const renameGroupName = ref('')
const renameTargetGroup = ref(null)

// Menu state
const activeMenuGroupId = ref(null)

// Methods
const selectGroup = (groupId) => {
  emit('select-group', groupId)
}

const toggleMenu = (groupId) => {
  activeMenuGroupId.value = activeMenuGroupId.value === groupId ? null : groupId
}

const createGroup = () => {
  if (newGroupName.value.trim()) {
    emit('create-group', newGroupName.value.trim())
    newGroupName.value = ''
    showCreateModal.value = false
  }
}

const renameGroup = (group) => {
  renameTargetGroup.value = group
  renameGroupName.value = group.name
  showRenameModal.value = true
  activeMenuGroupId.value = null
}

const confirmRename = () => {
  if (renameGroupName.value.trim() && renameTargetGroup.value) {
    emit('rename-group', {
      id: renameTargetGroup.value.id,
      name: renameGroupName.value.trim()
    })
    showRenameModal.value = false
    renameGroupName.value = ''
    renameTargetGroup.value = null
  }
}

const deleteGroup = (groupId) => {
  if (confirm('确定要删除这个自选组吗？')) {
    emit('delete-group', groupId)
    activeMenuGroupId.value = null
  }
}

const setDefaultGroup = (groupId) => {
  emit('set-default-group', groupId)
  activeMenuGroupId.value = null
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (activeMenuGroupId.value && !event.target.closest('.group')) {
    activeMenuGroupId.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
