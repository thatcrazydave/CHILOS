import React from 'react';
import { Link } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm/ProductForm';
import styles from './AdminFormPage.module.css';

export default function AddProductPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/admin" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Dashboard
        </Link>
        <h1 className={styles.title}>Add New Product</h1>
        <p className={styles.subtitle}>Fill in the details below to add a product to your catalog.</p>
      </div>

      <div className={styles.formWrapper}>
        <ProductForm />
      </div>
    </div>
  );
}
