<template>
  <div class="min-h-screen bg-[#1a1a1a]">
    <!-- 返回导航 -->
    <div class="border-b border-[#333] bg-[#1f1f1f] px-6 py-3">
      <router-link 
        to="/info" 
        class="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        返回社区
      </router-link>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-6">
      <!-- 主帖详情 -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl overflow-hidden mb-6">
        <div class="p-6">
          <!-- 作者信息 -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {{ postData.author[0] }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-medium text-white">r/{{ postData.subreddit }}</span>
                <span class="text-gray-500">•</span>
                <span class="text-gray-500 text-sm">{{ postData.time }}</span>
              </div>
              <div class="text-gray-400 text-sm">u/{{ postData.author }}</div>
            </div>
            <!-- 更多选项 -->
            <button class="ml-auto text-gray-400 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
            </button>
          </div>

          <!-- 帖子标题 -->
          <h1 class="text-2xl font-bold text-white mb-4">{{ postData.title }}</h1>

          <!-- 帖子正文 -->
          <div class="prose prose-invert max-w-none mb-6">
            <p class="text-gray-300 whitespace-pre-wrap leading-relaxed">{{ postData.content }}</p>
            
            <!-- 链接列表 -->
            <div v-if="postData.links && postData.links.length > 0" class="mt-4 space-y-2">
              <a 
                v-for="(link, index) in postData.links"
                :key="index"
                :href="link.url"
                target="_blank"
                class="block text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                - {{ link.text }}: {{ link.url }}
              </a>
            </div>
          </div>

          <!-- 互动按钮 -->
          <div class="flex items-center gap-4 pt-4 border-t border-[#404040]">
            <!-- 点赞/点踩 -->
            <div class="flex items-center bg-[#1f1f1f] rounded-full">
              <button class="p-2 hover:bg-[#333] rounded-l-full transition-colors text-gray-400 hover:text-orange-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </button>
              <span class="px-2 text-white font-medium text-sm">{{ postData.likes }}</span>
              <button class="p-2 hover:bg-[#333] rounded-r-full transition-colors text-gray-400 hover:text-blue-500">
                <svg class="w-5 h-5 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                </svg>
              </button>
            </div>

            <!-- 评论 -->
            <button class="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1f1f1f] hover:bg-[#333] transition-colors text-gray-400 hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
              </svg>
              <span class="text-sm">{{ postData.comments }}</span>
            </button>

            <!-- 分享 -->
            <button class="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1f1f1f] hover:bg-[#333] transition-colors text-gray-400 hover:text-white">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
              <span class="text-sm">分享</span>
            </button>

            <!-- 奖励 -->
            <button class="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1f1f1f] hover:bg-[#333] transition-colors text-gray-400 hover:text-yellow-500">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-sm">奖励</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 评论区 -->
      <div class="bg-[#2a2a2a] border border-[#404040] rounded-xl p-6">
        <h3 class="text-lg font-bold text-white mb-4">评论 ({{ comments.length }})</h3>

        <!-- 主评论输入框 -->
        <div class="mb-6">
          <textarea 
            v-model="newComment"
            placeholder="添加评论..."
            class="w-full bg-[#1f1f1f] border border-[#404040] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
            rows="3"
          ></textarea>
          <div class="flex justify-end mt-2">
            <button 
              @click="submitComment"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              发表评论
            </button>
          </div>
        </div>

        <!-- 评论列表 -->
        <div class="space-y-4">
          <CommentItem
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :level="0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import CommentItem from '../components/CommentItem.vue'

const route = useRoute()
const newComment = ref('')

// 模拟帖子数据
const postsData = {
  c1: {
    id: 'c1',
    author: 'TechnicalArtist',
    subreddit: 'TechnicalArt',
    time: '16小时前',
    title: 'Freya Holmer on the Grind: Shader Forge, Burnout, and Late ADHD/Autism Diagnosis',
    content: `I hit a milestone when i had Freya Holmer on my podcast (The Generalists) and wanted to share it here.

She was blunt about the real pressure behind Shader Forge and why she walked away from the money to make it open source and the regrets of that decisions. We talked about her fight with perfectionism that keeps her from releasing finished work. We also touched on hitting burnout and how a late diagnosis of ADHD and Autism re-framed her entire relationship with work and motivation.

If you want the full conversation, it's here:
- Youtube: https://youtu.be/g7F6OYFr5_Y
- Spotify: https://open.spotify.com/episode/2oiMmO4tzgacTdEKyeE806
- Apple Podcast: https://podcasts.apple.com/us/podcast/freya-holm%C3%A9r-shader-forge-burn-out-neat-corp-building/id1767675641?i=100071846980`,
    likes: 28,
    comments: 8,
    links: [
      { text: 'Youtube', url: 'https://youtu.be/g7F6OYFr5_Y' },
      { text: 'Spotify', url: 'https://open.spotify.com/episode/2oiMmO4tzgacTdEKyeE806' },
      { text: 'Apple Podcast', url: 'https://podcasts.apple.com/us/podcast/freya-holm%C3%A9r-shader-forge-burn-out-neat-corp-building/id1767675641?i=100071846980' }
    ]
  },
  c2: {
    id: 'c2',
    author: 'AI投资家',
    subreddit: 'StockMarket',
    time: '1小时前',
    title: 'NVDA Q4财报分析：AI芯片需求超预期',
    content: `财报炸裂！EPS大超预期45%，数据中心业务增长爆表。

Jensen Huang在电话会议上透露H200芯片供不应求，需求至少延续到2025年Q3。

关键数据：
- 营收同比增长52%
- 毛利率提升至72%
- 现金流充裕，回购100亿美元股票

这波至少看到$950+，建议持有。`,
    likes: 856,
    comments: 45,
    links: []
  },
  c3: {
    id: 'c3',
    author: 'QuantTrader',
    subreddit: 'Quant',
    time: '3小时前',
    title: '基于机器学习的动量因子优化策略',
    content: `分享一个我最近测试的动量因子优化方法，使用LSTM预测短期动量强度。

回测结果：
- 年化收益：32%
- 最大回撤：-12%
- 夏普比率：2.1

代码和详细说明见我的GitHub（链接见评论）。`,
    likes: 124,
    comments: 23,
    links: []
  }
}

const postData = computed(() => {
  const id = route.params.id
  return postsData[id] || postsData.c1
})

// 模拟评论数据（支持多级嵌套）
const comments = ref([
  {
    id: 1,
    author: 'deohvii',
    badge: '原始发帖人',
    time: '16小时前',
    content: 'Hey everyone, just wanted to add a personal note.\n\nIt\'s wild to see this subreddit at 5,000 members. I remember scrolling through here when it was a tiny community of just 50 people, trying to find any scrap of insight on being a Technical Artist.\n\nCelebrating that, here are the most important resources i found about tech-art:\n- CatlikeCoding: https://catlikecoding.com/unity/tutorials/\n- Ben Cloward: https://www.youtube.com/@BenCloward/videos\n- Tech-art Aid: https://techartaid.com/\n- Tech-art Hub: https://techarthub.com/guides/\n\nFeel free to share more and reply to this message. I am always on the look for more resources.',
    likes: 10,
    replies: [
      {
        id: 2,
        author: 'Millicent_Bystandard',
        time: '14小时前',
        content: 'Perhaps we have the reached the popularity level of having a sticky for people interested in Technical Artists. I know the industry sucks atm, but we seem to have daily posts on people asking about how to get into Technical Art.',
        likes: 2,
        replies: [
          {
            id: 3,
            author: 'deohvii',
            badge: '原始发帖人',
            time: '15小时前',
            content: 'Let me know what you think and thank you fir the Sub, made my day :D',
            likes: 1,
            replies: []
          }
        ]
      },
      {
        id: 4,
        author: 'nikefootbag',
        time: '15小时前',
        content: 'Sub\'d!',
        likes: 2,
        replies: [
          {
            id: 5,
            author: 'deohvii',
            badge: '原始发帖人',
            time: '15小时前',
            content: 'Let me know what you think and thank you fir the Sub, made my day :D',
            likes: 1,
            replies: []
          }
        ]
      }
    ]
  }
])

// 提交评论
const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.unshift({
      id: Date.now(),
      author: 'CurrentUser',
      time: '刚刚',
      content: newComment.value,
      likes: 0,
      replies: []
    })
    newComment.value = ''
  }
}
</script>