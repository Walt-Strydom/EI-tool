# ⚡ Quick Reference Card

## 🔗 Important URLs

**Your Vercel App:**
```
https://YOUR-APP-NAME.vercel.app/ei_assessment.html
```

**Vercel Dashboard:**
```
https://vercel.com/dashboard
```

**SMTP2GO Dashboard:**
```
https://app.smtp2go.com
```

**GitHub Repository:**
```
https://github.com/YOUR-USERNAME/ei-assessment
```

---

## 🔐 Environment Variables

Copy-paste these into Vercel > Settings > Environment Variables:

```
SMTP_HOST=mail.smtp2go.com
SMTP_PORT=2525
SMTP_USERNAME=your-smtp2go-username
SMTP_PASSWORD=your-smtp2go-password
ADMIN_EMAIL=transformeerd@gmail.com
EMAIL_FROM=noreply@yourdomain.com
```

---

## 📝 Common Tasks

### Deploy Changes
1. Edit files locally
2. Commit to GitHub: `git add . && git commit -m "Update" && git push`
3. Vercel auto-deploys in 30-60 seconds

### View Logs
1. Vercel Dashboard > Your Project
2. Functions tab > send-results
3. View runtime logs

### Update Email Template
Edit: `api/send-results.js` (lines 75-180)

### Update HTML
Edit: `public/ei_assessment.html`

### Change Admin Email
Vercel > Settings > Environment Variables > ADMIN_EMAIL

---

## 🆘 Quick Fixes

| Problem | Solution |
|---------|----------|
| Email not sending | Check Vercel function logs |
| 404 error | Verify file in `public/` folder |
| CORS error | Update API_ENDPOINT in HTML |
| Auth failed | Check SMTP credentials |
| Timeout | Check SMTP2GO status |

---

## 📧 Email Quota

**Free Tier:** 1,000 emails/month

**Check Usage:**
SMTP2GO Dashboard > Reports > Summary

**Upgrade:**
- $10/month = 10,000 emails
- $50/month = 50,000 emails

---

## 🔄 Update Workflow

```
1. Edit code
2. git commit & push
3. Vercel auto-deploys
4. Test changes
5. ✅ Done!
```

---

## 📱 Share With Users

**Option 1:** Send link
```
https://your-app.vercel.app/ei_assessment.html
```

**Option 2:** Send HTML file
Users can download and open locally - emails still work!

---

## 🎯 File Locations

```
api/send-results.js       → Email sending logic
public/ei_assessment.html → Main application
package.json             → Dependencies
vercel.json              → Vercel config
```

---

## 💾 Backup Important Data

✅ Save these somewhere safe:
- SMTP2GO username/password
- Vercel project URL
- GitHub repository URL
- Environment variable values

---

## 📊 Monitoring

**Check Daily:**
- Vercel function logs (for errors)
- SMTP2GO quota usage

**Check Weekly:**
- Email deliverability
- User feedback

---

## 🔧 Emergency Contacts

**Vercel Down?**
Status: https://vercel-status.com

**SMTP2GO Down?**
Status: https://status.smtp2go.com/

**Need Help?**
- Vercel: https://vercel.com/support
- SMTP2GO: https://www.smtp2go.com/contact/

---

## 💡 Pro Tips

1. **Test after every change** - deploy to staging first
2. **Keep credentials private** - never commit .env
3. **Monitor logs regularly** - catch issues early
4. **Use descriptive commits** - easier to track changes
5. **Backup environment variables** - save them securely

---

## ⚙️ Useful Commands

### Local Development
```bash
npm install           # Install dependencies
vercel dev           # Run locally
vercel --prod        # Deploy to production
vercel logs          # View logs
```

### Git Commands
```bash
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push             # Push to GitHub
```

---

## 🎨 Customization Quick Reference

**Change Email Subject:**
Line 43 in `api/send-results.js`

**Change Email Colors:**
Lines 75-180 in `api/send-results.js` (CSS section)

**Change Questions:**
Lines 86-157 in `public/ei_assessment.html`

**Change Scoring:**
Line 166 in `public/ei_assessment.html`

---

## 📞 Support Resources

| Issue | Resource |
|-------|----------|
| Deployment | DEPLOYMENT_GUIDE.md |
| Errors | TROUBLESHOOTING.md |
| Setup | README.md |
| Code | Inline comments |

---

**Print this card and keep it handy! 📋**
