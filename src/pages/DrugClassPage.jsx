import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getDrugsByClass, getDrugClassById, getAllDrugClasses } from '../utils/dataHelpers';
import { DrugCard, DrugClassCard } from '../components/Cards';

export default function DrugClassPage() {
  const { name } = useParams();
  const { isDark } = useTheme();
  const [drugs, setDrugs] = useState([]);
  const [drugClass, setDrugClass] = useState(null);
  const allClasses = getAllDrugClasses();

  useEffect(() => {
    if (name) {
      const cls = getDrugClassById(name);
      setDrugClass(cls);
      const found = getDrugsByClass(name);
      setDrugs(found);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);

  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  // If no class name, show all classes
  if (!name) {
    return (
      <div className={`min-h-screen pt-16 ${bgClass}`}>
        <div className={`py-16 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-blue-50 to-slate-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Drug Classes
            </h1>
            <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Browse our complete library of pharmacological drug classifications
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {allClasses.map((cls) => (
              <DrugClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`py-14 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800' : 'bg-gradient-to-b from-blue-50 to-slate-50 border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <span>/</span>
            <Link to="/classes" className="hover:text-blue-400">Drug Classes</Link>
            <span>/</span>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>{drugClass?.name || name}</span>
          </div>

          {drugClass && (
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${drugClass.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                {drugClass.icon}
              </div>
              <div>
                <h1 className={`text-4xl sm:text-5xl font-extrabold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {drugClass.name}
                </h1>
                <p className={`text-lg max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {drugClass.description}
                </p>
                <div className={`mt-4 inline-flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>💊</span>
                  <span>{drugs.length} drug{drugs.length !== 1 ? 's' : ''} in this class</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drugs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {drugs.length > 0 ? (
          <>
            <h2 className={`text-2xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Drugs in this Class
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {drugs.map((drug) => (
                <DrugCard key={drug.id} drug={drug} />
              ))}
            </div>
          </>
        ) : (
          <div className={`py-20 text-center rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white'}`}>
            <span className="text-5xl block mb-4">🚧</span>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Coming Soon</h3>
            <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              We're adding drugs for the <strong>{drugClass?.name}</strong> class. Check back soon!
            </p>
            <Link to="/search" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-500 transition-colors">
              Browse All Drugs
            </Link>
          </div>
        )}

        {/* Other Classes */}
        <div className="mt-16">
          <h2 className={`text-2xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Other Drug Classes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allClasses.filter((c) => c.id !== name).slice(0, 8).map((cls) => (
              <DrugClassCard key={cls.id} cls={cls} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
