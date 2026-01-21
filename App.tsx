import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { GridItem } from './components/GridItem';
import { ItemModal } from './components/ItemModal';
import { YE_ITEMS } from './constants';
import { YeItem } from './types';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<YeItem | null>(null);
  const [colCount, setColCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setColCount(6);
      } else if (window.innerWidth >= 768) {
        setColCount(4);
      } else {
        setColCount(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (item: YeItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white pt-16">
      <Header
        onMenuClick={() => { }}
        onCartClick={() => { }}
      />

      <main className="w-full px-4 pb-20 overflow-hidden">
        <div
          className="product-grid"
          style={{ '--col-count': colCount } as React.CSSProperties}
        >
          {YE_ITEMS.map((item, index) => {
            const colIndex = index % colCount;
            const animationClass = colIndex % 2 === 0 ? 'fly-down-reverse' : 'fly-up-reverse';
            const delay = `${(index * 0.05)}s`;

            return (
              <GridItem
                key={item.id}
                item={item}
                onClick={handleItemClick}
                animationClass={animationClass}
                style={{ animationDelay: delay }}
              />
            );
          })}
        </div>
      </main>

      <Footer />

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;