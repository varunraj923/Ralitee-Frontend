'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

const ProductForm = ({ product, setProduct, images, setImages, categories, onSubmit, btnText }) => {
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setImages([...images, ...newFiles]);
      setImagePreview([...imagePreview, ...newPreviews]);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const handleProductChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Basic Information</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={product.name}
              onChange={(e) => handleProductChange('name', e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              required
            />
          </div>

          {/* SKU */}
          <div>
            <label htmlFor="sku" className="block text-sm font-semibold text-slate-900 mb-2">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={product.sku || ''}
              onChange={(e) => handleProductChange('sku', e.target.value)}
              placeholder="e.g., SKU-001"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={product.category}
              onChange={(e) => handleProductChange('category', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-slate-900 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
              <input
                id="price"
                type="number"
                step="0.01"
                value={product.price}
                onChange={(e) => handleProductChange('price', e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={product.description || ''}
            onChange={(e) => handleProductChange('description', e.target.value)}
            placeholder="Enter detailed product description..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 resize-none"
          />
        </div>
      </div>

      {/* Inventory Management */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Inventory Management</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock */}
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-slate-900 mb-2">
              Stock Quantity
            </label>
            <input
              id="stock"
              type="number"
              value={product.stock || ''}
              onChange={(e) => handleProductChange('stock', e.target.value)}
              placeholder="0"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Weight */}
          <div>
            <label htmlFor="weight" className="block text-sm font-semibold text-slate-900 mb-2">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              value={product.weight || ''}
              onChange={(e) => handleProductChange('weight', e.target.value)}
              placeholder="0.0"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Dimensions */}
          <div>
            <label htmlFor="dimensions" className="block text-sm font-semibold text-slate-900 mb-2">
              Dimensions (L×W×H)
            </label>
            <input
              id="dimensions"
              type="text"
              value={product.dimensions || ''}
              onChange={(e) => handleProductChange('dimensions', e.target.value)}
              placeholder="e.g., 10×20×30 cm"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          {/* Material */}
          <div className="lg:col-span-3">
            <label htmlFor="material" className="block text-sm font-semibold text-slate-900 mb-2">
              Material / Composition
            </label>
            <input
              id="material"
              type="text"
              value={product.material || ''}
              onChange={(e) => handleProductChange('material', e.target.value)}
              placeholder="e.g., 100% Cotton, Aluminum"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>
        </div>
      </div>

      {/* Images Upload */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Product Images</h2>

        {/* Upload Area */}
        <label className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all bg-slate-50">
          <Upload className="h-8 w-8 text-slate-400 mb-2" />
          <span className="text-sm font-medium text-slate-900">Click to upload images</span>
          <span className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</span>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>

        {/* Image Preview */}
        {imagePreview.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900 mb-4">Uploaded Images ({imagePreview.length})</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
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

export default ProductForm;
