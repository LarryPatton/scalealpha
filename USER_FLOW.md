# ScaleAlpha.ai 用户流程图 (User Flow)

> **文档说明**：本文档使用 Mermaid 流程图描述 ScaleAlpha.ai 平台的用户交互流程、决策路径和状态转换。

---

## 📋 目录

1. [核心用户旅程](#核心用户旅程)
2. [工作流状态转换图](#工作流状态转换图)
3. [登录与认证流程](#登录与认证流程)
4. [信息中心导航流程](#信息中心导航流程)
5. [机会发现流程](#机会发现流程)
6. [计划制定流程](#计划制定流程)
7. [一键交易流程](#一键交易流程)
8. [路由守卫决策树](#路由守卫决策树)
9. [数据流转图](#数据流转图)

---

## 1. 核心用户旅程

### 新用户完整旅程（Happy Path）

```mermaid
graph TD
    Start([用户首次访问]) --> Home[首页 /home]
    Home --> Login{是否登录?}
    Login -->|否| LoginPage[登录页 /login]
    Login -->|是| Info[信息中心 /info]
    LoginPage --> LoginSuccess[登录成功]
    LoginSuccess --> Info
    
    Info --> BrowseInfo[浏览市场/股票/ETF信息]
    BrowseInfo --> InfoDetail[查看详情页]
    InfoDetail --> AddWatchlist[添加到自选股]
    AddWatchlist --> DecideNext{下一步?}
    
    DecideNext -->|开始投资| PortfolioInput[我的投资信息 /portfolio-input]
    DecideNext -->|继续浏览| Info
    
    PortfolioInput --> FillForm[填写个人信息]
    FillForm --> RiskAssessment[风险评估]
    RiskAssessment --> SubmitInfo[提交信息]
    SubmitInfo --> UnlockOpportunity[✅ 解锁机会发现]
    
    UnlockOpportunity --> Opportunity[机会发现 /opportunity]
    Opportunity --> ViewReports[查看AI生成的机会报告]
    ViewReports --> SaveReports[保存感兴趣的报告]
    SaveReports --> UnlockPlanning[✅ 解锁计划制定]
    
    UnlockPlanning --> Planning[计划制定 /planning]
    Planning --> CreatePlan[创建投资计划]
    CreatePlan --> ReviewPlan[审核计划细节]
    ReviewPlan --> SavePlan[保存计划]
    SavePlan --> UnlockTrading[✅ 解锁一键交易]
    
    UnlockTrading --> Trading[一键交易 /scalealpha/trading]
    Trading --> ConnectBroker[连接券商账户]
    ConnectBroker --> SelectPlan[选择要执行的计划]
    SelectPlan --> ConfirmTrade[确认交易]
    ConfirmTrade --> ExecuteTrade[执行交易]
    ExecuteTrade --> TradeSuccess[✅ 交易完成]
    
    TradeSuccess --> Review[交易复盘 /review]
    Review --> ViewPerformance[查看绩效]
    ViewPerformance --> End([完成完整流程])
    
    style Start fill:#e1f5e1
    style End fill:#e1f5e1
    style UnlockOpportunity fill:#fff3cd
    style UnlockPlanning fill:#fff3cd
    style UnlockTrading fill:#fff3cd
    style TradeSuccess fill:#d4edda
```

---

## 2. 工作流状态转换图

### 六步核心工作流（WorkflowNav）

```mermaid
stateDiagram-v2
    [*] --> Info
    
    Info --> PortfolioInput : 始终可访问
    
    state Info {
        [*] --> Available
        Available --> Current : 访问页面
        Current --> Completed : 浏览内容
    }
    
    state PortfolioInput {
        [*] --> Available
        Available --> Current : 访问页面
        Current --> Completed : 提交信息
    }
    
    PortfolioInput --> Opportunity : hasInputPortfolio = true
    
    state Opportunity {
        [*] --> Locked : 默认锁定
        Locked --> Available : 完成信息填写
        Available --> Current : 访问页面
        Current --> Completed : 保存报告
    }
    
    Opportunity --> Planning : hasViewedOpportunity = true
    
    state Planning {
        [*] --> Locked
        Locked --> Available : 访问机会发现
        Available --> Current : 访问页面
        Current --> Completed : 创建计划
    }
    
    Planning --> Trade : hasCreatedPlan = true
    
    state Trade {
        [*] --> Locked
        Locked --> Available : 制定计划
        Available --> Current : 访问页面
        Current --> Completed : 执行交易
    }
    
    Trade --> Review : hasExecutedTrade = true
    
    state Review {
        [*] --> Locked
        Locked --> Available : 执行交易
        Available --> Current : 访问页面
        Current --> Completed : 完成复盘
    }
    
    Review --> [*]
    
    note right of Info
        状态说明：
        - Locked: 锁定
        - Available: 可访问
        - Current: 当前页面
        - Completed: 已完成
    end note
```

---

## 3. 登录与认证流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant App as 应用
    participant Router as 路由器
    participant Storage as LocalStorage
    
    User->>App: 访问应用
    App->>Router: 检查路由
    Router->>Storage: 读取 isLoggedIn
    
    alt 未登录
        Storage-->>Router: false
        Router->>App: 显示"登录/注册"按钮
        User->>App: 点击登录
        App->>Router: 跳转 /login
        Router->>App: 显示登录页
        User->>App: 输入邮箱密码
        User->>App: 点击登录
        App->>Storage: 保存 isLoggedIn = true
        App->>Storage: 保存 userEmail
        App->>Router: 跳转 /info
    else 已登录
        Storage-->>Router: true
        Router->>App: 显示用户头像
        User->>App: 点击头像
        App->>User: 显示账户菜单
        
        alt 选择登出
            User->>App: 点击登出
            App->>Storage: localStorage.clear()
            App->>Router: 刷新页面到 /scalealpha/
        else 选择重置进度
            User->>App: 点击重置进度
            App->>App: 确认对话框
            User->>App: 确认
            App->>Storage: 清除所有进度数据
            App->>Router: 跳转 /info
            App->>Router: 刷新页面
        end
    end
```

---

## 4. 信息中心导航流程

```mermaid
graph LR
    InfoPage[信息中心主页 /info]
    
    InfoPage --> Market[市场卡片]
    InfoPage --> ETF[ETF卡片]
    InfoPage --> Stock[股票卡片]
    InfoPage --> Community[社区卡片]
    InfoPage --> Official[官方资讯]
    InfoPage --> Watchlist[自选股侧边栏]
    
    Market --> MarketDetail[市场详情 /info/market/:id]
    ETF --> ETFDetail[ETF详情 /info/etf/:id]
    Stock --> StockDetail[股票详情 /info/stock/:id]
    Community --> CommunityDetail[社区详情 /info/community/:id]
    
    StockDetail --> AddToWatchlist{添加自选股?}
    ETFDetail --> AddToWatchlist
    
    AddToWatchlist -->|是| WatchlistStorage[保存到 localStorage]
    WatchlistStorage --> UpdateWatchlist[更新自选股侧边栏]
    UpdateWatchlist --> Watchlist
    
    AddToWatchlist -->|否| StayOnDetail[继续浏览]
    
    Watchlist --> QuickAccess[快速访问自选股详情]
    QuickAccess --> StockDetail
    QuickAccess --> ETFDetail
    
    style InfoPage fill:#e3f2fd
    style MarketDetail fill:#fff3e0
    style ETFDetail fill:#fff3e0
    style StockDetail fill:#fff3e0
    style CommunityDetail fill:#fff3e0
```

---

## 5. 机会发现流程

```mermaid
graph TD
    Start([用户访问 /opportunity]) --> CheckAuth{已填写<br/>投资信息?}
    
    CheckAuth -->|否| Redirect[重定向到 /portfolio-input]
    Redirect --> PortfolioInput[填写投资信息]
    PortfolioInput --> ReturnOpportunity[返回机会发现]
    
    CheckAuth -->|是| LoadPage[加载机会发现页面]
    LoadPage --> GenerateReports[AI生成机会报告]
    
    GenerateReports --> DisplayReports[展示报告卡片]
    DisplayReports --> UserAction{用户操作}
    
    UserAction -->|查看详情| ViewDetail[/opportunity/report/:id]
    ViewDetail --> ReadDetail[阅读详细分析]
    ReadDetail --> BackToList[返回列表]
    BackToList --> UserAction
    
    UserAction -->|保存报告| OpenSaveDialog[打开保存对话框]
    OpenSaveDialog --> SelectCategory[选择分类]
    SelectCategory --> SaveToStorage[保存到 localStorage]
    SaveToStorage --> UpdateUI[更新UI显示已保存]
    UpdateUI --> UnlockNext[✅ 解锁计划制定]
    
    UserAction -->|分类持仓| OpenClassifyDialog[打开分类对话框]
    OpenClassifyDialog --> ClassifyHoldings[对持仓分类]
    ClassifyHoldings --> SaveClassification[保存分类结果]
    SaveClassification --> UserAction
    
    UserAction -->|继续浏览| DisplayReports
    
    UnlockNext --> NextStep[可访问 /planning]
    
    style CheckAuth fill:#fff3cd
    style UnlockNext fill:#d4edda
    style Redirect fill:#f8d7da
```

---

## 6. 计划制定流程

```mermaid
graph TD
    Start([访问 /planning]) --> CheckUnlock{已查看<br/>机会发现?}
    
    CheckUnlock -->|否| ShowLocked[显示锁定状态]
    ShowLocked --> RedirectOpp[重定向到 /opportunity]
    
    CheckUnlock -->|是| LoadPlanning[加载计划制定页面]
    LoadPlanning --> ShowSavedReports[显示已保存的机会报告]
    
    ShowSavedReports --> UserSelect{用户选择}
    
    UserSelect -->|选择报告| SelectReport[选中一个或多个报告]
    SelectReport --> CreatePlan[点击"创建计划"]
    
    CreatePlan --> FillPlanDetails[填写计划详情]
    FillPlanDetails --> SetAmount[设置投资金额]
    SetAmount --> SetTimeframe[设置时间框架]
    SetTimeframe --> SetStrategy[选择策略]
    SetStrategy --> ReviewPlan[预览计划]
    
    ReviewPlan --> ConfirmPlan{确认计划?}
    ConfirmPlan -->|否| FillPlanDetails
    ConfirmPlan -->|是| SavePlan[保存计划]
    
    SavePlan --> UpdateStorage[更新 localStorage]
    UpdateStorage --> ShowPlanList[显示在计划列表]
    ShowPlanList --> MarkComplete[✅ 标记 hasCreatedPlan]
    MarkComplete --> UnlockTrading[解锁一键交易]
    
    UserSelect -->|查看已有计划| ViewPlanList[查看计划列表]
    ViewPlanList --> SelectExisting[选择已有计划]
    SelectExisting --> ViewPlanDetail[查看计划详情 /planning/:id]
    
    ViewPlanDetail --> EditPlan{编辑计划?}
    EditPlan -->|是| FillPlanDetails
    EditPlan -->|否| BackToList[返回列表]
    BackToList --> UserSelect
    
    UnlockTrading --> NextStep[可访问 /scalealpha/trading]
    
    style CheckUnlock fill:#fff3cd
    style MarkComplete fill:#d4edda
    style ShowLocked fill:#f8d7da
```

---

## 7. 一键交易流程

```mermaid
sequenceDiagram
    participant User as 用户
    participant Page as 一键交易页面
    participant BrokerDialog as 券商选择对话框
    participant Storage as LocalStorage
    participant ConfirmDialog as 持仓确认对话框
    participant BrokerAPI as 券商API
    
    User->>Page: 访问 /scalealpha/trading
    Page->>Storage: 检查券商连接状态
    
    alt 未连接券商
        Storage-->>Page: isConnected = false
        Page->>User: 显示"连接券商"按钮
        User->>Page: 点击连接券商
        Page->>BrokerDialog: 打开券商选择对话框
        BrokerDialog->>User: 显示券商列表
        User->>BrokerDialog: 选择券商
        BrokerDialog->>BrokerAPI: 发起连接请求
        BrokerAPI-->>BrokerDialog: 返回连接状态
        BrokerDialog->>Storage: 保存连接信息
        Storage-->>Page: isConnected = true
        Page->>User: 显示已连接状态
    else 已连接券商
        Storage-->>Page: isConnected = true
        Page->>User: 显示券商账户信息
    end
    
    Page->>Storage: 读取已保存的计划
    Storage-->>Page: 返回计划列表
    Page->>User: 显示可执行的计划
    
    User->>Page: 选择要执行的计划
    Page->>User: 显示计划详情
    User->>Page: 点击"一键执行"
    
    Page->>ConfirmDialog: 打开持仓确认对话框
    ConfirmDialog->>BrokerAPI: 获取当前持仓
    BrokerAPI-->>ConfirmDialog: 返回持仓数据
    ConfirmDialog->>User: 显示交易前后对比
    
    User->>ConfirmDialog: 确认执行?
    
    alt 用户确认
        ConfirmDialog->>BrokerAPI: 提交交易订单
        BrokerAPI-->>ConfirmDialog: 订单执行结果
        ConfirmDialog->>Storage: 更新持仓数据
        ConfirmDialog->>Page: 显示交易成功
        Page->>Storage: 标记 hasExecutedTrade = true
        Page->>User: ✅ 交易完成，解锁复盘
    else 用户取消
        ConfirmDialog->>Page: 关闭对话框
        Page->>User: 返回计划选择
    end
```

---

## 8. 路由守卫决策树

```mermaid
graph TD
    Start([用户访问路由]) --> GuardCheck{路由守卫检查}
    
    GuardCheck --> CheckUserInfo{需要用户信息?}
    
    CheckUserInfo -->|是| HasUserInfo{已填写<br/>用户信息?}
    CheckUserInfo -->|否| CheckReports{需要保存报告?}
    
    HasUserInfo -->|否| RedirectInput[重定向到 /portfolio-input]
    HasUserInfo -->|是| CheckReports
    
    CheckReports -->|是| HasReports{已保存报告?}
    CheckReports -->|否| AllowAccess[✅ 允许访问]
    
    HasReports -->|否| RedirectOpp[重定向到 /opportunity]
    HasReports -->|是| CheckWorkflow{工作流步骤<br/>是否解锁?}
    
    CheckWorkflow -->|否| RedirectPrev[重定向到前置步骤]
    CheckWorkflow -->|是| AllowAccess
    
    RedirectInput --> InputPage[/portfolio-input]
    RedirectOpp --> OppPage[/opportunity]
    RedirectPrev --> PrevPage[前置页面]
    
    AllowAccess --> MarkVisited[标记页面已访问]
    MarkVisited --> UpdateProgress[更新工作流进度]
    UpdateProgress --> RenderPage[渲染目标页面]
    
    style GuardCheck fill:#fff3cd
    style AllowAccess fill:#d4edda
    style RedirectInput fill:#f8d7da
    style RedirectOpp fill:#f8d7da
    style RedirectPrev fill:#f8d7da
```

### 路由守卫规则表

| 路由 | 需要用户信息 | 需要保存报告 | 工作流前置条件 | 失败重定向 |
|------|-------------|-------------|---------------|-----------|
| `/info` | ❌ | ❌ | 无 | - |
| `/portfolio-input` | ❌ | ❌ | 无 | - |
| `/opportunity` | ✅ | ❌ | hasInputPortfolio | `/portfolio-input` |
| `/planning` | ❌ | ❌ | hasViewedOpportunity | `/opportunity` |
| `/scalealpha/trading` | ❌ | ❌ | hasCreatedPlan | `/planning` |
| `/trading` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/portfolio` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/alerts` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/event` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/history` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/backtest` | ✅ | ❌ | 无 | `/portfolio-input` |
| `/blog` | ❌ | ❌ | 无 | - |
| `/insight` | ❌ | ❌ | 无 | - |

---

## 9. 数据流转图

### LocalStorage 数据架构

```mermaid
graph TB
    subgraph "用户认证"
        Auth1[isLoggedIn]
        Auth2[userEmail]
    end
    
    subgraph "用户配置"
        Profile1[scaleAlpha_userProfile]
        Profile2[portfolio_info_submitted]
        Profile3[portfolio_input_data]
        Profile4[portfolio_last_saved]
    end
    
    subgraph "投资数据"
        Invest1[user_holdings]
        Invest2[riskAssessmentResult]
        Invest3[scaleAlpha_savedReports]
        Invest4[opportunity_report_categories]
    end
    
    subgraph "自选股与设置"
        Watch1[scaleAlpha_watchlists]
        Watch2[scaleAlpha_selectedGroup]
        Watch3[scaleAlpha_watchlists_version]
        Settings[scaleAlpha_settings]
    end
    
    subgraph "工作流进度"
        Workflow[workflow_progress]
        Workflow --> WF1[hasViewedInfo]
        Workflow --> WF2[hasInputPortfolio]
        Workflow --> WF3[hasViewedOpportunity]
        Workflow --> WF4[hasCreatedPlan]
        Workflow --> WF5[hasExecutedTrade]
        Workflow --> WF6[hasReviewedTrade]
    end
    
    subgraph "券商连接"
        Broker[scaleAlpha_brokerAccount]
    end
    
    LoginPage --> Auth1
    LoginPage --> Auth2
    
    PortfolioInputPage --> Profile2
    PortfolioInputPage --> Profile3
    PortfolioInputPage --> Profile4
    PortfolioInputPage --> Profile1
    PortfolioInputPage --> Invest1
    PortfolioInputPage --> Invest2
    
    OpportunityPage --> Invest3
    OpportunityPage --> Invest4
    
    InfoPage --> Watch1
    InfoPage --> Watch2
    InfoPage --> Watch3
    
    OneClickTradingPage --> Broker
    
    AllPages[所有页面] --> Workflow
    
    style Auth1 fill:#e3f2fd
    style Auth2 fill:#e3f2fd
    style Workflow fill:#fff3e0
    style Invest3 fill:#e8f5e9
```

### 组件间数据传递

```mermaid
sequenceDiagram
    participant User as 用户操作
    participant Component as 页面组件
    participant Composable as Composable
    participant Storage as LocalStorage
    participant Router as Vue Router
    
    User->>Component: 执行操作（如保存报告）
    Component->>Composable: 调用 composable 方法
    Composable->>Storage: 读取现有数据
    Storage-->>Composable: 返回数据
    Composable->>Composable: 处理业务逻辑
    Composable->>Storage: 保存更新后的数据
    Storage-->>Composable: 确认保存
    Composable->>Component: 更新响应式状态
    Component->>User: 更新UI显示
    
    opt 如果影响工作流
        Component->>Composable: 调用 updateProgress()
        Composable->>Storage: 更新 workflow_progress
        Storage-->>Composable: 确认
        Composable->>Router: 解锁下一步路由
        Router->>Component: 更新导航状态
        Component->>User: 显示解锁提示
    end
```

---

## 10. 异常处理流程

### 数据丢失恢复

```mermaid
graph TD
    Start([用户操作]) --> CheckData{检查数据完整性}
    
    CheckData -->|数据正常| NormalFlow[正常流程]
    CheckData -->|数据缺失| ShowError[显示错误提示]
    
    ShowError --> OfferRecovery{提供恢复选项}
    
    OfferRecovery -->|重新填写| RedirectInput[跳转到数据输入页]
    OfferRecovery -->|使用草稿| LoadDraft[加载草稿数据]
    OfferRecovery -->|重置全部| ConfirmReset[确认重置]
    
    LoadDraft --> CheckDraft{草稿有效?}
    CheckDraft -->|是| RestoreData[恢复数据]
    CheckDraft -->|否| RedirectInput
    
    RestoreData --> NormalFlow
    
    ConfirmReset --> ClearStorage[清空 localStorage]
    ClearStorage --> RedirectHome[跳转到首页]
    
    RedirectInput --> UserInput[用户重新输入]
    UserInput --> SaveNew[保存新数据]
    SaveNew --> NormalFlow
    
    NormalFlow --> End([继续使用])
    RedirectHome --> End
    
    style ShowError fill:#f8d7da
    style RestoreData fill:#d4edda
    style NormalFlow fill:#d4edda
```

### 网络错误处理

```mermaid
graph LR
    Request[发起请求] --> Loading[显示加载状态]
    Loading --> Result{请求结果}
    
    Result -->|成功| Success[处理成功响应]
    Result -->|失败| Error[捕获错误]
    
    Error --> ErrorType{错误类型}
    
    ErrorType -->|网络超时| Retry[提供重试选项]
    ErrorType -->|服务器错误| ShowServerError[显示服务器错误]
    ErrorType -->|权限错误| RedirectLogin[跳转登录]
    ErrorType -->|数据错误| ShowDataError[显示数据错误]
    
    Retry --> UserRetry{用户重试?}
    UserRetry -->|是| Request
    UserRetry -->|否| Cancel[取消操作]
    
    ShowServerError --> ContactSupport[联系客服]
    ShowDataError --> CheckData[检查输入数据]
    
    Success --> End([完成])
    RedirectLogin --> End
    Cancel --> End
    ContactSupport --> End
    CheckData --> End
    
    style Success fill:#d4edda
    style Error fill:#f8d7da
```

---

## 📊 用户行为统计点

### 关键埋点位置

| 页面/功能 | 埋点事件 | 触发时机 |
|----------|---------|---------|
| `/info` | `page_view_info` | 进入信息中心 |
| `/info/stock/:id` | `view_stock_detail` | 查看股票详情 |
| 自选股 | `add_to_watchlist` | 添加自选股 |
| `/portfolio-input` | `start_input_portfolio` | 开始填写信息 |
| `/portfolio-input` | `submit_portfolio` | 提交投资信息 |
| `/opportunity` | `view_opportunity_report` | 查看机会报告 |
| `/opportunity` | `save_opportunity_report` | 保存机会报告 |
| `/planning` | `create_plan` | 创建投资计划 |
| `/planning/:id` | `edit_plan` | 编辑计划 |
| `/scalealpha/trading` | `connect_broker` | 连接券商 |
| `/scalealpha/trading` | `execute_trade` | 执行交易 |
| WorkflowNav | `click_workflow_step` | 点击工作流步骤 |
| 导航栏 | `click_nav_locked` | 点击锁定的导航项 |

---

## 🔄 工作流完成度追踪

```mermaid
pie title 用户完成度分布（示例数据）
    "仅浏览Info" : 30
    "完成信息填写" : 25
    "查看机会发现" : 20
    "制定投资计划" : 15
    "执行交易" : 8
    "完成复盘" : 2
```

---

## 📝 用户旅程时间线

```mermaid
gantt
    title 典型用户使用时间线
    dateFormat  mm:ss
    section 首次访问
    浏览首页           :00:00, 01:00
    登录注册           :01:00, 02:00
    section 信息获取
    浏览Info中心       :02:00, 05:00
    查看股票详情       :05:00, 08:00
    添加自选股         :08:00, 10:00
    section 投资准备
    填写个人信息       :10:00, 15:00
    风险评估           :15:00, 17:00
    section 机会发现
    查看AI报告         :17:00, 22:00
    保存机会报告       :22:00, 23:00
    section 计划执行
    制定投资计划       :23:00, 28:00
    连接券商账户       :28:00, 30:00
    执行一键交易       :30:00, 32:00
    section 复盘总结
    查看交易结果       :32:00, 35:00
```

---

## 🎯 关键决策点分析

### 用户流失风险点

1. **登录页** → 登录流程过于复杂
   - **优化建议**: 支持社交账号登录，减少输入步骤

2. **PortfolioInput** → 信息填写过长
   - **优化建议**: 分步填写，保存草稿，显示进度条

3. **Opportunity** → 报告内容难以理解
   - **优化建议**: 增加视频讲解，简化专业术语

4. **Planning** → 计划制定决策困难
   - **优化建议**: 提供模板计划，智能推荐参数

5. **Trading** → 券商连接失败
   - **优化建议**: 提供详细错误说明，多券商备选

---

## 🔐 安全检查点

```mermaid
graph TD
    Access([用户访问敏感功能]) --> Auth{已登录?}
    
    Auth -->|否| RedirectLogin[跳转登录页]
    Auth -->|是| CheckSession{会话有效?}
    
    CheckSession -->|否| SessionExpired[会话过期提示]
    SessionExpired --> RedirectLogin
    
    CheckSession -->|是| CheckPermission{有权限?}
    
    CheckPermission -->|否| ShowError[显示权限错误]
    CheckPermission -->|是| CheckData{数据完整?}
    
    CheckData -->|否| RequireData[要求补充数据]
    CheckData -->|是| AllowAccess[✅ 允许访问]
    
    RequireData --> RedirectInput[跳转数据填写页]
    
    ShowError --> End([结束])
    RedirectLogin --> End
    RedirectInput --> End
    AllowAccess --> End
    
    style AllowAccess fill:#d4edda
    style ShowError fill:#f8d7da
    style SessionExpired fill:#f8d7da
```

---

**文档版本**: v1.0  
**最后更新**: 2024年12月  
**维护者**: ScaleAlpha.ai Team

---

## 附录：Mermaid 图表说明

本文档使用 Mermaid 语法绘制流程图，支持在以下平台渲染：
- GitHub Markdown
- GitLab Markdown  
- VS Code (with Mermaid extension)
- Typora
- 在线工具: https://mermaid.live/

如需编辑图表，可复制代码块到 Mermaid 在线编辑器进行修改。
