---
title: Paydusa
description: A modern ecommerce template built with Next.js, Medusa, and Payload CMS
year: "2025"
role: Full-Stack
stack: TypeScript, Next.js, Medusa, PayloadCMS, PostgreSQL
repo: https://github.com/abbesm0hamed/paydusa
images:
  - /images/work/paydusa/paydusa_home.png
  - /images/work/paydusa/paydusa_store.png
---

## Overview

Paydusa is a modern ecommerce monorepo that combines three powerful technologies into a single, coherent stack:

- **Storefront** — Next.js application with an embedded Payload CMS admin
- **Commerce Engine** — MedusaJS backend handling products, carts, orders, and checkout
- **Content Management** — Payload CMS embedded directly within the Next.js app for managing marketing content

Built with Turborepo for monorepo management and a shared design system.

## Architecture

The project is organized as a monorepo with clear separation of concerns:

```
apps/
  store/        — Next.js storefront with embedded Payload CMS
  medusa/       — Medusa backend for commerce logic
packages/
  ui/           — Shared shadcn/ui components and design system
  medusa/       — Shared Medusa client, types, and utilities
  db/           — Database infrastructure (Docker, migrations)
  config/       — Shared linting and TypeScript configuration
  env/          — Shared environment variable validation (Zod)
```

## Key Features

- **Next.js 16.3+** with App Router, React 19
- **MedusaJS 2+** for headless commerce
- **Payload CMS 3+** for content management
- **shadcn/ui** design system shared across all apps
- **PayloadCMS** admin available at `/admin` on the storefront domain
- **Medusa admin** hosted on a separate subdomain to avoid route conflicts
- **PostgreSQL** + **Redis** via Docker for local development
- **TypeScript** throughout with Zod validation for environment variables

## Development

The setup process is automated — install dependencies, configure environment variables, spin up Docker containers for PostgreSQL and Redis, run migrations, and start both the storefront and Medusa backend in parallel.

### URLs

| Application  | URL                           |
| ------------ | ----------------------------- |
| Storefront   | `http://localhost:8000`       |
| Payload CMS  | `http://localhost:8000/admin` |
| Medusa Admin | `http://localhost:9100/app`   |
| pgAdmin      | `http://localhost:5050`       |

## Deployment

The two admin interfaces are deployed separately:

- **Medusa** on a subdomain (e.g., `api.example.com`) to isolate the commerce backend
- **Payload CMS** on the same domain as the storefront at `/admin` to keep content management close to the frontend

This avoids route conflicts between Medusa's API routes (`/store/*`) and Payload's admin panel.
