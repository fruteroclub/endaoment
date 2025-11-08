"use client";

import Link from "next/link";
import { MOCK_DONATION_HISTORY } from "~~/data/constants";
import { MOCK_MEMBERSHIP, MOCK_VAULT } from "~~/data/mockVaults";
import { getStudentById } from "~~/data/students";

export default function DashboardPage() {
  // TODO: Fetch user-specific data from contracts in Epic 5
  const userStats = {
    totalDonated: 225,
    yieldGenerated: 18,
    studentsSupported: 3,
    lastEpochYield: 9,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">My Dashboard</h1>

      {/* Vault Membership */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">💼 Your Vaults</h2>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Vault</div>
              <div className="stat-value text-lg">{MOCK_VAULT.name}</div>
              <div className="stat-desc">by {MOCK_VAULT.whaleName}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Your Deposit</div>
              <div className="stat-value text-primary">${MOCK_MEMBERSHIP.depositAmount}</div>
              <div className="stat-desc">{MOCK_MEMBERSHIP.shares} shares</div>
            </div>
            <div className="stat">
              <div className="stat-title">Yield Earned</div>
              <div className="stat-value text-secondary">${MOCK_MEMBERSHIP.yieldEarned.toFixed(2)}</div>
              <div className="stat-desc">From vault strategies</div>
            </div>
          </div>
          <div className="card-actions justify-end mt-4">
            <Link href="/allocate">
              <button className="btn btn-primary btn-sm">Allocate Yield →</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-title">Total Donated</div>
          <div className="stat-value text-primary">${userStats.totalDonated}</div>
          <div className="stat-desc">Principal deposited to vault</div>
        </div>
        <div className="stat">
          <div className="stat-title">Yield Generated</div>
          <div className="stat-value text-secondary">${userStats.yieldGenerated}</div>
          <div className="stat-desc">From DeFi strategies</div>
        </div>
        <div className="stat">
          <div className="stat-title">Students Supported</div>
          <div className="stat-value">{userStats.studentsSupported}</div>
          <div className="stat-desc">Via your allocations</div>
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
                  <th>Transaction</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DONATION_HISTORY.map(donation => {
                  const student = getStudentById(donation.studentId);
                  return (
                    <tr key={donation.id}>
                      <td>{donation.timestamp.toLocaleDateString()}</td>
                      <td>
                        {student ? (
                          <Link href={`/student/${student.id}`} className="link link-primary">
                            {student.name}
                          </Link>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                      <td>${donation.amount}</td>
                      <td>
                        <a
                          href={`https://basescan.org/tx/${donation.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-primary text-xs"
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
