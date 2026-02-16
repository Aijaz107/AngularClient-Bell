# AngularClient-Bell

A small Angular CRUD client for managing users 

## Features

- List, create, update, and delete users
- Simple, responsive UI built with Angular components
- Client-side form validation and basic error handling

## Quick Start (Run locally)

Prerequisites: Node.js (16+ recommended), npm, and (optionally) Angular CLI.

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
ng serve --open
```

The app will be available at http://localhost:4200/ by default.

3. Run unit tests

```bash
ng test --watch=false
```

4. Build for production

```bash
ng build --configuration production
```

## Configuration & Key Files

- API/backend: The client expects a REST API (adjust base URL in `src/app/app.config.ts`).
- Models: `src/app/model/user.model.ts`
- Services: `src/app/services/user.service.ts`
- Routes and main app config: `src/app/app.routes.ts`, `src/app/app.config.ts`

## Additional Notes

- This repository contains only the frontend client. Provide or run a matching backend that exposes the necessary user endpoints (GET/POST/PUT/DELETE).
- Adjust ports and API base URL in `src/app/app.config.ts` if needed.

## UI Screenshots

Add screenshots to the `public/screenshots/` folder and include them below. Example:

![Home screen](public/screenshots/home.png)

(Replace the above image paths with your screenshots.)

---

If you'd like, I can also add sample screenshots, CI/test badges, or a minimal contribution section.
