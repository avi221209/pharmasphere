import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getDiseaseBySlug, getDrugById } from '../utils/dataHelpers';

function InfoSection({ icon, title, items, isDark, color = 'blue' }) {
  const colors = {
    blue: 'border-blue-500 bg-blue-500/5',
    green: 'border-emerald-500 bg-emerald-500/5',
    amber: 'border-amber-500 bg-amber-500/5',
    rose: 'border-rose-500 bg-rose-500/5',
    purple: 'border-purple-500 bg-purple-500/5',
  };

  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        <span>{icon}</span>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 p-3 rounded-xl border-l-4 ${colors[color]}`}
          >
            <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${color === 'blue' ? 'bg-blue-500' : color === 'green' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : color === 'rose' ? 'bg-rose-500' : 'bg-purple-500'}`}>
              {i + 1}
            </span>
            <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DiseasePage() {
  const { name } = useParams();
  const { isDark } = useTheme();
  const [disease, setDisease] = useState(null);
  const [relatedDrugs, setRelatedDrugs] = useState([]);

  useEffect(() => {
    const found = getDiseaseBySlug(name);
    setDisease(found);
    if (found?.relatedDrugs) {
      setRelatedDrugs(found.relatedDrugs.map((drugId) => getDrugById(drugId)).filter(Boolean));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);

  if (!disease) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-16 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="text-center">
          <span className="text-6xl block mb-4">🏥</span>
          <h2 className="text-2xl font-bold mb-2">Disease Not Found</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>This disease is not in our database yet.</p>
          <Link to="/diseases" className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-500 transition-colors">
            Browse All Diseases
          </Link>
        </div>
      </div>
    );
  }

  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  const categoryColors = {
    Metabolic: 'from-emerald-900/30 to-slate-900',
    Cardiovascular: 'from-red-900/30 to-slate-900',
    Respiratory: 'from-sky-900/30 to-slate-900',
    Neurological: 'from-purple-900/30 to-slate-900',
    Gastrointestinal: 'from-orange-900/30 to-slate-900',
    Endocrine: 'from-pink-900/30 to-slate-900',
    Infectious: 'from-amber-900/30 to-slate-900',
  };

  const headerGrad = isDark
    ? `bg-gradient-to-r ${categoryColors[disease.category] || 'from-blue-900/30 to-slate-900'} border-b border-slate-800`
    : 'bg-gradient-to-r from-blue-50 to-white border-b border-slate-200';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={headerGrad}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Link to="/" className="hover:text-emerald-400">Home</Link>
            <span>/</span>
            <Link to="/diseases" className="hover:text-emerald-400">Diseases</Link>
            <span>/</span>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>{disease.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                {disease.category}
              </span>
              <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {disease.name}
              </h1>
              <p className={`text-base leading-relaxed max-w-2xl mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {disease.summary}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-slate-800/60 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                <span>📊</span>
                <span className="text-sm font-medium">Global Prevalence: {disease.prevalence}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoSection
            icon="🤒"
            title="Symptoms"
            items={disease.symptoms}
            isDark={isDark}
            color="rose"
          />
          <InfoSection
            icon="🔍"
            title="Causes & Risk Factors"
            items={disease.causes}
            isDark={isDark}
            color="amber"
          />
          <InfoSection
            icon="🧬"
            title="Diagnosis"
            items={disease.diagnosis}
            isDark={isDark}
            color="purple"
          />
          <InfoSection
            icon="💉"
            title="Treatment"
            items={disease.treatment}
            isDark={isDark}
            color="blue"
          />
        </div>

        {/* Prevention - Full Width */}
        <div className="mt-6">
          <InfoSection
            icon="🛡️"
            title="Prevention"
            items={disease.prevention}
            isDark={isDark}
            color="green"
          />
        </div>

        {/* Related Drugs */}
        {relatedDrugs.length > 0 && (
          <div className="mt-12">
            <h2 className={`text-2xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              💊 Common Drugs Used in {disease.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedDrugs.map((drug) => (
                <Link key={drug.id} to={`/drug/${drug.id}`}>
                  <div className={`rounded-2xl border p-5 card-hover transition-all ${isDark ? 'glass-card hover:border-blue-500/40' : 'glass-card-light border-slate-200 hover:border-blue-400/60 shadow-sm'}`}>
                    <div className="text-2xl mb-3">💊</div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                      {drug.drugClassName}
                    </span>
                    <h3 className={`text-base font-bold mt-3 mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{drug.genericName}</h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{drug.shortUse}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10">
          <Link
            to="/diseases"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'}`}
          >
            ← Back to Disease Library
          </Link>
        </div>
      </div>
    </div>
  );
}
