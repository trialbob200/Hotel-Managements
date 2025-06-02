
import React from 'react';
import { StaffMember } from '../../../types';
import { MOCK_STAFF } from '../../../constants.tsx'; // Updated import
import Card from '../../ui/Card';
import { useLanguage } from '../../../contexts/LanguageContext';

// Placeholder Icon
const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-3.741-5.192M15 15a3 3 0 11-6 0 3 3 0 016 0zm6 3a9 9 0 11-18 0 9 9 0 0118 0zM12.75 12.75A3.75 3.75 0 1115 9.375a3.75 3.75 0 01-2.25 3.375zM9 15a3.75 3.75 0 11-3.75-3.75A3.75 3.75 0 019 15zm0 0V6.375m0 8.625a3.75 3.75 0 110-7.5 3.75 3.75 0 010 7.5z" />
  </svg>
);


const AdminStaffScheduling: React.FC = () => {
  const staff: StaffMember[] = MOCK_STAFF; // Using mock data
  const { getText } = useLanguage();

  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue mb-6">{getText('staffSchedulingTitle', 'Staff Scheduling')}</h3>
      {staff.length === 0 ? (
        <p className="text-brand-dark-gray">{getText('noStaffToList', 'No staff members to display.')}</p>
      ) : (
        <div className="space-y-4">
          {staff.map(member => (
            <Card key={member.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <UserGroupIcon className="w-8 h-8 text-brand-teal mr-4" />
                <div>
                  <p className="text-md font-semibold text-brand-midnight-blue">{member.name}</p>
                  <p className="text-sm text-brand-dark-gray">{member.role}</p>
                </div>
              </div>
              <p className="text-sm text-brand-teal font-medium">{member.schedule}</p>
              {/* In a real app, add edit/delete buttons and modal for schedule changes */}
            </Card>
          ))}
        </div>
      )}
      <p className="mt-6 text-xs text-brand-gray">
        {getText('staffSchedulingNote', 'This is a simplified view. Full staff management would include shift assignments, leave requests, etc.')}
      </p>
    </div>
  );
};

export default AdminStaffScheduling;
