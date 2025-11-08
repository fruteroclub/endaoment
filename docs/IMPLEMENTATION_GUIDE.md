# Endaoment Implementation Guide

Quick reference for continuing development.

---

## 🚀 **Quick Start**

### **Run the Frontend**
```bash
# From project root
yarn install
yarn start
```

Visit: `http://localhost:3000`

---

## 📁 **File Structure Overview**

```
packages/nextjs/
├── app/
│   ├── page.tsx                      # ✅ Homepage (DONE)
│   ├── student/[id]/page.tsx         # 🔲 Student detail (TODO)
│   ├── donate/[id]/page.tsx          # 🔲 Donation flow (TODO)
│   ├── allocate/page.tsx             # 🔲 Allocation UI (TODO)
│   └── dashboard/page.tsx            # 🔲 Donor dashboard (TODO)
│
├── components/
│   ├── miniapp/
│   │   ├── StudentCard.tsx           # ✅ Student card (DONE)
│   │   ├── DonateButton.tsx          # 🔲 Donate button (TODO)
│   │   ├── AllocationSlider.tsx      # 🔲 Allocation slider (TODO)
│   │   └── ShareFrame.tsx            # 🔲 Farcaster Frame (TODO)
│   └── providers/
│       └── MinikitProvider.tsx       # ✅ MiniKit setup (DONE)
│
├── data/
│   ├── students.ts                   # ✅ Seed data (DONE)
│   └── constants.ts                  # ✅ Config (DONE)
│
└── types/
    └── student.ts                    # ✅ TypeScript types (DONE)
```

---

## 🛠️ **Next Implementation Steps**

### **Step 1: Install MiniKit Dependencies**
```bash
# From project root
yarn workspace @se-2/nextjs add @coinbase/minikit @coinbase/onchainkit
```

### **Step 2: Create Student Detail Page**

Create `packages/nextjs/app/student/[id]/page.tsx`:

```typescript
"use client";

import { useParams } from "next/navigation";
import { getStudentById } from "~~/data/students";
import { StudentCard } from "~~/components/miniapp/StudentCard";
import Link from "next/link";

export default function StudentDetailPage() {
  const params = useParams();
  const student = getStudentById(params.id as string);

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="btn btn-ghost mb-4">
        ← Back to Students
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column: Student card */}
        <div className="md:col-span-1">
          <StudentCard student={student} showDonateButton={false} />
        </div>

        {/* Right column: Extended details */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{student.name}</h1>
          <p className="text-xl text-primary mb-2">{student.field}</p>
          <p className="text-base-content/70 mb-6">{student.university}</p>

          {/* Full bio */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title">About</h2>
              <p>{student.bio}</p>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="card bg-base-100 shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title">Impact Metrics</h2>
              <div className="space-y-4">
                {student.impactMetrics.map((metric, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold">{metric.title}</h3>
                    {metric.description && <p className="text-sm">{metric.description}</p>}
                    {metric.date && <p className="text-xs text-base-content/60">{metric.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link href={`/donate/${student.id}`}>
            <button className="btn btn-primary btn-lg btn-block">
              Fund {student.name}'s Education
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### **Step 3: Create Donation Flow Page**

Create `packages/nextjs/app/donate/[id]/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getStudentById } from "~~/data/students";
import { UI_CONFIG, TOKENS } from "~~/data/constants";

export default function DonatePage() {
  const params = useParams();
  const student = getStudentById(params.id as string);
  const [amount, setAmount] = useState(50);
  const [token, setToken] = useState(TOKENS.USDC.symbol);

  if (!student) return <div>Student not found</div>;

  const handleDonate = () => {
    // TODO: Connect to smart contract
    alert(`Donating ${amount} ${token} to ${student.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">Fund {student.name}</h1>

      {/* Student summary */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">{student.field}</h2>
          <p>{student.university}</p>
          <p className="text-sm mt-2">{student.bio}</p>
        </div>
      </div>

      {/* Donation form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Donation Amount</h2>

          {/* Preset amounts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {UI_CONFIG.DEFAULT_DONATION_AMOUNTS.map((preset) => (
              <button
                key={preset}
                className={`btn ${amount === preset ? "btn-primary" : "btn-outline"}`}
                onClick={() => setAmount(preset)}
              >
                ${preset}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <input
            type="number"
            placeholder="Custom amount"
            className="input input-bordered w-full mb-4"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={UI_CONFIG.MIN_DONATION_USD}
          />

          {/* Token selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Token</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            >
              <option value={TOKENS.USDC.symbol}>USDC</option>
              <option value={TOKENS.ETH.symbol}>ETH</option>
            </select>
          </div>

          {/* Info */}
          <div className="alert alert-info mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Your principal is safe. Only yield is distributed to students.</span>
          </div>

          {/* Submit */}
          <button className="btn btn-primary btn-lg btn-block mt-4" onClick={handleDonate}>
            Donate ${amount} {token}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### **Step 4: Create Allocation Page**

Create `packages/nextjs/app/allocate/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { STUDENTS } from "~~/data/students";
import { CURRENT_EPOCH } from "~~/data/constants";

export default function AllocatePage() {
  // Initialize all students with 0% allocation
  const [allocations, setAllocations] = useState<Record<string, number>>(
    Object.fromEntries(STUDENTS.map(s => [s.id, 0]))
  );

  const totalYield = CURRENT_EPOCH.totalYield;
  const totalAllocated = Object.values(allocations).reduce((sum, pct) => sum + pct, 0);
  const remaining = 100 - totalAllocated;

  const handleSliderChange = (studentId: string, value: number) => {
    setAllocations(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = () => {
    // TODO: Submit to smart contract
    alert(`Allocation submitted! Total: ${totalAllocated}%`);
  };

  if (!CURRENT_EPOCH.isVotingOpen) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning">
          <span>Voting is closed for Epoch {CURRENT_EPOCH.id}. Check back next epoch!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Allocate Yield - Epoch {CURRENT_EPOCH.id}</h1>
      <p className="text-base-content/70 mb-6">
        You have ${totalYield.toLocaleString()} in yield to allocate to students.
      </p>

      {/* Progress */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total Allocated</span>
            <span className={remaining === 0 ? "text-success" : "text-warning"}>
              {totalAllocated}% / 100%
            </span>
          </div>
          <progress className="progress progress-primary" value={totalAllocated} max={100}></progress>
          <p className="text-sm text-base-content/60 mt-2">
            Remaining: {remaining}%
          </p>
        </div>
      </div>

      {/* Allocation sliders */}
      <div className="space-y-4">
        {STUDENTS.map((student) => {
          const allocation = allocations[student.id] || 0;
          const yieldAmount = (totalYield * allocation / 100).toFixed(2);

          return (
            <div key={student.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-bold">{student.name}</h3>
                    <p className="text-sm text-base-content/70">{student.field}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{allocation}%</p>
                    <p className="text-sm text-base-content/70">${yieldAmount}</p>
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={allocation}
                  onChange={(e) => handleSliderChange(student.id, Number(e.target.value))}
                  className="range range-primary"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <button
        className="btn btn-primary btn-lg btn-block mt-8"
        onClick={handleSubmit}
        disabled={totalAllocated !== 100}
      >
        {totalAllocated === 100 ? "Confirm Allocation" : "Allocate 100% to Continue"}
      </button>
    </div>
  );
}
```

### **Step 5: Create Dashboard Page**

Create `packages/nextjs/app/dashboard/page.tsx`:

```typescript
"use client";

import { PLATFORM_STATS, MOCK_DONATION_HISTORY } from "~~/data/constants";
import { getStudentById } from "~~/data/students";
import Link from "next/link";

export default function DashboardPage() {
  // TODO: Fetch user-specific data from contracts
  const userStats = {
    totalDonated: 225,
    yieldGenerated: 18,
    studentsSupported: 3,
    lastEpochYield: 9,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">My Dashboard</h1>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-title">Total Donated</div>
          <div className="stat-value text-primary">${userStats.totalDonated}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Yield Generated</div>
          <div className="stat-value text-secondary">${userStats.yieldGenerated}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Students Supported</div>
          <div className="stat-value">{userStats.studentsSupported}</div>
        </div>
      </div>

      {/* Donation History */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Donation History</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Tx</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DONATION_HISTORY.map((donation) => {
                  const student = getStudentById(donation.studentId);
                  return (
                    <tr key={donation.id}>
                      <td>{donation.timestamp.toLocaleDateString()}</td>
                      <td>
                        <Link href={`/student/${student?.id}`} className="link">
                          {student?.name}
                        </Link>
                      </td>
                      <td>${donation.amount}</td>
                      <td>
                        <a
                          href={`https://basescan.org/tx/${donation.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary"
                        >
                          {donation.txHash.slice(0, 10)}...
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/">
          <button className="btn btn-primary btn-block">Fund More Students</button>
        </Link>
        <Link href="/allocate">
          <button className="btn btn-secondary btn-block">Allocate Yield</button>
        </Link>
      </div>
    </div>
  );
}
```

---

## 📦 **Key Dependencies**

### **Already Installed** (via Scaffold-ETH 2)
- Next.js 15
- Wagmi
- Viem
- RainbowKit
- TailwindCSS
- DaisyUI
- TypeScript

### **To Install**
```bash
yarn workspace @se-2/nextjs add @coinbase/minikit @coinbase/onchainkit
```

---

## 🎨 **Design Tokens**

### **Colors** (from DaisyUI)
- `primary`: Blue - Donations, main CTAs
- `secondary`: Purple - Allocations, yield
- `accent`: - (unused for now)
- `neutral`: Gray - Backgrounds, cards
- `success`: Green - High funding progress
- `warning`: Amber - Medium funding progress
- `error`: Red - Low funding progress

### **Component Classes** (DaisyUI)
- `btn btn-primary btn-lg`: Large primary button
- `card bg-base-100 shadow-xl`: Card with shadow
- `stats stats-vertical lg:stats-horizontal`: Stats grid
- `alert alert-info`: Info alert banner
- `badge badge-success`: Success badge
- `progress progress-primary`: Progress bar
- `input input-bordered`: Input field
- `select select-bordered`: Dropdown select

---

## 🐛 **Common Issues & Fixes**

### **Issue: Module not found errors**
```bash
# Fix: Install missing dependencies
yarn install
```

### **Issue: TypeScript errors in imports**
```bash
# Fix: Check tsconfig paths are correct
# Scaffold-ETH 2 uses ~~ alias for packages/nextjs
```

### **Issue: DaisyUI components not styling**
```bash
# Fix: Ensure TailwindCSS config includes DaisyUI plugin
# Already configured in Scaffold-ETH 2
```

### **Issue: Student cards not rendering**
```bash
# Fix: Check data imports
# Make sure STUDENTS array is exported from data/students.ts
```

---

## 🚀 **Testing Checklist**

### **Frontend Only** (No Contracts Yet)
- [ ] Homepage loads with 8 student cards
- [ ] Student cards show correct data (name, field, university, progress)
- [ ] Clicking "Fund Student" goes to donation page
- [ ] Clicking "Learn More" goes to student detail page
- [ ] Platform stats display correctly
- [ ] Epoch banner shows when voting is open
- [ ] Responsive design works on mobile

### **With Contracts** (Future)
- [ ] Connect wallet via MiniKit
- [ ] Deposit USDC/ETH to EndaomentVault
- [ ] Read user balance from contract
- [ ] Allocate yield via AllocationMechanism
- [ ] View donation history from events
- [ ] Claim yield (student view)

---

## 📚 **Helpful Commands**

```bash
# Frontend development (from project root)
yarn start               # Start dev server
yarn next:build          # Build for production
yarn next:lint           # Lint code

# Smart contracts (from project root)
yarn compile             # Compile Solidity
yarn deploy              # Deploy to local network
yarn test                # Run tests
```

---

## 🤝 **Next Steps**

1. Install MiniKit dependencies
2. Test current homepage
3. Implement student detail page
4. Build donation flow UI
5. Create allocation page
6. Build dashboard
7. Add Farcaster Frames
8. Deploy smart contracts
9. Integrate contracts with frontend
10. Record demo video

---

**Questions?** Check `/docs/REQUIREMENTS.md` for full specification.
