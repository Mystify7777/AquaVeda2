# Aquaveda TODO

## 🔥 PHASE 1 — FOUNDATION

- [x] Backend setup
- [x] Frontend setup
- [x] Auth system
- [x] Role system (middleware)

## 🌊 PHASE 2 — WIKI SYSTEM

- [x] Article model
- [x] Create or edit article
- [x] Approval system
- [x] Expert verification
- [x] Ownership checks
- [x] User article view

## 🌍 PHASE 3 — GEO ISSUES

- [x] Issue model
- [x] Add issue
- [x] Geo queries (nearby)
- [x] Leaflet integration
- [x] Map filters

## 🤝 PHASE 4 — COMMUNITY

- [x] Comments system
- [x] Discussion threads

## 🧠 PHASE 5 — AI ENGINE

- [x] Rule-based recommendation engine
- [x] API endpoint

## 📊 PHASE 6 — DASHBOARD

- [x] User dashboard
- [x] Admin dashboard

## 🏗️ PHASE 7 — PROJECTS

- [x] Project model
- [x] Join project
- [x] Progress tracking (basic)

## 🎮 PHASE 8 — ENGAGEMENT

- [ ] XP system
- [ ] Contribution score
- [ ] Badges

---

## 🧪 FINAL

- [ ] Testing
- [ ] Deployment
- [ ] Documentation updates

---

## 🔐 PHASE 1.5 — HARDENING

- [x] Zod-based centralized validation middleware
- [x] Reusable pagination helper and paginated list endpoints
- [x] Global and auth-specific rate limiting
- [x] CORS tightening using env-driven ALLOWED_ORIGINS
- [x] Safety checks for geo numeric parsing and progress bounds

---

## Execution Plan (April 2026)

### Sprint 1 (Current) - Access + Data Foundations

Goal: unlock secure user flows and stable data models so feature work can proceed safely.

- [ ] Auth API (register, login, me, logout)
- [x] Auth API (register, login)
- [x] Auth API (me)
- [ ] Auth API (logout)
- [x] JWT middleware + protected route guard
- [x] Role middleware (USER, EXPERT, ADMIN)
- [ ] User model with role and profile basics
- [x] Shared API response + error shape
- [x] Seed script for admin and expert test users
- [x] Request validation middleware (phase 1.5)
- [x] Pagination standardization (phase 1.5)
- [x] Rate limiting (phase 1.5)
- [x] CORS hardening with ALLOWED_ORIGINS (phase 1.5)

Exit criteria:

- [ ] User can sign up and log in from client
- [ ] Protected endpoint blocks unauthenticated requests
- [ ] Role-restricted endpoint blocks wrong role
- [ ] Postman collection (or equivalent) covers auth happy-path and failures

### Sprint 2 - Wiki MVP

Goal: ship first useful knowledge workflow with moderation hooks.

- [ ] Article model (title, body, tags, region, status, author)
- [x] Create draft article endpoint
- [x] Edit draft article endpoint
- [ ] Submit for review endpoint
- [x] Approve endpoint (EXPERT/ADMIN)
- [x] Reject endpoint (EXPERT/ADMIN)
- [ ] Client pages for article list, detail, create/edit
- [x] User article view endpoint (/mine)

Exit criteria:

- [x] USER can create and edit own draft
- [x] EXPERT/ADMIN can approve or reject
- [x] Only approved articles appear publicly

### Sprint 3 - Geo Issues MVP

Goal: enable issue reporting and map visualization.

- [x] Issue model (location, severity, images, status, owner)
- [x] Add issue endpoint with validation
- [x] List issues endpoint
- [x] Filter issues endpoint (region, severity, status)
- [x] Leaflet map view with markers and filters

Exit criteria:

- [x] Authenticated user can report an issue with coordinates
- [x] Map renders issues and supports basic filters

### Sprint 4 - Community + AI v1

Goal: bring collaboration and first recommendation value.

- [x] Comments on articles/issues
- [x] Thread replies (single depth initially)
- [x] Rule-based recommendation service
- [x] Recommendation endpoint by issue/article context

Exit criteria:

- [x] Users can discuss content via comments
- [x] Recommendation API returns deterministic suggestions from rule set

### Sprint 5 - Dashboards + Projects + Quality

Goal: complete impact loops and harden for release.

- [x] User dashboard metrics
- [x] Admin dashboard analytics
- [ ] Project model + join/leave + progress updates
- [ ] XP/badges basics tied to contributions
- [ ] API and UI tests for critical paths
- [ ] Deployment checklist and environment docs

Exit criteria:

- [ ] Core flows covered by tests
- [ ] Staging deployment passes smoke checks
- [ ] Docs updated for onboarding and runbooks

## Immediate Build Order

1. Auth and role middleware
2. User model + seed data
3. API standards (errors/responses/validation)
4. Wiki model and endpoints
5. Geo issue model and endpoints
6. Frontend integration for auth, wiki, and map

## Risks to Track

- Scope creep across phases without sprint cut-lines
- Missing validation and auth checks causing rework
- Map UX complexity (cluster/filter performance)
- Documentation drift if logs/context are not updated per feature

---

## Deferred Later (Not In Current Scope)

- [ ] Hybrid AI layer: keep rule-based engine as primary and add optional Gemini-powered contextual suggestions
- [ ] Add endpoint design for smart recommendations: ruleBased + aiGenerated response contract
- [ ] Trigger policy: call LLM only on explicit user action (never on every issue fetch)
- [ ] Add safeguards before rollout: rate limiting, caching, fallback behavior when LLM is unavailable

---

## Product-First Roadmap (Active)

### Phase A — UX & Interaction

- [x] IA shell with clear top-level routes: Explore, Learn, Act, Community, Dashboard
- [x] Shared top navigation and app layout shell
- [x] Auth UI flow started: login/register pages wired and dashboard route protected
- [ ] Map-first detail panel redesign (desktop side panel and mobile bottom sheet)
- [ ] Unified loading, empty, and error states across all top-level views
- [ ] Visual system baseline pass (severity tokens, spacing scale, cards and interactions)

### Phase B — Feature Depth

- [ ] Issue confirmations or affected-too workflow
- [ ] Issue status history timeline
- [ ] Project milestones
- [ ] Project progress update log
- [ ] Dashboard impact counters tied to lifecycle outputs

### Phase C — Intelligence & Trust

- [ ] Reputation scoring rules linked to meaningful actions
- [ ] Moderation queue with report and resolution actions
- [ ] Comment helpful sorting and basic mentions
- [ ] Context-aware AI inputs (issue state, region, trust signals) while keeping deterministic rule-first behavior
