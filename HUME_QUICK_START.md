# Hume Voice Assistant - Quick Start

## 🚀 Get Started in 5 Minutes

### Step 1: Get Your Hume API Credentials (2 minutes)

1. Go to: **https://platform.hume.ai/settings/keys**
2. Click "Create New API Key"
3. Copy both keys:
   - **API Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### Step 2: Add to Your Environment (1 minute)

Create a file called `.env.local` in your project root and add:

```env
HUME_API_KEY=pk_your_key_here
HUME_SECRET_KEY=sk_your_key_here
```

### Step 3: Start Your Server (1 minute)

```bash
npm run dev
```

### Step 4: Test It! (1 minute)

1. Open: **http://localhost:3000/voice-assistant**
2. Click "Start Voice Call"
3. Allow microphone access
4. Say: "What should I do after a car accident?"

## ✅ That's It!

Your voice assistant is now live and ready to help people understand their rights after car accidents in Atlanta.

## 🎯 What Can People Ask?

### For Accident Victims
- "I just had an accident, what do I do?"
- "Should I talk to the insurance company?"
- "When do I need a lawyer?"
- "What compensation can I get?"
- "How long do I have to file a claim?"

### For Attorneys
- "What's the statute of limitations in Georgia?"
- "How does comparative negligence work here?"
- "What's the typical timeline for these cases?"

## 🔧 Optional: Customize the Voice

Want a different voice or personality?

1. Go to: **https://platform.hume.ai/configurations**
2. Create a new configuration
3. Choose voice settings
4. Copy the Config ID
5. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_HUME_CONFIG_ID=your_config_id
   ```

## 💡 Pro Tips

- **Be patient**: The AI adapts to how people speak
- **Simple language**: Works great for stressed accident victims
- **Technical too**: Attorneys can ask complex questions
- **Always available**: 24/7, no waiting
- **Free tier**: 10,000 calls/month included

## 🐛 Issues?

### "Failed to authenticate"
→ Check your API keys in `.env.local`

### "Microphone access denied"
→ Allow microphone in browser settings

### "No audio"
→ Check system volume and browser audio permissions

## 📚 Need More Details?

See the full guide: `HUME_VOICE_SETUP_GUIDE.md`

## 🎉 You're Live!

Your visitors can now get immediate voice guidance about car accidents. The AI will:

✅ Provide empathetic, clear guidance
✅ Adapt to their level of understanding
✅ Never give direct legal advice
✅ Always encourage consulting an attorney
✅ Focus on Georgia-specific laws

---

**Questions?** Check the full setup guide or visit: https://docs.hume.ai/

