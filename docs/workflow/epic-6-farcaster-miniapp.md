# Epic 6: Farcaster Miniapp Enhancement (Optional)

**Duration**: 10-14 hours
**Status**: ⏳ TODO (Optional)
**Dependencies**: Epic 5 complete (testnet deployment ready)

## Overview

**Optional enhancement** to transform the web app into a Farcaster Miniapp with OnchainKit integration. This epic is **not required** for hackathon submission but adds social distribution through Farcaster Frames.

**Key Insight**: OnchainKit can replace RainbowKit and work in both standalone web app and Farcaster contexts, providing progressive enhancement without breaking existing functionality.

---

## Strategic Approach

### OnchainKit vs RainbowKit
- **RainbowKit**: Current wallet connection provider (web-only)
- **OnchainKit**: Coinbase's framework for Farcaster + Base
  - Works standalone (like RainbowKit)
  - Enhanced in Farcaster context (identity, frames)
  - Single integration for both use cases

### Progressive Enhancement Model
```
Base App (Epic 1-5) → Works as standalone web3 app
                   ↓
Add OnchainKit → Still works standalone
                   ↓
Deploy to Farcaster → Enhanced with social features
```

**Result**: No breaking changes, just additive features.

---

## Tickets

### E6-T1: OnchainKit Migration
**Estimate**: 2-3 hours
**Dependencies**: Epic 5 complete

Replace RainbowKit with OnchainKit for wallet connection.

**Tasks**:
- Install `@coinbase/onchainkit` package
- Remove RainbowKit providers from `layout.tsx`
- Add OnchainKitProvider with Base configuration
- Update wallet connect buttons to use OnchainKit components
- Test wallet connection in standalone mode
- Verify no regression in existing flows

**Code Changes**:
```typescript
// Before (RainbowKit)
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

// After (OnchainKit)
import { OnchainKitProvider } from '@coinbase/onchainkit';

<OnchainKitProvider
  apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
  chain={baseSepolia}
>
  {children}
</OnchainKitProvider>
```

**Acceptance Criteria**:
- [ ] OnchainKit installed and configured
- [ ] Wallet connection works in web browser
- [ ] All existing flows still work (vault, deposit, allocate)
- [ ] No console errors or warnings
- [ ] MetaMask and Coinbase Wallet both work

---

### E6-T2: MiniKit SDK Integration
**Estimate**: 1-2 hours
**Dependencies**: E6-T1

Add MiniKit for Farcaster context detection and identity.

**Tasks**:
- Install `@coinbase/minikit` package
- Create MinikitProvider wrapper component
- Add Farcaster context detection
- Conditionally show Farcaster-specific features
- Test in web browser (should gracefully degrade)

**Code Example**:
```typescript
// components/providers/MinikitProvider.tsx
import { useEffect, useState } from 'react';

export function MinikitProvider({ children }) {
  const [isFarcaster, setIsFarcaster] = useState(false);

  useEffect(() => {
    // Detect if running in Farcaster context
    setIsFarcaster(typeof window !== 'undefined' && window.parent !== window);
  }, []);

  return (
    <FarcasterContext.Provider value={{ isFarcaster }}>
      {children}
    </FarcasterContext.Provider>
  );
}
```

**Acceptance Criteria**:
- [ ] MiniKit SDK installed
- [ ] Farcaster context detected when applicable
- [ ] Web browser mode still works (isFarcaster = false)
- [ ] No breaking changes to existing functionality

---

### E6-T3: Vault Share Frames
**Estimate**: 3-4 hours
**Dependencies**: E6-T2

Create Farcaster Frames for sharing vault activity.

**Frames to Build**:
1. **Vault Creation Frame**: Whale announces new vault
2. **Deposit Success Frame**: Share retail deposit
3. **Allocation Frame**: Share voting choices
4. **Distribution Frame**: Celebrate student funding

**Tasks**:
- Create Frame metadata generator
- Add OG image endpoints for each frame type
- Add "Share on Farcaster" buttons (conditional on `isFarcaster`)
- Test frame previews in Warpcast
- Implement frame action handlers

**Code Example**:
```typescript
// app/api/frames/vault-created/route.ts
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vaultId = searchParams.get('id');

  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imageUrl}" />
        <meta property="fc:frame:button:1" content="Join Vault" />
        <meta property="fc:frame:post_url" content="${postUrl}" />
      </head>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
```

**Acceptance Criteria**:
- [ ] Frames generate correct metadata
- [ ] Frame previews work in Warpcast
- [ ] Frame buttons link to correct actions
- [ ] Share buttons only show in Farcaster context
- [ ] Web app users don't see broken frame features

---

### E6-T4: Student Profile Frames
**Estimate**: 2-3 hours
**Dependencies**: E6-T3

Enable students to share their profiles on Farcaster.

**Tasks**:
- Create student profile frame endpoint
- Generate OG images with student info
- Add "Share Profile" button for students
- Link frame actions back to funding flow
- Test all 8 test student profiles

**Acceptance Criteria**:
- [ ] Each student has shareable frame
- [ ] Frame shows student name, research, funding received
- [ ] Frame button links to vault allocation page
- [ ] Profile frames preview correctly in Warpcast

---

### E6-T5: Miniapp Manifest
**Estimate**: 1 hour
**Dependencies**: E6-T1

Create Farcaster Miniapp manifest for Base App.

**Tasks**:
- Create `/api/miniapp-manifest` endpoint
- Define app metadata (name, icon, description)
- Specify supported actions
- Test manifest validation

**Manifest Structure**:
```json
{
  "name": "Endaoment",
  "description": "Yield-generating student funding vaults",
  "icon": "https://endaoment.app/icon.png",
  "homeUrl": "https://endaoment.app",
  "version": "1.0.0",
  "capabilities": {
    "wallet": true,
    "identity": true,
    "frames": true
  }
}
```

**Acceptance Criteria**:
- [ ] Manifest endpoint returns valid JSON
- [ ] Manifest validates against Farcaster spec
- [ ] App metadata is accurate

---

### E6-T6: Base App Testing
**Estimate**: 2-3 hours
**Dependencies**: E6-T3, E6-T4, E6-T5

Test full Miniapp experience in Base App (iOS/Android).

**Test Scenarios**:
1. **Open from Frame**: Click frame in Warpcast → Opens in Base App
2. **Wallet Auto-Connect**: Farcaster wallet connects automatically
3. **Navigation**: All app pages work in mobile view
4. **Transactions**: Deposits and allocations succeed
5. **Frame Sharing**: Share buttons work from within Base App

**Testing Checklist**:
- [ ] App opens from frame link
- [ ] Wallet connects without manual intervention
- [ ] All navigation buttons work
- [ ] Mobile layout is functional
- [ ] Transactions complete successfully
- [ ] Share frames post to Warpcast correctly
- [ ] No mobile-specific bugs or crashes

---

## Technical Architecture

### Dual-Mode Operation
```typescript
// Standalone Web App Mode
User visits website directly
↓
OnchainKit provides wallet connection
↓
Standard web3 interactions
↓
No Farcaster features visible

// Farcaster Miniapp Mode
User clicks frame in Warpcast
↓
Opens in Base App
↓
OnchainKit + MiniKit detect Farcaster context
↓
Auto-connect Farcaster wallet
↓
Show additional share buttons
↓
Frames propagate activity to social feed
```

### Component Hierarchy
```
RootLayout
├─ OnchainKitProvider (replaces RainbowKit)
│  └─ MinikitProvider (Farcaster context)
│     └─ App Components
│        ├─ Conditional "Share" buttons
│        └─ Standard functionality
```

---

## Dependencies

### Required from Previous Epics
- ✅ Working web app (Epics 1-2)
- ✅ Smart contracts deployed (Epic 3)
- ✅ Frontend integration complete (Epic 4)
- ✅ Testing and polish done (Epic 5)

### External Services
- OnchainKit API key (free from Coinbase)
- Vercel deployment (for frame hosting)
- Warpcast account (for testing frames)
- Base App (iOS or Android) for Miniapp testing

---

## Not Included (Further Enhancements)

- ❌ Farcaster identity-gated features
- ❌ Social reputation scoring
- ❌ Farcaster-native notifications
- ❌ Direct cast integration for updates
- ❌ Frame analytics tracking
- ❌ Advanced frame interactivity (multi-step frames)

---

## Success Criteria

### Minimum Viable Miniapp
- ✅ OnchainKit replaces RainbowKit (no regression)
- ✅ App works standalone in web browser
- ✅ App works in Base App from frame
- ✅ At least 2 frame types implemented (vault + student)
- ✅ Share buttons functional in Farcaster context
- ✅ Wallet auto-connects in Farcaster

### Optional Enhancements
- ⭐ All 4 frame types (vault, deposit, allocation, distribution)
- ⭐ Student profile frames for all 8 students
- ⭐ Frame analytics (view counts, click-throughs)
- ⭐ Custom frame styling and branding

---

## Deployment Considerations

### Environment Variables
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://endaoment.app
```

### Frame URL Requirements
- Must be publicly accessible (Vercel deployment)
- HTTPS required (Farcaster doesn't support HTTP frames)
- OG images must be under 1MB
- Response time under 5 seconds

### Testing Checklist
- [ ] Deploy to Vercel or public URL
- [ ] Test frames in Warpcast frame validator
- [ ] Open frame in Base App on mobile
- [ ] Verify wallet connection works
- [ ] Test all user flows in Miniapp mode
- [ ] Verify standalone web mode still works

---

## Timeline Estimate

| Ticket | Estimate | Priority |
|--------|----------|----------|
| E6-T1: OnchainKit Migration | 2-3 hours | Critical |
| E6-T2: MiniKit Integration | 1-2 hours | High |
| E6-T3: Vault Share Frames | 3-4 hours | High |
| E6-T4: Student Profile Frames | 2-3 hours | Medium |
| E6-T5: Miniapp Manifest | 1 hour | High |
| E6-T6: Base App Testing | 2-3 hours | Critical |
| **Total** | **10-14 hours** | |

---

## Decision: When to Build This

### Build Now If:
- ✅ Epics 1-5 complete with time remaining
- ✅ Hackathon rewards Farcaster integration
- ✅ Social distribution is valuable for demo
- ✅ Team wants to learn Farcaster development

### Defer If:
- ⏳ Limited time before hackathon deadline
- ⏳ Core features (Epics 3-5) not yet complete
- ⏳ Hackathon doesn't prioritize Farcaster
- ⏳ Want to focus on Base-native features

**Recommendation**: Complete Epics 3-5 first, then assess remaining time for Epic 6.

---

## Deliverables

If Epic 6 is completed:
- ✅ OnchainKit integration (backward compatible)
- ✅ Working Farcaster Miniapp in Base App
- ✅ Shareable frames for vaults and students
- ✅ Miniapp manifest published
- ✅ Tested in both standalone and Farcaster modes

**Status**: Optional enhancement after core MVP ✨
