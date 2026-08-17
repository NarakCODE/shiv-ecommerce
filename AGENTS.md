# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 12 Pages Router storefront. Route pages live in `pages/`, with dynamic routes under `pages/products/` and `pages/product-category/`. Reusable UI is organized by feature in `components/`; cart, wishlist, and authentication state live in `context/`. Global and component-specific styles are in `styles/` and nearby CSS modules. Translation content is under `messages/`, and static images, icons, and PWA files belong in `public/`. There is currently no dedicated test directory.

## Build, Test, and Development Commands

Install dependencies and start local development with:

```bash
npm install
npm run dev
```

Use `npm run lint` for Next.js ESLint checks, `npm run build` to create the production build, and `npm start` to serve that build locally. The Dockerfile follows the same install/build/start flow. Product pages require the backend URL environment variables used in the codebase, including `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_PROD_BACKEND_URL`; configure them locally without committing secrets.

## Coding Style & Naming Conventions

Use strict TypeScript and the existing two-space, double-quoted style. Prefer typed React function components, `PascalCase` for component files and exports, `camelCase` for functions and variables, and descriptive `kebab-case` URL segments. Keep feature styles in the component’s `.module.css` file when they are not suitable for existing Tailwind utilities. Run `npm run lint` before submitting changes.

## Testing Guidelines

No automated test framework or coverage threshold is configured in this repository. For changes, at minimum run lint and a production build, then manually verify affected routes and responsive behavior; for storefront changes, exercise search, authentication, cart, wishlist, and checkout flows as applicable.

## Commit & Pull Request Guidelines

Use concise, imperative commit subjects with the established prefixes, for example `feat: update checkout`, `i18n: add order labels`, or `build(deps): bump package`. Pull requests should explain the user-visible change, link any related issue, list validation commands, and include screenshots or a short recording for UI changes. Call out required API or environment configuration changes explicitly.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
