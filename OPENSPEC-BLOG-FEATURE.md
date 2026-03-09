# OpenSpec: Blog Feature for New User Tutorials

## Summary
Replace "Skills" menu item with "Blog" and create a blog section with tutorial articles for new users. Modeled after https://www.shopclawmart.com/blog

## Goals
- Update navigation: "Skills" → "Blog" (linking to /blog)
- Create blog listing page at /blog
- Add tutorial articles for new users (in English)
- Match design style of reference site (Claw Mart Blog)

## UI/UX Specification

### Layout
- Header with "Insights" title and subtitle
- Grid of blog post cards (2-3 columns on desktop, 1 on mobile)
- Each card: featured image, date, read time, title, excerpt, "Read article →" link

### Blog Card Component
- Image: 16:9 aspect ratio, rounded corners
- Title: Bold, truncated to 2 lines
- Excerpt: Muted text, truncated to 3 lines
- Meta: Date + read time
- Hover: Subtle lift effect with shadow

### Tutorial Content (New User Focus)
1. **Getting Started with ClawSkillStore** - How to browse and install skills
2. **How to Create Your First Skill Listing** - Seller guide
3. **Understanding Skill Pricing** - Free vs paid skills
4. **Installing Skills in Your AI Agent** - Technical guide
5. **Best Practices for Skill Descriptions** - Seller tips

## Implementation

### 1. Navigation Update (`components/navbar.tsx`)
- Change `{ label: t.skills, href: "#skills" }` to `{ label: "Blog", href: "/blog" }`

### 2. Blog Page (`app/blog/page.tsx`)
- Server component with blog post data
- Responsive grid layout
- Match existing page patterns (hero, content area)

### 3. Blog Data (`lib/blog-data.ts`)
- Static data array with tutorial articles
- TypeScript interface for BlogPost

### 4. Blog Card Component (`components/blog/blog-card.tsx`)
- Reusable card component
- Props: post object

### 5. Tests
- BlogCard component tests
- Blog page render tests

## Acceptance Criteria
1. Navigation shows "Blog" instead of "Skills"
2. /blog page loads with tutorial articles
3. All blog cards render correctly
4. Responsive design works on mobile/desktop
5. All new code has tests
6. Build passes
7. No regression in existing features
