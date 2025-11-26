<template>
  <div class="min-h-screen bg-[#1a1a1a] py-8">
    <div class="max-w-5xl mx-auto px-6">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">我的投资信息</h1>
            <p class="text-gray-400">完善您的个人信息，为您生成更精准的投资组合建议</p>
          </div>
          <button
            @click="fillDemoData"
            class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
            填充测试数据
          </button>
        </div>
      </div>

      <!-- Module 0: Progress Overview -->
      <div class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-white">完成度</h2>
          <span class="text-2xl font-bold text-white">{{ completionPercentage }}%</span>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-[#1f1f1f] rounded-full h-3 mb-4">
          <div 
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${completionPercentage}%` }"
          ></div>
        </div>

        <!-- Module Status -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div class="flex items-center gap-2 text-sm">
            <div :class="[
              'w-5 h-5 rounded-full flex items-center justify-center',
              moduleStatus.riskAssessment ? 'bg-green-500' : 'bg-gray-600'
            ]">
              <svg v-if="moduleStatus.riskAssessment" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-300">风险偏好</span>
          </div>
          
          <div class="flex items-center gap-2 text-sm">
            <div :class="[
              'w-5 h-5 rounded-full flex items-center justify-center',
              moduleStatus.holdings ? 'bg-green-500' : 'bg-gray-600'
            ]">
              <svg v-if="moduleStatus.holdings" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-300">持仓信息 <span class="text-red-400">*</span></span>
          </div>
          
          <div class="flex items-center gap-2 text-sm">
            <div :class="[
              'w-5 h-5 rounded-full flex items-center justify-center',
              moduleStatus.knowledge ? 'bg-green-500' : 'bg-gray-600'
            ]">
              <svg v-if="moduleStatus.knowledge" class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <span class="text-gray-300">知识库</span>
          </div>
        </div>
      </div>

      <!-- Module 1: Risk Assessment -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-white">1. 风险偏好评估</h2>
          <button
            @click="openRiskAssessment"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
          >
            {{ riskAssessmentResult ? '重新评估' : '开始评估' }}
          </button>
        </div>
        
        <div v-if="riskAssessmentResult" class="bg-[#1f1f1f] border border-[#404040] rounded-lg p-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div>
              <div class="font-medium text-white">评估完成</div>
              <div class="text-sm text-gray-400">
                风险等级: <span :class="getRiskLevelColor(riskAssessmentResult.riskLevel)" class="font-semibold">{{ getRiskLevelLabel(riskAssessmentResult.riskLevel) }}</span>
              </div>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-400 text-sm">通过5道问题了解您的投资偏好和风险承受能力</p>
      </div>

      <!-- Module 2: Holdings Information -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-white">
            2. 持仓信息 <span class="text-red-400 text-sm">*必填</span>
          </h2>
        </div>

        <!-- Input Method Tabs -->
        <div class="flex gap-2 mb-6 border-b border-[#404040]">
          <button
            v-for="method in inputMethods"
            :key="method.value"
            @click="currentInputMethod = method.value"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors border-b-2',
              currentInputMethod === method.value
                ? 'text-blue-400 border-blue-500'
                : 'text-gray-400 border-transparent hover:text-gray-300'
            ]"
          >
            {{ method.label }}
          </button>
        </div>

        <!-- Manual Input -->
        <div v-if="currentInputMethod === 'manual'" class="space-y-4">
          <!-- 股票代码输入 -->
          <div class="flex gap-3 items-center">
            <input
              v-model="newHolding.symbol"
              placeholder="股票代码 (如 AAPL)"
              class="flex-1 bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <input
              v-model.number="newHolding.cost"
              type="number"
              placeholder="成本价"
              class="w-40 bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              @click="addHolding"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              添加
            </button>
          </div>

          <!-- 总仓位可视化条形图 -->
          <div v-if="holdings.length > 0" class="bg-[#1f1f1f] border border-[#404040] rounded-lg p-4 mb-4">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-medium text-gray-300">总仓位分布</label>
              <div class="text-sm">
                <span class="text-gray-400">已使用：</span>
                <span :class="[
                  'font-bold',
                  currentTotalPosition > 100 ? 'text-red-400' : 'text-green-400'
                ]">
                  {{ currentTotalPosition.toFixed(1) }}%
                </span>
                <span v-if="currentTotalPosition <= 100" class="text-gray-500 ml-2">
                  / 剩余：<span class="text-blue-400 font-bold">{{ (100 - currentTotalPosition).toFixed(1) }}%</span>
                </span>
              </div>
            </div>
            
            <!-- 分段条形图 -->
            <div class="w-full h-8 bg-[#2a2a2a] rounded-lg overflow-hidden flex">
              <div
                v-for="(holding, index) in holdings"
                :key="index"
                :style="{
                  width: holding.position + '%',
                  backgroundColor: getStockColor(index)
                }"
                class="flex items-center justify-center text-xs font-medium text-white transition-all duration-300 hover:opacity-80 relative group"
                :title="`${holding.symbol}: ${holding.position}%`"
              >
                <span v-if="holding.position >= 5" class="truncate px-1">
                  {{ holding.symbol }}
                </span>
                <!-- Tooltip -->
                <div class="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
                  {{ holding.symbol }}: {{ holding.position }}%
                </div>
              </div>
              <!-- 剩余空间 -->
              <div
                v-if="currentTotalPosition < 100"
                :style="{ width: (100 - currentTotalPosition) + '%' }"
                class="flex items-center justify-center text-xs text-gray-500"
              >
                <span v-if="(100 - currentTotalPosition) >= 5">
                  剩余 {{ (100 - currentTotalPosition).toFixed(1) }}%
                </span>
              </div>
            </div>

            <!-- 图例 -->
            <div class="flex flex-wrap gap-2 mt-3">
              <div
                v-for="(holding, index) in holdings.slice(0, 6)"
                :key="index"
                class="flex items-center gap-1.5"
              >
                <div
                  class="w-3 h-3 rounded-sm"
                  :style="{ backgroundColor: getStockColor(index) }"
                ></div>
                <span class="text-xs text-gray-400">{{ holding.symbol }}</span>
              </div>
              <div v-if="holdings.length > 6" class="flex items-center gap-1.5">
                <span class="text-xs text-gray-500">+{{ holdings.length - 6 }} 更多</span>
              </div>
            </div>
          </div>

          <!-- 仓位滑动条 -->
          <div class="bg-[#1f1f1f] border border-[#404040] rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <label class="text-sm font-medium text-gray-300">仓位比例</label>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-bold text-blue-400">{{ newHolding.position }}%</span>
                <span class="text-xs text-gray-500">/ 剩余 {{ remainingPosition }}%</span>
              </div>
            </div>
            <div class="relative">
              <input
                v-model.number="newHolding.position"
                type="range"
                min="0"
                :max="Math.min(100, 100 - currentTotalPosition)"
                step="0.5"
                class="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer slider-with-fill"
                :style="{ '--slider-value': newHolding.position + '%', '--slider-color': '#3b82f6' }"
              />
            </div>
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>{{ Math.min(100, 100 - currentTotalPosition) }}%</span>
            </div>
          </div>

          <!-- Holdings List -->
          <div v-if="holdings.length > 0" class="mt-4">
            <div class="flex items-center justify-between mb-3">
              <div class="text-sm font-medium text-gray-400">已添加的持仓 ({{ holdings.length }})</div>
              <div class="text-sm">
                <span class="text-gray-400">总仓位：</span>
                <span :class="[
                  'font-bold',
                  currentTotalPosition > 100 ? 'text-red-400' : 'text-green-400'
                ]">
                  {{ currentTotalPosition.toFixed(1) }}%
                </span>
                <span v-if="currentTotalPosition > 100" class="text-red-400 text-xs ml-1">⚠️ 超过100%</span>
              </div>
            </div>
            <div class="space-y-4">
              <div
                v-for="(holding, index) in holdings"
                :key="index"
                class="bg-[#1f1f1f] border border-[#404040] rounded-lg p-4"
              >
                <!-- 标题行：股票代码 + 成本价 + 删除按钮 -->
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <div class="font-mono font-bold text-white text-lg">{{ holding.symbol }}</div>
                    <div class="text-sm text-gray-400">成本价: ${{ holding.cost }}</div>
                  </div>
                  <button
                    @click="removeHolding(index)"
                    class="text-red-400 hover:text-red-300 transition-colors"
                    title="删除该持仓"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>

                <!-- 仓位滑动条 -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <label class="text-xs font-medium text-gray-400">仓位比例</label>
                    <span class="text-lg font-bold" :style="{ color: getStockColor(index) }">
                      {{ holding.position }}%
                    </span>
                  </div>
                  <div class="relative">
                    <input
                      v-model.number="holding.position"
                      @input="handlePositionChange(index)"
                      type="range"
                      min="0"
                      max="100"
                      step="0.5"
                      class="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer slider-with-fill"
                      :style="{ 
                        '--slider-value': holding.position + '%',
                        '--slider-color': getStockColor(index)
                      }"
                    />
                  </div>
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- File Upload -->
        <div v-else-if="currentInputMethod === 'file'">
          <div class="border-2 border-dashed border-[#404040] rounded-lg p-8 text-center">
            <input
              ref="fileInput"
              type="file"
              accept=".csv,.xlsx,.xls"
              @change="handleFileUpload"
              class="hidden"
            />
            <button
              @click="$refs.fileInput.click()"
              class="inline-flex flex-col items-center gap-2"
            >
              <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <span class="text-gray-300">点击上传 CSV/Excel 文件</span>
              <span class="text-xs text-gray-500">支持标准券商导出格式</span>
            </button>
          </div>
        </div>

        <!-- Broker Connect -->
        <div v-else-if="currentInputMethod === 'broker'">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              v-for="broker in brokers"
              :key="broker.id"
              @click="connectBroker(broker.id)"
              class="flex flex-col items-center gap-2 p-4 bg-[#1f1f1f] border border-[#404040] rounded-lg hover:border-blue-500 transition-colors"
            >
              <div class="w-12 h-12 bg-[#2a2a2a] rounded-lg flex items-center justify-center">
                <span class="text-xl">{{ broker.icon }}</span>
              </div>
              <span class="text-sm text-gray-300">{{ broker.name }}</span>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-4 text-center">* 券商连接功能即将上线</p>
        </div>

        <!-- Import from Info -->
        <div v-else-if="currentInputMethod === 'import'">
          <div class="text-center py-8">
            <p class="text-gray-400 mb-4">从 Info 页面导入您关注的股票</p>
            <button
              @click="importFromInfo"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              导入关注列表
            </button>
          </div>
        </div>
      </div>

      <!-- Module 3: Knowledge Base -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-xl font-semibold text-white">3. 知识库 <span class="text-gray-500 text-sm">(可选)</span></h2>
            <p class="text-sm text-gray-400 mt-1">上传您的研究报告、投资笔记等文档，帮助AI更好地理解您的投资逻辑</p>
          </div>
        </div>

        <div class="border-2 border-dashed border-[#404040] rounded-lg p-6">
          <input
            ref="knowledgeFileInput"
            type="file"
            accept=".pdf,.txt,.md"
            multiple
            @change="handleKnowledgeUpload"
            class="hidden"
          />
          <button
            @click="$refs.knowledgeFileInput.click()"
            class="w-full flex flex-col items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            <span>点击上传文档</span>
            <span class="text-xs">支持 PDF / TXT / Markdown 格式</span>
          </button>
        </div>

        <!-- Uploaded Files -->
        <div v-if="knowledgeFiles.length > 0" class="mt-4 space-y-2">
          <div class="text-sm font-medium text-gray-400 mb-2">已上传文档 ({{ knowledgeFiles.length }})</div>
          <div
            v-for="(file, index) in knowledgeFiles"
            :key="index"
            class="flex items-center justify-between bg-[#1f1f1f] rounded-lg p-3"
          >
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
              </svg>
              <div>
                <div class="text-sm text-white">{{ file.name }}</div>
                <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
              </div>
            </div>
            <button
              @click="removeKnowledgeFile(index)"
              class="text-red-400 hover:text-red-300 transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex justify-between items-center pt-4">
        <div class="flex gap-4">
          <button
            @click="handleReset"
            class="px-6 py-3 bg-[#3a3a3a] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors"
          >
            重置全部
          </button>
          
          <!-- 保存草稿按钮 -->
          <button
            @click="handleSaveDraft"
            class="px-6 py-3 bg-[#2a4a2a] hover:bg-[#2f552f] text-green-300 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
            </svg>
            <span>保存草稿</span>
          </button>
        </div>
        
        <div class="flex gap-4">
          <!-- 提交信息按钮 -->
          <button
            @click="handleSubmitInfo"
            :disabled="!isFormValid || isSubmitted"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
              isFormValid && !isSubmitted
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            ]"
          >
            <svg v-if="!isSubmitted" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>{{ isSubmitted ? '已提交信息' : '提交信息' }}</span>
          </button>

          <!-- 下一步按钮 -->
          <button
            @click="handleNext"
            :disabled="!isSubmitted"
            :class="[
              'px-8 py-3 rounded-lg font-medium text-lg transition-all duration-200 flex items-center gap-2',
              isSubmitted
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            ]"
          >
            <span>下一步：机会发现</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Info Note -->
      <div class="mt-6 text-center text-sm text-gray-500">
        <p>完成后，系统将基于您的信息生成个性化的投资组合建议</p>
      </div>
    </div>

    <!-- Risk Assessment Modal -->
    <RiskAssessmentModal
      :isOpen="showRiskModal"
      @close="showRiskModal = false"
      @submit="handleRiskAssessmentSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWorkflowProgress } from '../composables/useWorkflowProgress'
import RiskAssessmentModal from '../components/RiskAssessmentModal.vue'

const router = useRouter()
const { updateProgress, userProgress } = useWorkflowProgress()

// Modal state
const showRiskModal = ref(false)

// Submission state
const isSubmitted = ref(false)

// Risk Assessment
const riskAssessmentResult = ref(null)

// Holdings
const currentInputMethod = ref('manual')
const newHolding = ref({ symbol: '', position: 0, cost: null })
const holdings = ref([])

// Knowledge Base
const knowledgeFiles = ref([])

// Input methods
const inputMethods = [
  { value: 'manual', label: '手动添加' },
  { value: 'file', label: '文件上传' },
  { value: 'broker', label: '券商连接' },
  { value: 'import', label: '从Info导入' }
]

// Brokers
const brokers = [
  { id: 'interactive', name: 'Interactive Brokers', icon: '🏦' },
  { id: 'charles', name: 'Charles Schwab', icon: '💼' },
  { id: 'fidelity', name: 'Fidelity', icon: '🏛️' },
  { id: 'robinhood', name: 'Robinhood', icon: '🦅' }
]

// Module Status
const moduleStatus = computed(() => ({
  riskAssessment: !!riskAssessmentResult.value,
  holdings: holdings.value.length > 0,
  knowledge: knowledgeFiles.value.length > 0
}))

// Completion Percentage
const completionPercentage = computed(() => {
  const completed = Object.values(moduleStatus.value).filter(Boolean).length
  const requiredCompleted = moduleStatus.value.holdings ? 1 : 0
  
  // 必填项(持仓)占50%，其他可选项各占25%
  let percentage = 0
  if (moduleStatus.value.holdings) percentage += 50
  if (moduleStatus.value.riskAssessment) percentage += 25
  if (moduleStatus.value.knowledge) percentage += 25
  
  return percentage
})

// Form Validation
const isFormValid = computed(() => {
  return moduleStatus.value.holdings // 只要求持仓信息为必填
})

// Risk Assessment
const openRiskAssessment = () => {
  showRiskModal.value = true
}

const handleRiskAssessmentSubmit = (result) => {
  riskAssessmentResult.value = result
  saveData()
}

const getRiskLevelLabel = (level) => {
  const labels = {
    conservative: '保守型',
    moderate: '稳健型',
    aggressive: '进取型'
  }
  return labels[level] || level
}

const getRiskLevelColor = (level) => {
  const colors = {
    conservative: 'text-blue-400',
    moderate: 'text-yellow-400',
    aggressive: 'text-red-400'
  }
  return colors[level] || 'text-gray-400'
}

// Computed: 当前总仓位
const currentTotalPosition = computed(() => {
  return holdings.value.reduce((sum, h) => sum + (h.position || 0), 0)
})

// Computed: 剩余可用仓位
const remainingPosition = computed(() => {
  return Math.max(0, 100 - currentTotalPosition.value)
})

// Holdings Management
const addHolding = () => {
  if (!newHolding.value.symbol) {
    alert('请输入股票代码！')
    return
  }
  if (!newHolding.value.cost || newHolding.value.cost <= 0) {
    alert('请输入有效的成本价！')
    return
  }
  if (!newHolding.value.position || newHolding.value.position <= 0) {
    alert('请设置仓位比例！')
    return
  }
  
  // 检查是否超过100%
  const newTotal = currentTotalPosition.value + newHolding.value.position
  if (newTotal > 100) {
    const canAdd = confirm(
      `⚠️ 仓位警告\n\n` +
      `当前总仓位：${currentTotalPosition.value.toFixed(1)}%\n` +
      `要添加的仓位：${newHolding.value.position}%\n` +
      `添加后总计：${newTotal.toFixed(1)}%\n\n` +
      `总仓位将超过 100%，是否继续添加？`
    )
    if (!canAdd) return
  }
  
  holdings.value.push({ ...newHolding.value })
  newHolding.value = { symbol: '', position: 0, cost: null }
  saveData()
}

// 为每个股票分配颜色
const stockColors = [
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#8b5cf6', // 紫色
  '#f59e0b', // 橙色
  '#ef4444', // 红色
  '#06b6d4', // 青色
  '#ec4899', // 粉色
  '#14b8a6', // 蓝绿
  '#f97316', // 深橙
  '#6366f1', // 靛蓝
  '#84cc16', // 青柠
  '#f43f5e', // 玫瑰
]

const getStockColor = (index) => {
  return stockColors[index % stockColors.length]
}

// 处理持仓仓位调整
const handlePositionChange = (index) => {
  // 确保值在有效范围内
  const holding = holdings.value[index]
  if (holding.position < 0) holding.position = 0
  if (holding.position > 100) holding.position = 100
  
  // 自动保存
  saveData()
}

const removeHolding = (index) => {
  holdings.value.splice(index, 1)
  saveData()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    alert('文件上传功能即将上线！')
    // TODO: Implement file parsing
  }
}

const connectBroker = (brokerId) => {
  alert(`券商连接功能即将上线！\n选择的券商: ${brokerId}`)
}

const importFromInfo = () => {
  alert('从Info导入功能即将上线！')
  // TODO: Import from info watchlist
}

// Knowledge Base
const handleKnowledgeUpload = (event) => {
  const files = Array.from(event.target.files)
  knowledgeFiles.value.push(...files)
  saveData()
}

const removeKnowledgeFile = (index) => {
  knowledgeFiles.value.splice(index, 1)
  saveData()
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Data Persistence
const saveData = () => {
  const data = {
    riskAssessmentResult: riskAssessmentResult.value,
    holdings: holdings.value,
    knowledgeFiles: knowledgeFiles.value.map(f => ({ name: f.name, size: f.size }))
  }
  localStorage.setItem('portfolio_input_data', JSON.stringify(data))
}

const loadData = () => {
  const saved = localStorage.getItem('portfolio_input_data')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      riskAssessmentResult.value = data.riskAssessmentResult || null
      holdings.value = data.holdings || []
      // Note: Can't restore actual file objects, only metadata
    } catch (e) {
      console.error('Failed to load data:', e)
    }
  }
  
  // 加载提交状态
  const submitted = localStorage.getItem('portfolio_info_submitted')
  isSubmitted.value = submitted === 'true'
}

// Form Actions - 提交信息按钮
const handleSubmitInfo = () => {
  if (!isFormValid.value) {
    alert('请至少添加一条持仓信息！')
    return
  }

  // 保存数据
  saveData()
  
  // 标记为已提交
  isSubmitted.value = true
  localStorage.setItem('portfolio_info_submitted', 'true')
  
  // 更新工作流进度，解锁机会发现页面
  updateProgress('hasInputPortfolio', true)
  
  alert('✅ 投资信息已成功提交！\n\n您现在可以前往"机会发现"页面了。')
}

// 下一步按钮 - 跳转到机会发现
const handleNext = () => {
  if (!isSubmitted.value) {
    alert('请先提交投资信息！')
    return
  }
  
  router.push('/opportunity')
}

// 保存草稿 - 不触发提交流程
const handleSaveDraft = () => {
  // 保存当前数据
  saveData()
  
  // 保存时间戳
  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit', 
    minute: '2-digit' 
  })
  localStorage.setItem('portfolio_last_saved', now.toISOString())
  
  // 给用户反馈
  let savedInfo = []
  if (riskAssessmentResult.value) savedInfo.push('风险评估')
  if (holdings.value.length > 0) savedInfo.push(`${holdings.value.length}个持仓`)
  if (knowledgeFiles.value.length > 0) savedInfo.push(`${knowledgeFiles.value.length}个文档`)
  
  const message = savedInfo.length > 0 
    ? `💾 草稿已保存！\n\n保存时间：${timeStr}\n保存内容：${savedInfo.join('、')}`
    : `💾 草稿已保存！\n\n保存时间：${timeStr}\n当前无内容`
  
  alert(message)
}

const handleReset = () => {
  if (confirm('确定要重置所有信息吗？此操作不可撤销。')) {
    riskAssessmentResult.value = null
    holdings.value = []
    knowledgeFiles.value = []
    newHolding.value = { symbol: '', position: 0, cost: null }
    isSubmitted.value = false
    localStorage.removeItem('portfolio_input_data')
    localStorage.removeItem('portfolio_info_submitted')
    localStorage.removeItem('portfolio_last_saved')
  }
}

// Fill Demo Data
const fillDemoData = () => {
  if (holdings.value.length > 0 || riskAssessmentResult.value) {
    if (!confirm('当前已有数据，确定要用测试数据覆盖吗？')) {
      return
    }
  }

  // 1. Fill Risk Assessment Result
  riskAssessmentResult.value = {
    answers: ['balanced', 'experienced', 'medium', 'review', 'growth'],
    riskLevel: 'moderate'
  }

  // 2. Fill Holdings - 包含不同行业、市值、仓位的复杂组合
  holdings.value = [
    // 科技股 - 大盘核心持仓（45%）
    { symbol: 'AAPL', position: 12, cost: 175.50 },
    { symbol: 'MSFT', position: 10, cost: 380.25 },
    { symbol: 'NVDA', position: 8, cost: 495.80 },
    { symbol: 'GOOGL', position: 7, cost: 142.30 },
    { symbol: 'META', position: 8, cost: 325.60 },
    
    // 科技股 - 成长型中小盘（15%）
    { symbol: 'AMD', position: 5, cost: 125.40 },
    { symbol: 'TSLA', position: 5, cost: 245.80 },
    { symbol: 'SNOW', position: 5, cost: 185.20 },
    
    // 金融板块（12%）
    { symbol: 'JPM', position: 5, cost: 155.75 },
    { symbol: 'V', position: 4, cost: 265.90 },
    { symbol: 'BRK.B', position: 3, cost: 385.40 },
    
    // 消费品（10%）
    { symbol: 'AMZN', position: 5, cost: 165.50 },
    { symbol: 'COST', position: 3, cost: 685.30 },
    { symbol: 'NKE', position: 2, cost: 95.60 },
    
    // 医疗健康（8%）
    { symbol: 'UNH', position: 3, cost: 525.80 },
    { symbol: 'JNJ', position: 3, cost: 160.25 },
    { symbol: 'PFE', position: 2, cost: 28.90 },
    
    // ETF - 分散风险（10%）
    { symbol: 'SPY', position: 5, cost: 455.80 },
    { symbol: 'QQQ', position: 5, cost: 385.20 }
  ]

  // 3. Fill Knowledge Base Files (模拟文件对象)
  const mockFiles = [
    { name: '2024年投资策略报告.pdf', size: 2458000 },
    { name: '科技股研究笔记.md', size: 125000 },
    { name: 'AI行业深度分析.pdf', size: 3567000 },
    { name: '个人投资日志.txt', size: 45000 }
  ]
  
  // 创建模拟的File对象
  knowledgeFiles.value = mockFiles.map(f => {
    // 使用空Blob创建File对象作为placeholder
    return new File([new Blob()], f.name, { 
      type: f.name.endsWith('.pdf') ? 'application/pdf' : 
            f.name.endsWith('.md') ? 'text/markdown' : 'text/plain',
      lastModified: Date.now()
    })
  })
  
  // 为了显示正确的文件大小，我们需要覆盖size属性（虽然File对象的size是只读的，但我们可以添加自定义属性）
  knowledgeFiles.value.forEach((file, index) => {
    Object.defineProperty(file, 'size', {
      value: mockFiles[index].size,
      writable: false
    })
  })

  saveData()
  
  // 显示成功提示
  const totalPosition = holdings.value.reduce((sum, h) => sum + h.position, 0)
  alert(`✅ 测试数据已填充！\n\n已添加：\n• 风险评估：稳健型\n• ${holdings.value.length}个股票持仓（总仓位 ${totalPosition}%）\n• 涵盖科技、金融、消费、医疗等板块\n• 4个知识库文档`)
}

// Load data on mount
loadData()
</script>

<style scoped>
/* 滑动条自定义样式 - 带左侧高亮填充效果 */
.slider-with-fill {
  position: relative;
  background: linear-gradient(
    to right,
    var(--slider-color, #3b82f6) 0%,
    var(--slider-color, #3b82f6) var(--slider-value, 0%),
    #2a2a2a var(--slider-value, 0%),
    #2a2a2a 100%
  );
  transition: background 0.15s ease;
}

.slider-with-fill::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--slider-color, linear-gradient(135deg, #3b82f6, #8b5cf6));
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
  transition: all 0.2s;
  border: 2px solid white;
}

.slider-with-fill::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.7);
}

.slider-with-fill::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--slider-color, #3b82f6);
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
  transition: all 0.2s;
}

.slider-with-fill::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.7);
}

/* 旧样式保留（如果有其他地方用到） */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  transition: all 0.2s;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
  transition: all 0.2s;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6);
}
</style>
