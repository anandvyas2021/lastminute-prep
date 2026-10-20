"use client";

/**
 * Saved / Bookmarks Page
 * 
 * Next.js Educational Note:
 * This route (/bookmarks) filters the notes using the user's bookmarkedIds
 * stored in the shared RevisionContext (persisted in localStorage).
 */

import React from "react";
import Link from "next/link";
import { Bookmark, ArrowLeft } from "lucide-react";
import { useRevision } from "@/context/RevisionContext";
import { NoteCard } from "@/components/revision/NoteCard";
import { Button } from "@/components/ui/Button";

export default function BookmarksPage() {
  const { notes, bookmarkedIds } = useRevision();

  const bookmarkedNotes = notes.filter((n) => bookmarkedIds.includes(n.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
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
              Saved for Revision
            </h1>
          </div>
          <p className="text-xs text-sub mt-1">
            {bookmarkedNotes.length} tricky topics pinned for quick review before your rounds.
          </p>
        </div>
      </div>

      {bookmarkedNotes.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-card border border-line space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-input text-subtle flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-main">
            No saved topics yet
          </h2>
          <p className="text-xs text-sub max-w-sm mx-auto">
            Click the bookmark icon on any note card to save it here for fast last-minute revision.
          </p>
          <Link href="/">
            <Button variant="primary" size="sm">
              Explore Revision Vault
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookmarkedNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
