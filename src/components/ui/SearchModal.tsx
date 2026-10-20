"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { REVISION_NOTES } from "@/data/notes";
import { Badge } from "@/components/ui/Badge";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredNotes = query.trim() === ""
    ? REVISION_NOTES.slice(0, 4) // Show top recommendations initially
    : REVISION_NOTES.filter((note) => {
        const q = query.toLowerCase();
        return (
          note.title.toLowerCase().includes(q) ||
          note.summary.toLowerCase().includes(q) ||
          note.category.toLowerCase().includes(q) ||
          note.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          note.tlDr.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-card border border-line rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-line gap-3">
          <Search className="w-5 h-5 text-subtle shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patterns, algorithms, system design topics, or tags..."
            autoFocus
            className="w-full bg-transparent text-sm text-main placeholder:text-subtle focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-subtle hover:text-main"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-mono font-medium bg-input text-subtle border border-line rounded">
              Esc
            </kbd>
          )}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-3 space-y-1 divide-y divide-line/40">
          <div className="px-2 py-1 text-xs font-medium text-subtle">
            {query.trim() === "" ? "Quick Revision Suggestions" : `Results (${filteredNotes.length})`}
          </div>

          {filteredNotes.length === 0 ? (
            <div className="py-12 text-center text-subtle text-xs">
              No revision notes found matching &quot;{query}&quot;. Try searching for &quot;sliding window&quot;, &quot;cache&quot;, or &quot;iam&quot;.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <Link
                key={note.id}
                href={`/topic/${note.id}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-card-hover transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-accent">
                      {note.category}
                    </span>
                    <span className="text-subtle text-xs">•</span>
                    <Badge size="sm" variant="default">
                      {note.difficulty}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-main group-hover:text-accent transition-colors">
                    {note.title}
                  </h4>
                  <p className="text-xs text-sub line-clamp-1">
                    {note.tlDr}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-subtle group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-input/50 border-t border-line text-xs text-sub flex items-center justify-between">
          <span>Navigate with click or search query</span>
          <button
            onClick={onClose}
            className="text-sub hover:text-main font-medium underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
