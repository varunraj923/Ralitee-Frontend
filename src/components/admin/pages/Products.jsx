import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { CircularProgress } from "@mui/material";
import AdminLayout from "../layout/adminlayout";
import ProductTable from "../components/ProductTable";
import EditProductDialog from "../components/EditProductDilog";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../../api/adminApi";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 NEW STATE
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await fetchProducts();
        // Handle both array and object response formats
        const productsData = Array.isArray(data) ? data : data.products;

        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  /* ================= SEARCH FILTER ================= */
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.sku &&
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  /* ================= HANDLERS ================= */
  const handleEdit = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleUpdateProduct = async (id, data) => {
    try {
      const res = await updateProduct(id, data);

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data.product : p))
      );

      setFilteredProducts((prev) =>
        prev.map((p) => (p._id === id ? res.data.product : p))
      );

      setEditOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleView = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Products
            </h1>
            <p className="text-slate-600 mt-2">
              Manage all your products
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-product")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl border p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        {/* ... inside component ... */}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
      </div>

      {/* 🔥 EDIT DIALOG */}
      <EditProductDialog
        open={editOpen}
        product={selectedProduct}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdateProduct}
      />
    </AdminLayout>
  );
};

export default Products;
