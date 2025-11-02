# Hume AI Voice Assistant Setup Guide

This guide will help you integrate Hume AI's Empathic Voice Interface (EVI) into your car crash legal guidance website.

## 🎯 Overview

The voice assistant allows visitors to have natural, empathetic conversations about car accidents in Atlanta. It's designed to work for both accident victims and personal injury attorneys, adapting its language based on the user's level of legal understanding.

## 📋 What's Been Installed

Your project now includes:

1. **Hume Package**: Already installed (`hume@0.15.2`)
2. **API Route**: `/src/app/api/hume/auth/route.ts` - Generates access tokens
3. **Voice Component**: `/src/components/voice/voice-assistant.tsx` - Main interface
4. **Voice Page**: `/src/app/voice-assistant/page.tsx` - Public-facing page
5. **Navigation**: Added to main header menu

## 🚀 Setup Steps

### Step 1: Get Your Hume API Credentials

1. Go to [Hume AI Platform](https://platform.hume.ai/)
2. Log in to your account
3. Navigate to **Settings > API Keys**
4. Create a new API key if you don't have one
5. Copy both:
   - **API Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### Step 2: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Hume credentials:
   ```env
   HUME_API_KEY=your_api_key_here
   HUME_SECRET_KEY=your_secret_key_here
   ```

3. **Important**: Never commit `.env.local` to git (it's already in .gitignore)

### Step 3: (Optional) Create a Custom Voice Configuration

For better results, you can create a custom EVI configuration:

1. Go to [Hume Configurations](https://platform.hume.ai/configurations)
2. Click "Create New Configuration"
3. Customize voice settings:
   - **Voice**: Choose a warm, empathetic voice (recommended: "Mysterious Woman" or "Vince Douglas")
   - **Language**: English (US)
   - **Turn-taking**: Enable natural conversation flow
   - **Emotion Detection**: Enable all emotions
4. Save and copy the **Config ID**
5. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_HUME_CONFIG_ID=your_config_id_here
   ```

### Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/voice-assistant`

3. Click "Start Voice Call"

4. Allow microphone access when prompted

5. Try asking: "What should I do immediately after a car accident?"

## 🎙️ How It Works

### System Prompt

The voice assistant is configured with a comprehensive system prompt that:

- Provides compassionate, empathetic responses
- Uses simple language by default
- Adapts to attorney-level terminology when needed
- Never gives direct legal advice
- Encourages consulting with licensed attorneys
- Focuses on Georgia-specific car accident laws

### Key Features

1. **Real-time Voice Conversation**: Natural back-and-forth dialogue
2. **Emotion Detection**: AI understands user emotions and responds appropriately
3. **Transcript Display**: Shows conversation history on screen
4. **Mobile-Friendly**: Works on all devices with microphone access
5. **24/7 Availability**: Always ready to help

### Topics Covered

- Immediate steps after an accident
- Documentation and evidence collection
- Dealing with insurance companies
- Understanding Georgia fault laws
- Types of compensation available
- Statute of limitations (2 years in Georgia)
- When to hire an attorney
- Common mistakes to avoid

## 🔧 Customization

### Modify the System Prompt

Edit `/src/components/voice/voice-assistant.tsx` and find the `SYSTEM_PROMPT` constant (around line 27). You can adjust:

- Tone and empathy level
- Legal topics covered
- Geographic focus
- Terminology preferences
- Disclaimer strength

### Change Voice Settings

If using a custom config, you can adjust in the Hume dashboard:

- Voice persona
- Speaking speed
- Emotion sensitivity
- Interruption handling
- Turn-taking behavior

### Styling and Layout

The component uses Tailwind CSS. Modify `/src/components/voice/voice-assistant.tsx` to adjust:

- Colors and branding
- Button styles
- Layout structure
- Mobile responsiveness

## 📊 Usage Analytics

To track usage, you can add analytics:

```typescript
// In voice-assistant.tsx, add to connectToVoiceAssistant():
socketRef.current.onopen = () => {
  // Track connection
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'voice_call_started');
  }
};

socketRef.current.onclose = () => {
  // Track disconnection
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'voice_call_ended');
  }
};
```

## 🔒 Security & Privacy

### Best Practices

1. **Never expose secret keys**: Keep them in `.env.local` only
2. **Use server-side token generation**: The API route handles this
3. **Rate limiting**: Consider adding rate limits to `/api/hume/auth`
4. **HTTPS only**: Always use HTTPS in production
5. **User consent**: Get microphone permission before connecting

### Privacy Features

- No conversation data stored on your servers
- Audio processed by Hume AI (see their privacy policy)
- Transcripts are client-side only
- No user identification required

## 🐛 Troubleshooting

### "Failed to authenticate" Error

**Solution**: Check that your API credentials are correct in `.env.local`

```bash
# Verify they're set:
echo $HUME_API_KEY
echo $HUME_SECRET_KEY
```

### Microphone Access Denied

**Solution**: 
1. Check browser permissions
2. Use HTTPS (required for microphone access)
3. Try different browser

### No Audio Response

**Solution**:
1. Check system volume
2. Verify browser audio permissions
3. Check browser console for errors
4. Ensure AudioContext is supported

### Connection Timeout

**Solution**:
1. Check internet connection
2. Verify API credentials are valid
3. Check Hume AI status page
4. Review browser console for WebSocket errors

### TypeScript Errors

If you see TypeScript errors about `Hume.Client`, run:

```bash
npm install @types/node --save-dev
```

## 💰 Pricing & Limits

### Hume AI Pricing

- **Free Tier**: 10,000 API calls/month
- **Usage-based**: $0.015 per minute of conversation
- **Enterprise**: Custom pricing

Monitor your usage at: [https://platform.hume.ai/usage](https://platform.hume.ai/usage)

### Optimization Tips

1. **Session Duration**: Consider limiting call length
2. **Token Reuse**: Tokens last 1 hour, cache if needed
3. **Error Handling**: Implement retry logic with exponential backoff
4. **Rate Limiting**: Add on your API route

## 🎯 Best Practices for Legal Guidance

### Do's

✅ Provide general legal information
✅ Explain common processes and procedures
✅ Suggest when to consult an attorney
✅ Show empathy and understanding
✅ Use plain language
✅ Give practical next steps

### Don'ts

❌ Give specific legal advice
❌ Guarantee case outcomes
❌ Create attorney-client relationship
❌ Provide medical advice
❌ Make predictions about settlements
❌ Override attorney recommendations

## 📱 Testing Scenarios

Test with these example queries:

1. **Emergency**: "I just had a car accident, what do I do?"
2. **Insurance**: "The insurance company called me, should I give a statement?"
3. **Attorney**: "How do I find a good car accident lawyer?"
4. **Timeline**: "How long do I have to file a claim in Georgia?"
5. **Injuries**: "My back hurts but I didn't go to the hospital, is it too late?"
6. **Fault**: "The other driver is blaming me, what should I do?"

## 🔄 Updates & Maintenance

### Updating Hume Package

```bash
npm update hume
```

### Checking for Breaking Changes

Monitor Hume's changelog: [https://docs.hume.ai/changelog](https://docs.hume.ai/changelog)

### Version Compatibility

- Current: `hume@0.15.2`
- Next.js: `15.3.3`
- React: `19.0.0`

## 📚 Additional Resources

- [Hume AI Documentation](https://docs.hume.ai/)
- [EVI Quickstart Guide](https://docs.hume.ai/evi/quickstart)
- [Voice Configuration Guide](https://docs.hume.ai/evi/configuration)
- [API Reference](https://docs.hume.ai/api-reference)
- [Community Discord](https://discord.gg/hume)

## 🆘 Support

### If You Get Stuck

1. Check browser console for errors
2. Review Hume AI documentation
3. Test with Hume's playground first
4. Check API status page
5. Contact Hume support: support@hume.ai

### Common Issues & Solutions

See the Troubleshooting section above for the most common issues.

---

## ✅ Quick Checklist

- [ ] Hume account created
- [ ] API key and secret key obtained
- [ ] Credentials added to `.env.local`
- [ ] Development server restarted
- [ ] Navigated to `/voice-assistant`
- [ ] Microphone access granted
- [ ] Test call completed successfully
- [ ] Custom voice config created (optional)
- [ ] System prompt customized (optional)
- [ ] Analytics added (optional)

## 🎉 You're Ready!

Your voice assistant is now configured and ready to help people navigate the aftermath of car accidents in Atlanta. The AI will provide empathetic, informative guidance while always encouraging users to seek professional legal advice for their specific situations.

Visit: `https://yourdomain.com/voice-assistant` to see it live!

