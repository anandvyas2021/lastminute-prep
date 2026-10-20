"use client";

/**
 * RevisionContext: Manages user revision progress, bookmarks, and completion
 * state with automatic localStorage persistence.
 * 
 * Next.js Educational Note:
 * React Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level.
 * Because we use localStorage here, this must be a Client Component ("use client").
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { RevisionNote } from "@/types";
import { REVISION_NOTES } from "@/data/notes";

interface CategoryStat {
  total: number;
  completed: number;
  percentage: number;
}

interface RevisionContextType {
  completedIds: string[];
  bookmarkedIds: string[];
  streakDays: number;
  toggleComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
  isCompleted: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  getCategoryStats: (category: string) => CategoryStat;
  overallProgress: {
    total: number;
    completed: number;
    percentage: number;
  };
  notes: RevisionNote[];
}

const RevisionContext = createContext<RevisionContextType | undefined>(undefined);

const STORAGE_KEY_COMPLETED = "lmp_completed_topics";
const STORAGE_KEY_BOOKMARKS = "lmp_bookmarked_topics";
const STORAGE_KEY_STREAK = "lmp_streak_data";

export function RevisionProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [streakDays, setStreakDays] = useState<number>(3); // friendly default motivation

  // Load saved state from localStorage on client mount
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedCompleted) {
        setCompletedIds(JSON.parse(savedCompleted));
      }

      const savedBookmarks = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (savedBookmarks) {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      }

      const savedStreak = localStorage.getItem(STORAGE_KEY_STREAK);
      if (savedStreak) {
        const parsed = JSON.parse(savedStreak);
        setStreakDays(parsed.count || 3);
      }
    } catch (e) {
      console.error("Failed to load revision data from localStorage:", e);
    }
  }, []);

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      
      try {
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      
      try {
        localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const isCompleted = (id: string) => completedIds.includes(id);
  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  // Calculate statistics for each revision category
  const getCategoryStats = (category: string): CategoryStat => {
    const categoryNotes = REVISION_NOTES.filter((n) => n.category === category);
    const total = categoryNotes.length;
    const completed = categoryNotes.filter((n) => completedIds.includes(n.id)).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, percentage };
  };

  // Overall platform statistics
  const totalNotes = REVISION_NOTES.length;
  const completedCount = completedIds.filter((id) =>
    REVISION_NOTES.some((n) => n.id === id)
  ).length;
  const overallPercentage =
    totalNotes === 0 ? 0 : Math.round((completedCount / totalNotes) * 100);

  return (
    <RevisionContext.Provider
      value={{
        completedIds,
        bookmarkedIds,
        streakDays,
        toggleComplete,
        toggleBookmark,
        isCompleted,
        isBookmarked,
        getCategoryStats,
        overallProgress: {
          total: totalNotes,
          completed: completedCount,
          percentage: overallPercentage,
        },
        notes: REVISION_NOTES,
      }}
    >
      {children}
    </RevisionContext.Provider>
  );
}

export function useRevision() {
  const context = useContext(RevisionContext);
  if (!context) {
    throw new Error("useRevision must be used within a RevisionProvider");
  }
  return context;
}
