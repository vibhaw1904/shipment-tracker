"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  productName: string;
  status: string;
  location: string;
  trackingNumber: string;
  estimatedDelivery: string;
  userEmail: string;
  address: string;
  note?: string;
}

const AdminDashBoard = () => {
    const [orders,setOrders]=useState<Order[]>([])
    const[loading,setLoading]=useState<boolean>(true);
    const[error,setError]=useState('')
    const { data: session } = useSession();
    const [localLocations, setLocalLocations] = useState<{[key: string]: string}>({});

    useEffect(() => {
      const fetchOrders = async () => {
        
  
        try {
          const response = await fetch('/api/admin/getAllOrder');
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
   const updateOrder=async(orderId:string,updates: Partial<Order>)=>{
    try {
      const response=await fetch('/api/admin/updateOrder',{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
                },
        body: JSON.stringify({ orderId, updates }),

      })

      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      const  upadteorder=await  response.json();
      setOrders(orders.map(order=>order.id===upadteorder.id?upadteorder:order))
    } catch (error) {
      console.error('Error updating order:', error);

    }
   }
   const handleLocationChange = (orderId: string, newLocation: string) => {
    setLocalLocations(prev => ({ ...prev, [orderId]: newLocation }));
}

const handleLocationSave = (orderId: string) => {
    const newLocation = localLocations[orderId];
    if (newLocation !== undefined) {
        updateOrder(orderId, { location: newLocation });
    }
}
   if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
   if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

    return  (
      <div className="container mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-blue-400 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
              <motion.div
                  key={order.id}
                  className="bg-gray-800 rounded-lg shadow-lg p-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                  {/* ... (keep other order details) */}
                  <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-400">Status</label>
                      <select
                          value={order.status}
                          onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                          className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                      </select>
                  </div>
                  <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-400">Location</label>
                      <input
                          type="text"
                          value={localLocations[order.id] !== undefined ? localLocations[order.id] : order.location}
                          onChange={(e) => handleLocationChange(order.id, e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-700 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                      />
                      <button 
                          onClick={() => handleLocationSave(order.id)}
                          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      >
                          Save Location
                      </button>
                  </div>
              </motion.div>
          ))}
      </div>
  </div>
    );
}
export default AdminDashBoard;