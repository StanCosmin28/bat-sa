import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="relative bg-[#0a101f] pt-40 pb-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://bat-sa.com/assets/images/home_page/home_app_1_en.webp')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a101f]" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">{t('contact.title')} <span className="text-gradient from-bat-gold to-yellow-200">{t('contact.titleAccent')}</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 -mt-16 lg:-mt-32 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Contact Info & Map */}
          <div className="w-full lg:w-5/12 space-y-8">
            <AnimatedSection className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-xl border border-gray-100">
              <h3 className="text-3xl font-bold text-bat-navy mb-10">{t('contact.headquarters')}</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-6 group">
                  <div className="bg-gray-50 group-hover:bg-bat-blue group-hover:text-white transition-colors p-4 rounded-2xl text-bat-navy shrink-0"><MapPin size={24} /></div>
                  <div>
                    <strong className="block text-gray-900 text-lg mb-1">{t('contact.officeLocation')}</strong>
                    <span className="text-gray-500 leading-relaxed text-sm lg:text-base">Esplanade Street 50 L<br/>9227 Diekirch 20, Luxembourg</span>
                  </div>
                </li>
                <li className="flex items-start gap-6 group">
                  <div className="bg-gray-50 group-hover:bg-bat-blue group-hover:text-white transition-colors p-4 rounded-2xl text-bat-navy shrink-0"><Mail size={24} /></div>
                  <div>
                    <strong className="block text-gray-900 text-lg mb-1">{t('contact.emailUs')}</strong>
                    <a href="mailto:info@bat-sa.com" className="text-gray-500 hover:text-bat-blue transition-colors text-sm lg:text-base">info@bat-sa.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-6 group">
                  <div className="bg-gray-50 group-hover:bg-bat-blue group-hover:text-white transition-colors p-4 rounded-2xl text-bat-navy shrink-0"><Phone size={24} /></div>
                  <div>
                    <strong className="block text-gray-900 text-lg mb-1">{t('contact.callUs')}</strong>
                    <a href="tel:+32476424372" className="text-gray-500 hover:text-bat-blue transition-colors text-sm lg:text-base">+32 476 424 372</a>
                  </div>
                </li>
              </ul>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={0.2} className="w-full lg:w-7/12">
            <div className="bg-white p-8 lg:p-14 rounded-[2rem] shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold text-bat-navy mb-2">{t('contact.sendMessageTitle')}</h2>
              <p className="text-gray-500 mb-8 lg:mb-10 text-sm lg:text-base">{t('contact.sendMessageDesc')}</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">{t('contact.form.name')}</label>
                    <input type="text" className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-bat-blue focus:ring-0 outline-none transition-all text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">{t('contact.form.company')}</label>
                    <input type="text" className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-bat-blue focus:ring-0 outline-none transition-all text-sm" placeholder="Company Ltd." />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">{t('contact.form.email')}</label>
                    <input type="email" className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-bat-blue focus:ring-0 outline-none transition-all text-sm" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <label className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">{t('contact.form.phone')}</label>
                    <input type="tel" className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-bat-blue focus:ring-0 outline-none transition-all text-sm" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2 lg:space-y-3">
                  <label className="text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider">{t('contact.form.message')}</label>
                  <textarea rows="4" className="w-full px-4 lg:px-5 py-3 lg:py-4 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-bat-blue focus:ring-0 outline-none transition-all resize-none text-sm" placeholder="..."></textarea>
                </div>

                <button type="submit" className="w-full bg-[#0a101f] hover:bg-bat-blue text-white font-bold py-4 lg:py-5 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 shadow-lg">
                  <Send size={20} /> {t('contact.form.send')}
                </button>
              </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
