import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicrophoneIcon,
  QrCodeIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface MobileFeaturesProps {
  onVoiceSearch: (text: string) => void;
  onQRCodeScan: (data: string) => void;
}

export default function MobileFeatures({ onVoiceSearch, onQRCodeScan }: MobileFeaturesProps) {
  const [isListening, setIsListening] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startVoiceSearch = async () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onVoiceSearch(text);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const startQRCodeScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);

      // Initialize QR code scanner
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const scanInterval = setInterval(() => {
        if (videoRef.current && context) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          // Here you would use a QR code scanning library to process the image data
          // For now, we'll just simulate a successful scan
          clearInterval(scanInterval);
          stopQRCodeScan();
          onQRCodeScan('https://api.example.com/v1');
        }
      }, 1000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera');
    }
  };

  const stopQRCodeScan = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black z-50"
          >
            <div className="relative h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={stopQRCodeScan}
                className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-primary rounded-lg" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startVoiceSearch}
          className={`
            p-3 rounded-full shadow-lg
            ${isListening ? 'bg-red-500' : 'bg-primary'}
          `}
        >
          <MicrophoneIcon className="w-6 h-6 text-white" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startQRCodeScan}
          className="p-3 rounded-full bg-primary shadow-lg"
        >
          <QrCodeIcon className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {isListening && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="flex items-center gap-2">
            <ArrowPathIcon className="w-4 h-4 text-primary animate-spin" />
            <span className="text-sm text-white">Listening...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
} 