import { Activity, LayoutDashboard, Settings2, Smartphone, Shield, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import PhoneMockup from '../components/PhoneMockup';
import AnimatedSection from '../components/AnimatedSection';
import DesktopShowcase from '../components/freedom/DesktopShowcase';
import ContactCta from '../components/home/ContactCta';
import { useLanguage } from '../context/LanguageContext';

const Freedom = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Settings2 size={28} />, title: t('freedom.feat1'), desc: t('freedom.feat1Desc') },
    { icon: <Activity size={28} />, title: t('freedom.feat2'), desc: t('freedom.feat2Desc') },
    { icon: <LayoutDashboard size={28} />, title: t('freedom.feat3'), desc: t('freedom.feat3Desc') },
    { icon: <Zap size={28} />, title: t('freedom.feat4'), desc: t('freedom.feat4Desc') },
    { icon: <Shield size={28} />, title: t('freedom.feat5'), desc: t('freedom.feat5Desc') },
    { icon: <Smartphone size={28} />, title: t('freedom.feat6'), desc: t('freedom.feat6Desc') }
  ];

  return (
    <div className="bg-bat-navy min-h-screen">
      {/* Hero */}
      <div className="relative pt-40 pb-20 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bat-blue/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bat-blue/50 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="inline-block mb-8 px-5 py-2 rounded-full border border-bat-blue/30 bg-bat-blue/10 backdrop-blur-md">
                <span className="text-bat-blue font-bold tracking-widest uppercase text-xs">
                  {t('freedom.kicker')}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
                {t('freedom.title')}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
                {t('freedom.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact" className="bg-white text-[#0a101f] hover:bg-bat-gold font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {t('common.requestDemo')}
                </Link>
                <a href="#features" className="glass-dark hover:bg-white/10 text-white font-semibold py-4 px-10 rounded-full transition-all">
                  {t('common.exploreFeatures')}
                </a>
              </div>

              {/* Compact trust strip — reuses the same feature copy shown below,
                  just surfaced immediately so the hero doesn't read as empty
                  once the CTAs are done. */}
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-16 pt-10 border-t border-white/10">
                {[
                  { icon: <Activity size={16} />, label: t('freedom.feat2') },
                  { icon: <Shield size={16} />, label: t('freedom.feat5') },
                  { icon: <Smartphone size={16} />, label: t('freedom.feat6') },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-gray-400 text-sm font-medium tracking-wide">
                    <span className="text-bat-blue">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-white relative rounded-t-[3rem]">
        <div className="container mx-auto px-6 lg:px-12">
          <AnimatedSection className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-bat-navy tracking-tight mb-6">{t('freedom.featuresTitle')}</h2>
            <p className="text-xl text-gray-500 font-light">
              {t('freedom.featuresSubtitle')}
            </p>
          </AnimatedSection>

          <AnimatedSection staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="group bg-[#f8fafc] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:border-bat-blue/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm text-bat-blue flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-bat-blue group-hover:text-white transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-bat-navy mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      <DesktopShowcase />

      {/* BMS Web — removed, PhoneMockup screens were blank/broken here, revisit later
      <section className="py-32 bg-[#f8fafc] border-t border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-20">
            <AnimatedSection delay={0.2} className="w-full lg:w-1/2">
              <div className="flex gap-4 sm:gap-6 relative justify-center items-center transform scale-75 sm:scale-75 lg:scale-90 xl:scale-100 origin-center">
                <div className="absolute inset-0 bg-bat-blue/10 rounded-full blur-[100px]" />
                <div className="hover:-translate-y-4 transition-transform duration-500">
                  <PhoneMockup
                    imgSrc="/images/home/home_app_2_en.webp"
                    altText="Mobile App"
                  />
                </div>
                <div className="mt-24 hover:-translate-y-4 transition-transform duration-500">
                  <PhoneMockup
                    imgSrc="/images/home/home_app_3_en.webp"
                    altText="Temperature App"
                    delay={0.2}
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="w-full lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bat-navy/5 text-bat-navy font-bold text-sm mb-6 uppercase tracking-wider">
                <Smartphone size={16} /> {t('freedom.responsiveTitle')}
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-bat-navy mb-8 tracking-tight">{t('freedom.accessTitle')}</h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-10 font-light">
                {t('freedom.accessBody')}
              </p>
              <ul className="space-y-6">
                {[
                  t('freedom.accessBullet1'),
                  t('freedom.accessBullet2'),
                  t('freedom.accessBullet3'),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-medium text-lg">
                    <div className="w-8 h-8 rounded-full bg-bat-blue/10 flex items-center justify-center text-bat-blue shrink-0">
                      <Check size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>
      */}

      <ContactCta />
    </div>
  );
};

export default Freedom;
