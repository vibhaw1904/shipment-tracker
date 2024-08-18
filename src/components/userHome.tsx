'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  location: string;
  estimatedDelivery: string;
  productName: string;
}

const UserDashboard = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchShipment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/tracking?number=${trackingNumber}`);
      if (!response.ok) {
        throw new Error('Shipment not found');
      }
      const data = await response.json();
      setShipment(data);
    } catch (err) {
        console.log(err)
      setError('Unable to find shipment. Please check the tracking number.');
      setShipment(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Ordered': return 0;
      case 'Shipped': return 1;
      case 'out_for_delivery': return 2;
      case 'Delivered': return 3;
      case 'Canceled': return -1;
      default: return 0;
    }
  };
  const getStatusColor = (status: string) => {
    return status === 'Canceled' ? 'bg-red-500' : 'bg-blue-500';
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-blue-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Track Your Shipment
      </motion.h1>

      <motion.div 
        className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number"
            className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchShipment}
            className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300 flex items-center"
            disabled={loading}
          >
            {loading ? 'Searching...' : <><FaSearch className="mr-2" /> Track</>}
          </button>
        </div>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </motion.div>

      {shipment && (
        <motion.div 
          className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">{shipment.productName}</h2>
          <p className="mb-2">Tracking Number: {shipment.trackingNumber}</p>
          <p className="mb-2">Status: {shipment.status}</p>
          <p className="mb-2">Current Location: {shipment.location}</p>
          <p className="mb-4">Estimated Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Shipment Progress
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              {['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, index) => (
                <div key={step} className="relative">
                   <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      shipment.status === 'Canceled'
                        ? 'bg-gray-600'
                        : index <= getStatusStep(shipment.status)
                        ? getStatusColor(shipment.status)
                        : 'bg-gray-600'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {index === 0 && <FaBox />}
                    {index === 1 && <FaTruck />}
                    {index === 2 && <FaTruck />}
                    {index === 3 && <FaCheckCircle />}
                  </motion.div>
                  <div className="text-xs mt-1">{step}</div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
            <motion.div 
                style={{ 
                  width: shipment.status === 'Canceled' ? '100%' : `${(getStatusStep(shipment.status) / 3) * 100}%` 
                }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getStatusColor(shipment.status)}`}
                initial={{ width: 0 }}
                animate={{ 
                  width: shipment.status === 'Canceled' ? '100%' : `${(getStatusStep(shipment.status) / 3) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserDashboard;