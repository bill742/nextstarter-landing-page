# Code Review Skill

## Skill Name

`code-review`

## Description

Reviews the codebase against AGENTS.md guidelines and produces a detailed report of recommendations based on any found errors or issues.

## Usage

```
/code-review [--fix] [--scope=<path>]
```

### Options

- `--fix`: Automatically fix issues where possible
- `--scope=<path>`: Limit review to specific path (default: entire codebase)

## Review Checklist

This skill performs the following checks against AGENTS.md guidelines:

### 1. Naming Conventions

- ✓ Files and folders use `kebab-case`
- ✓ React component names use PascalCase
- ✓ Component exports are default exports at bottom of file
- ✓ Display names are set: `ComponentName.displayName = "ComponentName"`

### 2. Component Structure

- ✓ Server components by default (no `"use client"` unless needed)
- ✓ `"use client"` only for: hooks, event handlers, browser APIs, client libraries
- ✓ Arrow functions used (`prefer-arrow-callback`)
- ✓ Components follow template structure

### 3. Import Ordering

- ✓ Side-effect imports first (`import './styles.css'`)
- ✓ External packages second (`import React from 'react'`)
- ✓ Internal absolute imports third
- ✓ Relative imports fourth
- ✓ Proper spacing between import groups

### 4. TypeScript

- ✓ `import type` used for type-only imports
- ✓ Strict mode enabled and followed
- ✓ Path alias `@/*` used for imports
- ✓ Template literals used over string concatenation

### 5. JSDoc Documentation

- ✓ All functions and components have JSDoc comments except:
  - Very simple utility functions
  - Components in `src/components/ui/`
- ✓ Include description, parameter types, return types

### 6. Styling & Accessibility

- ✓ Semantic HTML tags (`<main>`, `<header>`, `<footer>`, etc.)
- ✓ Interactive elements have accessible labels
- ✓ ARIA attributes used appropriately
- ✓ Dark mode support (all components)

### 7. React Best Practices

- ✓ No array index as key in `.map()`
- ✓ Unique keys for list items
- ✓ Proper event handler naming

### 8. ESLint Rules

- ✓ No console warnings (except intentional)
- ✓ No unused variables (or prefixed with `_`)
- ✓ Object keys sorted alphabetically

### 9. Metadata & SEO

- ✓ Page components export `metadata` object
- ✓ Includes title, description, Open Graph, Twitter cards
- ✓ Canonical URLs set
- ✓ Template for page titles

### 10. File Structure

- ✓ Follows documented structure in AGENTS.md
- ✓ UI components in `src/components/ui/`
- ✓ Page sections in `src/components/sections/`

## Implementation

### Step 1: Scan All Source Files

```typescript
// Scan for all .ts, .tsx files in src/
const sourceFiles = glob("src/**/*.{ts,tsx}", {
  ignore: ["src/components/ui/**"],
});
```

### Step 2: Run Checks Per Category

#### Naming Convention Check

```typescript
function checkNamingConventions(filePath: string): Issue[] {
  const issues: Issue[] = [];
  const fileName = path.basename(filePath, path.extname(filePath));

  // Check file naming
  if (!/^[a-z][a-z0-9-]*$/.test(fileName)) {
    issues.push({
      type: "naming",
      severity: "error",
      file: filePath,
      message: `File name should use kebab-case: ${fileName}`,
      line: 0,
    });
  }

  return issues;
}
```

#### Component Structure Check

```typescript
function checkComponentStructure(content: string, filePath: string): Issue[] {
  const issues: Issue[] = [];

  // Check for function declarations (should be arrow functions)
  const funcDeclarationRegex = /export\s+default\s+function\s+\w+/g;
  if (funcDeclarationRegex.test(content)) {
    issues.push({
      type: "component-structure",
      severity: "warning",
      file: filePath,
      message: "Should use arrow function instead of function declaration",
      recommendation: "Convert to: const ComponentName = () => { ... }",
    });
  }

  // Check for displayName
  const hasDisplayName = /\.displayName\s*=\s*["'`]\w+["'`]/.test(content);
  const hasComponent = /const\s+\w+\s*=\s*\(/.test(content);

  if (hasComponent && !hasDisplayName) {
    issues.push({
      type: "component-structure",
      severity: "error",
      file: filePath,
      message: "Component missing displayName",
      recommendation: 'Add: ComponentName.displayName = "ComponentName";',
    });
  }

  return issues;
}
```

#### Import Ordering Check

```typescript
function checkImportOrdering(content: string, filePath: string): Issue[] {
  const issues: Issue[] = [];
  const lines = content.split("\n");

  let currentGroup = 0;
  const importGroups = {
    sideEffect: 0, // import './file'
    external: 1, // import from 'package'
    internal: 2, // import from '@/*'
    relative: 3, // import from './' or '../'
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line.startsWith("import ")) continue;

    let group: number;
    if (/^import\s+["']/.test(line)) {
      group = importGroups.sideEffect;
    } else if (line.includes("@/")) {
      group = importGroups.internal;
    } else if (line.includes("./") || line.includes("../")) {
      group = importGroups.relative;
    } else {
      group = importGroups.external;
    }

    if (group < currentGroup) {
      issues.push({
        type: "import-ordering",
        severity: "warning",
        file: filePath,
        line: i + 1,
        message: "Imports not in correct order",
        recommendation: "Run: npx eslint --fix",
      });
      break;
    }

    currentGroup = group;
  }

  return issues;
}
```

#### JSDoc Check

```typescript
function checkJSDoc(content: string, filePath: string): Issue[] {
  const issues: Issue[] = [];

  // Skip UI components
  if (filePath.includes("src/components/ui/")) {
    return issues;
  }

  // Find component declarations
  const componentRegex =
    /^(?:export\s+)?(?:default\s+)?(?:const|function)\s+(\w+)\s*=/gm;
  let match;

  while ((match = componentRegex.exec(content)) !== null) {
    const componentName = match[1];
    const startPos = match.index;

    // Look for JSDoc comment before component
    const beforeComponent = content.substring(
      Math.max(0, startPos - 200),
      startPos
    );
    const hasJSDoc = /\/\*\*[\s\S]*?\*\/\s*$/.test(beforeComponent);

    if (!hasJSDoc) {
      issues.push({
        type: "documentation",
        severity: "error",
        file: filePath,
        message: `Component ${componentName} missing JSDoc comment`,
        recommendation: "Add JSDoc comment with description and @returns",
      });
    }
  }

  return issues;
}
```

#### React Best Practices Check

```typescript
function checkReactBestPractices(content: string, filePath: string): Issue[] {
  const issues: Issue[] = [];

  // Check for array index as key
  const indexKeyRegex =
    /\.map\s*\(\s*\([^,)]+,\s*(\w+)\s*\)\s*=>[^]*?key\s*=\s*\{\s*\1\s*\}/g;
  let match;

  while ((match = indexKeyRegex.exec(content)) !== null) {
    issues.push({
      type: "react-best-practices",
      severity: "error",
      file: filePath,
      message: "Using array index as key in map()",
      recommendation: "Use a unique identifier from the data instead",
    });
  }

  return issues;
}
```

#### Semantic HTML Check

```typescript
function checkSemanticHTML(content: string, filePath: string): Issue[] {
  const issues: Issue[] = [];

  // Check for <div> used where semantic tags would be better
  const patterns = [
    { regex: /<div[^>]*className="[^"]*header/i, tag: "<header>" },
    { regex: /<div[^>]*className="[^"]*footer/i, tag: "<footer>" },
    { regex: /<div[^>]*className="[^"]*nav/i, tag: "<nav>" },
    { regex: /<div[^>]*className="[^"]*main/i, tag: "<main>" },
  ];

  patterns.forEach((pattern) => {
    if (pattern.regex.test(content)) {
      issues.push({
        type: "semantic-html",
        severity: "warning",
        file: filePath,
        message: `Consider using semantic ${pattern.tag} instead of <div>`,
        recommendation: `Replace with ${pattern.tag} tag`,
      });
    }
  });

  return issues;
}
```

### Step 3: Run ESLint

```bash
npm run lint 2>&1
```

### Step 4: Generate Report

```typescript
interface Issue {
  type: string;
  severity: "error" | "warning" | "info";
  file: string;
  line?: number;
  message: string;
  recommendation?: string;
}

function generateReport(issues: Issue[]): string {
  const grouped = groupBy(issues, "type");
  const bySeverity = {
    error: issues.filter((i) => i.severity === "error"),
    warning: issues.filter((i) => i.severity === "warning"),
    info: issues.filter((i) => i.severity === "info"),
  };

  return `
# Code Review Report

Generated: ${new Date().toISOString()}

## Summary

- Total Issues: ${issues.length}
- Errors: ${bySeverity.error.length} 🔴
- Warnings: ${bySeverity.warning.length} 🟡
- Info: ${bySeverity.info.length} 🔵

## Issues by Category

${Object.entries(grouped)
  .map(
    ([type, items]) => `
### ${formatCategoryName(type)}

${items
  .map(
    (issue) => `
- **${issue.severity.toUpperCase()}** \`${issue.file}${issue.line ? ":" + issue.line : ""}\`
  - ${issue.message}
  ${issue.recommendation ? `- **Fix:** ${issue.recommendation}` : ""}
`
  )
  .join("")}
`
  )
  .join("\n")}

## Recommendations

${generateRecommendations(issues)}

## Next Steps

1. Fix all ERROR level issues first
2. Address WARNING level issues
3. Run \`npm run lint\` to verify
4. Consider INFO suggestions for improvements
`;
}
```

## Output Format

The skill produces a markdown report with:

1. **Summary Statistics**
   - Total issues found
   - Breakdown by severity (error/warning/info)

2. **Issues by Category**
   - Naming conventions
   - Component structure
   - Import ordering
   - TypeScript usage
   - Documentation
   - React best practices
   - Semantic HTML
   - Accessibility

3. **Detailed Issue List**
   - File path and line number
   - Issue description
   - Specific recommendation

4. **Priority Actions**
   - Ordered list of fixes by importance

## Example Output

```markdown
# Code Review Report

## Summary

- Total Issues: 5
- Errors: 2 🔴
- Warnings: 3 🟡

## Issues by Category

### Component Structure

- **ERROR** `src/components/example.tsx:15`
  - Component missing displayName
  - **Fix:** Add: Example.displayName = "Example";

### React Best Practices

- **ERROR** `src/app/page.tsx:42`
  - Using array index as key in map()
  - **Fix:** Use a unique identifier from the data instead

### Import Ordering

- **WARNING** `src/components/header.tsx:1`
  - Imports not in correct order
  - **Fix:** Run: npx eslint --fix

## Priority Actions

1. Add displayName to Example component (src/components/example.tsx:15)
2. Fix array key usage (src/app/page.tsx:42)
3. Run ESLint auto-fix for import ordering
```

## Integration

Once OpenCode supports custom skills, this can be invoked as:

```bash
# Review entire codebase
/code-review

# Review specific directory
/code-review --scope=src/components

# Review and auto-fix
/code-review --fix
```

## Notes

- This skill automatically excludes `src/components/ui/` from JSDoc checks
- Runs ESLint as part of the review process
- Can be extended with additional checks as needed
- Report can be saved to file or displayed in CLI
