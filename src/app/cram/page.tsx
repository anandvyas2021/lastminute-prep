"use client";

/**
 * 15-Minute Blitz Cram Mode
 * 
 * Next.js Educational Note:
 * This route (/cram) provides a streamlined, focused flashcard-style
 * revision experience designed for the last 15 minutes before an interview.
 */

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Shuffle,
  ShieldAlert,
} from "lucide-react";
import { REVISION_NOTES } from "@/data/notes";
import { useRevision } from "@/context/RevisionContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function CramPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isCompleted, toggleComplete, isBookmarked, toggleBookmark } = useRevision();

  const total = REVISION_NOTES.length;
  const currentNote = REVISION_NOTES[currentIndex];
  const completed = isCompleted(currentNote.id);
  const bookmarked = isBookmarked(currentNote.id);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const shuffleCards = () => {
    const randomIdx = Math.floor(Math.random() * total);
    setCurrentIndex(randomIdx);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-sub hover:text-main transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Blitz Cram</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shuffleCards}
            icon={<Shuffle className="w-3.5 h-3.5" />}
          >
            Shuffle
          </Button>
          <span className="text-xs font-mono font-medium text-subtle px-2.5 py-1 rounded-lg bg-input border border-line">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={((currentIndex + 1) / total) * 100}
        showPercentage={false}
        size="sm"
      />

      {/* Main Blitz Cram Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-line shadow-xs space-y-6 relative overflow-hidden">
        {/* Subtle accent bar on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

        {/* Card Header Meta */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-accent">
              {currentNote.category}
            </span>
            <span className="text-subtle text-xs">•</span>
            <Badge variant="default" size="sm">
              {currentNote.difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleBookmark(currentNote.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                bookmarked
                  ? "bg-accent-subtle text-accent border-accent/20"
                  : "border-line text-subtle hover:text-main hover:bg-input"
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => toggleComplete(currentNote.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                completed
                  ? "bg-success-subtle text-success border-success/20"
                  : "border-line text-subtle hover:text-success hover:bg-input"
              }`}
              title="Mark Reviewed"
            >
              <CheckCircle2 className={`w-4 h-4 ${completed ? "fill-success text-white" : ""}`} />
            </button>
          </div>
        </div>

        {/* Note Title */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-main">
            {currentNote.title}
          </h2>
          <p className="text-xs text-sub leading-relaxed">
            {currentNote.summary}
          </p>
        </div>

        {/* High-Yield TL;DR Box */}
        <div className="p-4 rounded-2xl bg-accent-subtle border border-accent/20 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-accent">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Last Minute Mental Model</span>
          </div>
          <p className="text-sm font-medium text-main leading-relaxed">
            {currentNote.tlDr}
          </p>
        </div>

        {/* Complexity if applicable */}
        {(currentNote.timeComplexity || currentNote.spaceComplexity) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentNote.timeComplexity && (
              <div className="p-3 rounded-xl bg-input border border-line">
                <span className="text-subtle block font-medium text-xs mb-0.5">
                  Time Complexity
                </span>
                <span className="font-mono font-semibold text-main">
                  {currentNote.timeComplexity}
                </span>
              </div>
            )}
            {currentNote.spaceComplexity && (
              <div className="p-3 rounded-xl bg-input border border-line">
                <span className="text-subtle block font-medium text-xs mb-0.5">
                  Space Complexity
                </span>
                <span className="font-mono font-semibold text-main">
                  {currentNote.spaceComplexity}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Key Interview Trap to Avoid */}
        {currentNote.interviewTraps && currentNote.interviewTraps.length > 0 && (
          <div className="p-4 rounded-2xl bg-danger-subtle/30 border border-danger/25 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-danger">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Interviewer Trap: {currentNote.interviewTraps[0].mythOrTrap}</span>
            </div>
            <p className="text-xs text-sub pl-5 leading-relaxed">
              <strong className="text-main">Say this instead: </strong>
              {currentNote.interviewTraps[0].realityOrSolution}
            </p>
          </div>
        )}

        {/* Bottom Actions within Card */}
        <div className="pt-2 flex items-center justify-between border-t border-line/60">
          <Link
            href={`/topic/${currentNote.id}`}
            className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
          >
            <span>Open Full Note & Code Template</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => toggleComplete(currentNote.id)}
            className={`text-xs font-medium transition-colors ${
              completed ? "text-success font-semibold" : "text-subtle hover:text-main"
            }`}
          >
            {completed ? "✓ Mastered" : "Mark as Mastered"}
          </button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="md"
          onClick={prevCard}
          icon={<ChevronLeft className="w-4 h-4" />}
        >
          Previous Card
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={nextCard}
          icon={<ChevronRight className="w-4 h-4" />}
        >
          Next Card
        </Button>
      </div>
    </div>
  );
}
