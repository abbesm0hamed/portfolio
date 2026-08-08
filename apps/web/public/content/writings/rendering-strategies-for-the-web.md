---
title: Rendering Strategies for the Web
description: SSG, SSR, ISR, and PPR — the tradeoffs behind how pages reach the browser
date: May 2025
---

How a page gets rendered is one of the most consequential decisions in web development. It affects performance, freshness, scalability, and the user's experience. SSG, SSR, ISR, and PPR aren't just framework features — they're mental models for thinking about the relationship between your server and your users.

## Static Site Generation (SSG)

SSG is the simplest mental model: pages are HTML files generated at build time. There's no server logic at runtime — the page is already built, served from a CDN, and arrives in the browser as fast as the network can deliver it.

The strength of SSG is its simplicity. No server to manage, no runtime costs, no caching headers to reason about. The weakness is staleness. If your content changes after the build, users see the old version until you rebuild. For content that changes rarely — marketing pages, documentation, portfolios — this is a perfectly fine tradeoff. For anything that changes frequently, you need a different strategy.

SSG also has a hidden benefit: reliability. A static page can't fail at runtime because there's nothing running. It's the most resilient architecture you can choose, limited only by how often you're willing to rebuild.

## Server-Side Rendering (SSR)

SSR flips the model entirely. Instead of building pages ahead of time, the server renders them fresh on every request. This means the page always reflects the latest data — the user's session, real-time information, personalized content.

The cost is latency. Every request hits the server, the server does work, and the user waits. SSR also introduces operational complexity — you need a running server, you need to manage its resources, and you need to think about caching at the HTTP layer rather than at the build layer. But for pages that genuinely need request-time data, SSR is the only honest choice. The key question is whether the freshness is worth the cost.

SSR also scales differently than SSG. A static site scales by pushing files to a CDN — the edge does the work. An SSR site scales by adding server capacity — your infrastructure does the work. This isn't inherently worse, but it's a different operational model with different cost characteristics.

## Incremental Static Regeneration (ISR)

ISR is a compromise that acknowledges a reality: most "dynamic" content doesn't actually change on every request. A product page might update a few times a day, not hundreds of times per second. ISR gives you the performance of static rendering with the freshness of server rendering by regenerating pages in the background after a configurable interval.

The concept is elegant. A page is built statically, but after a certain duration, the next request triggers a background regeneration. That request still serves the stale version instantly — the user doesn't wait — while the fresh version is built behind the scenes. Subsequent requests get the new version.

ISR also supports on-demand revalidation, where you trigger regeneration explicitly when content changes — for example, when a CMS webhook fires. This is more precise than time-based revalidation and eliminates the window of staleness entirely. It's a model that treats the build not as a one-time event, but as an ongoing process.

## Partial Prerendering (PPR)

PPR is the newest approach and it represents a shift in how we think about rendering. The previous strategies are page-level decisions — a page is either static or dynamic. PPR breaks this by letting you mix both within a single page.

The concept is a static shell with dynamic holes. At build time, the framework renders everything it can — the layout, navigation, non-dynamic content — and leaves placeholders for the dynamic parts. At request time, those dynamic parts stream in independently. The user sees the page structure immediately and the dynamic content fills in as it arrives.

This is a fundamentally different user experience. Instead of waiting for the slowest data fetch before showing anything, the page loads progressively. It's the rendering equivalent of progressive image loading — structure first, details when ready. PPR is likely where rendering strategies are heading, because it matches how most pages actually work: mostly static, with a few genuinely dynamic pieces.

## The Real Decision

The rendering strategy you choose should follow from a simple question: how fresh does this content need to be, and what is the user's experience while they wait for it?

Most applications aren't one strategy or another. A marketing site might use SSG for most pages but SSR for a personalized dashboard. A blog might use ISR for posts but SSG for the archive. The skill is in choosing the right strategy for each page based on its actual requirements, not defaulting to the most complex option.

Start with the simplest strategy that meets your needs. You can always add complexity later. You rarely benefit from removing it.
