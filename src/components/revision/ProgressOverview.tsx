"use client";

import React from "react";
import { useRevision } from "@/context/RevisionContext";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Flame, CheckCheck, BookOpen, Target } from "lucide-react";

export function ProgressOverview() {
  const { overallProgress, streakDays } = useRevision();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {/* Stat 1: Overall Revision Readiness */}
      <div className="p-5 rounded-2xl bg-card border border-line flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-sub">Overall Readiness</span>
          <div className="p-2 rounded-xl bg-accent-subtle text-accent">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-main">
              {overallProgress.percentage}%
            </span>
            <span className="text-xs text-subtle">
              ({overallProgress.completed}/{overallProgress.total} reviewed)
            </span>
          </div>
          <ProgressBar value={overallProgress.percentage} showPercentage={false} size="sm" />
        </div>
      </div>

      {/* Stat 2: Active Revision Streak */}
      <div className="p-5 rounded-2xl bg-card border border-line flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-sub">Revision Streak</span>
          <div className="p-2 rounded-xl bg-warning-subtle text-warning">
            <Flame className="w-4 h-4 fill-warning" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-main">{streakDays}</span>
            <span className="text-xs text-sub font-medium">Days active</span>
          </div>
          <p className="text-[11px] text-subtle mt-2">
            Keep reviewing daily to lock concepts into long-term memory.
          </p>
        </div>
      </div>

      {/* Stat 3: Topics Mastered Count */}
      <div className="p-5 rounded-2xl bg-card border border-line flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-sub">Mastered Topics</span>
          <div className="p-2 rounded-xl bg-success-subtle text-success">
            <CheckCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-main">
              {overallProgress.completed}
            </span>
            <span className="text-xs text-sub">High-yield notes</span>
          </div>
          <p className="text-[11px] text-subtle mt-2">
            {overallProgress.total - overallProgress.completed > 0
              ? `${overallProgress.total - overallProgress.completed} remaining for 100% cram`
              : "All current topics completed! You're ready."}
          </p>
        </div>
      </div>

      {/* Stat 4: Estimated Prep Time */}
      <div className="p-5 rounded-2xl bg-card border border-line flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-sub">Est. Blitz Read Time</span>
          <div className="p-2 rounded-xl bg-input text-sub">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-main">~45</span>
            <span className="text-xs text-sub">Minutes</span>
          </div>
          <p className="text-[11px] text-subtle mt-2">
            Concise, zero-fluff crib sheets designed for pre-interview revision.
          </p>
        </div>
      </div>
    </div>
  );
}
