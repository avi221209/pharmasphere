import { useTheme } from '../context/ThemeContext';
import { DiseaseCard } from '../components/Cards';
import { getAllDiseases } from '../utils/dataHelpers';

export default function DiseasesListPage() {
  const { isDark } = useTheme();
  const diseases = getAllDiseases();

  const categories = [...new Set(diseases.map((d) => d.category))];
  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-emerald-50 to-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">🏥</span>
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Disease Library
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Clinical summaries with symptoms, causes, diagnosis, treatment, and prevention
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Diseases Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease) => (
            <DiseaseCard key={disease.id} disease={disease} />
          ))}
        </div>
      </div>
    </div>
  );
}
