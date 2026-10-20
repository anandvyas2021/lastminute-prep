"use client";

/**
 * Revision Progress & Readiness Report
 * 
 * Next.js Educational Note:
 * This route (/progress) calculates comprehensive analytics across all
 * five revision domains, giving the learner a clear snapshot of their
 * preparation readiness.
 */

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Flame,
  ArrowRight,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { useRevision } from "@/context/RevisionContext";
import { CATEGORIES } from "@/data/categories";
import { REVISION_NOTES } from "@/data/notes";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";

export default function ProgressPage() {
  const {
    overallProgress,
    getCategoryStats,
    completedIds,
    toggleComplete,
    streakDays,
  } = useRevision();

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your revision checkmarks?")) {
      completedIds.forEach((id) => toggleComplete(id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sub hover:text-main transition-colors mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-main">
              Revision Progress Report
            </h1>
          </div>
          <p className="text-xs text-sub mt-1">
            Track your mastery across all core technical and behavioral domains.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetProgress}
          icon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Reset Progress
        </Button>
      </div>

      {/* Main Readiness Scorecard */}
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-medium text-accent">
              Overall Preparation Index
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-main">
                {overallProgress.percentage}%
              </span>
              <span className="text-sm text-sub">
                ({overallProgress.completed} of {overallProgress.total} high-yield notes mastered)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-warning-subtle text-warning border border-warning/20">
            <Flame className="w-6 h-6 fill-warning" />
            <div>
              <span className="text-sm font-bold block">{streakDays}-Day Streak</span>
              <span className="text-xs text-warning/80">Active Study Rhythm</span>
            </div>
          </div>
        </div>

        <ProgressBar value={overallProgress.percentage} showPercentage={false} size="lg" />
      </div>

      {/* Domain Breakdown Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-main">
          Domain Mastery Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const stats = getCategoryStats(cat.id);
            const notesInCat = REVISION_NOTES.filter((n) => n.category === cat.id);

            return (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-card border border-line space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-main">
                      {cat.name}
                    </h3>
                    <span className="text-xs font-mono font-bold text-accent">
                      {stats.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-sub mb-3">
                    {cat.shortDescription}
                  </p>
                  <ProgressBar value={stats.percentage} showPercentage={false} size="sm" />
                </div>

                {/* Topics checklist within domain */}
                <div className="pt-3 border-t border-line space-y-2">
                  <span className="text-xs font-medium text-subtle block">
                    Topics ({stats.completed}/{stats.total})
                  </span>
                  <div className="space-y-1.5">
                    {notesInCat.map((note) => {
                      const isDone = completedIds.includes(note.id);
                      return (
                        <div
                          key={note.id}
                          className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-input transition-colors group"
                        >
                          <button
                            onClick={() => toggleComplete(note.id)}
                            className="flex items-center gap-2 text-left truncate flex-1 mr-2"
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-success fill-success/20 shrink-0" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-subtle shrink-0" />
                            )}
                            <span
                              className={`truncate ${
                                isDone ? "text-subtle line-through" : "text-main"
                              }`}
                            >
                              {note.title}
                            </span>
                          </button>

                          <Link
                            href={`/topic/${note.id}`}
                            className="text-subtle group-hover:text-accent transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
