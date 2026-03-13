# Skills Directory

This directory contains reusable skills and scripts for maintaining code quality in the Next.js Boilerplate project.

## Available Skills

### 1. Code Review (`code-review.md`)

**Purpose:** Reviews the codebase against AGENTS.md guidelines and produces a detailed report.

**Status:** Documentation (Future OpenCode skill integration)

**Features:**

- Checks naming conventions (kebab-case)
- Verifies component structure (arrow functions, displayNames)
- Validates import ordering
- Ensures JSDoc documentation
- Checks React best practices
- Validates semantic HTML usage
- Runs ESLint checks

**See:** `code-review.md` for detailed implementation guide

---

### 2. Review Code Script (`review-code.sh`)

**Purpose:** Executable bash script for immediate code review

**Status:** ✅ Ready to use

**Usage:**

```bash
# Run from project root
bash .skills/review-code.sh

# Or make it executable and run directly
chmod +x .skills/review-code.sh
./.skills/review-code.sh
```

**What it checks:**

1. ✓ File naming conventions (kebab-case)
2. ✓ Component displayName presence
3. ✓ JSDoc documentation
4. ✓ Function style (arrow functions vs function declarations)
5. ✓ React best practices (array keys)
6. ✓ ESLint compliance

**Output:**

- Console summary with color-coded results
- Detailed markdown report: `code-review-report.md`

**Example Output:**

```
================================================
  Code Review Against AGENTS.md Guidelines
================================================

📁 Scanning source files...
   Found 15 files to review

🔍 Checking naming conventions...
   ✓ All files use kebab-case

🔍 Checking component displayNames...
   ✓ All components have displayName

🔍 Checking JSDoc documentation...
   ✓ All components have JSDoc comments

================================================
                   SUMMARY
================================================

Total Files:  15
Errors:       0
Warnings:     0

✅ All checks passed! Code is compliant with AGENTS.md
```

---

## Quick Start

### Run Code Review Now

```bash
cd /path/to/nextjs-boilerplate
bash .skills/review-code.sh
```

### View Report

```bash
cat code-review-report.md
```

---

## Adding New Skills

To add a new skill:

1. Create a new `.md` file describing the skill
2. (Optional) Create an executable script if applicable
3. Update this README with the new skill
4. Follow the template structure from `code-review.md`

### Skill Template Structure

```markdown
# Skill Name

## Description

Brief description of what the skill does

## Usage

How to invoke the skill

## Implementation

Technical details and code examples

## Output Format

What the skill produces

## Example

Real-world example
```

---

## GitHub Actions Integration ⭐ NEW

The code review script is now integrated with GitHub Actions!

### Automatic Reviews

Every push and pull request automatically runs the code review script.

**Workflow file:** `.github/workflows/code-review.yml`

**Features:**

- ✅ Runs on every PR and push to main
- 💬 Comments on PRs with results
- 📎 Uploads report as artifact
- ❌ Blocks merge if errors found (configurable)
- ⚠️ Allows warnings (non-blocking)

### Manual Trigger

You can also run the review manually:

1. Go to **Actions** tab in GitHub
2. Select **Code Review** workflow
3. Click **Run workflow**
4. View results and download report

### Pull Request Comments

The workflow automatically comments on PRs:

```markdown
## ✅ Code Review Results

**Status:** All checks passed!

📄 Full Report (click to expand)
```

### Setting as Required Check

To require code review before merging:

1. **Settings** → **Branches** → **Branch protection rules**
2. Add rule for `main` branch
3. Enable **Require status checks to pass**
4. Select **Review code against AGENTS.md**

See [.github/workflows/README.md](../.github/workflows/README.md) for full documentation.

---

## Integration with OpenCode

Once OpenCode supports custom skills, these can be invoked directly:

```bash
# Future usage
/code-review
/code-review --fix
/code-review --scope=src/components
```

Until then, use the provided bash scripts.

---

## Maintenance

### When to Update Skills

Update skills when:

- AGENTS.md guidelines change
- New code patterns emerge
- ESLint rules are modified
- Project structure changes

### Keeping Skills in Sync

1. Review AGENTS.md regularly
2. Update skill checks accordingly
3. Test with `review-code.sh`
4. Update documentation

---

## Files in This Directory

- **README.md** (this file) - Overview and usage instructions
- **code-review.md** - Detailed code review skill specification
- **review-code.sh** - Executable bash script for code review

---

## Contributing

When adding new checks:

1. Follow the existing pattern in `review-code.sh`
2. Update both the script and `code-review.md`
3. Test thoroughly
4. Document in this README

---

## Troubleshooting

### Script Not Executing

```bash
chmod +x .skills/review-code.sh
```

### Command Not Found

Make sure you're in the project root:

```bash
cd /path/to/nextjs-boilerplate
bash .skills/review-code.sh
```

### False Positives

Some checks may have edge cases. Review the generated report and update the script if needed.

---

## Links

- [AGENTS.md](../AGENTS.md) - Project coding guidelines
- [ESLint Config](../eslint.config.mjs) - Linting rules
- [TypeScript Config](../tsconfig.json) - TypeScript settings

---

Last Updated: 2026-02-04
