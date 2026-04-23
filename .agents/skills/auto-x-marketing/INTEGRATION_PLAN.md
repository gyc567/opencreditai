# x-tweet-fetcher Integration Plan

## 1. Overview

### 1.1 What is x-tweet-fetcher?
- **Repository**: https://github.com/ythx-101/x-tweet-fetcher
- **Stars**: 769
- **Language**: Python
- **Purpose**: Fetch Twitter/X data without API authentication

### 1.2 Available Backends
| Backend | Speed | Dependencies | Features |
|---------|-------|--------------|----------|
| nitter | Fastest | None (self-hosted) | Full Twitter data |
| browser | Medium | Playwright | Full Twitter data |
| auto | Slowest | None | Automatic fallback |

### 1.3 Supported Operations
- Single tweet fetching
- Reply threads
- User timeline
- User mentions
- Search results
- List tweets
- Articles/long-form posts
- Profile information

---

## 2. Integration Strategy

### 2.1 Two Options for Integration

#### Option A: Clone Submodule (Recommended)
- Clone x-tweet-fetcher as a git submodule or copy into skill directory
- Full control over version and customization
- Suitable for offline/enterprise use

#### Option B: API Wrapper
- Create a thin wrapper that calls x-tweet-fetcher CLI
- Simpler but requires Python installation
- Better for lightweight deployments

### 2.2 Recommendation
**Option A: Copy into skill directory** (`utils/x-tweet-fetcher/`)
- Zero external dependencies at runtime
- Predictable behavior across environments
- No version drift concerns
- Self-contained

---

## 3. Directory Structure

```
auto-x-marketing/
├── SKILL.md
├── TUTORIAL.md
├── evals.json
├── BOOTSTRAP.md
├── AGENTS.md
├── references/
│   ├── SOUL.md
│   ├── viral-copywriting.md
│   ├── audience-analytics.md
│   ├── content-calendar.md
│   └── campaign-optimizer.md
└── utils/                          # NEW: Utility projects
    └── x-tweet-fetcher/            # NEW: Twitter fetcher
        ├── main.py                 # Entry point
        ├── scripts/                # Existing scripts
        │   ├── get_tweet.py
        │   ├── get_timeline.py
        │   ├── get_replies.py
        │   ├── get_mentions.py
        │   ├── search.py
        │   └── get_list.py
        ├── config/
        │   └── nitter_instances.json
        └── requirements.txt
```

---

## 4. Exposed Tools

### 4.1 Tool Mapping

| Skill Feature | x-tweet-fetcher Script | Purpose |
|---------------|----------------------|---------|
| Trend Research | `search.py` | Find trending topics |
| Content Inspiration | `get_timeline.py` | Analyze top profiles |
| Competitor Analysis | `get_mentions.py` | Monitor competitors |
| Reply Research | `get_replies.py` | Study viral threads |
| Article Aggregation | Nitter direct | Get long-form content |
| Profile Data | `get_tweet.py` | Profile metadata |

### 4.2 Tool Interface Design

Each tool should follow a standardized interface:

```yaml
name: twitter_search
description: Search Twitter for trending topics and content
parameters:
  query: string (required)
  limit: integer (optional, default: 20)
  filter: enum [latest, top, media] (optional)
```

---

## 5. Nitter Self-Hosted Requirement

### 5.1 Challenge
As of March 2026, **public Nitter instances are no longer available**. The service requires self-hosting.

### 5.2 Solutions

#### Solution A: Embedded Mini Nitter (Recommended)
- Bundle a minimal Nitter instance configuration
- Provide Docker Compose setup
- User deploys locally or on their infrastructure

#### Solution B: Browser Fallback (Default)
- Use Playwright-based browser backend as primary
- No external service required
- Slower but reliable

#### Solution C: Third-Party API
- Optional: Integrate with alternative services (e.g., Nittertrex)
- Not recommended - adds external dependency

### 5.3 Recommended Configuration

```
Backend Priority:
1. browser (default) - Most reliable
2. nitter (optional) - For users with self-hosted Nitter
```

---

## 6. Error Handling & Fallbacks

### 6.1 Error Categories

| Error Type | Handling |
|------------|----------|
| Network timeout | Retry 3x, then fallback to browser |
| Rate limiting | Exponential backoff (1s, 2s, 4s) |
| Account suspended | Switch to public data mode |
| Nitter unavailable | Fallback to browser backend |

### 6.2 Graceful Degradation
- If x-tweet-fetcher fails → Log warning → Continue with manual input
- If browser backend fails → Fallback to search-only mode
- If all fail → Clear error message with setup instructions

---

## 7. Implementation Steps

### Phase 1: Preparation (No Code)
- [ ] Finalize directory structure
- [ ] Document tool interfaces
- [ ] Write error handling specs

### Phase 2: Integration (Implementation)
- [ ] Copy x-tweet-fetcher to utils/
- [ ] Create wrapper scripts in utils/
- [ ] Add configuration for defaults
- [ ] Update SKILL.md with tool definitions

### Phase 3: Testing
- [ ] Test each exposed tool
- [ ] Verify error handling
- [ ] Test graceful fallbacks

### Phase 4: Documentation
- [ ] Update TUTORIAL.md with x-tweet-fetcher setup
- [ ] Add troubleshooting section
- [ ] Document all exposed tools

---

## 8. Files to Modify

| File | Changes |
|------|---------|
| SKILL.md | Add tools section with x-tweet-fetcher integrations |
| TUTORIAL.md | Add "Twitter Data Fetching" section |
| BOOTSTRAP.md | Add x-tweet-fetcher to prerequisites |
| references/SOUL.md | Update to mention Twitter integration |

---

## 9. Backward Compatibility

- If user already has x-tweet-fetcher installed → Use existing installation
- If user doesn't have it → Use bundled version
- Check for existing installation first, then fall back to bundled

---

## 10. Summary

This integration adds powerful Twitter data fetching capabilities to auto-x-marketing:

- **Zero external API dependencies** - All data fetching via x-tweet-fetcher
- **Flexible backends** - Browser (default) or Nitter (optional)
- **Graceful fallbacks** - Always functional, even with partial failures
- **Self-contained** - No lock-in to external services

The plan is ready for implementation. Shall I proceed with Phase 1?