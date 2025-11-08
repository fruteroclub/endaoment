# Epic 9: Retail Donor & Student Contract Integration

**Duration**: 10-14 hours
**Status**: ⏳ TODO
**Dependencies**: Epic 3 (contracts deployed), Epic 7 (retail UI), Epic 8 (student UI)

## Overview

Integrate the retail donor and student UI flows (Epics 7 & 8) with the deployed smart contracts from Epic 3. Replace all mock data and simulated transactions with real on-chain interactions. This epic connects the complete user experience to the blockchain.

**Integration Scope**:
- Retail donor deposit and allocation flows → EndaomentVault & AllocationManager
- Student profiles and funding → StudentRegistry & AllocationManager
- Real USDC transactions and ERC-4626 shares
- Event listeners for real-time updates
- Cross-flow integration (retail allocates → students receive)

---

## Architecture Overview

### Contract → UI Mappings

**Retail Donor Flows (Epic 7)**:
```
Vault Browse → Read: EndaomentVault (totalAssets, totalSupply, etc.)
Deposit → Write: EndaomentVault.deposit()
Dashboard → Read: EndaomentVault.balanceOf(), getAccruedYield()
Allocate → Write: AllocationManager.allocateVotes()
Impact → Read: AllocationManager events, StudentRegistry distributions
```

**Student Flows (Epic 8)**:
```
Profile Creation → Write: StudentRegistry.registerStudent()
Profile Display → Read: StudentRegistry.getStudent()
Funding History → Read: StudentRegistry.totalReceived + events
Dashboard → Read: AllocationManager.getStudentVotes()
Milestones → Off-chain storage (IPFS or database) with on-chain references
```

---

## Tickets

### E9-T1: Update deployedContracts.ts Configuration
**Estimate**: 30 minutes
**Dependencies**: Epic 3 deployment complete

Configure contract addresses and ABIs for all integrations.

**Tasks**:
- Add StudentRegistry address and ABI
- Verify EndaomentVault configuration
- Verify AllocationManager configuration
- Verify MockUSDC configuration
- Add Base Sepolia chain configuration
- Export TypeScript types for all contracts
- Test contract connections

**Configuration File**:
```typescript
// packages/nextjs/contracts/deployedContracts.ts
const deployedContracts = {
  84532: { // Base Sepolia
    MockUSDC: {
      address: "0x...",
      abi: [...],
    },
    StudentRegistry: {
      address: "0x...",
      abi: [...],
    },
    EndaomentVault: {
      address: "0x...",
      abi: [...],
    },
    AllocationManager: {
      address: "0x...",
      abi: [...],
    },
  },
};
```

**Acceptance Criteria**:
- [ ] All contract addresses from Epic 3 are configured
- [ ] ABIs are correctly imported
- [ ] TypeScript types are generated
- [ ] Base Sepolia chain ID is correct
- [ ] Test reads work from all contracts

---

### E9-T2: Retail Deposit Flow Integration
**Estimate**: 3-4 hours
**Dependencies**: E9-T1, Epic 7 T3

Connect retail deposit UI to real EndaomentVault contract.

**Replace Mock Functions**:
- `simulateDeposit()` → `useScaffoldWriteContract("EndaomentVault", "deposit")`
- Mock balance checks → Real USDC balance read
- Mock share calculation → Real `convertToShares()` read
- Mock transaction → Real blockchain transaction

**Integration Points**:

**1. USDC Balance Check**:
```typescript
const { data: usdcBalance } = useScaffoldReadContract({
  contractName: "MockUSDC",
  functionName: "balanceOf",
  args: [userAddress],
});
```

**2. USDC Approval Flow**:
```typescript
const { writeContractAsync: approveUSDC } = useScaffoldWriteContract("MockUSDC");

async function handleApprove() {
  await approveUSDC({
    functionName: "approve",
    args: [vaultAddress, depositAmount],
  });
}
```

**3. Deposit Transaction**:
```typescript
const { writeContractAsync: deposit } = useScaffoldWriteContract("EndaomentVault");

async function handleDeposit() {
  // 1. Approve USDC
  await approveUSDC({
    functionName: "approve",
    args: [vaultAddress, depositAmount],
  });

  // 2. Deposit to vault
  const tx = await deposit({
    functionName: "deposit",
    args: [depositAmount, userAddress],
  });

  // 3. Wait for confirmation
  await tx.wait();

  // 4. Read shares received
  const shares = await readContract({
    contractName: "EndaomentVault",
    functionName: "balanceOf",
    args: [userAddress],
  });
}
```

**4. Share Balance Display**:
```typescript
const { data: userShares } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "balanceOf",
  args: [userAddress],
});
```

**Acceptance Criteria**:
- [ ] USDC balance reads from contract
- [ ] Approval transaction works
- [ ] Deposit transaction succeeds
- [ ] Shares are minted correctly
- [ ] Transaction status shows in UI
- [ ] Error handling for failures
- [ ] Success state redirects appropriately
- [ ] Vault TVL updates after deposit

---

### E9-T3: Retail Dashboard Integration
**Estimate**: 2-3 hours
**Dependencies**: E9-T2, Epic 7 T4

Connect retail dashboard to read real vault data and user positions.

**Replace Mock Data**:
- Mock vault positions → Read from EndaomentVault
- Mock yield accrual → Read `getAccruedYield()`
- Mock transaction history → Parse blockchain events
- Mock voting power → Read share balance

**Integration Points**:

**1. Portfolio Overview**:
```typescript
// Total deposited (sum of shares across vaults)
const { data: shares } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "balanceOf",
  args: [userAddress],
});

// Convert shares to assets
const { data: assets } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "convertToAssets",
  args: [shares],
});
```

**2. Yield Tracking**:
```typescript
const { data: totalAssets } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "totalAssets",
});

const { data: totalSupply } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "totalSupply",
});

// Yield = totalAssets - totalSupply (principal)
const totalYield = totalAssets - totalSupply;
```

**3. Transaction History**:
```typescript
// Listen for Deposit events
const { data: depositEvents } = useScaffoldEventHistory({
  contractName: "EndaomentVault",
  eventName: "Deposit",
  fromBlock: 0n,
  filters: { receiver: userAddress },
});
```

**Acceptance Criteria**:
- [ ] Portfolio shows real positions
- [ ] Yield calculations are accurate
- [ ] Transaction history loads from events
- [ ] Voting power matches share balance
- [ ] Multi-vault positions display correctly
- [ ] Data refreshes on new transactions
- [ ] Loading states work properly

---

### E9-T4: Allocation Voting Integration
**Estimate**: 3-4 hours
**Dependencies**: E9-T3, Epic 7 T5

Connect allocation voting UI to AllocationManager contract.

**Replace Mock Functions**:
- Mock vote submission → Real `allocateVotes()` transaction
- Mock epoch data → Read from AllocationManager
- Mock student list → Read from StudentRegistry
- Mock vote totals → Read from AllocationManager

**Integration Points**:

**1. Current Epoch Data**:
```typescript
const { data: currentEpoch } = useScaffoldReadContract({
  contractName: "AllocationManager",
  functionName: "getCurrentEpoch",
});

const { data: epochEndTime } = useScaffoldReadContract({
  contractName: "AllocationManager",
  functionName: "getEpochEndTime",
  args: [currentEpoch],
});
```

**2. Student List**:
```typescript
const { data: students } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "getAllActiveStudents",
});
```

**3. User's Voting Power**:
```typescript
const { data: votingPower } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "balanceOf",
  args: [userAddress],
});
```

**4. Submit Allocation**:
```typescript
const { writeContractAsync: allocate } = useScaffoldWriteContract("AllocationManager");

async function submitAllocation(allocations: Allocation[]) {
  const studentAddresses = allocations.map(a => a.studentAddress);
  const voteAmounts = allocations.map(a => a.votes);

  await allocate({
    functionName: "allocateVotes",
    args: [vaultAddress, studentAddresses, voteAmounts],
  });
}
```

**5. Current Allocations**:
```typescript
const { data: userAllocations } = useScaffoldReadContract({
  contractName: "AllocationManager",
  functionName: "getUserAllocations",
  args: [userAddress, vaultAddress, currentEpoch],
});
```

**Acceptance Criteria**:
- [ ] Epoch timing displays correctly
- [ ] Student list loads from registry
- [ ] Voting power matches shares
- [ ] Allocation submission succeeds
- [ ] Vote totals update on-chain
- [ ] Can edit allocation before epoch ends
- [ ] Cannot allocate after epoch ends
- [ ] Transaction confirmations work

---

### E9-T5: Student Registry Integration
**Estimate**: 2-3 hours
**Dependencies**: E9-T1, Epic 8 T1-T2

Connect student profile creation and display to StudentRegistry contract.

**Replace Mock Functions**:
- Mock profile creation → Real `registerStudent()` transaction
- Mock profile reads → Read from StudentRegistry
- Mock funding totals → Read `totalReceived` field
- Mock student list → Read from contract

**Integration Points**:

**1. Student Registration**:
```typescript
const { writeContractAsync: register } = useScaffoldWriteContract("StudentRegistry");

async function createStudentProfile(profile: StudentProfile) {
  await register({
    functionName: "registerStudent",
    args: [
      profile.name,
      profile.university,
      profile.researchArea,
    ],
  });
}
```

**2. Read Student Profile**:
```typescript
const { data: student } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "getStudent",
  args: [studentAddress],
});
```

**3. Get All Students**:
```typescript
const { data: allStudents } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "getAllStudents",
});
```

**4. Total Funding Received**:
```typescript
const { data: totalReceived } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "totalReceived",
  args: [studentAddress],
});
```

**Acceptance Criteria**:
- [ ] Student registration transaction works
- [ ] Profile data reads from contract
- [ ] Student list displays all registered students
- [ ] Total funding amount is accurate
- [ ] Only active students appear in allocation
- [ ] Profile updates persist on-chain
- [ ] Transaction errors handled gracefully

---

### E9-T6: Student Dashboard Integration
**Estimate**: 2-3 hours
**Dependencies**: E9-T5, Epic 8 T3

Connect student dashboard to read real funding data and voting stats.

**Replace Mock Data**:
- Mock funding history → Read from distribution events
- Mock current votes → Read from AllocationManager
- Mock projections → Calculate from current epoch votes
- Mock donor count → Parse from events

**Integration Points**:

**1. Current Epoch Votes**:
```typescript
const { data: currentVotes } = useScaffoldReadContract({
  contractName: "AllocationManager",
  functionName: "getStudentVotes",
  args: [studentAddress, currentEpoch],
});
```

**2. Funding History Events**:
```typescript
const { data: fundingEvents } = useScaffoldEventHistory({
  contractName: "AllocationManager",
  eventName: "YieldDistributed",
  fromBlock: 0n,
  filters: { student: studentAddress },
});
```

**3. Total Received**:
```typescript
const { data: totalFunding } = useScaffoldReadContract({
  contractName: "StudentRegistry",
  functionName: "totalReceived",
  args: [studentAddress],
});
```

**4. Projected Distribution**:
```typescript
// Calculate based on current votes and available yield
const { data: availableYield } = useScaffoldReadContract({
  contractName: "EndaomentVault",
  functionName: "getAvailableYield",
});

const { data: totalVotes } = useScaffoldReadContract({
  contractName: "AllocationManager",
  functionName: "getTotalVotes",
  args: [currentEpoch],
});

// Student's projected share = (studentVotes / totalVotes) * availableYield * 0.75
const projectedAmount = (currentVotes / totalVotes) * availableYield * 0.75;
```

**Acceptance Criteria**:
- [ ] Dashboard shows real funding totals
- [ ] Current epoch votes display correctly
- [ ] Funding history loads from events
- [ ] Projected distribution calculates accurately
- [ ] Donor count derives from events
- [ ] Voting trends chart uses real data
- [ ] Data refreshes on new votes
- [ ] Empty states handle no funding yet

---

### E9-T7: Event Listeners & Real-Time Updates
**Estimate**: 2-3 hours
**Dependencies**: E9-T2, E9-T4, E9-T6

Add real-time event listeners for live UI updates.

**Events to Monitor**:

**1. Deposit Events** (EndaomentVault):
```typescript
const { data: newDeposits } = useScaffoldEventSubscriber({
  contractName: "EndaomentVault",
  eventName: "Deposit",
  listener: (logs) => {
    logs.forEach(log => {
      // Update vault TVL
      // Update depositor count
      // Trigger dashboard refresh
    });
  },
});
```

**2. Allocation Events** (AllocationManager):
```typescript
const { data: newAllocations } = useScaffoldEventSubscriber({
  contractName: "AllocationManager",
  eventName: "VotesAllocated",
  listener: (logs) => {
    // Update student vote totals
    // Update allocation UI
    // Refresh dashboard stats
  },
});
```

**3. Distribution Events** (AllocationManager):
```typescript
const { data: distributions } = useScaffoldEventSubscriber({
  contractName: "AllocationManager",
  eventName: "YieldDistributed",
  listener: (logs) => {
    // Update student funding history
    // Update donor impact metrics
    // Show notifications
  },
});
```

**Real-Time Update Strategy**:
- Subscribe to relevant events on page load
- Update local state when events fire
- Show toast notifications for important events
- Invalidate cached contract reads
- Trigger re-fetch of dependent data

**Acceptance Criteria**:
- [ ] New deposits appear immediately
- [ ] Vote allocations update in real-time
- [ ] Distributions trigger notifications
- [ ] UI reflects blockchain state
- [ ] Event listeners clean up on unmount
- [ ] No performance issues from polling
- [ ] Toast notifications don't spam users

---

### E9-T8: Cross-Flow Integration Testing
**Estimate**: 2-3 hours
**Dependencies**: All previous E9 tickets

End-to-end testing of complete retail → student flow.

**Test Scenarios**:

**1. Complete Retail → Student Flow**:
```
Retail deposits 50 USDC
→ Receives 50 shares
→ Allocates 100% to Student A
→ Epoch ends (simulate time advancement)
→ Yield distribution executes
→ Student A receives 75% of yield
→ Retail receives 15% of yield
→ Whale receives 10% of yield
```

**2. Multi-Retail → Multi-Student Flow**:
```
Retail 1 deposits 50 USDC, allocates 50/50 to Students A & B
Retail 2 deposits 100 USDC, allocates 70/30 to Students A & B
→ Student A receives more (weighted by total votes)
→ Student B receives proportionally less
→ Both retailers earn 15% yield based on their shares
```

**3. Student Registration → Funding Flow**:
```
New student registers profile
→ Profile appears in allocation UI
→ Retail donors allocate votes
→ Student receives funding in next distribution
→ Student dashboard updates with funding
```

**Integration Tests**:
- [ ] Retail deposit → Share minting works
- [ ] Share balance → Voting power correct
- [ ] Vote allocation → Recorded on-chain
- [ ] Epoch end → Distribution executes
- [ ] Distribution → Students receive funds
- [ ] Distribution → Donors receive yield share
- [ ] Student registry → Allocation UI sync
- [ ] All UIs reflect blockchain state
- [ ] Transaction history accurate across flows
- [ ] Error handling works end-to-end

**Manual Testing Checklist**:
- [ ] Deposit with insufficient balance (error)
- [ ] Allocate more than 100% (validation)
- [ ] Register duplicate student (error)
- [ ] Allocate to non-existent student (error)
- [ ] View funding before any distribution (empty state)
- [ ] Multiple deposits to same vault (accumulate shares)
- [ ] Change allocation mid-epoch (update votes)
- [ ] View impact after distribution (accurate stats)

---

## Data Synchronization Strategy

### Contract → UI Data Flow
```
Smart Contract Events
       ↓
Event Listeners (useScaffoldEventSubscriber)
       ↓
Local State Updates (React hooks)
       ↓
UI Components Re-render
```

### UI → Contract Data Flow
```
User Action (button click)
       ↓
Form Validation (client-side)
       ↓
Transaction Preparation (useScaffoldWriteContract)
       ↓
Wallet Confirmation (MetaMask/Coinbase Wallet)
       ↓
Blockchain Transaction
       ↓
Event Emission
       ↓
UI Update (via event listener)
```

---

## Error Handling Strategy

### Common Errors to Handle
```typescript
enum ErrorType {
  INSUFFICIENT_BALANCE = "Insufficient USDC balance",
  APPROVAL_FAILED = "USDC approval failed",
  DEPOSIT_FAILED = "Deposit transaction failed",
  ALLOCATION_INVALID = "Allocation must total 100%",
  EPOCH_ENDED = "Epoch has ended, cannot allocate",
  STUDENT_INACTIVE = "Student is not active",
  GAS_TOO_HIGH = "Gas price too high, try again",
  NETWORK_ERROR = "Network connection error",
  CONTRACT_REVERT = "Transaction reverted",
}
```

### Error Handling Components
- `ErrorBoundary`: Catch React errors
- `TransactionErrorModal`: Show transaction failures
- `ValidationError`: Show form validation errors
- `ToastNotification`: Non-blocking error messages

**User-Friendly Error Messages**:
```typescript
const errorMessages = {
  INSUFFICIENT_BALANCE: "You don't have enough USDC. Get testnet USDC from the faucet.",
  APPROVAL_FAILED: "USDC approval failed. Please try again.",
  ALLOCATION_INVALID: "Your allocation must add up to 100%. Currently: ${total}%",
  EPOCH_ENDED: "This epoch has ended. You can allocate in the next epoch starting ${nextEpochStart}.",
};
```

---

## Performance Optimization

### Caching Strategy
- Cache contract reads with SWR or React Query
- Cache interval: 10 seconds for frequently changing data
- Cache interval: 60 seconds for static data
- Invalidate cache on user transactions

### Batch Reads
```typescript
// Instead of multiple individual reads
const data1 = useScaffoldReadContract({ contractName: "EndaomentVault", functionName: "totalAssets" });
const data2 = useScaffoldReadContract({ contractName: "EndaomentVault", functionName: "totalSupply" });

// Use multicall pattern
const { data: [totalAssets, totalSupply] } = useScaffoldMulticall({
  contractName: "EndaomentVault",
  functionNames: ["totalAssets", "totalSupply"],
});
```

### Loading States
- Skeleton loaders for contract reads
- Progress indicators for transactions
- Optimistic UI updates (show immediately, confirm on-chain)

---

## Testing Checklist

### Unit Testing
- [ ] Contract read functions return correct data
- [ ] Contract write functions submit transactions
- [ ] Event listeners parse events correctly
- [ ] Data transformations are accurate
- [ ] Validation logic works correctly

### Integration Testing
- [ ] Deposit flow end-to-end
- [ ] Allocation flow end-to-end
- [ ] Student registration end-to-end
- [ ] Distribution calculation accuracy
- [ ] Cross-flow data consistency

### User Acceptance Testing
- [ ] Retail donor can complete all flows
- [ ] Student can create profile and track funding
- [ ] All UIs reflect real blockchain state
- [ ] Error messages are helpful
- [ ] Performance is acceptable (<3s for reads)

---

## Dependencies

### From Previous Epics
- ✅ Epic 3: All contracts deployed and verified
- ✅ Epic 7: Retail donor UI complete with mock data
- ✅ Epic 8: Student UI complete with mock data

### External Tools
- Scaffold-ETH 2 hooks (useScaffoldWriteContract, useScaffoldReadContract, useScaffoldEventHistory)
- Wagmi for wallet connection
- Base Sepolia testnet
- MockUSDC faucet for testing

---

## Deliverables

After Epic 9 completion:
- ✅ All Epic 7 (retail) flows connected to contracts
- ✅ All Epic 8 (student) flows connected to contracts
- ✅ Real USDC deposits and ERC-4626 shares
- ✅ On-chain allocation voting
- ✅ Student registry integration
- ✅ Real-time event listeners
- ✅ Cross-flow integration (retail → students)
- ✅ Comprehensive error handling
- ✅ Performance optimizations
- ✅ End-to-end testing complete

**Timeline**: 10-14 hours

**Next Steps**:
- Epic 5: Production launch (testing, documentation, demo)
- Epic 6: Farcaster integration (optional)

---

## Success Criteria

### Functional Requirements
- ✅ Retail can deposit and receive shares
- ✅ Retail can allocate votes on-chain
- ✅ Students can register on-chain
- ✅ Students see real funding data
- ✅ Distributions execute correctly
- ✅ All UIs show blockchain state

### Technical Requirements
- ✅ No mock data remaining
- ✅ All transactions on Base Sepolia
- ✅ Event listeners working
- ✅ Error handling comprehensive
- ✅ Performance acceptable (<3s reads, <10s writes)
- ✅ No console errors

### User Experience
- ✅ Flows are intuitive and clear
- ✅ Transaction status always visible
- ✅ Errors provide actionable guidance
- ✅ Real-time updates feel responsive
- ✅ Loading states prevent confusion

**Epic 9 Complete** = Fully functional dApp with all roles integrated on Base Sepolia testnet ✅
