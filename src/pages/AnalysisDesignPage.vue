<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white p-8">
    <div class="max-w-7xl mx-auto">
      <header class="mb-12 text-center">
        <h1 class="text-3xl font-bold mb-4">Analysis Content Design Variations</h1>
        <p class="text-gray-400">Select the best style for the Event Analysis Modal content.</p>
        
        <!-- Style Switcher -->
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <button 
            v-for="(style, index) in styles" 
            :key="index"
            @click="currentStyle = index"
            class="px-6 py-2 rounded-full border transition-all"
            :class="currentStyle === index ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#1a1a1a] border-[#333] text-gray-400 hover:border-gray-500'"
          >
            {{ style.name }}
          </button>
        </div>
      </header>

      <!-- Preview Area -->
      <div class="bg-[#050505] rounded-2xl border border-[#333] p-8 min-h-[600px] relative overflow-hidden">
        <!-- Grid Background -->
        <div class="absolute inset-0 pointer-events-none opacity-10" 
             style="background-image: linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px); background-size: 40px 40px;">
        </div>
        
        <div class="max-w-3xl mx-auto relative z-10">
          
          <!-- Style A: Classic Cards -->
          <div v-if="currentStyle === 0" class="space-y-8">
            <!-- Impact Analysis -->
            <div class="bg-[#151515] rounded-xl p-6 border border-[#2a2a2a] shadow-lg">
              <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2 border-l-4 border-purple-500 pl-3">
                <i class="fas fa-building text-purple-400"></i> 对公司的事件影响分析
              </h3>
              <div class="text-gray-300 space-y-4 text-sm leading-relaxed">
                <p>
                  该事件对 <span class="text-white font-bold">QQQ</span> 构成<span class="text-red-400 font-bold">负面影响</span>，核心在于宏观数据真空导致风险溢价上升。
                </p>
                <p>
                  <strong class="text-white">作用机制：</strong> 作为高贝塔值的成长型资产，QQQ (当前市盈率35.2x) 对利率预期极度敏感。数据的缺失创造了“黑箱效应” <span class="bg-gray-700 text-gray-300 px-1 rounded text-[10px]">21</span>，迫使投资者在美联储12月会议前进行防御性定价。
                </p>
              </div>
            </div>

            <!-- Prediction Analysis -->
            <div class="bg-[#151515] rounded-xl p-6 border border-[#2a2a2a] shadow-lg">
              <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                <i class="fas fa-chart-line text-blue-400"></i> 事件影响预期分析
              </h3>
              <div class="flex gap-4">
                <div class="w-1/3 border-r border-[#333] pr-4">
                  <div class="text-xs text-gray-500 uppercase mb-1">短期 (1-4周)</div>
                  <div class="text-red-400 font-bold">波动加剧 / 防御</div>
                  <p class="text-xs text-gray-400 mt-2">预计波动加剧且偏向防御。技术面显示TD序列出现完美的“卖出9”信号。</p>
                </div>
                <div class="w-1/3 border-r border-[#333] px-4">
                  <div class="text-xs text-gray-500 uppercase mb-1">中期 (1-6月)</div>
                  <div class="text-yellow-400 font-bold">回归基本面</div>
                  <p class="text-xs text-gray-400 mt-2">随着2026年1月数据流恢复正常，市场将重新校准利率预期。</p>
                </div>
                <div class="w-1/3 pl-4">
                  <div class="text-xs text-gray-500 uppercase mb-1">长期 (6月+)</div>
                  <div class="text-green-400 font-bold">趋势仍看涨</div>
                  <p class="text-xs text-gray-400 mt-2">历史趋势仍看涨，但需度过当前的政策迷雾期。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Style B: Minimalist Clean -->
          <div v-if="currentStyle === 1" class="space-y-12">
            <!-- Impact Analysis -->
            <div>
              <h3 class="text-2xl font-bold text-white mb-6">对公司的事件影响分析</h3>
              <div class="text-gray-300 space-y-6 text-base leading-relaxed font-light">
                <p>
                  该事件对 <span class="text-white font-medium border-b border-white/20 pb-0.5">QQQ</span> 构成<span class="text-red-400 font-medium">负面影响</span>。核心在于宏观数据真空导致风险溢价上升。
                </p>
                <div class="pl-4 border-l border-[#333]">
                  <h4 class="text-white font-bold mb-2 text-sm uppercase tracking-wider">作用机制</h4>
                  <p>作为高贝塔值的成长型资产，QQQ (当前市盈率35.2x) 对利率预期极度敏感。数据的缺失创造了“黑箱效应”，迫使投资者在美联储12月会议前进行防御性定价。</p>
                </div>
              </div>
            </div>

            <div class="h-px bg-[#222] w-full"></div>

            <!-- Prediction Analysis -->
            <div>
              <h3 class="text-2xl font-bold text-white mb-6">事件影响预期分析</h3>
              <div class="grid grid-cols-3 gap-8">
                <div>
                  <div class="text-xs text-gray-500 font-mono mb-2">SHORT TERM</div>
                  <div class="text-red-400 text-lg font-bold mb-2">波动加剧</div>
                  <p class="text-sm text-gray-400">预计波动加剧且偏向防御。技术面显示TD序列出现完美的“卖出9”信号。</p>
                </div>
                <div>
                  <div class="text-xs text-gray-500 font-mono mb-2">MEDIUM TERM</div>
                  <div class="text-white text-lg font-bold mb-2">回归基本面</div>
                  <p class="text-sm text-gray-400">随着2026年1月数据流恢复正常，市场将重新校准利率预期。</p>
                </div>
                <div>
                  <div class="text-xs text-gray-500 font-mono mb-2">LONG TERM</div>
                  <div class="text-green-400 text-lg font-bold mb-2">趋势看涨</div>
                  <p class="text-sm text-gray-400">历史趋势仍看涨，但需度过当前的政策迷雾期。</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Style C: Cyberpunk Data -->
          <div v-if="currentStyle === 2" class="space-y-8 font-mono">
            <!-- Impact Analysis -->
            <div class="relative border border-cyan-900/50 bg-[#0a0a0a] p-6 overflow-hidden group">
              <div class="absolute top-0 right-0 p-2">
                <div class="flex gap-1">
                  <div class="w-1 h-1 bg-cyan-500"></div>
                  <div class="w-1 h-1 bg-cyan-500/50"></div>
                  <div class="w-1 h-1 bg-cyan-500/20"></div>
                </div>
              </div>
              
              <h3 class="text-cyan-400 font-bold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-cyan-500"></span>
                Impact Analysis
              </h3>
              
              <div class="grid grid-cols-[120px,1fr] gap-6 mb-4">
                <div class="text-xs text-gray-500 uppercase text-right pt-1">Target</div>
                <div class="text-white font-bold">QQQ <span class="text-xs text-gray-500 ml-2">NASDAQ 100 ETF</span></div>
              </div>
              
              <div class="grid grid-cols-[120px,1fr] gap-6 mb-4">
                <div class="text-xs text-gray-500 uppercase text-right pt-1">Sentiment</div>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-32 bg-[#222] rounded-full overflow-hidden">
                    <div class="h-full bg-red-500 w-[75%]"></div>
                  </div>
                  <span class="text-red-400 text-xs font-bold">BEARISH 75%</span>
                </div>
              </div>

              <div class="grid grid-cols-[120px,1fr] gap-6">
                <div class="text-xs text-gray-500 uppercase text-right pt-1">Mechanism</div>
                <div class="text-sm text-gray-300 leading-relaxed">
                  High-beta asset sensitivity to rate expectations. Data vacuum creates "Black Box Effect" triggering defensive pricing.
                </div>
              </div>
            </div>

            <!-- Prediction Analysis -->
            <div class="relative border border-purple-900/50 bg-[#0a0a0a] p-6">
              <h3 class="text-purple-400 font-bold text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span class="w-2 h-2 bg-purple-500"></span>
                Forecast Model
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-center gap-4 bg-[#111] p-3 border-l-2 border-red-500">
                  <div class="w-16 text-xs text-gray-500">T+4W</div>
                  <div class="flex-1">
                    <div class="text-red-400 font-bold text-sm mb-1">VOLATILITY SPIKE</div>
                    <div class="text-[10px] text-gray-400">TD Sequential Sell-9 Signal confirmed.</div>
                  </div>
                </div>
                
                <div class="flex items-center gap-4 bg-[#111] p-3 border-l-2 border-yellow-500">
                  <div class="w-16 text-xs text-gray-500">T+6M</div>
                  <div class="flex-1">
                    <div class="text-yellow-400 font-bold text-sm mb-1">MEAN REVERSION</div>
                    <div class="text-[10px] text-gray-400">Rate recalibration post-data restoration.</div>
                  </div>
                </div>

                <div class="flex items-center gap-4 bg-[#111] p-3 border-l-2 border-green-500">
                  <div class="w-16 text-xs text-gray-500">T+1Y</div>
                  <div class="flex-1">
                    <div class="text-green-400 font-bold text-sm mb-1">TREND CONTINUATION</div>
                    <div class="text-[10px] text-gray-400">Historical trend remains intact.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Style D: Timeline Flow -->
          <div v-if="currentStyle === 3" class="pl-4">
            <div class="relative border-l-2 border-[#333] space-y-12 py-2">
              <!-- Node 1 -->
              <div class="relative pl-8">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111] border-2 border-purple-500"></div>
                <h3 class="text-lg font-bold text-white mb-2">事件影响分析</h3>
                <div class="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] relative">
                  <div class="absolute -left-2 top-4 w-2 h-2 bg-[#1a1a1a] border-l border-b border-[#333] transform rotate-45"></div>
                  <p class="text-sm text-gray-300 leading-relaxed">
                    该事件对 <span class="text-white font-bold">QQQ</span> 构成负面影响。核心在于宏观数据真空导致风险溢价上升。作为高贝塔值的成长型资产，QQQ 对利率预期极度敏感。
                  </p>
                </div>
              </div>

              <!-- Node 2 -->
              <div class="relative pl-8">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111] border-2 border-blue-500"></div>
                <h3 class="text-lg font-bold text-white mb-2">预期推演</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50">短期</span>
                    <span class="text-sm text-gray-300">波动加剧，偏向防御。</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded border border-yellow-900/50">中期</span>
                    <span class="text-sm text-gray-300">回归基本面，重新校准利率。</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold bg-green-900/30 text-green-400 px-2 py-1 rounded border border-green-900/50">长期</span>
                    <span class="text-sm text-gray-300">趋势仍看涨。</span>
                  </div>
                </div>
              </div>

              <!-- Node 3 -->
              <div class="relative pl-8">
                <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111] border-2 border-green-500"></div>
                <h3 class="text-lg font-bold text-white mb-2">历史回测</h3>
                <div class="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-xs text-gray-500">5天上涨概率</span>
                    <span class="text-green-400 font-bold">62%</span>
                  </div>
                  <div class="w-full bg-[#333] h-1.5 rounded-full overflow-hidden mb-4">
                    <div class="bg-green-500 h-full w-[62%]"></div>
                  </div>
                  <p class="text-xs text-gray-400">
                    尽管短期技术面承压，历史数据展示了 QQQ 的韧性。中期均值回归动力依然强劲。
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentStyle = ref(0)

const styles = [
  { name: 'Classic Cards', id: 'classic' },
  { name: 'Minimalist Clean', id: 'minimal' },
  { name: 'Cyberpunk Data', id: 'cyberpunk' },
  { name: 'Timeline Flow', id: 'timeline' }
]
</script>
