# ScaleAlpha.ai 站点地图 (Sitemap)

> **项目概述**：ScaleAlpha.ai 是一个智能投资助手平台，基于 Vue 3 + Vue Router 构建，提供从信息获取到交易执行的全流程投资决策支持。

---

## 📋 目录
- [技术栈](#技术栈)
- [路由结构总览](#路由结构总览)
- [详细页面清单](#详细页面清单)
- [布局系统](#布局系统)
- [权限控制](#权限控制)

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue.js | 3.3.4 | 前端框架 |
| Vue Router | 4.6.3 | 路由管理 |
| Vite | 5.0.0 | 构建工具 |
| Tailwind CSS | 3.3.0 | 样式框架 |
| Axios | 1.6.0 | HTTP 客户端 |

**Base Path**: `/scalealpha/`

---

## 🗺️ 路由结构总览

```
ScaleAlpha.ai
├── 🏠 首页与认证
│   ├── / (重定向到 /home)
│   ├── /home - 欢迎页/主页
│   └── /login - 登录页
│
├── 📚 信息中心 (Info Hub)
│   ├── /info - 信息中心主页
│   ├── /info/market/:id - 市场详情页
│   ├── /info/etf/:id - ETF详情页
│   ├── /info/stock/:id - 股票详情页
│   └── /info/community/:id - 社区详情页
│
├── 🎯 核心工作流 (Core Workflow)
│   ├── /portfolio-input - 我的投资信息
│   ├── /opportunity - 机会发现
│   ├── /planning - 计划制定
│   ├── /planning/:planId - 计划详情
│   └── /scalealpha/trading - 一键交易
│
├── 💼 投资管理
│   ├── /portfolio - 投资组合管理
│   ├── /trading - 交易分析
│   └── /history - 历史模式分析
│
├── 📊 高级功能
│   ├── /insight - 洞察分析
│   ├── /event - 事件分析
│   ├── /backtest - 实盘测试
│   └── /alerts - 盯盘提醒
│
├── 📝 内容页面
│   └── /blog - 官方博客
│
└── ❌ 其他
    └── /404 - 页面未找到

总计: 21个路由，包括4个详情页动态路由
```

---

## 📄 详细页面清单

### 🏠 入口与认证

#### 1. **根路径** `/`
- **组件**: 自动重定向
- **目标**: `/home`
- **布局**: N/A
- **权限**: 公开
- **说明**: 访问根路径自动跳转到首页

#### 2. **首页** `/home`
- **组件**: `HomePage.vue`
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**: 
  - 平台介绍
  - 功能展示
  - 用户引导
- **导航**: 始终可访问

#### 3. **登录页** `/login`
- **组件**: `LoginPage.vue`
- **布局**: `AuthLayout`
- **权限**: 公开
- **功能**:
  - 用户登录
  - 用户注册
  - 会话管理
- **数据持久化**: `localStorage.isLoggedIn`, `localStorage.userEmail`

---

### 📚 信息中心 (Info Hub)

#### 4. **信息中心主页** `/info`
- **组件**: `InfoPage.vue`
- **布局**: `AppLayout`
- **权限**: 公开（推荐首次访问）
- **功能**:
  - 市场行情概览
  - ETF信息展示
  - 股票信息展示
  - 社区动态
  - 官方资讯
- **子组件**:
  - `MarketCard` - 市场卡片
  - `ETFCard` - ETF卡片
  - `StockCard` - 股票卡片
  - `CommunityCard` - 社区卡片
  - `OfficialCard` - 官方资讯卡片
  - `WatchlistSidebar` - 自选股侧边栏
- **工作流状态**: 访问后标记 `hasViewedInfo = true`

#### 5. **市场详情** `/info/market/:id?`
- **组件**: `StockDetail.vue`
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**: 显示特定市场的详细信息
- **参数**: `id` - 市场标识符（可选）

#### 6. **ETF详情** `/info/etf/:id`
- **组件**: `StockDetail.vue`（复用）
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**: 显示ETF的详细信息、持仓、业绩
- **参数**: `id` - ETF代码（必需）

#### 7. **股票详情** `/info/stock/:id`
- **组件**: `StockDetail.vue`（复用）
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**: 显示个股的详细信息、财报、研报
- **参数**: `id` - 股票代码（必需）

#### 8. **社区详情** `/info/community/:id`
- **组件**: `CommunityDetail.vue`
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**: 显示社区讨论详情、评论
- **参数**: `id` - 社区帖子ID（必需）

---

### 🎯 核心工作流

> **工作流顺序**: Info → Portfolio Input → Opportunity → Planning → Trading → Review

#### 9. **我的投资信息** `/portfolio-input`
- **组件**: `PortfolioInputPage.vue`
- **布局**: `AppLayout`
- **权限**: 始终可访问
- **前置条件**: 无
- **功能**:
  - 输入个人投资信息
  - 填写风险偏好
  - 设置投资目标
  - 提交持仓数据
- **数据持久化**:
  - `localStorage.portfolio_input_data` - 表单数据
  - `localStorage.portfolio_info_submitted` - 提交状态
  - `localStorage.portfolio_last_saved` - 最后保存时间
- **工作流状态**: 提交后标记 `hasInputPortfolio = true`
- **路由守卫**: 未提交时，某些高级功能会重定向到此页面

#### 10. **机会发现** `/opportunity`
- **组件**: `OpportunityPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要完成投资信息填写
- **前置条件**: `hasInputPortfolio = true`
- **功能**:
  - AI生成投资机会报告
  - 风险评估
  - 机会分类展示
  - 保存感兴趣的机会
- **子组件**:
  - `OpportunityReportCard` - 机会报告卡片
  - `SaveReportsDialog` - 保存报告对话框
  - `HoldingsClassificationDialog` - 持仓分类对话框
- **数据持久化**:
  - `localStorage.scaleAlpha_savedReports` - 已保存的报告
  - `localStorage.opportunity_report_categories` - 报告分类
- **工作流状态**: 访问后标记 `hasViewedOpportunity = true`
- **路由守卫**: 需要用户信息，否则重定向到 `/portfolio-input`

#### 11. **机会报告详情** `/opportunity/report/:reportId`
- **组件**: `OpportunityReportDetail.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要完成投资信息填写
- **功能**: 查看单个机会报告的详细分析
- **参数**: `reportId` - 报告ID（必需）

#### 12. **计划制定** `/planning`
- **组件**: `PlanningPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要查看过机会发现
- **前置条件**: `hasViewedOpportunity = true`
- **功能**:
  - 基于机会创建投资计划
  - 资金分配建议
  - 时间规划
  - 计划保存与管理
- **工作流状态**: 访问后标记 `hasCreatedPlan = true`
- **说明**: 旧路径 `/plan` 已废弃

#### 13. **计划详情** `/planning/:planId`
- **组件**: `PlanningDetailPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要查看过机会发现
- **功能**: 查看和编辑具体计划详情
- **参数**: `planId` - 计划ID（必需）

#### 14. **一键交易** `/scalealpha/trading`
- **组件**: `OneClickTradingPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要制定过计划
- **前置条件**: `hasCreatedPlan = true`
- **功能**:
  - 连接券商账户
  - 一键执行交易计划
  - 交易确认
  - 持仓同步
- **子组件**:
  - `BrokerSelectionDialog` - 券商选择对话框
  - `BrokerAccountCard` - 券商账户卡片
  - `PositionConfirmDialog` - 持仓确认对话框
- **数据持久化**: `localStorage.scaleAlpha_brokerAccount`
- **工作流状态**: 访问后标记 `hasExecutedTrade = true`

---

### 💼 投资管理

#### 15. **投资组合** `/portfolio`
- **组件**: `PortfolioPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 持仓展示
  - 收益分析
  - 资产配置可视化
- **数据来源**: `localStorage.user_holdings`
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`

#### 16. **交易分析** `/trading`
- **组件**: `TradingPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 交易记录
  - 交易分析
  - 绩效统计
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`

#### 17. **历史模式** `/history`
- **组件**: `HistoryPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 历史行情回顾
  - 相似模式识别
  - 历史数据分析
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`

---

### 📊 高级功能

#### 18. **洞察分析** `/insight`
- **组件**: `InsightPage.vue`
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**:
  - 市场洞察
  - AI分析报告
  - 趋势预测

#### 19. **事件分析** `/event`
- **组件**: `EventPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 财经事件日历
  - 事件影响分析
  - 事件提醒
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`

#### 20. **实盘测试** `/backtest`
- **组件**: `BacktestPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 策略回测
  - 绩效评估
  - 参数优化
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`

#### 21. **盯盘提醒** `/alerts`
- **组件**: `PingPingPage.vue`
- **布局**: `AppLayout`
- **权限**: 🔒 需要用户信息
- **功能**:
  - 价格提醒设置
  - 异动通知
  - 自定义告警规则
- **路由守卫**: 未填写用户信息时重定向到 `/portfolio-input`
- **说明**: 原路径名为 `/pingping`，现已改为 `/alerts`

---

### 📝 内容页面

#### 22. **官方博客** `/blog`
- **组件**: `BlogPage.vue`
- **布局**: `AppLayout`
- **权限**: 公开
- **功能**:
  - 平台动态
  - 投资教育文章
  - 功能更新公告

---

### ❌ 错误页面

#### 23. **页面未找到** `/:pathMatch(.*)*`
- **组件**: `NotFound.vue`
- **布局**: `MarketingLayout`
- **权限**: 公开
- **功能**: 404错误处理
- **匹配规则**: 捕获所有未定义的路由

---

## 🎨 布局系统

平台采用3种布局模板：

### 1. **MarketingLayout**
- **适用页面**: 404页面、营销页面
- **特点**: 简化布局，突出品牌

### 2. **AuthLayout**
- **适用页面**: 登录/注册页面
- **特点**: 居中布局，专注认证流程

### 3. **AppLayout** ⭐ (主要布局)
- **适用页面**: 所有应用功能页面
- **组件结构**:
  ```vue
  <AppLayout>
    <template #navbar>
      <WorkflowNav /> <!-- 工作流导航条 -->
    </template>
    <RouterView /> <!-- 页面内容 -->
  </AppLayout>
  ```
- **特点**:
  - 包含顶部导航栏
  - 集成工作流进度显示
  - 统一的应用体验

---

## 🔐 权限控制

### 路由守卫逻辑

平台在 `router/index.js` 中实现了全局路由守卫：

```javascript
// 需要用户信息的路由
const requiresUserInfoRoutes = [
  '/trading',
  '/alerts', 
  '/portfolio',
  '/event',
  '/history',
  '/backtest'
]

// 路由守卫检查
router.beforeEach((to, from, next) => {
  const hasUserInfo = checkUserInfoStatus()
  const hasSavedReports = checkSavedReports()
  
  // 如果需要用户信息但未填写，重定向到信息填写页
  if (needsUserInfo && !hasUserInfo) {
    next('/portfolio-input')
  } else {
    next() // 允许通过
  }
})
```

### 权限级别

| 级别 | 说明 | 检查条件 | 重定向目标 |
|------|------|----------|-----------|
| **公开** | 所有用户可访问 | 无 | - |
| **需要用户信息** | 需完成投资信息填写 | `localStorage.portfolio_info_submitted === true` | `/portfolio-input` |
| **需要保存报告** | 需在机会发现中保存报告 | `localStorage.scaleAlpha_savedReports.length > 0` | `/opportunity` |
| **工作流锁定** | 需完成前置工作流步骤 | 见工作流状态管理 | 上一个工作流步骤 |

### 状态持久化

所有用户状态通过 `localStorage` 持久化：

```javascript
// 核心状态键
- isLoggedIn              // 登录状态
- userEmail               // 用户邮箱
- portfolio_info_submitted // 投资信息提交状态
- scaleAlpha_userProfile   // 用户配置
- scaleAlpha_savedReports  // 保存的机会报告
- scaleAlpha_watchlists    // 自选股列表
- workflow_progress        // 工作流进度
- user_holdings            // 用户持仓
- riskAssessmentResult     // 风险评估结果
```

---

## 🔄 工作流状态管理

通过 `useWorkflowProgress` composable 管理：

```javascript
// 工作流步骤定义
const WORKFLOW_STEPS = [
  { id: 'info', label: 'Info', route: '/info' },
  { id: 'portfolio-input', label: '我的信息', route: '/portfolio-input' },
  { id: 'opportunity', label: '机会发现', route: '/opportunity' },
  { id: 'planning', label: '计划制定', route: '/planning' },
  { id: 'trade', label: '一键交易', route: '/trade' },
  { id: 'review', label: '交易复盘', route: '/review' }
]

// 步骤状态
- completed: 已完成
- current: 当前页面
- available: 可访问
- locked: 锁定（需完成前置步骤）
```

**解锁条件**:
- ✅ **Info**: 始终可访问
- ✅ **Portfolio Input**: 始终可访问
- 🔒 **Opportunity**: 需完成 Portfolio Input
- 🔒 **Planning**: 需访问过 Opportunity
- 🔒 **Trade**: 需制定过 Plan
- 🔒 **Review**: 需执行过 Trade

---

## 📊 页面统计

| 分类 | 页面数量 |
|------|---------|
| 入口与认证 | 3 |
| 信息中心 | 5 |
| 核心工作流 | 6 |
| 投资管理 | 3 |
| 高级功能 | 4 |
| 内容页面 | 1 |
| 错误页面 | 1 |
| **总计** | **23** |

---

## 🔗 外部链接与API

- **Base URL**: 配置在 `vite.config.js` 和路由 base path
- **部署路径**: `/scalealpha/`
- **404处理**: 使用 `public/404.html` 作为GitHub Pages回退

---

## 📝 更新日志

- **2024-12**: 废弃 `/plan` 路径，统一使用 `/planning`
- **2024-12**: `/pingping` 重命名为 `/alerts` 提升语义化
- **2024-12**: 增强路由守卫逻辑，优化用户引导流程

---

**文档版本**: v1.0  
**最后更新**: 2024年12月  
**维护者**: ScaleAlpha.ai Team
