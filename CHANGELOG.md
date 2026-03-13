# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Playwright testing framework configuration
- Test specifications for end-to-end testing
- GitHub Actions workflow for Playwright tests
- VSCode MCP configuration

### Changed

- Updated `.gitignore` with additional exclusions

## [0.3.0] - 2026-02-07

### Added

- JSDoc comments to all components (8 files) per AGENTS.md guidelines
- Code review script improvements for ESLint compatibility

### Changed

- **BREAKING**: Upgraded Next.js from 16.0.3 to 16.1.6 (security patches)
- **BREAKING**: Migrated from `next lint` to ESLint CLI (Next.js 16 requirement)
- Updated ESLint configuration to use direct imports from `eslint-config-next`
- Replaced `useState` + `useEffect` with `useSyncExternalStore` in ModeToggle component
- Updated `.skills/review-code.sh` script to work with new ESLint output format
- Fixed JSDoc counting logic in review script to handle multiple components per file
- Removed deprecated `@eslint/eslintrc` dependency

### Fixed

- ESLint circular structure error when running lint command
- React hooks ESLint error for `setState` in `useEffect` in ModeToggle component
- Code review script false positives for ESLint checks

## [0.2.0] - 2025-11-17

### Added

- Installation instructions in README
- Environment variable for site title configuration
- Example environment file (`.env.example`)

### Fixed

- Hydration error when loading page in dark mode
- Renamed example env file for simplicity

## [0.1.0] - 2025-11-06

### Added

- ESLint GitHub Actions workflow for automated code linting
- SARIF format support for ESLint results
- Global ignore patterns in ESLint configuration

### Changed

- Upgraded ESLint to version 9.28.0
- Changed ESLint config file to `eslint.config.mjs` format
- Extended ESLint configuration with Prettier support
- Updated packages to latest versions

## [0.0.9] - 2025-08-06

### Added

- Example environment file for configuration
- `lint:fix` npm script for automatic linting fixes

### Changed

- ESLint rule updates and cleanup
- Updated packages to latest versions
- Formatting tweaks after Prettier update
- Cleaned up config files, removing redundant default values

### Fixed

- Various linting errors resolved
- Type definitions added to fix linting errors

## [0.0.8] - 2025-04-18

### Added

- Header and footer components
- Dark/light mode toggle functionality
- Icon carousel component
- Features list component
- ShadCN UI components integration
- Support for light and dark modes using `.dark` class

### Changed

- Content updates across multiple sections

## [0.0.7] - 2025-04-13

### Changed

- Minor content updates

## [0.0.6] - 2025-04-04

### Changed

- Code cleanup
- Updated `.gitignore`

## [0.0.5] - 2025-03-24

### Changed

- Upgraded Next.js to version 15.2.3

## [0.0.4] - 2025-03-14

### Added

- Custom 404 error page
- Environment variable support for dynamic configuration

### Changed

- Replaced dummy URLs with Vercel deployment URL

## [0.0.3] - 2025-03-12

### Added

- VSCode recommended extensions configuration
- Dummy URL data for testing

## [0.0.2] - 2025-03-06

### Added

- Dynamic sitemap generation
- Robots.txt file
- Generic metadata for SEO
- Package configuration updates

### Changed

- Content updates
- Minor tweaks to configuration files

## [0.0.1] - 2025-02-20

### Added

- Initial Next.js boilerplate setup
- TypeScript configuration with strict mode
- Tailwind CSS integration
- ESLint configuration
- Prettier formatting
- Basic project structure
- README documentation

[Unreleased]: https://github.com/bill742/nextjs-boilerplate/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/bill742/nextjs-boilerplate/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/bill742/nextjs-boilerplate/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.9...v0.1.0
[0.0.9]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/bill742/nextjs-boilerplate/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/bill742/nextjs-boilerplate/releases/tag/v0.0.1
