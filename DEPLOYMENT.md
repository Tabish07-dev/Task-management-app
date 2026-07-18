# Deployment Guide - TaskFlow

## Overview
This guide covers deploying TaskFlow to production using popular hosting platforms.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Next.js)                     │
│              Hosted on Vercel / Netlify                 │
└────────────────────┬────────────────────────────────────┘
                     │ API Calls
                     ↓
┌─────────────────────────────────────────────────────────┐
│              Backend (Express.js)                       │
│          Hosted on Render / Railway / Heroku            │
└────────────────────┬────────────────────────────────────┘
                     │ Database Connection
                     ↓
┌─────────────────────────────────────────────────────────┐
│            MongoDB Atlas (Cloud Database)               │
└─────────────────────────────────────────────────────────┘
```

## Step 1: Prepare Backend

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/taskflow`
5. Whitelist your server IP (or allow all: 0.0.0.0/0)

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/taskflow
JWT_SECRET=generate-a-very-long-random-string-here-min-32-chars
ALLOWED_ORIGINS=https://yourfrontend.com
LOG_LEVEL=info
```

## Step 2: Deploy Backend

### Option A: Render.com (Recommended for Beginners)

1. Sign up at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: taskflow-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Region**: Choose closest to users
5. Add Environment Variables:
   - Paste all variables from `.env`
6. Click "Deploy"
7. Note the URL (e.g., `https://taskflow-api.onrender.com`)

### Option B: Railway.app

1. Sign up at [railway.app](https://railway.app)
2. Create new project → GitHub repository
3. Select `server` as the root directory
4. Add environment variables
5. Railway will auto-detect and deploy
6. Get the URL from the railway dashboard

### Option C: Heroku

1. Sign up at [heroku.com](https://heroku.com)
2. Install Heroku CLI
3. Run:
```bash
heroku login
heroku create taskflow-api
git push heroku main  # or your branch
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
```

## Step 3: Deploy Frontend

### Option A: Vercel (Recommended)

1. Sign up at [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `client`
   - **Framework**: Next.js
5. Add Environment Variable:
   - `NEXT_PUBLIC_API_URL=https://taskflow-api.onrender.com` (or your backend URL)
6. Click "Deploy"
7. Your site is live!

### Option B: Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub repository
4. Build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Add environment variables
6. Deploy

### Option C: GitHub Pages

```bash
# Build the frontend
cd client
npm run build
npm run export

# Push to gh-pages branch
git subtree push --prefix .next origin gh-pages
```

## Step 4: Configure CORS

After deployment, update backend `.env`:

```env
ALLOWED_ORIGINS=https://yourfrontend.com,https://www.yourfrontend.com
```

Redeploy the backend.

## Step 5: Verify Deployment

### Test Health Check
```bash
curl https://taskflow-api.onrender.com/health
```

Response:
```json
{"status":"ok","timestamp":"..."}
```

### Test API
```bash
curl -X POST https://taskflow-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!@"
  }'
```

### Test Frontend
Visit your Vercel/Netlify URL and test:
- Home page loads
- Register functionality
- Login functionality
- Dashboard access
- Dark mode toggle

## Monitoring & Logging

### Backend Monitoring
- Render: Built-in dashboard
- Railway: Real-time logs
- Heroku: `heroku logs --tail`

### Frontend Monitoring
- Vercel: Analytics dashboard
- Netlify: Real-time logs

### Set Up Error Tracking (Optional)
1. **Sentry**: [sentry.io](https://sentry.io)
   ```javascript
   // In your backend
   const Sentry = require("@sentry/node");
   Sentry.init({ dsn: "your-sentry-dsn" });
   ```

## Scaling & Performance

### Database Optimization
```javascript
// Add indexes to User model
userSchema.index({ email: 1 });  // For login queries
```

### Caching (Future)
```javascript
// Add Redis for session caching
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
```

### CDN for Frontend
Both Vercel and Netlify include automatic CDN distribution.

## Security Checklist

- [x] Use HTTPS (automatically with Vercel/Render)
- [x] Strong JWT_SECRET (32+ characters)
- [x] Rate limiting enabled
- [x] CORS properly configured
- [x] Helmet.js active
- [x] Environment variables not in code
- [x] Error messages don't expose sensitive info
- [ ] Enable HTTPS enforcing
- [ ] Set up monitoring/alerts
- [ ] Regular security audits
- [ ] Backup strategy for MongoDB
- [ ] DDoS protection (Cloudflare)

## Troubleshooting

### Backend won't connect to MongoDB
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check network connectivity from hosting provider

### CORS errors
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Restart backend after changing
- Check browser console for exact error

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS headers in backend response

### Stuck on login page
- Check health endpoint: `https://backend.com/health`
- Check browser DevTools → Network tab
- Verify API URL environment variable

## Production Checklist

Before going live:
- [ ] Test all auth flows
- [ ] Test task creation/deletion
- [ ] Test on mobile
- [ ] Test dark mode
- [ ] Verify email notifications work
- [ ] Check error pages display
- [ ] Test with slow internet (throttle in DevTools)
- [ ] Get SSL certificate (automatic with Vercel/Render)
- [ ] Set up automated backups
- [ ] Document deployment procedure
- [ ] Create runbook for common issues
- [ ] Set up monitoring/alerts

## Cost Estimates

| Service | Free Tier | Pro | Notes |
|---------|-----------|-----|-------|
| Vercel | ✅ Yes | $20/mo | Frontend hosting |
| Render | ✅ Yes | $7/mo | Backend hosting |
| MongoDB Atlas | ✅ 512MB | $57/mo | Database |
| **Total** | **FREE** | **~$77/mo** | Fully functional |

## Next Steps

1. Deploy backend first
2. Deploy frontend second
3. Test end-to-end
4. Monitor logs for errors
5. Scale as needed
6. Add new features

---

For help: Check the README.md and PRODUCTION_AUDIT.md files.
