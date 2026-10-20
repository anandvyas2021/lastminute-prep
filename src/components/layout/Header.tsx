"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Flame,
  Zap,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useRevision } from "@/context/RevisionContext";
import { SearchModal } from "@/components/ui/SearchModal";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { streakDays } = useRevision();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-card/85 backdrop-blur-md border-b border-line px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-subtle hover:text-main hover:bg-input transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-input border border-line text-xs text-subtle hover:border-line-strong hover:text-sub transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-subtle group-hover:text-accent transition-colors" />
              <span>Search revision notes, AWS patterns, trade-offs...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs font-mono font-medium bg-card border border-line rounded text-sub">
              Ctrl + K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Cram Action, Streak, and Theme Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Quick Cram Blitz CTA */}
          <Link
            href="/cram"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-white text-xs font-medium hover:opacity-95 shadow-xs transition-transform active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>15-Min Blitz</span>
          </Link>

          {/* Active Streak Pill */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-warning-subtle text-warning border border-warning/20 text-xs font-medium"
            title={`${streakDays} days active revision streak`}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>{streakDays}d streak</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-input border border-line text-sub hover:text-main hover:bg-card-hover transition-colors"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} theme`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-warning" />
            )}
          </button>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
