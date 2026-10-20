"use client";

/**
 * AppShell: The main responsive layout scaffolding.
 * 
 * Next.js Educational Note:
 * This component brings together the ThemeProvider, RevisionProvider, 
 * Sidebar, Header, and page content. Making it a Client Component allows
 * responsive sidebar state toggling and access to context hooks.
 */

import React, { useState } from "react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { RevisionProvider } from "@/context/RevisionContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <RevisionProvider>
        <div className="min-h-screen bg-page text-main flex flex-col">
          {/* Navigation Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content Area (Offset by sidebar width on large screens) */}
          <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-200">
            <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

            <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
              {children}
            </main>

            {/* Clean, minimal platform footer */}
            <footer className="border-t border-line px-4 sm:px-8 py-6 text-center text-xs text-subtle">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>LastMinutePrep — Fast, high-yield interview revision vault.</span>
                <span>Crafted with Next.js, Tailwind CSS & Lucide Icons.</span>
              </div>
            </footer>
          </div>
        </div>
      </RevisionProvider>
    </ThemeProvider>
  );
}
