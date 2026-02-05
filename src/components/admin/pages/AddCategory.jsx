import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/adminlayout";
import CategoryForm from "../components/CategoryForm";
import { createCategory } from "../../../api/adminApi";

const AddCategory = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    imageFile: null, // ✅ explicit
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔴 HARD BLOCK
  if (!category.imageFile) {
    setError("Category image is required");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    formData.append("name", category.name.trim());
    formData.append("image", category.imageFile); // 🔴 REQUIRED

    await createCategory(formData);

    navigate("/admin/categories");
  } catch (err) {
    setError(
      err.response?.data?.error ||
      "Failed to add category"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Category
          </h1>
          <p className="text-slate-600 mt-2">
            Create a new category for your products
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        <CategoryForm
          category={category}
          setCategory={setCategory}
          onSubmit={handleSubmit}
          btnText={loading ? "Adding Category..." : "Add Category"}
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
