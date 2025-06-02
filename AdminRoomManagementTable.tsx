
import React, { useState } from 'react';
import { RoomType, RoomStatus } from '../../../types';
import { MOCK_ROOM_TYPES, DEFAULT_CURRENCY } from '../../../constants.tsx'; // Using mock data directly for demo, updated import
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { useNotification } from '../../../contexts/NotificationContext';
import { useLanguage } from '../../../contexts/LanguageContext';

// Placeholder Icons
const EditIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);
const DeleteIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.096 3.222.261m3.222.261L12 5.291M12 5.291A23.851 23.851 0 0112 3c2.485 0 4.846.34 7.037.963M12 5.291c-2.485 0-4.846.34-7.037.963" />
  </svg>
);
const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);


const initialRoomFormState: Omit<RoomType, 'id' | 'status'> & { id?: string } = {
    name: '', costPerNight: 0, description: '', features: [], imageUrl: '', beds: 1, capacity: 1,
};

const AdminRoomManagementTable: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>(MOCK_ROOM_TYPES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<Partial<RoomType> & { features: string[] }>( // Adjusted type for form flexibility
    { ...initialRoomFormState, features: [] } 
  );
  const [isEditing, setIsEditing] = useState(false);
  const { addNotification } = useNotification();
  const { getText } = useLanguage();


  const handleOpenModal = (room?: RoomType) => {
    if (room) {
      setCurrentRoom({...room, features: room.features || []}); // Ensure features is an array
      setIsEditing(true);
    } else {
      setCurrentRoom({ ...initialRoomFormState, status: RoomStatus.Vacant, features: [] }); // Ensure status and features are set
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRoom({ ...initialRoomFormState, features: [] }); // Reset form
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "features") {
        setCurrentRoom(prev => ({ ...prev, features: value.split(',').map(f => f.trim()) }));
    } else if (name === "costPerNight" || name === "beds" || name === "capacity") {
        setCurrentRoom(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
        setCurrentRoom(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields from currentRoom, as it's Partial<RoomType>
    if (!currentRoom.name || currentRoom.costPerNight == null || !currentRoom.description || currentRoom.beds == null || currentRoom.capacity == null ) {
        addNotification({ message: getText('fillRequiredFields', 'Please fill all required fields for the room.'), type: 'error'});
        return;
    }

    if (isEditing && currentRoom.id) {
      setRooms(rooms.map(r => r.id === currentRoom.id ? { ...(currentRoom as RoomType) } : r)); // currentRoom should be RoomType by now
      addNotification({ message: getText('roomUpdatedSuccess', `Room "${currentRoom.name}" updated successfully!`), type: 'success' });
    } else {
      const newRoom: RoomType = { 
        ...initialRoomFormState, // provides defaults for any potentially missing optional fields in RoomType
        ...(currentRoom as Omit<RoomType, 'id'>), // Cast currentRoom to exclude id for new room
        id: `room-${Date.now()}`, 
        status: currentRoom.status || RoomStatus.Vacant, // Default to Vacant if not set
        features: currentRoom.features || [] // Ensure features is an array
      };
      setRooms([...rooms, newRoom]);
      addNotification({ message: getText('roomAddedSuccess', `Room "${newRoom.name}" added successfully!`), type: 'success' });
    }
    handleCloseModal();
  };

  const handleDeleteRoom = (roomId: string) => {
    if (window.confirm(getText('confirmDeleteRoom', 'Are you sure you want to delete this room? This action cannot be undone.'))) {
      setRooms(rooms.filter(r => r.id !== roomId));
      addNotification({ message: getText('roomDeletedSuccess', 'Room deleted successfully!'), type: 'info' });
    }
  };
  
  const roomStatusOptions = Object.values(RoomStatus);


  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-brand-midnight-blue">{getText('manageRoomsTitle', 'Manage Rooms')}</h3>
        <Button onClick={() => handleOpenModal()} variant="primary" leftIcon={<PlusIcon className="mr-1" />}>
          {getText('addNewRoomButton', 'Add New Room')}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-brand-gray">
          <thead className="bg-brand-light-gray">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('roomNameHeader', 'Name')}</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('roomCostHeader', 'Cost/Night')}</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('roomStatusHeader', 'Status')}</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('roomCapacityHeader', 'Capacity')}</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('actionsHeader', 'Actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-brand-white divide-y divide-brand-light-gray">
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-brand-light-gray/50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-brand-midnight-blue">{room.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{DEFAULT_CURRENCY}{room.costPerNight.toLocaleString()}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        room.status === RoomStatus.Vacant ? 'bg-green-100 text-green-800' :
                        room.status === RoomStatus.Booked ? 'bg-red-100 text-red-800' :
                        room.status === RoomStatus.Maintenance ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                        {getText(`roomStatus${room.status}`, room.status)}
                    </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{room.capacity}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenModal(room)} aria-label="Edit room">
                    <EditIcon className="text-brand-teal hover:text-brand-teal-dark" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteRoom(room.id)} aria-label="Delete room">
                    <DeleteIcon className="text-red-500 hover:text-red-700" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditing ? getText('editRoomModalTitle', 'Edit Room') : getText('addRoomModalTitle', 'Add New Room')} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label={getText('roomNameLabel', "Room Name")} name="name" value={currentRoom.name || ''} onChange={handleChange} required />
          <Input label={getText('costPerNightLabel', "Cost Per Night")} name="costPerNight" type="number" value={(currentRoom.costPerNight || 0).toString()} onChange={handleChange} required />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-brand-midnight-blue mb-1">{getText('descriptionLabel', 'Description')}</label>
            <textarea id="description" name="description" value={currentRoom.description || ''} onChange={handleChange} rows={3} className="block w-full px-3 py-2 rounded-lg border border-brand-gray text-brand-dark-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal" required />
          </div>
          <Input label={getText('featuresLabel', "Features (comma-separated)")} name="features" value={currentRoom.features ? currentRoom.features.join(', ') : ''} onChange={handleChange} />
          <Input label={getText('imageUrlLabel', "Image URL")} name="imageUrl" value={currentRoom.imageUrl || ''} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Input label={getText('bedsLabel', "Beds")} name="beds" type="number" value={(currentRoom.beds || 0).toString()} onChange={handleChange} required />
            <Input label={getText('capacityLabel', "Capacity")} name="capacity" type="number" value={(currentRoom.capacity || 0).toString()} onChange={handleChange} required />
          </div>
           <div>
                <label htmlFor="status" className="block text-sm font-medium text-brand-midnight-blue mb-1">{getText('statusLabel', 'Status')}</label>
                <select
                    id="status"
                    name="status"
                    value={currentRoom.status || RoomStatus.Vacant}
                    onChange={handleChange}
                    className="block w-full px-3 py-2.5 rounded-lg border border-brand-gray text-brand-dark-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
                    required
                >
                    {roomStatusOptions.map(status => (
                        <option key={status} value={status}>{getText(`roomStatus${status}`, status)}</option>
                    ))}
                </select>
            </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={handleCloseModal}>{getText('cancelButton', 'Cancel')}</Button>
            <Button type="submit" variant="primary">{isEditing ? getText('saveChangesButton', 'Save Changes') : getText('addRoomButton', 'Add Room')}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminRoomManagementTable;
