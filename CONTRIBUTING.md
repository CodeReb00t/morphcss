# Contributing to MorphCSS

First off, thank you for considering contributing to MorphCSS! It's people like you that make MorphCSS such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Development Setup

MorphCSS is a monorepo managed with `pnpm` and `cargo`. 

### Prerequisites
- Node.js >= 18
- pnpm >= 8
- Rust (latest stable)
- Rust toolchain (`rustup`)

### Initializing the Workspace

1. Clone the repository:
   ```bash
   git clone https://github.com/morphcss/morphcss.git
   cd morphcss
   ```

2. Install Node dependencies:
   ```bash
   pnpm install
   ```

3. Build the core Rust binaries:
   ```bash
   cd crates/morphcss_node
   pnpm run build
   ```

### Running Tests

- **Rust**: `cargo test` in the `crates/` directory.
- **Node**: `pnpm test` in the root directory.

### Pull Requests

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`pnpm test` / `cargo test`).
5. Ensure your code passes linters (`pnpm lint` / `cargo clippy`).
6. Generate a changeset using `pnpm changeset`.

## Architecture Overview

If you want to contribute to the core engine, here is a high-level overview:
- `morphcss_parser`: Uses `oxc` to extract `css()` AST nodes from source code.
- `morphcss_core`: The Canonical IR and standard CSS property handling.
- `morphcss_compiler`: The multi-threaded `DashMap` Cache and Garbage Collection.
- `morphcss_node`: The NAPI-rs bindings that expose the compiler to Node.js.
- `packages/vite-plugin-morphcss`: The Vite integration that orchestrates HMR and CSS injection.
