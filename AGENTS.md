# Agent Instructions for Next.js Boilerplate

This document provides guidelines for AI coding agents working in this Next.js boilerplate repository.

## Project Overview

- **Framework**: Next.js 16.0.3 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN/UI with Radix UI primitives
- **Themes**: next-themes with light/dark mode support
- **Icons**: Lucide React and React Icons
- **Testing**: Playwright (mentioned but not currently configured)
- **Node Version**: See `.node-version` file

---

## Build, Lint, and Test Commands

### Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code with Prettier (manual)
npx prettier --write .
```

### Testing

Currently, no test runner is configured in package.json. Playwright is mentioned in documentation but not set up. When adding tests:

- Use Playwright for end-to-end tests
- Test configuration should be added to support running individual tests

---

## File and Folder Structure

```
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── layout.tsx    # Root layout with metadata
│   │   ├── page.tsx      # Home page
│   │   ├── robots.ts     # Robots.txt configuration
│   │   └── sitemap.ts    # Sitemap configuration
│   └── components/
│       ├── ui/           # Reusable UI components (ShadCN/UI)
│       └── sections/     # Page-specific sections
├── public/               # Static assets
├── .github/              # GitHub configuration
└── [config files]        # Root-level configuration
```

### Naming Conventions

- **Files and folders**: Use `kebab-case`
- **React components**: PascalCase for component names
- **Component exports**: Default exports at bottom of file
- **Display names**: Set `ComponentName.displayName = "ComponentName"` for debugging

---

## Code Style Guidelines

### TypeScript

- **Strict mode**: Enabled in tsconfig.json
- **Target**: ES2017
- **Module resolution**: bundler
- **Path alias**: `@/*` maps to `./src/*`
- **Type imports**: Use `import type` for type-only imports
- **Function style**: Prefer arrow functions (`prefer-arrow-callback`)
- **String concatenation**: Use template literals (`prefer-template`)

### Import Ordering

Imports are automatically sorted by `simple-import-sort` plugin in this order:

1. Side-effect imports (`import './styles.css'`)
2. Node built-ins and external packages (`import React from 'react'`)
3. Internal absolute imports
4. Relative imports (`./component`, `../utils`)
5. Imports from `src/` directory

Example:

```typescript
import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import * as React from "react";

import Footer from "@/components/footer";
import Header from "@/components/header";
```

### Formatting

**Prettier Configuration**:

- Trailing commas: ES5 style
- Plugin: `prettier-plugin-tailwindcss` for class sorting
- Line length and other defaults follow Prettier standards

**ESLint Rules**:

- `no-console`: warn (use sparingly)
- `no-unused-vars`: warn (prefix with `_` for intentional unused vars)
- `sort-keys-fix`: Object keys sorted alphabetically (case-sensitive)
- Ignores: `src/components/ui` (ShadCN components)

### Component Structure

**Server Components (Default)**:

- Default to server components
- No `"use client"` directive needed
- Can use async/await for data fetching

**Client Components**:

- Add `"use client"` directive only when needed:
  - Interactive event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser-only APIs
  - Third-party libraries requiring client-side

**Component Organization**:

- **Separation of Concerns**: Extract features into separate components for better maintainability
- **Component Directories**: For complex components with sub-components, create a directory:
  ```
  components/
    header/
      index.tsx        # Main component
      navigation.tsx   # Sub-component
      logo.tsx         # Sub-component (optional)
  ```
- **Co-location**: Keep related components together in the same directory
- **Shared Logic**: Extract reusable logic, data, and constants into separate files:
  - Export arrays/objects of configuration data
  - Share types between related components
  - Keep index.tsx as the main export

**Example Structure**:

```typescript
// header/navigation.tsx
export const navigationItems = [
  { id: 1, label: "Features", href: "#features" },
  { id: 2, label: "Pricing", href: "#pricing" },
];

const Navigation = () => { /* ... */ };
export default Navigation;

// header/index.tsx
import Navigation from "./navigation";

const Header = () => {
  return (
    <header>
      <Navigation />
    </header>
  );
};
export default Header;
```

**Component Template**:

```typescript
import type { ComponentProps } from "react";

/**
 * Brief description of component purpose
 * @param prop1 - Description of prop1
 * @param prop2 - Description of prop2
 * @returns Description of what component renders
 */
const MyComponent = ({ prop1, prop2 }: ComponentProps) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};

MyComponent.displayName = "MyComponent";

export default MyComponent;
```

### Documentation

- **JSDoc comments**: Required for all functions and components except:
  - Very simple utility functions
  - Components in `src/components/ui/` (ShadCN components)
- **Include**: Description, parameter types, return types
- **Keep code readable**: Well-documented for maintainability

---

## Styling and Responsiveness

### Tailwind CSS

- **Approach**: Utility-first classes
- **Responsive design**: Mobile-first using Tailwind breakpoints (sm, md, lg, xl)
- **Dark mode**: Use `.dark` class for dark mode styles
- **Class sorting**: Automatically sorted by Prettier plugin
- **Semantic HTML**: Prefer semantic elements over generic `<div>` tags

### Accessibility

- Use semantic HTML and correct roles; prefer native elements (`button`, `a`, `input`) over clickable `div`s
- Provide an accessible name for every interactive control via text, `<label htmlFor>`, `aria-label`, or `aria-labelledby` (icons-only controls must have `aria-label`)
- SVGs and icons: decorative icons must be `aria-hidden="true"` and `focusable="false"`; meaningful icons require `role="img"` with `aria-label` or a `<title>` element
- Keyboard: all UI must be operable with keyboard (Tab, Shift+Tab, Enter/Space); manage focus on open/close of dialogs, trap focus in modals, support `Escape` to dismiss
- State: use `aria-expanded`, `aria-controls`, `aria-pressed`, `aria-selected`, and `aria-live` where appropriate; connect labels with controls via `id`/`aria-*`
- Focus: maintain logical tab order, ensure visible focus outlines, and move focus to the first meaningful element after route changes
- Images/media: provide descriptive `alt` text; avoid relying on color alone; ensure captions/transcripts for media when applicable
- Color/contrast: meet WCAG 2.1 AA contrast; verify both light and dark themes
- Landmarks: use `<header>`, `<nav>`, `<main id="main">`, `<footer>`; include a "Skip to content" link and set `aria-current="page"` on the active nav item
- Testing: use screen readers (VoiceOver/NVDA) and automated checks; include `eslint-plugin-jsx-a11y` and verify with Playwright interactions (focus order, keyboard support)

```tsx
// Icon-only button (Lucide React) — accessible name via aria-label; icon hidden from AT
import { Search } from "lucide-react";

export const IconButton = () => (
  <button
    type="button"
    aria-label="Search"
    className="inline-flex items-center justify-center"
  >
    <Search aria-hidden="true" focusable="false" />
  </button>
);
```

```tsx
// Meaningful SVG — labeled via title/aria-labelledby
export const BrandMark = () => (
  <svg
    role="img"
    aria-labelledby="logo-title"
    viewBox="0 0 24 24"
    width={24}
    height={24}
  >
    <title id="logo-title">NextStarter logo</title>
    <path d="M3 3h18v18H3z" />
  </svg>
);
```

```tsx
// Disclosure pattern — state exposed with aria-expanded/aria-controls
export const Filters = ({ open }: { open: boolean }) => (
  <div>
    <button
      aria-expanded={open}
      aria-controls="filters-panel"
      className="font-medium"
    >
      Filters
    </button>
    <div id="filters-panel" hidden={!open}>
      {/* filter content */}
    </div>
  </div>
);
```

```tsx
// Skip link — improves keyboard navigation
export const SkipLink = () => (
  <a href="#main" className="sr-only focus:not-sr-only">
    Skip to content
  </a>
);
```

### Theme Support

- All components must support both light and dark modes
- Use Tailwind dark mode utilities: `dark:bg-gray-800`
- Theme provider configured in root layout
- Default theme: system preference

---

## Data Fetching

- Use `fetch` inside server components for API calls
- Static content can be hardcoded or imported from JSON/MDX
- Prefer `async/await` syntax
- Leverage Next.js caching and revalidation strategies

---

## Metadata and SEO

- Export `metadata` object from page components
- Include: title, description, Open Graph tags, Twitter cards
- Set canonical URLs using `alternates.canonical`
- Use template for page titles: `%s | NextStarter`
- Metadata base URL: `process.env.NEXT_PUBLIC_SITE_URL`

---

## Environment Variables

- Create `.env` file from `.env.example`
- Required variables:
  - `NEXT_PUBLIC_SITE_URL`: Full site URL
  - `NEXT_PUBLIC_SITE_NAME`: Site name
- Use `NEXT_PUBLIC_` prefix for client-side accessible variables

---

## Error Handling

- Implement error boundaries for client components
- Use Next.js error.tsx files for error UI
- Custom 404 page: `src/app/not-found.tsx`
- Log errors appropriately (avoid console.log in production)

---

## Performance Optimization

- Optimize images using `next/image`
- Use dynamic imports for code splitting when appropriate
- Leverage server components by default
- Minimize client-side JavaScript bundle size

---

## Git Workflow and Changelog

- Maintain detailed changelog in `CHANGELOG.md`
- Follow semantic versioning for releases
- Document: Added, Changed, Fixed, Removed features in each version
- Write clear, descriptive commit messages

---

## Additional Notes

- VS Code settings and recommended extensions are configured
- Robots.txt and sitemap.xml configured via TypeScript files
- Animations should use Framer Motion (when implemented)
- Keep performance, SEO, and accessibility in mind for every component
