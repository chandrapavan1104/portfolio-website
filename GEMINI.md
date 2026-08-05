# Project Context — Portfolio-website

> UNIVERSAL CONTEXT for all AI agents (Claude, Codex, Gemini).
> This file is mirrored to AGENTS.md, CLAUDE.md, and GEMINI.md — keep it as the
> single source of truth for what this project is and where it stands.
>
> AGENTS: when you make a meaningful change to this project, UPDATE the
> "Current State" and "Changelog" sections below before you finish.

## Overview
(What is this project? One paragraph.)

## Tech Stack
(Languages, frameworks, key dependencies.)

## Architecture / Key Files
(Where the important code lives.)

## Conventions
(Code style, naming, testing, commit rules an agent should follow.)

## Current State
The active Build Grounds theme has a responsive light/dark portfolio experience.
Its Afterhours Prompt brand mark wraps a terminal prompt and cursor in an open
neon night-loop, and is used across navigation, the hero, favicon, and app metadata.

Site-wide visit tracking writes one document per route change to the Firestore
`visits` collection over the REST API, so it adds nothing to the bundle. The
`/admin` page reads them back behind Firebase email/password sign-in.

## Changelog (most recent first)
- 2026-08-05 — added site-wide visit tracking and the /admin visits dashboard
- 2026-07-23 00:46 — replaced Commit Pulse with the Afterhours Prompt logo across site branding
- 2026-07-22 20:15 — replaced Infinite Runtime with the Commit Pulse logo across site branding
- 2026-07-22 19:47 — replaced the CPR monogram with the Infinite Runtime logo across site branding
- 2026-07-22 19:42 — context initialized

## TODO / Next Steps
(What to work on next.)
