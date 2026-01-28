'use client';

import { useState } from 'react';

const CategoryForm = ({ category, setCategory, onSubmit, btnText }) => {
  const [preview, setPreview] = useState(category.icon || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCategory({ ...category, imageFile: file });

    // preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Category Information
        </h2>

        {/* Category Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) =>
              setCategory({ ...category, name: e.target.value })
            }
            placeholder="Enter category name"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={category.description || ''}
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
            placeholder="Enter category description..."
            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Category Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-slate-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-600
              hover:file:bg-blue-100"
          />

          {preview && (
            <div className="mt-4">
              <p className="text-sm text-slate-500 mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          {btnText}
        </button>

        <button
          type="button"
          className="flex-1 px-6 py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
