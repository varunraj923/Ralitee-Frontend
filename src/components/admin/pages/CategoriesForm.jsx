'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

const CategoryForm = ({ category, setCategory, setFile, onSubmit, btnText }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Category Information</h2>

        {/* Category Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            placeholder="Enter category name"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={category.description || ''}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
            placeholder="Enter category description..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>
      </div>

      {/* Icon/Image Upload */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Category Icon</h2>

        {!category.icon ? (
          <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all bg-slate-50">
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-sm font-medium text-slate-900">Click to upload icon</span>
            <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 2MB</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFile(file);
                  setCategory({ ...category, icon: URL.createObjectURL(file) });
                }
              }}
              className="hidden"
            />
          </label>
        ) : (
          <div className="relative w-32 h-32 group">
            <img
              src={category.icon}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-slate-200"
            />
            <button
              type="button"
              onClick={() => {
                setFile(null);
                setCategory({ ...category, icon: "" });
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
        >
          {btnText}
        </button>
        <button
          type="button"
          className="flex-1 px-6 py-3 bg-white border border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
