
import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useNotification } from '../../../contexts/NotificationContext';
import { useLanguage } from '../../../contexts/LanguageContext';

interface GuestServiceRequestProps {
    currentBookingId?: string; // To associate request with a booking
}

const GuestServiceRequest: React.FC<GuestServiceRequestProps> = ({ currentBookingId }) => {
  const [requestType, setRequestType] = useState('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();
  const { getText } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestType || !details) {
      addNotification({ message: getText('serviceRequestValidation', 'Please select a request type and provide details.'), type: 'error' });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      addNotification({ message: getText('serviceRequestSuccess', 'Service request submitted successfully!'), type: 'success' });
      setRequestType('');
      setDetails('');
      // In a real app, you'd send this to a backend and update a list of requests
      console.log({
        bookingId: currentBookingId,
        requestType,
        details,
        timestamp: new Date().toISOString(),
      });
    }, 1500);
  };

  const serviceTypes = [
    { value: 'Food', label: getText('serviceTypeFood', 'Food Order') },
    { value: 'Room Service', label: getText('serviceTypeRoomService', 'Room Service') },
    { value: 'Laundry', label: getText('serviceTypeLaundry', 'Laundry') },
    { value: 'Pool Access', label: getText('serviceTypePool', 'Pool Access') },
    { value: 'Maintenance', label: getText('serviceTypeMaintenance', 'Maintenance Issue') },
    { value: 'Other', label: getText('serviceTypeOther', 'Other') },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue">{getText('requestNewServiceTitle', 'Request New Service')}</h3>
      
      <div>
        <label htmlFor="requestType" className="block text-sm font-medium text-brand-midnight-blue mb-1">
          {getText('requestTypeLabel', 'Type of Request')}
        </label>
        <select
          id="requestType"
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="block w-full px-3 py-2.5 rounded-lg border border-brand-gray text-brand-dark-gray focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-brand-teal"
          required
        >
          <option value="">{getText('selectRequestTypePlaceholder', '-- Select Request Type --')}</option>
          {serviceTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <Input
        label={getText('requestDetailsLabel', 'Details / Special Instructions')}
        id="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder={getText('requestDetailsPlaceholder', 'e.g., "Need extra towels", "Order 1 Veg Classic Combo"')}
        required
        // @ts-ignore
        as="textarea" // This would ideally be a TextArea component, using Input for now
        rows={4}
        className="h-24" // Approximate textarea height with Input
      />

      <Button type="submit" variant="primary" isLoading={isLoading} className="w-full sm:w-auto">
        {getText('submitRequestButton', 'Submit Request')}
      </Button>
    </form>
  );
};

export default GuestServiceRequest;
