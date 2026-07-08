import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-bat-navy text-gray-300 pt-24 pb-12">
      
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & CTA */}
          <div className="col-span-1 lg:col-span-5 flex flex-col items-start">
            <img src="/logo-bat-white.svg" alt="B.A.T." className="h-10 md:h-12 w-auto mb-6" />
            <p className="text-xl text-gray-400 font-light mb-8 max-w-md leading-relaxed">
              {t('footer.tagline')}
            </p>
            <Link 
              to="/contact" 
              className="group inline-flex items-center gap-3 bg-white text-[#0a101f] hover:bg-bat-gold font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {t('footer.cta')} <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform" />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8">
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">{t('footer.nav')}</h4>
              <ul className="space-y-4 text-base font-medium">
                <li><Link to="/" className="hover:text-bat-gold transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/about" className="hover:text-bat-gold transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/products" className="hover:text-bat-gold transition-colors">{t('nav.products')}</Link></li>
                <li><Link to="/freedom" className="hover:text-bat-gold transition-colors">{t('nav.freedom')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">{t('footer.sol')}</h4>
              <ul className="space-y-4 text-base font-medium text-gray-400">
                <li>{t('footer.sol1')}</li>
                <li>{t('footer.sol2')}</li>
                <li>{t('footer.sol3')}</li>
                <li>{t('footer.sol4')}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase opacity-70">{t('footer.contact')}</h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-bat-gold shrink-0 mt-0.5" />
                  <span className="leading-tight">Esplanade Street 50 L<br/>9227 Diekirch 20, LU</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-bat-gold shrink-0" />
                  <a href="mailto:info@bat-sa.com" className="hover:text-white transition-colors">info@bat-sa.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-bat-gold shrink-0" />
                  <a href="tel:+32476424372" className="hover:text-white transition-colors">+32 476 424 372</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-medium text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
