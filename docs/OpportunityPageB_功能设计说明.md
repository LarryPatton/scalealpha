# OpportunityPageB 功能设计说明文档

> **页面路径**: `http://localhost:5176/scalealpha/opportunityB`  
> **组件文件**: `src/pages/OpportunityPageB.vue`  
> **布局**: BlankLayout (无默认页头页脚)  
> **最后更新**: 2026-01-20

---

## 1. 页面概述

OpportunityPageB 是 ScaleAlpha 平台的**核心策略生成与管理中心**，为用户提供 AI 驱动的投资策略生成、管理和执行计划生成功能。该页面采用双 Tab 设计，分为「生成策略」和「我的策略」两个主要模块。

### 1.1 核心功能

| 功能模块 | 描述 |
|---------|------|
| 策略生成 | 基于 AI 分析框架生成投资策略 |
| 策略管理 | 保存、分组、筛选、排序策略 |
| 执行计划 | 生成可执行的交易计划 |
| 订单执行 | 连接模拟盘/真实券商执行交易 |

---

## 2. 页面结构

### 2.1 Tab 导航

页面通过 URL Query 参数控制当前 Tab：
- `?tab=generate` - 生成策略 Tab
- `?tab=mystrategy` - 我的策略 Tab (默认)

### 2.2 布局架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Navbar                                │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────────────────────────────────────────┐ │
│ │ 左侧面板 │ │                 右侧主内容区                 │ │
│ │         │ │                                             │ │
│ │ 资产选择 │ │  生成 Tab: 策略配置面板                     │ │
│ │ / 分组   │ │  我的策略 Tab: 策略列表 + 详情面板          │ │
│ │ 侧边栏   │ │                                             │ │
│ └─────────┘ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 「生成策略」Tab 功能详解

### 3.1 资产选择面板 (左侧)

**功能描述**: 用户可以搜索和选择要分析的资产（股票/ETF）。

**UI 组件**:
- 搜索/关注切换按钮组
- 资产搜索输入框
- 资产列表（带复选框）
- 已选资产标签区
- 选择摘要

**交互逻辑**:
```javascript
// 切换资产选中状态
toggleStock(stock) {
  if (selectedStocks.includes(stock.symbol)) {
    // 移除
    selectedStocks = selectedStocks.filter(s => s !== stock.symbol)
  } else {
    // 添加
    selectedStocks.push(stock.symbol)
  }
}
```

### 3.2 策略配置面板 (右侧)

#### 3.2.1 分析框架选择 (Analysis Framework)

| 框架类型 | ID | 描述 |
|---------|-----|------|
| 智能推荐 | `auto` | AI 自动选择最佳分析框架 |
| 技术分析 | `technical` | 基于价格、成交量等技术指标 |
| 基本面分析 | `fundamental` | 基于财务数据和估值 |
| 事件驱动 | `event` | 基于市场事件和催化剂 |
| 量化分析 | `quant` | 基于数学模型和统计 |
| 情绪分析 | `sentiment` | 基于市场情绪和社交媒体 |
| 宏观分析 | `macro` | 基于宏观经济因素 |
| 期权分析 | `options` | 基于期权市场数据 |

**多选逻辑**: 用户可选择多个框架进行组合分析，选择 `auto` 时使用 AI 推荐。

#### 3.2.2 投资期限选择 (Investment Period)

| 期限 | ID | 描述 |
|------|-----|------|
| 智能推荐 | `auto` | AI 自动推荐 |
| 超短期 | `ultra-short` | 1-5天 |
| 短期 | `short` | 1-4周 |
| 中期 | `medium` | 1-3月 |
| 长期 | `long` | 3-12月 |

#### 3.2.3 风险偏好选择 (Risk Appetite)

| 风险等级 | ID | 描述 |
|---------|-----|------|
| 智能推荐 | `auto` | AI 自动推荐 |
| 保守型 | `conservative` | 低风险，稳健收益 |
| 稳健型 | `moderate` | 平衡风险与收益 |
| 积极型 | `growth` | 较高风险，追求增长 |
| 激进型 | `aggressive` | 高风险，最大化收益 |

#### 3.2.4 个人洞察输入 (Personal Insights) - 可选

- **宏观市场观点**: 用户对整体市场的看法
- **标的深度洞察**: 用户对特定标的的见解

### 3.3 生成操作

**按钮状态**:
```javascript
isGenerationDisabled = computed(() => {
  return selectedStocks.length === 0 || 
         selectedFrameworks.length === 0
})
```

**积分系统**:
- 每次生成消耗 20 积分
- 积分不足时显示「充值获取积分」按钮
- 跳转至 `/pricing` 页面

---

## 4. 「我的策略」Tab 功能详解

### 4.1 活动任务区域 (Zone A)

**功能描述**: 显示正在生成中和等待中的策略任务。

**任务状态**:
| 状态 | 显示样式 |
|------|---------|
| `pending` | 灰色，显示预计时间 |
| `processing` | 青色高亮，显示进度条和剩余时间 |
| `completed` | 移至策略列表 |

**交互功能**:
- 点击任务卡片可选中并预览
- 支持展开/折叠视图
- 显示 "+N 更多" 提示卡片

### 4.2 策略侧边栏

#### 4.2.1 智能筛选器 (Smart Filters)

| 筛选项 | 描述 |
|-------|------|
| 高评级 (A/B) | 筛选 Grade 为 A 或 B 的策略 |
| 建议更新 | 筛选需要更新的策略 |
| 无信号记录 | 筛选无明确信号的策略 |
| 未发现机会 | 筛选 Grade 为 N/A 的策略 |

#### 4.2.2 分组管理 (Collections)

**默认分组**:
- 全部策略 (all)
- 官方策略 (official)
- 我的策略 (my)
- 有计划的 (plans)
- 仅计划 (only-plan)

**自定义分组**:
- 支持创建自定义分组
- 支持删除自定义分组
- 支持移动策略到分组

### 4.3 策略列表表格

#### 4.3.1 表头分组

```
┌────┬────────┬────────────────────────────┬──────────────────────┬──────┐
│选择│ Ticker │         策略信息            │      执行计划        │ 操作 │
├────┼────────┼────────────────────────────┼──────────────────────┼──────┤
│    │        │名称│来源│方向│评级│期限│创建│更新│状态│数量│未读│生成中│更新│      │
└────┴────────┴────────────────────────────┴──────────────────────┴──────┘
```

#### 4.3.2 策略属性

| 字段 | 说明 |
|------|------|
| `symbol` | 股票代码 |
| `stockName` | 股票名称 |
| `source` | 来源 (AI/Manual/Import/Official) |
| `direction` | 方向 (LONG/SHORT) |
| `grade` | 评级 (A/B/C/N/A) |
| `horizon` | 投资期限 |
| `generatedAt` | 生成时间 |
| `hasExecutionPlan` | 是否有执行计划 |
| `strategyNeedsUpdate` | 是否建议更新 |

#### 4.3.3 特殊状态

| 状态 | 显示样式 |
|------|---------|
| 生成失败 (ERROR) | 红色警告图标 + "失败" 标签 |
| 已失效 (isExpired) | 灰色时钟图标 + "已失效" 标签 |
| 正在更新 | 蒙版 + 加载动画 + 进度条 |
| 未发现机会 (N/A) | 半透明 + 灰度效果 |

### 4.4 策略详情模态框

**触发方式**: 点击策略行的「查看」按钮

**内容结构**:
1. **头部信息**: 股票代码、名称、评级、方向、期限
2. **策略摘要**: 投资论点总结
3. **详细内容**: 
   - 投资论点 (Investment Thesis)
   - 技术分析 (Technical Analysis)
   - 风险因素 (Risk Factors)
4. **关联计划列表**: 该策略下的所有执行计划
5. **AI 对话**: 与 AI 讨论策略细节

### 4.5 执行计划功能

#### 4.5.1 生成计划模态框

**配置项**:
- **持仓状态**: 是否已有持仓
- **持仓详情** (如有): 成本价、仓位占比
- **投资期限**: 短期/中期/长期
- **风险偏好**: 滑块 0-100
- **保存为默认**: 是否保存当前配置

#### 4.5.2 计划详情

**计划数据结构**:
```javascript
{
  id: Number,
  title: String,           // 计划名称
  recommendation: String,  // BUY/SELL/HOLD/WAIT_BUY
  confidence_level: String,// High/Medium/Low
  entry_price: Number,     // 入场价
  target_price: Number,    // 目标价
  stop_loss_price: Number, // 止损价
  position_pct: Number,    // 建议仓位百分比
  instruction: String,     // 操作说明
  createdAt: String,       // 创建时间
  isGenerating: Boolean,   // 是否正在生成
  generatingProgress: Number // 生成进度
}
```

#### 4.5.3 执行交易模态框

**支持账户类型**:
- 模拟盘 (Paper Trading)
- 真实券商 (Broker)

**订单参数**:
- 交易方向 (买入/卖出)
- 数量
- 订单类型 (市价/限价)
- 价格 (限价单)
- 目标价/止损价

---

## 5. 通用功能

### 5.1 Toast 通知系统

```javascript
// 添加通知
addToast(message, type) // type: 'success' | 'error' | 'info' | 'warning'

// 移除通知
removeToast(id)
```

### 5.2 主题支持

页面支持暗色/亮色主题切换：
- `isDark`: 当前是否暗色模式
- `tokens`: 设计令牌对象，包含颜色等样式变量

### 5.3 国际化

使用 Vue I18n，所有文案通过 `$t()` 或 `t()` 函数获取：
```javascript
t('opportunity.strategyConfig.title') // "策略配置"
```

### 5.4 引导教程

**生成 Tab 引导** (`startGenerateTour`):
1. 资产选择面板
2. 分析框架选择
3. 投资期限选择
4. 风险偏好选择
5. 生成按钮

**我的策略 Tab 引导** (`startStrategyTour`):
1. 活动生成面板
2. 策略侧边栏
3. 策略列表
4. 工具栏

### 5.5 MiniMap 导航

浮动的进度指示器，显示当前工作流程步骤：
1. 策略准备
2. 机会生成
3. 机会判定
4. 计划生成

---

## 6. 数据流

### 6.1 策略生成流程

```
用户选择资产 → 配置参数 → 点击生成
       ↓
创建 pending 任务 → 进入队列
       ↓
队列处理 (最多 2 个并发) → processing 状态
       ↓
生成完成 → 保存到 allSavedStrategies
       ↓
显示在策略列表中
```

### 6.2 状态管理

**核心响应式状态**:
```javascript
// 策略相关
const allSavedStrategies = ref([])      // 所有已保存策略
const selectedStrategyId = ref(null)     // 当前选中策略 ID
const selectedStrategy = ref({})         // 当前选中策略详情

// 任务相关
const tasks = ref([])                    // 所有任务
const pendingTasks = computed(...)       // 等待中的任务
const processingTasks = computed(...)    // 处理中的任务

// UI 状态
const activeTab = ref('mystrategy')      // 当前 Tab
const selectedCollection = ref('all')    // 当前分组
const libraryFilter = ref('all')         // 智能筛选
```

### 6.3 本地存储

| Key | 描述 |
|-----|------|
| `saved_reports` | 已保存的策略报告 |
| `plan_default_settings_v2` | 计划生成默认配置 |
| `broker_accounts` | 券商账户信息 |
| `paper_portfolios` | 模拟盘组合数据 |

---

## 7. 样式规范

### 7.1 配色方案

使用 tokens 设计令牌系统，关键颜色：
- `accent.primary`: 青色 (#06b6d4) - 主要强调色
- `semantic.success`: 绿色 - 成功状态
- `semantic.warning`: 橙色 - 警告状态
- `semantic.error`: 红色 - 错误状态

### 7.2 评级颜色

| 评级 | 暗色模式 | 亮色模式 |
|------|---------|---------|
| A | 绿色 (emerald) | 绿色 |
| B | 蓝色 (blue) | 蓝色 |
| C | 琥珀色 (amber) | 琥珀色 |
| N/A | 灰色 | 灰色 |

### 7.3 动画效果

- `animate-fade-in`: 淡入动画
- `animate-pulse`: 脉冲动画（用于指示器）
- `animate-gradient-x`: 渐变动画（进度条）
- `glow-primary-lg`: 青色发光效果

---

## 8. API 接口 (预留)

> 当前版本使用 Mock 数据，以下为预留接口设计

### 8.1 策略生成

```
POST /api/strategy/generate
Body: {
  symbols: string[],
  frameworks: string[],
  period: string,
  risk: string,
  insights: {
    macro: string,
    ticker: string
  }
}
Response: {
  taskId: string,
  estimatedTime: number
}
```

### 8.2 获取策略列表

```
GET /api/strategies
Query: {
  collection?: string,
  filter?: string,
  search?: string,
  direction?: 'long' | 'short',
  sortBy?: string,
  sortDir?: 'asc' | 'desc'
}
Response: {
  strategies: Strategy[],
  total: number
}
```

### 8.3 生成执行计划

```
POST /api/plan/generate
Body: {
  strategyId: string,
  hasPosition: boolean,
  averageCost?: number,
  positionSize?: number,
  investmentHorizon: 'short' | 'medium' | 'long',
  riskPreference: number
}
Response: {
  planId: string,
  estimatedTime: number
}
```

---

## 9. 未来规划

1. **实时数据集成**: 接入真实市场数据 API
2. **策略回测**: 添加历史回测功能
3. **策略分享**: 支持策略社区分享
4. **AI 对话增强**: 更智能的策略讨论功能
5. **多券商支持**: 扩展更多券商 API 集成

---

## 附录

### A. 文件依赖

```
src/pages/OpportunityPageB.vue
├── src/components/Navbar.vue
├── src/composables/useUserProfile.js
├── src/composables/useSavedReports.js
├── src/composables/usePaperPortfolio.js
├── src/composables/useBrokerAccounts.js
├── src/composables/useDesignTokens.js
└── src/router/index.js
```

### B. 相关页面

- `/opportunity/report/:reportId` - 策略报告详情页
- `/pricing` - 定价/充值页面
- `/portfolio` - 投资组合页面
- `/stock-attribution/:symbol` - 股票归因分析页

---

*文档版本: 1.0*  
*编写日期: 2026-01-20*
