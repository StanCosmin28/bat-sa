import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  // Check if current route starts with a light (white) hero
  // Home and Products have white heroes, other pages have dark navy heroes
  const isLightHeroPage = location.pathname === '/' || location.pathname.startsWith('/products');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Close mobile menu on route change
    setIsOpen(false);
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.freedom'), path: '/freedom' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  // Determine text colors based on scroll and hero type
  const isDarkText = scrolled || isLightHeroPage;
  
  const headerClass = `fixed w-full top-0 z-[100] transition-all duration-500 ${
    scrolled
      ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm'
      : 'bg-transparent py-6'
  }`;

  const textClass = isDarkText ? 'text-bat-navy' : 'text-white';
  const textHoverClass = isDarkText ? 'hover:text-bat-blue' : 'hover:text-white/70';
  const logoClass = `text-2xl font-black tracking-tighter transition-colors duration-300 ${textClass}`;

  const buttonClass = `flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
    isDarkText
      ? 'border-gray-200 bg-gray-50 hover:bg-bat-blue hover:text-white hover:border-bat-blue text-bat-navy'
      : 'border-white/20 bg-white/8 hover:bg-white/15 text-white'
  }`;

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-50">
            <span className={logoClass}>B.A.T.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/products' && location.pathname.startsWith('/products/'));
              return (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? (isDarkText ? 'text-bat-blue' : 'text-bat-gold') 
                      : `${textClass} ${textHoverClass}`
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <button 
              onClick={() => {
                const nextLang = lang === 'EN' ? 'FR' : lang === 'FR' ? 'RO' : 'EN';
                setLang(nextLang);
              }}
              className={`hidden md:flex ${buttonClass}`}
            >
              <Globe size={14} />
              <span>{lang}</span>
            </button>

            <button
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border ${
                isDarkText && !isOpen ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className={isDarkText && !isOpen ? 'text-bat-navy' : 'text-white'} />
              ) : (
                <Menu size={20} className={isDarkText ? 'text-bat-navy' : 'text-white'} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-bat-navy/95 backdrop-blur-3xl flex flex-col justify-center px-6 pt-20 pb-10"
          >
            <div className="flex flex-col gap-6 h-full justify-center">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path || (link.path === '/products' && location.pathname.startsWith('/products/'));
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.path}
                  >
                    <Link 
                      to={link.path}
                      className={`flex items-center justify-between text-4xl font-black tracking-tight border-b border-white/10 pb-4 ${
                        isActive ? 'text-bat-gold' : 'text-white/70'
                      }`}
                    >
                      {link.name}
                      <ChevronRight className={isActive ? 'text-bat-gold' : 'text-white/20'} size={32} />
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-8 border-t border-white/10"
              >
                <button 
                  onClick={() => {
                    const nextLang = lang === 'EN' ? 'FR' : lang === 'FR' ? 'RO' : 'EN';
                    setLang(nextLang);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-gray-100 text-gray-800 font-bold w-full"
                >
                  <Globe size={18} />
                  <span>Switch Language ({lang === 'EN' ? 'FR' : lang === 'FR' ? 'RO' : 'EN'})</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
