# Simplified Frontend MVP Flow

**Goal**: Minimal frontend implementation to demonstrate vault mechanics, enable contracts work

## Core Value Demo

**What we're proving**:
1. **Shared Allocation**: Multiple donors vote together on student funding
2. **Rewards Distribution**: Whale gets premium, retail gets proportional yield
3. **Impact Generation**: Students receive pooled funding from multiple sources

## Ultra-Simplified User Flows

### Flow 1: Whale Creates Vault (Single Page)
**Route**: `/vault/create`

**UI**: Single form, no wizard steps
```
┌─────────────────────────────────────────┐
│   Create Impact Vault                   │
│                                         │
│   Strategy: Conservative (5% APY)       │
│   🛡️ Aave USDC Lending                  │
│   [Fixed - No selection needed]         │
│                                         │
│   Vault Name *                          │
│   [Education Fund                    ]  │
│                                         │
│   Your Deposit (USDC) *                 │
│   [1000                              ]  │
│   Min: 1000 • Balance: 5000             │
│                                         │
│   [Create Vault & Deposit →]            │
└─────────────────────────────────────────┘

→ Mock TX (2s) → Success modal with NFT → Redirect to /vaults
```

**No**:
- ❌ Multi-step wizard
- ❌ Strategy selection
- ❌ Description field
- ❌ Advanced parameters
- ❌ Separate review step

**Implementation**: 1 file (`app/vault/create/page.tsx`), ~2-3 hours

---

### Flow 2: Retail Joins Vault (Modal)
**Route**: `/vaults` → Click vault → Join modal

**UI**: Vault cards + modal overlay
```
Marketplace View:
┌─────────────────────────────────────────┐
│   Available Vaults                      │
│                                         │
│   ┌─────────────────────────────┐       │
│   │ 🐋 Education Fund            │       │
│   │ by Alice (0x1234...5678)    │       │
│   │                             │       │
│   │ 🛡️ Conservative • 5% APY    │       │
│   │ $5,000 pooled • 12 donors   │       │
│   │                             │       │
│   │ [Join Vault →]              │       │
│   └─────────────────────────────┘       │
└─────────────────────────────────────────┘

Join Modal:
┌─────────────────────────────────────────┐
│   Join Education Fund                   │
│                                         │
│   Your Deposit (USDC) *                 │
│   [50                                ]  │
│   Min: 10 • Balance: 500                │
│                                         │
│   You'll receive: ~50 shares            │
│   Your voting power: ~1% of vault       │
│                                         │
│   [Cancel]           [Deposit →]        │
└─────────────────────────────────────────┘

→ Mock TX (2s) → Success → Redirect to /dashboard
```

**No**:
- ❌ Separate vault detail page
- ❌ Whale profile page
- ❌ Strategy comparisons
- ❌ Historical performance charts

**Implementation**:
- `app/vaults/page.tsx` with VaultCard grid
- `components/JoinVaultModal.tsx`
- ~3-4 hours

---

### Flow 3: Allocation Voting (Reuse Existing)
**Route**: `/allocate` (already exists from Epic 1)

**Modification**: Add vault context banner
```
┌─────────────────────────────────────────┐
│   💼 Allocating from: Education Fund    │
│   Your voting power: 50 shares (1%)     │
└─────────────────────────────────────────┘

[Existing slider interface for students]
```

**Changes**:
- Add vault info banner at top
- Calculate voting power from shares
- Otherwise use existing E1-T5 allocation page

**Implementation**: Update existing `app/allocate/page.tsx`, ~1 hour

---

### Flow 4: Dashboard (Reuse + Extend)
**Route**: `/dashboard` (already exists from Epic 1)

**Addition**: Vault membership card
```
┌─────────────────────────────────────────┐
│   Your Vaults                           │
│                                         │
│   ┌─────────────────────────────┐       │
│   │ 🐋 Education Fund            │       │
│   │ Your deposit: 50 USDC       │       │
│   │ Your shares: 50 (1%)        │       │
│   │ Yield earned: $0.25         │       │
│   │                             │       │
│   │ [Vote on Allocation]        │       │
│   └─────────────────────────────┘       │
│                                         │
│   [Existing donation stats...]          │
└─────────────────────────────────────────┘
```

**Changes**:
- Add "Your Vaults" section at top
- Show vault membership cards
- Link to allocation voting
- Keep existing stats below

**Implementation**: Update existing `app/dashboard/page.tsx`, ~2 hours

---

## Simplified Epic 2 Tickets (6-8 hours total)

### E2-T1: Single-Page Vault Creation (2-3h)
**Status**: 🔲 TODO

**Create**:
- `app/vault/create/page.tsx` - Single form with name + deposit
- `utils/mockVaultCreation.ts` - Mock transaction helper
- `components/vault/SuccessModal.tsx` - Show NFT + success message

**Mock Flow**:
1. User fills form
2. Click "Create Vault & Deposit"
3. Mock approve (1s) + deposit (1s)
4. Show success modal with basic NFT visual
5. Redirect to `/vaults`

**No NFT generator needed**: Just show vault name + "✅ Vault Created" in modal

---

### E2-T2: Vault Marketplace with Join Modal (3-4h)
**Status**: 🔲 TODO

**Create**:
- `app/vaults/page.tsx` - Grid of vault cards
- `components/vault/VaultCard.tsx` - Display vault info
- `components/vault/JoinVaultModal.tsx` - Deposit modal
- `data/mockVaults.ts` - Single pre-created vault

**Features**:
- Display 1 vault (pre-created by "Alice")
- Click "Join Vault" → Modal opens
- Enter deposit amount
- Mock transaction (2s)
- Close modal, redirect to dashboard

---

### E2-T3: Update Allocation Page with Vault Context (1h)
**Status**: 🔲 TODO

**Modify**:
- `app/allocate/page.tsx` - Add vault banner, calculate voting power

**Changes**:
- Add vault context banner showing which vault is being allocated
- Calculate user's voting power based on shares
- Display voting power percentage
- Keep existing slider interface unchanged

---

### E2-T4: Update Dashboard with Vault Membership (2h)
**Status**: 🔲 TODO

**Modify**:
- `app/dashboard/page.tsx` - Add vault membership section

**Changes**:
- Add "Your Vaults" section at top
- Show vault cards with deposit, shares, yield earned
- Link to allocation voting
- Keep existing donation history below

---

## Data Structure (Minimal)

### `types/vault.ts`
```typescript
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
```

### `data/mockVaults.ts`
```typescript
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

// After user joins
export const MOCK_MEMBERSHIP: VaultMembership = {
  vaultId: "vault-1",
  userAddress: "0xUser456",
  shares: 50,
  depositAmount: 50,
  yieldEarned: 0.25,
};
```

---

## Complete Demo Flow (2 minutes)

### Act 1: Whale Creates Vault (20 seconds)
1. Navigate to `/vault/create`
2. Enter "Education Fund" + 1000 USDC
3. Click "Create Vault & Deposit"
4. Mock transaction (2s)
5. Success modal → Redirect to `/vaults`

### Act 2: Retail Joins Vault (20 seconds)
1. View "Education Fund" card in marketplace
2. Click "Join Vault"
3. Enter 50 USDC
4. Click "Deposit"
5. Mock transaction (2s)
6. Redirect to `/dashboard`

### Act 3: See Impact (10 seconds)
1. Dashboard shows vault membership
2. "Your deposit: 50 USDC, Yield earned: $0.25"
3. Click "Vote on Allocation"

### Act 4: Allocation Voting (30 seconds)
1. Allocation page shows "Voting power: 50 shares (1%)"
2. Adjust sliders to allocate to 3 students
3. Click "Confirm Allocation"
4. Success message

### Act 5: Rewards Distribution (30 seconds)
1. Return to dashboard
2. Show updated yield: "Yield earned: $2.50"
3. Show distribution breakdown:
   - Whale reward: $0.50 (10%)
   - Your reward: $0.15 (1% of 15% pool)
   - Students: $4.35 (75%)

**Total**: ~2 minutes, demonstrates complete value proposition

---

## Implementation Priority

### Phase 1: Foundation (4-5 hours)
1. **E2-T1**: Single-page vault creation (2-3h)
2. **E2-T2**: Marketplace + join modal (3-4h)

**Result**: Whale creates vault, retail joins, money pooled

### Phase 2: Integration (3 hours)
3. **E2-T3**: Update allocation with vault context (1h)
4. **E2-T4**: Update dashboard with vault stats (2h)

**Result**: Complete demo flow works end-to-end

**Total**: 7-8 hours (1 full day, fast implementation)

---

## What We're NOT Building

### Cut from Frontend
- ❌ Multi-step wizards
- ❌ Strategy selection UI
- ❌ Impact NFT generator (just show "✅ Created")
- ❌ Vault detail pages
- ❌ Whale management dashboard
- ❌ Invite mechanisms
- ❌ Performance charts
- ❌ Historical data
- ❌ Advanced filtering
- ❌ Profile pages

### Focus Instead On
- ✅ Simple forms
- ✅ Quick joins
- ✅ Clear value display
- ✅ Working demo flow
- ✅ Move to contracts ASAP

---

## Contract Interface Requirements

Based on this frontend, contracts need:

### VaultFactory.sol
```solidity
function createVault(
  string memory name,
  uint256 initialDeposit
) external returns (address vaultAddress);
```

### EndaomentVault.sol (ERC-4626)
```solidity
// Standard ERC-4626
function deposit(uint256 assets, address receiver) external returns (uint256 shares);
function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);

// Custom
function getCurrentAPY() external view returns (uint256);
function getYieldGenerated() external view returns (uint256);
```

### AllocationManager.sol
```solidity
function submitAllocation(
  address vaultAddress,
  address[] memory students,
  uint256[] memory percentages
) external;

function calculateRewards(address vaultAddress) external view returns (
  uint256 whaleReward,
  uint256 retailRewardPool,
  uint256 studentAllocation
);
```

---

## Success Criteria (Simplified)

After implementing these 4 tickets:

✅ Whale creates vault in 1 page
✅ Vault appears in marketplace
✅ Retail joins via modal
✅ Both see vault on dashboard
✅ Allocation voting shows voting power
✅ Dashboard shows yield distribution
✅ Complete demo works in <2 minutes
✅ Ready to integrate contracts

**Time to Contracts**: ~1 day instead of 3 days

---

## Next Steps

1. **Today**: Implement E2-T1 + E2-T2 (vault creation + marketplace)
2. **Today**: Implement E2-T3 + E2-T4 (allocation + dashboard updates)
3. **Tomorrow**: Start Epic 3 (Smart Contracts)
4. **Day 3-4**: Complete contracts + deploy
5. **Day 5**: Integrate frontend with real contracts
6. **Day 6**: Polish + launch

**MVP Launch**: 6 days instead of 14 days 🚀

---

## File Summary

**New Files** (4 total):
1. `app/vault/create/page.tsx` - Single-page creation
2. `app/vaults/page.tsx` - Marketplace
3. `components/vault/VaultCard.tsx` - Vault display
4. `components/vault/JoinVaultModal.tsx` - Join flow

**Modified Files** (2 total):
1. `app/allocate/page.tsx` - Add vault banner
2. `app/dashboard/page.tsx` - Add vault section

**Data Files** (2 total):
1. `types/vault.ts` - Minimal types
2. `data/mockVaults.ts` - Single vault + membership

**Total New Code**: ~500-600 lines (vs 2000+ for full design)

This keeps frontend simple while demonstrating core mechanics, letting you focus on contracts where the real innovation happens!
