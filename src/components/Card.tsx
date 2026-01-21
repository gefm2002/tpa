import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => (
  <div className={`glass-card p-5 ${className ?? ""}`.trim()}>{children}</div>
);

export default Card;
