<template>
  <div class="space-y-4">
    <!-- Empty State - No Portfolios -->
    <div v-if="portfolios.length === 0" class="max-w-2xl mx-auto">
      <div 
        class="border rounded-lg p-8 text-center"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <!-- Icon -->
        <div 
          class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.08)' }"
        >
          <svg class="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <!-- Title & Description -->
        <h3 class="text-xl font-bold mb-3" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.simulation.emptyTitle') }}
        </h3>
        <p class="text-sm mb-6 max-w-md mx-auto" :style="{ color: tokens.colors.text.muted }">
          {{ $t('portfolio.simulation.emptyDesc') }}
        </p>

        <!-- Features -->
        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">零风险验证策略</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">实时行情模拟</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">收益统计分析</span>
          </div>
        </div>

        <!-- Create Button -->
        <button 
          @click="showCreateModal = true"
          class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-900/20"
        >
          {{ $t('portfolio.simulation.createFirst') }}
        </button>
      </div>
    </div>

    <!-- Has Portfolios - Main Interface -->
    <div v-else class="space-y-4">
      <!-- 合并的模拟盘选择器 + 统计栏 -->
      <div 
        class="border rounded-lg p-3"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="flex items-center gap-3">
          <!-- 左侧：模拟盘选择器 -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- All Portfolios Option -->
            <button 
              @click="switchViewMode('all')"
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all"
              :class="isAllPortfoliosMode ? 'ring-2 ring-indigo-500' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
              :style="{ 
                backgroundColor: isAllPortfoliosMode ? (isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)') : 'transparent',
                borderColor: isAllPortfoliosMode ? 'rgba(99, 102, 241, 0.5)' : tokens.colors.border.default
              }"
            >
              <div 
                class="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                :style="{ 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: tokens.colors.text.primary 
                }"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-xs font-medium leading-tight" :style="{ color: tokens.colors.text.primary }">全部</p>
                <p class="text-xs leading-tight" :style="{ color: tokens.colors.text.muted }">{{ formatCompactMoney(summaryCurrentValue) }}</p>
              </div>
              <span v-if="isAllPortfoliosMode" class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            </button>

            <!-- Individual Portfolio Options -->
            <button 
              v-for="portfolio in portfolios" 
              :key="portfolio.id"
              @click="switchViewMode(portfolio.id)"
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all"
              :class="viewMode === portfolio.id ? 'ring-2 ring-indigo-500' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
              :style="{ 
                backgroundColor: viewMode === portfolio.id ? (isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)') : 'transparent',
                borderColor: viewMode === portfolio.id ? 'rgba(99, 102, 241, 0.5)' : tokens.colors.border.default
              }"
            >
              <div class="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold bg-indigo-500">
                {{ portfolio.name?.slice(0, 2) || 'SIM' }}
              </div>
              <div class="text-left">
                <p class="text-xs font-medium leading-tight" :style="{ color: tokens.colors.text.primary }">
                  {{ portfolio.name }}
                </p>
                <p class="text-xs leading-tight" :style="{ color: tokens.colors.text.muted }">{{ formatCompactMoney(portfolio.currentValue) }}</p>
              </div>
              <span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            </button>

            <!-- Add Portfolio Button -->
            <button 
              @click="showCreateModal = true"
              class="flex items-center justify-center w-8 h-8 rounded-lg border border-dashed transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
              :title="$t('portfolio.simulation.createBtn')"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <!-- 分隔线 -->
          <div class="w-px h-10 flex-shrink-0" :style="{ backgroundColor: tokens.colors.border.default }"></div>

          <!-- 中间：快速统计 -->
          <div class="flex items-center gap-4 flex-shrink-0">
            <div class="text-center">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">可用</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatCompactMoney(displayAvailableCash) }}</p>
            </div>
            <div class="text-center">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">持仓</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatCompactMoney(displayHoldingsValue) }}</p>
            </div>
            <div class="text-center">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">仓位</p>
              <div class="flex items-center gap-1.5">
                <div class="w-12 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }">
                  <div class="h-full rounded-full bg-indigo-500" :style="{ width: `${displayPositionRatio}%` }"></div>
                </div>
                <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ displayPositionRatio.toFixed(0) }}%</span>
              </div>
            </div>
          </div>

          <!-- 分隔线 -->
          <div class="w-px h-10 flex-shrink-0" :style="{ backgroundColor: tokens.colors.border.default }"></div>

          <!-- 右侧：核心指标 + 操作 -->
          <div class="flex items-center gap-4 ml-auto">
            <div class="text-right">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.currentValue') }}</p>
              <p class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(displayCurrentValue) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.totalReturn') }}</p>
              <p 
                class="text-base font-bold"
                :class="displayTotalReturn >= 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ displayTotalReturn >= 0 ? '+' : '' }}{{ displayTotalReturn.toFixed(2) }}%
              </p>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center gap-1.5 ml-2">
              <button 
                v-if="!isAllPortfoliosMode"
                @click="openTradeModal"
                class="px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
              >
                <svg class="w-3.5 h-3.5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                交易
              </button>
              <button 
                v-if="!isAllPortfoliosMode"
                @click="handleDeletePortfolio"
                class="p-1.5 rounded-lg border transition-colors text-red-500 hover:bg-red-500/10"
                :style="{ borderColor: tokens.colors.border.default }"
                :title="$t('portfolio.simulation.deleteBtn')"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content: Left Holdings + Right Pending Orders -->
      <div class="flex gap-4" style="min-height: 400px;">
        <!-- Left: Holdings -->
        <div 
          class="flex-1 border rounded-lg overflow-hidden flex flex-col"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: tokens.colors.border.default 
          }"
        >
          <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
            <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
              {{ $t('portfolio.simulation.detail.tabHoldings') }} ({{ isAllPortfoliosMode ? groupedHoldings.length : (displayPortfolio?.holdings?.length || 0) }})
            </h3>
            <span v-if="isAllPortfoliosMode" class="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
              汇总视图
            </span>
          </div>
          
          <!-- 非汇总模式: 普通表格 -->
          <div v-if="!isAllPortfoliosMode && displayPortfolio?.holdings?.length > 0" class="flex-1 overflow-auto">
            <table class="w-full">
              <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
                <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                  <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">股票</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">数量</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">市值</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">盈亏</th>
                </tr>
              </thead>
              <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
                <tr 
                  v-for="holding in displayPortfolio.holdings" 
                  :key="holding.symbol"
                  class="transition-colors"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                >
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                        :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: tokens.colors.text.primary }"
                      >{{ holding.symbol.slice(0, 2) }}</div>
                      <div>
                        <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ holding.symbol }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ holding.name }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">{{ holding.quantity }}</td>
                  <td class="px-4 py-3 text-right">
                    <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holding.marketValue) }}</p>
                    <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(holding.currentPrice) }}</p>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <p class="font-medium text-sm" :class="(holding.pnl || 0) >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ (holding.pnl || 0) >= 0 ? '+' : '' }}{{ formatMoney(holding.pnl || 0) }}
                    </p>
                    <p class="text-xs" :class="(holding.pnlPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500'">
                      {{ (holding.pnlPercent || 0) >= 0 ? '+' : '' }}{{ (holding.pnlPercent || 0).toFixed(2) }}%
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 汇总模式: 按股票分组的表格 -->
          <div v-else-if="isAllPortfoliosMode && groupedHoldings.length > 0" class="flex-1 overflow-auto">
            <table class="w-full">
              <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
                <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                  <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">股票</th>
                  <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">模拟盘</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">数量</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">市值</th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">盈亏</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(group, groupIndex) in groupedHoldings" :key="group.symbol">
                  <!-- 股票汇总行 - 只在有多个模拟盘时显示 -->
                  <tr 
                    v-if="group.portfolios.length > 1"
                    class="border-t-2"
                    :style="{ 
                      backgroundColor: isDark ? 'rgba(99, 102, 241, 0.08)' : 'rgba(99, 102, 241, 0.04)',
                      borderColor: tokens.colors.border.default
                    }"
                  >
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-2">
                        <div 
                          class="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                          :style="{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }"
                        >{{ group.symbol.slice(0, 2) }}</div>
                        <div>
                          <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ group.symbol }}</p>
                          <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ group.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <span class="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
                        {{ group.portfolios.length }} 个模拟盘合计
                      </span>
                    </td>
                    <td class="px-4 py-3 text-right text-sm font-bold" :style="{ color: tokens.colors.text.primary }">
                      {{ group.totalQuantity }}
                    </td>
                    <td class="px-4 py-3 text-right">
                      <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(group.totalMarketValue) }}</p>
                      <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(group.avgPrice) }}</p>
                    </td>
                    <td class="px-4 py-3 text-right">
                      <p class="font-bold text-sm" :class="group.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ group.totalPnl >= 0 ? '+' : '' }}{{ formatMoney(group.totalPnl) }}
                      </p>
                      <p class="text-xs" :class="group.totalPnlPercent >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ group.totalPnlPercent >= 0 ? '+' : '' }}{{ group.totalPnlPercent?.toFixed(2) || '0.00' }}%
                      </p>
                    </td>
                  </tr>
                  <!-- 各模拟盘明细行 -->
                  <tr 
                    v-for="(holding, holdingIndex) in group.portfolios" 
                    :key="`${group.symbol}-${holding.portfolioId}`"
                    class="transition-colors border-b"
                    :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                    :style="{ 
                      borderColor: holdingIndex === group.portfolios.length - 1 ? tokens.colors.border.default : tokens.colors.border.subtle,
                      backgroundColor: group.portfolios.length > 1 ? (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)') : 'transparent'
                    }"
                  >
                    <td class="px-4 py-2.5" :class="group.portfolios.length > 1 ? 'pl-8' : ''">
                      <div class="flex items-center gap-2">
                        <div 
                          v-if="group.portfolios.length === 1"
                          class="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                          :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: tokens.colors.text.primary }"
                        >{{ holding.symbol.slice(0, 2) }}</div>
                        <div>
                          <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">
                            {{ group.portfolios.length === 1 ? holding.symbol : '' }}
                          </p>
                          <p v-if="group.portfolios.length === 1" class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ holding.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-2.5">
                      <div class="flex items-center gap-1.5">
                        <div class="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold bg-indigo-500">
                          {{ holding.portfolioName?.slice(0, 1) }}
                        </div>
                        <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">
                          {{ holding.portfolioName }}
                        </span>
                      </div>
                    </td>
                    <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                      {{ holding.quantity }}
                    </td>
                    <td class="px-4 py-2.5 text-right">
                      <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holding.marketValue) }}</p>
                      <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(holding.currentPrice) }}</p>
                    </td>
                    <td class="px-4 py-2.5 text-right">
                      <p class="font-medium text-sm" :class="(holding.pnl || 0) >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ (holding.pnl || 0) >= 0 ? '+' : '' }}{{ formatMoney(holding.pnl || 0) }}
                      </p>
                      <p class="text-xs" :class="(holding.pnlPercent || 0) >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ (holding.pnlPercent || 0) >= 0 ? '+' : '' }}{{ (holding.pnlPercent || 0).toFixed(2) }}%
                      </p>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          
          <div v-else class="flex-1 flex items-center justify-center">
            <div class="text-center py-8">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="text-sm" :style="{ color: tokens.colors.text.muted }">暂无持仓</p>
            </div>
          </div>
        </div>

        <!-- Right: Pending Orders -->
        <div 
          class="w-96 border rounded-lg overflow-hidden flex flex-col shrink-0"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: pendingOrders.length > 0 ? 'rgba(234, 179, 8, 0.3)' : tokens.colors.border.default
          }"
        >
          <div 
            class="px-4 py-3 border-b flex items-center justify-between"
            :style="{ 
              borderColor: tokens.colors.border.default,
              backgroundColor: pendingOrders.length > 0 ? 'rgba(234, 179, 8, 0.05)' : 'transparent'
            }"
          >
            <div class="flex items-center gap-2">
              <div v-if="pendingOrders.length > 0" class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">待执行订单</h3>
              <span v-if="pendingOrders.length > 0" class="px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-500">
                {{ pendingOrders.length }}
              </span>
            </div>
            <span v-if="pendingOrders.length > 0" class="text-xs px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-500">策略订单</span>
          </div>
          
          <div v-if="pendingOrders.length > 0" class="flex-1 overflow-auto p-3 space-y-2">
            <div 
              v-for="order in pendingOrders" 
              :key="order.id"
              class="p-3 rounded-lg border transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
              :style="{ borderColor: tokens.colors.border.default }"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="px-1.5 py-0.5 rounded text-xs font-bold" :class="order.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'">
                    {{ order.side === 'buy' ? '买' : '卖' }}
                  </span>
                  <span class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ order.symbol }}</span>
                </div>
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs" :class="getOrderStatusClass(order.status)">
                  <span class="w-1 h-1 rounded-full" :class="getOrderStatusDotClass(order.status)"></span>
                  {{ getOrderStatusText(order.status) }}
                </span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span :style="{ color: tokens.colors.text.muted }">数量: </span><span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ order.quantity }}股</span></div>
                <div><span :style="{ color: tokens.colors.text.muted }">价格: </span><span class="font-mono font-medium" :style="{ color: tokens.colors.text.primary }">${{ order.price?.toFixed(2) }}</span></div>
                <div v-if="order.targetPrice"><span :style="{ color: tokens.colors.text.muted }">目标: </span><span class="font-mono text-green-500">${{ order.targetPrice?.toFixed(2) }}</span></div>
                <div v-if="order.stopLossPrice"><span :style="{ color: tokens.colors.text.muted }">止损: </span><span class="font-mono text-red-500">${{ order.stopLossPrice?.toFixed(2) }}</span></div>
              </div>
              <div class="flex items-center justify-between text-xs mb-3" :style="{ color: tokens.colors.text.muted }">
                <span>{{ formatDateTime(order.createdAt) }}</span>
                <span>≈ ${{ (order.quantity * order.price).toFixed(0) }}</span>
              </div>
              <div v-if="order.status === 'pending'" class="flex items-center gap-2">
                <button @click="cancelOrder(order)" class="flex-1 px-2 py-1.5 text-xs font-medium rounded border transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'" :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }">
                  取消订单
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="flex-1 flex items-center justify-center">
            <div class="text-center py-8">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p class="text-sm" :style="{ color: tokens.colors.text.muted }">暂无待执行订单</p>
              <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">从策略计划发起交易后将显示在此</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trade History -->
      <div 
        class="border rounded-lg overflow-hidden"
        :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
      >
        <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
          <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
            交易历史 ({{ currentPortfolio?.trades?.length || 0 }})
          </h3>
          <div class="flex items-center gap-1">
            <button 
              v-for="filter in tradeFilters" :key="filter.id"
              @click="activeTradeFilter = filter.id"
              class="px-2 py-1 text-xs rounded transition-colors"
              :class="activeTradeFilter === filter.id ? 'bg-indigo-500/20 text-indigo-500 font-medium' : ''"
              :style="activeTradeFilter !== filter.id ? { color: tokens.colors.text.muted } : {}"
            >{{ filter.label }}</button>
          </div>
        </div>
        
        <div v-if="filteredTrades.length > 0" class="overflow-x-auto max-h-80 overflow-y-auto">
          <table class="w-full">
            <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
              <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">时间</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">类型</th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">股票</th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">数量</th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">价格</th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">金额</th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">盈亏</th>
                <th class="px-4 py-2 text-center text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">来源</th>
              </tr>
            </thead>
            <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
              <tr v-for="trade in filteredTrades" :key="trade.id" class="transition-colors" :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'">
                <td class="px-4 py-2.5 text-xs" :style="{ color: tokens.colors.text.secondary }">{{ formatTradeTime(trade.timestamp) }}</td>
                <td class="px-4 py-2.5">
                  <span class="px-1.5 py-0.5 rounded text-xs font-medium" :class="trade.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'">
                    {{ trade.type === 'buy' ? '买入' : '卖出' }}
                  </span>
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ trade.symbol }}</span>
                    <span class="text-xs hidden sm:inline" :style="{ color: tokens.colors.text.muted }">{{ trade.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">{{ trade.quantity }}</td>
                <td class="px-4 py-2.5 text-right text-sm font-mono" :style="{ color: tokens.colors.text.secondary }">${{ trade.price.toFixed(2) }}</td>
                <td class="px-4 py-2.5 text-right text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(trade.amount) }}</td>
                <td class="px-4 py-2.5 text-right text-sm">
                  <span v-if="trade.pnl !== null" :class="trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ trade.pnl >= 0 ? '+' : '' }}{{ formatMoney(trade.pnl) }}
                  </span>
                  <span v-else :style="{ color: tokens.colors.text.muted }">--</span>
                </td>
                <td class="px-4 py-2.5 text-center">
                  <span class="text-xs px-1.5 py-0.5 rounded" :class="trade.source === 'strategy' ? 'bg-purple-500/10 text-purple-500' : 'bg-gray-500/10'" :style="trade.source !== 'strategy' ? { color: tokens.colors.text.muted } : {}">
                    {{ trade.source === 'strategy' ? '策略' : '手动' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else class="p-8 text-center">
          <svg class="w-10 h-10 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">暂无交易记录</p>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="showCreateModal" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            class="absolute inset-0 backdrop-blur-sm"
            :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }"
            @click="showCreateModal = false"
          ></div>
          
          <div 
            class="relative w-full max-w-md rounded-xl border shadow-2xl"
            :style="{ 
              backgroundColor: tokens.colors.background.overlay,
              borderColor: tokens.colors.border.strong
            }"
          >
            <div class="flex items-center justify-between p-6 border-b" :style="{ borderColor: tokens.colors.border.default }">
              <h3 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
                {{ $t('portfolio.simulation.createModal.title') }}
              </h3>
              <button 
                @click="showCreateModal = false"
                class="p-1 rounded-md transition-colors"
                :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
              >
                <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="createPortfolio" class="p-6 space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.nameLabel') }}
                </label>
                <input 
                  v-model="newPortfolio.name"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :placeholder="$t('portfolio.simulation.createModal.namePlaceholder')"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                />
              </div>

              <!-- Initial Capital -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.capitalLabel') }}
                </label>
                <input 
                  v-model.number="newPortfolio.initialCapital"
                  type="number"
                  min="1000"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                />
                <div class="flex gap-2 mt-2">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.createModal.quickSelect') }}:</span>
                  <button 
                    v-for="amount in [10000, 50000, 100000, 500000]" 
                    :key="amount"
                    type="button"
                    @click="newPortfolio.initialCapital = amount"
                    class="px-2 py-0.5 text-xs rounded border transition-colors"
                    :class="newPortfolio.initialCapital === amount ? 'border-blue-500 text-blue-500' : ''"
                    :style="{ borderColor: newPortfolio.initialCapital === amount ? '' : tokens.colors.border.subtle, color: newPortfolio.initialCapital === amount ? '' : tokens.colors.text.muted }"
                  >
                    ${{ (amount / 1000).toFixed(0) }}K
                  </button>
                </div>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.simulation.createModal.descLabel') }} 
                  <span class="font-normal" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.createModal.optional') }}</span>
                </label>
                <textarea 
                  v-model="newPortfolio.description"
                  rows="3"
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  :placeholder="$t('portfolio.simulation.createModal.descPlaceholder')"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                ></textarea>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-2">
                <button 
                  type="button"
                  @click="showCreateModal = false"
                  class="flex-1 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                >
                  {{ $t('portfolio.simulation.createModal.cancelBtn') }}
                </button>
                <button 
                  type="submit"
                  class="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {{ $t('portfolio.simulation.createModal.createBtn') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- Trade Modal -->
    <TradeModal 
      v-if="showTradeModal"
      :portfolio="currentPortfolio"
      :trade-type="tradeModalType"
      :pre-selected-stock="preSelectedStock"
      @close="showTradeModal = false; preSelectedStock = null"
      @trade="handleTrade"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import TradeModal from './TradeModal.vue'

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// 模拟股票数据
const STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.50 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50 },
  { symbol: 'META', name: 'Meta Platforms', price: 358.32 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.42 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 172.65 },
  { symbol: 'V', name: 'Visa Inc.', price: 262.84 },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 95.50 }
]

// 生成模拟持仓数据
const generateDemoHoldings = () => {
  const count = 4 + Math.floor(Math.random() * 3) // 4-6 只股票
  const shuffled = [...STOCKS].sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, count)
  
  return selected.map(stock => {
    const quantity = Math.floor(10 + Math.random() * 100) * 5
    const costPrice = stock.price * (0.85 + Math.random() * 0.3)
    const currentPrice = stock.price * (0.95 + Math.random() * 0.1)
    const marketValue = quantity * currentPrice
    const costBasis = quantity * costPrice
    const pnl = marketValue - costBasis
    const pnlPercent = (pnl / costBasis) * 100
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      quantity,
      avgCost: parseFloat(costPrice.toFixed(2)),
      costBasis: parseFloat(costBasis.toFixed(2)),
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      marketValue: parseFloat(marketValue.toFixed(2)),
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercent: parseFloat(pnlPercent.toFixed(2))
    }
  })
}

// 生成模拟交易记录
const generateDemoTrades = () => {
  const now = new Date()
  const trades = []
  
  const tradeTemplates = [
    { symbol: 'AAPL', type: 'buy', quantity: 100, price: 178.25, pnl: null, source: 'strategy' },
    { symbol: 'NVDA', type: 'buy', quantity: 50, price: 465.80, pnl: null, source: 'manual' },
    { symbol: 'TSLA', type: 'sell', quantity: 30, price: 255.60, pnl: 1250.40, source: 'strategy' },
    { symbol: 'GOOGL', type: 'buy', quantity: 80, price: 135.20, pnl: null, source: 'manual' },
    { symbol: 'META', type: 'sell', quantity: 40, price: 365.80, pnl: 892.00, source: 'strategy' },
    { symbol: 'MSFT', type: 'buy', quantity: 60, price: 365.50, pnl: null, source: 'manual' },
    { symbol: 'AMZN', type: 'sell', quantity: 25, price: 158.90, pnl: -325.00, source: 'strategy' },
    { symbol: 'JPM', type: 'buy', quantity: 70, price: 168.30, pnl: null, source: 'manual' },
    { symbol: 'AAPL', type: 'sell', quantity: 50, price: 189.50, pnl: 562.50, source: 'strategy' },
    { symbol: 'NVDA', type: 'sell', quantity: 20, price: 510.25, pnl: 889.00, source: 'manual' },
    { symbol: 'TSLA', type: 'buy', quantity: 45, price: 242.80, pnl: null, source: 'strategy' },
    { symbol: 'META', type: 'buy', quantity: 35, price: 348.60, pnl: null, source: 'manual' },
  ]
  
  tradeTemplates.forEach((template, index) => {
    const daysAgo = Math.floor(index / 2)
    const hoursAgo = (index % 4) * 3 + Math.floor(Math.random() * 3)
    const tradeTime = new Date(now - 86400000 * daysAgo - 3600000 * hoursAgo)
    
    trades.push({
      id: `trade_demo_${index}`,
      symbol: template.symbol,
      name: STOCKS.find(s => s.symbol === template.symbol)?.name || template.symbol,
      type: template.type,
      quantity: template.quantity,
      price: template.price,
      amount: parseFloat((template.quantity * template.price).toFixed(2)),
      pnl: template.pnl,
      source: template.source,
      timestamp: tradeTime.toISOString()
    })
  })
  
  return trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

// 生成模拟待执行订单
const generateDemoOrders = () => {
  const now = new Date()
  const orders = []
  
  const orderTemplates = [
    { symbol: 'MSFT', side: 'buy', status: 'pending', quantity: 100, price: 375.50, targetPrice: 420.00, stopLossPrice: 350.00 },
    { symbol: 'NVDA', side: 'buy', status: 'pending', quantity: 50, price: 480.00, targetPrice: 550.00, stopLossPrice: 450.00 },
    { symbol: 'AAPL', side: 'sell', status: 'pending', quantity: 80, price: 190.00, targetPrice: 200.00, stopLossPrice: 175.00 },
    { symbol: 'GOOGL', side: 'buy', status: 'partial', quantity: 100, filledQuantity: 60, price: 140.00, targetPrice: 160.00, stopLossPrice: 130.00 },
  ]
  
  orderTemplates.forEach((template, index) => {
    orders.push({
      id: `order_demo_${Date.now()}_${index}`,
      symbol: template.symbol,
      stockName: STOCKS.find(s => s.symbol === template.symbol)?.name || template.symbol,
      side: template.side,
      quantity: template.quantity,
      filledQuantity: template.filledQuantity || 0,
      price: template.price,
      targetPrice: template.targetPrice,
      stopLossPrice: template.stopLossPrice,
      status: template.status,
      source: 'strategy',
      strategyName: 'AI 模拟策略',
      createdAt: new Date(now - 3600000 * (index + 1)).toISOString(),
      updatedAt: new Date(now - 3600000 * index).toISOString()
    })
  })
  
  return orders
}

// 生成演示模拟盘数据
const generateDemoPortfolios = () => {
  const now = new Date()
  
  // 演示模拟盘 1：成长型策略
  const holdings1 = generateDemoHoldings()
  const marketValue1 = holdings1.reduce((sum, h) => sum + h.marketValue, 0)
  const costBasis1 = holdings1.reduce((sum, h) => sum + h.costBasis, 0)
  const initialCapital1 = 100000
  const availableCash1 = initialCapital1 - costBasis1 + (Math.random() * 5000)
  const currentValue1 = availableCash1 + marketValue1
  
  const portfolio1 = {
    id: 'sim_demo_1',
    name: '成长型策略',
    description: '专注于高成长科技股的投资组合',
    initialCapital: initialCapital1,
    currentValue: parseFloat(currentValue1.toFixed(2)),
    availableCash: parseFloat(availableCash1.toFixed(2)),
    totalReturn: parseFloat(((currentValue1 - initialCapital1) / initialCapital1 * 100).toFixed(2)),
    dailyReturn: parseFloat((Math.random() * 4 - 1).toFixed(2)),
    holdings: holdings1,
    orders: generateDemoOrders(),
    trades: generateDemoTrades(),
    equityCurve: [
      { date: new Date(now - 86400000 * 30).toISOString(), value: initialCapital1 },
      { date: new Date(now - 86400000 * 20).toISOString(), value: initialCapital1 * 1.02 },
      { date: new Date(now - 86400000 * 10).toISOString(), value: initialCapital1 * 1.05 },
      { date: now.toISOString(), value: currentValue1 }
    ],
    createdAt: new Date(now - 86400000 * 30).toISOString(),
    updatedAt: now.toISOString()
  }
  
  // 演示模拟盘 2：价值投资
  const holdings2 = generateDemoHoldings()
  const marketValue2 = holdings2.reduce((sum, h) => sum + h.marketValue, 0)
  const costBasis2 = holdings2.reduce((sum, h) => sum + h.costBasis, 0)
  const initialCapital2 = 50000
  const availableCash2 = initialCapital2 - costBasis2 * 0.6 + (Math.random() * 3000)
  const currentValue2 = availableCash2 + marketValue2
  
  const portfolio2 = {
    id: 'sim_demo_2',
    name: '价值投资组合',
    description: '寻找被低估的优质股票',
    initialCapital: initialCapital2,
    currentValue: parseFloat(currentValue2.toFixed(2)),
    availableCash: parseFloat(availableCash2.toFixed(2)),
    totalReturn: parseFloat(((currentValue2 - initialCapital2) / initialCapital2 * 100).toFixed(2)),
    dailyReturn: parseFloat((Math.random() * 3 - 0.5).toFixed(2)),
    holdings: holdings2,
    orders: generateDemoOrders().slice(0, 2),
    trades: generateDemoTrades().slice(0, 6),
    equityCurve: [
      { date: new Date(now - 86400000 * 15).toISOString(), value: initialCapital2 },
      { date: new Date(now - 86400000 * 7).toISOString(), value: initialCapital2 * 1.01 },
      { date: now.toISOString(), value: currentValue2 }
    ],
    createdAt: new Date(now - 86400000 * 15).toISOString(),
    updatedAt: now.toISOString()
  }
  
  return [portfolio1, portfolio2]
}

// State
const portfolios = ref([])
const selectedPortfolioId = ref(null)
const showCreateModal = ref(false)
const showPortfolioDropdown = ref(false)
const showTradeModal = ref(false)
const tradeModalType = ref('buy')
const preSelectedStock = ref(null)
const activeTradeFilter = ref('all')

// 视图模式 - 'all' 表示查看全部模拟盘汇总, 模拟盘ID 表示查看单个模拟盘
const viewMode = ref('all')

// 是否为汇总模式
const isAllPortfoliosMode = computed(() => viewMode.value === 'all')

// 当前显示的模拟盘（单模拟盘模式下）
const displayPortfolio = computed(() => {
  if (isAllPortfoliosMode.value) return null
  return portfolios.value.find(p => p.id === viewMode.value) || portfolios.value[0]
})

// 切换视图模式
const switchViewMode = (mode) => {
  viewMode.value = mode
  showPortfolioDropdown.value = false
  if (mode !== 'all') {
    selectedPortfolioId.value = mode
  }
}

// ===== 汇总数据计算 =====

// 汇总: 总现值
const summaryCurrentValue = computed(() => {
  return portfolios.value.reduce((sum, p) => sum + (p.currentValue || 0), 0)
})

// 汇总: 初始资金总额
const summaryInitialCapital = computed(() => {
  return portfolios.value.reduce((sum, p) => sum + (p.initialCapital || 0), 0)
})

// 汇总: 总收益率
const summaryTotalReturn = computed(() => {
  if (!summaryInitialCapital.value) return 0
  return ((summaryCurrentValue.value - summaryInitialCapital.value) / summaryInitialCapital.value) * 100
})

// 汇总: 可用资金
const summaryAvailableCash = computed(() => {
  return portfolios.value.reduce((sum, p) => sum + (p.availableCash || 0), 0)
})

// 汇总: 持仓市值
const summaryHoldingsValue = computed(() => {
  return portfolios.value.reduce((sum, p) => {
    const holdingsValue = p.holdings?.reduce((s, h) => s + (h.marketValue || 0), 0) || 0
    return sum + holdingsValue
  }, 0)
})

// 汇总: 所有持仓（不聚合，按股票代码分组显示）
const summaryHoldings = computed(() => {
  const holdings = []
  portfolios.value.forEach(portfolio => {
    if (portfolio.holdings) {
      portfolio.holdings.forEach(holding => {
        holdings.push({
          ...holding,
          portfolioId: portfolio.id,
          portfolioName: portfolio.name || 'Unknown'
        })
      })
    }
  })
  // 按股票代码排序，相同股票放在一起
  return holdings.sort((a, b) => a.symbol.localeCompare(b.symbol))
})

// 汇总: 按股票分组的持仓（用于汇总视图）
const groupedHoldings = computed(() => {
  const groups = {}
  
  portfolios.value.forEach(portfolio => {
    if (portfolio.holdings) {
      portfolio.holdings.forEach(holding => {
        const symbol = holding.symbol
        if (!groups[symbol]) {
          groups[symbol] = {
            symbol: symbol,
            name: holding.name,
            totalQuantity: 0,
            totalMarketValue: 0,
            totalCostBasis: 0,
            portfolios: []
          }
        }
        
        groups[symbol].totalQuantity += holding.quantity || 0
        groups[symbol].totalMarketValue += holding.marketValue || 0
        groups[symbol].totalCostBasis += (holding.avgCost || holding.costBasis / holding.quantity || 0) * holding.quantity
        
        groups[symbol].portfolios.push({
          ...holding,
          portfolioId: portfolio.id,
          portfolioName: portfolio.name || 'Unknown'
        })
      })
    }
  })
  
  // 计算每组的汇总盈亏
  Object.values(groups).forEach(group => {
    group.totalPnl = group.totalMarketValue - group.totalCostBasis
    group.totalPnlPercent = group.totalCostBasis > 0 
      ? (group.totalPnl / group.totalCostBasis) * 100 
      : 0
    group.avgPrice = group.totalMarketValue / group.totalQuantity
  })
  
  // 按股票代码排序后返回数组
  return Object.values(groups).sort((a, b) => a.symbol.localeCompare(b.symbol))
})

// 汇总: 所有待执行订单
const summaryPendingOrders = computed(() => {
  const orders = []
  portfolios.value.forEach(portfolio => {
    if (portfolio.orders) {
      portfolio.orders
        .filter(o => ['pending', 'partial'].includes(o.status))
        .forEach(order => {
          orders.push({
            ...order,
            portfolioId: portfolio.id,
            portfolioName: portfolio.name || 'Unknown'
          })
        })
    }
  })
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 汇总: 所有交易记录
const summaryTrades = computed(() => {
  const trades = []
  portfolios.value.forEach(portfolio => {
    if (portfolio.trades) {
      portfolio.trades.forEach(trade => {
        trades.push({
          ...trade,
          portfolioId: portfolio.id,
          portfolioName: portfolio.name || 'Unknown'
        })
      })
    }
  })
  return trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

// ===== 当前显示数据（根据模式切换）=====

// 显示的总现值
const displayCurrentValue = computed(() => {
  return isAllPortfoliosMode.value ? summaryCurrentValue.value : (displayPortfolio.value?.currentValue || 0)
})

// 显示的总收益率
const displayTotalReturn = computed(() => {
  if (isAllPortfoliosMode.value) return summaryTotalReturn.value
  return displayPortfolio.value?.totalReturn || 0
})

// 显示的可用资金
const displayAvailableCash = computed(() => {
  return isAllPortfoliosMode.value ? summaryAvailableCash.value : (displayPortfolio.value?.availableCash || 0)
})

// 显示的持仓市值
const displayHoldingsValue = computed(() => {
  if (isAllPortfoliosMode.value) return summaryHoldingsValue.value
  if (!displayPortfolio.value?.holdings) return 0
  return displayPortfolio.value.holdings.reduce((sum, h) => sum + (h.marketValue || 0), 0)
})

// 显示的仓位比例
const displayPositionRatio = computed(() => {
  if (isAllPortfoliosMode.value) {
    if (!summaryCurrentValue.value) return 0
    return (summaryHoldingsValue.value / summaryCurrentValue.value) * 100
  }
  if (!displayPortfolio.value?.currentValue) return 0
  return (displayHoldingsValue.value / displayPortfolio.value.currentValue) * 100
})

// 显示的持仓
const displayHoldings = computed(() => {
  return isAllPortfoliosMode.value ? summaryHoldings.value : (displayPortfolio.value?.holdings || [])
})

// 显示的待执行订单
const displayPendingOrders = computed(() => {
  if (isAllPortfoliosMode.value) return summaryPendingOrders.value
  if (!displayPortfolio.value?.orders) return []
  return displayPortfolio.value.orders
    .filter(o => ['pending', 'partial'].includes(o.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 显示的交易记录（根据筛选）
const displayTrades = computed(() => {
  const trades = isAllPortfoliosMode.value ? summaryTrades.value : (displayPortfolio.value?.trades || [])
  if (activeTradeFilter.value === 'all') return trades
  if (activeTradeFilter.value === 'buy') return trades.filter(t => t.type === 'buy')
  if (activeTradeFilter.value === 'sell') return trades.filter(t => t.type === 'sell')
  if (activeTradeFilter.value === 'strategy') return trades.filter(t => t.source === 'strategy')
  return trades
})

const tradeFilters = [
  { id: 'all', label: '全部' },
  { id: 'buy', label: '买入' },
  { id: 'sell', label: '卖出' },
  { id: 'strategy', label: '策略' }
]

const newPortfolio = ref({
  name: '',
  initialCapital: 100000,
  description: ''
})

// Current portfolio computed
const currentPortfolio = computed(() => {
  if (!selectedPortfolioId.value || portfolios.value.length === 0) return null
  return portfolios.value.find(p => p.id === selectedPortfolioId.value) || portfolios.value[0]
})

// Holdings value
const holdingsValue = computed(() => {
  if (!currentPortfolio.value?.holdings) return 0
  return currentPortfolio.value.holdings.reduce((sum, h) => sum + (h.marketValue || 0), 0)
})

// Position ratio
const positionRatio = computed(() => {
  if (!currentPortfolio.value?.currentValue) return 0
  return (holdingsValue.value / currentPortfolio.value.currentValue) * 100
})

// Recent trades (sorted by time, limited to 15)
const recentTrades = computed(() => {
  if (!currentPortfolio.value?.trades) return []
  return [...currentPortfolio.value.trades]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 15)
})

// Pending orders
const pendingOrders = computed(() => {
  if (!currentPortfolio.value?.orders) return []
  return currentPortfolio.value.orders
    .filter(o => ['pending', 'partial'].includes(o.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// Filtered trades
const filteredTrades = computed(() => {
  const trades = currentPortfolio.value?.trades || []
  if (activeTradeFilter.value === 'all') return trades
  if (activeTradeFilter.value === 'buy') return trades.filter(t => t.type === 'buy')
  if (activeTradeFilter.value === 'sell') return trades.filter(t => t.type === 'sell')
  if (activeTradeFilter.value === 'strategy') return trades.filter(t => t.source === 'strategy')
  return trades
})

// Order status helpers
const getOrderStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-500/10 text-yellow-500',
    partial: 'bg-blue-500/10 text-blue-500',
    filled: 'bg-green-500/10 text-green-500',
    cancelled: 'bg-gray-500/10 text-gray-500',
    rejected: 'bg-red-500/10 text-red-500'
  }
  return classes[status] || 'bg-gray-500/10 text-gray-500'
}

const getOrderStatusDotClass = (status) => {
  const classes = {
    pending: 'bg-yellow-500 animate-pulse',
    partial: 'bg-blue-500 animate-pulse',
    filled: 'bg-green-500',
    cancelled: 'bg-gray-500',
    rejected: 'bg-red-500'
  }
  return classes[status] || 'bg-gray-500'
}

const getOrderStatusText = (status) => {
  const texts = {
    pending: '待执行',
    partial: '部分成交',
    filled: '已成交',
    cancelled: '已取消',
    rejected: '已拒绝'
  }
  return texts[status] || status
}

// Format date time for orders
const formatDateTime = (dateStr) => {
  if (!dateStr) return '--'
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Cancel order
const cancelOrder = (order) => {
  if (!confirm('确定要取消此订单吗？')) return
  
  const portfolioIndex = portfolios.value.findIndex(p => p.id === currentPortfolio.value?.id)
  if (portfolioIndex === -1) return
  
  const orderIndex = portfolios.value[portfolioIndex].orders?.findIndex(o => o.id === order.id)
  if (orderIndex !== -1) {
    portfolios.value[portfolioIndex].orders[orderIndex].status = 'cancelled'
    portfolios.value[portfolioIndex].orders[orderIndex].cancelledAt = new Date().toISOString()
    portfolios.value[portfolioIndex].orders[orderIndex].updatedAt = new Date().toISOString()
    savePortfolios()
  }
}

// Load portfolios from localStorage
onMounted(() => {
  loadPortfolios()
})

const loadPortfolios = () => {
  try {
    const stored = localStorage.getItem('paper_portfolios')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed && parsed.length > 0) {
        portfolios.value = parsed
        if (!selectedPortfolioId.value) {
          selectedPortfolioId.value = portfolios.value[0].id
        }
        return
      }
    }
    
    // 如果没有存储数据或为空数组，生成演示数据
    const demoPortfolios = generateDemoPortfolios()
    portfolios.value = demoPortfolios
    selectedPortfolioId.value = demoPortfolios[0].id
    savePortfolios()
  } catch (error) {
    console.error('Failed to load portfolios:', error)
    // 出错时也生成演示数据
    const demoPortfolios = generateDemoPortfolios()
    portfolios.value = demoPortfolios
    selectedPortfolioId.value = demoPortfolios[0].id
  }
}

const savePortfolios = () => {
  localStorage.setItem('paper_portfolios', JSON.stringify(portfolios.value))
}

// Format money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0)
}

// Format compact money (e.g., $1.13M, $550K)
const formatCompactMoney = (amount) => {
  if (!amount && amount !== 0) return '$0'
  const absAmount = Math.abs(amount)
  const sign = amount < 0 ? '-' : ''
  
  if (absAmount >= 1000000) {
    return sign + '$' + (absAmount / 1000000).toFixed(2) + 'M'
  } else if (absAmount >= 1000) {
    return sign + '$' + (absAmount / 1000).toFixed(0) + 'K'
  } else {
    return sign + '$' + absAmount.toFixed(0)
  }
}

// Format date
const formatDate = (dateStr) => {
  if (!dateStr) return '--'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Format trade time
const formatTradeTime = (timestamp) => {
  if (!timestamp) return '--'
  const date = new Date(timestamp)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  
  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Select portfolio by ID
const selectPortfolioById = (portfolioId) => {
  selectedPortfolioId.value = portfolioId
  showPortfolioDropdown.value = false
}

// Create portfolio
const createPortfolio = () => {
  const portfolio = {
    id: `sim_${Date.now()}`,
    name: newPortfolio.value.name,
    description: newPortfolio.value.description,
    initialCapital: newPortfolio.value.initialCapital,
    currentValue: newPortfolio.value.initialCapital,
    availableCash: newPortfolio.value.initialCapital,
    totalReturn: 0,
    dailyReturn: 0,
    holdings: [],
    trades: [],
    equityCurve: [{ date: new Date().toISOString(), value: newPortfolio.value.initialCapital }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  portfolios.value.push(portfolio)
  selectedPortfolioId.value = portfolio.id
  savePortfolios()
  
  // Reset form
  newPortfolio.value = { name: '', initialCapital: 100000, description: '' }
  showCreateModal.value = false
}

// Delete portfolio
const handleDeletePortfolio = () => {
  if (!currentPortfolio.value) return
  if (confirm(t('portfolio.simulation.detail.deleteConfirm'))) {
    portfolios.value = portfolios.value.filter(p => p.id !== currentPortfolio.value.id)
    selectedPortfolioId.value = portfolios.value.length > 0 ? portfolios.value[0].id : null
    savePortfolios()
  }
}

// Open trade modal
const openTradeModal = () => {
  tradeModalType.value = 'buy'
  preSelectedStock.value = null
  showTradeModal.value = true
}

// Open sell modal for a specific holding
const openSellModal = (holding) => {
  preSelectedStock.value = holding
  tradeModalType.value = 'sell'
  showTradeModal.value = true
}

// Handle trade from modal
const handleTrade = (tradeData) => {
  if (!currentPortfolio.value) return
  
  const portfolioIndex = portfolios.value.findIndex(p => p.id === currentPortfolio.value.id)
  if (portfolioIndex === -1) return
  
  const portfolio = portfolios.value[portfolioIndex]
  
  // Create trade record
  const trade = {
    id: `trade_${Date.now()}`,
    symbol: tradeData.symbol,
    name: tradeData.name,
    type: tradeData.type,
    quantity: tradeData.quantity,
    price: tradeData.price,
    amount: tradeData.quantity * tradeData.price,
    pnl: tradeData.pnl || null,
    timestamp: new Date().toISOString()
  }
  
  portfolio.trades.push(trade)
  
  if (tradeData.type === 'buy') {
    // Deduct cash
    portfolio.availableCash -= trade.amount
    
    // Add or update holding
    const existingHolding = portfolio.holdings.find(h => h.symbol === tradeData.symbol)
    if (existingHolding) {
      const totalCost = existingHolding.avgCost * existingHolding.quantity + trade.amount
      existingHolding.quantity += tradeData.quantity
      existingHolding.avgCost = totalCost / existingHolding.quantity
      existingHolding.costBasis = existingHolding.avgCost * existingHolding.quantity
      existingHolding.currentPrice = tradeData.price
      existingHolding.marketValue = existingHolding.quantity * tradeData.price
      existingHolding.pnl = existingHolding.marketValue - existingHolding.costBasis
      existingHolding.pnlPercent = (existingHolding.pnl / existingHolding.costBasis) * 100
    } else {
      portfolio.holdings.push({
        symbol: tradeData.symbol,
        name: tradeData.name,
        quantity: tradeData.quantity,
        avgCost: tradeData.price,
        costBasis: trade.amount,
        currentPrice: tradeData.price,
        marketValue: trade.amount,
        pnl: 0,
        pnlPercent: 0
      })
    }
  } else {
    // Sell
    portfolio.availableCash += trade.amount
    
    const existingHolding = portfolio.holdings.find(h => h.symbol === tradeData.symbol)
    if (existingHolding) {
      // Calculate P&L
      const soldCost = existingHolding.avgCost * tradeData.quantity
      trade.pnl = trade.amount - soldCost
      
      existingHolding.quantity -= tradeData.quantity
      if (existingHolding.quantity <= 0) {
        portfolio.holdings = portfolio.holdings.filter(h => h.symbol !== tradeData.symbol)
      } else {
        existingHolding.costBasis = existingHolding.avgCost * existingHolding.quantity
        existingHolding.marketValue = existingHolding.quantity * existingHolding.currentPrice
        existingHolding.pnl = existingHolding.marketValue - existingHolding.costBasis
        existingHolding.pnlPercent = (existingHolding.pnl / existingHolding.costBasis) * 100
      }
    }
  }
  
  // Update portfolio value
  const newHoldingsValue = portfolio.holdings.reduce((sum, h) => sum + h.marketValue, 0)
  portfolio.currentValue = portfolio.availableCash + newHoldingsValue
  portfolio.totalReturn = ((portfolio.currentValue - portfolio.initialCapital) / portfolio.initialCapital) * 100
  portfolio.updatedAt = new Date().toISOString()
  
  // Update equity curve
  portfolio.equityCurve.push({ date: new Date().toISOString(), value: portfolio.currentValue })
  
  portfolios.value[portfolioIndex] = portfolio
  savePortfolios()
  
  showTradeModal.value = false
  preSelectedStock.value = null
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
