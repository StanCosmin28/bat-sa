import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, Thermometer, Lock, Check } from "lucide-react";
import AnimatedSection from "../AnimatedSection";
import { useLanguage } from "../../context/LanguageContext";

const ASSISTANTS = [
  {
    id: "alexa",
    icon: "/images/home/alexa-icon.svg",
    nameKey: "home.integrationsAlexaName",
    descKey: "home.integrationsAlexaDesc",
  },
  {
    id: "google",
    icon: "/images/home/google-assistant-icon.svg",
    nameKey: "home.integrationsGoogleName",
    descKey: "home.integrationsGoogleDesc",
  },
];

const COMMANDS = [
  {
    id: "alexa-lights",
    assistantId: "alexa",
    system: "lights",
    icon: "/images/home/alexa-icon.svg",
    quoteKey: "home.integrationsAlexaQuote",
  },
  {
    id: "google-climate",
    assistantId: "google",
    system: "climate",
    icon: "/images/home/google-assistant-icon.svg",
    quoteKey: "home.integrationsGoogleQuote",
  },
  {
    id: "alexa-security",
    assistantId: "alexa",
    system: "security",
    icon: "/images/home/alexa-icon.svg",
    quoteKey: "home.integrationsSecurityQuote",
  },
];

const SYSTEMS = [
  { key: "lights", Icon: Lightbulb, labelKey: "home.integrationsLights" },
  { key: "climate", Icon: Thermometer, labelKey: "home.integrationsClimate" },
  { key: "security", Icon: Lock, labelKey: "home.integrationsSecurity" },
];

const CYCLE_MS = 4500;
const LISTEN_MS = 550;
const TYPE_SPEED_MS = 22;
const RING_R = 22;
const RING_C = 2 * Math.PI * RING_R;

const EqualizerBars = ({ barClassName = "bg-bat-gold", height = "h-3" }) => (
  <div className={`flex items-end justify-center gap-0.5 ${height}`}>
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className={`w-0.5 rounded-full ${barClassName}`}
        initial={{ height: "25%" }}
        animate={{ height: ["25%", "100%", "25%"] }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

const Integrations = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("listening");
  const [typedText, setTypedText] = useState("");
  const typeTimerRef = useRef(null);

  const current = COMMANDS[active];

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % COMMANDS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [active]);

  useEffect(() => {
    setPhase("listening");
    setTypedText("");
    const listenTimer = setTimeout(() => setPhase("typing"), LISTEN_MS);
    return () => clearTimeout(listenTimer);
  }, [active]);

  useEffect(() => {
    if (phase !== "typing") return undefined;
    const quote = t(current.quoteKey);
    let i = 0;
    clearInterval(typeTimerRef.current);
    typeTimerRef.current = setInterval(() => {
      i += 1;
      setTypedText(quote.slice(0, i));
      if (i >= quote.length) {
        clearInterval(typeTimerRef.current);
        setPhase("done");
      }
    }, TYPE_SPEED_MS);
    return () => clearInterval(typeTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, active]);

  const selectAssistant = (assistantId) => {
    const idx = COMMANDS.findIndex((c) => c.assistantId === assistantId);
    if (idx !== -1) setActive(idx);
  };

  const selectSystem = (systemKey) => {
    const idx = COMMANDS.findIndex((c) => c.system === systemKey);
    if (idx !== -1) setActive(idx);
  };

  return (
    <section className="py-16 md:py-32 lg:py-40 bg-bat-blue relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-14 lg:gap-x-20 items-center max-w-6xl mx-auto">
          <AnimatedSection>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-bat-gold mb-4 block">
              {t("home.integrationsKicker")}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              {t("home.integrationsTitle")}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
              {t("home.integrationsSubtitle")}
            </p>

            <div className="border-t border-white/10">
              {ASSISTANTS.map((a) => {
                const isActive = current.assistantId === a.id;
                return (
                  <motion.button
                    key={a.id}
                    onClick={() => selectAssistant(a.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full flex items-center gap-4 py-5 text-left border-b border-white/10 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span className="relative w-12 h-12 shrink-0">
                      <svg
                        viewBox="0 0 48 48"
                        className="absolute inset-0 w-full h-full -rotate-90"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r={RING_R}
                          fill="none"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="2"
                        />
                        {isActive && (
                          <motion.circle
                            key={`ring-${active}`}
                            cx="24"
                            cy="24"
                            r={RING_R}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={RING_C}
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: RING_C }}
                            transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                          />
                        )}
                      </svg>
                      <span className="absolute inset-[3px] rounded-full bg-white flex items-center justify-center">
                        <img src={a.icon} alt="" className="w-6 h-6 object-contain" />
                      </span>
                    </span>
                    <span>
                      <span className="block text-white font-bold text-lg">
                        {t(a.nameKey)}
                      </span>
                      <span className="block text-white/50 text-sm">
                        {t(a.descKey)}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  {ASSISTANTS.map((a) => (
                    <img
                      key={a.id}
                      src={a.icon}
                      alt=""
                      className={`w-6 h-6 object-contain transition-opacity duration-300 ${
                        current.assistantId === a.id ? "opacity-100" : "opacity-25"
                      }`}
                    />
                  ))}
                </div>
                <EqualizerBars />
              </div>

              <div className="min-h-[6.5rem] flex items-center">
                <AnimatePresence mode="wait">
                  {phase === "listening" ? (
                    <motion.div
                      key={`listening-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 text-white/50"
                    >
                      <EqualizerBars barClassName="bg-white/50" height="h-5" />
                      <span className="text-sm uppercase tracking-wider font-semibold">
                        {t("home.integrationsListening")}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.p
                      key={`quote-${active}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-2xl lg:text-[1.75rem] font-medium leading-snug"
                    >
                      {typedText}
                      {phase === "typing" && (
                        <motion.span
                          className="inline-block w-[3px] h-6 lg:h-7 bg-bat-gold ml-1 align-middle"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                        />
                      )}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-8">
                {SYSTEMS.map(({ key, Icon, labelKey }) => {
                  const isActive = phase === "done" && current.system === key;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => selectSystem(key)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      className={`relative flex flex-col items-center gap-2 rounded-2xl py-5 border overflow-hidden transition-colors duration-500 ${
                        isActive
                          ? "bg-bat-gold/15 border-bat-gold/40"
                          : "bg-white/[0.03] border-white/10 hover:border-white/25"
                      }`}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            key={`ripple-${active}`}
                            className="absolute w-4 h-4 rounded-full bg-bat-gold/40"
                            initial={{ scale: 0, opacity: 0.6 }}
                            animate={{ scale: 6, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        key={`icon-${key}-${isActive ? active : "idle"}`}
                        initial={isActive ? { scale: 0.4, opacity: 0 } : false}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className="relative"
                      >
                        <Icon
                          size={22}
                          className={isActive ? "text-bat-gold" : "text-white/30"}
                        />
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ delay: 0.15, type: "spring", stiffness: 500, damping: 18 }}
                              className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-bat-gold flex items-center justify-center"
                            >
                              <Check size={9} className="text-bat-navy" strokeWidth={3} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <span
                        className={`relative text-[11px] font-medium ${
                          isActive ? "text-white" : "text-white/40"
                        }`}
                      >
                        {t(labelKey)}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
