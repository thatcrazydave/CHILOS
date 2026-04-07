import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import ProductForm from '../../components/admin/ProductForm/ProductForm';
import styles from './AdminFormPage.module.css';

export default function EditProductPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.page}>
        <p className={styles.errorMsg}>
          {error || 'Product not found.'}
        </p>
        <Link to="/admin" className={styles.back}>← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/admin" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Dashboard
        </Link>
        <h1 className={styles.title}>Edit Product</h1>
        <p className={styles.subtitle}>Editing: <strong>{product.name}</strong></p>
      </div>

      <div className={styles.formWrapper}>
        <ProductForm existingData={product} productId={id} />
      </div>
    </div>
  );
}
