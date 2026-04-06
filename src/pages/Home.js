import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiArrowUpRight, FiTrendingUp, FiGlobe, FiSearch, FiShare2,
  FiShoppingCart, FiTarget, FiCheckCircle, FiStar, FiArrowRight
} from 'react-icons/fi';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Data ───────────────────────────────────────── */
const services = [
  { icon: <FiTrendingUp />, n: '01', title: 'Advertising', desc: 'Data-driven ad campaigns on Google, Meta, YouTube & programmatic networks that maximize ROI.' },
  { icon: <FiTarget />, n: '02', title: 'Digital Marketing', desc: 'Full-funnel marketing from awareness to conversion. Strategy, content & automation under one roof.' },
  { icon: <FiGlobe />, n: '03', title: 'Website Development', desc: 'Stunning, performant websites built with React, Next.js and modern frameworks — conversion-optimised.' },
  { icon: <FiSearch />, n: '04', title: 'SEO Optimization', desc: 'Technical SEO, content strategy and link building that gets you to page 1 and keeps you there.' },
  { icon: <FiShare2 />, n: '05', title: 'Social Media', desc: 'End-to-end social presence management — content creation, community and paid social campaigns.' },
  { icon: <FiShoppingCart />, n: '06', title: 'Ecommerce Management', desc: 'Complete online store management from setup and listings to ads and revenue growth strategies.' },
];

const stats = [
  { v: '500+', label: 'Clients Served', sub: 'Across 15+ countries' },
  { v: '98%', label: 'Satisfaction Rate', sub: 'Measured quarterly' },
  { v: '10+', label: 'Years of Expertise', sub: 'Since 2014' },
  { v: '4.9★', label: 'Average Rating', sub: 'Google & Clutch' },
];

const testimonials = [
  { name: 'Riya Sharma', role: 'CEO, StyleNation', text: 'Yashvinexus tripled our ecommerce revenue in 6 months. Their team is exceptional — strategic, creative, and always on time.', stars: 5 },
  { name: 'Arjun Mehta', role: 'Founder, TechStart', text: 'Page 1 Google rankings in 90 days. The SEO team knows exactly what they\\\'re doing. ROI has been incredible.', stars: 5 },
  { name: 'Priya Nair', role: 'Marketing Head, FreshBite', text: '10x engagement on social media. They treated our brand like it was their own business. Highly recommended.', stars: 5 },
];

/* ── Home Component ─────────────────────────────── */
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <HeroSection />
      <LogoStrip />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <WhySection />
    </div>
  );
}

/* ── HERO ───────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const badgesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(titleRef.current.querySelectorAll('.hero__word'), {
        y: '100%',
        opacity: 0,
        duration: 0.9,
        stagger: 0.07,
      })
        .from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.7 }, '-=0.4')
        .from(actionsRef.current.children, { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.4')
        .from(badgesRef.current.children, { y: 10, opacity: 0, duration: 0.4, stagger: 0.06 }, '-=0.3');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const words = ['Digital', 'Growth', 'That', 'Drives', 'Real', 'Results.'];

  return (
    <section className="hero full-width" ref={heroRef}>
      <div className="hero__noise" />
      <div className="wrap hero__inner">
        <div className="hero__content">
          <div ref={titleRef} className="hero__title-wrap">
            {words.map((w, i) => (
              <span key={i} className="hero__title-clip">
                <span className="hero__word">{w}&nbsp;</span>
              </span>
            ))}
          </div>

          <p className="hero__subtitle" ref={subtitleRef}>
            Yashvinexus is a full-service digital agency helping brands win online — from advertising and SEO to complete ecommerce management.
          </p>

          <div className="hero__actions" ref={actionsRef}>
            <NavLink to="/services" className="btn btn-black btn-lg btn-arrow">
              Explore Services <FiArrowUpRight />
            </NavLink>
            <NavLink to="/contact" className="btn btn-ghost btn-lg">
              Free Consultation
            </NavLink>
          </div>

          <div className="hero__badges" ref={badgesRef}>
            {['Google Partner', 'Meta Certified', 'ISO 9001 Certified', '24/7 Support'].map((b) => (
              <span key={b} className="hero__badge">
                <FiCheckCircle size={12} /> {b}
              </span>
            ))}
          </div>
        </div>

        <div className="hero__right">
          <HeroCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

function HeroCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    // Entry animation
    gsap.from(card, { x: 60, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="hero-card-perspective">
      <div className="hero-card" ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
        <div className="hero-card__header">
          <div className="hero-card__dot hero-card__dot--r" />
          <div className="hero-card__dot hero-card__dot--y" />
          <div className="hero-card__dot hero-card__dot--g" />
          <span className="hero-card__title-label">Campaign Dashboard</span>
        </div>

        <div className="hero-card__kpis">
          <div className="hero-card__kpi">
            <span className="hero-card__kpi-val">+320%</span>
            <span className="hero-card__kpi-label">Revenue Growth</span>
            <span className="hero-card__kpi-badge hero-card__kpi-badge--up">↑ 42% MoM</span>
          </div>
          <div className="hero-card__divider" />
          <div className="hero-card__kpi">
            <span className="hero-card__kpi-val">₹12.4M</span>
            <span className="hero-card__kpi-label">Ad Spend Managed</span>
            <span className="hero-card__kpi-badge hero-card__kpi-badge--up">↑ 8% WoW</span>
          </div>
        </div>

        <div className="hero-card__chart">
          {[40, 55, 48, 72, 65, 88, 76, 95, 80, 100].map((h, i) => (
            <div
              key={i}
              className="hero-card__bar"
              style={{
                height: `${h}%`,
                background: i === 9 ? 'var(--black)' : `rgba(0,0,0,${0.08 + i * 0.07})`,
              }}
            />
          ))}
        </div>

        <div className="hero-card__footer">
          <span className="hero-card__live-dot" />
          <span className="hero-card__live-label">Live • Updated just now</span>
        </div>
      </div>
    </div>
  );
}

/* ── LOGO STRIP ─────────────────────────────────── */
function LogoStrip() {
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.logo-strip__item', {
        opacity: 0, y: 16, stagger: 0.06, duration: 0.5,
        scrollTrigger: { trigger: stripRef.current, start: 'top 90%' },
      });
    }, stripRef);
    return () => ctx.revert();
  }, []);

  const brands = ['Google', 'Shopify', 'Meta', 'HubSpot', 'Salesforce', 'AWS', 'Stripe', 'Adobe'];

  return (
    <div className="logo-strip full-width" ref={stripRef}>
      <div className="wrap">
        <p className="logo-strip__label">Trusted by teams at</p>
        <div className="logo-strip__row">
          {brands.map((b) => (
            <div key={b} className="logo-strip__item">{b}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES ───────────────────────────────────── */
function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from('.services-header', {
        y: 30, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section full-width home-services" ref={sectionRef}>
      <div className="wrap">
        <div className="services-header">
          <div>
            <p className="tag">What We Do</p>
            <h2 className="display-lg">Services built<br />for digital growth.</h2>
          </div>
          <div className="services-header__right">
            <p className="body-lg">Six core capabilities. One dedicated team. Infinite possibilities for your brand.</p>
            <NavLink to="/services" className="btn btn-ghost btn-arrow">
              All Services <FiArrowRight />
            </NavLink>
          </div>
        </div>

        <div className="home-services__grid">
          {services.map((s, i) => (
            <div key={s.title} className="s-card">
              <div className="s-card__num">{s.n}</div>
              <div className="s-card__icon">{s.icon}</div>
              <h3 className="s-card__title">{s.title}</h3>
              <p className="s-card__desc">{s.desc}</p>
              <NavLink to="/services" className="s-card__link">
                Learn more <FiArrowUpRight size={14} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── STATS ──────────────────────────────────────── */
function StatsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section full-width home-stats" ref={ref}>
      <div className="wrap">
        <div className="home-stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <div className="stat-item__value">{s.v}</div>
              <div className="stat-item__label">{s.label}</div>
              <div className="stat-item__sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ───────────────────────────────── */
function TestimonialsSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t-card', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.testimonials-header', {
        y: 30, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section full-width home-testimonials" ref={ref}>
      <div className="wrap">
        <div className="testimonials-header text-center">
          <p className="tag">Social Proof</p>
          <h2 className="display-lg">Loved by brands<br />across industries.</h2>
        </div>

        <div className="grid-3 home-testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="t-card card">
              <div className="t-card__stars">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <FiStar key={i} size={14} />
                ))}
              </div>
              <p className="t-card__text">"{t.text}"</p>
              <div className="t-card__author">
                <div className="t-card__avatar">{t.name[0]}</div>
                <div>
                  <div className="t-card__name">{t.name}</div>
                  <div className="t-card__role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHY US ─────────────────────────────────────── */
function WhySection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-item', {
        x: -30, opacity: 0, duration: 0.5, stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
      gsap.from('.why-right', {
        x: 40, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    { title: 'Data-First Strategy', desc: 'Every campaign backed by analytics. No guesswork, only decisions.' },
    { title: 'Dedicated Managers', desc: 'Your brand gets a dedicated team and a single point of contact.' },
    { title: 'Full Transparency', desc: 'Real-time dashboards, weekly calls, monthly deep-dive reports.' },
    { title: 'Proven Results', desc: '500+ brands, 98% satisfaction rate, measurable outcomes every time.' },
  ];

  return (
    <section className="section full-width home-why" ref={ref}>
      <div className="wrap home-why__inner">
        <div className="home-why__left">
          <p className="tag">Why Yashvinexus</p>
          <h2 className="display-md">The difference is<br />in the details.</h2>
          <div className="home-why__items">
            {items.map((item) => (
              <div key={item.title} className="why-item">
                <div className="why-item__check"><FiCheckCircle size={16} /></div>
                <div>
                  <h4 className="why-item__title">{item.title}</h4>
                  <p className="why-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <NavLink to="/about" className="btn btn-black btn-lg btn-arrow">
            Our Story <FiArrowUpRight />
          </NavLink>
        </div>

        <div className="why-right home-why__right">
          <div className="why-card">
            <div className="why-card__label">Client Growth</div>
            <div className="why-card__big">+320%</div>
            <div className="why-card__sub">Average revenue growth in year 1</div>

            <div className="why-card__bars">
              {[
                { label: 'Organic Traffic', pct: 87 },
                { label: 'Paid ROI', pct: 94 },
                { label: 'Social Reach', pct: 76 },
                { label: 'Conversions', pct: 91 },
              ].map((b) => (
                <div key={b.label} className="why-card__bar-wrap">
                  <div className="why-card__bar-top">
                    <span>{b.label}</span>
                    <span>{b.pct}%</span>
                  </div>
                  <div className="why-card__bar-bg">
                    <div className="why-card__bar-fill" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
