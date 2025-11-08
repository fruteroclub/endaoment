# Endaoment - Project Requirements Specification

**Last Updated**: 2025-01-07
**Status**: Frontend MVP Phase
**Hackathon**: Octant DeFi Hackathon 2025

---

## 📋 **Executive Summary**

**Endaoment** is a Farcaster Miniapp that provides an alternative to traditional university endowments by enabling donors to fund student beneficiaries through DeFi yield generation. Built on Base chain, it uses Octant V2's allocation mechanism to create perpetual scholarships without depleting principal.

### **Core Value Proposition**
"Transform donations into perpetual scholarships through DeFi yield"

---

## 🎯 **Problem Statement**

### **Traditional Endowment Challenges** (from research docs)

**United States**:
- Over-allocation in illiquid alternative assets (private equity, hedge funds)
- Slow distributions during market turmoil
- Donor vulnerability to economic cycles

**LATAM (Mexico)**:
- 10,000+ students lost scholarship support in 2023 (Conacyt fund eliminations)
- University dropout rates: 7.5-8.5% (1 in 10 drops out)
- Tuition costs: $14,500-$111,000/semester vs $120/day minimum wage
- Postdoctoral scholarships abroad reduced from 103 (2018) to 50 (2019)

**Brazil**:
- Fundraising and profitability challenges after 2021 economic downturn
- Geographic concentration (38 of 52 endowments in São Paulo)
- Power concentration (40/52 endowments focused on Education)
- Short-term giving culture (lacks perpetuity focus)
- CNPq funding declined to 29.6% of 2013 levels by 2021
- 64% of students cannot pursue higher education without financial support

---

## 🧑‍🎓 **Target Users**

### **Primary: Crypto-Native Donors** (MVP Focus)
- **Demographics**: Active on Farcaster, Base ecosystem participants, DeFi-aware
- **Motivation**: Transparent giving, perpetual impact, social proof/sharing
- **Pain Points**: Uncertainty about donation efficiency, lack of impact tracking
- **Success Criteria**: Easy donation flow, visible yield generation, shareable milestones

### **Secondary: Student Beneficiaries** (Future Phase)
- **Demographics**: LATAM university students (undergrad, masters, PhD, postdoc)
- **Motivation**: Funding for research, equipment, courses, living expenses
- **Pain Points**: Unreliable scholarship access, bureaucratic processes
- **Success Criteria**: Regular funding, simple claiming, impact reporting

### **Tertiary: Universities/Organizations** (Future Phase)
- **Demographics**: LATAM universities, research institutions, NGOs
- **Motivation**: Stable funding source, reduced dependency on government/traditional donors
- **Pain Points**: Volatile funding, complex endowment management
- **Success Criteria**: Predictable yield distributions, minimal overhead

---

## 🏗️ **MVP Architecture**

### **Tech Stack**
- **Framework**: Scaffold-ETH 2 (Next.js App Router + Hardhat)
- **Blockchain**: Base (L2 for low fees + Coinbase ecosystem)
- **Smart Contracts**: Octant V2 MultistrategyVault, AllocationMechanism
- **Frontend**: Next.js 15, OnchainKit, MiniKit, TailwindCSS, DaisyUI
- **Social**: Farcaster Miniapp with Frames integration
- **Yield Strategies**: Aave, Morpho (both available on Base)

### **Smart Contract Layer** (Planned)

#### **Core Contracts** (Adapted from Octant V2)
1. **EndaomentVault.sol** (fork of MultistrategyVault)
   - ERC-4626 compliant vault
   - Accepts USDC/ETH deposits from donors
   - Routes funds to yield strategies (Aave, Morpho)
   - Tracks donor balances and epoch participation
   - Principal remains locked, only yield distributed

2. **AllocationMechanism.sol** (fork of TokenizedAllocationMechanism)
   - Implements quadratic funding formula
   - 30-day epochs with 7-day voting windows
   - Calculates distribution amounts per student
   - Emits AllocationSet events for frontend tracking

3. **BeneficiaryRegistry.sol** (custom, simple)
   - Whitelist of verified student wallet addresses
   - On-chain metadata: wallet, funding goal, category
   - Off-chain metadata via IPFS: name, bio, university, impact metrics
   - Admin-controlled (multisig) for adding/removing beneficiaries

4. **YieldDistributor.sol** (custom, simple)
   - Receives allocated yield from AllocationMechanism
   - Distributes to student wallets based on allocation results
   - Emits YieldDistributed events
   - Pull-based (students claim) or push-based (automatic transfer)

#### **Yield Strategies** (Pluggable)
- **AaveUSDCStrategy**: Lends USDC to Aave on Base
- **MorphoWETHStrategy**: Supplies WETH to Morpho vaults
- **Future**: cbETH staking, Yearn-style aggregators

### **Frontend Layer** (Current Phase)

#### **Pages Implemented**
✅ **Homepage** (`/`)
- Hero with platform stats (total donated, yield generated, students supported)
- Grid of student cards (8 students from seed data)
- "How It Works" explainer section
- Epoch voting banner (if voting open)
- Filter/sort controls (UI only, not functional yet)

#### **Pages To Implement**
🔲 **Student Detail** (`/student/[id]`)
- Full student profile with extended bio
- Complete impact metrics list
- Donation history for this student
- "Fund This Student" CTA
- Shareable as Farcaster Frame

🔲 **Donation Flow** (`/donate/[id]`)
- Amount selection (preset amounts + custom)
- Token selection (USDC or ETH)
- MiniKit wallet connection
- Transaction confirmation with OnchainKit
- Success screen with Farcaster sharing Frame

🔲 **Allocation/Voting** (`/allocate`)
- Current epoch details and countdown
- Donor's available yield amount
- Allocation sliders for each student (0-100%)
- Real-time calculation of distribution
- Submit allocation (signature or transaction)
- Quadratic funding visualization

🔲 **Donor Dashboard** (`/dashboard`)
- Personal stats: total donated, yield earned, students supported
- Donation history table
- Allocation history by epoch
- Impact stories from supported students
- Withdraw principal option (future)

#### **Components Implemented**
✅ **StudentCard**
- Displays student profile summary
- Funding progress bar with color coding
- Impact metrics badges
- Links to detail page and donation flow
- Category and verification badges

✅ **MinikitProvider**
- Wraps app with OnchainKit provider
- Configures Base chain
- Enables MiniKit features

#### **Components To Implement**
🔲 **DonateButton**: One-click donation with MiniKit wallet
🔲 **AllocationSlider**: Yield allocation UI per student
🔲 **ImpactMetrics**: Detailed student impact display
🔲 **ShareFrame**: Farcaster Frame generator for sharing
🔲 **EpochTimer**: Countdown to voting deadline
🔲 **YieldBreakdown**: Visualize yield from different strategies

---

## 📊 **Data Layer**

### **Seed Data** (Hardcoded for MVP)
- **8 Students** across Brazil, Mexico, Argentina, Colombia
- **Universities**: USP, UFRJ, UNAM, Tec de Monterrey, UBA, UniAndes, IPN, PUC-Rio
- **Fields**: CS, Engineering, Biology, Economics, Physics, Psychology, Robotics
- **Categories**: Undergraduate, Masters, PhD, Postdoc
- **Mock Funding**: $2,500-$6,000/year goals, varied progress levels
- **Impact Metrics**: Publications, presentations, equipment, courses, research

### **Mock Platform Stats**
- Total Donated: $45,678
- Yield Generated: $3,421
- Students Supported: 8
- Active Donors: 127
- Current Epoch: 5

### **Epoch Configuration**
- Duration: 30 days
- Voting Window: 7 days (first week of epoch)
- Current Epoch: Jan 1-31, 2025 (voting open)

---

## 🎨 **Design System**

### **UI Framework**: DaisyUI (Tailwind CSS components)
- Theme: Default (customizable later)
- Primary color: Blue (donations, CTAs)
- Secondary color: Purple (allocations, yield)
- Success: Green (high funding progress)
- Warning: Amber (medium funding progress)
- Error: Red (low funding progress)

### **Typography**
- Headings: Bold, large for impact
- Body: Clear, readable (16px base)
- Stats: Extra large for emphasis

### **Layout Patterns**
- **Grid**: 1/2/3/4 columns responsive
- **Cards**: Consistent shadow, hover effects
- **Hero**: Gradient backgrounds (primary/secondary)
- **Stats**: DaisyUI stats component
- **Forms**: Clear labels, validation states

---

## 🎯 **User Flows**

### **Flow 1: New Donor Discovery**
1. Sees Endaoment Frame in Farcaster feed (shared by friend)
2. Clicks Frame → Opens Miniapp in Base App
3. Lands on homepage, sees 8 student profiles
4. Clicks "Fund This Student" on Maria's card
5. Redirected to `/donate/1`
6. Selects $100 USDC
7. MiniKit prompts wallet connection (one-click if Base App)
8. Confirms transaction via OnchainKit
9. Success screen → "Share on Farcaster" button
10. Posts Frame: "I just funded Maria's AI research! 🚀"

### **Flow 2: Existing Donor Allocates Yield**
1. Receives Farcaster notification: "Epoch 5 voting open!"
2. Clicks notification → Opens `/allocate`
3. Sees: "You have $50 in yield to allocate"
4. Drags sliders:
   - Maria: 40% → $20
   - João: 30% → $15
   - Ana: 30% → $15
5. Clicks "Confirm Allocation"
6. Signs message (gas-less) or cheap Base transaction
7. Success: "Allocation recorded! Yield distributed on Jan 31"
8. Option to share on Farcaster

### **Flow 3: Student Views Impact (Future)**
1. Receives notification: "You've been allocated $200!"
2. Opens Miniapp → Goes to student dashboard
3. Sees:
   - Total allocated: $200
   - From 12 donors
   - Current epoch: Epoch 5
4. Clicks "Claim Funds"
5. Funds transferred to student wallet
6. (Optional) Uploads impact proof: research paper PDF, receipt
7. Thanks donors: Posts cast with impact story

---

## 🚀 **Implementation Roadmap**

### **Phase 1: Frontend MVP** (Current Phase - Days 1-3)
✅ **Day 1-2**: Core UI Setup
- [x] Project structure
- [x] Seed data (students, constants)
- [x] TypeScript types
- [x] MinikitProvider setup
- [x] Homepage with student grid
- [x] StudentCard component
- [x] App metadata

🔲 **Day 3**: Key Pages
- [ ] Install MiniKit dependencies (`yarn workspace @se-2/nextjs add @coinbase/minikit @coinbase/onchainkit`)
- [ ] Student detail page
- [ ] Donation flow UI (without transactions yet)
- [ ] Allocation page UI
- [ ] Donor dashboard

🔲 **Day 3-4**: Polish
- [ ] Responsive design testing
- [ ] DaisyUI theme customization
- [ ] Add placeholder images/avatars
- [ ] Error states, loading states

### **Phase 2: Smart Contracts** (Days 4-7)
🔲 **Day 4-5**: Core Contracts
- [ ] Clone Octant V2 contracts
- [ ] Adapt MultistrategyVault → EndaomentVault
- [ ] Adapt AllocationMechanism for student beneficiaries
- [ ] Write BeneficiaryRegistry
- [ ] Write YieldDistributor

🔲 **Day 6**: Deployment
- [ ] Deploy to Base Sepolia testnet
- [ ] Integrate Aave USDC strategy
- [ ] Verify contracts on Basescan
- [ ] Test with testnet funds

🔲 **Day 7**: Frontend Integration
- [ ] Connect donation flow to EndaomentVault
- [ ] Connect allocation UI to AllocationMechanism
- [ ] Read contract state for dashboard
- [ ] Event listeners for transactions

### **Phase 3: Farcaster Integration** (Days 8-9)
🔲 **Day 8**: Social Features
- [ ] Create Farcaster Frames for student profiles
- [ ] Add "Share Donation" Frame generator
- [ ] Add "Share Allocation" Frame generator
- [ ] Implement Miniapp manifest endpoint

🔲 **Day 9**: Notifications (Stretch)
- [ ] Webhook for epoch start/end
- [ ] Push notifications via Farcaster
- [ ] In-app notification banner

### **Phase 4: Polish & Demo** (Days 10-11)
🔲 **Day 10**: Testing
- [ ] End-to-end flow testing
- [ ] Mobile responsive testing
- [ ] Farcaster Miniapp testing in Base App
- [ ] Bug fixes

🔲 **Day 11**: Demo Materials
- [ ] Record demo video (2-3 min)
- [ ] Create pitch deck
- [ ] Deploy to production (Vercel + Base mainnet)
- [ ] Prepare hackathon submission

---

## ⚠️ **Risks & Mitigations**

### **1. Regulatory Compliance (Fiscal Policy)**
**Risk**: Donors may need tax receipts; orgs need 501(c)(3) or equivalent status
**MVP Mitigation**:
- Disclaimer: "Endaoment is experimental; not tax-deductible yet"
- Target crypto-native donors less concerned with tax deductions
**Post-Hackathon**:
- Partner with existing DAFs or Endaoment.org for compliant donation flows
- Implement receipt generation for verified orgs

### **2. Impact Verification**
**Risk**: No guarantee students use funds for education
**MVP Mitigation**:
- Hardcoded seed data with "verified" badge
- Trust-based model for demo
**Post-Hackathon**:
- Require university email verification
- Implement impact reporting (papers, receipts, attestations via EAS)
- Community voting to remove fraudulent beneficiaries

### **3. Smart Contract Security**
**Risk**: Bugs in vault or strategies could lose funds
**MVP Mitigation**:
- Use audited Octant V2 contracts with minimal modifications
- Deploy to testnet first
- Start with conservative strategies (Aave USDC only)
- Limit initial deposits ($1,000 cap for demo)
**Post-Hackathon**:
- Full security audit
- Bug bounty program
- Gradual TVL ramp

### **4. User Adoption (Cold Start Problem)**
**Risk**: No donors = no yield = no students funded
**MVP Mitigation**:
- Leverage Farcaster social graph for viral growth
- Target crypto-native donors already on Base
- Share Frames for organic discovery
- Seed initial TVL from hackathon team/judges
**Post-Hackathon**:
- Partnerships with LATAM crypto communities
- University outreach for student onboarding
- Donor matching programs

### **5. Yield Volatility**
**Risk**: DeFi yield rates fluctuate; may not meet student funding goals
**MVP Mitigation**:
- Set realistic expectations: "Estimated $X-Y/year based on current rates"
- Use stablecoins (USDC) for predictable yield
**Post-Hackathon**:
- Multi-strategy approach to balance risk/return
- Reserve fund to smooth distributions
- Dynamic adjustment of student funding goals

---

## 📈 **Success Metrics**

### **Hackathon Demo Metrics**
- **Donor Engagement**: 10+ test deposits, 5+ allocation transactions
- **Student Impact**: 8 students with complete profiles, 20+ impact metrics
- **Social Virality**: 5+ Farcaster Frames shared, 50+ Miniapp opens
- **Technical Completeness**: Full user flow (deposit → allocate → view dashboard)

### **Post-Hackathon Metrics** (3 months)
- **TVL**: $10,000+ in vaults
- **Donors**: 50+ unique addresses
- **Students**: 20+ verified beneficiaries
- **Yield Distributed**: $500+ total
- **Social Reach**: 1,000+ Farcaster impressions

### **Long-Term Metrics** (1 year)
- **TVL**: $100,000+
- **Donors**: 500+
- **Students**: 100+ across 10+ universities
- **Yield Distributed**: $10,000+ total
- **Retention**: 50%+ donor re-allocation rate per epoch

---

## 🤝 **Stakeholder Alignment**

### **Donors**
- **Want**: Transparent impact, perpetual giving, social recognition
- **Get**: Real-time yield tracking, student impact stories, shareable milestones

### **Students**
- **Want**: Reliable funding, autonomy, low bureaucracy
- **Get**: Direct yield distributions, flexible use cases, impact reporting platform

### **Universities**
- **Want**: Stable funding, reduced admin, brand building
- **Get**: Complementary endowment model, student success stories, crypto adoption

### **Octant Community**
- **Want**: Innovative use cases for V2 contracts, ecosystem growth
- **Get**: Educational impact vertical, LATAM expansion, hackathon showcase

---

## 📚 **References & Inspiration**

### **Technical**
- [Octant V2 Docs](https://docs.v2.octant.build/)
- [Octant V2 Core Contracts](https://github.com/golemfoundation/octant-v2-core)
- [Base Miniapp Docs](https://docs.base.org/mini-apps/)
- [OnchainKit Docs](https://docs.base.org/onchainkit/)
- [Aave V3 Vault](https://github.com/aave/Aave-Vault)
- [Morpho Vault V2](https://github.com/morpho-org/vault-v2)

### **Product**
- [Octant App](https://octant.app/) - Allocation mechanism inspiration
- [Giveth](https://giveth.io/) - Donor UX inspiration
- [Endaoment.org](https://endaoment.org/) - Crypto-native DAF model

### **Research**
- University endowment challenges (docs/endowments-context/)
- LATAM education funding crisis (docs/Hackathon.docx)
- Scaffold-ETH 2 patterns (docs/scaffold-eth/)

---

## 🎓 **Next Steps**

1. **Install MiniKit**: Run `yarn workspace @se-2/nextjs add @coinbase/minikit @coinbase/onchainkit`
2. **Test Homepage**: Run `yarn start` and verify student cards render
3. **Build Student Detail Page**: Create `/student/[id]` with full profile
4. **Implement Donation Flow**: UI for amount selection + MiniKit wallet connect
5. **Create Allocation Page**: Sliders for yield distribution
6. **Build Dashboard**: Donor stats and history
7. **Deploy Contracts**: Adapt Octant V2 to Base Sepolia
8. **Integrate Contracts**: Connect frontend to deployed contracts
9. **Add Farcaster Frames**: Social sharing for donations/allocations
10. **Record Demo**: 2-3 min video showing full flow

---

**Questions? Contact the team or refer to `/docs` folder for additional context.**
