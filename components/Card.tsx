
import React, { useState } from 'react';
import { TarotCardData } from '../types';

interface CardProps {
  data: TarotCardData;
  isRevealed: boolean;
  isReversed: boolean;
  onClick?: () => void;
  index: number;
}

const getCardImageUrl = (data: TarotCardData) => {
    // Using Sacred Texts archive for standard Rider-Waite-Smith deck images.
    const baseUrl = 'https://www.sacred-texts.com/tarot/pkt/img';
    const filename = `${data.id}.jpg`;
    
    return `${baseUrl}/${filename}`;
};

export const Card: React.FC<CardProps> = ({ data, isRevealed, isReversed, onClick, index }) => {
  const imageUrl = getCardImageUrl(data);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`group relative w-40 h-64 md:w-60 md:h-96 cursor-pointer perspective-1000 transition-all duration-500 hover:scale-105 z-10`}
      onClick={onClick}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div 
        className={`relative w-full h-full duration-1000 card-preserve-3d transition-transform ease-in-out ${isRevealed ? 'rotate-y-180' : ''}`}
      >
        {/* Back of Card */}
        <div className="absolute w-full h-full card-backface-hidden rounded-xl border-2 border-mystic-600 bg-mystic-800 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* Elegant Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-mystic-accent via-transparent to-transparent"></div>
            <div className="w-4/5 h-5/6 border border-mystic-700/50 rounded-lg flex items-center justify-center">
                 <span className="text-5xl opacity-40 filter grayscale">🔮</span>
            </div>
            {/* Inner border */}
            <div className="absolute inset-2 border border-mystic-700/30 rounded-lg pointer-events-none"></div>
        </div>

        {/* Front of Card */}
        <div 
          className={`absolute w-full h-full card-backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.2)] bg-black border border-mystic-accent/50`}
        >
          <div className={`w-full h-full flex flex-col ${isReversed ? 'rotate-180' : ''}`}>
             <div className="relative flex-grow overflow-hidden bg-black flex items-center justify-center">
                 {!imageError ? (
                   <img 
                      src={imageUrl} 
                      alt={data.name_en}
                      className="w-full h-full object-fill transition-transform duration-[5s] group-hover:scale-110"
                      loading="eager"
                      onError={() => setImageError(true)}
                   />
                 ) : (
                   <div className="flex flex-col items-center justify-center text-center p-2 h-full w-full bg-mystic-900">
                      <span className="text-4xl mb-2">🃏</span>
                      <span className="text-mystic-300 font-serif text-sm font-bold">{data.name_vi}</span>
                   </div>
                 )}
                 {/* Glossy overlay effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
             </div>
             
             {/* Footer with card name */}
             <div className={`py-1.5 text-center bg-mystic-900/95 absolute bottom-0 w-full border-t border-mystic-700/50 ${isReversed ? 'rotate-180' : ''}`}>
                <h3 className="text-xs font-serif font-bold text-mystic-accent tracking-widest uppercase drop-shadow-md">{data.name_vi}</h3>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
