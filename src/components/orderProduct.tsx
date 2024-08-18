"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BuyProductFormProps {
  userEmail: string;
}

interface FormData {
  productName: string;
  note: string;
  address: string;
  email: string;
}

const BuyProductForm: React.FC<BuyProductFormProps> = ({ userEmail }) => {
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    note: '',
    address: '',
    email: userEmail,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch('/api/placeOrder/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName: formData.productName,
        address: formData.address,
        note: formData.note,
        userEmail: formData.email,
      }),
    });

    if (response.ok) {
      console.log(await response.json());
      // Clear form fields after successful submission
      setFormData({
        productName: '',
        note: '',
        address: '',
        email: userEmail,
      });
    } else {
      console.error('Failed to place order');
    }

    setIsSubmitting(false);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white p-8 rounded-lg max-w-md mx-auto shadow-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6 text-blue-400"
        >
          Place Order
        </motion.h2>
        
        {['productName', 'note', 'address'].map((field, index) => (
          <motion.div 
            key={field}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
            className="mb-4"
          >
            <label htmlFor={field} className="block mb-2 font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {field === 'note' || field === 'address' ? (
              <textarea
                id={field}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required={field !== 'note'}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-y transition duration-300 ease-in-out"
              />
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
            )}
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-4"
        >
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
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed transition duration-300 ease-in-out"
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300 ease-in-out"
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BuyProductForm;