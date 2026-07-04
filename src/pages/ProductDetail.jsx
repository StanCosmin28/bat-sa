import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { products } from '../data/products';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['description', 'characteristics'];
const COLLAPSED_HEIGHT = 220;

// Full text always in the DOM (nothing hidden behind a scrollbar mobile users
// might not notice) but clamped to a fixed height with a fade + "Read more"
// toggle once it actually overflows — this also keeps the two tabs at a
// similar collapsed height, which is what stops the sticky image column from
// jumping around when you switch tabs.
function ExpandableContent({ html }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (contentRef.current) {
      setOverflowing(contentRef.current.scrollHeight > COLLAPSED_HEIGHT + 8);
    }
  }, [html]);

  return (
    <div>
      <div
        ref={contentRef}
        className="product-prose text-gray-600 font-light leading-relaxed sm:leading-loose text-base sm:text-lg overflow-hidden relative"
        style={{ maxHeight: expanded ? 'none' : `${COLLAPSED_HEIGHT}px` }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {!expanded && overflowing && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#fafcff] to-transparent pointer-events-none" />
        )}
      </div>
      {overflowing && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-bat-blue font-bold text-xs sm:text-sm uppercase tracking-widest hover:text-bat-navy transition-colors"
        >
          {expanded ? t('common.showLess') : t('common.readMore')}
        </button>
      )}
    </div>
  );
}

const ProductDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');
  const [imageView, setImageView] = useState('front');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = products.find(p => p.key === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('description');
    setImageView('front');
    setLightboxOpen(false);
  }, [id]);

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  if (!product) {
    return (
      <div className="pt-40 pb-32 flex flex-col items-center justify-center min-h-screen bg-[#fafcff]">
        <h2 className="text-4xl font-black text-bat-navy mb-4">Product Not Found</h2>
        <button onClick={() => navigate('/products')} className="bg-bat-blue text-white font-bold py-3 px-8 rounded-full">
          Return to Catalog
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.key !== product.key)
    .slice(0, 4);

  const imageSrc = `/images/products/${product.key}${imageView === 'detail' ? '_detail' : ''}.webp`;
  const showWiringPanel = imageView === 'detail' && product.wiring;

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Premium Split Section without white boxes */}
      <div className="flex flex-col lg:flex-row relative container mx-auto">

        {/* Left: Sticky Image Display */}
        <div className="w-full lg:w-1/2 relative flex flex-col pt-32 pb-10 lg:pb-20 px-8 lg:px-20 lg:sticky lg:top-0 lg:h-screen bg-transparent">

          {/* Breadcrumb / Back button — normal flow, never overlaps the image below it */}
          <div className="mb-6 lg:mb-10">
            <button
              onClick={() => navigate('/products')}
              className="group flex items-center gap-2 text-bat-navy/60 hover:text-bat-navy transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-bat-navy/10 bg-white/60 backdrop-blur-sm"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center min-h-0">
            {/* Product image — click/tap to open fullscreen.
                A concrete `h-[..vh]` (not `flex-1`/`max-h`) is used here on
                purpose: on mobile this column has no defined height for a
                flex-basis to resolve against, so `h-full` on the <img>
                inside couldn't compute and it fell back to its intrinsic
                size — a very tall wiring-diagram photo then rendered at
                full native height, overflowing into the back button above
                and the toggle below it. A real height (vh is always
                resolvable) plus overflow-hidden as a hard safety net fixes
                that regardless of the image's aspect ratio. */}
            <div className="w-full h-[42vh] lg:h-[60vh] flex items-center justify-center relative overflow-hidden">
              <AnimatedSection className="w-full h-full flex items-center justify-center relative">
                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-bat-navy/15 blur-2xl rounded-full opacity-60"></div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="group relative w-full h-full cursor-zoom-in"
                  aria-label="Open full-screen image"
                >
                  <img
                    key={imageView}
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full object-contain relative z-10 transition-transform duration-700 ease-out mix-blend-darken"
                  />
                  <span className="absolute bottom-2 right-2 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-bat-navy/10 text-bat-navy opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all">
                    <Maximize2 size={15} />
                  </span>
                </button>
              </AnimatedSection>
            </div>

            {/* Front / Detail toggle — only for products that have a detail image */}
            {product.hasDetail && (
              <div className="relative z-20 flex items-center gap-2 mt-4 bg-bat-navy/5 p-1 rounded-full">
                {['front', 'detail'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setImageView(view)}
                    className={`px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors duration-300 ${
                      imageView === view ? 'bg-bat-navy text-white' : 'text-bat-navy/50 hover:text-bat-navy'
                    }`}
                  >
                    {view === 'front' ? t('detail.viewFront') : t('detail.viewBack')}
                  </button>
                ))}
              </div>
            )}

            {/* Wiring info tied to the detail image, shown only when it's active and there's actual data for it */}
            {showWiringPanel && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mt-4 p-5 rounded-2xl bg-white border border-bat-navy/10 shadow-sm product-prose text-gray-600 text-sm leading-relaxed"
              >
                <p className="text-bat-navy font-black text-[10px] uppercase tracking-widest mb-2">
                  {t('detail.tab.wiring')}
                </p>
                <div dangerouslySetInnerHTML={{ __html: product.wiring }} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Typography & Details (Scrollable) */}
        <div className="w-full lg:w-1/2 bg-transparent pt-10 lg:pt-40 pb-20 px-8 lg:px-16 xl:px-24 flex flex-col">
          <AnimatedSection delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-bat-navy mb-6 tracking-tight leading-[1.05]">
              {product.name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 mb-10 font-light leading-relaxed max-w-xl">
              {product.info}
            </p>

            <Link
              to="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-bat-navy text-white font-bold py-4 px-10 rounded-full hover:bg-bat-blue transition-all duration-300"
            >
              {t('common.requestDemo')}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimatedSection>

          {/* Sleek Animated Tabs */}
          <AnimatedSection delay={0.2} className="mt-16 sm:mt-20 flex-grow flex flex-col">
            <div className="relative flex gap-6 sm:gap-8 border-b border-bat-navy/10 mb-8 sm:mb-10 overflow-x-auto scrollbar-hide pb-1">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${activeTab === tab ? 'text-bat-navy' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-bat-navy"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content — full text always present (no hidden internal
                scroll a mobile visitor might not notice), clamped with a
                Read more toggle instead. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'description' && <ExpandableContent html={product.description} />}
                {activeTab === 'characteristics' && <ExpandableContent html={product.characteristics} />}
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-6 lg:px-16 py-20 sm:py-24 border-t border-bat-navy/10 mt-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-bat-navy tracking-tight mb-2">
                  Complete Your System
                </h2>
                <p className="text-gray-500 font-light text-base sm:text-lg">
                  Modules that pair perfectly with the {product.name}.
                </p>
              </div>
              <Link to="/products" className="group flex items-center gap-2 text-bat-navy font-bold text-[10px] sm:text-sm uppercase tracking-widest transition-colors bg-transparent hover:bg-bat-navy/5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-bat-navy/10 whitespace-nowrap">
                View All Modules <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.key} product={p} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      )}

      {/* Fullscreen image lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-bat-navy/95 backdrop-blur-md flex items-center justify-center p-6 sm:p-12"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={imageSrc}
              alt={product.name}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Typography Styles */}
      <style>{`
        .product-prose p {
          margin-bottom: 1.5em;
        }
        .product-prose ul {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5em 0;
        }
        .product-prose ul li {
          position: relative;
          padding-left: 1.5em;
          margin-bottom: 0.75em;
        }
        .product-prose ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #0f172a; /* bat-navy */
        }
        .product-prose strong {
          font-weight: 700;
          color: #0f172a; /* bat-navy */
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
