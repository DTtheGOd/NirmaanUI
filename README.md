# Nirmaan UI

Nirmaan UI is a developer-focused React component library and learning hub.

## Problem Statement

Front-end developers often lack simple, reusable, beginner-friendly UI component libraries. Existing libraries are complex, heavy, or lack copy-paste JSX code with minimal setup.

## Solution

Nirmaan UI provides:

- Modern, minimal, prebuilt React components (buttons, dashboards, forms, charts, etc.)
- Copyable JSX code examples with live previews
- Built-in animations via Framer Motion
- Learning hub for React + UI/UX
- Community hub for sharing ideas, snippets, and challenges

## Tech Stack

**Frontend:** React, Vite, TailwindCSS, Framer Motion, React Router DOM, Axios, React Quill  
**Backend:** Node.js, Express.js, MongoDB (Atlas), Mongoose  
**Tools:** JWT, bcrypt, Cloudinary, validator, CORS, dotenv

## Monorepo Structure

```
NirmaanUI/
├── frontend/       (React Vite app)
├── backend/        (Express API)
├── .gitignore
└── README.md
```

## Setup

### 1. Clone or navigate to this project

```powershell
cd "c:\MINI PROJECT\NirmaanUI"
```

### 2. Frontend setup

```powershell
cd frontend
cp .env.example .env
# Edit .env with your values:
# VITE_API_BASE=http://localhost:5000/api
# VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

npm install
npm run dev
```

Frontend will run at http://localhost:5173

### 3. Backend setup

Open a new terminal:

```powershell
cd backend
cp .env.example .env
# Edit .env with your values:
# PORT=5000
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/nirmaanui
# JWT_SECRET=your_secret_key_here
# CLOUDINARY_CLOUD_NAME=your_cloud
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
# CLIENT_ORIGIN=http://localhost:5173

npm install
npm run dev
```

Backend will run at http://localhost:5000

### 4. Verify

- Visit http://localhost:5173 to see the app
- Login/Register flows connect to backend at /api/auth
- Component showcase displays prebuilt components

## Key Features

- **Interactive Component Showcase** — Live previews, animations, responsiveness
- **Component Detail Page** — Preview, copyable JSX, usage guide
- **Learning & Community Hub** — React roadmap + code-sharing forum
- **Contact & Contribution** — Feedback, GitHub contributions, feature requests

## Contributing

Open issues and feature requests on GitHub. Join the community page to share snippets.

---

Built with ❤️ using React, TailwindCSS, Framer Motion, and Express
