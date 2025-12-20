# OpportunityPageB 可复用组件与状态参考文档

> **页面路径**: `http://localhost:5173/scalealpha/opportunityB?tab=mystrategy`  
> **文件位置**: `src/pages/OpportunityPageB.vue`  
> **最后更新**: 2024-12-19

---

## 📋 目录

1. [设计令牌 (Design Tokens)](#1-设计令牌)
2. [基础组件](#2-基础组件)
3. [复合组件](#3-复合组件)
4. [状态类型](#4-状态类型)
5. [动画效果](#5-动画效果)
6. [图标组件](#6-图标组件)

---

## 1. 设计令牌

### 颜色系统 (`tokens.colors`)

```javascript
// 通过 useTheme() 获取
const { tokens, isDark } = useTheme()

tokens.colors = {
  background: {
    base: '#0a0a0f',      // 页面背景
    surface: '#12121a',   // 卡片/面板背景
    elevated: '#1a1a24',  // 提升层背景
    overlay: '#22222e',   // 叠加层背景
  },
  text: {
    primary: '#ffffff',   // 主要文字
    secondary: '#e0e0e0', // 次要文字
    tertiary: '#a0a0a0',  // 三级文字
    muted: '#6b7280',     // 柔和文字
    disabled: '#4b5563',  // 禁用文字
  },
  border: {
    default: '#2a2a3a',   // 默认边框
    strong: '#3a3a4a',    // 强调边框
    subtle: '#1f1f2a',    // 细微边框
    hover: '#4a4a5a',     // 悬停边框
  },
  accent: {
    primary: '#06b6d4',   // 主强调色 (cyan-500)
    secondary: '#8b5cf6', // 次强调色 (violet-500)
    warning: '#f59e0b',   // 警告色 (amber-500)
  },
  semantic: {
    success: '#10b981',   // 成功 (emerald-500)
    error: '#ef4444',     // 错误 (red-500)
    warning: '#f59e0b',   // 警告 (amber-500)
    info: '#3b82f6',      // 信息 (blue-500)
  }
}
```

---

## 2. 基础组件

### 2.1 Badge / Tag (标签)

#### Direction Badge (方向标签)

```vue
<!-- LONG 状态 -->
<span 
  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
  :style="{
    color: tokens.colors.semantic.success,
    borderColor: tokens.colors.semantic.success + '4D',
    backgroundColor: tokens.colors.semantic.success + '1A'
  }"
>
  LONG
</span>

<!-- SHORT 状态 -->
<span 
  class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border"
  :style="{
    color: tokens.colors.semantic.error,
    borderColor: tokens.colors.semantic.error + '4D',
    backgroundColor: tokens.colors.semantic.error + '1A'
  }"
>
  SHORT
</span>
```

**状态变体**:
| 状态 | 文字色 | 背景透明度 | 边框透明度 |
|------|--------|------------|------------|
| LONG | `semantic.success` | `1A` (10%) | `4D` (30%) |
| SHORT | `semantic.error` | `1A` (10%) | `4D` (30%) |

---

#### Grade Badge (评级标签)

```vue
<div 
  class="w-6 h-6 flex items-center justify-center rounded font-bold text-xs border mx-auto"
  :style="gradeStyles[grade]"
>
  {{ grade }}
</div>
```

**状态样式**:
```javascript
const gradeStyles = {
  'A+': { color: 'semantic.success', bgOpacity: '1A', borderOpacity: '4D' },
  'A':  { color: 'semantic.success', bgOpacity: '1A', borderOpacity: '4D' },
  'B':  { color: 'accent.primary', bgOpacity: '1A', borderOpacity: '4D' },
  'C':  { color: 'semantic.warning', bgOpacity: '1A', borderOpacity: '4D' },
  'N/A': { color: 'text.muted', bg: 'background.elevated' }
}
```

---

#### Source Badge (来源标签)

```vue
<span 
  class="px-2 py-0.5 rounded text-[10px] font-bold border"
  :class="{
    'text-cyan-400 border-cyan-500/30 bg-cyan-900/10': source === 'AI',
    'text-orange-400 border-orange-500/30 bg-orange-900/10': source === 'Manual',
    'text-violet-400 border-violet-500/30 bg-violet-900/10': source === 'Import'
  }"
>
  {{ source }}
</span>
```

**状态变体**:
| 来源 | 颜色 | CSS 类 |
|------|------|--------|
| AI | Cyan | `text-cyan-400 border-cyan-500/30 bg-cyan-900/10` |
| Manual | Orange | `text-orange-400 border-orange-500/30 bg-orange-900/10` |
| Import | Violet | `text-violet-400 border-violet-500/30 bg-violet-900/10` |
| Official | Blue | `text-blue-400 border-blue-500/30 bg-blue-900/10` |

---

#### Horizon Badge (周期标签)

```vue
<span 
  class="px-2 py-0.5 rounded text-[10px] font-bold border"
  :style="horizonStyles[horizon]"
>
  {{ horizonLabel }}
</span>
```

**状态映射**:
| 周期 | 显示文字 | 颜色 |
|------|----------|------|
| Long Term | Long | `accent.secondary` (紫色) |
| Medium Term | Medium | `accent.primary` (青色) |
| Short Term | Short | `semantic.warning` (琥珀色) |

---

#### Status Badge (状态标签)

```vue
<!-- Processing 状态 -->
<span class="text-[10px] px-1.5 py-0.5 rounded border"
  :style="{
    backgroundColor: tokens.colors.accent.primary + '33',
    color: tokens.colors.accent.primary,
    borderColor: tokens.colors.accent.primary + '4D'
  }"
>
  PROCESSING
</span>

<!-- Update 按钮状态 -->
<button 
  class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
  :style="{
    backgroundColor: tokens.colors.semantic.warning + '4D',
    borderColor: tokens.colors.semantic.warning + '99',
    color: tokens.colors.semantic.warning
  }"
>
  Update
</button>

<!-- Updated 静态状态 -->
<span 
  class="px-2.5 py-1 border rounded text-[10px] font-bold uppercase tracking-wider"
  :style="{
    backgroundColor: tokens.colors.semantic.success + '4D',
    borderColor: tokens.colors.semantic.success + '99',
    color: tokens.colors.semantic.success
  }"
>
  Updated
</span>
```

---

#### Plan Status Badge

```vue
<!-- With Plan -->
<span class="px-2 py-0.5 rounded text-[10px] font-bold border"
  :style="{
    color: tokens.colors.semantic.success,
    borderColor: tokens.colors.semantic.success + '4D',
    backgroundColor: tokens.colors.semantic.success + '1A'
  }"
>
  With Plan
</span>

<!-- Only Plan -->
<span class="px-2 py-0.5 rounded text-[10px] font-bold border"
  :style="{
    color: tokens.colors.accent.secondary,
    borderColor: tokens.colors.accent.secondary + '4D',
    backgroundColor: tokens.colors.accent.secondary + '1A'
  }"
>
  Only Plan
</span>
```

---

#### Unread Count Badge

```vue
<span 
  class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold"
  :style="{
    backgroundColor: tokens.colors.accent.primary,
    color: tokens.colors.background.base
  }"
>
  {{ count }}
</span>
```

---

### 2.2 Button (按钮)

#### Primary Action Button

```vue
<button 
  class="px-8 py-3 font-bold text-sm tracking-widest uppercase rounded-sm transition-all flex items-center gap-2"
  :class="disabled 
    ? 'text-gray-600 cursor-not-allowed' 
    : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]'"
>
  <svg class="w-4 h-4"><!-- icon --></svg>
  Initialize Generation
</button>
```

---

#### Icon Action Button (表格操作)

```vue
<!-- Generate Plan -->
<button 
  class="p-1.5 border rounded transition-colors"
  :style="{
    backgroundColor: tokens.colors.semantic.success + '33',
    borderColor: tokens.colors.semantic.success + '66',
    color: tokens.colors.semantic.success
  }"
>
  <svg class="w-3.5 h-3.5"><!-- lightning icon --></svg>
</button>

<!-- View Plans -->
<button 
  class="p-1.5 border rounded transition-colors"
  :style="{
    backgroundColor: tokens.colors.accent.primary + '33',
    borderColor: tokens.colors.accent.primary + '66',
    color: tokens.colors.accent.primary
  }"
>
  <svg class="w-3.5 h-3.5"><!-- eye icon --></svg>
</button>

<!-- Delete -->
<button 
  class="p-1.5 border rounded transition-colors"
  :style="{
    backgroundColor: tokens.colors.semantic.error + '33',
    borderColor: tokens.colors.semantic.error + '66',
    color: tokens.colors.semantic.error
  }"
>
  <svg class="w-3.5 h-3.5"><!-- trash icon --></svg>
</button>
```

---

#### Tab Button

```vue
<button 
  class="flex-1 py-1.5 text-xs font-medium rounded-sm transition-all uppercase tracking-wider"
  :class="isActive ? 'text-cyan-400 shadow-sm' : ''"
  :style="isActive 
    ? { backgroundColor: tokens.colors.background.overlay } 
    : { color: tokens.colors.text.muted }"
>
  {{ label }}
</button>
```

---

#### Toggle Switch

```vue
<button 
  @click="toggle"
  class="relative w-7 h-4 rounded-full transition-colors duration-200"
  :class="enabled ? 'bg-cyan-600' : ''"
  :style="!enabled ? { backgroundColor: tokens.colors.border.strong } : {}"
>
  <span 
    class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform duration-200"
    :class="enabled ? 'translate-x-3' : 'translate-x-0'"
  />
</button>
```

---

### 2.3 Input (输入框)

#### Search Input

```vue
<div class="relative">
  <input 
    type="text" 
    placeholder="Search strategies..." 
    class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none w-48 font-mono"
    :style="{
      backgroundColor: tokens.colors.background.elevated,
      borderColor: tokens.colors.border.strong,
      color: tokens.colors.text.primary
    }"
  />
  <div class="absolute right-2 top-1.5" :style="{ color: tokens.colors.text.muted }">
    <svg class="w-3 h-3"><!-- search icon --></svg>
  </div>
</div>
```

---

#### Text Input with Focus Ring

```vue
<input 
  type="text" 
  class="w-full border text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-mono"
  :style="{
    backgroundColor: tokens.colors.background.base,
    borderColor: tokens.colors.border.strong,
    color: tokens.colors.text.primary
  }"
/>
```

---

#### Select Dropdown

```vue
<select 
  class="border text-xs px-3 py-1.5 rounded-sm focus:outline-none font-mono"
  :style="{
    backgroundColor: tokens.colors.background.elevated,
    borderColor: tokens.colors.border.strong,
    color: tokens.colors.text.primary
  }"
>
  <option value="all">All Directions</option>
  <option value="long">Long</option>
  <option value="short">Short</option>
</select>
```

---

### 2.4 Checkbox / Radio

#### Checkbox

```vue
<div 
  @click="toggle"
  class="w-5 h-5 border rounded-[2px] flex items-center justify-center cursor-pointer transition-colors mx-auto" 
  :style="isChecked 
    ? { backgroundColor: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary }
    : { borderColor: tokens.colors.border.strong }"
>
  <svg v-if="isChecked" class="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  </svg>
</div>
```

---

#### Radio Button

```vue
<div 
  @click="select"
  class="w-5 h-5 border-2 rounded-full flex items-center justify-center cursor-pointer transition-colors mx-auto" 
  :style="isSelected 
    ? { borderColor: tokens.colors.accent.primary, backgroundColor: tokens.colors.accent.primary }
    : { borderColor: tokens.colors.border.strong }"
>
  <div v-if="isSelected" class="w-2 h-2 bg-black rounded-full"></div>
</div>
```

---

### 2.5 Progress Bar

#### Standard Progress

```vue
<div class="h-1 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
  <div 
    class="h-full transition-all duration-300"
    :style="{ width: progress + '%', backgroundColor: tokens.colors.accent.primary }"
  />
</div>
```

---

#### Gradient Progress

```vue
<div class="w-48 h-1.5 rounded-full overflow-hidden" :style="{ backgroundColor: tokens.colors.border.default }">
  <div 
    class="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-300"
    :style="{ width: progress + '%' }"
  />
</div>
```

---

## 3. 复合组件

### 3.1 Toast Notification (通知)

```vue
<div 
  class="min-w-[300px] max-w-md border rounded shadow-2xl p-4 flex items-start gap-3"
  :style="{ backgroundColor: tokens.colors.background.overlay, borderColor: tokens.colors.border.strong }"
  :class="{
    'border-l-4 border-l-emerald-500': type === 'success',
    'border-l-4 border-l-red-500': type === 'error',
    'border-l-4 border-l-blue-500': type === 'info',
    'border-l-4 border-l-yellow-500': type === 'warning'
  }"
>
  <!-- Icon -->
  <div class="shrink-0 mt-0.5">
    <svg v-if="type === 'success'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.success }">...</svg>
    <svg v-else-if="type === 'error'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.error }">...</svg>
    <svg v-else-if="type === 'warning'" class="w-5 h-5" :style="{ color: tokens.colors.semantic.warning }">...</svg>
    <svg v-else class="w-5 h-5" :style="{ color: tokens.colors.accent.primary }">...</svg>
  </div>
  <!-- Message -->
  <p class="text-sm font-medium" :style="{ color: tokens.colors.text.secondary }">{{ message }}</p>
  <!-- Close Button -->
  <button @click="dismiss" :style="{ color: tokens.colors.text.muted }">×</button>
</div>
```

**Toast 类型**:
| 类型 | 左边框颜色 | 图标颜色 |
|------|------------|----------|
| success | `emerald-500` | `semantic.success` |
| error | `red-500` | `semantic.error` |
| warning | `yellow-500` | `semantic.warning` |
| info | `blue-500` | `accent.primary` |

---

### 3.2 Task Card (任务卡片)

#### Processing Task Card

```vue
<div 
  class="min-w-[280px] max-w-[280px] border rounded-sm p-3 relative overflow-hidden group cursor-pointer transition-all shrink-0"
  :style="{ backgroundColor: tokens.colors.background.base }"
  :class="[
    isSelected 
      ? 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-2 ring-cyan-500/30' 
      : 'border-cyan-900/30 hover:border-cyan-500/50'
  ]"
>
  <!-- Selection Indicator -->
  <div v-if="isSelected" class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 animate-gradient-x"></div>
  
  <!-- Header -->
  <div class="flex justify-between items-start mb-2">
    <div class="flex items-center gap-2">
      <span class="text-xs font-bold" :style="{ color: tokens.colors.text.primary }">{{ symbol }}</span>
      <span class="text-[10px] px-1.5 py-0.5 rounded border" 
        :style="{ backgroundColor: tokens.colors.accent.primary + '33', color: tokens.colors.accent.primary, borderColor: tokens.colors.accent.primary + '4D' }">
        PROCESSING
      </span>
    </div>
    <div class="text-[10px]" :style="{ color: tokens.colors.text.muted }">{{ timeLeft }}</div>
  </div>
  
  <!-- Progress -->
  <div class="h-1 rounded-full overflow-hidden mb-2" :style="{ backgroundColor: tokens.colors.border.default }">
    <div class="h-full transition-all duration-300" :style="{ width: progress + '%', backgroundColor: tokens.colors.accent.primary }"></div>
  </div>
  
  <!-- Status Text -->
  <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">{{ statusText }}</div>
</div>
```

---

#### Pending Task Card

```vue
<div 
  class="min-w-[200px] max-w-[200px] border rounded-sm p-3 flex flex-col justify-center cursor-pointer transition-all shrink-0"
  :class="isSelected ? 'border-cyan-500 opacity-100' : 'opacity-70 hover:opacity-100'"
  :style="{ backgroundColor: tokens.colors.background.base, borderColor: isSelected ? undefined : tokens.colors.border.default }"
>
  <div class="flex justify-between items-center mb-1">
    <span class="text-xs font-bold" :style="{ color: tokens.colors.text.tertiary }">{{ symbol }}</span>
    <span class="text-[10px]" :style="{ color: tokens.colors.text.muted }">PENDING</span>
  </div>
  <div class="text-[10px] font-mono" :style="{ color: tokens.colors.text.muted }">Est: {{ estTime }}</div>
</div>
```

---

### 3.3 Selection Card (配置选择卡片)

```vue
<button 
  @click="select(item.id)"
  class="p-2 border rounded-sm transition-all text-left relative group min-h-[60px] flex flex-col justify-between"
  :class="isSelected 
    ? 'border-cyan-500 bg-cyan-900/20 shadow-[0_0_20px_rgba(6,182,212,0.3)] ring-1 ring-cyan-500/50' 
    : 'hover:border-gray-600'"
  :style="isSelected ? {} : { backgroundColor: tokens.colors.background.base, borderColor: tokens.colors.border.default }"
>
  <!-- Header: Icon + Checkbox -->
  <div class="flex justify-between items-start">
    <component :is="item.icon" class="w-4 h-4 transition-colors" :class="isSelected ? 'text-cyan-400' : 'text-gray-600 group-hover:text-cyan-400'" />
    <div class="w-3 h-3 border rounded-[1px] flex items-center justify-center" 
      :class="isSelected ? 'bg-cyan-500 border-cyan-500' : ''" 
      :style="!isSelected ? { borderColor: tokens.colors.border.strong } : {}">
      <svg v-if="isSelected" class="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
        <path d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
  </div>
  
  <!-- Content -->
  <div>
    <div class="text-xs font-bold text-white mb-0.5">{{ item.title }}</div>
    <div class="text-[9px] text-gray-500 leading-tight line-clamp-1">{{ item.desc }}</div>
  </div>
</button>
```

**颜色变体** (用于不同配置类型):
| 类型 | 选中颜色 |
|------|----------|
| Framework | `cyan-500` |
| Period | `blue-500` |
| Risk | `orange-500` |

---

### 3.4 Collection Sidebar Item

```vue
<button 
  @click="selectCollection(col.id)"
  class="w-full flex items-center justify-between px-3 py-2 border-l-2 transition-all group"
  :class="isSelected ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'"
  :style="isSelected ? { backgroundColor: tokens.colors.background.base } : {}"
>
  <div class="flex items-center gap-2">
    <component :is="col.icon" class="w-3.5 h-3.5" :class="isSelected ? 'text-cyan-400' : 'text-gray-600 group-hover:text-gray-400'" />
    <span class="text-xs font-medium">{{ col.label }}</span>
  </div>
  <span class="text-[10px] font-mono" :class="isSelected ? 'text-cyan-500' : 'text-gray-600'">{{ col.count }}</span>
</button>
```

---

### 3.5 Floating Tab Bar

```vue
<div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
  <div class="backdrop-blur-xl border rounded-full p-1.5 shadow-2xl flex items-center gap-1" 
    :style="{ backgroundColor: tokens.colors.background.elevated + 'E6', borderColor: tokens.colors.border.strong }">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      @click="switchTab(tab.id)"
      class="px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2"
      :class="isActive ? 'shadow-lg scale-105' : ''"
      :style="isActive 
        ? { backgroundColor: isDark ? '#ffffff' : tokens.colors.text.primary, color: isDark ? '#000000' : '#ffffff' } 
        : { color: tokens.colors.text.muted }"
    >
      {{ tab.label }}
    </button>
  </div>
</div>
```

---

### 3.6 Modal (弹窗)

```vue
<!-- Backdrop -->
<div 
  v-if="show" 
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
  @click.self="close"
>
  <!-- Modal Container -->
  <div 
    class="border w-[820px] max-w-[95vw] overflow-hidden flex flex-col animate-modal-in"
    :style="{ backgroundColor: tokens.colors.background.surface, borderColor: tokens.colors.border.default }"
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b flex justify-between items-center" 
      :style="{ borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }">
      <!-- Title & Badge -->
      <div class="flex items-center gap-3">
        <div class="px-2.5 py-1 rounded text-xs font-semibold tracking-wide uppercase" 
          :style="{ backgroundColor: tokens.colors.accent.primary + '1A', color: tokens.colors.accent.primary }">
          {{ title }}
        </div>
      </div>
      <!-- Close Button -->
      <button @click="close" class="w-7 h-7 flex items-center justify-center rounded-sm">
        <svg class="w-4 h-4" :style="{ color: tokens.colors.text.muted }">×</svg>
      </button>
    </div>
    
    <!-- Body -->
    <div class="p-6" :style="{ backgroundColor: tokens.colors.background.surface }">
      <slot />
    </div>
    
    <!-- Footer -->
    <div class="px-6 py-4 border-t flex justify-end gap-3" :style="{ borderColor: tokens.colors.border.default }">
      <slot name="footer" />
    </div>
  </div>
</div>
```

---

### 3.7 Table Header

```vue
<th 
  @click="handleSort(field)"
  class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b cursor-pointer hover:text-white transition-colors select-none"
  :style="{ color: tokens.colors.text.muted, borderColor: tokens.colors.border.default, backgroundColor: tokens.colors.background.surface }"
>
  <div class="flex items-center gap-1">
    {{ label }}
    <span v-if="sortField === field" :style="{ color: tokens.colors.accent.primary }">
      {{ sortDirection === 'asc' ? '▲' : '▼' }}
    </span>
  </div>
</th>
```

---

### 3.8 MiniMap (流程导航)

#### 收起状态 (Dot)

```vue
<div class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-900/40 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center">
  <!-- Progress Ring -->
  <svg class="w-10 h-10 absolute" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="15.5" fill="none" :stroke="tokens.colors.border.strong" stroke-width="2"/>
    <circle cx="18" cy="18" r="15.5" fill="none" stroke="url(#gradient)" stroke-width="2" :stroke-dasharray="`${progress} 100`"/>
  </svg>
  <!-- Center Icon -->
  <svg class="w-5 h-5 text-cyan-400"><!-- chart icon --></svg>
  <!-- Step Badge -->
  <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center">
    <span class="text-[10px] font-bold text-cyan-400">{{ currentStep }}</span>
  </div>
</div>
```

---

## 4. 状态类型

### 4.1 Strategy 状态

```typescript
interface Strategy {
  id: string
  symbol: string
  stockName: string
  source: 'AI' | 'Manual' | 'Import' | 'Official'
  direction: 'LONG' | 'SHORT' | null
  grade: 'A+' | 'A' | 'B' | 'C' | 'N/A'
  horizon: 'Short Term' | 'Medium Term' | 'Long Term' | null
  generatedAt: Date
  
  // Strategy Status
  strategyUnread: boolean
  strategyNeedsUpdate: boolean
  
  // Plan Status
  hasExecutionPlan: boolean
  hasStrategy: boolean  // false = Only Plan type
  planCount: number
  planUnreadCount: number
  planGeneratingCount: number
  planNeedsUpdate: boolean
  
  // Official Strategy specific
  officialUpdating?: boolean
  officialUpdated?: boolean
}
```

---

### 4.2 Task 状态

```typescript
interface Task {
  id: number
  type: 'strategy' | 'plan'
  title: string
  symbol: string
  stockName: string
  status: 'pending' | 'processing' | 'completed'
  
  // Processing state
  progress?: number       // 0-100
  timeLeft?: string       // "30s"
  statusText?: string     // "Backtesting..."
  
  // Pending state
  estTime?: string        // "2m"
  
  // Completed state
  completedAt?: string    // "10:23 AM"
  foundOpportunity?: boolean
  
  // UI state
  isNew?: boolean         // 新任务高亮
}
```

---

### 4.3 MiniMap Step 状态

```typescript
interface MiniMapStep {
  key: string
  title: string
  hint?: string
  status: 'pending' | 'active' | 'done' | 'skipped' | 'blocked'
  blocked?: boolean  // 当 status 为 active 时是否显示阻塞状态
}
```

---

## 5. 动画效果

### 5.1 CSS 动画类

```css
/* 淡入 */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

/* Modal 进入 */
.animate-modal-in {
  animation: modalIn 0.2s ease-out;
}

/* 渐变流动 */
.animate-gradient-x {
  animation: gradientX 2s linear infinite;
  background-size: 200% 100%;
}

/* 脉冲 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 选中卡片发光 */
.selected-task-glow {
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
}
```

### 5.2 Transition Group (Toast)

```vue
<TransitionGroup name="toast">
  <!-- toast items -->
</TransitionGroup>

<style>
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.3s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
```

---

## 6. 图标组件

### 6.1 SVG 图标组件定义

```javascript
import { h } from 'vue'

// 示例：Target 图标
const IconTarget = h('svg', { 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  strokeWidth: '2' 
}, [
  h('path', { d: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z' }),
  h('path', { d: 'M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z' })
])

// 常用图标列表
const icons = {
  IconTarget,      // 目标
  IconChart,       // 图表
  IconDocument,    // 文档
  IconMath,        // 量化
  IconLightning,   // 闪电
  IconBriefcase,   // 公文包
  IconTrending,    // 趋势
  IconDatabase,    // 数据库
  IconClock,       // 时钟
  IconCalendar,    // 日历
  IconBan,         // 禁止
  IconShield,      // 盾牌
  IconScale,       // 天平
  IconFire,        // 火焰
  IconSkull,       // 骷髅
  IconAuto,        // 星形(空心)
  IconAutoFilled,  // 星形(实心)
}
```

---

## 📝 使用建议

1. **颜色透明度约定**:
   - `1A` = 10% (背景)
   - `33` = 20% (背景强调)
   - `4D` = 30% (边框)
   - `66` = 40% (边框强调)
   - `80` = 50% (中等)
   - `99` = 60% (边框高亮)
   - `B3` = 70%
   - `E6` = 90%

2. **字体大小规范**:
   - 标签: `text-[10px]`
   - 表头: `text-[10px]`
   - 小文字: `text-xs` (12px)
   - 正文: `text-sm` (14px)
   - 标题: `text-lg` / `text-xl`

3. **间距规范**:
   - 标签内边距: `px-2 py-0.5` (紧凑) 或 `px-2.5 py-1` (标准)
   - 按钮内边距: `p-1.5` (图标) 或 `px-3 py-1.5` (文字)
   - 卡片内边距: `p-3` (紧凑) 或 `p-4` (标准)

4. **圆角规范**:
   - 标签/按钮: `rounded`
   - 输入框/卡片: `rounded-sm`
   - 圆形元素: `rounded-full`

---

> **文档维护**: 请在修改组件样式时同步更新此文档
