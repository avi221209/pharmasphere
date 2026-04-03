import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../hooks/useBookmarks';
import { DrugCard } from '../components/Cards';

export default function BookmarksPage() {
  const { isDark } = useTheme();
  const { bookmarks, removeBookmark } = useBookmarks();

  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`py-14 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-blue-50 to-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-5xl block mb-3">🔖</span>
              <h1 className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Saved Drugs
              </h1>
              <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {bookmarks.length > 0
                  ? `You have ${bookmarks.length} saved drug${bookmarks.length !== 1 ? 's' : ''}`
                  : 'Your saved drugs will appear here'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {bookmarks.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Your Bookmarked Drugs
              </h2>
              <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Click 🔖 on a drug to remove it
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {bookmarks.map((drug) => (
                <DrugCard key={drug.id} drug={drug} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <span className="text-8xl block mb-6">🔖</span>
            <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              No saved drugs yet
            </h2>
            <p className={`text-lg max-w-md mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Start exploring our drug database and click the bookmark icon 🔖 on any drug card to save it here for quick access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-500 transition-all hover:scale-105"
              >
                Browse Drug Database
              </Link>
              <Link
                to="/"
                className={`px-6 py-3 rounded-2xl font-semibold transition-all ${isDark ? 'border border-slate-700 text-slate-300 hover:bg-slate-800' : 'border border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
