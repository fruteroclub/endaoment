# 🎯 Farcaster Mini App Registration Guide

## Your Production URL
**Base URL**: `https://endaoment-mvp.vercel.app`

---

## 📋 Pre-Registration Checklist

### 1. Update Environment Variables

Add to your Vercel environment variables:

```bash
NEXT_PUBLIC_APP_URL=https://endaoment-mvp.vercel.app
```

**How to add in Vercel:**
1. Go to https://vercel.com/your-project/settings/environment-variables
2. Add `NEXT_PUBLIC_APP_URL` with value `https://endaoment-mvp.vercel.app`
3. Redeploy: `git push` or redeploy from Vercel dashboard

### 2. Verify Your Manifest is Accessible

Your Mini App manifest must be publicly accessible at:
```
https://endaoment-mvp.vercel.app/api/miniapp-manifest
```

**Test it now:**
```bash
curl https://endaoment-mvp.vercel.app/api/miniapp-manifest
```

**Expected response:**
```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "1",
    "name": "Endaoment",
    "iconUrl": "https://endaoment-mvp.vercel.app/logo.svg",
    "homeUrl": "https://endaoment-mvp.vercel.app",
    "splashImage": "https://endaoment-mvp.vercel.app/thumbnail.jpg",
    "splashBackgroundColor": "#0052FF"
  }
}
```

### 3. Verify Your Frames Work

Test your Farcaster Frames:

**Vault Created Frame:**
```
https://endaoment-mvp.vercel.app/api/frames/vault-created?name=Test+Vault&whale=John+Doe&amount=10000
```

**Student Profile Frame:**
```
https://endaoment-mvp.vercel.app/api/frames/student?name=Ana+Silva&university=USP&research=Renewable+Energy&funding=500
```

Open these URLs in a browser to verify the HTML meta tags are correct.

---

## 🚀 Registration Steps

### Option 1: Register via Base App Directory (Recommended)

1. **Visit the Base App Directory**
   ```
   https://base.org/mini-apps
   ```

2. **Click "Submit a Mini App" or "Register App"**

3. **Fill in the Application Form:**

   **Basic Information:**
   - **App Name**: `Endaoment`
   - **Short Description**: `Fund students through DeFi yield`
   - **Long Description**: 
     ```
     Endaoment connects institutional donors (whales) with students through 
     an innovative DeFi yield mechanism. Whales deposit stablecoins into 
     ERC-4626 vaults, and the generated yield automatically funds student 
     education. Students vote to allocate yields democratically, creating 
     a sustainable endowment model powered by blockchain technology.
     ```
   
   **URLs:**
   - **App URL**: `https://endaoment-mvp.vercel.app`
   - **Manifest URL**: `https://endaoment-mvp.vercel.app/api/miniapp-manifest`
   - **Home URL**: `https://endaoment-mvp.vercel.app`
   - **Frame URL** (optional): `https://endaoment-mvp.vercel.app/api/frames/vault-created`
   
   **Assets:**
   - **Logo/Icon**: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png` (192x192px or 512x512px)
   - **Splash Image**: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png` (1200x630px)
   - **Screenshots**: Take screenshots of your app (recommended 3-5 images)
   
   **Categories:**
   - DeFi
   - Social Impact
   - Education
   
   **Smart Contracts:**
   - **Network**: Base Mainnet
   - **Contracts**: (Add your deployed contract addresses)
     - EndaomentVault: `0x...` (from deployment)
     - AllocationManager: `0x...`
     - StudentRegistry: `0x...`
   
   **Social Links:**
   - **Website**: `https://endaoment-mvp.vercel.app`
   - **Twitter/X**: (if you have one)
   - **Discord**: (if you have one)
   - **GitHub**: `https://github.com/your-repo` (if public)

4. **Verification**
   - Base will verify your manifest is accessible
   - They may test your app in Warpcast
   - This can take 24-48 hours

5. **Approval**
   - Once approved, your app appears in the Base App Directory
   - Users can discover and add your Mini App in Warpcast

---

### Option 2: Register via Farcaster Ecosystem

1. **Visit Farcaster Ecosystem Site**
   ```
   https://ecosystem.farcaster.xyz
   ```

2. **Submit Your Mini App**
   - Similar form to Base
   - Provide the same information

---

## 🧪 Testing Your Mini App in Warpcast

### Before Registration Approval

You can test your Mini App immediately:

1. **Open Warpcast Mobile App**

2. **Access Your Mini App Directly:**
   - Go to any cast or compose
   - Type your app URL: `https://endaoment-mvp.vercel.app`
   - Warpcast will render it as a Frame

3. **Test Frames:**
   - Share a Frame URL in a cast
   - Example: Post `https://endaoment-mvp.vercel.app/api/frames/vault-created?name=My+Vault&whale=Test&amount=1000`
   - Warpcast will render the Frame with buttons

### After Registration Approval

1. **In Warpcast Discover Tab:**
   - Users can find "Endaoment" in the Mini Apps section
   - Click to open in full-screen mode

2. **Enhanced Features:**
   - Full-screen Mini App experience
   - Farcaster identity integration
   - Share button for Frames
   - Better discovery

---

## 🔍 Verification Checklist

Before submitting, verify:

- [ ] **Environment variable set**: `NEXT_PUBLIC_APP_URL` on Vercel
- [ ] **Manifest accessible**: `curl https://endaoment-mvp.vercel.app/api/miniapp-manifest` returns valid JSON
- [ ] **Logo exists**: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png` loads
- [ ] **Splash image exists**: `https://endaoment-mvp.vercel.app/logo/endaoment-logo.png` loads
- [ ] **Frames work**: Test Frame URLs render meta tags
- [ ] **App loads**: `https://endaoment-mvp.vercel.app` opens and works
- [ ] **Wallet connect works**: Test connecting wallet on Base mainnet
- [ ] **Smart contracts deployed**: Contracts are on Base mainnet and verified
- [ ] **SSL certificate**: HTTPS works (Vercel provides this)

---

## 📱 Expected User Flow

### 1. Discovery
User finds "Endaoment" in Warpcast Mini Apps directory

### 2. Open App
Clicks to open in full-screen Farcaster browser

### 3. Connect Wallet
- Clicks "Connect Wallet"
- OnchainKit handles wallet connection
- Automatically detects Base network

### 4. Use App
- **Whales**: Create vaults, deposit USDC
- **Students**: View funding, vote on allocations
- **Anyone**: Browse students, see vaults

### 5. Share
- Share vault creation as a Frame
- Share student profiles as Frames
- Frames appear in Farcaster feed with rich previews

---

## 🎨 Asset Requirements

### Logo/Icon
- **Format**: PNG
- **Size**: 192x192px or 512x512px (square)
- **Style**: Simple, recognizable blue logo with "DAO" highlighted
- **Current**: `/logo/endaoment-logo.png`

### Splash Image
- **Format**: PNG
- **Size**: 1200x630px (og:image size)
- **Use**: Shown while app loads
- **Current**: `/logo/endaoment-logo.png`

### Screenshots (Recommended)
Take 3-5 screenshots showing:
1. Home page
2. Vault creation
3. Student profiles
4. Allocation voting
5. Dashboard

---

## 🔐 Security Considerations

### Manifest Signature
The `accountAssociation` in your manifest should be properly signed. Currently, it's using a placeholder. For production:

1. Generate a proper signature using your domain
2. Or use Base's manifest generator tool
3. This proves you own the domain

**For hackathon/demo**: The current setup is fine!

---

## 📊 Post-Registration

### Analytics
Track your Mini App usage:
- Warpcast provides basic analytics
- Add your own analytics (Google Analytics, Mixpanel)
- Monitor smart contract events

### Updates
To update your Mini App:
1. Deploy changes to Vercel (Git push)
2. Manifest updates automatically
3. No re-approval needed for app updates
4. Only re-approval needed for metadata changes

### Promotion
Share your Mini App:
1. **Post on Farcaster**: Share Frames showcasing features
2. **Tag @base**: Get attention from Base team
3. **Community**: Share in crypto/DeFi communities
4. **Hackathon**: Show at ETHLatam!

---

## 🆘 Troubleshooting

### "Manifest not found"
- Verify URL is accessible
- Check NEXT_PUBLIC_APP_URL env var
- Redeploy after setting env var

### "Invalid manifest format"
- Verify JSON format at `/api/miniapp-manifest`
- Check all required fields are present

### "Frame not rendering"
- Verify meta tags in HTML
- Test with Warpcast Frame Validator
- Check image URLs are accessible

### "Wallet not connecting"
- Ensure Base mainnet is configured
- Check wagmi/viem setup
- Verify OnchainKit is properly initialized

---

## 📞 Support Channels

**Base:**
- Discord: https://discord.gg/buildonbase
- Twitter: @base
- Docs: https://docs.base.org

**Farcaster:**
- Discord: https://discord.gg/farcaster
- Docs: https://docs.farcaster.xyz

**Warpcast:**
- Help: https://warpcast.com/~/support

---

## ✅ Quick Action Items

1. **Now:**
   - [ ] Add `NEXT_PUBLIC_APP_URL` to Vercel
   - [ ] Redeploy app
   - [ ] Test manifest: `curl https://endaoment-mvp.vercel.app/api/miniapp-manifest`

2. **After Contract Deployment:**
   - [ ] Note contract addresses
   - [ ] Fill registration form
   - [ ] Submit to Base App Directory

3. **While Waiting for Approval:**
   - [ ] Test in Warpcast by sharing Frame URLs
   - [ ] Take screenshots for submission
   - [ ] Prepare marketing materials

4. **After Approval:**
   - [ ] Announce on Farcaster
   - [ ] Share at ETHLatam
   - [ ] Collect feedback

---

## 🎉 Ready to Submit!

**Registration URL**: https://base.org/mini-apps

**Your App URL**: https://endaoment-mvp.vercel.app

**Your Manifest**: https://endaoment-mvp.vercel.app/api/miniapp-manifest

Good luck! 🚀

