import { createRouter, createWebHistory } from 'vue-router'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'

// Layouts
import MarketingLayout from '../layouts/MarketingLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

// Pages
import HomePage from '../pages/HomePage.vue'
import RevenuePage from '../pages/RevenuePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import InfoPage from '../pages/InfoPage.vue'
import StockDetail from '../pages/StockDetail.vue'
import CommunityDetail from '../pages/CommunityDetail.vue'
import NotFound from '../pages/NotFound.vue'

// Existing Pages
// import PlanPage from '../pages/PlanPage.vue'  // ❌ 已废弃，使用 PlanningPage
import HistoryPage from '../pages/HistoryPage.vue'
import PortfolioPage from '../pages/PortfolioPage.vue'
import PortfolioInputPage from '../pages/PortfolioInputPage.vue'
import InsightPage from '../pages/InsightPage.vue'
import TradingPage from '../pages/TradingPage.vue'
import EventPage from '../pages/EventPage.vue'
import BacktestPage from '../pages/BacktestPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import PingPingPage from '../pages/PingPingPage.vue'
import OpportunityPage from '../pages/OpportunityPage.vue'
import OpportunityReportDetail from '../pages/OpportunityReportDetail.vue'
import PlanningPage from '../pages/PlanningPage.vue'
import PlanningDetailPage from '../pages/PlanningDetailPage.vue'
import OneClickTradingPage from '../pages/OneClickTradingPage.vue'

const routes = [
  // Root redirect - automatically redirect to Home page
  {
    path: '/',
    redirect: '/home'
  },
  
  // Marketing/Home Routes
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { layout: AppLayout }
  },
  {
    path: '/revenue',
    name: 'Revenue',
    component: RevenuePage,
    meta: { layout: AppLayout }
  },
  
  // Auth Routes
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { layout: AuthLayout }
  },

  // App Routes (Info Hub)
  {
    path: '/info',
    name: 'Info',
    component: InfoPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/info/market/:id?',
    name: 'MarketDetail',
    component: StockDetail,
    meta: { layout: AppLayout }
  },
  {
    path: '/info/etf/:id',
    name: 'ETFDetail',
    component: StockDetail,
    meta: { layout: AppLayout }
  },
  {
    path: '/info/stock/:id',
    name: 'StockDetail',
    component: StockDetail,
    meta: { layout: AppLayout }
  },
  {
    path: '/info/community/:id',
    name: 'CommunityDetail',
    component: CommunityDetail,
    meta: { layout: AppLayout }
  },

  // Existing App Features
  // 注意：旧的 /plan 路径已废弃，统一使用 /planning
  {
    path: '/history',
    name: 'History',
    component: HistoryPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/portfolio-input',
    name: 'PortfolioInput',
    component: PortfolioInputPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/opportunity',
    name: 'Opportunity',
    component: OpportunityPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/opportunity/report/:reportId',
    name: 'OpportunityReportDetail',
    component: OpportunityReportDetail,
    meta: { layout: AppLayout }
  },
  {
    path: '/planning',
    name: 'Planning',
    component: PlanningPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/planning/:planId',
    name: 'PlanningDetail',
    component: PlanningDetailPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/scalealpha/trading',
    name: 'OneClickTrading',
    component: OneClickTradingPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/insight',
    name: 'Insight',
    component: InsightPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/trading',
    name: 'Trading',
    component: TradingPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/event',
    name: 'Event',
    component: EventPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/backtest',
    name: 'Backtest',
    component: BacktestPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/alerts', // Changed from pingping to alerts for better semantics
    name: 'Alerts',
    component: PingPingPage,
    meta: { layout: AppLayout }
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: MarketingLayout }
  }
]

const router = createRouter({
  history: createWebHistory('/scalealpha/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 定义需要用户信息的路由
const requiresUserInfoRoutes = [
  '/trading',
  '/alerts',
  '/portfolio',
  '/event',
  '/history',
  '/backtest'
  // '/plan' 已移除 - 允许直接访问计划制定页面
]

// 定义需要保存报告的路由
const requiresSavedReportsRoutes = [
  // '/plan' 已移除 - 允许直接访问计划制定页面
]

// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取状态（直接从localStorage检查，避免响应式问题）
  const { checkUserInfoStatus } = useUserProfile()
  const { checkSavedReports } = useSavedReports()
  
  const hasUserInfo = checkUserInfoStatus()
  const hasSavedReports = checkSavedReports()
  
  // 检查是否需要用户信息
  const needsUserInfo = requiresUserInfoRoutes.some(route => 
    to.path.startsWith(route)
  )
  
  // 检查是否需要保存报告
  const needsSavedReports = requiresSavedReportsRoutes.some(route => 
    to.path.startsWith(route)
  )
  
  // 如果需要用户信息但未填写，重定向到信息填写页
  if (needsUserInfo && !hasUserInfo) {
    if (to.path !== '/portfolio-input') {
      next('/portfolio-input')
      return
    }
  }
  
  // 如果需要保存报告但没有，重定向到机会发现页
  if (needsSavedReports && hasUserInfo && !hasSavedReports) {
    if (to.path !== '/opportunity') {
      next('/opportunity')
      return
    }
  }
  
  // 允许通过
  next()
})

export default router