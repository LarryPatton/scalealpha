/**
 * ScaleAlpha Theme System
 * 深色模式 & 浅色模式主题定义
 */

// ============================================
// 深色主题 (Dark Theme) - 默认
// ============================================
export const darkTheme = {
  name: 'dark',
  
  colors: {
    // 背景色 - 4层系统
    background: {
      base: '#050505',      // Level 0: 页面最底层
      surface: '#0a0a0a',   // Level 1: 主要面板/卡片
      elevated: '#111111',  // Level 2: 悬浮元素、输入框
      overlay: '#1a1a1a',   // Level 3: 模态框、下拉菜单
    },
    
    // 边框色 - 4层系统
    border: {
      subtle: '#1a1a1a',    // 最浅边框
      default: '#222222',   // 默认边框
      strong: '#333333',    // 强调边框
      hover: '#444444',     // 悬停边框
    },
    
    // 文字颜色 - 5层系统
    text: {
      primary: '#ffffff',   // 主要文字、标题
      secondary: '#d1d5db', // 次要文字 (gray-300)
      tertiary: '#9ca3af',  // 第三层文字 (gray-400)
      muted: '#6b7280',     // 弱化文字 (gray-500)
      disabled: '#4b5563',  // 禁用文字 (gray-600)
    },
    
    // 强调色 - 保持不变
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
      A: '#10b981',
      B: '#3b82f6',
      C: '#f59e0b',
    },
  },
  
  // 阴影系统
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.3)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.4)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.5)',
    glow: {
      primary: '0 0 20px rgba(6, 182, 212, 0.3)',
      success: '0 0 20px rgba(16, 185, 129, 0.3)',
      warning: '0 0 20px rgba(245, 158, 11, 0.3)',
      danger: '0 0 20px rgba(244, 63, 94, 0.3)',
    },
  },
}

// ============================================
// 浅色主题 (Light Theme)
// ============================================
export const lightTheme = {
  name: 'light',
  
  colors: {
    // 背景色 - 4层系统 (浅色调)
    background: {
      base: '#f8fafc',      // Level 0: 页面最底层 (slate-50)
      surface: '#ffffff',   // Level 1: 主要面板/卡片
      elevated: '#f1f5f9',  // Level 2: 悬浮元素、输入框 (slate-100)
      overlay: '#e2e8f0',   // Level 3: 模态框、下拉菜单 (slate-200)
    },
    
    // 边框色 - 4层系统 (浅色调)
    border: {
      subtle: '#f1f5f9',    // 最浅边框 (slate-100)
      default: '#e2e8f0',   // 默认边框 (slate-200)
      strong: '#cbd5e1',    // 强调边框 (slate-300)
      hover: '#94a3b8',     // 悬停边框 (slate-400)
    },
    
    // 文字颜色 - 5层系统 (深色调)
    text: {
      primary: '#0f172a',   // 主要文字、标题 (slate-900)
      secondary: '#334155', // 次要文字 (slate-700)
      tertiary: '#475569',  // 第三层文字 (slate-600)
      muted: '#64748b',     // 弱化文字 (slate-500)
      disabled: '#94a3b8',  // 禁用文字 (slate-400)
    },
    
    // 强调色 - 稍微调暗以适应浅色背景
    accent: {
      primary: '#0891b2', // Cyan-600 - 主交互色（稍暗）
      primaryLight: '#06b6d4',
      primaryDark: '#0e7490',
      primaryBg: 'rgba(6, 182, 212, 0.1)',
      primaryBorder: 'rgba(6, 182, 212, 0.4)',
      
      success: '#059669', // Emerald-600 - 成功/LONG
      successLight: '#10b981',
      successDark: '#047857',
      successBg: 'rgba(16, 185, 129, 0.1)',
      successBorder: 'rgba(16, 185, 129, 0.4)',
      
      warning: '#d97706', // Amber-600 - 警告/待更新
      warningLight: '#f59e0b',
      warningDark: '#b45309',
      warningBg: 'rgba(245, 158, 11, 0.15)',
      warningBorder: 'rgba(245, 158, 11, 0.4)',
      
      danger: '#e11d48', // Rose-600 - 危险/SHORT
      dangerLight: '#f43f5e',
      dangerDark: '#be123c',
      dangerBg: 'rgba(244, 63, 94, 0.1)',
      dangerBorder: 'rgba(244, 63, 94, 0.4)',
      
      info: '#2563eb', // Blue-600 - 信息/B级
      infoLight: '#3b82f6',
      infoDark: '#1d4ed8',
      infoBg: 'rgba(59, 130, 246, 0.1)',
      infoBorder: 'rgba(59, 130, 246, 0.4)',
    },
    
    // 语义化颜色别名
    semantic: {
      success: '#059669',
      error: '#e11d48',
      warning: '#d97706',
      info: '#2563eb',
    },
    
    // 评级专用色
    grade: {
      A: '#059669',
      B: '#2563eb',
      C: '#d97706',
    },
  },
  
  // 阴影系统 (浅色模式下更明显)
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.08)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
    strong: '0 8px 30px rgba(0, 0, 0, 0.15)',
    glow: {
      primary: '0 0 20px rgba(6, 182, 212, 0.2)',
      success: '0 0 20px rgba(16, 185, 129, 0.2)',
      warning: '0 0 20px rgba(245, 158, 11, 0.2)',
      danger: '0 0 20px rgba(244, 63, 94, 0.2)',
    },
  },
}

// 主题映射
export const themes = {
  dark: darkTheme,
  light: lightTheme,
}

export default themes
