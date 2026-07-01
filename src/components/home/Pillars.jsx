import { ShieldCheck, Zap, Settings } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const Pillars = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: "economic",
      icon: Zap,
      title: t("pillar.economic"),
      desc: t("pillar.economicDesc"),
      accent: "gold",
    },
    {
      id: "security",
      icon: ShieldCheck,
      title: t("pillar.security"),
      desc: t("pillar.securityDesc"),
      dark: true,
    },
    {
      id: "comfort",
      icon: Settings,
      title: t("pillar.comfort"),
      desc: t("pillar.comfortDesc"),
      accent: "blue",
    },
  ];

  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-16">

        <AnimatedSection className="text-center mb-20 max-w-2xl mx-auto">
          <span className="kicker">{t("home.pillarsKicker")}</span>
          <h2 className="section-title mb-5">{t("home.pillarsTitle")}</h2>
          <p className="text-gray-500 text-lg font-light leading-relaxed">
            {t("home.pillarsSubtitle")}
          </p>
        </AnimatedSection>

        <AnimatedSection staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ id, icon: Icon, title, desc, dark, accent }) => (
            <div
              key={id}
              className={`rounded-2xl p-10 md:p-12 relative overflow-hidden group border shadow-sm hover:shadow-lg transition-all duration-300 ${
                dark ? "bg-bat-navy border-white/10" : "bg-white border-gray-100"
              }`}
            >
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] ${
                  dark ? "bg-bat-blue/20" : accent === "gold" ? "bg-bat-gold/6" : "bg-bat-blue/6"
                }`}
              />
              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${
                    dark
                      ? "bg-white/10 text-white"
                      : accent === "gold"
                        ? "bg-bat-gold/10 text-bat-gold"
                        : "bg-bat-blue/10 text-bat-blue"
                  }`}
                >
                  <Icon size={28} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${dark ? "text-white" : "text-bat-navy"}`}>
                  {title}
                </h3>
                <p className={`leading-relaxed ${dark ? "text-white/60" : "text-gray-500"}`}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Pillars;
