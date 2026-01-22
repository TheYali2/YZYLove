import React from 'react';
import { LogoIcon } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onCartClick }) => {
  return (
    <nav className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between px-4 mix-blend-difference text-black md:px-6 bg-white/0">
      <div className="flex items-center gap-4">
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <LogoIcon />
      </div>
    </nav>
  );
};
