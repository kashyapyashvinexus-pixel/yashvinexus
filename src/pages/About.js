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

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.ab-hero__content > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={pageRef}>

      {/* TEAM */}
      <section className="ab-team section full-width">
        <div className="wrap">
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

                {/* ✅ FIXED LINKS */}
                <div className="team-card__socials">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="team-card__social"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={14} />
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="team-card__social"
                    aria-label="Twitter"
                  >
                    <FiTwitter size={14} />
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
