# ScaleAlpha AI

一个基于 Vue 3 + Vite 构建的量化交易平台。

## 🚀 在线访问

访问地址：[https://larrypatton.github.io/scalealpha/](https://larrypatton.github.io/scalealpha/)

## 📦 本地开发

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

或直接运行：
```bash
start-dev.bat
```

开发服务器将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产构建

```bash
npm run preview
```

## 🌐 部署到 GitHub Pages

本项目已配置自动化部署流程，只需简单几步即可完成部署。

### 首次部署设置

1. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库页面
   - 点击 `Settings` > `Pages`
   - 在 `Source` 下拉菜单中选择 `GitHub Actions`

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   git push origin main
   ```

3. **等待部署完成**
   - 前往仓库的 `Actions` 标签页
   - 查看部署进度
   - 部署成功后，你的网站将在 `https://larrypatton.github.io/scalealpha/` 上线

### 自动部署

配置完成后，每次推送到 `main` 分支都会自动触发构建和部署流程。

### 手动触发部署

1. 进入仓库的 `Actions` 标签页
2. 选择 `Deploy to GitHub Pages` 工作流
3. 点击 `Run workflow` 按钮
4. 选择分支并确认运行

## 🛠️ 技术栈

- **前端框架**: Vue 3
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **HTTP 客户端**: Axios
- **部署平台**: GitHub Pages

## 📂 项目结构

```
ScaleAlpha/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── src/
│   ├── components/             # 可复用组件
│   │   ├── Navbar.vue
│   │   └── Sidebar.vue
│   ├── pages/                  # 页面组件
│   │   ├── HomePage.vue
│   │   ├── TradingPage.vue
│   │   ├── BacktestPage.vue
│   │   └── ...
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 应用入口
│   └── style.css               # 全局样式
├── index.html                  # HTML 模板
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── package.json                # 项目依赖
└── README.md                   # 项目说明
```

## 🔧 配置说明

### Vite 配置

项目配置了 `base: '/scalealpha/'` 以确保在 GitHub Pages 上正确加载资源。

如果你 fork 了这个项目，需要修改 `vite.config.js` 中的 `base` 为你的仓库名：

```javascript
export default defineConfig({
  base: '/your-repo-name/',  // 修改为你的仓库名
  // ...
})
```

### GitHub Actions 配置

部署工作流配置在 `.github/workflows/deploy.yml`，包含以下步骤：

1. 检出代码
2. 设置 Node.js 环境
3. 安装依赖
4. 构建项目
5. 部署到 GitHub Pages

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发者**: Larry Patton  
**仓库地址**: [https://github.com/LarryPatton/scalealpha](https://github.com/LarryPatton/scalealpha)
