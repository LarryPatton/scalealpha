<template>
  <div :class="['comment-item', level > 0 && 'ml-8 border-l-2 border-[#404040] pl-4']">
    <!-- 评论内容 -->
    <div class="bg-[#1f1f1f] rounded-lg p-4 mb-2">
      <!-- 作者信息 -->
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
          {{ comment.author[0] }}
        </div>
        <span class="font-medium text-white">{{ comment.author }}</span>
        <span 
          v-if="comment.badge" 
          class="text-xs px-2 py-0.5 bg-blue-600 text-white rounded-full"
        >
          {{ comment.badge }}
        </span>
        <span class="text-gray-500 text-xs">{{ comment.time }}</span>
      </div>

      <!-- 评论正文 -->
      <p class="text-gray-300 text-sm mb-3 whitespace-pre-wrap">{{ comment.content }}</p>

      <!-- 互动按钮 -->
      <div class="flex items-center gap-3">
        <!-- 点赞/点踩 -->
        <div class="flex items-center bg-[#2a2a2a] rounded-full">
          <button class="p-1.5 hover:bg-[#333] rounded-l-full transition-colors text-gray-400 hover:text-orange-500">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
            </svg>
          </button>
          <span class="px-2 text-white font-medium text-xs">{{ comment.likes }}</span>
          <button class="p-1.5 hover:bg-[#333] rounded-r-full transition-colors text-gray-400 hover:text-blue-500">
            <svg class="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
            </svg>
          </button>
        </div>

        <!-- 回复按钮 -->
        <button 
          @click="toggleReply"
          class="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#2a2a2a] hover:bg-[#333] transition-colors text-gray-400 hover:text-white text-xs"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
          </svg>
          回复
        </button>

        <!-- 奖励按钮 -->
        <button class="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#2a2a2a] hover:bg-[#333] transition-colors text-gray-400 hover:text-yellow-500 text-xs">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          奖励
        </button>

        <!-- 分享按钮 -->
        <button class="flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#2a2a2a] hover:bg-[#333] transition-colors text-gray-400 hover:text-white text-xs">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
          </svg>
          分享
        </button>

        <!-- 更多选项 -->
        <button class="ml-auto text-gray-400 hover:text-white transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 回复输入框 -->
    <div v-if="showReplyBox" class="mb-4 ml-8">
      <textarea 
        v-model="replyText"
        placeholder="输入回复..."
        class="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none text-sm"
        rows="2"
      ></textarea>
      <div class="flex justify-end gap-2 mt-2">
        <button 
          @click="cancelReply"
          class="px-3 py-1.5 bg-[#333] hover:bg-[#404040] text-gray-300 rounded-lg transition-colors text-sm"
        >
          取消
        </button>
        <button 
          @click="submitReply"
          class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
        >
          回复
        </button>
      </div>
    </div>

    <!-- 递归渲染子评论 -->
    <div v-if="comment.replies && comment.replies.length > 0" class="space-y-2">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :level="level + 1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})

const showReplyBox = ref(false)
const replyText = ref('')

const toggleReply = () => {
  showReplyBox.value = !showReplyBox.value
}

const cancelReply = () => {
  showReplyBox.value = false
  replyText.value = ''
}

const submitReply = () => {
  if (replyText.value.trim()) {
    // 添加回复到当前评论的 replies 数组
    if (!props.comment.replies) {
      props.comment.replies = []
    }
    props.comment.replies.push({
      id: Date.now(),
      author: 'CurrentUser',
      time: '刚刚',
      content: replyText.value,
      likes: 0,
      replies: []
    })
    replyText.value = ''
    showReplyBox.value = false
  }
}
</script>

<script>
// 允许组件递归引用自身
export default {
  name: 'CommentItem'
}
</script>
