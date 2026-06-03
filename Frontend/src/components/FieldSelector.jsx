import React from 'react';

const ALL_FIELDS = [
  { id: 'Product_Name', label: 'Product Name' },
  { id: 'Brand', label: 'Brand' },
  { id: 'Current_Price', label: 'Current Price' },
  { id: 'Rating', label: 'Rating' },
  { id: 'Review_Count', label: 'Review Count' },
  { id: 'Product_URL', label: 'Product URL' },
];

const FieldSelector = ({ selectedFields, setSelectedFields, disabled }) => {
  const toggleField = (id) => {
    if (selectedFields.includes(id)) {
      setSelectedFields(selectedFields.filter((f) => f !== id));
    } else {
      setSelectedFields([...selectedFields, id]);
    }
  };

  const selectAll = () => setSelectedFields(ALL_FIELDS.map((f) => f.id));
  const clearAll = () => setSelectedFields([]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">2. Select Fields To Extract</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {ALL_FIELDS.map((field) => (
          <label key={field.id} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFields.includes(field.id)}
              onChange={() => toggleField(field.id)}
              disabled={disabled}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        ))}
      </div>
      <div className="flex gap-4">
        <button
          onClick={selectAll}
          disabled={disabled}
          className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          disabled={disabled}
          className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FieldSelector;