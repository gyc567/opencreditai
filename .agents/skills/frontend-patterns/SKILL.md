---
name: frontend-patterns
description: Enforce frontend coding patterns for React components, hooks, and pages in the OpenClaw Skills project. Ensures TypeScript best practices, React patterns, accessibility, and consistent styling.
---

# Frontend Patterns

## Overview

This skill ensures all frontend code follows the project's coding standards. Use when writing or reviewing React components, pages, hooks, or any frontend code.

## TypeScript Guidelines

### Must Do
- Use explicit types for all function parameters and return types
- Use `interface` for object shapes, `type` for unions/intersections
- Use `unknown` instead of `any` when type is truly unknown
- Enable strict mode in tsconfig.json

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User | null> {
  // ...
}

// Avoid
function getUser(id: string): Promise<any> {
  // ...
}
```

### Imports
- Use path alias `@/*` for project imports
- Order: external libraries → internal imports → relative imports
- Use named exports

```typescript
// External
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

// Internal (path alias)
import { Card, CardContent } from "@/components/ui/card";
import { Skill } from "@/lib/skills-data";

// Relative
import { ErrorBoundary } from "./error-boundary";
```

## React Patterns

### Client Components
- Use `"use client"` directive for components with hooks or browser APIs
- Server components by default (no directive needed)

```typescript
"use client";

import { useState, useCallback } from "react";

export function ClientComponent() { ... }
```

### Hooks
- Memoize callbacks with `useCallback` when passed as props
- Memoize expensive computations with `useMemo`
- Extract complex logic into custom hooks

```typescript
interface UseCounterProps {
  initial?: number;
}

export function useCounter({ initial = 0 }: UseCounterProps = {}) {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  return { count, increment, decrement };
}
```

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SkillCard`, `Navbar` |
| Functions | camelCase | `getSkillsByCategory` |
| Variables | camelCase | `isLoading`, `skillList` |
| Interfaces | PascalCase | `Skill`, `UserProfile` |
| Files | kebab-case | `skill-card.tsx`, `navbar.tsx` |

## Component Structure

### File Organization
```
components/
├── ui/                    # Radix UI primitives
├── skill-card.tsx         # Feature component
├── skill-card.test.tsx    # Colocated test
└── index.ts               # Barrel export
```

### Component Template
```typescript
"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  onAction?: () => void;
}

export function ComponentName({ className, onAction }: Props) {
  const [state, setState] = useState(false);

  const handleClick = useCallback(() => {
    onAction?.();
  }, [onAction]);

  return (
    <div className={cn("base-styles", className)}>
      {/* content */}
    </div>
  );
}
```

## Styling

### Tailwind CSS v4
- Use `@theme` directive for custom tokens
- Use `cn()` utility for conditional classes
- Prefer utility classes over custom CSS

```typescript
import { cn } from "@/lib/utils";

<Card className={cn(
  "bg-card border-border",
  isActive && "border-accent"
)} />
```

### Design Tokens
Defined in `app/globals.css`:
```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --card: #111111;
  --accent: #f97316;
  --border: #333333;
  --muted: #1a1a1a;
}
```

## Accessibility

- Use semantic HTML elements
- Add `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Use Radix UI primitives for complex components (Dialog, Tabs, Accordion)

## Testing

- Colocate tests: `component.tsx` → `component.test.tsx`
- Use @testing-library/react
- Target 100% coverage for components

```typescript
import { render, screen } from "@testing-library/react";
import { ComponentName } from "./component-name";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected")).toBeInTheDocument();
  });
});
```

## Files to Check

When reviewing frontend code, check these files for patterns:
- `app/globals.css` - Design tokens
- `lib/utils.ts` - Utility functions (cn, etc.)
- `components/ui/*.tsx` - UI component patterns
