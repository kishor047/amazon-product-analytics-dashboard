import React, { useState } from 'react';
import UrlInput from '../components/UrlInput';
import FieldSelector from '../components/FieldSelector';
import ProgressBar from '../components/ProgressBar';
import KPISection from '../components/KPISection';
import DataTable from '../components/DataTable';
import Charts from '../components/Charts';
import DownloadSection from '../components/DownloadSection';
import { scrapeAmazon, getAnalytics, getProducts } from '../services/api';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [selectedFields, setSelectedFields] = useState(['Product_Name', 'Current_Price', 'Brand', 'Product_URL']);
  const [isScraping, setIsScraping] = useState(false);
  const [data, setData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  const handleStartExtraction = async () => {
    if (!url) {
      setError('Please enter a valid Amazon URL');
      return;
    }
    if (selectedFields.length === 0) {
      setError('Please select at least one field to extract');
      return;
    }

    setError('');
    setIsScraping(true);
    setData(null);
    setAnalytics(null);

    try {
      const response = await scrapeAmazon(url, selectedFields);
      if (response.data.success) {
        setData(response.data.data);
        
        // Fetch analytics
        const analyticsRes = await getAnalytics();
        setAnalytics(analyticsRes.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during extraction. Check console for details.');
    } finally {
      setIsScraping(false);
    }
  };

  const handleValidate = () => {
    if (!url.includes('amazon.')) {
      setError('Please enter a valid Amazon URL');
    } else {
      setError('');
      alert('URL Validated! You can now start extraction.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b pb-4">
            Amazon Product Analytics Dashboard
          </h1>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <UrlInput url={url} setUrl={setUrl} loading={isScraping} onValidate={handleValidate} />

        <FieldSelector 
          selectedFields={selectedFields} 
          setSelectedFields={setSelectedFields} 
          disabled={isScraping}
        />

        <div className="flex justify-center mb-8">
          <button
            onClick={handleStartExtraction}
            disabled={isScraping || !url}
            className={`px-8 py-3 text-lg font-semibold rounded-md shadow-md text-white transition-all
              ${isScraping || !url 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
          >
            {isScraping ? 'Extraction in progress...' : 'Start Extraction'}
          </button>
        </div>

        <ProgressBar isScraping={isScraping} totalFound={data ? data.length : 0} />

        {data && data.length > 0 && (
          <>
            <KPISection analytics={analytics} />
            <Charts data={data} />
            <DataTable data={data} columns={selectedFields} />
            <DownloadSection dataAvailable={true} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;