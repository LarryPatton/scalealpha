/**
 * ScaleAlpha Design Tokens
 * 统一的设计系统变量定义
 * 
 * 设计原则：
 * - 克制 (Restraint): 减少不必要的视觉元素
 * - 一致 (Consistency): 相同功能采用相同视觉语言
 * - 层次 (Hierarchy): 明确的视觉层级引导注意力
 * - 可预期 (Predictable): 交互状态可预期
 */

// ============================================
// 颜色系统 (Color System)
// ============================================

export const colors = {
  // 背景色 - 4层系统
  background: {
    base: '#050505',      // Level 0: 页面最底层
    surface: '#0a0a0a',   // Level 1: 主要面板/卡片
    elevated: '#111111',  // Level 2: 悬浮元素、输入框
    overlay: '#1a1a1a',   // Level 3: 模态框、下拉菜单
  },
  
  // 边框色 - 3层系统
  border: {
    subtle: '#1a1a1a',    // 最浅边框
    default: '#222222',   // 默认边框
    strong: '#333333',    // 强调边框
  },
  
  // 文字颜色 - 5层系统
  text: {
    primary: '#ffffff',   // 主要文字、标题
    secondary: '#d1d5db', // 次要文字 (gray-300)
    tertiary: '#9ca3af',  // 第三层文字 (gray-400)
    muted: '#6b7280',     // 弱化文字 (gray-500)
    disabled: '#4b5563',  // 禁用文字 (gray-600)
  },
  
  // 强调色 - 5种核心色
  // 简化后的直接颜色值，便于在模板中使用
  accent: {
    primary: '#06b6d4', // Cyan - 主交互色
    primaryLight: '#22d3ee',
    primaryDark: '#0891b2',
    primaryBg: 'rgba(6, 182, 212, 0.1)',
    primaryBorder: 'rgba(6, 182, 212, 0.3)',
    
    success: '#10b981', // Emerald - 成功/LONG
    successLight: '#34d399',
    successDark: '#059669',
    successBg: 'rgba(16, 185, 129, 0.1)',
    successBorder: 'rgba(16, 185, 129, 0.3)',
    
    warning: '#f59e0b', // Amber - 警告/待更新
    warningLight: '#fbbf24',
    warningDark: '#d97706',
    warningBg: 'rgba(245, 158, 11, 0.1)',
    warningBorder: 'rgba(245, 158, 11, 0.3)',
    
    danger: '#f43f5e', // Rose - 危险/SHORT
    dangerLight: '#fb7185',
    dangerDark: '#e11d48',
    dangerBg: 'rgba(244, 63, 94, 0.1)',
    dangerBorder: 'rgba(244, 63, 94, 0.3)',
    
    info: '#3b82f6', // Blue - 信息/B级
    infoLight: '#60a5fa',
    infoDark: '#2563eb',
    infoBg: 'rgba(59, 130, 246, 0.1)',
    infoBorder: 'rgba(59, 130, 246, 0.3)',
  },
  
  // 语义化颜色别名
  semantic: {
    success: '#10b981',
    error: '#f43f5e',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  
  // 评级专用色
  grade: {
    A: '#10b981', // Emerald (复用 success)
    B: '#3b82f6', // Blue (复用 info)
    C: '#f59e0b', // Amber (复用 warning)
  },
}

// ============================================
// 排版系统 (Typography)
// ============================================

export const typography = {
  // 字体家族
  fontFamily: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
  },
  
  // 字体大小 - 5级系统
  fontSize: {
    display: ['20px', { lineHeight: '28px', fontWeight: '700' }],  // 展示标题
    title: ['16px', { lineHeight: '24px', fontWeight: '700' }],    // 区块标题
    body: ['14px', { lineHeight: '20px', fontWeight: '400' }],     // 正文
    caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],  // 说明文字
    micro: ['10px', { lineHeight: '14px', fontWeight: '700' }],    // 徽章/标签
  },
  
  // 字重
  fontWeight: {
    regular: '400',
    bold: '700',
  },
  
  // 字间距
  letterSpacing: {
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
}

// ============================================
// 间距系统 (Spacing)
// ============================================

export const spacing = {
  xs: '4px',   // 紧凑元素内部
  sm: '8px',   // 相关元素间隙
  md: '12px',  // 默认内边距
  lg: '16px',  // 区块分隔
  xl: '24px',  // 大区块分隔
  '2xl': '32px', // 页面级分隔
}

// ============================================
// 圆角系统 (Border Radius)
// ============================================

export const borderRadius = {
  sharp: '2px',    // 按钮、输入框 - 硬朗专业感
  rounded: '8px',  // 卡片、面板
  full: '9999px',  // 头像、圆点、徽章
}

// ============================================
// 阴影系统 (Shadows)
// ============================================

export const shadows = {
  // 静态阴影
  subtle: '0 1px 3px rgba(0, 0, 0, 0.3)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.4)',
  strong: '0 8px 30px rgba(0, 0, 0, 0.5)',
  
  // 发光效果 (仅用于特定场景)
  glow: {
    primary: '0 0 20px rgba(6, 182, 212, 0.3)',
    success: '0 0 20px rgba(16, 185, 129, 0.3)',
    warning: '0 0 20px rgba(245, 158, 11, 0.3)',
    danger: '0 0 20px rgba(244, 63, 94, 0.3)',
  },
}

// ============================================
// 动画系统 (Animations)
// ============================================

export const animations = {
  // 过渡时长
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
  
  // 缓动函数
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  
  // 关键帧动画
  keyframes: {
    fadeIn: {
      from: { opacity: '0', transform: 'translateY(8px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },
}

// ============================================
// 组件预设 (Component Presets)
// ============================================

export const components = {
  // 按钮预设
  button: {
    primary: {
      bg: colors.accent.primary,
      text: '#000000',
      hoverBg: colors.accent.primaryLight,
      shadow: shadows.glow.primary,
    },
    secondary: {
      bg: 'transparent',
      text: colors.accent.primary,
      border: colors.accent.primaryBorder,
      hoverBg: colors.accent.primaryBg,
    },
    ghost: {
      bg: 'transparent',
      text: colors.text.secondary,
      hoverBg: colors.background.elevated,
      hoverText: colors.text.primary,
    },
    danger: {
      bg: colors.accent.dangerBg,
      text: colors.accent.danger,
      border: colors.accent.dangerBorder,
      hoverBg: 'rgba(244, 63, 94, 0.2)',
    },
  },
  
  // 输入框预设
  input: {
    bg: colors.background.elevated,
    border: colors.border.strong,
    text: colors.text.primary,
    placeholder: colors.text.muted,
    focusBorder: colors.accent.primaryBorder,
    focusRing: 'rgba(6, 182, 212, 0.2)',
  },
  
  // 卡片预设
  card: {
    bg: colors.background.surface,
    border: colors.border.default,
    radius: borderRadius.rounded,
    shadow: shadows.medium,
  },
  
  // 标签预设
  badge: {
    primary: {
      bg: colors.accent.primaryBg,
      text: colors.accent.primary,
      border: colors.accent.primaryBorder,
    },
    success: {
      bg: colors.accent.successBg,
      text: colors.accent.success,
      border: colors.accent.successBorder,
    },
    warning: {
      bg: colors.accent.warningBg,
      text: colors.accent.warning,
      border: colors.accent.warningBorder,
    },
    danger: {
      bg: colors.accent.dangerBg,
      text: colors.accent.danger,
      border: colors.accent.dangerBorder,
    },
  },
}

// ============================================
// 交互状态 (Interaction States)
// ============================================

export const states = {
  hover: {
    bgShift: colors.background.elevated,
    textShift: colors.text.primary,
  },
  selected: {
    borderColor: colors.accent.primary,
    bg: colors.accent.primaryBg,
  },
  disabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
  },
  focus: {
    borderColor: colors.accent.primary,
    ring: `0 0 0 2px ${colors.accent.primaryBg}`,
  },
}

// 导出所有 tokens
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  components,
  states,
}
