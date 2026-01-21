import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-12 px-4 gap-6 bg-white mt-auto">
      <div className="w-full max-w-7xl flex flex-wrap justify-center md:justify-between items-center gap-4 text-[10px] md:text-xs text-black/60 uppercase tracking-widest">
        <div className="flex gap-4">
          <a href="https://yeezy.com/" className="hover:text-black transition-colors">Yeezy</a>
        </div>

        <div className="flex gap-4">
          <span>© 2026 YZY LOVE</span>
        </div>
      </div>
    </footer>
  );
};