import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard/ProductCard';
import Button from '../components/Button/Button';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '../lib/constants';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Welcome to CHILOS</span>
            <h1 className={styles.heroHeadline}>
              Quality Products,<br />
              <span className={styles.heroAccent}>Delivered with Care</span>
            </h1>
            <p className={styles.heroDescription}>
              Discover our carefully curated catalog of premium products. From everyday essentials to unique finds — browse, explore, and get in touch with us.
            </p>
            <div className={styles.heroActions}>
              <Link to="/products">
                <Button variant="primary" size="lg">Browse Products</Button>
              </Link>
              <a href="#contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroShape1} />
            <div className={styles.heroShape2} />
            <div className={styles.heroDecor}>
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className={styles.heroSvg}>
                <path fill="currentColor" d="M44.5,-62.3C57,-52.4,65.8,-38.2,70.2,-22.6C74.6,-7,74.7,10,69.1,24.8C63.5,39.6,52.3,52.2,38.6,60.3C24.9,68.4,8.7,72,-7.4,71C-23.5,70,-39.5,64.4,-51.5,54.2C-63.5,44,-71.4,29.2,-73.3,13.5C-75.2,-2.2,-71.1,-18.8,-62.4,-31.3C-53.7,-43.8,-40.5,-52.1,-27.1,-62C-13.8,-71.9,-0.3,-83.3,12.5,-82.3C25.3,-81.3,32,-72.2,44.5,-62.3Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Products</h2>
            <Link to="/products" className={styles.sectionLink}>
              View all products →
            </Link>
          </div>

          {loading ? (
            <div className={styles.featuredGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className={styles.featuredGrid}>
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyFeatured}>
              <p>Products will appear here once the catalog is set up.</p>
              <Link to="/products">
                <Button variant="outline" size="sm">Go to Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className={styles.about}>
        <div className={`container ${styles.aboutInner}`}>
          <div className={styles.aboutText}>
            <span className={styles.sectionBadge}>About Us</span>
            <h2 className={styles.aboutTitle}>We Are CHILOS</h2>
            <p className={styles.aboutBody}>
              CHILOS is a product company dedicated to bringing you high-quality goods across a range of categories. Our mission is simple: source the best, present it clearly, and make it easy for you to reach us.
            </p>
            <p className={styles.aboutBody}>
              We believe in transparency — every product in our catalog is photographed, described, and priced honestly. No hidden fees. No confusing jargon. Just great products.
            </p>
            <Link to="/products">
              <Button variant="secondary" size="md">Explore Our Catalog</Button>
            </Link>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <p className={styles.contactSubtitle}>Interested in a product? Have a question? We&rsquo;d love to hear from you.</p>
          </div>

          <div className={styles.contactGrid}>
            <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 className={styles.contactCardTitle}>Email</h3>
                <p className={styles.contactCardValue}>{COMPANY_EMAIL}</p>
              </div>
            </a>

            <a href={`tel:${COMPANY_PHONE}`} className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <h3 className={styles.contactCardTitle}>Phone</h3>
                <p className={styles.contactCardValue}>{COMPANY_PHONE}</p>
              </div>
            </a>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <h3 className={styles.contactCardTitle}>Address</h3>
                <p className={styles.contactCardValue}>{COMPANY_ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
