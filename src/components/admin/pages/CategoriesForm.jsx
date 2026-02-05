'use client';

import { useEffect, useState } from 'react';
import { Upload, X } from 'lucide-react';

const CategoryForm = ({
  category,
  setCategory,
  onSubmit,
  btnText,
  loading,
}) => {
  const [preview, setPreview] = useState(null);

  // Generate preview when imageFile changes
  useEffect(() => {
    if (!category.imageFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(category.imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [category.imageFile]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* ================= Category Info ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Category Information
        </h2>

        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) =>
              setCategory((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={category.description || ''}
            onChange={(e) =>
              setCategory((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>
      </div>

      {/* ================= Image Upload ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Category Image <span className="text-red-500">*</span>
        </h2>

        {!preview ? (
          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:border-blue-500">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-sm font-medium">
              Click to upload image
            </span>
            <span className="text-xs text-slate-500 mt-1">
              PNG, JPG, GIF up to 2MB
            </span>

            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setCategory((prev) => ({
                  ...prev,
                  imageFile: file, // ✅ IMPORTANT
                }));
              }}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative w-32 h-32 group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() =>
                setCategory((prev) => ({
                  ...prev,
                  imageFile: null,
                }))
              }
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* ================= Submit ================= */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all
        ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {btnText}
      </button>
    </form>
  );
};

export default CategoryForm;
