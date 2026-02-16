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

## 🖼️ Application Screenshots

### View Users

<img src="https://github.com/user-attachments/assets/77cefaf9-62fc-47ec-993e-ae9e08be812c" width="100%" />

---

### Add User

<img src="https://github.com/user-attachments/assets/7129075e-ba4b-45af-a4d4-cf1f2cde30fa" width="60%" />

---

### Edit User

<img src="https://github.com/user-attachments/assets/aee72f5d-64bc-4c35-a41a-84e99c30398f" width="60%" />

---

### Remove Users

<img src="https://github.com/user-attachments/assets/3320deff-b6b5-4d9a-9832-d84c3647b6cd" width="100%" />




---

Thanks
