# 🚀 Quick Setup Guide - Farcaster Mini App

## ⚡ 5-Minute Setup

### 1. Get OnchainKit API Key

1. Visit https://portal.cdp.coinbase.com/products/onchainkit
2. Sign in with Coinbase account
3. Create a new project
4. Copy your API key

### 2. Set Environment Variables

Create `packages/nextjs/.env.local`:

```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Install & Run

```bash
# Already installed! Just run:
cd packages/nextjs
yarn start
```

### 4. Test Locally

Open http://localhost:3000 - The app now works with OnchainKit!

---

## 🌐 Deploy to Production

### Deploy to Vercel

```bash
cd packages/nextjs
yarn vercel
```

**Set these environment variables in Vercel:**
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` = Your OnchainKit key
- `NEXT_PUBLIC_APP_URL` = `https://your-app.vercel.app`

### Test Your Frames

After deployment, test frame URLs:

**Vault Frame**:
```
https://your-app.vercel.app/api/frames/vault-created?name=My%20Vault&whale=Vitalik&amount=5000
```

**Student Frame**:
```
https://your-app.vercel.app/api/frames/student?name=Ana%20Silva&university=USP&research=AI%20Research&funding=1200&id=1
```

Paste these URLs in Warpcast to see the frame previews!

---

## 📱 What Changed

### ✅ OnchainKit Integration
- Replaced RainbowKit with OnchainKit
- Better Base ecosystem integration
- Farcaster-ready out of the box

### ✅ Farcaster Context Detection
- Automatically detects if running in Farcaster
- Provides user info (FID, username, pfp)
- Falls back to normal mode in browser

### ✅ Frame Endpoints
- `/api/frames/vault-created` - Share vault creation
- `/api/frames/student` - Share student profiles
- `/api/miniapp-manifest` - Miniapp metadata

### ✅ Share Components
- `<ShareVaultCreated />` - Share when creating vault
- `<ShareStudent />` - Share student profiles
- Only visible when in Farcaster context

---

## 🎯 Using in Your Code

### Check if in Farcaster

```typescript
import { useFarcaster } from "~~/components/providers/FarcasterProvider";

function MyComponent() {
  const { isFrameContext, username } = useFarcaster();
  
  if (isFrameContext) {
    return <p>Welcome from Farcaster, {username}!</p>;
  }
  return <p>Welcome!</p>;
}
```

### Add Share Button

```typescript
import { ShareVaultCreated } from "~~/components/FarcasterShareButton";

// After user creates a vault
<ShareVaultCreated 
  vaultName="My Vault"
  whale={whaleAddress}
  amount="5000"
/>
```

---

## ✅ Backward Compatibility

**Good news**: The app still works perfectly as a standalone web app!

- ✅ Works in normal browser
- ✅ Works with MetaMask, Coinbase Wallet, etc.
- ✅ No breaking changes to existing functionality
- ✅ Farcaster features only show when relevant

---

## 🆘 Troubleshooting

**"Cannot find module @coinbase/onchainkit"**
→ Run `yarn install` in packages/nextjs

**Frames don't show in Warpcast**
→ Make sure app is deployed with HTTPS
→ Check NEXT_PUBLIC_APP_URL is set correctly

**Wallet not connecting**
→ Try clearing browser cache
→ Check you're on Base Sepolia network

---

## 📚 Next Steps

1. ✅ **Deploy**: Get the app live on Vercel
2. ✅ **Test Frames**: Share frames in Warpcast
3. ✅ **Submit to Base**: Apply for Base App listing
4. ✅ **Share**: Tell the world about your miniapp!

---

**Full Documentation**: See `FARCASTER_MINIAPP.md` for complete details.

