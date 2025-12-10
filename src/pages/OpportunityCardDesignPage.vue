<template>
  <div class="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900">机会列表卡片设计方案</h1>
        <p class="mt-4 text-lg text-slate-600">针对 /scalealpha/infoB?tab=opportunities 的列表视图设计 6 种不同的卡片样式。</p>
      </div>

      <div class="space-y-16">
        
        <!-- Design 1: 经典信息流 (Classic Feed) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-3">方案 1: 经典信息流 (Classic Feed)</h2>
          <p class="text-sm text-slate-500 mb-4">强调标题和描述，适合阅读型用户。左侧突出股票代码，右侧放置核心指标。</p>
          <div class="space-y-4">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-5 hover:shadow-md transition-shadow cursor-pointer">
              <!-- Left: Symbol & Score -->
              <div class="flex-shrink-0 text-center w-16">
                <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-2 font-bold text-slate-700 text-sm border border-slate-200">
                  {{ item.symbol }}
                </div>
                <div class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  {{ item.score }}
                </div>
              </div>
              
              <!-- Center: Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" 
                    :class="item.type === 'Long' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'">
                    {{ item.type }}
                  </span>
                  <span class="text-xs text-slate-400">•</span>
                  <span class="text-xs text-slate-500 font-medium">{{ item.strategy }}</span>
                  <span class="text-xs text-slate-400">•</span>
                  <span class="text-xs text-slate-400">1-10 DAYS</span>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-1 truncate">{{ item.title }}</h3>
                <p class="text-sm text-slate-500 line-clamp-2 leading-relaxed">{{ item.reason }}</p>
                
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="tag in item.tags" :key="tag" class="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded">#{{ tag }}</span>
                </div>
              </div>

              <!-- Right: Metrics -->
              <div class="flex-shrink-0 flex flex-col items-end gap-4 pl-4 border-l border-slate-100">
                <div class="text-right">
                  <div class="text-xs text-slate-400 mb-0.5">Return</div>
                  <div class="text-lg font-bold text-emerald-600">+{{ item.return }}%</div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-slate-400 mb-0.5">Risk</div>
                  <div class="text-sm font-bold" :class="getRiskColor(item.risk)">{{ item.risk }}</div>
                </div>
                <div class="text-[10px] text-slate-300 font-mono mt-auto">GEMINI</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Design 2: 紧凑数据行 (Compact Data Row) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-indigo-500 pl-3">方案 2: 紧凑数据行 (Compact Data Row)</h2>
          <p class="text-sm text-slate-500 mb-4">类似表格的高密度布局，适合快速扫描大量机会。强调数据对比。</p>
          <div class="space-y-3">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="bg-white rounded-lg border border-slate-200 p-4 flex items-center gap-4 hover:border-indigo-300 transition-colors cursor-pointer group">
              <!-- Status Bar -->
              <div class="w-1 h-10 rounded-full" :class="item.type === 'Long' ? 'bg-emerald-500' : 'bg-red-500'"></div>
              
              <!-- Symbol -->
              <div class="w-16 flex-shrink-0">
                <div class="font-bold text-slate-900">{{ item.symbol }}</div>
                <div class="text-[10px] text-slate-400">US Stock</div>
              </div>

              <!-- Main Info -->
              <div class="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
                <div class="col-span-5">
                  <div class="font-medium text-slate-800 truncate text-sm group-hover:text-indigo-600 transition-colors">{{ item.title }}</div>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] bg-slate-100 text-slate-500 px-1.5 rounded">{{ item.strategy }}</span>
                    <span class="text-[10px] text-slate-400 truncate">{{ item.tags.join(', ') }}</span>
                  </div>
                </div>
                
                <div class="col-span-2 text-center">
                  <div class="text-[10px] text-slate-400 uppercase">Rating</div>
                  <div class="font-bold text-slate-700">A+</div>
                </div>
                
                <div class="col-span-2 text-center">
                  <div class="text-[10px] text-slate-400 uppercase">Return</div>
                  <div class="font-bold text-emerald-600">+{{ item.return }}%</div>
                </div>

                <div class="col-span-3 flex justify-end items-center gap-3">
                   <div class="text-right">
                      <div class="text-[10px] text-slate-400 uppercase">Score</div>
                      <div class="font-bold text-indigo-600">{{ item.score }}</div>
                   </div>
                   <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Design 3: 现代卡片 (Modern Card) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-purple-500 pl-3">方案 3: 现代卡片 (Modern Card)</h2>
          <p class="text-sm text-slate-500 mb-4">使用大圆角和柔和的阴影，将关键指标以徽章形式展示，视觉更轻盈。</p>
          <div class="space-y-4">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="bg-white rounded-2xl p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_20px_-3px_rgba(0,0,0,0.1),0_10px_30px_-2px_rgba(0,0,0,0.06)] transition-shadow cursor-pointer border border-transparent hover:border-purple-100">
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div class="bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
                    {{ item.symbol }}
                  </div>
                  <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{{ item.strategy }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md" 
                    :class="item.type === 'Long' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'">
                    <span class="w-1.5 h-1.5 rounded-full" :class="item.type === 'Long' ? 'bg-emerald-500' : 'bg-red-500'"></span>
                    {{ item.type }}
                  </span>
                </div>
              </div>
              
              <div class="flex gap-6">
                <div class="flex-1">
                  <h3 class="text-base font-bold text-slate-800 mb-1">{{ item.title }}</h3>
                  <p class="text-xs text-slate-500 line-clamp-2 mb-3">{{ item.reason }}</p>
                  <div class="flex items-center gap-4 text-xs text-slate-400">
                    <span class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      1-10 Days
                    </span>
                    <span class="flex items-center gap-1">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Score: {{ item.score }}
                    </span>
                  </div>
                </div>
                
                <div class="flex flex-col gap-2 min-w-[100px]">
                  <div class="bg-slate-50 rounded-xl p-2 text-center border border-slate-100">
                    <div class="text-[10px] text-slate-400 uppercase font-bold">Return</div>
                    <div class="text-lg font-black text-emerald-500">+{{ item.return }}%</div>
                  </div>
                  <div class="flex justify-between px-1">
                    <span class="text-[10px] text-slate-400">Risk</span>
                    <span class="text-[10px] font-bold" :class="getRiskColor(item.risk)">{{ item.risk }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Design 4: 极简分割 (Minimal Split) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-slate-800 pl-3">方案 4: 极简分割 (Minimal Split)</h2>
          <p class="text-sm text-slate-500 mb-4">去除多余装饰，利用垂直分割线和排版区分信息，专业感强。</p>
          <div class="space-y-0 divide-y divide-slate-200 border-y border-slate-200 bg-white">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="py-4 px-4 flex items-center gap-6 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div class="w-12 text-center">
                <div class="text-lg font-black text-slate-900">{{ item.symbol }}</div>
                <div class="text-[10px] font-bold text-slate-400">A+</div>
              </div>
              
              <div class="w-px h-10 bg-slate-200"></div>
              
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline gap-2 mb-1">
                  <h3 class="text-sm font-bold text-slate-800 truncate">{{ item.title }}</h3>
                  <span class="text-[10px] text-slate-400 uppercase tracking-wide">{{ item.strategy }}</span>
                </div>
                <div class="flex gap-2">
                  <span class="text-[10px] border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">{{ item.type }}</span>
                  <span class="text-[10px] border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">{{ item.risk }} Risk</span>
                  <span class="text-[10px] border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">Gemini</span>
                </div>
              </div>
              
              <div class="text-right min-w-[80px]">
                <div class="text-xl font-light text-emerald-600">{{ item.return }}%</div>
                <div class="text-[10px] text-slate-400">Exp. Return</div>
              </div>
              
              <div class="text-slate-300 group-hover:text-slate-600 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </div>
            </div>
          </div>
        </section>

        <!-- Design 5: 仪表盘风格 (Dashboard Widget) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">方案 5: 仪表盘风格 (Dashboard Widget)</h2>
          <p class="text-sm text-slate-500 mb-4">左侧带有醒目的评分色块，强调 AI 评分和置信度。</p>
          <div class="space-y-4">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex hover:shadow-md transition-shadow cursor-pointer">
              <!-- Left Score Panel -->
              <div class="w-24 bg-slate-50 border-r border-slate-100 flex flex-col items-center justify-center p-3 text-center">
                <div class="text-2xl font-black text-slate-800">{{ item.score }}</div>
                <div class="text-[10px] text-slate-400 uppercase font-bold mb-2">AI Score</div>
                <div class="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-orange-500" :style="{ width: item.score + '%' }"></div>
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 p-4 flex flex-col justify-center">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <span class="font-bold text-slate-900 mr-2">{{ item.symbol }}</span>
                    <span class="text-xs text-slate-500">{{ item.title }}</span>
                  </div>
                  <span class="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{{ item.type }}</span>
                </div>
                <div class="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span>{{ item.strategy }}</span>
                  <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{{ item.risk }} Risk</span>
                  <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span class="text-emerald-600 font-bold">Target: +{{ item.return }}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Design 6: 标签式 (Tag Based) -->
        <section>
          <h2 class="text-xl font-bold text-slate-800 mb-4 border-l-4 border-teal-500 pl-3">方案 6: 标签式 (Tag Based)</h2>
          <p class="text-sm text-slate-500 mb-4">将所有属性标签化，整齐排列，适合属性较多的场景。</p>
          <div class="space-y-3">
            <div v-for="item in mockData.slice(0, 2)" :key="item.id" class="bg-white rounded-xl border border-slate-200 p-4 hover:border-teal-400 transition-colors cursor-pointer">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
                    {{ item.symbol[0] }}
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-900 text-sm">{{ item.symbol }} <span class="font-normal text-slate-500 mx-1">-</span> {{ item.title }}</h3>
                    <div class="flex flex-wrap gap-2 mt-1.5">
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                        {{ item.strategy }}
                      </span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium"
                        :class="item.type === 'Long' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'">
                        {{ item.type }}
                      </span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                        Score: {{ item.score }}
                      </span>
                      <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-50 text-orange-700">
                        {{ item.risk }} Risk
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center gap-6 pl-14 sm:pl-0">
                  <div class="text-right">
                    <div class="text-[10px] text-slate-400 uppercase">Return</div>
                    <div class="font-bold text-slate-800 text-sm">+{{ item.return }}%</div>
                  </div>
                  <div class="text-right">
                    <div class="text-[10px] text-slate-400 uppercase">Duration</div>
                    <div class="font-bold text-slate-800 text-sm">1-10d</div>
                  </div>
                  <button class="text-slate-400 hover:text-teal-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mockData = ref([
  { 
    id: 1,
    symbol: 'MSFT', 
    title: '微软云计算+AI双轮驱动', 
    type: 'Long', 
    strategy: '基本面分析', 
    risk: 'Low', 
    tags: ['Cloud', 'AI'], 
    score: 95, 
    return: '15.2', 
    reason: 'AI analysis indicates a strong upside potential based on recent fundamental signals. Market sentiment is currently bullish with high institutional interest.' 
  },
  { 
    id: 2,
    symbol: 'TSLA', 
    title: '特斯拉短期回调压力', 
    type: 'Short', 
    strategy: '技术分析', 
    risk: 'High', 
    tags: ['EV', 'Tech'], 
    score: 82, 
    return: '8.5', 
    reason: 'Technical indicators suggest overbought conditions. Short-term correction expected as momentum slows down.' 
  }
])

const getRiskColor = (risk) => {
  switch(risk) {
    case 'Low': return 'text-emerald-600'
    case 'Med': return 'text-yellow-600'
    case 'High': return 'text-red-600'
    default: return 'text-slate-600'
  }
}
</script>
