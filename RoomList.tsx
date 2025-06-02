
import React from 'react';
import { RoomType } from '../../types';
import RoomCard from './RoomCard';

interface RoomListProps {
  rooms: RoomType[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  if (rooms.length === 0) {
    return <p className="text-center text-brand-dark-gray">No rooms available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
