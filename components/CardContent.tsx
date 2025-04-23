import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export default CardContent;