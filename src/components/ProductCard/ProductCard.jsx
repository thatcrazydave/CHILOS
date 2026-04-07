import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, truncate } from '../../lib/utils';
import Button from '../Button/Button';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { id, name, description, price, image, available } = product;

  return (
    <article className={styles.card}>
      <Link to={`/products/${id}`} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <div className={styles.imageWrapper}>
          {image ? (
            <img src={image} alt={name} className={styles.image} loading="lazy" />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
          )}
          {!available && (
            <span className={styles.unavailableBadge}>Out of Stock</span>
          )}
        </div>
      </Link>

      <div className={styles.body}>
        <Link to={`/products/${id}`} className={styles.nameLink}>
          <h2 className={styles.name}>{name}</h2>
        </Link>
        <p className={styles.description}>{truncate(description, 90)}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <Link to={`/products/${id}`}>
            <Button size="sm" variant="primary">View Details</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
