# Contributing to Stefanos Frontend

First off — thank you for considering contributing. Whether you are fixing a typo, squashing a bug, or building an entire feature, we appreciate it. Genuinely.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project adheres to a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold it. Please report unacceptable behavior to **conduct@smholdings.gr**.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/<your-username>/Stefanos-frontend.git
   cd Stefanos-frontend
   ```
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Copy the environment file**:
   ```bash
   cp .env.example .env.local
   ```
5. **Start the dev server**:
   ```bash
   yarn dev
   ```

If the dev server starts without errors, congratulations — you are already ahead of most first-time setups.

## Development Workflow

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes
3. Run the linter and type checker:
   ```bash
   yarn lint
   yarn type-check
   ```
4. Test your changes locally (on desktop **and** mobile — yes, actually)
5. Commit your changes (see [Commit Messages](#commit-messages))
6. Push to your fork and open a Pull Request

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). This is not optional. Your future self will thank you.

### Format

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | When to Use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (not CSS) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, tooling |
| `ci` | CI/CD configuration changes |

### Examples

```
feat(booking): add date range validation to calendar picker
fix(auth): resolve token refresh loop on expired sessions
docs(readme): update deployment instructions for Render
chore(deps): bump next from 16.1.4 to 16.1.6
```

## Pull Requests

### Before Opening a PR

- [ ] Your code builds without errors (`yarn build`)
- [ ] Linting passes (`yarn lint`)
- [ ] Type checking passes (`yarn type-check`)
- [ ] You have tested on both desktop and mobile viewports
- [ ] You have not committed `console.log` statements (we all do it, just clean them up)
- [ ] Your branch is up to date with `main`

### PR Guidelines

- **One PR per feature or fix.** Do not bundle unrelated changes. We are not reviewing a novel.
- **Write a clear description.** Explain *what* changed and *why*. Screenshots are welcome for UI changes.
- **Keep PRs small.** Under 400 lines of diff is ideal. Over 1000 and reviewers start skimming. You know they do.
- **Link related issues** using `Closes #123` or `Fixes #456`.
- **Be responsive to feedback.** Reviews are a conversation, not a verdict.

## Code Style

- **TypeScript** — Strict mode. No `any` unless you have a very good reason and a written apology.
- **Tailwind CSS** — Utility classes. No inline styles. No CSS modules unless absolutely necessary.
- **Components** — Functional components only. No class components. It is not 2018.
- **Naming** — PascalCase for components, camelCase for functions and variables, SCREAMING_SNAKE_CASE for constants.
- **Imports** — Absolute imports via `@/` alias. Group them: external packages first, then internal modules.
- **Formatting** — Prettier handles it. Do not fight Prettier. You will lose.

### File Organization

```
src/components/feature-name/
  FeatureName.tsx          # Main component
  FeatureNameCard.tsx      # Sub-component
  useFeatureName.ts        # Custom hook (if needed)
  featureName.types.ts     # Types (if complex enough)
```

## Reporting Bugs

Found a bug? We are not surprised, but we are grateful you are telling us.

### Before Reporting

- Check the [existing issues](../../issues) to avoid duplicates
- Make sure you are on the latest version of `main`
- Try reproducing in an incognito window (browser extensions cause more bugs than developers do)

### Bug Report Should Include

1. **Summary** — What happened?
2. **Steps to Reproduce** — How do we make it happen again?
3. **Expected Behavior** — What should have happened?
4. **Actual Behavior** — What actually happened?
5. **Screenshots** — If it is a UI bug, show us
6. **Environment** — Browser, OS, screen size, Node version

Use the [Bug Report template](./ISSUE_TEMPLATE/bug_report.md) when opening an issue.

## Suggesting Features

Have an idea? We would love to hear it.

- Open an issue using the [Feature Request template](./ISSUE_TEMPLATE/feature_request.md)
- Describe the problem your feature would solve
- Explain your proposed solution
- Note any alternatives you have considered

We cannot promise we will build everything, but we read everything.

---

## Questions?

If something in this guide is unclear, open an issue or reach out. We do not bite. The linter might, though.

---

Thank you for contributing. Seriously. Open source runs on people like you and mass-produced coffee.
