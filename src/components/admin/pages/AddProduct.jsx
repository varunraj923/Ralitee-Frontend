import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/adminlayout";
import ProductForm from "../components/ProductForm";
import { createProduct, fetchCategories, uploadImage } from "../../../api/adminApi";

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
    const loadCategories = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Upload Images first
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image);
          const res = await uploadImage(formData);
          return res.data.imageUrl;
        })
      );

      // 2. Prepare Product Data (JSON)
      const productData = {
        ...product,
        images: uploadedImageUrls,
        // Ensure numbers are numbers
        price: Number(product.price),
        stock: Number(product.stock),
        weight: Number(product.weight),
      };

      // 3. Create Product
      await createProduct(productData);

      navigate("/admin/products");
    } catch (err) {
      console.error("Error adding product:", err);
      setError(
        err.response?.data?.message ||
        "Failed to add product. Please try again."
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
