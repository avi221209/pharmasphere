import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import studentData from '../data/studentResources.json';

function NoteCard({ note, isDark }) {
  const cardClass = isDark
    ? 'bg-slate-900/60 border-slate-700/60 hover:border-blue-500/40'
    : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md';

  return (
    <div className={`rounded-2xl border p-5 card-hover transition-all ${cardClass}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 ${isDark ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
          {note.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{note.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
              {note.pages}p
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'}`}>
            {note.level}
          </span>
          <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{note.description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{note.subject}</span>
            <button
              onClick={() => window.open(note.downloadUrl, '_blank')}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${isDark ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            >
              📥 Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MCQCard({ mcq, index, isDark }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
  };

  const getOptionStyle = (idx) => {
    if (!showResult) {
      return isDark
        ? 'border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 text-slate-300'
        : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700';
    }
    if (idx === mcq.correct) {
      return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
    }
    if (idx === selected && idx !== mcq.correct) {
      return 'border-rose-500 bg-rose-500/10 text-rose-400';
    }
    return isDark ? 'border-slate-700 text-slate-500' : 'border-slate-200 text-slate-400';
  };

  return (
    <div className={`rounded-2xl border p-6 ${isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex items-start gap-3 mb-5">
        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>
          {index + 1}
        </span>
        <p className={`text-sm font-semibold leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'}`}>{mcq.question}</p>
      </div>

      <div className="space-y-2">
        {mcq.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm cursor-pointer transition-all ${getOptionStyle(idx)}`}
          >
            <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
            {option}
            {showResult && idx === mcq.correct && ' ✓'}
            {showResult && idx === selected && idx !== mcq.correct && ' ✗'}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`mt-4 p-4 rounded-xl text-sm leading-relaxed ${isDark ? 'bg-blue-500/10 border border-blue-500/20 text-slate-300' : 'bg-blue-50 border border-blue-200 text-slate-700'}`}>
          <strong className={isDark ? 'text-blue-400' : 'text-blue-700'}>💡 Explanation:</strong>{' '}
          {mcq.explanation}
        </div>
      )}

      {!showResult && (
        <p className={`mt-4 text-xs text-center ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          Click an option to reveal the answer
        </p>
      )}
    </div>
  );
}

export default function StudentCornerPage() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('notes');
  const bgClass = isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900';

  const tabs = [
    { id: 'notes', label: '📚 Study Notes', count: studentData.notes.length },
    { id: 'mcq', label: '❓ MCQ Practice', count: studentData.mcqs.length },
    { id: 'pdf', label: '📄 PDF Resources', count: studentData.pdfResources.length },
  ];

  return (
    <div className={`min-h-screen pt-16 ${bgClass}`}>
      {/* Header */}
      <div className={`py-16 ${isDark ? 'bg-gradient-to-b from-blue-900/20 to-slate-950' : 'bg-gradient-to-b from-blue-50 to-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl block mb-4">🎓</span>
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Student Corner
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Your one-stop study hub for pharmacy students. Notes, MCQs, and curated PDF resources.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: '📚', label: 'Note Sets', value: studentData.notes.length },
              { icon: '❓', label: 'MCQ Questions', value: studentData.mcqs.length },
              { icon: '📄', label: 'PDF Resources', value: studentData.pdfResources.length },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`px-5 py-3 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                <span className="text-2xl">{stat.icon}</span>
                <div className="text-left">
                  <p className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}+</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`sticky top-16 z-30 border-b ${isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur-xl' : 'bg-white/95 border-slate-200 backdrop-blur-xl'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {studentData.notes.map((note) => (
                <NoteCard key={note.id} note={note} isDark={isDark} />
              ))}
            </div>
          </div>
        )}

        {/* MCQ TAB */}
        {activeTab === 'mcq' && (
          <div className="animate-fade-in" id="mcq">
            <div className={`mb-8 p-5 rounded-2xl border flex items-center gap-4 ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <span className="text-3xl">💡</span>
              <div>
                <p className={`font-bold ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>How to Use</p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Click any option to reveal the correct answer with a detailed explanation. Each question covers core pharmacology concepts.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studentData.mcqs.map((mcq, i) => (
                <MCQCard key={mcq.id} mcq={mcq} index={i} isDark={isDark} />
              ))}
            </div>
          </div>
        )}

        {/* PDF TAB */}
        {activeTab === 'pdf' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {studentData.pdfResources.map((resource) => (
                <div
                  key={resource.id}
                  className={`rounded-2xl border p-6 card-hover transition-all ${isDark ? 'bg-slate-900/60 border-slate-700/60 hover:border-blue-500/40' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'}`}
                >
                  <div className="text-4xl mb-4">📄</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                    {resource.type}
                  </span>
                  <h3 className={`text-base font-bold mt-3 mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {resource.title}
                  </h3>
                  <p className={`text-sm mb-5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {resource.description}
                  </p>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    📥 Download / View
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
