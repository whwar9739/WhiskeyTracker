# Phased Development Plan: Whiskey Tracker Web Application (2025)

This document outlines a phased approach to developing the Whiskey Tracker web application using .NET Core, Angular, PostgreSQL, Docker, and Nginx. The plan prioritizes core functionality first, then builds up to advanced features and polish.

## Phase 1: Core Whiskey Logging & User Foundation (MVP)

**Goal:** Enable users to create accounts, log whiskies, and view their entries quickly.

**Key Features:**
- **User Authentication:**
  - Register, login, password reset (Standard User role initially)
  - JWT-based authentication
- **Whiskey Entry (Basic):**
  - Add new whiskey (Distillery, Name, Region, Age Statement, ABV)
  - Bottle image upload
- **Tasting Notes:**
  - Rich text field for notes (aroma, palate, finish, overall)
- **Rating:**
  - 1-5 star rating system
  - Visual display of ratings
- **Whiskey Detail View:**
  - Page showing all whiskey info, bottle image, tasting notes
- **Basic List & View:**
  - List all logged whiskies
- **Non-Functional:**
  - Performance, security, usability, maintainability
- **Design:**
  - Clean, modern, mobile-friendly UI
  - Intuitive image upload

## Phase 2: Enhanced Data Management & Organization

**Goal:** Expand core features for better collection management and organization.

**Key Features:**
- **Whiskey Entry (Extended):**
  - Add fields: Bottling Date, Cask Type, Purchase Date, Price, Where Purchased, Bottle Status
  - Edit/delete whiskey entries
- **Inventory Management:**
  - Add whiskies to inventory, specify quantity, mark as consumed, view inventory
- **Tags/Categories:**
  - Custom tags, predefined categories (country, region, whiskey type)
- **Search & Filtering:**
  - Search by distillery, name, region, tags
  - Filters for country, region, category
- **Whiskey Database & Data Management:**
  - Custom whiskey entries
  - Foundation for central whiskey database
  - Admin role for user management
- **Non-Functional:**
  - Scalability
- **Design:**
  - UI for inventory and expanded entry fields

## Phase 3: Advanced Features & Collaboration

**Goal:** Add advanced features and support for group collaboration.

**Key Features:**
- **Tasting Sessions:**
  - Log and manage tasting events
  - Associate tastings with inventory
  - Record order of tastings
- **Infinity Bottle Management:**
  - Create/manage infinity bottles, track contents
- **Statistics & Insights:**
  - Personalized dashboards, summaries
- **Group Collaboration:**
  - Shared collections, group tastings
- **Notifications & Reminders:**
  - Email or in-app notifications
- **Non-Functional:**
  - High availability, backup, disaster recovery
- **Design:**
  - Collaborative UI, dashboard views

## Containerization & Deployment
- All services (backend, frontend, database, Nginx) run in Docker containers
- Portainer for management
- Docker Compose for orchestration
- Nginx for reverse proxy and SSL

---

**Note:** All implementation uses .NET Core Web API, Angular, PostgreSQL, Docker, and Nginx. The plan is designed for maintainability, scalability, and self-hosting on Raspberry Pi.
