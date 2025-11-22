import React, { useEffect, useState } from 'react';
import { FileData } from '../types';

interface ModalProps {
  file: FileData | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Modal: React.FC<ModalProps> = ({ file, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Reset loading state when file changes
  useEffect(() => {
    setIsLoading(true);
  }, [file]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className="relative w-full h-full md:max-w-6xl md:h-[90vh] flex flex-col justify-center pointer-events-none">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 text-white/50 hover:text-white transition-colors p-2 bg-black/20 rounded-full backdrop-blur-sm pointer-events-auto"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {hasPrev && (
          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 md:left-[-60px] top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-brand-gold transition-colors p-2 pointer-events-auto"
          >
            <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {hasNext && (
          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 md:right-[-60px] top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-brand-gold transition-colors p-2 pointer-events-auto"
          >
             <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative p-4 md:p-0 pointer-events-auto">
          
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
               <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"></div>
            </div>
          )}

          {file.type === 'image' ? (
            <img 
              src={file.fullSize} 
              alt={file.name}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)} // Stop spinning on error too
              className={`max-w-full max-h-full object-contain shadow-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              style={{ minHeight: '200px', minWidth: '200px' }} // Prevent 0x0 collapse
            />
          ) : (
            <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl md:max-h-[80vh] max-h-[60vh] relative z-10 aspect-video">
                <iframe 
                  src={`https://drive.google.com/file/d/${file.id}/preview`}
                  className="w-full h-full border-none"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={file.name}
                  onLoad={() => setIsLoading(false)}
                />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 md:mt-6 text-center z-10 pointer-events-auto">
             <h3 className="text-brand-cream font-serif text-xl md:text-2xl tracking-wide">
                {file.name.replace(/\.(jpg|png|pdf|mov|mp4|HEIC)$/i, '')}
             </h3>
             <div className="flex gap-4 justify-center mt-3">
               {file.type === 'pdf' && (
                   <a 
                      href={`https://drive.google.com/uc?export=download&id=${file.id}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block text-brand-gold text-xs uppercase tracking-widest hover:text-white transition-colors border border-brand-gold/50 px-4 py-2 rounded-sm"
                   >
                       Download PDF
                   </a>
               )}
               {file.type === 'video' && (
                   <a 
                      href={`https://drive.google.com/file/d/${file.id}/view`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block text-brand-gold text-xs uppercase tracking-widest hover:text-white transition-colors border border-brand-gold/50 px-4 py-2 rounded-sm flex items-center gap-2"
                   >
                       <span>Watch on Drive</span>
                       <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                       </svg>
                   </a>
               )}
             </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;