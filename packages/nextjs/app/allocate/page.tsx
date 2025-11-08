"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CURRENT_EPOCH } from "~~/data/constants";
import { STUDENTS } from "~~/data/students";

export default function AllocatePage() {
  const router = useRouter();
  // Initialize all students with 0% allocation
  const [allocations, setAllocations] = useState<Record<string, number>>(
    Object.fromEntries(STUDENTS.map(s => [s.id, 0])),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalYield = CURRENT_EPOCH.totalYield;
  const totalAllocated = Object.values(allocations).reduce((sum, pct) => sum + pct, 0);
  const remaining = 100 - totalAllocated;

  const handleSliderChange = (studentId: string, value: number) => {
    setAllocations(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Mock 2-second transaction delay
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="card-title text-2xl mb-2">Allocation Submitted!</h2>
            <p className="mb-4">Your yield allocation has been recorded for Epoch {CURRENT_EPOCH.id}</p>
            <p className="text-sm text-base-content/60 mb-6">
              Funds will be distributed on {CURRENT_EPOCH.endDate.toLocaleDateString()}
            </p>
            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={() => router.push("/dashboard")}>
                View Dashboard
              </button>
              <button className="btn btn-outline" onClick={() => router.push("/")}>
                Back to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!CURRENT_EPOCH.isVotingOpen) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="alert alert-warning">
          <span>Voting is closed for Epoch {CURRENT_EPOCH.id}. Check back next epoch!</span>
        </div>
        <button className="btn btn-ghost mt-4" onClick={() => router.push("/")}>
          ← Back to Homepage
        </button>
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
            <span className={remaining === 0 ? "text-success" : "text-warning"}>{totalAllocated}% / 100%</span>
          </div>
          <progress className="progress progress-primary" value={totalAllocated} max={100}></progress>
          <p className="text-sm text-base-content/60 mt-2">Remaining: {remaining}%</p>
        </div>
      </div>

      {/* Allocation sliders */}
      <div className="space-y-4">
        {STUDENTS.map(student => {
          const allocation = allocations[student.id] || 0;
          const yieldAmount = ((totalYield * allocation) / 100).toFixed(2);

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
                  onChange={e => handleSliderChange(student.id, Number(e.target.value))}
                  className="range range-primary"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <button
        className={`btn btn-primary btn-lg btn-block mt-8 ${isLoading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={totalAllocated !== 100 || isLoading}
      >
        {isLoading ? "Submitting..." : totalAllocated === 100 ? "Confirm Allocation" : "Allocate 100% to Continue"}
      </button>
    </div>
  );
}
