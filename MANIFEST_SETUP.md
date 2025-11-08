# 📝 Farcaster/Base Manifest Setup Guide

## Current Status

✅ Manifest file created at: `/public/.well-known/farcaster.json`
✅ Will be accessible at: `https://endaoment-mvp.vercel.app/.well-known/farcaster.json`

## 🔧 Required Setup Steps

### Step 1: Generate Account Association

You need to sign your manifest to prove domain ownership.

1. **Go to Base Build Account Association Tool**
   ```
   https://www.base.dev/preview?tab=account
   ```

2. **Enter your domain**
   ```
   endaoment-mvp.vercel.app
   ```
   (Note: Enter without `https://`)

3. **Click "Submit" then "Verify"**
   - Sign with your wallet
   - Copy the generated fields: `header`, `payload`, `signature`

4. **Update the manifest file**
   Edit `/public/.well-known/farcaster.json` and replace the empty `accountAssociation` fields:
   ```json
   "accountAssociation": {
     "header": "YOUR_GENERATED_HEADER",
     "payload": "YOUR_GENERATED_PAYLOAD",
     "signature": "YOUR_GENERATED_SIGNATURE"
   }
   ```

### Step 2: Add Base Builder Owner (Optional)

If you want to connect your Base Build account:

```json
"baseBuilder": {
  "ownerAddress": "0xYourWalletAddress"
}
```

This should be the wallet address you use for Base Build.

### Step 3: Add Webhook URL (Optional)

If you want to support notifications:

```json
"webhookUrl": "https://endaoment-mvp.vercel.app/api/webhook"
```

### Step 4: Add Screenshots (Optional but Recommended)

Take 3 screenshots of your app (portrait 1284×2778px):

```json
"screenshotUrls": [
  "https://endaoment-mvp.vercel.app/screenshots/1.png",
  "https://endaoment-mvp.vercel.app/screenshots/2.png",
  "https://endaoment-mvp.vercel.app/screenshots/3.png"
]
```

## 🚀 Deployment

### Deploy to Vercel

```bash
# Commit the changes
git add packages/nextjs/public/.well-known/farcaster.json
git commit -m "Add Farcaster manifest for Base directory"
git push

# Vercel will auto-deploy
```

### Verify Manifest is Live

After deployment, test:

```bash
curl https://endaoment-mvp.vercel.app/.well-known/farcaster.json
```

Should return your manifest JSON.

## 📋 Verification Checklist

After deployment:

- [ ] Manifest accessible at `/.well-known/farcaster.json`
- [ ] `accountAssociation` fields are filled (not empty)
- [ ] All URLs use HTTPS and point to your domain
- [ ] Icon image loads (1024×1024px PNG)
- [ ] Splash image loads (200×200px recommended)
- [ ] Hero/OG image loads (1200×630px)
- [ ] `noindex` is `false` (so it appears in search)
- [ ] Category matches your app (`finance`)
- [ ] Tags are relevant and lowercase

## 🔍 Testing in Base App

1. Open Base App on mobile
2. Search for "Endaoment" in the Mini Apps section
3. Your app should appear with:
   - Icon
   - Name and subtitle
   - Description
   - Tags

## 📊 Directory Indexing

After your manifest is live and verified:

- **Indexing time**: 24-48 hours
- **Re-indexing**: Happens daily automatically
- **Manual refresh**: Use Base Build dashboard to force refresh

## 🎨 Asset Requirements

### Icon (`iconUrl`)
- **Format**: PNG
- **Size**: 1024×1024px
- **Background**: Solid color preferred (not transparent)
- **Current**: `/logo/endaoment-logo.png` ✅

### Splash Image (`splashImageUrl`)
- **Format**: PNG
- **Size**: 200×200px recommended
- **Background**: Matches `splashBackgroundColor`
- **Current**: `/logo/endaoment-logo.png` ✅

### Hero Image (`heroImageUrl`, `ogImageUrl`)
- **Format**: PNG or JPG
- **Size**: 1200×630px (1.91:1 aspect ratio)
- **Current**: `/logo/endaoment-logo.png` ⚠️ (Should be 1200×630px)

### Screenshots (`screenshotUrls`)
- **Format**: PNG or JPG
- **Size**: Portrait 1284×2778px (iPhone 13 Pro Max)
- **Count**: Max 3
- **Current**: Empty ⚠️ (Recommended to add)

## 🛠️ Generate Proper Assets

Use the [Mini App Assets Generator](https://www.miniappassets.com/) to create properly formatted images.

Or create them manually:
- Icon: 1024×1024px PNG with your logo centered
- Hero: 1200×630px with app name, tagline, and preview
- Screenshots: Capture from your app or create mockups

## 📝 Current Manifest Values

```json
{
  "name": "Endaoment",
  "subtitle": "Fund students via DeFi yield",
  "description": "Endaoment connects institutional donors with students through an innovative DeFi yield mechanism. Whales deposit stablecoins, and generated yield automatically funds student education.",
  "primaryCategory": "finance",
  "tags": ["defi", "education", "yield", "social-impact", "dao"],
  "tagline": "Fund education with yield"
}
```

## 🔗 Useful Links

- **Base Build Dashboard**: https://www.base.dev/
- **Account Association Tool**: https://www.base.dev/preview?tab=account
- **Mini App Assets Generator**: https://www.miniappassets.com/
- **Base Mini Apps Docs**: https://docs.base.org/mini-apps/

## ⚠️ Common Issues

### "Manifest not found"
- Ensure file is in `/public/.well-known/farcaster.json`
- Check file is deployed to Vercel
- Test URL manually in browser

### "Invalid account association"
- Make sure you signed with the correct wallet
- Domain in payload must match exactly (no `https://`, no trailing `/`)
- Regenerate if needed

### "App not appearing in search"
- Wait 24-48 hours for indexing
- Ensure `noindex` is `false`
- Verify manifest has all required fields
- Check Base Build dashboard for errors

## 🎉 Next Steps

1. Generate account association (Step 1 above)
2. Update manifest with association fields
3. Commit and push to trigger Vercel deployment
4. Wait 24-48 hours for Base directory to index
5. Search for your app in Base App!

---

**Need help?** Check the full Base Mini Apps documentation: https://docs.base.org/mini-apps/

