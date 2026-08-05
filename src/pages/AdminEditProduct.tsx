import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu, Save, Trash2, Plus } from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState<any>({
    name: '',
    brand: '',
    category_id: '',
    short_description: '',
    description: '',
    usage_instructions: '',
  });
  const [variants, setVariants] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    loadProduct();
    loadCategories();
  }, [id]);

  const loadCategories = async () => {
    try {
      const res = await fetch('https://api.navianpharma.com/api/categories');
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProduct = async () => {
    try {
      const res = await fetch(`https://api.navianpharma.com/api/products/${id}`);
      const data = await res.json();
      const p = data.data || data;
      setProduct(p || {});
      setVariants(
        ((p && p.variants) || []).map((v: any) => ({
          ...v,
          images: v && v.images && Array.isArray(v.images) ? v.images : [],
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { variant_name: '', size: '', price: '', images: [] },
    ]);
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const removeVariant = async (index: number) => {
    const v = variants[index];

    // If variant exists on server, attempt delete API call
    if (v && v.id) {
      if (!window.confirm('Delete this variant?')) return;
      try {
        const res = await fetch(
          `https://api.navianpharma.com/api/products/${id}/variants/${v.id}`,
          { method: 'DELETE', headers: { Accept: 'application/json' } }
        );

        if (!res.ok) {
          const text = await res.text();
          alert('Variant delete failed: ' + (text || res.statusText));
          return;
        }
      } catch (err) {
        console.error(err);
        alert('Variant delete failed');
        return;
      }
    }

    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const fd = new FormData();
      Object.entries(product).forEach(([k, v]) => {
        if (v !== undefined && v !== null) fd.append(k, String(v));
      });

      // attach variants as JSON
      fd.append(
        'variants',
        JSON.stringify(
          variants.map((v) => ({
            id: v.id,
            variant_name: v.variant_name,
            size: v.size,
            price: v.price,
          }))
        )
      );

      // attach variant images
      variants.forEach((variant, index) => {
        if (variant.images && variant.images.length) {
          variant.images.forEach((file: any) => {
            if (file instanceof File) {
              fd.append(`variant_image_${index}[]`, file);
            }
          });
        }
      });

      const res = await fetch(`https://api.navianpharma.com/api/products/update/${id}`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        // fallback to POST if PUT not allowed
        await fetch(`https://api.navianpharma.com/api/products/${id}`, {
          method: 'POST',
          body: fd,
        });
      }

      alert('Product updated');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 p-6">
        <div className="flex items-center gap-3 mb-6">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h1 className="text-3xl font-bold">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Product Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input type="text" placeholder="Product Name" value={product.name || ''} onChange={(e) => setProduct({...product, name: e.target.value})} className="border rounded-xl p-3" />

              <input type="text" placeholder="Brand" value={product.brand || ''} onChange={(e) => setProduct({...product, brand: e.target.value})} className="border rounded-xl p-3" />

              <select value={product.category_id || ''} onChange={(e) => setProduct({...product, category_id: e.target.value})} className="border rounded-xl p-3">
                <option value="">Select Category</option>
                {categories.map((cat:any) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input type="file" disabled className="border rounded-xl p-3" />
            </div>

            <textarea rows={3} placeholder="Short Description" value={product.short_description || ''} onChange={(e) => setProduct({...product, short_description: e.target.value})} className="w-full border rounded-xl p-3 mt-5" />

            <textarea rows={6} placeholder="Full Description" value={product.description || ''} onChange={(e) => setProduct({...product, description: e.target.value})} className="w-full border rounded-xl p-3 mt-5" />
          </div>

          {/* Variants */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">Product Variants</h2>

              <button type="button" onClick={addVariant} className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-xl font-semibold">
                <Plus size={18} /> Add Variant
              </button>

            </div>

            <div className="space-y-4">

              {variants.map((variant, index) => (

                <div key={index} className="border rounded-xl p-5">

                  <div className="flex justify-between mb-4">

                    <h3 className="font-semibold">Variant #{index + 1}</h3>

                    <button type="button" onClick={() => removeVariant(index)}>
                      <Trash2 size={18} className="text-red-500" />
                    </button>

                  </div>

                  <div className="grid md:grid-cols-4 gap-4">

                    <input type="text" placeholder="Variant Name" value={variant.variant_name || ''} onChange={(e) => updateVariant(index, 'variant_name', e.target.value)} className="border rounded-xl p-3" />

                    <input type="text" placeholder="Size (1kg, 5kg, 25kg, 1L)" value={variant.size || ''} onChange={(e) => updateVariant(index, 'size', e.target.value)} className="border rounded-xl p-3" />

                    <input type="number" placeholder="Price" value={variant.price || ''} onChange={(e) => updateVariant(index, 'price', e.target.value)} className="border rounded-xl p-3" />

                    <input type="file" multiple onChange={(e) => updateVariant(index, 'images', e.target.files ? Array.from(e.target.files) : [])} className="border rounded-xl p-3" disabled={loading} />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <button type="submit" disabled={loading} className="bg-dark-purple text-white px-6 py-3 rounded-xl flex items-center gap-2">
            <Save /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
