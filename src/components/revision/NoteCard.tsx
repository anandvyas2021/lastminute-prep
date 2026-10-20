"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevisionNote } from "@/types";
import { useRevision } from "@/context/RevisionContext";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle2,
  Bookmark,
  Clock,
  ArrowUpRight,
} from "lucide-react";

interface NoteCardProps {
  note: RevisionNote;
}

export function NoteCard({ note }: NoteCardProps) {
  const { isCompleted, toggleComplete, isBookmarked, toggleBookmark } =
    useRevision();

  const completed = isCompleted(note.id);
  const bookmarked = isBookmarked(note.id);

  const difficultyVariants: Record<
    string,
    "default" | "accent" | "success" | "warning" | "danger"
  > = {
    Fundamental: "default",
    Medium: "accent",
    "High-Yield": "warning",
    Hard: "danger",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-card border transition-colors duration-150 ${
        completed
          ? "border-success/30 bg-success-subtle/20"
          : "border-line hover:border-line-strong hover:bg-card-hover"
      }`}
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-medium text-accent">
              {note.category}
            </span>
            <span className="text-subtle text-xs">•</span>
            <Badge variant={difficultyVariants[note.difficulty] || "default"} size="sm">
              {note.difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(note.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                bookmarked
                  ? "text-accent bg-accent-subtle"
                  : "text-subtle hover:text-main hover:bg-input"
              }`}
              title={bookmarked ? "Remove Bookmark" : "Save for later"}
            >
              <Bookmark
                className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`}
              />
            </button>

            {/* Mark as Mastered button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleComplete(note.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                completed
                  ? "text-success bg-success-subtle"
                  : "text-subtle hover:text-success hover:bg-input"
              }`}
              title={completed ? "Mark as Incomplete" : "Mark as Mastered"}
            >
              <CheckCircle2
                className={`w-4 h-4 ${completed ? "fill-success text-white" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Note Title & Summary */}
        <Link href={`/topic/${note.id}`} className="block group/link">
          <h3
            className={`text-base font-semibold text-main group-hover/link:text-accent transition-colors mb-2 line-clamp-2 ${
              completed ? "line-through opacity-80" : ""
            }`}
          >
            {note.title}
          </h3>
          <p className="text-xs text-sub leading-relaxed line-clamp-2 mb-4">
            {note.summary}
          </p>
        </Link>
      </div>

      {/* Card Footer: Read Time & Direct Link */}
      <div className="pt-3 border-t border-line/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-subtle">
          <Clock className="w-3.5 h-3.5" />
          <span>{note.readTimeMinutes} min read</span>
        </div>

        <Link
          href={`/topic/${note.id}`}
          className="inline-flex items-center gap-1 font-medium text-accent hover:text-accent-hover transition-colors"
        >
          <span>Review</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
