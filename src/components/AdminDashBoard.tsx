import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Order{
    id:string;
    productName:string;
    status:string;
    location:string;

}

const AdminDashBoard = () => {
    const {data:session}=useSession();
    const [orders,setOrders]=useState<Order[]>([])
    const router=useRouter();
    useEffect(()=>{
        if(session?.user?.role!=='ADMIN'){
            router.push('/')
        }
        const fetchOrders = async () => {
            const res = await fetch('/api/orders');
            const data = await res.json();
            setOrders(data.orders);
          };
      
          fetchOrders();
        }, [session, router]);
   const handleStatusChange=async(id:string,status:string)=>{
    
   }

    return  <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Product Name</th>
          <th className="py-2">Status</th>
          <th className="py-2">Location</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="border px-4 py-2">{order.productName}</td>
            <td className="border px-4 py-2">
              <select
                value={order.status}
                onChange={()=>}
              >
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </td>
            <td className="border px-4 py-2">
              <input
                type="text"
                value={order.location}
                className="border p-2"
              />
            </td>
            <td className="border px-4 py-2">
              {/* Additional actions can be added here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}
export default AdminDashBoard;