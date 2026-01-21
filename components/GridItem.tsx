import React from 'react';
import { YeItem } from '../types';

interface GridItemProps {
  item: YeItem;
  onClick: (item: YeItem) => void;
  animationClass: string;
  style?: React.CSSProperties;
}

export const GridItem: React.FC<GridItemProps> = ({ item, onClick, animationClass, style }) => {
  return (
    <div 
      onClick={() => onClick(item)}
      className={`product-item group ${animationClass}`}
      style={style}
    >
      <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden bg-transparent">
        <img 
          src={item.image} 
          alt={item.name}
          className="product-image w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 z-10 mix-blend-difference">
            <span className="font-mono text-xs md:text-sm font-bold text-white tracking-tighter bg-black/20 backdrop-blur-sm px-1">
                {item.code}
            </span>
        </div>
      </div>
      <div className="product-label opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {item.name}
      </div>
    </div>
  );
};