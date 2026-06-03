import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Charts = ({ data }) => {
  if (!data || data.length === 0) return null;

  const brandData = useMemo(() => {
    const counts = {};
    data.forEach(item => {
      if (item.Brand && item.Brand !== 'Unknown') {
        counts[item.Brand] = (counts[item.Brand] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [data]);

  const priceData = useMemo(() => {
    return data
      .filter(item => item.Current_Price)
      .map(item => ({
        name: String(item.Product_Name).substring(0, 15),
        price: Number(String(item.Current_Price).replace(/[^0-9.-]+/g,""))
      }))
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Top Brands Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={brandData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {brandData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Top 5 Expensive Products</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#4f46e5" name="Price (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;