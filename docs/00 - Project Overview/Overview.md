# LunarChillSMP Website — Project Overview

> A website built to introduce LunarChillSMP, express its identity ("Chill thôi, đừng có vội."), and connect players with its community.
## 1. Project Summary

- **Project:** LunarChillSMP Official Website
    
- **Project type:** Minecraft server website
    
- **Target platforms:** Minecraft Java Edition and Bedrock Edition, including Pocket Edition devices
    
- **Deadline:** 2026-11-20
    
- **Current phase:** Brand & UI Design (Phase 02)
    
- **Tech stack:** HTML, CSS, JavaScript
    
- **Version control:** Git and GitHub Desktop
    
- **Hosting plan:** Vercel
    
- **Design tool:** Figma ([LunarChillSMP Website Prototype](https://www.figma.com/design/Hjdn5UhKT2D8ucSxTig4hy)) — In Progress (Phase 02)
## 2. Project Goals

The website should serve three main purposes:

1. **Server Discovery** — Help new players understand LunarChillSMP and decide whether to join.
    
2. **Information Portal** — Give new and existing players a convenient place to find server information, guides, rules, and relevant links.
    
3. **Brand Identity** — Establish a recognizable online identity that reflects the server's atmosphere and community.
## 3. Target Audience

### Primary audience

- Players discovering LunarChillSMP for the first time.
    
- Existing players looking for useful server information.
    
- Returning players who want to reconnect with the community.
### Design principles

- Easy to understand and navigate.
    
- Visually distinctive without sacrificing readability.
    
- Responsive across desktop and mobile devices.
    
- Useful to both prospective and existing players.
## 4. Creative Direction

### Core design pillars

- **Cinematic Minecraft** — Use immersive visuals and in-game environments to establish atmosphere.
    
- **Modern Minimalism** — Keep layouts intentional, clear, and uncluttered.
    
- **Community Storytelling** — Show the people, experiences, builds, and stories that make LunarChillSMP distinctive.
### Creative principle

The website should feel like LunarChillSMP, not a generic Minecraft server template.

Existing branding assets may be redesigned when doing so strengthens the overall identity.
## 5. Technical Direction

- Build with vanilla HTML, CSS, and JavaScript.
    
- Use GitHub for version control and collaboration.
    
- Use Vercel for deployment and preview builds.
    
- Investigate server status or player-count APIs only if they provide meaningful value.
    
- Review existing domain and DNS configuration before connecting the website to the server domain.
    
**Important:** Do not change shared DNS records without confirming their current purpose and dependencies.
## 6. Project Roadmap

|Phase|Planned dates|Main outcome|Status|
|---|---|---|---|
|01 — Research & Requirements|Oct 17–30|Research notes, requirements, sitemap, scope matrix|Hoàn thành (Đóng)|
|02 — Brand & UI Design|Oct 30–Nov 05|Brand guidelines, design system, UI direction, Figma prototype|Đang triển khai|
|03 — Development|Nov 06–Nov 14|Responsive website implementation, vanilla HTML/CSS/JS|Sắp tới|
|04 — QA & Review|Nov 15–Nov 18|Cross-browser testing, mobile audit, API edge-case verification|Dự kiến|
|05 — Release Candidate & Handover|Nov 19–Nov 20|Vercel deployment, final review and handover|Dự kiến|

Dates are adjusted to match actual project pace while strictly maintaining the final handover deadline: 2026-11-20.
## 7. Project Structure

- `01 - Research/` — [[Reference Analysis]], [[Audience & User Journey]], [[Requirements]], [[Scope]], [[Sitemap]].
    
- `02 - Design/` — [[Brand Guidelines]], [[Design System]], [[UI Direction]], Figma prototype.
    
- `03 - Development/` — [[Technical Plan]] and [[Acceptance Criteria]].
    
- `04 - Meeting Notes/` — Decisions, feedback, and meeting records.

## 8. Current Priorities

- Hoàn thiện các khung màn hình (Frames) trên Figma Prototype theo Design System (Homepage, Guide, Rules, Terms, Privacy).
    
- Thử nghiệm trực tiếp kích thước hiển thị logo thực tế trong prototype trên Desktop Header (thử nghiệm các mức 36px–44px cho Icon, 110px–120px cho Full Logo) để đảm bảo không bị thô/chiếm diện tích.
    
- Soạn thảo tài liệu [[Technical Plan]] và [[Acceptance Criteria]] trong thư mục `03 - Development` để chuẩn bị cho giai đoạn code.
    
- Thu thập hình ảnh in-game thực tế và xác nhận Discord invite link từ Ban Quản Trị server.

## 9. Key Decisions & Open Questions

### Decisions

- The project will use HTML, CSS, and JavaScript.
    
- The website will support both discovery and existing-player information needs.
    
- The creative direction combines cinematic Minecraft visuals, modern minimalism, and community storytelling ("Cosmic Sanctuary").
    
- Official brand asset `Lunar_Logo.png` confirmed as the central identity anchor (Floating voxel island, moon crest, waterfall glow palette).
    
- Vercel is the planned hosting platform.
    
- Research Phase v1.0 closed; new feature ideas are recorded in backlog v1.1+.


### Open questions

- What in-game screenshots are available from the server team for the Community Showcase gallery?
    
- What is the official Discord invite link to wire into the Primary CTA buttons?
    
- Who owns the domain, and what DNS configuration must be preserved?
    
- Has the server team enabled `enable-query=true` in `server.properties` for the conditional Player List feature?
    
- Which feedback and approval process will the server team use for the Figma Prototype?
## 10. Project Log

Use this section to record major decisions, completed milestones, and changes in scope.
### 2026-10-17

- Project planning started.
    
- Repository and Obsidian documentation structure prepared.
    
- Research and requirements phase initiated.

### 2026-10-30

- Research Phase v1.0 closed and approved: finalized `Requirements.md`, `Sitemap.md`, `Scope.md`, and `Audience & User Journey.md`.
    
- Transitioned to Phase 02 — Brand & UI Design.
    
- Integrated official brand asset `Lunar_Logo.png` into brand guidelines, design system tokens, and UI direction.
    
- Extracted official color palette directly from logo (Deep Abyss Black `#090914`, Waterfall Glow Blue `#688BF8`, Midnight Indigo `#0A0E2A`, Moonlight Silver `#E0EFFF`).
    
- Created Figma design file: `LunarChillSMP Website Prototype` (Key: `Hjdn5UhKT2D8ucSxTig4hy`).