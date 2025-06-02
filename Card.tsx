
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  const hoverStyles = hoverEffect ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out' : '';
  return (
    <div
      className={`bg-brand-white rounded-xl shadow-lg overflow-hidden ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
