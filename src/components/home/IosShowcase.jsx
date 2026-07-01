import { Fingerprint, BellRing, LayoutGrid, Gauge } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import PhoneMockup from "../PhoneMockup";
import { useLanguage } from "../../context/LanguageContext";

// Screens are placeholders (existing home_app_*.webp assets) until real
// iOS app screenshots are supplied — swap the imgSrc values below then.
const SCREEN_BACK = "/images/home/home_app_4_en.webp";
const SCREEN_FRONT = "/images/home/home_app_2_en.webp";

const IosShowcase = () => {
  const { t } = useLanguage();

  const features = [
    { id: "faceid", icon: Fingerprint, title: t("home.iosFeature1"), desc: t("home.iosFeature1Desc") },
    { id: "push", icon: BellRing, title: t("home.iosFeature2"), desc: t("home.iosFeature2Desc") },
    { id: "widgets", icon: LayoutGrid, title: t("home.iosFeature3"), desc: t("home.iosFeature3Desc") },
    { id: "native", icon: Gauge, title: t("home.iosFeature4"), desc: t("home.iosFeature4Desc") },
  ];

  return (
    <section className="py-16 md:py-32 lg:py-40 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-28">

          {/* Visual — two overlapping iPhones, the section's focal point. Below the copy on mobile, left of it on desktop. */}
          <AnimatedSection className="order-2 lg:order-1 w-full lg:w-1/2 flex justify-center">
            <div className="relative flex items-center justify-center py-8">
              <div className="absolute w-[420px] h-[420px] bg-bat-blue/[0.06] rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex items-end group scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                <div className="relative z-10 -mr-16 md:-mr-20 rotate-[-6deg] scale-[0.85] transition-transform duration-500 group-hover:-translate-x-2 group-hover:rotate-[-9deg]">
                  <PhoneMockup variant="iphone" imgSrc={SCREEN_BACK} altText="BAT iOS app — secondary screen" />
                </div>
                <div className="relative z-20 rotate-[4deg] transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-[6deg] group-hover:-translate-y-2">
                  <PhoneMockup variant="iphone" imgSrc={SCREEN_FRONT} altText="BAT iOS app — main screen" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Copy + feature grid — above the phones on mobile, right of them on desktop */}
          <AnimatedSection delay={0.15} staggerChildren className="order-1 lg:order-2 w-full lg:w-1/2">
            <span className="kicker">{t("home.iosKicker")}</span>
            <h2 className="section-title mb-6">{t("home.iosTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              {t("home.iosSubtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map(({ id, icon: Icon, title, desc }) => (
                <div
                  key={id}
                  className="p-5 rounded-xl bg-gray-50 border border-gray-100 hover:border-bat-blue/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-bat-blue/10 text-bat-blue flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-bat-navy text-sm mb-1">{title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default IosShowcase;
