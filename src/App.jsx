import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { LanguageProvider } from "./context/LanguageContext";

// Home loads eagerly (it's the most common entry point, bundled with the
// main chunk). Every other page is fetched on demand — visiting "/" should
// never pull in Products' data or ProductDetail's code.
const About = lazy(() => import("./pages/About"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Freedom = lazy(() => import("./pages/Freedom"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));
// Temporary utility route for screen-recording the Spline animation — not
// linked anywhere, safe to delete once the mobile video/GIF is captured.
const SplinePreview = lazy(() => import("./pages/SplinePreview"));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-bat-blue" />
  </div>
);

// ScrollToTop component to ensure pages start at the top when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppLayout() {
  const { pathname } = useLocation();
  const isBarePreview = pathname === "/spline-preview";

  if (isBarePreview) {
    return (
      <Suspense fallback={null}>
        <Routes>
          <Route path="/spline-preview" element={<SplinePreview />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-bat-blue selection:text-white bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/freedom" element={<Freedom />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </LanguageProvider>
  );
}

export default App;
