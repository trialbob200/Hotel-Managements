
import React from 'react';
import { RevenueData } from '../../../types'; // Import RevenueData from types
import { DEFAULT_CURRENCY, MOCK_REVENUE } from '../../../constants.tsx'; // Updated import
import Card from '../../ui/Card';
import { useLanguage } from '../../../contexts/LanguageContext';

interface AdminEarningsChartProps {
  revenue: RevenueData;
}

// Placeholder Icons
const CurrencyRupeeIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9.75L8.25 12H18m-3.75-3.75V4.5m0 15V12m0 0H6.75m9.75 0h3.75M3 12h6.75m3-9v3m0 12v3m0-9h.008v.008H12v-.008zm0 0H9.75m0 0H6.75m0 0H3.375c-.621 0-1.125.504-1.125 1.125V12a1.125 1.125 0 001.125 1.125h3.375m0 0H12m3.75 0h3.375c.621 0 1.125-.504 1.125-1.125V12a1.125 1.125 0 00-1.125-1.125h-3.375M12 9.75V3.75M12 14.25v6" />
  </svg>
);
const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008z" />
  </svg>
);


const AdminEarningsChart: React.FC<AdminEarningsChartProps> = ({ revenue }) => {
  const { getText } = useLanguage();

  const earningsData = [
    { title: getText('dailyRevenue', 'Daily Revenue'), value: revenue.daily, color: 'text-green-500', bgColor: 'bg-green-100', icon: <CurrencyRupeeIcon className="w-8 h-8 text-green-500" /> },
    { title: getText('weeklyRevenue', 'Weekly Revenue'), value: revenue.weekly, color: 'text-blue-500', bgColor: 'bg-blue-100', icon: <CalendarDaysIcon className="w-8 h-8 text-blue-500" /> },
    { title: getText('monthlyRevenue', 'Monthly Revenue'), value: revenue.monthly, color: 'text-purple-500', bgColor: 'bg-purple-100', icon: <CalendarDaysIcon className="w-8 h-8 text-purple-500" /> },
  ];

  // For simple bar chart visualization
  const maxRevenue = Math.max(revenue.daily * 30, revenue.weekly * 4, revenue.monthly) || 1; // Avoid division by zero
  const dailyPercentage = (revenue.daily * 30 / maxRevenue) * 100;
  const weeklyPercentage = (revenue.weekly * 4 / maxRevenue) * 100;
  const monthlyPercentage = (revenue.monthly / maxRevenue) * 100;

  return (
    <div className="p-4 sm:p-6 bg-brand-white rounded-lg shadow">
      <h3 className="text-xl font-semibold text-brand-midnight-blue mb-6">{getText('earningsDashboardTitle', 'Earnings Dashboard')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {earningsData.map(item => (
          <Card key={item.title} className={`p-6 ${item.bgColor} flex items-start`}>
            <div className="mr-4 flex-shrink-0">{item.icon}</div>
            <div>
              <p className={`text-2xl font-bold ${item.color}`}>{DEFAULT_CURRENCY}{item.value.toLocaleString()}</p>
              <p className="text-sm font-medium text-brand-dark-gray">{item.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Simplified Bar Chart Representation */}
      <h4 className="text-lg font-semibold text-brand-midnight-blue mb-4">{getText('comparativeRevenueTitle', 'Comparative Revenue (Normalized)')}</h4>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-brand-dark-gray">{getText('dailyRevenue', 'Daily (x30 for month est.)')}</span>
            <span className="text-sm font-medium text-green-600">{DEFAULT_CURRENCY}{(revenue.daily * 30).toLocaleString()}</span>
          </div>
          <div className="w-full bg-brand-light-gray rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full" style={{ width: `${dailyPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-brand-dark-gray">{getText('weeklyRevenue', 'Weekly (x4 for month est.)')}</span>
            <span className="text-sm font-medium text-blue-600">{DEFAULT_CURRENCY}{(revenue.weekly * 4).toLocaleString()}</span>
          </div>
          <div className="w-full bg-brand-light-gray rounded-full h-4">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${weeklyPercentage}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-brand-dark-gray">{getText('monthlyRevenue', 'Monthly')}</span>
            <span className="text-sm font-medium text-purple-600">{DEFAULT_CURRENCY}{revenue.monthly.toLocaleString()}</span>
          </div>
          <div className="w-full bg-brand-light-gray rounded-full h-4">
            <div className="bg-purple-500 h-4 rounded-full" style={{ width: `${monthlyPercentage}%` }}></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-brand-gray mt-4">{getText('revenueChartNote', '* Normalized monthly estimates for daily and weekly figures are for comparison purposes.')}</p>
    </div>
  );
};

export default AdminEarningsChart;
