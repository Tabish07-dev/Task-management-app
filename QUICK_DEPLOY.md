# 🚀 Quick Deployment Guide

This guide walks you through deploying TaskFlow to Vercel (frontend) and Render (backend).

---

## **Part 1: Deploy Backend to Render (5 minutes)**

### Step 1: Create a Render account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)

### Step 2: Create a new Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository: `Tabish07-dev/Task-management-app`
3. Give it a name, e.g., `taskflow-backend`
4. Set **Build Command**:
   ```
   cd server && npm install
   ```
5. Set **Start Command**:
   ```
   cd server && npm start
   ```
6. Set **Root Directory** to `.` (default is fine)

### Step 3: Add Environment Variables
In Render dashboard, go to **Environment** and add:

| Key | Value | Notes |
|-----|-------|-------|
| `PORT` | `5000` | Keep as is |
| `NODE_ENV` | `production` | Important for production |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `<generate-a-long-random-string>` | Use a strong secret, NOT the default |
| `ALLOWED_ORIGINS` | `https://<your-vercel-domain>.vercel.app` | You'll add this after deploying frontend |
| `LOG_LEVEL` | `info` | Keep as is |

**Get your backend URL** (e.g., `https://taskflow-backend.onrender.com`) — save this!

---

## **Part 2: Deploy Frontend to Vercel (5 minutes)**

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New...** → **Project**
3. Import from Git: `Tabish07-dev/Task-management-app`

### Step 2: Configure Build Settings
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (should auto-detect)
- **Output Directory**: `.next` (should auto-detect)
- **Root Directory**: `client` ← **IMPORTANT!**

### Step 3: Add Environment Variable
In Vercel **Settings → Environment Variables**, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://taskflow-backend.onrender.com/api` |

(Replace with your actual Render backend URL)

### Step 4: Deploy
Click **Deploy** and wait for the build to complete.

---

## **Part 3: Update Render ALLOWED_ORIGINS (2 minutes)**

Once your Vercel frontend is live:

1. Get your Vercel URL (e.g., `https://taskflow-client.vercel.app`)
2. Go back to Render dashboard → **taskflow-backend** service
3. Update **ALLOWED_ORIGINS** to include your Vercel domain:
   ```
   https://taskflow-client.vercel.app
   ```
4. Click **Save** (auto-redeploys)

---

## **Testing Your Deployment**

1. Open your Vercel frontend URL
2. Try to **Register** with a new email
3. If you see a success message (not "Registration failed"), you're done! ✅

### If registration still fails:
- Open DevTools → **Network** tab
- Try registering again
- Look for the failed request to `/api/auth/register`
- Check the **Response** tab for error details
- Common issues:
  - ALLOWED_ORIGINS doesn't include your Vercel domain
  - MONGO_URI is invalid
  - Backend service is still building (check Render logs)

---

## **Environment Variables Checklist**

### Backend (Render)
- [ ] `MONGO_URI` set to valid MongoDB connection string
- [ ] `JWT_SECRET` set to a strong random string (not default)
- [ ] `ALLOWED_ORIGINS` includes your Vercel frontend URL
- [ ] `NODE_ENV` set to `production`

### Frontend (Vercel)
- [ ] `NEXT_PUBLIC_API_URL` set to your Render backend URL + `/api`
- [ ] Project Root set to `client` folder

---

## **Troubleshooting**

| Issue | Solution |
|-------|----------|
| "Registration failed" on frontend | Check that `NEXT_PUBLIC_API_URL` is set in Vercel and matches your backend URL |
| 404 on frontend | Check Vercel **Project Root** is set to `client` |
| Backend won't start | Check Render logs: `npm start` might be failing due to missing MONGO_URI or JWT_SECRET |
| CORS error in browser console | Add your Vercel domain to `ALLOWED_ORIGINS` in Render |
| Database connection error | Verify MongoDB Atlas connection string is correct in `MONGO_URI` |

---

## **Next Steps**

- Add a custom domain (optional)
- Set up CI/CD so deploys happen automatically when you push to GitHub
- Monitor logs in Render and Vercel dashboards

**Questions?** Check the main `README.md` for more details.
