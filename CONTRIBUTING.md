# 🎥 Contributing to popcorn.fyi

Thanks for your interest in contributing! Whether you're fixing bugs 🐛, improving docs 📚, or suggesting new features ✨, all contributions are welcome.

## 🚀 Getting Started

Refer to the [README](./README.md) for full setup details. Here's a quick start:

1. **🔄 Clone the Repository**

   ```bash
   gh repo clone jimmy-guzman/popcorn.fyi
   cd popcorn.fyi
   ```

2. **📦 Install Dependencies**
   Ensure you have [pnpm](https://pnpm.io/installation) installed:

   ```bash
   pnpm install
   ```

3. **🔧 Setup Environment Variables**

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

4. **💻 Run the Development Server**

   ```bash
   pnpm dev
   ```

   Visit `http://localhost:3000` to view the app.

## 🛠 Guidelines

### **📝 Code Style**

- Follow existing patterns.
- Use **kebab-case** for filenames.
- Keep components organized by feature (e.g., `movie/`, `tv/`, `person/`).

### **🔒 Type Safety & Linting**

- The repo uses [Lefthook](https://github.com/evilmartians/lefthook) for pre-commit checks:
  - **🎨 Prettier** (formatting)
  - **📑 sort-package-json** (consistent `package.json`)
  - **🧹 Knip** (detects unused files/dependencies)
  - **🔍 ESLint** (linting)

Run checks manually:

```bash
pnpm check
```

### **✅ Testing**

- **Unit & Integration:** [Vitest](https://vitest.dev) with React Testing Library.
- **E2E:** [Playwright](https://playwright.dev).

Run tests:

```bash
pnpm test
```

See [docs/testing.md](./docs/testing.md) for details.

### **🔄 CI/CD Pipeline**

- Uses **GitHub Actions** + **Vercel** for deployments.
- Details in [docs/ci-cd.md](./docs/ci-cd.md).

### **✍️ Commit Messages**

Follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/):

```bash
feat: add new feature ✨
fix: fix a bug 🐛
docs: update documentation 📚
```

## 📜 Available Scripts

- **🚀 Start Development**
  ```sh
  pnpm dev
  ```
- **🏗 Build for Production**
  ```sh
  pnpm build
  ```
- **✅ Run Tests**
  ```sh
  pnpm test
  ```
- **📸 Run E2E Tests**
  ```sh
  pnpm e2e
  ```
- **🎨 Format Code**
  ```sh
  pnpm format
  ```
- **🔍 Lint Code**
  ```sh
  pnpm lint
  ```
- **🔎 Type Checking**
  ```sh
  pnpm typecheck
  ```
- **🔄 Full Project Check**
  ```sh
  pnpm check
  ```

## 🛠 Git Hooks (Lefthook)

Pre-commit checks run automatically:

- **🎨 Prettier** – Formats staged files.
- **🔍 ESLint** – Lints code.
- **🧹 Knip** – Detects unused files/dependencies.

Run manually:

```sh
pnpm check
```

## 📤 Submitting a Pull Request

1. **🍴 Fork the Repo**
2. **🌿 Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **🛠 Make Your Changes**
4. **🔍 Run Checks**
   ```bash
   pnpm check
   ```
5. **🚀 Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **🔄 Open a PR**

## 🐞 Reporting Issues

Found a bug? Have a feature request? Open an issue with details.

---

Thanks for contributing! 🎬
