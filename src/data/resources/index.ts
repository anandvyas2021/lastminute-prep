import { awsPhases, awsCostGuardrails } from "./aws";
import { ResourcePhase, ResourceTrack } from "@/types";

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  phases: ResourcePhase[];
}

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  {
    id: "aws-cloud",
    name: "AWS Production Expert Roadmap",
    description: "Zero to Senior Cloud Architect curriculum synthesising Cantrill, EKS Workshop, Serverless Land & Well-Architected Labs.",
    icon: "Cloud",
    phases: awsPhases,
  },
];

export { awsPhases, awsCostGuardrails };

// Flattened list of all tracks across all phases for easy matrix search & filtering
export function getAllTracks(): (ResourceTrack & { phaseNum: number; phaseName: string })[] {
  const result: (ResourceTrack & { phaseNum: number; phaseName: string })[] = [];
  awsPhases.forEach((p) => {
    p.tracks.forEach((t) => {
      result.push({
        ...t,
        phaseNum: p.phase,
        phaseName: p.name,
      });
    });
  });
  return result;
}
