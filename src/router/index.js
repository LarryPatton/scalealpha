import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import MarketingLayout from '../layouts/MarketingLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'

// Pages
import HomePage from '../pages/HomePage.vue'
import LoginPage from '../pages/LoginPage.vue'
import InfoPage from '../pages/InfoPage.vue'
import MarketDetail from '../pages/MarketDetail.vue'
import ETFDetail from '../pages/ETFDetail.vue'
import StockDetail from '../pages/StockDetail.vue'
import CommunityDetail from '../pages/CommunityDetail.vue'
import NotFound from '../pages/NotFound.vue'

// Existing Pages
import PlanPage from '../pages/PlanPage.vue'
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
    meta: { layout: MarketingLayout }
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
    path: '/info/market',
    name: 'MarketDetail',
    component: MarketDetail,
    meta: { layout: AppLayout }
  },
  {
    path: '/info/etf/:id',
    name: 'ETFDetail',
    component: ETFDetail,
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
    path: '/plan',
    name: 'Plan',
    component: PlanPage,
    meta: { layout: AppLayout }
  },
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

export default router
