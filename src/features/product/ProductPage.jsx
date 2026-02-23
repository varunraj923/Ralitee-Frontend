import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import ProductGallery from "./components/ProductGallery";
import { getProductById } from "../../api/product.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <div className="min-h-screen bg-white font-sans text-black mt-22">
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>
          <div className="lg:col-span-5">
            <ProductDetails product={product} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
