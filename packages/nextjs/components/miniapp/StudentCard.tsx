"use client";

import Link from "next/link";
import { UI_CONFIG } from "../../data/constants";
import { getFundingProgress } from "../../data/students";
import { Student } from "../../types/student";

interface StudentCardProps {
  student: Student;
  showDonateButton?: boolean;
}

/**
 * StudentCard Component
 * Displays a student profile card with funding progress and impact metrics
 */
export function StudentCard({ student, showDonateButton = true }: StudentCardProps) {
  const progress = getFundingProgress(student);

  // Determine progress bar color based on funding level
  const getProgressColor = () => {
    if (progress < 25) return UI_CONFIG.PROGRESS_BAR_COLORS.low;
    if (progress < 75) return UI_CONFIG.PROGRESS_BAR_COLORS.medium;
    return UI_CONFIG.PROGRESS_BAR_COLORS.high;
  };

  // Category badge color
  const getCategoryColor = () => {
    return UI_CONFIG.CATEGORY_COLORS[student.category] || "#6b7280";
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <figure className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
        {/* Student avatar/photo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* Placeholder - in production, use Next.js Image */}
              <div className="bg-primary/30 flex items-center justify-center text-4xl font-bold">
                {student.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Verified badge */}
        {student.isVerified && (
          <div className="badge badge-success absolute top-2 right-2 gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Verified
          </div>
        )}
      </figure>

      <div className="card-body">
        {/* Student name and field */}
        <h2 className="card-title">
          {student.name}
          <div className="badge badge-sm" style={{ backgroundColor: getCategoryColor(), color: "white" }}>
            {student.category}
          </div>
        </h2>

        <p className="text-sm font-semibold text-primary">{student.field}</p>

        {/* University and country */}
        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span>{student.university}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-base-content/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{student.country}</span>
        </div>

        {/* Bio excerpt */}
        <p className="text-sm line-clamp-2 mt-2">{student.bio}</p>

        {/* Impact metrics preview */}
        <div className="flex flex-wrap gap-1 mt-2">
          {student.impactMetrics.slice(0, 2).map((metric, idx) => (
            <div key={idx} className="badge badge-outline badge-sm">
              {metric.type === "publication" && "📄"}
              {metric.type === "presentation" && "🎤"}
              {metric.type === "equipment" && "🔬"}
              {metric.type === "course" && "📚"}
              {metric.type === "research" && "🔍"}
              {metric.type === "other" && "✨"}{" "}
              {metric.title.length > 20 ? metric.title.slice(0, 20) + "..." : metric.title}
            </div>
          ))}
          {student.impactMetrics.length > 2 && (
            <div className="badge badge-ghost badge-sm">+{student.impactMetrics.length - 2} more</div>
          )}
        </div>

        {/* Funding progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold">Funding Progress</span>
            <span className="text-base-content/70">
              ${student.currentFunding.toLocaleString()} / {student.fundingGoal}
            </span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all"
              style={{
                width: `${progress}%`,
                backgroundColor: getProgressColor(),
              }}
            />
          </div>
          <div className="text-xs text-base-content/60 mt-1">{progress.toFixed(1)}% funded</div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {student.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge badge-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="card-actions justify-end mt-4">
          <Link href={`/student/${student.id}`}>
            <button className="btn btn-ghost btn-sm">Learn More</button>
          </Link>

          {showDonateButton && (
            <Link href={`/donate/${student.id}`}>
              <button className="btn btn-primary btn-sm">Fund Student</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
