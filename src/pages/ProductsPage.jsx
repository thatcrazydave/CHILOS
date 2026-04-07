import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const { products, loading, error } = useProducts({ search, category });

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Our Products</h1>
            <p className={styles.subtitle}>
              Browse our full catalog. Use the search and filters to find exactly what you&rsquo;re looking for.
            </p>
          </div>
          {!loading && !error && (
            <p className={styles.count}>
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        {/* Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}
