import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  const footerClass = isDark
    ? 'bg-slate-950 border-slate-800 text-slate-400'
    : 'bg-slate-100 border-slate-200 text-slate-600';

  return (
    <footer className={`border-t mt-auto ${footerClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">Rx</span>
              </div>
              <span className="text-xl font-extrabold gradient-text">PharmaSphere</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your comprehensive global pharmacy knowledge hub. Evidence-based drug information for healthcare students and professionals.
            </p>
            <div className="flex gap-3">
              {['🐦', '📘', '💼', '📺'].map((icon, i) => (
                <button
                  key={i}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all ${
                    isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'
                  } hover:scale-110`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/search', label: 'Drug Database' },
                { to: '/diseases', label: 'Disease Library' },
                { to: '/classes', label: 'Drug Classes' },
                { to: '/news', label: 'Pharmacy News' },
                { to: '/student', label: 'Student Corner' },
                { to: '/bookmarks', label: 'Saved Drugs' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`hover:text-blue-400 transition-colors ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Drug Classes */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Drug Classes
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                'Antibiotics',
                'Antihypertensives',
                'Antidiabetics',
                'Analgesics',
                'Antihistamines',
                'Cardiovascular',
                'CNS Drugs',
              ].map((cls) => (
                <li key={cls}>
                  <Link
                    to={`/classes`}
                    className={`hover:text-blue-400 transition-colors ${isDark ? '' : 'hover:text-blue-600'}`}
                  >
                    {cls}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Legal & Info
            </h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Contact Us', 'Disclaimer', 'Privacy Policy', 'Terms of Use'].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
            <div className={`mt-6 p-3 rounded-xl text-xs ${isDark ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
              ⚠️ <strong>Disclaimer:</strong> Information is for educational purposes only. Always consult a qualified healthcare professional before using any medication.
            </div>
          </div>
        </div>

        <div className={`mt-10 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <p>© {new Date().getFullYear()} PharmaSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with ❤️ for pharmacy students & professionals worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
