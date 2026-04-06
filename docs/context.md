# Aquaveda Context

## Product Definition

Aquaveda is a geo-intelligent water conservation platform combining knowledge sharing, AI recommendations, and community collaboration.

---

## Core Pillars

1. Knowledge (Wiki)
2. Geo Intelligence (Maps + Issues)
3. Community (Discussions)
4. AI Recommendations
5. Impact (Projects)

---

## Modules

### Auth

- JWT-based authentication
- Roles: USER, EXPERT, ADMIN

### Wiki System

- Articles with verification system
- Region-based tagging
- Expert validation

### Water Issues

- Geo-tagged issues
- Severity classification
- Image + description support

### Community

- Comments and discussions
- Linked to issues and articles

### AI Engine

- Rule-based recommendations
- Upgrade-ready for ML

### Projects

- Collaborative real-world solutions
- Contribution tracking

### Dashboard

- User activity
- Issue analytics
- Regional insights

## Implementation Status

- Phase 1 foundation started
- Backend bootstrap added with health route and DB connector
- Frontend bootstrap added with Vite shell and basic routes
- Env example files added for server, client, and AI service
- Server runtime validated with local MongoDB URI and successful connection
- Auth foundation started: user model added, register and login endpoints live under /api/v1/auth
- Access control hardened with JWT verification, role guards, and protected me endpoint
- Seed system added for baseline ADMIN and EXPERT users
- Shared API response contract introduced with centralized error and not-found shapes
- Wiki module started with article model, protected creation, expert approval, and approved-only public listing
- Wiki moderation lifecycle completed with author-only draft edits, expert or admin reject flow, and per-user article listing

---

## Architecture

Frontend -> Backend -> DB -> AI Layer -> Map Layer

---

## Design Philosophy

- Modular architecture
- Upgrade-ready systems
- Documentation-first development
- Real-world impact focus

---

## Feature Transfer Checklist (from CyberShield)

### Adopted for Phase 1

- Backend auth and RBAC skeleton
- Middleware layering for JWT and role protection
- Env-driven configuration and example env workflow
- Documentation-first flow using context, todo, logs, and bugs

### Planned to Adopt Next

- Frontend route and layout shell
- Centralized API service wrapper
- Input sanitization helpers and global security middleware layering
- Error boundary and API error middleware alignment

### Explicitly Not Transferred

- Phishing game and cyber-threat specific product logic
- CyberShield report, meme, and video moderation domain workflows
- Wallet or coin economy rules unless Aquaveda later enables gamification

---

## Non-Goals (for now)

- Real-time IoT integration
- Blockchain
- Paid monetization
