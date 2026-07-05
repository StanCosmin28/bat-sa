import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LANG_LABELS = { EN: 'English', FR: 'Français', RO: 'Română', IT: 'Italiano', DE: 'Deutsch' };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);
  const { lang, setLang, t, supportedLangs } = useLanguage();
  const location = useLocation();

  // Close the desktop language dropdown on outside click
  useEffect(() => {
    if (!langMenuOpen) return;
    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  // Check if current route starts with a light (white) hero
  // Home and Products have white heroes, other pages have dark navy heroes
  const isLightHeroPage = location.pathname === '/' || location.pathname.startsWith('/products') || location.pathname === '/contact';

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

  // The hamburger button sits on the header, but once the mobile menu is
  // open, the dark bat-navy/95 overlay shows through wherever the header
  // itself is transparent (unscrolled) — so while open, the button should
  // follow `scrolled` alone, not `isDarkText`. Otherwise on an unscrolled
  // light-hero page (e.g. Home) the icon stayed dark-on-white-bg while the
  // actual backdrop behind it had become the dark overlay, making it
  // invisible (white-on-white in the other direction).
  const isMenuButtonDark = isOpen ? scrolled : isDarkText;

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
            {/* Desktop language dropdown — picks a language directly instead
                of cycling through them one click at a time, so adding more
                languages later doesn't make switching slower. */}
            <div ref={langMenuRef} className="hidden md:block relative">
              <button
                onClick={() => setLangMenuOpen((v) => !v)}
                className={buttonClass}
              >
                <Globe size={14} />
                <span>{lang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl border border-gray-100 bg-white shadow-xl overflow-hidden py-1.5"
                  >
                    {supportedLangs.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLang(code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                          lang === code ? 'text-bat-blue bg-bat-blue/5' : 'text-bat-navy hover:bg-gray-50'
                        }`}
                      >
                        {LANG_LABELS[code] ?? code}
                        {lang === code && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border ${
                isMenuButtonDark ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={20} className={isMenuButtonDark ? 'text-bat-navy' : 'text-white'} />
              ) : (
                <Menu size={20} className={isMenuButtonDark ? 'text-bat-navy' : 'text-white'} />
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
            className="fixed inset-0 z-40 bg-bat-navy/95 backdrop-blur-3xl flex flex-col overflow-y-auto px-6 pt-24 pb-10"
          >
            <div className="flex flex-col gap-6 my-auto">
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
                className="pt-8 border-t border-white/10"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                  <Globe size={14} /> Language
                </span>
                <div className="flex gap-2">
                  {supportedLangs.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLang(code);
                        setIsOpen(false);
                      }}
                      className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                        lang === code ? 'bg-white text-bat-navy' : 'bg-white/10 text-white/70 hover:bg-white/15'
                      }`}
                    >
                      {code}
                      {lang === code && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
