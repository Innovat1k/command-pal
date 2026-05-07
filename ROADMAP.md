# CmdPal — Development Roadmap

## 📅 Week 1: Core Delivery (Days 1–7)

### Day 1 — Foundation & Engine
- [X] Vite + React + TypeScript (Strict Mode) setup
- [X] TailwindCSS configuration
- [X] Define `CommandAction` & `CommandState` types
- [x] Build `useCommandEngine` hook (state, global key listeners, basic filter)
- [X] Create base components (`Overlay`, `Input`, `List`)
- **✅ Deliverable**: Overlay toggles via `Ctrl/Cmd+K`, input filters list instantly

### Day 2 — Focus Trap & Keyboard Navigation
- [ ] Implement `useFocusTrap` (custom, zero dependencies)
- [ ] Enable `↑` / `↓` navigation with index cycling
- [ ] `Enter` triggers action execution + closes overlay
- [ ] `Tab` / `Shift+Tab` locked inside overlay
- [ ] Focus restoration on close (returns to trigger element)
- **✅ Deliverable**: 100% keyboard-operable navigation & focus management

### Day 3 — Animations & UX Polish
- [ ] CSS transitions (fade + scale) for overlay open/close
- [ ] Active item highlight + hover states
- [ ] Keyboard shortcut hints display
- [ ] Empty state handling ("No results found")
- [ ] Action execution feedback (toast/console)
- **✅ Deliverable**: Fluid, responsive UI with clear visual feedback

### Day 4 — Accessibility (A11y)
- [ ] ARIA roles: `dialog`, `listbox`, `option`, `search`
- [ ] `aria-modal="true"`, `aria-activedescendant`, `aria-selected`
- [ ] Verify color contrast ≥ 4.5:1
- [ ] Respect `prefers-reduced-motion`
- [ ] Test with NVDA / VoiceOver
- **✅ Deliverable**: Lighthouse Accessibility score = 100

### Day 5 — Functional Actions
- [ ] Implement 10–15 real demo actions (theme toggle, copy URL, navigate, etc.)
- [ ] Categorize actions (Navigation, Action, Settings)
- [ ] Display shortcut hints dynamically
- [ ] Optional: Lightweight toast notifications
- **✅ Deliverable**: Fully interactive demo with real browser APIs

### Day 6 — Responsive & Mobile Fallback
- [ ] Desktop: Centered overlay, `max-w-lg`
- [ ] Tablet: Adaptive padding & width
- [ ] Mobile: Full-screen overlay + floating trigger button
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- **✅ Deliverable**: Works gracefully on all viewports & input types

### Day 7 — Performance, Docs & Deploy
- [ ] Lighthouse audit (Target: Performance ≥ 95, A11y = 100)
- [ ] Finalize README & roadmap
- [ ] Record 30s demo video
- [ ] Deploy to Vercel
- [ ] Final code review & cleanup
- **✅ Deliverable**: Live production URL + complete documentation

---

##  Post-Launch (v2)

### Feature Extensions
- [ ] Fuzzy search integration (Fuse.js)
- [ ] User-customizable shortcuts (persisted in localStorage)
- [ ] Hierarchical sub-commands
- [ ] Theme & layout customization

### Freelance Packaging
- [ ] Extract as reusable component: `<CmdPal actions={...} />`
- [ ] Write integration guide & API docs
- [ ] Prepare client-facing README template
- [ ] Define freelance module pricing & scope

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| Bundle Size (gzipped) | < 15kb |
| TypeScript Strictness | `0` `any` |
| External Dependencies | `0` (core logic) |
| Delivery Time | ≤ 7 days |
| Contract/Freelance Readiness | ✅ Reusable, documented, live demo |