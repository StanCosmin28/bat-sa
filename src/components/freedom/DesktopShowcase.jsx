import {
  LayoutGrid,
  MapPinned,
  FileBarChart,
  MousePointerClick,
} from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

// Real capture of our building SCADA panel, across devices.
const PLACEHOLDER_IMG = "/images/freedom/munn_platforms.webp";

const DesktopShowcase = () => {
  const { t } = useLanguage();

  const features = [
    { id: "multiwindow", icon: LayoutGrid, text: t("freedom.desktopFeature1") },
    { id: "maps", icon: MapPinned, text: t("freedom.desktopFeature2") },
    { id: "reports", icon: FileBarChart, text: t("freedom.desktopFeature3") },
    {
      id: "dragdrop",
      icon: MousePointerClick,
      text: t("freedom.desktopFeature4"),
    },
  ];

  return (
    <section className="py-32 md:py-40 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <AnimatedSection className="text-center -mb-[10%]">
          <div className="max-w-3xl mx-auto">
            <span className="kicker">{t("freedom.desktopKicker")}</span>
            <h2 className="section-title mb-6">{t("freedom.desktopTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              {t("freedom.desktopSubtitle")}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="relative -mb-[%]">
          <img
            src={PLACEHOLDER_IMG}
            alt="Building SCADA control panel across devices"
            className="w-full h-auto"
          />
        </AnimatedSection>

        <AnimatedSection
          staggerChildren
          className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {features.map(({ id, icon: Icon, text }) => (
            <div
              key={id}
              className="h-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-bat-blue/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-bat-blue/10 text-bat-blue flex items-center justify-center shrink-0">
                <Icon size={20} />
              </div>
              <span className="font-medium text-bat-navy text-sm sm:text-base">
                {text}
              </span>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DesktopShowcase;
