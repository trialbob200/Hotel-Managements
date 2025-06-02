
import React, { useState } from 'react';
import { ServiceRequest } from '../../../types';
import { MOCK_SERVICE_REQUESTS } from '../../../constants.tsx'; // Using mock data, updated import
import Button from '../../ui/Button';
import { useNotification } from '../../../contexts/NotificationContext';
import { useLanguage } from '../../../contexts/LanguageContext';

const AdminServiceRequestList: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>(MOCK_SERVICE_REQUESTS);
  const { addNotification } = useNotification();
  const { getText } = useLanguage();

  const handleStatusChange = (requestId: string, newStatus: ServiceRequest['status']) => {
    setRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    addNotification({ message: getText('serviceRequestStatusUpdated', `Request ${requestId} status updated to ${newStatus}.`), type: 'success' });
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const availableStatuses: ServiceRequest['status'][] = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue mb-6">{getText('manageServiceRequestsTitle', 'Manage Service Requests')}</h3>
      
      {requests.length === 0 ? (
        <p className="text-brand-dark-gray">{getText('noServiceRequests', 'No active service requests.')}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-gray">
            <thead className="bg-brand-light-gray">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('requestIdHeader', 'Req ID')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('guestNameHeader', 'Guest')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('roomHeader', 'Room')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('requestTypeHeader', 'Type')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('detailsHeader', 'Details')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('statusHeader', 'Status')}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-brand-dark-gray uppercase tracking-wider">{getText('actionsHeader', 'Actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-brand-white divide-y divide-brand-light-gray">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-brand-light-gray/50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{req.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-midnight-blue font-medium">{req.userName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{req.roomId || 'N/A'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-brand-dark-gray">{req.requestType}</td>
                  <td className="px-4 py-3 text-sm text-brand-dark-gray max-w-xs truncate" title={req.details}>{req.details}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(req.status)}`}>
                      {getText(`serviceStatus${req.status.replace(/\s/g, '')}`, req.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <select 
                        value={req.status} 
                        onChange={(e) => handleStatusChange(req.id, e.target.value as ServiceRequest['status'])}
                        className={`text-xs p-1 rounded border ${getStatusColor(req.status).replace('text-', 'border-').replace('bg-', 'border-')} focus:outline-none focus:ring-1 focus:ring-brand-teal`}
                    >
                        {availableStatuses.map(status => (
                            <option key={status} value={status}>{getText(`serviceStatus${status.replace(/\s/g, '')}`, status)}</option>
                        ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminServiceRequestList;
