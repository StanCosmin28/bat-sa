import React, { useState, useMemo } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Search, FilterX, Command, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Products = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique category labels from the data
  const categories = ['All', ...new Set(products.map(p => p.categoryLabel))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.categoryLabel === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.info.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-32 bg-[#fafcff] min-h-screen pb-32">
      
      {/* Premium Hero Header */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-16 mb-12 lg:mb-16 border-b border-gray-100 pb-12 lg:pb-16">
        <AnimatedSection className="max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-bat-blue/20 bg-bat-blue/5 text-bat-blue text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            <Command size={14} /> {language === 'ro' ? 'Catalog Produse' : 'Product Catalog'}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-bat-navy mb-6 tracking-tight leading-[1.05]">
            {t('products.title') || "Intelligent Control Modules"}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed">
            {t('products.desc') || "Discover our premium range of acquisition, variation, and control modules designed for centralized building management."}
          </p>
        </AnimatedSection>
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-32 self-start flex flex-col gap-8 lg:gap-10">
          
          {/* Search Bar */}
          <div>
            <h3 className="hidden lg:block text-xs font-black text-bat-navy uppercase tracking-[0.15em] mb-4">
              {language === 'ro' ? 'Cauta Modul' : 'Search Modules'}
            </h3>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search size={16} className="text-gray-400 group-focus-within:text-bat-blue transition-colors" />
              </div>
              <input
                type="text"
                placeholder={t('products.placeholder') || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-bat-blue focus:ring-4 focus:ring-bat-blue/10 transition-all placeholder:text-gray-400 text-bat-navy shadow-sm"
              />
            </div>
          </div>

          {/* Category List */}
          <div>
            <h3 className="hidden lg:block text-xs font-black text-bat-navy uppercase tracking-[0.15em] mb-4">
              {language === 'ro' ? 'Categorii' : 'Categories'}
            </h3>
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-1.5 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`group flex items-center justify-center lg:justify-between whitespace-nowrap px-5 py-2.5 lg:py-3.5 rounded-full lg:rounded-2xl text-[11px] sm:text-xs lg:text-sm font-bold transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-bat-navy text-white border-bat-navy shadow-md'
                      : 'bg-white lg:bg-transparent text-gray-500 border-gray-200 lg:border-transparent hover:bg-white hover:text-bat-navy lg:hover:border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <span className="uppercase tracking-wider lg:normal-case lg:tracking-normal">{cat === 'All' ? t('cat.all') : cat}</span>
                  {activeCategory === cat && (
                    <ChevronRight size={16} className="hidden lg:block text-white/70" />
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <motion.div layout className="min-h-[600px]">
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 md:gap-8"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      key={product.key}
                      className="h-full"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 lg:py-32 bg-white rounded-3xl border border-dashed border-gray-200 px-6"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#fafcff] rounded-full flex items-center justify-center text-gray-300 mb-6">
                    <FilterX size={28} className="lg:w-8 lg:h-8" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-bat-navy mb-3 text-center">{t('products.noneTitle') || "No modules found"}</h3>
                  <p className="text-sm lg:text-base text-gray-500 mb-8 max-w-md text-center">{t('products.noneBody') || "We couldn't find any modules matching your current search criteria. Please try adjusting your filters."}</p>
                  <button
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="bg-bat-navy text-white font-bold py-3 px-6 lg:py-3.5 lg:px-8 text-xs lg:text-sm uppercase tracking-wider rounded-full hover:bg-bat-blue transition-colors hover:shadow-lg"
                  >
                    {t('products.noneClear') || "Clear all filters"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Products;
