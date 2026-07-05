import React from "react";
import AnimatedSection from "../components/AnimatedSection";
import { Mail, Phone, MapPin, Clock, Globe, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const ContactItem = ({ icon: Icon, label, value, href, delay = 0 }) => (
  <AnimatedSection delay={delay}>
    <a
      href={href || "#"}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`group flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] hover:border-bat-blue/20 transition-all duration-400 ${!href ? "pointer-events-none" : ""}`}
    >
      <div className="w-12 h-12 rounded-xl bg-bat-navy/5 flex items-center justify-center text-bat-navy group-hover:bg-bat-blue group-hover:text-white transition-all duration-300 shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
          {label}
        </p>
        <p className="text-bat-navy font-semibold text-sm sm:text-base truncate">
          {value}
        </p>
      </div>
      {href && (
        <ArrowUpRight
          size={18}
          className="text-gray-300 group-hover:text-bat-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
        />
      )}
    </a>
  </AnimatedSection>
);

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#fafcff] min-h-screen pt-32 pb-24">
      {/* Hero */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 mb-20 lg:mb-28">
        <AnimatedSection className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-bat-blue/20 bg-bat-blue/5 text-bat-blue text-[10px] font-bold tracking-[0.2em] uppercase">
            <Globe size={13} /> Get In Touch
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-bat-navy tracking-tight leading-[1.02] mb-6">
            {t("contact.title")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bat-blue to-bat-blue">
              {t("contact.titleAccent")}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 font-light leading-relaxed max-w-xl">
            {t("contact.subtitle")}
          </p>
        </AnimatedSection>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Contact Data */}
          <div className="space-y-4">
            <ContactItem
              icon={MapPin}
              label={t("contact.officeLocation") || "Headquarters"}
              value="Esplanade Street 50L, 9227 Diekirch 20, Luxembourg"
              delay={0.1}
            />
            <ContactItem
              icon={Mail}
              label={t("contact.emailUs") || "Email"}
              value="info@bat-sa.com"
              href="mailto:info@bat-sa.com"
              delay={0.15}
            />
            <ContactItem
              icon={Phone}
              label={t("contact.callUs") || "Phone"}
              value="+32 476 424 372"
              href="tel:+32476424372"
              delay={0.2}
            />
            {/* <ContactItem
              icon={Globe}
              label="Website"
              value="bat-sa.com"
              href="https://bat-sa.com"
              delay={0.25}
            /> */}
            <ContactItem
              icon={Clock}
              label="Business Hours"
              value="Mon – Fri, 09:00 – 18:00 CET"
              delay={0.3}
            />
          </div>

          {/* Right: Map + Belgian office note */}
          <AnimatedSection delay={0.2} className="h-full flex flex-col gap-6">
            {/* Google Maps embed */}
            <div className="w-full rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)] flex-1 min-h-[340px] sm:min-h-[420px]">
              <iframe
                title="BAT SA Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.5637837506!2d6.1571!3d49.8716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDUyJzE3LjgiTiA2wrAwOSczOS42IkU!5e0!3m2!1sen!2slux!4v1620000000000!5m2!1sen!2slux&q=Esplanade+Street+50L,+9227+Diekirch,+Luxembourg"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "340px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick info badges — "Country" gets its own full-width row on
                mobile (col-span-2 in a 2-col grid) since "Luxembourg" can't
                shrink or wrap onto two lines without looking broken; desktop
                has enough room for three equal columns. */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Founded", value: "2005", order: "order-1" },
                { label: "Modules", value: "30+", order: "order-2 sm:order-3" },
                { label: "Country", value: "Luxembourg", order: "order-3 sm:order-2", wide: true },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 text-center shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] overflow-hidden ${item.order} ${item.wide ? 'col-span-2 sm:col-span-1' : ''}`}
                >
                  <p className="text-xl sm:text-2xl font-black text-bat-navy whitespace-nowrap">
                    {item.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-1">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom CTA strip */}
        <AnimatedSection delay={0.4} className="mt-20 lg:mt-24">
          <div className="relative overflow-hidden bg-bat-navy rounded-3xl px-8 py-12 lg:px-16 lg:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-bat-blue/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-20 w-32 h-32 bg-bat-blue/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-bat-blue/80 mb-2">
                Direct contact
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Prefer to reach out directly?
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base font-light">
                Our team typically responds within one business day.
              </p>
            </div>

            <a
              href="mailto:info@bat-sa.com"
              className="relative z-10 inline-flex items-center gap-3 bg-white text-bat-navy font-black py-4 px-8 rounded-2xl hover:bg-bat-blue hover:text-white transition-all duration-300 shadow-lg hover:shadow-bat-blue/25 hover:-translate-y-0.5 shrink-0 group"
            >
              <Mail size={18} />
              info@bat-sa.com
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
