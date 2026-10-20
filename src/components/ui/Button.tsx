"use client";

/**
 * Reusable Button component with clean, non-bloated styles.
 * 
 * Notice that we use semantic color tokens:
 * - bg-accent hover:bg-accent-hover text-white
 * - bg-card hover:bg-card-hover border-line
 * This ensures light and dark modes work automatically without dark: classes!
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-3.5 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-accent text-white hover:opacity-95 shadow-sm active:scale-[0.98]",
    secondary:
      "bg-input text-main hover:bg-card-hover border border-line active:scale-[0.98]",
    outline:
      "border border-line text-main bg-transparent hover:bg-card-hover active:scale-[0.98]",
    ghost:
      "text-sub hover:text-main hover:bg-card-hover",
    danger:
      "bg-danger text-white hover:opacity-95 active:scale-[0.98]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
