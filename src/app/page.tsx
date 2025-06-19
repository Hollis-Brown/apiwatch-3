'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import RealTimeUpdates from '@/components/RealTimeUpdates';
import AddAPIForm from '@/components/AddAPIForm';

export default function Home() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <Header onAddClick={() => setIsAddFormOpen(true)} />
      <main className="flex-1 overflow-y-auto p-6">
        <RealTimeUpdates />
        <Dashboard />
      </main>
      <AddAPIForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
    </div>
  );
} 