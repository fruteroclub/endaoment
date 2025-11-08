# Epic 7: Retail Donor UI Flow

**Duration**: 8-12 hours
**Status**: ⏳ TODO
**Dependencies**: Epic 2 complete (vault marketplace exists)
**Developer**: External developer (UI-focused, contracts integration in Epic 9)

## Overview

Build the complete retail donor user interface flow, allowing users with $10+ to browse vaults, deposit funds, and participate in allocation voting. This epic focuses on UI/UX implementation with mock data and simulated transactions. Contract integration will be handled separately in Epic 9.

**User Journey**: Browse vaults → Select vault → Deposit USDC → Allocate votes → View impact

---

## User Flow Analysis (from diagram)

Based on the "Donante Retail" path in the user flow diagram:

```
Entry Point: "Home/Landing Page"
↓
Action: "Browse available vaults"
↓
Decision: "Select vault to join"
↓
Action: "Review vault details (strategy, performance, donors)"
↓
Action: "Deposit USDC (min $10)"
↓
Action: "Receive vault shares (ERC-4626)"
↓
Decision: "Allocate votes?"
├─ Yes → "Vote allocation interface" → "Submit votes"
└─ No → "View dashboard"
↓
Action: "Monitor yield accrual"
↓
Action: "View distribution history"
```

---

## Tickets

### E7-T1: Vault Marketplace Browse Page
**Estimate**: 2-3 hours
**Dependencies**: Epic 2 vault UI components

Create the main marketplace where retail donors browse available vaults.

**Page**: `/vaults` (enhance existing page for retail focus)

**Tasks**:
- Design vault card components with key metrics
- Add filtering (by strategy, TVL, APY, whale reputation)
- Add sorting (newest, highest APY, most popular)
- Show vault health indicators (depositors, time active, yield generated)
- Implement search functionality
- Add pagination or infinite scroll
- Create empty state for no vaults

**UI Components**:
- `VaultCard`: Compact vault summary card
- `VaultFilters`: Filter sidebar or dropdown
- `VaultSorting`: Sort controls
- `VaultSearch`: Search bar component

**Mock Data Structure**:
```typescript
interface VaultCardData {
  id: string;
  name: string;
  whaleAddress: string;
  whaleName?: string; // Optional reputation
  strategy: string;
  tvl: number; // Total Value Locked in USDC
  apy: number; // Annual Percentage Yield
  depositors: number;
  createdAt: Date;
  yieldGenerated: number;
  status: 'active' | 'paused';
}
```

**Acceptance Criteria**:
- [ ] Vault marketplace displays 3+ mock vaults
- [ ] Filtering works for all categories
- [ ] Sorting updates vault order correctly
- [ ] Search filters by vault name or whale name
- [ ] Clicking vault card navigates to detail page
- [ ] Responsive design works on mobile
- [ ] Empty state shows when no vaults match filters

**Mock Data** (create 5 diverse vaults):
1. Aave Stable Strategy - $50K TVL, 5% APY
2. Compound Yield Optimizer - $120K TVL, 6.2% APY
3. Conservative DeFi Mix - $30K TVL, 4.5% APY
4. High-Yield Aggregator - $200K TVL, 7.8% APY
5. Student Impact Fund - $80K TVL, 5.5% APY

---

### E7-T2: Vault Detail Page (Retail Perspective)
**Estimate**: 2-3 hours
**Dependencies**: E7-T1

Detailed vault information page optimized for retail donors making deposit decisions.

**Page**: `/vaults/[id]` (retail-focused enhancements)

**Tasks**:
- Show vault overview (name, strategy, whale info)
- Display key metrics (TVL, APY, depositors, your shares)
- Show strategy description and risk level
- Display yield distribution breakdown (10/15/75)
- Show recent activity feed (deposits, distributions)
- Add "Deposit Now" CTA button
- Show your position (shares owned, yield earned)
- Display top depositors (leaderboard style)
- Add vault performance chart (yield over time)

**UI Sections**:
1. **Hero Section**: Vault name, strategy, key stats
2. **Your Position**: Personal stats (if deposited)
3. **Performance**: Yield chart and metrics
4. **Activity Feed**: Recent transactions
5. **About**: Strategy details and risk info
6. **Depositors**: Community stats

**Acceptance Criteria**:
- [ ] All vault details display correctly
- [ ] Your position section shows real-time data
- [ ] Performance chart visualizes yield over time
- [ ] Activity feed shows recent transactions
- [ ] "Deposit Now" button navigates to deposit flow
- [ ] Responsive design adapts to mobile
- [ ] Loading states for async data

---

### E7-T3: Deposit Flow UI
**Estimate**: 2-3 hours
**Dependencies**: E7-T2

Complete deposit flow for retail donors (10+ USDC).

**Page**: `/vaults/[id]/deposit` (new page or modal)

**Tasks**:
- Create deposit input form
- Add USDC balance display
- Show deposit amount validation (min $10)
- Calculate estimated shares to receive
- Show approval step UI (USDC approval)
- Show deposit confirmation step
- Add transaction simulation UI
- Create success state with share receipt
- Add error handling for common issues

**Flow Steps**:
1. **Input Amount**: Enter USDC amount (≥10)
2. **Review**: Show deposit summary and estimated shares
3. **Approve**: Simulate USDC approval (mock transaction)
4. **Deposit**: Simulate deposit transaction
5. **Success**: Show success message with shares received

**UI Components**:
- `DepositForm`: Amount input with validation
- `DepositReview`: Summary before confirmation
- `TransactionProgress`: Step indicator (approve → deposit)
- `DepositSuccess`: Success screen with next actions

**Validation Rules**:
- Minimum deposit: $10 USDC
- Maximum deposit: User's USDC balance
- Must have sufficient gas (show warning)
- Vault must be active

**Acceptance Criteria**:
- [ ] User can enter deposit amount
- [ ] Validation prevents deposits < $10
- [ ] Balance check prevents over-depositing
- [ ] Transaction steps are clear and visual
- [ ] Success state shows shares received
- [ ] Error messages are helpful and actionable
- [ ] User can cancel at any step
- [ ] Redirects to vault dashboard after success

**Mock Transaction Simulation**:
```typescript
async function simulateDeposit(amount: number) {
  // Step 1: Approve (2 second delay)
  await sleep(2000);

  // Step 2: Deposit (3 second delay)
  await sleep(3000);

  // Calculate shares (simplified ERC-4626 math)
  const shares = calculateShares(amount, vaultTotalAssets, vaultTotalSupply);

  return { success: true, shares, txHash: generateMockTxHash() };
}
```

---

### E7-T4: Personal Dashboard
**Estimate**: 2-3 hours
**Dependencies**: E7-T3

Retail donor personal dashboard showing all deposits and yield earned.

**Page**: `/dashboard` (new page)

**Tasks**:
- Show portfolio overview (total deposited, total yield)
- List all vaults user has deposited to
- Show yield accrual for each vault
- Display voting power (shares = votes)
- Show pending allocations
- Add quick actions (deposit more, allocate votes)
- Create notification area (distributions, epoch changes)
- Add transaction history table

**Dashboard Sections**:
1. **Portfolio Summary**: Total stats across all vaults
2. **Your Vaults**: List of vaults with positions
3. **Yield Tracker**: Visual representation of earnings
4. **Voting Power**: Available votes and allocations
5. **Activity**: Recent transactions
6. **Notifications**: Important updates

**Key Metrics**:
- Total deposited (USDC)
- Total yield earned (USDC)
- Number of vaults
- Total voting power (shares)
- Yield rate (APY weighted average)

**Acceptance Criteria**:
- [ ] Portfolio summary shows accurate totals
- [ ] All vault positions display correctly
- [ ] Yield updates reflect mock accrual
- [ ] Voting power calculations are correct
- [ ] Transaction history is chronological
- [ ] Quick actions navigate to correct pages
- [ ] Notifications show relevant updates
- [ ] Empty state for new users

---

### E7-T5: Allocation Voting Interface
**Estimate**: 2-3 hours
**Dependencies**: E7-T4

Interface for retail donors to allocate their voting power to students.

**Page**: `/vaults/[id]/allocate` (enhance existing page)

**Tasks**:
- Show current epoch information (time remaining)
- Display user's voting power (shares in vault)
- Show list of eligible students
- Create allocation slider/input for each student
- Show real-time allocation percentage
- Validate total allocation = 100%
- Add allocation preview
- Create confirmation modal
- Show pending vs confirmed allocations
- Add success state after submission

**UI Components**:
- `EpochBanner`: Current epoch status and countdown
- `StudentAllocationCard`: Student info with allocation input
- `AllocationSummary`: Running total and validation
- `AllocationPreview`: Impact preview before confirmation

**Student Card Information**:
- Student name and photo
- University and research area
- Total funding received to date
- Current allocation from this vault
- Your proposed allocation

**Allocation Controls**:
- Slider (0-100% per student)
- Direct input field
- Quick allocation buttons (10%, 25%, 50%)
- "Distribute Equally" button
- Reset button

**Validation Rules**:
- Total allocation must equal 100%
- Cannot allocate to inactive students
- Must allocate to at least 1 student
- Allocation can be changed until epoch ends

**Acceptance Criteria**:
- [ ] User sees their available voting power
- [ ] All eligible students display
- [ ] Allocation controls work smoothly
- [ ] Running total updates in real-time
- [ ] Validation prevents invalid allocations
- [ ] Preview shows impact calculation
- [ ] Submission simulates transaction
- [ ] Success state confirms allocation
- [ ] Can edit allocation before epoch ends

**Mock Allocation Logic**:
```typescript
interface Allocation {
  studentAddress: string;
  percentage: number; // 0-100
}

function validateAllocation(allocations: Allocation[]): boolean {
  const total = allocations.reduce((sum, a) => sum + a.percentage, 0);
  return total === 100 && allocations.every(a => a.percentage >= 0);
}
```

---

### E7-T6: Impact Visualization
**Estimate**: 1-2 hours
**Dependencies**: E7-T5

Visual representation of retail donor's impact on student funding.

**Location**: Dashboard and vault detail pages

**Tasks**:
- Create yield earnings chart (over time)
- Show student funding impact (who benefited)
- Display voting history
- Add distribution timeline
- Create impact metrics cards
- Build "Your Impact" summary section

**Visualizations**:
1. **Yield Chart**: Line graph showing yield accrual
2. **Student Impact**: Pie chart of allocations
3. **Distribution Timeline**: Historical distributions
4. **Impact Metrics**: Total students funded, total impact

**Metrics to Display**:
- Total yield contributed to students: $XXX
- Number of students funded: X
- Average allocation per student: $XX
- Epochs participated: X
- Current APY: X.X%

**Acceptance Criteria**:
- [ ] Charts display mock data correctly
- [ ] Impact metrics calculate accurately
- [ ] Student funding breakdown is clear
- [ ] Historical data shows over time
- [ ] Responsive charts work on mobile
- [ ] Data updates after each distribution

---

### E7-T7: Wallet Connection & Profile
**Estimate**: 1-2 hours
**Dependencies**: Existing wallet infrastructure

Create retail donor profile and wallet management.

**Tasks**:
- Enhance wallet connection for retail context
- Create user profile page
- Show wallet balances (USDC, ETH)
- Display transaction history
- Add settings (notifications, display preferences)
- Create onboarding flow for first-time users
- Add help/FAQ section

**Profile Features**:
- Connected wallet address
- Nickname/display name (optional)
- Member since date
- Total contributions
- Impact score
- Badges/achievements (optional gamification)

**Onboarding Checklist** (for new users):
- [ ] Connect wallet
- [ ] Get testnet USDC (link to faucet)
- [ ] Browse vaults
- [ ] Make first deposit
- [ ] Allocate votes

**Acceptance Criteria**:
- [ ] Wallet connects smoothly
- [ ] Profile displays user stats
- [ ] Transaction history is complete
- [ ] Settings save preferences
- [ ] Onboarding guides new users
- [ ] Help resources are accessible

---

## Design System & Components

### Reusable Components to Build
```
components/retail/
├── VaultCard.tsx              # Vault summary card
├── VaultFilters.tsx           # Filter controls
├── DepositForm.tsx            # Deposit input form
├── AllocationSlider.tsx       # Student allocation control
├── YieldChart.tsx             # Yield visualization
├── TransactionProgress.tsx    # Multi-step transaction UI
├── ImpactMetrics.tsx          # Impact stats display
└── EpochBanner.tsx            # Current epoch status
```

### Design Patterns
- **Card-based layouts**: Easy scanning of vaults and stats
- **Progressive disclosure**: Show details on demand
- **Clear CTAs**: Prominent action buttons
- **Visual feedback**: Loading states, success animations
- **Helpful tooltips**: Explain technical terms
- **Responsive design**: Mobile-first approach

---

## Mock Data Requirements

### Mock Vaults (5 vaults)
```typescript
const mockVaults: VaultData[] = [
  {
    id: '1',
    name: 'Aave Stable Strategy',
    whaleAddress: '0x1234...',
    whaleName: 'CryptoPhilanthropist',
    strategy: 'Conservative Aave lending',
    tvl: 50000,
    apy: 5.0,
    depositors: 45,
    createdAt: new Date('2024-01-15'),
    yieldGenerated: 2500,
    status: 'active'
  },
  // ... 4 more vaults
];
```

### Mock Students (8 students from Epic 1)
Use existing student mock data from Epic 1.

### Mock Transactions
```typescript
interface Transaction {
  id: string;
  type: 'deposit' | 'allocation' | 'distribution';
  vaultId: string;
  amount: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
  txHash: string;
}
```

---

## User Flow Testing Checklist

### Happy Path
- [ ] New user connects wallet
- [ ] User browses vault marketplace
- [ ] User views vault details
- [ ] User deposits $50 USDC
- [ ] User receives shares
- [ ] User allocates votes to 3 students
- [ ] User views impact on dashboard
- [ ] User sees yield accrual over time

### Edge Cases
- [ ] User tries to deposit < $10 (validation error)
- [ ] User tries to deposit more than balance (error)
- [ ] User tries to allocate without deposits (no voting power)
- [ ] User tries to allocate <100% or >100% (validation)
- [ ] Vault is paused (cannot deposit)
- [ ] Epoch ended (cannot change allocation)

### Multi-Vault Scenario
- [ ] User deposits to 2 different vaults
- [ ] Dashboard shows both positions
- [ ] User can allocate separately for each vault
- [ ] Yield tracks independently

---

## Not Included (Deferred to Epic 9)

These features require smart contract integration:
- ❌ Real USDC transactions (mock only in Epic 7)
- ❌ Actual ERC-4626 share minting
- ❌ On-chain allocation recording
- ❌ Real yield distribution
- ❌ Blockchain transaction confirmations
- ❌ Event listeners for real-time updates
- ❌ Gas estimation and optimization

**Epic 9 will handle**: Connecting all UI flows to deployed contracts

---

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- DaisyUI + Tailwind CSS
- React hooks for state management
- Mock data services (replace in Epic 9)

### State Management
```typescript
// Mock data context
const RetailDonorContext = createContext({
  vaults: mockVaults,
  userDeposits: mockDeposits,
  userAllocations: mockAllocations,
  depositToVault: mockDepositFunction,
  allocateVotes: mockAllocationFunction,
});
```

---

## Deliverables

After Epic 7 completion:
- ✅ Complete vault marketplace with filtering/sorting
- ✅ Detailed vault pages optimized for retail donors
- ✅ Full deposit flow (10+ USDC) with validation
- ✅ Personal dashboard with portfolio overview
- ✅ Allocation voting interface with validation
- ✅ Impact visualization with charts
- ✅ Wallet connection and profile management
- ✅ All flows work with mock data
- ✅ Responsive design for mobile/desktop
- ✅ Ready for contract integration (Epic 9)

**Timeline**: 8-12 hours for external developer (UI-focused)

**Next**: [Epic 8 - Student UI](epic-8-student-ui.md)
