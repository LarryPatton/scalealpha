<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- Login Page (before authentication) -->
    <LoginPage v-if="!isLoggedIn" />

    <!-- Main App (after authentication) -->
    <div v-else>
      <Navbar @logout="handleLogout" />
      <main class="min-h-screen">
        <HomePage v-if="currentPage === 'home'" />
        <OpportunitiesPage v-else-if="currentPage === 'opportunities'" />
        <TradingPage v-else-if="currentPage === 'trading'" />
        <PlanPage v-else-if="currentPage === 'plan'" />
        <PingPingPage v-else-if="currentPage === 'pingping'" />
        <PortfolioPage v-else-if="currentPage === 'portfolio'" />
        <EventPage v-else-if="currentPage === 'event'" />
        <HistoryPage v-else-if="currentPage === 'history'" />
        <BacktestPage v-else-if="currentPage === 'backtest'" />
        <BlogPage v-else-if="currentPage === 'blog'" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoginPage from './pages/LoginPage.vue'
import Navbar from './components/Navbar.vue'
import WelcomePage from './pages/WelcomePage.vue'
import HomePage from './pages/HomePage.vue'
import OpportunitiesPage from './pages/OpportunitiesPage.vue'
import TradingPage from './pages/TradingPage.vue'
import PlanPage from './pages/PlanPage.vue'
import PingPingPage from './pages/PingPingPage.vue'
import PortfolioPage from './pages/PortfolioPage.vue'
import EventPage from './pages/EventPage.vue'
import HistoryPage from './pages/HistoryPage.vue'
import BacktestPage from './pages/BacktestPage.vue'
import BlogPage from './pages/BlogPage.vue'

const isLoggedIn = ref(false)
const currentPage = ref('welcome')
const sidebarOpen = ref(false)

// 在挂载时检查登录状态
onMounted(() => {
  const savedLoginStatus = localStorage.getItem('isLoggedIn')
  if (savedLoginStatus === 'true') {
    isLoggedIn.value = true
    currentPage.value = 'home'
  }
})

// 登录成功处理
window.addEventListener('login-success', (e) => {
  isLoggedIn.value = true
  currentPage.value = 'home'
})

// 通过事件总线的方式处理导航
window.addEventListener('navigate', (e) => {
  currentPage.value = e.detail.page
})

window.addEventListener('toggle-sidebar', () => {
  sidebarOpen.value = !sidebarOpen.value
})

// 登出处理
const handleLogout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  currentPage.value = 'home'
}
</script>
