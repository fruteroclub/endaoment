# Epic 2: Farcaster Miniapp Migration

**Duration**: 3 days (Days 5-7)
**Status**: ⏳ TODO
**Goal**: Convert Scaffold-ETH 2 web app to Farcaster Miniapp

---

## Epic Overview

Transform the existing web application into a Farcaster Miniapp by:
- Adding MiniKit SDK for wallet and identity
- Creating Farcaster Frames for social sharing
- Implementing Miniapp manifest
- Testing in Base App (iOS/Android)

**All core functionality from Epic 1 remains unchanged** - this is purely additive.

---

## Tickets

### 🔲 E2-T1: Install MiniKit Dependencies
**Status**: ⏳ TODO
**Assignee**: Unassigned
**Estimated Hours**: 0.5h
**Dependencies**: ✅ Epic 1 complete

#### Tasks
```bash
yarn workspace @se-2/nextjs add @coinbase/minikit @coinbase/onchainkit
```

#### Files to Create
- `packages/nextjs/components/providers/MinikitProvider.tsx`
- `.env.local` → Add `NEXT_PUBLIC_ONCHAINKIT_API_KEY`

#### Acceptance Criteria
- [ ] Dependencies installed
- [ ] MinikitProvider created
- [ ] App wraps with OnchainKitProvider
- [ ] No build errors

---

### 🔲 E2-T2: Replace RainbowKit with MiniKit Wallet
**Status**: ⏳ TODO
**Estimated Hours**: 2-3h
**Dependencies**: ✅ E2-T1

#### Tasks
- Remove RainbowKitProvider usage
- Add MiniKit wallet connect component
- Update "Connect Wallet" buttons

#### Acceptance Criteria
- [ ] MiniKit wallet connection works
- [ ] Farcaster identity detected
- [ ] Wallet address displays
- [ ] Disconnect works

---

### 🔲 E2-T3: Create Student Profile Frames
**Status**: ⏳ TODO
**Estimated Hours**: 3-4h

#### Files
- `app/student/[id]/opengraph-image.tsx`
- `components/ShareFrame.tsx`

#### Acceptance Criteria
- [ ] Student profile generates Frame
- [ ] Frame displays in Warpcast preview
- [ ] Clicking Frame opens Miniapp
- [ ] 8 students all have Frames

---

### 🔲 E2-T4: Donation/Allocation Success Frames
**Status**: ⏳ TODO
**Estimated Hours**: 2-3h

#### Acceptance Criteria
- [ ] "Share on Farcaster" button works
- [ ] Generates Frame with donation info
- [ ] Generates Frame with allocation breakdown
- [ ] Frames preview correctly

---

### 🔲 E2-T5: Miniapp Manifest Endpoint
**Status**: ⏳ TODO
**Estimated Hours**: 1h

#### Files
- `app/api/miniapp-manifest/route.ts`

---

### 🔲 E2-T6: Test in Base App
**Status**: ⏳ TODO
**Estimated Hours**: 2-3h

#### Acceptance Criteria
- [ ] Opens from Frame in Base App
- [ ] Wallet connects automatically
- [ ] All navigation works
- [ ] No mobile-specific bugs

---

**Epic 2 Total**: ~12-16 hours → 2-3 days
**Next**: [Epic 3 - Wallet Integration](epic-3-wallet-integration.md)
