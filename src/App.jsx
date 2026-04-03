import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DrugDetailPage = lazy(() => import('./pages/DrugDetailPage'));
const DrugClassPage = lazy(() => import('./pages/DrugClassPage'));
const DiseasePage = lazy(() => import('./pages/DiseasePage'));
const DiseasesListPage = lazy(() => import('./pages/DiseasesListPage'));
const NewsPage = lazy(() => import('./pages/NewsPage'));
const StudentCornerPage = lazy(() => import('./pages/StudentCornerPage'));
const BookmarksPage = lazy(() => import('./pages/BookmarksPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl animate-pulse" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/drug/:id" element={<DrugDetailPage />} />
            <Route path="/class/:name" element={<DrugClassPage />} />
            <Route path="/classes" element={<DrugClassPage />} />
            <Route path="/disease/:name" element={<DiseasePage />} />
            <Route path="/diseases" element={<DiseasesListPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/student" element={<StudentCornerPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white pt-16">
                <div className="text-center">
                  <p className="text-8xl mb-6">💊</p>
                  <h1 className="text-5xl font-extrabold mb-4">404</h1>
                  <p className="text-slate-400 mb-8">Page not found</p>
                  <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-500 transition-colors">
                    Back to Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
