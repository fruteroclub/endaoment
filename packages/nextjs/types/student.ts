// Student beneficiary types

export interface Student {
  id: string;
  name: string;
  university: string;
  universityLogo?: string;
  field: string; // e.g., "Computer Science PhD"
  country: string; // e.g., "Brazil", "Mexico"
  bio: string;
  fundingGoal: string; // e.g., "$5,000/year"
  fundingGoalUsd: number; // numeric amount for calculations
  currentFunding: number; // amount raised so far
  walletAddress: `0x${string}`;
  impactMetrics: ImpactMetric[];
  avatarUrl: string;
  category: StudentCategory;
  tags: string[];
  isVerified: boolean;
}

export interface ImpactMetric {
  type: "publication" | "presentation" | "equipment" | "course" | "research" | "other";
  title: string;
  description?: string;
  date?: string;
  url?: string;
}

export type StudentCategory = "undergraduate" | "masters" | "phd" | "postdoc" | "research";

export interface DonationStats {
  totalDonated: number;
  yieldGenerated: number;
  studentsSupported: number;
  lastEpochYield: number;
}

export interface AllocationChoice {
  studentId: string;
  percentage: number; // 0-100
}

export interface Epoch {
  id: number;
  startDate: Date;
  endDate: Date;
  votingEndDate: Date;
  totalYield: number;
  isActive: boolean;
  isVotingOpen: boolean;
}
