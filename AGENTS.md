# Project Notes

This is a TanStack Start marketing page for Fieldnote Studio. It uses file-based routing under `src/routes` and Tailwind CSS utilities for most layout and visual styling.

## Architecture

- `src/routes/__root.tsx` defines the HTML shell and page metadata.
- `src/routes/index.tsx` contains the complete homepage experience.
- `src/styles.css` imports Tailwind and holds global browser, typography, and link defaults.
- `public/` contains static assets served from the site root.

## Coding Conventions

Keep page sections in `src/routes/index.tsx` unless the page grows enough to justify extracting components. Prefer small data arrays for repeated service or timeline content. Use Lucide React icons for UI iconography instead of custom SVGs when an appropriate icon exists.

The visual direction is editorial and tactile: warm paper background, deep green text, terracotta accents, serif display type, and subtle bordered compositions. Preserve that palette and spacing language when extending the page.

## Non-Obvious Decisions

The hero visual is built with HTML and CSS instead of an external image so the page has a strong first-viewport signal without depending on remote assets. The contact call to action uses a `mailto:` link because no backend form or persistent storage was requested.
