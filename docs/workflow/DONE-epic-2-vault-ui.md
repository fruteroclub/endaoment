# Epic 2: Vault UI (Simplified MVP)

**Duration**: 1 day (7-8 hours)
**Status**: 🔲 TODO
**Goal**: Minimal vault UI to demonstrate core mechanics and enable contracts work

---

## Epic Overview

Build the simplest possible vault interface to demonstrate:
1. **Shared Allocation**: Multiple donors vote together
2. **Rewards Distribution**: Whale gets 10%, retail gets 15%, students get 75%
3. **Impact Generation**: Pooled funding from multiple sources

**Design Philosophy**: Cut everything non-essential, ship fast, move to contracts

---

## Tickets

### ✅ E2-T0: Data Models and Mock Data
**Status**: 🔲 TODO
**Estimated Hours**: 0.5h
**Priority**: Do this first

#### Description
Create minimal type definitions and mock data for vaults.

#### Files to Create
- `packages/nextjs/types/vault.ts`
- `packages/nextjs/data/mockVaults.ts`

#### Implementation
```typescript
// types/vault.ts
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

// data/mockVaults.ts
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
```

#### Acceptance Criteria
- [ ] Types defined in `types/vault.ts`
- [ ] Mock vault data in `data/mockVaults.ts`
- [ ] Mock membership data available
- [ ] No TypeScript errors

#### Git Commit Message
```
add vault types and mock data
```

---

### E2-T1: Single-Page Vault Creation
**Status**: 🔲 TODO
**Estimated Hours**: 2-3h
**Priority**: HIGH - Core whale functionality

#### Description
Create simple one-page form for whale to create vault with just name and deposit amount.

#### Files to Create
- `packages/nextjs/app/vault/create/page.tsx`
- `packages/nextjs/utils/mockVaultCreation.ts`
- `packages/nextjs/components/vault/SuccessModal.tsx`

#### Implementation

**Form Fields**:
1. Vault Name (text input, required, 3-50 chars)
2. Deposit Amount (number input, required, 1000+ USDC)

**Flow**:
1. User fills form
2. Click "Create Vault & Deposit"
3. Mock approve USDC (1s delay)
4. Mock deposit to vault (1s delay)
5. Show success modal: "✅ Vault Created: [name]"
6. Redirect to `/vaults`

**No**:
- ❌ Multi-step wizard
- ❌ Strategy selection (hardcoded Conservative)
- ❌ Description field
- ❌ Advanced parameters
- ❌ NFT generator (just show success message)

#### Code Skeleton
```typescript
// app/vault/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVaultPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [deposit, setDeposit] = useState(1000);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Mock approve (1s)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock deposit (1s)
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsLoading(false);
    setShowSuccess(true);

    // Redirect after showing success
    setTimeout(() => router.push("/vaults"), 2000);
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="card-title text-2xl">Vault Created!</h2>
            <p>Your vault "{name}" is now live</p>
            <p className="text-sm text-base-content/60">
              Redirecting to marketplace...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Create Impact Vault</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Strategy (fixed) */}
          <div className="alert alert-info mb-4">
            <span>Strategy: Conservative (5% APY) 🛡️ Aave USDC Lending</span>
          </div>

          {/* Vault Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Vault Name *</span>
            </label>
            <input
              type="text"
              placeholder="Education Fund"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Deposit Amount */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Your Deposit (USDC) *</span>
            </label>
            <input
              type="number"
              min={1000}
              className="input input-bordered"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
            />
            <label className="label">
              <span className="label-text-alt">Min: 1000 • Balance: 5000</span>
            </label>
          </div>

          {/* Submit */}
          <button
            className={`btn btn-primary btn-lg btn-block mt-6 ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading || !name || deposit < 1000}
          >
            {isLoading ? "Creating Vault..." : "Create Vault & Deposit"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### Acceptance Criteria
- [ ] Single-page form with name + deposit
- [ ] Strategy shown as fixed (Conservative)
- [ ] Validation: name 3-50 chars, deposit ≥1000
- [ ] Mock transaction with 2s total delay
- [ ] Success modal shows vault name
- [ ] Redirects to `/vaults` after 2s
- [ ] Mobile responsive
- [ ] No console errors

#### Git Commit Message
```
add single-page vault creation form
```

---

### E2-T2: Vault Marketplace with Join Modal
**Status**: 🔲 TODO
**Estimated Hours**: 3-4h
**Priority**: HIGH - Core retail functionality
**Dependencies**: E2-T1 (vault types)

#### Description
Create marketplace page showing available vaults with a modal for joining.

#### Files to Create
- `packages/nextjs/app/vaults/page.tsx`
- `packages/nextjs/components/vault/VaultCard.tsx`
- `packages/nextjs/components/vault/JoinVaultModal.tsx`

#### Implementation

**Marketplace View**:
- Display single vault card (MOCK_VAULT)
- Card shows: name, whale, strategy, APY, capital, participant count
- "Join Vault" button opens modal

**Join Modal**:
- Deposit amount input (min 10 USDC)
- Show shares calculation preview
- "Deposit" button triggers mock transaction
- Success → Close modal → Redirect to dashboard

#### Code Skeleton
```typescript
// components/vault/VaultCard.tsx
export function VaultCard({ vault }: { vault: Vault }) {
  const [showJoinModal, setShowJoinModal] = useState(false);

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">🐋 {vault.name}</h2>
          <p className="text-sm">by {vault.whaleName} ({vault.whaleAddress})</p>

          <div className="flex gap-2 my-2">
            <span className="badge">🛡️ Conservative</span>
            <span className="badge badge-success">{vault.currentAPY}% APY</span>
          </div>

          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title">Pooled Capital</div>
              <div className="stat-value text-2xl">${vault.totalCapital.toLocaleString()}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Donors</div>
              <div className="stat-value text-2xl">{vault.participantCount}</div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-block mt-4"
            onClick={() => setShowJoinModal(true)}
          >
            Join Vault →
          </button>
        </div>
      </div>

      {showJoinModal && (
        <JoinVaultModal
          vault={vault}
          onClose={() => setShowJoinModal(false)}
        />
      )}
    </>
  );
}

// components/vault/JoinVaultModal.tsx
export function JoinVaultModal({ vault, onClose }: Props) {
  const router = useRouter();
  const [amount, setAmount] = useState(50);
  const [isLoading, setIsLoading] = useState(false);

  const handleJoin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    onClose();
    router.push("/dashboard");
  };

  const shares = amount; // 1:1 for simplicity
  const votingPower = (shares / (vault.totalCapital + amount)) * 100;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Join {vault.name}</h3>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Your Deposit (USDC) *</span>
          </label>
          <input
            type="number"
            min={10}
            className="input input-bordered"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <label className="label">
            <span className="label-text-alt">Min: 10 • Balance: 500</span>
          </label>
        </div>

        <div className="alert alert-info mt-4">
          <div>
            <div>You'll receive: ~{shares} shares</div>
            <div>Your voting power: ~{votingPower.toFixed(2)}%</div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            onClick={handleJoin}
            disabled={isLoading || amount < 10}
          >
            {isLoading ? "Depositing..." : "Deposit →"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### Acceptance Criteria
- [ ] Marketplace displays single vault card
- [ ] Vault card shows all key info
- [ ] "Join Vault" opens modal overlay
- [ ] Modal has deposit input with validation
- [ ] Shows share calculation preview
- [ ] Shows voting power preview
- [ ] Mock transaction (2s delay)
- [ ] Redirects to dashboard after join
- [ ] Mobile responsive
- [ ] No console errors

#### Git Commit Message
```
add vault marketplace and join flow
```

---

### E2-T3: Update Allocation with Vault Context
**Status**: 🔲 TODO
**Estimated Hours**: 1h
**Priority**: MEDIUM - Extends existing page
**Dependencies**: E2-T2 (vault membership data)

#### Description
Add vault context banner to existing allocation page showing voting power.

#### Files to Modify
- `packages/nextjs/app/allocate/page.tsx`

#### Changes
Add banner at top of page:
```typescript
// At top of allocation page, add:
<div className="alert alert-info mb-6">
  <div>
    <div className="font-bold">💼 Allocating from: Education Fund</div>
    <div className="text-sm">Your voting power: 50 shares (1%)</div>
  </div>
</div>

// Rest of existing slider interface stays the same
```

**Calculation**:
- Get user's shares from MOCK_MEMBERSHIP
- Calculate voting power: `(userShares / totalVaultShares) * 100`
- Display as percentage

#### Acceptance Criteria
- [ ] Vault info banner at top
- [ ] Shows vault name
- [ ] Shows user's share count
- [ ] Shows voting power percentage
- [ ] Existing slider interface unchanged
- [ ] No console errors

#### Git Commit Message
```
add vault context to allocation page
```

---

### E2-T4: Update Dashboard with Vault Membership
**Status**: 🔲 TODO
**Estimated Hours**: 2h
**Priority**: MEDIUM - Extends existing page
**Dependencies**: E2-T2 (vault membership data)

#### Description
Add "Your Vaults" section to existing dashboard showing vault memberships.

#### Files to Modify
- `packages/nextjs/app/dashboard/page.tsx`

#### Changes
Add section at top of dashboard:
```typescript
// Add before existing donation stats:
<div className="mb-8">
  <h2 className="text-2xl font-bold mb-4">Your Vaults</h2>

  <div className="card bg-base-100 shadow-xl">
    <div className="card-body">
      <h3 className="card-title">🐋 Education Fund</h3>

      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Your Deposit</div>
          <div className="stat-value text-2xl">$50</div>
        </div>
        <div className="stat">
          <div className="stat-title">Your Shares</div>
          <div className="stat-value text-2xl">50 (1%)</div>
        </div>
        <div className="stat">
          <div className="stat-title">Yield Earned</div>
          <div className="stat-value text-2xl text-success">$0.25</div>
        </div>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => router.push("/allocate")}
      >
        Vote on Allocation →
      </button>
    </div>
  </div>
</div>

// Existing donation stats section below
```

#### Acceptance Criteria
- [ ] "Your Vaults" section at top of dashboard
- [ ] Shows vault name with whale emoji
- [ ] Stats cards: deposit, shares, yield earned
- [ ] "Vote on Allocation" button links to `/allocate`
- [ ] Existing donation stats below (unchanged)
- [ ] Mobile responsive (stats stack vertically)
- [ ] No console errors

#### Git Commit Message
```
add vault membership to dashboard
```

---

## Epic 2 Completion Checklist

### Functional Requirements
- [ ] All 4 tickets complete (E2-T1 through E2-T4)
- [ ] Whale can create vault in single page
- [ ] Vault appears in marketplace
- [ ] Retail can join vault via modal
- [ ] Allocation page shows vault context
- [ ] Dashboard shows vault membership
- [ ] Complete demo flow works end-to-end

### Quality Requirements
- [ ] Mobile responsive (375px minimum)
- [ ] Fast page loads (<2s per page)
- [ ] No console errors
- [ ] No TypeScript errors

### Demo Flow (2 minutes)
- [ ] Whale creates "Education Fund" (20s)
- [ ] Vault visible in marketplace
- [ ] Retail joins with 50 USDC (20s)
- [ ] Dashboard shows vault membership (10s)
- [ ] Allocation page shows voting power (10s)
- [ ] Can allocate to students (30s)

---

## Time Estimate

| Ticket | Hours | Cumulative |
|--------|-------|------------|
| E2-T0 | 0.5h | 0.5h |
| E2-T1 | 2-3h | 3-3.5h |
| E2-T2 | 3-4h | 6-7.5h |
| E2-T3 | 1h | 7-8.5h |
| E2-T4 | 2h | 9-10.5h |

**Total**: 7-8.5 hours (1 full day)

---

## Handoff to Epic 3

**Prerequisites for Epic 3**:
- ✅ All Epic 2 tickets complete
- ✅ Demo flow works end-to-end
- ✅ No blocking bugs
- ✅ Ready to replace mocks with real contracts

**Epic 3 will add**:
- ERC-4626 vault contracts
- Aave strategy integration
- VaultFactory for creation
- Impact NFT contract
- Deploy to Base Sepolia

**Epic 3 will NOT change**:
- Existing page layouts
- User flows
- Mock data structure (contracts will match types)

See [epic-3-smart-contracts.md](epic-3-smart-contracts.md) for contracts phase.

---

**Last Updated**: 2025-11-07
**Epic Owner**: TBD
**Target Completion**: Day 2 (after E1-T7)
