<template>
  <div class="space-y-6">
    <!-- 总资产概览卡片 -->
    <div 
      class="border rounded-xl p-6 relative overflow-hidden"
      :style="{ 
        backgroundColor: tokens.colors.background.surface, 
        borderColor: tokens.colors.border.default 
      }"
    >
      <!-- 背景装饰 -->
      <div 
        class="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none"
        :style="{ 
          background: `radial-gradient(circle, ${tokens.colors.accent.primary} 0%, transparent 70%)`
        }"
      ></div>
      
      <div class="relative">
        <!-- 标题行 -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: tokens.colors.accent.primaryBg }"
            >
              <svg class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
                {{ $t('portfolio.summary.totalAssets') }}
              </h2>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                {{ hasData ? `${totalAccounts} ${$t('portfolio.summary.accountsCount')}` : $t('portfolio.summary.noAccounts') }}
              </p>
            </div>
          </div>
          <button 
            v-if="hasData"
            @click="refreshAll"
            :disabled="isRefreshing"
            class="p-2 rounded-lg border transition-colors"
            :class="isRefreshing ? 'opacity-50' : (isDark ? 'hover:bg-white/5' : 'hover:bg-black/5')"
            :style="{ borderColor: tokens.colors.border.default }"
          >
            <svg 
              class="w-4 h-4" 
              :class="isRefreshing ? 'animate-spin' : ''"
              :style="{ color: tokens.colors.text.muted }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <!-- 总资产数值 -->
        <div class="text-center py-4">
          <div 
            class="text-4xl md:text-5xl font-bold mb-2"
            :style="{ color: tokens.colors.text.primary }"
          >
            {{ formatMoney(summary.totalAssets) }}
          </div>
          <div 
            class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            :class="summary.totalDailyPnl >= 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'"
          >
            <svg v-if="summary.totalDailyPnl >= 0" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span>{{ summary.totalDailyPnl >= 0 ? '+' : '' }}{{ formatMoney(summary.totalDailyPnl) }}</span>
            <span class="opacity-70">({{ summary.totalDailyPnl >= 0 ? '+' : '' }}{{ dailyPnlPercent.toFixed(2) }}%)</span>
            <span :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.today') }}</span>
          </div>
        </div>

        <!-- 四个统计指标 -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div 
            class="p-4 rounded-lg text-center"
            :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
          >
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.realAccounts') }}</p>
            <p class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(summary.realAssets) }}</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">{{ brokerAccounts.length }} {{ $t('portfolio.summary.accounts') }}</p>
          </div>
          <div 
            class="p-4 rounded-lg text-center"
            :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
          >
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.simAccounts') }}</p>
            <p class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(summary.simAssets) }}</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">{{ paperPortfolios.length }} {{ $t('portfolio.summary.portfolios') }}</p>
          </div>
          <div 
            class="p-4 rounded-lg text-center"
            :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
          >
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.totalCash') }}</p>
            <p class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(summary.totalCash) }}</p>
            <p class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">{{ cashPercent.toFixed(1) }}% {{ $t('portfolio.summary.ofTotal') }}</p>
          </div>
          <div 
            class="p-4 rounded-lg text-center"
            :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }"
          >
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.totalPnl') }}</p>
            <p 
              class="text-xl font-bold"
              :class="summary.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'"
            >
              {{ summary.totalPnl >= 0 ? '+' : '' }}{{ formatMoney(summary.totalPnl) }}
            </p>
            <p 
              class="text-xs mt-1"
              :class="summary.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'"
            >
              {{ summary.totalPnl >= 0 ? '+' : '' }}{{ totalPnlPercent.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 两列布局：账户分布 + 板块分布 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 账户资产分布 -->
      <div 
        class="border rounded-xl p-5"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <h3 class="font-bold mb-4 flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          {{ $t('portfolio.summary.accountDistribution') }}
        </h3>
        
        <div v-if="accountDistribution.length > 0" class="space-y-3">
          <div 
            v-for="(item, index) in accountDistribution" 
            :key="item.id"
            class="flex items-center gap-3"
          >
            <div 
              class="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
              :style="{ backgroundColor: item.color }"
            >
              {{ item.shortName?.slice(0, 2) || item.name.slice(0, 2) }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium truncate" :style="{ color: tokens.colors.text.primary }">
                  {{ item.name }}
                </span>
                <span class="text-sm font-bold ml-2" :style="{ color: tokens.colors.text.primary }">
                  {{ formatMoney(item.value) }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <div 
                  class="flex-1 h-2 rounded-full overflow-hidden"
                  :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }"
                >
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :style="{ width: `${item.percent}%`, backgroundColor: item.color }"
                  ></div>
                </div>
                <span class="text-xs font-medium w-10 text-right" :style="{ color: tokens.colors.text.muted }">
                  {{ item.percent.toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="py-8 text-center">
          <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          </svg>
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.noData') }}</p>
        </div>
      </div>

      <!-- 持仓板块分布 -->
      <div 
        class="border rounded-xl p-5"
        :style="{ 
          backgroundColor: tokens.colors.background.surface, 
          borderColor: tokens.colors.border.default 
        }"
      >
        <h3 class="font-bold mb-4 flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          {{ $t('portfolio.summary.sectorDistribution') }}
        </h3>
        
        <div v-if="sectorDistribution.length > 0" class="space-y-3">
          <div 
            v-for="sector in sectorDistribution" 
            :key="sector.name"
            class="flex items-center gap-3"
          >
            <div 
              class="w-3 h-3 rounded-full shrink-0"
              :style="{ backgroundColor: sector.color }"
            ></div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">
                  {{ sector.name }}
                </span>
                <span class="text-sm font-medium ml-2" :style="{ color: tokens.colors.text.primary }">
                  {{ formatMoney(sector.value) }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <div 
                  class="flex-1 h-1.5 rounded-full overflow-hidden"
                  :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }"
                >
                  <div 
                    class="h-full rounded-full transition-all duration-500"
                    :style="{ width: `${sector.percent}%`, backgroundColor: sector.color }"
                  ></div>
                </div>
                <span class="text-xs w-10 text-right" :style="{ color: tokens.colors.text.muted }">
                  {{ sector.percent.toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div v-else class="py-8 text-center">
          <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.noHoldings') }}</p>
        </div>
      </div>
    </div>

    <!-- 各账户概览卡片 -->
    <div 
      class="border rounded-xl p-5"
      :style="{ 
        backgroundColor: tokens.colors.background.surface, 
        borderColor: tokens.colors.border.default 
      }"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {{ $t('portfolio.summary.accountOverview') }}
        </h3>
        <button 
          @click="$emit('switchTab', 'broker')"
          class="text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          :style="{ 
            backgroundColor: tokens.colors.accent.primaryBg, 
            color: tokens.colors.accent.primary 
          }"
        >
          {{ $t('portfolio.summary.addAccount') }}
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <!-- 账户卡片网格 -->
      <div v-if="allAccounts.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="account in allAccounts" 
          :key="account.id"
          @click="goToAccount(account)"
          class="p-4 rounded-lg border cursor-pointer transition-all group"
          :class="isDark ? 'hover:border-white/30 hover:bg-white/5' : 'hover:border-black/20 hover:bg-black/2'"
          :style="{ borderColor: tokens.colors.border.default }"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <div 
                class="w-8 h-8 rounded-md flex items-center justify-center text-white text-xs font-bold"
                :style="{ backgroundColor: account.color }"
              >
                {{ account.shortName?.slice(0, 2) || account.name.slice(0, 2) }}
              </div>
              <div>
                <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">
                  {{ account.name }}
                </p>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
                  {{ account.type === 'real' ? account.accountNumber : $t('portfolio.summary.simPortfolio') }}
                </p>
              </div>
            </div>
            <span 
              class="text-xs px-2 py-0.5 rounded-full"
              :class="account.type === 'real' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'"
            >
              {{ account.type === 'real' ? $t('portfolio.summary.typeReal') : $t('portfolio.summary.typeSim') }}
            </span>
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.assets') }}</span>
              <span class="font-bold" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(account.totalAssets) }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.dailyPnl') }}</span>
              <span 
                class="font-medium text-sm"
                :class="(account.dailyPnl || 0) >= 0 ? 'text-green-500' : 'text-red-500'"
              >
                {{ (account.dailyPnl || 0) >= 0 ? '+' : '' }}{{ formatMoney(account.dailyPnl || 0) }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.holdings') }}</span>
              <span class="text-sm" :style="{ color: tokens.colors.text.secondary }">{{ account.holdingsCount }} {{ $t('portfolio.summary.stocks') }}</span>
            </div>
          </div>
          
          <div 
            class="mt-3 pt-3 border-t flex items-center justify-between"
            :style="{ borderColor: tokens.colors.border.subtle }"
          >
            <span class="text-xs" :style="{ color: tokens.colors.text.muted }">
              {{ $t('portfolio.summary.viewDetails') }}
            </span>
            <svg 
              class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              :style="{ color: tokens.colors.text.muted }"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="py-12 text-center">
        <div 
          class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
          :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }"
        >
          <svg class="w-8 h-8 opacity-40" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h4 class="font-medium mb-2" :style="{ color: tokens.colors.text.primary }">{{ $t('portfolio.summary.emptyTitle') }}</h4>
        <p class="text-sm mb-4" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.emptyDesc') }}</p>
        <div class="flex items-center justify-center gap-3">
          <button 
            @click="$emit('switchTab', 'broker')"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {{ $t('portfolio.summary.connectBroker') }}
          </button>
          <button 
            @click="$emit('switchTab', 'simulation')"
            class="px-4 py-2 border text-sm font-medium rounded-lg transition-colors"
            :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
            :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
          >
            {{ $t('portfolio.summary.createSim') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 合并持仓列表 -->
    <div 
      class="border rounded-xl overflow-hidden"
      :style="{ 
        backgroundColor: tokens.colors.background.surface, 
        borderColor: tokens.colors.border.default 
      }"
    >
      <div class="px-5 py-4 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default }">
        <h3 class="font-bold flex items-center gap-2" :style="{ color: tokens.colors.text.primary }">
          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {{ $t('portfolio.summary.mergedHoldings') }} ({{ mergedHoldings.length }})
        </h3>
        <span class="text-xs" :style="{ color: tokens.colors.text.muted }">
          {{ $t('portfolio.summary.crossAccountMerged') }}
        </span>
      </div>
      
      <div v-if="mergedHoldings.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }">
              <th class="px-5 py-3 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.stock') }}
              </th>
              <th class="px-5 py-3 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.totalQty') }}
              </th>
              <th class="px-5 py-3 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.marketValue') }}
              </th>
              <th class="px-5 py-3 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.pnl') }}
              </th>
              <th class="px-5 py-3 text-right text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.weight') }}
              </th>
              <th class="px-5 py-3 text-left text-xs font-medium uppercase" :style="{ color: tokens.colors.text.muted }">
                {{ $t('portfolio.summary.sources') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y" :style="{ borderColor: tokens.colors.border.subtle }">
            <tr 
              v-for="holding in mergedHoldings" 
              :key="holding.symbol"
              class="transition-colors"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/2'"
            >
              <td class="px-5 py-3">
                <div class="flex items-center gap-2">
                  <div 
                    class="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
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
              <td class="px-5 py-3 text-right text-sm" :style="{ color: tokens.colors.text.secondary }">
                {{ holding.totalQuantity.toLocaleString() }}
              </td>
              <td class="px-5 py-3 text-right">
                <p class="font-medium text-sm" :style="{ color: tokens.colors.text.primary }">{{ formatMoney(holding.totalMarketValue) }}</p>
                <p class="text-xs" :style="{ color: tokens.colors.text.muted }">@{{ formatMoney(holding.currentPrice) }}</p>
              </td>
              <td class="px-5 py-3 text-right">
                <p 
                  class="font-medium text-sm"
                  :class="holding.totalPnl >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ holding.totalPnl >= 0 ? '+' : '' }}{{ formatMoney(holding.totalPnl) }}
                </p>
                <p 
                  class="text-xs"
                  :class="holding.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'"
                >
                  {{ holding.pnlPercent >= 0 ? '+' : '' }}{{ holding.pnlPercent.toFixed(2) }}%
                </p>
              </td>
              <td class="px-5 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <div 
                    class="w-16 h-1.5 rounded-full overflow-hidden"
                    :style="{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }"
                  >
                    <div 
                      class="h-full rounded-full bg-cyan-500"
                      :style="{ width: `${holding.weight}%` }"
                    ></div>
                  </div>
                  <span class="text-xs font-medium w-10" :style="{ color: tokens.colors.text.secondary }">
                    {{ holding.weight.toFixed(1) }}%
                  </span>
                </div>
              </td>
              <td class="px-5 py-3">
                <div class="flex flex-wrap gap-1">
                  <span 
                    v-for="source in holding.sources" 
                    :key="source.name"
                    class="px-2 py-0.5 rounded text-xs font-medium"
                    :style="{ 
                      backgroundColor: source.color + '20',
                      color: source.color
                    }"
                  >
                    {{ source.shortName }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="py-12 text-center">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-30" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p class="text-sm" :style="{ color: tokens.colors.text.muted }">{{ $t('portfolio.summary.noHoldings') }}</p>
      </div>
    </div>

    <!-- 风险提示 -->
    <div 
      v-if="riskAlerts.length > 0"
      class="border rounded-xl p-5"
      :style="{ 
        backgroundColor: isDark ? 'rgba(245, 158, 11, 0.05)' : 'rgba(245, 158, 11, 0.03)', 
        borderColor: 'rgba(245, 158, 11, 0.3)' 
      }"
    >
      <h3 class="font-bold mb-3 flex items-center gap-2 text-amber-500">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {{ $t('portfolio.summary.riskAlerts') }}
      </h3>
      <div class="space-y-2">
        <div 
          v-for="(alert, index) in riskAlerts" 
          :key="index"
          class="flex items-start gap-2 text-sm"
          :style="{ color: tokens.colors.text.secondary }"
        >
          <span class="text-amber-500">•</span>
          <span>{{ alert }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '../../composables/useTheme'
import { useBrokerAccount } from '../../composables/useBrokerAccount'

const { t } = useI18n()
const { tokens, isDark } = useTheme()

const emit = defineEmits(['switchTab', 'selectAccount'])

const {
  brokerAccounts,
  loadAccounts,
  refreshAccount,
  formatMoney
} = useBrokerAccount()

// 模拟账户数据
const paperPortfolios = ref([])

// 加载数据
onMounted(() => {
  loadAccounts()
  loadPaperPortfolios()
})

const loadPaperPortfolios = () => {
  try {
    const stored = localStorage.getItem('paper_portfolios')
    if (stored) {
      paperPortfolios.value = JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load paper portfolios:', error)
  }
}

// 刷新状态
const isRefreshing = ref(false)

const refreshAll = async () => {
  isRefreshing.value = true
  for (const account of brokerAccounts.value) {
    await refreshAccount(account.id)
  }
  isRefreshing.value = false
}

// 计算属性：是否有数据
const hasData = computed(() => {
  return brokerAccounts.value.length > 0 || paperPortfolios.value.length > 0
})

// 总账户数
const totalAccounts = computed(() => {
  return brokerAccounts.value.length + paperPortfolios.value.length
})

// 汇总数据
const summary = computed(() => {
  let realAssets = 0
  let realCash = 0
  let realPnl = 0
  let realDailyPnl = 0
  
  brokerAccounts.value.forEach(acc => {
    realAssets += acc.totalAssets || 0
    realCash += acc.balance || 0
    realPnl += acc.totalPnl || 0
    realDailyPnl += acc.dailyPnl || 0
  })
  
  let simAssets = 0
  let simCash = 0
  let simPnl = 0
  
  paperPortfolios.value.forEach(p => {
    simAssets += p.currentValue || 0
    simCash += p.availableCash || 0
    simPnl += (p.currentValue - p.initialCapital) || 0
  })
  
  return {
    totalAssets: realAssets + simAssets,
    realAssets,
    simAssets,
    totalCash: realCash + simCash,
    totalPnl: realPnl + simPnl,
    totalDailyPnl: realDailyPnl
  }
})

// 日盈亏百分比
const dailyPnlPercent = computed(() => {
  if (summary.value.totalAssets === 0) return 0
  const prevAssets = summary.value.totalAssets - summary.value.totalDailyPnl
  if (prevAssets === 0) return 0
  return (summary.value.totalDailyPnl / prevAssets) * 100
})

// 总盈亏百分比
const totalPnlPercent = computed(() => {
  const totalCost = summary.value.totalAssets - summary.value.totalPnl
  if (totalCost === 0) return 0
  return (summary.value.totalPnl / totalCost) * 100
})

// 现金占比
const cashPercent = computed(() => {
  if (summary.value.totalAssets === 0) return 0
  return (summary.value.totalCash / summary.value.totalAssets) * 100
})

// 账户资产分布
const accountDistribution = computed(() => {
  const items = []
  
  brokerAccounts.value.forEach(acc => {
    items.push({
      id: acc.id,
      name: acc.broker?.shortName || acc.broker?.name || 'Unknown',
      shortName: acc.broker?.shortName,
      value: acc.totalAssets || 0,
      color: acc.broker?.color || '#3b82f6',
      type: 'real'
    })
  })
  
  paperPortfolios.value.forEach(p => {
    items.push({
      id: p.id,
      name: p.name,
      shortName: p.name.slice(0, 4),
      value: p.currentValue || 0,
      color: '#8b5cf6',
      type: 'sim'
    })
  })
  
  const total = summary.value.totalAssets
  return items
    .map(item => ({
      ...item,
      percent: total > 0 ? (item.value / total) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value)
})

// 板块分布
const sectorDistribution = computed(() => {
  const sectorMap = {}
  const sectorColors = {
    'Technology': '#06b6d4',
    'Finance': '#3b82f6',
    'Healthcare': '#10b981',
    'Consumer': '#f59e0b',
    'Energy': '#ef4444',
    'Other': '#6b7280'
  }
  
  // 从实盘账户收集持仓
  brokerAccounts.value.forEach(acc => {
    (acc.holdings || []).forEach(h => {
      const sector = h.sector || 'Other'
      if (!sectorMap[sector]) {
        sectorMap[sector] = { name: sector, value: 0, color: sectorColors[sector] || '#6b7280' }
      }
      sectorMap[sector].value += h.marketValue || 0
    })
  })
  
  // 从模拟账户收集持仓
  paperPortfolios.value.forEach(p => {
    (p.holdings || []).forEach(h => {
      const sector = h.sector || 'Other'
      if (!sectorMap[sector]) {
        sectorMap[sector] = { name: sector, value: 0, color: sectorColors[sector] || '#6b7280' }
      }
      sectorMap[sector].value += h.marketValue || 0
    })
  })
  
  const totalMarketValue = Object.values(sectorMap).reduce((sum, s) => sum + s.value, 0)
  
  return Object.values(sectorMap)
    .map(s => ({
      ...s,
      percent: totalMarketValue > 0 ? (s.value / totalMarketValue) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value)
})

// 所有账户列表
const allAccounts = computed(() => {
  const accounts = []
  
  brokerAccounts.value.forEach(acc => {
    accounts.push({
      id: acc.id,
      name: acc.broker?.shortName || acc.broker?.name || 'Unknown',
      shortName: acc.broker?.shortName,
      accountNumber: acc.accountNumber ? `****${acc.accountNumber.slice(-4)}` : '****',
      totalAssets: acc.totalAssets || 0,
      dailyPnl: acc.dailyPnl || 0,
      holdingsCount: acc.holdings?.length || 0,
      color: acc.broker?.color || '#3b82f6',
      type: 'real'
    })
  })
  
  paperPortfolios.value.forEach(p => {
    accounts.push({
      id: p.id,
      name: p.name,
      shortName: p.name.slice(0, 4),
      totalAssets: p.currentValue || 0,
      dailyPnl: p.dailyReturn ? (p.currentValue * p.dailyReturn / 100) : 0,
      holdingsCount: p.holdings?.length || 0,
      color: '#8b5cf6',
      type: 'sim'
    })
  })
  
  return accounts.sort((a, b) => b.totalAssets - a.totalAssets)
})

// 合并持仓列表
const mergedHoldings = computed(() => {
  const holdingMap = {}
  
  // 从实盘账户收集持仓
  brokerAccounts.value.forEach(acc => {
    const sourceName = acc.broker?.shortName || acc.broker?.name || 'Unknown'
    const sourceColor = acc.broker?.color || '#3b82f6'
    
    ;(acc.holdings || []).forEach(h => {
      if (!holdingMap[h.symbol]) {
        holdingMap[h.symbol] = {
          symbol: h.symbol,
          name: h.name,
          sector: h.sector,
          currentPrice: h.currentPrice,
          totalQuantity: 0,
          totalMarketValue: 0,
          totalCostBasis: 0,
          totalPnl: 0,
          sources: []
        }
      }
      holdingMap[h.symbol].totalQuantity += h.quantity
      holdingMap[h.symbol].totalMarketValue += h.marketValue
      holdingMap[h.symbol].totalCostBasis += h.costBasis
      holdingMap[h.symbol].totalPnl += h.pnl
      holdingMap[h.symbol].currentPrice = h.currentPrice
      
      if (!holdingMap[h.symbol].sources.find(s => s.name === sourceName)) {
        holdingMap[h.symbol].sources.push({ name: sourceName, shortName: sourceName.slice(0, 4), color: sourceColor })
      }
    })
  })
  
  // 从模拟账户收集持仓
  paperPortfolios.value.forEach(p => {
    const sourceName = p.name
    const sourceColor = '#8b5cf6'
    
    ;(p.holdings || []).forEach(h => {
      if (!holdingMap[h.symbol]) {
        holdingMap[h.symbol] = {
          symbol: h.symbol,
          name: h.name,
          sector: h.sector,
          currentPrice: h.currentPrice,
          totalQuantity: 0,
          totalMarketValue: 0,
          totalCostBasis: 0,
          totalPnl: 0,
          sources: []
        }
      }
      holdingMap[h.symbol].totalQuantity += h.quantity
      holdingMap[h.symbol].totalMarketValue += h.marketValue
      holdingMap[h.symbol].totalCostBasis += h.costBasis || (h.quantity * h.avgCost)
      holdingMap[h.symbol].totalPnl += h.pnl
      holdingMap[h.symbol].currentPrice = h.currentPrice
      
      if (!holdingMap[h.symbol].sources.find(s => s.name === sourceName)) {
        holdingMap[h.symbol].sources.push({ name: sourceName, shortName: sourceName.slice(0, 4), color: sourceColor })
      }
    })
  })
  
  const totalMarketValue = Object.values(holdingMap).reduce((sum, h) => sum + h.totalMarketValue, 0)
  
  return Object.values(holdingMap)
    .map(h => ({
      ...h,
      pnlPercent: h.totalCostBasis > 0 ? (h.totalPnl / h.totalCostBasis) * 100 : 0,
      weight: totalMarketValue > 0 ? (h.totalMarketValue / totalMarketValue) * 100 : 0
    }))
    .sort((a, b) => b.totalMarketValue - a.totalMarketValue)
})

// 风险提示
const riskAlerts = computed(() => {
  const alerts = []
  
  // 检查板块集中度
  const topSector = sectorDistribution.value[0]
  if (topSector && topSector.percent > 40) {
    alerts.push(t('portfolio.summary.riskSectorConcentration', { sector: topSector.name, percent: topSector.percent.toFixed(0) }))
  }
  
  // 检查单只股票集中度
  const topHolding = mergedHoldings.value[0]
  if (topHolding && topHolding.weight > 20) {
    alerts.push(t('portfolio.summary.riskStockConcentration', { stock: topHolding.symbol, percent: topHolding.weight.toFixed(0) }))
  }
  
  // 检查仓位
  const positionPercent = summary.value.totalAssets > 0 
    ? ((summary.value.totalAssets - summary.value.totalCash) / summary.value.totalAssets) * 100 
    : 0
  if (positionPercent > 80) {
    alerts.push(t('portfolio.summary.riskHighPosition', { percent: positionPercent.toFixed(0) }))
  }
  
  return alerts
})

// 跳转到账户详情
const goToAccount = (account) => {
  if (account.type === 'real') {
    emit('switchTab', 'broker')
    // 可以通过事件通知父组件选中特定账户
    emit('selectAccount', account.id)
  } else {
    emit('switchTab', 'simulation')
  }
}
</script>

<style scoped>
/* 自定义动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}
</style>
