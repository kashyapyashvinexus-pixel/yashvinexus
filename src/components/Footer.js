import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const cols = [
  {
    heading: 'Services',
    links: ['Advertising', 'Digital Marketing', 'Website Development', 'SEO Optimization', 'Social Media', 'Ecommerce Management'],
    to: '/services',
  },
  {
    heading: 'Company',
    links: ['About Us', 'Our Team', 'Process', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
    hrefs: ['/about', '/about', '/services', '/contact', '#', '#'],
  },
];

const socials = [
  { Icon: FiFacebook, href: '#', label: 'Facebook' },
  { Icon: FiTwitter, href: '#', label: 'Twitter' },
  { Icon: FiInstagram, href: '#', label: 'Instagram' },
  { Icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { Icon: FiYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="footer full-width">
      {/* Top CTA strip */}
      <div className="footer__cta-strip">
        <div className="wrap footer__cta-inner">
          <div>
            <p className="footer__cta-label">Ready to grow?</p>
            <h2 className="footer__cta-title">
              Let's build something <span className="footer__cta-accent">great together.</span>
            </h2>
          </div>
          <NavLink to="/contact" className="btn btn-white btn-lg footer__cta-btn">
            Start a Project <FiArrowUpRight />
          </NavLink>
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main">
        <div className="wrap footer__main-inner">
          {/* Brand col */}
          <div className="footer__brand">
            <NavLink to="/" className="footer__logo">
              <span className="footer__logo-mark">Y</span>
              Yashvinexus
            </NavLink>
            <p className="footer__brand-text">
              A full-service digital agency helping brands grow with advertising, marketing, development, SEO, social media, and ecommerce.
            </p>
            <div className="footer__socials">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} className="footer__social" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map((col) => (
            <div key={col.heading} className="footer__col">
              <h4 className="footer__col-heading">{col.heading}</h4>
              <ul className="footer__col-links">
                {col.links.map((l, i) => (
                  <li key={l}>
                    <NavLink to={col.hrefs ? col.hrefs[i] : col.to} className="footer__col-link">
                      {l}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact col */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Contact</h4>
            <ul className="footer__contact">
              <li className="footer__contact-item">
                <FiMail size={14} />
                <span>hello@yashvinexus.com</span>
              </li>
              <li className="footer__contact-item">
                <FiPhone size={14} />
                <span>+91 98765 43210</span>
              </li>
              <li className="footer__contact-item">
                <FiMapPin size={14} />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="wrap footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} Yashvinexus. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy</a>
            <a href="#" className="footer__bottom-link">Terms</a>
            <a href="#" className="footer__bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
