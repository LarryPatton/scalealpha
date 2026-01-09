<template>
  <div class="space-y-4">
    <!-- Not Connected State -->
    <div v-if="!hasConnectedAccounts" class="max-w-2xl mx-auto">
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
          :style="{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)' }"
        >
          <svg class="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        <!-- Title & Description -->
        <h3 class="text-xl font-bold mb-3" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.broker.connectTitle') }}
        </h3>
        <p class="text-sm mb-6 max-w-md mx-auto" :style="{ color: tokens.colors.text.muted }">
          {{ $t('portfolio.broker.connectDesc') }}
        </p>

        <!-- Features -->
        <div class="flex justify-center gap-6 mb-8 flex-wrap">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">{{ $t('portfolio.broker.feature1') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">{{ $t('portfolio.broker.feature2') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">{{ $t('portfolio.broker.feature3') }}</span>
          </div>
        </div>

        <!-- Connect Button -->
        <button 
          @click="showBrokerSelection = true"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/20"
        >
          {{ $t('portfolio.broker.connectBtn') }}
        </button>

        <!-- Supported Brokers -->
        <div class="mt-8 pt-6 border-t" :style="{ borderColor: tokens.colors.border.default }">
          <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">
            {{ $t('portfolio.broker.supportedBrokers') }}
          </p>
          <div class="flex justify-center flex-wrap gap-3">
            <div 
              v-for="broker in SUPPORTED_BROKERS" 
              :key="broker.id"
              class="px-3 py-1.5 rounded-md text-xs font-medium border"
              :style="{ 
                backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                borderColor: tokens.colors.border.subtle,
                color: tokens.colors.text.secondary
              }"
            >
              {{ broker.shortName || broker.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Connected State -->
    <div v-else class="space-y-4">
      <!-- 合并的账户选择器 + 统计栏 -->
      <div 
        class="border rounded-lg p-3"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="flex items-center gap-3">
          <!-- 左侧：账户选择器 -->
          <div class="flex items-center gap-2 flex-shrink-0">
            <!-- All Accounts Option -->
            <button 
              @click="switchViewMode('all')"
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all"
              :class="isAllAccountsMode ? 'ring-2 ring-blue-500' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
              :style="{ 
                backgroundColor: isAllAccountsMode ? (isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)') : 'transparent',
                borderColor: isAllAccountsMode ? 'rgba(59, 130, 246, 0.5)' : tokens.colors.border.default
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
                <p class="text-xs leading-tight" :style="{ color: tokens.colors.text.muted }">{{ formatCompactMoney(summaryTotalAssets) }}</p>
              </div>
              <span v-if="isAllAccountsMode" class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </button>

            <!-- Individual Account Options -->
            <button 
              v-for="account in brokerAccounts" 
              :key="account.id"
              @click="switchViewMode(account.id)"
              class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all"
              :class="viewMode === account.id ? 'ring-2 ring-blue-500' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
              :style="{ 
                backgroundColor: viewMode === account.id ? (isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)') : 'transparent',
                borderColor: viewMode === account.id ? 'rgba(59, 130, 246, 0.5)' : tokens.colors.border.default
              }"
            >
              <div 
                class="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold"
                :style="{ backgroundColor: account.broker?.color || '#3b82f6' }"
              >
                {{ account.broker?.shortName?.slice(0, 2) || 'BR' }}
              </div>
              <div class="text-left">
                <p class="text-xs font-medium leading-tight" :style="{ color: tokens.colors.text.primary }">
                  {{ account.broker?.shortName || account.broker?.name }}
                </p>
                <p class="text-xs leading-tight" :style="{ color: tokens.colors.text.muted }">{{ formatCompactMoney(account.totalAssets) }}</p>
              </div>
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            </button>

            <!-- Add More -->
            <button 
              @click="showBrokerSelection = true"
              class="flex items-center justify-center w-8 h-8 rounded-lg border border-dashed transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
              title="添加券商"
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
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatCompactMoney(displayBalance) }}</p>
            </div>
            <div class="text-center">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">持仓</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatCompactMoney(displayMarketValue) }}</p>
            </div>
            <div class="text-center">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">仓位</p>
              <div class="flex items-center gap-1.5">
                <div class="w-12 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }">
                  <div 
                    class="h-full rounded-full bg-blue-500" 
                    :style="{ width: `${displayPositionRatio}%` }"
                  ></div>
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
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">总资产</p>
              <p class="text-base font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(displayTotalAssets) }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">日盈亏</p>
              <p 
                class="text-base font-bold"
                :class="displayDailyPnl >= 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ displayDailyPnl >= 0 ? '+' : '' }}{{ formatMoney(displayDailyPnl) }}
              </p>
            </div>
            
            <!-- 操作按钮 -->
            <div class="flex items-center gap-1.5 ml-2">
              <button 
                @click="handleSync"
                :disabled="isSyncing"
                class="p-1.5 rounded-lg border transition-colors"
                :class="isSyncing ? 'opacity-50' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
                :style="{ borderColor: tokens.colors.border.default }"
                :title="$t('portfolio.broker.syncBtn')"
              >
                <svg 
                  class="w-4 h-4" 
                  :class="isSyncing ? 'animate-spin' : ''"
                  :style="{ color: tokens.colors.text.muted }"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button 
                v-if="!isAllAccountsMode"
                @click="handleDisconnect"
                class="p-1.5 rounded-lg border transition-colors text-red-500 hover:bg-red-500/10"
                :style="{ borderColor: tokens.colors.border.default }"
                :title="$t('portfolio.broker.disconnectBtn')"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content: Left Holdings + Right Orders -->
      <div class="flex gap-4" style="min-height: 500px;">
        <!-- Left: Holdings -->
        <div class="flex-1 flex flex-col space-y-3">
          
          <!-- 非汇总模式: 普通表格 -->
          <div 
            v-if="!isAllAccountsMode && displayHoldings.length > 0" 
            class="border rounded-lg overflow-hidden flex-1"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div class="px-4 py-2.5 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
              <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
                {{ $t('portfolio.broker.holdingsTitle') }} ({{ displayHoldings.length }})
              </h3>
            </div>
            <div class="overflow-auto" style="max-height: 460px;">
            <table class="w-full">
              <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
                <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                  <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                    {{ $t('portfolio.broker.stock') }}
                  </th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                    {{ $t('portfolio.broker.quantity') }}
                  </th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                    {{ $t('portfolio.broker.marketValueCol') }}
                  </th>
                  <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                    {{ $t('portfolio.broker.pnl') }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
                <tr 
                  v-for="holding in displayHoldings" 
                  :key="holding.symbol"
                  class="transition-colors"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                >
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <div 
                        class="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                        :style="{ 
                          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                          color: tokens.colors.text.primary 
                        }"
                      >
                        {{ holding.symbol.slice(0, 2) }}
                      </div>
                      <div>
                        <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ holding.symbol }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ holding.name }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                    {{ holding.quantity }}
                  </td>
                  <td class="px-4 py-3 text-right">
                    <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holding.marketValue) }}</p>
                    <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(holding.currentPrice) }}</p>
                  </td>
                  <td class="px-4 py-3 text-right">
                    <p 
                      class="font-medium text-sm"
                      :class="holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'"
                    >
                      {{ holding.pnl >= 0 ? '+' : '' }}{{ formatMoney(holding.pnl) }}
                    </p>
                    <p 
                      class="text-xs"
                      :class="holding.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'"
                    >
                      {{ holding.pnlPercent >= 0 ? '+' : '' }}{{ holding.pnlPercent?.toFixed(2) || '0.00' }}%
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>

          <!-- 汇总模式: 股票和期权分开显示，直接作为独立卡片 -->
          <!-- 股票持仓表格 -->
          <div 
            v-if="isAllAccountsMode && stockGroupedHoldings.length > 0" 
            class="border rounded-lg overflow-hidden"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div class="px-4 py-2.5 border-b flex items-center gap-2" :style="{ borderColor: tokens.colors.border.default }">
              <svg class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h4 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">股票持仓</h4>
              <span class="text-xs px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">{{ stockGroupedHoldings.length }}</span>
              <span class="ml-auto text-xs" :style="{ color: tokens.colors.text.muted }">
                市值: {{ formatMoney(stockTotalMarketValue) }}
              </span>
            </div>
            <div class="overflow-auto" style="max-height: 350px;">
              <table class="w-full">
                <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
                  <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                    <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">股票</th>
                    <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">账户</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">数量</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">市值</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">盈亏</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(group, groupIndex) in stockGroupedHoldings" :key="group.symbol">
                    <!-- 分组分隔线 -->
                    <tr v-if="groupIndex > 0" class="h-2" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                      <td colspan="5"></td>
                    </tr>
                    <!-- 汇总行 - 多账户聚合 -->
                    <tr 
                      v-if="group.accounts.length > 1"
                      class="border-t-2"
                      :style="{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.04)', borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)' }"
                    >
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-blue-500/20 text-blue-500">
                            {{ group.symbol.slice(0, 2) }}
                          </div>
                          <div>
                            <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ group.symbol }}</p>
                            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ group.name }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-2.5">
                        <span class="text-xs font-medium px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">{{ group.accounts.length }} 个账户</span>
                      </td>
                      <td class="px-4 py-2.5 text-right text-sm font-bold" :style="{ color: tokens.colors.text.primary }">{{ group.totalQuantity }}股</td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(group.totalMarketValue) }}</p>
                      </td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="font-bold text-sm" :class="group.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.totalPnl >= 0 ? '+' : '' }}{{ formatMoney(group.totalPnl) }}
                        </p>
                      </td>
                    </tr>
                    <!-- 单账户独立行 - 突出显示 -->
                    <tr 
                      v-if="group.accounts.length === 1"
                      class="border-t-2 transition-colors"
                      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                      :style="{ borderColor: tokens.colors.border.default }"
                    >
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: tokens.colors.text.primary }">
                            {{ group.accounts[0].symbol.slice(0, 2) }}
                          </div>
                          <div>
                            <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ group.accounts[0].symbol }}</p>
                            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ group.accounts[0].name }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-1.5">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: group.accounts[0].accountColor }">
                            {{ group.accounts[0].accountName?.slice(0, 1) }}
                          </div>
                          <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ group.accounts[0].accountName }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">{{ group.accounts[0].quantity }}股</td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(group.accounts[0].marketValue) }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(group.accounts[0].currentPrice) }}</p>
                      </td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="text-sm font-medium" :class="group.accounts[0].pnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.accounts[0].pnl >= 0 ? '+' : '' }}{{ formatMoney(group.accounts[0].pnl) }}
                        </p>
                        <p class="text-xs" :class="group.accounts[0].pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.accounts[0].pnlPercent >= 0 ? '+' : '' }}{{ group.accounts[0].pnlPercent?.toFixed(2) || '0.00' }}%
                        </p>
                      </td>
                    </tr>
                    <!-- 多账户明细行 - 缩进显示 -->
                    <tr 
                      v-for="(holding, idx) in (group.accounts.length > 1 ? group.accounts : [])" 
                      :key="`${group.symbol}-${holding.accountId}`"
                      class="transition-colors"
                      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                      :style="{ 
                        borderColor: tokens.colors.border.subtle,
                        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.02)' : 'rgba(59, 130, 246, 0.01)'
                      }"
                    >
                      <td class="px-4 py-2 pl-10 border-l-2" :style="{ borderColor: 'rgba(59, 130, 246, 0.3)' }">
                        <!-- 缩进占位 -->
                      </td>
                      <td class="px-4 py-2">
                        <div class="flex items-center gap-1.5">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: holding.accountColor }">
                            {{ holding.accountName?.slice(0, 1) }}
                          </div>
                          <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ holding.accountName }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">{{ holding.quantity }}股</td>
                      <td class="px-4 py-2 text-right">
                        <p class="text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holding.marketValue) }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(holding.currentPrice) }}</p>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <p class="text-sm" :class="holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ holding.pnl >= 0 ? '+' : '' }}{{ formatMoney(holding.pnl) }}
                        </p>
                        <p class="text-xs" :class="holding.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ holding.pnlPercent >= 0 ? '+' : '' }}{{ holding.pnlPercent?.toFixed(2) || '0.00' }}%
                        </p>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 期权持仓表格 - 按标的资产分组 -->
          <div 
            v-if="isAllAccountsMode && optionGroupedHoldings.length > 0" 
            class="border rounded-lg overflow-hidden"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div class="px-4 py-2.5 border-b flex items-center gap-2" :style="{ borderColor: tokens.colors.border.default }">
              <svg class="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">期权持仓</h4>
              <span class="text-xs px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">{{ optionHoldings.length }}</span>
              <span class="ml-auto text-xs" :style="{ color: tokens.colors.text.muted }">
                市值: {{ formatMoney(optionTotalMarketValue) }}
              </span>
            </div>
            <div class="overflow-auto" style="max-height: 300px;">
              <table class="w-full">
                <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
                  <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                    <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">标的</th>
                    <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">合约</th>
                    <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">账户</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">数量</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">市值</th>
                    <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">盈亏</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(group, groupIndex) in optionGroupedHoldings" :key="group.underlying">
                    <!-- 分组分隔线 -->
                    <tr v-if="groupIndex > 0" class="h-2" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                      <td colspan="6"></td>
                    </tr>
                    <!-- 汇总行 - 多合约聚合 -->
                    <tr 
                      v-if="group.contracts.length > 1"
                      class="border-t-2"
                      :style="{ backgroundColor: isDark ? 'rgba(168, 85, 247, 0.08)' : 'rgba(168, 85, 247, 0.04)', borderColor: isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.2)' }"
                    >
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-purple-500/20 text-purple-500">
                            {{ group.underlying?.slice(0, 2) }}
                          </div>
                          <div>
                            <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ group.underlying }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-2.5">
                        <span class="text-xs font-medium px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">{{ group.contracts.length }} 个合约</span>
                      </td>
                      <td class="px-4 py-2.5">
                        <!-- 空 -->
                      </td>
                      <td class="px-4 py-2.5 text-right text-sm font-bold" :style="{ color: tokens.colors.text.primary }">{{ group.totalQuantity }}合约</td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(group.totalMarketValue) }}</p>
                      </td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="font-bold text-sm" :class="group.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.totalPnl >= 0 ? '+' : '' }}{{ formatMoney(group.totalPnl) }}
                        </p>
                      </td>
                    </tr>
                    <!-- 单合约独立行 - 突出显示 -->
                    <tr 
                      v-if="group.contracts.length === 1"
                      class="border-t-2 transition-colors"
                      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                      :style="{ borderColor: tokens.colors.border.default }"
                    >
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold bg-purple-500/20 text-purple-500">
                            {{ group.contracts[0].underlying?.slice(0, 2) }}
                          </div>
                          <span class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ group.contracts[0].underlying }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-1.5">
                          <span 
                            class="px-1.5 py-0.5 rounded text-xs font-bold"
                            :class="group.contracts[0].optionType === 'call' ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'"
                          >
                            {{ group.contracts[0].optionType === 'call' ? 'C' : 'P' }}
                          </span>
                          <span class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">${{ group.contracts[0].strikePrice }}</span>
                          <span class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', color: tokens.colors.text.muted }">
                            {{ new Date(group.contracts[0].expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-2.5">
                        <div class="flex items-center gap-1.5">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: group.contracts[0].accountColor }">
                            {{ group.contracts[0].accountName?.slice(0, 1) }}
                          </div>
                          <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ group.contracts[0].accountName }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                        {{ group.contracts[0].quantity }}合约
                      </td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(group.contracts[0].marketValue) }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(group.contracts[0].currentPrice) }}/股</p>
                      </td>
                      <td class="px-4 py-2.5 text-right">
                        <p class="text-sm font-medium" :class="group.contracts[0].pnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.contracts[0].pnl >= 0 ? '+' : '' }}{{ formatMoney(group.contracts[0].pnl) }}
                        </p>
                        <p class="text-xs" :class="group.contracts[0].pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ group.contracts[0].pnlPercent >= 0 ? '+' : '' }}{{ group.contracts[0].pnlPercent?.toFixed(2) || '0.00' }}%
                        </p>
                      </td>
                    </tr>
                    <!-- 多合约明细行 - 缩进显示 -->
                    <tr 
                      v-for="option in (group.contracts.length > 1 ? group.contracts : [])" 
                      :key="`${option.accountId}-${option.symbol}`"
                      class="transition-colors"
                      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                      :style="{ 
                        borderColor: tokens.colors.border.subtle,
                        backgroundColor: isDark ? 'rgba(168, 85, 247, 0.02)' : 'rgba(168, 85, 247, 0.01)'
                      }"
                    >
                      <td class="px-4 py-2 pl-10 border-l-2" :style="{ borderColor: 'rgba(168, 85, 247, 0.3)' }">
                        <!-- 缩进占位 -->
                      </td>
                      <td class="px-4 py-2">
                        <div class="flex items-center gap-1.5">
                          <span 
                            class="px-1.5 py-0.5 rounded text-xs font-bold"
                            :class="option.optionType === 'call' ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'"
                          >
                            {{ option.optionType === 'call' ? 'C' : 'P' }}
                          </span>
                          <span class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">${{ option.strikePrice }}</span>
                          <span class="text-xs px-1.5 py-0.5 rounded" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', color: tokens.colors.text.muted }">
                            {{ new Date(option.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }}
                          </span>
                        </div>
                      </td>
                      <td class="px-4 py-2">
                        <div class="flex items-center gap-1.5">
                          <div class="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold" :style="{ backgroundColor: option.accountColor }">
                            {{ option.accountName?.slice(0, 1) }}
                          </div>
                          <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ option.accountName }}</span>
                        </div>
                      </td>
                      <td class="px-4 py-2 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                        {{ option.quantity }}合约
                      </td>
                      <td class="px-4 py-2 text-right">
                        <p class="text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(option.marketValue) }}</p>
                        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(option.currentPrice) }}/股</p>
                      </td>
                      <td class="px-4 py-2 text-right">
                        <p class="text-sm" :class="option.pnl >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ option.pnl >= 0 ? '+' : '' }}{{ formatMoney(option.pnl) }}
                        </p>
                        <p class="text-xs" :class="option.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'">
                          {{ option.pnlPercent >= 0 ? '+' : '' }}{{ option.pnlPercent?.toFixed(2) || '0.00' }}%
                        </p>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 空状态 -->
          <div 
            v-if="(!isAllAccountsMode && displayHoldings.length === 0) || (isAllAccountsMode && stockGroupedHoldings.length === 0 && optionHoldings.length === 0)"
            class="flex-1 flex items-center justify-center border rounded-lg"
            :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
          >
            <div class="text-center py-8">
              <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.broker.holdingsEmpty') }}</p>
            </div>
          </div>
        </div>

        <!-- Right: Pending Orders -->
        <div 
          class="w-80 border rounded-lg flex flex-col shrink-0"
          style="max-height: 600px;"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: displayPendingOrders.length > 0 ? 'rgba(234, 179, 8, 0.3)' : tokens.colors.border.default
          }"
        >
          <div 
            class="px-3 py-2.5 border-b flex items-center justify-between shrink-0"
            :style="{ 
              borderColor: tokens.colors.border.default,
              backgroundColor: displayPendingOrders.length > 0 ? 'rgba(234, 179, 8, 0.05)' : 'transparent'
            }"
          >
            <div class="flex items-center gap-2">
              <div v-if="displayPendingOrders.length > 0" class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
                {{ $t('portfolio.broker.pendingOrders') }}
              </h3>
              <span 
                v-if="displayPendingOrders.length > 0"
                class="px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-500"
              >
                {{ displayPendingOrders.length }}
              </span>
            </div>
            <span 
              v-if="displayPendingOrders.length > 0"
              class="text-xs px-1.5 py-0.5 rounded"
              :style="{ backgroundColor: tokens.colors.accent.primary + '15', color: tokens.colors.accent.primary }"
            >
              {{ $t('portfolio.broker.fromStrategy') }}
            </span>
          </div>
          
          <!-- 订单列表 - 可滚动区域 -->
          <div v-if="displayPendingOrders.length > 0" class="flex-1 overflow-y-auto min-h-0">
            <div class="p-2 space-y-2">
              <!-- Compact Order Cards -->
              <div 
                v-for="order in displayPendingOrders" 
                :key="order.id"
                class="p-2.5 rounded-lg border transition-colors"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
                :style="{ borderColor: tokens.colors.border.default }"
              >
                <!-- Order Header -->
                <div class="flex items-center justify-between mb-1.5">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span 
                      class="px-1.5 py-0.5 rounded text-xs font-bold shrink-0"
                      :class="order.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'"
                    >
                      {{ order.side === 'buy' ? '买' : '卖' }}
                    </span>
                    <span class="font-bold text-sm shrink-0" :style="{ color: tokens.colors.text.primary }">{{ order.symbol }}</span>
                    <!-- 汇总模式下显示账户来源 -->
                    <template v-if="isAllAccountsMode && order.accountName">
                      <span class="text-xs shrink-0" :style="{ color: tokens.colors.text.muted }">·</span>
                      <div 
                        class="w-4 h-4 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                        :style="{ backgroundColor: order.accountColor }"
                      >
                        {{ order.accountName?.slice(0, 1) }}
                      </div>
                    </template>
                  </div>
                  <span 
                    class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs shrink-0 ml-2"
                    :class="getOrderStatusClass(order.status)"
                  >
                    <span class="w-1.5 h-1.5 rounded-full" :class="getOrderStatusDotClass(order.status)"></span>
                    {{ getOrderStatusText(order.status) }}
                  </span>
                </div>
                
                <!-- Order Details -->
                <div class="flex items-center gap-2 text-xs mb-1.5 flex-wrap">
                  <span :style="{ color: tokens.colors.text.secondary }">{{ order.quantity }}股</span>
                  <span class="font-mono" :style="{ color: tokens.colors.text.primary }">${{ order.price?.toFixed(2) }}</span>
                  <span :style="{ color: tokens.colors.text.muted }">≈ ${{ (order.quantity * order.price).toFixed(0) }}</span>
                </div>
                
                <!-- 目标/止损 -->
                <div v-if="order.targetPrice || order.stopLossPrice" class="flex items-center gap-2 text-xs mb-1.5 flex-wrap">
                  <span v-if="order.targetPrice" class="text-green-500">目标: ${{ order.targetPrice?.toFixed(2) }}</span>
                  <span v-if="order.stopLossPrice" class="text-red-500">止损: ${{ order.stopLossPrice?.toFixed(2) }}</span>
                </div>
                
                <!-- 时间和取消按钮 -->
                <div class="flex items-center justify-between mt-2 pt-1.5 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
                  <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ formatDateTime(order.createdAt) }}</span>
                  <button 
                    v-if="order.status === 'pending'"
                    @click="cancelBrokerOrder(order)"
                    class="px-2 py-0.5 text-xs rounded border transition-colors"
                    :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                    :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 空状态 - 更紧凑 -->
          <div v-else class="flex-1 flex items-center justify-center py-8">
            <div class="text-center">
              <svg class="w-10 h-10 mx-auto mb-2 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">暂无待执行订单</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Trade History -->
      <div 
        class="border rounded-lg overflow-hidden"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
              {{ $t('portfolio.tradesHistory.title') }} ({{ displayTrades.length }})
            </h3>
            <span v-if="isAllAccountsMode" class="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
              汇总视图
            </span>
          </div>
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1">
            <button 
              v-for="filter in tradeFilters"
              :key="filter.id"
              @click="activeTradeFilter = filter.id"
              class="px-2 py-1 text-xs rounded transition-colors"
              :class="activeTradeFilter === filter.id 
                ? 'bg-blue-500/20 text-blue-500 font-medium' 
                : ''"
              :style="activeTradeFilter !== filter.id 
                ? { color: tokens.colors.text.muted } 
                : {}"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
        
        <div v-if="displayTrades.length > 0" class="overflow-x-auto max-h-80 overflow-y-auto">
          <table class="w-full">
            <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
              <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.time') }}
                </th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.type') }}
                </th>
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.stock') }}
                </th>
                <!-- 汇总模式下显示账户列 -->
                <th v-if="isAllAccountsMode" class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  账户
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.quantity') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.price') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.tradesHistory.amount') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  盈亏
                </th>
                <th class="px-4 py-2 text-center text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  来源
                </th>
              </tr>
            </thead>
            <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
              <tr 
                v-for="trade in displayTrades" 
                :key="isAllAccountsMode ? `${trade.accountId}-${trade.id}` : trade.id"
                class="transition-colors"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
              >
                <td class="px-4 py-2.5 text-xs" :style="{ color: tokens.colors.text.secondary }">
                  {{ formatTradeTime(trade.timestamp) }}
                </td>
                <td class="px-4 py-2.5">
                  <span 
                    class="px-1.5 py-0.5 rounded text-xs font-medium"
                    :class="trade.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'"
                  >
                    {{ trade.type === 'buy' ? $t('portfolio.trade.typeBuy') : $t('portfolio.trade.typeSell') }}
                  </span>
                </td>
                <td class="px-4 py-2.5">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ trade.symbol }}</span>
                    <span class="text-xs hidden sm:inline" :style="{ color: tokens.colors.text.muted }">{{ trade.name }}</span>
                  </div>
                </td>
                <!-- 汇总模式下显示账户名 -->
                <td v-if="isAllAccountsMode" class="px-4 py-2.5">
                  <div class="flex items-center gap-1.5">
                    <div 
                      class="w-4 h-4 rounded flex items-center justify-center text-white text-xs font-bold"
                      :style="{ backgroundColor: trade.accountColor }"
                    >
                      {{ trade.accountName?.slice(0, 1) }}
                    </div>
                    <span class="text-xs" :style="{ color: tokens.colors.text.secondary }">
                      {{ trade.accountName }}
                    </span>
                  </div>
                </td>
                <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                  {{ trade.quantity }}
                </td>
                <td class="px-4 py-2.5 text-right text-sm font-mono" :style="{ color: tokens.colors.text.secondary }">
                  ${{ trade.price?.toFixed(2) }}
                </td>
                <td class="px-4 py-2.5 text-right text-sm font-medium" :style="{ color: tokens.colors.text.primary }">
                  {{ formatMoney(trade.amount) }}
                </td>
                <td class="px-4 py-2.5 text-right text-sm">
                  <span 
                    v-if="trade.pnl !== null"
                    :class="trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'"
                  >
                    {{ trade.pnl >= 0 ? '+' : '' }}{{ formatMoney(trade.pnl) }}
                  </span>
                  <span v-else :style="{ color: tokens.colors.text.muted }">--</span>
                </td>
                <td class="px-4 py-2.5 text-center">
                  <span 
                    class="text-xs px-1.5 py-0.5 rounded"
                    :class="trade.source === 'strategy' 
                      ? 'bg-purple-500/10 text-purple-500' 
                      : 'bg-gray-500/10'"
                    :style="trade.source !== 'strategy' ? { color: tokens.colors.text.muted } : {}"
                  >
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
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.tradesHistory.empty') }}</p>
        </div>
      </div>
    </div>

    <!-- Broker Selection Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="showBrokerSelection" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            class="absolute inset-0 backdrop-blur-sm"
            :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }"
            @click="closeBrokerSelection"
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
                {{ hasConnectedAccounts ? $t('portfolio.broker.addMoreBtn') : $t('portfolio.broker.connectBtn') }}
              </h3>
              <button 
                @click="closeBrokerSelection"
                class="p-1 rounded-md transition-colors"
                :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
              >
                <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="p-6 max-h-96 overflow-y-auto">
              <div class="grid grid-cols-2 gap-3">
                <button 
                  v-for="broker in availableBrokers" 
                  :key="broker.id"
                  @click="handleSelectBroker(broker)"
                  :disabled="isConnecting"
                  class="p-4 rounded-lg border text-left transition-all"
                  :class="[
                    isConnecting && selectedBroker?.id === broker.id ? 'ring-2 ring-blue-500' : '',
                    isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'
                  ]"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default
                  }"
                >
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      :style="{ backgroundColor: broker.color }"
                    >
                      {{ broker.shortName?.slice(0, 2) || broker.name.slice(0, 2) }}
                    </div>
                    <div>
                      <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">
                        {{ broker.shortName || broker.name }}
                      </p>
                      <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                        {{ broker.region }}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
              
              <div v-if="availableBrokers.length === 0" class="text-center py-8">
                <p :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.broker.allConnected') }}</p>
              </div>
            </div>
            
            <div 
              v-if="isConnecting" 
              class="absolute inset-0 rounded-xl flex flex-col items-center justify-center"
              :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)' }"
            >
              <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p class="font-medium" :style="{ color: tokens.colors.text.primary }">
                Connecting to {{ selectedBroker?.name }}...
              </p>
              <p class="text-sm mt-2" :style="{ color: tokens.colors.text.muted }">
                Simulating OAuth authentication
              </p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import { useBrokerAccount, SUPPORTED_BROKERS } from '../../composables/useBrokerAccount'

const { t, locale } = useI18n()
const { tokens, isDark } = useTheme()

const {
  brokerAccounts,
  selectedAccountId,
  currentAccount,
  hasConnectedAccounts,
  connectedBrokerIds,
  isConnecting,
  loadAccounts,
  selectAccount,
  connectAccount,
  disconnectAccount,
  refreshAccount,
  formatMoney,
  getLastSyncText
} = useBrokerAccount()

// Local state
const showBrokerSelection = ref(false)
const showAccountDropdown = ref(false)
const selectedBroker = ref(null)
const isSyncing = ref(false)

// 视图模式 - 'all' 表示查看全部账户汇总, 账户ID 表示查看单个账户
const viewMode = ref('all')

// 是否为汇总模式
const isAllAccountsMode = computed(() => viewMode.value === 'all')

// 当前显示的账户（单账户模式下）
const displayAccount = computed(() => {
  if (isAllAccountsMode.value) return null
  return brokerAccounts.value.find(a => a.id === viewMode.value) || brokerAccounts.value[0]
})

// 切换视图模式
const switchViewMode = (mode) => {
  viewMode.value = mode
  showAccountDropdown.value = false
  if (mode !== 'all') {
    selectAccount(mode)
  }
}

// ===== 汇总数据计算 =====

// 汇总: 总资产
const summaryTotalAssets = computed(() => {
  return brokerAccounts.value.reduce((sum, acc) => sum + (acc.totalAssets || 0), 0)
})

// 汇总: 日盈亏
const summaryDailyPnl = computed(() => {
  return brokerAccounts.value.reduce((sum, acc) => sum + (acc.dailyPnl || 0), 0)
})

// 汇总: 可用资金
const summaryBalance = computed(() => {
  return brokerAccounts.value.reduce((sum, acc) => sum + (acc.balance || 0), 0)
})

// 汇总: 持仓市值
const summaryMarketValue = computed(() => {
  return brokerAccounts.value.reduce((sum, acc) => sum + (acc.marketValue || 0), 0)
})

// 汇总: 仓位比例
const summaryPositionRatio = computed(() => {
  if (!summaryTotalAssets.value) return 0
  return (summaryMarketValue.value / summaryTotalAssets.value) * 100
})

// 汇总: 所有持仓（不聚合，按股票代码分组显示）
const summaryHoldings = computed(() => {
  const holdings = []
  brokerAccounts.value.forEach(account => {
    if (account.holdings) {
      account.holdings.forEach(holding => {
        holdings.push({
          ...holding,
          accountId: account.id,
          accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
          accountColor: account.broker?.color || '#3b82f6'
        })
      })
    }
  })
  // 按股票代码排序，相同股票放在一起
  return holdings.sort((a, b) => a.symbol.localeCompare(b.symbol))
})

// 获取持仓的分组键（用于按标的资产分组）
const getGroupKey = (holding) => {
  // 如果是期权，按标的资产分组
  if (holding.assetType === 'option' && holding.underlying) {
    return holding.underlying
  }
  // 否则按symbol分组
  return holding.symbol
}

// 判断是否为期权
const isOption = (holding) => {
  return holding.assetType === 'option'
}

// 格式化期权描述
const formatOptionDesc = (holding) => {
  if (!isOption(holding)) return ''
  const type = holding.optionType === 'call' ? 'C' : 'P'
  const expiry = holding.expirationDate ? new Date(holding.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''
  const strike = holding.strikePrice ? `$${holding.strikePrice}` : ''
  return `${expiry} ${strike} ${type}`
}

// 汇总: 按标的资产分组的持仓（用于汇总视图）
const groupedHoldings = computed(() => {
  const groups = {}
  
  brokerAccounts.value.forEach(account => {
    if (account.holdings) {
      account.holdings.forEach(holding => {
        const groupKey = getGroupKey(holding)
        const isOpt = isOption(holding)
        
        if (!groups[groupKey]) {
          groups[groupKey] = {
            symbol: groupKey,
            name: isOpt ? (holding.underlyingName || holding.name) : holding.name,
            isUnderlyingGroup: false, // 是否包含期权
            hasStock: false,
            hasOptions: false,
            totalQuantity: 0,
            totalMarketValue: 0,
            totalCostBasis: 0,
            accounts: [],
            // 按资产类型细分
            stockAccounts: [],
            optionAccounts: []
          }
        }
        
        if (isOpt) {
          groups[groupKey].hasOptions = true
          groups[groupKey].isUnderlyingGroup = true
        } else {
          groups[groupKey].hasStock = true
        }
        
        groups[groupKey].totalQuantity += holding.quantity || 0
        groups[groupKey].totalMarketValue += holding.marketValue || 0
        groups[groupKey].totalCostBasis += (holding.avgCost || holding.costBasis / holding.quantity || 0) * holding.quantity
        
        const holdingWithAccount = {
          ...holding,
          accountId: account.id,
          accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
          accountColor: account.broker?.color || '#3b82f6',
          optionDesc: isOpt ? formatOptionDesc(holding) : ''
        }
        
        groups[groupKey].accounts.push(holdingWithAccount)
        
        if (isOpt) {
          groups[groupKey].optionAccounts.push(holdingWithAccount)
        } else {
          groups[groupKey].stockAccounts.push(holdingWithAccount)
        }
      })
    }
  })
  
  // 计算每组的汇总盈亏，并对期权进行排序
  Object.values(groups).forEach(group => {
    group.totalPnl = group.totalMarketValue - group.totalCostBasis
    group.totalPnlPercent = group.totalCostBasis > 0 
      ? (group.totalPnl / group.totalCostBasis) * 100 
      : 0
    group.avgPrice = group.totalQuantity > 0 ? group.totalMarketValue / group.totalQuantity : 0
    
    // 对期权按到期日和行权价排序
    if (group.optionAccounts.length > 0) {
      group.optionAccounts.sort((a, b) => {
        // 先按到期日
        const dateA = new Date(a.expirationDate || 0)
        const dateB = new Date(b.expirationDate || 0)
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime()
        }
        // 再按行权价
        return (a.strikePrice || 0) - (b.strikePrice || 0)
      })
    }
    
    // 重新组合accounts：先股票后期权
    group.accounts = [...group.stockAccounts, ...group.optionAccounts]
  })
  
  // 按标的资产代码排序后返回数组
  return Object.values(groups).sort((a, b) => a.symbol.localeCompare(b.symbol))
})

// 汇总: 只包含股票的分组（用于股票表格）
const stockGroupedHoldings = computed(() => {
  const groups = {}
  
  brokerAccounts.value.forEach(account => {
    if (account.holdings) {
      account.holdings
        .filter(h => h.assetType !== 'option')
        .forEach(holding => {
          const symbol = holding.symbol
          
          if (!groups[symbol]) {
            groups[symbol] = {
              symbol: symbol,
              name: holding.name,
              totalQuantity: 0,
              totalMarketValue: 0,
              totalCostBasis: 0,
              accounts: []
            }
          }
          
          groups[symbol].totalQuantity += holding.quantity || 0
          groups[symbol].totalMarketValue += holding.marketValue || 0
          groups[symbol].totalCostBasis += (holding.avgCost || holding.costBasis / holding.quantity || 0) * holding.quantity
          
          groups[symbol].accounts.push({
            ...holding,
            accountId: account.id,
            accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
            accountColor: account.broker?.color || '#3b82f6'
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
  })
  
  return Object.values(groups).sort((a, b) => a.symbol.localeCompare(b.symbol))
})

// 汇总: 按标的资产分组的期权持仓
const optionGroupedHoldings = computed(() => {
  const groups = {}
  
  brokerAccounts.value.forEach(account => {
    if (account.holdings) {
      account.holdings
        .filter(h => h.assetType === 'option')
        .forEach(holding => {
          const underlying = holding.underlying || holding.symbol
          
          if (!groups[underlying]) {
            groups[underlying] = {
              underlying: underlying,
              underlyingName: holding.underlyingName || holding.name,
              totalQuantity: 0,
              totalMarketValue: 0,
              totalCostBasis: 0,
              contracts: []
            }
          }
          
          groups[underlying].totalQuantity += holding.quantity || 0
          groups[underlying].totalMarketValue += holding.marketValue || 0
          groups[underlying].totalCostBasis += (holding.avgCost || (holding.costBasis || 0) / (holding.quantity || 1) || 0) * (holding.quantity || 0)
          
          groups[underlying].contracts.push({
            ...holding,
            accountId: account.id,
            accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
            accountColor: account.broker?.color || '#3b82f6'
          })
        })
    }
  })
  
  // 计算每组的汇总盈亏，并对合约排序
  Object.values(groups).forEach(group => {
    group.totalPnl = group.totalMarketValue - group.totalCostBasis
    group.totalPnlPercent = group.totalCostBasis > 0 
      ? (group.totalPnl / group.totalCostBasis) * 100 
      : 0
    
    // 按到期日、期权类型、行权价排序
    group.contracts.sort((a, b) => {
      // 先按到期日
      const dateA = new Date(a.expirationDate || 0)
      const dateB = new Date(b.expirationDate || 0)
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime()
      }
      // 再按期权类型 (call 在前)
      if (a.optionType !== b.optionType) {
        return a.optionType === 'call' ? -1 : 1
      }
      // 再按行权价
      if (a.strikePrice !== b.strikePrice) {
        return (a.strikePrice || 0) - (b.strikePrice || 0)
      }
      // 最后按账户
      return a.accountName.localeCompare(b.accountName)
    })
  })
  
  return Object.values(groups).sort((a, b) => a.underlying.localeCompare(b.underlying))
})

// 兼容旧代码：平铺的期权列表
const optionHoldings = computed(() => {
  const options = []
  optionGroupedHoldings.value.forEach(group => {
    options.push(...group.contracts)
  })
  return options
})

// 股票总市值
const stockTotalMarketValue = computed(() => {
  return stockGroupedHoldings.value.reduce((sum, group) => sum + group.totalMarketValue, 0)
})

// 期权总市值
const optionTotalMarketValue = computed(() => {
  return optionGroupedHoldings.value.reduce((sum, group) => sum + group.totalMarketValue, 0)
})

// 汇总: 所有待执行订单
const summaryPendingOrders = computed(() => {
  const orders = []
  brokerAccounts.value.forEach(account => {
    if (account.orders) {
      account.orders
        .filter(o => ['pending', 'partial'].includes(o.status))
        .forEach(order => {
          orders.push({
            ...order,
            accountId: account.id,
            accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
            accountColor: account.broker?.color || '#3b82f6'
          })
        })
    }
  })
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 汇总: 所有交易记录
const summaryTrades = computed(() => {
  const trades = []
  brokerAccounts.value.forEach(account => {
    if (account.trades) {
      account.trades.forEach(trade => {
        trades.push({
          ...trade,
          accountId: account.id,
          accountName: account.broker?.shortName || account.broker?.name || 'Unknown',
          accountColor: account.broker?.color || '#3b82f6'
        })
      })
    }
  })
  return trades.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

// ===== 当前显示数据（根据模式切换）=====

// 显示的总资产
const displayTotalAssets = computed(() => {
  return isAllAccountsMode.value ? summaryTotalAssets.value : (displayAccount.value?.totalAssets || 0)
})

// 显示的日盈亏
const displayDailyPnl = computed(() => {
  return isAllAccountsMode.value ? summaryDailyPnl.value : (displayAccount.value?.dailyPnl || 0)
})

// 显示的可用资金
const displayBalance = computed(() => {
  return isAllAccountsMode.value ? summaryBalance.value : (displayAccount.value?.balance || 0)
})

// 显示的持仓市值
const displayMarketValue = computed(() => {
  return isAllAccountsMode.value ? summaryMarketValue.value : (displayAccount.value?.marketValue || 0)
})

// 显示的仓位比例
const displayPositionRatio = computed(() => {
  if (isAllAccountsMode.value) return summaryPositionRatio.value
  if (!displayAccount.value?.totalAssets) return 0
  return ((displayAccount.value.marketValue || 0) / displayAccount.value.totalAssets) * 100
})

// 显示的持仓
const displayHoldings = computed(() => {
  return isAllAccountsMode.value ? summaryHoldings.value : (displayAccount.value?.holdings || [])
})

// 显示的待执行订单
const displayPendingOrders = computed(() => {
  if (isAllAccountsMode.value) return summaryPendingOrders.value
  if (!displayAccount.value?.orders) return []
  return displayAccount.value.orders
    .filter(o => ['pending', 'partial'].includes(o.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// 显示的交易记录（根据筛选）
const displayTrades = computed(() => {
  const trades = isAllAccountsMode.value ? summaryTrades.value : (displayAccount.value?.trades || [])
  if (activeTradeFilter.value === 'all') return trades
  if (activeTradeFilter.value === 'buy') return trades.filter(t => t.type === 'buy')
  if (activeTradeFilter.value === 'sell') return trades.filter(t => t.type === 'sell')
  if (activeTradeFilter.value === 'strategy') return trades.filter(t => t.source === 'strategy')
  return trades
})

// Get current locale for getLastSyncText
const currentLocale = computed(() => locale.value === 'zh-CN' ? 'zh' : 'en')

// Position ratio (deprecated, use displayPositionRatio instead)
const positionRatio = computed(() => {
  if (!currentAccount.value?.totalAssets) return 0
  return ((currentAccount.value.marketValue || 0) / currentAccount.value.totalAssets) * 100
})

// Available brokers (not yet connected)
const availableBrokers = computed(() => {
  return SUPPORTED_BROKERS.filter(b => !connectedBrokerIds.value.includes(b.id))
})

// Load accounts on mount
onMounted(() => {
  loadAccounts()
})

// Mask account number
const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '****'
  if (accountNumber.length <= 4) return accountNumber
  return accountNumber.slice(0, 4) + '****' + accountNumber.slice(-4)
}

// Handle broker selection
const handleSelectBroker = async (broker) => {
  selectedBroker.value = broker
  const result = await connectAccount(broker)
  if (result.success) {
    showBrokerSelection.value = false
    selectedBroker.value = null
  }
}

// Close broker selection modal
const closeBrokerSelection = () => {
  if (!isConnecting.value) {
    showBrokerSelection.value = false
    selectedBroker.value = null
  }
}

// Handle sync
const handleSync = async () => {
  isSyncing.value = true
  await refreshAccount()
  isSyncing.value = false
}

// Handle disconnect
const handleDisconnect = () => {
  disconnectAccount()
}

// Pending orders for current broker account (deprecated)
const pendingBrokerOrders = computed(() => {
  if (!currentAccount.value?.orders) return []
  return currentAccount.value.orders.filter(o => ['pending', 'partial'].includes(o.status))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
    pending: t('portfolio.broker.statusPending'),
    partial: t('portfolio.broker.statusPartial'),
    filled: t('portfolio.broker.statusFilled'),
    cancelled: t('portfolio.broker.statusCancelled'),
    rejected: t('portfolio.broker.statusRejected')
  }
  return texts[status] || status
}

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

// Cancel broker order
const cancelBrokerOrder = (order) => {
  if (!confirm(t('portfolio.broker.confirmCancel'))) return
  
  // 找到订单所属的账户
  const accountId = order.accountId || selectedAccountId.value
  const account = brokerAccounts.value.find(a => a.id === accountId)
  if (account && account.orders) {
    const orderIndex = account.orders.findIndex(o => o.id === order.id)
    if (orderIndex !== -1) {
      account.orders[orderIndex].status = 'cancelled'
      account.orders[orderIndex].cancelledAt = new Date().toISOString()
      account.orders[orderIndex].updatedAt = new Date().toISOString()
    }
    localStorage.setItem('broker_accounts', JSON.stringify(brokerAccounts.value))
  }
}

// Trade history filters
const activeTradeFilter = ref('all')
const tradeFilters = [
  { id: 'all', label: '全部' },
  { id: 'buy', label: '买入' },
  { id: 'sell', label: '卖出' },
  { id: 'strategy', label: '策略' }
]

// Filtered trades (deprecated, use displayTrades instead)
const filteredTrades = computed(() => {
  const trades = currentAccount.value?.trades || []
  if (activeTradeFilter.value === 'all') return trades
  if (activeTradeFilter.value === 'buy') return trades.filter(t => t.type === 'buy')
  if (activeTradeFilter.value === 'sell') return trades.filter(t => t.type === 'sell')
  if (activeTradeFilter.value === 'strategy') return trades.filter(t => t.source === 'strategy')
  return trades
})

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

// Format trade time
const formatTradeTime = (timestamp) => {
  if (!timestamp) return '--'
  const date = new Date(timestamp)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()
  
  if (isToday) {
    return '今天 ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  } else if (isYesterday) {
    return '昨天 ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + 
           date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
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