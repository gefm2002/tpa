import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

const Button = ({ children, variant = "primary", className, ...props }: ButtonProps) => {
  const styles = {
    primary: "bg-accent text-neutral-900 shadow-lg shadow-accent/20",
    secondary: "bg-secondary text-soft-white border border-white/10",
    ghost: "bg-transparent text-soft-white border border-white/20",
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
