
import React, { useState } from 'react';
import { Complaint } from '../../../types';
import { MOCK_COMPLAINTS } from '../../../constants.tsx'; // Using mock data, updated import
import Button from '../../ui/Button';
import { useNotification } from '../../../contexts/NotificationContext';
import { useLanguage } from '../../../contexts/LanguageContext';

// Placeholder Icon
const ChatBubbleLeftEllipsisIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-3.862 8.25-8.625 8.25S3.75 16.556 3.75 12C3.75 7.444 7.612 3.75 12.375 3.75S21 7.444 21 12z" />
  </svg>
);


const AdminRefundComplaints: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const { addNotification } = useNotification();
  const { getText } = useLanguage();

  const handleStatusChange = (complaintId: string, newStatus: Complaint['status']) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(c =>
        c.id === complaintId ? { ...c, status: newStatus } : c
      )
    );
    addNotification({ message: getText('complaintStatusUpdated', `Complaint ${complaintId} status updated to ${newStatus}.`), type: 'success' });
  };
  
  const availableStatuses: Complaint['status'][] = ['Open', 'Resolved', 'Closed'];
  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'Open': return 'text-orange-600 bg-orange-100';
      case 'Resolved': return 'text-blue-600 bg-blue-100';
      case 'Closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };


  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue mb-6">{getText('refundComplaintsTitle', 'Refunds & Complaints Management')}</h3>
      
      {complaints.length === 0 ? (
        <p className="text-brand-dark-gray">{getText('noComplaintsFound', 'No complaints or refund requests found.')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-gray">
            <thead className="bg-brand-light-gray">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('complaintIdHeader', 'ID')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('guestNameHeader', 'Guest')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('bookingIdHeader', 'Booking ID')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('complaintTextHeader', 'Complaint')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('submittedAtHeader', 'Submitted')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('statusHeader', 'Status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('actionsHeader', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-brand-white divide-y divide-brand-light-gray">
              {complaints.map(c => (
                <tr key={c.id} className="hover:bg-brand-light-gray/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{c.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-midnight-blue font-medium">{c.userName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{c.bookingId || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-brand-dark-gray max-w-sm truncate" title={c.complaintText}>{c.complaintText}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{new Date(c.submittedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(c.status)}`}>
                      {getText(`complaintStatus${c.status}`, c.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                     <select 
                        value={c.status} 
                        onChange={(e) => handleStatusChange(c.id, e.target.value as Complaint['status'])}
                        className={`text-xs p-1 rounded border ${getStatusColor(c.status).replace('text-', 'border-').replace('bg-', 'border-')} focus:outline-none focus:ring-1 focus:ring-brand-teal`}
                    >
                        {availableStatuses.map(status => (
                            <option key={status} value={status}>{getText(`complaintStatus${status}`, status)}</option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-6 text-xs text-brand-gray">
        {getText('refundComplaintsNote', 'Simplified view. Full system would include refund processing, communication logs, etc.')}
      </p>
    </div>
  );
};

export default AdminRefundComplaints;
