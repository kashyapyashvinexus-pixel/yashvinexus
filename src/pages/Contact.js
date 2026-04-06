import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiMail, FiPhone, FiMapPin, FiClock, FiSend,
  FiCheckCircle, FiAlertCircle, FiLoader, FiChevronDown
} from 'react-icons/fi';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

/* ── CONFIG ─────────────────────────────────────── */
const SERVICES = [
  'Advertising', 'Digital Marketing', 'Website Development',
  'SEO Optimization', 'Social Media Management', 'Ecommerce Management', 'Other',
];

const BUDGETS = [
  'Under ₹25,000/mo', '₹25K – ₹75K/mo', '₹75K – ₹2L/mo', '₹2L+/mo', 'One-time project',
];

const REQUIRED = ['name', 'email', 'message'];

/* ── VALIDATION ─────────────────────────────────── */
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required';
  if (!form.email.trim()) errors.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address';
  if (form.phone && !/^\+?[\d\s\-()]{8,15}$/.test(form.phone)) errors.phone = 'Enter a valid phone number';
  if (!form.message.trim()) errors.message = 'Tell us about your project';
  else if (form.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
  return errors;
}

/* ── FORM HOOK ──────────────────────────────────── */
function useContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const set = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  }, [errors]);

  const touch = useCallback((field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate({ ...form });
    if (errs[field]) setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    else setErrors((prev) => {
      const n = { ...prev };
      delete n[field];
      return n;
    });
  }, [form]);

  const submit = useCallback(async (e) => {
    e.preventDefault();

    const allTouched = REQUIRED.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrField = document.querySelector('.cf-field--error input, .cf-field--error textarea');
      if (firstErrField) {
        firstErrField.focus();
        gsap.from(firstErrField, { x: -8, duration: 0.05, repeat: 5, yoyo: true, ease: 'power1.inOut' });
      }
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.05 ? resolve() : reject(new Error('Network error'));
        }, 1800);
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
    }
  }, [form]);

  const reset = useCallback(() => {
    setStatus('idle');
    setErrors({});
    setTouched({});
  }, []);

  return { form, errors, touched, status, set, touch, submit, reset };
}

/* ── FAQ DATA ───────────────────────────────────── */
const faqs = [
  { q: 'How long until I see results?', a: 'For SEO, expect meaningful improvements in 3–6 months. Paid campaigns can show results within the first 2 weeks. We set realistic timelines during onboarding.' },
  { q: 'Do you offer custom packages?', a: 'Absolutely. We design every engagement around your specific goals, current situation, and budget. No cookie-cutter retainers.' },
  { q: 'How do you track and report results?', a: 'You get a dedicated dashboard with real-time data, plus weekly short updates and a monthly deep-dive strategy call with your account manager.' },
  { q: 'What industries do you work with?', a: 'We serve brands across ecommerce, SaaS, fintech, healthcare, hospitality, retail, and more. Our methodology adapts to any industry.' },
  { q: 'Is there a minimum contract?', a: 'We recommend a minimum 3-month engagement to run proper tests and deliver meaningful results. We do not believe in locking clients into long contracts beyond that.' },
];

/* ── MAIN COMPONENT ────────────────────────────── */
export default function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.ct-hero__content > *', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      });
      gsap.from('.ct-info-card', {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.5,
        scrollTrigger: { trigger: '.ct-info-cards', start: 'top 85%' },
      });
      gsap.from('.faq-item', {
        y: 20, opacity: 0, stagger: 0.07, duration: 0.4,
        scrollTrigger: { trigger: '.ct-faq', start: 'top 80%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page" ref={pageRef}>
      <HeroSection />
      <MainSection />
      <FAQSection />
    </div>
  );
}

/* ── HERO ───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="ct-hero full-width section">
      <div className="wrap">
        <div className="ct-hero__content">
          <p className="tag">Contact</p>
          <h1 className="display-xl ct-hero__title">
            Let's talk<br />about growth.
          </h1>
          <p className="body-lg ct-hero__sub">
            Fill out the form and one of our specialists will get back to you within 24 hours with a tailored proposal.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── MAIN: FORM + INFO ──────────────────────────── */
function MainSection() {
  return (
    <section className="ct-main full-width section">
      <div className="wrap ct-main__inner">
        <ContactForm />
        <Sidebar />
      </div>
    </section>
  );
}

/* ── FORM ───────────────────────────────────────── */
function ContactForm() {
  const { form, errors, touched, status, set, touch, submit, reset } = useContactForm();
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        x: -40, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      });
    });
    return () => ctx.revert();
  }, []);

  if (status === 'success') {
    return (
      <div className="cf-success" ref={formRef}>
        <div className="cf-success__icon"><FiCheckCircle size={32} /></div>
        <h2 className="cf-success__title">Message received!</h2>
        <p className="cf-success__text">Thank you {form.name || ''}. Our team will reach out to you within 24 hours with a customised plan.</p>
        <button className="btn btn-black" onClick={reset}>Send Another Message</button>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="cf-error-state" ref={formRef}>
        <div className="cf-error-state__icon"><FiAlertCircle size={32} /></div>
        <h2>Something went wrong</h2>
        <p>We couldn't send your message. Please try again or email us directly at <a href="mailto:hello@yashvinexus.com">hello@yashvinexus.com</a></p>
        <button className="btn btn-black" onClick={reset}>Try Again</button>
      </div>
    );
  }

  const Field = ({ id, label, required, error, children }) => (
    <div className={`cf-field ${error && touched[id] ? 'cf-field--error' : ''} ${touched[id] && !error ? 'cf-field--valid' : ''}`}>
      <label htmlFor={id} className="cf-label">
        {label}
        {required && <span className="cf-required">*</span>}
      </label>
      {children}
      {touched[id] && error && (
        <span className="cf-error"><FiAlertCircle size={12} /> {error}</span>
      )}
    </div>
  );

  return (
    <form className="contact-form" onSubmit={submit} noValidate ref={formRef}>
      <div className="cf-header">
        <h2 className="cf-title">Send us a message</h2>
        <p className="cf-subtitle">We'll respond within 24 business hours.</p>
      </div>

      <div className="cf-grid-2">
        <Field id="name" label="Full Name" required error={errors.name}>
          <input
            id="name"
            type="text"
            className="cf-input"
            placeholder="Vikram Sharma"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            onBlur={() => touch('name')}
            autoComplete="name"
          />
        </Field>

        <Field id="email" label="Email Address" required error={errors.email}>
          <input
            id="email"
            type="email"
            className="cf-input"
            placeholder="vikram@company.com"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => touch('email')}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="cf-grid-2">
        <Field id="phone" label="Phone Number" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className="cf-input"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => touch('phone')}
            autoComplete="tel"
          />
        </Field>

        <Field id="company" label="Company Name">
          <input
            id="company"
            type="text"
            className="cf-input"
            placeholder="Your Company Ltd."
            value={form.company}
            onChange={(e) => set('company', e.target.value)}
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="cf-grid-2">
        <Field id="service" label="Service Interested In">
          <div className="cf-select-wrap">
            <select
              id="service"
              className="cf-select"
              value={form.service}
              onChange={(e) => set('service', e.target.value)}
            >
              <option value="">Select a service</option>
              {SERVICES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <FiChevronDown className="cf-select-arrow" size={14} />
          </div>
        </Field>

        <Field id="budget" label="Monthly Budget">
          <div className="cf-select-wrap">
            <select
              id="budget"
              className="cf-select"
              value={form.budget}
              onChange={(e) => set('budget', e.target.value)}
            >
              <option value="">Select budget range</option>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
            <FiChevronDown className="cf-select-arrow" size={14} />
          </div>
        </Field>
      </div>

      <Field id="message" label="Your Message" required error={errors.message}>
        <textarea
          id="message"
          className="cf-input cf-textarea"
          placeholder="Tell us about your project, current challenges, and what success looks like for you..."
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          onBlur={() => touch('message')}
          rows={6}
        />
        <div className="cf-char-count">{form.message.length} characters</div>
      </Field>

      <div className="cf-footer">
        <button type="submit" className="btn btn-black btn-lg cf-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <><FiLoader className="cf-spinner" size={16} /> Sending...</>
          ) : (
            <><FiSend size={15} /> Send Message</>
          )}
        </button>
        <p className="cf-privacy">
          <FiCheckCircle size={12} /> We respect your privacy. No spam, ever.
        </p>
      </div>
    </form>
  );
}

/* ── SIDEBAR ─────────────────────────────────────── */
function Sidebar() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        x: 40, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const info = [
    { icon: <FiMail />, label: 'Email', value: 'hello@yashvinexus.com' },
    { icon: <FiPhone />, label: 'Phone', value: '+91 98765 43210' },
    { icon: <FiMapPin />, label: 'Address', value: '123 Digital Ave, Mumbai 400001' },
    { icon: <FiClock />, label: 'Hours', value: 'Mon–Sat, 9AM–7PM IST' },
  ];

  return (
    <aside className="ct-sidebar" ref={ref}>
      <div className="ct-sidebar__section">
        <h3 className="ct-sidebar__heading">Contact Information</h3>
        <div className="ct-info-cards">
          {info.map(({ icon, label, value }) => (
            <div key={label} className="ct-info-card">
              <div className="ct-info-card__icon">{icon}</div>
              <div>
                <div className="ct-info-card__label">{label}</div>
                <div className="ct-info-card__value">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ct-sidebar__section">
        <div className="ct-sidebar__card">
          <div className="ct-sidebar__card-icon"><FiCheckCircle /></div>
          <h4 className="ct-sidebar__card-title">What happens next?</h4>
          <ol className="ct-sidebar__steps">
            <li>We review your inquiry within 2 hours</li>
            <li>A specialist prepares a tailored proposal</li>
            <li>We schedule a strategy call within 24 hours</li>
          </ol>
        </div>
      </div>

      <div className="ct-sidebar__section">
        <div className="ct-sidebar__trust">
          {['500+ Clients', '98% Satisfaction', 'No Long Contracts', '24/7 Support'].map((t) => (
            <div key={t} className="ct-trust-item">
              <FiCheckCircle size={13} /> {t}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ── FAQ ─────────────────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen((prev) => {
      const newVal = prev === i ? null : i;
      const el = document.querySelector(`#faq-ans-${i}`);
      if (el) {
        if (newVal === i) {
          gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' });
        }
      }
      return newVal;
    });
  };

  return (
    <section className="ct-faq full-width section">
      <div className="wrap ct-faq__inner">
        <div className="ct-faq__header">
          <p className="tag">FAQ</p>
          <h2 className="display-md">Questions we<br />hear often.</h2>
        </div>
        <div className="ct-faq__list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
              <button
                type="button"
                className="faq-item__q"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <FiChevronDown className="faq-item__chevron" size={16} />
              </button>
              <div
                id={`faq-ans-${i}`}
                className="faq-item__a"
                style={{ height: open === i ? 'auto' : 0, overflow: 'hidden' }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
