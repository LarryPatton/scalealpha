<template>
  <div class="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
    <!-- Main Container -->
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span class="text-3xl font-bold text-black">⚡</span>
        </div>
      </div>

      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-3">Log into ScaleAlpha</h1>
        <p class="text-gray-400">
          Don't have an account?
          <a href="#" class="text-blue-400 hover:text-blue-300 underline transition">Sign up</a>
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-4 mb-6">
        <!-- Email Input -->
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            class="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            required
          />
        </div>

        <!-- Password Input -->
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            required
          />
        </div>

        <!-- Forgot Password Link -->
        <div class="text-right">
          <a href="#" class="text-sm text-gray-400 hover:text-gray-300 underline transition">
            Forgot password?
          </a>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition shadow-lg hover:shadow-xl"
        >
          Log in
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-4 mb-6">
        <div class="flex-1 h-px bg-[#404040]"></div>
        <span class="text-gray-500 text-sm">or</span>
        <div class="flex-1 h-px bg-[#404040]"></div>
      </div>

      <!-- Social Login Buttons -->
      <div class="space-y-3 mb-8">
        <!-- Google Sign In -->
        <button
          class="w-full py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white font-semibold hover:bg-[#3a3a3a] transition flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <!-- Apple Sign In -->
        <button
          class="w-full py-3 bg-[#2a2a2a] border border-[#404040] rounded-lg text-white font-semibold hover:bg-[#3a3a3a] transition flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 13.5c-.91 2.18-.41 3.96 1.33 5.5.99.88 1.42 1.39 1.42 2.15 0 1.31-1.16 2.11-2.49 2.11-.5 0-.96-.15-1.66-.67-.8-.57-1.33-1.01-2.16-1.01-.77 0-1.35.4-2.1.93-.88.63-1.91 1.37-3.28 1.37-1.86 0-3.51-1.04-4.46-2.58-.33-.58-.8-1.52-1.08-2.24-.74-1.98-.74-5.05 0-7.03.87-2.33 2.44-3.85 4.43-4.41.42-.11.97-.17 1.4-.17.65 0 1.23.15 2.16.67.8.44 1.24.66 1.95.66.7 0 1.13-.2 2.09-.72 1.1-.6 1.63-.81 2.28-.81 1.98 0 3.76 1.04 4.74 2.65 1.18 2.05 1.11 5.69-.21 8.13z"/>
          </svg>
          Sign in with Apple
        </button>
      </div>

      <!-- Footer Links -->
      <div class="text-center text-gray-500 text-sm space-x-2">
        <a href="#" class="hover:text-gray-400 underline transition">Terms of Service</a>
        <span>•</span>
        <a href="#" class="hover:text-gray-400 underline transition">Privacy Policy</a>
      </div>
    </div>

    <!-- Floating Help Button -->
    <div class="fixed bottom-8 right-8">
      <button class="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl hover:shadow-lg transition shadow-lg">
        💬
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  // 验证输入
  if (!email.value || !password.value) {
    alert('请输入邮箱和密码')
    return
  }

  // 模拟登录成功
  // 在实际应用中，这里应该调用后端API
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userEmail', email.value)

  // 触发导航到首页
  window.dispatchEvent(new CustomEvent('login-success', { detail: { email: email.value } }))
}
</script>
