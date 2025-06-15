import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { APIContextProvider } from '@/contexts/APIContext';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function App({ Component, pageProps }: AppProps) {
  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('Service worker registered:', registration);
          })
          .catch((error) => {
            console.error('Service worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <APIContextProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#111827" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <title>APIWatch</title>
      </Head>

      <ResponsiveLayout>
        <Component {...pageProps} />
      </ResponsiveLayout>

      <PWAInstallPrompt />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
          },
        }}
      />
    </APIContextProvider>
  );
} 