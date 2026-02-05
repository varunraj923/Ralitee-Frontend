'use client';

import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const ProductForm = ({
  product,
  setProduct,
  images,
  setImages,
  categories,
  onSubmit,
  btnText,
  loading, // 🔒 NEW
}) => {
  const [imagePreview, setImagePreview] = useState([]);

  // 🔒 Generate previews ONLY when images change
  useEffect(() => {
    if (!images.length) {
      setImagePreview([]);
      return;
    }

    const previews = images.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);

    // 🧹 Cleanup to prevent flicker & memory leak
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (e) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);

    // Prevent duplicate images (optional but recommended)
    setImages((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* ================= Basic Information ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                handleProductChange('name', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              SKU
            </label>
            <input
              type="text"
              value={product.sku || ''}
              onChange={(e) =>
                handleProductChange('sku', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={product.category}
              onChange={(e) =>
                handleProductChange('category', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option
                  key={cat._id || cat.id}
                  value={cat._id || cat.id}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                handleProductChange('price', e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={product.description || ''}
            onChange={(e) =>
              handleProductChange('description', e.target.value)
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>
      </div>

      {/* ================= Images Upload ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Product Images
        </h2>

        <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:border-blue-500">
          <Upload className="h-8 w-8 text-slate-400 mb-2" />
          <span className="text-sm font-medium">
            Click to upload images
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {imagePreview.length > 0 && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagePreview.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  className="w-full h-32 object-cover rounded-lg border"
                  alt="preview"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= Submit ================= */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all
        ${loading
          ? 'bg-blue-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'}
        `}
      >
        {btnText}
      </button>
    </form>
  );
};

export default ProductForm;
