<template>
  <component :is="layout">
    <template #navbar>
      <WorkflowNav @logout="handleLogout" />
    </template>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
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

// 简单的登出逻辑
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  router.push('/')
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