"use client";

import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
      <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">Settings</h3>
      <p className="text-gray-600">Settings panel will be implemented here.</p>
    </div>
  );
};

export default SettingsPage;