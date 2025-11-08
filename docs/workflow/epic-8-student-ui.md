# Epic 8: Student UI Flow

**Duration**: 6-10 hours
**Status**: ⏳ TODO
**Dependencies**: Epic 1 complete (basic student pages exist)
**Developer**: External developer (UI-focused, contracts integration in Epic 9)

## Overview

Build the complete student user interface, allowing students to create profiles, showcase their research, view funding received, and track their impact. This epic focuses on UI/UX implementation with mock data. Contract integration will be handled separately in Epic 9.

**User Journey**: Create profile → Verify student status → Showcase research → Receive funding → Track impact

---

## User Flow Analysis (from diagram)

Based on the "Estudiante / Votante" path in the user flow diagram:

```
Entry Point: "Student Landing"
↓
Decision: "Have profile?"
├─ No → "Create student profile" → "Submit for verification"
└─ Yes → "View profile"
↓
Action: "Update research information"
↓
Action: "View funding received"
↓
Action: "See current epoch allocations"
↓
Action: "Track voting history"
↓
Action: "View impact metrics"
```

---

## Tickets

### E8-T1: Student Profile Creation Flow
**Estimate**: 2-3 hours
**Dependencies**: Epic 1 student data structure

Create comprehensive student profile creation and editing interface.

**Page**: `/student/create` (new page)

**Tasks**:
- Build multi-step profile creation form
- Add photo/avatar upload (or placeholder)
- Create research description editor (rich text)
- Add university/institution selector
- Create research area tags/categories
- Add social links (optional: Twitter, GitHub, LinkedIn)
- Implement form validation
- Create profile preview
- Add save draft functionality
- Show submission confirmation

**Profile Form Steps**:
1. **Basic Info**: Name, email, wallet address
2. **Academic Info**: University, degree, year, research area
3. **Research Details**: Title, description, goals, impact
4. **Social Links**: Optional connections (Twitter, GitHub, etc.)
5. **Preview & Submit**: Review before submission

**UI Components**:
- `ProfileFormStep`: Reusable step container
- `ProfileProgress`: Step indicator (1/4, 2/4, etc.)
- `RichTextEditor`: Research description input
- `TagSelector`: Research area tags
- `PhotoUploader`: Avatar upload or placeholder
- `ProfilePreview`: Preview mode before submit

**Form Fields**:
```typescript
interface StudentProfile {
  // Basic Info
  name: string;
  email: string;
  walletAddress: string;
  avatar?: string;

  // Academic Info
  university: string;
  degree: string;
  graduationYear: number;
  researchArea: string[];

  // Research Details
  researchTitle: string;
  researchDescription: string; // Rich text
  researchGoals: string;
  expectedImpact: string;

  // Social (optional)
  twitter?: string;
  github?: string;
  linkedin?: string;
  website?: string;

  // Status
  verificationStatus: 'pending' | 'verified' | 'rejected';
  isActive: boolean;
  createdAt: Date;
}
```

**Validation Rules**:
- Name: Required, 2-50 characters
- Email: Valid email format
- Wallet: Valid Ethereum address
- University: Required, from preset list or custom
- Research title: Required, 10-100 characters
- Research description: Required, 100-1000 characters
- Research area: At least 1 tag, max 5 tags

**Acceptance Criteria**:
- [ ] Multi-step form progresses smoothly
- [ ] All fields validate correctly
- [ ] Avatar upload works (or shows placeholder)
- [ ] Rich text editor allows formatting
- [ ] Research area tags are selectable
- [ ] Preview shows complete profile
- [ ] Draft saves to local storage
- [ ] Submission shows confirmation
- [ ] Form is mobile-responsive
- [ ] Can edit profile after creation

**Mock Research Areas** (tags):
- Artificial Intelligence
- Climate Science
- Public Health
- Biotechnology
- Renewable Energy
- Education Technology
- Social Justice
- Neuroscience
- Quantum Computing
- Space Exploration

---

### E8-T2: Student Profile Display Page
**Estimate**: 2-3 hours
**Dependencies**: E8-T1

Public-facing student profile page optimized for donors to review.

**Page**: `/student/[address]` (enhance existing)

**Tasks**:
- Design profile hero section (photo, name, university)
- Show research overview card
- Display funding stats (total received, donors, votes)
- Add research details section (expandable)
- Show impact metrics (publications, milestones)
- Display funding history timeline
- Add "Support This Student" CTA (for donors)
- Create verification badge
- Add social links section
- Show related students (same research area)

**Profile Sections**:
1. **Hero**: Photo, name, university, verification badge
2. **Quick Stats**: Total funding, donors, current votes
3. **Research Overview**: Title and summary
4. **Detailed Research**: Full description and goals
5. **Impact Tracker**: Milestones and achievements
6. **Funding History**: Timeline of distributions
7. **Support CTA**: Button to allocate votes
8. **Related Students**: Suggestions

**Key Information Display**:
```typescript
interface StudentProfileDisplay {
  profile: StudentProfile;
  stats: {
    totalFunding: number;
    donorCount: number;
    currentVotes: number;
    currentRanking: number; // in current epoch
  };
  history: FundingEvent[];
  milestones: Milestone[];
}
```

**Funding History Event**:
```typescript
interface FundingEvent {
  date: Date;
  amount: number;
  vaultName: string;
  epoch: number;
  distributionId: string;
}
```

**Acceptance Criteria**:
- [ ] Profile displays all student information
- [ ] Verification badge shows correctly
- [ ] Funding stats are accurate
- [ ] Research details are readable and formatted
- [ ] Funding timeline shows chronologically
- [ ] CTA button links to allocation flow
- [ ] Social links open correctly
- [ ] Related students show relevant matches
- [ ] Mobile layout is optimized
- [ ] Shareable URL works

---

### E8-T3: Student Dashboard
**Estimate**: 2-3 hours
**Dependencies**: E8-T2

Private dashboard for students to track funding and engagement.

**Page**: `/student/dashboard` (new page, requires auth)

**Tasks**:
- Create overview stats section
- Show current epoch status (votes received)
- Display funding breakdown by vault
- Add upcoming distribution preview
- Show voting trend chart (over epochs)
- Create donor engagement metrics
- Add milestones/achievements tracker
- Show profile completeness score
- Add quick actions (edit profile, add milestone)
- Create notifications area

**Dashboard Sections**:
1. **Overview**: Total funding, active donors, current votes
2. **Current Epoch**: Real-time voting status
3. **Funding Sources**: Breakdown by vault
4. **Voting Trends**: Chart showing vote history
5. **Engagement**: Donor interactions and messages
6. **Milestones**: Research progress tracking
7. **Profile**: Completeness and suggestions
8. **Notifications**: Important updates

**Key Metrics**:
- Total funding received (all-time)
- Active donors this epoch
- Current vote allocation (%)
- Projected distribution (based on current votes)
- Profile views (if tracking)
- Ranking in current epoch

**Voting Trend Visualization**:
```typescript
interface EpochVote {
  epochNumber: number;
  startDate: Date;
  endDate: Date;
  votesReceived: number;
  fundingReceived: number;
  donorCount: number;
  ranking: number;
}
```

**Acceptance Criteria**:
- [ ] Dashboard shows comprehensive overview
- [ ] Current epoch data updates in real-time (mock)
- [ ] Funding breakdown is clear and visual
- [ ] Voting trend chart displays correctly
- [ ] Milestones can be added/edited
- [ ] Profile completeness suggests improvements
- [ ] Notifications show relevant updates
- [ ] Quick actions navigate correctly
- [ ] Mobile-responsive layout
- [ ] Data refreshes appropriately

---

### E8-T4: Funding History & Analytics
**Estimate**: 1-2 hours
**Dependencies**: E8-T3

Detailed funding history and analytics for students.

**Page**: `/student/dashboard/funding` (sub-page)

**Tasks**:
- Create funding timeline visualization
- Build distribution table (sortable, filterable)
- Add vault breakdown chart
- Show donor leaderboard (top supporters)
- Create export functionality (CSV/PDF)
- Add date range filtering
- Show cumulative funding chart
- Calculate funding velocity (trend)

**Funding Table Columns**:
- Date
- Epoch number
- Vault name
- Amount (USDC)
- Donor count
- Vote percentage
- Transaction hash (mock)

**Analytics Visualizations**:
1. **Timeline**: Line chart of funding over time
2. **Vault Breakdown**: Pie chart by funding source
3. **Donor Leaderboard**: Top 10 donors by total contribution
4. **Voting Trend**: Bar chart by epoch

**Acceptance Criteria**:
- [ ] Timeline shows complete funding history
- [ ] Table is sortable and filterable
- [ ] Charts visualize data clearly
- [ ] Export generates downloadable report
- [ ] Date filtering updates all views
- [ ] Cumulative chart shows growth
- [ ] Mobile charts are readable
- [ ] Data is accurate and consistent

---

### E8-T5: Milestone & Impact Tracking
**Estimate**: 1-2 hours
**Dependencies**: E8-T3

Allow students to document research progress and impact.

**Page**: `/student/dashboard/milestones` (sub-page)

**Tasks**:
- Create milestone creation form
- Build milestone timeline display
- Add progress indicators
- Create milestone categories (proposal, research, publication, etc.)
- Add photo/file attachment (mock upload)
- Show milestone to funding correlation
- Create impact metrics dashboard
- Add share milestone functionality

**Milestone Types**:
- Research Proposal Submitted
- Grant/Funding Secured (external)
- Experiment/Study Completed
- Paper/Publication Accepted
- Conference Presentation
- Award/Recognition Received
- Collaboration Established
- Patent/IP Filed
- Community Impact Achieved

**Milestone Form**:
```typescript
interface Milestone {
  id: string;
  studentAddress: string;
  type: MilestoneType;
  title: string;
  description: string;
  date: Date;
  attachments?: string[]; // URLs or mock IDs
  visibility: 'public' | 'donors_only' | 'private';
  impact?: string; // How funding helped achieve this
}
```

**Impact Metrics**:
- Milestones achieved: Total count
- Average time between milestones
- Funding efficiency: Milestones per $1000 received
- Progress rate: Milestones per month
- Public vs private milestones

**Acceptance Criteria**:
- [ ] Students can create new milestones
- [ ] Milestones display on timeline
- [ ] Categories organize milestones
- [ ] Attachments can be uploaded (mock)
- [ ] Visibility controls work
- [ ] Funding correlation shows impact
- [ ] Milestones appear on public profile
- [ ] Share functionality works
- [ ] Mobile interface is functional

---

### E8-T6: Student Discovery & Browse
**Estimate**: 1-2 hours
**Dependencies**: E8-T2

Public page for donors to discover and browse student profiles.

**Page**: `/students` (enhance existing browse page)

**Tasks**:
- Create student card grid layout
- Add filtering by research area
- Add sorting (most funded, newest, trending)
- Show quick stats on cards
- Add search functionality (name, university, keywords)
- Create featured students section
- Add empty state for no results
- Implement pagination or infinite scroll

**Student Card Display**:
```typescript
interface StudentCardData {
  address: string;
  name: string;
  avatar: string;
  university: string;
  researchArea: string[];
  researchTitle: string;
  totalFunding: number;
  donorCount: number;
  currentVotes: number;
  isVerified: boolean;
  isFeatured: boolean;
}
```

**Filtering Options**:
- Research area (multi-select)
- University
- Funding range
- Verification status
- Has received funding vs new

**Sorting Options**:
- Most funded (all-time)
- Most votes (current epoch)
- Newest profiles
- Trending (vote velocity)
- Alphabetical

**Acceptance Criteria**:
- [ ] Student grid displays all profiles
- [ ] Filtering narrows results correctly
- [ ] Sorting changes order
- [ ] Search finds relevant students
- [ ] Featured section highlights select students
- [ ] Cards show key information
- [ ] Clicking card navigates to profile
- [ ] Empty state handles no results
- [ ] Responsive grid layout
- [ ] Loading states for async data

---

### E8-T7: Student Verification Flow (Admin)
**Estimate**: 1 hour
**Dependencies**: E8-T1

Simple admin interface for verifying student applications.

**Page**: `/admin/verify-students` (new admin-only page)

**Tasks**:
- Create pending applications list
- Show student application details
- Add approve/reject actions
- Create rejection reason form
- Add verification badge assignment
- Show verification history log
- Create bulk actions (if needed)

**Verification States**:
- Pending: Awaiting review
- Verified: Approved and active
- Rejected: Not approved (with reason)

**Admin Actions**:
- View application details
- Approve application
- Reject with reason
- Request more information
- Deactivate student (if needed)

**Acceptance Criteria**:
- [ ] Pending applications display
- [ ] Admin can review details
- [ ] Approve action activates student
- [ ] Reject action deactivates with reason
- [ ] Verification badge appears on profile
- [ ] History log tracks all actions
- [ ] Admin access is restricted
- [ ] Notifications sent to students (mock)

**Note**: For MVP, this can be simplified or admin can directly edit student mock data.

---

## Design System & Components

### Reusable Components to Build
```
components/student/
├── StudentCard.tsx              # Compact student card
├── ProfileForm.tsx              # Multi-step profile creation
├── ProfileHero.tsx              # Profile header section
├── FundingTimeline.tsx          # Funding history visualization
├── MilestoneCard.tsx            # Milestone display
├── VotingTrendChart.tsx         # Vote history chart
├── ImpactMetrics.tsx            # Impact stats display
├── ResearchDetails.tsx          # Research info section
└── VerificationBadge.tsx        # Verified student indicator
```

### Design Patterns
- **Card layouts**: Easy scanning of student profiles
- **Timeline views**: Chronological funding and milestones
- **Chart visualizations**: Voting trends and funding breakdown
- **Progress indicators**: Profile completeness, milestone progress
- **Clear verification**: Trust signals (verified badge)
- **Mobile-first**: Responsive design for all views

---

## Mock Data Requirements

### Mock Students (expand from Epic 1)
```typescript
const mockStudents: StudentProfile[] = [
  {
    name: 'Alice Chen',
    walletAddress: '0xstudent1...',
    email: 'alice.chen@university.edu',
    avatar: '/avatars/alice.jpg',
    university: 'MIT',
    degree: 'PhD',
    graduationYear: 2026,
    researchArea: ['Artificial Intelligence', 'Robotics'],
    researchTitle: 'Adaptive AI for Assistive Robotics',
    researchDescription: 'Developing intelligent algorithms...',
    researchGoals: 'Create accessible assistive technology...',
    expectedImpact: 'Help 10,000+ people with mobility challenges',
    twitter: '@alice_ai',
    github: 'alice-chen',
    verificationStatus: 'verified',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  // ... 7 more students
];
```

### Mock Funding Events
```typescript
const mockFundingHistory: FundingEvent[] = [
  {
    date: new Date('2024-02-15'),
    amount: 1250,
    vaultName: 'Aave Stable Strategy',
    epoch: 1,
    distributionId: 'dist-001',
  },
  // ... more events
];
```

### Mock Milestones
```typescript
const mockMilestones: Milestone[] = [
  {
    id: 'ms-001',
    studentAddress: '0xstudent1...',
    type: 'Research Proposal Submitted',
    title: 'NIH Grant Application Filed',
    description: 'Submitted comprehensive research proposal...',
    date: new Date('2024-03-01'),
    visibility: 'public',
    impact: 'Made possible by initial funding from Endaoment donors',
  },
  // ... more milestones
];
```

---

## User Flow Testing Checklist

### New Student Flow
- [ ] Student navigates to create profile
- [ ] Student completes multi-step form
- [ ] Profile submitted for verification
- [ ] Verification approved (admin action)
- [ ] Student profile goes live
- [ ] Student appears in discovery browse

### Existing Student Flow
- [ ] Student logs into dashboard
- [ ] Views current epoch voting status
- [ ] Sees funding breakdown
- [ ] Adds new research milestone
- [ ] Views funding history and trends
- [ ] Edits profile information

### Donor Perspective (viewing students)
- [ ] Browse student discovery page
- [ ] Filter by research area
- [ ] View student profile
- [ ] See funding stats and history
- [ ] Navigate to allocate votes (links to Epic 7)

### Edge Cases
- [ ] Incomplete profile (show completeness score)
- [ ] No funding received yet (empty state)
- [ ] Rejected verification (show reason)
- [ ] No milestones (encourage adding)
- [ ] No donors in current epoch (messaging)

---

## Not Included (Deferred to Epic 9)

These features require smart contract integration:
- ❌ Real on-chain student registry
- ❌ Actual funding distribution transactions
- ❌ Real-time vote tracking from blockchain
- ❌ On-chain verification (uses mock admin approval)
- ❌ Smart contract events for funding
- ❌ Blockchain-based identity verification

**Epic 9 will handle**: Reading student data from StudentRegistry contract, real funding events, on-chain verification

---

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- DaisyUI + Tailwind CSS
- React hooks for state management
- Chart.js or Recharts for visualizations
- React Hook Form for forms
- Mock data services (replace in Epic 9)

### State Management
```typescript
// Mock student data context
const StudentContext = createContext({
  students: mockStudents,
  currentStudent: mockCurrentStudent,
  fundingHistory: mockFundingHistory,
  milestones: mockMilestones,
  createProfile: mockCreateFunction,
  updateProfile: mockUpdateFunction,
  addMilestone: mockMilestoneFunction,
});
```

---

## Deliverables

After Epic 8 completion:
- ✅ Complete student profile creation flow
- ✅ Public student profile pages
- ✅ Private student dashboard with analytics
- ✅ Funding history and visualization
- ✅ Milestone tracking and impact metrics
- ✅ Student discovery and browse page
- ✅ Admin verification interface (basic)
- ✅ All flows work with mock data
- ✅ Responsive design for mobile/desktop
- ✅ Ready for contract integration (Epic 9)

**Timeline**: 6-10 hours for external developer (UI-focused)

**Next**: [Epic 9 - Retail & Student Contract Integration](epic-9-retail-student-integration.md)
