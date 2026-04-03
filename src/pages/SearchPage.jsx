import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { DrugCard, DiseaseCard } from '../components/Cards';
import { searchAll, getAllDrugs, getAllDiseases, getAllDrugClasses } from '../utils/dataHelpers';

export default function SearchPage() {
  const { isDark } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState({ drugs: [], diseases: [] });
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'drugs', 'diseases'
  const [selectedClass, setSelectedClass] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const allDrugs = getAllDrugs();
  const allDiseases = getAllDiseases();
  const allClasses = getAllDrugClasses();

  useEffect(() => {
    if (initialQ) {
      performSearch(initialQ);
    } else {
      setResults({ drugs: allDrugs, diseases: allDiseases });
    }
  }, []);

  const performSearch = (q) => {
    setHasSearched(true);
    if (!q.trim()) {
      setResults({ drugs: allDrugs, diseases: allDiseases });
      return;
    }
    const res = searchAll(q);
    setResults(res);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    performSearch(query);
  };

  const filteredDrugs = selectedClass
    ? results.drugs.filter((d) => d.drugClass === selectedClass)
    : results.drugs;

  const totalResults = filteredDrugs.length + results.diseases.length;

  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const inputClass = isDark
    ? 'bg-slate-800/60 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Search Header */}
      <div className={`py-14 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-blue-50 to-slate-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className={`text-4xl font-extrabold text-center mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Drug & Disease Search
          </h1>
          <p className={`text-center mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Search across 9+ drugs and 7+ diseases in our database
          </p>
          <form onSubmit={handleSearch}>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by drug name, brand name, disease, drug class..."
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${inputClass}`}
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl transition-all hover:scale-105 flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {['all', 'drugs', 'diseases'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {f === 'all' ? 'All Results' : f === 'drugs' ? `💊 Drugs (${filteredDrugs.length})` : `🏥 Diseases (${results.diseases.length})`}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          {(activeFilter === 'all' || activeFilter === 'drugs') && (
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className={`px-4 py-2 rounded-xl text-sm border focus:outline-none ${
                isDark ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              <option value="">All Drug Classes</option>
              {allClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          )}
        </div>

        {/* Results Count */}
        {(initialQ || hasSearched) && query && (
          <div className={`mb-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {totalResults > 0 ? (
              <span>Found <strong className={isDark ? 'text-white' : 'text-slate-900'}>{totalResults} results</strong> for "{query}"</span>
            ) : (
              <span>No results found for "{query}" — showing all entries</span>
            )}
          </div>
        )}

        {/* Drugs Section */}
        {(activeFilter === 'all' || activeFilter === 'drugs') && (
          <section className="mb-12">
            <h2 className={`text-2xl font-extrabold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              💊 Drugs
              <span className={`text-sm font-normal px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                {filteredDrugs.length}
              </span>
            </h2>
            {filteredDrugs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredDrugs.map((drug) => (
                  <DrugCard key={drug.id} drug={drug} />
                ))}
              </div>
            ) : (
              <div className={`py-16 text-center rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                <span className="text-4xl block mb-3">💊</span>
                <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No drugs found matching your search.</p>
              </div>
            )}
          </section>
        )}

        {/* Diseases Section */}
        {(activeFilter === 'all' || activeFilter === 'diseases') && (
          <section>
            <h2 className={`text-2xl font-extrabold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              🏥 Diseases
              <span className={`text-sm font-normal px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                {results.diseases.length}
              </span>
            </h2>
            {results.diseases.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.diseases.map((disease) => (
                  <DiseaseCard key={disease.id} disease={disease} />
                ))}
              </div>
            ) : (
              <div className={`py-16 text-center rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                <span className="text-4xl block mb-3">🏥</span>
                <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>No diseases found matching your search.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
