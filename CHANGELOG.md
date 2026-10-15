# @hyperse/exec-program

## 1.2.2

### Patch Changes

- [`6f971e6`](https://github.com/hyperse-io/exec-program/commit/6f971e638d1f2fdd3616ef59c77e14fb3146d685) Thanks [@tianyingchun](https://github.com/tianyingchun)! - Dependency refresh, toolchain modernization, and CI hardening.

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

## 1.2.1

### Patch Changes

- [`a8d4aad`](https://github.com/hyperse-io/exec-program/commit/a8d4aad58e43eef896d020f54fc0dcb3887becb1) Thanks [@tianyingchun](https://github.com/tianyingchun)! - update docs & bump version

## 1.2.0

### Minor Changes

- [`56a3219`](https://github.com/hyperse-io/exec-program/commit/56a32192e9c4ce536afd19912f5f8554c1869be6) Thanks [@tianyingchun](https://github.com/tianyingchun)! - migrate to @hyperse/ts-node with swc compiler

## 1.1.0

### Minor Changes

- [`9b98a80`](https://github.com/hyperse-io/exec-program/commit/9b98a803282920a516d3a5ad570d3f940b0b249f) Thanks [@tianyingchun](https://github.com/tianyingchun)! - change ts-node to swc-node

## 1.0.11

### Patch Changes

- [`75fdda7`](https://github.com/hyperse-io/exec-program/commit/75fdda7ac577c2ec4868ac70631a0be52134f4b8) Thanks [@tianyingchun](https://github.com/tianyingchun)! - bump version

## 1.0.10

### Patch Changes

- [`e349553`](https://github.com/hyperse-io/exec-program/commit/e349553ff1389e806bf71a6b9a83485edb925504) Thanks [@tianyingchun](https://github.com/tianyingchun)! - change `exec` to `execute` avoid npm publish ` security policy` issue

## 1.0.9

### Patch Changes

- [`57ad1af`](https://github.com/hyperse-io/exec-program/commit/57ad1af4f7a67eeea0bce5760743f7b2435d3573) Thanks [@tianyingchun](https://github.com/tianyingchun)! - fix package declaretion

## 1.0.8

### Patch Changes

- [`8e4e53e`](https://github.com/hyperse-io/exec-program/commit/8e4e53e3d7220a6d1ca30917a1e1797e10cd13fe) Thanks [@tianyingchun](https://github.com/tianyingchun)! - release new version

## 1.0.7

### Patch Changes

- [`77dda75`](https://github.com/hyperse-io/exec-program/commit/77dda756553c3074320e3ad4d62d2060b9bba71b) Thanks [@tianyingchun](https://github.com/tianyingchun)! - bump version

## 1.0.6

### Patch Changes

- [`ad10fb9`](https://github.com/hyperse-io/exec-program/commit/ad10fb9a23db851cd3a9e527b9c2d0b34e9cdd02) Thanks [@tianyingchun](https://github.com/tianyingchun)! - fix typings portable issue

## 1.0.5

### Patch Changes

- [`031f004`](https://github.com/hyperse-io/exec-program/commit/031f00464baa63a4c9b4c3c11f7dc534b48e7050) Thanks [@tianyingchun](https://github.com/tianyingchun)! - export `ExecOptions`

## 1.0.4

### Patch Changes

- [`05d727a`](https://github.com/hyperse-io/exec-program/commit/05d727a57e3a27c79d7df2fd58c35d90c4a6d42e) Thanks [@tianyingchun](https://github.com/tianyingchun)! - refactor, add `exec`

## 1.0.3

### Patch Changes

- [`5e50929`](https://github.com/hyperse-io/exec-program/commit/5e50929c5d0e9c96fe71f176219748baefcbcc74) Thanks [@tianyingchun](https://github.com/tianyingchun)! - bump version

## 1.0.2

### Patch Changes

- [`ee141d6`](https://github.com/hyperse-io/exec-program/commit/ee141d60d9cb31aff210a99c14349cff2f51e70a) Thanks [@tianyingchun](https://github.com/tianyingchun)! - bump version

## 1.0.1

### Patch Changes

- [`4416382`](https://github.com/hyperse-io/exec-program/commit/4416382373864f3a8d9abce855fef0410badc600) Thanks [@tianyingchun](https://github.com/tianyingchun)! - initialize exec-program
