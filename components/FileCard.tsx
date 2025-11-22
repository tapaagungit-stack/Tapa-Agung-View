import React from 'react';
import { FileData } from '../types';

interface FileCardProps {
  file: FileData;
  onClick: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative break-inside-avoid mb-6 cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-200 rounded-sm shadow-sm transition-all duration-500 group-hover:shadow-lg">
        
        {/* Content based on type */}
        {file.type === 'image' ? (
          <img 
            src={file.thumbnail?.replace('w800', 'w600')} 
            alt={file.name}
            loading="lazy"
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-[4/3] flex flex-col items-center justify-center bg-brand-cream text-brand-gold p-6 text-center">
            {file.type === 'video' ? (
              <svg className="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            <span className="font-serif text-lg leading-tight text-brand-dark">
              {file.name.replace(/\.(jpg|png|pdf|mov|mp4|HEIC)$/i, '')}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
             <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur text-brand-dark text-xs uppercase tracking-widest font-medium rounded-sm">
               View {file.type === 'pdf' ? 'Document' : file.type === 'video' ? 'Video' : 'Image'}
             </span>
          </div>
        </div>

        {/* Type Indicator (Always visible for non-images, or distinct for video) */}
        {file.type === 'video' && (
           <div className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full backdrop-blur-sm">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
           </div>
        )}
        {file.type === 'pdf' && (
           <div className="absolute top-2 right-2 bg-brand-gold/80 text-white px-2 py-0.5 rounded-sm text-[10px] font-bold backdrop-blur-sm">
             PDF
           </div>
        )}

      </div>
      
      {/* Minimal Title below for images */}
      {file.type === 'image' && (
        <div className="mt-3 opacity-80 group-hover:opacity-100 transition-opacity">
          <h3 className="font-serif text-base text-brand-dark leading-tight">
            {file.name.replace(/\.(jpg|png|pdf|mov|mp4|HEIC)$/i, '')}
          </h3>
        </div>
      )}
    </div>
  );
};

export default FileCard;