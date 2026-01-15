<template>
  <div class="flex flex-col h-[calc(100vh-64px)]" :style="{ backgroundColor: tokens.colors.background.primary }">
    <!-- 全局文件上传input（用于收起状态） -->
    <input 
      type="file" 
      ref="globalFileInput" 
      class="hidden" 
      multiple 
      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
      @change="handleGlobalFileSelect" 
    />
    
    <!-- 上传弹窗 -->
    <div 
      v-if="showUploadModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showUploadModal = false"
    >
      <div 
        @click="globalFileInput?.click()"
        @dragover.prevent="isDraggingModal = true"
        @dragleave="isDraggingModal = false"
        @drop.prevent="handleModalDrop"
        class="rounded-xl w-[480px] h-[320px] flex flex-col items-center justify-center cursor-pointer transition border-2 border-dashed"
        :style="{ 
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff', 
          borderColor: isDraggingModal ? '#3b82f6' : tokens.colors.border.strong 
        }"
      >
        <button 
          @click.stop="showUploadModal = false"
          class="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-[#333] flex items-center justify-center text-gray-400 hover:text-white transition"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <div class="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
        </div>
        <p class="text-lg font-medium mb-2" :style="{ color: tokens.colors.text.primary }">拖拽文件到这里或点击选择</p>
        <p class="text-sm" :style="{ color: tokens.colors.text.muted }">支持 PDF, Word, Excel, TXT 格式</p>
      </div>
    </div>

    <!-- 三栏布局主体 -->
    <div class="flex flex-1 overflow-hidden">
      
      <!-- 左栏：数据上传 -->
      <div 
        :style="{ 
          width: leftCollapsed ? '40px' : leftWidth + 'px',
          backgroundColor: tokens.colors.background.secondary,
          borderColor: tokens.colors.border.default
        }"
        class="border-r flex flex-col transition-all duration-300 relative flex-shrink-0 min-h-0"
      >
        <!-- 收起状态 -->
        <div v-if="leftCollapsed" class="h-full flex flex-col items-center justify-between py-4">
          <div class="flex flex-col items-center gap-3">
            <button 
              @click="leftCollapsed = false"
              class="w-8 h-8 rounded-lg flex items-center justify-center transition"
              :style="{ backgroundColor: tokens.colors.background.tertiary, color: tokens.colors.text.secondary }"
              title="展开数据面板"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
            <div class="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center" title="已上传文件">
              <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ uploadedFiles.length }}</span>
          </div>
          <!-- 收起状态下的上传按钮 -->
          <button 
            @click="showUploadModal = true"
            class="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition"
            title="上传文件"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>

        <!-- 展开状态内容 -->
        <template v-else>
          <!-- 左栏统一头部 -->
          <div class="h-[52px] px-4 border-b flex items-center justify-between flex-shrink-0" :style="{ borderColor: tokens.colors.border.default }">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">研究个股</span>
            </div>
            <button 
              @click="leftCollapsed = true"
              class="w-6 h-6 rounded flex items-center justify-center transition hover:opacity-80"
              :style="{ color: tokens.colors.text.muted }"
              title="收起面板"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>
          
          <!-- 左栏内容区（可滚动） -->
          <div class="flex-1 overflow-y-auto">
            <!-- 研究个股选择 -->
            <div class="p-4" :style="{ borderBottom: `1px solid ${tokens.colors.border.default}` }">
              <!-- 搜索框 -->
          <div class="relative">
            <input 
              v-model="stockSearchQuery"
              @focus="showStockSearch = true"
              @input="searchStocks"
              type="text"
              placeholder="搜索股票代码或名称..."
              class="w-full px-3 py-2 pr-8 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              :style="{ 
                backgroundColor: tokens.colors.background.tertiary, 
                border: `1px solid ${tokens.colors.border.default}`,
                color: tokens.colors.text.primary
              }"
            />
            <svg class="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            
            <!-- 搜索结果下拉 -->
            <div 
              v-if="showStockSearch && stockSearchResults.length > 0"
              class="absolute top-full left-0 right-0 mt-1 rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto"
              :style="{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff', border: `1px solid ${tokens.colors.border.default}` }"
            >
              <div 
                v-for="stock in stockSearchResults"
                :key="stock.code"
                @click="selectStock(stock)"
                class="px-3 py-2 cursor-pointer flex items-center justify-between hover:opacity-80"
                :style="{ backgroundColor: 'transparent' }"
              >
                <div>
                  <span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ stock.code }}</span>
                  <span class="text-sm ml-2" :style="{ color: tokens.colors.text.muted }">{{ stock.name }}</span>
                </div>
                <button 
                  @click.stop="toggleWatchStock(stock)"
                  :class="[
                    'p-1 rounded transition',
                    isStockWatched(stock.code) ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
                  ]"
                >
                  <svg class="w-4 h-4" :fill="isStockWatched(stock.code) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- 当前研究个股 -->
          <div v-if="currentStock" class="mt-3 rounded-lg p-3" :style="{ backgroundColor: tokens.colors.background.tertiary, border: `1px solid ${tokens.colors.border.default}` }">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span class="text-blue-400 text-xs font-bold">{{ currentStock.code.slice(0, 2) }}</span>
                </div>
                <div>
                  <div class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ currentStock.code }}</div>
                  <div class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ currentStock.name }}</div>
                </div>
              </div>
              <button 
                @click="toggleWatchStock(currentStock)"
                :class="[
                  'p-1.5 rounded-lg transition',
                  isStockWatched(currentStock.code) ? 'bg-yellow-500/20 text-yellow-500' : 'bg-[#333] text-gray-400 hover:text-yellow-500'
                ]"
                :title="isStockWatched(currentStock.code) ? '取消关注' : '关注'"
              >
                <svg class="w-4 h-4" :fill="isStockWatched(currentStock.code) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- 已关注个股列表 -->
          <div v-if="watchedStocks.length > 0" class="mt-3">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">已关注</span>
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ watchedStocks.length }} 个</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              <button 
                v-for="stock in watchedStocks"
                :key="stock.code"
                @click="switchToStock(stock)"
                :class="[
                  'px-2 py-1 rounded text-xs transition',
                  currentStock?.code === stock.code 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'bg-[#1f1f1f] text-gray-400 border border-[#333] hover:border-[#444]'
                ]"
              >
                {{ stock.code }}
              </button>
            </div>
          </div>
        </div>

        <!-- 已上传文件列表 / 文件详情 -->
        <div class="p-4">
          <!-- 文件详情视图 -->
          <div v-if="selectedFile" class="space-y-4">
            <button 
              @click="closeFileDetail"
              class="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              返回列表
            </button>
            
            <div class="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-white font-medium truncate">{{ selectedFile.name }}</p>
                  <p class="text-xs text-gray-500">{{ selectedFile.size }}</p>
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">页数</span>
                  <span class="text-white">{{ getFileDetails(selectedFile).pages }} 页</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">上传时间</span>
                  <span class="text-white">{{ getFileDetails(selectedFile).uploadTime }}</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-500">解析状态</span>
                  <span class="text-green-400 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    已解析
                  </span>
                </div>
              </div>
            </div>
            
            <div class="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <h4 class="text-xs font-medium text-gray-400 mb-2">📝 内容摘要</h4>
              <p class="text-sm text-gray-300 leading-relaxed">
                {{ getFileDetails(selectedFile).summary }}
              </p>
            </div>
            
            <div class="flex gap-2">
              <button 
                @click="askAboutFile(selectedFile)"
                class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition"
              >
                基于此文件提问
              </button>
              <button 
                @click="openFileInNewTab(selectedFile)"
                class="px-3 py-2 bg-[#2a2a2a] text-gray-300 text-xs rounded-lg hover:bg-[#333] transition flex items-center gap-1"
                title="在新标签页打开源文件"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                打开
              </button>
            </div>
          </div>
          
          <!-- 文件列表视图 -->
          <template v-else>
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-medium text-gray-400">已上传资料</span>
              <div class="flex items-center gap-2">
                <button 
                  @click="toggleAllFiles"
                  class="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  {{ allFilesChecked ? '取消全选' : '全选' }}
                </button>
                <span class="text-xs text-gray-600">|</span>
                <span class="text-xs text-gray-500">{{ uploadedFiles.length }} 个</span>
              </div>
            </div>

          <!-- 文件列表 -->
          <div class="space-y-2">
            <div 
              v-for="file in uploadedFiles" 
              :key="file.id"
              class="rounded-lg p-3 group transition"
              :style="{ backgroundColor: tokens.colors.background.tertiary, border: `1px solid ${tokens.colors.border.default}` }"
            >
              <div class="flex items-start gap-2">
                <!-- 勾选框 -->
                <button 
                  @click="toggleFileCheck(file.id)"
                  :class="[
                    'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition',
                    file.checked 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-600 hover:border-blue-500'
                  ]"
                >
                  <svg v-if="file.checked" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
                
                <!-- 文件图标 -->
                <div class="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                  </svg>
                </div>
                
                <!-- 文件信息（可点击查看详情） -->
                <div 
                  @click="showFileDetail(file)"
                  class="flex-1 min-w-0 cursor-pointer hover:opacity-80"
                >
                  <p class="text-sm truncate" :style="{ color: tokens.colors.text.primary }">{{ file.name }}</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ file.size }}</p>
                </div>
                
                <!-- 三点菜单 -->
                <div class="relative">
                  <button 
                    @click.stop="toggleFileMenu(file.id)"
                    class="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-white transition rounded hover:bg-[#333]"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                    </svg>
                  </button>
                  
                  <!-- 下拉菜单 -->
                  <div 
                    v-if="activeFileMenu === file.id"
                    class="absolute right-0 top-full mt-1 w-32 bg-[#2a2a2a] border border-[#444] rounded-lg shadow-xl z-50 overflow-hidden"
                  >
                    <button 
                      @click="startRenameFile(file)"
                      class="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#333] flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                      重命名
                    </button>
                    <button 
                      @click="removeFile(file.id)"
                      class="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#333] flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                      移除
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 重命名输入框 -->
              <div v-if="renamingFileId === file.id" class="mt-2">
                <input 
                  v-model="newFileName"
                  @keyup.enter="confirmRename(file.id)"
                  @keyup.esc="cancelRename"
                  type="text"
                  class="w-full px-2 py-1 bg-[#0a0a0a] border border-blue-500 rounded text-white text-sm focus:outline-none"
                  autofocus
                />
                <div class="flex gap-2 mt-2">
                  <button 
                    @click="confirmRename(file.id)"
                    class="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                  >
                    确认
                  </button>
                  <button 
                    @click="cancelRename"
                    class="px-2 py-1 bg-[#333] text-gray-300 text-xs rounded hover:bg-[#444]"
                  >
                    取消
                  </button>
                </div>
              </div>
              
              <div v-else class="mt-2 flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span class="text-xs text-green-400">已解析</span>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="uploadedFiles.length === 0" class="text-center py-8">
            <div class="w-12 h-12 rounded-full bg-[#1f1f1f] flex items-center justify-center mx-auto mb-3">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <p class="text-sm text-gray-500">暂无上传文件</p>
          </div>
          </template>
        </div>
        </div>  <!-- 关闭左栏内容区 flex-1 overflow-y-auto -->

        <!-- 底部上传区域 - 高度与右栏底部统一 -->
        <div class="flex-shrink-0 border-t border-[#333]">
          <!-- 上传按钮区 -->
          <div class="px-4 py-2">
            <div 
              @click="showUploadModal = true"
              @dragover.prevent="isDragging = true"
              @dragleave="isDragging = false"
              @drop.prevent="handleDrop"
              :class="[
                'border border-dashed rounded-lg p-3 text-center cursor-pointer transition flex items-center justify-center gap-3',
                isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-[#333] hover:border-blue-500/50 hover:bg-[#1a1a1a]'
              ]"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <div class="text-left">
                <p class="text-sm text-gray-400">点击上传或拖拽文件</p>
                <p class="text-xs text-gray-600">PDF, Word, Excel, TXT</p>
              </div>
            </div>
          </div>
          <input type="file" ref="fileInput" class="hidden" multiple @change="handleFileSelect" />
          
          <!-- 存储用量 -->
          <div class="px-4 py-2 pt-0">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>存储用量</span>
              <span>45MB / 500MB</span>
            </div>
            <div class="h-1 bg-[#333] rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 rounded-full" style="width: 9%"></div>
            </div>
          </div>
        </div>
        </template>

        <!-- 左栏拖拽调整宽度手柄 -->
        <div 
          v-if="!leftCollapsed"
          @mousedown="startLeftResize"
          class="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-20"
        ></div>
      </div>

      <!-- 中栏：报告生成 -->
      <div class="flex-1 flex flex-col min-h-0 overflow-hidden" :style="{ backgroundColor: tokens.colors.background.primary }">
        <!-- 报告配置区（未生成时显示） -->
        <div v-if="!reportGenerated" class="flex-1 flex flex-col items-center justify-center p-8">
          <div class="max-w-xl w-full">
            <div class="text-center mb-8">
              <div class="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-white mb-2">生成深度研究报告</h2>
              <p class="text-gray-400 text-sm">上传研究资料后，AI 将为您生成全面的分析报告</p>
            </div>

            <!-- 研究类型选择 -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-300 mb-3 block">研究类型</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  v-for="type in researchTypes" 
                  :key="type.id"
                  @click="selectedType = type.id"
                  :class="[
                    'p-4 rounded-lg border text-left transition',
                    selectedType === type.id 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-[#333] bg-[#1a1a1a] hover:border-[#444]'
                  ]"
                >
                  <div class="text-lg mb-1">{{ type.icon }}</div>
                  <div class="text-sm font-medium text-white">{{ type.name }}</div>
                  <div class="text-xs text-gray-500">{{ type.desc }}</div>
                </button>
              </div>
            </div>

            <!-- 自定义要求 -->
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-300 mb-2 block">自定义要求（可选）</label>
              <textarea 
                v-model="customRequirement"
                rows="3"
                placeholder="例如：重点分析服务业务增长潜力和AI布局..."
                class="w-full px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              ></textarea>
            </div>

            <!-- 生成按钮 -->
            <button 
              @click="generateReport"
              :disabled="uploadedFiles.length === 0"
              :class="[
                'w-full py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2',
                uploadedFiles.length > 0 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-[#333] text-gray-500 cursor-not-allowed'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              生成深度研究报告
            </button>

            <p v-if="uploadedFiles.length === 0" class="text-center text-xs text-gray-500 mt-3">
              请先在左侧上传研究资料
            </p>
          </div>
        </div>

        <!-- 报告生成中 -->
        <div v-else-if="isGenerating" class="flex-1 flex flex-col items-center justify-center p-8">
          <div class="max-w-md w-full text-center">
            <div class="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg class="w-8 h-8 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">正在生成报告...</h3>
            <p class="text-gray-400 text-sm mb-6">AI 正在分析您的资料，请稍候</p>
            
            <!-- 进度条 -->
            <div class="bg-[#1a1a1a] rounded-lg p-4 mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-400">生成进度</span>
                <span class="text-blue-400">{{ generateProgress }}%</span>
              </div>
              <div class="h-2 bg-[#333] rounded-full overflow-hidden">
                <div 
                  class="h-full bg-blue-500 rounded-full transition-all duration-300"
                  :style="{ width: generateProgress + '%' }"
                ></div>
              </div>
            </div>

            <!-- 生成步骤 -->
            <div class="text-left space-y-2">
              <div v-for="(step, index) in generateSteps" :key="index" class="flex items-center gap-2 text-sm">
                <span v-if="step.done" class="text-green-500">✓</span>
                <span v-else-if="step.active" class="text-blue-500 animate-pulse">●</span>
                <span v-else class="text-gray-600">○</span>
                <span :class="step.done ? 'text-gray-400' : step.active ? 'text-white' : 'text-gray-600'">
                  {{ step.text }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 报告内容展示 -->
        <div v-else class="flex-1 flex flex-col min-h-0">
          <!-- 中栏统一头部 52px -->
          <div 
            class="h-[52px] px-4 border-b flex items-center justify-between flex-shrink-0"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <!-- 左侧：报告选择器 -->
            <div class="flex items-center gap-2 relative">
              <button 
                @click="showReportDropdown = !showReportDropdown"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:bg-[#222]"
                :style="{ border: `1px solid ${tokens.colors.border.default}` }"
              >
                <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ currentReport?.name || '选择报告' }}</span>
                <svg class="w-3.5 h-3.5" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              
              <!-- 报告管理下拉菜单 -->
              <div 
                v-if="showReportDropdown"
                class="absolute top-full left-0 mt-1 w-80 rounded-lg shadow-xl z-50 overflow-hidden"
                :style="{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff', border: `1px solid ${tokens.colors.border.default}` }"
              >
                <!-- 头部 -->
                <div class="px-4 py-3 border-b" :style="{ borderColor: tokens.colors.border.default }">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">报告管理</span>
                    <span class="text-xs px-2 py-0.5 rounded-full" :style="{ backgroundColor: tokens.colors.background.elevated, color: tokens.colors.text.muted }">{{ stockReports.length }} 份</span>
                  </div>
                </div>
                <!-- 报告列表 -->
                <div class="max-h-64 overflow-y-auto">
                  <div 
                    v-for="report in stockReports" 
                    :key="report.id"
                    @click="selectReport(report)"
                    :class="[
                      'px-4 py-2.5 hover:bg-[#2a2a2a] cursor-pointer flex items-center justify-between group',
                      currentReport?.id === report.id ? 'bg-blue-500/10' : ''
                    ]"
                  >
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <span :class="[
                          'text-sm truncate',
                          currentReport?.id === report.id ? 'text-blue-400' : 'text-white'
                        ]">{{ report.name }}</span>
                        <span v-if="currentReport?.id === report.id" class="text-xs text-blue-400">当前</span>
                      </div>
                      <div class="text-xs text-gray-500">{{ report.date }} · {{ report.type }}</div>
                    </div>
                    <button 
                      @click.stop="showReportMenu(report, $event)"
                      class="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-white rounded hover:bg-[#333]"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 报告管理菜单（右键） -->
              <div v-if="activeReportMenu" class="fixed inset-0 z-50" @click="activeReportMenu = null">
                <div 
                  :style="{ top: reportMenuPosition.y + 'px', left: reportMenuPosition.x + 'px' }"
                  class="absolute w-36 bg-[#2a2a2a] border border-[#444] rounded-lg shadow-xl overflow-hidden"
                  @click.stop
                >
                  <button 
                    @click="startRenameReport"
                    class="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-[#333] flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    重命名
                  </button>
                  <button 
                    @click="deleteReport"
                    class="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-[#333] flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                    删除
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 右侧按钮 -->
            <div class="flex items-center gap-2">
              <button 
                @click="resetReport"
                class="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                新报告
              </button>
            </div>
          </div>
          
          <!-- 重命名报告弹窗 -->
          <div v-if="renamingReportId" class="px-6 py-3 flex items-center gap-2 border-b flex-shrink-0" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <input 
              v-model="newReportName"
              @keyup.enter="confirmRenameReport"
              @keyup.esc="cancelRenameReport"
              type="text"
              class="flex-1 px-3 py-1.5 bg-[#1a1a1a] border border-blue-500 rounded-lg text-white text-sm focus:outline-none"
              placeholder="输入新名称"
              autofocus
            />
            <button 
              @click="confirmRenameReport"
              class="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              确认
            </button>
            <button 
              @click="cancelRenameReport"
              class="px-3 py-1.5 bg-[#333] text-gray-300 text-sm rounded-lg hover:bg-[#444]"
            >
              取消
            </button>
          </div>

          <!-- 报告内容滚动区 -->
          <div class="flex-1 overflow-y-auto custom-scrollbar">
            <!-- 报告正文 -->
            <div class="p-6 max-w-none report-content" :class="isDark ? 'prose prose-invert' : 'prose'">
            <!-- 关键指标卡片 -->
            <div class="grid grid-cols-4 gap-4 mb-8 not-prose">
              <div class="rounded-lg p-4" :style="{ backgroundColor: tokens.colors.background.elevated, border: `1px solid ${tokens.colors.border.default}` }">
                <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">营收增长</div>
                <div class="text-2xl font-bold text-green-500">+10.2%</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.secondary }">YoY</div>
              </div>
              <div class="rounded-lg p-4" :style="{ backgroundColor: tokens.colors.background.elevated, border: `1px solid ${tokens.colors.border.default}` }">
                <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">毛利率</div>
                <div class="text-2xl font-bold" :style="{ color: tokens.colors.text.primary }">46.3%</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.secondary }">稳定提升</div>
              </div>
              <div class="rounded-lg p-4" :style="{ backgroundColor: tokens.colors.background.elevated, border: `1px solid ${tokens.colors.border.default}` }">
                <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">iPhone 销售</div>
                <div class="text-2xl font-bold text-green-500">+15.8%</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.secondary }">强劲复苏</div>
              </div>
              <div class="rounded-lg p-4" :style="{ backgroundColor: tokens.colors.background.elevated, border: `1px solid ${tokens.colors.border.default}` }">
                <div class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">服务营收</div>
                <div class="text-2xl font-bold text-blue-500">+14%</div>
                <div class="text-xs" :style="{ color: tokens.colors.text.secondary }">持续增长</div>
              </div>
            </div>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">Executive Summary</h2>
            <p class="text-gray-300 leading-relaxed mb-6">
              Apple Inc. (NASDAQ: AAPL) is currently trading around the mid-$220s per share, recovering from a steep mid-year correction. The company's fundamentals have shown resilience, highlighted by a <strong class="text-white">return to solid growth</strong> – Apple's latest quarterly revenue rose about 10% year-over-year, its fastest pace since 2021.
            </p>
            <p class="text-gray-300 leading-relaxed mb-6">
              A <strong class="text-white">bullish internal analysis</strong> provided by the user argues that the stock's valuation downturn in late 2024 and early 2025 went too far, creating a buying opportunity. Key drivers of optimism include Apple's surging high-margin Services segment, aggressive share buybacks, and manageable exposure to tariff and regulatory risks.
            </p>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">1. 公司概况与商业模式</h2>
            <p class="text-gray-300 leading-relaxed mb-6">
              苹果公司是全球领先的消费电子和软件服务企业，其核心业务涵盖<strong class="text-white">硬件产品与服务生态</strong>两大板块。硬件方面，公司销售包括iPhone智能手机、iPad平板电脑、Mac系列电脑、Apple Watch智能手表、AirPods无线耳机等设备。
            </p>
            <p class="text-gray-300 leading-relaxed mb-6">
              iPhone一直是最大的收入来源——2025财年iPhone营收超过2,610亿美元，占比约63%。此外，Mac电脑和可穿戴设备等产品线销售也在增长。服务方面，苹果通过App Store应用商店、Apple Music/TV+/iCloud等订阅、Apple Care售后服务和金融支付（Apple Pay）等，实现高利润的经常性收入。
            </p>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">2. 财务表现分析</h2>
            <p class="text-gray-300 leading-relaxed mb-6">
              苹果近期财务表现稳健向上。<strong class="text-white">收入方面</strong>，在经历2023财年的小幅下滑后，公司于2025财年重拾增长，全年营收达4,162亿美元，较上一年增长约8%并创历史新高。
            </p>
            <p class="text-gray-300 leading-relaxed mb-6">
              推动增长的主要因素包括：iPhone 17系列热销带动手机业务复苏、服务收入持续两位数增长、以及大中华区市场回暖。<strong class="text-white">盈利能力方面</strong>，毛利率稳定在46-47%的高水平，得益于服务业务占比提升和供应链优化。
            </p>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">3. 竞争格局分析</h2>
            <p class="text-gray-300 leading-relaxed mb-6">
              在智能手机市场，苹果面临三星、华为等厂商的竞争，但凭借<strong class="text-white">品牌溢价和生态系统锁定</strong>，保持了高端市场的领导地位。在中国市场，华为在政策支持下快速恢复，对苹果形成一定压力。
            </p>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">4. 风险因素</h2>
            <ul class="text-gray-300 space-y-2 mb-6">
              <li>• <strong class="text-white">中国市场风险</strong>：地缘政治不确定性可能影响销售</li>
              <li>• <strong class="text-white">创新周期放缓</strong>：iPhone升级周期延长，用户换机意愿下降</li>
              <li>• <strong class="text-white">反垄断监管</strong>：App Store抽成模式面临监管压力</li>
              <li>• <strong class="text-white">AI竞争</strong>：在AI领域相对Google、Microsoft起步较晚</li>
            </ul>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">5. 投资建议</h2>
            <div class="bg-[#1a2a1a] border border-green-500/30 rounded-lg p-4 mb-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-green-500 font-bold">📈 看涨</span>
                <span class="text-gray-400">|</span>
                <span class="text-gray-300">目标价: $250</span>
              </div>
              <p class="text-gray-300 text-sm">
                基于强劲的财务表现和服务业务增长潜力，建议长期持有。短期回调可视为加仓机会。
              </p>
            </div>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">6. 估值分析</h2>
            <p class="text-gray-300 leading-relaxed mb-4">
              当前苹果股价对应的市盈率(P/E)约为28倍，略高于科技板块平均水平，但考虑到公司的盈利质量和增长前景，估值仍在合理区间。
            </p>
            <div class="grid grid-cols-3 gap-4 mb-6 not-prose">
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
                <div class="text-xs text-gray-500 mb-1">市盈率 P/E</div>
                <div class="text-xl font-bold text-white">28.5x</div>
                <div class="text-xs text-gray-400">TTM</div>
              </div>
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
                <div class="text-xs text-gray-500 mb-1">市销率 P/S</div>
                <div class="text-xl font-bold text-white">7.2x</div>
                <div class="text-xs text-gray-400">历史中位</div>
              </div>
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 text-center">
                <div class="text-xs text-gray-500 mb-1">股息率</div>
                <div class="text-xl font-bold text-blue-400">0.52%</div>
                <div class="text-xs text-gray-400">年化</div>
              </div>
            </div>
            <p class="text-gray-300 leading-relaxed mb-6">
              与历史估值相比，当前P/E处于5年区间的中上水平。与竞争对手对比，苹果估值高于硬件同行（如三星、小米），但低于纯软件公司（如微软、谷歌），反映市场对其"硬件+服务"混合模式的认可。
            </p>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">7. 技术分析</h2>
            <p class="text-gray-300 leading-relaxed mb-4">
              从技术面来看，苹果股价在经历2024年底的回调后，目前正处于<strong class="text-white">上升通道</strong>中。主要技术指标显示：
            </p>
            <ul class="text-gray-300 space-y-2 mb-6">
              <li>• <strong class="text-white">均线系统</strong>：股价站稳50日均线，20日均线金叉50日均线</li>
              <li>• <strong class="text-white">RSI指标</strong>：当前处于55-60区间，未进入超买区域</li>
              <li>• <strong class="text-white">MACD</strong>：DIF线上穿DEA线，形成金叉信号</li>
              <li>• <strong class="text-white">成交量</strong>：近期放量上涨，显示机构资金入场</li>
              <li>• <strong class="text-white">支撑位</strong>：$200附近形成强支撑，$180为次级支撑</li>
              <li>• <strong class="text-white">压力位</strong>：$235为近期压力，突破后目标看$250</li>
            </ul>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">8. 未来展望</h2>
            <p class="text-gray-300 leading-relaxed mb-4">
              展望2025-2026年，苹果面临的机遇与挑战并存：
            </p>
            <div class="grid grid-cols-2 gap-4 mb-6 not-prose">
              <div class="bg-[#1a2a1a] border border-green-500/30 rounded-lg p-4">
                <h4 class="text-green-400 font-medium mb-2">📈 增长机遇</h4>
                <ul class="text-sm text-gray-300 space-y-1">
                  <li>• iPhone 17系列创新设计</li>
                  <li>• Apple Intelligence AI生态</li>
                  <li>• Vision Pro空间计算普及</li>
                  <li>• 印度市场高速增长</li>
                  <li>• 服务订阅持续扩张</li>
                </ul>
              </div>
              <div class="bg-[#2a1a1a] border border-red-500/30 rounded-lg p-4">
                <h4 class="text-red-400 font-medium mb-2">⚠️ 潜在风险</h4>
                <ul class="text-sm text-gray-300 space-y-1">
                  <li>• 中国市场竞争加剧</li>
                  <li>• 全球宏观经济放缓</li>
                  <li>• 反垄断监管压力</li>
                  <li>• 供应链地缘风险</li>
                  <li>• AI竞争落后风险</li>
                </ul>
              </div>
            </div>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">9. 机构观点汇总</h2>
            <div class="space-y-3 mb-6">
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span class="text-white font-medium">摩根士丹利</span>
                  <span class="text-gray-500 text-sm ml-2">2025-01-10</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-400 text-sm">买入</span>
                  <span class="text-white">目标价 $260</span>
                </div>
              </div>
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span class="text-white font-medium">高盛</span>
                  <span class="text-gray-500 text-sm ml-2">2025-01-08</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-400 text-sm">买入</span>
                  <span class="text-white">目标价 $255</span>
                </div>
              </div>
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span class="text-white font-medium">摩根大通</span>
                  <span class="text-gray-500 text-sm ml-2">2025-01-05</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-yellow-400 text-sm">持有</span>
                  <span class="text-white">目标价 $230</span>
                </div>
              </div>
              <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span class="text-white font-medium">巴克莱</span>
                  <span class="text-gray-500 text-sm ml-2">2025-01-03</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-green-400 text-sm">买入</span>
                  <span class="text-white">目标价 $245</span>
                </div>
              </div>
            </div>

            <h2 class="text-xl font-bold text-white border-b border-[#333] pb-2 mb-4">10. 结论</h2>
            <p class="text-gray-300 leading-relaxed mb-6">
              综合以上分析，苹果公司作为全球科技龙头，具备<strong class="text-white">强劲的基本面、稳健的财务状况和持续的创新能力</strong>。尽管面临中国市场竞争、监管压力等挑战，但公司在高端市场的品牌优势、服务生态的护城河以及AI战略的布局，为长期增长提供了坚实基础。
            </p>
            <p class="text-gray-300 leading-relaxed mb-6">
              我们维持对苹果的<strong class="text-green-400">看涨</strong>评级，12个月目标价$250，对应约15%的上涨空间。建议投资者在$200-210区间逢低布局，长期持有以获取资本增值和股息回报。
            </p>

            <!-- 数据来源 -->
            <div class="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 mt-8">
              <h4 class="text-sm font-medium text-gray-400 mb-2">📚 参考来源</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="file in uploadedFiles" :key="file.id" class="px-2 py-1 bg-[#333] rounded text-xs text-gray-300">
                  {{ file.name }}
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右栏：AI对话 -->
      <div 
        :style="{ 
          width: rightCollapsed ? '40px' : rightWidth + 'px',
          backgroundColor: tokens.colors.background.secondary,
          borderColor: tokens.colors.border.default
        }"
        class="border-l flex flex-col transition-all duration-300 relative flex-shrink-0 min-h-0"
      >
        <!-- 右栏拖拽调整宽度手柄 -->
        <div 
          v-if="!rightCollapsed"
          @mousedown="startRightResize"
          class="absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-blue-500/50 transition-colors z-20"
        ></div>

        <!-- 收起状态 -->
        <div v-if="rightCollapsed" class="h-full flex flex-col items-center py-4">
          <button 
            @click="rightCollapsed = false"
            class="w-8 h-8 rounded-lg flex items-center justify-center transition"
            :style="{ backgroundColor: tokens.colors.background.tertiary, color: tokens.colors.text.secondary }"
            title="展开AI助手"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="mt-4 flex flex-col items-center gap-3">
            <div class="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center" title="AI对话">
              <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-xs writing-vertical" :style="{ color: tokens.colors.text.muted }">{{ chatMessages.length }}</span>
          </div>
        </div>

        <!-- 展开状态内容 -->
        <template v-else>
          <!-- 右栏统一头部 52px -->
          <div class="h-[52px] px-4 border-b flex items-center justify-between flex-shrink-0" :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }">
            <div class="flex items-center gap-2 relative">
              <!-- 对话选择下拉 -->
              <button 
                @click="showChatDropdown = !showChatDropdown"
                class="flex items-center gap-2 px-3 py-1.5 rounded-lg transition hover:bg-[#222]"
                :style="{ border: `1px solid ${tokens.colors.border.default}` }"
              >
                <svg class="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ currentChat?.name || 'AI 研究助手' }}</span>
                <svg class="w-3.5 h-3.5" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
                
                <!-- 对话下拉菜单 -->
                <div 
                  v-if="showChatDropdown"
                  class="absolute top-full left-0 mt-1 w-56 rounded-lg shadow-xl z-50 overflow-hidden"
                  :style="{ backgroundColor: isDark ? '#1a1a1a' : '#ffffff', border: `1px solid ${tokens.colors.border.default}` }"
                >
                  <div class="p-2" :style="{ borderBottom: `1px solid ${tokens.colors.border.default}` }">
                    <button 
                      @click="startNewChat"
                      class="w-full px-3 py-2 text-sm text-blue-400 hover:bg-[#2a2a2a] rounded-lg flex items-center gap-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                      开启新对话
                    </button>
                  </div>
                  <div class="p-2">
                    <p class="text-xs text-gray-500 px-2 mb-1">历史对话</p>
                    <div class="max-h-48 overflow-y-auto space-y-0.5">
                      <div 
                        v-for="chat in chatHistory" 
                        :key="chat.id"
                        @click="selectChat(chat)"
                        :class="[
                          'px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between group',
                          currentChat?.id === chat.id ? 'bg-blue-500/20' : 'hover:bg-[#2a2a2a]'
                        ]"
                      >
                        <div class="flex-1 min-w-0">
                          <p :class="['text-sm truncate', currentChat?.id === chat.id ? 'text-blue-400' : 'text-white']">
                            {{ chat.name }}
                          </p>
                          <p class="text-xs text-gray-500">{{ chat.time }}</p>
                        </div>
                        <span class="text-xs text-gray-600">{{ chat.messageCount }}条</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="flex items-center gap-2">
              <!-- 深度研究模式切换 -->
              <button 
                @click="toggleDeepResearchMode"
                :class="[
                  'px-2 py-1 rounded flex items-center gap-1 text-xs transition',
                  deepResearchMode 
                    ? 'bg-purple-500/20 border border-purple-500/50 text-purple-400' 
                    : 'bg-[#1f1f1f] border border-[#333] text-gray-400 hover:border-purple-500/50 hover:text-purple-400'
                ]"
                :title="deepResearchMode ? '深度研究模式：针对报告进行对话' : '自由聊天模式'"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                {{ deepResearchMode ? '深度研究' : '自由聊天' }}
              </button>
              <button 
                @click="startNewChat"
                class="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                title="新对话"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                
              </button>
              <button 
                @click="rightCollapsed = true"
                class="w-6 h-6 rounded hover:bg-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-white transition"
                title="收起面板"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

        <!-- 对话内容 -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <!-- 欢迎消息 -->
          <div class="flex gap-3">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <div class="rounded-lg rounded-tl-none p-3" :style="{ backgroundColor: tokens.colors.background.tertiary }">
                <p class="text-sm" :style="{ color: tokens.colors.text.secondary }">
                  您好！我已经分析了您上传的 {{ uploadedFiles.length }} 份资料。有什么想深入了解的吗？
                </p>
              </div>
              <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">刚刚</p>
            </div>
          </div>

          <!-- 用户消息示例 -->
          <div v-for="msg in chatMessages" :key="msg.id" class="flex gap-3" :class="msg.isUser ? 'flex-row-reverse' : ''">
            <div 
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                msg.isUser ? 'bg-purple-500' : 'bg-blue-500'
              ]"
            >
              <span v-if="msg.isUser" class="text-white text-sm font-medium">我</span>
              <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="flex-1">
              <div 
                :class="[
                  'rounded-lg p-3',
                  msg.isUser ? 'bg-purple-500/20 rounded-tr-none' : msg.isDeepResearch ? 'bg-purple-500/10 border border-purple-500/30 rounded-tl-none' : 'bg-[#1f1f1f] rounded-tl-none'
                ]"
              >
                <!-- 深度研究模式标签 -->
                <div v-if="msg.isDeepResearch" class="flex items-center gap-1 mb-2 pb-2 border-b border-purple-500/20">
                  <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  <span class="text-xs text-purple-400 font-medium">深度研究</span>
                </div>
                <p class="text-sm whitespace-pre-wrap" :style="{ color: tokens.colors.text.secondary }">{{ msg.content }}</p>
                <div v-if="msg.source" class="mt-2 pt-2" :style="{ borderTop: `1px solid ${tokens.colors.border.default}` }">
                  <p class="text-xs flex items-center gap-1" :style="{ color: tokens.colors.text.muted }">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                    </svg>
                    来源: {{ msg.source }}
                  </p>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-1" :class="msg.isUser ? 'text-right' : ''">{{ msg.time }}</p>
            </div>
          </div>
        </div>

        <!-- 底部区域（与左栏统一高度） -->
        <div class="flex-shrink-0" :style="{ borderTop: `1px solid ${tokens.colors.border.default}` }">
          <!-- 快捷问题 -->
          <div class="px-4 py-2">
            <div class="flex flex-wrap gap-1.5">
              <button 
                v-for="q in quickQuestions" 
                :key="q"
                @click="askQuestion(q)"
                class="px-2 py-1 rounded text-xs hover:border-blue-500 hover:text-blue-400 transition"
                :style="{ backgroundColor: tokens.colors.background.tertiary, border: `1px solid ${tokens.colors.border.default}`, color: tokens.colors.text.secondary }"
              >
                {{ q }}
              </button>
            </div>
          </div>

          <!-- 输入框 -->
          <div class="px-4 py-2">
            <div class="flex gap-2">
              <input 
                v-model="chatInput"
                @keyup.enter="sendMessage"
                type="text"
                :placeholder="deepResearchMode ? '针对报告提问...' : '输入您的问题...'"
                class="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none transition"
                :style="deepResearchMode 
                  ? { backgroundColor: 'rgba(147, 51, 234, 0.1)', border: '1px solid rgba(147, 51, 234, 0.3)', color: tokens.colors.text.primary } 
                  : { backgroundColor: tokens.colors.background.tertiary, border: `1px solid ${tokens.colors.border.default}`, color: tokens.colors.text.primary }"
              />
              <button 
                @click="sendMessage"
                :class="[
                  'px-3 py-2 text-white rounded-lg transition',
                  deepResearchMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 数据来源信息 -->
          <div v-if="checkedFilesCount > 0" class="px-4 py-2 pt-0">
            <div class="flex items-center gap-1.5 text-xs text-gray-500">
              <svg class="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
              </svg>
              <span>基于 <span class="text-blue-400">{{ checkedFilesCount }}</span> 个来源</span>
            </div>
          </div>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useTheme } from '../composables/useTheme'

// 使用主题系统
const { tokens, isDark } = useTheme()

// ========== 左右栏收起/展开与宽度调整 ==========
const leftCollapsed = ref(false)
const rightCollapsed = ref(false)
const leftWidth = ref(260)
const rightWidth = ref(320)

// 拖拽调整宽度相关
const isResizingLeft = ref(false)
const isResizingRight = ref(false)

const startLeftResize = (e) => {
  isResizingLeft.value = true
  document.addEventListener('mousemove', handleLeftResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const startRightResize = (e) => {
  isResizingRight.value = true
  document.addEventListener('mousemove', handleRightResize)
  document.addEventListener('mouseup', stopResize)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const handleLeftResize = (e) => {
  if (!isResizingLeft.value) return
  const newWidth = e.clientX
  if (newWidth >= 200 && newWidth <= 400) {
    leftWidth.value = newWidth
  }
}

const handleRightResize = (e) => {
  if (!isResizingRight.value) return
  const newWidth = window.innerWidth - e.clientX
  if (newWidth >= 280 && newWidth <= 500) {
    rightWidth.value = newWidth
  }
}

const stopResize = () => {
  isResizingLeft.value = false
  isResizingRight.value = false
  document.removeEventListener('mousemove', handleLeftResize)
  document.removeEventListener('mousemove', handleRightResize)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleLeftResize)
  document.removeEventListener('mousemove', handleRightResize)
  document.removeEventListener('mouseup', stopResize)
})

// ========== 研究个股 ==========
const stockSearchQuery = ref('')
const showStockSearch = ref(false)
const stockSearchResults = ref([])
const currentStock = ref({ code: 'AAPL', name: '苹果公司' })
const watchedStocks = ref([
  { code: 'AAPL', name: '苹果公司' },
  { code: 'TSLA', name: '特斯拉' },
  { code: 'NVDA', name: '英伟达' }
])

// 模拟股票数据库
const allStocks = [
  { code: 'AAPL', name: '苹果公司' },
  { code: 'TSLA', name: '特斯拉' },
  { code: 'NVDA', name: '英伟达' },
  { code: 'MSFT', name: '微软' },
  { code: 'GOOGL', name: '谷歌' },
  { code: 'META', name: 'Meta' },
  { code: 'AMZN', name: '亚马逊' },
  { code: 'AMD', name: 'AMD' },
  { code: 'NFLX', name: '奈飞' },
  { code: 'CRM', name: 'Salesforce' },
  { code: 'BABA', name: '阿里巴巴' },
  { code: 'PDD', name: '拼多多' },
  { code: 'JD', name: '京东' }
]

// 每个股票独立的文件存储
const stockFilesMap = ref({
  'AAPL': [
    { id: 1, name: 'AAPL_10K_2024.pdf', size: '2.3 MB', checked: true },
    { id: 2, name: 'Q3_2025_财报.pdf', size: '1.1 MB', checked: true },
    { id: 3, name: '券商研报_苹果.pdf', size: '3.5 MB', checked: true },
    { id: 4, name: 'Apple_Services_Analysis.pdf', size: '1.8 MB', checked: true },
    { id: 5, name: '苹果供应链报告2024.pdf', size: '2.1 MB', checked: false },
    { id: 6, name: 'iPhone17_预测分析.docx', size: '856 KB', checked: true },
    { id: 7, name: 'Apple_AI_Strategy.pdf', size: '3.2 MB', checked: true },
    { id: 8, name: '中国市场份额分析.xlsx', size: '445 KB', checked: false }
  ],
  'TSLA': [
    { id: 9, name: 'TSLA_年报2024.pdf', size: '4.2 MB', checked: true },
    { id: 10, name: 'Model_Y销量分析.pdf', size: '1.5 MB', checked: true }
  ],
  'NVDA': [
    { id: 11, name: 'NVDA_Q4_2024.pdf', size: '2.8 MB', checked: true }
  ]
})


const searchStocks = () => {
  const query = stockSearchQuery.value.toLowerCase()
  if (!query) {
    stockSearchResults.value = []
    return
  }
  stockSearchResults.value = allStocks.filter(s => 
    s.code.toLowerCase().includes(query) || 
    s.name.toLowerCase().includes(query)
  ).slice(0, 5)
}

const selectStock = (stock) => {
  currentStock.value = stock
  stockSearchQuery.value = ''
  showStockSearch.value = false
  stockSearchResults.value = []
  // 确保该股票有文件列表
  if (!stockFilesMap.value[stock.code]) {
    stockFilesMap.value[stock.code] = []
  }
}

const switchToStock = (stock) => {
  currentStock.value = stock
  // 确保该股票有文件列表
  if (!stockFilesMap.value[stock.code]) {
    stockFilesMap.value[stock.code] = []
  }
}

const isStockWatched = (code) => {
  return watchedStocks.value.some(s => s.code === code)
}

const toggleWatchStock = (stock) => {
  const index = watchedStocks.value.findIndex(s => s.code === stock.code)
  if (index >= 0) {
    watchedStocks.value.splice(index, 1)
  } else {
    watchedStocks.value.push(stock)
  }
}

// 点击外部关闭搜索下拉
const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showStockSearch.value = false
  }
}

// ========== 文件详情 ==========
const selectedFile = ref(null)

const showFileDetail = (file) => {
  selectedFile.value = file
}

const closeFileDetail = () => {
  selectedFile.value = null
}

// 模拟文件详情数据
const getFileDetails = (file) => {
  const details = {
    1: { pages: 156, uploadTime: '2025-01-15 10:30', summary: '苹果公司2024年年度报告，包含完整的财务数据、业务分析和未来展望。重点内容包括iPhone销售复苏、服务业务持续增长、以及Apple Intelligence战略布局。' },
    2: { pages: 42, uploadTime: '2025-01-14 15:20', summary: '2025年第三季度财报，营收同比增长10.2%，iPhone销售强劲复苏，服务业务毛利率达到74%的历史高位。' },
    3: { pages: 28, uploadTime: '2025-01-13 09:45', summary: '某券商深度研报，对苹果的AI战略、服务生态和中国市场进行了全面分析，给出买入评级，目标价$250。' },
    4: { pages: 35, uploadTime: '2025-01-12 14:00', summary: '服务业务专项分析，深入解读App Store、iCloud、Apple Music等各项服务的增长驱动和竞争格局。' },
    5: { pages: 48, uploadTime: '2025-01-11 11:30', summary: '苹果供应链分析报告，涵盖主要供应商分布、产能规划和地缘政治风险评估。' },
    6: { pages: 18, uploadTime: '2025-01-10 16:15', summary: 'iPhone 17系列新功能预测，包括设计变化、相机升级、AI功能增强等。' },
    7: { pages: 52, uploadTime: '2025-01-09 10:00', summary: '苹果AI战略深度分析，对比Google、Microsoft的AI布局，分析Apple Intelligence的差异化优势。' },
    8: { pages: 12, uploadTime: '2025-01-08 14:30', summary: '中国智能手机市场份额分析，包含华为回归影响、消费降级趋势等关键洞察。' }
  }
  return details[file.id] || { pages: 20, uploadTime: '2025-01-15', summary: '文件内容摘要' }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// ========== 上传相关 ==========
const isDragging = ref(false)
const fileInput = ref(null)
const globalFileInput = ref(null)
const showUploadModal = ref(false)
const isDraggingModal = ref(false)

// 使用计算属性获取当前股票的文件列表
const uploadedFiles = computed(() => {
  return stockFilesMap.value[currentStock.value?.code] || []
})

// 报告生成相关
const reportGenerated = ref(true) // 默认显示报告
const isGenerating = ref(false)
const generateProgress = ref(0)
const selectedType = ref('comprehensive')
const customRequirement = ref('')

const researchTypes = [
  { id: 'comprehensive', icon: '📊', name: '综合分析', desc: '全方位深度分析' },
  { id: 'financial', icon: '💰', name: '财务分析', desc: '财务数据深度解读' },
  { id: 'competitive', icon: '⚔️', name: '竞品对比', desc: '竞争格局分析' },
  { id: 'risk', icon: '⚠️', name: '风险评估', desc: '风险因素识别' }
]

const generateSteps = ref([
  { text: '解析上传资料', done: false, active: false },
  { text: '提取关键信息', done: false, active: false },
  { text: '分析财务数据', done: false, active: false },
  { text: '生成研究报告', done: false, active: false }
])

// 对话相关
const chatInput = ref('')
const chatMessages = ref([
  { 
    id: 1, 
    isUser: true, 
    content: '苹果的AI战略布局如何？', 
    time: '10分钟前' 
  },
  { 
    id: 2, 
    isUser: false, 
    content: '根据您上传的资料分析，苹果的AI战略主要体现在以下几个方面：\n\n1. Apple Intelligence - 设备端AI能力\n2. Siri增强 - 自然语言交互\n3. 开发者生态 - Core ML框架\n\n苹果更注重隐私保护的端侧AI，与Google、Microsoft的云端AI策略有所不同。', 
    source: '券商研报_苹果.pdf P.12',
    time: '9分钟前' 
  },
  { 
    id: 3, 
    isUser: true, 
    content: '服务业务的增长趋势如何？', 
    time: '7分钟前' 
  },
  { 
    id: 4, 
    isUser: false, 
    content: '苹果服务业务表现强劲：\n\n📈 服务营收：连续14个季度双位数增长\n💰 2024年服务营收：约960亿美元\n📊 毛利率：高达74%，远超硬件业务\n\n主要增长驱动：\n• App Store佣金收入\n• Apple Music/TV+订阅\n• iCloud存储服务\n• Apple Care延保服务\n• Apple Pay交易抽成\n\n服务业务已成为公司第二大收入来源，且利润率显著高于硬件。', 
    source: 'AAPL_10K_2024.pdf P.45',
    time: '6分钟前' 
  },
  { 
    id: 5, 
    isUser: true, 
    content: '中国市场面临哪些挑战？', 
    time: '4分钟前' 
  },
  { 
    id: 6, 
    isUser: false, 
    content: '中国市场主要挑战：\n\n1. 华为竞争回归\n   - Mate 60系列强势回归\n   - 高端市场份额被蚕食\n\n2. 地缘政治风险\n   - 政府采购限制\n   - 民族品牌情绪\n\n3. 消费降级趋势\n   - 换机周期延长至4年+\n   - 性价比需求上升\n\n4. 本土生态竞争\n   - 微信小程序替代App Store\n   - 国产应用生态完善', 
    source: '中国市场份额分析.xlsx',
    time: '3分钟前' 
  },
  { 
    id: 7, 
    isUser: true, 
    content: 'iPhone 17有什么新功能预期？', 
    time: '1分钟前' 
  },
  { 
    id: 8, 
    isUser: false, 
    content: 'iPhone 17系列预期更新：\n\n🔲 设计变化：\n• 超薄Air版本（5.5mm）\n• 钛合金边框升级\n• 更小的灵动岛\n\n📸 相机升级：\n• 4800万像素主摄+长焦\n• ProRes 8K视频录制\n• 空间视频增强\n\n🧠 AI功能：\n• Apple Intelligence 2.0\n• 实时翻译增强\n• 智能摘要生成\n\n⚡ 性能提升：\n• A19 Pro芯片（3nm+）\n• 更大电池容量\n• 支持Wi-Fi 7', 
    source: 'iPhone17_预测分析.docx',
    time: '刚刚' 
  }
])

const quickQuestions = ['估值分析', '风险点', '增长驱动', '竞争优势']

// 方法
const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const files = event.target.files
  handleFiles(files)
}

const handleDrop = (event) => {
  isDragging.value = false
  const files = event.dataTransfer.files
  handleFiles(files)
}

// 全局上传处理（用于弹窗）
const handleGlobalFileSelect = (event) => {
  const files = event.target.files
  handleFiles(files)
  // 清空input以便重复选择同名文件
  if (globalFileInput.value) {
    globalFileInput.value.value = ''
  }
}

const handleModalDrop = (event) => {
  isDraggingModal.value = false
  const files = event.dataTransfer.files
  handleFiles(files)
}

const handleFiles = (files) => {
  const stockCode = currentStock.value?.code
  if (!stockCode) return
  if (!stockFilesMap.value[stockCode]) {
    stockFilesMap.value[stockCode] = []
  }
  for (const file of files) {
    const id = Date.now() + Math.random()
    stockFilesMap.value[stockCode].push({
      id,
      name: file.name,
      size: formatFileSize(file.size),
      checked: true
    })
  }
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const removeFile = (id) => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockFilesMap.value[stockCode]) return
  stockFilesMap.value[stockCode] = stockFilesMap.value[stockCode].filter(f => f.id !== id)
  activeFileMenu.value = null
}

// ========== 文件交互（勾选、三点菜单、重命名）==========
const activeFileMenu = ref(null)
const renamingFileId = ref(null)
const newFileName = ref('')

// 计算已选文件数量
const checkedFilesCount = computed(() => {
  return uploadedFiles.value.filter(f => f.checked).length
})

// 是否全选
const allFilesChecked = computed(() => {
  return uploadedFiles.value.length > 0 && uploadedFiles.value.every(f => f.checked)
})

// 切换单个文件勾选
const toggleFileCheck = (fileId) => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockFilesMap.value[stockCode]) return
  const file = stockFilesMap.value[stockCode].find(f => f.id === fileId)
  if (file) {
    file.checked = !file.checked
  }
}

// 全选/取消全选
const toggleAllFiles = () => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockFilesMap.value[stockCode]) return
  const newState = !allFilesChecked.value
  stockFilesMap.value[stockCode].forEach(f => {
    f.checked = newState
  })
}

// 切换文件菜单
const toggleFileMenu = (fileId) => {
  if (activeFileMenu.value === fileId) {
    activeFileMenu.value = null
  } else {
    activeFileMenu.value = fileId
  }
}

// 开始重命名
const startRenameFile = (file) => {
  renamingFileId.value = file.id
  newFileName.value = file.name
  activeFileMenu.value = null
}

// 确认重命名
const confirmRename = (fileId) => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockFilesMap.value[stockCode]) return
  const file = stockFilesMap.value[stockCode].find(f => f.id === fileId)
  if (file && newFileName.value.trim()) {
    file.name = newFileName.value.trim()
  }
  renamingFileId.value = null
  newFileName.value = ''
}

// 取消重命名
const cancelRename = () => {
  renamingFileId.value = null
  newFileName.value = ''
}

// 点击外部关闭文件菜单
const handleFileMenuClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    activeFileMenu.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleFileMenuClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleFileMenuClickOutside)
})

const generateReport = () => {
  isGenerating.value = true
  generateProgress.value = 0
  
  // 模拟生成过程
  const steps = generateSteps.value
  let currentStep = 0
  
  const interval = setInterval(() => {
    generateProgress.value += 5
    
    const stepIndex = Math.floor(generateProgress.value / 25)
    steps.forEach((step, i) => {
      step.done = i < stepIndex
      step.active = i === stepIndex
    })
    
    if (generateProgress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isGenerating.value = false
        reportGenerated.value = true
      }, 500)
    }
  }, 200)
}

const resetReport = () => {
  reportGenerated.value = false
  generateSteps.value.forEach(step => {
    step.done = false
    step.active = false
  })
}

const sendMessage = () => {
  if (!chatInput.value.trim()) return
  
  chatMessages.value.push({
    id: Date.now(),
    isUser: true,
    content: chatInput.value,
    time: '刚刚'
  })
  
  const question = chatInput.value
  chatInput.value = ''
  
  // 更新当前对话的消息数量
  if (currentChat.value) {
    currentChat.value.messageCount = chatMessages.value.length
  }
  
  // 根据深度研究模式返回不同内容
  setTimeout(() => {
    let response
    if (deepResearchMode.value) {
      // 深度研究模式：针对报告进行对话
      response = {
        id: Date.now(),
        isUser: false,
        content: `【深度研究模式】关于"${question}"的报告分析：\n\n📊 根据当前报告"${currentReport.value?.name || 'AAPL 综合分析报告'}"的内容：\n\n这个问题涉及报告第3章"财务表现分析"的核心内容。报告显示苹果公司在该领域表现强劲，主要体现在：\n\n1. 营收增长10.2%，超出市场预期\n2. 服务业务毛利率达74%\n3. iPhone销售强劲复苏+15.8%\n\n建议您查阅报告详细章节获取完整分析数据。`,
        source: currentReport.value?.name || 'AAPL 综合分析报告',
        isDeepResearch: true,
        time: '刚刚'
      }
    } else {
      // 自由聊天模式
      response = {
        id: Date.now(),
        isUser: false,
        content: `关于"${question}"的分析：\n\n根据您上传的研究资料，这个问题涉及到公司的核心业务策略。以下是我的分析：\n\n• 从财务数据看，公司表现稳健\n• 市场竞争格局有利于龙头企业\n• 建议关注后续季报数据验证\n\n如需针对具体报告进行深度分析，请开启"深度研究"模式。`,
        source: 'Q3_2025_财报.pdf',
        time: '刚刚'
      }
    }
    chatMessages.value.push(response)
    
    // 更新消息数量
    if (currentChat.value) {
      currentChat.value.messageCount = chatMessages.value.length
    }
  }, 1000)
}

const askQuestion = (question) => {
  chatInput.value = question
  sendMessage()
}

// ========== 报告管理 ==========
const showReportDropdown = ref(false)
const activeReportMenu = ref(null)
const reportMenuPosition = ref({ x: 0, y: 0 })
const renamingReportId = ref(null)
const newReportName = ref('')

// 每个股票的报告列表
const stockReportsMap = ref({
  'AAPL': [
    { id: 1, name: 'AAPL 综合分析报告', date: '2025-01-15 14:30', type: '综合分析' },
    { id: 2, name: 'AAPL 财务深度分析', date: '2025-01-14 10:20', type: '财务分析' },
    { id: 3, name: 'AAPL 风险评估报告', date: '2025-01-13 16:45', type: '风险评估' }
  ],
  'TSLA': [
    { id: 4, name: 'TSLA 综合分析报告', date: '2025-01-12 09:00', type: '综合分析' }
  ]
})

// 当前股票的报告列表
const stockReports = computed(() => {
  return stockReportsMap.value[currentStock.value?.code] || []
})

// 当前报告
const currentReport = ref({ id: 1, name: 'AAPL 综合分析报告', date: '2025-01-15 14:30', type: '综合分析' })

// 选择报告
const selectReport = (report) => {
  currentReport.value = report
  showReportDropdown.value = false
}

// 显示报告菜单
const showReportMenu = (report, event) => {
  activeReportMenu.value = report
  reportMenuPosition.value = {
    x: event.clientX,
    y: event.clientY
  }
}

// 开始重命名报告
const startRenameReport = () => {
  if (!activeReportMenu.value) return
  renamingReportId.value = activeReportMenu.value.id
  newReportName.value = activeReportMenu.value.name
  activeReportMenu.value = null
  showReportDropdown.value = false
}

// 确认重命名报告
const confirmRenameReport = () => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockReportsMap.value[stockCode]) return
  
  const report = stockReportsMap.value[stockCode].find(r => r.id === renamingReportId.value)
  if (report && newReportName.value.trim()) {
    report.name = newReportName.value.trim()
    // 如果是当前报告，也更新
    if (currentReport.value?.id === report.id) {
      currentReport.value.name = report.name
    }
  }
  renamingReportId.value = null
  newReportName.value = ''
}

// 取消重命名报告
const cancelRenameReport = () => {
  renamingReportId.value = null
  newReportName.value = ''
}

// 删除报告
const deleteReport = () => {
  const stockCode = currentStock.value?.code
  if (!stockCode || !stockReportsMap.value[stockCode] || !activeReportMenu.value) return
  
  const reportId = activeReportMenu.value.id
  stockReportsMap.value[stockCode] = stockReportsMap.value[stockCode].filter(r => r.id !== reportId)
  
  // 如果删除的是当前报告，切换到第一个或清空
  if (currentReport.value?.id === reportId) {
    if (stockReportsMap.value[stockCode].length > 0) {
      currentReport.value = stockReportsMap.value[stockCode][0]
    } else {
      currentReport.value = null
      reportGenerated.value = false
    }
  }
  
  activeReportMenu.value = null
}

// ========== 对话管理 ==========
const showChatDropdown = ref(false)
const currentChat = ref({ id: 1, name: 'AAPL 研究对话', time: '今天 14:30', messageCount: 8 })
const deepResearchMode = ref(false) // 深度研究模式

// 历史对话列表及其消息
const chatHistoryMessages = ref({
  1: [
    { id: 1, isUser: true, content: '苹果的AI战略布局如何？', time: '10分钟前' },
    { id: 2, isUser: false, content: '根据您上传的资料分析，苹果的AI战略主要体现在以下几个方面：\n\n1. Apple Intelligence - 设备端AI能力\n2. Siri增强 - 自然语言交互\n3. 开发者生态 - Core ML框架\n\n苹果更注重隐私保护的端侧AI，与Google、Microsoft的云端AI策略有所不同。', source: '券商研报_苹果.pdf P.12', time: '9分钟前' },
    { id: 3, isUser: true, content: '服务业务的增长趋势如何？', time: '7分钟前' },
    { id: 4, isUser: false, content: '苹果服务业务表现强劲：\n\n📈 服务营收：连续14个季度双位数增长\n💰 2024年服务营收：约960亿美元\n📊 毛利率：高达74%，远超硬件业务\n\n主要增长驱动：\n• App Store佣金收入\n• Apple Music/TV+订阅\n• iCloud存储服务\n• Apple Care延保服务\n• Apple Pay交易抽成\n\n服务业务已成为公司第二大收入来源，且利润率显著高于硬件。', source: 'AAPL_10K_2024.pdf P.45', time: '6分钟前' },
    { id: 5, isUser: true, content: '中国市场面临哪些挑战？', time: '4分钟前' },
    { id: 6, isUser: false, content: '中国市场主要挑战：\n\n1. 华为竞争回归\n   - Mate 60系列强势回归\n   - 高端市场份额被蚕食\n\n2. 地缘政治风险\n   - 政府采购限制\n   - 民族品牌情绪\n\n3. 消费降级趋势\n   - 换机周期延长至4年+\n   - 性价比需求上升\n\n4. 本土生态竞争\n   - 微信小程序替代App Store\n   - 国产应用生态完善', source: '中国市场份额分析.xlsx', time: '3分钟前' },
    { id: 7, isUser: true, content: 'iPhone 17有什么新功能预期？', time: '1分钟前' },
    { id: 8, isUser: false, content: 'iPhone 17系列预期更新：\n\n🔲 设计变化：\n• 超薄Air版本（5.5mm）\n• 钛合金边框升级\n• 更小的灵动岛\n\n📸 相机升级：\n• 4800万像素主摄+长焦\n• ProRes 8K视频录制\n• 空间视频增强\n\n🧠 AI功能：\n• Apple Intelligence 2.0\n• 实时翻译增强\n• 智能摘要生成\n\n⚡ 性能提升：\n• A19 Pro芯片（3nm+）\n• 更大电池容量\n• 支持Wi-Fi 7', source: 'iPhone17_预测分析.docx', time: '刚刚' }
  ],
  2: [
    { id: 1, isUser: true, content: 'Apple Intelligence和Google Gemini对比分析', time: '昨天 10:20' },
    { id: 2, isUser: false, content: 'Apple Intelligence vs Google Gemini 核心差异：\n\n🔐 隐私策略：\n• Apple: 设备端优先，数据不出设备\n• Google: 云端处理为主，数据上传\n\n⚡ 处理能力：\n• Apple: 受限于设备算力\n• Google: 云端强大算力支持\n\n🎯 应用场景：\n• Apple: 系统级集成，Siri增强\n• Google: 独立应用，跨平台', source: 'Apple_AI_Strategy.pdf', time: '昨天 10:18' },
    { id: 3, isUser: true, content: '苹果AI落后的原因？', time: '昨天 10:15' },
    { id: 4, isUser: false, content: '苹果AI发展相对滞后的原因：\n\n1. 隐私优先策略限制了数据训练\n2. 设备端AI算力有限\n3. Siri团队内部问题\n4. 起步较晚，错过大模型窗口期\n5. 收购策略保守', source: '券商研报_苹果.pdf', time: '昨天 10:12' },
    { id: 5, isUser: true, content: '苹果追赶AI的策略', time: '昨天 10:08' }
  ],
  3: [
    { id: 1, isUser: true, content: '苹果2024年Q3财报亮点？', time: '1月13日 16:30' },
    { id: 2, isUser: false, content: '2024年Q3财报亮点：\n\n📈 总营收：$1,002亿（同比+10.2%）\n📱 iPhone营收：$631亿（同比+15.8%）\n💰 服务营收：$257亿（同比+14.1%）\n📊 毛利率：46.3%（环比提升）\n\n超预期表现得益于iPhone 16系列强劲需求和服务业务持续增长。', source: 'Q3_2025_财报.pdf', time: '1月13日 16:28' },
    { id: 3, isUser: true, content: '毛利率变化趋势', time: '1月13日 16:25' },
    { id: 4, isUser: false, content: '毛利率历史趋势：\n\n2021: 41.8%\n2022: 43.3%\n2023: 44.1%\n2024: 46.3%\n\n提升原因：\n1. 服务业务占比提升（毛利率74%）\n2. 供应链成本优化\n3. 定价策略优化', source: 'AAPL_10K_2024.pdf', time: '1月13日 16:22' }
  ],
  4: [
    { id: 1, isUser: true, content: '苹果vs三星市场份额对比', time: '1月10日 14:00' },
    { id: 2, isUser: false, content: '全球智能手机市场份额（2024Q3）：\n\n🍎 苹果：23.4%（+2.1pp）\n📱 三星：18.1%（-1.3pp）\n🔴 华为：11.2%（+4.5pp）\n\n苹果在高端市场（$600+）份额达67%，三星23%。', source: '中国市场份额分析.xlsx', time: '1月10日 13:58' }
  ]
})

const chatHistory = ref([
  { id: 1, name: 'AAPL 研究对话', time: '今天 14:30', messageCount: 8 },
  { id: 2, name: 'AI战略分析', time: '昨天 10:20', messageCount: 5 },
  { id: 3, name: '财务数据问答', time: '1月13日', messageCount: 12 },
  { id: 4, name: '竞品对比讨论', time: '1月10日', messageCount: 6 }
])

// 开启新对话
const startNewChat = () => {
  const newId = Date.now()
  const newChat = {
    id: newId,
    name: '新对话',
    time: '刚刚',
    messageCount: 0
  }
  chatHistory.value.unshift(newChat)
  chatHistoryMessages.value[newId] = []
  currentChat.value = newChat
  chatMessages.value = [
    { 
      id: 1, 
      isUser: false, 
      content: '您好！我已经分析了您上传的 ' + uploadedFiles.value.length + ' 份资料。有什么想深入了解的吗？', 
      time: '刚刚' 
    }
  ]
  showChatDropdown.value = false
}

// 选择对话
const selectChat = (chat) => {
  // 保存当前对话的消息
  if (currentChat.value) {
    chatHistoryMessages.value[currentChat.value.id] = [...chatMessages.value]
  }
  
  currentChat.value = chat
  showChatDropdown.value = false
  
  // 加载选中对话的消息
  if (chatHistoryMessages.value[chat.id]) {
    chatMessages.value = [...chatHistoryMessages.value[chat.id]]
  } else {
    chatMessages.value = [
      { 
        id: 1, 
        isUser: false, 
        content: '您好！我已经分析了您上传的 ' + uploadedFiles.value.length + ' 份资料。有什么想深入了解的吗？', 
        time: '刚刚' 
      }
    ]
  }
}

// 切换深度研究模式
const toggleDeepResearchMode = () => {
  deepResearchMode.value = !deepResearchMode.value
}

// ========== 文件操作 ==========
// 在新标签页打开源文件
const openFileInNewTab = (file) => {
  // 模拟文件URL，实际项目中应该是真实的文件URL
  const fileUrl = `/api/files/${file.id}/${encodeURIComponent(file.name)}`
  window.open(fileUrl, '_blank')
}

// 基于文件提问
const askAboutFile = (file) => {
  closeFileDetail()
  chatInput.value = `请分析 "${file.name}" 中的主要内容`
  // 自动聚焦到输入框
}
</script>

<style scoped>
/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #3a3a3a;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}

/* 垂直文字 */
.writing-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* 报告内容区域动态主题适配 */
.report-content h2 {
  border-bottom-width: 1px;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.report-content.prose h2 {
  color: inherit;
}

.report-content.prose-invert h2 {
  color: white;
}

.report-content p {
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.report-content ul {
  margin-bottom: 1.5rem;
}

.report-content li {
  margin-bottom: 0.5rem;
}
</style>
