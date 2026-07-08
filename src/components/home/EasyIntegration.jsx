import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import PhoneMockup from "../PhoneMockup";
import { useLanguage } from "../../context/LanguageContext";

// Placeholder step screenshots — swap each `steps` array for the real
// capture set (same order) once the assets arrive; nothing else in the
// component needs to change. Device per platform is deliberate: Google
// Assistant and Home Assistant demo on Android, Alexa on iPhone.
const INTEGRATIONS = [
  {
    id: "google",
    name: "Google Assistant",
    icon: "/images/home/google-assistant-icon.svg",
    device: "samsung",
    // Real setup flow, complete — all 13 captures in the order provided:
    // Google Home → account menu → settings → search MUNN → link account
    // → permissions → MUNN login → discover/select devices → dashboard
    // → light control → color picker → light on at 100%.
    steps: Array.from(
      { length: 13 },
      (_, i) => `/images/home/easy/google_step${i + 1}.webp`,
    ),
  },
  {
    id: "alexa",
    name: "Amazon Alexa",
    icon: "/images/home/alexa-icon.svg",
    device: "iphone",
    // Steps 1-10: the complete MUNN skill setup flow (search skill →
    // enable → MUNN login → account linked → devices discovered).
    // Steps 11-18: best-of device control (devices, scenes, light, lock,
    // RGB palette, color wheel, thermostat cooling/heating).
    steps: Array.from(
      { length: 18 },
      (_, i) => `/images/home/easy/alexa_step${i + 1}.webp`,
    ),
  },
  {
    id: "homeassistant",
    name: "Home Assistant",
    icon: "/images/home/home-assistant-icon.svg",
    device: "iphone",
    // Real app screenshots (no setup flow for HA — it's an interface tour):
    // home dashboard → zone lighting → room control → thermostat → live
    // energy flow → cumulative energy history.
    steps: [
      "/images/home/easy/homeassistant_step1.webp",
      "/images/home/easy/homeassistant_step2.webp",
      "/images/home/easy/homeassistant_step3.webp",
      "/images/home/easy/homeassistant_step4.webp",
      "/images/home/easy/homeassistant_step5.webp",
      "/images/home/easy/homeassistant_step6.webp",
    ],
  },
];

const EasyIntegration = () => {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState(INTEGRATIONS[0].id);
  const [step, setStep] = useState(0);

  const active = INTEGRATIONS.find((i) => i.id === activeId);
  const lastStep = active.steps.length - 1;

  // Preload the whole step set of the selected platform so next/prev never
  // shows a blank frame mid-crossfade.
  useEffect(() => {
    active.steps.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [active]);

  const selectIntegration = (id) => {
    if (id === activeId) return;
    setActiveId(id);
    setStep(0);
  };

  return (
    <section className="py-16 md:py-32 lg:py-40 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-20 items-center max-w-6xl mx-auto">
          {/* Left column: copy + desktop selector */}
          <AnimatedSection className="text-center lg:text-left">
            <span className="kicker">{t("home.easyKicker")}</span>
            <h2 className="section-title mb-6">{t("home.easyTitle")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-light">
              {t("home.easySubtitle")}
            </p>

            {/* Desktop: vertical list, mirrors the assistant list in the
                Integrations section above for a consistent visual language */}
            <div className="hidden lg:block border-t border-gray-100 mt-10">
              {INTEGRATIONS.map((integration) => {
                const isActive = integration.id === activeId;
                return (
                  <motion.button
                    key={integration.id}
                    onClick={() => selectIntegration(integration.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-4 py-4 text-left border-b border-gray-100 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center h-11 w-11 shrink-0 rounded-xl bg-white border transition-all duration-300 ${
                        isActive
                          ? "border-bat-blue ring-2 ring-bat-blue/20"
                          : "border-gray-200"
                      }`}
                    >
                      <img src={integration.icon} alt="" className="h-6 w-6 object-contain" />
                    </span>
                    <span
                      className={`text-base font-bold transition-colors duration-300 ${
                        isActive ? "text-bat-navy" : "text-gray-500"
                      }`}
                    >
                      {integration.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Mobile selector: icon pills side by side — the selected one
              "opens up" to reveal its name, the others collapse to icon-only */}
          <AnimatedSection delay={0.1} className="lg:hidden flex items-center justify-center gap-3">
            {INTEGRATIONS.map((integration) => {
              const isActive = integration.id === activeId;
              return (
                <motion.button
                  key={integration.id}
                  onClick={() => selectIntegration(integration.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center h-14 px-2.5 rounded-2xl border transition-colors duration-300 ${
                    isActive
                      ? "border-bat-blue bg-bat-blue/5 shadow-[0_4px_20px_-6px_rgba(2,79,137,0.35)]"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center h-9 w-9 shrink-0 rounded-lg border transition-colors duration-300 ${
                      isActive ? "border-bat-blue/20 bg-white" : "border-gray-100 bg-gray-50"
                    }`}
                  >
                    <img src={integration.icon} alt={integration.name} className="h-5 w-5 object-contain" />
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <span className="block pl-2.5 pr-1 text-sm font-semibold text-bat-blue whitespace-nowrap">
                          {integration.name}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </AnimatedSection>

          {/* Right column: phone + step controls */}
          <AnimatedSection delay={0.15} className="flex flex-col items-center">
            <PhoneMockup
              key={active.id}
              variant={active.device}
              altText={`${active.name} setup`}
              screenContent={
                <div className="relative w-full h-full bg-gray-900">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={active.steps[step]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      {/* Screenshot aspect ratios never match the screen
                          cutout exactly. Never crop the real content —
                          object-contain shows the full image, and the same
                          image blurred underneath fills whatever sliver is
                          left, so there are no hard empty bars either. */}
                      <img
                        src={active.steps[step]}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
                      />
                      <img
                        src={active.steps[step]}
                        alt={`${active.name} setup — step ${step + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              }
            />

            <div className="flex items-center gap-5 sm:gap-6 mt-10">
              <motion.button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                whileTap={step === 0 ? undefined : { scale: 0.92 }}
                aria-label={t("home.easyPrev")}
                className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
                  step === 0
                    ? "border-gray-100 text-gray-300 cursor-default"
                    : "border-gray-200 text-bat-navy bg-white shadow-sm hover:border-bat-blue hover:text-bat-blue"
                }`}
              >
                <ChevronLeft size={20} />
              </motion.button>

              <div className="flex flex-col items-center gap-2 min-w-[7rem]">
                <div className="flex items-center gap-2">
                  {active.steps.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setStep(i)}
                      aria-label={`${t("home.easyStep")} ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === step
                          ? "w-6 h-2 bg-bat-blue"
                          : "w-2 h-2 bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold tracking-wide text-gray-400">
                  {t("home.easyStep")} {step + 1} / {active.steps.length}
                </span>
              </div>

              <motion.button
                onClick={() => setStep((s) => Math.min(lastStep, s + 1))}
                disabled={step === lastStep}
                whileTap={step === lastStep ? undefined : { scale: 0.92 }}
                aria-label={t("home.easyNext")}
                className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
                  step === lastStep
                    ? "border-gray-100 text-gray-300 cursor-default"
                    : "border-gray-200 text-bat-navy bg-white shadow-sm hover:border-bat-blue hover:text-bat-blue"
                }`}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default EasyIntegration;
