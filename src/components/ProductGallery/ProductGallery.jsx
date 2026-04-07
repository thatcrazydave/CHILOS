import React, { useState } from 'react';
import styles from './ProductGallery.module.css';

/**
 * images: string[] — array of image URLs
 * If only one image, thumbnails are hidden.
 */
export default function ProductGallery({ images = [], productName = '' }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const validImages = images.filter(Boolean);

  if (validImages.length === 0) {
    return (
      <div className={styles.placeholder}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span>No image available</span>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.mainImageWrapper}>
        <img
          src={validImages[activeIdx]}
          alt={`${productName} — image ${activeIdx + 1}`}
          className={styles.mainImage}
        />
      </div>

      {/* Thumbnails (only when more than 1 image) */}
      {validImages.length > 1 && (
        <div className={styles.thumbs}>
          {validImages.map((src, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
