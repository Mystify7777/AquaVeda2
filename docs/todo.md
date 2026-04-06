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

- [ ] Issue model
- [ ] Add issue
- [ ] Leaflet integration
- [ ] Map filters

## 🤝 PHASE 4 — COMMUNITY

- [ ] Comments system
- [ ] Discussion threads

## 🧠 PHASE 5 — AI ENGINE

- [ ] Rule-based recommendation engine
- [ ] API endpoint

## 📊 PHASE 6 — DASHBOARD

- [ ] User dashboard
- [ ] Admin dashboard

## 🏗️ PHASE 7 — PROJECTS

- [ ] Project model
- [ ] Join or leave project
- [ ] Progress tracking

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

- [ ] Issue model (location, severity, images, status, owner)
- [ ] Add issue endpoint with validation
- [ ] List/filter issues endpoint (region, severity, status)
- [ ] Leaflet map view with markers and filters

Exit criteria:

- [ ] Authenticated user can report an issue with coordinates
- [ ] Map renders issues and supports basic filters

### Sprint 4 - Community + AI v1

Goal: bring collaboration and first recommendation value.

- [ ] Comments on articles/issues
- [ ] Thread replies (single depth initially)
- [ ] Rule-based recommendation service
- [ ] Recommendation endpoint by issue/article context

Exit criteria:

- [ ] Users can discuss content via comments
- [ ] Recommendation API returns deterministic suggestions from rule set

### Sprint 5 - Dashboards + Projects + Quality

Goal: complete impact loops and harden for release.

- [ ] User dashboard metrics
- [ ] Admin dashboard analytics
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
