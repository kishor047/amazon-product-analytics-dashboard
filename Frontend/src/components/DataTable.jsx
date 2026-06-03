import React from 'react';

const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, 10).map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {col === 'Product_URL' && row[col] ? (
                      <a href={row[col]} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Link</a>
                    ) : (
                      String(row[col] ?? 'N/A').substring(0, 30) + (String(row[col] ?? '').length > 30 ? '...' : '')
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 10 && (
        <div className="bg-gray-50 px-6 py-3 text-sm text-gray-500 text-center border-t border-gray-200">
          Showing 10 of {data.length} products. Download CSV to see all.
        </div>
      )}
    </div>
  );
};

export default DataTable;