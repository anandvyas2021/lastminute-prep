"use client";

/**
 * Main Course & Revision Hub
 * 
 * Next.js Educational Note:
 * This page houses both the Notes and the Curated Resources for each selected
 * course directly within the course view using tabs.
 */

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Zap,
  Filter,
  Layers,
  Search,
  BookOpen,
  Tv,
  ExternalLink,
  ShieldAlert,
  Compass,
} from "lucide-react";
import { REVISION_NOTES } from "@/data/notes";
import { CATEGORIES } from "@/data/categories";
import { awsPhases, awsCostGuardrails, getAllTracks } from "@/data/resources/index";
import { NoteCard } from "@/components/revision/NoteCard";
import { ProgressOverview } from "@/components/revision/ProgressOverview";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRevision } from "@/context/RevisionContext";

type CourseContentTab = "notes" | "resources";
type ResourceSubView = "curriculum" | "matrix" | "guardrails";

function CourseContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams ? searchParams.get("category") : null;

  const { completedIds } = useRevision();
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFromUrl || "all");
  const [activeCourseTab, setActiveCourseTab] = useState<CourseContentTab>("notes");

  // Resource view sub-tab
  const [resourceSubView, setResourceSubView] = useState<ResourceSubView>("curriculum");
  const [activePhaseNum, setActivePhaseNum] = useState<number>(1);
  const [resourceSearch, setResourceSearch] = useState<string>("");
  const [resourceCostFilter, setResourceCostFilter] = useState<string>("All");

  // Notes view filters
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyUnreviewed, setOnlyUnreviewed] = useState<boolean>(false);

  // Sync state if URL query param changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("all");
    }
  }, [categoryFromUrl]);

  // Current category metadata
  const currentCategoryMeta = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  // Filter notes based on active filters
  const filteredNotes = useMemo(() => {
    return REVISION_NOTES.filter((note) => {
      // Category filter
      if (selectedCategory !== "all" && note.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== "all" && note.difficulty !== selectedDifficulty) {
        return false;
      }
      // Unreviewed toggle
      if (onlyUnreviewed && completedIds.includes(note.id)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(q);
        const matchesSummary = note.summary.toLowerCase().includes(q);
        const matchesTags = note.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, onlyUnreviewed, searchQuery, completedIds]);

  // All tracks for matrix view
  const allTracks = getAllTracks();
  const filteredTracks = useMemo(() => {
    return allTracks.filter((item) => {
      const matchesSearch =
        !resourceSearch ||
        item.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        item.why.toLowerCase().includes(resourceSearch.toLowerCase()) ||
        item.domain.toLowerCase().includes(resourceSearch.toLowerCase());

      const matchesCost =
        resourceCostFilter === "All" ||
        (resourceCostFilter === "Free" && item.cost.includes("Free")) ||
        (resourceCostFilter === "Paid" && !item.cost.includes("Free"));

      return matchesSearch && matchesCost;
    });
  }, [allTracks, resourceSearch, resourceCostFilter]);

  const currentPhase = awsPhases.find((p) => p.phase === activePhaseNum) || awsPhases[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Editorial Welcome Banner */}
      <section className="p-6 sm:p-8 rounded-3xl bg-card border border-line shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-subtle text-accent text-xs font-medium">
              <span>Fast Interview Revision & Curated Resources</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-main tracking-tight">
              Master the interview, one high-yield note at a time.
            </h1>
            <p className="text-sm text-sub leading-relaxed">
              Curated mental models, algorithmic patterns, system design trade-offs, and behavioral frameworks. Fast to read, easy to remember under pressure.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/cram">
              <Button
                variant="primary"
                size="md"
                icon={<Zap className="w-4 h-4 fill-white" />}
              >
                15-Min Blitz Cram
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Revision Analytics Overview */}
      <ProgressOverview />

      {/* Main Course Content Container */}
      <section className="space-y-6">
        {/* Course Header & Selected Domain Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-subtle font-medium">Selected Course:</span>
              <span className="text-xs font-semibold text-accent">
                {currentCategoryMeta ? currentCategoryMeta.name : "All Courses & Topics"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-main">
              {currentCategoryMeta ? currentCategoryMeta.name : "Interview Revision Hub"}
            </h2>
            <p className="text-xs text-sub mt-0.5">
              {currentCategoryMeta
                ? currentCategoryMeta.shortDescription
                : "Explore high-yield written notes or curated video roadmaps."}
            </p>
          </div>

          {/* COURSE-LEVEL TABS: Notes vs Curated Resources */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-input border border-line shrink-0">
            <button
              onClick={() => setActiveCourseTab("notes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeCourseTab === "notes"
                  ? "bg-card text-accent font-semibold shadow-xs"
                  : "text-sub hover:text-main"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Notes & Crib Sheets</span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-input text-subtle">
                {filteredNotes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCourseTab("resources")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeCourseTab === "resources"
                  ? "bg-card text-accent font-semibold shadow-xs"
                  : "text-sub hover:text-main"
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Curated Resources & Videos</span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-input text-subtle">
                {selectedCategory === "cloud-aws" || selectedCategory === "all" ? 19 : 0}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: WRITTEN NOTES & CHEAT SHEETS
           ========================================================================= */}
        {activeCourseTab === "notes" && (
          <div className="space-y-5">
            {/* Search and Secondary Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-card border border-line text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 text-subtle font-medium mr-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Difficulty:</span>
                </div>

                {["all", "Fundamental", "High-Yield", "Medium"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedDifficulty === lvl
                        ? "bg-input font-medium text-main"
                        : "text-sub hover:text-main font-normal"
                    }`}
                  >
                    {lvl === "all" ? "All Levels" : lvl}
                  </button>
                ))}
              </div>

              {/* Search and Unreviewed Checkbox */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-subtle" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search notes, tags..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-input border border-line text-xs text-main placeholder:text-subtle focus:outline-none focus:border-accent"
                  />
                </div>

                <label className="flex items-center gap-2 text-sub cursor-pointer hover:text-main select-none whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={onlyUnreviewed}
                    onChange={(e) => setOnlyUnreviewed(e.target.checked)}
                    className="rounded border-line text-accent focus:ring-accent accent-accent"
                  />
                  <span>Unreviewed only</span>
                </label>
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-card border border-line space-y-3">
                <Layers className="w-8 h-8 text-subtle mx-auto" />
                <h3 className="font-semibold text-main text-sm">
                  No revision topics found
                </h3>
                <p className="text-xs text-sub max-w-sm mx-auto">
                  No notes match your active filter. Try resetting search or switching difficulty.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDifficulty("all");
                    setSearchQuery("");
                    setOnlyUnreviewed(false);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filteredNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: CURATED RESOURCES & VIDEOS
           ========================================================================= */}
        {activeCourseTab === "resources" && (
          <div className="space-y-6">
            {/* If selected course is AWS or All Topics, show the AWS Production Curriculum */}
            {selectedCategory === "cloud-aws" || selectedCategory === "all" ? (
              <div className="space-y-6">
                {/* Sub-Tabs: 6-Phase Roadmap vs Resource Matrix vs Cost Guardrails */}
                <div className="flex flex-wrap items-center gap-2 p-1 rounded-2xl bg-input border border-line">
                  <button
                    onClick={() => setResourceSubView("curriculum")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                      resourceSubView === "curriculum"
                        ? "bg-card text-accent font-semibold shadow-xs"
                        : "text-sub hover:text-main"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>6-Phase Curriculum Roadmap</span>
                  </button>

                  <button
                    onClick={() => setResourceSubView("matrix")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                      resourceSubView === "matrix"
                        ? "bg-card text-accent font-semibold shadow-xs"
                        : "text-sub hover:text-main"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Resource Directory ({allTracks.length})</span>
                  </button>

                  <button
                    onClick={() => setResourceSubView("guardrails")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 ${
                      resourceSubView === "guardrails"
                        ? "bg-card text-accent font-semibold shadow-xs"
                        : "text-sub hover:text-main"
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Cost Guardrails & Safety</span>
                  </button>
                </div>

                {/* SUB-VIEW 1: CURRICULUM ROADMAP */}
                {resourceSubView === "curriculum" && (
                  <div className="space-y-6">
                    {/* Phase Selector Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                      {awsPhases.map((p) => {
                        const isSelected = p.phase === activePhaseNum;
                        return (
                          <button
                            key={p.phase}
                            onClick={() => setActivePhaseNum(p.phase)}
                            className={`p-3 rounded-2xl text-left transition-colors border ${
                              isSelected
                                ? "bg-accent-subtle text-accent border-accent/30 font-medium"
                                : "bg-card border-line hover:bg-card-hover text-sub"
                            }`}
                          >
                            <span className="block text-xs font-semibold">
                              Phase {p.phase}
                            </span>
                            <span className="text-xs text-subtle block truncate mt-0.5">
                              {p.timeline}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Phase Detail Card */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-line space-y-6 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line">
                        <div>
                          <div className="flex items-center gap-2 text-xs mb-1">
                            <Badge variant="accent" size="sm">
                              Phase {currentPhase.phase} of 6
                            </Badge>
                            <span className="text-subtle">•</span>
                            <span className="text-accent font-medium">
                              ⏱️ {currentPhase.timeline}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-main">
                            {currentPhase.name}
                          </h3>
                        </div>
                      </div>

                      {/* Goal Callout */}
                      <div className="p-4 rounded-2xl bg-input border border-line space-y-1">
                        <span className="text-xs font-semibold text-accent block">
                          🎯 Core Engineering Objective
                        </span>
                        <p className="text-xs sm:text-sm text-sub leading-relaxed font-medium">
                          {currentPhase.goal}
                        </p>
                      </div>

                      {/* Curated Tracks Grid */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-medium text-subtle">
                          Curated Best-in-Class Tracks & Resources
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {currentPhase.tracks.map((track) => (
                            <div
                              key={track.id}
                              className="p-5 rounded-2xl bg-page border border-line flex flex-col justify-between hover:border-line-strong transition-colors"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-accent-subtle text-accent">
                                    {track.type}
                                  </span>
                                  <span
                                    className={`text-xs font-medium ${
                                      track.cost.includes("Free") ? "text-success" : "text-warning"
                                    }`}
                                  >
                                    {track.cost}
                                  </span>
                                </div>

                                <h5 className="font-semibold text-sm text-main leading-snug">
                                  {track.title}
                                </h5>

                                <p className="text-xs text-sub leading-relaxed line-clamp-4">
                                  {track.why}
                                </p>
                              </div>

                              <div className="pt-3 mt-4 border-t border-line flex items-center justify-between text-xs">
                                <span className="text-subtle font-mono">
                                  ⏳ {track.time}
                                </span>
                                <a
                                  href={track.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-medium text-accent hover:underline text-xs"
                                >
                                  <span>Open Resource</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Milestone Requirement */}
                      <div className="p-4 rounded-2xl bg-success-subtle/30 border border-success/30 space-y-1">
                        <div className="text-xs font-semibold text-success flex items-center gap-1.5">
                          <span>🏆</span>
                          <span>Phase {currentPhase.phase} Production Proof Milestone</span>
                        </div>
                        <p className="text-xs text-main leading-relaxed">
                          {currentPhase.milestone}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-VIEW 2: RESOURCE DIRECTORY MATRIX */}
                {resourceSubView === "matrix" && (
                  <div className="p-6 rounded-3xl bg-card border border-line space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-main">
                          AWS Learning Resource Directory
                        </h3>
                        <p className="text-xs text-sub">
                          Direct links, time commitments, and costs for all 19 tracks.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
                          <input
                            type="text"
                            value={resourceSearch}
                            onChange={(e) => setResourceSearch(e.target.value)}
                            placeholder="Filter tracks..."
                            className="pl-8 pr-3 py-1.5 rounded-xl bg-input border border-line text-xs text-main placeholder:text-subtle focus:outline-none focus:border-accent"
                          />
                        </div>

                        <select
                          value={resourceCostFilter}
                          onChange={(e) => setResourceCostFilter(e.target.value)}
                          className="px-2.5 py-1.5 rounded-xl bg-input border border-line text-xs text-main focus:outline-none"
                        >
                          <option value="All">All Costs</option>
                          <option value="Free">100% Free Only</option>
                          <option value="Paid">Paid / Premium</option>
                        </select>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-line">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-line bg-input/60 text-subtle font-medium">
                            <th className="py-3 px-4">Track / Resource</th>
                            <th className="py-3 px-4">Phase</th>
                            <th className="py-3 px-4">Format</th>
                            <th className="py-3 px-4">Cost</th>
                            <th className="py-3 px-4">Est. Time</th>
                            <th className="py-3 px-4">Value Proposition</th>
                            <th className="py-3 px-4 text-right">Access</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {filteredTracks.map((t) => (
                            <tr key={t.id} className="hover:bg-card-hover transition-colors">
                              <td className="py-3 px-4 font-semibold text-main max-w-xs">
                                {t.title}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <Badge size="sm" variant="default">
                                  Phase {t.phaseNum}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sub whitespace-nowrap">
                                {t.type}
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap font-medium">
                                <span className={t.cost.includes("Free") ? "text-success" : "text-warning"}>
                                  {t.cost}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-mono text-subtle whitespace-nowrap">
                                {t.time}
                              </td>
                              <td className="py-3 px-4 text-sub max-w-sm leading-relaxed">
                                {t.why}
                              </td>
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <a
                                  href={t.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent-subtle text-accent hover:opacity-85 font-medium text-xs transition"
                                >
                                  <span>Launch</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUB-VIEW 3: COST GUARDRAILS */}
                {resourceSubView === "guardrails" && (
                  <div className="p-6 sm:p-8 rounded-3xl bg-card border border-line space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-warning flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" />
                        <span>Zero-Surprise AWS Billing & Cost Guardrails</span>
                      </h3>
                      <p className="text-xs text-sub mt-1">
                        Essential safeguards before spinning up resources for hands-on labs.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {awsCostGuardrails.map((guardrail, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-input border border-line space-y-2"
                        >
                          <h4 className="font-semibold text-sm text-main">
                            {idx + 1}. {guardrail.title}
                          </h4>
                          <p className="text-xs text-sub leading-relaxed">
                            {guardrail.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-code-bg border border-code-border text-xs font-mono text-code-text space-y-2">
                      <div className="text-code-text/60"># Recommended CLI command to clean up lab AWS accounts:</div>
                      <div className="text-accent">brew install cloud-nuke # or download binary from GitHub</div>
                      <div>cloud-nuke aws --region us-east-1 --resource-type ec2,vpc,eks,nat-gateway</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If a course doesn't have an external video curriculum yet */
              <div className="p-16 text-center rounded-3xl bg-card border border-line space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-input text-subtle flex items-center justify-center mx-auto">
                  <Tv className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-main">
                  Curating Video & Workshop Resources
                </h3>
                <p className="text-xs text-sub max-w-md mx-auto">
                  We are currently vetting and verifying the top-rated video courses and production labs for {currentCategoryMeta?.name}. Check the <strong>Notes & Crib Sheets</strong> tab for the complete written revision summaries.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveCourseTab("notes")}
                >
                  Switch to Notes
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-subtle">Loading platform...</div>}>
      <CourseContent />
    </Suspense>
  );
}
