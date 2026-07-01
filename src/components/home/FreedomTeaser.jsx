import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const FreedomTeaser = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-40 bg-bat-navy border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-28">

          <AnimatedSection className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="kicker-light">{t("home.freedomKicker")}</span>
            <h2 className="section-title-light mb-6">{t("home.teaserTitle")}</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10 font-light">
              {t("home.teaserBody")}
            </p>
            <Link
              to="/freedom"
              className="inline-flex items-center gap-2 bg-white text-bat-navy hover:bg-bat-gold hover:text-bat-navy font-bold py-4 px-8 rounded-full transition-all"
            >
              {t("home.teaserBtn")} <ArrowUpRight size={18} />
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/home/home_app_5_en.webp"
                alt="FreeDOM Software"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FreedomTeaser;
