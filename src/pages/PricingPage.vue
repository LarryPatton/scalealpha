<template>
  <div class="pricing-page min-h-screen" :class="themeClasses.pageBg">
    <!-- 页面头部 -->
    <div class="max-w-screen-3xl mx-auto px-12 pt-16 pb-8">
      <div class="text-center mb-8">
        <h1 class="text-xl font-bold mb-2" :class="themeClasses.textPrimary">
          选择适合您的方案
        </h1>
        <p class="text-sm" :class="themeClasses.textMuted">
          解锁更多投资机会，让数据驱动您的决策
        </p>
      </div>

      <!-- 计费周期切换 -->
      <div class="flex justify-center items-center gap-3 mb-12">
        <span 
          class="text-sm cursor-pointer transition-colors select-none"
          :class="billingCycle === 'monthly' ? themeClasses.textPrimary : themeClasses.textMuted"
          @click="setBillingCycle('monthly')"
        >
          月付
        </span>
        
        <button
          class="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
          :class="billingCycle === 'yearly' ? 'bg-cyan-500' : themeClasses.toggleBg"
          @click="setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')"
        >
          <span
            class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200"
            :class="billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'"
          ></span>
        </button>
        
        <div class="flex items-center gap-1.5">
          <span 
            class="text-sm cursor-pointer transition-colors select-none"
            :class="billingCycle === 'yearly' ? themeClasses.textPrimary : themeClasses.textMuted"
            @click="setBillingCycle('yearly')"
          >
            年付
          </span>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-medium">
            省{{ yearlyDiscount }}%
          </span>
        </div>
      </div>

      <!-- 当前积分余额显示 -->
      <div class="flex justify-center mb-8">
        <div 
          class="inline-flex items-center gap-2 px-4 py-2 rounded-sm border"
          :class="[themeClasses.cardBg, themeClasses.cardBorder]"
        >
          <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"/>
          </svg>
          <span class="text-sm" :class="themeClasses.textSecondary">当前积分余额：</span>
          <span class="text-sm font-bold" :class="themeClasses.textPrimary">{{ creditsBalance }}</span>
        </div>
      </div>

      <!-- 套餐卡片区域 -->
      <div class="flex justify-center gap-6 mb-16">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="pricing-card w-[280px] p-6 border transition-all duration-200 relative"
          :class="[
            themeClasses.cardBg,
            plan.isPopular ? themeClasses.cardBorderHighlight : themeClasses.cardBorder,
            plan.isPopular ? themeClasses.cardGlow : '',
            plan.isCurrent ? 'ring-2 ring-emerald-500/50' : ''
          ]"
        >
          <!-- 当前套餐标识 -->
          <div v-if="plan.isCurrent" class="absolute -top-3 left-1/2 -translate-x-1/2">
            <span class="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded-sm">
              当前套餐
            </span>
          </div>

          <!-- 推荐标签 -->
          <div v-if="plan.isPopular && !plan.isCurrent" class="mb-4">
            <span
              class="inline-block px-2 py-1 text-[10px] font-bold tracking-wider uppercase rounded"
              :class="themeClasses.popularBadge"
            >
              POPULAR
            </span>
          </div>

          <!-- 套餐名称 -->
          <h2 class="text-base font-bold mb-4" :class="[themeClasses.textPrimary, plan.isPopular || plan.isCurrent ? '' : 'mt-6']">
            {{ plan.name }}
          </h2>

          <!-- 价格 -->
          <div class="mb-2">
            <span class="text-[32px] font-bold" :class="themeClasses.textPrimary">
              ${{ plan.displayPrice }}
            </span>
            <span class="text-xs ml-1" :class="themeClasses.textMuted">
              美元/{{ billingCycle === 'yearly' ? '年' : '月' }}
            </span>
          </div>

          <!-- 年付节省金额 -->
          <div v-if="billingCycle === 'yearly' && plan.yearlySavings > 0" class="mb-2">
            <span class="text-xs text-emerald-500">
              每年节省 ${{ plan.yearlySavings }}
            </span>
          </div>

          <!-- 积分 -->
          <p class="text-xs mb-6" :class="themeClasses.textTertiary">
            获取积分：{{ plan.credits }}{{ plan.credits > 0 ? '/月' : '' }}
          </p>

          <!-- CTA 按钮 -->
          <button
            class="w-full h-10 rounded-sm text-sm font-bold transition-all duration-200 mb-6 flex items-center justify-center gap-2"
            :class="getButtonClass(plan)"
            :disabled="plan.isCurrent || isUpgrading"
            @click="handlePlanAction(plan)"
          >
            <svg v-if="isUpgrading && selectedPlan?.id === plan.id" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ getButtonText(plan) }}</span>
          </button>

          <!-- 特性列表 -->
          <ul class="space-y-3">
            <li
              v-for="(feature, idx) in plan.features"
              :key="idx"
              class="flex items-start gap-2 text-sm"
              :class="themeClasses.textSecondary"
            >
              <svg
                class="w-4 h-4 mt-0.5 flex-shrink-0"
                :class="themeClasses.checkIcon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 功能对比表格 -->
      <div class="max-w-[1200px] mx-auto">
        <h2 class="text-base font-bold mb-6 text-center" :class="themeClasses.textPrimary">
          相当于X次的互动
        </h2>

        <div class="border overflow-hidden" :class="themeClasses.cardBorder">
          <table class="w-full">
            <thead>
              <tr :class="themeClasses.tableHeader">
                <th class="text-left px-4 py-3 text-xs font-bold" :class="themeClasses.textSecondary">
                  功能
                </th>
                <th
                  v-for="plan in plans"
                  :key="plan.id"
                  class="text-center px-4 py-3 text-xs font-bold"
                  :class="[
                    themeClasses.textSecondary,
                    plan.isPopular ? themeClasses.tableHighlightCol : '',
                    plan.isCurrent ? 'bg-emerald-500/5' : ''
                  ]"
                >
                  {{ plan.name }}
                  <span v-if="plan.isCurrent" class="ml-1 text-emerald-500">✓</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, idx) in comparisonData"
                :key="row.feature"
                :class="idx % 2 === 0 ? themeClasses.tableRowEven : themeClasses.tableRowOdd"
              >
                <td class="px-4 py-4 text-sm" :class="themeClasses.textSecondary">
                  {{ row.feature }}
                </td>
                <td
                  v-for="plan in plans"
                  :key="plan.id"
                  class="text-center px-4 py-4 text-sm"
                  :class="[
                    themeClasses.textTertiary,
                    plan.isPopular ? themeClasses.tableHighlightCol : '',
                    plan.isCurrent ? 'bg-emerald-500/5' : ''
                  ]"
                >
                  {{ row[plan.id] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 重置按钮（测试用） -->
      <div class="flex justify-center mt-8">
        <button
          class="text-xs px-3 py-1.5 rounded-sm transition-colors"
          :class="themeClasses.resetBtn"
          @click="handleReset"
        >
          重置为免费套餐（测试用）
        </button>
      </div>
    </div>

    <!-- 升级确认弹窗 -->
    <Teleport to="body">
      <div
        v-if="showUpgradeModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- 遮罩层 -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="closeModal"
        ></div>
        
        <!-- 弹窗内容 -->
        <div 
          class="relative w-full max-w-md mx-4 p-6 border"
          :class="[themeClasses.cardBg, themeClasses.cardBorder]"
        >
          <!-- 关闭按钮 -->
          <button
            class="absolute top-4 right-4 p-1 rounded-sm transition-colors"
            :class="themeClasses.closeBtn"
            @click="closeModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 标题 -->
          <h3 class="text-lg font-bold mb-4" :class="themeClasses.textPrimary">
            {{ modalAction === 'upgrade' ? '确认升级' : '确认降级' }}
          </h3>

          <!-- 套餐信息 -->
          <div v-if="selectedPlan" class="mb-6">
            <div class="flex items-center justify-between mb-4 pb-4 border-b" :class="themeClasses.cardBorder">
              <div>
                <p class="text-sm" :class="themeClasses.textMuted">目标套餐</p>
                <p class="text-lg font-bold" :class="themeClasses.textPrimary">{{ selectedPlan.name }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm" :class="themeClasses.textMuted">价格</p>
                <p class="text-lg font-bold" :class="themeClasses.textPrimary">
                  ${{ selectedPlan.displayPrice }}/{{ billingCycle === 'yearly' ? '年' : '月' }}
                </p>
              </div>
            </div>

            <!-- 特性预览 -->
            <div class="mb-4">
              <p class="text-sm font-bold mb-2" :class="themeClasses.textSecondary">包含功能：</p>
              <ul class="space-y-2">
                <li
                  v-for="(feature, idx) in selectedPlan.features.slice(0, 3)"
                  :key="idx"
                  class="flex items-center gap-2 text-sm"
                  :class="themeClasses.textTertiary"
                >
                  <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
              <p v-if="selectedPlan.features.length > 3" class="text-xs mt-2" :class="themeClasses.textMuted">
                还有 {{ selectedPlan.features.length - 3 }} 项更多功能...
              </p>
            </div>

            <!-- 积分信息 -->
            <div v-if="selectedPlan.credits > 0" class="p-3 rounded-sm" :class="themeClasses.infoBg">
              <p class="text-sm" :class="themeClasses.textSecondary">
                升级后将立即获得 <span class="font-bold text-amber-500">{{ selectedPlan.credits }}</span> 积分
              </p>
            </div>
          </div>

          <!-- 错误提示 -->
          <div v-if="upgradeError" class="mb-4 p-3 rounded-sm bg-rose-500/10 border border-rose-500/30">
            <p class="text-sm text-rose-500">{{ upgradeError }}</p>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-3">
            <button
              class="flex-1 h-10 rounded-sm text-sm font-bold transition-colors"
              :class="themeClasses.btnSecondary"
              :disabled="isUpgrading"
              @click="closeModal"
            >
              取消
            </button>
            <button
              class="flex-1 h-10 rounded-sm text-sm font-bold transition-colors flex items-center justify-center gap-2"
              :class="themeClasses.btnPrimary"
              :disabled="isUpgrading"
              @click="confirmUpgrade"
            >
              <svg v-if="isUpgrading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isUpgrading ? '处理中...' : '确认' + (modalAction === 'upgrade' ? '升级' : '降级') }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 成功提示 Toast -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-y-4 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform translate-y-4 opacity-0"
      >
        <div
          v-if="showSuccessToast"
          class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-sm shadow-lg flex items-center gap-3"
          :class="themeClasses.successToast"
        >
          <svg class="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm font-medium" :class="themeClasses.textPrimary">{{ successMessage }}</span>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useSubscription } from '@/composables/useSubscription'

const { isDark } = useTheme()
const { 
  plans, 
  comparisonData, 
  billingCycle, 
  creditsBalance,
  isUpgrading, 
  upgradeError,
  yearlyDiscount,
  setBillingCycle,
  canUpgrade,
  canDowngrade,
  upgradeToPlan,
  resetToFree
} = useSubscription()

// 弹窗状态
const showUpgradeModal = ref(false)
const selectedPlan = ref(null)
const modalAction = ref('upgrade') // 'upgrade' | 'downgrade'

// 成功提示
const showSuccessToast = ref(false)
const successMessage = ref('')

// 获取按钮文字
function getButtonText(plan) {
  if (plan.isCurrent) return '您当前的套餐'
  if (isUpgrading.value && selectedPlan.value?.id === plan.id) return '处理中...'
  if (canUpgrade(plan.id)) return `升级到${plan.name}`
  if (canDowngrade(plan.id)) return `降级到${plan.name}`
  return plan.name
}

// 获取按钮样式
function getButtonClass(plan) {
  if (plan.isCurrent) {
    return themeClasses.value.btnDisabled
  }
  if (canDowngrade(plan.id)) {
    return themeClasses.value.btnSecondary
  }
  return themeClasses.value.btnPrimary
}

// 处理套餐操作
function handlePlanAction(plan) {
  if (plan.isCurrent) return
  
  selectedPlan.value = plan
  modalAction.value = canUpgrade(plan.id) ? 'upgrade' : 'downgrade'
  showUpgradeModal.value = true
}

// 关闭弹窗
function closeModal() {
  if (isUpgrading.value) return
  showUpgradeModal.value = false
  selectedPlan.value = null
}

// 确认升级/降级
async function confirmUpgrade() {
  if (!selectedPlan.value) return
  
  try {
    const result = await upgradeToPlan(selectedPlan.value.id)
    showUpgradeModal.value = false
    
    // 显示成功提示
    successMessage.value = result.message
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)
  } catch (error) {
    // 错误已在 upgradeError 中显示
    console.error('Upgrade failed:', error)
  }
}

// 重置套餐
function handleReset() {
  resetToFree()
  successMessage.value = '已重置为免费套餐'
  showSuccessToast.value = true
  setTimeout(() => {
    showSuccessToast.value = false
  }, 2000)
}

// 主题样式类
const themeClasses = computed(() => {
  if (isDark.value) {
    return {
      // 页面
      pageBg: 'bg-[#050505]',
      // 文字
      textPrimary: 'text-white',
      textSecondary: 'text-gray-300',
      textTertiary: 'text-gray-400',
      textMuted: 'text-gray-500',
      // 卡片
      cardBg: 'bg-[#0a0a0a]',
      cardBorder: 'border-[#222222]',
      cardBorderHighlight: 'border-cyan-500',
      cardGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
      // 按钮
      btnPrimary: 'bg-cyan-500 text-black hover:bg-cyan-400',
      btnSecondary: 'bg-transparent border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white',
      btnDisabled: 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed',
      // 切换开关
      toggleBg: 'bg-gray-700',
      // 徽章
      popularBadge: 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/30',
      // 图标
      checkIcon: 'text-emerald-500',
      // 表格
      tableHeader: 'bg-[#111111]',
      tableRowEven: 'bg-[#0a0a0a]',
      tableRowOdd: 'bg-[#111111]',
      tableHighlightCol: 'bg-cyan-500/5',
      // 弹窗
      closeBtn: 'text-gray-500 hover:text-gray-300 hover:bg-gray-800',
      infoBg: 'bg-amber-500/10',
      // Toast
      successToast: 'bg-[#111111] border border-emerald-500/30',
      // 重置按钮
      resetBtn: 'text-gray-500 hover:text-gray-400 hover:bg-gray-800/50'
    }
  } else {
    return {
      // 页面
      pageBg: 'bg-slate-50',
      // 文字
      textPrimary: 'text-slate-800',
      textSecondary: 'text-slate-700',
      textTertiary: 'text-slate-600',
      textMuted: 'text-slate-500',
      // 卡片
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      cardBorderHighlight: 'border-cyan-600',
      cardGlow: 'shadow-[0_0_12px_rgba(8,145,178,0.2)]',
      // 按钮
      btnPrimary: 'bg-cyan-600 text-white hover:bg-cyan-500',
      btnSecondary: 'bg-transparent border border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900',
      btnDisabled: 'bg-slate-200 text-slate-400 cursor-not-allowed',
      // 切换开关
      toggleBg: 'bg-slate-300',
      // 徽章
      popularBadge: 'bg-cyan-600/10 text-cyan-600 border border-cyan-600/30',
      // 图标
      checkIcon: 'text-emerald-600',
      // 表格
      tableHeader: 'bg-slate-100',
      tableRowEven: 'bg-white',
      tableRowOdd: 'bg-slate-50',
      tableHighlightCol: 'bg-cyan-600/5',
      // 弹窗
      closeBtn: 'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
      infoBg: 'bg-amber-500/10',
      // Toast
      successToast: 'bg-white border border-emerald-500/30 shadow-lg',
      // 重置按钮
      resetBtn: 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
    }
  }
})
</script>

<style scoped>
.pricing-card {
  /* 金融风格：直角卡片 */
  border-radius: 0;
}
</style>