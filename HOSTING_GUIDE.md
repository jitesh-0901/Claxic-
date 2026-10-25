# 🚀 Claxic Platform - Complete Production Hosting Guide

Claxic is engineered as a unified, high-performance full-stack Node.js (v22+) application with embedded SQLite (`node:sqlite`) and React SPA. Because both the frontend and backend can be served from a single Node process, hosting is streamlined, lightning-fast, and cost-effective.

---

## ⚡ Quick Hosting Compatibility Summary

| Hosting Platform | Difficulty | Database & Uploads Persistence | Recommendation |
| :--- | :---: | :---: | :---: |
| **Render.com** | Easy (5 min) | ✅ Persistent Disk available | ⭐ **Top Pick (Cloud)** |
| **Railway.app** | Easy (3 min) | ✅ Persistent Volume available | ⭐ **Top Pick (Cloud)** |
| **Docker / VPS** (Ubuntu, DigitalOcean, AWS EC2, Linode) | Moderate | ✅ Local Host Volumes | ⭐ **Best for Enterprise / Full Control** |
| **PM2 (Linux VPS)** | Easy | ✅ Direct Local Disk | ⭐ **Fastest Native Performance** |
| **Vercel** (Frontend only) | Easy | ⚠️ Backend must be on Render/Railway/VPS | Split Hosting Setup |

---

## 🔑 Default Credentials (Seed Accounts)

After deployment, log in with any of these pre-configured accounts:

| Portal | Role | Email | Password |
| :--- | :--- | :--- | :--- |
| **Admin Portal** (`/admin/login`) | Super Administrator | `admin@claxic.edu` | `Admin@123456` |
| **Staff Portal** (`/staff/login`) | Course Instructor / Staff | `staff@claxic.edu` | `Staff@123456` |
| **Student Portal** (`/login`) | Enrolled Student | `student@claxic.edu` | `Student@123456` |

---

## 🌟 Option 1: Render.com (Recommended Free/Low Cost Cloud)

Render automatically builds your React frontend and runs your Node.js backend under a custom SSL domain.

### Step-by-Step Instructions:
1. Push your repository to **GitHub** or **GitLab**.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your repository.
4. Configure the service settings:
   - **Name:** `claxic-platform`
   - **Runtime:** `Node`
   - **Node Version:** Ensure `NODE_VERSION=22` (Render respects `"engines": { "node": ">=22.5.0" }` in `package.json`).
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node backend/server.js`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `SERVE_FRONTEND` = `true`
   - `PORT` = `10000` (Render binds to this automatically)
   - `VITE_GOOGLE_CLIENT_ID` = `3513448674-0tloutls2sk5f2l31lifdl9oq1qq2c95.apps.googleusercontent.com`
6. *(Optional but Recommended)* Add a **Persistent Disk** on Render:
   - Mount Path: `/app/backend/db`
   - Size: `1 GB`
7. Click **Create Web Service**. Render will deploy your app with free HTTPS!

---

## 🚂 Option 2: Railway.app (1-Click Deploy)

Railway provides instantaneous deployment with automatic Git triggers.

### Step-by-Step Instructions:
1. Push your code to GitHub.
2. Go to [Railway.app](https://railway.app/) and click **New Project** -> **Deploy from GitHub repo**.
3. Select your repository.
4. Railway will automatically detect `railway.json` and `package.json`.
5. Under **Variables**, add:
   - `NODE_ENV` = `production`
   - `SERVE_FRONTEND` = `true`
6. Under **Volumes**, add a Volume mounted to:
   - `/app/backend/db` (Keeps your database safe across redeploys)
   - `/app/uploads` (Keeps uploaded course videos safe)
7. Click **Generate Domain**. Your platform is live!

---

## 🐳 Option 3: Docker & Docker Compose (Any VPS / Cloud)

For AWS EC2, DigitalOcean Droplets, Linode, Hetzner, or home servers.

### 1. Build and Run using Docker Compose:
```bash
# Clone and enter directory
git clone <your-repo-url>
cd claxic

# Start container in detached background mode
docker compose up -d --build
```

### 2. Verify Container Health:
```bash
docker compose ps
docker compose logs -f claxic
```

The container automatically mounts:
- `./backend/db` -> Preserves SQLite database (`claxic.db`)
- `./uploads` -> Preserves uploaded course lesson videos

---

## 🐧 Option 4: Linux VPS with PM2 (Direct Node.js Native)

If you have an Ubuntu 22.04 / 24.04 server with Node.js 22+:

### 1. Install Node.js 22 & PM2:
```bash
# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

### 2. Deploy Application:
```bash
# Clone repository
git clone <your-repo-url> /var/www/claxic
cd /var/www/claxic

# Install dependencies and build frontend
npm install
npm run build:prod

# Run pre-flight self-hosting check
npm run check

# Launch with PM2 using bundled ecosystem config
pm2 start ecosystem.config.cjs --env production

# Ensure PM2 starts on server reboot
pm2 save
pm2 startup
```

### 3. Setup Nginx Reverse Proxy with SSL (Optional):
```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        client_max_body_size 500M;
    }
}
```
Install SSL in 1 command with Certbot:
```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 🧪 Pre-Flight Hosting Diagnostic

Before pointing public traffic to your server, run the built-in diagnostic tool:

```bash
npm run check
```

Expected output:
```
====================================================
       CLAXIC SELF-HOSTING DIAGNOSTIC AUDIT         
====================================================
[1] Node.js Runtime Version: v24.18.1
    ✓ Node version meets requirements (v22.5.0+ with built-in node:sqlite)
[2] Native SQLite Engine (node:sqlite): Available
    ✓ Native SQLite execution verified
[3] Database Directory: .../backend/db
    ✓ Database directory exists
    ✓ Database directory has read/write permissions
    ✓ Database file present
[4] Frontend Production Bundle: .../frontend/dist
    ✓ Frontend built distribution is present (ready for SERVE_FRONTEND=true)
[5] Target Port: 5000
====================================================
✅ SYSTEM CHECK PASSED: Claxic is 100% READY FOR HOSTING!
====================================================
```
