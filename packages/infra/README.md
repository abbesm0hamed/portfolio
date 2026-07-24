# @portfolio/infra

Infrastructure-as-code for deploying the portfolio to Cloudflare Workers using [Alchemy](https://alchemy.run).

## Prerequisites

1. Install dependencies from the monorepo root:

   ```bash
   bun install
   ```

2. Copy `.env.example` to `.env` and fill in your Cloudflare API token:
   ```bash
   cp .env.example .env
   ```

## Commands

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `bun run deploy`  | Deploy to Cloudflare Workers (run from monorepo root) |
| `bun run destroy` | Tear down deployed infrastructure                     |
| `bun run dev`     | Start local dev with Alchemy                          |

## How it works

Alchemy's `Astro` resource builds the Astro app and deploys it as a Cloudflare Worker with static asset serving via Workers Assets.
