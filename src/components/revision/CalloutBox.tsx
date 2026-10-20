import React from "react";
import { Lightbulb, AlertTriangle, ShieldAlert, GitCompare } from "lucide-react";

interface CalloutBoxProps {
  type: "tip" | "trap" | "warning" | "tradeoff";
  title?: string;
  children: React.ReactNode;
}

export function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const configs = {
    tip: {
      icon: <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />,
      border: "border-accent/30",
      bg: "bg-accent-subtle/50",
      defaultTitle: "High-Yield Pro Tip",
      titleColor: "text-accent",
    },
    trap: {
      icon: <ShieldAlert className="w-5 h-5 text-danger shrink-0 mt-0.5" />,
      border: "border-danger/30",
      bg: "bg-danger-subtle/40",
      defaultTitle: "Common Interview Trap (Don't Say This)",
      titleColor: "text-danger",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />,
      border: "border-warning/30",
      bg: "bg-warning-subtle/40",
      defaultTitle: "Watch Out: Crucial Edge Case",
      titleColor: "text-warning",
    },
    tradeoff: {
      icon: <GitCompare className="w-5 h-5 text-accent shrink-0 mt-0.5" />,
      border: "border-line-strong",
      bg: "bg-input/60",
      defaultTitle: "System Trade-off",
      titleColor: "text-main",
    },
  };

  const config = configs[type];

  return (
    <div className={`p-4 rounded-xl border ${config.border} ${config.bg} my-4 transition-all`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="space-y-1 text-sm flex-1">
          <h4 className={`font-semibold tracking-tight ${config.titleColor}`}>
            {title || config.defaultTitle}
          </h4>
          <div className="text-sub leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
