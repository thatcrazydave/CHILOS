import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, deleteProduct } from '../../hooks/useProducts';
import { formatPrice } from '../../lib/utils';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import styles from './AdminDashboardPage.module.css';

export default function AdminDashboardPage() {
  const { products, loading, error, refetch } = useProducts();
  const [deleteTarget, setDeleteTarget] = useState(null); // product to confirm delete
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError('');
    const { error: err } = await deleteProduct(deleteTarget.id);
    setDeleting(false);
    if (err) {
      setDeleteError(err.message ?? 'Failed to delete product.');
    } else {
      setDeleteTarget(null);
      refetch();
    }
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Product Dashboard</h1>
          <p className={styles.subtitle}>
            {!loading && `${products.length} ${products.length === 1 ? 'product' : 'products'} in catalog`}
          </p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Product
          </Button>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className={styles.errorBanner} role="alert">{error}</div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className={styles.tableWrapper}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.rowSkeleton} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && products.length === 0 && (
        <div className={styles.empty}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          <p>No products yet. Add your first product to get started.</p>
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm">Add First Product</Button>
          </Link>
        </div>
      )}

      {/* Table */}
      {!loading && !error && products.length > 0 && (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Product</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.productCell}>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productThumb}
                        />
                      ) : (
                        <div className={styles.productThumbPlaceholder}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                      )}
                      <div>
                        <p className={styles.productName}>{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.categoryBadge}>{product.category || '—'}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                  </td>
                  <td className={styles.td}>
                    <span className={`${styles.statusBadge} ${product.available ? styles.statusAvailable : styles.statusUnavailable}`}>
                      {product.available ? 'Available' : 'Hidden'}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setDeleteError('');
                          setDeleteTarget(product);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => { setDeleteTarget(null); setDeleteError(''); }}
        title="Delete Product"
      >
        <div className={styles.modalBody}>
          <p>
            Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
          </p>
          {deleteError && (
            <div className={styles.errorBanner} role="alert" style={{ marginTop: '12px' }}>
              {deleteError}
            </div>
          )}
          <div className={styles.modalActions}>
            <Button
              variant="outline"
              onClick={() => { setDeleteTarget(null); setDeleteError(''); }}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={deleting}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
