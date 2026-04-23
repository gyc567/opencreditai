---
name: auto-x-marketing
description: Complete X/Twitter automated marketing AI employee. Use when planning X/Twitter content strategy, writing viral posts, analyzing audience growth, scheduling content calendar, or managing X Ads campaigns. Triggers: "帮我运营X账号", "写推文", "分析粉丝", "内容日历", "X Ads优化", "涨粉策略", "twitter marketing", "X campaign".
license: MIT
compatibility: Works with Claude Code, OpenCode, and other skills-compatible agents. Requires network access for X API.
metadata:
  author: auto-x-marketing
  version: "1.0.0"
---

# Auto-X Marketing

X/Twitter Automated Marketing AI Employee - 独立开发者、小型创业公司、solo founder 的 X 增长助手

---

## Overview

Auto-X Marketing 是一个完整的 X/Twitter 自动化营销 AI 员工，包含 4 大专业能力：

1. **viral-copywriter** - 爆款文案撰写专家
2. **audience-analytics** - 受众分析与增长追踪专家
3. **content-calendar** - 内容日历规划专家
4. **campaign-optimizer** - X Ads 广告优化专家

用户安装后 10 分钟内完成 onboarding 并开始工作，实现"买来就能干活"的自动化 X 营销生产力。

---

## Quick Start

### Installation

```
openclaw clawstore install auto-x-marketing
```

### First Launch

安装完成后，技能会自动触发 BOOTSTRAP.md onboarding 流程：

1. 账户诊断 - 检查当前 X 账号状态
2. 目标确认 - 明确营销目标
3. 资源准备 - 检查已有内容素材
4. 首周计划 - 生成启动计划

---

## Skills Usage

### viral-copywriter

**用途**：撰写高效的 X 推文内容

**触发词**：
- "写一条推广推文"
- "帮我写个 thread"
- "优化推文文案"
- "生成引流内容"

**示例**：
```
User: "写一条推广我 AI 笔记工具的推文"
-> 调用 viral-copywriter 生成 5 个文案变体
```

---

### audience-analytics

**用途**：分析受众画像、追踪增长数据

**触发词**：
- "分析我的粉丝"
- "查看增长数据"
- "受众画像是什么"
- "增长策略"

**示例**：
```
User: "我的目标受众是谁"
-> 调用 audience-analytics 生成受众分析报告
```

---

### content-calendar

**用途**：规划内容日历、协调发布节奏

**触发词**：
- "规划本月内容"
- "制定发布计划"
- "内容日历"
- "每周发什么"

**示例**：
```
User: "帮我规划下个月的内容"
-> 调用 content-calendar 生成内容日历
```

---

### campaign-optimizer

**用途**：X Ads 广告投放与优化

**触发词**：
- "投放 X Ads"
- "优化广告"
- "广告投放策略"
- "ROAS 优化"

**示例**：
```
User: "帮我设置一个广告系列"
-> 调用 campaign-optimizer 生成投放方案
```

---

## Automation Workflow

### Full Workflow

```
1. 账号诊断 (audience-analytics)
   ↓
2. 内容策略 (viral-copywriter)
   ↓
3. 日历规划 (content-calendar)
   ↓
4. 有机发布 (auto)
   ↓
5. 数据复盘 (audience-analytics)
   ↓
6. 付费推广 (campaign-optimizer, optional)
```

### Daily Routine

技能会根据 AGENTS.md 中的日常节奏自动执行：

- **Daily**: 检查数据、执行必要调整
- **Weekly**: 周度复盘与计划更新
- **Monthly**: 月度策略评估与调整

---

## File Structure

```
auto-x-marketing/
├── SKILL.md                    # 本文件 - 入口
├── BOOTSTRAP.md               # 首次激活流程
├── AGENTS.md                  # 日常工作节奏
├── references/
│   ├── SOUL.md               # 人格设定
│   ├── viral-copywriting.md  # 爆款文案指南
│   ├── audience-analytics.md # 受众分析指南
│   ├── content-calendar.md   # 内容日历指南
│   └── campaign-optimizer.md  # 广告投放指南
└── scripts/                   # 自动化脚本

---

## Key Capabilities

### 1. 内容创作

- [x] 5 种风格文案生成（乔木、小红书、Dankoe 等）
- [x] Thread 结构化产出
- [x] 多版本 A/B 测试
- [x] Hook 优化
- [x] CTA 优化
- [x] Hashtag 推荐

### 2. 受众分析

- [x] 粉丝画像分析
- [x] 增长趋势追踪
- [x] 竞品受众分析
- [x] 数据可视化
- [x] 洞察报告生成

### 3. 内容日历

- [x] 月度规划
- [x] 主题标签设计
- [x] 发布时间优化
- [x] 内容类型分布
- [x] 节奏建议

### 4. 广告投放

- [x] 广告系列设计
- [x] 受众定向
- [x] 创意优化
- [x] 预算管理
- [x] ROAS 优化
- [x] A/B 测试

---

## Integration

### Twitter Data Fetching (x-tweet-fetcher)

This skill includes **x-tweet-fetcher** as a built-in utility for fetching Twitter/X data without API authentication.

#### Usage

```bash
python3 utils/twitter_fetcher.py --mode <operation> [options]
```

#### Available Operations

| Mode | Description | Example |
|------|-------------|---------|
| timeline | Fetch user tweets | `--mode timeline --user elonmusk --limit 10` |
| search | Search by keyword | `--mode search --query "AI agent" --limit 20` |
| tweet | Fetch single tweet | `--mode tweet --url "https://x.com/user/status/123"` |
| replies | Fetch tweet replies | `--mode replies --url "https://x.com/user/status/123"` |
| mentions | Monitor user mentions | `--mode mentions --user @yourhandle` |
| list | Fetch X List tweets | `--mode list --list_id 1455045069516357634` |
| article | Fetch X Article | `--mode article --url "https://x.com/user/article/123"` |

#### Backends

- `auto` (default): Try Nitter first, fallback to browser
- `nitter`: Zero dependencies, requires self-hosted Nitter
- `browser`: Full features, requires Playwright

#### Requirements

```
Python 3.7+
```

Optional (for browser backend):
```
pip install playwright
playwright install chromium
```

#### Configuration

Set Nitter URL for nitter/backend mode:
```bash
export NITTER_URL=http://127.0.0.1:8788
```

Note: Public Nitter instances are unreliable as of March 2026. Use `--backend browser` or self-host Nitter.

### Sub-Skill 调用规则

| 用户需求 | 调用技能 | 优先级 |
|---|---|---|
| 写推文/thread | viral-copywriter | 1 |
| 分析数据 | audience-analytics | 1 |
| 规划发布 | content-calendar | 1 |
| 投放广告 | campaign-optimizer | 2 |
| 完整营销方案 | 全技能串联 | 3 |

### Data Flow

```
audience-analytics -> 洞察数据 -> viral-copywriter: 优化内容方向
viral-copywriter -> 创意内容 -> content-calendar: 填充日历
content-calendar -> 发布计划 -> campaign-optimizer: 协同推广
campaign-optimizer -> 投放数据 -> audience-analytics: 闭环优化
```

---

## Best Practices

### 快速见效建议

1. **第一周**：聚焦 audience-analytics 诊断，了解现状
2. **第二周**：使用 viral-copywriter 生成至少 20 条内容
3. **第三周**：content-calendar 规划持续出版计划
4. **第四周**：campaign-optimizer 测试付费推广

### 核心原则

1. **数据驱动**：所有决策基于数据
2. **渐进优化**：小幅多次调整
3. **A/B 测试**：持续测试迭代
4. **闭环优化**：从数据到行动再到数据

---

## Constraints

### 不提供

- ✗ 不保证特定粉丝增长数字（受多因素影响）
- ✗ 不保证广告投放效果（受预算、竞争影响）
- ✗ 不直接操作用户账户（仅提供策略建议）
- ✗ 不保证特定 ROI（市场波动）

### 边界

- 策略建议需用户授权执行
- 数据分析基于公开/授权信息
- 自动化发布需用户配置 webhook

---

## Support

### 问题排查

1. **技能无响应**：检查安装是否成功
2. **数据缺失**：确认 X API 权限
3. **内容质量**：参考 SOUL.md 人设调整
4. **投放效果**：参考 campaign-optimizer 优化指南

### 进阶资源

- SOUL.md - 完整人设文档
- BOOTSTRAP.md - 首次激活指南
- AGENTS.md - 日常工作节奏
- references/*.md - 各专业技能详细文档

---

## Version

- **Version**: 1.0.0
- **Last Updated**: 2024
- **Compatible**: OpenClaw Platform v1.0+

---

## Installation Command

```
openclaw clawstore install auto-x-marketing
```