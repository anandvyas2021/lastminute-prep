import { CategoryMeta } from "@/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "dsa",
    name: "Data Structures & Algos",
    shortDescription: "Core patterns, complexity matrix, sliding window, graphs & dynamic programming.",
    iconName: "Binary",
    accentColor: "blue",
    topicCount: 3,
  },
  {
    id: "system-design",
    name: "System Design & Architecture",
    shortDescription: "Scalability blueprints, caching strategies, CAP theorem, and database sharding.",
    iconName: "Network",
    accentColor: "purple",
    topicCount: 2,
  },
  {
    id: "frontend",
    name: "Frontend & Web Internals",
    shortDescription: "React fiber, rendering lifecycle, JS event loop, browser DOM paint, and Web Vitals.",
    iconName: "Layout",
    accentColor: "emerald",
    topicCount: 2,
  },
  {
    id: "backend",
    name: "Backend, DBs & APIs",
    shortDescription: "ACID properties, B-Tree indexes, SQL vs NoSQL trade-offs, and idempotency.",
    iconName: "Database",
    accentColor: "amber",
    topicCount: 2,
  },
  {
    id: "cloud-aws",
    name: "AWS & Cloud Systems",
    shortDescription: "IAM permission boundaries, S3/EBS/EFS storage matrix, and VPC architectures.",
    iconName: "Cloud",
    accentColor: "orange",
    topicCount: 2,
  },
  {
    id: "behavioral",
    name: "Behavioral & STAR Stories",
    shortDescription: "Conflict resolution, leadership answers, failure handling, and executive presence.",
    iconName: "Users",
    accentColor: "rose",
    topicCount: 2,
  },
];
