
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen text-white bg-pattern">
     
      
      <main className="container mx-auto px-4 py-16">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-10'}`}>
          <h1 className="text-6xl font-bold text-blue-400 mb-4">TrackWise</h1>
          <p className="text-xl text-gray-300">Your Intelligent Shipment Tracking Solution</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'}`}>
            <h2 className="text-3xl font-semibold mb-4 text-blue-300">Track Your Shipments with Ease</h2>
            <p className="text-gray-300 mb-6">
              TrackWise provides real-time updates and detailed insights for all your shipments. 
              Stay informed and in control of your logistics with our advanced tracking system.
            </p>
            
            <button   className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300 inline-block hover:shadow-lg hover:scale-105 transform"            onClick={() => signIn('credentials', { callbackUrl: '/' })}
            >
              Get Started

            </button>
            
          </div>
          <div className={`bg-gray-800 p-8 rounded-lg shadow-xl transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'}`}>
            <h3 className="text-2xl font-semibold mb-4 text-blue-300">Key Features</h3>
            <ul className="space-y-4">
              {['Real-time Tracking', 'Multiple Carrier Support', 'Customizable Alerts', 'Analytics Dashboard'].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold mb-12 text-blue-300">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Enter Tracking Number", description: "Input your shipment's tracking number from any supported carrier." },
              { title: "Get Real-Time Updates", description: "Receive instant notifications on your shipment's status and location." },
              { title: "Analyze and Optimize", description: "Use our analytics tools to improve your logistics operations." }
            ].map((step, index) => (
              <div key={index} className={`bg-gray-800 p-6 rounded-lg shadow-xl transition-all duration-1000 ease-out hover:shadow-2xl hover:scale-105 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${800 + index * 200}ms`}}>
                <div className="text-4xl font-bold text-blue-400 mb-4">{index + 1}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-200">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-semibold mb-8 text-blue-300">Ready to Get Started?</h2>
          <Link href="/signup" className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition duration-300 inline-block text-lg font-semibold hover:shadow-lg hover:scale-105 transform">
            Sign Up Now
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TrackWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;