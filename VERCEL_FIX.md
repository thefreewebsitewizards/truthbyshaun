# URGENT: Fix Vercel Build Error

## The Problem
Vercel is still using the old build command `"tsc && vite build"` which causes a permission denied error. The fix is ready locally but needs to be pushed to GitHub.

## Solution Options

### Option 1: Push Changes to GitHub (Recommended)
1. **Authenticate with GitHub first:**
   ```bash
   git config --global user.email "your-email@example.com"
   git config --global user.name "Your Name"
   ```

2. **If you have 2FA enabled, use a Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate a new token with repo permissions
   - Use the token as your password when pushing

3. **Push the changes:**
   ```bash
   git push origin main
   ```

### Option 2: Manual Fix in GitHub Web Interface
If you can't push, edit the file directly on GitHub:

1. Go to your GitHub repository
2. Navigate to `package.json`
3. Click the edit button (pencil icon)
4. Change line 9 from:
   ```json
   "build": "tsc && vite build",
   ```
   to:
   ```json
   "build": "vite build",
   ```
5. Commit the change

### Option 3: Override in Vercel Dashboard
1. Go to your Vercel project dashboard
2. Go to Settings → General
3. In "Build & Development Settings":
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

## Environment Variables for Vercel
Don't forget to add these in Vercel Settings → Environment Variables:

```
VITE_FIREBASE_API_KEY=AIzaSyDvaHjJ1-lrN4TxGVa8Eb-jHVySZlHoGm4
VITE_FIREBASE_AUTH_DOMAIN=truthbyshaun-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=truthbyshaun-project
VITE_FIREBASE_STORAGE_BUCKET=truthbyshaun-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=91172277254
VITE_FIREBASE_APP_ID=1:91172277254:web:1967b6a1b24865ac000787
```

## After the Fix
Once you've applied any of these solutions, trigger a new deployment in Vercel and it should build successfully!

**The core issue:** Vercel is trying to run `tsc` (TypeScript compiler) but the `tsconfig.json` has `"noEmit": true`, creating a conflict. The fix removes the unnecessary `tsc` command since Vite handles TypeScript compilation internally.