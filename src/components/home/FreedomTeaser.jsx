import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const FreedomTeaser = () => {
  const { t } = useLanguage();

  const highlights = [
    t("freedom.feat1"),
    t("freedom.feat2"),
    t("freedom.feat6"),
  ];

  return (
    <section className="py-32 md:py-40 bg-bat-navy border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Mobile: title -> image -> description/button, tightly stacked.
            Desktop: text on the left, image on the right (spanning both
            rows) — same as before. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-6 lg:gap-x-28 lg:gap-y-6">

          <AnimatedSection className="order-1 lg:order-1 lg:col-start-1 lg:row-start-1">
            <span className="kicker-light">{t("home.freedomKicker")}</span>
            <h2 className="section-title-light">{t("home.teaserTitle")}</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/freedom/nestor_module_config_crop.webp"
                alt="FreeDOM Software"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection className="order-3 lg:order-3 lg:col-start-1 lg:row-start-2 w-full">
            <p className="text-white/60 text-lg leading-relaxed mb-6 font-light">
              {t("home.teaserBody")}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {highlights.map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-2 text-white/70 text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-bat-gold" />
                  {label}
                </span>
              ))}
            </div>
            <Link
              to="/freedom"
              className="inline-flex items-center gap-2 bg-white text-bat-navy hover:bg-bat-gold hover:text-bat-navy font-bold py-4 px-8 rounded-full transition-all"
            >
              {t("home.teaserBtn")} <ArrowUpRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FreedomTeaser;
