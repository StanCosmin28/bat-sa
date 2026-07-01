import { Building2, Hotel, Stethoscope, Briefcase } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const Industries = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-40 bg-[#f8fafc] border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-16">

        <AnimatedSection className="text-center mb-16 max-w-2xl mx-auto">
          <span className="kicker">{t("home.industriesKicker")}</span>
          <h2 className="section-title mb-5">{t("home.industriesTitle")}</h2>
          <p className="text-gray-500 text-lg font-light">{t("home.industriesSubtitle")}</p>
        </AnimatedSection>

        <AnimatedSection staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "hotels", icon: Hotel, label: t("industry.hotels"), desc: t("industry.hotelsDesc") },
            { id: "hospitals", icon: Stethoscope, label: t("industry.hospitals"), desc: t("industry.hospitalsDesc") },
            { id: "offices", icon: Building2, label: t("industry.offices"), desc: t("industry.officesDesc") },
            { id: "residential", icon: Briefcase, label: t("industry.residential"), desc: t("industry.residentialDesc") },
          ].map(({ id, icon: Icon, label, desc }) => (
            <div key={id} className="card p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-bat-blue/10 text-bat-blue flex items-center justify-center mx-auto mb-5 group-hover:bg-bat-blue group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
              </div>
              <h4 className="font-bold text-bat-navy mb-2">{label}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Industries;
