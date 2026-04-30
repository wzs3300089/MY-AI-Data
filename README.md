# AI史诗纪实

AI史诗纪实是一个从本地 AI 记录整理生成的静态知识库，收录 IDE、MCP、Skills、Agent Harness 等主题内容。项目可以直接作为静态站点部署，不依赖后端服务或构建步骤。

## 内容结构

```text
.
+-- index.html
+-- assets/
|   +-- app.js
|   +-- data.js
|   +-- styles.css
+-- README.md
```

## 本地预览

在项目根目录启动任意静态文件服务器：

```powershell
python -m http.server 4173
```

然后打开：

```text
http://localhost:4173
```

## 部署

可以把本仓库直接部署到 GitHub Pages：

1. 进入 GitHub 仓库的 `Settings`。
2. 打开 `Pages`。
3. 在 `Build and deployment` 中选择 `Deploy from a branch`。
4. 选择 `main` 分支和根目录 `/`。

站点发布后会从 `index.html` 入口加载 `assets` 下的静态资源。
