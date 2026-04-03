import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem('pharmasphere-bookmarks');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pharmasphere-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (drug) => {
    setBookmarks((prev) => {
      if (prev.find((d) => d.id === drug.id)) return prev;
      return [...prev, drug];
    });
  };

  const removeBookmark = (drugId) => {
    setBookmarks((prev) => prev.filter((d) => d.id !== drugId));
  };

  const isBookmarked = (drugId) => bookmarks.some((d) => d.id === drugId);

  const toggleBookmark = (drug) => {
    if (isBookmarked(drug.id)) {
      removeBookmark(drug.id);
    } else {
      addBookmark(drug);
    }
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
