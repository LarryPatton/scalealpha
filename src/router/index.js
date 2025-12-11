import { createRouter, createWebHistory } from 'vue-router'
import { useUserProfile } from '../composables/useUserProfile'
import { useSavedReports } from '../composables/useSavedReports'

// Layouts
import MarketingLayout from '../layouts/MarketingLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import BlankLayout from '../layouts/BlankLayout.vue'
import FixedLayout from '../layouts/FixedLayout.vue'

// Pages
import HomePage from '../pages/HomePage.vue'
import RevenuePage from '../pages/RevenuePage.vue'
import RevenueBPage from '../pages/RevenueBPage.vue'
import DemoPage from '../pages/DemoPage.vue'
import InfoPage2 from '../pages/InfoPage2.vue'
import AllOpportunitiesPage from '../pages/AllOpportunitiesPage.vue'
import AllMarketThemesPage from '../pages/AllMarketThemesPage.vue'
import AllStockAttributionPage from '../pages/AllStockAttributionPage.vue'
import StockAttributionDetailPage from '../pages/StockAttributionDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import InfoPage from '../pages/InfoPage.vue'
import InfoPageB from '../pages/InfoPageB.vue'
import InfoPageWaterfall from '../pages/InfoPageWaterfall.vue'
import InfoPageKanban from '../pages/InfoPageKanban.vue'
import InfoPageAttribution from '../pages/InfoPageAttribution.vue'
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
import OpportunityPageB from '../pages/OpportunityPageB.vue'
import OpportunityReportDetail from '../pages/OpportunityReportDetail.vue'
import PlanningPage from '../pages/PlanningPage.vue'
import PlanningDetailPage from '../pages/PlanningDetailPage.vue'
import CardDesignPage from '../pages/CardDesignPage.vue'
import ThemeVizDesignPage from '../pages/ThemeVizDesignPage.vue'
import TimelineDesignPage from '../pages/TimelineDesignPage.vue'
import AnalysisDesignPage from '../pages/AnalysisDesignPage.vue'
import ThemeCardVariationsPage from '../pages/ThemeCardVariationsPage.vue'
import OpportunityCardDesignPage from '../pages/OpportunityCardDesignPage.vue';

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
  {
    path: '/revenueB',
    name: 'RevenueB',
    component: RevenueBPage,
    meta: { layout: FixedLayout }
  },
  {
    path: '/card-design',
    name: 'CardDesign',
    component: CardDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/theme-viz-design',
    name: 'ThemeVizDesign',
    component: ThemeVizDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/timeline-design',
    name: 'TimelineDesign',
    component: TimelineDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/analysis-design',
    name: 'AnalysisDesign',
    component: AnalysisDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/theme-card-variations',
    name: 'ThemeCardVariations',
    component: ThemeCardVariationsPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/opportunity-card-design',
    name: 'OpportunityCardDesign',
    component: OpportunityCardDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: DemoPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/info2',
    name: 'Info2',
    component: InfoPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/opportunities',
    name: 'AllOpportunities',
    component: AllOpportunitiesPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/market-themes',
    name: 'AllMarketThemes',
    component: AllMarketThemesPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/stock-attribution',
    name: 'AllStockAttribution',
    component: AllStockAttributionPage,
    meta: { layout: AppLayout }
  },
  {
    path: '/stock-attribution/:id',
    name: 'StockAttributionDetail',
    component: StockAttributionDetailPage,
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
    component: InfoPage2,
    meta: { layout: AppLayout }
  },
  {
    path: '/infoB',
    name: 'InfoB',
    component: InfoPageB,
    meta: { layout: BlankLayout }
  },
  {
    path: '/info/waterfall',
    name: 'InfoWaterfall',
    component: InfoPageWaterfall,
    meta: { layout: BlankLayout }
  },
  {
    path: '/info/kanban',
    name: 'InfoKanban',
    component: InfoPageKanban,
    meta: { layout: BlankLayout }
  },
  {
    path: '/info/attribution',
    name: 'InfoAttribution',
    component: InfoPageAttribution,
    meta: { layout: BlankLayout }
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
    path: '/opportunityB',
    name: 'OpportunityB',
    component: OpportunityPageB,
    meta: { layout: BlankLayout }
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

// 路由守卫 - 简化版本，仅保留基础滚动行为
router.beforeEach((to, from, next) => {
  // 允许自由访问所有路由
  next()
})

export default router