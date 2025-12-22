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
import RevenueBPage from '../pages/RevenueBPage.vue'
import DemoPage from '../pages/DemoPage.vue'
import AllOpportunitiesPage from '../pages/AllOpportunitiesPage.vue'
import AllMarketThemesPage from '../pages/AllMarketThemesPage.vue'
import AllStockAttributionPage from '../pages/AllStockAttributionPage.vue'
import StockAttributionDetailPage from '../pages/StockAttributionDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import InfoPageB from '../pages/InfoPageB.vue'
import InfoPageWaterfall from '../pages/InfoPageWaterfall.vue'
import InfoPageKanban from '../pages/InfoPageKanban.vue'
import InfoPageAttribution from '../pages/InfoPageAttribution.vue'
import StockDetail from '../pages/StockDetail.vue'
import CommunityDetail from '../pages/CommunityDetail.vue'
import NotFound from '../pages/NotFound.vue'

// Existing Pages
import HistoryPage from '../pages/HistoryPage.vue'
import PortfolioPage from '../pages/PortfolioPage.vue'
import PortfolioInputPage from '../pages/PortfolioInputPage.vue'
import InsightPage from '../pages/InsightPage.vue'
import TradingPage from '../pages/TradingPage.vue'
import EventPage from '../pages/EventPage.vue'
import BacktestPage from '../pages/BacktestPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import PingPingPage from '../pages/PingPingPage.vue'
import OpportunityPageB from '../pages/OpportunityPageB.vue'
import OpportunityReportDetail from '../pages/OpportunityReportDetail.vue'
import CardDesignPage from '../pages/CardDesignPage.vue'
import ThemeVizDesignPage from '../pages/ThemeVizDesignPage.vue'
import TimelineDesignPage from '../pages/TimelineDesignPage.vue'
import PlanStatusDemo from '../pages/PlanStatusDemo.vue'
import AnalysisDesignPage from '../pages/AnalysisDesignPage.vue'
import ThemeCardVariationsPage from '../pages/ThemeCardVariationsPage.vue'
import OpportunityCardDesignPage from '../pages/OpportunityCardDesignPage.vue';
import FlowDesignPage from '../pages/FlowDesignPage.vue';
import ThemesLifecyclePage from '../pages/ThemesLifecyclePage.vue';
import DesignSystemPage from '../pages/DesignSystemPage.vue';
import LoadingPage from '../pages/LoadingPage.vue';
import UIComponentsPage from '../pages/UIComponentsPage.vue';
import DevToolsPage from '../pages/DevToolsPage.vue';
import ColorSchemesPage from '../pages/ColorSchemesPage.vue';
import ButtonSchemesPage from '../pages/ButtonSchemesPage.vue';
import PricingPage from '../pages/PricingPage.vue';
import StrategyEmptyStatePage from '../pages/StrategyEmptyStatePage.vue';
import AttributionEmptyStatePage from '../pages/AttributionEmptyStatePage.vue';
import PortfolioInputPage2 from '../pages/PortfolioInputPage2.vue';

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
    path: '/revenueB',
    name: 'RevenueB',
    component: RevenueBPage,
    meta: { layout: FixedLayout, hideFooter: true }
  },
  // ========== Dev Tools Routes (Internal Only) ==========
  {
    path: '/dev',
    name: 'DevTools',
    component: DevToolsPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/components',
    name: 'DevComponents',
    component: UIComponentsPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/design-system',
    name: 'DevDesignSystem',
    component: DesignSystemPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/card-design',
    name: 'DevCardDesign',
    component: CardDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/theme-viz',
    name: 'DevThemeViz',
    component: ThemeVizDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/timeline',
    name: 'DevTimeline',
    component: TimelineDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/analysis',
    name: 'DevAnalysis',
    component: AnalysisDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/theme-cards',
    name: 'DevThemeCards',
    component: ThemeCardVariationsPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/opportunity-cards',
    name: 'DevOpportunityCards',
    component: OpportunityCardDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/flow',
    name: 'DevFlow',
    component: FlowDesignPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/lifecycle',
    name: 'DevLifecycle',
    component: ThemesLifecyclePage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/plan-status',
    name: 'DevPlanStatus',
    component: PlanStatusDemo,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/color-schemes',
    name: 'DevColorSchemes',
    component: ColorSchemesPage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/button-schemes',
    name: 'DevButtonSchemes',
    component: ButtonSchemesPage,
    meta: { layout: BlankLayout }
  },
  
  // Legacy redirects (keep old URLs working)
  { path: '/card-design', redirect: '/dev/card-design' },
  { path: '/theme-viz-design', redirect: '/dev/theme-viz' },
  { path: '/timeline-design', redirect: '/dev/timeline' },
  { path: '/analysis-design', redirect: '/dev/analysis' },
  { path: '/theme-card-variations', redirect: '/dev/theme-cards' },
  { path: '/opportunity-card-design', redirect: '/dev/opportunity-cards' },
  { path: '/flow-design', redirect: '/dev/flow' },
  { path: '/themes-lifecycle', redirect: '/dev/lifecycle' },
  { path: '/design-system', redirect: '/dev/design-system' },
  { path: '/ui-components', redirect: '/dev/components' },
  { path: '/plan-status-demo', redirect: '/dev/plan-status' },
  {
    path: '/demo',
    name: 'Demo',
    component: DemoPage,
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
  {
    path: '/loading',
    name: 'Loading',
    component: LoadingPage,
    meta: { layout: BlankLayout }
  },

  // App Routes (Info Hub)
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
    path: '/portfolio-input2',
    name: 'PortfolioInput2',
    component: PortfolioInputPage2,
    meta: { layout: AppLayout }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: PortfolioPage,
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

  // Pricing Page
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingPage,
    meta: { layout: AppLayout }
  },

  // Design Showcase Pages
  {
    path: '/dev/strategy-empty-state',
    name: 'StrategyEmptyState',
    component: StrategyEmptyStatePage,
    meta: { layout: BlankLayout }
  },
  {
    path: '/dev/attribution-empty-state',
    name: 'AttributionEmptyState',
    component: AttributionEmptyStatePage,
    meta: { layout: BlankLayout }
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