---
title: On Writing Code That Ages Well
description: A deep dive into how I think about building software that lasts
date: Jan 2025
---

Code that ages well doesn't happen by accident. It's the result of deliberate choices about abstraction, dependencies, and simplicity.

## Choose Dependencies Wisely

Every dependency you add is a bet that the library will outlive your project. Before adding a dependency, ask:

- What problem does this solve that I couldn't solve with 50 lines of my own code?
- Is this library well-maintained and likely to be around in 5 years?
- What happens when this library breaks or becomes obsolete?

## Prefer Boring Technology

There's a reason established technologies survive — they work reliably and have large communities. Boring technology means:

- Predictable behavior
- Extensive documentation
- Easy hiring
- Long-term stability

## Structure for Deletion

Good code is easy to delete. Organize your codebase so that when requirements change, you can remove old code cleanly without breaking unrelated features. This means:

- Clear boundaries between modules
- Minimal coupling
- Well-defined interfaces

## Document the Why

Comments that explain what the code does are redundant. Comments that explain why the code exists are invaluable. Future developers (including future you) will thank you for context about the decisions that shaped the code.

## Embrace Constraints

Constraints force better decisions. A smaller API surface, fewer dependencies, and simpler abstractions lead to code that's easier to understand, test, and maintain over time.
