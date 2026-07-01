import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const ContactCta = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-bat-blue">
      <AnimatedSection className="container mx-auto px-6 lg:px-16 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          {t("home.ctaTitle")}
        </h2>
        <p className="text-white/70 text-lg mb-10 font-light">{t("home.ctaSubtitle")}</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-white text-bat-blue hover:bg-bat-navy hover:text-white font-bold py-4 px-10 rounded-full transition-all"
        >
          {t("common.contactUs")} <ArrowRight size={18} />
        </Link>
      </AnimatedSection>
    </section>
  );
};

export default ContactCta;
