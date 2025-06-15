import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ComputerDesktopIcon,
  VideoCameraIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Sample data
const supportHours = {
  weekdays: '9:00 AM - 6:00 PM EST',
  weekends: '10:00 AM - 4:00 PM EST',
};

const initialMessages = [
  {
    id: 1,
    sender: 'support',
    message: 'Hi! How can I help you today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
  },
];

export default function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date(),
      },
    ]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate support response
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'support',
          message: 'Thanks for your message! Our team will get back to you shortly.',
          timestamp: new Date(),
        },
      ]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-96 bg-gray-800 rounded-xl shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div>
                  <h3 className="text-white font-medium">Live Support</h3>
                  <p className="text-sm text-gray-400">
                    We typically reply in 2 minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <p>{message.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Support Hours */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <ClockIcon className="w-4 h-4" />
                <span>
                  Support Hours: {supportHours.weekdays} (Weekdays)
                </span>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white">
                  <ComputerDesktopIcon className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white">
                  <VideoCameraIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 text-blue-400 hover:text-blue-300"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 