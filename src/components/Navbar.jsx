import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../hooks/useBookmarks';
import { searchAll } from '../utils/dataHelpers';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { bookmarks } = useBookmarks();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ drugs: [], diseases: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const res = searchAll(val);
      setResults(res);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setResults({ drugs: [], diseases: [] });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Drugs' },
    { to: '/diseases', label: 'Diseases' },
    { to: '/classes', label: 'Drug Classes' },
    { to: '/news', label: 'News' },
    { to: '/student', label: 'Student Corner' },
  ];

  const baseNavClass = isDark
    ? 'bg-slate-900/80 border-slate-700/50 text-white'
    : 'bg-white/80 border-slate-200/80 text-slate-900';

  const inputClass = isDark
    ? 'bg-slate-800/60 text-white placeholder-slate-400 border-slate-600 focus:border-blue-500'
    : 'bg-slate-100 text-slate-900 placeholder-slate-500 border-slate-300 focus:border-blue-500';

  const dropdownClass = isDark
    ? 'bg-slate-800 border-slate-700 text-white'
    : 'bg-white border-slate-200 text-slate-900';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b ${baseNavClass} ${scrolled ? 'shadow-2xl' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">Rx</span>
            </div>
            <span className="text-xl font-extrabold gradient-text hidden sm:block">PharmaSphere</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-blue-500/20 text-blue-400'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search drugs, diseases..."
                    className={`pl-9 pr-4 py-2 rounded-xl text-sm border transition-all w-56 focus:w-72 focus:outline-none ${inputClass}`}
                  />
                </div>
              </form>

              {/* Dropdown Results */}
              {showDropdown && (results.drugs.length > 0 || results.diseases.length > 0) && (
                <div className={`absolute top-12 right-0 w-80 rounded-xl border shadow-2xl z-50 overflow-hidden ${dropdownClass}`}>
                  {results.drugs.length > 0 && (
                    <div>
                      <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                        💊 Drugs
                      </div>
                      {results.drugs.slice(0, 4).map((drug) => (
                        <Link
                          key={drug.id}
                          to={`/drug/${drug.id}`}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">💊</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{drug.genericName}</p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{drug.shortUse}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {results.diseases.length > 0 && (
                    <div>
                      <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider ${isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                        🏥 Diseases
                      </div>
                      {results.diseases.slice(0, 3).map((disease) => (
                        <Link
                          key={disease.id}
                          to={`/disease/${disease.slug}`}
                          className={`flex items-center gap-3 px-4 py-3 transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                          onClick={() => setShowDropdown(false)}
                        >
                          <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">🏥</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{disease.name}</p>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{disease.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  <Link
                    to={`/search?q=${encodeURIComponent(query)}`}
                    className="block text-center py-3 text-sm text-blue-400 hover:text-blue-300 border-t border-slate-700/50"
                    onClick={() => setShowDropdown(false)}
                  >
                    View all results →
                  </Link>
                </div>
              )}
            </div>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className={`relative p-2 rounded-xl transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
              title="Saved Drugs"
            >
              <span className="text-lg">🔖</span>
              {bookmarks.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-colors ${isDark ? 'text-yellow-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
              title="Toggle theme"
            >
              <span className="text-lg">{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <span className="text-lg">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}>
          {/* Mobile Search */}
          <div className="px-4 py-3">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search drugs, diseases..."
                className={`w-full px-4 py-2 rounded-xl text-sm border focus:outline-none ${inputClass}`}
              />
            </form>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-blue-400 bg-blue-500/10'
                  : isDark
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
