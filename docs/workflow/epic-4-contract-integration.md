# Epic 4: Frontend-Contract Integration (All User Flows)

**Duration**: 18-24 hours
**Status**: ⏳ TODO
**Dependencies**: Epic 3 complete (contracts deployed to Base Sepolia)

**Scope**: Comprehensive implementation of whale, retail donor, and student flows with full contract integration. This epic consolidates what was previously split across Epics 4, 7, 8, and 9.

## Overview

Integrate the deployed smart contracts (EndaomentVault, StudentRegistry, AllocationManager, MockUSDC) with the complete frontend user flows for all three personas: Whale, Retail Donor, and Student. Replace all mock data and simulated transactions with real on-chain interactions.

## User Flow Reference

This epic implements the three user journeys from `docs/architecture/user-flows.jpeg`:

### 🐋 Whale Flow (Large Donors: $1000+)
```
Connect Wallet → Create Vault → Deposit USDC → Set Strategy → Allocate Votes → Monitor Impact
```

### 💰 Retail Donor Flow (Small Donors: $10+)
```
Connect Wallet → Browse Vaults → Select Vault → Deposit USDC → Receive Shares →
Allocate Votes → View Dashboard → Track Impact
```

### 🎓 Student Flow (Research Beneficiaries)
```
Connect Wallet → Create Profile → Submit Verification → Showcase Research →
Receive Funding → Track Milestones → View Analytics
```

All three flows converge at the **allocation voting** stage, where donors (whale + retail) allocate their voting power to students, determining how the 75% student portion of yield is distributed each epoch.

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

### E4-T2: Whale Vault Creation Flow
**Estimate**: 3-4 hours
**Dependencies**: E4-T1
**User Flow**: 🐋 Whale - Create Vault

Connect `/vault/create` page to real EndaomentVault deployment with comprehensive whale onboarding.

**Tasks**:
- Create multi-step vault creation form
  - Step 1: Vault details (name, description, strategy)
  - Step 2: Initial deposit amount (minimum 1000 USDC)
  - Step 3: Review and confirm
- Update `CreateVaultForm` to use `useScaffoldWriteContract`
- Call `EndaomentVault.constructor()` with whale deposit
- Handle USDC approval flow before vault creation
- Show transaction status and confirmation
- Redirect to whale dashboard after successful creation
- Store vault metadata (name, description) in localStorage or IPFS
- Add vault to marketplace immediately

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

### E4-T3: Retail Donor Marketplace & Deposit Flow
**Estimate**: 4-5 hours
**Dependencies**: E4-T2
**User Flow**: 💰 Retail Donor - Browse → Deposit

Build complete retail donor experience: vault marketplace with discovery features and deposit flow.

**Marketplace Features** (`/vaults`):
- Vault card grid with key metrics (TVL, APY, depositors, whale name)
- Filtering: by strategy, TVL range, APY, whale reputation
- Sorting: newest, highest APY, most popular, trending
- Search: by vault name or whale name
- Featured vaults section
- Responsive card layout with loading states

**Vault Detail Page** (`/vaults/[id]`):
- Hero section: vault name, strategy, key stats, whale info
- Your position: shares owned, yield earned (if deposited)
- Performance chart: yield accrual over time
- Activity feed: recent deposits and distributions
- Strategy details: risk level, allocation approach
- Top depositors: leaderboard of retail participants
- "Deposit Now" prominent CTA

**Deposit Flow** (`/vaults/[id]/deposit`):
- Deposit input form with USDC balance display
- Minimum validation (10 USDC)
- Estimated shares calculation (convertToShares preview)
- USDC approval step UI
- Deposit confirmation step
- Transaction progress indicator
- Success state with shares received
- Redirect to personal dashboard

**Tasks**:
- Build VaultCard, VaultFilters, VaultSorting components
- Connect marketplace to read from EndaomentVault contracts
- Create DepositForm with validation
- Update to use real `deposit()` function
- Handle USDC approval for retail deposits (10+ USDC)
- Show user's share balance after deposit
- Update vault stats (TVL, depositors) from contract state
- Display transaction history from events
- Add real-time vault discovery (listen for new vault creation)

**Acceptance Criteria**:
- [ ] Retail user can deposit 10+ USDC to existing vault
- [ ] User receives proportional ERC-4626 shares
- [ ] Vault TVL updates correctly
- [ ] User can see their share balance
- [ ] Deposit history shows on vault page

---

### E4-T4: Student Profile Creation & Display
**Estimate**: 4-5 hours
**Dependencies**: E4-T1
**User Flow**: 🎓 Student - Create Profile → Showcase Research

Build complete student experience: profile creation, public display, and discovery.

**Profile Creation Flow** (`/student/create`):
- Multi-step form:
  - Step 1: Basic info (name, email, wallet, avatar)
  - Step 2: Academic info (university, degree, year, research area tags)
  - Step 3: Research details (title, description, goals, expected impact)
  - Step 4: Social links (Twitter, GitHub, LinkedIn - optional)
  - Step 5: Preview and submit
- Rich text editor for research description
- Research area tag selector (AI, Climate Science, Public Health, etc.)
- Form validation and draft saving
- Submit to StudentRegistry contract
- Verification status display (pending/verified/rejected)

**Public Profile Page** (`/student/[address]`):
- Hero section: photo, name, university, verification badge
- Quick stats: total funding, donor count, current votes
- Research overview card
- Detailed research section (expandable)
- Funding history timeline
- Milestones and achievements
- "Support This Student" CTA (links to allocation)
- Social links section
- Related students (same research area)

**Student Discovery Browse** (`/students`):
- Student card grid layout
- Filtering: research area, university, funding range, verification status
- Sorting: most funded, most votes (current epoch), newest, trending
- Search: by name, university, research keywords
- Featured students section
- Empty state for no results
- Pagination or infinite scroll

**Tasks**:
- Create ProfileForm with multi-step wizard
- Build StudentCard, ProfileHero, ResearchDetails components
- Connect to StudentRegistry.registerStudent()
- Update student data fetching to read from `StudentRegistry`
- Show students registered on-chain
- Display `totalReceived` for each student
- Show funding history from contract events
- Add student discovery page with filtering/sorting
- Create verification badge component

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

### E4-T5: Allocation Voting Interface
**Estimate**: 3-4 hours
**Dependencies**: E4-T3, E4-T4
**User Flow**: 🐋💰 Whale + Retail - Allocate Votes to Students

Build comprehensive voting interface where donors allocate their voting power to students.

**Allocation Page** (`/vaults/[id]/allocate`):
- Epoch banner: current epoch number, time remaining, countdown timer
- Your voting power display: shares in vault = votes available
- Student list: all eligible students from StudentRegistry
- Student allocation cards with:
  - Student photo, name, university, research title
  - Total funding received to date
  - Current votes in this epoch
  - Allocation input: slider (0-100%) or direct input
  - Quick buttons: 10%, 25%, 50%, "Distribute Equally"
- Running total: allocation percentage (must equal 100%)
- Allocation preview: projected student funding based on current yield
- Validation: total = 100%, only active students, at least 1 student
- Confirmation modal before submission
- Success state after vote recording

**Vote Management**:
- Show pending vs finalized allocations
- Allow editing allocation before epoch ends
- Display vote history (past epochs)
- Show impact of your votes (students funded)

**Tasks**:
- Create EpochBanner, StudentAllocationCard, AllocationSummary components
- Fetch current epoch from `AllocationManager`
- Show user's voting power (based on shares)
- Update allocation UI to call `allocateVotes()`
- Handle multi-student allocation transaction
- Show pending vs finalized allocations
- Display vote totals per student
- Add real-time vote total updates (event listeners)
- Create allocation preview calculator

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

### E4-T6: Personal Dashboards & Impact Visualization
**Estimate**: 3-4 hours
**Dependencies**: E4-T3, E4-T4, E4-T5
**User Flow**: All personas - Monitor positions and impact

Build role-specific dashboards for whale, retail, and student users.

**Retail Donor Dashboard** (`/dashboard`):
- Portfolio overview: total deposited, total yield earned, number of vaults
- Your vaults list: positions with TVL, shares, yield earned
- Yield tracker: visual representation of earnings over time
- Voting power: available votes and current allocations
- Transaction history: chronological deposits and distributions
- Impact metrics: students funded, total impact
- Quick actions: deposit more, allocate votes, view impact

**Student Dashboard** (`/student/dashboard`):
- Overview stats: total funding, active donors, current votes
- Current epoch status: real-time voting, projected distribution
- Funding sources: breakdown by vault with charts
- Voting trends: chart showing vote history over epochs
- Funding history analytics: timeline, donor leaderboard
- Milestones tracker: research progress and achievements
- Profile completeness score with suggestions
- Notifications: distributions, new votes, epoch changes

**Yield Distribution Display** (all dashboards):
- Real-time yield accrual display (`getAccruedYield()`)
- Split breakdown visualization (10% whale, 15% retail, 75% students)
- Distribution history timeline from events
- Student funding breakdown (who received what)
- Your earnings: claim history and pending

**Impact Visualization Components**:
- YieldChart: line graph of yield over time
- ImpactMetrics: total students funded, funding impact stats
- FundingTimeline: historical distributions
- StudentImpactBreakdown: pie chart of allocations
- VotingTrendChart: vote history by epoch

**Tasks**:
- Create role-specific dashboard layouts
- Build portfolio overview for retail donors
- Create student analytics dashboard
- Display `getAccruedYield()` for each vault
- Show split breakdown (10% whale, 15% retail, 75% students)
- Add "Distribute Yield" button for epoch finalization (admin/whale)
- Show distribution history from events
- Update student balances after distribution
- Build impact visualization components
- Add milestone tracking for students
- Create notifications system

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

### User Flow Testing by Persona

#### 🐋 Whale Flow Testing
- [ ] Connect wallet with 1000+ USDC
- [ ] Create vault with name, strategy, and initial deposit
- [ ] Vault appears in marketplace immediately
- [ ] Whale dashboard shows vault position
- [ ] Whale can allocate 100% of votes to students
- [ ] Whale receives 10% of yield after distribution
- [ ] Whale can create multiple vaults

#### 💰 Retail Donor Flow Testing
- [ ] Connect wallet with 10+ USDC
- [ ] Browse vault marketplace with filters/sorting
- [ ] View vault detail page with all metrics
- [ ] Deposit 10 USDC to existing vault
- [ ] Receive proportional ERC-4626 shares
- [ ] Personal dashboard shows position accurately
- [ ] Allocate votes to multiple students (must equal 100%)
- [ ] Receive 15% yield proportional to shares
- [ ] Can deposit to multiple vaults
- [ ] Impact visualization shows students funded

#### 🎓 Student Flow Testing
- [ ] Connect wallet as student
- [ ] Complete multi-step profile creation
- [ ] Submit to StudentRegistry contract
- [ ] Profile verification (mock admin approval)
- [ ] Public profile displays correctly
- [ ] Appear in student discovery browse
- [ ] Appear in allocation voting UI
- [ ] Receive funding after distribution
- [ ] Student dashboard shows current votes
- [ ] Funding history displays correctly
- [ ] Can add research milestones
- [ ] Projected funding calculates based on votes

### Integration Test Scenarios

1. **Complete Cross-Flow Lifecycle**:
   ```
   Whale creates vault with 10,000 USDC
   → Retail1 deposits 100 USDC
   → Retail2 deposits 50 USDC
   → Student registers profile
   → Whale allocates 50/50 to Student1/Student2
   → Retail1 allocates 100% to Student1
   → Retail2 allocates 100% to Student2
   → Fast-forward 30 days (yield accrual)
   → Finalize epoch
   → Distribute yield
   → Verify: Whale gets 10%, Retail gets 15% (proportional), Students get 75% (by votes)
   → Student dashboard updates with funding
   → Retail dashboard shows impact
   ```

2. **Multi-Vault Scenario**:
   ```
   Whale creates Vault A
   → Whale creates Vault B
   → Retail deposits to both vaults
   → Different vote allocations per vault
   → Verify independent distributions
   → Verify dashboard shows both positions
   ```

3. **Student Discovery → Funding Flow**:
   ```
   New student registers
   → Profile verified
   → Appears in discovery browse
   → Retail donor finds via search
   → Views student profile
   → Allocates votes to student
   → Student receives funding in next distribution
   ```

### Error Handling Tests
- [ ] Deposit with insufficient USDC balance (show error)
- [ ] Deposit below minimum (10 USDC for retail, 1000 for whale)
- [ ] Allocate votes totaling <100% or >100% (validation)
- [ ] Allocate to deactivated student (error)
- [ ] Change allocation after epoch ends (prevent)
- [ ] Register duplicate student (error)
- [ ] Create vault with insufficient deposit (error)
- [ ] Distribute yield before epoch ends (prevent)

### Edge Cases
- [ ] Single participant vault (whale only)
- [ ] No students registered (empty state)
- [ ] No yield accrued (zero distribution)
- [ ] Student with zero votes (receives nothing)
- [ ] Retail with tiny shares (dust amounts)
- [ ] Multiple allocations in same epoch (last one wins)
- [ ] Vault with zero deposits (cannot distribute)

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

### Whale Flow Complete
- ✅ Vault creation with 1000+ USDC initial deposit
- ✅ Whale dashboard with vault management
- ✅ Vote allocation interface
- ✅ 10% yield distribution
- ✅ Multi-vault support

### Retail Donor Flow Complete
- ✅ Vault marketplace with discovery (filtering, sorting, search)
- ✅ Detailed vault pages with performance metrics
- ✅ Deposit flow (10+ USDC) with USDC approval
- ✅ Personal dashboard with portfolio overview
- ✅ Vote allocation to students
- ✅ 15% yield distribution (proportional to shares)
- ✅ Impact visualization
- ✅ Multi-vault participation

### Student Flow Complete
- ✅ Multi-step profile creation form
- ✅ StudentRegistry contract integration
- ✅ Public profile pages with research showcase
- ✅ Student discovery browse page
- ✅ Private student dashboard with analytics
- ✅ Funding history and projections
- ✅ Milestone tracking
- ✅ 75% yield distribution (by vote weight)
- ✅ Voting trend visualization

### Technical Integration
- ✅ All flows connected to real contracts
- ✅ USDC approval and deposit transactions
- ✅ ERC-4626 share minting and tracking
- ✅ Allocation voting persisted on-chain
- ✅ Yield distribution with 10/15/75 split
- ✅ Transaction history from events
- ✅ Real-time event listeners
- ✅ Cross-flow data consistency
- ✅ Comprehensive error handling
- ✅ Fully functional dApp on Base Sepolia testnet

**Outcome**: Complete three-persona dApp with all user flows integrated on Base Sepolia

**Next**: [Epic 5 - Production Launch](epic-5-production-launch.md)
