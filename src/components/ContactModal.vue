
<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div 
      class="relative w-full max-w-sm mx-4 rounded-xl shadow-2xl border overflow-hidden"
      :style="{ 
        backgroundColor: tokens.colors.background.elevated, 
        borderColor: tokens.colors.border.strong 
      }"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4">
        <h2 class="text-lg font-bold" :style="{ color: tokens.colors.text.primary }">
          {{ $t('contact.title') }}
        </h2>
        <button 
          @click="$emit('close')"
          class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg class="w-5 h-5" :style="{ color: tokens.colors.text.muted }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Body -->
      <div class="px-5 pb-6 space-y-5">
        <!-- Email Section -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
            {{ $t('contact.emailTitle') }}
          </label>
          <div 
            class="flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer hover:border-blue-500 transition-colors group"
            :style="{ 
              backgroundColor: tokens.colors.background.base,
              borderColor: tokens.colors.border.strong
            }"
            @click="copyEmail"
          >
            <span class="text-blue-500 font-medium">contact@scalealpha.ai</span>
            <svg 
              class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span 
              v-if="copied" 
              class="text-xs text-green-500 ml-auto"
            >{{ $t('contact.copied') }}</span>
          </div>
        </div>
        
        <!-- WeChat QR Code Section -->
        <div class="text-center">
          <p class="text-sm font-medium mb-3" :style="{ color: tokens.colors.text.secondary }">
            {{ $t('contact.wechatTitle') }}
          </p>
          <div 
            class="inline-block p-3 rounded-xl border"
            :style="{ 
              backgroundColor: '#fff',
              borderColor: tokens.colors.border.default
            }"
          >
            <!-- QR Code Placeholder -->
            <div class="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              <!-- 如果有二维码图片，显示图片 -->
              <img 
                v-if="qrImageLoaded"
                :src="qrImageSrc" 
                alt="WeChat QR Code" 
                class="w-full h-full object-cover"
              />
              <!-- 占位符 -->
              <div v-else class="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <svg class="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                <span class="text-xs">WeChat QR</span>
              </div>
            </div>
          </div>
          <p class="text-xs mt-3" :style="{ color: tokens.colors.text.muted }">
            {{ $t('contact.wechatHint') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from 'vue-i18n'

const { tokens } = useTheme()
const { t } = useI18n()

const emit = defineEmits(['close'])

const copied = ref(false)
const qrImageLoaded = ref(false)
const qrImageSrc = ref('')

// 尝试加载二维码图片
onMounted(() => {
  const img = new Image()
  img.onload = () => {
    qrImageLoaded.value = true
    qrImageSrc.value = '/wechat-qr.png'
  }
  img.onerror = () => {
    qrImageLoaded.value = false
  }
  img.src = '/wechat-qr.png'
})

// Copy email to clipboard
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('contact@scalealpha.ai')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Handle QR code image error - show placeholder
const handleQRError = (e) => {
  e.target.style.display = 'none'
  e.target.parentElement.innerHTML = `
    <div class="w-full h-full flex flex-col items-center justify-center text-gray-400">
      <svg class="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h2m10 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
      <span class="text-xs">QR Code</span>
    </div>
  `
}
</script>
