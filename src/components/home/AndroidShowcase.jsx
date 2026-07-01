import { Palette, SlidersHorizontal, LayoutGrid, BellRing } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import PhoneMockup from "../PhoneMockup";
import { useLanguage } from "../../context/LanguageContext";

// Placeholder screenshots reuse existing home imagery until real Android
// screenshots are captured — swap `imgSrc` on both PhoneMockups below.
// Icons are placeholders too — swap per feature whenever you're ready.
const AndroidShowcase = () => {
  const { t } = useLanguage();

  const features = [
    { id: "theming", icon: Palette, text: t("home.androidFeature1") },
    { id: "tiles", icon: SlidersHorizontal, text: t("home.androidFeature2") },
    { id: "widgets", icon: LayoutGrid, text: t("home.androidFeature3") },
    { id: "alerts", icon: BellRing, text: t("home.androidFeature4") },
  ];

  return (
    <section className="py-16 md:py-32 lg:py-40 bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-28">

          {/* Text — above the phones on mobile, left of them on desktop */}
          <AnimatedSection className="order-1 w-full lg:w-1/2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-bat-gold mb-4 block">
              {t("home.androidKicker")}
            </span>
            <h2 className="section-title mb-6">{t("home.androidTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              {t("home.androidSubtitle")}
            </p>

            <AnimatedSection staggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map(({ id, icon: Icon, text }) => (
                <div
                  key={id}
                  className="p-5 rounded-xl bg-white border border-gray-100 hover:border-bat-gold/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-bat-gold/10 text-bat-gold flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-bat-navy text-sm">{text}</h4>
                </div>
              ))}
            </AnimatedSection>
          </AnimatedSection>

          {/* Phones — below the text on mobile, right of it on desktop, same overlap/parallax treatment as the iOS section */}
          <AnimatedSection delay={0.1} className="order-2 w-full lg:w-1/2 flex justify-center">
            <div className="relative flex items-center justify-center py-8">
              <div className="absolute w-[420px] h-[420px] bg-bat-gold/[0.06] rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex items-end group scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                <div className="relative z-10 -mr-16 md:-mr-20 rotate-[-6deg] scale-[0.85] transition-transform duration-500 group-hover:-translate-x-2 group-hover:rotate-[-9deg]">
                  <PhoneMockup
                    variant="samsung"
                    imgSrc="/images/home/home_app_5_en.webp"
                    altText="BAT Android App — Devices"
                  />
                </div>
                <div className="relative z-20 rotate-[4deg] transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-[6deg] group-hover:-translate-y-2">
                  <PhoneMockup
                    variant="samsung"
                    imgSrc="/images/home/home_app_4_en.webp"
                    altText="BAT Android App — Dashboard"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AndroidShowcase;
