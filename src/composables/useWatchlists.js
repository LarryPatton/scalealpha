import { ref, computed } from 'vue'

// Watchlist data structure:
// {
//   id: 'unique-id',
//   name: 'Group Name',
//   assets: ['NVDA', 'TSLA', 'SPY'], // Array of asset codes
//   createdAt: timestamp,
//   isDefault: false
// }

const watchlists = ref([])
const selectedGroupId = ref('all')
const STORAGE_KEY = 'scaleAlpha_watchlists'
const SELECTED_KEY = 'scaleAlpha_selectedGroup'
const VERSION_KEY = 'scaleAlpha_watchlists_version'
const CURRENT_VERSION = 2 // 增加版本号以强制更新演示数据

// Load from localStorage on init
const loadFromStorage = () => {
  try {
    // Check version first
    const storedVersion = localStorage.getItem(VERSION_KEY)
    const version = storedVersion ? parseInt(storedVersion) : 0
    
    // If version mismatch, clear old data
    if (version !== CURRENT_VERSION) {
      console.log(`Version mismatch (${version} -> ${CURRENT_VERSION}), clearing old watchlist data`)
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(SELECTED_KEY)
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString())
      return // Don't load anything, will use default demo data
    }
    
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      watchlists.value = JSON.parse(stored)
    }
    const storedSelected = localStorage.getItem(SELECTED_KEY)
    if (storedSelected) {
      selectedGroupId.value = storedSelected
    }
  } catch (error) {
    console.error('Failed to load watchlists from storage:', error)
  }
}

// Save to localStorage
const saveToStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlists.value))
    localStorage.setItem(SELECTED_KEY, selectedGroupId.value)
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION.toString())
  } catch (error) {
    console.error('Failed to save watchlists to storage:', error)
  }
}

export function useWatchlists() {
  // Initialize data if not already loaded
  if (watchlists.value.length === 0) {
    loadFromStorage()
    
    // Add some demo data if storage is empty
    if (watchlists.value.length === 0) {
      watchlists.value = [
        {
          id: 'demo-tech',
          name: '科技成长组',
          assets: [
            // 大盘归因 (Market)
            'QQQ',      // m2: 纳指100
            // 个股归因 (Stocks) - 科技成长股
            'NVDA',     // s1: 英伟达 - AI芯片龙头
            'TSLA',     // s2: 特斯拉 - 电动车
            'AMD',      // s8: AMD - 芯片竞争者
            'MSFT',     // s3: 微软 - 云计算+AI
            'META',     // s6: Meta - 社交媒体
            // ETF分析 (ETF) - 科技主题ETF
            'VGT',      // e3: Vanguard科技ETF
            'SOXX',     // e7: 半导体ETF
            'KWEB',     // e6: 中概互联网ETF
            // 社区机会 (Community) - 科技相关讨论
            'c2',       // QuantMaster的量化策略
            'c3',       // AI芯片赛道深度分析
            'c6'        // 2024年美股十大预测
          ],
          createdAt: Date.now() - 86400000,
          isDefault: false
        },
        {
          id: 'demo-etf',
          name: 'ETF 配置组',
          assets: [
            // 大盘归因 (Market)
            'SPY',      // m1: 标普500
            'DIA',      // m3: 道指
            // ETF分析 (ETF) - 多元化配置
            'VGT',      // e3: 科技板块
            'TLT',      // e4: 长期国债
            'GLD',      // e5: 黄金
            'XLE',      // e2: 能源板块
            'KWEB',     // e6: 中概互联网
            'XLF',      // e8: 金融板块
            // 个股归因 (Stocks) - 部分核心持仓参考
            'AAPL',     // s4: 苹果
            'MSFT',     // s3: 微软
            // 社区机会 (Community) - ETF策略讨论
            'c4',       // 巴菲特最新持仓变动解读
            'c6',       // 2024年美股十大预测
            'c8'        // 高股息策略2024年展望
          ],
          createdAt: Date.now() - 172800000,
          isDefault: false
        }
      ]
      saveToStorage()
    }
  }

  // Computed: Get all asset codes that are in any watchlist
  const allFollowingAssets = computed(() => {
    const allAssets = new Set()
    watchlists.value.forEach(group => {
      group.assets.forEach(asset => allAssets.add(asset))
    })
    return Array.from(allAssets)
  })

  // Computed: Get assets for selected group
  const selectedGroupAssets = computed(() => {
    if (selectedGroupId.value === 'all') {
      return allFollowingAssets.value
    }
    const group = watchlists.value.find(g => g.id === selectedGroupId.value)
    return group ? group.assets : []
  })

  // Computed: Total count of following assets
  const totalFollowingCount = computed(() => {
    return allFollowingAssets.value.length
  })

  // Create a new watchlist group
  const createGroup = (name) => {
    const newGroup = {
      id: `wl-${Date.now()}`,
      name,
      assets: [],
      createdAt: Date.now(),
      isDefault: false
    }
    watchlists.value.push(newGroup)
    saveToStorage()
    return newGroup
  }

  // Rename a watchlist group
  const renameGroup = ({ id, name }) => {
    const group = watchlists.value.find(g => g.id === id)
    if (group) {
      group.name = name
      saveToStorage()
    }
  }

  // Delete a watchlist group
  const deleteGroup = (id) => {
    const index = watchlists.value.findIndex(g => g.id === id)
    if (index !== -1) {
      watchlists.value.splice(index, 1)
      // If deleted group was selected, switch to 'all'
      if (selectedGroupId.value === id) {
        selectedGroupId.value = 'all'
      }
      saveToStorage()
    }
  }

  // Set a group as default (for future enhancement)
  const setDefaultGroup = (id) => {
    watchlists.value.forEach(group => {
      group.isDefault = group.id === id
    })
    saveToStorage()
  }

  // Select a group
  const selectGroup = (id) => {
    selectedGroupId.value = id
    saveToStorage()
  }

  // Add an asset to a group
  const addAssetToGroup = (groupId, assetCode) => {
    const group = watchlists.value.find(g => g.id === groupId)
    if (group && !group.assets.includes(assetCode)) {
      group.assets.push(assetCode)
      saveToStorage()
    }
  }

  // Remove an asset from a group
  const removeAssetFromGroup = (groupId, assetCode) => {
    const group = watchlists.value.find(g => g.id === groupId)
    if (group) {
      const index = group.assets.indexOf(assetCode)
      if (index !== -1) {
        group.assets.splice(index, 1)
        saveToStorage()
      }
    }
  }

  // Check if an asset is in a specific group
  const isAssetInGroup = (groupId, assetCode) => {
    if (groupId === 'all') {
      return allFollowingAssets.value.includes(assetCode)
    }
    const group = watchlists.value.find(g => g.id === groupId)
    return group ? group.assets.includes(assetCode) : false
  }

  // Get all groups containing a specific asset
  const getGroupsForAsset = (assetCode) => {
    return watchlists.value.filter(group => group.assets.includes(assetCode))
  }

  // Toggle asset in a group (add if not present, remove if present)
  const toggleAssetInGroup = (groupId, assetCode) => {
    if (isAssetInGroup(groupId, assetCode)) {
      removeAssetFromGroup(groupId, assetCode)
      return false // removed
    } else {
      addAssetToGroup(groupId, assetCode)
      return true // added
    }
  }

  // Check if asset is followed in any group
  const isAssetFollowing = (assetCode) => {
    return allFollowingAssets.value.includes(assetCode)
  }

  return {
    // State
    watchlists,
    selectedGroupId,
    
    // Computed
    allFollowingAssets,
    selectedGroupAssets,
    totalFollowingCount,
    
    // Methods
    createGroup,
    renameGroup,
    deleteGroup,
    setDefaultGroup,
    selectGroup,
    addAssetToGroup,
    removeAssetFromGroup,
    isAssetInGroup,
    getGroupsForAsset,
    toggleAssetInGroup,
    isAssetFollowing
  }
}
