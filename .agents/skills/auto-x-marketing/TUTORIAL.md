# Auto-X Marketing Skill Tutorial

A complete guide to setting up and using the Auto-X Marketing skill for X/Twitter growth.

---

## Table of Contents

1. [What is Auto-X Marketing?](#what-is-auto-x-marketing)
2. [Installation](#installation)
3. [Initial Setup](#initial-setup)
4. [Core Features](#core-features)
5. [Daily Usage](#daily-usage)
6. [Advanced Features](#advanced-features)
7. [Troubleshooting](#troubleshooting)
8. [FAQ](#faq)

---

## What is Auto-X Marketing?

Auto-X Marketing is an AI employee that helps you grow your X/Twitter account **automatically**. Think of it as hiring a dedicated social media manager who works 24/7.

**Who is it for?**
- Solo founders wanting to build their personal brand
- Small startups needing social media presence
- Developers who prefer not to spend time on marketing

**What can it do?**

| Capability | Description |
|------------|-------------|
| **Viral Copywriting** | Write engaging posts that get attention |
| **Audience Analytics** | Understand who your followers are |
| **Content Calendar** | Plan and schedule content strategically |
| **Ad Optimization** | Run effective X Ads campaigns |

---

## Installation

### Prerequisites

1. **Claude Code** or **OpenCode** installed
2. An **X/Twitter account** (optional for testing)
3. **Network access** (for X API)

### Install Commands

```bash
# Via OpenClaw
openclaw clawstore install auto-x-marketing

# Or manually copy
cp -r .agents/skills/auto-x-marketing ~/.claude/skills/
```

### Verify Installation

After installation, you should see:

```
SKILL.md           # Main entry point
BOOTSTRAP.md       # First-time setup
AGENTS.md          # Daily workflow
references/
├── SOUL.md               # Character settings
├── viral-copywriting.md  # Writing guide
├── audience-analytics.md # Analytics guide
├── content-calendar.md   # Planning guide
└── campaign-optimizer.md # Ads guide
```

---

## Initial Setup

### Step 1: First Launch

When you first use the skill, it will automatically run **BOOTSTRAP.md**:

```
You: "帮我运营X账号"
-> Skill triggers BOOTSTRAP.md
-> Auto-X introduces itself
-> Starts account diagnosis
```

### Step 2: Account Diagnosis

Auto-X will check your account status:

```
✓ Checking follower count...
✓ Analyzing recent engagement...
✓ Identifying content patterns...
✓ Generating diagnostic report...
```

### Step 3: Set Your Goals

Tell Auto-X what you want to achieve:

| Goal Type | Example |
|----------|---------|
| Grow followers | "我要涨到 5000 粉丝" |
| More engagement | "提升互动率到 5%" |
| Lead generation | "获取更多业务咨询" |
| Brand awareness | "让更多人知道我的产品" |

### Step 4: First Week Plan

Auto-X generates a personalized action plan:

```
Week 1 Plan:
Day 1-2: Analyze current audience
Day 3-5: Generate 20 content pieces
Day 6-7: Launch first campaign
```

---

## Core Features

### 1. Viral Copywriting (爆款文案)

**What it does**: Writes high-engagement posts for you.

**How to use**:

```
You: "写一条推广我 AI 笔记工具的推文"
-> Auto-X generates 5 variations:
  1. [Hook + Story + CTA]
  2. [Question + Answer]
  3. [Data + Insight]
  4. [Controversy + Opinion]
  5. [Meme + Humor]
```

**Tips for better results**:
- Be specific about your product
- Tell Auto-X your target audience
- Ask for A/B test variations

### 2. Audience Analytics (受众分析)

**What it does**: Analyzes your followers and their behavior.

**How to use**:

```
You: "分析我的粉丝画像"
-> Auto-X outputs:
  - Demographics (location, interests)
  - Active hours
  - Engagement patterns
  - Growth trends
```

**Understand the data**:

| Metric | Meaning |
|--------|---------|
| Engagement Rate | % of followers who interact |
| Impressions | Times your content was seen |
| Reach | Unique users who saw content |
| Follower Velocity | Growth speed over time |

### 3. Content Calendar (内容日历)

**What it does**: Plans your content schedule strategically.

**How to use**:

```
You: "帮我规划下个月的内容"
-> Auto-X generates schedule:
  Week 1: Product stories (3 posts)
  Week 2: Thought leadership (2 posts)
  Week 3: Community engagement (4 posts)
  Week 4: Behind-the-scenes (3 posts)
```

**Content pillars** (recommended mix):

| Type | Percentage | Purpose |
|-----|------------|----------|
| Value/Educational | 40% | Build trust |
| Personal/Story | 20% | Build connection |
| Product/Service | 20% | Drive conversions |
| Engagement | 20% | Build community |

### 4. Campaign Optimizer (广告投放)

**What it does**: Helps you run effective X Ads.

**How to use**:

```
You: "帮我设置一个广告系列"
-> Auto-X asks:
  - What's your budget?
  - Who's your target audience?
  - What's the goal?
-> Generates campaign structure
```

**Basic campaign structure**:

```
Campaign: [Your Campaign Name]
  Ad Group 1: Lookalike Audience
    - Ad: [Variation A]
    - Ad: [Variation B]
  Ad Group 2: Interest-Based
    - Ad: [Variation C]
```

---

## Daily Usage

### Daily Check-in

Every morning, Auto-X runs its routine:

```
You: "今天怎么样"
-> Returns morning brief:
  ## 数据概览
  - 粉丝: 2,520 (+20 yesterday)
  - 互动率: 3.5%
  - 曝光: 12,500
  
  ## 今日建议
  1. [高优] Continue testing hook variations
  2. [中优] Engage with new followers
  3. [低优] Plan weekend content
```

### Manual Commands

| Command | Action |
|---------|--------|
| "今天怎么样" | Morning brief |
| "帮我写一条 [主题]" | Generate content |
| "分析 [账号]" | Analyze account |
| "这周计划是什么" | Weekly plan |
| "下周内容" | Content calendar |
| "广告优化" | Ad optimization |
| "切换到全自动模式" | Enable auto-publish |

### Workflow Modes

#### Semi-Auto Mode (Default)

```
1. Auto-X generates content
2. You review and approve
3. You publish manually
```

**Pros**: Full control, risk mitigation
**Cons**: Requires manual work

#### Full Auto Mode

```
1. Auto-X generates content
2. Auto-X self-reviews
3. Auto-X auto-publishes
```

**Pros**: Completely hands-off
**Cons**: Higher risk, requires trust

**Switch command**: "切换到全自动模式"

---

## Advanced Features

### Trending Response

Auto-X monitors trends and can react:

```
1. Scan trending topics
2. Assess relevance (score 0-100)
3. If score ≥ 70: generate response
4.等待你的 approval or auto-publish
```

### A/B Testing

Test different content variations:

```
You: "测试两个 Hook"
Hook A: "I built a tool that..."
Hook B: "I wasted 3 years on..."
-> Auto-X creates test
-> Tracks engagement
-> Recommends winner
```

### Analytics Deep Dive

Monthly analysis:

```
You: "这个月表现怎么样"
-> Returns:
  - Total impressions
  - Engagement rate trend
  - Best content type
  - Worst performing
  - Recommendations
```

---

## Twitter Data Fetching

This skill includes **x-tweet-fetcher** for fetching Twitter/X data without API authentication.

### Quick Start

```bash
# Fetch user timeline
python3 utils/twitter_fetcher.py --mode timeline --user elonmusk --limit 10

# Search tweets
python3 utils/twitter_fetcher.py --mode search --query "AI agent" --limit 20

# Fetch single tweet
python3 utils/twitter_fetcher.py --mode tweet --url "https://x.com/elonmusk/status/123456789"

# Get replies
python3 utils/twitter_fetcher.py --mode replies --url "https://x.com/elonmusk/status/123456789" --limit 50

# Monitor mentions
python3 utils/twitter_fetcher.py --mode mentions --user "@yourhandle"

# Fetch X List
python3 utils/twitter_fetcher.py --mode list --list_id 1455045069516357634

# Fetch X Article
python3 utils/twitter_fetcher.py --mode article --url "https://x.com/user/article/123"
```

### Backends

| Backend | Speed | Dependencies | Features |
|---------|-------|--------------|----------|
| `auto` (default) | Fast→Slow | Best available | All |
| `nitter` | Fast | Self-hosted Nitter | Timeline, search, replies |
| `browser` | Slow | Playwright | All + Lists + Articles |

### Requirements

- **Minimum**: Python 3.7+ (for nitter mode - zero dependencies)
- **Optional**: `pip install playwright` (for browser mode - full features)

### Nitter Setup (Optional)

Public Nitter instances are unreliable as of March 2026. For production use:

1. Self-host Nitter on your server
2. Set environment variable: `export NITTER_URL=http://127.0.0.1:8788`
3. Or use `--backend browser` for automatic fallback

### Integration with Skills

The Twitter fetcher is used internally by these skills:

- **audience-analytics**: Fetch competitor timelines, mentions
- **viral-copywriter**: Research trending topics, analyze viral tweets
- **content-calendar**: Gather content inspiration from targets

---

## Troubleshooting

### Skill Not Responding

```
Problem: Skill doesn't trigger
Solution:
1. Say trigger words: "帮我运营X账号"
2. Or: "写一条推文"
3. Or: "分析粉丝"
```

### Content Quality Issues

```
Problem: Generated content isn't good
Solution:
1. Be more specific in your prompt
2. Reference SOUL.md for tone
3. Ask for more variations
```

### Data Not Available

```
Problem: Can't get analytics
Solution:
1. Check X API connection
2. Use public data as fallback
3. Manually input key metrics
```

### Routine Not Running

```
Problem: Daily brief doesn't come
Solution:
1. Say "今天怎么样" manually
2. Check AGENTS.md for schedule
3. Verify time zone settings
```

---

## FAQ

### Q: Is this free?

A: The skill is free. However, X API and X Ads may have costs.

### Q: Can it post automatically?

A: Yes, but you need to enable "Full Auto Mode" and configure webhooks.

### Q: What languages does it support?

A: Currently optimized for Chinese and English. Other languages work but may need more prompting.

### Q: How fast will I grow?

A: Growth depends on:
- Content quality
- Posting frequency
- Industry competition
- Network effects

Typical results:
- Month 1: 100-500 new followers
- Month 3: 500-2000 followers
- Month 6: 2000-10000 followers

*(Results vary significantly)*

### Q: Can I cancel anytime?

A: Yes, just stop using the skill. No contracts.

### Q: Does it work with other agents?

A: Yes, it's compatible with Claude Code, OpenCode, and other skills-compatible agents.

---

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│           AUTO-X QUICK REFERENCE            │
├─────────────────────────────────────────────┤
│ Installation:                               │
│   openclaw clawstore install auto-x-marketing│
│                                             │
│ Daily Commands:                             │
│   "今天怎么样" - Morning brief              │
│   "帮我写一条..." - Generate content      │
│   "分析粉丝" - Analytics                  │
│   "内容日历" - Content calendar            │
│   "广告投放" - Ads management               │
│                                             │
│ First Week:                                │
│   Day 1-2: Account diagnosis              │
│   Day 3-5: Generate 20 posts               │
│   Day 6-7: Launch first campaign           │
│                                             │
│ Support:                                   │
│   Check SKILL.md for full documentation    │
│   Check SOUL.md for character settings     │
└─────────────────────────────────────────────┘
```

---

## Next Steps

1. **Read SOUL.md** - Understand Auto-X's personality
2. **Run BOOTSTRAP.md** - Complete initial setup
3. **Generate first content** - Try viral-copywriter
4. **Set up daily routine** - Establish workflow
5. **Monitor and iterate** - Optimize based on data

---

**Need more help?**

- Check `SKILL.md` for full documentation
- Check individual guides in `references/`
- Review `AGENTS.md` for daily workflow

---

*Last updated: 2026-04-14*
*Version: 1.0.0*