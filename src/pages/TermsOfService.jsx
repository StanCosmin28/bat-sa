import { useLanguage } from "../context/LanguageContext";

const SECTION_COUNT = 8;

const TermsOfService = () => {
  const { t } = useLanguage();

  const sections = Array.from({ length: SECTION_COUNT }, (_, i) => i + 1).map((n) => ({
    title: t(`legal.termsS${n}Title`),
    body: t(`legal.termsS${n}Body`),
  }));

  return (
    <div className="bg-white min-h-screen pt-40 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
        <span className="kicker">{t("legal.termsKicker")}</span>
        <h1 className="section-title mb-4">{t("legal.termsTitle")}</h1>
        <p className="text-sm text-gray-400 mb-10">{t("legal.termsUpdated")}</p>
        <p className="text-gray-600 text-lg leading-relaxed mb-12 font-light">
          {t("legal.termsIntro")}
        </p>

        <div className="space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-bat-navy mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
