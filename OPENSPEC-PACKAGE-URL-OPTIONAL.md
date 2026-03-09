# OpenSpec: Make Package URL Optional

## Summary
Make the Package URL field optional in the listing creation flow. This allows creators to list skills without immediately providing a package URL.

## Goals
- [x] Remove Package URL as required field in form UI
- [ ] Remove Package URL required validation in API
- [ ] Ensure existing functionality not broken

## Implementation

### 1. Form UI (`components/seller/listing-form.tsx`)
- **Current State**: Duplicate code blocks for packageUrl (lines 245-262)
- **Fix**: Remove duplicate blocks, keep only one packageUrl input WITHOUT `required` attribute

### 2. API Validation (`app/api/v1/creators/[id]/listings/route.ts`)
- **Current State**: Corrupted file with duplicate code blocks
- **Fix**: Remove packageUrl required validation (lines 121-126), fix duplicate name validation blocks

## Changes

### Form Changes
```tsx
// Single packageUrl field - NOT required
<div className="space-y-2">
  <Label htmlFor="packageUrl">Package URL</Label>
  <Input
    id="packageUrl"
    placeholder="https://..."
    value={formData.packageUrl}
    onChange={(e) => handleChange("packageUrl", e.target.value)}
  />
</div>
```

### API Changes
- Remove validation block:
```ts
// REMOVE THIS:
if (!packageUrl) {
  return NextResponse.json(
    { error: "Package URL is required" },
    { status: 400 }
  );
}
```

## Acceptance Criteria
1. Form can be submitted without Package URL
2. API accepts listings without Package URL (stores as null/empty)
3. All existing tests pass
4. No TypeScript/build errors
