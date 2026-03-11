# OpenSpec: Brand Rename - to OpenCreditAi

**Version**: 1.0  
**Date**: 2026-03-10  
**Status**: Proposed  

---

## Overview

**Project**: OpenClawSkills Marketplace  
**Goal**: Rename brand from "ClawSkillStore/OpenClawSkills" to "OpenCreditAi" across all frontend pages  

---

## Motivation

The user wants to rebrand the platform to "OpenCreditAi". This involves updating all brand references in the codebase while maintaining code quality and test coverage.

---

## Scope

### Files to Update (22 files, 66 occurrences)

| Category | Files | Count |
|----------|-------|-------|
| Core Config | `app/layout.tsx` | 3 |
| Components | `components/navbar.tsx`, `components/footer.tsx` | 2 |
| Data/Lib | `lib/i18n/en/index.ts`, `lib/skills-data.ts`, `lib/blog-data.ts` | 3 |
| Tests | `lib/skills-data.test.ts`, `components/blog/blog-card.test.tsx` | 2 |
| Blog Pages | `app/blog/page.tsx`, `app/blog/getting-started-with-clawskillstore/page.tsx` | 2 |
| OpenSpecs | `OPENSPEC*.md` (documentation only) | 10 |
| Scripts | `start.sh`, `AGENTS.md` | 2 |

### Replacement Rules

| Pattern | Replacement | Notes |
|---------|-------------|-------|
| `ClawSkillStore` | `OpenCreditAi` | Primary brand name |
| `OpenClawSkills` | `OpenCreditAi` | Secondary brand name |
| `clawskillstore` | `opencreditai` | Lowercase/slug |
| `ClawSkills` | `OpenCreditAi` | Variant |

### Category Rename

| Before | After |
|--------|-------|
| `clawskillstore-tools` | `opencreditai-tools` |

---

## Implementation

### Phase 1: Core Brand Files

1. **`app/layout.tsx`** - Update metadata (title, description, keywords)
2. **`components/navbar.tsx`** - Update logo alt text
3. **`components/footer.tsx`** - Update logo alt text

### Phase 2: Data/Lib Files

4. **`lib/skills-data.ts`** - Update category ID and descriptions
5. **`lib/i18n/en/index.ts`** - Update all i18n strings
6. **`lib/blog-data.ts`** - Update blog titles and excerpts

### Phase 3: Blog Pages

7. **`app/blog/page.tsx`** - Update page content
8. **`app/blog/getting-started-with-clawskillstore/page.tsx`** - Update page content + rename file

### Phase 4: Tests

9. **`lib/skills-data.test.ts`** - Update test assertions
10. **`components/blog/blog-card.test.tsx`** - Update test assertions

### Phase 5: Documentation (Optional)

Update OpenSpec files to reflect new brand name

---

## Testing

- Run existing tests to ensure no regressions
- All test files must pass after updates

---

## Acceptance Criteria

- [ ] All 66 brand occurrences replaced
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No broken links or missing references
