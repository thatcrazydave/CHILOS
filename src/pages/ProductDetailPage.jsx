import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import ProductGallery from '../components/ProductGallery/ProductGallery';
import Button from '../components/Button/Button';
import { formatPrice } from '../lib/utils';
import { COMPANY_EMAIL } from '../lib/constants';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return (
      <div className="container">
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={`container ${styles.notFound}`}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <h2>Product Not Found</h2>
        <p>{error || 'This product does not exist or has been removed.'}</p>
        <Link to="/products">
          <Button variant="primary">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const images = product.image ? [product.image] : [];
  const contactSubject = encodeURIComponent(`Inquiry about: ${product.name}`);
  const contactBody = encodeURIComponent(`Hi,\n\nI'm interested in the product "${product.name}" (ID: ${product.id}).\n\nPlease provide more details.`);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link to="/products" className={styles.breadcrumbLink}>Products</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{product.name}</span>
        </nav>

        <div className={styles.detail}>
          {/* Gallery */}
          <div className={styles.galleryCol}>
            <ProductGallery images={images} productName={product.name} />
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            {product.category && (
              <span className={styles.category}>{product.category}</span>
            )}

            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              <span className={`${styles.availability} ${product.available ? styles.available : styles.unavailable}`}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.description && (
              <div className={styles.descriptionSection}>
                <h2 className={styles.descLabel}>Description</h2>
                <p className={styles.description}>{product.description}</p>
              </div>
            )}

            <div className={styles.ctaSection}>
              <p className={styles.ctaText}>
                Interested in this product? Get in touch with us and we'll be happy to help.
              </p>
              <a
                href={`mailto:${COMPANY_EMAIL}?subject=${contactSubject}&body=${contactBody}`}
                className={styles.ctaLink}
              >
                <Button variant="primary" size="lg" fullWidth>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Contact Us About This Product
                </Button>
              </a>
              <Link to="/products">
                <Button variant="outline" size="md" fullWidth>← Back to Products</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
