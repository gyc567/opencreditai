# OpenSpec: Agent Style UI Redesign

## Proposal ID
OS-2026-0205-001

## Summary
重构 OpenClawSkills 前端样式，采用更简洁的 agent 网站风格（参考 moltbook.com），保留 KISS 原则、高内聚低耦合，实现 100% 测试覆盖率。

## Design Direction

### Core Style Characteristics
| Aspect | Current | Target (Agent Style) |
|--------|---------|---------------------|
| Font | Geist Sans + Mono | JetBrains Mono (primary) |
| Color | Complex gradients | Black/White + Orange accent |
| Effects | Heavy glow/blur | Minimal, flat design |
| Animation | Elaborate animations | Subtle, functional |
| Cards | Gradient overlays | Clean borders, solid |

### Reference Analysis (moltbook.com)
- Monospace typography signals developer-first approach
- Minimal color palette (black/white + single accent)
- Information-dense but clean layout
- Terminal-adjacent aesthetic
- Agent/human toggle concept

## Requirements

### Functional Requirements
1. **FR-001**: 简化配色系统，使用黑白+橙色强调
2. **FR-002**: 添加 JetBrains Mono 作为主字体
3. **FR-003**: 简化卡片设计，移除过度装饰
4. **FR-004**: 添加 terminal 风格的设计元素
5. **FR-005**: 保持现有功能完全不变

### Non-Functional Requirements
1. **NFR-001**: KISS 原则 - 简化 CSS 复杂度
2. **NFR-002**: 高内聚 - 设计变量集中管理
3. **NFR-003**: 100% 测试覆盖率
4. **NFR-004**: 零回归 - 不影响功能逻辑

## Architecture

### Design Token Structure
```
app/
├── globals.css          # 核心设计变量
components/
├── navbar.tsx           # 简化导航
├── hero.tsx             # 精简 Hero
├── skill-card.tsx       # 简洁卡片
├── footer.tsx           # 简化页脚
```

### Color Palette
```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --card: #111111;
  --card-foreground: #ffffff;
  --border: #333333;
  --accent: #f97316;       /* Orange-500 */
  --accent-foreground: #000000;
  --muted: #1a1a1a;
  --muted-foreground: #888888;
}
```

### Typography
```css
font-mono: 'JetBrains Mono', monospace;
font-sans: system-ui, -apple-system, sans-serif;
```

## Implementation Plan

### Phase 1: Design Tokens (10 min)
- [ ] 更新 globals.css 设计变量
- [ ] 添加 JetBrains Mono 字体
- [ ] 简化色彩系统

### Phase 2: Core Components (20 min)
- [ ] Navbar 样式重构
- [ ] Hero 样式重构
- [ ] SkillCard 样式重构
- [ ] Footer 样式重构

### Phase 3: Support Components (10 min)
- [ ] CategoryNav 样式重构
- [ ] SkillsGrid 样式重构
- [ ] InstallGuide 样式重构
- [ ] FAQ 样式重构

### Phase 4: Testing (15 min)
- [ ] 组件渲染测试
- [ ] 响应式测试
- [ ] 视觉回归验证

## Testing Strategy

### Test Coverage Target: 100%
```typescript
// Component tests required for:
- navbar.test.tsx
- hero.test.tsx
- skill-card.test.tsx
- footer.test.tsx
- category-nav.test.tsx
- skills-grid.test.tsx
- install-guide.test.tsx
- faq.test.tsx
```

## Quality Gates
- [ ] TypeScript 编译通过
- [ ] ESLint 无错误
- [ ] 所有测试通过 (100% coverage)
- [ ] 构建成功

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| 风格变化过大 | Medium | 渐进式重构，保留核心布局 |
| 测试时间不足 | High | 优先核心组件测试 |
| 响应式问题 | Medium | 跨断点验证 |

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-05 | JetBrains Mono | 开发者友好，等宽风格 |
| 2026-02-05 | Orange accent | 温暖醒目，适合工具类 |
| 2026-02-05 | Minimal effects | 性能优先，减少认知负担 |

---
**Status**: PLANNED
**Author**: OpenSpec Generator
**Date**: 2026-02-05
