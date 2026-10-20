import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const variantStyles = {
    default: "bg-input text-sub border border-line",
    accent: "bg-accent-subtle text-accent border border-accent/20 font-medium",
    success: "bg-success-subtle text-success border border-success/20 font-medium",
    warning: "bg-warning-subtle text-warning border border-warning/20 font-medium",
    danger: "bg-danger-subtle text-danger border border-danger/20 font-medium",
    outline: "bg-transparent text-sub border border-line",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-md tracking-tight ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
