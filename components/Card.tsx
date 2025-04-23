import React, { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string; // Add a href prop for linking
}

const Card = ({ children, className = "", href }: CardProps) => {
  const cardContent = (
    <div
      className={`rounded-2xl bg-[#111111] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-white/10 ${className}`}
    >
      {children}
    </div>
  );

  return href ? (
    <Link href={href}>
      {/* Use the 'as' prop to ensure correct rendering */}
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

export default Card;