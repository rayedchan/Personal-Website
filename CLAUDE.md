# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## Architecture

This is a **Next.js 16 App Router** personal portfolio site using React 19, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

### Pages

- `app/page.tsx` — Home page (single-page layout with anchor sections: `#home`, `#about`, `#projects`, `#skills`, `#stocks`, `#contact`)
- `app/work-experience/page.tsx` — Work history timeline using `react-vertical-timeline-component`
- `app/layout.tsx` — Root layout wrapping all pages in `<Providers>` and injecting Vercel Analytics

### Theme System

All pages consume `useTheme()` from `app/context/ThemeContext.tsx` to conditionally apply dark/light Tailwind classes. `ThemeProvider` persists the preference in `localStorage` (default: dark). The context is mounted once in `app/providers.tsx` which is loaded by the root layout. Every component that needs theme-aware styles imports `useTheme` directly — there is no CSS variable or Tailwind dark-mode class approach; all theming is done inline via conditional class strings.

### Stock Portfolio Feature

`app/api/stocks/route.ts` is a Next.js Route Handler that fetches live quotes from the Finnhub API for a hardcoded list of symbols. It uses ISR (`revalidate = 300`) to cache responses for 5 minutes. The client-side `StockPortfolio` component (`app/components/StockPortfolio.tsx`) calls `/api/stocks` on mount and handles sorting state locally. `StockPortfolioSkeleton` is shown during the initial fetch via `<Suspense>`.

The Finnhub API key must be set as an environment variable:

```
STOCK_API_KEY=your_finnhub_api_key
```

## Git Workflow

### Branching

Always create a feature branch from `main` before making changes. Never commit directly to `main`.

```bash
git checkout main && git pull
git checkout -b <type>/<short-description>   # e.g. feat/add-blog-section
```

Branch name prefixes: `feat/`, `fix/`, `chore/`, `refactor/`, `docs/`.

### Commit messages

Follow Conventional Commits format:

```
<type>(<optional scope>): <short summary>

[optional body explaining why, not what]
```

Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`.

Examples:
- `feat(stocks): add sorting by market cap`
- `fix(theme): persist dark mode preference on first load`
- `chore: upgrade Next.js to 16.1`

Keep the summary under 72 characters and in the imperative mood ("add" not "added").

### Pull Requests

Always open a PR to merge into `main` — never push directly to `main`. Use `gh pr create` and include a short summary of what changed and why. Request review before merging.

```bash
git push -u origin <branch>
gh pr create --title "<type>: <summary>" --body "..."
```

### Key conventions

- All pages and components use `"use client"` — there are no RSC-specific data fetching patterns outside the `/api` route handler.
- Company logos in `app/icons/` are inline SVG React components (not image files).
- Static assets (project screenshots, company logos) live in `public/`.
- No test suite is configured.
