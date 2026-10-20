/**
 * Core TypeScript definitions for the LastMinutePrep platform.
 * 
 * 100% Strictly Typed:
 * Every revision note, resource track, curriculum phase, and state property
 * has a dedicated interface to prevent runtime errors and ensure intellisense.
 */

// ============================================================================
// 1. NOTES & REVISION TYPES
// ============================================================================

export type CategoryId = 'dsa' | 'system-design' | 'frontend' | 'backend' | 'behavioral' | 'cloud-aws';

export type DifficultyLevel = 'Fundamental' | 'Medium' | 'High-Yield' | 'Hard';

export interface CodeExample {
  language: string;
  title: string;
  code: string;
  explanation?: string;
}

export interface RevisionTrap {
  mythOrTrap: string;
  realityOrSolution: string;
}

export interface CoreConcept {
  heading: string;
  explanation: string;
  bulletPoints?: string[];
}

export interface TradeOff {
  optionA: string;
  optionB: string;
  whenToUseA: string;
  whenToUseB: string;
}

export interface QuickCheckQuestion {
  question: string;
  answer: string;
}

export interface RevisionNote {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  readTimeMinutes: number;
  difficulty: DifficultyLevel;
  summary: string;
  tags: string[];
  lastUpdated: string;
  
  // High-yield quick cram sheet data
  tlDr: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  
  // Deep-dive rich content sections
  coreConcepts: CoreConcept[];
  codeExamples?: CodeExample[];
  interviewTraps?: RevisionTrap[];
  tradeOffs?: TradeOff[];
  quickCheckQuestions?: QuickCheckQuestion[];
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  shortDescription: string;
  iconName: string;
  accentColor: string;
  topicCount?: number;
}

// ============================================================================
// 2. CURATED RESOURCES TYPES (VIDEOS, WORKSHOPS & LABS)
// ============================================================================

export interface ResourceTrack {
  id: string;
  title: string;
  url: string;
  type: string; // e.g. "Video Course", "Official Workshop", "Architecture Guide"
  cost: string; // e.g. "100% Free", "Paid (~$40)"
  time: string; // e.g. "70 hours", "15 hours"
  why: string;  // Value proposition / why it is the best
  domain: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ResourcePhase {
  phase: number;
  name: string;
  timeline: string;
  goal: string;
  milestone: string;
  tracks: ResourceTrack[];
}

export interface CostGuardrail {
  title: string;
  description: string;
  icon?: string;
  severity: 'info' | 'warning' | 'critical';
}

// ============================================================================
// 3. USER STATE & ANALYTICS TYPES
// ============================================================================

export interface UserRevisionState {
  completedNoteIds: string[];
  bookmarkedNoteIds: string[];
  lastVisitedNoteId?: string;
  streakCount: number;
  lastStudyDate?: string;
}
