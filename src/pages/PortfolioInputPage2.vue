<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Main Content -->
    <main class="max-w-2xl mx-auto px-6 py-8">
      
      <!-- Page Header with Avatar -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.accent.primary }">您的账户</h1>
          <p class="text-sm" :style="{ color: tokens.colors.text.muted }">管理您的账户信息。</p>
        </div>
        <!-- Avatar with Edit -->
        <div class="relative group">
          <div class="w-16 h-16 rounded-full overflow-hidden border-2" :style="{ borderColor: tokens.colors.border.default }">
            <img 
              :src="userProfile.avatar" 
              alt="用户头像" 
              class="w-full h-full object-cover"
            />
          </div>
          <button 
            class="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors"
            :style="{ 
              backgroundColor: tokens.colors.background.surface, 
              borderColor: tokens.colors.border.default,
              color: tokens.colors.text.muted 
            }"
            @click="handleAvatarEdit"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Account Info Section -->
      <section class="mb-8">
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <!-- Nickname Row -->
          <div class="flex items-center justify-between px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">昵称</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.accent.primary }">{{ userProfile.nickname }}</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-medium rounded-sm border transition-colors hover:bg-white/5"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              @click="handleEditNickname"
            >
              修改昵称
            </button>
          </div>
          
          <!-- Email Row -->
          <div class="px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">电子邮件</p>
            <p class="text-sm font-medium" :style="{ color: tokens.colors.accent.primary }">{{ userProfile.email }}</p>
          </div>
          
          <!-- Last Login Row -->
          <div class="px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">最近登录</p>
            <p class="text-sm font-medium" :style="{ color: tokens.colors.accent.primary }">{{ userProfile.lastLogin }}</p>
          </div>
        </div>
      </section>

      <!-- Subscription Section -->
      <section class="mb-8">
        <div class="mb-3">
          <h2 class="text-base font-bold" :style="{ color: tokens.colors.accent.primary }">订阅</h2>
          <p class="text-xs" :style="{ color: tokens.colors.text.muted }">管理订阅</p>
        </div>
        
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <!-- Membership Level -->
          <div class="flex items-center justify-between px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">当前会员等级</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ subscription.level }}</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
              :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
              @click="handleUpgrade"
            >
              升 级
            </button>
          </div>
          
          <!-- Credits -->
          <div class="flex items-center justify-between px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-xs mb-1" :style="{ color: tokens.colors.text.muted }">当前积分</p>
              <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ subscription.credits }}</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-medium rounded-sm border transition-colors hover:bg-white/5"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              @click="handleCreditsDetail"
            >
              积分详情
            </button>
          </div>
        </div>
      </section>

      <!-- API Developer Section -->
      <section class="mb-8">
        <div class="mb-3 flex items-center gap-2">
          <svg class="w-4 h-4" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
          <div>
            <h2 class="text-base font-bold" :style="{ color: tokens.colors.accent.primary }">API 开发者设置</h2>
            <p class="text-xs" :style="{ color: tokens.colors.text.muted }">管理 API 密钥和 API 积分</p>
          </div>
        </div>
        
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <div class="flex items-center justify-between px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-sm font-medium mb-0.5" :style="{ color: tokens.colors.text.primary }">API 密钥与积分</p>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">用于程序化访问 ScaleAlpha API</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-bold rounded-sm transition-colors hover:brightness-110 flex items-center gap-1.5"
              :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
              @click="handleManageAPI"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              管理 API
            </button>
          </div>
        </div>
      </section>

      <!-- Third-party Login Section -->
      <section class="mb-8">
        <div class="mb-3">
          <h2 class="text-base font-bold" :style="{ color: tokens.colors.accent.primary }">第三方登录</h2>
          <p class="text-xs" :style="{ color: tokens.colors.text.muted }">在下面管理您的第三方授权登录设置。</p>
        </div>
        
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <!-- WeChat -->
          <div class="flex items-center justify-between px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <p class="text-sm" :style="{ color: tokens.colors.text.primary }">授权微信登录。</p>
            <button 
              class="px-4 py-2 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
              :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
              @click="handleWechatAuth"
            >
              授 权
            </button>
          </div>
          
          <!-- Google -->
          <div class="flex items-center justify-between px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <p class="text-sm" :style="{ color: tokens.colors.text.primary }">授权Google登录。</p>
            <button 
              class="px-4 py-2 text-xs font-medium rounded-sm border transition-colors hover:bg-red-500/10"
              :style="{ borderColor: tokens.colors.semantic.error, color: tokens.colors.semantic.error }"
              @click="handleGoogleUnbind"
            >
              解 绑
            </button>
          </div>
        </div>
      </section>

      <!-- Account Security Section -->
      <section class="mb-8">
        <div class="mb-3">
          <h2 class="text-base font-bold" :style="{ color: tokens.colors.accent.primary }">账户安全</h2>
          <p class="text-xs" :style="{ color: tokens.colors.text.muted }">在下面管理您的帐户安全。</p>
        </div>
        
        <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
          <!-- Password -->
          <div class="flex items-center justify-between px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-sm font-medium mb-0.5" :style="{ color: tokens.colors.text.primary }">密码登录</p>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">管理您的账户密码。</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-medium rounded-sm border transition-colors hover:bg-white/5"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              @click="handleSetPassword"
            >
              设置密码
            </button>
          </div>
          
          <!-- Investment Preferences -->
          <div class="flex items-center justify-between px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-sm font-medium mb-0.5" :style="{ color: tokens.colors.text.primary }">投资偏好</p>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">管理您的投资偏好。</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-medium rounded-sm border transition-colors hover:bg-white/5"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              @click="handlePreferences"
            >
              偏好设置
            </button>
          </div>
          
          <!-- Logout -->
          <div class="flex items-center justify-between px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div>
              <p class="text-sm font-medium mb-0.5" :style="{ color: tokens.colors.text.primary }">退出登录</p>
              <p class="text-xs" :style="{ color: tokens.colors.text.muted }">从所有设备退出登录。</p>
            </div>
            <button 
              class="px-4 py-2 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
              :style="{ backgroundColor: tokens.colors.semantic.error, color: '#fff' }"
              @click="handleLogout"
            >
              退出登录
            </button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="text-center py-4">
        <p class="text-xs" :style="{ color: tokens.colors.text.muted }">
          有任何问题，请联系邮箱：
          <a href="mailto:contact@scalealpha.ai" class="hover:underline" :style="{ color: tokens.colors.text.secondary }">
            contact@scalealpha.ai
          </a>
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useTheme } from '../composables/useTheme'

const { tokens } = useTheme()

// User Profile Data
const userProfile = reactive({
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  nickname: 'Larry Patton',
  email: '1451076908@qq.com',
  lastLogin: '2025-12-21 22:24:24'
})

// Subscription Data
const subscription = reactive({
  level: 'Free',
  credits: 70
})

// Event Handlers
const handleAvatarEdit = () => {
  console.log('Edit avatar clicked')
}

const handleEditNickname = () => {
  console.log('Edit nickname clicked')
}

const handleUpgrade = () => {
  console.log('Upgrade clicked')
}

const handleCreditsDetail = () => {
  console.log('Credits detail clicked')
}

const handleManageAPI = () => {
  console.log('Manage API clicked')
}

const handleWechatAuth = () => {
  console.log('WeChat auth clicked')
}

const handleGoogleUnbind = () => {
  console.log('Google unbind clicked')
}

const handleSetPassword = () => {
  console.log('Set password clicked')
}

const handlePreferences = () => {
  console.log('Preferences clicked')
}

const handleLogout = () => {
  console.log('Logout clicked')
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
