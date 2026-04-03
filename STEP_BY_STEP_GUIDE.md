# 🏪 MAHESH ENTERPRISE — YOUR PERSONAL STEP BY STEP GUIDE
## Developer: Dharmik Panchal | Client: Maheshbhai Davda

---

## YOUR DETAILS (Already Configured)

| What | Value |
|------|-------|
| Your GitHub | iamdharmik13@gmail.com |
| Firebase account | panchaldharmik1334@gmail.com |
| Client admin Gmail | maheshenterprisesnr@gmail.com |
| Firebase project | mahesh-enterprise |

> ✅ The `.env.local` file in this zip is already filled with your real Firebase keys.
> You do NOT need to change anything in that file.

---

## ⚠️ FIRST — DELETE OLD GITHUB REPO

You already pushed code to GitHub before. Delete that old repo first:

1. Go to → **https://github.com/iamdharmik13/mahesh-enterprise**
2. Click **Settings** tab
3. Scroll all the way down → **"Danger Zone"** (red section)
4. Click **"Delete this repository"**
5. Type `mahesh-enterprise` in the box → Click **"I understand, delete this repository"**
✅ Old repo deleted. Fresh start.

---

## STEP 1 — EXTRACT THE PROJECT

1. Find this zip file: **mahesh-enterprise-READY.zip**
2. Right-click → **"Extract All"**
3. Extract to your **Desktop**
4. You will see a folder called **`mahesh-enterprise`** on Desktop

---

## STEP 2 — OPEN IN VS CODE

1. Open **VS Code**
2. Click **File** → **Open Folder**
3. Go to Desktop → select the **`mahesh-enterprise`** folder → Click **Select Folder**
4. Press **Ctrl + `** to open the terminal at the bottom
5. You will see: `PS C:\Users\Asus\Desktop\mahesh-enterprise>`

---

## STEP 3 — CHECK .env.local FILE

1. In VS Code left panel, click on **`.env.local`** file
2. Verify it shows your Firebase keys (already filled in):
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCOGvIIH4JOw09NnpF4-x8yAkOSm_5VTUI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mahesh-enterprise.firebaseapp.com
...
NEXT_PUBLIC_ADMIN_EMAIL=maheshenterprisesnr@gmail.com
```
✅ No changes needed — already done!

---

## STEP 4 — CHECK FIREBASE IS READY

Go to **https://console.firebase.google.com** → sign in as **panchaldharmik1334@gmail.com**

Check these are set up (you did most of this before):

### 4A — Authentication ✅
- Left sidebar → **Authentication** → **Sign-in method** tab
- Make sure **Google** is Enabled ✅
- Make sure **Phone** is Enabled ✅

### 4B — Firestore Database
- Left sidebar → **Firestore Database**
- If it shows "Create database" → click it:
  - Select **"Start in production mode"** → Next
  - Location: **asia-south1 (Mumbai)** → Enable
- If database already exists → click **Rules** tab → paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.token.email == "maheshenterprisesnr@gmail.com";
    }
    match /inquiries/{id} {
      allow create: if true;
      allow read, write: if request.auth != null 
        && request.auth.token.email == "maheshenterprisesnr@gmail.com";
    }
    match /orders/{id} {
      allow create: if request.auth != null;
      allow read: if request.auth != null 
        && (resource.data.userId == request.auth.uid 
            || request.auth.token.email == "maheshenterprisesnr@gmail.com");
      allow write: if request.auth != null 
        && request.auth.token.email == "maheshenterprisesnr@gmail.com";
    }
  }
}
```
→ Click **Publish** ✅

### 4C — Storage → SKIP (free plan, not needed) ✅

---

## STEP 5 — INSTALL & RUN LOCALLY

In VS Code terminal, type:
```
npm install
```
Wait 2–3 minutes until it finishes.

Then type:
```
npm run dev
```

Open browser → go to: **http://localhost:3000**

### ✅ Test These:
- [ ] Home page loads — "Mahesh Enterprise" name shows
- [ ] Products page shows 12 demo products
- [ ] "Add to Cart" button works — cart slides in
- [ ] "Sign In" → Google popup opens
- [ ] Sign in with **maheshenterprisesnr@gmail.com** → you see **"Admin"** link
- [ ] Go to **http://localhost:3000/admin** → admin panel loads
- [ ] Contact form → fill and submit → success message

> ⚠️ Phone OTP won't work on localhost — that is NORMAL. Works after deploy.

---

## STEP 6 — CREATE NEW GITHUB REPO

1. Go to → **https://github.com** (sign in as **iamdharmik13@gmail.com**)
2. Click **"+"** button (top right) → **"New repository"**
3. Fill in:
   - Name: `mahesh-enterprise`
   - Keep it **Public**
   - ❌ Do NOT tick "Add README file"
4. Click **"Create repository"**
5. Keep this page open — you need the URL

---

## STEP 7 — PUSH CODE TO GITHUB

In VS Code terminal, first stop the server:
```
Ctrl + C
```

Then run these commands ONE BY ONE:

```
git init
```
```
git add .
```
```
git commit -m "Mahesh Enterprise website"
```
```
git branch -M main
```
```
git remote add origin https://github.com/iamdharmik13/mahesh-enterprise.git
```
```
git push -u origin main
```

If it asks for password → use your GitHub password or a Personal Access Token.

✅ Go to github.com/iamdharmik13/mahesh-enterprise — you should see all files uploaded.

---

## STEP 8 — DEPLOY ON VERCEL (Free)

1. Go to → **https://vercel.com**
2. Click **"Sign up"** (or Log in) → **"Continue with GitHub"**
3. Allow Vercel to access your GitHub
4. Click **"Add New Project"**
5. Find **mahesh-enterprise** → Click **"Import"**
6. Framework shows **Next.js** automatically ✅ — don't change
7. **SCROLL DOWN** to find **"Environment Variables"** section
8. Add these 7 variables one by one (click Add for each):

| Variable Name | Value |
|--------------|-------|
| NEXT_PUBLIC_FIREBASE_API_KEY | AIzaSyCOGvIIH4JOw09NnpF4-x8yAkOSm_5VTUI |
| NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN | mahesh-enterprise.firebaseapp.com |
| NEXT_PUBLIC_FIREBASE_PROJECT_ID | mahesh-enterprise |
| NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET | mahesh-enterprise.firebasestorage.app |
| NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID | 685617959334 |
| NEXT_PUBLIC_FIREBASE_APP_ID | 1:685617959334:web:79ccd7c09a9b967975bf67 |
| NEXT_PUBLIC_ADMIN_EMAIL | maheshenterprisesnr@gmail.com |

9. After adding all 7 → Click **"Deploy"**
10. Wait 3–4 minutes → 🎉 LIVE!
11. You get a URL like: **`mahesh-enterprise-xyz.vercel.app`**
12. **Copy this URL** — you need it in Step 9

---

## STEP 9 — ENABLE PHONE OTP

1. Go to **Firebase Console** (console.firebase.google.com)
2. Left sidebar → **Authentication** → **Settings** tab
3. Click **"Authorized domains"**
4. Click **"Add domain"**
5. Paste your Vercel URL → Click **Add**

✅ Phone OTP now works on live site!

---

## STEP 10 — TEST LIVE WEBSITE

Open your Vercel URL on:
- ✅ PC browser (Chrome/Edge)
- ✅ Mobile phone browser
- ✅ Test on someone else's phone too

Full test:
- [ ] Home page loads fast on mobile
- [ ] Products show correctly
- [ ] Add to cart works on mobile
- [ ] "Order via WhatsApp" sends order to Maheshbhai's WhatsApp
- [ ] Google Sign-In works
- [ ] Phone OTP works (sends SMS to your number)
- [ ] Contact form works
- [ ] Admin panel works at `/admin`

---

## STEP 11 — ADD REAL PRODUCTS FOR MAHESHBHAI

Before handover, add at least 5 real products:

### How to get product photo URL:
1. Take photo of product with phone
2. Go to → **https://imgbb.com**
3. Click "Start uploading" → select photo → Upload
4. After upload → click **"Copy link"** → select **"Direct link"**
5. Copy that URL

### Add product in Admin:
1. Open your live site → go to `/admin`
2. Sign in with **maheshenterprisesnr@gmail.com**
3. Click **"Add Product"**
4. Fill: Name, Category, Price, Description
5. Paste ImgBB URL in "Image URL" field
6. Click **Save** ✅

Repeat for 5–10 products minimum.

---

## STEP 12 — HANDOVER TO MAHESHBHAI

### Give Maheshbhai this information:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MAHESH ENTERPRISE WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Website:
   https://[your-vercel-url].vercel.app

🔒 Admin Panel:
   https://[your-vercel-url].vercel.app/admin
   Sign in with: maheshenterprisesnr@gmail.com

📦 To Add Products:
   1. Go to admin panel
   2. Click "Add Product"
   3. Upload photo to imgbb.com
   4. Copy Direct Link → paste in Image URL
   5. Fill details → Save

💬 Customer Orders Come Via:
   → WhatsApp (automatic cart order)
   → Admin panel → Orders tab
   → Admin panel → Inquiries tab

📞 Support: Dharmik - [your number]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## YOUR SUMMARY — ACCOUNTS USED

| Account | Used For |
|---------|---------|
| iamdharmik13@gmail.com | GitHub (code hosting) |
| panchaldharmik1334@gmail.com | Firebase (database) |
| maheshenterprisesnr@gmail.com | Website Admin (Maheshbhai) |

---

## 💰 TOTAL COST = ₹0

- Vercel hosting: FREE
- Firebase database + auth: FREE  
- ImgBB image hosting: FREE

---

## 🆘 IF SOMETHING GOES WRONG

| Problem | Fix |
|---------|-----|
| `npm install` fails | Type `node -v` — must show version number |
| Website not loading | Check Vercel dashboard for red error |
| Google login fails | Add Vercel URL to Firebase Authorized Domains |
| Phone OTP fails | Only works on live site, do Step 9 |
| Admin shows 404 | ADMIN_EMAIL must be maheshenterprisesnr@gmail.com exactly |
| Products not saving | Check Firestore rules — see Step 4B |
| Image not showing | Use Direct Link from ImgBB, not page URL |

---

**🎉 Well done Dharmik! Mahesh Enterprise is ready for Maheshbhai!**
