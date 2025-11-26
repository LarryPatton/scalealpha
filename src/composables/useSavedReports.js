import { ref, computed } from 'vue'

// 保存的报告状态
const savedReports = ref([])
const hasSavedReports = ref(false)

// 检查localStorage中的保存报告
const checkSavedReports = () => {
  try {
    const saved = localStorage.getItem('opportunity_report_categories')
    if (saved) {
      const categories = JSON.parse(saved)
      savedReports.value = categories
      
      // 检查是否有任何分类包含报告
      const totalReports = categories.reduce((total, category) => {
        return total + (category.reports ? category.reports.length : 0)
      }, 0)
      
      hasSavedReports.value = totalReports > 0
      return totalReports > 0
    }
    
    hasSavedReports.value = false
    savedReports.value = []
    return false
  } catch (error) {
    console.error('检查保存报告失败:', error)
    hasSavedReports.value = false
    savedReports.value = []
    return false
  }
}

// 初始化时检查状态
checkSavedReports()

// 监听localStorage变化（跨标签页同步）
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'opportunity_report_categories') {
      checkSavedReports()
    }
  })
}

// 获取报告总数
const getTotalReportCount = () => {
  return savedReports.value.reduce((total, category) => {
    return total + (category.reports ? category.reports.length : 0)
  }, 0)
}

// 清除保存的报告
const clearSavedReports = () => {
  try {
    // 清除localStorage中的报告数据
    localStorage.removeItem('opportunity_report_categories')
    
    // 更新状态
    savedReports.value = []
    hasSavedReports.value = false
    
    return true
  } catch (error) {
    console.error('清除保存报告失败:', error)
    return false
  }
}

// 保存报告到指定分类
const saveReportToCategory = (report, categoryId = 'default-category') => {
  try {
    const categories = savedReports.value.length > 0 ? [...savedReports.value] : []
    
    // 查找或创建分类
    let category = categories.find(c => c.id === categoryId)
    
    if (!category) {
      // 如果分类不存在，创建默认分类
      category = {
        id: categoryId,
        name: categoryId === 'default-category' ? '我的报告' : categoryId,
        description: '保存的投资机会报告',
        color: '#3b82f6',
        createdAt: new Date().toISOString(),
        reports: []
      }
      categories.push(category)
    }
    
    // 检查报告是否已存在
    const existingReportIndex = category.reports.findIndex(r => r.id === report.id)
    
    if (existingReportIndex === -1) {
      // 添加报告
      category.reports.push({
        ...report,
        savedAt: new Date().toISOString()
      })
      
      // 保存到localStorage
      localStorage.setItem('opportunity_report_categories', JSON.stringify(categories))
      
      // 更新状态
      savedReports.value = categories
      checkSavedReports()
      
      return { success: true, message: '报告已保存' }
    } else {
      return { success: false, message: '报告已存在于该分类中' }
    }
  } catch (error) {
    console.error('保存报告失败:', error)
    return { success: false, message: '保存失败' }
  }
}

// 从分类中删除报告
const removeReportFromCategory = (reportId, categoryId) => {
  try {
    const categories = [...savedReports.value]
    const category = categories.find(c => c.id === categoryId)
    
    if (category) {
      const reportIndex = category.reports.findIndex(r => r.id === reportId)
      if (reportIndex !== -1) {
        category.reports.splice(reportIndex, 1)
        
        // 如果分类变空，删除分类
        if (category.reports.length === 0) {
          const categoryIndex = categories.findIndex(c => c.id === categoryId)
          categories.splice(categoryIndex, 1)
        }
        
        // 保存到localStorage
        localStorage.setItem('opportunity_report_categories', JSON.stringify(categories))
        
        // 更新状态
        savedReports.value = categories
        checkSavedReports()
        
        return { success: true, message: '报告已删除' }
      }
    }
    
    return { success: false, message: '报告不存在' }
  } catch (error) {
    console.error('删除报告失败:', error)
    return { success: false, message: '删除失败' }
  }
}

// 检查报告是否已保存
const isReportSaved = (reportId) => {
  for (const category of savedReports.value) {
    if (category.reports && category.reports.some(r => r.id === reportId)) {
      return true
    }
  }
  return false
}

// 从所有分类中删除报告
const removeReportFromAll = (reportId) => {
  try {
    const categories = [...savedReports.value]
    let removed = false
    
    for (const category of categories) {
      const reportIndex = category.reports.findIndex(r => r.id === reportId)
      if (reportIndex !== -1) {
        category.reports.splice(reportIndex, 1)
        removed = true
      }
    }
    
    // 删除空分类
    const nonEmptyCategories = categories.filter(c => c.reports.length > 0)
    
    // 保存到localStorage
    localStorage.setItem('opportunity_report_categories', JSON.stringify(nonEmptyCategories))
    
    // 更新状态
    savedReports.value = nonEmptyCategories
    checkSavedReports()
    
    return { success: removed, message: removed ? '报告已删除' : '报告不存在' }
  } catch (error) {
    console.error('删除报告失败:', error)
    return { success: false, message: '删除失败' }
  }
}

// 获取报告所在的分类
const getReportCategories = (reportId) => {
  const categories = []
  for (const category of savedReports.value) {
    if (category.reports && category.reports.some(r => r.id === reportId)) {
      categories.push(category)
    }
  }
  return categories
}

export function useSavedReports() {
  return {
    hasSavedReports: computed(() => hasSavedReports.value),
    savedReports: computed(() => savedReports.value),
    totalReportCount: computed(() => getTotalReportCount()),
    checkSavedReports,
    refreshStatus: checkSavedReports,
    clearSavedReports,
    saveReportToCategory,
    removeReportFromCategory,
    removeReportFromAll,
    isReportSaved,
    getReportCategories
  }
}
