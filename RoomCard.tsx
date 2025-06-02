
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomType, RoomStatus } from '../../types';
import { DEFAULT_CURRENCY, BedIcon, FanIcon, TvIcon, WifiIcon, JacuzziIcon, BalconyIcon, AirConIcon } from '../../constants.tsx'; // Updated import path
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';

interface RoomCardProps {
  room: RoomType;
}

const getStatusColor = (status: RoomStatus) => {
  switch (status) {
    case RoomStatus.Vacant: return 'bg-green-100 text-green-700 border-green-400';
    case RoomStatus.Booked: return 'bg-red-100 text-red-700 border-red-400';
    case RoomStatus.Maintenance: return 'bg-yellow-100 text-yellow-700 border-yellow-400';
    default: return 'bg-gray-100 text-gray-700 border-gray-400';
  }
};

const FeatureIcon: React.FC<{ feature: string }> = ({ feature }) => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('bed')) return <BedIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('fan')) return <FanIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('tv')) return <TvIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('wi-fi') || lowerFeature.includes('wifi')) return <WifiIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('jacuzzi')) return <JacuzziIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('balcony')) return <BalconyIcon className="w-5 h-5 text-brand-teal mr-2" />;
    if (lowerFeature.includes('ac') || lowerFeature.includes('air conditioning')) return <AirConIcon className="w-5 h-5 text-brand-teal mr-2" />;
    return null;
};


const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();
  const { getText } = useLanguage();

  const handleBookNow = () => {
    navigate(`/book/${room.id}`);
  };

  return (
    <Card className="flex flex-col h-full" hoverEffect={true}>
      <div className="relative">
        <img src={room.imageUrl} alt={room.name} className="w-full h-56 object-cover" />
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(room.status)}`}>
          {getText(`roomStatus${room.status}`, room.status)}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-brand-midnight-blue mb-2">{room.name}</h3>
        <p className="text-sm text-brand-dark-gray mb-3 flex-grow">{room.description}</p>
        
        <div className="mb-3">
            <h4 className="text-sm font-medium text-brand-midnight-blue mb-1">{getText('roomFeatures', 'Features')}:</h4>
            <ul className="space-y-1 text-xs text-brand-dark-gray">
            {room.features.slice(0, 3).map((feature) => ( // Show only first 3 features for brevity
                <li key={feature} className="flex items-center">
                <FeatureIcon feature={feature} />
                {feature}
                </li>
            ))}
            {room.features.length > 3 && <li className="text-xs text-brand-teal">...and more</li>}
            </ul>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-brand-light-gray">
          <p className="text-lg font-bold text-brand-teal">
            {DEFAULT_CURRENCY}{room.costPerNight.toLocaleString()} <span className="text-xs font-normal text-brand-dark-gray">/{getText('perNight', 'night')}</span>
          </p>
          <Button 
            onClick={handleBookNow} 
            size="sm" 
            variant="primary"
            disabled={room.status !== RoomStatus.Vacant}
            className={room.status !== RoomStatus.Vacant ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {room.status === RoomStatus.Vacant ? getText('bookNow', 'Book Now') : getText('unavailable', 'Unavailable')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;
