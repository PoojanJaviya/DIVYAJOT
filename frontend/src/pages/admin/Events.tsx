// src/pages/admin/Events.tsx
import React from 'react';
const Events: React.FC = () => (
  <div>
    <h1 className="font-poppins font-bold text-2xl text-gray-900 mb-2">Event Management</h1>
    <p className="text-gray-500 text-sm mb-6">Create and manage activities and events.</p>
    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
      <div className="text-5xl mb-4">📅</div>
      <p className="font-semibold">Events module ready for integration.</p>
      <p className="text-sm mt-2">Connect to /api/events endpoint to load and manage events.</p>
    </div>
  </div>
);
export default Events;
