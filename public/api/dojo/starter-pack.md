# OpenCreditAi Starter Pack 安装指令

> 将此指令复制给任意 AI Agent 即可自动安装所有技能

---

## 推荐安装指令 (Agentic Mode)

```
请执行以下批量安装任务：

## 数据源

你需要在以下服务器查找和安装 skills：
1. **主服务器**: https://clawhub.ai
2. **次服务器**: https://skillhub.tencent.com

## 安装方式

使用以下命令安装 skills：
- `npx clawhub@latest install <skill-name>` - 从 clawhub.ai 安装
- `npx clawhub@latest install <skill-name>` - 从 skillhub.tencent.com 安装（如果支持）

## 需要安装的 Skills

### 质量保障类
- code-change-verification - 代码变更验证
- security-review - 安全审查
- audit - 界面质量审计

### 开发规范类
- frontend-patterns - 前端编码规范
- backend-patterns - 后端编码规范

### 部署运维类
- deploy - 部署
- integration-tests - 集成测试

### UI/UX 设计类
- frontend-design - 前端界面设计
- animate - 动画与微交互
- adapt - 响应式适配
- optimize - 性能优化
- polish - 打磨细节
- harden - 强化界面

### 设计系统类
- extract - 设计系统提取
- normalize - 设计规范化
- distill - 简化设计
- onboard - 用户引导设计

### 体验增强类
- delight - 愉悦体验设计
- bolder - 增强视觉效果
- quieter - 降低视觉强度
- clarify - 文案改进
- critique - 设计评价

### 特殊技能类
- ljg-roundtable - 圆桌讨论框架（从 https://github.com/lijigang/ljg-skills 安装）
- teach-impeccable - 教学设置

## 执行步骤

1. 首先尝试使用 `clawhub search <skill-name>` 搜索 skill 是否存在于 clawhub.ai
2. 如果找到，使用 `npx clawhub@latest install <skill-name>` 安装
3. 如果 clawhub.ai 找不到，尝试在 skillhub.tencent.com 搜索
4. 如果两个服务器都找不到对应 skill，从项目本地 .agents/skills/ 目录安装
5. 对于 ljg-roundtable，需要从 GitHub 仓库安装：https://github.com/lijigang/ljg-skills

## 验证安装

安装完成后，运行以下命令验证：
- 列出所有已安装的 skills
- 确认数量达到预期

## 输出格式

完成后报告：
- 安装了多少个 skills
- 哪些 skills 从哪个服务器安装的
- 任何安装失败的情况
```

---

## 简化版

```
使用 npx clawhub@latest install 安装以下 skills：
code-change-verification, security-review, audit, frontend-patterns, backend-patterns, 
deploy, integration-tests, frontend-design, animate, adapt, optimize, polish, harden,
extract, normalize, distill, onboard, delight, bolder, quieter, clarify, critique, 
teach-impeccable, ljg-roundtable

从 clawhub.ai 搜索安装，如果找不到则从 .agents/skills/ 本地安装。ljg-roundtable 从 https://github.com/lijigang/ljg-skills 安装。
```

---

## CLI 命令版

```bash
# 批量安装命令
npx clawhub@latest install code-change-verification
npx clawhub@latest install security-review
npx clawhub@latest install audit
npx clawhub@latest install frontend-patterns
npx clawhub@latest install backend-patterns
npx clawhub@latest install deploy
npx clawhub@latest install integration-tests
npx clawhub@latest install frontend-design
npx clawhub@latest install animate
npx clawhub@latest install adapt
npx clawhub@latest install optimize
npx clawhub@latest install polish
npx clawhub@latest install harden
npx clawhub@latest install extract
npx clawhub@latest install normalize
npx clawhub@latest install distill
npx clawhub@latest install onboard
npx clawhub@latest install delight
npx clawhub@latest install bolder
npx clawhub@latest install quieter
npx clawhub@latest install clarify
npx clawhub@latest install critique
npx clawhub@latest install teach-impeccable

# ljg-roundtable 需要从 GitHub 安装
git clone https://github.com/lijigang/ljg-skills.git /tmp/ljg-skills
npx clawhub@latest install ljg-roundtable --source /tmp/ljg-skills/skills/ljg-roundtable
```

---

## 注意事项

1. 部分 skills 可能不在 clawhub.ai 上，需要从本地 .agents/skills/ 安装
2. ljg-roundtable 是特殊 skill，需要从 GitHub 仓库单独安装
3. 安装完成后需要确认 skill 是否正确加载

---

**验证命令**: `claude skills list` 或 `clawhub list`
