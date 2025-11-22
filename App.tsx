import React, { useState, useMemo, useEffect } from 'react';
import { Category, FileData, NavItem } from './types';
import { ALL_FILES } from './constants';
import FileCard from './components/FileCard';
import Modal from './components/Modal';

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', value: Category.HOME },
  { label: 'Stay', value: Category.ACCOMMODATION },
  { label: 'Dine', value: Category.DINING },
  { label: 'Experience', value: Category.EXPERIENCES },
  { label: 'Gallery', value: Category.GALLERY },
  { label: 'Info', value: Category.INFO },
];

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.HOME);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Image Rotation Logic
  const heroImages = useMemo(() => [
    ALL_FILES.find(f => f.name.includes('Infinity Pool') && f.type === 'image'),
    ALL_FILES.find(f => f.name.includes('Resort View') && f.type === 'image'),
    ALL_FILES.find(f => f.name.includes('Mount Agung View') && f.type === 'image'),
  ].filter(Boolean) as FileData[], []);

  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (activeCategory !== Category.HOME) return;
    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeCategory, heroImages.length]);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data Logic
  const { filteredFiles, subCategories } = useMemo(() => {
    let data = ALL_FILES;

    // 1. Main Category Filter
    if (activeCategory !== Category.HOME) {
      const keywords: Record<Category, string[]> = {
        [Category.HOME]: [],
        [Category.ACCOMMODATION]: ['Room Category', 'Standar Room', 'Deluxe Room', 'Suite', 'Bungalow', 'Standard Room'],
        [Category.DINING]: ['Edelweiess Restaurant', 'Foto Makanan', 'MENU', 'Table Manner', 'Cooking'],
        [Category.EXPERIENCES]: ['TAV Experiences', 'WELLNESS', 'CULTURAL', 'NATURE', 'ADVENTURE'],
        [Category.GALLERY]: ['TAV Photo', 'GALLERY PHOTO', 'Areal', 'Infinity Pool', 'Mountain View'],
        [Category.INFO]: ['TAV Information', 'Welcome', 'Transport'],
      };
      const currentKeywords = keywords[activeCategory];
      data = data.filter(file => currentKeywords.some(k => file.path.includes(k)));
    }

    // 2. Search Filter
    if (searchQuery) {
      data = data.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        file.path.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Extract Subcategories (Groups)
    const subs = new Set<string>();
    data.forEach(file => {
        const parts = file.path.split('/');
        // Use the last folder name as the sub-category
        const folder = parts[parts.length - 1];
        if (folder) subs.add(folder);
    });
    const sortedSubs = Array.from(subs).sort();

    // 4. Subcategory Filter
    if (activeSubCategory !== 'All') {
        data = data.filter(file => file.path.endsWith(activeSubCategory));
    }

    return { filteredFiles: data, subCategories: sortedSubs };
  }, [activeCategory, searchQuery, activeSubCategory]);

  // Reset subcategory on category change
  useEffect(() => {
    setActiveSubCategory('All');
    setMobileMenuOpen(false);
    window.scrollTo(0,0);
  }, [activeCategory]);

  // Modal Navigation
  const selectedFileIndex = useMemo(() => 
    filteredFiles.findIndex(f => f.id === selectedFileId), 
  [filteredFiles, selectedFileId]);
  
  const selectedFile = selectedFileIndex >= 0 ? filteredFiles[selectedFileIndex] : null;

  const handleNext = () => {
    if (selectedFileIndex < filteredFiles.length - 1) {
      setSelectedFileId(filteredFiles[selectedFileIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (selectedFileIndex > 0) {
      setSelectedFileId(filteredFiles[selectedFileIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans selection:bg-brand-gold selection:text-white">
      
      {/* Navigation */}
      <header 
        className={`fixed w-full z-40 transition-all duration-500 ${
          isScrolled || mobileMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="cursor-pointer z-50 group" 
            onClick={() => setActiveCategory(Category.HOME)}
          >
            <h1 className={`font-serif text-2xl md:text-3xl font-semibold tracking-tight transition-colors ${
               (activeCategory === Category.HOME && !isScrolled && !mobileMenuOpen) ? 'text-white' : 'text-brand-dark'
            }`}>
              TAPA AGUNG
            </h1>
            <p className={`text-[10px] uppercase tracking-[0.3em] transition-colors group-hover:text-brand-gold ${
               (activeCategory === Category.HOME && !isScrolled && !mobileMenuOpen) ? 'text-white/80' : 'text-brand-gold'
            }`}>
              View By Pramana
            </p>
          </div>

          {/* Desktop Menu */}
          <nav className={`hidden md:flex space-x-10 ${
             (activeCategory === Category.HOME && !isScrolled) ? 'text-white' : 'text-brand-dark'
          }`}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.value}
                onClick={() => { setActiveCategory(item.value); setSearchQuery(''); }}
                className={`text-xs uppercase tracking-widest font-medium hover:text-brand-gold transition-all relative py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-brand-gold after:transition-all after:duration-300 ${
                  activeCategory === item.value ? 'after:w-full text-brand-gold' : 'after:w-0'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2 bg-brand-dark' : ((activeCategory === Category.HOME && !isScrolled) ? 'bg-white' : 'bg-brand-dark')}`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ((activeCategory === Category.HOME && !isScrolled) ? 'bg-white' : 'bg-brand-dark')}`} />
            <div className={`w-6 h-0.5 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2 bg-brand-dark' : ((activeCategory === Category.HOME && !isScrolled) ? 'bg-white' : 'bg-brand-dark')}`} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-brand-cream z-40 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <nav className="flex flex-col space-y-8 text-center">
            {NAV_ITEMS.map(item => (
              <button
                key={item.value}
                onClick={() => { setActiveCategory(item.value); setMobileMenuOpen(false); }}
                className={`font-serif text-3xl ${activeCategory === item.value ? 'text-brand-gold italic' : 'text-brand-dark'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        
        {/* HERO SECTION (Home Only) */}
        {activeCategory === Category.HOME && !searchQuery && (
          <div className="relative h-screen w-full overflow-hidden">
            {heroImages.map((img, index) => (
              <div 
                key={img.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === heroIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img 
                  src={img.thumbnail.replace('w800', 'w1600')} 
                  alt="Hero" 
                  className="w-full h-full object-cover animate-ken-burns"
                />
              </div>
            ))}
            
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <p className="animate-fade-in-up text-xs md:text-sm uppercase tracking-[0.4em] mb-4 text-brand-gold-light">
                The Hidden Gem of Besakih
              </p>
              <h2 className="animate-fade-in-up delay-100 font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
                Majesty of <br/><span className="italic">Mount Agung</span>
              </h2>
              <div className="animate-fade-in-up delay-200 flex flex-col md:flex-row gap-4">
                 <button 
                   onClick={() => setActiveCategory(Category.ACCOMMODATION)}
                   className="px-8 py-3 border border-white hover:bg-white hover:text-brand-dark transition-colors uppercase tracking-widest text-xs"
                 >
                   View Accommodations
                 </button>
                 <button 
                   onClick={() => setActiveCategory(Category.DINING)}
                   className="px-8 py-3 bg-brand-gold text-white border border-brand-gold hover:bg-brand-dark hover:border-brand-dark transition-colors uppercase tracking-widest text-xs"
                 >
                   Edelweiss Dining
                 </button>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/70">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className={`flex-grow ${activeCategory === Category.HOME && !searchQuery ? 'pt-20' : 'pt-32'} pb-20 px-4 md:px-8 max-w-[1600px] mx-auto w-full`}>
          
          {/* Search & Header for Inner Pages */}
          {(activeCategory !== Category.HOME || searchQuery) && (
            <div className="mb-12 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-brand-dark/10 pb-6 gap-6">
                <div>
                   <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-2">
                     {activeCategory === Category.HOME ? 'Search Results' : activeCategory}
                   </h2>
                   <p className="text-gray-500 font-light">
                     Explore our collection of {activeCategory.toLowerCase()}.
                   </p>
                </div>
                <div className="w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-64 bg-transparent border-b border-gray-300 focus:border-brand-gold py-2 outline-none text-brand-dark font-serif placeholder:font-sans placeholder:text-xs placeholder:uppercase placeholder:tracking-wider"
                  />
                </div>
              </div>

              {/* Sub-category Pills */}
              {!searchQuery && subCategories.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                    onClick={() => setActiveSubCategory('All')}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all border ${
                      activeSubCategory === 'All' 
                        ? 'bg-brand-dark text-white border-brand-dark' 
                        : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-dark hover:text-brand-dark'
                    }`}
                  >
                    All
                  </button>
                  {subCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubCategory(sub)}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all border ${
                        activeSubCategory === sub 
                          ? 'bg-brand-dark text-white border-brand-dark' 
                          : 'bg-transparent text-gray-500 border-gray-200 hover:border-brand-dark hover:text-brand-dark'
                      }`}
                    >
                      {sub.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* HOME: Featured Grid */}
          {activeCategory === Category.HOME && !searchQuery && (
            <div className="space-y-24">
              {/* Intro */}
              <section className="text-center max-w-3xl mx-auto">
                 <span className="text-brand-gold text-xs uppercase tracking-widest block mb-4">Nature's Theater</span>
                 <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6 leading-relaxed">
                   "Perched in the cool highlands of Menanga, offering an unhindered panorama of Bali's sacred volcano."
                 </h3>
                 <p className="text-gray-600 font-light leading-loose">
                   Experience the breathtaking beauty of Besakih at Tapa Agung View. Immerse yourself in our signature bamboo architecture that breathes with the valley, savor authentic local flavors at Edelweiss Restaurant, and find peace in the embrace of nature.
                 </p>
              </section>

              {/* Featured Categories */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-1">
                 {[
                   { title: 'Edelweiss Dining', cat: Category.DINING, imgTerm: 'Dining' },
                   { title: 'Highland Wellness', cat: Category.EXPERIENCES, imgTerm: 'Spa' },
                   { title: 'Events & Weddings', cat: Category.GALLERY, imgTerm: 'Wedding' }
                 ].map((feat, i) => {
                   // Find a suitable image
                   const img = ALL_FILES.find(f => f.type === 'image' && (f.path.includes(feat.imgTerm) || f.name.includes(feat.imgTerm))) || ALL_FILES[i*5];
                   return (
                    <div 
                      key={feat.title}
                      onClick={() => setActiveCategory(feat.cat)} 
                      className="group relative h-[500px] overflow-hidden cursor-pointer"
                    >
                       <img src={img?.thumbnail.replace('w800','w1000') || ''} alt={feat.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                       <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <h4 className="font-serif text-3xl italic mb-2">{feat.title}</h4>
                          <span className="text-[10px] uppercase tracking-[0.2em] border-b border-transparent group-hover:border-white transition-all">Discover</span>
                       </div>
                    </div>
                   )
                 })}
              </section>
            </div>
          )}

          {/* GRID DISPLAY (Masonry layout for gallery feel) */}
          {(activeCategory !== Category.HOME || searchQuery) && (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 animate-slide-up">
               {filteredFiles.map((file) => (
                 <FileCard 
                   key={file.id}
                   file={file}
                   onClick={() => setSelectedFileId(file.id)}
                 />
               ))}
            </div>
          )}

          {/* Empty State */}
          {(activeCategory !== Category.HOME || searchQuery) && filteredFiles.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <p className="font-serif text-xl italic">No items found.</p>
             </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#222] text-brand-cream py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-2xl text-brand-gold mb-2">Tapa Agung View</h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">By Pramana Experience</p>
            <p className="text-xs text-white/40 font-light max-w-xs">
              Jl. Raya Besakih, Menanga, Kec. Rendang,<br/>
              Kabupaten Karangasem, Bali 80863
            </p>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-white/60">
            <span className="hover:text-brand-gold cursor-pointer">Instagram</span>
            <span className="hover:text-brand-gold cursor-pointer">Facebook</span>
            <span className="hover:text-brand-gold cursor-pointer">Contact</span>
          </div>
          <div className="text-white/40 text-xs font-light">
            &copy; {new Date().getFullYear()} Tapa Agung View.
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <Modal 
        file={selectedFile} 
        onClose={() => setSelectedFileId(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={selectedFileIndex < filteredFiles.length - 1}
        hasPrev={selectedFileIndex > 0}
      />
    </div>
  );
};

export default App;