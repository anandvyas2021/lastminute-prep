"use client";

/**
 * Dedicated Revision Note Deep-Dive Page
 * 
 * Next.js Educational Note:
 * The folder `[id]` creates a dynamic route in Next.js App Router.
 * When a user visits `/topic/dsa-01`, `params.id` equals "dsa-01".
 */

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Bookmark,
  Clock,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { REVISION_NOTES } from "@/data/notes";
import { useRevision } from "@/context/RevisionContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComplexityBadge } from "@/components/revision/ComplexityBadge";
import { CalloutBox } from "@/components/revision/CalloutBox";
import { CodeSnippet } from "@/components/revision/CodeSnippet";

export default function TopicDetailPage() {
  const params = useParams();
  const noteId = params?.id as string;
  const { isCompleted, toggleComplete, isBookmarked, toggleBookmark } = useRevision();

  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Find the note by ID
  const noteIndex = REVISION_NOTES.findIndex((n) => n.id === noteId);
  const note = REVISION_NOTES[noteIndex];

  if (!note) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-main">Topic not found</h2>
        <p className="text-xs text-sub">The requested revision note could not be located.</p>
        <Link href="/">
          <Button variant="outline" size="sm">Return to Vault</Button>
        </Link>
      </div>
    );
  }

  const completed = isCompleted(note.id);
  const bookmarked = isBookmarked(note.id);

  // Previous and Next note for seamless sequential study
  const prevNote = noteIndex > 0 ? REVISION_NOTES[noteIndex - 1] : null;
  const nextNote = noteIndex < REVISION_NOTES.length - 1 ? REVISION_NOTES[noteIndex + 1] : null;

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Top Navigation & Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-sub hover:text-main transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notes</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Share Link Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-xl border border-line bg-card text-sub hover:text-main hover:bg-card-hover transition-colors text-xs flex items-center gap-1.5"
            title="Copy link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(note.id)}
            className={`p-2 rounded-xl border transition-colors text-xs flex items-center gap-1.5 ${
              bookmarked
                ? "bg-accent-subtle text-accent border-accent/20 font-medium"
                : "bg-card border-line text-sub hover:text-main hover:bg-card-hover"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
            <span className="hidden sm:inline">{bookmarked ? "Bookmarked" : "Save"}</span>
          </button>

          {/* Mark as Mastered Button */}
          <Button
            variant={completed ? "secondary" : "primary"}
            size="sm"
            onClick={() => toggleComplete(note.id)}
            icon={<CheckCircle2 className={`w-4 h-4 ${completed ? "text-success fill-success/20" : ""}`} />}
          >
            {completed ? "Mastered ✓" : "Mark as Mastered"}
          </Button>
        </div>
      </div>

      {/* Article Header Card */}
      <article className="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-xs space-y-4">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <Badge variant="accent" size="md">
            {note.category}
          </Badge>
          <span className="text-subtle">•</span>
          <Badge variant="default" size="md">
            {note.difficulty}
          </Badge>
          <span className="text-subtle">•</span>
          <div className="flex items-center gap-1 text-subtle">
            <Clock className="w-3.5 h-3.5" />
            <span>{note.readTimeMinutes} min read</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-main leading-tight">
          {note.title}
        </h1>

        <p className="text-base text-sub leading-relaxed">
          {note.summary}
        </p>

        {/* Complexity Pills (if available) */}
        {(note.timeComplexity || note.spaceComplexity) && (
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            {note.timeComplexity && (
              <ComplexityBadge type="time" value={note.timeComplexity} />
            )}
            {note.spaceComplexity && (
              <ComplexityBadge type="space" value={note.spaceComplexity} />
            )}
          </div>
        )}
      </article>

      {/* 30-Second Cram TL;DR Callout */}
      <div className="p-5 rounded-2xl bg-accent-subtle border border-accent/20 space-y-2">
        <div className="flex items-center gap-2 text-accent font-semibold text-xs">
          <Sparkles className="w-4 h-4 fill-accent" />
          <span>30-Second Interview Cram (TL;DR)</span>
        </div>
        <p className="text-sm text-main font-medium leading-relaxed">
          {note.tlDr}
        </p>
      </div>

      {/* Core Concepts Breakdown */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-main border-b border-line pb-2">
          Core Mental Models & Concepts
        </h2>

        <div className="space-y-6">
          {note.coreConcepts.map((concept, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-card border border-line space-y-3">
              <h3 className="text-base font-bold text-main tracking-tight">
                {concept.heading}
              </h3>
              <p className="text-sm text-sub leading-relaxed">
                {concept.explanation}
              </p>

              {concept.bulletPoints && (
                <ul className="space-y-2 pt-2">
                  {concept.bulletPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs text-sub leading-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Code Examples (if any) */}
      {note.codeExamples && note.codeExamples.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-main border-b border-line pb-2">
            Code Template & Blueprint
          </h2>
          {note.codeExamples.map((example, idx) => (
            <CodeSnippet
              key={idx}
              code={example.code}
              language={example.language}
              title={example.title}
              explanation={example.explanation}
            />
          ))}
        </section>
      )}

      {/* Common Interview Traps (Crucial for passing) */}
      {note.interviewTraps && note.interviewTraps.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-main border-b border-line pb-2">
            What 80% of Candidates Get Wrong
          </h2>
          {note.interviewTraps.map((trap, idx) => (
            <CalloutBox key={idx} type="trap" title={`Trap #${idx + 1}: ${trap.mythOrTrap}`}>
              <div className="mt-2 text-xs">
                <span className="font-semibold text-main">What you should say: </span>
                <span>{trap.realityOrSolution}</span>
              </div>
            </CalloutBox>
          ))}
        </section>
      )}

      {/* Trade-Offs (Option A vs Option B) */}
      {note.tradeOffs && note.tradeOffs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-main border-b border-line pb-2">
            Architectural Trade-offs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {note.tradeOffs.map((trade, idx) => (
              <React.Fragment key={idx}>
                <div className="p-5 rounded-2xl bg-card border border-line space-y-2">
                  <div className="text-xs font-semibold text-accent">
                    Option A: {trade.optionA}
                  </div>
                  <p className="text-xs text-sub leading-relaxed">
                    <strong className="text-main">When to choose: </strong>
                    {trade.whenToUseA}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-line space-y-2">
                  <div className="text-xs font-semibold text-subtle">
                    Option B: {trade.optionB}
                  </div>
                  <p className="text-xs text-sub leading-relaxed">
                    <strong className="text-main">When to choose: </strong>
                    {trade.whenToUseB}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
      )}

      {/* Quick Check / Self-Quiz Accordion */}
      {note.quickCheckQuestions && note.quickCheckQuestions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-main border-b border-line pb-2">
            Quick Check: Test Yourself
          </h2>
          <div className="space-y-3">
            {note.quickCheckQuestions.map((q, idx) => {
              const isOpen = revealedAnswers[idx];
              return (
                <div key={idx} className="p-5 rounded-2xl bg-card border border-line space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <h4 className="text-sm font-semibold text-main">
                        {q.question}
                      </h4>
                    </div>
                    <button
                      onClick={() => toggleAnswer(idx)}
                      className="text-xs font-medium text-accent hover:underline shrink-0"
                    >
                      {isOpen ? "Hide Answer" : "Show Answer"}
                    </button>
                  </div>

                  {isOpen && (
                    <div className="pt-2 text-xs text-sub bg-input p-3.5 rounded-xl border border-line leading-relaxed animate-in fade-in duration-150">
                      <span className="font-semibold text-main">Answer: </span>
                      {q.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Sequential Navigation Footer (Previous / Next Topic) */}
      <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevNote ? (
          <Link
            href={`/topic/${prevNote.id}`}
            className="w-full sm:w-auto p-4 rounded-2xl bg-card border border-line hover:border-line-strong hover:bg-card-hover transition-all flex items-center gap-3 text-left group"
          >
            <ChevronLeft className="w-5 h-5 text-subtle group-hover:text-accent transition-colors" />
            <div>
              <span className="text-xs text-subtle block font-medium">
                Previous Topic
              </span>
              <span className="text-xs font-bold text-main group-hover:text-accent transition-colors line-clamp-1">
                {prevNote.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextNote && (
          <Link
            href={`/topic/${nextNote.id}`}
            className="w-full sm:w-auto p-4 rounded-2xl bg-card border border-line hover:border-line-strong hover:bg-card-hover transition-all flex items-center justify-between gap-3 text-right group ml-auto"
          >
            <div>
              <span className="text-xs text-subtle block font-medium">
                Next Topic
              </span>
              <span className="text-xs font-bold text-main group-hover:text-accent transition-colors line-clamp-1">
                {nextNote.title}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-subtle group-hover:text-accent transition-colors" />
          </Link>
        )}
      </div>
    </div>
  );
}
