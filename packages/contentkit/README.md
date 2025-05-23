# <picture><source srcset="./assets/logo-dark.png" media="(prefers-color-scheme: dark)" /><img src="./assets/logo-light.png" height="30" alt="ContentKit Logo" /></picture>&nbsp;ContentKit

ContentKit is a powerful SDK for converting Markdown (or MDX) content into structured JSON data. It provides a complete solution for managing content in TypeScript projects, including type-safe configurations, a build system, and a CLI.

> [!CAUTION]
> **This project is under construction** and is not fully tested and expected to be entirely working yet. Please use with caution however we do not recommend using this in production yet.

## Features

- **Type-safe configurations**: Define your content structure with TypeScript types.
- **Markdown processing**: Convert Markdown content into JSON with metadata and HTML.
- **Multi-format frontmatter support**: Parse YAML, JSON, and TOML frontmatter seamlessly.
- **Auto-generated types**: Automatically generate TypeScript types for your content.
- **CLI**: Build your content with a single command.
- **Next.js integration**: Automatically rebuild content in Next.js projects.
- **Extensible**: Modular design with utilities, core functionality, and CLI.

## Packages

ContentKit is a monorepo with the following packages:

- [`@ckjs/utils`](./packages/utils): Utility functions for logging and configuration loading.
- [`@ckjs/types`](./packages/types): Type definitions for ContentKit.
- [`@ckjs/core`](./packages/core): Core library for building and processing content.
- [`@ckjs/cli`](./packages/cli): Command-line interface for ContentKit.
- [`@ckjs/matter`](./packages/matter): Frontmatter parser for YAML, JSON, and TOML.
- [`@ckjs/next`](./packages/next): Next.js client for ContentKit.

## Installation

Install the `contentkit` package:

```bash
# Using npm
npm install contentkit

# Using yarn
yarn add contentkit

# Using pnpm
pnpm add contentkit

# Using bun
bun add contentkit
```

## Getting Started

Visit the [ContentKit documentation](https://contentkit.dev/docs/getting-started) for more information on how to get started with ContentKit.

## License

BSD-3-Clause