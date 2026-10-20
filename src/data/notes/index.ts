import { RevisionNote } from "@/types";
import { dsaNotes } from "./dsa";
import { systemDesignNotes } from "./systemDesign";
import { frontendNotes } from "./frontend";
import { backendNotes } from "./backend";
import { behavioralNotes } from "./behavioral";
import { awsNotes } from "./aws";

/**
 * REVISION_NOTES: Central aggregate of all high-yield interview revision content.
 * 
 * Modular Architecture Note:
 * Each domain has its own dedicated file in `src/data/notes/`.
 * When you provide your custom notes, simply update the corresponding file
 * or drop a new file into this folder and add it to this array!
 */
export const REVISION_NOTES: RevisionNote[] = [
  ...dsaNotes,
  ...systemDesignNotes,
  ...frontendNotes,
  ...backendNotes,
  ...behavioralNotes,
  ...awsNotes,
];

export { dsaNotes, systemDesignNotes, frontendNotes, backendNotes, behavioralNotes, awsNotes };
