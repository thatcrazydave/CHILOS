import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { createProduct, updateProduct } from '../../../hooks/useProducts';
import { PRODUCT_CATEGORIES } from '../../../lib/constants';
import Button from '../../Button/Button';
import styles from './ProductForm.module.css';

/**
 * existingData: product object for edit mode, null/undefined for create mode
 * productId:   product uuid for edit mode
 */
export default function ProductForm({ existingData, productId }) {
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: PRODUCT_CATEGORIES[1],
    available: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name ?? '',
        description: existingData.description ?? '',
        price: existingData.price?.toString() ?? '',
        category: existingData.category ?? PRODUCT_CATEGORIES[1],
        available: existingData.available ?? true,
      });
      setImagePreview(existingData.image ?? null);
    }
  }, [existingData]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(file) {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      setFormError('A valid price is required.');
      return;
    }

    setSubmitting(true);
    try {
      let imageUrl = isEditing ? (existingData?.image ?? null) : null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
        image: imageUrl,
      };

      if (isEditing) {
        const { error } = await updateProduct(productId, payload);
        if (error) throw error;
      } else {
        const { error } = await createProduct(payload);
        if (error) throw error;
      }

      navigate('/admin');
    } catch (err) {
      setFormError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const categoryOptions = PRODUCT_CATEGORIES.filter((c) => c !== 'All');

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {formError && (
        <div className={styles.errorBanner} role="alert">
          {formError}
        </div>
      )}

      {/* Image upload */}
      <div className={styles.imageSection}>
        <div className={styles.imagePreview}>
          {imagePreview ? (
            <img src={imagePreview} alt="Product preview" className={styles.previewImg} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>No image</span>
            </div>
          )}
        </div>
        <div className={styles.imageUpload}>
          <label className={styles.uploadLabel} htmlFor="image-upload">
            {imagePreview ? 'Change Image' : 'Upload Image'}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <button
              type="button"
              className={styles.removeImage}
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
              }}
            >
              Remove
            </button>
          )}
          <p className={styles.uploadHint}>JPEG, PNG, WebP — max 5 MB</p>
        </div>
      </div>

      {/* Name */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Product Name <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Headphones"
          required
        />
      </div>

      {/* Description */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`${styles.input} ${styles.textarea}`}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the product…"
          rows={4}
        />
      </div>

      {/* Price + Category (side by side) */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="price">
            Price (USD) <span className={styles.required}>*</span>
          </label>
          <div className={styles.priceWrapper}>
            <span className={styles.currencySymbol}>$</span>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              className={`${styles.input} ${styles.priceInput}`}
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            className={styles.input}
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Availability toggle */}
      <div className={styles.toggleField}>
        <label className={styles.toggleLabel} htmlFor="available">
          <span>
            <strong>Available for viewing</strong>
            <span className={styles.toggleHint}>Uncheck to hide from the product catalog</span>
          </span>
          <div className={styles.toggleWrapper}>
            <input
              id="available"
              name="available"
              type="checkbox"
              className={styles.toggleInput}
              checked={formData.available}
              onChange={handleChange}
            />
            <span className={styles.toggle} />
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin')}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={submitting}
        >
          {isEditing ? 'Save Changes' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
