---
'@hyperse/exec-program': patch
---

Dependency refresh, toolchain modernization, and CI hardening.

**Changed**
- Dev toolchain upgrades: `vitest` `^3.2.3` → `^5.0.4`, `tsup` `^8.5.0` → `^9.0.0`, `typescript` `^5.8.3` → `^7.0.2`, `eslint` `^9.28.0` → `^10.12.0`.
- Lint/commit tooling upgrades: `@commitlint/cli` and `@commitlint/config-conventional` `19.8.1` → `21.2.3`, `@hyperse/eslint-config-hyperse` `^1.4.4` → `^1.7.5`, `lint-staged` `16.1.0` → `17.6.0`, `commitizen` `4.3.1` → `4.3.2`, `@types/node` `^24.0.0` → `^26.6.5`.
- Release tooling upgraded to the Changesets v3 line: `@changesets/cli` `2.29.4` → `3.0.3` and `@changesets/changelog-github` `0.5.1` → `1.0.1`.
- Runtime dependencies refreshed: `@hyperse/ts-node` `^1.0.3` → `^1.2.0` and `execa` `^9.6.0` → `^10.1.1`.
- Bumped the package manager from `yarn@4.9.1` to `yarn@4.18.1` (`.yarn/releases/yarn-4.18.1.cjs`, `packageManager`, and `yarnPath` updated together).

**Fixed**
- Release workflow (`.github/workflows/release-or-version-pr.yml`) now also exports `YARN_NPM_AUTH_TOKEN` alongside `NPM_TOKEN`. Yarn Berry ignores `NPM_TOKEN`, so publishing previously failed with `YN0033: No authentication configured for request` when the registry token was only provided through the legacy variable.
- Migrated the release workflow from `changesets/action@v1` to `changesets/action@v2` (required for `@changesets/cli` v3) and renamed its inputs to the v2 names (`publish` → `publish-script`, `title` → `pr-title`), adding `github-token` and `commit-message`, and dropping the unsupported `cwd`.
- CI test job (`.github/workflows/ci-integrity.yml`) moved from the EOL Node.js `18.x` to the current LTS `24.x`, matching the release workflow.
- Corrected the CI trigger path filters from `packages/**` to `src/**` (this package has no `packages/` directory), so unit tests and typechecking actually run on source changes.
- Added `yarn typecheck` to CI and reordered the steps so `Build` runs before `Unit tests`.
- Excluded Changesets version PRs from CI, auto-assign, and the release job via `!startsWith(github.head_ref, 'changeset-release/')`, and added the `dev` branch to the CI triggers.

**Internal**
- `tsconfig.json` dropped the deprecated `baseUrl` (TypeScript 7 warns on it); `tsconfig.build.json` keeps its own `baseUrl` for the build.
- Yarn configuration (`.yarnrc.yml`) added `approvedGitRepositories: ["**"]`, `enableScripts: true`, `npmMinimalAgeGate: 0`, keeping `nodeLinker: node-modules` and `enableGlobalCache: false` unchanged.
- VS Code workspace settings (`.vscode/settings.json`) migrated the deprecated `typescript.*` keys to the new `js/ts.*` keys and enabled `json.schemaDownload.enable`.
- `yarn.lock` regenerated for the upgrades above.
