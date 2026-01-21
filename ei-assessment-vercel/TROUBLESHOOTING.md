# 🔧 Troubleshooting Guide

Common issues and solutions for the EI Assessment Vercel deployment.

---

## 🚨 Email Not Sending

### Symptom
User completes assessment but email never arrives.

### Solutions

#### 1. Check Vercel Function Logs
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **"Functions"** tab
4. Click **"send-results"**
5. Check logs for errors

**Common error messages:**
- `Invalid login` → SMTP credentials are wrong
- `Connection timeout` → Firewall or network issue
- `Missing credentials` → Environment variables not set

#### 2. Verify Environment Variables
1. Go to Vercel project > **Settings** > **Environment Variables**
2. Confirm all these are set:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USERNAME`
   - `SMTP_PASSWORD`
   - `ADMIN_EMAIL`
   - `EMAIL_FROM`
3. If missing, add them and **redeploy**

#### 3. Test SMTP2GO Credentials
1. Log in to SMTP2GO dashboard
2. Go to **Settings** > **Users**
3. Verify your SMTP user is active
4. Try creating a new SMTP user if issues persist

#### 4. Check SMTP2GO Quota
1. Go to SMTP2GO dashboard
2. Check **Reports** > **Summary**
3. Verify you haven't exceeded 1,000 emails/month (free tier)

---

## 🌐 CORS Errors

### Symptom
Browser console shows: `CORS policy: No 'Access-Control-Allow-Origin' header`

### Solutions

#### 1. Check API Endpoint
1. Open `public/ei_assessment.html`
2. Find line with `API_ENDPOINT`
3. Verify it matches your Vercel URL exactly
4. Should look like: `https://your-app.vercel.app/api/send-results`
5. No trailing slash!

#### 2. Clear Browser Cache
```bash
# Chrome
Ctrl+Shift+Delete (Windows)
Cmd+Shift+Delete (Mac)
```

#### 3. Try Incognito/Private Window
Sometimes cached data causes issues.

---

## 🔴 Deployment Failed

### Symptom
Vercel shows "Deployment Failed" error.

### Solutions

#### 1. Check Build Logs
1. Click on the failed deployment
2. Read the error message
3. Common issues:
   - Missing `package.json` → Make sure it's in root directory
   - Syntax error → Check JavaScript files for errors
   - Missing dependencies → Verify `nodemailer` is in `package.json`

#### 2. Verify File Structure
```
ei-assessment-vercel/
├── api/
│   └── send-results.js
├── public/
│   └── ei_assessment.html
├── package.json
└── vercel.json
```

#### 3. Try Manual Redeploy
1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Select **"Redeploy"**

---

## 📱 404 Not Found

### Symptom
Opening `https://your-app.vercel.app/ei_assessment.html` shows 404.

### Solutions

#### 1. Check File Location
File must be in `public/` directory, not root.

#### 2. Try Root URL First
Visit: `https://your-app.vercel.app/` first to see if deployment worked.

#### 3. Verify vercel.json Routes
Check that `vercel.json` has correct routing configuration.

---

## ✉️ Emails Go to Spam

### Symptom
Emails arrive but in spam/junk folder.

### Solutions

#### 1. Mark as Not Spam
First email often goes to spam - this is normal:
1. Find email in spam folder
2. Mark as "Not Spam"
3. Add sender to contacts
4. Future emails should arrive in inbox

#### 2. Verify Sender Email
1. In SMTP2GO, go to **Settings** > **Sender Domains**
2. Verify your sender domain (optional but recommended)
3. This improves deliverability

#### 3. Use Reply-To Header
Edit `api/send-results.js` and add:
```javascript
replyTo: process.env.ADMIN_EMAIL
```

---

## 🔑 Invalid SMTP Credentials

### Symptom
Error: `Invalid login: 535 Authentication failed`

### Solutions

#### 1. Regenerate SMTP User
1. Log in to SMTP2GO
2. Go to **Settings** > **Users**
3. Delete old SMTP user
4. Create new one
5. Update environment variables in Vercel
6. **Redeploy**

#### 2. Check for Typos
Common mistakes:
- Extra spaces in username/password
- Copying password with line breaks
- Wrong username (should include numbers)

#### 3. Verify Account Status
1. Check SMTP2GO account is active
2. Verify email is confirmed
3. Check for any suspension notices

---

## 🌍 Function Timeout

### Symptom
Error: `Function execution timed out`

### Solutions

#### 1. Check SMTP2GO Service Status
Visit https://status.smtp2go.com/

#### 2. Try Different SMTP Port
In Vercel environment variables:
- Try `SMTP_PORT=8025` (alternative port)
- Or `SMTP_PORT=587` (TLS port)

#### 3. Increase Timeout (Pro Plan Only)
Free Vercel plans have 10s timeout - usually sufficient.

---

## 💻 Local Development Issues

### Symptom
`npm run dev` doesn't work locally.

### Solutions

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Create .env File
Copy `.env.example` to `.env` and fill in values:
```bash
cp .env.example .env
```

#### 3. Install Dependencies
```bash
npm install
```

#### 4. Run Dev Server
```bash
vercel dev
```

---

## 🔄 API Endpoint Not Working

### Symptom
Fetch fails with network error.

### Solutions

#### 1. Verify API URL
Should be: `https://your-app.vercel.app/api/send-results`
- Must start with `https://`
- Must include `/api/` path
- Must end with `/send-results`
- No trailing slash

#### 2. Test API Directly
Use this curl command:
```bash
curl -X POST https://your-app.vercel.app/api/send-results \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","date":"2024-01-01","sectionScores":{},"total":0,"answers":[]}'
```

Should return: `{"success":true}`

#### 3. Check Browser Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Complete assessment
4. Check request/response for errors

---

## 📊 Environment Variable Issues

### Symptom
Variables not accessible in function.

### Solutions

#### 1. Redeploy After Adding Variables
Environment variables only apply to new deployments:
1. Add/update variables
2. Go to **Deployments**
3. Click **"Redeploy"**

#### 2. Check Variable Scope
Make sure variables are set for:
- ✅ Production
- ✅ Preview
- ✅ Development

#### 3. No Quotes in Values
Don't wrap values in quotes in Vercel UI:
- ❌ `"mail.smtp2go.com"`
- ✅ `mail.smtp2go.com`

---

## 🎨 HTML File Not Updating

### Symptom
Changes to HTML not showing on live site.

### Solutions

#### 1. Hard Refresh Browser
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### 2. Clear Vercel Cache
1. Go to project settings
2. Under **Data Cache**, click **"Clear Cache"**
3. Redeploy

#### 3. Check Git Commit
Verify changes were committed and pushed to GitHub.

---

## 🔍 Debugging Checklist

When something's not working, check these in order:

- [ ] Vercel deployment succeeded (green checkmark)
- [ ] Environment variables are all set
- [ ] API_ENDPOINT in HTML matches Vercel URL
- [ ] SMTP2GO account is active
- [ ] SMTP credentials are correct
- [ ] Haven't exceeded email quota
- [ ] Browser console shows no errors
- [ ] Vercel function logs show no errors
- [ ] Hard refreshed browser
- [ ] Tried in incognito/private window

---

## 🆘 Still Having Issues?

### Get Help

**Vercel Support:**
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Support: https://vercel.com/support

**SMTP2GO Support:**
- Docs: https://www.smtp2go.com/docs/
- Contact: https://www.smtp2go.com/contact/
- Status: https://status.smtp2go.com/

**This Project:**
- Open an issue on GitHub
- Include error messages from:
  - Vercel function logs
  - Browser console (F12)
  - SMTP2GO logs

---

## 📝 Useful Commands

### Check Vercel Deployment
```bash
vercel --prod
```

### View Logs
```bash
vercel logs
```

### Test API Endpoint
```bash
curl -X POST YOUR_VERCEL_URL/api/send-results \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","date":"2024-01-01","sectionScores":{"Self-Awareness":80},"total":400,"answers":[]}'
```

### Redeploy
```bash
vercel --prod --force
```

---

## 💡 Prevention Tips

1. **Test thoroughly** after each deployment
2. **Keep credentials secure** - never commit to Git
3. **Monitor SMTP2GO quota** to avoid hitting limits
4. **Check Vercel function logs** regularly
5. **Use environment variables** for all config
6. **Hard refresh browser** after changes
7. **Keep dependencies updated** (npm update)

---

**Remember:** Most issues are solved by checking environment variables and redeploying! 🔄
