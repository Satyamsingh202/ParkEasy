import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto" id="search-form">
      <div className="relative group">
        {/* Glow effect behind */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200 group-focus-within:border-blue-400 group-focus-within:shadow-blue-100/50 transition-all duration-300 overflow-hidden">
          {/* Location pin icon */}
          <div className="pl-5 pr-2">
            <MapPin size={22} className="text-blue-500" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Where do you want to park your car?"
            className="flex-1 py-4.5 px-2 text-lg text-slate-800 placeholder:text-slate-400 bg-transparent outline-none font-medium"
            id="search-input"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 mr-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              id="search-clear-btn"
            >
              <X size={18} />
            </button>
          )}

          {/* Search button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 m-1.5 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-60"
            id="search-submit-btn"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
