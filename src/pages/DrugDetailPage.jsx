import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useBookmarks } from '../hooks/useBookmarks';
import { getDrugById, getRelatedDrugs } from '../utils/dataHelpers';
import { DrugCard } from '../components/Cards';

function Section({ title, icon, children, isDark }) {
  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function ListItems({ items, isDark, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    red: 'bg-rose-500',
    amber: 'bg-amber-500',
  };
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          <span className={`w-1.5 h-1.5 ${colorMap[color] || 'bg-blue-500'} rounded-full mt-1.5 flex-shrink-0`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function InfoBadge({ label, value, isDark }) {
  return (
    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-200'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</p>
      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

export default function DrugDetailPage() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [drug, setDrug] = useState(null);
  const [relatedDrugs, setRelatedDrugs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const found = getDrugById(id);
    setDrug(found);
    if (found) setRelatedDrugs(getRelatedDrugs(found));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!drug) {
    return (
      <div className={`min-h-screen flex items-center justify-center pt-16 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <div className="text-center">
          <span className="text-6xl block mb-4">💊</span>
          <h2 className="text-2xl font-bold mb-2">Drug Not Found</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>The drug you're looking for doesn't exist in our database.</p>
          <Link to="/search" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-500 transition-colors">
            Browse All Drugs
          </Link>
        </div>
      </div>
    );
  }

  const bookmarked = isBookmarked(drug.id);
  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pharmacology', label: 'Pharmacology' },
    { id: 'dosage', label: 'Dosage' },
    { id: 'interactions', label: 'Interactions' },
    { id: 'counselling', label: 'Patient Info' },
    { id: 'faq', label: 'FAQ' },
  ];

  const pregnancyColor = drug.pregnancySafety?.includes('B')
    ? 'text-emerald-400 bg-emerald-500/20'
    : drug.pregnancySafety?.includes('C')
    ? 'text-amber-400 bg-amber-500/20'
    : drug.pregnancySafety?.includes('X')
    ? 'text-rose-400 bg-rose-500/20'
    : 'text-slate-400 bg-slate-500/20';

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gradient-to-r from-blue-900/30 to-slate-900 border-b border-slate-800' : 'bg-gradient-to-r from-blue-50 to-white border-b border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {/* Breadcrumb - hidden on tiny screens to save space */}
          <div className={`hidden sm:flex items-center gap-2 text-sm mb-6 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:text-blue-400">Drugs</Link>
            <span>/</span>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>{drug.genericName}</span>
          </div>

          {/* Drug Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                💊
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
                    {drug.drugClassName}
                  </span>
                  {drug.isTrending && (
                    <span className="text-xs px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded-full font-semibold">🔥 Trending</span>
                  )}
                  {drug.isNew && (
                    <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold">✨ New</span>
                  )}
                </div>
                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{drug.genericName}</h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {drug.brandNames.join(' · ')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {drug.shortUse}
              </p>
              <button
                onClick={() => toggleBookmark(drug)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex-shrink-0 ${
                  bookmarked
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 border border-slate-700'
                    : 'bg-white text-slate-700 border border-slate-300'
                }`}
              >
                🔖 {bookmarked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Quick Info Grid — 2 cols on mobile, 3 on sm, 6 on lg */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mt-5 sm:mt-8">
            <InfoBadge label="Half-Life" value={drug.halfLife} isDark={isDark} />
            <InfoBadge label="Route" value={drug.routeOfAdministration[0]} isDark={isDark} />
            <InfoBadge
              label="Pregnancy"
              value={<span className={`text-xs font-bold px-2 py-0.5 rounded-full ${pregnancyColor}`}>{drug.pregnancySafety?.split(' — ')[0]}</span>}
              isDark={isDark}
            />
            <InfoBadge label="Class" value={drug.drugClassName.split(' ')[0]} isDark={isDark} />
            <InfoBadge label="Forms" value={drug.dosageForms.length + ' forms'} isDark={isDark} />
            <InfoBadge label="Storage" value={drug.storageConditions.split('.')[0].slice(0, 40) + '...'} isDark={isDark} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`sticky top-16 z-30 border-b ${isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur-xl' : 'bg-white/95 border-slate-200 backdrop-blur-xl'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-thin gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              <Section title="Indications (Uses)" icon="✅" isDark={isDark}>
                <ListItems items={drug.indications} isDark={isDark} color="green" />
              </Section>
              <Section title="Contraindications" icon="🚫" isDark={isDark}>
                <ListItems items={drug.contraindications} isDark={isDark} color="red" />
              </Section>
              <Section title="Side Effects" icon="⚠️" isDark={isDark}>
                <ListItems items={drug.sideEffects} isDark={isDark} color="amber" />
              </Section>
            </div>
            <div className="space-y-6">
              <Section title="Dosage Forms" icon="💊" isDark={isDark}>
                <div className="flex flex-wrap gap-2">
                  {drug.dosageForms.map((form) => (
                    <span key={form} className={`text-xs px-3 py-1.5 rounded-full ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                      {form}
                    </span>
                  ))}
                </div>
              </Section>
              <Section title="Storage Conditions" icon="🗄️" isDark={isDark}>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{drug.storageConditions}</p>
              </Section>
              <Section title="Monitoring Parameters" icon="📊" isDark={isDark}>
                <ListItems items={drug.monitoringParameters} isDark={isDark} color="blue" />
              </Section>
            </div>
          </div>
        )}

        {/* PHARMACOLOGY TAB */}
        {activeTab === 'pharmacology' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            <Section title="Mechanism of Action" icon="🔬" isDark={isDark}>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{drug.mechanismOfAction}</p>
            </Section>
            <div className="space-y-6">
              <Section title="Pharmacokinetics" icon="📈" isDark={isDark}>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Half-Life (t½)</p>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{drug.halfLife}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Route</p>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{drug.routeOfAdministration.join(', ')}</p>
                  </div>
                </div>
              </Section>
              <Section title="Pregnancy Safety" icon="🤰" isDark={isDark}>
                <div className={`px-4 py-3 rounded-xl text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <span className={`inline-block font-bold px-3 py-1 rounded-full text-sm mb-3 ${pregnancyColor}`}>
                    {drug.pregnancySafety?.split(' — ')[0]}
                  </span>
                  <p className="mt-2 leading-relaxed">{drug.pregnancySafety}</p>
                </div>
              </Section>
            </div>
          </div>
        )}

        {/* DOSAGE TAB */}
        {activeTab === 'dosage' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <Section title="Adult Dose" icon="👨" isDark={isDark}>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{drug.adultDose}</p>
            </Section>
            <Section title="Pediatric Dose" icon="👶" isDark={isDark}>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{drug.pediatricDose}</p>
            </Section>
            <Section title="Dosage Forms Available" icon="💊" isDark={isDark}>
              <div className="flex flex-wrap gap-2">
                {drug.dosageForms.map((form) => (
                  <span key={form} className={`text-xs px-3 py-1.5 rounded-full ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                    {form}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* INTERACTIONS TAB */}
        {activeTab === 'interactions' && (
          <div className="animate-fade-in">
            <Section title="Drug Interactions" icon="⚡" isDark={isDark}>
              <div className="space-y-3">
                {drug.drugInteractions.map((interaction, i) => {
                  const [drugName, ...rest] = interaction.split(':');
                  return (
                    <div key={i} className={`p-4 rounded-xl border-l-4 border-amber-500 ${isDark ? 'bg-amber-500/5' : 'bg-amber-50'}`}>
                      <p className={`text-sm font-bold mb-1 ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>{drugName}</p>
                      {rest.length > 0 && (
                        <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{rest.join(':')}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>
          </div>
        )}

        {/* COUNSELLING TAB */}
        {activeTab === 'counselling' && (
          <div className="space-y-6 animate-fade-in">
            <Section title="Patient Counselling Points" icon="💬" isDark={isDark}>
              <div className="space-y-3">
                {drug.patientCounselling.map((point, i) => (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl ${isDark ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                    <span className="text-emerald-500 font-bold text-sm flex-shrink-0 mt-0.5">{i + 1}.</span>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{point}</p>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Monitoring Parameters" icon="📊" isDark={isDark}>
              <ListItems items={drug.monitoringParameters} isDark={isDark} color="blue" />
            </Section>
          </div>
        )}

        {/* FAQ TAB */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl animate-fade-in">
            <div className="space-y-4">
              {drug.faq.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full text-left p-5 flex items-center justify-between gap-4 transition-colors ${
                      isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {item.question}
                    </span>
                    <span className={`text-xl flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className={`px-5 pb-5 text-sm leading-relaxed animate-fade-in ${isDark ? 'text-slate-300 bg-slate-800/30' : 'text-slate-600 bg-slate-50'}`}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Drugs */}
        {relatedDrugs.length > 0 && (
          <div className="mt-14">
            <h2 className={`text-2xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Related Drugs ({drug.drugClassName})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedDrugs.map((d) => (
                <DrugCard key={d.id} drug={d} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
