import { RevisionNote } from "@/types";

export const behavioralNotes: RevisionNote[] = [
  {
    id: "beh-01",
    slug: "star-methodology-framework-for-engineers",
    title: "The Senior Engineer STAR Framework: From Rambling to Impact",
    category: "behavioral",
    readTimeMinutes: 5,
    difficulty: "Fundamental",
    summary: "Structure answers in 90 to 120 seconds. Ratio rule: 15% Situation, 15% Task, 50% Action, 20% Result.",
    tags: ["STAR Method", "Behavioral", "Impact", "Leadership"],
    lastUpdated: "Updated 2 days ago",
    tlDr: "Situation (Set the stakes in 2 sentences) -> Task (What was YOUR responsibility) -> Action (Detailed technical decisions, trade-offs, how you persuaded others) -> Result (Quantified metric: latency -40%, revenue +$120K, zero downtime).",
    coreConcepts: [
      {
        heading: "The Golden Time Allocation (2-Minute Rule)",
        explanation: "Most engineers spend 80% on Situation and run out of time. Flip this:",
        bulletPoints: [
          "Situation (20s): 'Our checkout service latency spiked to 2.4s during Black Friday, threatening $500K in sales.'",
          "Task (15s): 'I was tasked with diagnosing the bottleneck and implementing a zero-downtime fix within 48 hours.'",
          "Action (60s): 'I analyzed DB query plans, identified N+1 queries, migrated hot session tokens to Redis with TTL jitter, and led a 3-engineer swarm to ship a hotfix.'",
          "Result (25s): 'Checkout latency dropped to 180ms (92% reduction). We handled peak traffic with 0 errors and documented the post-mortem.'"
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Saying 'We did this' instead of 'I did this'.",
        realityOrSolution: "The interviewer is hiring YOU, not your previous team. Always specify your exact contribution: 'While the team handled migration scripts, I personally designed the fallback caching layer.'"
      },
      {
        mythOrTrap: "Omitting the business metric from the Result.",
        realityOrSolution: "Never end with 'It was great and everyone was happy.' End with concrete numbers: latency drop, cost savings, user retention, or deployment frequency."
      }
    ]
  },
  {
    id: "beh-02",
    slug: "answering-conflict-and-disagreement",
    title: "Handling Technical Disagreements: The 'Disagree and Commit' Playbook",
    category: "behavioral",
    readTimeMinutes: 5,
    difficulty: "High-Yield",
    summary: "How to answer 'Tell me about a time you disagreed with a colleague or manager' without sounding defensive or passive-aggressive.",
    tags: ["Conflict Resolution", "Communication", "Culture Fit"],
    lastUpdated: "Updated 5 days ago",
    tlDr: "Frame disagreements around customer impact and engineering metrics, NOT ego. Demonstrate that you listen, run data-driven spikes/benchmarks, and happily commit once a team decision is made.",
    coreConcepts: [
      {
        heading: "The 4-Step De-escalation Script",
        explanation: "Follow this arc when describing technical disagreements:",
        bulletPoints: [
          "1. Acknowledge Valid Points: Explain why the other person's perspective was reasonable.",
          "2. Prototype / Data Spike: Don't argue in Slack; run a 1-day benchmark or measure latency.",
          "3. Focus on Customer / Business Outcome: Keep the metric objective.",
          "4. Disagree and Commit: Even if your proposal wasn't chosen, support the decision with 100% effort."
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Claiming you've never had a disagreement with coworkers.",
        realityOrSolution: "This is an instant red flag. It signals either lack of experience, passivity, or dishonesty. Healthy technical debate is expected of every strong engineer."
      }
    ]
  }
];
