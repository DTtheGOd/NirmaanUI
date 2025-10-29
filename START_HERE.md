# ⚡ QUICK START - Follow These Steps!

## 🎯 Goal

Get the backend running with MongoDB so you can login/register

---

## Step 1: Get MongoDB URI (5 minutes)

### Option A: MongoDB Atlas (Cloud - RECOMMENDED)

1. **Open:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with email (it's FREE)
3. **Create a cluster:**

   - Click "Build a Database"
   - Choose **M0 FREE** tier
   - Click "Create"
   - Wait 3-5 minutes for cluster to deploy

4. **Create Database User:**

   - Security → Database Access → Add New Database User
   - Username: `admin`
   - Password: Click "Autogenerate Secure Password" and COPY it
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Allow Network Access:**

   - Security → Network Access → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String:**

   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:

   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   - Replace `<password>` with the password you copied in step 4
   - Change `/?retryWrites` to `/nirmaanui?retryWrites`

7. **Final URI should look like:**
   ```
   mongodb+srv://admin:YourPassword123@cluster0.abcde.mongodb.net/nirmaanui?retryWrites=true&w=majority
   ```

---

## Step 2: Update Backend .env File

1. **Open:** `c:\MINI PROJECT\NirmaanUI\backend\.env`

2. **Update MONGO_URI line:**

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://admin:YourPassword123@cluster0.abcde.mongodb.net/nirmaanui?retryWrites=true&w=majority
   JWT_SECRET=my_super_secret_jwt_key_12345_change_in_production
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLIENT_ORIGIN=http://localhost:5174
   NODE_ENV=development
   ```

3. **Save the file** (Ctrl+S)

---

## Step 3: Generate JWT Secret (30 seconds)

**Run this in PowerShell:**

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Copy the output** and update `JWT_SECRET=` in backend/.env

**Example:**

```env
JWT_SECRET=aB3dE9fG2hJ5kL8mN1pQ4rS7tU0vW6xY
```

---

## Step 4: Start Backend Server

**Run in PowerShell:**

```powershell
cd "c:\MINI PROJECT\NirmaanUI\backend"
npm run dev
```

**Expected output:**

```
MongoDB connected
API listening on http://localhost:5000
```

**If you see errors:**

- Check MongoDB URI is correct
- Check password has no special characters like `<`, `>`, or spaces
- Make sure you added your IP to Network Access in Atlas

---

## Step 5: Test the Login Flow

1. **Frontend should already be running** at http://localhost:5174
2. **You should see:** Login page
3. **Click:** "Register" link
4. **Fill in:**
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
5. **Click:** "Create account"
6. **Expected:** Redirects to /home with "Welcome to Nirmaan UI, Your Name!"
7. **Navbar shows:** Hi, Your Name | Logout button

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access set to "Allow from Anywhere"
- [ ] Connection string copied and password replaced
- [ ] MONGO_URI updated in backend/.env
- [ ] JWT_SECRET generated and added to backend/.env
- [ ] Backend server running without errors
- [ ] Frontend running on http://localhost:5174
- [ ] Can register a new user
- [ ] Can login with that user
- [ ] Redirects to /home after login
- [ ] Can see user name in navbar
- [ ] Can logout

---

## 🆘 If Backend Won't Start

### Error: "MongooseServerSelectionError"

**Fix:** Your MongoDB URI is wrong

- Double-check the connection string
- Make sure password is correct (no `<` or `>` symbols)
- Verify IP address is whitelisted in Atlas

### Error: "JWT_SECRET not set"

**Fix:** Add JWT_SECRET to backend/.env file

### Error: "Port 5000 is in use"

**Fix:**

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

---

## 📝 Summary of What You Need

1. **MongoDB Atlas account** (free)
2. **MongoDB connection URI** → goes in `backend/.env` as `MONGO_URI`
3. **JWT secret** (random string) → goes in `backend/.env` as `JWT_SECRET`
4. **Both servers running:**
   - Backend on port 5000
   - Frontend on port 5174

**That's it!** Once these are set up, your full-stack auth system will work! 🎉
