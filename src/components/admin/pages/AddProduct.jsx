import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layout/adminlayout";
import ProductForm from "../components/ProductForm";
import {
  createProduct,
  fetchCategories,
  uploadImage,
} from "../../../api/adminApi";

const AddProduct = () => {
  const navigate = useNavigate();
  const isSubmittingRef = useRef(false); // 🔒 hard lock

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

  // Load categories once
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

    // 🔒 Prevent multiple submits
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ Upload images (only once)
      const uploadedImageUrls = await Promise.all(
        images.map((image) => {
          const formData = new FormData();
          formData.append("image", image);
          return uploadImage(formData).then(
            (res) => res.data.imageUrl
          );
        })
      );

      // 2️⃣ Prepare product payload
      const productData = {
        ...product,
        images: uploadedImageUrls,
        price: Number(product.price),
        stock: Number(product.stock),
        weight: Number(product.weight),
      };

      // 3️⃣ Create product
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
      isSubmittingRef.current = false; // 🔓 unlock
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
          loading={loading} // 🔒 UI lock
        />
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
