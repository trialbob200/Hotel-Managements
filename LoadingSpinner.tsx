
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // e.g. text-brand-teal
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'text-brand-teal', text, className }) => {
  let sizeClasses = '';
  switch (size) {
    case 'sm': sizeClasses = 'w-6 h-6 border-2'; break;
    case 'md': sizeClasses = 'w-10 h-10 border-4'; break;
    case 'lg': sizeClasses = 'w-16 h-16 border-4'; break;
    default: sizeClasses = 'w-10 h-10 border-4';
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses} ${color} border-solid border-t-transparent`}
      ></div>
      {text && <p className={`mt-2 ${color} font-medium`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
