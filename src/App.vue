<template>
  <component :is="layout">
    <template #navbar>
      <WorkflowNav @logout="handleLogout" />
    </template>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div v-if="Component" :key="$route.path" class="transition-wrapper">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import WorkflowNav from './components/WorkflowNav.vue'

const route = useRoute()
const router = useRouter()

// 动态获取当前路由配置的 layout
const layout = computed(() => route.meta.layout || 'div')

// 登出逻辑 - 清除所有用户数据并刷新页面
const handleLogout = () => {
  // 清除所有 localStorage 数据
  localStorage.clear()
  
  // 刷新页面，回到初始状态（使用正确的 base path）
  window.location.href = '/scalealpha/'
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>