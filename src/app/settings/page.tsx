'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SettingsLayout from '@/components/settings/SettingsLayout';
import ProfileSection from '@/components/settings/ProfileSection';
import NotificationsSection from '@/components/settings/NotificationsSection';
import BillingSection from '@/components/settings/BillingSection';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/signin');
    return null;
  }

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'billing':
        return <BillingSection />;
      case 'security':
        return <div>Security settings coming soon...</div>;
      case 'api-keys':
        return <div>API keys management coming soon...</div>;
      case 'usage':
        return <div>Usage statistics coming soon...</div>;
      default:
        return <div>Select a section to begin</div>;
    }
  };

  return (
    <SettingsLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </SettingsLayout>
  );
} 