import React from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { Building2, Globe2, Cpu, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="relative bg-[#0a101f] pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://bat-sa.com/assets/images/home_page/home_app_5_en.webp')] bg-cover bg-center opacity-10 mix-blend-screen" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a101f]/80 to-[#0a101f]" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
          <AnimatedSection staggerChildren>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-bat-gold font-bold tracking-widest uppercase text-xs">
                {t('about.kicker')}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              {t('about.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Story & Mission - Bento Style */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection className="bg-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-bat-navy mb-6">{t('about.missionTitle')}</h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                {t('about.missionBody')}
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                {t('about.missionDetails')}
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2} className="bg-bat-navy p-10 md:p-14 rounded-[2rem] shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bat-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-10">{t('about.advantageTitle')}</h3>
                <ul className="space-y-8">
                  <li className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-bat-gold backdrop-blur-md">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <strong className="block text-xl text-white mb-2">{t('about.adv1Title')}</strong>
                      <span className="text-white/60 leading-relaxed">{t('about.adv1Body')}</span>
                    </div>
                  </li>
                  <li className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-bat-blue backdrop-blur-md">
                      <Globe2 size={24} />
                    </div>
                    <div>
                      <strong className="block text-xl text-white mb-2">{t('about.adv2Title')}</strong>
                      <span className="text-white/60 leading-relaxed">{t('about.adv2Body')}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-32 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-bat-navy tracking-tight mb-6">{t('about.industriesTitle')}</h2>
            <p className="text-xl text-gray-500 font-light">
              {t('about.industriesBody')}
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: t('about.ind1'), icon: <Building2 size={32} /> },
              { name: t('about.ind2'), icon: <Shield size={32} /> },
              { name: t('about.ind3'), icon: <Globe2 size={32} /> },
              { name: t('about.ind4'), icon: <Cpu size={32} /> }
            ].map((industry, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="group bg-[#f8fafc] border border-gray-100 p-10 rounded-[2rem] text-center hover:bg-bat-navy transition-colors duration-500 hover:shadow-2xl">
                  <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center text-bat-navy group-hover:text-bat-gold group-hover:bg-white/10 transition-colors duration-500 mb-6 shadow-sm">
                    {industry.icon}
                  </div>
                  <h3 className="font-bold text-xl text-bat-navy group-hover:text-white transition-colors duration-500">{industry.name}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-bat-blue text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">{t('about.ctaTitle')}</h2>
            <Link to="/products" className="inline-flex items-center gap-3 bg-[#0a101f] hover:bg-gray-900 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl">
              {t('about.ctaButton')} <ArrowRight size={20} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
