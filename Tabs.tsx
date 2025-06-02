
import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0, className }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={`w-full ${className}`}>
      <div className="border-b border-brand-gray">
        <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveIndex(index)}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm sm:text-base flex items-center
                ${activeIndex === index
                  ? 'border-brand-teal text-brand-teal'
                  : 'border-transparent text-brand-dark-gray hover:text-brand-midnight-blue hover:border-brand-gray'
                } transition-colors duration-150 focus:outline-none`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-5">
        {tabs[activeIndex] && tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
