
import React from 'react';
import { RoomType, RoomStatus } from '../../../types';
import { MOCK_ROOM_TYPES } from '../../../constants.tsx'; // Using mock data, updated import
import Card from '../../ui/Card';
import { useLanguage } from '../../../contexts/LanguageContext';

const AdminRoomStatusView: React.FC = () => {
  const rooms: RoomType[] = MOCK_ROOM_TYPES; // In a real app, this would come from state/context
  const { getText } = useLanguage();

  const getStatusIndicatorClass = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.Vacant: return 'bg-green-500';
      case RoomStatus.Booked: return 'bg-red-500';
      case RoomStatus.Maintenance: return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBorderColorClass = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.Vacant: return 'border-l-green-500';
      case RoomStatus.Booked: return 'border-l-red-500';
      case RoomStatus.Maintenance: return 'border-l-yellow-500';
      default: return 'border-l-gray-400';
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue mb-6">{getText('roomStatusOverviewTitle', 'Room Status Overview')}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {rooms.map(room => (
          <Card 
            key={room.id} 
            className={`p-4 text-center border-l-4 ${getStatusBorderColorClass(room.status)} transition-all hover:shadow-md`}
          >
             <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${getStatusIndicatorClass(room.status)}`}></div>
            <p className="text-sm font-medium text-brand-midnight-blue truncate" title={room.name}>{room.name.substring(0,15)}{room.name.length > 15 ? '...' : ''}</p>
            <p className={`text-xs font-semibold ${
                room.status === RoomStatus.Vacant ? 'text-green-600' :
                room.status === RoomStatus.Booked ? 'text-red-600' :
                room.status === RoomStatus.Maintenance ? 'text-yellow-600' : 'text-gray-600'
            }`}>
                {getText(`roomStatus${room.status}`, room.status)}
            </p>
            {/* <p className="text-xs text-brand-dark-gray">ID: {room.id.split('-')[1] || room.id}</p> */}
          </Card>
        ))}
      </div>
       <div className="mt-6 flex flex-wrap gap-4 items-center text-sm">
        <h4 className="font-medium text-brand-midnight-blue">{getText('legendTitle', 'Legend')}:</h4>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span> {getText('roomStatusVacant', RoomStatus.Vacant)}
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span> {getText('roomStatusBooked', RoomStatus.Booked)}
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span> {getText('roomStatusMaintenance', RoomStatus.Maintenance)}
        </div>
      </div>
    </div>
  );
};

export default AdminRoomStatusView;