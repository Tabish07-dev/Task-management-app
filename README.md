# TaskFlow - Modern Task Management SaaS

TaskFlow is a polished full-stack task management application built with Next.js, Express, MongoDB, and Tailwind CSS. It is designed to feel like a real SaaS product with authentication, a premium dashboard, smooth animations, and a professional UI for portfolios and recruiter demos.

## ✨ Highlights

- Modern and clean UI with a premium SaaS-style look
- Secure authentication flow for login and registration
- Protected dashboard experience
- Task management with add, edit, complete, delete, search, and filter
- Responsive layout for desktop and mobile
- Dark mode and light mode support
- Toast notifications and loading states for a polished experience
- Production-ready backend improvements including validation, rate limiting, and security headers

## 🔗 GitHub Repository

- Repository: https://github.com/Tabish07-dev/Task-management-app.git
- Default branch: main
- Clone from main branch:

```bash
git clone -b main https://github.com/Tabish07-dev/Task-management-app.git
cd task-management-app
```

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- Helmet
- CORS
- express-validator
- express-rate-limit

## 📁 Project Structure

```text
task-management-app/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/            # Pages and layouts
│   │   ├── components/     # Reusable UI and providers
│   │   ├── lib/            # Axios and utilities
│   │   └── services/       # API service layer
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── app.js          # Main app setup
│   │   ├── server.js       # Server entry point
│   │   ├── config/         # DB config
│   │   ├── controllers/    # Auth controllers
│   │   ├── middleware/     # Auth middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── validations/    # Request validation
│   └── package.json
│
└── README.md
```

## 🚀 Features

### Authentication
- User registration with validation
- Secure login with JWT
- Protected routes for authenticated users
- Logout flow

### Dashboard
- Task creation
- Task editing
- Task completion toggle
- Delete confirmation modal
- Search and filter options
- Priority badges
- Category labels
- Empty state for no tasks
- Animated statistics cards

### UX / UI
- Premium dark and light theme
- Responsive layout for mobile and desktop
- Loading skeletons and spinners
- Smooth transitions and hover effects
- Toast notifications

## ✅ Production Readiness Improvements

This project includes several improvements that make it feel closer to a real deployment-ready product:

- Security headers using Helmet
- CORS configuration for frontend integration
- Rate limiting for login/register endpoints
- Input validation for auth requests
- Error handling with friendly error pages
- Protected frontend routes
- Environment-based configuration
- Health check endpoint for backend monitoring

## ▶️ Getting Started

### Prerequisites
- Node.js 18 or higher
- npm
- MongoDB database (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Tabish07-dev/Task-management-app.git
cd task-management-app
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a .env file in the server folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

Run the backend:

```bash
npm start
```

### 3. Setup the frontend

```bash
cd ../client
npm install
```

Create a .env.local file in the client folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Open:
- Frontend: http://localhost:3000 or 3001
- Backend: http://localhost:5000

## 🔐 API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

### Health
- GET /health

## 🧪 Example Authentication Flow

Register a new user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tabish Ali",
    "email": "tabish@example.com",
    "password": "SecurePass123!"
  }'
```

## 📱 Responsive Design

The app is built with a mobile-first approach and includes:
- responsive cards and grids
- stackable layouts on smaller screens
- touch-friendly buttons
- clean spacing and readable typography

## 🌐 Deployment Notes

This project is structured to be deployed easily on platforms like:
- Vercel for the frontend
- Render, Railway, or Heroku for the backend
- MongoDB Atlas for the database

### Vercel (frontend) — Quick setup

- When adding this repository to Vercel, set the **Project Root** to `client` so Vercel builds the Next.js app there.
- Add an environment variable `NEXT_PUBLIC_API_URL` with your backend URL (for example: `https://my-backend.example.com/api`).
- If your backend is deployed on a different host, make sure `ALLOWED_ORIGINS` on the server includes your Vercel domain.
- A `vercel.json` file has been added to the repo to help Vercel detect the `client` build (see `vercel.json`).

If you still see a 404 page on Vercel after these settings, re-deploy from the Vercel dashboard and confirm the `Project Root` is `client`.

## 🧠 Why This Project Stands Out

This project is not just a simple task app. It demonstrates:
- full-stack development skills
- modern frontend architecture
- backend security awareness
- clean UI/UX thinking
- portfolio-ready design and implementation

## 👨‍💻 Author

Built by Tabish Ali

## 📌 Note

If you want, I can next help you with:
- a GitHub-ready screenshot section
- a live demo link
- deployment setup for Vercel + Render
- adding real task persistence to the database
