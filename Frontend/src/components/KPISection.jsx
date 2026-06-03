import React from 'react';

const KPISection = ({ analytics }) => {
  if (!analytics || Object.keys(analytics).length === 0) return null;

  const KPIs = [
    { label: 'Total Products', value: analytics['Total Products'] },
    { label: 'Average Price', value: analytics['Average Price'] ? `₹${Math.round(analytics['Average Price']).toLocaleString()}` : 'N/A' },
    { label: 'Average Rating', value: analytics['Average Rating'] ? analytics['Average Rating'].toFixed(1) : 'N/A' },
    { label: 'Top Brand', value: analytics['Top Brand'] || 'N/A' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {KPIs.map((kpi, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500 font-medium uppercase">{kpi.label}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-2">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPISection;