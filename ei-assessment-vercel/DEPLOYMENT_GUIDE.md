# 🚀 Vercel Deployment Guide - EI Assessment with SMTP2GO

This guide will walk you through deploying your EI Assessment application to Vercel with SMTP2GO email integration.

## ✅ What You'll Get

- **Free hosting** on Vercel (no domain required)
- **Automatic HTTPS** (yourapp.vercel.app)
- **Always available** - 24/7 uptime
- **Free email sending** via SMTP2GO (1,000 emails/month)
- **Users can open HTML locally** and emails still work!

---

## 📋 Prerequisites

1. **GitHub account** (free)
2. **Vercel account** (free - sign up with GitHub)
3. **SMTP2GO account** (free - 1,000 emails/month)

---

## Step 1️⃣: Set Up SMTP2GO

### 1. Create SMTP2GO Account
1. Go to https://www.smtp2go.com/
2. Click "Sign Up Free"
3. Create your account
4. Verify your email

### 2. Get SMTP Credentials
1. Log in to SMTP2GO dashboard
2. Go to **Settings** > **Users**
3. Click **"Add SMTP User"**
4. Give it a name (e.g., "EI Assessment")
5. Click **"Add"**
6. **SAVE THESE CREDENTIALS** - you'll need them:
   - **Username**: (looks like: ei-assessment-12345)
   - **Password**: (auto-generated password)

### 3. Verify Sender Email (Optional but Recommended)
1. Go to **Settings** > **Sender Domains**
2. Add your domain OR use smtp2go.com default
3. For testing, you can skip this step

---

## Step 2️⃣: Prepare Your Project

### 1. Download This Project
Extract the ZIP file to a folder on your computer.

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `ei-assessment`
3. Make it **Public** or **Private** (your choice)
4. Click **"Create repository"**

### 3. Upload Files to GitHub

**Option A: Using GitHub Web Interface (Easiest)**
1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL files from the extracted folder
3. Click **"Commit changes"**

**Option B: Using Git Command Line**
```bash
cd /path/to/ei-assessment-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ei-assessment.git
git push -u origin main
```

---

## Step 3️⃣: Deploy to Vercel

### 1. Sign Up for Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 2. Import Your Project
1. Click **"Add New..."** > **"Project"**
2. Find your `ei-assessment` repository
3. Click **"Import"**

### 3. Configure Build Settings
Leave everything as default:
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: (leave default)

### 4. Add Environment Variables
Click **"Environment Variables"** and add these:

| Name | Value |
|------|-------|
| `SMTP_HOST` | `mail.smtp2go.com` |
| `SMTP_PORT` | `2525` |
| `SMTP_USERNAME` | (your SMTP2GO username) |
| `SMTP_PASSWORD` | (your SMTP2GO password) |
| `ADMIN_EMAIL` | `transformeerd@gmail.com` |
| `EMAIL_FROM` | (your sender email) |

**⚠️ Important:** Make sure to click "Add" after each variable!

### 5. Deploy!
1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment to complete
3. You'll see a success screen with your URL

---

## Step 4️⃣: Update HTML File

### 1. Get Your Vercel URL
After deployment, you'll see something like:
```
https://ei-assessment-abc123.vercel.app
```

### 2. Update the HTML File
1. Open `public/ei_assessment.html` in a text editor
2. Find this line (around line 66):
   ```javascript
   const API_ENDPOINT = 'YOUR_VERCEL_URL/api/send-results';
   ```
3. Replace with your actual URL:
   ```javascript
   const API_ENDPOINT = 'https://ei-assessment-abc123.vercel.app/api/send-results';
   ```
4. Save the file

### 3. Re-deploy (Important!)
**Option A: Through GitHub**
1. Commit and push the updated file to GitHub
2. Vercel will automatically redeploy

**Option B: Through Vercel Dashboard**
1. Go to your Vercel project
2. Click **"Deployments"**
3. Click **"Redeploy"**

---

## Step 5️⃣: Test Your Application

### Option A: Use the Hosted Version
1. Go to your Vercel URL: `https://your-app.vercel.app/ei_assessment.html`
2. Complete a test assessment
3. Check that email arrives at transformeerd@gmail.com

### Option B: Use Local HTML File
1. Save the updated `ei_assessment.html` to your desktop
2. Double-click to open in browser
3. Complete a test assessment
4. Emails will still work! (They go through your Vercel API)

---

## 🎉 You're Done!

Your application is now live and working!

### Share With Users:

**Option 1: Direct Link**
```
https://your-app.vercel.app/ei_assessment.html
```

**Option 2: Downloadable HTML File**
Users can download `ei_assessment.html` and open it locally - emails will still work!

---

## 📊 Monitor Usage

### SMTP2GO Dashboard
- Check sent emails: https://app.smtp2go.com/reports/
- Free tier limit: 1,000 emails/month
- Upgrade if needed: Starting at $10/month for 10,000 emails

### Vercel Dashboard
- View deployments: https://vercel.com/dashboard
- Check function logs for errors
- Free tier: Generous limits for personal use

---

## 🔧 Troubleshooting

### Email Not Sending

**Check Vercel Function Logs:**
1. Go to your Vercel project
2. Click **"Functions"** tab
3. Click on **"send-results"**
4. Check logs for errors

**Common Issues:**
- ❌ Wrong SMTP credentials → Re-check SMTP2GO username/password
- ❌ Environment variables not set → Verify in Vercel project settings
- ❌ API endpoint not updated → Make sure HTML has correct Vercel URL

### CORS Errors

If you see CORS errors in browser console:
1. Make sure you're using the updated HTML file with correct API_ENDPOINT
2. Try clearing browser cache
3. Check Vercel function logs

### Emails Go to Spam

First few emails might go to spam:
1. Mark as "Not Spam"
2. Add sender to contacts
3. Consider verifying your domain in SMTP2GO

---

## 🔐 Security Notes

✅ **Environment variables** are hidden in Vercel  
✅ **SMTP credentials** are never exposed to users  
✅ **HTTPS** is automatic on Vercel  
✅ **No API keys** in HTML file  

---

## 💡 Pro Tips

### Custom Domain (Optional)
1. Go to Vercel project > Settings > Domains
2. Add your custom domain (e.g., ei-assessment.yourdomain.com)
3. Follow DNS instructions
4. Update HTML file with new domain

### Email Branding
Edit `/api/send-results.js` to customize:
- Email subject line (line 43)
- HTML email template (lines 75-180)
- Sender name (line 195)

### Monitoring
Set up email notifications in Vercel:
1. Project Settings > Notifications
2. Enable deployment notifications
3. Add your email

---

## 📈 Scaling Up

If you need more than 1,000 emails/month:

**SMTP2GO Pricing:**
- Free: 1,000 emails/month
- Starter: $10/month - 10,000 emails
- Growth: $50/month - 50,000 emails

**Vercel Pricing:**
- Free tier is usually sufficient
- Pro: $20/month for teams/commercial use

---

## 🆘 Need Help?

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**SMTP2GO Issues:**
- Docs: https://www.smtp2go.com/docs/
- Support: https://www.smtp2go.com/contact/

**Common Error Messages:**
- "Module not found" → Run `npm install` in Vercel
- "Authentication failed" → Check SMTP credentials
- "CORS error" → Update API_ENDPOINT in HTML

---

## ✅ Deployment Checklist

- [ ] SMTP2GO account created
- [ ] SMTP credentials obtained
- [ ] GitHub repository created
- [ ] Files uploaded to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables configured
- [ ] Deployed successfully
- [ ] Vercel URL copied
- [ ] HTML file updated with API endpoint
- [ ] Re-deployed to Vercel
- [ ] Test assessment completed
- [ ] Email received successfully

---

## 🎊 Success!

Your EI Assessment is now:
- ✅ Hosted on Vercel (free)
- ✅ Sending emails via SMTP2GO (free tier)
- ✅ Accessible 24/7 from anywhere
- ✅ Works as local HTML file too!

**Your Vercel URL:** https://your-app.vercel.app/ei_assessment.html

Share this URL with users, or give them the HTML file - both work perfectly!
