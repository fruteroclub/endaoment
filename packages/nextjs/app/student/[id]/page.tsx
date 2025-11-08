"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StudentCard } from "~~/components/miniapp/StudentCard";
import { getStudentById } from "~~/data/students";

export default function StudentDetailPage() {
  const params = useParams();
  const student = getStudentById(params.id as string);

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Student not found</span>
        </div>
        <Link href="/" className="btn btn-ghost mt-4">
          ← Back to Students
        </Link>
      </div>
    );
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
            <button className="btn btn-primary btn-lg btn-block">Fund {student.name}&apos;s Education</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
