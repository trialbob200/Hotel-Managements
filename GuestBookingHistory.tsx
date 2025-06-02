
import React from 'react';
import { Booking } from '../../../types';
import { DEFAULT_CURRENCY } from '../../../constants.tsx'; // Updated import path
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useLanguage } from '../../../contexts/LanguageContext'; // Assuming this context exists

interface GuestBookingHistoryProps {
  bookings: Booking[];
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


const GuestBookingHistory: React.FC<GuestBookingHistoryProps> = ({ bookings }) => {
  const { getText } = useLanguage();

  const handleDownloadInvoice = (bookingId: string) => {
    // Mock download
    alert(`Invoice for booking ${bookingId} would be downloaded here.`);
  };

  if (!bookings || bookings.length === 0) {
    return <p className="text-brand-dark-gray">{getText('noBookingsFound', 'No bookings found.')}</p>;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-lg font-semibold text-brand-midnight-blue">{booking.roomName}</h4>
              <p className="text-sm text-brand-dark-gray">{getText('bookingIdLabel', 'Booking ID')}: {booking.id}</p>
              <p className={`text-sm font-medium mt-1 ${
                booking.status === 'Confirmed' ? 'text-green-600' : 
                booking.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {getText('statusLabel', 'Status')}: {getText(`bookingStatus${booking.status}`, booking.status)}
              </p>
            </div>
            <div>
              <p className="text-sm text-brand-dark-gray">
                <span className="font-medium">{getText('checkInLabel', 'Check-in')}:</span> {new Date(booking.checkInDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-brand-dark-gray">
                <span className="font-medium">{getText('checkOutLabel', 'Check-out')}:</span> {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-brand-dark-gray">
                <span className="font-medium">{getText('guestsLabel', 'Guests')}:</span> {booking.guests}
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-xl font-bold text-brand-teal">{DEFAULT_CURRENCY}{booking.totalCost.toLocaleString()}</p>
              {booking.status === 'Confirmed' && booking.invoiceUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => handleDownloadInvoice(booking.id)}
                  leftIcon={<DownloadIcon />}
                >
                  {getText('downloadInvoice', 'Invoice')}
                </Button>
              )}
            </div>
          </div>
          {(booking.foodCombos.length > 0 || booking.additionalServices.length > 0) && (
            <div className="mt-4 pt-4 border-t border-brand-light-gray">
              {booking.foodCombos.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-brand-midnight-blue">{getText('foodCombosLabel', 'Food Combos')}:</p>
                  <ul className="list-disc list-inside ml-2">
                    {booking.foodCombos.map(fc => <li key={fc.id} className="text-xs text-brand-dark-gray">{fc.name}</li>)}
                  </ul>
                </div>
              )}
              {booking.additionalServices.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-brand-midnight-blue">{getText('additionalServicesLabel', 'Additional Services')}:</p>
                   <ul className="list-disc list-inside ml-2">
                    {booking.additionalServices.map(as => <li key={as.id} className="text-xs text-brand-dark-gray">{as.name}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default GuestBookingHistory;
