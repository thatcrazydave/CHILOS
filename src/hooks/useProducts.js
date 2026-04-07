import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// ── READ: paginated/filtered product list ──────────────────────────────────
export function useProducts({ search = '', category = '' } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (search.trim()) {
        query = query.ilike('name', `%${search.trim()}%`);
      }
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error: sbError } = await query;
      if (sbError) throw sbError;
      setProducts(data ?? []);
    } catch (err) {
      setError(err.message ?? 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

// ── READ: single product by id ─────────────────────────────────────────────
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error: sbError }) => {
        if (cancelled) return;
        if (sbError) setError(sbError.message ?? 'Product not found');
        else setProduct(data);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}

// ── WRITE: plain async helpers (call in event handlers, not at render) ─────
export async function createProduct(productData) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();
  return { data, error };
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error };
}
