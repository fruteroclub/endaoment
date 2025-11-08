# 🚀 Mini App Registration - Quick Checklist

## Step 1: Environment Variable (5 minutes)

### In Vercel Dashboard:
1. Go to: https://vercel.com/your-project/settings/environment-variables
2. Add variable:
   - **Name**: `NEXT_PUBLIC_APP_URL`
   - **Value**: `https://endaoment-mvp.vercel.app`
   - **Environments**: Production, Preview, Development
3. Click "Save"
4. Redeploy (or push to Git)

### Verify:
```bash
curl https://endaoment-mvp.vercel.app/api/miniapp-manifest
```

Should return valid JSON ✅

---

## Step 2: Deploy Contracts (10-15 minutes)

```bash
cd packages/hardhat
yarn deploy:base
# Enter your password when prompted
# Wait 3-5 minutes

# Note contract addresses:
yarn info:base
```

**Save these addresses** - you'll need them for registration!

---

## Step 3: Register Mini App (10 minutes)

### Visit: https://base.org/mini-apps

### Fill Form:

**Basic Info:**
- App Name: `Endaoment`
- Description: `Fund students through DeFi yield`

**URLs:**
- App URL: `https://endaoment-mvp.vercel.app`
- Manifest: `https://endaoment-mvp.vercel.app/api/miniapp-manifest`

**Assets:**
- Logo: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png`
- Splash: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png`

**Contracts:**
- Network: Base Mainnet
- Add your deployed contract addresses

**Submit!** ✅

---

## Step 4: Test in Warpcast (Immediate)

### Don't wait for approval!

1. Open Warpcast mobile app
2. Create a new cast
3. Paste: `https://endaoment-mvp.vercel.app`
4. It will render as a Frame!

### Or test a specific Frame:
```
https://endaoment-mvp.vercel.app/api/frames/vault-created?name=Demo+Vault&whale=ETHLatam&amount=10000
```

---

## ⏱️ Timeline

| Step | Time | Status |
|------|------|--------|
| Environment variable | 5 min | ⚪ |
| Redeploy app | 3 min | ⚪ |
| Deploy contracts | 10 min | ⚪ |
| Submit registration | 10 min | ⚪ |
| **Approval wait** | **24-48h** | ⏳ |
| Test in Warpcast | Immediate! | ✅ |

---

## 🎯 Hackathon Priority

**For ETHLatam demo:**

✅ **Do now:**
- Deploy contracts to Base
- Set environment variable
- Test Frames in Warpcast (works immediately!)

⏳ **Do but don't wait:**
- Submit Mini App registration
- Approval takes 1-2 days, but app works in Warpcast now!

---

## 📱 Demo at Hackathon

**You can demo immediately** even without approval:

1. Show the web app: `https://endaoment-mvp.vercel.app`
2. Show Frames working in Warpcast
3. Show wallet connect with OnchainKit
4. Show vault creation on Base mainnet
5. Show student allocation voting

The Mini App works fully - approval just adds it to the directory!

---

**Questions?** See full guide: `FARCASTER_MINIAPP_REGISTRATION.md`

