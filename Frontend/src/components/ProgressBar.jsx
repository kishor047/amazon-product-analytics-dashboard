import React, { useState, useEffect } from 'react';

const ProgressBar = ({ isScraping, totalFound }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isScraping) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 500);
    } else if (progress > 0) {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isScraping]);

  if (!isScraping && progress === 0 && totalFound === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Status: {isScraping ? 'Scraping...' : 'Completed'}</h2>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div 
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progress: {progress}%</span>
        <span>Products Found: {totalFound || 0}</span>
      </div>
    </div>
  );
};

export default ProgressBar;