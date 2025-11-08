# Implementation Ready - Start Here! 🚀

**Status**: Ready to code
**Last Updated**: 2025-11-07
**Next Action**: Implement E2-T0 (30 minutes)

---

## Current State

### ✅ Completed
- Epic 1: Frontend prototype (5/7 tickets)
  - Homepage with students ✅
  - Student detail page ✅
  - Donation flow ✅
  - Allocation interface ✅
  - Dashboard ✅
  - Allocation fix (100% cap) ✅

### 🔲 Remaining
- E1-T7: Responsive polish (1-2h) - Optional, can do later
- Epic 2: Vault UI (7-8h) - **START HERE**

---

## Quick Start: Next 30 Minutes

### Step 1: Create Data Models (E2-T0)

**Time**: 30 minutes
**Files**: 2 new files

```bash
# Create types file
cat > packages/nextjs/types/vault.ts << 'EOF'
export interface Vault {
  id: string;
  name: string;
  whaleAddress: string;
  whaleName: string;
  totalCapital: number;
  currentAPY: number;
  participantCount: number;
  createdAt: Date;
}

export interface VaultMembership {
  vaultId: string;
  userAddress: string;
  shares: number;
  depositAmount: number;
  yieldEarned: number;
}
EOF

# Create mock data file
cat > packages/nextjs/data/mockVaults.ts << 'EOF'
import { Vault, VaultMembership } from "~~/types/vault";

export const MOCK_VAULT: Vault = {
  id: "vault-1",
  name: "Education Fund",
  whaleAddress: "0xWhale123",
  whaleName: "Alice",
  totalCapital: 5000,
  currentAPY: 5.0,
  participantCount: 12,
  createdAt: new Date("2025-10-01"),
};

export const MOCK_MEMBERSHIP: VaultMembership = {
  vaultId: "vault-1",
  userAddress: "0xUser456",
  shares: 50,
  depositAmount: 50,
  yieldEarned: 0.25,
};

export function getUserVaultMembership(userAddress: string): VaultMembership | null {
  // Mock: return membership if address matches
  return userAddress === MOCK_MEMBERSHIP.userAddress ? MOCK_MEMBERSHIP : null;
}

export function getAllVaults(): Vault[] {
  return [MOCK_VAULT];
}

export function getVaultById(id: string): Vault | null {
  return id === MOCK_VAULT.id ? MOCK_VAULT : null;
}
EOF

# Test compilation
cd packages/nextjs
yarn next:check-types
```

**Validation**:
- [ ] No TypeScript errors
- [ ] Types imported correctly
- [ ] Mock data exports work

**Commit**:
```bash
git add packages/nextjs/types/vault.ts packages/nextjs/data/mockVaults.ts
git commit -m "add vault types and mock data"
```

---

## Today's Work: Epic 2 Foundation (3-4 hours)

### Step 2: Create Vault Creation Page (E2-T1)

**Time**: 2-3 hours
**File**: `packages/nextjs/app/vault/create/page.tsx`

**See**: Full code in [epic-2-vault-ui-simplified.md](epic-2-vault-ui-simplified.md#e2-t1-single-page-vault-creation)

**Quick Implementation**:
1. Create form with 2 fields (name, deposit)
2. Add mock transaction (2s delay)
3. Show success modal
4. Redirect to `/vaults`

**Test**:
1. Navigate to `http://localhost:3000/vault/create`
2. Fill form: "My Vault", 1000 USDC
3. Click "Create Vault & Deposit"
4. See loading state (2s)
5. See success message
6. Redirects to `/vaults`

---

### Step 3: Create Marketplace (E2-T2 Part 1)

**Time**: 1-2 hours
**Files**:
- `packages/nextjs/app/vaults/page.tsx`
- `packages/nextjs/components/vault/VaultCard.tsx`

**Implementation**:
1. Display single vault card
2. Show vault info (name, whale, APY, capital)
3. "Join Vault" button (modal comes next)

**Test**:
1. Navigate to `http://localhost:3000/vaults`
2. See "Education Fund" vault card
3. See all vault details
4. Button present (doesn't work yet)

---

## Tomorrow's Work: Complete Epic 2 (4 hours)

### Step 4: Add Join Modal (E2-T2 Part 2)

**Time**: 1-2 hours
**File**: `packages/nextjs/components/vault/JoinVaultModal.tsx`

**Implementation**:
1. Modal overlay with deposit input
2. Share calculation preview
3. Mock transaction
4. Redirect to dashboard

---

### Step 5: Update Allocation (E2-T3)

**Time**: 1 hour
**File**: Modify `packages/nextjs/app/allocate/page.tsx`

**Changes**:
- Add vault context banner at top
- Show voting power from shares
- Keep existing sliders

---

### Step 6: Update Dashboard (E2-T4)

**Time**: 2 hours
**File**: Modify `packages/nextjs/app/dashboard/page.tsx`

**Changes**:
- Add "Your Vaults" section at top
- Show vault membership card
- Link to allocation voting
- Keep existing stats below

---

## Epic 2 Complete - Demo Ready!

**Total Time**: 7-8 hours (1-1.5 days)

### Demo Flow (2 minutes)
1. **Create Vault** (`/vault/create`)
   - Enter "Education Fund" + 1000 USDC
   - Mock transaction → Success

2. **View Marketplace** (`/vaults`)
   - See vault card with all details

3. **Join Vault** (Modal)
   - Enter 50 USDC
   - See shares preview
   - Mock transaction → Dashboard

4. **View Dashboard** (`/dashboard`)
   - See vault membership
   - Deposit: 50, Shares: 50, Yield: $0.25

5. **Vote on Allocation** (`/allocate`)
   - See voting power: 50 shares (1%)
   - Use sliders to allocate to students

**Result**: Complete vault flow demonstrating:
✅ Whale creates vault
✅ Retail joins vault
✅ Shared allocation voting
✅ Yield distribution preview

---

## After Epic 2: Move to Contracts

### Epic 3: Smart Contracts (2-3 days)

**Start**: After Epic 2 complete
**Goal**: Deploy working ERC-4626 vaults to Base Sepolia

**Tickets**:
1. ERC-4626 vault contract (4-5h)
2. Aave strategy integration (4-5h)
3. VaultFactory contract (3-4h)
4. Impact NFT contract (2-3h)
5. Deploy to Base Sepolia (2-3h)
6. Contract tests (3-4h)

**See**: [epic-3-smart-contracts.md](epic-3-smart-contracts.md) (TBD)

---

## File Structure Reference

```
packages/nextjs/
├── types/
│   └── vault.ts                    ← E2-T0 (CREATE)
├── data/
│   └── mockVaults.ts               ← E2-T0 (CREATE)
├── app/
│   ├── vault/
│   │   └── create/
│   │       └── page.tsx            ← E2-T1 (CREATE)
│   ├── vaults/
│   │   └── page.tsx                ← E2-T2 (CREATE)
│   ├── allocate/
│   │   └── page.tsx                ← E2-T3 (MODIFY)
│   └── dashboard/
│       └── page.tsx                ← E2-T4 (MODIFY)
└── components/
    └── vault/
        ├── VaultCard.tsx           ← E2-T2 (CREATE)
        └── JoinVaultModal.tsx      ← E2-T2 (CREATE)
```

---

## Validation Checklist

### After E2-T0 (Data Models)
- [ ] `yarn next:check-types` passes
- [ ] Can import Vault and VaultMembership types
- [ ] Mock data functions return correct types

### After E2-T1 (Vault Creation)
- [ ] Can navigate to `/vault/create`
- [ ] Form validates correctly
- [ ] Mock transaction shows loading
- [ ] Success modal appears
- [ ] Redirects to `/vaults`

### After E2-T2 (Marketplace)
- [ ] Can navigate to `/vaults`
- [ ] Vault card displays correctly
- [ ] "Join Vault" modal opens
- [ ] Can enter deposit amount
- [ ] Mock transaction works
- [ ] Redirects to `/dashboard`

### After E2-T3 (Allocation Update)
- [ ] Vault banner shows at top
- [ ] Shows correct vault name
- [ ] Shows user's shares and voting power
- [ ] Sliders still work

### After E2-T4 (Dashboard Update)
- [ ] "Your Vaults" section at top
- [ ] Shows vault membership stats
- [ ] "Vote on Allocation" button works
- [ ] Existing donation stats below

---

## Common Issues & Solutions

### TypeScript Errors
```bash
# If types not found
cd packages/nextjs
yarn next:check-types

# Check import paths use ~~/
import { Vault } from "~~/types/vault";
import { MOCK_VAULT } from "~~/data/mockVaults";
```

### Mock Data Not Showing
```typescript
// Make sure to export functions
export function getAllVaults(): Vault[] {
  return [MOCK_VAULT];
}

// Import in page
import { getAllVaults } from "~~/data/mockVaults";
const vaults = getAllVaults();
```

### Modal Not Opening
```typescript
// Use state to control modal
const [showModal, setShowModal] = useState(false);

<button onClick={() => setShowModal(true)}>Join Vault</button>

{showModal && (
  <JoinVaultModal onClose={() => setShowModal(false)} />
)}
```

---

## Quick Commands

```bash
# Start dev server
cd packages/nextjs
yarn dev

# Check types
yarn next:check-types

# Lint
yarn next:lint

# Create commit
git add .
git commit -m "message here"

# Check status
git status
```

---

## Success Metrics

After Epic 2, you should have:
- ✅ 4 new pages/components created
- ✅ 2 existing pages modified
- ✅ Complete vault flow working
- ✅ 2-minute demo ready
- ✅ Ready for contracts integration

**Time to Contracts**: Tomorrow! 🚀

---

## Need Help?

**Documentation**:
- [simplified-frontend-mvp.md](../design/simplified-frontend-mvp.md) - Design spec
- [epic-2-vault-ui-simplified.md](epic-2-vault-ui-simplified.md) - Detailed tickets
- [mvp-scope.md](mvp-scope.md) - Overall MVP plan

**Code Examples**:
- All code skeletons in epic-2-vault-ui-simplified.md
- See existing pages for DaisyUI patterns
- Check `app/allocate/page.tsx` for form patterns

Ready to code! Start with E2-T0 (30 minutes) 🎯
