
import React from 'react';
import { AdditionalService } from '../../types';
import { DEFAULT_CURRENCY } from '../../constants.tsx'; // Updated import path
import { useLanguage } from '../../contexts/LanguageContext';

interface ServiceItemProps {
  service: AdditionalService;
  isSelected: boolean;
  onSelect: (serviceId: string) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, isSelected, onSelect }) => {
  const { getText } = useLanguage();
  return (
    <div 
      className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer transition-all duration-200 ${isSelected ? 'bg-brand-teal/10 border-brand-teal ring-2 ring-brand-teal' : 'bg-brand-white border-brand-gray hover:border-brand-teal-dark'}`}
      onClick={() => onSelect(service.id)}
    >
      <div className="flex items-center">
        {service.icon && <span className="text-brand-teal mr-3">{React.cloneElement(service.icon, { className: "w-6 h-6" })}</span>}
        <div>
            <h5 className="font-semibold text-brand-midnight-blue">{service.name}</h5>
            {service.description && <p className="text-xs text-brand-dark-gray">{service.description}</p>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-sm font-medium text-brand-teal">
          {DEFAULT_CURRENCY}{service.cost.toLocaleString()} <span className="text-xs text-brand-dark-gray">/{service.unit === 'per day' ? getText('perDay', 'day') : service.unit}</span>
        </p>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(service.id)}
          className="form-checkbox h-5 w-5 text-brand-teal rounded border-brand-gray focus:ring-brand-gold"
        />
      </div>
    </div>
  );
};

export default ServiceItem;
