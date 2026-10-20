import React from "react";
import { Clock, HardDrive } from "lucide-react";

interface ComplexityBadgeProps {
  type: "time" | "space";
  value: string;
}

export function ComplexityBadge({ type, value }: ComplexityBadgeProps) {
  const isTime = type === "time";
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-input border border-line text-xs font-mono">
      {isTime ? (
        <Clock className="w-3.5 h-3.5 text-accent" />
      ) : (
        <HardDrive className="w-3.5 h-3.5 text-accent" />
      )}
      <span className="text-subtle text-xs font-sans font-medium">
        {isTime ? "Time:" : "Space:"}
      </span>
      <span className="text-main font-semibold">{value}</span>
    </div>
  );
}
