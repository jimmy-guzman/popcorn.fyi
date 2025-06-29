# Contributing to popcorn.fyi

Thanks for your interest in contributing! Whether you're fixing bugs, adding features, or improving docs, all contributions are welcome.

## Quick Start

```bash
gh repo clone jimmy-guzman/popcorn.fyi
cd popcorn.fyi
pnpm install
pnpm exec playwright install
cp .env.example .env
pnpm dev
```

You'll need to add your API keys to `.env` - see the [README](./README.md) for details.

## Before You Submit

Run the full check to make sure everything passes:

```bash
pnpm check
```

This runs formatting, linting, type checking, tests, and builds the project.

## Guidelines

- Use kebab-case for file names
- Organize by feature (`src/movie/`, `src/tv-show/`, etc.)
- Co-locate tests with components
- Follow conventional commits (`feat:`, `fix:`, `docs:`)

## Project Structure

```
popcorn.fyi/
├── src/
│   ├── api/                 # API functions for TMDB & Wikidata
│   │   ├── movie/          # Movie-specific endpoints
│   │   ├── tv/             # TV show endpoints
│   │   └── people/         # People endpoints
│   ├── components/         # React components
│   │   ├── movie/          # Movie components
│   │   ├── tv/             # TV show components
│   │   ├── people/         # People components
│   │   ├── media/          # Shared media components
│   │   └── shared/         # Common UI components
│   ├── routes/             # TanStack Start routes
│   ├── lib/                # Utility functions
│   └── testing/            # Test utilities & mocks
├── docs/                   # Documentation
├── e2e/                    # Playwright tests
└── public/                 # Static assets
```

## Available Commands

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `pnpm dev`        | Start development server          |
| `pnpm build`      | Build for production              |
| `pnpm test`       | Run unit/integration tests        |
| `pnpm e2e`        | Run end-to-end tests              |
| `pnpm e2e:ui`     | Run E2E tests with UI             |
| `pnpm coverage`   | Generate test coverage report     |
| `pnpm format`     | Check code formatting             |
| `pnpm format:fix` | Fix code formatting               |
| `pnpm lint`       | Run ESLint                        |
| `pnpm lint:fix`   | Fix ESLint issues                 |
| `pnpm typecheck`  | Check TypeScript types            |
| `pnpm check`      | Run all quality checks            |
| `pnpm deps:up`    | Update dependencies interactively |

## Learn More

- **Architecture:** [docs/architecture.md](./docs/architecture.md) - System design and tech stack
- **Testing:** [docs/testing.md](./docs/testing.md) - Testing strategy and examples
- **CI/CD:** [docs/ci-cd.md](./docs/ci-cd.md) - Build and deployment process

## Need Help?

Open an issue if you're stuck, found a bug, or have ideas for improvements.

---

Thanks for contributing!
