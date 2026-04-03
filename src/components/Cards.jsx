import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../hooks/useBookmarks';

export function DrugCard({ drug }) {
  const { isDark } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(drug.id);

  const cardClass = isDark
    ? 'glass-card hover:border-blue-500/40'
    : 'glass-card-light border-slate-200 hover:border-blue-400/60 shadow-sm hover:shadow-lg';

  return (
    <div className={`relative rounded-2xl border p-4 sm:p-5 card-hover transition-all duration-300 ${cardClass}`}>
      {/* Bookmark Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleBookmark(drug);
        }}
        className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all ${
          bookmarked
            ? 'text-blue-400 bg-blue-500/20'
            : isDark
            ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
        }`}
        title={bookmarked ? 'Remove bookmark' : 'Bookmark drug'}
      >
        <span className="text-sm">{bookmarked ? '🔖' : '🔖'}</span>
      </button>

      {/* Drug Class Badge */}
      <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full mb-2 sm:mb-3 pr-8">
        {drug.drugClassName}
      </span>

      {/* Drug Icon */}
      <div className="text-3xl mb-3">💊</div>

      {/* Name */}
      <h3 className={`text-sm sm:text-base font-bold mb-0.5 sm:mb-1 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {drug.genericName}
      </h3>
      <p className={`text-xs mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        {drug.brandNames.slice(0, 2).join(' / ')}
      </p>
      <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {drug.shortUse}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
        {drug.isTrending && (
          <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-400 text-xs rounded-full font-medium">🔥 Trending</span>
        )}
        {drug.isNew && (
          <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">✨ New</span>
        )}
      </div>

      <Link
        to={`/drug/${drug.id}`}
        className="inline-flex items-center gap-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 rounded-xl transition-all active:scale-95"
      >
        View Details →
      </Link>
    </div>
  );
}

export function DiseaseCard({ disease }) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? 'glass-card hover:border-emerald-500/40'
    : 'glass-card-light border-slate-200 hover:border-emerald-400/60 shadow-sm hover:shadow-lg';

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 card-hover transition-all duration-300 ${cardClass}`}>
      <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full mb-2 sm:mb-3">
        {disease.category}
      </span>
      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🏥</div>
      <h3 className={`text-sm sm:text-base font-bold mb-1 sm:mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {disease.name}
      </h3>
      <p className={`text-xs mb-2 sm:mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        📊 {disease.prevalence}
      </p>
      <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {disease.summary}
      </p>
      <Link
        to={`/disease/${disease.slug}`}
        className="inline-flex items-center gap-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium px-3 py-2 sm:px-4 rounded-xl transition-all active:scale-95"
      >
        Learn More →
      </Link>
    </div>
  );
}

export function NewsCard({ article }) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? 'glass-card hover:border-slate-600'
    : 'glass-card-light border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg';

  return (
    <div className={`rounded-2xl border overflow-hidden card-hover transition-all duration-300 ${cardClass}`}>
      {article.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <span className="bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
            {article.category}
          </span>
          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {article.readTime}
          </span>
        </div>
        <h3 className={`text-xs sm:text-sm font-bold mb-2 leading-snug line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {article.title}
        </h3>
        <p className={`text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {article.summary}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            📅 {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <div className="flex gap-1">
            {article.tags.slice(0, 1).map((tag) => (
              <span key={tag} className={`text-xs px-1.5 py-0.5 rounded-full ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DrugClassCard({ cls }) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? 'glass-card hover:border-blue-500/40'
    : 'glass-card-light border-slate-200 hover:border-blue-400/60 shadow-sm hover:shadow-lg';

  return (
    <Link to={`/class/${cls.id}`}>
      <div className={`rounded-2xl border p-4 sm:p-5 card-hover transition-all duration-300 group h-full ${cardClass}`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center text-xl sm:text-2xl mb-3 sm:mb-4`}>
          {cls.icon}
        </div>
        <h3 className={`text-sm sm:text-base font-bold mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {cls.name}
        </h3>
        <p className={`text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {cls.description}
        </p>
        <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {cls.drugCount > 0 ? `${cls.drugCount} drugs →` : 'View class →'}
        </span>
      </div>
    </Link>
  );
}
