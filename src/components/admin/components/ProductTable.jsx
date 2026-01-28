'use client';

import { Edit2, Trash2, Eye } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          All Products
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Product Name
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                SKU
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Price
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Stock
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Category
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const imageUrl =
                  product.image?.url ||
                  product.image ||
                  product.images?.[0] ||
                  "/placeholder.svg";

                return (
                  <tr
                    key={product._id || product.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover border"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                        <span className="text-sm font-medium text-slate-900">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.sku || 'N/A'}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      ₹{Number(product.price).toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${(product.stock || 0) > 10
                            ? 'bg-green-100 text-green-800'
                            : (product.stock || 0) > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                      >
                        {product.stock || 0}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.category?.name || 'Uncategorized'}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView(product._id || product.id)}
                          className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onEdit(product._id || product.id)}
                          className="p-2 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(product._id || product.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
