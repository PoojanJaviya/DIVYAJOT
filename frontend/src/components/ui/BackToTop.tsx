import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-teal-500 hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 z-40"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
};

export default BackToTop;
