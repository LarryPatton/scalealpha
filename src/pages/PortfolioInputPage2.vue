<template>
  <div class="min-h-screen" :style="{ backgroundColor: tokens.colors.background.base }">
    <!-- Main Content -->
    <main class="w-full px-12 py-6">
      
      <!-- Page Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-1" :style="{ color: tokens.colors.text.primary }">您的账户</h1>
        <p class="text-sm" :style="{ color: tokens.colors.text.muted }">管理您的账户信息与安全设置</p>
      </div>

      <!-- ========== 主要双列布局 ========== -->
      <div class="grid grid-cols-2 gap-6">
        
        <!-- ===== 左列：用户相关 ===== -->
        <div class="flex flex-col gap-6">
          
          <!-- 个人资料 -->
          <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
            <div class="px-5 py-3 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">个人资料</h2>
            </div>
            <div class="p-5" :style="{ backgroundColor: tokens.colors.background.surface }">
              <div class="flex items-center gap-5">
                <!-- Avatar -->
                <div class="relative shrink-0">
                  <div class="w-16 h-16 rounded-full overflow-hidden border-2" :style="{ borderColor: tokens.colors.border.default }">
                    <img :src="userProfile.avatar" alt="用户头像" class="w-full h-full object-cover" />
                  </div>
                  <button 
                    class="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors"
                    :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default, color: tokens.colors.text.muted }"
                    :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
                    @click="handleAvatarEdit"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Profile Info -->
                <div class="flex-1 grid grid-cols-3 gap-4">
                  <div>
                    <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">昵称</p>
                    <div class="flex items-center gap-1">
                      <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ userProfile.nickname }}</p>
                      <button 
                        class="p-0.5 rounded-sm transition-colors"
                        :style="{ color: tokens.colors.text.muted }"
                        :class="isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'"
                        @click="handleEditNickname"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">电子邮件</p>
                    <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ userProfile.email }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">最近登录</p>
                    <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ userProfile.lastLogin }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 订阅与积分 -->
          <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
            <div class="px-5 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">订阅与积分</h2>
              <button 
                class="px-3 py-1 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                @click="handleUpgrade"
              >
                升级会员
              </button>
            </div>
            
            <!-- 会员信息 -->
            <div class="px-5 py-3 border-b grid grid-cols-2 gap-4" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
              <div>
                <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">当前等级</p>
                <p class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">{{ subscription.level }}</p>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">当前积分</p>
                <p class="text-lg font-bold" :style="{ color: tokens.colors.accent.primary }">{{ subscription.credits }}</p>
              </div>
            </div>
            
            <!-- 积分记录 -->
            <div class="px-5 py-3" :style="{ backgroundColor: tokens.colors.background.surface }">
              <p class="text-[10px] uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">积分记录</p>
              <div class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
                <div class="grid grid-cols-3 text-[10px] font-bold uppercase tracking-wider" :style="{ backgroundColor: tokens.colors.background.elevated }">
                  <div class="px-3 py-1.5" :style="{ color: tokens.colors.text.muted }">操作时间</div>
                  <div class="px-3 py-1.5" :style="{ color: tokens.colors.text.muted }">操作类型</div>
                  <div class="px-3 py-1.5 text-right" :style="{ color: tokens.colors.text.muted }">积分变动</div>
                </div>
                <div 
                  v-for="record in creditsHistory" 
                  :key="record.id"
                  class="grid grid-cols-3 text-xs border-t"
                  :style="{ borderColor: tokens.colors.border.default }"
                >
                  <div class="px-3 py-2" :style="{ color: tokens.colors.text.secondary }">{{ record.time }}</div>
                  <div class="px-3 py-2" :style="{ color: tokens.colors.text.primary }">{{ record.type }}</div>
                  <div 
                    class="px-3 py-2 text-right font-medium"
                    :style="{ color: record.change > 0 ? tokens.colors.semantic.success : tokens.colors.semantic.error }"
                  >
                    {{ record.change > 0 ? '+' : '' }}{{ record.change }}
                  </div>
                </div>
              </div>
              <p class="text-[10px] mt-1.5 text-right" :style="{ color: tokens.colors.text.muted }">共 {{ creditsHistory.length }} 条记录</p>
            </div>
          </section>

          <!-- 账户与安全 -->
          <section class="border rounded-sm overflow-hidden" :style="{ borderColor: tokens.colors.border.default }">
            <div class="px-5 py-3 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
              <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">账户与安全</h2>
            </div>
            
            <!-- 登录方式 -->
            <div class="px-5 py-3 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
              <p class="text-[10px] uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">登录方式</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-sm flex items-center justify-center" :style="{ backgroundColor: '#07C160' + '1A' }">
                      <svg class="w-3h-3" style="color: #07C160" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.177l-.325-1.233a.49.49 0 01.177-.554c1.522-1.12 2.496-2.772 2.496-4.594 0-3.244-3.065-6.097-7.055-6.149zm-1.834 3.092c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.983.97-.983zm4.857 0c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.983.969-.983z"/>
                      </svg>
                    </div>
                    <span class="text-sm" :style="{ color: tokens.colors.text.primary }">微信</span>
                  </div>
                  <button 
                    class="px-2.5 py-0.5 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                    :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                    @click="handleWechatAuth"
                  >
                    授权
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-5 h-5 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.semantic.error + '1A' }">
                      <svg class="w-3 h-3" :style="{ color: tokens.colors.semantic.error }" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <span class="text-sm" :style="{ color: tokens.colors.text.primary }">Google</span>
                    <span class="text-[10px] px-1.5 py-0.5 rounded-sm" :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }">已绑定</span>
                  </div>
                  <button 
                    class="px-2.5 py-0.5 text-xs font-medium rounded-sm border transition-colors hover:bg-red-500/10"
                    :style="{ borderColor: tokens.colors.semantic.error, color: tokens.colors.semantic.error }"
                    @click="handleGoogleUnbind"
                  >
                    解绑
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 安全设置 -->
            <div class="px-5 py-3 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
              <p class="text-[10px] uppercase tracking-wider mb-2" :style="{ color: tokens.colors.text.muted }">安全设置</p>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm" :style="{ color: tokens.colors.text.primary }">密码登录</span>
                  <button 
                    class="px-2.5 py-0.5 text-xs font-medium rounded-sm border transition-colors"
                    :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                    :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                    @click="handleSetPassword"
                  >
                    设置
                  </button>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-sm" :style="{ color: tokens.colors.text.primary }">投资偏好</span>
                    <span 
                      v-if="investmentPreferences.filled"
                      class="text-[10px] px-1.5 py-0.5 rounded-sm"
                      :style="{ backgroundColor: tokens.colors.semantic.success + '1A', color: tokens.colors.semantic.success }"
                    >已填写</span>
                    <span 
                      v-else
                      class="text-[10px] px-1.5 py-0.5 rounded-sm"
                      :style="{ backgroundColor: tokens.colors.semantic.warning + '1A', color: tokens.colors.semantic.warning }"
                    >待填写</span>
                  </div>
                  <button 
                    class="px-2.5 py-0.5 text-xs font-medium rounded-sm border transition-colors"
                    :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
                    :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
                    @click="handlePreferences"
                  >
                    设置
                  </button>
                </div>
              </div>
            </div>
            
            <!-- 退出登录 -->
            <div class="px-5 py-3" :style="{ backgroundColor: tokens.colors.background.surface }">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">退出登录</p>
                  <p class="text-xs" :style="{ color: tokens.colors.text.muted }">从所有设备退出</p>
                </div>
                <button 
                  class="px-3 py-1 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.semantic.error, color: '#fff' }"
                  @click="handleLogout"
                >
                  退出
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- ===== 右列：API 开发者设置 ===== -->
        <section class="border rounded-sm overflow-hidden h-fit" :style="{ borderColor: tokens.colors.border.default }">
          <!-- 区块标题 -->
          <div class="px-5 py-3 border-b flex items-center justify-between" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.elevated }">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-sm flex items-center justify-center" :style="{ backgroundColor: tokens.colors.accent.primary + '1A' }">
                <svg class="w-3.5 h-3.5" :style="{ color: tokens.colors.accent.primary }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">API 开发者设置</h2>
                <p class="text-[10px]" :style="{ color: tokens.colors.text.muted }">管理 API 密钥和积分</p>
              </div>
            </div>
            <button 
              class="px-3 py-1 text-xs font-medium rounded-sm border transition-colors flex items-center gap-1"
              :style="{ borderColor: tokens.colors.border.default, color: tokens.colors.text.secondary }"
              :class="isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              API 文档
            </button>
          </div>
          
          <!-- API 密钥管理 -->
          <div class="px-5 py-4 border-b" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
              <h3 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">API 密钥管理</h3>
            </div>
            <p class="text-xs mb-4" :style="{ color: tokens.colors.text.muted }">用于程序化 API 访问的身份验证密钥</p>
            
            <!-- 空状态 -->
            <div v-if="apiKeys.length === 0" class="border rounded-sm p-6 text-center" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
              <div class="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center" :style="{ backgroundColor: tokens.colors.border.subtle }">
                <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <p class="text-sm mb-3" :style="{ color: tokens.colors.text.muted }">您还没有 API 密钥</p>
              <button 
                class="px-4 py-1.5 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                @click="handleCreateAPIKey"
              >
                创建 API 密钥
              </button>
            </div>
            
            <!-- 有密钥时的列表 -->
            <div v-else class="space-y-2">
              <div 
                v-for="key in apiKeys" 
                :key="key.id"
                class="border rounded-sm p-3 flex items-center justify-between"
                :style="{ borderColor: tokens.colors.border.default }"
              >
                <div>
                  <p class="text-sm font-medium" :style="{ color: tokens.colors.text.primary }">{{ key.name }}</p>
                  <p class="text-xs font-mono" :style="{ color: tokens.colors.text.muted }">{{ key.maskedKey }}</p>
                </div>
                <button class="text-xs" :style="{ color: tokens.colors.semantic.error }">删除</button>
              </div>
            </div>
          </div>
          
          <!-- API 积分 -->
          <div class="px-5 py-4" :style="{ backgroundColor: tokens.colors.background.surface }">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <h3 class="text-sm font-bold" :style="{ color: tokens.colors.text.primary }">API 积分</h3>
            </div>
            <p class="text-xs mb-3" :style="{ color: tokens.colors.text.muted }">购买 API 调用积分（仅用于 API 接口调用）</p>
            
            <!-- 当前余额 -->
            <div class="border rounded-sm p-3 mb-4" :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.base }">
              <p class="text-[10px] uppercase tracking-wider mb-1" :style="{ color: tokens.colors.text.muted }">当前 API 积分余额</p>
              <p class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">{{ apiCredits }} <span class="text-sm font-normal" :style="{ color: tokens.colors.text.muted }">积分</span></p>
            </div>
            
            <!-- 套餐选择 -->
            <div class="grid grid-cols-3 gap-3">
              <div 
                v-for="pkg in apiPackages" 
                :key="pkg.id"
                class="border rounded-sm p-3 text-center relative transition-all cursor-pointer"
                :style="{ 
                  borderColor: pkg.badge ? tokens.colors.accent.primary : tokens.colors.border.default,
                  backgroundColor: tokens.colors.background.base
                }"
                :class="pkg.badge ? 'ring-1' : ''"
              >
                <!-- Badge -->
                <div 
                  v-if="pkg.badge" 
                  class="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[9px] font-bold rounded-full whitespace-nowrap"
                  :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                >
                  {{ pkg.badge }}
                </div>
                
                <p class="text-[11px] font-bold mb-1" :style="{ color: tokens.colors.text.primary }">{{ pkg.name }}</p>
                <p class="text-xl font-bold mb-0.5" :style="{ color: tokens.colors.accent.primary }">{{ pkg.credits }}</p>
                <p class="text-[10px] mb-1.5" :style="{ color: tokens.colors.text.muted }">积分</p>
                <p class="text-sm font-bold mb-0.5" :style="{ color: tokens.colors.text.primary }">${{ pkg.price }} <span class="text-[10px] font-normal" :style="{ color: tokens.colors.text.muted }">USD</span></p>
                <p class="text-[10px] mb-2" :style="{ color: tokens.colors.text.muted }">{{ pkg.description }}</p>
                <button 
                  class="w-full px-2 py-1.5 text-xs font-bold rounded-sm transition-colors hover:brightness-110"
                  :style="{ backgroundColor: tokens.colors.accent.primary, color: tokens.colors.background.base }"
                  @click="handleBuyPackage(pkg)"
                >
                  立即购买
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <footer class="text-center py-4 mt-6">
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

const { tokens, isDark } = useTheme()

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

// Investment Preferences Data
const investmentPreferences = reactive({
  filled: false  // 设置为 true 时显示"已填写"，false 时显示"待填写"
})

// Credits History Data
const creditsHistory = ref([
  { id: 1, time: '2025-12-04 21:00:27', type: '发现新机会', change: -30 },
  { id: 2, time: '2025-12-01 11:43:06', type: '订阅', change: +100 }
])

// API Developer Data
const apiKeys = ref([])  // 空数组表示暂无密钥
const apiCredits = ref(0)

// API Packages
const apiPackages = [
  { id: 'starter', name: 'Starter Pack', credits: 1000, price: 30, description: '适合入门使用', badge: null },
  { id: 'growth', name: 'Growth Pack', credits: 1700, price: 50, description: '最受欢迎的选择', badge: 'Best Value' },
  { id: 'scale', name: 'Scale Pack', credits: 3500, price: 100, description: '适合高频使用', badge: null }
]

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

const handleCreateAPIKey = () => {
  console.log('Create API key clicked')
}

const handleBuyPackage = (pkg) => {
  console.log('Buy package clicked:', pkg.name)
}
</script>

<style scoped>
/* Additional styles if needed */
</style>