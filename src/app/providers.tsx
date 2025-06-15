'use client';

import { SessionProvider } from 'next-auth/react';
import { APIContextProvider } from '@/contexts/APIContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <APIContextProvider>
        {children}
      </APIContextProvider>
    </SessionProvider>
  );
} 