import { RevisionNote } from "@/types";

export const dsaNotes: RevisionNote[] = [
  {
    id: "dsa-01",
    slug: "two-pointers-and-sliding-window",
    title: "Sliding Window & Two Pointers Master Sheet",
    category: "dsa",
    readTimeMinutes: 6,
    difficulty: "High-Yield",
    summary: "Recognize when an O(N²) problem can be reduced to O(N) using dynamic or fixed window techniques.",
    tags: ["Arrays", "Two Pointers", "Sliding Window", "O(N) Optimization"],
    lastUpdated: "Updated 2 days ago",
    tlDr: "If the input is contiguous (subarray/substring) and monotonic, use Sliding Window. If the array is sorted and you need pairs/triplets, use Two Pointers. Window expands with 'right' and contracts with 'left' when condition is violated.",
    timeComplexity: "O(N) — each element is added and removed at most once",
    spaceComplexity: "O(1) auxiliary space (or O(K) hash map for frequencies)",
    coreConcepts: [
      {
        heading: "1. The 3 Sliding Window Archetypes",
        explanation: "Almost every sliding window problem fits one of three patterns:",
        bulletPoints: [
          "Fixed Size K: Window size is constant. Add element at right, subtract element at (right - K). Track max/min sum.",
          "Dynamic Window (Condition Matching): Expand 'right' pointer until valid/invalid, then increment 'left' pointer to shrink until condition holds again. (e.g. Longest Substring Without Repeating Characters).",
          "At Most K -> Exactly K: To solve 'Subarrays with Exactly K distinct elements', calculate: `atMost(K) - atMost(K - 1)`."
        ]
      },
      {
        heading: "2. The Classic While-Loop Blueprint",
        explanation: "Keep this template in your muscle memory. It avoids off-by-one errors during intense live coding:",
        bulletPoints: [
          "Initialize left = 0, state = {}, answer = 0",
          "Loop right from 0 to array.length - 1",
          "Include array[right] into current window state",
          "While window is invalid: shrink window by removing array[left] and left++",
          "Update answer with valid window: Math.max(answer, right - left + 1)"
        ]
      }
    ],
    codeExamples: [
      {
        language: "typescript",
        title: "Longest Substring Without Repeating Characters (TypeScript)",
        code: `function lengthOfLongestSubstring(s: string): number {
  const lastSeenIndex = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    // If char was seen within the current window, jump left pointer past it
    if (lastSeenIndex.has(char) && lastSeenIndex.get(char)! >= left) {
      left = lastSeenIndex.get(char)! + 1;
    }

    lastSeenIndex.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
        explanation: "By storing the last index of each character, we can jump the left pointer forward in O(1) instead of incrementing one-by-one."
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Assuming sliding window works when negative numbers are present with a sum condition.",
        realityOrSolution: "Sliding window requires monotonicity. If negative numbers exist, increasing the window can decrease the sum! Use Prefix Sums + Hash Map instead."
      },
      {
        mythOrTrap: "Forgetting to check if the duplicate character index is >= left pointer.",
        realityOrSolution: "If you just check `map.has(char)`, the recorded index might be from an old window that was already discarded."
      }
    ],
    tradeOffs: [
      {
        optionA: "Sliding Window",
        optionB: "Prefix Sum + Hash Map",
        whenToUseA: "All numbers are positive or condition is monotonic (e.g. at most K distinct).",
        whenToUseB: "Negative numbers exist, or problem asks for count of subarrays summing exactly to K."
      }
    ],
    quickCheckQuestions: [
      {
        question: "Why is the time complexity O(N) even though there is a nested while loop?",
        answer: "Because both the 'right' pointer and 'left' pointer only move forward from 0 to N. Each item is visited at most twice."
      }
    ]
  },
  {
    id: "dsa-02",
    slug: "binary-search-templates",
    title: "Binary Search: Never Write an Infinite Loop Again",
    category: "dsa",
    readTimeMinutes: 5,
    difficulty: "Fundamental",
    summary: "Clear mental models for lower bound, upper bound, rotated sorted arrays, and binary search on answer space.",
    tags: ["Algorithms", "Binary Search", "Divide & Conquer"],
    lastUpdated: "Updated 1 week ago",
    tlDr: "Always use `mid = left + Math.floor((right - left) / 2)` to prevent 32-bit integer overflow. Determine your search space invariant (inclusive [left, right] vs half-open [left, right)) and stick to it strictly.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    coreConcepts: [
      {
        heading: "The Standard Inclusive Invariant [left, right]",
        explanation: "Keep left = 0, right = arr.length - 1. Loop `while (left <= right)`. When discarding mid, do `left = mid + 1` or `right = mid - 1`.",
        bulletPoints: [
          "Loop condition: `while (left <= right)`",
          "Calculated mid: `const mid = Math.floor(left + (right - left) / 2)`",
          "Boundary step: `left = mid + 1` or `right = mid - 1`",
          "Search on Answer Space: Often questions don't give a sorted array (e.g. 'Minimum capacity of ship to deliver packages within D days'). The answer capacity itself is sorted (between max(weights) and sum(weights))!"
        ]
      }
    ],
    codeExamples: [
      {
        language: "typescript",
        title: "Finding First Occurrence (Lower Bound)",
        code: `function findFirstOccurrence(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      result = mid;       // Found a match, but keep searching left for earlier occurrence
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}`,
        explanation: "When nums[mid] === target, instead of stopping, record the index and pull the right boundary to mid - 1."
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Writing (left + right) / 2.",
        realityOrSolution: "In languages like Java/C++/Go with bounded 32-bit integers, this overflows if left + right > 2^31 - 1. Always use left + (right - left) / 2."
      }
    ]
  },
  {
    id: "dsa-03",
    slug: "graph-traversal-bfs-dfs-union-find",
    title: "Graph Traversal: BFS vs DFS vs Disjoint Set (Union-Find)",
    category: "dsa",
    readTimeMinutes: 7,
    difficulty: "High-Yield",
    summary: "Instant decision tree: When to reach for BFS (shortest path in unweighted graphs), DFS (backtracking/components), or Union-Find (dynamic connectivity).",
    tags: ["Graphs", "BFS", "DFS", "Union-Find"],
    lastUpdated: "Updated 3 days ago",
    tlDr: "BFS = Queue = Level by level = Guaranteed shortest path in unweighted graphs. DFS = Stack/Recursion = Exhaustive search/cycles/topological sort. Union-Find = Disjoint sets = Near O(1) cycle detection in undirected graphs.",
    timeComplexity: "BFS/DFS: O(V + E) | Union-Find with path compression: O(α(N)) ≈ O(1)",
    spaceComplexity: "O(V) for visited set / queue",
    coreConcepts: [
      {
        heading: "Decision Matrix",
        explanation: "How to instantly pick the right algorithm in an interview:",
        bulletPoints: [
          "Shortest path in unweighted grid or network -> BFS with a Queue.",
          "Check for cycles in directed graph / Course Schedule -> Topological Sort (Kahn's BFS or DFS with 3 states: 0=unvisited, 1=visiting, 2=visited).",
          "Connecting nodes dynamically / Kruskal's MST -> Union-Find (Disjoint Set).",
          "Shortest path in weighted graph -> Dijkstra with Min-Heap."
        ]
      }
    ],
    codeExamples: [
      {
        language: "typescript",
        title: "Disjoint Set Union (DSU) with Path Compression & Rank",
        code: `class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      // Path compression: flatten the tree
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already connected! (Cycle detected)

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}`
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Using BFS on a weighted graph to find shortest path.",
        realityOrSolution: "BFS only guarantees shortest path when all edge weights are identical (unweighted). For non-negative weights, use Dijkstra's Algorithm."
      }
    ]
  }
];
