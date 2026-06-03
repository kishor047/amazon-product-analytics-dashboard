import React from 'react';

const UrlInput = ({ url, setUrl, loading, onValidate }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">1. Amazon Search URL</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.in/s?k=mobile+phone"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button 
            onClick={onValidate}
            disabled={loading || !url}
            className="px-6 py-2 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 transition disabled:bg-gray-400"
          >
            Validate URL
          </button>
        </div>
        <div className="flex items-center text-sm">
          {url && url.includes('amazon') ? (
            <span className="text-green-600 font-medium">✅ Amazon URL Detected</span>
          ) : url ? (
            <span className="text-red-500 font-medium">❌ Invalid Amazon URL</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UrlInput;