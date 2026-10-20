import { RevisionNote } from "@/types";

export const frontendNotes: RevisionNote[] = [
  {
    id: "fe-01",
    slug: "javascript-event-loop-and-microtasks",
    title: "JavaScript Event Loop: Call Stack, Microtasks & Macrotasks",
    category: "frontend",
    readTimeMinutes: 5,
    difficulty: "High-Yield",
    summary: "Visualizing execution order: why Promise.then runs before setTimeout(0), when requestAnimationFrame executes, and how the call stack interacts with Web APIs.",
    tags: ["JavaScript", "Event Loop", "Microtasks", "Async"],
    lastUpdated: "Updated 1 day ago",
    tlDr: "Call Stack executes synchronous code to completion. Once empty, the engine drains the entire Microtask Queue (Promises, queueMicrotask, MutationObserver) until empty. Then, ONE Macrotask (setTimeout, setInterval, I/O) is processed. Rinse and repeat.",
    coreConcepts: [
      {
        heading: "The Precise Execution Priority Hierarchy",
        explanation: "When synchronous script finishes, JavaScript processes queues in this exact order:",
        bulletPoints: [
          "1. Synchronous Call Stack: Runs immediately until empty.",
          "2. Microtask Queue: ALL pending microtasks are drained in a loop (including any microtasks queued by other microtasks!).",
          "3. Render Phase (if browser frame is due): requestAnimationFrame callbacks, then Style, Layout, and Paint.",
          "4. Macrotask Queue (Task Queue): Exactly ONE task is dequeued and run, followed immediately by draining microtasks again."
        ]
      }
    ],
    codeExamples: [
      {
        language: "javascript",
        title: "The Classic Interview Output Puzzle",
        code: `console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

new Promise((resolve) => {
  console.log('4'); // Synchronous executor!
  resolve();
}).then(() => {
  console.log('5');
}).then(() => {
  console.log('6');
});

console.log('7');

// Expected Output:
// 1
// 4
// 7
// 5
// 6
// 2
// 3`,
        explanation: "1, 4, 7 are synchronous. 5 and 6 are microtasks executed right after stack clear. 2 is the macrotask, and 3 is a microtask spawned inside the macrotask."
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Thinking setTimeout(fn, 0) runs immediately after 0 milliseconds.",
        realityOrSolution: "0ms simply means the timer is immediately ready to be placed on the Macrotask queue. It must still wait for all synchronous code and all microtasks to finish executing first."
      },
      {
        mythOrTrap: "Believing code inside new Promise((resolve) => {...}) is asynchronous.",
        realityOrSolution: "The executor function passed to `new Promise` executes synchronously immediately!"
      }
    ]
  },
  {
    id: "fe-02",
    slug: "react-internals-fiber-and-reconciliation",
    title: "React Internals: Fiber Architecture, Virtual DOM & Rerender Triggers",
    category: "frontend",
    readTimeMinutes: 7,
    difficulty: "Fundamental",
    summary: "How Fiber enables interruptible rendering, the difference between Render phase and Commit phase, and why state setters don't update state synchronously.",
    tags: ["React", "Fiber", "Reconciliation", "Hooks"],
    lastUpdated: "Updated 3 days ago",
    tlDr: "React Fiber replaced the recursive Stack Reconciler with a linked-list work loop. Work is split into units of work. Render phase is pure, asynchronous, and interruptible. Commit phase is synchronous and mutates the actual DOM.",
    coreConcepts: [
      {
        heading: "1. The Two Phases of React",
        explanation: "Understanding what happens when `setState` is called:",
        bulletPoints: [
          "Render Phase: React traverses the Fiber tree, calls your component functions, computes differences (diffing). This phase can be paused, restarted, or discarded by Concurrent React (e.g. useTransition).",
          "Commit Phase: React takes the computed changes and updates the DOM in one synchronous sweep (componentDidMount, useLayoutEffect, useEffect)."
        ]
      },
      {
        heading: "2. Why Do Components Re-render?",
        explanation: "Only 3 triggers cause a React component to re-render:",
        bulletPoints: [
          "1. State change inside the component (via useState or useReducer).",
          "2. Parent component re-renders (unless wrapped in React.memo).",
          "3. Consumed Context value changes."
        ]
      }
    ],
    tradeOffs: [
      {
        optionA: "useMemo / useCallback",
        optionB: "Plain functions / Inline objects",
        whenToUseA: "Passing functions/objects to memoized children (React.memo), or expensive O(N²) calculations.",
        whenToUseB: "Simple calculations (e.g. string formatting). Memory allocation and dependency comparison of useMemo can cost more than the re-creation itself!"
      }
    ],
    interviewTraps: [
      {
        mythOrTrap: "Thinking that props changing is what triggers a re-render.",
        realityOrSolution: "In reality, when a parent re-renders, all child components re-render by default regardless of whether their props changed or stayed identical (unless React.memo is applied)."
      }
    ]
  }
];
