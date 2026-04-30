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

## 更新内容数据

当 `mydata/我的数据/AI记录` 中新增或修改文章后，在项目根目录运行：

```powershell
python tools/update_data.py
```

脚本会扫描 `../../我的数据/AI记录/内容` 和 `../../我的数据/AI记录/目录`，重新生成 `assets/data.js`。脚本只刷新站点数据文件，不删除、不重命名、不移动源笔记。

## 一键更新并发布

先做一次演练，不提交、不推送：

```powershell
powershell -ExecutionPolicy Bypass -File tools/update_publish.ps1 -DryRun
```

确认无误后执行发布：

```powershell
powershell -ExecutionPolicy Bypass -File tools/update_publish.ps1
```

发布脚本会运行数据更新、校验 `assets/data.js`、只提交白名单文件，然后 `git push origin main`。如果 GitHub Pages 配置为从 `main` 分支根目录部署，推送后会自动重新部署。

脚本只允许提交 `assets/data.js`、`README.md`、`tools/update_data.py`、`tools/update_publish.ps1` 和 `docs/archive/` 下的文件。若发现其他未提交改动，会停止并列出路径。

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
