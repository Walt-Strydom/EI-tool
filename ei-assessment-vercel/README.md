# 🧠 EI Assessment - Vercel + SMTP2GO

> Emotional Intelligence Self-Assessment with automatic email delivery via SMTP2GO, hosted on Vercel (no domain required!)

---

## 🚀 Quick Deploy (5 Minutes)

### 1. Get SMTP2GO Credentials
- Sign up at https://www.smtp2go.com/ (free)
- Create SMTP user
- Save username & password

### 2. Deploy to Vercel
- Sign up at https://vercel.com (free)
- Import this repository
- Add environment variables (see below)
- Deploy!

### 3. Update HTML File
- Copy your Vercel URL
- Update `API_ENDPOINT` in `public/ei_assessment.html`
- Redeploy

**Done! 🎉** Your app is live at `https://your-app.vercel.app/ei_assessment.html`

---

## 📋 Environment Variables

Add these in Vercel project settings:

```
SMTP_HOST=mail.smtp2go.com
SMTP_PORT=2525
SMTP_USERNAME=your-smtp2go-username
SMTP_PASSWORD=your-smtp2go-password
ADMIN_EMAIL=transformeerd@gmail.com
EMAIL_FROM=noreply@yourdomain.com
```

---

## 📁 Project Structure

```
ei-assessment-vercel/
├── api/
│   └── send-results.js       # Vercel serverless function
├── public/
│   └── ei_assessment.html    # Main application
├── package.json              # Dependencies
├── vercel.json              # Vercel configuration
└── DEPLOYMENT_GUIDE.md      # Detailed instructions
```

---

## ✨ Features

- ✅ **50 Questions** across 5 EI sections
- ✅ **Randomized order** for each assessment
- ✅ **Automatic scoring** by section
- ✅ **Email results** via SMTP2GO
- ✅ **Print/Download** options
- ✅ **Mobile responsive** design
- ✅ **No database** required
- ✅ **Works locally** - users can download HTML file

---

## 🎯 How It Works

1. User opens HTML file (locally or on Vercel)
2. Completes 50-question assessment
3. Results calculated automatically
4. Email sent via Vercel serverless function
5. Admin receives formatted email with results

---

## 💰 Pricing

**This solution is FREE:**
- ✅ Vercel: Free tier (generous limits)
- ✅ SMTP2GO: Free tier (1,000 emails/month)
- ✅ No domain required (uses .vercel.app)
- ✅ No credit card needed

**Upgrade only if needed:**
- SMTP2GO: $10/month for 10,000 emails
- Vercel Pro: $20/month for commercial use

---

## 📖 Documentation

- **DEPLOYMENT_GUIDE.md** - Complete step-by-step deployment instructions
- **TROUBLESHOOTING.md** - Common issues and solutions
- **.env.example** - Environment variable template

---

## 🔐 Security

- ✅ API keys stored as environment variables
- ✅ CORS enabled for cross-origin requests
- ✅ HTTPS automatic on Vercel
- ✅ No sensitive data in client code

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run locally (requires Vercel CLI)
npm run dev

# Deploy to production
npm run deploy
```

**Note:** You need environment variables in `.env` file for local testing.

---

## 📊 Assessment Sections

1. **Self-Awareness** (10 questions)
2. **Self-Regulation** (10 questions)
3. **Self-Motivation** (10 questions)
4. **Social Awareness** (10 questions)
5. **Relationship Management** (10 questions)

**Total:** 50 questions, max score: 500 points

---

## 📧 Email Format

Results include:
- Participant name and date
- Section scores (out of 100 each)
- Total EI score (out of 500)
- Detailed answers for all questions
- Professional HTML formatting

---

## 🌐 Deployment Options

### Option 1: Hosted on Vercel
Users access via: `https://your-app.vercel.app/ei_assessment.html`

### Option 2: Local HTML File
Users download `ei_assessment.html` and open locally - emails still work!

### Option 3: Both!
Host on Vercel AND provide downloadable HTML file.

---

## 🔄 Updating the Application

### Update HTML:
1. Edit `public/ei_assessment.html`
2. Commit to GitHub
3. Vercel auto-deploys

### Update Email Template:
1. Edit `api/send-results.js`
2. Commit to GitHub
3. Vercel auto-deploys

### Update Environment Variables:
1. Go to Vercel project settings
2. Update variables
3. Redeploy manually

---

## 🆘 Support

**Issues with:**
- **Deployment** → See DEPLOYMENT_GUIDE.md
- **Emails** → Check Vercel function logs
- **SMTP2GO** → Visit https://www.smtp2go.com/docs/

**Quick Checks:**
1. Environment variables set correctly?
2. API_ENDPOINT updated in HTML?
3. SMTP2GO credentials valid?
4. Check Vercel function logs

---

## 📝 License

Free to use for personal and commercial purposes.

---

## 🎊 Ready to Deploy?

**See DEPLOYMENT_GUIDE.md for complete step-by-step instructions!**

Takes about 5 minutes and requires no technical expertise.

**Your app will be live at:** `https://your-chosen-name.vercel.app`

---

## 🙋 FAQ

**Q: Do I need a domain?**  
A: No! Vercel provides free `.vercel.app` subdomain.

**Q: How many emails can I send?**  
A: 1,000/month on SMTP2GO free tier.

**Q: Can users download the HTML file?**  
A: Yes! They can use it locally and emails still work.

**Q: Is this secure?**  
A: Yes! API keys are never exposed in the HTML.

**Q: Can I customize the email design?**  
A: Yes! Edit the HTML template in `api/send-results.js`.

**Q: What if I need more emails?**  
A: Upgrade SMTP2GO to paid plan ($10/month for 10,000).

---

**Questions?** Open an issue or check the deployment guide!
