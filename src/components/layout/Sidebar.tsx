"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  Bookmark,
  BarChart3,
  Binary,
  Network,
  Code2,
  Database,
  Cloud,
  MessageSquareText,
  Compass,
  CheckCircle2,
  X,
} from "lucide-react";
import { useRevision } from "@/context/RevisionContext";
import { CATEGORIES } from "@/data/categories";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategoryParam = searchParams ? searchParams.get("category") : null;

  const { getCategoryStats, overallProgress } = useRevision();

  const categoryIcons: Record<string, React.ReactNode> = {
    dsa: <Binary className="w-4 h-4" />,
    "system-design": <Network className="w-4 h-4" />,
    frontend: <Code2 className="w-4 h-4" />,
    backend: <Database className="w-4 h-4" />,
    "cloud-aws": <Cloud className="w-4 h-4" />,
    behavioral: <MessageSquareText className="w-4 h-4" />,
  };

  const studyTools = [
    {
      href: "/cram",
      label: "15-Min Blitz Cram",
      icon: <Zap className="w-4 h-4 text-warning" />,
      isActive: pathname === "/cram",
    },
    {
      href: "/bookmarks",
      label: "Saved for Later",
      icon: <Bookmark className="w-4 h-4 text-accent" />,
      isActive: pathname === "/bookmarks",
    },
    {
      href: "/progress",
      label: "Revision Report",
      icon: <BarChart3 className="w-4 h-4 text-success" />,
      isActive: pathname === "/progress",
    },
  ];

  const isAllSelected = pathname === "/" && !activeCategoryParam;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-line flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo / Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-line">
            <Link href="/" className="flex items-center gap-2.5" onClick={onClose}>
              <div className="w-8 h-8 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-base shadow-sm">
                ⚡
              </div>
              <div>
                <span className="font-semibold text-base text-main block leading-tight">
                  LastMinute<span className="text-accent">Prep</span>
                </span>
                <span className="text-xs text-subtle block font-normal mt-0.5">
                  Interview Revision
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-subtle hover:text-main hover:bg-input"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Courses & Categories Navigation */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 py-1 text-xs font-medium text-subtle">
              Courses & Topics
            </div>

            {/* All Topics overview link */}
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                isAllSelected
                  ? "bg-accent-subtle text-accent font-medium"
                  : "text-sub hover:text-main hover:bg-card-hover font-normal"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 shrink-0" />
                <span>All Topics</span>
              </div>
              <span
                className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                  isAllSelected
                    ? "bg-accent/15 text-accent font-medium"
                    : "text-subtle bg-input"
                }`}
              >
                {overallProgress.total}
              </span>
            </Link>

            {/* Category links without shifting borders */}
            {CATEGORIES.map((cat) => {
              const stats = getCategoryStats(cat.id);
              const isSelected = activeCategoryParam === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={`/?category=${cat.id}`}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors group ${
                    isSelected
                      ? "bg-accent-subtle text-accent font-medium"
                      : "text-sub hover:text-main hover:bg-card-hover font-normal"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`transition-colors shrink-0 ${
                        isSelected ? "text-accent" : "text-subtle group-hover:text-accent"
                      }`}
                    >
                      {categoryIcons[cat.id]}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </div>

                  <span
                    className={`text-xs font-mono px-1.5 py-0.5 rounded transition-colors ${
                      isSelected
                        ? "bg-accent/15 text-accent font-medium"
                        : "bg-input text-subtle"
                    }`}
                  >
                    {stats.completed}/{stats.total}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Study Tools Section */}
          <div className="px-3 py-3 space-y-1 border-t border-line/60">
            <div className="px-3 py-1 text-xs font-medium text-subtle">
              Revision Tools
            </div>
            {studyTools.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                  item.isActive
                    ? "bg-accent-subtle text-accent font-medium"
                    : "text-sub hover:text-main hover:bg-card-hover font-normal"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Footer: Rapid Progress Widget */}
        <div className="p-4 border-t border-line bg-sidebar">
          <div className="p-3 rounded-xl bg-card border border-line space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-main">Revision Progress</span>
              <span className="font-mono text-accent font-semibold">
                {overallProgress.percentage}%
              </span>
            </div>
            <div className="w-full bg-input h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="bg-accent h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress.percentage}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-subtle pt-0.5">
              <span>{overallProgress.completed} of {overallProgress.total} mastered</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <Suspense fallback={<aside className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-sidebar border-r border-line hidden lg:block" />}>
      <SidebarContent {...props} />
    </Suspense>
  );
}
