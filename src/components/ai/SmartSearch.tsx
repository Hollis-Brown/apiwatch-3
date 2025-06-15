import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  FunnelIcon,
  BookmarkIcon,
  ArrowPathIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Sample data
const recentSearches = [
  'payment APIs with webhooks',
  'REST APIs for e-commerce',
  'GraphQL APIs with good documentation',
  'APIs with OAuth 2.0 support',
];

const searchSuggestions = [
  'payment APIs that support webhooks',
  'APIs with rate limiting',
  'APIs with good documentation',
  'APIs with OAuth 2.0',
  'APIs with GraphQL support',
];

const searchResults = [
  {
    id: 1,
    title: 'Stripe API',
    description: 'Payment processing API with webhook support',
    category: 'Payments',
    matchScore: 0.95,
    tags: ['webhooks', 'payments', 'rest'],
  },
  {
    id: 2,
    title: 'PayPal API',
    description: 'Payment gateway with webhook notifications',
    category: 'Payments',
    matchScore: 0.92,
    tags: ['webhooks', 'payments', 'rest'],
  },
  {
    id: 3,
    title: 'Square API',
    description: 'Payment processing with webhook events',
    category: 'Payments',
    matchScore: 0.88,
    tags: ['webhooks', 'payments', 'rest'],
  },
];

const filterOptions = {
  categories: ['Payments', 'Authentication', 'Data', 'Communication'],
  tags: ['webhooks', 'rest', 'graphql', 'oauth', 'documentation'],
  dateRanges: ['Last 24 hours', 'Last 7 days', 'Last 30 days', 'Custom'],
  severity: ['Critical', 'High', 'Medium', 'Low'],
};

type FilterType = 'categories' | 'tags' | 'severity';
type FilterState = {
  categories: string[];
  tags: string[];
  dateRange: string;
  severity: string[];
};

export default function SmartSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    categories: [],
    tags: [],
    dateRange: '',
    severity: [],
  });
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    // Simulate search results
  };

  const toggleFilter = (type: FilterType, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <>
      {/* Search Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed top-6 right-6 w-14 h-14 bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <MagnifyingGlassIcon className="w-6 h-6" />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              ref={searchRef}
              className="w-full max-w-3xl bg-gray-800 rounded-xl shadow-xl"
            >
              {/* Search Input */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search APIs, documentation, or ask a question..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg ${
                      showFilters
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FunnelIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-b border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Categories */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => toggleFilter('categories', category)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedFilters.categories.includes(category)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => toggleFilter('tags', tag)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedFilters.tags.includes(tag)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date Range */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Date Range
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.dateRanges.map((range) => (
                            <button
                              key={range}
                              onClick={() =>
                                setSelectedFilters((prev) => ({
                                  ...prev,
                                  dateRange: range,
                                }))
                              }
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedFilters.dateRange === range
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {range}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Severity */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">
                          Severity
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filterOptions.severity.map((severity) => (
                            <button
                              key={severity}
                              onClick={() => toggleFilter('severity', severity)}
                              className={`px-3 py-1 rounded-full text-sm ${
                                selectedFilters.severity.includes(severity)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {severity}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Search Results */}
              <div className="p-4">
                {query ? (
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-700/50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-medium">
                              {result.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                              {result.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-400">
                                {result.category}
                              </span>
                              {result.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-400">
                            {Math.round(result.matchScore * 100)}% match
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Recent Searches */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => handleSearch(search)}
                            className="flex items-center gap-2 w-full p-2 text-gray-300 hover:bg-gray-700/50 rounded-lg"
                          >
                            <ClockIcon className="w-4 h-4" />
                            <span>{search}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-2">
                        Suggestions
                      </h3>
                      <div className="space-y-2">
                        {searchSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => handleSearch(suggestion)}
                            className="flex items-center gap-2 w-full p-2 text-gray-300 hover:bg-gray-700/50 rounded-lg"
                          >
                            <MagnifyingGlassIcon className="w-4 h-4" />
                            <span>{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 