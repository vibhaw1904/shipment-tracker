"use client"
import React, { useState } from 'react';

interface BuyProductFormProps {
  userEmail: string;
}

interface FormData {
  productName: string;
  note:string;
  address: string;
  email: string;
}

const BuyProductForm: React.FC<BuyProductFormProps> = ({ userEmail }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    note:'',
    address: '',
    email: userEmail,
  });
  const [isSubmitting,setIsSubmitting]=useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   setIsSubmitting(true);
   const response=await fetch('/api/placeOrder/',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({
      productName:formData.productName,
      address:formData.address,
      note:formData.note,
      userEmail:formData.email,
    }),
  });

  if (response.ok) {
    // Handle success (e.g., redirect, show a success message)
    console.log(response.json());
    
  } else {
    // Handle error
    console.error('Failed to place order');
  }

  setIsSubmitting(false);

   }
  

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Place Order</h2>
        
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-2 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 font-semibold">
            Note
          </label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2 font-semibold">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:scale-105 transform text-black font-semibold py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300 ease-in-out"
        >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}

        </button>
      </form>
    </div>
  );
};

export default BuyProductForm;