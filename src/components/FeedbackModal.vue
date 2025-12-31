
<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('close')"></div>
    
    <!-- Modal -->
    <div 
      class="relative w-full max-w-xl mx-4 rounded-xl shadow-2xl border overflow-hidden"
      :style="{ 
        backgroundColor: tokens.colors.background.elevated, 
        borderColor: tokens.colors.border.strong 
      }"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b" :style="{ borderColor: tokens.colors.border.default }">
        <h2 class="text-xl font-bold" :style="{ color: tokens.colors.text.primary }">
          {{ $t('feedback.title') }}
        </h2>
      </div>
      
      <!-- Body -->
      <div class="px-6 py-6 space-y-5">
        <!-- Problem Title -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
            <span class="text-red-500 mr-1">*</span>{{ $t('feedback.problemTitle') }}
          </label>
          <input 
            v-model="formData.title"
            type="text"
            :placeholder="$t('feedback.titlePlaceholder')"
            class="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
            :style="{ 
              backgroundColor: tokens.colors.background.base,
              borderColor: tokens.colors.border.strong,
              color: tokens.colors.text.primary
            }"
          />
        </div>
        
        <!-- Problem Description -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
            <span class="text-red-500 mr-1">*</span>{{ $t('feedback.problemDesc') }}
          </label>
          <div class="relative">
            <textarea 
              v-model="formData.description"
              :placeholder="$t('feedback.descPlaceholder')"
              rows="5"
              maxlength="1000"
              class="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
              :style="{ 
                backgroundColor: tokens.colors.background.base,
                borderColor: tokens.colors.border.strong,
                color: tokens.colors.text.primary
              }"
            ></textarea>
            <div class="absolute bottom-2 right-3 text-xs" :style="{ color: tokens.colors.text.muted }">
              {{ formData.description.length }} / 1000
            </div>
          </div>
        </div>
        
        <!-- Screenshot Upload -->
        <div>
          <label class="block text-sm font-medium mb-2" :style="{ color: tokens.colors.text.secondary }">
            {{ $t('feedback.screenshot') }}
          </label>
          <div class="flex flex-wrap gap-3">
            <!-- Uploaded Images Preview -->
            <div 
              v-for="(image, index) in uploadedImages" 
              :key="index"
              class="relative w-20 h-20 rounded-lg border overflow-hidden group"
              :style="{ borderColor: tokens.colors.border.default }"
            >
              <img :src="image" alt="Screenshot" class="w-full h-full object-cover" />
              <button 
                @click="removeImage(index)"
                class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Upload Button -->
            <label 
              v-if="uploadedImages.length < 5"
              class="w-20 h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
              :style="{ borderColor: tokens.colors.border.strong }"
            >
              <input 
                type="file" 
                accept="image/*" 
                class="hidden" 
                @change="handleImageUpload"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" :style="{ color: tokens.colors.text.muted }">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span class="text-xs mt-1" :style="{ color: tokens.colors.text.muted }">{{ $t('feedback.upload') }}</span>
            </label>
          </div>
          <p class="text-xs mt-2" :style="{ color: tokens.colors.text.muted }">
            {{ $t('feedback.uploadHint') }}
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="px-6 py-4 border-t flex justify-center gap-4" :style="{ borderColor: tokens.colors.border.default }">
        <button 
          @click="handleSubmit"
          :disabled="!isFormValid"
          class="px-8 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
          :class="isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500/50 cursor-not-allowed'"
        >
          {{ $t('feedback.submit') }}
        </button>
        <button 
          @click="handleReset"
          class="px-8 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          :style="{ 
            color: tokens.colors.text.primary,
            borderColor: tokens.colors.border.strong
          }"
        >
          {{ $t('feedback.reset') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useI18n } from 'vue-i18n'

const { tokens } = useTheme()
const { t } = useI18n()

const emit = defineEmits(['close'])

// Form data
const formData = ref({
  title: '',
  description: ''
})

// Uploaded images (base64 strings)
const uploadedImages = ref([])

// Form validation
const isFormValid = computed(() => {
  return formData.value.title.trim() !== '' && formData.value.description.trim() !== ''
})

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Check file size (max 1MB)
  if (file.size > 1024 * 1024) {
    alert(t('feedback.fileTooLarge'))
    return
  }
  
  // Check max images
  if (uploadedImages.value.length >= 5) {
    alert(t('feedback.maxImages'))
    return
  }
  
  // Read file as base64
  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImages.value.push(e.target.result)
  }
  reader.readAsDataURL(file)
  
  // Reset input
  event.target.value = ''
}

// Remove image
const removeImage = (index) => {
  uploadedImages.value.splice(index, 1)
}

// Handle submit
const handleSubmit = () => {
  if (!isFormValid.value) return
  
  // TODO: Submit feedback to backend
  console.log('Submitting feedback:', {
    title: formData.value.title,
    description: formData.value.description,
    images: uploadedImages.value.length
  })
  
  alert(t('feedback.submitSuccess'))
  emit('close')
}

// Handle reset
const handleReset = () => {
  formData.value = {
    title: '',
    description: ''
  }
  uploadedImages.value = []
}
</script>
