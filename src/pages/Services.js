import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiTrendingUp, FiGlobe, FiSearch, FiShare2, FiShoppingCart,
  FiTarget, FiArrowUpRight, FiCheckCircle
} from 'react-icons/fi';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    n: '01', icon: <FiTrendingUp />, title: 'Advertising',
    tagline: 'Reach the right audience, every time.',
    desc: 'We build and manage data-driven ad campaigns across Google Search, Display, YouTube, Meta, LinkedIn, and programmatic platforms. Every rupee of your ad budget is tracked, optimized, and scaled for maximum return.',
    features: ['Google Ads (Search, Display, Shopping)', 'Meta & Instagram Campaigns', 'YouTube Video Advertising', 'Programmatic & Retargeting', 'A/B Creative Testing', 'Full-Funnel Attribution Reporting'],
    metric: { v: '4.2x', label: 'Average ROAS for clients' },
  },
  {
    n: '02', icon: <FiTarget />, title: 'Digital Marketing',
    tagline: 'Strategy that converts at every stage.',
    desc: 'We design full-funnel digital marketing programs combining content, email, influencer partnerships, and automation. Every touchpoint is intentional — from first impression to repeat purchase.',
    features: ['Content Marketing & Distribution', 'Email Marketing Automation', 'Influencer & Partnership Marketing', 'Lead Generation Systems', 'Marketing Funnel Design', 'CRM Integration & Nurturing'],
    metric: { v: '+280%', label: 'Increase in qualified leads' },
  },
  {
    n: '03', icon: <FiGlobe />, title: 'Website Development',
    tagline: 'Sites that impress and convert.',
    desc: 'Our development team builds fast, accessible, and beautifully designed websites and web applications. We prioritize performance, Core Web Vitals, and conversion rate optimization from day one.',
    features: ['Custom React & Next.js Development', 'WordPress & CMS Platforms', 'Mobile-First Responsive Design', 'Core Web Vitals Optimization', 'UX/UI Design & Prototyping', 'Ongoing Maintenance & Hosting'],
    metric: { v: '<1.5s', label: 'Guaranteed page load time' },
  },
  {
    n: '04', icon: <FiSearch />, title: 'SEO Optimization',
    tagline: 'Rank higher. Stay there.',
    desc: 'We use a three-pillar SEO approach — technical, content, and authority — to improve your search rankings and drive sustainable organic traffic. We adapt to every algorithm update, so you never fall behind.',
    features: ['Technical SEO Audit & Fixes', 'Keyword Research & Mapping', 'On-Page & Content Optimization', 'Link Building & PR Outreach', 'Local SEO & Google Business', 'Monthly Insights & Rank Reports'],
    metric: { v: '78%', label: 'Clients reach Page 1 in 90 days' },
  },
  {
    n: '05', icon: <FiShare2 />, title: 'Social Media Management',
    tagline: 'Grow communities that love your brand.',
    desc: 'We handle your entire social presence — strategy, content creation, scheduling, community management, and paid amplification. We grow audiences that are engaged, loyal, and ready to buy.',
    features: ['Multi-Platform Social Strategy', 'Content Creation & Calendar', 'Community Management 24/7', 'Paid Social Campaigns', 'Influencer Collaboration', 'Social Analytics & Reporting'],
    metric: { v: '6.5x', label: 'Average engagement growth' },
  },
  {
    n: '06', icon: <FiShoppingCart />, title: 'Ecommerce Management',
    tagline: 'Your store, expertly managed.',
    desc: 'From Shopify builds to Amazon marketplace management, we handle the complexity of ecommerce so you can focus on your product. Catalog, ads, logistics, ops — all under one roof.',
    features: ['Shopify, WooCommerce & Custom Stores', 'Product Catalog & Inventory Management', 'Amazon & Flipkart Marketplace', 'Ecommerce SEO & CRO', 'Google Shopping & Feed Optimization', 'Analytics, Revenue & P&L Reporting'],
    metric: { v: '3.1x', label: 'Average ecommerce revenue growth' },
  },
];

const process = [
  { n: '01', title: 'Discovery', desc: 'Deep-dive into your brand, goals, audience, and competitive landscape.' },
  { n: '02', title: 'Strategy', desc: 'Custom roadmap with KPIs, timelines, and channel mix tailored to you.' },
  { n: '03', title: 'Execution', desc: 'Precise, creative implementation by seasoned specialists in each domain.' },
  { n: '04', title: 'Optimize', desc: 'Continuous testing and data analysis to maximize performance over time.' },
];

export default function Services() {
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.sv-hero__content > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      });

      // Service rows
      document.querySelectorAll('.sv-row').forEach((row) => {
        gsap.from(row.querySelectorAll('.sv-row__content > *'), {
          y: 40, opacity: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
        gsap.from(row.querySelector('.sv-row__metric'), {
          scale: 0.9, opacity: 0, duration: 0.6,
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
      });

      gsap.from('.proc-step', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: '.sv-process', start: 'top 80%' },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page" ref={heroRef}>
      {/* HERO */}
      <section className="sv-hero full-width section">
        <div className="wrap sv-hero__inner">
          <div className="sv-hero__content">
            <p className="tag">Services</p>
            <h1 className="display-xl">Six services.<br />One agency.</h1>
            <p className="body-lg" style={{ maxWidth: 540 }}>
              Every digital capability you need to grow — under one roof, managed by a dedicated team of specialists.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <NavLink to="/contact" className="btn btn-black btn-lg">
                Get a Free Audit <FiArrowUpRight />
              </NavLink>
            </div>
          </div>
          <div className="sv-hero__nav">
            {services.map((s) => (
              <a key={s.n} href={`#sv-${s.n}`} className="sv-hero__nav-item">
                <span className="sv-hero__nav-num">{s.n}</span>
                <span className="sv-hero__nav-name">{s.title}</span>
                <FiArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="divider" />

      {/* SERVICE ROWS */}
      <section className="sv-list full-width">
        {services.map((sv, i) => (
          <ServiceRow key={sv.n} sv={sv} flipped={i % 2 !== 0} />
        ))}
      </section>

      {/* PROCESS */}
      <section className="sv-process full-width section">
        <div className="wrap">
          <div className="sv-process__header text-center">
            <p className="tag">How We Work</p>
            <h2 className="display-md">A process designed<br />for results.</h2>
          </div>
          <div className="sv-process__grid">
            {process.map((p) => (
              <div key={p.n} className="proc-step">
                <div className="proc-step__n">{p.n}</div>
                <h3 className="proc-step__title">{p.title}</h3>
                <p className="proc-step__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceRow({ sv, flipped }) {
  return (
    <div className={`sv-row full-width ${flipped ? 'sv-row--flipped' : ''}`} id={`sv-${sv.n}`}>
      <div className="wrap sv-row__inner">
        <div className="sv-row__content">
          <p className="sv-row__num">{sv.n}</p>
          <div className="sv-row__icon">{sv.icon}</div>
          <h2 className="display-md sv-row__title">{sv.title}</h2>
          <p className="sv-row__tagline">{sv.tagline}</p>
          <p className="sv-row__desc">{sv.desc}</p>
          <ul className="sv-row__features">
            {sv.features.map((f) => (
              <li key={f} className="sv-row__feature">
                <FiCheckCircle size={14} /> {f}
              </li>
            ))}
          </ul>
          <NavLink to="/contact" className="btn btn-black btn-arrow">
            Get Started <FiArrowUpRight />
          </NavLink>
        </div>

        <div className="sv-row__metric">
          <div className="sv-metric-card">
            <div className="sv-metric-card__icon">{sv.icon}</div>
            <div className="sv-metric-card__value">{sv.metric.v}</div>
            <div className="sv-metric-card__label">{sv.metric.label}</div>
            <div className="sv-metric-card__divider" />
            <div className="sv-metric-card__list">
              {sv.features.slice(0, 3).map((f) => (
                <div key={f} className="sv-metric-card__item">
                  <FiCheckCircle size={12} /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
