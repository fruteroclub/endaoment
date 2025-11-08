# 🟣 Farcaster Mini App - Endaoment

Endaoment is now fully integrated as a Farcaster Mini App using OnchainKit and the Farcaster Frame SDK!

---

## ✅ What Was Implemented

### 1. OnchainKit Migration ✅
- ✅ Replaced RainbowKit with OnchainKit
- ✅ Maintains backward compatibility (works standalone + in Farcaster)
- ✅ Smooth wallet connection in both contexts

### 2. Farcaster Context Detection ✅
- ✅ `FarcasterProvider` automatically detects Farcaster frame context
- ✅ Provides user info (FID, username, pfp) when available
- ✅ Gracefully falls back to standard web app mode

### 3. Farcaster Frames ✅
- ✅ **Vault Creation Frame**: Share when whale creates a new vault
- ✅ **Student Profile Frame**: Share individual student profiles
- ✅ Dynamic OG images with frame metadata
- ✅ Interactive frame buttons

### 4. Miniapp Manifest ✅
- ✅ `/api/miniapp-manifest` endpoint
- ✅ Proper capabilities declaration
- ✅ App metadata and branding

### 5. Share Components ✅
- ✅ `FarcasterShareButton` - Conditionally visible in Farcaster
- ✅ `ShareVaultCreated` - Share vault creation
- ✅ `ShareStudent` - Share student profiles
- ✅ Auto-opens Warpcast composer with frame

---

## 🚀 How to Deploy as Farcaster Mini App

### Step 1: Set Up Environment Variables

Create `.env.local` in `packages/nextjs/`:

```bash
# Required: OnchainKit API Key
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_from_coinbase

# Required: Your deployed app URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Get OnchainKit API Key**:
1. Go to https://portal.cdp.coinbase.com/products/onchainkit
2. Create a new project
3. Copy your API key

### Step 2: Deploy to Vercel

```bash
cd packages/nextjs
yarn vercel
```

**Important**: Make sure to set `NEXT_PUBLIC_ONCHAINKIT_API_KEY` and `NEXT_PUBLIC_APP_URL` in Vercel environment variables!

### Step 3: Test Frames

**Test Frame URLs**:

**Vault Creation Frame**:
```
https://your-app.vercel.app/api/frames/vault-created?name=Education%20Vault&whale=Vitalik&amount=10000
```

**Student Profile Frame**:
```
https://your-app.vercel.app/api/frames/student?name=Ana%20Silva&university=USP&research=AI%20for%20Healthcare&funding=1200&id=1
```

**Test in Warpcast**:
1. Open Warpcast app or https://warpcast.com
2. Create a new cast
3. Paste the frame URL
4. Click the embed preview

### Step 4: Publish Miniapp to Base App

1. Go to Base App settings (https://www.coinbase.com/wallet/miniapps)
2. Submit your miniapp
3. Provide manifest URL: `https://your-app.vercel.app/api/miniapp-manifest`
4. Wait for approval

---

## 📱 Using the Miniapp

### In Regular Web Browser

The app works exactly as before - users connect their wallets normally and interact with vaults.

### In Farcaster (Warpcast or Base App)

1. **From Frame**: User clicks frame in Warpcast → Opens in Base App
2. **Auto-Connect**: Farcaster wallet connects automatically
3. **Share Buttons**: Additional "Share on Farcaster" buttons appear
4. **Social Context**: User's Farcaster identity is available

---

## 🧩 Architecture

### Provider Hierarchy

```
WagmiProvider (wallet connection)
  └── OnchainKitProvider (Base + Farcaster features)
      └── FarcasterProvider (context detection)
          └── App Components
```

### Dual-Mode Operation

**Standalone Web App Mode**:
- User visits website directly
- Standard wallet connection (MetaMask, Coinbase Wallet)
- No Farcaster features visible
- Works on any network

**Farcaster Mini App Mode**:
- User enters from Farcaster frame
- Farcaster wallet auto-connects
- Share buttons become visible
- Frames propagate activity to feed

---

## 🎯 Using Share Components

### In Vault Creation Page

```typescript
import { ShareVaultCreated } from "~~/components/FarcasterShareButton";

// After vault is created
<ShareVaultCreated 
  vaultName="Education Vault"
  whale="0x1234...5678"
  amount="10000"
/>
```

### In Student Profile Page

```typescript
import { ShareStudent } from "~~/components/FarcasterShareButton";

// On student profile
<ShareStudent 
  studentName={student.name}
  university={student.university}
  research={student.researchArea}
  funding={student.totalReceived}
  studentId={student.id}
/>
```

### Custom Share Button

```typescript
import { FarcasterShareButton } from "~~/components/FarcasterShareButton";

<FarcasterShareButton 
  frameUrl="https://your-app.vercel.app/api/frames/custom"
  text="Check out this amazing vault!"
/>
```

---

## 🔍 Using Farcaster Context

```typescript
import { useFarcaster } from "~~/components/providers/FarcasterProvider";

function MyComponent() {
  const { isFrameContext, fid, username, displayName } = useFarcaster();

  if (isFrameContext) {
    return <div>Welcome, {displayName}!</div>;
  }

  return <div>Connect your wallet to get started</div>;
}
```

---

## 🎨 Frame Customization

### Update OG Images

Edit frame image generators in:
- `app/api/og/vault-created/route.tsx`
- `app/api/og/student/route.tsx`

### Create New Frame Types

1. Create frame endpoint: `app/api/frames/your-frame/route.ts`
2. Create OG image generator: `app/api/og/your-frame/route.tsx`
3. Create share component wrapper

---

## 📊 Testing Checklist

- [ ] **Standalone Mode**
  - [ ] App loads normally in browser
  - [ ] Wallet connection works
  - [ ] All features function
  - [ ] No Farcaster buttons visible

- [ ] **Frame Mode**
  - [ ] Frame preview shows in Warpcast
  - [ ] Frame buttons work
  - [ ] OG images load correctly
  - [ ] Frame links open in Base App

- [ ] **Mini App Mode** (in Base App)
  - [ ] App opens from frame link
  - [ ] Wallet auto-connects
  - [ ] Share buttons are visible
  - [ ] Share function opens Warpcast composer
  - [ ] All transactions work

---

## 🚨 Known Limitations

- ⚠️ Frames must be publicly accessible (HTTPS required)
- ⚠️ OG images must be under 1MB
- ⚠️ Frame response time must be under 5 seconds
- ⚠️ Miniapp requires Base App approval for distribution

---

## 📚 Resources

- **OnchainKit Docs**: https://onchainkit.xyz/
- **Farcaster Frame Spec**: https://docs.farcaster.xyz/developers/frames/spec
- **Base App**: https://www.coinbase.com/wallet
- **Warpcast Frame Validator**: https://warpcast.com/~/developers/frames

---

## 🎉 What's Next?

Optional enhancements:
- ⭐ Add allocation/distribution frames
- ⭐ Implement frame analytics
- ⭐ Add Farcaster-gated features
- ⭐ Create multi-step interactive frames
- ⭐ Add direct cast notifications

---

**Status**: ✅ Fully Functional Farcaster Mini App  
**Mode**: Dual-mode (Standalone + Farcaster)  
**Ready for**: Hackathon Demo & Submission

