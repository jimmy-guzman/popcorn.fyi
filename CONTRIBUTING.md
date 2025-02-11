# 🎥 Contributing to popcorn.fyi

Thanks for your interest in contributing to popcorn.fyi! We welcome all contributions, whether it's fixing bugs 🐛, improving documentation 📚, or suggesting new features ✨.

## 🚀 Getting Started

Refer to the [README](./README.md) for setting up the project. Here's a quick overview:

1. **🔄 Clone the Repository**

   ```bash
   gh repo clone jimmy-guzman/popcorn.fyi
   cd popcorn.fyi
   ```

2. **📦 Install Dependencies**

   Make sure you have [pnpm](https://pnpm.io/installation) installed:

   ```bash
   pnpm install
   ```

3. **🔧 Setup Environment Variables**

   Copy the example environment file and update it with your credentials:

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

4. **💻 Run the Development Server**

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000` to view the app.

   > **Note:** Storybook for UI components will also be available at `http://localhost:6006` when running the development server.

## 🛠 Guidelines

- **📝 Code Style:**

  Follow existing coding patterns. Use kebab-case for filenames and keep components organized by feature (e.g., `movie/`, `tv/`, `person/`).

- **🔒 Type Safety & Linting:**

  The repository uses [Lefthook](https://github.com/evilmartians/lefthook) for git hooks to automatically run checks before commits. These include:

  - **🎨 Prettier** for formatting code.
  - **📑 sort-package-json** to maintain consistent `package.json` structure.
  - **🧹 Knip** for detecting unused files and dependencies.
  - **🗂 Manypkg** for managing monorepo dependencies.
  - **🔍 ESLint** for linting across most workspaces.

  You can also manually run all checks with:

  ```bash
  pnpm check
  ```

  This runs type checks, linting, and coverage reports to ensure code quality.

- **✅ Testing:**

  The project uses Vitest with React Testing Library for unit tests, and Playwright for end-to-end tests. Run tests with:

  ```bash
  pnpm test
  ```

  For a deeper dive into the testing approach, check out [docs/testing.md](./docs/testing.md).

- **📚 UI Component Development:**

  Storybook is used for developing and documenting UI components within the **libs/ui** package. When running the development server (`pnpm dev`), Storybook will automatically be available at `http://localhost:6006`. This allows you to develop and test components in isolation alongside the main app.

  For more on how Storybook fits into the project, see [docs/testing.md](./docs/testing.md).

- **🔄 CI/CD Pipeline:**

  The automated workflows handle everything from code checks to deployments with GitHub Actions and Vercel. Learn more about how it all fits together in [docs/ci-cd.md](./docs/ci-cd.md).

- **✍️ Commit Messages:**

  Follow the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format:

  ```
  feat: add new feature ✨
  fix: fix a bug 🐛
  docs: update documentation 📚
  ```

## 📤 Submitting a Pull Request

1. **🍴 Fork the Repository**
2. **🌿 Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **🛠 Make Your Changes**
4. **🔍 Run Checks:**

   ```bash
   pnpm check
   ```

5. **🚀 Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **🔄 Open a Pull Request** on the main repository.

## 🐞 Reporting Issues

If you find a bug or have a feature request, please open an issue with a clear description and steps to reproduce (if applicable).

---

Thanks for contributing! 🎬
