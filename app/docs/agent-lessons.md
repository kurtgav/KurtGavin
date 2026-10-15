# Agent lessons

## 2026-10-15 — Mobile navigation focus
- Trigger: Review found forward Tab skipped the newly opened mobile navigation.
- Root cause: Navigation precedes its disclosure toggle in DOM order; opening did not move focus.
- Remedy: Focus the first navigation link after opening. Escape closes the navigation and restores focus to the toggle.
- Verification: Browser at 390 px: Enter on Open navigation focused Work; Escape set aria-expanded=false and focused menu-toggle; selecting About navigated to /about/.
- Prevention/scope: Recheck Enter, Tab, Escape and link activation after changes to app/src/components/portfolio/Header.tsx. Visual order alone does not establish keyboard order.
