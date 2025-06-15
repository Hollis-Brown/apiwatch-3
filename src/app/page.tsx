'use client';

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import Dashboard from '@/components/Dashboard'
import RealTimeUpdates from '@/components/RealTimeUpdates'
import { useState } from 'react'
import AddAPIForm from '@/components/AddAPIForm'

export default function Home() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar onAddClick={() => setIsAddFormOpen(true)} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <RealTimeUpdates />
          <Dashboard />
        </main>
      </div>
      <AddAPIForm isOpen={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
    </div>
  )
} 