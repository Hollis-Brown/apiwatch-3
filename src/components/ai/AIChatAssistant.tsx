import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  MicrophoneIcon,
  XMarkIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

// Sample data for chat history
const initialMessages = [
  {
    id: 1,
    type: 'ai',
    content: 'Hello! I\'m your API assistant. How can I help you today?',
    timestamp: '2024-03-20 10:00:00',
  },
];

// Sample suggestions
const suggestions = [
  {
    id: 1,
    text: 'Which APIs are most at risk of deprecation?',
    icon: ExclamationTriangleIcon,
  },
  {
    id: 2,
    text: 'Help me migrate from Twitter API v1 to v2',
    icon: ArrowPathIcon,
  },
  {
    id: 3,
    text: 'What payment APIs integrate well with my e-commerce stack?',
    icon: CurrencyDollarIcon,
  },
  {
    id: 4,
    text: 'Show me all APIs that changed this week',
    icon: ClockIcon,
  },
];

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'I\'m analyzing your request. This is a simulated response.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <>
      {/* Chat Bubble */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-gray-800 rounded-xl shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-400" />
                <h2 className="text-white font-medium">AI Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {message.content}
                    <div className="text-xs mt-1 opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-3 text-gray-200">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="p-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestion(suggestion.text)}
                    className="flex items-center gap-2 p-2 text-sm text-gray-400 hover:text-white bg-gray-700/50 rounded-lg"
                  >
                    <suggestion.icon className="w-4 h-4" />
                    <span className="truncate">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg ${
                    isRecording
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  <MicrophoneIcon className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about APIs..."
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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