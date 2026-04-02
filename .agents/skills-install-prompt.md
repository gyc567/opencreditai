# 一键安装所有 Skills 提示词

> 将以下内容复制给任意 AI Agent 即可一键安装所有技能

---

## 基础版：安装项目内置 Skills

```markdown
请安装 OpenCreditAi 项目中的所有内置 skills：

skills 目录位置: .agents/skills/

已安装的 skills 列表：
- adapt - 响应式设计适配
- animate - 动画与微交互
- audit - 界面质量审计
- backend-patterns - 后端编码规范
- bolder - 增强视觉效果
- clarify - 改进 UX 文案
- code-change-verification - 代码变更验证
- colorize - 添加色彩
- critique - 设计评价
- delight - 愉悦体验设计
- deploy - 部署技能
- distill - 简化设计
- extract - 提取设计系统
- frontend-design - 前端界面设计
- frontend-patterns - 前端编码规范
- harden - 强化界面
- integration-tests - 集成测试
- ljg-roundtable - 圆桌讨论框架
- normalize - 规范化设计
- onboard - 用户引导设计
- optimize - 性能优化
- polish - 打磨细节
- quieter - 降低视觉强度
- security-review - 安全审查
- teach-impeccable - 教学设置

请执行以下步骤：
1. 遍历 .agents/skills/ 目录
2. 读取每个 skill 的 SKILL.md 文件
3. 将每个 skill 安装到 Claude Code 的 skills 系统中
4. 验证安装成功
```

---

## 完整版：安装内置 + 外部 Skills

```markdown
请完成以下批量安装任务：

## 第一部分：安装项目内置 Skills

遍历 .agents/skills/ 目录，安装所有子目录中的 SKILL.md 文件定义的 skills。

## 第二部分：安装外部 Skills 仓库

从以下 GitHub 仓库安装更多高质量 skills：

### 1. lijigang/ljg-skills
仓库地址: https://github.com/lijigang/ljg-skills/tree/master/skills

需要安装的 skills:
- ljg-roundtable (如已安装则跳过)
- ljg-god-mode
- ljg-elon-musk
- ljg-cia-interrogation
- ljg-mencius
- ljg-zhou-enlai
- ljg-sun-tzu
- 以及其他可用的 skills

安装方式：
1. 克隆或下载仓库
2. 读取每个 skill 的 SKILL.md
3. 安装到本地 skills 目录

### 2. 其他推荐仓库
- anthropics/claude-code-skills
- topofskye/claude-code-plugins

## 第三部分：验证安装

安装完成后，运行以下命令验证：
- 列出所有已安装的 skills
- 确认数量达到预期

## 输出

完成后报告：
- 安装了多少个内置 skills
- 安装了多少个外部 skills
- 任何安装失败的情况
```

---

## 极简版：一句话安装

```markdown
请安装 .agents/skills/ 目录下所有 skills，并从 https://github.com/lijigang/ljg-skills 安装额外的 ljg-* 系列 skills。完成后列出所有已安装的 skills。
```

---

## 脚本版：可复制到终端执行

```bash
#!/bin/bash
# OpenCreditAi Skills 批量安装脚本

echo "🚀 开始安装 OpenCreditAi Skills..."

# 1. 安装内置 skills
echo "📦 安装内置 skills..."
for dir in .agents/skills/*/; do
    skill_name=$(basename "$dir")
    echo "  - 安装: $skill_name"
    # 这里添加实际的安装命令
done

# 2. 克隆外部仓库
echo "📥 克隆外部 skills 仓库..."
git clone https://github.com/lijigang/ljg-skills.git /tmp/ljg-skills

# 3. 安装外部 skills
echo "📦 安装外部 skills..."
for dir in /tmp/ljg-skills/skills/ljg-*/; do
    skill_name=$(basename "$dir")
    echo "  - 安装: $skill_name"
    # 这里添加实际的安装命令
done

echo "✅ 安装完成！"
```

---

## 自动化安装 Prompt（推荐）

```markdown
你是 Claude Code 的 Skills 安装助手。

你的任务是：
1. 读取 .agents/skills/ 目录下所有 SKILL.md 文件
2. 理解每个 skill 的功能、触发词和安装要求
3. 将它们安装到 Claude Code skills 系统中
4. 对于外部仓库（如 https://github.com/lijigang/ljg-skills），同样读取并安装

安装标准：
- 每个 skill 必须有唯一的 name
- 必须包含触发关键词（用于 user-invokable）
- 必须包含完整的 description
- 必须包含核心 instructions

完成后输出安装报告。
```

---

## 使用说明

| 场景 | 推荐版本 |
|------|----------|
| 快速安装内置 skills | 基础版 |
| 安装所有（包括外部） | 完整版 |
| 极简操作 | 极简版 |
| 终端用户 | 脚本版 |
| 自动化流程 | 自动化安装 Prompt |

---

**提示**: 完整的 skills 列表和最新版本请访问 https://www.opencreditai.com/dojo
