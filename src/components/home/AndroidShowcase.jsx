import { Car, SlidersHorizontal, KeyRound, BellRing } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import PhoneMockup from "../PhoneMockup";
import { useLanguage } from "../../context/LanguageContext";

// Real Munn app screenshots.
const AndroidShowcase = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: "androidauto",
      icon: Car,
      title: t("home.androidFeature1"),
      desc: t("home.androidFeature1Desc"),
    },
    {
      id: "control",
      icon: SlidersHorizontal,
      title: t("home.androidFeature2"),
      desc: t("home.androidFeature2Desc"),
    },
    {
      id: "access",
      icon: KeyRound,
      title: t("home.androidFeature3"),
      desc: t("home.androidFeature3Desc"),
    },
    {
      id: "alerts",
      icon: BellRing,
      title: t("home.androidFeature4"),
      desc: t("home.androidFeature4Desc"),
    },
  ];

  return (
    <section className="py-16 md:py-32 lg:py-40 bg-[#f8fafc] border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Mobile: text -> phones -> features, tightly stacked. Desktop: text on
            the left, phones on the right (spanning both rows), features below
            the text — same as before. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-2 lg:gap-x-28 lg:gap-y-6">
          {/* Text */}
          <AnimatedSection className="order-1 lg:col-start-1 lg:row-start-1">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-bat-gold mb-4 block">
              {t("home.androidKicker")}
            </span>
            <h2 className="section-title mb-6">{t("home.androidTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              {t("home.androidSubtitle")}
            </p>
          </AnimatedSection>

          {/* Phones — same overlap/parallax treatment as the iOS section */}
          <AnimatedSection
            delay={0.1}
            className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full flex justify-center"
          >
            {/* transform:scale() doesn't shrink layout size, so the box was
                still reserving the full untransformed phone height — fixed
                heights here match the actual scaled-down visual size per
                breakpoint so mobile isn't left with huge dead space above/below. */}
            <div className="relative flex items-center justify-center h-[380px] sm:h-[470px] md:h-[560px] lg:h-auto lg:py-8">
              <div className="absolute w-[420px] h-[420px] bg-bat-gold/[0.06] rounded-full blur-[100px] pointer-events-none" />

              <div className="relative flex items-end group scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                <div className="relative z-10 -mr-16 md:-mr-20 rotate-[-6deg] scale-[0.85] transition-transform duration-500 group-hover:-translate-x-2 group-hover:rotate-[-9deg]">
                  <PhoneMockup
                    variant="samsung"
                    imgSrc="/images/home/android_munn_panel.svg"
                    altText="BAT Android App — Menu"
                    screenClassName="pt-1.5 sm:pt-2"
                    screenBg="bg-[#6914d5]"
                  />
                </div>
                <div className="relative z-20 rotate-[4deg] transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-[6deg] group-hover:-translate-y-2">
                  <PhoneMockup
                    variant="samsung"
                    imgSrc="/images/home/android_thermostat_munn.svg"
                    altText="BAT Android App — Thermostat"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Feature grid */}
          <AnimatedSection
            staggerChildren
            className="order-3 lg:col-start-1 lg:row-start-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map(({ id, icon: Icon, title, desc }) => (
              <div
                key={id}
                className="h-full p-5 rounded-xl bg-white border border-gray-100 hover:border-bat-gold/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-bat-gold/10 text-bat-gold flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h4 className="font-bold text-bat-navy text-sm mb-1">
                  {title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AndroidShowcase;
