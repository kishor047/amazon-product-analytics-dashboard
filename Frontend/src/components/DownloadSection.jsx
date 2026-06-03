import React from 'react';

const DownloadSection = ({ dataAvailable }) => {
  if (!dataAvailable) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
      <a 
        href="http://127.0.0.1:8000/download-csv" 
        target="_blank"
        rel="noreferrer"
        className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
      >
        Download CSV
      </a>
      <button 
        className="px-6 py-3 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 transition flex items-center justify-center pointer-events-none opacity-80"
        title="Saved automatically on backend"
      >
        <span>Data Saved To SQLite ✅</span>
      </button>
    </div>
  );
};

export default DownloadSection;