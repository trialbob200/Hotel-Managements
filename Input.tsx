
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  Icon?: React.ElementType;
}

const Input: React.FC<InputProps> = ({ label, id, error, Icon, className, ...props }) => {
  const baseClasses = "block w-full px-4 py-2.5 rounded-lg border text-brand-dark-gray placeholder-brand-gray focus:outline-none focus:ring-2 transition-colors duration-150";
  const borderClasses = error ? "border-red-500 focus:ring-red-400 focus:border-red-500" : "border-brand-gray focus:ring-brand-teal focus:border-brand-teal";
  const iconPadding = Icon ? "pl-10" : "";

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block text-sm font-medium text-brand-midnight-blue mb-1">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`w-5 h-5 ${error ? 'text-red-500' : 'text-brand-gray'}`} />
          </div>
        )}
        <input
          id={id}
          className={`${baseClasses} ${borderClasses} ${iconPadding} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
