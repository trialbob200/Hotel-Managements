
import React from 'react';
import { FoodCombo } from '../../types';
import { DEFAULT_CURRENCY } from '../../constants.tsx'; // Updated import path
import Card from '../ui/Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface FoodComboCardProps {
  combo: FoodCombo;
  isSelected: boolean;
  onSelect: (comboId: string) => void;
}

const FoodComboCard: React.FC<FoodComboCardProps> = ({ combo, isSelected, onSelect }) => {
  const { getText } = useLanguage();
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-brand-gold shadow-2xl scale-105' : 'hover:shadow-lg'}`}
      onClick={() => onSelect(combo.id)}
    >
      <img src={combo.imageUrl} alt={combo.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold text-brand-midnight-blue mb-1">{combo.name}</h4>
        <p className="text-xs text-brand-dark-gray mb-2 h-10 overflow-hidden">{combo.items.join(', ')}</p>
        <div className="flex justify-between items-center">
          <p className="text-md font-bold text-brand-teal">
            {DEFAULT_CURRENCY}{combo.costPerDay.toLocaleString()} <span className="text-xs font-normal text-brand-dark-gray">/{getText('perDay', 'day')}</span>
          </p>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(combo.id)}
            className="form-checkbox h-5 w-5 text-brand-teal rounded border-brand-gray focus:ring-brand-gold"
          />
        </div>
      </div>
    </Card>
  );
};

export default FoodComboCard;
