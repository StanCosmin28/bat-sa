import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/products/${product.key}`}
      className="group flex flex-col h-full bg-white/40 hover:bg-white/80 rounded-2xl sm:rounded-3xl transition-all duration-500 relative p-3 sm:p-4 lg:p-5 border border-gray-200/60 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08)] overflow-hidden"
    >
      {/* Responsive image container for 2-column mobile layout */}
      <div className="relative w-full h-32 sm:h-48 lg:h-56 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-visible shrink-0">

        {/* Fake Ground Shadow behind the product */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-bat-navy/10 blur-md sm:blur-xl rounded-full opacity-50 group-hover:opacity-80 transition-all duration-700"></div>

        <img
          src={`/images/products/${product.key}.webp`}
          alt={product.name}
          className="w-full h-full object-contain relative z-10 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-darken"
          loading="lazy"
        />

        {/* Category Label */}
        {/* <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-20">
          <span className="bg-bat-navy/5 backdrop-blur-sm text-[8px] sm:text-[9px] font-bold uppercase tracking-widest sm:tracking-[0.2em] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-bat-navy border border-bat-navy/10 group-hover:bg-bat-blue group-hover:text-white transition-colors duration-300">
            {product.categoryLabel}
          </span>
        </div> */}
      </div>

      {/* Typography and Actions */}
      <div className="flex flex-col flex-1 mt-3 sm:mt-4 px-1 sm:px-2">
        <h3 className="text-sm sm:text-lg lg:text-xl font-black text-bat-navy mb-1 sm:mb-2 group-hover:text-bat-blue transition-colors duration-300 tracking-tight line-clamp-1">
          {product.name}
        </h3>
        <p className="text-[11px] sm:text-sm text-gray-500 line-clamp-2 leading-snug sm:leading-relaxed flex-1 font-light">
          {product.info}
        </p>

        <div className="mt-4 sm:mt-6 flex items-center gap-1 sm:gap-2 text-bat-navy font-bold text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-widest group-hover:text-bat-blue transition-colors duration-300 pb-1 sm:pb-2">
          <span>{t('common.viewDetails') || "View Details"}</span>
          <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>

      {/* The animated bottom border bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] sm:h-1 bg-gradient-to-r from-bat-blue to-bat-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </Link>
  );
};

export default ProductCard;
