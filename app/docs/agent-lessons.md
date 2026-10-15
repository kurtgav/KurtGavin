# Agent lessons

## 2026-10-15 — Mobile navigation focus
- Trigger: Review found forward Tab skipped the newly opened mobile navigation.
- Root cause: Navigation precedes its disclosure toggle in DOM order; opening did not move focus.
- Remedy: Focus the first navigation link after opening. Escape closes the navigation and restores focus to the toggle.
- Verification: Browser at 390 px: Enter on Open navigation focused Work; Escape set aria-expanded=false and focused menu-toggle; selecting About navigated to /about/.
- Prevention/scope: Recheck Enter, Tab, Escape and link activation after changes to app/src/components/portfolio/Header.tsx. Visual order alone does not establish keyboard order.

## 2026-10-15 — Content update is not a redesign
- Trigger: User correction: "do not redesign, update the website only".
- Root cause: Broad portfolio refresh was incorrectly treated as authorization to replace the site's visual design.
- Remedy: Restore the original design from c151991 and integrate only the requested career, stack, anonymous projects and photo content into existing patterns.
- Prevention: AGENTS.md now requires explicit authorization for a redesign. Compare global styles, hero imagery, navigation, animation and contact layout with the original before release.
- Scope/evidence: This portfolio; c151991 is the original design baseline. The earlier mobile-menu lesson concerns a removed redesign component and is no longer applicable to the restored navigation.

## 2026-10-15 — Scope Astro diagnostics to source
- Trigger: Initial migration check exhausted the heap while scanning the old static export.
- Root cause: Broad TypeScript includes with allowJs pulled generated out/_next bundles into diagnostics.
- Remedy: Include src/**/* and .astro/types.d.ts; exclude dist, out, .next and node_modules.
- Prevention/scope: Preserve source-scoped includes when changing framework tooling; generated output is not source.
- Evidence: app/tsconfig.json; npm run check completed with 0 errors and 0 warnings after the scope correction.

## 2026-10-15 — Match native links to Astro slash policy
- Trigger: Mobile menu links failed after replacing Next Link with native anchors.
- Root cause: Astro trailingSlash=always serves /about/; the inherited /about link returned 404 in production preview.
- Remedy: Add trailing slashes to portfolio routes and normalize active navigation paths. Native navigation owns menu teardown.
- Verification: Browser navigated Work hash → About → Contact on mobile after correction; npm run verify passes all ten pages.
- Prevention/scope: scripts/verify-static.mjs rejects slashless page links, missing routes/assets and residual Next runtime. It reproduced 15 bad links before the fix, then passed after rebuild.
