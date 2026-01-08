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
      <!-- Top Bar: Account Switcher + Stats -->
      <div 
        class="border rounded-lg p-4"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Left: Account Switcher -->
          <div class="flex items-center gap-3">
            <!-- Current Account -->
            <div 
              v-if="currentAccount"
              class="flex items-center gap-3 px-3 py-2 rounded-lg border"
              :style="{ 
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                borderColor: 'rgba(59, 130, 246, 0.3)'
              }"
            >
              <div 
                class="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold"
                :style="{ backgroundColor: currentAccount.broker?.color || '#3b82f6' }"
              >
                {{ currentAccount.broker?.shortName?.slice(0, 2) || 'BR' }}
              </div>
              <div>
                <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">
                  {{ currentAccount.broker?.shortName || currentAccount.broker?.name }}
                </p>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                  {{ maskAccountNumber(currentAccount.accountNumber) }}
                </p>
              </div>
              <span class="ml-2 w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            
            <!-- Other Accounts Dropdown -->
            <div v-if="brokerAccounts.length > 1" class="relative">
              <button 
                @click="showAccountDropdown = !showAccountDropdown"
                class="px-3 py-2 rounded-lg border text-sm transition-colors"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              >
                +{{ brokerAccounts.length - 1 }} 更多
                <svg class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Dropdown -->
              <div 
                v-if="showAccountDropdown"
                class="absolute top-full left-0 mt-1 w-48 rounded-lg border shadow-lg z-10"
                :style="{ 
                  backgroundColor: tokens.colors.background.overlay,
                  borderColor: tokens.colors.border.default
                }"
              >
                <button 
                  v-for="account in brokerAccounts.filter(a => a.id !== selectedAccountId)" 
                  :key="account.id"
                  @click="selectAccount(account.id); showAccountDropdown = false"
                  class="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                >
                  <div 
                    class="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                    :style="{ backgroundColor: account.broker?.color || '#3b82f6' }"
                  >
                    {{ account.broker?.shortName?.slice(0, 2) || 'BR' }}
                  </div>
                  <span class="text-sm" :style="{ color: tokens.colors.text.primary }">
                    {{ account.broker?.shortName }}
                  </span>
                </button>
              </div>
            </div>
            
            <!-- Add More -->
            <button 
              @click="showBrokerSelection = true"
              class="px-3 py-2 rounded-lg border border-dashed text-sm transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
            >
              <svg class="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              添加
            </button>
          </div>
          
          <!-- Right: Quick Stats -->
          <div class="flex items-center gap-6">
            <div class="text-right">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">总资产</p>
              <p class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
                {{ formatMoney(currentAccount?.totalAssets || 0) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">日盈亏</p>
              <p 
                class="text-lg font-bold"
                :class="(currentAccount?.dailyPnl || 0) >= 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ (currentAccount?.dailyPnl || 0) >= 0 ? '+' : '' }}{{ formatMoney(currentAccount?.dailyPnl || 0) }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="handleSync"
                :disabled="isSyncing"
                class="p-2 rounded-lg border transition-colors"
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
                @click="handleDisconnect"
                class="p-2 rounded-lg border transition-colors text-red-500 hover:bg-red-500/10"
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
        
        <!-- Sub Stats Row -->
        <div class="flex items-center gap-6 mt-3 pt-3 border-t" :style="{ borderColor: tokens.colors.border.subtle }">
          <div class="flex items-center gap-2">
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">可用资金:</span>
            <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(currentAccount?.balance || 0) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">持仓市值:</span>
            <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(currentAccount?.marketValue || 0) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">仓位:</span>
            <div class="flex items-center gap-2">
              <div class="w-20 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }">
                <div 
                  class="h-full rounded-full bg-blue-500" 
                  :style="{ width: `${positionRatio}%` }"
                ></div>
              </div>
              <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ positionRatio.toFixed(0) }}%</span>
            </div>
          </div>
          <div class="ml-auto text-xs" :style="{ color: tokens.colors.text.muted }">
            {{ $t('portfolio.broker.lastSync') }}: {{ getLastSyncText(currentAccount?.lastSyncAt, currentLocale) }}
          </div>
        </div>
      </div>

      <!-- Main Content: Left Holdings + Right Orders -->
      <div class="flex gap-4" style="min-height: 500px;">
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
              {{ $t('portfolio.broker.holdingsTitle') }} ({{ currentAccount?.holdings?.length || 0 }})
            </h3>
          </div>
          
          <div v-if="currentAccount?.holdings?.length > 0" class="flex-1 overflow-auto">
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
                  v-for="holding in currentAccount.holdings" 
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
                      {{ holding.pnlPercent >= 0 ? '+' : '' }}{{ holding.pnlPercent.toFixed(2) }}%
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div v-else class="flex-1 flex items-center justify-center">
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
          class="w-96 border rounded-lg overflow-hidden flex flex-col shrink-0"
          :style="{ 
            backgroundColor: tokens.colors.background.surface, 
            borderColor: pendingBrokerOrders.length > 0 ? 'rgba(234, 179, 8, 0.3)' : tokens.colors.border.default
          }"
        >
          <div 
            class="px-4 py-3 border-b flex items-center justify-between"
            :style="{ 
              borderColor: tokens.colors.border.default,
              backgroundColor: pendingBrokerOrders.length > 0 ? 'rgba(234, 179, 8, 0.05)' : 'transparent'
            }"
          >
            <div class="flex items-center gap-2">
              <div v-if="pendingBrokerOrders.length > 0" class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
                {{ $t('portfolio.broker.pendingOrders') }}
              </h3>
              <span 
                v-if="pendingBrokerOrders.length > 0"
                class="px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-500"
              >
                {{ pendingBrokerOrders.length }}
              </span>
            </div>
            <span 
              v-if="pendingBrokerOrders.length > 0"
              class="text-xs px-2 py-0.5 rounded"
              :style="{ backgroundColor: tokens.colors.accent.primary + '15', color: tokens.colors.accent.primary }"
            >
              {{ $t('portfolio.broker.fromStrategy') }}
            </span>
          </div>
          
          <div v-if="pendingBrokerOrders.length > 0" class="flex-1 overflow-auto p-3 space-y-2">
            <!-- Order Cards -->
            <div 
              v-for="order in pendingBrokerOrders" 
              :key="order.id"
              class="p-3 rounded-lg border transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
              :style="{ borderColor: tokens.colors.border.default }"
            >
              <!-- Order Header -->
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span 
                    class="px-1.5 py-0.5 rounded text-xs font-bold"
                    :class="order.side === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'"
                  >
                    {{ order.side === 'buy' ? '买' : '卖' }}
                  </span>
                  <span class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">{{ order.symbol }}</span>
                </div>
                <span 
                  class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs"
                  :class="getOrderStatusClass(order.status)"
                >
                  <span class="w-1 h-1 rounded-full" :class="getOrderStatusDotClass(order.status)"></span>
                  {{ getOrderStatusText(order.status) }}
                </span>
              </div>
              
              <!-- Order Details -->
              <div class="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span :style="{ color: tokens.colors.text.muted }">数量: </span>
                  <span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ order.quantity }}股</span>
                </div>
                <div>
                  <span :style="{ color: tokens.colors.text.muted }">价格: </span>
                  <span class="font-mono font-medium" :style="{ color: tokens.colors.text.primary }">${{ order.price?.toFixed(2) }}</span>
                </div>
                <div v-if="order.targetPrice">
                  <span :style="{ color: tokens.colors.text.muted }">目标: </span>
                  <span class="font-mono text-green-500">${{ order.targetPrice?.toFixed(2) }}</span>
                </div>
                <div v-if="order.stopLossPrice">
                  <span :style="{ color: tokens.colors.text.muted }">止损: </span>
                  <span class="font-mono text-red-500">${{ order.stopLossPrice?.toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Order Meta -->
              <div class="flex items-center justify-between text-xs mb-3" :style="{ color: tokens.colors.text.muted }">
                <span>{{ formatDateTime(order.createdAt) }}</span>
                <span>≈ ${{ (order.quantity * order.price).toFixed(0) }}</span>
              </div>
              
              <!-- Order Actions -->
              <div class="flex items-center gap-2">
                <button 
                  v-if="order.status === 'pending'"
                  @click="cancelBrokerOrder(order)"
                  class="flex-1 px-2 py-1.5 text-xs font-medium rounded border transition-colors"
                  :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                  :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                >
                  {{ $t('portfolio.broker.cancelOrder') }}
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
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <div class="px-4 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
          <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
            {{ $t('portfolio.tradesHistory.title') }} ({{ currentAccount?.trades?.length || 0 }})
          </h3>
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
        
        <div v-if="filteredTrades.length > 0" class="overflow-x-auto max-h-80 overflow-y-auto">
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
                v-for="trade in filteredTrades" 
                :key="trade.id"
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
                <td class="px-4 py-2.5 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                  {{ trade.quantity }}
                </td>
                <td class="px-4 py-2.5 text-right text-sm font-mono" :style="{ color: tokens.colors.text.secondary }">
                  ${{ trade.price.toFixed(2) }}
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

// Get current locale for getLastSyncText
const currentLocale = computed(() => locale.value === 'zh-CN' ? 'zh' : 'en')

// Position ratio
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

// Pending orders for current broker account
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
  
  const account = brokerAccounts.value.find(a => a.id === selectedAccountId.value)
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

// Filtered trades
const filteredTrades = computed(() => {
  const trades = currentAccount.value?.trades || []
  if (activeTradeFilter.value === 'all') return trades
  if (activeTradeFilter.value === 'buy') return trades.filter(t => t.type === 'buy')
  if (activeTradeFilter.value === 'sell') return trades.filter(t => t.type === 'sell')
  if (activeTradeFilter.value === 'strategy') return trades.filter(t => t.source === 'strategy')
  return trades
})

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