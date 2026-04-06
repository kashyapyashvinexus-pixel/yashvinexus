import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

/* ── Loader ─────────────────────────────────────── */
function Loader({ onDone }) {
  const barRef = React.useRef(null);

  useEffect(() => {
    // Animate bar to 100%
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (barRef.current) barRef.current.style.width = '100%';
        setTimeout(onDone, 400);
      } else {
        if (barRef.current) barRef.current.style.width = `${progress}%`;
      }
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="page-load" id="page-loader">
      <div className="page-load__logo">
        <span>Yashvinexus</span>
      </div>
      <div className="page-load__bar-wrap">
        <div className="page-load__bar" ref={barRef} />
      </div>
    </div>
  );
}

/* ── Scroll to top on route change ──────────────── */
function RouteScroll() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {loaded && (
        <Router>
          <RouteScroll />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
        </Router>
      )}
    </>
  );
}

export default App;
