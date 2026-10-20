"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
}

export function CodeSnippet({
  code,
  language = "typescript",
  title,
  explanation,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="my-5 rounded-xl border border-code-border bg-code-bg overflow-hidden shadow-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-code-border bg-black/20 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-code-text font-medium">
            {title || `${language} snippet`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-code-text/80 font-mono">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-code-text transition-colors text-xs"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-success" />
                <span className="text-success font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs leading-relaxed text-code-text">
          <code>{code.trim()}</code>
        </pre>
      </div>

      {/* Optional Explanation footer */}
      {explanation && (
        <div className="px-4 py-2 border-t border-code-border/50 bg-black/10 text-xs text-code-text/80">
          <span className="font-semibold text-accent">Key Insight: </span>
          {explanation}
        </div>
      )}
    </div>
  );
}
