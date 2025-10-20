# ⚡ QUICK START - OpenAI Setup (2 Minutes)

## ✅ **EVERYTHING IS READY - YOU JUST NEED THE API KEY**

---

## 🎯 **EXACT STEPS** (Do these in order):

### **Step 1: Get OpenAI API Key** (1 minute)
1. Go to: https://platform.openai.com/api-keys
2. Sign in (or create free account)
3. Click **"Create new secret key"**
4. Name it: `CarCrashATL`
5. **Copy the key** (looks like: `sk-proj-xxxxxxxxxxxxx`)
6. Save it somewhere safe

---

### **Step 2: Add to Vercel** (1 minute)
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to: **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Enter exactly:
   ```
   Name:  OPENAI_API_KEY
   Value: sk-proj-your-actual-key-here
   ```
6. Check: ✅ Production ✅ Preview ✅ Development
7. Click **Save**

---

### **Step 3: Done!** ✅
Vercel will auto-redeploy with the new environment variable.
Wait 2-3 minutes for deployment to complete.

---

## 🧪 **How to Test**

### **Go to your live site**:
1. Navigate to: `/ai-case-builder`
2. Upload 2-3 test files (any images/docs)
3. Fill in:
   - Name: "Test User"
   - Email: your-email@test.com
   - Accident date: Any recent date
   - Location: "I-75 Atlanta"
   - Description: "Rear-ended at red light, other driver was texting"
   - Injuries: "Neck pain, whiplash"
   - Check: Police report filed
4. Click **"Analyze My Case with AI"**
5. Wait 5-10 seconds
6. See **REAL AI analysis**!

---

## ✅ **What You'll See**

### **Real AI will provide**:
- **Case Strength Score**: 0-100 (based on your specific details)
- **Settlement Estimate**: Realistic range like $25,000 - $75,000
- **Key Factors**: Specific to your case description
- **Urgent Actions**: Relevant to Georgia law
- **Next Steps**: Personalized recommendations

### **How to know it's working**:
✅ Takes 5-10 seconds (not instant)
✅ Different results for different cases
✅ Settlement values match your description severity
✅ Recommendations reference your specific details

---

## 🎯 **THAT'S LITERALLY IT!**

### **What You Need to Do**:
1. ✅ Get API key from OpenAI
2. ✅ Add `OPENAI_API_KEY` to Vercel
3. ✅ Wait for auto-redeploy
4. ✅ Test on live site

### **What I Already Did**:
- ✅ Installed OpenAI SDK (in package.json)
- ✅ Created API route (`/api/ai/analyze-case`)
- ✅ Updated AI Case Builder component
- ✅ Added error handling
- ✅ Implemented loading states
- ✅ Configured edge runtime
- ✅ Set up prompt engineering
- ✅ Pushed everything to main

---

## 💡 **The Environment Variable Name** (IMPORTANT!)

```
OPENAI_API_KEY
```

**Must be EXACTLY this** (all caps, underscore, no typos)

---

## 🚫 **What NOT to Do**

❌ Don't use: `OPENAI_KEY` (wrong)
❌ Don't use: `OPEN_AI_API_KEY` (wrong)
❌ Don't use: `openai_api_key` (wrong lowercase)
✅ DO use: `OPENAI_API_KEY` (correct!)

---

## 💰 **Cost**

- **Per Analysis**: $0.005 (half a cent)
- **100 Analyses**: $0.50
- **1000 Analyses**: $5.00

**Extremely affordable** and only charged when used!

---

## 🎉 **READY!**

Everything is coded and deployed to main.

**Just add the API key to Vercel and you're live!** 🚀

---

## ❓ **Need Help?**

Check `OPENAI_SETUP_GUIDE.md` for:
- Detailed troubleshooting
- Testing instructions
- How to verify it's working
- Common issues and fixes

