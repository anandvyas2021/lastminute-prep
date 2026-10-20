import { RevisionNote } from "@/types";

export const backendNotes: RevisionNote[] = [
  {
    id: "be-01",
    slug: "database-indexing-b-trees-and-query-optimization",
    title: "Database Indexing: B-Trees, Composite Keys & Query Optimization",
    category: "backend",
    readTimeMinutes: 7,
    difficulty: "High-Yield",
    summary: "How B+ Trees actually work on disk, Leftmost Prefix Rule for composite indexes, and how to spot Full Table Scans in EXPLAIN ANALYZE.",
    tags: ["Databases", "PostgreSQL", "MySQL", "Indexing", "B-Tree"],
    lastUpdated: "Updated 4 days ago",
    tlDr: "B+ Trees store all actual data pointers in leaf nodes connected as a doubly linked list (ideal for range scans). For composite index (A, B, C), queries can only use the index if 'A' is in the WHERE clause (Leftmost Prefix Rule).",
    timeComplexity: "O(log N) lookup instead of O(N) sequential table scan",
    coreConcepts: [
      {
        heading: "1. Why B+ Trees instead of Binary Search Trees / Hash Maps?",
        explanation: "Disks read data in pages (typically 4KB to 16KB). A BST has low fanout (only 2 children per node), requiring many disk seeks. A B+ Tree has high fanout (hundreds of keys per node), reducing tree height to 3-4 levels for millions of rows.",
        bulletPoints: [
          "High Fanout: Minimum disk I/O operations.",
          "Sequential Linked Leaves: Range queries (`WHERE age BETWEEN 20 AND 30`) simply find the start leaf and walk the pointers."
        ]
      },
      {
        heading: "2. The Leftmost Prefix Rule",
        explanation: "Given an index on `(status, created_at, user_id)`:",
        bulletPoints: [
          "✅ `WHERE status = 'active'` -> Index used",
          "✅ `WHERE status = 'active' AND created_at > '2025-01-01'` -> Index used",
          "❌ `WHERE created_at > '2025-01-01'` -> Index CANNOT be used! Column `status` is missing."
        ]
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Applying functions to indexed columns in WHERE clauses (e.g. WHERE YEAR(created_at) = 2025).",
        realityOrSolution: "Wrapping an indexed column in a function invalidates the index, forcing a full table scan. Use range bounds: WHERE created_at >= '2025-01-01' AND created_at < '2026-01-01'."
      }
    ]
  },
  {
    id: "be-02",
    slug: "acid-transactions-and-isolation-levels",
    title: "ACID Properties & The 4 SQL Transaction Isolation Levels",
    category: "backend",
    readTimeMinutes: 6,
    difficulty: "Fundamental",
    summary: "Dirty reads, non-repeatable reads, and phantom reads explained with concrete table scenarios and MVCC.",
    tags: ["SQL", "Transactions", "ACID", "Concurrency"],
    lastUpdated: "Updated 6 days ago",
    tlDr: "Read Uncommitted (Dirty Reads) -> Read Committed (Default in Postgres/Oracle) -> Repeatable Read (Default in MySQL InnoDB) -> Serializable (Total isolation, highest lock contention).",
    coreConcepts: [
      {
        heading: "Isolation Anomaly Hierarchy",
        explanation: "Each isolation level prevents specific concurrency anomalies:",
        bulletPoints: [
          "Dirty Read: Reading uncommitted changes made by another in-flight transaction that might rollback.",
          "Non-Repeatable Read: Re-reading the same row within transaction T1 returns different values because T2 updated and committed it.",
          "Phantom Read: Re-running a range query (e.g., `WHERE age > 18`) returns newly inserted rows committed by T2."
        ]
      }
    ],
    tradeOffs: [
      {
        optionA: "Read Committed",
        optionB: "Serializable",
        whenToUseA: "Standard web apps, high throughput, low contention.",
        whenToUseB: "Strict financial ledgers, preventing write skew / double booking."
      }
    ]
  }
];
