# Epic 4: Frontend-Contract Integration

**Duration**: 12-16 hours
**Status**: ⏳ TODO
**Dependencies**: Epic 3 complete (contracts deployed to Base Sepolia)

## Overview

Integrate the deployed smart contracts (EndaomentVault, StudentRegistry, AllocationManager, MockUSDC) with the existing frontend vault flows. Replace all mock data and simulated transactions with real on-chain interactions.

## Tickets

### E4-T1: Update deployedContracts.ts
**Estimate**: 1 hour
**Dependencies**: Epic 3 complete

Update the contract deployment configuration with addresses from Epic 3 deployment.

**Tasks**:
- Add MockUSDC address and ABI to `deployedContracts.ts`
- Add StudentRegistry address and ABI
- Add EndaomentVault address and ABI
- Add AllocationManager address and ABI
- Configure Base Sepolia chain ID (84532)
- Export TypeScript types for contract interactions

**Acceptance Criteria**:
- [ ] All contract addresses from Epic 3 deployment are configured
- [ ] ABIs are correctly imported from Hardhat artifacts
- [ ] TypeScript types are available for all contract methods
- [ ] Base Sepolia configuration is correct

---

### E4-T2: Vault Creation Flow with Real Contracts
**Estimate**: 3-4 hours
**Dependencies**: E4-T1

Connect `/vault/create` page to real EndaomentVault deployment.

**Tasks**:
- Update `CreateVaultForm` to use `useScaffoldWriteContract`
- Call `EndaomentVault.constructor()` with whale deposit
- Handle USDC approval flow before vault creation
- Show transaction status and confirmation
- Redirect to vault detail page after successful creation
- Store vault metadata (name, description) in localStorage or IPFS

**Acceptance Criteria**:
- [ ] Whale can create vault with 1000+ USDC deposit
- [ ] USDC approval is handled automatically
- [ ] Transaction success/failure is shown to user
- [ ] Vault appears in marketplace after creation
- [ ] Whale receives ERC-4626 shares

**Code Example**:
```typescript
const { writeContractAsync } = useScaffoldWriteContract("EndaomentVault");

async function handleCreateVault() {
  // 1. Approve USDC
  await approveUSDC(vaultAddress, depositAmount);

  // 2. Deploy vault (or call factory pattern)
  const tx = await writeContractAsync({
    functionName: "deposit",
    args: [depositAmount, whaleAddress],
  });

  // 3. Wait for confirmation
  await tx.wait();
}
```

---

### E4-T3: Retail Deposit Flow
**Estimate**: 2-3 hours
**Dependencies**: E4-T2

Connect vault marketplace and deposit page to real contract deposits.

**Tasks**:
- Update `/vaults/[id]/deposit` to use real `deposit()` function
- Handle USDC approval for retail deposits (10+ USDC)
- Show user's share balance after deposit
- Update vault stats (TVL, depositors) from contract state
- Display transaction history from events

**Acceptance Criteria**:
- [ ] Retail user can deposit 10+ USDC to existing vault
- [ ] User receives proportional ERC-4626 shares
- [ ] Vault TVL updates correctly
- [ ] User can see their share balance
- [ ] Deposit history shows on vault page

---

### E4-T4: Student Registry Integration
**Estimate**: 2-3 hours
**Dependencies**: E4-T1

Connect student pages to StudentRegistry contract.

**Tasks**:
- Update student data fetching to read from `StudentRegistry`
- Show students registered on-chain
- Display `totalReceived` for each student
- Add "Register Student" admin function (if needed)
- Show funding history from contract events

**Acceptance Criteria**:
- [ ] Student list reads from StudentRegistry contract
- [ ] Each student shows total received amount
- [ ] Funding history displays correctly
- [ ] Only active students appear in allocation voting

**Code Example**:
```typescript
const { data: students } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "getAllStudents",
});

const { data: studentDetails } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "getStudent",
  args: [studentAddress],
});
```

---

### E4-T5: Allocation Voting Flow
**Estimate**: 3-4 hours
**Dependencies**: E4-T3, E4-T4

Connect `/vaults/[id]/allocate` to AllocationManager voting.

**Tasks**:
- Fetch current epoch from `AllocationManager`
- Show user's voting power (based on shares)
- Update allocation UI to call `allocateVotes()`
- Handle multi-student allocation transaction
- Show pending vs finalized allocations
- Display vote totals per student

**Acceptance Criteria**:
- [ ] Users can allocate votes to multiple students
- [ ] Vote transaction succeeds on-chain
- [ ] Vote totals update correctly
- [ ] Allocation percentages match user input
- [ ] Epoch timing is respected (30-day cycles)

**Code Example**:
```typescript
const { writeContractAsync } = useScaffoldWriteContract("AllocationManager");

async function submitAllocation(voteAllocations: VoteAllocation[]) {
  const studentAddresses = voteAllocations.map(v => v.studentAddress);
  const voteAmounts = voteAllocations.map(v => v.votes);

  await writeContractAsync({
    functionName: "allocateVotes",
    args: [vaultAddress, studentAddresses, voteAmounts],
  });
}
```

---

### E4-T6: Yield Distribution Dashboard
**Estimate**: 2-3 hours
**Dependencies**: E4-T5

Show real yield accrual and distribution from contracts.

**Tasks**:
- Display `getAccruedYield()` for each vault
- Show split breakdown (10% whale, 15% retail, 75% students)
- Add "Distribute Yield" button for epoch finalization
- Show distribution history from events
- Update student balances after distribution

**Acceptance Criteria**:
- [ ] Yield accrues correctly based on time elapsed
- [ ] Distribution splits match 10/15/75 ratio
- [ ] Students receive funding based on vote weights
- [ ] Distribution history is visible
- [ ] Whale and retail shares are credited correctly

---

### E4-T7: Event Listeners & Transaction History
**Estimate**: 1-2 hours
**Dependencies**: E4-T2, E4-T3, E4-T5

Add real-time updates and transaction history.

**Tasks**:
- Listen for `Deposit` events from EndaomentVault
- Listen for `VotesAllocated` events from AllocationManager
- Listen for `YieldDistributed` events
- Display transaction history on vault detail page
- Show user's personal transaction history

**Acceptance Criteria**:
- [ ] New deposits appear immediately in UI
- [ ] Vote allocations update in real-time
- [ ] Distribution events trigger UI updates
- [ ] Transaction history shows timestamps and amounts

---

## Testing Plan

### Manual Testing Checklist
- [ ] Whale can create vault with 1000 USDC
- [ ] Retail can deposit 10 USDC to vault
- [ ] Students appear from StudentRegistry
- [ ] Allocation voting works and records on-chain
- [ ] Yield accrues over time (fast-forward for testing)
- [ ] Distribution sends funds to students
- [ ] All transaction statuses are shown correctly

### Integration Test Scenarios
1. **Full Vault Lifecycle**:
   - Create vault → Retail deposits → Allocate votes → Fast-forward time → Distribute yield

2. **Multi-Vault Scenario**:
   - Create 2 vaults → Deposits to both → Different vote allocations → Verify independent distributions

3. **Error Handling**:
   - Insufficient USDC balance
   - Deposit below minimum (10 USDC)
   - Allocation before epoch ends
   - Distribution with no yield

---

## Dependencies

### From Epic 3
- ✅ MockUSDC deployed with mint function
- ✅ StudentRegistry with test students
- ✅ EndaomentVault with mock yield accrual
- ✅ AllocationManager with voting and distribution
- ✅ All contracts verified on Base Sepolia

### External Tools
- Scaffold-ETH 2 hooks (`useScaffoldWriteContract`, `useScaffoldReadContract`)
- Wagmi for wallet connection
- Base Sepolia testnet (chain ID 84532)
- MockUSDC faucet for testing

---

## Not Included (Deferred)

- ❌ Multi-vault management (focus on single vault per whale for MVP)
- ❌ Withdrawal functionality (deposits are locked for MVP)
- ❌ Governance token or DAO features
- ❌ Advanced analytics or dashboards
- ❌ Mobile-optimized views
- ❌ IPFS integration for vault metadata
- ❌ Real Aave integration (using mock yield for MVP)

---

## Deliverables

- ✅ All vault flows connected to real contracts
- ✅ USDC approval and deposit transactions working
- ✅ Student registry displaying on-chain data
- ✅ Allocation voting persisted on-chain
- ✅ Yield distribution functioning with 10/15/75 split
- ✅ Transaction history and event listeners
- ✅ Fully functional dApp on Base Sepolia testnet

**Next**: [Epic 5 - Production Launch](epic-5-production-launch.md)
