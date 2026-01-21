import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "accent" | "neutral" | "outline";
}

const Badge = ({ children, variant = "neutral" }: BadgeProps) => {
  const styles = {
    accent: "bg-accent/15 text-accent border border-accent/40",
    neutral: "bg-neutral-700/60 text-soft-white border border-white/10",
    outline: "bg-transparent text-soft-white border border-white/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
