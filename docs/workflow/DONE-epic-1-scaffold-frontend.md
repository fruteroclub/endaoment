# Epic 1: Scaffold-ETH 2 Frontend Prototype

**Duration**: 4 days (Days 1-4)
**Status**: 🔄 IN PROGRESS (40%)
**Goal**: Complete donor journey with hardcoded data, standard web interface

---

## Epic Overview

Create a fully functional frontend prototype using Scaffold-ETH 2 with:
- Hardcoded student data (no blockchain)
- Complete user flows (browse, donate, allocate, dashboard)
- Mobile responsive design
- Demo-ready for presentations

**No Farcaster Miniapp features in this epic** - that's Epic 2.

---

## Tickets

### ✅ E1-T1: Setup Project Structure and Seed Data
**Status**: ✅ DONE
**Assignee**: Claude
**Estimated Hours**: 3h
**Actual Hours**: 3h
**Completed**: 2025-11-07

#### Description
Set up TypeScript types, seed data for 8 LATAM students, and configuration constants.

#### Files Created
- ✅ `packages/nextjs/types/student.ts`
- ✅ `packages/nextjs/data/students.ts`
- ✅ `packages/nextjs/data/constants.ts`

#### Acceptance Criteria
- ✅ TypeScript interfaces for Student, Epoch, Allocation
- ✅ 8 hardcoded students from LATAM (Brazil, Mexico, Argentina, Colombia)
- ✅ Mock platform stats and epoch configuration
- ✅ Helper functions for data access

#### Git Commit
- Commit: `b66ff70` - "add frontend MVP with student data and docs"

---

### ✅ E1-T2: Homepage with Student Grid
**Status**: ✅ DONE
**Assignee**: Claude
**Estimated Hours**: 3h
**Actual Hours**: 3h
**Completed**: 2025-11-07

#### Description
Replace Scaffold-ETH 2 default homepage with Endaoment homepage featuring hero section, student cards grid, and "How It Works" section.

#### Files Modified/Created
- ✅ `packages/nextjs/app/page.tsx`
- ✅ `packages/nextjs/app/layout.tsx`
- ✅ `packages/nextjs/components/miniapp/StudentCard.tsx`

#### Acceptance Criteria
- ✅ Hero section with platform stats
- ✅ Student cards grid (responsive: 1/2/3/4 columns)
- ✅ "How It Works" section (3 steps)
- ✅ Epoch voting banner (conditional)
- ✅ Mobile responsive

#### Git Commit
- Commit: `b66ff70` - "add frontend MVP with student data and docs"

---

### 🔲 E1-T3: Student Detail Page
**Status**: 🔲 TODO
**Assignee**: Unassigned
**Estimated Hours**: 2-3h
**Actual Hours**: -

#### Description
Create dedicated student detail page showing full profile, extended bio, complete impact metrics, and prominent donation CTA.

#### Files to Create
- `packages/nextjs/app/student/[id]/page.tsx`

#### Dependencies
- ✅ E1-T1 (Setup complete)
- ✅ E1-T2 (Homepage complete)

#### Implementation Reference
See [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) lines 60-131 for complete code.

#### Acceptance Criteria
- [ ] Full student bio displayed in card
- [ ] Complete impact metrics list with icons
- [ ] Funding progress visualization
- [ ] "Fund This Student" CTA button prominent
- [ ] "Back to Students" navigation link
- [ ] Mobile responsive (375px, 768px, 1440px)
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Page loads in <2s

#### Testing Checklist
- [ ] Navigate from homepage student card
- [ ] All student data displays correctly
- [ ] Impact metrics render properly
- [ ] CTA button links to `/donate/[id]`
- [ ] Back button returns to homepage
- [ ] Test on mobile device (or Chrome DevTools)

#### Git Commit Message
```
add student detail page with full profile
```

---

### 🔲 E1-T4: Mock Donation Flow
**Status**: 🔲 TODO
**Assignee**: Unassigned
**Estimated Hours**: 3-4h
**Actual Hours**: -

#### Description
Create donation flow page with amount selection, token picker, and mock transaction success screen.

#### Files to Create
- `packages/nextjs/app/donate/[id]/page.tsx`

#### Dependencies
- ✅ E1-T1 (Setup complete)
- 🔲 E1-T3 (Student detail page) - soft dependency

#### Implementation Reference
See [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) lines 133-231 for complete code.

#### Acceptance Criteria
- [ ] Student summary card at top
- [ ] Preset donation amounts (4 buttons: $25, $50, $100, $250)
- [ ] Custom amount input field
- [ ] Token selection dropdown (USDC, ETH)
- [ ] Info alert: "Your principal is safe. Only yield is distributed."
- [ ] "Donate" button triggers mock success
- [ ] Mock success screen with:
  - [ ] Success message
  - [ ] Mock transaction hash
  - [ ] "View Dashboard" CTA
  - [ ] "Share on Farcaster" placeholder button
- [ ] Mobile responsive
- [ ] No errors

#### Testing Checklist
- [ ] All preset amounts work
- [ ] Custom amount accepts numbers only
- [ ] Token dropdown switches correctly
- [ ] Donate button shows loading state (mock)
- [ ] Success screen displays after 2s delay
- [ ] All navigation links work
- [ ] Test with student ID that doesn't exist (error handling)

#### Git Commit Message
```
add mock donation flow with amount selection
```

---

### 🔲 E1-T5: Mock Allocation Interface
**Status**: 🔲 TODO
**Assignee**: Unassigned
**Estimated Hours**: 3-4h
**Actual Hours**: -

#### Description
Create allocation page where users distribute hardcoded yield ($500) to students using sliders with real-time calculation.

#### Files to Create
- `packages/nextjs/app/allocate/page.tsx`

#### Dependencies
- ✅ E1-T1 (Setup complete)
- ✅ E1-T2 (Homepage for student data)

#### Implementation Reference
See [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) lines 236-340 for complete code.

#### Acceptance Criteria
- [ ] Current epoch info displayed (Epoch 5, dates)
- [ ] Hardcoded yield amount shown ($500)
- [ ] Progress card showing total allocated / 100%
- [ ] Slider for each student (0-100%)
- [ ] Real-time calculation of $ amount per student
- [ ] Total allocation progress bar
- [ ] "Confirm Allocation" button disabled until 100% allocated
- [ ] Mock success after clicking confirm
- [ ] Voting closed state if `isVotingOpen = false`
- [ ] Mobile responsive

#### Testing Checklist
- [ ] All 8 student sliders work
- [ ] Dragging slider updates percentage and $ amount
- [ ] Total allocation updates in real-time
- [ ] Can't submit unless exactly 100%
- [ ] Success state triggers after submit
- [ ] Test with voting closed (change constant temporarily)
- [ ] Mobile: sliders are touch-friendly

#### Git Commit Message
```
add allocation interface with yield sliders
```

---

### 🔲 E1-T6: Donor Dashboard
**Status**: 🔲 TODO
**Assignee**: Unassigned
**Estimated Hours**: 2-3h
**Actual Hours**: -

#### Description
Create donor dashboard showing mock donation stats, donation history table, and CTAs for more actions.

#### Files to Create
- `packages/nextjs/app/dashboard/page.tsx`

#### Dependencies
- ✅ E1-T1 (Setup complete with mock data)
- 🔲 E1-T4 (Donation flow) - soft dependency
- 🔲 E1-T5 (Allocation) - soft dependency

#### Implementation Reference
See [IMPLEMENTATION_GUIDE.md](../IMPLEMENTATION_GUIDE.md) lines 345-438 for complete code.

#### Acceptance Criteria
- [ ] Stats cards showing:
  - [ ] Total donated ($225 mock)
  - [ ] Yield generated ($18 mock)
  - [ ] Students supported (3 mock)
- [ ] Donation history table with:
  - [ ] Date column
  - [ ] Student name (clickable link)
  - [ ] Amount
  - [ ] Transaction hash (Basescan link)
- [ ] CTA buttons:
  - [ ] "Fund More Students" → homepage
  - [ ] "Allocate Yield" → /allocate
- [ ] Mobile responsive (stats stack vertically)
- [ ] No errors

#### Testing Checklist
- [ ] All stats display correctly
- [ ] Table shows 3-5 mock donations
- [ ] Student name links to detail page
- [ ] TX hash links to Basescan (even if mock hash)
- [ ] CTA buttons navigate correctly
- [ ] Mobile: table scrolls horizontally if needed

#### Git Commit Message
```
add donor dashboard with stats and history
```

---

### 🔲 E1-T7: Responsive Design Polish
**Status**: 🔲 TODO
**Assignee**: Unassigned (Designer/Frontend Dev)
**Estimated Hours**: 2-3h
**Actual Hours**: -

#### Description
Test all pages on mobile devices and fix any responsive design issues. Ensure consistent spacing, touch targets, and navigation.

#### Files to Review/Modify
- All pages in `packages/nextjs/app/`
- `packages/nextjs/components/miniapp/StudentCard.tsx`
- Potentially: global styles

#### Dependencies
- 🔲 E1-T3 (Student detail page)
- 🔲 E1-T4 (Donation flow)
- 🔲 E1-T5 (Allocation)
- 🔲 E1-T6 (Dashboard)

#### Acceptance Criteria
- [ ] Test all pages on 375px (iPhone SE)
- [ ] Test all pages on 768px (iPad)
- [ ] Test all pages on 1440px (Desktop)
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll on mobile
- [ ] Text readable without zoom
- [ ] Buttons/links easy to tap
- [ ] Navigation works on all breakpoints
- [ ] Images/avatars responsive
- [ ] Tables scroll horizontally on mobile
- [ ] Forms usable on mobile

#### Testing Checklist
- [ ] Chrome DevTools device emulation
- [ ] Real iOS device testing (if available)
- [ ] Real Android device testing (if available)
- [ ] Landscape and portrait orientations
- [ ] Test in Scaffold-ETH 2's header/footer
- [ ] Dark mode support (if applicable)

#### Git Commit Message
```
fix responsive design across all pages
```

---

## Epic 1 Completion Checklist

### Functional Requirements
- [ ] All 6 tickets complete (E1-T1 through E1-T7)
- [ ] Complete user flow works: Homepage → Detail → Donate → Allocate → Dashboard
- [ ] All navigation links functional
- [ ] No console errors in any page
- [ ] No TypeScript errors

### Quality Requirements
- [ ] Mobile responsive (375px minimum)
- [ ] Fast page loads (<2s per page)
- [ ] Accessible (basic keyboard navigation)
- [ ] Clean code (passes lint)

### Demo Requirements
- [ ] Can demo full donor journey in 3 minutes
- [ ] Realistic student data displayed
- [ ] Mock transactions look believable
- [ ] Professional UI polish

### Documentation
- [ ] All tickets marked as DONE
- [ ] Actual hours logged
- [ ] Git commits reference ticket IDs
- [ ] README updated with Epic 1 status

---

## Epic 1 Retrospective (After Completion)

### What Went Well
- (Fill in after Epic 1 complete)

### What Could Be Improved
- (Fill in after Epic 1 complete)

### Blockers Encountered
- (Fill in after Epic 1 complete)

### Lessons Learned
- (Fill in after Epic 1 complete)

---

## Handoff to Epic 2

**Prerequisites for Epic 2**:
- ✅ All Epic 1 tickets complete
- ✅ Prototype demo-ready
- ✅ No blocking bugs
- ✅ Team trained on Scaffold-ETH 2 patterns

**Epic 2 will add**:
- Farcaster Miniapp features (MiniKit)
- Social sharing (Frames)
- Miniapp manifest
- Base App integration

**Epic 2 will NOT change**:
- Existing page layouts
- Student data structure
- Core user flows

See [epic-2-miniapp-migration.md](epic-2-miniapp-migration.md) for next phase.

---

**Last Updated**: 2025-11-07
**Epic Owner**: TBD
**Target Completion**: End of Day 4
