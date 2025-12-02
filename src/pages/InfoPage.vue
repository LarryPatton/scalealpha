<template>
  <div class="min-h-screen bg-[#1a1a1a] relative overflow-hidden flex flex-col">
    <!-- Background Decorations -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

    <!-- Mobile Menu Toggle Button -->
    <button
      @click="toggleMobileSidebar"
      class="lg:hidden fixed top-20 left-4 z-50 p-3 bg-[#2a2a2a] border border-[#404040] rounded-lg shadow-xl hover:border-blue-500 transition"
    >
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="showMobileSidebar"
      @click="toggleMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
    ></div>

    <!-- Main Layout: Sidebar + Content -->
    <div class="flex flex-1 h-screen">
      <!-- Left Sidebar: Watchlist Groups (Desktop) / Drawer (Mobile) -->
      <div
        :class="[
          'lg:relative fixed inset-y-0 left-0 z-40 transition-transform duration-300',
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <WatchlistSidebar
        :selected-group-id="selectedGroupId"
        :custom-groups="watchlists"
        :total-following-count="totalFollowingCount"
          @select-group="handleSelectGroup"
          @create-group="handleCreateGroup"
          @rename-group="handleRenameGroup"
          @delete-group="handleDeleteGroup"
          @set-default-group="handleSetDefaultGroup"
        />
      </div>

      <!-- Right Content Area -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-6 lg:p-8">
          <!-- Header -->
          <div class="text-center mb-6 relative z-10">
            <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">Info 信息中心</h1>
            <p class="text-gray-500 text-sm">实时聚合市场动态与投资机会</p>
          </div>

          <!-- Tab Navigation -->
          <div class="mb-8 relative z-10">
            <div class="flex items-center justify-center gap-8 border-b border-[#404040]">
              <button
                @click="activeTab = 'opportunity'"
                :class="[
                  'pb-3 px-2 text-base font-medium transition-all duration-300 relative',
                  activeTab === 'opportunity'
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-gray-200'
                ]"
              >
                机会推荐
                <div
                  v-if="activeTab === 'opportunity'"
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all duration-300"
                ></div>
              </button>
              
              <button
                @click="activeTab = 'analysis'"
                :class="[
                  'pb-3 px-2 text-base font-medium transition-all duration-300 relative',
                  activeTab === 'analysis'
                    ? 'text-white font-semibold'
                    : 'text-gray-400 hover:text-gray-200'
                ]"
              >
                股票分析
                <div
                  v-if="activeTab === 'analysis'"
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 transition-all duration-300"
                ></div>
              </button>
            </div>
          </div>

          <!-- Tab Content Container -->
          <div class="space-y-4 relative z-10">
            <!-- Tab 1: 机会推荐 -->
            <template v-if="activeTab === 'opportunity'">
              <!-- Official Recommendations -->
              <InfoSection 
                v-if="displayedContent.official.length > 0"
                title="官方推荐" 
                type="official" 
                :items="displayedContent.official"
                @card-click="(id) => navigateToDetail('official', id)"
              />

              <!-- Community Recommendations -->
              <InfoSection 
                v-if="displayedContent.community.length > 0"
                title="社区推荐" 
                type="community" 
                :items="displayedContent.community"
                @card-click="(id) => navigateToDetail('community', id)"
              />
            </template>

            <!-- Tab 2: 股票分析 -->
            <template v-else-if="activeTab === 'analysis'">
              <!-- Market Attribution -->
              <InfoSection 
                v-if="displayedContent.market.length > 0"
                title="大盘归因" 
                type="market" 
                :items="displayedContent.market"
                @card-click="(id) => navigateToDetail('market', id)"
              />

              <!-- ETF Attribution -->
              <InfoSection 
                v-if="displayedContent.etf.length > 0"
                title="ETF/基金归因" 
                type="etf" 
                :items="displayedContent.etf"
                @card-click="(id) => navigateToDetail('etf', id)"
              />

              <!-- Stock Attribution -->
              <InfoSection 
                v-if="displayedContent.stock.length > 0"
                title="个股归因" 
                type="stock" 
                :items="displayedContent.stock"
                @card-click="(id) => navigateToDetail('stock', id)"
              />
            </template>
          </div>

          <!-- Empty State -->
          <div v-if="totalItemsCount === 0" class="text-center py-32 relative z-10">
            <div class="inline-block p-6 rounded-full bg-[#2a2a2a] border border-[#404040] mb-6 shadow-xl">
              <svg class="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">暂无相关内容</h3>
            <p class="text-gray-500">请尝试切换筛选条件或稍后再试</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import InfoSection from '../components/info/InfoSection.vue'
import WatchlistSidebar from '../components/info/WatchlistSidebar.vue'
import { useWatchlists } from '../composables/useWatchlists'

const router = useRouter()
const showMobileSidebar = ref(false)

// Tab state
const activeTab = ref('opportunity') // 'opportunity' | 'analysis'

// Mobile sidebar toggle
const toggleMobileSidebar = () => {
  showMobileSidebar.value = !showMobileSidebar.value
}

// Watchlist management
const {
  watchlists,
  selectedGroupId,
  selectedGroupAssets,
  totalFollowingCount,
  createGroup,
  renameGroup,
  deleteGroup,
  setDefaultGroup,
  selectGroup
} = useWatchlists()

// Recommended Mock Data - 推荐内容数据（与自选组数据区分）
const recommendedItems = [
  // ========== 官方推荐 (Official Recommendations) ==========
  {
    id: 'r-o1',
    type: 'official',
    symbol: 'PLTR',
    name: 'Palantir：AI大数据平台新机遇',
    strategy: '基本面分析 + AI分析',
    period: '3-6个月',
    risk: '中等',
    score: 86,
    change: 5.2,
    expectedReturn: 28.5,
    entryPrice: 18.50,
    targetPrice: 23.80,
    reasoning: [
      'AI平台产品AIP快速推广，商业客户数量激增',
      '政府合同持续稳定，国防业务提供护城河',
      '盈利能力大幅改善，现金流转正'
    ],
    tags: ['AI平台', '大数据', '政府合同'],
    summary: 'Palantir的AI平台AIP在企业市场获得广泛认可，商业客户数量同比增长超50%。政府业务稳定，盈利能力持续改善。',
    isFollowing: false
  },
  {
    id: 'r-o2',
    type: 'official',
    symbol: 'AVGO',
    name: '博通：AI基础设施的隐形冠军',
    strategy: '技术分析 + 基本面分析',
    period: '3-6个月',
    risk: '低',
    score: 90,
    change: 3.8,
    expectedReturn: 16.2,
    entryPrice: 885.40,
    targetPrice: 1028.70,
    reasoning: [
      '定制AI芯片需求旺盛，谷歌TPU主要供应商',
      '网络芯片在数据中心市场占据主导地位',
      '高股息回报，现金流稳健'
    ],
    tags: ['AI芯片', '网络设备', '高股息'],
    summary: '博通在AI基础设施领域扮演关键角色，定制芯片和网络设备需求强劲。稳定的现金流和高股息使其成为优质投资标的。',
    isFollowing: false
  },
  {
    id: 'r-o3',
    type: 'official',
    symbol: 'COIN',
    name: '加密货币交易所Coinbase反弹机会',
    strategy: '事件驱动 + 趋势分析',
    period: '1-3个月',
    risk: '极高',
    score: 75,
    change: 8.5,
    expectedReturn: 35.8,
    entryPrice: 128.70,
    targetPrice: 174.80,
    reasoning: [
      '比特币ETF审批预期升温，交易量大幅回升',
      '加密货币市场情绪好转，机构资金流入',
      '监管环境边际改善，合规优势凸显'
    ],
    tags: ['加密货币', '高风险', '监管利好'],
    summary: 'Coinbase受益于加密货币市场回暖和ETF审批预期，交易量显著增长。尽管波动性大，但短期反弹机会明显。',
    isFollowing: false
  },
  {
    id: 'r-o4',
    type: 'official',
    symbol: 'SNOW',
    name: 'Snowflake数据云转型价值',
    strategy: '基本面分析 + 商业分析',
    period: '3-6个月',
    risk: '中等',
    score: 81,
    change: 4.1,
    expectedReturn: 19.3,
    entryPrice: 175.30,
    targetPrice: 209.10,
    reasoning: [
      '数据云平台市场需求持续增长',
      '产品创新加速，AI功能集成吸引客户',
      '大客户续费率高，营收增速稳定'
    ],
    tags: ['云计算', '数据分析', 'SaaS'],
    summary: 'Snowflake的数据云平台在企业数字化转型中扮演重要角色，AI功能集成提升产品竞争力，客户留存率保持高位。',
    isFollowing: false
  },

  // ========== 大盘归因 (Market) ==========
  {
    id: 'r-m1',
    type: 'market',
    code: 'VIX',
    name: 'VIX波动率指数',
    change: -3.2,
    summary: '市场波动率指数VIX大幅下降，投资者风险偏好回升。恐慌情绪消退，有利于股市继续上涨。',
    tags: ['波动率', '情绪指标', '看涨'],
    isFollowing: false
  },
  {
    id: 'r-m2',
    type: 'market',
    code: 'NDX',
    name: 'Nasdaq 100 Index',
    change: 2.1,
    summary: '纳斯达克100指数创近期新高，科技股领涨市场。AI、云计算板块表现强劲，资金持续流入成长股。',
    tags: ['科技指数', '创新高', '成长股'],
    isFollowing: false
  },

  // ========== 个股归因 (Stocks) ==========
  {
    id: 'r-s1',
    type: 'stock',
    code: 'PLTR',
    name: 'Palantir Technologies',
    price: '18.50',
    change: 5.2,
    summary: 'Palantir股价大涨，AI平台AIP商业化进展超预期。新增企业客户数量创季度新高，市场看好长期增长潜力。',
    tags: ['AI平台', '财报利好', '强势股'],
    isFollowing: false
  },
  {
    id: 'r-s2',
    type: 'stock',
    code: 'COIN',
    name: 'Coinbase Global Inc.',
    price: '128.70',
    change: 8.5,
    summary: '比特币突破关键阻力位，Coinbase交易量激增。加密货币ETF审批预期推动股价大幅上涨。',
    tags: ['加密货币', '交易量', '暴涨'],
    isFollowing: false
  },
  {
    id: 'r-s3',
    type: 'stock',
    code: 'AVGO',
    name: 'Broadcom Inc.',
    price: '885.40',
    change: 3.8,
    summary: '博通发布强劲财报，AI芯片订单饱满。管理层上调全年业绩指引，分析师纷纷上调目标价。',
    tags: ['AI芯片', '财报', '业绩上调'],
    isFollowing: false
  },
  {
    id: 'r-s4',
    type: 'stock',
    code: 'SNOW',
    name: 'Snowflake Inc.',
    price: '175.30',
    change: 4.1,
    summary: 'Snowflake发布AI数据云新功能，客户反响积极。大客户续约率超95%，营收增长持续稳健。',
    tags: ['数据云', 'AI', '客户增长'],
    isFollowing: false
  },
  {
    id: 'r-s5',
    type: 'stock',
    code: 'SHOP',
    name: 'Shopify Inc.',
    price: '68.90',
    change: 6.3,
    summary: 'Shopify电商平台假日季表现强劲，商家GMV大幅增长。AI购物助手功能提升转化率，盈利能力改善。',
    tags: ['电商', '假日季', 'AI应用'],
    isFollowing: false
  },

  // ========== ETF/基金分析 (ETF) ==========
  {
    id: 'r-e1',
    type: 'etf',
    code: 'SOXL',
    name: 'Direxion Daily Semiconductor Bull 3X',
    change: 7.5,
    summary: '半导体三倍做多ETF大涨，芯片板块集体走强。AI芯片需求爆发，台积电、英伟达等权重股领涨。',
    tags: ['半导体', '杠杆ETF', '高波动'],
    isFollowing: false
  },
  {
    id: 'r-e2',
    type: 'etf',
    code: 'ARKK',
    name: 'ARK Innovation ETF',
    change: 4.8,
    summary: 'ARK创新基金反弹，科技成长股重获青睐。特斯拉、Coinbase等重仓股集体上涨，资金重新流入高成长板块。',
    tags: ['创新科技', '成长股', '反弹'],
    isFollowing: false
  },
  {
    id: 'r-e3',
    type: 'etf',
    code: 'BOTZ',
    name: 'Global X Robotics & AI ETF',
    change: 3.2,
    summary: '机器人与AI ETF稳步上涨，人形机器人概念升温。特斯拉Optimus、Figure AI等项目进展推动板块情绪。',
    tags: ['机器人', 'AI', '未来科技'],
    isFollowing: false
  },
  {
    id: 'r-e4',
    type: 'etf',
    code: 'HACK',
    name: 'ETFMG Prime Cyber Security ETF',
    change: 2.5,
    summary: '网络安全ETF上涨，勒索软件攻击事件频发推动需求。企业加大安全投入，板块景气度提升。',
    tags: ['网络安全', '防御性', '需求增长'],
    isFollowing: false
  },

  // ========== 社区机会 (Community) ==========
  {
    id: 'r-c1',
    type: 'community',
    author: 'CryptoKing',
    time: '1小时前',
    title: '比特币突破$38000，牛市真的来了吗？',
    content: 'BTC突破关键阻力位$38000，成交量放大。技术面上，MACD金叉，RSI进入超买区。但需要警惕短期回调风险...',
    likes: 892,
    comments: 267,
    isFollowing: false
  },
  {
    id: 'r-c2',
    type: 'community',
    author: 'AIInvestor',
    time: '3小时前',
    title: 'Palantir是下一个英伟达吗？',
    content: 'Palantir的AIP平台在企业AI市场快速渗透，商业模式类似英伟达的CUDA生态。估值虽高，但成长空间巨大...',
    likes: 645,
    comments: 198,
    isFollowing: false
  },
  {
    id: 'r-c3',
    type: 'community',
    author: 'GrowthHunter',
    time: '5小时前',
    title: 'SaaS板块反弹信号确认',
    content: 'Snowflake、CrowdStrike等SaaS龙头股技术面集体走强。云计算需求复苏，高成长SaaS股估值修复行情启动...',
    likes: 523,
    comments: 145,
    isFollowing: false
  },
  {
    id: 'r-c4',
    type: 'community',
    author: 'SectorRotator',
    time: '8小时前',
    title: '板块轮动：从大盘股到小盘股',
    content: '罗素2000指数近期跑赢标普500，资金开始向小盘股流动。经济软着陆预期升温，小盘成长股或迎来机会...',
    likes: 734,
    comments: 201,
    isFollowing: false
  },
]

// Mock Data - 扩充演示数据以更好展示自选组功能
const allItems = [
  // ========== 官方推荐 (Official Recommendations) ==========
  {
    id: 'o1',
    type: 'official',
    symbol: 'NVDA',
    name: '英伟达AI芯片投资机会',
    strategy: '技术分析 + 基本面分析',
    period: '1-3个月',
    risk: '中等',
    score: 88,
    change: 3.45,
    expectedReturn: 15.8,
    entryPrice: 485.50,
    targetPrice: 562.20,
    reasoning: [
      'AI芯片需求持续爆发，数据中心业务营收预计翻倍',
      '技术面突破关键阻力位，多家投行上调目标价',
      '财报超预期，市场情绪偏向乐观'
    ],
    tags: ['AI芯片', '强势股', '高成长'],
    summary: '英伟达在AI芯片领域持续领先，新款H100/H200芯片供不应求。基于技术分析和基本面分析的综合评估，预计未来1-3个月有15.8%的上涨空间。',
    isFollowing: true
  },
  {
    id: 'o2',
    type: 'official',
    symbol: 'MSFT',
    name: '微软云计算+AI双轮驱动',
    strategy: '基本面分析 + 商业分析',
    period: '3-6个月',
    risk: '低',
    score: 85,
    change: 2.15,
    expectedReturn: 12.3,
    entryPrice: 375.80,
    targetPrice: 422.00,
    reasoning: [
      'Azure云服务增速超预期，市场份额持续扩大',
      'Copilot商业化进展顺利，AI产品矩阵完善',
      '蓝筹科技股，防御性与成长性兼具'
    ],
    tags: ['云计算', 'AI应用', '蓝筹股'],
    summary: 'Azure云业务保持强劲增长，AI产品Copilot已在企业端大规模部署。作为AI时代的最大受益者之一，微软展现出稳健的成长性。',
    isFollowing: true
  },
  {
    id: 'o3',
    type: 'official',
    symbol: 'META',
    name: 'Meta广告业务全面复苏',
    strategy: '事件驱动 + 量化分析',
    period: '1个月-6个月',
    risk: '中等',
    score: 82,
    change: 4.25,
    expectedReturn: 18.5,
    entryPrice: 325.60,
    targetPrice: 385.80,
    reasoning: [
      '财报超预期，广告收入恢复双位数增长',
      '效率年战略成效显著，运营成本大幅下降',
      '元宇宙投资缩减，市场情绪转向积极'
    ],
    tags: ['社交媒体', '广告复苏', '扭亏为盈'],
    summary: 'Meta第三季度财报大超预期，广告业务全面复苏。管理层推行的效率年策略见效，成本控制显著改善盈利能力。',
    isFollowing: false
  },
  {
    id: 'o4',
    type: 'official',
    symbol: 'AMD',
    name: 'AMD AI芯片挑战者地位',
    strategy: '技术分析 + 竞争分析',
    period: '1-3个月',
    risk: '高',
    score: 79,
    change: 2.85,
    expectedReturn: 22.6,
    entryPrice: 145.30,
    targetPrice: 178.10,
    reasoning: [
      'MI300系列AI芯片对标英伟达，性价比优势明显',
      '数据中心CPU市场份额持续扩大',
      '服务器业务强劲，但面临激烈竞争'
    ],
    tags: ['AI芯片', '竞争', '高风险高回报'],
    summary: 'AMD推出MI300系列AI加速器，凭借性价比优势抢占市场。尽管面临英伟达的强势竞争，但在数据中心领域表现亮眼。',
    isFollowing: true
  },
  {
    id: 'o5',
    type: 'official',
    symbol: 'GOOGL',
    name: 'Google AI搜索引擎升级',
    strategy: '基本面分析 + AI分析',
    period: '3-6个月',
    risk: '低',
    score: 84,
    change: 1.75,
    expectedReturn: 13.2,
    entryPrice: 138.50,
    targetPrice: 156.80,
    reasoning: [
      'Bard AI集成搜索，用户体验大幅提升',
      '搜索广告收入恢复增长，云业务盈利改善',
      '估值合理，长期价值投资标的'
    ],
    tags: ['AI搜索', '广告', '云计算'],
    summary: 'Google在搜索引擎中整合Bard AI，提升用户体验的同时保持广告收入增长。云业务GCP盈利能力持续改善。',
    isFollowing: false
  },
  {
    id: 'o6',
    type: 'official',
    symbol: 'TSLA',
    name: '特斯拉回调后的买入机会',
    strategy: '趋势分析 + 事件驱动',
    period: '1天-1个月',
    risk: '极高',
    score: 72,
    change: -1.80,
    expectedReturn: 25.4,
    reasoning: [
      '短期回调创造买入机会，长期成长逻辑未变',
      'Cybertruck即将交付，新车型催化剂临近',
      '自动驾驶技术持续进步，但监管风险需关注'
    ],
    tags: ['电动车', '回调买入', '高波动'],
    summary: '特斯拉因召回事件短期承压，但长期成长逻辑未改变。Cybertruck交付在即，为高风险偏好投资者提供入场机会。',
    isFollowing: true
  },

  // ========== 大盘归因 (Market) ==========
  {
    id: 'm1',
    type: 'market',
    code: 'SPY',
    name: 'S&P 500 ETF Trust',
    change: 1.25,
    summary: '标普500指数今日表现强劲，主要受科技股财报超预期推动。市场情绪偏向乐观，波动率指数VIX回落。',
    tags: ['大盘', '科技驱动', '低波动'],
    isFollowing: true
  },
  {
    id: 'm2',
    type: 'market',
    code: 'QQQ',
    name: 'Invesco QQQ Trust',
    change: 1.56,
    summary: '纳指100表现优于标普，科技七巨头领涨。技术面上突破关键阻力位，后市看涨。',
    tags: ['科技股', '突破', '强势'],
    isFollowing: false
  },
  {
    id: 'm3',
    type: 'market',
    code: 'DIA',
    name: 'SPDR Dow Jones Industrial',
    change: 0.85,
    summary: '道琼斯工业指数受金融板块提振，银行股集体上涨。市场预期美联储加息周期接近尾声。',
    tags: ['道指', '金融', '稳健'],
    isFollowing: false
  },
  {
    id: 'm4',
    type: 'market',
    code: 'IWM',
    name: 'Russell 2000 ETF',
    change: -0.65,
    summary: '小盘股表现疲软，经济衰退担忧加剧。罗素2000指数跌破关键支撑位，资金向大盘股流动。',
    tags: ['小盘股', '回调', '风险'],
    isFollowing: false
  },

  // ========== 个股归因 (Stocks) ==========
  {
    id: 's1',
    type: 'stock',
    code: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '485.09',
    change: 3.45,
    summary: '英伟达发布新款AI芯片，性能提升显著，多家投行上调目标价。数据中心业务营收预计将翻倍。',
    tags: ['AI芯片', '财报利好', '强势股'],
    isFollowing: true
  },
  {
    id: 's2',
    type: 'stock',
    code: 'TSLA',
    name: 'Tesla, Inc.',
    price: '235.45',
    change: -1.80,
    summary: '特斯拉因自动驾驶软件问题宣布召回部分车辆，股价承压。分析师对Q4交付量持谨慎态度。',
    tags: ['电动车', '利空消息', '回调'],
    isFollowing: true
  },
  {
    id: 's3',
    type: 'stock',
    code: 'MSFT',
    name: 'Microsoft Corporation',
    price: '378.25',
    change: 2.15,
    summary: 'Azure云服务营收增速超预期，AI产品Copilot商业化进展顺利。微软成为AI时代最大受益者之一。',
    tags: ['云计算', 'AI应用', '蓝筹股'],
    isFollowing: true
  },
  {
    id: 's4',
    type: 'stock',
    code: 'AAPL',
    name: 'Apple Inc.',
    price: '188.50',
    change: 0.95,
    summary: 'iPhone 15系列销售稳健，中国市场表现强劲。服务业务持续高增长，毛利率提升明显。',
    tags: ['消费电子', '品牌', '现金流'],
    isFollowing: false
  },
  {
    id: 's5',
    type: 'stock',
    code: 'GOOGL',
    name: 'Alphabet Inc.',
    price: '142.30',
    change: 1.75,
    summary: 'Google搜索广告收入恢复增长，Bard AI进展超预期。云业务盈利能力持续改善，成本控制得当。',
    tags: ['互联网', 'AI搜索', '广告'],
    isFollowing: false
  },
  {
    id: 's6',
    type: 'stock',
    code: 'META',
    name: 'Meta Platforms Inc.',
    price: '325.80',
    change: 4.25,
    summary: 'Meta发布财报超预期，广告业务全面复苏。元宇宙投资缩减，市场看好效率年战略。',
    tags: ['社交媒体', '广告', '扭亏'],
    isFollowing: false
  },
  {
    id: 's7',
    type: 'stock',
    code: 'AMZN',
    name: 'Amazon.com Inc.',
    price: '152.90',
    change: 1.35,
    summary: '电商业务恢复增长，AWS云服务保持领先地位。Prime会员增长加速，物流效率提升带动利润改善。',
    tags: ['电商', '云计算', '物流'],
    isFollowing: false
  },
  {
    id: 's8',
    type: 'stock',
    code: 'AMD',
    name: 'Advanced Micro Devices',
    price: '115.40',
    change: 2.85,
    summary: 'AMD发布MI300系列AI芯片，对标英伟达H100。数据中心CPU市场份额持续扩大，服务器业务强劲。',
    tags: ['芯片', 'AI', '竞争'],
    isFollowing: true
  },
  {
    id: 's9',
    type: 'stock',
    code: 'NFLX',
    name: 'Netflix Inc.',
    price: '445.20',
    change: -0.85,
    summary: '订阅用户增长放缓，广告层级推广不及预期。内容成本高企，市场担忧盈利能力。',
    tags: ['流媒体', '内容', '增长放缓'],
    isFollowing: false
  },
  {
    id: 's10',
    type: 'stock',
    code: 'CRM',
    name: 'Salesforce Inc.',
    price: '215.60',
    change: 1.95,
    summary: '企业级AI产品Einstein GPT受到客户青睐。订阅续费率创新高，云端CRM市占率稳居第一。',
    tags: ['SaaS', 'CRM', 'AI'],
    isFollowing: false
  },

  // ========== ETF/基金分析 (ETF) ==========
  {
    id: 'e1',
    type: 'etf',
    code: 'ARKK',
    name: 'ARK Innovation ETF',
    change: -2.10,
    summary: '创新型科技股今日普遍回调，ARKK受重仓股特斯拉下跌拖累，表现不及大盘。资金流出迹象明显。',
    tags: ['高成长', '高波动', '资金流出'],
    isFollowing: false
  },
  {
    id: 'e2',
    type: 'etf',
    code: 'XLE',
    name: 'Energy Select Sector SPDR',
    change: 0.45,
    summary: '能源板块随油价小幅反弹，地缘政治风险仍是主要驱动因素。巴菲特继续增持西方石油。',
    tags: ['能源', '油价', '防御性'],
    isFollowing: false
  },
  {
    id: 'e3',
    type: 'etf',
    code: 'VGT',
    name: 'Vanguard Info Tech ETF',
    change: 2.05,
    summary: '科技板块ETF表现强劲，持仓集中于微软、苹果、英伟达等优质标的。费率低廉，长期配置首选。',
    tags: ['科技', '低费率', '长期持有'],
    isFollowing: true
  },
  {
    id: 'e4',
    type: 'etf',
    code: 'TLT',
    name: 'iShares 20+ Year Treasury',
    change: -0.55,
    summary: '长期国债ETF受加息预期影响下跌。收益率曲线倒挂持续，市场担忧经济衰退风险。',
    tags: ['国债', '利率', '避险'],
    isFollowing: true
  },
  {
    id: 'e5',
    type: 'etf',
    code: 'GLD',
    name: 'SPDR Gold Trust',
    change: 0.75,
    summary: '黄金价格小幅上涨，美元走弱提供支撑。避险情绪升温，央行购金需求强劲。',
    tags: ['黄金', '避险', '抗通胀'],
    isFollowing: true
  },
  {
    id: 'e6',
    type: 'etf',
    code: 'KWEB',
    name: 'KraneShares CSI China Internet',
    change: 3.25,
    summary: '中概互联网ETF大涨，监管政策边际改善。阿里巴巴、腾讯等核心持仓反弹强劲。',
    tags: ['中概股', '互联网', '反弹'],
    isFollowing: true
  },
  {
    id: 'e7',
    type: 'etf',
    code: 'SOXX',
    name: 'iShares Semiconductor ETF',
    change: 2.80,
    summary: '半导体ETF领涨，AI芯片需求爆发式增长。台积电、英伟达、AMD集体上涨。',
    tags: ['半导体', 'AI', '高增长'],
    isFollowing: false
  },
  {
    id: 'e8',
    type: 'etf',
    code: 'XLF',
    name: 'Financial Select Sector SPDR',
    change: 0.95,
    summary: '金融板块受益于利率上行，银行净息差扩大。摩根大通、美国银行领涨。',
    tags: ['金融', '银行', '利率敏感'],
    isFollowing: false
  },

  // ========== 社区机会 (Community) ==========
  {
    id: 'c1',
    type: 'community',
    author: 'AlphaHunter',
    time: '2小时前',
    title: '关于下周美联储会议的预测',
    content: '根据最新的通胀数据，我认为美联储大概率会维持利率不变，但鲍威尔的讲话可能会偏向鹰派。建议关注美元指数的动向。',
    likes: 128,
    comments: 45,
    isFollowing: false
  },
  {
    id: 'c2',
    type: 'community',
    author: 'QuantMaster',
    time: '5小时前',
    title: '分享一个基于波动率的套利策略',
    content: '最近市场波动率较低，适合构建日历价差策略。具体操作如下：买入近月看涨期权，卖出远月看涨期权...',
    likes: 256,
    comments: 89,
    isFollowing: true
  },
  {
    id: 'c3',
    type: 'community',
    author: 'TechGuru',
    time: '1天前',
    title: 'AI芯片赛道深度分析',
    content: '英伟达、AMD、英特尔三家巨头竞争格局分析。从技术路线、市场份额、客户结构等维度对比，重点看好英伟达的护城河...',
    likes: 512,
    comments: 156,
    isFollowing: false
  },
  {
    id: 'c4',
    type: 'community',
    author: 'ValueInvestor',
    time: '1天前',
    title: '巴菲特最新持仓变动解读',
    content: 'Q3持仓报告显示，巴菲特大幅增持西方石油，减持苹果。这背后的逻辑是什么？能源板块配置价值凸显...',
    likes: 423,
    comments: 112,
    isFollowing: false
  },
  {
    id: 'c5',
    type: 'community',
    author: 'CryptoTrader',
    time: '3小时前',
    title: '比特币突破关键阻力位',
    content: 'BTC突破$35000，技术面呈现多头排列。ETF审批预期升温，机构资金持续流入，目标看向$40000...',
    likes: 189,
    comments: 67,
    isFollowing: false
  },
  {
    id: 'c6',
    type: 'community',
    author: 'MacroAnalyst',
    time: '6小时前',
    title: '2024年美股十大预测',
    content: '结合宏观经济数据、企业盈利预期、估值水平等因素，对明年美股走势做出十大预测。核心观点：软着陆概率上升...',
    likes: 675,
    comments: 234,
    isFollowing: true
  },
  {
    id: 'c7',
    type: 'community',
    author: 'OptionsWizard',
    time: '4小时前',
    title: '期权交易实战：如何应对财报季',
    content: '财报季波动加剧，分享我的期权策略：结合IV Rank选择标的，使用跨式组合捕捉超预期波动...',
    likes: 298,
    comments: 78,
    isFollowing: false
  },
  {
    id: 'c8',
    type: 'community',
    author: 'DividendKing',
    time: '12小时前',
    title: '高股息策略2024年展望',
    content: '高利率环境下，股息收益率的吸引力提升。重点关注消费、公用事业、房地产信托等板块...',
    likes: 367,
    comments: 95,
    isFollowing: false
  }
]

const filteredItems = computed(() => {
  // If "推荐信息" is selected, show recommended items
  if (selectedGroupId.value === 'recommended') {
    return recommendedItems
  }
  
  // Otherwise, show items from watchlist groups
  let items = allItems
  
  // Filter by selected group
  if (selectedGroupId.value !== 'all') {
    // Filter items based on selected group's assets
    items = items.filter(item => {
      const assetCode = item.symbol || item.code || item.id
      return selectedGroupAssets.value.includes(assetCode)
    })
  }
  
  return items
})

// Filter items by active tab
const tabFilteredItems = computed(() => {
  const items = filteredItems.value
  if (activeTab.value === 'opportunity') {
    return items.filter(i => i.type === 'official' || i.type === 'community')
  } else {
    return items.filter(i => ['market', 'etf', 'stock'].includes(i.type))
  }
})

// Group items for display based on active tab
const displayedContent = computed(() => {
  const items = tabFilteredItems.value
  if (activeTab.value === 'opportunity') {
    return {
      official: items.filter(i => i.type === 'official'),
      community: items.filter(i => i.type === 'community')
    }
  } else {
    return {
      market: items.filter(i => i.type === 'market'),
      etf: items.filter(i => i.type === 'etf'),
      stock: items.filter(i => i.type === 'stock')
    }
  }
})

// Watchlist event handlers
const handleSelectGroup = (groupId) => {
  selectGroup(groupId)
  // Close mobile sidebar after selection
  if (window.innerWidth < 1024) {
    showMobileSidebar.value = false
  }
}

const handleCreateGroup = (name) => {
  createGroup(name)
}

const handleRenameGroup = ({ id, name }) => {
  renameGroup({ id, name })
}

const handleDeleteGroup = (id) => {
  deleteGroup(id)
}

const handleSetDefaultGroup = (id) => {
  setDefaultGroup(id)
}

const totalItemsCount = computed(() => tabFilteredItems.value.length)

const navigateToDetail = (type, id) => {
  if (type === 'market') {
    router.push(`/info/market/${id || 'm1'}`) // Market detail with id support
  } else if (type === 'official') {
    // Navigate to opportunity report detail page
    // Search in both allItems and recommendedItems
    let item = allItems.find(i => i.id === id)
    if (!item) {
      item = recommendedItems.find(i => i.id === id && i.type === 'official')
    }
    
    if (item) {
      // Convert InfoPage official recommendation data to report format
      const reportData = {
        id: item.id,
        symbol: item.symbol,
        stockName: item.name,
        framework: parseStrategy(item.strategy),
        period: parsePeriod(item.period),
        risk: parseRisk(item.risk),
        riskRewardRatio: calculateRiskReward(item.expectedReturn),
        expectedReturn: item.expectedReturn,
        entryPrice: item.entryPrice || 0,
        targetPrice: item.targetPrice || 0,
        score: item.score,
        generatedAt: new Date().toISOString(),
        reasoning: item.reasoning,
        summary: item.summary,
        tags: item.tags
      }
      
      // Store in sessionStorage for detail page to read
      sessionStorage.setItem('current_report', JSON.stringify(reportData))
      
      // Navigate to report detail
      router.push(`/opportunity/report/${item.id}`)
    }
  } else if (type === 'stock') {
    // Navigate to stock attribution detail page
    // Find the stock item to get its code
    let item = allItems.find(i => i.id === id)
    if (!item) {
      item = recommendedItems.find(i => i.id === id && i.type === 'stock')
    }
    
    if (item && item.code) {
      // Jump to stock attribution detail page using the stock code
      router.push({ name: 'StockAttributionDetail', params: { id: item.code } })
    }
  } else {
    router.push(`/info/${type}/${id}`)
  }
}

// Helper functions to parse data
const parseStrategy = (strategy) => {
  if (!strategy) return 'all'
  const lower = strategy.toLowerCase()
  if (lower.includes('技术')) return 'technical'
  if (lower.includes('基本面')) return 'fundamental'
  if (lower.includes('量化')) return 'quantitative'
  if (lower.includes('事件')) return 'event'
  if (lower.includes('商业')) return 'market'
  if (lower.includes('趋势')) return 'momentum'
  return 'all'
}

const parsePeriod = (period) => {
  if (!period) return '1m-6m'
  const lower = period.toLowerCase()
  if (lower.includes('1天') || lower.includes('1-5')) return '1d-5d'
  if (lower.includes('1个月') && !lower.includes('-6')) return '1d-1m'
  if (lower.includes('1-3') || lower.includes('3-6')) return '1m-6m'
  if (lower.includes('6个月+')) return '6m+'
  return '1m-6m'
}

const parseRisk = (risk) => {
  if (!risk) return 'medium'
  const lower = risk.toLowerCase()
  if (lower.includes('极高')) return 'extreme'
  if (lower.includes('高')) return 'high'
  if (lower.includes('低')) return 'low'
  return 'medium'
}

const calculateRiskReward = (expectedReturn) => {
  // Simple calculation: higher return = better risk/reward ratio
  const ratio = (expectedReturn / 5).toFixed(1)
  return `${ratio}:1`
}
</script>