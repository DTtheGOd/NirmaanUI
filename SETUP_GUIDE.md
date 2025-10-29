# 🔐 Backend Setup Guide for Nirmaan UI

## 📋 Required API Keys & Where to Get Them

### 1. **MongoDB URI** (REQUIRED) ⭐

**Option A: MongoDB Atlas (Cloud - FREE)**

1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Click "Create a New Cluster" → Choose "M0 FREE" tier
4. Choose a cloud provider (AWS/Google/Azure) and region
5. Click "Create Cluster" (takes 3-5 minutes)
6. Once ready:
   - Click "Connect" button
   - Choose "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
7. Replace `<password>` with your database user password
8. Add database name: Replace `/?retryWrites` with `/nirmaanui?retryWrites`

**Final format:**

```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/nirmaanui?retryWrites=true&w=majority
```

**Option B: Local MongoDB**

```
mongodb://localhost:27017/nirmaanui
```

(Requires MongoDB installed locally - NOT RECOMMENDED for beginners)

---

### 2. **JWT_SECRET** (REQUIRED) ⭐

This is a random secret string for encrypting authentication tokens.

**Generate one now:**

**PowerShell command:**

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Or use any random string (32+ characters):**

```
my_super_secret_jwt_key_12345_change_this_in_production
```

---

### 3. **Cloudinary** (OPTIONAL - for image uploads)

**Skip this for now.** Only needed if you want to upload component preview images.

If you want it later:

1. Visit: https://cloudinary.com/users/register_free
2. Sign up free
3. Dashboard → Copy:
   - Cloud Name
   - API Key
   - API Secret

---

## 🔧 How to Configure `.env` Files

### Backend `.env` Location:

`c:\MINI PROJECT\NirmaanUI\backend\.env`

```env
PORT=5000
MONGO_URI=<PASTE_YOUR_MONGODB_URI_HERE>
JWT_SECRET=<PASTE_YOUR_JWT_SECRET_HERE>
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_ORIGIN=http://localhost:5174
NODE_ENV=development
```

### Frontend `.env` Location:

`c:\MINI PROJECT\NirmaanUI\frontend\.env`

```env
VITE_API_BASE=http://localhost:5000/api
VITE_CLOUDINARY_CLOUD_NAME=
```

---

## 🚀 Quick Start Commands

### Terminal 1 - Backend:

```powershell
cd "c:\MINI PROJECT\NirmaanUI\backend"
npm run dev
```

### Terminal 2 - Frontend:

```powershell
cd "c:\MINI PROJECT\NirmaanUI\frontend"
npm run dev
```

---

## ✅ Expected Flow

1. **Visit:** http://localhost:5174
2. **See:** Login page (redirects from `/` to `/login`)
3. **Click:** "Register" link
4. **Fill:** Name, Email, Password
5. **Submit:** Creates account and logs you in
6. **Redirects to:** `/home` - Main dashboard
7. **Navbar shows:** Hi, [Your Name] | Logout button
8. **Browse:** Components, Learning, Community, Contact

---

## 🐛 Troubleshooting

### "MongooseServerSelectionError"

→ Your MONGO_URI is incorrect or MongoDB cluster is not running
→ Double-check your connection string

### "JWT_SECRET not set"

→ Add JWT_SECRET to backend/.env

### "Port 5173 is in use"

→ Vite will auto-use port 5174 (this is fine)

### "CORS error" in browser

→ Make sure CLIENT_ORIGIN in backend/.env matches your frontend URL

---

## 📞 Need Help?

1. Check backend terminal for errors
2. Check browser console (F12) for frontend errors
3. Verify both servers are running
4. Confirm .env files have correct values
