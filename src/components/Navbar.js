import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={[
          'navbar',
          scrolled ? 'navbar--scrolled' : '',
          !visible ? 'navbar--hidden' : '',
        ].join(' ')}
      >
        <div className="navbar__inner wrap">
          {/* Logo */}
          <NavLink to="/" className="navbar__logo">
            <span className="navbar__logo-mark">Y</span>
            Yashvinexus
          </NavLink>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="navbar__actions">
            <NavLink to="/contact" className="btn btn-black btn-sm navbar__cta">
              Get Started <FiArrowUpRight />
            </NavLink>
            <button
              className="navbar__hamburger"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                ['navbar__mobile-link', isActive ? 'navbar__mobile-link--active' : ''].join(' ')
              }
              style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="btn btn-black btn-lg"
            style={{ width: '100%', justifyContent: 'center', transitionDelay: open ? '240ms' : '0ms' }}
          >
            Get Started <FiArrowUpRight />
          </NavLink>
        </nav>
      </div>
    </>
  );
}
