
import React from 'react';
import Modal from '../../ui/Modal';
import { useLanguage } from '../../../contexts/LanguageContext';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl?: string; // Could be a real URL or data URI
  bookingId?: string;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, qrCodeUrl, bookingId }) => {
  const { getText } = useLanguage();
  // Using a placeholder QR code image if no URL is provided
  const displayQrCodeUrl = qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=BookingID:${bookingId || 'DEMO123'}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getText('qrCodeModalTitle', 'Your Check-in QR Code')} size="sm">
      <div className="text-center">
        <p className="text-brand-dark-gray mb-4">
          {getText('qrCodeModalInstructions', 'Present this QR code at the reception for a quick and easy check-in.')}
        </p>
        <img 
          src={displayQrCodeUrl} 
          alt={getText('qrCodeAltText', 'Booking QR Code')}
          className="mx-auto w-64 h-64 border border-brand-gray p-2 rounded-lg" 
        />
        {bookingId && <p className="mt-3 text-sm text-brand-dark-gray">{getText('bookingIdLabel', 'Booking ID')}: {bookingId}</p>}
      </div>
    </Modal>
  );
};

export default QRCodeModal;
