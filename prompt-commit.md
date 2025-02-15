# Generic Git Commit & Publishing Workflow Instructions

## Overview
This document provides step-by-step instructions for creating a complete project with proper backdated git commits, GitHub repository setup, and npm publishing under the @sj-utils organization.

**Important**: Follow these steps in exact order to avoid any fixes or resets.

## Pre-Execution Information Collection

Ask these questions before starting:

### Project Details
1. **What is the project name?** → [PROJECT_NAME]
2. **What is the package name for npm?** → [PACKAGE_NAME] (default: same as project)
3. **What is the project description?** → [PROJECT_DESCRIPTION]
4. **What is the main feature/functionality?** → [MAIN_FEATURE]

### Git Commit Timeline
5. **What date should the first commit be?** → [START_DATE] (format: YYYY-MM-DD)
6. **What date should the last commit be?** → [END_DATE] (format: YYYY-MM-DD)
7. **How many commits per day?** → [COMMITS_PER_DAY] (recommended: 2-4)

### Defaults (rarely need to change)
- **GITHUB_USERNAME**: suhaibjanjua
- **GIT_EMAIL**: suhaib.janjua@gmail.com
- **GIT_NAME**: Suhaib Janjua

## Prerequisites
- Git installed and configured
- GitHub CLI (`gh`) installed and authenticated
- npm account with access to @sj-utils organization
- Node.js and npm installed

## Phase 1: Initial Setup (CRITICAL - Do This First)

### 1.1 Configure Git User (BEFORE any commits)
```bash
# Set git configuration FIRST - this prevents all author issues
git config --global user.email "[GIT_EMAIL]"
git config --global user.name "[GIT_NAME]"

# Verify it's set correctly
git config --get user.email
git config --get user.name
```

### 1.2 Create Project Structure
```bash
# Create and navigate to project directory
mkdir [PROJECT_NAME]
cd [PROJECT_NAME]

# Initialize git repository FIRST
git init

# Add GitHub remote
git remote add origin https://github.com/[GITHUB_USERNAME]/[PROJECT_NAME].git
```

### 1.3 Development Phase
Complete all development work:
- Create all source code files
- Set up TypeScript configuration  
- Configure build tools (Rollup, etc.)
- Write comprehensive tests
- Create documentation files
- Set up linting and formatting
- **DO NOT make any commits yet**

## Phase 2: Create Backdated Git History

### 2.1 Generate Random Times for Commits
Calculate commit times using these ranges:
- **Morning**: 08:00-11:59
- **Afternoon**: 12:00-17:59  
- **Evening**: 18:00-21:59

**Time Format**: `[DATE]T[HH:MM:SS]+00:00`

### 2.2 Create All Backdated Commits

Plan your commits across the date range with [COMMITS_PER_DAY] commits per day.

**Example commit sequence** (adapt to your project):

```bash
# Day 1 - Initial Setup
git add README.md package.json tsconfig.json
GIT_AUTHOR_DATE="[START_DATE]T09:23:15+00:00" GIT_COMMITTER_DATE="[START_DATE]T09:23:15+00:00" \
git commit -m "feat: initial project setup with TypeScript configuration"

git add src/index.ts src/types.ts
GIT_AUTHOR_DATE="[START_DATE]T14:47:32+00:00" GIT_COMMITTER_DATE="[START_DATE]T14:47:32+00:00" \
git commit -m "feat: implement core [MAIN_FEATURE] functionality"

git add src/
GIT_AUTHOR_DATE="[START_DATE]T17:12:08+00:00" GIT_COMMITTER_DATE="[START_DATE]T17:12:08+00:00" \
git commit -m "feat: add utility functions and factory methods"

# Continue pattern for remaining days...
# Day 2, Day 3, etc. until [END_DATE]
```

### 2.3 Commit Message Templates
Use appropriate messages based on commit content:
- `feat: initial project setup with [technology] configuration`
- `feat: implement core [MAIN_FEATURE] functionality`
- `feat: add [component/module] with [specific features]`
- `test: add comprehensive test suite with [X]+ test cases`
- `docs: add README, changelog and contributing guidelines`
- `ci: configure [build tool] with [output formats]`
- `feat: add TypeScript definitions and interfaces`
- `feat: finalize package configuration and build system`

## Phase 3: GitHub Repository & NPM Publishing

### 3.1 Create GitHub Repository
```bash
# Create repository on GitHub
gh repo create [PROJECT_NAME] --public --description "[PROJECT_DESCRIPTION]"

# Push all backdated commits
git push -u origin main
```

### 3.2 Configure Repository
```bash
# Set relevant topics (customize based on project)
gh repo edit --add-topic "typescript,utility,npm-package,javascript"

# Verify commits show correct dates on GitHub
```

### 3.3 Verify Package Configuration
Ensure `package.json` includes:
```json
{
  "name": "@sj-utils/[PACKAGE_NAME]",
  "version": "1.0.0", 
  "description": "[PROJECT_DESCRIPTION]",
  "main": "dist/index.js",
  "module": "dist/index.esm.js", 
  "types": "dist/index.d.ts",
  "publishConfig": { "access": "public" },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/[GITHUB_USERNAME]/[PROJECT_NAME].git"
  },
  "author": "[GIT_NAME] <[GIT_EMAIL]>",
  "license": "MIT"
}
```

### 3.4 Publish to NPM
```bash
# Verify npm login
npm whoami

# Run tests and build
npm test
npm run build

# Publish package
npm publish --access public

# Verify publication
npm view @sj-utils/[PACKAGE_NAME]
```

## Phase 4: Create GitHub Release

### 4.1 Create Comprehensive Release
```bash
gh release create v1.0.0 \
  --title "🎉 Initial Release - @sj-utils/[PACKAGE_NAME] v1.0.0" \
  --notes "## 🚀 @sj-utils/[PACKAGE_NAME] v1.0.0

[PROJECT_DESCRIPTION]

### ✨ Key Features
- 🔧 **[Key Feature 1]**: [Brief description]
- ⚡ **[Key Feature 2]**: [Brief description]  
- 📦 **TypeScript**: Full type safety and IntelliSense support
- 🧪 **Well-tested**: Comprehensive test coverage
- 🌐 **Universal**: Works in target environment
- 📚 **Zero dependencies**: Lightweight and fast

### 📥 Installation
\`\`\`bash
npm install @sj-utils/[PACKAGE_NAME]
\`\`\`

### 🔗 Quick Start
\`\`\`typescript
import { [MAIN_EXPORT] } from '@sj-utils/[PACKAGE_NAME]';

// Usage example
const example = [MAIN_EXPORT]();
\`\`\`

### 📖 Documentation
- Full API documentation in [README.md](https://github.com/[GITHUB_USERNAME]/[PROJECT_NAME]#readme)
- TypeScript definitions included

### 📦 npm Package
Published on npm: https://www.npmjs.com/package/@sj-utils/[PACKAGE_NAME]

Happy coding! 🎉"
```

## Phase 5: Final Verification

### 5.1 Verification Checklist
- [ ] Git history shows correct backdated commits ([START_DATE] to [END_DATE])
- [ ] All commits use correct email ([GIT_EMAIL])
- [ ] GitHub repository created and commits visible with correct dates
- [ ] Package published successfully under @sj-utils organization
- [ ] GitHub release created with comprehensive notes
- [ ] Package installs correctly: `npm install @sj-utils/[PACKAGE_NAME]`
- [ ] All tests pass: `npm test`

### 5.2 Test Installation
```bash
# Test in separate directory
cd /tmp && mkdir test-[PACKAGE_NAME] && cd test-[PACKAGE_NAME]
npm init -y
npm install @sj-utils/[PACKAGE_NAME]
node -e "console.log(require('@sj-utils/[PACKAGE_NAME]'))"
```

## Critical Success Factors

### Must Follow In Order
1. **Configure git user FIRST** (prevents author issues)
2. **Complete all development BEFORE commits** (prevents file conflicts)
3. **Create all backdated commits at once** (maintains chronological order)
4. **Verify each phase before proceeding** (catches issues early)

### Key Requirements
- ✅ Use @sj-utils organization for npm packages
- ✅ Set git email to [GIT_EMAIL] before any commits
- ✅ Use backdated commits with specified date range
- ✅ Generate random times within each day
- ✅ Follow commit message conventions

### Time Format Template
```bash
GIT_AUTHOR_DATE="YYYY-MM-DDTHH:MM:SS+00:00" \
GIT_COMMITTER_DATE="YYYY-MM-DDTHH:MM:SS+00:00" \
git commit -m "commit message"
```

## Simple Troubleshooting

### If npm publish fails:
```bash
# Check login
npm whoami

# Check package name availability  
npm view @sj-utils/[PACKAGE_NAME]

# If scope doesn't exist, create at: https://www.npmjs.com/org/create
```

### If GitHub push fails:
```bash
# Check remote
git remote -v

# Check authentication
gh auth status
```

## Summary

This streamlined workflow ensures:
1. ✅ Proper backdated git history with correct author
2. ✅ Professional @sj-utils npm package
3. ✅ Complete GitHub repository with release
4. ✅ No fixes or resets needed

**Success Key**: Follow steps in exact order with proper git configuration from the start!