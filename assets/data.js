window.AI_EPIC_DATA = {
  "generatedAt": "2026-04-30T10:33:37.066Z",
  "source": "mydata/我的数据/AI记录",
  "categories": [
    "全部文章",
    "AI研究所",
    "其他AI 工具",
    "常用MCP",
    "常用Plugin",
    "常用SKILLS",
    "未分类"
  ],
  "featuredIds": [
    "note-1",
    "note-2",
    "note-3",
    "note-4"
  ],
  "articles": [
    {
      "id": "note-1",
      "title": "Agent Harness：从能聊天到能干活的智能体运行框架",
      "fileTitle": "Agent Harness：从能聊天到能干活的智能体运行框架",
      "categories": [
        "AI研究所"
      ],
      "tags": [
        "AI/Agent",
        "AI/Harness",
        "内容/视频总结"
      ],
      "summary": "[!note] 来源说明 本笔记基于视频《8分钟快速掌握Agent Harness》的可解析内容、公开视频元数据，以及相关公开文章整理。原 B 站视频当前没有公开字幕，因此这里是知识化总结，不是逐字稿。 一句话结论 Agent Harness 是包在大模型外面的运行时基础设施。大模型负责推理，Context Window 提供短期记忆，Harness 负责把...",
      "wordCount": 3120,
      "sourceFile": "mydata/我的数据/AI记录/内容/Agent Harness：从能聊天到能干活的智能体运行框架.md",
      "markdown": "# Agent Harness：从能聊天到能干活的智能体运行框架\n\n> [!note] 来源说明\n> 本笔记基于视频《8分钟快速掌握Agent Harness》的可解析内容、公开视频元数据，以及相关公开文章整理。原 B 站视频当前没有公开字幕，因此这里是知识化总结，不是逐字稿。\n\n## 一句话结论\n\nAgent Harness 是包在大模型外面的运行时基础设施。大模型负责推理，Context Window 提供短期记忆，Harness 负责把模型接到工具、文件、权限、状态、错误恢复、上下文管理、审计和人工审批上，让 Agent 从“能聊天”变成“能长期、可控、可恢复地做事”。\n\n可以记成：\n\n```text\nAgent = Model + Harness\n\nModel: 负责理解、推理、生成。\nContext Window: 负责当下这一轮能看到的短期信息。\nHarness: 负责运行、调度、工具、记忆、安全、恢复、验证和治理。\n```\n\n## 视频里的核心类比\n\n视频用了两个非常好记的类比。\n\n### 1. 律师与司法制度\n\n大模型像一个知识丰富的律师，知道很多法律，也能写出漂亮的论证。但律师不能脱离法院、程序、证据规则、权限边界和监督机制独立运转。\n\nAgent Harness 就像司法制度：它不替律师思考，但它规定律师能在什么场景行动、需要哪些证据、遇到争议怎么处理、哪些行为必须经过审查。\n\n对应到 Agent：\n\n- 模型可以提出下一步行动。\n- Harness 决定这个行动是否允许执行。\n- 工具调用由 Harness 分发。\n- 执行结果由 Harness 结构化返回给模型。\n- 高风险行为由 Harness 暂停并请求人类确认。\n\n### 2. OS / RAM / CPU\n\n视频还把 Agent 系统类比成计算机：\n\n```text\nAI Model        = CPU，提供推理和计算能力\nContext Window  = RAM，提供有限的短期工作记忆\nAgent Harness   = OS，负责资源调度、权限、安全、恢复和工具管理\nAgent 应用       = 具体要完成的业务任务\n```\n\n这个类比的关键是：CPU 再强，也不能自己变成一台可用电脑。没有操作系统，程序无法稳定调度资源、无法管理文件、无法控制权限，也无法在故障后恢复。\n\n## 为什么 Agent Harness 重要\n\n早期 Agent 很容易停留在 Demo 阶段：给大模型一个系统提示词，再接几个工具，就可以完成一些演示任务。但一旦进入真实任务，问题会集中暴露：\n\n- **任务中断后从头来**：网络错误、工具失败、进程退出后，没有 checkpoint 或状态恢复。\n- **上下文腐烂**：对话轮次越来越长，早期关键要求被淹没，模型开始偏离目标。\n- **工具调用不受控**：模型可以调用文件、Shell、数据库或外部 API，但没有权限、审批、沙箱和审计。\n- **错误处理粗糙**：所有错误都简单重试会造成循环；所有错误都丢给用户会造成告警疲劳。\n- **Token 浪费严重**：一次性把所有工具说明、文档和历史输出塞进上下文，既贵又降低可靠性。\n- **无法证明过程可靠**：结果看起来对，但不知道调用了什么工具、有没有越权、是否通过测试。\n\n这些不是“模型不够聪明”的问题，而是系统工程问题。Harness 要解决的就是这些模型外围的问题。\n\n## Agent、Framework、Harness 的区别\n\n| 概念              | 作用                    | 类比            |\n| --------------- | --------------------- | ------------- |\n| LLM / Model     | 提供推理、语言、代码生成能力        | CPU / 大脑      |\n| Context Window  | 当前请求能携带的短期信息          | RAM / 工作记忆    |\n| Agent Framework | 提供搭建 Agent 的组件和抽象     | 乐高零件 / 开发框架   |\n| Agent           | 面向目标行动的行为实体           | 虚拟员工 / 应用     |\n| Agent Harness   | 让 Agent 在真实环境可靠运行的运行时 | 操作系统 / 工作管理系统 |\n\nFramework 更偏“怎么搭出来”，Harness 更偏“怎么跑起来，并且跑得稳”。LangChain、LangGraph、Agents SDK、Claude Agent SDK、smolagents 等可以提供框架或运行时组件，但真正的 Harness 是围绕具体用例组装出的可执行系统。\n\n## 核心执行循环\n\n多数 Agent 的核心循环其实很简单：\n\n```text\nwhile task_not_done:\n    model 读取当前上下文\n    model 决定是否调用工具\n    harness 校验并执行工具\n    harness 把结果结构化返回给 model\n    model 基于结果继续推理\nreturn final_answer\n```\n\n这个循环本身不难。难的是循环之外的基础设施：\n\n- 工具失败怎么办？\n- 上下文满了怎么办？\n- 任务暂停后怎么恢复？\n- 用户要审批时如何等待？\n- 高风险命令怎么拦截？\n- 多个子 Agent 怎么交接？\n- 成本、日志、权限、审计怎么做？\n\nHarness 的价值就在这里。\n\n## 生产级 Harness 的核心能力\n\n### 1. 状态持久化\n\n模型的上下文是易失的。任务中间产生的代码、文件、决策、错误、进度，如果只放在对话里，就很容易丢。\n\n好的 Harness 会把状态外部化：\n\n- 任务计划和进度写入文件或数据库。\n- 每个关键步骤创建 checkpoint。\n- 代码任务可以用 Git commit 作为恢复点。\n- 长任务可以在新会话里读取交接记录继续执行。\n\n判断标准：Agent 在第 47 步失败时，应该能从第 47 步附近恢复，而不是从第 1 步重跑。\n\n### 2. 上下文管理\n\n上下文窗口不是越大越安全。长上下文里会出现噪声堆积、关键指令被埋、旧决策与新决策冲突等问题。\n\n常见策略：\n\n- **Compaction**：定期把历史压缩成结论、决策、待办和风险。\n- **Observation Masking**：保留模型做过什么决定，但隐藏旧工具输出的原文。\n- **Just-in-time Retrieval**：只保留文件路径、文档 ID、摘要，需要细节时再读取。\n- **Structured Note-taking**：让 Agent 维护进度日志、决策记录、任务清单。\n- **Sub-agent Delegation**：把长探索交给子 Agent，只把精简结论带回主上下文。\n\n上下文管理的目标不是“记住所有东西”，而是“始终让模型看到当前最重要的东西”。\n\n### 3. 工具管理\n\n工具是 Agent 能干活的手脚，但也是风险来源。Harness 要负责：\n\n- 工具注册和 schema 校验。\n- 参数合法性检查。\n- 沙箱执行。\n- 超时控制。\n- 输出截断、摘要和结构化。\n- 错误格式化，让模型能自我修正。\n\n一个非常重要的经验：工具输出往往比系统提示词更占上下文。工具返回 5 万行日志时，直接塞回模型会污染上下文；更好的方式是把完整日志落盘，只返回摘要、路径、关键行和下一步建议。\n\n### 4. 错误处理与恢复\n\n长任务的端到端可靠性会随着步骤数快速下降。即使每一步只有很小概率失败，几十步以后总失败概率也会变高。\n\nHarness 应区分错误类型：\n\n- **瞬态错误**：网络波动、503、超时，可以指数退避重试。\n- **模型可修复错误**：参数类型错、格式不合法，把错误作为观察结果返回给模型，让它修正。\n- **用户可修复错误**：缺少信息、权限不足、需要业务判断，暂停并询问用户。\n- **致命错误**：路径不安全、权限越界、不可逆风险，直接中止。\n\n反模式是把所有错误都同等处理：盲目重试会造成死循环，全部抛给用户会让用户被噪声淹没。\n\n### 5. 安全、权限与沙箱\n\n当 Agent 能运行 Shell、改文件、访问数据库、发邮件或调用外部 API 时，必须有多层防护。\n\n常见防护层：\n\n- **提示词层**：定义禁止行为和安全策略。\n- **Schema 层**：限制工具参数和可用工具范围。\n- **运行时审批**：删除、覆盖、支付、外发等动作需要人工确认。\n- **工具层校验**：危险命令检测、路径核验、陈旧读取检测。\n- **沙箱隔离**：限制文件系统、网络、进程和凭据访问。\n- **审计日志**：记录谁在什么时候调用了什么工具，输入输出是什么。\n\n本地执行型 Agent 尤其要重视路径核验。删除、覆盖、移动、批量修改都应该先解析绝对路径，确认目标在允许目录内，再执行。\n\n### 6. 人类在回路\n\n完全自动化听起来很美，但涉及钱、客户、隐私、删除、覆盖、发布、外发消息时，仍然需要人类确认。\n\nHarness 应提供暂停点：\n\n- Agent 先提出计划。\n- Harness 展示具体动作、路径、影响范围。\n- 用户确认后再执行。\n- 执行结果被记录并反馈给 Agent。\n\n这就是很多编码 Agent 里“是否允许执行此命令”的本质：不是模型不够聪明，而是 Harness 在把风险留给可审查的确认流程。\n\n### 7. 自动验证与反馈循环\n\n生产级 Harness 不应该只相信 Agent 的最终回答。它应该接入验证工具：\n\n- Lint\n- 类型检查\n- 单元测试\n- 集成测试\n- Playwright / UI 测试\n- 构建验证\n- 安全扫描\n- 成本和性能监控\n\n模式是：\n\n```text\n生成或修改 → 自动验证 → 失败反馈 → Agent 修复 → 再验证\n```\n\n这会把 Agent 从“一次性生成文本”推进到“闭环完成任务”。\n\n## Thin Harness 与 Thick Harness\n\nHarness 有厚薄之分。\n\n| 类型 | 特点 | 优点 | 风险 |\n|---|---|---|---|\n| Thin Harness | 把更多判断交给模型 | 简单、灵活、容易跟随模型能力进步 | 可观测性弱，安全和稳定性依赖模型 |\n| Thick Harness | 把更多规则固化在系统里 | 可控、可审计、稳定 | 维护成本高，可能限制强模型发挥 |\n\n实际选择不应追求越厚越好，而是看任务风险：\n\n- 研究、写作、草稿生成：可以薄一些。\n- 编码、自动化办公、文件操作：需要中等厚度。\n- 数据库、支付、生产发布、客户外发：必须厚，并加入审批、审计和回滚。\n\n## 对个人工作流的适配\n\n放到个人知识库和本地 AI 工作流里，Agent Harness 可以理解为一组“让 AI 不乱跑”的工作规则和工具边界。\n\n### 对 Obsidian 知识库\n\n- 把长期知识写成稳定笔记，而不是只留在聊天上下文。\n- 目录笔记负责导航，例如 [[AI记录/目录/AI研究所|AI研究所]]。\n- 内容笔记负责沉淀主题，例如当前这篇 Agent Harness 笔记。\n- 用 wikilink 连接相关概念，降低重复搜索成本。\n- 对来源、日期、适用范围做 frontmatter 标注。\n\n### 对 Codex / 编码 Agent\n\n- 明确工作目录边界。\n- 修改前先读代码和目录结构。\n- 对删除、覆盖、重命名、批量修改做路径核验。\n- 用测试、类型检查、lint 或可复现命令验证完成状态。\n- 复杂任务用计划、checkpoint 和交接文档降低上下文腐烂。\n- 高风险命令先解释目的和影响，再请求确认。\n\n### 对 Skills / MCP\n\nSkills 更像能力包或操作手册，MCP 更像工具连接协议。Harness 负责决定：\n\n- 什么时候加载哪个 Skill。\n- 哪个 MCP 工具可用。\n- 工具结果如何压缩和回传。\n- 出错时如何重试或降级。\n- 哪些工具调用需要人工确认。\n\n所以可以这样理解：\n\n```text\nSkill = 某类任务的经验和流程\nMCP = 外部工具和数据源的接口\nHarness = 选择、调度、约束、记录和恢复这些能力的运行时\n```\n\n## 识别一个 Harness 是否靠谱\n\n可以用这组问题检查：\n\n- 它是否有明确的任务状态和 checkpoint？\n- 它是否能在失败后恢复？\n- 它是否能控制模型看到哪些上下文？\n- 它是否限制工具权限和文件访问范围？\n- 它是否对危险操作设置人工审批？\n- 它是否记录工具调用和关键决策？\n- 它是否自动验证输出？\n- 它是否能压缩长历史并保留关键目标？\n- 它是否能解释失败原因，而不是只说“出错了”？\n- 它是否能把完整输出落盘，只给模型返回必要摘要？\n\n## 常见误区\n\n1. **以为换更强模型就能解决 Agent 稳定性**\n   模型变强会提高单步能力，但状态、权限、恢复、审计、验证仍然要靠 Harness。\n\n2. **把 Framework 当 Harness**\n   Framework 提供组件，Harness 是围绕真实任务运行起来的一整套系统。\n\n3. **把所有工具一次性塞进上下文**\n   工具越多不一定越强。工具说明、参数和输出都会消耗上下文。\n\n4. **没有恢复点**\n   长任务没有 checkpoint，本质上只是一次性脚本。\n\n5. **没有人类审批**\n   对低风险任务可以自动化；对高风险动作必须暂停。\n\n6. **只看最终结果，不看执行轨迹**\n   生产环境不只要答案，还要知道答案怎么来的。\n\n## 相关目录\n\n- [[AI记录/目录/AI研究所|AI研究所]]\n- [[AI记录/目录/常用SKILLS|常用 SKILLS]]\n- [[AI记录/目录/常用MCP|常用 MCP]]\n- [[AI记录/目录/常用IDE|常用 IDE]]\n\n## 延伸阅读\n\n- [B站视频：8分钟快速掌握Agent Harness](https://www.bilibili.com/video/BV1QgX5B4EV2/)\n- [抖音精选镜像：8分钟快速掌握Agent Harness](https://jingxuan.douyin.com/m/video/7622230524530085129)\n- [Tian Pan：Agent Harness 深度解析](https://tianpan.co/zh/blog/2026-02-27-anatomy-of-an-agent-harness)\n- [Agent Harness 到底是什么？一篇让小白也能看懂的万字入门](https://www.80aj.com/2026/03/29/agent-harness-guide/)"
    },
    {
      "id": "note-2",
      "title": "agent-browser",
      "fileTitle": "agent-browser",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/浏览器",
        "AI记录/自动化",
        "AI记录/已核对"
      ],
      "summary": "agent browser agent browser 是面向 AI Agent 的浏览器自动化 CLI，用于打开网页、读取页面结构、点击、输入、截图、下载、表单提交和网页测试。 一句话定位 当任务需要真实浏览器交互，而不是只读取网页文本时使用。 什么时候用 打开网站并操作。 填表、点击按钮、选择下拉框。 登录网站。 截图或保存 PDF。 抓取页面结构化数据...",
      "wordCount": 556,
      "sourceFile": "mydata/我的数据/AI记录/内容/agent-browser.md",
      "markdown": "# agent-browser\n\n`agent-browser` 是面向 AI Agent 的浏览器自动化 CLI，用于打开网页、读取页面结构、点击、输入、截图、下载、表单提交和网页测试。\n\n## 一句话定位\n\n当任务需要真实浏览器交互，而不是只读取网页文本时使用。\n\n## 什么时候用\n\n- 打开网站并操作。\n- 填表、点击按钮、选择下拉框。\n- 登录网站。\n- 截图或保存 PDF。\n- 抓取页面结构化数据。\n- 测试 Web app。\n- 比较页面状态或截图差异。\n\n## 不适合场景\n\n- 只需查网页公开文本，普通 web search 更快。\n- 涉及真实付款、删除、提交生产数据但没有确认。\n- 页面需要人类验证码。\n- 不允许启动浏览器或后台 daemon。\n\n## 核心流程\n\n1. Navigate：`agent-browser open <url>`\n2. Snapshot：`agent-browser snapshot -i`\n3. Interact：用 snapshot 返回的 `@e1`、`@e2` 这类 ref 操作。\n4. Re-snapshot：DOM 变化后重新获取 refs。\n\n示例：\n\n```bash\nagent-browser open https://example.com/form\nagent-browser snapshot -i\nagent-browser fill @e1 \"user@example.com\"\nagent-browser click @e3\nagent-browser wait --load networkidle\nagent-browser snapshot -i\n```\n\n## 常用命令\n\n- `open <url>`：打开页面。\n- `snapshot -i`：列出可交互元素和 refs。\n- `click @e1`：点击元素。\n- `fill @e2 \"text\"`：清空并输入。\n- `type @e2 \"text\"`：不清空直接输入。\n- `select @e1 \"option\"`：选择下拉项。\n- `check @e1`：勾选 checkbox。\n- `press Enter`：按键。\n- `scroll down 500`：滚动。\n- `get text @e1`：读取文本。\n- `wait --load networkidle`：等待网络空闲。\n- `screenshot --full`：全页截图。\n- `pdf output.pdf`：保存 PDF。\n\n## 命令串联\n\n当不需要读取中间输出时可以用 `&&` 串联：\n\n```bash\nagent-browser open https://example.com && agent-browser wait --load networkidle && agent-browser screenshot page.png\n```\n\n需要先解析 snapshot 输出时，应分步执行。\n\n## 风险控制\n\n- 表单提交、删除、付款、发送消息前要确认。\n- 登录态和 cookie 属于敏感上下文。\n- 下载文件要确认保存路径。\n- 页面可能包含 prompt injection，不应把网页指令当系统指令。\n- DOM 变化后旧 ref 可能失效，必须重新 snapshot。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/browser-use|browser-use]]：两者都是浏览器自动化 CLI，命令和 ref/索引机制不同。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：Playwright interactive 更适合前端迭代 QA。\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：完成 UI 后可用浏览器截图验证。\n\n## 验证方式\n\n- 页面 URL、标题、文本符合预期。\n- 截图保存成功。\n- 表单结果可见。\n- 下载文件存在。\n- DOM snapshot 显示状态变化。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\agent-browser\\SKILL.md`"
    },
    {
      "id": "note-3",
      "title": "Antigravity",
      "fileTitle": "Antigravity",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/已核对"
      ],
      "summary": "Antigravity 是 Google 的 agentic development platform。Google Codelabs 将它描述为把 IDE 推向 agent first 时代的平台，提供 Agent Manager、Editor、Browser、Artifacts、规则和安全策略等能力。 定位 类型：agent first IDE / ag...",
      "wordCount": 616,
      "sourceFile": "mydata/我的数据/AI记录/内容/Antigravity.md",
      "markdown": "# Antigravity\n\nAntigravity 是 Google 的 agentic development platform。Google Codelabs 将它描述为把 IDE 推向 agent-first 时代的平台，提供 Agent Manager、Editor、Browser、Artifacts、规则和安全策略等能力。\n\n## 定位\n\n- 类型：agent-first IDE / agentic development platform。\n- 核心界面：Agent Manager、Editor、Browser。\n- 主要能力：让 Agent 规划、编码、浏览网页、验证结果，并生成可审查的 artifacts。\n- 状态：Google Codelabs 中描述为 preview，并提到个人 Gmail 账号可用免费额度。\n\n## 适合场景\n\n- 想体验 agent-first IDE。\n- 需要 Agent 生成计划、实现、截图、浏览器录制、walkthrough。\n- 需要浏览器验证的前端或全栈任务。\n- 希望用 artifacts 作为人与 Agent 协作的中间产物。\n\n## 不适合场景\n\n- 不能接受 Agent 操作终端或浏览器的敏感环境。\n- 没有备份和版本控制的本地目录。\n- 需要严格企业权限边界但尚未配置安全策略。\n- 只需要轻量补全或简单问答。\n\n## 关键概念\n\n- Agent Manager：管理 agent 任务的主界面。\n- Planning/Fast mode：控制 Agent 是否先规划。\n- Artifacts：任务计划、实现计划、walkthrough、截图、浏览器录制、代码 diff 等。\n- Browser agent：用于网页访问和验证。\n- Rules / Workflows：定制 Agent 行为和可复用流程。\n\n## 安全策略\n\nGoogle Codelabs 特别强调终端和浏览器权限的双刃剑属性。需要关注：\n\n- Terminal Command Auto Execution policy。\n- Request Review。\n- Always Proceed。\n- Allow List。\n- Deny List。\n- Browser URL Allowlist。\n\n对本地文件和终端命令，建议默认采用 review-driven 或 request-review 风格，不要让 Agent 在未知项目中无确认执行高风险命令。\n\n## 风险控制\n\n- 不在重要磁盘根目录、资料盘根目录或未备份目录中试用。\n- 开启版本控制或备份。\n- 对删除、移动、覆盖、下载、执行脚本等操作保持人工确认。\n- 对浏览器访问外部网站警惕 prompt injection 和数据外传。\n\n## 与其他工具的比较\n\n- 与 [[AI记录/内容/trae|trae]]：Antigravity 更强调 Agent Manager、artifacts 和浏览器验证；Trae 更偏 AI IDE 编辑体验。\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：Antigravity 更像带可视化协作和浏览器验证的 agent-first IDE。\n- 与 [[AI记录/内容/kilo code|kilo code]]：两者都面向 Agent 化开发，但 Kilo 更强调开源、多平台、多模型；Antigravity 更强调 Google 的 agent-first 平台体验。\n\n## 使用判断\n\n适合在隔离项目和有备份的环境中评估。尤其适合观察“计划、实现、验证、artifact 审查”的 agent-first 工作方式。\n\n## 来源\n\n- [Google Codelabs: Getting Started with Google Antigravity](https://codelabs.developers.google.com/getting-started-google-antigravity)"
    },
    {
      "id": "note-4",
      "title": "baoyu-compress-image",
      "fileTitle": "baoyu-compress-image",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/图片",
        "AI记录/压缩",
        "AI记录/已核对"
      ],
      "summary": "baoyu compress image baoyu compress image 用于压缩和转换图片，默认输出 WebP，也支持 PNG/JPEG。它通过脚本自动选择可用工具。 一句话定位 当用户要求压缩图片、优化图片体积、转换 WebP 或减少文件大小时使用。 什么时候用 单张图片压缩。 图片目录批处理。 转 WebP。 保留 PNG/JPEG 但重新压...",
      "wordCount": 393,
      "sourceFile": "mydata/我的数据/AI记录/内容/baoyu-compress-image.md",
      "markdown": "# baoyu-compress-image\n\n`baoyu-compress-image` 用于压缩和转换图片，默认输出 WebP，也支持 PNG/JPEG。它通过脚本自动选择可用工具。\n\n## 一句话定位\n\n当用户要求压缩图片、优化图片体积、转换 WebP 或减少文件大小时使用。\n\n## 什么时候用\n\n- 单张图片压缩。\n- 图片目录批处理。\n- 转 WebP。\n- 保留 PNG/JPEG 但重新压缩。\n- 需要 JSON 输出用于自动化记录。\n\n## 不适合场景\n\n- AI 生成图片，应使用 [[AI记录/内容/imagegen|imagegen]]。\n- 精确裁剪、批量 resize、取 metadata，更适合 [[AI记录/内容/image-manipulation-image-magick|image-manipulation-image-magick]]。\n- 不允许安装或运行 `bun` / `npx`。\n\n## 脚本入口\n\nSkill 原文指定脚本：\n\n```text\nscripts/main.ts\n```\n\n运行时优先使用 `bun`；没有 `bun` 时可用 `npx -y bun`。\n\n## 常用参数\n\n- `<input>`：文件或目录。\n- `--output` / `-o`：输出路径。\n- `--format` / `-f`：`webp`、`png`、`jpeg`。\n- `--quality` / `-q`：质量 0-100，默认 80。\n- `--keep` / `-k`：保留原文件。\n- `--recursive` / `-r`：递归处理子目录。\n- `--json`：输出 JSON。\n\n## 示例\n\n```bash\n${BUN_X} {baseDir}/scripts/main.ts image.png\n${BUN_X} {baseDir}/scripts/main.ts image.png -f png --keep\n${BUN_X} {baseDir}/scripts/main.ts ./images/ -r -q 75\n${BUN_X} {baseDir}/scripts/main.ts image.png --json\n```\n\n## 配置\n\n支持 `EXTEND.md` 偏好文件，优先级：\n\n1. 项目 `.baoyu-skills/baoyu-compress-image/EXTEND.md`\n2. XDG config。\n3. 用户 home。\n\n可配置默认格式、默认质量和是否保留原文件。\n\n## 风险控制\n\n- 默认可能生成新扩展名文件，应确认是否覆盖或删除原图。\n- 批处理前核对输入目录和输出目录。\n- 大量图片处理前可先单张试跑。\n- 不要在资料盘根目录递归运行。\n\n## 验证方式\n\n- 输出文件存在。\n- 格式正确。\n- 体积下降。\n- 视觉质量可接受。\n- JSON 输出可解析。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\baoyu-compress-image\\SKILL.md`"
    },
    {
      "id": "note-5",
      "title": "baoyu-image-gen",
      "fileTitle": "baoyu-image-gen",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/图片",
        "AI记录/Deprecated",
        "AI记录/已核对"
      ],
      "summary": "baoyu image gen baoyu image gen 是旧的多 provider AI 图片生成 Skill。其描述中已标注 deprecated，并提示使用 baoyu imagine；在当前笔记体系中，新 OpenAI 图片任务优先使用 imagegen。 一句话定位 历史图片生成入口，支持多家图片 API，但不应作为新任务默认选择。 支持方向...",
      "wordCount": 370,
      "sourceFile": "mydata/我的数据/AI记录/内容/baoyu-image-gen.md",
      "markdown": "# baoyu-image-gen\n\n`baoyu-image-gen` 是旧的多 provider AI 图片生成 Skill。其描述中已标注 deprecated，并提示使用 `baoyu-imagine`；在当前笔记体系中，新 OpenAI 图片任务优先使用 [[AI记录/内容/imagegen|imagegen]]。\n\n## 一句话定位\n\n历史图片生成入口，支持多家图片 API，但不应作为新任务默认选择。\n\n## 支持方向\n\nSkill 原文显示它支持：\n\n- OpenAI\n- Azure OpenAI\n- Google\n- OpenRouter\n- DashScope\n- Z.AI GLM-Image\n- MiniMax\n- Jimeng 即梦\n- Seedream 豆包\n- Replicate\n\n## 什么时候可能还会用\n\n- 旧项目已经依赖它。\n- 需要某个 provider 的历史脚本。\n- 需要理解旧笔记里的生成命令。\n- 用户明确要求使用这个 Skill。\n\n## 不建议用于\n\n- 新的 OpenAI 图片生成任务。\n- 需要长期维护的流程。\n- 没有 EXTEND.md 偏好配置的快速生成。\n- 不清楚 provider 和密钥来源的任务。\n\n## 重要阻塞点\n\nSkill 原文要求 Step 0 必须加载 `EXTEND.md`，没有就进行 first-time setup。图片生成在配置完成前被阻塞。\n\n## 风险控制\n\n- 多 provider 意味着多套 API key 和成本模型。\n- 批量生成需要控制并发。\n- 不要把 API key 写进笔记或聊天。\n- 历史 Skill 可能与当前推荐流程不一致。\n\n## 迁移建议\n\n- 新任务优先记录到 [[AI记录/内容/imagegen|imagegen]]。\n- 如果旧项目依赖 baoyu-image-gen，记录 provider、model、EXTEND.md 位置和替代方案。\n- 不要删除旧记录，避免丢失可复现信息。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\baoyu-image-gen\\SKILL.md`"
    },
    {
      "id": "note-6",
      "title": "Beads",
      "fileTitle": "Beads",
      "categories": [
        "其他AI 工具"
      ],
      "tags": [
        "AI记录/工具",
        "AI记录/任务管理",
        "AI记录/Agent",
        "AI记录/已核对"
      ],
      "summary": "Beads 是面向 AI supervised coding workflows 的 git backed issue tracker。它的命令行名通常是 bd。核心思路是把任务状态存进仓库中的 JSONL 文件，让任务、依赖和执行状态能随 Git 分支一起流动。 一句话定位 给 AI coding agents 使用的、随代码仓库版本控制的任务图和 iss...",
      "wordCount": 765,
      "sourceFile": "mydata/我的数据/AI记录/内容/Beads.md",
      "markdown": "# Beads\n\nBeads 是面向 AI-supervised coding workflows 的 git-backed issue tracker。它的命令行名通常是 `bd`。核心思路是把任务状态存进仓库中的 JSONL 文件，让任务、依赖和执行状态能随 Git 分支一起流动。\n\n## 一句话定位\n\n给 AI coding agents 使用的、随代码仓库版本控制的任务图和 issue tracker。\n\n## 解决的问题\n\n传统 issue tracker 如 Jira、GitHub Issues 更偏人类 UI 和中心化服务；AI Agent 在本地分支、长任务、多会话中工作时，容易丢失：\n\n- 计划。\n- 任务状态。\n- 依赖关系。\n- 阻塞项。\n- 已完成和未完成上下文。\n\nBeads 把这些信息作为仓库内数据保存，使 Agent 能跨 session、branch 和多人/多 Agent 协作恢复上下文。\n\n## 核心特性\n\n- Git-backed storage：任务存储在仓库内，随 Git 同步。\n- Dependency-aware execution：`bd ready` 只显示未被依赖阻塞的任务。\n- Hash-based IDs：降低多 Agent 并发创建任务时的 ID 冲突。\n- JSONL 数据：适合版本控制和合并。\n- AI-native workflows：为 coding agents 读取、创建、更新任务设计。\n- Multi-agent coordination：支持更复杂的路由、gate、molecule 等模式。\n\n## 适合场景\n\n- 长任务需要持久任务图。\n- 多个 Agent 并行工作。\n- 任务之间有明确依赖。\n- 希望任务状态跟代码分支一起提交。\n- 不想让计划只停留在 Markdown 临时文档里。\n- 需要 `ready queue` 告诉 Agent 下一步能做什么。\n\n## 不适合场景\n\n- 一次性小改动。\n- 只需简单 checklist。\n- 项目不允许写入 `.beads/` 或类似任务数据目录。\n- 团队已经有强制的 Jira/Linear/GitHub Issues 流程，且不希望本地任务图分叉。\n- 任务依赖关系很弱，不值得引入工具。\n\n## 基本命令\n\n官方文档示例包括：\n\n```bash\nbd init --quiet\nbd create \"Set up database\" -p 1 -t task\nbd ready\n```\n\n常见概念：\n\n- issue：工作项。\n- priority：优先级。\n- type：任务类型。\n- dependency：依赖关系。\n- ready：当前未阻塞、可执行的任务。\n\n## 与 Markdown 计划的区别\n\nMarkdown 计划适合人读，但依赖和状态容易松散。Beads 更像结构化任务图：\n\n- 可查询。\n- 可过滤。\n- 可合并。\n- 可被 Agent 自动读取。\n- 更适合多分支、多 Agent。\n\n## 与其他工具的关系\n\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：brainstorming 产出设计，Beads 可承接为任务图。\n- 与 [[AI记录/内容/dispatching-parallel-agents|dispatching-parallel-agents]]：多 Agent 并行时，Beads 可保存共享任务状态。\n- 与 [[AI记录/内容/gsd2|gsd2]]：GSD2 偏 agent harness / 自动执行；Beads 偏任务图和 issue 状态。\n\n## 风险和注意事项\n\n- 任务数据进入仓库，需要考虑是否提交。\n- 如果团队不知道 Beads，会增加协作解释成本。\n- 任务拆分质量决定工具价值。\n- 依赖图过细会变成维护负担。\n- 引入前要确认 `.beads/` 目录和 Git 策略。\n\n## 使用判断\n\n如果只是今天做一个小修复，不需要 Beads。如果是多天、多 Agent、多依赖的 coding workflow，Beads 值得评估。\n\n## 待补充\n\n- 本机是否已安装 `bd`。\n- 当前项目是否有 `.beads/`。\n- 你希望 Beads 用于个人任务、Agent 自动任务，还是团队协作。\n\n## 来源\n\n- [Beads Documentation](https://steveyegge.github.io/beads/)\n- [Beads Task Tracker skill 候选](https://termo.ai/skills/beads)"
    },
    {
      "id": "note-7",
      "title": "brainstorming",
      "fileTitle": "brainstorming",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/设计",
        "AI记录/需求澄清"
      ],
      "summary": "brainstorming 是一个前置设计 Skill，用来把模糊想法转成可执行设计。它不负责直接写代码，也不负责进入实现阶段；它的核心价值是先把“要做什么、为什么做、怎么判断做对了”弄清楚。 一句话定位 在任何创造性工作开始前，先通过项目上下文、澄清问题、方案比较和设计确认，把需求从“想法”推进到“经过用户认可的设计”。 什么时候必须使用 适合在这些任务前...",
      "wordCount": 1731,
      "sourceFile": "mydata/我的数据/AI记录/内容/brainstorming.md",
      "markdown": "# brainstorming\n\n`brainstorming` 是一个前置设计 Skill，用来把模糊想法转成可执行设计。它不负责直接写代码，也不负责进入实现阶段；它的核心价值是先把“要做什么、为什么做、怎么判断做对了”弄清楚。\n\n## 一句话定位\n\n在任何创造性工作开始前，先通过项目上下文、澄清问题、方案比较和设计确认，把需求从“想法”推进到“经过用户认可的设计”。\n\n## 什么时候必须使用\n\n适合在这些任务前使用：\n\n- 创建新功能。\n- 设计新组件。\n- 修改已有行为。\n- 搭建新工具或工作流。\n- 改造产品体验。\n- 需要在多个方案中做取舍。\n- 用户只有一个想法，但还没有明确需求边界。\n\n即使任务看起来很小，也应该做最小规模的设计确认。例如一个单函数工具、一个配置调整、一个小 UI 控件，也可能因为隐含假设不同而返工。\n\n## 什么时候不适合完整执行\n\n这些情况通常不需要走完整 brainstorming 流程：\n\n- 用户只要求解释概念。\n- 用户只要求整理已有资料。\n- 用户明确要求只读审查，不要求落地实现。\n- 用户已经给出完整设计，只需要按计划执行。\n- 当前任务是修复明确 bug，应优先进入系统调试流程。\n\n如果用户只是点名这个 Skill 来补充资料，可以读取 Skill 原文并总结，但不需要真的开始向用户逐轮提问、写设计文档或进入 `writing-plans`。\n\n## 核心硬门槛\n\n`brainstorming` 最重要的约束是：在设计被用户认可前，不进入实现。\n\n这意味着不能提前：\n\n- 写代码。\n- 搭项目。\n- 修改行为。\n- 调用实现型 Skill。\n- 直接创建最终产物。\n\n它先产出设计，再把设计交给下一阶段。\n\n## 标准流程\n\n### 1. 探索项目上下文\n\n先了解当前项目状态，而不是直接问抽象问题。\n\n可以检查：\n\n- 项目文件结构。\n- README、docs、计划文档。\n- 现有功能实现。\n- 近期提交。\n- 相关配置。\n- 已有约定和限制。\n\n目标是让后续问题更具体，避免问用户已经能从项目里读到的东西。\n\n### 2. 逐个提出澄清问题\n\n一次只问一个问题。问题应该围绕目的、约束和成功标准，而不是一次抛出一长串表单。\n\n优先问：\n\n- 这个功能给谁用。\n- 用户完成什么任务。\n- 现有痛点是什么。\n- 哪些行为不能改变。\n- 什么结果算成功。\n- 有没有时间、技术、兼容性或数据限制。\n\n多选问题通常更容易回答，但开放问题也可以用在方向不清的时候。\n\n### 3. 提出 2-3 个方案\n\n在理解需求后，不要只给一个方案。应该给 2-3 个可行方向，并说明取舍。\n\n每个方案至少说明：\n\n- 核心思路。\n- 优点。\n- 缺点。\n- 风险。\n- 适合什么情况。\n\n最后给出推荐方案，并解释推荐理由。\n\n### 4. 分段呈现设计\n\n设计说明要按复杂度调整长度。简单任务可以只写几段；复杂任务应分成清晰章节。\n\n常见设计章节：\n\n- 背景和目标。\n- 非目标。\n- 用户流程。\n- 架构或模块划分。\n- 数据流。\n- 状态和边界情况。\n- 错误处理。\n- 测试和验收。\n- 风险和回滚。\n\n呈现时应分段确认，而不是一次性把所有细节压给用户。\n\n### 5. 获得用户确认\n\n用户确认前，设计仍然只是草案。如果用户指出方向不对，应回到前面的问题或方案比较阶段。\n\n确认要明确，例如：\n\n- “这个方向可以。”\n- “按方案 B 做。”\n- “先实现最小版本。”\n- “保留这个限制。”\n\n模糊回应不应被当作完整批准。\n\n### 6. 写设计文档\n\n设计通过后，应把结果保存为设计文档。默认位置通常是：\n\n```text\ndocs/plans/YYYY-MM-DD-<topic>-design.md\n```\n\n设计文档应记录已经确认的内容，而不是重新发散。\n\n### 7. 交接到 implementation planning\n\n`brainstorming` 的终点不是实现，而是调用 `writing-plans` 生成实施计划。\n\n也就是说：\n\n```text\nbrainstorming -> writing-plans -> implementation\n```\n\n不要从 brainstorming 直接跳到 `frontend-design`、`mcp-builder` 或其他实现型 Skill。\n\n## 问题设计模板\n\n### 目的类问题\n\n```markdown\n这个功能最主要要帮助用户完成哪件事？\n```\n\n适合在用户只给出功能名时使用。\n\n### 约束类问题\n\n```markdown\n这次改动有没有必须保留不变的行为？\n```\n\n适合在修改已有系统时使用。\n\n### 范围类问题\n\n```markdown\n这次是先做最小可用版本，还是希望一次覆盖完整流程？\n```\n\n适合控制需求膨胀。\n\n### 成功标准类问题\n\n```markdown\n完成后你会用什么现象判断它是对的？\n```\n\n适合把主观目标转成验收标准。\n\n### 多选类问题\n\n```markdown\n你更倾向哪种方向？\n\nA. 最小改动，先满足当前需求\nB. 中等改造，顺便整理结构\nC. 完整重做，为后续扩展铺路\n```\n\n适合在多个取舍都合理时使用。\n\n## 方案比较模板\n\n```markdown\n我看到 3 个可行方向：\n\n1. 方案 A：最小改动\n   优点：快，风险低。\n   缺点：后续扩展一般。\n   适合：当前只想解决一个明确问题。\n\n2. 方案 B：局部重构\n   优点：能解决当前问题，也改善结构。\n   缺点：改动范围更大，需要更多验证。\n   适合：这个模块后续还会继续改。\n\n3. 方案 C：重新设计\n   优点：长期结构最好。\n   缺点：成本高，容易引入新风险。\n   适合：现有结构已经明显阻碍后续需求。\n\n推荐方案 B，因为它在风险和长期收益之间更平衡。\n```\n\n## 设计文档模板\n\n```markdown\n# <topic> Design\n\n## 背景\n\n为什么要做这件事。\n\n## 目标\n\n- 目标 1\n- 目标 2\n\n## 非目标\n\n- 本次不做什么。\n\n## 推荐方案\n\n说明最终采用的方案。\n\n## 方案取舍\n\n记录为什么不选其他方案。\n\n## 用户流程\n\n用户如何使用。\n\n## 架构/模块\n\n涉及哪些模块，各自负责什么。\n\n## 数据流\n\n数据如何进入、转换、保存、展示。\n\n## 错误处理\n\n失败时如何表现。\n\n## 测试和验收\n\n如何证明设计被正确实现。\n\n## 风险\n\n潜在问题和缓解方式。\n```\n\n## 常见反模式\n\n### 反模式：觉得太简单，不需要设计\n\n小任务最容易因为默认假设不同而返工。即使只写几句话，也应确认目标和边界。\n\n### 反模式：一开始就实现\n\n在需求没有确认前实现，会把讨论变成返工。\n\n### 反模式：一次问很多问题\n\n用户会被问题列表淹没，而且答案质量会下降。应该一轮只推进一个关键问题。\n\n### 反模式：只给一个方案\n\n只给一个方案会隐藏取舍。至少比较 2 个方向，才能让用户知道为什么这样做。\n\n### 反模式：设计没有验收标准\n\n没有验收标准，后续实现阶段就无法判断是否完成。\n\n## 与其他 Skills 的关系\n\n### 与 writing-plans\n\n`brainstorming` 产出设计，`writing-plans` 把设计拆成可执行计划。前者回答“要做什么和为什么”，后者回答“按什么步骤做”。\n\n### 与 frontend-design\n\n前端任务中，`brainstorming` 先确认用户目标、范围和体验方向；只有设计被确认后，才进入具体界面设计或实现。\n\n### 与 systematic-debugging\n\n如果任务本质是 bug、测试失败或异常行为，应该先走系统调试，而不是 brainstorming。除非排查后发现需要重新设计行为。\n\n### 与 skill-creator\n\n创建新 Skill 前可先用 brainstorming 明确这个 Skill 解决什么问题、触发范围和验收方式。\n\n## 适合记录的产物\n\n- 澄清问题和答案。\n- 方案比较。\n- 用户最终选择。\n- 设计文档。\n- 被排除的非目标。\n- 后续实施计划链接。\n\n## 快速检查清单\n\n- [ ] 是否先看了项目上下文。\n- [ ] 是否一次只问一个关键问题。\n- [ ] 是否明确目的、约束和成功标准。\n- [ ] 是否给出 2-3 个方案。\n- [ ] 是否说明推荐理由。\n- [ ] 是否获得用户确认。\n- [ ] 是否保存设计文档。\n- [ ] 是否只在设计确认后进入 `writing-plans`。\n\n## 记忆要点\n\n`brainstorming` 不是“随便想想”，而是一个设计门禁。它的产物不是代码，而是被用户确认、能交给实施计划的设计。"
    },
    {
      "id": "note-8",
      "title": "browser-use",
      "fileTitle": "browser-use",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/浏览器",
        "AI记录/自动化",
        "AI记录/已核对"
      ],
      "summary": "browser use browser use 是浏览器自动化 CLI，使用持久后台 daemon 保持浏览器会话。它适合网页测试、表单填写、截图、数据提取和真实 Chrome/Profile 连接。 一句话定位 当你需要稳定、持续地操作浏览器，并希望复用会话、登录态或云浏览器时使用。 什么时候用 自动访问网页。 点击、输入、选择、上传文件。 提取页面文字、...",
      "wordCount": 537,
      "sourceFile": "mydata/我的数据/AI记录/内容/browser-use.md",
      "markdown": "# browser-use\n\n`browser-use` 是浏览器自动化 CLI，使用持久后台 daemon 保持浏览器会话。它适合网页测试、表单填写、截图、数据提取和真实 Chrome/Profile 连接。\n\n## 一句话定位\n\n当你需要稳定、持续地操作浏览器，并希望复用会话、登录态或云浏览器时使用。\n\n## 什么时候用\n\n- 自动访问网页。\n- 点击、输入、选择、上传文件。\n- 提取页面文字、HTML、属性。\n- 截图。\n- 使用用户现有 Chrome 登录态。\n- 使用 cloud browser。\n- 测试网页交互。\n\n## 不适合场景\n\n- 只需要静态搜索。\n- 网站需要人工验证码。\n- 未经确认提交真实业务操作。\n- 不允许使用用户 Chrome profile 或 cookies。\n\n## 核心流程\n\n1. `browser-use open <url>` 打开页面。\n2. `browser-use state` 获取页面状态和元素编号。\n3. 用编号执行 `click`、`input`、`select` 等操作。\n4. 用 `state` 或 `screenshot` 验证。\n\n示例：\n\n```bash\nbrowser-use open https://example.com\nbrowser-use state\nbrowser-use input 3 \"hello\"\nbrowser-use click 5\nbrowser-use screenshot result.png\n```\n\n## 浏览器模式\n\n- `browser-use open <url>`：默认 headless Chromium。\n- `browser-use --headed open <url>`：可见窗口。\n- `browser-use connect`：连接用户 Chrome，保留 cookies/login。\n- `browser-use cloud connect`：连接云浏览器。\n- `browser-use --profile \"Default\" open <url>`：使用指定 Chrome profile。\n\n## 常用命令\n\n- `state`：读取 URL、标题、可点击元素编号。\n- `click <index>`：点击。\n- `input <index> \"text\"`：输入并清空原值。\n- `keys \"Enter\"`：键盘输入。\n- `select <index> \"option\"`：选择下拉项。\n- `upload <index> <path>`：上传文件。\n- `get html` / `get text <index>` / `get attributes <index>`：提取数据。\n- `wait selector \"css\"` / `wait text \"text\"`：等待。\n- `cookies export/import`：导入导出 cookies。\n- `close --all`：关闭会话。\n\n## connect 失败时\n\nSkill 原文要求给用户两个选项：\n\n1. 使用真实 Chrome：用户开启 remote debugging 后再连接。\n2. 使用 managed Chromium + 指定 Chrome profile：不需要用户重启 Chrome。\n\n不能擅自替用户选一种。\n\n## 风险控制\n\n- 连接真实 Chrome 会接触用户登录态。\n- cookies 导入导出要谨慎。\n- 真实表单提交、支付、删除前需要确认。\n- 坏会话可先 `browser-use close` 再重试。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/agent-browser|agent-browser]]：两者定位接近，browser-use 强调后台 daemon、profile、cloud browser。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：后者更适合开发调试和 QA 覆盖。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\browser-use\\SKILL.md`"
    },
    {
      "id": "note-9",
      "title": "buddycode",
      "fileTitle": "buddycode",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/待核对"
      ],
      "summary": "buddycode 的指向需要确认。公开搜索中至少出现两个可能相关但性质不同的结果：buddycodegpt.com 像是面向开发者的 AI coding desktop/tool；buddycodehub.com 更像面向青少年 coding/robotics 教育的平台。 在未确认前，不应把它写成明确的常用 AI 编程 IDE。 候选 1：BuddyCo...",
      "wordCount": 414,
      "sourceFile": "mydata/我的数据/AI记录/内容/buddycode.md",
      "markdown": "# buddycode\n\n`buddycode` 的指向需要确认。公开搜索中至少出现两个可能相关但性质不同的结果：`buddycodegpt.com` 像是面向开发者的 AI coding desktop/tool；`buddycodehub.com` 更像面向青少年 coding/robotics 教育的平台。\n\n在未确认前，不应把它写成明确的常用 AI 编程 IDE。\n\n## 候选 1：BuddyCode GPT\n\n公开页面描述它使用 LM Studio 和 Ollama 这类本地模型桌面应用来提供 AI coding 功能。这个方向更接近 AI 编程工具。\n\n需要确认：\n\n- 是否仍在维护。\n- 是否有官方文档。\n- 是否支持本地仓库。\n- 是否支持文件修改。\n- 是否支持测试、终端或 git。\n- 是否可与 VS Code、JetBrains 或 CLI 集成。\n\n## 候选 2：Buddy Code Hub\n\n公开页面描述它是 coding、robotics、electronics 和 digital literacy 教育平台。这个方向不一定是 AI 编程 IDE，可能不适合放在 `常用IDE`。\n\n需要确认：\n\n- 是否与你记录的 buddycode 是同一个工具。\n- 是否有 AI coding agent 能力。\n- 是否只是教育平台。\n\n## 评估任务\n\n如果要确认 buddycode 是否值得纳入常用 IDE，可以用以下任务评估：\n\n- 打开一个已有仓库并解释结构。\n- 修改一个小 bug。\n- 为一个函数补测试。\n- 运行测试或给出验证方式。\n- 展示生成 diff 的方式。\n- 说明数据是否本地处理。\n\n## 结论模板\n\n```markdown\n- 确认名称：\n- 官方地址：\n- 类型：\n- 是否 AI 编程工具：\n- 是否支持本地仓库：\n- 是否支持文件修改：\n- 是否支持终端/测试：\n- 模型来源：\n- 隐私边界：\n- 是否保留在常用 IDE：\n```\n\n## 当前结论\n\n保持待核对。只有确认它指向 BuddyCode GPT 或类似 AI coding 工具后，才建议继续扩写为常用 IDE 文档；如果是 Buddy Code Hub，则应移出 `常用IDE`。\n\n## 来源\n\n- [BuddyCode GPT 候选](https://buddycodegpt.com/)\n- [Buddy Code Hub 候选](https://www.buddycodehub.com/)"
    },
    {
      "id": "note-10",
      "title": "Claude Code Harness：14 天 6 版集中进化速览 (2026.04)",
      "fileTitle": "Claude Code Harness：14 天 6 版集中进化速览 (2026.04)",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI/Agent",
        "AI/Harness",
        "AI/ClaudeCode"
      ],
      "summary": "近期，Claude Code 的 Harness 层在短短 14 天内连续发布了 6 个版本。需要明确的是，这并非模型本身的升级（如 Opus 4.7 提升的是“大脑智商”），而是 Harness（框架/外壳）层的升级 。Harness 的升级相当于给大脑装上了“身体”，使 Claude Code 首次真正具备了长时间运行、分身协作以及被外部事件自动唤醒的能...",
      "wordCount": 1447,
      "sourceFile": "mydata/我的数据/AI记录/内容/Claude Code Harness：14 天 6 版集中进化速览 (2026.04).md",
      "markdown": "# Claude Code Harness：14 天 6 版集中进化速览 (2026.04)\n\n近期，Claude Code 的 Harness 层在短短 14 天内连续发布了 6 个版本。需要明确的是，这并非模型本身的升级（如 Opus 4.7 提升的是“大脑智商”），而是 **Harness（框架/外壳）层的升级**。Harness 的升级相当于给大脑装上了“身体”，使 Claude Code 首次真正具备了长时间运行、分身协作以及被外部事件自动唤醒的能力。\n\n与动辄需要数月训练的底层模型不同，Harness 层可以实现每周甚至每天的快速迭代。这里才是目前 Agentic（智能体）能力真正角逐的战场。\n\n---\n\n## 📅 六个版本时间线 (2026.04.09 - 2026.04.22)\n\n在 14 天的时间里，平均每 2-3 天就会进行一次版本更迭：\n\n- **04.09 | v2.1.98**：`Monitor` 工具发布（事件驱动订阅）\n- **04.15 | v2.1.110**：长任务 UX 工具包上线（Push / Recap / focus / tui）\n- **04.16 | v2.1.111**：`/ultrareview` 多 Agent 评审与 PowerShell Tool\n- **04.17 | v2.1.113**：稳定性提升（原生二进制启动 + subagent 超时控制）\n- **04.20 | v2.1.116**：`/resume` 提速（大 Session 加快 67%）\n- **04.22 | v2.1.117**：Agent 自包含化（frontmatter hooks + MCP）\n\n---\n\n## 🚀 核心功能演进详解\n\n### 1. Monitor 与长任务响应式设计 (v2.1.98 & v2.1.110)\n\n#### Monitor：从“轮询 (Polling)”到“响应 (Reacting)”\n\n早期在等待 Dev Server 或 CI 状态时，模型只能每隔 10 秒去查询一次，每次查询都需要携带全部上下文，这会导致 Token 的极大浪费。\n\n`Monitor` 改变了这一流程：它会在后台运行一个 Shell 脚本，脚本每输出一行文本，就会生成一个事件通知推回对话。模型在事件发生前处于“静默”状态，只有真实事件发生时才会被唤醒处理。\n\n- **官方定位**：*Stop polling, start reacting.*\n- **核心收益**：典型场景下能节省 **80% 以上**的 Token 消耗。\n\n#### 长任务 UX 工具包 (v2.1.110)\n\n为了让 Claude Code 能真正胜任长时间运行的任务，该版本一次性推出了四个实用工具：\n\n1. **Push Notifications (移动端推送)**：长任务完成后推送到手机，释放开发者的等待时间。\n2. **Session Recap (自动总结上下文)**：当 Session 中断几小时后回归，Claude 会自动总结“上次我们进行到了哪里”（即使禁用了 telemetry 也能使用）。\n3. **`/focus` (独立专注模式)**：将专注模式从冗余的设置中剥离出来，进行独立管理。\n4. **`/tui` (终端全屏无闪烁)**：提供全屏模式，终端渲染不再闪烁，且无需重启。\n\n### 2. 多 Agent 一等公民化 (v2.1.111)\n\n这是 Claude Code 首次将多 Agent 协同原生做进命令行中。\n\n- **核心命令 `/ultrareview`**：可以在云端并发启动多个 Reviewer Agent，同时评审同一个分支或 PR。\n- **架构差异**：对标 Cursor Background Agents 和 Devin 的纯云端方案，Claude Code 刻意保留了 CLI 的开放性，将编排权交给了用户。\n- **PowerShell Tool**：Windows 用户终于摆脱了必须安装 WSL 才能使用 Bash 工具的限制。\n- **Plan 命名优化**：Plan 文件不再使用随机词命名，而是根据 prompt 意图命名（例如 `fix-auth-race-snug-otter`），极大方便了使用 `grep` 进行回溯和历史查找。\n\n### 3. 稳定性与速度优化 (v2.1.113 & v2.1.116)\n\n长任务开发中最怕的就是子任务卡死导致整个流程崩溃，这两个版本主要解决此类痛点：\n\n- **原生二进制启动 (v2.1.113)**：CLI 不再跑打包的 JavaScript，而是直接 spawn 原生 Claude Code 二进制文件，**冷启动速度显著变快**。\n- **Subagent 超时保护 (v2.1.113)**：增加了 10 分钟的硬超时机制。挂死的子任务不再会拖垮整条主任务链。\n- **`/resume` 提速 (v2.1.116)**：针对 40MB 以上的大 Session 做了优化，速度提升 **67%**，从秒级降至亚秒级。\n\n### 4. 架构里程碑：Agent 自包含化 (v2.1.117)\n\n这是架构意义最大的一批更新，实现了 Agent 的“可移植单体化”：\n\n1. **Hooks 生效范围扩大**：Agent `frontmatter hooks` 在 `main-thread`（主线程）模式下也开始生效。\n2. **MCP 工具集成了**：Agent `frontmatter` 里的 MCP Servers 现在可以被 `main-thread session` 读取，这意味着你写的 Agent 可以自带 MCP 工具集。\n3. **独立进程**：Fork 出的 subagents 会跑在独立的进程里。\n\n**意义**：Agent 从“依赖配置”变成了真正的**可移植单元**。如果将一个 Agent 文件发给同事，对方下载后，Hooks 能跑起来，MCP 工具能自动装上，独立进程也能稳定运行。\n\n---\n\n## 🎯 总结：三条清晰的架构主线\n\n从这 6 个版本的更新中，可以抽象出 Claude Code Harness 演进的三条主线：\n\n1. **长任务响应式**：`Monitor` -> `Push Notifications` -> `Session Recap`\n2. **多 Agent 编排**：`/ultrareview` -> `Forked subagents` -> 超时保护\n3. **Agent 自包含化**：`frontmatter hooks` -> `frontmatter MCP` -> 环境隔离\n\n**最终方向**：Claude Code 正在从一个“交互式编程助手”演变成一个 **Agent 编排器**。它在向云端复杂任务靠拢的同时，保留了 CLI 的开放性和本地控制权。\n\n---\n\n## 💡 给不同用户的行动建议\n\n- **日常编码用户**：重点关注 `/resume` 提速和原生二进制启动，冷启动变快非常实用。\n- **跑长任务的用户**：`Monitor` 和 `Push Notifications` 是必装的效率利器。\n- **做 Agent 或 MCP 开发的用户**：v2.1.117 的 `frontmatter` 下沉会直接改变你定义和分发 Agent 的方式，需重点研究。\n- **Windows 用户**：终于可以使用原生的 `PowerShell Tool` 了。\n\n*(本文数据与更新细节参考自 Anthropic 官方 GitHub Releases、官方 Changelog 以及相关社区深度指南。)*"
    },
    {
      "id": "note-11",
      "title": "claude code 命令大全",
      "fileTitle": "claude code 命令大全",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/ClaudeCode",
        "AI记录/已核对"
      ],
      "summary": "本页整理 Claude Code 常用 CLI、交互式 slash commands、扩展命令和配置入口。命令可用性会受平台、账号计划、企业策略、安装方式和当前版本影响；最终以 /help、/commands、/config、官方 commands 文档和当前 CLI 输出为准。 CLI 启动命令 命令 用途 说明 claude 启动交互式 REPL 在当前...",
      "wordCount": 1535,
      "sourceFile": "mydata/我的数据/AI记录/内容/claude code 命令大全.md",
      "markdown": "# claude code 命令大全\n\n本页整理 Claude Code 常用 CLI、交互式 slash commands、扩展命令和配置入口。命令可用性会受平台、账号计划、企业策略、安装方式和当前版本影响；最终以 `/help`、`/commands`、`/config`、官方 commands 文档和当前 CLI 输出为准。\n\n## CLI 启动命令\n\n| 命令 | 用途 | 说明 |\n|---|---|---|\n| `claude` | 启动交互式 REPL | 在当前目录打开 Claude Code 会话。 |\n| `claude \"query\"` | 带初始提示启动 REPL | 适合直接描述任务后进入交互。 |\n| `claude -p \"query\"` | print / SDK 模式 | 执行一次查询后退出，适合脚本、CI、管道。 |\n| `cat file | claude -p \"query\"` | 处理管道输入 | Unix 风格组合用法。 |\n| `claude -c` | 继续最近会话 | 也可配合 `-p` 用于非交互继续。 |\n| `claude -r \"<session-id>\"` | 按 session ID 恢复会话 | 适合恢复指定历史任务。 |\n| `claude update` | 手动更新 | 自动更新之外的手动入口。 |\n| `claude mcp` | 配置 MCP server | 也可在会话内用 `/mcp` 管理。 |\n| `claude plugin ...` | 管理 plugins | 安装、校验、更新、清理、打 tag。 |\n| `claude ultrareview [target]` | 非交互深度审查 | 2026-04 新增，用于 CI 或脚本调用 `/ultrareview` 能力。 |\n\n## 会话与上下文\n\n| 命令 | 用途 |\n|---|---|\n| `/clear` | 开始新对话，旧会话仍可在 `/resume` 中找回。 |\n| `/compact [instructions]` | 总结当前上下文，释放 context。 |\n| `/resume [session]` | 恢复历史会话，别名 `/continue`。 |\n| `/branch [name]` | 从当前点创建会话分支，别名 `/fork`。 |\n| `/rewind` | 回到 checkpoint，可恢复代码、对话或生成摘要。 |\n| `/recap` | 生成当前会话一行摘要。 |\n| `/rename [name]` | 重命名当前会话。 |\n| `/copy [N]` | 复制最近一次或第 N 次 assistant 回复。 |\n| `/export [filename]` | 导出当前对话文本。 |\n\n## 模型、模式与界面\n\n| 命令 | 用途 |\n|---|---|\n| `/model [model]` | 切换模型；支持 effort 的模型可在选择器中调节。 |\n| `/effort [level\\|auto]` | 设置 reasoning effort，如 `low`、`medium`、`high`、`xhigh`、`max`。 |\n| `/plan [description]` | 直接进入 plan mode。 |\n| `/fast [on\\|off]` | 切换 fast mode。 |\n| `/focus` | 在 fullscreen renderer 中只显示最新提示、工具摘要和最终回复。 |\n| `/tui [default\\|fullscreen]` | 切换终端 UI renderer。 |\n| `/theme` | 切换主题，包含 auto、色盲友好、ANSI 和 custom themes。 |\n| `/color [color\\|default]` | 设置当前 prompt bar 颜色。 |\n| `/voice [hold\\|tap\\|off]` | 语音输入。 |\n\n## 配置、状态与诊断\n\n| 命令 | 用途 |\n|---|---|\n| `/config` | 打开设置界面，别名 `/settings`。 |\n| `/status` | 查看版本、模型、账号、连接状态。 |\n| `/usage` | 查看 session cost、计划用量和活动统计，`/cost`、`/stats` 为别名。 |\n| `/doctor` | 诊断安装、MCP、配置等问题；部分问题可按 `f` 让 Claude 修复。 |\n| `/context` | 可视化当前 context 使用情况和优化建议。 |\n| `/heapdump` | 输出 heap snapshot，用于诊断内存问题。 |\n| `/debug [description]` | 开启/分析 debug logging。 |\n| `/terminal-setup` | 配置终端快捷键，例如 Shift+Enter。 |\n| `/keybindings` | 打开或创建按键配置文件。 |\n\n## 文件、目录与权限\n\n| 命令 | 用途 |\n|---|---|\n| `/add-dir <path>` | 当前会话增加可访问工作目录。 |\n| `/permissions` | 管理 allow / ask / deny 工具权限，别名 `/allowed-tools`。 |\n| `/sandbox` | 切换 sandbox mode。 |\n| `/diff` | 打开交互式 diff viewer，查看未提交变更和按 turn 划分的 diff。 |\n| `/init` | 初始化项目 `CLAUDE.md`；新版本可走交互式流程。 |\n| `/memory` | 编辑 `CLAUDE.md` memory files，管理 auto-memory。 |\n\n## Agents、Skills、Hooks、Plugins\n\n| 命令 | 用途 |\n|---|---|\n| `/agents` | 管理自定义 subagents。 |\n| `/skills` | 列出可用 skills，可按 token count 排序。 |\n| `/hooks` | 查看或配置 hook 事件。 |\n| `/plugin` | 管理 plugins。 |\n| `/reload-plugins` | 重新加载 active plugins，不重启会话。 |\n| `/statusline` | 配置底部 status line。 |\n| `/output-style` | 切换或创建 output style。 |\n\n## MCP 与外部连接\n\n| 命令 | 用途 |\n|---|---|\n| `/mcp` | 管理 MCP server 连接和 OAuth。 |\n| `/ide` | 管理 IDE 集成状态。 |\n| `/desktop` | 在 Claude Code Desktop app 中继续当前会话，别名 `/app`。 |\n| `/remote-control` | 允许 claude.ai 远程控制当前 session，别名 `/rc`。 |\n| `/teleport` | 把 Web 会话拉回本地终端，别名 `/tp`。 |\n| `/remote-env` | 配置 Web sessions 的默认远程环境。 |\n| `/web-setup` | 使用本地 `gh` 凭据连接 GitHub 到 Claude Code Web。 |\n| `/chrome` | 配置 Claude in Chrome。 |\n\n## Review、PR 与自动化\n\n| 命令 | 用途 |\n|---|---|\n| `/review [PR]` | 在本地会话 review PR。 |\n| `/security-review` | 审查当前分支 pending changes 的安全风险。 |\n| `/ultrareview [PR]` | 在云端 sandbox 用多 agent 深度审查。 |\n| `/autofix-pr [prompt]` | 启动 Web session 监听当前 PR，处理 CI 或 review comments。 |\n| `/install-github-app` | 为仓库安装 Claude GitHub Actions app。 |\n| `/install-slack-app` | 安装 Claude Slack app。 |\n| `/schedule [description]` | 创建、更新、列出或运行 routines，别名 `/routines`。 |\n| `/loop [interval] [prompt]` | 周期性运行提示，别名 `/proactive`。 |\n| `/tasks` | 查看和管理后台任务，别名 `/bashes`。 |\n\n## Bundled Skills 类命令\n\n官方 commands 表中标记为 Skill 的命令，本质是随 Claude Code 打包的 prompt-based skill。\n\n| 命令 | 用途 |\n|---|---|\n| `/batch <instruction>` | 将大型改动拆成 5 到 30 个独立单元，使用 worktree 和并行 agent 处理。 |\n| `/debug [description]` | 调试当前 session 或安装问题。 |\n| `/simplify [focus]` | 审查最近改动的复用、质量和效率问题，并尝试修正。 |\n| `/claude-api [migrate\\|managed-agents-onboard]` | 加载 Claude API 参考、迁移模型参数或引导 Managed Agents。 |\n| `/fewer-permission-prompts` | 分析 transcript，生成更少权限弹窗的 allowlist。 |\n| `/loop [interval] [prompt]` | 反复执行提示或维护检查。 |\n\n## 自定义命令与 Skills\n\n旧式自定义 slash command 通常放在：\n\n```text\n.claude/commands/<command>.md\n~/.claude/commands/<command>.md\n```\n\n新式推荐用 skills：\n\n```text\n.claude/skills/<skill-name>/SKILL.md\n~/.claude/skills/<skill-name>/SKILL.md\n```\n\n二者都可形成 `/name` 命令。若 skill 与 command 同名，官方 skills 文档说明 skill 优先。\n\n## 常用环境变量和设置\n\n| 名称 | 用途 |\n|---|---|\n| `ANTHROPIC_API_KEY` | API key。 |\n| `CLAUDE_CODE_USE_BEDROCK=1` | 使用 Amazon Bedrock。 |\n| `CLAUDE_CODE_USE_VERTEX=1` | 使用 Google Vertex AI。 |\n| `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | 启用 PowerShell tool。 |\n| `CLAUDE_CODE_FORK_SUBAGENT=1` | 启用 forked subagent 相关能力。 |\n| `CLAUDE_CODE_HIDE_CWD=1` | 启动 logo 隐藏当前工作目录。 |\n| `DISABLE_AUTOUPDATER=1` | 禁用自动更新。 |\n| `DISABLE_UPDATES=1` | 更严格阻断所有更新路径。 |\n| `BASH_DEFAULT_TIMEOUT_MS` | 调整 Bash 默认超时。 |\n| `CLAUDE_BASH_NO_LOGIN=1` | Bash tool 跳过 login shell。 |\n| `CLAUDE_CODE_SHELL_PREFIX` | 包裹 Claude 和用户 shell 命令。 |\n| `CLAUDE_CODE_PERFORCE_MODE` | Perforce 只读文件编辑保护。 |\n\n## 权限与安全提示\n\n- `/permissions` 只解决“允许什么工具”，不等于保证命令无风险。\n- `/sandbox`、auto mode、accept edits mode 都要按项目风险配置。\n- hooks、skills、plugins 可能执行脚本，安装和启用前要审查。\n- `/rewind` 不能回滚 Bash 命令造成的文件变化。\n- 对删除、移动、覆盖、批量修改，要求 Claude 先列路径和影响范围。\n\n## 来源\n\n- [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference)\n- [Claude Code commands](https://code.claude.com/docs/en/commands)\n- [Claude Code settings](https://code.claude.com/docs/en/settings)\n- [Claude Code skills](https://code.claude.com/docs/en/skills)\n- [Claude Code hooks](https://code.claude.com/docs/en/hooks)\n- [Claude Code plugins reference](https://code.claude.com/docs/en/plugins-reference)\n- [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)"
    },
    {
      "id": "note-12",
      "title": "claude code 更新日志",
      "fileTitle": "claude code 更新日志",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/ClaudeCode",
        "AI记录/已核对"
      ],
      "summary": "本页只整理 2025 06 01 之后 Claude Code 的新功能、功能增强、配置能力和使用方式变化；不记录普通 bug fix。版本日期以 npm @anthropic ai/claude code 发布时间推定，功能条目以官方 changelog 为主，必要时对照官方文档页面。 2026 04 Windows 与 Shell Git for Win...",
      "wordCount": 2421,
      "sourceFile": "mydata/我的数据/AI记录/内容/claude code 更新日志.md",
      "markdown": "# claude code 更新日志\n\n本页只整理 2025-06-01 之后 Claude Code 的新功能、功能增强、配置能力和使用方式变化；不记录普通 bug fix。版本日期以 npm `@anthropic-ai/claude-code` 发布时间推定，功能条目以官方 changelog 为主，必要时对照官方文档页面。\n\n## 2026-04\n\n### Windows 与 Shell\n\n- Git for Windows 不再是硬性前置条件；没有 Git Bash 时可使用 PowerShell 作为 shell tool。\n- PowerShell tool 可参与 permission mode 的自动批准逻辑，逐步接近 Bash tool 使用体验。\n- `CLAUDE_CODE_USE_POWERSHELL_TOOL` 可用于启用或控制 PowerShell tool。\n\n### Review 与 CI 自动化\n\n- 新增 `claude ultrareview [target]`，可在非交互场景运行 `/ultrareview`，适合 CI 或脚本调用。\n- `/ultrareview` 支持云端 sandbox、多 agent 深度审查，并可 review 当前分支或指定 PR。\n- `/autofix-pr` 可启动 Web session 监听 PR 的 CI 和 review comments，并推送修复。\n\n### Skills、Plugins、Agents\n\n- Skills 可用 `${CLAUDE_EFFORT}` 读取当前 effort level。\n- `/skills` 增加搜索、按 token count 排序等交互增强。\n- `claude plugin prune` 可清理孤立的 auto-installed plugin dependencies。\n- `plugin uninstall --prune` 支持级联清理。\n- `claude plugin tag` 可为 plugin 创建带版本校验的 release git tag。\n- `claude plugin validate` 扩展 schema 字段支持。\n- plugin 可提供 themes。\n- background monitor 可作为 plugin manifest 顶层能力，在 session start 或 skill invoke 时自动启用。\n\n### Hooks\n\n- `PostToolUse` 和 `PostToolUseFailure` hook 输入增加 `duration_ms`。\n- `PostToolUse` hooks 可通过 `hookSpecificOutput.updatedToolOutput` 替换所有工具输出。\n- hooks 可直接调用 MCP tools：`type: \"mcp_tool\"`。\n- 新增 `PreCompact` hook，可在压缩前阻止 compaction。\n- agent frontmatter 中的 `hooks:` 在 `--agent` main-thread agent session 中也可触发。\n\n### MCP\n\n- MCP server config 新增 `alwaysLoad`，可让某 server 的全部 tools 跳过 tool-search deferral。\n- MCP server 启动遇到瞬时错误时可自动重试。\n- claude.ai connectors 去重并改善授权状态展示。\n- 多 MCP server 连接更并行化，提升启动速度。\n\n### UI、会话与远程控制\n\n- `/tui` 可在当前会话中切换 terminal UI renderer。\n- `/focus` 分离为独立命令，用于 fullscreen 下的聚焦视图。\n- `/recap` 和 away summary 提供返回会话时的上下文摘要。\n- `/resume` 对大 session 更快，并支持按 PR URL 查找创建该 PR 的 session。\n- `/model` picker 更好地展示 effort 与项目/managed settings pin。\n- `/theme` 增加 auto match terminal 和 custom themes。\n- 支持 vim visual mode / visual-line mode。\n\n### 企业、云平台与观测\n\n- Bedrock 新增 `ANTHROPIC_BEDROCK_SERVICE_TIER`。\n- Vertex AI 新增 X.509 certificate-based Workload Identity Federation。\n- 新增 OS CA certificate store trust，方便企业 TLS 代理。\n- OpenTelemetry 增加多类事件和属性，如 `claude_code.at_mention`、`stop_reason`、effort、tool IDs、token/cost usage 等。\n- status line JSON 增加 `effort.level`、`thinking.enabled`、`workspace.git_worktree` 等字段。\n\n## 2026-03\n\n- auto mode 扩展为重要权限体验方向，通过策略和 classifier 减少长任务中的确认中断。\n- sandbox 与 auto mode 增加更多 allow / deny / network 相关配置。\n- `/permissions` 和 recent auto mode denials 更适合用来回看、调整权限策略。\n- Remote Control、push notification、session recovery、scheduled tasks 等长任务体验继续增强。\n\n## 2026-02\n\n- 2.1 系列继续强化 agent / skill / plugin / hook 的组合能力。\n- output styles、themes、status line、fullscreen rendering 逐步完善。\n- SDK/headless 场景增强 trace、resume、subprocess cleanup 和非交互执行控制。\n- 企业 managed settings 对 marketplace、plugin、MCP 和更新策略的控制更细。\n\n## 2026-01\n\n- 2.1 系列发布，延续 2.0 的 native、plugins、skills、Agent SDK、Web/Remote Control 方向。\n- effort level 和模型选择能力继续增强。\n- 远程会话、会话恢复、项目设置、managed settings 的优先级和可观测性继续补齐。\n\n## 2025-12\n\n- prompt-based stop hooks、hook timeout、hook 模型选择等 hook 高级用法增强。\n- Plugins 支持 output styles 的分享和安装。\n- 安全 git 命令的自动许可范围增加。\n- VS Code / IDE UI、font、文件搜索、配置项继续增强。\n\n## 2025-11\n\n### Output Styles\n\n- output styles 在社区反馈后恢复，继续作为可用的行为定制机制。\n- `keep-coding-instructions` frontmatter 进入 output styles / plugin output styles 体系。\n\n### Hooks\n\n- Notification hook 增加 matcher values。\n- 新增 prompt-based stop hooks。\n- SDK 支持 hook custom timeouts。\n\n### SDK 与自动化\n\n- `CLAUDE_CODE_EXIT_AFTER_STOP_DELAY` 可让 SDK mode 在空闲后自动退出，适合自动化脚本。\n- 企业公告 `companyAnnouncements` 可在 startup 展示。\n\n### IDE 与平台\n\n- VS Code extension 支持配置新会话初始 permission mode。\n- VS Code extension 支持 `respectGitIgnore`，决定文件搜索是否包含 `.gitignored` 文件。\n- Vertex 支持 Web Search on supported models。\n\n## 2025-10\n\n### Plugin System\n\n- Plugin System 正式发布，可从 marketplaces 安装插件。\n- `/plugin install`、`/plugin enable/disable`、`/plugin marketplace`、`/plugin validate` 成为主要管理入口。\n- plugin 可携带 commands、agents、hooks、MCP servers、skills、themes、output styles 等能力。\n- 支持 repository-level plugin configuration，例如 `extraKnownMarketplaces`。\n- 支持 git-based plugins 和 marketplaces 的 branch / tag fragment，例如 `owner/repo#branch`。\n\n### Skills\n\n- Claude Skills 进入 Claude Code，可用 `SKILL.md` 定义可复用流程和知识包。\n- custom commands 与 skills 模型合并；旧 `.claude/commands/` 仍可用，新能力优先走 `.claude/skills/`。\n- skills 支持 frontmatter 控制 invocation、tools、model、effort、fork context、hooks、paths、shell 等。\n\n### Agent SDK 与模型\n\n- Claude Code SDK 更名为 Claude Agent SDK。\n- 移除 legacy SDK entrypoint，迁移到 `@anthropic-ai/claude-agent-sdk`。\n- 新增 `--max-budget-usd` 等预算控制。\n- 新增 Haiku 4.5 模型选项；Haiku 4.5 可在 plan mode 使用 Sonnet、执行阶段使用 Haiku。\n\n### Subagents 与 Plan Mode\n\n- 新增 Explore subagent，用于高效搜索代码库并节省主上下文。\n- Plan mode 引入新的 Plan subagent。\n- Claude 可选择 resume subagents。\n- Claude 可动态选择 subagent 使用的模型。\n- 交互式 question tool 增强 plan mode 中的提问能力。\n\n### MCP 与权限\n\n- MCP tool responses 支持 `structuredContent`。\n- 可通过 @mention 或 `/mcp` 启用/禁用 MCP servers。\n- 企业 managed MCP allowlist / denylist。\n- PreToolUse hooks 可修改 tool inputs。\n- 长时间 Bash 命令可自动后台运行，避免被直接杀掉；可用 `BASH_DEFAULT_TIMEOUT_MS` 自定义。\n\n### Web 与 IDE\n\n- Claude Code Web 支持 Web -> CLI teleport。\n- 新 native VS Code extension。\n- `/usage` 可查看 plan limits。\n- IDE 支持 thinking toggle、drag-and-drop files/folders、Open in Terminal 等增强。\n\n## 2025-09\n\n- 2.0.0 发布，新 native VS Code extension、`/usage`、Claude Agent SDK、动态 subagents flag 等成为重要节点。\n- `--from-pr` 和 PR/session 相关流程逐步增强。\n- Bash permission rules 支持 output redirections。\n- 新增 SlashCommand tool，使 Claude 可调用用户 slash commands。\n- MCP 支持 dynamic headers via `headersHelper`。\n- `Ctrl-R` history search 类似 shell 历史搜索。\n- `/terminal-setup` 支持 WezTerm。\n- SDK 增加 partial message streaming：`--include-partial-messages`。\n- Session transcript / Ctrl+R 显示 assistant message 使用的模型。\n- Hooks 新增 `SessionEnd` systemMessage 支持。\n- `spinnerTipsEnabled` 可关闭 spinner tips。\n- Bedrock / Vertex 支持 `/context`。\n- OpenTelemetry HTTP exporter 支持 mTLS。\n\n## 2025-08\n\n### Output Styles\n\n- 发布 output styles。\n- 内置 Explanatory 和 Learning 风格。\n- `/output-style` 可切换或创建自定义风格。\n\n### Status Line\n\n- 新增 `/statusline`，可自定义底部状态行。\n- status line input 增加 session cost、`exceeds_200k_tokens` 等字段。\n\n### Background Commands\n\n- `Ctrl-b` 可让 Bash 命令后台运行，适合 dev server、tail logs 等长任务。\n\n### SDK\n\n- SDK 增加 session support、permission denial tracking、request cancellation、custom tools callbacks、additionalDirectories、UUID support、replay user messages 等能力。\n\n### MCP 与配置\n\n- 支持多个 MCP config 文件：`--mcp-config file1.json file2.json`。\n- MCP OAuth 可用 `Esc` 取消。\n- 设置文件变更可即时生效，无需重启。\n- `ANTHROPIC_DEFAULT_SONNET_MODEL`、`ANTHROPIC_DEFAULT_OPUS_MODEL` 用于控制模型 alias。\n\n### Windows 与平台\n\n- Windows 增加图片剪贴板快捷键、权限匹配、文件搜索、subagent 等体验增强。\n- Linux 增加 Alpine / musl 支持。\n- 支持 `NO_PROXY`。\n\n### 其他\n\n- `/context` 帮助用户自查 context 问题。\n- `/memory` 可直接编辑所有 imported memory files。\n- `/todos` 可列出当前 todo items。\n- `@` mention 支持带空格路径、隐藏文件、`~/.claude/*`、agent / output style / slash command 编辑建议。\n\n## 2025-07\n\n### Native Windows\n\n- 支持 native Windows，早期版本要求 Git for Windows。\n- Windows 逐步支持 mode switching、plan mode、OAuth、文件搜索、custom slash commands、subagent 等。\n\n### Custom Subagents\n\n- 新增自定义 subagents，可通过 `/agents` 创建和管理。\n- 支持 `@<custom-agent>` typeahead 调用。\n- agent 可指定模型。\n\n### Hooks\n\n- Hooks 正式发布。\n- 支持 Stop / SubagentStop 拆分、hook timeout、hook input 中的 `hook_event_name`。\n- 新增 `UserPromptSubmit` hook。\n- 新增 `PreCompact` hook。\n- hook output 可包含 `systemMessage`。\n- hooks 暴露 PermissionDecision，包括 `ask`。\n- hooks 增加 `CLAUDE_PROJECT_DIR`，便于引用项目脚本。\n\n### Custom Slash Commands\n\n- 支持 command frontmatter `argument-hint`。\n- 支持 slash command 指定模型。\n- 支持 bash output、`@` mention files、thinking keywords。\n- 子目录命名空间恢复，例如 `.claude/commands/frontend/component.md` 对应 `/frontend:component`。\n\n### MCP\n\n- 支持 MCP server instructions。\n- MCP resource_link tool results。\n- MCP tool annotations 和 titles 在 `/mcp` view 展示。\n- MCP server health status 在 `claude mcp list` 更清晰。\n- MCP server configuration 支持变量展开。\n\n### SDK 与自动化\n\n- SDK 支持 tool confirmation callback、spawned process env、error logging。\n- `--system-prompt-file` 可在 print mode 覆盖 system prompt。\n- `--append-system-prompt` 可用于 interactive mode。\n- `--settings` 可从 JSON 文件加载设置。\n- `CLAUDE_CODE_AUTO_CONNECT_IDE=false` 可禁用 IDE auto-connection。\n- `CLAUDE_CODE_SHELL_PREFIX` 可包装 shell 命令。\n\n### 其他命令\n\n- `/export` 可导出对话。\n- `/add-dir` 支持 typeahead 和 `~` expansion。\n- prompt input undo。\n- Search / Grep tool 重设计。\n- Bash tool 增加基于最近输出的 progress messages。\n\n## 2025-06\n\n### SDK\n\n- 发布 TypeScript SDK：`@anthropic-ai/claude-code`。\n- 发布 Python SDK：`claude-code-sdk`。\n- `total_cost` 字段改名为 `total_cost_usd`。\n\n### MCP\n\n- 支持 Streamable HTTP MCP servers。\n- Remote MCP servers（SSE 和 HTTP）支持 OAuth。\n- MCP resources 可通过 `@` mention。\n- 支持 MCP OAuth Authorization Server discovery。\n- `/mcp` 输出和 server list UI 增强。\n- MCP SSE 断开后自动重连。\n\n### 会话与目录\n\n- 新增 `/resume` slash command，可在 Claude Code 内切换会话。\n- 新增 `--add-dir` CLI 参数，指定额外工作目录。\n- 新增 streaming input 支持，不再强制要求 `-p`。\n- `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` 可冻结 Bash 命令工作目录。\n- 支持 `XDG_CONFIG_HOME` 配置目录。\n\n### 交互与渲染\n\n- Markdown table 支持。\n- 支持非英语触发 thinking。\n- CJK 光标导航与渲染增强。\n- Ctrl-r mode 增加 timestamps。\n- prompt input undo 功能。\n\n### 账号与认证\n\n- Claude Code 可使用 Claude Pro 订阅。\n- 新增 `/upgrade`，方便切换 Claude Max plans。\n- API key、Bedrock、Vertex、external auth token 的认证 UI 增强。\n- 新增 `forceLoginMethod` 设置，可绕过登录方式选择页。\n\n### OpenTelemetry\n\n- 增加 `terminal.type`、`language`、Active Time 等 telemetry 属性。\n\n## 相关文档\n\n- [[AI记录/内容/claude code|claude code]]\n- [[AI记录/内容/claude code 命令大全|claude code 命令大全]]\n\n## 来源\n\n- [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)\n- [npm @anthropic-ai/claude-code 发布时间](https://www.npmjs.com/package/@anthropic-ai/claude-code)\n- [Claude Code commands](https://code.claude.com/docs/en/commands)\n- [Claude Code skills](https://code.claude.com/docs/en/skills)\n- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)\n- [Claude Code hooks](https://code.claude.com/docs/en/hooks)\n- [Claude Code plugins reference](https://code.claude.com/docs/en/plugins-reference)\n- [Claude Code status line](https://code.claude.com/docs/en/statusline)\n- [Claude Code checkpointing](https://code.claude.com/docs/en/checkpointing)\n- [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)"
    },
    {
      "id": "note-13",
      "title": "claude code",
      "fileTitle": "claude code",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/已核对"
      ],
      "summary": "Claude Code 是 Anthropic 的 agentic coding tool。它以终端为核心入口，也可接入 IDE、桌面端、Web、GitHub/CI 和 SDK 自动化场景，用自然语言驱动代码阅读、文件编辑、命令执行、测试验证、PR 审查和外部工具调用。 [!info] 更新范围 本页重点整理 Claude Code 在 2025 06 01...",
      "wordCount": 2130,
      "sourceFile": "mydata/我的数据/AI记录/内容/claude code.md",
      "markdown": "# claude code\n\nClaude Code 是 Anthropic 的 agentic coding tool。它以终端为核心入口，也可接入 IDE、桌面端、Web、GitHub/CI 和 SDK 自动化场景，用自然语言驱动代码阅读、文件编辑、命令执行、测试验证、PR 审查和外部工具调用。\n\n> [!info] 更新范围\n> 本页重点整理 Claude Code 在 2025-06-01 之后形成或显著增强的新功能。Bug 修复类变更不纳入更新日志，除非它改变了功能边界或使用方式。\n\n## 定位\n\n- 类型：AI coding agent / terminal agent / IDE assistant。\n- 主要界面：CLI、VS Code、JetBrains、Claude Code Desktop、Claude Code on the web、GitHub Actions、Agent SDK。\n- 核心能力：读代码、跨文件修改、运行命令、写测试、做 code review、创建提交/PR、接入 MCP、使用项目规则、使用 hooks / skills / subagents / plugins 扩展工作流。\n- 项目规则入口：`CLAUDE.md`、`.claude/settings.json`、`.claude/skills/`、`.claude/agents/`、hooks、plugins。\n\n## 适合场景\n\n- 大型代码库理解：梳理模块、调用链、数据流、历史上下文。\n- 多文件功能实现：先规划，再修改代码、补测试、运行验证。\n- 修复失败测试、lint、构建、CI、merge conflict。\n- 本地或 CI 中做代码审查、安全审查、PR 评论处理。\n- 需要接入外部上下文：MCP、GitHub、Slack、Jira、Figma、Google Drive、自定义内部工具。\n- 需要把重复流程固化成 skills、commands、hooks 或 plugins。\n\n## 不适合场景\n\n- 没有明确边界的“随便优化一下”。\n- 未经确认的删除、覆盖、重命名、批量修改。\n- 涉及真实生产权限、敏感数据、密钥或不可逆外部操作，但没有明确审批流程。\n- 只需要纯问答且不允许读取项目文件的场景。\n\n## 安装入口\n\n官方文档列出多种安装方式，常见入口包括：\n\n```text\nnpm install -g @anthropic-ai/claude-code\nclaude\n```\n\n较新的官方快速开始也提供 native install：\n\n```text\n# macOS / Linux / WSL\ncurl -fsSL claude.ai/install.sh | bash\n\n# Windows PowerShell\nirm https://claude.ai/install.ps1 | iex\n```\n\nWindows 相关变化：\n\n- 2025-07 起支持 native Windows，但早期要求 Git for Windows。\n- 2026-04 起官方 changelog 说明 Git for Windows 不再是硬性要求；缺失时 Claude Code 可使用 PowerShell 作为 shell tool。\n- PowerShell tool 与 Bash tool 的权限规则逐步接近，适合 Windows 原生工作流。\n\n## 核心扩展体系\n\n### `CLAUDE.md`\n\n`CLAUDE.md` 是项目级长期规则入口，适合写：\n\n- 架构约定。\n- 编码规范。\n- 测试命令。\n- 提交和 review checklist。\n- 项目内常见路径、术语、边界。\n\n不要把大量过程性 playbook 全塞进 `CLAUDE.md`。如果某段内容像“步骤流程”，更适合拆到 skill；如果是事件触发的自动动作，更适合 hooks；如果是团队可分发能力，更适合 plugin。\n\n### Skills\n\nSkills 是 2025-10 之后 Claude Code 生态的重点能力。一个 skill 是一个目录，核心入口为 `SKILL.md`，可附带模板、示例、脚本和参考资料。\n\n常见路径：\n\n- 个人：`~/.claude/skills/<skill-name>/SKILL.md`\n- 项目：`.claude/skills/<skill-name>/SKILL.md`\n- 插件：`<plugin>/skills/<skill-name>/SKILL.md`\n\n适合放：\n\n- 重复执行的工作流程。\n- 团队规范化操作。\n- 特定技术栈 playbook。\n- 需要按需加载的大段参考资料。\n\n关键点：\n\n- skill 可以由用户通过 `/skill-name` 直接调用，也可以让 Claude 根据描述自动调用。\n- `disable-model-invocation: true` 可阻止 Claude 自动触发，只允许用户手动调用。\n- `context: fork` 可让 skill 在 forked subagent context 中运行。\n- custom commands 已被合并到 skills 模型中；旧的 `.claude/commands/` 仍可用，但新建流程优先考虑 skills。\n\n### Subagents\n\nSubagents 是专门任务代理，拥有独立上下文窗口、专用提示词和工具权限。适合把“研究、审查、迁移、测试补全、文档梳理”等任务从主对话中隔离出去。\n\n常见路径：\n\n- 个人：`~/.claude/agents/`\n- 项目：`.claude/agents/`\n\n适合场景：\n\n- 让 explorer 类代理读取大量上下文，主线程只接收结论。\n- 让 reviewer 类代理独立审查 diff。\n- 给某类任务固定模型、工具和限制。\n- 在大型任务中减少主线程上下文污染。\n\n2025-07 之后的重要增强包括：自定义 subagents、`@agent` typeahead、agent model customization、Plan/Explore subagent、动态选择 subagent 模型、运行中 subagent 管理界面。\n\n### Hooks\n\nHooks 是事件驱动的自动化脚本。它们会在 Claude Code 生命周期中的特定事件触发，例如用户提交提示、工具调用前后、停止响应、压缩前、会话开始/结束等。\n\n适合放：\n\n- 工具调用前的权限或路径检查。\n- 工具调用后的格式化、日志、审计。\n- session start 时注入动态上下文。\n- stop / subagent stop 时做收尾检查。\n- pre-compact 时阻止关键上下文丢失。\n\n风险控制：\n\n- hooks 可以执行 shell 命令，必须像 CI 脚本一样审查。\n- 不要在 hook 中放未经确认的删除、移动、覆盖逻辑。\n- 尽量使用明确路径、最小权限和可观测输出。\n\n### Plugins\n\nPlugins 是 2025-10 发布的打包分发机制，可把 commands、agents、skills、hooks、MCP servers、themes、output styles 等组合成一个可安装能力包。\n\n适合场景：\n\n- 团队共享统一 Claude Code 工作流。\n- 内部分发固定 tools / hooks / agents。\n- 将多项目通用能力版本化。\n- 建立 marketplace 或固定 allowlist。\n\n常用命令：\n\n- `/plugin`\n- `claude plugin install`\n- `claude plugin validate`\n- `claude plugin update`\n- `claude plugin prune`\n- `claude plugin tag`\n\n### MCP\n\nMCP 用来把 Claude Code 接到外部工具和上下文。2025-06 之后的增强重点包括：\n\n- Streamable HTTP MCP servers。\n- Remote MCP SSE / HTTP OAuth。\n- MCP resources `@` mention。\n- MCP server instructions。\n- 多配置文件：`--mcp-config file1.json file2.json`。\n- 动态 headers：`headersHelper`。\n- MCP `structuredContent`。\n- 企业 managed MCP allowlist / denylist。\n- MCP server `alwaysLoad`。\n\n### Output Styles\n\nOutput styles 可以改变 Claude Code 的系统提示，使它保持工具能力的同时，切换成不同协作风格。\n\n内置风格：\n\n- Default：默认工程任务风格。\n- Explanatory：在完成工程任务时穿插解释和洞察，适合学习代码库。\n- Learning：协作式学习，会让用户完成小块代码，并添加 `TODO(human)`。\n\n适合场景：\n\n- 学习陌生代码库。\n- 让 Claude 更偏教学、审查、架构解释。\n- 为非编码任务定制行为。\n\n### Status Line\n\nStatus line 类似终端 prompt，可在 Claude Code 底部显示模型、分支、目录、cost、context、git worktree 等信息。\n\n配置入口：\n\n- `/statusline`\n- `.claude/settings.json` 的 `statusLine`\n\n2025-08 之后 status line 不断增强，输入 JSON 中增加过 cost、`exceeds_200k_tokens`、`workspace.git_worktree`、effort / thinking 等字段。\n\n### Checkpointing\n\nCheckpointing 会自动跟踪 Claude 通过文件编辑工具做出的改动，支持 `/rewind` 或双击 `Esc` 回到历史点。\n\n可选动作包括：\n\n- 恢复代码和对话。\n- 只恢复对话。\n- 只恢复代码。\n- 从某点开始总结，释放上下文。\n\n限制：\n\n- Bash 命令造成的文件变化不在 checkpoint 跟踪范围内。\n- 外部工具或用户手动修改不在 checkpoint 跟踪范围内。\n- 不能替代 git。\n\n## 重要工作流\n\n### 读代码但不修改\n\n```text\n阅读这个仓库的认证模块，只总结请求流、关键文件和风险点。不要修改任何文件。\n```\n\n### 实现功能并验证\n\n```text\n为 auth 模块实现 refresh token rotation。先给计划，再修改代码，补测试，运行相关测试，最后总结变更和验证结果。\n```\n\n### 修复失败测试\n\n```text\n修复当前 failing test。先定位根因，再做最小修改，最后运行相关测试。不要改公共 API，除非你能证明必须改。\n```\n\n### 审查当前 diff\n\n```text\n审查当前 git diff，按严重程度列出 bug、回归风险、安全风险和缺失测试。只做 review，不修改代码。\n```\n\n### 使用 plan mode\n\n```text\n/plan 把支付模块迁移到新的 BillingClient。要求保留现有 API，先拆任务，不要直接改代码。\n```\n\n### 使用 subagent\n\n```text\n让一个 explorer subagent 阅读订单模块，只返回关键数据流和入口文件。主线程先不要改代码。\n```\n\n### 使用 hooks 的思路\n\n```text\n为这个项目设计一个 PostToolUse hook：当 Claude 修改 TypeScript 文件后自动运行 prettier。只给配置方案，不实际写入。\n```\n\n## 风险控制\n\n- 删除、覆盖、重命名、批量修改前，先要求 Claude 推演路径和影响范围。\n- 不要把密钥、cookie、token、个人数据写入 `CLAUDE.md`、skills、hooks 或长期记忆。\n- 对 hooks、plugins、第三方 skills 按“可执行代码”处理，安装前审查来源和内容。\n- 让 Claude 输出真实验证证据，而不是只说“完成”。\n- 使用 `/permissions`、sandbox、auto mode、allow/deny rules 时，优先按最小权限配置。\n- checkpointing 不能回滚 Bash 命令造成的变化，危险 shell 操作仍要人工确认。\n\n## 与其他工具的比较\n\n- 与 [[AI记录/内容/codex|codex]]：两者都是能操作代码库的 coding agent。Claude Code 生态重点包括 `CLAUDE.md`、skills、subagents、hooks、plugins、MCP、Web/Remote Control；Codex 更偏 OpenAI 模型和 Codex 工作流生态。\n- 与 [[AI记录/内容/kilo code|kilo code]]：Kilo Code 强调开源、多模型、多 IDE；Claude Code 更深绑定 Anthropic 模型、Claude.ai 账号、Claude Code Web 和官方扩展机制。\n- 与 [[AI记录/内容/trae|trae]]：Trae 更像 IDE 内 AI 编辑体验；Claude Code 更偏任务代理、终端闭环和自动化。\n- 与 [[AI记录/内容/serena|serena]]：Serena 可作为 MCP 增强 Claude Code 的语义代码定位。\n\n## 子文档\n\n- [[AI记录/内容/claude code 命令大全|Claude Code 命令大全]]\n- [[AI记录/内容/claude code 更新日志|Claude Code 更新日志]]\n\n## 使用判断\n\n如果任务需要“读仓库、改文件、运行命令、验证结果、保留可追溯过程”，Claude Code 是核心候选工具。若任务只需要简短问答或不可授权本地操作，应优先使用普通 Claude 对话或只读模式。\n\n## 来源\n\n- [Claude Code overview](https://code.claude.com/docs/en/overview)\n- [Claude Code quickstart](https://code.claude.com/docs/en/quickstart)\n- [Claude Code CLI reference](https://code.claude.com/docs/en/cli-reference)\n- [Claude Code commands](https://code.claude.com/docs/en/commands)\n- [Claude Code settings](https://code.claude.com/docs/en/settings)\n- [Claude Code skills](https://code.claude.com/docs/en/skills)\n- [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)\n- [Claude Code hooks](https://code.claude.com/docs/en/hooks)\n- [Claude Code plugins reference](https://code.claude.com/docs/en/plugins-reference)\n- [Claude Code status line](https://code.claude.com/docs/en/statusline)\n- [Claude Code checkpointing](https://code.claude.com/docs/en/checkpointing)\n- [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)\n- [Claude Code changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)\n- [npm @anthropic-ai/claude-code 发布时间](https://www.npmjs.com/package/@anthropic-ai/claude-code)"
    },
    {
      "id": "note-14",
      "title": "claude mem",
      "fileTitle": "claude mem",
      "categories": [
        "常用Plugin"
      ],
      "tags": [
        "AI记录/Plugin",
        "AI记录/记忆"
      ],
      "summary": "claude mem 记录为与 Claude 或 Claude Code 相关的记忆/上下文插件。具体功能应按实际插件来源核对。 可能用途 保存项目偏好。 保存常用命令。 保存团队约定。 保存长期上下文。 适合保存的信息 项目结构说明。 常用测试命令。 编码规范。 分支和发布流程。 非敏感的个人偏好。 不应保存的信息 API Key。 密码。 私人身份信息。...",
      "wordCount": 180,
      "sourceFile": "mydata/我的数据/AI记录/内容/claude mem.md",
      "markdown": "# claude mem\n\nclaude mem 记录为与 Claude 或 Claude Code 相关的记忆/上下文插件。具体功能应按实际插件来源核对。\n\n## 可能用途\n\n- 保存项目偏好。\n- 保存常用命令。\n- 保存团队约定。\n- 保存长期上下文。\n\n## 适合保存的信息\n\n- 项目结构说明。\n- 常用测试命令。\n- 编码规范。\n- 分支和发布流程。\n- 非敏感的个人偏好。\n\n## 不应保存的信息\n\n- API Key。\n- 密码。\n- 私人身份信息。\n- 内部敏感业务数据。\n- 临时猜测或未验证结论。\n\n## 维护建议\n\n记忆应带来源和更新时间。过期记忆比没有记忆更危险，因为它会让 Agent 坚定地执行错误假设。"
    },
    {
      "id": "note-15",
      "title": "code-review-graph",
      "fileTitle": "code-review-graph",
      "categories": [
        "常用MCP"
      ],
      "tags": [
        "AI记录/MCP",
        "AI记录/代码审查",
        "AI记录/待核对"
      ],
      "summary": "code review graph code review graph 需要区分两个公开候选：一个是 PyPI 上的 code review graph，另一个是社区页面中出现的 better code review graph。二者都围绕“为 AI code review 构建代码知识图谱/上下文图”展开，但维护者和具体实现可能不同。 定位 类型：代码库知...",
      "wordCount": 646,
      "sourceFile": "mydata/我的数据/AI记录/内容/code-review-graph.md",
      "markdown": "# code-review-graph\n\n`code-review-graph` 需要区分两个公开候选：一个是 PyPI 上的 `code-review-graph`，另一个是社区页面中出现的 `better-code-review-graph`。二者都围绕“为 AI code review 构建代码知识图谱/上下文图”展开，但维护者和具体实现可能不同。\n\n## 定位\n\n- 类型：代码库知识图谱 / MCP server。\n- 目标：让 AI 在代码审查时读取更少但更相关的上下文。\n- 常见能力：解析代码结构、建立函数/类/导入图、查询变更影响范围、提供 review context。\n\n## 适合场景\n\n- 大型代码库 review。\n- PR/diff 影响分析。\n- 让 Claude Code 或其他 MCP client 获取更精确的审查上下文。\n- 需要减少 token 消耗的代码审查流程。\n- 想知道某个变更可能影响哪些函数、类或调用链。\n\n## 不适合场景\n\n- 小文件、小 diff，普通人工 review 更快。\n- 项目语言不被解析器支持。\n- 没有稳定索引或图构建流程的仓库。\n- 替代测试和人工审查。\n\n## 已发现的公开信息\n\nPyPI 页面显示 `code-review-graph` 提供 MCP server，并提到通过 Tree-sitter 多语言 AST parser 构建结构信息。MCPpedia 页面称它是 local knowledge graph for Claude Code，并列出相关工具名，如：\n\n- `query_graph_tool`\n- `semantic_search_nodes_tool`\n- `detect_changes_tool`\n- `get_review_context_tool`\n\n社区页面中的 `better-code-review-graph` 被描述为 fork，强调修复搜索、调用解析和 embedding 配置等问题。\n\n## 使用前检查\n\n- 确认到底使用 `code-review-graph` 还是 `better-code-review-graph`。\n- 确认支持当前项目语言。\n- 确认是否需要安装 `uv`、Node、Python 或 embedding 模型。\n- 确认 MCP 配置是 stdio、SSE 还是 HTTP。\n- 确认它是否只读，是否会在项目中写索引文件。\n\n## 风险和限制\n\n- 图谱可能过期，需要重建。\n- 解析器可能无法完整理解动态语言行为。\n- 调用图和影响分析不能替代测试。\n- 第三方 MCP 工具可能执行本地文件读取，需确认权限边界。\n\n## 与其他工具的关系\n\n- 与 [[AI记录/内容/serena|serena]]：Serena 更偏语义定位和编辑；code-review-graph 更偏审查上下文和影响图。\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：可作为它们进行 code review 时的上下文工具。\n- 与 [[AI记录/内容/context7|context7]]：Context7 查外部文档；code-review-graph 查本地代码影响范围。\n\n## 使用判断\n\n当仓库较大、diff 影响范围不明显、review token 成本高时，可以评估 code-review-graph。普通小改动不必引入。\n\n## 来源\n\n- [code-review-graph PyPI](https://pypi.org/project/code-review-graph/)\n- [Code Review Graph MCPpedia](https://mcppedia.org/s/code-review-graph)\n- [Better Code Review Graph PulseMCP](https://www.pulsemcp.com/servers/n24q02m-code-review-graph)\n- [better-code-review-graph mcpservers.org](https://mcpservers.org/servers/n24q02m/better-code-review-graph)"
    },
    {
      "id": "note-16",
      "title": "codex 命令大全",
      "fileTitle": "codex 命令大全",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Codex",
        "AI记录/命令"
      ],
      "summary": "本文记录 Codex CLI、交互式 slash commands 和常见配置入口。命令以官方文档截至 2026 04 30 的说明为准。 安装与升级 codex：启动交互式终端 UI。 首次运行会要求登录，可使用 ChatGPT 账号或 API key。 Windows 可在 PowerShell 中原生运行，也可在需要 Linux 环境时使用 WSL2。...",
      "wordCount": 1310,
      "sourceFile": "mydata/我的数据/AI记录/内容/codex 命令大全.md",
      "markdown": "# codex 命令大全\n\n本文记录 Codex CLI、交互式 slash commands 和常见配置入口。命令以官方文档截至 2026-04-30 的说明为准。\n\n## 安装与升级\n\n```bash\nnpm i -g @openai/codex\ncodex\nnpm i -g @openai/codex@latest\n```\n\n- `codex`：启动交互式终端 UI。\n- 首次运行会要求登录，可使用 ChatGPT 账号或 API key。\n- Windows 可在 PowerShell 中原生运行，也可在需要 Linux 环境时使用 WSL2。\n\n## 全局常用参数\n\n```bash\ncodex --model gpt-5.5\ncodex --cd path/to/repo\ncodex --image screenshot.png \"根据截图修复 UI\"\ncodex --search \"查最新官方文档并更新说明\"\ncodex --full-auto \"完成低风险本地修改并运行测试\"\n```\n\n常用参数说明：\n\n| 参数 | 用途 | 注意 |\n|---|---|---|\n| `--cd, -C <path>` | 指定启动后的工作目录 | 适合从任意位置打开目标仓库 |\n| `--model, -m <model>` | 覆盖当前模型 | 例如 `gpt-5.5`、`gpt-5.4` |\n| `--image, -i <path>` | 给初始提示附加图片 | 可重复使用，也可用逗号传多个路径 |\n| `--search` | 启用 live web search | 需要最新资料时使用 |\n| `--sandbox, -s <mode>` | 选择命令沙箱 | `read-only`、`workspace-write`、`danger-full-access` |\n| `--ask-for-approval, -a <mode>` | 控制命令审批 | 常用 `on-request`；自动化可用 `never` |\n| `--full-auto` | 本地低摩擦模式 | 等价于较宽松的 workspace-write 与 on-request 审批组合 |\n| `--add-dir <path>` | 额外授予目录写权限 | 用于多目录项目 |\n| `--config, -c key=value` | 单次覆盖配置项 | 优先级高于配置文件 |\n| `--profile, -p <name>` | 使用指定配置 profile | 从 `~/.codex/config.toml` 读取 |\n| `--remote <ws://...>` | 连接远程 app-server | 用于远程会话或调试 |\n| `--yolo` | 跳过审批和沙箱 | 仅能在隔离 runner 中使用 |\n\n## 子命令速查\n\n| 命令 | 状态 | 作用 |\n|---|---|---|\n| `codex` | Stable | 启动交互式 TUI，可带 prompt 和图片 |\n| `codex app` | Stable | 启动 Codex 桌面 App |\n| `codex apply` / `codex a` | Stable | 把 Codex Cloud 任务生成的最新 diff 应用到本地 |\n| `codex cloud` | Experimental | 从终端浏览或执行 Codex Cloud tasks |\n| `codex completion` | Stable | 生成 Bash、Zsh、Fish、PowerShell 补全脚本 |\n| `codex exec` / `codex e` | Stable | 非交互式执行任务，适合脚本和 CI |\n| `codex exec resume` | Stable | 继续非交互式会话 |\n| `codex execpolicy` | Experimental | 评估 execpolicy 规则会允许、询问还是阻止命令 |\n| `codex features` | Stable | 查看、启用或禁用 feature flags |\n| `codex fork` | Stable | 从既有交互式会话分叉新线程 |\n| `codex login` | Stable | 登录 ChatGPT OAuth、设备认证或 API key |\n| `codex logout` | Stable | 移除本机凭据 |\n| `codex mcp` | Experimental | 管理 MCP server |\n| `codex mcp-server` | Experimental | 把 Codex 作为 MCP server 暴露给其他 agent |\n| `codex plugin marketplace` | Experimental | 添加、升级或移除插件市场 |\n| `codex resume` | Stable | 继续之前的交互式会话 |\n| `codex sandbox` | Experimental | 在 Codex 沙箱中运行任意命令 |\n\n## `codex exec`\n\n`codex exec` 用于脚本、CI、预合并检查、定时任务和可管道化输出。\n\n```bash\ncodex exec \"summarize the repository structure and list the top 5 risky areas\"\ncodex exec \"generate release notes for the last 10 commits\" | tee release-notes.md\ncodex exec --json \"summarize the repo structure\" | jq\ncodex exec --full-auto \"run lint, fix safe formatting issues, and report results\"\n```\n\n要点：\n\n- 默认是只读沙箱。\n- `--full-auto` 允许在 workspace 内做低摩擦修改。\n- `--json` 输出 JSON Lines，适合机器消费。\n- prompt 可以来自参数，也可以通过 stdin 传入。\n- `--ephemeral` 可避免持久化会话 rollout 文件。\n\n## 交互式 slash commands\n\n在 Codex TUI 中输入 `/` 可打开命令面板。常用命令如下：\n\n| Slash command | 作用 | 使用场景 |\n|---|---|---|\n| `/model` | 切换模型和可用推理强度 | 从普通任务切到 GPT-5.5 或其他模型 |\n| `/permissions` | 调整审批权限 | 在只读、自动、本地写入等模式间切换 |\n| `/plan` | 进入 plan mode | 先做方案，不立即改文件 |\n| `/review` | 审查当前工作区变更 | 提交前找 bug、风险和缺失测试 |\n| `/diff` | 查看 Git diff | 审查 Codex 已改内容 |\n| `/compact` | 压缩上下文 | 长会话接近上下文上限时使用 |\n| `/mention` | 附加文件或目录 | 指定 Codex 下一步重点阅读对象 |\n| `/mcp` | 查看 MCP 工具 | 确认可用外部工具 |\n| `/mcp verbose` | 查看 MCP 详细诊断 | 排查 MCP 资源、模板、连接问题 |\n| `/apps` | 浏览 app / connector | 把连接器插入 prompt |\n| `/plugins` | 管理插件 | 查看、安装、启用或禁用插件 |\n| `/agent` | 切换 agent 线程 | 查看或继续 subagent 工作 |\n| `/fork` | 分叉当前对话 | 并行探索另一种方案 |\n| `/init` | 生成 `AGENTS.md` 脚手架 | 为仓库写长期规则 |\n| `/fast` | 控制 Fast mode | 调整速度与质量取舍 |\n| `/personality` | 切换沟通风格 | 例如 pragmatic、friendly、none |\n| `/statusline` | 配置 TUI 底部状态栏 | 显示模型、上下文、限额、git 分支等 |\n| `/title` | 配置终端标题 | 让窗口标题显示项目、线程、模型等 |\n| `/copy` | 复制最新完成输出 | 快速取出结果文本 |\n| `/clear` | 清屏并开始 fresh chat | 重置可见会话 |\n| `/logout` | 登出 | 共用机器或切账号 |\n| `/exit` / `/quit` | 退出 CLI | 离开会话 |\n\n## 常见工作流\n\n### 只读分析\n\n```bash\ncodex --sandbox read-only \"阅读这个仓库，说明数据同步流程，不要修改文件\"\n```\n\n### 指定 GPT-5.5 做复杂任务\n\n```bash\ncodex --model gpt-5.5 \"实现批量导入功能，补测试并运行相关测试\"\n```\n\n### 前端截图修复\n\n```bash\ncodex --image before.png \"根据截图修复移动端溢出问题，完成后说明验证方式\"\n```\n\n### 自动化发布说明\n\n```bash\ngit log --oneline -20 | codex exec \"按用户可读格式生成发布说明\"\n```\n\n### 代码审查\n\n```text\n/review\n/diff\n```\n\n先让 Codex 审查，再用 `/diff` 对照具体变更。\n\n## 配置文件\n\nCodex 主要从 `~/.codex/config.toml` 读取默认配置，也可以通过命令行 `-c key=value` 临时覆盖。\n\n常见配置方向：\n\n- 默认模型。\n- 默认 web search 模式。\n- 审批策略。\n- 沙箱策略。\n- MCP server。\n- status line 字段。\n- review model。\n- Team Config 中共享的规则、skills 和默认值。\n\n## 安全提示\n\n- 不要在普通工作区中使用 `--yolo` 或 `danger-full-access`。\n- 自动化中优先使用只读或 workspace-write。\n- 需要联网、MCP、插件或外部 API 时，先明确任务是否真的需要。\n- 对删除、覆盖、重命名、批量修改类任务，应先核对路径和影响范围。\n\n## 来源\n\n- [OpenAI Codex CLI 文档](https://developers.openai.com/codex/cli)\n- [OpenAI Codex CLI 命令选项](https://developers.openai.com/codex/cli/reference)\n- [OpenAI Codex CLI Slash commands](https://developers.openai.com/codex/cli/slash-commands)\n- [OpenAI Codex non-interactive mode](https://developers.openai.com/codex/noninteractive)"
    },
    {
      "id": "note-17",
      "title": "codex 更新日志",
      "fileTitle": "codex 更新日志",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Codex",
        "AI记录/更新日志"
      ],
      "summary": "本文只记录 2025 06 01 之后 Codex 的新功能、能力扩展和重要产品入口变化。不记录 bug fix、性能修复、文案调整等纯修复类条目。 2026 04 23：GPT 5.5 与 Codex App 更新 GPT 5.5 可在 Codex 中使用，是 OpenAI 面向复杂编码、计算机使用、知识工作和研究流程的新一代前沿模型。 如果模型选择器中可...",
      "wordCount": 2868,
      "sourceFile": "mydata/我的数据/AI记录/内容/codex 更新日志.md",
      "markdown": "# codex 更新日志\n\n本文只记录 2025-06-01 之后 Codex 的新功能、能力扩展和重要产品入口变化。不记录 bug fix、性能修复、文案调整等纯修复类条目。\n\n## 2026-04-23：GPT-5.5 与 Codex App 更新\n\n- GPT-5.5 可在 Codex 中使用，是 OpenAI 面向复杂编码、计算机使用、知识工作和研究流程的新一代前沿模型。\n- 如果模型选择器中可见，GPT-5.5 适合多数 Codex 任务，尤其是实现、重构、调试、测试、验证和知识工作产物。\n- CLI 可用 `codex --model gpt-5.5` 开新线程，也可在会话中使用 `/model` 切换。\n- IDE extension 和 Codex App 可在 composer 的模型选择器中选择 GPT-5.5。\n- Codex App 新增浏览器使用能力，可让 Codex 操作内置浏览器，验证本地开发服务或文件页面。\n- Codex App 支持 automatic approval reviews，可把符合条件的权限请求交给自动审查 agent 先评估风险。\n\n## 2026-04-23：Codex CLI 0.124.0 新功能\n\n- TUI 新增快速推理强度快捷键：`Alt+,` 降低推理，`Alt+.` 提高推理。\n- app-server 会话支持管理多个环境，并能按 turn 选择环境和工作目录，便于多 workspace 与远程设置。\n- 新增 Amazon Bedrock 作为 OpenAI-compatible provider，支持 AWS SigV4 和 AWS credential 认证。\n- 远程插件市场可直接列出和读取，插件详情查询更可靠。\n- Hooks 进入稳定状态，可在 `config.toml` 和 `requirements.toml` 中配置，并可观察 MCP tools、`apply_patch` 和长时间 Bash 会话。\n- 符合条件的 ChatGPT 计划默认使用 Fast service tier，除非显式关闭。\n\n## 2026-04-23：Codex CLI 0.123.0 新功能\n\n- 新增内置 `amazon-bedrock` model provider，并支持 AWS profile 配置。\n- 新增 `/mcp verbose`，可查看完整 MCP server 诊断、resources 和 resource templates。\n- 插件 MCP 加载支持更多 `.mcp.json` 形态。\n- 后台 agent 支持更实时的 transcript handoff。\n- 远程环境新增 host-specific `remote_sandbox_config` requirements。\n- 模型元数据刷新，包含当时的 `gpt-5.4` 默认信息。\n\n## 2026-03-12：GPT-5.4 in Codex\n\n- GPT-5.4 加入 Codex，面向专业工作、推理、编码和 agentic workflow。\n- GPT-5.4 是 Codex 中首个带原生 computer-use 能力的通用模型。\n- 在 Codex 中提供实验性 1M context window 支持。\n- 可用于 Codex App、CLI、IDE extension、Codex Cloud 和 API。\n- CLI 使用方式：`codex --model gpt-5.4`，或在会话中使用 `/model`。\n\n## 2026-03-04：Codex App for Windows\n\n- Codex App 可在 Windows 上使用。\n- Windows App 支持跨项目工作、并行 agent threads、统一结果审查。\n- 原生使用 PowerShell 和 Windows sandbox，不必强制迁移到 WSL、虚拟机或关闭沙箱。\n- Windows 版本包含 Skills、Automations 和 Worktrees。\n- 如果偏好 WSL，也可以把 Codex agent 和集成终端切换到 WSL。\n\n## 2026-02-26：Codex App 26.226 新功能\n\n- composer 中新增 MCP 快捷入口，包括安装关键词建议和 Add context 中的 MCP server 子菜单。\n- inline review comments 支持 `@mentions` 和 skill mentions。\n\n## 2026-02-17：Codex App 26.217 新功能\n\n- 支持拖拽调整 queued messages 顺序。\n- 当选中模型被降级时显示提醒。\n\n## 2026-02-12：GPT-5.3-Codex-Spark\n\n- GPT-5.3-Codex-Spark 作为研究预览发布，是 GPT-5.3-Codex 的更小版本，也是 OpenAI 第一款面向实时编码体验设计的模型。\n- 目标是近乎即时响应，官方说明为超过 1000 tokens/s，同时保持真实编码任务能力。\n- 面向 ChatGPT Pro 用户，在最新 Codex App、CLI、IDE extension 中可用。\n- 启动时为 text-only，支持 128k context window。\n- CLI 使用方式：`codex --model gpt-5.3-codex-spark`，或在会话中用 `/model`。\n\n## 2026-02-12：Codex App 26.212 新功能\n\n- 支持 GPT-5.3-Codex-Spark。\n- 新增 conversation forking。\n- 新增 floating pop-out window，可把一个会话浮窗带到其他工作区。\n\n## 2026-02-10：Codex App 26.210 新功能\n\n- branch picker 新增分支搜索。\n- 在 composer 输入 `plan` 时给出更清晰的 plan mode 引导。\n- 支持 parallel approvals。\n\n## 2026-02-09：GPT-5.3-Codex in Cursor and VS Code\n\n- GPT-5.3-Codex 可在 Cursor 和 VS Code 中原生使用。\n- API access 从小范围客户开始分阶段开放。\n- 该模型被纳入更高安全能力等级处理。\n\n## 2026-02-08：Codex App 26.208 新功能\n\n- command palette 新增 MCP 与 personality actions。\n- follow-up 默认排队，适合长任务期间连续补充指令。\n\n## 2026-02-05：GPT-5.3-Codex\n\n- GPT-5.3-Codex 发布，用于复杂真实软件工程任务。\n- 相比 GPT-5.2-Codex，增强推理与专业知识能力，并为 Codex 用户带来更快运行速度。\n- 更适合边工作边协作，能更频繁更新进展，并响应 mid-turn steering。\n- 可在 Codex App、CLI、IDE extension 和 Codex Cloud 中使用。\n- CLI 使用方式：`codex --model gpt-5.3-codex`，或在会话中用 `/model`。\n\n## 2026-02-05：Codex App 26.205 新功能\n\n- 支持 GPT-5.3-Codex。\n- 新增 mid-turn steering：Codex 工作中也可以继续提交消息调整行为。\n- 支持附加或拖放任意文件类型。\n\n## 2026-02-04：Codex App 26.204 新功能\n\n- 打开文件和目录时新增 Zed、TextMate 选项。\n- review panel 新增 PDF 预览。\n\n## 2026-02-03：Codex App 26.203 新功能\n\n- thread list 支持双击重命名线程。\n- Sync 更名为 Handoff，并在界面中显示更清晰的来源与目标统计。\n\n## 2026-02-02：Codex App for macOS\n\n- Codex App for macOS 发布，作为多 agent 管理和长任务协作的桌面入口。\n- 支持跨项目多任务、内置 worktree、语音输入、内置 Git 工具、Skills 和 Automations。\n- App 可继承 CLI 和 IDE extension 的 session history 与配置。\n- 可在一个界面中查看 agent 线程、review diff、评论变更并打开到编辑器继续修改。\n\n## 2026-01-28：Web Search 默认启用\n\n- Codex CLI 和 IDE extension 的本地任务默认启用 web search。\n- 默认模式为 cached web search，使用 OpenAI 维护的搜索缓存。\n- live mode 可抓取最新网页；`--search` 等价于 live mode。\n- 可通过配置设置为 `cached`、`live` 或 `disabled`。\n\n## 2026-01-23：Team Config\n\n- Team Config 用于团队跨仓库和机器共享 Codex 配置。\n- 可共享 `config.toml` 默认值、`rules/` 命令控制规则、`skills/` 可复用工作流。\n- Codex 会从当前目录、父目录、repo root、用户目录和系统目录的 `.codex/` 层叠加载配置。\n- `requirements.toml` 可用于管理员强制约束，优先级高于普通默认值。\n\n## 2026-01-22：Custom Prompts 转向 Skills\n\n- Custom prompts 被弃用。\n- 可复用指令和工作流推荐迁移到 Skills。\n\n## 2026-01-14：GPT-5.2-Codex API\n\n- GPT-5.2-Codex 可通过 API 使用。\n- 使用 API key 登录 Codex 的用户也可以使用 GPT-5.2-Codex。\n\n## 2025-12-19：Agent Skills in Codex\n\n- Codex CLI 和 IDE extension 支持 agent skills。\n- Skill 是可复用的指令包，可带脚本、参考资料和资源文件。\n- 可显式通过 `$skill-name` 调用，也可让 Codex 按任务自动选择。\n- 支持安装在用户级 `~/.codex/skills`，也可放在仓库 `.codex/skills` 供团队共享。\n- Codex 内置部分系统 skills，例如 `$skill-creator` 和 `$skill-installer`。\n\n## 2025-12-18：GPT-5.2-Codex\n\n- GPT-5.2-Codex 发布，面向复杂真实软件工程的 agentic coding。\n- 强化长周期任务、上下文压缩、大型重构、迁移、Windows 环境和网络安全能力。\n- CLI 和 IDE extension 对 ChatGPT 登录用户默认使用 `gpt-5.2-codex`。\n- CLI 使用方式：`codex --model gpt-5.2-codex`，或在会话中用 `/model`。\n\n## 2025-12-04：Codex for Linear\n\n- Linear issue 可 assign 或 mention `@Codex` 来启动 Codex Cloud task。\n- Codex 工作时会把进度回写到 Linear。\n- 任务完成后提供链接，便于审查、打开 PR 或继续跟进。\n\n## 2025-11-18：GPT-5.1-Codex-Max\n\n- GPT-5.1-Codex-Max 发布，作为面向 agentic coding 的 frontier model。\n- 面向软件工程、数学、研究等 agentic tasks 训练。\n- 增加 Extra High (`xhigh`) reasoning effort，适合非延迟敏感任务。\n- CLI 使用方式：`codex --model gpt-5.1-codex-max`，或在会话中用 `/model`。\n\n## 2025-11-13：GPT-5.1-Codex 与 GPT-5.1-Codex-Mini\n\n- 新增 `gpt-5.1-codex` 和 `gpt-5.1-codex-mini` 模型选项。\n- GPT-5.1-Codex 面向长时间运行的 agentic coding 和 coding agent harness。\n- CLI 使用方式：`codex --model gpt-5.1-codex`，或在会话中用 `/model`。\n\n## 2025-11-07：GPT-5-Codex-Mini\n\n- 新增 `gpt-5-codex-mini` 模型选项。\n- 它是 `gpt-5-codex` 的更小、更低成本版本，能力较低但可提供更多用量。\n- 当接近 5 小时使用窗口限制时，CLI 和 IDE extension 会建议切换到该模型。\n- CLI 使用方式：`codex --model gpt-5-codex-mini`。\n\n## 2025-10-30：ChatGPT Pro / Plus Credits\n\n- ChatGPT Plus 和 Pro 用户可购买 on-demand credits，用于超出计划内额度的 Codex 使用。\n\n## 2025-10-22：GitHub Issues 与 PR 中的 `@codex`\n\n- 可在队友 PR 中 tag `@codex`，请求澄清、跟进或让 Codex 修改。\n- GitHub Issues 支持 `@codex` mention，可从 issue 中直接启动任务。\n\n## 2025-10-06：Codex GA\n\n- Codex 进入一般可用状态。\n- 新增 `@Codex` in Slack，可从 Slack 中向 Codex 提问和分配任务。\n- 发布 Codex SDK，可把 Codex CLI 背后的 agent 集成到自有工具和工作流。\n- 新增 Codex GitHub Action，便于在 CI/CD 中使用 Codex。\n- 新增管理员控制和 analytics：workspace 管理员可编辑或删除 Codex Cloud environments，设置 CLI/IDE 安全默认值，并查看使用情况和 review feedback。\n\n## 2025-09-23：GPT-5-Codex in API\n\n- GPT-5-Codex 可在 Responses API 中使用。\n- 使用 API key 的 Codex CLI 工作流也可使用 GPT-5-Codex。\n\n## 2025-09-15：GPT-5-Codex\n\n- GPT-5-Codex 发布，是针对 Codex 中 agentic coding 优化的 GPT-5 版本。\n- 可在 ChatGPT 登录后的 IDE extension 和 CLI 中使用，也驱动 Cloud agent 和 GitHub Code Review。\n- Cloud 前端任务支持 image outputs，可在 Codex web 中展示 UI 截图，便于无需本地 checkout 就审查设计结果。\n- CLI 新增 `codex resume`，可恢复之前的会话。\n- 新增 context compaction，会在接近上下文窗口上限时自动总结会话。\n\n## 2025-08-27：IDE Extension、ChatGPT 登录、本地云端交接和 Code Reviews\n\n- Codex IDE extension 支持 VS Code、Cursor、Windsurf。\n- IDE 内提供交互 UI，可快速本地迭代，并切换模式与推理强度。\n- IDE 和 CLI 支持 Sign in with ChatGPT，减少 API key 配置，并可使用 ChatGPT Enterprise credits。\n- IDE 可把任务交给 Codex web，并能把云端变更应用回本地。\n- Code Reviews 能根据 PR 意图审查 diff，跨代码库和依赖推理，并可运行代码验证行为。\n\n## 2025-08-21：图片输入、容器缓存和自动环境设置\n\n- Codex web 支持在 prompt 中附加图片，适合前端变更、UI bug 和白板讨论跟进。\n- Cloud container caching 加速新任务和 follow-up 启动。\n- 无手动 setup script 的环境会自动运行常见包管理器安装命令，例如 yarn、pnpm、npm、go mod、gradle、pip、poetry、uv 和 cargo。\n\n## 2025-06-13：Best of N\n\n- Codex 可对同一个任务同时生成多个响应。\n- 适合探索多个实现方向，再由用户选择最合适方案。\n\n## 2025-06-03：联网执行、PR 跟进和语音输入\n\n- Codex task execution 可开启互联网访问，用于安装依赖、升级包、运行需要外部资源的测试等。\n- 联网默认关闭，可按环境开启，并可控制允许访问的域名和 HTTP 方法。\n- 支持在 follow-up 任务中更新已有 pull request。\n- 支持语音 dictation，可直接口述任务给 Codex。\n- 支持 binary files：应用 patch 时支持所有文件操作；通过 PR 时支持删除或重命名 binary files。\n- 任务 diff 上限提升到 5 MB。\n- setup script 时长上限提升，Pro 和 Business 用户可到 20 分钟。\n- 支持取消任务。\n\n## 来源\n\n- [OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)\n- [OpenAI Codex CLI 文档](https://developers.openai.com/codex/cli)\n- [Introducing upgrades to Codex](https://openai.com/index/introducing-upgrades-to-codex/)\n- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)"
    },
    {
      "id": "note-18",
      "title": "codex",
      "fileTitle": "codex",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/OpenAI",
        "AI记录/已核对"
      ],
      "summary": "Codex 是 OpenAI 面向软件工程任务的 coding agent。它不是单纯的补全插件，而是可以在受控环境中读取代码、修改文件、运行命令、审查 diff、发起云端任务、处理 GitHub/Slack/Linear 工作流，并在 CLI、IDE、Web/Cloud、桌面 App 和 SDK 中复用同一套 agent 能力。 定位 类型：AI codi...",
      "wordCount": 1656,
      "sourceFile": "mydata/我的数据/AI记录/内容/codex.md",
      "markdown": "# codex\n\nCodex 是 OpenAI 面向软件工程任务的 coding agent。它不是单纯的补全插件，而是可以在受控环境中读取代码、修改文件、运行命令、审查 diff、发起云端任务、处理 GitHub/Slack/Linear 工作流，并在 CLI、IDE、Web/Cloud、桌面 App 和 SDK 中复用同一套 agent 能力。\n\n## 定位\n\n- 类型：AI coding agent / 软件工程智能体。\n- 核心目标：把“读仓库、改文件、运行验证、解释结果、回收 diff”这一类工程闭环交给 agent 执行。\n- 主要入口：Codex CLI、Codex IDE extension、Codex Cloud/Web、Codex App、GitHub 集成、Slack 集成、Linear 集成、Codex SDK、Codex GitHub Action。\n- 当前重点模型：截至 2026-04-30，官方变更日志将 GPT-5.5 描述为 Codex 中复杂编码、计算机使用、知识工作和研究流程的新一代前沿模型；如果模型选择器中可见，优先用于多数 Codex 任务。\n\n## 使用入口\n\n### CLI\n\nCLI 适合在本地仓库中做高频工程操作。它可以读取当前工作目录、修改文件、运行测试或构建命令，并通过审批模式与沙箱限制控制风险。\n\n```bash\nnpm i -g @openai/codex\ncodex\n```\n\n常用方式：\n\n- 交互式工作：直接运行 `codex`，在终端 TUI 中持续对话。\n- 指定模型：`codex --model gpt-5.5`，或进入会话后用 `/model` 切换。\n- 附加图片：`codex --image screenshot.png \"根据截图修复前端布局\"`。\n- 启用实时搜索：`codex --search \"查最新 API 文档并更新调用方式\"`。\n- 自动化任务：`codex exec \"生成最近 10 个提交的发布说明\"`。\n- 本地审查：在会话里使用 `/review`，让 Codex 对当前工作区变更做独立 code review。\n\n更多命令见 [[我的数据/AI记录/内容/codex 命令大全|codex 命令大全]]。\n\n### IDE 扩展\n\nCodex IDE extension 面向 VS Code、Cursor、Windsurf 和多数 VS Code forks。它的优势是可以直接读取已打开文件、选中代码和当前编辑器上下文，因此适合短提示、高频局部改动、前端预览、云端任务回收和代码审查。\n\n典型用法：\n\n- 选中一段代码，让 Codex 解释、重构或补测试。\n- 在 IDE 中发起 Cloud task，把长任务交给云端执行。\n- 查看云端任务结果，把 diff 应用回本地。\n- 在编辑器内切换模型、推理强度、审批模式和任务上下文。\n\n### Codex Cloud / Web\n\nCloud 适合运行较长、较重或需要隔离的任务。它可以在云端环境中 checkout 仓库、执行安装脚本、运行测试、生成 diff，并可通过 GitHub PR 回收结果。\n\n2025-06-01 之后的关键增强包括：任务执行期间可配置联网、容器缓存、自动环境安装、图片输入、前端截图输出、GitHub PR 跟进和 code review。\n\n### Codex App\n\nCodex App 是桌面端 agent 指挥台。macOS 版本在 2026-02-02 发布，Windows 版本在 2026-03-04 可用。它适合同时管理多个项目、多条 agent 线程和长时间任务。\n\n主要能力：\n\n- 多 agent 线程并行执行。\n- 内置 worktree，避免多个 agent 同时改同一个工作区造成冲突。\n- 内置 Git review 面板，可查看 diff、评论变更、打开到编辑器继续改。\n- 支持 Skills、Automations、语音输入、浏览器验证、Windows 原生 PowerShell 与沙箱。\n\n### GitHub / Slack / Linear\n\nCodex 已经从“本地编码工具”扩展到协作入口：\n\n- GitHub：可在 PR 中触发 review，也可通过 `@codex` 请求澄清、跟进或修改；GitHub Issues 也支持 `@codex` 发起任务。\n- Slack：可以在 Slack 中向 Codex 提问或分配任务。\n- Linear：可以在 issue 中 assign 或 mention `@Codex`，触发 Codex Cloud task，并把进度和结果回写到 Linear。\n\n### SDK / 自动化\n\nCodex SDK 用于把 CLI 背后的 agent 嵌入自己的工具或工作流。`codex exec`、Codex SDK 和 Codex GitHub Action 适合放进 CI、预合并检查、定时任务、发布说明生成、仓库巡检等自动化流程。\n\n## 适合场景\n\n- 在本地仓库中实现明确功能。\n- 修复 failing test、lint 错误、构建错误。\n- 做多文件重构、迁移、测试补全。\n- 阅读陌生代码库并总结结构。\n- 根据截图、线框图或设计稿实现前端变更。\n- 对提交前 diff 做独立 code review。\n- 把长任务交给 Cloud 或 App 中的并行 agent 执行。\n- 在 GitHub、Slack、Linear 中把已有协作流程接入 agent。\n\n## 不适合场景\n\n- 没有目标、没有验收标准、没有边界的开放式任务。\n- 未经授权的删除、覆盖、重命名或批量修改。\n- 需要访问生产系统、真实支付、敏感数据、私钥或高风险外部服务的任务。\n- 需要最新第三方信息但不允许联网或查官方文档的任务。\n- 结果必须由人类负责签字、合规审批或上线决策的场景；Codex 可以辅助，但不能替代责任人。\n\n## 常用提示模板\n\n```text\n只阅读当前仓库，不修改文件。请说明认证流程从 HTTP 请求进入到数据库写入的完整路径，并指出关键模块和风险点。\n```\n\n```text\n修复当前 failing test。先定位根因，再做最小修改，最后运行相关测试。不要改公共 API，除非你先说明原因。\n```\n\n```text\n为 auth 模块补测试。覆盖成功登录、错误密码、过期 token 三类场景。运行测试并修复失败项。\n```\n\n```text\n审查当前 diff，按严重程度列出 bug、行为回归、风险和缺失测试。只审查，不修改文件。\n```\n\n```text\n根据附加截图修复页面布局。先解释截图中的问题，再修改实现，最后用浏览器验证视觉结果。\n```\n\n## MCP、Skills 与 AGENTS.md\n\n- MCP：给 Codex 接入外部工具和上下文，例如 [[我的数据/AI记录/内容/context7|context7]]、[[我的数据/AI记录/内容/serena|serena]]。\n- Skills：把重复工作封装为可复用流程。2025-12-19 之后，Codex CLI 和 IDE extension 支持 agent skills；可以按用户或仓库存放。\n- AGENTS.md：项目级规则文件，用来告诉 Codex 当前仓库的约束、命令、沟通语言、审批要求和安全边界。\n- Team Config：团队共享配置层，可集中分发 `config.toml` 默认值、命令规则和 skills。\n\n## 风险控制\n\n- 删除、覆盖、重命名、批量修改前必须核对路径和影响范围。\n- 对用户已有改动不能随意回滚。\n- 使用 `danger-full-access`、`--yolo`、联网、外部 MCP 或插件前，要确认任务是否真的需要。\n- 云端任务、GitHub Review 和自动化流程必须保留人类最终审查。\n- 完成任务时应提供真实验证结果，例如测试命令、构建结果、截图、diff 检查或明确说明未验证原因。\n\n## 与其他 IDE / Agent 的区别\n\n- 相比普通 IDE 补全：Codex 更偏任务代理，可以规划、改文件、运行命令、验证结果。\n- 相比只在云端运行的 agent：Codex 同时覆盖本地 CLI、IDE、App、Cloud 和协作工具，适合从本地高频修改一路延伸到团队流程。\n- 相比 [[我的数据/AI记录/内容/claude code|claude code]]：两者都适合终端和代码库工作。选择取决于模型表现、权限控制、团队习惯、IDE 集成、云端回收和验证体验。\n\n## 更新范围\n\n本页重点记录 2025-06-01 之后 Codex 的功能演进。按时间线整理的新功能见 [[我的数据/AI记录/内容/codex 更新日志|codex 更新日志]]。\n\n## 来源\n\n- [OpenAI Codex CLI 文档](https://developers.openai.com/codex/cli)\n- [OpenAI Codex CLI 命令选项](https://developers.openai.com/codex/cli/reference)\n- [OpenAI Codex CLI Slash commands](https://developers.openai.com/codex/cli/slash-commands)\n- [OpenAI Codex Changelog](https://developers.openai.com/codex/changelog)\n- [Introducing upgrades to Codex](https://openai.com/index/introducing-upgrades-to-codex/)\n- [Introducing the Codex app](https://openai.com/index/introducing-the-codex-app/)"
    },
    {
      "id": "note-19",
      "title": "context7",
      "fileTitle": "context7",
      "categories": [
        "常用MCP"
      ],
      "tags": [
        "AI记录/MCP",
        "AI记录/文档",
        "AI记录/已核对"
      ],
      "summary": "Context7 是一个面向 AI 编程代理的文档检索 MCP/CLI 工具。它的核心用途是把库、框架、SDK 的当前文档和代码示例拉进模型上下文，减少模型凭旧知识生成不存在或过时 API 的概率。 定位 类型：MCP server + CLI + agent skill。 主要对象：AI coding agent、IDE agent、CLI agent。...",
      "wordCount": 740,
      "sourceFile": "mydata/我的数据/AI记录/内容/context7.md",
      "markdown": "# context7\n\nContext7 是一个面向 AI 编程代理的文档检索 MCP/CLI 工具。它的核心用途是把库、框架、SDK 的当前文档和代码示例拉进模型上下文，减少模型凭旧知识生成不存在或过时 API 的概率。\n\n## 定位\n\n- 类型：MCP server + CLI + agent skill。\n- 主要对象：AI coding agent、IDE agent、CLI agent。\n- 核心价值：在写代码前检索库文档，而不是依赖模型记忆。\n- 常见搭配：Codex、Claude Code、Cursor、OpenCode、Kilo Code 等支持 MCP 或规则/skills 的工具。\n\n## 适合场景\n\n- 查询库或框架的最新 API。\n- 生成依赖具体版本的代码。\n- 写配置、初始化代码、SDK 调用、框架集成。\n- 遇到模型写出过时参数、旧版 API、幻觉方法名时。\n- 给 Agent 增加“写代码前先查文档”的强约束。\n\n## 不适合场景\n\n- 查询一个项目内部代码结构，这更适合 [[AI记录/内容/deepwiki|deepwiki]] 或 [[AI记录/内容/serena|serena]]。\n- 查不在 Context7 覆盖范围内的私有文档。\n- 替代官方文档的最终判断。Context7 自身也提示社区贡献内容不能保证绝对准确。\n\n## 典型工作流\n\n1. 明确要查的库名和任务，例如 “Next.js middleware 配置”。\n2. 先解析库名，得到 Context7 library ID。\n3. 再用 library ID 查询具体文档。\n4. 将查到的用法和本地项目版本核对。\n5. 再让 Agent 写代码或修改配置。\n\n## 提示词写法\n\n```text\n实现 Supabase 邮箱登录。先用 Context7 查询 Supabase 的当前 auth 文档，再修改代码。\n```\n\n如果已知 library ID，可以直接指定：\n\n```text\nuse library /supabase/supabase\n```\n\n指定版本也很重要：\n\n```text\n查询 Next.js 14 middleware 的写法，使用 Context7。\n```\n\n## MCP 工具\n\nContext7 MCP 的典型工具包括：\n\n- `resolve-library-id`：把库名解析成 Context7 可识别的 library ID。\n- `query-docs`：基于 library ID 检索文档和示例。\n\n使用顺序通常是先 resolve，再 query。除非你已经知道精确 library ID。\n\n## 安装和接入\n\n官方 MCP Registry 页面给出的常见方式包括：\n\n- 使用 `npx ctx7 setup` 自动配置。\n- 选择 CLI + Skills 或 MCP 模式。\n- 手动配置 MCP server URL：`https://mcp.context7.com/mcp`。\n- 推荐配置 API key 以获得更高限额。\n\n具体安装命令应以官方页面为准，因为 MCP client 支持方式会变化。\n\n## 风险和注意事项\n\n- 不要把 API key、私有代码、内部接口、客户数据发到外部文档查询中。\n- 文档检索结果要和本地依赖版本核对。\n- 如果查询到的是社区贡献文档，关键实现仍要回到官方文档确认。\n- 对安全、支付、鉴权、数据迁移等高风险代码，不应只依赖文档摘要。\n\n## 与其他 MCP 的关系\n\n- 与 [[AI记录/内容/deepwiki|deepwiki]]：Context7 查库文档；DeepWiki 查 GitHub 仓库结构。\n- 与 [[AI记录/内容/serena|serena]]：Context7 查外部库；Serena 查本地项目符号和引用。\n- 与 [[AI记录/内容/code-review-graph|code-review-graph]]：Context7 用于写前查文档；代码审查图用于写后看影响范围。\n\n## 使用判断\n\n如果任务中出现“某个库怎么用”“这个 API 最新写法是什么”“框架配置怎么写”，优先考虑 Context7。\n\n## 来源\n\n- [Context7 MCP Registry](https://github.com/mcp/io.github.upstash/context7)\n- [Context7 GitHub](https://github.com/upstash/context7)"
    },
    {
      "id": "note-20",
      "title": "deepwiki",
      "fileTitle": "deepwiki",
      "categories": [
        "常用MCP"
      ],
      "tags": [
        "AI记录/MCP",
        "AI记录/源码阅读",
        "AI记录/已核对"
      ],
      "summary": "DeepWiki 是面向 GitHub 仓库的 AI 文档和问答工具。它会为公开仓库生成可对话的 wiki 式说明，也提供 MCP server 让 Agent 通过工具访问仓库文档。 定位 类型：仓库级文档生成与问答工具。 MCP 形态：远程 no auth MCP server。 主要对象：公共 GitHub 仓库；私有仓库需要 Devin 账号相关能力...",
      "wordCount": 622,
      "sourceFile": "mydata/我的数据/AI记录/内容/deepwiki.md",
      "markdown": "# deepwiki\n\nDeepWiki 是面向 GitHub 仓库的 AI 文档和问答工具。它会为公开仓库生成可对话的 wiki 式说明，也提供 MCP server 让 Agent 通过工具访问仓库文档。\n\n## 定位\n\n- 类型：仓库级文档生成与问答工具。\n- MCP 形态：远程 no-auth MCP server。\n- 主要对象：公共 GitHub 仓库；私有仓库需要 Devin 账号相关能力。\n- 核心价值：快速理解陌生仓库的结构、模块和实现思路。\n\n## 适合场景\n\n- 第一次接触一个开源仓库，需要快速了解整体结构。\n- 想问某个模块如何工作，而不是自己先全量读源码。\n- 需要生成或查看仓库 wiki。\n- 需要让 Agent 在修改前理解外部开源项目。\n- 想查某个 GitHub repo 的架构、入口、核心文件和调用关系。\n\n## 不适合场景\n\n- 查当前本地未公开项目的实时状态。\n- 做精确代码修改定位，这更适合 [[AI记录/内容/serena|serena]] 或本地搜索。\n- 替代源码阅读。DeepWiki 生成的是辅助理解材料，关键结论仍要回源码确认。\n- 查询库 API 最新文档，这更适合 [[AI记录/内容/context7|context7]]。\n\n## MCP 工具\n\n官方 MCP Registry 记录的 DeepWiki MCP 提供三个工具：\n\n- `ask_question`：围绕指定仓库提问。\n- `read_wiki_structure`：读取 wiki 结构。\n- `read_wiki_contents`：读取 wiki 内容。\n\nMCP server URL 包括：\n\n```text\nhttps://mcp.deepwiki.com/sse\nhttps://mcp.deepwiki.com/mcp\n```\n\n## 典型提问\n\n```text\n请解释 facebook/react 的 reconciler 模块如何组织。\n```\n\n```text\n读取 modelcontextprotocol/servers 的 wiki 结构，并告诉我 GitHub server 的入口在哪里。\n```\n\n```text\n这个仓库的插件系统是如何注册和加载的？\n```\n\n## 使用流程\n\n1. 用 `owner/repo` 形式指定仓库。\n2. 先读取 wiki 结构，判断 DeepWiki 是否已索引该仓库。\n3. 再针对具体模块提问。\n4. 如果答案涉及关键行为，回到 GitHub 源码核对。\n5. 把确认后的结论写进项目笔记，而不是直接复制摘要。\n\n## 风险和注意事项\n\n- 仓库可能未索引或索引过旧。\n- 自动生成文档可能遗漏边界情况。\n- 对安全、协议、数据格式等关键逻辑，应以源码和官方文档为准。\n- DeepWiki 适合“快速建立地图”，不适合当作最终证据。\n\n## 与其他工具的关系\n\n- 与 [[AI记录/内容/context7|context7]]：DeepWiki 面向仓库；Context7 面向库文档/API。\n- 与 [[AI记录/内容/serena|serena]]：DeepWiki 适合外部 GitHub 仓库理解；Serena 更适合本地代码库语义导航。\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：DeepWiki 可作为它们的外部仓库上下文来源。\n\n## 使用判断\n\n当问题是“这个 GitHub 仓库是什么结构”“某个模块怎么实现”“我想快速读一个开源项目”时，优先考虑 DeepWiki。\n\n## 来源\n\n- [DeepWiki MCP Registry](https://github.com/mcp/cognitionai/deepwiki)\n- [DeepWiki 官网](https://deepwiki.com/)"
    },
    {
      "id": "note-21",
      "title": "dispatching-parallel-agents",
      "fileTitle": "dispatching-parallel-agents",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Subagent",
        "AI记录/并行",
        "AI记录/已核对"
      ],
      "summary": "dispatching parallel agents dispatching parallel agents 用于把多个相互独立的问题域分派给多个子代理并行处理，避免串行调查浪费时间。 一句话定位 当存在 2 个以上互不依赖的问题，且它们可以并行调查或修复时使用。 什么时候用 多个测试文件失败，根因不同。 多个子系统独立出问题。 每个问题不需要其他问题的结...",
      "wordCount": 457,
      "sourceFile": "mydata/我的数据/AI记录/内容/dispatching-parallel-agents.md",
      "markdown": "# dispatching-parallel-agents\n\n`dispatching-parallel-agents` 用于把多个相互独立的问题域分派给多个子代理并行处理，避免串行调查浪费时间。\n\n## 一句话定位\n\n当存在 2 个以上互不依赖的问题，且它们可以并行调查或修复时使用。\n\n## 什么时候用\n\n- 多个测试文件失败，根因不同。\n- 多个子系统独立出问题。\n- 每个问题不需要其他问题的结果。\n- 可以给每个子代理清晰边界。\n- 修改范围可以互不重叠。\n\n## 不适合场景\n\n- 失败之间有关联，修一个可能影响另一个。\n- 必须先理解整体系统状态。\n- 子代理会修改同一文件。\n- 当前关键路径依赖某个结果，等它会阻塞主流程。\n- 用户没有授权使用 subagent。\n\n## 标准模式\n\n1. 识别独立问题域。\n2. 为每个问题写聚焦 prompt。\n3. 并行派发。\n4. 回收结果。\n5. 检查冲突。\n6. 跑完整验证。\n\n## 好的子代理任务\n\n应包含：\n\n- 具体范围。\n- 清晰目标。\n- 限制条件。\n- 期望输出。\n- 不要修改哪些文件。\n\n示例结构：\n\n```markdown\n修复 src/foo.test.ts 中的 3 个失败测试。\n范围只限 foo 模块。\n不要修改 bar 模块。\n最终返回根因、修改文件、验证命令和结果。\n```\n\n## 风险控制\n\n- 不让多个代理写同一文件。\n- 不把阻塞性关键任务外包出去等待。\n- 不重复派发同一问题。\n- 代理完成后要 review diff。\n- 不再需要的子代理应关闭。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/superpower|superpower]]：先判断是否需要标准/bug 流程。\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：需求未清晰时不应急着并行。\n- 与 [[AI记录/内容/rust-async-patterns|rust-async-patterns]] 等领域 Skill：子代理可各自处理独立领域。\n\n## 使用判断\n\n如果任务能被拆成不共享状态的独立块，就考虑并行；如果结果需要顺序依赖，就保持串行。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\dispatching-parallel-agents\\SKILL.md`"
    },
    {
      "id": "note-22",
      "title": "find-skills",
      "fileTitle": "find-skills",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/工具发现",
        "AI记录/已核对"
      ],
      "summary": "find skills find skills 用于发现和安装适合某个任务的 Skill。它回答的问题不是“怎么做任务”，而是“有没有现成 Skill 可以帮我做”。 一句话定位 当用户问“有没有技能能做 X”“找一个能处理 Y 的 skill”“安装某个 skill”时使用。 什么时候用 用户明确要求找 Skill。 当前任务可能已有现成 Skill，但不...",
      "wordCount": 495,
      "sourceFile": "mydata/我的数据/AI记录/内容/find-skills.md",
      "markdown": "# find-skills\n\n`find-skills` 用于发现和安装适合某个任务的 Skill。它回答的问题不是“怎么做任务”，而是“有没有现成 Skill 可以帮我做”。\n\n## 一句话定位\n\n当用户问“有没有技能能做 X”“找一个能处理 Y 的 skill”“安装某个 skill”时使用。\n\n## 什么时候用\n\n- 用户明确要求找 Skill。\n- 当前任务可能已有现成 Skill，但不确定名称。\n- 需要从 curated list 或 GitHub repo 安装 Skill。\n- 需要比较多个 Skill 的适用性。\n- 想把能力库补齐后再执行任务。\n\n## 不适合场景\n\n- 已经明确知道要用哪个 Skill。\n- 任务非常简单，直接完成更合适。\n- 用户只是问概念，不需要安装或发现工具。\n- 当前环境禁止安装新文件。\n\n## 常见工作流\n\n1. 明确用户要完成的任务类型。\n2. 搜索已有 Skill 名称和描述。\n3. 判断候选 Skill 是否匹配。\n4. 如需安装，确认来源和安装范围。\n5. 安装后读取 `SKILL.md`。\n6. 用一个小任务验证 Skill 是否可用。\n\n## 评估维度\n\n- 触发场景是否匹配。\n- 是否有清晰 `SKILL.md`。\n- 是否带脚本、模板、参考资料。\n- 是否会联网、写文件或执行命令。\n- 是否维护良好。\n- 是否和已有 Skill 重叠。\n\n## 风险控制\n\n- 不要安装来源不明的 Skill。\n- 安装前确认路径和目标目录。\n- 带脚本的 Skill 要特别检查执行内容。\n- 不要为了“看起来强”安装过多 Skill。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/skill-creator|skill-creator]]：找不到合适 Skill 时，可以创建新 Skill。\n- 与 [[AI记录/内容/superpower|superpower]]：superpower 负责流程分流，find-skills 负责能力发现。\n- 与 [[AI记录/内容/obsidian-markdown|obsidian-markdown]]：记录 Skill 目录和使用笔记时可配合使用。\n\n## 使用判断\n\n如果你已经知道应该用哪个 Skill，就不需要 find-skills；如果你只知道目标不知道工具，先用它。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\find-skills\\SKILL.md`"
    },
    {
      "id": "note-23",
      "title": "frontend-design",
      "fileTitle": "frontend-design",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/前端",
        "AI记录/设计",
        "AI记录/已核对"
      ],
      "summary": "frontend design frontend design 用于创建有明确审美方向、可运行、生产级的前端界面。它强调避免默认 AI 风格，要求根据产品语境选择清晰的视觉方向并完整执行。 一句话定位 当任务是网页、组件、页面、dashboard、应用、海报或任何 Web UI 美化时，用它把界面从“能显示”提升到“有设计判断、能使用、可验证”。 什么时候用...",
      "wordCount": 688,
      "sourceFile": "mydata/我的数据/AI记录/内容/frontend-design.md",
      "markdown": "# frontend-design\n\n`frontend-design` 用于创建有明确审美方向、可运行、生产级的前端界面。它强调避免默认 AI 风格，要求根据产品语境选择清晰的视觉方向并完整执行。\n\n## 一句话定位\n\n当任务是网页、组件、页面、dashboard、应用、海报或任何 Web UI 美化时，用它把界面从“能显示”提升到“有设计判断、能使用、可验证”。\n\n## 什么时候用\n\n- 构建网站、landing page、dashboard、Web app。\n- 写 React/Vue/Svelte/HTML/CSS UI。\n- 用户要求“美化”“更高级”“更像产品”。\n- 需要从需求生成前端界面。\n- 需要处理布局、配色、字体、动效、视觉层级。\n\n## 不适合场景\n\n- 纯后端、纯算法、纯数据处理。\n- 没有界面的 CLI 工具。\n- 只做代码性能优化，不涉及 UI。\n- 需要先澄清产品方向但还没确认设计时，应先 [[AI记录/内容/brainstorming|brainstorming]]。\n\n## 核心设计思路\n\nSkill 原文要求先理解：\n\n- Purpose：界面解决什么问题，谁使用。\n- Tone：选择明确审美方向。\n- Constraints：技术、性能、可访问性限制。\n- Differentiation：界面让人记住的点是什么。\n\n它强调大胆方向和精确执行，而不是泛泛使用模板化布局。\n\n## 审美方向\n\n可选方向包括但不限于：\n\n- brutally minimal\n- maximalist chaos\n- retro-futuristic\n- organic/natural\n- luxury/refined\n- playful/toy-like\n- editorial/magazine\n- brutalist/raw\n- art deco/geometric\n- soft/pastel\n- industrial/utilitarian\n\n关键不是越复杂越好，而是方向明确、一致、服务内容。\n\n## 实现要求\n\n最终应产出真实可运行代码，而不是只写设计描述。\n\n重点包括：\n\n- 功能完整。\n- 视觉统一。\n- 字体、色彩、空间、动效有意识。\n- 响应式可用。\n- 细节 polished。\n- 和目标用户、业务场景匹配。\n\n## 明确禁止的倾向\n\nSkill 原文明确反对：\n\n- 泛滥的紫色渐变白底。\n- 默认 Inter/Roboto/Arial/system font 一路到底。\n- 可预测、模板化、缺少语境的组件卡片堆叠。\n- 没有概念方向的“AI 生成感”界面。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：先确认产品方向和范围，再进入 frontend-design。\n- 与 [[AI记录/内容/react-best-practices|react-best-practices]]：React/Next.js 实现时补充性能规则。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：完成后用浏览器截图和交互验证。\n- 与 [[AI记录/内容/imagegen|imagegen]]：需要视觉资产时可生成位图素材。\n\n## 验证方式\n\n- 启动本地预览。\n- 截图检查桌面和移动端。\n- 检查文字是否溢出。\n- 检查按钮、状态、交互、hover、focus。\n- 检查控制台错误。\n- 对 3D/canvas/动效类页面确认非空白且帧率可接受。\n\n## 使用判断\n\n如果任务最终会被用户看见、点击或反复使用，就不要只写“能跑”的 UI，应使用 frontend-design 的判断标准。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\frontend-design\\SKILL.md`"
    },
    {
      "id": "note-24",
      "title": "gsd2",
      "fileTitle": "gsd2",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/Workflow",
        "AI记录/已核对"
      ],
      "summary": "GSD 2 是 gsd build/gsd 2 仓库中的 Agent 应用/CLI。它从早期的 prompt framework 演进为一个 TypeScript 应用，用来控制 agent session、任务调度、上下文、分支、成本和验证流程。 定位 类型：standalone CLI / agent harness。 运行基础：README 中描述为基...",
      "wordCount": 620,
      "sourceFile": "mydata/我的数据/AI记录/内容/gsd2.md",
      "markdown": "# gsd2\n\nGSD 2 是 `gsd-build/gsd-2` 仓库中的 Agent 应用/CLI。它从早期的 prompt framework 演进为一个 TypeScript 应用，用来控制 agent session、任务调度、上下文、分支、成本和验证流程。\n\n## 定位\n\n- 类型：standalone CLI / agent harness。\n- 运行基础：README 中描述为基于 Pi SDK 的 TypeScript 应用。\n- 目标：让 Agent 不只是读提示词，而是由应用层控制任务状态、上下文、恢复、验证和报告。\n- 安装入口：README 给出 `npm install -g gsd-pi@latest`。\n\n## 解决的问题\n\nGSD v1 主要依赖 Claude Code slash commands 和 markdown prompt。v2 的 README 指出它改为应用层控制，重点解决：\n\n- 长会话上下文污染。\n- 自动模式缺少真实调度。\n- 任务中断后难恢复。\n- 缺少成本、进度和 stuck 检测。\n- 缺少自动验证和报告。\n\n## 适合场景\n\n- 长任务自动推进。\n- 里程碑拆分为多个 slice。\n- 需要 worktree 隔离和顺序提交。\n- 需要任务状态、成本和 token 记录。\n- 需要自动验证、失败重试和诊断报告。\n\n## 不适合场景\n\n- 简单单文件修改。\n- 不希望自动化推进的敏感项目。\n- 没有清晰验收命令的任务。\n- 不能接受工具创建分支、worktree、日志和报告的环境。\n\n## 典型能力\n\n根据 README 的 v1/v2 对比，GSD2 关注：\n\n- fresh session per task。\n- `.gsd/` 状态机。\n- lock files + session forensics。\n- worktree isolation。\n- token/cost ledger。\n- stuck detection。\n- timeout supervision。\n- 自动 roadmap reassessment。\n- skill discovery。\n- automated verification commands。\n- HTML reports。\n\n## 使用前检查\n\n- 当前项目是否适合自动化长任务。\n- 是否有清楚的 milestone/brief。\n- 是否有测试、lint、build 命令。\n- 是否允许创建 worktree 和分支。\n- 是否能接受失败后留下 `.gsd/` 活动记录。\n\n## 风险控制\n\n- 自动推进可能扩大修改范围。\n- 多任务和 worktree 会增加合并复杂度。\n- 如果验收命令不可靠，自动验证会产生假安全感。\n- 应在任务开始前明确停止条件和人工检查点。\n\n## 与其他工具的关系\n\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：GSD2 更像 agent harness 或调度层，Codex/Claude Code 更像执行代理。\n- 与 [[AI记录/内容/brainstorming|brainstorming]] / [[AI记录/内容/Skills 搭建|Skills 搭建]]：GSD2 可利用明确计划和 skills 来推进任务。\n- 与 [[AI记录/内容/dispatching-parallel-agents|dispatching-parallel-agents]]：GSD2 的长任务自动化需要更强的任务边界和冲突控制。\n\n## 使用判断\n\n当任务已经有清晰 milestone、适合拆分执行、且有自动验证命令时，GSD2 才值得使用。普通小改动不应强行上 GSD2。\n\n## 来源\n\n- [gsd-build/gsd-2 README](https://github.com/gsd-build/gsd-2/blob/main/README.md)"
    },
    {
      "id": "note-25",
      "title": "image-manipulation-image-magick",
      "fileTitle": "image-manipulation-image-magick",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/图片",
        "AI记录/ImageMagick",
        "AI记录/已核对"
      ],
      "summary": "image manipulation image magick image manipulation image magick 用于通过 ImageMagick 对图片做确定性处理，包括尺寸读取、格式转换、缩放、缩略图和批处理。 一句话定位 当任务是“确定性图片处理”而不是 AI 生成时使用。 什么时候用 获取图片尺寸和 metadata。 单张或批量 re...",
      "wordCount": 408,
      "sourceFile": "mydata/我的数据/AI记录/内容/image-manipulation-image-magick.md",
      "markdown": "# image-manipulation-image-magick\n\n`image-manipulation-image-magick` 用于通过 ImageMagick 对图片做确定性处理，包括尺寸读取、格式转换、缩放、缩略图和批处理。\n\n## 一句话定位\n\n当任务是“确定性图片处理”而不是 AI 生成时使用。\n\n## 什么时候用\n\n- 获取图片尺寸和 metadata。\n- 单张或批量 resize。\n- 创建缩略图。\n- 格式转换。\n- 根据尺寸筛选图片。\n- 批量处理壁纸或素材。\n\n## 不适合场景\n\n- AI 图片生成或编辑，用 [[AI记录/内容/imagegen|imagegen]]。\n- 只想压缩体积，用 [[AI记录/内容/baoyu-compress-image|baoyu-compress-image]] 更直接。\n- ImageMagick 未安装且不能安装。\n\n## 前置条件\n\n- 系统安装 ImageMagick。\n- Windows PowerShell 中可通过 `magick` 调用，或从 `C:\\Program Files\\ImageMagick-*` 找到 `magick.exe`。\n- Linux/macOS 可通过包管理器安装。\n\n## 常见能力\n\n- `identify` 获取尺寸、格式、颜色空间等信息。\n- `-resize` 调整尺寸。\n- 格式转换，如 PNG → JPEG/WebP。\n- 批量遍历目录处理。\n- 保持或改变宽高比。\n\n## Windows 命令要点\n\nPowerShell 中应优先解析 `magick` 路径：\n\n```powershell\n$magick = (Get-Command magick -ErrorAction SilentlyContinue)?.Source\n```\n\n执行时用：\n\n```powershell\n& $magick identify -format \"%wx%h\" path/to/image.jpg\n```\n\n## 风险控制\n\n- 批量处理前确认输出路径。\n- 不要直接覆盖原图，除非用户明确要求。\n- Windows 路径用 `-LiteralPath` 或明确字符串，避免通配符误伤。\n- 递归处理前先列出目标文件数量。\n\n## 验证方式\n\n- 用 `identify` 检查输出尺寸。\n- 检查格式和文件大小。\n- 打开抽样图片确认视觉结果。\n- 批处理后核对文件数量。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/baoyu-compress-image|baoyu-compress-image]]：压缩优先用 baoyu；尺寸/格式/metadata 用 ImageMagick。\n- 与 [[AI记录/内容/imagegen|imagegen]]：生成用 imagegen，后处理可用 ImageMagick。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\image-manipulation-image-magick\\SKILL.md`"
    },
    {
      "id": "note-26",
      "title": "imagegen",
      "fileTitle": "imagegen",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/图片",
        "AI记录/OpenAI",
        "AI记录/已核对"
      ],
      "summary": "imagegen 用于通过 OpenAI Image API 生成或编辑图片。它适合网站素材、游戏素材、UI mockup、产品图、封面、信息图、概念图和批量变体。 一句话定位 当用户要“生成图片”或“编辑已有图片”时使用；它偏 AI 创作，不是普通压缩或格式转换。 什么时候用 生成新图片。 编辑、修图、inpaint、mask。 替换背景或移除对象。 透明...",
      "wordCount": 483,
      "sourceFile": "mydata/我的数据/AI记录/内容/imagegen.md",
      "markdown": "# imagegen\n\n`imagegen` 用于通过 OpenAI Image API 生成或编辑图片。它适合网站素材、游戏素材、UI mockup、产品图、封面、信息图、概念图和批量变体。\n\n## 一句话定位\n\n当用户要“生成图片”或“编辑已有图片”时使用；它偏 AI 创作，不是普通压缩或格式转换。\n\n## 什么时候用\n\n- 生成新图片。\n- 编辑、修图、inpaint、mask。\n- 替换背景或移除对象。\n- 透明背景。\n- 产品图、概念图、封面、hero image。\n- 批量生成多个 prompt 或 variants。\n\n## 不适合场景\n\n- 简单 resize/格式转换，用 [[AI记录/内容/image-manipulation-image-magick|ImageMagick]]。\n- 压缩图片体积，用 [[AI记录/内容/baoyu-compress-image|baoyu-compress-image]]。\n- 精确 UI 还原或 OCR。\n- 没有 `OPENAI_API_KEY` 的 live API 调用。\n\n## 决策树\n\n- 用户提供输入图，或说 edit/retouch/inpaint/mask/change only X → edit。\n- 用户需要多个 prompt 或多个资产 → batch。\n- 否则 → generate。\n\n## 工作流\n\n1. 判断 generate/edit/batch。\n2. 收集 prompt、约束、避免项、输入图、mask。\n3. 批量任务写临时 JSONL 到 `tmp/imagegen/`，用完删除。\n4. 把 prompt 整理成结构化 spec。\n5. 使用 bundled CLI：`scripts/image_gen.py`。\n6. 检查输出：主体、风格、构图、文字、保留项。\n7. 如需迭代，只做单一 targeted change。\n8. 保存最终输出，记录 prompt 和 flags。\n\n## 依赖和环境\n\n需要：\n\n- `OPENAI_API_KEY`\n- Python package：`openai`、`pillow`\n\nSkill 原文建议优先用 `uv` 安装依赖。\n\n## 默认规则\n\n- 默认模型：`gpt-image-1.5`。\n- 用户明确要求便宜/更快时才用 `gpt-image-1-mini`。\n- 使用 OpenAI Python SDK，不使用 raw HTTP。\n- 不修改 bundled CLI。\n- 不让用户在聊天里粘贴完整 API key。\n\n## 输出约定\n\n- 临时文件：`tmp/imagegen/`\n- 最终产物：`output/imagegen/`\n- 文件名稳定且有描述性。\n\n## 风险控制\n\n- 文本渲染要检查准确性。\n- 编辑任务要明确 invariants。\n- 多图编辑要标注每张图角色。\n- 不要无依据添加新创意元素。\n- API key 只要求用户本地设置。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\imagegen\\SKILL.md`"
    },
    {
      "id": "note-27",
      "title": "impeccable",
      "fileTitle": "impeccable",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/前端",
        "AI记录/设计",
        "AI记录/UIUX",
        "AI记录/已核对"
      ],
      "summary": "impeccable 是一个面向生产级前端界面的设计、审查、打磨和实现 Skill。它不只给审美建议，还要求在真实项目语境中加载产品与设计上下文，确认设计方向，再进行界面修改。 一句话定位 当任务涉及网站、landing page、dashboard、产品 UI、组件、表单、设置页、onboarding、空状态、响应式、动效、配色、排版、UX 文案或设计系统...",
      "wordCount": 2437,
      "sourceFile": "mydata/我的数据/AI记录/内容/impeccable.md",
      "markdown": "# impeccable\n\n`impeccable` 是一个面向生产级前端界面的设计、审查、打磨和实现 Skill。它不只给审美建议，还要求在真实项目语境中加载产品与设计上下文，确认设计方向，再进行界面修改。\n\n## 一句话定位\n\n当任务涉及网站、landing page、dashboard、产品 UI、组件、表单、设置页、onboarding、空状态、响应式、动效、配色、排版、UX 文案或设计系统时，用 `impeccable` 把界面提升到“有产品判断、有品牌一致性、可落地验证”的水平。\n\n## 官方推荐用法\n\n`impeccable` 的核心价值是提供一套人和 AI 共享的设计词汇。它包含 23 个设计命令，例如 polish、audit、critique、typeset、layout、animate、harden 等，每个命令都对应一种明确的设计规范，方便用自然语言或命令名精准控制设计工作。\n\n### 1. 让 Skill 决定方法\n\n不需要记住具体命令名，可以直接描述目标，让 `impeccable` 根据语义选择合适方法。\n\n```text\n/impeccable redo this hero\n```\n\n适合场景：\n\n- 你知道要改什么，但不确定该用 polish、layout、typeset 还是 bolder。\n- 你希望它根据界面问题自动选择审查、重做、排版、配色或动效方向。\n- 你想快速表达“把这个 UI 做好”，而不是先查命令表。\n\n### 2. 按名称查找命令\n\n也可以直接指定命令名，让 `impeccable` 执行某类明确设计工作。\n\n```text\n/impeccable audit checkout\n```\n\n适合场景：\n\n- 你已经知道要做 audit、polish、critique、typeset、layout、harden 等具体动作。\n- 你需要对某个页面、组件或流程执行指定设计规范。\n- 你希望输出更可控，而不是让 Skill 自行判断。\n\n单独输入 `/impeccable` 时，应展示全部 23 个命令菜单，方便按名称查找。\n\n```text\n/impeccable\n```\n\n### 3. 收藏常用命令为快捷方式\n\n可以把常用子命令 pin 成独立快捷入口。\n\n```text\n/impeccable pin audit\n```\n\n之后就可以直接使用：\n\n```text\n/audit\n```\n\n适合场景：\n\n- 某个命令会高频使用，例如 audit、polish、critique。\n- 你想减少输入成本。\n- 你希望把团队常用设计动作变成稳定快捷命令。\n\n`pin` 和 `unpin` 是管理命令，不计入 23 个设计命令本身。\n\n## 什么时候用\n\n- 用户要求设计、重设计、打磨、美化、优化、审查或改进前端界面。\n- 需要处理视觉层级、信息架构、认知负担、布局、字体、颜色、动效、微交互。\n- 需要让平庸界面更大胆，或让过度刺激的界面更安静。\n- 需要检查可访问性、性能、响应式、错误态、边界态、i18n。\n- 需要把现有 UI 抽取为可复用 token、组件或设计系统。\n- 需要在浏览器中针对 UI 元素做 live iteration。\n- 需要做产品界面和品牌页面的差异化设计判断。\n\n## 不适合场景\n\n- 纯后端、纯算法、纯 CLI、纯数据处理。\n- 只修改业务逻辑，不涉及可见界面或交互体验。\n- 尚未明确用户、产品目的和设计方向的前端实现，此时要先补上下文或进入 shape。\n- 只是普通代码 review，且不关心 UI/UX 质量。\n\n## 非可跳过前置条件\n\n`impeccable` 原文把前置检查视为强制门禁。开始任何设计或文件修改前，需要确认：\n\n- 已运行或已有 `node .agents/skills/impeccable/scripts/load-context.mjs` 的上下文结果。\n- `PRODUCT.md` 存在，且不是空文件、占位符或过短文档。\n- 使用子命令时，已读取对应 reference 文档。\n- 执行 `craft` 前，需要先通过 `shape` 得到用户确认的设计简报。\n- 需要视觉探索时，图片或 mock 探针已经生成，或明确说明跳过原因。\n- 修改项目文件前，要能说明 preflight 状态。\n\nCodex 风格执行时，修改文件前应明确声明：\n\n```text\nIMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=pass shape=pass|not_required image_gate=pass|skipped:<reason> mutation=open\n```\n\n如果 `PRODUCT.md` 不存在或质量不足，应先运行 `impeccable teach` 补上下文；如果 `DESIGN.md` 缺失，应提示用户运行 `impeccable document`，但可以继续。\n\n## register 判断\n\n每个设计任务先归类为：\n\n- **brand**：营销页、landing page、campaign、作品集、长内容页面，设计本身就是产品表达。\n- **product**：应用界面、dashboard、管理后台、工具、设置页，设计服务于任务效率。\n\n判断优先级：\n\n1. 用户任务里的明确线索。\n2. 当前页面、文件或路由的实际用途。\n3. `PRODUCT.md` 里的 `register` 字段。\n\n如果旧版 `PRODUCT.md` 没有 `register`，可以从用户和产品目的中推断一次，并建议之后用 `teach` 补齐。\n\n## 核心设计规则\n\n### 色彩\n\n- 优先使用 OKLCH。\n- 不使用纯 `#000` 或 `#fff`，中性色也应轻微偏向品牌色。\n- 先决定颜色策略，再选具体颜色。\n- 颜色策略包括 restrained、committed、full palette、drenched。\n- 不要把所有项目都收缩成保守的一色点缀方案。\n\n### 主题\n\n深色或浅色都不是默认值。先写出具体使用场景：谁在什么环境、什么光线、什么心态下使用这个界面，再由场景决定主题。\n\n### 字体\n\n- 正文行长控制在约 65 到 75 个字符。\n- 层级通过字号和字重拉开，避免所有文本像同一层级。\n- 不把默认系统字体当作唯一方案。\n\n### 布局\n\n- 间距要有节奏，不要所有区域使用同一 padding。\n- 不要把所有内容都包进卡片。\n- 卡片只在它确实是最佳承载方式时使用。\n- 禁止嵌套卡片。\n- 不要无意义地给每个区块套容器。\n\n### 动效\n\n- 不动画 CSS layout 属性。\n- 使用明确、克制、有目的的 ease-out 曲线。\n- 不使用 bounce 或 elastic 作为默认效果。\n\n## 明确禁止的设计套路\n\nSkill 原文明确要求遇到这些倾向时重写结构：\n\n- 用粗侧边框当卡片、列表项、提示框的彩色装饰。\n- 渐变文字。\n- 默认玻璃拟态。\n- SaaS 常见的大数字指标加小标签 hero 模板。\n- 无限重复的同尺寸图标卡片网格。\n- 一遇到复杂交互就先想 modal。\n- 没有上下文的 AI 风格模板化界面。\n\n## 命令速查\n\n### 构建类\n\n- `craft [feature]`：先 shape，再端到端构建功能。\n- `shape [feature]`：写代码前规划 UX/UI。\n- `teach`：建立 `PRODUCT.md` 和 `DESIGN.md` 上下文。\n- `document`：从现有项目代码生成 `DESIGN.md`。\n- `extract [target]`：抽取可复用 token 和组件。\n\n### 评估类\n\n- `critique [target]`：UX 设计评审和启发式评分。\n- `audit [target]`：技术质量检查，包括可访问性、性能、响应式。\n\n### 精修类\n\n- `polish [target]`：发布前最终质量打磨。\n- `bolder [target]`：让过于安全或平淡的设计更有记忆点。\n- `quieter [target]`：降低过度刺激或嘈杂的设计。\n- `distill [target]`：剥离复杂度，保留核心。\n- `harden [target]`：补齐错误态、i18n、边界态、生产可用性。\n- `onboard [target]`：设计首次使用、空状态和激活路径。\n\n### 增强类\n\n- `animate [target]`：加入有目的的动画。\n- `colorize [target]`：给单调 UI 加入策略性颜色。\n- `typeset [target]`：改善字体层级和排版。\n- `layout [target]`：修正间距、节奏、视觉层级。\n- `delight [target]`：加入符合产品语境的个性细节。\n- `overdrive [target]`：突破常规视觉与交互上限。\n\n### 修复类\n\n- `clarify [target]`：改善 UX 文案、标签和错误信息。\n- `adapt [target]`：适配不同设备和屏幕尺寸。\n- `optimize [target]`：诊断并修复 UI 性能问题。\n\n### 迭代类\n\n- `live`：在浏览器中选择元素并生成视觉变体。\n\n### 管理类\n\n- `pin <command>`：把某个子命令注册为独立快捷入口。\n- `unpin <command>`：移除快捷入口。\n\n## 路由规则\n\n- 没有参数时，展示命令菜单并询问用户要执行什么。\n- 第一个词匹配命令时，读取对应 reference 并按该命令流程执行。\n- 第一个词不匹配命令时，按一般设计任务处理：加载上下文、判断 register、应用共享设计规则。\n- `craft` 虽然是构建入口，但仍必须先通过 setup；如果 setup 触发 `teach`，先补上下文，再回到原任务。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：两者都服务前端界面，但 `impeccable` 更强调 PRODUCT/DESIGN 上下文、preflight 门禁、register 判断和命令化流程。\n- 与 [[AI记录/内容/ui-ux-pro-max|ui-ux-pro-max]]：`ui-ux-pro-max` 更像规则库，`impeccable` 更像带上下文、带流程的高级设计执行器。\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：需求或设计方向不清时，先用 brainstorming 明确范围和方案。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：需要浏览器中选择 UI、截图、交互检查时可配合使用。\n- 与 [[AI记录/内容/imagegen|imagegen]]：需要视觉探针、mock 或位图素材时可配合使用。\n\n## 风险控制\n\n- 不要在没有 `PRODUCT.md` 的情况下直接按用户一句话臆造品牌和产品方向。\n- 不要把 `teach` 或 `PRODUCT.md` 摘要当成 `shape` 的用户确认。\n- 不要跳过子命令 reference。\n- 不要默认选择深色、浅色、卡片网格、紫色渐变、玻璃拟态或 SaaS hero 模板。\n- 不要在未完成 preflight 前修改项目文件。\n- 如果用户点名 `impeccable`，但当前任务不是 UI 任务，应说明哪些流程不会执行以及原因。\n\n## 验证方式\n\n用于实际 UI 修改时，至少应验证：\n\n- PRODUCT/DESIGN 上下文已加载。\n- register 判断明确。\n- 对应子命令 reference 已读取。\n- shape/craft 的用户确认条件满足。\n- 桌面和移动端布局无溢出、重叠、空白关键区域。\n- 可访问性、交互状态、错误态、loading、disabled、focus 状态可用。\n- 控制台无关键错误。\n- 动效和性能没有明显卡顿。\n\n## 使用判断\n\n如果任务的结果会被用户看到、点击、阅读、评估审美或长期使用，并且你需要的不只是“写出 UI”，而是“做出有上下文、有判断、能交付的界面”，优先考虑 `impeccable`。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\impeccable\\SKILL.md`"
    },
    {
      "id": "note-28",
      "title": "internal-comms",
      "fileTitle": "internal-comms",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/写作",
        "AI记录/沟通",
        "AI记录/已核对"
      ],
      "summary": "internal comms internal comms 用于撰写内部沟通材料，例如 3P 更新、公司新闻稿、FAQ、状态报告、领导层更新、项目更新和事故报告。 一句话定位 当用户要写面向团队或公司内部的沟通文本时使用。 什么时候用 3P updates：Progress、Plans、Problems。 Company newsletter。 FAQ re...",
      "wordCount": 369,
      "sourceFile": "mydata/我的数据/AI记录/内容/internal-comms.md",
      "markdown": "# internal-comms\n\n`internal-comms` 用于撰写内部沟通材料，例如 3P 更新、公司新闻稿、FAQ、状态报告、领导层更新、项目更新和事故报告。\n\n## 一句话定位\n\n当用户要写面向团队或公司内部的沟通文本时使用。\n\n## 什么时候用\n\n- 3P updates：Progress、Plans、Problems。\n- Company newsletter。\n- FAQ responses。\n- Status reports。\n- Leadership updates。\n- Project updates。\n- Incident reports。\n\n## 不适合场景\n\n- 对外营销文案。\n- 学术论文。\n- 个人日记。\n- 技术实现代码。\n- 没有明确受众和目的的泛泛写作。\n\n## 工作流\n\n1. 识别沟通类型。\n2. 从 `examples/` 加载对应指南。\n3. 按指南收集必要信息。\n4. 写成符合公司习惯的格式、语气和结构。\n\n## 指南文件\n\nSkill 原文列出：\n\n- `examples/3p-updates.md`\n- `examples/company-newsletter.md`\n- `examples/faq-answers.md`\n- `examples/general-comms.md`\n\n如果类型不匹配，应询问格式或上下文。\n\n## 写作原则\n\n- 先明确读者是谁。\n- 先写结论和影响。\n- 明确需要谁采取行动。\n- 明确时间线。\n- 风险和问题不要埋在后面。\n- 语气应专业、直接、可执行。\n\n## 常见输入\n\n- 背景。\n- 当前状态。\n- 已完成事项。\n- 下一步计划。\n- 阻塞问题。\n- 需要决策或支持的事项。\n- 截止时间。\n\n## 验证方式\n\n- 读者能否快速知道发生了什么。\n- 是否明确下一步。\n- 是否包含必要事实。\n- 是否避免夸张和模糊。\n- 是否符合对应格式。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\internal-comms\\SKILL.md`"
    },
    {
      "id": "note-29",
      "title": "json-canvas",
      "fileTitle": "json-canvas",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Obsidian",
        "AI记录/Canvas",
        "AI记录/已核对"
      ],
      "summary": "json canvas json canvas 用于创建和编辑 Obsidian JSON Canvas 文件，也就是 .canvas 文件。它关注节点、边、位置、分组、连接关系和 JSON 合法性。 一句话定位 当任务是创建视觉画布、知识图谱、流程图、关系图或编辑 .canvas 文件时使用。 文件结构 .canvas 文件遵循 JSON Canvas S...",
      "wordCount": 431,
      "sourceFile": "mydata/我的数据/AI记录/内容/json-canvas.md",
      "markdown": "# json-canvas\n\n`json-canvas` 用于创建和编辑 Obsidian JSON Canvas 文件，也就是 `.canvas` 文件。它关注节点、边、位置、分组、连接关系和 JSON 合法性。\n\n## 一句话定位\n\n当任务是创建视觉画布、知识图谱、流程图、关系图或编辑 `.canvas` 文件时使用。\n\n## 文件结构\n\n`.canvas` 文件遵循 JSON Canvas Spec 1.0，顶层结构通常是：\n\n```json\n{\n  \"nodes\": [],\n  \"edges\": []\n}\n```\n\n## 什么时候用\n\n- 创建新的 Obsidian Canvas。\n- 添加节点。\n- 连接两个节点。\n- 编辑节点位置、文本、颜色。\n- 创建 mind map、flowchart、视觉知识图谱。\n- 把笔记和链接组织成画布。\n\n## 不适合场景\n\n- 普通 Markdown 笔记，用 [[AI记录/内容/obsidian-markdown|obsidian-markdown]]。\n- 数据表格视图，用 [[AI记录/内容/obsidian-bases|obsidian-bases]]。\n- 需要复杂图算法或自动布局但没有规则。\n\n## 节点类型\n\n常见节点：\n\n- `text`：文本节点，支持 Markdown。\n- `file`：指向 vault 内文件。\n- `link`：外部 URL。\n- `group`：分组。\n\n通用必填字段：\n\n- `id`\n- `type`\n- `x`\n- `y`\n- `width`\n- `height`\n\n## 边\n\n边连接节点：\n\n- `fromNode`\n- `toNode`\n- `fromSide`\n- `toSide`\n- `label`\n\n必须保证 `fromNode` 和 `toNode` 指向现有节点。\n\n## ID 规则\n\nSkill 原文建议生成 16 字符 hex ID，并确保所有 node/edge ID 唯一。\n\n## 创建流程\n\n1. 创建基础 JSON。\n2. 生成唯一节点 ID。\n3. 设置节点类型、坐标和尺寸。\n4. 添加边。\n5. 解析 JSON 验证。\n6. 检查所有边引用的节点存在。\n\n## 常见坑\n\n- JSON 字符串中换行应使用 `\\n`，不要写字面量 `\\\\n`。\n- 节点重叠会让画布难读。\n- 边引用不存在的 node ID 会导致关系断裂。\n- 数组顺序影响 z-index。\n\n## 验证方式\n\n- JSON 可解析。\n- ID 不重复。\n- 所有 edge 引用有效。\n- Obsidian 中打开 `.canvas` 正常。\n- 节点布局不重叠。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\json-canvas\\SKILL.md`"
    },
    {
      "id": "note-30",
      "title": "kilo code",
      "fileTitle": "kilo code",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/Agent",
        "AI记录/已核对"
      ],
      "summary": "Kilo Code 是开源 AI coding agent，官方文档显示它可作为 VS Code 扩展、JetBrains 扩展和 CLI 使用，并通过 Kilo Gateway 接入大量模型。 定位 类型：AI coding agent / IDE extension / CLI。 支持平台：VS Code、JetBrains、CLI。 核心能力：写代码、...",
      "wordCount": 512,
      "sourceFile": "mydata/我的数据/AI记录/内容/kilo code.md",
      "markdown": "# kilo code\n\nKilo Code 是开源 AI coding agent，官方文档显示它可作为 VS Code 扩展、JetBrains 扩展和 CLI 使用，并通过 Kilo Gateway 接入大量模型。\n\n## 定位\n\n- 类型：AI coding agent / IDE extension / CLI。\n- 支持平台：VS Code、JetBrains、CLI。\n- 核心能力：写代码、理解代码、编辑代码、使用 modes、custom rules、自动化、MCP server 集成。\n- 官方定位：open source coding agent。\n\n## 适合场景\n\n- 希望在 VS Code 或 JetBrains 中使用 Agent。\n- 需要不同模式处理不同任务，例如 Code、Architect、Debug、Ask。\n- 希望接入多模型或 BYOK。\n- 希望通过 MCP marketplace 加工具，例如 Context7。\n- 希望同时保留 IDE 体验和 Agent 自动化能力。\n\n## 不适合场景\n\n- 不想配置模型/provider/gateway 的简单使用场景。\n- 对所有自动化操作都要求严格人工审核，但没有配置权限策略。\n- 只需要单次问答或纯文本生成。\n\n## 安装入口\n\n官方文档示例包括：\n\n```text\ncode --install-extension kilocode.kilo-code\nnpm install -g @kilocode/cli\n```\n\n具体安装方式应以 Kilo 官方文档当前版本为准。\n\n## 典型工作流\n\n1. 在 IDE 或 CLI 安装 Kilo Code。\n2. 配置模型 provider 或 Kilo Gateway。\n3. 为项目设置 custom rules。\n4. 选择合适 mode。\n5. 让 Kilo 执行读代码、写代码、调试或解释任务。\n6. 用测试、构建和 diff 验证结果。\n\n## 风险控制\n\n- 多模型和多 provider 会增加配置复杂度。\n- 自动修复和自动化任务需要清楚权限边界。\n- 生成代码仍要做 review。\n- 涉及 MCP 时要确认外部工具权限和数据流向。\n\n## 与其他工具的比较\n\n- 与 [[AI记录/内容/trae|trae]]：Kilo 更强调开源、多平台、多模型和 Agent modes；Trae 更偏一体化 AI IDE。\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：Kilo 可接入多模型和多 IDE，Codex/Claude Code 分别偏各自厂商生态。\n- 与 [[AI记录/内容/context7|context7]]：Kilo 官方页面也把 Context7 作为减少文档幻觉的 MCP 工具示例。\n\n## 使用判断\n\n如果你希望在现有 IDE 中使用开源 Agent，并希望灵活选择模型/provider，Kilo Code 值得评估。\n\n## 来源\n\n- [Kilo Code 文档](https://kilo.ai/docs)\n- [Kilo Code 官网](https://kilo.ai/)"
    },
    {
      "id": "note-31",
      "title": "mcp-builder",
      "fileTitle": "mcp-builder",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/MCP",
        "AI记录/已核对"
      ],
      "summary": "mcp builder mcp builder 用于创建高质量 MCP server，让 LLM/Agent 能通过结构化工具调用外部 API、本地服务或业务系统。 一句话定位 不是“把 API 包一层”这么简单，而是设计一组让 Agent 能稳定完成真实任务的工具、资源、提示和错误处理。 什么时候用 需要把外部服务接入 Agent。 需要构建本地 MCP...",
      "wordCount": 775,
      "sourceFile": "mydata/我的数据/AI记录/内容/mcp-builder.md",
      "markdown": "# mcp-builder\n\n`mcp-builder` 用于创建高质量 MCP server，让 LLM/Agent 能通过结构化工具调用外部 API、本地服务或业务系统。\n\n## 一句话定位\n\n不是“把 API 包一层”这么简单，而是设计一组让 Agent 能稳定完成真实任务的工具、资源、提示和错误处理。\n\n## 什么时候用\n\n- 需要把外部服务接入 Agent。\n- 需要构建本地 MCP server。\n- 需要封装 API、数据库、文件系统、业务工具。\n- 需要设计 tool schema、权限边界、分页、过滤、错误消息。\n- 需要选择 TypeScript MCP SDK、Python SDK 或 FastMCP。\n\n## 不适合场景\n\n- 只需要普通脚本，不需要 Agent 调用。\n- API 未稳定，工具接口还无法定义。\n- 任务只有一次性手工操作。\n- 涉及高风险写入但没有权限模型。\n\n## 高层流程\n\nSkill 原文将 MCP server 开发分为四个阶段：\n\n1. 深入研究与规划。\n2. 实现。\n3. 测试和评估。\n4. 打包和文档。\n\n其中规划阶段非常关键，尤其是工具命名、上下文管理、错误消息和 API 覆盖策略。\n\n## 工具设计原则\n\n### API 覆盖 vs 工作流工具\n\n工具设计有两种方向：\n\n- 全面覆盖底层 API，给 Agent 组合空间。\n- 提供高层 workflow tool，让常见任务更方便。\n\n不确定时，Skill 原文建议优先更完整的 API 覆盖。\n\n### 命名和可发现性\n\n工具名应清晰、动作导向、有一致前缀，例如：\n\n```text\ngithub_create_issue\ngithub_list_repos\nnotion_search_pages\n```\n\n### 上下文控制\n\n工具输出不能无节制返回大对象。应支持：\n\n- 分页。\n- 过滤。\n- 字段选择。\n- 限制返回条数。\n- 聚焦错误信息。\n\n### 错误消息\n\n错误信息要告诉 Agent 下一步怎么办，而不是只返回“失败”。\n\n好的错误应包含：\n\n- 失败原因。\n- 可修复建议。\n- 需要补充的参数。\n- 权限或认证提示。\n\n## 推荐技术栈\n\nSkill 原文推荐 TypeScript 作为默认方向，因为 SDK 支持好、兼容性强、模型生成质量高。Transport 选择：\n\n- 远程 server：Streamable HTTP。\n- 本地工具：stdio。\n\nPython/FastMCP 也适合快速构建和 Python 生态集成。\n\n## 风险控制\n\n- 写入、删除、发送、支付、发布等工具应默认保守。\n- 工具输入 schema 必须严格。\n- 不把密钥暴露给模型。\n- 认证失败要清楚返回。\n- 对批量操作提供 dry-run 或显式确认。\n- 日志不要记录敏感信息。\n\n## 验证方式\n\n至少测试：\n\n- 正常输入。\n- 缺失参数。\n- 错误参数。\n- 权限不足。\n- 外部服务超时。\n- 空结果。\n- 分页。\n- 高风险工具的保护逻辑。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/context7|context7]]：查 MCP SDK 和依赖库文档。\n- 与 [[AI记录/内容/skill-creator|skill-creator]]：把 MCP 开发经验沉淀成团队 Skill。\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：先确认 server 解决什么工作流问题。\n- 与 [[AI记录/内容/verification-before-completion|verification-before-completion]]：完成前必须有真实工具调用验证。\n\n## 使用判断\n\n如果一个外部能力会被 Agent 反复调用，且需要权限、上下文、错误处理和稳定 schema，就应该考虑用 mcp-builder 设计 MCP server。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\mcp-builder\\SKILL.md`"
    },
    {
      "id": "note-32",
      "title": "obsidian-bases",
      "fileTitle": "obsidian-bases",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Obsidian",
        "AI记录/Bases",
        "AI记录/已核对"
      ],
      "summary": "obsidian bases obsidian bases 用于创建和编辑 Obsidian Bases，也就是 .base 文件。Bases 能把笔记集合以 table、cards、list、map 等视图展示，并支持 filters、formulas、summaries。 一句话定位 当需要把 Obsidian 笔记变成“数据库视图”时使用。 什么时候用...",
      "wordCount": 367,
      "sourceFile": "mydata/我的数据/AI记录/内容/obsidian-bases.md",
      "markdown": "# obsidian-bases\n\n`obsidian-bases` 用于创建和编辑 Obsidian Bases，也就是 `.base` 文件。Bases 能把笔记集合以 table、cards、list、map 等视图展示，并支持 filters、formulas、summaries。\n\n## 一句话定位\n\n当需要把 Obsidian 笔记变成“数据库视图”时使用。\n\n## 什么时候用\n\n- 创建 `.base` 文件。\n- 管理项目、资料、任务、工具索引。\n- 按 tag、folder、property、date 筛选笔记。\n- 配置 table/cards/list/map 视图。\n- 添加公式属性和汇总。\n\n## 不适合场景\n\n- 只写普通笔记，用 [[AI记录/内容/obsidian-markdown|obsidian-markdown]]。\n- 画关系图，用 [[AI记录/内容/json-canvas|json-canvas]]。\n- 笔记缺少统一 properties 时，先补元数据。\n\n## 基础结构\n\n`.base` 文件是 YAML：\n\n```yaml\nfilters:\n  and: []\n\nformulas:\n  formula_name: 'expression'\n\nproperties:\n  property_name:\n    displayName: \"Display Name\"\n\nviews:\n  - type: table\n    name: \"View Name\"\n    order:\n      - file.name\n      - property_name\n```\n\n## 工作流\n\n1. 创建 `.base` 文件。\n2. 定义全局 filters。\n3. 可选：添加 formulas。\n4. 配置一个或多个 views。\n5. 验证 YAML。\n6. 在 Obsidian 中打开测试。\n\n## Filter\n\nFilters 可写成字符串，也可用 `and`、`or`、`not` 组合。\n\n示例：\n\n```yaml\nfilters:\n  and:\n    - 'status == \"done\"'\n    - 'priority > 3'\n```\n\n常用函数包括 tag、folder、link、date/property 判断，具体以 Obsidian Bases 当前语法为准。\n\n## 常见坑\n\n- 含特殊字符的 YAML 字符串未加引号。\n- formula 中引号不匹配。\n- 使用 `formula.X` 但未在 `formulas` 中定义。\n- view 的 `order` 引用了不存在的 property。\n\n## 本项目可用场景\n\nAI记录 可以考虑建立：\n\n- 常用 Skills Base。\n- 常用 MCP Base。\n- AI 工具调研 Base。\n- 待核对工具 Base。\n\n## 验证方式\n\n- YAML 可解析。\n- 引用的 property 和 formula 存在。\n- Obsidian 打开无 YAML error。\n- 视图筛选、排序和显示符合预期。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\obsidian-bases\\SKILL.md`"
    },
    {
      "id": "note-33",
      "title": "obsidian-markdown",
      "fileTitle": "obsidian-markdown",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Obsidian",
        "AI记录/已核对"
      ],
      "summary": "obsidian markdown obsidian markdown 用于创建和编辑 Obsidian Flavored Markdown。它覆盖 Obsidian 特有语法：wikilinks、embeds、callouts、properties、tags、comments、highlight、Mermaid、footnotes 等。 一句话定位 当任务...",
      "wordCount": 472,
      "sourceFile": "mydata/我的数据/AI记录/内容/obsidian-markdown.md",
      "markdown": "# obsidian-markdown\n\n`obsidian-markdown` 用于创建和编辑 Obsidian Flavored Markdown。它覆盖 Obsidian 特有语法：wikilinks、embeds、callouts、properties、tags、comments、highlight、Mermaid、footnotes 等。\n\n## 一句话定位\n\n当任务是在 Obsidian vault 中写 `.md` 笔记、整理目录、创建内部链接或使用 Obsidian 特有语法时使用。\n\n## 什么时候用\n\n- 创建 Obsidian 笔记。\n- 编辑 `.md` 文档并需要 Obsidian 内链。\n- 使用 `[[wikilinks]]`。\n- 添加 frontmatter/properties。\n- 嵌入图片、PDF、音频、视频或其他笔记。\n- 创建 callouts。\n- 创建 Mermaid 图或块链接。\n\n## 不适合场景\n\n- 普通 GitHub Markdown 文档，且不需要 Obsidian 语法。\n- 纯代码实现。\n- 非 Markdown 文件。\n- 需要结构化 Base 时应同时考虑 [[AI记录/内容/obsidian-bases|obsidian-bases]]。\n\n## 创建笔记流程\n\nSkill 原文给出的基本流程：\n\n1. 在顶部添加 frontmatter/properties。\n2. 用标准 Markdown 写正文结构。\n3. 用 wikilinks 连接 vault 内笔记。\n4. 用 embeds 嵌入笔记、图片或 PDF。\n5. 用 callouts 强调信息。\n6. 在 Obsidian 阅读视图中验证渲染。\n\n## 内部链接规则\n\nvault 内笔记优先用 wikilinks：\n\n```markdown\n[[Note Name]]\n[[Note Name|Display Text]]\n[[Note Name#Heading]]\n[[Note Name#^block-id]]\n[[#Heading in same note]]\n```\n\n外部网址用普通 Markdown 链接：\n\n```markdown\n[OpenAI](https://openai.com/)\n```\n\n## Embeds\n\n用 `!` 前缀嵌入内容：\n\n```markdown\n![[Note Name]]\n![[Note Name#Heading]]\n![[image.png]]\n![[image.png|300]]\n![[document.pdf#page=3]]\n```\n\n## Callouts\n\n常见写法：\n\n```markdown\n> [!note]\n> 基础说明。\n\n> [!warning] 自定义标题\n> 需要注意的内容。\n\n> [!faq]- 默认折叠\n> 可折叠内容。\n```\n\n常见类型包括：`note`、`tip`、`warning`、`info`、`example`、`quote`、`bug`、`danger`、`success`、`question`、`abstract`、`todo`。\n\n## Properties 示例\n\n```yaml\n---\ntitle: My Note\ndate: 2026-04-29\ntags:\n  - project\n  - active\naliases:\n  - Alternative Name\ncssclasses:\n  - custom-class\n---\n```\n\n## 本项目约定\n\n当前 AI记录 采用：\n\n- `目录` 文件夹：只做索引。\n- `内容` 文件夹：放详细正文。\n- 目录页链接内容页，例如 `[[AI记录/内容/context7|context7]]`。\n- 对不确定工具标注“待核对”，不写成事实。\n\n## 风险和注意事项\n\n- 不要把目录页写成长文。\n- 文件名变化会影响普通链接，wikilinks 更适合 vault 内部。\n- 需要避免终端编码误判导致乱码。\n- 不确定的外部信息要注明来源和检查日期。\n\n## 验证方式\n\n- UTF-8 读取正常。\n- `rg` 检查常见乱码片段。\n- 目录链接有对应 `.md` 文件。\n- Obsidian 阅读视图中 callout、embed、properties 正常。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\obsidian-markdown\\SKILL.md`"
    },
    {
      "id": "note-34",
      "title": "pencil AI 工具",
      "fileTitle": "pencil AI 工具",
      "categories": [
        "其他AI 工具"
      ],
      "tags": [
        "AI记录/工具",
        "AI记录/待核对"
      ],
      "summary": "pencil 这个名称有多个可能指向。当前不能直接写成单一确定工具，需要先确认你目录里指的是哪一个。 已发现的候选 候选 1：Pencil by TryPencil TryPencil 是面向广告创意的 AI 平台。官方帮助中心描述：Pencil 使用 AI 生成广告，并连接品牌媒体账号来预测哪些内容更可能有效。 适合场景： 生成广告文案和视觉创意。 做 F...",
      "wordCount": 719,
      "sourceFile": "mydata/我的数据/AI记录/内容/pencil AI 工具.md",
      "markdown": "# pencil AI 工具\n\n`pencil` 这个名称有多个可能指向。当前不能直接写成单一确定工具，需要先确认你目录里指的是哪一个。\n\n## 已发现的候选\n\n### 候选 1：Pencil by TryPencil\n\nTryPencil 是面向广告创意的 AI 平台。官方帮助中心描述：Pencil 使用 AI 生成广告，并连接品牌媒体账号来预测哪些内容更可能有效。\n\n适合场景：\n\n- 生成广告文案和视觉创意。\n- 做 Facebook、Instagram、TikTok、Google 等广告素材。\n- 基于历史广告数据做 creative prediction。\n- 团队协作、审批和发布广告创意。\n\n不适合场景：\n\n- 代码生成。\n- 本地 Agent 工作流。\n- Obsidian 笔记管理。\n- 设计稿到代码的开发者工作流。\n\n### 候选 2：Pencil agent-driven design tool\n\n公开资料中也出现了面向开发者的 Pencil 设计工具，被描述为 agent-driven design platform 或 AI-powered product/project/design tool。它更接近“设计画布 + AI Agent”方向。\n\n适合场景：\n\n- 通过 prompt 生成可编辑视觉设计。\n- 类 Figma 的设计探索。\n- 从产品想法生成界面原型。\n- 与前端实现衔接。\n\n不适合场景：\n\n- 广告投放和素材预测。\n- 代码库语义检索。\n- MCP server，除非另有 OpenPencil/Pencil MCP 配置。\n\n### 候选 3：OpenPencil / Pencil MCP\n\n如果这里的 `pencil` 和 [[AI记录/内容/pencil MCP|pencil MCP]] 是同一个方向，则它可能指 OpenPencil 的 MCP server，用于让 Agent 读取或修改设计文件。\n\n## 如何确认是哪一个\n\n建议用以下问题核对：\n\n- 你当时记录 `pencil` 是因为广告素材、设计稿，还是 MCP/Agent？\n- 有没有对应网址、安装命令、截图或笔记来源？\n- 是否曾经安装过 `openpencil-mcp` 或类似命令？\n- 你希望它解决“广告创意”“产品设计”“任务管理”还是“前端设计转代码”？\n\n## 如果是广告平台 Pencil\n\n记录重点：\n\n- 官网和帮助中心。\n- 账号与团队权限。\n- 支持的广告渠道。\n- 输入素材类型。\n- 是否能接入品牌资产库。\n- 输出是否包含图片、视频、文案、预测评分。\n- 数据和版权政策。\n\n## 如果是设计工具 Pencil\n\n记录重点：\n\n- 设计文件格式。\n- 是否支持可编辑画布。\n- 是否支持导出代码。\n- 是否支持本地文件。\n- 是否支持 Agent 或 MCP。\n- 与 Figma、OpenPencil、v0、Galileo、Uizard 的差异。\n\n## 如果是 MCP 工具\n\n应和 [[AI记录/内容/pencil MCP|pencil MCP]] 合并或互链，重点记录：\n\n- MCP server 安装方式。\n- 暴露的 tools。\n- 文件读写权限。\n- 设计文件目录。\n- 是否只读或可写。\n\n## 当前结论\n\n保持待核对。不要把 `pencil` 写成确定的常用工具，直到确认具体来源。\n\n## 推荐下一步\n\n在该文档顶部补一行：\n\n```markdown\n确认结果：<TryPencil / agent-driven design tool / OpenPencil MCP / 其他>\n```\n\n确认后再将本文改成正式工具说明。\n\n## 来源\n\n- [TryPencil 官网](https://www.trypencil.com/)\n- [TryPencil Help Center: What is Pencil?](https://help.trypencil.com/en/articles/10106178-what-is-pencil)\n- [Pencil agent-driven design tool 介绍候选](https://betterstack.com/community/guides/ai/pencil-ai/)\n- [Pencil product/project management 候选](https://pencil.ink/)"
    },
    {
      "id": "note-35",
      "title": "pencil MCP",
      "fileTitle": "pencil MCP",
      "categories": [
        "常用MCP"
      ],
      "tags": [
        "AI记录/MCP",
        "AI记录/设计工具",
        "AI记录/待核对"
      ],
      "summary": "这里的 pencil 需要先确认具体指向。公开资料中较接近的是 OpenPencil 的 MCP server：它让 AI coding tools 通过 MCP 读取和修改 OpenPencil 设计文件。但如果你说的是另一个 Pencil/Pencil Spaces/Pencil.dev，需要再核对名称。 候选：OpenPencil MCP OpenPe...",
      "wordCount": 520,
      "sourceFile": "mydata/我的数据/AI记录/内容/pencil MCP.md",
      "markdown": "# pencil MCP\n\n这里的 `pencil` 需要先确认具体指向。公开资料中较接近的是 OpenPencil 的 MCP server：它让 AI coding tools 通过 MCP 读取和修改 OpenPencil 设计文件。但如果你说的是另一个 Pencil/Pencil Spaces/Pencil.dev，需要再核对名称。\n\n## 候选：OpenPencil MCP\n\nOpenPencil 文档说明它包含 MCP server，可让 Claude Code、Cursor、Windsurf 等 AI coding tools 通过正在运行的 OpenPencil app 读取和修改设计。\n\n## 定位\n\n- 类型：设计工具 MCP server。\n- 传输方式：stdio 和 HTTP。\n- 适合对象：支持 MCP 的 AI coding tools。\n- 核心能力：通过运行中的 OpenPencil app 访问设计文档。\n\n## 适合场景\n\n- 让 Agent 读取设计稿。\n- 让 Agent 修改 OpenPencil 设计。\n- 把设计和代码工作流连接起来。\n- 用设计文件作为前端实现参考。\n\n## 不适合场景\n\n- 纯代码库语义检索，这更适合 [[AI记录/内容/serena|serena]]。\n- 查库文档，这更适合 [[AI记录/内容/context7|context7]]。\n- 未确认工具来源时直接安装。\n- 涉及敏感设计文件但未配置权限边界。\n\n## 安装和运行信息\n\nOpenPencil 文档给出的安装方式包括：\n\n```text\nbun add -g @open-pencil/mcp\n```\n\nstdio server 示例命令为：\n\n```text\nopenpencil-mcp\n```\n\nHTTP server 示例命令为：\n\n```text\nopenpencil-mcp-http\n```\n\n文档还说明 stdio server 会通过 WebSocket 连接正在运行的 OpenPencil app，默认端口涉及 `7601`；HTTP server 默认绑定 `127.0.0.1`，默认端口 `7600`。\n\n## 安全注意\n\nOpenPencil 文档列出了一些安全默认值：\n\n- HTTP 默认绑定本机地址。\n- `eval` 工具默认禁用。\n- 文件操作限制在 `OPENPENCIL_MCP_ROOT`。\n- CORS 默认禁用。\n- 可配置 auth token。\n\n实际使用前仍应核对当前版本文档。\n\n## 待确认问题\n\n- 你目录里的 `pencil` 是否就是 OpenPencil。\n- 是否已经本地安装 OpenPencil app。\n- 是否需要通过 MCP 修改设计，还是只读设计。\n- 设计文件是否放在安全工作目录内。\n- 是否要和前端实现文档建立链接。\n\n## 使用判断\n\n只有在确认 `pencil` 指的是 OpenPencil 或同一类设计 MCP 后，才应纳入常用 MCP。否则保留为候选项。\n\n## 来源\n\n- [OpenPencil MCP Server 文档](https://openpencil.dev/programmable/mcp-server)\n- [Pencil Spaces viaSocket MCP 候选页](https://viasocket.com/mcp/pencilspaces)"
    },
    {
      "id": "note-36",
      "title": "playwright-interactive",
      "fileTitle": "playwright-interactive",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/浏览器",
        "AI记录/前端测试",
        "AI记录/已核对"
      ],
      "summary": "playwright interactive playwright interactive 使用持久 js repl Playwright 会话调试 Web 或 Electron 应用。它强调不要每次重启工具链，而是复用浏览器、页面和 Electron handles 做迭代 QA。 一句话定位 当前端或 Electron 应用需要真实交互验证、截图、控制台...",
      "wordCount": 517,
      "sourceFile": "mydata/我的数据/AI记录/内容/playwright-interactive.md",
      "markdown": "# playwright-interactive\n\n`playwright-interactive` 使用持久 `js_repl` Playwright 会话调试 Web 或 Electron 应用。它强调不要每次重启工具链，而是复用浏览器、页面和 Electron handles 做迭代 QA。\n\n## 一句话定位\n\n当前端或 Electron 应用需要真实交互验证、截图、控制台检查和移动端/桌面端 QA 时使用。\n\n## 什么时候用\n\n- 本地 Web app 调试。\n- Electron app 调试。\n- 前端功能 QA。\n- 视觉 QA、截图、响应式检查。\n- 检查控制台错误。\n- 验证用户交互和状态变化。\n\n## 不适合场景\n\n- 只做静态网页搜索。\n- 不需要真实浏览器的纯代码改动。\n- 环境没有 `js_repl`。\n- 不能安装 Playwright 或不能启动浏览器。\n\n## 前置条件\n\nSkill 原文要求：\n\n- 启用 `js_repl`。\n- 必要时在 `~/.codex/config.toml` 中开启：\n\n```toml\n[features]\njs_repl = true\n```\n\n- 从目标项目目录安装和导入 Playwright。\n- 当前要求在无沙盒或合适权限下运行。\n\n## 核心流程\n\n1. 写 QA inventory。\n2. 运行 bootstrap cell。\n3. 启动或确认 dev server。\n4. 启动浏览器或 Electron，并复用 handles。\n5. 代码修改后按类型 reload 或 relaunch。\n6. 做 functional QA。\n7. 单独做 visual QA。\n8. 截图和 viewport fit 检查。\n9. 任务完成后再清理会话。\n\n## QA inventory\n\n这是该 Skill 的重点：测试前要列出你打算最终声称完成的用户可见行为，并为每个声明安排证据。\n\n应包含：\n\n- 用户要求。\n- 实际实现的可见功能。\n- 最终回答中打算声称的内容。\n- 每个控件的状态变化。\n- 至少 2 个非 happy path 场景。\n\n## 验证重点\n\n- 控件是否可点击。\n- 状态是否正确变化。\n- 页面是否适配 viewport。\n- 文本是否溢出。\n- 控制台是否有错误。\n- 截图是否能支持最终声明。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：UI 实现后用它做浏览器验证。\n- 与 [[AI记录/内容/react-best-practices|react-best-practices]]：React 性能和结构问题可结合检查。\n- 与 [[AI记录/内容/agent-browser|agent-browser]] / [[AI记录/内容/browser-use|browser-use]]：这些更偏网页自动化任务；Playwright interactive 更偏开发 QA。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\playwright-interactive\\SKILL.md`"
    },
    {
      "id": "note-37",
      "title": "react-best-practices",
      "fileTitle": "react-best-practices",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/React",
        "AI记录/Nextjs",
        "AI记录/已核对"
      ],
      "summary": "react best practices react best practices 是基于 Vercel Engineering 的 React/Next.js 性能优化指南，包含 8 类、57 条规则。它用于写、审查或重构 React/Next.js 代码时避免常见性能问题。 一句话定位 当任务涉及 React 组件、Next.js 页面、数据获取、bun...",
      "wordCount": 645,
      "sourceFile": "mydata/我的数据/AI记录/内容/react-best-practices.md",
      "markdown": "# react-best-practices\n\n`react-best-practices` 是基于 Vercel Engineering 的 React/Next.js 性能优化指南，包含 8 类、57 条规则。它用于写、审查或重构 React/Next.js 代码时避免常见性能问题。\n\n## 一句话定位\n\n当任务涉及 React 组件、Next.js 页面、数据获取、bundle、渲染性能或性能优化时，用它做工程约束。\n\n## 什么时候用\n\n- 新写 React 组件或 Next.js 页面。\n- 审查 React/Next.js 代码。\n- 优化加载速度、bundle size、渲染性能。\n- 处理数据获取、Suspense、Server Components、Client Components。\n- 排查重复渲染和 hydration 后性能问题。\n\n## 不适合场景\n\n- 非 React/Next.js 项目。\n- 纯 UI 审美设计，应先看 [[AI记录/内容/frontend-design|frontend-design]]。\n- 纯后端逻辑。\n- 未涉及性能和结构的简单文案改动。\n\n## 规则优先级\n\nSkill 原文将规则分为 8 类：\n\n| 优先级 | 类别 | 影响 |\n|---|---|---|\n| 1 | Eliminating Waterfalls | CRITICAL |\n| 2 | Bundle Size Optimization | CRITICAL |\n| 3 | Server-Side Performance | HIGH |\n| 4 | Client-Side Data Fetching | MEDIUM-HIGH |\n| 5 | Re-render Optimization | MEDIUM |\n| 6 | Rendering Performance | MEDIUM |\n| 7 | JavaScript Performance | LOW-MEDIUM |\n| 8 | Advanced Patterns | LOW |\n\n## 重点规则\n\n### Eliminating Waterfalls\n\n- 独立异步任务用 `Promise.all()` 并行。\n- 在真正需要数据的分支中再 `await`。\n- API route 中尽早启动 promise，尽晚等待。\n- 用 Suspense streaming 减少等待链。\n\n### Bundle Size\n\n- 避免 barrel imports。\n- 大组件使用 dynamic import。\n- 第三方 analytics/logging 延后加载。\n- 功能激活时再加载相关模块。\n\n### Server-Side\n\n- Server Actions 要像 API route 一样做鉴权。\n- 使用 React.cache 做单请求内去重。\n- 减少传给 Client Components 的序列化数据。\n- 并行化 server fetch。\n\n### Client-Side\n\n- 使用 SWR 等机制去重请求。\n- 全局事件监听要去重。\n- scroll/touch 监听优先 passive。\n- localStorage 数据要最小化和版本化。\n\n### Re-render\n\n- 不要订阅只在 callback 中使用的 state。\n- 默认非 primitive props 要 hoist。\n- effect 依赖尽量使用 primitive。\n- 能在 render 中派生的状态不要用 effect 同步。\n\n## 常见检查问题\n\n- 是否存在串行 fetch waterfall。\n- 是否把 server-only 数据传给 client。\n- 是否有不必要的 client component。\n- 是否引入整个库而不是单个模块。\n- 是否有重复事件监听。\n- 是否因为对象/数组默认值导致 memo 失效。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：前者管体验和视觉，react-best-practices 管 React/Next.js 工程性能。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：用浏览器验证交互、加载和错误。\n- 与 [[AI记录/内容/context7|context7]]：涉及最新 React/Next.js API 时查官方文档。\n\n## 验证方式\n\n- 运行测试。\n- 运行构建。\n- 检查 bundle。\n- 使用 React DevTools 或浏览器性能工具。\n- 对关键页面做加载和交互验证。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\react-best-practices\\SKILL.md`"
    },
    {
      "id": "note-38",
      "title": "remotion-best-practices",
      "fileTitle": "remotion-best-practices",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/视频",
        "AI记录/React",
        "AI记录/Remotion",
        "AI记录/已核对"
      ],
      "summary": "remotion best practices remotion best practices 用于 Remotion 视频项目。它把 React 组件、时间轴、音频、字幕、素材、渲染检查和 FFmpeg 辅助流程组织成可查规则。 一句话定位 当任务涉及 Remotion 视频、composition、动画、字幕、音频、渲染或素材处理时使用。 什么时候用 创...",
      "wordCount": 531,
      "sourceFile": "mydata/我的数据/AI记录/内容/remotion-best-practices.md",
      "markdown": "# remotion-best-practices\n\n`remotion-best-practices` 用于 Remotion 视频项目。它把 React 组件、时间轴、音频、字幕、素材、渲染检查和 FFmpeg 辅助流程组织成可查规则。\n\n## 一句话定位\n\n当任务涉及 Remotion 视频、composition、动画、字幕、音频、渲染或素材处理时使用。\n\n## 什么时候用\n\n- 创建 Remotion 项目。\n- 编写视频 composition。\n- 处理字幕、音频、视频素材。\n- 做时间轴动画。\n- 渲染单帧或完整视频。\n- 使用 FFmpeg 做剪辑、静音检测、转码。\n\n## 不适合场景\n\n- 普通 React Web UI。\n- 不涉及视频时间轴的动画。\n- 纯图片生成。\n- 纯 FFmpeg 批处理可以直接用 [[AI记录/内容/ffmpeg|ffmpeg]] 类技能，如果可用。\n\n## 新项目初始化\n\nSkill 原文推荐空目录中使用：\n\n```bash\nnpx create-video@latest --yes --blank --no-tailwind my-video\n```\n\n`my-video` 应替换为合适项目名。\n\n## 启动预览\n\n```bash\nnpx remotion studio\n```\n\nRemotion Studio 用于预览 composition、检查时间轴和调试视觉结果。\n\n## 单帧渲染检查\n\n可用单帧渲染 sanity check：\n\n```bash\nnpx remotion still [composition-id] --scale=0.25 --frame=30\n```\n\n在 30fps 下，`--frame=30` 是第 1 秒位置。对琐碎改动或已有足够预览信心时可以跳过。\n\n## 规则文件\n\n该 Skill 有大量细分规则，按需读取：\n\n- `rules/animations.md`：动画基础。\n- `rules/assets.md`：素材导入。\n- `rules/audio.md`：音频处理。\n- `rules/compositions.md`：composition 定义。\n- `rules/sequencing.md`：时间序列。\n- `rules/timing.md`：interpolate、Bezier、spring。\n- `rules/videos.md`：视频嵌入、裁剪、音量、循环。\n- `rules/subtitles.md`：字幕。\n- `rules/ffmpeg.md`：FFmpeg。\n- `rules/silence-detection.md`：静音检测。\n- `rules/audio-visualization.md`：音频可视化。\n\n## 常见风险\n\n- 随机数和异步加载导致渲染不确定。\n- 字幕或文字溢出。\n- 视频素材尺寸和帧率不匹配。\n- 音频和画面不同步。\n- 外部资源加载失败。\n- 长视频渲染成本高。\n\n## 验证方式\n\n- Studio 预览关键时间点。\n- 渲染单帧检查构图。\n- 渲染短片段检查动画、字幕、音频。\n- 最后再渲染完整视频。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/react-best-practices|react-best-practices]]：Remotion 也是 React，但视频渲染约束不同。\n- 与 [[AI记录/内容/ffmpeg|ffmpeg]]：视频剪辑、静音检测、格式处理常用 FFmpeg。\n- 与 [[AI记录/内容/imagegen|imagegen]]：需要视觉素材时生成图片。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\remotion-best-practices\\SKILL.md`"
    },
    {
      "id": "note-39",
      "title": "rust-async-patterns",
      "fileTitle": "rust-async-patterns",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Rust",
        "AI记录/Async",
        "AI记录/已核对"
      ],
      "summary": "rust async patterns rust async patterns 用于 Rust async/Tokio 并发编程，包括 Future、Task、Runtime、channel、stream、错误处理和性能调优。 一句话定位 当任务涉及 Rust 异步应用、并发服务、Tokio runtime 或 async bug 时使用。 什么时候用 构建...",
      "wordCount": 353,
      "sourceFile": "mydata/我的数据/AI记录/内容/rust-async-patterns.md",
      "markdown": "# rust-async-patterns\n\n`rust-async-patterns` 用于 Rust async/Tokio 并发编程，包括 Future、Task、Runtime、channel、stream、错误处理和性能调优。\n\n## 一句话定位\n\n当任务涉及 Rust 异步应用、并发服务、Tokio runtime 或 async bug 时使用。\n\n## 什么时候用\n\n- 构建 async Rust 应用。\n- 实现并发网络服务。\n- 使用 Tokio async I/O。\n- 处理 async 错误。\n- 调试 async 代码。\n- 优化 async 性能。\n\n## 不适合场景\n\n- 普通同步 Rust 代码，可用 [[AI记录/内容/rust-best-practices|rust-best-practices]]。\n- 非 Rust 项目。\n- 单纯格式化或文档改动。\n\n## 核心模型\n\nFuture 是惰性计算，由 runtime poll：\n\n```text\nFuture -> poll() -> Ready(value) | Pending\n              ^                 |\n              |                 v\n            Waker <- Runtime schedules\n```\n\n关键概念：\n\n- `Future`\n- `async fn`\n- `await`\n- `Task`\n- `Runtime`\n\n## 常用依赖\n\nSkill 原文 Quick Start 包括：\n\n- `tokio`\n- `futures`\n- `async-trait`\n- `anyhow`\n- `tracing`\n- `tracing-subscriber`\n\n## 常见模式\n\n- 使用 `JoinSet` 并发执行多个任务。\n- 使用 channel 进行任务通信。\n- 使用 timeout 和 cancellation。\n- 使用 tracing 记录 async 任务行为。\n- 避免锁跨 `await`。\n- 处理 JoinError 和任务内部错误。\n\n## 常见坑\n\n- Future 不 await 就不会执行。\n- 在 async context 中做阻塞 I/O。\n- `MutexGuard` 跨 await。\n- 忽略 spawned task 的 JoinHandle。\n- 错误被 task 吞掉。\n- 无限并发导致资源耗尽。\n\n## 验证方式\n\n- 单元测试和集成测试。\n- timeout 测试。\n- 并发压力测试。\n- tracing 日志检查。\n- 对 cancellation 和错误路径做测试。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/rust-best-practices|rust-best-practices]]：async 专项 + Rust 通用规范。\n- 与 systematic debugging：async bug 通常需要先复现和定位。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\rust-async-patterns\\SKILL.md`"
    },
    {
      "id": "note-40",
      "title": "rust-best-practices",
      "fileTitle": "rust-best-practices",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/Rust",
        "AI记录/已核对"
      ],
      "summary": "rust best practices rust best practices 基于 Apollo GraphQL 的 Rust Best Practices Handbook，用于编写、审查和重构 idiomatic Rust。 一句话定位 当任务涉及 Rust 代码质量、所有权、错误处理、性能、测试或文档时使用。 什么时候用 写新的 Rust 函数或模块...",
      "wordCount": 361,
      "sourceFile": "mydata/我的数据/AI记录/内容/rust-best-practices.md",
      "markdown": "# rust-best-practices\n\n`rust-best-practices` 基于 Apollo GraphQL 的 Rust Best Practices Handbook，用于编写、审查和重构 idiomatic Rust。\n\n## 一句话定位\n\n当任务涉及 Rust 代码质量、所有权、错误处理、性能、测试或文档时使用。\n\n## 什么时候用\n\n- 写新的 Rust 函数或模块。\n- 审查 Rust 代码。\n- 重构 Rust 项目。\n- 判断 borrow vs clone。\n- 实现 `Result` 错误处理。\n- 优化 Rust 性能。\n- 写测试或文档。\n\n## 不适合场景\n\n- 非 Rust 项目。\n- Rust async/Tokio 专项问题，应同时看 [[AI记录/内容/rust-async-patterns|rust-async-patterns]]。\n- 只改 README 文案且不涉及 Rust API。\n\n## 参考章节\n\nSkill 原文要求按需读取 references：\n\n- Coding Styles and Idioms。\n- Clippy and Linting。\n- Performance Mindset。\n- Error Handling。\n- Automated Testing。\n- Generics and Dispatch。\n- Type State Pattern。\n- Comments vs Documentation。\n- Understanding Pointers。\n\n## 快速规则\n\n### Borrowing & Ownership\n\n- 参数优先用 `&T`、`&str`、`&[T]`。\n- 避免不必要 `.clone()`。\n- 小 `Copy` 类型可按值传递。\n- 所有权不明确时考虑 `Cow<'_, T>`。\n\n### Error Handling\n\n- fallible 操作用 `Result<T, E>`。\n- 生产代码避免 `unwrap()` / `expect()`。\n- library 用 `thiserror`。\n- binary 可用 `anyhow`。\n- 优先使用 `?` 传播错误。\n\n### Performance\n\n- benchmark 使用 `--release`。\n- 避免循环中 clone。\n- 避免不必要 `collect()`。\n- 注意大 enum variant。\n\n### Linting\n\n推荐命令：\n\n```bash\ncargo clippy --all-targets --all-features --locked -- -D warnings\n```\n\n优先用 `#[expect(clippy::lint)]` 并写理由，而不是无理由 `allow`。\n\n### Testing\n\n- 测试名描述行为。\n- 尽量一个测试关注一个断言。\n- 公共 API 用 doc tests。\n- 生成输出可考虑 snapshot。\n\n## 验证方式\n\n- `cargo fmt`\n- `cargo clippy`\n- `cargo test`\n- 必要时 benchmark。\n- rustdoc 检查公共 API 文档。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\rust-best-practices\\SKILL.md`"
    },
    {
      "id": "note-41",
      "title": "seedance-storyboard",
      "fileTitle": "seedance-storyboard",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/视频",
        "AI记录/分镜",
        "AI记录/已核对"
      ],
      "summary": "seedance storyboard seedance storyboard 用于把视频创意转换成即梦 Seedance 2.0 专业分镜提示词。它适合短视频生成、分镜设计、参考素材组织和多模态提示词编写。 一句话定位 当用户想生成视频、制作短视频、写分镜、使用 Seedance/即梦/剪映 AI 视频时使用。 什么时候用 只有一句视频想法，需要扩成分镜。...",
      "wordCount": 481,
      "sourceFile": "mydata/我的数据/AI记录/内容/seedance-storyboard.md",
      "markdown": "# seedance-storyboard\n\n`seedance-storyboard` 用于把视频创意转换成即梦 Seedance 2.0 专业分镜提示词。它适合短视频生成、分镜设计、参考素材组织和多模态提示词编写。\n\n## 一句话定位\n\n当用户想生成视频、制作短视频、写分镜、使用 Seedance/即梦/剪映 AI 视频时使用。\n\n## 什么时候用\n\n- 只有一句视频想法，需要扩成分镜。\n- 需要 4-15 秒短视频提示词。\n- 有图片、视频、音频参考素材。\n- 需要首尾帧入口或全能参考入口。\n- 想要镜头语言、运镜、声音、节奏描述。\n\n## Seedance 2.0 输入限制\n\nSkill 原文记录：\n\n- 图片：jpeg/png/webp/bmp/tiff/gif，≤9 张，<30MB。\n- 视频：mp4/mov，≤3 个，总时长 2-15s，<50MB。\n- 音频：mp3/wav，≤3 个，总时长 ≤15s，<15MB。\n- 混合输入总上限：12 个文件。\n\n## 分步引导\n\n1. 理解用户想法：故事、时长、参考素材。\n2. 深入挖掘细节：叙事、视觉风格、镜头语言、动作节奏、声音设计。\n3. 构建分镜结构：按时间轴拆镜头。\n4. 生成专业提示词。\n5. 优化和交付。\n\n## 分镜维度\n\n- 故事起承转合。\n- 角色和主体。\n- 风格：写实、动画、水墨、科幻、复古、电影感。\n- 画幅：9:16、16:9、2.35:1。\n- 景别：远景、全景、中景、近景、特写。\n- 运镜：推、拉、摇、移、跟、环绕、升降。\n- 转场：硬切、渐变、匹配剪辑、特效转场。\n- 配乐、音效、对白、旁白。\n\n## 提示词结构\n\n```text\n【整体描述】风格 + 时长 + 画面比例 + 整体氛围\n\n【分镜描述】\n0-X秒：[镜头运动]，[画面内容]，[主体动作]，[光影/特效]\nX-Y秒：[镜头运动]，[画面内容]，[主体动作]，[光影/特效]\n\n【声音说明】配乐风格/音效/对白\n\n【参考素材说明】\n@图片1 作为首帧/角色参考\n@视频1 参考运镜/动作\n@音频1 用于配乐/对白参考\n```\n\n## 风险控制\n\n- 不要超出素材数量、大小和时长限制。\n- 有参考素材时要明确每个素材的用途。\n- 不要让一个镜头承载过多动作。\n- 复杂动作要拆成更短、更明确的镜头。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/imagegen|imagegen]]：生成静态参考图。\n- 与 [[AI记录/内容/remotion-best-practices|remotion-best-practices]]：把生成结果或素材做成 React 视频。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\seedance-storyboard\\SKILL.md`"
    },
    {
      "id": "note-42",
      "title": "serena",
      "fileTitle": "serena",
      "categories": [
        "常用MCP"
      ],
      "tags": [
        "AI记录/MCP",
        "AI记录/源码阅读",
        "AI记录/已核对"
      ],
      "summary": "Serena 是一个面向 coding agent 的 MCP 工具包，提供语义级代码检索、符号定位和编辑能力。它的目标是让 Agent 获得类似 IDE 的符号理解能力，而不是只靠文本搜索和行号修改。 定位 类型：MCP coding toolkit。 核心能力：语义代码检索、符号级编辑、引用查找、重构辅助。 技术基础：默认使用 Language Serv...",
      "wordCount": 628,
      "sourceFile": "mydata/我的数据/AI记录/内容/serena.md",
      "markdown": "# serena\n\nSerena 是一个面向 coding agent 的 MCP 工具包，提供语义级代码检索、符号定位和编辑能力。它的目标是让 Agent 获得类似 IDE 的符号理解能力，而不是只靠文本搜索和行号修改。\n\n## 定位\n\n- 类型：MCP coding toolkit。\n- 核心能力：语义代码检索、符号级编辑、引用查找、重构辅助。\n- 技术基础：默认使用 Language Server Protocol，也可通过 Serena JetBrains Plugin 使用 JetBrains 的代码分析能力。\n- 主要价值：让 Agent 在大型代码库中更稳定地定位符号、引用和改动点。\n\n## 适合场景\n\n- 大型代码库定位类、函数、方法、引用关系。\n- 跨文件重构。\n- 查找某个符号被哪里调用。\n- 修改需要理解语义结构的代码。\n- 让 Codex、Claude Code 等 Agent 在本地项目里更像 IDE 一样导航代码。\n\n## 不适合场景\n\n- 查外部库文档，应该用 [[AI记录/内容/context7|context7]]。\n- 快速理解一个远程 GitHub 仓库的整体说明，应该用 [[AI记录/内容/deepwiki|deepwiki]]。\n- 纯文本替换或小范围编辑，普通搜索和编辑可能更快。\n- 语言服务器不支持或索引失败的项目。\n\n## 安装和初始化\n\nSerena 官方仓库提示不要依赖过时的 MCP/plugin marketplace 安装命令，应按官方 Quick Start。\n\n典型流程：\n\n```text\nuv tool install -p 3.13 serena-agent@latest --prerelease=allow\nserena init\n```\n\n安装后，需要把 Serena MCP server 接入具体客户端，例如 Claude Code、Codex、Claude Desktop、MCP-enabled IDE。\n\n## 典型工作流\n\n1. 在项目中初始化 Serena。\n2. 确认语言服务器或 JetBrains backend 可用。\n3. 让 Agent 使用 Serena 查找符号、引用和定义。\n4. 在语义定位后再读取具体文件。\n5. 对修改进行测试或构建验证。\n\n## 典型提示\n\n```text\n使用 Serena 查找 AuthService 的所有引用，判断修改 login 方法会影响哪些调用点。\n```\n\n```text\n用 Serena 定位 user schema 的定义和写入路径，再说明最小修改方案。\n```\n\n## 风险和注意事项\n\n- 语言服务器索引不完整时，结果可能不全。\n- 自动编辑仍需要 diff 和测试验证。\n- 如果项目语言、构建系统或 monorepo 结构复杂，需要先确认 Serena 是否正确识别项目。\n- 不要把 Serena 当成测试替代品，它解决的是定位和编辑上下文问题。\n\n## 与其他工具的关系\n\n- 与 [[AI记录/内容/context7|context7]]：Context7 查外部库；Serena 查本地代码结构。\n- 与 [[AI记录/内容/deepwiki|deepwiki]]：DeepWiki 适合远程仓库理解；Serena 适合本地项目语义操作。\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：Serena 是增强它们本地代码理解能力的 MCP。\n\n## 使用判断\n\n当任务涉及“大型项目、跨文件引用、符号级重构、语义定位”时，Serena 的价值最高。\n\n## 来源\n\n- [Serena GitHub](https://github.com/oraios/serena)\n- [Serena MCP Registry](https://github.com/mcp/oraios/serena)"
    },
    {
      "id": "note-43",
      "title": "skill-creator",
      "fileTitle": "skill-creator",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/能力建设",
        "AI记录/已核对"
      ],
      "summary": "skill creator skill creator 用于创建、修改、改进和评估 Skills。它适合把重复任务、团队流程、领域知识和工具脚本沉淀成 Agent 可调用能力。 一句话定位 当你发现某类任务会反复出现，而且每次都要重新解释流程时，就应该考虑用 skill creator 把它做成 Skill。 什么时候用 创建新 Skill。 改进已有 SK...",
      "wordCount": 541,
      "sourceFile": "mydata/我的数据/AI记录/内容/skill-creator.md",
      "markdown": "# skill-creator\n\n`skill-creator` 用于创建、修改、改进和评估 Skills。它适合把重复任务、团队流程、领域知识和工具脚本沉淀成 Agent 可调用能力。\n\n## 一句话定位\n\n当你发现某类任务会反复出现，而且每次都要重新解释流程时，就应该考虑用 skill-creator 把它做成 Skill。\n\n## 什么时候用\n\n- 创建新 Skill。\n- 改进已有 `SKILL.md`。\n- 增加脚本、模板、示例、参考资料。\n- 评估 Skill 是否好用。\n- 把项目经验沉淀成长期能力。\n\n## 不适合场景\n\n- 一次性任务。\n- 需求还没搞清楚，先用 [[AI记录/内容/brainstorming|brainstorming]]。\n- 只是普通文档，不需要 Agent 执行流程。\n- Skill 过于宽泛，无法定义触发条件。\n\n## 一个好 Skill 应该包含\n\n- 清楚的 name 和 description。\n- 明确触发场景。\n- 明确不适用场景。\n- 可执行步骤。\n- 风险边界。\n- 验证方式。\n- 必要的脚本和模板。\n- 长资料按需读取，不堆在主文件。\n\n## 推荐结构\n\n```text\nskill-name/\n  SKILL.md\n  scripts/\n  templates/\n  references/\n  assets/\n```\n\n`SKILL.md` 写主流程；脚本和模板放到独立目录，避免主文件过长。\n\n## 设计问题\n\n创建 Skill 前应先回答：\n\n- 它解决什么重复问题。\n- 谁会触发它。\n- 输入是什么。\n- 输出是什么。\n- 哪些操作有风险。\n- 如何验证它做对了。\n- 什么情况下不该使用它。\n\n## 风险控制\n\n- 不要创建过宽泛的万能 Skill。\n- 不要把敏感配置写进 Skill。\n- 不要让 Skill 默认执行删除、覆盖、批量修改。\n- 有脚本时要明确脚本作用和参数。\n- 多平台工具名不同，要说明适配方式。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/find-skills|find-skills]]：先找现成 Skill，找不到再创建。\n- 与 [[AI记录/内容/brainstorming|brainstorming]]：创建前先确认设计目标。\n- 与 [[AI记录/内容/Skills 验收|Skills 验收]]：创建后需要验收。\n- 与 [[AI记录/内容/Skills 测试|Skills 测试]]：用标准案例、边界案例、反例案例测试。\n\n## 验收方式\n\n- 用标准任务确认主流程。\n- 用边界任务确认降级行为。\n- 用反例任务确认不会误触发。\n- 检查是否有无法执行的空话。\n- 检查是否能在当前工具环境中落地。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\skill-creator\\SKILL.md`"
    },
    {
      "id": "note-44",
      "title": "Skills Graph",
      "fileTitle": "Skills Graph",
      "categories": [
        "AI研究所"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/知识图谱"
      ],
      "summary": "Skills Graph 用于描述 Skills 之间的依赖、分工、层级和调用关系。它既是一张“谁先谁后、谁验证谁、谁委托谁”的使用地图，也是一套设计 Agent 工作杠杆的方法。 它要解决的核心问题不是“我有多少个 Skill”，而是： 面对一个任务，人应该站在哪一层指挥？Agent 应该调用哪些 Skill？这些 Skill 应该如何组合，才能既可靠又有...",
      "wordCount": 2770,
      "sourceFile": "mydata/我的数据/AI记录/内容/Skills Graph.md",
      "markdown": "# Skills Graph\n\nSkills Graph 用于描述 Skills 之间的依赖、分工、层级和调用关系。它既是一张“谁先谁后、谁验证谁、谁委托谁”的使用地图，也是一套设计 Agent 工作杠杆的方法。\n\n它要解决的核心问题不是“我有多少个 Skill”，而是：\n\n> 面对一个任务，人应该站在哪一层指挥？Agent 应该调用哪些 Skill？这些 Skill 应该如何组合，才能既可靠又有杠杆？\n\nSkill Graphs 2.0 的关键补充是：**不要把所有 Skill 平铺成一张大网，而要把 Skill 分成原子、分子、复合任务三个层级。** 越底层越稳定，越高层才允许更多判断和自治。\n\n## 为什么需要 Skills Graph\n\n当 Skill 数量增加后，常见问题会变成：\n\n- 多个 Skill 都像是能处理同一任务。\n- 某个 Skill 只是入口，真正执行要交给另一个 Skill。\n- 有些 Skill 会写文件，有些只做分析。\n- 子代理、浏览器、图片生成、MCP 等能力容易混在一起。\n- 流程型 Skill 和领域型 Skill 优先级不清。\n- Agent 临场选择 Skill 时，路径不稳定，结果难以预测。\n\nGraph 可以把这些关系显式化，让人先判断任务层级，再决定调用顺序。\n\n## 低层并行的陷阱\n\n很多人使用 Agent 的第一反应是“多开几个窗口”：一个查资料，一个改标题，一个润色文案，一个整理表格，一个写总结。这种做法能节省局部执行时间，但没有改变工作结构。\n\n真正的瓶颈已经从“执行力”变成了 **Brain RAM**：人类大脑能同时装下多少个任务上下文、质量标准和决策分支。\n\n低层并行的问题：\n\n- 每个 Agent 都需要单独下指令、盯输出、判断对错。\n- 人类注意力被消耗在最底层的原子任务上。\n- 多个结果最后仍然需要人工拼接。\n- Agent 数量增加后，管理成本也同步增加。\n\n这类并行有加速，但没有真正的系统级杠杆。Skills Graph 的价值，就是帮助人从“管理一堆原子动作”上移到“管理可复用流程和复合任务”。\n\n## 三层 Skill 架构\n\nSkill Graphs 2.0 推荐把 Skill 分成三层：Atoms、Molecules、Complex Tasks。\n\n### 1. Atoms：原子层\n\n原子是最小、最窄、最稳定的动作单元，目标是高确定性执行。\n\n典型职责：\n\n- 抓取一个 LinkedIn 资料。\n- 找出一篇竞品文章。\n- 验证一个邮箱地址。\n- 从一个页面抽取固定字段。\n- 把一条结构化记录写入表格。\n\n好原子的标准：\n\n- 输入明确。\n- 执行路径明确。\n- 输出格式明确。\n- 失败条件明确。\n- 尽量不再嵌套调用其他 Skill。\n\n原子层追求的不是聪明，而是稳定。底层越稳定，高层组合越安全。\n\n### 2. Molecules：分子层\n\n分子由 2 到 10 个原子组成，负责复用一个有边界的流程。\n\n例子：\n\n```text\n找线索 -> 筛选线索 -> 补充字段 -> 写入表格\n```\n\n分子层的设计重点是：**把自由收进结构里**。\n\n也就是说，不要让 Agent 临场决定所有事情，而要提前写清楚：\n\n- 第一步调用哪个原子。\n- 什么条件下进入第二步。\n- 每一步接受什么输入。\n- 每一步必须输出什么格式。\n- 遇到什么情况停止。\n- 什么时候交还给人类判断。\n\n分子层产生的是流程复用。它把人类重复做过的判断沉淀成可执行结构。\n\n### 3. Complex Tasks：复合任务层\n\n复合任务由多个分子组成，用来完成复杂业务目标。\n\n典型职责：\n\n- 规划并开发一个功能，再完成 Code Review 和 QA。\n- 完整做一次竞品研究。\n- 从选题、资料、初稿到发布，完成一篇长文工作流。\n- 从需求澄清到验收，推进一个小型项目。\n\n这一层才是 Agent 有意义自治的地方。它需要拆解目标、判断方向、调度流程、把控质量。\n\n但复合任务层也是最不稳定的一层，因为它包含大量开放判断。当前阶段仍然需要人类驾驶：人负责目标、边界、优先级和最终质量。\n\n## 推荐节点类型\n\n原有的节点类型仍然有用，可以和三层架构结合理解。\n\n### 入口型\n\n负责分流和规则加载。通常处在复合任务之前，是任务进入系统的第一道门。\n\n例：\n\n- `using-superpowers`\n- `find-skills`\n\n### 澄清型\n\n负责把想法变成设计。通常是分子层 Skill，因为它组织了一段稳定的澄清流程。\n\n例：\n\n- `brainstorming`\n\n### 计划型\n\n负责把设计拆成执行步骤。通常也是分子层 Skill。\n\n例：\n\n- `writing-plans`\n\n### 执行型\n\n直接产出结果。根据粒度不同，可能是原子，也可能是分子。\n\n例：\n\n- `imagegen`\n- `obsidian-markdown`\n- `mcp-builder`\n- `json-canvas`\n\n### 验证型\n\n负责检查结果是否可信。它们通常不直接创造内容，而是作为流程末端的质量关口。\n\n例：\n\n- `verification-before-completion`\n- `requesting-code-review`\n- `review`\n\n### 专业型\n\n针对领域约束，为某类任务补充规则和最佳实践。\n\n例：\n\n- `react-best-practices`\n- `rust-best-practices`\n- `rust-async-patterns`\n- `remotion-best-practices`\n\n## 节点类型与层级的对应\n\n| 视角 | 作用 | 常见层级 | 示例 |\n| --- | --- | --- | --- |\n| 入口型 | 加载规则，判断任务类型 | 复合任务入口 | `using-superpowers`, `find-skills` |\n| 澄清型 | 把想法变成设计 | 分子 | `brainstorming` |\n| 计划型 | 把设计拆成步骤 | 分子 | `writing-plans` |\n| 执行型 | 直接产出具体结果 | 原子 / 分子 | `imagegen`, `json-canvas`, `mcp-builder` |\n| 验证型 | 检查结果是否可信 | 分子 / 质量关口 | `verification-before-completion`, `requesting-code-review` |\n| 专业型 | 补充领域约束 | 支持节点 | `react-best-practices`, `rust-best-practices` |\n\n这个表不是固定分类。同一个 Skill 在不同项目中可能承担不同层级的职责。关键不是名字，而是它在当前工作流中负责“执行动作、复用流程，还是编排目标”。\n\n## 推荐边类型\n\nSkills Graph 中的边应该描述真实决策关系，而不是单纯画连接线。\n\n- `precedes`：A 应在 B 前执行。\n- `delegates`：A 会把子任务交给 B。\n- `verifies`：A 用来验证 B 的结果。\n- `overlaps`：A 和 B 职责重叠，需要设优先级。\n- `blocks`：A 不满足时，B 不应执行。\n- `extends`：B 是 A 的领域补充。\n- `supports`：B 为 A 提供资料、工具或上下文。\n\n## 示例关系\n\n```text\nusing-superpowers precedes brainstorming\nbrainstorming precedes writing-plans\nwriting-plans precedes implementation\nwriting-plans precedes subagent-driven-development\ndispatching-parallel-agents delegates implementation slices\nsubagent-driven-development delegates implementation slices\nverification-before-completion verifies implementation\nrequesting-code-review verifies implementation\nfrontend-design extends ui-ux-pro-max\nreact-best-practices extends frontend-design\nplaywright-interactive verifies frontend-design\ncontext7 supports mcp-builder\nserena supports codex\n```\n\n## 100 倍杠杆如何出现\n\n当人类直接管理原子任务时，5 个 Agent 大约只能推进 5 个底层动作。\n\n当 Skill Graph 分层后，人类可以管理更高层的复合任务：\n\n1. 人类同时管理 5 个复合任务，占用 5 个 Brain RAM 位置。\n2. 每个复合任务可以展开 10 个分子。\n3. 每个分子又由 10 个原子组成。\n\n底层展开后就是：\n\n```text\n5 个复合任务 * 10 个分子 * 10 个原子 = 500 个原子工作单元\n```\n\n这就是接近 100 倍杠杆的来源。\n\n但这个推导不是机械公式。它成立的前提是：\n\n- 原子足够稳定。\n- 分子能可靠串联。\n- 复合任务边界清晰。\n- 每层都有验证机制。\n\n如果底层不稳，层级越高，错误传播越快。\n\n## 为什么扁平 Skill Graph 会失控\n\n错误的 Skill Graph 往往像一张扁平大网：所有 Skill 都摆在同一层，Agent 每一步都要临场判断“该调用哪个、调用到第几层、什么时候停”。\n\n这种模式的问题是：\n\n- Skill 数量越多，选择空间越大。\n- 每一次调用都引入新的不确定性。\n- 路径越长，可靠性越低。\n- 人类很难预测 Agent 实际会走哪条路线。\n- 错误发生后，很难定位是哪一层的设计失败。\n\n正确方向不是把所有 Skill 都暴露给 Agent，而是强制分层：\n\n- 底层原子：少判断，高确定性。\n- 中层分子：固定流程，可复用。\n- 高层复合任务：有限自治，接受人类监督。\n\n## Mermaid 示例\n\n### 基础调用关系\n\n```mermaid\ngraph TD\n  A[using-superpowers] --> B[brainstorming]\n  B --> C[writing-plans]\n  C --> D[implementation]\n  D --> E[verification-before-completion]\n\n  F[frontend-design] --> G[playwright-interactive]\n  H[react-best-practices] --> F\n  I[mcp-builder] --> J[context7]\n```\n\n### 分层杠杆关系\n\n```mermaid\ngraph TD\n  Human[Human: 目标与质量把控]\n\n  Human --> CT1[Complex Task: 开发功能并验收]\n  Human --> CT2[Complex Task: 竞品研究]\n  Human --> CT3[Complex Task: 文档体系优化]\n\n  CT1 --> M1[Molecule: brainstorming]\n  CT1 --> M2[Molecule: writing-plans]\n  CT1 --> M3[Molecule: subagent-driven-development]\n  CT1 --> M4[Molecule: verification-before-completion]\n\n  M1 --> A1[Atom: 收集需求]\n  M1 --> A2[Atom: 比较方案]\n  M2 --> A3[Atom: 拆任务]\n  M3 --> A4[Atom: 修改文件]\n  M4 --> A5[Atom: 运行验证]\n\n  M4 --> V1[Review: requesting-code-review]\n```\n\n## Obsidian Canvas 用法\n\n如果用 [[AI记录/内容/json-canvas|json-canvas]] 维护 Skills Graph，可以把每个 Skill 做成 file node，把关系做成 edge。\n\n建议布局：\n\n- 人类目标与入口型 Skill 放最左侧。\n- 复合任务放左中区域。\n- 澄清 / 计划型 Skill 放中间。\n- 执行型 Skill 按领域分组。\n- 验证型 Skill 放右侧或流程末端。\n- 高风险或不稳定 Skill 用醒目颜色。\n\n不要追求把所有 Skill 都画进去。只画真正影响调用顺序、职责边界和质量验证的关系。\n\n## 设计检查清单\n\n设计或更新 Skills Graph 时，逐项检查：\n\n- 这个 Skill 是原子、分子，还是复合任务？\n- 它的输入、输出、停止条件是否明确？\n- 它是否承担了过多判断？\n- 它调用的下游 Skill 是否稳定？\n- 这条边是否真的影响使用决策？\n- 失败时能否定位到具体层级？\n- 是否存在职责重叠，需要设定优先级？\n- 复合任务是否跨过太多分子，导致可靠性下降？\n\n经验边界：如果一个复合任务连续跨过 8 到 10 个分子，就可能触碰可靠性上限。此时应考虑拆分任务、增加检查点，或把某些流程下沉为更稳定的分子。\n\n## 维护原则\n\n- 不追求把所有 Skill 都画进去。\n- 只画真正影响使用决策的关系。\n- 每条边要能解释为什么存在。\n- 新增 Skill 或项目规则变化时更新 Graph。\n- 当某个 Skill 多次被同样方式调用时，考虑把它沉淀为分子。\n- 当某个复合任务经常失败时，优先检查底层原子是否稳定。\n- 当 Agent 经常不知道何时停止时，补充停止条件和人工交还条件。\n\n## 人类的新位置\n\nAgent 时代，人类不应该长期停留在原子工作层。更合适的类比是 CTO：\n\n- 不合格的 CTO：每天亲自修所有底层 Bug。\n- 合格的 CTO：搭建团队、定义目标、设计机制、判断优先级。\n\n对应到 Skills Graph：\n\n- 不要一直手动驱动每个原子任务。\n- 把稳定动作沉淀为原子。\n- 把重复流程沉淀为分子。\n- 把自己移动到复合任务层，负责目标和质量。\n\n未来真正会用 Agent 的人，不只是会写提示词的人，而是会设计 Skill 层级的人。\n\n## 使用判断\n\n当你开始不确定“这个任务应该先用哪个 Skill”时，就该查看或更新 Skills Graph。\n\n判断顺序：\n\n1. 这只是一个明确动作吗？如果是，优先找原子。\n2. 这是一段重复流程吗？如果是，优先找分子。\n3. 这是一个开放目标吗？如果是，需要复合任务编排，并设置人类检查点。\n4. 是否存在多个 Skill 职责重叠？如果是，用 `overlaps` 标出来并设优先级。\n5. 是否需要质量把关？如果是，把验证型 Skill 接到流程末端。\n\nSkills Graph 的价值，就是把这些判断显式化。"
    },
    {
      "id": "note-45",
      "title": "Skills 搭建",
      "fileTitle": "Skills 搭建",
      "categories": [
        "AI研究所"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/方法"
      ],
      "summary": "Skill 是把一类可复用任务沉淀成稳定流程的方式。它通常由 SKILL.md、辅助脚本、模板、示例和参考资料组成，用来告诉 Agent 在特定场景下应该如何工作。 什么时候需要搭建 Skill 某类任务反复出现。 任务有固定流程，但每次仍需要上下文判断。 任务需要工具链、脚本、模板或检查清单辅助。 希望把个人经验变成 Agent 可调用能力。 希望减少每次...",
      "wordCount": 711,
      "sourceFile": "mydata/我的数据/AI记录/内容/Skills 搭建.md",
      "markdown": "# Skills 搭建\n\nSkill 是把一类可复用任务沉淀成稳定流程的方式。它通常由 `SKILL.md`、辅助脚本、模板、示例和参考资料组成，用来告诉 Agent 在特定场景下应该如何工作。\n\n## 什么时候需要搭建 Skill\n\n- 某类任务反复出现。\n- 任务有固定流程，但每次仍需要上下文判断。\n- 任务需要工具链、脚本、模板或检查清单辅助。\n- 希望把个人经验变成 Agent 可调用能力。\n- 希望减少每次重复解释项目约定的成本。\n\n## 不应该搭建 Skill 的情况\n\n- 只是一次性任务。\n- 流程还没有稳定下来。\n- 触发条件说不清。\n- 没有明确输出。\n- 内容只是普通知识备忘，不需要 Agent 执行。\n\n## Skill 的组成\n\n```text\nskill-name/\n  SKILL.md\n  scripts/\n  templates/\n  references/\n  assets/\n```\n\n- `SKILL.md`：触发规则、主流程、风险控制、验证方式。\n- `scripts/`：可重复执行的脚本。\n- `templates/`：输出模板、文档模板、配置模板。\n- `references/`：长文档、规范、示例。\n- `assets/`：图片、示例文件、固定素材。\n\n## 设计步骤\n\n### 1. 定义目标\n\n先用一句话说明 Skill 帮 Agent 做什么。\n\n坏例子：\n\n```text\n帮助写得更好。\n```\n\n好例子：\n\n```text\n当用户要求整理 Obsidian 笔记时，生成符合 Obsidian Flavored Markdown 的内容，并使用 wikilinks 连接 vault 内笔记。\n```\n\n### 2. 定义触发条件\n\n写清楚什么时候必须使用：\n\n- 用户点名。\n- 出现关键词。\n- 任务类型匹配。\n- 涉及某类文件或工具。\n\n### 3. 定义不适用条件\n\n避免 Skill 误触发：\n\n- 哪些相似任务不该用。\n- 哪些情况要先问用户。\n- 哪些情况要转给其他 Skill。\n\n### 4. 定义输入输出\n\n输入可能是：\n\n- 路径。\n- 目标。\n- 约束。\n- 素材。\n- 示例。\n- 验收标准。\n\n输出可能是：\n\n- 文件。\n- 报告。\n- 代码。\n- 图片。\n- 计划。\n- 操作结果。\n\n### 5. 写主流程\n\n主流程要可执行，不写空泛原则。\n\n例如：\n\n```markdown\n1. 读取目标目录文件列表。\n2. 读取每个 Markdown 文件 frontmatter。\n3. 生成缺失的 wikilinks。\n4. 验证所有链接目标存在。\n```\n\n### 6. 写风险控制\n\n明确这些动作如何处理：\n\n- 删除。\n- 覆盖。\n- 重命名。\n- 批量修改。\n- 联网。\n- 执行脚本。\n- 处理密钥。\n- 操作生产系统。\n\n### 7. 写验证方式\n\nSkill 应要求 Agent 用证据完成任务，例如：\n\n- 测试命令。\n- lint 结果。\n- 截图。\n- 文件存在性。\n- JSON/YAML 解析。\n- 链接目标检查。\n\n## 文档写法原则\n\n- 主文件只放流程，不堆长资料。\n- 长资料放 references。\n- 重复命令放 scripts。\n- 输出格式放 templates。\n- 不要写“认真检查”这种无法执行的要求。\n- 每个风险都要有具体处理方式。\n\n## 最小可用 Skill 模板\n\n```markdown\n---\nname: example-skill\ndescription: Use when ...\n---\n\n# Example Skill\n\n## When to use\n\n## When not to use\n\n## Inputs\n\n## Workflow\n\n## Risks\n\n## Verification\n\n## Output format\n```\n\n## 常见错误\n\n- 触发范围过宽。\n- 没有不适用场景。\n- 步骤过抽象。\n- 缺少失败路径。\n- 没有验证方式。\n- 把大量资料塞进 `SKILL.md`。\n- 脚本没有说明参数和副作用。\n\n## 完成标准\n\n一个可用 Skill 至少应满足：\n\n- 能被正确触发。\n- 能指导真实任务。\n- 风险边界明确。\n- 验证方式明确。\n- 长资料按需读取。\n- 用户点名时知道是否完整执行。"
    },
    {
      "id": "note-46",
      "title": "Skills 测试",
      "fileTitle": "Skills 测试",
      "categories": [
        "AI研究所"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/测试"
      ],
      "summary": "Skills 测试用于确认 Skill 在真实任务中是否可靠。测试重点是行为，而不是文字漂亮。 测试目标 测试一个 Skill 时要确认： 是否正确触发。 是否读取必要说明。 是否按流程执行。 是否尊重风险边界。 是否能处理失败路径。 是否能给出验证证据。 是否不会在反例中误触发。 测试准备 准备四类测试： 1. 成功路径 输入完整、工具可用、目标清楚。 目...",
      "wordCount": 558,
      "sourceFile": "mydata/我的数据/AI记录/内容/Skills 测试.md",
      "markdown": "# Skills 测试\n\nSkills 测试用于确认 Skill 在真实任务中是否可靠。测试重点是行为，而不是文字漂亮。\n\n## 测试目标\n\n测试一个 Skill 时要确认：\n\n- 是否正确触发。\n- 是否读取必要说明。\n- 是否按流程执行。\n- 是否尊重风险边界。\n- 是否能处理失败路径。\n- 是否能给出验证证据。\n- 是否不会在反例中误触发。\n\n## 测试准备\n\n准备四类测试：\n\n### 1. 成功路径\n\n输入完整、工具可用、目标清楚。\n\n目的：验证主流程能跑通。\n\n### 2. 缺失路径\n\n缺少关键信息。\n\n目的：验证是否会问正确问题，而不是乱猜。\n\n### 3. 风险路径\n\n涉及：\n\n- 覆盖。\n- 删除。\n- 批量修改。\n- 执行脚本。\n- 联网。\n- 密钥。\n- 生产数据。\n\n目的：验证是否会停下说明风险和确认。\n\n### 4. 冲突路径\n\n任务可能被多个 Skill 处理。\n\n目的：验证优先级和分流逻辑。\n\n## 测试记录模板\n\n```markdown\n## 测试名称\n\n- 测试类型：成功 / 缺失 / 风险 / 冲突 / 反例\n- 输入：\n- 期望行为：\n- 实际行为：\n- 是否触发正确 Skill：\n- 是否按步骤执行：\n- 是否出现越权动作：\n- 验证证据：\n- 结论：\n- 修订建议：\n```\n\n## 观察重点\n\n- Agent 是否在第一时间识别 Skill。\n- 是否读取当前版本，而不是凭记忆。\n- 是否跳过了不该跳过的步骤。\n- 是否提前说明不会执行的步骤。\n- 是否在完成前做验证。\n- 是否把临时文件清理干净。\n\n## 回归测试\n\n每次修改 `SKILL.md` 后，至少重新跑：\n\n- 一个成功路径。\n- 一个边界路径。\n- 一个反例路径。\n\n涉及写文件、执行命令、浏览器、图片生成、MCP 或外部 API 的 Skill，应额外测试失败路径。\n\n## 自动化测试思路\n\n如果 Skill 有脚本，可为脚本补：\n\n- 输入合法性测试。\n- 空输入测试。\n- 错误路径测试。\n- dry-run 测试。\n- 输出格式测试。\n\n如果 Skill 是流程型，可用固定 prompt 做人工回归记录。\n\n## 判定标准\n\n- 通过：行为符合预期，无越权，验证证据充分。\n- 待修：主流程可用，但边界或验证不足。\n- 失败：误触发、越权或无法指导真实任务。\n\n## 测试资产管理\n\n- 临时测试文件用完后清理。\n- 不在真实资料目录做破坏性测试。\n- 测试路径应明确、可复现。\n- Windows 下避免使用危险 shell 删除写法。"
    },
    {
      "id": "note-47",
      "title": "Skills 验收",
      "fileTitle": "Skills 验收",
      "categories": [
        "AI研究所"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/验收"
      ],
      "summary": "Skills 验收的目标是确认它能稳定指导 Agent 完成任务，而不是只检查文档是否写得完整。 验收结论分级 通过：标准任务能完成，边界任务能正确降级，反例不会误触发。 有条件通过：主流程可用，但某些风险或验证不足。 不通过：触发不清、流程不可执行或存在高风险误导。 验收维度 1. 触发准确性 检查： 是否明确使用场景。 是否明确不适用场景。 是否会和其他...",
      "wordCount": 601,
      "sourceFile": "mydata/我的数据/AI记录/内容/Skills 验收.md",
      "markdown": "# Skills 验收\n\nSkills 验收的目标是确认它能稳定指导 Agent 完成任务，而不是只检查文档是否写得完整。\n\n## 验收结论分级\n\n- 通过：标准任务能完成，边界任务能正确降级，反例不会误触发。\n- 有条件通过：主流程可用，但某些风险或验证不足。\n- 不通过：触发不清、流程不可执行或存在高风险误导。\n\n## 验收维度\n\n### 1. 触发准确性\n\n检查：\n\n- 是否明确使用场景。\n- 是否明确不适用场景。\n- 是否会和其他 Skill 职责冲突。\n- 用户点名时是否必须使用。\n- 是否能在关键词不完全匹配时仍正确判断。\n\n常见问题：\n\n- description 太泛。\n- “任何相关任务都用”导致误触发。\n- 与另一个 Skill 重复但没有优先级。\n\n### 2. 流程可执行性\n\n检查：\n\n- 每一步能不能直接执行。\n- 是否需要额外工具。\n- 输入是否明确。\n- 输出是否明确。\n- 是否有停止条件。\n\n不可接受写法：\n\n```text\n充分理解需求后优化内容。\n```\n\n更好写法：\n\n```text\n读取目标文件，列出一级标题，找出缺少来源段的文档，并补充来源段。\n```\n\n### 3. 风险控制\n\n检查是否区分：\n\n- 只读。\n- 写入。\n- 覆盖。\n- 删除。\n- 重命名。\n- 批量修改。\n- 联网。\n- 执行脚本。\n- 处理密钥。\n\n高风险动作应要求路径核对、影响说明或用户确认。\n\n### 4. 上下文控制\n\n检查：\n\n- 是否只读取必要参考。\n- 长文档是否放在 references。\n- 是否避免每次加载大量资料。\n- 是否说明什么时候读取额外文件。\n\n### 5. 验证闭环\n\n检查：\n\n- 是否说明如何验证输出。\n- 是否要求真实执行结果。\n- 是否避免无证据说“完成”。\n- 是否提供失败时的处理方式。\n\n## 推荐验收任务集\n\n### 标准任务\n\n最符合 Skill 预期的任务，用来验证主流程。\n\n记录：\n\n- 输入。\n- 预期输出。\n- 实际输出。\n- 是否需要额外澄清。\n\n### 边界任务\n\n模拟不完整或异常情况：\n\n- 缺少路径。\n- 文件不存在。\n- 工具未安装。\n- 权限不足。\n- 用户要求高风险操作。\n\n### 反例任务\n\n看 Skill 是否误触发：\n\n- 相似但不该用的任务。\n- 纯问答。\n- 已有更合适 Skill 的任务。\n\n## 验收记录模板\n\n```markdown\n# <skill-name> 验收记录\n\n## 基本信息\n\n- Skill 路径：\n- 验收日期：\n- 验收人：\n\n## 标准任务\n\n- 输入：\n- 期望：\n- 实际：\n- 结论：\n\n## 边界任务\n\n- 输入：\n- 期望：\n- 实际：\n- 结论：\n\n## 反例任务\n\n- 输入：\n- 期望：\n- 实际：\n- 结论：\n\n## 问题清单\n\n- [ ] 问题 1\n\n## 最终结论\n\n- 通过 / 有条件通过 / 不通过\n```\n\n## 通过标准\n\nSkill 能在标准任务中顺利完成，在边界任务中正确降级，在反例任务中不会误触发，并且所有完成声明都有验证证据。"
    },
    {
      "id": "note-48",
      "title": "starwards-pixijs",
      "fileTitle": "starwards-pixijs",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/PixiJS",
        "AI记录/Starwards",
        "AI记录/已核对"
      ],
      "summary": "starwards pixijs starwards pixijs 是 Starwards 项目的 PixiJS v8 开发指南，覆盖 Application、Container、Sprite、Graphics、Texture、Ticker、事件和 Playwright 测试模式。 一句话定位 当 Starwards 项目中涉及 PixiJS v8 2D 渲...",
      "wordCount": 408,
      "sourceFile": "mydata/我的数据/AI记录/内容/starwards-pixijs.md",
      "markdown": "# starwards-pixijs\n\n`starwards-pixijs` 是 Starwards 项目的 PixiJS v8 开发指南，覆盖 Application、Container、Sprite、Graphics、Texture、Ticker、事件和 Playwright 测试模式。\n\n## 一句话定位\n\n当 Starwards 项目中涉及 PixiJS v8 2D 渲染、交互或测试时使用。\n\n## 什么时候用\n\n- 创建或修改 PixiJS 场景。\n- 处理 Container 层级。\n- 使用 Sprite、Graphics、Text、Texture。\n- 接入 ticker 更新。\n- 处理指针事件。\n- 做 Playwright 渲染测试。\n\n## 不适合场景\n\n- 非 Starwards 项目，除非确认结构相似。\n- 普通 DOM UI。\n- 3D Three.js 场景。\n- 纯游戏逻辑但不涉及 PixiJS。\n\n## 核心原则\n\nSkill 原文指出 Starwards 的核心原则是：\n\n```text\nLayered container composition with ticker-driven updates synced to Colyseus state changes.\n```\n\n即用分层 Container 组织渲染，用 ticker 驱动更新，并和 Colyseus 状态变化同步。\n\n## PixiJS v8 重点\n\n### Application\n\nPixiJS v8 需要异步初始化：\n\n```ts\nconst app = new Application();\nawait app.init({\n  width: 800,\n  height: 600,\n  backgroundColor: 0x1099bb,\n});\ndocument.body.appendChild(app.canvas);\n```\n\n### Container\n\n- 子节点继承父节点 transform、alpha、visibility。\n- 渲染顺序通常是插入顺序，后加在上层。\n- 可用 `setChildIndex` 或 `zIndex` 调整。\n\n### Graphics\n\nPixiJS v8 Graphics API 和旧版本有差异，修改旧代码时要特别核对。\n\n### Ticker\n\nTicker 用于每帧更新，必须注意添加和移除回调，避免重复注册。\n\n## 风险控制\n\n- 资源加载后要释放。\n- 事件监听要解绑。\n- Ticker callback 要移除。\n- Container 层级不要混乱。\n- 坐标系统要统一。\n- 测试需要稳定 selector。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：验证 canvas 渲染和交互。\n- 与 frontend-design：如果同时涉及 DOM UI，可以结合前端设计。\n\n## 验证方式\n\n- 页面 canvas 非空白。\n- 关键对象位置正确。\n- 交互事件触发。\n- ticker 更新正常。\n- Playwright data-id selector 可定位。\n- 无明显内存/事件泄漏。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\starwards-pixijs\\SKILL.md`"
    },
    {
      "id": "note-49",
      "title": "superpower",
      "fileTitle": "superpower",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/流程",
        "AI记录/已核对"
      ],
      "summary": "superpower 这里指一组强调流程纪律的 Skills 集合。核心入口是 using superpowers：它要求在任务开始时先检查是否有适用 Skill，并在执行前读取当前版本的 Skill 原文。 一句话定位 不是具体领域工具，而是“先选对流程，再动手”的入口规则。它把任务分到 brainstorming、debugging、TDD、planni...",
      "wordCount": 634,
      "sourceFile": "mydata/我的数据/AI记录/内容/superpower.md",
      "markdown": "# superpower\n\n`superpower` 这里指一组强调流程纪律的 Skills 集合。核心入口是 `using-superpowers`：它要求在任务开始时先检查是否有适用 Skill，并在执行前读取当前版本的 Skill 原文。\n\n## 一句话定位\n\n不是具体领域工具，而是“先选对流程，再动手”的入口规则。它把任务分到 brainstorming、debugging、TDD、planning、verification 等流程 Skill 中。\n\n## 什么时候用\n\n- 任务涉及设计、代码、调试、实现、验证。\n- 用户点名某个 Skill。\n- 当前任务有 1% 可能适用某个 Skill。\n- 任务需要判断先分析、先设计、先调试还是直接执行。\n\n## 核心原则\n\n- 相关 Skill 必须在回答或行动前调用。\n- 用户明确指令优先级最高。\n- Process skills 优先于 implementation skills。\n- 不要凭记忆使用 Skill，要读取当前版本。\n- 简单任务也可能需要流程约束。\n\n## 优先级\n\nSkill 原文给出的优先级是：\n\n1. 用户显式指令，例如 AGENTS.md、CLAUDE.md、直接请求。\n2. Superpowers skills。\n3. 默认系统提示。\n\n这意味着如果项目规则要求不要走某个流程，应遵守项目规则。\n\n## 常见分流\n\n- “想做一个功能” → 先 [[AI记录/内容/brainstorming|brainstorming]]。\n- “修 bug / 测试失败” → 先 systematic debugging。\n- “实现已确认设计” → writing-plans 后再执行。\n- “完成前确认” → verification-before-completion。\n- “收尾分支” → finishing-a-development-branch。\n\n## 反模式\n\n- 觉得任务很简单所以不读 Skill。\n- 先看文件，之后再决定用不用 Skill。\n- 凭记忆执行旧版本流程。\n- 用户点名 Skill 但没有说明哪些步骤会跳过。\n- 在设计未确认前直接实现。\n\n## 在本项目中的约定\n\n本项目 AGENTS.md 对 superpower 做了额外分流：\n\n- 代码/设计相关任务优先使用 `using-superpowers`。\n- 只评审不实现走 review-only。\n- 小改动走 light。\n- 多文件/高风险走 standard。\n- bug/test/build failure 走 bug。\n- 若调用某个 Skill 但不完整执行，必须提前说明原因。\n\n## 风险控制\n\n`using-superpowers` 很强势，但不能覆盖用户明确规则。比如用户要求中文沟通、只在当前目录操作、删除前确认，这些都优先于 Skill。\n\n## 适合记录的产物\n\n- 本次任务分流结果。\n- 使用了哪些 Skill。\n- 哪些步骤未执行及原因。\n- 验证证据。\n- 是否归档计划或设计。\n\n## 使用判断\n\n当任务不是单纯问答，而是会引发设计、代码、文档结构、调试或验证时，先考虑 superpower 流程。\n\n## 来源\n\n- `C:\\Users\\admin\\.codex\\superpowers\\skills\\using-superpowers\\SKILL.md`"
    },
    {
      "id": "note-50",
      "title": "trae",
      "fileTitle": "trae",
      "categories": [
        "未分类"
      ],
      "tags": [
        "AI记录/IDE",
        "AI记录/已核对"
      ],
      "summary": "Trae IDE 是 ByteDance 的 AI powered code editor。官方文档将它描述为带有代码补全、智能建议和 agent based programming 能力的 AI 编程 IDE。 定位 类型：AI IDE / AI code editor。 厂商：ByteDance。 核心能力：代码编辑、项目管理、扩展管理、版本控制、AI...",
      "wordCount": 524,
      "sourceFile": "mydata/我的数据/AI记录/内容/trae.md",
      "markdown": "# trae\n\nTrae IDE 是 ByteDance 的 AI-powered code editor。官方文档将它描述为带有代码补全、智能建议和 agent-based programming 能力的 AI 编程 IDE。\n\n## 定位\n\n- 类型：AI IDE / AI code editor。\n- 厂商：ByteDance。\n- 核心能力：代码编辑、项目管理、扩展管理、版本控制、AI 聊天、代码解释、文档生成、错误修复、实时建议和代码生成。\n- 迁移能力：官方文档提到支持从 VS Code 和 Cursor 导入已有配置。\n\n## 适合场景\n\n- 在 IDE 内进行代码解释和局部修改。\n- 生成函数、组件、配置或文档。\n- 使用 AI 做实时建议和补全。\n- 从自然语言描述生成项目级或跨文件代码。\n- 想要中英文体验都比较友好的 AI IDE。\n\n## 不适合场景\n\n- 需要强流程约束、严格权限审计的长任务。\n- 未经确认的大范围自动修改。\n- 只需要 CLI Agent 的场景。\n- 需要自定义复杂工具链、MCP、子代理编排时，需先确认当前版本支持情况。\n\n## 常用工作流\n\n1. 打开项目。\n2. 用侧边 Chat 或 Inline Chat 解释代码、生成片段或修复错误。\n3. 对 AI 生成内容做人工 review。\n4. 运行项目测试、lint 或构建。\n5. 用版本控制确认 diff。\n\n## 典型提示\n\n```text\n解释当前文件的核心逻辑，并指出可能的边界情况。\n```\n\n```text\n为这个 React 组件补充 loading 和 error 状态，不要改变现有 props。\n```\n\n```text\n根据这个错误信息定位原因，并给出最小修改建议。\n```\n\n## 风险控制\n\n- IDE 内生成代码容易被快速接受，仍然需要检查 diff。\n- 对跨文件生成要先明确范围。\n- 对重构任务要先跑测试。\n- 对依赖安装、脚本执行、网络请求等动作要先确认。\n\n## 与其他工具的比较\n\n- 与 [[AI记录/内容/codex|codex]] / [[AI记录/内容/claude code|claude code]]：Trae 更像日常 IDE；Codex/Claude Code 更像任务代理。\n- 与 [[AI记录/内容/kilo code|kilo code]]：二者都可作为 AI 编程环境，具体差异要看扩展生态、模型支持、MCP/Agent 能力和权限控制。\n\n## 使用判断\n\n如果目标是“在编辑器内快速解释、补全、生成、局部修复”，Trae 适合；如果目标是“长任务代理执行并验证”，应和 Codex/Claude Code/Kilo 等比较。\n\n## 来源\n\n- [Trae IDE 官方文档](https://traeide.com/docs)\n- [What is Trae IDE?](https://traeide.com/jp/docs/what-is-trae-ide)"
    },
    {
      "id": "note-51",
      "title": "ui-ux-pro-max",
      "fileTitle": "ui-ux-pro-max",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/UIUX",
        "AI记录/设计",
        "AI记录/已核对"
      ],
      "summary": "ui ux pro max ui ux pro max 是 UI/UX 设计知识库型 Skill，覆盖设计风格、配色、字体、产品类型、UX 指南、图表类型和多技术栈实现建议。 一句话定位 当任务会改变界面的外观、交互、信息结构或体验质量时使用。 什么时候用 设计新页面。 创建或重构 UI 组件。 选择颜色、字体、间距、布局。 审查 UI 可用性、可访问性、视...",
      "wordCount": 442,
      "sourceFile": "mydata/我的数据/AI记录/内容/ui-ux-pro-max.md",
      "markdown": "# ui-ux-pro-max\n\n`ui-ux-pro-max` 是 UI/UX 设计知识库型 Skill，覆盖设计风格、配色、字体、产品类型、UX 指南、图表类型和多技术栈实现建议。\n\n## 一句话定位\n\n当任务会改变界面的外观、交互、信息结构或体验质量时使用。\n\n## 什么时候用\n\n- 设计新页面。\n- 创建或重构 UI 组件。\n- 选择颜色、字体、间距、布局。\n- 审查 UI 可用性、可访问性、视觉一致性。\n- 优化导航、动画、响应式。\n- 构建设计系统或组件库。\n\n## 不适合场景\n\n- 纯后端逻辑。\n- API 或数据库设计。\n- 与界面无关的性能优化。\n- DevOps 和基础设施。\n- 非视觉脚本。\n\n## 规则优先级\n\nSkill 原文给出 10 类规则：\n\n1. Accessibility。\n2. Touch & Interaction。\n3. Performance。\n4. Style Selection。\n5. Layout & Responsive。\n6. Typography & Color。\n7. Animation。\n8. Forms & Feedback。\n9. Navigation Patterns。\n10. Charts & Data。\n\n## 关键检查\n\n- 对比度至少 4.5:1。\n- 图标按钮有 aria-label。\n- 可键盘导航。\n- 触控目标 44x44 或 48x48。\n- 不依赖 hover。\n- 图片使用 WebP/AVIF 和 lazy loading。\n- 避免 CLS。\n- 移动端无水平滚动。\n- 字体和颜色使用语义 token。\n- 动画 150-300ms 且尊重 reduced-motion。\n\n## 与 frontend-design 的区别\n\n- [[AI记录/内容/frontend-design|frontend-design]] 更强调视觉方向和生产级界面创造。\n- `ui-ux-pro-max` 更像规则库和质量检查表，适合审查、对齐和系统化设计决策。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/react-best-practices|react-best-practices]]：React 实现时补性能规则。\n- 与 [[AI记录/内容/playwright-interactive|playwright-interactive]]：用浏览器检查可见状态。\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：两者常一起用于高质量 UI。\n\n## 验证方式\n\n- 颜色对比。\n- keyboard/focus。\n- 移动端 viewport。\n- 表单错误反馈。\n- loading/disabled 状态。\n- 图表是否有 legend、tooltip、非纯颜色编码。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\ui-ux-pro-max\\SKILL.md`"
    },
    {
      "id": "note-52",
      "title": "web-design-guidelines",
      "fileTitle": "web-design-guidelines",
      "categories": [
        "常用SKILLS"
      ],
      "tags": [
        "AI记录/Skills",
        "AI记录/UI评审",
        "AI记录/已核对"
      ],
      "summary": "web design guidelines web design guidelines 用于按 Web Interface Guidelines 审查网页或 UI 代码，重点检查设计实现、交互、可访问性和前端界面质量。 一句话定位 当用户要求“review my UI”“检查可访问性”“审查设计”“审查 UX”或“按最佳实践检查网站”时使用。 什么时候用 用...",
      "wordCount": 685,
      "sourceFile": "mydata/我的数据/AI记录/内容/web-design-guidelines.md",
      "markdown": "# web-design-guidelines\n\n`web-design-guidelines` 用于按 Web Interface Guidelines 审查网页或 UI 代码，重点检查设计实现、交互、可访问性和前端界面质量。\n\n## 一句话定位\n\n当用户要求“review my UI”“检查可访问性”“审查设计”“审查 UX”或“按最佳实践检查网站”时使用。\n\n## 什么时候用\n\n- 用户提供了网页、组件、页面文件或文件匹配模式，需要做 UI/UX 评审。\n- 需要对照 Web Interface Guidelines 找出具体违规点。\n- 需要输出可定位到文件和行号的界面问题。\n- 需要检查前端界面的可用性、可访问性、视觉一致性和实现细节。\n\n## 不适合场景\n\n- 用户要求直接实现或重做界面，而不是评审。\n- 只是在讨论设计方向，没有具体文件或页面可审查。\n- 任务主要是性能、SEO、后端 API 或安全审计。\n- 当前环境不能读取待审查文件，也不能获取最新 guidelines。\n\n## 常见工作流\n\n1. 获取最新 Web Interface Guidelines。\n2. 读取用户指定的文件或文件匹配模式。\n3. 按 guidelines 逐条检查 UI 代码。\n4. 用 `file:line` 格式输出问题。\n5. 按严重程度说明影响和修复方向。\n\n## 评估重点\n\n- 布局是否稳定，文本和控件是否可能溢出或重叠。\n- 交互控件是否清晰、可发现、可操作。\n- 颜色、间距、字号、状态反馈是否一致。\n- 可访问性语义、键盘操作、焦点状态和对比度是否可靠。\n- 响应式表现是否覆盖移动端和桌面端。\n\n## 风险控制\n\n- 每次评审前应获取最新 guidelines，不依赖过期记忆。\n- 没有文件参数时，应先确认审查范围。\n- 只输出基于实际代码或页面证据的问题，避免泛泛而谈。\n- 如果 guidelines 获取失败，需要说明缺口，不能声称已完整按最新规则审查。\n\n## 与其他 Skills 的关系\n\n- 与 [[AI记录/内容/frontend-design|frontend-design]]：frontend-design 偏向创建高质量界面，web-design-guidelines 偏向评审已有界面。\n- 与 [[AI记录/内容/ui-ux-pro-max|ui-ux-pro-max]]：ui-ux-pro-max 偏向设计智能和方案生成，web-design-guidelines 偏向规则化审查。\n- 与 [[AI记录/内容/accessibility|accessibility]]：accessibility 更聚焦 WCAG，可在需要专项可访问性修复时配合使用。\n- 与 [[AI记录/内容/web-quality-audit|web-quality-audit]]：web-quality-audit 覆盖性能、SEO、最佳实践等更宽范围，web-design-guidelines 更聚焦界面规则。\n\n## 使用判断\n\n如果任务目标是“看这个界面哪里不符合规范”，优先用它；如果目标是“帮我做一个界面”，更适合先用 frontend-design 或 ui-ux-pro-max。\n\n## 来源\n\n- `C:\\Users\\admin\\.agents\\skills\\web-design-guidelines\\SKILL.md`\n- `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`"
    },
    {
      "id": "note-53",
      "title": "快速上手 Agent Harness 实战 - MicroHarness",
      "fileTitle": "快速上手Agent Harness实战-MicroHarness",
      "categories": [
        "AI研究所"
      ],
      "tags": [],
      "summary": "快速上手 Agent Harness 实战 MicroHarness 本笔记根据视频 37242142994 1 192.mp4 的画面、音频和压缩预览分析整理。视频封面文字显示主题为“快速上手 Agent Harness 实战 MicroHarness”，右上角出现“从 demo 到资产 / 智能运维 Labs”。 目录关联 所属目录：AI记录/内容/目录...",
      "wordCount": 2837,
      "sourceFile": "mydata/我的数据/AI记录/内容/快速上手Agent Harness实战-MicroHarness.md",
      "markdown": "# 快速上手 Agent Harness 实战 - MicroHarness\n\n> 本笔记根据视频 `37242142994-1-192.mp4` 的画面、音频和压缩预览分析整理。视频封面文字显示主题为“快速上手 Agent Harness 实战 - MicroHarness”，右上角出现“从 demo 到资产 / 智能运维 Labs”。\n\n## 目录关联\n\n- 所属目录：[[AI记录/内容/目录]]\n- 上级目录：[[AI记录/目录/AI研究所]]\n- 原始视频：[37242142994-1-192.mp4](https://www.bilibili.com/video/BV1s7DuB8EH5?spm_id_from=333.788.videopod.sections&vd_source=dfffe82bc2cd0000c53b3ae7b4b066d3)\n\n## 一句话总结\n\n这个视频用一个最小可运行项目 MicroHarness，讲解如何把 Agent Harness 的核心能力拆成配置、提示词、工具、安全、记忆和主流程几个层级，并通过 LangGraph、Claude、工具调用和本地记忆文件构建一个可交互的 AI Agent 原型。\n\n## 核心主题\n\n视频的重点不是介绍一个庞大框架的所有功能，而是通过 MicroHarness 展示 Agent Harness 的最小闭环：\n\n1. 用自然语言输入任务。\n2. Agent 根据系统提示和历史记忆理解任务。\n3. Agent 调用工具生成文件或执行代码。\n4. 高风险动作需要用户确认。\n5. 执行结果写入记忆，供后续任务继续使用。\n\nMicroHarness 的价值在于“看得懂、跑得起来、能扩展”。它把 Agent 系统中最关键的部件拆成少量文件，让开发者先理解工作机制，再决定是否扩展成更复杂的生产级 Agent Harness。\n\n## 关键概念\n\n### Agent Harness\n\nAgent Harness 可以理解为 AI Agent 的运行外壳或执行框架。它负责把大语言模型、提示词、工具、安全策略、状态流转和记忆系统组织起来，让 Agent 不只是回答问题，而是能够按任务循环执行。\n\n在视频语境里，Agent Harness 的核心价值是：\n\n- 管理模型配置和 Provider。\n- 组织系统提示词和任务上下文。\n- 暴露工具给 Agent 使用。\n- 对危险操作设置安全边界。\n- 保存历史交互和执行结果。\n- 把上述能力串成稳定的 Agent 工作流。\n\n### MicroHarness\n\nMicroHarness 是 Agent Harness 的最小可运行实现。它通常包含少量文件，但覆盖完整闭环：\n\n- 配置读取。\n- Prompt 组装。\n- 工具定义。\n- 记忆读写。\n- LangGraph 工作流。\n- CLI 交互入口。\n\n视频里强调，MicroHarness 更像一个学习和验证用的“骨架项目”，适合用来理解 Agent Harness 的核心结构，而不是一开始就直接进入大而全的框架。\n\n### AI Agent\n\nAI Agent 是能够围绕目标自主推进任务的智能程序。和普通聊天机器人相比，Agent 通常具备：\n\n- 任务规划或逐步思考。\n- 工具调用能力。\n- 文件读写、代码执行等操作能力。\n- 短期上下文和长期记忆。\n- 安全确认或沙箱隔离机制。\n\n### Tools\n\nTools 是 Agent 能够调用的外部能力。视频中提到的典型工具包括：\n\n- `write_file`：写入文件。\n- `execute_python`：执行 Python 代码。\n- 其他可扩展工具：读取文件、搜索、调用 API、执行脚本等。\n\n工具层是 Agent 从“会说”变成“会做”的关键。\n\n### Sandbox\n\nSandbox 是安全隔离环境，用于运行 Agent 生成或调用的代码。它的作用是限制潜在危险操作，避免 Agent 直接影响主机系统或重要文件。\n\n视频中强调，Agent 能执行代码就必须配套安全策略，否则工具调用能力会变成风险源。\n\n### Memory\n\nMemory 是 Agent 的记忆模块。MicroHarness 中的长期记忆通常通过 `memory.json` 保存，用于记录历史任务、执行结果和关键信息。\n\n记忆系统的作用：\n\n- 让 Agent 在后续任务中复用已知上下文。\n- 保存执行过程和结果。\n- 支持从一次性问答升级为连续协作。\n\n## 技术栈与术语\n\n视频中出现或讲解的工具、框架和配置项包括：\n\n- Agent Harness：Agent 执行框架。\n- MicroHarness：最小可运行 Agent Harness 实现。\n- LangGraph：用于组织 Agent 状态机和工作流。\n- LangChain：Agent 工具、模型调用等生态组件。\n- Claude：Anthropic 提供的大语言模型。\n- Anthropic：Claude 的服务提供方。\n- LLM：Large Language Model，大语言模型。\n- `.env`：本地环境配置文件。\n- `requirements.txt`：Python 依赖声明文件。\n- `memory.json`：长期记忆存储文件。\n- Provider：模型服务提供商，例如 Anthropic。\n- API Key：模型服务鉴权密钥。\n- API URL：模型服务接口地址。\n- Model：具体使用的模型，例如 `claude-3-sonnet-20240229`。\n\n## MicroHarness 文件结构理解\n\n### `config.py`\n\n配置层负责读取 `.env` 中的环境变量，并把这些配置转换成程序可用的模型连接参数。\n\n典型职责：\n\n- 加载 Provider。\n- 加载 API Key。\n- 加载 API URL。\n- 加载模型名称。\n- 根据 Provider 自动匹配不同模型服务的调用方式。\n\n这一层的核心原则是：不要把密钥和模型配置写死在业务代码里。\n\n### `prompts.py`\n\n提示层定义 Agent 的系统提示词，决定 Agent 的身份、行为边界、工具使用规则和记忆使用方式。\n\n典型职责：\n\n- 定义 Agent 的角色。\n- 说明 Agent 能调用哪些工具。\n- 规定遇到高风险动作时如何处理。\n- 把历史记忆注入当前上下文。\n\n视频中提到 `load_memory` 的作用：在每次任务前加载已有记忆，让 Agent 能接续历史上下文工作。\n\n### `tools.py`\n\n工具层定义 Agent 可以执行的动作。它是 Agent Harness 的能力出口。\n\n典型职责：\n\n- 提供文件写入工具。\n- 提供 Python 执行工具。\n- 包装工具参数和返回值。\n- 在执行前做安全检查。\n\n其中 `is_dangerous` 一类函数用于识别危险命令或危险代码，例如可能删除文件、覆盖目录、访问敏感路径的操作。\n\n### `memory.py`\n\n记忆层负责读写长期记忆。\n\n典型职责：\n\n- 读取 `memory.json`。\n- 写入新的任务、代码和执行结果。\n- 格式化记忆内容，供 Prompt 使用。\n- 处理记忆文件不存在或为空的情况。\n\n这一层让 Agent 不再只是“当前轮对话”的执行器，而是能积累上下文的长期助手。\n\n### `harness.py`\n\n主入口负责把配置、提示词、工具、记忆和 LangGraph 工作流整合起来。\n\n典型职责：\n\n- 启动 CLI。\n- 接收用户输入的任务。\n- 构建 Agent 工作流。\n- 调用模型。\n- 处理工具调用。\n- 触发用户确认。\n- 执行工具。\n- 更新记忆。\n\n它是整个 MicroHarness 的中枢。\n\n## 实操流程\n\n### 1. 获取项目\n\n从 GitHub 克隆 MicroHarness 项目到本地。视频强调，这一步的目标是拿到一个可运行的最小 Agent Harness，而不是直接处理复杂生产框架。\n\n### 2. 配置环境变量\n\n复制示例环境文件：\n\n```powershell\nCopy-Item microharness.example.env .env\n```\n\n然后在 `.env` 中填写关键配置：\n\n```dotenv\nPROVIDER=anthropic\nANTHROPIC_API_KEY=你的 API Key\nANTHROPIC_API_URL=你的 API URL\nMODEL=claude-3-sonnet-20240229\n```\n\n实际字段名以项目模板为准。视频中的重点是配置 Provider、API Key、API URL 和 Model。\n\n### 3. 安装依赖\n\n进入项目目录后安装 Python 依赖：\n\n```powershell\npip install -r requirements.txt\n```\n\n### 4. 启动 Agent\n\n运行主程序：\n\n```powershell\npython harness.py\n```\n\n启动后，终端会出现类似 `Task:` 的输入提示。\n\n### 5. 输入自然语言任务\n\n可以输入类似任务：\n\n```text\n写一个生成斐波那契数列的 Python 脚本\n```\n\nAgent 会根据任务调用模型进行推理，生成代码或操作方案。\n\n### 6. 用户确认后执行\n\n当 Agent 准备执行代码或写文件时，流程中会出现确认步骤。用户输入 `yes` 后才执行。\n\n这个确认点非常重要，因为它把 Agent 的自动化能力和用户的控制权连接起来。\n\n### 7. 写入长期记忆\n\n执行完成后，任务、生成内容、执行结果会写入 `memory.json`。\n\n后续再运行任务时，Agent 可以读取这份记忆，从而具备连续性。\n\n## Agent 工作循环\n\n可以把 MicroHarness 的运行过程理解为以下循环：\n\n```text\n用户输入任务\n  -> 加载配置\n  -> 加载历史记忆\n  -> 组装系统提示词\n  -> 调用 LLM\n  -> 判断是否需要工具\n  -> 安全检查\n  -> 用户确认\n  -> 执行工具\n  -> 返回结果\n  -> 写入记忆\n  -> 等待下一次任务\n```\n\n这个循环就是一个最小 Agent Harness 的基本骨架。\n\n## 安全机制\n\n视频特别强调安全边界。因为 Agent 拥有写文件和执行代码的能力，所以必须避免危险操作自动发生。\n\nMicroHarness 中的安全机制主要包括：\n\n- 在工具层做危险命令识别。\n- 对执行类工具增加用户确认。\n- 尽量在沙箱环境中运行代码。\n- 不让模型直接无约束操作真实系统。\n- 对写文件、执行脚本等行为保留可见日志。\n\n这里的关键理念是：能力越强，边界越要清晰。\n\n## 记忆机制\n\nMicroHarness 的记忆机制比较朴素，但足以说明 Agent 记忆系统的基本思想。\n\n记忆写入内容可能包括：\n\n- 用户任务。\n- Agent 生成的方案。\n- 工具调用结果。\n- 代码执行输出。\n- 错误信息和修正记录。\n\n这种记忆可以帮助 Agent 在后续任务中理解“之前已经做过什么”，避免每次都从零开始。\n\n但视频中的 `memory.json` 也更像最小实现。真实项目中可以继续扩展为：\n\n- 向量数据库记忆。\n- 分层记忆。\n- 项目级知识库。\n- 会话摘要。\n- 可检索的任务历史。\n\n## 时间线摘要\n\n### 00:00-00:11 开场\n\n介绍视频主题：快速上手 Agent Harness 实战，聚焦 MicroHarness。\n\n### 00:11-00:48 MicroHarness 定位\n\n说明 MicroHarness 是 Agent Harness 的最小可运行实现，适合用于学习框架结构和运行闭环。\n\n### 00:48-02:07 环境配置\n\n讲解如何准备 `.env`，配置 Provider、API Key、API URL 和 Model。\n\n### 02:07-03:35 运行演示\n\n演示通过 `python harness.py` 启动 Agent，在终端输入任务，观察 Agent 生成代码、等待确认、执行并更新记忆。\n\n### 03:35-09:40 代码结构拆解\n\n逐个讲解 `config.py`、`prompts.py`、`tools.py`、`memory.py`、`harness.py` 的职责，以及它们如何组成 Agent Harness 的完整链路。\n\n### 09:40-11:12 总结与扩展\n\n总结 MicroHarness 的核心思想，并提到后续可以扩展更多模型、工具、安全策略和记忆系统。\n\n## 可复用的设计原则\n\n1. 先做最小闭环，再扩展复杂能力。\n2. 配置、提示词、工具、记忆、主流程要分层。\n3. 工具调用必须有安全边界。\n4. 代码执行类能力必须有确认机制或沙箱。\n5. 记忆系统即使简单，也能显著提高 Agent 的连续协作能力。\n6. Prompt 不只是“提示语”，而是 Agent 行为规则的一部分。\n7. Agent Harness 的重点是编排，不只是模型调用。\n\n## 可扩展方向\n\n基于 MicroHarness，可以继续扩展：\n\n- 支持更多 Provider，例如 OpenAI、本地模型、OpenRouter 等。\n- 增加更多工具，例如文件读取、网页搜索、数据库查询、Git 操作。\n- 把 `memory.json` 替换成数据库或向量库。\n- 引入更严格的沙箱执行环境。\n- 为工具调用增加权限分级。\n- 增加任务日志和可观测性。\n- 把 CLI 交互升级为 Web UI。\n- 增加多 Agent 协作流程。\n\n## 对自己的启发\n\n如果要构建一个可控的 Agent 系统，不应该一开始只关注模型能力，而要先把 Harness 设计好：\n\n- 模型负责推理。\n- Prompt 负责规则。\n- Tools 负责行动。\n- Sandbox 负责安全。\n- Memory 负责连续性。\n- Harness 负责把所有部分稳定编排起来。\n\nMicroHarness 的意义在于，它用最少文件呈现了这套关系，适合作为理解 Agent 工程化的入口。"
    }
  ]
};
