import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Cpu, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['description', 'characteristics', 'wiring'];

const ProductDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.key === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('description');
  }, [id]);

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

  return (
    <div className="bg-[#fafcff] min-h-screen">
      {/* Premium Split Section without white boxes */}
      <div className="flex flex-col lg:flex-row relative container mx-auto">

        {/* Left: Sticky Image Display */}
        <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center pt-32 pb-10 lg:pb-20 px-8 lg:px-20 lg:sticky lg:top-0 lg:h-screen bg-transparent">

          {/* Breadcrumb / Back button */}
          <div className="absolute top-28 lg:top-32 left-8 lg:left-12 z-20">
            <button
              onClick={() => navigate('/products')}
              className="group flex items-center gap-2 text-bat-navy/60 hover:text-bat-navy transition-colors font-bold text-[10px] sm:text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-bat-navy/10 bg-[#fafcff]/80 backdrop-blur-sm"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Catalog
            </button>
          </div>

          {/* Clean product image with fake shadow and mix-blend to remove white background */}
          <div className="flex-1 flex items-center justify-center relative w-full h-full max-h-[50vh] lg:max-h-[70vh]">
            <AnimatedSection className="w-full h-full flex items-center justify-center relative">

              {/* Fake Ground Shadow behind the product */}
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-bat-navy/15 blur-2xl rounded-full opacity-60"></div>

              <img
                src={`/images/products/${product.key}.webp`}
                alt={product.name}
                className="w-full h-full object-contain relative z-10 hover:scale-105 transition-transform duration-700 ease-out mix-blend-darken"
              />
            </AnimatedSection>
          </div>
        </div>

        {/* Right: Typography & Details (Scrollable) */}
        <div className="w-full lg:w-1/2 bg-transparent pt-10 lg:pt-40 pb-20 px-8 lg:px-16 xl:px-24 flex flex-col">
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-bat-blue/20 bg-bat-blue/5 text-bat-blue text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
                {product.categoryLabel}
              </span> */}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-bat-navy mb-6 tracking-tight leading-[1.05]">
              {product.name}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-500 mb-10 font-light leading-relaxed max-w-xl">
              {product.info}
            </p>

            <button disabled className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-bat-navy/5 text-bat-navy/50 font-bold py-4 px-10 rounded-full cursor-not-allowed transition-all">
              <Download size={20} className="group-hover:-translate-y-0.5 transition-transform" />
              Download Technical Sheet
              <span className="text-[10px] sm:text-xs bg-bat-navy/10 px-2 py-0.5 rounded-full text-bat-navy/60 ml-2">Soon</span>
            </button>
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

            {/* Tab Content */}
            <div className="flex-grow min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="product-prose text-gray-600 font-light leading-relaxed sm:leading-loose text-base sm:text-lg"
                >
                  {activeTab === 'description' && (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  )}
                  {activeTab === 'characteristics' && (
                    <div dangerouslySetInnerHTML={{ __html: product.characteristics }} />
                  )}
                  {activeTab === 'wiring' && (
                    product.wiring ? (
                      <div dangerouslySetInnerHTML={{ __html: product.wiring }} />
                    ) : (
                      <div className="flex items-center gap-4 p-5 sm:p-6 rounded-2xl bg-bat-navy/5 border border-bat-navy/5">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                          <Cpu size={20} className="text-gray-400 sm:w-6 sm:h-6" />
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-500 m-0 leading-snug">
                          Wiring diagrams for this module will be available in the next firmware documentation update.
                        </p>
                      </div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
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
