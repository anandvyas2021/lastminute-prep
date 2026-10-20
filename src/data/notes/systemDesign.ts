import { RevisionNote } from "@/types";

export const systemDesignNotes: RevisionNote[] = [
  {
    id: "sys-01",
    slug: "cap-theorem-and-pacelc",
    title: "CAP Theorem & PACELC: Beyond the Textbook Definition",
    category: "system-design",
    readTimeMinutes: 8,
    difficulty: "High-Yield",
    summary: "Why you can't just 'choose Consistency and Availability', how real networks partition, and how PACELC explains Cassandra vs DynamoDB vs Postgres.",
    tags: ["Distributed Systems", "CAP Theorem", "Consensus", "Availability"],
    lastUpdated: "Updated 5 days ago",
    tlDr: "Network Partitions (P) are an unavoidable physical reality. Therefore, during a partition, you must trade off between Consistency (C: return error/wait) and Availability (A: return stale data). PACELC extends this: even when healthy (Else), choose Latency (L) vs Consistency (C).",
    coreConcepts: [
      {
        heading: "1. The Reality of Partitions (P)",
        explanation: "You do not 'choose' P. Cables get severed, switches fail, garbage collection freezes nodes. When P happens, your distributed cluster has two choices:",
        bulletPoints: [
          "CP (Consistency + Partition Tolerance): Reject requests or wait for nodes to sync to prevent reading or writing divergent data (e.g. HBase, ZooKeeper, etcd).",
          "AP (Availability + Partition Tolerance): Keep serving reads/writes immediately, but replicas may temporarily disagree. Reconcile later via Vector Clocks or Last-Write-Wins (e.g. Cassandra, DynamoDB, CouchDB)."
        ]
      },
      {
        heading: "2. The PACELC Theorem (Senior Interview Differentiator)",
        explanation: "CAP only explains what happens when the network fails. But 99.9% of the time, the network is NOT failing! PACELC states: If Partition (P), choose (A) or (C); Else (E), choose Latency (L) or Consistency (C).",
        bulletPoints: [
          "PC/EC: BigTable, Spanner (Always consistent, willing to pay latency and availability penalties).",
          "PA/EL: DynamoDB, Cassandra (Prioritize availability during partitions, prioritize fast latency during normal ops with eventual consistency)."
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Saying 'I choose CA (Consistency + Availability)' in a distributed system.",
        realityOrSolution: "CA is only possible on a single machine or in an imaginary network where packets are physically impossible to drop. In any distributed system, P is mandatory."
      }
    ],
    tradeOffs: [
      {
        optionA: "Strong Consistency (Linearizability)",
        optionB: "Eventual Consistency",
        whenToUseA: "Financial transactions, inventory stock reservation, distributed locking.",
        whenToUseB: "Social media feeds, comment likes, analytics counters, live view counts."
      }
    ],
    quickCheckQuestions: [
      {
        question: "How does Quorum consistency (R + W > N) achieve strong consistency?",
        answer: "If the number of nodes read (R) plus nodes written (W) exceeds the total replica count (N), by the Pigeonhole Principle, at least one node in the read quorum is guaranteed to contain the latest write."
      }
    ]
  },
  {
    id: "sys-02",
    slug: "caching-strategies-and-cache-invalidation",
    title: "Caching Blueprint: Cache-Aside, Write-Through & Stampede Defense",
    category: "system-design",
    readTimeMinutes: 7,
    difficulty: "High-Yield",
    summary: "Cache-Aside vs Write-Through vs Write-Back, cache stampede mitigation (mutex vs probabilistic early expiration), and Redis eviction policies.",
    tags: ["Caching", "Redis", "Performance", "Scalability"],
    lastUpdated: "Updated 4 days ago",
    tlDr: "Cache-Aside is the default workhorse (App reads cache, on miss reads DB & populates cache). Protect against Cache Penetration (Bloom filters), Cache Breakdown (Distributed mutex or XFetch), and Cache Avalanche (Jitter on TTLs).",
    coreConcepts: [
      {
        heading: "The 3 Cache Write Patterns",
        explanation: "Every caching interview requires you to justify your write strategy:",
        bulletPoints: [
          "Cache-Aside (Lazy Loading): App reads cache -> miss -> reads DB -> writes to cache. On DB update: App updates DB, then invalidates/deletes cache entry. Resilient to cache failure.",
          "Write-Through: App writes to Cache, and Cache synchronously writes to DB before acknowledging. Higher write latency, but cache is never stale.",
          "Write-Back (Write-Behind): App writes to Cache, which acknowledges immediately and asynchronously flushes to DB in batches. Extreme write speed, but risk of data loss on cache crash."
        ]
      },
      {
        heading: "The Cache Failure Trio",
        explanation: "Memorize these three failure modes and their exact mitigations:",
        bulletPoints: [
          "1. Cache Avalanche: Thousands of keys expire at the exact same minute, hitting DB all at once. Fix: Add random jitter to TTLs (e.g., 60 mins ± 5 mins).",
          "2. Cache Breakdown (Hot Key Expiry): A super hot key expires, and 50,000 concurrent requests all miss and hammer the DB. Fix: Distributed Mutex (singleflight) or background pre-warming.",
          "3. Cache Penetration: Malicious queries for non-existent IDs bypass cache completely. Fix: Cache null values with short TTL, or use a Bloom Filter."
        ]
      }
    ],
    codeExamples: [
      {
        language: "typescript",
        title: "Cache-Aside Pattern with Single-Flight / Mutex Logic",
        code: `async function getUserProfile(userId: string): Promise<UserProfile> {
  const cacheKey = \`user:profile:\${userId}\`;

  // 1. Try Cache First
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Cache Miss: Query Database
  const profile = await db.user.findUnique({ where: { id: userId } });

  if (profile) {
    // 3. Populate Cache with TTL + Random Jitter (prevent avalanche)
    const jitterSeconds = Math.floor(Math.random() * 60);
    const ttl = 300 + jitterSeconds; // 5 mins + jitter
    await redis.set(cacheKey, JSON.stringify(profile), 'EX', ttl);
  } else {
    // 4. Cache null for 30s to prevent Cache Penetration
    await redis.set(cacheKey, JSON.stringify(null), 'EX', 30);
  }

  return profile;
}`
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Updating the cache directly when updating the database.",
        realityOrSolution: "Race conditions can cause stale data if two concurrent writes occur. Standard practice is to DELETE the cache key on DB update, letting the next read repopulate it."
      }
    ]
  }
];
