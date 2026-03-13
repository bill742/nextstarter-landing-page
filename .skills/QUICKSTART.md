# Code Review Skill - Quick Start Guide

## 🚀 Run Code Review

```bash
bash .skills/review-code.sh
```

That's it! The script will:

- ✓ Scan all TypeScript files in `src/`
- ✓ Check against AGENTS.md guidelines
- ✓ Generate a detailed report
- ✓ Show results in your terminal

---

## 📊 What Gets Checked

| Category          | Check                | Severity |
| ----------------- | -------------------- | -------- |
| **Naming**        | Files use kebab-case | Warning  |
| **Components**    | Has displayName      | Error    |
| **Components**    | Uses arrow functions | Warning  |
| **Documentation** | Has JSDoc comments   | Error    |
| **React**         | No index as key      | Error    |
| **Code Quality**  | ESLint passes        | Warning  |

---

## 📄 Reading the Report

After running the script, you'll get:

### 1. Console Output

Color-coded summary showing:

- 🔵 Total files reviewed
- 🔴 Number of errors
- 🟡 Number of warnings

### 2. Detailed Report

Full markdown report saved to: `code-review-report.md`

```bash
# View the report
cat code-review-report.md

# Or open in your editor
code code-review-report.md
```

---

## 🎯 Understanding Results

### ✅ All Clear

```
Total Files:  15
Errors:       0
Warnings:     0

✅ All checks passed! Code is compliant with AGENTS.md
```

Your code follows all guidelines!

### ⚠️ Issues Found

```
Total Files:  15
Errors:       2
Warnings:     3

⚠️  Issues found. Please review:
   📄 Full report: code-review-report.md
```

Check the report for details and recommendations.

---

## 🔧 Common Issues & Fixes

### Missing displayName

**Error:** Component missing displayName

**Fix:**

```typescript
const MyComponent = () => { ... };

MyComponent.displayName = "MyComponent";  // Add this

export default MyComponent;
```

### Missing JSDoc

**Error:** Missing JSDoc comments

**Fix:**

```typescript
/**
 * Description of what this component does
 * @returns What the component renders
 */
const MyComponent = () => { ... };
```

### Array Index as Key

**Error:** Using array index as key

**Fix:**

```typescript
// ❌ Bad
{items.map((item, index) => (
  <div key={index}>{item}</div>
))}

// ✅ Good
{items.map((item) => (
  <div key={item.id}>{item}</div>
))}
```

### Function Declaration

**Warning:** Should use arrow function

**Fix:**

```typescript
// ❌ Avoid
export default function MyComponent() { ... }

// ✅ Prefer
const MyComponent = () => { ... };
export default MyComponent;
```

---

## 📋 Workflow

### Before Committing

```bash
# 1. Run review
bash .skills/review-code.sh

# 2. Fix any errors
# (edit files as needed)

# 3. Run again to verify
bash .skills/review-code.sh

# 4. Commit when clean
git add .
git commit -m "Your message"
```

### During Development

```bash
# Quick check anytime
bash .skills/review-code.sh
```

### In CI/CD (Future)

```bash
# Add to GitHub Actions
- name: Code Review
  run: bash .skills/review-code.sh
```

---

## 🎨 Customizing Checks

To modify what gets checked, edit `.skills/review-code.sh`

Example: Add new check

```bash
# Add after existing checks
echo "🔍 Checking your custom rule..."
for file in $FILES; do
  # Your check logic here
done
```

---

## 💡 Tips

1. **Run Often** - Catch issues early
2. **Fix Errors First** - Warnings can wait
3. **Read the Report** - Detailed recommendations included
4. **Keep It Green** - Aim for 0 errors, 0 warnings

---

## 🆘 Troubleshooting

### "Permission denied"

```bash
chmod +x .skills/review-code.sh
```

### "Command not found"

Make sure you're in the project root:

```bash
cd /path/to/nextjs-boilerplate
bash .skills/review-code.sh
```

### Script hangs

Increase timeout or check for infinite loops in your code

---

## 📚 More Information

- Full documentation: `.skills/code-review.md`
- Project guidelines: `AGENTS.md`
- Skills overview: `.skills/README.md`

---

## ⚡ One-Liner

Just remember this:

```bash
bash .skills/review-code.sh
```

Everything else is automatic! 🎉
