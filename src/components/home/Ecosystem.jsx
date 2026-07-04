import { Link } from "react-router-dom";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const Ecosystem = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-40 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Mobile: title -> image -> description/offers, tightly stacked.
            Desktop: image on the left (spanning both rows), title+description
            stacked on the right — same as before. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] items-center gap-6 lg:gap-x-28 lg:gap-y-6">

          <AnimatedSection className="order-1 lg:order-1 lg:col-start-2 lg:row-start-1">
            <span className="kicker">{t("home.appsKicker")}</span>
            <h2 className="section-title">{t("home.appsTitle")}</h2>
          </AnimatedSection>

          <AnimatedSection className="order-2 lg:order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-bat-blue/5 rounded-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl">
                <img
                  src="/images/home/home_app_1_en.webp"
                  alt="BAT Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="order-3 lg:order-3 lg:col-start-2 lg:row-start-2 w-full">
            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-light">
              {t("home.appsSubtitle")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {[t("home.offer1"), t("home.offer2"), t("home.offer3"), t("home.offer4")].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <CheckCircle2 size={20} className="text-bat-blue shrink-0" />
                  <span className="font-medium text-bat-navy text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-bat-navy hover:bg-bat-blue text-white font-bold py-4 px-8 rounded-full transition-colors"
            >
              {t("home.appsExplore")} <ArrowUpRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
