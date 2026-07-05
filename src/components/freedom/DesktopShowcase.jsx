import { LayoutGrid, MapPinned, FileBarChart, MousePointerClick } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

// Real capture of our building SCADA panel (plan view with positioned devices).
const PLACEHOLDER_IMG = "/images/freedom/dashboard_wide.webp";

const DesktopShowcase = () => {
  const { t } = useLanguage();

  const features = [
    { id: "multiwindow", icon: LayoutGrid, text: t("freedom.desktopFeature1") },
    { id: "maps", icon: MapPinned, text: t("freedom.desktopFeature2") },
    { id: "reports", icon: FileBarChart, text: t("freedom.desktopFeature3") },
    { id: "dragdrop", icon: MousePointerClick, text: t("freedom.desktopFeature4") },
  ];

  return (
    <section className="py-32 md:py-40 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          <AnimatedSection className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="kicker">{t("freedom.desktopKicker")}</span>
            <h2 className="section-title mb-6">{t("freedom.desktopTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              {t("freedom.desktopSubtitle")}
            </p>

            <ul className="space-y-4">
              {features.map(({ id, icon: Icon, text }) => (
                <li
                  key={id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-bat-blue/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-bat-blue/10 text-bat-blue flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="font-medium text-bat-navy text-sm sm:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
              <img
                src={PLACEHOLDER_IMG}
                alt="Building SCADA control panel"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default DesktopShowcase;
