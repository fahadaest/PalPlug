// components/TabsContent.jsx
"use client"

import React, { useState } from 'react';

const TabsContent = () => {
  const [activeTab, setActiveTab] = useState('Referral');

  const renderContent = () => {
    switch (activeTab) {
      case 'Referral':
        return (
          <div>
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Standard Employee Referral</h3>
              <h3 className="text-lg font-bold">$20.00</h3>
            </div>
            <p className="text-sm mb-4">
              Employee referral to Slack. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Slack).
            </p>
            <div className="flex items-center mb-4">
              <img src="/path/to/1-day-delivery.jpg" alt="1 Day Delivery" className="mr-2" />
              <p>1 Day Delivery</p>
            </div>
            <div className="flex items-center mb-4">
              <img src="/path/to/video-screening.jpg" alt="Video Screening Required" className="mr-2" />
              <p>Video Screening Required</p>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Select Package ($20.00)</button>
              <p className="mt-2 text-sm">Contact Idris</p>
            </div>
          </div>
        );
      case 'Resume Review':
        // Content for Resume Review
        break;
      case 'Interview Prep':
        // Content for Interview Prep
        break;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-[436px] h-[522px]">
      <ul className="flex text-sm font-medium text-gray-500 mb-4">
        <li className="me-2">
          <button
            className={`inline-block px-4 py-3 rounded-lg ${activeTab === 'Referral' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('Referral')}
          >
            Referral
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-block px-4 py-3 rounded-lg ${activeTab === 'Resume Review' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('Resume Review')}
          >
            Resume Review
          </button>
        </li>
        <li>
          <button
            className={`inline-block px-4 py-3 rounded-lg ${activeTab === 'Interview Prep' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
            onClick={() => setActiveTab('Interview Prep')}
          >
            Interview Prep
          </button>
        </li>
      </ul>
      {renderContent()}
    </div>
  );
};

export default TabsContent;
