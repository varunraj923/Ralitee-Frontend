'use client';

import { useState } from 'react';

const CategoryForm = ({ category, setCategory, onSubmit, btnText }) => {
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

        {/* Icon/Image URL */}
        <div>
          <label htmlFor="icon" className="block text-sm font-semibold text-slate-900 mb-2">
            Icon/Image URL
          </label>
          <input
            id="icon"
            type="url"
            value={category.icon || ''}
            onChange={(e) => setCategory({ ...category, icon: e.target.value })}
            placeholder="https://example.com/icon.png"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>
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
