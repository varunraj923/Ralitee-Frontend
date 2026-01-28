import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Tag } from "lucide-react";
import AdminLayout from "../layout/adminlayout";
import { fetchCategories, deleteCategory } from "../../../api/adminApi";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleEdit = (categoryId) => {
    navigate(`/admin/edit-category/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await deleteCategory(categoryId);

      setCategories((prev) =>
        prev.filter((c) => c._id !== categoryId)
      );
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Failed to delete category");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Categories
            </h1>
            <p className="text-slate-600 mt-2">
              Manage all your product categories
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-category")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            <Plus className="h-5 w-5" />
            Add Category
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-600">
              Loading categories...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Tag className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 mb-4">
              No categories found
            </p>
            <button
              onClick={() => navigate("/admin/add-category")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            >
              Create First Category
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {category.icon && (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-all text-sm font-medium"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Categories;
