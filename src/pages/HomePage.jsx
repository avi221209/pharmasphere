import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { DrugCard, DiseaseCard, NewsCard, DrugClassCard } from '../components/Cards';
import {
  getTrendingDrugs,
  getNewDrugs,
  getAllDiseases,
  getAllDrugClasses,
} from '../utils/dataHelpers';
import newsData from '../data/news.json';

function StatBadge({ icon, label, value, isDark }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/60 border border-slate-200'}`}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const trendingDrugs = getTrendingDrugs();
  const newDrugs = getNewDrugs();
  const diseases = getAllDiseases();
  const drugClasses = getAllDrugClasses();
  const featuredClasses = drugClasses.slice(0, 8);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';
  const sectionClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const headingClass = isDark ? 'text-white' : 'text-slate-900';
  const subheadingClass = isDark ? 'text-white/80' : 'text-slate-700';

  return (
    <div className={`min-h-screen ${bgClass}`}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse flex-shrink-0" />
            Global Pharmacy Knowledge Hub
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6">
            <span className="gradient-text-hero">Your Complete</span>
            <br />
            <span className="text-white">Drug Reference</span>
            <br />
            <span className="gradient-text-hero">Platform</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed">
            Evidence-based pharmacology for students and professionals. Explore drugs, diseases, mechanisms — all in one place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-7 sm:mb-10">
            <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search drugs, diseases..."
                  className="w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-500/30 flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 sm:mb-16">
            <span className="text-slate-500 text-xs sm:text-sm w-full sm:w-auto mb-1 sm:mb-0">Popular:</span>
            {['Paracetamol', 'Metformin', 'Diabetes', 'Hypertension', 'GERD'].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 text-xs sm:text-sm rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto">
            <StatBadge icon="💊" label="Drugs" value="9+" isDark={true} />
            <StatBadge icon="🏥" label="Diseases" value="7+" isDark={true} />
            <StatBadge icon="🏷️" label="Drug Classes" value="12" isDark={true} />
            <StatBadge icon="📰" label="News" value="6+" isDark={true} />
          </div>
        </div>
      </section>

      {/* ── FEATURED DRUG CLASSES ────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-blue-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Browse by Category</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-3 ${headingClass}`}>Featured Drug Classes</h2>
            <p className={`text-base sm:text-lg max-w-xl mx-auto ${sectionClass}`}>
              Explore pharmacology organized by therapeutic categories
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredClasses.map((cls) => (
              <DrugClassCard key={cls.id} cls={cls} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 border border-blue-500/40 text-blue-400 rounded-2xl hover:bg-blue-500/10 transition-all font-medium text-sm sm:text-base"
            >
              View All Drug Classes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRENDING DRUGS ────────────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div>
              <span className="text-rose-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 sm:mb-2 block">🔥 Most Searched</span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${headingClass}`}>Trending Drugs</h2>
            </div>
            <Link to="/search" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trendingDrugs.map((drug) => (
              <DrugCard key={drug.id} drug={drug} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENTLY ADDED MEDICINES ─────────────────────── */}
      {newDrugs.length > 0 && (
        <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-10">
              <div>
                <span className="text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 sm:mb-2 block">✨ Just Added</span>
                <h2 className={`text-3xl sm:text-4xl font-extrabold ${headingClass}`}>Recently Added</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {newDrugs.map((drug) => (
                <DrugCard key={drug.id} drug={drug} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── DISEASE INFORMATION ─────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-emerald-500 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 block">Clinical Reference</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold mb-2 sm:mb-3 ${headingClass}`}>Disease Library</h2>
            <p className={`text-base sm:text-lg max-w-xl mx-auto ${sectionClass}`}>
              Comprehensive clinical summaries with treatment protocols
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {diseases.slice(0, 6).map((disease) => (
              <DiseaseCard key={disease.id} disease={disease} />
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link
              to="/diseases"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 border border-emerald-500/40 text-emerald-400 rounded-2xl hover:bg-emerald-500/10 transition-all font-medium text-sm sm:text-base"
            >
              View All Diseases →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PHARMACY NEWS ────────────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div>
              <span className="text-indigo-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 sm:mb-2 block">📰 Latest Updates</span>
              <h2 className={`text-3xl sm:text-4xl font-extrabold ${headingClass}`}>Pharmacy News</h2>
            </div>
            <Link to="/news" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {newsData.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT CORNER ────────────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-6 sm:p-10 md:p-14 relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-blue-900/40 to-emerald-900/20 border border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-emerald-50 border border-blue-200'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
              <div className="flex-1 text-center lg:text-left w-full">
                <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">🎓</span>
                <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4 ${headingClass}`}>Student Corner</h2>
                <p className={`text-sm sm:text-lg max-w-lg mb-5 sm:mb-6 leading-relaxed ${sectionClass}`}>
                  Curated notes, MCQ practice questions, PDF resources — designed to ace your pharmacology exams.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Link
                    to="/student"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl hover:from-blue-500 hover:to-blue-400 transition-all text-sm sm:text-base"
                  >
                    Access Resources
                  </Link>
                  <Link
                    to="/student"
                    className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl font-semibold transition-all text-sm sm:text-base ${isDark ? 'border border-slate-600 text-slate-300 hover:bg-slate-700' : 'border border-slate-300 text-slate-700 hover:bg-white'}`}
                  >
                    Practice MCQs
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:flex-shrink-0">
                {[
                  { icon: '📚', label: '5 Note Sets', desc: 'Comprehensive notes' },
                  { icon: '❓', label: '8+ MCQs', desc: 'Practice questions' },
                  { icon: '📄', label: 'PDF Resources', desc: 'Free downloads' },
                  { icon: '🔬', label: 'Drug Mechanisms', desc: 'Explanations' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`p-3 sm:p-4 rounded-2xl text-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-slate-200'}`}
                  >
                    <span className="text-xl sm:text-2xl block mb-1">{item.icon}</span>
                    <p className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</p>
                    <p className={`text-xs ${sectionClass} hidden sm:block`}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section className={`py-12 sm:py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">📬</span>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 sm:mb-4 ${headingClass}`}>Stay Updated</h2>
          <p className={`text-sm sm:text-lg mb-6 sm:mb-8 ${sectionClass}`}>
            Get the latest drug approvals, pharmacology insights, and study resources weekly.
          </p>
          {subscribed ? (
            <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-5 py-4 rounded-2xl text-base font-medium">
              ✅ Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={`flex-1 px-4 py-3.5 sm:px-5 sm:py-4 rounded-2xl border text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500/30 ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-600 text-white placeholder-slate-400'
                    : 'bg-slate-100 border-slate-300 text-slate-900 placeholder-slate-500'
                }`}
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-2xl transition-all flex-shrink-0 text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className={`text-xs mt-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            No spam, ever. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
