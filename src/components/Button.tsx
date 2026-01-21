import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const Button = ({ children, variant = "primary", className, ...props }: ButtonProps) => {
  const styles = {
    primary:
      "bg-accent text-neutral-900 shadow-lg shadow-accent/30 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40",
    secondary:
      "bg-secondary text-soft-white border border-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10",
    ghost:
      "bg-transparent text-soft-white border border-white/20 hover:border-accent/40 hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
  };

  return (
    <button
      className={`btn ${styles[variant]} ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
