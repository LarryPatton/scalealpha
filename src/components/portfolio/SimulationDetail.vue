<template>
  <div class="space-y-4">
    <!-- Back Button & Header -->
    <div class="flex items-center justify-between">
      <button 
        @click="$emit('back')"
        class="flex items-center gap-2 text-sm font-medium transition-colors"
        :class="isDark ? 'hover:text-white' : 'hover:text-black'"
        :style="{ color: tokens.colors.text.muted }"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {{ $t('portfolio.simulation.detail.backBtn') }}
      </button>
      <div class="flex items-center gap-2">
        <button 
          @click="showTradeModal = true"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          {{ $t('portfolio.simulation.detail.newTradeBtn') }}
        </button>
      </div>
    </div>

    <!-- Top Bar: Portfolio Name + Stats -->
    <div 
      class="border rounded-lg p-4"
      :style="{ 
        backgroundColor: tokens.colors.background.surface, 
        borderColor: tokens.colors.border.default 
      }"
    >
      <div class="flex items-center justify-between flex-wrap gap-4">
        <!-- Left: Portfolio Info -->
        <div class="flex items-center gap-4">
          <div 
            class="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
            :style="{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)' }"
          >
            📊
          </div>
          <div>
            <h1 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
              {{ portfolio.name }}
            </h1>
            <p v-if="portfolio.description" class="text-xs" :style="{ color: tokens.colors.text.muted }">
              {{ portfolio.description }}
            </p>
          </div>
        </div>
        
        <!-- Right: Key Stats -->
        <div class="flex items-center gap-6">
          <div class="text-right">
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">净资产</p>
            <p class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
              {{ formatMoney(portfolio.currentValue) }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">累计收益</p>
            <p 
              class="text-lg font-bold"
              :class="portfolio.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'"
            >
              {{ portfolio.totalReturn >= 0 ? '+' : '' }}{{ portfolio.totalReturn.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
      
      <!-- Sub Stats Row -->
      <div class="flex items-center gap-6 mt-3 pt-3 border-t flex-wrap" :style="{ borderColor: tokens.colors.border.subtle }">
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">初始资金:</span>
          <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(portfolio.initialCapital) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">可用现金:</span>
          <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(portfolio.availableCash) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">持仓市值:</span>
          <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holdingsValue) }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">仓位:</span>
          <div class="flex items-center gap-2">
            <div class="w-16 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }">
              <div 
                class="h-full rounded-full bg-blue-500" 
                :style="{ width: `${positionRatio}%` }"
              ></div>
            </div>
            <span class="text-xs font-medium" :style="{ color: tokens.colors.text.secondary }">{{ positionRatio.toFixed(0) }}%</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">胜率:</span>
          <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ winRate.toFixed(1) }}%</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs" :style="{ color: tokens.colors.text.muted }">交易次数:</span>
          <span class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ portfolio.trades?.length || 0 }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content: Left Holdings + Right Orders -->
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
            {{ $t('portfolio.simulation.detail.tabHoldings') }} ({{ portfolio.holdings?.length || 0 }})
          </h3>
        </div>
        
        <div v-if="portfolio.holdings?.length > 0" class="flex-1 overflow-auto">
          <table class="w-full">
            <thead class="sticky top-0" :style="{ backgroundColor: tokens.colors.background.surface }">
              <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
                <th class="px-4 py-2 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.simulation.detail.stock') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.simulation.detail.quantity') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.simulation.detail.marketValue') }}
                </th>
                <th class="px-4 py-2 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.simulation.detail.pnl') }}
                </th>
                <th class="px-4 py-2 text-center text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                  {{ $t('portfolio.simulation.detail.actions') }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
              <tr 
                v-for="holding in portfolio.holdings" 
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
                  <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoneyFull(holding.marketValue) }}</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoneyFull(holding.avgCost) }}</p>
                </td>
                <td class="px-4 py-3 text-right">
                  <p 
                    class="font-medium text-sm"
                    :class="holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'"
                  >
                    {{ holding.pnl >= 0 ? '+' : '' }}{{ formatMoneyFull(holding.pnl) }}
                  </p>
                  <p 
                    class="text-xs"
                    :class="holding.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'"
                  >
                    {{ holding.pnlPercent >= 0 ? '+' : '' }}{{ holding.pnlPercent.toFixed(2) }}%
                  </p>
                </td>
                <td class="px-4 py-3 text-center">
                  <button 
                    @click="openSellModal(holding)"
                    class="px-2 py-1 text-xs font-medium rounded border text-red-500 border-red-500/30 hover:bg-red-500/10 transition-colors"
                  >
                    {{ $t('portfolio.simulation.detail.sellBtn') }}
                  </button>
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
            <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.simulation.detail.emptyHoldings') }}</p>
          </div>
        </div>
      </div>

      <!-- Right: Pending Orders -->
      <div 
        class="w-96 border rounded-lg overflow-hidden flex flex-col shrink-0"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: pendingOrders.length > 0 ? 'rgba(59, 130, 246, 0.3)' : tokens.colors.border.default
        }"
      >
        <div 
          class="px-4 py-3 border-b flex items-center justify-between"
          :style="{ 
            borderColor: tokens.colors.border.default,
            backgroundColor: pendingOrders.length > 0 ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
          }"
        >
          <div class="flex items-center gap-2">
            <div v-if="pendingOrders.length > 0" class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <h3 class="font-bold text-sm" :style="{ color: tokens.colors.text.primary }">
              待执行订单
            </h3>
            <span 
              v-if="pendingOrders.length > 0"
              class="px-1.5 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-500"
            >
              {{ pendingOrders.length }}
            </span>
          </div>
          <span 
            v-if="pendingOrders.length > 0"
            class="text-xs px-2 py-0.5 rounded"
            :style="{ backgroundColor: tokens.colors.accent.primary + '15', color: tokens.colors.accent.primary }"
          >
            来自策略
          </span>
        </div>
        
        <div v-if="pendingOrders.length > 0" class="flex-1 overflow-auto p-3 space-y-2">
          <!-- Order Cards -->
          <div 
            v-for="order in pendingOrders" 
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
            <div v-if="order.status === 'pending'" class="flex items-center gap-2">
              <button 
                @click="executeStrategyOrder(order)"
                class="flex-1 px-2 py-1.5 text-xs font-medium rounded bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20 transition-colors"
              >
                执行
              </button>
              <button 
                @click="cancelOrder(order)"
                class="flex-1 px-2 py-1.5 text-xs font-medium rounded border transition-colors"
                :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              >
                取消
              </button>
            </div>
            <div v-else-if="order.status === 'filled'" class="text-xs text-center" :style="{ color: tokens.colors.text.muted }">
              成交于 {{ formatDateTime(order.filledAt) }}
            </div>
          </div>
        </div>
        
        <div v-else class="flex-1 flex items-center justify-center">
          <div class="text-center py-8">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p class="text-sm" :style="{ color: tokens.colors.text.muted }">暂无待执行订单</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">从策略计划发起交易后显示</p>
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
      <div class="px-6 py-4 border-b" :style="{ borderColor: tokens.colors.border.default }">
        <h3 class="font-bold" :style="{ color: tokens.colors.text.primary }">
          {{ $t('portfolio.tradesHistory.title') }} ({{ portfolio.trades?.length || 0 }})
        </h3>
      </div>
      
      <div v-if="portfolio.trades?.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.time') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.type') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.stock') }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.quantity') }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.price') }}
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.tradesHistory.amount') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
            <tr 
              v-for="trade in sortedTrades" 
              :key="trade.id"
              class="transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
            >
              <td class="px-6 py-3 text-sm" :style="{ color: tokens.colors.text.secondary }">
                {{ formatDateTime(trade.timestamp) }}
              </td>
              <td class="px-6 py-3">
                <span 
                  class="px-2 py-0.5 rounded text-xs font-medium"
                  :class="trade.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'"
                >
                  {{ trade.type === 'buy' ? $t('portfolio.trade.typeBuy') : $t('portfolio.trade.typeSell') }}
                </span>
              </td>
              <td class="px-6 py-3">
                <span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ trade.symbol }}</span>
              </td>
              <td class="px-6 py-3 text-right" :style="{ color: tokens.colors.text.secondary }">
                {{ trade.quantity }}
              </td>
              <td class="px-6 py-3 text-right" :style="{ color: tokens.colors.text.secondary }">
                {{ formatMoneyFull(trade.price) }}
              </td>
              <td class="px-6 py-3 text-right font-medium" :style="{ color: tokens.colors.text.primary }">
                {{ formatMoneyFull(trade.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="p-12 text-center">
        <p :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.tradesHistory.empty') }}</p>
      </div>
    </div>

    <!-- Trade Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div 
          v-if="showTradeModal" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div 
            class="absolute inset-0 backdrop-blur-sm"
            :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }"
            @click="closeTradeModal"
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
                {{ $t('portfolio.trade.modalTitle') }}
              </h3>
              <button 
                @click="closeTradeModal"
                class="p-1 rounded-md transition-colors"
                :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
              >
                <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="p-6 space-y-5">
              <!-- Buy/Sell Toggle -->
              <div class="flex rounded-lg p-1" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }">
                <button 
                  @click="tradeForm.type = 'buy'"
                  class="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  :class="tradeForm.type === 'buy' ? 'bg-green-500 text-white' : ''"
                  :style="tradeForm.type !== 'buy' ? { color: tokens.colors.text.muted } : {}"
                >
                  {{ $t('portfolio.trade.typeBuy') }}
                </button>
                <button 
                  @click="tradeForm.type = 'sell'"
                  class="flex-1 py-2 text-sm font-medium rounded-md transition-colors"
                  :class="tradeForm.type === 'sell' ? 'bg-red-500 text-white' : ''"
                  :style="tradeForm.type !== 'sell' ? { color: tokens.colors.text.muted } : {}"
                >
                  {{ $t('portfolio.trade.typeSell') }}
                </button>
              </div>

              <!-- Stock Search/Select -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.broker.stock') }}
                </label>
                <div class="relative">
                  <input 
                    v-model="tradeForm.symbolSearch"
                    type="text"
                    class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :placeholder="$t('portfolio.trade.searchPlaceholder')"
                    :style="{ 
                      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      borderColor: tokens.colors.border.default,
                      color: tokens.colors.text.primary
                    }"
                    @focus="showStockDropdown = true"
                  />
                  <!-- Stock Dropdown -->
                  <div 
                    v-if="showStockDropdown && filteredStocks.length > 0"
                    class="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-xl max-h-48 overflow-y-auto z-10"
                    :style="{ 
                      backgroundColor: tokens.colors.background.overlay,
                      borderColor: tokens.colors.border.strong
                    }"
                  >
                    <button 
                      v-for="stock in filteredStocks" 
                      :key="stock.symbol"
                      @click="selectStock(stock)"
                      class="w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between"
                      :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                    >
                      <div>
                        <span class="font-medium" :style="{ color: tokens.colors.text.primary }">{{ stock.symbol }}</span>
                        <span class="ml-2" :style="{ color: tokens.colors.text.muted }">{{ stock.name }}</span>
                      </div>
                      <span :style="{ color: tokens.colors.text.secondary }">${{ stock.price.toFixed(2) }}</span>
                    </button>
                  </div>
                </div>
                <!-- Selected Stock Info -->
                <div v-if="tradeForm.selectedStock" class="mt-2 p-3 rounded-lg" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }">
                  <div class="flex items-center justify-between">
                    <span class="font-bold" :style="{ color: tokens.colors.text.primary }">{{ tradeForm.selectedStock.symbol }}</span>
                    <span class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">${{ tradeForm.selectedStock.price.toFixed(2) }}</span>
                  </div>
                </div>
              </div>

              <!-- Quantity -->
              <div>
                <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
                  {{ $t('portfolio.trade.quantity') }}
                </label>
                <input 
                  v-model.number="tradeForm.quantity"
                  type="number"
                  min="1"
                  class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :style="{ 
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    borderColor: tokens.colors.border.default,
                    color: tokens.colors.text.primary
                  }"
                />
              </div>

              <!-- Estimated Amount -->
              <div class="p-4 rounded-lg" :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.trade.estimatedAmount') }}</span>
                  <span class="font-bold text-lg" :style="{ color: tokens.colors.text.primary }">
                    {{ formatMoneyFull(estimatedAmount) }}
                  </span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.trade.availableCash') }}</span>
                  <span :style="{ color: tokens.colors.text.secondary }">{{ formatMoneyFull(portfolio.availableCash) }}</span>
                </div>
              </div>

              <!-- Error Message -->
              <p v-if="tradeError" class="text-sm text-red-500">{{ tradeError }}</p>

              <!-- Submit Button -->
              <button 
                @click="executeTrade"
                :disabled="!canExecuteTrade"
                class="w-full py-3 rounded-lg font-medium transition-colors"
                :class="[
                  canExecuteTrade 
                    ? (tradeForm.type === 'buy' ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-600 hover:bg-red-500 text-white')
                    : 'bg-gray-400 cursor-not-allowed text-white'
                ]"
              >
                {{ tradeForm.type === 'buy' ? $t('portfolio.trade.confirmBuy') : $t('portfolio.trade.confirmSell') }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'

const props = defineProps({
  portfolio: { type: Object, required: true }
})

const emit = defineEmits(['back', 'update', 'delete'])

const { t } = useI18n()
const { tokens, isDark } = useTheme()

// Sample stocks for trading
const sampleStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.50 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 495.22 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50 },
  { symbol: 'META', name: 'Meta Platforms', price: 358.32 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.42 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.91 },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 172.65 },
  { symbol: 'V', name: 'Visa Inc.', price: 262.84 },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 163.18 }
]

// Trade Modal State
const showTradeModal = ref(false)
const showStockDropdown = ref(false)
const tradeForm = ref({
  type: 'buy',
  symbolSearch: '',
  selectedStock: null,
  quantity: 10
})
const tradeError = ref('')

// Computed
const holdingsValue = computed(() => {
  return props.portfolio.holdings?.reduce((sum, h) => sum + (h.marketValue || 0), 0) || 0
})

const positionRatio = computed(() => {
  if (!props.portfolio.currentValue) return 0
  return (holdingsValue.value / props.portfolio.currentValue) * 100
})

const winRate = computed(() => {
  const trades = props.portfolio.trades || []
  if (trades.length === 0) return 0
  const wins = trades.filter(t => t.type === 'sell' && t.pnl > 0).length
  const sells = trades.filter(t => t.type === 'sell').length
  return sells > 0 ? (wins / sells) * 100 : 0
})

const sortedTrades = computed(() => {
  return [...(props.portfolio.trades || [])].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

const filteredStocks = computed(() => {
  const search = tradeForm.value.symbolSearch.toLowerCase()
  if (!search) return sampleStocks.slice(0, 5)
  return sampleStocks.filter(s => 
    s.symbol.toLowerCase().includes(search) || 
    s.name.toLowerCase().includes(search)
  ).slice(0, 5)
})

const estimatedAmount = computed(() => {
  if (!tradeForm.value.selectedStock || !tradeForm.value.quantity) return 0
  return tradeForm.value.selectedStock.price * tradeForm.value.quantity
})

const canExecuteTrade = computed(() => {
  if (!tradeForm.value.selectedStock || tradeForm.value.quantity <= 0) return false
  
  if (tradeForm.value.type === 'buy') {
    return estimatedAmount.value <= props.portfolio.availableCash
  } else {
    const holding = props.portfolio.holdings?.find(h => h.symbol === tradeForm.value.selectedStock.symbol)
    return holding && holding.quantity >= tradeForm.value.quantity
  }
})

// 待执行订单列表（来自策略）
const pendingOrders = computed(() => {
  return (props.portfolio.orders || []).filter(o => ['pending', 'partial', 'filled'].includes(o.status))
    .sort((a, b) => {
      // pending 排在最前面
      if (a.status === 'pending' && b.status !== 'pending') return -1
      if (a.status !== 'pending' && b.status === 'pending') return 1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
})

// 订单状态样式
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

// 执行策略订单
const executeStrategyOrder = (order) => {
  const updatedPortfolio = { ...props.portfolio }
  const amount = order.quantity * order.price
  
  // 检查资金是否充足
  if (order.side === 'buy' && updatedPortfolio.availableCash < amount) {
    alert('可用资金不足')
    return
  }
  
  // 更新订单状态
  const orderIndex = updatedPortfolio.orders.findIndex(o => o.id === order.id)
  if (orderIndex !== -1) {
    updatedPortfolio.orders[orderIndex].status = 'filled'
    updatedPortfolio.orders[orderIndex].filledAt = new Date().toISOString()
    updatedPortfolio.orders[orderIndex].updatedAt = new Date().toISOString()
  }
  
  // 执行交易
  if (order.side === 'buy') {
    updatedPortfolio.availableCash -= amount
    
    const existingHolding = updatedPortfolio.holdings.find(h => h.symbol === order.symbol)
    if (existingHolding) {
      const totalCost = existingHolding.avgCost * existingHolding.quantity + amount
      existingHolding.quantity += order.quantity
      existingHolding.avgCost = totalCost / existingHolding.quantity
      existingHolding.marketValue = existingHolding.quantity * order.price
      existingHolding.pnl = existingHolding.marketValue - (existingHolding.avgCost * existingHolding.quantity)
      existingHolding.pnlPercent = (existingHolding.pnl / (existingHolding.avgCost * existingHolding.quantity)) * 100
    } else {
      updatedPortfolio.holdings.push({
        symbol: order.symbol,
        name: order.stockName || order.symbol,
        quantity: order.quantity,
        avgCost: order.price,
        currentPrice: order.price,
        marketValue: amount,
        pnl: 0,
        pnlPercent: 0
      })
    }
  } else {
    updatedPortfolio.availableCash += amount
    
    const holding = updatedPortfolio.holdings.find(h => h.symbol === order.symbol)
    if (holding) {
      holding.quantity -= order.quantity
      if (holding.quantity <= 0) {
        updatedPortfolio.holdings = updatedPortfolio.holdings.filter(h => h.symbol !== order.symbol)
      } else {
        holding.marketValue = holding.quantity * order.price
      }
    }
  }
  
  // 添加交易记录
  if (!updatedPortfolio.trades) updatedPortfolio.trades = []
  updatedPortfolio.trades.push({
    id: `trade_${Date.now()}`,
    type: order.side,
    symbol: order.symbol,
    name: order.stockName || order.symbol,
    quantity: order.quantity,
    price: order.price,
    amount: amount,
    timestamp: new Date().toISOString(),
    source: 'strategy_order',
    orderId: order.id
  })
  
  // 更新总资产
  const holdingsVal = updatedPortfolio.holdings.reduce((sum, h) => sum + h.marketValue, 0)
  updatedPortfolio.currentValue = updatedPortfolio.availableCash + holdingsVal
  updatedPortfolio.totalReturn = ((updatedPortfolio.currentValue - updatedPortfolio.initialCapital) / updatedPortfolio.initialCapital) * 100
  updatedPortfolio.updatedAt = new Date().toISOString()
  
  emit('update', updatedPortfolio)
}

// 取消订单
const cancelOrder = (order) => {
  if (!confirm('确定要取消此订单吗？')) return
  
  const updatedPortfolio = { ...props.portfolio }
  const orderIndex = updatedPortfolio.orders.findIndex(o => o.id === order.id)
  if (orderIndex !== -1) {
    updatedPortfolio.orders[orderIndex].status = 'cancelled'
    updatedPortfolio.orders[orderIndex].cancelledAt = new Date().toISOString()
    updatedPortfolio.orders[orderIndex].updatedAt = new Date().toISOString()
  }
  updatedPortfolio.updatedAt = new Date().toISOString()
  
  emit('update', updatedPortfolio)
}

// Format money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatMoneyFull = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

const formatDateTime = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Stock selection
const selectStock = (stock) => {
  tradeForm.value.selectedStock = stock
  tradeForm.value.symbolSearch = stock.symbol
  showStockDropdown.value = false
}

// Open sell modal with pre-selected stock
const openSellModal = (holding) => {
  const stock = sampleStocks.find(s => s.symbol === holding.symbol)
  if (stock) {
    tradeForm.value.type = 'sell'
    tradeForm.value.selectedStock = stock
    tradeForm.value.symbolSearch = stock.symbol
    tradeForm.value.quantity = holding.quantity
    showTradeModal.value = true
  }
}

// Close modal
const closeTradeModal = () => {
  showTradeModal.value = false
  tradeForm.value = { type: 'buy', symbolSearch: '', selectedStock: null, quantity: 10 }
  tradeError.value = ''
}

// Execute trade
const executeTrade = () => {
  if (!canExecuteTrade.value) {
    tradeError.value = tradeForm.value.type === 'buy' 
      ? t('portfolio.trade.insufficientCash') 
      : t('portfolio.trade.insufficientShares')
    return
  }

  const updatedPortfolio = { ...props.portfolio }
  const stock = tradeForm.value.selectedStock
  const quantity = tradeForm.value.quantity
  const price = stock.price
  const amount = quantity * price

  // Create trade record
  const trade = {
    id: `trade_${Date.now()}`,
    type: tradeForm.value.type,
    symbol: stock.symbol,
    name: stock.name,
    quantity,
    price,
    amount,
    timestamp: new Date().toISOString()
  }

  if (tradeForm.value.type === 'buy') {
    // Update cash
    updatedPortfolio.availableCash -= amount

    // Update or add holding
    const existingHolding = updatedPortfolio.holdings.find(h => h.symbol === stock.symbol)
    if (existingHolding) {
      const totalCost = existingHolding.avgCost * existingHolding.quantity + amount
      existingHolding.quantity += quantity
      existingHolding.avgCost = totalCost / existingHolding.quantity
      existingHolding.marketValue = existingHolding.quantity * price
      existingHolding.pnl = existingHolding.marketValue - (existingHolding.avgCost * existingHolding.quantity)
      existingHolding.pnlPercent = (existingHolding.pnl / (existingHolding.avgCost * existingHolding.quantity)) * 100
    } else {
      updatedPortfolio.holdings.push({
        symbol: stock.symbol,
        name: stock.name,
        quantity,
        avgCost: price,
        currentPrice: price,
        marketValue: amount,
        pnl: 0,
        pnlPercent: 0
      })
    }
  } else {
    // Sell
    updatedPortfolio.availableCash += amount

    const holding = updatedPortfolio.holdings.find(h => h.symbol === stock.symbol)
    if (holding) {
      trade.pnl = (price - holding.avgCost) * quantity
      
      holding.quantity -= quantity
      if (holding.quantity <= 0) {
        updatedPortfolio.holdings = updatedPortfolio.holdings.filter(h => h.symbol !== stock.symbol)
      } else {
        holding.marketValue = holding.quantity * price
        holding.pnl = holding.marketValue - (holding.avgCost * holding.quantity)
        holding.pnlPercent = (holding.pnl / (holding.avgCost * holding.quantity)) * 100
      }
    }
  }

  // Add trade to history
  updatedPortfolio.trades.push(trade)

  // Update current value and return
  const holdingsValue = updatedPortfolio.holdings.reduce((sum, h) => sum + h.marketValue, 0)
  updatedPortfolio.currentValue = updatedPortfolio.availableCash + holdingsValue
  updatedPortfolio.totalReturn = ((updatedPortfolio.currentValue - updatedPortfolio.initialCapital) / updatedPortfolio.initialCapital) * 100
  updatedPortfolio.updatedAt = new Date().toISOString()

  // Emit update
  emit('update', updatedPortfolio)
  closeTradeModal()
}

// Close dropdown when clicking outside
watch(showStockDropdown, (val) => {
  if (val) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showStockDropdown.value = false
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
