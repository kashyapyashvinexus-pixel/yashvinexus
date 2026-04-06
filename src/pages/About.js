import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight, FiCheckCircle, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const team = [
  { name: 'Vikram Yashvin', role: 'Founder & CEO', bio: '15+ years in digital marketing. Built Yashvinexus from a solo consultancy to a 50-person agency.', i: 'VY', color: '#0a0a0a' },
  { name: 'Sneha Kapoor', role: 'Chief Marketing Officer', bio: 'Former Fortune 500 marketing head. Expert in integrated brand strategy and performance marketing.', i: 'SK', color: '#262626' },
  { name: 'Rahul Das', role: 'Head of Technology', bio: 'Full-stack architect. Built scalable systems at leading tech companies for 12+ years.', i: 'RD', color: '#404040' },
  { name: 'Ananya Singh', role: 'SEO Director', bio: 'Google-certified specialist. Ranked 200+ websites on Page 1, with expertise in technical SEO.', i: 'AS', color: '#525252' },
  { name: 'Karan Malhotra', role: 'Social Media Lead', bio: 'Creative strategist who has grown brand communities to 1M+ followers across all platforms.', i: 'KM', color: '#737373' },
  { name: 'Priya Menon', role: 'Ecommerce Manager', bio: 'Ecommerce expert who tripled the revenue of 100+ online stores through structured growth.', i: 'PM', color: '#0a0a0a' },
];

const values = [
  { n: '01', title: 'Results First', desc: 'Every strategy is judged by one metric — did it move the needle for our client? We are obsessively ROI-focused.' },
  { n: '02', title: 'Radical Transparency', desc: 'We share everything — the wins, the losses, and the learnings. No hidden fees, no vanity metrics.' },
  { n: '03', title: 'Craft Over Shortcuts', desc: 'We take pride in doing things well. Good enough is never good enough at Yashvinexus.' },
  { n: '04', title: 'Long-Term Thinking', desc: 'We build strategies and relationships that compound over time. We play the long game.' },
];

const milestones = [
  { year: '2014', event: 'Founded as a solo SEO consultancy in Mumbai.' },
  { year: '2016', event: 'Grew to 100 clients. Expanded into paid advertising and social media.' },
  { year: '2018', event: 'Launched full web & ecommerce development capability. Team of 20.' },
  { year: '2020', event: 'Named Best Digital Agency in South Asia (Global Marketing Awards).' },
  { year: '2022', event: 'Launched proprietary analytics dashboard. Crossed 400 active clients.' },
  { year: '2024', event: 'Serving 500+ brands in 15+ countries with a team of 50+ specialists.' },
];

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.ab-hero__content > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      });

      // Values
      gsap.from('.value-item', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: '.ab-values', start: 'top 80%' },
      });

      // Team cards
      gsap.from('.team-card', {
        y: 50, opacity: 0, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: '.ab-team', start: 'top 80%' },
      });

      // Timeline
      gsap.from('.timeline-item', {
        x: -30, opacity: 0, stagger: 0.1, duration: 0.5,
        scrollTrigger: { trigger: '.ab-timeline', start: 'top 80%' },
      });

      // Story panels
      gsap.from('.ab-story__left', {
        x: -50, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: '.ab-story', start: 'top 80%' },
      });
      gsap.from('.ab-story__right', {
        x: 50, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: '.ab-story', start: 'top 80%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={pageRef}>
      {/* HERO */}
      <section className="ab-hero full-width section">
        <div className="wrap">
          <div className="ab-hero__content">
            <p className="tag">About Us</p>
            <h1 className="display-xl ab-hero__title">
              We build brands<br />that win online.
            </h1>
            <p className="body-lg ab-hero__sub">
              Yashvinexus is a Mumbai-based digital agency founded in 2014 with a single purpose: to help businesses compete and win in the digital world. We are 50+ specialists, and we treat your brand like it's our own.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <NavLink to="/contact" className="btn btn-black btn-lg">
                Work With Us <FiArrowUpRight />
              </NavLink>
              <NavLink to="/services" className="btn btn-ghost btn-lg">
                See Our Services
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="ab-story section full-width">
        <div className="wrap ab-story__inner">
          <div className="ab-story__left">
            <p className="tag">Our Story</p>
            <h2 className="display-md">Ten years of<br />digital excellence.</h2>
          </div>
          <div className="ab-story__right">
            <p className="body-lg">
              Yashvinexus started in 2014 as a one-person SEO shop. Vikram Yashvin, our founder, had a vision: bring enterprise-level digital marketing to growing businesses that couldn't afford big agency price tags.
            </p>
            <p className="body-md" style={{ marginTop: 16 }}>
              What started with 5 clients grew into a full-service agency trusted by 500+ brands. We have weathered every Google algorithm update, social media platform shift, and market disruption — and we have always come out stronger.
            </p>
            <p className="body-md" style={{ marginTop: 16 }}>
              Today, Yashvinexus is a team of 50+ specialists — strategists, designers, developers, and analysts. We are based in Mumbai but serve clients across 15 countries. Our culture is built on craft, transparency, and relentless pursuit of results.
            </p>
            <div className="ab-story__badges">
              {['Google Premier Partner', 'Meta Business Partner', 'ISO 9001', 'Award-Winning 2020'].map((b) => (
                <span key={b} className="badge badge-subtle"><FiCheckCircle size={11} /> {b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* VALUES */}
      <section className="ab-values section full-width">
        <div className="wrap">
          <div className="ab-values__header">
            <p className="tag">Our Values</p>
            <h2 className="display-md">The principles that<br />guide us every day.</h2>
          </div>
          <div className="ab-values__grid">
            {values.map((v) => (
              <div key={v.n} className="value-item">
                <div className="value-item__n">{v.n}</div>
                <h3 className="value-item__title">{v.title}</h3>
                <p className="value-item__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="ab-team section full-width">
        <div className="wrap">
          <div className="ab-team__header">
            <p className="tag">The Team</p>
            <h2 className="display-md">50+ experts, one<br />shared purpose.</h2>
          </div>
          <div className="ab-team__grid">
            {team.map((m) => (
              <div key={m.name} className="team-card">
                <div className="team-card__avatar" style={{ background: m.color }}>
                  {m.i}
                </div>
                <div className="team-card__info">
                  <h3 className="team-card__name">{m.name}</h3>
                  <p className="team-card__role">{m.role}</p>
                  <p className="team-card__bio">{m.bio}</p>
                </div>
                <div className="team-card__socials">
                  <a href="#" className="team-card__social" aria-label="LinkedIn"><FiLinkedin size={14} /></a>
                  <a href="#" className="team-card__social" aria-label="Twitter"><FiTwitter size={14} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="ab-timeline section full-width">
        <div className="wrap ab-timeline__inner">
          <div className="ab-timeline__header">
            <p className="tag">Milestones</p>
            <h2 className="display-md">A decade of growth.</h2>
          </div>
          <div className="ab-timeline__list">
            {milestones.map((m, i) => (
              <div key={m.year} className="timeline-item">
                <div className="timeline-item__year">{m.year}</div>
                <div className="timeline-item__line">
                  <div className="timeline-item__dot" />
                  {i < milestones.length - 1 && <div className="timeline-item__connector" />}
                </div>
                <div className="timeline-item__event">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
