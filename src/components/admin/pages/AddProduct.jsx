import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/adminlayout";
import ProductForm from "../components/ProductForm";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
    material: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories",
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add product");
      }

      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.message || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Product
          </h1>
          <p className="text-slate-600 mt-2">
            Create a new product for your store
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        )}

        <ProductForm
          product={product}
          setProduct={setProduct}
          images={images}
          setImages={setImages}
          categories={categories}
          onSubmit={handleSubmit}
          btnText={loading ? "Adding Product..." : "Add Product"}
        />
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
