import { useTheme } from '../context/ThemeContext';
import { NewsCard } from '../components/Cards';
import newsData from '../data/news.json';

export default function NewsPage() {
  const { isDark } = useTheme();
  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  const categories = [...new Set(newsData.map((a) => a.category))];

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-indigo-50 to-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">📰</span>
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Pharmacy News
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Latest drug approvals, clinical research, global health updates, and pharmacotherapy advances
          </p>
        </div>
      </div>

      {/* Breaking News Banner */}
      <div className={`border-y ${isDark ? 'bg-blue-900/20 border-blue-800/40' : 'bg-blue-50 border-blue-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
            LATEST
          </span>
          <p className={`text-sm font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {newsData[0]?.title}
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Filter:</span>
          {categories.map((cat) => (
            <span
              key={cat}
              className={`px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-blue-500/20 hover:text-blue-400'
                  : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
