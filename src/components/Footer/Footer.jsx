import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS, SOCIAL_LINKS } from '../../lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoAccent}>CHIL</span>OS
          </Link>
          <p className={styles.tagline}>
            Quality products, delivered with care. Browse our catalog and get in touch.
          </p>
        </div>

        {/* Quick links */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.links}>
            <li><Link to="/" className={styles.link}>Home</Link></li>
            <li><Link to="/products" className={styles.link}>Products</Link></li>
            <li><a href="/#about" className={styles.link}>About Us</a></li>
            <li><a href="/#contact" className={styles.link}>Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact</h3>
          <ul className={styles.contactList}>
            <li>
              <a href={`mailto:${COMPANY_EMAIL}`} className={styles.link}>
                {COMPANY_EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY_PHONE}`} className={styles.link}>
                {COMPANY_PHONE}
              </a>
            </li>
            <li className={styles.address}>{COMPANY_ADDRESS}</li>
          </ul>
        </div>

        {/* Social */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Follow Us</h3>
          <div className={styles.socials}>
            <a href={SOCIAL_LINKS.instagram} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={SOCIAL_LINKS.twitter} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="Twitter/X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href={SOCIAL_LINKS.facebook} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href={SOCIAL_LINKS.whatsapp} className={styles.socialLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            &copy; {year} CHILOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
