'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  productName: string;
  status: string;
  trackingNumber: string;
  estimatedDelivery: string;
  location: string;
  address: string;
  note: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/getOrder');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) return <div className="text-blue-400 text-2xl font-bold text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-400 text-2xl font-bold text-center mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center ">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400 text-center text-xl">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order, index) => (
            <motion.li
              key={order.id}
              className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 sm:px-10 sm:shadow-2xl    hover:shadow-blue-500/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-2xl text-blue-400 mb-3">{order.productName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <p>Status: <span className="font-medium text-green-400">{order.status}</span></p>
                <p>Tracking Number: <span className="font-medium">{order.trackingNumber}</span></p>
                <p>Estimated Delivery: <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span></p>
                <p>Location: <span className="font-medium">{order.location}</span></p>
              </div>
              <div className="mt-4 p-4 bg-gray-700 rounded-md">
                <p className="text-gray-300"><span className="font-bold text-blue-400">Address:</span> {order.address}</p>
                <p className="text-gray-300 mt-2"><span className="font-bold text-blue-400">Note:</span> {order.note}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;