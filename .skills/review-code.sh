#!/bin/bash

# Code Review Script for NextStarter
# Reviews codebase against AGENTS.md guidelines

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
REPORT_FILE="$PROJECT_ROOT/code-review-report.md"

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "================================================"
echo "  Code Review Against AGENTS.md Guidelines"
echo "================================================"
echo ""

# Initialize counters
ERRORS=0
WARNINGS=0
TOTAL_FILES=0

# Initialize arrays to store issue details
NAMING_FILES=()
DISPLAYNAME_FILES=()
JSDOC_FILES=()
FUNCTION_FILES=()
KEY_FILES=()

# Start report
cat > "$REPORT_FILE" << EOF
# Code Review Report

Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")

## Summary

EOF

echo "📁 Scanning source files..."

# Find all TypeScript files (excluding ui components and node_modules)
FILES=$(find "$PROJECT_ROOT/src" -name "*.ts" -o -name "*.tsx" | grep -v "src/components/ui" | grep -v "node_modules")
TOTAL_FILES=$(echo "$FILES" | wc -l | tr -d ' ')

echo "   Found $TOTAL_FILES files to review"
echo ""

# Check 1: Naming Conventions
echo "🔍 Checking naming conventions..."
NAMING_ISSUES=0
for file in $FILES; do
  basename=$(basename "$file" | sed 's/\.[^.]*$//')
  if ! echo "$basename" | grep -qE '^[a-z][a-z0-9-]*$'; then
    echo -e "${YELLOW}WARNING${NC}: $file - File should use kebab-case"
    WARNINGS=$((WARNINGS + 1))
    NAMING_ISSUES=$((NAMING_ISSUES + 1))
    NAMING_FILES+=("$file")
  fi
done
if [ $NAMING_ISSUES -eq 0 ]; then
  echo -e "   ${GREEN}✓${NC} All files use kebab-case"
fi
echo ""

# Check 2: Component displayName
echo "🔍 Checking component displayNames..."
DISPLAYNAME_ISSUES=0
for file in $FILES; do
  if echo "$file" | grep -q "\.tsx$"; then
    if grep -q "const.*=.*() =>" "$file" || grep -q "export default function" "$file"; then
      if ! grep -q "\.displayName.*=.*" "$file"; then
        echo -e "${RED}ERROR${NC}: $file - Component missing displayName"
        ERRORS=$((ERRORS + 1))
        DISPLAYNAME_ISSUES=$((DISPLAYNAME_ISSUES + 1))
        DISPLAYNAME_FILES+=("$file")
      fi
    fi
  fi
done
if [ $DISPLAYNAME_ISSUES -eq 0 ]; then
  echo -e "   ${GREEN}✓${NC} All components have displayName"
fi
echo ""

# Check 3: JSDoc comments
echo "🔍 Checking JSDoc documentation..."
JSDOC_ISSUES=0
for file in $FILES; do
  if echo "$file" | grep -q "\.tsx$"; then
    # Count component declarations (handle multiple matches properly)
    COMPONENTS=$(grep "^const.*=.*() =>" "$file" 2>/dev/null | wc -l | tr -d ' ')
    # Count JSDoc comments
    JSDOCS=$(grep "/\*\*" "$file" 2>/dev/null | wc -l | tr -d ' ')
    
    # Only check if there are components in the file
    if [ "$COMPONENTS" -gt 0 ] && [ "$COMPONENTS" -gt "$JSDOCS" ]; then
      echo -e "${RED}ERROR${NC}: $file - Missing JSDoc comments"
      ERRORS=$((ERRORS + 1))
      JSDOC_ISSUES=$((JSDOC_ISSUES + 1))
      JSDOC_FILES+=("$file")
    fi
  fi
done
if [ $JSDOC_ISSUES -eq 0 ]; then
  echo -e "   ${GREEN}✓${NC} All components have JSDoc comments"
fi
echo ""

# Check 4: Function declarations (should be arrow functions)
echo "🔍 Checking function style..."
FUNCTION_ISSUES=0
for file in $FILES; do
  if grep -q "export default function" "$file"; then
    echo -e "${YELLOW}WARNING${NC}: $file - Should use arrow function instead of function declaration"
    WARNINGS=$((WARNINGS + 1))
    FUNCTION_ISSUES=$((FUNCTION_ISSUES + 1))
    FUNCTION_FILES+=("$file")
  fi
done
if [ $FUNCTION_ISSUES -eq 0 ]; then
  echo -e "   ${GREEN}✓${NC} All components use arrow functions"
fi
echo ""

# Check 5: Array index as key
echo "🔍 Checking React best practices..."
KEY_ISSUES=0
for file in $FILES; do
  if grep -E "\.map.*\(.*,\s*\w+\s*\).*key=\{.*\}" "$file" > /dev/null; then
    if grep -E "\.map.*\([^,]+,\s*(\w+)\s*\).*key=\{\s*\1\s*\}" "$file" > /dev/null; then
      echo -e "${RED}ERROR${NC}: $file - Using array index as key"
      ERRORS=$((ERRORS + 1))
      KEY_ISSUES=$((KEY_ISSUES + 1))
      KEY_FILES+=("$file")
    fi
  fi
done
if [ $KEY_ISSUES -eq 0 ]; then
  echo -e "   ${GREEN}✓${NC} No array index used as key"
fi
echo ""

# Check 6: Run ESLint
echo "🔍 Running ESLint..."
cd "$PROJECT_ROOT"
ESLINT_OUTPUT=$(npm run lint 2>&1 || true)
ESLINT_EXIT_CODE=$?

# ESLint returns 0 when no issues, non-zero when issues found
# Empty output (besides npm run message) means no issues
if [ $ESLINT_EXIT_CODE -eq 0 ] && ! echo "$ESLINT_OUTPUT" | grep -qE "error|warning.*problems"; then
  echo -e "   ${GREEN}✓${NC} ESLint passed with no errors"
else
  echo -e "${YELLOW}WARNING${NC}: ESLint found issues"
  echo "$ESLINT_OUTPUT" | grep -A 10 "warning\|error" || true
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# Generate final report
cat >> "$REPORT_FILE" << EOF
- **Total Files Reviewed:** $TOTAL_FILES
- **Errors:** $ERRORS 🔴
- **Warnings:** $WARNINGS 🟡

---

## Issues Found

### Naming Conventions
$([ $NAMING_ISSUES -eq 0 ] && echo "✅ All files use kebab-case" || echo "⚠️ $NAMING_ISSUES file(s) not using kebab-case")

### Component Structure
$([ $DISPLAYNAME_ISSUES -eq 0 ] && echo "✅ All components have displayName" || echo "❌ $DISPLAYNAME_ISSUES component(s) missing displayName")
$([ $FUNCTION_ISSUES -eq 0 ] && echo "✅ All components use arrow functions" || echo "⚠️ $FUNCTION_ISSUES component(s) using function declarations")

### Documentation
$([ $JSDOC_ISSUES -eq 0 ] && echo "✅ All components have JSDoc comments" || echo "❌ $JSDOC_ISSUES component(s) missing JSDoc")

### React Best Practices
$([ $KEY_ISSUES -eq 0 ] && echo "✅ No array index used as key" || echo "❌ $KEY_ISSUES instance(s) of array index as key")

### ESLint
\`\`\`
$ESLINT_OUTPUT
\`\`\`

---

## Recommendations

EOF

# Add recommendations based on issues found
if [ $ERRORS -gt 0 ]; then
  cat >> "$REPORT_FILE" << EOF
### Critical Issues (Must Fix)

EOF
  if [ $DISPLAYNAME_ISSUES -gt 0 ]; then
    echo "#### Missing displayName" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Issue:** Components missing displayName property - Required for debugging" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Files affected:**" >> "$REPORT_FILE"
    for f in "${DISPLAYNAME_FILES[@]}"; do
      relative_path="${f#$PROJECT_ROOT/}"
      echo "- \`$relative_path\`" >> "$REPORT_FILE"
    done
    echo "" >> "$REPORT_FILE"
  fi
  if [ $JSDOC_ISSUES -gt 0 ]; then
    echo "#### Missing JSDoc Comments" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Issue:** Components missing JSDoc comments - Required per AGENTS.md guidelines" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Files affected:**" >> "$REPORT_FILE"
    for f in "${JSDOC_FILES[@]}"; do
      relative_path="${f#$PROJECT_ROOT/}"
      echo "- \`$relative_path\`" >> "$REPORT_FILE"
    done
    echo "" >> "$REPORT_FILE"
  fi
  if [ $KEY_ISSUES -gt 0 ]; then
    echo "#### Array Index as Key" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Issue:** Using array index as key in map() - Use unique identifiers instead" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Files affected:**" >> "$REPORT_FILE"
    for f in "${KEY_FILES[@]}"; do
      relative_path="${f#$PROJECT_ROOT/}"
      echo "- \`$relative_path\`" >> "$REPORT_FILE"
    done
    echo "" >> "$REPORT_FILE"
  fi
fi

if [ $WARNINGS -gt 0 ]; then
  cat >> "$REPORT_FILE" << EOF
### Warnings (Should Fix)

EOF
  if [ $NAMING_ISSUES -gt 0 ]; then
    echo "#### File Naming" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Issue:** Files not using kebab-case - Follow project conventions" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Files affected:**" >> "$REPORT_FILE"
    for f in "${NAMING_FILES[@]}"; do
      relative_path="${f#$PROJECT_ROOT/}"
      echo "- \`$relative_path\`" >> "$REPORT_FILE"
    done
    echo "" >> "$REPORT_FILE"
  fi
  if [ $FUNCTION_ISSUES -gt 0 ]; then
    echo "#### Function Declarations" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Issue:** Using function declarations instead of arrow functions - Prefer arrow functions per AGENTS.md" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "**Files affected:**" >> "$REPORT_FILE"
    for f in "${FUNCTION_FILES[@]}"; do
      relative_path="${f#$PROJECT_ROOT/}"
      echo "- \`$relative_path\`" >> "$REPORT_FILE"
    done
    echo "" >> "$REPORT_FILE"
  fi
fi

cat >> "$REPORT_FILE" << EOF

---

## Next Steps

1. Review all ERROR level issues and fix them
2. Address WARNING level issues for consistency
3. Run \`npm run lint\` to verify changes
4. Run this review script again to confirm all issues resolved

## Command to Re-run Review

\`\`\`bash
bash .skills/review-code.sh
\`\`\`

EOF

# Print summary
echo "================================================"
echo "                   SUMMARY"
echo "================================================"
echo ""
echo -e "Total Files:  ${BLUE}$TOTAL_FILES${NC}"
echo -e "Errors:       ${RED}$ERRORS${NC}"
echo -e "Warnings:     ${YELLOW}$WARNINGS${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed! Code is compliant with AGENTS.md${NC}"
  echo ""
else
  echo -e "${YELLOW}⚠️  Issues found. Please review:${NC}"
  echo ""
  echo "   📄 Full report: $REPORT_FILE"
  echo ""
fi

echo "================================================"
